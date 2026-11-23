// Dump innerText (and optionally innerHTML length) of a selector from a URL.
// Usage: node tools/domtext.mjs <url> <selector> [--wait 1500] [--html out.html]
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const [url, sel, ...rest] = process.argv.slice(2);
const wi = rest.indexOf('--wait');
const WAIT = wi >= 0 ? +rest[wi + 1] : 1500;
const hi = rest.indexOf('--html');
const HTML = hi >= 0 ? rest[hi + 1] : null;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(WAIT);
const el = page.locator(sel).first();
const text = await el.innerText();
console.log('=== innerText ===');
console.log(text.slice(0, 4000));
if (HTML) {
  const html = await el.innerHTML();
  writeFileSync(HTML, html);
  console.log(`html -> ${HTML} (${html.length} chars)`);
}
await browser.close();
