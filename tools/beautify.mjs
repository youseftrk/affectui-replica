import { readFileSync, writeFileSync } from 'fs';
const s = readFileSync(process.argv[2], 'utf8');
let out = '', depth = 0, instr = null;
for (let i = 0; i < s.length; i++) {
  const c = s[i];
  if (instr) {
    out += c;
    if (c === '\\') { out += s[++i]; continue; }
    if (c === instr) instr = null;
    continue;
  }
  if (c === '"' || c === "'" || c === '`') { instr = c; out += c; continue; }
  if (c === '{') { depth++; out += '{\n' + '  '.repeat(depth); continue; }
  if (c === '}') { depth--; out += '\n' + '  '.repeat(depth) + '}'; continue; }
  if (c === ';') { out += ';\n' + '  '.repeat(depth); continue; }
  out += c;
}
writeFileSync(process.argv[3], out);
console.log('lines:', out.split('\n').length);
