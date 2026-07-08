# Language pack — English (`en`)

Data only. This file lists how the 16 master patterns surface in English, plus the
English blacklist, English-only tics, register bands, whitelist, and object-boundary
examples. It carries no judging logic — when to fire, how to gate by register, and how
to test for false positives all live in the general layer (`patterns.md`, `precision.md`,
`guardrails.md`). Everything here is a lookup table the general layer reaches into.

Represent English tells only. A pattern already covered fully by the general shape is
not repeated; sections list the English-specific delta.

---

## ① Manifest

- **Code**: `en`
- **Name**: English
- **Detection cues** (surface, for routing — the real mechanism is in `resolver.md`):
  high Latin-letter ratio; frequent function words `the / and / of / to / is / that`;
  ASCII sentence punctuation; heavy em-dash and semicolon use in AI drafts.
- **Maintained**: 2026-07-06

---

## ② Master-pattern realizations (delta only)

Columns: MP-ID | English trigger words or frame shells | severity | register exemption.
Severity is a default weight for the density threshold, not a verdict. Register exemption
names where the same surface form is a norm, not a tell.

| MP-ID | English triggers / frame shells | severity | register exemption |
|-------|--------------------------------|----------|--------------------|
| MP-01 Evaluative inflation | `crucial`, `vital`, `essential`, `pivotal`, `invaluable`, `game-changer`, `cutting-edge`, `state-of-the-art`, `unparalleled`, `world-class`, `powerful`, `robust` used as praise not spec | high | marketing copy (rein in, don't clear); safety/legal where `critical` is defined |
| MP-02 Mechanical antithesis | `not just X but Y`, `not merely … but`, `it's not X, it's Y`, `less about X, more about Y` | high | genuine contrast where both sides carry information |
| MP-03 Rule-of-three padding | `X, Y, and Z` triples where one item repeats the others; `fast, simple, and powerful` | medium | legal enumerations; spec lists where each item is distinct |
| MP-04 Narrator scaffolding | `It's important to note`, `It's worth noting`, `Let's dive in`, `Let's explore`, `Now, let's`, `As we can see`, `Keep in mind that` | high | tutorial/teaching register (allow sparingly) |
| MP-05 Non-committal hedging | `arguably`, `it could be argued`, `some might say`, `in many ways`, `to a certain extent`, `generally speaking` piled without a claim | medium | academic hedging that qualifies a real finding |
| MP-06 Verbal false limbs | light verb + nominalization: `make a decision`, `reach a conclusion`, `provide assistance`, `conduct an analysis`, `give consideration to`, `take into consideration` | high | fixed legal/contract phrasing (`give notice`, `take effect`) |
| MP-07 Suspense-then-reveal | `But here's the thing`, `Here's the catch`, `The best part?`, `And that's when everything changed`, one-line teaser before the point | medium | fiction; deliberate narrative hook |
| MP-08 Bookend boilerplate | openers `In today's fast-paced world`, `In an era of`, `In the ever-evolving landscape of`; closers `In conclusion`, `At the end of the day`, `Ultimately, it comes down to` | high | formal report abstract/conclusion where a summary is expected |
| MP-09 Unwarranted absolutes | `always`, `never`, `every single`, `the most important`, `without a doubt`, `undoubtedly`, `guaranteed` with no evidence | medium | quoted claims; contexts where the absolute is literally true |
| MP-10 Nominalization & passive preference | `the implementation of`, `the utilization of`, `there is a need for`; agentless passive `it was decided`, `mistakes were made` | medium | scientific method sections; standards/spec text where passive is the norm |
| MP-11 Pretentious diction | `delve`, `tapestry`, `testament`, `underscore`, `leverage`, `utilize`, `seamless`, `realm`, `embark`, `harness`, `elevate`, `showcase`, `foster`, `myriad`, `plethora`, `intricate`, `meticulous`, `navigate the complexities` | high | domain terms of art (a `robust` estimator in statistics is a term, not diction) |
| MP-12 Dead metaphor & reified abstraction | two sub-shapes. Dead-metaphor clichés run on autopilot: `move the needle`, `low-hanging fruit`, `circle back`, `boil the ocean`, `move mountains`, `a game of two halves`. Reified abstractions made to grow or bear weight: `take root`, `grow into`, `blossom into`, `hold space for`, `prop up`, `carry` (an idea/feeling), `a growing body of`, `plant the seeds of` | medium | horticulture/construction where the verb is literal; a cliché quoted or named as a cliché |
| MP-13 Metaphor abuse (piling & opaque coinage) | mixed/stacked images in one span (`a rollercoaster of a tightrope walk`); opaque coinages that only parse after decoding | high | poetry; register where a single vivid figure is deliberate |
| MP-14 Staccato drama | one-clause paragraphs stacked for rhythm; `And that matters.` / `Because it works.` fragments as beats | medium | ad copy, speeches, fiction where the cadence is intended |
| MP-15 Placeholder vagueness | `the thing`, `this whole situation`, `a certain something`, `stuff like that`, `on some level` where a nameable referent exists | medium | casual speech transcription |
| MP-16 Empty category shell | `the whole X thing`, `X as a concept`, `the notion/idea of X` wrapped around an already-clean noun, `the world of X` | high | none in expository prose |

---

## ③ Blacklist (by problem family)

Representative words, not an exhaustive list. Ban the whole family including inflections
and near-spellings — don't let a synonym swap dodge the rule (`utilize` → `leverage` →
`harness` is the same evasion). The point is the reflex, not the token.

- **LLM lexical tells**: `delve`, `tapestry`, `testament (to)`, `underscore`,
  `showcase`, `boast(s)`, `nestled`, `vibrant`, `bustling`, `myriad`, `plethora`,
  `realm`, `landscape` (figurative), `ecosystem` (figurative), `journey` (figurative),
  `embark`, `unleash`, `unlock`, `elevate`, `foster`, `cultivate`, `intricate`,
  `meticulous`.
- **Corporate filler**: `leverage`, `utilize`, `synergy`, `streamline`, `optimize`
  (as vague praise), `robust`, `seamless`, `scalable`, `holistic`, `bandwidth` (of a
  person), `circle back`, `move the needle`, `low-hanging fruit`, `at the end of the day`.
- **Empty intensifiers / evaluative inflation**: `crucial`, `vital`, `essential`,
  `pivotal`, `game-changer`, `cutting-edge`, `next-level`, `world-class`,
  `revolutionary`, `groundbreaking`, `unparalleled`.
- **Connective padding**: `Moreover`, `Furthermore`, `Additionally`, `In addition`,
  `That being said`, `It's worth noting`, `Needless to say` (as sentence-openers stacked
  back to back).
- **Frame shells**: `not just X but Y`; `whether you're X or Y`; `from X to Y, …`;
  `In today's fast-paced world`; `In the ever-evolving landscape of`; `When it comes to X`;
  `In conclusion`.

Deleting a family member is a first move, not a synonym hunt. If the sentence still needs
the idea, name what actually happened (`use`, not `leverage`; `important because <reason>`,
not `crucial`).

---

## ④ English-only tics (not caught by any master pattern)

Cross-language shapes go to the master patterns. These are English surface habits the AI
overproduces:

- **Em-dash overuse** — the LLM sprinkles `—` where a comma, period, or nothing belongs.
  Prune to the ones that carry a real aside.
- **Correlative-conjunction reflex** — `not only … but also`, `both … and`, `either …
  or` used as filler scaffolding rather than for real correlation.
- **Gerund-heavy openers** — `Understanding X is key to …`, `Building on this, …` as a
  default paragraph starter.
- **Comma-splice via `-ing` tail** — `The system runs fast, delivering results …`; the
  trailing participle padding restates the main clause.
- **"This" without a noun** — `This means`, `This allows`, `This is why` where the
  referent is left dangling (adjacent to MP-15; listed here as an English syntactic habit).
- **Title-case everything** — over-capitalized headings and Key Terms mid-sentence for
  false emphasis.
- **Hyphenated compound praise** — `results-driven`, `future-proof`, `best-in-class` as
  padding adjectives.

---

## ⑤ Calque table (empty for `en`)

English is treated as a **source** language, not a target, so this table is empty.

Calque (word-for-word translationese) is a language-pair defect: it shows up in the
**target** language when a translator carries source-language structure across. The
general layer handles it as a precision test (`precision.md`: does it only read smoothly
when back-translated to the source?), and the entries live in the **target** language's
pack — for example, English→Chinese calques (`white space` → 市场空白, `deep dive` → 深挖)
belong in the `zh` pack, not here.

English does absorb calques from other languages, but each such entry belongs in a pack
built for that direction. Nothing is listed here because no target-language direction
terminates in English within the current language set.

---

## ⑥ Register bands

Which patterns to relax or silence per register. Baseline is standard expository prose;
the entries below are exemptions layered on top.

| Register | Relax / exempt | Baseline note |
|----------|----------------|---------------|
| Marketing / social copy | MP-01, MP-14 reined in not cleared; some rhythm and praise is native to the genre | still cut MP-08 openers, MP-11 LLM diction |
| Business email | MP-06 fixed courtesies (`please find`, `let me know`) tolerated | cut MP-04, MP-08, MP-11 hard |
| Technical docs | MP-10 passive in spec text is a norm; MP-11 terms of art (`robust`, `atomic`) are terms | cut MP-01 praise, MP-04 scaffolding |
| Formal report / whitepaper | MP-08 abstract & conclusion summaries expected; MP-05 qualified hedging allowed | cut MP-11 diction, MP-02 frames |
| Academic | MP-05 hedging that qualifies a finding is a norm; MP-10 nominalization tolerated | cut MP-01, MP-11 |
| Legal / contract | MP-06 (`give notice`, `take effect`), MP-10 passive are fixed forms | cut MP-08, MP-11 |
| Spoken / transcript | MP-15 fillers, MP-14 fragments are natural speech | do not "clean up" into written prose |

---

## ⑦ Whitelist (don't touch)

- **Recognized abbreviations**: `RPI`, `SKU`, `NRR`, `ARR`, `MRR`, `API`, `SDK`, `KPI`,
  `SLA`, `TAM`, `SAM`, `SOM`, `CAC`, `LTV` — keep as-is; don't expand or "humanize".
- **Terms of art that overlap the blacklist**: `robust` (statistics/engineering),
  `atomic` (transactions), `elevate` (medical — a raised value), `foster` (childcare),
  `harness` (safety equipment), `optimize` (mathematical). Register decides — see §⑥ and
  the object-disambiguation test in §⑧.
- **Proper names, product names, quoted material, code identifiers**: never rewritten
  even if they contain a blacklisted word.
- **Deliberate rhetorical markers**: a parallel triple or antithesis that a real author
  clearly built for effect and that carries information — protected by the general
  guardrails, not overridden here.

---

## ⑧ Object-boundary examples (substitutability test)

For the ambiguous blacklist words, the general test (`precision.md`) is: can a plain word
replace it with no loss? If yes, it's the AI tic — cut. If the plain swap changes the
meaning, it's the term of art — keep. Paired corpus:

- **leverage** — "we leverage the data" → "we use the data" (no loss → **cut**).
  "financial leverage of 3:1" → "financial use of 3:1" (breaks → **keep**, it's the term).
- **robust** — "a robust solution" → "a solid solution" (no loss → **cut**).
  "a robust estimator" → "a solid estimator" (breaks; robustness is a defined property → **keep**).
- **harness** — "harness the power of AI" → "use AI" (no loss → **cut**).
  "clip the harness to the anchor" → "clip the use to the anchor" (breaks → **keep**).
- **foster** — "foster collaboration" → "encourage collaboration" (no loss → **cut**).
  "a foster placement" → "an encourage placement" (breaks → **keep**).
- **elevate** — "elevate your brand" → "raise your brand" reads as praise padding (**cut**).
  "elevate the limb" / "an elevated ALT reading" (breaks → **keep**, medical term).
- **critical** — "a critical feature" → "an important feature" (no loss → **cut**).
  "critical path" / "critical temperature" (breaks → **keep**, defined term).
