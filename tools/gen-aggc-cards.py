import json, re

d = json.load(open('tools/aggc-cards.json', encoding='utf8'))
NAME2ID = {'Orchestrator':'lead','Researcher':'research','Analyst':'analyst','Coder':'coder',
           'Writer':'writer','Web search':'web','Notion':'notion','HubSpot':'hubspot',
           'Database':'db','GitHub':'github','Stripe':'stripe','Slack':'slack','You':'you'}
ORDER = ['lead','research','analyst','coder','writer','web','notion','hubspot','db','github','stripe','slack','you']

out = {}
for k, v in d.items():
    if k.endswith('::meta'):
        continue
    name = k.split(' · ')[0]
    nid = NAME2ID.get(name)
    if not nid:
        print('SKIP', k)
        continue
    m = re.match(r'<div[^>]*>(.*)</div>\s*$', v, re.S)
    out[nid] = m.group(1) if m else v

out['you'] = open('tools/aggc-card-you.html', encoding='utf8').read()
print('ids:', sorted(out.keys()))

def esc(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

ID2NAME = {v: k for k, v in NAME2ID.items()}
lines = ['// captured live card innerHTML per node id (agent-graph interactive pass)',
         'export const AGGC_CARDS: Record<string, string> = {']
for nid in ORDER:
    lines.append('  %s: `%s`,' % (nid, esc(out[nid])))
lines.append('};')
lines.append('export const AGGC_NAMES: Record<string, string> = {')
for nid in ORDER:
    lines.append('  %s: `%s`,' % (nid, ID2NAME[nid]))
lines.append('};')
open('src/aggc-cards.ts', 'w', encoding='utf8').write('\n'.join(lines))
print('written src/aggc-cards.ts', sum(len(v) for v in out.values()), 'bytes html')
