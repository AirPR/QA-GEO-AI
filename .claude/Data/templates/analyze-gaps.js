#!/usr/bin/env node
/**
 * Generic gap analyzer for any epic.
 * Usage: node analyze-gaps.js <epicId> [<epicJiraUrl>]
 *
 * Reads:
 *   .claude/Data/raw/specs/_stories-epic{ID}.json   (story → spec metadata)
 *   .claude/Data/raw/specs/<epicFolder>/*.md        (downloaded canonical specs)
 *   .claude/Data/output/csv/testcases - epic{ID}.csv (TC source)
 *
 * Writes:
 *   .claude/Data/output/gap-reports/gap-report-epic{ID}-YYYYMMDD.md
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

// ---------- Args & paths ----------
const EPIC_ID = process.argv[2];
if (!EPIC_ID) { console.error('Usage: node analyze-gaps.js <epicId> [<epicJiraUrl>]'); process.exit(1); }

const STORIES_PATH = path.resolve(`.claude/Data/raw/specs/_stories-epic${EPIC_ID}.json`);
if (!fs.existsSync(STORIES_PATH)) {
  console.error(`Stories metadata file not found: ${STORIES_PATH}`);
  console.error(`Generate it first by running the discovery step (Jira → spec URLs).`);
  process.exit(1);
}
const META = JSON.parse(fs.readFileSync(STORIES_PATH, 'utf8'));
const EPIC_URL = process.argv[3] || `${META.baseUrl}/browse/${META.epicKey}`;
const SPEC_DIR = path.resolve(`.claude/Data/raw/specs/${META.githubEpicFolder}`);
const CSV_PATH = path.resolve(`.claude/Data/output/csv/testcases - epic${EPIC_ID}.csv`);
const OUT_DIR = path.resolve('.claude/Data/output/gap-reports');
const today = new Date();
const yyyymmdd = `${today.getFullYear()}${String(today.getMonth()+1).padStart(2,'0')}${String(today.getDate()).padStart(2,'0')}`;
const ymd = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
const OUT_PATH = path.join(OUT_DIR, `gap-report-epic${EPIC_ID}-${yyyymmdd}.md`);

// ---------- .env loader (no leak) ----------
function loadEnv() {
  const envPath = path.resolve('.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
}
loadEnv();

// ---------- GitHub spec download ----------
function downloadSpec(specFile) {
  const out = path.join(SPEC_DIR, specFile);
  if (fs.existsSync(out) && fs.statSync(out).size > 0) return Promise.resolve(out);
  if (!process.env.GITHUB_TOKEN) {
    return Promise.reject(new Error('GITHUB_TOKEN missing — cannot fetch spec'));
  }
  const apiPath = `/repos/${META.githubRepo}/contents/${META.githubBasePath}/${META.githubEpicFolder}/${specFile}`;
  return new Promise((resolve, reject) => {
    const req = https.request({
      host: 'api.github.com',
      path: apiPath,
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.raw',
        'User-Agent': 'gap-analyzer'
      }
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${specFile}`));
        if (!fs.existsSync(SPEC_DIR)) fs.mkdirSync(SPEC_DIR, { recursive: true });
        fs.writeFileSync(out, body);
        resolve(out);
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function ensureSpecs() {
  const tasks = [];
  for (const key of META.specOrder) {
    const story = META.stories[key];
    if (!story.specFile) continue;
    tasks.push(downloadSpec(story.specFile).then(() => ({ key, ok: true })).catch(e => ({ key, ok: false, err: e.message })));
  }
  const results = await Promise.all(tasks);
  for (const r of results) if (!r.ok) console.error(`  ✗ ${r.key}: ${r.err}`);
  return results;
}

// ---------- AC parsers ----------
function extractAcSection(md) {
  const lines = md.split(/\r?\n/);
  let start = -1;
  // Allow optional suffix like "(BDD)", "(Functional)", etc.
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+(Acceptance Criteria|Crit[eè]res d['e]acceptation)(\s*\([^)]*\))?\s*$/i.test(lines[i])) { start = i + 1; break; }
  }
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) { end = i; break; }
  }
  return lines.slice(start, end).join('\n').trim();
}

function parseFormatA(section) {
  // ### AC{N}: Title  OR  ### AC{N} — Title  (colon, em-dash, en-dash, hyphen)
  const re = /^###\s+AC(\d+[a-z]?)\s*[:—–-]\s*(.+?)$/gm;
  const matches = [...section.matchAll(re)];
  if (!matches.length) return null;
  const acs = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const idNum = m[1];
    const title = m[2].trim();
    const startBody = m.index + m[0].length;
    const endBody = i + 1 < matches.length ? matches[i + 1].index : section.length;
    const body = section.slice(startBody, endBody).trim();
    acs.push({ id: `AC${idNum}`, title, body, summary: title });
  }
  return acs;
}

function parseFormatB(section) {
  const re = /^(\d+)\.\s+\*\*Given\*\*/gm;
  const starts = [];
  let m;
  while ((m = re.exec(section)) !== null) starts.push({ idx: m.index, num: m[1] });
  if (!starts.length) return null;
  const acs = [];
  for (let i = 0; i < starts.length; i++) {
    const startBody = starts[i].idx;
    const endBody = i + 1 < starts.length ? starts[i + 1].idx : section.length;
    const body = section.slice(startBody, endBody).trim();
    const thenMatch = body.match(/\*\*Then\*\*\s+([^\n,]+)/);
    const summary = thenMatch ? thenMatch[1].trim().replace(/[,.;:]$/, '') : body.slice(0, 80) + '...';
    acs.push({ id: `AC${starts[i].num}`, title: summary, body, summary });
  }
  return acs;
}

// Format C: numbered list with bold title — `1. **Title:**` or `1. **Title**:`
function parseFormatC(section) {
  const re = /^(\d+)\.\s+\*\*([^*\n]+?)\*\*[:.]?\s*/gm;
  const starts = [];
  let m;
  while ((m = re.exec(section)) !== null) {
    starts.push({ idx: m.index, headEnd: m.index + m[0].length, num: m[1], title: m[2].trim().replace(/[:.]+$/, '') });
  }
  if (!starts.length) return null;
  const acs = [];
  for (let i = 0; i < starts.length; i++) {
    const startBody = starts[i].headEnd;
    const endBody = i + 1 < starts.length ? starts[i + 1].idx : section.length;
    const body = section.slice(startBody, endBody).trim();
    acs.push({ id: `AC${starts[i].num}`, title: starts[i].title, body, summary: starts[i].title });
  }
  return acs;
}

// Format E: unnumbered Given/When/Then blocks separated by blank lines (no AC ID prefix)
// Number ACs sequentially: AC1, AC2, AC3, …
function parseFormatE(section) {
  // Find all start positions of `**Given**` at line start
  const re = /^\*\*Given\*\*/gm;
  const starts = [];
  let m;
  while ((m = re.exec(section)) !== null) starts.push(m.index);
  if (starts.length < 2) return null; // need at least 2 blocks to confirm pattern
  const acs = [];
  for (let i = 0; i < starts.length; i++) {
    const startBody = starts[i];
    const endBody = i + 1 < starts.length ? starts[i + 1] : section.length;
    const body = section.slice(startBody, endBody).trim();
    const tm = body.match(/\*\*Then\*\*\s+([^\n,]+)/);
    const summary = tm ? tm[1].trim().replace(/[,.;:]$/, '') : body.slice(0, 80) + '...';
    acs.push({ id: `AC${i + 1}`, title: summary, body, summary });
  }
  return acs;
}

// Format D: bold-line headers — `**AC{N} — Title**` followed by bullet G/W/T
function parseFormatD(section) {
  const re = /^\*\*AC(\d+[a-z]?)\s*[:—–-]\s*([^*\n]+?)\*\*\s*$/gm;
  const starts = [];
  let m;
  while ((m = re.exec(section)) !== null) {
    starts.push({ idx: m.index, headEnd: m.index + m[0].length, num: m[1], title: m[2].trim() });
  }
  if (!starts.length) return null;
  const acs = [];
  for (let i = 0; i < starts.length; i++) {
    const startBody = starts[i].headEnd;
    const endBody = i + 1 < starts.length ? starts[i + 1].idx : section.length;
    const body = section.slice(startBody, endBody).trim();
    acs.push({ id: `AC${starts[i].num}`, title: starts[i].title, body, summary: starts[i].title });
  }
  return acs;
}

function parseAcs(md) {
  const section = extractAcSection(md);
  if (!section) return { acs: [], format: 'no_section' };
  const a = parseFormatA(section);
  if (a && a.length > 0) return { acs: a, format: 'A' };
  const d = parseFormatD(section);
  if (d && d.length > 0) return { acs: d, format: 'D' };
  const b = parseFormatB(section);
  if (b && b.length > 0) return { acs: b, format: 'B' };
  const e = parseFormatE(section);
  if (e && e.length > 0) return { acs: e, format: 'E' };
  const c = parseFormatC(section);
  if (c && c.length > 0) return { acs: c, format: 'C' };
  return { acs: [], format: 'unparseable' };
}

// ---------- CSV parser ----------
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  // Auto-detect separator from header line: prefer the one with more occurrences
  const semis = (lines[0].match(/;/g) || []).length;
  const commas = (lines[0].match(/,/g) || []).length;
  const sep = semis > commas ? ';' : ',';
  const splitLine = (l) => {
    const out = []; let cur = ''; let inQ = false;
    for (let i = 0; i < l.length; i++) {
      const c = l[i];
      if (c === '"') {
        if (inQ && l[i + 1] === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (c === sep && !inQ) { out.push(cur); cur = ''; }
      else cur += c;
    }
    out.push(cur);
    return out;
  };
  const header = splitLine(lines[0]);
  const rows = lines.slice(1).map(l => {
    const parts = splitLine(l);
    const obj = {};
    header.forEach((h, i) => obj[h] = parts[i] || '');
    return obj;
  });
  return { header, rows };
}

function indexTcs(rows) {
  const tcMap = new Map();
  for (const r of rows) {
    const tn = r['Test name'] || '';
    const m = tn.match(/^(GEO-\d+)\s+TC(\d+)\b/);
    if (!m) continue;
    const story = m[1];
    const tcKey = `${story}-TC${m[2]}`;
    const acRef = r['QA Story task'] || '';
    // Find all AC references (a TC may cover multiple ACs)
    const acs = [...acRef.matchAll(/\bAC(\d+[a-z]?)\b/g)].map(x => `AC${x[1]}`);
    const uniqueAcs = [...new Set(acs)];
    if (!tcMap.has(tcKey)) tcMap.set(tcKey, { tcKey, story, name: tn, acs: uniqueAcs, acRef });
  }
  const byStory = {};
  for (const tc of tcMap.values()) {
    if (!byStory[tc.story]) byStory[tc.story] = [];
    byStory[tc.story].push(tc);
  }
  for (const k of Object.keys(byStory)) {
    byStory[k].sort((a, b) => parseInt(a.tcKey.split('-TC')[1]) - parseInt(b.tcKey.split('-TC')[1]));
  }
  return byStory;
}

// ---------- Gap analysis per story ----------
function analyseStory(storyKey, storyMeta, tcsForStory) {
  const result = {
    key: storyKey,
    title: storyMeta.title,
    jiraUrl: `${META.baseUrl}/browse/${storyKey}`,
    specFile: storyMeta.specFile || null,
    acs: [], tcs: tcsForStory || [],
    covered: [], uncovered: [], orphans: [],
    error: null, format: null,
  };
  if (storyMeta.noSpec) {
    result.error = `no_spec_link (${storyMeta.noSpec})`;
    // Orphan TCs still useful even without spec — list them as advisory
    for (const tc of (tcsForStory || [])) result.orphans.push({ ...tc, reason: 'story has no canonical spec' });
    return result;
  }
  const specPath = path.join(SPEC_DIR, storyMeta.specFile);
  if (!fs.existsSync(specPath)) { result.error = 'spec_missing'; return result; }
  const md = fs.readFileSync(specPath, 'utf8');
  const { acs, format } = parseAcs(md);
  result.format = format;
  if (!acs.length) { result.error = 'spec_unparseable'; return result; }
  result.acs = acs;

  const tcByAc = new Map();
  for (const tc of (tcsForStory || [])) {
    for (const acId of (tc.acs || [])) {
      if (!tcByAc.has(acId)) tcByAc.set(acId, []);
      tcByAc.get(acId).push(tc);
    }
  }
  for (const ac of acs) {
    const tcs = tcByAc.get(ac.id) || [];
    if (tcs.length) result.covered.push({ ac, tcs });
    else result.uncovered.push(ac);
  }
  const acIds = new Set(acs.map(a => a.id));
  for (const tc of (tcsForStory || [])) {
    if (!tc.acs || tc.acs.length === 0) {
      result.orphans.push({ ...tc, reason: 'no AC reference in QA Story task' });
    } else {
      const unknown = tc.acs.filter(a => !acIds.has(a));
      if (unknown.length === tc.acs.length) {
        result.orphans.push({ ...tc, reason: `references ${unknown.join(', ')} — not found in spec (max AC${acs.length})` });
      }
    }
  }
  return result;
}

// ---------- Report renderer ----------
function escapeMd(s) { return (s || '').replace(/\|/g, '\\|').replace(/\n/g, ' '); }

function specGitHubUrl(specFile) {
  return `https://github.com/${META.githubRepo}/blob/${META.githubBranch}/${META.githubBasePath}/${META.githubEpicFolder}/${specFile}`;
}

function renderReport(stories) {
  const lines = [];
  lines.push(`# Gap Report — Epic ${META.epicKey}`);
  lines.push('');
  lines.push(`**Run date:** ${ymd}`);
  lines.push(`**Epic:** [${META.epicKey} — ${META.epicTitle}](${EPIC_URL})`);
  lines.push(`**AC source:** specs GitHub \`${META.githubRepo}/${META.githubBasePath}/${META.githubEpicFolder}\``);
  lines.push(`**TC source:** \`.claude/Data/output/csv/testcases - epic${EPIC_ID}.csv\``);
  lines.push('');

  let totalAcs = 0, totalCov = 0, totalOrph = 0, errStories = 0;
  for (const s of stories) {
    if (s.error) { errStories++; totalOrph += s.orphans.length; continue; }
    totalAcs += s.acs.length;
    totalCov += s.covered.length;
    totalOrph += s.orphans.length;
  }
  const pct = totalAcs ? Math.round(100 * totalCov / totalAcs) : 0;
  lines.push('## Synthèse globale');
  lines.push('');
  lines.push('| Stories | ACs documentées | ACs couvertes | TCs orphelins | Stories en erreur |');
  lines.push('|---|---|---|---|---|');
  lines.push(`| ${stories.length} | ${totalAcs} | ${totalCov} (${pct}%) | ${totalOrph} | ${errStories} |`);
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const s of stories) {
    lines.push(`## Story ${s.key} — ${s.title}`);
    lines.push('');
    if (s.error) {
      lines.push(`**Coverage:** N/A — analyse incomplète (${s.tcs.length} TC(s) dans le CSV)`);
      lines.push(`[Jira](${s.jiraUrl})`);
      lines.push('');
      lines.push('### ❌ Story sans spec exploitable');
      lines.push(`- Erreur: \`${s.error}\``);
      if (s.specFile) lines.push(`- Spec attendue: \`${s.specFile}\``);
      if (s.orphans.length) {
        lines.push('');
        lines.push('### ⚠️ TCs présents dans le CSV (sans spec pour comparaison)');
        for (const o of s.orphans) lines.push(`- \`${o.tcKey}\` — "${escapeMd(o.name)}"`);
      }
      lines.push('');
      lines.push('---');
      lines.push('');
      continue;
    }

    const tcCount = s.tcs.length;
    const covCount = s.covered.length;
    const acCount = s.acs.length;
    lines.push(`**Coverage:** ${covCount}/${acCount} ACs couvertes — ${tcCount} TC(s) dans le CSV`);
    lines.push(`[Jira](${s.jiraUrl}) · [Spec GitHub](${specGitHubUrl(s.specFile)})`);
    lines.push('');

    lines.push('### ✅ ACs couvertes par des TCs');
    if (s.covered.length === 0) lines.push('*(aucune AC couverte)*');
    else for (const c of s.covered) lines.push(`- **${c.ac.id}** — ${escapeMd(c.ac.summary)} → ${c.tcs.map(t => `\`${t.tcKey}\``).join(', ')}`);
    lines.push('');

    lines.push('### 🆕 ACs non couvertes dans le CSV');
    if (s.uncovered.length === 0) {
      lines.push('*(toutes les ACs sont couvertes)*');
    } else {
      for (const ac of s.uncovered) {
        lines.push(`- **${ac.id}** — ${escapeMd(ac.summary)}`);
        lines.push('');
        // Body verbatim from spec, indented as a sub-block of the bullet
        const bodyLines = (ac.body || '').split(/\r?\n/).map(l => l.trimEnd());
        // Drop leading/trailing blank lines
        while (bodyLines.length && !bodyLines[0]) bodyLines.shift();
        while (bodyLines.length && !bodyLines[bodyLines.length - 1]) bodyLines.pop();
        if (bodyLines.length) {
          lines.push('  <details><summary>📄 Détail spec (verbatim)</summary>');
          lines.push('');
          for (const bl of bodyLines) lines.push('  ' + bl);
          lines.push('');
          lines.push('  </details>');
          lines.push('');
        }
      }
    }
    lines.push('');

    lines.push('### ⚠️ TCs orphelins dans le CSV');
    if (s.orphans.length === 0) lines.push('*(aucun TC orphelin)*');
    else for (const o of s.orphans) lines.push(`- \`${o.tcKey}\` — "${escapeMd(o.name)}" *(${o.reason})*`);
    lines.push('');

    lines.push('### ❌ Stories sans spec exploitable');
    lines.push('*(N/A pour cette story — spec lue avec succès)*');
    lines.push('');
    lines.push('---');
    lines.push('');
  }
  return lines.join('\n');
}

// ---------- Main ----------
async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`→ Downloading missing specs for ${META.epicKey} (${META.githubEpicFolder})...`);
  await ensureSpecs();

  if (!fs.existsSync(CSV_PATH)) { console.error(`CSV not found: ${CSV_PATH}`); process.exit(1); }
  const csvText = fs.readFileSync(CSV_PATH, 'utf8').replace(/^﻿/, '');
  const { rows } = parseCsv(csvText);
  const tcsByStory = indexTcs(rows);

  const stories = [];
  for (const key of META.specOrder) {
    const meta = META.stories[key];
    const tcs = tcsByStory[key] || [];
    stories.push(analyseStory(key, meta, tcs));
  }

  // Detect TCs in CSV referencing stories not declared in metadata
  const declared = new Set(META.specOrder);
  for (const storyKey of Object.keys(tcsByStory)) {
    if (!declared.has(storyKey)) {
      console.warn(`⚠ CSV references story ${storyKey} but it's not in _stories-epic${EPIC_ID}.json`);
    }
  }

  const md = renderReport(stories);
  fs.writeFileSync(OUT_PATH, md, 'utf8');

  let totalAcs = 0, totalCov = 0, totalOrph = 0, errors = 0;
  for (const s of stories) {
    if (s.error) { errors++; totalOrph += s.orphans.length; continue; }
    totalAcs += s.acs.length;
    totalCov += s.covered.length;
    totalOrph += s.orphans.length;
  }
  const pct = totalAcs ? Math.round(100 * totalCov / totalAcs) : 0;
  console.log(`\nStories analysées : ${stories.length}`);
  console.log(`ACs documentées   : ${totalAcs}`);
  console.log(`Couverture        : ${totalCov}/${totalAcs} (${pct}%)`);
  console.log(`TCs orphelins     : ${totalOrph}`);
  console.log(`Stories en erreur : ${errors}`);
  console.log(`\nRapport écrit : ${path.relative(process.cwd(), OUT_PATH)}\n`);

  for (const s of stories) {
    const status = s.error
      ? `[ERR ${s.error}] (${s.tcs.length} TCs)`
      : `${s.covered.length}/${s.acs.length} ACs couvertes — ${s.tcs.length} TC(s) — ${s.orphans.length} orph — fmt:${s.format}`;
    console.log(`  ${s.key.padEnd(8)} ${status}`);
  }
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
