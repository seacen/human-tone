# Changelog — en-marketing, skill v2

Source: `en-marketing.baseline.md`. Output: `en-marketing.skill-v2.md`.
Register detected: **marketing / social copy** (band: MP-01 and MP-14 reined in, not
cleared — some praise and rhythm is native to the genre; MP-08 openers, MP-11 LLM diction
still cut hard). Strength: **standard**.

This run tests the v2-only third action, **rewrite-to-dilute**: for a dense cluster where
every item carries information (so deleting would lose content) but the drilled cadence is
itself the tell, break the rhythm and keep every item — instead of the binary keep-or-delete.

---

## Edits (13)

| # | MP | Before | After | Action |
|---|----|--------|-------|--------|
| 1 | MP-02 + MP-01 | "a note-taking app that doesn't just store your ideas, it keeps them in **perfect** sync" | "a note-taking app that keeps your ideas in sync" | delete (antithesis is pure cadence; "perfect" is inflation) |
| 2 | MP-03 | "Capture a spark on your phone, expand it on your laptop, review it on your tablet." | "Capture a spark on your phone, **then** expand it on your laptop **or** review it on your tablet." | **dilute** |
| 3 | MP-03 + MP-09 | "Your notes are **always** current, **always** with you, **always** ready." | "Your notes stay current and with you, wherever you are." | **dilute** (fold anaphora into prose; drop empty "ready" and the "always" absolute) |
| 4 | MP-11 | heading "**Seamlessly** synced, **effortlessly** yours" | "In sync on every device" | delete (corporate "seamless" + hollow adverb pairing) |
| 5 | MP-12 + MP-02 | "Your ideas shouldn't **live on** just one device — they should **follow you everywhere**." | "Your ideas shouldn't be stuck on one device." | delete (reified abstraction + shouldn't/should antithesis restating the point) |
| 6 | frame shell | "**Whether you're** jotting a grocery list on your phone or drafting a novel on your desktop, every keystroke syncs instantly and securely to the cloud." | "Jot a grocery list on your phone or draft a novel on your desktop — every keystroke syncs to the cloud, instantly and securely." | delete shell, keep both concrete examples |
| 7 | MP-12 | "...on any screen, **without missing a beat**." | "...on any screen." | delete (dead-metaphor cliché) |
| 8 | MP-01 | "Our **robust** offline-first architecture" | "Our offline-first architecture" | delete ("robust" as vague praise, not the statistics/eng term of art here) |
| 9 | MP-03 | "no conflicts, no lost work, **no stress**." | "no conflicts, no lost work." | delete (empty emotional item; the other two are loaded) |
| 10 | MP-02 + MP-08 + MP-01 | "**It's not just convenient; it's freedom.**" | (removed) | delete (aphoristic flourish crowning the section — end on the last concrete sentence) |
| 11 | frame shell + MP-12 | "**From** lightning-fast search **to** intuitive organization, every feature is designed to get out of your way and **let your ideas flow**." | "Search is fast, organizing is simple, and every feature stays out of your way." | delete shell + reified "flow"; keep both features |
| 12 | MP-03 + MP-01 + MP-11 + MP-07 | "Clean, distraction-free, and **powerful under the hood** — it's the **perfect balance of simplicity and capability**, **empowering** you to focus on **what truly matters: your thoughts**." | "Clean and distraction-free, so you can focus on your ideas." | delete (empty "powerful", inflated "perfect balance", "empowering", colon-reveal) |
| 13 | MP-09 | "safe, synced, and **always** within reach." | "safe, synced, and within reach." | delete unwarranted absolute |

---

## Where rewrite-to-dilute did the work (edits 2 and 3)

The two sentences opening paragraph 1 are back-to-back triples — the drilling that the
density rule flags:

> Capture a spark on your phone, expand it on your laptop, review it on your tablet. Your
> notes are always current, always with you, always ready.

The first triple is **all loaded**: three distinct devices × three distinct actions. A
cut-test says keep (deleting any item loses a device or an action), so a keep-or-delete
filter leaves the drilled `verb-it-on-your-<device>` march intact — exactly the trap
`patterns.md` describes. Dilute instead: `then … or …` varies the three identical beats
into 1 + (2-or-3) while every device and action stays. Cadence broken, nothing lost.

The second triple (`always current, always with you, always ready`) mixes loaded and empty:
"current" and "with you" carry the sync claim, "ready" restates it. Here dilute folds the
anaphora into running prose and drops the one empty item plus the "always" absolute —
keeping "current" **and** "with you" (v1 had dropped "with you", so v2 is also a small
fidelity gain).

The closing line keeps **two** triples on purpose — the persona triple "thinkers, creators,
and doers" and the state triple "safe, synced, and within reach" are different shapes, each
a single clean instance, and a piled CTA social-proof line is native to marketing register
(MP-03 reined, not cleared). Only the unwarranted "always" was cut. Not every triple gets
diluted; drilling of the *same* shape in a short span is the trigger.

---

## Kept on purpose (precision holds)

- "Notion's simpler cousin" — the product comparison, load-bearing.
- Concrete detail: phone / laptop / tablet, grocery list, novel, 30,000 feet, the subway.
- "No signal? No problem." — MP-14 staccato, native ad-copy cadence.
- "And when the Wi-Fi drops? You won't even notice." — MP-07 rhetorical hook, native here.
- "thinkers, creators, and doers" — deliberate persona triple, marketing voice.
- CTA, "No credit card required. Sync in seconds.", all product facts and numbers.

## Fidelity check (both directions)

No fact dropped and none invented. Only material removed is inflation, empty triple items,
frame shells, and dead metaphors. The offline / sync / search claims and every concrete
number and device survive.

## No-regression vs v1

v2 is identical to v1 everywhere except paragraph 1 (edits 2 and 3), where v1 left the
device triad as a drilled march and had dropped "with you". v2 dilutes the triad and
restores "with you" — a strict improvement, no step back elsewhere.
