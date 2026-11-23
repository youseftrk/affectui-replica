// Download the official affectui registry source for a FREE component.
// Usage: node tools/fetch-source.mjs <slug>   (writes src/components/ui/<slug>.tsx; extras -> src/components/ui/<slug>/)
// Pro items return 401 — use extract.mjs instead.
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
if (!slug) { console.log('usage: node tools/fetch-source.mjs <slug>'); process.exit(1); }
const r = await fetch(`https://www.affectui.com/r/${slug}.json`);
if (r.status !== 200) { console.log(`registry ${r.status} for ${slug} — Pro or missing; use extract.mjs`); process.exit(1); }
const item = await r.json();
const files = item.files || [];
console.log(`${slug}: ${files.length} file(s), deps: ${(item.dependencies||[]).join(', ') || 'none'}`);
for (const f of files) {
  const p = (f.path || '').replace(/^src\//, '').replace(/^components\//, '');
  let dest;
  if (/\.tsx?$/.test(p) && p.split('/').pop() === `${slug}.tsx`) dest = join(root, 'src/components/ui', `${slug}.tsx`);
  else if (/\.tsx?$/.test(p)) dest = join(root, 'src/components/ui', slug, p.split('/').pop());
  else dest = join(root, 'src/components/ui', slug, p.split('/').pop() || 'file');
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, f.content || '');
  console.log('  wrote', dest.replace(root + '\', '').replace(root + '/', ''));
}
