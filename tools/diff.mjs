// Pixel-diff two PNGs (same dimensions required).
// Usage: node tools/diff.mjs <a.png> <b.png> [out-diff.png] [--threshold 0.1]
// Prints mismatch percentage. Exit 0 always (agent reads the %).
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { readFileSync, writeFileSync } from 'fs';

const [a, b, out, ...rest] = process.argv.slice(2);
const ti = rest.indexOf('--threshold');
const threshold = ti >= 0 ? +rest[ti + 1] : 0.1;
const img1 = PNG.sync.read(readFileSync(a));
const img2 = PNG.sync.read(readFileSync(b));
if (img1.width !== img2.width || img1.height !== img2.height) {
  console.log(`SIZE MISMATCH: ${a}=${img1.width}x${img1.height} vs ${b}=${img2.width}x${img2.height}`);
  process.exit(2);
}
const diff = new PNG({ width: img1.width, height: img1.height });
const n = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold });
const total = img1.width * img1.height;
const pct = (n / total * 100);
if (out) { writeFileSync(out, PNG.sync.write(diff)); console.log(`diff png -> ${out}`); }
console.log(`MISMATCH ${pct.toFixed(3)}% (${n}/${total} px) threshold=${threshold}`);
