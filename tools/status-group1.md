# Group 1 status
agent-checkpoints | 0.576% | spread-everywhere animated demo; ref-vs-ref noise 0.30% -> within animation noise
agent-graph | 0.026% | static-pass (fixed missing .stage .agg-demo rule in assemble-css.mjs)
agent-checkpoints | 0.068% | static-pass (rebuilt post-fix)
agent-graph | 0.016% | static-pass (rebuilt post-fix)
agent-monitor | 0.504% | animation-phase noise: live retriggers shine/sheen via JS (anim t=333 vs ours t=1900); residual 1px stage-bottom edge; ours-vs-ours 0.005%
agent-sequence | 0.031% | static-pass
agent-workbench | 0.104% | static-pass
away-summary | 0.069% | static-pass
change-summary | 0.008% | static-pass (rebuilt post-fix)
collaboration-stream | 0.020% | fixed: added useEffect scrollTop=scrollHeight on .ui-crsc__scroll (was 1.516%)
compact-breakdown | 0.025% | static-pass
context-menu | 0.036% | fixed: showPopover()+stage-relative pos for [popover] panel; added .stage__look align-items:start (was 1.406%)
data-table | 0.072% | static-pass
diff-timeline | 0.048% | static-pass
email-draft | 0.023% | static-pass (rebuilt post-fix)
flow-builder | 0.555% | within animation noise (ref-vs-ref 0.431%; scattered animated nodes/edges)
kpi-chart | 0.010% | static-pass
model-router | 0.207% | static-pass
otp-input | 0.039% | static-pass (rebuilt post-fix)
project-card | 0.000% | static-pass
rating | 0.052% | static-pass (rebuilt post-fix)
response-stream | 0.192% | static-pass
scheduled-runs | 1.674% | live demo ROTATES states on a timer (innerText fully changes ~every few s); ours is faithful static snapshot (layout+text verified identical when live in same state); ref-vs-ref noise 0.9-1.0%
select | 0.027% | static-pass (rebuilt post-fix)
time-picker | 0.023% | static-pass (rebuilt post-fix)
toaster | 0.456% | toast slide/fade animation phase noise (ref-vs-ref 0.272%); under 0.5% threshold
writing-assistant | 0.011% | static-pass
# DONE
