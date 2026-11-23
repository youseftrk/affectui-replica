import { createScope, wireRadioGroup } from './utils';

// 1. AI ANSWER
export function enhanceAiAnswer(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-ansc');
  if (!root) return () => {};

  const foot = root.querySelector<HTMLElement>('.ui-ansc__foot');
  const reasons = root.querySelector<HTMLElement>('.ui-ansc__reasons');
  const origFoot = foot?.innerHTML || '';
  let pop: HTMLElement | null = null;

  const closePop = () => { pop?.remove(); pop = null; };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const cite = t?.closest<HTMLButtonElement>('.ui-ansc__cite');
    if (cite) {
      e.stopPropagation();
      if (pop) { closePop(); return; }
      cite.setAttribute('data-lit', 'true');
      pop = document.createElement('div');
      pop.className = 'ui-ansc__pop';
      pop.setAttribute('role', 'tooltip');
      pop.style.cssText = 'position:absolute;left:20px;bottom:56px;z-index:20;max-width:340px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 10px 28px -8px rgba(0,0,0,0.18);padding:8px 10px;font-size:12px;display:grid;gap:6px;';
      pop.innerHTML = `<a class="ui-ansc__pop-item" href="https://www.notion.so" target="_blank" rel="noreferrer" style="display:block;text-decoration:none;color:inherit"><b>1 · Notion</b> <span style="opacity:0.6">notion.so</span><div>Offsite plan – shortlist and budget</div></a><a class="ui-ansc__pop-item" href="https://en.wikipedia.org" target="_blank" rel="noreferrer" style="display:block;text-decoration:none;color:inherit"><b>3 · Wikipedia</b> <span style="opacity:0.6">en.wikipedia.org</span><div>Alfama – the oldest district of Lisbon</div></a>`;
      root.appendChild(pop);
      return;
    }
    if (t?.closest('.ui-ansc__stop')) {
      root.setAttribute('data-phase', 'stopped');
      if (foot) {
        foot.innerHTML = `<div style="display:flex;align-items:center;gap:6px;width:100%"><span style="font-size:12px;opacity:0.6">Stopped</span><span style="flex:1"></span><button type="button" class="ui-ansc__action" data-fb="good" aria-label="Good answer" aria-pressed="false" style="padding:3px 8px;border-radius:6px;font-size:12px">Helpful</button><button type="button" class="ui-ansc__action" data-fb="bad" aria-label="Bad answer" aria-pressed="false" style="padding:3px 8px;border-radius:6px;font-size:12px">Not helpful</button><button type="button" class="ui-ansc__action" data-retry style="padding:3px 8px;border-radius:6px;font-size:12px">Retry</button></div>`;
      }
      return;
    }
    const act = t?.closest<HTMLButtonElement>('.ui-ansc__action');
    if (act) {
      if (act.hasAttribute('data-retry')) {
        root.setAttribute('data-phase', 'writing');
        if (foot) foot.innerHTML = origFoot;
        reasons?.setAttribute('data-open', 'false');
        return;
      }
      const fb = act.getAttribute('data-fb');
      root.querySelectorAll('.ui-ansc__action[data-fb]').forEach((b) => b.setAttribute('aria-pressed', String(b === act)));
      if (fb === 'bad') reasons?.setAttribute('data-open', 'true');
      else reasons?.setAttribute('data-open', 'false');
      return;
    }
    const reasonBtn = t?.closest<HTMLButtonElement>('.ui-ansc__reasons button');
    if (reasonBtn && reasons) {
      reasons.setAttribute('data-open', 'false');
      if (foot) {
        const msg = document.createElement('span');
        msg.style.cssText = 'font-size:12px;opacity:0.7;margin-left:8px';
        msg.textContent = 'Thanks for the feedback';
        foot.appendChild(msg);
      }
    }
  });

  scope.on(document, 'click', (e) => {
    if (pop && !pop.contains(e.target as Node)) closePop();
  });

  return () => scope.dispose();
}

// 2. CHAT COMPOSER
export function enhanceChatComposer(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-ccc');
  if (!root) return () => {};

  const body = root.querySelector<HTMLElement>('.ui-ccc__body');
  const textarea = root.querySelector<HTMLTextAreaElement>('.ui-ccc__message');
  const menus = [...root.querySelectorAll<HTMLElement>('.ui-ccc__menu')];
  const sr = root.querySelector<HTMLElement>('.ui-ccc__sr-only');
  const heard = root.querySelector<HTMLElement>('.ui-ccc__heard');

  const closeAll = () => {
    menus.forEach((m) => m.setAttribute('data-open', 'false'));
    root.querySelectorAll('[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  };

  const openMenuFor = (btn: HTMLElement, menuIdx: number) => {
    const wasOpen = btn.getAttribute('aria-expanded') === 'true';
    closeAll();
    if (!wasOpen) {
      btn.setAttribute('aria-expanded', 'true');
      const m = menus[Math.min(menuIdx, menus.length - 1)];
      if (m) m.setAttribute('data-open', 'true');
    }
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const addBtn = t?.closest<HTMLButtonElement>('.ui-ccc__icon-btn[aria-label="Add"]');
    if (addBtn) { e.stopPropagation(); openMenuFor(addBtn, 0); return; }

    const appBtn = t?.closest<HTMLButtonElement>('.ui-ccc__approval');
    if (appBtn) { e.stopPropagation(); openMenuFor(appBtn, 1); return; }

    const modBtn = t?.closest<HTMLButtonElement>('.ui-ccc__model');
    if (modBtn) { e.stopPropagation(); openMenuFor(modBtn, 2); return; }

    const folderBtn = t?.closest<HTMLButtonElement>('.ui-ccc__row--folder');
    if (folderBtn) { e.stopPropagation(); openMenuFor(folderBtn, 3); return; }

    const appsBtn = t?.closest<HTMLButtonElement>('.ui-ccc__row--apps');
    if (appsBtn) { e.stopPropagation(); openMenuFor(appsBtn, 4); return; }

    const voiceBtn = t?.closest<HTMLButtonElement>('.ui-ccc__icon-btn[aria-label="Voice input"]');
    if (voiceBtn && body) {
      closeAll();
      const rec = body.getAttribute('data-recording') !== 'true';
      body.setAttribute('data-recording', String(rec));
      if (heard) heard.textContent = rec ? 'Draft a launch update for the Q3 release…' : '';
      if (sr) sr.textContent = rec ? 'Recording. Press Escape to discard.' : '';
      return;
    }

    const discardBtn = t?.closest<HTMLButtonElement>('.ui-ccc__button[aria-label="Discard recording"]');
    if (discardBtn && body) {
      body.setAttribute('data-recording', 'false');
      if (heard) heard.textContent = '';
      if (sr) sr.textContent = 'Recording discarded.';
      return;
    }

    const useRecBtn = t?.closest<HTMLButtonElement>('.ui-ccc__send');
    if (useRecBtn && body) {
      if (body.getAttribute('data-recording') === 'true') {
        body.setAttribute('data-recording', 'false');
        if (textarea) textarea.value = heard?.textContent || 'Draft a launch update for the Q3 release';
        if (heard) heard.textContent = '';
      } else if (textarea?.value.trim()) {
        if (sr) sr.textContent = `Sent: ${textarea.value.trim()}`;
        textarea.value = '';
      }
      return;
    }

    const opt = t?.closest<HTMLElement>('.ui-ccc__option');
    if (opt) {
      const role = opt.getAttribute('role');
      const name = opt.querySelector('.ui-ccc__option-name')?.textContent?.trim() || opt.textContent?.trim() || '';
      if (role === 'menuitemcheckbox') {
        const next = opt.getAttribute('aria-checked') !== 'true';
        opt.setAttribute('aria-checked', String(next));
        if (next) opt.setAttribute('data-checked', '');
        else opt.removeAttribute('data-checked');
        const checkedCount = opt.closest('.ui-ccc__menu')?.querySelectorAll('[aria-checked="true"]').length ?? 0;
        const rowApps = root.querySelector<HTMLElement>('.ui-ccc__row--apps');
        const sub = rowApps?.querySelector<HTMLElement>('.ui-ccc__row-sub, span:last-child');
        if (sub && checkedCount > 0) sub.textContent = `${checkedCount} connected`;
        return;
      }
      const menu = opt.closest<HTMLElement>('.ui-ccc__menu');
      menu?.querySelectorAll('.ui-ccc__option').forEach((o) => {
        o.setAttribute('aria-selected', String(o === opt));
        if (o === opt) o.setAttribute('data-checked', '');
        else o.removeAttribute('data-checked');
      });
      const expandedBtn = root.querySelector<HTMLElement>('[aria-expanded="true"]');
      if (expandedBtn?.classList.contains('ui-ccc__approval')) {
        const lbl = expandedBtn.querySelector('.ui-ccc__approval-label, .ui-ccc__approval-face span:last-child');
        if (lbl) lbl.textContent = name;
        if (opt.getAttribute('data-tone') === 'alert') expandedBtn.setAttribute('data-tone', 'alert');
        else expandedBtn.removeAttribute('data-tone');
      } else if (expandedBtn?.classList.contains('ui-ccc__model')) {
        const lbl = expandedBtn.querySelector('.ui-ccc__model-label, .ui-ccc__model-face');
        if (lbl) lbl.textContent = name;
      } else if (expandedBtn?.classList.contains('ui-ccc__row--folder')) {
        const lbl = expandedBtn.querySelector('span');
        if (lbl) lbl.textContent = name;
      }
      closeAll();
    }
  });

  scope.on(document, 'click', (e) => {
    if (!root.contains(e.target as Node)) closeAll();
  });
  scope.on(document, 'keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Escape') {
      closeAll();
      body?.setAttribute('data-recording', 'false');
    }
  });

  return () => scope.dispose();
}

// 3. CITED ANSWER
export function enhanceCitedAnswer(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-cac');
  if (!root) return () => {};

  const markers = [...root.querySelectorAll<HTMLButtonElement>('.ui-cac__marker')];
  const chips = [...root.querySelectorAll<HTMLButtonElement>('.ui-cac__chip')];
  const segs = [...root.querySelectorAll<HTMLElement>('.ui-cac__seg')];
  const fold = root.querySelector<HTMLElement>('.ui-cac__fold');
  const clip = fold?.querySelector<HTMLElement>('.ui-cac__clip');
  const cap = root.querySelector<HTMLElement>('.ui-cac__caption .ui-cac__swap-item');
  const followBtn = root.querySelector<HTMLButtonElement>('.ui-cac__action');

  const SOURCES: Record<string, { name: string; domain: string; date: string; title: string; quote: string }> = {
    caching: {
      name: 'Tokenwise',
      domain: 'tokenwise.dev',
      date: 'Sep 18, 2026',
      title: 'Prompt caching, explained: what gets stored and for how long',
      quote: 'With a cached prefix over 10,000 tokens, providers skip prefill computation — cutting TTFT by 65–85% in production tests.',
    },
    prompts: {
      name: 'Latency Notes',
      domain: 'latencynotes.io',
      date: 'Aug 2, 2026',
      title: 'Designing cache-friendly prompts',
      quote: 'Keep the stable part — system instructions, tool definitions, and static context — at the very top of your prompt.',
    },
    semantic: {
      name: 'Inference Weekly',
      domain: 'inferenceweekly.com',
      date: 'Jul 24, 2026',
      title: 'Semantic caching for LLM apps in production',
      quote: 'Across support traffic, semantic caching answered 31% of incoming requests directly with sub-50ms latency.',
    },
  };

  let openKey: string | null = null;

  const setSource = (key: string | null) => {
    openKey = key;
    markers.forEach((m) => {
      const match = key && m.getAttribute('data-source') === key;
      m.setAttribute('aria-expanded', String(!!match));
      if (match) m.setAttribute('data-lit', '');
      else m.removeAttribute('data-lit');
    });
    chips.forEach((c) => {
      const match = key && c.getAttribute('data-source') === key;
      c.setAttribute('aria-expanded', String(!!match));
      if (match) { c.setAttribute('data-lit', ''); c.removeAttribute('data-dim'); }
      else if (key) { c.removeAttribute('data-lit'); c.setAttribute('data-dim', ''); }
      else { c.removeAttribute('data-lit'); c.removeAttribute('data-dim'); }
    });
    segs.forEach((s) => {
      const src = s.querySelector('.ui-cac__marker')?.getAttribute('data-source');
      if (!key) { s.removeAttribute('data-dim'); s.removeAttribute('data-hl'); }
      else if (src === key) { s.setAttribute('data-hl', ''); s.removeAttribute('data-dim'); }
      else { s.removeAttribute('data-hl'); s.setAttribute('data-dim', ''); }
    });
    if (key && SOURCES[key] && fold && clip) {
      const d = SOURCES[key];
      clip.innerHTML = `<div style="padding:10px 12px;margin-top:8px;border-radius:8px;background:rgba(0,0,0,0.025);font-size:12px;line-height:1.45"><div style="display:flex;justify-content:space-between;opacity:0.6;font-size:11px;margin-bottom:3px"><span>${d.domain}</span><span>${d.date}</span></div><div style="font-weight:500;margin-bottom:4px">${d.title}</div><div style="opacity:0.75">“${d.quote}”</div></div>`;
      fold.setAttribute('data-open', '');
      fold.removeAttribute('inert');
      if (cap) cap.innerHTML = `<b>${d.name}</b> <span class="ui-cac__dot">·</span> ${d.title}`;
    } else if (fold) {
      fold.removeAttribute('data-open');
      fold.setAttribute('inert', '');
    }
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const srcEl = t?.closest<HTMLButtonElement>('.ui-cac__marker, .ui-cac__chip');
    if (srcEl) {
      const key = srcEl.getAttribute('data-source') || 'caching';
      setSource(openKey === key ? null : key);
      return;
    }
    if (t?.closest('.ui-cac__action') && followBtn) {
      const lbl = followBtn.querySelector('.ui-cac__action-label');
      if (lbl) {
        const orig = lbl.textContent || 'Follow up';
        lbl.textContent = 'Asked ✓';
        scope.later(() => { lbl.textContent = orig; }, 1100);
      }
    }
  });

  return () => scope.dispose();
}

// 4. COLLABORATION STREAM
export function enhanceCollaborationStream(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-crsc');
  if (!root) return () => {};

  const scroll = root.querySelector<HTMLElement>('.ui-crsc__scroll');
  if (scroll) scroll.scrollTop = scroll.scrollHeight;

  const tabs = [...root.querySelectorAll<HTMLButtonElement>('.ui-crsc__tab')];
  const field = root.querySelector<HTMLTextAreaElement>('.ui-crsc__field');
  const sendBtn = root.querySelector<HTMLButtonElement>('.ui-crsc__send');
  const atBtn = root.querySelector<HTMLButtonElement>('.ui-crsc__at-btn');
  const forEl = root.querySelector<HTMLElement>('.ui-crsc__for');
  const composer = root.querySelector<HTMLElement>('.ui-crsc__composer');

  let activeMenu: HTMLElement | null = null;
  let activeModal: HTMLElement | null = null;
  const AGENTS = [
    { name: 'Orchestrator', model: 'Gemini 3.8' },
    { name: 'Researcher', model: 'Gemini 3.8 Flash' },
    { name: 'Writer', model: 'Sonnet 5.5' },
    { name: 'Coder', model: 'Opus 5.5' },
  ];

  const closeMenu = () => {
    activeMenu?.remove();
    activeMenu = null;
    atBtn?.setAttribute('aria-expanded', 'false');
  };

  const sendMessage = () => {
    const val = field?.value.trim();
    if (!val || !scroll) return;
    const msg = document.createElement('div');
    msg.className = 'ui-crsc__msg';
    msg.setAttribute('data-you', '');
    msg.innerHTML = `<div class="ui-crsc__msg-head"><b>You</b> <span style="opacity:0.5;font-size:11px">just now</span></div><div class="ui-crsc__msg-body">${val}</div>`;
    scroll.appendChild(msg);
    scroll.scrollTop = scroll.scrollHeight;
    if (field) field.value = '';
    if (sendBtn) sendBtn.disabled = true;
  };

  scope.on(field, 'input', () => {
    if (sendBtn) sendBtn.disabled = !(field?.value.trim());
  });
  scope.on(field, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'Enter' && !ke.shiftKey) { ke.preventDefault(); sendMessage(); }
  });
  scope.on(sendBtn, 'click', sendMessage);

  scope.on(atBtn, 'click', (e) => {
    e.stopPropagation();
    if (activeMenu) { closeMenu(); return; }
    if (!composer) return;
    composer.style.position = 'relative';
    activeMenu = document.createElement('ul');
    activeMenu.className = 'ui-crsc__menu';
    activeMenu.setAttribute('role', 'listbox');
    activeMenu.style.cssText = 'position:absolute;left:8px;bottom:calc(100% + 6px);z-index:25;min-width:210px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 10px 26px -8px rgba(0,0,0,0.18);padding:4px;list-style:none;margin:0;';
    activeMenu.innerHTML = AGENTS.map(
      (a, i) => `<li role="option" class="ui-crsc__option" aria-selected="${i === 0}" data-agent="${a.name}" style="display:flex;justify-content:space-between;padding:6px 8px;border-radius:6px;cursor:pointer;font-size:12px"><b>${a.name}</b><span style="opacity:0.55">${a.model}</span></li>`
    ).join('');
    composer.appendChild(activeMenu);
    atBtn?.setAttribute('aria-expanded', 'true');
    scope.on(activeMenu, 'click', (me) => {
      const opt = (me.target as Element | null)?.closest<HTMLElement>('[data-agent]');
      if (!opt) return;
      const ag = opt.getAttribute('data-agent') || '';
      if (field) {
        field.value = `@${ag} ${field.value}`;
        field.focus();
        if (sendBtn) sendBtn.disabled = false;
      }
      if (forEl) forEl.textContent = `to ${ag}`;
      closeMenu();
    });
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const tab = t?.closest<HTMLButtonElement>('.ui-crsc__tab');
    if (tab) {
      const who = (tab.getAttribute('title') || tab.textContent || '').trim();
      tabs.forEach((b) => { b.setAttribute('aria-pressed', String(b === tab)); b.tabIndex = b === tab ? 0 : -1; });
      const msgs = [...root.querySelectorAll<HTMLElement>('.ui-crsc__msg')];
      msgs.forEach((m) => {
        if (who === 'Everyone') { m.style.display = ''; return; }
        m.style.display = (m.textContent || '').includes(who) ? '' : 'none';
      });
      return;
    }
    const fileBtn = t?.closest<HTMLButtonElement>('.ui-crsc__file');
    if (fileBtn) {
      e.stopPropagation();
      activeModal?.remove();
      const label = fileBtn.textContent?.trim() || 'File';
      const isCsv = label.includes('.csv');
      activeModal = document.createElement('div');
      activeModal.className = 'ui-crsc__window';
      activeModal.setAttribute('role', 'dialog');
      activeModal.style.cssText = 'position:absolute;inset:44px 16px auto 16px;z-index:30;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 16px 36px -12px rgba(0,0,0,0.22);padding:12px;font-size:12px;';
      activeModal.innerHTML = isCsv
        ? `<div style="display:flex;justify-content:space-between;margin-bottom:8px"><b>${label}</b><button type="button" data-close-win>✕</button></div><table style="width:100%;border-collapse:collapse;font-size:11px"><tr><th align="left">Product</th><th align="left">Free</th><th>Seat</th><th>Annual</th></tr><tr><td>Linear</td><td>250 issues</td><td align="center">$10</td><td align="center">$8</td></tr><tr><td>Notion</td><td>10 guests</td><td align="center">$12</td><td align="center">$10</td></tr><tr><td>Figma</td><td>3 files</td><td align="center">$15</td><td align="center">$12</td></tr></table>`
        : `<div style="display:flex;justify-content:space-between;margin-bottom:8px"><b>${label}</b><button type="button" data-close-win>✕</button></div><div style="font-family:monospace;font-size:11px;display:grid;gap:4px;opacity:0.8"><div>"linear pricing per seat 2026"</div><div>"notion plus plan price per member"</div><div>"figma professional seat price"</div><div>"linear free plan limits"</div></div>`;
      root.style.position = 'relative';
      root.appendChild(activeModal);
      return;
    }
    if (t?.closest('[data-close-win]')) {
      activeModal?.remove();
      activeModal = null;
    }
  });

  scope.on(document, 'click', (e) => {
    if (activeMenu && !composer?.contains(e.target as Node)) closeMenu();
    if (activeModal && !activeModal.contains(e.target as Node)) { activeModal.remove(); activeModal = null; }
  });

  return () => scope.dispose();
}

// 5. COMMENTS PANEL
export function enhanceCommentsPanel(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-cpc');
  if (!root) return () => {};

  const tabs = [...root.querySelectorAll<HTMLButtonElement>('.ui-cpc__tab')];
  const sortWrap = root.querySelector<HTMLElement>('.ui-cpc__sort');
  const sortBtn = sortWrap?.querySelector<HTMLButtonElement>('.ui-cpc__icon-btn');
  const list = root.querySelector<HTMLUListElement>('ul');
  const form = root.querySelector<HTMLFormElement>('.ui-cpc__composer');
  const input = root.querySelector<HTMLInputElement>('.ui-cpc__input');
  const sendBtn = root.querySelector<HTMLButtonElement>('.ui-cpc__send');

  let activeTab = 0;
  let sortDir: 'newest' | 'oldest' = 'newest';
  let sortMenu: HTMLElement | null = null;

  const filterList = () => {
    if (!list) return;
    [...list.querySelectorAll<HTMLLIElement>('.ui-cpc__item')].forEach((li) => {
      const txt = li.textContent || '';
      const isEdit = txt.includes('/Edit') || !!li.querySelector('.ui-cpc__btn');
      const isQ = txt.includes('?');
      if (activeTab === 0) li.style.display = '';
      else if (activeTab === 1) li.style.display = isQ ? '' : 'none';
      else li.style.display = isEdit ? '' : 'none';
    });
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const tab = t?.closest<HTMLButtonElement>('.ui-cpc__tab');
    if (tab) {
      activeTab = tabs.indexOf(tab);
      tabs.forEach((b, i) => b.setAttribute('aria-selected', String(i === activeTab)));
      filterList();
      return;
    }
    const res = t?.closest<HTMLButtonElement>('.ui-cpc__resolve');
    if (res) {
      const next = res.getAttribute('aria-pressed') !== 'true';
      res.setAttribute('aria-pressed', String(next));
      res.setAttribute('aria-label', next ? 'Reopen comment' : 'Resolve comment');
      const item = res.closest<HTMLElement>('.ui-cpc__item');
      if (next) item?.setAttribute('data-resolved', 'true');
      else item?.removeAttribute('data-resolved');
      return;
    }
    const runBtn = t?.closest<HTMLButtonElement>('.ui-cpc__btn');
    if (runBtn && !runBtn.disabled) {
      runBtn.textContent = 'Running…';
      runBtn.disabled = true;
      scope.later(() => { runBtn.textContent = 'Applied ✓'; }, 600);
    }
  });

  const closeSort = () => { sortMenu?.remove(); sortMenu = null; sortBtn?.setAttribute('aria-expanded', 'false'); };
  scope.on(sortBtn, 'click', (e) => {
    e.stopPropagation();
    if (sortMenu) { closeSort(); return; }
    if (!sortWrap) return;
    sortWrap.style.position = 'relative';
    sortMenu = document.createElement('div');
    sortMenu.className = 'ui-cpc__menu';
    sortMenu.setAttribute('role', 'menu');
    sortMenu.style.cssText = 'position:absolute;right:0;top:calc(100% + 4px);z-index:20;min-width:130px;background:#fff;border-radius:8px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 8px 20px -6px rgba(0,0,0,0.16);padding:4px;';
    sortMenu.innerHTML = `<button type="button" role="menuitemradio" class="ui-cpc__menu-item" data-sort="newest" aria-checked="${sortDir === 'newest'}" style="display:block;width:100%;text-align:left;padding:5px 8px;border-radius:6px;font-size:12px">Newest first</button><button type="button" role="menuitemradio" class="ui-cpc__menu-item" data-sort="oldest" aria-checked="${sortDir === 'oldest'}" style="display:block;width:100%;text-align:left;padding:5px 8px;border-radius:6px;font-size:12px">Oldest first</button>`;
    sortWrap.appendChild(sortMenu);
    sortBtn?.setAttribute('aria-expanded', 'true');
    scope.on(sortMenu, 'click', (me) => {
      const mi = (me.target as Element | null)?.closest<HTMLButtonElement>('[data-sort]');
      if (!mi || !list) return;
      const next = mi.getAttribute('data-sort') as 'newest' | 'oldest';
      if (next !== sortDir) {
        sortDir = next;
        [...list.children].reverse().forEach((c) => list.appendChild(c));
      }
      closeSort();
    });
  });

  scope.on(document, 'click', (e) => { if (sortMenu && !sortWrap?.contains(e.target as Node)) closeSort(); });

  scope.on(input, 'input', () => { if (sendBtn) sendBtn.disabled = !(input?.value.trim()); });
  scope.on(form, 'submit', (e) => {
    e.preventDefault();
    const val = input?.value.trim();
    if (!val || !list) return;
    const li = document.createElement('li');
    li.className = 'ui-cpc__item';
    li.innerHTML = `<div class="ui-cpc__item-head"><b>You</b> <span style="opacity:0.5;font-size:11px">just now</span><button type="button" class="ui-cpc__resolve" aria-pressed="false" aria-label="Resolve comment" style="margin-left:auto">✓</button></div><p class="ui-cpc__text" dir="auto">${val}</p>`;
    list.prepend(li);
    if (input) input.value = '';
    if (sendBtn) sendBtn.disabled = true;
    filterList();
  });

  return () => scope.dispose();
}

// 6. RESPONSE STREAM
export function enhanceResponseStream(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-rstrc');
  if (!root) return () => {};

  const bodyP = root.querySelector<HTMLElement>('.ui-rstrc__body p, .ui-rstrc__text p');
  const mark = root.querySelector<HTMLElement>('.ui-rstrc__mark');
  const foot = root.querySelector<HTMLElement>('.ui-rstrc__foot');
  const srStatus = root.querySelector<HTMLElement>('.ui-rstrc__sr[role="status"]');
  const origFoot = foot?.innerHTML || '';

  const EXTRA = 'internal team first, monitor checkout error rates for 24 hours, then ramp gradually from 10% to 100% with an instant rollback switch ready.'.split(' ');
  let idx = 0;
  let streaming = true;

  const setStreaming = (next: boolean) => {
    streaming = next;
    root.setAttribute('data-status', streaming ? 'streaming' : 'stopped');
    if (streaming) {
      root.setAttribute('aria-busy', 'true');
      mark?.setAttribute('data-busy', 'true');
      if (foot) foot.innerHTML = origFoot;
      if (srStatus) srStatus.textContent = 'Writing an answer';
    } else {
      root.removeAttribute('aria-busy');
      mark?.removeAttribute('data-busy');
      if (foot) {
        foot.innerHTML = `<span style="font-size:12px;opacity:0.6;margin-right:auto">Stopped</span><button type="button" class="ui-rstrc__btn" data-act="continue">Continue</button><button type="button" class="ui-rstrc__btn" data-act="restart">Retry</button>`;
      }
      if (srStatus) srStatus.textContent = 'Answer stopped';
    }
  };

  scope.every(() => {
    if (!streaming || !bodyP) return;
    if (idx < EXTRA.length) {
      const span = document.createElement('span');
      span.className = 'ui-rstrc__w';
      span.textContent = EXTRA[idx++] + ' ';
      const caret = bodyP.querySelector('.ui-rstrc__caret');
      if (caret) bodyP.insertBefore(span, caret);
      else bodyP.appendChild(span);
    } else {
      streaming = false;
      root.setAttribute('data-status', 'done');
      root.removeAttribute('aria-busy');
      mark?.removeAttribute('data-busy');
      if (foot) foot.innerHTML = `<span style="font-size:12px;opacity:0.6;margin-right:auto">Done</span><button type="button" class="ui-rstrc__btn" data-act="restart">Replay</button>`;
    }
  }, 320);

  scope.on(root, 'click', (e) => {
    const btn = (e.target as Element | null)?.closest<HTMLButtonElement>('.ui-rstrc__btn');
    if (!btn) return;
    const act = btn.getAttribute('data-act');
    if (act === 'continue') {
      setStreaming(true);
    } else if (act === 'restart') {
      idx = 0;
      if (bodyP) {
        const words = [...bodyP.querySelectorAll('.ui-rstrc__w')];
        words.slice(14).forEach((w) => w.remove());
      }
      setStreaming(true);
    } else {
      setStreaming(false);
    }
  });

  scope.on(document, 'keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Escape' && streaming) setStreaming(false);
  });

  return () => scope.dispose();
}

// 7. WRITING ASSISTANT
export function enhanceWritingAssistant(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-wac');
  if (!root) return () => {};

  const content = root.querySelector<HTMLElement>('.ui-wac__content');
  const form = root.querySelector<HTMLFormElement>('.ui-wac__row');
  const fieldWrap = root.querySelector<HTMLElement>('.ui-wac__field');
  const textarea = root.querySelector<HTMLTextAreaElement>('textarea');
  const mic = root.querySelector<HTMLButtonElement>('.ui-wac__mic');
  const welcomeHtml = content?.innerHTML || '';

  const REPLIES: Record<string, string> = {
    'Polish my email': 'I tightened two sentences, fixed a tense mismatch, and moved your main ask to the first line so it reads cleanly in 10 seconds.',
    'Make it shorter': 'Trimmed 42% of the word count while keeping every date, metric, and next step intact.',
    'Fix the tone': 'Shifted from stiff to warm and direct — removed hedging phrases and kept it friendly.',
    'Draft a reply': 'Thanks for sending this over! Everything looks on track for Friday — I left two quick notes inline.',
  };

  const startPrompt = (prompt: string) => {
    if (!content) return;
    root.setAttribute('data-chat', 'true');
    if (!content.querySelector('.ui-wac__thread')) {
      content.innerHTML = '<div class="ui-wac__thread" style="display:grid;gap:10px;padding:12px 14px;font-size:13px"></div>';
    }
    const thread = content.querySelector<HTMLElement>('.ui-wac__thread')!;
    const userMsg = document.createElement('div');
    userMsg.style.cssText = 'justify-self:end;background:rgba(0,0,0,0.06);padding:6px 10px;border-radius:10px;max-width:85%';
    userMsg.textContent = prompt;
    thread.appendChild(userMsg);

    const botMsg = document.createElement('div');
    botMsg.style.cssText = 'justify-self:start;color:rgba(0,0,0,0.78);line-height:1.45';
    botMsg.textContent = 'Writing…';
    thread.appendChild(botMsg);
    if (mic) mic.disabled = true;

    scope.later(() => {
      botMsg.textContent = REPLIES[prompt] || `Here is a cleaner, crisper rewrite for “${prompt}” with tighter pacing and stronger verbs.`;
      if (mic) mic.disabled = false;
    }, 450);
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const chip = t?.closest<HTMLButtonElement>('.ui-wac__chip');
    if (chip) { startPrompt(chip.textContent?.trim() || ''); return; }
    if (t?.closest('.ui-wac__new') && content) {
      root.removeAttribute('data-chat');
      content.innerHTML = welcomeHtml;
      if (textarea) textarea.value = '';
      return;
    }
    if (t?.closest('.ui-wac__mic') && mic) {
      const listening = mic.getAttribute('aria-pressed') !== 'true';
      mic.setAttribute('aria-pressed', String(listening));
      if (listening) {
        mic.setAttribute('data-listening', 'true');
        fieldWrap?.setAttribute('data-listening', 'true');
        if (textarea) textarea.placeholder = 'Listening…';
      } else {
        mic.removeAttribute('data-listening');
        fieldWrap?.removeAttribute('data-listening');
        if (textarea) textarea.placeholder = 'Ask anything…';
      }
    }
  });

  scope.on(textarea, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (ke.key === 'Enter' && !ke.shiftKey && textarea?.value.trim()) {
      ke.preventDefault();
      const v = textarea.value.trim();
      textarea.value = '';
      startPrompt(v);
    }
  });
  scope.on(form, 'submit', (e) => {
    e.preventDefault();
    if (textarea?.value.trim()) {
      const v = textarea.value.trim();
      textarea.value = '';
      startPrompt(v);
    }
  });

  return () => scope.dispose();
}

// 8. TOASTER
export function enhanceToaster(host: HTMLElement): () => void {
  const scope = createScope();
  const list = host.querySelector<HTMLOListElement>('.ui-tsc__list, .ui-tsc ol');
  const section = host.querySelector<HTMLElement>('.ui-tsc');
  if (!list) return () => {};

  const pushToast = (title: string, desc: string, type: 'success' | 'error' | 'info' | 'loading', withUndo = false) => {
    section?.removeAttribute('data-empty');
    const li = document.createElement('li');
    li.className = 'ui-tsc__toast';
    li.innerHTML = `<div class="ui-tsc__card" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:#fff;border-radius:10px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 8px 24px -8px rgba(0,0,0,0.16);min-width:280px"><span class="ui-tsc__icon" data-type="${type}" style="width:16px;height:16px;flex:0 0 auto;border-radius:50%;background:${type === 'error' ? '#f04438' : type === 'success' ? '#12b76a' : '#2e90fa'}"></span><div class="ui-tsc__copy" style="flex:1"><div class="ui-tsc__title" style="font-weight:500;font-size:13px">${title}</div><div class="ui-tsc__desc" style="font-size:12px;opacity:0.65">${desc}</div></div>${withUndo ? '<button type="button" class="ui-tsc__action" style="font-size:12px;font-weight:500">Undo</button>' : ''}<button type="button" class="ui-tsc__close" aria-label="Dismiss notification">×</button></div>`;
    list.prepend(li);
    while (list.children.length > 4) list.lastElementChild?.remove();
    if (type === 'loading') {
      scope.later(() => {
        const tEl = li.querySelector('.ui-tsc__title');
        const iEl = li.querySelector<HTMLElement>('.ui-tsc__icon');
        if (tEl) tEl.textContent = title.replace(/…$/, ' complete');
        if (iEl) { iEl.setAttribute('data-type', 'success'); iEl.style.background = '#12b76a'; }
      }, 900);
    }
  };

  scope.on(host, 'click', (e) => {
    const t = e.target as Element | null;
    const demoBtn = t?.closest<HTMLButtonElement>('.toaster-demo__btn');
    if (demoBtn) {
      const txt = demoBtn.textContent?.trim() || '';
      if (txt.includes('Save')) pushToast('Draft saved', 'Q3 Board Report · all changes kept', 'success');
      else if (txt.includes('Delete')) pushToast('File moved to trash', 'Budget-2027.xlsx', 'error', true);
      else if (txt.includes('Upload')) pushToast('Uploading report…', 'Q3-Board-Report.pdf · 4.2 MB', 'loading');
      else pushToast('Synced with workspace', '4 files up to date', 'info');
      return;
    }
    const closeBtn = t?.closest<HTMLButtonElement>('.ui-tsc__close, .ui-tsc__action');
    if (closeBtn) {
      const toast = closeBtn.closest<HTMLElement>('.ui-tsc__toast');
      if (toast) {
        toast.setAttribute('data-removing', 'true');
        scope.later(() => {
          toast.remove();
          if (list.children.length === 0) section?.setAttribute('data-empty', 'true');
        }, 180);
      }
    }
  });

  return () => scope.dispose();
}

// 9. REASONING SUMMARY
export function enhanceReasoningSummary(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-rsc');
  if (!root) return () => {};

  const kinds = [...root.querySelectorAll<HTMLButtonElement>('.ui-rsc__kind')];
  const models = [...root.querySelectorAll<HTMLButtonElement>('.ui-rsc__model-btn')];
  const segs = [...root.querySelectorAll<HTMLElement>('.ui-rsc__seg')];
  const srcBtn = root.querySelector<HTMLButtonElement>('.ui-rsc__sources');
  const toggleBtn = root.querySelector<HTMLButtonElement>('.ui-rsc__toggle');
  const moreEls = [...root.querySelectorAll<HTMLElement>('.ui-rsc__more')];

  const MODEL_INFO = [
    'Anthropic · 20.5k tokens · $0.06 · Picked for long docs & threads',
    'xAI · 14.2k tokens · $0.03 · Fast cross-checking & pattern match',
    'OpenAI · 28.0k tokens · $0.09 · Writing & verifying retry logic',
  ];

  let activeKind: number | null = null;
  let openModel: number | null = null;

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const kBtn = t?.closest<HTMLButtonElement>('.ui-rsc__kind');
    if (kBtn) {
      const idx = kinds.indexOf(kBtn);
      activeKind = activeKind === idx ? null : idx;
      kinds.forEach((k, i) => {
        const on = activeKind === i;
        k.setAttribute('aria-pressed', String(on));
        if (activeKind !== null && !on) k.setAttribute('data-dim', '');
        else k.removeAttribute('data-dim');
      });
      segs.forEach((s, i) => {
        if (activeKind !== null && i !== activeKind) s.setAttribute('data-dim', '');
        else s.removeAttribute('data-dim');
      });
      return;
    }

    const mBtn = t?.closest<HTMLButtonElement>('.ui-rsc__model-btn');
    if (mBtn) {
      const idx = models.indexOf(mBtn);
      openModel = openModel === idx ? null : idx;
      models.forEach((b, i) => {
        const expanded = openModel === i;
        b.setAttribute('aria-expanded', String(expanded));
        const li = b.closest<HTMLElement>('.ui-rsc__model');
        if (expanded) li?.setAttribute('data-lit', '');
        else li?.removeAttribute('data-lit');
        li?.querySelector('.ui-rsc__model-meta')?.remove();
        if (expanded && li) {
          const d = document.createElement('div');
          d.className = 'ui-rsc__model-meta';
          d.style.cssText = 'font-size:11px;opacity:0.65;padding:4px 8px 6px';
          d.textContent = MODEL_INFO[i] || MODEL_INFO[0];
          li.appendChild(d);
        }
      });
      return;
    }

    if (t?.closest('.ui-rsc__sources') && srcBtn) {
      const open = srcBtn.getAttribute('aria-expanded') !== 'true';
      srcBtn.setAttribute('aria-expanded', String(open));
      const target = moreEls[0] || root.querySelector<HTMLElement>('.ui-rsc__more');
      if (target) {
        if (open) target.setAttribute('data-open', '');
        else target.removeAttribute('data-open');
      }
      return;
    }

    if (t?.closest('.ui-rsc__toggle') && toggleBtn) {
      const open = toggleBtn.getAttribute('aria-expanded') !== 'true';
      toggleBtn.setAttribute('aria-expanded', String(open));
      const target = moreEls[moreEls.length - 1];
      if (target) {
        if (open) target.setAttribute('data-open', '');
        else target.removeAttribute('data-open');
      }
    }
  });

  return () => scope.dispose();
}

// 10. MEMORY PANEL
export function enhanceMemoryPanel(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-mpc');
  if (!root) return () => {};

  const useSw = root.querySelector<HTMLButtonElement>('.ui-mpc__switch');
  const noteFold = root.querySelector<HTMLElement>('#_r_1_-note, .ui-mpc__fold');
  const chips = [...root.querySelectorAll<HTMLButtonElement>('.ui-mpc__chip')];
  const filtersWrap = root.querySelector<HTMLElement>('.ui-mpc__filters');
  const searchIn = root.querySelector<HTMLInputElement>('.ui-mpc__input');
  const addBtn = root.querySelector<HTMLButtonElement>('.ui-mpc__add');
  const addFold = root.querySelector<HTMLElement>('#_r_1_-new');
  const newTextarea = root.querySelector<HTMLTextAreaElement>('.ui-mpc__edit');
  const catBtns = [...root.querySelectorAll<HTMLButtonElement>('.ui-mpc__cat')];
  const countEl = root.querySelector<HTMLElement>('.ui-mpc__count');
  const captionSwap = root.querySelector<HTMLElement>('.ui-mpc__foot .ui-mpc__swap-item');

  let activeCat = 'All';
  let newCat = 'Preferences';

  const syncCounts = () => {
    const items = [...root.querySelectorAll<HTMLElement>('.ui-mpc__item')];
    const paused = items.filter((i) => i.hasAttribute('data-paused')).length;
    if (countEl) countEl.textContent = String(items.length);
    if (captionSwap) captionSwap.innerHTML = `<b>${items.length}</b> memories${paused ? ` · ${paused} paused` : ''}`;
  };

  const applyFilter = () => {
    const q = (searchIn?.value || '').trim().toLowerCase();
    const groups = [...root.querySelectorAll<HTMLElement>('.ui-mpc__group')];
    groups.forEach((g) => {
      const gTitle = g.querySelector('.ui-mpc__group-label, h4, span')?.textContent?.trim().toLowerCase() || '';
      const catOk = activeCat === 'All' || gTitle.includes(activeCat.toLowerCase());
      let anyVisible = false;
      g.querySelectorAll<HTMLElement>('.ui-mpc__item').forEach((it) => {
        const txtOk = !q || (it.textContent || '').toLowerCase().includes(q);
        const vis = catOk && txtOk;
        it.style.display = vis ? '' : 'none';
        if (vis) anyVisible = true;
      });
      g.style.display = anyVisible ? '' : 'none';
    });
  };

  scope.on(useSw, 'click', () => {
    const next = useSw?.getAttribute('aria-checked') !== 'true';
    useSw?.setAttribute('aria-checked', String(next));
    if (next) {
      root.removeAttribute('data-off');
      noteFold?.removeAttribute('data-open');
      noteFold?.setAttribute('inert', '');
    } else {
      root.setAttribute('data-off', '');
      noteFold?.setAttribute('data-open', '');
      noteFold?.removeAttribute('inert');
    }
  });

  wireRadioGroup(
    root.querySelector('.ui-mpc__chips'),
    '.ui-mpc__chip',
    (btn) => {
      activeCat = (btn.textContent || 'All').replace(/\d+/g, '').trim();
      applyFilter();
    },
    scope
  );

  wireRadioGroup(
    root.querySelector('.ui-mpc__cats'),
    '.ui-mpc__cat',
    (btn) => { newCat = btn.textContent?.trim() || 'Preferences'; },
    scope
  );

  scope.on(searchIn, 'input', applyFilter);

  scope.on(newTextarea, 'input', () => {
    const saveNew = addFold?.querySelector<HTMLButtonElement>('.ui-mpc__text-btn--main');
    if (saveNew) saveNew.disabled = !(newTextarea?.value.trim());
  });

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    const iconBtn = t?.closest<HTMLButtonElement>('.ui-mpc__icon');
    if (iconBtn) {
      const label = iconBtn.getAttribute('aria-label') || '';
      if (label === 'Search memories') {
        filtersWrap?.setAttribute('data-searching', '');
        searchIn?.focus();
      } else if (label === 'Close search') {
        filtersWrap?.removeAttribute('data-searching');
        if (searchIn) searchIn.value = '';
        applyFilter();
      } else if (label.startsWith('Pause') || label.startsWith('Resume')) {
        const item = iconBtn.closest<HTMLElement>('.ui-mpc__item');
        const paused = item?.hasAttribute('data-paused');
        if (paused) {
          item?.removeAttribute('data-paused');
          iconBtn.setAttribute('aria-label', label.replace('Resume', 'Pause'));
        } else {
          item?.setAttribute('data-paused', '');
          iconBtn.setAttribute('aria-label', label.replace('Pause', 'Resume'));
        }
        syncCounts();
      } else if (label.startsWith('Forget')) {
        const item = iconBtn.closest<HTMLElement>('.ui-mpc__item');
        item?.closest('.ui-mpc__fold--row')?.remove() || item?.remove();
        syncCounts();
      } else if (label.startsWith('Edit')) {
        const item = iconBtn.closest<HTMLElement>('.ui-mpc__item');
        const p = item?.querySelector<HTMLElement>('.ui-mpc__text, p');
        if (item && p) {
          const editing = item.hasAttribute('data-editing');
          if (!editing) {
            item.setAttribute('data-editing', '');
            p.contentEditable = 'true';
            p.focus();
          } else {
            item.removeAttribute('data-editing');
            p.contentEditable = 'false';
          }
        }
      }
      return;
    }

    if (t?.closest('.ui-mpc__add') && addBtn && addFold) {
      const open = addBtn.getAttribute('aria-expanded') !== 'true';
      addBtn.setAttribute('aria-expanded', String(open));
      if (open) { addFold.setAttribute('data-open', ''); addFold.removeAttribute('inert'); newTextarea?.focus(); }
      else { addFold.removeAttribute('data-open'); addFold.setAttribute('inert', ''); }
      return;
    }

    const txtBtn = t?.closest<HTMLButtonElement>('.ui-mpc__text-btn');
    if (txtBtn && addFold) {
      if (txtBtn.classList.contains('ui-mpc__text-btn--main') && newTextarea?.value.trim()) {
        const val = newTextarea.value.trim();
        const group = [...root.querySelectorAll<HTMLElement>('.ui-mpc__group')].find((g) =>
          (g.textContent || '').toLowerCase().includes(newCat.toLowerCase())
        ) || root.querySelector<HTMLElement>('.ui-mpc__group');
        const ul = group?.querySelector('ul');
        if (ul) {
          const li = document.createElement('li');
          li.className = 'ui-mpc__item';
          li.innerHTML = `<div style="padding:8px 10px;font-size:12px"><div>${val}</div><div style="opacity:0.5;font-size:11px">Added just now</div></div>`;
          ul.prepend(li);
          syncCounts();
        }
        newTextarea.value = '';
      }
      addBtn?.setAttribute('aria-expanded', 'false');
      addFold.removeAttribute('data-open');
      addFold.setAttribute('inert', '');
    }
  });

  // Unused catBtns ref suppression
  void catBtns;
  void chips;

  return () => scope.dispose();
}

// 11. MEMORY GRAPH
export function enhanceMemoryGraph(host: HTMLElement): () => void {
  const scope = createScope();
  const root = host.querySelector<HTMLElement>('.ui-mgc');
  if (!root) return () => {};

  const stage = root.querySelector<HTMLElement>('.ui-mgc__stage');
  const nodes = [...root.querySelectorAll<HTMLButtonElement>('.ui-mgc__node')];
  const lines = [...root.querySelectorAll<SVGElement>('.ui-mgc__line')];
  const sr = root.querySelector<HTMLElement>('.ui-mgc__sr');

  let openNode: HTMLButtonElement | null = null;
  let card: HTMLElement | null = null;

  const closeCard = () => {
    card?.remove();
    card = null;
    nodes.forEach((n) => {
      n.setAttribute('aria-expanded', 'false');
      n.removeAttribute('data-open');
      n.removeAttribute('data-hot');
    });
    lines.forEach((l) => l.removeAttribute('data-hot'));
    openNode = null;
  };

  scope.on(root, 'click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest('[data-mg-close]')) { closeCard(); return; }
    if (t?.closest('[data-mg-toggle]') && openNode) {
      const off = openNode.hasAttribute('data-off');
      if (off) openNode.removeAttribute('data-off');
      else openNode.setAttribute('data-off', '');
      const sw = t.closest<HTMLButtonElement>('[data-mg-toggle]');
      sw?.setAttribute('aria-checked', String(off));
      return;
    }
    if (t?.closest('[data-mg-forget]') && openNode) {
      openNode.setAttribute('data-off', '');
      closeCard();
      return;
    }
    const node = t?.closest<HTMLButtonElement>('.ui-mgc__node');
    if (node && stage) {
      e.stopPropagation();
      if (openNode === node) { closeCard(); return; }
      closeCard();
      openNode = node;
      node.setAttribute('aria-expanded', 'true');
      node.setAttribute('data-open', '');
      node.setAttribute('data-hot', '');
      const idx = nodes.indexOf(node);
      if (lines[idx - 1]) lines[idx - 1].setAttribute('data-hot', '');
      const isAgent = node.classList.contains('ui-mgc__agent');
      const isOff = node.hasAttribute('data-off');
      const title = node.querySelector('b, .ui-mgc__tool-name, .ui-mgc__mem-title')?.textContent?.trim() || node.getAttribute('aria-label')?.split(',')[0] || 'Node';
      const detail = node.getAttribute('aria-label') || node.textContent?.trim() || '';

      card = document.createElement('div');
      card.className = 'ui-mgc__card';
      card.setAttribute('role', 'dialog');
      card.style.cssText = 'position:absolute;left:50%;top:16px;transform:translateX(-50%);z-index:30;width:290px;background:#fff;border-radius:12px;box-shadow:0 0 0 0.5px rgba(0,0,0,0.08),0 14px 32px -10px rgba(0,0,0,0.22);padding:12px 14px;font-size:12px;display:grid;gap:8px;';
      card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><b>${title}</b><button type="button" data-mg-close aria-label="Close">✕</button></div><p style="margin:0;opacity:0.7;line-height:1.4">${detail}</p>${isAgent ? '' : `<div style="display:flex;justify-content:space-between;align-items:center;padding-top:4px;border-top:0.5px solid rgba(0,0,0,0.06)"><button type="button" role="switch" aria-checked="${!isOff}" data-mg-toggle style="font-size:12px;font-weight:500">${!isOff ? 'Active ✓' : 'Paused'}</button><button type="button" data-mg-forget style="font-size:12px;color:#c4320a">Forget</button></div>`}`;
      stage.appendChild(card);
      if (sr) sr.textContent = `Inspecting ${title}`;
    }
  });

  scope.on(document, 'click', (e) => {
    if (card && !card.contains(e.target as Node)) closeCard();
  });

  return () => scope.dispose();
}
