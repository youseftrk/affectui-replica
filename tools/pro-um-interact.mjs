import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.affectui.com/components/usage-meter', { waitUntil: 'networkidle' });
await page.waitForTimeout(1400);
const state = () => page.evaluate(() => ({
  tip: document.querySelector('.ui-umc__tip')?.outerHTML,
  tipText: document.querySelector('.ui-umc__tip')?.textContent,
  barAttr: [...document.querySelectorAll('.ui-umc__bar, .ui-umc__track, .ui-umc__seg, .ui-umc__item, .ui-umc__day')].map(e => [e.className, e.getAttribute('data-active'), e.getAttribute('aria-current'), e.getAttribute('data-hot'), e.getAttribute('style')]).filter(x => x[1] || x[2] || x[3]),
  live: document.querySelector('.ui-umc__live')?.textContent,
}));
// focus bar, press arrows
await page.locator('.ui-umc__bar').focus();
await page.waitForTimeout(300);
console.log('bar focused:', JSON.stringify(await state()));
for (const k of ['ArrowRight', 'ArrowRight', 'ArrowLeft', 'Home', 'End']) {
  await page.keyboard.press(k); await page.waitForTimeout(350);
  console.log('after', k, ':', JSON.stringify(await state()));
}
// spark
await page.locator('.ui-umc__spark').focus();
await page.waitForTimeout(300);
for (const k of ['ArrowRight', 'ArrowRight', 'ArrowLeft', 'End']) {
  await page.keyboard.press(k); await page.waitForTimeout(350);
  console.log('spark', k, ':', JSON.stringify(await state()));
}
// click Upgrade
await page.locator('.ui-umc__action').click(); await page.waitForTimeout(600);
console.log('after upgrade click:', JSON.stringify(await state()));
console.log('action html:', await page.evaluate(() => document.querySelector('.ui-umc__action')?.outerHTML));
await browser.close();
