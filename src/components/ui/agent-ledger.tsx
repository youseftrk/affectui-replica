import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

const css = ".ui-ldgc { --ui-ldgc-panel: var(--aui-surface, #ffffff); --ui-ldgc-card: #ffffff; --ui-ldgc-strong: var(--aui-ink, #000000); --ui-ldgc-ink: var(--aui-ink, rgba(0, 0, 0, 0.88)); --ui-ldgc-text: var(--aui-muted, rgba(0, 0, 0, 0.61)); --ui-ldgc-muted: var(--aui-muted, rgba(0, 0, 0, 0.45)); --ui-ldgc-faint: var(--aui-placeholder, rgba(0, 0, 0, 0.27)); --ui-ldgc-line: var(--aui-border, rgba(0, 0, 0, 0.06)); --ui-ldgc-fill: var(--aui-subtle, rgba(0, 0, 0, 0.06)); --ui-ldgc-accent: rgba(0, 96, 226, 0.765); --ui-ldgc-focus: var(--aui-focus, rgba(0, 96, 226, 0.7)); --ui-ldgc-undo-bg: rgba(0, 96, 226, 0.06); --ui-ldgc-also-bg: rgba(0, 96, 226, 0.045); --ui-ldgc-also-fg: var(--aui-info, #0070d6); --ui-ldgc-kept-bg: #ff9c0014; --ui-ldgc-kept-fg: var(--aui-warning, #b25e00); --ui-ldgc-ok-fg: #007d2ee0; --ui-ldgc-strike: rgba(0, 0, 0, 0.45); --ui-ldgc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05); --ui-ldgc-ease: cubic-bezier(0.32, 0.72, 0.24, 1); --ui-ldgc-row: 56px; position: relative; box-sizing: border-box; width: 100%; min-width: 0px; container: ui-ldgc / inline-size; font-family: var(--aui-font, \"Inter\", \"InterVariable\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif); font-size: 13px; font-weight: 400; line-height: 20px; color: var(--ui-ldgc-text); text-align: left; -webkit-font-smoothing: antialiased; }\n.ui-ldgc *, .ui-ldgc ::before, .ui-ldgc ::after { box-sizing: border-box; }\n:where(.ui-ldgc) button { margin: 0px; padding: 0px; border: 0px; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }\n.ui-ldgc button:focus-visible { outline: 2px solid var(--ui-ldgc-focus); outline-offset: 2px; }\n.ui-ldgc svg { display: block; flex: 0 0 auto; }\n.ui-ldgc__bar { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; min-width: 0px; margin-bottom: 16px; }\n.ui-ldgc__mark { display: grid; flex: 0 0 auto; place-items: center; width: 16px; color: var(--ui-ldgc-accent); }\n.ui-ldgc__title { min-width: 0px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-weight: 500; color: var(--ui-ldgc-strong); }\n.ui-ldgc__agent { min-width: 0px; overflow: hidden; color: var(--ui-ldgc-muted); white-space: nowrap; text-overflow: ellipsis; }\n.ui-ldgc__sum { display: flex; align-items: center; gap: 14px; margin-left: auto; font-size: 12px; line-height: 16px; color: var(--ui-ldgc-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }\n.ui-ldgc__sum b { font-weight: 500; color: var(--ui-ldgc-ink); }\n.ui-ldgc__sum-undone { animation: 240ms ease 0s 1 normal both running ui-ldgc-fade; }\n.ui-ldgc__panel { display: grid; margin: 0px; padding: 4px; overflow: hidden; border-radius: var(--aui-radius-lg, 10px); background: var(--ui-ldgc-panel); box-shadow: var(--aui-shadow-card, var(--ui-ldgc-shadow)); list-style: none; }\n.ui-ldgc__row { position: relative; display: grid; grid-template-columns: 28px minmax(0px, 1fr) auto; align-items: center; column-gap: 12px; height: var(--ui-ldgc-row); padding: 9px 12px 9px 10px; border-radius: calc(var(--aui-radius-sm, 5px) + 2px); transition: background-color 200ms; animation: ui-ldgc-grow 520ms var(--ui-ldgc-ease) backwards; }\n.ui-ldgc__row > * { animation: ui-ldgc-in 420ms var(--ui-ldgc-ease) 140ms backwards; }\n.ui-ldgc__row[data-initial], .ui-ldgc__row[data-initial] > * { animation: auto ease 0s 1 normal none running none; }\n.ui-ldgc__row + .ui-ldgc__row::before { content: \"\"; position: absolute; top: -0.25px; right: 12px; left: 50px; height: 0.5px; background: var(--ui-ldgc-line); }\n.ui-ldgc__row:hover { background: var(--aui-subtle, rgba(0, 0, 0, 0.015)); }\n.ui-ldgc__row[data-preview] { background: var(--ui-ldgc-undo-bg); }\n.ui-ldgc__row[data-chain=\"also\"] { background: var(--ui-ldgc-also-bg); }\n.ui-ldgc__row[data-chain=\"kept\"] { background: var(--ui-ldgc-kept-bg); }\n.ui-ldgc__row:is([data-preview], [data-chain]) + .ui-ldgc__row::before, .ui-ldgc__row:is([data-preview], [data-chain])::before { opacity: 0; }\n.ui-ldgc__icon { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 7px; background: var(--ui-ldgc-card); box-shadow: var(--ui-ldgc-shadow); font-size: 12px; font-weight: 500; color: var(--ui-ldgc-text); transition: opacity 300ms, filter 300ms; }\n.ui-ldgc__icon > svg { width: 14px; height: 14px; }\n.ui-ldgc__main { position: relative; display: grid; min-width: 0px; }\n.ui-ldgc__what { position: relative; display: flex; align-items: baseline; gap: 6px; justify-self: start; min-width: 0px; max-width: 100%; white-space: nowrap; }\n.ui-ldgc__action { flex: 0 1 auto; min-width: 0px; overflow: hidden; text-overflow: ellipsis; font-weight: 500; color: var(--ui-ldgc-ink); transition: color 300ms; }\n.ui-ldgc__target { flex: 0 100 auto; min-width: 0px; overflow: hidden; color: var(--ui-ldgc-text); text-overflow: ellipsis; transition: color 300ms; }\n.ui-ldgc__change { display: flex; align-items: baseline; gap: 6px; min-width: 0px; overflow: hidden; font-size: 12px; line-height: 17px; color: var(--ui-ldgc-muted); white-space: nowrap; text-overflow: ellipsis; }\n.ui-ldgc__before { flex: 0 100 auto; min-width: 0px; overflow: hidden; text-overflow: ellipsis; text-decoration-line: line-through; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--ui-ldgc-faint); }\n.ui-ldgc__arrow { flex: 0 0 auto; color: var(--ui-ldgc-faint); }\n.ui-ldgc__detail { min-width: 0px; overflow: hidden; text-overflow: ellipsis; }\n.ui-ldgc__after { flex: 0 1 auto; min-width: 0px; overflow: hidden; color: var(--ui-ldgc-text); text-overflow: ellipsis; }\n.ui-ldgc__strike { position: absolute; top: 50%; left: -2px; width: calc(100% + 4px); height: 1px; border-radius: 1px; background: var(--ui-ldgc-strike); transform: scaleX(0); transform-origin: left center; pointer-events: none; transition: transform 380ms var(--ui-ldgc-ease) calc(var(--o, 0) * 110ms); }\n.ui-ldgc__row[data-undone] .ui-ldgc__strike { transform: scaleX(1); }\n.ui-ldgc__row[data-undone] :is(.ui-ldgc__action, .ui-ldgc__target, .ui-ldgc__after) { color: var(--ui-ldgc-muted); transition-delay: calc(var(--o, 0) * 110ms); }\n.ui-ldgc__row[data-undone] .ui-ldgc__icon { opacity: 0.5; filter: grayscale(1); transition-delay: calc(var(--o, 0) * 110ms); }\n.ui-ldgc__end { position: relative; display: grid; place-items: center end; min-width: 108px; height: 24px; }\n.ui-ldgc__time { grid-area: 1 / 1; pointer-events: none; font-size: 12px; line-height: 16px; color: var(--ui-ldgc-muted); white-space: nowrap; font-variant-numeric: tabular-nums; transition: opacity 140ms; }\n.ui-ldgc__row[data-undone] .ui-ldgc__time { color: var(--ui-ldgc-faint); }\n.ui-ldgc__act { position: relative; z-index: 1; grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 5px; height: 24px; margin-right: -6px; padding: 0px 7px; border-radius: calc(var(--aui-radius-sm, 5px) + 1px); font-size: 12px; font-weight: 500; color: var(--ui-ldgc-ink); white-space: nowrap; opacity: 0; transition: opacity 140ms, background-color 140ms; }\n.ui-ldgc__row:is(:hover, :focus-within) .ui-ldgc__time[data-hide] { opacity: 0; }\n.ui-ldgc__row:is(:hover, :focus-within, [data-preview]) .ui-ldgc__act { opacity: 1; }\n.ui-ldgc__row[data-preview] .ui-ldgc__time[data-hide] { opacity: 0; }\n.ui-ldgc__row[data-preview] .ui-ldgc__act { background: rgba(0, 96, 226, 0.09); color: var(--ui-ldgc-also-fg); }\n.ui-ldgc__act:hover { background: var(--ui-ldgc-fill); }\n.ui-ldgc__flag { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 4px; height: 20px; padding: 0px 7px; border-radius: var(--aui-radius-sm, 5px); font-size: 11.5px; font-weight: 500; line-height: 20px; white-space: nowrap; animation: 160ms ease 0s 1 normal both running ui-ldgc-fade; }\n.ui-ldgc__flag[data-kind=\"also\"] { background: rgba(0, 96, 226, 0.09); color: var(--ui-ldgc-also-fg); }\n.ui-ldgc__flag[data-kind=\"kept\"] { background: rgba(255, 156, 0, 0.15); color: var(--ui-ldgc-kept-fg); }\n@media (hover: none){.ui-ldgc__act { opacity: 1; }}\n@media (hover: none){.ui-ldgc__time[data-hide] { opacity: 0; }}\n@media (prefers-reduced-motion: reduce){.ui-ldgc *, .ui-ldgc ::before, .ui-ldgc ::after { animation: auto ease 0s 1 normal none running none !important; transition: none !important; }}\n:where(.dark, [data-theme=\"dark\"]) .ui-ldgc { --ui-ldgc-panel: var(--aui-surface, #1c1c1f); --ui-ldgc-card: #232326; --ui-ldgc-strong: var(--aui-ink, #ffffff); --ui-ldgc-ink: var(--aui-ink, rgba(255, 255, 255, 0.9)); --ui-ldgc-text: var(--aui-muted, rgba(255, 255, 255, 0.62)); --ui-ldgc-muted: var(--aui-muted, rgba(255, 255, 255, 0.45)); --ui-ldgc-faint: var(--aui-placeholder, rgba(255, 255, 255, 0.28)); --ui-ldgc-line: var(--aui-border, rgba(255, 255, 255, 0.08)); --ui-ldgc-fill: var(--aui-subtle, rgba(255, 255, 255, 0.08)); --ui-ldgc-accent: var(--aui-blue, #4fb0fe); --ui-ldgc-focus: var(--aui-focus, rgba(77, 141, 255, 0.8)); --ui-ldgc-undo-bg: color-mix(in srgb, var(--aui-blue, #4fb0fe) 10%, transparent); --ui-ldgc-also-bg: color-mix(in srgb, var(--aui-blue, #4fb0fe) 7%, transparent); --ui-ldgc-also-fg: #8bcbfe; --ui-ldgc-kept-bg: color-mix(in srgb, var(--aui-orange, #f2a15c) 9%, transparent); --ui-ldgc-kept-fg: var(--aui-warning, #ffb35c); --ui-ldgc-ok-fg: var(--aui-green, #5fc88a); --ui-ldgc-strike: rgba(255, 255, 255, 0.5); --ui-ldgc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4); }\n.skill-prompts .install__cmd code { white-space: pre-wrap; }\n.lp-show__main > .ui-agtc .ui-agtc__node { padding-bottom: 72px; }\n.lp-show .ui-agtc { --ui-agtc-card-w: 320px; }\n.lp-show .ui-agtc__node > * { max-width: 236px; }\n.lp-show__main > .ui-agtc .ui-agtc__node { row-gap: 14px; }\n.lp-show .ui-agtc__status { align-self: center; }\n.lp-show .ui-agtc__bar { display: none; }\n.lp-show .ui-agtc__node, .lp-show__main > .ui-ccc .ui-ccc__body { box-shadow: var(--ui-agtc-shadow,var(--ui-ccc-shadow)), 0 18px 40px -10px #0000001f, 0 40px 80px -24px #0000001a; }\n.lp-show__above .ui-agtc__node { box-shadow: var(--ui-agtc-shadow), 0 2px 4px -2px #0000000a; }\n.ba-install { flex-direction: column; gap: 8px; width: 250px; display: flex; }\n.ba-install__term { flex-direction: column; gap: 4px; padding: 8px 10px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; line-height: 15px; display: flex; }\n.ba-install__line { white-space: nowrap; gap: 6px; display: flex; }\n.ba-install__line b { color: var(--text-subtle); font-weight: 500; }\n.ba-install__type { width: calc(var(--n) * 1ch); border-right: 1.5px solid var(--text); color: var(--text); animation: 6s steps(28) 0s infinite normal none running ba-type, 0.8s step-end 0s infinite normal none running ba-caret; overflow: hidden; }\n.ba-install__done { color: rgb(31, 138, 76); animation: 6s ease 0s infinite normal none running ba-done; }\n.ba-install__folder { flex: 0 0 auto; width: 15px; height: 13px; display: block; position: relative; }\n.ba-install__folder .ui-fd { width: 38px; position: absolute; top: 50%; left: 50%; translate: -50% -50%; }\n.ba-install__files { flex-direction: column; padding: 4px; display: flex; }\n.ba-install__file { height: 24px; color: var(--text-muted); border-radius: 6px; align-items: center; gap: 7px; padding: 0px 6px; font-size: 10.5px; display: flex; }\n.ba-install__ext { background: var(--muted-bg); color: var(--text-subtle); border-radius: 4px; padding: 0px 4px; font-size: 8px; font-style: normal; font-weight: 600; line-height: 13px; }\n.ba-install__ext--new { background: color-mix(in srgb, var(--pro-to) 12%, transparent); color: var(--pro-to); }\n.ba-install__file em { border-radius: var(--radius-pill); background: color-mix(in srgb, var(--pro-from) 10%, transparent); color: var(--pro-from); margin-left: auto; padding: 0px 6px; font-size: 9px; font-style: normal; font-weight: 500; line-height: 15px; }\n.ba-install__file--new { background: var(--hover-bg); color: var(--text); animation: ba-drop 6s var(--ease-out) infinite; }\n.ba-tweak__profile > small { color: var(--text-subtle); font-size: 9px; line-height: 11px; }\n.ba-tweak__value { font-variant-numeric: tabular-nums; counter-reset: ba-r var(--ba-r); }\n.ba-tweak__value::after { content: counter(ba-r) \"px\"; }\n@media (prefers-reduced-motion: reduce){.ba-install__type, .ba-install__done, .ba-install__file--new, .ba-tweak, .ba-tweak *, .ba-theme__layer--dark, .ba-theme__edge, .ba-theme__toggle i { animation: auto ease 0s 1 normal none running none; }}\n.lp-vibe__chathead small { color: rgb(107, 114, 128); align-items: center; gap: 6px; font-size: 12px; display: flex; }\n.lp-vibe__chathead small i { background: rgb(34, 197, 94); border-radius: 50%; width: 8px; height: 8px; }\n.lp-vibe__co small { color: rgb(156, 163, 175); font-size: 12px; }\n.lp-vibe__kpi em small { color: rgb(156, 163, 175); font-weight: 400; }\n.lp-vibe__bars small { color: rgb(156, 163, 175); font-size: 11px; }\n.lp-vibe__item small { color: rgb(156, 163, 175); font-size: 12px; }\n:where(.dark, [data-theme=\"dark\"]) :is(.lp-vibe__head p, .lp-vibe__kpi span, .lp-vibe__chathead small, .lp-vibe__table th) { color: rgb(156, 163, 175); }\n:where(.dark, [data-theme=\"dark\"]) :is(.lp-vibe__section, .lp-vibe__kpi em small, .lp-vibe__bars small, .lp-vibe__item small, .lp-vibe__co small, .lp-vibe__input, .lp-vibe__search) { color: rgb(107, 114, 128); }\n:where(.dark, [data-theme=\"dark\"]) .lp-vibe__bars small { color: rgb(107, 114, 128); }\n.subnav[data-open=\"false\"] { visibility: hidden; grid-template-rows: 0fr; }\n.sidebar__nav > .subnav[data-open=\"false\"] { margin-top: -1px; }\n.subnav[data-open=\"false\"] > .subnav__inner { opacity: 0; }\n.sidebar[data-animate] .subnav[data-open=\"false\"] { transition: grid-template-rows .24s var(--ease-out), visibility 0s .24s; }\n.sidebar[data-animate] .subnav[data-open=\"false\"] > .subnav__inner { transition: opacity 0.14s; }\n@media (prefers-reduced-motion: reduce){.sidebar[data-animate] .subnav, .sidebar[data-animate] .subnav[data-open=\"false\"], .sidebar[data-animate] .subnav__inner, .section__toggle svg { transition: none; }}\n.calc__field:has(input:focus-visible) { outline: 2px solid var(--focus-ring); outline-offset: 2px; }\n.sidebar-search__result small { color: var(--text-subtle); font-size: 11.5px; display: block; }\n.login__submit, .login__alt { cursor: pointer; border: 0px; width: 100%; }\n.login__submit:disabled, .login__alt:disabled { opacity: 0.5; cursor: not-allowed; }\n.login__alt { gap: 8px; }\n.login__social { gap: 8px; width: 100%; margin-top: 24px; display: grid; }\n.login__legal { color: var(--text-subtle); margin-top: 18px; font-size: 12px; }\n.login__legal a { color: var(--text-muted); text-underline-offset: 3px; text-decoration: underline; }\n.settings__value { color: var(--text-muted); }\n.billing__address .settings__value { text-align: right; max-width: 60%; }\n.billing__tax-value, .billing__tax-inputs { align-items: center; gap: 8px; display: flex; }\n.footer__social { gap: 4px; margin-left: -6px; display: flex; }\n.footer__social-link { width: 30px; height: 30px; color: var(--text-muted); transition: background-color var(--duration) ease, color var(--duration) ease; border-radius: 999px; place-items: center; display: grid; }\n.footer__social-link:hover { background: var(--hover-bg); color: var(--text); }\n.doc__install { padding-top: 16px; }\n.install { background: var(--card); box-shadow: 0 0 0 1px var(--border); border-radius: 12px; padding: 3px; overflow: hidden; }\n.install__head { justify-content: space-between; align-items: center; height: 40px; padding: 0px 3px; display: flex; }\n.install__label { color: var(--text-muted); padding-left: 8px; font-size: 12.5px; }\n:is(.install, .code) + :is(.install, .code) { margin-top: 12px; }\n.install__cmd { background: var(--row-stripe); border-radius: 9px; margin: 0px; padding: 14px 16px; font-size: 12.5px; overflow-x: auto; }\n.manual { gap: 12px; display: grid; }\n.manual .doc__p { padding: 4px 0px 0px; }\n.legal { max-width: 680px; margin: 0px auto; padding: 48px 0px 24px; }\n.legal__title { letter-spacing: -0.02em; margin: 0px; font-size: 30px; font-weight: 600; line-height: 36px; }\n.legal__lead { color: var(--text-muted); margin: 12px 0px 0px; font-size: 16px; line-height: 26px; }\n.legal__date { color: var(--text-subtle); margin: 12px 0px 0px; font-size: 13px; }\n.legal__body { color: var(--text); margin-top: 32px; font-size: 15px; line-height: 25px; }\n.legal__body h2 { margin: 36px 0px 10px; font-size: 17px; font-weight: 600; line-height: 24px; }\n.legal__body h3 { margin: 20px 0px 6px; font-size: 15px; font-weight: 600; line-height: 22px; }\n.legal__body p { color: var(--text-muted); margin: 0px 0px 12px; }\n.legal__body ul { color: var(--text-muted); margin: 0px 0px 12px; padding-left: 20px; }\n.legal__body li { margin: 4px 0px; }\n.legal__body strong { color: var(--text); font-weight: 600; }\n.legal__body a, .legal__foot a { color: var(--text); text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--border); text-underline-offset: 3px; }\n.legal__body a:hover, .legal__foot a:hover { text-decoration-color: currentcolor; }\n.legal__summary { background: var(--preview); box-shadow: inset 0 0 0 1px var(--border-soft); color: var(--text-muted); border-radius: 14px; margin-bottom: 8px; padding: 16px 18px; }\n.legal__summary strong { color: var(--text); }\n.legal__foot { border-top: 1px solid var(--border-soft); color: var(--text-muted); margin-top: 48px; padding-top: 20px; font-size: 14px; }\n.legal__foot nav { flex-wrap: wrap; gap: 16px; margin-bottom: 8px; display: flex; }\n.promo__code-value { letter-spacing: 0.08em; font-variant-numeric: tabular-nums; color: var(--text); font-size: 18px; font-weight: 600; }\n.upsell__eyebrow--sale { color: rgb(255, 255, 255); background: rgb(12, 12, 13); gap: 5px; padding: 0px 10px 0px 8px; }\n.upsell__eyebrow--sale svg { color: rgb(255, 79, 163); }\n:root[data-theme=\"dark\"] .upsell__eyebrow--sale { color: rgb(12, 12, 13); background: rgb(255, 255, 255); }\n@media (prefers-color-scheme: dark){:root:not([data-theme=\"light\"]) .upsell__eyebrow--sale { color: rgb(12, 12, 13); background: rgb(255, 255, 255); }}\n.upsell__note--sale { color: var(--text-muted); margin-top: 8px; font-size: 13px; }\n.upsell__note--sale .countdown { color: var(--text); font-weight: 500; }\n.legal__body .license__col h3 { margin: 0px 0px 10px; }\n.legal__body .license__col ul { padding: 0px; list-style: none; }\n.legal__body .license__case h3 { margin: 10px 0px 4px; }\n.legal__body .license__case p { font-size: 14px; line-height: 21px; }\n.calc { padding-top: 96px; }\n.calc__head { text-align: center; justify-items: center; gap: 10px; margin-bottom: 28px; display: grid; }\n.calc__head h2 { letter-spacing: -0.01em; text-wrap: balance; margin: 0px; font-size: 30px; font-weight: 500; line-height: 1.2; }\n.calc__head p { max-width: 520px; color: var(--text-muted); text-wrap: balance; margin: 0px; font-size: 15px; line-height: 1.55; }\n.calc__tray { background: var(--guarantee-bg,var(--muted-bg)); border-radius: 22px; max-width: 760px; margin: 0px auto; padding: 6px; }\n.calc__card { background: var(--card); box-shadow: 0 0 0 1px var(--tier-stroke,var(--panel-stroke)), 0 1px 0 #00000008; border-radius: 17px; grid-template-columns: minmax(0px, 1.15fr) minmax(0px, 1fr); display: grid; overflow: hidden; }\n.calc__inputs { align-content: center; gap: 8px; padding: 24px; display: grid; }\n.calc__field { background: var(--guarantee-bg,var(--muted-bg)); touch-action: pan-y; cursor: ew-resize; user-select: none; -webkit-tap-highlight-color: transparent; border-radius: 14px; grid-template-columns: 108px minmax(0px, 1fr) 52px; align-items: center; gap: 14px; height: 52px; padding: 0px 16px; transition: box-shadow 0.16s; display: grid; }\n.calc__name { color: var(--text-muted); font-size: 13px; line-height: 16px; }\n.calc__field output { text-align: right; color: var(--text); font-variant-numeric: tabular-nums; font-size: 15px; font-weight: 500; }\n.calc__scale { height: 100%; position: relative; }\n.calc__ticks { justify-content: space-between; align-items: center; display: flex; position: absolute; inset: 0px; }\n.calc__ticks span { background: var(--text); opacity: 0.16; border-radius: 1px; width: 1.5px; height: 8px; transition: opacity 0.16s, height 0.16s; }\n.calc__ticks span[data-major] { height: 14px; }\n.calc__ticks span[data-on] { opacity: 0.55; }\n.calc__mark { top: 50%; left: var(--fill); background: var(--text); pointer-events: none; border-radius: 1px; width: 2px; height: 26px; position: absolute; transform: translate(-50%, -50%); }\n.calc__field:hover .calc__ticks span[data-on] { opacity: 0.7; }\n.calc__scale input[type=\"range\"] { opacity: 0; pointer-events: none; width: 100%; height: 100%; margin: 0px; position: absolute; inset: 0px; }\n@media (max-width: 480px){.calc__field { grid-template-columns: 76px minmax(0px, 1fr) 44px; gap: 10px; padding: 0px 12px; }}\n@media (max-width: 480px){.calc__name { font-size: 12px; }}\n.calc__result { flex-direction: column; justify-content: center; gap: 4px; padding: 28px 30px; display: flex; position: relative; }\n.calc__result::before { content: \"\"; background: var(--tier-stroke,var(--panel-stroke)); width: 1px; position: absolute; top: 28px; bottom: 28px; left: 0px; }\n.calc__label { color: var(--text-muted); font-size: 13px; }\n.calc__big { letter-spacing: -0.03em; font-variant-numeric: tabular-nums; font-size: 40px; font-weight: 500; line-height: 1.1; }\n.calc__note { color: var(--text-subtle); font-variant-numeric: tabular-nums; font-size: 13px; }\n.calc__compare { background: var(--guarantee-bg,var(--muted-bg)); border-radius: 14px; gap: 10px; margin-top: 20px; padding: 14px 16px; display: grid; }\n.calc__pro, .calc__save { justify-content: space-between; align-items: center; gap: 12px; font-size: 14px; display: flex; }\n.calc__pro span, .calc__save span { color: var(--text-muted); align-items: center; gap: 8px; display: inline-flex; }\n.calc__pro b { font-variant-numeric: tabular-nums; font-weight: 500; }\n.calc__pro .calc__bolt { background: var(--pro-bg); width: 18px; height: 18px; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--pro-from) 16%, transparent), 0 1px 0 color-mix(in srgb, var(--pro-from) 14%, transparent); color: var(--pro-from); border-radius: 50%; place-items: center; display: grid; }\n.calc__save b { letter-spacing: -0.01em; color: rgb(10, 138, 95); font-variant-numeric: tabular-nums; background: rgba(10, 138, 95, 0.1); border-radius: 7px; padding: 2px 9px; font-size: 18px; font-weight: 500; line-height: 26px; }\n:where(.dark, [data-theme=\"dark\"]) .calc__save b { color: rgb(79, 209, 161); background: rgba(79, 209, 161, 0.14); }\n@media (max-width: 760px){.calc { padding-top: 72px; }}\n@media (max-width: 760px){.calc__head h2 { font-size: 24px; }}\n@media (max-width: 760px){.calc__card { grid-template-columns: minmax(0px, 1fr); }}\n@media (max-width: 760px){.calc__inputs { padding: 16px; }}\n@media (max-width: 760px){.calc__result { padding: 22px 20px; }}\n@media (max-width: 760px){.calc__result::before { width: auto; height: 1px; inset: 0px 20px auto; }}\n@media (max-width: 760px){.calc__big { font-size: 34px; }}\n.style-switch button[data-look][aria-checked=\"false\"] svg { opacity: 0.7; }\n.stage__style .stage__theme-btn[data-look][aria-checked=\"false\"] { opacity: 0.75; }\n.style-switch--wide button[data-look][aria-checked=\"false\"] { color: color-mix(in srgb, var(--look) 70%, var(--text-muted)); }\n.style-switch--wide button[data-look][aria-checked=\"false\"]:hover { color: var(--look); }\n.style-menu__value { background: color-mix(in srgb, var(--look) 11%, transparent); color: var(--look); border-radius: 6px; margin-left: auto; padding: 1px 7px; font-size: 12.5px; font-weight: 500; line-height: 18px; }\n.lib-tabs__end .style-menu__value { margin-left: 4px; }\n.compare__initial { color: var(--text-subtle); font-size: 11px; font-weight: 600; line-height: 1; }\n.al-demo { grid-template-columns: minmax(0px, 640px); justify-content: center; width: 100%; display: grid; }\n.card__preview .al-demo { grid-template-columns: auto; align-content: start; padding: 44px 16px 0px; position: absolute; inset: 0px; mask: linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 99%); }\n.card__preview .al-demo :is(.ui-ldg, .ui-ldgc) { zoom: 0.44; width: 620px; }\n.stage:has(.al-demo) { height: 660px; }\n.stage .al-demo { align-self: start; margin-top: 48px; padding-inline: 24px; }\n@media (max-width: 760px){.stage:has(.al-demo) { height: 760px; padding-left: 12px; padding-right: 12px; }}\n@media (max-width: 760px){.stage .al-demo { margin-top: 84px; padding-inline: 0px; }}\n@keyframes ui-ldgc-grow {0%{height: 0px; padding-top: 0px; padding-bottom: 0px;}}\n@keyframes ui-ldgc-in {0%{opacity: 0; transform: translateY(-4px);}}\n@keyframes ui-ldgc-fade {0%{opacity: 0;}}\n@keyframes ba-type {0%{width: 0px;}32%, 100%{width: calc(var(--n) * 1ch);}}\n@keyframes ba-caret {50%{border-color: rgba(0, 0, 0, 0);}}\n@keyframes ba-done {0%, 36%{opacity: 0;}42%, 92%{opacity: 1;}100%{opacity: 0;}}\n@keyframes ba-drop {0%, 40%{opacity: 0; filter: blur(3px); translate: 0px -8px;}50%, 92%{opacity: 1; filter: none; translate: 0px;}100%{opacity: 0;}}";
type LedgerEntry = {
  id: string;
  action: string;
  target?: string;
  system: string;
  icon?: React.ReactNode;
  change?: [string, string];
  detail?: string;
  dependsOn?: string[];
  reversible?: boolean;
  at: number;
};

const relAge = (ms: number) => {
  const s = Math.max(0, Math.round(ms / 1e3));
  if (s < 10) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`;
};

const fmtAt = (at: number, now: number) => {
  const age = now - at;
  if (age > -6e4 && age < 2592e6) return relAge(age);
  const sameYear = new Date(at).getFullYear() === new Date(now).getFullYear();
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: sameYear ? undefined : 'numeric' }).format(at);
};

const letter = (system: string) => (system.match(/[\p{L}\p{N}]/u)?.[0] ?? '·').toUpperCase();

const dependentsMap = (entries: LedgerEntry[]) => {
  const m = new Map<string, LedgerEntry[]>();
  for (const e of entries) for (const d of e.dependsOn ?? []) m.set(d, [...(m.get(d) ?? []), e]);
  return m;
};

const descendantsOf = (id: string, map: Map<string, LedgerEntry[]>) => {
  const out: LedgerEntry[] = [];
  const seen = new Set([id]);
  const queue = [id];
  for (let i = 0; i < queue.length; i++)
    for (const child of map.get(queue[i]) ?? [])
      if (!seen.has(child.id)) {
        seen.add(child.id);
        out.push(child);
        queue.push(child.id);
      }
  return out;
};

const LedgerMark = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="1.8" width="12" height="12.4" rx="2.6" stroke="currentColor" strokeWidth="1.3" /><path d="M5 5.4h6M5 8h6M5 10.6h3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
);
const UndoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7H15C18.3137 7 21 9.68629 21 13C21 16.3137 18.3137 19 15 19H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /><path d="M8 3L4 7L8 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
);
const RedoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 7H9C5.68629 7 3 9.68629 3 13C3 16.3137 5.68629 19 9 19H16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /><path d="M16 3L20 7L16 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
);
const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z" stroke="currentColor" strokeWidth="1.8" /><path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--ui-ldgc-strong, var(--ui-ldg-ink, #181717))' }}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
);
const VercelIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--ui-ldgc-strong, var(--ui-ldg-ink, #000))' }}><path d="M24 22.525H0l12-21.05 12 21.05z" /></svg>
);
const SlackIcon = () => (
  <svg viewBox="0 0 49.883 49.877" fill="none" aria-hidden="true"><g transform="translate(0 0)"><path d="M18.3549 10.4784C15.4713 10.4784 13.1157 8.12279 13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V10.4784H18.3549Z" fill="#36C5F0" /><path d="M18.3575 13.12C21.2411 13.12 23.5967 15.4756 23.5967 18.3592C23.5967 21.2428 21.2411 23.5984 18.3575 23.5984H5.2392C2.35561 23.5984 0 21.2428 0 18.3592C0 15.4756 2.35561 13.12 5.2392 13.12H18.3575Z" fill="#36C5F0" /></g><g transform="translate(26.28 0)"><path d="M13.1244 18.3592C13.1244 15.4756 15.48 13.12 18.3636 13.12C21.2472 13.12 23.6028 15.4756 23.6028 18.3592C23.6028 21.2428 21.2472 23.5984 18.3636 23.5984H13.1244V18.3592Z" fill="#2EB67D" /><path d="M10.4785 18.3575C10.4785 21.2411 8.12286 23.5967 5.23927 23.5967C2.35568 23.5967 7.4362e-05 21.2411 7.4362e-05 18.3575V5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0C8.12286 0 10.4785 2.35561 10.4785 5.2392V18.3575Z" fill="#2EB67D" /></g><g transform="translate(0 26.28)"><path d="M10.4784 5.2392C10.4784 8.12279 8.12279 10.4784 5.2392 10.4784C2.35561 10.4784 0 8.12279 0 5.2392C0 2.35561 2.35561 0 5.2392 0H10.4784V5.2392Z" fill="#E01E5A" /><path d="M13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V18.3575C23.5941 21.2411 21.2385 23.5967 18.3549 23.5967C15.4713 23.5967 13.1157 21.2411 13.1157 18.3575V5.2392Z" fill="#E01E5A" /></g><g transform="translate(26.28 26.28)"><path d="M5.23927 13.1157C8.12286 13.1157 10.4785 15.4713 10.4785 18.3549C10.4785 21.2385 8.12286 23.5941 5.23927 23.5941C2.35568 23.5941 7.4362e-05 21.2385 7.4362e-05 18.3549V13.1157H5.23927Z" fill="#ECB22E" /><path d="M5.23927 10.4784C2.35568 10.4784 7.4362e-05 8.12279 7.4362e-05 5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0H18.3576C21.2412 0 23.5968 2.35561 23.5968 5.2392C23.5968 8.12279 21.2412 10.4784 18.3576 10.4784H5.23927Z" fill="#ECB22E" /></g></svg>
);
const StripeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#635BFF" /><path fill="#fff" transform="translate(5 5) scale(0.5833)" d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" /></svg>
);
const NotionIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--ui-ldgc-strong, var(--ui-ldg-ink, #000))' }}><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" /></svg>
);
const HubSpotIcon = () => (
  <svg viewBox="0 0 24 24" fill="#FF7A59" aria-hidden="true"><path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" /></svg>
);

function AgentLedger({
  entries, agent, now, undone: undoneProp, defaultUndone = [],
  onUndo, onRedo, pointAt = null, title = 'Ledger', className,
}: {
  entries: LedgerEntry[];
  agent?: string;
  now?: number;
  undone?: string[];
  defaultUndone?: string[];
  onUndo?: (ids: string[]) => void;
  onRedo?: (ids: string[]) => void;
  pointAt?: string | null;
  title?: string;
  className?: string;
}) {
  const x = useId();
  const initialIds = useRef<Set<string> | null>(null);
  if (initialIds.current === null) initialIds.current = new Set(entries.map(e => e.id));
  const [internalUndone, setInternalUndone] = useState<string[]>(defaultUndone);
  const undoneSet = new Set(undoneProp ?? internalUndone);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [chainOrder, setChainOrder] = useState<Record<string, number>>({});
  const prevUndone = useRef<string[]>(undoneProp ?? []);
  useEffect(() => {
    if (!undoneProp) return;
    const added = undoneProp.filter(id => !prevUndone.current.includes(id));
    prevUndone.current = undoneProp;
    if (added.length) setChainOrder(Object.fromEntries(added.map((id, i) => [id, i])));
  }, [undoneProp]);
  const [fallbackNow, setFallbackNow] = useState(() => Date.now());
  useEffect(() => {
    if (now !== undefined) return;
    const iv = window.setInterval(() => setFallbackNow(Date.now()), 15000);
    return () => window.clearInterval(iv);
  }, [now]);
  const N = now ?? fallbackNow;
  const sorted = [...entries].sort((a, b) => b.at - a.at);
  const deps = useMemo(() => dependentsMap(entries), [entries]);
  const liveDescendants = (id: string) => descendantsOf(id, deps).filter(e => !undoneSet.has(e.id));
  const L = hoverId ?? pointAt;
  const chainList = L ? liveDescendants(L) : [];
  const chainKind = new Map<string, 'also' | 'kept'>(chainList.map(e => [e.id, e.reversible === false ? 'kept' : 'also']));
  const doUndo = (entry: LedgerEntry) => {
    const ids = [entry.id, ...liveDescendants(entry.id).filter(e => e.reversible !== false).map(e => e.id)];
    setChainOrder(Object.fromEntries(ids.map((id, i) => [id, i])));
    setInternalUndone(u => [...u, ...ids.filter(id => !u.includes(id))]);
    setHoverId(null);
    onUndo?.(ids);
  };
  const doRedo = (entry: LedgerEntry) => {
    const ids = [entry.id, ...descendantsOf(entry.id, deps).filter(e => undoneSet.has(e.id)).map(e => e.id)];
    setChainOrder({});
    setInternalUndone(u => u.filter(id => !ids.includes(id)));
    onRedo?.(ids);
  };
  const total = entries.length;
  const undoneCount = entries.filter(e => undoneSet.has(e.id)).length;
  return (
    <div className={['ui-ldgc', className].filter(Boolean).join(' ')}>
      <style href="ui-agent-ledger-clean" precedence="default">{css}</style>
      <header className="ui-ldgc__bar">
        <span className="ui-ldgc__mark"><LedgerMark /></span>
        <span className="ui-ldgc__title" id={x}>{title}</span>
        {agent && <span className="ui-ldgc__agent">{agent}</span>}
        <span className="ui-ldgc__sum">
          <span><b>{total.toLocaleString('en-US')}</b> {total === 1 ? 'change' : 'changes'}</span>
          {undoneCount > 0 && <span className="ui-ldgc__sum-undone"><b>{undoneCount.toLocaleString('en-US')}</b> undone</span>}
        </span>
      </header>
      <ol className="ui-ldgc__panel" aria-labelledby={x}>
        {sorted.map(entry => {
          const isUndone = undoneSet.has(entry.id);
          const kind = chainKind.get(entry.id);
          const irreversible = entry.reversible === false;
          const cascadeCount = isUndone || irreversible ? 0 : liveDescendants(entry.id).length;
          const change = entry.change && (entry.change[0].trim() || entry.change[1].trim()) ? entry.change : undefined;
          return (
            <li key={entry.id} className="ui-ldgc__row"
              data-undone={isUndone ? '' : undefined}
              data-initial={initialIds.current?.has(entry.id) ? '' : undefined}
              data-preview={L === entry.id ? '' : undefined}
              data-chain={kind}
              style={{ '--o': chainOrder[entry.id] ?? 0 } as React.CSSProperties}>
              <span className="ui-ldgc__icon" aria-hidden="true">{entry.icon ?? letter(entry.system)}</span>
              <div className="ui-ldgc__main">
                <span className="ui-ldgc__what" title={entry.target ? `${entry.action} ${entry.target}` : entry.action}>
                  <span className="ui-ldgc__action" dir="auto">{entry.action}</span>
                  {entry.target && <span className="ui-ldgc__target" dir="auto">{entry.target}</span>}
                  <span className="ui-ldgc__strike" aria-hidden="true" />
                </span>
                <span className="ui-ldgc__change" title={change ? `${change[0]} → ${change[1]}` : entry.detail}>
                  {change ? (
                    <>
                      <span className="ui-ldgc__before" dir="auto">{change[0]}</span>
                      <span className="ui-ldgc__arrow" aria-label="to">→</span>
                      <span className="ui-ldgc__after" dir="auto">{change[1]}</span>
                    </>
                  ) : (
                    <span className="ui-ldgc__detail" dir="auto">{entry.detail}</span>
                  )}
                </span>
              </div>
              <div className="ui-ldgc__end">
                {kind ? (
                  <span className="ui-ldgc__flag" data-kind={kind}>{kind === 'also' ? 'Also undone' : <><LockIcon />Can't undo</>}</span>
                ) : (
                  <>
                    <span className="ui-ldgc__time" data-hide={isUndone || !irreversible ? '' : undefined}>
                      {isUndone ? 'Undone' : <>{fmtAt(entry.at, N)}<span className="ui-ldgc__sys"> · {entry.system}</span></>}
                    </span>
                    {isUndone ? (
                      <button type="button" className="ui-ldgc__act" onClick={() => doRedo(entry)} aria-label={`Redo: ${entry.action}${entry.target ? ` ${entry.target}` : ''}`}>
                        <RedoIcon /><span className="ui-ldgc__act-label">Redo</span>
                      </button>
                    ) : irreversible ? null : (
                      <button type="button" className="ui-ldgc__act"
                        onMouseEnter={() => setHoverId(entry.id)} onMouseLeave={() => setHoverId(h => h === entry.id ? null : h)}
                        onFocus={() => setHoverId(entry.id)} onBlur={() => setHoverId(h => h === entry.id ? null : h)}
                        onClick={() => doUndo(entry)}
                        aria-label={`Undo: ${entry.action}${entry.target ? ` ${entry.target}` : ''}${cascadeCount ? ` – and ${cascadeCount} that build on it` : ''}`}>
                        <UndoIcon /><span className="ui-ldgc__act-label">Undo</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const RAW: (Omit<LedgerEntry, 'at'> & { t: number })[] = [
  { t: 0, id: 'pr', action: 'Merged PR #482', target: 'Pricing page v2', system: 'GitHub', icon: <GitHubIcon />, change: ['pricing-v2', 'main'] },
  { t: 1.5, id: 'deploy', action: 'Deployed', target: 'affectui.com', system: 'Vercel', icon: <VercelIcon />, change: ['#481', '#483 in production'], dependsOn: ['pr'] },
  { t: 2.6, id: 'price', action: 'Changed price', target: 'Pro plan', system: 'Stripe', icon: <StripeIcon />, change: ['$29 / month', '$34 / month'] },
  { t: 3.7, id: 'coupon', action: 'Created coupon', target: 'LAUNCH20', system: 'Stripe', icon: <StripeIcon />, detail: '20% off the first year · ends in 7 days' },
  { t: 4.8, id: 'faq', action: 'Updated page', target: 'Pricing FAQ', system: 'Notion', icon: <NotionIcon />, change: ['3 answers', '3 answers rewritten'] },
  { t: 5.9, id: 'deals', action: 'Updated 212 deals', target: 'Renewals in Q4', system: 'HubSpot', icon: <HubSpotIcon />, change: ['$29 per seat', '$34 per seat'], dependsOn: ['price'] },
  { t: 7, id: 'post', action: 'Posted in #launch', target: 'New pricing is live', system: 'Slack', icon: <SlackIcon />, detail: 'With a link to the pricing page', dependsOn: ['deploy'] },
  { t: 8.1, id: 'email', action: 'Sent email', target: '3,812 customers', system: 'HubSpot', icon: <HubSpotIcon />, detail: 'New price and the code LAUNCH20', dependsOn: ['price', 'coupon'], reversible: false },
];

const POINT_AT = 10;
const AUTO_UNDO_AT = 12.2;
const RESET_AT = 24;
const TIME_SCALE = 22;

export default function AgentLedgerDemo() {
  const [elapsed, setElapsed] = useState(0);
  const [generation, setGeneration] = useState(0);
  const [undone, setUndone] = useState<string[]>([]);
  const [base] = useState(() => Date.now());
  const clock = useRef(0);
  const paused = useRef(false);
  const interacted = useRef(false);
  useEffect(() => {
    let last = performance.now();
    const iv = window.setInterval(() => {
      const now = performance.now();
      if (!paused.current) clock.current += (now - last) / 1e3;
      last = now;
      if (clock.current > RESET_AT) {
        clock.current = 0;
        interacted.current = false;
        setUndone([]);
        setGeneration(g => g + 1);
      } else if (!interacted.current && clock.current >= AUTO_UNDO_AT) {
        setUndone(u => (u.length ? u : ['price', 'deals']));
      }
      setElapsed(clock.current);
    }, 100);
    return () => window.clearInterval(iv);
  }, []);
  const entries = RAW.filter(e => elapsed >= e.t).map(({ t, ...rest }) => ({ ...rest, at: base + t * TIME_SCALE * 1e3 }));
  return (
    <div className="al-demo"
      onPointerEnter={e => { if (e.pointerType === 'mouse') paused.current = true; }}
      onPointerLeave={() => { paused.current = false; }}>
      <AgentLedger key={generation} entries={entries} agent="Launch agent" now={base + elapsed * TIME_SCALE * 1e3}
        pointAt={!interacted.current && elapsed >= POINT_AT && elapsed < AUTO_UNDO_AT ? 'price' : null}
        undone={undone}
        onUndo={ids => { interacted.current = true; setUndone(u => [...u, ...ids.filter(id => !u.includes(id))]); }}
        onRedo={ids => { interacted.current = true; setUndone(u => u.filter(id => !ids.includes(id))); }} />
    </div>
  );
}
