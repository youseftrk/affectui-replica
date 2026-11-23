import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slugs = process.argv.slice(2);
for (const s of slugs) {
  const p = JSON.parse(readFileSync(join(root, `tools/probes/${s}.json`), 'utf8'));
  const cssPath = join(root, `tools/${s}-assembled.css`);
  const css = existsSync(cssPath) ? readFileSync(cssPath, 'utf8') : '';
  const stateSelectors = [...new Set(
    (css.match(/\.[a-z0-9_-]+(?:\[[^\]]+\])+/gi) || [])
      .filter(x => !x.includes('data-theme') && !x.includes('data-look'))
  )].slice(0, 28);
  console.log(`\n==================== ${s} ====================`);
  console.log('BASE:', (p.baseText || '').slice(0, 240));
  console.log(`CONTROLS (${p.controls.length}):`, p.controls.slice(0, 14).map(c =>
    `${c.tag}.${c.cls.split(' ')[0]}[${c.role || c.type}]="${c.text || c.ariaLabel}"`
  ).join(' | '));
  console.log('CSS STATES:', stateSelectors.join(' | '));
  for (const i of p.interactions) {
    const ad = i.attrDiffs.length ? ' ATTR:' + JSON.stringify(i.attrDiffs.slice(0, 2)) : '';
    const pop = i.newPopovers?.length ? ' POP:' + JSON.stringify(i.newPopovers.slice(0, 1)) : '';
    console.log(`  ACT ${i.action} ${i.target} d=${i.htmlDelta} chg=${i.textChanged}${i.addedWords ? ' +' + i.addedWords.slice(0, 80) : ''}${ad}${pop}`);
  }
  if (p.hoverEffects?.length) {
    console.log('  HOVER:', JSON.stringify(p.hoverEffects.slice(0, 3)));
  }
}
