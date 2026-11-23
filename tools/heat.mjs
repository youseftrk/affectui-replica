// Coarse heatmap of pixel differences between two PNGs (same size).
// Usage: node tools/heat.mjs <a.png> <b.png> [--grid 24] [--threshold 0.1]
import { PNG } from 'pngjs';
import { readFileSync } from 'fs';

const [a, b, ...rest] = process.argv.slice(2);
const gi = rest.indexOf('--grid');
const GRID = gi >= 0 ? +rest[gi + 1] : 24;
const ti = rest.indexOf('--threshold');
const TH = ti >= 0 ? +rest[ti + 1] : 0.1;

const img1 = PNG.sync.read(readFileSync(a));
const img2 = PNG.sync.read(readFileSync(b));
if (img1.width !== img2.width || img1.height !== img2.height) {
  console.log(`SIZE MISMATCH ${img1.width}x${img1.height} vs ${img2.width}x${img2.height}`);
  process.exit(2);
}
const { width: W, height: H } = img1;
const cells = Array.from({ length: GRID * GRID }, () => 0);
const cw = W / GRID, ch = H / GRID;
let total = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const d = Math.abs(img1.data[i] - img2.data[i]) + Math.abs(img1.data[i + 1] - img2.data[i + 1]) + Math.abs(img1.data[i + 2] - img2.data[i + 2]);
    if (d / 765 > TH) {
      total++;
      cells[Math.floor(y / ch) * GRID + Math.floor(x / cw)]++;
    }
  }
}
const max = Math.max(...cells, 1);
console.log(`mismatch px: ${total} (${(total / (W * H) * 100).toFixed(3)}%)  grid ${GRID}x${GRID}`);
for (let r = 0; r < GRID; r++) {
  let line = '';
  for (let c = 0; c < GRID; c++) {
    const v = cells[r * GRID + c] / max;
    line += v > 0.75 ? '#' : v > 0.4 ? '+' : v > 0.15 ? '.' : v > 0.02 ? ',' : ' ';
  }
  console.log(line);
}
