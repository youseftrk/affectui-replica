import re

s = open('tools/index-bundle.js', encoding='utf8').read()
start = s.index('var _g={queued:')
i_zg = s.index('function Zg(', start)
# Find where Zg's CSS string ends (look for `.ui-ccc__` near the end before 839000)
last_ccc = s.rfind('.ui-ccc', i_zg, 839000)
end_bt = s.index('`', last_ccc)
print('last .ui-ccc at:', last_ccc, 'closing backtick at:', end_bt)
print('NEXT 400:', repr(s[end_bt:end_bt+400]))
