// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as u from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const d = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
import{t as n}from"./_deps/HugeiconsIcon-C2cDExRS";
import{t as r}from"./_deps/Csv01Icon-Ds3OtOdC";
import{n as i,r as a,t as o}from"./_deps/FolderOpenIcon-gBHxtNPt";
import{t as s}from"./_deps/Folder01Icon-CEhnVDRo";
import{t as c}from"./_deps/Image01Icon-f2njTfyB";
import{t as l}from"./_deps/Pdf01Icon-BQai0-Yi";
function f({items:e,expanded:t,defaultExpanded:n,onExpandedChange:r,selected:i,defaultSelected:a=null,onSelect:o,guides:s=!0,emptyText:c=`Empty`,"aria-label":l,"aria-labelledby":f,className:g}){let _=(0,u.useId)(),v=(0,u.useRef)(null),y=(0,u.useRef)(new Map),{roots:b,byId:x}=(0,u.useMemo)(()=>p(e),[e]),[S,C]=(0,u.useState)(()=>Array.isArray(n)?n:[]),w=t===void 0?S:Array.isArray(t)?t:[],T=(0,u.useMemo)(()=>new Set(w.map(String)),[w]),[E,D]=(0,u.useState)(a),O=i===void 0?E:i,[k,A]=(0,u.useState)(null),j=(0,u.useRef)(new Set),M=(0,u.useMemo)(()=>{let e=[],t=n=>{for(let r of n)e.push(r),r.kids&&T.has(r.id)&&t(r.kids)};return t(b),e},[b,T]),N=M.filter(e=>!e.node.disabled),P=(e,n)=>{if(T.has(e)===n)return;let i=n?[...w,e]:w.filter(t=>String(t)!==e);t===void 0&&C(i),r?.(i)},F=e=>{let n=e.filter(e=>!T.has(e));if(!n.length)return;let i=[...w,...n];t===void 0&&C(i),r?.(i)},I=e=>{e.node.disabled||(i===void 0&&D(e.id),o?.(e.id,e.node))},L=e=>{e&&y.current.get(e)?.focus()},R=(N.find(e=>e.id===k)??N.find(e=>e.id===O)??N[0])?.id;(0,u.useEffect)(()=>{let e=document.activeElement;if(!e||!v.current?.contains(e)||e.getAttribute(`role`)!==`treeitem`)return;let t=e.dataset.id,n=new Set(M.map(e=>e.id));if(!(t&&n.has(t))){for(;t&&!n.has(t);)t=x.get(t)?.parent;t&&L(t)}},[M,x]);let z=(0,u.useRef)({text:``,at:0}),B=(e,t)=>{let n=Date.now(),r=z.current;r.text=n-r.at>700?e:r.text+e,r.at=n;let i=r.text.toLocaleLowerCase(),a=[...i].every(e=>e===i[0]),o=a?i[0]:i,s=a?t+1:t;for(let e=0;e<N.length;e++){let t=N[(s+e+N.length)%N.length];if(String(t.node.label??``).trimStart().toLocaleLowerCase().startsWith(o))return L(t.id)}},V=e=>{let t=e.target;if(t.getAttribute(`role`)!==`treeitem`||e.ctrlKey||e.metaKey||e.altKey)return;let n=x.get(t.dataset.id??``);if(!n)return;let r=N.indexOf(n),i=v.current?getComputedStyle(v.current).direction===`rtl`:!1,a=i?`ArrowLeft`:`ArrowRight`,o=i?`ArrowRight`:`ArrowLeft`,s=n.kids!==null&&T.has(n.id),c=!0;switch(e.key){case`ArrowDown`:L(N[r+1]?.id);break;case`ArrowUp`:L(r>0?N[r-1].id:void 0);break;case`Home`:L(N[0]?.id);break;case`End`:L(N[N.length-1]?.id);break;case a:n.kids&&!n.node.disabled&&(s?L(n.kids.find(e=>!e.node.disabled)?.id):P(n.id,!0));break;case o:s?P(n.id,!1):L(n.parent??void 0);break;case`Enter`:I(n),n.kids&&!n.node.disabled&&P(n.id,!s);break;case` `:I(n);break;case`*`:{let e=n.parent?x.get(n.parent)?.kids??[]:b;F(e.filter(e=>e.kids&&!e.node.disabled).map(e=>e.id));break}default:e.key.length===1&&/\S/.test(e.key)?B(e.key,r):c=!1}c&&e.preventDefault()},H=e=>e.map(e=>{let t=e.kids!==null,n=t&&T.has(e.id);n&&j.current.add(e.id);let r=!!e.node.disabled,i=`${_}-l${e.n}`,a=`${_}-m${e.n}`,o=n&&e.node.openIcon!=null?e.node.openIcon:e.node.icon;return(0,d.jsxs)(`li`,{ref:t=>{t?y.current.set(e.id,t):y.current.delete(e.id)},role:`treeitem`,className:`ui-tvc__item`,"data-id":e.id,"aria-level":e.depth+1,"aria-posinset":e.pos,"aria-setsize":e.size,"aria-expanded":t?n:void 0,"aria-selected":e.id===O,"aria-disabled":r||void 0,"aria-labelledby":i,"aria-describedby":e.node.meta==null?void 0:a,tabIndex:e.id===R?0:-1,onFocus:t=>{t.target===t.currentTarget&&A(e.id)},children:[(0,d.jsxs)(`div`,{className:`ui-tvc__row`,style:{"--ui-tvc-d":e.depth},onMouseDown:r?e=>e.preventDefault():void 0,onClick:()=>{r||(I(e),t&&P(e.id,!n))},children:[(0,d.jsx)(`span`,{className:`ui-tvc__chev`,"aria-hidden":`true`,onClick:t?t=>{t.stopPropagation(),r||P(e.id,!n)}:void 0,children:t&&(0,d.jsx)(m,{})}),o!=null&&(0,d.jsx)(`span`,{className:`ui-tvc__icon`,"aria-hidden":`true`,children:o}),(0,d.jsx)(`span`,{className:`ui-tvc__label`,id:i,dir:`auto`,title:e.node.label,children:e.node.label}),e.node.meta!=null&&(0,d.jsx)(`span`,{className:`ui-tvc__meta`,id:a,dir:`auto`,children:e.node.meta})]}),t&&(0,d.jsx)(`div`,{className:`ui-tvc__fold`,"data-open":n||void 0,children:(0,d.jsx)(`ul`,{role:`group`,className:`ui-tvc__group`,style:{"--ui-tvc-d":e.depth+1},children:(n||j.current.has(e.id))&&(e.kids.length?H(e.kids):(0,d.jsx)(`li`,{role:`none`,className:`ui-tvc__empty`,style:{"--ui-tvc-d":e.depth+1},children:c}))})})]},e.id)});return(0,d.jsxs)(`ul`,{ref:v,role:`tree`,"aria-label":l,"aria-labelledby":f,className:[`ui-tvc`,g].filter(Boolean).join(` `),"data-guides":s||void 0,onKeyDown:V,children:[(0,d.jsx)(`style`,{href:`ui-tree-view-clean`,precedence:`default`,children:h}),H(b)]})}function p(e){let t=new Map,n=0,r=(e,i,a)=>{let o=[];for(let r of Array.isArray(e)?e:[]){if(!r||r.id==null)continue;let e=String(r.id);if(t.has(e))continue;let s={node:r,id:e,n:n++,depth:i,parent:a,pos:0,size:0,kids:null};t.set(e,s),o.push(s)}return o.forEach((e,t)=>{e.pos=t+1,e.size=o.length,e.kids=Array.isArray(e.node.children)?r(e.node.children,i+1,e.id):null}),o};return{roots:r(e,0,null),byId:t}}var m=()=>(0,d.jsx)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,d.jsx)(`path`,{d:`M9 6c0 0 6 4.42 6 6s-6 6-6 6`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})}),h=`
/* Colors and motion as variables – override them on .ui-tvc (see Theming in the docs) */
.ui-tvc {
  --ui-tvc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-tvc-icon: var(--aui-muted, rgba(0, 0, 0, 0.447));
  --ui-tvc-meta: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-tvc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.27));
  --ui-tvc-wash: rgba(0, 0, 0, 0.03);
  --ui-tvc-fill: rgba(0, 0, 0, 0.06);
  --ui-tvc-guide: rgba(0, 0, 0, 0.07);
  --ui-tvc-guide-on: rgba(0, 0, 0, 0.2);
  --ui-tvc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-tvc-ease: var(--aui-ease, cubic-bezier(0.25, 0.9, 0.3, 1));
  /* Sizes: 28px rows, 16px per level */
  --ui-tvc-h: 28px;
  --ui-tvc-pad: 6px;
  --ui-tvc-indent: 16px;
  --ui-tvc-chev: 16px;
  --ui-tvc-r: var(--aui-radius, 6px);

  display: block;
  box-sizing: border-box;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: var(--ui-tvc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-tvc *, .ui-tvc *::before, .ui-tvc *::after { box-sizing: border-box; }
.ui-tvc__group { position: relative; min-height: 0; margin: 0; padding: 0; list-style: none; overflow: hidden; }
.ui-tvc__item { display: block; margin: 0; padding: 0; }

/* A row: chevron, glyph, name, meta – one fixed height; deeper levels indent (at most to 45% of the width) */
.ui-tvc__row {
  display: flex;
  align-items: center;
  gap: 4px;
  height: var(--ui-tvc-h);
  padding-inline: calc(var(--ui-tvc-pad) + min(var(--ui-tvc-d, 0) * var(--ui-tvc-indent), 45%)) var(--ui-tvc-pad);
  overflow: hidden;
  border-radius: var(--ui-tvc-r);
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 90ms ease;
}
.ui-tvc__item[aria-selected="true"] > .ui-tvc__row { background: var(--ui-tvc-fill); }
@media (hover: hover) {
  .ui-tvc__item:not([aria-selected="true"]):not([aria-disabled="true"]) > .ui-tvc__row:hover { background: var(--ui-tvc-wash); }
  .ui-tvc__row:hover .ui-tvc__chev { color: var(--ui-tvc-meta); }
}
.ui-tvc__item[aria-disabled="true"] > .ui-tvc__row { opacity: 0.4; cursor: not-allowed; }

/* The ring sits on the row, inside it – never around the open branch below */
.ui-tvc__item:focus { outline: none; }
.ui-tvc__item:focus-visible > .ui-tvc__row { outline: 2px solid var(--ui-tvc-focus); outline-offset: -2px; }

.ui-tvc__chev {
  display: grid;
  flex: none;
  place-items: center;
  width: var(--ui-tvc-chev);
  height: var(--ui-tvc-chev);
  color: var(--ui-tvc-faint);
  transition: transform 200ms var(--ui-tvc-ease), color 90ms ease;
}
.ui-tvc__chev svg { display: block; }
.ui-tvc__chev:dir(rtl) svg { transform: scaleX(-1); }
.ui-tvc__item[aria-expanded="true"] > .ui-tvc__row > .ui-tvc__chev { transform: rotate(90deg); }
.ui-tvc__item[aria-expanded="true"] > .ui-tvc__row > .ui-tvc__chev:dir(rtl) { transform: rotate(-90deg); }

.ui-tvc__icon { display: grid; flex: none; place-items: center; width: 16px; height: 16px; margin-inline-end: 4px; overflow: hidden; color: var(--ui-tvc-icon); }
.ui-tvc__icon svg, .ui-tvc__icon img { display: block; width: 100%; height: 100%; object-fit: contain; }
.ui-tvc__item[aria-selected="true"] > .ui-tvc__row .ui-tvc__icon { color: var(--ui-tvc-ink); }

/* Long names end in … – the full name on hover */
.ui-tvc__label { flex: 1 1 auto; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-tvc__meta {
  flex: none;
  max-width: 45%;
  margin-inline-start: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 16px;
  color: var(--ui-tvc-meta);
  font-variant-numeric: tabular-nums;
}

/* A branch grows and shrinks in height; closed, its rows are hidden from the keyboard and screen readers too */
.ui-tvc__fold {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows 220ms var(--ui-tvc-ease), visibility 0s linear 220ms;
}
.ui-tvc__fold[data-open] { grid-template-rows: 1fr; visibility: visible; transition: grid-template-rows 220ms var(--ui-tvc-ease), visibility 0s; }

/* Guides: a thin line under each open branch's chevron – darker where the selected row is */
.ui-tvc[data-guides] .ui-tvc__group::before {
  content: "";
  position: absolute;
  top: 2px;
  bottom: 2px;
  inset-inline-start: calc(var(--ui-tvc-pad) + min((var(--ui-tvc-d) - 1) * var(--ui-tvc-indent), 45%) + var(--ui-tvc-chev) / 2 - 0.5px);
  width: 1px;
  background: var(--ui-tvc-guide);
  pointer-events: none;
  transition: background-color 160ms ease;
}
.ui-tvc[data-guides] .ui-tvc__group:has(> .ui-tvc__item[aria-selected="true"])::before { background: var(--ui-tvc-guide-on); }

.ui-tvc__empty {
  display: flex;
  align-items: center;
  height: var(--ui-tvc-h);
  padding-inline: calc(var(--ui-tvc-pad) + min(var(--ui-tvc-d, 0) * var(--ui-tvc-indent), 45%) + var(--ui-tvc-chev) + 4px) var(--ui-tvc-pad);
  font-size: 12px;
  color: var(--ui-tvc-faint);
  white-space: nowrap;
}

/* Touch screens: rows at least 36px tall */
@media (pointer: coarse) {
  .ui-tvc { --ui-tvc-h: 36px; --ui-tvc-indent: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-tvc__row, .ui-tvc__chev, .ui-tvc__fold, .ui-tvc__fold[data-open], .ui-tvc[data-guides] .ui-tvc__group::before { transition: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tvc {
  --ui-tvc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-tvc-icon: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-tvc-meta: var(--aui-muted, rgba(255, 255, 255, 0.45));
  --ui-tvc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.28));
  --ui-tvc-wash: rgba(255, 255, 255, 0.04);
  --ui-tvc-fill: rgba(255, 255, 255, 0.08);
  --ui-tvc-guide: rgba(255, 255, 255, 0.08);
  --ui-tvc-guide-on: rgba(255, 255, 255, 0.24);
  --ui-tvc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
}
`,g=e=>(0,d.jsx)(n,{icon:e,size:16,strokeWidth:1.6}),_=(e,t,n,r={})=>({id:e,label:t,icon:g(s),openIcon:g(o),children:n,...r}),v=(e,t,n=a,r)=>({id:e,label:t,icon:g(n),meta:r}),y=[_(`prompts`,`prompts`,[v(`prompts/system`,`system.md`),v(`prompts/tools`,`tools.md`),v(`prompts/style`,`style-guide.md`)],{meta:`3`}),_(`runs`,`runs`,[_(`runs/418`,`run-418`,[v(`runs/418/report`,`report.md`,a,`12 KB`),v(`runs/418/sources`,`sources.csv`,r,`48 rows`),_(`runs/418/charts`,`charts`,[v(`runs/418/charts/revenue`,`revenue-by-region.png`,c)])],{meta:`Today`}),_(`runs/417`,`run-417`,[v(`runs/417/report`,`report.md`,a,`9 KB`)],{meta:`Yesterday`}),_(`runs/409`,`run-409 · archived`,[],{disabled:!0})]),_(`memory`,`memory`,[]),_(`knowledge`,`knowledge`,[v(`knowledge/pricing`,`pricing-2026-competitor-analysis-final-v3-reviewed.pdf`,l,`2.4 MB`)]),v(`agent`,`agent.yaml`,i),v(`readme`,`README.md`)],b=(e,t,n=new Map)=>{for(let r of e)n.set(r.id,{node:r,parent:t}),r.children&&b(r.children,r.id,n);return n},x=[[[`runs`],null],[[`runs`,`runs/418`],null],[[`runs`,`runs/418`],`runs/418/report`]];function S(){let[e,t]=(0,u.useState)([]),[n,r]=(0,u.useState)(null),i=(0,u.useRef)([]),a=(0,u.useId)(),o=(0,u.useMemo)(()=>b(y),[]),s=()=>{i.current.forEach(clearTimeout),i.current=[]};(0,u.useEffect)(()=>(i.current=x.map(([e,n],i)=>window.setTimeout(()=>{t(e),r(n)},900+i*1100)),s),[]);let c=[];for(let e=n??void 0;e;e=o.get(e)?.parent)c.unshift(o.get(e)?.node.label??``);return(0,d.jsx)(`div`,{className:`tv-demo tv-demo--clean`,onPointerDownCapture:s,onKeyDownCapture:s,children:(0,d.jsxs)(`div`,{className:`tv-demo__card`,children:[(0,d.jsxs)(`div`,{className:`tv-demo__head`,children:[(0,d.jsx)(`span`,{className:`tv-demo__title`,id:`${a}-title`,children:`Workspace`}),(0,d.jsx)(`span`,{className:`tv-demo__sub`,children:`research-agent`})]}),(0,d.jsx)(`div`,{className:`tv-demo__scroll`,children:(0,d.jsx)(f,{items:y,expanded:e,onExpandedChange:t,selected:n,onSelect:r,"aria-labelledby":`${a}-title`})}),(0,d.jsx)(`div`,{className:`tv-demo__foot`,title:c.join(` / `)||void 0,children:c.length?c.join(` / `):`Pick a file`})]})})}export{S as default};