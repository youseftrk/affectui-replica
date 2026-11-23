// Dump .stage innerHTML after interaction steps. Usage: node tools/dump-state.mjs <slug> '<steps json>' <outfile>
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
const slug = process.argv[2];
const steps = JSON.parse(process.argv[3] || '[]');
const out = process.argv[4] || `tools/dump-${slug}.html`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`https://www.affectui.com/components/${slug}`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1800);
for (const st of steps) {
  try {
    if (st.click) await page.locator(st.click).first().click({ timeout: 4000 });
    else if (st.hover) await page.locator(st.hover).first().hover({ timeout: 4000 });
    else if (st.type) { await page.locator(st.type.sel).first().click({ timeout: 4000 }); await page.locator(st.type.sel).first().pressSequentially(st.type.text, { delay: 20 }); }
    else if (st.key) await page.keyboard.press(st.key);
    await page.waitForTimeout(st.ms ?? 700);
  } catch (e) { console.log('ERR', e.message.slice(0, 120)); }
}
const html = await page.evaluate(() => (document.querySelector('.stage') || document.body).innerHTML);
writeFileSync(out, html);
console.log('wrote', out, html.length, 'chars');
await browser.close();
