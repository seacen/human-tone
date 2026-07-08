<!-- 测试样本 | human-tone eval case -->
# en-03 · Journal abstract (pure precision trap)

- **Language / register**: English · academic / research abstract
- **Type**: pure precision trap (should barely change)
- **Pattern focus**: none genuine — passive, nominalization, and hedging here are register norms

## Source (almost no AI tell)

> We hypothesize that increased canopy cover is associated with a reduction in understory temperature. To test this, measurements were taken across 40 plots over two growing seasons. The results suggest that canopy cover accounts for a significant proportion of the observed variance (p < 0.01). These findings may have implications for forest management under warming scenarios.

## Expected edits

- **Leave essentially as written.** This is a register-normal abstract; there is no AI tone to remove. The correct output ≈ the source.
- "measurements were taken" reads like MP-10 passive preference, but agentless passive is a norm in methods reporting — **do not force "we took measurements."**
- "The results suggest", "may have implications" read like MP-05 hedging, but academic hedging qualifies a real finding — **keep it.** Turning "suggest" into "show", or "may have" into "has", overstates the claim and corrupts the science.
- Keep `p < 0.01`, `40 plots`, `two growing seasons` verbatim (numbers / statistics are protected spans).

## What this case tests

Tests the **register gate and the source heuristic** together (see precision.md). Every surface here — agentless passive, nominalization, hedging — is flaggable in another register but normative in academic prose. C's correct behavior is **near-zero edits**; edit count is inversely scored on a trap.

Two ways to fail, both scored hard: (1) "de-hedging" `suggest → show` or `may have → has` changes the truth value — that is information corruption (dimension 3 → 0), not just a precision slip; (2) flipping passives to active flattens the register (dimension 2 → 0). This is the English mirror of zh-03: watch whether A/B over-edit and whether C holds still.
