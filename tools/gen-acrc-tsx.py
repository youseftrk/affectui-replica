import re

OLD = 'src/components/ui/agent-crew.tsx'
NEW = 'src/components/ui/agent-crew.tsx'

src = open(OLD, encoding='utf8').read()
lines = src.split('\n')
css_line = lines[0]                      # const css = "...";
jsx_line = lines[6]                      # whole demo JSX

# extract p1 tree inner JSX
TREE_OPEN = '<div className="ui-acrc__tree" role="tree" aria-label="Fix the checkout crash">'
t0 = jsx_line.find(TREE_OPEN) + len(TREE_OPEN)
sr = jsx_line.find('<div className="ui-acrc__sr"')
t1 = jsx_line.rfind('</div>', 0, sr)
p1_inner = jsx_line[t0:t1]
assert 'ui-acrc__level' in p1_inner and 'ui-acrc__root' in p1_inner, 'bad inner'

code = r'''import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, KeyboardEvent, MouseEvent } from 'react';
import { TREES, PANELS } from '../../acrc-data';

''' + css_line + r'''

const folderIcon = (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 7.5C2.5 6.12 3.62 5 5 5H8.9C9.5 5 10.07 5.27 10.45 5.74L11.6 7.2C11.98 7.67 12.55 7.94 13.15 7.94H19C20.38 7.94 21.5 9.06 21.5 10.44V16.5C21.5 17.88 20.38 19 19 19H5C3.62 19 2.5 17.88 2.5 16.5V7.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"></path></svg>);
const chevIcon = (<svg className="ui-acrc__chev" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 9C18 9 13.58 15 12 15C10.42 15 6 9 6 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path></svg>);
const checkIcon = (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 14L8.5 17.5L19 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"></path></svg>);

const PANEL_PREFIX = ['p1', 'p2', 'p3'];
const PROJECTS = [
  { id: 'checkout', name: 'Fix the checkout crash', working: 2, needsYou: 0, agents: 8, srAt: 1400, sr: 'Lead handed to Researcher: Find where empty carts crash' },
  { id: 'launch', name: 'Write the launch post', working: 2, needsYou: 0, agents: 5, srAt: 1200, sr: 'Editor handed to Researcher: What shipped in 2.4?' },
  { id: 'migrate', name: 'Migrate to Postgres 17', working: 3, needsYou: 0, agents: 6, srAt: 1200, sr: 'Lead handed to Migrator: Start with the copy' },
];
const ACT_VERB: Record<string, string> = { pause: 'Paused', resume: 'Resumed', stop: 'Stopped', retry: 'Retrying', message: 'Sent to', approve: 'Approved for', decline: 'Declined for' };
const BTN_ACT: Record<string, string> = { Pause: 'pause', Resume: 'resume', Stop: 'stop', Retry: 'retry', Approve: 'approve', Decline: 'decline' };

function sayFormHtml(name: string) {
  return `<form class="ui-acrc__say"><input class="ui-acrc__say-input" placeholder="Tell ${name}…" aria-label="Message to ${name}"><button type="submit" class="ui-acrc__btn" data-primary="" data-icon="" aria-label="Send" disabled=""><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5M12 5L6 11M12 5L18 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2"></path></svg></button></form>`;
}

const P1_TREE = (<>
''' + p1_inner + r'''
</>);

function ProjMenu({ value, onChange }: { value: number; onChange: (i: number) => void }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const uid = useId();
  const kb = useRef(false);
  const cur = PROJECTS[value] ?? PROJECTS[0];

  useEffect(() => {
    if (!open) return;
    setHi(Math.max(0, PROJECTS.findIndex(p => p.id === cur.id)));
    menuRef.current?.focus({ focusVisible: kb.current });
    const onDoc = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, [open]);

  const select = (p: (typeof PROJECTS)[number], fv = false) => {
    setOpen(false);
    btnRef.current?.focus({ focusVisible: fv });
    const i = PROJECTS.indexOf(p);
    if (i !== value) onChange(i);
  };

  const onMenuKey = (e: KeyboardEvent) => {
    const n = PROJECTS.length;
    if (e.key === 'ArrowDown') setHi(h => (h + 1) % n);
    else if (e.key === 'ArrowUp') setHi(h => (h - 1 + n) % n);
    else if (e.key === 'Home') setHi(0);
    else if (e.key === 'End') setHi(n - 1);
    else if (e.key === 'Enter' || e.key === ' ') select(PROJECTS[hi], true);
    else if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); }
    else if (e.key === 'Tab') setOpen(false);
    else return;
    if (e.key !== 'Tab') e.preventDefault();
  };

  return (
    <div className="ui-acrc__proj">
      <button ref={btnRef} type="button" className="ui-acrc__proj-btn" aria-haspopup="listbox" aria-expanded={open}
        onClick={e => { kb.current = e.detail === 0; setOpen(o => !o); }}
        onKeyDown={e => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); kb.current = true; setOpen(true); } }}>
        {folderIcon}
        <span className="ui-acrc__proj-name" dir="auto">{cur.name}</span>
        {chevIcon}
      </button>
      {open && (
        <div ref={menuRef} className="ui-acrc__proj-menu" role="listbox" tabIndex={-1} aria-label="Projects"
          aria-activedescendant={`${uid}-${hi}`} onKeyDown={onMenuKey}>
          {PROJECTS.map((p, i) => (
            <div key={p.id} id={`${uid}-${i}`} role="option" aria-selected={p.id === cur.id}
              className="ui-acrc__proj-item" data-hi={i === hi ? '' : undefined}
              onPointerMove={() => setHi(i)} onClick={() => select(p)}>
              {folderIcon}
              <span className="ui-acrc__proj-label" dir="auto" title={p.name}>{p.name}</span>
              {p.needsYou ? <span className="ui-acrc__proj-meta" data-wait="">{p.needsYou} needs you</span>
                : p.working ? <span className="ui-acrc__proj-meta">{p.working} working</span> : null}
              <span className="ui-acrc__proj-check">{p.id === cur.id && checkIcon}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AgentCrewDemo() {
  const [projIdx, setProjIdx] = useState(0);
  const [sr, setSr] = useState('');
  const [openName, setOpenName] = useState<string | null>(null);
  const [sayOpen, setSayOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number; w: number; up: boolean } | null>(null);
  const treeRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const cur = PROJECTS[projIdx] ?? PROJECTS[0];
  const panel = openName ? PANELS[`${PANEL_PREFIX[projIdx]}:${openName}`] : undefined;

  const findNode = (name: string) =>
    treeRef.current?.querySelector<HTMLElement>(`.ui-acrc__node[aria-label^="${name}:"]`) ?? null;

  useEffect(() => {
    setOpenName(null);
    setSr('');
    const t = window.setTimeout(() => setSr(PROJECTS[projIdx]?.sr ?? ''), PROJECTS[projIdx]?.srAt ?? 1200);
    return () => window.clearTimeout(t);
  }, [projIdx]);

  useEffect(() => {
    setPos(null);
    setSayOpen(false);
    const panelEl = panelRef.current;
    const nodeEl = openName ? findNode(openName) : null;
    if (!openName || !panelEl || !nodeEl) return;
    panelEl.showPopover?.();
    const place = () => {
      const n = nodeEl.getBoundingClientRect();
      const h = panelEl.offsetHeight;
      const sec = treeRef.current?.closest('.ui-acrc')?.getBoundingClientRect();
      const a = Math.min(window.innerHeight - 8, sec ? sec.bottom : Infinity);
      const o = Math.max(8, sec ? sec.top : -Infinity);
      const below = n.bottom + 6 + h <= a;
      const above = n.top - 6 - h >= o;
      const up = !below && (above || n.bottom + 6 + h > window.innerHeight - 8);
      setPos({ x: Math.round(n.left), y: Math.round(up ? n.top - 6 - h : n.bottom + 6), w: Math.round(n.width), up });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [openName, projIdx, sayOpen]);

  useEffect(() => {
    if (sayOpen) panelRef.current?.querySelector<HTMLInputElement>('.ui-acrc__say-input')?.focus();
  }, [sayOpen]);

  const nameOf = (el: Element | null) => (el?.getAttribute('aria-label') ?? '').split(':')[0].trim();

  const onTreeClick = (e: MouseEvent) => {
    const node = (e.target as Element).closest?.('.ui-acrc__node');
    const name = nameOf(node);
    if (!name) return;
    if (openName === name) { setOpenName(null); findNode(name)?.focus(); }
    else setOpenName(name);
  };

  const onTreeKey = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const node = (e.target as Element).closest?.('.ui-acrc__node');
    const name = nameOf(node);
    if (!name) return;
    e.preventDefault();
    if (openName === name) { setOpenName(null); findNode(name)?.focus(); }
    else setOpenName(name);
  };

  const steer = (action: string, msg?: string) => {
    if (openName) setSr(`${ACT_VERB[action] ?? action} ${openName}${msg ? `: ${msg}` : ''}`);
  };

  const closePanel = () => {
    const n = openName;
    setOpenName(null);
    if (n) findNode(n)?.focus();
  };

  const onPanelClick = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.closest('.ui-acrc__panel-close')) { closePanel(); return; }
    const btn = el.closest('.ui-acrc__btn');
    if (!btn) return;
    const label = (btn.textContent ?? '').trim();
    if (label === 'Message') { setSayOpen(true); return; }
    const act = BTN_ACT[label];
    if (act) steer(act);
  };

  const onPanelSubmit = (e: FormEvent) => {
    e.preventDefault();
    const inp = (e.target as HTMLElement).querySelector<HTMLInputElement>('.ui-acrc__say-input');
    const v = inp?.value.trim();
    if (v) { steer('message', v); setSayOpen(false); }
  };

  const onPanelInput = (e: FormEvent) => {
    const inp = e.target as HTMLInputElement;
    if (!inp.classList?.contains('ui-acrc__say-input')) return;
    const btn = inp.closest('form')?.querySelector<HTMLButtonElement>('[aria-label="Send"]');
    if (btn) btn.disabled = !inp.value.trim();
  };

  const onPanelKey = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    e.stopPropagation();
    if ((e.target as HTMLElement).classList?.contains('ui-acrc__say-input')) { setSayOpen(false); return; }
    closePanel();
  };

  const panelHtml = sayOpen && openName && panel
    ? panel.inner.replace(/<div class="ui-acrc__acts">[\s\S]*$/, sayFormHtml(openName))
    : panel?.inner;

  return (
    <>
      <style>{css}</style>
      <div className="acr-demo">
        <section className="ui-acrc" data-wide="" aria-label={cur.name}>
          <header className="ui-acrc__bar">
            <ProjMenu value={projIdx} onChange={setProjIdx} />
            <span className="ui-acrc__sum">
              {cur.working > 0 && <span className="ui-acrc__sum-run">{cur.working} working</span>}
              {cur.needsYou > 0 && <span className="ui-acrc__sum-wait">{cur.needsYou} needs you</span>}
              <span>{cur.agents === 1 ? '1 agent' : `${cur.agents} agents`}</span>
            </span>
          </header>
          {projIdx === 0 ? (
            <div ref={treeRef} className="ui-acrc__tree" role="tree" aria-label={cur.name} onClick={onTreeClick} onKeyDown={onTreeKey}>
              {P1_TREE}
            </div>
          ) : (
            <div ref={treeRef} className="ui-acrc__tree" role="tree" aria-label={cur.name} onClick={onTreeClick} onKeyDown={onTreeKey}
              dangerouslySetInnerHTML={{ __html: TREES[projIdx] ?? '' }} />
          )}
          <div className="ui-acrc__sr" aria-live="polite">{sr}</div>
          {panel && openName && (
            <div key={openName} ref={panelRef} className="ui-acrc__panel" popover="manual" role="dialog"
              aria-label={panel.label}
              data-up={pos?.up ? '' : undefined}
              style={{ left: pos?.x ?? 0, top: pos?.y ?? 0, width: pos?.w, visibility: pos ? undefined : 'hidden', '--ui-acrc-c': panel.color } as CSSProperties}
              onClick={onPanelClick} onSubmit={onPanelSubmit} onInput={onPanelInput} onKeyDown={onPanelKey}
              dangerouslySetInnerHTML={{ __html: panelHtml ?? '' }} />
          )}
        </section>
      </div>
    </>
  );
}
'''

open(NEW, 'w', encoding='utf8', newline='\n').write(code)
print('wrote', NEW, len(code))
