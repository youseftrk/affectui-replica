// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as f from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const p = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/Copy01Icon-DrPxamgF";
import{t as r}from"./_deps/FilterHorizontalIcon-BD-jVvJt";
import{t as i}from"./_deps/MoreHorizontalIcon-CBUy2huH";
import{t as a}from"./_deps/PinIcon-B5iNHNfk";
import{t as o}from"./_deps/RefreshIcon-C_kyWUfS";
import{t as s}from"./_deps/Search01Icon-uevAzKav";
import{t as c}from"./_deps/Share08Icon-DusrLy2E";
import{t as l}from"./_deps/ThumbsUpIcon-B82gm2BX";
import{t as u}from"./_deps/Tick02Icon-BZZvPScA";
import{t as d}from"./_deps/component.clean-2u58lF6m";
var m=300,h=120,g={current:null,warmUntil:0};function _({content:e,shortcut:t,children:n,side:r=`top`,align:i=`center`,offset:a=6,delay:o=500,disabled:s,open:c,onOpenChange:l,className:u}){let d=(0,f.useId)(),_=`${d}-tip`,S=`${d}-keys`,C=(0,f.useRef)(null),w=(0,f.useRef)(null),T=(0,f.useRef)(0),E=(0,f.useRef)(!1),[D,O]=(0,f.useState)(!1),[k,A]=(0,f.useState)(!1),[j,M]=(0,f.useState)(!1),N=e==null||typeof e==`boolean`||e===``,P=!s&&!N&&(c??D),F=(0,f.useRef)(()=>{});F.current=e=>{window.clearTimeout(T.current),c===void 0&&O(e),e!==P&&l?.(e)};let I=(0,f.useRef)({close:()=>F.current(!1)}),L=e=>{window.clearTimeout(T.current);let t=C.current;if(s||N||E.current||!t||t.getAttribute(`aria-expanded`)===`true`)return;let n=g.current&&g.current!==I.current||Date.now()<g.warmUntil;e||n?(A(!!n),F.current(!0)):T.current=window.setTimeout(()=>{A(!1),F.current(!0)},Math.max(0,o))},R=(e=!1)=>{window.clearTimeout(T.current),e?T.current=window.setTimeout(()=>F.current(!1),h):F.current(!1)};if((0,f.useEffect)(()=>{if(!P)return;let t=I.current;g.current&&g.current!==t&&g.current.close(),g.current=t;let n=C.current,r=(n?.getAttribute(`aria-label`)||n?.textContent||``).trim();return M(typeof e==`string`&&e.trim()===r),()=>{g.current===t&&(g.current=null,g.warmUntil=Date.now()+m)}},[P]),(0,f.useEffect)(()=>()=>window.clearTimeout(T.current),[]),(0,f.useLayoutEffect)(()=>{let e=w.current;if(!P||!e)return;v(e);let t=()=>{let t=C.current;t&&b(e,t,r,i,a)};t(),window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0);let n=typeof ResizeObserver>`u`?null:new ResizeObserver(t);return n?.observe(e),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0),n?.disconnect(),y(e)}},[P,r,i,a]),(0,f.useEffect)(()=>{if(!P)return;let e=e=>{e.key!==`Escape`||e.defaultPrevented||(e.preventDefault(),e.stopPropagation(),E.current=!0,F.current(!1))};return window.addEventListener(`keydown`,e,!0),()=>window.removeEventListener(`keydown`,e,!0)},[P]),!(0,f.isValidElement)(n))return(0,p.jsx)(p.Fragment,{children:n});let z=n.props,B=(e,t)=>z[e]?.(t),V=(e,t)=>n=>{B(e,n),n.defaultPrevented||t(n)},H=[z[`aria-describedby`],P&&(j?t?S:null:_)].filter(Boolean).join(` `)||void 0,U=(0,f.cloneElement)(n,{ref:e=>{C.current=e;let t=z.ref;typeof t==`function`?t(e):t&&(t.current=e)},"aria-describedby":H,onPointerEnter:V(`onPointerEnter`,e=>{e.pointerType!==`touch`&&L(!1)}),onPointerLeave:V(`onPointerLeave`,e=>{E.current=!1,e.pointerType!==`touch`&&R(!0)}),onPointerDown:V(`onPointerDown`,()=>{E.current=!0,R()}),onClick:V(`onClick`,()=>{E.current=!0,R()}),onFocus:V(`onFocus`,e=>{let t=!0;try{t=e.currentTarget.matches(`:focus-visible`)}catch{}t&&L(!0)}),onBlur:V(`onBlur`,()=>{E.current=!1,R()})});return(0,p.jsxs)(p.Fragment,{children:[U,P&&(0,p.jsxs)(`span`,{ref:w,id:_,role:`tooltip`,className:[`ui-tipc`,u].filter(Boolean).join(` `),popover:`manual`,"data-side":r,"data-instant":k||void 0,onPointerEnter:()=>window.clearTimeout(T.current),onPointerLeave:()=>R(!0),children:[(0,p.jsx)(`style`,{href:`ui-tooltip-clean`,precedence:`default`,children:x}),(0,p.jsx)(`span`,{className:`ui-tipc__text`,dir:`auto`,children:e}),t&&(0,p.jsx)(`kbd`,{className:`ui-tipc__keys`,id:S,children:t})]})]})}function v(e){`showPopover`in e&&!e.matches(`:popover-open`)&&e.showPopover()}function y(e){`hidePopover`in e&&e.isConnected&&e.matches(`:popover-open`)&&e.hidePopover()}function b(e,t,n,r,i){let a=t.getBoundingClientRect(),o=document.documentElement.clientWidth||window.innerWidth,s=window.innerHeight,c=e.offsetWidth,l=e.offsetHeight,u={bottom:s-a.bottom-i-8,top:a.top-i-8,right:o-a.right-i-8,left:a.left-i-8},d={top:`bottom`,bottom:`top`,left:`right`,right:`left`},f=n;u[f]<(f===`top`||f===`bottom`?l:c)&&u[d[f]]>u[f]&&(f=d[f]),(f===`left`||f===`right`)&&u[f]<c&&(f=u.top>=l||u.top>=u.bottom?`top`:`bottom`);let p=getComputedStyle(t).direction===`rtl`,m=(f===`top`||f===`bottom`)&&p&&r!==`center`?r===`start`?`end`:`start`:r,h,g;f===`top`||f===`bottom`?(h=f===`bottom`?a.bottom+i:a.top-i-l,g=m===`start`?a.left:m===`end`?a.right-c:a.left+a.width/2-c/2,g=Math.min(Math.max(8,g),o-8-c)):(g=f===`right`?a.right+i:a.left-i-c,h=m===`start`?a.top:m===`end`?a.bottom-l:a.top+a.height/2-l/2,h=Math.min(Math.max(8,h),Math.max(8,s-8-l))),e.style.top=`${Math.round(h)}px`,e.style.left=`${Math.round(g)}px`,e.dataset.side=f}var x=`
/* Colors and motion as variables – override them on .ui-tipc (see Theming in the docs) */
.ui-tipc {
  --ui-tipc-bg: rgba(24, 24, 27, 0.92);
  --ui-tipc-ink: #fcfcfc;
  --ui-tipc-muted: rgba(255, 255, 255, 0.6);
  --ui-tipc-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.24);
  --ui-tipc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));

  /* A small dark label in the top layer – it fits its text and wraps at 240px */
  position: fixed;
  inset: auto;
  z-index: 1001;
  display: flex;
  align-items: baseline;
  gap: 6px;
  box-sizing: border-box;
  width: max-content;
  max-width: min(240px, calc(100vw - 16px));
  margin: 0;
  padding: 4px 8px;
  border: 0;
  border-radius: var(--aui-radius, 6px);
  background: var(--ui-tipc-bg);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  box-shadow: var(--ui-tipc-shadow);
  color: var(--ui-tipc-ink);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  text-align: start;
  white-space: normal;
  overflow: visible;
  -webkit-font-smoothing: antialiased;
  animation: ui-tipc-in 140ms var(--ui-tipc-ease) both;
}
.ui-tipc::backdrop { display: none; }
.ui-tipc__text { min-width: 0; overflow-wrap: anywhere; }
/* The shortcut: quieter, never broken across lines */
.ui-tipc__keys {
  flex: none;
  margin: 0;
  font: inherit;
  font-feature-settings: "tnum";
  letter-spacing: 0.02em;
  color: var(--ui-tipc-muted);
  white-space: nowrap;
}

/* It drifts in 2px from the trigger's side; a neighbour in the skip-delay window shows at once */
.ui-tipc[data-side="bottom"] { animation-name: ui-tipc-in-down; }
.ui-tipc[data-side="left"] { animation-name: ui-tipc-in-left; }
.ui-tipc[data-side="right"] { animation-name: ui-tipc-in-right; }
.ui-tipc[data-instant] { animation: none; }
@keyframes ui-tipc-in { from { opacity: 0; transform: translateY(2px); } }
@keyframes ui-tipc-in-down { from { opacity: 0; transform: translateY(-2px); } }
@keyframes ui-tipc-in-left { from { opacity: 0; transform: translateX(2px); } }
@keyframes ui-tipc-in-right { from { opacity: 0; transform: translateX(-2px); } }

/* Touch screens (a tablet with a mouse or pen): a little larger type */
@media (pointer: coarse) {
  .ui-tipc { padding: 5px 9px; font-size: 13px; line-height: 18px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-tipc { animation: none; }
}

/* Dark mode: a light label – follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tipc {
  --ui-tipc-bg: rgba(250, 250, 250, 0.94);
  --ui-tipc-ink: #111113;
  --ui-tipc-muted: rgba(0, 0, 0, 0.5);
  --ui-tipc-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.6);
  color-scheme: dark;
}
`,S=`Summarise last week's support tickets and draft replies for the billing team`;function C(){let e=(0,f.useRef)(null),[t,m]=(0,f.useState)(!1),[h,g]=(0,f.useState)(!0),[v,y]=(0,f.useState)(!1),[b,x]=(0,f.useState)(!0);return(0,f.useLayoutEffect)(()=>{e.current?.closest(`.card__preview`)&&x(!1)},[]),(0,f.useEffect)(()=>{if(!v)return;let e=setTimeout(()=>y(!1),1600);return()=>clearTimeout(e)},[v]),(0,p.jsx)(`div`,{ref:e,className:`tip-demo`,children:(0,p.jsxs)(`section`,{className:`tip-demo__card`,"aria-label":`Run`,children:[(0,p.jsxs)(`div`,{className:`tip-demo__head`,children:[(0,p.jsx)(_,{content:S,side:`bottom`,align:`start`,children:(0,p.jsx)(`button`,{type:`button`,className:`tip-demo__title`,children:S})}),(0,p.jsxs)(`div`,{className:`tip-demo__tools`,role:`group`,"aria-label":`Run tools`,children:[(0,p.jsx)(_,{content:`Search runs`,shortcut:`⌘K`,side:`bottom`,open:b||void 0,onOpenChange:e=>!e&&x(!1),children:(0,p.jsx)(d,{variant:`secondary`,icon:s,label:`Search runs`,title:``})}),(0,p.jsx)(_,{content:`Filter`,shortcut:`F`,side:`bottom`,children:(0,p.jsx)(d,{variant:`secondary`,icon:r,label:`Filter`,title:``})}),(0,p.jsx)(_,{content:`Pin run`,shortcut:`P`,side:`bottom`,children:(0,p.jsx)(d,{variant:`secondary`,icon:a,label:`Pin run`,title:``,pressed:t,onClick:()=>m(e=>!e)})}),(0,p.jsx)(_,{content:`Share`,shortcut:`⇧⌘S`,side:`bottom`,children:(0,p.jsx)(d,{variant:`secondary`,icon:c,label:`Share`,title:``})})]})]}),(0,p.jsxs)(`div`,{className:`tip-demo__reply`,children:[(0,p.jsx)(`p`,{className:`tip-demo__text`,children:`Summarised 14 support tickets – three mention the export timeout, so I drafted a reply and opened a fix in billing-api.`}),(0,p.jsxs)(`div`,{className:`tip-demo__actions`,role:`group`,"aria-label":`Reply actions`,children:[(0,p.jsx)(_,{content:v?`Copied`:`Copy`,shortcut:`⌘C`,children:(0,p.jsx)(d,{size:`sm`,icon:v?u:n,label:v?`Copied`:`Copy`,title:``,onClick:()=>y(!0)})}),(0,p.jsx)(_,{content:`Good answer – the agent keeps this reply as an example for similar tickets`,children:(0,p.jsx)(d,{size:`sm`,icon:l,label:`Good answer`,title:``,pressed:h,onClick:()=>g(e=>!e)})}),(0,p.jsx)(_,{content:`Regenerate`,shortcut:`⌘R`,children:(0,p.jsx)(d,{size:`sm`,icon:o,label:`Regenerate`,title:``})}),(0,p.jsx)(_,{content:`More`,children:(0,p.jsx)(d,{size:`sm`,icon:i,label:`More`,title:``})})]})]})]})})}export{C as default};