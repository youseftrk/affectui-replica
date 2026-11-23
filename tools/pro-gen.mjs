// Generates the interactive JSX tail for a ui component file, preserving the css const on line 1.
// Usage: node tools/pro-gen.mjs <slug> <jsxfile>
import { readFileSync, writeFileSync } from 'fs';
const [slug, jsxFile] = process.argv.slice(2);
const path = `src/components/ui/${slug}.tsx`;
const src = readFileSync(path, 'utf8');
const nl = src.indexOf('\n');
const head = src.slice(0, nl + 1); // includes css const line + newline
const jsx = readFileSync(jsxFile, 'utf8');
writeFileSync(path, head + jsx);
console.log('wrote', path, 'head bytes:', head.length, 'jsx bytes:', jsx.length);
