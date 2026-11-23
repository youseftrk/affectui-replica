// Usage: node tools/inspect-page.mjs <url> [selector]
// Dumps: title, candidate preview containers w/ bounding boxes, then screenshot to shots/inspect.png
import { chromium } from 'playwright';
const url = process.argv[2];
const sel = process.argv[3];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
  const cands = [];
  document.querySelectorAll('div,section,main,figure,iframe').forEach(el => {
    const r = el.getBoundingClientRect();
    const cls = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString();
    if (r.width > 300 && r.height > 200 && r.top > 0 && r.top < 3000) {
      cands.push({ tag: el.tagName, cls: cls.slice(0, 120), id: el.id || '', x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), kids: el.children.length });
    }
  });
  return { title: document.title, url: location.href, cands: cands.slice(0, 40) };
});
console.log(JSON.stringify(info, null, 1));
if (sel) {
  const el = page.locator(sel).first();
  if (await el.count()) await el.screenshot({ path: 'shots/inspect.png' });
  else await page.screenshot({ path: 'shots/inspect.png' });
} else {
  await page.screenshot({ path: 'shots/inspect.png', fullPage: false });
}
await browser.close();
