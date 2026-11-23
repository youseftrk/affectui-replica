// One-shot replica builder: extract live preview -> JSX + CSS -> src/components/ui/<slug>.tsx
// Usage: node tools/build.mjs <slug> [--name ComponentName]
import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
const ni = process.argv.indexOf('--name');
const name = ni >= 0 ? process.argv[ni + 1] : slug.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('') + 'Demo';
const run = (args) => execFileSync('node', args, { cwd: root, stdio: 'pipe' }).toString();

console.log(`[1/4] extract ${slug}`);
run(['tools/extract.mjs', `https://www.affectui.com/components/${slug}`, '--selector', '.stage', '--css-for', '*']);
const ex = JSON.parse(readFileSync(join(root, `tools/extract-${slug}.json`), 'utf8'));
if (ex.error) { console.log('EXTRACT FAILED:', ex.error.slice(0, 200)); process.exit(1); }

console.log(`[2/4] html->jsx`);
run(['tools/html2jsx.mjs', `tools/extract-${slug}.json`, '--out', `tools/${slug}-demo.jsx`]);

console.log(`[3/4] assemble css`);
run(['tools/assemble-css.mjs', slug, '--out', `tools/${slug}-assembled.css`]);

console.log(`[4/4] emit tsx`);
const demo = readFileSync(join(root, `tools/${slug}-demo.jsx`), 'utf8');
const css = readFileSync(join(root, `tools/${slug}-assembled.css`), 'utf8');
const inner = demo.replace(/^[\s\S]*?<>\s*/, '').replace(/\s*<\/>[\s\S]*$/, '').trim();
const tsx = `const css = ${JSON.stringify(css)};\n\nexport default function ${name}() {\n  return (\n    <>\n      <style>{css}</style>\n      ${inner}\n    </>\n  );\n}\n`;
writeFileSync(join(root, `src/components/ui/${slug}.tsx`), tsx);
console.log(`DONE ${slug} -> src/components/ui/${slug}.tsx (${tsx.length} chars)`);
