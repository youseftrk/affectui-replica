// Per-cell mismatch map for two PNGs. Prints an ASCII heatmap + top cells.
// Usage: node tools/diffmap.mjs <a.png> <b.png> [--cols 12] [--rows 8] [--threshold 0.1]
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { readFileSync } from 'fs';

const [a, b, ...rest] = process.argv.slice(2);
const oi = rest.indexOf('--cols'), ri = rest.indexOf('--rows'), ti = rest.indexOf('--threshold');
const COLS = oi >= 0 ? +rest[oi + 1] : 12;
const ROWS = ri >= 0 ? +rest[ri + 1] : 8;
const threshold = ti >= 0 ? +rest[ti + 1] : 0.1;

const img1 = PNG.sync.read(readFileSync(a));
const img2 = PNG.sync.read(readFileSync(b));
if (img1.width !== img2.width || img1.height !== img2.height) {
  console.log(`SIZE MISMATCH: ${img1.width}x${img1.height} vs ${img2.width}x${img2.height}`);
  process.exit(2);
}
const { width: W, height: H } = img1;
const cw = Math.ceil(W / COLS), ch = Math.ceil(H / ROWS);
const cells = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const x0 = c * cw, y0 = r * ch;
    const x1 = Math.min(W, x0 + cw), y1 = Math.min(H, y0 + ch);
    const w = x1 - x0, h = y1 - y0;
    // extract sub-images
    const s1 = new PNG({ width: w, height: h });
    const s2 = new PNG({ width: w, height: h });
    for (let y = 0; y < h; y++) {
      const si = ((y0 + y) * W + x0) * 4, di = y * w * 4;
      img1.data.copy(s1.data, di, si, si + w * 4);
      img2.data.copy(s2.data, di, si, si + w * 4);
    }
    const n = pixelmatch(s1.data, s2.data, null, w, h, { threshold });
    cells.push({ r, c, pct: n / (w * h) * 100, n });
  }
}
const chars = ' .:-=+*#%@';
console.log(`size ${W}x${H}, cell ~${cw}x${ch}`);
for (let r = 0; r < ROWS; r++) {
  let line = '';
  for (let c = 0; c < COLS; c++) {
    const cell = cells[r * COLS + c];
    const idx = Math.min(9, Math.floor(cell.pct / 10 * 10));
    line += chars[Math.min(9, Math.round(cell.pct / 12 * 9))] || ' ';
  }
  console.log(line);
}
console.log('--- top cells ---');
cells.sort((x, y) => y.n - x.n);
for (const cell of cells.slice(0, 8)) {
  console.log(`r${cell.r}c${cell.c} (${cell.pct.toFixed(1)}%, ${cell.n}px) x[${cell.c * cw}-${Math.min(W, (cell.c + 1) * cw)}] y[${cell.r * ch}-${Math.min(H, (cell.r + 1) * ch)}]`);
}
