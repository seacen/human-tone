# human-tone — strip AI flavor from writing

[中文](README.md)

Make AI-written text read like a person wrote it — remove the AI tells (evaluative inflation, corporate jargon, translationese, mechanical antithesis, boilerplate) **without touching a single thing you meant**: facts, numbers, terms, quotes, the author's voice. Chinese and English are first-class; the framework extends to any language.

## Why human-tone

Most de-AI-flavor tools either **just swap words** (ban "delve" and the model reaches for "explore" — a synonym gives it away) or **over-edit** (they shave off legal fixed phrases and a real author's deliberate parallelism). human-tone is different:

- **Targets the pattern, not a word list** — 16 cross-language "mother patterns" (evaluative inflation, mechanical antithesis, translationese…) with variants sealed.
- **Precision first, zero collateral** — a precision spine (register gating, object disambiguation, density thresholds, a whitelist); when unsure, it leaves the text alone. Across 4 real rewrites in the evals, precision damage was 0.
- **Every agent, out of the box** — one command installs it into Claude Code, Codex, Cursor, Windsurf, Cline, Aider, and the Chinese agents Qoder, Trae, CodeBuddy.

## The core: universal layer + language packs (two layers)

AI flavor has two layers, so the criteria do — this is what lets one ruleset cover many languages and makes adding a language a zero-code change:

- **Universal layer** (`skills/human-tone/references/*.md`): the *shape* of each defect, how to judge it, the control flow. The mother patterns come from the generation process, recur across languages, are written once, and hold no specific-language words.
- **Language packs** (`skills/human-tone/references/languages/<code>/`): how those defects surface in one language — its word lists, register bands, whitelist, calque table. One folder per language.

Write a criterion once, every language benefits; keep the word lists apart. **Adding a language is dropping a folder** under `languages/` (`pack.md` + `minimal.md` + `signals.json`); the universal layer doesn't change. Protocol: [`references/languages/README.md`](skills/human-tone/references/languages/README.md).

## Install

One command, no clone — installs it on every agent you have (Claude Code, Codex, Cursor, Windsurf, Cline, Aider, and the Chinese agents Qoder, Trae, CodeBuddy):

```
npx github:seacen/human-tone
```

It does two things: **(1)** installs the human-tone skill on each agent, and **(2)** writes a one-line *reference* to that rule file into each agent's config (`@` reference, never inlined) so the rules stand in context every turn — your writing gets de-flavored automatically. It takes effect right away.

> Why standing rules: a model won't invoke a finishing-pass skill for prose it writes itself. Keeping the rules standing in the config is what makes de-flavoring happen automatically.

Just want the skill to invoke yourself? `npx skills add seacen/human-tone`, then call `human-tone` in your agent for a six-step deep clean.

## Install options

Every run backs up each touched file (`*.human-tone.bak`), is idempotent, and is reversible:

```
npx github:seacen/human-tone --dry-run              # preview only, change nothing
npx github:seacen/human-tone --uninstall            # remove everything it added
npx github:seacen/human-tone --scope project        # install into the current project (default: global)
npx github:seacen/human-tone --lang zh              # install one language's rules (default: both)
npx github:seacen/human-tone --agents claude,codex  # limit to specific agents
```

Requires Node (`npx` needs it anyway; one script runs on macOS and Windows).

## Layout

```
skills/human-tone/    the skill: SKILL.md + references/ (universal layer + languages/ packs) + scripts/
install.mjs           cross-agent installer
evals/                rubric, comparison design, test cases
docs/DESIGN.md        design doc
```

## License

MIT — see [LICENSE](LICENSE).
