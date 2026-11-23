// Re-emit the css const inside an existing src/components/ui/<slug>.tsx from tools/<slug>-assembled.css
// Preserves everything else (enhancers, JSX). Usage: node tools/reemit-css.mjs <slug> [slug...]
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
for (const slug of process.argv.slice(2)) {
  const cssPath = join(root, `tools/${slug}-assembled.css`);
  const tsxPath = join(root, `src/components/ui/${slug}.tsx`);
  if (!existsSync(cssPath) || !existsSync(tsxPath)) { console.log(slug, 'SKIP (missing css or tsx)'); continue; }
  const css = readFileSync(cssPath, 'utf8');
  let t = readFileSync(tsxPath, 'utf8');
  const marker = 'const css = ';
  const ni = t.indexOf(marker);
  if (ni < 0) { console.log(slug, 'NO CSS CONST'); continue; }
  const j = ni + marker.length;
  const q = t[j];
  if (q !== '"') { console.log(slug, 'css not a double-quoted string'); continue; }
  let k = j + 1;
  while (k < t.length) {
    if (t[k] === '\\') { k += 2; continue; }
    if (t[k] === '"') break;
    k++;
  }
  t = t.slice(0, j) + JSON.stringify(css) + t.slice(k + 1);
  writeFileSync(tsxPath, t);
  console.log(slug, 'css updated ->', css.length, 'chars');
}
