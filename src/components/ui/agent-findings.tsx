import React, { useEffect, useState } from 'react';

const css = ".ui-afc { --ui-afc-card: #ffffff; --ui-afc-strong: var(--aui-ink, #000000); --ui-afc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88)); --ui-afc-text: rgba(0, 0, 0, 0.61); --ui-afc-muted: var(--aui-muted, rgba(0, 0, 0, 0.45)); --ui-afc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.27)); --ui-afc-line: var(--aui-border, rgba(0, 0, 0, 0.06)); --ui-afc-fill: rgba(0, 0, 0, 0.06); --ui-afc-hover: var(--aui-subtle, rgba(0, 0, 0, 0.025)); --ui-afc-select: rgba(0, 0, 0, 0.04); --ui-afc-run-bg: rgba(0, 96, 226, 0.1); --ui-afc-run-edge: rgba(0, 96, 226, 0.32); --ui-afc-done-bg: rgba(0, 0, 0, 0.05); --ui-afc-done-edge: rgba(0, 0, 0, 0.1); --ui-afc-fail-bg: #f52b0018; --ui-afc-fail-edge: color-mix(in srgb, var(--aui-red, #f04438) 34%, transparent); --ui-afc-crit: var(--aui-danger, #c4320a); --ui-afc-warn: var(--aui-warning, #b25e00); --ui-afc-note: rgba(0, 96, 226, 0.8); --ui-afc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7)); --ui-afc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05); --ui-afc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1)); --ui-afc-row: 40px; position: relative; box-sizing: border-box; width: 100%; max-width: 640px; container-type: inline-size; font-family: var(--aui-font, \"Inter\", \"InterVariable\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif); font-size: 13px; font-weight: 400; line-height: 20px; color: var(--aui-muted, var(--ui-afc-text)); text-align: left; -webkit-font-smoothing: antialiased; }\n.ui-afc *, .ui-afc ::before, .ui-afc ::after { box-sizing: border-box; }\n:where(.ui-afc) button { margin: 0px; padding: 0px; border: 0px; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }\n.ui-afc button:focus-visible { outline: 2px solid var(--ui-afc-focus); outline-offset: -2px; }\n.ui-afc :is(ul, ol) { margin: 0px; padding: 0px; list-style: none; }\n.ui-afc svg { display: block; flex: 0 0 auto; }\n.ui-afc b { font-weight: 500; }\n.ui-afc__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n.ui-afc__card { border-radius: var(--aui-radius-lg, 10px); background: var(--aui-surface, var(--ui-afc-card)); box-shadow: var(--aui-shadow-card, var(--ui-afc-shadow)); overflow: hidden; }\n.ui-afc__bar { display: flex; align-items: center; gap: 10px; min-width: 0px; padding: 14px 16px; border-bottom: 0.5px solid var(--ui-afc-line); }\n.ui-afc__spark { display: grid; flex: 0 0 auto; place-items: center; width: 16px; color: rgba(0, 96, 226, 0.765); }\n.ui-afc__title { font-weight: 500; color: var(--ui-afc-strong); white-space: nowrap; min-width: 0px; overflow: hidden; text-overflow: ellipsis; }\n.ui-afc__progress { flex: 1 0 auto; min-width: 0px; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-afc-muted); white-space: nowrap; text-overflow: ellipsis; font-variant-numeric: tabular-nums; }\n.ui-afc__totals { display: flex; flex: 0 0 auto; gap: 12px; font-size: 12px; line-height: 16px; white-space: nowrap; }\n.ui-afc__totals > span { display: inline-flex; align-items: center; gap: 6px; transition: color 300ms; }\n.ui-afc__totals > span::before { content: \"\"; width: 6px; height: 6px; border-radius: 50%; background: currentcolor; }\n.ui-afc__totals [data-severity=\"critical\"] { color: var(--ui-afc-crit); }\n.ui-afc__totals [data-severity=\"warning\"] { color: var(--ui-afc-warn); }\n.ui-afc__totals [data-zero] { color: var(--ui-afc-faint); }\n.ui-afc__totals b, .ui-afc__found b { display: inline-block; font-variant-numeric: tabular-nums; animation: ui-afc-roll 420ms var(--ui-afc-ease); }\n.ui-afc__agents { padding: 6px 6px 2px; }\n.ui-afc__agent { display: grid; grid-template-columns: 24px minmax(0, 1fr) 128px max(40px, var(--ui-afc-count-w)) max(60px, var(--ui-afc-found-w)); align-items: center; gap: 12px; width: 100%; height: 48px; padding: 0px 10px; border-radius: calc(var(--aui-radius-lg, 10px) - 2px); transition: background-color 160ms, opacity 220ms; }\n.ui-afc__agent:hover { background: var(--ui-afc-hover); }\n.ui-afc__agent[aria-pressed=\"true\"] { background: var(--ui-afc-select); }\n.ui-afc__agent[data-dim] { opacity: 0.5; }\n.ui-afc__agent[data-dim]:hover { opacity: 0.8; }\n.ui-afc__avatar { display: grid; place-items: center; width: 24px; height: 24px; overflow: hidden; border-radius: 6px; background: var(--ui-afc-fill); font-size: 10px; font-weight: 500; letter-spacing: 0.3px; color: var(--ui-afc-text); }\n.ui-afc__avatar[data-logo] { background: var(--ui-afc-card); box-shadow: var(--ui-afc-shadow); }\n.ui-afc__avatar > svg { width: 14px; height: 14px; }\n.ui-afc__avatar > img { display: block; width: 100%; height: 100%; object-fit: cover; }\n.ui-afc__who { display: grid; min-width: 0px; }\n.ui-afc__name { overflow: hidden; font-weight: 500; line-height: 18px; color: var(--ui-afc-ink); white-space: nowrap; text-overflow: ellipsis; }\n.ui-afc__step { overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-afc-muted); white-space: nowrap; text-overflow: ellipsis; animation: ui-afc-swap 360ms var(--ui-afc-ease); }\n.ui-afc__track { position: relative; height: 6px; border-radius: 3px; background: var(--ui-afc-fill); overflow: hidden; }\n.ui-afc__fill { position: absolute; inset: 0px auto 0px 0px; overflow: hidden; border-radius: 3px; background: var(--ui-afc-done-bg); box-shadow: inset 0 0 0 0.5px var(--ui-afc-done-edge); transition: width 700ms var(--ui-afc-ease), background-color 300ms ease; }\n.ui-afc__agent[data-status=\"running\"] .ui-afc__fill { background: var(--ui-afc-run-bg); box-shadow: inset 0 0 0 0.5px var(--ui-afc-run-edge); }\n.ui-afc__agent[data-status=\"failed\"] .ui-afc__fill { background: var(--ui-afc-fail-bg); box-shadow: inset 0 0 0 0.5px var(--ui-afc-fail-edge); }\n.ui-afc__agent[data-status=\"running\"] .ui-afc__fill::before { content: \"\"; position: absolute; inset: 0px auto 0px 0px; width: 40px; background: linear-gradient(90deg, transparent, var(--ui-afc-card), transparent); opacity: 0.7; animation: 1500ms linear 0s infinite normal none running ui-afc-sheen; }\n.ui-afc__agent[data-status=\"running\"] .ui-afc__fill::after { content: \"\"; position: absolute; inset: 0px 0px 0px auto; width: 18px; background: linear-gradient(90deg, transparent, var(--ui-afc-run-edge)); animation: 1100ms ease-in-out 0s infinite alternate none running ui-afc-breathe; }\n.ui-afc__count { font-size: 12px; line-height: 16px; color: var(--ui-afc-muted); text-align: right; font-variant-numeric: tabular-nums; }\n.ui-afc__found { display: flex; justify-content: flex-end; gap: 10px; font-size: 12px; line-height: 16px; }\n.ui-afc__found > span { display: inline-flex; align-items: center; gap: 4px; min-width: 22px; }\n.ui-afc__found [data-zero] { opacity: 0.28; }\n.ui-afc__found [data-zero] .ui-afc__mark { color: var(--ui-afc-faint); }\n.ui-afc__found [data-severity=\"critical\"] b { color: var(--ui-afc-crit); }\n.ui-afc__found [data-severity=\"warning\"] b { color: var(--ui-afc-warn); }\n.ui-afc__found [data-zero] b { color: var(--ui-afc-muted); }\n.ui-afc__mark[data-severity=\"critical\"] { color: var(--ui-afc-crit); }\n.ui-afc__mark[data-severity=\"warning\"] { color: var(--ui-afc-warn); }\n.ui-afc__mark[data-severity=\"note\"] { color: var(--ui-afc-note); }\n.ui-afc__feed-head { display: flex; align-items: center; gap: 8px; height: 40px; margin-top: 4px; padding: 0px 16px; border-top: 0.5px solid var(--ui-afc-line); }\n.ui-afc__label { font-size: 10px; font-weight: 500; line-height: 16px; letter-spacing: 0.5px; text-transform: uppercase; color: var(--ui-afc-muted); }\n.ui-afc__chip { display: inline-flex; align-items: center; gap: 4px; height: 20px; padding: 0px 6px 0px 8px; border-radius: calc(var(--aui-radius-sm, 5px) + 1px); background: var(--ui-afc-fill); font-size: 12px; font-weight: 500; line-height: 16px; color: var(--ui-afc-ink); animation: ui-afc-swap 260ms var(--ui-afc-ease); }\n.ui-afc__chip { max-width: 60%; }\n.ui-afc__chip-name { min-width: 0px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }\n.ui-afc__chip svg { color: var(--ui-afc-muted); }\n.ui-afc__feed { position: relative; height: calc(var(--ui-afc-shown, var(--ui-afc-rows)) * var(--ui-afc-row) + 8px); transition: height 520ms var(--ui-afc-ease); margin: 0px 6px; padding-bottom: 8px; overflow: hidden; }\n.ui-afc__slot { position: absolute; top: 0px; right: 0px; left: 0px; height: var(--ui-afc-row); transition: transform 520ms var(--ui-afc-ease), opacity 320ms ease; }\n.ui-afc__slot[data-out] { opacity: 0; pointer-events: none; }\n.ui-afc__finding { display: block; width: 100%; height: 100%; border-radius: calc(var(--aui-radius-lg, 10px) - 2px); transition: background-color 160ms; }\n.ui-afc__finding:hover { background: var(--ui-afc-hover); }\n.ui-afc__in { display: flex; align-items: center; gap: 10px; height: 100%; min-width: 0px; padding: 0px 10px; animation: ui-afc-in 560ms var(--ui-afc-ease); }\n.ui-afc__ftitle { flex: 0 1 auto; min-width: 0px; overflow: hidden; color: var(--ui-afc-ink); white-space: nowrap; text-overflow: ellipsis; }\n.ui-afc__meta { display: flex; flex: 1 1 0px; align-items: center; gap: 6px; min-width: 0px; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-afc-muted); white-space: nowrap; }\n.ui-afc__meta code { overflow: hidden; font-family: var(--aui-font-mono, ui-monospace, \"SF Mono\", Menlo, monospace); font-size: 11.5px; text-overflow: ellipsis; }\n.ui-afc__who-name { flex: 0 1 auto; min-width: 0px; overflow: hidden; text-overflow: ellipsis; }\n.ui-afc__meta code { flex: 0 1 auto; min-width: 0px; }\n.ui-afc__dot { color: var(--ui-afc-faint); }\n.ui-afc__time { flex: 0 0 auto; min-width: 28px; font-size: 12px; line-height: 16px; color: var(--ui-afc-faint); text-align: right; font-variant-numeric: tabular-nums; }\n.ui-afc__none { display: grid; place-items: center; height: 48px; font-size: 12px; color: var(--ui-afc-muted); }\n.ui-afc__empty { display: grid; place-items: center; height: var(--ui-afc-row); font-size: 12px; color: var(--ui-afc-muted); }\n@media (prefers-reduced-motion: reduce){.ui-afc *, .ui-afc ::before, .ui-afc ::after { animation: auto ease 0s 1 normal none running none !important; transition: none !important; }}\n:where(.dark, [data-theme=\"dark\"]) .ui-afc { --ui-afc-card: #1c1c1f; --ui-afc-strong: var(--aui-ink, #ffffff); --ui-afc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9)); --ui-afc-text: rgba(255, 255, 255, 0.62); --ui-afc-muted: var(--aui-muted, rgba(255, 255, 255, 0.45)); --ui-afc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.28)); --ui-afc-line: var(--aui-border, rgba(255, 255, 255, 0.08)); --ui-afc-fill: rgba(255, 255, 255, 0.08); --ui-afc-hover: var(--aui-subtle, rgba(255, 255, 255, 0.04)); --ui-afc-select: rgba(255, 255, 255, 0.06); --ui-afc-run-bg: color-mix(in srgb, var(--aui-blue, #4fb0fe) 18%, transparent); --ui-afc-run-edge: color-mix(in srgb, var(--aui-blue, #4fb0fe) 50%, transparent); --ui-afc-done-bg: rgba(255, 255, 255, 0.08); --ui-afc-done-edge: rgba(255, 255, 255, 0.14); --ui-afc-fail-bg: #ff35232b; --ui-afc-fail-edge: color-mix(in srgb, var(--aui-red, #ff6b5f) 45%, transparent); --ui-afc-crit: var(--aui-danger, #ff8a7a); --ui-afc-warn: var(--aui-warning, #ffb35c); --ui-afc-note: var(--aui-blue, #4fb0fe); --ui-afc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8)); --ui-afc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4); }\n:where(.dark, [data-theme=\"dark\"]) .ui-afc__spark { color: var(--aui-info, #4fb0fe); }\n:where(.dark, [data-theme=\"dark\"]) .ui-afc__agent[data-status=\"running\"] .ui-afc__fill::before { background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent); }\n.lp-show__main > .ui-agtc .ui-agtc__node { padding-bottom: 72px; }\n.lp-show .ui-agtc { --ui-agtc-card-w: 320px; }\n.lp-show .ui-agtc__node > * { max-width: 236px; }\n.lp-show__main > .ui-agtc .ui-agtc__node { row-gap: 14px; }\n.lp-show .ui-agtc__status { align-self: center; }\n.lp-show .ui-agtc__bar { display: none; }\n.lp-show .ui-agtc__node, .lp-show__main > .ui-ccc .ui-ccc__body { box-shadow: var(--ui-agtc-shadow,var(--ui-ccc-shadow)), 0 18px 40px -10px #0000001f, 0 40px 80px -24px #0000001a; }\n.lp-show__above .ui-agtc__node { box-shadow: var(--ui-agtc-shadow), 0 2px 4px -2px #0000000a; }\n.afc-demo { grid-template-columns: minmax(0px, 640px); justify-content: center; width: 100%; display: grid; }\n.card__preview .afc-demo { grid-template-columns: auto; align-content: center; position: absolute; inset: 0px; }\n.card__preview .afc-demo :is(.ui-af, .ui-afc) { zoom: 0.44; width: 640px; max-width: none; }\n.stage:has(.afc-demo) { align-items: start; height: 600px; padding-top: 64px; }\n@media (max-width: 760px){.stage:has(.afc-demo) { height: 620px; padding-left: 12px; padding-right: 12px; }}\n@keyframes ui-afc-in {0%{opacity: 0; transform: translateY(-10px); filter: blur(2px);}}\n@keyframes ui-afc-swap {0%{opacity: 0; transform: translateY(3px);}}\n@keyframes ui-afc-roll {0%{opacity: 0; transform: translateY(-5px);}}\n@keyframes ui-afc-sheen {0%{transform: translateX(-40px);}100%{transform: translateX(160px);}}\n@keyframes ui-afc-breathe {0%{opacity: 0.45;}100%{opacity: 1;}}";

type Severity = 'critical' | 'warning' | 'note';

interface AgentConf {
  id: string; name: string; model: string; avatar: React.ReactNode;
  total: number; finish: number; steps: string[];
}
interface AgentItem extends AgentConf { done: number; step?: string; status?: string }
interface FindingItem {
  id: string; agentId: string; severity: Severity; title: string;
  location?: string; at: number; src?: unknown; key?: string;
}

const toMs = (v: unknown): number =>
  v instanceof Date ? v.getTime() : typeof v === 'number' ? v : typeof v === 'string' ? Date.parse(v) : NaN;

const relTime = (at: number, now: number): string => {
  if (!Number.isFinite(at) || !Number.isFinite(now)) return '';
  const n = Math.max(0, Math.round((now - at) / 1000));
  return n < 5 ? 'now' : n < 60 ? `${n}s` : n < 3600 ? `${Math.floor(n / 60)}m` : n < 86400 ? `${Math.floor(n / 3600)}h` : `${Math.floor(n / 86400)}d`;
};

const graphemes = (s: string): string[] =>
  typeof Intl.Segmenter === 'function' ? Array.from(new Intl.Segmenter().segment(s), x => x.segment) : Array.from(s);

const initials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const alpha = words.filter(w => /^[\p{L}\p{N}]/u.test(w));
  if (alpha.length) {
    const use = alpha.length > 1 ? [alpha[0], alpha[alpha.length - 1]] : alpha;
    return use.map(w => graphemes(w)[0]).join('').toUpperCase();
  }
  return words.length ? graphemes(words[0])[0] : '';
};

const clampNum = (v: unknown): number =>
  typeof v === 'number' && Number.isFinite(v) ? Math.max(0, Math.floor(v)) : 0;

const nf = new Intl.NumberFormat('en');
const fmtCount = (n: number): string => (n > 999 ? '999+' : nf.format(n));
const sevNorm = (s: unknown): Severity => (s === 'critical' || s === 'warning' ? s : 'note');
const SEV_LABEL: Record<Severity, string> = { critical: 'Critical', warning: 'Warning', note: 'Note' };
const ROW_H = 40;
const LOOP_SECONDS = 26;

const normList = <T extends object>(list: T[] | undefined) => {
  const seen = new Map<string, number>();
  return (Array.isArray(list) ? list : [])
    .filter(x => !!x && typeof x === 'object')
    .map(x => {
      const id = String((x as { id?: unknown }).id ?? '');
      const r = seen.get(id) ?? 0;
      seen.set(id, r + 1);
      return { x, id, key: r ? `${id}#${r}` : id };
    });
};

const SeverityMark = ({ severity }: { severity: string }) => {
  const op = severity === 'critical' ? [1, 1, 1, 0.6] : severity === 'warning' ? [1, 0.6, 0.6, 0.3] : [0.6, 0.3, 0.3, 0.3];
  return (
    <svg className="ui-afc__mark" data-severity={severity} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      {[[0, 0], [5.5, 0], [0, 5.5], [5.5, 5.5]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="4.5" height="4.5" rx="1" fill="currentColor" opacity={op[i]} />
      ))}
    </svg>
  );
};

const SparkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z" fill="currentColor" />
    <circle cx="11.6" cy="11.4" r="1.1" fill="currentColor" opacity="0.55" />
  </svg>
);

const StepText = ({ text }: { text: string }) => (
  <span className="ui-afc__step" dir="auto" title={text}>{text}</span>
);

const AgentAvatar = ({ avatar, name }: { avatar?: React.ReactNode; name: string }) => {
  const [failed, setFailed] = useState(false);
  const showLogo = avatar != null && avatar !== false && !failed;
  return (
    <span className="ui-afc__avatar" data-logo={showLogo ? '' : undefined} onErrorCapture={() => setFailed(true)}>
      {showLogo ? avatar : initials(name)}
    </span>
  );
};

function FindingsCard({ agents, findings, title = 'Verification', rows = 4, now: nowProp, onOpen, className }: {
  agents?: AgentItem[]; findings?: FindingItem[]; title?: string; rows?: number;
  now?: number; onOpen?: (src: unknown) => void; className?: string;
}) {
  const [innerNow, setInnerNow] = useState(() => Date.now());
  const [sel, setSel] = useState<string | null>(null);
  useEffect(() => {
    if (nowProp !== undefined) return;
    const id = window.setInterval(() => setInnerNow(Date.now()), 5000);
    return () => window.clearInterval(id);
  }, [nowProp]);
  const now = nowProp ?? innerNow;
  const O = typeof rows === 'number' && Number.isFinite(rows) && rows >= 1 ? Math.floor(rows) : 4;

  const k = normList(agents).map(({ x, id, key }) => {
    const a = x as AgentItem & { status?: string };
    const total = clampNum(a.total);
    const status = a.status === 'running' || a.status === 'done' || a.status === 'failed' ? a.status : undefined;
    return { ...a, id, key, name: String(a.name ?? '').trim() || id || 'Agent', total, done: Math.min(clampNum(a.done), total), status };
  });
  const A = normList(findings).map(({ x, id, key }) => {
    const f = x as FindingItem;
    return { ...f, id, key, src: f, agentId: String(f.agentId ?? ''), title: String(f.title ?? ''), severity: sevNorm(f.severity), at: toMs(f.at) };
  });

  const j = k.reduce((a, b) => a + b.done, 0);
  const M = k.reduce((a, b) => a + b.total, 0);
  const count = (sev: Severity, agentId?: string) => A.filter(n => n.severity === sev && (!agentId || n.agentId === agentId)).length;
  const P = count('critical');
  const F = count('warning');
  const I = Math.max(0, ...k.map(e => `${nf.format(e.done)}/${nf.format(e.total)}`.length));
  const L = Math.max(1, ...k.map(e => Math.max(fmtCount(count('critical', e.id)).length, fmtCount(count('warning', e.id)).length)));
  const byId = (id: string) => k.find(t => t.id === id);
  const z = sel ? byId(sel) : undefined;
  const B = z ? sel : null;
  const V = (e: { at: number }) => (Number.isFinite(e.at) ? e.at : -Infinity);
  const H = A.filter(e => !B || e.agentId === B).sort((a, b) => (V(a) === V(b) ? 0 : V(b) > V(a) ? 1 : -1)).slice(0, O + 1);

  return (
    <div className={['ui-afc', className].filter(Boolean).join(' ')} style={{ '--ui-afc-rows': O, '--ui-afc-count-w': `${I}ch`, '--ui-afc-found-w': `calc(38px + ${L * 2}ch)` } as React.CSSProperties}>
      <div className="ui-afc__card">
        <header className="ui-afc__bar">
          <span className="ui-afc__spark"><SparkIcon /></span>
          <span className="ui-afc__title" title={title}>{title}</span>
          <span className="ui-afc__progress">{M > 0 && `${nf.format(j)} of ${nf.format(M)} ${M === 1 ? 'check' : 'checks'}`}</span>
          <span className="ui-afc__totals" aria-label={`${nf.format(P)} critical, ${nf.format(F)} ${F === 1 ? 'warning' : 'warnings'}`}>
            <span data-severity="critical" data-zero={P === 0 || undefined}><b>{nf.format(P)}</b> critical</span>
            <span data-severity="warning" data-zero={F === 0 || undefined}><b>{nf.format(F)}</b> {F === 1 ? 'warning' : 'warnings'}</span>
          </span>
        </header>
        <ul className="ui-afc__agents" aria-label="Agents">
          {k.length === 0 && <li className="ui-afc__none">No agents yet</li>}
          {k.map(agent => {
            const status = agent.status ?? (agent.done >= agent.total ? 'done' : 'running');
            const pct = agent.total ? Math.min(100, (agent.done / agent.total) * 100) : 0;
            const crit = count('critical', agent.id);
            const warn = count('warning', agent.id);
            const pressed = B === agent.id;
            const stepText = status === 'done' ? 'All checks done' : status === 'failed' ? 'Stopped' : agent.step;
            return (
              <li key={agent.key}>
                <button
                  type="button"
                  className="ui-afc__agent"
                  data-status={status}
                  aria-pressed={pressed}
                  data-dim={B && !pressed ? '' : undefined}
                  title={agent.model ? `${agent.name} · ${agent.model}` : agent.name}
                  onClick={() => setSel(pressed ? null : agent.id)}
                >
                  <AgentAvatar avatar={agent.avatar} name={agent.name} />
                  <span className="ui-afc__who">
                    <span className="ui-afc__name" dir="auto">{agent.name}</span>
                    <StepText text={String(stepText ?? '')} />
                  </span>
                  <span className="ui-afc__track" aria-hidden="true">
                    <span className="ui-afc__fill" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="ui-afc__count">{nf.format(agent.done)}/{nf.format(agent.total)}</span>
                  <span className="ui-afc__found" aria-label={`${nf.format(crit)} critical, ${nf.format(warn)} ${warn === 1 ? 'warning' : 'warnings'}`}>
                    <span data-severity="critical" data-zero={crit === 0 || undefined}><SeverityMark severity="critical" /><b>{fmtCount(crit)}</b></span>
                    <span data-severity="warning" data-zero={warn === 0 || undefined}><SeverityMark severity="warning" /><b>{fmtCount(warn)}</b></span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="ui-afc__feed-head">
          <span className="ui-afc__label">Latest findings</span>
          {z && (
            <button type="button" className="ui-afc__chip" onClick={() => setSel(null)} aria-label={`Show all agents (now only ${z.name})`} title={z.name}>
              <span className="ui-afc__chip-name">{z.name}</span>
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
        <ol className="ui-afc__feed" aria-live="polite" style={{ '--ui-afc-shown': Math.max(1, Math.min(H.length, O)) } as React.CSSProperties}>
          {H.length === 0 && <li className="ui-afc__empty">Nothing found yet</li>}
          {H.map((f, idx) => {
            const agentName = byId(f.agentId)?.name;
            const loc = f.location ? String(f.location) : '';
            return (
              <li key={f.key} className="ui-afc__slot" style={{ transform: `translateY(${idx * ROW_H}px)` }} data-out={idx >= O || undefined} aria-hidden={idx >= O || undefined}>
                <button type="button" className="ui-afc__finding" tabIndex={idx >= O ? -1 : 0} onClick={() => onOpen?.(f.src)}>
                  <span className="ui-afc__in">
                    <SeverityMark severity={f.severity} />
                    <span className="ui-afc__sr">{SEV_LABEL[f.severity]}: </span>
                    <span className="ui-afc__ftitle" dir="auto" title={f.title}>{f.title}</span>
                    <span className="ui-afc__meta" title={[agentName, loc].filter(Boolean).join(' · ') || undefined}>
                      {agentName && <span className="ui-afc__who-name">{agentName}</span>}
                      {agentName && loc && <span className="ui-afc__dot">·</span>}
                      {loc && <code>{loc}</code>}
                    </span>
                    <span className="ui-afc__time">{relTime(f.at, now)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

const AGENT_CONF: AgentConf[] = [
  { id: 'auditor', name: 'Auditor', model: 'Opus 5.5', avatar: <svg viewBox="0 0 1200 1200" aria-hidden="true"><path fill="#D97757" d="M 233.959793 800.214905 L 468.644287 668.536987 L 472.590637 657.100647 L 468.644287 650.738403 L 457.208069 650.738403 L 417.986633 648.322144 L 283.892639 644.69812 L 167.597321 639.865845 L 54.926208 633.825623 L 26.577238 627.785339 L 3.3e-05 592.751709 L 2.73832 575.27533 L 26.577238 559.248352 L 60.724873 562.228149 L 136.187973 567.382629 L 249.422867 575.194763 L 331.570496 580.026978 L 453.261841 592.671082 L 472.590637 592.671082 L 475.328857 584.859009 L 468.724915 580.026978 L 463.570557 575.194763 L 346.389313 495.785217 L 219.543671 411.865906 L 153.100723 363.543762 L 117.181267 339.060425 L 99.060455 316.107361 L 91.248367 266.01355 L 123.865784 230.093994 L 167.677887 233.073853 L 178.872513 236.053772 L 223.248367 270.201477 L 318.040283 343.570496 L 441.825592 434.738342 L 459.946411 449.798706 L 467.194672 444.64447 L 468.080597 441.020203 L 459.946411 427.409485 L 392.617493 305.718323 L 320.778564 181.932983 L 288.80542 130.630859 L 280.348999 99.865845 C 277.369171 87.221436 275.194641 76.590698 275.194641 63.624268 L 312.322174 13.20813 L 332.8591 6.604126 L 382.389313 13.20813 L 403.248352 31.328979 L 434.013519 101.71814 L 483.865753 212.537048 L 561.181274 363.221497 L 583.812134 407.919434 L 595.892639 449.315491 L 600.40271 461.959839 L 608.214783 461.959839 L 608.214783 454.711609 L 614.577271 369.825623 L 626.335632 265.61084 L 637.771851 131.516846 L 641.718201 93.745117 L 660.402832 48.483276 L 697.530334 24.000122 L 726.52356 37.852417 L 750.362549 72 L 747.060486 94.067139 L 732.886047 186.201416 L 705.100708 330.52356 L 686.979919 427.167847 L 697.530334 427.167847 L 709.61084 415.087341 L 758.496704 350.174561 L 840.644348 247.490051 L 876.885925 206.738342 L 919.167847 161.71814 L 946.308838 140.29541 L 997.61084 140.29541 L 1035.38269 196.429626 L 1018.469849 254.416199 L 965.637634 321.422852 L 921.825562 378.201538 L 859.006714 462.765259 L 819.785278 530.41626 L 823.409424 535.812073 L 832.75177 534.92627 L 974.657776 504.724915 L 1051.328979 490.872559 L 1142.818848 475.167786 L 1184.214844 494.496582 L 1188.724854 514.147644 L 1172.456421 554.335693 L 1074.604126 578.496765 L 959.838989 601.449829 L 788.939636 641.879272 L 786.845764 643.409485 L 789.261841 646.389343 L 866.255127 653.637634 L 899.194702 655.409424 L 979.812134 655.409424 L 1129.932861 666.604187 L 1169.154419 692.537109 L 1192.671265 724.268677 L 1188.724854 748.429688 L 1128.322144 779.194641 L 1046.818848 759.865845 L 856.590759 714.604126 L 791.355774 698.335754 L 782.335693 698.335754 L 782.335693 703.731567 L 836.69812 756.885986 L 936.322205 846.845581 L 1061.073975 962.81897 L 1067.436279 991.490112 L 1051.409424 1014.120911 L 1034.496704 1011.704712 L 924.885986 929.234924 L 882.604126 892.107544 L 786.845764 811.48999 L 780.483276 811.48999 L 780.483276 819.946289 L 802.550415 852.241699 L 919.087341 1027.409424 L 925.127625 1081.127686 L 916.671204 1098.604126 L 886.469849 1109.154419 L 853.288696 1103.114136 L 785.073914 1007.355835 L 714.684631 899.516785 L 657.906067 802.872498 L 650.979858 806.81897 L 617.476624 1167.704834 L 601.771851 1186.147705 L 565.530212 1200 L 535.328857 1177.046997 L 519.302124 1139.919556 L 535.328857 1066.550537 L 554.657776 970.792053 L 570.362488 894.68457 L 584.536926 800.134277 L 592.993347 768.724976 L 592.429626 766.630859 L 585.503479 767.516968 L 514.22821 865.369263 L 405.825531 1011.865906 L 320.053711 1103.677979 L 299.516815 1111.812256 L 263.919525 1093.369263 L 267.221497 1060.429688 L 287.114136 1031.114136 L 405.825531 880.107361 L 477.422913 786.52356 L 523.651062 732.483276 L 523.328918 724.671265 L 520.590698 724.671265 L 205.288605 929.395935 L 149.154434 936.644409 L 124.993355 914.01355 L 127.973183 876.885986 L 139.409409 864.80542 L 234.201385 799.570435 L 233.879227 799.8927 Z"></path></svg>, total: 24, finish: 25, steps: ['Tracing calls in Vault.withdraw', 'Checking access control on mint', 'Reading upgrade paths', 'Comparing roles with the spec'] },
  { id: 'fuzzer', name: 'Fuzzer', model: 'GPT-6', avatar: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{color: 'var(--ui-afc-strong, var(--ui-af-ink, #000))'}}><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path></svg>, total: 18, finish: 24, steps: ['Fuzzing transfer with 10k inputs', 'Replaying failed sequences', 'Shrinking a failing case', 'Fuzzing the oracle feed'] },
  { id: 'prover', name: 'Prover', model: 'Gemini 3.8 Pro', avatar: <svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="gm_r_1_" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#1C7DFF"></stop><stop offset="0.52" stopColor="#1C69FF"></stop><stop offset="1" stopColor="#B04DFF"></stop></linearGradient></defs><path fill="url(#gm_r_1_)" d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"></path></svg>, total: 12, finish: 26, steps: ['Proving totalSupply invariant', 'Checking balance conservation', 'Bounding loop iterations'] },
  { id: 'gas', name: 'Gas review', model: 'Sonnet 5.5', avatar: <svg viewBox="0 0 1200 1200" aria-hidden="true"><path fill="#D97757" d="M 233.959793 800.214905 L 468.644287 668.536987 L 472.590637 657.100647 L 468.644287 650.738403 L 457.208069 650.738403 L 417.986633 648.322144 L 283.892639 644.69812 L 167.597321 639.865845 L 54.926208 633.825623 L 26.577238 627.785339 L 3.3e-05 592.751709 L 2.73832 575.27533 L 26.577238 559.248352 L 60.724873 562.228149 L 136.187973 567.382629 L 249.422867 575.194763 L 331.570496 580.026978 L 453.261841 592.671082 L 472.590637 592.671082 L 475.328857 584.859009 L 468.724915 580.026978 L 463.570557 575.194763 L 346.389313 495.785217 L 219.543671 411.865906 L 153.100723 363.543762 L 117.181267 339.060425 L 99.060455 316.107361 L 91.248367 266.01355 L 123.865784 230.093994 L 167.677887 233.073853 L 178.872513 236.053772 L 223.248367 270.201477 L 318.040283 343.570496 L 441.825592 434.738342 L 459.946411 449.798706 L 467.194672 444.64447 L 468.080597 441.020203 L 459.946411 427.409485 L 392.617493 305.718323 L 320.778564 181.932983 L 288.80542 130.630859 L 280.348999 99.865845 C 277.369171 87.221436 275.194641 76.590698 275.194641 63.624268 L 312.322174 13.20813 L 332.8591 6.604126 L 382.389313 13.20813 L 403.248352 31.328979 L 434.013519 101.71814 L 483.865753 212.537048 L 561.181274 363.221497 L 583.812134 407.919434 L 595.892639 449.315491 L 600.40271 461.959839 L 608.214783 461.959839 L 608.214783 454.711609 L 614.577271 369.825623 L 626.335632 265.61084 L 637.771851 131.516846 L 641.718201 93.745117 L 660.402832 48.483276 L 697.530334 24.000122 L 726.52356 37.852417 L 750.362549 72 L 747.060486 94.067139 L 732.886047 186.201416 L 705.100708 330.52356 L 686.979919 427.167847 L 697.530334 427.167847 L 709.61084 415.087341 L 758.496704 350.174561 L 840.644348 247.490051 L 876.885925 206.738342 L 919.167847 161.71814 L 946.308838 140.29541 L 997.61084 140.29541 L 1035.38269 196.429626 L 1018.469849 254.416199 L 965.637634 321.422852 L 921.825562 378.201538 L 859.006714 462.765259 L 819.785278 530.41626 L 823.409424 535.812073 L 832.75177 534.92627 L 974.657776 504.724915 L 1051.328979 490.872559 L 1142.818848 475.167786 L 1184.214844 494.496582 L 1188.724854 514.147644 L 1172.456421 554.335693 L 1074.604126 578.496765 L 959.838989 601.449829 L 788.939636 641.879272 L 786.845764 643.409485 L 789.261841 646.389343 L 866.255127 653.637634 L 899.194702 655.409424 L 979.812134 655.409424 L 1129.932861 666.604187 L 1169.154419 692.537109 L 1192.671265 724.268677 L 1188.724854 748.429688 L 1128.322144 779.194641 L 1046.818848 759.865845 L 856.590759 714.604126 L 791.355774 698.335754 L 782.335693 698.335754 L 782.335693 703.731567 L 836.69812 756.885986 L 936.322205 846.845581 L 1061.073975 962.81897 L 1067.436279 991.490112 L 1051.409424 1014.120911 L 1034.496704 1011.704712 L 924.885986 929.234924 L 882.604126 892.107544 L 786.845764 811.48999 L 780.483276 811.48999 L 780.483276 819.946289 L 802.550415 852.241699 L 919.087341 1027.409424 L 925.127625 1081.127686 L 916.671204 1098.604126 L 886.469849 1109.154419 L 853.288696 1103.114136 L 785.073914 1007.355835 L 714.684631 899.516785 L 657.906067 802.872498 L 650.979858 806.81897 L 617.476624 1167.704834 L 601.771851 1186.147705 L 565.530212 1200 L 535.328857 1177.046997 L 519.302124 1139.919556 L 535.328857 1066.550537 L 554.657776 970.792053 L 570.362488 894.68457 L 584.536926 800.134277 L 592.993347 768.724976 L 592.429626 766.630859 L 585.503479 767.516968 L 514.22821 865.369263 L 405.825531 1011.865906 L 320.053711 1103.677979 L 299.516815 1111.812256 L 263.919525 1093.369263 L 267.221497 1060.429688 L 287.114136 1031.114136 L 405.825531 880.107361 L 477.422913 786.52356 L 523.651062 732.483276 L 523.328918 724.671265 L 520.590698 724.671265 L 205.288605 929.395935 L 149.154434 936.644409 L 124.993355 914.01355 L 127.973183 876.885986 L 139.409409 864.80542 L 234.201385 799.570435 L 233.879227 799.8927 Z"></path></svg>, total: 10, finish: 17, steps: ['Profiling storage reads', 'Packing struct slots', 'Checking loop costs'] },
];

const FINDING_SCHED = [
  { t: -40, id: 'f0', agentId: 'gas', severity: 'note' as Severity, title: 'Constant could be immutable', location: 'Pool.sol:12' },
  { t: 2, id: 'f1', agentId: 'auditor', severity: 'critical' as Severity, title: 'Reentrancy in withdraw()', location: 'Vault.sol:142' },
  { t: 4.5, id: 'f2', agentId: 'fuzzer', severity: 'warning' as Severity, title: 'Return value of transfer not checked', location: 'Token.sol:88' },
  { t: 7, id: 'f3', agentId: 'gas', severity: 'note' as Severity, title: 'Loop reads storage on every pass', location: 'Pool.sol:61' },
  { t: 9.5, id: 'f4', agentId: 'auditor', severity: 'warning' as Severity, title: 'Owner can mint without a cap', location: 'Token.sol:31' },
  { t: 12, id: 'f5', agentId: 'prover', severity: 'critical' as Severity, title: 'totalSupply can differ from the sum of balances', location: 'Token.sol:204' },
  { t: 15, id: 'f6', agentId: 'fuzzer', severity: 'warning' as Severity, title: 'Price used without a staleness check', location: 'Oracle.sol:57' },
  { t: 18.5, id: 'f7', agentId: 'prover', severity: 'note' as Severity, title: 'Loop bound depends on user input', location: 'Vault.sol:96' },
];

export default function AgentFindingsDemo() {
  const [start, setStart] = useState(() => Date.now());
  const [now, setNow] = useState(start);
  useEffect(() => {
    const id = window.setInterval(() => {
      const n = Date.now();
      if ((n - start) / 1000 > LOOP_SECONDS) setStart(n);
      setNow(n);
    }, 250);
    return () => window.clearInterval(id);
  }, [start]);
  const elapsed = Math.max(0, (now - start) / 1000);
  const agents: AgentItem[] = AGENT_CONF.map(a => {
    const t = Math.min(1, elapsed / a.finish);
    const done = Math.floor(t * a.total);
    const step = a.steps[Math.min(a.steps.length - 1, Math.floor(t * a.steps.length))];
    return { ...a, done, step };
  });
  const findings: FindingItem[] = FINDING_SCHED.filter(f => f.t <= elapsed).map(({ t, ...rest }) => ({ ...rest, at: start + t * 1000 }));
  return (
    <>
      <style>{css}</style>
      <div className="afc-demo">
        <FindingsCard title="Verification" agents={agents} findings={findings} now={now} />
      </div>
    </>
  );
}
