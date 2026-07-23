<div align="center">
<!-- 预留 logo 位置 -->
</div>

# human-tone · 去 AI 味

> **把 AI 写的文字改回像人写的。** 去掉 AI 腔、翻译腔、套话,但不动你真正要表达的——事实、数字、术语,还有作者的语气。中英文都地道,也能扩到任何语言。
>
> **Make AI-written text read like a person wrote it.** Strip the AI tone, translationese, and boilerplate while keeping what you meant — facts, numbers, terms, the author's voice. Native in Chinese and English, ready for any language.

**🌐 Language:** **中文（本页）** · [**English**](README.en.md)

[![version](https://img.shields.io/badge/version-1.0.1-2ea44f)](https://github.com/seacen/human-tone/releases)
&nbsp;[![license](https://img.shields.io/github/license/seacen/human-tone?color=blue)](LICENSE)
&nbsp;![works with](https://img.shields.io/badge/works_with-any_agent-8A2BE2)

---

## 为什么用 human-tone

去 AI 味的工具不少,常见两种毛病:一种**只换词**,禁了"赋能"就换成"助力",换个近义词就露馅;一种**改过头**,把公文里正常的"予以处理"、作者特意写的排比也一起铲了。human-tone 的做法不一样:

- **抓规律,不抓词表。** 盯的是 16 类跨语言的通病(评价拔高、机械对仗、翻译腔……),每一类都把变体一并堵死,换个近义词也躲不过去。
- **中英文都地道,也能扩到任何语言。** 中文的翻译腔、英文的 GPT 腔,各治各的病;想支持新语言,加一个语言文件夹就行,核心规则不用碰。多数工具只盯着英文,human-tone 一开始就是为多语言设计的。
- **宁可漏,不误伤。** 先看这段是什么文体再决定动不动:公文的"予以处理"、学术的"进行分析"、作者有意的排比,都留着;一个词该删该留,看它周围有没有成堆、删了会不会丢意思;拿不准,就不改。
- **有出处。** 减法的章法来自奥威尔《政治与英语》,配《The Elements of Style》;中文的翻译腔病症来自余光中《怎样改进英式中文》,配思果《翻译研究》《翻译新究》;哪种文体该不该改,看 Biber 和 Halliday 研究文体差异的那套理论。
- **改完仍像人写。** 要是删到通篇发平、句子长短一个样,这本身就算改坏了,会退回去;改完自己再扫一遍残留,还有脚本按规则复扫兜底,拿终稿和原文两头核对,不漏一条也不多编一条。
- **绕开别人踩过的坑。** 不做写作老师(只留"什么时候别碰"的护栏),也不一刀切(有的工具把副词删光、破折号全禁,反而改出新的 AI 味)。
- **有评测。** 自带两套样本:一套是该改的,量它改没改干净;一套是一个字都不该动的,量它有没有误伤。改了规则会不会引起回退,跑一遍就知道。

## 它怎么运作:通用规则 + 语言包

AI 味分两层,规则也照着分两层。加一门新语言,核心逻辑一行都不用改。

- **通用层**——所有语言共通的毛病,以及判断该不该改的标准(像"评价拔高""机械对仗")。这些是 AI 写东西时的通病,换种语言照样犯,所以只写一次,里面不掺任何某一门语言的具体词。
- **语言包**——同一个毛病落到某门语言里具体长什么样:它的高频 AI 词、什么文体算规范、哪些词碰不得、翻译腔对照表。一门语言一个文件夹。

判断标准写一次,所有语言共用;具体的词各归各的语言包。**加一门语言,就是往 `languages/` 放一个文件夹**(填 `pack.md`、`minimal.md`、`signals.json` 三个文件),通用层不动。怎么加,见[语言包协议](skills/human-tone/references/languages/README.md)。

## 安装

一条命令,不用先 clone,装到你所有 agent(Claude Code、Codex、Cursor、Windsurf、Cline、Aider,以及国产的 Qoder、Trae、CodeBuddy):

```
npx github:seacen/human-tone
```

它做两件事:把 human-tone skill 装进你每个 agent;再往每个 agent 的配置里写一行,引用那份规则(只写引用,不把内容贴进去)。这样规则一直在上下文里,你写东西时它自动帮你去味。装完就生效。

> 为什么要让规则常驻:skill 得靠模型自己想起来调用,而模型对"自己就能写"的内容不会主动去调。把规则放进配置常驻,去味才会自动发生。

只想要 skill、自己需要时再调?装 `npx skills add seacen/human-tone`,然后在 agent 里点名调 `human-tone`,走一遍深度清洗。

### Claude Code 插件

也可以当插件装,跟着 marketplace 一起更新:

```
/plugin marketplace add seacen/human-tone
/plugin install human-tone@human-tone
```

### Claude 桌面版 / 网页版

到 [Releases](https://github.com/seacen/human-tone/releases) 下载 `human-tone.zip`,在 Claude 设置的 Skills 里上传。

## 安装选项

改动过的文件都留一份 `.human-tone.bak` 备份,重复跑不会重复写,随时能撤:

```
npx github:seacen/human-tone --dry-run             # 只看会改什么,不动手
npx github:seacen/human-tone --uninstall           # 全部撤掉
npx github:seacen/human-tone --scope project       # 装进当前项目,而非全局(默认全局)
npx github:seacen/human-tone --lang zh             # 只装中文规则(默认中英都装)
npx github:seacen/human-tone --agents claude,codex # 只装指定的 agent
```

需要 Node(`npx` 本来就靠它;一份脚本 Mac 和 Windows 都能跑)。

## 目录

```
skills/human-tone/   skill 本体:SKILL.md + references/(通用层 + languages/ 语言包)+ scripts/
install.mjs          跨 agent 安装器
.claude-plugin/      Claude Code 插件与 marketplace 清单
evals/               评测:评分准则、对比设计、测试样本
docs/DESIGN.md       设计说明
```

## License

MIT,见 [LICENSE](LICENSE)。
