// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as o from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const s = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/HugeiconsIcon-C2cDExRS";
import{t as r}from"./_deps/Delete02Icon-CsyBlwAn";
import{t as i}from"./_deps/PencilEdit02Icon-DOK5yPzb";
import{t as a}from"./_deps/component.clean-DEur69fm";
function c({open:e,defaultOpen:t,onOpenChange:n,trigger:r,title:i,description:a,size:o=`md`,width:c,initialFocus:l,contained:u,children:m,footer:h,closeOnBackdrop:g=!0,closeButton:_=!0,closeLabel:v=`Close`,...y}){let[b,x,S]=f(e,t,n);return(0,s.jsxs)(s.Fragment,{children:[p(r,b,x,S),(0,s.jsx)(d,{...y,open:b,onDismiss:()=>x(!1),title:i,description:a,size:o,width:c,initialFocus:l,contained:u,closeOnBackdrop:g,opener:S,close:_?{label:v,onClick:()=>x(!1)}:void 0,footer:h,children:m})]})}function l({open:e,defaultOpen:t,onOpenChange:n,trigger:r,title:i,description:a,size:c=`sm`,width:l,initialFocus:u,contained:m,children:h,confirmLabel:g=`Confirm`,cancelLabel:_=`Cancel`,onConfirm:v,onCancel:y,danger:b,...x}){let[S,C,w]=f(e,t,n),[T,E]=(0,o.useState)(!1),D=(0,o.useRef)(null),O=()=>{T||(y?.(),C(!1))},k=async()=>{if(T)return;let e=v?.();if(!e||typeof e.then!=`function`)return C(!1);E(!0);try{await e,C(!1)}catch{}finally{E(!1)}};return(0,s.jsxs)(s.Fragment,{children:[p(r,S,C,w),(0,s.jsx)(d,{...x,alert:!0,open:S,onDismiss:O,title:i,description:a,size:c,width:l,initialFocus:u??D,contained:m,closeOnBackdrop:!1,busy:T,opener:w,footer:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`button`,{ref:D,type:`button`,className:`ui-dlgc__btn`,disabled:T,onClick:O,children:_}),(0,s.jsxs)(`button`,{type:`button`,className:`ui-dlgc__btn`,"data-tone":b?`danger`:`primary`,"data-busy":T||void 0,"aria-disabled":T||void 0,onClick:k,children:[(0,s.jsx)(`span`,{className:`ui-dlgc__btn-label`,children:g}),T&&(0,s.jsx)(`span`,{className:`ui-dlgc__spin`,"aria-hidden":`true`})]})]}),children:h})]})}var u=200;function d({open:e,onDismiss:t,title:n,description:r,size:i=`md`,width:a,initialFocus:c,contained:l,closeOnBackdrop:d,opener:f,alert:p,busy:g,close:_,footer:b,children:x,className:T,style:E,...D}){let O=(0,o.useId)(),k=`${O}-title`,A=`${O}-desc`,j=(0,o.useRef)(null),M=(0,o.useRef)(null),N=(0,o.useRef)(t);N.current=t;let P=(0,o.useRef)(g);P.current=g;let F=(0,o.useRef)(e),[I,L]=(0,o.useState)(e),[R,z]=(0,o.useState)(!1),[B,V]=(0,o.useState)(e);e!==B&&(V(e),e?(L(!0),z(!1)):I&&z(!0)),(0,o.useEffect)(()=>{if(!R)return;let e=window.setTimeout(()=>{L(!1),z(!1)},h()?0:u);return()=>window.clearTimeout(e)},[R]),(0,o.useLayoutEffect)(()=>{let e=j.current;if(!I||!e)return;let t=f.current??document.activeElement;f.current=null;let n=!l;e.open||(n?e.showModal():e.show()),n&&S(),(n||!F.current)&&(c?.current??e.querySelector(`[data-autofocus]`)??v(e.querySelector(`.ui-dlgc__body`))??v(e.querySelector(`.ui-dlgc__foot`))??v(e)??M.current)?.focus({preventScroll:!0}),F.current=!1;let r=e=>{e.preventDefault(),P.current||N.current()},i=()=>{if(!e.open){if(!P.current)return N.current();n?e.showModal():e.show()}},a=t=>{t.key===`Escape`&&(t.stopPropagation(),!n&&!t.defaultPrevented&&r(t)),t.key===`Tab`&&!n&&y(t,e)};return e.addEventListener(`cancel`,r),e.addEventListener(`close`,i),e.addEventListener(`keydown`,a),()=>{e.removeEventListener(`cancel`,r),e.removeEventListener(`close`,i),e.removeEventListener(`keydown`,a);let o=e.contains(document.activeElement);e.open&&e.close(),n&&C();let s=document.activeElement;t?.isConnected&&(o||!s||s===document.body)&&t.focus({preventScroll:!0})}},[I]);let H=(0,o.useRef)(!1),U=e=>{let t=H.current&&e.target===e.currentTarget;if(H.current=!1,t&&!R){if(d&&!g)return N.current();h()||M.current?.animate([{transform:`scale(1)`},{transform:`scale(1.012)`},{transform:`scale(1)`}],{duration:240,easing:`ease-out`})}};if(!I)return null;let W=a==null?void 0:{"--ui-dlgc-w":typeof a==`number`?`${a}px`:a};return(0,s.jsxs)(`dialog`,{...D,ref:j,className:[`ui-dlgc`,T].filter(Boolean).join(` `),style:E,role:p?`alertdialog`:D.role,"aria-modal":l?!0:void 0,"aria-labelledby":k,"aria-describedby":m(r)?A:D[`aria-describedby`],"aria-busy":g||void 0,"data-contained":l||void 0,"data-leaving":R||void 0,onPointerDown:e=>H.current=e.target===e.currentTarget,onClick:U,children:[(0,s.jsx)(`style`,{href:`ui-dialog-clean`,precedence:`default`,children:w}),(0,s.jsxs)(`div`,{ref:M,className:`ui-dlgc__panel`,"data-size":i,"data-alert":p||void 0,tabIndex:-1,style:W,children:[(0,s.jsxs)(`div`,{className:`ui-dlgc__head`,children:[(0,s.jsxs)(`div`,{className:`ui-dlgc__heading`,children:[(0,s.jsx)(`h2`,{className:`ui-dlgc__title`,id:k,children:n}),m(r)&&(0,s.jsx)(`p`,{className:`ui-dlgc__desc`,id:A,children:r})]}),_&&(0,s.jsx)(`button`,{type:`button`,className:`ui-dlgc__close`,"aria-label":_.label,title:_.label,onClick:_.onClick,children:(0,s.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,focusable:`false`,children:(0,s.jsx)(`path`,{d:`M18 6L6.00081 17.9992M17.9992 18L6 6.00085`,stroke:`currentColor`,strokeWidth:`1.9`,strokeLinecap:`round`,strokeLinejoin:`round`})})})]}),m(x)&&(0,s.jsx)(`div`,{className:`ui-dlgc__body`,children:x}),m(b)&&(0,s.jsx)(`div`,{className:`ui-dlgc__foot`,children:b})]})]})}function f(e,t,n){let[r,i]=(0,o.useState)(t??!1),a=(0,o.useRef)(null),s=e!==void 0,c=s?e:r;return[c,e=>{e!==c&&(s||i(e),n?.(e))},a]}function p(e,t,n,r){return(0,o.isValidElement)(e)?(0,o.cloneElement)(e,{"aria-haspopup":`dialog`,"aria-expanded":t,onClick:t=>{e.props.onClick?.(t),!t.defaultPrevented&&(r.current=t.currentTarget,n(!0))}}):null}var m=e=>e!=null&&typeof e!=`boolean`&&e!==``,h=()=>typeof window<`u`&&window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches,g=`input, textarea, select, button, [href], [tabindex], [contenteditable='true']`,_=e=>e?[...e.querySelectorAll(g)].filter(e=>e.tabIndex>=0&&!e.disabled&&e.getClientRects().length>0):[],v=e=>_(e)[0]??null;function y(e,t){let n=_(t);if(!n.length)return e.preventDefault();let r=n[0],i=n[n.length-1],a=document.activeElement,o=!a||!n.includes(a);e.shiftKey&&(a===r||o)?(e.preventDefault(),i.focus()):!e.shiftKey&&(a===i||o)&&(e.preventDefault(),r.focus())}var b=0,x=null;function S(){if(b++>0)return;let e=document.documentElement,t=window.innerWidth-e.clientWidth;x={overflow:e.style.overflow,gutter:e.style.scrollbarGutter},e.style.overflow=`hidden`,t>0&&(e.style.scrollbarGutter=`stable`)}function C(){if(--b>0||!x)return;b=0;let e=document.documentElement;e.style.overflow=x.overflow,e.style.scrollbarGutter=x.gutter,x=null}var w=`
/* Colors and motion as variables – override them on .ui-dlgc (see Theming in the docs) */
.ui-dlgc {
  --ui-dlgc-scrim: rgba(0, 0, 0, 0.16);
  --ui-dlgc-surface: var(--aui-overlay, var(--aui-surface, #ffffff));
  --ui-dlgc-strong: var(--aui-ink, #000000);
  --ui-dlgc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-dlgc-text: rgba(0, 0, 0, 0.61);
  --ui-dlgc-icon: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-dlgc-line: var(--aui-border, rgba(0, 0, 0, 0.07));
  --ui-dlgc-wash: rgba(0, 0, 0, 0.04);
  --ui-dlgc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.1)), 0 24px 48px -12px rgba(0, 0, 0, 0.22), 0 4px 12px -4px rgba(0, 0, 0, 0.06));
  --ui-dlgc-btn: var(--aui-surface, #ffffff);
  --ui-dlgc-btn-shadow: 0 0 0 0.5px var(--aui-border, rgba(0, 0, 0, 0.06)), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-dlgc-btn-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.1)), 0 1px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.07);
  --ui-dlgc-solid: var(--aui-primary, rgba(0, 0, 0, 0.88));
  --ui-dlgc-solid-hover: rgba(0, 0, 0, 0.8);
  --ui-dlgc-on-solid: var(--aui-on-primary, #fcfcfc);
  --ui-dlgc-danger: var(--aui-danger, #c4320a);
  --ui-dlgc-danger-bg: rgba(240, 68, 56, 0.08);
  --ui-dlgc-danger-bg-hover: rgba(240, 68, 56, 0.13);
  --ui-dlgc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-dlgc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));

  /* The layer: the whole window (or its frame when contained), dimmed, the card in the middle */
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 24px 16px;
  border: 0;
  background: var(--ui-dlgc-scrim);
  color: var(--ui-dlgc-ink);
  overflow: hidden;
  overscroll-behavior: contain;
  container: ui-dlgc / size;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  text-align: start;
  -webkit-font-smoothing: antialiased;
  animation: ui-dlgc-scrim 180ms ease both;
}
.ui-dlgc:not([open]) { display: none; }
.ui-dlgc::backdrop { background: transparent; }
.ui-dlgc[data-contained] { position: absolute; z-index: 70; }
.ui-dlgc *, .ui-dlgc *::before, .ui-dlgc *::after { box-sizing: border-box; }

/* The card: white with a 0.5px edge and a soft drop; the header and the actions stay, the content scrolls */
.ui-dlgc__panel {
  --ui-dlgc-w: 480px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: var(--ui-dlgc-w);
  max-width: 100%;
  max-height: 100%;
  min-height: 0;
  border-radius: calc(var(--aui-radius-lg, 10px) + 4px);
  background: var(--ui-dlgc-surface);
  box-shadow: var(--ui-dlgc-shadow);
  /* Normally only the content scrolls; when even the title and the actions don't fit (a short frame, a phone on its
     side) the whole card scrolls, so the actions stay reachable */
  overflow: hidden auto;
  animation: ui-dlgc-in 240ms var(--ui-dlgc-ease) both;
}
.ui-dlgc__panel[data-size="sm"] { --ui-dlgc-w: 400px; }
.ui-dlgc__panel[data-size="lg"] { --ui-dlgc-w: 720px; }
.ui-dlgc__panel:focus { outline: none; }

/* Title and quiet line; the × sits on the title's first line */
.ui-dlgc__head {
  display: flex;
  flex: none;
  align-items: flex-start;
  gap: 12px;
  padding-block: 16px 0;
  padding-inline: 20px 12px;
}
.ui-dlgc__head:not(:has(.ui-dlgc__close)) { padding-inline-end: 20px; }
.ui-dlgc__head:last-child { padding-bottom: 20px; }
.ui-dlgc__panel[data-alert] .ui-dlgc__head { padding-top: 20px; }
.ui-dlgc__heading { display: grid; flex: 1; gap: 4px; min-width: 0; }
.ui-dlgc__title { margin: 0; font-size: 15px; line-height: 22px; font-weight: 500; letter-spacing: -0.005em; color: var(--ui-dlgc-strong); overflow-wrap: anywhere; }
.ui-dlgc__desc { margin: 0; color: var(--ui-dlgc-text); overflow-wrap: anywhere; }

.ui-dlgc__close {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: -3px 0 0;
  padding: 0;
  border: 0;
  border-radius: var(--aui-radius, 6px);
  background: transparent;
  color: var(--ui-dlgc-icon);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 140ms ease, color 140ms ease, transform 160ms var(--ui-dlgc-ease);
}
.ui-dlgc__close svg { display: block; width: 15px; height: 15px; }
.ui-dlgc__close:hover { background: var(--ui-dlgc-wash); color: var(--ui-dlgc-ink); }
.ui-dlgc__close:active { transform: scale(0.94); }

/*
 * The content scrolls between the fixed header and footer. A hairline shows at the top once it is scrolled and at
 * the bottom while there is more – drawn by covers that scroll along with the content, so no script is needed
 */
.ui-dlgc__body {
  flex: 1 1 auto;
  min-height: 0;
  padding: 12px 20px 20px;
  overflow: auto;
  overscroll-behavior: contain;
  overflow-wrap: anywhere;
  background:
    linear-gradient(var(--ui-dlgc-surface) 0 0) top / 100% 2px no-repeat local,
    linear-gradient(var(--ui-dlgc-surface) 0 0) bottom / 100% 2px no-repeat local,
    linear-gradient(var(--ui-dlgc-line) 0 0) top / 100% 1px no-repeat scroll,
    linear-gradient(var(--ui-dlgc-line) 0 0) bottom / 100% 1px no-repeat scroll,
    var(--ui-dlgc-surface);
}

/* The actions, aligned to the end; they wrap onto a second line rather than squeezing */
.ui-dlgc__foot {
  display: flex;
  flex: none;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 16px 16px;
}
.ui-dlgc__body + .ui-dlgc__foot { padding-top: 0; }
.ui-dlgc__head + .ui-dlgc__foot { padding-top: 20px; }

/* AlertDialog's own two buttons – the clean Button's secondary, dark chip and red fill */
.ui-dlgc__btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  min-width: 0;
  max-width: 100%;
  margin: 0;
  padding: 0 10px;
  border: 0;
  border-radius: var(--aui-radius, 6px);
  background: var(--ui-dlgc-btn);
  box-shadow: var(--ui-dlgc-btn-shadow);
  color: var(--ui-dlgc-strong);
  font: inherit;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 140ms ease, box-shadow 140ms ease, color 140ms ease, transform 160ms var(--ui-dlgc-ease), opacity 140ms ease;
}
.ui-dlgc__btn:hover:not(:disabled) { box-shadow: var(--ui-dlgc-btn-shadow-hover); }
.ui-dlgc__btn[data-tone="primary"] { background: var(--ui-dlgc-solid); box-shadow: none; color: var(--ui-dlgc-on-solid); }
.ui-dlgc__btn[data-tone="primary"]:hover { background: var(--ui-dlgc-solid-hover); box-shadow: none; }
.ui-dlgc__btn[data-tone="danger"] { background: var(--ui-dlgc-danger-bg); box-shadow: none; color: var(--ui-dlgc-danger); }
.ui-dlgc__btn[data-tone="danger"]:hover { background: var(--ui-dlgc-danger-bg-hover); box-shadow: none; }
.ui-dlgc__btn:active:not(:disabled):not([data-busy]) { transform: scale(0.97); }
.ui-dlgc__btn:disabled { opacity: 0.4; cursor: default; }
.ui-dlgc__btn-label { overflow: hidden; text-overflow: ellipsis; }
/* Busy: the label keeps the width, a small arc turns in its place */
.ui-dlgc__btn[data-busy] { cursor: progress; }
.ui-dlgc__btn[data-busy] .ui-dlgc__btn-label { visibility: hidden; }
.ui-dlgc__spin {
  position: absolute;
  inset: 0;
  width: 14px;
  height: 14px;
  margin: auto;
  border: 1.5px solid currentColor;
  border-inline-end-color: transparent;
  border-radius: 50%;
  animation: ui-dlgc-turn 700ms linear infinite;
}

.ui-dlgc :is(.ui-dlgc__close, .ui-dlgc__btn):focus-visible {
  outline: 2px solid var(--ui-dlgc-focus);
  outline-offset: 2px;
}

/* The way out: the backdrop fades, the card shrinks a little as it goes */
.ui-dlgc[data-leaving] { pointer-events: none; animation: ui-dlgc-scrim-out ${u}ms ease both; }
.ui-dlgc[data-leaving] .ui-dlgc__panel { animation: ui-dlgc-out 150ms ease-in both; }

@keyframes ui-dlgc-scrim { from { background-color: transparent; } }
@keyframes ui-dlgc-scrim-out { to { background-color: transparent; } }
@keyframes ui-dlgc-in { from { opacity: 0; transform: translateY(6px) scale(0.97); } }
@keyframes ui-dlgc-out { to { opacity: 0; transform: scale(0.98); } }
@keyframes ui-dlgc-sheet-in { from { transform: translateY(100%); } }
@keyframes ui-dlgc-sheet-out { to { transform: translateY(100%); } }
@keyframes ui-dlgc-turn { to { transform: rotate(1turn); } }

/*
 * Phones (or a narrow frame): a sheet from the bottom – full width, the actions within the thumb's reach and above
 * the home bar, the content scrolling under the title
 */
@container ui-dlgc (max-width: 520px) {
  .ui-dlgc__panel {
    /* Out over the layer's padding to the edges and the bottom; at least 40px of backdrop stay above it */
    width: calc(100% + 32px);
    max-width: none;
    max-height: calc(100% + 8px);
    margin: auto -16px -24px;
    border-end-start-radius: 0;
    border-end-end-radius: 0;
    animation: ui-dlgc-sheet-in 320ms var(--ui-dlgc-ease) both;
  }
  .ui-dlgc__foot, .ui-dlgc__head:last-child { padding-bottom: max(16px, env(safe-area-inset-bottom)); }
  .ui-dlgc__panel[data-alert] .ui-dlgc__btn { flex: 1 1 0; }
  .ui-dlgc[data-leaving] .ui-dlgc__panel { animation: ui-dlgc-sheet-out ${u}ms cubic-bezier(0.4, 0, 1, 1) both; }
}

/* Touch screens: bigger targets – the look stays */
@media (pointer: coarse) {
  .ui-dlgc__btn { height: 36px; padding: 0 14px; }
  .ui-dlgc__close { width: 32px; height: 32px; margin: -5px -2px 0 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-dlgc, .ui-dlgc__panel, .ui-dlgc[data-leaving], .ui-dlgc[data-leaving] .ui-dlgc__panel { animation-duration: 1ms; }
  .ui-dlgc__spin { animation-duration: 1.6s; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-dlgc {
  --ui-dlgc-scrim: rgba(0, 0, 0, 0.5);
  --ui-dlgc-surface: var(--aui-overlay, var(--aui-surface, #1b1b1e));
  --ui-dlgc-strong: var(--aui-ink, #ffffff);
  --ui-dlgc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-dlgc-text: rgba(255, 255, 255, 0.62);
  --ui-dlgc-icon: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-dlgc-line: var(--aui-border, rgba(255, 255, 255, 0.08));
  --ui-dlgc-wash: rgba(255, 255, 255, 0.06);
  --ui-dlgc-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.14)), 0 24px 48px -12px rgba(0, 0, 0, 0.6));
  --ui-dlgc-btn: #232326;
  --ui-dlgc-btn-shadow: 0 0 0 0.5px var(--aui-border, rgba(255, 255, 255, 0.12)), 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-dlgc-btn-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.18)), 0 1px 3px rgba(0, 0, 0, 0.45);
  --ui-dlgc-solid: var(--aui-primary, rgba(255, 255, 255, 0.9));
  --ui-dlgc-solid-hover: rgba(255, 255, 255, 0.82);
  --ui-dlgc-on-solid: var(--aui-on-primary, #161618);
  --ui-dlgc-danger: var(--aui-danger, #ff8a7a);
  --ui-dlgc-danger-bg: rgba(255, 107, 95, 0.14);
  --ui-dlgc-danger-bg-hover: rgba(255, 107, 95, 0.2);
  --ui-dlgc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
  color-scheme: dark;
}

/* Hover of the dark chip follows its fill – also a brand color from --aui-primary */
@supports (color: color-mix(in srgb, red 50%, transparent)) {
  .ui-dlgc { --ui-dlgc-solid-hover: color-mix(in srgb, var(--ui-dlgc-solid) 91%, transparent); }
}
`,T=e=>new Promise(t=>setTimeout(t,e)),E=[{id:`release-notes`,name:`Release notes writer`,when:`Every Monday · posts to #eng-updates`,instructions:`Sum up last week's merged pull requests in plain words. Group them by area, leave out chores and dependency bumps.`,runs:14,tone:`blue`},{id:`inbox-triage`,name:`Inbox triage`,when:`On every new email · labels and drafts replies`,instructions:`Label each email by team and urgency. Draft a reply when the answer is in our docs, never send it.`,runs:212,tone:`purple`}];function D(){let e=(0,o.useRef)(null),[t,u]=(0,o.useState)(E),[d,f]=(0,o.useState)(E[0].id);(0,o.useLayoutEffect)(()=>{e.current?.closest(`.card__preview`)&&f(null)},[]);let p=t.find(e=>e.id===d),[m,h]=(0,o.useState)(E[0].name),[g,_]=(0,o.useState)(E[0].instructions),v=e=>{h(e.name),_(e.instructions),f(e.id)},y=()=>{let e=m.trim();e&&(u(t=>t.map(t=>t.id===d?{...t,name:e,instructions:g}:t)),f(null))},b=(e,t)=>u(n=>n.map(n=>n.id===e?{...n,deleted:t}:n));return(0,s.jsx)(`div`,{ref:e,className:`dlg-demo`,children:(0,s.jsxs)(`section`,{className:`dlg-demo__frame`,"aria-label":`Agents`,children:[(0,s.jsxs)(`header`,{className:`dlg-demo__top`,children:[(0,s.jsx)(`span`,{className:`dlg-demo__heading`,children:`Agents`}),(0,s.jsx)(`span`,{className:`dlg-demo__count`,children:t.filter(e=>!e.deleted).length})]}),(0,s.jsx)(`ul`,{className:`dlg-demo__list`,children:t.map(t=>(0,s.jsxs)(`li`,{className:`dlg-demo__row`,"data-deleted":t.deleted||void 0,children:[t.deleted?(0,s.jsxs)(`span`,{className:`dlg-demo__gone`,children:[t.name,` was deleted`]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(k,{id:t.id,tone:t.tone}),(0,s.jsxs)(`span`,{className:`dlg-demo__text`,children:[(0,s.jsx)(`span`,{className:`dlg-demo__name`,children:t.name}),(0,s.jsx)(`span`,{className:`dlg-demo__meta`,children:t.when})]})]}),(0,s.jsxs)(`span`,{className:`dlg-demo__tools`,children:[t.deleted?(0,s.jsx)(a,{variant:`ghost`,size:`sm`,"data-undo":t.id,onClick:()=>b(t.id,!1),children:`Undo`}):(0,s.jsx)(a,{variant:`secondary`,size:`sm`,icon:(0,s.jsx)(n,{icon:i,size:14,strokeWidth:1.6}),onClick:()=>v(t),children:`Edit`}),(0,s.jsx)(l,{trigger:t.deleted?void 0:(0,s.jsx)(a,{variant:`ghost`,size:`sm`,"aria-label":`Delete ${t.name}`,title:`Delete`,icon:(0,s.jsx)(n,{icon:r,size:14,strokeWidth:1.6})}),title:`Delete ${t.name}?`,description:`It stops running, and its ${t.runs} past runs are deleted with it. This can't be undone.`,confirmLabel:`Delete agent`,cancelLabel:`Keep it`,danger:!0,onConfirm:()=>T(700).then(()=>{b(t.id,!0),T(260).then(()=>e.current?.querySelector(`[data-undo="${t.id}"]`)?.focus())})})]})]},t.id))}),(0,s.jsx)(c,{contained:!0,open:!!p,onOpenChange:e=>!e&&f(null),title:`Edit agent`,description:`Changes apply from its next run.`,footer:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{variant:`secondary`,onClick:()=>f(null),children:`Cancel`}),(0,s.jsx)(a,{disabled:!m.trim(),onClick:y,children:`Save`})]}),children:(0,s.jsxs)(`form`,{className:`dlg-demo__form`,onSubmit:e=>{e.preventDefault(),y()},children:[(0,s.jsxs)(`label`,{className:`dlg-demo__field`,children:[(0,s.jsx)(`span`,{children:`Name`}),(0,s.jsx)(`input`,{className:`dlg-demo__input`,value:m,onChange:e=>h(e.target.value),maxLength:60})]}),(0,s.jsxs)(`label`,{className:`dlg-demo__field`,children:[(0,s.jsx)(`span`,{children:`Instructions`}),(0,s.jsx)(`textarea`,{className:`dlg-demo__input`,rows:4,value:g,onChange:e=>_(e.target.value)})]})]})})]})})}var O=e=>{let t=0;for(let n of e)t=t*31+n.charCodeAt(0)>>>0;for(let e=0;e<64;e++){let n=t>>e%26&63,r=[0,1,2].flatMap(e=>{let t=n>>e*2&1;return[t,n>>e*2+1&1,t]});if(r.filter(Boolean).length>=5)return r;t=t*1103515245+12345>>>0}return[1,0,1,0,1,0,1,0,1]};function k({id:e,tone:t}){return(0,s.jsx)(`span`,{className:`dlg-demo__mark`,"data-tone":t,"aria-hidden":`true`,children:O(e).map((e,t)=>(0,s.jsx)(`i`,{"data-on":e?``:void 0},t))})}export{D as default};