import sys

p = 'src/components/ui/agent-graph.tsx'
s = open(p, encoding='utf8').read()

imports = """import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import { AGGC_CARDS, AGGC_NAMES } from '../../aggc-cards';

const AGGC_CARD_ID = 'aggc-card';
const AGGC_NODE_IDS = ['lead', 'research', 'analyst', 'coder', 'writer', 'web', 'notion', 'hubspot', 'db', 'github', 'slack', 'you'];
const AGGC_EDGES: [string, string][] = [
  ['you', 'lead'], ['lead', 'research'], ['lead', 'analyst'], ['lead', 'coder'], ['lead', 'writer'], ['lead', 'slack'],
  ['research', 'web'], ['research', 'notion'], ['analyst', 'db'], ['analyst', 'hubspot'], ['coder', 'github'],
  ['writer', 'notion'], ['writer', 'slack'], ['writer', 'you'],
];
const AGGC_NAME2ID: Record<string, string> = Object.fromEntries(Object.entries(AGGC_NAMES).map(([id, n]) => [n, id]));

"""

body = """export default function AgentGraphDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [narrow, setNarrow] = useState(false);
  const focusId = hov ?? (open ? open : null);

  const discId = (target: EventTarget | null): string | null => {
    const disc = (target as Element | null)?.closest?.('.ui-aggc__disc');
    if (!disc) return null;
    const node = disc.closest('.ui-aggc__node');
    const root = rootRef.current;
    if (!node || !root) return null;
    const idx = Array.prototype.indexOf.call(root.querySelectorAll('.ui-aggc__node'), node);
    const name = (disc.getAttribute('aria-label') || '').split(',')[0];
    return AGGC_NAME2ID[name] ?? (idx >= 0 ? AGGC_NODE_IDS[idx] : null);
  };

  const onPointerOver = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const id = discId(e.target);
    if (id) setHov(id);
  };
  const onPointerOut = (e: PointerEvent<HTMLDivElement>) => {
    const disc = (e.target as Element | null)?.closest?.('.ui-aggc__disc');
    if (!disc) return;
    const rel = e.relatedTarget as Element | null;
    if (rel && rel.closest?.('.ui-aggc__disc') === disc) return;
    const id = discId(disc);
    if (id) setHov((p) => (p === id ? null : p));
  };
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const id = discId(e.target);
    if (id) setHov(id);
  };
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    const id = discId(e.target);
    if (id) setHov((p) => (p === id ? null : p));
  };
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const t = e.target as Element | null;
    const disc = t?.closest?.('[data-agg-node]');
    if (disc) {
      const id = discId(disc);
      if (id) setOpen((p) => (p === id ? null : id));
      return;
    }
    if (t?.closest?.('.ui-aggc__close')) setOpen(null);
  };
  const onCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Escape' || !open) return;
    setOpen(null);
    const idx = AGGC_NODE_IDS.indexOf(open);
    const btn = idx >= 0 ? rootRef.current?.querySelectorAll('.ui-aggc__node')[idx]?.querySelector('button') : null;
    (btn as HTMLElement | null | undefined)?.focus?.();
  };

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (focusId) root.setAttribute('data-focus', ''); else root.removeAttribute('data-focus');
    const q = new Set<string>();
    if (focusId) {
      q.add(focusId);
      for (const [a, b] of AGGC_EDGES) {
        if (a === focusId) q.add(b);
        if (b === focusId) q.add(a);
      }
    }
    root.querySelectorAll('.ui-aggc__node').forEach((n, i) => {
      const id = AGGC_NODE_IDS[i];
      if (!id) return;
      if (focusId && !q.has(id)) n.setAttribute('data-dim', ''); else n.removeAttribute('data-dim');
      if (open === id) n.setAttribute('data-open', ''); else n.removeAttribute('data-open');
      const disc = n.querySelector('.ui-aggc__disc');
      if (disc) {
        if (open === id) {
          disc.setAttribute('aria-expanded', 'true');
          disc.setAttribute('aria-controls', AGGC_CARD_ID);
        } else {
          disc.setAttribute('aria-expanded', 'false');
          disc.removeAttribute('aria-controls');
        }
      }
    });
    const paths = root.querySelectorAll('.ui-aggc__edge');
    if (paths.length === AGGC_EDGES.length) {
      paths.forEach((p, i) => {
        const [a, b] = AGGC_EDGES[i];
        const near = !!focusId && q.has(a) && q.has(b) && (a === focusId || b === focusId);
        if (near) p.setAttribute('data-near', ''); else p.removeAttribute('data-near');
      });
    }
  }, [focusId, open]);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (!open || narrow) {
      card.style.left = '';
      card.style.top = '';
      return;
    }
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const idx = AGGC_NODE_IDS.indexOf(open);
    const nodeEl = idx >= 0 ? (root.querySelectorAll('.ui-aggc__node')[idx] as HTMLElement | undefined) : undefined;
    const tf = nodeEl?.style.transform || '';
    const m = /translate3d\\(\\s*([-\\d.]+)px\\s*,\\s*([-\\d.]+)px/.exec(tf) || /translate\\(\\s*([-\\d.]+)px\\s*,\\s*([-\\d.]+)px/.exec(tf);
    if (!nodeEl || !m) return;
    const spotX = parseFloat(m[1]);
    const spotY = parseFloat(m[2]);
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    const cw = card.offsetWidth;
    const ch = card.offsetHeight;
    const rad = (parseFloat(nodeEl.style.getPropertyValue('--d') || '40') || 40) / 2;
    const cardRight = spotX < w / 2;
    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
    card.style.left = `${clamp(cardRight ? spotX + rad + 18 : spotX - rad - 18 - cw, 8, w - cw - 8)}px`;
    card.style.top = `${clamp(spotY - ch / 2, 8, h - ch - 8)}px`;
  }, [open, narrow]);

  useLayoutEffect(() => {
    if (!open) return;
    cardRef.current?.querySelector<HTMLElement>('.ui-aggc__close')?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: globalThis.PointerEvent) => {
      const t = e.target as Element | null;
      if (cardRef.current?.contains(t)) return;
      if (t?.closest?.('[data-agg-node]')) return;
      setOpen(null);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const update = () => setNarrow(stage.clientWidth < 520);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  const aggcCard = open && AGGC_CARDS[open] ? (
    <div
      ref={cardRef}
      id={AGGC_CARD_ID}
      className="ui-aggc__card"
      role="dialog"
      aria-label={AGGC_NAMES[open]}
      onKeyDown={onCardKeyDown}
      dangerouslySetInnerHTML={{ __html: AGGC_CARDS[open] }}
    />
  ) : null;

  return ("""

# 1. prepend imports + consts before css
assert s.count('const css = ') >= 1
s = s.replace('const css = ', imports + 'const css = ', 1)

# 2. replace component signature
old_sig = 'export default function AgentGraphDemo() {\n  return ('
assert s.count(old_sig) == 1, s.count(old_sig)
s = s.replace(old_sig, body, 1)

# 3. root div handlers
old_root = '<div className="ui-aggc"><header className="ui-aggc__bar">'
assert s.count(old_root) == 1, s.count(old_root)
new_root = ('<div className="ui-aggc" ref={rootRef} data-narrow={narrow ? \'\' : undefined} '
            'onPointerOver={onPointerOver} onPointerOut={onPointerOut} onFocus={onFocus} onBlur={onBlur} onClick={onClick}>'
            '<header className="ui-aggc__bar">')
s = s.replace(old_root, new_root, 1)

# 4. stage ref
old_stage = '<div className="ui-aggc__stage" role="group"'
assert s.count(old_stage) == 1, s.count(old_stage)
s = s.replace(old_stage, '<div className="ui-aggc__stage" ref={stageRef} role="group"', 1)

# 5. inject card before stage close (last </div> before legend)
old_leg = '</div></div></div></div><div className="ui-aggc__legend"'
assert s.count(old_leg) == 1, s.count(old_leg)
s = s.replace(old_leg, '</div></div></div>{aggcCard}</div><div className="ui-aggc__legend"', 1)

open(p, 'w', encoding='utf8').write(s)
print('patched ok')
