// Convert the demo-root HTML inside an extract-<slug>.json (or raw .html file) to JSX.
// Usage: node tools/html2jsx.mjs <file> [--out path]   -> prints/writes JSX fragment (single root element)
import { readFileSync, writeFileSync } from 'fs';

const file = process.argv[2];
const oi = process.argv.indexOf('--out');
const out = oi >= 0 ? process.argv[oi + 1] : null;
let html = readFileSync(file, 'utf8');
if (file.endsWith('.json')) html = JSON.parse(html).html;

// isolate inner of .stage__look (the demo root markup)
const m = html.match(/stage__look[^>]*>([\s\S]*)<\/div>\s*<\/div>\s*$/);
let inner = m ? m[1] : html;
// if the regex missed, try: content between first '>' after stage__look and last two closing divs
if (!m) {
  const i = html.indexOf('stage__look');
  const j = html.indexOf('>', i);
  inner = html.slice(j + 1).replace(/<\/div>\s*<\/div>\s*$/, '');
}

const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const ATTR_MAP = {
  'class':'className','for':'htmlFor','tabindex':'tabIndex','readonly':'readOnly','disabled':'disabled',
  'maxlength':'maxLength','minlength':'minLength','colspan':'colSpan','rowspan':'rowSpan','cellpadding':'cellPadding','cellspacing':'cellSpacing',
  'stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap','stroke-linejoin':'strokeLinejoin','stroke-dasharray':'strokeDasharray','stroke-dashoffset':'strokeDashoffset','stroke-miterlimit':'strokeMiterlimit','stroke-opacity':'strokeOpacity',
  'fill-rule':'fillRule','clip-rule':'clipRule','fill-opacity':'fillOpacity','clip-path':'clipPath','fill-opacity':'fillOpacity',
  'stop-color':'stopColor','stop-opacity':'stopOpacity','stroke-alignment':'strokeAlignment','vector-effect':'vectorEffect',
  'gradientunits':'gradientUnits','gradienttransform':'gradientTransform','patternunits':'patternUnits','patterncontentunits':'patternContentUnits',
  'markerwidth':'markerWidth','markerheight':'markerHeight','markerunits':'markerUnits','refx':'refX','refy':'refY','orient':'orient',
  'viewbox':'viewBox','preserveaspectratio':'preserveAspectRatio','xmlns:xlink':'xmlnsXlink','xlink:href':'xlinkHref',
  'xml:space':'xmlSpace','xml:lang':'xmlLang','autocomplete':'autoComplete','autofocus':'autoFocus','autoplay':'autoPlay','novalidate':'noValidate','formaction':'formAction','enctype':'encType','srcset':'srcSet','crossorigin':'crossOrigin','datetime':'dateTime','srcdoc':'srcDoc','srcset':'srcSet','itemprop':'itemProp','itemscope':'itemScope','charset':'charSet','http-equiv':'httpEquiv','accept-charset':'acceptCharset'
};
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^(webkit|moz|ms|o)([A-Z])/, (m,p,c)=> p==='ms' ? 'ms'+c : p[0].toUpperCase()+p.slice(1)+c);

// HTML boolean attributes -> correct JSX form. `checked=""`/`disabled=""` are falsy in React;
// bare presence or ="" must emit the bare prop (or default* for form state).
const BOOL_MAP = {
  'checked':'defaultChecked','selected':'defaultSelected','disabled':'disabled','readonly':'readOnly',
  'required':'required','multiple':'multiple','hidden':'hidden','open':'open','controls':'controls',
  'loop':'loop','muted':'muted','reversed':'reversed','itemscope':'itemScope','novalidate':'noValidate',
  'autofocus':'autoFocus','autoplay':'autoPlay','playsinline':'playsInline','allowfullscreen':'allowFullScreen',
  'async':'async','defer':'defer','nomodule':'noModule','ismap':'isMap','formnovalidate':'formNoValidate',
  'typemustmatch':'typeMustMatch','inert':'inert','default':'default','compact':'compact','declare':'declare',
  'nohref':'noHref','noresize':'noResize','noshade':'noShade','nowrap':'noWrap','seamless':'seamless',
  'sortable':'sortable','truespeed':'trueSpeed','disablepictureinpicture':'disablePictureInPicture',
  'disableremoteplayback':'disableRemotePlayback','playsinline':'playsInline','defaultmuted':'defaultMuted',
  'disablepictureinpicture':'disablePictureInPicture','credentialless':'credentialless','popover':'popover'
};

function styleToObj(str) {
  const o = {};
  for (const decl of str.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim(), v = decl.slice(i + 1).trim();
    if (!k || !v) continue;
    const ck = k.startsWith('--') ? `"${k}"` : camel(k);
    o[ck] = isNaN(v) || /[a-z%()]/i.test(v) ? `'${v.replace(/'/g, "\'")}'` : v;
  }
  return `{${Object.entries(o).map(([k, v]) => `${k}: ${v}`).join(', ')}}`;
}

function convertAttrs(attrStr) {
  const outAttrs = [];
  const re = /([\w:.-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|[^\s>]+))?/g;
  let mm;
  while ((mm = re.exec(attrStr))) {
    let name = mm[1];
    if (name === 'style' ) {}
    let val = mm[3] ?? mm[4] ?? mm[2] ?? '';
    if (name.startsWith('data-') || name.startsWith('aria-')) { outAttrs.push(`${name}="${val}"`); continue; }
    if (name === 'style') { outAttrs.push(`style={${styleToObj(val)}}`); continue; }
    const lname = name.toLowerCase();
    // boolean attribute: bare or ="" -> emit bare JSX prop (defaultChecked/defaultSelected for form state)
    if ((val === '' || val === '""' || val === "''") && BOOL_MAP[lname]) {
      name = ATTR_MAP[name] || BOOL_MAP[lname];
      outAttrs.push(name);
      continue;
    }
    name = ATTR_MAP[name] || camel(name);
    if (val === '' && mm[2] === undefined) { outAttrs.push(name); continue; } // boolean attr
    outAttrs.push(`${name}="${val}"`);
  }
  return outAttrs.join(' ');
}

// tokenize tags
let result = '';
let i = 0;
const tagRe = /<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>|[^<]+/g;
let tm;
while ((tm = tagRe.exec(inner))) {
  const tok = tm[0];
  if (tok.startsWith('<!--')) continue;
  if (tok.startsWith('</')) { result += tok.replace('</', '</'); continue; }
  if (tok.startsWith('<')) {
    const isClose = false;
    const m2 = tok.match(/^<([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)?(\/?)>$/s);
    if (!m2) { result += tok; continue; }
    const [, tag, attrs, selfclose] = m2;
    const jsxTag = tag.includes('-') ? tag : tag; // custom elements keep dash
    const conv = convertAttrs(attrs || '');
    const voidSelf = VOID.has(tag.toLowerCase()) || selfclose === '/';
    if (voidSelf) result += `<${jsxTag}${conv ? ' ' + conv : ''} />`;
    else result += `<${jsxTag}${conv ? ' ' + conv : ''}>`;
    continue;
  }
  // text node: escape JSX-breaking chars; encode newlines as &#10; so <pre>
  // whitespace survives JSX collapsing and { } don't start expression containers
  result += tok
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/\r?\n/g, '&#10;');
}

// clean up: JSX needs expression containers only for {} in text — raw {} in text is rare; leave as-is
const jsx = result.trim();
const wrapped = `// AUTO-GENERATED JSX from live preview — review before use\nexport default function Demo() {\n  return (\n    <>\n      ${jsx}\n    </>\n  );\n}\n`;
if (out) { writeFileSync(out, wrapped); console.log('wrote', out, wrapped.length, 'chars'); }
else console.log(wrapped);
