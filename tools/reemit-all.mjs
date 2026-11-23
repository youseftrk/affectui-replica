// Re-emit tsx for a slug using existing demo.jsx + freshly assembled css
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
const name = slug.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('') + 'Demo';
const demo = readFileSync(join(root, `tools/${slug}-demo.jsx`), 'utf8');
const css = readFileSync(join(root, `tools/${slug}-assembled.css`), 'utf8');
const inner = demo.slice(demo.indexOf('<>') + 2, demo.lastIndexOf('</>')).trim();
const tsx = `const css = ${JSON.stringify(css)};\n\nexport default function ${name}() {\n  return (\n    <>\n      <style>{css}</style>\n      ${inner}\n    </>\n  );\n}\n`;
writeFileSync(join(root, `src/components/ui/${slug}.tsx`), tsx);
console.log(`re-emitted ${slug} (${tsx.length} chars)`);
