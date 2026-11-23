import re

s = open('tools/index-bundle.js', encoding='utf8').read()
start = s.index('var _g={queued:')
i_zg = s.index('function Zg(', start)
last_ccc = s.rfind('.ui-ccc', i_zg, 839000)
end_bt = s.index('`', last_ccc)
# The slice ends right at end_bt + 1 (the closing backtick of the ui-ccc CSS var)
body = s[start:end_bt + 1] + ';'

header = """// @ts-nocheck
// AgentTree (Rg as i) and ChatComposer (Yg as n) extracted from affectui index bundle.
import * as O from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const V = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };

"""
footer = "\nexport { Rg as i, Yg as n };\n"

out_path = 'src/components/ui/_deps/index-DzfKaitw.ts'
open(out_path, 'w', encoding='utf8').write(header + body + footer)
print('Wrote', out_path, len(body), 'bytes')
