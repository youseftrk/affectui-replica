// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
var i=1440,a=e=>String(e).padStart(2,`0`),o=e=>{let t=typeof e==`string`?e.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/):null;if(!t)return null;let n=Number(t[1]),r=Number(t[2]);return n<24&&r<60?n*60+r:null},s=e=>`${a(Math.floor(e/60))}:${a(e%60)}`,c=e=>e.toLowerCase().replace(/[.\s\u00a0\u202f]/g,``),l=[1632,1776,2406,2534,2662,2790,2918,3046,3174,3302,3430,3664,3792,3872,4160,6112,6160,65296],u=e=>e.replace(/\p{Nd}/gu,e=>{let t=e.codePointAt(0),n=l.find(e=>t>=e&&t<=e+9);return n==null?e:String(t-n)});function d(e){if(e)try{return Intl.getCanonicalLocales(e)[0]}catch{return}}function f(e,t,n){let r=u(e).trim().toLowerCase();if(!r)return null;let i=``,a=``,o,s=0,l=r.match(/^(\D*?)\s*(\d{1,2})(?:\s*[:.h]\s*(\d{2}))?\s*(\D*)$/),d=l?null:r.match(/^(\D*?)\s*(\d{3,4})\s*(\D*)$/);if(l)[,i,,,a]=l,o=Number(l[2]),s=l[3]?Number(l[3]):0;else if(d)[,i,,a]=d,o=Number(d[2].slice(0,-2)),s=Number(d[2].slice(-2));else return null;let f=c(i),p=c(a);if(f&&p)return null;let m=f||p,h=m?t.has(m)?`am`:n.has(m)?`pm`:void 0:null;if(h===void 0||s>59)return null;if(h){if(o<1||o>12)return null;o=o%12+(h===`pm`?12:0)}else if(o===24&&s===0)o=0;else if(o>23)return null;return o*60+s}function p({value:e,defaultValue:t=null,onChange:a,step:l=15,min:p,max:ae,hourCycle:g,locale:oe,placeholder:se,label:_,hint:v,error:y,optional:ce=!1,size:b=`md`,disabled:x=!1,name:le,required:ue,id:de,className:fe,"aria-label":pe,ref:S}){let C=(0,n.useId)(),w=de??`${C}-input`,T=`${C}-list`,E=`${C}-label`,me=`${C}-message`,he=e=>`${C}-option-${e}`,D=d(oe),{format:O,am:ge,pm:_e}=(0,n.useMemo)(()=>{let e=g===12||g===24?g===12:/h1[12]/.test(new Intl.DateTimeFormat(D,{hour:`numeric`}).resolvedOptions().hourCycle??``),t=new Intl.DateTimeFormat(D,{hour:e?`numeric`:`2-digit`,minute:`2-digit`,hourCycle:e?`h12`:`h23`}),n=e=>{let t=new Intl.DateTimeFormat(D,{hour:`numeric`,hourCycle:`h12`}).formatToParts(new Date(2e3,0,1,e)).find(e=>e.type===`dayPeriod`);return t?c(t.value):``};return{format:e=>t.format(new Date(2e3,0,1,Math.floor(e/60),e%60)),am:new Set([`a`,`am`,n(1)].filter(Boolean)),pm:new Set([`p`,`pm`,n(13)].filter(Boolean))}},[D,g]),k=Number.isFinite(l)?Math.min(i,Math.max(1,Math.round(l))):15,A=o(p)??0,j=o(ae),M=j!=null&&j>=A?j:1439,N=(0,n.useMemo)(()=>{let e=[];for(let t=A;t<=M;t+=k)e.push(t);return e},[A,M,k]),[ve,ye]=(0,n.useState)(()=>o(t)),P=e===void 0?ve:o(e),F=P==null?``:O(P),[I,be]=(0,n.useState)(F),[L,R]=(0,n.useState)(!1),[z,B]=(0,n.useState)(!1),[V,H]=(0,n.useState)(-1),[U,xe]=(0,n.useState)(null),W=(0,n.useRef)(!1),G=(0,n.useRef)(!1),K=(0,n.useRef)(null),q=(0,n.useRef)(null),J=(0,n.useRef)(null),Se=L?I:F,Ce=!!y,Y=h(y)?y:h(v)?v:null,we=m.includes(b)?b:`md`,Te=e=>{let t=N.findIndex(t=>t>=e);return t<0?N.length-1:t},Ee=()=>{let e=new Date;return e.getHours()*60+e.getMinutes()},X=e=>{if(x||!N.length)return;let t=P==null?-1:N.indexOf(P);H(e??(t>=0?t:Te(P??Ee()))),W.current=!1,G.current=!0,B(!0)},Z=()=>{B(!1),xe(null)},Q=t=>{e===void 0&&ye(t),t!==P&&a?.(t==null?null:s(t)),R(!1)},De=e=>{e<0||e>=N.length||(Q(N[e]),Z())},Oe=()=>{if(!L)return;let e=I.trim()?f(I,ge,_e):null;I.trim()?e!=null&&e>=A&&e<=M?Q(e):R(!1):Q(null)},ke=e=>{if(be(e),R(!0),W.current=!1,!N.length)return;let t=e.trim()?f(e,ge,_e):null,n=c(u(e)),r=t==null?n?N.findIndex(e=>c(u(O(e))).startsWith(n)):-1:Te(t);z||(G.current=!0,B(!0)),r>=0&&H(r)};(0,n.useLayoutEffect)(()=>{let e=J.current;if(!z||!e)return;`showPopover`in e&&!e.matches(`:popover-open`)&&e.showPopover();let t=t=>{t?.type===`scroll`&&t.target instanceof Node&&e.contains(t.target)||q.current&&ee(e,q.current)};return t(),window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0),`hidePopover`in e&&e.isConnected&&e.matches(`:popover-open`)&&e.hidePopover()}},[z]),(0,n.useLayoutEffect)(()=>{if(!z||V<0)return;let e=J.current,t=e?.querySelector(`[data-index="${V}"]`);e&&t&&(xe({top:t.offsetTop,height:t.offsetHeight}),G.current?(e.scrollTop=t.offsetTop-(e.clientHeight-t.offsetHeight)/2,G.current=!1):t.scrollIntoView({block:`nearest`}))},[V,z]),(0,n.useEffect)(()=>{if(!z)return;let e=e=>{let t=e.target;q.current?.contains(t)||J.current?.contains(t)||Z()};return document.addEventListener(`pointerdown`,e,!0),()=>document.removeEventListener(`pointerdown`,e,!0)},[z]);let $=e=>{if(!z)return X();W.current=!0,H(t=>Math.min(N.length-1,Math.max(0,(t<0?0:t)+e)))},Ae=e=>{if(x)return;let t=Math.max(1,Math.round(60/k));switch(e.key){case`ArrowDown`:e.preventDefault(),e.altKey&&!z?X():$(1);break;case`ArrowUp`:e.preventDefault(),$(-1);break;case`PageDown`:if(!z)return;e.preventDefault(),$(t);break;case`PageUp`:if(!z)return;e.preventDefault(),$(-t);break;case`Enter`:z&&W.current&&V>=0?(e.preventDefault(),De(V)):(L||z)&&(e.preventDefault(),Oe(),Z());break;case`Escape`:z?(e.preventDefault(),e.stopPropagation(),Z()):L&&(e.preventDefault(),R(!1));break;case`Tab`:Z()}},je=se??O(540);return(0,r.jsxs)(`div`,{className:[`ui-tpkc`,fe].filter(Boolean).join(` `),"data-size":we,"data-open":z||void 0,"data-invalid":Ce||void 0,"data-disabled":x||void 0,children:[(0,r.jsx)(`style`,{href:`ui-time-picker-clean`,precedence:`default`,children:ie}),_!=null&&(0,r.jsxs)(`div`,{className:`ui-tpkc__head`,children:[(0,r.jsx)(`label`,{className:`ui-tpkc__label`,id:E,htmlFor:w,children:_}),ce&&(0,r.jsx)(`span`,{className:`ui-tpkc__optional`,children:`Optional`})]}),(0,r.jsxs)(`div`,{ref:q,className:`ui-tpkc__box`,onClick:()=>K.current?.focus(),children:[(0,r.jsx)(`span`,{className:`ui-tpkc__icon`,"aria-hidden":`true`,children:(0,r.jsx)(te,{})}),(0,r.jsx)(`input`,{ref:e=>{K.current=e,typeof S==`function`?S(e):S&&(S.current=e)},id:w,className:`ui-tpkc__input`,type:`text`,role:`combobox`,inputMode:`text`,autoComplete:`off`,autoCorrect:`off`,spellCheck:!1,"aria-autocomplete":`list`,"aria-expanded":z,"aria-controls":T,"aria-activedescendant":z&&V>=0?he(V):void 0,"aria-label":pe,"aria-describedby":Y?me:void 0,"aria-invalid":Ce||void 0,"aria-required":ue||void 0,placeholder:je,disabled:x,value:Se,onChange:e=>ke(e.target.value),onKeyDown:Ae,onPointerDown:()=>!z&&X(),onBlur:()=>{Oe(),Z()}}),(0,r.jsx)(`button`,{type:`button`,className:`ui-tpkc__toggle`,tabIndex:-1,"aria-label":z?`Hide times`:`Show times`,disabled:x,onPointerDown:e=>e.preventDefault(),onClick:e=>{e.stopPropagation(),K.current?.focus(),z?Z():X()},children:(0,r.jsx)(ne,{})})]}),le&&(0,r.jsx)(`input`,{type:`hidden`,name:le,value:P==null?``:s(P)}),z&&(0,r.jsxs)(`div`,{ref:J,id:T,className:`ui-tpkc__list`,role:`listbox`,"aria-labelledby":_==null?void 0:E,"aria-label":_==null?pe??`Times`:void 0,popover:`manual`,children:[U&&(0,r.jsx)(`span`,{className:`ui-tpkc__glow`,"aria-hidden":`true`,style:{transform:`translateY(${U.top}px)`,height:U.height}}),N.map((e,t)=>(0,r.jsxs)(`div`,{id:he(t),className:`ui-tpkc__option`,role:`option`,"data-index":t,"aria-selected":e===P,"data-active":t===V||void 0,onPointerMove:()=>{W.current=!0,t!==V&&H(t)},onPointerDown:e=>e.preventDefault(),onClick:()=>De(t),children:[(0,r.jsx)(`span`,{className:`ui-tpkc__time`,children:O(e)}),(0,r.jsx)(`span`,{className:`ui-tpkc__check`,"aria-hidden":`true`,children:e===P&&(0,r.jsx)(re,{})})]},e))]}),Y&&(0,r.jsx)(`p`,{className:`ui-tpkc__message`,id:me,"aria-live":h(y)?`polite`:void 0,children:Y},h(y)?`error`:`hint`)]})}var m=[`sm`,`md`,`lg`],h=e=>e!=null&&typeof e!=`boolean`&&e!==``;function ee(e,t){let n=t.getBoundingClientRect(),r=document.documentElement.clientWidth||window.innerWidth,i=window.innerHeight,a=Math.min(Math.max(n.width,120),r-16);e.style.width=`${a}px`;let o=Math.min(e.scrollHeight,264),s=i-n.bottom-4-8,c=n.top-4-8,l=s<Math.min(o,160)&&c>s,u=Math.max(120,Math.min(264,l?c:s));e.style.maxHeight=`${u}px`;let d=Math.min(o,u);e.style.left=`${Math.round(Math.min(Math.max(8,n.left),r-8-a))}px`,e.style.top=`${Math.round(l?n.top-4-d:n.bottom+4)}px`,e.toggleAttribute(`data-up`,l)}function te(){return(0,r.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:[(0,r.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,r.jsx)(`path`,{d:`M12 8V12L14 14`})]})}function ne(){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`14`,height:`14`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{d:`M18 9C18 9 13.58 15 12 15C10.42 15 6 9 6 9`})})}function re(){return(0,r.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`14`,height:`14`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{className:`ui-tpkc__tick`,d:`M5 14L8.5 17.5L19 6.5`,pathLength:1})})}var ie=`
/* Colors and motion as variables – override them on .ui-tpkc (see Theming in the docs) */
.ui-tpkc {
  --ui-tpkc-title: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-tpkc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-tpkc-subtle: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-tpkc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.3));
  --ui-tpkc-icon: var(--aui-muted, rgba(0, 0, 0, 0.447));
  --ui-tpkc-surface: var(--aui-surface, #ffffff);
  --ui-tpkc-menu: var(--aui-overlay, var(--aui-surface, #ffffff));
  --ui-tpkc-glow: rgba(0, 0, 0, 0.045);
  --ui-tpkc-readonly: rgba(0, 0, 0, 0.02);
  --ui-tpkc-shadow: 0 0 0 0.5px var(--aui-border, rgba(0, 0, 0, 0.08)), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-tpkc-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.13)), 0 1px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --ui-tpkc-edge-focus: 0 0 0 1px var(--aui-border-strong, rgba(0, 0, 0, 0.28)), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --ui-tpkc-shadow-menu: var(--aui-shadow-popover, 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 8px 24px -6px rgba(0, 0, 0, 0.14), 0 2px 6px -2px rgba(0, 0, 0, 0.06));
  --ui-tpkc-danger: var(--aui-danger, #c4320a);
  --ui-tpkc-danger-edge: color-mix(in srgb, var(--aui-red, #f04438) 55%, transparent);
  --ui-tpkc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-tpkc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));

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
  color: var(--ui-tpkc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-tpkc[data-size="sm"] { --h: 28px; --px: 8px; --radius: calc(var(--aui-radius, 7px) - 1px); }
.ui-tpkc[data-size="lg"] { --h: 36px; --px: 12px; --fs: 14px; --radius: calc(var(--aui-radius, 7px) + 1px); }
/* Touch screens: a comfortable tap height, and 16px text so iOS doesn't zoom in on focus */
@media (pointer: coarse) {
  .ui-tpkc { --fs: 16px; }
  .ui-tpkc[data-size="sm"] { --h: 34px; }
  .ui-tpkc[data-size="md"] { --h: 38px; }
  .ui-tpkc[data-size="lg"] { --h: 40px; }
}
.ui-tpkc *, .ui-tpkc *::before, .ui-tpkc *::after { box-sizing: border-box; }

.ui-tpkc__head { display: flex; align-items: baseline; gap: 6px; min-width: 0; }
.ui-tpkc__label { min-width: 0; font-weight: 500; color: var(--ui-tpkc-title); overflow-wrap: anywhere; cursor: default; }
.ui-tpkc__optional { flex: none; font-size: 12px; line-height: 16px; color: var(--ui-tpkc-subtle); }

/* The field: white, a hairline edge that firms up on hover and while typing – no ring on a text field */
.ui-tpkc__box {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: var(--h);
  min-width: 0;
  padding: 0 calc(var(--px) - 6px) 0 var(--px);
  border-radius: var(--radius);
  background: var(--ui-tpkc-surface);
  box-shadow: var(--ui-tpkc-shadow);
  cursor: text;
  transition: box-shadow 140ms ease, background-color 140ms ease;
}
.ui-tpkc__box:hover { box-shadow: var(--ui-tpkc-shadow-hover); }
.ui-tpkc__box:focus-within, .ui-tpkc[data-open] .ui-tpkc__box { box-shadow: var(--ui-tpkc-edge-focus); }
.ui-tpkc[data-invalid] .ui-tpkc__box { box-shadow: 0 0 0 1px var(--ui-tpkc-danger-edge), 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.ui-tpkc[data-disabled] .ui-tpkc__box { background: var(--ui-tpkc-readonly); box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06); cursor: not-allowed; }
.ui-tpkc[data-disabled] { opacity: 0.55; }
.ui-tpkc__icon { display: grid; flex: none; place-items: center; width: 16px; height: 16px; color: var(--ui-tpkc-icon); }
.ui-tpkc__icon svg { display: block; }
.ui-tpkc__input {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: none;
  font: inherit;
  font-size: var(--fs);
  font-variant-numeric: tabular-nums;
  color: var(--ui-tpkc-ink);
  text-overflow: ellipsis;
}
.ui-tpkc__input::placeholder { color: var(--ui-tpkc-faint); opacity: 1; }
.ui-tpkc__input:disabled { cursor: not-allowed; }
.ui-tpkc__toggle {
  display: grid;
  flex: none;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: none;
  color: var(--ui-tpkc-icon);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 120ms ease, color 120ms ease;
}
.ui-tpkc__toggle svg { display: block; transition: transform 240ms var(--ui-tpkc-ease); }
.ui-tpkc__toggle:hover:not(:disabled) { background: var(--ui-tpkc-glow); color: var(--ui-tpkc-ink); }
.ui-tpkc__toggle:focus-visible { outline: 2px solid var(--ui-tpkc-focus); outline-offset: -2px; }
.ui-tpkc__toggle:disabled { cursor: not-allowed; }
.ui-tpkc[data-open] .ui-tpkc__toggle svg { transform: rotate(180deg); }

/* The list: a white card in the top layer, at the field's edge */
.ui-tpkc__list {
  position: fixed;
  inset: auto;
  z-index: 1000;
  margin: 0;
  padding: 4px;
  border: 0;
  border-radius: 10px;
  background: var(--ui-tpkc-menu);
  box-shadow: var(--ui-tpkc-shadow-menu);
  color: var(--ui-tpkc-ink);
  font: inherit;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  transform-origin: top center;
  animation: ui-tpkc-in 200ms var(--ui-tpkc-ease) both;
}
.ui-tpkc__list[data-up] { transform-origin: bottom center; animation-name: ui-tpkc-in-up; }
.ui-tpkc__list::backdrop { display: none; }

/* One soft highlight that glides between the rows */
.ui-tpkc__glow {
  position: absolute;
  top: 0;
  left: 4px;
  right: 4px;
  border-radius: 6px;
  background: var(--ui-tpkc-glow);
  pointer-events: none;
  transition: transform 160ms var(--ui-tpkc-ease), height 160ms var(--ui-tpkc-ease);
}

.ui-tpkc__option {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 8px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}
.ui-tpkc__time { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.ui-tpkc__option[aria-selected="true"] .ui-tpkc__time { font-weight: 500; }
.ui-tpkc__check { display: grid; flex: none; place-items: center; width: 16px; height: 16px; color: var(--ui-tpkc-ink); }
.ui-tpkc__check svg { display: block; }
.ui-tpkc__tick { stroke-dasharray: 1; animation: ui-tpkc-draw 280ms 40ms var(--ui-tpkc-ease) both; }
@media (pointer: coarse) {
  .ui-tpkc__option { height: 40px; font-size: 15px; }
  .ui-tpkc__toggle { width: 32px; height: 32px; }
}

.ui-tpkc__message { margin: 0; font-size: 12px; line-height: 16px; color: var(--ui-tpkc-subtle); overflow-wrap: anywhere; animation: ui-tpkc-message 260ms var(--ui-tpkc-ease); }
.ui-tpkc[data-invalid] .ui-tpkc__message { color: var(--ui-tpkc-danger); }

@keyframes ui-tpkc-in { from { opacity: 0; transform: translateY(-4px) scale(0.98); } }
@keyframes ui-tpkc-in-up { from { opacity: 0; transform: translateY(4px) scale(0.98); } }
@keyframes ui-tpkc-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes ui-tpkc-message { from { opacity: 0; transform: translateY(-3px); filter: blur(2px); } }

@media (prefers-reduced-motion: reduce) {
  .ui-tpkc *, .ui-tpkc *::before, .ui-tpkc *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tpkc {
  --ui-tpkc-title: var(--aui-ink, rgba(255, 255, 255, 0.92));
  --ui-tpkc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-tpkc-subtle: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-tpkc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.3));
  --ui-tpkc-icon: var(--aui-muted, rgba(255, 255, 255, 0.5));
  --ui-tpkc-surface: var(--aui-surface, #1c1c1e);
  --ui-tpkc-menu: var(--aui-overlay, var(--aui-surface, #1f1f22));
  --ui-tpkc-glow: rgba(255, 255, 255, 0.07);
  --ui-tpkc-readonly: rgba(255, 255, 255, 0.03);
  --ui-tpkc-shadow: 0 0 0 0.5px var(--aui-border, rgba(255, 255, 255, 0.14)), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-tpkc-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.2)), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-tpkc-edge-focus: 0 0 0 1px var(--aui-border-strong, rgba(255, 255, 255, 0.3)), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-tpkc-shadow-menu: var(--aui-shadow-popover, 0 0 0 0.5px rgba(255, 255, 255, 0.12), 0 12px 32px -8px rgba(0, 0, 0, 0.6));
  --ui-tpkc-danger: var(--aui-danger, #ff8a7a);
  --ui-tpkc-danger-edge: color-mix(in srgb, var(--aui-red, #ff6b5f) 50%, transparent);
  --ui-tpkc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
  color-scheme: dark;
}
:where(.dark, [data-theme="dark"]) .ui-tpkc[data-disabled] .ui-tpkc__box { box-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.12); }
`;function ae(){let[e,t]=(0,n.useState)(`09:30`),[i,a]=(0,n.useState)(null);return(0,r.jsx)(`div`,{className:`tpk-demo`,children:(0,r.jsxs)(`form`,{className:`tpk-democ`,onSubmit:e=>e.preventDefault(),children:[(0,r.jsx)(p,{label:`Run at`,value:e,onChange:t,hint:`Every weekday, in your time zone (Europe/Vienna).`}),(0,r.jsx)(p,{label:`Don't start after`,optional:!0,value:i,onChange:a,step:30,min:e??void 0,placeholder:`Any time`,hint:`A run that would start later waits for the next day.`})]})})}export{ae as default};