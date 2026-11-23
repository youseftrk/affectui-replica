# Group 4 status (27 components)
slug | diff% | interactions-verified | notes
agent-findings | 1.406 | within animation noise (ref-vs-ref 0.80%), diff spread everywhere
agent-lanes | 1.691 | within animation noise (ref-vs-ref 0.87%); first shot was transient-dark, reshot clean; our anims phase-locked so self-diff 0%
agent-recap | 0.088 | static-pass
agent-trail | 0.984 | live clock drift (22s vs 23s) + anim phase on track/probe; text identical, ref self-noise 0.015%
approval-gates | 0.061 | static-pass
agent-findings | 1.417 | rebuilt post-fix; within animation noise (ref-vs-ref 0.298); 2 infinite anims ui-afc-sheen/ui-afc-breathe, diff spread everywhere
agent-lanes | 0.678 | rebuilt post-fix; within animation noise (ref-vs-ref 0.617)
agent-recap | 0.087 | rebuilt post-fix; static-pass
agent-trail | 0.037 | rebuilt post-fix; static-pass (clock drift gone)
approval-gates | 0.061 | rebuilt post-fix; static-pass
chat-composer | 0.004 | static-pass
color-picker | 0.012 | fixed: added showPopover()+trigger-relative positioning useEffect, .stage__look place-items:inherit rule, offsetWidth measure (anim scale bug)
comments-panel | 0.136 | static-pass
context-window | 0.067 | static-pass
decision-tree | 0.087 | static-pass
dialog | 0.004 | static-pass
fallback-chain | 0.210 | static-pass
form-field | 0.073 | static-pass (first shot transient detach, reshot clean)
integration-settings | 0.042 | static-pass
metering-chart | 0.035 | static-pass at wait=3000 (bar rise-in anims end ~1460ms post-mount; lazy mount delays start vs live)
notification-stack | 0.022 | static-pass
permission-request | 0.000 | static-pass
profile-menu | 0.002 | static-pass
reasoning-summary | 0.071 | static-pass
run-controls | 0.151 | static-pass
smart-recommendation | 0.041 | static-pass
stepper-form | 0.034 | static-pass at wait=3000 (btn/foot entrance anim still running at 1500ms due to lazy mount)
text-field | 0.065 | static-pass
tool-call-card | 0.066 | static-pass
trend-chart | 0.024 | static-pass
# DONE
