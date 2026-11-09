#!/usr/bin/env node
// Builds the release map page (anomalies + test cases donuts, epic tree) for one Jira fixVersion.
//   node .claude/Data/templates/release-map/build-release-map.js --version 1.3 [--label GEO-R1.3] [--epics GEO-1002,GEO-1069,...]
// Reads Jira (read only) + the latest consolidated report of each epic (runs/{LABEL}_{EPIC}_{DDMMYYYY-HHMM}/*consolidated.html).
// Writes .claude/Data/output/reports/release-map/{LABEL}-release-map.html (the page to publish as an Artifact).
const fs = require('fs'), path = require('path');

const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, arr) => (x.startsWith('--') && a.push([x.slice(2), arr[i + 1]]), a), []));
const VERSION = args.version;
if (!VERSION) { console.error('Usage: --version <fixVersion> [--label GEO-R1.3] [--epics KEY,KEY]'); process.exit(1); }
const LABEL = args.label || `GEO-R${VERSION}`;
const FORCED = args.epics ? args.epics.split(',').map(s => s.trim()).filter(Boolean) : null;

const ROOT = process.cwd();
const TEMPLATE = path.join(__dirname, 'release-map.template.html');
const RUNS = path.join(ROOT, '.claude/Data/output/reports/runs');
const OUT_DIR = path.join(ROOT, '.claude/Data/output/reports/release-map');
const OUT = path.join(OUT_DIR, `${LABEL}-release-map.html`);

const env = Object.fromEntries(fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split(/\r?\n/)
  .filter(l => /^[A-Z_]+=/.test(l)).map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).replace(/^["']|["']$/g, '')]; }));
for (const k of ['JIRA_URL', 'JIRA_EMAIL', 'JIRA_TOKEN']) if (!env[k]) { console.error(`Missing ${k} in .env`); process.exit(1); }
const H = { Authorization: 'Basic ' + Buffer.from(`${env.JIRA_EMAIL}:${env.JIRA_TOKEN}`).toString('base64'), 'Content-Type': 'application/json' };

async function search(jql) {
  const out = []; let next;
  do {
    const r = await fetch(`${env.JIRA_URL}/rest/api/3/search/jql`, { method: 'POST', headers: H,
      body: JSON.stringify({ jql, fields: ['summary', 'status', 'issuetype', 'parent', 'issuelinks'], maxResults: 100, nextPageToken: next }) });
    const j = await r.json(); if (!r.ok) throw new Error(`Jira search failed (${r.status}): ${JSON.stringify(j).slice(0, 300)}`);
    out.push(...j.issues); next = j.nextPageToken;
  } while (next);
  return out.map(i => ({
    key: i.key, summary: i.fields.summary, type: i.fields.issuetype.name, subtask: i.fields.issuetype.subtask,
    status: i.fields.status.name, parent: i.fields.parent?.key,
    links: (i.fields.issuelinks || []).map(l => { const o = l.outwardIssue || l.inwardIssue; return o && { key: o.key, type: o.fields.issuetype.name }; }).filter(Boolean),
  }));
}
const slim = i => ({ k: i.key, s: i.status, t: i.summary });

// test cases: latest consolidated report of each epic
function consolidatedTests() {
  const latest = {}, epics = {};
  if (!fs.existsSync(RUNS)) return { source: 'consolidated', epics };
  const prefix = LABEL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const d of fs.readdirSync(RUNS)) {
    const m = d.match(new RegExp(`^${prefix}_(GEO-\\d+)_(\\d{2})(\\d{2})(\\d{4})-(\\d{4})$`)); if (!m) continue;
    const ts = `${m[4]}${m[3]}${m[2]}${m[5]}`;
    if (!latest[m[1]] || latest[m[1]].ts < ts) latest[m[1]] = { d, ts };
  }
  for (const [epic, { d, ts }] of Object.entries(latest)) {
    const f = fs.readdirSync(path.join(RUNS, d)).find(x => /consolidated\.html$/.test(x)); if (!f) continue;
    const html = fs.readFileSync(path.join(RUNS, d, f), 'utf8');
    const c = { total: 0, PASS: 0, FAIL: 0, PARTIAL: 0, SKIP: 0, keys: { PASS: [], FAIL: [], PARTIAL: [], SKIP: [] }, report: `${d}/${f}`, runTs: ts };
    // layout A: one row per TC  <span class="pill" ...>STATUS</span> <b>TC-ID</b>
    const per = {}; const re = /class="pill"[^>]*>(PASS|FAIL|PARTIAL|SKIP)<\/span>\s*<b>(TC-GEO-\d+-\d+)<\/b>/g; let m;
    while ((m = re.exec(html))) per[m[2]] = m[1];
    // layout B: one row per TC  <span class="tcid">TC-ID</span> <span class="badge" ...>STATUS</span>
    if (!Object.keys(per).length) {
      const reB = /<span class="tcid">(TC-GEO-\d+-\d+)<\/span>\s*<span class="badge"[^>]*>(PASS|FAIL|PARTIAL|SKIP)<\/span>/g;
      while ((m = reB.exec(html))) per[m[1]] = m[2];
    }
    for (const [tc, s] of Object.entries(per)) { c.total++; c[s]++; c.keys[s].push(tc); }
    // fallback: stats block  <b ...>N</b><span>PASS</span>
    if (!c.total) for (const s of ['PASS', 'FAIL', 'PARTIAL', 'SKIP']) {
      const mm = html.match(new RegExp(`<b[^>]*>(\\d+)</b><span>${s}</span>`)); if (mm) { c[s] = +mm[1]; c.total += +mm[1]; }
    }
    if (!c.total) { console.warn(`! ${epic}: no TC result found in ${d}/${f} (unknown report layout) — skipped`); continue; }
    const note = html.match(/<div class="verdict">[^<]*<small>([^<]*)<\/small>/);
    if (note) c.note = note[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    const ex = c.PASS + c.FAIL + c.PARTIAL;
    c.rate = ex ? Math.round((c.PASS + 0.5 * c.PARTIAL) / ex * 1000) / 10 : null;
    c.verdict = c.rate == null ? '—' : c.rate >= 80 ? 'GO' : c.rate >= 60 ? 'CONDITIONAL' : 'NO-GO';
    epics[epic] = c;
  }
  return { source: 'consolidated', epics };
}

(async () => {
  const fv = JSON.stringify(VERSION);
  const epicsJ = await search(`project = GEO AND issuetype = Epic AND fixVersion = ${fv}`);
  if (!epicsJ.length) throw new Error(`No epic with fixVersion ${VERSION}`);
  // default order: EPIC-0xx number in the title, then key; --epics forces the order
  const num = e => +((e.summary.match(/EPIC-(\d+)/) || [])[1] || 9999);
  let keys = epicsJ.slice().sort((a, b) => num(a) - num(b) || a.key.localeCompare(b.key, 'en', { numeric: true })).map(e => e.key);
  if (FORCED) keys = [...FORCED.filter(k => keys.includes(k)), ...keys.filter(k => !FORCED.includes(k))];

  const children = await search(`parent in (${keys.join(',')})`);
  const subtasks = children.length ? await search(`parent in (${children.map(c => c.key).join(',')})`) : [];
  const known = new Set([...children, ...subtasks].map(i => i.key));
  const linkedKeys = new Set();
  for (const i of [...epicsJ, ...children, ...subtasks]) for (const l of i.links) if (l.type === 'Bug' && !known.has(l.key)) linkedKeys.add(l.key);
  const linked = linkedKeys.size ? await search(`key in (${[...linkedKeys].join(',')})`) : [];
  const bugsV = await search(`type = Bug AND project = GEO AND fixVersion = ${fv}`);

  const data = {
    release: { label: LABEL, fixVersion: VERSION },
    fetchedAt: new Date().toISOString(),
    epics: keys.map(k => {
      const e = epicsJ.find(x => x.key === k), ch = children.filter(c => c.parent === k);
      return {
        key: k, title: e.summary, status: e.status,
        stories: ch.filter(c => c.type === 'Story').map(slim),
        tasks: ch.filter(c => !['Story', 'Bug'].includes(c.type) && !c.subtask).map(slim),
        // shown as "QA test plan": only the QA test plan sub-tasks (summary "QA Test Plan …"), of the epic or of its stories / tasks
        subtasks: [...ch.filter(c => c.subtask), ...subtasks.filter(s => ch.some(c => c.key === s.parent))]
          .filter(s => /^QA Test Plan\b/i.test(s.summary)).map(slim),
        bugs: ch.filter(c => c.type === 'Bug').map(slim),
        linked: linked.filter(b => b.links.some(l => l.key === k || ch.some(c => c.key === l.key))).map(slim),
      };
    }),
    bugs13: bugsV.map(b => ({ ...slim(b), parent: b.parent || null })),
    tests: consolidatedTests(),
    // optional: test execution time per epic, kept by hand in {LABEL}-exec-times.json (durations of the MCP test-run agents)
    execTime: (() => { const f = path.join(OUT_DIR, `${LABEL}-exec-times.json`); return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null; })(),
  };

  const tpl = fs.readFileSync(TEMPLATE, 'utf8').split('{{LABEL}}').join(LABEL);
  if (!tpl.includes('/*DATA*/null')) throw new Error('Template has no /*DATA*/null placeholder');
  const page = tpl.replace('/*DATA*/null', JSON.stringify(data).replace(/</g, '\\u003c'));
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT, page);

  const st = {}; data.bugs13.forEach(b => (st[b.s] = (st[b.s] || 0) + 1));
  console.log(`Release ${LABEL} (fixVersion ${VERSION}) — snapshot ${data.fetchedAt}`);
  console.log(`Epics: ${keys.join(', ')}`);
  console.log(`Bugs ${VERSION}: ${data.bugs13.length} (${Object.entries(st).map(([k, v]) => `${v} ${k}`).join(', ')}) — no parent: ${data.bugs13.filter(b => !b.parent).length}`);
  for (const [k, v] of Object.entries(data.tests.epics)) console.log(`Tests ${k}: ${v.total} TCs — ${v.PASS} PASS, ${v.PARTIAL} PARTIAL, ${v.FAIL} FAIL, ${v.SKIP} SKIP — ${v.rate}% ${v.verdict} (${v.report})`);
  for (const k of keys) if (!data.tests.epics[k]) console.log(`Tests ${k}: no consolidated report`);
  if (data.execTime) console.log(`Test execution, one full pass: ${data.execTime.fullPassMinutes} min (${Object.entries(data.execTime.epics).map(([k, v]) => `${k} ${v.fullPassMinutes}`).join(', ')})`);
  console.log(`Page: ${path.relative(ROOT, OUT)}`);
})().catch(e => { console.error(e.message); process.exit(1); });
