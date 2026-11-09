#!/usr/bin/env node
'use strict';
const fs    = require('fs');
const https = require('https');
const path  = require('path');

const csvPath   = process.argv[2] || '.claude/Data/output/csv/GEO-dashboard-overview.csv';
const projectId = parseInt(process.env.QP_PROJECT_ID, 10);
const token     = process.env.QP_TOKEN;
const apiBase   = 'https://apps-qalityplus.soldevelo.com';

if (!projectId || !token) {
  console.error('Missing QP_PROJECT_ID or QP_TOKEN in env');
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false, i = 0;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i += 2; continue; }
      if (c === '"') { inQuotes = false; i++; continue; }
      field += c; i++; continue;
    }
    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === ',') { row.push(field); field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    field += c; i++;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const adf = (text) => ({
  version: 1, type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text: text || ' ' }] }],
});

// Jira labels can't contain spaces — slugify multi-word component names.
const toLabel = (s) => s.trim().toLowerCase().replace(/\s+/g, '-');

const excludeIds = new Set((process.env.EXCLUDE_TC_IDS || '').split(',').map(s => s.trim()).filter(Boolean));

const rows    = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const headers = rows[0];
const data    = rows.slice(1).filter(r => r.length > 1 && r[0]);
const idx     = Object.fromEntries(headers.map((h, i) => [h, i]));

const tcs = new Map();
for (const r of data) {
  const tc_id = r[idx['tc_id']];
  if (!tcs.has(tc_id)) {
    tcs.set(tc_id, {
      tc_id,
      name:         r[idx['Test name']],
      description:  r[idx['Description']]      || '',
      priority:     r[idx['QA Priority']]      || '',
      labels:       (r[idx['Labels']] || '').split(',').map(s => s.trim()).filter(Boolean),
      qaParent:     r[idx['QA Parent']]        || '',
      components:   (r[idx['Components']] || '').split(',').map(s => s.trim()).filter(Boolean),
      qaComponents: (r[idx['QA Components']] || '').split(',').map(s => s.trim()).filter(Boolean),
      precondition: r[idx['QA Precondition']]  || '',
      smoke:        r[idx['Smoke']]            || '',
      testCaseType: r[idx['UI/Functional Test case']] || '',
      qaStoryTask:  r[idx['QA Story task']]    || '',
      steps:        [],
    });
  }
  tcs.get(tc_id).steps.push({
    step:   r[idx['Test step']]       || '',
    data:   r[idx['Test data']]       || '',
    result: r[idx['Expected result']] || '',
  });
}

const allTcs = [...tcs.values()].filter(t => !excludeIds.has(t.tc_id));
const payload = {
  projectId,
  testCases: allTcs.map(t => {
    const tc = {
      name: `${t.tc_id} - ${t.name}`,
      description:        adf(t.description),
      labels:             t.labels.map(toLabel),
      customfield_16381:  t.qaParent,
      components:         t.components.map(name => ({ name })),
      customfield_13100:  t.qaComponents.map(toLabel),
      customfield_16314:  adf(t.precondition),
      customfield_16382:  t.qaStoryTask || undefined,
      testSteps:          t.steps.map(s => ({ step: s.step, data: s.data, result: s.result })),
    };
    if (t.testCaseType) tc.customfield_16313 = { value: t.testCaseType };
    if (t.priority)     tc.customfield_16347 = { value: t.priority };
    if (t.smoke)        tc.customfield_10501 = { value: t.smoke };
    return tc;
  }),
};

console.log(`Posting ${payload.testCases.length} test cases to ${apiBase}/api/testCases/import (projectId=${projectId}) …`);

const body = JSON.stringify(payload);
const url  = new URL(apiBase + '/api/testCases/import');
const req  = https.request({
  method: 'POST',
  hostname: url.hostname,
  path: url.pathname + url.search,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type':  'application/json',
    'Accept':        'application/json',
    'Content-Length': Buffer.byteLength(body),
  },
}, (res) => {
  let chunks = '';
  res.on('data', d => chunks += d);
  res.on('end', () => {
    console.log(`\nHTTP ${res.statusCode}`);
    try {
      const j = JSON.parse(chunks);
      console.log(JSON.stringify(j, null, 2));
    } catch {
      console.log(chunks.slice(0, 2000));
    }
  });
});
req.on('error', e => { console.error(e); process.exit(1); });
req.write(body);
req.end();
