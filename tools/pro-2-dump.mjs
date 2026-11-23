// Focused probe: dump HTML of elements appearing after interaction.
// Usage: node tools/pro-2-dump.mjs <slug> <steps-json> [remote|local]
// steps: [{"click":"selector"},{"wait":ms},{"key":"Escape"},{"dump":".selector"},{"hover":"sel"}]
import { chromium } from 'playwright';
const slug = process.argv[2];
const steps = JSON.parse(process.argv[3] || '[]');
const which = process.argv[4] || 'remote';
const url = which === 'local' ? `http://localhost:5173/preview/${slug}` : `https://www.affectui.com/components/${slug}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('PAGEERR', e.message));
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
const dumps = {};
for (const st of steps) {
  if (st.wait) { await page.waitForTimeout(st.wait); continue; }
  if (st.key) { await page.keyboard.press(st.key); await page.waitForTimeout(300); continue; }
  if (st.click) { await page.locator(`.stage ${st.click}`).first().click({ timeout: 5000 }).catch(e => console.error('click fail', st.click, String(e).slice(0,120))); await page.waitForTimeout(st.ms ?? 500); continue; }
  if (st.hover) { await page.locator(`.stage ${st.hover}`).first().hover({ timeout: 5000 }).catch(()=>{}); await page.waitForTimeout(st.ms ?? 400); continue; }
  if (st.type) { await page.locator(`.stage ${st.type.sel}`).first().click(); await page.keyboard.type(st.type.text, { delay: 20 }); await page.waitForTimeout(300); continue; }
  if (st.dump) {
    const key = st.dump;
    dumps[key] = await page.locator(`.stage ${key}`).first().evaluate(el => el.outerHTML).catch(e => 'ERR ' + String(e).slice(0, 200));
    continue;
  }
  if (st.dumpall) {
    dumps[st.dumpall] = await page.locator('.stage').first().evaluate(el => el.innerHTML);
    continue;
  }
  if (st.eval) {
    dumps[st.eval.name] = await page.evaluate(st.eval.fn);
    continue;
  }
}
console.log(JSON.stringify(dumps, null, 1));
await browser.close();
