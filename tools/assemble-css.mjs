// Build component CSS from extract-<slug>.json: filters site chrome, unwraps [(cond)] prefixes into at-rules.
// Usage: node tools/assemble-css.mjs <slug> [--prefix substr] [--out file]
// --prefix: which class substring to keep (default: derive from slug, e.g. 'button' keeps .ui-buttonc + .button-demo*)
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
const pi = process.argv.indexOf('--prefix');
const prefix = pi >= 0 ? process.argv[pi + 1] : slug.replace(/-/g, '');
const oi = process.argv.indexOf('--out');
const outf = oi >= 0 ? process.argv[oi + 1] : null;
const d = JSON.parse(readFileSync(join(root, `tools/extract-${slug}.json`), 'utf8'));
let rules = d.allRulesForPrefix || d.rules || [];

const SKIP_SEL = /^(\.stage|\.stage__look|\*|html|body|:root|button,|input,|h1,|h2,|h3,|p \{|\.doc|\.panel|\.content|main\b|\[)/;

// keep rules whose selector mentions the component/demo prefix OR ui-*c component classes OR keyframes used
const out = [];
const seen = new Set();
for (const raw of rules) {
  // split flattened media prefixes: "[(cond)] [(cond2)] sel {..}"
  let s = raw;
  const conds = [];
  const cm = s.match(/^(\[(?:[^\]]*)\]\s*)+/);
  if (cm) {
    for (const c of cm[0].matchAll(/\[([^\]]+)\]/g)) conds.push(c[1].trim());
    s = s.slice(cm[0].length);
  }
  const sel = s.slice(0, s.indexOf('{')).trim().replace(/^[\s{}]+/, '');
  const body = s.slice(s.indexOf('{'));
  // skip site chrome & element resets & dark-theme site vars
  // skip bare .stage chrome (.stage, .stage:x, .stage[..], .stage,.y) but KEEP `.stage .demo`/`.stage .ui-*c`
  // descendant rules — they carry per-demo layout (margin/padding) that applies inside our .stage too.
  if (/^\.stage(?=[:\[,$])/.test(sel) && !/has\(/.test(sel)) continue;
  // keep .stage__look rules: live uses `place-items: inherit` so per-demo
  // `.stage:has()` alignment propagates into the look container
  const isStageLook = /^\.stage__look\b/.test(sel);
  if (/^(\*|html|body|:root|button|input|textarea|select|code|pre|kbd|h1|h2|h3|p)(,|\s|\{|$)/.test(sel) && !sel.includes('.')) continue;
  if (/^:where\(\.dark/.test(sel) && !sel.includes(prefix)) { /* keep only if mentions our prefix */ }
  const stems = new Set();
  const htmlClasses = (d.html||'').match(/class="([^"]+)"/g) || [];
  for (const hc of htmlClasses) for (const c of hc.slice(7,-1).split(' ')) {
    const base = c.split('__')[0];
    if (base.endsWith('-demo')) stems.add(base.slice(0,-5));
    else if (/^[a-z]+-demo/.test(base)) stems.add(base.split('-demo')[0]);
  }
  if (prefix) stems.add(prefix);
  const mentions = [...stems].some(st => st && sel.toLowerCase().includes(st.toLowerCase())) || /ui-[a-z0-9]+c/.test(sel);
  if (!mentions && !isStageLook) continue;
  // build at-rule wrappers
  let css = '';
  for (const c of conds) {
    // strip exactly ONE wrapping paren layer (conditionText arrives parenthesized);
    // naive stripping eats parens belonging to functions like color-mix(...)
    let inner = c.trim();
    if (inner.startsWith('(') && inner.endsWith(')')) {
      let bal = 0, wraps = true;
      for (let i = 0; i < inner.length; i++) {
        if (inner[i] === '(') bal++;
        else if (inner[i] === ')') { bal--; if (bal === 0 && i < inner.length - 1) { wraps = false; break; } }
      }
      if (wraps && bal === 0) inner = inner.slice(1, -1);
    }
    const wm = inner.match(/^width\s*(<=|>=|<|>)\s*(\d+)px$/);
    let q;
    if (inner.startsWith('@container')) q = inner; // extract emits full @container prelude
    else if (/prefers-reduced-motion|pointer:|hover:|forced-colors|orientation|display-mode|scripting|inverted-colors/.test(inner)) q = '@media (' + inner + ')';
    else if (wm) { const op = {'<=':'max-width','>=':'min-width','<':'max-width','>':'min-width'}[wm[1]]; q = '@media (' + op + ': ' + wm[2] + 'px)'; }
    else if (/color-mix|color-gamut|selector\(|font-tech/.test(inner)) q = '@supports (' + inner + ')';
    else q = '@media (' + inner + ')';
    css += q + '{';
  }
  css += sel + ' ' + body + conds.map(() => '}').join('');
  if (!seen.has(css)) { seen.add(css); out.push(css); }
}
// keyframes: include only those referenced by kept rules or matching prefix
const kfNames = new Set();
for (const r of out) for (const m of r.matchAll(/animation[^;}]*?([a-zA-Z][\w-]*)\s*[;}]/g)) kfNames.add(m[1]);
for (const m of out.join('\n').matchAll(/animation(?:-name)?:\s*([^;]+)/g)) for (const n of m[1].split(/[,\s]+/)) if (/^[a-zA-Z]/.test(n) && n !== 'none' && n !== 'running' && n !== 'backwards' && n !== 'forwards' && n !== 'both' && n !== 'infinite' && !/^(ease|linear|cubic|steps|auto|\d)/.test(n)) kfNames.add(n);
const kfs = [];
for (const [name, frames] of Object.entries(d.keyframes || {})) {
  if (kfNames.has(name) || name.includes(prefix.replace(/-/g,'')) || name.includes('buttonc')) kfs.push(`@keyframes ${name} {${frames.join('')}}`);
}
const css = [...out, ...kfs].join('\n');
if (outf) { writeFileSync(join(root, outf), css); console.log('wrote', outf, css.length, 'chars,', out.length, 'rules,', kfs.length, 'keyframes'); }
else console.log(css);
