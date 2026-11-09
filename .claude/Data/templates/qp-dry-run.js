#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const csvPath = process.argv[2] || '.claude/Data/output/csv/GEO-dashboard-overview.csv';
if (!fs.existsSync(csvPath)) {
  console.error(`CSV not found: ${csvPath}`);
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

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const headers = rows[0];
const data = rows.slice(1).filter(r => r.length > 1 && r[0]);

const REQUIRED = ['tc_id', 'Test name', 'Test step', 'Expected result', 'QA Parent', 'Components'];
const missing = REQUIRED.filter(h => !headers.includes(h));
if (missing.length) {
  console.error(`Missing required headers: ${missing.join(', ')}`);
  process.exit(1);
}

const idx = Object.fromEntries(headers.map((h, i) => [h, i]));
const tcs = new Map();
for (const r of data) {
  const tc_id = r[idx['tc_id']];
  if (!tcs.has(tc_id)) {
    tcs.set(tc_id, {
      tc_id,
      name:        r[idx['Test name']],
      description: r[idx['Description']]   || '',
      labels:      (r[idx['Labels']] || '').split(',').map(s => s.trim()).filter(Boolean),
      qaParent:    r[idx['QA Parent']]     || '',
      components:  (r[idx['Components']] || '').split(',').map(s => s.trim()).filter(Boolean),
      qaComponents:(r[idx['QA Components']] || '').split(',').map(s => s.trim()).filter(Boolean),
      precondition:r[idx['QA Precondition']] || '',
      priority:    r[idx['QA Priority']]   || '',
      smoke:       r[idx['Smoke']]         || '',
      action:      r[idx['Action']]        || 'KEEP',
      steps:       [],
    });
  }
  tcs.get(tc_id).steps.push({
    step:   r[idx['Test step']]       || '',
    data:   r[idx['Test data']]       || '',
    result: r[idx['Expected result']] || '',
  });
}

const all = [...tcs.values()];
const keep = all.filter(t => t.action !== 'SKIP');
const skip = all.filter(t => t.action === 'SKIP');
const errors = [];

for (const t of all) {
  if (!t.name)          errors.push(`${t.tc_id}: missing "Test name"`);
  if (!t.qaParent)      errors.push(`${t.tc_id}: missing "QA Parent"`);
  if (!t.steps.length)  errors.push(`${t.tc_id}: no steps`);
  for (const [i, s] of t.steps.entries()) {
    if (!s.step)   errors.push(`${t.tc_id} step #${i + 1}: missing "Test step"`);
    if (!s.result) errors.push(`${t.tc_id} step #${i + 1}: missing "Expected result"`);
  }
}

const totalSteps = all.reduce((n, t) => n + t.steps.length, 0);

console.log('\n========== /import-qp DRY RUN ==========');
console.log(`CSV:           ${csvPath}`);
console.log(`Rows (data):   ${data.length}`);
console.log(`TCs total:     ${all.length}`);
console.log(`TCs to push:   ${keep.length} (Action=KEEP)`);
console.log(`TCs to skip:   ${skip.length} (Action=SKIP)`);
console.log(`Steps total:   ${totalSteps}`);
console.log(`Errors:        ${errors.length}`);
if (errors.length) {
  console.log('\n--- Validation errors ---');
  for (const e of errors) console.log(`  ❌ ${e}`);
}
console.log('\n--- TCs to push ---');
for (const t of keep) console.log(`  • ${t.tc_id.padEnd(16)} ${t.steps.length} steps  parent=${t.qaParent.padEnd(10)} prio=${t.priority.padEnd(8)} name="${t.name}"`);
if (skip.length) {
  console.log('\n--- TCs marked SKIP (will NOT be pushed) ---');
  for (const t of skip) console.log(`  • ${t.tc_id.padEnd(16)} name="${t.name}"`);
}
console.log('==========================================\n');
process.exit(errors.length ? 2 : 0);
