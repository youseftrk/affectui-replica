// Dump agent-crew: all 3 project trees + every agent panel HTML + menu.
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('PAGEERR', e.message));
await page.goto('https://www.affectui.com/components/agent-crew', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2200);

const out = {};

async function dumpProject(idx, key) {
  // open menu, pick project idx
  await page.locator('.stage .ui-acrc__proj-btn').click();
  await page.waitForTimeout(400);
  await page.locator(`.stage .ui-acrc__proj-item`).nth(idx).click();
  await page.waitForTimeout(1200);
  out[key + '-section'] = await page.locator('.stage .ui-acrc').first().evaluate(el => el.outerHTML);
  out[key + '-bar'] = await page.locator('.stage .ui-acrc__bar').first().evaluate(el => el.outerHTML);
  out[key + '-tree'] = await page.locator('.stage .ui-acrc__tree').first().evaluate(el => el.outerHTML);
  // click each node, dump panel
  const nodes = page.locator('.stage .ui-acrc__node');
  const n = await nodes.count();
  out[key + '-panels'] = {};
  for (let i = 0; i < n; i++) {
    const node = nodes.nth(i);
    const label = await node.getAttribute('aria-label');
    await node.click();
    await page.waitForTimeout(500);
    const panel = page.locator('.stage .ui-acrc__panel');
    if (await panel.count()) {
      out[key + '-panels'][label] = await panel.first().evaluate(el => el.outerHTML);
      // also record open-node attrs + links state
      out[key + '-panels'][label + '::node'] = await node.evaluate(el => el.outerHTML.slice(0, 200));
    }
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    // ensure closed
    if (await panel.count()) { await page.locator('.stage .ui-acrc__panel-close').click().catch(()=>{}); await page.waitForTimeout(200); }
  }
}

await dumpProject(0, 'p1');
await dumpProject(1, 'p2');
await dumpProject(2, 'p3');
// back to p1 menu dump
await page.locator('.stage .ui-acrc__proj-btn').click();
await page.waitForTimeout(400);
out['menu'] = await page.locator('.stage .ui-acrc__proj-menu').first().evaluate(el => el.outerHTML);
writeFileSync('tools/acrc-dump.json', JSON.stringify(out, null, 1));
console.log('done', Object.keys(out));
await browser.close();
