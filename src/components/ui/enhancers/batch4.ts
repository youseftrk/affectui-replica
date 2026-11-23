import { createScope, wireRadioGroup } from './utils';
import muTabs from './data/model-usage-tabs.json';
import tcStates from './data/trend-chart-states.json';
import scStates from './data/stat-card-states.json';

// 1. BREAKDOWN CHART
export function enhanceBreakdownChart(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-bcc');
  if (!root) return () => {};

  const selectBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-bcc__select-btn')];
  const cols = [...root.querySelectorAll<HTMLButtonElement>('.ui-bcc__col')];
  const chips = [...root.querySelectorAll<HTMLButtonElement>('.ui-bcc__chip')];
  const totalStrong = root.querySelector<HTMLElement>('.ui-bcc__total strong');
  const totalWrap = root.querySelector<HTMLElement>('.ui-bcc__total');

  const MENUS = [
    ['Task count', 'Story points'],
    ['Status', 'Priority', 'Team', 'Type'],
    ['None', 'Priority', 'Team', 'Type'],
  ];
  const CHIP_WEIGHTS = [12, 38, 65, 58, 39]; // sums to 212
  let mult = 1;
  let openMenu: HTMLElement | null = null;
  let openBtn: HTMLButtonElement | null = null;

  const closeMenu = () => {
    openMenu?.remove();
    openMenu = null;
    openBtn?.setAttribute('aria-expanded', 'false');
    openBtn = null;
  };

  const syncTotal = () => {
    let sum = 0;
    chips.forEach((c, i) => {
      if (c.getAttribute('aria-pressed') !== 'false') sum += CHIP_WEIGHTS[i] ?? 20;
    });
    const val = Math.round(sum * mult);
    if (totalStrong) totalStrong.textContent = String(val);
    if (totalWrap) {
      const unit = mult > 1 ? ' points' : ' tasks';
      if (totalWrap.lastChild && totalWrap.lastChild.nodeType === 3) totalWrap.lastChild.textContent = unit;
    }
  };

  selectBtns.forEach((btn, idx) => {
    scope.on(btn, 'click', (e) => {
      e.stopPropagation();
      if (openBtn === btn) { closeMenu(); return; }
      closeMenu();
      const wrap = btn.closest<HTMLElement>('.ui-bcc__select');
      if (!wrap) return;
      wrap.style.position = 'relative';
      const cur = btn.querySelector('span')?.textContent?.trim() || '';
      openMenu = document.createElement('div');
      openMenu.className = 'ui-bcc__menu';
      openMenu.setAttribute('role', 'listbox');
      openMenu.style.cssText = 'position:absolute;left:0;top:calc(100% + 4px);z-index:25;min-width:130px;background:#fff;border-radius:8px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 8px 22px -8px rgba(0,0,0,0.18);padding:4px;';
      openMenu.innerHTML = (MENUS[idx] || ['Default'])
        .map((o) => `<button type="button" role="option" class="ui-bcc__option" aria-selected="${o === cur}" style="display:block;width:100%;text-align:left;padding:5px 8px;border-radius:6px;font-size:12px;background:${o === cur ? 'rgba(0,0,0,0.05)' : 'transparent'}">${o}</button>`)
        .join('');
      wrap.appendChild(openMenu);
      btn.setAttribute('aria-expanded', 'true');
      openBtn = btn;
      scope.on(openMenu, 'click', (me) => {
        const opt = (me.target as Element | null)?.closest<HTMLButtonElement>('.ui-bcc__option');
        if (!opt) return;
        const val = opt.textContent?.trim() || '';
        const span = btn.querySelector('span');
        if (span) span.textContent = val;
        btn.title = val;
        if (idx === 0) mult = val === 'Story points' ? 2.4 : 1;
        syncTotal();
        closeMenu();
      });
    });
  });

  chips.forEach((chip, i) => {
    scope.on(chip, 'click', () => {
      const next = chip.getAttribute('aria-pressed') === 'false' ? 'true' : 'false';
      chip.setAttribute('aria-pressed', next);
      root.querySelectorAll<HTMLElement>(`.ui-bcc__seg:nth-child(${i + 1})`).forEach((seg) => {
        seg.style.opacity = next === 'false' ? '0.12' : '';
      });
      syncTotal();
    });
  });

  let activeCol: HTMLButtonElement | null = null;
  cols.forEach((col) => {
    const setHot = (hot: HTMLButtonElement | null) => {
      cols.forEach((c) => {
        if (!hot) { c.removeAttribute('data-active'); c.removeAttribute('data-dim'); }
        else if (c === hot) { c.setAttribute('data-active', ''); c.removeAttribute('data-dim'); }
        else { c.removeAttribute('data-active'); c.setAttribute('data-dim', ''); }
      });
    };
    scope.on(col, 'mouseenter', () => { if (!activeCol) setHot(col); });
    scope.on(col, 'mouseleave', () => { if (!activeCol) setHot(null); });
    scope.on(col, 'click', () => {
      activeCol = activeCol === col ? null : col;
      setHot(activeCol);
    });
  });

  scope.on(document, 'click', () => closeMenu());

  return () => scope.dispose();
}

// 2. COST WATERFALL
export function enhanceCostWaterfall(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-cwfc');
  if (!root) return () => {};

  const modeBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-cwfc__switch button')];
  const topBtn = root.querySelector<HTMLButtonElement>('.ui-cwfc__top');
  const rows = [...root.querySelectorAll<HTMLElement>('.ui-cwfc__row')];

  modeBtns.forEach((btn) => {
    scope.on(btn, 'click', () => {
      const mode = btn.textContent?.trim().toLowerCase() === 'tokens' ? 'tokens' : 'cost';
      root.setAttribute('data-mode', mode);
      modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    });
  });

  const toggleRowDetail = (row: HTMLElement) => {
    const isOpen = row.hasAttribute('data-open');
    rows.forEach((r) => {
      r.removeAttribute('data-open');
      r.setAttribute('aria-selected', 'false');
      r.parentElement?.querySelector('.ui-cwfc__detail-inline')?.remove();
    });
    if (!isOpen) {
      row.setAttribute('data-open', '');
      row.setAttribute('aria-selected', 'true');
      const label = row.getAttribute('aria-label') || row.textContent?.trim() || 'Step details';
      const detail = document.createElement('div');
      detail.className = 'ui-cwfc__detail-inline';
      detail.style.cssText = 'padding:8px 12px 10px 32px;font-size:11.5px;background:rgba(0,0,0,0.02);border-top:0.5px solid rgba(0,0,0,0.05);color:rgba(0,0,0,0.72);';
      detail.innerHTML = `<div style="font-weight:500;margin-bottom:2px">Trace breakdown</div><div>${label}</div>`;
      row.insertAdjacentElement('afterend', detail);
    }
  };

  scope.on(topBtn, 'click', () => {
    if (rows[0]) toggleRowDetail(rows[0]);
  });

  rows.forEach((row) => {
    scope.on(row, 'click', () => {
      if (row.hasAttribute('data-parent')) {
        const exp = row.getAttribute('aria-expanded') !== 'false';
        row.setAttribute('aria-expanded', String(!exp));
        let sib = row.closest('.ui-cwfc__item')?.nextElementSibling as HTMLElement | null;
        while (sib && sib.querySelector('[aria-level="2"]')) {
          if (exp) sib.setAttribute('data-hidden', '');
          else sib.removeAttribute('data-hidden');
          sib = sib.nextElementSibling as HTMLElement | null;
        }
      }
      toggleRowDetail(row);
    });
  });

  return () => scope.dispose();
}

// 3. DATA TABLE
export function enhanceDataTable(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-dtc');
  if (!root) return () => {};

  const scroll = root.querySelector<HTMLElement>('.ui-dtc__scroll');
  const headCheck = root.querySelector<HTMLButtonElement>('.ui-dtc__check[aria-label="Select all rows"]');
  const thBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-dtc__th')];
  const addBtn = root.querySelector<HTMLButtonElement>('.ui-dtc__add');
  const toolBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-dtc__tool')];
  const morph = root.querySelector<HTMLElement>('.ui-dtc__morph');
  const tbody = root.querySelector<HTMLElement>('tbody, [role="rowgroup"]:last-of-type');

  let sortCol = -1;
  let sortAsc = true;
  let bulkBar: HTMLElement | null = null;
  let rowSeq = 1;
  const undoStack: string[] = [];

  const getDataRows = () => [...root.querySelectorAll<HTMLElement>('[role="row"]')].filter((r) => !r.querySelector('.ui-dtc__th'));

  const syncSelection = () => {
    const rows = getDataRows();
    const checks = rows.map((r) => r.querySelector<HTMLButtonElement>('.ui-dtc__check')).filter(Boolean) as HTMLButtonElement[];
    const checkedCount = checks.filter((c) => c.getAttribute('aria-checked') === 'true').length;
    if (headCheck) {
      headCheck.setAttribute('aria-checked', checkedCount === 0 ? 'false' : checkedCount === checks.length ? 'true' : 'mixed');
    }
    bulkBar?.remove();
    bulkBar = null;
    if (checkedCount > 0) {
      bulkBar = document.createElement('div');
      bulkBar.className = 'ui-dtc__bulk';
      bulkBar.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 12px;border-top:0.5px solid rgba(0,0,0,0.06);font-size:12px;background:rgba(0,0,0,0.02)';
      bulkBar.innerHTML = `<b>${checkedCount} selected</b><span style="flex:1"></span><button type="button" data-bulk="clear" style="padding:2px 8px;border-radius:6px">Clear</button><button type="button" data-bulk="delete" style="padding:2px 8px;border-radius:6px;color:#c4320a;font-weight:500">Delete</button>`;
      root.appendChild(bulkBar);
    }
  };

  const pushUndo = () => {
    if (!tbody) return;
    undoStack.push(tbody.innerHTML);
    if (toolBtns[0]) toolBtns[0].disabled = false;
  };

  scope.on(headCheck, 'click', () => {
    const rows = getDataRows();
    const allChecked = headCheck?.getAttribute('aria-checked') === 'true';
    rows.forEach((r) => {
      const c = r.querySelector<HTMLButtonElement>('.ui-dtc__check');
      c?.setAttribute('aria-checked', String(!allChecked));
      if (!allChecked) r.setAttribute('data-selected', 'true');
      else r.removeAttribute('data-selected');
    });
    syncSelection();
  });

  thBtns.forEach((th, colIdx) => {
    scope.on(th, 'click', () => {
      if (sortCol === colIdx) sortAsc = !sortAsc;
      else { sortCol = colIdx; sortAsc = true; }
      thBtns.forEach((b, i) => {
        const s = b.querySelector('.ui-dtc__sort') || b;
        if (i === colIdx) s.setAttribute('data-dir', sortAsc ? 'asc' : 'desc');
        else s.removeAttribute('data-dir');
      });
      const rows = getDataRows();
      const parent = rows[0]?.parentElement;
      if (!parent) return;
      rows.sort((a, b) => {
        const ac = a.querySelectorAll('[role="gridcell"], td')[colIdx + 1]?.textContent?.trim() || '';
        const bc = b.querySelectorAll('[role="gridcell"], td')[colIdx + 1]?.textContent?.trim() || '';
        return sortAsc ? ac.localeCompare(bc) : bc.localeCompare(ac);
      });
      rows.forEach((r) => parent.appendChild(r));
    });
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const bulk = t?.closest<HTMLButtonElement>('[data-bulk]');
    if (bulk) {
      const act = bulk.getAttribute('data-bulk');
      if (act === 'delete') {
        pushUndo();
        getDataRows().forEach((r) => {
          if (r.querySelector('.ui-dtc__check')?.getAttribute('aria-checked') === 'true') r.remove();
        });
      } else {
        getDataRows().forEach((r) => {
          r.querySelector('.ui-dtc__check')?.setAttribute('aria-checked', 'false');
          r.removeAttribute('data-selected');
        });
      }
      syncSelection();
      return;
    }
    const chk = t?.closest<HTMLButtonElement>('.ui-dtc__check');
    if (chk && chk !== headCheck) {
      const next = chk.getAttribute('aria-checked') !== 'true';
      chk.setAttribute('aria-checked', String(next));
      const row = chk.closest<HTMLElement>('[role="row"]');
      if (next) row?.setAttribute('data-selected', 'true');
      else row?.removeAttribute('data-selected');
      syncSelection();
    }
  });

  scope.on(addBtn, 'click', () => {
    const rows = getDataRows();
    const template = rows[rows.length - 1];
    if (!template || !template.parentElement) return;
    pushUndo();
    const clone = template.cloneNode(true) as HTMLElement;
    const chk = clone.querySelector<HTMLButtonElement>('.ui-dtc__check');
    chk?.setAttribute('aria-checked', 'false');
    clone.removeAttribute('data-selected');
    const nameEl = clone.querySelector('.ui-dtc__name-text') || clone.querySelectorAll('[role="gridcell"], td')[1];
    if (nameEl) nameEl.textContent = `New tool ${rowSeq++}`;
    template.parentElement.appendChild(clone);
    if (morph) morph.style.height = 'auto';
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  });

  scope.on(toolBtns[0], 'click', () => {
    if (!tbody || !undoStack.length) return;
    tbody.innerHTML = undoStack.pop()!;
    if (toolBtns[0]) toolBtns[0].disabled = undoStack.length === 0;
    syncSelection();
  });

  return () => scope.dispose();
}

// 4. EXPERIMENT CARD
export function enhanceExperimentCard(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-xcc');
  if (!root) return () => {};

  const toggle = root.querySelector<HTMLButtonElement>('.ui-xcc__toggle');
  const cols = [...root.querySelectorAll<HTMLElement>('.ui-xcc__col')];
  const rows = [...root.querySelectorAll<HTMLButtonElement>('.ui-xcc__row')];
  const winnerTag = root.querySelector<HTMLElement>('.ui-xcc__win, .ui-xcc__lead');

  const METRICS = [
    {
      vals: ['4.2%', '4.7%', '4.0%'],
      deltas: ['Base', '+11.9%', '−4.8%'],
      sizes: [0.56, 1, 0.38],
      lead: 'B +11.9%',
    },
    {
      vals: ['$18.31', '$19.01', '$21.49'],
      deltas: ['Base', '+3.8%', '+17.4%'],
      sizes: [0.48, 0.62, 1],
      lead: 'C +17.4%',
    },
    {
      vals: ['41.2%', '36.8%', '38.4%'],
      deltas: ['Base', '−10.7%', '−6.8%'],
      sizes: [1, 0.44, 0.62],
      lead: 'B −10.7%',
    },
  ];

  const applyMetric = (idx: number) => {
    const m = METRICS[idx] || METRICS[0];
    rows.forEach((r, i) => {
      const nums = [...r.querySelectorAll<HTMLElement>('.ui-xcc__val, .ui-xcc__delta, span')].filter((s) => /[%$]|Base/.test(s.textContent || ''));
      if (nums[0]) nums[0].textContent = m.vals[i];
      if (nums[1]) nums[1].textContent = m.deltas[i];
    });
    cols.forEach((c, i) => c.style.setProperty('--ui-xcc-size', String(m.sizes[i])));
    if (winnerTag) winnerTag.textContent = m.lead;
  };

  scope.on(toggle, 'click', () => {
    const open = !root.hasAttribute('data-open');
    if (open) root.setAttribute('data-open', '');
    else root.removeAttribute('data-open');
    toggle?.setAttribute('aria-expanded', String(open));
  });

  wireRadioGroup(
    root.querySelector('.ui-xcc__metrics, [role="radiogroup"]'),
    '.ui-xcc__metric',
    (_btn, idx) => applyMetric(idx),
    scope
  );

  rows.forEach((row, i) => {
    const setHot = (idx: number | null) => {
      rows.forEach((r, j) => {
        if (idx === null) { r.removeAttribute('data-hot'); r.removeAttribute('data-dim'); }
        else if (j === idx) { r.setAttribute('data-hot', ''); r.removeAttribute('data-dim'); }
        else { r.removeAttribute('data-hot'); r.setAttribute('data-dim', ''); }
      });
      cols.forEach((c, j) => {
        if (idx === null) { c.removeAttribute('data-hot'); c.removeAttribute('data-dim'); }
        else if (j === idx) { c.setAttribute('data-hot', ''); c.removeAttribute('data-dim'); }
        else { c.removeAttribute('data-hot'); c.setAttribute('data-dim', ''); }
      });
    };
    scope.on(row, 'mouseenter', () => setHot(i));
    scope.on(row, 'mouseleave', () => setHot(null));
    scope.on(row, 'click', () => {
      rows.forEach((r, j) => r.setAttribute('aria-checked', String(j === i)));
      setHot(i);
    });
  });

  return () => scope.dispose();
}

// 5. KPI CHART
export function enhanceKpiChart(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-kpic');
  if (!root) return () => {};

  const plot = root.querySelector<HTMLElement>('.ui-kpic__plot');
  const marker = root.querySelector<HTMLElement>('.ui-kpic__marker');
  const tooltip = root.querySelector<HTMLElement>('.ui-kpic__tooltip');
  if (!plot) return () => {};

  const DAYS = [
    { d: 'Mon, Mar 3', v: ['$4.2k', '$3.6k', '$1.8k', '$1.2k', '$600'] },
    { d: 'Tue, Mar 4', v: ['$4.8k', '$3.9k', '$2.1k', '$1.4k', '$720'] },
    { d: 'Wed, Mar 5', v: ['$4.5k', '$3.4k', '$1.9k', '$1.3k', '$640'] },
    { d: 'Thu, Mar 6', v: ['$5.1k', '$4.2k', '$2.3k', '$1.5k', '$810'] },
    { d: 'Fri, Mar 7', v: ['$5.4k', '$4.4k', '$2.4k', '$1.6k', '$850'] },
    { d: 'Sat, Mar 8', v: ['$3.9k', '$3.1k', '$1.6k', '$1.1k', '$520'] },
    { d: 'Sun, Mar 9', v: ['$4.1k', '$3.3k', '$1.7k', '$1.1k', '$580'] },
  ];

  let activeIdx = 0;

  const showDay = (idx: number) => {
    activeIdx = Math.max(0, Math.min(DAYS.length - 1, idx));
    const pct = (activeIdx / (DAYS.length - 1)) * 100;
    if (marker) {
      marker.style.left = `${pct}%`;
      marker.setAttribute('data-open', 'true');
    }
    if (tooltip) {
      tooltip.style.left = `${pct}%`;
      tooltip.setAttribute('data-open', 'true');
      tooltip.setAttribute('data-side', pct > 55 ? 'left' : 'right');
      const head = tooltip.querySelector<HTMLElement>('.ui-kpic__tt-date, strong, p, div');
      if (head) head.textContent = DAYS[activeIdx].d;
      const vals = [...tooltip.querySelectorAll<HTMLElement>('.ui-kpic__tt-val, b, span:last-child')];
      DAYS[activeIdx].v.forEach((v, i) => { if (vals[i]) vals[i].textContent = v; });
    }
  };

  scope.on(plot, 'mousemove', (e) => {
    const me = e as MouseEvent;
    const r = plot.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (me.clientX - r.left) / Math.max(1, r.width)));
    showDay(Math.round(frac * (DAYS.length - 1)));
  });
  scope.on(plot, 'click', (e) => {
    const me = e as MouseEvent;
    const r = plot.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (me.clientX - r.left) / Math.max(1, r.width)));
    showDay(Math.round(frac * (DAYS.length - 1)));
  });
  scope.on(plot, 'mouseleave', () => {
    marker?.removeAttribute('data-open');
    tooltip?.removeAttribute('data-open');
  });
  scope.on(plot, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'ArrowRight') { ke.preventDefault(); showDay(activeIdx + 1); }
    else if (ke.key === 'ArrowLeft') { ke.preventDefault(); showDay(activeIdx - 1); }
  });

  return () => scope.dispose();
}

// 6. METERING CHART
export function enhanceMeteringChart(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-mtrc');
  if (!root) return () => {};

  const bars = [...root.querySelectorAll<HTMLElement>('.ui-mtrc__bar')];
  const tag = root.querySelector<HTMLElement>('.ui-mtrc__tag');
  const plot = root.querySelector<HTMLElement>('.ui-mtrc__plot');

  const focusBar = (idx: number | null) => {
    bars.forEach((b, i) => {
      if (idx === null) b.removeAttribute('data-dim');
      else if (i === idx) b.removeAttribute('data-dim');
      else b.setAttribute('data-dim', '');
    });
    if (tag) {
      if (idx === null) {
        tag.removeAttribute('data-open');
      } else {
        const pct = ((idx + 0.5) / Math.max(1, bars.length)) * 100;
        tag.style.left = `${pct}%`;
        tag.setAttribute('data-open', 'true');
        const num = tag.querySelector('b, strong');
        const dateEl = tag.querySelector('span');
        if (num) num.textContent = (1400 + ((idx * 373) % 1900)).toLocaleString();
        if (dateEl) dateEl.textContent = `Sep ${idx + 1}`;
      }
    }
  };

  bars.forEach((bar, i) => {
    scope.on(bar, 'mouseenter', () => focusBar(i));
    scope.on(bar, 'click', () => focusBar(i));
  });
  scope.on(plot, 'mouseleave', () => focusBar(null));
  scope.on(plot, 'click', () => focusBar(Math.floor(bars.length / 2)));

  return () => scope.dispose();
}

// 7. MODEL USAGE
export function enhanceModelUsage(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-muc');
  if (!root) return () => {};

  const tabsData = muTabs as Record<string, { body: string }>;
  const TIPS = [
    '<b>Anthropic</b><br/>Claude Opus 5.5 · 73%<br/>Claude Sonnet 5.5 · 25%<br/>Claude Haiku 5.5 · 2%',
    '<b>OpenAI</b><br/>GPT-5.5 · 64%<br/>GPT-5 mini · 36%',
    '<b>Google</b><br/>Gemini 3.8 Flash · 81%<br/>Gemini 3.8 Pro · 19%',
    '<b>xAI</b><br/>Grok 5 Fast · 100%',
  ];

  let activeColIdx: number | null = null;

  const setColHighlight = (idx: number | null) => {
    activeColIdx = idx;
    const cols = [...root.querySelectorAll<HTMLElement>('.ui-muc__col')];
    cols.forEach((c, i) => {
      if (idx === null) { c.removeAttribute('data-on'); c.removeAttribute('data-dim'); }
      else if (i === idx) { c.setAttribute('data-on', ''); c.removeAttribute('data-dim'); }
      else { c.removeAttribute('data-on'); c.setAttribute('data-dim', ''); }
    });
    const tip = root.querySelector<HTMLElement>('.ui-muc__tip');
    if (tip) {
      if (idx === null) tip.removeAttribute('data-open');
      else {
        tip.innerHTML = `<div style="font-size:11.5px;line-height:1.45">${TIPS[idx] || TIPS[0]}</div>`;
        tip.setAttribute('data-open', 'true');
      }
    }
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const tab = t?.closest<HTMLButtonElement>('.ui-muc__tab');
    if (tab) {
      const name = tab.textContent?.trim() || 'Tokens';
      if (tabsData[name]?.body) {
        root.innerHTML = tabsData[name].body;
        activeColIdx = null;
      }
      return;
    }
    const col = t?.closest<HTMLElement>('.ui-muc__col');
    if (col) {
      const cols = [...root.querySelectorAll<HTMLElement>('.ui-muc__col')];
      const idx = cols.indexOf(col);
      setColHighlight(activeColIdx === idx ? null : idx);
    }
  });

  scope.on(root, 'mouseover', (e) => {
    const col = (e.target as Element | null)?.closest<HTMLElement>('.ui-muc__col');
    if (col && activeColIdx === null) {
      const cols = [...root.querySelectorAll<HTMLElement>('.ui-muc__col')];
      setColHighlight(cols.indexOf(col));
      activeColIdx = null;
    }
  });

  return () => scope.dispose();
}

// 8. RATE LIMIT PLANNER
export function enhanceRateLimitPlanner(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-rlpc');
  if (!root) return () => {};

  const subEl = root.querySelector<HTMLElement>('.ui-rlpc__sub');
  const badge = root.querySelector<HTMLElement>('.ui-rlpc__badge');
  const spreadBtn = root.querySelector<HTMLButtonElement>('.ui-rlpc__btn');
  const addBtn = root.querySelector<HTMLButtonElement>('.ui-rlpc__add');

  let spreadToggle = false;
  let editor: HTMLElement | null = null;
  let runSeq = 1;

  const syncHeader = () => {
    const lanes = [...root.querySelectorAll<HTMLElement>('.ui-rlpc__lane')];
    const peak = spreadToggle ? 64 : Math.min(98, 42 + lanes.length * 9);
    if (subEl) subEl.textContent = `${lanes.length} runs · ${lanes.length * 10}M tokens · 120k / min`;
    if (badge) {
      badge.textContent = peak > 90 ? `Near limit · peak ${peak}%` : `Under limit · peak ${peak}%`;
      badge.setAttribute('data-state', peak > 90 ? 'close' : 'ok');
    }
  };

  scope.on(spreadBtn, 'click', () => {
    spreadToggle = !spreadToggle;
    const bars = [...root.querySelectorAll<HTMLElement>('.ui-rlpc__bar')];
    bars.forEach((b, i) => {
      const curLeft = parseFloat(b.style.left) || (10 + i * 14);
      b.style.left = `${spreadToggle ? Math.min(72, 6 + i * 21) : Math.max(6, curLeft - 6)}%`;
    });
    syncHeader();
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-ed-done]')) {
      editor?.remove();
      editor = null;
      root.querySelectorAll('.ui-rlpc__square[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
      return;
    }
    const bar = t?.closest<HTMLElement>('.ui-rlpc__bar');
    if (bar) {
      const cur = parseFloat(bar.style.left) || 18;
      bar.style.left = `${(cur + 6) % 72}%`;
      bar.setAttribute('data-on', '');
      syncHeader();
      return;
    }
    const sq = t?.closest<HTMLButtonElement>('.ui-rlpc__square');
    if (sq) {
      const lbl = sq.getAttribute('aria-label') || '';
      const lane = sq.closest<HTMLElement>('.ui-rlpc__lane');
      if (lbl.startsWith('Remove')) {
        lane?.remove();
        syncHeader();
      } else if (lbl.startsWith('Edit') && lane) {
        editor?.remove();
        sq.setAttribute('aria-expanded', 'true');
        const name = lbl.replace(/^Edit\s+/, '');
        editor = document.createElement('div');
        editor.className = 'ui-rlpc__editor';
        editor.setAttribute('role', 'dialog');
        editor.style.cssText = 'position:absolute;right:16px;top:64px;z-index:25;width:220px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 12px 28px -8px rgba(0,0,0,0.2);padding:10px 12px;font-size:12px;display:grid;gap:8px;';
        editor.innerHTML = `<b>Edit ${name}</b><label style="display:grid;gap:3px"><span>Peak (k / min)</span><input type="number" value="64" data-ed-peak style="padding:4px 6px;border:0.5px solid rgba(0,0,0,0.15);border-radius:6px" /></label><button type="button" data-ed-done style="padding:5px 10px;border-radius:6px;background:#111;color:#fff;font-weight:500">Done</button>`;
        root.style.position = 'relative';
        root.appendChild(editor);
        editor.querySelector<HTMLInputElement>('[data-ed-peak]')?.addEventListener('input', (ie) => {
          const v = (ie.target as HTMLInputElement).value;
          const b = lane.querySelector('.ui-rlpc__bar');
          if (b && v) b.textContent = `${v}k`;
        });
      }
    }
  });

  scope.on(addBtn, 'click', () => {
    const lanes = [...root.querySelectorAll<HTMLElement>('.ui-rlpc__lane')];
    const last = lanes[lanes.length - 1];
    if (!last || !last.parentElement) return;
    const clone = last.cloneNode(true) as HTMLElement;
    const nameEl = clone.querySelector('.ui-rlpc__name, strong, b');
    if (nameEl) nameEl.textContent = `Batch run ${runSeq++}`;
    const bar = clone.querySelector<HTMLElement>('.ui-rlpc__bar');
    if (bar) { bar.style.left = `${(24 + runSeq * 11) % 68}%`; bar.textContent = '48k'; }
    last.parentElement.appendChild(clone);
    syncHeader();
  });

  return () => scope.dispose();
}

// 9. STAT CARD
export function enhanceStatCard(host: HTMLElement): () => void {
  const scope = createScope();
  const states = scStates as Record<string, string>;
  const grid = host.querySelector<HTMLElement>('.stat-demo__grid, .stat-demo__cards');

  wireRadioGroup(
    host.querySelector('.stat-demo__seg, [role="radiogroup"]'),
    'button[role="radio"]',
    (btn) => {
      const rng = btn.textContent?.trim() || '7D';
      if (grid && states[rng]) grid.innerHTML = states[rng];
    },
    scope
  );

  let pickedIdx: number | null = null;
  scope.on(host, 'click', (e) => {
    const hit = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-statc__hit');
    if (!hit) return;
    const cards = [...host.querySelectorAll<HTMLElement>('.ui-statc')];
    const card = hit.closest<HTMLElement>('.ui-statc');
    const idx = card ? cards.indexOf(card) : -1;
    pickedIdx = pickedIdx === idx ? null : idx;
    cards.forEach((c, i) => {
      if (pickedIdx === null || i === pickedIdx) c.removeAttribute('data-dim');
      else c.setAttribute('data-dim', '');
    });
  });

  return () => scope.dispose();
}

// 10. TREND CHART
export function enhanceTrendChart(host: HTMLElement): () => void {
  const scope = createScope();
  const states = tcStates as Record<string, string>;
  const root = host.querySelector<HTMLElement>('.trd-demo') || host;

  let mode = 'Area';
  let rng = '7D';

  const apply = () => {
    const html = states[`${mode}_${rng}`];
    if (html) root.innerHTML = html;
  };

  scope.on(root, 'click', (e) => {
    const btn = (e.target as Element | null)?.closest<HTMLButtonElement>('button[role="radio"]');
    if (!btn) return;
    const txt = btn.textContent?.trim() || '';
    if (['Line', 'Area', 'Bar'].includes(txt)) { mode = txt; apply(); }
    else if (['7D', '30D'].includes(txt)) { rng = txt; apply(); }
  });

  scope.on(root, 'mousemove', (e) => {
    const me = e as MouseEvent;
    const plot = (me.target as Element | null)?.closest<HTMLElement>('.ui-trc__plot');
    if (!plot) return;
    const r = plot.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((me.clientX - r.left) / Math.max(1, r.width)) * 100));
    const marker = plot.querySelector<HTMLElement>('.ui-trc__marker');
    const tt = plot.querySelector<HTMLElement>('.ui-trc__tooltip, .ui-trc__tag');
    if (marker) { marker.style.left = `${pct}%`; marker.setAttribute('data-open', 'true'); }
    if (tt) {
      tt.style.left = `${pct}%`;
      tt.setAttribute('data-open', 'true');
      tt.setAttribute('data-side', pct > 55 ? 'left' : 'right');
    }
  });

  return () => scope.dispose();
}

// 11. CONFLICT RADAR
export function enhanceConflictRadar(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-crc');
  if (!root) return () => {};

  const mergeBtn = root.querySelector<HTMLButtonElement>('.ui-crc__merge');
  const rows = [...root.querySelectorAll<HTMLElement>('.ui-crc__row:not([data-head])')];

  const syncMerge = () => {
    const unresolved = rows.filter((r) => r.getAttribute('data-state') === 'conflict').length;
    if (mergeBtn) {
      if (unresolved === 0) {
        mergeBtn.disabled = false;
        mergeBtn.setAttribute('data-ready', 'true');
        mergeBtn.innerHTML = '<span>Merge all 3 branches</span>';
      } else {
        mergeBtn.disabled = true;
        mergeBtn.removeAttribute('data-ready');
        mergeBtn.innerHTML = `<span>${unresolved} conflict${unresolved === 1 ? '' : 's'} left</span>`;
      }
    }
  };

  rows.forEach((row) => {
    row.style.cursor = 'pointer';
    scope.on(row, 'click', () => {
      const pressed = row.getAttribute('aria-pressed') === 'true';
      rows.forEach((r) => r.setAttribute('aria-pressed', 'false'));
      if (!pressed) {
        row.setAttribute('aria-pressed', 'true');
        if (row.getAttribute('data-state') === 'conflict') {
          row.setAttribute('data-state', 'settled');
          row.querySelector('.ui-crc__dot')?.setAttribute('data-state', 'settled');
        }
      }
      syncMerge();
    });
  });

  scope.on(mergeBtn, 'click', () => {
    if (!mergeBtn || mergeBtn.disabled) return;
    mergeBtn.innerHTML = '<span>Merged ✓</span>';
    mergeBtn.disabled = true;
  });

  return () => scope.dispose();
}
