// Compare local replica vs live affectUI component by screenshotting the
// demo root element on each side (first sizable *-demo or ui-* container).
// Usage: node tools/cmp-live.mjs <slug> [waitMs]
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { writeFileSync } from 'fs';

const slug = process.argv[2];
const waitMs = +(process.argv[3] || 1800);
const b = await chromium.launch();

const FIND = `(() => {
  const cands = [...document.querySelectorAll('[class*="-demo"], [class^="ui-"]')];
  for (const el of cands) {
    const r = el.getBoundingClientRect();
    const cls = el.className?.toString() || '';
    if (r.width > 200 && r.height > 60 && !cls.includes('__')) return el;
  }
  return document.querySelector('main') || document.body;
})()`;

async function grab(url) {
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 100)));
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 100)); });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 40000 });
  await p.waitForTimeout(waitMs);
  const handle = await p.evaluateHandle(FIND);
  const el = handle.asElement();
  const cls = await p.evaluate(e => e ? (e.className?.toString() || e.tagName).slice(0, 60) : 'NONE', el);
  const buf = el ? await el.screenshot() : await p.screenshot();
  const size = el ? await p.evaluate(e => { const r = e.getBoundingClientRect(); return [r.width | 0, r.height | 0]; }, el) : null;
  await p.close();
  return { buf, errs, cls, size };
}

const L = await grab(`https://www.affectui.com/components/${slug}`);
const R = await grab(`http://localhost:5173/preview/${slug}`);

const f1 = `shots/cmp-${slug}-live.png`, f2 = `shots/cmp-${slug}-local.png`;
writeFileSync(f1, L.buf); writeFileSync(f2, R.buf);
const i1 = PNG.sync.read(L.buf), i2 = PNG.sync.read(R.buf);
console.log(`${slug}: live[${L.cls} ${L.size}] local[${R.cls} ${R.size}]`);
if (i1.width === i2.width && i1.height === i2.height) {
  const n = pixelmatch(i1.data, i2.data, null, i1.width, i1.height, { threshold: 0.1 });
  console.log(`  MISMATCH ${(100 * n / (i1.width * i1.height)).toFixed(3)}% (${n}px)`);
} else {
  console.log(`  SIZE MISMATCH ${i1.width}x${i1.height} vs ${i2.width}x${i2.height}`);
}
if (L.errs.length || R.errs.length) console.log('  errs live:', L.errs[0], '| local:', R.errs[0]);
await b.close();
