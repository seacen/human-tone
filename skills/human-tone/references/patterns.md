# Mother patterns — the cross-language catalog

Sixteen recurring shapes that make text read as machine-written. They come from the
generation process itself, so they recur across languages and are described here once,
in language-neutral form. This file names the *shape* of each pattern, how to judge it,
and which of Orwell's diseases it maps to. It carries no trigger words, no blacklist
entries, and no examples in any specific language — every concrete instance lives in the
language packs under `languages/<code>/pack.md`.

Why keep the catalog abstract: a trigger word is true for one language only, but the
underlying move ("inflate an ordinary fact with a value label", "reach for a fancy word")
is the same everywhere. Write the judgement once; let each pack say what it looks like
locally.

## How to judge (read this before flagging anything)

- **One occurrence is not a fault.** Penalize only what clusters in a short span, floats
  free of the content, and can be cut without losing meaning. A single hedge, one
  parallel pair, one nominalization — leave them. Density is the signal, not presence.
- **Cut-test every flag.** If removing the span loses information the reader needed, it
  was carrying weight; keep it. The patterns target padding, not content.
- **Three actions, not two: delete, rewrite-to-dilute, or keep.** The cut-test has a trap.
  A dense cluster whose every item carries information fails the cut-test — deleting would
  lose content — so it defaults to keep, and an obviously machine passage survives untouched.
  When the *density* is the tell but the items are loaded, the move is neither delete nor keep:
  it is *dilute* — lower the redundancy (break the drilled cadence, fold repeats into running
  prose, vary the sentence forms) while keeping every item's content. Recall then stops being
  blocked by the cut-test, and precision holds because nothing is lost.
- **Orwell tie is a provenance label, not a rule.** Rows tagged *Orwell* correspond to a
  named category in *Politics and the English Language*; rows tagged *this spec* are
  operationalized from bad style directly and are not attributed to Orwell.
- **Flag the move, not one surface form.** A pattern's variants are the same fault. Do not
  let a rewrite dodge a flag by swapping in a near-synonym of the same shape — the packs
  list representative triggers, not a closed set, so that variants stay caught. Seal the
  escape route rather than chase words one at a time.

## The 16 patterns

| ID | Name | Orwell tie | Shape | Fix |
|----|------|-----------|-------|-----|
| MP-01 | Evaluative inflation | Meaningless words | A value-laden qualifier attached to an ordinary fact; an importance label stuck on something plain, adding no information. | Delete it, or replace it with what actually changed. |
| MP-02 | Mechanical antithesis | This spec | Negation-then-affirmation or paired opposites run for cadence rather than to carry a distinction. | Unfold the parallelism and state the conclusion plainly — but only when it is pure cadence that deletes without loss. If the opposition carries a real distinction, even a faint one, keep it. |
| MP-03 | Rule-of-three padding | This spec | Three or more coordinated items run for rhythm. Two faults: items that add nothing, or the same shell drilled ≥3 times across a short span where each item does carry content but the marching cadence is itself the tell. | Cut the empty items. When every item is loaded but the shell keeps repeating, the fault is the rhythm, not any item — break it (fold some into running prose, drop one triad to a single clause, vary the forms) and keep every item's content. Dilute, don't delete. |
| MP-04 | Narrator scaffolding | This spec | The narrator steps forward to guide the reader or to comment on the text itself instead of just delivering it. | Delete the guiding phrase; state the thing directly. |
| MP-05 | Non-committal hedging | Meaningless words | Hedges and soft qualifiers that decline to commit to a judgement. | Delete; keep only where the hedge marks real uncertainty. |
| MP-06 | Verbal false limbs | Verbal false limbs | A light verb plus a nominalization swallowing a single plain verb. | Restore the plain verb. |
| MP-07 | Suspense-then-reveal | This spec | The point is withheld to build suspense, then dropped as a reveal — a framing device, not information. | Cut the suspense; lead with the conclusion. |
| MP-08 | Bookend boilerplate | This spec | Ritual openers and closers: grand-era framing to start, a summarizing sign-off to end — including an *original* aphoristic flourish that crowns the piece with a value label and adds no new information. | Delete the fixed formula. For an original flourish, end on the last concrete sentence and drop the crowning line. |
| MP-09 | Unwarranted absolutes | Meaningless words | Absolutes and superlatives with nothing behind them. | Delete, or downgrade to a claim the text can support. |
| MP-10 | Nominalization & passive preference | Operators (passive voice) | Actions turned into nouns, the passive preferred, the agent gone missing. | Restore the verb; make it active and name the agent. |
| MP-11 | Pretentious diction | Pretentious diction | Reaching for a high-register word or jargon where a plain word is available. | Use the plain word; say what is done. |
| MP-12 | Dead metaphor & reified abstraction | Dying metaphors | An abstraction reified as a physical entity — made to *grow* as a plant would, or to physically *support / hold up* something. | State the abstract relation directly; drop the thingifying verb. |
| MP-13 | Metaphor abuse (piling & opaque coinage) | Dying / mixed metaphors | Metaphors piled up — several images in a short span — or an invented figure that has to be decoded before it means anything. | Cut the surplus images; every figure must land on first read, or replace it with plain statement. |
| MP-14 | Staccato drama | This spec | Fragmented short sentences and one-line paragraphs used for dramatic rhythm rather than meaning. | Rejoin into normal sentences; drop the rhythm-only breaks. |
| MP-15 | Placeholder vagueness | This spec | A pronoun or placeholder standing in for a concept the text could simply name. | Name the thing directly. |
| MP-16 | Empty category shell | This spec | An empty category wrapper bolted onto an already-clean noun — naming its category or its thing-ness instead of just using the noun. | Drop the shell; keep the noun. |

## Where the instances live

Each language pack (`languages/<code>/pack.md`) carries, per MP-ID, the trigger words or
sentence shells that realize the pattern in that language, plus its local severity and any
register exemptions. Packs may add language-specific notes under an MP row. This catalog
never enumerates them.

## Calque is handled elsewhere

Word-for-word translationese (a calque) is language-pair specific, not a cross-language
shape, so it is not a mother pattern. It is judged as a precision criterion — back-translate
the phrase to the source language and see whether it only reads naturally there — described
in `precision.md`, with the actual mapping tables held in the target language's pack.
