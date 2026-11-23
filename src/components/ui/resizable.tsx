// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
var i=(0,n.createContext)(null),a=.01,o=`data-rszc-panel`;function s({direction:e=`horizontal`,onLayout:t,keyboardStep:s=5,className:c,style:l,children:u,ref:f,...p}){let g=(0,n.useRef)(null),_=(0,n.useRef)(new Map).current,[v,y]=(0,n.useState)({}),b=(0,n.useRef)(v);b.current=v;let[x,S]=(0,n.useState)(0),C=(0,n.useRef)(t);C.current=t;let w=(0,n.useRef)(0),T=(0,n.useCallback)(()=>g.current?[...g.current.children].filter(e=>e.hasAttribute(o)).map(e=>e.getAttribute(o)):[],[]);(0,n.useLayoutEffect)(()=>{let e=T(),t=b.current;if(!e.length)return;for(let t of[..._.keys()])e.includes(t)||_.delete(t);let n=e.filter(e=>t[e]!=null||_.get(e)?.initial!=null),r=n.reduce((e,n)=>e+(t[n]??_.get(n).initial),0),i=e.length>n.length?Math.max(0,100-r)/(e.length-n.length):0,o=e.map(e=>t[e]??_.get(e)?.initial??i),s=o.reduce((e,t)=>e+t,0)||1;o=o.map(e=>e*100/s),e.length===Object.keys(t).length&&e.every((e,n)=>Math.abs((t[e]??-1)-o[n])<a)||y(Object.fromEntries(e.map((e,t)=>[e,o[t]])))},[x,T,_]);let E=(0,n.useCallback)(()=>(S(e=>e+1),()=>S(e=>e+1)),[]),D=(0,n.useMemo)(()=>({direction:e,sizes:v,configs:_,step:s,register:E,read:()=>T().map(e=>b.current[e]??0),dragging:e=>g.current?.toggleAttribute(`data-resizing`,e),resize:(e,t,n)=>{let r=T(),i=d(e),o=i?r.indexOf(i):-1;if(o<0||o>=r.length-1)return;let s=r.map(e=>b.current[e]??0),c=t(s,r.map(e=>_.get(e)??{min:0,max:100,collapsible:!1,collapsed:0}),o);if(!c||c.every((e,t)=>Math.abs(e-s[t])<a))return;let l=g.current;l&&n&&(l.setAttribute(`data-snap`,``),window.clearTimeout(w.current),w.current=window.setTimeout(()=>l.removeAttribute(`data-snap`),240));let u=Object.fromEntries(r.map((e,t)=>[e,c[t]]));b.current=u,y(u),C.current?.(c.map(e=>Math.round(e*100)/100))}}),[e,v,_,s,E,T]),O=(0,n.useCallback)(e=>{g.current=e,m(f,e)},[f]);return(0,r.jsxs)(i.Provider,{value:D,children:[(0,r.jsx)(`style`,{href:`ui-resizable-clean`,precedence:`default`,children:h}),(0,r.jsx)(`div`,{ref:O,className:[`ui-rszc`,c].filter(Boolean).join(` `),"data-direction":e,style:l,...p,children:u})]})}function c({defaultSize:e,minSize:t=0,maxSize:s=100,collapsible:c=!1,collapsedSize:l=0,id:d,className:f,style:p,children:m,...h}){let g=(0,n.useContext)(i),_=(0,n.useId)(),v=d??_,y=u(t,0,100);g?.configs.set(v,{min:y,max:u(s,y,100),collapsible:c,collapsed:u(l,0,y),initial:e}),(0,n.useLayoutEffect)(()=>{if(g)return g.register()},[v]);let b=g?.sizes[v]??e,x=g?.configs.get(v),S=!!x?.collapsible&&b!=null&&b<=x.collapsed+a,C=S&&b<=a;return(0,r.jsx)(`div`,{id:v,className:[`ui-rszc__panel`,f].filter(Boolean).join(` `),[o]:v,"data-collapsed":S?``:void 0,inert:C||void 0,style:{flex:`${b??1} 1 0px`,...p},...h,children:m})}function l({withHandle:e=!1,className:t,"aria-label":s,...c}){let l=(0,n.useContext)(i),m=(0,n.useRef)(null),h=(0,n.useRef)(null),g=(0,n.useRef)({}),[_,v]=(0,n.useState)({}),[y,b]=(0,n.useState)(!1),x=(l?.direction??`horizontal`)===`horizontal`;if((0,n.useLayoutEffect)(()=>{let e=m.current;if(!e)return;let t=d(e)??void 0,n=f(e)??void 0;(t!==_.before||n!==_.after)&&v({before:t,after:n})}),!l)return null;let S=_.before?l.configs.get(_.before):void 0,C=_.before?l.sizes[_.before]:void 0,w=()=>x&&!!m.current&&getComputedStyle(m.current).direction===`rtl`,T=e=>{let t=m.current,n=t?.parentElement;if(e.button!==0||!t||!n)return;e.preventDefault(),t.focus({preventScroll:!0});let r=n.getBoundingClientRect(),i=x?r.width/(n.offsetWidth||1):r.height/(n.offsetHeight||1),a=[...n.children].filter(e=>e.hasAttribute(o)).reduce((e,t)=>e+(x?t.offsetWidth:t.offsetHeight),0)*(i||1);h.current={pos:x?e.clientX:e.clientY,px:Math.max(1,a),sizes:l.read(),sign:w()?-1:1},t.setPointerCapture(e.pointerId),b(!0),l.dragging(!0)},E=e=>{let t=h.current;if(!t||!m.current||!t.sizes.length)return;let n=((x?e.clientX:e.clientY)-t.pos)/t.px*100*t.sign;l.resize(m.current,(e,r,i)=>p(t.sizes,r,i,n))},D=()=>{h.current&&(h.current=null,b(!1),l.dragging(!1))},O=()=>{let e=m.current;e&&l.resize(e,(e,t,n)=>{let r=t[n].collapsible?n:t[n+1].collapsible?n+1:-1;if(r<0)return null;let i=t[r],o=r===n?_.before:_.after,s=r===n?1:-1;return e[r]<=i.collapsed+a?p(e,t,n,(u(g.current[o??``]??i.initial??i.min,i.min,i.max)-e[r])*s,!0):(o&&(g.current[o]=e[r]),p(e,t,n,(i.collapsed-e[r])*s))},!0)};return(0,r.jsx)(`div`,{ref:m,className:[`ui-rszc__handle`,t].filter(Boolean).join(` `),role:`separator`,tabIndex:0,"aria-orientation":x?`vertical`:`horizontal`,"aria-label":s??`Resize`,"aria-controls":_.before,"aria-valuenow":C==null?void 0:Math.round(C),"aria-valuemin":S?Math.round(S.collapsible?S.collapsed:S.min):0,"aria-valuemax":S?Math.round(S.max):100,"data-dragging":y||void 0,onPointerDown:T,onPointerMove:E,onPointerUp:D,onPointerCancel:D,onLostPointerCapture:D,onDoubleClick:()=>{let e=m.current;e&&l.resize(e,(e,t,n)=>t[n].initial==null?null:p(e,t,n,t[n].initial-e[n],!0),!0)},onKeyDown:e=>{let t=m.current;if(!t)return;let n=l.step*(e.shiftKey?2:1),r=x?w()?`ArrowRight`:`ArrowLeft`:`ArrowUp`,i=x?w()?`ArrowLeft`:`ArrowRight`:`ArrowDown`;e.key===r||e.key===i?(e.preventDefault(),l.resize(t,(t,r,a)=>p(t,r,a,e.key===i?n:-n,!0),!0)):e.key===`Home`||e.key===`End`?(e.preventDefault(),l.resize(t,(t,n,r)=>p(t,n,r,(e.key===`Home`?n[r].min:n[r].max)-t[r],!0),!0)):e.key===`Enter`&&(e.preventDefault(),O())},...c,children:e&&(0,r.jsx)(`span`,{className:`ui-rszc__grip`,"aria-hidden":`true`})})}var u=(e,t,n)=>Math.min(n,Math.max(t,e));function d(e){let t=e.previousElementSibling;for(;t&&!t.hasAttribute(o);)t=t.previousElementSibling;return t?.getAttribute(o)??null}function f(e){let t=e.nextElementSibling;for(;t&&!t.hasAttribute(o);)t=t.nextElementSibling;return t?.getAttribute(o)??null}function p(e,t,n,r,i=!1){let o=e.slice();if(Math.abs(r)<a)return o;let s=r>0?n:n+1,c=[];if(r>0)for(let t=n+1;t<e.length;t++)c.push(t);else for(let e=n;e>=0;e--)c.push(e);let l=t[s],u=Math.abs(r),d=l.collapsible&&e[s]<=l.collapsed+a&&l.min>l.collapsed;if(d){if(!i&&u<(l.min-l.collapsed)/2)return o;u=Math.max(u,l.min-l.collapsed)}if(u=Math.min(u,l.max-e[s]),u<=a)return o;let f=0;for(let n of c){let r=t[n],i=u-f;if(i<=a)break;let d=Math.max(0,e[n]-r.min),p=!(r.collapsible&&e[n]<=r.collapsed+a);if(n===c[0]&&r.collapsible&&p&&i>d+(r.min-r.collapsed)/2&&e[s]+(e[n]-r.collapsed)<=l.max+a){f+=e[n]-r.collapsed,o[n]=r.collapsed;break}if(!p)continue;let m=Math.min(d,i);o[n]=e[n]-m,f+=m}return d&&f<l.min-l.collapsed-a?e.slice():(o[s]=e[s]+f,o)}function m(e,t){typeof e==`function`?e(t):e&&(e.current=t)}var h=`
/* Colors as variables – override them on .ui-rszc (see Theming in the docs) */
.ui-rszc {
  --ui-rszc-line: var(--aui-border, rgba(0, 0, 0, 0.06));
  --ui-rszc-line-active: rgba(0, 0, 0, 0.22);
  --ui-rszc-grip: var(--aui-surface, #ffffff);
  --ui-rszc-grip-edge: rgba(0, 0, 0, 0.1);
  --ui-rszc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-rszc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));

  /* Fills what it is put in; the panes share it by their sizes */
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.ui-rszc[data-direction="vertical"] { flex-direction: column; }
.ui-rszc *, .ui-rszc *::before, .ui-rszc *::after { box-sizing: border-box; }
.ui-rszc[data-resizing] { user-select: none; -webkit-user-select: none; }
.ui-rszc[data-direction="horizontal"][data-resizing] { cursor: col-resize; }
.ui-rszc[data-direction="vertical"][data-resizing] { cursor: row-resize; }
/* While dragging, iframes and text under the pointer don't catch it */
.ui-rszc[data-resizing] > .ui-rszc__panel { pointer-events: none; }

/* A pane: its share of the room, never pushed wider by its content; it scrolls when the content doesn't fit */
.ui-rszc__panel { position: relative; min-width: 0; min-height: 0; overflow: auto; }
.ui-rszc[data-snap] > .ui-rszc__panel { transition: flex-grow 220ms var(--ui-rszc-ease); }

/* The handle: a 0.5px hairline in the layout, a 12px grab strip over it */
.ui-rszc__handle {
  position: relative;
  z-index: 1;
  flex: none;
  outline: none;
  touch-action: none;
  user-select: none;
  border: 0 solid var(--ui-rszc-line);
  transition: border-color 150ms ease;
}
/* A border, so it stays one crisp device pixel on any screen */
.ui-rszc[data-direction="horizontal"] > .ui-rszc__handle { width: 0; border-inline-start-width: 0.5px; cursor: col-resize; }
.ui-rszc[data-direction="vertical"] > .ui-rszc__handle { height: 0; border-top-width: 0.5px; cursor: row-resize; }
.ui-rszc__handle::after { content: ""; position: absolute; border-radius: 4px; }
.ui-rszc[data-direction="horizontal"] > .ui-rszc__handle::after { top: 0; bottom: 0; left: -6px; right: -6px; }
.ui-rszc[data-direction="vertical"] > .ui-rszc__handle::after { left: 0; right: 0; top: -6px; bottom: -6px; }
/* The line firms up under the pointer (after a short rest, so passing over it stays calm) and while dragging */
.ui-rszc__handle:hover { border-color: var(--ui-rszc-line-active); transition-delay: 120ms; }
.ui-rszc__handle[data-dragging], .ui-rszc__handle:focus-visible { border-color: var(--ui-rszc-line-active); transition-delay: 0ms; }
/* Keyboard focus: the ring around the grab strip, inside it, so the panes' edges never cut it */
.ui-rszc__handle:focus-visible::after { outline: 2px solid var(--ui-rszc-focus); outline-offset: -2px; }

/* The grip: a small white pill on the line */
.ui-rszc__grip {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: var(--ui-rszc-grip);
  box-shadow: 0 0 0 0.5px var(--ui-rszc-grip-edge), 0 1px 2px rgba(0, 0, 0, 0.06);
  pointer-events: none;
}
.ui-rszc[data-direction="horizontal"] .ui-rszc__grip { width: 6px; height: 24px; }
.ui-rszc[data-direction="vertical"] .ui-rszc__grip { width: 24px; height: 6px; }

/* Touch screens: a wider strip for the finger and a bigger grip */
@media (pointer: coarse) {
  .ui-rszc[data-direction="horizontal"] > .ui-rszc__handle::after { left: -12px; right: -12px; }
  .ui-rszc[data-direction="vertical"] > .ui-rszc__handle::after { top: -12px; bottom: -12px; }
  .ui-rszc[data-direction="horizontal"] .ui-rszc__grip { width: 8px; height: 32px; }
  .ui-rszc[data-direction="vertical"] .ui-rszc__grip { width: 32px; height: 8px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-rszc[data-snap] > .ui-rszc__panel { transition: none; }
  .ui-rszc__handle { transition: none; }
}

/* Windows high contrast: the line keeps a system color */
@media (forced-colors: active) {
  .ui-rszc__handle { border-color: CanvasText; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-rszc {
  --ui-rszc-line: var(--aui-border, rgba(255, 255, 255, 0.08));
  --ui-rszc-line-active: rgba(255, 255, 255, 0.3);
  --ui-rszc-grip: var(--aui-surface, #1f1f22);
  --ui-rszc-grip-edge: rgba(255, 255, 255, 0.16);
  --ui-rszc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
}
`,g=[{name:`Summarize churn interviews`,meta:`Running · 1m 12s`,state:`running`},{name:`Draft Q3 pricing memo`,meta:`Done · 3m 40s`,state:`done`},{name:`Tag 214 support tickets`,meta:`Done · 58s`,state:`done`},{name:`Sync invoices to billing-api`,meta:`Failed · 12s`,state:`failed`},{name:`Weekly usage report`,meta:`Done · 4m 05s`,state:`done`}],_=[[`14:02:07`,`Read 18 interview notes from /research/churn`],[`14:02:19`,`Grouped quotes into 5 themes`],[`14:02:44`,`Asked billing-api for plan changes in Q3`],[`14:03:01`,`Writing the summary …`]];function v(){return(0,r.jsx)(`div`,{className:`rsz-demo`,children:(0,r.jsx)(`section`,{className:`rsz-demo__frame`,"aria-label":`Agent workspace`,children:(0,r.jsxs)(s,{direction:`horizontal`,children:[(0,r.jsx)(c,{defaultSize:34,minSize:22,maxSize:55,collapsible:!0,children:(0,r.jsxs)(`div`,{className:`rsz-demo__pane`,children:[(0,r.jsxs)(`div`,{className:`rsz-demo__head`,children:[(0,r.jsx)(`span`,{className:`rsz-demo__label`,children:`Runs`}),(0,r.jsx)(`span`,{className:`rsz-demo__count`,children:g.length})]}),(0,r.jsx)(`ul`,{className:`rsz-demo__runs`,children:g.map((e,t)=>(0,r.jsxs)(`li`,{className:`rsz-demo__run`,"data-selected":t===0||void 0,children:[(0,r.jsx)(`span`,{className:`rsz-demo__mark`,"data-state":e.state,"aria-hidden":`true`}),(0,r.jsxs)(`span`,{className:`rsz-demo__text`,children:[(0,r.jsx)(`span`,{className:`rsz-demo__name`,title:e.name,children:e.name}),(0,r.jsx)(`span`,{className:`rsz-demo__meta`,children:e.meta})]})]},e.name))})]})}),(0,r.jsx)(l,{withHandle:!0,"aria-label":`Resize the runs list`}),(0,r.jsx)(c,{defaultSize:66,minSize:40,children:(0,r.jsxs)(s,{direction:`vertical`,children:[(0,r.jsx)(c,{defaultSize:62,minSize:30,children:(0,r.jsxs)(`div`,{className:`rsz-demo__pane`,children:[(0,r.jsx)(`div`,{className:`rsz-demo__head`,children:(0,r.jsx)(`span`,{className:`rsz-demo__label`,children:`Output`})}),(0,r.jsxs)(`div`,{className:`rsz-demo__body`,children:[(0,r.jsx)(`p`,{className:`rsz-demo__title`,children:`Summarize churn interviews`}),(0,r.jsx)(`p`,{children:`Most customers who left in Q3 did so within two weeks of a price change. Five themes came up again and again: surprise overage fees, unclear credit packs, missing annual discounts, slow support replies and seats they no longer used.`})]})]})}),(0,r.jsx)(l,{"aria-label":`Resize the log`}),(0,r.jsx)(c,{defaultSize:38,minSize:20,collapsible:!0,children:(0,r.jsxs)(`div`,{className:`rsz-demo__pane`,children:[(0,r.jsx)(`div`,{className:`rsz-demo__head`,children:(0,r.jsx)(`span`,{className:`rsz-demo__label`,children:`Log`})}),(0,r.jsx)(`ol`,{className:`rsz-demo__log`,children:_.map(([e,t])=>(0,r.jsxs)(`li`,{children:[(0,r.jsx)(`span`,{className:`rsz-demo__time`,children:e}),(0,r.jsx)(`span`,{className:`rsz-demo__line`,children:t})]},e))})]})})]})})]})})})}export{v as default};