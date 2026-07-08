# Resolver — how languages are discovered, detected, and routed

The universal loading mechanism. It knows nothing about any particular language; it discovers
what is supported by looking at the filesystem and decides what to load from the input text.
This is what makes the skill extensible: adding a language is a data change, not a code change.

## Discover by enumeration, never by hardcoding

To learn which languages are supported, enumerate the folders under
`references/languages/`. Each folder is one language, named by its code, and holds that
language's `pack.md`, `minimal.md`, and `signals.json` — the pack protocol (what each file is,
how to add a language) is in `languages/README.md`. The set of supported languages is exactly the set of
folders present — there is no list of language names anywhere in this mechanism, in
`patterns.md`, or in the scripts. As a statement of current data, `languages/` today contains
`zh` and `en`; that is a fact about the folder, not a constant the mechanism relies on.

## Detect the language of the input

For each folder, `signals.json` carries a `detect` block describing how to recognize that
language from raw text — for example a minimum ratio of CJK characters (`cjkRatioMin`), a
minimum ratio of Latin characters (`latinRatioMin`), or a set of function words
(`functionWords`) to look for. Score the input against every discovered pack's `detect` rules
and pick the best match. Because the rules live in the packs, a new language brings its own
detection and the resolver needs no edit.

The `detect` vocabulary the script understands is fixed: the two script-ratio keys
(`cjkRatioMin`, `latinRatioMin`) plus the script-agnostic `functionWords`. This is the one
seam that is not pure data — a new language on a different script family (Cyrillic, Arabic,
Devanagari) has no ratio key of its own, so it detects via `functionWords`, which works for
any script without touching the script. Prefer `functionWords` for any language outside the
CJK/Latin split; reach for a new ratio key only if you also add the matching branch to the
script's `ratios()` helper, and treat that as the rare exception, not the normal path.

## Route mixed text by sentence

Text is often mixed. Do not force the whole document into one language. Split into sentences,
detect each sentence on its own, and load the matching pack for that sentence. Each sentence is
then judged and rewritten against its own language side, so a Chinese clause and an English
clause in the same paragraph each get the right patterns, whitelist, and calque table.

## Handle unsupported languages gracefully

If the input's language has no folder under `languages/`, fall back to the universal layer
alone — the language-neutral mother patterns and precision mechanisms — and tell the user the
language is not yet fully supported. The skill still does what it can with the cross-language
shapes; it just has no language-specific triggers, whitelist, or calque data to draw on.

## Adding a language is one folder

To support a new language, create `references/languages/<code>/` and fill in its three files
(`pack.md`, `minimal.md`, `signals.json`) as described in `languages/README.md`. The
universal layer, the resolver, and the scripts do not change by a single line — discovery,
detection, and the check script all read from whatever folders exist. That is the whole point
of keeping this mechanism free of any language name.
