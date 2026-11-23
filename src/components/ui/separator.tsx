// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const t = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function n({orientation:e=`horizontal`,decorative:n=!0,label:i,className:a,...o}){let s=e===`vertical`,c=!s&&i!=null&&i!==!1&&i!==``,l=n?c?{}:{role:`none`}:{role:`separator`,"aria-orientation":s?`vertical`:void 0,"aria-label":c&&(typeof i==`string`||typeof i==`number`)?String(i):void 0};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(`style`,{href:`ui-separator-clean`,precedence:`default`,children:r}),(0,t.jsx)(`div`,{className:[`ui-sepc`,a].filter(Boolean).join(` `),"data-orientation":s?`vertical`:`horizontal`,"data-label":c?``:void 0,...l,...o,children:c&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(`span`,{className:`ui-sepc__line`,"aria-hidden":`true`}),(0,t.jsx)(`span`,{className:`ui-sepc__label`,children:i}),(0,t.jsx)(`span`,{className:`ui-sepc__line`,"aria-hidden":`true`})]})})]})}var r=`
/* Colors as variables – override them on .ui-sepc (see Theming in the docs) */
.ui-sepc {
  --ui-sepc-line: var(--aui-border, rgba(0, 0, 0, 0.06));
  --ui-sepc-text: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-sepc-weight: 0.5px;
  flex: none;
  box-sizing: border-box;
}

/* A line across: a border, so it stays one crisp device pixel on any screen */
.ui-sepc[data-orientation="horizontal"]:not([data-label]) {
  width: 100%;
  height: 0;
  border-top: var(--ui-sepc-weight) solid var(--ui-sepc-line);
}

/* Upright between tools: 16px high, centred in its row – set height to change it */
.ui-sepc[data-orientation="vertical"] {
  display: inline-block;
  align-self: center;
  width: 0;
  vertical-align: middle;
  height: 16px;
  border-inline-start: var(--ui-sepc-weight) solid var(--ui-sepc-line);
}

/* With a label: line · word · line, the word in the middle */
.ui-sepc[data-label] {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 12px;
  line-height: 16px;
  color: var(--ui-sepc-text);
  -webkit-font-smoothing: antialiased;
}
.ui-sepc__line {
  flex: 1 1 0;
  min-width: 12px;
  height: 0;
  border-top: var(--ui-sepc-weight) solid var(--ui-sepc-line);
}
/* A long label wraps inside the middle rather than pushing the lines out */
.ui-sepc__label {
  flex: 0 1 auto;
  min-width: 0;
  max-width: 80%;
  text-align: center;
  overflow-wrap: anywhere;
}

/* Windows high contrast: the line keeps a system color */
@media (forced-colors: active) {
  .ui-sepc { --ui-sepc-line: CanvasText; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-sepc {
  --ui-sepc-line: var(--aui-border, rgba(255, 255, 255, 0.08));
  --ui-sepc-text: var(--aui-muted, rgba(255, 255, 255, 0.45));
}
`,i=[{label:`Today`,runs:[{title:`Sync invoices to billing-api`,meta:`14:02 · 3m 12s`},{title:`Draft replies for 14 tickets`,meta:`11:40 · 58s`}]},{label:`Earlier`,runs:[{title:`Weekly usage report`,meta:`Mon · 4m 05s`},{title:`Migrate webhooks to v2`,meta:`Sun · failed`}]}];function a(){return(0,t.jsx)(`div`,{className:`sep-demo`,children:(0,t.jsxs)(`section`,{className:`sep-demo__card`,"aria-label":`Run history`,children:[(0,t.jsxs)(`div`,{className:`sep-demo__head`,children:[(0,t.jsx)(`span`,{className:`sep-demo__title`,children:`Run history`}),(0,t.jsxs)(`span`,{className:`sep-demo__stats`,children:[(0,t.jsx)(`span`,{children:`12 runs`}),(0,t.jsx)(n,{orientation:`vertical`}),(0,t.jsx)(`span`,{children:`1 failed`}),(0,t.jsx)(n,{orientation:`vertical`}),(0,t.jsx)(`span`,{children:`41 min`})]})]}),(0,t.jsx)(n,{}),i.map(e=>(0,t.jsxs)(`div`,{className:`sep-demo__group`,children:[(0,t.jsx)(n,{label:e.label,decorative:!1}),(0,t.jsx)(`ul`,{className:`sep-demo__list`,children:e.runs.map(e=>(0,t.jsxs)(`li`,{className:`sep-demo__row`,children:[(0,t.jsx)(`span`,{className:`sep-demo__name`,children:e.title}),(0,t.jsx)(`span`,{className:`sep-demo__meta`,children:e.meta})]},e.title))})]},e.label))]})})}export{a as default};