# Guardrails — what to leave alone, and when to stop

The skill only subtracts, but subtraction has a failure mode of its own: strip far enough and
you flatten the text into an even, characterless manual. This file lists what is off-limits
and describes that failure mode so you can catch yourself in it. Categories here are abstract;
the concrete entries (which terms, which acronyms, which names) live in each language pack's
whitelist.

## Protected spans — never edit through these

Some spans are outside the skill's remit entirely. Do not alter, paraphrase, or "improve" them
even when a pattern seems to match:

- **Numbers, dates, quantities, units** — changing them changes facts.
- **Proper names** — of people, places, products, organizations.
- **Quotations** — a quote is someone else's words; smoothing it is misquoting.
- **Code, identifiers, commands, markup** — semantics depend on the exact characters.

When one of these sits inside a span you want to rewrite, rewrite around it and leave it byte-
for-byte intact.

## Protected categories — off-limits by kind

- **Terminology.** Settled terms of art say something a plainer word would not. Keep them even
  when they read as heavy diction; the whitelist in each pack carries the actual list.
- **Recognized acronyms.** Standard abbreviations are the native form, not jargon to expand.
- **Register norms.** Fixed formulae and conventions that a register requires are correct
  usage in that register, not boilerplate. Judge against the register's baseline (see
  `precision.md`).
- **Deliberate rhetoric.** Repetition, parallelism, or a fragment that the author clearly
  chose for effect is voice, not a machine tell. Marked deliberate-rhetoric signals live in
  the packs; honor them.
- **Real human voice.** A human author's judgement, tone, idiosyncrasy, and specific detail
  are the thing worth protecting. When in doubt about whether a span is flavor or voice, treat
  it as voice.

## Flattening rollback — the failure state to catch

Deleting until the prose is uniformly smooth and even is not success; it is a different kind of
damage. A rewrite that reads like a neutral instruction manual has usually gone too far.
Watch for these symptoms and roll the edit back toward the source when they appear:

- Every sentence has settled to the same length and rhythm.
- Concrete detail, examples, and specific numbers have thinned out.
- The author's stance has gone neutral — no preference, no judgement left.
- Idiom and turn of phrase have been normalized into generic phrasing.
- The text could have been written by anyone about anything.

If you see these, you have over-subtracted. Restore the specificity and the voice; the goal is
text a person wrote, not text with the personality sanded off.

## Keep the human texture

The point of removing AI flavor is to make the writing sound like a person, which means the
person's fingerprints stay. Preserve stance, preferred words, uneven rhythm, and the small
specific details that no template would produce. Removing flavor and preserving voice are the
same job done well; losing the voice is the job done badly.
