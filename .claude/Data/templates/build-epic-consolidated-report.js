#!/usr/bin/env node
// Builds the consolidated MCP report of one epic from its run / rerun real.json files.
//
// Usage:
//   node .claude/Data/templates/build-epic-consolidated-report.js --version GEO-R1.4 --epic GEO-1226 \
//        --real a-real.json,b-rerun-real.json [--csv path.csv] [--note "text"] [--env "staging, QA-GEO, en-GB"]
//
// --real : real.json files in processed/testcases/test-results/, OLDEST FIRST. A later result replaces an
//          earlier one for the same tc_id, except a later SKIP never replaces an earlier PASS / FAIL / PARTIAL
//          (an attempt blocked by the environment does not erase a real result).
// --csv  : epic CSV; every TC of the CSV missing from the runs is listed as SKIP "not run".
// Output : .claude/Data/output/reports/runs/{VERSION}_{EPIC}_{DDMMYYYY-HHMM}/MCP-Report-{EPIC}-consolidated.html
//          + a copy of every screenshots-* folder the results point to.
// Success = (PASS + 0.5 x PARTIAL) / (total - SKIP); GO >= 80, CONDITIONAL 60-79, NO-GO < 60.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');
const RESULTS = path.join(ROOT, '.claude/Data/processed/testcases/test-results');
const REPORTS = path.join(ROOT, '.claude/Data/output/reports');
const COL = { PASS: '#16a34a', FAIL: '#dc2626', PARTIAL: '#d97706', SKIP: '#64748b' };
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
}
if (!args.version || !args.epic || !args.real) {
  console.error('Usage: --version GEO-R1.4 --epic GEO-1226 --real a-real.json,b-real.json [--csv file] [--note text] [--env text]');
  process.exit(1);
}
// BLOCKED (environment) and OBSOLETE (TC superseded) are not executed results: counted as SKIP, original status kept in the reason
const norm = s => (s === 'PASSED' ? 'PASS' : s === 'FAILED' ? 'FAIL' : ['SKIPPED', 'BLOCKED', 'OBSOLETE'].includes(s) ? 'SKIP' : s);

// Epic + story titles
let epicTitle = '', storyTitles = {};
const epicData = path.join(ROOT, 'apps/geo', args.version, args.epic, 'epic-data.json');
if (fs.existsSync(epicData)) {
  const e = JSON.parse(fs.readFileSync(epicData, 'utf8')).epic || {};
  epicTitle = e.title || '';
  for (const s of e.stories || []) storyTitles[s.id || s.key] = s.title;
}

// Merge results
const merged = new Map(), origins = [], shotDirs = new Set();
for (const f of String(args.real).split(',').map(s => s.trim()).filter(Boolean)) {
  const p = fs.existsSync(f) ? f : path.join(RESULTS, f);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const runFolder = j.run_folder ? path.basename(j.run_folder.replace(/[\\/]+$/, '')) : '';
  const origin = `${j.spec || path.basename(p)}${runFolder ? ' · run ' + runFolder : ''}`;
  origins.push({ origin, date: j.runDate || '', env: j.environment || '' });
  for (let r of j.results || []) {
    const st = norm(r.status);
    if (st === 'SKIP' && r.status !== st && r.status !== 'SKIPPED') r = { ...r, skip_reason: `${r.status}: ${r.skip_reason || r.error || r.notes || ''}`.replace(/: $/, '') };
    const prev = merged.get(r.tc_id);
    if (prev && st === 'SKIP' && prev.status !== 'SKIP') { prev.laterSkip = `${origin}: ${r.skip_reason || r.error || 'SKIP'}`; continue; }
    const shots = [...(r.screenshots || []), ...(r.extra_screenshots || [])];
    for (const s of shots) shotDirs.add(JSON.stringify({ dir: s.split('/')[0], runFolder }));
    merged.set(r.tc_id, { ...r, status: st, origin, shots, previous: prev ? `${prev.status} (${prev.origin})` : null });
  }
}

// TCs of the CSV that never ran
const csvTitles = {};
if (args.csv) {
  const txt = fs.readFileSync(args.csv, 'utf8');
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (q) { if (c === '"' && txt[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true; else if (c === ';') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && txt[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const h = rows[0], iName = h.indexOf('Test name'), iStory = h.indexOf('QA Story/Task');
  let story = '';
  for (const r of rows.slice(1)) {
    if (r[iStory]) story = r[iStory];
    const m = (r[iName] || '').match(/^(TC-[A-Z0-9-]+?-\d{3})\s*-\s*(.*)$/);
    if (!m) continue;
    csvTitles[m[1]] = m[2];
    if (!merged.has(m[1])) merged.set(m[1], { tc_id: m[1], title: m[2], story_id: story, status: 'SKIP', skip_reason: 'Not run in this campaign', steps: [], shots: [], origin: 'CSV' });
  }
}

// Group by story, count
const stories = new Map(), total = { PASS: 0, FAIL: 0, PARTIAL: 0, SKIP: 0 };
for (const r of [...merged.values()].sort((a, b) => a.tc_id.localeCompare(b.tc_id))) {
  const sid = r.story_id || (r.tc_id.match(/^TC-([A-Z]+-\d+)-/) || [])[1] || 'Other';
  if (!stories.has(sid)) stories.set(sid, []);
  stories.get(sid).push(r);
  total[r.status] = (total[r.status] || 0) + 1;
}
const n = total.PASS + total.FAIL + total.PARTIAL + total.SKIP;
const executed = n - total.SKIP;
const rate = executed ? (total.PASS + 0.5 * total.PARTIAL) / executed * 100 : 0;
const rateAll = n ? (total.PASS + 0.5 * total.PARTIAL) / n * 100 : 0;
const verdict = rate >= 80 ? 'GO' : rate >= 60 ? 'CONDITIONAL' : 'NO-GO';
const vcol = rate >= 80 ? '#16a34a' : rate >= 60 ? '#d97706' : '#dc2626';
const fmt = x => (Math.round(x * 10) / 10).toString();

// Output folder + screenshots
const d = new Date(), p2 = x => String(x).padStart(2, '0');
const ts = `${p2(d.getDate())}${p2(d.getMonth() + 1)}${d.getFullYear()}-${p2(d.getHours())}${p2(d.getMinutes())}`;
// --out: an existing consolidated folder of the epic, to add a second report (e.g. production, non-regression) beside the first
const out = path.join(REPORTS, 'runs', args.out || `${args.version}_${args.epic}_${ts}`);
if (fs.existsSync(out) && !args.out) { console.error('exists ' + out); process.exit(1); }
fs.mkdirSync(out, { recursive: true });
// Never overwrites: a file already copied from a newer folder wins
const copyDir = (s, t) => { fs.mkdirSync(t, { recursive: true }); for (const e of fs.readdirSync(s, { withFileTypes: true })) { const a = path.join(s, e.name), b = path.join(t, e.name); e.isDirectory() ? copyDir(a, b) : fs.existsSync(b) || fs.copyFileSync(a, b); } };
const missing = [];
for (const k of shotDirs) {
  const { dir, runFolder } = JSON.parse(k);
  const cands = [runFolder && path.join(REPORTS, 'runs', runFolder, dir), path.join(REPORTS, dir)].filter(Boolean);
  // No run_folder in the real.json: per-run folders (DDMMYYYY-HHMM) holding that screenshots dir, newest first.
  // A rerun can reuse the dir name with fewer files, so every folder found is merged (newest file wins).
  const key = n => n.replace(/^(\d{2})(\d{2})(\d{4})-(\d{4})$/, '$3$2$1$4');
  const runs = fs.readdirSync(path.join(REPORTS, 'runs')).filter(n => /^\d{8}-\d{4}$/.test(n)).sort((a, b) => key(b).localeCompare(key(a)));
  for (const r of runs) cands.push(path.join(REPORTS, 'runs', r, dir));
  const found = cands.filter(c => fs.existsSync(c));
  found.forEach(src => copyDir(src, path.join(out, dir)));
  if (!found.length && !fs.existsSync(path.join(out, dir))) missing.push(dir);
}
// Images the report points to that no folder holds
const lostImages = [...merged.values()].flatMap(r => r.shots || []).filter(p => !fs.existsSync(path.join(out, p)));

// HTML
const css = `:root{--bg:#f8fafc;--card:#fff;--text:#0f172a;--muted:#475569;--line:#e5e7eb}@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#0b1220;--card:#111a2e;--text:#e5e7eb;--muted:#94a3b8;--line:#243049}}:root[data-theme="dark"]{--bg:#0b1220;--card:#111a2e;--text:#e5e7eb;--muted:#94a3b8;--line:#243049}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:14px/1.5 system-ui,sans-serif}.hero{background:linear-gradient(135deg,#1e3a8a,#2563eb);color:#fff;padding:20px 22px}.hero h1{margin:0 0 6px;font-size:22px}.v{display:inline-block;padding:4px 12px;border-radius:8px;font-weight:800;color:#fff}
.wrap{max-width:1200px;margin:0 auto;padding:16px}.stats{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}.stat{flex:1 1 110px;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 12px;color:var(--muted)}.stat b{display:block;font-size:20px;color:var(--text)}
details.st{background:var(--card);border:1px solid var(--line);border-radius:10px;margin:12px 0}details.st>summary{padding:12px 14px;cursor:pointer}details.tc{border-top:1px solid var(--line);padding:0 14px}details.tc>summary{padding:10px 0;cursor:pointer}
.badge,.pill{display:inline-block;color:#fff;font-size:11px;font-weight:700;padding:1px 8px;border-radius:999px;background:#64748b}.badge:not([style]){background:#334155}.pill.sm{font-size:10px}.note{background:rgba(37,99,235,.08);border-radius:8px;padding:8px 10px;font-size:13px}.err{background:#fef2f2;color:#7f1d1d;border:1px solid #fecaca;border-radius:8px;padding:8px 10px}
ol li{margin:6px 0}small{color:var(--muted)}.shots{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;margin:8px 0 14px}img{max-width:100%;border:1px solid #e5e7eb;border-radius:6px}`;
const envText = args.env || [...new Set(origins.map(o => o.env).filter(Boolean))][0] || '';
const dates = [...new Set(origins.map(o => o.date).filter(Boolean))].join(', ');
let h = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(args.epic)}${args.label ? ' ' + esc(args.label) : ''} Consolidated Run</title><style>${css}</style></head><body>
<div class="hero"><h1>${esc(args.epic)}${args.label ? ' ' + esc(args.label) : ''} — MCP Playwright runs, consolidated</h1><div>${esc(epicTitle)} · ${esc(args.version)} · consolidated report of ${origins.length} run(s) (${esc(origins.map(o => o.origin).join('; '))}) · ${esc(dates)}${envText ? ' · ' + esc(envText) : ''}</div>
<p><span class="v" style="background:${vcol}">${verdict} — ${fmt(rate)}%</span> &nbsp; formula (PASS + 0.5×PARTIAL) / (total − SKIP) · ${fmt(rateAll)}% with SKIP counted</p></div>
<div class="wrap"><div class="stats"><div class="stat"><b>${n}</b>Total</div><div class="stat"><b>${total.PASS}</b>PASS</div><div class="stat"><b>${total.FAIL}</b>FAIL</div><div class="stat"><b>${total.PARTIAL}</b>PARTIAL</div><div class="stat"><b>${total.SKIP}</b>SKIP</div><div class="stat"><b>${fmt(rate)}%</b>Success rate</div></div>
`;
if (args.note) h += `<p class="note">${esc(args.note)}</p>\n`;
for (const [sid, list] of stories) {
  const c = { PASS: 0, FAIL: 0, PARTIAL: 0, SKIP: 0 };
  list.forEach(r => c[r.status]++);
  h += `<details class="st" open><summary><b>${esc(sid)}</b> ${esc(storyTitles[sid] || '')} <span class="badge">${list.length} TC</span>`;
  for (const k of ['PASS', 'FAIL', 'PARTIAL', 'SKIP']) if (c[k]) h += ` <span class="badge" style="background:${COL[k]}">${c[k]} ${k}</span>`;
  h += '</summary>';
  for (const r of list) {
    h += `<details class="tc"><summary><span class="pill" style="background:${COL[r.status]}">${r.status}</span> <b>${esc(r.tc_id)}</b> ${esc(r.title || csvTitles[r.tc_id] || '')}</summary>`;
    if (r.error) h += `<p class="err"><b>Error:</b> ${esc(r.error)}</p>`;
    if (r.status === 'SKIP' && r.skip_reason) h += `<p class="note"><b>Skip reason:</b> ${esc(r.skip_reason)}</p>`;
    h += `<p class="note"><b>Notes:</b> [${esc(r.origin)}] ${esc(r.notes || '')}</p>`;
    if (r.previous) h += `<p class="note"><b>Previous result:</b> ${esc(r.previous)}</p>`;
    if (r.laterSkip) h += `<p class="note"><b>Later attempt not counted:</b> ${esc(r.laterSkip)}</p>`;
    h += '<ol>';
    for (const s of r.steps || []) {
      h += `<li><span class="pill sm" style="background:${COL[norm(s.status)] || COL.SKIP}">${esc(norm(s.status) || 'SKIP')}</span> ${esc(s.title)}`;
      if (s.data) h += `<br><small>Data: ${esc(s.data)}</small>`;
      if (s.expected) h += `<br><small>Expected: ${esc(s.expected)}</small>`;
      if (s.observed) h += `<br><small>Observed: ${esc(s.observed)}</small>`;
      h += '</li>';
    }
    h += '</ol><div class="shots">' + r.shots.map(p => `<a href="${esc(p)}" target="_blank"><img loading="lazy" src="${esc(p)}"></a>`).join('') + '</div></details>';
  }
  h += '</details>\n';
}
h += '</div></body></html>\n';
const file = path.join(out, `MCP-Report-${args.epic}${args.label ? '-' + args.label : ''}-consolidated.html`);
if (fs.existsSync(file)) { console.error('exists ' + file); process.exit(1); }
fs.writeFileSync(file, h);
console.log(JSON.stringify({ file: path.relative(ROOT, file), total, n, verdict, rate: fmt(rate), rateWithSkip: fmt(rateAll), missingScreenshotDirs: missing, missingImages: lostImages.length }));
