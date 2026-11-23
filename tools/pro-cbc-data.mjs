// For compact-breakdown: extract data shown for each period option.
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.affectui.com/components/compact-breakdown', { waitUntil: 'networkidle' });
await page.waitForTimeout(1400);
for (let i = 0; i < 3; i++) {
  await page.locator('.ui-cbc__option').nth(i).click();
  await page.waitForTimeout(800);
  const data = await page.evaluate(() => {
    const q = s => document.querySelector(s);
    const items = [...document.querySelectorAll('.ui-cbc__item')].map(it => ({
      label: it.querySelector('.ui-cbc__label')?.textContent,
      value: it.querySelector('.ui-cbc__value')?.textContent,
      share: it.querySelector('.ui-cbc__share')?.textContent,
      barStyle: it.querySelector('.ui-cbc__bar')?.getAttribute('style') || '',
      itemStyle: it.getAttribute('style') || '',
    }));
    return {
      big: q('.ui-cbc__big')?.textContent,
      delta: q('.ui-cbc__delta')?.textContent,
      sr: q('.ui-cbc__sr')?.textContent,
      title: q('#_r_1_-title, .ui-cbc__title')?.textContent,
      items,
      figureHtml: q('.ui-cbc__figure')?.innerHTML?.slice(0, 800),
    };
  });
  console.log('=== option', i, '===');
  console.log(JSON.stringify(data, null, 1));
}
// Now hover an item to see tooltip/state
await page.locator('.ui-cbc__option').nth(0).click();
await page.waitForTimeout(500);
const item = page.locator('.ui-cbc__item').nth(0);
await item.hover(); await page.waitForTimeout(400);
console.log('=== hover item0 ===');
console.log(await page.evaluate(() => {
  const it = document.querySelector('.ui-cbc__item');
  return { html: it.outerHTML.slice(0, 1500), cls: it.className };
}));
await item.click(); await page.waitForTimeout(400);
console.log('=== click item0 ===');
console.log(await page.evaluate(() => document.querySelector('.ui-cbc__item')?.outerHTML.slice(0, 1500)));
await browser.close();
