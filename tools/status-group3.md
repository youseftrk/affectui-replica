# Group 3 status (agent-cursors … trace-waterfall)
slug | diff% | interactions-verified | notes
agent-cursors | 0.325 | static-pass | rebuilt after CSS fixes; residual animation phase drift resolved
agent-inbox | 1.584 | within animation noise (ref-vs-ref@+2s 2.410%), ticking timers on live
agent-queue | 0.772 | within animation noise (ref-vs-ref@+2s 0.945%)
agent-timing | 0.188 | static-pass | first shot caught transient Vite reload (dark), reshoot clean
approval-card | 0.032 | static-pass
breakdown-chart | 0.043 | static-pass
code-block | 0.002 | static-pass
command-menu | 0.004 | static-pass
context-map | 0.606 | within animation noise (ref-vs-ref@+2s 0.854%)
decision-card | 0.003 | static-pass
decision-inbox | 0.062 | static-pass
experiment-card | 0.033 | static-pass
filter-menu | 0.001 | static-pass
integration-picker | 0.065 | static-pass
memory-panel | 0.004 | static-pass
message-actions | 0.039 | static-pass
parallel-attempts | 0.197 | static-pass
popover | 0.439 | static-pass | added useEffect showPopover + repositioned fixed popover to stage-relative coords
rate-limit-planner | 0.336 | static-pass
resizable | 0.139 | static-pass
root-cause-tree | 0.212 | static-pass
stat-card | 0.027 | static-pass
text-area | 0.118 | static-pass
toggle-group | 0.021 | static-pass
trace-waterfall | 0.600 | within animation noise (ref-vs-ref@+2s 1.234%), right-edge animated column on live

# DONE
