// Generate embedded data + new agent-crew.tsx from acrc-dump.json
import { readFileSync, writeFileSync } from 'fs';
const d = JSON.parse(readFileSync('tools/acrc-dump.json', 'utf8'));

function innerOf(outer) {
  // strip first <div ...> and last </div>
  const m = outer.match(/^<div[^>]*>([\s\S]*)<\/div>$/);
  return m ? m[1] : outer;
}
function stripPanel(outer) {
  const m = outer.match(/^<div[^>]*>([\s\S]*)<\/div>$/);
  if (!m) return { inner: outer, attrs: '' };
  const openTag = outer.slice(0, outer.indexOf('>') + 1);
  return { inner: m[1], attrs: openTag };
}
const nameOf = s => (s.split(' – ')[0] || s.split(':')[0] || s).trim();

const trees = {};
for (const p of ['p1', 'p2', 'p3']) trees[p] = innerOf(d[p + '-tree']);

// panels: key `${proj}:${name}`
const panels = {};
for (const p of ['p1', 'p2', 'p3']) {
  for (const [k, v] of Object.entries(d[p + '-panels'])) {
    if (k.endsWith('::node')) continue;
    const { inner, attrs } = stripPanel(v);
    const aria = (attrs.match(/aria-label="([^"]*)"/) || [])[1] || '';
    const color = (attrs.match(/--ui-acrc-c: ([^;]+);/) || [])[1] || '';
    const width = (attrs.match(/width: ([^;]+);/) || [])[1] || '208px';
    const name = nameOf(aria);
    panels[`${p}:${name}`] = { inner, label: aria, color, width };
  }
}
// sr text per project from section dump
const srs = {};
for (const p of ['p1', 'p2', 'p3']) {
  const m = d[p + '-section'].match(/ui-acrc__sr"[^>]*>([^<]*)</);
  srs[p] = m ? m[1] : '';
}

const esc = s => JSON.stringify(s);
let out = '';
out += `// embedded snapshots captured from live preview (projects 2-3 trees, all agent panels)\n`;
out += `const TREES: Record<number, string> = {\n`;
out += `  1: ${esc(trees.p2)},\n  2: ${esc(trees.p3)},\n};\n`;
out += `const PANELS: Record<string, { inner: string; label: string; color: string; width: string }> = {\n`;
for (const [k, v] of Object.entries(panels)) {
  out += `  ${esc(k)}: { inner: ${esc(v.inner)}, label: ${esc(v.label)}, color: ${esc(v.color)}, width: ${esc(v.width)} },\n`;
}
out += `};\n`;
out += `const SR_TEXT = [${esc(srs.p1)}, ${esc(srs.p2)}, ${esc(srs.p3)}];\n`;
writeFileSync('tools/acrc-data.js', out);
console.log('panels:', Object.keys(panels).join(', '));
console.log('sr:', srs);
console.log('tree inner sizes:', Object.entries(trees).map(([k,v])=>k+':'+v.length).join(' '));
console.log('wrote tools/acrc-data.js', out.length);
