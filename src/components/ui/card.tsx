// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as i from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const a = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/HugeiconsIcon-C2cDExRS";
import{t as r}from"./_deps/MoreHorizontalIcon-CBUy2huH";
function o({as:e=`div`,interactive:t,selected:n,className:r,children:i,...o}){let s=[`div`,`section`,`article`,`li`].includes(e)?e:`div`;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`style`,{href:`ui-card-clean`,precedence:`default`,children:u}),(0,a.jsx)(s,{className:[`ui-crdc`,r].filter(Boolean).join(` `),"data-interactive":t?``:void 0,"data-selected":n?``:void 0,...o,children:i})]})}function s({title:e,description:t,icon:n,action:r,titleAs:i=`h3`,className:o,children:s,...c}){let l=[`h2`,`h3`,`h4`,`p`].includes(i)?i:`h3`,u=e=>e!=null&&e!==!1&&e!==``;return(0,a.jsxs)(`div`,{className:[`ui-crdc__head`,o].filter(Boolean).join(` `),...c,children:[u(n)&&(0,a.jsx)(`span`,{className:`ui-crdc__icon`,children:n}),(0,a.jsxs)(`div`,{className:`ui-crdc__titles`,children:[u(e)&&(0,a.jsx)(l,{className:`ui-crdc__title`,children:e}),u(t)&&(0,a.jsx)(`p`,{className:`ui-crdc__desc`,children:t}),s]}),u(r)&&(0,a.jsx)(`div`,{className:`ui-crdc__action`,children:r})]})}function c({className:e,...t}){return(0,a.jsx)(`div`,{className:[`ui-crdc__body`,e].filter(Boolean).join(` `),...t})}function l({className:e,...t}){return(0,a.jsx)(`div`,{className:[`ui-crdc__foot`,e].filter(Boolean).join(` `),...t})}var u=`
/* Colors as variables – override them on .ui-crdc (see Theming in the docs) */
.ui-crdc {
  --ui-crdc-surface: var(--aui-surface, #ffffff);
  --ui-crdc-strong: var(--aui-ink, #000000);
  --ui-crdc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-crdc-muted: var(--aui-muted, rgba(0, 0, 0, 0.61));
  --ui-crdc-shadow: var(--aui-shadow-card, 0 0 0 0.5px var(--aui-border, rgba(0, 0, 0, 0.06)), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  --ui-crdc-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.1)), 0 2px 6px -1px rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-crdc-selected: color-mix(in srgb, var(--ui-crdc-ink) 3.5%, var(--ui-crdc-surface));
  --ui-crdc-shadow-selected: 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.14)), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-crdc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-crdc-radius: var(--aui-radius-lg, 10px);
  --ui-crdc-pad: 16px;

  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  min-width: 0;
  margin: 0;
  padding: var(--ui-crdc-pad);
  border-radius: var(--ui-crdc-radius);
  background: var(--ui-crdc-surface);
  box-shadow: var(--ui-crdc-shadow);
  color: var(--ui-crdc-ink);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  text-align: start;
  list-style: none;
  -webkit-font-smoothing: antialiased;
  transition: box-shadow 160ms ease, background-color 160ms ease;
}
.ui-crdc *, .ui-crdc *::before, .ui-crdc *::after { box-sizing: border-box; }

/* ----- Header: icon · title and quiet line · action ----- */
.ui-crdc__head { display: flex; align-items: flex-start; gap: 12px; min-width: 0; }
.ui-crdc__icon { display: flex; flex: none; align-items: center; justify-content: center; min-width: 20px; min-height: 20px; color: var(--ui-crdc-muted); }
/* A larger icon tile sits beside both lines; a 16px icon on the title's line */
.ui-crdc__icon > svg { display: block; width: 16px; height: 16px; }
.ui-crdc__titles { display: grid; flex: 1; gap: 2px; min-width: 0; }
.ui-crdc__title { margin: 0; font-size: 13px; line-height: 20px; font-weight: 500; letter-spacing: 0; color: var(--ui-crdc-strong); overflow-wrap: anywhere; }
.ui-crdc__desc { margin: 0; font-size: 13px; line-height: 20px; color: var(--ui-crdc-muted); overflow-wrap: anywhere; }
/* The action sits on the title's line, centred on it – a 28px button reaches 4px above and below */
.ui-crdc__action { display: flex; flex: none; align-items: center; gap: 4px; height: 20px; }

/* ----- Content and footer ----- */
.ui-crdc__body { min-width: 0; overflow-wrap: anywhere; }
.ui-crdc__foot { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-width: 0; min-height: 28px; font-size: 12px; line-height: 16px; color: var(--ui-crdc-muted); }

/* ----- Interactive: the whole card is a click target ----- */
.ui-crdc[data-interactive] { cursor: pointer; }
.ui-crdc[data-interactive]:hover { box-shadow: var(--ui-crdc-shadow-hover); }
/* The title's link or button reads like the title and stretches over the whole card */
.ui-crdc[data-interactive] .ui-crdc__title :is(a, button) {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  text-align: inherit;
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.ui-crdc[data-interactive] .ui-crdc__title :is(a, button)::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: var(--ui-crdc-radius);
}
/* Other controls in the card stay clickable above the stretched title */
.ui-crdc[data-interactive] :is(a, button, input, select, textarea, label, summary, [tabindex]):not(.ui-crdc__title *) {
  position: relative;
  z-index: 1;
}
/* The ring goes around the whole card, not the title text */
.ui-crdc[data-interactive] .ui-crdc__title :is(a, button):focus-visible { outline: none; }
.ui-crdc[data-interactive] .ui-crdc__title :is(a, button):focus-visible::after {
  outline: 2px solid var(--ui-crdc-focus);
  outline-offset: 2px;
}

/* ----- Selected: a gray fill and a firmer edge, no colored ring ----- */
.ui-crdc[data-selected] { background: var(--ui-crdc-selected); box-shadow: var(--ui-crdc-shadow-selected); }
.ui-crdc[data-selected][data-interactive]:hover { box-shadow: var(--ui-crdc-shadow-selected); }

/* Touch screens: no hover lift that sticks after a tap */
@media (hover: none) {
  .ui-crdc[data-interactive]:hover:not([data-selected]) { box-shadow: var(--ui-crdc-shadow); }
}
@media (prefers-reduced-motion: reduce) {
  .ui-crdc { transition: none; }
}
/* Windows high contrast: shadows are dropped – a border keeps the card's edge */
@media (forced-colors: active) {
  .ui-crdc { border: 1px solid CanvasText; }
  .ui-crdc[data-selected] { border: 2px solid Highlight; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-crdc {
  --ui-crdc-surface: var(--aui-surface, #1b1b1e);
  --ui-crdc-strong: var(--aui-ink, #ffffff);
  --ui-crdc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-crdc-muted: var(--aui-muted, rgba(255, 255, 255, 0.62));
  --ui-crdc-shadow: var(--aui-shadow-card, 0 0 0 0.5px var(--aui-border, rgba(255, 255, 255, 0.1)), 0 1px 2px rgba(0, 0, 0, 0.4));
  --ui-crdc-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.16)), 0 2px 6px rgba(0, 0, 0, 0.4);
  --ui-crdc-selected: color-mix(in srgb, var(--ui-crdc-ink) 6%, var(--ui-crdc-surface));
  --ui-crdc-shadow-selected: 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.2)), 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-crdc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
}
`,d=[0,120,240,120,240,360,240,360,480],f=e=>{let t=0;for(let n of e)t=t*31+n.charCodeAt(0)>>>0;for(let e=0;e<64;e++){let n=t>>e%26&63,r=[0,1,2].flatMap(e=>{let t=n>>e*2&1;return[t,n>>e*2+1&1,t]});if(r.filter(Boolean).length>=5)return r;t=t*1103515245+12345>>>0}return[1,0,1,0,1,0,1,0,1]};function p({id:e,busy:t,color:n}){return(0,a.jsx)(`span`,{className:`crd-demo-mark`,"data-busy":t||void 0,style:n?{"--crd-demo-mark":n}:void 0,"aria-hidden":!0,children:f(e).map((e,t)=>(0,a.jsx)(`i`,{"data-on":e?``:void 0,style:{animationDelay:`${d[t]}ms`}},t))})}var m=[{id:`draft`,title:`Draft only`,text:`You send every reply`},{id:`send`,title:`Send for me`,text:`Asks before refunds`}],h=[{label:`Tickets`,value:`142`},{label:`Resolved`,value:`96%`},{label:`Spent today`,value:`$4.20`}];function g(){let[e,t]=(0,i.useState)(`draft`);return(0,a.jsxs)(`div`,{className:`crd-demo`,children:[(0,a.jsxs)(o,{as:`section`,"aria-label":`Support triage`,children:[(0,a.jsx)(s,{icon:(0,a.jsx)(`span`,{className:`crd-demo__tile`,children:(0,a.jsx)(p,{id:`support-triage`,busy:!0})}),title:`Support triage`,description:`Sorts new tickets and drafts the first reply`,action:(0,a.jsx)(`button`,{type:`button`,className:`crd-demo__more`,"aria-label":`More for Support triage`,children:(0,a.jsx)(n,{icon:r,size:16,strokeWidth:1.5})})}),(0,a.jsx)(c,{children:(0,a.jsx)(`dl`,{className:`crd-demo__stats`,children:h.map(e=>(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`dt`,{children:e.label}),(0,a.jsx)(`dd`,{children:e.value})]},e.label))})}),(0,a.jsxs)(l,{children:[(0,a.jsx)(`span`,{className:`crd-demo__state`,children:`Running · started 2 min ago`}),(0,a.jsx)(`button`,{type:`button`,className:`crd-demo__btn`,children:`Open`})]})]}),(0,a.jsx)(`div`,{className:`crd-demo__label`,id:`crd-demo-mode`,children:`Replies`}),(0,a.jsx)(`ul`,{className:`crd-demo__modes`,"aria-labelledby":`crd-demo-mode`,children:m.map(n=>(0,a.jsx)(o,{as:`li`,interactive:!0,selected:e===n.id,children:(0,a.jsx)(s,{titleAs:`p`,title:(0,a.jsx)(`button`,{type:`button`,"aria-pressed":e===n.id,onClick:()=>t(n.id),children:n.title}),description:n.text})},n.id))})]})}export{g as default};