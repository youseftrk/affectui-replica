// Screenshot agent-ledger on live + local once all 8 rows are present (pre-pointAt window).
import { chromium } from 'playwright';
const targets = [
  ['https://www.affectui.com/components/agent-ledger', 'shots/ldgc-live-8rows.png'],
  ['http://localhost:5173/preview/agent-ledger', 'shots/ldgc-ours-8rows.png'],
];
const browser = await chromium.launch();
for (const [url, out] of targets) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  // wait until 8 rows present, then shoot quickly (before pointAt at 10s / auto-undo 12.2s)
  await page.waitForFunction(() => document.querySelectorAll('.ui-ldgc__row').length >= 8, { timeout: 30000 });
  await page.waitForTimeout(300);
  await page.locator('.stage').screenshot({ path: out });
  console.log('wrote', out);
  await page.close();
}
await browser.close();
