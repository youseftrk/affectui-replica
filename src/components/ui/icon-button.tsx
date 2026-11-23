// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as f from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const p = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/Copy01Icon-DrPxamgF";
import{t as r}from"./_deps/FilterHorizontalIcon-BD-jVvJt";
import{t as i}from"./_deps/MoreHorizontalIcon-CBUy2huH";
import{t as a}from"./_deps/PinIcon-B5iNHNfk";
import{t as o}from"./_deps/PlusSignIcon-CwG3nxfu";
import{t as s}from"./_deps/RefreshIcon-C_kyWUfS";
import{t as c}from"./_deps/Search01Icon-uevAzKav";
import{t as l}from"./_deps/ThumbsUpIcon-B82gm2BX";
import{t as u}from"./_deps/Tick02Icon-BZZvPScA";
import{t as d}from"./_deps/component.clean-2u58lF6m";
function m(){let[e,t]=(0,f.useState)(!1),[m,h]=(0,f.useState)(!0),[g,_]=(0,f.useState)(!1);return(0,f.useEffect)(()=>{if(!g)return;let e=setTimeout(()=>_(!1),1600);return()=>clearTimeout(e)},[g]),(0,p.jsx)(`div`,{className:`icb-demo`,children:(0,p.jsxs)(`div`,{className:`icb-democ`,children:[(0,p.jsxs)(`div`,{className:`icb-democ__head`,children:[(0,p.jsxs)(`span`,{className:`icb-democ__title`,children:[`Runs `,(0,p.jsx)(`span`,{className:`icb-democ__count`,children:e?3:24})]}),(0,p.jsxs)(`div`,{className:`icb-democ__tools`,children:[(0,p.jsx)(d,{variant:`secondary`,icon:c,label:`Search runs`}),(0,p.jsx)(d,{variant:`secondary`,icon:r,label:`Filter`}),(0,p.jsx)(d,{variant:`secondary`,icon:a,label:`Pinned runs only`,pressed:e,onClick:()=>t(e=>!e)}),(0,p.jsx)(d,{variant:`primary`,icon:o,label:`New run`})]})]}),(0,p.jsxs)(`div`,{className:`icb-democ__reply`,children:[(0,p.jsx)(`p`,{className:`icb-democ__text`,children:`Summarised 14 support tickets – three mention the export timeout, so I opened a draft fix in billing-api.`}),(0,p.jsxs)(`div`,{className:`icb-democ__actions`,children:[(0,p.jsx)(d,{size:`sm`,icon:g?u:n,label:g?`Copied`:`Copy`,onClick:()=>_(!0)}),(0,p.jsx)(d,{size:`sm`,icon:l,label:`Good answer`,pressed:m,onClick:()=>h(e=>!e)}),(0,p.jsx)(d,{size:`sm`,icon:s,label:`Regenerate`,disabled:!0}),(0,p.jsx)(d,{size:`sm`,icon:i,label:`More`})]})]})]})})}export{m as default};