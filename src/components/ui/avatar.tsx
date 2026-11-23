// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function i({name:e,src:t,size:i=32,shape:a,status:l,kind:u=`person`,seed:d,color:f,working:p,className:m,style:g,...b}){let[x,S]=(0,n.useState)(null),[C,w]=(0,n.useState)(null),T=u===`agent`,E=o.includes(i)?i:32,D=a===`circle`||a===`square`?a:T?`square`:`circle`,O=(d??e??``).trim(),k=!!t&&x!==t,A=k&&C===t,j=e?.trim(),M=b[`aria-label`]??(j?l&&s[l]?`${j}, ${s[l]}`:j:void 0);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{href:`ui-avatar-clean`,precedence:`default`,children:y}),(0,r.jsxs)(`span`,{className:[`ui-avtc`,m].filter(Boolean).join(` `),"data-size":E,"data-shape":D,"data-kind":T?`agent`:`person`,"data-hue":T||!O?void 0:c(O),"data-ready":A?``:void 0,"data-working":T&&p?``:void 0,role:M?`img`:void 0,"aria-label":M,"aria-hidden":!M||void 0,style:T&&f?{"--ui-avtc-mark":f,...g}:g,...b,children:[(0,r.jsxs)(`span`,{className:`ui-avtc__face`,children:[T?(0,r.jsx)(v,{cells:_(O||`agent`)}):(0,r.jsx)(h,{name:e??``}),k&&(0,r.jsx)(`img`,{className:`ui-avtc__img`,src:t,alt:``,loading:`lazy`,decoding:`async`,draggable:!1,onLoad:()=>w(t),onError:()=>S(t),ref:e=>{e?.complete&&e.naturalWidth>0&&w(t)}})]}),l&&s[l]&&(0,r.jsx)(`span`,{className:`ui-avtc__status`,"data-status":l,"aria-hidden":`true`})]})]})}function a({max:e=4,size:t=32,total:a,className:s,children:c,...l}){let u=n.Children.toArray(c).filter(n.isValidElement),d=o.includes(t)?t:32,f=Math.max(1,Math.floor(Number.isFinite(e)?e:4)),p=Math.max(u.length,Math.floor(Number.isFinite(a)?a:0)),m=u.slice(0,f),h=p-m.length,g=m[m.length-1]?.props.shape??(m[m.length-1]?.props.kind===`agent`?`square`:`circle`);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{href:`ui-avatar-clean`,precedence:`default`,children:y}),(0,r.jsxs)(`div`,{role:`group`,className:[`ui-avtc__group`,s].filter(Boolean).join(` `),"data-size":d,...l,children:[m.map(e=>e.type===i?(0,n.cloneElement)(e,{size:d}):e),h>0&&(0,r.jsx)(`span`,{className:`ui-avtc__more`,"data-shape":g,role:`img`,"aria-label":`${new Intl.NumberFormat().format(h)} more`,children:h>99?`99+`:`+${h}`})]})]})}var o=[20,24,32,40],s={online:`online`,away:`away`,busy:`busy`},c=e=>{let t=7;for(let n of e)t=t*31+n.codePointAt(0)>>>0;return String(t%8)},l,u=e=>{if(l===void 0){let e=Intl.Segmenter;l=e?new e(void 0,{granularity:`grapheme`}):null}return l?Array.from(l.segment(e),e=>e.segment):Array.from(e)},d=/[\p{L}\p{N}]/u,f=/\p{Extended_Pictographic}|\p{Regional_Indicator}/u,p=/^(jr|sr|ii|iii|iv|vi|phd|md|esq)\.?$/i;function m(e){let t=e.trim().split(/\s+/).filter(Boolean);if(!t.length)return``;let n=u(t[0])[0];if(n&&f.test(n)&&!d.test(n))return n;let r=t.filter((e,t,n)=>!(t>0&&t===n.length-1&&p.test(e))).map(e=>u(e).find(e=>d.test(e))).filter(e=>!!e);return r.length?(r.length>1?r[0]+r[r.length-1]:r[0]).toLocaleUpperCase():n??``}function h({name:e}){let t=m(e);return(0,r.jsx)(`span`,{className:`ui-avtc__initials`,dir:`auto`,"aria-hidden":`true`,children:t||(0,r.jsxs)(`svg`,{className:`ui-avtc__anon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:1.8,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,r.jsx)(`path`,{d:`M20 21C19.713 17.269 16.729 14.315 12.995 14.066L12 14C11.645 14.01 11.313 14.023 11.001 14.038C7.3 14.219 4.284 17.306 4 21`}),(0,r.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]})})}var g=[0,120,240,120,240,360,240,360,480],_=e=>{let t=0;for(let n of e)t=t*31+n.charCodeAt(0)>>>0;for(let e=0;e<64;e++){let n=t>>e%26&63,r=[0,1,2].flatMap(e=>{let t=n>>e*2&1;return[t,n>>e*2+1&1,t]});if(r.filter(Boolean).length>=5)return r;t=t*1103515245+12345>>>0}return[1,0,1,0,1,0,1,0,1]};function v({cells:e}){return(0,r.jsx)(`span`,{className:`ui-avtc__mark`,"aria-hidden":`true`,children:e.map((e,t)=>(0,r.jsx)(`i`,{"data-on":e?``:void 0,style:{animationDelay:`${g[t]}ms`}},t))})}var y=`
/* Colors as variables – override them on .ui-avtc or .ui-avtc__group (see Theming in the docs) */
.ui-avtc,
.ui-avtc__group {
  --ui-avtc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-avtc-text: rgba(0, 0, 0, 0.61);
  --ui-avtc-fill: var(--aui-subtle, rgba(0, 0, 0, 0.06));
  --ui-avtc-tile: var(--aui-surface, #ffffff);
  --ui-avtc-edge: rgba(0, 0, 0, 0.08);
  /* The ring that cuts each avatar out of the one before – set it to the background the group sits on */
  --ui-avtc-ring: var(--aui-surface, #ffffff);
  --ui-avtc-mark: rgba(0, 96, 226, 0.78);
  --ui-avtc-online: var(--aui-green, #5fc88a);
  --ui-avtc-away: var(--aui-amber, #e8b000);
  --ui-avtc-busy: var(--aui-red, #f04438);
  /* The soft colors behind initials: lightness and saturation of the tint and of the letters */
  --ui-avtc-bg-l: 93%;
  --ui-avtc-bg-s: 70%;
  --ui-avtc-fg-l: 36%;
  --ui-avtc-fg-s: 48%;

  --s: 32px;
  --fs: 12px;
  --dot: 9px;
  --sq: 4px;
  --gap: 2px;
}
.ui-avtc[data-size="20"], .ui-avtc__group[data-size="20"] { --s: 20px; --fs: 8.5px; --dot: 6px; --sq: 3px; --gap: 1px; }
.ui-avtc[data-size="24"], .ui-avtc__group[data-size="24"] { --s: 24px; --fs: 10px; --dot: 7px; --sq: 3px; --gap: 1.5px; }
.ui-avtc[data-size="40"], .ui-avtc__group[data-size="40"] { --s: 40px; --fs: 14px; --dot: 10px; --sq: 5px; --gap: 2.5px; }

.ui-avtc {
  position: relative;
  display: inline-grid;
  flex: none;
  box-sizing: border-box;
  width: var(--s);
  height: var(--s);
  vertical-align: middle;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  -webkit-font-smoothing: antialiased;
  user-select: none;
}
.ui-avtc__face {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--ui-avtc-fill);
  color: var(--ui-avtc-text);
}
/* Rounded squares keep the same curve at every size: a quarter of the side */
.ui-avtc[data-shape="square"] .ui-avtc__face { border-radius: calc(var(--s) / 4); }

/* Initials sit on a soft color of their own, picked from the name */
.ui-avtc[data-hue] .ui-avtc__face {
  background: hsl(var(--h) var(--ui-avtc-bg-s) var(--ui-avtc-bg-l));
  color: hsl(var(--h) var(--ui-avtc-fg-s) var(--ui-avtc-fg-l));
}
.ui-avtc[data-hue="0"] { --h: 214; }
.ui-avtc[data-hue="1"] { --h: 152; }
.ui-avtc[data-hue="2"] { --h: 40; }
.ui-avtc[data-hue="3"] { --h: 22; }
.ui-avtc[data-hue="4"] { --h: 330; }
.ui-avtc[data-hue="5"] { --h: 268; }
.ui-avtc[data-hue="6"] { --h: 174; }
.ui-avtc[data-hue="7"] { --h: 196; }

.ui-avtc__initials {
  grid-area: 1 / 1;
  font-size: var(--fs);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0;
  white-space: nowrap;
}
.ui-avtc__anon {
  display: block;
  width: calc(var(--s) * 0.55);
  height: calc(var(--s) * 0.55);
}

/* The picture covers the initials once it has loaded – they show while it loads and when it fails */
.ui-avtc__img {
  grid-area: 1 / 1;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 180ms ease;
}
.ui-avtc[data-ready] .ui-avtc__img { opacity: 1; }
.ui-avtc[data-ready] .ui-avtc__initials { visibility: hidden; }

/* A hairline on top of pictures and agent tiles, so white edges don't melt into a white page */
.ui-avtc[data-ready] .ui-avtc__face::after,
.ui-avtc[data-kind="agent"] .ui-avtc__face::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 0.5px var(--ui-avtc-edge);
  pointer-events: none;
}

/* Agent: its own pixel mark on a white tile */
.ui-avtc[data-kind="agent"] .ui-avtc__face { background: var(--ui-avtc-tile); }
.ui-avtc__mark {
  grid-area: 1 / 1;
  display: grid;
  grid-template-columns: repeat(3, var(--sq));
  grid-auto-rows: var(--sq);
  gap: var(--gap);
}
.ui-avtc__mark i {
  border-radius: calc(var(--sq) / 4);
  background: var(--ui-avtc-mark);
  opacity: 0;
  transition: opacity 240ms ease;
}
.ui-avtc__mark i[data-on] { opacity: 1; }
/* Working: every square twinkles, in a diagonal wave */
.ui-avtc[data-working] .ui-avtc__mark i { animation: ui-avtc-pixel 1.2s ease-in-out infinite both; }
.ui-avtc[data-working] .ui-avtc__mark i:not([data-on]) { opacity: 0.16; }
@keyframes ui-avtc-pixel {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

/* Status: a dot on the corner, cut out of the avatar by a ring in the background color */
.ui-avtc__status {
  position: absolute;
  inset-inline-end: 0;
  bottom: 0;
  width: var(--dot);
  height: var(--dot);
  border-radius: 50%;
  background: var(--ui-avtc-online);
  box-shadow: 0 0 0 1.5px var(--ui-avtc-ring);
}
.ui-avtc[data-shape="square"] .ui-avtc__status { inset-inline-end: -2px; bottom: -2px; }
.ui-avtc__status[data-status="away"] { background: var(--ui-avtc-away); }
.ui-avtc__status[data-status="busy"] { background: var(--ui-avtc-busy); }

/* Group: each one overlaps the one before by a quarter, a ring in the background color between them */
.ui-avtc__group {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  isolation: isolate;
}
.ui-avtc__group > .ui-avtc .ui-avtc__face { box-shadow: 0 0 0 2px var(--ui-avtc-ring); }
.ui-avtc__group > :is(.ui-avtc, .ui-avtc__more) + :is(.ui-avtc, .ui-avtc__more) { margin-inline-start: calc(var(--s) / -4); }
.ui-avtc__more {
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  min-width: var(--s);
  height: var(--s);
  padding: 0 4px;
  border-radius: 999px;
  /* The gray tint laid over the ring color, so the face behind it doesn't show through */
  background: linear-gradient(var(--ui-avtc-fill), var(--ui-avtc-fill)), var(--ui-avtc-ring);
  box-shadow: 0 0 0 2px var(--ui-avtc-ring);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: var(--fs);
  font-weight: 500;
  line-height: 1;
  color: var(--ui-avtc-text);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  -webkit-font-smoothing: antialiased;
}
.ui-avtc__more[data-shape="square"] { border-radius: calc(var(--s) / 4); }

@media (prefers-reduced-motion: reduce) {
  .ui-avtc__img { transition: none; }
  .ui-avtc__mark i { transition: none; }
  .ui-avtc[data-working] .ui-avtc__mark i { animation: none; }
  .ui-avtc[data-working] .ui-avtc__mark i:not([data-on]) { opacity: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) :is(.ui-avtc, .ui-avtc__group) {
  --ui-avtc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-avtc-text: rgba(255, 255, 255, 0.62);
  --ui-avtc-fill: var(--aui-subtle, rgba(255, 255, 255, 0.08));
  --ui-avtc-tile: var(--aui-surface, #1c1c1e);
  --ui-avtc-edge: rgba(255, 255, 255, 0.1);
  --ui-avtc-ring: var(--aui-surface, #1c1c1e);
  --ui-avtc-mark: rgba(77, 141, 255, 0.85);
  --ui-avtc-online: var(--aui-green, #7dcf9f);
  --ui-avtc-away: var(--aui-amber, #e6c24d);
  --ui-avtc-busy: var(--aui-red, #ff6b5f);
  --ui-avtc-bg-l: 24%;
  --ui-avtc-bg-s: 28%;
  --ui-avtc-fg-l: 80%;
  --ui-avtc-fg-s: 60%;
}
`,b=[{name:`Mara Lindqvist`,src:`/avatars/mara.jpg`,status:`online`,meta:`Design lead`},{name:`Jonas Weber`,src:`/avatars/jonas.jpg`,status:`away`,meta:`Reviewing PR #482`},{name:`Priya Raman`,status:`busy`,meta:`In a call until 15:30`},{name:`Christopher Montgomery III`,meta:`Joined yesterday`}];function x(){return(0,r.jsx)(`div`,{className:`avt-demo`,children:(0,r.jsxs)(`div`,{className:`avt-demo__card`,children:[(0,r.jsxs)(`div`,{className:`avt-demo__head`,children:[(0,r.jsx)(`span`,{className:`avt-demo__title`,children:`Release 4.2`}),(0,r.jsxs)(a,{size:24,max:4,total:9,"aria-label":`9 people on this release`,children:[(0,r.jsx)(i,{name:`Mara Lindqvist`,src:`/avatars/mara.jpg`}),(0,r.jsx)(i,{name:`Triage agent`,kind:`agent`,seed:`triage`}),(0,r.jsx)(i,{name:`Jonas Weber`,src:`/avatars/jonas.jpg`}),(0,r.jsx)(i,{name:`Priya Raman`}),(0,r.jsx)(i,{name:`Sofia Costa`,src:`/avatars/sofia.jpg`})]})]}),(0,r.jsxs)(`ul`,{className:`avt-demo__list`,children:[b.map(e=>(0,r.jsxs)(`li`,{className:`avt-demo__row`,children:[(0,r.jsx)(i,{name:e.name,src:`src`in e?e.src:void 0,status:`status`in e?e.status:void 0,"aria-hidden":!0}),(0,r.jsxs)(`span`,{className:`avt-demo__text`,children:[(0,r.jsx)(`span`,{className:`avt-demo__name`,children:e.name}),(0,r.jsx)(`span`,{className:`avt-demo__meta`,children:e.meta})]})]},e.name)),(0,r.jsxs)(`li`,{className:`avt-demo__row`,children:[(0,r.jsx)(i,{name:`Triage agent`,kind:`agent`,seed:`triage`,working:!0,"aria-hidden":!0}),(0,r.jsxs)(`span`,{className:`avt-demo__text`,children:[(0,r.jsx)(`span`,{className:`avt-demo__name`,children:`Triage agent`}),(0,r.jsx)(`span`,{className:`avt-demo__meta`,children:`Writing the summary for 14 tickets`})]})]}),(0,r.jsxs)(`li`,{className:`avt-demo__row`,children:[(0,r.jsx)(i,{name:`Northwind`,shape:`square`,"aria-hidden":!0}),(0,r.jsxs)(`span`,{className:`avt-demo__text`,children:[(0,r.jsx)(`span`,{className:`avt-demo__name`,children:`Northwind`}),(0,r.jsx)(`span`,{className:`avt-demo__meta`,children:`Workspace · 24 members`})]})]})]})]})})}export{x as default};