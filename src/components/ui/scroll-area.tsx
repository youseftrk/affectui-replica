// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as l from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const u = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/HugeiconsIcon-C2cDExRS";
import{t as r}from"./_deps/CodeIcon-D_1ATyfx";
import{t as i}from"./_deps/Csv01Icon-Ds3OtOdC";
import{t as a}from"./_deps/Globe02Icon-jOAiZzRC";
import{t as o}from"./_deps/Image01Icon-f2njTfyB";
import{t as s}from"./_deps/Pdf01Icon-BQai0-Yi";
import{t as c}from"./_deps/demo-BL0rLgdd";
function d({orientation:e=`vertical`,type:t=`hover`,fade:n=!1,maxHeight:r,viewportRef:i,onScroll:a,className:o,style:s,children:c,"aria-label":d,"aria-labelledby":m,ref:h,...g}){let _=(0,l.useRef)(null),v=(0,l.useRef)(null),y=(0,l.useRef)(null),b=(0,l.useRef)({y:null,x:null}),x=(0,l.useRef)(0),S=(0,l.useRef)(null),[C,w]=(0,l.useState)(!1),T=e!==`horizontal`,E=e!==`vertical`,D=(0,l.useCallback)(()=>{let e=v.current,t=_.current;if(!e||!t)return;let n=getComputedStyle(t),r=n.direction===`rtl`,i=parseFloat(n.getPropertyValue(`--ui-sac-fade`))||24,a={y:T&&e.scrollHeight-e.clientHeight>1,x:E&&e.scrollWidth-e.clientWidth>1};for(let n of[`y`,`x`]){t.toggleAttribute(`data-scroll-${n}`,a[n]);let o=b.current[n],s=o?.parentElement;if(!a[n]||!o||!s)continue;let c=n===`y`?e.clientHeight:e.clientWidth,l=n===`y`?e.scrollHeight:e.scrollWidth,u=Math.abs(n===`y`?e.scrollTop:e.scrollLeft),d=n===`y`?s.clientHeight:s.clientWidth,f=Math.max(Math.min(24,d),Math.round(d*c/l)),p=l-c>0?(d-f)*Math.min(u,l-c)/(l-c):0;n===`y`?(o.style.height=`${f}px`,o.style.transform=`translate3d(0, ${p}px, 0)`):(o.style.width=`${f}px`,o.style.transform=`translate3d(${r?-p:p}px, 0, 0)`);let m=l-c-u;t.style.setProperty(`--ui-sac-${n}-start`,`${Math.min(u,i)}px`),t.style.setProperty(`--ui-sac-${n}-end`,`${Math.min(Math.max(m,0),i)}px`)}a.y||(t.style.setProperty(`--ui-sac-y-start`,`0px`),t.style.setProperty(`--ui-sac-y-end`,`0px`)),a.x||(t.style.setProperty(`--ui-sac-x-start`,`0px`),t.style.setProperty(`--ui-sac-x-end`,`0px`)),w(a.x||a.y)},[E,T]);(0,l.useLayoutEffect)(()=>{if(D(),typeof ResizeObserver>`u`)return;let e=new ResizeObserver(()=>D());return v.current&&e.observe(v.current),y.current&&e.observe(y.current),()=>e.disconnect()},[D]),(0,l.useEffect)(()=>()=>window.clearTimeout(x.current),[]);let O=e=>{D();let t=_.current;t&&(t.setAttribute(`data-scrolling`,``),window.clearTimeout(x.current),x.current=window.setTimeout(()=>t.removeAttribute(`data-scrolling`),800)),a?.(e)},k=e=>t=>{let n=v.current,r=b.current[e],i=r?.parentElement;if(t.button!==0||!n||!r||!i)return;t.preventDefault(),t.stopPropagation();let a=i.getBoundingClientRect(),o=e===`y`?a.height/(i.offsetHeight||1):a.width/(i.offsetWidth||1),s=e===`y`?i.clientHeight:i.clientWidth,c=e===`y`?r.offsetHeight:r.offsetWidth,l=e===`y`?n.scrollHeight-n.clientHeight:n.scrollWidth-n.clientWidth;S.current={axis:e,from:e===`y`?t.clientY:t.clientX,start:e===`y`?n.scrollTop:n.scrollLeft,per:l/Math.max(1,s-c)/(o||1)},r.setPointerCapture(t.pointerId),_.current?.setAttribute(`data-dragging`,``)},A=e=>{let t=S.current,n=v.current;if(!t||!n)return;let r=((t.axis===`y`?e.clientY:e.clientX)-t.from)*t.per;t.axis===`y`?n.scrollTop=t.start+r:n.scrollLeft=t.start+r},j=()=>{S.current=null,_.current?.removeAttribute(`data-dragging`)},M=e=>t=>{let n=v.current,r=b.current[e];if(t.button!==0||!n||!r||t.target===r)return;t.preventDefault();let i=r.getBoundingClientRect(),a=e===`y`?t.clientY<i.top:getComputedStyle(n).direction===`rtl`?t.clientX>i.right:t.clientX<i.left,o=(e===`y`?n.clientHeight:n.clientWidth)*.9*(a?-1:1),s=e===`x`&&getComputedStyle(n).direction===`rtl`?-1:1,c=!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;n.scrollBy({[e===`y`?`top`:`left`]:o*s,behavior:c?`smooth`:`auto`})},N=(0,l.useCallback)(e=>{v.current=e,f(i,e)},[i]),P=(0,l.useCallback)(e=>{_.current=e,f(h,e)},[h]),F=e=>(0,u.jsx)(`div`,{className:`ui-sac__bar`,"data-axis":e,"aria-hidden":`true`,onPointerDown:M(e),children:(0,u.jsx)(`div`,{className:`ui-sac__thumb`,ref:t=>{b.current[e]=t},onPointerDown:k(e),onPointerMove:A,onPointerUp:j,onPointerCancel:j,onLostPointerCapture:j})});return(0,u.jsxs)(`div`,{ref:P,className:[`ui-sac`,o].filter(Boolean).join(` `),"data-orientation":e,"data-type":t,"data-fade":n?``:void 0,style:r==null?s:{maxHeight:r,...s},...g,children:[(0,u.jsx)(`style`,{href:`ui-scroll-area-clean`,precedence:`default`,children:p}),(0,u.jsx)(`div`,{ref:N,className:`ui-sac__viewport`,tabIndex:C?0:void 0,role:d||m?`region`:void 0,"aria-label":d,"aria-labelledby":m,onScroll:O,children:(0,u.jsx)(`div`,{ref:y,className:`ui-sac__content`,children:c})}),T&&F(`y`),E&&F(`x`)]})}function f(e,t){typeof e==`function`?e(t):e&&(e.current=t)}var p=`
/* The fades' lengths animate as you near an end */
@property --ui-sac-y-start { syntax: "<length>"; inherits: true; initial-value: 0px; }
@property --ui-sac-y-end { syntax: "<length>"; inherits: true; initial-value: 0px; }
@property --ui-sac-x-start { syntax: "<length>"; inherits: true; initial-value: 0px; }
@property --ui-sac-x-end { syntax: "<length>"; inherits: true; initial-value: 0px; }

/* Colors and sizes as variables – override them on .ui-sac (see Theming in the docs) */
.ui-sac {
  --ui-sac-thumb: rgba(0, 0, 0, 0.2);
  --ui-sac-thumb-hover: rgba(0, 0, 0, 0.34);
  --ui-sac-thumb-active: rgba(0, 0, 0, 0.45);
  --ui-sac-size: 5px;
  --ui-sac-size-hover: 7px;
  --ui-sac-inset: 2px;
  --ui-sac-fade: 24px;
  --ui-sac-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-sac-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));

  /* A column, so a height or max-height on the box is what the viewport fills */
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.ui-sac *, .ui-sac *::before, .ui-sac *::after { box-sizing: border-box; }

/* The element that scrolls: the browser's own scrolling, its bar hidden – ours is drawn on top */
.ui-sac__viewport {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  border-radius: inherit;
  overflow: hidden;
  overscroll-behavior: contain;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.ui-sac__viewport::-webkit-scrollbar { display: none; }
.ui-sac[data-orientation="vertical"] > .ui-sac__viewport { overflow-y: auto; }
.ui-sac[data-orientation="horizontal"] > .ui-sac__viewport { overflow-x: auto; }
.ui-sac[data-orientation="both"] > .ui-sac__viewport { overflow: auto; }
.ui-sac__viewport:focus { outline: none; }
/* Inside the box, so no card edge or overflow cuts it */
.ui-sac__viewport:focus-visible { outline: 2px solid var(--ui-sac-focus); outline-offset: -2px; }

/* Sideways the content keeps its natural width, so a wide row really overflows; text still wraps at the box */
.ui-sac:not([data-orientation="vertical"]) .ui-sac__content { min-width: fit-content; }

/* Soft fades where there is more – a mask, so it works on any background */
.ui-sac[data-fade][data-scroll-y] > .ui-sac__viewport {
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 var(--ui-sac-y-start), #000 calc(100% - var(--ui-sac-y-end)), transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 var(--ui-sac-y-start), #000 calc(100% - var(--ui-sac-y-end)), transparent);
}
.ui-sac[data-fade][data-scroll-x]:not([data-scroll-y]) > .ui-sac__viewport {
  -webkit-mask-image: linear-gradient(to right, transparent, #000 var(--ui-sac-x-start), #000 calc(100% - var(--ui-sac-x-end)), transparent);
  mask-image: linear-gradient(to right, transparent, #000 var(--ui-sac-x-start), #000 calc(100% - var(--ui-sac-x-end)), transparent);
}
.ui-sac[data-fade][dir="rtl"][data-scroll-x]:not([data-scroll-y]) > .ui-sac__viewport,
[dir="rtl"] .ui-sac[data-fade][data-scroll-x]:not([data-scroll-y]) > .ui-sac__viewport {
  -webkit-mask-image: linear-gradient(to left, transparent, #000 var(--ui-sac-x-start), #000 calc(100% - var(--ui-sac-x-end)), transparent);
  mask-image: linear-gradient(to left, transparent, #000 var(--ui-sac-x-start), #000 calc(100% - var(--ui-sac-x-end)), transparent);
}
.ui-sac[data-fade] {
  transition: --ui-sac-y-start 160ms ease, --ui-sac-y-end 160ms ease, --ui-sac-x-start 160ms ease, --ui-sac-x-end 160ms ease;
}

/* The bar: a 10px strip over the content's edge, the thumb in it – hidden until there is something to scroll */
.ui-sac__bar {
  position: absolute;
  z-index: 1;
  display: none;
  opacity: 0;
  touch-action: none;
  user-select: none;
  transition: opacity 280ms var(--ui-sac-ease);
}
.ui-sac__bar[data-axis="y"] { top: var(--ui-sac-inset); bottom: var(--ui-sac-inset); inset-inline-end: 0; width: 10px; }
.ui-sac__bar[data-axis="x"] { left: var(--ui-sac-inset); right: var(--ui-sac-inset); bottom: 0; height: 10px; }
/* Both bars: each stops short of the corner the other one runs into */
.ui-sac[data-scroll-y][data-scroll-x] > .ui-sac__bar[data-axis="y"] { bottom: 10px; }
.ui-sac[data-scroll-y][data-scroll-x] > .ui-sac__bar[data-axis="x"] { inset-inline-end: 10px; }
.ui-sac[data-scroll-y] > .ui-sac__bar[data-axis="y"], .ui-sac[data-scroll-x] > .ui-sac__bar[data-axis="x"] { display: block; }

.ui-sac__thumb {
  position: absolute;
  border-radius: 999px;
  background: var(--ui-sac-thumb);
  cursor: default;
  transition: background-color 150ms ease, width 150ms var(--ui-sac-ease), height 150ms var(--ui-sac-ease);
  will-change: transform;
}
/* A wider, invisible grab area around the thin thumb */
.ui-sac__thumb::before { content: ""; position: absolute; inset: -4px; }
.ui-sac__bar[data-axis="y"] > .ui-sac__thumb { top: 0; inset-inline-end: var(--ui-sac-inset); width: var(--ui-sac-size); }
.ui-sac__bar[data-axis="x"] > .ui-sac__thumb { inset-inline-start: 0; bottom: var(--ui-sac-inset); height: var(--ui-sac-size); }
.ui-sac__bar[data-axis="y"]:hover > .ui-sac__thumb, .ui-sac[data-dragging] > .ui-sac__bar[data-axis="y"] > .ui-sac__thumb { width: var(--ui-sac-size-hover); }
.ui-sac__bar[data-axis="x"]:hover > .ui-sac__thumb, .ui-sac[data-dragging] > .ui-sac__bar[data-axis="x"] > .ui-sac__thumb { height: var(--ui-sac-size-hover); }
.ui-sac__bar:hover > .ui-sac__thumb { background: var(--ui-sac-thumb-hover); }
.ui-sac[data-dragging] .ui-sac__thumb { background: var(--ui-sac-thumb-active); }
.ui-sac[data-dragging] { user-select: none; }

/* When it shows: hover – while the pointer is over the box or it scrolls · scroll – only while it scrolls · always */
.ui-sac[data-type="always"] > .ui-sac__bar,
.ui-sac[data-scrolling] > .ui-sac__bar,
.ui-sac[data-dragging] > .ui-sac__bar { opacity: 1; transition-duration: 120ms; }
@media (hover: hover) {
  .ui-sac[data-type="hover"]:hover > .ui-sac__bar { opacity: 1; transition-duration: 120ms; }
}
/* Faded out it lets the pointer through to the content under it */
.ui-sac > .ui-sac__bar { pointer-events: none; }
.ui-sac:is([data-type="always"], [data-scrolling], [data-dragging]) > .ui-sac__bar { pointer-events: auto; }
@media (hover: hover) {
  .ui-sac[data-type="hover"]:hover > .ui-sac__bar { pointer-events: auto; }
}

/* Touch screens: the finger scrolls the content – the bar only shows where you are, a little thicker */
@media (pointer: coarse) {
  .ui-sac { --ui-sac-size: 4px; --ui-sac-size-hover: 4px; }
  .ui-sac > .ui-sac__bar { pointer-events: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-sac__bar, .ui-sac__thumb, .ui-sac[data-fade] { transition-duration: 1ms !important; }
}

/* Windows high contrast: the thumb keeps a system color */
@media (forced-colors: active) {
  .ui-sac__thumb { background: CanvasText; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-sac {
  --ui-sac-thumb: rgba(255, 255, 255, 0.2);
  --ui-sac-thumb-hover: rgba(255, 255, 255, 0.34);
  --ui-sac-thumb-active: rgba(255, 255, 255, 0.46);
  --ui-sac-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
}
`,m=[{title:`Pricing changes for usage-based plans in 2026`,site:`stripe.com`,read:`4 min`},{title:`How teams budget for LLM inference`,site:`a16z.com`,read:`9 min`},{title:`Token pricing across providers, compared`,site:`artificialanalysis.ai`,read:`6 min`},{title:`Seat-based vs. usage-based: what customers prefer`,site:`openviewpartners.com`,read:`7 min`},{title:`Q3 billing export`,site:`Internal · billing-q3.csv`,read:`2 min`},{title:`Churn after a price change – a case study`,site:`profitwell.com`,read:`5 min`},{title:`Credit packs and prepaid usage`,site:`orb.com`,read:`3 min`},{title:`Designing a pricing page for AI products`,site:`growth.design`,read:`8 min`},{title:`Customer interviews, September`,site:`Internal · notes.md`,read:`11 min`},{title:`The cost of a long context window`,site:`anthropic.com`,read:`6 min`},{title:`Overage fees and how users feel about them`,site:`nngroup.com`,read:`5 min`},{title:`Annual plan discounts that work`,site:`priceintelligently.com`,read:`4 min`}],h=[{name:`billing-q3.csv`,icon:i},{name:`pricing-draft.pdf`,icon:s},{name:`interviews.txt`,icon:c},{name:`plans-table.png`,icon:o},{name:`usage_model.py`,icon:r}];function g(){let e=(0,l.useId)();return(0,u.jsx)(`div`,{className:`sa-demo`,children:(0,u.jsxs)(`section`,{className:`sa-demo__card`,"aria-labelledby":e,children:[(0,u.jsxs)(`div`,{className:`sa-demo__head`,children:[(0,u.jsx)(`span`,{className:`sa-demo__title`,id:e,children:`Sources`}),(0,u.jsxs)(`span`,{className:`sa-demo__count`,children:[m.length,` read`]})]}),(0,u.jsx)(d,{className:`sa-demo__list`,maxHeight:240,fade:!0,"aria-label":`Sources`,children:(0,u.jsx)(`ol`,{className:`sa-demo__rows`,children:m.map(e=>(0,u.jsxs)(`li`,{className:`sa-demo__row`,children:[(0,u.jsx)(n,{icon:a,size:16,strokeWidth:1.5}),(0,u.jsxs)(`span`,{className:`sa-demo__text`,children:[(0,u.jsx)(`span`,{className:`sa-demo__name`,title:e.title,children:e.title}),(0,u.jsx)(`span`,{className:`sa-demo__meta`,children:e.site})]}),(0,u.jsx)(`span`,{className:`sa-demo__time`,children:e.read})]},e.title))})}),(0,u.jsx)(d,{className:`sa-demo__files`,orientation:`horizontal`,fade:!0,"aria-label":`Attached files`,children:(0,u.jsx)(`ul`,{className:`sa-demo__chips`,children:h.map(e=>(0,u.jsxs)(`li`,{className:`sa-demo__chip`,children:[(0,u.jsx)(n,{icon:e.icon,size:14,strokeWidth:1.5}),e.name]},e.name))})})]})})}export{g as default};