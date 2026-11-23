import os, re, sys, json, urllib.request, concurrent.futures
sys.path.insert(0, 'tools')
from portlib import transform_chunk

BASE = 'https://www.affectui.com/assets/'
DEPS = 'src/components/ui/_deps'
CACHE = 'demobundles/deps'
os.makedirs(CACHE, exist_ok=True)
os.makedirs(DEPS, exist_ok=True)

def fetch(name):
    path = os.path.join(CACHE, name + '.js')
    if not os.path.exists(path) or os.path.getsize(path) < 50:
        try:
            urllib.request.urlretrieve(BASE + name + '.js', path)
        except Exception as e:
            return None
    return path

def transform_file(in_path, out_path, dep_prefix, depth=0):
    src = open(in_path, encoding='utf8').read()
    deps = transform_chunk(src, out_path, dep_prefix)
    return deps

def process(slug):
    main = 'demobundles/all/%s.js' % slug
    out = 'src/components/ui/%s.tsx' % slug
    deps = transform_file(main, out, './_deps/')
    seen = set()
    queue = list(deps)
    while queue:
        d = queue.pop(0)
        if d in seen: continue
        seen.add(d)
        if d.startswith('index-'):
            continue  # app shell — skip, flag later
        p = fetch(d)
        if not p:
            print('  DEPFAIL', slug, d); continue
        sub = transform_file(p, os.path.join(DEPS, d + '.ts'), './')
        queue.extend(x for x in sub if x not in seen)
    return slug, seen

if __name__ == '__main__':
    slugs = sys.argv[1:]
    for s in slugs:
        try:
            slug, deps = process(s)
            print('OK', slug, 'deps:', len(deps))
        except SystemExit as e:
            print('FAIL', s, str(e)[:120])
        except Exception as e:
            print('ERR', s, str(e)[:120])
