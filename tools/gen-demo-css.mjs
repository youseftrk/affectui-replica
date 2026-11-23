// Generate per-slug demo wrapper CSS (src/demo-css/<slug>.css) from tools/<slug>-assembled.css
// Keeps .stage:has(...) rules and demo wrapper classes (e.g. .cs-demo, .comments-demo, .button-demo, etc.)
// while stripping site landing-page chrome (.lp-*, .ba-*, .skill-pro*, .card__preview*) and component .ui-* rules
// (which the verbatim ported components already inject via their own <style> tags).
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src/demo-css');
mkdirSync(outDir, { recursive: true });

const files = readdirSync(join(root, 'tools')).filter(f => f.endsWith('-assembled.css'));
let count = 0;

for (const f of files) {
  const slug = f.slice(0, -'-assembled.css'.length);
  const raw = readFileSync(join(root, 'tools', f), 'utf8');
  const keep = [];
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    // Skip site landing-page / card-preview / marketing rules
    if (/\.(lp-|ba-|skill-pro|card__preview|fresh__|locked|changelog__|prompt-bar__|review__|license__|nav-link|section__toggle|faq__|tree__head|lib-tabs|shell\[)/.test(t)) continue;
    // Always keep per-demo .stage:has(...) and .stage <demo> rules (skip bare site-global .stage { ... })
    if (t.includes('.stage')) {
      if (/^(?:@media[^{]+\{)?\s*\.stage(?:\.stage--[a-z-]+)?\s*\{/.test(t)) continue;
      keep.push(t);
      continue;
    }
    // Skip pure component .ui-* rules & @keyframes ui-* (already rendered by component's own <style>)
    if (/^(?:@media[^{]+\{|@container[^{]+\{|@supports[^{]+\{)?\s*(?::where\([^)]*\)\s*)?(?::is\([^)]*\.ui-|\.ui-)/.test(t)) continue;
    if (/^@keyframes\s+(ui-|lp-|ba-|look-in|countdown|wish-|promo-|search-peek|menu-in|price-roll|pro-shimmer|style-menu|shell-in|consent-in)/.test(t)) continue;
    keep.push(t);
  }
  writeFileSync(join(outDir, `${slug}.css`), keep.join('\n') + '\n');
  count++;
}
console.log(`Generated ${count} demo CSS files in src/demo-css/`);
