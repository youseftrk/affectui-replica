// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const t = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function n({size:e=14,label:n,className:i,...a}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(`style`,{href:`ui-spinner-clean`,precedence:`default`,children:r}),(0,t.jsxs)(`svg`,{...a,className:[`ui-spnc`,i].filter(Boolean).join(` `),viewBox:`0 0 16 16`,width:e,height:e,...n?{role:`status`,"aria-label":n}:{"aria-hidden":!0},children:[(0,t.jsx)(`circle`,{cx:`8`,cy:`8`,r:`6`,fill:`none`,stroke:`currentColor`,strokeOpacity:`0.18`,strokeWidth:`1.8`}),(0,t.jsx)(`path`,{d:`M8 2a6 6 0 0 1 6 6`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`})]})]})}var r=`
/* One turn every --ui-spnc-speed – override it on .ui-spnc (see Theming in the docs) */
.ui-spnc {
  --ui-spnc-speed: 800ms;
  display: inline-block;
  flex: none;
  vertical-align: middle;
  animation: ui-spnc-turn var(--ui-spnc-speed) linear infinite;
}
@keyframes ui-spnc-turn { to { rotate: 360deg; } }

/* Reduced motion: it still turns – it is the only sign that work goes on – but slowly */
@media (prefers-reduced-motion: reduce) {
  .ui-spnc { --ui-spnc-speed: 2400ms; }
}
`;export{n as t};