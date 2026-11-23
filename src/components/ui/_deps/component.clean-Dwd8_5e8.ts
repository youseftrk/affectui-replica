// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function i({open:e,onClose:t,children:i,side:p=`bottom`,align:m=`start`,offset:h=6,anchor:g,title:_,description:v,width:y,focusOnOpen:b=!0,unstyled:x,className:S,style:C,role:w=`dialog`,ref:T,...E}){let D=(0,n.useId)(),O=`${D}-title`,k=`${D}-desc`,A=(0,n.useRef)(null),j=(0,n.useRef)(t);j.current=t;let M=(0,n.useRef)(!e);e||(M.current=!0);let N=()=>g?.current??A.current?.parentElement??null,P=e=>!!e&&(!!A.current?.contains(e)||!!N()?.contains(e));if((0,n.useLayoutEffect)(()=>{let t=A.current;if(!e||!t)return;l(t);let n=()=>{let e=N();e&&d(t,e.getBoundingClientRect(),p,m,h)};n(),window.addEventListener(`resize`,n),window.addEventListener(`scroll`,n,!0);let r=typeof ResizeObserver>`u`?null:new ResizeObserver(n);return r?.observe(t),()=>{window.removeEventListener(`resize`,n),window.removeEventListener(`scroll`,n,!0),r?.disconnect(),u(t)}},[e,p,m,h]),(0,n.useEffect)(()=>{let t=A.current;if(!e||!t)return;b&&M.current&&!t.contains(document.activeElement)&&(o(t)??t).focus({preventScroll:!0});let n=s(N(),t),r=t.contains(document.activeElement),i=()=>r=!0,a=e=>r=!!e.relatedTarget&&t.contains(e.relatedTarget);return t.addEventListener(`focusin`,i),t.addEventListener(`focusout`,a),()=>{t.removeEventListener(`focusin`,i),t.removeEventListener(`focusout`,a),r&&c(n)}},[e]),(0,n.useEffect)(()=>{if(!e)return;let t=e=>{P(e.target)||j.current()},n=e=>{if(e.key!==`Escape`||e.defaultPrevented)return;let t=e.target?.closest?.(`[popover]`);if(t&&t!==A.current&&A.current?.contains(t))return;e.preventDefault(),e.stopPropagation();let n=P(document.activeElement),r=s(N(),A.current);j.current(),n&&r?.focus({preventScroll:!0})},r=e=>{let t=e.relatedTarget;P(e.target)&&t&&!P(t)&&j.current()};return document.addEventListener(`pointerdown`,t,!0),window.addEventListener(`keydown`,n,!0),document.addEventListener(`focusout`,r),()=>{document.removeEventListener(`pointerdown`,t,!0),window.removeEventListener(`keydown`,n,!0),document.removeEventListener(`focusout`,r)}},[e]),!e)return null;let F=a(_)||a(v);return(0,r.jsxs)(`div`,{...E,ref:e=>{A.current=e,typeof T==`function`?T(e):T&&(T.current=e)},className:[`ui-popc`,S].filter(Boolean).join(` `),"data-unstyled":x||void 0,role:w,"aria-labelledby":a(_)?O:E[`aria-labelledby`],"aria-describedby":a(v)?k:E[`aria-describedby`],tabIndex:-1,popover:`manual`,"data-side":p,"data-align":m,style:y==null?C:{...C,width:y,maxWidth:`calc(100vw - 16px)`},children:[(0,r.jsx)(`style`,{href:`ui-popover-clean`,precedence:`default`,children:f}),F&&(0,r.jsxs)(`div`,{className:`ui-popc__head`,children:[a(_)&&(0,r.jsx)(`p`,{className:`ui-popc__title`,id:O,children:_}),a(v)&&(0,r.jsx)(`p`,{className:`ui-popc__desc`,id:k,children:v})]}),i]})}var a=e=>e!=null&&typeof e!=`boolean`&&e!==``,o=e=>[...e.querySelectorAll(`input, textarea, select, button, [href], [tabindex]`)].find(e=>e.tabIndex>=0&&!e.disabled&&e.getClientRects().length>0);function s(e,t){if(!e)return null;if(e.matches(`button, [href], input, [tabindex]`))return e;for(let n of e.querySelectorAll(`button, [href], input, [tabindex]`))if(!t?.contains(n))return n;return null}var c=e=>window.setTimeout(()=>{let t=document.activeElement;e?.isConnected&&(!t||t===document.body)&&e.focus({preventScroll:!0})});function l(e){`showPopover`in e&&!e.matches(`:popover-open`)&&e.showPopover()}function u(e){`hidePopover`in e&&e.isConnected&&e.matches(`:popover-open`)&&e.hidePopover()}function d(e,t,n,r,i){let a=document.documentElement.clientWidth||window.innerWidth,o=window.innerHeight;e.style.maxHeight=``;let s=e.offsetWidth,c=e.offsetHeight,l={bottom:o-t.bottom-i-8,top:t.top-i-8,right:a-t.right-i-8,left:t.left-i-8},u={top:`bottom`,bottom:`top`,left:`right`,right:`left`},d=n,f=r;l[d]<(d===`top`||d===`bottom`?c:s)&&l[u[d]]>l[d]&&(d=u[d]),(d===`left`||d===`right`)&&l[d]<s&&(d=l.bottom>=l.top?`bottom`:`top`);let p,m;if(d===`top`||d===`bottom`){let n=Math.min(c,Math.max(120,l[d]));p=d===`bottom`?t.bottom+i:t.top-i-n,m=f===`start`?t.left:f===`end`?t.right-s:t.left+t.width/2-s/2,f===`start`&&m+s>a-8&&t.right-s>=8?(f=`end`,m=t.right-s):f===`end`&&m<8&&t.left+s<=a-8&&(f=`start`,m=t.left),m=Math.min(Math.max(8,m),a-8-s),c>n&&(e.style.maxHeight=`${n}px`)}else m=d===`right`?t.right+i:t.left-i-s,p=f===`start`?t.top:f===`end`?t.bottom-c:t.top+t.height/2-c/2,f===`start`&&p+c>o-8&&t.bottom-c>=8?(f=`end`,p=t.bottom-c):f===`end`&&p<8&&t.top+c<=o-8&&(f=`start`,p=t.top),p=Math.min(Math.max(8,p),Math.max(8,o-8-c)),c>o-16&&(e.style.maxHeight=`${o-16}px`);e.style.top=`${Math.round(p)}px`,e.style.left=`${Math.round(m)}px`,e.dataset.side=d,e.dataset.align=f}var f=`
/* Colors and motion as variables – override them on .ui-popc (see Theming in the docs) */
.ui-popc {
  --ui-popc-surface: var(--aui-overlay, var(--aui-surface, #ffffff));
  --ui-popc-strong: var(--aui-ink, #000000);
  --ui-popc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-popc-muted: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-popc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.1)), 0 12px 32px -8px rgba(0, 0, 0, 0.16));
  --ui-popc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));

  /* A white card in the top layer: a 0.5px edge and a soft drop */
  position: fixed;
  inset: auto;
  z-index: 1000;
  display: block;
  box-sizing: border-box;
  max-height: calc(100vh - 16px);
  margin: 0;
  border: 0;
  transform-origin: top left;
  animation: ui-popc-in 220ms var(--ui-popc-ease) both;
  max-width: calc(100vw - 16px);
}
/* Unstyled: the browser's popover look switched off at no weight, so any class of yours wins */
:where(.ui-popc) { padding: 0; background: none; color: inherit; overflow: visible; }
/* The card itself – left out with unstyled, so your own classes draw it */
.ui-popc:not([data-unstyled]) {
  /* Fits its content up to 360px – a long URL or name wraps instead of stretching it; the width prop lifts the cap */
  max-width: min(360px, calc(100vw - 16px));
  padding: 14px;
  border-radius: calc(var(--aui-radius-lg, 10px) + 2px);
  background: var(--ui-popc-surface);
  box-shadow: var(--ui-popc-shadow);
  color: var(--ui-popc-ink);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  text-align: start;
  overflow: auto;
  overscroll-behavior: contain;
  -webkit-font-smoothing: antialiased;
}
.ui-popc::backdrop { display: none; }
.ui-popc:focus { outline: none; }
.ui-popc *, .ui-popc *::before, .ui-popc *::after { box-sizing: border-box; }

/* It grows out of the side and edge it is attached to */
.ui-popc[data-align="end"] { transform-origin: top right; }
.ui-popc[data-align="center"] { transform-origin: top center; }
.ui-popc[data-side="top"] { transform-origin: bottom left; animation-name: ui-popc-in-up; }
.ui-popc[data-side="top"][data-align="end"] { transform-origin: bottom right; }
.ui-popc[data-side="top"][data-align="center"] { transform-origin: bottom center; }
.ui-popc[data-side="right"] { transform-origin: top left; animation-name: ui-popc-in-right; }
.ui-popc[data-side="right"][data-align="end"] { transform-origin: bottom left; }
.ui-popc[data-side="right"][data-align="center"] { transform-origin: center left; }
.ui-popc[data-side="left"] { transform-origin: top right; animation-name: ui-popc-in-left; }
.ui-popc[data-side="left"][data-align="end"] { transform-origin: bottom right; }
.ui-popc[data-side="left"][data-align="center"] { transform-origin: center right; }

.ui-popc__head { display: grid; gap: 2px; min-width: 0; }
.ui-popc__head:not(:last-child) { margin-bottom: 12px; }
.ui-popc__title { margin: 0; font-weight: 500; color: var(--ui-popc-strong); overflow-wrap: anywhere; }
.ui-popc__desc { margin: 0; font-size: 12px; line-height: 16px; color: var(--ui-popc-muted); overflow-wrap: anywhere; }

@keyframes ui-popc-in { from { opacity: 0; transform: scale(0.96) translateY(-4px); } }
@keyframes ui-popc-in-up { from { opacity: 0; transform: scale(0.96) translateY(4px); } }
@keyframes ui-popc-in-right { from { opacity: 0; transform: scale(0.96) translateX(-4px); } }
@keyframes ui-popc-in-left { from { opacity: 0; transform: scale(0.96) translateX(4px); } }

/* Touch screens: 15px text, so it reads like the rest of a phone UI */
@media (pointer: coarse) {
  .ui-popc { padding: 16px; font-size: 15px; line-height: 22px; }
  .ui-popc__desc { font-size: 13px; line-height: 18px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-popc { animation-duration: 1ms; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-popc {
  --ui-popc-surface: var(--aui-overlay, var(--aui-surface, #1b1b1e));
  --ui-popc-strong: var(--aui-ink, #ffffff);
  --ui-popc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-popc-muted: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-popc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.14)), 0 12px 32px -8px rgba(0, 0, 0, 0.6));
  color-scheme: dark;
}
`;export{i as t};