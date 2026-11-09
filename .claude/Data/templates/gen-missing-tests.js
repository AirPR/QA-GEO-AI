#!/usr/bin/env node
/**
 * Generate a CSV of missing test cases from a gap report.
 * Usage: node gen-missing-tests.js <epicId>
 *
 * Rules:
 *   - Functional AC → Functional TC
 *   - NFR AC: keep ONLY Performance, skip the rest (security, regression, multi-tenant, …)
 *   - One TC per uncovered AC, 3 lines per TC (Given/When/Then), Cucumber-style
 *
 * Input:
 *   .claude/Data/raw/specs/_stories-epic{ID}.json      (story metadata)
 *   .claude/Data/raw/specs/<epicFolder>/*.md           (canonical specs)
 *   .claude/Data/output/csv/testcases - epic{ID}.csv   (existing TCs → continuation numbering)
 *
 * Output:
 *   .claude/Data/output/gap-reports/gap-csv/missing-tests-epic{ID}-YYYYMMDD.csv
 */
const fs = require('fs');
const path = require('path');

const EPIC_ID = process.argv[2];
if (!EPIC_ID) { console.error('Usage: node gen-missing-tests.js <epicId>'); process.exit(1); }

const STORIES_PATH = path.resolve(`.claude/Data/raw/specs/_stories-epic${EPIC_ID}.json`);
const META = JSON.parse(fs.readFileSync(STORIES_PATH, 'utf8'));
const SPEC_DIR = path.resolve(`.claude/Data/raw/specs/${META.githubEpicFolder}`);
const CSV_PATH = path.resolve(`.claude/Data/output/csv/testcases - epic${EPIC_ID}.csv`);
const OUT_DIR = path.resolve('.claude/Data/output/gap-reports/gap-csv');
const today = new Date();
const yyyymmdd = `${today.getFullYear()}${String(today.getMonth()+1).padStart(2,'0')}${String(today.getDate()).padStart(2,'0')}`;
const OUT_PATH = path.join(OUT_DIR, `missing-tests-epic${EPIC_ID}-${yyyymmdd}.csv`);

// ---------- Reuse parsers from analyze-gaps ----------
function extractAcSection(md) {
  const lines = md.split(/\r?\n/);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+(Acceptance Criteria|Crit[eè]res d['e]acceptation)\s*$/i.test(lines[i])) { start = i + 1; break; }
  }
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start; i < lines.length; i++) if (/^##\s+/.test(lines[i])) { end = i; break; }
  return lines.slice(start, end).join('\n').trim();
}
function parseFormatA(section) {
  const re = /^###\s+AC(\d+[a-z]?)\s*:\s*(.+?)$/gm;
  const ms = [...section.matchAll(re)];
  if (!ms.length) return null;
  return ms.map((m, i) => {
    const start = m.index + m[0].length;
    const end = i + 1 < ms.length ? ms[i + 1].index : section.length;
    return { id: `AC${m[1]}`, title: m[2].trim(), body: section.slice(start, end).trim() };
  });
}
function parseFormatB(section) {
  const re = /^(\d+)\.\s+\*\*Given\*\*/gm;
  const starts = []; let m;
  while ((m = re.exec(section)) !== null) starts.push({ idx: m.index, num: m[1] });
  if (!starts.length) return null;
  return starts.map((s, i) => {
    const end = i + 1 < starts.length ? starts[i + 1].idx : section.length;
    const body = section.slice(s.idx, end).trim();
    const tm = body.match(/\*\*Then\*\*\s+([^\n,]+)/);
    const title = tm ? tm[1].trim().replace(/[,.;:]$/, '') : body.slice(0, 80) + '...';
    return { id: `AC${s.num}`, title, body };
  });
}
function parseFormatC(section) {
  const re = /^(\d+)\.\s+\*\*([^*\n]+?)\*\*[:.]?\s*/gm;
  const starts = []; let m;
  while ((m = re.exec(section)) !== null) starts.push({ idx: m.index, headEnd: m.index + m[0].length, num: m[1], title: m[2].trim().replace(/[:.]+$/, '') });
  if (!starts.length) return null;
  return starts.map((s, i) => {
    const end = i + 1 < starts.length ? starts[i + 1].idx : section.length;
    return { id: `AC${s.num}`, title: s.title, body: section.slice(s.headEnd, end).trim() };
  });
}
function parseAcs(md) {
  const sec = extractAcSection(md);
  if (!sec) return [];
  return parseFormatA(sec) || parseFormatB(sec) || parseFormatC(sec) || [];
}

// ---------- CSV reader (existing TCs → max TC num + AC mapping) ----------
function readExistingTcs() {
  if (!fs.existsSync(CSV_PATH)) return { maxByStory: {}, coveredAcs: new Set() };
  const text = fs.readFileSync(CSV_PATH, 'utf8').replace(/^﻿/, '');
  const lines = text.split(/\r?\n/).filter(Boolean);
  const sep = (lines[0].match(/;/g) || []).length > (lines[0].match(/,/g) || []).length ? ';' : ',';
  const splitLine = (l) => { const o=[]; let c='',q=false; for (let i=0;i<l.length;i++){const ch=l[i]; if(ch==='"'){if(q&&l[i+1]==='"'){c+='"';i++}else q=!q}else if(ch===sep&&!q){o.push(c);c=''}else c+=ch} o.push(c); return o; };
  const header = splitLine(lines[0]);
  const tnIdx = header.indexOf('Test name');
  const stIdx = header.indexOf('QA Story task');
  const maxByStory = {};
  const coveredAcs = new Set();
  for (let i = 1; i < lines.length; i++) {
    const p = splitLine(lines[i]);
    const tn = p[tnIdx] || '';
    const tm = tn.match(/^(GEO-\d+)\s+TC(\d+)/);
    if (!tm) continue;
    const story = tm[1], num = parseInt(tm[2]);
    if (!maxByStory[story] || num > maxByStory[story]) maxByStory[story] = num;
    const acRef = p[stIdx] || '';
    for (const m of acRef.matchAll(/\bAC(\d+[a-z]?)\b/g)) coveredAcs.add(`${story}:AC${m[1]}`);
  }
  return { maxByStory, coveredAcs };
}

// ---------- Classification ----------
function classifyAc(ac) {
  const text = `${ac.title}\n${ac.body}`.toLowerCase();
  const isNfr = /\bnfr-?\b|nfr[-_ ]?bi\d+/i.test(`${ac.title} ${ac.body}`);
  const isPerf = /\b(performance|wall[- ]?clock|<\s*\d+\s*(s|sec|second|seconds|ms|millisecond)|latency|throughput|p9[59])\b/i.test(text);
  if (!isNfr) return { kind: 'AC', requirement: 'AC', testType: 'Functional' };
  if (isPerf) return { kind: 'NFR_PERF', requirement: 'NFR (Performance)', testType: 'Performance' };
  return { kind: 'SKIP', reason: 'NFR non-Performance' };
}

// ---------- Given/When/Then extractor ----------
function trim(s) { return (s || '').replace(/\s+/g, ' ').trim().replace(/[,.;:]+$/, ''); }
function extractGwt(body) {
  const m = body.replace(/\r?\n/g, ' ');
  const reG = /\*\*Given\*\*\s+(.+?)(?=\*\*When\*\*|\*\*Then\*\*|\*\*And\*\*|$)/i;
  const reW = /\*\*When\*\*\s+(.+?)(?=\*\*Then\*\*|\*\*And\*\*|\*\*Given\*\*|$)/i;
  const reT = /\*\*Then\*\*\s+(.+?)(?=\*\*And\*\*|\*\*Given\*\*|\*\*When\*\*|$)/i;
  const g = m.match(reG)?.[1];
  const w = m.match(reW)?.[1];
  const t = m.match(reT)?.[1];
  return { given: g ? trim(g) : null, when: w ? trim(w) : null, then: t ? trim(t) : null };
}
function fallbackGwt(ac, storyTitle) {
  const t = ac.title;
  return {
    given: `Given the system is configured per story "${storyTitle}"`,
    when: `When the behavior described by ${ac.id} is exercised`,
    then: `Then ${trim(t)}`
  };
}

// ---------- Component routing per story ----------
function componentsFor(storyKey) {
  const t = (META.stories[storyKey]?.title || '').toLowerCase();
  if (/wizard|dashboard|overview|panel|tab|chart|sidebar/.test(t)) return 'Frontend';
  if (/pipeline|backend|aggregation|dispatch|consumer/.test(t)) return 'Backend';
  return 'Frontend,Backend';
}

// ---------- CSV writer ----------
const HEADER = ['tc_id','Description','QA Priority','Test name','Test step','Test data','Expected result','Labels','QA Parent','Components','Smoke','QA Components','QA Precondition','UI/Functional Test case','QA Regression','QA Story task','Requirement'];
function csvEscape(v) {
  v = String(v == null ? '' : v);
  if (/[",\r\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}
function row(arr) { return arr.map(csvEscape).join(','); }

// ---------- Main ----------
function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const { maxByStory, coveredAcs } = readExistingTcs();

  const out = [HEADER.join(',')];
  const stats = { total: 0, functional: 0, nfrPerf: 0, skipped: 0, perStory: {} };
  const tcCounter = { ...maxByStory };

  for (const storyKey of META.specOrder) {
    const meta = META.stories[storyKey];
    if (!meta?.specFile) continue;
    const specPath = path.join(SPEC_DIR, meta.specFile);
    if (!fs.existsSync(specPath)) continue;
    const md = fs.readFileSync(specPath, 'utf8');
    const acs = parseAcs(md);
    const components = componentsFor(storyKey);
    stats.perStory[storyKey] = { kept: 0, skipped: 0 };

    for (const ac of acs) {
      const acKey = `${storyKey}:${ac.id}`;
      if (coveredAcs.has(acKey)) continue;          // already covered
      const cls = classifyAc(ac);
      if (cls.kind === 'SKIP') { stats.skipped++; stats.perStory[storyKey].skipped++; continue; }

      const gwt = (() => {
        const e = extractGwt(ac.body);
        if (e.given && e.when && e.then) return e;
        return fallbackGwt(ac, meta.title);
      })();

      const next = (tcCounter[storyKey] || 0) + 1;
      tcCounter[storyKey] = next;
      const tcKey = `${storyKey}-TC${next}`;
      const tcId = tcKey;
      const desc = `${cls.kind === 'NFR_PERF' ? '[NFR-Perf] ' : ''}Verifies ${trim(ac.title)}`;
      const priority = cls.kind === 'NFR_PERF' ? 'Medium' : 'High';
      const testName = `${storyKey} TC${next} - ${trim(ac.title)}`;
      const labels = [`geo-${EPIC_ID}-v0.2`, cls.kind === 'NFR_PERF' ? 'performance' : 'functional', meta.specFile.replace(/\.md$/, '').replace(/^\d+-\d+[a-z]?-/, '')].filter(Boolean).join(',');
      const qaStoryTask = `${storyKey} ${ac.id} - ${trim(ac.title).slice(0, 60)}`;
      const precondition = trim(gwt.given.replace(/^Given\s+/i, ''));
      const uiFunctional = cls.testType;     // Functional or Performance

      // 3 lines per TC (Cucumber)
      const baseFields = {
        tc_id: tcId, Description: desc, 'QA Priority': priority, 'Test name': testName,
        'Test data': 'N/A', Labels: labels, 'QA Parent': storyKey, Components: components,
        Smoke: 'No', 'QA Components': components, 'QA Precondition': precondition,
        'UI/Functional Test case': uiFunctional, 'QA Regression': 'Yes',
        'QA Story task': qaStoryTask, Requirement: cls.requirement
      };

      const steps = [
        { step: `Given ${trim(gwt.given.replace(/^Given\s+/i, ''))}`, expected: 'Preconditions are satisfied' },
        { step: `When ${trim(gwt.when.replace(/^When\s+/i, ''))}`,    expected: 'The action is performed' },
        { step: `Then ${trim(gwt.then.replace(/^Then\s+/i, ''))}`,    expected: trim(gwt.then.replace(/^Then\s+/i, '')) }
      ];

      for (const s of steps) {
        const r = HEADER.map(col => {
          if (col === 'Test step') return s.step;
          if (col === 'Expected result') return s.expected;
          return baseFields[col] ?? '';
        });
        out.push(row(r));
      }

      stats.total++;
      stats.perStory[storyKey].kept++;
      if (cls.kind === 'NFR_PERF') stats.nfrPerf++; else stats.functional++;
    }
  }

  fs.writeFileSync(OUT_PATH, out.join('\r\n'), 'utf8');

  console.log(`Generated CSV : ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`Total TCs     : ${stats.total} (Functional ${stats.functional} + NFR Performance ${stats.nfrPerf})`);
  console.log(`Skipped (NFR non-Perf): ${stats.skipped}`);
  console.log(`Lignes CSV    : ${out.length - 1} (3 par TC)\n`);
  for (const k of Object.keys(stats.perStory)) {
    const s = stats.perStory[k];
    if (s.kept || s.skipped) console.log(`  ${k.padEnd(8)} kept=${s.kept}  skipped=${s.skipped}`);
  }
}

main();
