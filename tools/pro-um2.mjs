import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.affectui.com/components/usage-meter', { waitUntil: 'networkidle' });
await page.waitForTimeout(1400);
// pill per period
for (let i = 0; i < 3; i++) {
  await page.locator('.ui-umc__option').nth(i).click(); await page.waitForTimeout(700);
  console.log('period', i, 'pill:', await page.evaluate(() => document.querySelector('.ui-umc__pill')?.getAttribute('style')));
}
await page.locator('.ui-umc__option').nth(0).click(); await page.waitForTimeout(700);
// measure bar geometry
const geo = await page.evaluate(() => {
  const bar = document.querySelector('.ui-umc__bar');
  const track = document.querySelector('.ui-umc__track');
  const br = bar.getBoundingClientRect(), tr = track.getBoundingClientRect();
  return { bar: { x: br.x, w: br.width }, track: { x: tr.x, w: tr.width }, segs: [...document.querySelectorAll('.ui-umc__seg')].map(s => { const r = s.getBoundingClientRect(); return { x: r.x, w: r.width }; }) };
});
console.log('geo:', JSON.stringify(geo));
// keyboard: which keys on bar
await page.locator('.ui-umc__bar').focus(); await page.waitForTimeout(200);
for (const k of ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'ArrowRight', 'ArrowRight', 'ArrowDown', 'ArrowUp']) {
  await page.keyboard.press(k); await page.waitForTimeout(300);
  const t = await page.evaluate(() => ({ tip: document.querySelector('.ui-umc__tip')?.getAttribute('style'), name: document.querySelector('.ui-umc__tip-name')?.textContent, open: document.querySelector('.ui-umc__tip')?.hasAttribute('data-open') }));
  console.log('bar key', k, JSON.stringify(t));
}
// blur then refocus: does index reset?
await page.locator('.ui-umc__spark').focus(); await page.waitForTimeout(200);
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(300);
console.log('spark day attrs:', await page.evaluate(() => ({
  spark: document.querySelector('.ui-umc__spark')?.outerHTML.slice(0, 300),
  day0: document.querySelectorAll('.ui-umc__day')[0]?.outerHTML,
  live: document.querySelector('.ui-umc__live')?.textContent,
  dailyRead: document.querySelector('.ui-umc__daily-read')?.textContent,
})));
// hover on seg / legend item / day
await page.locator('.ui-umc__spark').blur();
await page.locator('.ui-umc__seg').nth(0).hover(); await page.waitForTimeout(300);
console.log('hover seg0:', await page.evaluate(() => ({
  tip: document.querySelector('.ui-umc__tip')?.outerHTML.slice(0, 400),
  act: [...document.querySelectorAll('[data-active]')].map(e => e.className),
})));
await page.locator('.ui-umc__item').nth(1).hover(); await page.waitForTimeout(300);
console.log('hover item1:', await page.evaluate(() => ({
  tip: document.querySelector('.ui-umc__tip')?.outerHTML.slice(0, 400),
  act: [...document.querySelectorAll('[data-active]')].map(e => e.className + '|' + (e.getAttribute('data-active')||'')),
})));
await page.locator('.ui-umc__day').nth(3).hover(); await page.waitForTimeout(300);
console.log('hover day3:', await page.evaluate(() => ({
  tip: document.querySelector('.ui-umc__tip')?.outerHTML.slice(0, 400),
  act: [...document.querySelectorAll('[data-active]')].map(e => e.className),
  sparkHtml: document.querySelector('.ui-umc__spark')?.outerHTML.slice(0, 500),
})));
await browser.close();
