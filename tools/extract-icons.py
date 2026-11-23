import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf8')
s = open(sys.argv[1], encoding='utf8').read()
names = sys.argv[2].split(',')
for name in names:
    m = re.search(r'(?:^|[,;{ ])' + re.escape(name) + r'=\(\)=>\(0,r\.jsx?s?\)\(', s)
    if not m:
        print(name, 'NOTFOUND'); continue
    start = m.end() - 1
    depth = 0; i = start; instr = None
    while i < len(s):
        ch = s[i]
        if instr:
            if ch == '\\':
                i += 2; continue
            if ch == instr: instr = None
        else:
            if ch in '"\'`': instr = ch
            elif ch == '(': depth += 1
            elif ch == ')':
                depth -= 1
                if depth == 0: break
        i += 1
    seg = s[m.start():i + 1]
    out = f'icon-{name}.txt'
    open(out, 'w', encoding='utf8').write(seg)
    print(name, len(seg), 'chars ->', out)
