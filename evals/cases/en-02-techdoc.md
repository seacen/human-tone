<!-- 测试样本 | human-tone eval case -->
# en-02 · Release notes (verb restoration + protected code span)

- **Language / register**: English · technical writing / API release notes
- **Type**: medium (nominalization/passive dense + one precision boundary)
- **Pattern focus**: MP-06 Verbal false limbs · MP-10 Nominalization & passive preference · MP-04 Narrator scaffolding

## Source (AI-heavy)

> This release provides an enhancement to the authentication module. The implementation of rate limiting was carried out in order to give consideration to abusive traffic. Users are advised that the `X-RateLimit-Remaining` header will be returned with each response. It should be noted that a migration of existing tokens is required.

## Expected edits

- "provides an enhancement to the authentication module" → "improves the authentication module" (MP-06 / MP-11).
- "The implementation of rate limiting was carried out in order to give consideration to abusive traffic" → "We added rate limiting to handle abusive traffic" (MP-10 de-nominalize + MP-06 restore verb + active voice).
- "Users are advised that … header will be returned" → "Each response returns the … header" (MP-04 drop the narrator, MP-10 active).
- "It should be noted that a migration of existing tokens is required" → "You must migrate existing tokens" (MP-04 + MP-10).

## What this case tests

Tests **verb restoration and de-nominalization in a technical register** — the same MP-06/MP-10 moves as zh-02, on English release-notes prose that reads bureaucratic without being register-normative (unlike the legal/academic traps, plain release notes have no excuse for "was carried out to give consideration to").

**Precision boundary**: the header name `` `X-RateLimit-Remaining` `` is a protected span (guardrails: code / term, verbatim). Rewriting the sentence around it is fine; altering, un-casing, or "simplifying" the header string is a precision hit (dimension 2 → 0). Check that C restores the verbs while leaving the code token untouched, and that it doesn't drop the factual detail that migration is *required* (dimension 3).
