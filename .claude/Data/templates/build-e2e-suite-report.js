/**
 * build-e2e-suite-report.js — Agrège les 3 specs E2E en un seul rapport HTML.
 * Format identique à build-multi-epic-report.js (même CSS, même 3 sections,
 * mêmes SC cards, même verdict GO/CONDITIONAL/NO-GO).
 *
 * Sources dans processed/testcases/test-results/ :
 *   - test-results-create-default-analysis-real.json  (dynamique : N marchés / N LLMs)
 *   - test-results-verify-analysis-real.json
 *   (ou test-results-e2e-suite-real.json si suite lancée d'un coup)
 *
 * Usage :
 *   node .claude/Data/templates/build-e2e-suite-report.js
 *   node .claude/Data/templates/build-e2e-suite-report.js --date 2026-05-04
 */

'use strict';
const fs   = require('fs');
const path = require('path');

const ROOT        = path.resolve(__dirname, '../../..');
const RESULTS_DIR = path.join(ROOT, '.claude/Data/processed/testcases/test-results');
const REPORTS_DIR = path.join(ROOT, '.claude/Data/output/reports');

// ── Date stamp ────────────────────────────────────────────────────────────────
const dateFlagIdx  = process.argv.indexOf('--date');
const dateOverride = dateFlagIdx > -1 ? process.argv[dateFlagIdx + 1] : null;
const dateObj      = dateOverride ? new Date(dateOverride) : new Date();
const pad = n => String(n).padStart(2, '0');
const dd = pad(dateObj.getDate()), mm = pad(dateObj.getMonth() + 1), yyyy = dateObj.getFullYear();
const hh = pad(dateObj.getHours()), mn = pad(dateObj.getMinutes());
const runNameIdx      = process.argv.indexOf('--run-name');
const runNameOverride = runNameIdx > -1 ? process.argv[runNameIdx + 1] : null;
const TIMESTAMP = runNameOverride || `E2E-${dd}${mm}${yyyy}-${hh}${mn}`;
const todayIso  = dateObj.toISOString().slice(0, 10);

// ── E2E spec definitions (execution order) ────────────────────────────────────
const E2E_SPECS = [
  {
    id:    'geo-analytics-dashboard',
    label: 'SC1 — GEO Analytics Dashboard (GEO-95 / page structure)',
    file:  'test-results-geo-analytics-dashboard-real.json',
    shots: 'screenshots-geo-analytics-dashboard',
  },

  {
    id:    'create-default-analysis',
    label: 'SC2 — Create default analysis (Chanel / US / English)',
    file:  'test-results-create-default-analysis-real.json',
    shots: 'screenshots-create-default-analysis',
  },
    {
    id:    'GEO-dashboard-overview',
    label: 'SC3 — Dashboard Overview Sidebar/Layout + LLM Filters + KPI Cards (GEO-79/78/72/107 / Chanel)',
    file:  'test-results-GEO-dashboard-overview-real.json',
    shots: 'screenshots-GEO-dashboard-overview',
  },
  {
    id:    'verify-analysis',
    label: 'SC4 — Verify brand analysis (reports list + dashboard)',
    file:  'test-results-verify-analysis-real.json',
    shots: 'screenshots-verify-analysis',
  },
  {
    id:    'category-top-concept',
    label: 'SC5 — Top Concepts widget (sort, filter, detail panel & sources search)',
    file:  'test-results-category-top-concept-real.json',
    shots: 'screenshots-category-top-concept',
  },
  {
    id:    'category-question-analysis',
    label: 'SC6 — Questions Analysis panel (YSL / luxury perfume / Identity tab)',
    file:  'test-results-category-question-analysis-real.json',
    shots: 'screenshots-category-question-analysis',
  },
  {
    id:    'category-kpi-cards-analysis',
    label: 'SC7 — KPI cards & AI Perception Summary ({CATEGORY} / GEO-70)',
    file:  'test-results-category-kpi-cards-analysis-real.json',
    shots: 'screenshots-category-kpi-cards-analysis',
  },
  {
    id:    'category-brand-prioritization-analysis',
    label: 'SC8 — Brand Prioritization Matrix ({CATEGORY} / GEO-69)',
    file:  'test-results-category-brand-prioritization-analysis-real.json',
    shots: 'screenshots-category-brand-prioritization-analysis',
  },
  {
    id:    'category-brand-rankings-analysis',
    label: 'SC9 — Brand Rankings table ({CATEGORY} / GEO-68)',
    file:  'test-results-category-brand-rankings-analysis-real.json',
    shots: 'screenshots-category-brand-rankings-analysis',
  },
  {
    id:    'category-questions-table',
    label: 'SC10 — Questions Table ({CATEGORY} / GEO-67)',
    file:  'test-results-category-questions-table-real.json',
    shots: 'screenshots-category-questions-table',
  },
  {
    id:    'manage-scope',
    label: 'SC11 — Manage Scope page (GEO-61 Markets/Categories + GEO-60 LLM Engines)',
    file:  'test-results-manage-scope-real.json',
    shots: 'screenshots-manage-scope',
  },
  {
    id:    'category-perception-citation',
    label: 'SC12 — Perception Topics & AI Citation Sources (GEO-66 / machines de cuisine)',
    file:  'test-results-category-perception-citation-real.json',
    shots: 'screenshots-category-perception-citation',
  },
  {
    id:    'hubspot-upsell-pql',
    label: 'SC13 — HubSpot Upsell PQL — Speak to Us modal & cookie consent (GEO-237)',
    file:  'test-results-hubspot-upsell-pql-real.json',
    shots: 'screenshots-hubspot-upsell-pql',
  },
  {
    id:    'e2e-brand-SOV',
    label: 'SC14 — Brand SOV — KPI row, Rankings table & SOV doughnut card on Overview (GEO-663/664)',
    file:  'test-results-e2e-brand-SOV-real.json',
    shots: 'screenshots-e2e-brand-SOV',
  },
  {
    id:    'e2e-category-SOV',
    label: 'SC15 — Category SOV — KPI row, Rankings table & SOV card on Category view (GEO-663/664)',
    file:  'test-results-e2e-category-SOV-real.json',
    shots: 'screenshots-e2e-category-SOV',
  },
  {
    id:    'e2e-category-questions-detail',
    label: 'SC16 — Category Questions Detail Panel — Favorability tiers per engine (EPIC-27/GEO-716/717)',
    file:  'test-results-e2e-category-questions-detail-real.json',
    shots: 'screenshots-e2e-category-questions-detail',
  },
  {
    id:    'e2e-category-question-visibility',
    label: 'SC17 — Category Visibility — Winner column ↔ panel per-engine badge cross-validation',
    file:  'test-results-e2e-category-question-visibility-real.json',
    shots: 'screenshots-e2e-category-question-visibility',
  },
  {
    id:    'e2e-category-question-competitive',
    label: 'SC18 — Category Competitive — Winner column ↔ panel per-engine Won/Lost badge cross-validation',
    file:  'test-results-e2e-category-question-competitive-real.json',
    shots: 'screenshots-e2e-category-question-competitive',
  },
  {
    id:    'e2e-category-question-perception',
    label: 'SC19 — Category Perception — Themes column ↔ panel themes list / empty state cross-validation',
    file:  'test-results-e2e-category-question-perception-real.json',
    shots: 'screenshots-e2e-category-question-perception',
  },
];

// ── Normalize different real.json formats ─────────────────────────────────────
// Existing specs use data.results (uppercase status, duration in ms, steps as strings).
// Newer specs (e.g. category-question-analysis) use data.testcases (lowercase status,
// duration_ms, steps as objects with a `title` field). This function unifies both.
function normalizeResults(data, spec) {
  if (data.results) return data.results;
  const tcs = data.testCases || data.testcases;
  if (!tcs) return [];
  const shotsDir = path.join(REPORTS_DIR, spec.shots);
  return tcs.map(tc => {
    const screenshots = fs.existsSync(shotsDir)
      ? fs.readdirSync(shotsDir)
          .filter(f => f.startsWith(tc.tc_id + '_') && f.endsWith('.png'))
          .sort()
          .map(f => `${spec.shots}/${f}`)
      : [];
    return {
      tc_id:       tc.tc_id,
      name:        (tc.title || '').replace(/^E2E-[A-Z0-9-]+\s*/, ''),
      status:      (tc.status || 'unknown').toUpperCase(),
      duration:    tc.duration_ms || tc.duration || 0,
      steps:       (tc.steps || []).map(s => typeof s === 'string' ? s : (s.title || '')),
      screenshots,
      error:       tc.error || null,
    };
  });
}

// ── Refresh real.json from raw Playwright JSON (if raw is newer) ──────────────
// This ensures the report reflects the actual last run regardless of whether
// specs were launched individually or via --project=e2e-suite.

function collectRawTests(node) {
  const out = [];
  // Collect spec-level entries — title lives on the spec, not inside tests[]
  if (node.specs && node.specs.length) {
    for (const sp of node.specs) {
      out.push({
        title:   sp.title || '',
        results: (sp.tests || []).flatMap(t => t.results || []),
      });
      // Recurse: specs can have nested suites
      if (sp.suites && sp.suites.length) {
        for (const s of sp.suites) out.push(...collectRawTests(s));
      }
    }
  }
  // Recurse into nested suites at current level
  if (node.suites && node.suites.length) {
    for (const s of node.suites) out.push(...collectRawTests(s));
  }
  return out;
}

function rawStatusToNew(pwSt) {
  if (pwSt === 'passed')  return 'passed';
  if (pwSt === 'skipped') return 'skipped';
  return 'failed';
}
function rawStatusToOld(pwSt) {
  if (pwSt === 'passed')  return 'PASSED';
  if (pwSt === 'skipped') return 'SKIPPED';
  return 'FAILED';
}

function refreshRealFromRaw(specId, rawTests) {
  const realPath = path.join(RESULTS_DIR, `test-results-${specId}-real.json`);
  if (!rawTests.length || !fs.existsSync(realPath)) return;

  const real = JSON.parse(fs.readFileSync(realPath, 'utf8'));
  const now  = new Date().toISOString();

  if (real.results) {
    // Old format — results[] with uppercase status
    let p = 0, f = 0, sk = 0;
    real.results = real.results.map(r => {
      const match = rawTests.find(t => t.title && t.title.includes(r.tc_id));
      if (!match) return r;
      const res  = match.results && match.results[0];
      const st   = rawStatusToOld(res ? res.status : 'failed');
      // Collect ALL soft-assertion errors (not just errors[0])
      const allErrors = (res && res.errors) ? res.errors.map(e => e.message || '').filter(Boolean) : [];
      const errMsg = allErrors.join('\n\n===SOFT-BREAK===\n\n');
      if (st === 'PASSED') p++; else if (st === 'SKIPPED') sk++; else f++;
      // Rebuild steps from raw Playwright JSON (dynamic specs — N markets/LLMs/categories)
      const rawSteps = (res && res.steps && res.steps.length)
        ? res.steps.map(s => s.title)
        : r.steps;
      // Rebuild failedSteps[] from step-level error flags (supports soft assertions)
      const failedSteps = (res && res.steps)
        ? res.steps.map((s, i) => s.error ? i : -1).filter(i => i >= 0)
        : [];
      // Rebuild screenshots from directory (auto-discovers dynamic filenames)
      const specShotsDir = path.join(REPORTS_DIR, `screenshots-${specId}`);
      const rawShots = fs.existsSync(specShotsDir)
        ? fs.readdirSync(specShotsDir)
            .filter(f => f.startsWith(r.tc_id + '_') && f.endsWith('.png'))
            .sort()
            .map(f => `screenshots-${specId}/${f}`)
        : r.screenshots;
      return { ...r, status: st, duration: res ? res.duration : 0, error: errMsg || null,
               failedSteps, steps: rawSteps, screenshots: rawShots };
    });
    real.passed = p; real.failed = f; real.skipped = sk;
    real.total  = real.results.length;
    real.success_rate   = real.total ? ((p / real.total) * 100).toFixed(1) + '%' : '0%';
    real.execution_date = now;

  } else if (real.testcases || real.testCases) {
    // New format — testcases[] or testCases[] with lowercase status
    const tcKey = real.testCases ? 'testCases' : 'testcases';
    let p = 0, f = 0, sk = 0;
    real[tcKey] = real[tcKey].map(tc => {
      const match = rawTests.find(t => t.title && t.title.includes(tc.tc_id));
      if (!match) {
        if (tc.status === 'passed') p++; else if (tc.status === 'skipped') sk++; else f++;
        return tc;
      }
      const res    = match.results && match.results[0];
      const st     = rawStatusToNew(res ? res.status : 'failed');
      const errMsg = (res && res.errors && res.errors[0] && res.errors[0].message) || '';
      if (st === 'passed') p++; else if (st === 'skipped') sk++; else f++;
      return { ...tc, status: st, duration_ms: res ? res.duration : 0,
               error: st === 'failed' ? errMsg : (tc.error || '') };
    });
    real.passed = p; real.failed = f; real.skipped = sk;
    real.total  = real[tcKey].length;
    real.generated = now;
  }

  fs.writeFileSync(realPath, JSON.stringify(real, null, 2));
  console.log(`[refresh] ${specId} → passed=${real.passed} failed=${real.failed} skipped=${real.skipped || 0}`);
}

// 1. Combined e2e-suite raw JSON (produced by --project=e2e-suite)
const eSuiteRawPath = path.join(ROOT, '.claude/Data/raw/playwright/test-results-e2e-suite-raw.json');
if (fs.existsSync(eSuiteRawPath)) {
  const eSuiteRaw = JSON.parse(fs.readFileSync(eSuiteRawPath, 'utf8'));
  for (const spec of E2E_SPECS) {
    // Each top-level suite corresponds to one spec file
    const matchSuite = (eSuiteRaw.suites || []).find(s =>
      (s.file || s.title || '').includes(spec.id)
    );
    if (matchSuite) refreshRealFromRaw(spec.id, collectRawTests(matchSuite));
  }
}

// 2. Per-spec raw JSONs (produced by individual runs)
// GUARD: skip if the individual raw is OLDER than the e2e-suite raw.
// Without this check, a stale individual raw (e.g. a previous run where a test timedOut)
// would silently overwrite the correct result produced by pass 1 above.
const eSuiteMtime = fs.existsSync(eSuiteRawPath) ? fs.statSync(eSuiteRawPath).mtimeMs : 0;
for (const spec of E2E_SPECS) {
  const rawPath  = path.join(ROOT, `.claude/Data/raw/playwright/test-results-${spec.id}-raw.json`);
  const realPath = path.join(RESULTS_DIR, spec.file);
  if (!fs.existsSync(rawPath) || !fs.existsSync(realPath)) continue;
  if (eSuiteMtime > 0 && fs.statSync(rawPath).mtimeMs < eSuiteMtime) {
    console.log(`[skip-stale-raw] ${spec.id} — individual raw older than e2e-suite raw, keeping suite results`);
    continue;
  }
  const raw      = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
  const rawTests = (raw.suites || []).flatMap(s => collectRawTests(s));
  refreshRealFromRaw(spec.id, rawTests);
}

// ── Load real.json files ──────────────────────────────────────────────────────
const suiteFile = path.join(RESULTS_DIR, 'test-results-e2e-suite-real.json');
let specsData = [];

if (fs.existsSync(suiteFile)) {
  const suite = JSON.parse(fs.readFileSync(suiteFile, 'utf8'));
  specsData = E2E_SPECS.map(spec => ({
    spec,
    results: suite.results.filter(r =>
      spec.id === 'create-default-analysis'      ? r.tc_id.startsWith('E2E-CREATE-DEFAULT') :
      spec.id === 'verify-analysis'              ? r.tc_id.startsWith('E2E-VERIFY')           :
      spec.id === 'category-question-analysis'   ? r.tc_id.startsWith('E2E-QA-TC')           : false
    ),
  }));
} else {
  for (const spec of E2E_SPECS) {
    const filePath = path.join(RESULTS_DIR, spec.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠  Missing: ${spec.file} — spec "${spec.id}" shown as NOT RUN`);
      specsData.push({ spec, results: [] });
    } else {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const categoryName = data.profile_meta && data.profile_meta.category_name;
      const effectiveSpec = categoryName && spec.label.includes('{CATEGORY}')
        ? { ...spec, label: spec.label.replace('{CATEGORY}', categoryName) }
        : { ...spec, label: spec.label.replace('{CATEGORY}', 'luxury handbags') };
      specsData.push({ spec: effectiveSpec, results: normalizeResults(data, spec) });
    }
  }
}

// ── Global stats ──────────────────────────────────────────────────────────────
const allResults   = specsData.flatMap(s => s.results);
let total = 0, passed = 0, failed = 0, skipped = 0, durationMs = 0;
for (const r of allResults) {
  total++;
  if (r.status === 'PASSED')  passed++;
  if (r.status === 'FAILED')  failed++;
  if (r.status === 'SKIPPED') skipped++;
  durationMs += r.duration || 0;
}
const rate       = total ? (passed / total * 100).toFixed(1) : '0.0';
const duration   = (durationMs / 1000).toFixed(1);
const totalSteps = allResults.reduce((acc, r) => acc + (r.steps ? r.steps.length : 0), 0);

// ── Verdict (same logic as multi-epic) ───────────────────────────────────────
function getVerdict(r) {
  const pct = parseFloat(r);
  if (pct >= 80) return { color: '#16a34a', label: 'GO',          cls: 'verdict-go' };
  if (pct >= 60) return { color: '#f59e0b', label: 'CONDITIONAL', cls: 'verdict-cond' };
  return              { color: '#dc2626', label: 'NO-GO',        cls: 'verdict-nogo' };
}
const verdict = getVerdict(rate);

// ── Output directory (declared early so renderTc can resolve screenshot paths) ─
const ARCHIVE_DIR = path.join(REPORTS_DIR, 'runs', TIMESTAMP);
fs.mkdirSync(ARCHIVE_DIR, { recursive: true });

// ── HTML helpers (same as multi-epic) ────────────────────────────────────────
const esc = s => (s || '').toString()
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Strip ANSI escape codes from error strings
const stripAnsi = s => (s || '').replace(/\x1b\[[0-9;]*m/g, '').replace(/␛\[[0-9;]*m/g, '');

// Render error block — detects Expected/Received diffs and formats them cleanly
function renderError(rawError) {
  if (!rawError) return '';
  const clean = stripAnsi(rawError);
  const lines = clean.split('\n');

  // ── Detect "Malformed: [...]" custom toEqual assertion ──────────────────────
  // e.g. "Error: Panel source rows must ... Malformed: [{...}]\n\nexpect(received).toEqual..."
  const malformedMatch = clean.match(/Malformed:\s*(\[[\s\S]*?\])\s*(?:\n|$)/);
  if (malformedMatch) {
    // User message = first line up to (and including) the sentence before "Malformed:"
    const userMsg = (lines[0] || '').replace(/\s*Malformed:.*$/, '').trim();
    let malformedItems = [];
    try { malformedItems = JSON.parse(malformedMatch[1]); } catch(e) {}
    const count = malformedItems.length;

    // Summarise each malformed item: show which fields are missing/empty
    const itemSummaries = malformedItems.map((item, idx) => {
      const issues = [];
      if (!item.title)                              issues.push('missing title');
      if (!item.subtitle)                           issues.push('missing subtitle');
      if (!item.publisherLogoVisible)               issues.push('publisher logo hidden');
      if (!item.publisherLogoAlt && item.publisherLogoVisible) issues.push('publisher logo alt empty');
      if (!item.llmLogos || !item.llmLogos.length)  issues.push('no LLM logo img');
      if (!item.linkVisible)                        issues.push('nav link hidden');
      const titleStr = item.title ? `"${item.title}"` : `row ${idx + 1}`;
      const issueStr = issues.length ? issues.join(', ') : 'unknown issue';
      return `<div style="margin-bottom:6px;padding:6px 10px;background:#fff7ed;border:1px solid #fdba74;border-radius:4px">
        <span style="font-weight:600;color:#92400e;font-size:11px">${esc(titleStr)}</span>
        <span style="color:#78350f;font-size:11px"> — ${esc(issueStr)}</span>
      </div>`;
    }).join('');

    return `<div class="err-block" style="margin-bottom:14px">
      <div class="err-label">Error details</div>
      <div style="margin-bottom:10px;font-size:12px;color:#991b1b;font-weight:600">${esc(userMsg)}</div>
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px">
        <span style="background:#fef2f2;border:1px solid #fca5a5;border-radius:4px;padding:3px 10px;font-size:11px">
          <span style="font-size:9px;font-weight:700;text-transform:uppercase;color:#dc2626;margin-right:5px">Expected</span>
          <span style="color:#7f1d1d">0 malformed rows</span>
        </span>
        <span style="color:#94a3b8;font-size:12px">→</span>
        <span style="background:#fff7ed;border:1px solid #fdba74;border-radius:4px;padding:3px 10px;font-size:11px">
          <span style="font-size:9px;font-weight:700;text-transform:uppercase;color:#ea580c;margin-right:5px">Received</span>
          <span style="color:#7c2d12">${count} malformed row${count > 1 ? 's' : ''}</span>
        </span>
      </div>
      ${itemSummaries}
    </div>`;
  }

  // Extract the main message (first non-empty line)
  const msgLine = lines[0] || '';

  // Detect Expected / Received pattern
  const expLine   = lines.find(l => l.startsWith('Expected:'));
  const recvLine  = lines.find(l => l.startsWith('Received:'));

  // Code location (lines with > and |)
  const codeLines = lines.filter(l => /^\s*(>?\s*\d+\s*\||\s+\^)/.test(l)).slice(0, 6);

  if (expLine && recvLine) {
    const expVal  = expLine.replace(/^Expected:\s*/, '').replace(/^"|"$/g, '');
    const recvVal = recvLine.replace(/^Received:\s*/, '').replace(/^"|"$/g, '');
    return `<div class="err-block" style="margin-bottom:14px">
      <div class="err-label">Error details</div>
      <div style="margin-bottom:8px;font-size:12px;color:#991b1b;font-weight:600">${esc(msgLine)}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px">
        <span style="background:#fef2f2;border:1px solid #fca5a5;border-radius:4px;padding:3px 10px;font-size:11px;white-space:nowrap">
          <span style="font-size:9px;font-weight:700;text-transform:uppercase;color:#dc2626;margin-right:5px">Expected</span><span style="color:#7f1d1d">${esc(expVal)}</span>
        </span>
        <span style="color:#94a3b8;font-size:12px">→</span>
        <span style="background:#f0fdf4;border:1px solid #86efac;border-radius:4px;padding:3px 10px;font-size:11px;white-space:nowrap">
          <span style="font-size:9px;font-weight:700;text-transform:uppercase;color:#16a34a;margin-right:5px">Received</span><span style="color:#14532d">${esc(recvVal)}</span>
        </span>
      </div>
    </div>`;
  }

  // Visibility assertion (toBeVisible / toBeHidden) — Expected: visible/hidden, no Received line
  const locatorLine = lines.find(l => l.trim().startsWith('Locator:'));
  const expVisLine  = lines.find(l => /^Expected:\s*(visible|hidden)/i.test(l.trim()));
  if (expVisLine) {
    const expVal    = expVisLine.replace(/^Expected:\s*/i, '').trim();
    const notFound  = /element\(s\) not found|unexpected value/i.test(clean) ? 'element not found' : 'not ' + expVal;
    const locatorTxt = locatorLine ? locatorLine.replace(/^Locator:\s*/, '').trim() : '';
    return `<div class="err-block" style="margin-bottom:14px">
      <div class="err-label">Error details</div>
      <div style="margin-bottom:8px;font-size:12px;color:#991b1b;font-weight:600">${esc(msgLine)}</div>
      ${locatorTxt ? `<div style="margin-bottom:8px;font-size:11px;color:#64748b;font-family:monospace;background:#f8fafc;border:1px solid #e2e8f0;border-radius:4px;padding:6px 8px;word-break:break-all">${esc(locatorTxt)}</div>` : ''}
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <span style="background:#fef2f2;border:1px solid #fca5a5;border-radius:4px;padding:3px 10px;font-size:11px;white-space:nowrap">
          <span style="font-size:9px;font-weight:700;text-transform:uppercase;color:#dc2626;margin-right:5px">Expected</span><span style="color:#7f1d1d">${esc(expVal)}</span>
        </span>
        <span style="color:#94a3b8;font-size:12px">→</span>
        <span style="background:#fff7ed;border:1px solid #fdba74;border-radius:4px;padding:3px 10px;font-size:11px;white-space:nowrap">
          <span style="font-size:9px;font-weight:700;text-transform:uppercase;color:#ea580c;margin-right:5px">Actual</span><span style="color:#7c2d12">${esc(notFound)}</span>
        </span>
      </div>
    </div>`;
  }

  // Fallback — show message + code snippet only (no raw dump)
  const snippet = codeLines.length ? `<pre style="margin:6px 0 0;font-size:10px;color:#475569;white-space:pre-wrap;word-break:break-all">${esc(codeLines.join('\n'))}</pre>` : '';
  return `<div class="err-block" style="margin-bottom:14px"><div class="err-label">Error details</div><div style="font-size:12px;color:#991b1b;font-weight:600;margin-bottom:4px">${esc(msgLine)}</div>${snippet}</div>`;
}

function renderSkipReason(rawReason) {
  if (!rawReason) return '';
  const clean = stripAnsi(rawReason);

  const userMsgMatch = clean.match(/^Error:\s+(.+?)(?:\s+expect\(|\s+\[|$)/m);
  const userMsg = userMsgMatch ? userMsgMatch[1].trim() : '';

  const failMatch = clean.match(/\.(to\w+)\(\)\s+failed/);
  const failType = failMatch ? failMatch[1] : '';

  const locMatch = clean.match(/Locator:\s+locator\(([^\n)]+)\)/);
  const locator = locMatch ? locMatch[1].trim() : '';

  const notFound = /element\(s\)? not found|elements? not found/i.test(clean);
  const timeout = clean.match(/Timeout:\s*(\d+)ms/);
  const timeoutMs = timeout ? timeout[1] : '';

  const expMatch = clean.match(/Expected[^\n]*:\s*"?([^\n"]+)"?/);
  const recMatch = clean.match(/Received[^\n]*:\s*"?([^\n"]+)"?/);

  let html = '';

  if (userMsg) {
    html += `<div style="font-size:13px;color:#92400e;font-weight:600;margin-bottom:8px;line-height:1.4">${esc(userMsg)}</div>`;
  }

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

  if (!userMsg && !chips.length && !expMatch) {
    const firstLine = clean.split('\n').map(l => l.trim())
      .find(l => l && !l.startsWith('at ') && !l.match(/^\d+ \|/) && !l.startsWith('Call log')) || clean.slice(0, 200);
    html += `<div style="font-size:12px;color:#78350f;line-height:1.5">${esc(firstLine)}</div>`;
  }

  return html;
}

function renderStep(s) {
  const m    = s.match(/^(Given|When|Then|And)\s+(.*)$/i);
  const kw   = m ? m[1] : '';
  const rest = m ? m[2] : s;
  const color = kw === 'Given' ? '#2563eb'
              : kw === 'When'  ? '#d97706'
              : kw === 'Then'  ? '#16a34a'
                               : '#64748b';
  return `<div class="step">${kw ? `<span class="kw" style="color:${color}">${kw}</span> ` : ''}${esc(rest)}</div>`;
}

function renderShots(specShotsDir, tc) {
  // Use the screenshots array from real.json (one per step, numbered).
  const shots = (tc.screenshots || []).filter(Boolean);
  if (!shots.length) return '<div style="font-size:12px;color:#94a3b8">No screenshots available.</div>';

  const shot = (filePath, lbl, color) => {
    // filePath is relative to report root: "screenshots-xxx/filename.png"
    const basename = path.basename(filePath);
    return `<div class="shot">
      <div class="shot-lbl" style="background:${color}">${esc(lbl)}</div>
      <a href="${filePath}" target="_blank">
        <img src="${filePath}" alt="${esc(basename)}" loading="lazy"
             onerror="this.outerHTML='&lt;div class=\\'shot-missing\\'&gt;(screenshot missing)&lt;/div&gt;'">
      </a>
      <div class="shot-name">${esc(basename)}</div>
    </div>`;
  };

  const isFail = tc.status === 'FAILED';
  // Color-code: first = Given (blue), last = Then (green or red if fail), rest = When (amber)
  const shotsHtml = shots.map((p, i) => {
    const lbl   = path.basename(p, '.png').replace(/^[^_]+_\d+_/, '').replace(/_/g, ' ');
    const color = i === 0             ? '#2563eb'
                : i === shots.length - 1 ? (isFail ? '#dc2626' : '#16a34a')
                : '#d97706';
    return shot(p, lbl, color);
  }).join('');

  return `<div class="shots">${shotsHtml}</div>`;
}

function renderTc(spec, r) {
  const isFail   = r.status === 'FAILED';
  const isSkip   = r.status === 'SKIPPED';
  const badgeCls = isFail ? 'badge-fail' : isSkip ? 'badge-skip' : 'badge-pass';
  const cardCls  = isFail ? 'card-fail'  : isSkip ? 'card-skip'  : 'card-pass';
  const steps    = r.steps || [];
  const shots    = r.screenshots || [];
  // Failed SCs are expanded by default so bugs are immediately visible
  const openAttr = isFail ? ' open' : '';

  // SC header as <summary> — clicking it toggles the detail body
  const header = `<summary class="tc-hd">
    <span class="tc-id">${esc(r.tc_id)}</span>
    <span class="tc-name">${esc(r.name)}</span>
    <span class="badge ${badgeCls}">${r.status}</span>
    <span class="tc-dur">${(r.duration / 1000).toFixed(1)}s</span>
  </summary>`;

  // Error block — split on soft-assertion separator to render each error independently
  const errBlock = isFail && r.error
    ? r.error.split('\n\n===SOFT-BREAK===\n\n').filter(Boolean).map(renderError).join('')
    : '';

  // Skip reason block
  const skipReason = isSkip && r.error ? (r.error || '').replace(/^SKIPPED\s*[—–-]+\s*/i, '').trim() : '';
  const skipBlock = skipReason
    ? `<div style="margin-bottom:14px;padding:10px 14px;background:#fffbeb;border-left:3px solid #d97706;border-radius:0 6px 6px 0">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#92400e;margin-bottom:8px">Skip reason</div>
        ${renderSkipReason(skipReason)}
      </div>`
    : '';

  // ── Steps (text only, no embedded screenshot) ─────────────────────────────
  const failedStepSet = new Set(r.failedSteps || (isFail ? [steps.length - 1] : []));
  const stepCards = steps.map((s, i) => {
    const kwMatch  = s.match(/^(Given|When|Then|And|But)/i);
    const kw       = kwMatch ? kwMatch[0] : 'Step';
    const stepText = s.replace(/^(Given|When|Then|And|But):?\s*/i, '');
    const kwColor  = kw === 'Given' ? '#2563eb'
                   : kw === 'When'  ? '#d97706'
                   : kw === 'Then'  ? '#16a34a'
                   : kw === 'And'   ? '#6366f1'
                                    : '#64748b';
    const isFailStep = failedStepSet.has(i);
    const cardBg     = isFailStep ? '#fff8f8' : '#f8fafc';
    const cardBorder = isFailStep ? '#dc2626'  : kwColor;
    const failTag    = isFailStep ? ' <span style="font-size:10px;font-weight:700;color:#dc2626;margin-left:6px">✘ FAILED</span>' : '';

    return `<div style="border-left:3px solid ${cardBorder};background:${cardBg};border-radius:0 6px 6px 0;padding:10px 14px;margin-bottom:8px">
      <div style="display:flex;align-items:baseline;gap:8px">
        <span style="font-weight:700;color:${kwColor};font-size:12px;text-transform:capitalize;min-width:44px">${esc(kw)}</span>
        <span style="font-size:13px;color:#0f172a">${esc(stepText)}${failTag}</span>
        <span style="font-size:10px;color:#94a3b8;margin-left:auto">Step ${i + 1}</span>
      </div>
    </div>`;
  }).join('');

  // ── Screenshots gallery ────────────────────────────────────────────────────
  // The last screenshot of a FAILED SC is the annotated failure shot (red border on buggy element).
  const shotsHtml = shots.map((shotPath, idx) => {
    if (!shotPath) return '';
    const exists = fs.existsSync(path.join(ARCHIVE_DIR, shotPath));
    if (!exists) return '';
    const basename   = path.basename(shotPath);
    const isLastFail = isFail && idx === shots.length - 1;
    const imgStyle = isLastFail
      ? 'width:200px;max-width:100%;border-radius:6px;border:2px solid #dc2626;box-shadow:0 0 0 3px rgba(220,38,38,0.25);display:block'
      : 'width:200px;max-width:100%;border-radius:6px;border:1px solid #e2e8f0;display:block';
    const lbl      = path.basename(shotPath, '.png').replace(/^[^_]+_\d+_/, '').replace(/_/g, ' ');
    const lblText  = isLastFail ? 'Then (FAIL)' : lbl;
    const lblColor = isLastFail ? '#dc2626' : (idx === 0 ? '#2563eb' : '#d97706');
    return `<div class="shot">
      <div class="shot-lbl" style="background:${lblColor}">${esc(lblText)}</div>
      <a href="${shotPath}" target="_blank">
        <img src="${shotPath}" alt="${esc(basename)}" loading="lazy" style="${imgStyle}"
             onerror="this.outerHTML='<div class=\\'shot-missing\\'>screenshot missing</div>'">
      </a>
      <div class="shot-name">${esc(basename)}</div>
    </div>`;
  }).filter(Boolean).join('');

  const shotsBlock = shotsHtml
    ? `<div style="margin-top:12px;border-top:1px solid #e2e8f0;padding-top:12px">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:8px">Screenshots</div>
        <div style="display:flex;flex-wrap:wrap;gap:10px">${shotsHtml}</div>
      </div>`
    : '';

  return `<details class="tc-card ${cardCls}"${openAttr}>
    ${header}
    <div class="tc-body">
      ${errBlock}
      ${skipBlock}
      ${stepCards}
      ${shotsBlock}
    </div>
  </details>`;
}

function renderSpec({ spec, results }) {
  const p   = results.filter(r => r.status === 'PASSED').length;
  const f   = results.filter(r => r.status === 'FAILED').length;
  const s   = results.filter(r => r.status === 'SKIPPED').length;
  const tot = results.length;
  const r   = tot ? (p / tot * 100).toFixed(1) : '0.0';
  const v   = getVerdict(r);
  const tcCards = results.length > 0
    ? results.map(tc => renderTc(spec, tc)).join('')
    : `<div style="padding:12px;color:#94a3b8;font-size:13px">Spec non exécutée — lancez le test individuellement.</div>`;
  return `<details class="epic-block">
    <summary class="epic-hd" style="border-left-color:${v.color}">
      <span class="epic-id">${esc(spec.id)}</span>
      <span class="epic-title">${esc(spec.label)}</span>
      <span class="epic-stats">
        <span class="es-total">${tot} test${tot > 1 ? 's' : ''}</span>
        <span class="es-pass">${p} ✓</span>
        ${f > 0 ? `<span class="es-fail">${f} ✘</span>` : ''}
        ${s > 0 ? `<span class="es-skip">${s} -</span>` : ''}
        <span class="es-rate">${r}%</span>
        <span class="es-verdict" style="color:${v.color};border-color:${v.color}">${v.label}</span>
      </span>
    </summary>
    <div class="epic-body">
      <div class="epic-meta">${tot} E2E test case${tot > 1 ? 's' : ''}</div>
      ${tcCards}
    </div>
  </details>`;
}

// ── Copy screenshots BEFORE HTML generation (existsSync checks need them) ────
for (const { spec } of specsData) {
  const src = path.join(REPORTS_DIR, spec.shots);
  const dst = path.join(ARCHIVE_DIR, spec.shots);
  if (fs.existsSync(src)) fs.cpSync(src, dst, { recursive: true });
}

// ── Full HTML (same structure as build-multi-epic-report.js) ──────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GEO QA &mdash; E2E Suite</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.45}
  main{max-width:1200px;margin:0 auto;padding:32px 24px 64px}
  section.report-section{background:white;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:24px 28px;margin-bottom:24px}
  .section-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#64748b;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}

  /* ── Section 1 : Global summary (blue) ── */
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

  /* ── Section 2 : Stats ── */
  .report-section.section-stats{padding:14px 18px}
  .report-section.section-stats .section-title{margin-bottom:10px;padding-bottom:6px;font-size:11px}
  .stats-row{display:grid;grid-template-columns:repeat(9,1fr);gap:8px}
  .stat{padding:8px 10px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;text-align:center}
  .stat-label{font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:.04em;font-weight:600;margin-bottom:4px;line-height:1.2;min-height:20px;display:flex;align-items:center;justify-content:center}
  .stat-value{font-size:18px;font-weight:800;line-height:1}
  .stat-pass .stat-value{color:#16a34a}
  .stat-fail .stat-value{color:#dc2626}
  .stat-skip .stat-value{color:#64748b}
  .stat-rate .stat-value{color:${verdict.color}}
  @media(max-width:1100px){.stats-row{grid-template-columns:repeat(4,1fr)}}

  /* ── Section 3 : Per-spec detail ── */
  details{transition:background .15s}
  details>summary{cursor:pointer;list-style:none;outline:none}
  details>summary::-webkit-details-marker{display:none}
  details>summary::before{content:"▶";display:inline-block;margin-right:10px;color:#94a3b8;font-size:11px;transition:transform .2s}
  details[open]>summary::before{transform:rotate(90deg)}

  .epic-block{border:1px solid #e2e8f0;border-radius:10px;margin-bottom:14px;background:white;overflow:hidden}
  .epic-block[open]{box-shadow:0 4px 12px rgba(0,0,0,.06)}
  .epic-hd{padding:16px 20px 16px 16px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;border-left:5px solid;background:#f8fafc;font-weight:600}
  .epic-block[open] .epic-hd{background:white;border-bottom:1px solid #e2e8f0}
  .epic-id{font-family:monospace;font-size:12px;font-weight:700;color:#0f172a;background:#e2e8f0;padding:3px 10px;border-radius:4px}
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

  .tc-card{border-left:3px solid;border-radius:6px;margin-bottom:8px;background:#fafbfc;overflow:hidden}
  .tc-card.card-pass{border-color:#16a34a}
  .tc-card.card-fail{border-color:#dc2626;background:#fff8f8}
  .tc-card.card-skip{border-color:#94a3b8;background:#f8fafc}
  /* SC card accordion */
  details.tc-card>summary{cursor:pointer;list-style:none;outline:none}
  details.tc-card>summary::-webkit-details-marker{display:none}
  details.tc-card>summary::before{content:"▶";display:inline-block;margin-right:8px;color:#94a3b8;font-size:10px;transition:transform .2s;flex-shrink:0}
  details.tc-card[open]>summary::before{transform:rotate(90deg)}
  details.tc-card[open] .tc-hd{border-bottom:1px solid #f1f5f9}
  .tc-hd{padding:9px 14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:13px}
  .tc-id{font-family:monospace;font-weight:700;color:#64748b;font-size:11px;min-width:160px}
  .tc-name{flex:1;color:#0f172a}
  .badge{font-size:10px;font-weight:700;padding:2px 10px;border-radius:20px;color:white;white-space:nowrap}
  .badge-pass{background:#16a34a}
  .badge-fail{background:#dc2626}
  .badge-skip{background:#94a3b8}
  .tc-dur{font-size:11px;color:#94a3b8;white-space:nowrap}
  .tc-body{padding:14px 18px 16px;background:white}

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

  <!-- ═══ Section 1 : Global summary ══════════════════════════════════════ -->
  <section class="report-section section-summary">
    <div class="section-title">E2E Suite</div>
    <div class="summary-row">
      <div>
        <div class="summary-title">GEO QA &mdash; E2E Analysis Suite</div>
        <div class="summary-line">
          Run executed on <strong>${todayIso}</strong> covering
          <strong>${E2E_SPECS.length}</strong> E2E spec${E2E_SPECS.length > 1 ? 's' : ''}:
        </div>
      </div>
      <div class="verdict-badge ${verdict.cls}">${verdict.label}</div>
    </div>
  </section>

  <!-- ═══ Section 2 : Global statistics ══════════════════════════════════ -->
  <section class="report-section section-stats">
    <div class="section-title">Global statistics</div>
    <div class="stats-row">
      <div class="stat"><div class="stat-label">E2E Specs</div><div class="stat-value">${E2E_SPECS.length}</div></div>
      <div class="stat"><div class="stat-label">Total test cases</div><div class="stat-value">${total}</div></div>
      <div class="stat stat-pass"><div class="stat-label">Passed</div><div class="stat-value">${passed}</div></div>
      <div class="stat stat-fail"><div class="stat-label">Failed</div><div class="stat-value">${failed}</div></div>
      <div class="stat stat-skip"><div class="stat-label">Skipped</div><div class="stat-value">${skipped}</div></div>
      <div class="stat stat-rate"><div class="stat-label">Success rate</div><div class="stat-value">${rate}%</div></div>
      <div class="stat"><div class="stat-label">Steps executed</div><div class="stat-value">${totalSteps}</div></div>
      <div class="stat"><div class="stat-label">Duration</div><div class="stat-value">${duration}<span style="font-size:11px;color:#94a3b8;font-weight:600;margin-left:2px">s</span></div></div>
      <div class="stat"><div class="stat-label">Environment</div><div class="stat-value" style="font-size:10px;color:#64748b;padding-top:4px">staging</div></div>
    </div>
  </section>

  <!-- ═══ Section 3 : Per-spec detail ════════════════════════════════════ -->
  <section class="report-section">
    <div class="section-title">Per-spec detail (click a spec to expand)</div>
    ${specsData.map(renderSpec).join('')}
  </section>

</main>
</body>
</html>`;

// ── Write report + copy screenshots ──────────────────────────────────────────
const OUT_FILE = path.join(ARCHIVE_DIR, 'EXECUTION_REPORT_REAL_e2e-suite.html');
fs.writeFileSync(OUT_FILE, html, 'utf8');

// Copy screenshots into the frozen run folder
let copiedShots = 0;
for (const { spec } of specsData) {
  const src = path.join(REPORTS_DIR, spec.shots);
  const dst = path.join(ARCHIVE_DIR, spec.shots);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dst, { recursive: true });
    copiedShots++;
  }
}

// Copy execution logs
const LOGS_DST = path.join(ARCHIVE_DIR, 'logs');
let copiedLogs = 0;
for (const { spec } of specsData) {
  const src = path.join(RESULTS_DIR, `execution-log-${spec.id}.txt`);
  if (fs.existsSync(src)) {
    if (!fs.existsSync(LOGS_DST)) fs.mkdirSync(LOGS_DST, { recursive: true });
    fs.copyFileSync(src, path.join(LOGS_DST, `execution-log-${spec.id}.txt`));
    copiedLogs++;
  }
}

console.log(`Wrote ${OUT_FILE} (+ ${copiedShots} screenshot folders, ${copiedLogs} logs)`);
console.log(`Verdict: ${verdict.label} (${rate}%) · ${passed}/${total} passed · ${duration}s`);
