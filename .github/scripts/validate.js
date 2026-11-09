// validate.js — static checks run by the CI on every push / PR (no browser, no network).
//
// Errors (fail the job):
//   - a Playwright spec or helper has a syntax error
//   - a committed JSON file (test data, real.json) does not parse
//   - common.json base_url ends with a trailing slash
//   - a sensitive file is tracked by git (.env, storageState*.json)
// Warnings (reported, never fail the job):
//   - a spec does not import selectors_blueprint.json
//
// Usage: node .github/scripts/validate.js

'use strict';

const fs   = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT     = path.resolve(__dirname, '../..');
const SPEC_DIR = path.join(ROOT, '.claude/Data/raw/playwright');

const errors   = [];
const warnings = [];

const gitFiles = pattern =>
  execFileSync('git', ['ls-files', pattern], { cwd: ROOT, encoding: 'utf8' })
    .split('\n').filter(Boolean);

// ── 1. Spec + helper syntax ──────────────────────────────────────────────────
const jsFiles = fs.readdirSync(SPEC_DIR).filter(f => f.endsWith('.js'));
for (const file of jsFiles) {
  try {
    execFileSync(process.execPath, ['--check', path.join(SPEC_DIR, file)], { stdio: 'pipe' });
  } catch (err) {
    errors.push(`Syntax error in ${file}:\n${String(err.stderr).trim()}`);
  }
  if (file.endsWith('.spec.js')) {
    const src = fs.readFileSync(path.join(SPEC_DIR, file), 'utf8');
    if (!src.includes('selectors_blueprint.json')) {
      warnings.push(`${file} does not import selectors_blueprint.json`);
    }
  }
}

// ── 2. Committed JSON files parse ────────────────────────────────────────────
const jsonFiles = [
  ...gitFiles('.claude/Data/raw/test-data/*.json'),
  ...gitFiles('.claude/Data/processed/testcases/test-results/*.json'),
];
for (const rel of jsonFiles) {
  try {
    JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
  } catch (err) {
    errors.push(`Invalid JSON in ${rel}: ${err.message}`);
  }
}

// ── 3. JDD rules ─────────────────────────────────────────────────────────────
const common = require(path.join(ROOT, '.claude/Data/raw/test-data/common.json'));
if (typeof common.base_url === 'string' && common.base_url.endsWith('/')) {
  errors.push(`common.json base_url must not end with "/" (found ${common.base_url})`);
}

// ── 4. No sensitive file tracked ─────────────────────────────────────────────
const sensitive = [...gitFiles('.env'), ...gitFiles('**/storageState*.json')];
for (const rel of sensitive) errors.push(`Sensitive file tracked by git: ${rel}`);

// ── Summary ──────────────────────────────────────────────────────────────────
console.log(`Checked ${jsFiles.length} JS files and ${jsonFiles.length} JSON files.`);
for (const w of warnings) console.log(`::warning::${w}`);
for (const e of errors)   console.log(`::error::${e}`);

if (process.env.GITHUB_STEP_SUMMARY) {
  const lines = [
    '## Static checks',
    '',
    `- JS files checked: ${jsFiles.length}`,
    `- JSON files checked: ${jsonFiles.length}`,
    `- Errors: ${errors.length}`,
    `- Warnings: ${warnings.length}`,
    '',
    ...errors.map(e => `- ❌ ${e.split('\n')[0]}`),
    ...warnings.map(w => `- ⚠️ ${w}`),
  ];
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n') + '\n');
}

process.exit(errors.length ? 1 : 0);
