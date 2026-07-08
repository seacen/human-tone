# Precision — how not to hurt what should stay

High recall is easy to get wrong: strip aggressively and you shave off terminology, quoted
text, register norms, and the author's own judgement. That damage is the expensive kind —
a false positive erases something a person meant, while a missed bit of AI flavor is merely
residue. So every flag from `patterns.md` passes through the gates below before it earns an
edit. All of them are language-neutral mechanisms; wherever a concrete word would appear,
this file says *(see language packs)* instead.

## Register gating — bind the register before you pick rules

Decide the register first (social, self-media, business, formal written, academic,
official, web fiction, and so on), then activate only the patterns that register actually
polices. The same surface form is a fault in one register and a norm in another: heavy
nominalization is a disease in a chatty post and correct in an academic abstract; fixed
opening formulae are boilerplate in a blog and required in official prose. Judge against the
register's own baseline, not a single global standard. Which patterns each register exempts
or expects is data — *(see language packs)*, section "register bandwidth".

When the register is genuinely ambiguous, take the **intersection**: apply only the patterns
that count as faults under *every* register the text might be in. Erring toward the stricter
reading keeps you from "correcting" a norm you misclassified.

## Object disambiguation — the replaceability test

Several patterns (light-verb constructions, category shells, placeholders) hinge on what the
target actually refers to. Before rewriting, run the replaceability test: substitute the
plain form and see whether meaning survives. If the plain verb or the bare noun says the same
thing, the wrapper was padding — cut it. If substitution changes or loses meaning, the
construction was load-bearing — leave it. Each pack carries positive and negative examples of
this boundary — *(see language packs)*, section "object-boundary examples".

## Density threshold — look at the span, not the token

A pattern is a fault when it clusters, floats free of content, and deletes without loss. One
instance in a paragraph clears none of those bars, so it is not flagged. Read the short span
around a candidate and ask whether the *pattern* is what is carrying the passage; only then
edit. This is the same rule stated in `patterns.md`, applied as a filter here so that recall
never outruns precision. The three strength levels (minimal / standard / aggressive) differ
only in how tight this threshold is set.

Length inverts tolerance. A short text has no room to hide: one boilerplate opener or one
inflated adjective already dominates a two-line note, so the bar to flag drops. A long text
absorbs a stray instance, so hold the flag until the pattern actually clusters across the
span. Read the same surface form against how much of the whole piece it occupies, not as a
fixed per-token verdict.

**Dilute before you conclude "keep".** When a pattern clusters densely but each item in the
cluster passes the cut-test — every one carries information — do not read that as a keep. The
items are loaded, yet the density is still the tell. Deleting whole items would lose content,
so reach for the third action instead of the binary: lower the redundancy rather than remove
items — break a drilled cadence, fold repeated shells into running prose, vary the forms. This
is the common failure mode on dense persuasion prose, where marching triads and an aphoristic
close each carry content and so slip through a delete-or-keep filter untouched.

## Whitelist gate — a hard stop before any edit

Some spans are never candidates regardless of what a pattern matched: settled terminology,
recognized acronyms, ingredient or component names, proper names, and marked deliberate
rhetoric. Check the gate first; a whitelist hit removes the span from consideration before the
edit is even considered. The category is universal; the actual entries are data — *(see
language packs)*, section "whitelist", coordinated with the protected categories in
`guardrails.md`.

## Calque criterion — back-translate to detect translationese

To decide whether a phrase is word-for-word translationese, back-translate it into the source
language. If it only reads naturally in the source and the target already has a native way to
say the same thing, it is a calque — replace it with the native form. If it reads naturally in
the target on its own terms, leave it. Translationese is language-pair specific, so the
mappings live in the target language's pack — *(see language packs)*, section "calque table".
For a language used as a source rather than a target, that table is empty by design.

## Source heuristic — who wrote it raises or lowers the bar

Estimate provenance. Text that reads like a human first draft gets a higher edit threshold:
its roughness is more likely voice than machine tell, and over-smoothing it is exactly the
irreversible harm to avoid. Machine-generated text gets the normal threshold. Keep this axis
separate from register — provenance is *who produced it*, register is *what kind of text it
is*; a human can write in a formal register and a machine in a casual one. Do not let one
stand in for the other.

## Fallback — when unsure, downgrade and hold

If a flag survives the gates but you still cannot tell whether the span is AI flavor or the
author's intent, do not cut it. Downgrade to a hold: leave it in place and mark it for review
rather than guessing. The standing tie-breaker is that a false positive is more irreversible
than leftover residue, so uncertainty resolves toward keeping the text as written.

One limit keeps the hold from swallowing an obviously machine text: when the *same* pattern
recurs densely across the whole piece — the same shell drilled paragraph after paragraph —
provenance already points to the machine, so it is no longer a genuine "unsure". The hold is
for isolated, boundary-blurred single points, not for a systematic tell repeated end to end;
there, apply the dilution above rather than holding.
