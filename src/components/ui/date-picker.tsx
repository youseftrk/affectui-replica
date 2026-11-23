// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
var i=e=>e instanceof Date&&!Number.isNaN(e.getTime()),a=e=>new Date(e.getFullYear(),e.getMonth(),e.getDate()),o=(e,t)=>new Date(e.getFullYear(),e.getMonth(),e.getDate()+t),s=e=>new Date(e.getFullYear(),e.getMonth(),1),c=(e,t)=>new Date(e,t+1,0).getDate(),l=(e,t)=>new Date(e.getFullYear(),e.getMonth()+t,Math.min(e.getDate(),c(e.getFullYear(),e.getMonth()+t))),u=(e,t)=>!!e&&!!t&&e.getTime()===t.getTime(),d=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth(),f=(e,t,n)=>t&&e<t?t:n&&e>n?n:e,p=e=>String(e).padStart(2,`0`),ee=e=>`${String(e.getFullYear()).padStart(4,`0`)}-${p(e.getMonth()+1)}-${p(e.getDate())}`;function te(e,t){let n=s(e),r=o(n,-((n.getDay()-t+7)%7));return Array.from({length:6},(e,t)=>Array.from({length:7},(e,n)=>o(r,t*7+n)))}function ne(e){if(e)try{return Intl.getCanonicalLocales(e)[0]}catch{return}}var m=new Set([`US`,`CA`,`MX`,`BR`,`JP`,`KR`,`TW`,`HK`,`IL`,`PH`,`IN`,`ZA`,`SA`,`PE`,`CO`,`VE`,`GT`,`PR`]);function re(e){try{let t=new Intl.Locale(e??new Intl.DateTimeFormat().resolvedOptions().locale),n=t.getWeekInfo?.()??t.weekInfo;if(n&&n.firstDay>=1&&n.firstDay<=7)return n.firstDay%7;let r=t.maximize().region;return r&&m.has(r)?0:1}catch{return 1}}function h({value:e,defaultValue:t=null,onChange:c,min:p,max:m,isDateDisabled:h,locale:_,weekStartsOn:v,placeholder:y=`Pick a date`,label:b,hint:ue,error:x,optional:de=!1,size:S=`md`,disabled:C=!1,name:w,required:fe,today:T,defaultOpen:pe=!1,id:me,className:he,"aria-label":E,ref:D}){let O=(0,n.useId)(),k=me??`${O}-trigger`,ge=`${O}-panel`,_e=`${O}-label`,A=`${O}-title`,ve=`${O}-message`,j=ne(_),M=(0,n.useMemo)(()=>{let e=e=>new Intl.DateTimeFormat(j,{...e,calendar:`gregory`});return{value:e({weekday:`short`,month:`short`,day:`numeric`,year:`numeric`}),month:e({month:`long`,year:`numeric`}),long:e({weekday:`long`,month:`long`,day:`numeric`,year:`numeric`}),day:t=>e({day:`numeric`}).formatToParts(t).find(e=>e.type===`day`)?.value??String(t.getDate()),wdShort:e({weekday:`short`}),wdNarrow:e({weekday:`narrow`}),wdLong:e({weekday:`long`})}},[j]),N=v!=null&&v>=0&&v<=6?Math.floor(v):re(j),P=i(T)?a(T).getTime():void 0,F=(0,n.useMemo)(()=>P==null?a(new Date):new Date(P),[P]),I=i(p)?a(p):void 0,L=i(m)&&(!I||a(m)>=I)?a(m):void 0,R=e=>!!I&&e<I||!!L&&e>L||!!h?.(e),[ye,be]=(0,n.useState)(()=>i(t)?a(t):null),z=e===void 0?ye:i(e)?a(e):null,B=()=>f(z??F,I,L),[V,xe]=(0,n.useState)(pe&&!C),[H,U]=(0,n.useState)(B),[W,G]=(0,n.useState)(()=>s(B())),[Se,Ce]=(0,n.useState)(1),K=(0,n.useRef)(null),q=(0,n.useRef)(null),J=(0,n.useRef)(!1),we=!!x,Y=g(x)?x:g(ue)?ue:null,Te=ie.includes(S)?S:`md`,X=()=>{if(C)return;let e=B();U(e),G(s(e)),J.current=!0,xe(!0)},Z=(e=!0)=>{xe(!1),J.current=!1,e&&K.current?.focus({preventScroll:!0})},Ee=t=>{R(t)||(e===void 0&&be(t),u(t,z)||c?.(t),Z())},De=e=>{let t=s(e);t.getTime()!==W.getTime()&&(Ce(t>W?1:-1),G(t))},Oe=e=>{J.current=!1;let t=new Date(W.getFullYear(),W.getMonth()+e,1);U(f(l(H,e),I,L)),Ce(e>0?1:-1),G(t)},ke=!I||s(I)<W,Ae=!L||s(L)>W;(0,n.useLayoutEffect)(()=>{let e=q.current;if(!V||!e)return;`showPopover`in e&&!e.matches(`:popover-open`)&&e.showPopover();let t=()=>{let t=K.current;t&&ae(e,t)};return t(),window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0),`hidePopover`in e&&e.isConnected&&e.matches(`:popover-open`)&&e.hidePopover()}},[V]),(0,n.useLayoutEffect)(()=>{V&&J.current&&q.current?.querySelector(`[data-day="${H.getTime()}"]`)?.focus({preventScroll:!0})},[V,H,W]),(0,n.useEffect)(()=>{if(!V)return;let e=e=>{let t=e.target;K.current?.contains(t)||q.current?.contains(t)||Z(!1)};return document.addEventListener(`pointerdown`,e,!0),()=>document.removeEventListener(`pointerdown`,e,!0)},[V]);let je=e=>{let t=getComputedStyle(e.currentTarget).direction===`rtl`?-1:1,n=null;switch(e.key){case`ArrowLeft`:n=o(H,-t);break;case`ArrowRight`:n=o(H,t);break;case`ArrowUp`:n=o(H,-7);break;case`ArrowDown`:n=o(H,7);break;case`PageUp`:n=l(H,e.shiftKey?-12:-1);break;case`PageDown`:n=l(H,e.shiftKey?12:1);break;case`Home`:n=o(H,-((H.getDay()-N+7)%7));break;case`End`:n=o(H,6-(H.getDay()-N+7)%7);break;case`Enter`:case` `:e.preventDefault(),Ee(H);return;default:return}e.preventDefault(),n=f(n,I,L),J.current=!0,U(n),De(n)},Q=te(W,N),$=Q.flat(),Me=$.some(e=>u(e,H))?H:$.find(e=>d(e,W)&&!R(e))??$.find(e=>d(e,W)),Ne=Q[0].map(e=>{let t=M.wdShort.format(e).replace(/\.$/,``),n=/^\p{Script=Latin}/u.test(t)?t.slice(0,2):t.length>3?M.wdNarrow.format(e):t;return{key:e.getDay(),text:n,long:M.wdLong.format(e)}});return(0,r.jsxs)(`div`,{className:[`ui-dpkc`,he].filter(Boolean).join(` `),"data-size":Te,"data-open":V||void 0,"data-invalid":we||void 0,"data-disabled":C||void 0,children:[(0,r.jsx)(`style`,{href:`ui-date-picker-clean`,precedence:`default`,children:le}),b!=null&&(0,r.jsxs)(`div`,{className:`ui-dpkc__head`,children:[(0,r.jsx)(`label`,{className:`ui-dpkc__label`,id:_e,htmlFor:k,children:b}),de&&(0,r.jsx)(`span`,{className:`ui-dpkc__optional`,children:`Optional`})]}),(0,r.jsxs)(`button`,{ref:e=>{K.current=e,typeof D==`function`?D(e):D&&(D.current=e)},id:k,type:`button`,className:`ui-dpkc__trigger`,"aria-haspopup":`dialog`,"aria-expanded":V,"aria-controls":V?ge:void 0,"aria-label":E?`${E}, ${z?M.long.format(z):y}`:void 0,"aria-labelledby":E||b==null?void 0:`${_e} ${k}`,"aria-describedby":Y?ve:void 0,"aria-invalid":we||void 0,"aria-required":fe||void 0,disabled:C,onClick:()=>V?Z():X(),onKeyDown:e=>{!V&&(e.key===`ArrowDown`||e.key===`ArrowUp`)?(e.preventDefault(),X()):V&&e.key===`Escape`&&(e.preventDefault(),Z())},children:[(0,r.jsx)(`span`,{className:`ui-dpkc__icon`,"aria-hidden":`true`,children:(0,r.jsx)(oe,{})}),(0,r.jsx)(`span`,{className:`ui-dpkc__value`,"data-empty":z?void 0:``,children:z?M.value.format(z):y},z?z.getTime():`empty`),(0,r.jsx)(`span`,{className:`ui-dpkc__chevron`,"aria-hidden":`true`,children:(0,r.jsx)(ce,{})})]}),w&&(0,r.jsx)(`input`,{type:`hidden`,name:w,value:z?ee(z):``}),V&&(0,r.jsxs)(`div`,{ref:q,id:ge,className:`ui-dpkc__panel`,role:`dialog`,"aria-modal":`false`,"aria-labelledby":A,popover:`manual`,onKeyDown:e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),Z())},onBlur:e=>{let t=e.relatedTarget;t&&!q.current?.contains(t)&&!K.current?.contains(t)&&Z(!1)},children:[(0,r.jsxs)(`div`,{className:`ui-dpkc__nav`,children:[(0,r.jsx)(`button`,{type:`button`,className:`ui-dpkc__arrow`,"aria-label":`Previous month`,disabled:!ke,onClick:()=>Oe(-1),children:(0,r.jsx)(se,{d:`M15 6C15 6 9 10.42 9 12C9 13.58 15 18 15 18`})}),(0,r.jsx)(`div`,{className:`ui-dpkc__title`,id:A,"aria-live":`polite`,children:(0,r.jsx)(`span`,{"data-dir":Se,children:M.month.format(W)},W.getTime())}),(0,r.jsx)(`button`,{type:`button`,className:`ui-dpkc__arrow`,"aria-label":`Next month`,disabled:!Ae,onClick:()=>Oe(1),children:(0,r.jsx)(se,{d:`M9 6C9 6 15 10.42 15 12C15 13.58 9 18 9 18`})})]}),(0,r.jsxs)(`div`,{role:`grid`,"aria-labelledby":A,className:`ui-dpkc__grid`,onKeyDown:je,onPointerDown:()=>J.current=!1,children:[(0,r.jsx)(`div`,{role:`row`,className:`ui-dpkc__weekdays`,children:Ne.map(e=>(0,r.jsx)(`span`,{role:`columnheader`,"aria-label":e.long,className:`ui-dpkc__weekday`,children:(0,r.jsx)(`abbr`,{title:e.long,children:e.text})},e.key))}),(0,r.jsx)(`div`,{className:`ui-dpkc__weeks`,"data-dir":Se,children:Q.map((e,t)=>(0,r.jsx)(`div`,{role:`row`,className:`ui-dpkc__week`,children:e.map(e=>{let t=u(e,z),n=R(e);return(0,r.jsx)(`span`,{role:`gridcell`,"aria-selected":t,className:`ui-dpkc__cell`,children:(0,r.jsx)(`button`,{type:`button`,className:`ui-dpkc__day`,"data-day":e.getTime(),"data-outside":!d(e,W)||void 0,"data-chosen":t||void 0,tabIndex:u(e,Me)?0:-1,"aria-label":M.long.format(e),"aria-current":u(e,F)?`date`:void 0,"aria-disabled":n||void 0,onClick:()=>Ee(e),onFocus:()=>u(e,H)||U(e),children:M.day(e)})},e.getTime())})},t))},W.getTime())]})]}),Y&&(0,r.jsx)(`p`,{className:`ui-dpkc__message`,id:ve,"aria-live":g(x)?`polite`:void 0,children:Y},g(x)?`error`:`hint`)]})}var ie=[`sm`,`md`,`lg`],g=e=>e!=null&&typeof e!=`boolean`&&e!==``;function ae(e,t){let n=t.getBoundingClientRect(),r=document.documentElement.clientWidth||window.innerWidth,i=window.innerHeight,a=e.offsetWidth,o=e.offsetHeight,s=i-n.bottom-6-8,c=n.top-6-8,l=s<o&&c>s,u=getComputedStyle(t).direction===`rtl`,d=Math.min(Math.max(8,u?n.right-a:n.left),Math.max(8,r-8-a)),f=l?Math.max(8,n.top-6-o):n.bottom+6;e.style.left=`${Math.round(d)}px`,e.style.top=`${Math.round(f)}px`,e.toggleAttribute(`data-up`,l)}function oe(){return(0,r.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:[(0,r.jsx)(`path`,{d:`M16 2V6M8 2V6`}),(0,r.jsx)(`path`,{d:`M13 4H11C7.23 4 5.34 4 4.17 5.17C3 6.34 3 8.23 3 12V14C3 17.77 3 19.66 4.17 20.83C5.34 22 7.23 22 11 22H13C16.77 22 18.66 22 19.83 20.83C21 19.66 21 17.77 21 14V12C21 8.23 21 6.34 19.83 5.17C18.66 4 16.77 4 13 4Z`}),(0,r.jsx)(`path`,{d:`M3 10H21`}),(0,r.jsx)(`path`,{d:`M12 14H12.01M12 18H12.01M7.5 14H7.51M7.5 18H7.51M16.5 14H16.51`,strokeWidth:`2`})]})}function se({d:e}){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{d:e})})}function ce(){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`14`,height:`14`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{d:`M18 9C18 9 13.58 15 12 15C10.42 15 6 9 6 9`})})}var le=`
/* Colors and motion as variables – override them on .ui-dpkc (see Theming in the docs) */
.ui-dpkc {
  --ui-dpkc-title: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-dpkc-strong: var(--aui-ink, #000000);
  --ui-dpkc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-dpkc-subtle: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-dpkc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.27));
  --ui-dpkc-icon: var(--aui-muted, rgba(0, 0, 0, 0.447));
  --ui-dpkc-surface: var(--aui-surface, #ffffff);
  --ui-dpkc-card: var(--aui-overlay, var(--aui-surface, #ffffff));
  --ui-dpkc-wash: rgba(0, 0, 0, 0.045);
  --ui-dpkc-readonly: rgba(0, 0, 0, 0.02);
  /* The chosen day: a dark chip; today: blue text and a dot */
  --ui-dpkc-chip: var(--aui-primary, rgba(0, 0, 0, 0.88));
  --ui-dpkc-on-chip: var(--aui-on-primary, #fcfcfc);
  --ui-dpkc-accent: rgba(0, 96, 226, 0.765);
  --ui-dpkc-today-on-chip: var(--aui-blue, #4fb0fe);
  --ui-dpkc-shadow: 0 0 0 0.5px var(--aui-border, rgba(0, 0, 0, 0.08)), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-dpkc-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.13)), 0 1px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --ui-dpkc-shadow-open: 0 0 0 1px var(--aui-border-strong, rgba(0, 0, 0, 0.28)), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --ui-dpkc-shadow-pop: var(--aui-shadow-popover, 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 8px 24px -6px rgba(0, 0, 0, 0.14), 0 2px 6px -2px rgba(0, 0, 0, 0.06));
  --ui-dpkc-danger: var(--aui-danger, #c4320a);
  --ui-dpkc-danger-edge: color-mix(in srgb, var(--aui-red, #f04438) 55%, transparent);
  --ui-dpkc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-dpkc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));
  --ui-dpkc-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  --h: 32px;
  --px: 10px;
  --fs: 13px;
  --radius: var(--aui-radius, 7px);
  --cell: 32px;

  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  color: var(--ui-dpkc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-dpkc[data-size="sm"] { --h: 28px; --px: 8px; --radius: calc(var(--aui-radius, 7px) - 1px); }
.ui-dpkc[data-size="lg"] { --h: 36px; --px: 12px; --fs: 14px; --radius: calc(var(--aui-radius, 7px) + 1px); }
/* Touch screens: a comfortable tap height, 16px text and bigger days */
@media (pointer: coarse) {
  .ui-dpkc { --fs: 16px; --cell: 40px; }
  .ui-dpkc[data-size="sm"] { --h: 34px; }
  .ui-dpkc[data-size="md"] { --h: 38px; }
  .ui-dpkc[data-size="lg"] { --h: 40px; }
}
.ui-dpkc *, .ui-dpkc *::before, .ui-dpkc *::after { box-sizing: border-box; }
:where(.ui-dpkc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
:where(.ui-dpkc) svg { display: block; flex: none; }
.ui-dpkc button:focus-visible { outline: 2px solid var(--ui-dpkc-focus); outline-offset: 2px; }

.ui-dpkc__head { display: flex; align-items: baseline; gap: 6px; min-width: 0; }
.ui-dpkc__label { min-width: 0; font-weight: 500; color: var(--ui-dpkc-title); overflow-wrap: anywhere; cursor: default; }
.ui-dpkc__optional { flex: none; font-size: 12px; line-height: 16px; color: var(--ui-dpkc-subtle); }

/* The field: the Text Field's look – white, a hairline edge that firms up on hover and while open */
.ui-dpkc__trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: var(--h);
  min-width: 0;
  padding: 0 calc(var(--px) - 2px) 0 var(--px);
  border-radius: var(--radius);
  background: var(--ui-dpkc-surface);
  box-shadow: var(--ui-dpkc-shadow);
  font-size: var(--fs);
  color: var(--ui-dpkc-ink);
  text-align: start;
  transition: box-shadow 140ms ease, background-color 140ms ease;
}
.ui-dpkc__trigger:hover { box-shadow: var(--ui-dpkc-shadow-hover); }
.ui-dpkc[data-open] .ui-dpkc__trigger { box-shadow: var(--ui-dpkc-shadow-open); }
.ui-dpkc[data-invalid] .ui-dpkc__trigger { box-shadow: 0 0 0 1px var(--ui-dpkc-danger-edge), 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.ui-dpkc__trigger:disabled { background: var(--ui-dpkc-readonly); box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06); cursor: not-allowed; }
.ui-dpkc[data-disabled] { opacity: 0.55; }
.ui-dpkc__icon, .ui-dpkc__chevron { display: grid; flex: none; place-items: center; width: 16px; height: 16px; color: var(--ui-dpkc-icon); }
.ui-dpkc__chevron { transition: transform 240ms var(--ui-dpkc-ease); }
.ui-dpkc[data-open] .ui-dpkc__chevron { transform: rotate(180deg); }
.ui-dpkc__value { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-variant-numeric: tabular-nums; animation: ui-dpkc-value 240ms var(--ui-dpkc-ease) both; }
.ui-dpkc__value[data-empty] { color: var(--ui-dpkc-faint); animation: none; }

/* The card: white in the top layer, a 0.5px edge and a soft drop */
.ui-dpkc__panel {
  position: fixed;
  inset: auto;
  z-index: 1000;
  width: calc(var(--cell) * 7 + 16px);
  max-width: calc(100vw - 16px);
  margin: 0;
  padding: 8px;
  border: 0;
  border-radius: 10px;
  background: var(--ui-dpkc-card);
  box-shadow: var(--ui-dpkc-shadow-pop);
  color: var(--ui-dpkc-ink);
  font: inherit;
  font-size: 13px;
  overflow: hidden;
  transform-origin: top left;
  animation: ui-dpkc-open 200ms var(--ui-dpkc-ease) both;
}
.ui-dpkc__panel:dir(rtl) { transform-origin: top right; }
.ui-dpkc__panel[data-up] { transform-origin: bottom left; animation-name: ui-dpkc-open-up; }
.ui-dpkc__panel::backdrop { display: none; }

/* Month name between the two arrows */
.ui-dpkc__nav { display: flex; align-items: center; gap: 4px; height: 28px; margin-bottom: 4px; }
.ui-dpkc__title { flex: 1; min-width: 0; overflow: hidden; text-align: center; font-weight: 500; white-space: nowrap; color: var(--ui-dpkc-strong); }
.ui-dpkc__title > span { display: block; overflow: hidden; text-overflow: ellipsis; animation: ui-dpkc-fade 220ms var(--ui-dpkc-ease) both; }
.ui-dpkc__arrow { display: grid; flex: none; place-items: center; width: 28px; height: 28px; border-radius: 6px; color: var(--ui-dpkc-icon); transition: background-color 120ms ease, color 120ms ease; }
.ui-dpkc__arrow:hover:not(:disabled) { background: var(--ui-dpkc-wash); color: var(--ui-dpkc-ink); }
.ui-dpkc__arrow:disabled { opacity: 0.35; cursor: default; }
.ui-dpkc__arrow:dir(rtl) svg { transform: scaleX(-1); }

/* The month: weekday heads and six weeks of days that touch */
.ui-dpkc__grid { display: grid; }
.ui-dpkc__weekdays, .ui-dpkc__week { display: grid; grid-template-columns: repeat(7, minmax(0, var(--cell))); justify-content: center; }
.ui-dpkc__weekday { height: 24px; overflow: hidden; font-size: 10px; font-weight: 500; line-height: 24px; letter-spacing: 0.5px; text-transform: uppercase; text-align: center; white-space: nowrap; color: var(--ui-dpkc-subtle); }
.ui-dpkc__weekday abbr { text-decoration: none; cursor: default; }
.ui-dpkc__weeks { animation: ui-dpkc-slide 260ms var(--ui-dpkc-ease) both; }
.ui-dpkc__weeks[data-dir="-1"] { animation-name: ui-dpkc-slide-back; }
.ui-dpkc__cell { display: grid; height: var(--cell); }
.ui-dpkc__day {
  position: relative;
  margin: 2px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
  color: var(--ui-dpkc-ink);
  transition: background-color 120ms ease, color 120ms ease, transform 160ms var(--ui-dpkc-ease);
}
.ui-dpkc__day:hover:not([aria-disabled]):not([data-chosen]) { background: var(--ui-dpkc-wash); }
.ui-dpkc__day:active:not([aria-disabled]) { transform: scale(0.94); }
/* Days of the months around: quieter, still a press away */
.ui-dpkc__day[data-outside] { color: var(--ui-dpkc-subtle); }
.ui-dpkc__day[aria-disabled] { color: var(--ui-dpkc-faint); cursor: default; }
/* The days touch each other: their ring sits inside */
.ui-dpkc .ui-dpkc__day:focus-visible { outline-offset: -2px; }
/* Today: blue, with a small dot under the number */
.ui-dpkc__day[aria-current="date"] { color: var(--ui-dpkc-accent); font-weight: 500; }
.ui-dpkc__day[aria-current="date"]::after { content: ""; position: absolute; left: 50%; bottom: 3px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: currentColor; }
/* The chosen day: a dark chip that pops in */
.ui-dpkc__day[data-chosen] { background: var(--ui-dpkc-chip); color: var(--ui-dpkc-on-chip); font-weight: 500; animation: ui-dpkc-pick 380ms var(--ui-dpkc-spring); }
.ui-dpkc__day[data-chosen][aria-current="date"]::after { background: var(--ui-dpkc-today-on-chip); }

.ui-dpkc__message { margin: 0; font-size: 12px; line-height: 16px; color: var(--ui-dpkc-subtle); overflow-wrap: anywhere; animation: ui-dpkc-message 260ms var(--ui-dpkc-ease); }
.ui-dpkc[data-invalid] .ui-dpkc__message { color: var(--ui-dpkc-danger); }

@keyframes ui-dpkc-open { from { opacity: 0; transform: translateY(-4px) scale(0.98); } }
@keyframes ui-dpkc-open-up { from { opacity: 0; transform: translateY(4px) scale(0.98); } }
@keyframes ui-dpkc-slide { from { opacity: 0; transform: translateX(12px); } }
@keyframes ui-dpkc-slide-back { from { opacity: 0; transform: translateX(-12px); } }
@keyframes ui-dpkc-fade { from { opacity: 0; } }
@keyframes ui-dpkc-value { from { opacity: 0; transform: translateY(3px); } }
@keyframes ui-dpkc-pick { 0% { transform: scale(0.82); } 60% { transform: scale(1.06); } 100% { transform: scale(1); } }
@keyframes ui-dpkc-message { from { opacity: 0; transform: translateY(-3px); filter: blur(2px); } }

@media (prefers-reduced-motion: reduce) {
  .ui-dpkc *, .ui-dpkc *::before, .ui-dpkc *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-dpkc {
  --ui-dpkc-title: var(--aui-ink, rgba(255, 255, 255, 0.92));
  --ui-dpkc-strong: var(--aui-ink, #ffffff);
  --ui-dpkc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-dpkc-subtle: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-dpkc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.28));
  --ui-dpkc-icon: var(--aui-muted, rgba(255, 255, 255, 0.5));
  --ui-dpkc-surface: var(--aui-surface, #1c1c1e);
  --ui-dpkc-card: var(--aui-overlay, var(--aui-surface, #1f1f22));
  --ui-dpkc-wash: rgba(255, 255, 255, 0.07);
  --ui-dpkc-readonly: rgba(255, 255, 255, 0.03);
  --ui-dpkc-chip: var(--aui-primary, rgba(255, 255, 255, 0.9));
  --ui-dpkc-on-chip: var(--aui-on-primary, #111113);
  --ui-dpkc-accent: var(--aui-blue, #4fb0fe);
  --ui-dpkc-today-on-chip: #0070d6;
  --ui-dpkc-shadow: 0 0 0 0.5px var(--aui-border, rgba(255, 255, 255, 0.14)), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-dpkc-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.2)), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-dpkc-shadow-open: 0 0 0 1px var(--aui-border-strong, rgba(255, 255, 255, 0.3)), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-dpkc-shadow-pop: var(--aui-shadow-popover, 0 0 0 0.5px rgba(255, 255, 255, 0.12), 0 12px 32px -8px rgba(0, 0, 0, 0.6));
  --ui-dpkc-danger: var(--aui-danger, #ff8a7a);
  --ui-dpkc-danger-edge: color-mix(in srgb, var(--aui-red, #ff6b5f) 50%, transparent);
  --ui-dpkc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
  color-scheme: dark;
}
`,_=e=>e.getDay()===0||e.getDay()===6,v=e=>{let t=new Date;return t.setHours(0,0,0,0),t.setDate(t.getDate()+e),t},y=()=>{let e=v(1);for(;_(e);)e=new Date(e.getFullYear(),e.getMonth(),e.getDate()+1);return e};function b(){let[e,t]=(0,n.useState)(y),[i,a]=(0,n.useState)(null);return(0,r.jsx)(`div`,{className:`dpk-demo`,children:(0,r.jsxs)(`form`,{className:`dpk-democ`,onSubmit:e=>e.preventDefault(),children:[(0,r.jsx)(h,{label:`First run`,value:e,onChange:t,min:v(0),isDateDisabled:_,hint:`Research Agent only runs on weekdays.`}),(0,r.jsx)(h,{label:`Stop after`,optional:!0,value:i,onChange:a,min:e??v(0),placeholder:`Keeps running`})]})})}export{b as default};