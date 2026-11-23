// Enumerate interactive elements inside .stage on the live site for a slug.
// Usage: node tools/pro-list.mjs <slug> [--ours]
import { chromium } from 'playwright';
const slug = process.argv[2];
const ours = process.argv.includes('--ours');
const url = ours ? `http://localhost:5173/preview/${slug}` : `https://www.affectui.com/components/${slug}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1600);
const data = await page.evaluate(() => {
  const stage = document.querySelector('.stage');
  if (!stage) return { error: 'no .stage' };
  const els = [];
  const seen = new Set();
  const push = (el, why) => {
    if (!el || seen.has(el)) return; seen.add(el);
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const cs = getComputedStyle(el);
    const aria = {};
    for (const a of el.getAttributeNames()) if (a.startsWith('aria-')) aria[a] = el.getAttribute(a);
    els.push({
      tag: el.tagName.toLowerCase(), why,
      cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString().slice(0, 160),
      role: el.getAttribute('role') || '', id: el.id || '',
      text: (el.textContent || '').trim().slice(0, 60),
      aria, tabindex: el.getAttribute('tabindex'),
      cursor: cs.cursor, disabled: el.hasAttribute('disabled'),
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      html: el.outerHTML.slice(0, 500),
    });
  };
  stage.querySelectorAll('button, a, input, select, textarea, summary, [role], [tabindex], [contenteditable]').forEach(el => {
    const role = el.getAttribute('role');
    const ti = el.getAttribute('tabindex');
    if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA' || el.tagName === 'SUMMARY') push(el, 'tag');
    else if (role) push(el, 'role:' + role);
    else if (ti !== null && ti !== '-1') push(el, 'tabindex');
  });
  // cursor:pointer elements (often divs/li with handlers)
  stage.querySelectorAll('*').forEach(el => {
    if (seen.has(el)) return;
    if (getComputedStyle(el).cursor === 'pointer' && el.children.length <= 4) push(el, 'cursor:pointer');
  });
  return { count: els.length, els };
});
console.log(JSON.stringify(data, null, 1));
await browser.close();
