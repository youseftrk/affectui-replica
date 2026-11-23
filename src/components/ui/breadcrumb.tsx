// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as c from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const l = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/HugeiconsIcon-C2cDExRS";
import{t as r}from"./_deps/ArrowRight01Icon-CpyfVR64";
import{t as i}from"./_deps/demo-BaG02df2";
import{t as a}from"./_deps/File02Icon-CsX8BzM8";
import{t as o}from"./_deps/Folder01Icon-CEhnVDRo";
import{t as s}from"./_deps/PlayCircleIcon-rlIzp4Ky";
function u({items:e,separator:t=`slash`,maxItems:n=4,className:r,"aria-label":i=`Breadcrumb`,ref:a,...o}){let s=(0,c.useRef)(null),u=e.length,f=u>Math.max(2,n)?u-Math.max(2,n):0,[m,g]=(0,c.useState)(0),[,_]=(0,c.useState)(0),v=e.map(e=>e.label).join(`\0`)+`|${n}`,[b,x]=(0,c.useState)(v);b!==v&&(x(v),g(0));let C=Math.min(Math.max(0,u-2),f+m),w=e.slice(1,1+C);if((0,c.useLayoutEffect)(()=>{let e=s.current;!e||C>=u-2||p(e)>e.clientWidth+1&&g(e=>e+1)}),(0,c.useEffect)(()=>{let e=s.current;if(!e||typeof ResizeObserver>`u`)return;let t=e.clientWidth,n=new ResizeObserver(()=>{Math.abs(e.clientWidth-t)<1||(t=e.clientWidth,g(0),_(t))});return n.observe(e),()=>n.disconnect()},[u===0]),u===0)return null;let T=e=>(0,l.jsx)(`li`,{className:`ui-bcrc__sep`,role:`presentation`,"aria-hidden":`true`,children:t===`slash`?`/`:t===`chevron`?(0,l.jsx)(y,{}):t},e),E=[];return e.forEach((e,t)=>{if(t>0&&t<=C){t===1&&(E.push(T(`s-more`)),E.push((0,l.jsx)(`li`,{className:`ui-bcrc__item`,children:(0,l.jsx)(h,{items:w})},`more`)));return}t>0&&E.push(T(`s-${t}`));let n=t===u-1;E.push((0,l.jsx)(`li`,{className:`ui-bcrc__item`,"data-current":n||void 0,children:(0,l.jsx)(d,{item:e,current:n})},`${t}-${e.label}`))}),(0,l.jsxs)(`nav`,{...o,ref:a,"aria-label":i,className:[`ui-bcrc`,r].filter(Boolean).join(` `),"data-tight":C>=u-2&&u>2?``:void 0,children:[(0,l.jsx)(`style`,{href:`ui-breadcrumb-clean`,precedence:`default`,children:S}),(0,l.jsx)(`ol`,{ref:s,className:`ui-bcrc__list`,children:E})]})}function d({item:e,current:t}){let n=(0,l.jsxs)(l.Fragment,{children:[e.icon!=null&&(0,l.jsx)(`span`,{className:`ui-bcrc__icon`,"aria-hidden":`true`,children:(0,l.jsx)(v,{icon:e.icon})}),(0,l.jsx)(`span`,{className:`ui-bcrc__label`,"data-label":``,dir:`auto`,children:e.label})]});return t?(0,l.jsx)(`span`,{className:`ui-bcrc__current`,"aria-current":`page`,onPointerEnter:f(e.label),children:n}):e.href?(0,l.jsx)(`a`,{className:`ui-bcrc__link`,href:e.href,onClick:e.onClick,onPointerEnter:f(e.label),children:n}):e.onClick?(0,l.jsx)(`button`,{type:`button`,className:`ui-bcrc__link`,onClick:e.onClick,onPointerEnter:f(e.label),children:n}):(0,l.jsx)(`span`,{className:`ui-bcrc__link`,"data-static":``,onPointerEnter:f(e.label),children:n})}var f=e=>t=>{let n=t.currentTarget.querySelector(`[data-label]`);n&&(n.scrollWidth>n.clientWidth+1?t.currentTarget.title=e:t.currentTarget.removeAttribute(`title`))};function p(e){let t=0;for(let n of Array.from(e.children)){let e=n.querySelector(`[data-label]`),r=n.getBoundingClientRect().width;t+=e?r-e.getBoundingClientRect().width+Math.min(e.scrollWidth,m):r}return t}var m=200;function h({items:e}){let t=(0,c.useId)(),[n,r]=(0,c.useState)(!1),i=(0,c.useRef)(null),a=(0,c.useRef)(null),o=()=>Array.from(a.current?.querySelectorAll(`[role='menuitem']`)??[]),s=e=>{r(!1),e&&i.current?.focus({preventScroll:!0})};(0,c.useLayoutEffect)(()=>{let e=a.current,t=i.current;if(!n||!e||!t)return;`showPopover`in e&&!e.matches(`:popover-open`)&&e.showPopover();let r=()=>g(e,t.getBoundingClientRect());return r(),o()[0]?.focus({preventScroll:!0}),window.addEventListener(`resize`,r),window.addEventListener(`scroll`,r,!0),()=>{window.removeEventListener(`resize`,r),window.removeEventListener(`scroll`,r,!0),`hidePopover`in e&&e.isConnected&&e.matches(`:popover-open`)&&e.hidePopover()}},[n]),(0,c.useEffect)(()=>{if(!n)return;let e=e=>{let t=e.target;!a.current?.contains(t)&&!i.current?.contains(t)&&r(!1)};return document.addEventListener(`pointerdown`,e,!0),()=>document.removeEventListener(`pointerdown`,e,!0)},[n]);let u=e=>{let t=o(),n=t.indexOf(document.activeElement),i=e=>t[(e+t.length)%t.length]?.focus();if(e.key===`ArrowDown`)i(n+1);else if(e.key===`ArrowUp`)i(n-1);else if(e.key===`Home`)i(0);else if(e.key===`End`)i(t.length-1);else if(e.key===`Escape`)s(!0);else if(e.key===`Tab`)return r(!1);else return;e.preventDefault(),e.stopPropagation()},d=e=>t=>{e.onClick?.(t),s(!e.href)};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`button`,{ref:i,type:`button`,className:`ui-bcrc__more`,"aria-label":e.length===1?`Show 1 more crumb`:`Show ${e.length} more crumbs`,"aria-haspopup":`menu`,"aria-expanded":n,"aria-controls":n?`${t}-menu`:void 0,title:e.map(e=>e.label).join(` / `),onClick:()=>r(e=>!e),onKeyDown:e=>{e.key===`ArrowDown`&&!n&&(e.preventDefault(),r(!0))},children:(0,l.jsx)(b,{})}),n&&(0,l.jsx)(`div`,{ref:a,id:`${t}-menu`,className:`ui-bcrc__menu`,role:`menu`,"aria-label":`More crumbs`,popover:`manual`,onKeyDown:u,children:e.map((e,t)=>{let n=(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`span`,{className:`ui-bcrc__menu-icon`,"aria-hidden":`true`,children:e.icon==null?(0,l.jsx)(x,{}):(0,l.jsx)(v,{icon:e.icon})}),(0,l.jsx)(`span`,{className:`ui-bcrc__menu-label`,dir:`auto`,children:e.label})]}),r={"--depth":Math.min(t,3)};return e.href?(0,l.jsx)(`a`,{role:`menuitem`,tabIndex:-1,className:`ui-bcrc__menu-item`,style:r,href:e.href,title:e.label,onClick:d(e),children:n},t):(0,l.jsx)(`button`,{type:`button`,role:`menuitem`,tabIndex:-1,className:`ui-bcrc__menu-item`,style:r,title:e.label,"aria-disabled":!e.onClick||void 0,onClick:e.onClick?d(e):void 0,children:n},t)})})]})}function g(e,t){let n=document.documentElement.clientWidth||window.innerWidth,r=window.innerHeight;e.style.maxHeight=``;let i=e.offsetWidth,a=e.offsetHeight,o=r-t.bottom-6-8,s=t.top-6-8,c=o>=a||o>=s,l=Math.max(120,Math.min(a,c?o:s)),u=getComputedStyle(e).direction===`rtl`?t.right-i:t.left-4;u=Math.min(Math.max(8,u),n-8-i),e.style.top=`${Math.round(c?t.bottom+6:t.top-6-l)}px`,e.style.left=`${Math.round(u)}px`,a>l&&(e.style.maxHeight=`${l}px`),e.dataset.side=c?`bottom`:`top`}var _=e=>Array.isArray(e)&&e.length>0&&e.every(e=>Array.isArray(e)&&typeof e[0]==`string`);function v({icon:e}){return _(e)?(0,l.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,focusable:`false`,children:e.map(([e,{key:t,...n}],r)=>(0,c.createElement)(e,{...n,key:String(t??r)}))}):(0,l.jsx)(l.Fragment,{children:e})}function y(){return(0,l.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,focusable:`false`,children:(0,l.jsx)(`path`,{d:`M9 6s6 4.42 6 6-6 6-6 6`})})}function b(){return(0,l.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,focusable:`false`,"aria-hidden":`true`,children:(0,l.jsx)(`path`,{d:`M6 12.5V12m12 .5V12m-6 .5V12m-5 .5a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm12 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z`})})}function x(){return(0,l.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,focusable:`false`,children:[(0,l.jsx)(`path`,{d:`M19 15h-7c-3.77 0-5.66 0-6.83-1.17C4 12.66 4 10.77 4 7V4`}),(0,l.jsx)(`path`,{d:`M15 20s5-3.68 5-5-5-5-5-5`})]})}var S=`
/* Colors as variables – override them on .ui-bcrc (see Theming in the docs) */
.ui-bcrc {
  --ui-bcrc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-bcrc-muted: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-bcrc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.27));
  --ui-bcrc-wash: rgba(0, 0, 0, 0.04);
  --ui-bcrc-surface: var(--aui-overlay, var(--aui-surface, #ffffff));
  --ui-bcrc-text: rgba(0, 0, 0, 0.61);
  --ui-bcrc-glow: rgba(0, 0, 0, 0.035);
  --ui-bcrc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.1)), 0 12px 32px -8px rgba(0, 0, 0, 0.16));
  --ui-bcrc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-bcrc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));
  --ui-bcrc-radius: calc(var(--aui-radius-sm, 5px) - 1px);

  display: block;
  min-width: 0;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-bcrc-muted);
  -webkit-font-smoothing: antialiased;
}
.ui-bcrc *, .ui-bcrc *::before, .ui-bcrc *::after { box-sizing: border-box; }

/* One line; the crumbs shorten before anything wraps */
.ui-bcrc__list {
  display: flex;
  align-items: center;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  white-space: nowrap;
}
/* The other crumbs keep their names (each capped at 200px, and folded into … when the row is short); only the
   current page shortens to fit */
.ui-bcrc__item { display: flex; flex: none; align-items: center; min-width: 0; }
.ui-bcrc__item[data-current] { flex: 0 1 auto; }

.ui-bcrc__sep {
  display: grid;
  flex: none;
  place-items: center;
  min-width: 20px;
  padding: 0 2px;
  color: var(--ui-bcrc-faint);
  user-select: none;
}
.ui-bcrc__sep > svg { display: block; width: 12px; height: 12px; }
.ui-bcrc__sep > svg:dir(rtl) { transform: scaleX(-1); }

/* The links: quiet text that turns to ink on hover */
.ui-bcrc__link,
.ui-bcrc__current {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: var(--ui-bcrc-radius);
  background: none;
  font: inherit;
  color: inherit;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
.ui-bcrc__link { cursor: pointer; transition: color 120ms ease; }
.ui-bcrc__link[data-static] { cursor: default; }
.ui-bcrc__link:not([data-static]):hover { color: var(--ui-bcrc-ink); }
.ui-bcrc__link:focus-visible,
.ui-bcrc__more:focus-visible { outline: 2px solid var(--ui-bcrc-focus); outline-offset: 2px; }
.ui-bcrc__current { font-weight: 500; color: var(--ui-bcrc-ink); cursor: default; animation: ui-bcrc-in 260ms var(--ui-bcrc-ease) both; }

/* Long names shorten with … – the full one on hover */
.ui-bcrc__label { min-width: 0; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ui-bcrc__current .ui-bcrc__label { max-width: none; }
.ui-bcrc__icon { display: grid; flex: none; place-items: center; width: 14px; height: 14px; }
.ui-bcrc__icon > svg, .ui-bcrc__icon > img { display: block; width: 14px; height: 14px; }

/* The … for the folded crumbs */
.ui-bcrc__more {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 24px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: var(--ui-bcrc-radius);
  background: none;
  color: var(--ui-bcrc-muted);
  font: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 120ms ease, color 120ms ease;
}
.ui-bcrc__more:hover, .ui-bcrc__more[aria-expanded="true"] { background: var(--ui-bcrc-wash); color: var(--ui-bcrc-ink); }
.ui-bcrc__more > svg { display: block; width: 16px; height: 16px; }

/* The menu with the folded crumbs: the Dropdown Menu's card in the top layer */
.ui-bcrc__menu {
  position: fixed;
  inset: auto;
  z-index: 1000;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: 1px;
  box-sizing: border-box;
  min-width: 168px;
  max-width: min(320px, calc(100vw - 16px));
  max-height: calc(100vh - 16px);
  margin: 0;
  padding: 4px;
  border: 0;
  border-radius: calc(var(--aui-radius-lg, 10px) + 2px);
  background: var(--ui-bcrc-surface);
  box-shadow: var(--ui-bcrc-shadow);
  color: var(--ui-bcrc-text);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-font-smoothing: antialiased;
  transform-origin: top left;
  animation: ui-bcrc-menu 220ms var(--ui-bcrc-ease) both;
}
.ui-bcrc__menu::backdrop { display: none; }
.ui-bcrc__menu[data-side="top"] { transform-origin: bottom left; animation-name: ui-bcrc-menu-up; }
.ui-bcrc__menu-item {
  display: flex;
  align-items: center;
  gap: 9px;
  box-sizing: border-box;
  min-width: 0;
  min-height: 32px;
  margin: 0;
  padding: 0 10px 0 calc(10px + var(--depth, 0) * 12px);
  border: 0;
  border-radius: calc(var(--aui-radius-sm, 5px) + 3px);
  background: none;
  font: inherit;
  color: inherit;
  text-align: start;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 120ms ease, color 120ms ease;
}
.ui-bcrc__menu-item:hover:not([aria-disabled]), .ui-bcrc__menu-item:focus { background: var(--ui-bcrc-glow); color: var(--ui-bcrc-ink); outline: none; }
.ui-bcrc__menu-item:focus-visible { outline: 2px solid var(--ui-bcrc-focus); outline-offset: -2px; }
.ui-bcrc__menu-item[aria-disabled] { cursor: default; }
.ui-bcrc__menu-icon { display: grid; flex: none; place-items: center; width: 16px; height: 16px; color: var(--ui-bcrc-muted); }
.ui-bcrc__menu-icon > svg, .ui-bcrc__menu-icon > img { display: block; width: 15px; height: 15px; }
.ui-bcrc__menu-icon > svg:dir(rtl) { transform: scaleX(-1); }
.ui-bcrc__menu-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; }

@keyframes ui-bcrc-in { from { opacity: 0; transform: translateX(-4px); } }
@keyframes ui-bcrc-menu { from { opacity: 0; transform: scale(0.96) translateY(-4px); } }
@keyframes ui-bcrc-menu-up { from { opacity: 0; transform: scale(0.96) translateY(4px); } }

/* Touch screens: crumbs and rows a finger can hit, without moving the text */
@media (pointer: coarse) {
  .ui-bcrc__link:not([data-static]) { position: relative; }
  .ui-bcrc__link:not([data-static])::after { content: ""; position: absolute; inset: -10px -4px; }
  .ui-bcrc__more::after { content: ""; position: absolute; inset: -8px -6px; }
  .ui-bcrc__menu-item { min-height: 40px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-bcrc__current, .ui-bcrc__menu { animation: none; }
  .ui-bcrc__link, .ui-bcrc__more, .ui-bcrc__menu-item { transition-duration: 1ms; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-bcrc {
  --ui-bcrc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-bcrc-muted: var(--aui-muted, rgba(255, 255, 255, 0.45));
  --ui-bcrc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.28));
  --ui-bcrc-wash: rgba(255, 255, 255, 0.06);
  --ui-bcrc-surface: var(--aui-overlay, var(--aui-surface, #1b1b1e));
  --ui-bcrc-text: rgba(255, 255, 255, 0.62);
  --ui-bcrc-glow: rgba(255, 255, 255, 0.06);
  --ui-bcrc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.14)), 0 12px 32px -8px rgba(0, 0, 0, 0.6));
  --ui-bcrc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
}
`,C={acme:{label:`Acme`,kind:`space`,meta:`Workspace`,children:[`agents`,`knowledge`]},agents:{label:`Agents`,kind:`folder`,meta:`3 agents`,children:[`research`,`triage`,`notes`]},knowledge:{label:`Knowledge base`,kind:`folder`,meta:`2 files`,children:[`handbook`,`pricing`]},research:{label:`Research bot`,kind:`agent`,meta:`Weekdays at 9:00`,children:[`runs`,`sources`]},triage:{label:`Support triage`,kind:`agent`,meta:`On new tickets`,children:[`runs-t`]},notes:{label:`Release notes writer`,kind:`agent`,meta:`On every merge`,children:[`runs-n`]},runs:{label:`Runs`,kind:`folder`,meta:`3 runs`,children:[`r4821`,`r4820`,`r4819`]},sources:{label:`Sources`,kind:`folder`,meta:`1 file`,children:[`handbook`]},"runs-t":{label:`Runs`,kind:`folder`,meta:`1 run`,children:[`t912`]},"runs-n":{label:`Runs`,kind:`folder`,meta:`1 run`,children:[`n77`]},r4821:{label:`Run #4821 · Summarise Q3 support tickets and draft a fix plan for the export timeout`,kind:`run`,meta:`Finished 4 min ago · 23 tool calls`},r4820:{label:`Run #4820 · Weekly competitor digest`,kind:`run`,meta:`Finished yesterday · 41 tool calls`},r4819:{label:`Run #4819 · Pricing page review`,kind:`run`,meta:`Failed on Monday · 7 tool calls`},t912:{label:`Run #912 · Tag 48 new tickets`,kind:`run`,meta:`Finished 1 h ago · 48 tool calls`},n77:{label:`Run #77 · Notes for v2.14`,kind:`run`,meta:`Finished on Friday · 12 tool calls`},handbook:{label:`support-handbook.md`,kind:`file`,meta:`Edited 2 days ago`},pricing:{label:`pricing-2026.pdf`,kind:`file`,meta:`Added last week`}};function w(){let[e,t]=(0,c.useState)([`acme`,`agents`,`research`,`runs`,`r4821`]),a=C[e[e.length-1]],o=e.map((n,r)=>({label:C[n].label,icon:r===0?i:void 0,onClick:r<e.length-1?()=>t(e.slice(0,r+1)):void 0}));return(0,l.jsx)(`div`,{className:`bcr-demo`,children:(0,l.jsxs)(`section`,{className:`bcr-democ`,"aria-label":`Workspace`,children:[(0,l.jsx)(`header`,{className:`bcr-democ__bar`,children:(0,l.jsx)(u,{items:o})}),(0,l.jsx)(`div`,{className:`bcr-democ__body`,children:a.children?(0,l.jsx)(`ul`,{className:`bcr-democ__rows`,children:a.children.map(i=>(0,l.jsx)(`li`,{children:(0,l.jsxs)(`button`,{type:`button`,className:`bcr-democ__row`,onClick:()=>t([...e,i]),children:[(0,l.jsx)(T,{kind:C[i].kind,id:i}),(0,l.jsx)(`span`,{className:`bcr-democ__name`,dir:`auto`,children:C[i].label}),(0,l.jsx)(`span`,{className:`bcr-democ__meta`,children:C[i].meta}),(0,l.jsx)(n,{icon:r,size:14,strokeWidth:1.5,className:`bcr-democ__go`})]})},i))}):(0,l.jsxs)(`div`,{className:`bcr-democ__leaf`,children:[(0,l.jsx)(T,{kind:a.kind,id:e[e.length-1]}),(0,l.jsxs)(`span`,{className:`bcr-democ__leaf-text`,children:[(0,l.jsx)(`span`,{className:`bcr-democ__name`,dir:`auto`,children:a.label}),(0,l.jsx)(`span`,{className:`bcr-democ__meta`,children:a.meta})]})]})},e.join(`/`))]})})}function T({kind:e,id:t}){return e===`agent`?(0,l.jsx)(O,{id:t}):(0,l.jsx)(n,{icon:e===`run`?s:e===`file`?a:e===`space`?i:o,size:16,strokeWidth:1.5,className:`bcr-democ__icon`})}var E=e=>{let t=0;for(let n of e)t=t*31+n.charCodeAt(0)>>>0;for(let e=0;e<64;e++){let n=t>>e%26&63,r=[0,1,2].flatMap(e=>{let t=n>>e*2&1;return[t,n>>e*2+1&1,t]});if(r.filter(Boolean).length>=5)return r;t=t*1103515245+12345>>>0}return[1,0,1,0,1,0,1,0,1]},D={research:`#0190FE`,triage:`#A651F0`,notes:`#13B3A0`};function O({id:e}){return(0,l.jsx)(`span`,{className:`bcr-democ__mark`,style:{"--bcr-mark":D[e]},"aria-hidden":`true`,children:E(e).map((e,t)=>(0,l.jsx)(`i`,{"data-on":e?``:void 0},t))})}export{w as default};