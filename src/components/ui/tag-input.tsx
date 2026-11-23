// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as r from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const i = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/component.clean-Bza_kxmy";
var a=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;function o(){let[e,t]=(0,r.useState)([`maya@acme.com`,`jonas@acme.com`]),[o,s]=(0,r.useState)([`Onboarding`,`Q4 launch`]);return(0,i.jsx)(`div`,{className:`tag-demo`,children:(0,i.jsxs)(`form`,{className:`tag-democ`,onSubmit:e=>e.preventDefault(),children:[(0,i.jsx)(n,{label:`Invite people`,value:e,onChange:t,placeholder:`name@company.com`,avatar:!0,splitOnSpace:!0,max:10,normalize:e=>e.trim().toLowerCase(),validate:e=>a.test(e)?!0:`“${e}” doesn't look like an email address.`,hint:`Paste a whole list – commas, spaces or new lines.`}),(0,i.jsx)(n,{label:`Labels`,value:o,onChange:s,placeholder:`Add a label`,optional:!0,hint:`Press Enter or a comma after each one.`})]})})}export{o as default};