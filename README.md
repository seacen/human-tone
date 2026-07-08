# human-tone · 去 AI 味

[English](README.en.md)

把 AI 写的文字改回**像人写的**——去掉 AI 腔、商务黑话、翻译腔、机械对仗、套话，同时**一个字都不误伤**你真正想表达的：事实、数字、术语、引文、作者的声口。中英文都是一等公民，可扩展到任何语言。

## 为什么用 human-tone

同类工具不少，但大多要么**只换词**（禁"赋能"就换"助力"，一换近义词就露馅），要么**改过头**（把公文的"予以处理"、真人有意的排比一起铲掉）。human-tone 不一样：

- **从规律去味**：抓 16 条跨语言"母模式"（评价拔高、机械对举、翻译腔……）并封堵变体，不是一张死词表。
- **精度优先、零误伤**：一套精度机制（语域门控、宾语消歧、密度阈值、白名单），拿不准就不动。eval 里 4 个真实案例，精度损伤为 0。
- **跨所有 agent、开箱即用**：一条命令装到 Claude Code、Codex、Cursor、Windsurf、Cline、Aider，以及国产的 Qoder、Trae、CodeBuddy。

## 精髓：通用层 + 语言包（两层）

AI 味分两层，判据也分两层——这是 human-tone 能"一套规律吃多种语言、加语言零改动"的关键：

- **通用层**（`skills/human-tone/references/*.md`）：**病的形状 + 怎么判 + 控制流**。母模式来自生成过程本身，跨语言复现，语言中立，只写一次，不含任何具体语言的词。
- **语言包**（`skills/human-tone/references/languages/<code>/`）：**这些病在本语言长什么样**——词表、语域带宽、白名单、翻译腔对照。每语言一个文件夹。

判据写一次，全语言受益；词表各归各家。**加一门语言 = 往 `languages/` 丢一个文件夹**（填 `pack.md` + `minimal.md` + `signals.json`），通用层一行不改。协议见 [`references/languages/README.md`](skills/human-tone/references/languages/README.md)。

## 安装

一条命令，不用 clone，装到你所有 agent（Claude Code、Codex、Cursor、Windsurf、Cline、Aider，以及国产 Qoder、Trae、CodeBuddy）：

```
npx github:seacen/human-tone
```

它做两件事：**①** 把 human-tone skill 装到你每个 agent；**②** 往每个 agent 的配置写一行"引用"那份规则（`@` 引用，绝不内联），让规则常驻上下文——你每次写东西都自动带着它去味。装完即生效。

> 为什么要常驻规则：skill 靠模型自主调用，而模型对"自己就能写的内容"不会主动去调它。规则常驻配置，才是让去味"自动发生"的可靠办法。

只想要 skill、自己按需调用？装 `npx skills add seacen/human-tone`，然后在 agent 里显式调 `human-tone` 走六步深度清洗。

## 安装选项

改动的文件都留 `.human-tone.bak` 备份，幂等，可撤：

```
npx github:seacen/human-tone --dry-run             # 只预览、不改动
npx github:seacen/human-tone --uninstall           # 一键撤销
npx github:seacen/human-tone --scope project       # 装到当前项目（默认 global）
npx github:seacen/human-tone --lang zh             # 只装中文规则（默认中英都装）
npx github:seacen/human-tone --agents claude,codex # 只装指定 agent
```

需要 Node（`npx` 本就依赖它；一份脚本 Mac / Windows 都能跑）。

## 目录

```
skills/human-tone/    skill 本体：SKILL.md + references/（通用层 + languages/ 语言包）+ scripts/
install.mjs           跨 agent 安装器
evals/                评分准则、三档对比、测试样本
docs/DESIGN.md        设计说明
```

## License

MIT —— 见 [LICENSE](LICENSE)。
