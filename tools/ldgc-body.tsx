import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

type LedgerEntry = {
  id: string;
  action: string;
  target?: string;
  system: string;
  icon?: React.ReactNode;
  change?: [string, string];
  detail?: string;
  dependsOn?: string[];
  reversible?: boolean;
  at: number;
};

const relAge = (ms: number) => {
  const s = Math.max(0, Math.round(ms / 1e3));
  if (s < 10) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`;
};

const fmtAt = (at: number, now: number) => {
  const age = now - at;
  if (age > -6e4 && age < 2592e6) return relAge(age);
  const sameYear = new Date(at).getFullYear() === new Date(now).getFullYear();
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: sameYear ? undefined : 'numeric' }).format(at);
};

const letter = (system: string) => (system.match(/[\p{L}\p{N}]/u)?.[0] ?? '·').toUpperCase();

const dependentsMap = (entries: LedgerEntry[]) => {
  const m = new Map<string, LedgerEntry[]>();
  for (const e of entries) for (const d of e.dependsOn ?? []) m.set(d, [...(m.get(d) ?? []), e]);
  return m;
};

const descendantsOf = (id: string, map: Map<string, LedgerEntry[]>) => {
  const out: LedgerEntry[] = [];
  const seen = new Set([id]);
  const queue = [id];
  for (let i = 0; i < queue.length; i++)
    for (const child of map.get(queue[i]) ?? [])
      if (!seen.has(child.id)) {
        seen.add(child.id);
        out.push(child);
        queue.push(child.id);
      }
  return out;
};

const LedgerMark = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="1.8" width="12" height="12.4" rx="2.6" stroke="currentColor" strokeWidth="1.3" /><path d="M5 5.4h6M5 8h6M5 10.6h3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
);
const UndoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7H15C18.3137 7 21 9.68629 21 13C21 16.3137 18.3137 19 15 19H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /><path d="M8 3L4 7L8 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
);
const RedoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 7H9C5.68629 7 3 9.68629 3 13C3 16.3137 5.68629 19 9 19H16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /><path d="M16 3L20 7L16 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
);
const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z" stroke="currentColor" strokeWidth="1.8" /><path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--ui-ldgc-strong, var(--ui-ldg-ink, #181717))' }}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
);
const VercelIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--ui-ldgc-strong, var(--ui-ldg-ink, #000))' }}><path d="M24 22.525H0l12-21.05 12 21.05z" /></svg>
);
const SlackIcon = () => (
  <svg viewBox="0 0 49.883 49.877" fill="none" aria-hidden="true"><g transform="translate(0 0)"><path d="M18.3549 10.4784C15.4713 10.4784 13.1157 8.12279 13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V10.4784H18.3549Z" fill="#36C5F0" /><path d="M18.3575 13.12C21.2411 13.12 23.5967 15.4756 23.5967 18.3592C23.5967 21.2428 21.2411 23.5984 18.3575 23.5984H5.2392C2.35561 23.5984 0 21.2428 0 18.3592C0 15.4756 2.35561 13.12 5.2392 13.12H18.3575Z" fill="#36C5F0" /></g><g transform="translate(26.28 0)"><path d="M13.1244 18.3592C13.1244 15.4756 15.48 13.12 18.3636 13.12C21.2472 13.12 23.6028 15.4756 23.6028 18.3592C23.6028 21.2428 21.2472 23.5984 18.3636 23.5984H13.1244V18.3592Z" fill="#2EB67D" /><path d="M10.4785 18.3575C10.4785 21.2411 8.12286 23.5967 5.23927 23.5967C2.35568 23.5967 7.4362e-05 21.2411 7.4362e-05 18.3575V5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0C8.12286 0 10.4785 2.35561 10.4785 5.2392V18.3575Z" fill="#2EB67D" /></g><g transform="translate(0 26.28)"><path d="M10.4784 5.2392C10.4784 8.12279 8.12279 10.4784 5.2392 10.4784C2.35561 10.4784 0 8.12279 0 5.2392C0 2.35561 2.35561 0 5.2392 0H10.4784V5.2392Z" fill="#E01E5A" /><path d="M13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V18.3575C23.5941 21.2411 21.2385 23.5967 18.3549 23.5967C15.4713 23.5967 13.1157 21.2411 13.1157 18.3575V5.2392Z" fill="#E01E5A" /></g><g transform="translate(26.28 26.28)"><path d="M5.23927 13.1157C8.12286 13.1157 10.4785 15.4713 10.4785 18.3549C10.4785 21.2385 8.12286 23.5941 5.23927 23.5941C2.35568 23.5941 7.4362e-05 21.2385 7.4362e-05 18.3549V13.1157H5.23927Z" fill="#ECB22E" /><path d="M5.23927 10.4784C2.35568 10.4784 7.4362e-05 8.12279 7.4362e-05 5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0H18.3576C21.2412 0 23.5968 2.35561 23.5968 5.2392C23.5968 8.12279 21.2412 10.4784 18.3576 10.4784H5.23927Z" fill="#ECB22E" /></g></svg>
);
const StripeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#635BFF" /><path fill="#fff" transform="translate(5 5) scale(0.5833)" d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" /></svg>
);
const NotionIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--ui-ldgc-strong, var(--ui-ldg-ink, #000))' }}><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" /></svg>
);
const HubSpotIcon = () => (
  <svg viewBox="0 0 24 24" fill="#FF7A59" aria-hidden="true"><path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" /></svg>
);

function AgentLedger({
  entries, agent, now, undone: undoneProp, defaultUndone = [],
  onUndo, onRedo, pointAt = null, title = 'Ledger', className,
}: {
  entries: LedgerEntry[];
  agent?: string;
  now?: number;
  undone?: string[];
  defaultUndone?: string[];
  onUndo?: (ids: string[]) => void;
  onRedo?: (ids: string[]) => void;
  pointAt?: string | null;
  title?: string;
  className?: string;
}) {
  const x = useId();
  const initialIds = useRef<Set<string> | null>(null);
  if (initialIds.current === null) initialIds.current = new Set(entries.map(e => e.id));
  const [internalUndone, setInternalUndone] = useState<string[]>(defaultUndone);
  const undoneSet = new Set(undoneProp ?? internalUndone);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [chainOrder, setChainOrder] = useState<Record<string, number>>({});
  const prevUndone = useRef<string[]>(undoneProp ?? []);
  useEffect(() => {
    if (!undoneProp) return;
    const added = undoneProp.filter(id => !prevUndone.current.includes(id));
    prevUndone.current = undoneProp;
    if (added.length) setChainOrder(Object.fromEntries(added.map((id, i) => [id, i])));
  }, [undoneProp]);
  const [fallbackNow, setFallbackNow] = useState(() => Date.now());
  useEffect(() => {
    if (now !== undefined) return;
    const iv = window.setInterval(() => setFallbackNow(Date.now()), 15000);
    return () => window.clearInterval(iv);
  }, [now]);
  const N = now ?? fallbackNow;
  const sorted = [...entries].sort((a, b) => b.at - a.at);
  const deps = useMemo(() => dependentsMap(entries), [entries]);
  const liveDescendants = (id: string) => descendantsOf(id, deps).filter(e => !undoneSet.has(e.id));
  const L = hoverId ?? pointAt;
  const chainList = L ? liveDescendants(L) : [];
  const chainKind = new Map<string, 'also' | 'kept'>(chainList.map(e => [e.id, e.reversible === false ? 'kept' : 'also']));
  const doUndo = (entry: LedgerEntry) => {
    const ids = [entry.id, ...liveDescendants(entry.id).filter(e => e.reversible !== false).map(e => e.id)];
    setChainOrder(Object.fromEntries(ids.map((id, i) => [id, i])));
    setInternalUndone(u => [...u, ...ids.filter(id => !u.includes(id))]);
    setHoverId(null);
    onUndo?.(ids);
  };
  const doRedo = (entry: LedgerEntry) => {
    const ids = [entry.id, ...descendantsOf(entry.id, deps).filter(e => undoneSet.has(e.id)).map(e => e.id)];
    setChainOrder({});
    setInternalUndone(u => u.filter(id => !ids.includes(id)));
    onRedo?.(ids);
  };
  const total = entries.length;
  const undoneCount = entries.filter(e => undoneSet.has(e.id)).length;
  return (
    <div className={['ui-ldgc', className].filter(Boolean).join(' ')}>
      <style href="ui-agent-ledger-clean" precedence="default">{css}</style>
      <header className="ui-ldgc__bar">
        <span className="ui-ldgc__mark"><LedgerMark /></span>
        <span className="ui-ldgc__title" id={x}>{title}</span>
        {agent && <span className="ui-ldgc__agent">{agent}</span>}
        <span className="ui-ldgc__sum">
          <span><b>{total.toLocaleString('en-US')}</b> {total === 1 ? 'change' : 'changes'}</span>
          {undoneCount > 0 && <span className="ui-ldgc__sum-undone"><b>{undoneCount.toLocaleString('en-US')}</b> undone</span>}
        </span>
      </header>
      <ol className="ui-ldgc__panel" aria-labelledby={x}>
        {sorted.map(entry => {
          const isUndone = undoneSet.has(entry.id);
          const kind = chainKind.get(entry.id);
          const irreversible = entry.reversible === false;
          const cascadeCount = isUndone || irreversible ? 0 : liveDescendants(entry.id).length;
          const change = entry.change && (entry.change[0].trim() || entry.change[1].trim()) ? entry.change : undefined;
          return (
            <li key={entry.id} className="ui-ldgc__row"
              data-undone={isUndone ? '' : undefined}
              data-initial={initialIds.current?.has(entry.id) ? '' : undefined}
              data-preview={L === entry.id ? '' : undefined}
              data-chain={kind}
              style={{ '--o': chainOrder[entry.id] ?? 0 } as React.CSSProperties}>
              <span className="ui-ldgc__icon" aria-hidden="true">{entry.icon ?? letter(entry.system)}</span>
              <div className="ui-ldgc__main">
                <span className="ui-ldgc__what" title={entry.target ? `${entry.action} ${entry.target}` : entry.action}>
                  <span className="ui-ldgc__action" dir="auto">{entry.action}</span>
                  {entry.target && <span className="ui-ldgc__target" dir="auto">{entry.target}</span>}
                  <span className="ui-ldgc__strike" aria-hidden="true" />
                </span>
                <span className="ui-ldgc__change" title={change ? `${change[0]} → ${change[1]}` : entry.detail}>
                  {change ? (
                    <>
                      <span className="ui-ldgc__before" dir="auto">{change[0]}</span>
                      <span className="ui-ldgc__arrow" aria-label="to">→</span>
                      <span className="ui-ldgc__after" dir="auto">{change[1]}</span>
                    </>
                  ) : (
                    <span className="ui-ldgc__detail" dir="auto">{entry.detail}</span>
                  )}
                </span>
              </div>
              <div className="ui-ldgc__end">
                {kind ? (
                  <span className="ui-ldgc__flag" data-kind={kind}>{kind === 'also' ? 'Also undone' : <><LockIcon />Can't undo</>}</span>
                ) : (
                  <>
                    <span className="ui-ldgc__time" data-hide={isUndone || !irreversible ? '' : undefined}>
                      {isUndone ? 'Undone' : <>{fmtAt(entry.at, N)}<span className="ui-ldgc__sys"> · {entry.system}</span></>}
                    </span>
                    {isUndone ? (
                      <button type="button" className="ui-ldgc__act" onClick={() => doRedo(entry)} aria-label={`Redo: ${entry.action}${entry.target ? ` ${entry.target}` : ''}`}>
                        <RedoIcon /><span className="ui-ldgc__act-label">Redo</span>
                      </button>
                    ) : irreversible ? null : (
                      <button type="button" className="ui-ldgc__act"
                        onMouseEnter={() => setHoverId(entry.id)} onMouseLeave={() => setHoverId(h => h === entry.id ? null : h)}
                        onFocus={() => setHoverId(entry.id)} onBlur={() => setHoverId(h => h === entry.id ? null : h)}
                        onClick={() => doUndo(entry)}
                        aria-label={`Undo: ${entry.action}${entry.target ? ` ${entry.target}` : ''}${cascadeCount ? ` – and ${cascadeCount} that build on it` : ''}`}>
                        <UndoIcon /><span className="ui-ldgc__act-label">Undo</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const RAW: (Omit<LedgerEntry, 'at'> & { t: number })[] = [
  { t: 0, id: 'pr', action: 'Merged PR #482', target: 'Pricing page v2', system: 'GitHub', icon: <GitHubIcon />, change: ['pricing-v2', 'main'] },
  { t: 1.5, id: 'deploy', action: 'Deployed', target: 'affectui.com', system: 'Vercel', icon: <VercelIcon />, change: ['#481', '#483 in production'], dependsOn: ['pr'] },
  { t: 2.6, id: 'price', action: 'Changed price', target: 'Pro plan', system: 'Stripe', icon: <StripeIcon />, change: ['$29 / month', '$34 / month'] },
  { t: 3.7, id: 'coupon', action: 'Created coupon', target: 'LAUNCH20', system: 'Stripe', icon: <StripeIcon />, detail: '20% off the first year · ends in 7 days' },
  { t: 4.8, id: 'faq', action: 'Updated page', target: 'Pricing FAQ', system: 'Notion', icon: <NotionIcon />, change: ['3 answers', '3 answers rewritten'] },
  { t: 5.9, id: 'deals', action: 'Updated 212 deals', target: 'Renewals in Q4', system: 'HubSpot', icon: <HubSpotIcon />, change: ['$29 per seat', '$34 per seat'], dependsOn: ['price'] },
  { t: 7, id: 'post', action: 'Posted in #launch', target: 'New pricing is live', system: 'Slack', icon: <SlackIcon />, detail: 'With a link to the pricing page', dependsOn: ['deploy'] },
  { t: 8.1, id: 'email', action: 'Sent email', target: '3,812 customers', system: 'HubSpot', icon: <HubSpotIcon />, detail: 'New price and the code LAUNCH20', dependsOn: ['price', 'coupon'], reversible: false },
];

const POINT_AT = 10;
const AUTO_UNDO_AT = 12.2;
const RESET_AT = 24;
const TIME_SCALE = 22;

export default function AgentLedgerDemo() {
  const [elapsed, setElapsed] = useState(0);
  const [generation, setGeneration] = useState(0);
  const [undone, setUndone] = useState<string[]>([]);
  const [base] = useState(() => Date.now());
  const clock = useRef(0);
  const paused = useRef(false);
  const interacted = useRef(false);
  useEffect(() => {
    let last = performance.now();
    const iv = window.setInterval(() => {
      const now = performance.now();
      if (!paused.current) clock.current += (now - last) / 1e3;
      last = now;
      if (clock.current > RESET_AT) {
        clock.current = 0;
        interacted.current = false;
        setUndone([]);
        setGeneration(g => g + 1);
      } else if (!interacted.current && clock.current >= AUTO_UNDO_AT) {
        setUndone(u => (u.length ? u : ['price', 'deals']));
      }
      setElapsed(clock.current);
    }, 100);
    return () => window.clearInterval(iv);
  }, []);
  const entries = RAW.filter(e => elapsed >= e.t).map(({ t, ...rest }) => ({ ...rest, at: base + t * TIME_SCALE * 1e3 }));
  return (
    <div className="al-demo"
      onPointerEnter={e => { if (e.pointerType === 'mouse') paused.current = true; }}
      onPointerLeave={() => { paused.current = false; }}>
      <AgentLedger key={generation} entries={entries} agent="Launch agent" now={base + elapsed * TIME_SCALE * 1e3}
        pointAt={!interacted.current && elapsed >= POINT_AT && elapsed < AUTO_UNDO_AT ? 'price' : null}
        undone={undone}
        onUndo={ids => { interacted.current = true; setUndone(u => [...u, ...ids.filter(id => !u.includes(id))]); }}
        onRedo={ids => { interacted.current = true; setUndone(u => u.filter(id => !ids.includes(id))); }} />
    </div>
  );
}
