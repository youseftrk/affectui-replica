import re, os, sys

# Shared chunk transformer.
# transform_chunk(src, out_path, dep_prefix)
#   - strips react/jsx-runtime imports, emits shims bound to the bundle's own var names
#   - preserves & rewrites relative './X.js' imports to dep_prefix + 'X' (extensionless)
#   - preserves everything else verbatim incl. export{} tail
# Returns list of relative dep specifiers found (for recursive resolution).

def transform_chunk(src, out_path, dep_prefix):
    deps = []
    # 1. collect leading imports (may be zero)
    im = re.match(r'((?:import\{[^}]*\}from"[^"]*";)+)', src)
    imports = im.group(1) if im else ''
    rest = src[im.end():] if im else src

    # classify each import: react / jsx-runtime / dep
    react_aliases, jsx_aliases = [], []
    dep_rewrites = []  # (old_spec, new_spec)
    dep_imports = []   # preserved non-react import statements
    for m in re.finditer(r'import\{([^}]*)\}from"([^"]*)";', imports):
        binds, spec = m.group(1), m.group(2)
        if 'react' in spec and 'jsx' not in spec:
            for b in binds.split(','):
                b = b.strip()
                mm = re.match(r'(?:t as )?(\w+)$', b)
                if mm: react_aliases.append(mm.group(1))
        elif 'jsx-runtime' in spec:
            for b in binds.split(','):
                b = b.strip()
                mm = re.match(r'(?:t as )?(\w+)$', b)
                if mm: jsx_aliases.append(mm.group(1))
        elif spec.startswith('./') or spec.startswith('../'):
            base = spec.rsplit('/', 1)[-1].rsplit('.', 1)[0]
            deps.append(base)
            new_spec = dep_prefix + base
            dep_rewrites.append((spec, new_spec))
            dep_imports.append(f'import{{{binds}}}from"{new_spec}";')
        else:
            dep_rewrites.append((spec, spec))
            dep_imports.append(f'import{{{binds}}}from"{spec}";')

    # 2. rewrite dep imports inside the WHOLE file (imports may appear later too)
    body = rest
    for old, new in dep_rewrites:
        body = body.replace('from"' + old + '"', 'from"' + new + '"')

    # 3. strip css placeholder comment
    body = re.sub(r'^\s*/\* empty css[^*]*\*/', '', body)

    # 4. extract getter declarators from the var chain head
    kind = {}
    for a in react_aliases: kind[a] = 'react'
    for a in jsx_aliases: kind[a] = 'jsx'

    react_vars, jsx_vars = [], []
    alias_re = ('(' + '|'.join(re.escape(a) for a in kind) + ')') if kind else None
    while alias_re:
        m = re.match(r'\s*var (\w+)=' + alias_re + r'\(\)\s*,', body) \
            or re.match(r'\s*var (\w+)=' + alias_re + r'\(\)\s*;', body)
        if not m:
            break
        varname, alias = m.group(1), m.group(2)
        (react_vars if kind[alias] == 'react' else jsx_vars).append(varname)
        term = m.group(0).rstrip()[-1]
        body = body[m.end():].lstrip()
        if term == ';':
            break
        body = 'var ' + body

    # 5. emit
    lines = ['// @ts-nocheck', '// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).']
    for rv in react_vars:
        lines.append(f"import * as {rv} from 'react';")
    if jsx_vars:
        lines.append("import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';")
        for jv in jsx_vars:
            lines.append(f'const {jv} = {{ jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment }};')
    lines.extend(dep_imports)
    lines.append('')
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    open(out_path, 'w', encoding='utf8').write('\n'.join(lines) + body)
    return deps
