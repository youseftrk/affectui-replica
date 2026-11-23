import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto('https://www.affectui.com/components/agent-crew', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2200);
const stage = await page.locator('.stage').first().boundingBox();
console.log('STAGE', JSON.stringify(stage));
const nodes = page.locator('.stage .ui-acrc__node');
const n = await nodes.count();
for (let i = 0; i < n; i++) {
  const node = nodes.nth(i);
  const label = (await node.getAttribute('aria-label') || '').split(':')[0];
  const nr = await node.boundingBox();
  await node.click();
  await page.waitForTimeout(450);
  const panel = page.locator('.stage .ui-acrc__panel');
  if (await panel.count()) {
    const p = await panel.first();
    const pr = await p.boundingBox();
    const style = await p.getAttribute('style');
    const dataup = await p.getAttribute('data-up');
    console.log(JSON.stringify({ label, node: { x: Math.round(nr.x), y: Math.round(nr.y), w: Math.round(nr.width), h: Math.round(nr.height) }, panel: { x: Math.round(pr.x), y: Math.round(pr.y), w: Math.round(pr.width), h: Math.round(pr.height) }, dataup, style: style.slice(0, 120) }));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
  }
}
await browser.close();
