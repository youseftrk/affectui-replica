// Batch-verify all components in src/components/ui/: screenshot .stage on live site + ours, diff.
// Usage: node tools/verify-all.mjs [slug ...]   (no args = all)
// Writes shots/ref-<slug>.png, shots/ours-<slug>.png, shots/diff-<slug>.png and prints CSV lines.
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const only = process.argv.slice(2);
const files = readdirSync(join(root, 'src/components/ui')).filter(f => f.endsWith('.tsx'));
const slugs = files.map(f => f.replace(/\.tsx$/, ''));
const todo = only.length ? slugs.filter(s => only.includes(s)) : slugs;
mkdirSync(join(root, 'shots'), { recursive: true });

const browser = await chromium.launch();
async function shot(url, out) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1400);
    const el = page.locator('.stage').first();
    if (!(await el.count())) { await page.close(); return 'NO_STAGE'; }
    await el.screenshot({ path: out });
    await page.close(); return 'ok';
  } catch (e) { try { await page.close(); } catch {} return 'ERR:' + e.message.slice(0, 80); }
}
const rows = [];
for (const s of todo) {
  const ref = join(root, `shots/ref-${s}.png`), ours = join(root, `shots/ours-${s}.png`), dif = join(root, `shots/diff-${s}.png`);
  const r1 = await shot(`https://www.affectui.com/components/${s}`, ref);
  const r2 = await shot(`http://localhost:5173/preview/${s}`, ours);
  let pct = 'n/a';
  if (r1 === 'ok' && r2 === 'ok' && existsSync(ref) && existsSync(ours)) {
    const i1 = PNG.sync.read(readFileSync(ref)), i2 = PNG.sync.read(readFileSync(ours));
    if (i1.width === i2.width && i1.height === i2.height) {
      const d = new PNG({ width: i1.width, height: i1.height });
      const n = pixelmatch(i1.data, i2.data, d.data, i1.width, i1.height, { threshold: 0.1 });
      writeFileSync(dif, PNG.sync.write(d));
      pct = (n / (i1.width * i1.height) * 100).toFixed(3) + '%';
    } else pct = `SIZE ${i1.width}x${i1.height} vs ${i2.width}x${i2.height}`;
  } else pct = `ref:${r1} ours:${r2}`;
  rows.push(`${s},${pct}`);
  console.log(`${s},${pct}`);
}
writeFileSync(join(root, 'tools/verify-report.csv'), rows.join('\n') + '\n');
await browser.close();
