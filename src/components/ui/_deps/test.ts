// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as i from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const a = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function o({tone:e=`neutral`,size:t=`sm`,dot:n,live:r,icon:i,count:o,max:l=99,className:d,children:p,...m}){let h=s.includes(e)?e:`neutral`,g=t===`md`?`md`:`sm`,_=typeof o==`number`&&Number.isFinite(o),v=_?null:r||n?`dot`:i!=null&&i!==!1?`icon`:null;return!_&&!v&&(p==null||p===!1||p===``)?null:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`style`,{href:`ui-badge-clean`,precedence:`default`,children:f}),(0,a.jsxs)(`span`,{className:[`ui-bdgc`,d].filter(Boolean).join(` `),"data-tone":h,"data-size":g,"data-count":_?``:void 0,"data-lead":v??void 0,...m,children:[v===`dot`&&(0,a.jsx)(`span`,{className:`ui-bdgc__dot`,"data-live":r?``:void 0,"aria-hidden":`true`}),v===`icon`&&(0,a.jsx)(`span`,{className:`ui-bdgc__icon`,"aria-hidden":`true`,children:(0,a.jsx)(u,{icon:i})}),_?c(o,l):(0,a.jsx)(`span`,{className:`ui-bdgc__label`,children:p})]})]})}var s=[`neutral`,`info`,`success`,`warning`,`danger`,`purple`],c=(e,t)=>{let n=Math.max(0,Math.floor(e)),r=Math.max(0,Math.floor(Number.isFinite(t)?t:99)),i=e=>new Intl.NumberFormat().format(e);return n>r?`${i(r)}+`:i(n)},l=e=>Array.isArray(e)&&e.length>0&&e.every(e=>Array.isArray(e)&&typeof e[0]==`string`);function u({icon:e}){return l(e)?(0,a.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,focusable:`false`,children:e.map(([e,{key:t,...n}],r)=>(0,i.createElement)(e,{...n,key:String(t??r),...`strokeWidth`in n?{strokeWidth:d}:null}))}):(0,a.jsx)(a.Fragment,{children:e})}var d=2,f=`
/* Colors as variables – override them on .ui-bdgc (see Theming in the docs) */
.ui-bdgc {
  --ui-bdgc-neutral-bg: var(--aui-subtle, rgba(0, 0, 0, 0.06));
  --ui-bdgc-neutral-fg: rgba(0, 0, 0, 0.61);
  --ui-bdgc-neutral-dot: rgba(0, 0, 0, 0.3);
  --ui-bdgc-info-bg: var(--aui-info-soft, #008ff519);
  --ui-bdgc-info-fg: var(--aui-info, #006dcbf2);
  --ui-bdgc-success-bg: var(--aui-success-soft, #00a43319);
  --ui-bdgc-success-fg: var(--aui-success, #007d2ee0);
  --ui-bdgc-warning-bg: var(--aui-warning-soft, #ff9c0029);
  --ui-bdgc-warning-fg: var(--aui-warning, #b25e00);
  --ui-bdgc-danger-bg: var(--aui-danger-soft, #f52b0018);
  --ui-bdgc-danger-fg: var(--aui-danger, #d72400da);
  --ui-bdgc-purple-bg: color-mix(in srgb, var(--aui-purple, #a651f0) 11%, transparent);
  --ui-bdgc-purple-fg: #8a35d6;

  --bg: var(--ui-bdgc-neutral-bg);
  --fg: var(--ui-bdgc-neutral-fg);
  --dot: currentColor;
  --h: 18px;
  --pad: 6px;
  --lead: 4px;
  --mark: 12px;

  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  max-width: 100%;
  height: var(--h);
  padding: 0 var(--pad);
  border-radius: calc(var(--aui-radius-sm, 5px) - 1px);
  background: var(--bg);
  color: var(--fg);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  white-space: nowrap;
  vertical-align: middle;
  font-variant-numeric: tabular-nums;
  -webkit-font-smoothing: antialiased;
}
.ui-bdgc[data-size="md"] {
  --h: 20px;
  --pad: 7px;
  --lead: 5px;
  --mark: 13px;
  gap: 5px;
  border-radius: var(--aui-radius-sm, 5px);
  font-size: 12px;
}
/* A dot or icon in front sits a little closer to the edge, so it looks as far in as the text on the other side */
.ui-bdgc[data-lead] {
  padding-inline-start: var(--lead);
}

.ui-bdgc[data-tone="neutral"] { --dot: var(--ui-bdgc-neutral-dot); }
.ui-bdgc[data-tone="info"] { --bg: var(--ui-bdgc-info-bg); --fg: var(--ui-bdgc-info-fg); }
.ui-bdgc[data-tone="success"] { --bg: var(--ui-bdgc-success-bg); --fg: var(--ui-bdgc-success-fg); }
.ui-bdgc[data-tone="warning"] { --bg: var(--ui-bdgc-warning-bg); --fg: var(--ui-bdgc-warning-fg); }
.ui-bdgc[data-tone="danger"] { --bg: var(--ui-bdgc-danger-bg); --fg: var(--ui-bdgc-danger-fg); }
.ui-bdgc[data-tone="purple"] { --bg: var(--ui-bdgc-purple-bg); --fg: var(--ui-bdgc-purple-fg); }

/* Long text ends in … instead of pushing the row wider */
.ui-bdgc__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ui-bdgc__dot {
  position: relative;
  flex: none;
  width: 6px;
  height: 6px;
  margin: 0 1px;
  border-radius: 50%;
  background: var(--dot);
}
/* Live: a soft halo grows out of the dot and fades, over and over */
.ui-bdgc__dot[data-live]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--dot);
  animation: ui-bdgc-live 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}
@keyframes ui-bdgc-live {
  0% { transform: scale(1); opacity: 0.5; }
  70%, 100% { transform: scale(2.6); opacity: 0; }
}

.ui-bdgc__icon {
  display: grid;
  flex: none;
  place-items: center;
  width: var(--mark);
  height: var(--mark);
}
.ui-bdgc__icon > svg,
.ui-bdgc__icon > img {
  display: block;
  width: 100%;
  height: 100%;
}

/* Count: round, at least as wide as it is high, the number centred */
.ui-bdgc[data-count] {
  justify-content: center;
  min-width: var(--h);
  padding: 0 5px;
  border-radius: 999px;
}

@media (prefers-reduced-motion: reduce) {
  .ui-bdgc__dot[data-live]::after {
    animation: none;
    opacity: 0;
  }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-bdgc {
  --ui-bdgc-neutral-bg: var(--aui-subtle, rgba(255, 255, 255, 0.08));
  --ui-bdgc-neutral-fg: rgba(255, 255, 255, 0.62);
  --ui-bdgc-neutral-dot: rgba(255, 255, 255, 0.34);
  --ui-bdgc-info-bg: var(--aui-info-soft, #0077ff3a);
  --ui-bdgc-info-fg: var(--aui-info, #70b8ff);
  --ui-bdgc-success-bg: var(--aui-success-soft, #00f04a1f);
  --ui-bdgc-success-fg: var(--aui-success, #5fc88a);
  --ui-bdgc-warning-bg: var(--aui-warning-soft, #fb6a0025);
  --ui-bdgc-warning-fg: var(--aui-warning, #ffb35c);
  --ui-bdgc-danger-bg: var(--aui-danger-soft, #ff35232b);
  --ui-bdgc-danger-fg: var(--aui-danger, #ff8a7a);
  --ui-bdgc-purple-bg: color-mix(in srgb, var(--aui-purple, #b98af0) 16%, transparent);
  --ui-bdgc-purple-fg: #c9a2f5;
}
`,p=[{title:`Sync invoices to billing-api`,meta:`Started 2 min ago`,badge:(0,a.jsx)(o,{tone:`info`,live:!0,children:`Running`})},{title:`Draft replies for 14 tickets`,meta:`Waiting since 10:42`,badge:(0,a.jsx)(o,{tone:`warning`,dot:!0,children:`Needs you`})},{title:`Weekly usage report`,meta:`Finished in 3m 12s`,badge:(0,a.jsx)(o,{tone:`success`,children:`Done`})},{title:`Migrate webhooks to v2`,meta:`Rate limited by GitHub`,badge:(0,a.jsx)(o,{tone:`danger`,children:`Failed`})},{title:`Re-index the help center`,meta:`Tomorrow at 06:00`,badge:(0,a.jsx)(o,{icon:n,children:`Scheduled`})},{title:`Clean up stale branches`,meta:`Paused by Mara`,badge:(0,a.jsx)(o,{icon:r,children:`Paused`})}];function m(){return(0,a.jsx)(`div`,{className:`bdg-demo`,children:(0,a.jsxs)(`div`,{className:`bdg-demo__card`,children:[(0,a.jsxs)(`div`,{className:`bdg-demo__head`,children:[(0,a.jsxs)(`span`,{className:`bdg-demo__title`,children:[`Runs `,(0,a.jsx)(o,{count:6})]}),(0,a.jsxs)(`span`,{className:`bdg-demo__inbox`,children:[`Needs you `,(0,a.jsx)(o,{tone:`warning`,count:128,"aria-label":`128 waiting`})]})]}),(0,a.jsx)(`ul`,{className:`bdg-demo__list`,children:p.map(e=>(0,a.jsxs)(`li`,{className:`bdg-demo__row`,children:[(0,a.jsxs)(`span`,{className:`bdg-demo__text`,children:[(0,a.jsx)(`span`,{className:`bdg-demo__name`,children:e.title}),(0,a.jsx)(`span`,{className:`bdg-demo__meta`,children:e.meta})]}),e.badge]},e.title))}),(0,a.jsxs)(`div`,{className:`bdg-demo__foot`,children:[(0,a.jsx)(`span`,{className:`bdg-demo__agent`,children:`Triage agent`}),(0,a.jsx)(o,{tone:`purple`,size:`md`,children:`Beta`})]})]})})}export{m as default};