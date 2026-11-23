// Compare undo/redo cascade behavior live vs local.
// Usage: node tools/ldgc-compare.mjs
import { chromium } from 'playwright';
const targets = [
  ['https://www.affectui.com/components/agent-ledger', 'LIVE'],
  ['http://localhost:5173/preview/agent-ledger', 'OURS'],
];
const dump = () => {
  const rows = [...document.querySelectorAll('.ui-ldgc__row')].map(r => ({
    t: (r.querySelector('.ui-ldgc__what')?.getAttribute('title') || '').split(' ').slice(0, 3).join(' '),
    und: r.hasAttribute('data-undone'),
    chain: r.getAttribute('data-chain'),
    flag: r.querySelector('.ui-ldgc__flag')?.textContent?.trim() || '',
    o: r.style.getPropertyValue('--o'),
  }));
  return { rows, sum: document.querySelector('.ui-ldgc__sum')?.textContent?.replace(/\s+/g, ' ').trim() };
};
const browser = await chromium.launch();
for (const [url, tag] of targets) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.locator('.stage__look').scrollIntoViewIfNeeded();
  // wait for all 8 rows but BEFORE pointAt window ideally; just proceed, interactions set 'interacted'
  await page.waitForFunction(() => document.querySelectorAll('.ui-ldgc__row').length >= 8, { timeout: 30000 });
  // hover undo on 'post' row (Posted in #launch) -> should preview cascade? post has no dependents.
  // instead hover 'deploy' undo -> post is descendant => post gets chain flag
  const hoverRes = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.ui-ldgc__row')];
    const r = rows.find(r => (r.querySelector('.ui-ldgc__what')?.getAttribute('title') || '').includes('Deployed'));
    const btn = r?.querySelector('.ui-ldgc__act');
    if (!btn) return 'no-btn';
    btn.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
    btn.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    return 'hovered';
  });
  await page.waitForTimeout(400);
  console.log(`\n### ${tag} HOVER deploy-undo (${hoverRes})`);
  console.log(JSON.stringify(await page.evaluate(dump), null, 0).slice(0, 2000));
  // click undo on deploy -> cascades to post
  await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.ui-ldgc__row')];
    const r = rows.find(r => (r.querySelector('.ui-ldgc__what')?.getAttribute('title') || '').includes('Deployed'));
    r?.querySelector('.ui-ldgc__act')?.click();
  });
  await page.waitForTimeout(900);
  console.log(`### ${tag} AFTER undo deploy`);
  console.log(JSON.stringify(await page.evaluate(dump), null, 0).slice(0, 2400));
  // click undo on pr (Merged PR) -> cascades deploy(already undone? no—deploy undone) + post
  await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.ui-ldgc__row')];
    const r = rows.find(r => (r.querySelector('.ui-ldgc__what')?.getAttribute('title') || '').includes('Merged PR'));
    r?.querySelector('.ui-ldgc__act')?.click();
  });
  await page.waitForTimeout(900);
  console.log(`### ${tag} AFTER undo pr`);
  console.log(JSON.stringify(await page.evaluate(dump), null, 0).slice(0, 2400));
  // redo pr
  await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.ui-ldgc__row')];
    const r = rows.find(r => (r.querySelector('.ui-ldgc__what')?.getAttribute('title') || '').includes('Merged PR'));
    r?.querySelector('.ui-ldgc__act')?.click();
  });
  await page.waitForTimeout(900);
  console.log(`### ${tag} AFTER redo pr`);
  console.log(JSON.stringify(await page.evaluate(dump), null, 0).slice(0, 2400));
  await page.close();
}
await browser.close();
