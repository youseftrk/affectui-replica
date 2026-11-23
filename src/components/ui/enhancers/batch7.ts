import { createScope } from './utils';
import tamTabs from './data/tool-access-map-tabs.json';

// 1. COMMIT TRAIL
export function enhanceCommitTrail(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-cmtc');
  if (!root) return () => {};

  const branchBtn = root.querySelector<HTMLButtonElement>('.ui-cmtc__branch');
  const branchName = root.querySelector<HTMLElement>('.ui-cmtc__branch-name');
  const countEl = root.querySelector<HTMLElement>('.ui-cmtc__count');
  const switchWrap = root.querySelector<HTMLElement>('.ui-cmtc__switch');
  const items = [...root.querySelectorAll<HTMLLIElement>('.ui-cmtc__item')];

  const BRANCHES = [
    { name: 'main', count: '9 commits' },
    { name: 'invoice-pdf', count: '3 commits' },
    { name: 'tax-rates', count: '2 commits' },
  ];
  let menu: HTMLElement | null = null;
  let curBranch = 'main';

  const closeMenu = () => {
    menu?.remove();
    menu = null;
    branchBtn?.setAttribute('aria-expanded', 'false');
  };

  scope.on(branchBtn, 'click', (e) => {
    e.stopPropagation();
    if (menu) { closeMenu(); return; }
    if (!switchWrap) return;
    switchWrap.style.position = 'relative';
    menu = document.createElement('div');
    menu.className = 'ui-cmtc__menu';
    menu.setAttribute('role', 'menu');
    menu.style.cssText = 'position:absolute;left:0;top:calc(100% + 4px);z-index:25;min-width:140px;background:#fff;border-radius:8px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 10px 24px -8px rgba(0,0,0,0.18);padding:4px;';
    menu.innerHTML = BRANCHES.map(
      (b) => `<button type="button" role="menuitemradio" class="ui-cmtc__option" data-branch="${b.name}" aria-checked="${b.name === curBranch}" style="display:block;width:100%;text-align:left;padding:5px 8px;border-radius:6px;font-size:12px;background:${b.name === curBranch ? 'rgba(0,0,0,0.05)' : 'transparent'}">${b.name}</button>`
    ).join('');
    switchWrap.appendChild(menu);
    branchBtn?.setAttribute('aria-expanded', 'true');
    scope.on(menu, 'click', (me) => {
      const opt = (me.target as Element | null)?.closest<HTMLButtonElement>('[data-branch]');
      if (!opt) return;
      curBranch = opt.getAttribute('data-branch') || 'main';
      const info = BRANCHES.find((b) => b.name === curBranch) || BRANCHES[0];
      if (branchName) branchName.textContent = info.name;
      if (countEl) countEl.textContent = info.count;
      items.forEach((it, idx) => {
        if (curBranch === 'main') it.style.display = '';
        else if (curBranch === 'invoice-pdf') it.style.display = (it.textContent || '').includes('invoice') || idx === 2 ? '' : 'none';
        else it.style.display = (it.textContent || '').includes('tax') || idx === 4 ? '' : 'none';
      });
      closeMenu();
    });
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const copyBtn = t?.closest<HTMLButtonElement>('.ui-cmtc__copy');
    if (copyBtn) {
      e.stopPropagation();
      copyBtn.setAttribute('data-done', 'true');
      scope.later(() => copyBtn.removeAttribute('data-done'), 1100);
      return;
    }
    const subBtn = t?.closest<HTMLButtonElement>('.ui-cmtc__subrow');
    if (subBtn) {
      const sub = subBtn.closest<HTMLElement>('.ui-cmtc__sub');
      const open = subBtn.getAttribute('aria-expanded') !== 'true';
      subBtn.setAttribute('aria-expanded', String(open));
      const det = sub?.querySelector<HTMLElement>('.ui-cmtc__details');
      if (open) { sub?.setAttribute('data-open', 'true'); det?.setAttribute('data-open', 'true'); }
      else { sub?.removeAttribute('data-open'); det?.removeAttribute('data-open'); }
      return;
    }
    const rowBtn = t?.closest<HTMLButtonElement>('.ui-cmtc__row');
    if (rowBtn) {
      const item = rowBtn.closest<HTMLElement>('.ui-cmtc__item');
      const open = rowBtn.getAttribute('aria-expanded') !== 'true';
      rowBtn.setAttribute('aria-expanded', String(open));
      const det = item?.querySelector<HTMLElement>('.ui-cmtc__details');
      const subs = item?.querySelector<HTMLElement>('.ui-cmtc__subs');
      if (open) {
        item?.setAttribute('data-open', 'true');
        det?.setAttribute('data-open', 'true');
        subs?.setAttribute('data-open', 'true');
      } else {
        item?.removeAttribute('data-open');
        det?.removeAttribute('data-open');
        subs?.removeAttribute('data-open');
      }
    }
  });

  scope.on(document, 'click', (e) => {
    if (menu && !switchWrap?.contains(e.target as Node)) closeMenu();
  });

  return () => scope.dispose();
}

// 2. CONTEXT MAP
export function enhanceContextMap(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-cmpc');
  if (!root) return () => {};

  const pickWrap = root.querySelector<HTMLElement>('.ui-cmpc__pick');
  const whoBtn = root.querySelector<HTMLButtonElement>('.ui-cmpc__who');
  const modelEl = root.querySelector<HTMLElement>('.ui-cmpc__model');
  const limitEl = root.querySelector<HTMLElement>('.ui-cmpc__limit');
  const usedEl = root.querySelector<HTMLElement>('.ui-cmpc__used');
  const pctEl = root.querySelector<HTMLElement>('.ui-cmpc__pct');
  const tiles = [...root.querySelectorAll<HTMLElement>('.ui-cmpc__tile')];

  const AGENTS = [
    { name: 'Checkout fixer', model: 'Opus 5.5', limit: '200k', used: '42.9k', pct: '21%' },
    { name: 'Codebase scout', model: 'Gemini Pro', limit: '500k', used: '184k', pct: '37%' },
    { name: 'Support triage', model: 'GPT-5', limit: '128k', used: '98.2k', pct: '77%' },
  ];
  let cur = 'Checkout fixer';
  let menu: HTMLElement | null = null;
  let pinnedTile: HTMLElement | null = null;

  const closeMenu = () => {
    menu?.remove();
    menu = null;
    whoBtn?.setAttribute('aria-expanded', 'false');
  };

  scope.on(whoBtn, 'click', (e) => {
    e.stopPropagation();
    if (menu) { closeMenu(); return; }
    if (!pickWrap) return;
    pickWrap.style.position = 'relative';
    menu = document.createElement('span');
    menu.className = 'ui-cmpc__menu';
    menu.setAttribute('role', 'menu');
    menu.style.cssText = 'position:absolute;left:0;top:calc(100% + 4px);z-index:25;min-width:210px;background:#fff;border-radius:8px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 10px 24px -8px rgba(0,0,0,0.18);padding:4px;display:grid;';
    menu.innerHTML = AGENTS.map(
      (a) => `<button type="button" role="menuitemradio" class="ui-cmpc__option" data-ag="${a.name}" aria-checked="${a.name === cur}" style="display:flex;justify-content:space-between;gap:12px;padding:6px 8px;border-radius:6px;font-size:12px;background:${a.name === cur ? 'rgba(0,0,0,0.05)' : 'transparent'}"><span><b>${a.name}</b> <small style="opacity:0.6">${a.model}</small></span><span style="opacity:0.6">${a.limit}</span></button>`
    ).join('');
    pickWrap.appendChild(menu);
    whoBtn?.setAttribute('aria-expanded', 'true');
    scope.on(menu, 'click', (me) => {
      const opt = (me.target as Element | null)?.closest<HTMLButtonElement>('[data-ag]');
      if (!opt) return;
      const ag = AGENTS.find((a) => a.name === opt.getAttribute('data-ag')) || AGENTS[0];
      cur = ag.name;
      if (modelEl) modelEl.textContent = ag.name;
      if (limitEl) limitEl.textContent = ag.limit;
      if (usedEl) usedEl.textContent = ag.used;
      if (pctEl) {
        pctEl.textContent = ag.pct;
        if (parseInt(ag.pct) >= 75) pctEl.setAttribute('data-level', 'high');
        else pctEl.removeAttribute('data-level');
      }
      closeMenu();
    });
  });

  tiles.forEach((tile) => {
    tile.style.cursor = 'pointer';
    scope.on(tile, 'click', () => {
      const same = pinnedTile === tile;
      pinnedTile = same ? null : tile;
      tiles.forEach((t) => {
        if (!pinnedTile) { t.removeAttribute('data-pinned'); t.removeAttribute('data-dim'); }
        else if (t === pinnedTile) { t.setAttribute('data-pinned', ''); t.removeAttribute('data-dim'); }
        else { t.removeAttribute('data-pinned'); t.setAttribute('data-dim', ''); }
      });
    });
  });

  scope.on(document, 'click', (e) => {
    if (menu && !pickWrap?.contains(e.target as Node)) closeMenu();
  });

  return () => scope.dispose();
}

// 3. CONTEXT WINDOW
export function enhanceContextWindow(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-cwc');
  if (!root) return () => {};

  const card = root.querySelector<HTMLElement>('.ui-cwc__card');
  const origHtml = card?.innerHTML || '';
  const FILE_SIZES: Record<string, number> = {
    'schema.prisma': 9.4,
    'billing.ts': 21.3,
    'meeting-notes.md': 15.4,
  };
  let totalUsed = 175.6;
  let filesTotal = 46.1;
  let convTokens = 108.6;

  const syncNumbers = () => {
    const pct = Math.min(100, Math.round((totalUsed / 200) * 100));
    const big = root.querySelector<HTMLElement>('.ui-cwc__big');
    const pctEl = root.querySelector<HTMLElement>('.ui-cwc__pct');
    const filesVal = root.querySelector<HTMLElement>('.ui-cwc__main .ui-cwc__val, .ui-cwc__main span:last-child');
    if (big) big.textContent = `${totalUsed.toFixed(1)}K`;
    if (pctEl) pctEl.textContent = `${pct}%`;
    if (filesVal && /K$/.test(filesVal.textContent?.trim() || '')) filesVal.textContent = `${filesTotal.toFixed(1)}K`;
    root.setAttribute('data-level', pct >= 95 ? 'full' : pct >= 80 ? 'warn' : 'ok');
    const cells = [...root.querySelectorAll<HTMLElement>('.ui-cwc__cell')];
    const usedCells = Math.round((pct / 100) * cells.length);
    cells.forEach((c, i) => {
      if (i >= usedCells) c.setAttribute('data-free', '');
      else c.removeAttribute('data-free');
    });
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const mainBtn = t?.closest<HTMLButtonElement>('.ui-cwc__main');
    if (mainBtn) {
      const open = mainBtn.getAttribute('aria-expanded') !== 'true';
      mainBtn.setAttribute('aria-expanded', String(open));
      const fold = root.querySelector<HTMLElement>('.ui-cwc__fold');
      if (open) { fold?.setAttribute('data-open', ''); fold?.removeAttribute('inert'); }
      else { fold?.removeAttribute('data-open'); fold?.setAttribute('inert', ''); }
      return;
    }
    const rmBtn = t?.closest<HTMLButtonElement>('.ui-cwc__remove');
    if (rmBtn) {
      const lbl = rmBtn.getAttribute('aria-label') || '';
      const fname = Object.keys(FILE_SIZES).find((k) => lbl.includes(k));
      const delta = fname ? FILE_SIZES[fname] : 10;
      totalUsed = Math.max(20, +(totalUsed - delta).toFixed(1));
      filesTotal = Math.max(0, +(filesTotal - delta).toFixed(1));
      rmBtn.closest('li, .ui-cwc__file')?.remove();
      syncNumbers();
      return;
    }
    const compactBtn = t?.closest<HTMLButtonElement>('.ui-cwc__compact');
    if (compactBtn && !compactBtn.hasAttribute('data-done')) {
      compactBtn.setAttribute('data-busy', '');
      compactBtn.textContent = 'Compacting…';
      scope.later(() => {
        const saved = +(convTokens * 0.58).toFixed(1);
        convTokens = +(convTokens - saved).toFixed(1);
        totalUsed = Math.max(20, +(totalUsed - saved).toFixed(1));
        compactBtn.removeAttribute('data-busy');
        compactBtn.setAttribute('data-done', '');
        compactBtn.textContent = 'Compacted ✓';
        syncNumbers();
      }, 450);
      return;
    }
    if (t?.closest('.ui-cwc__action') && card) {
      card.innerHTML = origHtml;
      totalUsed = 175.6;
      filesTotal = 46.1;
      convTokens = 108.6;
      root.setAttribute('data-level', 'warn');
    }
  });

  return () => scope.dispose();
}

// 4. DIFF TIMELINE
export function enhanceDiffTimeline(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-dtlc');
  if (!root) return () => {};

  const filesWrap = root.querySelector<HTMLElement>('.ui-dtlc__files');
  const rows = [...root.querySelectorAll<HTMLElement>('.ui-dtlc__row')];
  const main = root.querySelector<HTMLElement>('.ui-dtlc__main');
  const tip = root.querySelector<HTMLElement>('.ui-dtlc__tip');

  let activeRow: HTMLElement | null = null;

  rows.forEach((row) => {
    row.style.cursor = 'pointer';
    scope.on(row, 'click', () => {
      activeRow = activeRow === row ? null : row;
      if (activeRow) filesWrap?.setAttribute('data-hover', '');
      else filesWrap?.removeAttribute('data-hover');
      rows.forEach((r) => {
        if (r === activeRow) r.setAttribute('data-on', '');
        else r.removeAttribute('data-on');
      });
    });
  });

  scope.on(main, 'click', () => {
    if (tip) {
      if (tip.hasAttribute('data-open')) tip.removeAttribute('data-open');
      else tip.setAttribute('data-open', 'true');
    }
  });

  return () => scope.dispose();
}

// 5. FALLBACK CHAIN
export function enhanceFallbackChain(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-fbkc');
  if (!root) return () => {};

  const models = [...root.querySelectorAll<HTMLLIElement>('.ui-fbkc__model')];
  const links = [...root.querySelectorAll<SVGElement>('.ui-fbkc__link')];
  const summary = root.querySelector<HTMLElement>('.ui-fbkc__summary');
  const stateSpan = root.querySelector<HTMLElement>('.ui-fbkc__state');
  const respNode = root.querySelector<HTMLElement>('.ui-fbkc__node--to');

  const activateStep = (idx: number) => {
    models.forEach((m, i) => {
      const st = i < idx ? 'failed' : i === idx ? 'answered' : 'skipped';
      m.setAttribute('data-status', st);
      const sub = m.querySelector<HTMLElement>('.ui-fbkc__model-state, small, span:last-child');
      if (sub && i < idx) sub.textContent = 'Rate limited · 429';
      else if (sub && i === idx) sub.textContent = 'Answered · 420ms';
    });
    links.forEach((l, i) => l.setAttribute('data-status', i < idx ? 'failed' : i === idx ? 'answered' : 'skipped'));
    summary?.setAttribute('data-state', 'answered');
    respNode?.setAttribute('data-state', 'answered');
    if (stateSpan) stateSpan.innerHTML = `Answered on attempt <b>${idx + 1}</b> of ${models.length}`;
  };

  models.forEach((m, i) => {
    m.style.cursor = 'pointer';
    scope.on(m, 'click', () => activateStep(i));
  });

  root.querySelectorAll<HTMLElement>('.ui-fbkc__node').forEach((n) => {
    n.style.cursor = 'pointer';
    scope.on(n, 'click', () => activateStep(1));
  });

  return () => scope.dispose();
}

// 6. PARALLEL ATTEMPTS
export function enhanceParallelAttempts(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-pac');
  if (!root) return () => {};

  const rows = [...root.querySelectorAll<HTMLElement>('.ui-pac__row')];
  const sumB = root.querySelector<HTMLElement>('.ui-pac__sum b');

  rows.forEach((row) => {
    row.style.cursor = 'pointer';
    scope.on(row, 'click', () => {
      const was = row.hasAttribute('data-picked');
      rows.forEach((r) => {
        if (was) { r.removeAttribute('data-picked'); r.removeAttribute('data-quiet'); }
        else if (r === row) {
          r.setAttribute('data-picked', '');
          r.setAttribute('data-best', '');
          r.setAttribute('data-status', 'done');
          r.style.setProperty('--p', '1');
          r.removeAttribute('data-quiet');
        } else {
          r.removeAttribute('data-picked');
          r.setAttribute('data-quiet', '');
        }
      });
      if (sumB) sumB.textContent = String(rows.filter((r) => r.getAttribute('data-status') === 'done').length);
    });
  });

  return () => scope.dispose();
}

// 7. PLAN VS ACTUAL
export function enhancePlanVsActual(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-pvac');
  if (!root) return () => {};

  const body = root.querySelector<HTMLElement>('.ui-pvac__body');
  const rows = [...root.querySelectorAll<HTMLElement>('.ui-pvac__row')];
  const verdict = root.querySelector<HTMLElement>('.ui-pvac__verdict');

  let focused: HTMLElement | null = null;

  rows.forEach((row, i) => {
    row.style.cursor = 'pointer';
    scope.on(row, 'click', () => {
      focused = focused === row ? null : row;
      if (focused) body?.setAttribute('data-focus', '');
      else body?.removeAttribute('data-focus');
      rows.forEach((r) => {
        if (r === focused) r.setAttribute('data-focus', '');
        else r.removeAttribute('data-focus');
      });
      if (verdict && focused) {
        const early = i % 2 === 0;
        verdict.setAttribute('data-state', early ? 'early' : 'late');
        verdict.textContent = early ? '3s ahead' : '6s behind';
      }
    });
  });

  return () => scope.dispose();
}

// 8. REPO MAP
export function enhanceRepoMap(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-rpmc');
  if (!root) return () => {};

  const agents = [...root.querySelectorAll<HTMLButtonElement>('.ui-rpmc__agent')];
  const tiles = [...root.querySelectorAll<HTMLElement>('.ui-rpmc__tile')];

  let activeIdx: number | null = null;

  agents.forEach((btn, idx) => {
    scope.on(btn, 'click', () => {
      activeIdx = activeIdx === idx ? null : idx;
      agents.forEach((b, i) => {
        const on = activeIdx === i;
        b.setAttribute('aria-pressed', String(on));
        if (activeIdx !== null && !on) b.setAttribute('data-dim', '');
        else b.removeAttribute('data-dim');
      });
      tiles.forEach((tile, ti) => {
        if (activeIdx === null || ti % agents.length === activeIdx) tile.removeAttribute('data-dim');
        else tile.setAttribute('data-dim', '');
      });
    });
  });

  tiles.forEach((tile) => {
    tile.style.cursor = 'pointer';
    scope.on(tile, 'click', () => {
      const editing = tile.getAttribute('data-state') === 'editing';
      tile.setAttribute('data-state', editing ? 'changed' : 'editing');
    });
  });

  return () => scope.dispose();
}

// 9. ROOT CAUSE TREE
export function enhanceRootCauseTree(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-rctc');
  if (!root) return () => {};

  const cards = [...root.querySelectorAll<HTMLElement>('.ui-rctc__card')];
  const sumEl = root.querySelector<HTMLElement>('.ui-rctc__sum');

  const syncSum = () => {
    const ruled = cards.filter((c) => c.getAttribute('data-status') === 'ruled-out').length;
    const confirmed = cards.filter((c) => c.getAttribute('data-status') === 'confirmed').length;
    if (sumEl) {
      sumEl.textContent = confirmed > 0
        ? `Root cause found · ${ruled} ruled out`
        : `${Math.max(1, cards.length - 1)} hypotheses · ${ruled} ruled out`;
    }
  };

  cards.forEach((card) => {
    card.style.cursor = 'pointer';
    scope.on(card, 'click', () => {
      cards.forEach((c) => {
        const sel = c === card;
        c.setAttribute('aria-selected', String(sel));
        if (!sel) c.setAttribute('data-dim', '');
        else c.removeAttribute('data-dim');
      });
      if (!card.hasAttribute('data-root')) {
        const cur = card.getAttribute('data-status') || 'open';
        const next = cur === 'open' ? 'checking' : cur === 'checking' ? 'ruled-out' : cur === 'ruled-out' ? 'confirmed' : 'open';
        card.setAttribute('data-status', next);
        const stEl = card.querySelector<HTMLElement>('.ui-rctc__state');
        if (stEl) {
          stEl.setAttribute('data-status', next);
          stEl.textContent = next === 'checking' ? 'Checking' : next === 'ruled-out' ? 'Ruled out' : next === 'confirmed' ? 'Root cause' : 'Not checked';
        }
        syncSum();
      }
    });
  });

  return () => scope.dispose();
}

// 10. TOOL ACCESS MAP
export function enhanceToolAccessMap(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-tamc');
  if (!root) return () => {};

  const tabsData = tamTabs as Record<string, string>;
  let pop: HTMLElement | null = null;

  const closePop = () => { pop?.remove(); pop = null; };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-tam-close]')) { closePop(); return; }
    const tab = t?.closest<HTMLButtonElement>('.ui-tamc__agent-tab');
    if (tab) {
      closePop();
      const name = tab.textContent?.trim() || 'Coder';
      if (tabsData[name]) root.innerHTML = tabsData[name];
      return;
    }
    const tool = t?.closest<HTMLButtonElement>('.ui-tamc__tool');
    if (tool) {
      e.stopPropagation();
      closePop();
      const blocked = tool.getAttribute('data-state') === 'blocked';
      const title = tool.textContent?.trim().split(/\s+/)[0] || 'Tool';
      root.style.position = 'relative';
      pop = document.createElement('div');
      pop.setAttribute('role', 'dialog');
      pop.style.cssText = 'position:absolute;right:16px;top:64px;z-index:25;width:240px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 14px 30px -10px rgba(0,0,0,0.22);padding:10px 12px;font-size:12px;display:grid;gap:8px;';
      pop.innerHTML = `<div style="display:flex;justify-content:space-between"><b>${title}</b><button type="button" data-tam-close>✕</button></div><div style="opacity:0.7">${tool.textContent?.trim()}</div><button type="button" data-tam-toggle style="padding:5px 10px;border-radius:6px;background:#111;color:#fff;font-weight:500">${blocked ? 'Grant access' : 'Revoke access'}</button>`;
      root.appendChild(pop);
      pop.querySelector('[data-tam-toggle]')?.addEventListener('click', () => {
        if (blocked) tool.removeAttribute('data-state');
        else tool.setAttribute('data-state', 'blocked');
        closePop();
      });
    }
  });

  scope.on(document, 'click', (e) => {
    if (pop && !pop.contains(e.target as Node)) closePop();
  });

  return () => scope.dispose();
}

// 11. TRACE WATERFALL
export function enhanceTraceWaterfall(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-trwc');
  if (!root) return () => {};

  const rows = [...root.querySelectorAll<HTMLElement>('.ui-trwc__row')];
  let pop: HTMLElement | null = null;
  let openRow: HTMLElement | null = null;

  const closePop = () => {
    pop?.remove();
    pop = null;
    rows.forEach((r) => { r.removeAttribute('data-open'); r.setAttribute('aria-selected', 'false'); });
    openRow = null;
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-trw-close]')) { closePop(); return; }
    const row = t?.closest<HTMLElement>('.ui-trwc__row');
    if (!row) return;
    e.stopPropagation();
    if (openRow === row) { closePop(); return; }
    closePop();
    openRow = row;
    row.setAttribute('data-open', '');
    row.setAttribute('aria-selected', 'true');
    const label = row.getAttribute('aria-label') || row.textContent?.trim() || 'Span';
    root.style.position = 'relative';
    pop = document.createElement('div');
    pop.className = 'ui-trwc__pop';
    pop.setAttribute('role', 'dialog');
    pop.style.cssText = 'position:absolute;right:16px;top:64px;z-index:25;width:270px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 14px 30px -10px rgba(0,0,0,0.22);padding:10px 12px;font-size:12px;display:grid;gap:6px;';
    pop.innerHTML = `<div style="display:flex;justify-content:space-between"><b>Span details</b><button type="button" data-trw-close>✕</button></div><div style="opacity:0.75;line-height:1.45">${label}</div>`;
    root.appendChild(pop);
  });

  scope.on(document, 'click', (e) => {
    if (pop && !pop.contains(e.target as Node)) closePop();
  });

  return () => scope.dispose();
}
