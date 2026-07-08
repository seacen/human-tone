<!-- 测试样本 | human-tone eval case -->
# en-01 · SaaS landing copy (high recall)

- **Language / register**: English · marketing / SaaS landing page
- **Type**: high recall (many patterns stacked in one passage)
- **Pattern focus**: MP-08 Bookend boilerplate · MP-02 Mechanical antithesis · MP-11 Pretentious diction (GPT lexicon) · MP-01 Evaluative inflation · MP-04 Narrator scaffolding

## Source (AI-heavy)

> In today's fast-paced world, our platform isn't just a tool — it's a paradigm shift. We leverage cutting-edge AI to seamlessly empower creators, delve into rich tapestries of data, and unlock unparalleled growth. It's important to note that success isn't about features; it's about the journey. At the end of the day, choosing us means choosing a better you.

## Expected edits

- **Cut the bookends** (MP-08): "In today's fast-paced world" and "At the end of the day, choosing us means choosing a better you" — both are ritual framing, delete.
- **Break the antithesis** (MP-02): "isn't just a tool — it's a paradigm shift" and "success isn't about features; it's about the journey" — state what the product does, drop the mold.
- **Swap the GPT lexicon** (MP-11): _leverage, cutting-edge, seamlessly, empower, delve, tapestries, unparalleled, paradigm shift_ → plain words, or cut. Say concretely what it does for creators.
- **Cut the narrator** (MP-04): "It's important to note that" — delete.
- **Downgrade the inflation** (MP-01): "unparalleled growth" → drop the superlative; name the actual result if the source gives one.

## What this case tests

Tests **high recall** on the densest English AI tells. As with zh-01, stripping the boilerplate exposes that the copy carries almost no concrete claim — the right C-tier move is to remove the AI layer and flag "no concrete product benefit stated here" rather than invent one. Low precision risk, no protected spans. Use it to check that the GPT lexicon (MP-11) and the antithesis mold (MP-02) both get caught, not just the obvious bookends.
