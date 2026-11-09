// Parse raw Playwright JSON results into the "real" format consumed by build-reports.js.
// Pulls Given/When/Then strings from the CSV (exact text per STRICT rule).
// Usage: node parse-raw-to-real.js <epicId>
const fs = require('fs');
const path = require('path');

const epic = process.argv[2] || '102';
const RAW   = path.resolve(__dirname, `../raw/playwright/test-results-epic${epic}-raw.json`);

// CSV resolution: prefer the coverage format `testcases-coverage-epic{id}-*.csv`
// (single source of truth — most up-to-date date suffix wins). Fall back to the
// legacy alias `testcases - epic{id}.csv` for backward compatibility.
const CSV_DIR = path.resolve(__dirname, '../output/csv');
function resolveCsv() {
  const coverageMatches = fs.readdirSync(CSV_DIR)
    .filter(f => new RegExp(`^testcases-coverage-epic${epic}(?:-\\d+)?\\.csv$`).test(f)
              || new RegExp(`^testcases-coverage-epicGEO-${epic}(?:-\\d+)?\\.csv$`).test(f))
    .sort()                  // chronological
    .reverse();              // most recent first
  if (coverageMatches.length > 0) return path.join(CSV_DIR, coverageMatches[0]);
  const alias = path.join(CSV_DIR, `testcases - epic${epic}.csv`);
  if (fs.existsSync(alias)) return alias;
  throw new Error(`No CSV found for epic ${epic} in ${CSV_DIR} (looked for testcases-coverage-epic${epic}*.csv and testcases - epic${epic}.csv)`);
}
const CSV = resolveCsv();
console.log(`Using CSV: ${path.basename(CSV)}`);
// Parsed results + logs: a single shared folder for all epics.
const OUT_DIR = path.resolve(__dirname, `../processed/testcases/test-results`);
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
const REAL  = path.join(OUT_DIR, `test-results-epic${epic}-real.json`);
// Screenshots live in the deliverable folder, referenced as siblings of the HTML.
// Use forward slashes for cross-platform consistency (works on Windows + Unix).
const SHOTS = path.posix.join('.claude', 'Data', 'output', 'reports', `screenshots-epic${epic}`);

function parseCsvLine(line) {
  const out = []; let cur = ''; let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i+1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === ',' && !inQ) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

const csvRaw = fs.readFileSync(CSV, 'utf8').replace(/^\uFEFF/, '');
const csvLines = csvRaw.split(/\r?\n/).filter(l => l.trim() !== '');
const headers = parseCsvLine(csvLines[0]);
const idx = {
  tc_id: headers.indexOf('tc_id'),
  step:  headers.indexOf('Test step'),
};

const stepsByTc = new Map();
for (const line of csvLines.slice(1)) {
  const cols = parseCsvLine(line);
  const tc = cols[idx.tc_id]; const step = cols[idx.step];
  if (!tc || !step) continue;
  if (!stepsByTc.has(tc)) stepsByTc.set(tc, []);
  stepsByTc.get(tc).push(step);
}

const raw = JSON.parse(fs.readFileSync(RAW, 'utf8'));

// Flatten specs — Playwright nests them under suites
const specs = [];
(function walk(s) {
  (s.suites || []).forEach(walk);
  (s.specs  || []).forEach(sp => specs.push(sp));
})({ suites: raw.suites });

const STATUS_MAP = {
  expected: 'PASSED',
  passed:   'PASSED',
  failed:   'FAILED',
  skipped:  'SKIPPED',
  timedOut: 'FAILED',
  unexpected: 'FAILED',
  flaky:    'FAILED',
  interrupted: 'FAILED',
};

const results = specs.map(sp => {
  const title = sp.title;
  // Title formats accepted (both produce a hyphenated tc_id like "GEO-187-TC1"):
  //   - "GEO-187-TC001 - …" (epic 101/102 style, hyphen)
  //   - "GEO-187 TC1 - …"   (epic 174 style, space)
  const tcMatch = title.match(/(GEO-\d+)[-\s]+(TC\d+)/i);
  const tc_id = tcMatch ? `${tcMatch[1]}-${tcMatch[2]}` : title.split(' ')[0];
  const t = (sp.tests && sp.tests[0]) || {};
  const r = (t.results && t.results[0]) || {};
  let status = STATUS_MAP[t.status] || STATUS_MAP[r.status] || 'UNKNOWN';
  if (t.annotations && t.annotations.some(a => a.type === 'fixme')) status = 'SKIPPED';
  const err = r.error ? (r.error.message || '').replace(/\u001b\[[0-9;]*m/g, '').trim() : '';
  const shotBase = `${SHOTS}\\${tc_id}`;
  return {
    tc_id,
    name: title,
    status,
    duration: r.duration || 0,
    error: err,
    steps: stepsByTc.get(tc_id) || [],
    screenshots: [
      `${shotBase}_step1_given.png`,
      `${shotBase}_step2_when.png`,
      `${shotBase}_step3_then.png`,
    ],
  };
});

const counts = results.reduce((a, r) => (a[r.status] = (a[r.status] || 0) + 1, a), {});
const total = results.length;
const passed = counts.PASSED || 0;
const failed = counts.FAILED || 0;
const skipped = counts.SKIPPED || 0;
const duration_total_ms = results.reduce((a, r) => a + r.duration, 0);
const success_rate = total ? `${((passed / (total - skipped || 1)) * 100).toFixed(1)}%` : '0%';

const out = {
  epic,
  execution_date: raw.stats && raw.stats.startTime ? raw.stats.startTime : new Date().toISOString(),
  total,
  passed,
  failed,
  skipped,
  success_rate,
  duration_total_ms,
  results,
};

fs.writeFileSync(REAL, JSON.stringify(out, null, 2), 'utf8');
console.log(`Wrote ${REAL}`);
console.log(`total=${total} passed=${passed} failed=${failed} skipped=${skipped} success=${success_rate}`);
