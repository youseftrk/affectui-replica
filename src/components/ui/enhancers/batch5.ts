import { createScope, wireRadioGroup } from './utils';
import acTabs from './data/agent-cursors-tabs.json';
import afTrees from './data/agent-fleet-trees.json';

// 1. AGENT CURSORS
export function enhanceAgentCursors(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-acuc');
  if (!root) return () => {};

  const tabsData = acTabs as Record<string, string>;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('.ui-acuc__tab')];
  const stage = root.querySelector<HTMLElement>('.ui-acuc__stage');

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const tab = t?.closest<HTMLButtonElement>('.ui-acuc__tab');
    if (tab && stage) {
      const name = tab.textContent?.trim() || 'Doc';
      tabs.forEach((b) => b.setAttribute('aria-selected', String(b === tab)));
      if (tabsData[name]) {
        stage.innerHTML = tabsData[name];
        stage.querySelectorAll<HTMLInputElement>('input[value]').forEach((i) => { i.defaultValue = i.getAttribute('value') || ''; });
      }
      return;
    }
    const face = t?.closest<HTMLButtonElement>('.ui-acuc__face');
    if (face) {
      const pressed = face.getAttribute('aria-pressed') === 'true';
      root.querySelectorAll<HTMLButtonElement>('.ui-acuc__face').forEach((f) => f.setAttribute('aria-pressed', 'false'));
      if (!pressed) face.setAttribute('aria-pressed', 'true');
      return;
    }
    const pinHit = t?.closest<HTMLButtonElement>('.ui-acuc__pin-hit');
    if (pinHit) {
      const pin = pinHit.closest<HTMLElement>('.ui-acuc__pin');
      if (pin) {
        if (pin.hasAttribute('data-open')) pin.removeAttribute('data-open');
        else pin.setAttribute('data-open', '');
      }
      return;
    }
    const resolveBtn = t?.closest<HTMLButtonElement>('.ui-acuc__resolve');
    if (resolveBtn) {
      resolveBtn.closest<HTMLElement>('.ui-acuc__pin')?.remove();
      return;
    }
    const accBtn = t?.closest<HTMLButtonElement>('button');
    if (accBtn && accBtn.textContent?.includes('Accept all')) {
      root.querySelectorAll('.ui-acuc__del').forEach((d) => d.remove());
      accBtn.textContent = 'Accepted ✓';
      accBtn.disabled = true;
    }
  });

  scope.on(root, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    const inp = (ke.target as Element | null)?.closest<HTMLInputElement>('.ui-acuc__reply');
    if (inp && ke.key === 'Enter' && inp.value.trim()) {
      ke.preventDefault();
      const box = inp.closest('.ui-acuc__pin');
      if (box) {
        const msg = document.createElement('div');
        msg.style.cssText = 'font-size:11.5px;padding:4px 0;border-top:0.5px solid rgba(0,0,0,0.06)';
        msg.innerHTML = `<b>You:</b> ${inp.value.trim()}`;
        inp.parentElement?.insertBefore(msg, inp);
      }
      inp.value = '';
    }
  });

  return () => scope.dispose();
}

// 2. AGENT FLEET
export function enhanceAgentFleet(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-agfc');
  if (!root) return () => {};

  const trees = afTrees as string[];
  const list = root.querySelector<HTMLElement>('.ui-agfc__list');
  const mainBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-agfc__main')];
  const treeEl = root.querySelector<HTMLElement>('.ui-agfc__tree, [role="tree"]');

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const main = t?.closest<HTMLButtonElement>('.ui-agfc__main');
    if (main) {
      const idx = mainBtns.indexOf(main);
      const wasOpen = main.getAttribute('aria-expanded') === 'true';
      mainBtns.forEach((b) => {
        b.setAttribute('aria-expanded', 'false');
        b.removeAttribute('data-open');
      });
      if (wasOpen) {
        list?.removeAttribute('data-picked');
        if (treeEl) treeEl.style.opacity = '0.35';
      } else {
        main.setAttribute('aria-expanded', 'true');
        main.setAttribute('data-open', '');
        list?.setAttribute('data-picked', '');
        if (treeEl) {
          treeEl.style.opacity = '';
          if (trees[idx]) treeEl.innerHTML = trees[idx];
        }
      }
      return;
    }
    const sub = t?.closest<HTMLElement>('.ui-agfc__sub');
    if (sub) {
      const popped = sub.hasAttribute('data-popped');
      root.querySelectorAll('.ui-agfc__sub').forEach((s) => s.removeAttribute('data-popped'));
      if (!popped) sub.setAttribute('data-popped', '');
    }
  });

  return () => scope.dispose();
}

// 3. AGENT INBOX
export function enhanceAgentInbox(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-aic');
  if (!root) return () => {};

  wireRadioGroup(
    root.querySelector('.ui-aic__views'),
    '.ui-aic__view',
    (btn) => {
      const v = btn.textContent?.trim().toLowerCase().includes('list') ? 'list' : 'board';
      root.setAttribute('data-view', v);
    },
    scope
  );

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const btn = t?.closest<HTMLButtonElement>('.ui-aic__btn');
    if (btn) {
      e.stopPropagation();
      const card = btn.closest<HTMLElement>('.ui-aic__card');
      const txt = btn.textContent?.trim() || '';
      const stateEl = card?.querySelector<HTMLElement>('.ui-aic__state');
      const iconEl = card?.querySelector<HTMLElement>('.ui-aic__state-icon');
      if (txt === 'Approve') {
        card?.setAttribute('data-status', 'done');
        stateEl?.setAttribute('data-status', 'done');
        iconEl?.setAttribute('data-status', 'done');
        if (stateEl) stateEl.textContent = 'Approved';
        btn.textContent = 'Approved ✓';
        btn.disabled = true;
      } else if (txt === 'Reject') {
        card?.setAttribute('data-status', 'failed');
        stateEl?.setAttribute('data-status', 'failed');
        iconEl?.setAttribute('data-status', 'failed');
        if (stateEl) stateEl.textContent = 'Rejected by you';
        btn.textContent = 'Rejected';
        btn.disabled = true;
      } else if (txt === 'Retry') {
        card?.setAttribute('data-status', 'running');
        stateEl?.setAttribute('data-status', 'running');
        iconEl?.setAttribute('data-status', 'running');
        if (stateEl) stateEl.textContent = 'Running';
        btn.textContent = 'Retrying…';
      } else if (txt === 'Open' && card) {
        const open = !card.hasAttribute('data-open');
        if (open) card.setAttribute('data-open', '');
        else card.removeAttribute('data-open');
        const mainBtn = card.querySelector('.ui-aic__card-main');
        mainBtn?.setAttribute('aria-expanded', String(open));
        const fold = card.querySelector('.ui-aic__fold');
        if (open) fold?.setAttribute('data-open', '');
        else fold?.removeAttribute('data-open');
      }
      return;
    }

    const mainBtn = t?.closest<HTMLButtonElement>('.ui-aic__card-main');
    if (mainBtn) {
      const card = mainBtn.closest<HTMLElement>('.ui-aic__card');
      if (!card) return;
      const open = !card.hasAttribute('data-open');
      if (open) card.setAttribute('data-open', '');
      else card.removeAttribute('data-open');
      mainBtn.setAttribute('aria-expanded', String(open));
      const fold = card.querySelector('.ui-aic__fold');
      if (open) fold?.setAttribute('data-open', '');
      else fold?.removeAttribute('data-open');
    }
  });

  return () => scope.dispose();
}

// 4. AGENT LANES
export function enhanceAgentLanes(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-alc');
  if (!root) return () => {};

  const blocks = [...root.querySelectorAll<HTMLButtonElement>('.ui-alc__block')];
  const card = root.querySelector<HTMLElement>('.ui-alc__card');
  let pop: HTMLElement | null = null;
  let openBlock: HTMLButtonElement | null = null;

  const DETAILS: Record<string, string[]> = {
    r1: ['Checked 6 competitors', 'Collected plans and prices', 'Handed the table to the Writer'],
    r2: ['Read 14 interview notes', 'Grouping quotes by theme'],
    w1: ['Outlined the pricing page', 'Wrote plan copy and FAQ'],
  };

  const closePop = () => {
    pop?.remove();
    pop = null;
    blocks.forEach((b) => { b.removeAttribute('data-open'); b.setAttribute('aria-expanded', 'false'); });
    openBlock = null;
  };

  scope.on(root, 'click', (e) => {
    const blk = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-alc__block');
    if (!blk || !card) return;
    e.stopPropagation();
    if (openBlock === blk) { closePop(); return; }
    closePop();
    openBlock = blk;
    blk.setAttribute('data-open', '');
    blk.setAttribute('aria-expanded', 'true');
    const id = blk.getAttribute('data-task') || '';
    const label = blk.getAttribute('aria-label') || blk.textContent?.trim() || 'Task';
    const steps = DETAILS[id] || ['Running step checks', 'Updating workspace status'];
    card.style.position = 'relative';
    const cr = card.getBoundingClientRect();
    const br = blk.getBoundingClientRect();
    pop = document.createElement('div');
    pop.className = 'ui-alc__pop ui-alc__tip';
    pop.setAttribute('role', 'tooltip');
    pop.style.cssText = `position:absolute;left:${Math.min(Math.max(12, br.left - cr.left), Math.max(12, cr.width - 260))}px;top:${Math.max(8, br.bottom - cr.top + 6)}px;z-index:25;width:248px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 12px 28px -8px rgba(0,0,0,0.2);padding:10px 12px;font-size:12px;`;
    pop.innerHTML = `<div style="font-weight:500;margin-bottom:4px">${label}</div><ul style="margin:0;padding-left:14px;opacity:0.75;display:grid;gap:2px">${steps.map((s) => `<li>${s}</li>`).join('')}</ul>`;
    card.appendChild(pop);
  });

  scope.on(document, 'click', (e) => {
    if (pop && !pop.contains(e.target as Node)) closePop();
  });

  return () => scope.dispose();
}

// 5. AGENT MONITOR
export function enhanceAgentMonitor(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-agmc');
  if (!root) return () => {};

  const stateEl = root.querySelector<HTMLElement>('.ui-agmc__state');
  const rollLayer = stateEl?.querySelector<HTMLElement>('.ui-agmc__roll-layer');
  let logDrawer: HTMLElement | null = null;

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const foldBtn = t?.closest<HTMLButtonElement>('.ui-agmc__fold');
    if (foldBtn) {
      const folded = root.hasAttribute('data-folded');
      if (folded) root.removeAttribute('data-folded');
      else root.setAttribute('data-folded', '');
      foldBtn.setAttribute('aria-expanded', String(folded));
      const body = root.querySelector<HTMLElement>('.ui-agmc__body, .ui-agmc__steps');
      if (body) body.style.display = folded ? '' : 'none';
      return;
    }

    const segBtn = t?.closest<HTMLButtonElement>('.ui-agmc__seg-btn');
    if (segBtn) {
      const txt = segBtn.textContent?.trim() || '';
      if (txt === 'Pause' || txt === 'Resume') {
        const paused = txt === 'Pause';
        root.setAttribute('data-status', paused ? 'paused' : 'running');
        stateEl?.setAttribute('data-status', paused ? 'waiting' : 'running');
        if (rollLayer) rollLayer.textContent = paused ? 'Paused' : 'Running';
        segBtn.textContent = paused ? 'Resume' : 'Pause';
      } else if (txt === 'Cancel' || txt === 'Restart') {
        const cancelling = txt === 'Cancel';
        root.setAttribute('data-status', cancelling ? 'finished' : 'running');
        stateEl?.setAttribute('data-status', cancelling ? 'failed' : 'running');
        if (rollLayer) rollLayer.textContent = cancelling ? 'Canceled' : 'Running';
        segBtn.textContent = cancelling ? 'Restart' : 'Cancel';
      }
      return;
    }

    const stepHit = t?.closest<HTMLButtonElement>('.ui-agmc__step-hit');
    if (stepHit) {
      const step = stepHit.closest<HTMLElement>('.ui-agmc__step');
      const hot = step?.hasAttribute('data-hot');
      if (hot) step?.removeAttribute('data-hot');
      else step?.setAttribute('data-hot', '');
      return;
    }

    const logBtn = t?.closest<HTMLButtonElement>('.ui-agmc__btn');
    if (logBtn && logBtn.textContent?.includes('Log')) {
      if (logDrawer) { logDrawer.remove(); logDrawer = null; return; }
      logDrawer = document.createElement('pre');
      logDrawer.style.cssText = 'margin:8px 12px 12px;padding:8px 10px;border-radius:8px;background:rgba(0,0,0,0.03);font-family:monospace;font-size:11px;line-height:1.45;overflow:auto;max-height:120px';
      logDrawer.textContent = '[00:00.1] linear.listIssues(project="web-app", milestone="v3.2") -> 14 issues\n[00:01.7] git.compare("v3.1..main") -> 23 commits, 18 files changed\n[00:02.4] Drafting release notes…';
      root.querySelector('.ui-agmc__card')?.appendChild(logDrawer);
    }
  });

  return () => scope.dispose();
}

// 6. AGENT QUEUE
export function enhanceAgentQueue(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-agqc');
  if (!root) return () => {};

  const pauseBtn = root.querySelector<HTMLButtonElement>('.ui-agqc__btn');
  const pauseText = pauseBtn?.querySelector<HTMLElement>('.ui-agqc__btn-text');
  const pill = root.querySelector<HTMLElement>('.ui-agqc__pill');
  const stepperBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-agqc__stepper button')];
  const stepperOut = root.querySelector<HTMLElement>('.ui-agqc__stepper output, .ui-agqc__stepper-value');

  let workers = Number(stepperOut?.textContent?.trim() || '4') || 4;
  let paused = false;
  let pop: HTMLElement | null = null;

  scope.on(pauseBtn, 'click', () => {
    paused = !paused;
    root.setAttribute('data-state', paused ? 'paused' : 'live');
    pauseBtn?.setAttribute('aria-pressed', String(paused));
    if (pauseText) pauseText.textContent = paused ? 'Resume' : 'Pause';
    if (pill) {
      pill.setAttribute('data-status', paused ? 'paused' : 'live');
      pill.innerHTML = paused ? 'Paused' : '<span class="ui-agqc__pulse" aria-hidden="true"></span>Live';
    }
  });

  const setWorkers = (n: number) => {
    workers = Math.max(1, Math.min(8, n));
    if (stepperOut) stepperOut.textContent = String(workers);
    root.querySelectorAll<HTMLElement>('.ui-agqc__stat dd, .ui-agqc__col-count').forEach((el) => {
      if (/^\d+\/\d+$/.test(el.textContent?.trim() || '')) {
        const active = Math.min(workers, Number(el.textContent!.split('/')[0]));
        el.textContent = `${active}/${workers}`;
      }
    });
  };
  scope.on(stepperBtns[0], 'click', () => setWorkers(workers - 1));
  scope.on(stepperBtns[1], 'click', () => setWorkers(workers + 1));

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-q-close]')) { pop?.remove(); pop = null; return; }
    const job = t?.closest<HTMLButtonElement>('.ui-agqc__job');
    if (job) {
      e.stopPropagation();
      const wasOpen = job.hasAttribute('data-open');
      root.querySelectorAll('.ui-agqc__job').forEach((j) => { j.removeAttribute('data-open'); j.setAttribute('aria-expanded', 'false'); });
      pop?.remove();
      pop = null;
      if (!wasOpen) {
        job.setAttribute('data-open', '');
        job.setAttribute('aria-expanded', 'true');
        pop = document.createElement('div');
        pop.className = 'ui-agqc__pop';
        pop.setAttribute('data-pinned', '');
        pop.setAttribute('role', 'dialog');
        pop.style.cssText = 'position:absolute;right:16px;top:56px;z-index:25;width:240px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 12px 26px -8px rgba(0,0,0,0.2);padding:10px 12px;font-size:12px;';
        pop.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:4px"><b>${job.textContent?.trim()}</b><button type="button" data-q-close>✕</button></div><div style="opacity:0.7">${job.getAttribute('aria-label') || 'Queued agent job'}</div>`;
        root.style.position = 'relative';
        root.appendChild(pop);
      }
    }
  });

  scope.on(document, 'click', (e) => {
    if (pop && !pop.contains(e.target as Node)) { pop.remove(); pop = null; }
  });

  return () => scope.dispose();
}

// 7. AGENT RECAP
export function enhanceAgentRecap(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-rcp');
  if (!root) return () => {};

  const sr = root.querySelector<HTMLElement>('.ui-rcp__sr');
  const countLis = [...root.querySelectorAll<HTMLLIElement>('.ui-rcp__counts li')];
  const dots = [...root.querySelectorAll<HTMLElement>('.ui-rcp__dot')];
  const cards = [...root.querySelectorAll<HTMLElement>('.ui-rcp__card')];

  const syncCounts = () => {
    let done = 0, needs = 0, failed = 0;
    cards.forEach((c) => {
      const st = c.getAttribute('data-state');
      const kind = c.getAttribute('data-kind');
      if (st === 'resolved' || kind === 'done') done++;
      else if (kind === 'failed') failed++;
      else needs++;
    });
    countLis.forEach((li) => {
      const k = li.getAttribute('data-kind');
      const b = li.querySelector('b');
      if (b && k === 'done') b.textContent = String(done);
      if (b && k === 'needs') b.textContent = String(needs);
      if (b && k === 'failed') b.textContent = String(failed);
    });
  };

  dots.forEach((dot, i) => {
    dot.style.cursor = 'pointer';
    scope.on(dot, 'click', () => {
      dots.forEach((d, j) => { if (j === i) d.setAttribute('data-hot', ''); else d.removeAttribute('data-hot'); });
      cards.forEach((c, j) => { if (j === i) c.setAttribute('data-hot', ''); else c.removeAttribute('data-hot'); });
    });
  });

  scope.on(root, 'click', (e) => {
    const btn = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-rcp__btn');
    if (!btn) return;
    const card = btn.closest<HTMLElement>('.ui-rcp__card');
    if (!card) return;
    const txt = btn.textContent?.trim() || '';
    if (txt === 'Undo') {
      card.setAttribute('data-state', 'open');
      btn.textContent = card.getAttribute('data-kind') === 'failed' ? 'Retry' : 'Approve';
      syncCounts();
      return;
    }
    if (txt === 'Review') {
      const hot = card.hasAttribute('data-hot');
      if (hot) card.removeAttribute('data-hot');
      else card.setAttribute('data-hot', '');
      return;
    }
    card.setAttribute('data-state', 'working');
    const orig = txt;
    btn.textContent = 'Working…';
    btn.disabled = true;
    scope.later(() => {
      btn.disabled = false;
      card.setAttribute('data-state', 'resolved');
      btn.textContent = 'Undo';
      if (sr) sr.textContent = `${orig} completed`;
      syncCounts();
    }, 350);
  });

  return () => scope.dispose();
}

// 8. AGENT ROUTER
export function enhanceAgentRouter(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-artrc');
  if (!root) return () => {};

  const nodes = [...root.querySelectorAll<HTMLElement>('.ui-artrc__node')];
  const map = root.querySelector<HTMLElement>('.ui-artrc__map');
  let panel: HTMLElement | null = null;
  let openNode: HTMLElement | null = null;

  const closePanel = () => {
    panel?.remove();
    panel = null;
    nodes.forEach((n) => { n.removeAttribute('data-open'); n.setAttribute('aria-expanded', 'false'); });
    openNode = null;
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-rt-close]')) { closePanel(); return; }
    if (t?.closest('[data-rt-route]')) {
      const sum = root.querySelector('.ui-artrc__sum span');
      if (sum) sum.textContent = '3 routed';
      closePanel();
      return;
    }
    const node = t?.closest<HTMLElement>('.ui-artrc__node');
    if (node && map) {
      e.stopPropagation();
      if (openNode === node) { closePanel(); return; }
      closePanel();
      openNode = node;
      node.setAttribute('data-open', '');
      node.setAttribute('aria-expanded', 'true');
      const label = node.getAttribute('aria-label') || node.textContent?.trim() || 'Route details';
      map.style.position = 'relative';
      panel = document.createElement('div');
      panel.className = 'ui-artrc__panel';
      panel.setAttribute('role', 'dialog');
      panel.style.cssText = 'position:absolute;left:50%;top:16px;transform:translateX(-50%);z-index:25;width:280px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 14px 30px -10px rgba(0,0,0,0.22);padding:12px;font-size:12px;display:grid;gap:8px;';
      panel.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><b>Routing inspection</b><button type="button" data-rt-close>✕</button></div><div style="opacity:0.75;line-height:1.4">${label}</div><div style="display:grid;gap:3px;font-size:11.5px"><div style="display:flex;justify-content:space-between"><span>Billing</span><b>96%</b></div><div style="display:flex;justify-content:space-between;opacity:0.55"><span>Tech support</span><span>3%</span></div><div style="display:flex;justify-content:space-between;opacity:0.55"><span>Sales</span><span>1%</span></div></div><button type="button" data-rt-route style="padding:5px 10px;border-radius:6px;background:#111;color:#fff;font-weight:500">Route to Billing</button>`;
      map.appendChild(panel);
    }
  });

  scope.on(document, 'click', (e) => {
    if (panel && !panel.contains(e.target as Node)) closePanel();
  });

  return () => scope.dispose();
}

// 9. AGENT STEERING
export function enhanceAgentSteering(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-stc');
  if (!root) return () => {};

  const pauseBtn = root.querySelector<HTMLButtonElement>('.ui-stc__icon-btn');
  const stateEl = root.querySelector<HTMLElement>('.ui-stc__state');
  const textarea = root.querySelector<HTMLTextAreaElement>('textarea');
  const sendBtn = root.querySelector<HTMLButtonElement>('.ui-stc__send');
  const stepsWrap = root.querySelector<HTMLElement>('.ui-stc__steps, ol, ul');

  let paused = false;

  scope.on(pauseBtn, 'click', () => {
    paused = !paused;
    root.setAttribute('data-status', paused ? 'paused' : 'running');
    stateEl?.setAttribute('data-status', paused ? 'paused' : 'running');
    if (stateEl) {
      stateEl.innerHTML = paused
        ? 'Paused'
        : '<span class="ui-stc__pulse" aria-hidden="true"></span>Running · 2m 07s';
    }
    pauseBtn?.setAttribute('aria-label', paused ? 'Resume the run' : 'Pause the run');
  });

  const enqueueNote = () => {
    const val = textarea?.value.trim() || "Use Postgres 16 syntax – prod isn't on 17 yet";
    if (!stepsWrap) return;
    const note = document.createElement('div');
    note.className = 'ui-stc__note';
    note.setAttribute('data-landed', 'true');
    note.style.cssText = 'margin:6px 0;padding:8px 10px;border-radius:8px;background:rgba(0,96,226,0.06);font-size:12px;display:flex;justify-content:space-between;align-items:center;gap:8px';
    note.innerHTML = `<div><div style="font-size:10px;font-weight:600;letter-spacing:0.04em;opacity:0.65">QUEUED FOR THE NEXT STEP</div><div>${val}</div></div><button type="button" data-rm-note style="opacity:0.6">×</button>`;
    stepsWrap.appendChild(note);
    if (textarea) textarea.value = '';
  };

  scope.on(sendBtn, 'click', enqueueNote);
  scope.on(textarea, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'Enter' && !ke.shiftKey) { ke.preventDefault(); enqueueNote(); }
  });
  scope.on(root, 'click', (e) => {
    const rm = (e.target as Element | null)?.closest<HTMLButtonElement>('[data-rm-note]');
    if (rm) rm.closest('.ui-stc__note')?.remove();
  });

  return () => scope.dispose();
}

// 10. AGENT TIMING
export function enhanceAgentTiming(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-atgc');
  if (!root) return () => {};

  const hands = [...root.querySelectorAll<HTMLElement>('.ui-atgc__hand')];
  const segs = [...root.querySelectorAll<HTMLElement>('.ui-atgc__seg')];
  let tip: HTMLElement | null = null;

  const showTip = (label: string, anchor: HTMLElement) => {
    tip?.remove();
    const rr = root.getBoundingClientRect();
    const ar = anchor.getBoundingClientRect();
    root.style.position = 'relative';
    tip = document.createElement('div');
    tip.className = 'ui-atgc__tip';
    tip.setAttribute('role', 'tooltip');
    tip.style.cssText = `position:absolute;left:${Math.max(12, ar.left - rr.left)}px;top:${Math.max(8, ar.bottom - rr.top + 6)}px;z-index:25;background:#fff;border-radius:8px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 8px 20px -6px rgba(0,0,0,0.18);padding:6px 10px;font-size:11.5px;max-width:240px;`;
    tip.textContent = label;
    root.appendChild(tip);
  };

  hands.forEach((h) => {
    h.style.cursor = 'pointer';
    scope.on(h, 'click', () => {
      const wasActive = h.hasAttribute('data-active');
      hands.forEach((x) => { x.removeAttribute('data-active'); x.removeAttribute('data-dim'); });
      tip?.remove();
      tip = null;
      if (!wasActive) {
        h.setAttribute('data-active', '');
        hands.forEach((x) => { if (x !== h) x.setAttribute('data-dim', ''); });
        showTip(h.textContent?.trim() || 'Handoff', h);
      }
    });
  });

  segs.forEach((s) => {
    scope.on(s, 'mouseenter', () => {
      segs.forEach((x) => { if (x !== s) x.setAttribute('data-dim', ''); else x.removeAttribute('data-dim'); });
      showTip(s.getAttribute('aria-label') || 'Agent step · 3.4s', s);
    });
    scope.on(s, 'mouseleave', () => {
      segs.forEach((x) => x.removeAttribute('data-dim'));
      tip?.remove();
      tip = null;
    });
  });

  return () => scope.dispose();
}

// 11. RUNNING NOW
export function enhanceRunningNow(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-rnc');
  if (!root) return () => {};

  const trigger = root.querySelector<HTMLButtonElement>('.ui-rnc__trigger');
  const panel = root.querySelector<HTMLElement>('.ui-rnc__panel');
  const countSpans = [...root.querySelectorAll<HTMLElement>('.ui-rnc__trigger .ui-rnc__n span')];

  const syncTrigger = () => {
    const rows = [...root.querySelectorAll<HTMLElement>('.ui-rnc__row')];
    const running = rows.filter((r) => r.getAttribute('data-state') === 'running').length;
    const needs = rows.filter((r) => r.getAttribute('data-state') === 'needs' || r.getAttribute('data-state') === 'waiting').length;
    if (countSpans[0]) countSpans[0].textContent = String(running);
    if (countSpans[1]) countSpans[1].textContent = String(needs);
    trigger?.setAttribute('aria-label', `Background tasks: ${running} running, ${needs} needs you`);
  };

  scope.on(trigger, 'click', (e) => {
    e.stopPropagation();
    const open = root.getAttribute('data-open') !== 'true';
    if (open) root.setAttribute('data-open', 'true');
    else root.removeAttribute('data-open');
    trigger?.setAttribute('aria-expanded', String(open));
    if (panel) panel.hidden = !open;
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const btn = t?.closest<HTMLButtonElement>('.ui-rnc__btn');
    if (btn) {
      e.stopPropagation();
      const row = btn.closest<HTMLElement>('.ui-rnc__row');
      const lbl = btn.getAttribute('aria-label') || btn.textContent?.trim() || '';
      if (lbl.startsWith('Pause')) {
        row?.setAttribute('data-state', 'paused');
        btn.setAttribute('aria-label', lbl.replace('Pause', 'Resume'));
        syncTrigger();
      } else if (lbl.startsWith('Resume')) {
        row?.setAttribute('data-state', 'running');
        btn.setAttribute('aria-label', lbl.replace('Resume', 'Pause'));
        syncTrigger();
      } else if (lbl === 'Open') {
        row?.setAttribute('data-state', 'done');
        btn.textContent = 'Done';
        btn.disabled = true;
        syncTrigger();
      }
      return;
    }
    const rowMain = t?.closest<HTMLButtonElement>('.ui-rnc__main');
    if (rowMain) {
      const row = rowMain.closest<HTMLElement>('.ui-rnc__row');
      if (row) {
        row.style.background = row.style.background ? '' : 'rgba(0,0,0,0.03)';
      }
    }
  });

  return () => scope.dispose();
}
