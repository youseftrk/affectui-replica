// shot agent-crew states on live|local
// usage: node tools/acrc-shot.mjs <live|local> <out.png> [steps-json]
import { chromium } from 'playwright';
const which = process.argv[2], out = process.argv[3];
const steps = JSON.parse(process.argv[4] || '[]');
const url = which === 'local' ? 'http://localhost:5173/preview/agent-crew' : 'https://www.affectui.com/components/agent-crew';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(2400);
for (const st of steps) {
  if (st.wait) { await p.waitForTimeout(st.wait); continue; }
  if (st.click) { await p.locator(`.stage ${st.click}`).first().click(); await p.waitForTimeout(st.ms ?? 500); continue; }
  if (st.hover) { await p.locator(`.stage ${st.hover}`).first().hover(); await p.waitForTimeout(st.ms ?? 400); continue; }
  if (st.key) { await p.keyboard.press(st.key); await p.waitForTimeout(300); continue; }
}
await p.locator('.stage').first().screenshot({ path: out });
console.log('wrote', out);
await b.close();
