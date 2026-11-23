// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as s from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const c = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/HugeiconsIcon-C2cDExRS";
import{t as r}from"./_deps/CodeIcon-D_1ATyfx";
import{n as i,r as a,t as o}from"./_deps/TextItalicIcon-Bf8QbmXo";
function l(e){let{items:t,size:n=`md`,variant:r=`buttons`,disabled:i=!1,"aria-label":a,"aria-labelledby":o,className:l}=e,f=e.type===`single`,p=(0,s.useMemo)(()=>{let e=new Set;return(Array.isArray(t)?t:[]).filter(t=>!t||t.value==null||e.has(String(t.value))?!1:(e.add(String(t.value)),!0))},[t]),m=n===`sm`||n===`lg`?n:`md`,h=r===`tray`?`tray`:`buttons`,[g,_]=(0,s.useState)(()=>u(e.defaultValue)),v=e.value!==void 0,y=v?u(e.value):g,b=(0,s.useRef)(null),[x,S]=(0,s.useState)(null),C=t=>{let n=p.find(e=>e.value===t);if(!n||n.disabled||i)return;let r=y.includes(t),a=f?r?[]:[t]:p.map(e=>e.value).filter(e=>e===t?!r:y.includes(e));v||_(a),e.type===`single`?e.onChange?.(a[0]??null):e.onChange?.(a)},w=p.filter(e=>!e.disabled&&!i),T=w.find(e=>e.value===x)?.value??w.find(e=>y.includes(e.value))?.value??w[0]?.value;return(0,c.jsxs)(`div`,{ref:b,role:`group`,"aria-label":a,"aria-labelledby":o,"aria-disabled":i||void 0,className:[`ui-tglc`,l].filter(Boolean).join(` `),"data-size":m,"data-variant":h,"data-disabled":i||void 0,onKeyDown:e=>{if(!w.length||e.altKey||e.ctrlKey||e.metaKey)return;let t=Array.from(b.current?.querySelectorAll(`:scope > .ui-tglc__item:not(:disabled)`)??[]),n=t.indexOf(document.activeElement);if(n<0)return;let r=b.current?getComputedStyle(b.current).direction===`rtl`:!1,i=r?`ArrowLeft`:`ArrowRight`,a=r?`ArrowRight`:`ArrowLeft`,o=-1;e.key===i||e.key===`ArrowDown`?o=(n+1)%t.length:e.key===a||e.key===`ArrowUp`?o=(n-1+t.length)%t.length:e.key===`Home`?o=0:e.key===`End`&&(o=t.length-1),!(o<0)&&(e.preventDefault(),t[o].focus())},children:[(0,c.jsx)(`style`,{href:`ui-toggle-group-clean`,precedence:`default`,children:d}),p.map(e=>{let t=y.includes(e.value),n=e.label??(e.icon?null:String(e.value)),r=n==null;return(0,c.jsxs)(`button`,{type:`button`,className:`ui-tglc__item`,"aria-pressed":t,"aria-label":e.ariaLabel,title:r?e.ariaLabel:void 0,"data-icon-only":r||void 0,disabled:e.disabled||i,tabIndex:e.value===T?0:-1,onFocus:()=>S(e.value),onClick:()=>C(e.value),children:[e.icon!=null&&(0,c.jsx)(`span`,{className:`ui-tglc__icon`,"aria-hidden":`true`,children:e.icon}),n!=null&&(0,c.jsx)(`span`,{className:`ui-tglc__label`,dir:`auto`,children:n})]},String(e.value))})]})}function u(e){return Array.isArray(e)?e.filter(e=>e!=null):e==null?[]:[e]}var d=`
/* Colors as variables – override them on .ui-tglc (see Theming in the docs) */
.ui-tglc {
  --ui-tglc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-tglc-text: var(--aui-muted, rgba(0, 0, 0, 0.61));
  --ui-tglc-icon: var(--aui-muted, rgba(0, 0, 0, 0.447));
  --ui-tglc-line: var(--aui-border, rgba(0, 0, 0, 0.06));
  --ui-tglc-wash: var(--aui-subtle, rgba(0, 0, 0, 0.03));
  --ui-tglc-fill: rgba(0, 0, 0, 0.06);
  --ui-tglc-track: var(--aui-subtle, rgba(0, 0, 0, 0.04));
  --ui-tglc-card: var(--aui-surface, #ffffff);
  --ui-tglc-card-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-tglc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-tglc-ease: cubic-bezier(0.25, 0.9, 0.3, 1);
  /* Size: md – 28px chips, 4px 10px */
  --ui-tglc-h: 28px;
  --ui-tglc-px: 10px;
  --ui-tglc-fs: 13px;
  --ui-tglc-lh: 20px;
  --ui-tglc-icon-size: 16px;
  --ui-tglc-gap: 8px;
  --ui-tglc-pad: 2px;
  --ui-tglc-r: var(--aui-radius, 6px);

  box-sizing: border-box;
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ui-tglc-gap);
  max-width: 100%;
  min-width: 0;
  vertical-align: middle;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: var(--ui-tglc-fs);
  font-weight: 500;
  line-height: var(--ui-tglc-lh);
  color: var(--ui-tglc-text);
  -webkit-font-smoothing: antialiased;
}
.ui-tglc[data-size="sm"] { --ui-tglc-h: 24px; --ui-tglc-px: 8px; --ui-tglc-fs: 12px; --ui-tglc-lh: 16px; --ui-tglc-icon-size: 14px; --ui-tglc-gap: 6px; }
.ui-tglc[data-size="lg"] { --ui-tglc-h: 32px; --ui-tglc-px: 12px; }
.ui-tglc[data-disabled] { opacity: 0.5; }
.ui-tglc *, .ui-tglc *::before, .ui-tglc *::after { box-sizing: border-box; }
/* Nothing to show – no empty track */
.ui-tglc:not(:has(> .ui-tglc__item)) { display: none; }

/* An item: the fill is its own layer, so it can grow in from the middle */
.ui-tglc__item {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  max-width: 100%;
  min-width: var(--ui-tglc-h);
  height: var(--ui-tglc-h);
  margin: 0;
  padding: 0 var(--ui-tglc-px);
  border: 0;
  border-radius: var(--ui-tglc-r);
  background: transparent;
  color: inherit;
  font: inherit;
  white-space: nowrap;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 90ms ease, background-color 90ms ease, transform 160ms var(--ui-tglc-ease);
}
.ui-tglc__item::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--ui-tglc-fill);
  opacity: 0;
  transform: scale(0.88);
  pointer-events: none;
  transition: opacity 120ms ease, transform 200ms var(--ui-tglc-ease);
}
.ui-tglc__item[aria-pressed="true"] { color: var(--ui-tglc-ink); }
.ui-tglc__item[aria-pressed="true"]::before { opacity: 1; transform: none; }
.ui-tglc__item[data-icon-only] { padding: 0; width: var(--ui-tglc-h); }
.ui-tglc__item:active:not(:disabled) { transform: scale(0.96); }
.ui-tglc__item:disabled { opacity: 0.4; cursor: not-allowed; }
.ui-tglc[data-disabled] .ui-tglc__item:disabled { opacity: 1; }
.ui-tglc__item:focus-visible { outline: 2px solid var(--ui-tglc-focus); outline-offset: 2px; }
@media (hover: hover) {
  .ui-tglc__item:not([aria-pressed="true"]):not(:disabled):hover { background-color: var(--ui-tglc-wash); color: var(--ui-tglc-ink); }
}

.ui-tglc__icon, .ui-tglc__label { position: relative; z-index: 1; }
.ui-tglc__icon { display: grid; flex: none; place-items: center; width: var(--ui-tglc-icon-size); height: var(--ui-tglc-icon-size); overflow: hidden; color: var(--ui-tglc-icon); transition: color 90ms ease; }
.ui-tglc__icon svg, .ui-tglc__icon img { display: block; width: 100%; height: 100%; object-fit: contain; }
.ui-tglc__item[aria-pressed="true"] .ui-tglc__icon { color: var(--ui-tglc-ink); }
@media (hover: hover) {
  .ui-tglc__item:not(:disabled):hover .ui-tglc__icon { color: var(--ui-tglc-ink); }
}
/* Long labels end in … instead of pushing the row wider than its container */
.ui-tglc__label { min-width: 0; overflow: hidden; text-overflow: ellipsis; }

/* Buttons (default): separate chips with a hairline; many of them wrap onto the next line */
.ui-tglc[data-variant="buttons"] .ui-tglc__item { box-shadow: inset 0 0 0 0.5px var(--ui-tglc-line); }

/* Tray: a compact light-gray track; pressed items are raised in white */
.ui-tglc[data-variant="tray"] {
  flex-wrap: nowrap;
  gap: 0;
  padding: var(--ui-tglc-pad);
  overflow-x: auto;
  border-radius: calc(var(--ui-tglc-r) + var(--ui-tglc-pad));
  background: var(--ui-tglc-track);
  scrollbar-width: none;
}
.ui-tglc[data-variant="tray"]::-webkit-scrollbar { display: none; }
.ui-tglc[data-variant="tray"] .ui-tglc__item { --ui-tglc-h-in: calc(var(--ui-tglc-h) - var(--ui-tglc-pad) * 2); height: var(--ui-tglc-h-in); min-width: var(--ui-tglc-h-in); }
.ui-tglc[data-variant="tray"] .ui-tglc__item[data-icon-only] { width: var(--ui-tglc-h-in); }
.ui-tglc[data-variant="tray"] .ui-tglc__item::before { background: var(--ui-tglc-card); box-shadow: var(--ui-tglc-card-shadow); }
.ui-tglc[data-variant="tray"] .ui-tglc__item:focus-visible { outline-offset: -2px; }
@media (hover: hover) {
  .ui-tglc[data-variant="tray"] .ui-tglc__item:not([aria-pressed="true"]):not(:disabled):hover { background-color: transparent; }
}

/* Touch screens: every item at least 36px tall */
@media (pointer: coarse) {
  .ui-tglc[data-size] { --ui-tglc-h: 36px; }
  .ui-tglc[data-size="lg"] { --ui-tglc-h: 40px; }
  .ui-tglc[data-variant="tray"][data-size] { --ui-tglc-h: 40px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-tglc__item, .ui-tglc__item::before, .ui-tglc__icon { transition: none; }
  .ui-tglc__item:active:not(:disabled) { transform: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tglc {
  --ui-tglc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-tglc-text: var(--aui-muted, rgba(255, 255, 255, 0.62));
  --ui-tglc-icon: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-tglc-line: var(--aui-border, rgba(255, 255, 255, 0.08));
  --ui-tglc-wash: var(--aui-subtle, rgba(255, 255, 255, 0.04));
  --ui-tglc-fill: rgba(255, 255, 255, 0.08);
  --ui-tglc-track: var(--aui-subtle, rgba(255, 255, 255, 0.05));
  --ui-tglc-card: var(--aui-surface, #2c2c2f);
  --ui-tglc-card-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-tglc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
}
`,f=e=>(0,c.jsx)(n,{icon:e,size:16,strokeWidth:1.8}),p=[{value:`running`,label:`Running`},{value:`needs-you`,label:`Needs you`},{value:`done`,label:`Done`},{value:`failed`,label:`Failed`}],m=[{value:`bold`,icon:f(i),ariaLabel:`Bold`},{value:`italic`,icon:f(o),ariaLabel:`Italic`},{value:`code`,icon:f(r),ariaLabel:`Code`},{value:`list`,icon:f(a),ariaLabel:`List`}],h=[{value:`agent`,label:`Agent`},{value:`model`,label:`Model`},{value:`day`,label:`Day`}],g=[[`running`,`needs-you`,`failed`],[`needs-you`,`failed`],[`needs-you`],[`running`,`needs-you`]];function _(){let[e,t]=(0,s.useState)([`running`,`needs-you`]),[n,r]=(0,s.useState)([`bold`]),[i,a]=(0,s.useState)(`agent`),o=(0,s.useRef)([]),u=(0,s.useId)(),d=()=>{o.current.forEach(clearTimeout),o.current=[]};return(0,s.useEffect)(()=>(o.current=g.map((e,n)=>window.setTimeout(()=>t(e),1e3+n*1300)),d),[]),(0,c.jsx)(`div`,{className:`tgl-demo tgl-demo--clean`,onPointerDownCapture:d,onKeyDownCapture:d,children:(0,c.jsxs)(`div`,{className:`tgl-demo__card`,children:[(0,c.jsxs)(`div`,{className:`tgl-demo__row`,children:[(0,c.jsx)(`span`,{className:`tgl-demo__label`,id:`${u}-status`,children:`Show runs`}),(0,c.jsx)(l,{items:p,value:e,onChange:t,"aria-labelledby":`${u}-status`})]}),(0,c.jsxs)(`div`,{className:`tgl-demo__row`,children:[(0,c.jsx)(`span`,{className:`tgl-demo__label`,id:`${u}-format`,children:`Prompt formatting`}),(0,c.jsx)(l,{items:m,value:n,onChange:r,variant:`tray`,size:`sm`,"aria-labelledby":`${u}-format`})]}),(0,c.jsxs)(`div`,{className:`tgl-demo__row`,children:[(0,c.jsx)(`span`,{className:`tgl-demo__label`,id:`${u}-group`,children:`Group by · press again for none`}),(0,c.jsx)(l,{type:`single`,items:h,value:i,onChange:a,size:`sm`,"aria-labelledby":`${u}-group`})]})]})})}export{_ as default};