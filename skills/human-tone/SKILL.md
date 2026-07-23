---
name: human-tone
description: >-
  Strip AI flavor from writing — evaluative inflation, mechanical antithesis ("not just X, but Y"),
  rule-of-three padding, hollow hedging, narrator scaffolding, corporate jargon, translationese — so
  it reads like a person wrote it, without touching terms, quotes, code, numbers, or an author's
  deliberate voice. Multilingual; Chinese and English are first-class. Use it proactively as the
  finishing pass on any task producing prose people will read or publish: articles, blog posts,
  marketing and social copy (Xiaohongshu, WeChat posts), slide decks and PPT, emails, reports,
  documentation, announcements, product and landing copy, newsletters, scripts. Run it before
  delivering generated writing even when the user never mentions AI flavor; cleaning up after they
  complain is too late. Also use when asked to humanize, de-slop, remove the AI tone, make text sound
  human, or fix writing that "reads like ChatGPT" or "is too robotic". Skip only pure code, data, and
  mechanical transforms with no human-facing prose.
---

# human-tone — strip the AI flavor

Turn AI-flavored text back into something a person would write. **Subtraction only**: delete, shorten, merge, restore a plain verb. No style lessons, no new voice, no injected personality. The one piece of positive content is the guardrails — telling the model **when not to touch**.

Do two things at once: **high recall** (clear out the AI flavor that is actually there) and **high precision** (never damage terms, quotes, code, register-appropriate norms, or a person's deliberate phrasing). When the two conflict, favor precision — **mis-cutting a real voice is less reversible than leaving a trace of AI flavor.**

## Two layers of criteria (why split this way)

AI flavor has two layers, so the criteria do too:

- **Universal layer** (this file + `references/*.md`) — only the *shape* of each defect, how to judge it, and the control flow. The mother-patterns (evaluative inflation, mechanical antithesis, rule-of-three padding, …) come from how the text was generated, recur across languages, and are stated once. **No language-specific trigger words, blacklists, or calques live here.**
- **Language side** (`references/languages/<code>/`) — all the data for one language: how each defect surfaces in it, which words, which registers are exempt, its calque table. `languages/` currently holds `zh` and `en`.

Write a criterion once and every language benefits; keep the word lists apart. Adding a language means dropping a folder under `languages/` — the universal layer and the script do not change. For how a language is auto-discovered and detected, see `references/resolver.md`.

## Strength (default: standard, precision-leaning)

- `minimal` — cut only the most glaring boilerplate and jargon; leave sentence structure almost untouched.
- `standard` (default) — check every mother-pattern, gated by register and whitelist; when unsure, leave it.
- `aggressive` — also fix mild clustering. Ask the user before moving up to this; do not escalate on your own.

All three share the same mother-patterns and guardrails and differ only in how tight the density threshold is. Precision-leaning by default, for the reason above: sooner under-cut than erase a person's judgment, tone, and detail.

## Workflow (six steps)

1. **Detect** — identify the language (zh / en / mixed); for mixed text, split by sentence and route each part to its language side; roughly judge the source (if it reads like a person's hand-written draft, raise the bar before rewriting). Detection and routing live in `references/resolver.md`.
2. **Register-gate** — judge the register (social / marketing / business / formal / academic / official / fiction / …) and activate only the rules that register warrants. Fixed officialese and high academic nominalization are norms there, not defects.
3. **Scan** — check against the mother-patterns (`references/patterns.md`). **A single occurrence is not judged**; flag only what clusters in a short span, floats free of the content, and loses nothing when cut.
4. **Subtractive rewrite** — cut if you can; only if you cannot, shorten / restore a plain verb / swap in the idiomatic phrase. Protected spans (numbers, dates, proper nouns, quotes, code) stay untouched throughout.
5. **Re-scan** — after rewriting, list ≥2 residual tells yourself and revise once more; run the flattening-rollback check (if it now reads like a neutral manual, revert); reconcile facts against the original so none are lost or invented. Optionally run `scripts/check.mjs` to re-scan surface signals (report-only; the model arbitrates on conflict).
6. **Output** — final text by default; give a change list plus a before/after only when the user asks to annotate or detect-only.

## Pointers (load as needed)

- `references/patterns.md` — the 16 cross-language mother-patterns (MP-01..MP-16): each one's shape, how to judge it, which Orwell category it hangs on. Language-neutral; instances point to the packs.
- `references/precision.md` — the no-false-positive spine: register-gating · object-disambiguation · density threshold · whitelist gate · calque back-translation test · source heuristic · fallback downgrade.
- `references/guardrails.md` — what not to touch (the master table) + flattening rollback (over-cutting into a flat, even manual is its own failure) + keeping the human voice.
- `references/workflow.md` — the six steps in detail + the self-check loop + two-way fact reconciliation + optional script re-scan.
- `references/resolver.md` — the generic loader: how supported languages are auto-discovered, how the input language is detected, how mixed text routes by sentence.
- `references/languages/<code>/` — all data for one language: `pack.md` (full structured data) · `minimal.md` (one-page condensed always-on rules) · `signals.json` (rescan signals). The pack format and how to add a language are in `references/languages/README.md`; the universal layer stays put.

When in doubt, ask — do not force a cut. That is this skill's bottom line.
