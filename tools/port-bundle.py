import sys, re

# port-bundle.py <bundle.js> <out.tsx>
# Mechanical port: live demo.clean bundle -> tsx with react/jsx-runtime shims.
bundle_path, out_path = sys.argv[1], sys.argv[2]
s = open(bundle_path, encoding='utf8').read()

# capture the two leading imports: react getter alias + jsx-runtime getter alias
m = re.match(r'import\{t as (\w+)\}from"[^"]*";import\{t(?: as (\w+))?\}from"[^"]*";', s)
if not m:
    # variant: single combined or different order — try looser match
    m = re.match(r'(import\{[^}]*\}from"[^"]*";)+', s)
    raise SystemExit('UNRECOGNIZED_IMPORTS: ' + s[:160])
react_alias, jsx_alias = m.group(1), m.group(2) or 't'
rest = s[m.end():]

# optional css placeholder comment
rest = re.sub(r'^\s*/\* empty css[^*]*\*/', '', rest)

# the var chain capturing the getters: var X=<react>(),Y=<jsx>(),
m2 = re.match(r'\s*var (\w+)=' + react_alias + r'\(\),(\w+)=' + jsx_alias + r'\(\),', rest)
if not m2:
    raise SystemExit('UNRECOGNIZED_VARS: ' + rest[:160])
react_var, jsx_var = m2.group(1), m2.group(2)
body = 'var ' + rest[m2.end():].lstrip()

header = f"""// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as {react_var} from 'react';
import {{ jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment }} from 'react/jsx-runtime';
const {jsx_var} = {{ jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment }};

"""
open(out_path, 'w', encoding='utf8').write(header + body)
print('wrote', out_path, len(body), 'bytes  react_var=%s jsx_var=%s' % (react_var, jsx_var))
