import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.affectui.com/components/usage-meter', { waitUntil: 'networkidle' });
await page.waitForTimeout(1400);
// verify Nov1-3 via hover
for (const i of [0, 1, 2]) {
  await page.locator('.ui-umc__day').nth(i).hover(); await page.waitForTimeout(250);
  console.log('day', i, await page.evaluate(() => document.querySelector('.ui-umc__daily-read')?.textContent));
}
await page.mouse.move(0, 0); await page.waitForTimeout(200);
// spark attrs idle vs hover vs focus
console.log('spark idle attrs:', await page.evaluate(() => document.querySelector('.ui-umc__spark')?.outerHTML.slice(0, 220)));
await page.locator('.ui-umc__spark').hover(); await page.waitForTimeout(300);
console.log('spark hover attrs:', await page.evaluate(() => ({ h: document.querySelector('.ui-umc__spark')?.getAttribute('data-hover'), r: document.querySelector('.ui-umc__spark')?.getAttribute('data-regrow'), read: document.querySelector('.ui-umc__daily-read')?.textContent })));
// bar empty area hover (right of segs)
const box = await page.locator('.ui-umc__bar').boundingBox();
await page.mouse.move(box.x + box.width - 10, box.y + box.height / 2); await page.waitForTimeout(300);
console.log('bar empty hover:', await page.evaluate(() => ({ tip: document.querySelector('.ui-umc__tip')?.getAttribute('style'), name: document.querySelector('.ui-umc__tip-name')?.textContent, open: document.querySelector('.ui-umc__tip')?.hasAttribute('data-open') })));
// bar background left edge
await page.mouse.move(box.x + 2, box.y + box.height / 2); await page.waitForTimeout(300);
console.log('bar left edge hover:', await page.evaluate(() => document.querySelector('.ui-umc__tip-name')?.textContent));
await browser.close();
