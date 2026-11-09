#!/usr/bin/env node
// Checks every ticket of a Jira fixVersion and moves to "Passed QA" the ones that are ready:
//   stories / tasks : at least one TC in the latest consolidated report, no FAIL, every PARTIAL / SKIP justified,
//                     no open bug linked to the ticket
//   epics           : every story / task closed, no open bug (child or linked), no FAIL in the consolidated report
//   QA Test Plan    : its parent is closed
//   node .claude/Data/templates/release-readiness/promote-passed-qa.js --version 1.3 [--label GEO-R1.3] [--epics KEY,KEY] [--dry-run]
// Without --dry-run the transitions and comments are applied (user decision 2026-10-27).
const fs = require('fs'), path = require('path');

const argv = process.argv.slice(2);
const args = Object.fromEntries(argv.reduce((a, x, i, arr) => (x.startsWith('--') && a.push([x.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]), a), []));
const VERSION = args.version;
if (!VERSION || VERSION === true) { console.error('Usage: --version <fixVersion> [--label GEO-R1.3] [--epics KEY,KEY] [--dry-run]'); process.exit(1); }
const LABEL = typeof args.label === 'string' ? args.label : `GEO-R${VERSION}`;
const ONLY = typeof args.epics === 'string' ? args.epics.split(',').map(s => s.trim()).filter(Boolean) : null;
const DRY = !!args['dry-run'];

const ROOT = process.cwd();
const RUNS = path.join(ROOT, '.claude/Data/output/reports/runs');
const OUT_DIR = path.join(ROOT, '.claude/Data/output/release-readiness');

const CLOSED = ['Passed QA', 'Done', 'Abandoned', 'Ready for Release', 'Duplicate', 'Passed UAT', 'Closed', 'Released'];
const PROMOTABLE = ['Ready for QA', 'QA In Progress', 'Action Needed'];
const TARGET = 'Passed QA';
// a PARTIAL / SKIP whose reason describes work still to do is not a justified exception
const PENDING = [/to (be )?run (right )?after/i, /after the [\d.]+ (production )?deploy/i, /not deployed/i, /to confirm/i, /\bPO\b[^.]{0,40}(confirm|decide|decision|answer)/i,
  /CSV gap/i, /\bpending\b/i, /still (open|to)/i, /waits? for/i, /to rerun|rerun (needed|later)/i,
  /\bto close\b/i, /\bnot covered\b/i, /\bre-?asked\b/i, /\bpromised\b/i];

const env = Object.fromEntries(fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split(/\r?\n/)
  .filter(l => /^[A-Z_]+=/.test(l)).map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).replace(/^["']|["']$/g, '')]; }));
for (const k of ['JIRA_URL', 'JIRA_EMAIL', 'JIRA_TOKEN']) if (!env[k]) { console.error(`Missing ${k} in .env`); process.exit(1); }
const H = { Authorization: 'Basic ' + Buffer.from(`${env.JIRA_EMAIL}:${env.JIRA_TOKEN}`).toString('base64'), 'Content-Type': 'application/json' };

async function jira(method, url, body) {
  const r = await fetch(`${env.JIRA_URL}${url}`, { method, headers: H, body: body && JSON.stringify(body) });
  const txt = await r.text(); const j = txt ? JSON.parse(txt) : null;
  if (!r.ok) throw new Error(`${method} ${url} failed (${r.status}): ${txt.slice(0, 300)}`);
  return j;
}
async function search(jql) {
  const out = []; let next;
  do {
    const j = await jira('POST', '/rest/api/3/search/jql', { jql, fields: ['summary', 'status', 'issuetype', 'parent', 'issuelinks'], maxResults: 100, nextPageToken: next });
    out.push(...j.issues); next = j.nextPageToken;
  } while (next);
  return out.map(i => ({
    key: i.key, summary: i.fields.summary, type: i.fields.issuetype.name, subtask: i.fields.issuetype.subtask,
    status: i.fields.status.name, parent: i.fields.parent?.key,
    links: (i.fields.issuelinks || []).map(l => { const o = l.outwardIssue || l.inwardIssue; return o && { key: o.key, type: o.fields.issuetype.name, status: o.fields.status.name }; }).filter(Boolean),
  }));
}

// TC results of the latest consolidated report of each epic, with the documented reason of each PARTIAL / SKIP
const text = h => h.replace(/<[^>]+>/g, ' ').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
function consolidated() {
  const latest = {}, out = {};
  if (!fs.existsSync(RUNS)) return out;
  const prefix = LABEL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const d of fs.readdirSync(RUNS)) {
    const m = d.match(new RegExp(`^${prefix}_(GEO-\\d+)_(\\d{2})(\\d{2})(\\d{4})-(\\d{4})$`)); if (!m) continue;
    const ts = `${m[4]}${m[3]}${m[2]}${m[5]}`;
    if (!latest[m[1]] || latest[m[1]].ts < ts) latest[m[1]] = { d, ts };
  }
  for (const [epic, { d }] of Object.entries(latest)) {
    const f = fs.readdirSync(path.join(RUNS, d)).find(x => /consolidated\.html$/.test(x)); if (!f) continue;
    const html = fs.readFileSync(path.join(RUNS, d, f), 'utf8');
    const tcs = {};
    // layout A: <span class="pill" ...>STATUS</span> <b>TC-ID</b> ; layout B: <span class="tcid">TC-ID</span> <span class="badge" ...>STATUS</span>
    const re = /class="pill"[^>]*>(PASS|FAIL|PARTIAL|SKIP)<\/span>\s*<b>(TC-GEO-\d+-\d+)<\/b>|<span class="tcid">(TC-GEO-\d+-\d+)<\/span>\s*<span class="badge"[^>]*>(PASS|FAIL|PARTIAL|SKIP)<\/span>/g;
    let m;
    while ((m = re.exec(html))) {
      const id = m[2] || m[3], status = m[1] || m[4];
      if (tcs[id]) continue;
      const end = html.indexOf('</details>', m.index);
      const block = html.slice(m.index, end < 0 ? undefined : end);
      const r = block.match(/<b>(Skip reason|Notes|Requalified[^<]*|Previous error[^<]*):?<\/b>:?\s*([\s\S]*?)<\/(p|div)>/);
      const reason = r ? text(block.slice(r.index).replace(/<ol[\s\S]*$/, '')) : '';
      const pending = PENDING.find(p => p.test(reason));
      tcs[id] = { status, reason, pending: pending ? (reason.match(pending) || [''])[0] : null,
        justified: status === 'PASS' || ((status === 'PARTIAL' || status === 'SKIP') && reason.length >= 20 && !pending) };
    }
    out[epic] = { report: `runs/${d}/${f}`, tcs };
  }
  return out;
}

const short = (s, n = 220) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
const today = new Date().toISOString().slice(0, 10);

async function transition(key, comment) {
  const tr = (await jira('GET', `/rest/api/2/issue/${key}/transitions`)).transitions.find(t => t.name === TARGET || t.to?.name === TARGET);
  if (!tr) throw new Error(`${key}: no "${TARGET}" transition available`);
  const c = await jira('POST', `/rest/api/2/issue/${key}/comment`, { body: comment });
  await jira('POST', `/rest/api/2/issue/${key}/transitions`, { transition: { id: tr.id } });
  const st = (await jira('GET', `/rest/api/2/issue/${key}?fields=status`)).fields.status.name;
  if (st !== TARGET) throw new Error(`${key}: status is "${st}" after the transition`);
  return c.id;
}

(async () => {
  const fv = JSON.stringify(VERSION);
  let epics = await search(`project = GEO AND issuetype = Epic AND fixVersion = ${fv}`);
  if (ONLY) epics = epics.filter(e => ONLY.includes(e.key));
  if (!epics.length) throw new Error(`No epic with fixVersion ${VERSION}`);
  const children = await search(`parent in (${epics.map(e => e.key).join(',')})`);
  const subtasks = children.length ? await search(`parent in (${children.map(c => c.key).join(',')})`) : [];
  const tests = consolidated();

  const rows = [];        // { key, type, summary, from, verdict: 'PROMOTE'|'BLOCKED'|'CLOSED'|'SKIPPED', reasons[], comment }
  const statusOf = new Map([...epics, ...children, ...subtasks].map(i => [i.key, i.status]));
  const isClosed = k => CLOSED.includes(statusOf.get(k));
  const openBugs = links => links.filter(l => l.type === 'Bug' && !CLOSED.includes(l.status));

  for (const e of epics) {
    const ch = children.filter(c => c.parent === e.key);
    const rep = tests[e.key];
    // stories and tasks (not bugs, not sub-tasks)
    for (const s of ch.filter(c => c.type !== 'Bug' && !c.subtask)) {
      const row = { key: s.key, type: s.type, summary: s.summary, from: s.status, epic: e.key, reasons: [] };
      rows.push(row);
      if (CLOSED.includes(s.status)) { row.verdict = 'CLOSED'; continue; }
      if (!PROMOTABLE.includes(s.status)) { row.verdict = 'SKIPPED'; row.reasons.push(`status "${s.status}" is not a QA status`); continue; }
      const num = s.key.split('-')[1];
      const tcs = rep ? Object.entries(rep.tcs).filter(([id]) => id.split('-')[2] === num) : [];
      if (!tcs.length) row.reasons.push(rep ? 'no TC in the consolidated report' : 'no consolidated report for the epic');
      const fails = tcs.filter(([, t]) => t.status === 'FAIL').map(([id]) => id);
      const unjust = tcs.filter(([, t]) => !t.justified && t.status !== 'FAIL').map(([id, t]) => `${id} ${t.status}${t.pending ? ` (pending: "${t.pending}")` : ' (no documented reason)'}`);
      if (fails.length) row.reasons.push(`FAIL: ${fails.join(', ')}`);
      if (unjust.length) row.reasons.push(`not accepted: ${unjust.join(', ')}`);
      const ob = openBugs(s.links);
      if (ob.length) row.reasons.push(`open bug: ${ob.map(b => `${b.key} (${b.status})`).join(', ')}`);
      row.verdict = row.reasons.length ? 'BLOCKED' : 'PROMOTE';
      if (row.verdict === 'PROMOTE') {
        const c = { PASS: 0, PARTIAL: 0, SKIP: 0 }; tcs.forEach(([, t]) => c[t.status]++);
        const ex = tcs.filter(([, t]) => t.status !== 'PASS');
        const closedBugs = s.links.filter(l => l.type === 'Bug');
        row.comment = `QA release check (${today}, staging) — ${tcs.length} TCs: ${c.PASS} PASS` + (c.PARTIAL ? `, ${c.PARTIAL} PARTIAL` : '') + (c.SKIP ? `, ${c.SKIP} SKIP` : '') + ', 0 FAIL.'
          + (ex.length ? '\n\nPARTIAL / SKIP, with their documented reason:\n' + ex.map(([id, t]) => `* ${id} ${t.status}: ${short(t.reason)}`).join('\n') : '')
          + (closedBugs.length ? `\n\nLinked bugs closed: ${closedBugs.map(b => `${b.key} (${b.status})`).join(', ')}.` : '\n\nNo linked bug.')
          + `\n\nConsolidated report: {{${rep.report}}}`;
      }
    }
    // epic: every story / task closed (after this run), no open bug, no FAIL in its report
    const erow = { key: e.key, type: 'Epic', summary: e.summary, from: e.status, epic: e.key, reasons: [] };
    rows.push(erow);
    const items = ch.filter(c => c.type !== 'Bug' && !c.subtask);
    const closedAfter = k => isClosed(k) || rows.some(r => r.key === k && r.verdict === 'PROMOTE');
    if (CLOSED.includes(e.status)) erow.verdict = 'CLOSED';
    else if (!PROMOTABLE.includes(e.status)) { erow.verdict = 'SKIPPED'; erow.reasons.push(`status "${e.status}" is not a QA status`); }
    else {
      const notClosed = items.filter(i => !closedAfter(i.key));
      if (notClosed.length) erow.reasons.push(`not closed: ${notClosed.map(i => `${i.key} (${i.status})`).join(', ')}`);
      const bugs = [...ch.filter(c => c.type === 'Bug').map(b => ({ key: b.key, status: b.status })), ...[e, ...items].flatMap(i => i.links.filter(l => l.type === 'Bug'))];
      const ob = [...new Map(bugs.filter(b => !CLOSED.includes(b.status)).map(b => [b.key, b])).values()];
      if (ob.length) erow.reasons.push(`open bug: ${ob.map(b => `${b.key} (${b.status})`).join(', ')}`);
      const fails = rep ? Object.entries(rep.tcs).filter(([, t]) => t.status === 'FAIL').map(([id]) => id) : [];
      if (!rep) erow.reasons.push('no consolidated report');
      if (fails.length) erow.reasons.push(`FAIL in the consolidated report: ${fails.join(', ')}`);
      erow.verdict = erow.reasons.length ? 'BLOCKED' : 'PROMOTE';
      if (erow.verdict === 'PROMOTE') {
        const all = Object.values(rep.tcs); const c = { PASS: 0, PARTIAL: 0, SKIP: 0 }; all.forEach(t => c[t.status]++);
        erow.comment = `QA release check (${today}, staging) — every story and task of the epic is ${TARGET} or Done (${items.length}), no open bug, consolidated report ${all.length} TCs: ${c.PASS} PASS, ${c.PARTIAL} PARTIAL, ${c.SKIP} SKIP, 0 FAIL.\n\nConsolidated report: {{${rep.report}}}`;
      }
    }
    // QA Test Plan sub-tasks of the epic or of its items: promoted when their parent is closed (after this run)
    const plans = [...ch.filter(c => c.subtask), ...subtasks.filter(s => items.some(i => i.key === s.parent))].filter(s => /^QA Test Plan\b/i.test(s.summary));
    for (const p of plans) {
      const prow = { key: p.key, type: 'QA Test Plan', summary: p.summary, from: p.status, epic: e.key, reasons: [] };
      rows.push(prow);
      const parentClosed = isClosed(p.parent) || rows.some(r => r.key === p.parent && r.verdict === 'PROMOTE');
      if (CLOSED.includes(p.status)) prow.verdict = 'CLOSED';
      else if (!parentClosed) { prow.verdict = 'BLOCKED'; prow.reasons.push(`parent ${p.parent} not closed`); }
      else { prow.verdict = 'PROMOTE'; prow.comment = `QA release check (${today}): ${p.parent} is ${TARGET}, the test plan is complete.`; }
    }
  }

  // apply: stories / tasks first, then epics, then QA Test Plans (rows are already in that order per epic)
  const order = r => (r.type === 'Epic' ? 1 : r.type === 'QA Test Plan' ? 2 : 0);
  const todo = rows.filter(r => r.verdict === 'PROMOTE').sort((a, b) => order(a) - order(b));
  for (const r of todo) {
    if (DRY) { r.result = 'dry-run'; continue; }
    try { r.commentId = await transition(r.key, r.comment); r.result = `→ ${TARGET} (comment ${r.commentId})`; }
    catch (err) { r.result = `ERROR: ${err.message}`; r.verdict = 'ERROR'; }
  }

  // report
  const ts = new Date(); const stamp = `${ts.toISOString().slice(0, 10).replace(/-/g, '')}-${ts.toISOString().slice(11, 16).replace(':', '')}`;
  const md = [`# ${LABEL} — ${TARGET} check (${ts.toISOString().slice(0, 16).replace('T', ' ')} UTC)${DRY ? ' — DRY RUN' : ''}`, '',
    `fixVersion ${VERSION} · epics ${epics.map(e => e.key).join(', ')} · rules: no FAIL, every PARTIAL / SKIP with a documented reason, no open bug; epics need every story / task closed; QA Test Plans follow their parent.`, '',
    '| Ticket | Type | Status before | Verdict | Reason / result |', '|---|---|---|---|---|',
    ...rows.map(r => `| ${r.key} | ${r.type} | ${r.from} | ${r.verdict} | ${(r.result || r.reasons.join('; ') || '').replace(/\|/g, '/')} |`), ''].join('\n');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, `${LABEL}-passed-qa-${stamp}${DRY ? '-dryrun' : ''}.md`);
  fs.writeFileSync(out, md);

  const by = v => rows.filter(r => r.verdict === v);
  console.log(`${LABEL} (fixVersion ${VERSION})${DRY ? ' — DRY RUN, nothing written to Jira' : ''}`);
  for (const r of todo) console.log(`PROMOTE  ${r.key.padEnd(9)} ${r.type.padEnd(13)} ${r.from} ${r.result || ''}`);
  for (const r of by('BLOCKED')) console.log(`BLOCKED  ${r.key.padEnd(9)} ${r.type.padEnd(13)} ${r.from} — ${r.reasons.join('; ')}`);
  for (const r of by('SKIPPED')) console.log(`SKIPPED  ${r.key.padEnd(9)} ${r.type.padEnd(13)} ${r.reasons.join('; ')}`);
  console.log(`Already closed: ${by('CLOSED').length} · promoted: ${todo.filter(r => r.verdict === 'PROMOTE').length} · blocked: ${by('BLOCKED').length} · errors: ${by('ERROR').length}`);
  console.log(`Report: ${path.relative(ROOT, out)}`);
})().catch(e => { console.error(e.message); process.exit(1); });
