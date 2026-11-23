// Dump agent-ledger row states on LOCAL preview at intervals.
// Usage: node tools/ldgc-local.mjs [baseUrl]
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:5173';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('pageerror', e => console.log('PAGEERROR:', e.message));
await page.goto(`${base}/preview/agent-ledger`, { waitUntil: 'networkidle', timeout: 60000 });
await page.locator('.stage__look').scrollIntoViewIfNeeded();
const dump = (label) => page.evaluate(() => {
  const rows = [...document.querySelectorAll('.ui-ldgc__row')].map(r => ({
    t: r.querySelector('.ui-ldgc__what')?.getAttribute('title'),
    undone: r.hasAttribute('data-undone'),
    init: r.hasAttribute('data-initial'),
    prev: r.hasAttribute('data-preview'),
    chain: r.getAttribute('data-chain'),
    flag: r.querySelector('.ui-ldgc__flag')?.textContent?.trim(),
    act: r.querySelector('.ui-ldgc__act')?.getAttribute('aria-label'),
    time: r.querySelector('.ui-ldgc__time')?.textContent?.trim().slice(0, 30),
  }));
  const sum = document.querySelector('.ui-ldgc__sum')?.textContent?.replace(/\s+/g, ' ').trim();
  return { rows, sum };
}).then(d => {
  console.log(`=== ${label} === sum: ${d.sum}`);
  d.rows.forEach((r, i) => console.log(` ${i}: ${r.t} | und=${r.undone} init=${r.init} prev=${r.prev} chain=${r.chain} flag=${r.flag || '-'} | ${r.act || '-'} | ${r.time}`));
});
let elapsed = 0;
for (const target of [1000, 3000, 6000, 9500, 11000, 13000, 16000, 21000, 26500]) {
  await page.waitForTimeout(target - elapsed);
  elapsed = target;
  await dump(`t≈${target}ms`);
}
await browser.close();
