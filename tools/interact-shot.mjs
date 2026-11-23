// Screenshot a page region after performing interaction steps.
// Usage: node tools/interact-shot.mjs <url> <out.png> --selector ".stage" --wait 1500 --steps '[{"hover":".x"},{"click":".y"},{"wait":800}]'
// Step types: {hover|click|focus|type:"selector","text":"..."} , {wait:ms}, {press:"key"}
import { chromium } from 'playwright';
const args = process.argv.slice(2);
const url = args[0], out = args[1];
const si = args.indexOf('--selector'), wi = args.indexOf('--wait'), ki = args.indexOf('--steps');
const selector = si >= 0 ? args[si + 1] : '.stage';
const wait = wi >= 0 ? parseInt(args[wi + 1]) : 1500;
const steps = ki >= 0 ? JSON.parse(args[ki + 1]) : [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(wait);
for (const st of steps) {
  if (st.wait) { await page.waitForTimeout(st.wait); continue; }
  if (st.press) { await page.keyboard.press(st.press); continue; }
  const sel = st.hover || st.click || st.focus || st.type;
  if (st.hover) await page.locator(sel).first().hover();
  else if (st.click) await page.locator(sel).first().click();
  else if (st.focus) await page.locator(sel).first().focus();
  else if (st.type) await page.locator(sel).first().pressSequentially(st.text || '', { delay: 30 });
  await page.waitForTimeout(st.ms ?? 250);
}
await page.waitForTimeout(150);
const el = page.locator(selector).first();
await el.screenshot({ path: out });
console.log('wrote', out);
await browser.close();
