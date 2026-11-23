// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
var i=`#0190fe`;function a({value:e,defaultValue:t,onValueChange:a,alpha:s,presets:c,open:d,defaultOpen:f=!1,onOpenChange:p,label:m=`Color`,showValue:v=!0,size:y=`md`,side:b=`bottom`,align:S=`start`,name:C,className:w,disabled:T,ref:E,onClick:D,...O}){let[k,A]=l(e,t??i,a),[j,M]=l(d,f,p),N=(0,n.useId)(),P=(0,n.useRef)(null),F=(0,n.useRef)(null),I=(0,n.useRef)(null),L=(0,n.useRef)(M);L.current=M;let R=(0,n.useRef)(!j);j||(R.current=!0);let z=h(k),B=z?g(z,!1).toUpperCase():k,V=z&&s&&z.a<1?`${Math.round(z.a*100)}%`:null,H=e=>!!e&&(!!I.current?.contains(e)||!!P.current?.contains(e));return(0,n.useLayoutEffect)(()=>{let e=I.current;if(!j||!e)return;`showPopover`in e&&!e.matches(`:popover-open`)&&e.showPopover();let t=()=>{F.current&&u(e,F.current.getBoundingClientRect(),b,S)};t(),window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0);let n=typeof ResizeObserver>`u`?null:new ResizeObserver(t);return n?.observe(e),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0),n?.disconnect(),`hidePopover`in e&&e.isConnected&&e.matches(`:popover-open`)&&e.hidePopover()}},[j,b,S]),(0,n.useEffect)(()=>{let e=I.current;if(!j||!e)return;R.current&&!e.contains(document.activeElement)&&e.querySelector(`[role=slider]`)?.focus({preventScroll:!0}),R.current=!1;let t=()=>L.current(!1),n=e.contains(document.activeElement),r=()=>n=!0,i=t=>n=!!t.relatedTarget&&e.contains(t.relatedTarget);e.addEventListener(`focusin`,r),e.addEventListener(`focusout`,i);let a=e=>{H(e.target)||t()},o=e=>{if(e.key!==`Escape`||e.defaultPrevented)return;e.preventDefault(),e.stopPropagation();let n=H(document.activeElement);t(),n&&F.current?.focus({preventScroll:!0})},s=e=>{let n=e.relatedTarget;H(e.target)&&n&&!H(n)&&t()};return document.addEventListener(`pointerdown`,a,!0),window.addEventListener(`keydown`,o,!0),document.addEventListener(`focusout`,s),()=>{document.removeEventListener(`pointerdown`,a,!0),window.removeEventListener(`keydown`,o,!0),document.removeEventListener(`focusout`,s),e.removeEventListener(`focusin`,r),e.removeEventListener(`focusout`,i);let t=F.current;n&&window.setTimeout(()=>{let e=document.activeElement;t?.isConnected&&(!e||e===document.body)&&t.focus({preventScroll:!0})})}},[j]),(0,r.jsxs)(`span`,{ref:P,className:[`ui-clpc`,w].filter(Boolean).join(` `),"data-size":y===`sm`?`sm`:`md`,children:[(0,r.jsx)(`style`,{href:`ui-color-picker-clean`,precedence:`default`,children:x}),(0,r.jsxs)(`button`,{...O,ref:e=>{F.current=e,typeof E==`function`?E(e):E&&(E.current=e)},type:`button`,className:`ui-clpc__trigger`,"data-bare":!v||void 0,disabled:T,"aria-haspopup":`dialog`,"aria-expanded":j,"aria-controls":j?`${N}-card`:void 0,onClick:e=>{D?.(e),e.defaultPrevented||M(!j)},children:[(0,r.jsx)(`span`,{className:`ui-clpc__swatch`,style:{"--ui-clpc-c":z?_(z):k},"aria-hidden":`true`}),(0,r.jsxs)(`span`,{className:v?`ui-clpc__value`:`ui-clpc__sr`,children:[(0,r.jsxs)(`span`,{className:`ui-clpc__sr`,children:[m,`: `]}),B,V&&(0,r.jsxs)(`span`,{className:`ui-clpc__alpha`,children:[` `,V]})]})]}),C&&(0,r.jsx)(`input`,{type:`hidden`,name:C,value:z?g(z,!!s):k}),j&&(0,r.jsx)(`div`,{ref:I,id:`${N}-card`,className:`ui-clpc__pop`,role:`dialog`,"aria-label":m,popover:`manual`,"data-side":b,"data-align":S,children:(0,r.jsx)(o,{value:k,onChange:A,alpha:s,presets:c})})]})}function o({value:e,onChange:t,alpha:a,presets:o}){let[l,u]=(0,n.useState)(()=>y(h(e)??h(i),0,a)),[f,m]=(0,n.useState)(e),[x,S]=(0,n.useState)(null),C=(0,n.useRef)(null),w=(0,n.useRef)(null),T=(0,n.useRef)(null);if(e!==f){m(e);let t=h(e);t&&g(t,!!a)!==g(v(l),!!a)&&u(y(t,l.h,a,l.s))}let E=v(l),D=g(E,!!a),O=n=>{u(n);let r=g(v(n),!!a);r!==e&&t(r)},k=Math.round(l.s*100),A=Math.round(l.v*100),j=Math.round(l.h),M=Math.round(l.a*100),N=(o??[]).map(e=>typeof e==`string`?{value:e,label:e.toUpperCase()}:e),P=N.findIndex(e=>{let t=h(e.value);return!!t&&g(t,!!a)===D}),[F,I]=(0,n.useState)(!1),L=e=>{let t=h(e);return t&&O(y(a?t:{...t,a:1},l.h,a,l.s)),!!t};return(0,r.jsxs)(`div`,{className:`ui-clpc__panel`,style:{"--ui-clpc-c":_(E),"--ui-clpc-solid":_({...E,a:1}),"--ui-clpc-hue":`hsl(${j} 100% 50%)`},children:[(0,r.jsx)(`div`,{ref:C,className:`ui-clpc__area`,role:`slider`,tabIndex:0,dir:`ltr`,"aria-label":`Saturation and brightness`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":k,"aria-valuetext":`Saturation ${k}%, brightness ${A}%`,...s(C,(e,t)=>O({...l,s:e,v:1-t}),!0),onKeyDown:e=>{let t=e.shiftKey?10:1,n={ArrowRight:[t,0],ArrowLeft:[-t,0],ArrowUp:[0,t],ArrowDown:[0,-t],PageUp:[0,10],PageDown:[0,-10],Home:[-100,0],End:[100,0]}[e.key];n&&(e.preventDefault(),O({...l,s:d(k+n[0],0,100)/100,v:d(A+n[1],0,100)/100}))},children:(0,r.jsx)(`span`,{className:`ui-clpc__thumb`,style:{left:`${l.s*100}%`,top:`${(1-l.v)*100}%`}})}),(0,r.jsx)(`div`,{ref:w,className:`ui-clpc__slider ui-clpc__slider--hue`,role:`slider`,tabIndex:0,dir:`ltr`,"aria-label":`Hue`,"aria-orientation":`horizontal`,"aria-valuemin":0,"aria-valuemax":360,"aria-valuenow":j,"aria-valuetext":`${j}°, ${b(j)}`,...s(w,e=>O({...l,h:e*360})),onKeyDown:e=>{let t=c(e,j,360);t!=null&&O({...l,h:t})},children:(0,r.jsx)(`span`,{className:`ui-clpc__knob`,style:{"--p":l.h/360,background:`hsl(${j} 100% 50%)`}})}),a&&(0,r.jsx)(`div`,{ref:T,className:`ui-clpc__slider ui-clpc__slider--alpha`,role:`slider`,tabIndex:0,dir:`ltr`,"aria-label":`Opacity`,"aria-orientation":`horizontal`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":M,"aria-valuetext":`${M}%`,...s(T,e=>O({...l,a:Math.round(e*100)/100})),onKeyDown:e=>{let t=c(e,M,100);t!=null&&O({...l,a:t/100})},children:(0,r.jsx)(`span`,{className:`ui-clpc__knob`,style:{"--p":l.a}})}),(0,r.jsxs)(`div`,{className:`ui-clpc__fields`,children:[(0,r.jsx)(`span`,{className:`ui-clpc__preview`,"aria-hidden":`true`}),(0,r.jsxs)(`label`,{className:`ui-clpc__hex`,"data-invalid":F||void 0,children:[(0,r.jsx)(`span`,{className:`ui-clpc__hash`,"aria-hidden":`true`,children:`#`}),(0,r.jsx)(`input`,{className:`ui-clpc__input`,value:x??D.slice(1).toUpperCase(),"aria-label":`Hex color`,"aria-invalid":F||void 0,spellCheck:!1,autoComplete:`off`,autoCapitalize:`off`,onChange:e=>{let t=e.target.value;S(t),I(!1),p.test(t.trim())&&L(t)},onBlur:()=>{x!=null&&L(x),S(null),I(!1)},onKeyDown:e=>{e.key===`Enter`&&x!=null&&(e.preventDefault(),L(x)?S(null):I(!0))}})]}),a&&(0,r.jsxs)(`span`,{className:`ui-clpc__pct`,children:[M,`%`]})]}),N.length>0&&(0,r.jsx)(`div`,{className:`ui-clpc__presets`,role:`radiogroup`,"aria-label":`Presets`,children:N.map((e,t)=>(0,r.jsx)(`button`,{type:`button`,role:`radio`,className:`ui-clpc__preset`,"aria-checked":t===P,"aria-label":e.label,title:e.label,tabIndex:t===(P>=0?P:0)?0:-1,style:{"--ui-clpc-p":e.value},onClick:()=>{let t=h(e.value);t&&O(y(a?t:{...t,a:1},l.h,a,l.s))},onKeyDown:e=>{let n=getComputedStyle(e.currentTarget).direction===`rtl`,r={ArrowRight:n?-1:1,ArrowDown:1,ArrowLeft:n?1:-1,ArrowUp:-1}[e.key],i=e.key===`Home`?0:e.key===`End`?N.length-1:r==null?null:(t+r+N.length)%N.length;if(i==null)return;e.preventDefault();let a=e.currentTarget.parentElement?.children[i];a?.focus(),a?.click()}},`${e.value}-${t}`))})]})}function s(e,t,n=!1){let r=r=>{let i=e.current;if(!i)return;let a=i.getBoundingClientRect(),o=n?0:a.height/2;t(d((r.clientX-a.left-o)/Math.max(1,a.width-o*2),0,1),d((r.clientY-a.top)/Math.max(1,a.height),0,1))};return{onPointerDown:t=>{t.button===0&&(e.current?.setPointerCapture(t.pointerId),e.current?.focus({preventScroll:!0}),t.preventDefault(),r(t))},onPointerMove:t=>{e.current?.hasPointerCapture(t.pointerId)&&r(t)},onPointerUp:t=>{e.current?.hasPointerCapture(t.pointerId)&&e.current.releasePointerCapture(t.pointerId)}}}function c(e,t,n){let r=e.shiftKey?10:1,i={ArrowRight:t+r,ArrowUp:t+r,ArrowLeft:t-r,ArrowDown:t-r,PageUp:t+10,PageDown:t-10,Home:0,End:n};return e.key in i?(e.preventDefault(),d(i[e.key],0,n)):null}function l(e,t,r){let[i,a]=(0,n.useState)(t),o=e!==void 0;return[o?e:i,e=>{o||a(e),r?.(e)}]}function u(e,t,n,r){let i=document.documentElement.clientWidth||window.innerWidth,a=window.innerHeight;e.style.maxHeight=``;let o=e.offsetWidth,s=e.offsetHeight,c={bottom:a-t.bottom-6-8,top:t.top-6-8},l=n;c[l]<s&&c[l===`top`?`bottom`:`top`]>c[l]&&(l=l===`top`?`bottom`:`top`);let u=Math.min(s,Math.max(160,c[l])),d=l===`bottom`?t.bottom+6:t.top-6-u,f=r,p=f===`start`?t.left:t.right-o;f===`start`&&p+o>i-8&&t.right-o>=8?(f=`end`,p=t.right-o):f===`end`&&p<8&&t.left+o<=i-8&&(f=`start`,p=t.left),p=Math.min(Math.max(8,p),i-8-o),s>u&&(e.style.maxHeight=`${u}px`),e.style.top=`${Math.round(d)}px`,e.style.left=`${Math.round(p)}px`,e.dataset.side=l,e.dataset.align=f}var d=(e,t,n)=>Math.min(n,Math.max(t,e)),f=e=>Math.round(d(e,0,255)).toString(16).padStart(2,`0`),p=/^(#?([0-9a-f]{6}|[0-9a-f]{8})|rgba?\(.*\))$/i,m=/^-?(\d+\.?\d*|\.\d+)%?$/;function h(e){let t=String(e??``).trim().toLowerCase(),n=/^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(t)?.[1];if(n){let e=n.length<=4?[...n].map(e=>e+e).join(``):n,t=t=>parseInt(e.slice(t,t+2),16);return{r:t(0),g:t(2),b:t(4),a:e.length===8?t(6)/255:1}}let r=/^rgba?\(([^)]*)\)$/.exec(t)?.[1];if(r==null)return null;let i=r.trim().split(/\s*[,/]\s*|\s+/).filter(Boolean);if(i.length!==3&&i.length!==4||!i.every(e=>m.test(e)))return null;let a=e=>d(Math.round(e.endsWith(`%`)?parseFloat(e)*2.55:parseFloat(e)),0,255),o=i[3]==null?1:d(i[3].endsWith(`%`)?parseFloat(i[3])/100:parseFloat(i[3]),0,1);return{r:a(i[0]),g:a(i[1]),b:a(i[2]),a:o}}var g=(e,t)=>`#${f(e.r)}${f(e.g)}${f(e.b)}${t&&e.a<1?f(e.a*255):``}`,_=e=>`rgb(${Math.round(e.r)} ${Math.round(e.g)} ${Math.round(e.b)} / ${e.a})`;function v({h:e,s:t,v:n,a:r}){let i=r=>{let i=(r+e/60)%6;return Math.round((n-n*t*Math.max(0,Math.min(i,4-i,1)))*255)};return{r:i(5),g:i(3),b:i(1),a:r}}function y({r:e,g:t,b:n,a:r},i,a,o=0){let s=e/255,c=t/255,l=n/255,u=Math.max(s,c,l),d=u-Math.min(s,c,l),f=i;return d>0&&(f=u===s?(c-l)/d%6:u===c?(l-s)/d+2:(s-c)/d+4,f=(f*60+360)%360),{h:f,s:u===0?o:d/u,v:u,a:a?r:1}}var b=e=>e<15?`red`:e<45?`orange`:e<70?`yellow`:e<165?`green`:e<195?`cyan`:e<255?`blue`:e<290?`purple`:e<335?`pink`:`red`,x=`
/* Colors and motion as variables – override them on .ui-clpc (see Theming in the docs) */
.ui-clpc {
  --ui-clpc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-clpc-strong: var(--aui-ink, #000000);
  --ui-clpc-muted: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-clpc-surface: var(--aui-surface, #ffffff);
  --ui-clpc-overlay: var(--aui-overlay, var(--aui-surface, #ffffff));
  --ui-clpc-hover: rgba(0, 0, 0, 0.04);
  --ui-clpc-hairline: rgba(0, 0, 0, 0.1);
  --ui-clpc-check: #e6e6e6;
  --ui-clpc-shadow: 0 0 0 0.5px var(--aui-border, rgba(0, 0, 0, 0.08)), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-clpc-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.14)), 0 1px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --ui-clpc-edge-focus: 0 0 0 1px var(--aui-border-strong, rgba(0, 0, 0, 0.28)), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --ui-clpc-danger-edge: rgba(229, 72, 77, 0.8);
  --ui-clpc-pop-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(0, 0, 0, 0.1)), 0 12px 32px -8px rgba(0, 0, 0, 0.16));
  --ui-clpc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-clpc-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));
  --ui-clpc-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;

  --h: 28px;
  --radius: var(--aui-radius, 6px);

  position: relative;
  display: inline-flex;
  min-width: 0;
  vertical-align: middle;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  color: var(--ui-clpc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-clpc[data-size="sm"] { --h: 24px; }
.ui-clpc--inline { display: block; }
.ui-clpc *, .ui-clpc *::before, .ui-clpc *::after { box-sizing: border-box; }
.ui-clpc__sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

/* The button: a white tool with a hairline shadow, the swatch and the hex in a fixed-width face, so it never jumps */
.ui-clpc__trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  height: var(--h);
  margin: 0;
  padding: 0 10px 0 6px;
  border: 0;
  border-radius: var(--radius);
  background: var(--ui-clpc-surface);
  box-shadow: var(--ui-clpc-shadow);
  font: inherit;
  color: var(--ui-clpc-strong);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 140ms ease;
}
.ui-clpc[data-size="sm"] .ui-clpc__trigger { padding: 0 8px 0 4px; }
.ui-clpc__trigger[data-bare] { justify-content: center; width: var(--h); padding: 0; }
.ui-clpc__trigger:hover:not(:disabled), .ui-clpc__trigger[aria-expanded="true"] { box-shadow: var(--ui-clpc-shadow-hover); }
.ui-clpc__trigger:disabled { opacity: 0.5; cursor: not-allowed; }
.ui-clpc__trigger:focus-visible { outline: 2px solid var(--ui-clpc-focus); outline-offset: 2px; }

/* A swatch over a checkerboard, so a see-through color reads as see-through */
.ui-clpc__swatch, .ui-clpc__preview {
  flex: none;
  background: linear-gradient(var(--ui-clpc-c), var(--ui-clpc-c)), repeating-conic-gradient(var(--ui-clpc-check) 0 25%, #fff 0 50%) 0 0 / 8px 8px;
  box-shadow: inset 0 0 0 0.5px var(--ui-clpc-hairline);
}
.ui-clpc__swatch { width: 16px; height: 16px; border-radius: 4px; }
.ui-clpc[data-size="sm"] .ui-clpc__swatch { width: 14px; height: 14px; border-radius: 3px; }
.ui-clpc__value { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: var(--ui-clpc-mono); font-size: 12px; font-weight: 500; letter-spacing: 0; }
.ui-clpc__alpha { color: var(--ui-clpc-muted); }

/* The card in the top layer: a 0.5px edge and a soft drop */
.ui-clpc__pop {
  position: fixed;
  inset: auto;
  z-index: 1000;
  box-sizing: border-box;
  max-width: calc(100vw - 16px);
  max-height: calc(100vh - 16px);
  margin: 0;
  padding: 12px;
  border: 0;
  border-radius: calc(var(--aui-radius-lg, 10px) + 2px);
  background: var(--ui-clpc-overlay);
  box-shadow: var(--ui-clpc-pop-shadow);
  color: var(--ui-clpc-ink);
  font: inherit;
  overflow: auto;
  overscroll-behavior: contain;
  transform-origin: top left;
  animation: ui-clpc-in 220ms var(--ui-clpc-ease) both;
}
.ui-clpc__pop::backdrop { display: none; }
.ui-clpc__pop[data-align="end"] { transform-origin: top right; }
.ui-clpc__pop[data-side="top"] { transform-origin: bottom left; animation-name: ui-clpc-in-up; }
.ui-clpc__pop[data-side="top"][data-align="end"] { transform-origin: bottom right; }

.ui-clpc__panel { display: grid; gap: 12px; width: 232px; max-width: 100%; }
.ui-clpc--inline .ui-clpc__panel { width: 100%; }

/* Saturation left to right, brightness bottom to top, over the hue */
.ui-clpc__area {
  position: relative;
  height: 148px;
  border-radius: var(--radius);
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0)), linear-gradient(to right, #fff, rgba(255, 255, 255, 0)), var(--ui-clpc-hue);
  box-shadow: inset 0 0 0 0.5px var(--ui-clpc-hairline);
  cursor: crosshair;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}
.ui-clpc__thumb, .ui-clpc__knob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 0 2px #fff, 0 0 0 2.5px rgba(0, 0, 0, 0.18), 0 1px 4px 1px rgba(0, 0, 0, 0.24);
}
.ui-clpc__thumb { width: 12px; height: 12px; margin: -6px 0 0 -6px; background: var(--ui-clpc-solid); }

/* The sliders: a 10px rail, the knob stops half its height from each end */
.ui-clpc__slider { position: relative; height: 10px; border-radius: 999px; cursor: pointer; touch-action: none; user-select: none; -webkit-user-select: none; box-shadow: inset 0 0 0 0.5px var(--ui-clpc-hairline); }
.ui-clpc__slider--hue { background: linear-gradient(to right, #f00 0%, #ff0 16.67%, #0f0 33.33%, #0ff 50%, #00f 66.67%, #f0f 83.33%, #f00 100%); }
.ui-clpc__slider--alpha { background: linear-gradient(to right, transparent, var(--ui-clpc-solid)), repeating-conic-gradient(var(--ui-clpc-check) 0 25%, #fff 0 50%) 0 0 / 8px 8px; }
.ui-clpc__knob { top: 50%; left: calc(5px + (100% - 10px) * var(--p)); width: 14px; height: 14px; margin: -7px 0 0 -7px; background: transparent; }
.ui-clpc__slider--alpha .ui-clpc__knob { background: linear-gradient(var(--ui-clpc-c), var(--ui-clpc-c)), repeating-conic-gradient(var(--ui-clpc-check) 0 25%, #fff 0 50%) 0 0 / 6px 6px; }
.ui-clpc__area:focus-visible, .ui-clpc__slider:focus-visible { outline: 2px solid var(--ui-clpc-focus); outline-offset: 2px; }

/* The hex field: no ring, only its edge firms up */
.ui-clpc__fields { display: flex; align-items: center; gap: 8px; min-width: 0; }
.ui-clpc__preview { width: 28px; height: 28px; border-radius: var(--radius); }
.ui-clpc__hex {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 2px;
  min-width: 0;
  height: 28px;
  padding: 0 8px;
  border-radius: var(--radius);
  background: var(--ui-clpc-surface);
  box-shadow: var(--ui-clpc-shadow);
  cursor: text;
  transition: box-shadow 140ms ease;
}
.ui-clpc__hex:hover { box-shadow: var(--ui-clpc-shadow-hover); }
.ui-clpc__hex:focus-within { box-shadow: var(--ui-clpc-edge-focus); }
.ui-clpc__hex[data-invalid] { box-shadow: 0 0 0 1px var(--ui-clpc-danger-edge); }
.ui-clpc__hash { flex: none; font-family: var(--ui-clpc-mono); font-size: 12px; color: var(--ui-clpc-muted); }
.ui-clpc__input {
  flex: 1 1 auto;
  width: 0;
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: var(--ui-clpc-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--ui-clpc-strong);
}
.ui-clpc__pct { flex: none; width: 36px; font-size: 12px; line-height: 16px; text-align: end; font-variant-numeric: tabular-nums; color: var(--ui-clpc-muted); }

/* Presets: round swatches; the chosen one gets a ring in its own color */
.ui-clpc__presets { display: flex; flex-wrap: wrap; gap: 8px; padding: 2px; }
.ui-clpc__preset {
  flex: none;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: linear-gradient(var(--ui-clpc-p), var(--ui-clpc-p)), repeating-conic-gradient(var(--ui-clpc-check) 0 25%, #fff 0 50%) 0 0 / 8px 8px;
  box-shadow: inset 0 0 0 0.5px var(--ui-clpc-hairline);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 140ms var(--ui-clpc-ease), box-shadow 140ms ease;
}
.ui-clpc__preset:hover { transform: scale(1.1); }
.ui-clpc__preset[aria-checked="true"] { box-shadow: inset 0 0 0 0.5px var(--ui-clpc-hairline), 0 0 0 2px var(--ui-clpc-overlay), 0 0 0 3.5px var(--ui-clpc-p); }
.ui-clpc__preset:focus-visible { outline: 2px solid var(--ui-clpc-focus); outline-offset: 2px; }

@keyframes ui-clpc-in { from { opacity: 0; transform: scale(0.96) translateY(-4px); } }
@keyframes ui-clpc-in-up { from { opacity: 0; transform: scale(0.96) translateY(4px); } }

/* Touch screens: a bigger button, thumbs and swatches, and 16px in the field so iOS doesn't zoom in */
@media (pointer: coarse) {
  .ui-clpc { --h: 36px; }
  .ui-clpc[data-size="sm"] { --h: 32px; }
  .ui-clpc__area { height: 168px; }
  .ui-clpc__slider { height: 14px; }
  .ui-clpc__knob { left: calc(7px + (100% - 14px) * var(--p)); width: 20px; height: 20px; margin: -10px 0 0 -10px; }
  .ui-clpc__thumb { width: 16px; height: 16px; margin: -8px 0 0 -8px; }
  .ui-clpc__panel { gap: 14px; }
  .ui-clpc__hex, .ui-clpc__preview { height: 36px; }
  .ui-clpc__preview { width: 36px; }
  .ui-clpc__input { font-size: 16px; }
  .ui-clpc__presets { gap: 10px; }
  .ui-clpc__preset { width: 28px; height: 28px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-clpc__pop { animation-duration: 1ms; }
  .ui-clpc__preset { transition: none; }
  .ui-clpc__preset:hover { transform: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-clpc {
  --ui-clpc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-clpc-strong: var(--aui-ink, #ffffff);
  --ui-clpc-muted: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-clpc-surface: var(--aui-surface, #1f1f22);
  --ui-clpc-overlay: var(--aui-overlay, var(--aui-surface, #1b1b1e));
  --ui-clpc-hover: rgba(255, 255, 255, 0.06);
  --ui-clpc-hairline: rgba(255, 255, 255, 0.14);
  --ui-clpc-shadow: 0 0 0 0.5px var(--aui-border, rgba(255, 255, 255, 0.14)), 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-clpc-shadow-hover: 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.24)), 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-clpc-edge-focus: 0 0 0 1px var(--aui-border-strong, rgba(255, 255, 255, 0.34));
  --ui-clpc-danger-edge: rgba(255, 99, 105, 0.8);
  --ui-clpc-pop-shadow: var(--aui-shadow-popover, 0 0 0 0.5px var(--aui-border-strong, rgba(255, 255, 255, 0.14)), 0 12px 32px -8px rgba(0, 0, 0, 0.6));
  --ui-clpc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
  color-scheme: dark;
}
`,S=[{value:`#0190fe`,label:`Blue`},{value:`#14b3f0`,label:`Cyan`},{value:`#13b3a0`,label:`Teal`},{value:`#5fc88a`,label:`Green`},{value:`#e8b000`,label:`Amber`},{value:`#f28a2e`,label:`Orange`},{value:`#ee3e9e`,label:`Pink`},{value:`#a651f0`,label:`Purple`}];function C(){let e=(0,n.useRef)(null),[t,i]=(0,n.useState)(`#a651f0`),[o,s]=(0,n.useState)(!0);return(0,n.useLayoutEffect)(()=>{(e.current?.closest(`.card__preview`)||matchMedia(`(pointer: coarse), (max-width: 640px)`).matches)&&s(!1)},[]),(0,r.jsx)(`div`,{ref:e,className:`clp-demo`,style:{"--clp-demo-agent":t},children:(0,r.jsxs)(`section`,{className:`clp-demo__card`,"aria-label":`Research agent`,children:[(0,r.jsxs)(`div`,{className:`clp-demo__row`,children:[(0,r.jsx)(T,{id:`research`}),(0,r.jsxs)(`span`,{className:`clp-demo__text`,children:[(0,r.jsx)(`span`,{className:`clp-demo__name`,children:`Research agent`}),(0,r.jsx)(`span`,{className:`clp-demo__meta`,children:`Its color on runs, mentions and the board`})]}),(0,r.jsx)(a,{value:t,onValueChange:i,open:o,onOpenChange:s,presets:S,label:`Agent color`,align:`end`})]}),(0,r.jsxs)(`div`,{className:`clp-demo__foot`,children:[(0,r.jsx)(T,{id:`research`}),(0,r.jsxs)(`span`,{className:`clp-demo__line`,children:[(0,r.jsx)(`b`,{children:`Research agent`}),` finished “Competitor pricing”`]}),(0,r.jsx)(`span`,{className:`clp-demo__time`,children:`2m`})]})]})})}var w=e=>{let t=0;for(let n of e)t=t*31+n.charCodeAt(0)>>>0;for(let e=0;e<64;e++){let n=t>>e%26&63,r=[0,1,2].flatMap(e=>{let t=n>>e*2&1;return[t,n>>e*2+1&1,t]});if(r.filter(Boolean).length>=5)return r;t=t*1103515245+12345>>>0}return[1,0,1,0,1,0,1,0,1]};function T({id:e}){return(0,r.jsx)(`span`,{className:`clp-demo__mark`,"aria-hidden":`true`,children:w(e).map((e,t)=>(0,r.jsx)(`i`,{"data-on":e?``:void 0},t))})}export{C as default};