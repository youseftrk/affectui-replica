// Re-emit src/components/ui/<slug>.tsx from tools/<slug>-demo.jsx + tools/<slug>-assembled.css
// Optional injections:
//   tools/<slug>-imports.txt   -> import lines placed after `const css`
//   tools/<slug>-preamble.txt  -> statements placed inside the component before `return (`
// Usage: node tools/emit-tsx.mjs <slug>
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
const name = slug.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('') + 'Demo';
const demo = readFileSync(join(root, `tools/${slug}-demo.jsx`), 'utf8');
const css = readFileSync(join(root, `tools/${slug}-assembled.css`), 'utf8');
const impPath = join(root, `tools/${slug}-imports.txt`);
const prePath = join(root, `tools/${slug}-preamble.txt`);
const imports = existsSync(impPath) ? readFileSync(impPath, 'utf8').trim() + '\n\n' : '';
const preamble = existsSync(prePath) ? '\n' + readFileSync(prePath, 'utf8').trim().split('\n').map(l => '  ' + l).join('\n') + '\n' : '';
const inner = demo.replace(/^[\s\S]*?<>\s*/, '').replace(/\s*<\/>[\s\S]*$/, '').trim();
const tsx = `const css = ${JSON.stringify(css)};\n\n${imports}export default function ${name}() {${preamble}  return (\n    <>\n      <style>{css}</style>\n      ${inner}\n    </>\n  );\n}\n`;
writeFileSync(join(root, `src/components/ui/${slug}.tsx`), tsx);
console.log(`emitted ${slug} -> src/components/ui/${slug}.tsx (${tsx.length} chars)`);
