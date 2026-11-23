// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function i({value:e,defaultValue:t=null,onValueChange:i,min:ie,max:u,step:d=1,largeStep:f,unit:p,prefix:m,locale:h,formatOptions:g,label:_,hint:ae,error:v,optional:oe=!1,size:y=`md`,className:se,inputClassName:ce,id:le,name:b,form:x,disabled:S,readOnly:C,placeholder:w,onKeyDown:ue,onBlur:de,ref:T,"aria-describedby":fe,...E}){let pe=(0,n.useId)(),D=le??`${pe}-input`,me=`${pe}-message`,O=(0,n.useRef)(null),[he,ge]=(0,n.useState)(t),k=e!==void 0,A=k?e:he,j=A!=null&&Number.isFinite(A)?A:null,[M,N]=(0,n.useState)(null),P=d>0&&Number.isFinite(d)?d:1,F=f&&f>0?f:P*10,I=ie??-1/0,L=u??1/0,R=(0,n.useMemo)(()=>{try{return new Intl.NumberFormat(h,g)}catch{return new Intl.NumberFormat(void 0,g)}},[h,g]),z=g?.style===`percent`,B=(0,n.useMemo)(()=>ee(R),[R]),V=M??(j===null?``:R.format(j)),_e=!!v||E[`aria-invalid`]===!0||E[`aria-invalid`]===`true`,H=s(v)?v:s(ae)?ae:null,ve=a.includes(y)?y:`md`,ye=_==null&&!E[`aria-label`]&&!E[`aria-labelledby`]&&typeof w==`string`?w:void 0,U=e=>Math.min(L,Math.max(I,e)),W=e=>{k||ge(e),e!==j&&i?.(e)},G=e=>{let t=e.replace(/[\s  ]/g,``);if(t===``)return null;B.group&&(t=t.split(B.group).join(``)),B.decimal!==`.`&&(t=t.split(B.decimal).join(`.`));let n=/^[-−]|[-−]$|^\(.*\)$/.test(t);if(t=t.replace(/[^\d.]/g,``),t===``||t===`.`||(t.match(/\./g)?.length??0)>1)return NaN;let r=Number(t)*(n?-1:1);return z?r/100:r},K=()=>{if(M===null)return;let e=G(M);if(N(null),e===null)return W(null);Number.isFinite(e)&&W(U(c(e,P)))},q=(e,t=P)=>{if(S||C)return;let n=M===null?j:G(M),r=n!==null&&Number.isFinite(n)?n:null,i=Number.isFinite(I)?I:0,a;if(r===null)a=U(Number.isFinite(I)?I:0);else if(t!==P)a=U(c(i+Math.round((r+e*t-i)/P)*P,P));else{let n=(r-i)/t,o=e>0?Math.floor(n+1e-9)+1:Math.ceil(n-1e-9)-1;a=U(c(i+o*t,t))}if(N(null),a===r){M!==null&&W(a);return}W(a),l(O.current,e)},J=j!==null&&j<=I,Y=j!==null&&j>=L,X=(0,n.useRef)(null),Z=()=>{X.current&&window.clearTimeout(X.current.timer),X.current=null},Q=(0,n.useRef)(q);Q.current=q;let be=e=>{Z(),Q.current(e);let t=n=>{X.current={dir:e,timer:window.setTimeout(()=>{Q.current(e),t(n>=400?120:Math.max(40,n*.9))},n)}};t(400)};(0,n.useEffect)(()=>Z,[]),(0,n.useEffect)(()=>{X.current&&(X.current.dir>0&&Y||X.current.dir<0&&J)&&Z()},[Y,J]);let xe=typeof p==`string`?p:``,Se=j===null?void 0:`${typeof m==`string`?m:``}${R.format(j)}${xe?` ${xe}`:``}`,$=e=>{let t=S||C||(e>0?Y:J);return(0,r.jsx)(`button`,{type:`button`,className:`ui-nmic__step`,tabIndex:-1,"aria-label":e>0?`Increase`:`Decrease`,"aria-controls":D,"aria-disabled":t||void 0,disabled:S,onPointerDown:n=>{n.button===0&&(n.preventDefault(),t||be(e))},onPointerUp:Z,onPointerLeave:Z,onPointerCancel:Z,onContextMenu:e=>e.preventDefault(),onClick:n=>{n.detail===0&&!t&&q(e)},children:e>0?(0,r.jsx)(ne,{}):(0,r.jsx)(te,{})})};return(0,r.jsxs)(`div`,{className:[`ui-nmic`,se].filter(Boolean).join(` `),"data-size":ve,"data-invalid":_e||void 0,"data-disabled":S||void 0,"data-readonly":C||void 0,children:[(0,r.jsx)(`style`,{href:`ui-number-input-clean`,precedence:`default`,children:re}),_!=null&&(0,r.jsxs)(`div`,{className:`ui-nmic__head`,children:[(0,r.jsx)(`label`,{className:`ui-nmic__label`,htmlFor:D,children:_}),oe&&(0,r.jsx)(`span`,{className:`ui-nmic__optional`,children:`Optional`})]}),(0,r.jsxs)(`div`,{className:`ui-nmic__box`,onPointerDown:e=>{e.target===O.current||e.target.closest(`button`)||(e.preventDefault(),O.current?.focus())},children:[m!=null&&(0,r.jsx)(`span`,{className:`ui-nmic__affix`,"data-side":`start`,children:m}),(0,r.jsx)(`input`,{...E,ref:e=>{O.current=e,typeof T==`function`?T(e):T&&(T.current=e)},id:D,className:[`ui-nmic__input`,ce].filter(Boolean).join(` `),type:`text`,inputMode:I<0?`text`:!Number.isInteger(P)||B.decimals||z?`decimal`:`numeric`,role:`spinbutton`,autoComplete:`off`,autoCorrect:`off`,spellCheck:!1,value:V,placeholder:w,disabled:S,readOnly:C,form:x,"aria-label":E[`aria-label`]??ye,"aria-valuenow":j??void 0,"aria-valuemin":Number.isFinite(I)?I:void 0,"aria-valuemax":Number.isFinite(L)?L:void 0,"aria-valuetext":Se,"aria-invalid":_e||void 0,"aria-describedby":[fe,H?me:null].filter(Boolean).join(` `)||void 0,style:{width:`calc(${Math.max(2,(V||w||``).length)}ch + 2px)`,...E.style},onChange:e=>N(e.target.value.replace(o,``)),onBlur:e=>{K(),de?.(e)},onKeyDown:e=>{if(ue?.(e),e.defaultPrevented||e.nativeEvent.isComposing)return;let t={ArrowUp:()=>q(1),ArrowDown:()=>q(-1),PageUp:()=>q(1,F),PageDown:()=>q(-1,F),Enter:()=>K(),Escape:()=>N(null)};Number.isFinite(I)&&(t.Home=()=>(N(null),W(I),l(O.current,-1))),Number.isFinite(L)&&(t.End=()=>(N(null),W(L),l(O.current,1)));let n=t[e.key];n&&!C&&(e.key!==`Escape`||M!==null)&&(e.key!==`Enter`&&e.preventDefault(),n())}}),p!=null&&(0,r.jsx)(`span`,{className:`ui-nmic__affix`,"data-side":`end`,children:p}),(0,r.jsxs)(`span`,{className:`ui-nmic__steps`,children:[$(-1),$(1)]})]}),b&&(0,r.jsx)(`input`,{type:`hidden`,name:b,form:x,value:j??``,disabled:S}),H&&(0,r.jsx)(`p`,{className:`ui-nmic__message`,id:me,dir:`auto`,"aria-live":s(v)?`polite`:void 0,children:H},s(v)?`error`:`hint`)]})}var a=[`sm`,`md`,`lg`],o=/[^\d.,'’\s  \-−%]/g,s=e=>e!=null&&typeof e!=`boolean`&&e!==``;function ee(e){let t=e.formatToParts(-12345.6789);return{group:t.find(e=>e.type===`group`)?.value??``,decimal:t.find(e=>e.type===`decimal`)?.value??`.`,decimals:(e.resolvedOptions().minimumFractionDigits??0)>0}}function c(e,t){let n=Math.max(10,(String(t).split(`.`)[1]??``).length);return Number(e.toFixed(Math.min(n,15)))}function l(e,t){e&&typeof e.animate==`function`&&(window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches||e.animate([{transform:`translateY(${t*5}px)`,opacity:.35,filter:`blur(1.5px)`},{transform:`none`,opacity:1,filter:`none`}],{duration:220,easing:`cubic-bezier(0.22, 1, 0.36, 1)`}))}function te(){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{d:`M20 12H4`})})}function ne(){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{d:`M12 4v16M20 12H4`})})}var re=`
/* Colors and motion as variables – override them on .ui-nmic (see Theming in the docs) */
.ui-nmic {
  --ui-nmic-title: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-nmic-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-nmic-subtle: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-nmic-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.3));
  --ui-nmic-icon: var(--aui-muted, rgba(0, 0, 0, 0.447));
  --ui-nmic-surface: var(--aui-surface, #ffffff);
  --ui-nmic-wash: rgba(0, 0, 0, 0.04);
  --ui-nmic-press: rgba(0, 0, 0, 0.07);
  --ui-nmic-readonly: rgba(0, 0, 0, 0.02);
  --ui-nmic-shadow: 0 0 0 0.5px var(--aui-border, rgba(0, 0, 0, 0.08)), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-nmic-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.13)), 0 1px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --ui-nmic-shadow-focus: 0 0 0 1px var(--aui-border-strong, rgba(0, 0, 0, 0.28)), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --ui-nmic-danger: var(--aui-danger, #c4320a);
  --ui-nmic-danger-edge: color-mix(in srgb, var(--aui-red, #f04438) 55%, transparent);
  --ui-nmic-danger-edge-focus: rgba(229, 72, 77, 0.8);
  --ui-nmic-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-nmic-ease: cubic-bezier(0.22, 1, 0.36, 1);

  --h: 32px;
  --px: 10px;
  --fs: 13px;
  --radius: var(--aui-radius, 7px);

  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  color: var(--ui-nmic-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-nmic[data-size="sm"] { --h: 28px; --px: 8px; --radius: calc(var(--aui-radius, 7px) - 1px); }
.ui-nmic[data-size="lg"] { --h: 36px; --px: 12px; --fs: 14px; --radius: calc(var(--aui-radius, 7px) + 1px); }
/* Touch screens: a comfortable tap height, and 16px text so iOS doesn't zoom in on focus */
@media (pointer: coarse) {
  .ui-nmic { --fs: 16px; }
  .ui-nmic[data-size="sm"] { --h: 36px; }
  .ui-nmic[data-size="md"] { --h: 40px; }
  .ui-nmic[data-size="lg"] { --h: 44px; }
}

.ui-nmic__head { display: flex; align-items: baseline; gap: 6px; min-width: 0; }
.ui-nmic__label { min-width: 0; font-weight: 500; color: var(--ui-nmic-title); overflow-wrap: anywhere; cursor: default; }
.ui-nmic__optional { flex: none; font-size: 12px; line-height: 16px; color: var(--ui-nmic-subtle); }

/* The box: white, a hairline shadow as its edge; hover and focus only make that edge firmer – no ring */
.ui-nmic__box {
  display: flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  height: var(--h);
  min-width: 0;
  padding-inline: var(--px) 4px;
  border-radius: var(--radius);
  background: var(--ui-nmic-surface);
  box-shadow: var(--ui-nmic-shadow);
  cursor: text;
  transition: box-shadow 140ms ease, background-color 140ms ease;
}
.ui-nmic__box:hover { box-shadow: var(--ui-nmic-shadow-hover); }
.ui-nmic__box:has(.ui-nmic__input:focus) { box-shadow: var(--ui-nmic-shadow-focus); }
.ui-nmic[data-invalid] .ui-nmic__box { box-shadow: 0 0 0 1px var(--ui-nmic-danger-edge), 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.ui-nmic[data-invalid] .ui-nmic__box:has(.ui-nmic__input:focus) { box-shadow: 0 0 0 1px var(--ui-nmic-danger-edge-focus), 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.ui-nmic[data-readonly] .ui-nmic__box { background: var(--ui-nmic-readonly); box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.08); cursor: default; }
.ui-nmic[data-disabled] .ui-nmic__box { background: var(--ui-nmic-readonly); box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06); cursor: not-allowed; }
.ui-nmic[data-disabled] { opacity: 0.55; }

/* The value: as wide as its text (set inline), so the unit follows it; it shrinks before the buttons do */
.ui-nmic__input {
  flex: 0 1 auto;
  min-width: 2ch;
  max-width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
  font-size: var(--fs);
  font-variant-numeric: tabular-nums;
  color: var(--ui-nmic-ink);
  text-overflow: ellipsis;
  -webkit-appearance: none;
  appearance: none;
}
.ui-nmic__input::placeholder { color: var(--ui-nmic-faint); opacity: 1; }
.ui-nmic__input:disabled { cursor: not-allowed; }

/* Prefix and unit: quiet text right against the value */
.ui-nmic__affix {
  display: inline-flex;
  flex: 0 1 auto;
  align-items: center;
  min-width: 0;
  max-width: 40%;
  font-size: var(--fs);
  color: var(--ui-nmic-subtle);
  white-space: nowrap;
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-nmic__affix[data-side="start"] { margin-inline-end: -2px; }
.ui-nmic__affix > svg { display: block; width: 16px; height: 16px; flex: none; color: var(--ui-nmic-icon); }

/* − and +: two small ghost buttons at the end */
.ui-nmic__steps { display: flex; flex: none; gap: 2px; margin-inline-start: auto; padding-inline-start: 4px; }
.ui-nmic__step {
  display: grid;
  place-items: center;
  position: relative;
  width: calc(var(--h) - 8px);
  height: calc(var(--h) - 8px);
  max-width: 26px;
  max-height: 26px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: calc(var(--radius) - 3px);
  background: transparent;
  color: var(--ui-nmic-icon);
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-nmic__step:hover:not([aria-disabled]):not(:disabled) { background: var(--ui-nmic-wash); color: var(--ui-nmic-ink); }
.ui-nmic__step:active:not([aria-disabled]):not(:disabled) { background: var(--ui-nmic-press); }
.ui-nmic__step:focus-visible { outline: 2px solid var(--ui-nmic-focus); outline-offset: -2px; }
.ui-nmic__step[aria-disabled], .ui-nmic__step:disabled { opacity: 0.35; cursor: default; }
.ui-nmic__step svg { display: block; transition: transform 120ms var(--ui-nmic-ease); }
.ui-nmic__step:active:not([aria-disabled]):not(:disabled) svg { transform: scale(0.86); }
.ui-nmic[data-readonly] .ui-nmic__steps { display: none; }
/* Touch screens: bigger buttons and a hit area that reaches past them */
@media (pointer: coarse) {
  .ui-nmic__step { width: 32px; height: 32px; max-width: none; max-height: none; }
  .ui-nmic__step::before { content: ""; position: absolute; inset: -4px 0; }
}

/* Under the field: the hint, or the error in its place */
.ui-nmic__message {
  margin: 0;
  font-size: 12px;
  line-height: 16px;
  color: var(--ui-nmic-subtle);
  overflow-wrap: anywhere;
  animation: ui-nmic-message 260ms var(--ui-nmic-ease);
}
.ui-nmic[data-invalid] .ui-nmic__message { color: var(--ui-nmic-danger); }

@keyframes ui-nmic-message {
  from { opacity: 0; transform: translateY(-3px); filter: blur(2px); }
}

@media (prefers-reduced-motion: reduce) {
  .ui-nmic * { animation-duration: 1ms !important; transition-duration: 1ms !important; }
  .ui-nmic__box { transition-duration: 1ms; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-nmic {
  --ui-nmic-title: var(--aui-ink, rgba(255, 255, 255, 0.92));
  --ui-nmic-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-nmic-subtle: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-nmic-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.3));
  --ui-nmic-icon: var(--aui-muted, rgba(255, 255, 255, 0.5));
  --ui-nmic-surface: var(--aui-surface, #1c1c1e);
  --ui-nmic-wash: rgba(255, 255, 255, 0.07);
  --ui-nmic-press: rgba(255, 255, 255, 0.11);
  --ui-nmic-readonly: rgba(255, 255, 255, 0.03);
  --ui-nmic-shadow: 0 0 0 0.5px var(--aui-border, rgba(255, 255, 255, 0.14)), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-nmic-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.2)), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-nmic-shadow-focus: 0 0 0 1px var(--aui-border-strong, rgba(255, 255, 255, 0.3)), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-nmic-danger: var(--aui-danger, #ff8a7a);
  --ui-nmic-danger-edge: color-mix(in srgb, var(--aui-red, #ff6b5f) 50%, transparent);
  --ui-nmic-danger-edge-focus: rgba(255, 99, 105, 0.75);
  --ui-nmic-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
}
:where(.dark, [data-theme="dark"]) .ui-nmic[data-readonly] .ui-nmic__box,
:where(.dark, [data-theme="dark"]) .ui-nmic[data-disabled] .ui-nmic__box { box-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.12); }
`,ie={minimumFractionDigits:2,maximumFractionDigits:2},u={minimumFractionDigits:1,maximumFractionDigits:1};function d(){let[e,t]=(0,n.useState)(32e3),[a,o]=(0,n.useState)(25);return(0,r.jsx)(`div`,{className:`nmi-demo`,children:(0,r.jsxs)(`form`,{className:`nmi-democ`,onSubmit:e=>e.preventDefault(),children:[(0,r.jsx)(i,{label:`Max tokens per run`,unit:`tokens`,value:e,onValueChange:t,min:1e3,max:2e5,step:1e3,locale:`en-US`,hint:`The answer stops here – Page Up adds 10,000.`}),(0,r.jsx)(i,{label:`Budget per run`,prefix:`$`,value:a,onValueChange:o,min:0,max:100,step:5,locale:`en-US`,formatOptions:ie,hint:a===null?`No limit – runs until done.`:`Your plan allows up to $100.`}),(0,r.jsxs)(`div`,{className:`nmi-democ__row`,children:[(0,r.jsx)(i,{label:`Parallel agents`,defaultValue:3,min:1,max:8,hint:`Up to 8`}),(0,r.jsx)(i,{label:`Temperature`,defaultValue:.7,min:0,max:2,step:.1,locale:`en-US`,formatOptions:u,hint:`0 to 2`})]})]})})}export{d as default};