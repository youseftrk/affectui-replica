import { createScope, wireRadioGroup } from './utils';

// 1. AGENT HANDOFF
export function enhanceAgentHandoff(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-ahc');
  if (!root) return () => {};

  const agents = [...root.querySelectorAll<HTMLElement>('.ui-ahc__agent')];
  let peek: HTMLElement | null = null;
  let openAg: HTMLElement | null = null;

  const AGENT_TOOLS = [
    ['Read Acme’s support thread (46)', 'Look up the March incident', 'Read the postmortem'],
    ['Read style guide', 'Draft customer reply', 'Check tone against playbook'],
    ['Verify claims against sources', 'Check pricing accuracy', 'Sign off for send'],
  ];

  const closePeek = () => {
    peek?.remove();
    peek = null;
    agents.forEach((a) => { a.removeAttribute('data-peek'); a.setAttribute('aria-expanded', 'false'); });
    openAg = null;
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-ah-close]')) { closePeek(); return; }
    const addBack = t?.closest<HTMLButtonElement>('[data-add-back]');
    if (addBack) {
      e.stopPropagation();
      const item = addBack.closest<HTMLElement>('.ui-ahc__item');
      item?.removeAttribute('data-lost');
      addBack.parentElement?.remove();
      return;
    }
    const itemBtn = t?.closest<HTMLButtonElement>('.ui-ahc__item');
    if (itemBtn) {
      e.stopPropagation();
      const exp = itemBtn.getAttribute('aria-expanded') === 'true';
      itemBtn.setAttribute('aria-expanded', String(!exp));
      const existing = itemBtn.nextElementSibling?.classList.contains('ui-ahc__item-note') ? itemBtn.nextElementSibling : null;
      if (existing) existing.remove();
      else {
        const note = document.createElement('div');
        note.className = 'ui-ahc__item-note';
        note.style.cssText = 'font-size:11px;padding:4px 8px;margin:2px 0 4px;border-radius:6px;background:rgba(0,0,0,0.03);display:flex;justify-content:space-between;align-items:center;gap:6px';
        note.innerHTML = itemBtn.hasAttribute('data-lost')
          ? `<span>Cut during handoff summary</span><button type="button" data-add-back style="font-weight:500;text-decoration:underline">Add back</button>`
          : `<span>Passed cleanly in handoff context</span>`;
        itemBtn.insertAdjacentElement('afterend', note);
      }
      return;
    }
    const cardMain = t?.closest<HTMLButtonElement>('.ui-ahc__card-main');
    if (cardMain) {
      const card = cardMain.closest<HTMLElement>('.ui-ahc__card');
      const fold = card?.querySelector<HTMLElement>('.ui-ahc__fold');
      const open = !card?.hasAttribute('data-open');
      if (open) { card?.setAttribute('data-open', ''); fold?.setAttribute('data-open', ''); }
      else { card?.removeAttribute('data-open'); fold?.removeAttribute('data-open'); }
      cardMain.setAttribute('aria-expanded', String(open));
      return;
    }
    const ag = t?.closest<HTMLElement>('.ui-ahc__agent');
    if (ag) {
      e.stopPropagation();
      if (openAg === ag) { closePeek(); return; }
      closePeek();
      openAg = ag;
      ag.setAttribute('data-peek', '');
      ag.setAttribute('aria-expanded', 'true');
      const idx = agents.indexOf(ag);
      const name = ag.querySelector('.ui-ahc__name')?.textContent?.trim() || 'Agent';
      const tools = AGENT_TOOLS[idx] || AGENT_TOOLS[0];
      root.style.position = 'relative';
      peek = document.createElement('div');
      peek.className = 'ui-ahc__peek';
      peek.setAttribute('role', 'dialog');
      peek.style.cssText = 'position:absolute;left:50%;top:12px;transform:translateX(-50%);z-index:25;width:270px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 14px 30px -10px rgba(0,0,0,0.22);padding:10px 12px;font-size:12px;display:grid;gap:6px;';
      peek.innerHTML = `<div style="display:flex;justify-content:space-between"><b>${name} · Tools</b><button type="button" data-ah-close>✕</button></div><ul style="margin:0;padding-left:14px;opacity:0.75;display:grid;gap:3px">${tools.map((x) => `<li>${x}</li>`).join('')}</ul>`;
      root.appendChild(peek);
    }
  });

  scope.on(document, 'click', (e) => {
    if (peek && !peek.contains(e.target as Node)) closePeek();
  });

  return () => scope.dispose();
}

// 2. AGENT PLAN
export function enhanceAgentPlan(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-plc');
  if (!root) return () => {};

  const list = root.querySelector<HTMLOListElement>('.ui-plc__list');
  const stateLabel = root.querySelector<HTMLElement>('.ui-plc__state-label');
  const addIn = root.querySelector<HTMLInputElement>('input');
  const foot = root.querySelector<HTMLElement>('.ui-plc__foot');
  let running = false;

  const syncCount = () => {
    const steps = [...(list?.querySelectorAll<HTMLLIElement>('.ui-plc__step') || [])];
    if (stateLabel) stateLabel.textContent = `Plan · ${steps.length} step${steps.length === 1 ? '' : 's'}`;
    steps.forEach((li, i) => {
      const num = li.querySelector('.ui-plc__num, .ui-plc__index');
      if (num) num.textContent = String(i + 1);
    });
  };

  const runPlan = () => {
    if (running || !list) return;
    running = true;
    root.setAttribute('data-status', 'running');
    const steps = [...list.querySelectorAll<HTMLLIElement>('.ui-plc__step')];
    steps.forEach((s) => s.setAttribute('data-step', 'pending'));
    let cur = 0;
    const advance = () => {
      if (!running) return;
      if (cur > 0) steps[cur - 1]?.setAttribute('data-step', 'done');
      if (cur < steps.length) {
        steps[cur]?.setAttribute('data-step', 'active');
        cur++;
        scope.later(advance, 550);
      } else {
        running = false;
        root.setAttribute('data-status', 'done');
        foot?.setAttribute('data-phase', 'done');
      }
    };
    advance();
  };

  const resetPlan = () => {
    running = false;
    root.setAttribute('data-status', 'draft');
    foot?.removeAttribute('data-phase');
    list?.querySelectorAll('.ui-plc__step').forEach((s) => s.removeAttribute('data-step'));
  };

  scope.on(addIn, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'Enter' && addIn?.value.trim() && list) {
      ke.preventDefault();
      const title = addIn.value.trim();
      addIn.value = '';
      const last = list.querySelector<HTMLLIElement>('.ui-plc__step:last-of-type');
      const li = last ? (last.cloneNode(true) as HTMLLIElement) : document.createElement('li');
      li.className = 'ui-plc__step';
      const titleEl = li.querySelector('.ui-plc__step-title, b, strong') || li.querySelector('span:nth-child(2)');
      if (titleEl) titleEl.textContent = title;
      else li.textContent = title;
      list.appendChild(li);
      syncCount();
    }
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const rm = t?.closest<HTMLButtonElement>('.ui-plc__remove');
    if (rm) {
      rm.closest('.ui-plc__step')?.remove();
      syncCount();
      return;
    }
    const btn = t?.closest<HTMLButtonElement>('.ui-plc__btn');
    if (btn) {
      const txt = btn.textContent?.trim() || '';
      if (txt.includes('Run')) runPlan();
      else resetPlan();
    }
  });

  return () => scope.dispose();
}

// 3. AGENT TRAIL
export function enhanceAgentTrail(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-atrc');
  if (!root) return () => {};

  const steps = [...root.querySelectorAll<HTMLLIElement>('.ui-atrc__step')];

  steps.forEach((step) => {
    const row = step.querySelector<HTMLElement>('.ui-atrc__row');
    if (!row) return;
    row.style.cursor = 'pointer';
    scope.on(row, 'click', () => {
      const open = step.hasAttribute('data-open');
      if (open) {
        step.removeAttribute('data-open');
        row.setAttribute('aria-expanded', 'false');
        step.querySelector('.ui-atrc__subs')?.removeAttribute('data-open');
      } else {
        step.setAttribute('data-open', 'true');
        row.setAttribute('aria-expanded', 'true');
        step.querySelector('.ui-atrc__subs')?.setAttribute('data-open', 'true');
      }
    });
  });

  return () => scope.dispose();
}

// 4. AGENT TREE
export function enhanceAgentTree(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-agtc');
  if (!root) return () => {};

  const foldBtn = root.querySelector<HTMLButtonElement>('.ui-agtc__fold');
  const rootItem = root.querySelector<HTMLElement>('.ui-agtc__root');
  const hangs = [...root.querySelectorAll<HTMLElement>('.ui-agtc__hang')];
  const origFoldText = foldBtn?.textContent?.trim() || '2';

  scope.on(foldBtn, 'click', (e) => {
    e.stopPropagation();
    const expanded = foldBtn?.getAttribute('aria-expanded') !== 'false';
    const next = !expanded;
    foldBtn?.setAttribute('aria-expanded', String(next));
    rootItem?.setAttribute('aria-expanded', String(next));
    if (foldBtn) foldBtn.textContent = next ? origFoldText : `+${hangs.length || origFoldText}`;
    hangs.forEach((h) => { h.style.display = next ? '' : 'none'; });
  });

  scope.on(root, 'click', (e) => {
    const node = (e.target as Element | null)?.closest<HTMLElement>('.ui-agtc__node');
    if (!node) return;
    const wasSelected = node.getAttribute('aria-selected') === 'true';
    root.querySelectorAll('.ui-agtc__node').forEach((n) => n.setAttribute('aria-selected', 'false'));
    if (!wasSelected) node.setAttribute('aria-selected', 'true');
  });

  return () => scope.dispose();
}

// 5. AGENT WORKBENCH
export function enhanceAgentWorkbench(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-awbc');
  if (!root) return () => {};

  const stage = root.querySelector<HTMLElement>('.ui-awbc__stage');
  const triggers = [...root.querySelectorAll<HTMLButtonElement>('[data-awbc-trigger], .ui-awbc__hit, .ui-awbc__file')];
  let pop: HTMLElement | null = null;
  let openTrig: HTMLButtonElement | null = null;

  const INFO: Record<string, string[]> = {
    Assistant: ['Role: Personal assistant', 'Account: ryan@lumen.co', 'Status: Active on request'],
    'budget-q4.xlsx': ['Type: Spreadsheet', 'Size: 48 KB', 'Added by Ryan Brooks · Mon'],
    'kickoff-brief.docx': ['Type: Word document', 'Size: 214 KB · 6 pages', 'Added by Ryan Brooks · Mon'],
    'vendor-contract.pdf': ['Type: PDF', 'Size: 1.2 MB · 12 pages', 'Added by Ryan Brooks · Mon'],
    Gmail: ['May: Read, draft, send', 'Account: ryan@lumen.co', 'Connected Mar 4'],
    'Google Calendar': ['May: Read, book, move', 'Calendar: Work', 'This request: Checking Marc’s calendar'],
    'Google Drive': ['May: Read shared folders', 'Folder: Q4 Finance', 'Connected Feb 12'],
  };

  const closePop = () => {
    pop?.remove();
    pop = null;
    triggers.forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
      b.closest('.ui-awbc__card')?.removeAttribute('data-open');
    });
    openTrig = null;
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-awb-close]')) { closePop(); return; }
    const trig = t?.closest<HTMLButtonElement>('[data-awbc-trigger], .ui-awbc__hit, .ui-awbc__file');
    if (!trig || !stage) return;
    e.stopPropagation();
    if (openTrig === trig) { closePop(); return; }
    closePop();
    openTrig = trig;
    trig.setAttribute('aria-expanded', 'true');
    trig.closest('.ui-awbc__card')?.setAttribute('data-open', '');
    const key = Object.keys(INFO).find((k) => (trig.getAttribute('aria-label') || trig.textContent || '').includes(k)) || 'Assistant';
    const lines = INFO[key];
    stage.style.position = 'relative';
    pop = document.createElement('div');
    pop.className = 'ui-awbc__pop';
    pop.setAttribute('role', 'dialog');
    pop.style.cssText = 'position:absolute;left:50%;top:12px;transform:translateX(-50%);z-index:25;width:256px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 14px 30px -10px rgba(0,0,0,0.22);padding:10px 12px;font-size:12px;display:grid;gap:4px;';
    pop.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:2px"><b>${key}</b><button type="button" data-awb-close>✕</button></div>${lines.map((l) => `<div style="opacity:0.72">${l}</div>`).join('')}`;
    stage.appendChild(pop);
  });

  scope.on(document, 'click', (e) => {
    if (pop && !pop.contains(e.target as Node)) closePop();
  });

  return () => scope.dispose();
}

// 6. FLOW BUILDER
export function enhanceFlowBuilder(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-flbc');
  if (!root) return () => {};

  const runBtn = root.querySelector<HTMLButtonElement>('.ui-flbc__run');
  const cards = [...root.querySelectorAll<HTMLButtonElement>('.ui-flbc__card')];
  const steps = [...root.querySelectorAll<HTMLElement>('.ui-flbc__step')];
  let running = root.hasAttribute('data-running');
  let selectedCard: HTMLButtonElement | null = null;

  const setRunning = (next: boolean) => {
    running = next;
    if (running) {
      root.setAttribute('data-running', '');
      if (runBtn) runBtn.innerHTML = 'Stop';
      steps.forEach((s, i) => s.setAttribute('data-status', i === 0 ? 'done' : i === 1 ? 'running' : 'pending'));
    } else {
      root.removeAttribute('data-running');
      if (runBtn) runBtn.innerHTML = 'Run test';
      steps.forEach((s) => s.removeAttribute('data-status'));
    }
  };

  scope.on(runBtn, 'click', () => setRunning(!running));

  scope.on(root, 'click', (e) => {
    const card = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-flbc__card');
    if (!card) return;
    const was = selectedCard === card;
    cards.forEach((c) => {
      c.setAttribute('aria-pressed', 'false');
      c.closest('.ui-flbc__step')?.removeAttribute('data-selected');
    });
    if (was) {
      selectedCard = null;
      root.removeAttribute('data-selecting');
    } else {
      selectedCard = card;
      card.setAttribute('aria-pressed', 'true');
      card.closest('.ui-flbc__step')?.setAttribute('data-selected', '');
      root.setAttribute('data-selecting', '');
    }
  });

  scope.on(document, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'Escape' && selectedCard) {
      selectedCard.click();
    }
  });

  return () => scope.dispose();
}

// 7. FAN OUT GRID
export function enhanceFanOutGrid(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-fogc');
  if (!root) return () => {};

  const grid = root.querySelector<HTMLElement>('.ui-fogc__grid');
  const cells = [...root.querySelectorAll<HTMLElement>('.ui-fogc__cell')];
  const keys = [...root.querySelectorAll<HTMLButtonElement>('.ui-fogc__key')];
  const DOMAINS = ['northwind.io', 'lumen.co', 'tailspin.dev', 'acme.ai', 'solaris.app', 'verge.io', 'cobalt.sh', 'kestrel.hq'];

  let filterStatus: string | null = null;
  let pinnedCell: HTMLElement | null = null;
  let tip: HTMLElement | null = null;

  const showTip = (cell: HTMLElement, idx: number) => {
    tip?.remove();
    const panel = root.querySelector<HTMLElement>('.ui-fogc__panel');
    if (!panel) return;
    panel.style.position = 'relative';
    const pr = panel.getBoundingClientRect();
    const cr = cell.getBoundingClientRect();
    const st = cell.getAttribute('data-status') || 'queued';
    tip = document.createElement('div');
    tip.className = 'ui-fogc__tip';
    tip.setAttribute('role', 'tooltip');
    tip.style.cssText = `position:absolute;left:${Math.min(Math.max(8, cr.left - pr.left - 40), Math.max(8, pr.width - 220))}px;top:${Math.max(8, cr.bottom - pr.top + 6)}px;z-index:25;width:210px;background:#fff;border-radius:8px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 8px 22px -6px rgba(0,0,0,0.18);padding:8px 10px;font-size:11.5px;`;
    tip.innerHTML = `<div><b>${DOMAINS[idx % DOMAINS.length]}</b> · <span style="text-transform:capitalize">${st}</span></div><div style="opacity:0.65">Researcher ${(idx % 4) + 1} · ${(1.1 + (idx % 9) * 0.2).toFixed(1)}s · $0.009</div>`;
    panel.appendChild(tip);
  };

  keys.forEach((keyBtn) => {
    scope.on(keyBtn, 'click', () => {
      const txt = (keyBtn.textContent || '').toLowerCase();
      const status = txt.includes('done') ? 'done' : txt.includes('running') ? 'running' : txt.includes('retry') ? 'retrying' : 'queued';
      filterStatus = filterStatus === status ? null : status;
      keys.forEach((k) => {
        const match = filterStatus && (k.textContent || '').toLowerCase().includes(filterStatus);
        k.setAttribute('aria-pressed', String(!!match));
      });
      cells.forEach((c) => {
        if (!filterStatus || c.getAttribute('data-status') === filterStatus) c.removeAttribute('data-dim');
        else c.setAttribute('data-dim', '');
      });
    });
  });

  scope.on(grid, 'mouseover', (e) => {
    if (pinnedCell) return;
    const cell = (e.target as Element | null)?.closest<HTMLElement>('.ui-fogc__cell');
    if (!cell) return;
    cells.forEach((c) => c.removeAttribute('data-on'));
    cell.setAttribute('data-on', '');
    showTip(cell, cells.indexOf(cell));
  });

  scope.on(grid, 'mouseleave', () => {
    if (pinnedCell) return;
    cells.forEach((c) => c.removeAttribute('data-on'));
    tip?.remove();
    tip = null;
  });

  scope.on(grid, 'click', (e) => {
    const cell = (e.target as Element | null)?.closest<HTMLElement>('.ui-fogc__cell') || cells[0];
    if (!cell) return;
    if (pinnedCell === cell) {
      pinnedCell.removeAttribute('data-pinned');
      pinnedCell = null;
      tip?.remove();
      tip = null;
    } else {
      pinnedCell?.removeAttribute('data-pinned');
      pinnedCell = cell;
      cell.setAttribute('data-pinned', '');
      showTip(cell, cells.indexOf(cell));
    }
  });

  return () => scope.dispose();
}

// 8. JUDGE BRACKET
export function enhanceJudgeBracket(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-jbc');
  if (!root) return () => {};

  const matches = [...root.querySelectorAll<HTMLButtonElement>('.ui-jbc__match')];
  const answers = [...root.querySelectorAll<HTMLElement>('.ui-jbc__answer')];
  const sumEl = root.querySelector<HTMLElement>('.ui-jbc__sum');

  let judged = 0;

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const match = t?.closest<HTMLButtonElement>('.ui-jbc__match');
    if (match) {
      matches.forEach((m) => {
        const isSel = m === match;
        m.setAttribute('aria-pressed', String(isSel));
        if (isSel) { m.removeAttribute('data-dim'); m.setAttribute('data-live', ''); }
        else { m.setAttribute('data-dim', ''); m.removeAttribute('data-live'); }
      });
      const slots = [...match.querySelectorAll<HTMLElement>('.ui-jbc__slot')];
      if (slots[0] && !slots[0].hasAttribute('data-won') && !slots[1]?.hasAttribute('data-won')) {
        slots[0].setAttribute('data-won', '');
        slots[1]?.setAttribute('data-lost', '');
        judged = Math.min(7, judged + 1);
        if (sumEl) sumEl.textContent = `Quarterfinal · ${judged}/7`;
      }
      return;
    }
    const ans = t?.closest<HTMLElement>('.ui-jbc__answer');
    if (ans) {
      answers.forEach((a) => {
        if (a === ans) { a.setAttribute('data-won', ''); a.removeAttribute('data-lost'); }
        else { a.setAttribute('data-lost', ''); a.removeAttribute('data-won'); }
      });
    }
  });

  return () => scope.dispose();
}

// 9. SCHEDULED RUNS
export function enhanceScheduledRuns(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-srn');
  if (!root) return () => {};

  const crew = root.querySelector<HTMLElement>('.ui-srn__crew');
  const agents = [...root.querySelectorAll<HTMLButtonElement>('.ui-srn__agent')];
  const tiles = [...root.querySelectorAll<HTMLElement>('.ui-srn__tile')];

  let activeAgent: string | null = null;

  agents.forEach((btn) => {
    scope.on(btn, 'click', () => {
      const name = btn.getAttribute('aria-label') || btn.textContent?.trim() || '';
      activeAgent = activeAgent === name ? null : name;
      if (activeAgent) crew?.setAttribute('data-open', 'true');
      else crew?.removeAttribute('data-open');
      agents.forEach((b) => {
        const on = activeAgent === (b.getAttribute('aria-label') || b.textContent?.trim());
        b.setAttribute('aria-pressed', String(on));
        if (on) b.setAttribute('data-on', 'true');
        else b.removeAttribute('data-on');
      });
      tiles.forEach((t) => {
        if (!activeAgent || (t.textContent || '').includes(activeAgent)) t.removeAttribute('data-dim');
        else t.setAttribute('data-dim', 'true');
      });
    });
  });

  wireRadioGroup(
    root.querySelector('[role="radiogroup"]'),
    'button[role="radio"]',
    (btn) => {
      const manual = (btn.getAttribute('data-mode') || btn.textContent || '').toLowerCase().includes('manual');
      tiles.forEach((t) => {
        if (manual) t.setAttribute('data-movable', 'true');
        else t.removeAttribute('data-movable');
      });
    },
    scope
  );

  tiles.forEach((tile) => {
    tile.style.cursor = 'pointer';
    scope.on(tile, 'click', () => {
      const open = tile.hasAttribute('data-open');
      tiles.forEach((t) => { t.removeAttribute('data-open'); t.setAttribute('aria-expanded', 'false'); });
      if (!open) {
        tile.setAttribute('data-open', 'true');
        tile.setAttribute('aria-expanded', 'true');
      }
    });
  });

  return () => scope.dispose();
}
