// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as r from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const i = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/component.clean-B6409zdy";
var a=[{id:`workspace`,title:`Set up your workspace`,tasks:[{id:`name`,label:`Choose a workspace name`},{id:`invite`,label:`Invite your teammates to collaborate`},{id:`calendar`,label:`Connect your calendar`}]},{id:`billing`,title:`Set up billing`,tasks:[{id:`card`,label:`Add a payment method`},{id:`plan`,label:`Choose a plan`}]},{id:`verify`,title:`Verify your account`,tasks:[{id:`email`,label:`Confirm your email address`,done:!0}]}];function o(){let[e,t]=(0,r.useState)(0);return(0,i.jsx)(`div`,{className:`setup-demo`,children:(0,i.jsx)(n,{groups:a,onEdit:()=>{},onClose:()=>t(e=>e+1)},e)})}export{o as default};