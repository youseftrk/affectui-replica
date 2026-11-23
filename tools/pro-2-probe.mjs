// Probe live affectui component page for interactive elements + click effects.
// Usage: node tools/pro-2-probe.mjs <slug> [remote|local] [--click idx,idx,...] [--no-revert]
import { chromium } from 'playwright';

const slug = process.argv[2];
const which = process.argv[3] || 'remote';
const ci = process.argv.indexOf('--click');
const onlyClicks = ci >= 0 ? process.argv[ci + 1].split(',').map(Number) : null;
const norevert = process.argv.includes('--no-revert');
const url = which === 'local'
  ? `http://localhost:5173/preview/${slug}`
  : `https://www.affectui.com/components/${slug}`;

const SEL = 'button, input, select, textarea, [role="button"], [role="tab"], [role="switch"], [role="checkbox"], [role="option"], [role="treeitem"], [role="menuitem"], [tabindex], [aria-expanded], [aria-haspopup], [aria-pressed], [contenteditable], summary, [data-open], [data-state], a[href]';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('PAGEERR', e.message));
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);

// Tag every interactive element inside .stage with data-probe-id, return inventory
const inventory = await page.locator('.stage').first().evaluate((stage, SEL) => {
  const items = [];
  const els = stage.querySelectorAll(SEL);
  const seen = new Set();
  let k = 0;
  els.forEach(el => {
    if (seen.has(el)) return; seen.add(el);
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    const attrs = {};
    for (const a of el.attributes) {
      if (/^(aria-|data-|role|tabindex|type|href|disabled|checked|value|name|placeholder|title|id)/.test(a.name)) attrs[a.name] = a.value.slice(0, 80);
    }
    const txt = (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    el.setAttribute('data-probe-id', String(k));
    items.push({ i: k, tag: el.tagName.toLowerCase(), cls: (el.getAttribute('class') || '').slice(0, 80), attrs, txt, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) });
    k++;
  });
  return items;
}, SEL);

const sigFn = `(() => {
  const stage = document.querySelector('.stage');
  const out = [];
  stage.querySelectorAll('*').forEach((el, i) => {
    const bits = [];
    for (const a of el.attributes) {
      if (/^(aria-|data-(?!probe)|class|role|tabindex|open|disabled|checked|value|selected|style)/.test(a.name)) bits.push(a.name + '=' + String(a.value).slice(0,60));
    }
    const own = [...el.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent.trim()).join(' ').slice(0, 40);
    if (bits.length || own) out.push(i + '|' + el.tagName + '|' + bits.join(';') + '|' + own);
  });
  return out.join('\\n');
})()`;

const baseSig = await page.evaluate(sigFn);
const clicks = {};
const targets = onlyClicks || inventory.map(x => x.i);

for (const idx of targets) {
  const item = inventory.find(x => x.i === idx);
  if (!item) continue;
  try {
    const loc = page.locator(`.stage [data-probe-id="${idx}"]`).first();
    if ((await loc.count()) === 0) { clicks[idx] = { err: 'gone' }; continue; }
    await loc.scrollIntoViewIfNeeded().catch(() => {});
    await loc.click({ timeout: 3000 }).catch(async () => {
      await loc.dispatchEvent('click');
    });
    await page.waitForTimeout(600);
    const sig = await page.evaluate(sigFn);
    const b = new Set(baseSig.split('\n')), s = new Set(sig.split('\n'));
    const added = [...s].filter(x => !b.has(x)).slice(0, 15);
    const removed = [...b].filter(x => !s.has(x)).slice(0, 15);
    clicks[idx] = { item: { tag: item.tag, cls: item.cls, txt: item.txt, attrs: item.attrs }, changed: sig !== baseSig, added, removed };
    if (!norevert) {
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(200);
      const loc2 = page.locator(`.stage [data-probe-id="${idx}"]`).first();
      if ((await loc2.count()) > 0) {
        await loc2.click({ timeout: 2000 }).catch(() => {});
        await page.waitForTimeout(300);
      }
      // if sig still differs, reload page to reset
      const sigNow = await page.evaluate(sigFn);
      if (sigNow !== baseSig) {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(1500);
        // re-tag
        await page.locator('.stage').first().evaluate((stage, SEL) => {
          const els = stage.querySelectorAll(SEL); const seen = new Set(); let k = 0;
          els.forEach(el => { if (seen.has(el)) return; seen.add(el); const r = el.getBoundingClientRect(); if (r.width === 0 && r.height === 0) return; el.setAttribute('data-probe-id', String(k)); k++; });
        }, SEL);
      }
    }
  } catch (e) {
    clicks[idx] = { err: String(e).slice(0, 200) };
  }
}

console.log(JSON.stringify({ slug, url, count: inventory.length, inventory, clicks }, null, 1));
await browser.close();
