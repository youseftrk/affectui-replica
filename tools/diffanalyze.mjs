// Analyze diff pixels in a rect: mean colors + ASCII map.
// Usage: node tools/diffanalyze.mjs <a.png> <b.png> <x0> <y0> <x1> <y1> [--cols 20]
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { readFileSync } from 'fs';

const [a, b, x0s, y0s, x1s, y1s, ...rest] = process.argv.slice(2);
const x0 = +x0s, y0 = +y0s, x1 = +x1s, y1 = +y1s;
const COLS = rest.includes('--cols') ? +rest[rest.indexOf('--cols') + 1] : 20;

const img1 = PNG.sync.read(readFileSync(a));
const img2 = PNG.sync.read(readFileSync(b));
const W = img1.width;
const w = x1 - x0, h = y1 - y0;
const s1 = new PNG({ width: w, height: h });
const s2 = new PNG({ width: w, height: h });
for (let y = 0; y < h; y++) {
  const si = ((y0 + y) * W + x0) * 4, di = y * w * 4;
  img1.data.copy(s1.data, di, si, si + w * 4);
  img2.data.copy(s2.data, di, si, si + w * 4);
}
const mask = new PNG({ width: w, height: h });
const n = pixelmatch(s1.data, s2.data, mask.data, w, h, { threshold: 0.1 });
console.log(`diff px: ${n}/${w * h} (${(n / (w * h) * 100).toFixed(1)}%)`);
// mean colors of diff pixels
let r1 = 0, g1 = 0, b1 = 0, r2 = 0, g2 = 0, b2 = 0, cnt = 0;
for (let i = 0; i < w * h; i++) {
  const m = mask.data[i * 4];
  // pixelmatch marks diff pixels red (255,0,0); anti-aliased yellow
  if (m > 200 && mask.data[i * 4 + 1] < 100) {
    r1 += s1.data[i * 4]; g1 += s1.data[i * 4 + 1]; b1 += s1.data[i * 4 + 2];
    r2 += s2.data[i * 4]; g2 += s2.data[i * 4 + 1]; b2 += s2.data[i * 4 + 2];
    cnt++;
  }
}
if (cnt) {
  console.log(`A(ref?) mean rgb: ${Math.round(r1 / cnt)},${Math.round(g1 / cnt)},${Math.round(b1 / cnt)}`);
  console.log(`B(ours?) mean rgb: ${Math.round(r2 / cnt)},${Math.round(g2 / cnt)},${Math.round(b2 / cnt)}`);
}
// ASCII map of diff mask
const rows = Math.max(1, Math.round(h / w * COLS * 0.5));
for (let ry = 0; ry < rows; ry++) {
  let line = '';
  for (let rx = 0; rx < COLS; rx++) {
    const xa = Math.floor(rx * w / COLS), xb = Math.floor((rx + 1) * w / COLS);
    const ya = Math.floor(ry * h / rows), yb = Math.floor((ry + 1) * h / rows);
    let d = 0, t = 0;
    for (let y = ya; y < yb; y++) for (let x = xa; x < xb; x++) {
      const i = (y * w + x) * 4;
      if (mask.data[i] > 200 && mask.data[i + 1] < 100) d++;
      t++;
    }
    const p = d / t;
    line += p > 0.5 ? '#' : p > 0.2 ? '+' : p > 0.05 ? '.' : p > 0 ? ',' : ' ';
  }
  console.log(line);
}
