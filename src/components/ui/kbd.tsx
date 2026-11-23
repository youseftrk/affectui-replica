// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function i({keys:e,size:t=`sm`,platform:n,className:i,children:a,...o}){let s=d(),l=n===`mac`||n===`other`?n:s,u=(e==null?[]:(typeof e==`string`?[e]:[...e]).filter(e=>typeof e==`string`&&e.trim()!==``)).map(e=>c(e,l));return!u.length&&(a==null||a===!1||a===``)?null:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{href:`ui-kbd-clean`,precedence:`default`,children:f}),(0,r.jsx)(`kbd`,{className:[`ui-kbdc`,i].filter(Boolean).join(` `),"data-size":t===`md`?`md`:`sm`,"data-os":l,...o,children:u.length?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`span`,{className:`ui-kbdc__keys`,"aria-hidden":`true`,children:u.map((e,t)=>(0,r.jsx)(`span`,{className:`ui-kbdc__key`,"data-glyph":e.glyph?``:void 0,children:e.label},t))}),(0,r.jsx)(`span`,{className:`ui-kbdc__sr`,children:u.map(e=>e.spoken).join(` `)})]}):a})]})}var a={mod:{mac:`⌘`,other:`Ctrl`,spoken:[`Command`,`Control`],glyph:!0},cmd:{mac:`⌘`,other:`⌘`,spoken:[`Command`,`Command`],glyph:!0},ctrl:{mac:`⌃`,other:`Ctrl`,spoken:[`Control`,`Control`],glyph:!0},alt:{mac:`⌥`,other:`Alt`,spoken:[`Option`,`Alt`],glyph:!0},shift:{mac:`⇧`,other:`Shift`,spoken:[`Shift`,`Shift`],glyph:!0},enter:{mac:`↵`,other:`Enter`,spoken:[`Return`,`Enter`],glyph:!0},esc:{mac:`Esc`,other:`Esc`,spoken:[`Escape`,`Escape`]},tab:{mac:`Tab`,other:`Tab`,spoken:[`Tab`,`Tab`]},space:{mac:`Space`,other:`Space`,spoken:[`Space`,`Space`]},backspace:{mac:`⌫`,other:`Backspace`,spoken:[`Delete`,`Backspace`],glyph:!0},delete:{mac:`⌦`,other:`Del`,spoken:[`Forward delete`,`Delete`],glyph:!0},up:{mac:`↑`,other:`↑`,spoken:[`Up arrow`,`Up arrow`],glyph:!0},down:{mac:`↓`,other:`↓`,spoken:[`Down arrow`,`Down arrow`],glyph:!0},left:{mac:`←`,other:`←`,spoken:[`Left arrow`,`Left arrow`],glyph:!0},right:{mac:`→`,other:`→`,spoken:[`Right arrow`,`Right arrow`],glyph:!0},pageup:{mac:`PgUp`,other:`PgUp`,spoken:[`Page up`,`Page up`]},pagedown:{mac:`PgDn`,other:`PgDn`,spoken:[`Page down`,`Page down`]},home:{mac:`Home`,other:`Home`,spoken:[`Home`,`Home`]},end:{mac:`End`,other:`End`,spoken:[`End`,`End`]}},o={command:`cmd`,meta:`cmd`,"⌘":`cmd`,control:`ctrl`,option:`alt`,opt:`alt`,return:`enter`,escape:`esc`,del:`delete`,arrowup:`up`,arrowdown:`down`,arrowleft:`left`,arrowright:`right`,pgup:`pageup`,pgdn:`pagedown`},s={".":`Period`,",":`Comma`,"/":`Slash`,"\\":`Backslash`,"?":`Question mark`,"[":`Left bracket`,"]":`Right bracket`,"-":`Minus`,"+":`Plus`,"=":`Equals`,";":`Semicolon`,"'":`Quote`,"`":`Backtick`},c=(e,t)=>{let n=e.trim(),r=a[o[n.toLowerCase()]??n.toLowerCase()];if(r){let e=t===`mac`,n=e?r.mac:r.other;return{label:n,spoken:r.spoken[+!e],glyph:!!r.glyph&&n.length===1}}let i=n.length===1?n.toUpperCase():n;return{label:i,spoken:s[n]??i,glyph:!1}},l=()=>()=>{},u=()=>{if(typeof navigator>`u`)return!1;let e=navigator;return/mac|iphone|ipad|ipod/i.test(e.userAgentData?.platform||e.platform||e.userAgent||``)},d=()=>(0,n.useSyncExternalStore)(l,u,()=>!1)?`mac`:`other`,f=`
/* Colors as variables – override them on .ui-kbdc (see Theming in the docs). The chip takes its tint from the text
   around it, so it reads on white, in dark mode and on a dark button alike */
.ui-kbdc {
  --ui-kbdc-bg: color-mix(in srgb, currentColor 7%, transparent);
  --ui-kbdc-edge: color-mix(in srgb, currentColor 6%, transparent);
  --h: 16px;
  --pad: 4px;

  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: var(--h);
  height: var(--h);
  margin: 0;
  padding: 0 var(--pad);
  border-radius: calc(var(--aui-radius-sm, 5px) - 1px);
  background: var(--ui-kbdc-bg);
  box-shadow: inset 0 0 0 0.5px var(--ui-kbdc-edge);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 10.5px;
  font-weight: 500;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.02em;
  white-space: nowrap;
  vertical-align: middle;
  font-variant-numeric: tabular-nums;
  -webkit-font-smoothing: antialiased;
  user-select: none;
}
.ui-kbdc[data-size="md"] {
  --h: 20px;
  --pad: 5px;
  border-radius: var(--aui-radius-sm, 5px);
  font-size: 12px;
}

/* A combo sits in one chip: ⌘K close together, "Ctrl K" with a small space – left to right even in RTL text, like
   the keys are pressed */
.ui-kbdc__keys {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  direction: ltr;
  unicode-bidi: isolate;
}
.ui-kbdc[data-os="other"] .ui-kbdc__keys { gap: 3px; }
/* ⌘ ⇧ ⌥ and arrows look small next to letters in most fonts – a touch larger */
.ui-kbdc__key[data-glyph] { font-size: 1.1em; }

/* Read by screen readers, not drawn */
.ui-kbdc__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
.ui-kbdc:has(.ui-kbdc__sr) { position: relative; }

/* Windows high contrast: the tint is dropped, an edge keeps the chip visible */
@media (forced-colors: active) {
  .ui-kbdc { border: 1px solid CanvasText; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> – the tint follows the light text */
:where(.dark, [data-theme="dark"]) .ui-kbdc {
  --ui-kbdc-bg: color-mix(in srgb, currentColor 10%, transparent);
  --ui-kbdc-edge: color-mix(in srgb, currentColor 8%, transparent);
}
`,p=[{action:`Search runs and files`,keys:[`mod`,`K`]},{action:`New task`,keys:[`C`]},{action:`Run the agent`,keys:[`mod`,`enter`]},{action:`Stop the run`,keys:[`mod`,`.`]},{action:`Approve and continue`,keys:[`mod`,`shift`,`A`]},{action:`Close the panel`,keys:[`esc`]}];function m({value:e,onChange:t}){return(0,r.jsx)(`div`,{className:`kbd-demo__os`,role:`group`,"aria-label":`Keyboard`,children:[`mac`,`other`].map(n=>(0,r.jsx)(`button`,{type:`button`,"aria-pressed":e===n,onClick:()=>t(n),children:n===`mac`?`macOS`:`Windows`},n))})}var h=()=>typeof navigator<`u`&&/mac|iphone|ipad/i.test(navigator.platform||navigator.userAgent)?`mac`:`other`;function g(){let[e,t]=(0,n.useState)(h);return(0,r.jsx)(`div`,{className:`kbd-demo`,children:(0,r.jsxs)(`div`,{className:`kbd-demo__card`,children:[(0,r.jsxs)(`div`,{className:`kbd-demo__head`,children:[(0,r.jsx)(`span`,{className:`kbd-demo__title`,children:`Keyboard shortcuts`}),(0,r.jsx)(m,{value:e,onChange:t})]}),(0,r.jsx)(`ul`,{className:`kbd-demo__list`,children:p.map(t=>(0,r.jsxs)(`li`,{className:`kbd-demo__row`,children:[(0,r.jsx)(`span`,{className:`kbd-demo__action`,children:t.action}),(0,r.jsx)(i,{keys:t.keys,size:`md`,platform:e})]},t.action))}),(0,r.jsxs)(`p`,{className:`kbd-demo__foot`,children:[`Press `,(0,r.jsx)(i,{keys:`?`,platform:e}),` anytime to open this list`]})]})})}export{g as default};