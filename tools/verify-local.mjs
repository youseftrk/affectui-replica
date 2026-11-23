// Verify interactivity on local preview. Usage: node tools/verify-local.mjs <slug> '<steps json>'
// steps: [{"click":"sel"},{"hover":"sel"},{"type":{"sel":"..","text":".."}},{"key":"Enter"},{"wait":ms}]
import { chromium } from 'playwright';
const slug = process.argv[2];
const steps = JSON.parse(process.argv[3] || '[]');
const base = process.env.BASE || 'http://localhost:5173';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text().slice(0, 200)); });
await page.goto(`${base}/preview/${slug}`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1200);
const snap = async (label) => {
  const info = await page.evaluate(() => {
    const stage = document.querySelector('.stage') || document.body;
    const states = [...stage.querySelectorAll('[aria-pressed],[aria-checked],[aria-expanded],[aria-selected],[data-status],[data-state],[data-open],[data-ran],[disabled],[data-active],[data-on]')]
      .map(e => `${e.tagName.toLowerCase()}.${(e.getAttribute('class')||'').split(' ')[0]}[${[...e.attributes].filter(a=>/aria-|data-|disabled/.test(a.name)).map(a=>`${a.name}=${a.value.slice(0,26)}`).join(',')}]`).slice(0, 30);
    const pops = [...stage.querySelectorAll('[role="dialog"],[role="alert"],[role="status"],[popover],[class*="pop"],[class*="toast"],[class*="menu"],[class*="tooltip"],[class*="__list"],[class*="__panel"]')]
      .filter(e => { const r = e.getBoundingClientRect(); return r.width > 2 && r.height > 2 && e.children.length; })
      .map(e => `${e.tagName.toLowerCase()}.${(e.getAttribute('class')||'').slice(0,44)} "${(e.textContent||'').trim().replace(/\s+/g,' ').slice(0,60)}"`).slice(0, 8);
    return { len: stage.innerHTML.length, states, pops };
  });
  console.log(`--- ${label} --- len=${info.len}`);
  if (info.states.length) console.log('  states:', JSON.stringify(info.states));
  if (info.pops.length) console.log('  pops:', JSON.stringify(info.pops));
};
await snap('INITIAL');
for (const st of steps) {
  try {
    if (st.click) await page.locator(st.click).first().click({ timeout: 4000 });
    else if (st.hover) await page.locator(st.hover).first().hover({ timeout: 4000 });
    else if (st.type) { await page.locator(st.type.sel).first().click({ timeout: 4000 }); await page.locator(st.type.sel).first().pressSequentially(st.type.text, { delay: 20 }); }
    else if (st.key) await page.keyboard.press(st.key);
    else if (st.wait) { await page.waitForTimeout(st.wait); continue; }
    await page.waitForTimeout(st.ms ?? 600);
    await snap(JSON.stringify(st).slice(0, 70));
  } catch (e) { console.log('STEP ERR', JSON.stringify(st).slice(0, 60), e.message.slice(0, 130)); }
}
if (errors.length) console.log('ERRORS:', JSON.stringify(errors.slice(0, 6)));
else console.log('no console/page errors');
await page.screenshot({ path: `shots/verify-${slug}.png` });
await browser.close();
