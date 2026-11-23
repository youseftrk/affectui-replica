// @ts-nocheck
// Ported verbatim from live demo bundle (react + jsx-runtime shimmed).
import * as n from 'react';
import { jsx as __jsx, jsxs as __jsxs, Fragment as __Fragment } from 'react/jsx-runtime';
const r = { jsx: __jsx, jsxs: __jsxs, Fragment: __Fragment };
function i({code:e,language:t,filename:i,showLineNumbers:a=!1,highlightLines:o,wrap:l=!1,maxHeight:u,copyable:d=!0,onCopy:f,className:p,style:v}){let y=typeof e==`string`?e:e==null?``:String(e),b=y.replace(/\r\n?/g,`
`).replace(/\n$/,``),x=s(t),S=(0,n.useMemo)(()=>h(m(b,x)),[b,x]),C=(0,n.useMemo)(()=>new Set(Array.isArray(o)?o:[]),[o]),w=i||c(t),T=(0,n.useRef)(null),[E,D]=(0,n.useState)(!1),[O,k]=(0,n.useState)(!1);(0,n.useLayoutEffect)(()=>{let e=T.current;if(!e)return;let t=()=>D(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1);t();let n=new ResizeObserver(t);return n.observe(e),e.firstElementChild&&n.observe(e.firstElementChild),()=>n.disconnect()},[b,l,u,a]),(0,n.useEffect)(()=>{if(!O)return;let e=window.setTimeout(()=>k(!1),1400);return()=>window.clearTimeout(e)},[O]);let A=()=>g(y).then(e=>{e&&(k(!0),f?.(y))}),j=!!w||d,M=String(S.length).length;return(0,r.jsxs)(`figure`,{className:[`ui-codec`,p].filter(Boolean).join(` `),"data-wrap":l||void 0,"data-numbers":a||void 0,style:{...v,"--ui-codec-digits":M},children:[(0,r.jsx)(`style`,{href:`ui-code-block-clean`,precedence:`default`,children:_}),j&&(0,r.jsxs)(`figcaption`,{className:`ui-codec__head`,children:[(0,r.jsx)(`span`,{className:`ui-codec__label`,dir:`auto`,title:w||void 0,children:w}),d&&(0,r.jsxs)(`button`,{type:`button`,className:`ui-codec__copy`,"data-copied":O||void 0,"aria-label":O?`Copied`:`Copy code`,title:O?`Copied`:`Copy code`,onClick:A,children:[(0,r.jsxs)(`svg`,{className:`ui-codec__copy-icon`,viewBox:`0 0 16 16`,"aria-hidden":`true`,children:[(0,r.jsx)(`rect`,{x:`5.5`,y:`5.5`,width:`8.5`,height:`8.5`,rx:`2`}),(0,r.jsx)(`path`,{d:`M10.5 3.75v-.25A1.5 1.5 0 0 0 9 2H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5h.25`})]}),(0,r.jsx)(`svg`,{className:`ui-codec__copy-done`,viewBox:`0 0 16 16`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{d:`M3.5 8.4 6.6 11.3 12.5 4.9`})})]})]}),d&&(0,r.jsx)(`span`,{className:`ui-codec__sr`,role:`status`,children:O?`Copied`:``}),(0,r.jsx)(`div`,{ref:T,className:`ui-codec__scroll`,style:u==null?void 0:{maxHeight:u},tabIndex:E?0:void 0,role:E?`region`:void 0,"aria-label":E?`${w||`Code`}, code`:void 0,children:(0,r.jsx)(`pre`,{className:`ui-codec__pre`,dir:`ltr`,children:(0,r.jsx)(`code`,{className:`ui-codec__code`,children:S.map((e,t)=>(0,r.jsxs)(`span`,{className:`ui-codec__line`,"data-marked":C.has(t+1)||void 0,children:[a&&(0,r.jsx)(`span`,{className:`ui-codec__ln`,"aria-hidden":`true`,children:t+1}),(0,r.jsx)(`span`,{className:`ui-codec__text`,children:e.map(([e,t],n)=>e?(0,r.jsx)(`span`,{className:`ui-codec__t-${e}`,children:t},n):t)})]},t))})})})]})}var a={ts:`js`,tsx:`js`,typescript:`js`,js:`js`,jsx:`js`,javascript:`js`,mjs:`js`,cjs:`js`,json:`json`,jsonc:`json`,bash:`bash`,sh:`bash`,shell:`bash`,zsh:`bash`,console:`bash`,python:`python`,py:`python`},o={ts:`TypeScript`,typescript:`TypeScript`,tsx:`TSX`,js:`JavaScript`,javascript:`JavaScript`,jsx:`JSX`,mjs:`JavaScript`,cjs:`JavaScript`,json:`JSON`,jsonc:`JSON`,bash:`Bash`,sh:`Shell`,shell:`Shell`,zsh:`Zsh`,console:`Terminal`,python:`Python`,py:`Python`},s=e=>e?a[e.toLowerCase()]??null:null,c=e=>e?o[e.toLowerCase()]??e:``,l=`(?![\\s\\S])`,u=`\\/\\*[\\s\\S]*?(?:\\*\\/|${l})`,d={js:[[`com`,`\\/\\/[^\\n]*|${u}`],[`str`,`"(?:[^"\\\\\\n]|\\\\.)*"?|'(?:[^'\\\\\\n]|\\\\.)*'?|\`(?:[^\`\\\\]|\\\\[\\s\\S])*\`?`],[`num`,`\\b0[xXbBoO][\\da-fA-F_]+n?\\b|\\b\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?n?\\b`],[`lit`,`\\b(?:true|false|null|undefined|NaN|Infinity)\\b`],[`kw`,`\\b(?:abstract|as|async|await|break|case|catch|class|const|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|keyof|let|new|of|private|protected|public|readonly|return|satisfies|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\\b`],[`fn`,`(?<![\\w$])[A-Za-z_$][\\w$]*(?=\\s*\\()`]],json:[[`com`,`\\/\\/[^\\n]*|${u}`],[`key`,`"(?:[^"\\\\\\n]|\\\\.)*"(?=\\s*:)`],[`str`,`"(?:[^"\\\\\\n]|\\\\.)*"?`],[`num`,`-?\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b`],[`lit`,`\\b(?:true|false|null)\\b`]],bash:[[`com`,`(?<![^\\s;|&(])#[^\\n]*`],[`str`,`"(?:[^"\\\\]|\\\\[\\s\\S])*"?|'[^']*'?`],[`var`,`\\$\\{[^}\\n]*\\}?|\\$[A-Za-z_]\\w*|\\$[0-9@#?*$!-]`],[`kw`,`\\b(?:if|then|else|elif|fi|for|in|do|done|while|until|case|esac|function|return|export|local|readonly|unset|exit)\\b`],[`fn`,`(?<=^[ \\t]*|[|;&(][ \\t]*)[A-Za-z_.\\/~][\\w.\\/~+-]*(?![\\w=])`]],python:[[`com`,`#[^\\n]*`],[`str`,`(?:\\b[rRbBuUfF]{1,2})?(?:"""[\\s\\S]*?(?:"""|${l})|'''[\\s\\S]*?(?:'''|${l})|"(?:[^"\\\\\\n]|\\\\.)*"?|'(?:[^'\\\\\\n]|\\\\.)*'?)`],[`fn`,`@[A-Za-z_][\\w.]*`],[`num`,`\\b0[xXoObB][\\da-fA-F_]+\\b|\\b\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?j?\\b`],[`lit`,`\\b(?:True|False|None|self|cls)\\b`],[`kw`,`\\b(?:and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|raise|return|try|while|with|yield)\\b`],[`fn`,`\\b[A-Za-z_]\\w*(?=\\s*\\()`]]},f=new Map;function p(e){let t=f.get(e);if(!t){let n=d[e];t={re:new RegExp(n.map(([,e])=>`(${e})`).join(`|`),`gm`),kinds:n.map(([e])=>e)},f.set(e,t)}return t}function m(e,t){if(!t||!e)return[[null,e]];let{re:n,kinds:r}=p(t);n.lastIndex=0;let i=[],a=0,o;for(;o=n.exec(e);){if(!o[0]){n.lastIndex++;continue}o.index>a&&i.push([null,e.slice(a,o.index)]);let t=o.findIndex((e,t)=>t>0&&e!==void 0);i.push([r[t-1]??null,o[0]]),a=o.index+o[0].length}return a<e.length&&i.push([null,e.slice(a)]),i}function h(e){let t=[[]];for(let[n,r]of e)r.split(`
`).forEach((e,r)=>{r&&t.push([]),e&&t[t.length-1].push([n,e])});return t}async function g(e){try{return await navigator.clipboard.writeText(e),!0}catch{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.cssText=`position:fixed;opacity:0;pointer-events:none`,document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand(`copy`)}catch{n=!1}return t.remove(),n}}var _=`
/* Colors as variables – override them on .ui-codec (see Theming in the docs) */
.ui-codec {
  --ui-codec-bg: #fafafa;
  --ui-codec-line: var(--aui-border, rgba(0, 0, 0, 0.06));
  --ui-codec-ink: var(--aui-ink, rgba(0, 0, 0, 0.88));
  --ui-codec-muted: var(--aui-muted, rgba(0, 0, 0, 0.45));
  --ui-codec-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.27));
  --ui-codec-icon: var(--aui-muted, rgba(0, 0, 0, 0.447));
  --ui-codec-wash: rgba(0, 0, 0, 0.04);
  --ui-codec-mark: rgba(0, 96, 226, 0.06);
  --ui-codec-mark-edge: rgba(0, 96, 226, 0.5);
  --ui-codec-focus: var(--aui-focus, rgba(0, 96, 226, 0.7));
  --ui-codec-ease: var(--aui-ease, cubic-bezier(0.22, 1, 0.36, 1));
  --ui-codec-mono: var(--aui-font-mono, ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace);
  /* Tokens */
  --ui-codec-com: rgba(0, 0, 0, 0.42);
  --ui-codec-str: #0b8576;
  --ui-codec-kw: #8a35d6;
  --ui-codec-num: #b25e00;
  --ui-codec-lit: #b25e00;
  --ui-codec-fn: #1f63c9;
  --ui-codec-key: rgba(0, 0, 0, 0.88);
  --ui-codec-var: #1f63c9;

  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  border-radius: var(--aui-radius-lg, 10px);
  background: var(--ui-codec-bg);
  box-shadow: 0 0 0 0.5px var(--ui-codec-line);
  color: var(--ui-codec-ink);
  font-family: var(--aui-font, "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 13px;
  line-height: 20px;
  -webkit-font-smoothing: antialiased;
}
.ui-codec *, .ui-codec *::before, .ui-codec *::after { box-sizing: border-box; }

/* Header: the name on the left, copy on the right – 36px, the button as far from the right edge as from the top */
.ui-codec__head {
  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 6px 0 14px;
  box-shadow: inset 0 -0.5px 0 var(--ui-codec-line);
}
.ui-codec__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--ui-codec-muted);
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ui-codec__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* Copy: a quiet ghost button; the copy glyph blurs into a check */
.ui-codec__copy {
  all: unset;
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: calc(var(--aui-radius-sm, 5px) + 1px);
  color: var(--ui-codec-icon);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-codec__copy svg {
  position: absolute;
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: opacity 200ms ease, transform 320ms var(--ui-codec-ease), filter 200ms ease;
}
.ui-codec__copy-icon rect { fill: currentColor; stroke: none; }
.ui-codec__copy .ui-codec__copy-done { opacity: 0; transform: scale(0.6); filter: blur(2px); stroke-width: 1.7; }
.ui-codec__copy[data-copied] { color: var(--ui-codec-ink); }
.ui-codec__copy[data-copied] .ui-codec__copy-icon { opacity: 0; transform: scale(0.6); filter: blur(2px); }
.ui-codec__copy[data-copied] .ui-codec__copy-done { opacity: 1; transform: none; filter: none; }
.ui-codec__copy:focus-visible { outline: 2px solid var(--ui-codec-focus); outline-offset: 2px; }
@media (hover: hover) {
  .ui-codec__copy:hover { background: var(--ui-codec-wash); color: var(--ui-codec-ink); }
}

/* The code: scrolls sideways (or wraps) and, past maxHeight, down – never wider than its container */
.ui-codec__scroll {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.16) transparent;
}
.ui-codec__scroll:focus-visible { outline: 2px solid var(--ui-codec-focus); outline-offset: -2px; }
.ui-codec__pre {
  margin: 0;
  padding: 10px 0;
  font-family: var(--ui-codec-mono);
  font-size: 12px;
  line-height: 20px;
  color: var(--ui-codec-ink);
  tab-size: 2;
  text-align: left;
}
.ui-codec__code { display: block; width: max-content; min-width: 100%; font: inherit; }
.ui-codec[data-wrap] .ui-codec__code { width: auto; }

.ui-codec__line { display: flex; min-height: 20px; padding: 0 14px; }
.ui-codec__text { flex: 1 0 auto; white-space: pre; }
.ui-codec[data-wrap] .ui-codec__text { flex: 1 1 auto; min-width: 0; white-space: pre-wrap; overflow-wrap: anywhere; }
.ui-codec__line[data-marked] { background: var(--ui-codec-mark); box-shadow: inset 2px 0 0 var(--ui-codec-mark-edge); }

/* Line numbers stay in place while long lines scroll sideways */
.ui-codec[data-numbers] .ui-codec__line { padding-left: 0; }
.ui-codec__ln {
  position: sticky;
  left: 0;
  z-index: 1;
  flex: none;
  min-width: calc(var(--ui-codec-digits, 2) * 1ch + 30px);
  padding: 0 14px 0 16px;
  background: var(--ui-codec-bg);
  color: var(--ui-codec-faint);
  text-align: right;
  font-variant-numeric: tabular-nums;
  -webkit-user-select: none;
  user-select: none;
}
.ui-codec__line[data-marked] .ui-codec__ln {
  background: linear-gradient(var(--ui-codec-mark), var(--ui-codec-mark)), var(--ui-codec-bg);
  box-shadow: inset 2px 0 0 var(--ui-codec-mark-edge);
  color: var(--ui-codec-muted);
}

.ui-codec__t-com { color: var(--ui-codec-com); }
.ui-codec__t-str { color: var(--ui-codec-str); }
.ui-codec__t-kw { color: var(--ui-codec-kw); }
.ui-codec__t-num { color: var(--ui-codec-num); }
.ui-codec__t-lit { color: var(--ui-codec-lit); }
.ui-codec__t-fn { color: var(--ui-codec-fn); }
.ui-codec__t-key { color: var(--ui-codec-key); }
.ui-codec__t-var { color: var(--ui-codec-var); }

/* Touch screens: a bigger hit area around the copy button, the look stays */
@media (pointer: coarse) {
  .ui-codec__copy::after { content: ""; position: absolute; inset: -6px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-codec__copy, .ui-codec__copy svg { transition: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-codec {
  --ui-codec-bg: #1c1c1e;
  --ui-codec-line: var(--aui-border, rgba(255, 255, 255, 0.08));
  --ui-codec-ink: var(--aui-ink, rgba(255, 255, 255, 0.9));
  --ui-codec-muted: var(--aui-muted, rgba(255, 255, 255, 0.46));
  --ui-codec-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.28));
  --ui-codec-icon: var(--aui-muted, rgba(255, 255, 255, 0.5));
  --ui-codec-wash: rgba(255, 255, 255, 0.06);
  --ui-codec-mark: rgba(77, 141, 255, 0.1);
  --ui-codec-mark-edge: rgba(77, 141, 255, 0.6);
  --ui-codec-focus: var(--aui-focus, rgba(77, 141, 255, 0.8));
  --ui-codec-com: rgba(255, 255, 255, 0.38);
  --ui-codec-str: #4fc3b4;
  --ui-codec-kw: #cfaef5;
  --ui-codec-num: #f2a15c;
  --ui-codec-lit: #f2a15c;
  --ui-codec-fn: #7cb4ff;
  --ui-codec-key: rgba(255, 255, 255, 0.9);
  --ui-codec-var: #7cb4ff;
}
:where(.dark, [data-theme="dark"]) .ui-codec__scroll { scrollbar-color: rgba(255, 255, 255, 0.18) transparent; }
`,v=`import { defineAgent } from "@acme/agents";

export const reviewer = defineAgent({
  name: "Code reviewer",
  model: "claude-opus",
  tools: ["github", "linear"],
  // Ask before anything leaves the repo
  approval: { required: true, timeout: "2h" },
  maxSteps: 24,
});
`,y=`npm install @acme/agents
npx acme run reviewer --watch`;function b(){return(0,r.jsxs)(`div`,{className:`codeb-demo`,children:[(0,r.jsx)(i,{language:`ts`,filename:`agents/reviewer.ts`,code:v,showLineNumbers:!0,highlightLines:[8,9]}),(0,r.jsx)(i,{language:`bash`,code:y})]})}export{b as default};