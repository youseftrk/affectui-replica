// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
var i=new Intl.NumberFormat(`en-US`);function a({page:e,onPageChange:t,total:a,pageSize:u=20,pageCount:d,pageSizes:f,onPageSizeChange:p,siblings:m=1,compact:h=!1,disabled:g=!1,className:_,"aria-label":v=`Pagination`,ref:y,...b}){let x=(0,n.useId)(),S=Math.max(1,Math.floor(u)||1),C=a!=null&&Number.isFinite(a)?Math.max(0,Math.floor(a)):null,w=Math.max(1,C==null?Math.floor(d??1)||1:Math.ceil(C/S)),T=Math.min(w,Math.max(1,Math.floor(e)||1)),E=Math.max(0,Math.floor(m)||0),D=(0,n.useRef)(null),[O,k]=(0,n.useState)(!1),A=(0,n.useRef)(0),j=`${w}|${E}|${h}`,[M,N]=(0,n.useState)(j);M!==j&&(N(j),k(!1)),(0,n.useLayoutEffect)(()=>{let e=D.current;!e||O||h||e.scrollWidth>e.clientWidth+1&&(A.current=e.clientWidth,k(!0))}),(0,n.useEffect)(()=>{let e=D.current;if(!e||typeof ResizeObserver>`u`)return;let t=new ResizeObserver(()=>{e.clientWidth>A.current+1&&k(!1)});return t.observe(e),()=>t.disconnect()},[]);let P=(0,n.useRef)(!1);(0,n.useLayoutEffect)(()=>{P.current&&(P.current=!1,D.current?.querySelector(`[data-page="${T}"]`)?.focus({preventScroll:!0}))},[T]);let F=(e,n=!1)=>{if(g)return;let r=Math.min(w,Math.max(1,e));r!==T&&(P.current=n&&!!D.current?.contains(document.activeElement),t(r))},I=C===0?0:(T-1)*S+1,L=C==null?0:Math.min(T*S,C),R=!h&&!O,z=f?.length?[...new Set([...f,S])].filter(e=>e>0).sort((e,t)=>e-t):null;return(0,r.jsxs)(`nav`,{...b,ref:e=>{D.current=e,typeof y==`function`?y(e):y&&(y.current=e)},"aria-label":v,className:[`ui-pgnc`,_].filter(Boolean).join(` `),"data-disabled":g||void 0,style:{...b.style,"--ui-pgnc-digits":i.format(w).length},children:[(0,r.jsx)(`style`,{href:`ui-pagination-clean`,precedence:`default`,children:l}),(0,r.jsxs)(`div`,{className:`ui-pgnc__info`,children:[z&&(0,r.jsxs)(`label`,{className:`ui-pgnc__size`,children:[(0,r.jsx)(`span`,{className:`ui-pgnc__size-label`,children:`Rows per page`}),(0,r.jsxs)(`span`,{className:`ui-pgnc__select`,children:[(0,r.jsx)(`select`,{id:`${x}-size`,value:S,disabled:g,onChange:e=>{let n=Number(e.target.value);p?.(n);let r=Math.floor((T-1)*S/n)+1;r!==T&&t(r)},children:z.map(e=>(0,r.jsx)(`option`,{value:e,children:i.format(e)},e))}),(0,r.jsx)(c,{})]})]}),(0,r.jsx)(`span`,{className:`ui-pgnc__range`,"aria-live":`polite`,"aria-atomic":`true`,children:C==null?(0,r.jsxs)(r.Fragment,{children:[`Page `,i.format(T),` `,(0,r.jsx)(`span`,{className:`ui-pgnc__of`,children:`of`}),` `,i.format(w)]}):C===0?`0 of 0`:(0,r.jsxs)(r.Fragment,{children:[i.format(I),`–`,i.format(L),` `,(0,r.jsx)(`span`,{className:`ui-pgnc__of`,children:`of`}),` `,i.format(C)]})})]}),(0,r.jsxs)(`ul`,{className:`ui-pgnc__pages`,children:[(0,r.jsx)(`li`,{children:(0,r.jsx)(`button`,{type:`button`,className:`ui-pgnc__step`,"aria-label":`Previous page`,"aria-disabled":g||T<=1||void 0,onClick:()=>F(T-1),children:(0,r.jsx)(s,{dir:`left`})})}),R&&o(T,w,E).map((e,t)=>e===0?(0,r.jsx)(`li`,{className:`ui-pgnc__gap`,"aria-hidden":`true`,children:`…`},t):(0,r.jsx)(`li`,{children:(0,r.jsx)(`button`,{type:`button`,className:`ui-pgnc__num`,"data-page":e,"aria-label":`Page ${i.format(e)}`,"aria-current":e===T?`page`:void 0,"aria-disabled":g||void 0,onClick:()=>F(e,!0),children:i.format(e)})},t)),(0,r.jsx)(`li`,{children:(0,r.jsx)(`button`,{type:`button`,className:`ui-pgnc__step`,"aria-label":`Next page`,"aria-disabled":g||T>=w||void 0,onClick:()=>F(T+1),children:(0,r.jsx)(s,{dir:`right`})})})]})]})}function o(e,t,n){let r=2*n+5,i=(e,t)=>Array.from({length:t-e+1},(t,n)=>e+n);return t<=r?i(1,t):e-n<=3?[...i(1,r-2),0,t]:e+n>=t-2?[1,0,...i(t-(r-3),t)]:[1,0,...i(e-n,e+n),0,t]}function s({dir:e}){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,focusable:`false`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{d:e===`left`?`M15 6s-6 4.42-6 6 6 6 6 6`:`M9 6s6 4.42 6 6-6 6-6 6`})})}function c(){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,focusable:`false`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{d:`M18 9s-4.42 6-6 6-6-6-6-6`})})}var l=`
/* Colors as variables – override them on .ui-pgnc (see Theming in the docs) */
.ui-pgnc {
  --ui-pgnc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-pgnc-text: rgba(0, 0, 0, 0.61);
  --ui-pgnc-muted: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-pgnc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.27));
  --ui-pgnc-wash: rgba(0, 0, 0, 0.04);
  --ui-pgnc-active: var(--aui-subtle, rgba(0, 0, 0, 0.06));
  --ui-pgnc-surface: var(--aui-surface, #ffffff);
  --ui-pgnc-shadow: 0 0 0 0.5px var(--aui-border, rgba(0, 0, 0, 0.06)), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-pgnc-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.1)), 0 2px 6px -1px rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-pgnc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-pgnc-radius: var(--aui-radius, 6px);
  --ui-pgnc-h: 28px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  min-width: 0;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  color: var(--ui-pgnc-muted);
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
}
.ui-pgnc *, .ui-pgnc *::before, .ui-pgnc *::after { box-sizing: border-box; }
.ui-pgnc svg { display: block; flex: none; }

.ui-pgnc__info { display: flex; align-items: center; gap: 16px; min-width: 0; }
.ui-pgnc__range { color: var(--ui-pgnc-text); }
.ui-pgnc__of { color: var(--ui-pgnc-muted); }

/* Rows per page: a quiet label and a small white field – the browser's own list opens from it */
.ui-pgnc__size { display: inline-flex; align-items: center; gap: 8px; cursor: default; }
.ui-pgnc__select { position: relative; display: inline-flex; align-items: center; }
.ui-pgnc__select > select {
  appearance: none;
  height: var(--ui-pgnc-h);
  margin: 0;
  padding: 0 26px 0 10px;
  border: 0;
  border-radius: var(--ui-pgnc-radius);
  background: var(--ui-pgnc-surface);
  box-shadow: var(--ui-pgnc-shadow);
  font: inherit;
  font-weight: 500;
  color: var(--ui-pgnc-ink);
  cursor: pointer;
  transition: box-shadow 140ms ease;
}
.ui-pgnc__select > select:hover:not(:disabled) { box-shadow: var(--ui-pgnc-shadow-hover); }
.ui-pgnc__select > svg { position: absolute; right: 8px; width: 12px; height: 12px; color: var(--ui-pgnc-muted); pointer-events: none; }
.ui-pgnc__select > select:dir(rtl) { padding: 0 10px 0 26px; }
.ui-pgnc__select > select:dir(rtl) + svg { right: auto; left: 8px; }

/* The arrows and the numbers: one row, every number as wide as the longest */
.ui-pgnc__pages { display: flex; align-items: center; gap: 2px; margin: 0 0 0 auto; padding: 0; list-style: none; }
.ui-pgnc__pages > li { display: flex; }
.ui-pgnc__num,
.ui-pgnc__step {
  position: relative;
  display: inline-grid;
  place-items: center;
  height: var(--ui-pgnc-h);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: var(--ui-pgnc-radius);
  background: none;
  font: inherit;
  color: var(--ui-pgnc-text);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 120ms ease, color 120ms ease;
}
.ui-pgnc__num { min-width: max(var(--ui-pgnc-h), calc(var(--ui-pgnc-digits, 1) * 1ch + 14px)); padding: 0 7px; }
.ui-pgnc__step { width: var(--ui-pgnc-h); color: var(--ui-pgnc-muted); }
.ui-pgnc__step > svg { width: 14px; height: 14px; }
.ui-pgnc__step > svg:dir(rtl) { transform: scaleX(-1); }
.ui-pgnc__num:hover:not([aria-disabled]),
.ui-pgnc__step:hover:not([aria-disabled]) { background: var(--ui-pgnc-wash); color: var(--ui-pgnc-ink); }
/* The page you're on: a gray fill, like an active tab */
.ui-pgnc__num[aria-current="page"],
.ui-pgnc__num[aria-current="page"]:hover { background: var(--ui-pgnc-active); color: var(--ui-pgnc-ink); font-weight: 500; cursor: default; }
.ui-pgnc__step[aria-disabled] { opacity: 0.4; cursor: default; }
.ui-pgnc__num:focus-visible,
.ui-pgnc__step:focus-visible,
.ui-pgnc__select > select:focus-visible { outline: 2px solid var(--ui-pgnc-focus); outline-offset: 2px; }
.ui-pgnc__select > select:focus:not(:focus-visible) { outline: none; }
.ui-pgnc__gap { display: grid; place-items: center; min-width: 20px; height: var(--ui-pgnc-h); color: var(--ui-pgnc-faint); user-select: none; }

/* While rows load: everything stays, nothing can be pressed */
.ui-pgnc[data-disabled] .ui-pgnc__pages,
.ui-pgnc[data-disabled] .ui-pgnc__size { opacity: 0.5; }
.ui-pgnc[data-disabled] button { cursor: default; }
.ui-pgnc[data-disabled] .ui-pgnc__num[aria-current="page"] { background: var(--ui-pgnc-active); }

/* Touch screens: every number and arrow a finger can hit */
@media (pointer: coarse) {
  .ui-pgnc { --ui-pgnc-h: 36px; font-size: 15px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-pgnc__num, .ui-pgnc__step, .ui-pgnc__select > select { transition-duration: 1ms; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-pgnc {
  --ui-pgnc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-pgnc-text: rgba(255, 255, 255, 0.62);
  --ui-pgnc-muted: var(--aui-muted, rgba(255, 255, 255, 0.45));
  --ui-pgnc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.28));
  --ui-pgnc-wash: rgba(255, 255, 255, 0.06);
  --ui-pgnc-active: var(--aui-subtle, rgba(255, 255, 255, 0.09));
  --ui-pgnc-surface: var(--aui-surface, #1b1b1e);
  --ui-pgnc-shadow: 0 0 0 0.5px var(--aui-border, rgba(255, 255, 255, 0.1)), 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-pgnc-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.16)), 0 2px 6px rgba(0, 0, 0, 0.4);
  --ui-pgnc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
  color-scheme: dark;
}
`,u=1284,d=[`Summarise Q3 support tickets`,`Weekly competitor digest`,`Tag new tickets by product area`,`Draft release notes for v2.14`,`Review the pricing page copy`,`Find duplicate leads in the CRM`,`Check invoices against contracts`,`Translate the onboarding emails`,`Answer the security questionnaire`,`Clean up stale feature flags`,`Summarise the all-hands recording`,`Triage failing nightly evals`],f=[`Research bot`,`Support triage`,`Release notes`,`Ops helper`],p=e=>({id:4821-e,title:d[e*7%d.length],agent:f[e*3%f.length],secs:18+e*37%290}),m=e=>e<60?`${e}s`:`${Math.floor(e/60)}m ${String(e%60).padStart(2,`0`)}s`;function h(){let[e,t]=(0,n.useState)(1),[i,o]=(0,n.useState)(25),s=(0,n.useRef)(null),c=(e-1)*i,l=Array.from({length:Math.max(0,Math.min(i,u-c))},(e,t)=>p(c+t));return(0,n.useLayoutEffect)(()=>{s.current&&(s.current.scrollTop=0)},[e,i]),(0,r.jsx)(`div`,{className:`pgn-demo`,children:(0,r.jsxs)(`section`,{className:`pgn-democ`,"aria-label":`Runs`,children:[(0,r.jsxs)(`header`,{className:`pgn-democ__head`,children:[(0,r.jsx)(`span`,{className:`pgn-democ__title`,children:`Runs`}),(0,r.jsx)(`span`,{className:`pgn-democ__count`,children:u.toLocaleString(`en-US`)})]}),(0,r.jsx)(`ul`,{ref:s,className:`pgn-democ__rows`,children:l.map(e=>(0,r.jsxs)(`li`,{className:`pgn-democ__row`,children:[(0,r.jsxs)(`span`,{className:`pgn-democ__id`,children:[`#`,e.id]}),(0,r.jsx)(`span`,{className:`pgn-democ__name`,children:e.title}),(0,r.jsx)(`span`,{className:`pgn-democ__agent`,children:e.agent}),(0,r.jsx)(`span`,{className:`pgn-democ__time`,children:m(e.secs)})]},e.id))},`${e}-${i}`),(0,r.jsx)(`footer`,{className:`pgn-democ__foot`,children:(0,r.jsx)(a,{page:e,onPageChange:t,total:u,pageSize:i,pageSizes:[25,50,100],onPageSizeChange:o})})]})})}export{h as default};