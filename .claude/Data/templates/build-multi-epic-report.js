/**
 * build-multi-epic-report.js — Aggregates every per-epic real.json file into a
 * single self-contained HTML dashboard with three sections:
 *   1. Global summary  : title, verdict, one-line context
 *   2. Global stats    : 8 key metrics
 *   3. Per-epic detail : <details> accordion → Story groups → TC cards
 *                        with steps, errors, screenshots
 *
 * Output: output/reports/runs/{DDMMYYYY-HHMM}/Report-forAllEpics.html (frozen
 * with its own copies of screenshots-epic{ID}/, autonomous and reopenable later).
 *
 * Usage:
 *   node .claude/Data/templates/build-multi-epic-report.js                    (auto-discover all)
 *   node .claude/Data/templates/build-multi-epic-report.js --epics 102,101    (filter)
 *   node .claude/Data/templates/build-multi-epic-report.js --date 2026-04-15  (override date)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');
// Parsed working artifacts (test-results-epic*-real.json + logs) live in a single folder.
const RESULTS_DIR = path.join(ROOT, '.claude/Data/processed/testcases/test-results');
// Final deliverables (HTML reports + screenshots) live under output/reports/.
const REPORTS_DIR = path.join(ROOT, '.claude/Data/output/reports');

// Date stamp DDMMYYYY (e.g. 27042026). Override with --date YYYY-MM-DD if needed.
const dateFlagIdx = process.argv.indexOf('--date');
const dateOverride = dateFlagIdx > -1 ? process.argv[dateFlagIdx + 1] : null;
const dateObj = dateOverride ? new Date(dateOverride) : new Date();
const dd = String(dateObj.getDate()).padStart(2, '0');
const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
const yyyy = dateObj.getFullYear();
const hh = String(dateObj.getHours()).padStart(2, '0');
const mn = String(dateObj.getMinutes()).padStart(2, '0');
const DATE_STAMP = `${dd}${mm}${yyyy}`;
const TIMESTAMP = `All-Epics-${DATE_STAMP}-${hh}${mn}`;
// OUT is computed later after epicIds are known (smart naming: 1 epic vs N epics).

// ── Epic and Story metadata (single source of truth) ─────────────────────────
// Loaded from .claude/Data/raw/test-data/epics-meta.json. To add a new epic,
// edit the JSON, never duplicate inline.
const META_PATH = path.join(ROOT, '.claude/Data/raw/test-data/epics-meta.json');
const EPIC_META = JSON.parse(fs.readFileSync(META_PATH, 'utf8')).epics;

// ── Args + discovery ──────────────────────────────────────────────────────────
const epicsFlagIdx = process.argv.indexOf('--epics');
const epicsFromFlag = epicsFlagIdx > -1 ? process.argv[epicsFlagIdx + 1].split(',') : null;

// Auto-discover by scanning RESULTS_DIR for test-results-epic{ID}-real.json files.
const allFiles = fs.existsSync(RESULTS_DIR) ? fs.readdirSync(RESULTS_DIR) : [];
const allDirs = allFiles
  .map(f => (f.match(/^test-results-epic([\w-]+)-real\.json$/) || [])[1])
  .filter(Boolean);

const epicIds = (epicsFromFlag || allDirs).filter(id => {
  const real = path.join(RESULTS_DIR, `test-results-epic${id}-real.json`);
  return fs.existsSync(real);
});

if (epicIds.length === 0) {
  console.error(`No real.json found in ${RESULTS_DIR}. Run /run-tests + /export-results for at least one epic.`);
  process.exit(1);
}
console.log(`Aggregating epics: ${epicIds.join(', ')}`);

const datasets = epicIds.map(id => {
  const real = path.join(RESULTS_DIR, `test-results-epic${id}-real.json`);
  return { id, data: JSON.parse(fs.readFileSync(real, 'utf8')) };
}).sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

// The HTML and its archive folder are computed at the end (inside runs/{TIMESTAMP}/).
// No more root-level "current" file — every run is its own self-contained snapshot.

// ── CSV steps loader ──────────────────────────────────────────────────────────
// Enriches TC cards with Given/When/Then steps from the source CSV when the
// real.json was parsed without step data (inline parsing path).
const CSV_DIR = path.join(ROOT, '.claude/Data/output/csv');

function parseCsvLine(line, sep) {
  const fields = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === sep && !inQ) {
      fields.push(cur); cur = '';
    } else {
      cur += c;
    }
  }
  fields.push(cur);
  return fields;
}

function detectSeparator(headerLine) {
  // Compte les occurrences de ; et , hors guillemets pour détecter le séparateur
  let semis = 0, commas = 0, inQ = false;
  for (let i = 0; i < headerLine.length; i++) {
    const c = headerLine[i];
    if (c === '"') inQ = !inQ;
    else if (!inQ && c === ';') semis++;
    else if (!inQ && c === ',') commas++;
  }
  return semis >= commas ? ';' : ',';
}

function normalizeTcId(testName) {
  const m = (testName || '').match(/^(GEO-\d+)\s+TC(\d+)/i);
  if (!m) return null;
  return `${m[1]}-TC${m[2].padStart(3, '0')}`;
}

function loadCsvSteps(epicId) {
  const candidates = [
    path.join(CSV_DIR, `testcases - epic${epicId}.csv`),
    path.join(CSV_DIR, 'archive', `testcases - epic${epicId}.csv`),
  ];
  const csvPath = candidates.find(p => fs.existsSync(p));
  if (!csvPath) return {};
  const lines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return {};
  const sep = detectSeparator(lines[0]);
  const headers = parseCsvLine(lines[0], sep);
  const tcIdIdx = headers.indexOf('tc_id');   // présent dans certains CSV (ex: epic105)
  const nameIdx = headers.indexOf('Test name');
  const stepIdx = headers.indexOf('Test step');
  if (stepIdx < 0) return {};
  if (tcIdIdx < 0 && nameIdx < 0) return {};
  const map = {};
  for (let i = 1; i < lines.length; i++) {
    const f = parseCsvLine(lines[i], sep);
    // Résoudre le tc_id : colonne directe prioritaire, sinon dérivé du Test name
    const tcId = tcIdIdx >= 0
      ? (f[tcIdIdx] || '').trim()
      : normalizeTcId(f[nameIdx]);
    const step = (f[stepIdx] || '').trim();
    if (!tcId || !step) continue;
    if (!map[tcId]) map[tcId] = [];
    if (!map[tcId].includes(step)) map[tcId].push(step);
  }
  return map;
}

// Build step maps for all loaded epics
const csvStepsMap = {};
for (const { id } of datasets) {
  csvStepsMap[id] = loadCsvSteps(id);
}

const esc = s => (s || '').toString()
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const stripAnsi = s => (s || '').replace(/\x1b\[[0-9;]*m/g, '').replace(/␛\[[0-9;]*m/g, '');

function renderError(rawError) {
  if (!rawError) return '';
  const clean = stripAnsi(rawError);
  // Extract Expected / Received lines
  const expMatch = clean.match(/Expected[^\n]*:\s*"?([^\n"]+)"?/);
  const recMatch = clean.match(/Received[^\n]*:\s*"?([^\n"]+)"?/);
  // First non-empty line = main message (stop before "expect(" internals)
  const mainLine = clean.split('\n').map(l => l.trim()).find(l => l && !l.startsWith('at ') && !l.startsWith('expect(') && !l.match(/^\d+ \|/)) || '';
  let body = `<div style="font-size:12px;color:#b91c1c;margin-bottom:8px">${esc(mainLine)}</div>`;
  if (expMatch && recMatch) {
    body += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px">
      <div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:4px;padding:8px">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#991b1b;margin-bottom:4px">Expected (JDD)</div>
        <div style="font-size:11px;color:#7f1d1d;word-break:break-word">${esc(expMatch[1].trim())}</div>
      </div>
      <div style="background:#dcfce7;border:1px solid #86efac;border-radius:4px;padding:8px">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#166534;margin-bottom:4px">Received (app)</div>
        <div style="font-size:11px;color:#14532d;word-break:break-word">${esc(recMatch[1].trim())}</div>
      </div>
    </div>`;
  } else {
    const lines = clean.split('\n').filter(l => l.trim() && !l.trim().match(/^\d+ \|/) && !l.trim().startsWith('at ')).slice(0, 12);
    body += `<pre style="margin:0;white-space:pre-wrap;font-size:11px;color:#7f1d1d">${esc(lines.join('\n'))}</pre>`;
  }
  return `<div class="err-block"><div class="err-label">Error details</div>${body}</div>`;
}

function renderSkipReason(rawReason) {
  if (!rawReason) return '';
  const clean = stripAnsi(rawReason);

  // Extract user assertion message: the string passed as 2nd arg to expect(), or after "Error: "
  // e.g. "Error: At least one KPI card must show N/A ... expect(locator).toBeVisible() failed"
  const userMsgMatch = clean.match(/^Error:\s+(.+?)(?:\s+expect\(|\s+\[|$)/m);
  const userMsg = userMsgMatch ? userMsgMatch[1].trim() : '';

  // Extract failure type: toBeVisible, toContainText, toHaveText, etc.
  const failMatch = clean.match(/\.(to\w+)\(\)\s+failed/);
  const failType = failMatch ? failMatch[1] : '';

  // Extract locator string
  const locMatch = clean.match(/Locator:\s+locator\(([^\n)]+)\)/);
  const locator = locMatch ? locMatch[1].trim() : '';

  // Detect common failure reasons
  const notFound = /element\(s\)? not found|elements? not found/i.test(clean);
  const timeout = clean.match(/Timeout:\s*(\d+)ms/);
  const timeoutMs = timeout ? timeout[1] : '';

  // Extract Expected/Received if present (e.g. toHaveText failures)
  const expMatch = clean.match(/Expected[^\n]*:\s*"?([^\n"]+)"?/);
  const recMatch = clean.match(/Received[^\n]*:\s*"?([^\n"]+)"?/);

  let html = '';

  // Primary message
  if (userMsg) {
    html += `<div style="font-size:13px;color:#92400e;font-weight:600;margin-bottom:8px;line-height:1.4">${esc(userMsg)}</div>`;
  }

  // Failure details row
  const chips = [];
  if (failType) {
    chips.push(`<span style="font-family:monospace;font-size:11px;background:#fed7aa;color:#7c2d12;padding:2px 7px;border-radius:3px">.${esc(failType)}()</span>`);
  }
  if (notFound) {
    chips.push(`<span style="font-size:11px;color:#78350f">Element not found in DOM</span>`);
  }
  if (timeoutMs && !notFound) {
    chips.push(`<span style="font-size:11px;color:#78350f">Timeout after ${esc(timeoutMs)} ms</span>`);
  }
  if (locator) {
    chips.push(`<span style="font-size:11px;color:#78350f">Locator: <code style="font-family:monospace;background:#f1f5f9;padding:1px 5px;border-radius:3px">${esc(locator)}</code></span>`);
  }
  if (chips.length) {
    html += `<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:8px">${chips.join('')}</div>`;
  }

  // Expected / Received grid (e.g. text assertion failures)
  if (expMatch && recMatch) {
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px">
      <div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:4px;padding:8px">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#991b1b;margin-bottom:4px">Expected</div>
        <div style="font-size:11px;color:#7f1d1d;word-break:break-word;font-family:monospace">${esc(expMatch[1].trim())}</div>
      </div>
      <div style="background:#dcfce7;border:1px solid #86efac;border-radius:4px;padding:8px">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#166534;margin-bottom:4px">Received</div>
        <div style="font-size:11px;color:#14532d;word-break:break-word;font-family:monospace">${esc(recMatch[1].trim())}</div>
      </div>
    </div>`;
  }

  // Fallback: if we couldn't extract anything structured, show a clean 1-liner
  if (!userMsg && !chips.length && !expMatch) {
    const firstLine = clean.split('\n').map(l => l.trim())
      .find(l => l && !l.startsWith('at ') && !l.match(/^\d+ \|/) && !l.startsWith('Call log')) || clean.slice(0, 200);
    html += `<div style="font-size:12px;color:#78350f;line-height:1.5">${esc(firstLine)}</div>`;
  }

  return html;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function epicVerdict(rate) {
  if (rate >= 80) return { color: '#16a34a', label: 'GO', cls: 'verdict-go' };
  if (rate >= 60) return { color: '#f59e0b', label: 'CONDITIONAL', cls: 'verdict-cond' };
  return { color: '#dc2626', label: 'NO-GO', cls: 'verdict-nogo' };
}

function getStoryKey(tc_id) {
  // Handles both formats: "GEO-327-TC001" and "TC-GEO-327-001"
  const m = (tc_id || '').match(/(?:TC-)?(GEO-\d+)/);
  return m ? m[1] : 'OTHER';
}

function getStoryTitle(epicId, storyKey) {
  return (EPIC_META[epicId]?.stories || {})[storyKey] || '(no title)';
}

function renderStep(s, isFailStep = false) {
  const m = s.match(/^(Given|When|Then|And)\s+(.*)$/i);
  const kw = m ? m[1] : '';
  const rest = m ? m[2] : s;
  const color = kw === 'Given' ? '#2563eb'
              : kw === 'When'  ? '#d97706'
              : kw === 'Then'  ? '#16a34a'
                               : '#64748b';
  const failTag = isFailStep
    ? ' <span style="font-size:10px;font-weight:700;color:#dc2626;margin-left:6px">✘ FAILED HERE</span>'
    : '';
  return `<div class="step">${kw ? `<span class="kw" style="color:${color}">${kw}</span> ` : ''}${esc(rest)}${failTag}</div>`;
}

function renderShots(epicId, tc_id, isFail) {
  const given = `${tc_id}_step1_given.png`;
  const when  = `${tc_id}_step2_when.png`;
  const then  = `${tc_id}_step3_then.png`;
  const thenColor  = isFail ? '#dc2626' : '#16a34a';
  const thenLabel  = isFail ? 'Then (FAIL)' : 'Then';
  const thenBorder = isFail
    ? 'border:2px solid #dc2626;box-shadow:0 0 0 3px rgba(220,38,38,0.25)'
    : 'border:2px solid #16a34a;box-shadow:0 0 0 3px rgba(22,163,74,0.25)';
  const shot = (file, lbl, color, imgStyle) => `<div class="shot">
    <div class="shot-lbl" style="background:${color}">${lbl}</div>
    <a href="screenshots-epic${epicId}/${file}" target="_blank"><img src="screenshots-epic${epicId}/${file}" alt="${file}" loading="lazy" style="${imgStyle}" onerror="this.outerHTML='&lt;div class=\\'shot-missing\\'&gt;(screenshot missing)&lt;/div&gt;'"></a>
    <div class="shot-name">${file}</div>
  </div>`;
  return `<div class="shots">
    ${shot(given, 'Given', '#2563eb', 'border:1px solid #e2e8f0')}
    ${shot(when,  'When',  '#d97706', 'border:1px solid #e2e8f0')}
    ${shot(then,  thenLabel, thenColor, thenBorder)}
  </div>`;
}

function renderTc(epicId, r) {
  const status = (r.status || '').toUpperCase();
  const isFail = status === 'FAILED';
  const isSkip = status === 'SKIPPED';
  const cls      = isFail ? 'card-fail' : isSkip ? 'card-skip' : 'card-pass';
  const badgeCls = isFail ? 'badge-fail' : isSkip ? 'badge-skip' : 'badge-pass';
  const openAttr = isFail ? ' open' : '';
  const name = r.name || r.title || r.tc_id;
  const duration = (r.duration || r.duration_ms || 0) / 1000;
  const descHtml = r.description
    ? `<div class="tc-desc">${esc(r.description)}</div>`
    : '';
  const steps = (r.steps || []).length ? r.steps : (csvStepsMap[epicId] ? (csvStepsMap[epicId][r.tc_id] || []) : []);
  const stepsHtml = steps.length
    ? `<div class="steps-block"><div class="steps-label">Steps</div>${steps.map((s, i) => renderStep(s, isFail && i === steps.length - 1)).join('')}</div>`
    : '';
  const errBlock = isFail ? renderError(r.error) : '';
  const skipReason = isSkip && r.error ? (r.error || '').replace(/^SKIPPED\s*[—–-]+\s*/i, '').trim() : '';
  const skipBlock = skipReason
    ? `<div style="margin-bottom:14px;padding:10px 14px;background:#fffbeb;border-left:3px solid #d97706;border-radius:0 6px 6px 0">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#92400e;margin-bottom:8px">Skip reason</div>
        ${renderSkipReason(skipReason)}
      </div>`
    : '';
  return `<details class="tc-card ${cls}"${openAttr}>
    <summary class="tc-hd">
      <span class="tc-id">${esc(r.tc_id)}</span>
      <span class="tc-name">${esc(name)}</span>
      <span class="badge ${badgeCls}">${status}</span>
      <span class="tc-dur">${duration.toFixed(1)}s</span>
    </summary>
    <div class="tc-body">
      ${descHtml}
      ${stepsHtml}
      ${errBlock}
      ${skipBlock}
      <div class="shots-label">Screenshots</div>
      ${renderShots(epicId, r.tc_id, isFail)}
    </div>
  </details>`;
}

function renderStory(epicId, storyKey, tcs) {
  const p = tcs.filter(r => (r.status || '').toLowerCase() === 'passed').length;
  const f = tcs.filter(r => (r.status || '').toLowerCase() === 'failed').length;
  const s = tcs.filter(r => (r.status || '').toLowerCase() === 'skipped').length;
  const title = getStoryTitle(epicId, storyKey);
  // Sort TCs numerically
  tcs.sort((a, b) => {
    const na = parseInt((a.tc_id.match(/TC(\d+)/) || [])[1] || '0', 10);
    const nb = parseInt((b.tc_id.match(/TC(\d+)/) || [])[1] || '0', 10);
    return na - nb;
  });
  return `<details class="story-block">
    <summary class="story-hd">
      <span class="story-id">${storyKey}</span>
      <span class="story-title">${esc(title)}</span>
      <span class="story-stats">
        <span class="ss-pass">${p} passed</span>
        ${f > 0 ? `<span class="ss-fail">${f} failed</span>` : ''}
        ${s > 0 ? `<span class="ss-skip">${s} skipped</span>` : ''}
      </span>
    </summary>
    <div class="story-body">
      ${tcs.map(tc => renderTc(epicId, tc)).join('')}
    </div>
  </details>`;
}

function renderEpic({ id, data }) {
  const title = EPIC_META[id]?.title || `Epic ${id}`;
  const total = data.total || 0;
  const passed = data.passed || 0;
  const failed = data.failed || 0;
  const skipped = data.skipped || 0;
  const rate = total ? (passed / total * 100).toFixed(1) : '0.0';
  const v = epicVerdict(parseFloat(rate));
  const date = data.execution_date ? data.execution_date.slice(0, 10) : '—';
  const dur = data.duration_total_ms ? (data.duration_total_ms / 1000).toFixed(0) + 's' : '—';

  // Group TCs by story
  const byStory = {};
  for (const r of data.results || []) {
    const k = getStoryKey(r.tc_id);
    (byStory[k] ??= []).push(r);
  }
  const storyKeys = Object.keys(byStory).sort((a, b) => {
    const na = parseInt(a.replace('GEO-', ''), 10);
    const nb = parseInt(b.replace('GEO-', ''), 10);
    return na - nb;
  });

  return `<details class="epic-block">
    <summary class="epic-hd" style="border-left-color:${v.color}">
      <span class="epic-id">EPIC-${id}</span>
      <span class="epic-title">${esc(title)}</span>
      <span class="epic-stats">
        <span class="es-total">${total} tests</span>
        <span class="es-pass">${passed} ✓</span>
        ${failed > 0 ? `<span class="es-fail">${failed} ✘</span>` : ''}
        ${skipped > 0 ? `<span class="es-skip">${skipped} -</span>` : ''}
        <span class="es-rate">${rate}%</span>
        <span class="es-verdict" style="color:${v.color};border-color:${v.color}">${v.label}</span>
      </span>
    </summary>
    <div class="epic-body">
      <div class="epic-meta">${storyKeys.length} stories &middot; executed ${date} &middot; duration ${dur}</div>
      ${storyKeys.map(k => renderStory(id, k, byStory[k])).join('')}
    </div>
  </details>`;
}

// ── Global stats (Section 2) ─────────────────────────────────────────────────
let total = 0, passed = 0, failed = 0, skipped = 0, durationMs = 0;
const allStoriesSet = new Set();
for (const { id, data } of datasets) {
  total += data.total || 0;
  passed += data.passed || 0;
  failed += data.failed || 0;
  skipped += data.skipped || 0;
  durationMs += data.duration_total_ms || 0;
  for (const r of data.results || []) {
    const sk = getStoryKey(r.tc_id);
    if (sk !== 'OTHER') allStoriesSet.add(`${id}|${sk}`);
  }
}
const rate = total ? (passed / total * 100).toFixed(1) : '0.0';
const verdict = epicVerdict(parseFloat(rate));
const duration = (durationMs / 1000).toFixed(1);
const todayIso = new Date().toISOString().slice(0, 10);

// ── Final HTML ───────────────────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GEO QA &mdash; Release version 1</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.45}
  main{max-width:1200px;margin:0 auto;padding:32px 24px 64px}
  section.report-section{background:white;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:24px 28px;margin-bottom:24px}
  .section-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#64748b;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}

  /* ── Section 1 : Global summary (blue theme) ────────────────── */
  .report-section.section-summary{background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%);color:#f0f9ff}
  .report-section.section-summary .section-title{color:#bfdbfe;border-bottom-color:rgba(255,255,255,.2)}
  .summary-row{display:flex;align-items:flex-start;gap:24px;flex-wrap:wrap;margin-bottom:18px}
  .summary-title{font-size:24px;font-weight:800;color:white;margin-bottom:6px}
  .summary-line{font-size:14px;color:#dbeafe}
  .summary-line strong{color:white}
  .verdict-badge{font-size:22px;font-weight:800;padding:8px 22px;border-radius:8px;border:2.5px solid;margin-left:auto;background:white}
  .verdict-go{color:#16a34a;border-color:#16a34a}
  .verdict-cond{color:#f59e0b;border-color:#f59e0b}
  .verdict-nogo{color:#dc2626;border-color:#dc2626}

  .epic-list{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px}
  .epic-list li{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:6px;padding:10px 14px;display:flex;align-items:center;gap:10px}
  .epic-list .el-id{font-family:monospace;font-size:12px;font-weight:700;color:#bfdbfe;background:rgba(255,255,255,.15);padding:2px 8px;border-radius:4px}
  .epic-list .el-title{font-size:13px;color:white}

  /* ── Section 2 : Global stats (compact, single row) ─────── */
  .report-section.section-stats{padding:14px 18px}
  .report-section.section-stats .section-title{margin-bottom:10px;padding-bottom:6px;font-size:11px}
  .stats-row{display:grid;grid-template-columns:repeat(8,1fr);gap:8px}
  .stat{padding:8px 10px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;text-align:center}
  .stat-label{font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:.04em;font-weight:600;margin-bottom:4px;line-height:1.2;min-height:20px;display:flex;align-items:center;justify-content:center}
  .stat-value{font-size:18px;font-weight:800;line-height:1}
  .stat-pass .stat-value{color:#16a34a}
  .stat-fail .stat-value{color:#dc2626}
  .stat-skip .stat-value{color:#64748b}
  .stat-rate .stat-value{color:${verdict.color}}
  @media (max-width: 1100px){
    .stats-row{grid-template-columns:repeat(4,1fr)}
  }

  /* ── Section 3 : Per-epic detail ─────────────────────────── */
  details{transition:background .15s}
  details > summary{cursor:pointer;list-style:none;outline:none}
  details > summary::-webkit-details-marker{display:none}
  details > summary::before{content:"▶";display:inline-block;margin-right:10px;color:#94a3b8;font-size:11px;transition:transform .2s}
  details[open] > summary::before{transform:rotate(90deg)}

  /* Epic blocks */
  .epic-block{border:1px solid #e2e8f0;border-radius:10px;margin-bottom:14px;background:white;overflow:hidden}
  .epic-block[open]{box-shadow:0 4px 12px rgba(0,0,0,.06)}
  .epic-hd{padding:16px 20px 16px 16px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;border-left:5px solid;background:#f8fafc;font-weight:600}
  .epic-block[open] .epic-hd{background:white;border-bottom:1px solid #e2e8f0}
  .epic-id{font-family:monospace;font-size:13px;font-weight:700;color:#0f172a;background:#e2e8f0;padding:3px 10px;border-radius:4px}
  .epic-title{font-size:15px;color:#0f172a}
  .epic-stats{margin-left:auto;display:flex;gap:14px;align-items:center;font-size:13px}
  .es-total{color:#64748b}
  .es-pass{color:#16a34a;font-weight:700}
  .es-fail{color:#dc2626;font-weight:700}
  .es-skip{color:#64748b;font-weight:700}
  .es-rate{background:#f1f5f9;padding:3px 10px;border-radius:12px;font-weight:700;font-size:12px}
  .es-verdict{font-size:11px;font-weight:800;padding:3px 10px;border-radius:4px;border:1.5px solid}
  .epic-body{padding:18px 20px}
  .epic-meta{font-size:12px;color:#94a3b8;margin-bottom:14px}

  /* Story blocks */
  .story-block{border:1px solid #e2e8f0;border-radius:8px;margin-bottom:10px;background:#f8fafc}
  .story-hd{padding:12px 16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-weight:600}
  .story-id{font-family:monospace;font-size:12px;font-weight:700;color:#475569;background:white;padding:2px 8px;border-radius:4px;border:1px solid #e2e8f0}
  .story-title{font-size:14px;color:#0f172a}
  .story-stats{margin-left:auto;display:flex;gap:10px;font-size:12px}
  .ss-pass{color:#16a34a;font-weight:700}
  .ss-fail{color:#dc2626;font-weight:700}
  .ss-skip{color:#64748b;font-weight:700}
  .story-body{padding:8px 16px 14px;background:white;border-top:1px solid #e2e8f0}

  /* TC cards */
  .tc-card{border-left:3px solid;border-radius:6px;margin-bottom:8px;background:#fafbfc;overflow:hidden}
  .tc-card.card-pass{border-color:#16a34a}
  .tc-card.card-fail{border-color:#dc2626;background:#fff8f8}
  .tc-card.card-skip{border-color:#94a3b8;background:#f8fafc}
  details.tc-card>summary{cursor:pointer;list-style:none;outline:none}
  details.tc-card>summary::-webkit-details-marker{display:none}
  details.tc-card>summary::before{content:"▶";display:inline-block;margin-right:8px;color:#94a3b8;font-size:10px;transition:transform .2s;flex-shrink:0}
  details.tc-card[open]>summary::before{transform:rotate(90deg)}
  details.tc-card[open] .tc-hd{border-bottom:1px solid #f1f5f9}
  .tc-hd{padding:9px 14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:13px}
  .tc-id{font-family:monospace;font-weight:700;color:#64748b;font-size:11px;min-width:130px}
  .tc-name{flex:1;color:#0f172a}
  .badge{font-size:10px;font-weight:700;padding:2px 10px;border-radius:20px;color:white;white-space:nowrap}
  .badge-pass{background:#16a34a}
  .badge-fail{background:#dc2626}
  .badge-skip{background:#94a3b8}
  .tc-dur{font-size:11px;color:#94a3b8;white-space:nowrap}
  .tc-body{padding:14px 18px 16px;background:white;border-top:1px solid #f1f5f9}

  .tc-desc{font-size:12px;color:#475569;font-style:italic;margin-bottom:12px;padding:6px 10px;background:#f8fafc;border-left:3px solid #cbd5e1;border-radius:0 4px 4px 0}
  .steps-block{margin-bottom:14px}
  .steps-label,.err-label,.shots-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:6px}
  .step{font-size:13px;color:#374151;line-height:1.55}
  .kw{font-weight:700;margin-right:4px}

  .err-block{background:#fef2f2;border:1px solid #fca5a5;border-radius:6px;padding:10px 14px;font-size:12px;color:#991b1b;margin-bottom:14px;font-family:ui-monospace,Menlo,monospace;line-height:1.5;white-space:pre-wrap;word-break:break-word}
  .err-block .err-label{color:#dc2626;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}

  .shots{display:flex;gap:12px;flex-wrap:wrap}
  .shot{display:flex;flex-direction:column;align-items:center;gap:4px}
  .shot-lbl{font-size:10px;font-weight:700;color:white;padding:2px 10px;border-radius:3px;align-self:stretch;text-align:center}
  .shot a{display:block}
  .shot img{display:block;border:1px solid #e2e8f0;border-radius:4px;cursor:zoom-in;transition:box-shadow .15s;width:200px;max-width:100%;height:auto}
  .shot img:hover{box-shadow:0 0 0 2px #3b82f6}
  .shot-missing{width:200px;height:110px;border:1px dashed #cbd5e1;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:11px;background:#f8fafc}
  .shot-name{font-size:10px;color:#94a3b8;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
</style>
</head>
<body>
<main>

  <!-- ═══ Section 1 : Global summary (blue) ════════════════════════════ -->
  <section class="report-section section-summary">
    <div class="summary-row">
      <div>
        <div class="summary-title">GEO QA — Release version 1</div>
        <div class="summary-line">
          Run executed on <strong>${todayIso}</strong> covering
          <strong>${epicIds.length}</strong> epic${epicIds.length > 1 ? 's' : ''}:
        </div>
      </div>
      <div class="verdict-badge ${verdict.cls}">${verdict.label}</div>
    </div>
    <ul class="epic-list">
      ${datasets.map(({ id }) => {
        const title = EPIC_META[id]?.title || `Epic ${id}`;
        return `<li><span class="el-id">EPIC-${id}</span><span class="el-title">${esc(title)}</span></li>`;
      }).join('')}
    </ul>
  </section>

  <!-- ═══ Section 2 : Global statistics (compact, custom order) ═══════ -->
  <section class="report-section section-stats">
    <div class="section-title">Global statistics</div>
    <div class="stats-row">
      <div class="stat"><div class="stat-label">Epics</div><div class="stat-value">${epicIds.length}</div></div>
      <div class="stat"><div class="stat-label">User stories</div><div class="stat-value">${allStoriesSet.size}</div></div>
      <div class="stat"><div class="stat-label">Total test cases</div><div class="stat-value">${total}</div></div>
      <div class="stat stat-pass"><div class="stat-label">Passed</div><div class="stat-value">${passed}</div></div>
      <div class="stat stat-fail"><div class="stat-label">Failed</div><div class="stat-value">${failed}</div></div>
      <div class="stat stat-skip"><div class="stat-label">Skipped</div><div class="stat-value">${skipped}</div></div>
      <div class="stat stat-rate"><div class="stat-label">Success rate</div><div class="stat-value">${rate}%</div></div>
      <div class="stat"><div class="stat-label">Duration</div><div class="stat-value">${duration}<span style="font-size:11px;color:#94a3b8;font-weight:600;margin-left:2px">s</span></div></div>
    </div>
  </section>

  <!-- ═══ Section 3 : Per-epic detail ══════════════════════════════════ -->
  <section class="report-section">
    <div class="section-title">Per-epic detail (click an epic to expand)</div>
    ${datasets.map(renderEpic).join('')}
  </section>

</main>
</body>
</html>`;

// ── Write the report directly inside its run-stamped folder ─────────────────
// No more root-level Report-forAllEpics-*.html: every run lives under
// output/reports/runs/{DDMMYYYY-HHMM}/ with its own frozen screenshots so the
// archive is autonomous and reopenable later.
const ARCHIVE_DIR = path.join(REPORTS_DIR, 'runs', TIMESTAMP);
fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
const ARCHIVE_HTML = path.join(ARCHIVE_DIR, 'Report-forAllEpics.html');
fs.writeFileSync(ARCHIVE_HTML, html, 'utf8');
// Move live screenshot buffers into the run folder (copy then delete) so the
// transient buffers under output/reports/screenshots-epic{ID}/ never linger
// after report generation — only the frozen copies inside runs/{TS}/ remain.
let copiedShots = 0;
for (const id of epicIds) {
  const src = path.join(REPORTS_DIR, `screenshots-epic${id}`);
  const dst = path.join(ARCHIVE_DIR, `screenshots-epic${id}`);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dst, { recursive: true });
    fs.rmSync(src, { recursive: true, force: true });
    copiedShots++;
  }
}

// Copy execution logs (produced by /run-tests via tee) into runs/{TS}/logs/
// so the archive is self-sufficient for post-mortem debugging.
const LOGS_SRC = path.join(ROOT, '.claude/Data/processed/testcases/test-results');
const LOGS_DST = path.join(ARCHIVE_DIR, 'logs');
let copiedLogs = 0;
for (const id of epicIds) {
  const src = path.join(LOGS_SRC, `execution-log-epic${id}.txt`);
  if (fs.existsSync(src)) {
    if (!fs.existsSync(LOGS_DST)) fs.mkdirSync(LOGS_DST, { recursive: true });
    fs.copyFileSync(src, path.join(LOGS_DST, `execution-log-epic${id}.txt`));
    copiedLogs++;
  }
}
console.log(`Wrote ${ARCHIVE_HTML} (+ ${copiedShots} screenshot folders moved, ${copiedLogs} logs)`);
console.log(`Verdict: ${verdict.label} (${rate}%) · ${passed}/${total} passed across ${epicIds.length} epics, ${allStoriesSet.size} stories`);
