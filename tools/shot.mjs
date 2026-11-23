// Screenshot a page (or element) with Playwright.
// Usage:
//   node tools/shot.mjs <url> <out.png> [--selector CSS] [--w 1440] [--h 900] [--dsf 2] [--wait 900]
//        [--hover CSS] [--click CSS] [--burst N] [--burst-ms 120] [--full]
// --burst N writes out-000.png..out-NNN.png (for animation frame comparison)
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

const args = process.argv.slice(2);
const url = args[0], out = args[1];
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const has = (n) => args.includes(n);
const W = +opt('--w', 1440), H = +opt('--h', 900), DSF = +opt('--dsf', 2);
const WAIT = +opt('--wait', 900);
const SEL = opt('--selector', null);
const BURST = +opt('--burst', 0), BMS = +opt('--burst-ms', 120);
const HOVER = opt('--hover', null), CLICK = opt('--click', null);

mkdirSync(dirname(out), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: DSF });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(WAIT);
if (HOVER) { try { await page.locator(HOVER).first().hover({ timeout: 5000 }); } catch (e) { console.log('hover failed:', e.message.slice(0, 120)); } await page.waitForTimeout(400); }
if (CLICK) { try { await page.locator(CLICK).first().click({ timeout: 5000 }); } catch (e) { console.log('click failed:', e.message.slice(0, 120)); } await page.waitForTimeout(400); }

const target = SEL ? page.locator(SEL).first() : page;
if (BURST > 0) {
  for (let i = 0; i < BURST; i++) {
    const f = out.replace(/\.png$/i, `-${String(i).padStart(3, '0')}.png`);
    await target.screenshot({ path: f });
    await page.waitForTimeout(BMS);
  }
  console.log(`burst: ${BURST} frames -> ${out.replace(/\.png$/i, '-NNN.png')}`);
} else {
  await target.screenshot({ path: out });
  console.log(`wrote ${out}`);
}
await browser.close();
