# agent-checkpoints interactive port — analysis notes

Live bundle: demobundles/demo.clean-BV1X5Vbx.js (23KB). Component css prefix `.ui-ackc`, demo wrap `.ack-demo`.

## State machine (port verbatim)
```js
A = 'c4'; j = 720;   // auto-rewind target id, tick ms
M = () => N({list:[], head:'', queue:O, clock:0, n:0});
N(e): dequeue queue[0] -> append {id:`c${n+1}`, parent:head||undefined, icon,title,files,cost,at:clock+took, status:'running', fail} ; head=new id; clock+=took; n++
P(e,t): list.map(head&&running -> status:'stopped'); return N({...e, head:t, queue:k})   // rewind+replay fork queue
interval j:
  head.status==='running' -> mark done (fail?'failed':'done')
  else queue.length -> N(e)
  else auto(i.current): head.fail -> P(e,'c4') ; else ++idle<6 ? e : (idle=0, M())
onRewind(id): i.current=false; t=>P(t,id)
```

## Script data
O (initial queue, order):
1. Read the brief — cost .02, took 9000, no files — icon T
2. Scaffolded the pricing page — 4 files, .06, 21000 — icon w
3. Wrote the plan copy — 1 file, .05, 17000 — icon C
4. Built the pricing table — 3 files, .11, 34000 — icon E
5. Added Stripe checkout — 5 files, .14, 41000 — icon D (Stripe #635BFF logo svg)
6. Tests failing – 4 of 12 — .04, 26000, FAIL — icon w
k (fork queue after ANY rewind):
1. Switched to Stripe Elements — 3 files, .12, 38000 — icon D
2. Tests pass – 12 of 12 — .04, 24000 — icon w
3. Opened the pull request — 1 file, .03, 11000 — icon w
IDs continue c7,c8,c9 after rewind (n never resets); parent=rewind target -> data-fork connector. 'attempt' = branch index shown in aria-label "attempt N".

## Render facts (from pro-2-probe remote)
- `.ui-ackc__sum` aria-live: "N checkpoints · $X" or "N checkpoints · M attempts · $X"
- OL `.ui-ackc__list` style `--ui-ackc-rows: N`; root div style `--ui-ackc-gutter: 38px|52px`
- LI `.ui-ackc__row` tabindex 0 only on focus-id row else -1; attrs data-live (branch rows), data-head, data-status done/running/stopped/failed, aria-current=step on head, aria-label `${title}${attempt?', attempt N':''}${status!=='done'?', '+status:''}${head?', current':leftBehind?', left behind':''}${rewindable?' – press Enter to rewind here':''}`
- Row content: `.ui-ackc__icon` svg, `.ui-ackc__name`, `.ui-ackc__meta` (files), `.ui-ackc__time` m:ss from `at`, `.ui-ackc__rewind` button (aria-hidden, tabindex -1, shows on hover/focus of row)
- SVG layer: `.ui-ackc__line` paths per parent link, `.ui-ackc__dot` g per cp (data-status, data-head), `.ui-ackc__glint` rect on live dot, `data-fork` on fork branch line
- Row click/Enter -> onRewind(cp.id): stops auto (i=false), P() rewinds: current running head -> 'stopped', head=target, queue=k replay
- After queue drains: auto counts 6 idle ticks -> reset M() (fresh c1..)
- fail item -> status 'failed' (not done); head.fail triggers AUTO-rewind to c4
- `F` set = rows "left behind" (abandoned branch rows lose data-live? get ', left behind' in aria-label, rewind still allowed -> ' – press Enter to rewind here')

## TODO
1. Extract icon components T,w,C,E,D svg markup from bundle (before O@~21500; D=#635BFF stripe logo seen @~20500-21000)
2. Port `x` renderer: flatten list by parent into rows w/ attempt# + leftBehind set, gutter calc, svg lines/dots/fork/glint — OR adapt existing static JSX into state-driven render (current tsx = one captured state; check what states it covers)
3. Wire interval state machine + onRewind + keyboard (Enter on row, Tab/arrow row nav? B===cp.id focus logic — check bundle for roving tabindex keys)
4. Verify vs live: initial build ~8.6s, fail->auto-rewind c4, k replay, idle->reset, manual rewind to each row
