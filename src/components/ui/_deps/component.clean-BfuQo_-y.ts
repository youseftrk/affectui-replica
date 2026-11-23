// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function i({title:e,text:t,action:n,icon:i=l,bare:a,tall:s,className:c,...d}){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{href:`ui-empty-state-clean`,precedence:`default`,children:u}),(0,r.jsxs)(`div`,{className:[`ui-estc`,c].filter(Boolean).join(` `),"data-bare":a||void 0,"data-tall":s||void 0,...d,children:[i!=null&&i!==!1&&(0,r.jsx)(`span`,{className:`ui-estc__icon`,"aria-hidden":`true`,children:(0,r.jsx)(o,{icon:i})}),(0,r.jsx)(`p`,{className:`ui-estc__title`,children:e}),t!=null&&t!==!1&&(0,r.jsx)(`p`,{className:`ui-estc__text`,children:t}),n!=null&&n!==!1&&(0,r.jsx)(`div`,{className:`ui-estc__action`,children:n})]})]})}var a=e=>Array.isArray(e)&&e.length>0&&e.every(e=>Array.isArray(e)&&typeof e[0]==`string`);function o({icon:e}){return a(e)?(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,focusable:`false`,children:e.map(([e,{key:t,...r}],i)=>(0,n.createElement)(e,{...r,key:String(t??i),...`strokeWidth`in r?{strokeWidth:s}:null}))}):(0,r.jsx)(r.Fragment,{children:e})}var s=1.9,c={stroke:`currentColor`,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:`1.5`},l=[[`path`,{d:`M8 17H16`,...c}],[`path`,{d:`M8 13H12`,...c}],[`path`,{d:`M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z`,...c}]],u=`
/* Colors as variables – override them on .ui-estc (see Theming in the docs) */
.ui-estc {
  --ui-estc-title: var(--aui-ink, #000000);
  --ui-estc-text: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-estc-icon: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-estc-tile: var(--aui-subtle, rgba(0, 0, 0, 0.04));
  --ui-estc-frame: rgba(0, 0, 0, 0.02);
  --ui-estc-line: var(--aui-border, rgba(0, 0, 0, 0.06));

  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-width: 0;
  padding: 48px 24px 52px;
  border-radius: calc(var(--aui-radius-lg, 10px) + 2px);
  background: var(--ui-estc-frame);
  box-shadow: inset 0 0 0 0.5px var(--ui-estc-line);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  -webkit-font-smoothing: antialiased;
}
/* bare: no frame – the panel or page around it is the frame */
.ui-estc[data-bare] {
  padding: 0;
  background: none;
  box-shadow: none;
}
/* tall: fills its parent's height, the content in the middle */
.ui-estc[data-tall] {
  justify-content: center;
  min-height: 100%;
}

.ui-estc__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: var(--ui-estc-tile);
  color: var(--ui-estc-icon);
}
.ui-estc__icon > svg,
.ui-estc__icon > img {
  display: block;
  width: 18px;
  height: 18px;
}
.ui-estc__title {
  max-width: 100%;
  margin: 0;
  font-weight: 500;
  color: var(--ui-estc-title);
  overflow-wrap: anywhere;
}
.ui-estc__icon + .ui-estc__title { margin-top: 16px; }
.ui-estc__text {
  max-width: 430px;
  margin: 4px 0 0;
  color: var(--ui-estc-text);
  text-wrap: balance;
  overflow-wrap: anywhere;
}
.ui-estc__action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
}

/* Small screens: a tighter frame */
@media (max-width: 560px) {
  .ui-estc:not([data-bare]) {
    padding: 36px 18px 40px;
  }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-estc {
  --ui-estc-title: var(--aui-ink, #ffffff);
  --ui-estc-text: var(--aui-muted, rgba(255, 255, 255, 0.45));
  --ui-estc-icon: var(--aui-muted, rgba(255, 255, 255, 0.45));
  --ui-estc-tile: var(--aui-subtle, rgba(255, 255, 255, 0.06));
  --ui-estc-frame: rgba(255, 255, 255, 0.03);
  --ui-estc-line: var(--aui-border, rgba(255, 255, 255, 0.08));
}
`;export{i as t};