import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.affectui.com/components/usage-meter', { waitUntil: 'networkidle' });
await page.waitForTimeout(1400);
console.log('live@load:', await page.evaluate(() => document.querySelector('.ui-umc__live')?.textContent));
for (let p = 1; p <= 2; p++) {
  await page.locator('.ui-umc__option').nth(p).click(); await page.waitForTimeout(1000);
  console.log('=== period', p, 'live:', await page.evaluate(() => document.querySelector('.ui-umc__live')?.textContent),
    'sparkAttrs:', await page.evaluate(() => ({ h: document.querySelector('.ui-umc__spark')?.getAttribute('data-hover'), r: document.querySelector('.ui-umc__spark')?.getAttribute('data-regrow') })));
  await page.locator('.ui-umc__spark').focus(); await page.waitForTimeout(200);
  const reads = [];
  const n = p === 1 ? 30 : 7;
  for (let i = 0; i < n + 2; i++) {
    await page.keyboard.press('ArrowRight'); await page.waitForTimeout(110);
    reads.push(await page.evaluate(() => document.querySelector('.ui-umc__daily-read')?.textContent));
  }
  console.log('reads:', JSON.stringify(reads));
  // ArrowLeft wrap test on spark
  await page.locator('.ui-umc__spark').blur(); await page.waitForTimeout(150);
  await page.locator('.ui-umc__spark').focus(); await page.waitForTimeout(150);
  await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(250);
  console.log('spark fresh ArrowLeft ->', await page.evaluate(() => ({ read: document.querySelector('.ui-umc__daily-read')?.textContent, i: document.querySelector('.ui-umc__day[data-active]')?.getAttribute('style') })));
  // period2 tip check for categories
  const tips = [];
  await page.locator('.ui-umc__bar').focus(); await page.waitForTimeout(150);
  for (let i = 0; i < 4; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200); tips.push(await page.evaluate(() => document.querySelector('.ui-umc__tip')?.getAttribute('style') + ' | ' + document.querySelector('.ui-umc__tip-name')?.textContent + ' | ' + document.querySelector('.ui-umc__tip-value')?.textContent)); }
  console.log('p' + p + ' tips:', JSON.stringify(tips));
}
await browser.close();
