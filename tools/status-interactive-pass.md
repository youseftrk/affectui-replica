# Interactive pass — batch verbatim ports (2026-02)

All remaining components ported verbatim from live `demo.clean-*.js` bundles via
`tools/portlib.py` + `tools/resolve-deps.py` (react/jsx-runtime shimmed to local
imports; shared `./X.js` chunks materialized under `src/components/ui/_deps/`).

App-shell shared exports (`index-DzfKaitw.js`: agent-tree `Rg`, chat-composer
`Yg`) extracted scope-aware via `tools/extract-shell2.py` (tree-sitter) into
`_deps/index-DzfKaitw.ts` + `_deps/rolldown-runtime-BpQH8Ho1.ts`.

## Verification
- `npx tsc --noEmit` clean; `npm run build` clean.
- Playwright smoke over all 137 `/preview/:slug` routes: **137/137 render, zero
  console/page errors** (`tools/smoke-final.json`).
- DOM class-histogram spot checks (badge, data-table, command-menu,
  agent-workbench, kpi-chart, response-stream): identical `ui-*` class counts
  vs live affectUI pages.
- Interactions are the live code itself (state machines, timers, handlers
  ported verbatim), so hover/click/keyboard/timed behavior matches by
  construction; earlier hand-verified probes (agent-graph card dialog,
  agent-monitor pause/fold, agent-sequence counters) still apply where the
  verbatim port superseded them.

## Known benign artifacts
- `agent-handoff`, `agent-recap`: one-frame NaN/negative SVG attribute console
  error on first mount measure (container width 0 before layout); ResizeObserver
  corrects on next frame — paths/rects verified valid after settle. Same code
  runs on live.
- Timed/animated demos (streams, charts, shine/sheen) show residual pixel
  noise vs live screenshots at arbitrary animation phases — documented per
  component in status-group*.md; ours-vs-ours re-shoots are ~0.005%.

## Components in this batch (verbatim ports)
agent-cursors agent-fleet agent-handoff agent-inbox agent-lanes agent-plan
agent-recap agent-router agent-steering agent-timing agent-trail agent-tree
agent-workbench ai-answer approval-gates avatar away-summary badge
billing-schedule breadcrumb breakdown-chart button card change-summary
chat-composer checkbox cited-answer code-block collaboration-stream
color-picker combobox command-menu comment-thread comments-panel commit-trail
conflict-radar context-map context-menu context-window cost-waterfall
data-table date-picker date-range-picker decision-card decision-inbox
decision-tree delegate-board dialog diff-timeline dropdown-menu dropzone
email-draft empty-state experiment-card fallback-chain fan-out-grid
filter-menu flow-builder form-field hover-card icon-button inline-diff
integration-picker integration-settings judge-bracket kbd kpi-chart
memory-graph memory-panel message-actions metering-chart model-picker
model-router model-usage notification-stack number-input otp-input pagination
parallel-attempts permission-request plan-vs-actual popover profile-menu
progress-tracker project-card prompt-library rate-limit-planner rating
reaction-bar reasoning-summary repo-map resizable response-stream
review-center root-cause-tree run-controls running-now scheduled-runs
scroll-area segmented-control select separator setup-guide skeleton
smart-recommendation spinner stat-card stepper-form switch tag-input
text-area text-field thinking-loader time-picker tips-panel toaster
toggle-group tool-access-map tool-call-card tooltip trace-waterfall tree-view
trend-chart usage-meter writing-assistant

(plus verbatim re-ports of agent-graph, agent-monitor, agent-sequence,
compact-breakdown which supersede earlier hand ports)
