import re, json

OLD = 'src/components/ui/agent-checkpoints.tsx'
NEW = 'src/components/ui/agent-checkpoints.tsx'

src = open(OLD, encoding='utf8').read()
css_line = src.split('\n')[0]

icons_by_name = json.load(open('tools/ackc-icons.json', encoding='utf8'))
# dedupe: assign bundle icon keys by first occurrence title
ICON_KEY = {
  'Read the brief': 'T',
  'Scaffolded the pricing page': 'w',
  'Wrote the plan copy': 'C',
  'Built the pricing table': 'E',
  'Added Stripe checkout': 'D',
}
ICONS = {}
for name, key in ICON_KEY.items():
    ICONS[key] = icons_by_name[name]
# sanity: w used by Scaffolded/Tests*/OpenedPR, D by checkout items
assert len(ICONS['w']) == len(icons_by_name['Tests failing – 4 of 12']) or True

fork = open('tools/ackc-live-fork.html', encoding='utf8').read()
def full(pat):
    m = re.search(pat, fork, re.S)
    return m.group(1) if m else ''
FILE_SVG = full(r'ui-ackc__files[^>]*>(<svg[\s\S]*?</svg>)')
REWIND_SVG = full(r'ui-ackc__rewind[^>]*>(<svg[\s\S]*?</svg>)')
MARK_SVG = full(r'ui-ackc__mark[^>]*>(<svg[\s\S]*?</svg>)')
assert FILE_SVG and REWIND_SVG and MARK_SVG, (len(FILE_SVG), len(REWIND_SVG), len(MARK_SVG))

def js(s):
    return json.dumps(s, ensure_ascii=False)

code = r'''import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';

''' + css_line + r'''

// ---- embedded live snapshots ----
const ICONS: Record<string, string> = {
''' + ''.join(f'  {js(k)}: {js(v)},\n' for k, v in ICONS.items()) + r'''};
const FILE_SVG = ''' + js(FILE_SVG) + r''';
const REWIND_SVG = ''' + js(REWIND_SVG) + r''';
const MARK_SVG = ''' + js(MARK_SVG) + r''';

// ---- demo script (from live bundle) ----
type Script = { icon: string; title: string; files?: number; cost?: number; took: number; fail?: boolean };
type Cp = { id: string; parent?: string; icon: string; title: string; files?: number; cost?: number; at: number; status?: string; fail?: boolean };
type Row = { cp: Cp; row: number; lane: number; from?: number; fromLane?: number; attempt?: number };
type St = { list: Cp[]; head: string; queue: Script[]; clock: number; n: number };

const SCRIPT_O: Script[] = [
  { icon: 'T', title: 'Read the brief', cost: .02, took: 9e3 },
  { icon: 'w', title: 'Scaffolded the pricing page', files: 4, cost: .06, took: 21e3 },
  { icon: 'C', title: 'Wrote the plan copy', files: 1, cost: .05, took: 17e3 },
  { icon: 'E', title: 'Built the pricing table', files: 3, cost: .11, took: 34e3 },
  { icon: 'D', title: 'Added Stripe checkout', files: 5, cost: .14, took: 41e3 },
  { icon: 'w', title: 'Tests failing – 4 of 12', cost: .04, took: 26e3, fail: true },
];
const SCRIPT_K: Script[] = [
  { icon: 'D', title: 'Switched to Stripe Elements', files: 3, cost: .12, took: 38e3 },
  { icon: 'w', title: 'Tests pass – 12 of 12', cost: .04, took: 24e3 },
  { icon: 'w', title: 'Opened the pull request', files: 1, cost: .03, took: 11e3 },
];
const AUTO_REWIND = 'c4';
const TICK = 720;
const ROW_H = 30, LANE_A = 14, PAD_B = 10, BASE_X = 22;

const pad2 = (n: number) => String(n).padStart(2, '0');
const formatTime = (ms: number) => {
  const t = Math.max(0, Math.round(ms / 1e3));
  return t >= 3600
    ? `${Math.floor(t / 3600)}:${pad2(Math.floor((t % 3600) / 60))}:${pad2(t % 60)}`
    : `${Math.floor(t / 60)}:${pad2(t % 60)}`;
};
const costFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

function advance(e: St): St {
  const [t, ...rest] = e.queue;
  if (!t) return e;
  const id = `c${e.n + 1}`;
  const at = e.clock + t.took;
  return {
    list: [...e.list, { id, parent: e.head || undefined, icon: t.icon, title: t.title, files: t.files, cost: t.cost, at, status: 'running', fail: t.fail }],
    head: id, queue: rest, clock: at, n: e.n + 1,
  };
}
function rewindTo(e: St, id: string): St {
  const list = e.list.map(c => c.id === e.head && c.status === 'running' ? { ...c, status: 'stopped' } : c);
  return advance({ ...e, list, head: id, queue: SCRIPT_K });
}
const initial = (): St => advance({ list: [], head: '', queue: SCRIPT_O, clock: 0, n: 0 });

function flatten(cps: Cp[]): Row[] {
  const idx = new Map<string, number>();
  cps.forEach((c, n) => { if (!idx.has(c.id)) idx.set(c.id, n); });
  const laneLast: number[] = [];
  const seen = new Set<string>();
  const rows: Row[] = [];
  let attempt = 1;
  const freeLane = (row: number) => { let t = 0; while ((laneLast[t] ?? -1) >= row) t++; return t; };
  cps.forEach((cp, s) => {
    const pi = cp.parent === undefined ? undefined : idx.get(cp.parent);
    const l = pi !== undefined && pi < s ? rows[pi] : undefined;
    let u: number, d: number | undefined;
    if (l && !seen.has(l.cp.id) && laneLast[l.lane] === l.row) u = l.lane;
    else { u = freeLane(l ? l.row : s); if (s > 0) d = ++attempt; }
    if (l) seen.add(l.cp.id);
    laneLast[u] = s;
    rows.push({ cp, row: s, lane: u, from: l?.row, fromLane: l?.lane, attempt: d });
  });
  return rows;
}

const cx = (lane: number) => BASE_X + lane * LANE_A;
const cy = (row: number) => row * ROW_H + ROW_H / 2;
const linePath = (e: Row) => {
  const t = cx(e.fromLane!), n = cy(e.from!), r = cx(e.lane), a = cy(e.row);
  if (t === r) return `M${t} ${n}V${a}`;
  const o = n + ROW_H * .85;
  return `M${t} ${n}C${t} ${n + ROW_H * .5} ${r} ${o - ROW_H * .45} ${r} ${o}V${a}`;
};

export default function AgentCheckpointsDemo() {
  const [st, setSt] = useState<St>(initial);
  const auto = useRef(true);
  const idle = useRef(0);
  const [focusId, setFocusId] = useState<string | null>(null);
  const uid = useId();
  const D = `ui-ackc-${uid.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const listRef = useRef<HTMLOListElement | null>(null);
  const [maxH, setMaxH] = useState(Infinity);

  useEffect(() => {
    const t = setInterval(() => {
      setSt(e => {
        const head = e.list.find(c => c.id === e.head);
        if (head?.status === 'running') {
          return { ...e, list: e.list.map(c => c.id === head.id ? { ...c, status: c.fail ? 'failed' : 'done' } : c) };
        }
        if (e.queue.length) return advance(e);
        if (auto.current) {
          if (head?.fail) return rewindTo(e, AUTO_REWIND);
          if (++idle.current < 6) return e;
          idle.current = 0;
          return initial();
        }
        return e;
      });
    }, TICK);
    return () => clearInterval(t);
  }, []);

  const rows = flatten(st.list);
  const byId = new Map(rows.map(r => [r.cp.id, r]));
  const headRow = (st.head !== '' ? byId.get(st.head) : undefined) ?? rows[rows.length - 1];
  const live = new Set<number>();
  for (let e = headRow; e; e = e.from === undefined ? undefined : rows[e.from]) live.add(e.row);
  const lanes = Math.max(1, ...rows.map(r => r.lane + 1));
  const attempts = 1 + rows.filter(r => r.attempt).length;
  const hasCost = st.list.some(c => c.cost !== undefined);
  const totalCost = st.list.reduce((a, c) => a + (c.cost ?? 0), 0);
  const focusRowId = focusId !== null && byId.has(focusId) ? focusId : headRow?.cp.id;

  useLayoutEffect(() => {
    const el = listRef.current;
    if (el) setMaxH(parseFloat(getComputedStyle(el).maxHeight) || Infinity);
  }, [rows.length > 0]);

  const contentH = rows.length * ROW_H + PAD_B;
  const scrolls = contentH > maxH;
  useEffect(() => {
    const el = listRef.current;
    if (!el || !headRow || !scrolls) return;
    const t = Math.min(contentH, maxH);
    const n = headRow.row * ROW_H;
    if (n < el.scrollTop) el.scrollTo({ top: n, behavior: 'smooth' });
    else if (n + ROW_H > el.scrollTop + t - PAD_B) el.scrollTo({ top: n + ROW_H - t + PAD_B, behavior: 'smooth' });
  }, [headRow?.cp.id, rows.length, scrolls]);

  const onListKey = (e: KeyboardEvent) => {
    const t = rows.findIndex(r => r.cp.id === focusRowId);
    const n = e.key === 'ArrowDown' ? t + 1 : e.key === 'ArrowUp' ? t - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? rows.length - 1 : -1;
    if (n < 0 || n >= rows.length || (e.key !== 'Home' && e.key !== 'End' && t < 0)) return;
    e.preventDefault();
    setFocusId(rows[n].cp.id);
    listRef.current?.querySelectorAll('.ui-ackc__row')[n]?.focus();
  };

  const rewind = (cp: Cp) => { auto.current = false; setSt(s => rewindTo(s, cp.id)); };

  return (
    <>
      <style>{css}</style>
      <div className="ack-demo">
        <div className="ui-ackc" style={{ '--ui-ackc-gutter': `${BASE_X + (lanes - 1) * LANE_A + 16}px` } as CSSProperties}>
          <header className="ui-ackc__head">
            <span className="ui-ackc__mark" dangerouslySetInnerHTML={{ __html: MARK_SVG }} />
            <span className="ui-ackc__title" id={uid} dir="auto" title="Checkpoints">Checkpoints</span>
            <span className="ui-ackc__task" dir="auto" title="Ship the pricing page">Ship the pricing page</span>
            <span className="ui-ackc__sum" aria-live="polite">
              {plural(rows.length, 'checkpoint')}
              {attempts > 1 && <> · {plural(attempts, 'attempt')}</>}
              {hasCost && <> · {costFmt.format(totalCost)}</>}
            </span>
          </header>
          {rows.length === 0 ? (
            <p className="ui-ackc__empty">No checkpoints yet</p>
          ) : (
            <ol ref={listRef} className="ui-ackc__list" style={{ '--ui-ackc-rows': rows.length } as CSSProperties}
              data-scrolls={scrolls ? '' : undefined} aria-labelledby={uid} onKeyDown={onListKey}>
              <svg className="ui-ackc__rail" width={BASE_X + lanes * LANE_A} height={rows.length * ROW_H} aria-hidden="true">
                <defs>
                  <linearGradient id={`${D}-glint`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {rows.map(e => e.from !== undefined && (
                  <path key={`${e.cp.id}:line`} className="ui-ackc__line" d={linePath(e)} pathLength={1}
                    data-live={live.has(e.row) ? '' : undefined} data-fork={e.lane === e.fromLane ? undefined : ''} />
                ))}
                {rows.map(e => (
                  <g key={`${e.cp.id}:dot`} className="ui-ackc__dot"
                    data-live={live.has(e.row) ? '' : undefined} data-head={e === headRow ? '' : undefined}
                    data-status={e.cp.status ?? 'done'}>
                    <circle cx={cx(e.lane)} cy={cy(e.row)} r={e === headRow ? 4.5 : 3.5} />
                    {e === headRow && (
                      <>
                        <clipPath id={`${D}-${e.row}`}><circle cx={cx(e.lane)} cy={cy(e.row)} r={4.5} /></clipPath>
                        <g clipPath={`url(#${D}-${e.row})`}>
                          <rect className="ui-ackc__glint" x={cx(e.lane) - 4} y={cy(e.row) - 8} width={8} height={16} fill={`url(#${D}-glint)`} />
                        </g>
                      </>
                    )}
                  </g>
                ))}
              </svg>
              {rows.map(e => {
                const status = e.cp.status ?? 'done';
                const isHead = e === headRow;
                const canRewind = !isHead;
                const label = `${e.cp.title}${e.attempt ? `, attempt ${e.attempt}` : ''}${status === 'done' ? '' : `, ${status}`}${isHead ? ', current' : live.has(e.row) ? '' : ', left behind'}${canRewind ? ' – press Enter to rewind here' : ''}`;
                return (
                  <li key={e.cp.id} className="ui-ackc__row" tabIndex={focusRowId === e.cp.id ? 0 : -1}
                    data-live={live.has(e.row) ? '' : undefined} data-head={isHead ? '' : undefined}
                    data-status={status} aria-current={isHead ? 'step' : undefined} aria-label={label}
                    onFocus={() => setFocusId(e.cp.id)}
                    onKeyDown={ev => { if ((ev.key === 'Enter' || ev.key === ' ') && ev.target === ev.currentTarget) { ev.preventDefault(); rewind(e.cp); } }}>
                    {e.cp.icon && <span className="ui-ackc__icon" dangerouslySetInnerHTML={{ __html: ICONS[e.cp.icon] ?? '' }} />}
                    <span className="ui-ackc__name" dir="auto" title={e.cp.title}>{e.cp.title}</span>
                    {e.attempt && <span className="ui-ackc__attempt">Attempt {e.attempt}</span>}
                    {status === 'failed' && <span className="ui-ackc__badge">Failed</span>}
                    <span className="ui-ackc__meta" aria-hidden="true">
                      {status === 'stopped' && <span className="ui-ackc__stopped">Stopped</span>}
                      {e.cp.files !== undefined && e.cp.files > 0 && (
                        <span className="ui-ackc__files" dangerouslySetInnerHTML={{ __html: FILE_SVG + `<span></span>` }} />
                      )}
                      {e.cp.at !== undefined && <span className="ui-ackc__time">{formatTime(e.cp.at)}</span>}
                    </span>
                    {canRewind && (
                      <button type="button" className="ui-ackc__rewind" tabIndex={-1} aria-hidden="true"
                        onClick={() => rewind(e.cp)}
                        dangerouslySetInnerHTML={{ __html: REWIND_SVG + 'Rewind' }} />
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </>
  );
}
'''

# fix: files meta needs icon svg + "N files" text — rebuild that span properly
code = code.replace(
  """{e.cp.files !== undefined && e.cp.files > 0 && (
                        <span className="ui-ackc__files" dangerouslySetInnerHTML={{ __html: FILE_SVG + `<span></span>` }} />
                      )}""",
  """{e.cp.files !== undefined && e.cp.files > 0 && (
                        <span className="ui-ackc__files" dangerouslySetInnerHTML={{ __html: FILE_SVG + plural(e.cp.files, 'file') }} />
                      )}""")

open(NEW, 'w', encoding='utf8', newline='\n').write(code)
print('wrote', NEW, len(code))
