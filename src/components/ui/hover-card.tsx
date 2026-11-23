// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as o from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const s = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/HugeiconsIcon-C2cDExRS";
import{t as r}from"./_deps/ArrowUpRight01Icon-C9pA22LI";
import{t as i}from"./_deps/Csv01Icon-Ds3OtOdC";
import{t as a}from"./_deps/FileScriptIcon-CATW1Dzd";
var c={current:null};function l({content:e,children:t,side:n=`bottom`,align:r=`start`,offset:i=8,openDelay:a=600,closeDelay:l=300,width:g,disabled:_,open:v,onOpenChange:y,className:b}){let x=(0,o.useRef)(null),S=(0,o.useRef)(null),C=(0,o.useRef)(0),w=(0,o.useRef)(null),T=(0,o.useRef)(!1),[E,D]=(0,o.useState)(!1),O=e==null||typeof e==`boolean`||e===``,k=!_&&!O&&(v??E),A=(0,o.useRef)(k);A.current=k;let j=(0,o.useRef)(()=>{});j.current=e=>{window.clearTimeout(C.current),w.current=null,v===void 0&&D(e),e!==A.current&&y?.(e)};let M=(0,o.useRef)({close:()=>j.current(!1)}),N=()=>{window.clearTimeout(C.current),!(_||O||T.current||A.current)&&(C.current=window.setTimeout(()=>j.current(!0),Math.max(0,a)))},P=()=>{window.clearTimeout(C.current),A.current&&(C.current=window.setTimeout(()=>j.current(!1),Math.max(0,l)))},F=()=>{window.clearTimeout(C.current),w.current=null};if((0,o.useEffect)(()=>{if(!k)return;let e=M.current;return c.current&&c.current!==e&&c.current.close(),c.current=e,()=>{c.current===e&&(c.current=null)}},[k]),(0,o.useEffect)(()=>()=>window.clearTimeout(C.current),[]),(0,o.useLayoutEffect)(()=>{let e=S.current;if(!k||!e)return;f(e);let t=()=>x.current&&m(e,x.current,n,r,i);t(),window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0);let a=typeof ResizeObserver>`u`?null:new ResizeObserver(t);return a?.observe(e),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0),a?.disconnect(),p(e)}},[k,n,r,i]),(0,o.useEffect)(()=>{if(!k)return;let e=e=>{if(e.key!==`Escape`||e.defaultPrevented)return;e.preventDefault(),e.stopPropagation(),T.current=!0;let t=S.current?.contains(document.activeElement);j.current(!1),t&&x.current?.focus({preventScroll:!0})},t=e=>{let t=w.current;t&&e.pointerType!==`touch`&&(d(t,e.clientX,e.clientY)||(w.current=null,P()))},n=e=>{let t=e.target;!S.current?.contains(t)&&!x.current?.contains(t)&&j.current(!1)};return window.addEventListener(`keydown`,e,!0),document.addEventListener(`pointermove`,t),document.addEventListener(`pointerdown`,n,!0),()=>{window.removeEventListener(`keydown`,e,!0),document.removeEventListener(`pointermove`,t),document.removeEventListener(`pointerdown`,n,!0)}},[k]),!(0,o.isValidElement)(t))return(0,s.jsx)(s.Fragment,{children:t});let I=t.props,L=(e,t)=>I[e]?.(t),R=(e,t)=>n=>{L(e,n),n.defaultPrevented||t(n)},z=(e,t)=>{if(T.current=!1,e.pointerType===`touch`)return;let n=S.current?.getBoundingClientRect(),r=e.relatedTarget;if(r instanceof Node&&(S.current?.contains(r)||x.current?.contains(r)))return F();if(t&&A.current&&n&&(w.current=u([{x:e.clientX,y:e.clientY},{x:n.left,y:n.top},{x:n.right,y:n.top},{x:n.right,y:n.bottom},{x:n.left,y:n.bottom}]),d(w.current,e.clientX,e.clientY)))return window.clearTimeout(C.current);w.current=null,A.current?P():window.clearTimeout(C.current)},B=(0,o.cloneElement)(t,{ref:e=>{x.current=e;let t=I.ref;typeof t==`function`?t(e):t&&(t.current=e)},onPointerEnter:R(`onPointerEnter`,e=>{e.pointerType!==`touch`&&(A.current?F():N())}),onPointerLeave:R(`onPointerLeave`,e=>z(e,!0)),onPointerDown:R(`onPointerDown`,()=>{T.current=!0,j.current(!1)}),onFocus:R(`onFocus`,e=>{let t=!0;try{t=e.currentTarget.matches(`:focus-visible`)}catch{}t&&N()}),onBlur:R(`onBlur`,e=>{T.current=!1,!(e.relatedTarget instanceof Node&&S.current?.contains(e.relatedTarget))&&(A.current?j.current(!1):window.clearTimeout(C.current))})});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`style`,{href:`ui-hover-card-clean`,precedence:`default`,children:h}),B,k&&(0,s.jsx)(`div`,{ref:S,className:[`ui-hvcc`,b].filter(Boolean).join(` `),popover:`manual`,"data-side":n,"data-align":r,style:g==null?void 0:{width:g,maxWidth:`calc(100vw - 16px)`},onPointerEnter:e=>e.pointerType!==`touch`&&F(),onPointerLeave:e=>z(e,!1),onBlur:e=>{let t=e.relatedTarget;t instanceof Node&&(S.current?.contains(t)||x.current?.contains(t))||j.current(!1)},children:e})]})}function u(e){let t=[...e].sort((e,t)=>e.x-t.x||e.y-t.y),n=(e,t,n)=>(t.x-e.x)*(n.y-e.y)-(t.y-e.y)*(n.x-e.x),r=[];for(let e of t){for(;r.length>=2&&n(r[r.length-2],r[r.length-1],e)<=0;)r.pop();r.push(e)}let i=[];for(let e of[...t].reverse()){for(;i.length>=2&&n(i[i.length-2],i[i.length-1],e)<=0;)i.pop();i.push(e)}return r.slice(0,-1).concat(i.slice(0,-1))}function d(e,t,n){if(e.length<3)return!1;for(let r=0;r<e.length;r++){let i=e[r],a=e[(r+1)%e.length],o=Math.hypot(a.x-i.x,a.y-i.y)||1;if(((a.x-i.x)*(n-i.y)-(a.y-i.y)*(t-i.x))/o<-4)return!1}return!0}function f(e){`showPopover`in e&&!e.matches(`:popover-open`)&&e.showPopover()}function p(e){`hidePopover`in e&&e.isConnected&&e.matches(`:popover-open`)&&e.hidePopover()}function m(e,t,n,r,i){let a=t.getBoundingClientRect(),o=document.documentElement.clientWidth||window.innerWidth,s=window.innerHeight;e.style.maxHeight=``;let c=e.offsetWidth,l=e.offsetHeight,u={bottom:s-a.bottom-i-8,top:a.top-i-8,right:o-a.right-i-8,left:a.left-i-8},d={top:`bottom`,bottom:`top`,left:`right`,right:`left`},f=n;u[f]<(f===`top`||f===`bottom`?l:c)&&u[d[f]]>u[f]&&(f=d[f]),(f===`left`||f===`right`)&&u[f]<c&&(f=u.bottom>=u.top?`bottom`:`top`);let p=getComputedStyle(t).direction===`rtl`,m=(f===`top`||f===`bottom`)&&p&&r!==`center`?r===`start`?`end`:`start`:r,h,g;if(f===`top`||f===`bottom`){let t=Math.min(l,Math.max(120,u[f]));h=f===`bottom`?a.bottom+i:a.top-i-t,g=m===`start`?a.left:m===`end`?a.right-c:a.left+a.width/2-c/2,m===`start`&&g+c>o-8&&a.right-c>=8?(m=`end`,g=a.right-c):m===`end`&&g<8&&a.left+c<=o-8&&(m=`start`,g=a.left),g=Math.min(Math.max(8,g),o-8-c),l>t&&(e.style.maxHeight=`${t}px`)}else g=f===`right`?a.right+i:a.left-i-c,h=m===`start`?a.top:m===`end`?a.bottom-l:a.top+a.height/2-l/2,h=Math.min(Math.max(8,h),Math.max(8,s-8-l)),l>s-16&&(e.style.maxHeight=`${s-16}px`);e.style.top=`${Math.round(h)}px`,e.style.left=`${Math.round(g)}px`,e.dataset.side=f,e.dataset.align=m}var h=`
/* Colors and motion as variables – override them on .ui-hvcc (see Theming in the docs) */
.ui-hvcc {
  --ui-hvcc-surface: var(--aui-overlay, var(--aui-surface, #ffffff));
  --ui-hvcc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-hvcc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.1)), 0 12px 32px -8px rgba(0, 0, 0, 0.16));
  --ui-hvcc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-hvcc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));

  /* A white card in the top layer: a 0.5px edge and a soft drop. It fits its content up to 320px; width lifts the cap */
  position: fixed;
  inset: auto;
  z-index: 1000;
  display: block;
  box-sizing: border-box;
  width: max-content;
  max-width: min(320px, calc(100vw - 16px));
  max-height: calc(100vh - 16px);
  margin: 0;
  padding: 14px;
  border: 0;
  border-radius: calc(var(--aui-radius-lg, 10px) + 2px);
  background: var(--ui-hvcc-surface);
  box-shadow: var(--ui-hvcc-shadow);
  color: var(--ui-hvcc-ink);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  text-align: start;
  overflow: auto;
  overflow-wrap: anywhere;
  overscroll-behavior: contain;
  -webkit-font-smoothing: antialiased;
  transform-origin: top left;
  animation: ui-hvcc-in 200ms var(--ui-hvcc-ease) both;
}
.ui-hvcc::backdrop { display: none; }
.ui-hvcc *, .ui-hvcc *::before, .ui-hvcc *::after { box-sizing: border-box; }
/* Links and buttons you put inside get the library's ring */
.ui-hvcc :is(a, button, [tabindex]):focus-visible { outline: 2px solid var(--ui-hvcc-focus); outline-offset: 2px; }

/* It grows out of the side and edge it is attached to */
.ui-hvcc[data-align="end"] { transform-origin: top right; }
.ui-hvcc[data-align="center"] { transform-origin: top center; }
.ui-hvcc[data-side="top"] { transform-origin: bottom left; animation-name: ui-hvcc-in-up; }
.ui-hvcc[data-side="top"][data-align="end"] { transform-origin: bottom right; }
.ui-hvcc[data-side="top"][data-align="center"] { transform-origin: bottom center; }
.ui-hvcc[data-side="right"] { transform-origin: top left; animation-name: ui-hvcc-in-right; }
.ui-hvcc[data-side="right"][data-align="end"] { transform-origin: bottom left; }
.ui-hvcc[data-side="right"][data-align="center"] { transform-origin: center left; }
.ui-hvcc[data-side="left"] { transform-origin: top right; animation-name: ui-hvcc-in-left; }
.ui-hvcc[data-side="left"][data-align="end"] { transform-origin: bottom right; }
.ui-hvcc[data-side="left"][data-align="center"] { transform-origin: center right; }

@keyframes ui-hvcc-in { from { opacity: 0; transform: scale(0.97) translateY(-4px); } }
@keyframes ui-hvcc-in-up { from { opacity: 0; transform: scale(0.97) translateY(4px); } }
@keyframes ui-hvcc-in-right { from { opacity: 0; transform: scale(0.97) translateX(-4px); } }
@keyframes ui-hvcc-in-left { from { opacity: 0; transform: scale(0.97) translateX(4px); } }

/* Touch screens with a mouse or pen (a tablet): 15px text, so it reads like the rest of the UI there */
@media (pointer: coarse) {
  .ui-hvcc { padding: 16px; font-size: 15px; line-height: 22px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-hvcc { animation: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-hvcc {
  --ui-hvcc-surface: var(--aui-overlay, var(--aui-surface, #1b1b1e));
  --ui-hvcc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-hvcc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.14)), 0 12px 32px -8px rgba(0, 0, 0, 0.6));
  --ui-hvcc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
  color-scheme: dark;
}
`,g={scout:{id:`scout`,name:`Scout`,role:`Research agent`,model:`claude-sonnet-4.5`,about:`Reads new issues, finds the cause and drafts a fix for the billing team.`,busy:!0,status:`Running · 2/3 tasks`,runs:41,cost:`$12.40`},ledger:{id:`ledger`,name:`Ledger`,role:`Finance agent`,model:`gpt-5-mini`,about:`Sums up spend per model and team every Monday and flags anything unusual.`,busy:!1,status:`Idle · last run 14m ago`,runs:9,cost:`$1.85`}},_={export:{id:`export`,name:`export.ts`,path:`billing-api/src/export.ts`,kind:`code`,size:`3.1 KB`,change:`+42 −7`,by:`Scout`},report:{id:`report`,name:`cost-report-w45.csv`,path:`finance/reports/cost-report-w45.csv`,kind:`csv`,size:`48 KB`,change:`1,284 rows`,by:`Ledger`}},v=[0,120,240,120,240,360,240,360,480],y=e=>{let t=0;for(let n of e)t=t*31+n.charCodeAt(0)>>>0;for(let e=0;e<64;e++){let n=t>>e%26&63,r=[0,1,2].flatMap(e=>{let t=n>>e*2&1;return[t,n>>e*2+1&1,t]});if(r.filter(Boolean).length>=5)return r;t=t*1103515245+12345>>>0}return[1,0,1,0,1,0,1,0,1]};function b({id:e,busy:t}){return(0,s.jsx)(`span`,{className:`hvc-demo__mark`,"data-busy":t||void 0,"aria-hidden":`true`,children:y(e).map((e,t)=>(0,s.jsx)(`i`,{"data-on":e?``:void 0,style:{animationDelay:`${v[t]}ms`}},t))})}var x=e=>e.preventDefault();function S({agent:e}){return(0,s.jsxs)(`div`,{className:`hvc-demo__preview`,children:[(0,s.jsxs)(`div`,{className:`hvc-demo__who`,children:[(0,s.jsx)(`span`,{className:`hvc-demo__tile`,children:(0,s.jsx)(b,{id:e.id,busy:e.busy})}),(0,s.jsxs)(`span`,{className:`hvc-demo__names`,children:[(0,s.jsx)(`span`,{className:`hvc-demo__name`,children:e.name}),(0,s.jsxs)(`span`,{className:`hvc-demo__sub`,children:[e.role,` · `,e.model]})]})]}),(0,s.jsx)(`p`,{className:`hvc-demo__about`,children:e.about}),(0,s.jsxs)(`dl`,{className:`hvc-demo__facts`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`dt`,{children:`Status`}),(0,s.jsx)(`dd`,{children:e.status})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`dt`,{children:`This week`}),(0,s.jsxs)(`dd`,{children:[e.runs,` runs · `,e.cost]})]})]}),(0,s.jsxs)(`a`,{className:`hvc-demo__open`,href:`#agents/${e.id}`,onClick:x,children:[`Open agent`,(0,s.jsx)(n,{icon:r,size:14,strokeWidth:1.8})]})]})}function C({file:e}){return(0,s.jsxs)(`div`,{className:`hvc-demo__preview`,children:[(0,s.jsxs)(`div`,{className:`hvc-demo__who`,children:[(0,s.jsx)(`span`,{className:`hvc-demo__tile`,"data-kind":e.kind,children:(0,s.jsx)(n,{icon:e.kind===`code`?a:i,size:16,strokeWidth:1.5})}),(0,s.jsxs)(`span`,{className:`hvc-demo__names`,children:[(0,s.jsx)(`span`,{className:`hvc-demo__name`,children:e.name}),(0,s.jsx)(`span`,{className:`hvc-demo__sub`,children:e.path})]})]}),(0,s.jsxs)(`p`,{className:`hvc-demo__line`,children:[e.change,` · `,e.size,` · by `,e.by]})]})}function w({id:e,open:t,onOpenChange:n}){let r=g[e];return(0,s.jsx)(l,{content:(0,s.jsx)(S,{agent:r}),width:288,open:t,onOpenChange:n,children:(0,s.jsx)(`a`,{className:`hvc-demo__link`,href:`#agents/${e}`,onClick:x,children:r.name})})}function T({id:e}){let t=_[e];return(0,s.jsx)(l,{content:(0,s.jsx)(C,{file:t}),width:288,children:(0,s.jsx)(`a`,{className:`hvc-demo__link hvc-demo__link--file`,href:`#files/${e}`,onClick:x,children:t.name})})}function E({agent:e,when:t,children:n}){return(0,s.jsxs)(`li`,{className:`hvc-demo__entry`,children:[(0,s.jsx)(b,{id:e,busy:g[e].busy}),(0,s.jsx)(`div`,{className:`hvc-demo__text`,children:n}),(0,s.jsx)(`span`,{className:`hvc-demo__when`,children:t})]})}function D(){let e=(0,o.useRef)(null),[t,n]=(0,o.useState)(!0);return(0,o.useLayoutEffect)(()=>{e.current?.closest(`.card__preview`)&&n(!1)},[]),(0,s.jsx)(`div`,{ref:e,className:`hvc-demo`,children:(0,s.jsxs)(`section`,{className:`hvc-demo__card`,"aria-label":`Activity`,children:[(0,s.jsx)(`header`,{className:`hvc-demo__head`,children:(0,s.jsx)(`h3`,{className:`hvc-demo__title`,children:`Activity`})}),(0,s.jsxs)(`ul`,{className:`hvc-demo__feed`,children:[(0,s.jsxs)(E,{agent:`scout`,when:`2m`,children:[(0,s.jsx)(w,{id:`scout`,open:t||void 0,onOpenChange:e=>!e&&n(!1)}),` opened a fix for `,(0,s.jsx)(T,{id:`export`})]}),(0,s.jsxs)(E,{agent:`ledger`,when:`14m`,children:[(0,s.jsx)(w,{id:`ledger`}),` finished the weekly report `,(0,s.jsx)(T,{id:`report`})]}),(0,s.jsxs)(E,{agent:`scout`,when:`1h`,children:[(0,s.jsx)(w,{id:`scout`}),` is drafting replies to 14 support tickets`]})]})]})})}export{D as default};