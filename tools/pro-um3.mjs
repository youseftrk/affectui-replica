import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.affectui.com/components/usage-meter', { waitUntil: 'networkidle' });
await page.waitForTimeout(1400);
// does mouse hover on a day update dailyRead?
await page.locator('.ui-umc__day').nth(3).hover(); await page.waitForTimeout(400);
console.log('hover day3 dailyRead:', await page.evaluate(() => document.querySelector('.ui-umc__daily-read')?.textContent));
console.log('hover day3 attrs:', await page.evaluate(() => ({
  day3: document.querySelectorAll('.ui-umc__day')[3]?.getAttribute('data-active'),
  spark: document.querySelector('.ui-umc__spark')?.getAttribute('data-hover'),
  tipInside: document.querySelector('.ui-umc__spark .ui-umc__tip, .ui-umc__spark [class*=tip]')?.outerHTML,
})));
// keyboard through all days on period 0
await page.locator('.ui-umc__spark').focus();
const reads = [];
for (let i = 0; i < 30; i++) {
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(120);
  const r = await page.evaluate(() => ({
    read: document.querySelector('.ui-umc__daily-read')?.textContent,
    active: document.querySelector('.ui-umc__day[data-active]')?.getAttribute('style'),
    live: document.querySelector('.ui-umc__live')?.textContent,
  }));
  reads.push(r.read);
}
console.log('P0 dailyReads:', JSON.stringify(reads));
// check blur behavior
await page.locator('.ui-umc__big').click().catch(() => {});
await page.waitForTimeout(300);
console.log('after blur dailyRead:', await page.evaluate(() => document.querySelector('.ui-umc__daily-read')?.textContent), '| active day:', await page.evaluate(() => !!document.querySelector('.ui-umc__day[data-active]')));
// ArrowLeft wrap test on bar
await page.locator('.ui-umc__bar').focus(); await page.waitForTimeout(200);
await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(250);
console.log('bar ArrowLeft from fresh:', await page.evaluate(() => document.querySelector('.ui-umc__tip-name')?.textContent));
await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(250);
console.log('bar 4xRight:', await page.evaluate(() => document.querySelector('.ui-umc__tip-name')?.textContent));
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(250);
console.log('bar 5xRight:', await page.evaluate(() => document.querySelector('.ui-umc__tip-name')?.textContent), await page.evaluate(() => document.querySelector('.ui-umc__tip')?.getAttribute('style')));
await browser.close();
