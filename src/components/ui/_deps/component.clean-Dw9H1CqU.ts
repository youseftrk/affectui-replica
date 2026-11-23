// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function i({trigger:e,items:t,align:i=`start`,side:o=`bottom`,title:m,header:h,open:g,defaultOpen:_=!1,onOpenChange:y,menuClassName:b,width:x,empty:S=`Nothing here yet`,className:C,"aria-label":w}){let T=(0,n.useId)(),E=`${T}-trigger`,D=`${T}-menu`,O=`${T}-title`,[k,A]=(0,n.useState)(_),j=g??k,M=(0,n.useRef)(null),N=(0,n.useRef)(null),P=(0,n.useRef)(`first`),F=(0,n.useRef)(!j);j||(F.current=!0);let I=(0,n.useRef)(E),L=Array.isArray(t)?t.filter(Boolean):[],R=e=>{e!==j&&(g===void 0&&A(e),y?.(e))},z=()=>l(M.current,N.current),B=e=>{e===`now`&&z()?.focus({preventScroll:!0}),R(!1),e===!0&&u(z())},V=e=>{P.current=e?.detail?`menu`:`first`,R(!j)};(0,n.useEffect)(()=>{let e=z();e&&(e.id||=E,e.hasAttribute(`aria-haspopup`)||e.setAttribute(`aria-haspopup`,`menu`),I.current=e.id)},[]),(0,n.useLayoutEffect)(()=>{let e=N.current;if(!j||!e)return;d(e);let t=()=>M.current&&p(e,M.current.getBoundingClientRect(),o,i,6);t(),window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0);let n=typeof ResizeObserver>`u`?null:new ResizeObserver(t);return n?.observe(e),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0),n?.disconnect(),f(e)}},[j,o,i]),(0,n.useEffect)(()=>{if(!j)return;let e=N.current?.querySelector(`:scope > .ui-dmc__list`),t=P.current;if(!e||!F.current)return;if(t===`menu`)return e.focus({preventScroll:!0});let n=s(e),r=n.find(e=>e.getAttribute(`aria-checked`)===`true`);c((t===`last`?n[n.length-1]:r??n[0])??e)},[j]),(0,n.useEffect)(()=>{if(!j)return;let e=e=>{M.current?.contains(e.target)||B(!1)};return document.addEventListener(`pointerdown`,e,!0),()=>document.removeEventListener(`pointerdown`,e,!0)});let H=e=>{j||e.key!==`ArrowDown`&&e.key!==`ArrowUp`||N.current?.contains(e.target)||(e.preventDefault(),P.current=e.key===`ArrowUp`?`last`:`first`,R(!0))},U=e=>{let t=e.relatedTarget;j&&t&&!M.current?.contains(t)&&B(!1)},W={id:E,"aria-haspopup":`menu`,"aria-expanded":j,"aria-controls":j?D:void 0,onClick:V};return(0,r.jsxs)(`span`,{ref:M,className:[`ui-dmc`,C].filter(Boolean).join(` `),onKeyDown:H,onBlur:U,children:[(0,r.jsx)(`style`,{href:`ui-dropdown-menu-clean`,precedence:`default`,children:v}),e({open:j,toggle:V,triggerProps:W}),j&&(0,r.jsxs)(`div`,{ref:N,className:[`ui-dmc__panel`,b].filter(Boolean).join(` `),popover:`manual`,"data-side":o,"data-align":i,style:x==null?void 0:{width:x,maxWidth:`calc(100vw - 16px)`},children:[h,m&&(0,r.jsx)(`span`,{className:`ui-dmc__title`,id:O,children:m}),(0,r.jsx)(a,{id:D,items:L,empty:S,labelledBy:m?O:w?void 0:I.current,label:m?void 0:w,onPick:()=>B(!0),onClose:B})]})]})}function a({id:e,items:t,empty:i,labelledBy:a,label:l,onPick:u,onClose:d,onBack:f}){let p=(0,n.useId)(),m=(0,n.useRef)(null),[v,y]=(0,n.useState)(null),[b,x]=(0,n.useState)(null),S=(0,n.useRef)(0),C=(0,n.useRef)(null),w=(0,n.useRef)({text:``,at:0});(0,n.useEffect)(()=>()=>window.clearTimeout(S.current),[]);let T=()=>{window.clearTimeout(S.current),C.current=null},E=(e,t,n)=>{window.clearTimeout(S.current),C.current=n,S.current=window.setTimeout(()=>{C.current=null,e()},t)},D=e=>m.current?.querySelector(`:scope > [data-index="${e}"]`)??null,O=(e,t)=>{T(),x(n=>n?.index===e?t?{index:e,focus:t}:n:{index:e,focus:t}),t&&b?.index===e&&c(s(document.getElementById(`${p}-sub`)?.querySelector(`.ui-dmc__list`)??null)[0])},k=()=>{let e=b?.index;x(null),e!=null&&c(D(e))},A=(e,n)=>{let r=t[e];if(r&&!r.disabled){if(r.submenu){!n&&b?.index===e&&!b.focus?x(null):O(e,n);return}r.onSelect?.(),r.keepOpen||u()}},j=e=>{let n=Date.now();w.current.text=n-w.current.at>700?e:w.current.text+e,w.current.at=n;let r=w.current.text.toLowerCase(),i=s(m.current),a=i.indexOf(document.activeElement),o=r.length===1?a+1:Math.max(a,0);for(let e=0;e<i.length;e++){let n=i[(o+e)%i.length];if((t[Number(n.dataset.index)]?.label??``).toLowerCase().startsWith(r))return c(n)}},M=e=>{let n=s(m.current),r=n.indexOf(document.activeElement),i=r>=0?Number(n[r].dataset.index):-1,a=i>=0?t[i]:void 0,o=()=>{e.preventDefault(),e.stopPropagation()},l=e=>{o(),b&&x(null),n.length&&c(n[(e+n.length)%n.length])};switch(e.key){case`ArrowDown`:return l(r+1);case`ArrowUp`:return l(r<0?-1:r-1);case`Home`:case`PageUp`:return l(0);case`End`:case`PageDown`:return l(-1);case`ArrowRight`:a?.submenu&&(o(),O(i,!0));return;case`ArrowLeft`:f&&(o(),f());return;case`Escape`:return o(),f?f():d(`now`);case`Enter`:case` `:return o(),e.key===` `&&Date.now()-w.current.at<700?j(` `):A(i,!0);case`Tab`:return d(`now`);default:e.key.length===1&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&(o(),j(e.key))}},N=e=>{let t=e.target;if(t===m.current||t.parentElement!==m.current)return y(null);y({top:t.offsetTop,height:t.offsetHeight,danger:t.hasAttribute(`data-danger`)})},P=e=>{let t=e.relatedTarget;(!t||t.parentElement!==m.current)&&y(null)},F=b?t[b.index]?.submenu:void 0;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(`div`,{ref:m,id:e,className:`ui-dmc__list`,role:`menu`,"aria-orientation":`vertical`,"aria-labelledby":a,"aria-label":l,tabIndex:-1,onKeyDown:M,onFocus:N,onBlur:P,onPointerLeave:()=>{T(),m.current?.contains(document.activeElement)&&document.activeElement!==m.current&&m.current?.focus({preventScroll:!0})},children:[v&&(0,r.jsx)(`span`,{className:`ui-dmc__glow`,"aria-hidden":`true`,"data-danger":v.danger||void 0,style:{transform:`translateY(${v.top}px)`,height:v.height}}),t.length===0&&(0,r.jsx)(`span`,{className:`ui-dmc__empty`,children:i}),t.map((e,t)=>{let i=e.checked!==void 0&&!e.submenu,a=i?e.type===`checkbox`?`menuitemcheckbox`:`menuitemradio`:`menuitem`,o=b?.index===t;return(0,r.jsxs)(n.Fragment,{children:[e.divider&&t>0&&(0,r.jsx)(`span`,{className:`ui-dmc__sep`,role:`separator`}),(0,r.jsxs)(`div`,{className:`ui-dmc__item`,role:a,tabIndex:-1,"data-index":t,"aria-checked":i?!!e.checked:void 0,"aria-disabled":e.disabled||void 0,"aria-haspopup":e.submenu?`menu`:void 0,"aria-expanded":e.submenu?o:void 0,"aria-controls":e.submenu&&o?`${p}-sub-list`:void 0,"data-danger":e.danger||void 0,"data-rich":e.description?``:void 0,"data-open":o||void 0,onPointerDown:e=>e.preventDefault(),onPointerMove:n=>{let r=n.currentTarget;if(e.disabled){document.activeElement!==m.current&&m.current?.focus({preventScroll:!0});return}document.activeElement!==r&&r.focus({preventScroll:!0}),e.submenu?o?T():C.current!==t&&E(()=>O(t,!1),90,t):b?C.current!==-1&&E(()=>x(null),220,-1):T()},onClick:e=>A(t,e.detail===0),children:[(e.logo||e.icon)&&(0,r.jsx)(`span`,{className:`ui-dmc__icon`,"data-logo":e.logo?``:void 0,"aria-hidden":`true`,children:e.logo??(0,r.jsx)(h,{icon:e.icon})}),(0,r.jsxs)(`span`,{className:`ui-dmc__label`,children:[(0,r.jsx)(`span`,{className:`ui-dmc__text`,title:e.label,children:e.label}),e.description&&(0,r.jsx)(`span`,{className:`ui-dmc__desc`,title:e.description,children:e.description})]}),e.shortcut&&(0,r.jsx)(`kbd`,{className:`ui-dmc__kbd`,children:e.shortcut}),e.submenu&&(0,r.jsx)(`span`,{className:`ui-dmc__more`,"aria-hidden":`true`,children:(0,r.jsx)(g,{})}),i&&(0,r.jsx)(`span`,{className:`ui-dmc__check`,"aria-hidden":`true`,children:e.checked&&(0,r.jsx)(_,{})})]})]},`${t}-${e.label}`)})]}),b&&F&&(0,r.jsx)(o,{id:`${p}-sub`,listId:`${p}-sub-list`,row:()=>D(b.index),items:F,focus:b.focus,label:t[b.index]?.label,onEnter:()=>T(),onBack:k,onPick:u,onClose:d})]})}function o({id:e,listId:t,row:i,items:o,focus:l,label:u,onEnter:m,onBack:h,onPick:g,onClose:_}){let v=(0,n.useRef)(null);return(0,n.useLayoutEffect)(()=>{let e=v.current;if(!e)return;d(e);let t=()=>{let t=i()?.getBoundingClientRect();t&&p(e,new DOMRect(t.left-4,t.top-4,t.width+8,t.height+8),`right`,`start`,4)};return t(),window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0),f(e)}},[]),(0,n.useEffect)(()=>{l&&c(s(v.current?.querySelector(`.ui-dmc__list`)??null)[0])},[l]),(0,r.jsx)(`div`,{ref:v,id:e,className:`ui-dmc__panel`,"data-sub":``,popover:`manual`,onPointerEnter:m,children:(0,r.jsx)(a,{id:t,items:o,label:u,onPick:g,onClose:_,onBack:h})})}var s=e=>e?[...e.querySelectorAll(`:scope > [role^="menuitem"]:not([aria-disabled="true"])`)]:[];function c(e){e&&(e.focus({preventScroll:!0}),e.scrollIntoView?.({block:`nearest`}))}function l(e,t){if(!e)return null;let n=e.querySelectorAll(`button, [href], input, [tabindex]`);for(let e of n)if(!t?.contains(e))return e;return null}var u=e=>window.setTimeout(()=>{let t=document.activeElement;e?.isConnected&&(!t||t===document.body)&&e.focus({preventScroll:!0})});function d(e){`showPopover`in e&&!e.matches(`:popover-open`)&&e.showPopover()}function f(e){`hidePopover`in e&&e.isConnected&&e.matches(`:popover-open`)&&e.hidePopover()}function p(e,t,n,r,i){e.style.setProperty(`--ui-dmc-trigger-w`,`${Math.round(t.width)}px`);let a=document.documentElement.clientWidth||window.innerWidth,o=window.innerHeight;e.style.maxHeight=``;let s=e.offsetWidth,c=e.offsetHeight,l={bottom:o-t.bottom-i-8,top:t.top-i-8,right:a-t.right-i-8,left:t.left-i-8},u={top:`bottom`,bottom:`top`,left:`right`,right:`left`},d=n,f=r,p,m,h=d===`top`||d===`bottom`;if(l[d]<(h?c:s)&&l[u[d]]>l[d]&&(d=u[d]),!h&&l[d]<s)d=`bottom`,p=t.bottom-2,m=Math.min(Math.max(8,t.left+16),a-8-s),e.style.maxHeight=`${Math.max(120,o-p-8)}px`;else if(d===`top`||d===`bottom`){let n=Math.min(c,Math.max(120,l[d]));p=d===`bottom`?t.bottom+i:t.top-i-n,m=f===`start`?t.left:t.right-s,f===`start`&&m+s>a-8&&t.right-s>=8?(f=`end`,m=t.right-s):f===`end`&&m<8&&t.left+s<=a-8&&(f=`start`,m=t.left),m=Math.min(Math.max(8,m),a-8-s),c>n&&(e.style.maxHeight=`${n}px`)}else m=d===`right`?t.right+i:t.left-i-s,p=f===`start`?t.top:t.bottom-c,p+c>o-8&&(p=Math.max(8,o-8-c)),p<8&&(p=8),c>o-16&&(e.style.maxHeight=`${o-16}px`);e.style.top=`${Math.round(p)}px`,e.style.left=`${Math.round(m)}px`,e.dataset.side=d,e.dataset.align=f}var m=e=>Array.isArray(e)&&e.length>0&&e.every(e=>Array.isArray(e)&&typeof e[0]==`string`);function h({icon:e}){return m(e)?(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,focusable:`false`,children:e.map(([e,{key:t,...r}],i)=>(0,n.createElement)(e,{...r,key:String(t??i)}))}):(0,r.jsx)(r.Fragment,{children:e})}function g(){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{d:`M9 6s6 4.42 6 6-6 6-6 6`})})}function _(){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{className:`ui-dmc__tick`,d:`M5 14 8.5 17.5 19 6.5`,pathLength:1})})}var v=`
/* Colors and motion as variables – override them on .ui-dmc (see Theming in the docs) */
.ui-dmc {
  --ui-dmc-surface: var(--aui-overlay, var(--aui-surface, #ffffff));
  --ui-dmc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-dmc-text: var(--aui-muted, rgba(0, 0, 0, 0.61));
  --ui-dmc-icon: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-dmc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.27));
  --ui-dmc-line: var(--aui-border, rgba(0, 0, 0, 0.06));
  --ui-dmc-glow: rgba(0, 0, 0, 0.035);
  --ui-dmc-danger: var(--aui-red, #f04438);
  --ui-dmc-danger-glow: color-mix(in srgb, var(--aui-red, #f04438) 8%, transparent);
  --ui-dmc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.1)), 0 12px 32px -8px rgba(0, 0, 0, 0.16));
  --ui-dmc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-dmc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));
  --ui-dmc-radius: calc(var(--aui-radius-lg, 10px) + 2px);
  --ui-dmc-row-radius: calc(var(--aui-radius-sm, 5px) + 3px);

  position: relative;
  display: inline-flex;
  min-width: 0;
}

/* The menu: a white card in the top layer, a 0.5px edge and a soft drop */
.ui-dmc__panel {
  position: fixed;
  inset: auto;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 168px;
  /* Fits its content up to 320px – long items shorten with … (full text on hover) instead of stretching it; the width prop lifts the cap */
  max-width: min(320px, calc(100vw - 16px));
  max-height: calc(100vh - 16px);
  margin: 0;
  padding: 4px;
  border: 0;
  border-radius: var(--ui-dmc-radius);
  background: var(--ui-dmc-surface);
  box-shadow: var(--ui-dmc-shadow);
  color: var(--ui-dmc-ink);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  text-align: start;
  overflow: visible;
  -webkit-font-smoothing: antialiased;
  transform-origin: top left;
  animation: ui-dmc-in 220ms var(--ui-dmc-ease) both;
}
.ui-dmc__panel::backdrop { display: none; }
.ui-dmc__panel[data-align="end"] { transform-origin: top right; }
.ui-dmc__panel[data-side="top"] { transform-origin: bottom left; animation-name: ui-dmc-in-up; }
.ui-dmc__panel[data-side="top"][data-align="end"] { transform-origin: bottom right; }
.ui-dmc__panel[data-side="right"] { transform-origin: top left; animation-name: ui-dmc-in-side; animation-duration: 160ms; }
.ui-dmc__panel[data-side="left"] { transform-origin: top right; animation-name: ui-dmc-in-side; animation-duration: 160ms; }

.ui-dmc__title { display: block; flex: none; padding: 6px 10px 4px; font-size: 12px; line-height: 16px; font-weight: 500; color: var(--ui-dmc-faint); }

/* The rows; a long menu scrolls inside the card */
.ui-dmc__list {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: 1px;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
}
.ui-dmc__list:focus { outline: none; }

/* One soft highlight that glides between the rows */
.ui-dmc__glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: var(--ui-dmc-row-radius);
  background: var(--ui-dmc-glow);
  pointer-events: none;
  transition: transform 180ms var(--ui-dmc-ease), height 180ms var(--ui-dmc-ease), background-color 120ms ease;
}
.ui-dmc__glow[data-danger] { background: var(--ui-dmc-danger-glow); }

.ui-dmc__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  box-sizing: border-box;
  min-width: 0;
  min-height: 32px;
  padding: 0 10px;
  border-radius: var(--ui-dmc-row-radius);
  color: var(--ui-dmc-text);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 120ms ease;
}
.ui-dmc__item[data-rich] { min-height: 44px; padding: 6px 10px; }
.ui-dmc__item:focus { outline: none; color: var(--ui-dmc-ink); }
.ui-dmc__item:focus-visible { outline: 2px solid var(--ui-dmc-focus); outline-offset: -2px; }
/* The item whose submenu is open keeps a highlight while the focus is in the submenu */
.ui-dmc__item[data-open] { color: var(--ui-dmc-ink); }
.ui-dmc__item[data-open]:not(:focus) { background: var(--ui-dmc-glow); }
.ui-dmc__item[aria-checked="true"] { color: var(--ui-dmc-ink); font-weight: 500; }
.ui-dmc__item[data-danger], .ui-dmc__item[data-danger]:focus { color: var(--ui-dmc-danger); }
.ui-dmc__item[aria-disabled="true"] { color: var(--ui-dmc-faint); cursor: default; }

.ui-dmc__icon { display: grid; flex: none; place-items: center; width: 16px; height: 16px; color: var(--ui-dmc-icon); transition: color 120ms ease; }
.ui-dmc__icon > svg { display: block; width: 15px; height: 15px; }
.ui-dmc__icon[data-logo] > svg, .ui-dmc__icon[data-logo] > img { width: 14px; height: 14px; }
.ui-dmc__item:focus .ui-dmc__icon:not([data-logo]), .ui-dmc__item[data-open] .ui-dmc__icon:not([data-logo]) { color: var(--ui-dmc-ink); }
.ui-dmc__item[data-danger] .ui-dmc__icon { color: var(--ui-dmc-danger); }
.ui-dmc__item[aria-disabled="true"] .ui-dmc__icon { opacity: 0.5; color: var(--ui-dmc-icon); }

/* Long names stay on one line – the full name on hover */
.ui-dmc__label { display: grid; flex: 1; gap: 1px; min-width: 0; }
.ui-dmc__text, .ui-dmc__desc { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-dmc__desc { font-size: 12px; line-height: 16px; font-weight: 400; color: var(--ui-dmc-faint); }

.ui-dmc__kbd { flex: none; padding-left: 16px; font: inherit; font-size: 12px; font-weight: 400; letter-spacing: 0.04em; color: var(--ui-dmc-faint); }
.ui-dmc__more, .ui-dmc__check { display: grid; flex: none; place-items: center; width: 14px; height: 14px; }
.ui-dmc__more { color: var(--ui-dmc-faint); }
.ui-dmc__check { color: var(--ui-dmc-ink); }
.ui-dmc__more > svg, .ui-dmc__check > svg { display: block; width: 14px; height: 14px; }
.ui-dmc__tick { stroke-dasharray: 1; animation: ui-dmc-draw 280ms 40ms var(--ui-dmc-ease) both; }

.ui-dmc__sep { display: block; height: 1px; margin: 4px 6px; background: var(--ui-dmc-line); }
.ui-dmc__empty { display: block; padding: 6px 8px; color: var(--ui-dmc-faint); }

@keyframes ui-dmc-in { from { opacity: 0; transform: scale(0.96) translateY(-4px); } }
@keyframes ui-dmc-in-up { from { opacity: 0; transform: scale(0.96) translateY(4px); } }
@keyframes ui-dmc-in-side { from { opacity: 0; transform: scale(0.98); } }
@keyframes ui-dmc-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }

/* Touch screens: rows a finger can hit */
@media (pointer: coarse) {
  .ui-dmc__item { min-height: 40px; }
  .ui-dmc__item[data-rich] { min-height: 48px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-dmc__panel, .ui-dmc__tick { animation-duration: 1ms; }
  .ui-dmc__glow, .ui-dmc__item, .ui-dmc__icon { transition-duration: 1ms; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-dmc {
  --ui-dmc-surface: var(--aui-overlay, var(--aui-surface, #1b1b1e));
  --ui-dmc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-dmc-text: var(--aui-muted, rgba(255, 255, 255, 0.62));
  --ui-dmc-icon: var(--aui-muted, rgba(255, 255, 255, 0.45));
  --ui-dmc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.28));
  --ui-dmc-line: var(--aui-border, rgba(255, 255, 255, 0.08));
  --ui-dmc-glow: rgba(255, 255, 255, 0.06);
  --ui-dmc-danger: var(--aui-red, #ff6b5f);
  --ui-dmc-danger-glow: color-mix(in srgb, var(--aui-red, #ff6b5f) 14%, transparent);
  --ui-dmc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.14)), 0 12px 32px -8px rgba(0, 0, 0, 0.6));
  --ui-dmc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
  color-scheme: dark;
}
`;export{i as t};