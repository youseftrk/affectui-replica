import { createScope, wireRadioGroup, positionPill } from './utils';
import decisionPages from './data/decision-card-pages.json';
import promptTemplates from './data/prompt-library-templates.json';
import reviewDetails from './data/review-center-details.json';

// 1. DECISION CARD
export function enhanceDecisionCard(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-dcc');
  if (!root) return () => {};

  const pages = decisionPages as string[];
  const box = root.querySelector<HTMLElement>('.ui-dcc__box');
  const inner = root.querySelector<HTMLElement>('.ui-dcc__inner');
  const sr = root.querySelector<HTMLElement>('.ui-dcc__sr');
  const lineText = host.querySelector<HTMLElement>('.dc-demo__text');

  let pageIdx = 0;
  const resolved = new Set<number>();
  let minimized = false;
  let minBar: HTMLElement | null = null;

  const renderPage = () => {
    if (box && pages[pageIdx]) {
      box.innerHTML = pages[pageIdx];
      box.querySelectorAll<HTMLInputElement>('input[value]').forEach((i) => { i.defaultValue = i.getAttribute('value') || ''; });
    }
    const left = pages.length - resolved.size;
    if (lineText) {
      lineText.textContent = left > 0
        ? `${left} task${left === 1 ? '' : 's'} wait${left === 1 ? 's' : ''} on you – everything else keeps running.`
        : 'All caught up – every task is running.';
    }
  };

  const setMin = (min: boolean) => {
    minimized = min;
    root.setAttribute('data-mode', min ? 'min' : 'full');
    if (min) {
      if (box) box.style.display = 'none';
      if (!minBar && inner) {
        minBar = document.createElement('div');
        minBar.className = 'ui-dcc__min';
        minBar.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08);font-size:12px;';
        minBar.innerHTML = `<span><b>Needs you</b> · ${pages.length - resolved.size} decisions waiting</span><button type="button" class="ui-dcc__link" data-show-full style="font-weight:500">Show</button>`;
        inner.appendChild(minBar);
      }
    } else {
      minBar?.remove();
      minBar = null;
      if (box) box.style.display = '';
    }
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-show-full]')) { setMin(false); return; }
    const pager = t?.closest<HTMLButtonElement>('.ui-dcc__page');
    if (pager) {
      const step = pager.getAttribute('data-step') === 'prev' ? -1 : 1;
      pageIdx = (pageIdx + step + pages.length) % pages.length;
      renderPage();
      return;
    }
    if (t?.closest('.ui-dcc__link')) {
      setMin(!minimized);
      return;
    }
    const opt = t?.closest<HTMLElement>('.ui-dcc__opt, .ui-dcc__tile');
    if (opt) {
      box?.querySelectorAll('.ui-dcc__opt, .ui-dcc__tile').forEach((o) => o.setAttribute('aria-selected', String(o === opt)));
      resolved.add(pageIdx);
      if (sr) sr.textContent = `Selected: ${opt.textContent?.trim()}`;
      scope.later(() => {
        pageIdx = (pageIdx + 1) % pages.length;
        renderPage();
      }, 360);
      return;
    }
    if (t?.closest('.ui-dcc__send')) {
      const inp = box?.querySelector<HTMLInputElement>('.ui-dcc__input');
      if (inp?.value.trim()) {
        resolved.add(pageIdx);
        inp.value = '';
        pageIdx = (pageIdx + 1) % pages.length;
        renderPage();
      }
    }
  });

  scope.on(root, 'input', (e) => {
    const inp = (e.target as Element | null)?.closest<HTMLInputElement>('.ui-dcc__input');
    if (!inp) return;
    const send = box?.querySelector<HTMLElement>('.ui-dcc__send');
    if (send) {
      if (inp.value.trim()) send.setAttribute('data-shown', 'true');
      else send.removeAttribute('data-shown');
    }
  });

  // Also wire the embedded chat composer controls beneath the decision card
  const cc = host.querySelector<HTMLElement>('.ui-ccc');
  if (cc) {
    const menus = [...cc.querySelectorAll<HTMLElement>('.ui-ccc__menu')];
    const closeAllMenus = () => {
      menus.forEach((m) => m.setAttribute('data-open', 'false'));
      cc.querySelectorAll('[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    };
    scope.on(cc, 'click', (e) => {
      const t = e.target as Element | null;
      const trig = t?.closest<HTMLButtonElement>('.ui-ccc__icon-btn, .ui-ccc__approval, .ui-ccc__model');
      if (trig) {
        if (trig.getAttribute('aria-label') === 'Voice input') {
          const body = cc.querySelector<HTMLElement>('.ui-ccc__body');
          const rec = body?.getAttribute('data-recording') === 'true';
          body?.setAttribute('data-recording', String(!rec));
          return;
        }
        const wasOpen = trig.getAttribute('aria-expanded') === 'true';
        closeAllMenus();
        if (!wasOpen) {
          trig.setAttribute('aria-expanded', 'true');
          const idx = trig.classList.contains('ui-ccc__approval') ? 1 : trig.classList.contains('ui-ccc__model') ? 2 : 0;
          menus[Math.min(idx, menus.length - 1)]?.setAttribute('data-open', 'true');
        }
        return;
      }
      const opt = t?.closest<HTMLElement>('.ui-ccc__option');
      if (opt) {
        const menu = opt.closest('.ui-ccc__menu');
        menu?.querySelectorAll('.ui-ccc__option').forEach((o) => {
          o.setAttribute('aria-selected', String(o === opt));
          if (o === opt) o.setAttribute('data-checked', '');
          else o.removeAttribute('data-checked');
        });
        const label = opt.querySelector('.ui-ccc__option-name')?.textContent?.trim();
        if (label) {
          const openBtn = cc.querySelector<HTMLElement>('.ui-ccc__approval[aria-expanded="true"], .ui-ccc__model[aria-expanded="true"]');
          const face = openBtn?.querySelector('.ui-ccc__approval-face, .ui-ccc__model-face');
          if (face) face.textContent = label;
        }
        closeAllMenus();
      }
    });
  }

  return () => scope.dispose();
}

// 2. DECISION TREE
export function enhanceDecisionTree(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-dctc');
  if (!root) return () => {};

  const tree = root.querySelector<HTMLElement>('.ui-dctc__tree');
  const rows = [...root.querySelectorAll<HTMLElement>('.ui-dctc__row')];
  const links = [...root.querySelectorAll<SVGElement>('.ui-dctc__link')];
  const countEl = root.querySelector<HTMLElement>('.ui-dctc__count');
  const ofEl = root.querySelector<HTMLElement>('.ui-dctc__of');
  const dots = [...root.querySelectorAll<HTMLElement>('.ui-dctc__dots span')];
  const sr = root.querySelector<HTMLElement>('.ui-dctc__sr');

  let pickedIdx: number | null = null;
  let customOpen = false;
  let customForm: HTMLElement | null = null;
  let outBadge: HTMLElement | null = null;

  const setHot = (idx: number | null) => {
    rows.forEach((r, i) => {
      const opt = r.querySelector('.ui-dctc__opt');
      if (idx === i) opt?.setAttribute('data-hot', '');
      else opt?.removeAttribute('data-hot');
    });
    links.forEach((l, i) => {
      if (idx === i) l.setAttribute('data-hot', '');
      else l.removeAttribute('data-hot');
    });
  };

  const pickBranch = (idx: number, customText?: string) => {
    pickedIdx = idx;
    tree?.setAttribute('data-picked', '');
    rows.forEach((r, i) => {
      const opt = r.querySelector('.ui-dctc__opt');
      if (i === idx) {
        r.removeAttribute('data-dim');
        opt?.setAttribute('data-pick', '');
        opt?.setAttribute('data-pressed', '');
      } else {
        r.setAttribute('data-dim', '');
        opt?.removeAttribute('data-pick');
      }
    });
    links.forEach((l, i) => {
      if (i === idx) { l.setAttribute('data-pick', ''); l.removeAttribute('data-dim'); }
      else { l.removeAttribute('data-pick'); l.setAttribute('data-dim', ''); }
    });
    const label = customText || rows[idx]?.querySelector('.ui-dctc__label')?.textContent?.trim() || `Branch ${idx + 1}`;
    if (countEl) countEl.textContent = '2 waiting for you';
    if (ofEl) ofEl.textContent = '2 of 3';
    dots.forEach((d, i) => { if (i === 1) d.setAttribute('data-on', ''); else d.removeAttribute('data-on'); });
    outBadge?.remove();
    outBadge = document.createElement('div');
    outBadge.className = 'ui-dctc__out';
    outBadge.setAttribute('data-kind', 'replied');
    outBadge.style.cssText = 'margin-top:10px;padding:8px 12px;border-radius:8px;background:rgba(0,0,0,0.03);font-size:12px;display:flex;align-items:center;justify-content:space-between;';
    outBadge.innerHTML = `<span><b>Picked:</b> ${label}</span><button type="button" data-reset-tree style="font-size:11px;text-decoration:underline">Reset</button>`;
    tree?.appendChild(outBadge);
    if (sr) sr.textContent = `Picked: ${label}`;
  };

  const resetTree = () => {
    pickedIdx = null;
    customOpen = false;
    customForm?.remove();
    customForm = null;
    outBadge?.remove();
    outBadge = null;
    tree?.removeAttribute('data-picked');
    rows.forEach((r) => {
      r.removeAttribute('data-dim');
      const opt = r.querySelector('.ui-dctc__opt');
      opt?.removeAttribute('data-pick');
      opt?.removeAttribute('data-pressed');
      opt?.removeAttribute('data-open');
    });
    links.forEach((l) => { l.removeAttribute('data-pick'); l.removeAttribute('data-dim'); });
    if (countEl) countEl.textContent = '3 waiting for you';
    if (ofEl) ofEl.textContent = '1 of 3';
    dots.forEach((d, i) => { if (i === 0) d.setAttribute('data-on', ''); else d.removeAttribute('data-on'); });
  };

  rows.forEach((r, i) => {
    scope.on(r, 'mouseenter', () => setHot(i));
    scope.on(r, 'mouseleave', () => setHot(null));
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-reset-tree]')) { resetTree(); return; }
    const otherBtn = t?.closest<HTMLButtonElement>('.ui-dctc__other');
    if (otherBtn) {
      const opt = otherBtn.closest<HTMLElement>('.ui-dctc__opt');
      customOpen = !customOpen;
      if (customOpen && opt) {
        opt.setAttribute('data-open', '');
        if (!customForm) {
          customForm = document.createElement('form');
          customForm.style.cssText = 'display:flex;gap:6px;margin-top:6px;width:100%';
          customForm.innerHTML = '<input type="text" placeholder="Tell the agent what to do…" style="flex:1;padding:5px 8px;border:1px solid rgba(0,0,0,0.12);border-radius:6px;font-size:12px" /><button type="submit" style="padding:4px 10px;border-radius:6px;background:#111;color:#fff;font-size:12px">Send</button>';
          opt.appendChild(customForm);
          customForm.querySelector('input')?.focus();
          customForm.addEventListener('submit', (se) => {
            se.preventDefault();
            const val = customForm?.querySelector('input')?.value.trim();
            if (val) pickBranch(rows.length - 1, val);
          });
        }
      } else {
        opt?.removeAttribute('data-open');
        customForm?.remove();
        customForm = null;
      }
      return;
    }
    const optBtn = t?.closest<HTMLButtonElement>('.ui-dctc__opt');
    if (optBtn) {
      const row = optBtn.closest<HTMLElement>('.ui-dctc__row');
      const idx = row ? rows.indexOf(row) : -1;
      if (idx >= 0) {
        if (pickedIdx === idx) resetTree();
        else pickBranch(idx);
      }
    }
  });

  scope.on(root, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (['1', '2', '3'].includes(ke.key)) pickBranch(Number(ke.key) - 1);
  });

  return () => scope.dispose();
}

// 3. PERMISSION REQUEST
export function enhancePermissionRequest(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-prc');
  if (!root) return () => {};

  const card = root.querySelector<HTMLElement>('.ui-prc__card');
  const origCardHtml = card?.innerHTML || '';
  let scopeVal: 'once' | 'timed' | 'always' = 'timed';

  const LABELS: Record<string, string> = {
    once: 'Allow once',
    timed: 'Allow for 1 hour',
    always: 'Always allow',
  };
  const RESULT_TITLES: Record<string, string> = {
    once: 'Allowed once · push to main',
    timed: 'Allowed for 1 hour · push to main',
    always: 'Always allowed · push to main',
  };

  const resolve = (kind: 'allowed' | 'denied') => {
    if (!card) return;
    root.setAttribute('data-state', kind);
    const title = kind === 'allowed' ? RESULT_TITLES[scopeVal] : 'Denied · push to main';
    const sub = kind === 'allowed'
      ? (scopeVal === 'timed' ? '59 min left · Coder continues running' : 'Coder continues running')
      : 'Coder paused and asked for another approach';
    card.innerHTML = `<div class="ui-prc__result" data-kind="${kind}" style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px"><div><div style="font-weight:500;font-size:13px">${title}</div><div style="font-size:12px;opacity:0.65">${sub}</div></div><button type="button" class="ui-prc__btn" data-reset-pr>${kind === 'allowed' ? 'Revoke' : 'Ask again'}</button></div>`;
  };

  const reset = () => {
    if (!card) return;
    root.setAttribute('data-state', 'pending');
    card.innerHTML = origCardHtml;
    const scopes = [...card.querySelectorAll<HTMLButtonElement>('.ui-prc__scope')];
    scopes.forEach((b) => {
      const m = b.getAttribute('data-scope') === scopeVal;
      b.setAttribute('aria-checked', String(m));
      b.tabIndex = m ? 0 : -1;
    });
    const lbl = card.querySelector<HTMLElement>('.ui-prc__btn-label');
    if (lbl) lbl.textContent = LABELS[scopeVal];
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-reset-pr]')) { reset(); return; }
    const sc = t?.closest<HTMLButtonElement>('.ui-prc__scope');
    if (sc) {
      scopeVal = (sc.getAttribute('data-scope') as 'once' | 'timed' | 'always') || 'timed';
      root.querySelectorAll<HTMLButtonElement>('.ui-prc__scope').forEach((b) => {
        const m = b === sc;
        b.setAttribute('aria-checked', String(m));
        b.tabIndex = m ? 0 : -1;
      });
      const lbl = root.querySelector<HTMLElement>('.ui-prc__btn-label');
      if (lbl) lbl.textContent = LABELS[scopeVal];
      return;
    }
    const btn = t?.closest<HTMLButtonElement>('.ui-prc__btn');
    if (btn) {
      if (btn.classList.contains('ui-prc__btn--primary')) resolve('allowed');
      else resolve('denied');
    }
  });

  scope.on(document, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (root.getAttribute('data-state') !== 'pending') return;
    if (ke.key === 'Escape') resolve('denied');
  });

  return () => scope.dispose();
}

// 4. PROMPT LIBRARY
export function enhancePromptLibrary(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-plic');
  if (!root) return () => {};

  const templates = promptTemplates as string[];
  const search = root.querySelector<HTMLInputElement>('input[type="search"]');
  const glide = root.querySelector<HTMLElement>('.ui-plic__glide');
  const options = [...root.querySelectorAll<HTMLElement>('.ui-plic__option')];
  const mainEl = root.querySelector<HTMLElement>('.ui-plic__main, .ui-plic__panel');
  const sr = root.querySelector<HTMLElement>('.ui-plic__sr');

  const syncFormState = () => {
    if (!mainEl) return;
    const inputs = [...mainEl.querySelectorAll<HTMLInputElement>('.ui-plic__input')];
    const tokens = [...mainEl.querySelectorAll<HTMLElement>('.ui-plic__token')];
    let filled = 0;
    inputs.forEach((inp, i) => {
      const val = inp.value.trim();
      if (val) filled++;
      const tok = tokens[i];
      if (tok) {
        if (val) {
          tok.textContent = val;
          tok.setAttribute('data-filled', 'true');
        } else {
          const ph = inp.getAttribute('data-var') || inp.getAttribute('aria-label')?.split(' ')[0] || 'value';
          tok.textContent = `{${ph}}`;
          tok.removeAttribute('data-filled');
        }
      }
    });
    const prog = mainEl.querySelector<HTMLElement>('.ui-plic__progress, .ui-plic__meta');
    if (prog && inputs.length) prog.textContent = `${filled} of ${inputs.length} filled`;
    const useBtn = root.querySelector<HTMLButtonElement>('.ui-plic__use');
    if (useBtn) useBtn.setAttribute('aria-disabled', String(filled < inputs.length));
    const previewText = mainEl.querySelector<HTMLElement>('.ui-plic__preview')?.textContent || '';
    const est = Math.max(8, Math.round(previewText.trim().split(/\s+/).length * 1.3));
    const cap = root.querySelector<HTMLElement>('.ui-plic__caption .ui-plic__swap-item');
    if (cap) cap.textContent = `~${est} tokens`;
  };

  const selectTemplate = (idx: number) => {
    const opt = options[idx];
    if (!opt) return;
    options.forEach((o, i) => {
      o.setAttribute('aria-selected', String(i === idx));
      o.tabIndex = i === idx ? 0 : -1;
    });
    positionPill(glide, opt, 'y');
    if (mainEl && templates[idx]) {
      mainEl.innerHTML = templates[idx];
      syncFormState();
    }
  };

  scope.on(search, 'input', () => {
    const q = (search?.value || '').trim().toLowerCase();
    options.forEach((o) => {
      o.style.display = !q || (o.textContent || '').toLowerCase().includes(q) ? '' : 'none';
    });
    const firstIdx = options.findIndex((o) => o.style.display !== 'none');
    if (firstIdx >= 0) positionPill(glide, options[firstIdx], 'y');
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const opt = t?.closest<HTMLElement>('.ui-plic__option');
    if (opt) {
      const idx = options.indexOf(opt);
      if (idx >= 0) selectTemplate(idx);
      return;
    }
    const copyBtn = t?.closest<HTMLButtonElement>('.ui-plic__copy');
    if (copyBtn) {
      const txt = mainEl?.querySelector('.ui-plic__preview')?.textContent?.trim() || '';
      navigator.clipboard?.writeText(txt).catch(() => {});
      const lbl = copyBtn.querySelector('.ui-plic__copy-text');
      const icon = copyBtn.querySelector('.ui-plic__copy-icon');
      if (lbl) lbl.textContent = 'Copied';
      icon?.setAttribute('data-done', 'true');
      if (sr) sr.textContent = 'Prompt copied to clipboard';
      scope.later(() => {
        if (lbl) lbl.textContent = 'Copy';
        icon?.removeAttribute('data-done');
      }, 1400);
      return;
    }
    const useBtn = t?.closest<HTMLButtonElement>('.ui-plic__use');
    if (useBtn) {
      const lbl = useBtn.querySelector('.ui-plic__use-label');
      const orig = lbl?.textContent || 'Use prompt';
      if (lbl) lbl.textContent = 'Inserted ✓';
      if (sr) sr.textContent = 'Prompt inserted';
      scope.later(() => { if (lbl) lbl.textContent = orig; }, 1200);
    }
  });

  scope.on(root, 'input', (e) => {
    if ((e.target as Element | null)?.closest('.ui-plic__input')) syncFormState();
  });

  return () => scope.dispose();
}

// 5. REVIEW CENTER
export function enhanceReviewCenter(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-rvcc');
  if (!root) return () => {};

  const details = reviewDetails as string[];
  const filters = [...root.querySelectorAll<HTMLButtonElement>('.ui-rvcc__filter')];
  const items = [...root.querySelectorAll<HTMLElement>('.ui-rvcc__item')];
  const detailEl = root.querySelector<HTMLElement>('.ui-rvcc__detail');
  const countB = root.querySelector<HTMLElement>('.ui-rvcc__count b');
  const fillEl = root.querySelector<HTMLElement>('.ui-rvcc__fill');
  const sr = root.querySelector<HTMLElement>('.ui-rvcc__sr');

  const itemMeta = items.map((el, i) => ({
    el,
    idx: i,
    highRisk: el.innerHTML.includes('High risk') || el.innerHTML.includes('data-risk="high"') || i < 2,
    unsure: el.innerHTML.includes('Unsure') || i % 2 === 1,
    decided: '' as '' | 'approved' | 'rejected' | 'skipped',
  }));

  let activeFilter = 0; // 0 All, 1 High risk, 2 Unsure
  let curIdx = 0;
  let reviewedCount = 24;
  let lastDecidedIdx: number | null = null;

  const visibleItems = () =>
    itemMeta.filter((m) => {
      if (m.decided === 'approved' || m.decided === 'rejected') return false;
      if (activeFilter === 1) return m.highRisk;
      if (activeFilter === 2) return m.unsure;
      return true;
    });

  const syncHeader = () => {
    if (countB) countB.textContent = String(reviewedCount);
    if (fillEl) fillEl.style.width = `${Math.min(100, (reviewedCount / 32) * 100)}%`;
    const allRem = itemMeta.filter((m) => !m.decided || m.decided === 'skipped');
    if (filters[0]?.querySelector('.ui-rvcc__filter-count')) filters[0].querySelector('.ui-rvcc__filter-count')!.textContent = String(allRem.length);
    if (filters[1]?.querySelector('.ui-rvcc__filter-count')) filters[1].querySelector('.ui-rvcc__filter-count')!.textContent = String(allRem.filter((m) => m.highRisk).length);
    if (filters[2]?.querySelector('.ui-rvcc__filter-count')) filters[2].querySelector('.ui-rvcc__filter-count')!.textContent = String(allRem.filter((m) => m.unsure).length);
  };

  const selectRow = (idx: number) => {
    curIdx = idx;
    itemMeta.forEach((m) => {
      const btn = m.el.querySelector('.ui-rvcc__row');
      if (m.idx === idx) btn?.setAttribute('aria-current', 'true');
      else btn?.removeAttribute('aria-current');
    });
    if (detailEl && details[idx]) {
      detailEl.innerHTML = details[idx];
    }
  };

  const applyFilter = (fIdx: number) => {
    activeFilter = fIdx;
    filters.forEach((f, i) => f.setAttribute('aria-pressed', String(i === fIdx)));
    const vis = new Set(visibleItems().map((m) => m.idx));
    itemMeta.forEach((m) => { m.el.style.display = vis.has(m.idx) ? '' : 'none'; });
    const first = visibleItems()[0];
    if (first) selectRow(first.idx);
    else if (detailEl) {
      detailEl.innerHTML = `<div class="ui-rvcc__empty" style="padding:48px 24px;text-align:center"><p style="font-weight:500">Nothing matches this filter</p><button type="button" class="ui-rvcc__btn" data-undo-rvc style="margin-top:10px">Undo last</button></div>`;
    }
  };

  const decideCurrent = (decision: 'approved' | 'rejected' | 'skipped') => {
    const meta = itemMeta[curIdx];
    if (!meta) return;
    if (decision === 'skipped') {
      const vis = visibleItems();
      const pos = vis.findIndex((m) => m.idx === curIdx);
      const next = vis[(pos + 1) % vis.length];
      if (next) selectRow(next.idx);
      return;
    }
    meta.decided = decision;
    lastDecidedIdx = curIdx;
    reviewedCount = Math.min(32, reviewedCount + 1);
    syncHeader();
    applyFilter(activeFilter);
    if (sr) sr.textContent = `${decision === 'approved' ? 'Approved' : 'Rejected'} item`;
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-undo-rvc]') && lastDecidedIdx !== null) {
      itemMeta[lastDecidedIdx].decided = '';
      reviewedCount = Math.max(24, reviewedCount - 1);
      syncHeader();
      applyFilter(activeFilter);
      selectRow(lastDecidedIdx);
      lastDecidedIdx = null;
      return;
    }
    const fBtn = t?.closest<HTMLButtonElement>('.ui-rvcc__filter');
    if (fBtn) { applyFilter(filters.indexOf(fBtn)); return; }
    const row = t?.closest<HTMLButtonElement>('.ui-rvcc__row');
    if (row) {
      const item = row.closest<HTMLElement>('.ui-rvcc__item');
      const idx = item ? items.indexOf(item) : -1;
      if (idx >= 0) selectRow(idx);
      return;
    }
    const reasonBtn = t?.closest<HTMLButtonElement>('.ui-rvcc__reason');
    if (reasonBtn) { decideCurrent('rejected'); return; }
    const actBtn = t?.closest<HTMLButtonElement>('.ui-rvcc__btn');
    if (actBtn) {
      const txt = actBtn.textContent?.trim() || '';
      if (txt.startsWith('Approve')) decideCurrent('approved');
      else if (txt.startsWith('Skip')) decideCurrent('skipped');
      else if (txt.startsWith('Reject')) {
        const actions = detailEl?.querySelector<HTMLElement>('.ui-rvcc__actions');
        if (actions && actions.getAttribute('data-mode') !== 'reject') {
          actions.setAttribute('data-mode', 'reject');
          actions.innerHTML = `<span style="font-size:12px;opacity:0.7;margin-right:4px">Why?</span><button type="button" class="ui-rvcc__btn ui-rvcc__reason">Incorrect</button><button type="button" class="ui-rvcc__btn ui-rvcc__reason">Too risky</button><button type="button" class="ui-rvcc__btn ui-rvcc__reason">Not allowed</button><button type="button" class="ui-rvcc__btn" data-cancel-rej>Cancel</button>`;
        }
      } else if (actBtn.hasAttribute('data-cancel-rej')) {
        selectRow(curIdx);
      }
    }
  });

  scope.on(root, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'a' || ke.key === 'A') decideCurrent('approved');
    else if (ke.key === 's' || ke.key === 'S') decideCurrent('skipped');
  });

  return () => scope.dispose();
}

// 6. SETUP GUIDE
export function enhanceSetupGuide(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-sgdc');
  if (!root) return () => {};

  const body = root.querySelector<HTMLElement>('.ui-sgdc__body');
  const iconBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-sgdc__icon-btn')];
  const editBtn = root.querySelector<HTMLButtonElement>('.ui-sgdc__edit');
  const track = root.querySelector<HTMLElement>('.ui-sgdc__track');
  const fill = root.querySelector<HTMLElement>('.ui-sgdc__fill');
  const countEl = root.querySelector<HTMLElement>('.ui-sgdc__count');
  const groups = [...root.querySelectorAll<HTMLElement>('.ui-sgdc__group')];

  let editMode = false;

  const syncProgress = () => {
    const allTasks = [...root.querySelectorAll<HTMLButtonElement>('.ui-sgdc__task')];
    const doneCount = allTasks.filter((t) => t.getAttribute('data-state') === 'done').length;
    const total = allTasks.length;
    const pct = Math.round((doneCount / Math.max(1, total)) * 100);
    if (countEl) countEl.textContent = `${doneCount}/${total}`;
    if (fill) fill.style.transform = `scaleX(${doneCount / Math.max(1, total)})`;
    track?.setAttribute('aria-valuenow', String(pct));

    groups.forEach((g) => {
      const gTasks = [...g.querySelectorAll<HTMLButtonElement>('.ui-sgdc__task')];
      const allDone = gTasks.every((t) => t.getAttribute('data-state') === 'done');
      const title = g.querySelector<HTMLElement>('.ui-sgdc__group-title');
      if (title) {
        if (allDone) title.setAttribute('data-done', 'true');
        else title.removeAttribute('data-done');
      }
      // Ensure first non-done task in group is unlocked ("current")
      let foundCurrent = false;
      gTasks.forEach((t) => {
        if (t.getAttribute('data-state') === 'done') {
          t.disabled = false;
          t.setAttribute('aria-pressed', 'true');
        } else if (!foundCurrent || editMode) {
          foundCurrent = true;
          t.setAttribute('data-state', 'current');
          t.disabled = false;
          t.setAttribute('aria-pressed', 'false');
        } else {
          t.setAttribute('data-state', 'locked');
          t.disabled = true;
          t.setAttribute('aria-pressed', 'false');
        }
      });
    });
  };

  scope.on(editBtn, 'click', () => {
    editMode = !editMode;
    if (editBtn) editBtn.textContent = editMode ? 'Done' : 'Edit';
    syncProgress();
  });

  // Minimize / Expand
  scope.on(iconBtns[0], 'click', () => {
    const expanded = iconBtns[0].getAttribute('aria-expanded') !== 'true';
    iconBtns[0].setAttribute('aria-expanded', String(expanded));
    iconBtns[0].setAttribute('aria-label', expanded ? 'Minimize setup guide' : 'Expand setup guide');
    if (body) {
      if (expanded) body.removeAttribute('data-hidden');
      else body.setAttribute('data-hidden', 'true');
    }
  });

  // Close -> collapse with reopen button
  scope.on(iconBtns[1], 'click', () => {
    const isHidden = body?.hasAttribute('data-hidden');
    if (body) {
      if (isHidden) body.removeAttribute('data-hidden');
      else body.setAttribute('data-hidden', 'true');
    }
    iconBtns[0]?.setAttribute('aria-expanded', String(!!isHidden));
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const head = t?.closest<HTMLButtonElement>('.ui-sgdc__group-head');
    if (head) {
      const grp = head.closest<HTMLElement>('.ui-sgdc__group');
      const panel = grp?.querySelector<HTMLElement>('.ui-sgdc__panel');
      const open = head.getAttribute('aria-expanded') !== 'true';
      head.setAttribute('aria-expanded', String(open));
      if (open) {
        grp?.setAttribute('data-open', 'true');
        panel?.removeAttribute('inert');
      } else {
        grp?.removeAttribute('data-open');
        panel?.setAttribute('inert', '');
      }
      return;
    }
    const task = t?.closest<HTMLButtonElement>('.ui-sgdc__task');
    if (task && !task.disabled) {
      const isDone = task.getAttribute('data-state') === 'done';
      task.setAttribute('data-state', isDone ? 'current' : 'done');
      syncProgress();
    }
  });

  return () => scope.dispose();
}

// 7. INLINE DIFF
export function enhanceInlineDiff(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-dfc');
  if (!root) return () => {};

  const chgs = [...root.querySelectorAll<HTMLElement>('.ui-dfc__chg')];
  const pop = root.querySelector<HTMLElement>('.ui-dfc__pop');
  const sr = root.querySelector<HTMLElement>('.ui-dfc__sr');
  const iconBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-dfc__icon')];
  const layers = [...root.querySelectorAll<HTMLElement>('.ui-dfc__layer')];
  const countEl = root.querySelector<HTMLElement>('.ui-dfc__count');

  const initialStates = chgs.map((c) => c.getAttribute('data-state') || 'pending');
  let activeChg: HTMLElement | null = null;

  const pendingChgs = () => chgs.filter((c) => c.getAttribute('data-state') === 'pending');

  const hidePop = () => {
    activeChg?.removeAttribute('data-active');
    activeChg = null;
    pop?.removeAttribute('data-open');
    pop?.setAttribute('aria-hidden', 'true');
  };

  const showPopFor = (chg: HTMLElement) => {
    chgs.forEach((c) => c.removeAttribute('data-active'));
    activeChg = chg;
    chg.setAttribute('data-active', 'true');
    if (pop) {
      const card = root.querySelector<HTMLElement>('.ui-dfc__card');
      const cr = card?.getBoundingClientRect();
      const r = chg.getBoundingClientRect();
      if (cr) {
        pop.style.left = `${Math.max(8, r.left - cr.left)}px`;
        pop.style.top = `${r.bottom - cr.top + 6}px`;
      }
      pop.setAttribute('data-open', 'true');
      pop.setAttribute('aria-hidden', 'false');
    }
  };

  const syncBar = () => {
    const rem = pendingChgs();
    if (countEl) countEl.textContent = `${rem.length} left`;
    if (rem.length === 0) {
      root.setAttribute('data-done', 'true');
      hidePop();
      if (layers[0]) layers[0].removeAttribute('data-show');
      if (layers[1]) layers[1].setAttribute('data-show', 'true');
      if (sr) sr.textContent = 'All changes reviewed.';
    } else {
      root.removeAttribute('data-done');
      if (layers[0]) layers[0].setAttribute('data-show', 'true');
      if (layers[1]) layers[1].removeAttribute('data-show');
    }
  };

  const decide = (chg: HTMLElement | null, state: 'accepted' | 'rejected') => {
    if (!chg) return;
    chg.setAttribute('data-state', state);
    chg.removeAttribute('data-active');
    const rem = pendingChgs();
    syncBar();
    if (rem.length) showPopFor(rem[0]);
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const chg = t?.closest<HTMLElement>('.ui-dfc__chg');
    if (chg && chg.getAttribute('data-state') === 'pending') {
      if (activeChg === chg) hidePop();
      else showPopFor(chg);
      return;
    }
    const pbtn = t?.closest<HTMLButtonElement>('.ui-dfc__pbtn');
    if (pbtn) {
      const accept = pbtn.classList.contains('ui-dfc__pbtn--primary');
      decide(activeChg || pendingChgs()[0] || null, accept ? 'accepted' : 'rejected');
      return;
    }
    const btn = t?.closest<HTMLButtonElement>('.ui-dfc__btn');
    if (btn) {
      const txt = btn.textContent?.trim() || '';
      if (txt === 'Accept all') {
        chgs.forEach((c) => { if (c.getAttribute('data-state') === 'pending') c.setAttribute('data-state', 'accepted'); });
        syncBar();
      } else if (txt === 'Reject all') {
        chgs.forEach((c) => { if (c.getAttribute('data-state') === 'pending') c.setAttribute('data-state', 'rejected'); });
        syncBar();
      } else if (txt === 'Undo') {
        chgs.forEach((c, i) => c.setAttribute('data-state', initialStates[i]));
        syncBar();
      }
    }
  });

  scope.on(iconBtns[0], 'click', () => {
    const rem = pendingChgs();
    if (!rem.length) return;
    const idx = activeChg ? rem.indexOf(activeChg) : 0;
    showPopFor(rem[(idx - 1 + rem.length) % rem.length]);
  });
  scope.on(iconBtns[1], 'click', () => {
    const rem = pendingChgs();
    if (!rem.length) return;
    const idx = activeChg ? rem.indexOf(activeChg) : -1;
    showPopFor(rem[(idx + 1) % rem.length]);
  });

  scope.on(root, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'y' || ke.key === 'Y') decide(activeChg || pendingChgs()[0] || null, 'accepted');
    else if (ke.key === 'n' || ke.key === 'N') decide(activeChg || pendingChgs()[0] || null, 'rejected');
    else if (ke.key === 'Escape') hidePop();
  });

  return () => scope.dispose();
}

// 8. AWAY SUMMARY
export function enhanceAwaySummary(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-awc');
  if (!root) return () => {};

  const folds = [...root.querySelectorAll<HTMLElement>('.ui-awc__fold')];
  const dividerFold = folds[0];
  const cardFold = folds[1];
  const dividerBtn = root.querySelector<HTMLButtonElement>('.ui-awc__divider-btn');
  const moreBtn = root.querySelector<HTMLButtonElement>('.ui-awc__more');
  const extra = root.querySelector<HTMLElement>('.ui-awc__extra');
  const doneBtn = root.querySelector<HTMLButtonElement>('.ui-awc__done-btn');
  const sr = root.querySelector<HTMLElement>('.ui-awc__sr');

  const setCollapsed = (collapsed: boolean) => {
    if (dividerFold && cardFold) {
      if (collapsed) {
        dividerFold.setAttribute('data-open', '');
        dividerFold.querySelector('.ui-awc__fold-in')?.removeAttribute('inert');
        cardFold.removeAttribute('data-open');
        cardFold.querySelector('.ui-awc__fold-in')?.setAttribute('inert', '');
      } else {
        dividerFold.removeAttribute('data-open');
        dividerFold.querySelector('.ui-awc__fold-in')?.setAttribute('inert', '');
        cardFold.setAttribute('data-open', '');
        cardFold.querySelector('.ui-awc__fold-in')?.removeAttribute('inert');
      }
    }
    dividerBtn?.setAttribute('aria-expanded', String(!collapsed));
    doneBtn?.setAttribute('aria-expanded', String(!collapsed));
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('.ui-awc__done-btn')) {
      setCollapsed(true);
      return;
    }
    if (t?.closest('.ui-awc__divider-btn')) {
      setCollapsed(false);
      return;
    }
    if (t?.closest('.ui-awc__more')) {
      const open = !extra?.hasAttribute('data-open');
      if (open) {
        extra?.setAttribute('data-open', '');
        moreBtn?.setAttribute('aria-expanded', 'true');
        if (moreBtn) moreBtn.childNodes[0].textContent = 'Show less';
      } else {
        extra?.removeAttribute('data-open');
        moreBtn?.setAttribute('aria-expanded', 'false');
        if (moreBtn) moreBtn.childNodes[0].textContent = 'Show 3 more';
      }
      return;
    }
    const act = t?.closest<HTMLButtonElement>('.ui-awc__act');
    if (act) {
      const row = act.closest<HTMLElement>('.ui-awc__row');
      const kind = act.getAttribute('data-kind');
      const dot = row?.querySelector<HTMLElement>('.ui-awc__dot');
      const detail = row?.querySelector<HTMLElement>('.ui-awc__detail');
      const lbl = act.querySelector<HTMLElement>('.ui-awc__act-label');
      if (kind === 'needs-you') {
        dot?.setAttribute('data-kind', 'done');
        act.setAttribute('data-kind', 'done');
        if (detail) detail.textContent = 'Answered: deploying now';
        if (lbl) lbl.textContent = 'Done';
        act.setAttribute('aria-disabled', 'true');
        if (sr) sr.textContent = 'Decision sent';
      } else if (kind === 'failed') {
        act.setAttribute('aria-busy', 'true');
        if (lbl) lbl.textContent = 'Retrying…';
        scope.later(() => {
          act.removeAttribute('aria-busy');
          dot?.setAttribute('data-kind', 'done');
          act.setAttribute('data-kind', 'done');
          if (detail) detail.textContent = 'Passed on retry';
          if (lbl) lbl.textContent = 'Open';
        }, 500);
      } else if (lbl) {
        const orig = lbl.textContent || 'Open';
        lbl.textContent = 'Opened';
        scope.later(() => { lbl.textContent = orig; }, 900);
      }
    }
  });

  return () => scope.dispose();
}

// 9. BILLING SCHEDULE
export function enhanceBillingSchedule(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-bsc');
  if (!root) return () => {};

  const startBtn = root.querySelector<HTMLButtonElement>('.ui-bsc__input');
  const startVal = root.querySelector<HTMLElement>('#ui-bsc-start-value');
  const headerDate = root.querySelector<HTMLElement>('.ui-bsc__date');
  const headerEnd = root.querySelector<HTMLElement>('.ui-bsc__end');
  const durBtn = root.querySelector<HTMLButtonElement>('.ui-bsc__select');
  const rowsList = root.querySelector<HTMLElement>('.ui-bsc__rows, tbody');
  const totals = [...root.querySelectorAll<HTMLElement>('.ui-bsc__total b')];

  const DURATIONS = [
    { label: 'Milestone', months: 1 },
    { label: '1 month', months: 1 },
    { label: '3 months', months: 3 },
    { label: '6 months', months: 6 },
    { label: '12 months', months: 12 },
  ];
  const CATALOG = [
    { name: 'Set-up fee', price: 4999, repeat: 'Once' },
    { name: 'Platform licence', price: 1200, repeat: 'Monthly' },
    { name: 'Premium support', price: 350, repeat: 'Monthly' },
    { name: 'Extra seats (10)', price: 240, repeat: 'Monthly' },
    { name: 'Onboarding workshop', price: 1500, repeat: 'Once' },
  ];

  let months = 1;
  let discountPct = 0;
  let openMenu: HTMLElement | null = null;
  let openTrigger: HTMLElement | null = null;

  const fmtMoney = (n: number) =>
    '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const recalc = () => {
    const inputs = [...root.querySelectorAll<HTMLInputElement>('.ui-bsc__rows input[type="text"], .ui-bsc__rows input:not([type])')];
    let first = 0;
    let total = 0;
    inputs.forEach((inp) => {
      const row = inp.closest<HTMLElement>('[role="row"], .ui-bsc__row, tr');
      if (row?.hasAttribute('data-discount')) return;
      const num = parseFloat(inp.value.replace(/[^0-9.]/g, '')) || 0;
      const rep = row?.querySelector('.ui-bsc__inline')?.textContent?.trim() || 'Once';
      first += num;
      total += rep === 'Monthly' ? num * months : rep === 'Quarterly' ? num * Math.max(1, Math.ceil(months / 3)) : num;
    });
    const mult = 1 - discountPct / 100;
    if (totals[0]) totals[0].textContent = fmtMoney(first * mult);
    if (totals[1]) totals[1].textContent = fmtMoney(total * mult);
  };

  const closeMenu = () => {
    openMenu?.remove();
    openMenu = null;
    openTrigger?.setAttribute('aria-expanded', 'false');
    openTrigger = null;
  };

  const showMenu = (anchor: HTMLElement, itemsHtml: string, onPick: (el: HTMLElement) => void) => {
    closeMenu();
    const wrap = anchor.closest<HTMLElement>('.ui-bsc__dd') || anchor.parentElement;
    if (!wrap) return;
    wrap.style.position = 'relative';
    const menu = document.createElement('div');
    menu.className = 'ui-bsc__menu';
    menu.setAttribute('role', 'listbox');
    menu.style.cssText = 'position:absolute;left:0;top:calc(100% + 4px);z-index:30;min-width:190px;background:#fff;border-radius:8px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 10px 24px -8px rgba(0,0,0,0.18);padding:4px;';
    menu.innerHTML = itemsHtml;
    wrap.appendChild(menu);
    anchor.setAttribute('aria-expanded', 'true');
    openMenu = menu;
    openTrigger = anchor;
    scope.on(menu, 'click', (me) => {
      const opt = (me.target as Element | null)?.closest<HTMLElement>('[data-opt]');
      if (!opt) return;
      onPick(opt);
      closeMenu();
    });
  };

  scope.on(startBtn, 'click', (e) => {
    e.stopPropagation();
    if (!startBtn) return;
    const days = Array.from({ length: 31 }, (_, i) => i + 1)
      .map((d) => `<button type="button" data-opt="${d}" style="width:28px;height:26px;border-radius:5px;font-size:12px">${d}</button>`)
      .join('');
    showMenu(
      startBtn,
      `<div style="padding:4px 6px;font-weight:500;font-size:12px">January 2026</div><div style="display:grid;grid-template-columns:repeat(7,28px);gap:2px">${days}</div>`,
      (opt) => {
        const d = opt.getAttribute('data-opt');
        const txt = `${d} Jan 2026`;
        if (startVal) startVal.textContent = txt;
        if (headerDate) headerDate.textContent = txt;
      }
    );
  });

  scope.on(durBtn, 'click', (e) => {
    e.stopPropagation();
    if (!durBtn) return;
    const html = DURATIONS.map(
      (d) => `<button type="button" role="option" data-opt="${d.label}" data-m="${d.months}" style="display:block;width:100%;text-align:left;padding:6px 8px;border-radius:6px;font-size:12px">${d.label}</button>`
    ).join('');
    showMenu(durBtn, html, (opt) => {
      const lbl = opt.getAttribute('data-opt') || 'Milestone';
      months = Number(opt.getAttribute('data-m') || '1');
      const span = durBtn.querySelector('.ui-bsc__select-label') || durBtn;
      if (span) span.textContent = lbl;
      if (headerEnd) headerEnd.textContent = lbl;
      recalc();
    });
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const rm = t?.closest<HTMLButtonElement>('.ui-bsc__remove');
    if (rm) {
      const row = rm.closest<HTMLElement>('[role="row"], .ui-bsc__row, tr');
      if (row?.hasAttribute('data-discount')) discountPct = 0;
      row?.remove();
      recalc();
      return;
    }
    const inl = t?.closest<HTMLButtonElement>('.ui-bsc__inline');
    if (inl) {
      e.stopPropagation();
      const opts = inl.textContent?.includes('Billed')
        ? ['Billed in advance', 'Billed in arrears']
        : ['Once', 'Monthly', 'Quarterly', 'Yearly'];
      showMenu(
        inl,
        opts.map((o) => `<button type="button" role="option" data-opt="${o}" style="display:block;width:100%;text-align:left;padding:5px 8px;border-radius:6px;font-size:12px">${o}</button>`).join(''),
        (opt) => {
          const v = opt.getAttribute('data-opt') || opts[0];
          inl.childNodes[0].textContent = v;
          recalc();
        }
      );
      return;
    }
    const btn = t?.closest<HTMLButtonElement>('.ui-bsc__btn');
    if (btn) {
      const txt = btn.textContent?.trim() || '';
      if (txt.includes('Add product')) {
        e.stopPropagation();
        const html = CATALOG.map(
          (c, i) => `<button type="button" role="option" data-opt="${i}" style="display:flex;justify-content:space-between;width:100%;gap:12px;padding:6px 8px;border-radius:6px;font-size:12px"><span>${c.name}</span><span style="opacity:0.6">${fmtMoney(c.price)} · ${c.repeat.toLowerCase()}</span></button>`
        ).join('');
        showMenu(btn, html, (opt) => {
          const item = CATALOG[Number(opt.getAttribute('data-opt'))];
          if (!item || !rowsList) return;
          const row = document.createElement('div');
          row.className = 'ui-bsc__row';
          row.setAttribute('role', 'row');
          row.style.cssText = 'display:grid;grid-template-columns:1fr auto auto auto;align-items:center;gap:8px;padding:8px 0;border-top:0.5px solid rgba(0,0,0,0.06)';
          row.innerHTML = `<span style="font-weight:500">${item.name}</span><button type="button" class="ui-bsc__inline">${item.repeat}</button><input type="text" value="${item.price.toFixed(2)}" style="width:90px;text-align:right;padding:3px 6px;border:0.5px solid rgba(0,0,0,0.12);border-radius:6px" /><button type="button" class="ui-bsc__remove" aria-label="Remove ${item.name}">×</button>`;
          rowsList.appendChild(row);
          recalc();
        });
      } else if (txt.includes('Add discount') && rowsList && !rowsList.querySelector('[data-discount]')) {
        discountPct = 10;
        const row = document.createElement('div');
        row.className = 'ui-bsc__row';
        row.setAttribute('data-discount', 'true');
        row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-top:0.5px solid rgba(0,0,0,0.06);font-size:12px';
        row.innerHTML = `<span><b>Discount</b> · Whole phase</span><span><input type="number" value="10" min="0" max="100" data-disc-in style="width:48px;text-align:right;padding:2px 4px;border:0.5px solid rgba(0,0,0,0.12);border-radius:5px" /> % off <button type="button" class="ui-bsc__remove" style="margin-left:6px">×</button></span>`;
        rowsList.appendChild(row);
        recalc();
      } else if (txt.includes('Add minimum') && rowsList && !rowsList.querySelector('[data-min]')) {
        const row = document.createElement('div');
        row.className = 'ui-bsc__row';
        row.setAttribute('data-min', 'true');
        row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-top:0.5px solid rgba(0,0,0,0.06);font-size:12px';
        row.innerHTML = `<span><b>Minimum spend</b> · $2,500.00</span><button type="button" class="ui-bsc__remove">×</button>`;
        rowsList.appendChild(row);
      }
    }
  });

  scope.on(root, 'input', (e) => {
    const inp = (e.target as Element | null)?.closest<HTMLInputElement>('input');
    if (!inp) return;
    if (inp.hasAttribute('data-disc-in')) discountPct = Math.max(0, Math.min(100, Number(inp.value) || 0));
    recalc();
  });

  scope.on(document, 'click', (e) => {
    if (openMenu && !openMenu.contains(e.target as Node)) closeMenu();
  });

  return () => scope.dispose();
}

// 10. DELEGATE BOARD
export function enhanceDelegateBoard(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-dbc');
  if (!root) return () => {};

  const autoSw = root.querySelector<HTMLButtonElement>('.ui-dbc__auto');
  const hintEl = root.querySelector<HTMLElement>('.ui-dbc__hint');
  const countEl = root.querySelector<HTMLElement>('.ui-dbc__count');
  const taskList = root.querySelector<HTMLUListElement>('.ui-dbc__tasks');
  const agents = [...root.querySelectorAll<HTMLLIElement>('.ui-dbc__agent')];
  const sr = root.querySelector<HTMLElement>('.ui-dbc__sr[aria-live]');

  let pickedSlot: HTMLLIElement | null = taskList?.querySelector<HTMLLIElement>('.ui-dbc__task-slot') || null;

  const syncCounts = () => {
    const unassigned = taskList?.querySelectorAll('.ui-dbc__task').length ?? 0;
    if (countEl) countEl.textContent = String(unassigned);
    agents.forEach((ag) => {
      const q = ag.querySelector('.ui-dbc__queue');
      const n = q?.children.length ?? 0;
      const tag = ag.querySelector<HTMLElement>('.ui-dbc__tag');
      if (tag) {
        tag.setAttribute('data-kind', n > 0 ? 'busy' : 'free');
        tag.textContent = n > 0 ? `${n} queued` : 'Free';
      }
    });
  };

  const assignTaskToAgent = (slot: HTMLLIElement, agent: HTMLLIElement) => {
    const btn = slot.querySelector<HTMLButtonElement>('.ui-dbc__task');
    const title = btn?.querySelector('.ui-dbc__task-title, span:nth-child(2)')?.textContent?.trim() || btn?.textContent?.trim().split('~')[0]?.trim() || 'Task';
    const queue = agent.querySelector<HTMLUListElement>('.ui-dbc__queue');
    if (!queue) return;
    const chipLi = document.createElement('li');
    chipLi.innerHTML = `<button type="button" class="ui-dbc__chip" data-assigned-title="${title}">${title}</button>`;
    queue.appendChild(chipLi);
    slot.remove();
    pickedSlot = taskList?.querySelector<HTMLLIElement>('.ui-dbc__task-slot') || null;
    syncCounts();
    if (sr) sr.textContent = `Assigned ${title}`;
  };

  scope.on(autoSw, 'click', () => {
    const on = autoSw?.getAttribute('aria-checked') !== 'true';
    autoSw?.setAttribute('aria-checked', String(on));
    if (hintEl) hintEl.textContent = on ? 'New tasks go to whoever is free first' : 'Drag a task onto an agent';
    if (on) {
      const slots = [...(taskList?.querySelectorAll<HTMLLIElement>('.ui-dbc__task-slot') || [])];
      slots.slice(0, 2).forEach((s) => {
        const least = [...agents].sort((a, b) => (a.querySelector('.ui-dbc__queue')?.children.length ?? 0) - (b.querySelector('.ui-dbc__queue')?.children.length ?? 0))[0];
        if (least) assignTaskToAgent(s, least);
      });
    }
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const taskBtn = t?.closest<HTMLButtonElement>('.ui-dbc__task');
    if (taskBtn) {
      const slot = taskBtn.closest<HTMLLIElement>('.ui-dbc__task-slot');
      if (slot) {
        if (pickedSlot === slot && agents.length) {
          const least = [...agents].sort((a, b) => (a.querySelector('.ui-dbc__queue')?.children.length ?? 0) - (b.querySelector('.ui-dbc__queue')?.children.length ?? 0))[0];
          assignTaskToAgent(slot, least);
        } else {
          taskList?.querySelectorAll('.ui-dbc__task').forEach((b) => b.removeAttribute('data-picked'));
          taskBtn.setAttribute('data-picked', '');
          pickedSlot = slot;
        }
      }
      return;
    }
    const chip = t?.closest<HTMLButtonElement>('.ui-dbc__chip');
    if (chip && taskList) {
      const title = chip.getAttribute('data-assigned-title') || chip.textContent?.trim() || 'Task';
      const slot = document.createElement('li');
      slot.className = 'ui-dbc__task-slot';
      slot.innerHTML = `<button type="button" class="ui-dbc__task"><span class="ui-dbc__task-title">${title}</span><span class="ui-dbc__task-eta">~12 min</span></button>`;
      taskList.appendChild(slot);
      chip.closest('li')?.remove();
      syncCounts();
      return;
    }
    const ag = t?.closest<HTMLLIElement>('.ui-dbc__agent');
    if (ag && pickedSlot) {
      assignTaskToAgent(pickedSlot, ag);
    }
  });

  return () => scope.dispose();
}

// 11. PROJECT CARD
export function enhanceProjectCard(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-pcc');
  if (!root) return () => {};

  const toggleBtn = root.querySelector<HTMLButtonElement>('.ui-pcc__toggle');
  const statusBtn = root.querySelector<HTMLButtonElement>('.ui-pcc__status');
  const statusText = root.querySelector<HTMLElement>('.ui-pcc__status-text');
  const statusFold = root.querySelector<HTMLElement>('.ui-pcc__fold--status');
  const members = [...root.querySelectorAll<HTMLButtonElement>('.ui-pcc__member')];
  const tasks = [...root.querySelectorAll<HTMLButtonElement>('.ui-pcc__task')];
  const segs = [...root.querySelectorAll<SVGElement>('.ui-pcc__seg')];
  const numEl = root.querySelector<HTMLElement>('.ui-pcc__num');
  const captionSpan = root.querySelector<HTMLElement>('.ui-pcc__caption span');

  let activeMember: string | null = null;

  const syncTasks = () => {
    const done = tasks.filter((t) => t.getAttribute('aria-checked') === 'true').length;
    const left = tasks.length - done;
    if (numEl) numEl.textContent = String(done);
    if (captionSpan) captionSpan.textContent = left === 0 ? 'All done' : `${left} left`;
    segs.forEach((s, i) => {
      if (tasks[i]?.getAttribute('aria-checked') === 'true') s.setAttribute('data-done', '');
      else s.removeAttribute('data-done');
    });
    tasks.forEach((t) => {
      const init = t.querySelector('.ui-pcc__avatar')?.textContent?.trim() || '';
      if (activeMember && init !== activeMember) t.setAttribute('data-dim', '');
      else t.removeAttribute('data-dim');
    });
  };

  scope.on(toggleBtn, 'click', () => {
    const open = !root.hasAttribute('data-open');
    if (open) root.setAttribute('data-open', '');
    else root.removeAttribute('data-open');
    toggleBtn?.setAttribute('aria-expanded', String(open));
  });

  scope.on(statusBtn, 'click', (e) => {
    e.stopPropagation();
    const open = statusBtn?.getAttribute('aria-expanded') !== 'true';
    statusBtn?.setAttribute('aria-expanded', String(open));
    if (open) statusFold?.setAttribute('data-open', '');
    else statusFold?.removeAttribute('data-open');
  });

  wireRadioGroup(
    statusFold,
    '.ui-pcc__option',
    (btn) => {
      const label = btn.textContent?.trim() || '';
      const tone = btn.getAttribute('data-tone') || 'amber';
      if (statusText) statusText.textContent = label;
      statusBtn?.setAttribute('data-tone', tone);
      statusBtn?.setAttribute('aria-expanded', 'false');
      statusFold?.removeAttribute('data-open');
    },
    scope
  );

  members.forEach((m) => {
    scope.on(m, 'click', (e) => {
      e.stopPropagation();
      const letter = m.textContent?.trim() || '';
      activeMember = activeMember === letter ? null : letter;
      members.forEach((b) => {
        const l = b.textContent?.trim() || '';
        const on = activeMember === l;
        b.setAttribute('aria-pressed', String(on));
        if (on) { b.setAttribute('data-on', ''); b.removeAttribute('data-off'); }
        else if (activeMember) { b.removeAttribute('data-on'); b.setAttribute('data-off', ''); }
        else { b.removeAttribute('data-on'); b.removeAttribute('data-off'); }
      });
      syncTasks();
    });
  });

  tasks.forEach((task) => {
    scope.on(task, 'click', () => {
      const next = task.getAttribute('aria-checked') !== 'true';
      task.setAttribute('aria-checked', String(next));
      syncTasks();
    });
  });

  return () => scope.dispose();
}
