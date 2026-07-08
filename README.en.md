<div align="center">

<!-- logo goes here -->

# human-tone

[![version](https://img.shields.io/badge/version-1.0.0-2ea44f)](https://github.com/seacen/human-tone/releases)
&nbsp;[![license](https://img.shields.io/github/license/seacen/human-tone?color=blue)](LICENSE)
&nbsp;![works with](https://img.shields.io/badge/works_with-any_agent-8A2BE2)
&nbsp;[![中文](https://img.shields.io/badge/README-%E4%B8%AD%E6%96%87-informational)](README.md)

</div>

Make AI-written text read like a person wrote it: strip the AI tone, corporate jargon, translationese, mechanical antithesis, and boilerplate — but leave what you actually meant untouched: facts, numbers, terms, quotes, and the author's own voice. Ships with Chinese and English, and extends to any language, each on its own terms.

## Why it's better

Most de-AI-flavor tools go wrong one of two ways. Some **only swap words**: ban "delve" and the model reaches for "explore" — one synonym and the tell is back. Others **cut too much**: they strip a legal document's fixed phrasing or an author's deliberate refrain along with the slop. human-tone works differently:

- **It goes after the pattern, not a word list.** It watches for 16 recurring cross-language patterns (evaluative inflation, mechanical antithesis, translationese, and so on) and catches every variant, so a synonym can't slip past.
- **It would rather miss than misfire.** It reads the register first: a legal "shall be processed", an academic "we conducted an analysis", an author's intentional refrain — all left alone. Whether a word goes depends on whether its neighbors pile up and whether cutting it loses meaning. When unsure, it leaves the text.
- **It has sources.** The subtractive method comes from Orwell's *Politics and the English Language* (with Strunk & White's *The Elements of Style*); the Chinese translationese rules from Yu Guangzhong's *On Improving Europeanized Chinese* (with Si Guo's books on translation); which kinds of writing may be edited — a legal brief versus a chatty post — comes from Biber's and Halliday's work on register.
- **What's left still reads human.** If a pass flattens the piece — every sentence the same length, the voice sanded off — that counts as damage and it rolls back. After rewriting, it rescans for leftovers — a script re-checks the patterns a model's memory would miss — and reconciles every fact against the original, so nothing is dropped or invented.
- **It sidesteps the traps others fall into.** It doesn't play writing teacher (only a "when not to touch" guardrail remains), and doesn't cut blindly — some tools delete every adverb or ban every dash, and add fresh AI tells doing it.
- **It's tested.** It ships two sample sets: one of things that should be cleaned, to measure how much it catches; one where not a single character should move, to measure whether it misfires.

## Two layers: universal rules + language packs

AI flavor comes in two layers, so the rules do too — adding a language changes not one line of the core logic.

- **The universal layer** — the defects every language shares, and the standard for deciding whether to cut (things like evaluative inflation and mechanical antithesis). These come with the way models generate text and recur whatever the language, so they're written once and hold no words from any specific language.
- **A language pack** — how one of those defects actually shows up in a given language: its common AI words, which kinds of writing count as normal, which terms are off-limits, its translationese table. One folder per language.

Write the standard once and every language uses it; the specific words stay in each pack. **Adding a language is dropping a folder** into `languages/` (with `pack.md`, `minimal.md`, `signals.json`); the universal layer stays put. See the [language-pack protocol](skills/human-tone/references/languages/README.md).

## Install

One command, no clone — it installs onto every agent you have (Claude Code, Codex, Cursor, Windsurf, Cline, Aider, and the Chinese agents Qoder, Trae, CodeBuddy):

```
npx github:seacen/human-tone
```

It does two things: it installs the human-tone skill on each of your agents, then writes one line into each agent's config that references those rules (a reference, not the pasted text). The rules stay in context, so your writing gets cleaned as you go. It takes effect right away.

> Why keep the rules always loaded: a skill only runs when the model thinks to invoke it, and for prose it can already write, it won't. Put the rules in the config and the cleaning happens on its own.

Just want the skill and will call it yourself? Run `npx skills add seacen/human-tone`, then invoke `human-tone` in your agent for a full deep clean.

## Install options

Every touched file is backed up (`*.human-tone.bak`), reruns don't double-write, and it all reverses:

```
npx github:seacen/human-tone --dry-run              # show what would change, touch nothing
npx github:seacen/human-tone --uninstall            # remove all of it
npx github:seacen/human-tone --scope project        # install into the current project, not globally (default: global)
npx github:seacen/human-tone --lang zh              # install one language's rules (default: both)
npx github:seacen/human-tone --agents claude,codex  # limit to specific agents
```

Needs Node (`npx` relies on it anyway; one script runs on both macOS and Windows).

## Layout

```
skills/human-tone/   the skill: SKILL.md + references/ (universal layer + languages/ packs) + scripts/
install.mjs          cross-agent installer
evals/               rubric, comparison design, test samples
docs/DESIGN.md       design notes
```

## License

MIT — see [LICENSE](LICENSE).
