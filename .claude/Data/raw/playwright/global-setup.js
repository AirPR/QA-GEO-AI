// global-setup.js
// Auth0 two-step login — runs once before the test suite when USE_AUTH=true.
// Saves browser session (cookies + localStorage) to processed/auth/storageState.json.
// All subsequent tests reuse the saved session without re-logging in.
//
// Credentials: GEO_USER_EMAIL + GEO_USER_PASSWORD (from .env, loaded by Playwright automatically)
//
// Auth0 two-step flow:
//   Page 1 — enter email  → click "Continue"
//   Page 2 — enter password → click submit button
//
// Usage (epic99):
//   EPIC_ID=99 USE_AUTH=true npx playwright test .claude/Data/raw/playwright/test-suite-epic99.spec.js

'use strict';

const { chromium } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');
const H    = require('./e2e-helpers');

// ── Load .env manually ────────────────────────────────────────────────────────
// Playwright does not propagate .env to globalSetup (separate process).
// We parse the .env file at the project root ourselves.
const dotenvPath = path.resolve(__dirname, '../../../../.env');
if (fs.existsSync(dotenvPath)) {
  const lines = fs.readFileSync(dotenvPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !(key in process.env)) process.env[key] = val;
  }
}

const COMMON  = require('../test-data/common.json');
const BASE_URL = process.env.BASE_URL || COMMON.base_url;

// Spec-specific credential routing (only hubspot-upsell-pql uses a different account for now)
const isUpsellSpec = process.env.SPEC_NAME === 'hubspot-upsell-pql';

// Credentials — must be set in .env (copy from .env.example)
const EMAIL    = (isUpsellSpec && process.env.UPSELL_USER_EMAIL)    || process.env.GEO_USER_EMAIL;
const PASSWORD = (isUpsellSpec && process.env.UPSELL_USER_PASSWORD) || process.env.GEO_USER_PASSWORD;

// Session file — written here, read by playwright.config.js via use.storageState
const STORAGE_STATE = path.resolve(__dirname,
  isUpsellSpec
    ? '../../processed/auth/storageState-upsell.json'
    : '../../processed/auth/storageState.json');

// Debug screenshot path (written on login failure)
const ERROR_SCREENSHOT = path.resolve(__dirname, '../../processed/auth/login-error.png');

// ── Auth0 selectors ─────────────────────────────────────────────────────────
// Auth0 Universal Login v2 — standard field names.
// Blueprint reference: selectors_blueprint.json → auth section
const SEL = {
  emailInput:    'input[name="username"], input[type="email"], #username',
  passwordInput: 'input[name="password"], input[type="password"], #password',
  // Auth0 renders two button[type="submit"] — one hidden (aria-hidden), one visible (primary).
  // Always target the visible primary button.
  submitButton:  'button[type="submit"][data-action-button-primary="true"], button[type="submit"]:not([aria-hidden="true"])',
  appSidebar:    'aside[data-testid="main-sidebar"], aside[data-testid="app-layout-sidebar"]',
};

module.exports = async function globalSetup() {
  // ── Réutiliser la session existante si < 2h (évite les race conditions en mode parallèle) ──
  if (fs.existsSync(STORAGE_STATE)) {
    const ageMs = Date.now() - fs.statSync(STORAGE_STATE).mtimeMs;
    if (ageMs < 2 * 60 * 60 * 1000) {
      console.log(`[auth-setup] Session réutilisée (${Math.round(ageMs / 60000)}min) → ${STORAGE_STATE}`);
      return;
    }
  }

  // ── Validation ─────────────────────────────────────────────────────────────
  if (!EMAIL || !PASSWORD) {
    throw new Error(
      '[auth-setup] Missing credentials.\n' +
      '  Copy .env.example → .env and set GEO_USER_EMAIL + GEO_USER_PASSWORD.\n'
    );
  }

  // Ensure output directory exists
  const authDir = path.dirname(STORAGE_STATE);
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  const headless = process.env.HEADLESS !== 'false';
  const browser  = await chromium.launch({ headless });
  const context  = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page     = await context.newPage();

  try {
    // ── Navigate to app — triggers Auth0 redirect ───────────────────────────
    console.log(`\n[auth-setup] Opening ${BASE_URL} …`);
    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 45000 });

    // ── Step 1 : Email ───────────────────────────────────────────────────────
    console.log('[auth-setup] Step 1 — email field …');
    const emailInput = page.locator(SEL.emailInput).first();
    await emailInput.waitFor({ state: 'visible', timeout: 20000 });
    await emailInput.fill(EMAIL);

    // Click the "Continue" button (Auth0 step-1 submit)
    await page.locator(SEL.submitButton).click();

    // ── Step 2 : Password ────────────────────────────────────────────────────
    console.log('[auth-setup] Step 2 — password field …');
    const passwordInput = page.locator(SEL.passwordInput).first();
    await passwordInput.waitFor({ state: 'visible', timeout: 20000 });
    await passwordInput.fill(PASSWORD);

    // Click the final submit button ("Log In" / "Continue")
    await page.locator(SEL.submitButton).click();

    // ── Wait for successful redirect back to the GEO app ────────────────────
    console.log('[auth-setup] Waiting for app to load after redirect …');
    if (isUpsellSpec) {
      // Upsell user may not have sidebar access — navigate to upsell page directly
      const upsellUrl = process.env.UPSELL_URL;
      if (upsellUrl) {
        await page.goto(upsellUrl, { waitUntil: 'load', timeout: 30000 });
        // Extra wait for React to mount cookie banner (banner may not appear on first load after Auth0 redirect)
        await page.waitForTimeout(4000);
      }
      // Accept cookie consent so the session has cc_cookie set.
      // Required: without cc_cookie, "Speak to Us" opens the JitBridgeModal instead of SeeItInActionModal.
      const acceptBtn = page.locator('[data-testid="cc-cta-accept"]');
      if (await acceptBtn.isVisible({ timeout: 8000 }).catch(() => false)) {
        await acceptBtn.click();
        console.log('[auth-setup] Cookie consent accepted (cc_cookie set).');
        await page.waitForTimeout(2000);
        // Reload to let the app pick up the new cookie state
        if (upsellUrl) {
          await page.goto(upsellUrl, { waitUntil: 'load', timeout: 30000 });
          await page.waitForTimeout(1000);
        }
      } else {
        console.log('[auth-setup] Cookie banner not visible (cc_cookie may already be set).');
      }
      await page.locator('button:has-text("Speak to Us")').first()
        .waitFor({ state: 'visible', timeout: 30000 });
      console.log('[auth-setup] Upsell page loaded ("Speak to Us" visible).');
    } else {
      await page.locator(SEL.appSidebar).waitFor({ state: 'visible', timeout: 60000 });

      // ── Dismiss cookie banner (may appear on dashboard pages) ────────────────
      // Navigate to a dashboard URL if DASHBOARD_UUID is provided so the
      // consent cookie is set once and stored in the session.
      const dashboardUuid = process.env.DASHBOARD_UUID;
      if (dashboardUuid) {
        console.log('[auth-setup] Navigating to dashboard to dismiss cookie banner …');
        await page.goto(`${BASE_URL}/dashboard/${dashboardUuid}`, { waitUntil: 'load', timeout: 30000 });
        await H.dismissCookieBanner(page);
        console.log('[auth-setup] Cookie banner dismissed.');
      }
    }

    // ── Save session state ───────────────────────────────────────────────────
    await context.storageState({ path: STORAGE_STATE });
    console.log(`[auth-setup] Session saved → ${STORAGE_STATE}\n`);

  } catch (err) {
    // Save a debug screenshot so the caller can inspect the failure
    try {
      await page.screenshot({ path: ERROR_SCREENSHOT, fullPage: false });
      console.error(`[auth-setup] Login failed. Debug screenshot → ${ERROR_SCREENSHOT}`);
    } catch (_) { /* ignore screenshot errors */ }

    throw new Error(
      `[auth-setup] Authentication failed.\n` +
      `  Current URL : ${page.url()}\n` +
      `  Error       : ${err.message}\n` +
      `  Check GEO_USER_EMAIL / GEO_USER_PASSWORD in .env and retry.\n`
    );
  } finally {
    await browser.close();
  }
};
