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

## Two ways to use it

### 1. Both (recommended) — make your writing self-de-flavor

If you want the human-tone skill installed **and** the rules standing in your agents so writing gets cleaned automatically, use the installer:

```
node install.mjs           # detect your agents, preview only, change nothing
node install.mjs --write   # apply
```

It does two things: **(1)** `npx skills add` installs the skill on every agent, and **(2)** writes a one-line *reference* to the skill's rule file into each agent's config (`@` reference, never inlined). The rules then sit in context every turn.

> Why standing rules: a model won't invoke a finishing-pass skill for prose it writes itself (near 0% on content tasks, on any agent). Standing rules are the portable way to make de-flavoring automatic.

### 2. The skill only — deep clean on demand

If you just want the skill and will invoke it yourself:

```
npx skills add seacen/human-tone
```

Then, in an agent with a skills system (Claude Code, Codex, Cursor…), invoke `human-tone` when you want a thorough clean — a six-step, high-precision pass.

## Install options

Every run previews first, backs up each file (`*.human-tone.bak`), and is idempotent:

```
node install.mjs --scope global|project|both   # default: global
node install.mjs --lang zh|en|both             # default: both
node install.mjs --agents claude,codex         # limit to specific agents
node install.mjs --uninstall --write           # remove everything it added
```

Requires Node (`npx skills` needs it anyway; one Node script runs on macOS and Windows).

## Layout

```
skills/human-tone/    the skill: SKILL.md + references/ (universal layer + languages/ packs) + scripts/
install.mjs           cross-agent installer
evals/                rubric, comparison design, test cases
docs/DESIGN.md        design doc
```

## License

MIT — see [LICENSE](LICENSE).
