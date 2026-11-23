// Click an element on a page and dump DOM changes inside .stage (or whole doc).
// Usage: node tools/pro-click.mjs <url> <selector> [--wait 600] [--scope .stage] [--key ArrowRight] [--nth N] [--out prefix]
// Prints: aria/class/text changes + added/removed nodes summary, and screenshots before/after.
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
const args = process.argv.slice(2);
const url = args[0], sel = args[1];
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const WAIT = +opt('--wait', 700);
const SCOPE = opt('--scope', '.stage');
const KEY = opt('--key', null);
const NTH = +opt('--nth', 0);
const OUT = opt('--out', 'shots/probe');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);

const snap = () => page.evaluate((scope) => {
  const root = document.querySelector(scope) || document.body;
  const map = new Map();
  root.querySelectorAll('*').forEach((el, i) => {
    const key = el.tagName + '.' + (typeof el.className === 'string' ? el.className : '') + '#' + (el.id || '') + '@' + i;
    const aria = {};
    for (const a of el.getAttributeNames()) if (a.startsWith('aria-') || a === 'data-state' || a === 'data-open' || a === 'data-active' || a === 'data-selected' || a === 'data-checked' || a === 'data-expanded' || a === 'open' || a === 'hidden' || a === 'disabled' || a === 'selected') aria[a] = el.getAttribute(a);
    map.set(key, { t: (el.textContent || '').trim().slice(0, 80), aria, html: el.outerHTML.slice(0, 300) });
  });
  return { html: root.innerHTML, map: [...map.entries()] };
}, SCOPE);

const before = await snap();
await page.locator(sel).nth(NTH).click({ timeout: 8000 }).catch(e => console.log('click fail:', e.message.slice(0, 120)));
if (KEY) { await page.waitForTimeout(200); await page.keyboard.press(KEY); }
await page.waitForTimeout(WAIT);
const after = await snap();

// diff maps
const bMap = new Map(before.map), aMap = new Map(after.map);
const changes = [], added = [], removed = [];
for (const [k, v] of aMap) {
  if (!bMap.has(k)) { added.push(v); continue; }
  const b = bMap.get(k);
  if (JSON.stringify(b.aria) !== JSON.stringify(v.aria) || b.t !== v.t) changes.push({ k, before: b, after: v });
}
for (const [k, v] of bMap) if (!aMap.has(k)) removed.push(v);
console.log('=== CHANGES (' + changes.length + ') ===');
changes.slice(0, 40).forEach(c => console.log(' *', c.k.slice(0, 90), '\n    aria:', JSON.stringify(c.before.aria), '->', JSON.stringify(c.after.aria), '\n    text:', c.before.t.slice(0, 50), '->', c.after.t.slice(0, 50)));
console.log('=== ADDED (' + added.length + ') ===');
added.slice(0, 25).forEach(a => console.log(' +', (a.k || '').slice(0, 100), '|', a.t.slice(0, 60), '|', JSON.stringify(a.aria).slice(0, 160)));
console.log('=== REMOVED (' + removed.length + ') ===');
removed.slice(0, 25).forEach(r => console.log(' -', (r.k || '').slice(0, 100), '|', r.t.slice(0, 60)));
writeFileSync(OUT + '-before.html', before.html);
writeFileSync(OUT + '-after.html', after.html);
await page.locator(SCOPE).first().screenshot({ path: OUT + '-after.png' });
await page.screenshot({ path: OUT + '-full.png' });
await browser.close();
