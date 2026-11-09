// check-account-language.js — reads the interface language of the test account
// (GET /geo/api/v1/auth/me) and fails when it is not en-GB. Read-only: it never
// changes the account setting.
//
// Logs in through global-setup.js first (writes storageState.json, which the
// Playwright run then reuses), so it must run with USE_AUTH credentials set.
//
// Usage: BASE_URL=https://staging-geo.onclusive.com/geo node .github/scripts/check-account-language.js

'use strict';

const fs   = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const ROOT          = path.resolve(__dirname, '../..');
const STORAGE_STATE = path.join(ROOT, '.claude/Data/processed/auth/storageState.json');
const EXPECTED      = 'en-GB';
const BASE_URL      = (process.env.BASE_URL || '').replace(/\/$/, '');
const ME_PATH       = '/api/v1/auth/me';

// Finds every string field whose key mentions "lang" or "locale" (the exact
// field name is not documented, so the check reports all candidates).
function languageFields(obj, prefix = '', out = {}) {
  if (!obj || typeof obj !== 'object') return out;
  for (const [key, val] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string' && /lang|locale/i.test(key)) out[full] = val;
    else if (val && typeof val === 'object' && !Array.isArray(val)) languageFields(val, full, out);
  }
  return out;
}

function summary(line) {
  console.log(line);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, line + '\n');
}

(async () => {
  await require(path.join(ROOT, '.claude/Data/raw/playwright/global-setup.js'))();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: STORAGE_STATE });
  const page    = await context.newPage();
  let me = null;

  try {
    // 1. The app calls /auth/me itself on load — capture that response (carries its auth headers)
    const meResponse = page.waitForResponse(r => r.url().includes(ME_PATH) && r.ok(), { timeout: 45000 })
      .catch(() => null);
    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 45000 });
    const resp = await meResponse;
    if (resp) me = await resp.json().catch(() => null);

    // 2. Fallback: call it from the page (session cookies)
    if (!me) {
      me = await page.evaluate(async url => {
        const r = await fetch(url, { credentials: 'include' });
        return r.ok ? r.json() : null;
      }, `${BASE_URL}${ME_PATH}`);
    }
  } finally {
    await browser.close();
  }

  if (!me) {
    summary(`❌ Account language: could not read ${ME_PATH} — tests not started.`);
    process.exit(1);
  }

  const fields = languageFields(me);
  const values = Object.values(fields);
  const ok     = values.some(v => v.toLowerCase() === EXPECTED.toLowerCase());
  const found  = Object.entries(fields).map(([k, v]) => `${k}=${v}`).join(', ') || 'no language field found';

  if (ok) {
    summary(`✅ Account language: ${EXPECTED} (${found})`);
    process.exit(0);
  }
  summary(`❌ Account language is not ${EXPECTED} (${found}) — set it back in Settings > Interface Language, then rerun.`);
  process.exit(1);
})().catch(err => {
  summary(`❌ Account language check failed: ${err.message.split('\n')[0]}`);
  process.exit(1);
});
