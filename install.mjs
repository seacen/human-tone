#!/usr/bin/env node
// human-tone installer — reference-based, cross-agent, cross-platform (macOS / Windows / Linux).
//
// Two idempotent steps, dry-run by default:
//   1. Install the human-tone SKILL to every agent via the `skills` CLI (`npx skills add …`).
//      It places the skill in ~/.agents/skills/human-tone/ and syncs it into each agent's own
//      skills dir, and handles agents with quirky formats (e.g. Trae only accepts the
//      npx-skills layout). We do NOT reimplement per-agent skill copying.
//   2. Add a one-line REFERENCE to the skill's per-language rule file
//      (references/languages/<lang>/minimal.md) into each agent's instruction file — the rules
//      then sit in context every turn. Referenced, never inlined: one source of truth, tidy
//      configs. Import-capable agents (Claude Code, CodeBuddy) load it via `@path`; the rest
//      read it because the standing line tells them to.
//
// Why standing rules and not just the skill: a model won't invoke a finishing-pass skill for
// prose it writes itself (~0% on content tasks, any agent), so the rules must be standing context.
// Why Node: `npx skills` already requires Node, and one Node script runs on macOS and Windows
// alike (a shell script or .bat cannot). Zero dependencies — built-in modules only.
//
//   node install.mjs                 # dry-run: detect agents, print the plan
//   node install.mjs --write         # apply
//   node install.mjs --scope project|global|both   # default: global
//   node install.mjs --lang zh|en|both              # default: both
//   node install.mjs --agents claude,codex          # limit to specific agents
//   node install.mjs --source seacen/human-tone     # skill source for `npx skills add`
//   node install.mjs --skip-skill                   # only write config references
//   node install.mjs --uninstall --write            # remove the managed reference block
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join, dirname, delimiter } from 'node:path';

const HOME = homedir();
const BEGIN = '<!-- HUMAN-TONE:BEGIN (managed by human-tone installer — do not edit between the markers) -->';
const END = '<!-- HUMAN-TONE:END -->';
const norm = (p) => p.replace(/\\/g, '/'); // forward slashes so @paths work on Windows too
// Where `npx skills add` puts the skill; the reference lines point at each language's minimal.md.
const skillRef = (lang) => norm(join(HOME, '.agents', 'skills', 'human-tone', 'references', 'languages', lang, 'minimal.md'));

const A = process.argv.slice(2);
const has = (f) => A.includes(f);
const val = (f, d) => { const i = A.indexOf(f); return i >= 0 && A[i + 1] && !A[i + 1].startsWith('--') ? A[i + 1] : d; };
const WRITE = has('--write'), UNINSTALL = has('--uninstall'), SKIP_SKILL = has('--skip-skill');
const SCOPE = val('--scope', 'global'), LANG = val('--lang', 'both'), ONLY = val('--agents', 'auto');
const SOURCE = val('--source', 'seacen/human-tone'), PROJECT_DIR = val('--project-dir', process.cwd());
const tilde = (p) => p.startsWith('~') ? join(HOME, p.slice(1)) : p;
const langs = LANG === 'both' ? ['zh', 'en'] : [LANG];

function refBlock() {
  const refs = langs.map((l) => `@${skillRef(l)}`).join('\n');
  return `${BEGIN}
## Human Tone — strip AI flavor from prose you write

When you produce prose a person will read or publish (articles, marketing/social copy, slide/PPT text, emails, docs, posts), apply the rules referenced below as a finishing pass BEFORE delivering: remove the AI-flavor patterns while keeping every fact, number, name, quote, and the author's voice. Skip pure code, data, and mechanical transforms.

${refs}
${END}
`;
}
const mdcBlock = () => `---\ndescription: Strip AI flavor from prose before delivering\nalwaysApply: true\n---\n${refBlock()}`;

function upsert(file, content) {
  const cur = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const b = cur.indexOf(BEGIN);
  if (b >= 0) {
    const e = cur.indexOf(END, b); const end = e >= 0 ? e + END.length : cur.length;
    const out = cur.slice(0, b) + content.trim() + cur.slice(end);
    return { file, before: cur, after: out.endsWith('\n') ? out : out + '\n', existed: cur !== '' };
  }
  const sep = cur ? (cur.endsWith('\n\n') ? '' : cur.endsWith('\n') ? '\n' : '\n\n') : '';
  return { file, before: cur, after: cur + sep + content, existed: cur !== '' };
}
function removeFrom(file) {
  if (!existsSync(file)) return null;
  const cur = readFileSync(file, 'utf8'); const b = cur.indexOf(BEGIN);
  if (b < 0) return null;
  const e = cur.indexOf(END, b); const end = e >= 0 ? e + END.length : cur.length;
  return { file, before: cur, after: (cur.slice(0, b) + cur.slice(end)).replace(/\n{3,}/g, '\n\n').replace(/^\n+/, ''), existed: true };
}
function aiderUpsert(file) {
  const tag = '# human-tone', cur = existsSync(file) ? readFileSync(file, 'utf8') : '';
  if (cur.includes(tag)) return { file, before: cur, after: cur, existed: true, noop: true };
  const entries = langs.map((l) => `  - ${skillRef(l)}  ${tag}\n`).join('');
  let after;
  if (/^read:\s*\n\s*- /m.test(cur) || /^read:\s*$/m.test(cur)) after = cur.replace(/^read:\s*\n?/m, (m) => (m.endsWith('\n') ? m : m + '\n') + entries);
  else after = (cur && !cur.endsWith('\n') ? cur + '\n' : cur) + `read:\n${entries}`;
  return { file, before: cur, after, existed: cur !== '' };
}
function aiderRemove(file) {
  if (!existsSync(file)) return null;
  const cur = readFileSync(file, 'utf8'); if (!cur.includes('# human-tone')) return null;
  return { file, before: cur, after: cur.split('\n').filter((l) => !l.includes('# human-tone')).join('\n'), existed: true };
}

const onPath = (b) => (process.env.PATH || '').split(delimiter).some((d) => d && (existsSync(join(d, b)) || existsSync(join(d, b + '.exe')) || existsSync(join(d, b + '.cmd'))));
const dirp = (p) => existsSync(tilde(p));
const AGENTS = [
  { id: 'claude', name: 'Claude Code', detect: () => dirp('~/.claude') || onPath('claude'),
    g: { file: '~/.claude/CLAUDE.md', mode: 'block' }, p: (r) => ({ file: join(r, 'CLAUDE.md'), mode: 'block' }) },
  { id: 'codex', name: 'OpenAI Codex', detect: () => dirp('~/.codex') || onPath('codex'),
    g: { file: '~/.codex/AGENTS.md', mode: 'block' }, p: (r) => ({ file: join(r, 'AGENTS.md'), mode: 'block' }) },
  { id: 'cursor', name: 'Cursor', detect: () => dirp('~/.cursor') || onPath('cursor'),
    g: null, p: (r) => ({ file: join(r, '.cursor', 'rules', 'human-tone.mdc'), mode: 'mdc' }) },
  { id: 'windsurf', name: 'Windsurf', detect: () => dirp('~/.codeium/windsurf'),
    g: { file: '~/.codeium/windsurf/memories/global_rules.md', mode: 'block' }, p: (r) => ({ file: join(r, '.windsurf', 'rules', 'human-tone.md'), mode: 'block' }) },
  { id: 'cline', name: 'Cline', detect: () => dirp('~/Documents/Cline') || dirp('~/.cline'),
    g: { file: '~/Documents/Cline/Rules/human-tone.md', mode: 'block' }, p: (r) => ({ file: join(r, '.clinerules', 'human-tone.md'), mode: 'block' }) },
  { id: 'aider', name: 'Aider', detect: () => onPath('aider') || dirp('~/.aider.conf.yml'),
    g: { file: '~/.aider.conf.yml', mode: 'aider' }, p: (r) => ({ file: join(r, '.aider.conf.yml'), mode: 'aider' }) },
  { id: 'qoder', name: 'Qoder (Alibaba)', detect: () => dirp('~/.qoder'),
    g: null, p: (r) => ({ file: join(r, '.qoder', 'rules', 'human-tone.md'), mode: 'block' }) },
  { id: 'trae', name: 'Trae (ByteDance)', detect: () => dirp('~/.trae'),
    g: { file: '~/.trae/user_rules/user_rules.md', mode: 'block' }, p: (r) => ({ file: join(r, '.trae', 'rules', 'human-tone.md'), mode: 'block' }) },
  { id: 'codebuddy', name: 'CodeBuddy / WorkBuddy (Tencent)', detect: () => dirp('~/.codebuddy') || dirp('~/.workbuddy'),
    g: { file: '~/.codebuddy/CODEBUDDY.md', mode: 'block' }, p: (r) => ({ file: join(r, '.codebuddy', 'rules', 'human-tone', 'RULE.mdc'), mode: 'mdc' }) },
  { id: 'agents', name: 'AGENTS.md (portable: Gemini/Zed/Warp/Copilot/opencode…)', detect: () => true,
    g: null, p: (r) => ({ file: join(r, 'AGENTS.md'), mode: 'block' }) },
];

function planFor(t) {
  const file = tilde(t.file);
  if (UNINSTALL) return t.mode === 'aider' ? aiderRemove(file) : removeFrom(file);
  if (t.mode === 'aider') return aiderUpsert(file);
  return upsert(file, t.mode === 'mdc' ? mdcBlock() : refBlock());
}
function backupAndWrite(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  if (existsSync(file)) copyFileSync(file, file + '.human-tone.bak');
  writeFileSync(file, content, 'utf8');
}

const wanted = ONLY === 'auto' ? null : new Set(ONLY.split(',').map((s) => s.trim()));
const detected = AGENTS.filter((a) => (wanted ? wanted.has(a.id) : a.detect()));
const scopes = SCOPE === 'both' ? ['global', 'project'] : [SCOPE];
console.log(`human-tone installer — ${UNINSTALL ? 'UNINSTALL' : 'install'} · scope=${SCOPE} · lang=${LANG} · ${WRITE ? 'APPLYING' : 'DRY-RUN (add --write to apply)'}`);
console.log(`detected: ${detected.filter((a) => a.id !== 'agents').map((a) => a.name).join(', ') || '(none)'}\n`);

if (!UNINSTALL && !SKIP_SKILL) {
  const cmd = `npx skills add ${SOURCE} --all${SCOPE === 'project' ? '' : ' -g'}`;
  console.log(`[1/2] install the skill on every agent (delegated to npx skills):\n      ${cmd}`);
  if (WRITE) { try { execSync(cmd, { stdio: 'inherit' }); } catch { console.log(`      ! auto-run failed (needs network / may prompt). Run it once by hand: ${cmd}`); } }
  else console.log('      (dry-run: not executed)');
  console.log('');
}

console.log(`[2/2] write the rules reference into each agent's config (referenced, never inlined):`);
const changes = []; const seen = new Set();
for (const a of detected) for (const scope of scopes) {
  const t = scope === 'global' ? a.g : a.p(PROJECT_DIR);
  if (!t) { if (scope === 'global' && (a.id === 'cursor' || a.id === 'qoder')) console.log(`  • ${a.name} [global] no global rules file (skills + project AGENTS.md cover it)`); continue; }
  const file = tilde(t.file); const key = file + t.mode; if (seen.has(key)) continue; seen.add(key);
  const p = planFor(t); if (!p) continue;
  if (p.noop || p.before === p.after) { console.log(`  • ${a.name} [${scope}] ${p.file} — already installed / no change`); continue; }
  changes.push({ ...p, agent: a.name, scope });
  console.log(`  • ${a.name} [${scope}] ${p.file} — ${UNINSTALL ? 'remove' : p.existed ? 'update block' : 'create/append'}`);
}

if (!changes.length) { console.log('\nNothing to change in configs.'); process.exit(0); }
if (!WRITE) { console.log(`\nThat's the plan. Re-run with --write to apply. References point at ${skillRef('<lang>')} (placed by npx skills add).`); process.exit(0); }
for (const c of changes) { backupAndWrite(c.file, c.after); console.log(`  ✔ ${c.file}`); }
console.log(`\nDone. Touched files were backed up to *.human-tone.bak. Undo: node install.mjs --uninstall --write --scope ${SCOPE}`);
