import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.affectui.com/components/compact-breakdown', { waitUntil: 'networkidle' });
await page.waitForTimeout(1400);
for (let i = 0; i < 3; i++) {
  await page.locator('.ui-cbc__option').nth(i).click();
  await page.waitForTimeout(900);
  const d = await page.evaluate(() => {
    const q = s => document.querySelector(s);
    return {
      pill: q('.ui-cbc__pill')?.getAttribute('style'),
      big: q('.ui-cbc__big')?.textContent,
      deltaDataUp: q('.ui-cbc__delta')?.getAttribute('data-up'),
      deltaText: q('.ui-cbc__delta')?.textContent,
      deltaPath: q('.ui-cbc__delta path')?.getAttribute('d'),
      sr: q('.ui-cbc__sr')?.textContent,
      segs: [...document.querySelectorAll('.ui-cbc__seg')].map(s => s.getAttribute('style')),
      items: [...document.querySelectorAll('.ui-cbc__item')].map(it => ({
        swatch: it.querySelector('.ui-cbc__swatch')?.getAttribute('style'),
        label: it.querySelector('.ui-cbc__label')?.textContent,
        value: it.querySelector('.ui-cbc__value')?.textContent,
        share: it.querySelector('.ui-cbc__share')?.textContent,
      })),
      foot: q('.ui-cbc__foot')?.textContent,
      footB: q('.ui-cbc__foot b')?.textContent,
      captionShare: q('.ui-cbc__caption-share')?.textContent,
    };
  });
  console.log('=== PERIOD', i, '===');
  console.log(JSON.stringify(d));
}
await browser.close();
