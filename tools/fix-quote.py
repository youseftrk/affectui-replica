s = open('tools/extract-shell-deps.py', 'rb').read()
old = b"decode(" + bytes([92]) + b"'utf8'" + bytes([92]) + b"')"
new = b"decode('utf8')"
n = s.count(old)
s = s.replace(old, new)
open('tools/extract-shell-deps.py', 'wb').write(s)
print('replaced', n)
