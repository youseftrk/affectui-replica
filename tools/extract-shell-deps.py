#!/usr/bin/env python3
"""Extract a needed export closure from a bundled app-shell chunk (e.g. index-*.js)
into a standalone _deps module, using tree-sitter for scope-aware analysis.

Usage: python tools/extract-shell-deps.py <shell.js> <out.ts> <exportmap.json>
  exportmap.json: {"internalName": "exportName", ...}
"""
import json, os, re, sys
from tree_sitter import Language, Parser
import tree_sitter_javascript as tsj

SRC = sys.argv[1]
OUT = sys.argv[2]
EXPORTS = json.loads(sys.argv[3])  # {internal: exportName}

src = open(SRC, encoding='utf8').read()
src_b = src.encode('utf8')
parser = Parser(Language(tsj.language()))
tree = parser.parse(src.encode())
root = tree.root_node

# ---------- helpers ----------
def child_named(node, *types):
    return [c for c in node.children if c.type in types]

def ident_name(node):
    """All identifier texts inside a binding pattern (handles destructuring)."""
    out = []
    def rec(n):
        if n.type == 'identifier':
            out.append(src_b[n.start_byte:n.end_byte].decode('utf8'))
        for c in n.children:
            rec(c)
    rec(node)
    return out

def stmt_declared(stmt):
    """Names this top-level statement provides."""
    t = stmt.type
    if t == 'import_statement':
        names = []
        for c in stmt.children:
            if c.type == 'import_clause':
                for cc in c.children:
                    if cc.type == 'identifier':
                        names.append(src_b[cc.start_byte:cc.end_byte].decode('utf8'))
                    elif cc.type == 'namespace_import':
                        for x in cc.children:
                            if x.type == 'identifier':
                                names.append(src_b[x.start_byte:x.end_byte].decode('utf8'))
                    elif cc.type == 'named_imports':
                        for spec in cc.children:
                            if spec.type == 'import_specifier':
                                # alias if present else name
                                alias = spec.child_by_field_name('alias')
                                nm = spec.child_by_field_name('name')
                                tgt = alias or nm
                                if tgt: names.append(src_b[tgt.start_byte:tgt.end_byte].decode('utf8'))
        return names
    if t == 'function_declaration':
        nm = stmt.child_by_field_name('name')
        return [src_b[nm.start_byte:nm.end_byte].decode('utf8')] if nm else []
    if t == 'class_declaration':
        nm = stmt.child_by_field_name('name')
        return [src_b[nm.start_byte:nm.end_byte].decode('utf8')] if nm else []
    if t in ('lexical_declaration', 'variable_declaration'):
        names = []
        for d in stmt.children:
            if d.type == 'variable_declarator':
                nm = d.child_by_field_name('name')
                if nm: names += ident_name(nm)
        return names
    return []

def stmt_bound(stmt):
    """Names bound *inside* a statement (params, locals, nested decls) — excluded from free refs."""
    bound = set()
    def rec(n):
        if n.type in ('formal_parameters',):
            for c in n.children:
                bound.update(ident_name(c))
            return  # don't descend further (defaults may contain refs though!)
        if n.type in ('function_declaration', 'function', 'generator_function',
                      'generator_function_declaration', 'arrow_function', 'method_definition'):
            # params bound; name bound for declarations
            for c in n.children:
                if c.type == 'formal_parameters':
                    for p in c.children:
                        bound.update(ident_name(p))
            if n.type == 'function_declaration':
                nm = n.child_by_field_name('name')
                if nm: bound.add(src_b[nm.start_byte:nm.end_byte].decode('utf8'))
        if n.type in ('variable_declarator',):
            nm = n.child_by_field_name('name')
            if nm: bound.update(ident_name(nm))
        if n.type == 'catch_clause':
            for c in n.children:
                if c.type in ('identifier', 'object_pattern', 'array_pattern'):
                    bound.update(ident_name(c))
        for c in n.children:
            rec(c)
    # NOTE: for variable_declaration statements the declarator names ARE the provided names,
    # and should also count as bound for free-ref purposes.
    rec(stmt)
    return bound

def stmt_refs(stmt):
    """Free-ish identifier references in a statement (over-approximates; bound names removed)."""
    bound = stmt_bound(stmt)
    refs = set()
    def rec(n):
        if n.type == 'identifier':
            nm = src_b[n.start_byte:n.end_byte].decode('utf8')
            if nm not in bound:
                refs.add(nm)
            return
        # skip property_identifier entirely (different node type anyway)
        for c in n.children:
            rec(c)
    rec(stmt)
    return refs

# ---------- index top-level statements ----------
stmts = [c for c in root.children if c.type != 'comment']
provided = {}   # name -> stmt
order = []
for s in stmts:
    order.append(s)
    for nm in stmt_declared(s):
        provided.setdefault(nm, s)

print('top-level stmts:', len(stmts), 'provided names:', len(provided))

# ---------- BFS closure ----------
seeds = set(EXPORTS.keys())
needed = set()
work = list(seeds)
while work:
    nm = work.pop()
    if nm in needed: continue
    needed.add(nm)
    st = provided.get(nm)
    if st is None: continue
    for r in stmt_refs(st):
        if r in provided and r not in needed:
            work.append(r)

needed_stmts = sorted({id(s): s for s in (provided.get(n) for n in needed) if s}.values(),
                      key=lambda s: s.start_byte)
print('closure: names=%d stmts=%d bytes=%d' % (
    len(needed), len(needed_stmts),
    sum(s.end_byte - s.start_byte for s in needed_stmts)))

# ---------- classify imports needed ----------
react_getters = {}   # import local alias -> 'react'
jsx_getters = {}     # -> 'jsx'
dep_imports = {}     # spec -> set(local binds)
import_stmt_for = {} # local name -> (stmt, spec, is_default)

def parse_spec(spec_node):
    # string fragment without quotes
    txt = src_b[spec_node.start_byte:spec_node.end_byte].decode('utf8')
    return txt.strip('"\'')

for s in needed_stmts:
    if s.type != 'import_statement': continue
    spec_node = None
    for c in s.children:
        if c.type == 'string':
            spec_node = c
    spec = parse_spec(spec_node) if spec_node else ''
    clause = s.child_by_field_name('import') or next((c for c in s.children if c.type=='import_clause'), None)
    binds = []
    if clause:
        for c in clause.children:
            if c.type == 'identifier': binds.append(('default', src_b[c.start_byte:c.end_byte].decode('utf8')))
            elif c.type == 'namespace_import':
                for x in c.children:
                    if x.type=='identifier': binds.append(('ns', src_b[x.start_byte:x.end_byte].decode('utf8')))
            elif c.type == 'named_imports':
                for spec2 in c.children:
                    if spec2.type=='import_specifier':
                        alias = spec2.child_by_field_name('alias')
                        nm = spec2.child_by_field_name('name')
                        local = alias or nm
                        orig = nm
                        binds.append(('named', src_b[local.start_byte:local.end_byte].decode('utf8'),
                                      src_b[orig.start_byte:orig.end_byte].decode('utf8') if orig else None))
    for b in binds:
        import_stmt_for[b[-1]] = (s, spec, b[0], b[1] if len(b)>2 else None)

# Determine which import-provided names are referenced by needed non-import stmts
nonimp_refs = set()
for s in needed_stmts:
    if s.type == 'import_statement': continue
    nonimp_refs |= stmt_refs(s)

used_imports = {}  # spec -> list of (kind, orig, local)
for nm in nonimp_refs:
    info = import_stmt_for.get(nm)
    if not info: continue
    s, spec, kind, orig = info
    if 'react' in spec and 'jsx' not in spec:
        react_getters[nm] = spec
    elif 'jsx-runtime' in spec:
        jsx_getters[nm] = spec
    else:
        used_imports.setdefault(spec, []).append((kind, orig or nm, nm))

# Which provided names remain that are import-provided but NOT referenced? skip.
# Getter-peel: var declarations whose init is exactly <importAlias>() 
# For react/jsx aliases we emit namespace/const shims instead of the var.

out_lines = ['// @ts-nocheck', '// Extracted closure from app-shell chunk (tree-sitter scope analysis).']

react_vars, jsx_vars = [], []
emitted = []  # (pos, text)

# helper: for a var statement, split declarators
def emit_var_statement(s):
    decls = [c for c in s.children if c.type in ('variable_declarator','lexical_declaration')]
    # lexical_declaration wraps variable_declaration? handle both
    vd = None
    for c in s.children:
        if c.type == 'lexical_declaration':
            vd = c
    target = vd or s
    for c in target.children:
        if c.type != 'variable_declarator': continue
        nm_node = c.child_by_field_name('name')
        init = c.child_by_field_name('value')
        if not nm_node: continue
        names = ident_name(nm_node)
        if len(names) != 1 or not init:
            # complex: emit whole declarator verbatim
            emitted.append((c.start_byte, src_b[c.start_byte:c.end_byte].decode('utf8').rstrip(',;') + ';'))
            continue
        nm = names[0]
        init_txt = src_b[init.start_byte:init.end_byte].decode('utf8')
        call = re.match(r'^(\w+)\(\)$', init_txt)
        if call and call.group(1) in react_getters:
            react_vars.append(nm)
            continue
        if call and call.group(1) in jsx_getters:
            jsx_vars.append(nm)
            continue
        # plain declarator
        emitted.append((c.start_byte, f'var {nm}={init_txt};'))

for s in needed_stmts:
    if s.type == 'import_statement':
        continue
    if s.type in ('lexical_declaration', 'variable_declaration'):
        emit_var_statement(s)
    else:
        emitted.append((s.start_byte, src_b[s.start_byte:s.end_byte].decode('utf8').rstrip()))

# order emitted by position
emitted.sort(key=lambda x: x[0])

# react/jsx imports
for rv in react_vars:
    out_lines.append(f"import * as {rv} from 'react';")
if jsx_vars:
    out_lines.append("import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';")
    for jv in jsx_vars:
        out_lines.append(f'const {jv} = {{ jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment }};')
# dep imports
for spec, binds in used_imports.items():
    parts = []
    for kind, orig, local in binds:
        if kind == 'ns':
            parts.append(f'* as {local}')
        elif kind == 'default':
            parts.append(local)
        else:
            parts.append(orig if orig == local else f'{orig} as {local}')
    base = spec.rsplit('/', 1)[-1].rsplit('.', 1)[0]
    out_lines.append(f'import {{{", ".join(parts)}}} from "./{base}";')

out_lines.append('')
for _, txt in emitted:
    out_lines.append(txt)

# exports
exps = ', '.join(f'{k} as {v}' for k, v in EXPORTS.items())
out_lines.append(f'export{{{exps}}};')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf8').write('\n'.join(out_lines) + '\n')
print('wrote', OUT, os.path.getsize(OUT), 'bytes')
print('react_vars:', react_vars[:10], 'jsx_vars:', jsx_vars[:10])
print('dep imports:', {k: len(v) for k, v in used_imports.items()})
