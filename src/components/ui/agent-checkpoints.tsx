import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';

const css = ".ui-ackc { --ui-ackc-card: #ffffff; --ui-ackc-strong: var(--aui-ink, #000000); --ui-ackc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88)); --ui-ackc-text: var(--aui-muted, rgba(0, 0, 0, 0.61)); --ui-ackc-muted: var(--aui-muted, rgba(0, 0, 0, 0.45)); --ui-ackc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.27)); --ui-ackc-line: var(--aui-border, rgba(0, 0, 0, 0.06)); --ui-ackc-hover: var(--aui-subtle, rgba(0, 0, 0, 0.025)); --ui-ackc-chip: var(--aui-subtle, rgba(0, 0, 0, 0.05)); --ui-ackc-link: #83c7fe; --ui-ackc-rail: rgba(0, 0, 0, 0.12); --ui-ackc-dot: #83c7fe; --ui-ackc-head: var(--aui-info, #0070d6); --ui-ackc-failed-bg: color-mix(in srgb, var(--aui-red, #f04438) 8%, transparent); --ui-ackc-failed-ink: var(--aui-danger, #c4320a); --ui-ackc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7)); --ui-ackc-dim: 0.5; --ui-ackc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05); --ui-ackc-row: 30px; --ui-ackc-max: 420px; --ui-ackc-ease: cubic-bezier(0.32, 0.72, 0.24, 1); position: relative; box-sizing: border-box; width: 100%; border-radius: calc(var(--aui-radius-lg, 10px) + 2px); background: var(--aui-surface, var(--ui-ackc-card)); box-shadow: var(--aui-shadow-card, var(--ui-ackc-shadow)); container: ui-ackc / inline-size; font-family: var(--aui-font, \"Inter\", \"InterVariable\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif); font-size: 13px; font-weight: 400; line-height: 20px; color: var(--ui-ackc-text); text-align: left; -webkit-font-smoothing: antialiased; }\n.ui-ackc *, .ui-ackc ::before, .ui-ackc ::after { box-sizing: border-box; }\n.ui-ackc svg { display: block; flex: 0 0 auto; }\n.ui-ackc__head { display: flex; align-items: center; gap: 8px; min-width: 0px; padding: 12px 16px 6px 14px; }\n.ui-ackc__mark { display: grid; flex: 0 0 auto; place-items: center; width: 16px; color: var(--ui-ackc-muted); }\n.ui-ackc__title { flex: 0 1 auto; min-width: 0px; overflow: hidden; font-weight: 500; color: var(--ui-ackc-strong); white-space: nowrap; text-overflow: ellipsis; }\n.ui-ackc__task { flex: 1 1 0px; min-width: 0px; overflow: hidden; color: var(--ui-ackc-muted); white-space: nowrap; text-overflow: ellipsis; }\n.ui-ackc__sum { flex: 0 0 auto; margin-left: auto; font-size: 12px; line-height: 16px; color: var(--ui-ackc-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }\n.ui-ackc__empty { margin: 0px; padding: 28px 16px; text-align: center; color: var(--ui-ackc-muted); }\n.ui-ackc__list { position: relative; height: calc(var(--ui-ackc-rows) * var(--ui-ackc-row) + 10px); max-height: var(--ui-ackc-max); transition: height 220ms var(--ui-ackc-ease); margin: 0px; padding: 0px 0px 10px; overflow: hidden; overscroll-behavior: contain; list-style: none; scrollbar-width: thin; }\n.ui-ackc__list[data-scrolls] { overflow-y: auto; }\n.ui-ackc__list:focus { outline: none; }\n.ui-ackc__rail { position: absolute; top: 0px; left: 0px; overflow: visible; pointer-events: none; }\n.ui-ackc__line { fill: none; stroke: var(--ui-ackc-rail); stroke-width: 1.5; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0; transition: stroke 200ms; animation: ui-ackc-draw 220ms var(--ui-ackc-ease) both; }\n.ui-ackc__line[data-live] { stroke: var(--ui-ackc-link); }\n.ui-ackc__line[data-fork] { animation-duration: 380ms; }\n.ui-ackc__dot circle { fill: var(--aui-surface, var(--ui-ackc-card)); stroke: var(--ui-ackc-rail); stroke-width: 1.5; transition: fill 200ms, stroke 200ms; }\n.ui-ackc__dot[data-live] circle { fill: var(--ui-ackc-dot); stroke: var(--aui-surface, var(--ui-ackc-card)); }\n.ui-ackc__dot[data-head] circle { fill: var(--ui-ackc-head); stroke: var(--aui-surface, var(--ui-ackc-card)); }\n.ui-ackc__dot { animation: ui-ackc-pop 180ms var(--ui-ackc-ease) both; transform-box: fill-box; transform-origin: center center; }\n.ui-ackc__glint { transform-box: fill-box; transform-origin: center center; animation: 700ms ease-in-out 120ms 1 normal both running ui-ackc-glint; }\n.ui-ackc__row { position: relative; display: flex; align-items: center; gap: 8px; height: var(--ui-ackc-row); padding: 0 14px 0 var(--ui-ackc-gutter); outline: none; color: var(--ui-ackc-ink); transition: padding-left 240ms var(--ui-ackc-ease); animation: ui-ackc-rise 180ms var(--ui-ackc-ease) both; }\n.ui-ackc__row::before { content: \"\"; position: absolute; inset: 2px 6px; z-index: -1; border-radius: calc(var(--aui-radius-sm, 5px) + 2px); background: var(--ui-ackc-hover); opacity: 0; transition: opacity 150ms; }\n.ui-ackc__row:hover::before, .ui-ackc__row:focus-visible::before { opacity: 1; }\n.ui-ackc__row:focus-visible::before { outline: 2px solid var(--ui-ackc-focus); outline-offset: -2px; }\n.ui-ackc__list { isolation: isolate; }\n.ui-ackc__row:not([data-live]) > :not(.ui-ackc__rewind) { opacity: var(--ui-ackc-dim); transition: opacity 200ms; }\n.ui-ackc__row:not([data-live]):is(:hover, :focus-visible) > :not(.ui-ackc__rewind) { opacity: 0.8; }\n.ui-ackc__icon { display: grid; flex: 0 0 auto; place-items: center; width: 18px; height: 18px; margin-right: -1px; border-radius: 5px; background: var(--ui-ackc-card); box-shadow: var(--ui-ackc-shadow); }\n.ui-ackc__icon > svg { width: 11px; height: 11px; }\n.ui-ackc__name { flex: 0 1 auto; min-width: 0px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; transition: opacity 200ms; }\n.ui-ackc__row[data-status=\"running\"] .ui-ackc__name { background-image: ; background-position-x: ; background-position-y: ; background-size: ; background-repeat: ; background-attachment: ; background-origin: ; background-color: ; background-clip: text; color: transparent; animation: 800ms linear 0s infinite normal none running ui-ackc-shine; }\n.ui-ackc__row[data-status=\"stopped\"] .ui-ackc__name { color: var(--ui-ackc-muted); }\n.ui-ackc__attempt, .ui-ackc__badge { flex: 0 0 auto; height: 18px; padding: 0px 6px; border-radius: var(--aui-radius-sm, 5px); background: var(--ui-ackc-chip); font-size: 11px; font-weight: 500; line-height: 18px; color: var(--ui-ackc-text); white-space: nowrap; }\n.ui-ackc__badge { background: var(--ui-ackc-failed-bg); color: var(--ui-ackc-failed-ink); }\n.ui-ackc__meta { display: flex; flex: 0 0 auto; align-items: center; gap: 10px; margin-left: auto; font-size: 12px; line-height: 16px; color: var(--ui-ackc-muted); font-variant-numeric: tabular-nums; white-space: nowrap; transition: opacity 150ms; }\n.ui-ackc__time { min-width: 30px; text-align: right; }\n.ui-ackc__files, .ui-ackc__stopped { color: var(--ui-ackc-faint); }\n.ui-ackc__files { display: inline-flex; align-items: center; gap: 4px; width: 58px; }\n.ui-ackc__files svg { color: var(--ui-ackc-muted); }\n.ui-ackc__rewind { position: absolute; top: 50%; right: 8px; display: inline-flex; align-items: center; gap: 5px; height: 22px; margin: 0px; padding: 0px 9px 0px 7px; border: 0px; border-radius: calc(var(--aui-radius-sm, 5px) + 1px); background: var(--aui-surface, var(--ui-ackc-card)); box-shadow: var(--ui-ackc-shadow); font-style: inherit; font-variant: inherit; font-stretch: inherit; font-family: inherit; font-optical-sizing: inherit; font-size-adjust: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-language-override: inherit; font-size: 12px; font-weight: 500; line-height: 16px; color: var(--ui-ackc-ink); cursor: pointer; opacity: 0; pointer-events: none; transform: translateY(-50%) scale(0.96); transition: opacity 150ms, transform 150ms; }\n.ui-ackc__rewind svg { color: var(--ui-ackc-muted); }\n.ui-ackc__row:is(:hover, :focus-visible) .ui-ackc__rewind { opacity: 1; pointer-events: auto; transform: translateY(-50%); }\n.ui-ackc__row:has(.ui-ackc__rewind):is(:hover, :focus-visible) .ui-ackc__meta { opacity: 0; }\n.ui-ackc__rewind:active { transform: translateY(-50%) scale(0.97); }\n@media (hover: none){.ui-ackc__rewind { right: 6px; height: 26px; }}\n@media (prefers-reduced-motion: reduce){.ui-ackc *, .ui-ackc ::before, .ui-ackc ::after { animation: auto ease 0s 1 normal none running none !important; transition: none !important; }}\n@media (prefers-reduced-motion: reduce){.ui-ackc__row[data-status=\"running\"] .ui-ackc__name { background: none; color: var(--ui-ackc-ink); }}\n@media (prefers-reduced-motion: reduce){.ui-ackc__glint { display: none; }}\n:where(.dark, [data-theme=\"dark\"]) .ui-ackc { --ui-ackc-card: #1c1c1f; --ui-ackc-strong: var(--aui-ink, #ffffff); --ui-ackc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9)); --ui-ackc-text: var(--aui-muted, rgba(255, 255, 255, 0.62)); --ui-ackc-muted: var(--aui-muted, rgba(255, 255, 255, 0.45)); --ui-ackc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.28)); --ui-ackc-line: var(--aui-border, rgba(255, 255, 255, 0.08)); --ui-ackc-hover: var(--aui-subtle, rgba(255, 255, 255, 0.04)); --ui-ackc-chip: var(--aui-subtle, rgba(255, 255, 255, 0.07)); --ui-ackc-link: var(--aui-blue, #0190fe); --ui-ackc-rail: rgba(255, 255, 255, 0.16); --ui-ackc-dot: var(--aui-blue, #0190fe); --ui-ackc-head: var(--aui-info, #4fb0fe); --ui-ackc-failed-bg: color-mix(in srgb, var(--aui-red, #ff6b5f) 14%, transparent); --ui-ackc-failed-ink: var(--aui-danger, #ff8a7a); --ui-ackc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8)); --ui-ackc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4); }\n.lp-show__main > .ui-agtc .ui-agtc__node { padding-bottom: 72px; }\n.lp-show .ui-agtc { --ui-agtc-card-w: 320px; }\n.lp-show .ui-agtc__node > * { max-width: 236px; }\n.lp-show__main > .ui-agtc .ui-agtc__node { row-gap: 14px; }\n.lp-show .ui-agtc__status { align-self: center; }\n.lp-show .ui-agtc__bar { display: none; }\n.lp-show .ui-agtc__node, .lp-show__main > .ui-ccc .ui-ccc__body { box-shadow: var(--ui-agtc-shadow,var(--ui-ccc-shadow)), 0 18px 40px -10px #0000001f, 0 40px 80px -24px #0000001a; }\n.lp-show__above .ui-agtc__node { box-shadow: var(--ui-agtc-shadow), 0 2px 4px -2px #0000000a; }\n.lp-trust__track { flex: 0 0 auto; animation: 48s linear 0s infinite normal none running lp-trust-scroll; display: flex; }\n.lp-trust__logos:hover .lp-trust__track { animation-play-state: paused; }\n@media (max-width: 760px){.lp-trust__track { animation-duration: 40s; }}\n@media (prefers-reduced-motion: reduce){.lp-trust__track { flex: 1 1 0%; justify-content: center; animation: auto ease 0s 1 normal none running none; }}\n.lp-iso__track { animation: 80s linear 0s infinite normal none running lp-iso-scroll; }\n.ba-tweak .ba-tweak__trackcard { padding: 0px 12px; }\n.ba-tweak__track { background: var(--muted-bg); border-radius: 2px; flex: 1 1 0%; height: 3px; position: relative; }\n.ba-tweak__track i { top: 50%; left: calc(20% + (var(--ba-r) - 6) * 6%); background: var(--card); width: 10px; height: 10px; box-shadow: 0 0 0 1.25px var(--text); border-radius: 50%; margin: -5px 0px 0px -5px; position: absolute; }\n@media (prefers-reduced-motion: reduce){.lp-menu__panel, .lp-hero__copy > *, .lp-iso, .lp-iso__track, .lp-grid { animation: auto ease 0s 1 normal none running none; }}\n.login__back { top: calc(var(--gutter) + 2px - 95px); gap: 4px; padding-left: 8px; position: absolute; left: 0px; }\n@media (max-width: 860px){.login__back { top: 0px; }}\n.countdown__track, .countdown__part { display: inline; }\n.wish__back { height: 30px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-size-adjust: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-language-override: inherit; color: var(--text-muted); cursor: pointer; background: 0px 0px; border: 0px; padding: 0px 4px; font-size: 13px; }\n.wish__back:hover { color: var(--text); }\n.review__stack { display: grid; }\n@media (max-width: 600px){.review__stack { grid-area: quote; }}\n.ack-demo { grid-template-columns: minmax(0px, 480px); justify-content: center; width: 100%; display: grid; }\n.ack-demo:has(.ui-ack) { grid-template-columns: minmax(0px, 520px); }\n.card__preview .ack-demo { grid-template-columns: auto; align-content: start; padding: 50px 16px 0px; position: absolute; inset: 0px; mask: linear-gradient(rgb(0, 0, 0) 82%, rgba(0, 0, 0, 0) 99%); }\n.card__preview .ack-demo :is(.ui-ack, .ui-ackc) { zoom: 0.6; width: 480px; }\n.stage:has(.ack-demo) { height: 560px; }\n.stage .ack-demo { align-self: start; margin-top: 64px; padding-inline: 24px; }\n@media (max-width: 760px){.stage:has(.ack-demo) { padding-left: 12px; padding-right: 12px; }}\n@media (max-width: 760px){.stage .ack-demo { margin-top: 84px; padding-inline: 0px; }}\n@keyframes ui-ackc-draw {0%{stroke-dashoffset: 1;}}\n@keyframes ui-ackc-pop {0%{opacity: 0; transform: scale(0.4);}}\n@keyframes ui-ackc-rise {0%{opacity: 0; transform: translateY(4px);}}\n@keyframes ui-ackc-glint {0%{transform: translateX(-10px) rotate(20deg);}100%{transform: translateX(10px) rotate(20deg);}}\n@keyframes ui-ackc-shine {0%{background-position: 100% 0px;}100%{background-position: 0px 0px;}}\n@keyframes lp-trust-scroll {100%{transform: translate(-50%);}}\n@keyframes lp-iso-scroll {100%{transform: translateY(-33.3333%);}}";

// ---- embedded live snapshots ----
const ICONS: Record<string, string> = {
  "T": "<svg viewBox=\"0 0 49.883 49.877\" fill=\"none\" aria-hidden=\"true\"><g transform=\"translate(0 0)\"><path d=\"M18.3549 10.4784C15.4713 10.4784 13.1157 8.12279 13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V10.4784H18.3549Z\" fill=\"#36C5F0\"></path><path d=\"M18.3575 13.12C21.2411 13.12 23.5967 15.4756 23.5967 18.3592C23.5967 21.2428 21.2411 23.5984 18.3575 23.5984H5.2392C2.35561 23.5984 0 21.2428 0 18.3592C0 15.4756 2.35561 13.12 5.2392 13.12H18.3575Z\" fill=\"#36C5F0\"></path></g><g transform=\"translate(26.28 0)\"><path d=\"M13.1244 18.3592C13.1244 15.4756 15.48 13.12 18.3636 13.12C21.2472 13.12 23.6028 15.4756 23.6028 18.3592C23.6028 21.2428 21.2472 23.5984 18.3636 23.5984H13.1244V18.3592Z\" fill=\"#2EB67D\"></path><path d=\"M10.4785 18.3575C10.4785 21.2411 8.12286 23.5967 5.23927 23.5967C2.35568 23.5967 7.4362e-05 21.2411 7.4362e-05 18.3575V5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0C8.12286 0 10.4785 2.35561 10.4785 5.2392V18.3575Z\" fill=\"#2EB67D\"></path></g><g transform=\"translate(0 26.28)\"><path d=\"M10.4784 5.2392C10.4784 8.12279 8.12279 10.4784 5.2392 10.4784C2.35561 10.4784 0 8.12279 0 5.2392C0 2.35561 2.35561 0 5.2392 0H10.4784V5.2392Z\" fill=\"#E01E5A\"></path><path d=\"M13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V18.3575C23.5941 21.2411 21.2385 23.5967 18.3549 23.5967C15.4713 23.5967 13.1157 21.2411 13.1157 18.3575V5.2392Z\" fill=\"#E01E5A\"></path></g><g transform=\"translate(26.28 26.28)\"><path d=\"M5.23927 13.1157C8.12286 13.1157 10.4785 15.4713 10.4785 18.3549C10.4785 21.2385 8.12286 23.5941 5.23927 23.5941C2.35568 23.5941 7.4362e-05 21.2385 7.4362e-05 18.3549V13.1157H5.23927Z\" fill=\"#ECB22E\"></path><path d=\"M5.23927 10.4784C2.35568 10.4784 7.4362e-05 8.12279 7.4362e-05 5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0H18.3576C21.2412 0 23.5968 2.35561 23.5968 5.2392C23.5968 8.12279 21.2412 10.4784 18.3576 10.4784H5.23927Z\" fill=\"#ECB22E\"></path></g></svg>",
  "w": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\" style=\"color: var(--ui-ackc-strong, #181717);\"><path d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"></path></svg>",
  "C": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\" style=\"color: var(--ui-ackc-strong, #000);\"><path d=\"M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z\"></path></svg>",
  "E": "<svg viewBox=\"0 0 38 57\" aria-hidden=\"true\"><path d=\"M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z\" fill=\"#1ABCFE\"></path><path d=\"M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z\" fill=\"#0ACF83\"></path><path d=\"M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z\" fill=\"#FF7262\"></path><path d=\"M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z\" fill=\"#F24E1E\"></path><path d=\"M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z\" fill=\"#A259FF\"></path></svg>",
  "D": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect width=\"24\" height=\"24\" rx=\"6\" fill=\"#635BFF\"></rect><path fill=\"#fff\" transform=\"translate(5 5) scale(0.5833)\" d=\"M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z\"></path></svg>",
};
const FILE_SVG = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" aria-hidden=\"true\"><path d=\"M1.4 3.1c0-.72.58-1.3 1.3-1.3h1.72c.38 0 .73.19.94.5l.6.9h3.34c.72 0 1.3.58 1.3 1.3V6H1.4Z\" fill=\"currentColor\"></path><path d=\"M1 6.95C.86 6.3 1.36 5.7 2.02 5.7h7.96c.66 0 1.16.6 1.02 1.25l-.5 2.4a1.3 1.3 0 0 1-1.27 1.05H2.77A1.3 1.3 0 0 1 1.5 9.35Z\" fill=\"currentColor\" opacity=\"0.45\"></path></svg>";
const REWIND_SVG = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" aria-hidden=\"true\"><path d=\"M2.6 3.6A4 4 0 1 1 2 6.4\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"></path><path d=\"M2.2 1.6v2.4h2.4\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>";
const MARK_SVG = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><path d=\"M5 2.5v11\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" opacity=\"0.45\"></path><path d=\"M5 8c0 2 1.6 2.6 3.2 2.6H9\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" opacity=\"0.45\"></path><circle cx=\"5\" cy=\"5\" r=\"2.25\" fill=\"currentColor\"></circle><circle cx=\"11.25\" cy=\"10.6\" r=\"2.25\" fill=\"currentColor\"></circle></svg>";

// ---- demo script (from live bundle) ----
type Script = { icon: string; title: string; files?: number; cost?: number; took: number; fail?: boolean };
type Cp = { id: string; parent?: string; icon: string; title: string; files?: number; cost?: number; at: number; status?: string; fail?: boolean };
type Row = { cp: Cp; row: number; lane: number; from?: number; fromLane?: number; attempt?: number };
type St = { list: Cp[]; head: string; queue: Script[]; clock: number; n: number };

const SCRIPT_O: Script[] = [
  { icon: 'T', title: 'Read the brief', cost: .02, took: 9e3 },
  { icon: 'w', title: 'Scaffolded the pricing page', files: 4, cost: .06, took: 21e3 },
  { icon: 'C', title: 'Wrote the plan copy', files: 1, cost: .05, took: 17e3 },
  { icon: 'E', title: 'Built the pricing table', files: 3, cost: .11, took: 34e3 },
  { icon: 'D', title: 'Added Stripe checkout', files: 5, cost: .14, took: 41e3 },
  { icon: 'w', title: 'Tests failing – 4 of 12', cost: .04, took: 26e3, fail: true },
];
const SCRIPT_K: Script[] = [
  { icon: 'D', title: 'Switched to Stripe Elements', files: 3, cost: .12, took: 38e3 },
  { icon: 'w', title: 'Tests pass – 12 of 12', cost: .04, took: 24e3 },
  { icon: 'w', title: 'Opened the pull request', files: 1, cost: .03, took: 11e3 },
];
const AUTO_REWIND = 'c4';
const TICK = 720;
const ROW_H = 30, LANE_A = 14, PAD_B = 10, BASE_X = 22;

const pad2 = (n: number) => String(n).padStart(2, '0');
const formatTime = (ms: number) => {
  const t = Math.max(0, Math.round(ms / 1e3));
  return t >= 3600
    ? `${Math.floor(t / 3600)}:${pad2(Math.floor((t % 3600) / 60))}:${pad2(t % 60)}`
    : `${Math.floor(t / 60)}:${pad2(t % 60)}`;
};
const costFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

function advance(e: St): St {
  const [t, ...rest] = e.queue;
  if (!t) return e;
  const id = `c${e.n + 1}`;
  const at = e.clock + t.took;
  return {
    list: [...e.list, { id, parent: e.head || undefined, icon: t.icon, title: t.title, files: t.files, cost: t.cost, at, status: 'running', fail: t.fail }],
    head: id, queue: rest, clock: at, n: e.n + 1,
  };
}
function rewindTo(e: St, id: string): St {
  const list = e.list.map(c => c.id === e.head && c.status === 'running' ? { ...c, status: 'stopped' } : c);
  return advance({ ...e, list, head: id, queue: SCRIPT_K });
}
const initial = (): St => advance({ list: [], head: '', queue: SCRIPT_O, clock: 0, n: 0 });

function flatten(cps: Cp[]): Row[] {
  const idx = new Map<string, number>();
  cps.forEach((c, n) => { if (!idx.has(c.id)) idx.set(c.id, n); });
  const laneLast: number[] = [];
  const seen = new Set<string>();
  const rows: Row[] = [];
  let attempt = 1;
  const freeLane = (row: number) => { let t = 0; while ((laneLast[t] ?? -1) >= row) t++; return t; };
  cps.forEach((cp, s) => {
    const pi = cp.parent === undefined ? undefined : idx.get(cp.parent);
    const l = pi !== undefined && pi < s ? rows[pi] : undefined;
    let u: number, d: number | undefined;
    if (l && !seen.has(l.cp.id) && laneLast[l.lane] === l.row) u = l.lane;
    else { u = freeLane(l ? l.row : s); if (s > 0) d = ++attempt; }
    if (l) seen.add(l.cp.id);
    laneLast[u] = s;
    rows.push({ cp, row: s, lane: u, from: l?.row, fromLane: l?.lane, attempt: d });
  });
  return rows;
}

const cx = (lane: number) => BASE_X + lane * LANE_A;
const cy = (row: number) => row * ROW_H + ROW_H / 2;
const linePath = (e: Row) => {
  const t = cx(e.fromLane!), n = cy(e.from!), r = cx(e.lane), a = cy(e.row);
  if (t === r) return `M${t} ${n}V${a}`;
  const o = n + ROW_H * .85;
  return `M${t} ${n}C${t} ${n + ROW_H * .5} ${r} ${o - ROW_H * .45} ${r} ${o}V${a}`;
};

export default function AgentCheckpointsDemo() {
  const [st, setSt] = useState<St>(initial);
  const auto = useRef(true);
  const idle = useRef(0);
  const [focusId, setFocusId] = useState<string | null>(null);
  const uid = useId();
  const D = `ui-ackc-${uid.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const listRef = useRef<HTMLOListElement | null>(null);
  const [maxH, setMaxH] = useState(Infinity);

  useEffect(() => {
    const t = setInterval(() => {
      setSt(e => {
        const head = e.list.find(c => c.id === e.head);
        if (head?.status === 'running') {
          return { ...e, list: e.list.map(c => c.id === head.id ? { ...c, status: c.fail ? 'failed' : 'done' } : c) };
        }
        if (e.queue.length) return advance(e);
        if (auto.current) {
          if (head?.fail) return rewindTo(e, AUTO_REWIND);
          if (++idle.current < 6) return e;
          idle.current = 0;
          return initial();
        }
        return e;
      });
    }, TICK);
    return () => clearInterval(t);
  }, []);

  const rows = flatten(st.list);
  const byId = new Map(rows.map(r => [r.cp.id, r]));
  const headRow = (st.head !== '' ? byId.get(st.head) : undefined) ?? rows[rows.length - 1];
  const live = new Set<number>();
  for (let e: Row | undefined = headRow; e; e = e.from === undefined ? undefined : rows[e.from]) live.add(e.row);
  const lanes = Math.max(1, ...rows.map(r => r.lane + 1));
  const attempts = 1 + rows.filter(r => r.attempt).length;
  const hasCost = st.list.some(c => c.cost !== undefined);
  const totalCost = st.list.reduce((a, c) => a + (c.cost ?? 0), 0);
  const focusRowId = focusId !== null && byId.has(focusId) ? focusId : headRow?.cp.id;

  useLayoutEffect(() => {
    const el = listRef.current;
    if (el) setMaxH(parseFloat(getComputedStyle(el).maxHeight) || Infinity);
  }, [rows.length > 0]);

  const contentH = rows.length * ROW_H + PAD_B;
  const scrolls = contentH > maxH;
  useEffect(() => {
    const el = listRef.current;
    if (!el || !headRow || !scrolls) return;
    const t = Math.min(contentH, maxH);
    const n = headRow.row * ROW_H;
    if (n < el.scrollTop) el.scrollTo({ top: n, behavior: 'smooth' });
    else if (n + ROW_H > el.scrollTop + t - PAD_B) el.scrollTo({ top: n + ROW_H - t + PAD_B, behavior: 'smooth' });
  }, [headRow?.cp.id, rows.length, scrolls]);

  const onListKey = (e: KeyboardEvent) => {
    const t = rows.findIndex(r => r.cp.id === focusRowId);
    const n = e.key === 'ArrowDown' ? t + 1 : e.key === 'ArrowUp' ? t - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? rows.length - 1 : -1;
    if (n < 0 || n >= rows.length || (e.key !== 'Home' && e.key !== 'End' && t < 0)) return;
    e.preventDefault();
    setFocusId(rows[n].cp.id);
    listRef.current?.querySelectorAll<HTMLElement>('.ui-ackc__row')[n]?.focus();
  };

  const rewind = (cp: Cp) => { auto.current = false; setSt(s => rewindTo(s, cp.id)); };

  return (
    <>
      <style>{css}</style>
      <div className="ack-demo">
        <div className="ui-ackc" style={{ '--ui-ackc-gutter': `${BASE_X + (lanes - 1) * LANE_A + 16}px` } as CSSProperties}>
          <header className="ui-ackc__head">
            <span className="ui-ackc__mark" dangerouslySetInnerHTML={{ __html: MARK_SVG }} />
            <span className="ui-ackc__title" id={uid} dir="auto" title="Checkpoints">Checkpoints</span>
            <span className="ui-ackc__task" dir="auto" title="Ship the pricing page">Ship the pricing page</span>
            <span className="ui-ackc__sum" aria-live="polite">
              {plural(rows.length, 'checkpoint')}
              {attempts > 1 && <> · {plural(attempts, 'attempt')}</>}
              {hasCost && <> · {costFmt.format(totalCost)}</>}
            </span>
          </header>
          {rows.length === 0 ? (
            <p className="ui-ackc__empty">No checkpoints yet</p>
          ) : (
            <ol ref={listRef} className="ui-ackc__list" style={{ '--ui-ackc-rows': rows.length } as CSSProperties}
              data-scrolls={scrolls ? '' : undefined} aria-labelledby={uid} onKeyDown={onListKey}>
              <svg className="ui-ackc__rail" width={BASE_X + lanes * LANE_A} height={rows.length * ROW_H} aria-hidden="true">
                <defs>
                  <linearGradient id={`${D}-glint`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {rows.map(e => e.from !== undefined && (
                  <path key={`${e.cp.id}:line`} className="ui-ackc__line" d={linePath(e)} pathLength={1}
                    data-live={live.has(e.row) ? '' : undefined} data-fork={e.lane === e.fromLane ? undefined : ''} />
                ))}
                {rows.map(e => (
                  <g key={`${e.cp.id}:dot`} className="ui-ackc__dot"
                    data-live={live.has(e.row) ? '' : undefined} data-head={e === headRow ? '' : undefined}
                    data-status={e.cp.status ?? 'done'}>
                    <circle cx={cx(e.lane)} cy={cy(e.row)} r={e === headRow ? 4.5 : 3.5} />
                    {e === headRow && (
                      <>
                        <clipPath id={`${D}-${e.row}`}><circle cx={cx(e.lane)} cy={cy(e.row)} r={4.5} /></clipPath>
                        <g clipPath={`url(#${D}-${e.row})`}>
                          <rect className="ui-ackc__glint" x={cx(e.lane) - 4} y={cy(e.row) - 8} width={8} height={16} fill={`url(#${D}-glint)`} />
                        </g>
                      </>
                    )}
                  </g>
                ))}
              </svg>
              {rows.map(e => {
                const status = e.cp.status ?? 'done';
                const isHead = e === headRow;
                const canRewind = !isHead;
                const label = `${e.cp.title}${e.attempt ? `, attempt ${e.attempt}` : ''}${status === 'done' ? '' : `, ${status}`}${isHead ? ', current' : live.has(e.row) ? '' : ', left behind'}${canRewind ? ' – press Enter to rewind here' : ''}`;
                return (
                  <li key={e.cp.id} className="ui-ackc__row" tabIndex={focusRowId === e.cp.id ? 0 : -1}
                    data-live={live.has(e.row) ? '' : undefined} data-head={isHead ? '' : undefined}
                    data-status={status} aria-current={isHead ? 'step' : undefined} aria-label={label}
                    onFocus={() => setFocusId(e.cp.id)}
                    onKeyDown={ev => { if ((ev.key === 'Enter' || ev.key === ' ') && ev.target === ev.currentTarget) { ev.preventDefault(); rewind(e.cp); } }}>
                    {e.cp.icon && <span className="ui-ackc__icon" dangerouslySetInnerHTML={{ __html: ICONS[e.cp.icon] ?? '' }} />}
                    <span className="ui-ackc__name" dir="auto" title={e.cp.title}>{e.cp.title}</span>
                    {e.attempt && <span className="ui-ackc__attempt">Attempt {e.attempt}</span>}
                    {status === 'failed' && <span className="ui-ackc__badge">Failed</span>}
                    <span className="ui-ackc__meta" aria-hidden="true">
                      {status === 'stopped' && <span className="ui-ackc__stopped">Stopped</span>}
                      {e.cp.files !== undefined && e.cp.files > 0 && (
                        <span className="ui-ackc__files" dangerouslySetInnerHTML={{ __html: FILE_SVG + plural(e.cp.files, 'file') }} />
                      )}
                      {e.cp.at !== undefined && <span className="ui-ackc__time">{formatTime(e.cp.at)}</span>}
                    </span>
                    {canRewind && (
                      <button type="button" className="ui-ackc__rewind" tabIndex={-1} aria-hidden="true"
                        onClick={() => rewind(e.cp)}
                        dangerouslySetInnerHTML={{ __html: REWIND_SVG + 'Rewind' }} />
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </>
  );
}
