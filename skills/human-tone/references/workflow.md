# Workflow — the six steps in detail

The pipeline that turns a draft into human-sounding text. Each step explains what it does and
why it comes where it does. The order matters: language and register are settled before any
pattern fires, so that every later judgement is made against the right baseline.

## 1. Identify

Detect the language — one language, or mixed. For mixed text, split by sentence and route each
sentence to its own language side, because a Chinese sentence and an English sentence in the
same document need different packs. Also form a rough read of provenance: text that looks like
a human first draft raises the edit threshold (see the source heuristic in `precision.md`). The
detection and per-sentence routing mechanism is in `resolver.md`.

## 2. Register gate

Classify the register (social, self-media, business, formal written, academic, official, web
fiction, and so on) and activate only the patterns that register polices. Fixed formulae in
official prose and heavy nominalization in academic writing are norms, not faults. Ambiguous
register takes the intersection of the applicable rule sets — the stricter reading — so a
misclassification cannot license an over-edit.

## 3. Scan

Walk the text against the mother patterns in `patterns.md`. Apply the density rule: one
occurrence is not a fault. Flag only what clusters in a short span, floats free of the content,
and deletes without loss. The concrete triggers for the detected language come from that
language's pack.

## 4. Subtractive rewrite

Prefer deletion. Where a span cannot be cut, shorten it, restore the plain verb, or swap in the
native phrasing. Route every flag through the precision gates (register, replaceability,
whitelist, calque) before editing. Protected spans — numbers, dates, proper names, quotes, code
— stay byte-for-byte intact; rewrite around them.

## 5. Self-check re-scan

Do not stop at one pass:

- **Residue loop.** After each pass, list at least two remaining bits of AI flavor and edit
  again. Cap at three passes so the text is not worried to death. Anything still in doubt after
  that gets marked `[needs review]` rather than cut — an uncertain span held is recoverable, an
  uncertain span deleted is not.
- **Flattening check.** Re-read for the rollback symptoms in `guardrails.md`. If the prose has
  gone uniformly smooth and the voice is gone, restore specificity toward the source.
- **Information fidelity — check both directions.** Cross-check the original against the final:
  every fact in the source is still present (nothing dropped), and every fact in the final was
  in the source (nothing invented). Loss and addition are both failures; tick both directions.
- **Optional script re-scan.** Run `scripts/check.mjs` to sweep the surface signals a pack
  declares. The script only reports; it does not rewrite. A script hit is not proof the span
  should change — when the model and the script disagree, the model's judgement wins, and the
  disagreement is noted so the call is traceable.

## 6. Output

By default, return the finished text only. When the user asks to annotate or to detect only,
return the change list plus a before/after comparison instead of a clean rewrite.
