#!/usr/bin/env node
// check.mjs — human-tone 通用信号复扫器
//
// 定位:只报告、不改写。给一段稿子跑一遍每个语言包声明的表层正则信号,
// 把可疑处的行号 / 母模式 / 命中文本列出来,供模型改完后对照。
//
// 为什么这样设计:
//  - 通用化。代码里不写任何一门语言的触发词或正则字面量。全部信号来自
//    skill/references/languages/<code>/signals.json。加一门语言 = 丢一个文件夹,
//    这个脚本一行都不用改。
//  - 零依赖、Node≥18。用内置 fs / path,不引第三方。
//  - 命中 ≠ 该改。正则只能抓表层形状,抓不到语域、密度、真人声口。所以脚本
//    永远只是提示;判断权在模型,冲突以模型为准。
//
// 用法:node check.mjs <file> [--lang code]
//   <file>        要检查的文本文件
//   --lang code   跳过自动判语言,强制用某个语言包(code = languages/ 下的文件夹名)

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 语言包根目录。默认相对脚本定位到 references/languages/;
// 留一个环境变量口子(HUMAN_TONE_LANGS_DIR)方便在别处跑 fixture 测试,不改默认行为。
const LANGS_DIR =
  process.env.HUMAN_TONE_LANGS_DIR || join(__dirname, '..', 'references', 'languages');

// ---- 参数解析 ---------------------------------------------------------------

function parseArgs(argv) {
  let file = null;
  let lang = null;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--lang') {
      lang = argv[++i] || null;
    } else if (a.startsWith('--lang=')) {
      lang = a.slice('--lang='.length);
    } else if (!a.startsWith('-') && file === null) {
      file = a;
    }
  }
  return { file, lang };
}

// ---- 加载语言包 -------------------------------------------------------------
// 枚举 languages/ 下每个子目录,读它的 signals.json。任何一个包坏了(缺文件 /
// JSON 语法错 / 正则编不出)都只跳过它并提示,不让整个脚本崩掉——一门语言的
// 数据出问题,不该拖垮其它语言的复扫。

function loadPacks(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    console.error(`无法读取语言包目录:${dir}\n  ${e.message}`);
    return [];
  }

  const packs = [];
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const code = ent.name;
    const path = join(dir, code, 'signals.json');
    let raw;
    try {
      raw = readFileSync(path, 'utf8');
    } catch {
      // 该语言目录里没有 signals.json,跳过——可能只有 pack.md 还没配机器信号。
      continue;
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error(`跳过 ${code}:signals.json 解析失败 — ${e.message}`);
      continue;
    }

    // 预编译正则,坏的信号剔掉并提示,好的照跑。
    const signals = [];
    for (const s of data.signals || []) {
      try {
        signals.push({
          id: s.id || '(无 ID)',
          label: s.label || '',
          re: new RegExp(s.regex, s.flags && s.flags.includes('g') ? s.flags : (s.flags || '') + 'g'),
        });
      } catch (e) {
        console.error(`跳过 ${code} 的信号 ${s.id || '?'}:正则无效 — ${e.message}`);
      }
    }

    packs.push({
      lang: data.lang || code,
      code,
      displayName: data.displayName || code,
      detect: data.detect || {},
      signals,
    });
  }
  return packs;
}

// ---- 判语言 -----------------------------------------------------------------
// 按每个包自己声明的 detect 规则给输入打分,选分最高且达标的那个。
// 支持的判据(都可选,取交集):
//   cjkRatioMin   — CJK 字占非空白字的最低比例
//   latinRatioMin — 拉丁字母占非空白字的最低比例
//   functionWords — 该语言的高频虚词,命中越多越像这门语言(加权,不作硬门槛)
// 机制里不写死任何语言名,阈值和词表全从包里读。

function ratios(text) {
  const nonSpace = text.replace(/\s+/g, '').length || 1;
  const cjk = (text.match(/[一-鿿]/g) || []).length;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  return { cjkRatio: cjk / nonSpace, latinRatio: latin / nonSpace };
}

function scorePack(pack, text, r) {
  const d = pack.detect;
  let meets = true;
  let score = 0;

  if (typeof d.cjkRatioMin === 'number') {
    if (r.cjkRatio >= d.cjkRatioMin) score += r.cjkRatio;
    else meets = false;
  }
  if (typeof d.latinRatioMin === 'number') {
    if (r.latinRatio >= d.latinRatioMin) score += r.latinRatio;
    else meets = false;
  }
  if (Array.isArray(d.functionWords) && d.functionWords.length) {
    let hits = 0;
    for (const w of d.functionWords) {
      // 逐词数出现次数;虚词是判语言的软证据,权重压得很低。
      let idx = 0;
      while ((idx = text.indexOf(w, idx)) !== -1) { hits++; idx += w.length; }
    }
    score += hits * 0.01;
  }
  return { meets, score };
}

function detectLang(packs, text) {
  const r = ratios(text);
  let best = null;
  for (const p of packs) {
    const { meets, score } = scorePack(p, text, r);
    if (!meets) continue;
    if (!best || score > best.score) best = { pack: p, score };
  }
  return best ? best.pack : null;
}

// ---- 跑信号 -----------------------------------------------------------------

function lineOf(text, index) {
  let line = 1;
  for (let i = 0; i < index && i < text.length; i++) {
    if (text[i] === '\n') line++;
  }
  return line;
}

function runSignals(pack, text) {
  const hits = [];
  for (const sig of pack.signals) {
    sig.re.lastIndex = 0;
    let m;
    while ((m = sig.re.exec(text)) !== null) {
      hits.push({
        line: lineOf(text, m.index),
        id: sig.id,
        label: sig.label,
        text: m[0],
      });
      if (m.index === sig.re.lastIndex) sig.re.lastIndex++; // 防零宽匹配死循环
    }
  }
  hits.sort((a, b) => a.line - b.line);
  return hits;
}

// ---- 主流程 -----------------------------------------------------------------

function main() {
  const { file, lang } = parseArgs(process.argv.slice(2));

  if (!file) {
    console.error('用法:node check.mjs <file> [--lang code]');
    process.exit(2);
  }

  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch (e) {
    console.error(`读不到文件:${file}\n  ${e.message}`);
    process.exit(2);
  }

  const packs = loadPacks(LANGS_DIR);
  if (!packs.length) {
    console.error('没找到任何语言包(languages/*/signals.json)。');
    process.exit(2);
  }

  // 选语言:--lang 强制优先;否则按 detect 打分。
  let pack = null;
  if (lang) {
    pack = packs.find((p) => p.code === lang || p.lang === lang) || null;
    if (!pack) {
      console.error(`--lang ${lang} 没有对应的语言包。已有:${packs.map((p) => p.code).join(', ')}`);
      process.exit(2);
    }
  } else {
    pack = detectLang(packs, text);
  }

  if (!pack) {
    console.log('判不出属于哪个已支持语言 — 跳过信号复扫。');
    console.log('(可用 --lang 指定,或先给该语言建 languages/<code>/signals.json。)');
    return;
  }

  const hits = runSignals(pack, text);

  console.log(`语言:${pack.displayName}(${pack.code}) · 信号 ${pack.signals.length} 条 · 命中 ${hits.length} 处`);
  console.log('');
  if (!hits.length) {
    console.log('没有信号命中。注意:脚本只抓表层形状,不等于稿子干净。');
  } else {
    for (const h of hits) {
      const label = h.label ? ` ${h.label}` : '';
      console.log(`  行 ${h.line}\t[${h.id}${label}]\t"${h.text}"`);
    }
  }

  console.log('');
  console.log('———');
  console.log('只报告,不改写。命中 ≠ 该改:正则抓不到语域、密度和真人声口。');
  console.log('判断权在模型,与脚本冲突以模型为准;若因脚本提示改了什么,须留痕说明。');
}

main();
