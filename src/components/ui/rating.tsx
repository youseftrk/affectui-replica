// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function i(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{href:`ui-rating-clean`,precedence:`default`,children:h}),e.variant===`thumbs`?(0,r.jsx)(u,{...e}):(0,r.jsx)(s,{...e})]})}var a=new Intl.NumberFormat(`en`,{maximumFractionDigits:1}),o=(e,t)=>`${a.format(e)} out of ${t}`;function s({variant:e,value:t,defaultValue:i=null,onValueChange:a,max:s=5,readOnly:c,disabled:u,size:d=`md`,allowClear:f=!0,getValueLabel:p=o,name:h,className:g,..._}){let[v,y]=m(t,i,a),[b,x]=(0,n.useState)(null),[S,C]=(0,n.useState)({upTo:0,n:0}),w=Math.min(50,Math.max(1,Math.floor(Number(s)||5))),T=Array.from({length:w},(e,t)=>t+1),E=[`ui-rtgc`,g].filter(Boolean).join(` `),D=d===`sm`||d===`lg`?d:`md`;if(c){let e=typeof v==`number`&&Number.isFinite(v)?Math.min(w,Math.max(0,v)):null,t=e==null?0:Math.round(e*2)/2;return(0,r.jsx)(`div`,{..._,role:`img`,"aria-label":_[`aria-label`]??(e==null?`No rating`:p(e,w)),className:E,"data-size":D,"data-readonly":``,children:T.map(e=>(0,r.jsx)(`span`,{className:`ui-rtgc__star`,children:(0,r.jsx)(l,{fill:Math.min(1,Math.max(0,t-(e-1)))})},e))})}let O=typeof v==`number`?Math.min(w,Math.max(1,Math.round(v))):null,k=b??O??0,A=e=>{y(e),e!=null&&C(t=>({upTo:e,n:t.n+1}))},j=e=>{if((e.key===`Delete`||e.key===`Backspace`)&&f){e.preventDefault(),A(null);return}let t=getComputedStyle(e.currentTarget).direction===`rtl`,n=O??0,r=e.key===`Home`?1:e.key===`End`?w:e.key===`ArrowUp`||e.key===(t?`ArrowLeft`:`ArrowRight`)?n+1:e.key===`ArrowDown`||e.key===(t?`ArrowRight`:`ArrowLeft`)?n-1:null;if(r==null)return;e.preventDefault();let i=Math.min(w,Math.max(1,r));x(null),A(i),(e.currentTarget.parentElement?.children[i-1])?.focus()};return(0,r.jsxs)(`div`,{..._,role:`radiogroup`,"aria-label":_[`aria-label`]??(_[`aria-labelledby`]?void 0:`Rating`),"aria-disabled":u||void 0,className:E,"data-size":D,"data-disabled":u||void 0,onPointerLeave:e=>{x(null),_.onPointerLeave?.(e)},children:[T.map(e=>{let t=S.n>0&&e<=S.upTo&&e<=(O??0);return(0,r.jsx)(`button`,{type:`button`,role:`radio`,className:`ui-rtgc__star`,"aria-checked":O===e,"aria-label":p(e,w),tabIndex:e===(O??1)?0:-1,disabled:u,"data-hover":b===e||void 0,onPointerEnter:t=>{t.pointerType===`mouse`&&x(e)},onClick:()=>A(O===e&&f?null:e),onKeyDown:j,children:(0,r.jsx)(l,{fill:+(e<=k),pop:t,delay:(e-1)*40,preview:b!=null},t?`pop-${S.n}`:`rest`)},e)}),h&&(0,r.jsx)(`input`,{type:`hidden`,name:h,value:O??``})]})}var c=`M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z`;function l({fill:e,pop:t,delay:n=0,preview:i}){return(0,r.jsxs)(`span`,{className:`ui-rtgc__glyph`,"data-pop":t||void 0,"data-preview":i||void 0,style:{"--ui-rtgc-f":e,animationDelay:`${n}ms`},"aria-hidden":`true`,children:[(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,className:`ui-rtgc__empty`,focusable:`false`,children:(0,r.jsx)(`path`,{d:c,fill:`currentColor`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinejoin:`round`})}),e>0&&(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,className:`ui-rtgc__fill`,focusable:`false`,children:(0,r.jsx)(`path`,{d:c,fill:`currentColor`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinejoin:`round`})})]})}function u({variant:e,value:t,defaultValue:i=null,onValueChange:a,labels:o,readOnly:s,disabled:c,size:l=`md`,allowClear:u=!0,name:d,className:f,...h}){let[g,_]=m(t,i,a),[v,y]=(0,n.useState)(0),b=[`ui-rtgc`,`ui-rtgc--thumbs`,f].filter(Boolean).join(` `),x=l===`sm`||l===`lg`?l:`md`,S={up:o?.up??`Good response`,down:o?.down??`Bad response`},C=g===`up`||g===`down`?g:null,w=e=>{_(e),e&&y(e=>e+1)};return s?(0,r.jsx)(`div`,{...h,role:`img`,"aria-label":h[`aria-label`]??(C?`Rated: ${S[C]}`:`Not rated`),className:b,"data-size":x,"data-readonly":``,children:[`up`,`down`].map(e=>(0,r.jsx)(`span`,{className:`ui-rtgc__thumb`,"data-on":C===e||void 0,children:(0,r.jsx)(p,{down:e===`down`,solid:C===e})},e))}):(0,r.jsxs)(`div`,{...h,role:`radiogroup`,"aria-label":h[`aria-label`]??(h[`aria-labelledby`]?void 0:`Rate this response`),"aria-disabled":c||void 0,className:b,"data-size":x,"data-disabled":c||void 0,children:[[`up`,`down`].map(e=>(0,r.jsx)(`button`,{type:`button`,role:`radio`,className:`ui-rtgc__thumb`,"aria-checked":C===e,"aria-label":S[e],title:S[e],tabIndex:e===(C??`up`)?0:-1,disabled:c,"data-on":C===e||void 0,onClick:()=>w(C===e&&u?null:e),onKeyDown:t=>{if((t.key===`Delete`||t.key===`Backspace`)&&u){t.preventDefault(),w(null);return}if(![`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`End`].includes(t.key))return;t.preventDefault();let n=t.key===`Home`?`up`:t.key===`End`||e===`up`?`down`:`up`;w(n),(t.currentTarget.parentElement?.children[n===`up`?0:1])?.focus()},children:(0,r.jsx)(p,{down:e===`down`,solid:C===e,pop:C===e&&v>0},C===e?`pop-${v}`:`rest`)},e)),d&&(0,r.jsx)(`input`,{type:`hidden`,name:d,value:C??``})]})}var d=[`M2 12.5C2 11.3954 2.89543 10.5 4 10.5C5.65685 10.5 7 11.8431 7 13.5V17.5C7 19.1569 5.65685 20.5 4 20.5C2.89543 20.5 2 19.6046 2 18.5V12.5Z`,`M15.4787 7.80626L15.2124 8.66634C14.9942 9.37111 14.8851 9.72349 14.969 10.0018C15.0369 10.2269 15.1859 10.421 15.389 10.5487C15.64 10.7065 16.0197 10.7065 16.7791 10.7065H17.1831C19.7532 10.7065 21.0382 10.7065 21.6452 11.4673C21.7145 11.5542 21.7762 11.6467 21.8296 11.7437C22.2965 12.5921 21.7657 13.7351 20.704 16.0211C19.7297 18.1189 19.2425 19.1678 18.338 19.7852C18.2505 19.8449 18.1605 19.9013 18.0683 19.9541C17.116 20.5 15.9362 20.5 13.5764 20.5H13.0646C10.2057 20.5 8.77628 20.5 7.88814 19.6395C7 18.7789 7 17.3939 7 14.6239V13.6503C7 12.1946 7 11.4668 7.25834 10.8006C7.51668 10.1344 8.01135 9.58664 9.00069 8.49112L13.0921 3.96056C13.1947 3.84694 13.246 3.79012 13.2913 3.75075C13.7135 3.38328 14.3652 3.42464 14.7344 3.84235C14.774 3.8871 14.8172 3.94991 14.9036 4.07554C15.0388 4.27205 15.1064 4.37031 15.1654 4.46765C15.6928 5.33913 15.8524 6.37436 15.6108 7.35715C15.5838 7.46692 15.5488 7.5801 15.4787 7.80626Z`],f=[`M2 11.5C2 12.6046 2.89543 13.5 4 13.5C5.65685 13.5 7 12.1569 7 10.5V6.5C7 4.84315 5.65685 3.5 4 3.5C2.89543 3.5 2 4.39543 2 5.5V11.5Z`,`M15.4787 16.1937L15.2124 15.3337C14.9942 14.6289 14.8851 14.2765 14.969 13.9982C15.0369 13.7731 15.1859 13.579 15.389 13.4513C15.64 13.2935 16.0197 13.2935 16.7791 13.2935H17.1831C19.7532 13.2935 21.0382 13.2935 21.6452 12.5327C21.7145 12.4458 21.7762 12.3533 21.8296 12.2563C22.2965 11.4079 21.7657 10.2649 20.704 7.9789C19.7297 5.88111 19.2425 4.83222 18.338 4.21485C18.2505 4.15508 18.1605 4.0987 18.0683 4.04586C17.116 3.5 15.9362 3.5 13.5764 3.5H13.0646C10.2057 3.5 8.77628 3.5 7.88814 4.36053C7 5.22106 7 6.60607 7 9.37607V10.3497C7 11.8054 7 12.5332 7.25834 13.1994C7.51668 13.8656 8.01135 14.4134 9.00069 15.5089L13.0921 20.0394C13.1947 20.1531 13.246 20.2099 13.2913 20.2493C13.7135 20.6167 14.3652 20.5754 14.7344 20.1577C14.774 20.1129 14.8172 20.0501 14.9036 19.9245C15.0388 19.728 15.1064 19.6297 15.1654 19.5323C15.6928 18.6609 15.8524 17.6256 15.6108 16.6429C15.5838 16.5331 15.5488 16.4199 15.4787 16.1937Z`];function p({down:e,solid:t,pop:n}){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,className:`ui-rtgc__icon`,"data-down":e||void 0,"data-pop":n||void 0,focusable:`false`,"aria-hidden":`true`,children:(e?f:d).map((e,n)=>(0,r.jsx)(`path`,{d:e,fill:t?`currentColor`:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`},n))})}function m(e,t,r){let[i,a]=(0,n.useState)(t),o=e!==void 0;return[o?e:i,e=>{o||a(e),r?.(e)}]}var h=`
/* Colors and motion as variables – override them on .ui-rtgc (see Theming in the docs) */
.ui-rtgc {
  --ui-rtgc-star: #e8b000;
  --ui-rtgc-empty: rgba(0, 0, 0, 0.1);
  --ui-rtgc-empty-hover: rgba(0, 0, 0, 0.16);
  --ui-rtgc-icon: var(--aui-muted, rgba(0, 0, 0, 0.447));
  --ui-rtgc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-rtgc-wash: rgba(0, 0, 0, 0.04);
  --ui-rtgc-wash-on: rgba(0, 0, 0, 0.06);
  --ui-rtgc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-rtgc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));

  /* A star's size, the space around it (its hit area) and a thumb button's size */
  --s: 18px;
  --pad: 3px;
  --b: 28px;
  --i: 16px;

  display: inline-flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
  max-width: 100%;
  flex-wrap: wrap;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent;
}
.ui-rtgc[data-size="sm"] { --s: 14px; --pad: 2px; --b: 24px; --i: 14px; gap: 1px; }
.ui-rtgc[data-size="lg"] { --s: 24px; --pad: 3px; --b: 32px; --i: 18px; }
.ui-rtgc[data-readonly] { gap: 2px; }
.ui-rtgc[data-readonly][data-size="sm"] { gap: 1px; }
.ui-rtgc[data-disabled] { opacity: 0.5; }

/* A star: its button is the glyph plus a little room, so the hit area is bigger than the star */
.ui-rtgc__star {
  display: grid;
  flex: none;
  place-items: center;
  margin: 0;
  padding: var(--pad);
  border: 0;
  border-radius: 6px;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.ui-rtgc[data-readonly] .ui-rtgc__star { padding: 0; cursor: default; }
.ui-rtgc__star:disabled { cursor: not-allowed; }
.ui-rtgc__star:focus-visible { outline: 2px solid var(--ui-rtgc-focus); outline-offset: 2px; }

.ui-rtgc__glyph { position: relative; display: block; width: var(--s); height: var(--s); transition: transform 160ms var(--ui-rtgc-ease); }
.ui-rtgc__glyph svg { position: absolute; inset: 0; display: block; width: 100%; height: 100%; overflow: visible; }
.ui-rtgc__empty { color: var(--ui-rtgc-empty); transition: color 140ms ease; }
/* The fill is a second star on top, clipped from the start side – whole, or half for a read-only 4.5 */
.ui-rtgc__fill { color: var(--ui-rtgc-star); clip-path: inset(0 calc((1 - var(--ui-rtgc-f)) * 100%) 0 0); }
.ui-rtgc:dir(rtl) .ui-rtgc__fill { clip-path: inset(0 0 0 calc((1 - var(--ui-rtgc-f)) * 100%)); }
.ui-rtgc__star:not(:disabled):hover .ui-rtgc__empty { color: var(--ui-rtgc-empty-hover); }
.ui-rtgc__star[data-hover] .ui-rtgc__glyph { transform: scale(1.12); }
.ui-rtgc__star:not(:disabled):active .ui-rtgc__glyph { transform: scale(0.9); }
/* A choice: the stars up to it pop one after the other */
.ui-rtgc__glyph[data-pop] { animation: ui-rtgc-pop 420ms var(--ui-rtgc-ease) both; }

/* Thumbs: two quiet icon buttons; the chosen one fills in ink and sits on a soft wash */
.ui-rtgc__thumb {
  display: grid;
  flex: none;
  place-items: center;
  width: var(--b);
  height: var(--b);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: none;
  color: var(--ui-rtgc-icon);
  font: inherit;
  cursor: pointer;
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-rtgc[data-readonly] .ui-rtgc__thumb { width: auto; height: auto; cursor: default; }
.ui-rtgc[data-readonly] .ui-rtgc__thumb:not([data-on]) { opacity: 0.45; }
.ui-rtgc__thumb:not(:disabled):hover { background: var(--ui-rtgc-wash); color: var(--ui-rtgc-ink); }
.ui-rtgc__thumb[data-on] { color: var(--ui-rtgc-ink); }
.ui-rtgc:not([data-readonly]) .ui-rtgc__thumb[data-on] { background: var(--ui-rtgc-wash-on); }
.ui-rtgc__thumb:disabled { cursor: not-allowed; }
.ui-rtgc__thumb:focus-visible { outline: 2px solid var(--ui-rtgc-focus); outline-offset: 2px; }
.ui-rtgc__icon { display: block; width: var(--i); height: var(--i); }
.ui-rtgc__icon[data-pop] { animation: ui-rtgc-thumb 460ms var(--ui-rtgc-ease); transform-origin: 30% 70%; }
.ui-rtgc__icon[data-pop][data-down] { animation-name: ui-rtgc-thumb-down; transform-origin: 30% 30%; }

@keyframes ui-rtgc-pop { 0% { transform: scale(0.6); } 55% { transform: scale(1.22); } 100% { transform: scale(1); } }
@keyframes ui-rtgc-thumb { 0% { transform: scale(0.8) rotate(0); } 45% { transform: scale(1.18) rotate(-12deg); } 100% { transform: scale(1) rotate(0); } }
@keyframes ui-rtgc-thumb-down { 0% { transform: scale(0.8) rotate(0); } 45% { transform: scale(1.18) rotate(12deg); } 100% { transform: scale(1) rotate(0); } }

/* Touch screens: a hit area of at least 32px per star and 36px per thumb */
@media (pointer: coarse) {
  .ui-rtgc { --pad: 7px; --b: 36px; }
  .ui-rtgc[data-size="sm"] { --pad: 9px; --b: 32px; }
  .ui-rtgc[data-size="lg"] { --pad: 6px; --b: 40px; }
  .ui-rtgc:not([data-readonly]) { gap: 0; }
  .ui-rtgc__star[data-hover] .ui-rtgc__glyph { transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-rtgc__glyph, .ui-rtgc__empty, .ui-rtgc__thumb { transition: none; }
  .ui-rtgc__glyph[data-pop], .ui-rtgc__icon[data-pop] { animation: none; }
  .ui-rtgc__star[data-hover] .ui-rtgc__glyph, .ui-rtgc__star:active .ui-rtgc__glyph { transform: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-rtgc {
  --ui-rtgc-star: #f0bd1a;
  --ui-rtgc-empty: rgba(255, 255, 255, 0.14);
  --ui-rtgc-empty-hover: rgba(255, 255, 255, 0.22);
  --ui-rtgc-icon: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-rtgc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-rtgc-wash: rgba(255, 255, 255, 0.06);
  --ui-rtgc-wash-on: rgba(255, 255, 255, 0.09);
  --ui-rtgc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
}
`,g=[``,`Poor`,`Fair`,`Good`,`Great`,`Excellent`];function _(){let[e,t]=(0,n.useState)(null),[a,o]=(0,n.useState)(4),s=(0,n.useId)();return(0,r.jsx)(`div`,{className:`rtg-demo`,children:(0,r.jsxs)(`section`,{className:`rtg-demo__card`,"aria-label":`Answer from Research agent`,children:[(0,r.jsxs)(`div`,{className:`rtg-demo__answer`,children:[(0,r.jsxs)(`div`,{className:`rtg-demo__who`,children:[(0,r.jsx)(y,{id:`research`}),(0,r.jsx)(`span`,{className:`rtg-demo__name`,children:`Research agent`}),(0,r.jsx)(`span`,{className:`rtg-demo__time`,children:`2m`})]}),(0,r.jsx)(`p`,{className:`rtg-demo__text`,children:`Three of the five competitors raised prices this quarter, by 8 to 15%. Linear and Height moved seats to annual billing only; the others kept monthly plans.`}),(0,r.jsxs)(`div`,{className:`rtg-demo__ask`,children:[(0,r.jsx)(`span`,{className:`rtg-demo__hint`,"aria-live":`polite`,children:e?`Thanks – this helps the agent learn`:`Was this helpful?`}),(0,r.jsx)(i,{variant:`thumbs`,size:`sm`,value:e,onValueChange:t,"aria-label":`Rate this answer`})]})]}),(0,r.jsxs)(`div`,{className:`rtg-demo__row`,children:[(0,r.jsx)(`span`,{className:`rtg-demo__label`,id:s,children:`Rate this run`}),(0,r.jsx)(i,{value:a,onValueChange:o,"aria-labelledby":s}),(0,r.jsx)(`span`,{className:`rtg-demo__word`,children:g[a??0]})]}),(0,r.jsxs)(`div`,{className:`rtg-demo__foot`,children:[(0,r.jsx)(i,{readOnly:!0,value:4.5,size:`sm`}),(0,r.jsxs)(`span`,{children:[(0,r.jsx)(`b`,{children:`4.5`}),` · 2,184 runs rated`]})]})]})})}var v=e=>{let t=0;for(let n of e)t=t*31+n.charCodeAt(0)>>>0;for(let e=0;e<64;e++){let n=t>>e%26&63,r=[0,1,2].flatMap(e=>{let t=n>>e*2&1;return[t,n>>e*2+1&1,t]});if(r.filter(Boolean).length>=5)return r;t=t*1103515245+12345>>>0}return[1,0,1,0,1,0,1,0,1]};function y({id:e}){return(0,r.jsx)(`span`,{className:`rtg-demo__mark`,"aria-hidden":`true`,children:v(e).map((e,t)=>(0,r.jsx)(`i`,{"data-on":e?``:void 0},t))})}export{_ as default};