# Changelog — en-marketing

Skill: human-tone · strength: standard (precision-leaning) · language: en

## Steps 1–2 — detect + register gate

- Language: English. Provenance: machine-generated marketing landing copy (dense, uniform tells) → normal edit threshold, no raised bar.
- Register: **marketing / product landing copy**. Per the en pack register band, MP-01 (evaluative inflation) and MP-14 (staccato) are *reined in, not cleared* — some rhythm and praise is native to the genre — while MP-08 openers and MP-11 LLM diction get cut hard. Length is short, so per the density rule the bar to flag drops (a short text can't absorb a stray tell).

## Step 4 — edits made (16 spans)

| # | Original | Pattern | Action |
|---|----------|---------|--------|
| 1 | "doesn't just store your ideas, it keeps them in perfect sync" | MP-02 mechanical antithesis | Unfolded to plain statement: "keeps your ideas in sync". The "store" foil carried no claim. |
| 2 | "in **perfect** sync" | MP-09 unwarranted absolute | Dropped "perfect". |
| 3 | "always current, always with you, always ready" | MP-03 rule-of-three anaphora | Trimmed to "stay current wherever you are"; "always ready" was the weakest, restating "with you". |
| 4 | Heading "Seamlessly synced, effortlessly yours" | MP-11 LLM diction (`seamless`) + adverb pairing | Replaced with plain heading "In sync on every device". |
| 5 | "ideas shouldn't live on just one device — they should follow you everywhere" | MP-12 reified abstraction (ideas *live* / *follow*) + MP-02 antithesis | "Your ideas shouldn't be stuck on one device." Cut the restating second half. |
| 6 | "Whether you're jotting a grocery list … or drafting a novel …" | Frame shell (`whether you're X or Y`) | Unfolded to direct imperatives; kept both concrete examples (grocery list / novel). |
| 7 | "without missing a beat" | MP-12 dead-metaphor cliché | Cut. |
| 8 | "Our **robust** offline-first architecture" | MP-11 corporate filler | Cut "robust" (object-boundary: "solid architecture" → no loss = praise padding, not the stats/eng term). Kept "offline-first" (real term). |
| 9 | "no conflicts, no lost work, no stress" | MP-03 rule-of-three | Dropped "no stress" (emotional filler); kept the concrete pair. |
| 10 | "It's not just convenient; it's freedom." | MP-02 mechanical antithesis + MP-01 inflated payoff | Deleted whole sentence — pure padding, no claim. |
| 11 | "From lightning-fast search to intuitive organization" | Frame shell (`from X to Y`) + MP-01 (`lightning-fast`, `intuitive`) | "Search is fast, organizing is simple" — named the claims plainly. |
| 12 | "let your ideas flow" | MP-12 reified abstraction | Cut. |
| 13 | "powerful under the hood" | MP-01 inflation + MP-12 cliché | Cut. |
| 14 | "the perfect balance of simplicity and capability" | MP-01 empty inflation | Cut. |
| 15 | "empowering you to focus on what truly matters: your thoughts" | MP-11 (`empowering`) + MP-01 (`what truly matters`) + `-ing` tail + reveal colon | "so you can focus on your ideas" — kept the payoff, dropped the inflation. |
| 16 | "safe, synced, and **always** within reach" | MP-09 absolute | Dropped "always" (echoed earlier). |

## Step 5 — self-check

- **Residue loop (≥2 named, revised once):** (a) "instantly and securely" adverb pair — held, both are real claims (speed + security), cutting either loses info. (b) Closing sentence still carries two rule-of-three triples ("thinkers, creators, and doers" / "safe, synced, and within reach") — held on purpose: stacked social-proof triples are native to a marketing CTA, and per the register band MP-03 rhythm is relaxed there; flattening them would sand off genre voice.
- **Flattening-rollback check:** passed. Result keeps varied sentence lengths, both rhetorical-question hooks, concrete detail (grocery list, novel, 30,000 feet, subway), the tagline, and the CTA rhythm. It does not read as a neutral manual.
- **Fact reconciliation (both directions):** no fact dropped (sync across devices, secure cloud, offline at altitude/subway, auto-reconcile with no conflicts/lost work, fast search, organization, distraction-free, free / no card, thousands of users all retained) and none invented ("stuck on one device" ⊂ "live on just one device"; "focus on your ideas" ⊂ "focus on … your thoughts").
- **Script:** `check.mjs` reported 0 surface hits — a false negative (its regexes don't see register, density, or antithesis frames). Model judgment governs; noted for traceability.

## Deliberately NOT changed (protection + register)

- **Tagline** "Every thought, everywhere you are" — deliberate rhetoric / voice.
- **"Notion's simpler cousin"** — a metaphor that lands on first read and does real positioning work; "Notion" is a protected proper name.
- **Device triple** "phone / laptop / tablet" — three distinct, concrete items; genre rhythm, no repetition.
- **"And when the Wi-Fi drops? You won't even notice."** and **"No signal? No problem."** — question/staccato hooks that are native marketing voice and carry the offline claim (MP-14 reined in, not cleared).
- **"30,000 feet"** — protected number; concrete detail.
- **"create, edit, and organize"** — three distinct verbs, each load-bearing.
- **CTA headings** and **"[Get Started Free →]"**, **"No credit card required. Sync in seconds."** — UI/CTA elements and plain concrete copy, left intact.
