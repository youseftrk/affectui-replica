// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as S from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const C = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/HugeiconsIcon-C2cDExRS";
import{n as r,r as i,t as a}from"./_deps/SortingAZ01Icon-BDynvc_p";
import{t as o}from"./_deps/Clock01Icon-Caopc-kj";
import{t as s}from"./_deps/Copy01Icon-DrPxamgF";
import{t as c}from"./_deps/Csv01Icon-Ds3OtOdC";
import{t as l}from"./_deps/Database01Icon-DrAaO4oe";
import{t as u}from"./_deps/Delete02Icon-CsyBlwAn";
import{t as d}from"./_deps/Download04Icon-C2-aGxK5";
import{t as f}from"./_deps/FileAddIcon-DDZyUUh-";
import{t as p}from"./_deps/FileScriptIcon-CATW1Dzd";
import{t as m}from"./_deps/Folder01Icon-CEhnVDRo";
import{t as h}from"./_deps/Image01Icon-f2njTfyB";
import{t as g}from"./_deps/Pdf01Icon-BQai0-Yi";
import{t as _}from"./_deps/PinIcon-B5iNHNfk";
import{t as v}from"./_deps/Target02Icon-B_T0iwXf";
import{t as y}from"./_deps/TestTube01Icon-D7ARShpk";
import{t as b}from"./_deps/Upload04Icon-CodFgqPj";
import{t as x}from"./_deps/ViewIcon-Oqp8zA5Y";
var w=500,T=10,E=e=>e.key===`ContextMenu`||e.shiftKey&&e.key===`F10`,D=`button, [href], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])`,O=e=>!!e?.closest(`input, textarea, select, [contenteditable=""], [contenteditable="true"]`);function k({children:e,items:t,title:n,"aria-label":r=`Actions`,disabled:i,onOpenChange:a,width:o,menuClassName:s}){let c=(0,S.useId)(),l=(0,S.useRef)(null),[u,d]=(0,S.useState)(null),f=(0,S.useRef)(0),p=(0,S.useRef)(0),m=(0,S.useRef)(null),h=(0,S.useRef)(a);h.current=a;let g=e=>{let n=typeof t==`function`?t(e):t;return Array.isArray(n)?n.filter(Boolean):[]},_=(e,t,n,r)=>{if(i||!g(n).length)return!1;let a=document.activeElement,o=l.current,s=n.closest(D),c=a&&o?.contains(a)?a:s&&o?.contains(s)?s:o&&o.tabIndex>=0?o:null;return d({x:e,y:t,target:n,back:c,keyboard:r,n:++f.current}),h.current?.(!0,n),!0},v=e=>{let t=u?.back??null;e===`now`&&t?.focus({preventScroll:!0}),d(null),h.current?.(!1,null),e===!0&&F(t)};(0,S.useEffect)(()=>()=>window.clearTimeout(m.current?.timer),[]);let y=()=>{window.clearTimeout(m.current?.timer),m.current=null};if(!(0,S.isValidElement)(e))return(0,C.jsx)(C.Fragment,{children:e});let b=e.props,x=(e,t)=>b[e]?.(t),k=(e,t)=>n=>{x(e,n),n.defaultPrevented||t(n)},j=(0,S.cloneElement)(e,{ref:e=>{l.current=e;let t=b.ref;typeof t==`function`?t(e):t&&(t.current=e)},style:i?b.style:{WebkitTouchCallout:`none`,...b.style},onContextMenu:k(`onContextMenu`,e=>{if(Date.now()-p.current<600)return e.preventDefault();let t=e.target;if(i||O(t))return;let n=!!m.current;y(),_(e.clientX,e.clientY,t,!1)&&(e.preventDefault(),n&&(p.current=Date.now()))}),onKeyDown:k(`onKeyDown`,e=>{if(!E(e)||i)return;let t=e.target;if(O(t))return;let n=t.getBoundingClientRect(),r=getComputedStyle(t).direction===`rtl`?n.right-Math.min(12,n.width/2):n.left+Math.min(12,n.width/2);_(r,n.top+Math.min(n.height,26),t,!0)&&(e.preventDefault(),p.current=Date.now())}),onPointerDown:k(`onPointerDown`,e=>{if(y(),e.pointerType!==`touch`||i||O(e.target))return;let t=e.target,{clientX:n,clientY:r}=e;m.current={x:n,y:r,timer:window.setTimeout(()=>{m.current=null,_(n,r,t,!1)&&(p.current=Date.now())},w)}}),onPointerMove:k(`onPointerMove`,e=>{let t=m.current;t&&Math.hypot(e.clientX-t.x,e.clientY-t.y)>T&&y()}),onPointerUp:k(`onPointerUp`,y),onPointerCancel:k(`onPointerCancel`,y),onClickCapture:e=>{Date.now()-p.current<600&&(e.preventDefault(),e.stopPropagation()),x(`onClickCapture`,e)}}),M=u?g(u.target):[];return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`style`,{href:`ui-context-menu-clean`,precedence:`default`,children:U}),j,u&&M.length>0&&(0,C.jsx)(A,{id:`${c}-menu`,at:u,items:M,title:n,label:r,width:o,className:s,onClose:v},u.n)]})}function A({id:e,at:t,items:n,title:r,label:i,width:a,className:o,onClose:s}){let c=(0,S.useRef)(null),l=(0,S.useRef)(s);l.current=s;let u=`${e}-title`;(0,S.useLayoutEffect)(()=>{let e=c.current;if(!e)return;I(e);let n=getComputedStyle(t.target).direction===`rtl`,r=()=>R(e,new DOMRect(t.x,t.y,0,0),`bottom`,n?`end`:`start`,0);r();let i=typeof ResizeObserver>`u`?null:new ResizeObserver(r);return i?.observe(e),()=>{i?.disconnect(),L(e)}},[]),(0,S.useEffect)(()=>{let e=c.current?.querySelector(`:scope > .ui-ctxc__list`);if(e){if(!t.keyboard)return e.focus({preventScroll:!0});P(N(e)[0]??e)}},[]),(0,S.useEffect)(()=>{let e=e=>e instanceof Node&&!!c.current?.contains(e),n=t=>!e(t.target)&&l.current(!1),r=n=>{let r=n.target;e(r)||(r===document||r instanceof Node&&r.contains(t.target))&&l.current(!1)},i=()=>l.current(!1);return document.addEventListener(`pointerdown`,n,!0),window.addEventListener(`scroll`,r,!0),window.addEventListener(`resize`,i),window.addEventListener(`blur`,i),()=>{document.removeEventListener(`pointerdown`,n,!0),window.removeEventListener(`scroll`,r,!0),window.removeEventListener(`resize`,i),window.removeEventListener(`blur`,i)}},[]);let d=e=>e.stopPropagation();return(0,C.jsxs)(`div`,{ref:c,className:[`ui-ctxc`,`ui-ctxc__panel`,o].filter(Boolean).join(` `),popover:`manual`,style:a==null?void 0:{width:a,maxWidth:`calc(100vw - 16px)`},onClick:d,onDoubleClick:d,onPointerDown:d,onMouseDown:d,onContextMenu:e=>{e.preventDefault(),e.stopPropagation()},children:[r&&(0,C.jsx)(`span`,{className:`ui-ctxc__title`,id:u,children:r}),(0,C.jsx)(j,{id:e,items:n,labelledBy:r?u:void 0,label:r?void 0:i,onPick:()=>s(!0),onClose:s})]})}function j({id:e,items:t,empty:n,labelledBy:r,label:i,onPick:a,onClose:o,onBack:s}){let c=(0,S.useId)(),l=(0,S.useRef)(null),[u,d]=(0,S.useState)(null),[f,p]=(0,S.useState)(null),m=(0,S.useRef)(0),h=(0,S.useRef)(null),g=(0,S.useRef)({text:``,at:0});(0,S.useEffect)(()=>()=>window.clearTimeout(m.current),[]);let _=()=>{window.clearTimeout(m.current),h.current=null},v=(e,t,n)=>{window.clearTimeout(m.current),h.current=n,m.current=window.setTimeout(()=>{h.current=null,e()},t)},y=e=>l.current?.querySelector(`:scope > [data-index="${e}"]`)??null,b=(e,t)=>{_(),p(n=>n?.index===e?t?{index:e,focus:t}:n:{index:e,focus:t}),t&&f?.index===e&&P(N(document.getElementById(`${c}-sub`)?.querySelector(`.ui-ctxc__list`)??null)[0])},x=()=>{let e=f?.index;p(null),e!=null&&P(y(e))},w=(e,n)=>{let r=t[e];if(r&&!r.disabled){if(r.submenu){!n&&f?.index===e&&!f.focus?p(null):b(e,n);return}r.onSelect?.(),r.keepOpen||a()}},T=e=>{let n=Date.now();g.current.text=n-g.current.at>700?e:g.current.text+e,g.current.at=n;let r=g.current.text.toLowerCase(),i=N(l.current),a=i.indexOf(document.activeElement),o=r.length===1?a+1:Math.max(a,0);for(let e=0;e<i.length;e++){let n=i[(o+e)%i.length];if((t[Number(n.dataset.index)]?.label??``).toLowerCase().startsWith(r))return P(n)}},E=e=>{let n=N(l.current),r=n.indexOf(document.activeElement),i=r>=0?Number(n[r].dataset.index):-1,a=i>=0?t[i]:void 0,c=()=>{e.preventDefault(),e.stopPropagation()},u=e=>{c(),f&&p(null),n.length&&P(n[(e+n.length)%n.length])};switch(e.key){case`ArrowDown`:return u(r+1);case`ArrowUp`:return u(r<0?-1:r-1);case`Home`:case`PageUp`:return u(0);case`End`:case`PageDown`:return u(-1);case`ArrowRight`:a?.submenu&&(c(),b(i,!0));return;case`ArrowLeft`:s&&(c(),s());return;case`Escape`:return c(),s?s():o(`now`);case`Enter`:case` `:return c(),e.key===` `&&Date.now()-g.current.at<700?T(` `):w(i,!0);case`Tab`:return o(`now`);default:e.key.length===1&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&(c(),T(e.key))}},D=e=>{let t=e.target;if(t===l.current||t.parentElement!==l.current)return d(null);d({top:t.offsetTop,height:t.offsetHeight,danger:t.hasAttribute(`data-danger`)})},O=e=>{let t=e.relatedTarget;(!t||t.parentElement!==l.current)&&d(null)},k=f?t[f.index]?.submenu:void 0;return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(`div`,{ref:l,id:e,className:`ui-ctxc__list`,role:`menu`,"aria-orientation":`vertical`,"aria-labelledby":r,"aria-label":i,tabIndex:-1,onKeyDown:E,onFocus:D,onBlur:O,onPointerLeave:()=>{_(),l.current?.contains(document.activeElement)&&document.activeElement!==l.current&&l.current?.focus({preventScroll:!0})},children:[u&&(0,C.jsx)(`span`,{className:`ui-ctxc__glow`,"aria-hidden":`true`,"data-danger":u.danger||void 0,style:{transform:`translateY(${u.top}px)`,height:u.height}}),t.length===0&&(0,C.jsx)(`span`,{className:`ui-ctxc__empty`,children:n}),t.map((e,t)=>{let n=e.checked!==void 0&&!e.submenu,r=n?e.type===`checkbox`?`menuitemcheckbox`:`menuitemradio`:`menuitem`,i=f?.index===t;return(0,C.jsxs)(S.Fragment,{children:[e.divider&&t>0&&(0,C.jsx)(`span`,{className:`ui-ctxc__sep`,role:`separator`}),(0,C.jsxs)(`div`,{className:`ui-ctxc__item`,role:r,tabIndex:-1,"data-index":t,"aria-checked":n?!!e.checked:void 0,"aria-disabled":e.disabled||void 0,"aria-haspopup":e.submenu?`menu`:void 0,"aria-expanded":e.submenu?i:void 0,"aria-controls":e.submenu&&i?`${c}-sub-list`:void 0,"data-danger":e.danger||void 0,"data-rich":e.description?``:void 0,"data-open":i||void 0,onPointerDown:e=>e.preventDefault(),onPointerMove:n=>{let r=n.currentTarget;if(e.disabled){document.activeElement!==l.current&&l.current?.focus({preventScroll:!0});return}document.activeElement!==r&&r.focus({preventScroll:!0}),e.submenu?i?_():h.current!==t&&v(()=>b(t,!1),90,t):f?h.current!==-1&&v(()=>p(null),220,-1):_()},onClick:e=>w(t,e.detail===0),children:[(e.logo||e.icon)&&(0,C.jsx)(`span`,{className:`ui-ctxc__icon`,"data-logo":e.logo?``:void 0,"aria-hidden":`true`,children:e.logo??(0,C.jsx)(B,{icon:e.icon})}),(0,C.jsxs)(`span`,{className:`ui-ctxc__label`,children:[(0,C.jsx)(`span`,{className:`ui-ctxc__text`,title:e.label,children:e.label}),e.description&&(0,C.jsx)(`span`,{className:`ui-ctxc__desc`,title:e.description,children:e.description})]}),e.shortcut&&(0,C.jsx)(`kbd`,{className:`ui-ctxc__kbd`,children:e.shortcut}),e.submenu&&(0,C.jsx)(`span`,{className:`ui-ctxc__more`,"aria-hidden":`true`,children:(0,C.jsx)(V,{})}),n&&(0,C.jsx)(`span`,{className:`ui-ctxc__check`,"aria-hidden":`true`,children:e.checked&&(0,C.jsx)(H,{})})]})]},`${t}-${e.label}`)})]}),f&&k&&(0,C.jsx)(M,{id:`${c}-sub`,listId:`${c}-sub-list`,row:()=>y(f.index),items:k,focus:f.focus,label:t[f.index]?.label,onEnter:()=>_(),onBack:x,onPick:a,onClose:o})]})}function M({id:e,listId:t,row:n,items:r,focus:i,label:a,onEnter:o,onBack:s,onPick:c,onClose:l}){let u=(0,S.useRef)(null);return(0,S.useLayoutEffect)(()=>{let e=u.current;if(!e)return;I(e);let t=()=>{let t=n()?.getBoundingClientRect();t&&R(e,new DOMRect(t.left-4,t.top-4,t.width+8,t.height+8),`right`,`start`,4)};return t(),window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0),L(e)}},[]),(0,S.useEffect)(()=>{i&&P(N(u.current?.querySelector(`.ui-ctxc__list`)??null)[0])},[i]),(0,C.jsx)(`div`,{ref:u,id:e,className:`ui-ctxc__panel`,"data-sub":``,popover:`manual`,onPointerEnter:o,children:(0,C.jsx)(j,{id:t,items:r,label:a,onPick:c,onClose:l,onBack:s})})}var N=e=>e?[...e.querySelectorAll(`:scope > [role^="menuitem"]:not([aria-disabled="true"])`)]:[];function P(e){e&&(e.focus({preventScroll:!0}),e.scrollIntoView?.({block:`nearest`}))}var F=e=>window.setTimeout(()=>{let t=document.activeElement;e?.isConnected&&(!t||t===document.body)&&e.focus({preventScroll:!0})});function I(e){`showPopover`in e&&!e.matches(`:popover-open`)&&e.showPopover()}function L(e){`hidePopover`in e&&e.isConnected&&e.matches(`:popover-open`)&&e.hidePopover()}function R(e,t,n,r,i){let a=document.documentElement.clientWidth||window.innerWidth,o=window.innerHeight;e.style.maxHeight=``;let s=e.offsetWidth,c=e.offsetHeight,l={bottom:o-t.bottom-i-8,top:t.top-i-8,right:a-t.right-i-8,left:t.left-i-8},u={top:`bottom`,bottom:`top`,left:`right`,right:`left`},d=n,f=r,p,m,h=d===`top`||d===`bottom`;if(l[d]<(h?c:s)&&l[u[d]]>l[d]&&(d=u[d]),!h&&l[d]<s)d=`bottom`,p=t.bottom-2,m=Math.min(Math.max(8,t.left+16),a-8-s),e.style.maxHeight=`${Math.max(120,o-p-8)}px`;else if(d===`top`||d===`bottom`){let n=Math.min(c,Math.max(120,l[d]));p=d===`bottom`?t.bottom+i:t.top-i-n,m=f===`start`?t.left:t.right-s,f===`start`&&m+s>a-8&&t.right-s>=8?(f=`end`,m=t.right-s):f===`end`&&m<8&&t.left+s<=a-8&&(f=`start`,m=t.left),m=Math.min(Math.max(8,m),a-8-s),c>n&&(e.style.maxHeight=`${n}px`)}else m=d===`right`?t.right+i:t.left-i-s,p=f===`start`?t.top:t.bottom-c,p+c>o-8&&(p=Math.max(8,o-8-c)),p<8&&(p=8),c>o-16&&(e.style.maxHeight=`${o-16}px`);e.style.top=`${Math.round(p)}px`,e.style.left=`${Math.round(m)}px`,e.dataset.side=d,e.dataset.align=f}var z=e=>Array.isArray(e)&&e.length>0&&e.every(e=>Array.isArray(e)&&typeof e[0]==`string`);function B({icon:e}){return z(e)?(0,C.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,focusable:`false`,children:e.map(([e,{key:t,...n}],r)=>(0,S.createElement)(e,{...n,key:String(t??r)}))}):(0,C.jsx)(C.Fragment,{children:e})}function V(){return(0,C.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,C.jsx)(`path`,{d:`M9 6s6 4.42 6 6-6 6-6 6`})})}function H(){return(0,C.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,C.jsx)(`path`,{className:`ui-ctxc__tick`,d:`M5 14 8.5 17.5 19 6.5`,pathLength:1})})}var U=`
/* Colors and motion as variables – override them on .ui-ctxc (see Theming in the docs) */
.ui-ctxc {
  --ui-ctxc-surface: var(--aui-overlay, var(--aui-surface, #ffffff));
  --ui-ctxc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-ctxc-text: var(--aui-muted, rgba(0, 0, 0, 0.61));
  --ui-ctxc-icon: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-ctxc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.27));
  --ui-ctxc-line: var(--aui-border, rgba(0, 0, 0, 0.06));
  --ui-ctxc-glow: rgba(0, 0, 0, 0.035);
  --ui-ctxc-danger: var(--aui-red, #f04438);
  --ui-ctxc-danger-glow: color-mix(in srgb, var(--aui-red, #f04438) 8%, transparent);
  --ui-ctxc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.1)), 0 12px 32px -8px rgba(0, 0, 0, 0.16));
  --ui-ctxc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-ctxc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));
  --ui-ctxc-radius: calc(var(--aui-radius-lg, 10px) + 2px);
  --ui-ctxc-row-radius: calc(var(--aui-radius-sm, 5px) + 3px);
}

/* The menu: a white card in the top layer, a 0.5px edge and a soft drop */
.ui-ctxc__panel {
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
  border-radius: var(--ui-ctxc-radius);
  background: var(--ui-ctxc-surface);
  box-shadow: var(--ui-ctxc-shadow);
  color: var(--ui-ctxc-ink);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  text-align: start;
  overflow: visible;
  -webkit-font-smoothing: antialiased;
  transform-origin: top left;
  animation: ui-ctxc-in 220ms var(--ui-ctxc-ease) both;
}
.ui-ctxc__panel::backdrop { display: none; }
.ui-ctxc__panel[data-align="end"] { transform-origin: top right; }
.ui-ctxc__panel[data-side="top"] { transform-origin: bottom left; animation-name: ui-ctxc-in-up; }
.ui-ctxc__panel[data-side="top"][data-align="end"] { transform-origin: bottom right; }
.ui-ctxc__panel[data-side="right"] { transform-origin: top left; animation-name: ui-ctxc-in-side; animation-duration: 160ms; }
.ui-ctxc__panel[data-side="left"] { transform-origin: top right; animation-name: ui-ctxc-in-side; animation-duration: 160ms; }

.ui-ctxc__title { display: block; flex: none; padding: 6px 10px 4px; font-size: 12px; line-height: 16px; font-weight: 500; color: var(--ui-ctxc-faint); }

/* The rows; a long menu scrolls inside the card */
.ui-ctxc__list {
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
.ui-ctxc__list:focus { outline: none; }

/* One soft highlight that glides between the rows */
.ui-ctxc__glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: var(--ui-ctxc-row-radius);
  background: var(--ui-ctxc-glow);
  pointer-events: none;
  transition: transform 180ms var(--ui-ctxc-ease), height 180ms var(--ui-ctxc-ease), background-color 120ms ease;
}
.ui-ctxc__glow[data-danger] { background: var(--ui-ctxc-danger-glow); }

.ui-ctxc__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  box-sizing: border-box;
  min-width: 0;
  min-height: 32px;
  padding: 0 10px;
  border-radius: var(--ui-ctxc-row-radius);
  color: var(--ui-ctxc-text);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 120ms ease;
}
.ui-ctxc__item[data-rich] { min-height: 44px; padding: 6px 10px; }
.ui-ctxc__item:focus { outline: none; color: var(--ui-ctxc-ink); }
.ui-ctxc__item:focus-visible { outline: 2px solid var(--ui-ctxc-focus); outline-offset: -2px; }
/* The item whose submenu is open keeps a highlight while the focus is in the submenu */
.ui-ctxc__item[data-open] { color: var(--ui-ctxc-ink); }
.ui-ctxc__item[data-open]:not(:focus) { background: var(--ui-ctxc-glow); }
.ui-ctxc__item[aria-checked="true"] { color: var(--ui-ctxc-ink); font-weight: 500; }
.ui-ctxc__item[data-danger], .ui-ctxc__item[data-danger]:focus { color: var(--ui-ctxc-danger); }
.ui-ctxc__item[aria-disabled="true"] { color: var(--ui-ctxc-faint); cursor: default; }

.ui-ctxc__icon { display: grid; flex: none; place-items: center; width: 16px; height: 16px; color: var(--ui-ctxc-icon); transition: color 120ms ease; }
.ui-ctxc__icon > svg { display: block; width: 15px; height: 15px; }
.ui-ctxc__icon[data-logo] > svg, .ui-ctxc__icon[data-logo] > img { width: 14px; height: 14px; }
.ui-ctxc__item:focus .ui-ctxc__icon:not([data-logo]), .ui-ctxc__item[data-open] .ui-ctxc__icon:not([data-logo]) { color: var(--ui-ctxc-ink); }
.ui-ctxc__item[data-danger] .ui-ctxc__icon { color: var(--ui-ctxc-danger); }
.ui-ctxc__item[aria-disabled="true"] .ui-ctxc__icon { opacity: 0.5; color: var(--ui-ctxc-icon); }

/* Long names stay on one line – the full name on hover */
.ui-ctxc__label { display: grid; flex: 1; gap: 1px; min-width: 0; }
.ui-ctxc__text, .ui-ctxc__desc { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-ctxc__desc { font-size: 12px; line-height: 16px; font-weight: 400; color: var(--ui-ctxc-faint); }

.ui-ctxc__kbd { flex: none; padding-left: 16px; font: inherit; font-size: 12px; font-weight: 400; letter-spacing: 0.04em; color: var(--ui-ctxc-faint); }
.ui-ctxc__more, .ui-ctxc__check { display: grid; flex: none; place-items: center; width: 14px; height: 14px; }
.ui-ctxc__more { color: var(--ui-ctxc-faint); }
.ui-ctxc__check { color: var(--ui-ctxc-ink); }
.ui-ctxc__more > svg, .ui-ctxc__check > svg { display: block; width: 14px; height: 14px; }
.ui-ctxc__tick { stroke-dasharray: 1; animation: ui-ctxc-draw 280ms 40ms var(--ui-ctxc-ease) both; }

.ui-ctxc__sep { display: block; height: 1px; margin: 4px 6px; background: var(--ui-ctxc-line); }
.ui-ctxc__empty { display: block; padding: 6px 8px; color: var(--ui-ctxc-faint); }

@keyframes ui-ctxc-in { from { opacity: 0; transform: scale(0.96) translateY(-4px); } }
@keyframes ui-ctxc-in-up { from { opacity: 0; transform: scale(0.96) translateY(4px); } }
@keyframes ui-ctxc-in-side { from { opacity: 0; transform: scale(0.98); } }
@keyframes ui-ctxc-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }

/* Touch screens: rows a finger can hit */
@media (pointer: coarse) {
  .ui-ctxc__item { min-height: 40px; }
  .ui-ctxc__item[data-rich] { min-height: 48px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-ctxc__panel, .ui-ctxc__tick { animation-duration: 1ms; }
  .ui-ctxc__glow, .ui-ctxc__item, .ui-ctxc__icon { transition-duration: 1ms; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-ctxc {
  --ui-ctxc-surface: var(--aui-overlay, var(--aui-surface, #1b1b1e));
  --ui-ctxc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-ctxc-text: var(--aui-muted, rgba(255, 255, 255, 0.62));
  --ui-ctxc-icon: var(--aui-muted, rgba(255, 255, 255, 0.45));
  --ui-ctxc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.28));
  --ui-ctxc-line: var(--aui-border, rgba(255, 255, 255, 0.08));
  --ui-ctxc-glow: rgba(255, 255, 255, 0.06);
  --ui-ctxc-danger: var(--aui-red, #ff6b5f);
  --ui-ctxc-danger-glow: color-mix(in srgb, var(--aui-red, #ff6b5f) 14%, transparent);
  --ui-ctxc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.14)), 0 12px 32px -8px rgba(0, 0, 0, 0.6));
  --ui-ctxc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
  color-scheme: dark;
}
`,W=[{id:`export`,name:`export.ts`,kind:`code`,size:3180,at:5,when:`2m ago`,folder:`Agents`},{id:`report`,name:`cost-report-w45.csv`,kind:`csv`,size:48200,at:4,when:`14m ago`,folder:`Evals`},{id:`summary`,name:`Support tickets – weekly summary.pdf`,kind:`pdf`,size:412e3,at:3,when:`1h ago`,folder:`Agents`},{id:`chart`,name:`latency-by-model.png`,kind:`image`,size:96400,at:2,when:`Yesterday`,folder:`Experiments`}],G={code:{icon:p,color:`#0190FE`},csv:{icon:c,color:`#5FC88A`},pdf:{icon:g,color:`#F28A2E`},image:{icon:h,color:`#A651F0`}},K=[{id:`newest`,label:`Newest`,icon:o,by:(e,t)=>t.at-e.at},{id:`name`,label:`Name`,icon:a,by:(e,t)=>e.name.localeCompare(t.name)},{id:`size`,label:`Size`,icon:l,by:(e,t)=>t.size-e.size}],q=[{name:`Evals`,icon:v},{name:`Agents`,icon:m},{name:`Experiments`,icon:y},{name:`Archive`,icon:i}],J=e=>e>=1e6?`${(e/1e6).toFixed(1)} MB`:e>=1e3?`${Math.round(e/1e3)} KB`:`${e} B`;function Y(){let e=(0,S.useRef)(null),[t,i]=(0,S.useState)(`newest`),[a,o]=(0,S.useState)({summary:!0}),[c,l]=(0,S.useState)(()=>Object.fromEntries(W.map(e=>[e.id,e.folder]))),[p,h]=(0,S.useState)(null),[g,v]=(0,S.useState)(`Right-click a file or the space below – or Shift F10 on a file`);(0,S.useEffect)(()=>{let t=e.current;if(!t||t.closest(`.card__preview`)||matchMedia(`(pointer: coarse), (max-width: 640px)`).matches)return;let n=requestAnimationFrame(()=>{n=requestAnimationFrame(()=>{let e=t.querySelectorAll(`[data-file]`)[1],r=e?.getBoundingClientRect();e&&r&&(e.dispatchEvent(new MouseEvent(`contextmenu`,{bubbles:!0,cancelable:!0,clientX:r.left+r.width*.42,clientY:r.top+r.height/2+6})),n=requestAnimationFrame(()=>{let e=document.activeElement;e?.closest(`[class*="ui-ctx"]`)&&e.blur()}))})});return()=>cancelAnimationFrame(n)},[]);let y=K.find(e=>e.id===t)??K[0],w=[...W].sort((e,t)=>Number(!!a[t.id])-Number(!!a[e.id])||y.by(e,t)),T=e=>[{label:`Open`,icon:x,shortcut:`⌘O`,onSelect:()=>v(`Opened ${e.name}`)},{label:`Download`,icon:d,onSelect:()=>v(`Downloading ${e.name}`)},{label:`Copy link`,icon:r,shortcut:`⌘L`,onSelect:()=>v(`Link copied`)},{label:`Duplicate`,icon:s,shortcut:`⌘D`,onSelect:()=>v(`${e.name} duplicated`)},{label:`Move to`,icon:m,divider:!0,submenu:q.map(t=>({label:t.name,icon:t.icon,checked:c[e.id]===t.name,onSelect:()=>{l(n=>({...n,[e.id]:t.name})),v(`${e.name} moved to ${t.name}`)}}))},{label:`Pin to top`,icon:_,type:`checkbox`,checked:!!a[e.id],onSelect:()=>o(t=>({...t,[e.id]:!t[e.id]}))},{label:`Delete file`,icon:u,danger:!0,divider:!0,onSelect:()=>v(`${e.name} would be deleted – kept for the demo`)}],E=[{label:`New file`,icon:f,shortcut:`⌘N`,onSelect:()=>v(`A new file would be created – kept for the demo`)},{label:`Upload…`,icon:b,onSelect:()=>v(`Upload – kept for the demo`)},{label:`Sort by`,icon:y.icon,divider:!0,submenu:K.map(e=>({label:e.label,icon:e.icon,checked:e.id===t,onSelect:()=>i(e.id)}))}];return(0,C.jsx)(`div`,{ref:e,className:`ctx-demo`,children:(0,C.jsxs)(`section`,{className:`ctx-demo__card`,"aria-label":`Run files`,children:[(0,C.jsxs)(`header`,{className:`ctx-demo__head`,children:[(0,C.jsx)(`h3`,{className:`ctx-demo__title`,children:`Files`}),(0,C.jsx)(`span`,{className:`ctx-demo__count`,children:W.length})]}),(0,C.jsx)(k,{"aria-label":`File actions`,items:e=>{let t=e.closest(`[data-file]`)?.dataset.file,n=W.find(e=>e.id===t);return n?T(n):E},onOpenChange:(e,t)=>{let n=t?.closest(`[data-file]`)?.dataset.file;e&&h(n??null)},children:(0,C.jsx)(`div`,{className:`ctx-demo__area`,children:(0,C.jsx)(`ul`,{className:`ctx-demo__rows`,children:w.map(e=>(0,C.jsx)(`li`,{children:(0,C.jsxs)(`button`,{type:`button`,className:`ctx-demo__row`,"data-file":e.id,"aria-pressed":p===e.id,onClick:()=>h(e.id),onDoubleClick:()=>v(`Opened ${e.name}`),children:[(0,C.jsx)(`span`,{className:`ctx-demo__glyph`,style:{color:G[e.kind].color},"aria-hidden":`true`,children:(0,C.jsx)(n,{icon:G[e.kind].icon,size:16,strokeWidth:1.5})}),(0,C.jsxs)(`span`,{className:`ctx-demo__text`,children:[(0,C.jsxs)(`span`,{className:`ctx-demo__name`,children:[(0,C.jsx)(`span`,{className:`ctx-demo__label`,children:e.name}),a[e.id]&&(0,C.jsx)(n,{className:`ctx-demo__pin`,icon:_,size:12,strokeWidth:1.8,"aria-label":`Pinned`})]}),(0,C.jsxs)(`span`,{className:`ctx-demo__meta`,children:[c[e.id],` · `,J(e.size),` · `,e.when]})]})]})},e.id))})})}),(0,C.jsx)(`p`,{className:`ctx-demo__note`,"aria-live":`polite`,children:g})]})})}export{Y as default};