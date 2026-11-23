// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as r from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const i = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/component.clean-C6FeCzel";
var a=`We're Acme, a 40-person B2B company selling scheduling software to clinics in Germany and Austria.
Common terms: MRR, churn, onboarding call, practice (= customer).
Answer in English unless someone writes in German.`;function o(){let[e,t]=(0,r.useState)(a),[o,s]=(0,r.useState)(``),[c,l]=(0,r.useState)(!1);return(0,i.jsx)(`div`,{className:`ta-demo`,children:(0,i.jsxs)(`form`,{className:`ta-democ`,onSubmit:e=>e.preventDefault(),children:[(0,i.jsx)(n,{label:`Company context`,value:e,onChange:e=>t(e.target.value),hint:`Added to every chat in this workspace.`,maxLength:2e3,counter:!0,minRows:3,maxRows:7,expandable:!0,expandedRows:12}),(0,i.jsx)(n,{label:`Note for the reviewer`,optional:!0,value:o,minRows:2,placeholder:`What should they look at first?`,onChange:e=>{s(e.target.value),l(!1)},onSubmitShortcut:e=>{e.trim()&&(s(``),l(!0))},hint:c?`Sent – thanks!`:`⌘ Enter to send`})]})})}export{o as default};