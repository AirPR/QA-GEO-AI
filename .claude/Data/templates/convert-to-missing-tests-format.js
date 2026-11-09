#!/usr/bin/env node
/**
 * Convertit un CSV au format "source epic" (15 cols, `;`)
 * vers le format "missing-tests" (17 cols, `,`, avec `tc_id` et `Requirement`).
 *
 * Usage: node convert-to-missing-tests-format.js <inputCsv> <outputCsv>
 */
const fs = require('fs');

const SRC = process.argv[2];
const DST = process.argv[3];
if (!SRC || !DST) { console.error('Usage: node convert-to-missing-tests-format.js <input> <output>'); process.exit(1); }

// ---- Parser CSV avec auto-détection du séparateur ----
function parseCsv(text) {
  const lines = text.replace(/^﻿/, '').split(/\r?\n/).filter(Boolean);
  const semis = (lines[0].match(/;/g) || []).length;
  const commas = (lines[0].match(/,/g) || []).length;
  const sep = semis > commas ? ';' : ',';
  const splitLine = (l) => {
    const o = []; let c = ''; let q = false;
    for (let i = 0; i < l.length; i++) {
      const ch = l[i];
      if (ch === '"') {
        if (q && l[i + 1] === '"') { c += '"'; i++; }
        else q = !q;
      } else if (ch === sep && !q) { o.push(c); c = ''; }
      else c += ch;
    }
    o.push(c);
    return o;
  };
  const header = splitLine(lines[0]);
  const rows = lines.slice(1).map(splitLine);
  return { header, rows, sep };
}

// ---- Sortie : encodage CSV strict ----
function csvEscape(v) {
  v = String(v == null ? '' : v);
  if (/[",\r\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

// ---- Header cible (17 cols) ----
const TARGET_HEADER = ['tc_id','Description','QA Priority','Test name','Test step','Test data','Expected result','Labels','QA Parent','Components','Smoke','QA Components','QA Precondition','UI/Functional Test case','QA Regression','QA Story task','Requirement'];

// ---- Conversion ----
function main() {
  const text = fs.readFileSync(SRC, 'utf8');
  const { header, rows, sep } = parseCsv(text);

  // Map header → index
  const idx = {};
  header.forEach((h, i) => { idx[h] = i; });

  // Generate one tc_id per unique (story, Test name) pair, continuous numbering per story
  const tcIdMap = new Map();      // key: `${story}|${testName}` → tc_id
  const counterPerStory = {};

  for (const row of rows) {
    const story = (row[idx['QA Parent']] || '').trim();
    const testName = (row[idx['Test name']] || '').trim();
    const key = `${story}|${testName}`;
    if (!tcIdMap.has(key)) {
      counterPerStory[story] = (counterPerStory[story] || 0) + 1;
      tcIdMap.set(key, `${story}-TC${counterPerStory[story]}`);
    }
  }

  // Build output rows
  const out = [TARGET_HEADER.join(',')];
  let nfrCount = 0, acCount = 0;
  for (const row of rows) {
    const story = (row[idx['QA Parent']] || '').trim();
    const testName = (row[idx['Test name']] || '').trim();
    const tcId = tcIdMap.get(`${story}|${testName}`);
    const uiFunc = (row[idx['UI/Functional Test case']] || '').trim();
    const requirement = /performance/i.test(uiFunc) ? 'NFR (Performance)' : 'AC';
    if (requirement === 'AC') acCount++; else nfrCount++;

    const newRow = TARGET_HEADER.map(col => {
      if (col === 'tc_id') return tcId;
      if (col === 'Requirement') return requirement;
      return row[idx[col]] ?? '';
    });
    out.push(newRow.map(csvEscape).join(','));
  }

  fs.writeFileSync(DST, out.join('\r\n'), 'utf8');

  // Stats
  const uniqueTcs = new Set([...tcIdMap.values()]).size;
  console.log(`Input  : ${SRC}`);
  console.log(`Output : ${DST}`);
  console.log(`Format : sep "${sep}" → "," | cols ${header.length} → ${TARGET_HEADER.length}`);
  console.log(`Lignes  : ${rows.length} (header non compris)`);
  console.log(`TCs     : ${uniqueTcs} uniques`);
  console.log(`Requirement: AC=${acCount}, NFR (Performance)=${nfrCount}`);
}

main();
