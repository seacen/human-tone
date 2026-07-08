# Language packs — the protocol

A **language pack** is a folder `languages/<code>/` that holds all the data for one
language. The universal layer (`../patterns.md`, `../precision.md`, `../guardrails.md`,
`../workflow.md`, `../resolver.md`) holds the language-neutral *judging* — the shapes of
the 16 mother patterns and how to decide. A pack holds only *that language's data*: which
words, which register norms, how each pattern surfaces locally. Judging is written once;
the word lists stay per-language.

`resolver.md` discovers the installed languages by enumerating this folder. Adding a
language never touches the universal layer or `scripts/check.mjs`.

## The three files in every pack

| File | Who reads it | What it is |
|------|--------------|------------|
| `pack.md` | the full skill's six-step pass | Structured data — the pack's authoritative content. |
| `minimal.md` | the always-on standing rules (referenced into agent configs by `install.mjs`) | A one-page, self-contained checklist: the same rules condensed into a form a model applies directly, without loading the rest of the skill. |
| `signals.json` | the optional `scripts/check.mjs` rescan | Machine-readable surface-signal regexes. |

`pack.md` and `minimal.md` are two forms of one ruleset. **`pack.md` + the universal
patterns are the source of truth; `minimal.md` is their condensed digest** for the
always-on path. Keep them reconciled when either changes.

### `pack.md` — eight sections (data only, no judging logic)

1. **manifest** — language code, name, detection cues, maintenance stamp.
2. **mother-pattern realization table** — one row per MP-ID (the IDs are defined in
   `../patterns.md`, MP-01..MP-16): how that pattern surfaces here (trigger words or
   sentence shells), local severity, and which registers exempt it. Only the delta.
3. **blacklist by family** — representative words per problem family; variants are banned
   together so a synonym swap can't dodge them.
4. **language-private tics** — defects the universal patterns don't catch (e.g. in Chinese
   the "的的不休" run-on, the passive "被…所…").
5. **calque table** — word-for-word translationese for this language as a *target*
   (empty when the language is only a source).
6. **register bands** — which patterns each register raises the bar on or exempts.
7. **whitelist** — terms, acronyms, proper names, marked deliberate rhetoric — never touched.
8. **object-boundary examples** — paired positive/negative cases for the replaceability test.

### `minimal.md`

A self-contained one-page rule list for the language: a short directive ("when you write
prose, strip AI flavor before delivering"), the rules by pattern (each with one example,
not an exhaustive word list), the guardrails (what not to touch), and one closing ruler
("when unsure, leave it"). It must stand alone — it is pasted or referenced into an agent's
config, so it cannot rely on the rest of the skill being loaded. Mirror the shape of the
existing `zh/minimal.md` and `en/minimal.md`.

### `signals.json`

`{ "lang", "displayName", "detect": {…}, "signals": [ { "id", "label", "regex", "flags" } ] }`.
Give 6–9 surface signals that `check.mjs` can match. Report-only; the model arbitrates.

## Add a language `<code>`

1. Create `languages/<code>/`.
2. Write `pack.md` — fill the eight sections; realize each of the 16 MP-IDs from
   `../patterns.md` in the new language; add any language-private tics.
3. Write `minimal.md` — condense the universal rules plus this pack into a one-page
   checklist (mirror `zh`/`en`).
4. Write `signals.json` — 6–9 regexes for the optional rescan.
5. Done. The universal layer is unchanged; `resolver.md` auto-discovers the folder.

**SSOT rule:** the mother patterns and the judging are defined once, in the universal
layer. A pack references MP-IDs and supplies data; it never restates a judging rule.
