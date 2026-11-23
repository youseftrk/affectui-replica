export function createScope() {
  const cleanups: (() => void)[] = [];
  return {
    on<K extends keyof HTMLElementEventMap>(
      el: EventTarget | null | undefined,
      type: K | string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions | boolean
    ) {
      if (!el) return;
      el.addEventListener(type, fn, opts);
      cleanups.push(() => el.removeEventListener(type, fn, opts));
    },
    later(fn: () => void, ms: number) {
      const id = window.setTimeout(fn, ms);
      cleanups.push(() => window.clearTimeout(id));
      return id;
    },
    every(fn: () => void, ms: number) {
      const id = window.setInterval(fn, ms);
      cleanups.push(() => window.clearInterval(id));
      return id;
    },
    add(fn: () => void) {
      cleanups.push(fn);
    },
    dispose() {
      cleanups.forEach((f) => f());
      cleanups.length = 0;
    },
  };
}

export function wireRadioGroup(
  container: Element | null,
  selector: string,
  onSelect: (btn: HTMLElement, idx: number, all: HTMLElement[]) => void,
  scope: ReturnType<typeof createScope>
) {
  if (!container) return;
  const getAll = () => [...container.querySelectorAll<HTMLElement>(selector)];
  scope.on(container, 'click', (e) => {
    const btn = (e.target as Element | null)?.closest<HTMLElement>(selector);
    if (!btn || !container.contains(btn)) return;
    const all = getAll();
    const idx = all.indexOf(btn);
    if (idx < 0) return;
    all.forEach((b, i) => {
      b.setAttribute('aria-checked', String(i === idx));
      b.tabIndex = i === idx ? 0 : -1;
    });
    onSelect(btn, idx, all);
  });
  scope.on(container, 'keydown', (e) => {
    const ke = e as KeyboardEvent;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ke.key)) return;
    const btn = (ke.target as Element | null)?.closest<HTMLElement>(selector);
    if (!btn) return;
    const all = getAll();
    const idx = all.indexOf(btn);
    if (idx < 0) return;
    ke.preventDefault();
    let next = idx;
    if (ke.key === 'ArrowRight' || ke.key === 'ArrowDown') next = (idx + 1) % all.length;
    else if (ke.key === 'ArrowLeft' || ke.key === 'ArrowUp') next = (idx - 1 + all.length) % all.length;
    else if (ke.key === 'Home') next = 0;
    else if (ke.key === 'End') next = all.length - 1;
    all[next]?.focus();
    all[next]?.click();
  });
}

export function positionPill(pill: HTMLElement | null, target: HTMLElement | null, axis: 'x' | 'y' = 'y') {
  if (!pill || !target) return;
  if (axis === 'y') {
    let top = target.offsetTop;
    let p = target.offsetParent as HTMLElement | null;
    const pillParent = pill.offsetParent as HTMLElement | null;
    while (p && p !== pillParent && p.offsetParent) {
      top += p.offsetTop;
      p = p.offsetParent as HTMLElement | null;
    }
    pill.style.transform = `translateY(${top}px)`;
    pill.style.height = `${target.offsetHeight}px`;
    pill.style.opacity = '1';
  } else {
    pill.style.transform = `translate(${target.offsetLeft}px, 0px)`;
    pill.style.width = `${target.offsetWidth}px`;
    pill.style.height = `${target.offsetHeight}px`;
    pill.style.opacity = '1';
  }
}
