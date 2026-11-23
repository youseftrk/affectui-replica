// Wire an enhancer function into an extracted src/components/ui/<slug>.tsx component.
// Usage: node tools/wire-enhancer.mjs <slug> <enhancerModule> <enhancerExportName>
// Example: node tools/wire-enhancer.mjs autonomy-dial ./enhancers/batch1 enhanceAutonomyDial
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [slug, modPath, fnName] = process.argv.slice(2);
if (!slug || !modPath || !fnName) {
  console.error('Usage: node tools/wire-enhancer.mjs <slug> <modPath> <fnName>');
  process.exit(1);
}

const filePath = join(root, `src/components/ui/${slug}.tsx`);
let src = readFileSync(filePath, 'utf8');

// Extract css string and JSX inner body reliably
const cssMatch = src.match(/const css = ("(?:\\.|[^"\\])*");/);
if (!cssMatch) {
  console.error(`${slug}: could not find const css = "..."`);
  process.exit(1);
}
const cssDecl = `const css = ${cssMatch[1]};`;

const styleTag = '<style>{css}</style>';
const styleIdx = src.indexOf(styleTag);
const closeFragIdx = src.lastIndexOf('</>');
if (styleIdx < 0 || closeFragIdx < 0) {
  console.error(`${slug}: could not find JSX fragment body`);
  process.exit(1);
}
let inner = src.slice(styleIdx + styleTag.length, closeFragIdx).trim();

// Convert static controlled value="..." on <input>/<textarea> to defaultValue="..." so user typing works!
inner = inner.replace(/<(input|textarea)\b([^>]*?)\bvalue="([^"]*)"/g, '<$1$2defaultValue="$3"');
// Convert <textarea ...>text</textarea> children into defaultValue so React emits zero errors!
inner = inner.replace(/<textarea\b([^>]*)>([^<]+)<\/textarea>/g, (_, attrs, text) => `<textarea${attrs} defaultValue={${JSON.stringify(text)}}></textarea>`);
// Also fix any invalid JSX attributes that can appear from html2jsx (e.g. spellcheck -> spellCheck, inputmode -> inputMode, tabindex -> tabIndex, readonly -> readOnly, maxlength -> maxLength)
inner = inner
  .replace(/\bspellcheck=/g, 'spellCheck=')
  .replace(/\binputmode=/g, 'inputMode=')
  .replace(/\btabindex=/g, 'tabIndex=')
  .replace(/\breadonly\b(?!=)/g, 'readOnly')
  .replace(/\bmaxlength=/g, 'maxLength=')
  .replace(/\benterkeyhint=/g, 'enterKeyHint=')
  .replace(/\bautocapitalize=/g, 'autoCapitalize=')
  .replace(/\bautocomplete=/g, 'autoComplete=');

// Extract component function name
const fnMatch = src.match(/export default function (\w+)\s*\(/);
const compName = fnMatch ? fnMatch[1] : slug.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('') + 'Demo';

// Add ref={hostRef} to the outermost element in inner (if not already present)
if (!/^<\w+[^>]*ref=\{hostRef\}/.test(inner)) {
  inner = inner.replace(/^<(\w+)(\s|>)/, '<$1 ref={hostRef}$2');
}

const out = `import { useEffect, useRef } from 'react';
import { ${fnName} } from '${modPath}';

${cssDecl}

export default function ${compName}() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = hostRef.current;
    return el ? ${fnName}(el) : undefined;
  }, []);
  return (
    <>
      <style>{css}</style>
      ${inner}
    </>
  );
}
`;

writeFileSync(filePath, out);
console.log(`wired ${slug} -> ${fnName} (${out.length} chars)`);
