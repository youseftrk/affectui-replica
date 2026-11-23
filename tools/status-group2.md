# Group 2 status
slug | mismatch% | note
agent-crew | 0.104 | static-pass (rebuilt; injected live-only .ui-acrc__got floor-glow span on Researcher node + animationDelay 10s to match live currentTime~0)
agent-handoff | 0.025 | static-pass (rebuilt; css re-emitted with @container rules)
agent-plan | 0.066 | static-pass (rebuilt; was 1.676; css re-emitted with @container rules)
agent-steering | 0.159 | static-pass (rebuilt; was 1.368; css re-emitted with @container rules)
ai-answer | 0.165 | static-pass (re-extracted at wait=1500 for typing state; css re-emitted with @container rules)
billing-schedule | 0.045 | static-pass (css re-emitted with @container rules)
checkbox | 0.104 | static-pass
combobox | 0.002 | static-pass (css re-emitted with @container rules)
conflict-radar | 0.030 | static-pass (css re-emitted with @container rules)
date-picker | 0.011 | static-pass
date-range-picker | 0.000 | static-pass (css re-emitted with @container rules)
dropzone | 0.481 | within animation noise (ref-vs-ref 0.590; css re-emitted with @container rules)
inline-diff | 1.398 | post-accept state via wait=1550 extract; residual=accept/checkmark anim phase (racy auto-accept ~1500ms); ref-vs-ref 0.626; css re-emitted with @container rules
kbd | 0.073 | static-pass
memory-graph | 0.103 | static-pass (css re-emitted with @container rules)
model-usage | 0.039 | static-pass (css re-emitted with @container rules)
pagination | 0.007 | static-pass
prompt-library | 0.025 | static-pass (css re-emitted with @container rules)
reaction-bar | 0.000 | static-pass
review-center | 0.009 | static-pass (fixed extract.mjs+assemble-css.mjs to capture @container rules; queue col 268px now matches)
setup-guide | 0.028 | static-pass
tips-panel | 0.002 | static-pass
tool-access-map | 0.069 | static-pass
# DONE
