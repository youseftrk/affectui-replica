// Aggregate final replica status across all groups.
// Usage: node tools/final-report.mjs
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const groups = {};
for (const f of readdirSync(join(root, 'tools')).filter(f => /^group-\d+\.txt$/.test(f))) {
  const g = f.match(/\d+/)[0];
  groups[g] = readFileSync(join(root, 'tools', f), 'utf8').split(/\s+/).filter(Boolean);
}
groups.mine = readFileSync(join(root, 'tools/group-mine.txt'), 'utf8').split(/\s+/).filter(Boolean);

// parse status files: "slug | pct | verdict"
const status = {};
for (const f of readdirSync(join(root, 'tools')).filter(f => /^status-group\d+\.md$/.test(f))) {
  for (const line of readFileSync(join(root, 'tools', f), 'utf8').split('\n')) {
    const m = line.match(/^\s*([a-z0-9-]+)\s*\|\s*([\d.]+)\s*%?\s*\|\s*(.+)$/i);
    if (m) status[m[1]] = { pct: parseFloat(m[2]), verdict: m[3].trim() };
  }
}

const have = new Set(readdirSync(join(root, 'src/components/ui')).filter(f => f.endsWith('.tsx')).map(f => f.slice(0, -4)));
const all = [...new Set(Object.values(groups).flat())];

const rows = all.map(slug => {
  const tsx = have.has(slug);
  const st = status[slug];
  return { slug, tsx, pct: st?.pct ?? null, verdict: st?.verdict ?? 'NO-STATUS' };
});

const missing = rows.filter(r => !r.tsx);
const noStatus = rows.filter(r => r.tsx && r.pct === null);
const worst = rows.filter(r => r.pct !== null).sort((a, b) => b.pct - a.pct).slice(0, 15);

console.log(`TOTAL ${all.length} | files ${rows.filter(r => r.tsx).length} | missing ${missing.length} | no-status ${noStatus.length}\n`);
if (missing.length) console.log('MISSING FILES:', missing.map(r => r.slug).join(', '), '\n');
if (noStatus.length) console.log('NO STATUS:', noStatus.map(r => r.slug).join(', '), '\n');
console.log('WORST 15:');
for (const r of worst) console.log(`  ${r.slug.padEnd(24)} ${String(r.pct).padStart(7)}%  ${r.verdict.slice(0, 60)}`);
const under = rows.filter(r => r.pct !== null && r.pct < 0.1).length;
console.log(`\n<0.1%: ${under} | <0.5%: ${rows.filter(r => r.pct !== null && r.pct < 0.5).length} | >=0.5%: ${rows.filter(r => r.pct !== null && r.pct >= 0.5).length}`);
