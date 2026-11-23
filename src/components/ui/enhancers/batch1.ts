import { createScope, wireRadioGroup, positionPill } from './utils';
import stepperSteps from './data/stepper-form-steps.json';
import ipDetails from './data/integration-picker-details.json';
import mrPresets from './data/model-router-presets.json';

// 1. AUTONOMY DIAL
export function enhanceAutonomyDial(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-adlc');
  if (!root) return () => {};

  const lists = [...root.querySelectorAll<HTMLUListElement>('.ui-adlc__list')];
  const ownList = lists[0];
  const askList = lists[1];
  const counts = [...root.querySelectorAll<HTMLElement>('.ui-adlc__roll')];
  const hint = root.querySelector<HTMLElement>('.ui-adlc__sr[id$="-hint"]');
  const live = root.querySelector<HTMLElement>('.ui-adlc__sr[aria-live]');

  // Capture all 6 rows in original order along with their risk level
  const allRows = [...root.querySelectorAll<HTMLLIElement>('.ui-adlc__row')].map((el, order) => {
    const riskEl = el.querySelector<HTMLElement>('.ui-adlc__risk');
    const risk = riskEl?.getAttribute('data-risk') || 'safe';
    const pin = el.querySelector<HTMLButtonElement>('.ui-adlc__pin');
    const label = el.querySelector<HTMLElement>('.ui-adlc__label')?.textContent?.trim() || '';
    return { el, order, risk, pin, label, pinned: pin?.getAttribute('aria-pressed') === 'true' };
  });

  const LEVEL_HINTS = [
    'Nothing happens without your OK',
    'Safe actions run, risky ones wait for you',
    'Everything runs, except what you locked',
  ];
  const LEVEL_NAMES = ['Always ask', 'If risky', 'Full auto'];

  let level = Number(root.getAttribute('data-level') || '1');

  const sync = (prevOwn?: number) => {
    if (!ownList || !askList) return;
    root.setAttribute('data-level', String(level));
    const own: typeof allRows = [];
    const ask: typeof allRows = [];
    for (const r of allRows) {
      const mustAsk =
        r.pinned ||
        level === 0 ||
        (level === 1 && (r.risk === 'risky' || r.risk === 'destructive'));
      if (mustAsk) {
        r.el.setAttribute('data-asks', '');
        ask.push(r);
      } else {
        r.el.removeAttribute('data-asks');
        own.push(r);
      }
      if (r.pin) {
        r.pin.setAttribute('aria-pressed', String(r.pinned));
        r.pin.setAttribute(
          'aria-label',
          r.pinned ? `${r.label}: always asks – unlock` : `Always ask before: ${r.label}`
        );
        r.pin.title = r.pinned
          ? 'Always asks – click to follow the dial again'
          : 'Always ask, whatever the dial says';
      }
    }
    own.sort((a, b) => a.order - b.order).forEach((r) => ownList.appendChild(r.el));
    ask.sort((a, b) => a.order - b.order).forEach((r) => askList.appendChild(r.el));

    const dir = prevOwn !== undefined && own.length !== prevOwn ? (own.length > prevOwn ? 'up' : 'down') : '';
    if (counts[0]) {
      counts[0].textContent = String(own.length);
      if (dir) counts[0].setAttribute('data-dir', dir);
    }
    if (counts[1]) {
      counts[1].textContent = String(ask.length);
      if (dir) counts[1].setAttribute('data-dir', dir === 'up' ? 'down' : 'up');
    }
    if (hint) hint.textContent = LEVEL_HINTS[level] || '';
    if (live) live.textContent = `${LEVEL_NAMES[level]}: ${own.length} on its own, ${ask.length} ask first`;
  };

  wireRadioGroup(
    root.querySelector('.ui-adlc__segmented'),
    '.ui-adlc__level',
    (btn) => {
      const prevOwn = ownList?.children.length ?? 2;
      level = Number(btn.getAttribute('data-level') || '1');
      sync(prevOwn);
    },
    scope
  );

  scope.on(root, 'click', (e) => {
    const pin = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-adlc__pin');
    if (!pin) return;
    const row = allRows.find((r) => r.pin === pin);
    if (!row) return;
    const prevOwn = ownList?.children.length ?? 2;
    row.pinned = !row.pinned;
    sync(prevOwn);
  });

  return () => scope.dispose();
}

// 2. COMBOBOX
export function enhanceCombobox(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-cbxc');
  if (!root) return () => {};

  const input = root.querySelector<HTMLInputElement>('.ui-cbxc__input');
  const field = root.querySelector<HTMLElement>('.ui-cbxc__field');
  const fieldInner = root.querySelector<HTMLElement>('.ui-cbxc__field-inner');
  const toggleBtn = root.querySelector<HTMLButtonElement>('.ui-cbxc__toggle');
  const pop = root.querySelector<HTMLElement>('.ui-cbxc__pop');
  const pill = root.querySelector<HTMLElement>('.ui-cbxc__pill');
  const countSpan = root.querySelector<HTMLElement>('.ui-cbxc__roll span');
  const live = root.querySelector<HTMLElement>('.ui-cbxc__live');
  const options = [...root.querySelectorAll<HTMLElement>('.ui-cbxc__option')];
  const groups = [...root.querySelectorAll<HTMLElement>('.ui-cbxc__group')];

  let open = root.getAttribute('data-open') === 'true';
  const selected = new Set<string>();
  let activeIdx = 0;

  const setOpen = (next: boolean) => {
    open = next;
    if (open) root.setAttribute('data-open', 'true');
    else root.removeAttribute('data-open');
    input?.setAttribute('aria-expanded', String(open));
    toggleBtn?.setAttribute('aria-label', open ? 'Close list' : 'Open list');
    if (pop) pop.style.display = open ? '' : 'none';
  };

  const visibleOptions = () => options.filter((o) => o.style.display !== 'none');

  const movePill = (opt: HTMLElement | null) => {
    if (!opt || !pill) return;
    positionPill(pill, opt, 'y');
    input?.setAttribute('aria-activedescendant', opt.id);
  };

  const renderChips = () => {
    if (!fieldInner || !input) return;
    fieldInner.querySelectorAll('.ui-cbxc__chip[data-user]').forEach((c) => c.remove());
    for (const id of selected) {
      const opt = options.find((o) => o.id === id);
      const name = opt?.querySelector('.ui-cbxc__name')?.textContent?.trim() || id;
      const chip = document.createElement('span');
      chip.className = 'ui-cbxc__chip';
      chip.setAttribute('data-user', id);
      chip.innerHTML = `<span class="ui-cbxc__chip-body">${name}</span><button type="button" class="ui-cbxc__chip-x" aria-label="Remove ${name}" tabindex="-1">×</button>`;
      fieldInner.insertBefore(chip, input);
    }
    if (field) field.style.height = selected.size > 0 ? 'auto' : '32px';
    if (countSpan) {
      countSpan.textContent = String(selected.size);
    }
    if (live) live.textContent = `${selected.size} selected`;
    input.placeholder = selected.size > 0 ? '' : 'Add reviewers…';
  };

  const toggleOption = (opt: HTMLElement) => {
    if (selected.has(opt.id)) {
      selected.delete(opt.id);
      opt.setAttribute('aria-selected', 'false');
    } else {
      selected.add(opt.id);
      opt.setAttribute('aria-selected', 'true');
    }
    renderChips();
  };

  const filterList = (q: string) => {
    const term = q.trim().toLowerCase();
    for (const o of options) {
      const txt = (o.textContent || '').toLowerCase();
      o.style.display = !term || txt.includes(term) ? '' : 'none';
    }
    for (const g of groups) {
      const anyVis = [...g.querySelectorAll<HTMLElement>('.ui-cbxc__option')].some((o) => o.style.display !== 'none');
      g.style.display = anyVis ? '' : 'none';
    }
    const vis = visibleOptions();
    if (vis.length) {
      activeIdx = 0;
      movePill(vis[0]);
    } else if (pill) {
      pill.style.opacity = '0';
    }
  };

  scope.on(toggleBtn, 'click', (e) => {
    e.stopPropagation();
    setOpen(!open);
  });

  scope.on(field, 'click', (e) => {
    const xBtn = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-cbxc__chip-x');
    if (xBtn) {
      e.stopPropagation();
      const chip = xBtn.closest<HTMLElement>('[data-user]');
      const id = chip?.getAttribute('data-user');
      if (id) {
        selected.delete(id);
        const opt = options.find((o) => o.id === id);
        opt?.setAttribute('aria-selected', 'false');
        renderChips();
      }
      return;
    }
    if (!open) setOpen(true);
    input?.focus();
  });

  scope.on(input, 'input', () => {
    if (!open) setOpen(true);
    filterList(input?.value || '');
  });

  scope.on(input, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    const vis = visibleOptions();
    if (ke.key === 'ArrowDown') {
      ke.preventDefault();
      if (!open) setOpen(true);
      if (vis.length) {
        activeIdx = (activeIdx + 1) % vis.length;
        movePill(vis[activeIdx]);
      }
    } else if (ke.key === 'ArrowUp') {
      ke.preventDefault();
      if (vis.length) {
        activeIdx = (activeIdx - 1 + vis.length) % vis.length;
        movePill(vis[activeIdx]);
      }
    } else if (ke.key === 'Enter') {
      ke.preventDefault();
      if (vis[activeIdx]) toggleOption(vis[activeIdx]);
    } else if (ke.key === 'Escape') {
      setOpen(false);
    } else if (ke.key === 'Backspace' && !input?.value && selected.size > 0) {
      const last = [...selected].pop()!;
      selected.delete(last);
      options.find((o) => o.id === last)?.setAttribute('aria-selected', 'false');
      renderChips();
    }
  });

  scope.on(root, 'mouseover', (e) => {
    const opt = (e.target as Element | null)?.closest<HTMLElement>('.ui-cbxc__option');
    if (!opt) return;
    const vis = visibleOptions();
    const idx = vis.indexOf(opt);
    if (idx >= 0) {
      activeIdx = idx;
      movePill(opt);
    }
  });

  scope.on(root, 'click', (e) => {
    const opt = (e.target as Element | null)?.closest<HTMLElement>('.ui-cbxc__option');
    if (!opt) return;
    toggleOption(opt);
    input?.focus();
  });

  scope.on(document, 'click', (e) => {
    if (open && !root.contains(e.target as Node)) setOpen(false);
  });

  return () => scope.dispose();
}

// 3. COMMAND MENU
export function enhanceCommandMenu(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-cmc');
  if (!root) return () => {};

  const input = root.querySelector<HTMLInputElement>('input[role="combobox"]');
  const pill = root.querySelector<HTMLElement>('.ui-cmc__pill');
  const tip = root.querySelector<HTMLElement>('.ui-cmc__tip');
  const items = [...root.querySelectorAll<HTMLButtonElement>('.ui-cmc__item')];
  const groups = [...root.querySelectorAll<HTMLElement>('.ui-cmc__group')];
  const origTip = tip?.innerHTML || '';

  const visibleItems = () => items.filter((it) => it.style.display !== 'none');
  let activeEl: HTMLButtonElement | null = items.find((i) => i.getAttribute('aria-selected') === 'true') || items[0] || null;

  const setActive = (el: HTMLButtonElement | null) => {
    items.forEach((it) => it.setAttribute('aria-selected', String(it === el)));
    activeEl = el;
    if (el) {
      input?.setAttribute('aria-activedescendant', el.id);
      positionPill(pill, el, 'y');
      pill?.setAttribute('data-lit', 'true');
      el.scrollIntoView({ block: 'nearest' });
    } else if (pill) {
      pill.style.opacity = '0';
    }
  };

  const runItem = (el: HTMLButtonElement) => {
    setActive(el);
    items.forEach((it) => it.removeAttribute('data-ran'));
    el.setAttribute('data-ran', 'true');
    const name = el.querySelector('.ui-cmc__name')?.textContent?.trim() || 'Command';
    if (tip) tip.innerHTML = `Ran <b>${name}</b>`;
    scope.later(() => {
      el.removeAttribute('data-ran');
      if (tip) tip.innerHTML = origTip;
    }, 1500);
  };

  scope.on(input, 'input', () => {
    const q = (input?.value || '').trim().toLowerCase();
    for (const it of items) {
      const txt = (it.textContent || '').toLowerCase();
      it.style.display = !q || txt.includes(q) ? '' : 'none';
    }
    for (const g of groups) {
      const any = [...g.querySelectorAll<HTMLElement>('.ui-cmc__item')].some((i) => i.style.display !== 'none');
      g.style.display = any ? '' : 'none';
    }
    const vis = visibleItems();
    setActive(vis[0] || null);
  });

  scope.on(root, 'mouseover', (e) => {
    const it = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-cmc__item');
    if (it && it !== activeEl) setActive(it);
  });

  scope.on(root, 'click', (e) => {
    const it = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-cmc__item');
    if (it) runItem(it);
  });

  scope.on(root, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    const vis = visibleItems();
    if (!vis.length) return;
    const idx = activeEl ? vis.indexOf(activeEl) : 0;
    if (ke.key === 'ArrowDown') {
      ke.preventDefault();
      setActive(vis[(idx + 1) % vis.length]);
    } else if (ke.key === 'ArrowUp') {
      ke.preventDefault();
      setActive(vis[(idx - 1 + vis.length) % vis.length]);
    } else if (ke.key === 'Tab') {
      ke.preventDefault();
      const visGroups = groups.filter((g) => g.style.display !== 'none');
      const curGroup = activeEl?.closest<HTMLElement>('.ui-cmc__group');
      const gIdx = curGroup ? visGroups.indexOf(curGroup) : 0;
      const nextGroup = visGroups[(gIdx + (ke.shiftKey ? visGroups.length - 1 : 1)) % visGroups.length];
      const firstInGroup = nextGroup?.querySelector<HTMLButtonElement>('.ui-cmc__item:not([style*="display: none"])');
      if (firstInGroup) setActive(firstInGroup);
    } else if (ke.key === 'Enter' && activeEl) {
      ke.preventDefault();
      runItem(activeEl);
    }
  });

  return () => scope.dispose();
}

// 4. DATE RANGE PICKER
export function enhanceDateRangePicker(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-drpc');
  if (!root) return () => {};

  const trigger = root.querySelector<HTMLButtonElement>('.ui-drpc__trigger');
  const triggerRange = root.querySelector<HTMLElement>('.ui-drpc__trigger-range');
  const panel = root.querySelector<HTMLElement>('.ui-drpc__panel');
  const summaryRange = root.querySelector<HTMLElement>('.ui-drpc__summary-range span:first-child');
  const countBadge = root.querySelector<HTMLElement>('.ui-drpc__count');
  const presets = [...root.querySelectorAll<HTMLButtonElement>('.ui-drpc__preset')];
  const monthEls = [...root.querySelectorAll<HTMLElement>('.ui-drpc__month')];
  const navBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-drpc__icon-btn')];
  const footBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-drpc__btn')];

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const TODAY = new Date(2026, 10, 22); // Nov 22, 2026 (matches live demo)

  let open = root.getAttribute('data-open') === 'true';
  let viewYear = 2026;
  let viewMonth = 9; // October 2026 (left pane); right pane is November 2026
  let start = new Date(2026, 9, 24);
  let end: Date | null = new Date(2026, 10, 22);
  let committedStart = new Date(start);
  let committedEnd = new Date(end);
  let hoverDate: Date | null = null;
  let compareMode = 0; // 0 Off, 1 Prev period, 2 Prev year

  const sameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const fmt = (a: Date, b: Date) => {
    if (sameDay(a, b)) return `${SHORT[a.getMonth()]} ${a.getDate()}, ${a.getFullYear()}`;
    if (a.getFullYear() === b.getFullYear()) return `${SHORT[a.getMonth()]} ${a.getDate()} – ${SHORT[b.getMonth()]} ${b.getDate()}, ${b.getFullYear()}`;
    return `${SHORT[a.getMonth()]} ${a.getDate()}, ${a.getFullYear()} – ${SHORT[b.getMonth()]} ${b.getDate()}, ${b.getFullYear()}`;
  };
  const daysBetween = (a: Date, b: Date) => Math.round(Math.abs(b.getTime() - a.getTime()) / 86400000) + 1;

  const setOpen = (next: boolean) => {
    open = next;
    if (open) root.setAttribute('data-open', 'true');
    else root.removeAttribute('data-open');
    trigger?.setAttribute('aria-expanded', String(open));
    if (panel) panel.style.display = open ? '' : 'none';
  };

  const renderCalendar = () => {
    const effEnd = end || hoverDate || start;
    const lo = start <= effEnd ? start : effEnd;
    const hi = start <= effEnd ? effEnd : start;
    const span = daysBetween(lo, hi);

    let compLo: Date | null = null;
    let compHi: Date | null = null;
    if (compareMode === 1) {
      compHi = new Date(lo.getFullYear(), lo.getMonth(), lo.getDate() - 1);
      compLo = new Date(compHi.getFullYear(), compHi.getMonth(), compHi.getDate() - (span - 1));
    } else if (compareMode === 2) {
      compLo = new Date(lo.getFullYear() - 1, lo.getMonth(), lo.getDate());
      compHi = new Date(hi.getFullYear() - 1, hi.getMonth(), hi.getDate());
    }

    if (summaryRange) summaryRange.textContent = fmt(lo, hi);
    if (countBadge) countBadge.textContent = span === 1 ? '1 day' : `${span} days`;

    monthEls.forEach((mEl, paneIdx) => {
      const mDate = new Date(viewYear, viewMonth + paneIdx, 1);
      const y = mDate.getFullYear();
      const m = mDate.getMonth();
      const titleEl = mEl.querySelector('.ui-drpc__month-title');
      if (titleEl) titleEl.textContent = `${MONTHS[m]} ${y}`;
      const grid = mEl.querySelector('.ui-drpc__grid');
      if (!grid) return;

      const firstDow = (new Date(y, m, 1).getDay() + 6) % 7; // Monday = 0
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      const totalCells = Math.ceil((firstDow + daysInMonth) / 7) * 7;

      let html = '';
      for (let i = 0; i < totalCells; i++) {
        if (i % 7 === 0) html += '<div class="ui-drpc__week" role="row">';
        const dayNum = i - firstDow + 1;
        if (dayNum < 1 || dayNum > daysInMonth) {
          html += '<span class="ui-drpc__day ui-drpc__day-empty" role="gridcell"></span>';
        } else {
          const d = new Date(y, m, dayNum);
          const inRange = d >= lo && d <= hi;
          const isStart = sameDay(d, lo);
          const isEnd = sameDay(d, hi);
          const isToday = sameDay(d, TODAY);
          const inComp = !!compLo && !!compHi && d >= compLo && d <= compHi;
          const attrs = [
            `data-date="${y}-${m}-${dayNum}"`,
            inRange ? (end ? 'data-range=""' : 'data-preview=""') : '',
            isStart ? 'data-start=""' : '',
            isEnd ? 'data-end=""' : '',
            isToday ? 'data-today=""' : '',
            i % 7 === 0 ? 'data-row-start=""' : '',
            i % 7 === 6 ? 'data-row-end=""' : '',
            inComp ? 'data-compare=""' : '',
            sameDay(d, compLo) ? 'data-compare-start=""' : '',
            sameDay(d, compHi) ? 'data-compare-end=""' : '',
          ].filter(Boolean).join(' ');
          html += `<span class="ui-drpc__day" role="gridcell" ${attrs}><button type="button">${dayNum}</button></span>`;
        }
        if (i % 7 === 6) html += '</div>';
      }
      grid.innerHTML = html;
    });
  };

  const applyPreset = (label: string, btn: HTMLButtonElement) => {
    presets.forEach((p) => p.setAttribute('aria-selected', String(p === btn)));
    const y = TODAY.getFullYear(), m = TODAY.getMonth(), d = TODAY.getDate();
    if (label === 'Today') { start = new Date(y, m, d); end = new Date(y, m, d); }
    else if (label === 'Yesterday') { start = new Date(y, m, d - 1); end = new Date(y, m, d - 1); }
    else if (label === 'Last 7 days') { start = new Date(y, m, d - 6); end = new Date(y, m, d); }
    else if (label === 'Last 30 days') { start = new Date(y, m, d - 29); end = new Date(y, m, d); }
    else if (label === 'Last 90 days') { start = new Date(y, m, d - 89); end = new Date(y, m, d); }
    else if (label === 'This month') { start = new Date(y, m, 1); end = new Date(y, m, d); }
    else if (label === 'Last month') { start = new Date(y, m - 1, 1); end = new Date(y, m, 0); }
    else if (label === 'This quarter') { const qm = Math.floor(m / 3) * 3; start = new Date(y, qm, 1); end = new Date(y, m, d); }
    else if (label === 'Year to date') { start = new Date(y, 0, 1); end = new Date(y, m, d); }
    const focusDate = end || start;
    viewYear = focusDate.getFullYear();
    viewMonth = focusDate.getMonth() - 1;
    renderCalendar();
  };

  scope.on(trigger, 'click', () => setOpen(!open));

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const preset = t?.closest<HTMLButtonElement>('.ui-drpc__preset');
    if (preset) {
      applyPreset(preset.textContent?.trim() || '', preset);
      return;
    }
    const dayCell = t?.closest<HTMLElement>('.ui-drpc__day[data-date]');
    if (dayCell) {
      const [yy, mm, dd] = (dayCell.getAttribute('data-date') || '').split('-').map(Number);
      const clicked = new Date(yy, mm, dd);
      if (end) {
        start = clicked;
        end = null;
      } else {
        if (clicked < start) { end = start; start = clicked; }
        else { end = clicked; }
      }
      presets.forEach((p) => p.setAttribute('aria-selected', 'false'));
      renderCalendar();
      return;
    }
  });

  // Add data-date to initial day cells lazily on first click if not yet re-rendered
  scope.on(root, 'click', (e) => {
    const btn = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-drpc__day:not([data-date]) button');
    if (!btn) return;
    const dayNum = Number(btn.textContent?.trim());
    const pane = btn.closest<HTMLElement>('.ui-drpc__month');
    const paneIdx = pane ? monthEls.indexOf(pane) : 0;
    const d = new Date(viewYear, viewMonth + Math.max(0, paneIdx), dayNum);
    if (end) { start = d; end = null; }
    else if (d < start) { end = start; start = d; }
    else { end = d; }
    presets.forEach((p) => p.setAttribute('aria-selected', 'false'));
    renderCalendar();
  });

  scope.on(root, 'mouseover', (e) => {
    if (end) return;
    const dayCell = (e.target as Element | null)?.closest<HTMLElement>('.ui-drpc__day[data-date]');
    if (!dayCell) return;
    const [yy, mm, dd] = (dayCell.getAttribute('data-date') || '').split('-').map(Number);
    hoverDate = new Date(yy, mm, dd);
    renderCalendar();
  });

  scope.on(navBtns[0], 'click', () => { viewMonth--; renderCalendar(); });
  scope.on(navBtns[1], 'click', () => { viewMonth++; renderCalendar(); });

  wireRadioGroup(
    root.querySelector('.ui-drpc__segments'),
    '.ui-drpc__segment',
    (_btn, idx) => {
      compareMode = idx;
      renderCalendar();
    },
    scope
  );

  // Cancel / Apply
  scope.on(footBtns[0], 'click', () => {
    start = new Date(committedStart);
    end = new Date(committedEnd);
    renderCalendar();
    setOpen(false);
  });
  scope.on(footBtns[1], 'click', () => {
    if (!end) end = new Date(start);
    committedStart = new Date(start);
    committedEnd = new Date(end);
    if (triggerRange) triggerRange.textContent = fmt(committedStart, committedEnd);
    setOpen(false);
  });

  return () => scope.dispose();
}

// 5. DROPZONE
export function enhanceDropzone(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-dzc');
  if (!root) return () => {};

  const body = root.querySelector<HTMLElement>('.ui-dzc__body');
  const area = root.querySelector<HTMLButtonElement>('.ui-dzc__area');
  const titleEl = root.querySelector<HTMLElement>('.ui-dzc__title');
  const list = root.querySelector<HTMLUListElement>('.ui-dzc__list');
  const foot = root.querySelector<HTMLElement>('.ui-dzc__foot');
  const fileInput = root.querySelector<HTMLInputElement>('.ui-dzc__input');
  const live = root.querySelector<HTMLElement>('.ui-dzc__live');

  interface UploadItem {
    id: number;
    name: string;
    ext: string;
    sizeMb: number;
    pct: number;
    status: 'uploading' | 'done' | 'error';
    error?: string;
  }

  let nextId = 1;
  let items: UploadItem[] = [];

  const render = () => {
    if (!list || !foot) return;
    if (items.length === 0) {
      list.innerHTML = '';
      foot.innerHTML = '<span class="ui-dzc__foot-idle">No files yet</span>';
      if (body) body.style.height = '154px';
      return;
    }
    list.innerHTML = items
      .map((it) => {
        const uploaded = ((it.sizeMb * it.pct) / 100).toFixed(1);
        const sub =
          it.status === 'error'
            ? it.error || 'Too large – max 25 MB'
            : it.status === 'done'
            ? `${it.sizeMb.toFixed(1)} MB · Uploaded`
            : `${uploaded} of ${it.sizeMb.toFixed(1)} MB · ${Math.max(1, Math.ceil((100 - it.pct) / 25))}s left`;
        return `<li class="ui-dzc__row" data-id="${it.id}" data-status="${it.status}"><div class="ui-dzc__row-inner"><span class="ui-dzc__badge">${it.ext}</span><div class="ui-dzc__meta"><span class="ui-dzc__name" title="${it.name}">${it.name}</span><span class="ui-dzc__sub">${sub}</span><div class="ui-dzc__bar"${it.status !== 'uploading' ? ' data-hidden="true"' : ''}><span style="width:${it.pct}%"></span></div></div><button type="button" class="ui-dzc__remove" data-remove="${it.id}" aria-label="Remove ${it.name}">×</button></div></li>`;
      })
      .join('');
    const doneCount = items.filter((i) => i.status === 'done').length;
    const errCount = items.filter((i) => i.status === 'error').length;
    foot.innerHTML = `<span class="ui-dzc__foot-idle">${doneCount} of ${items.length} uploaded${errCount ? ` · ${errCount} failed` : ''}</span>`;
    if (body) body.style.height = 'auto';
  };

  const startDemoBatch = (customFiles?: FileList | null) => {
    area?.removeAttribute('data-dragging');
    if (titleEl) titleEl.textContent = 'Drop files here or browse';
    const batch: UploadItem[] = customFiles && customFiles.length
      ? [...customFiles].map((f) => {
          const mb = +(f.size / (1024 * 1024)).toFixed(1) || 1.2;
          const ext = (f.name.split('.').pop() || 'FILE').toUpperCase().slice(0, 4);
          const tooBig = mb > 25;
          return { id: nextId++, name: f.name, ext, sizeMb: mb, pct: tooBig ? 0 : 8, status: tooBig ? 'error' : 'uploading', error: tooBig ? 'Too large – max 25 MB' : undefined };
        })
      : [
          { id: nextId++, name: 'Q3-Board-Report.pdf', ext: 'PDF', sizeMb: 4.2, pct: 8, status: 'uploading' },
          { id: nextId++, name: 'Hero-Shot.png', ext: 'PNG', sizeMb: 2.8, pct: 12, status: 'uploading' },
          { id: nextId++, name: 'Budget-2027.xlsx', ext: 'XLSX', sizeMb: 1.3, pct: 15, status: 'uploading' },
          { id: nextId++, name: 'Product-Demo.mp4', ext: 'MP4', sizeMb: 31.4, pct: 0, status: 'error', error: 'Too large – max 25 MB' },
        ];
    items = [...items, ...batch];
    render();
    if (live) live.textContent = `Uploading ${batch.length} files`;
  };

  scope.every(() => {
    let changed = false;
    for (const it of items) {
      if (it.status === 'uploading') {
        it.pct = Math.min(100, it.pct + 18);
        if (it.pct >= 100) it.status = 'done';
        changed = true;
      }
    }
    if (changed) render();
  }, 320);

  scope.on(area, 'click', () => startDemoBatch());
  scope.on(fileInput, 'change', () => {
    if (fileInput?.files?.length) startDemoBatch(fileInput.files);
  });
  scope.on(area, 'dragover', (e) => {
    e.preventDefault();
    area?.setAttribute('data-dragging', 'true');
  });
  scope.on(area, 'dragleave', () => area?.removeAttribute('data-dragging'));
  scope.on(area, 'drop', (e) => {
    e.preventDefault();
    const de = e as DragEvent;
    startDemoBatch(de.dataTransfer?.files);
  });
  scope.on(list, 'click', (e) => {
    const btn = (e.target as Element | null)?.closest<HTMLButtonElement>('[data-remove]');
    if (!btn) return;
    const id = Number(btn.getAttribute('data-remove'));
    items = items.filter((i) => i.id !== id);
    render();
  });

  return () => scope.dispose();
}

// 6. INTEGRATION PICKER
export function enhanceIntegrationPicker(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-ipc');
  if (!root) return () => {};

  const input = root.querySelector<HTMLInputElement>('input[role="combobox"]');
  const pill = root.querySelector<HTMLElement>('.ui-ipc__pill');
  const detail = root.querySelector<HTMLElement>('.ui-ipc__detail');
  const countEl = root.querySelector<HTMLElement>('.ui-ipc__count');
  const items = [...root.querySelectorAll<HTMLButtonElement>('.ui-ipc__item')];
  const groups = [...root.querySelectorAll<HTMLElement>('.ui-ipc__group')];
  const connectedGroup = groups[0];
  const availableGroup = groups[1];

  const detailsMap = ipDetails as Record<string, string>;
  const connected = new Set<string>(
    [...(connectedGroup?.querySelectorAll<HTMLElement>('.ui-ipc__item') || [])].map((i) => i.getAttribute('data-id') || '')
  );
  let activeId = items.find((i) => i.getAttribute('aria-selected') === 'true')?.getAttribute('data-id') || 'linear';

  const updateCount = () => {
    if (countEl) countEl.innerHTML = `<i aria-hidden="true"></i>${connected.size} of ${items.length} connected`;
  };

  const syncDetailSwitch = () => {
    if (!detail) return;
    const isConn = connected.has(activeId);
    const sw = detail.querySelector<HTMLButtonElement>('.ui-ipc__switch');
    const st = detail.querySelector<HTMLElement>('.ui-ipc__state');
    sw?.setAttribute('aria-checked', String(isConn));
    if (st) st.textContent = isConn ? 'Connected' : 'Not connected';
    if (isConn) root.setAttribute('data-on', 'true');
    else root.removeAttribute('data-on');
  };

  const selectItem = (btn: HTMLButtonElement) => {
    const id = btn.getAttribute('data-id') || '';
    activeId = id;
    items.forEach((it) => it.setAttribute('aria-selected', String(it === btn)));
    input?.setAttribute('aria-activedescendant', btn.id);
    positionPill(pill, btn, 'y');
    if (detail && detailsMap[id]) {
      detail.innerHTML = detailsMap[id];
    }
    syncDetailSwitch();
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const item = t?.closest<HTMLButtonElement>('.ui-ipc__item');
    if (item) {
      selectItem(item);
      return;
    }
    const sw = t?.closest<HTMLButtonElement>('.ui-ipc__switch');
    if (sw) {
      const btn = items.find((i) => i.getAttribute('data-id') === activeId);
      if (connected.has(activeId)) {
        connected.delete(activeId);
        if (btn && availableGroup) availableGroup.appendChild(btn);
      } else {
        connected.add(activeId);
        if (btn && connectedGroup) connectedGroup.appendChild(btn);
      }
      syncDetailSwitch();
      updateCount();
      if (btn) positionPill(pill, btn, 'y');
      return;
    }
    const explore = t?.closest<HTMLButtonElement>('.ui-ipc__explore');
    if (explore) {
      const orig = explore.textContent;
      explore.textContent = 'Opened docs ✓';
      scope.later(() => { if (orig) explore.textContent = orig; }, 1200);
    }
  });

  scope.on(input, 'input', () => {
    const q = (input?.value || '').trim().toLowerCase();
    for (const it of items) {
      const txt = (it.textContent || '').toLowerCase();
      it.style.display = !q || txt.includes(q) ? '' : 'none';
    }
    for (const g of groups) {
      const any = [...g.querySelectorAll<HTMLElement>('.ui-ipc__item')].some((i) => i.style.display !== 'none');
      g.style.display = any ? '' : 'none';
    }
    const first = items.find((i) => i.style.display !== 'none');
    if (first) selectItem(first);
  });

  scope.on(input, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    const vis = items.filter((i) => i.style.display !== 'none');
    const idx = vis.findIndex((i) => i.getAttribute('data-id') === activeId);
    if (ke.key === 'ArrowDown' && vis.length) {
      ke.preventDefault();
      selectItem(vis[(idx + 1) % vis.length]);
    } else if (ke.key === 'ArrowUp' && vis.length) {
      ke.preventDefault();
      selectItem(vis[(idx - 1 + vis.length) % vis.length]);
    }
  });

  return () => scope.dispose();
}

// 7. INTEGRATION SETTINGS
export function enhanceIntegrationSettings(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-isc');
  if (!root) return () => {};

  const syncSw = root.querySelector<HTMLButtonElement>('.ui-isc__switch');
  const metaEl = root.querySelector<HTMLElement>('.ui-isc__meta');
  const fold = root.querySelector<HTMLElement>('.ui-isc__fold');
  const genBtn = root.querySelector<HTMLButtonElement>('.ui-isc__generate');
  const urlInput = root.querySelector<HTMLInputElement>('input');
  const urlField = urlInput?.closest<HTMLElement>('.ui-isc__field');
  const urlHint = root.querySelector<HTMLElement>('.ui-isc__hint');
  const zoneWrap = root.querySelector<HTMLElement>('.ui-isc__zone');
  const zoneBtn = root.querySelector<HTMLButtonElement>('.ui-isc__zone-btn');
  const zoneVal = root.querySelector<HTMLElement>('.ui-isc__zone-value');
  const saveBar = root.querySelector<HTMLElement>('.ui-isc__save');
  const saveBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-isc__btn')];

  const origMeta = metaEl?.textContent || 'Connected on March 4, 2026 at 09:12';
  const origHint = urlHint?.textContent || '';
  let savedDomain = urlInput?.value || 'lumen-studio.com';
  let savedZone = zoneVal?.textContent?.trim() || '(GMT +01:00) Berlin';
  let curZone = savedZone;
  let generatedKey = '';
  let menuEl: HTMLElement | null = null;

  const ZONES = [
    '(GMT −08:00) Los Angeles',
    '(GMT −05:00) New York',
    '(GMT −03:00) São Paulo',
    '(GMT +00:00) London',
    '(GMT +01:00) Berlin',
    '(GMT +01:00) Amsterdam',
    '(GMT +01:00) Warsaw',
    '(GMT +02:00) Athens',
    '(GMT +04:00) Dubai',
    '(GMT +05:30) Mumbai',
    '(GMT +08:00) Singapore',
    '(GMT +09:00) Tokyo',
  ];

  const setDirty = (dirty: boolean) => {
    if (!saveBar) return;
    if (dirty) {
      saveBar.setAttribute('data-open', 'true');
      saveBar.removeAttribute('inert');
    } else {
      saveBar.removeAttribute('data-open');
      saveBar.setAttribute('inert', '');
    }
  };

  const checkDirty = () => {
    const val = (urlInput?.value || '').trim();
    const valid = /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(val);
    if (urlField) {
      if (!valid) urlField.setAttribute('data-invalid', 'true');
      else urlField.removeAttribute('data-invalid');
    }
    urlInput?.setAttribute('aria-invalid', String(!valid));
    if (urlHint) {
      if (!valid) {
        urlHint.setAttribute('data-error', 'true');
        urlHint.textContent = 'Enter a valid domain like yourstore.com';
      } else {
        urlHint.removeAttribute('data-error');
        urlHint.textContent = origHint;
      }
    }
    setDirty(val !== savedDomain || curZone !== savedZone || !!generatedKey);
  };

  scope.on(syncSw, 'click', () => {
    const next = syncSw?.getAttribute('aria-checked') !== 'true';
    syncSw?.setAttribute('aria-checked', String(next));
    if (fold) {
      if (next) fold.setAttribute('data-open', 'true');
      else fold.removeAttribute('data-open');
    }
    if (metaEl) metaEl.textContent = next ? origMeta : 'Paused – no data synced';
  });

  const makeKey = () =>
    'sk_live_' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

  scope.on(genBtn, 'click', () => {
    if (!genBtn) return;
    const span = genBtn.querySelector('span');
    if (span) span.textContent = 'Generating…';
    genBtn.disabled = true;
    scope.later(() => {
      generatedKey = makeKey();
      genBtn.disabled = false;
      if (span) span.textContent = 'Regenerate API key';
      const sec = genBtn.closest('.ui-isc__section');
      sec?.querySelector('.ui-isc__key')?.remove();
      const box = document.createElement('div');
      box.className = 'ui-isc__key';
      box.setAttribute('data-new', 'true');
      box.innerHTML = `<code style="font-size:11px;flex:1;overflow:hidden;text-overflow:ellipsis">${generatedKey}</code><button type="button" class="ui-isc__btn" data-copy-key style="height:24px;padding:0 8px;font-size:11px">Copy</button>`;
      sec?.appendChild(box);
      checkDirty();
    }, 350);
  });

  scope.on(root, 'click', (e) => {
    const cp = (e.target as Element | null)?.closest<HTMLButtonElement>('[data-copy-key]');
    if (cp) {
      navigator.clipboard?.writeText(generatedKey).catch(() => {});
      cp.textContent = 'Copied';
      scope.later(() => { cp.textContent = 'Copy'; }, 1200);
    }
  });

  scope.on(urlInput, 'input', checkDirty);

  const closeMenu = () => {
    menuEl?.remove();
    menuEl = null;
    zoneBtn?.setAttribute('aria-expanded', 'false');
  };

  scope.on(zoneBtn, 'click', (e) => {
    e.stopPropagation();
    if (menuEl) { closeMenu(); return; }
    zoneBtn?.setAttribute('aria-expanded', 'true');
    menuEl = document.createElement('div');
    menuEl.className = 'ui-isc__menu-list';
    menuEl.setAttribute('role', 'listbox');
    menuEl.style.cssText = 'position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:20;max-height:190px;overflow:auto;background:#fff;border-radius:8px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 8px 24px -8px rgba(0,0,0,0.16);padding:4px;';
    menuEl.innerHTML = ZONES.map(
      (z) => `<button type="button" role="option" class="ui-isc__option" aria-selected="${z === curZone}" style="display:block;width:100%;text-align:left;padding:6px 8px;border-radius:6px;font-size:12px;background:${z === curZone ? 'rgba(0,0,0,0.05)' : 'transparent'}">${z}</button>`
    ).join('');
    if (zoneWrap) {
      zoneWrap.style.position = 'relative';
      zoneWrap.appendChild(menuEl);
    }
    scope.on(menuEl, 'click', (me) => {
      const opt = (me.target as Element | null)?.closest<HTMLButtonElement>('.ui-isc__option');
      if (!opt) return;
      curZone = opt.textContent?.trim() || curZone;
      if (zoneVal) { zoneVal.textContent = curZone; zoneVal.title = curZone; }
      closeMenu();
      checkDirty();
    });
  });

  scope.on(document, 'click', (e) => {
    if (menuEl && !zoneWrap?.contains(e.target as Node)) closeMenu();
  });

  // Discard
  scope.on(saveBtns[0], 'click', () => {
    if (urlInput) urlInput.value = savedDomain;
    curZone = savedZone;
    if (zoneVal) zoneVal.textContent = savedZone;
    generatedKey = '';
    root.querySelector('.ui-isc__key')?.remove();
    const span = genBtn?.querySelector('span');
    if (span) span.textContent = 'Generate a new API key';
    checkDirty();
  });

  // Save
  scope.on(saveBtns[1], 'click', () => {
    if (urlInput) savedDomain = urlInput.value.trim();
    savedZone = curZone;
    generatedKey = '';
    setDirty(false);
    if (metaEl) {
      metaEl.textContent = 'Saved just now';
      scope.later(() => { if (syncSw?.getAttribute('aria-checked') === 'true') metaEl.textContent = origMeta; }, 2000);
    }
  });

  return () => scope.dispose();
}

// 8. MODEL PICKER
export function enhanceModelPicker(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-mdpc');
  if (!root) return () => {};

  const trigger = root.querySelector<HTMLButtonElement>('.ui-mdpc__trigger');
  const trigGlyph = trigger?.querySelector<HTMLElement>('.ui-mdpc__glyph');
  const trigName = trigger?.querySelector<HTMLElement>('.ui-mdpc__swap-item');
  const trigFlag = trigger?.querySelector<HTMLElement>('.ui-mdpc__flag');
  const pop = root.querySelector<HTMLElement>('.ui-mdpc__pop');
  const options = [...root.querySelectorAll<HTMLElement>('.ui-mdpc__option')];
  const toggles = [...root.querySelectorAll<HTMLButtonElement>('.ui-mdpc__toggle')];
  const effortFold = root.querySelector<HTMLElement>('.ui-mdpc__fold');
  const caption = root.querySelector<HTMLElement>('.ui-mdpc__foot .ui-mdpc__swap-item');
  const sr = root.querySelector<HTMLElement>('.ui-mdpc__sr');

  const META = [
    { glyph: 'O', name: 'Opus 5.5', cap: '<span>~<b>2.1s</b> first token</span><span class="ui-mdpc__dot"> · </span><span><b>$25</b> / M tokens</span>' },
    { glyph: 'S', name: 'Sonnet 5.5', cap: '<span>~<b>0.9s</b> first token</span><span class="ui-mdpc__dot"> · </span><span><b>$15</b> / M tokens</span>' },
    { glyph: 'H', name: 'Haiku 5.5', cap: '<span>~<b>0.4s</b> first token</span><span class="ui-mdpc__dot"> · </span><span><b>$4</b> / M tokens</span>' },
    { glyph: 'A', name: 'Auto', cap: '<span>Picks the best model per message</span>' },
  ];

  let open = root.hasAttribute('data-open');

  const setOpen = (next: boolean) => {
    open = next;
    if (open) root.setAttribute('data-open', '');
    else root.removeAttribute('data-open');
    trigger?.setAttribute('aria-expanded', String(open));
    if (pop) pop.style.display = open ? '' : 'none';
  };

  scope.on(trigger, 'click', (e) => {
    e.stopPropagation();
    setOpen(!open);
  });

  const selectOption = (idx: number) => {
    options.forEach((o, i) => {
      o.setAttribute('aria-selected', String(i === idx));
      if (i === idx) { o.setAttribute('data-active', ''); o.setAttribute('data-lit', ''); }
      else { o.removeAttribute('data-active'); o.removeAttribute('data-lit'); }
    });
    const m = META[idx] || META[1];
    if (trigGlyph) trigGlyph.textContent = m.glyph;
    if (trigName) trigName.textContent = m.name;
    trigger?.setAttribute('aria-label', `Model: ${m.name}`);
    if (caption) caption.innerHTML = m.cap;
    if (sr) sr.textContent = `Selected ${m.name}`;
  };

  options.forEach((opt, i) => {
    scope.on(opt, 'click', () => selectOption(i));
    scope.on(opt, 'mouseenter', () => {
      options.forEach((o, j) => {
        if (j === i) o.setAttribute('data-lit', '');
        else o.removeAttribute('data-lit');
      });
    });
  });

  // Toggle 0: Extended thinking; Toggle 1: Web search
  toggles.forEach((btn, i) => {
    scope.on(btn, 'click', () => {
      const next = btn.getAttribute('aria-checked') !== 'true';
      btn.setAttribute('aria-checked', String(next));
      if (i === 0 && effortFold) {
        if (next) effortFold.setAttribute('data-open', '');
        else effortFold.removeAttribute('data-open');
      }
      if (i === 1 && trigFlag) {
        if (next) trigFlag.setAttribute('data-on', '');
        else trigFlag.removeAttribute('data-on');
      }
    });
  });

  wireRadioGroup(
    root.querySelector('.ui-mdpc__seg-group, [role="radiogroup"]'),
    '.ui-mdpc__seg-btn',
    () => {},
    scope
  );

  scope.on(document, 'click', (e) => {
    if (open && !root.contains(e.target as Node)) setOpen(false);
  });

  return () => scope.dispose();
}

// 9. MODEL ROUTER
export function enhanceModelRouter(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-mrc');
  if (!root) return () => {};

  const presets = mrPresets as Record<string, { cost: string; routes: string }>;
  const costEl = root.querySelector<HTMLElement>('.ui-mrc__cost');
  const routesEl = root.querySelector<HTMLElement>('.ui-mrc__routes');
  const fallbackWrap = root.querySelector<HTMLElement>('.ui-mrc__fallback');
  const fallbackSw = root.querySelector<HTMLButtonElement>('.ui-mrc__switch');
  const pickBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-mrc__pick-btn')];
  const statusEl = root.querySelector<HTMLElement>('.ui-mrc__status');
  const deployBtn = root.querySelector<HTMLButtonElement>('.ui-mrc__deploy');

  let livePreset = 'Balanced';
  let activePreset = 'Balanced';
  let version = 14;
  let fallbackOn = fallbackSw?.getAttribute('aria-checked') === 'true';
  let openMenu: HTMLElement | null = null;
  const MODELS = ['Claude Opus 5.5', 'GPT-5.5', 'Gemini 3 Flash', 'Grok 5 Fast'];

  const syncDirty = () => {
    const dirty = activePreset !== livePreset || !fallbackOn;
    if (deployBtn) deployBtn.setAttribute('aria-disabled', String(!dirty));
    if (statusEl) {
      statusEl.innerHTML = dirty
        ? `<i data-state="dirty" aria-hidden="true"></i><span>Unsaved changes</span> <button type="button" class="ui-mrc__revert" style="margin-left:6px;text-decoration:underline;font-size:12px">Revert</button>`
        : `<i data-state="live" aria-hidden="true"></i><span>Policy v${version} · Live on chat-prod</span>`;
    }
  };

  const applyPreset = (name: string) => {
    activePreset = name;
    const p = presets[name];
    if (p) {
      if (costEl) costEl.innerHTML = p.cost;
      if (routesEl) routesEl.innerHTML = p.routes;
    }
    syncDirty();
  };

  wireRadioGroup(
    root.querySelector('.ui-mrc__tabs'),
    '.ui-mrc__tab',
    (btn) => applyPreset(btn.textContent?.trim() || 'Balanced'),
    scope
  );

  scope.on(fallbackSw, 'click', () => {
    fallbackOn = !fallbackOn;
    fallbackSw?.setAttribute('aria-checked', String(fallbackOn));
    if (fallbackWrap) {
      if (!fallbackOn) fallbackWrap.setAttribute('data-off', '');
      else fallbackWrap.removeAttribute('data-off');
    }
    pickBtns.forEach((b) => { b.disabled = !fallbackOn; });
    syncDirty();
  });

  pickBtns.forEach((btn) => {
    scope.on(btn, 'click', (e) => {
      e.stopPropagation();
      if (btn.disabled) return;
      if (openMenu) { openMenu.remove(); openMenu = null; }
      const parent = btn.closest<HTMLElement>('.ui-mrc__pick');
      if (!parent) return;
      parent.style.position = 'relative';
      openMenu = document.createElement('div');
      openMenu.setAttribute('role', 'menu');
      openMenu.style.cssText = 'position:absolute;left:0;bottom:calc(100% + 4px);z-index:20;min-width:160px;background:#fff;border-radius:8px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 8px 24px -8px rgba(0,0,0,0.16);padding:4px;';
      openMenu.innerHTML = MODELS.map(
        (m) => `<button type="button" role="menuitem" style="display:block;width:100%;text-align:left;padding:5px 8px;border-radius:6px;font-size:12px">${m}</button>`
      ).join('');
      parent.appendChild(openMenu);
      btn.setAttribute('aria-expanded', 'true');
      scope.on(openMenu, 'click', (me) => {
        const mi = (me.target as Element | null)?.closest<HTMLButtonElement>('[role="menuitem"]');
        if (!mi) return;
        const nameEl = btn.querySelector('.ui-mrc__pick-name');
        if (nameEl) nameEl.textContent = mi.textContent;
        btn.setAttribute('aria-expanded', 'false');
        openMenu?.remove();
        openMenu = null;
        if (deployBtn) deployBtn.setAttribute('aria-disabled', 'false');
      });
    });
  });

  scope.on(document, 'click', () => {
    if (openMenu) { openMenu.remove(); openMenu = null; pickBtns.forEach((b) => b.setAttribute('aria-expanded', 'false')); }
  });

  scope.on(root, 'click', (e) => {
    const rev = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-mrc__revert');
    if (rev) {
      fallbackOn = true;
      fallbackSw?.setAttribute('aria-checked', 'true');
      fallbackWrap?.removeAttribute('data-off');
      pickBtns.forEach((b) => { b.disabled = false; });
      const tabs = [...root.querySelectorAll<HTMLButtonElement>('.ui-mrc__tab')];
      tabs.forEach((t) => {
        const match = t.textContent?.trim() === livePreset;
        t.setAttribute('aria-checked', String(match));
        t.tabIndex = match ? 0 : -1;
      });
      applyPreset(livePreset);
    }
  });

  scope.on(deployBtn, 'click', () => {
    if (!deployBtn || deployBtn.getAttribute('aria-disabled') === 'true') return;
    deployBtn.textContent = 'Deploying…';
    deployBtn.setAttribute('aria-disabled', 'true');
    if (statusEl) statusEl.innerHTML = '<i data-state="busy" aria-hidden="true"></i><span>Deploying policy…</span>';
    scope.later(() => {
      version++;
      livePreset = activePreset;
      deployBtn.textContent = 'Deploy policy';
      syncDirty();
    }, 650);
  });

  return () => scope.dispose();
}

// 10. RUN CONTROLS
export function enhanceRunControls(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-rclc');
  if (!root) return () => {};

  const stateEl = root.querySelector<HTMLElement>('.ui-rclc__state');
  const markEl = root.querySelector<HTMLElement>('.ui-rclc__mark');
  const answerSpan = root.querySelector<HTMLElement>('.ui-rclc__answer span:first-child');
  const caret = root.querySelector<HTMLElement>('.ui-rclc__caret');
  const afterEl = root.querySelector<HTMLElement>('.ui-rclc__after');
  const queueList = root.querySelector<HTMLUListElement>('.ui-rclc__queue');
  const textarea = root.querySelector<HTMLTextAreaElement>('.ui-rclc__field');
  const permWrap = root.querySelector<HTMLElement>('.ui-rclc__perm-wrap');
  const permBtn = root.querySelector<HTMLButtonElement>('.ui-rclc__perm');
  const permLabel = root.querySelector<HTMLElement>('.ui-rclc__perm-label');
  const stopBtn = root.querySelector<HTMLButtonElement>('.ui-rclc__round');
  const sr = root.querySelector<HTMLElement>('p.ui-rclc__sr');

  const STREAM_WORDS = (
    'Day 1 – Alfama and Graça. Start at the Miradouro da Senhora do Monte before the crowds, then walk down through Alfama for a late lunch at a quiet tasca near Feira da Ladra. Day 2 – Setúbal day trip: grilled cuttlefish by the harbour and a boat out to spot dolphins in the Sado estuary.'
  ).split(' ');

  let wordIdx = 12;
  let running = true;
  let permMenu: HTMLElement | null = null;
  let curPerm = 'Ask first';

  const PERMS = [
    { label: 'Ask first', desc: 'Asks before every change', tone: '' },
    { label: 'Auto-edit', desc: 'Edits files, asks for the rest', tone: '' },
    { label: 'Full access', desc: 'Runs commands without asking', tone: 'alert' },
  ];

  const setRunning = (next: boolean) => {
    running = next;
    root.setAttribute('data-status', running ? 'running' : 'stopped');
    if (stateEl) {
      stateEl.textContent = running ? 'Writing' : 'Stopped';
      if (!running) stateEl.setAttribute('data-tone', 'alert');
      else stateEl.removeAttribute('data-tone');
    }
    if (markEl) {
      if (running) markEl.setAttribute('data-busy', '');
      else markEl.removeAttribute('data-busy');
    }
    if (caret) caret.style.display = running ? '' : 'none';
    if (afterEl) {
      afterEl.innerHTML = running
        ? '<span class="ui-rclc__note" data-keys=""><kbd>Esc</kbd> to stop</span>'
        : '<span class="ui-rclc__cut" data-tone="alert">Stopped</span> <button type="button" class="ui-rclc__btn" data-solid="" data-act="resume" style="margin-left:8px;padding:2px 8px;border-radius:6px;font-size:12px">Resume</button> <button type="button" class="ui-rclc__btn" data-act="retry" style="margin-left:4px;padding:2px 8px;border-radius:6px;font-size:12px">Retry</button>';
    }
    if (sr) sr.textContent = running ? 'Trip planner: Writing' : 'Trip planner: Stopped';
  };

  scope.every(() => {
    if (!running || !answerSpan) return;
    if (wordIdx < STREAM_WORDS.length) {
      wordIdx++;
      answerSpan.textContent = STREAM_WORDS.slice(0, wordIdx).join(' ') + ' ';
    } else {
      wordIdx = 12;
    }
  }, 450);

  scope.on(stopBtn, 'click', () => setRunning(!running));

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const rmBtn = t?.closest<HTMLButtonElement>('.ui-rclc__icon');
    if (rmBtn) {
      rmBtn.closest('li')?.remove();
      return;
    }
    const act = t?.closest<HTMLButtonElement>('[data-act]');
    if (act) {
      if (act.getAttribute('data-act') === 'retry') wordIdx = 6;
      setRunning(true);
    }
  });

  wireRadioGroup(root.querySelector('.ui-rclc__mode'), 'button[role="radio"]', () => {}, scope);

  const closePerm = () => {
    permMenu?.remove();
    permMenu = null;
    permBtn?.setAttribute('aria-expanded', 'false');
  };

  scope.on(permBtn, 'click', (e) => {
    e.stopPropagation();
    if (permMenu) { closePerm(); return; }
    permBtn?.setAttribute('aria-expanded', 'true');
    permMenu = document.createElement('div');
    permMenu.className = 'ui-rclc__menu';
    permMenu.setAttribute('role', 'menu');
    permMenu.style.cssText = 'position:absolute;left:0;bottom:calc(100% + 6px);z-index:20;min-width:220px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 10px 28px -8px rgba(0,0,0,0.18);padding:4px;';
    permMenu.innerHTML = PERMS.map(
      (p) => `<button type="button" role="menuitem" class="ui-rclc__item" data-perm="${p.label}"${p.tone ? ` data-tone="${p.tone}"` : ''} style="display:flex;flex-direction:column;width:100%;text-align:left;padding:6px 8px;border-radius:6px;background:${p.label === curPerm ? 'rgba(0,0,0,0.04)' : 'transparent'}"><b style="font-size:12px">${p.label}</b><small style="font-size:11px;opacity:0.65">${p.desc}</small></button>`
    ).join('');
    if (permWrap) {
      permWrap.style.position = 'relative';
      permWrap.appendChild(permMenu);
    }
    scope.on(permMenu, 'click', (me) => {
      const mi = (me.target as Element | null)?.closest<HTMLButtonElement>('[data-perm]');
      if (!mi) return;
      curPerm = mi.getAttribute('data-perm') || curPerm;
      if (permLabel) permLabel.textContent = curPerm;
      if (mi.getAttribute('data-tone') === 'alert') permBtn?.setAttribute('data-tone', 'alert');
      else permBtn?.removeAttribute('data-tone');
      closePerm();
    });
  });

  scope.on(document, 'click', (e) => {
    if (permMenu && !permWrap?.contains(e.target as Node)) closePerm();
  });

  scope.on(textarea, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'Escape') {
      setRunning(false);
    } else if (ke.key === 'Enter' && !ke.shiftKey && textarea?.value.trim()) {
      ke.preventDefault();
      const msg = textarea.value.trim();
      textarea.value = '';
      if (ke.altKey && queueList) {
        const li = document.createElement('li');
        li.className = 'ui-rclc__q';
        li.innerHTML = `<span class="ui-rclc__q-text">${msg}</span><button type="button" class="ui-rclc__icon" aria-label="Remove from queue">×</button>`;
        queueList.appendChild(li);
      } else if (answerSpan) {
        answerSpan.textContent = `${answerSpan.textContent} · steered: ${msg} `;
        if (!running) setRunning(true);
      }
    }
  });

  return () => scope.dispose();
}

// 11. STEPPER FORM
export function enhanceStepperForm(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-stpc');
  if (!root) return () => {};

  const stepsData = stepperSteps as { body: string; foot: string }[];
  const stepEls = [...root.querySelectorAll<HTMLLIElement>('.ui-stpc__step')];
  const form = root.querySelector<HTMLFormElement>('form');
  const titleEl = root.querySelector<HTMLElement>('.ui-stpc__title');
  const subEl = root.querySelector<HTMLElement>('.ui-stpc__sub');
  const bodyEl = root.querySelector<HTMLElement>('.ui-stpc__body');
  const footEl = root.querySelector<HTMLElement>('.ui-stpc__foot');
  const sr = root.querySelector<HTMLElement>('.ui-stpc__sr');

  const HEADERS = [
    ['Name your workspace', "This is where your team's projects live."],
    ['Invite teammates', "They'll get an email with a link to join."],
    ['Choose a plan', 'You can switch or cancel any time.'],
    ['Review & create', 'Check your workspace details before launching.'],
  ];

  let step = 0;
  let wsName = 'Northwind Studio';
  let wsSlug = 'northwind';
  let emails: string[] = [];
  let plan = 'Pro';

  const saveCurrentStepInputs = () => {
    if (step === 0 && bodyEl) {
      const ins = bodyEl.querySelectorAll<HTMLInputElement>('input');
      if (ins[0]?.value.trim()) wsName = ins[0].value.trim();
      if (ins[1]?.value.trim()) wsSlug = ins[1].value.trim();
    }
  };

  const renderStep = (next: number) => {
    saveCurrentStepInputs();
    step = Math.max(0, Math.min(3, next));
    stepEls.forEach((li, i) => {
      const state = i < step ? 'done' : i === step ? 'current' : 'upcoming';
      li.setAttribute('data-state', state);
      if (i === step) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
      const srSpan = li.querySelector('.ui-stpc__sr');
      if (srSpan) srSpan.textContent = state === 'current' ? ' (current)' : state === 'done' ? ' (done)' : '';
    });
    if (titleEl) titleEl.textContent = HEADERS[step][0];
    if (subEl) subEl.textContent = HEADERS[step][1];
    if (bodyEl && stepsData[step]) {
      bodyEl.innerHTML = stepsData[step].body;
      if (step === 0) {
        const ins = bodyEl.querySelectorAll<HTMLInputElement>('input');
        if (ins[0]) ins[0].value = wsName;
        if (ins[1]) ins[1].value = wsSlug;
      } else if (step === 1) {
        const tagsWrap = bodyEl.querySelector<HTMLElement>('.ui-stpc__tags');
        const emailIn = bodyEl.querySelector<HTMLInputElement>('.ui-stpc__tags-input');
        const renderEmailChips = () => {
          tagsWrap?.querySelectorAll('.ui-stpc__chip').forEach((c) => c.remove());
          emails.forEach((em, idx) => {
            const chip = document.createElement('span');
            chip.className = 'ui-stpc__chip';
            chip.innerHTML = `<span>${em}</span><button type="button" data-rm-email="${idx}" aria-label="Remove ${em}" style="margin-left:4px">×</button>`;
            if (emailIn) tagsWrap?.insertBefore(chip, emailIn);
          });
        };
        renderEmailChips();
        if (emailIn) {
          emailIn.addEventListener('keydown', (ke) => {
            if ((ke.key === 'Enter' || ke.key === ',') && emailIn.value.trim()) {
              ke.preventDefault();
              const v = emailIn.value.trim().replace(/,$/, '');
              if (v && !emails.includes(v)) emails.push(v);
              emailIn.value = '';
              renderEmailChips();
            }
          });
        }
        tagsWrap?.addEventListener('click', (ce) => {
          const rm = (ce.target as Element | null)?.closest<HTMLButtonElement>('[data-rm-email]');
          if (rm) {
            emails.splice(Number(rm.getAttribute('data-rm-email')), 1);
            renderEmailChips();
          }
        });
      } else if (step === 2) {
        const choices = [...bodyEl.querySelectorAll<HTMLButtonElement>('.ui-stpc__choice')];
        const ring = bodyEl.querySelector<HTMLElement>('.ui-stpc__ring');
        choices.forEach((c) => {
          const title = c.querySelector('.ui-stpc__choice-title')?.textContent?.trim() || '';
          const match = title.toLowerCase() === plan.toLowerCase();
          c.setAttribute('aria-checked', String(match));
          c.tabIndex = match ? 0 : -1;
          if (match) positionPill(ring, c, 'x');
          c.addEventListener('click', () => {
            plan = title || plan;
            choices.forEach((x) => { x.setAttribute('aria-checked', String(x === c)); x.tabIndex = x === c ? 0 : -1; });
            positionPill(ring, c, 'x');
          });
        });
      } else if (step === 3) {
        const rows = bodyEl.querySelectorAll<HTMLElement>('.ui-stpc__review-row');
        if (rows[0]) {
          const dd = rows[0].querySelector('dd');
          if (dd) dd.innerHTML = `${wsName}<span class="sfc-demo__sub">affect.app/${wsSlug}</span>`;
        }
        if (rows[1]) {
          const dd = rows[1].querySelector('dd');
          if (dd) dd.textContent = emails.length ? emails.join(', ') : 'Just you for now';
        }
        if (rows[2]) {
          const dd = rows[2].querySelector('dd');
          if (dd) dd.textContent = plan;
        }
        rows.forEach((r, idx) => {
          r.querySelector('.ui-stpc__edit')?.addEventListener('click', () => renderStep(idx));
        });
      }
    }
    if (footEl && stepsData[step]) {
      footEl.innerHTML = stepsData[step].foot;
    }
    if (sr) sr.textContent = `Step ${step + 1} of 4: ${HEADERS[step][0]}`;
  };

  scope.on(form, 'submit', (e) => {
    e.preventDefault();
    if (step < 3) {
      renderStep(step + 1);
    } else if (bodyEl && footEl) {
      const btn = footEl.querySelector<HTMLButtonElement>('.ui-stpc__btn-primary');
      btn?.setAttribute('data-busy', 'true');
      scope.later(() => {
        if (titleEl) titleEl.textContent = `${wsName} is ready`;
        if (subEl) subEl.textContent = `affect.app/${wsSlug} · ${plan} plan`;
        bodyEl.innerHTML = '<div style="padding:18px 0;text-align:center;font-size:13px;color:rgba(0,0,0,0.61)">Workspace created successfully.</div>';
        footEl.innerHTML = '<button type="button" class="ui-stpc__btn ui-stpc__btn-primary" data-restart>Start over</button>';
        stepEls.forEach((li) => li.setAttribute('data-state', 'done'));
      }, 450);
    }
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('.ui-stpc__btn-ghost')) {
      renderStep(step - 1);
    } else if (t?.closest('[data-restart]')) {
      renderStep(0);
    } else {
      const stepItem = t?.closest<HTMLLIElement>('.ui-stpc__step');
      if (stepItem) {
        const idx = stepEls.indexOf(stepItem);
        if (idx >= 0 && idx < step) renderStep(idx);
      }
    }
  });

  return () => scope.dispose();
}
