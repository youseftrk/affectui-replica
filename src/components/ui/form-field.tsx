// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function i({label:e,hint:t,error:i,required:c=!1,optional:l=!1,counter:u,disabled:d=!1,htmlFor:f,className:p,children:m,...h}){let g=(0,n.useId)(),_=typeof m==`function`?null:(0,n.isValidElement)(m)?m:null,v=_?.props??{},y=typeof v.id==`string`&&v.id||f||`${g}-control`,b=`${g}-label`,x=`${g}-message`,S=`${g}-count`,C=!!i,w=o(i)?i:o(t)?t:null,T=o(u),E=[typeof v[`aria-describedby`]==`string`?v[`aria-describedby`]:null,w?x:null,T?S:null].filter(Boolean).join(` `)||void 0,D={id:y,"aria-describedby":E,"aria-invalid":C||void 0,"aria-required":c||void 0,labelId:b,disabled:d||void 0},O=null;if(typeof m==`function`)O=m(D);else if(_){let t=typeof _.type==`string`?_.type:null,r=t!==null&&a.includes(t),i=v[`aria-label`]!=null||v[`aria-labelledby`]!=null;O=(0,n.cloneElement)(_,{id:y,"aria-describedby":E,"aria-invalid":C||v[`aria-invalid`]||void 0,"aria-required":c||v[`aria-required`]||void 0,...r&&c?{required:!0}:null,...t!==null&&!r&&!i&&e!=null?{"aria-labelledby":b}:null,...d?{disabled:!0}:null})}return(0,r.jsxs)(`div`,{...h,className:[`ui-fldc`,p].filter(Boolean).join(` `),"data-invalid":C||void 0,"data-disabled":d||void 0,children:[(0,r.jsx)(`style`,{href:`ui-form-field-clean`,precedence:`default`,children:s}),e!=null&&(0,r.jsxs)(`div`,{className:`ui-fldc__head`,children:[(0,r.jsxs)(`label`,{className:`ui-fldc__label`,id:b,htmlFor:y,children:[e,c&&(0,r.jsx)(`span`,{className:`ui-fldc__required`,"aria-hidden":`true`,children:`*`})]}),l&&!c&&(0,r.jsx)(`span`,{className:`ui-fldc__optional`,children:`Optional`})]}),O,(w||T)&&(0,r.jsxs)(`div`,{className:`ui-fldc__foot`,children:[(0,r.jsx)(`p`,{className:`ui-fldc__message`,id:x,dir:`auto`,"aria-live":o(i)?`polite`:void 0,children:w},o(i)?`error`:`hint`),T&&(0,r.jsx)(`span`,{className:`ui-fldc__count`,id:S,children:u})]})]})}var a=[`input`,`select`,`textarea`],o=e=>e!=null&&typeof e!=`boolean`&&e!==``,s=`
/* Colors and motion as variables – override them on .ui-fldc (see Theming in the docs) */
.ui-fldc {
  --ui-fldc-title: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-fldc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-fldc-muted: var(--aui-muted, rgba(0, 0, 0, 0.61));
  --ui-fldc-subtle: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-fldc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.3));
  --ui-fldc-danger: var(--aui-danger, #c4320a);
  --ui-fldc-ease: cubic-bezier(0.22, 1, 0.36, 1);

  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  color: var(--ui-fldc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-fldc[data-disabled] { opacity: 0.55; }

.ui-fldc__head { display: flex; align-items: baseline; gap: 6px; min-width: 0; }
.ui-fldc__label { min-width: 0; font-weight: 500; color: var(--ui-fldc-title); overflow-wrap: anywhere; cursor: default; }
/* The required mark: quiet, right after the last word, never alone on a line */
.ui-fldc__required { margin-inline-start: 2px; color: var(--ui-fldc-subtle); font-weight: 400; white-space: nowrap; }
.ui-fldc__optional { flex: none; font-size: 12px; line-height: 16px; color: var(--ui-fldc-subtle); }

/* Under the control: the hint, or the error in its place, and the count */
.ui-fldc__foot { display: flex; align-items: flex-start; gap: 12px; min-width: 0; }
.ui-fldc__message {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 12px;
  line-height: 16px;
  color: var(--ui-fldc-subtle);
  overflow-wrap: anywhere;
  animation: ui-fldc-message 260ms var(--ui-fldc-ease);
}
.ui-fldc[data-invalid] .ui-fldc__message { color: var(--ui-fldc-danger); }
.ui-fldc__count { flex: none; margin-inline-start: auto; font-size: 12px; line-height: 16px; font-variant-numeric: tabular-nums; color: var(--ui-fldc-faint); white-space: nowrap; }

@keyframes ui-fldc-message {
  from { opacity: 0; transform: translateY(-3px); filter: blur(2px); }
}
@media (prefers-reduced-motion: reduce) {
  .ui-fldc__message { animation-duration: 1ms; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-fldc {
  --ui-fldc-title: var(--aui-ink, rgba(255, 255, 255, 0.92));
  --ui-fldc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-fldc-muted: var(--aui-muted, rgba(255, 255, 255, 0.62));
  --ui-fldc-subtle: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-fldc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.3));
  --ui-fldc-danger: var(--aui-danger, #ff8a7a);
}
`,c=[`Claude Sonnet`,`Claude Opus`,`Claude Haiku`];function l(){let[e,t]=(0,n.useState)(`Release notes writer`),[a,o]=(0,n.useState)(`140`),[s,l]=(0,n.useState)(`Summarise merged pull requests for the changelog.`),u=Number(a),d=a.trim()===``?`Enter an amount.`:!Number.isFinite(u)||u<0?`Use a number, like 40.`:u>100?`Your plan allows up to $100 per run.`:void 0;return(0,r.jsx)(`div`,{className:`fld-demo`,children:(0,r.jsxs)(`form`,{className:`fld-democ`,onSubmit:e=>e.preventDefault(),noValidate:!0,children:[(0,r.jsx)(i,{label:`Agent name`,required:!0,counter:`${e.length}/40`,children:(0,r.jsx)(`input`,{className:`fld-democ__input`,value:e,maxLength:40,onChange:e=>t(e.target.value)})}),(0,r.jsx)(i,{label:`Model`,hint:`Opus thinks longer and costs more.`,children:(0,r.jsx)(`select`,{className:`fld-democ__input fld-democ__select`,defaultValue:c[0],children:c.map(e=>(0,r.jsx)(`option`,{children:e},e))})}),(0,r.jsx)(i,{label:`Budget per run`,hint:`In US dollars – the run stops once it's spent.`,error:d,children:(0,r.jsx)(`input`,{className:`fld-democ__input`,inputMode:`decimal`,value:a,onChange:e=>o(e.target.value)})}),(0,r.jsx)(i,{label:`Brief`,optional:!0,counter:`${s.length}/280`,children:(0,r.jsx)(`textarea`,{className:`fld-democ__input fld-democ__area`,rows:2,value:s,maxLength:280,onChange:e=>l(e.target.value)})})]})})}export{l as default};