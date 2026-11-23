// Extract structure/CSS/computed styles/animations from a live affectui component page.
// Usage:
//   node tools/extract.mjs <url> [--selector CSS]           -> JSON: html + css + keyframes + computed(root)
//   node tools/extract.mjs <url> --selector CSS --deep      -> also computed styles for every descendant (capped)
//   node tools/extract.mjs <url> --anims                    -> running CSS/WAAPI animations on the page
//   node tools/extract.mjs <url> --html-only                -> just outerHTML of selector
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const args = process.argv.slice(2);
const url = args[0];
const opt = (name, dflt) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : dflt; };
const has = (name) => args.includes(name);
const CSSFOR = opt('--css-for', null);
const WAIT = +opt('--wait', 1200);
const selector = opt('--selector', '.stage__look') || '.stage__look';

const PROPS = ['display','position','top','right','bottom','left','width','height','min-width','min-height','max-width','max-height',
'padding','padding-top','padding-right','padding-bottom','padding-left','margin','margin-top','margin-right','margin-bottom','margin-left',
'color','background-color','background-image','font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-align','text-decoration','text-transform','white-space','overflow','overflow-x','overflow-y',
'border','border-top','border-right','border-bottom','border-left','border-radius','border-color','border-width','border-style','outline','box-shadow',
'flex','flex-direction','flex-wrap','flex-grow','flex-shrink','flex-basis','align-items','align-content','justify-content','gap','row-gap','column-gap','order',
'grid','grid-template-columns','grid-template-rows','grid-area','place-items','place-content',
'opacity','visibility','z-index','cursor','pointer-events','user-select','transform','transform-origin','transition','transition-property','transition-duration','transition-timing-function','transition-delay','animation','animation-name','animation-duration','animation-timing-function','animation-delay','animation-iteration-count','animation-direction','animation-fill-mode','animation-play-state','filter','backdrop-filter','object-fit','aspect-ratio','vertical-align','list-style','appearance','accent-color'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(WAIT);

const data = await page.evaluate(({ selector, PROPS, deep, htmlOnly, animsOnly, cssFor }) => {
  const out = {};
  if (animsOnly) {
    out.animations = document.getAnimations().map(a => ({
      type: a.constructor.name,
      playState: a.playState,
      currentTime: a.currentTime,
      effect: a.effect && a.effect.target ? {
        target: a.effect.target.tagName + '.' + (a.effect.target.className && a.effect.target.className.baseVal !== undefined ? a.effect.target.className.baseVal : a.effect.target.className || '').toString().slice(0, 80),
        timing: a.effect.getTiming ? a.effect.getTiming() : null,
      } : null,
    }));
    return out;
  }
  const root = document.querySelector(selector);
  if (!root) return { error: `selector not found: ${selector}` };
  if (htmlOnly) { out.html = root.outerHTML; return out; }

  // CSS rules from all stylesheets that match anything inside root
  const els = [root, ...root.querySelectorAll('*')];
  const elSet = new Set(els);
  const rules = [];
  const keyframes = {};
  const seen = new Set();
  const matches = (selText) => {
    try {
      // test selector against each element (cheap enough for rule counts here)
      for (const el of els) { if (el.matches(selText)) return true; }
    } catch {}
    return false;
  };
  const walk = (rulesList, media) => {
    for (const r of rulesList) {
      const isCont = r.constructor.name === 'CSSContainerRule' || r.type === 17 || r.type === CSSRule.CONTAINER_RULE;
      if (r.type === CSSRule.MEDIA_RULE || r.type === CSSRule.SUPPORTS_RULE || isCont) { walk(r.cssRules, (media ? media + ' ' : '') + (isCont ? '@container ' : '') + r.conditionText + ' '); continue; }
      if (r.type === CSSRule.KEYFRAMES_RULE) {
        keyframes[r.name] = [...r.cssRules].map(k => `${k.keyText}{${k.style.cssText}}`);
        continue;
      }
      if (r.type !== CSSRule.STYLE_RULE) continue;
      if (matches(r.selectorText)) {
        const key = media + r.cssText;
        if (!seen.has(key)) { seen.add(key); rules.push(media ? `[${media.trim()}] ${r.cssText}` : r.cssText); }
      }
    }
  };
  for (const sheet of document.styleSheets) { try { walk(sheet.cssRules, ''); } catch {} }
  // inline <style> blocks inside root too
  root.querySelectorAll('style').forEach(s => { /* covered by document.styleSheets */ });

  if (cssFor) {
    const all = [];
    const kf2 = {};
    const walk2 = (rl, cond) => { for (const r of rl) {
      const isCont = r.constructor.name === 'CSSContainerRule' || r.type === 17 || r.type === CSSRule.CONTAINER_RULE;
      if (r.type === CSSRule.MEDIA_RULE || r.type === CSSRule.SUPPORTS_RULE || isCont) { walk2(r.cssRules, (cond?cond+' ':'')+'['+(isCont ? '@container ' : '')+r.conditionText+']}'); continue; }
      if (r.type === CSSRule.KEYFRAMES_RULE) { kf2[r.name] = [...r.cssRules].map(k => k.keyText + '{' + k.style.cssText + '}'); continue; }
      if (r.type === CSSRule.STYLE_RULE && (cssFor==='*'||r.selectorText.includes(cssFor))) all.push((cond||'')+r.cssText);
    }};
    for (const sheet of document.styleSheets) { try { walk2(sheet.cssRules); } catch {} }
    out.allRulesForPrefix = all; out.allKeyframes = kf2;
  }
  out.selector = selector;
  out.url = location.href;
  out.html = root.outerHTML.length > 400000 ? root.outerHTML.slice(0, 400000) + '…TRUNCATED' : root.outerHTML;
  out.rules = rules;
  out.keyframes = keyframes;

  const cs = (el) => { const c = getComputedStyle(el); const o = {}; for (const p of PROPS) { const v = c.getPropertyValue(p); if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)' && v !== 'static') o[p] = v; } return o; };
  out.rootComputed = cs(root);
  if (deep) {
    out.descendants = [];
    const all = root.querySelectorAll('*');
    for (let i = 0; i < Math.min(all.length, 400); i++) {
      const el = all[i];
      const cls = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || '').toString().slice(0, 100);
      out.descendants.push({ tag: el.tagName.toLowerCase(), cls, id: el.id || '', text: el.childNodes.length === 1 && el.firstChild.nodeType === 3 ? el.textContent.trim().slice(0, 60) : '', style: cs(el) });
    }
    out.descendantCount = all.length;
  }
  return out;
}, { selector, PROPS, deep: has('--deep'), htmlOnly: has('--html-only'), animsOnly: has('--anims'), cssFor: CSSFOR });

const slug = url.split('/').filter(Boolean).pop();
const outFile = `tools/extract-${slug}.json`;
writeFileSync(outFile, JSON.stringify(data, null, 1));
console.log(`wrote ${outFile} (${JSON.stringify(data).length} bytes)`);
if (data.error) console.log(data.error);
await browser.close();
