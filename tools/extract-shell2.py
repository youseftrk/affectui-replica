#!/usr/bin/env python3
"""Scope-aware closure extractor for bundled app-shell chunks.

Splits a bundle into fine-grained top-level units (per-declarator for var
statements), computes free variables with a real scope walk (tree-sitter),
BFS-collects the closure needed for given exports, and emits a standalone
module with react/jsx-runtime shims and dep imports.

Usage: python tools/extract-shell2.py <shell.js> <out.ts> '<json {internal:export}>'
"""
import json, os, re, sys
sys.setrecursionlimit(200000)
from tree_sitter import Language, Parser
import tree_sitter_javascript as tsj

SRC, OUT, EXPORTS = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
src_b = open(SRC, 'rb').read()
src = src_b.decode('utf8')
parser = Parser(Language(tsj.language()))
tree = parser.parse(src_b)
root = tree.root_node

def txt(n):
    return src_b[n.start_byte:n.end_byte].decode('utf8')

FUNC_TYPES = ('function_declaration', 'function_expression', 'generator_function',
              'generator_function_declaration', 'generator_function_expression',
              'arrow_function', 'method_definition')

def pattern_names(node):
    """Bound names in a binding pattern (defaults' refs NOT collected here)."""
    t = node.type
    if t == 'identifier':
        return [txt(node)]
    if t in ('object_pattern', 'array_pattern'):
        out = []
        for c in node.children:
            if c.type in ('property_identifier', '{', '}', ',', ':'):
                continue
            if c.type == 'pair_pattern':
                # key: value — only the value binds
                for cc in c.children:
                    if cc.type == 'property_identifier' or cc.type == ':':
                        continue
                    out += pattern_names(cc)
            else:
                out += pattern_names(c)
        return out
    if t == 'assignment_pattern':
        left = node.child_by_field_name('left')
        return pattern_names(left) if left is not None else []
    if t == 'rest_pattern':
        ch = node.children[-1] if node.children else None
        return pattern_names(ch) if ch is not None else []
    if t == 'parenthesized_expression':
        ch = node.children[1] if len(node.children) > 1 else None
        return pattern_names(ch) if ch is not None else []
    return []

def var_decl_names(node, only_var=False):
    """Names declared by variable_declarators in subtree, not crossing functions.
    only_var=True restricts to `var` declarations (function-scoped hoisting)."""
    out = []
    def rec(n, top=True):
        if not top and n.type in FUNC_TYPES:
            return
        if n.type == 'variable_declaration' or (n.type == 'lexical_declaration' and not only_var):
            for c in n.children:
                if c.type == 'variable_declarator':
                    nm = c.child_by_field_name('name')
                    if nm: out.extend(pattern_names(nm))
        for c in n.children:
            rec(c, False)
    rec(node)
    return out

def block_decl_names(block):
    """Names declared by DIRECT children of a statement_block (let/const/class/func)."""
    out = []
    for c in block.children:
        if c.type == 'lexical_declaration':
            for d in c.children:
                if d.type == 'variable_declarator':
                    nm = d.child_by_field_name('name')
                    if nm: out += pattern_names(nm)
        elif c.type in ('function_declaration', 'class_declaration'):
            nm = c.child_by_field_name('name')
            if nm: out.append(txt(nm))
    return out

def free_refs(root_node):
    """Identifiers referenced but not bound within root_node's own scope."""
    free = set()
    scopes = [set()]

    def bound(nm):
        return any(nm in s for s in scopes)

    def add_names(pat):
        for nm in pattern_names(pat):
            scopes[-1].add(nm)

    def walk(n):
        t = n.type
        if t == 'identifier':
            nm = txt(n)
            if not bound(nm):
                free.add(nm)
            return
        if t in ('property_identifier', 'statement_identifier',
                 'shorthand_property_identifier_pattern', 'private_property_identifier',
                 'property_identifier_pattern'):
            return
        if t == 'shorthand_property_identifier':
            nm = txt(n)
            if not bound(nm):
                free.add(nm)
            return

        if t in FUNC_TYPES:
            sc = set()
            # params
            for c in n.children:
                if c.type == 'formal_parameters':
                    for p in c.children:
                        sc.update(pattern_names(p))
            nm = n.child_by_field_name('name')
            if nm is not None and nm.type == 'identifier':
                sc.add(txt(nm))
            # hoist var decls from body (not crossing nested funcs)
            body = n.child_by_field_name('body')
            if body is not None:
                sc.update(var_decl_names(body, only_var=True))
            scopes.append(sc)
            for c in n.children:
                walk(c)
            scopes.pop()
            return

        if t == 'variable_declarator':
            nm = n.child_by_field_name('name')
            if nm is not None:
                add_names(nm)
                walk(nm)  # default values inside patterns are refs
            init = n.child_by_field_name('value')
            if init is not None:
                walk(init)
            return

        if t == 'catch_clause':
            sc = set()
            for c in n.children:
                if c.type in ('identifier', 'object_pattern', 'array_pattern',
                              'assignment_pattern', 'rest_pattern'):
                    sc.update(pattern_names(c))
            scopes.append(sc)
            for c in n.children:
                walk(c)
            scopes.pop()
            return

        if t == 'statement_block':
            sc = set(block_decl_names(n))
            scopes.append(sc)
            for c in n.children:
                walk(c)
            scopes.pop()
            return

        if t in ('for_statement', 'for_in_statement', 'for_of_statement',
                 'while_statement', 'do_statement', 'if_statement',
                 'with_statement', 'labeled_statement', 'switch_statement'):
            # push a scope so let/const in heads/bodies bind locally
            scopes.append(set())
            for c in n.children:
                walk(c)
            scopes.pop()
            return

        for c in n.children:
            walk(c)

    walk(root_node)
    return free

# ---------- build units ----------
units = []  # (start, end, kind, payload)
for c in root.children:
    if c.type == 'comment':
        continue
    if c.type == 'export_statement':
        # export {..} clause: skip; export <decl>: unwrap
        inner = [x for x in c.children if x.type not in
                 ('export', 'export_clause', '{', '}', ',', 'as')]
        decl = next((x for x in c.children
                     if x.type in ('variable_declaration', 'lexical_declaration',
                                   'function_declaration', 'class_declaration')), None)
        if decl is not None:
            c = decl  # treat inner decl as the unit
        else:
            continue
    if c.type in ('variable_declaration', 'lexical_declaration'):
        kw = 'var' if c.type == 'variable_declaration' else txt(c.children[0])
        for d in c.children:
            if d.type == 'variable_declarator':
                units.append((d.start_byte, d.end_byte, 'decl', (kw, d)))
    elif c.type == 'import_statement':
        units.append((c.start_byte, c.end_byte, 'import', c))
    else:
        units.append((c.start_byte, c.end_byte, 'stmt', c))

# provided name -> unit index
provided = {}
unit_names = []
for i, (s, e, k, p) in enumerate(units):
    names = []
    if k == 'decl':
        _, d = p
        nm = d.child_by_field_name('name')
        if nm is not None:
            names = pattern_names(nm)
    elif k == 'import':
        names = import_names(p) if False else []
        # handled below
    unit_names.append(names)

# import local names
def import_local_names(stmt):
    out = []
    clause = stmt.child_by_field_name('import')
    if clause is None:
        for x in stmt.children:
            if x.type == 'import_clause':
                clause = x
    if clause is None:
        return out
    for c in clause.children:
        if c.type == 'identifier':
            out.append(txt(c))
        elif c.type == 'namespace_import':
            for x in c.children:
                if x.type == 'identifier':
                    out.append(txt(x))
        elif c.type == 'named_imports':
            for spec in c.children:
                if spec.type == 'import_specifier':
                    alias = spec.child_by_field_name('alias')
                    nm = spec.child_by_field_name('name')
                    tgt = alias or nm
                    if tgt is not None:
                        out.append(txt(tgt))
    return out

for i, (s, e, k, p) in enumerate(units):
    if k == 'import':
        unit_names[i] = import_local_names(p)
    elif k == 'stmt':
        # function/class declarations provide their name; expr stmts provide nothing
        if p.type in ('function_declaration', 'class_declaration'):
            nm = p.child_by_field_name('name')
            unit_names[i] = [txt(nm)] if nm is not None else []
        else:
            unit_names[i] = []

for i, names in enumerate(unit_names):
    for nm in names:
        provided.setdefault(nm, i)

print('units:', len(units), 'provided:', len(provided))

# ---------- BFS ----------
unit_refs = []
for i, (s, e, k, p) in enumerate(units):
    node = p[1] if k == 'decl' else p
    unit_refs.append(free_refs(node))

needed = set()
work = [n for n in EXPORTS if n in provided]
missing_seeds = [n for n in EXPORTS if n not in provided]
if missing_seeds:
    print('WARN seeds not provided:', missing_seeds)
while work:
    nm = work.pop()
    ui = provided.get(nm)
    if ui is None or ui in needed:
        continue
    needed.add(ui)
    for r in unit_refs[ui]:
        if r in provided:
            ri = provided[r]
            if ri not in needed:
                work.append(r)

needed_units = sorted(needed)
print('closure units:', len(needed_units),
      'bytes:', sum(units[i][1]-units[i][0] for i in needed_units))

# ---------- classify needed imports ----------
react_aliases, jsx_aliases = {}, {}   # local name -> True
dep_specs = {}                        # spec -> list of (kind, orig, local)
for i in needed_units:
    s, e, k, p = units[i]
    if k != 'import':
        continue
    spec = None
    for c in p.children:
        if c.type == 'string':
            spec = txt(c).strip('"\'')
    clause = p.child_by_field_name('import')
    if clause is None:
        for x in p.children:
            if x.type == 'import_clause':
                clause = x
    binds = []
    if clause is not None:
        for c in clause.children:
            if c.type == 'identifier':
                binds.append(('default', txt(c), txt(c)))
            elif c.type == 'namespace_import':
                for x in c.children:
                    if x.type == 'identifier':
                        binds.append(('ns', txt(x), txt(x)))
            elif c.type == 'named_imports':
                for sp in c.children:
                    if sp.type == 'import_specifier':
                        alias = sp.child_by_field_name('alias')
                        nm = sp.child_by_field_name('name')
                        orig = txt(nm) if nm is not None else None
                        local = txt(alias or nm)
                        binds.append(('named', orig or local, local))
    for kind, orig, local in binds:
        if 'react' in spec and 'jsx' not in spec:
            react_aliases[local] = True
        elif 'jsx-runtime' in spec:
            jsx_aliases[local] = True
        else:
            dep_specs.setdefault(spec, []).append((kind, orig, local))

# ---------- emit ----------
out = ['// @ts-nocheck',
       '// Extracted closure from app-shell chunk (scope-aware, tree-sitter).']

react_vars, jsx_vars = [], []
body_parts = []   # (pos, text)
jsx_import_needed = False

def peel_getter(init_txt):
    m = re.match(r'^(\w+)\(\)$', init_txt)
    return m.group(1) if m else None

for i in needed_units:
    s, e, k, p = units[i]
    if k == 'import':
        continue
    if k == 'decl':
        kw, d = p
        nm_node = d.child_by_field_name('name')
        init = d.child_by_field_name('value')
        names = pattern_names(nm_node) if nm_node is not None else []
        init_txt = txt(init) if init is not None else None
        if len(names) == 1 and init_txt is not None:
            g = peel_getter(init_txt)
            if g in react_aliases:
                react_vars.append(names[0])
                continue
            if g in jsx_aliases:
                jsx_vars.append(names[0])
                jsx_import_needed = True
                continue
            body_parts.append((s, f'{kw} {names[0]}={init_txt};'))
        else:
            # complex declarator: emit whole declarator text (has commas inside)
            body_parts.append((s, txt(d).rstrip(',') + ';'))
    else:
        body_parts.append((s, txt(p).rstrip()))

for rv in react_vars:
    out.append(f"import * as {rv} from 'react';")
if jsx_vars:
    out.append("import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';")
    for jv in jsx_vars:
        out.append(f'const {jv} = {{ jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment }};')
for spec, binds in dep_specs.items():
    parts = []
    for kind, orig, local in binds:
        if kind == 'ns':
            parts.append(f'* as {local}')
        elif kind == 'default':
            parts.append(local)
        else:
            parts.append(orig if orig == local else f'{orig} as {local}')
    base = spec.rsplit('/', 1)[-1].rsplit('.', 1)[0]
    out.append(f'import {{{", ".join(parts)}}} from "./{base}";')

out.append('')
for _, t in sorted(body_parts):
    out.append(t)

exps = ', '.join(f'{k} as {v}' for k, v in EXPORTS.items())
out.append(f'export{{{exps}}};')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf8').write('\n'.join(out) + '\n')
print('wrote', OUT, os.path.getsize(OUT))
print('react_vars:', len(react_vars), 'jsx_vars:', len(jsx_vars),
      'dep_specs:', {k: len(v) for k, v in dep_specs.items()})
