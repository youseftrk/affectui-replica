import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.affectui.com/components/usage-meter', { waitUntil: 'networkidle' });
await page.waitForTimeout(1400);
const dump = () => page.evaluate(() => {
  const q = s => document.querySelector(s);
  const sect = document.querySelector('.ui-umc');
  return {
    state: sect?.getAttribute('data-state'),
    cardStyle: q('.ui-umc__card')?.getAttribute('style'),
    big: q('.ui-umc__big')?.textContent,
    of: q('.ui-umc__of')?.textContent,
    pct: q('.ui-umc__pct')?.textContent,
    pctState: q('.ui-umc__pct')?.getAttribute('data-state'),
    ariaNow: q('.ui-umc__track')?.getAttribute('aria-valuenow'),
    ariaText: q('.ui-umc__track')?.getAttribute('aria-valuetext'),
    segs: [...document.querySelectorAll('.ui-umc__seg')].map(s => s.getAttribute('style')),
    legend: [...document.querySelectorAll('.ui-umc__item')].map(it => ({
      label: it.querySelector('.ui-umc__label')?.textContent,
      value: it.querySelector('.ui-umc__value')?.textContent,
      share: it.querySelector('.ui-umc__share')?.textContent,
      swatch: it.querySelector('.ui-umc__swatch')?.getAttribute('style'),
    })),
    dailyRead: q('.ui-umc__daily-read')?.textContent,
    dayHeights: [...document.querySelectorAll('.ui-umc__day > span')].map(s => s.getAttribute('style')),
    futureCount: document.querySelectorAll('.ui-umc__day[data-future]').length,
    limits: [...document.querySelectorAll('.ui-umc__limit')].map(l => ({
      state: l.getAttribute('data-state'),
      name: l.querySelector('.ui-umc__limit-name')?.textContent,
      value: l.querySelector('.ui-umc__limit-value')?.textContent,
      dot: !!l.querySelector('.ui-umc__dot'),
      thinW: l.querySelector('.ui-umc__thin > span')?.getAttribute('style'),
      unlimited: l.querySelector('.ui-umc__thin')?.hasAttribute('data-unlimited'),
    })),
    status: q('.ui-umc__status')?.textContent,
    actionText: q('.ui-umc__action-text')?.textContent,
    title: q('.ui-umc__title')?.textContent,
    sub: q('.ui-umc__sub')?.textContent,
    time: q('.ui-umc__sub time')?.getAttribute('datetime'),
    timeTitle: q('.ui-umc__sub time')?.getAttribute('title'),
  };
});
for (let i = 0; i < 3; i++) {
  await page.locator('.ui-umc__option').nth(i).click();
  await page.waitForTimeout(1000);
  console.log('=== PERIOD', i, '===');
  console.log(JSON.stringify(await dump(), null, 0));
}
await browser.close();
