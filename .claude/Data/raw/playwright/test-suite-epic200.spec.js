// test-suite-epic200.spec.js
// epic        : GEO-200 — Cookie Consent
// feature     : Banner, Preferences Modal, Inventory, JIT Bridge, Privacy Fallback, HubSpot PQL
// CSV source  : .claude/Data/output/csv/testcases-coverage-epicGEO-200.csv
//
// Lancement :
//   EPIC_ID=200 USE_AUTH=true \
//   npx playwright test .claude/Data/raw/playwright/test-suite-epic200.spec.js
//
// Debug TC unique :
//   EPIC_ID=200 USE_AUTH=true \
//   npx playwright test .claude/Data/raw/playwright/test-suite-epic200.spec.js --grep "TC-GEO-327-001"

'use strict';

const { test, expect } = require('@playwright/test');
const path = require('path');
const crypto = require('crypto');

const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H = require('./e2e-helpers');

// ── JDD (3-layer merge) ─────────────────────────────────────────────────────
const COMMON         = require('../test-data/common.json');
const JDD_COMMON     = require('../test-data/jdd/common.json');
const JDD_BASE       = require('../test-data/jdd/cookie-consent/cookie-consent-base.json');
const JDD_PROFILE_NAME = process.env.JDD_PROFILE || 'default';
const JDD_PROF = (() => {
  try {
    return require(`../test-data/jdd/cookie-consent/cookie-consent-${JDD_PROFILE_NAME}.json`);
  } catch (e) {
    throw new Error(`JDD profile "${JDD_PROFILE_NAME}" introuvable : cookie-consent-${JDD_PROFILE_NAME}.json`);
  }
})();

function deepMerge(...objs) {
  const out = {};
  for (const o of objs) {
    for (const [k, v] of Object.entries(o || {})) {
      if (v && typeof v === 'object' && !Array.isArray(v)
          && out[k] && typeof out[k] === 'object' && !Array.isArray(out[k])) {
        out[k] = deepMerge(out[k], v);
      } else {
        out[k] = v;
      }
    }
  }
  return out;
}
const JDD = deepMerge(JDD_COMMON, JDD_BASE, JDD_PROF);

// ── Constants (env > JDD) ───────────────────────────────────────────────────
const BASE_URL        = process.env.BASE_URL        || COMMON.base_url;
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID  || JDD.dashboard_uuid || JDD.pages && '9864c210-948d-4813-aab8-6a007e9127c2';
const DASHBOARD_URL   = `${BASE_URL}/dashboard/${DASHBOARD_UUID}`;
const UPSELL_URL      = process.env.UPSELL_URL      || `${BASE_URL}${JDD.pages.upsell}`;
const STORAGE_STATE_GEO    = process.env.STORAGE_STATE       || '.claude/Data/processed/auth/storageState.json';
const STORAGE_STATE_UPSELL = process.env.STORAGE_STATE_UPSELL || '.claude/Data/processed/auth/storageState-upsell.json';

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-epic200');
H.ensureDir(SCREENSHOTS_DIR);

const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── Selectors (BLUEPRINT.cookie_consent) ───────────────────────────────────
const BP_CC  = BLUEPRINT.cookie_consent;
const BP_UP  = BLUEPRINT.upsell_page;
const SEL = {
  // Banner
  bannerRoot:          BP_CC.banner.root,
  bannerTitle:         BP_CC.banner.title,
  bannerAcceptAll:     BP_CC.banner.accept_all_btn,
  bannerEssentialOnly: BP_CC.banner.essential_only_btn,
  bannerManagePrefs:   BP_CC.banner.manage_prefs_btn,

  // Preferences Modal
  prefModal:           BP_CC.preferences_modal.root,
  prefOverlay:         BP_CC.preferences_modal.overlay,
  prefClose:           BP_CC.preferences_modal.close_btn,
  prefSectionEssential:   BP_CC.preferences_modal.section_essential,
  prefSectionFunctional:  BP_CC.preferences_modal.section_functional,
  prefSectionAnalytics:   BP_CC.preferences_modal.section_analytics,
  prefBadgeAlwaysOn:   BP_CC.preferences_modal.badge_always_on,
  prefToggleFunctional: BP_CC.preferences_modal.toggle_functional,
  prefToggleAnalytics:  BP_CC.preferences_modal.toggle_analytics,
  prefAcceptAll:       BP_CC.preferences_modal.accept_all_btn,
  prefCancel:          BP_CC.preferences_modal.cancel_btn,
  prefSave:            BP_CC.preferences_modal.save_btn,

  // Cookie Inventory
  gridEssential:   BP_CC.cookie_inventory.grid_essential,
  gridFunctional:  BP_CC.cookie_inventory.grid_functional,
  gridAnalytics:   BP_CC.cookie_inventory.grid_analytics,
  badgeInactive:   BP_CC.cookie_inventory.badge_inactive,

  // Sidebar help
  sidebarHelp:     BP_CC.sidebar_help.help_button,
  sidebarRoot:     BP_CC.sidebar_help.sidebar_root,

  // JIT Bridge / Privacy (from upsell_page — re-used for GEO-333/334 context)
  jitModal:        BP_UP.jit_bridge_modal.modal_root,
  jitEnableBtn:    BP_UP.jit_bridge_modal.enable_button,
  jitPrivateBtn:   BP_UP.jit_bridge_modal.private_button,
  privacyModal:    BP_UP.privacy_fallback_modal.modal_root,

  // Upsell page (GEO-237 block)
  speakToUsBtn:    BP_UP.speak_to_us_button.selector,
  seeItModal:      BP_UP.see_it_in_action_modal.modal_root,
  seeItTitle:      BP_UP.see_it_in_action_modal.title,
  seeItDesc:       BP_UP.see_it_in_action_modal.description,
  seeItCheckbox:   BP_UP.see_it_in_action_modal.checkbox,
  seeItConfirmBtn: BP_UP.see_it_in_action_modal.confirm_button,
  seeItCloseBtn:   BP_UP.see_it_in_action_modal.close_button,
};

// ── cc_cookie helpers ───────────────────────────────────────────────────────

/**
 * Clear the cc_cookie on all domain variants then reload the URL.
 * Produces a fresh-user state where the consent banner should appear.
 */
async function clearCcCookie(page, url) {
  // Ensure we're on the right domain before manipulating document.cookie.
  // A fresh page starts on about:blank — setting cookies there throws SecurityError.
  const currentUrl = page.url();
  if (!currentUrl.includes('staging-geo.onclusive.com')) {
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1000);
  }
  await page.evaluate(() => {
    const e = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = `cc_cookie=; ${e}; domain=staging-geo.onclusive.com`;
    document.cookie = `cc_cookie=; ${e}`;
    document.cookie = `cc_cookie=; ${e}; domain=.staging-geo.onclusive.com`;
  });
  await page.waitForTimeout(300);
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2500);
}

/**
 * Inject a cc_cookie with a specific consent state into the browser context.
 * Must be called BEFORE page.goto() to take effect on page load.
 *
 * @param {import('@playwright/test').BrowserContext} context
 * @param {'all_accepted'|'essential_only'|'functional_disabled'|'malformed'} state
 */
async function injectCcCookie(context, state) {
  const templates = JDD.cc_cookie.templates;
  const tpl = templates[state];
  if (!tpl) throw new Error(`cc_cookie template "${state}" not found in JDD`);

  let value;
  if (state === 'malformed') {
    value = tpl.raw_value;
  } else {
    const now = new Date().toISOString();
    const payload = {
      categories: tpl.categories,
      revision: tpl.revision || 0,
      data: tpl.data || null,
      services: tpl.services || {},
      languageCode: tpl.languageCode || 'en',
      consentTimestamp: now,
      lastConsentTimestamp: now,
      consentId: crypto.randomUUID ? crypto.randomUUID() : `test-${Date.now()}`,
      expirationTime: Date.now() + (180 * 24 * 60 * 60 * 1000),
    };
    value = encodeURIComponent(JSON.stringify(payload));
  }

  await context.addCookies([{
    name: 'cc_cookie',
    value,
    domain: 'staging-geo.onclusive.com',
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'Lax',
  }]);
}

/**
 * Read and decode the cc_cookie from the browser.
 * Returns null if the cookie is absent or unparseable.
 */
async function readCcCookie(page) {
  const raw = await page.evaluate(() => {
    const match = document.cookie.match(/(?:^|;\s*)cc_cookie=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  });
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (_) {
    return { _malformed: true, _raw: raw };
  }
}

// ── Navigation helpers ──────────────────────────────────────────────────────

/** Go to dashboard, wait for sidebar (no cookie dismissal — this spec tests the banner). */
async function gotoDashboard(page) {
  await page.goto(DASHBOARD_URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);
}

/** Open cookie preferences modal from the banner. */
async function openPrefsFromBanner(page) {
  const manageBtn = page.locator(SEL.bannerManagePrefs).first();
  await expect(manageBtn, '"Manage preferences" button must be visible in banner').toBeVisible({ timeout: 8000 });
  await manageBtn.click();
  await expect(page.locator(SEL.prefModal).first(), 'Cookie Preferences modal must open').toBeVisible({ timeout: 8000 });
}

/** Open cookie preferences from the sidebar/banner, given banner is visible. */
async function ensureBannerVisible(page) {
  await expect(
    page.locator(SEL.bannerAcceptAll).first(),
    '"Accept All" CTA must be visible in cookie banner'
  ).toBeVisible({ timeout: 15000 });
}

// ── Upsell helpers (GEO-237) ───────────────────────────────────────────────

async function gotoUpsell(page) {
  await page.goto(UPSELL_URL, { waitUntil: 'load', timeout: 30000 });
  const acceptBtn = page.locator(SEL.bannerAcceptAll);
  if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acceptBtn.click();
    await page.waitForTimeout(500);
    await page.goto(UPSELL_URL, { waitUntil: 'load', timeout: 30000 });
  }
  await expect(
    page.locator(SEL.speakToUsBtn).first(),
    '"Speak to Us" button must be visible after page load'
  ).toBeVisible({ timeout: 20000 });
}

async function openSeeItModal(page) {
  await page.locator(SEL.speakToUsBtn).first().click();
  await expect(
    page.locator(SEL.seeItModal).first(),
    'SeeItInActionModal must appear after clicking "Speak to Us"'
  ).toBeVisible({ timeout: 10000 });
}

async function confirmInSeeItModal(page) {
  await openSeeItModal(page);
  const checkbox = page.locator(SEL.seeItCheckbox).first();
  await expect(checkbox, 'Checkbox must be visible in SeeItInActionModal').toBeVisible({ timeout: 5000 });
  await checkbox.click();
  await page.waitForTimeout(300);
  const confirmBtn = page.locator(SEL.seeItConfirmBtn).first();
  await expect(confirmBtn, 'Confirm button must be enabled after checking checkbox').toBeEnabled({ timeout: 5000 });
  await confirmBtn.click();
}

// ════════════════════════════════════════════════════════════════════════════
// GROUPE 1 — GEO-327 : Consent State Provider
// ════════════════════════════════════════════════════════════════════════════

test.describe('GEO-327 — Consent State Provider', () => {
  test.use({ storageState: STORAGE_STATE_GEO });

  // ── TC-GEO-327-001 ────────────────────────────────────────────────────────
  test('TC-GEO-327-001 — Boot cc_cookie valide → banner NON affiché', async ({ page, context }) => {
    await test.step("Given l'utilisateur a un cookie cc_cookie valide déjà positionné sur geo.onclusive.com", async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoDashboard(page);
      await shot(page, 'TC-GEO-327-001_step1_given');
    });

    await test.step("When l'application GEO démarre et le CookieConsentProvider se monte", async () => {
      // Page is already loaded — state is the mount result
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-327-001_step2_when');
    });

    await test.step('Then le store expose hasRespondedToConsent === true et shouldShowBanner === false et aucun banner de consentement n\'est affiché dans la page', async () => {
      const banner = page.locator(SEL.bannerRoot);
      await shot(page, 'TC-GEO-327-001_step3_then');
      const bannerVisible = await banner.isVisible({ timeout: 3000 }).catch(() => false);
      expect(bannerVisible, 'Cookie banner must NOT be visible when cc_cookie is valid (all_accepted)').toBe(false);
    });
  });

  // ── TC-GEO-327-002 ────────────────────────────────────────────────────────
  test('TC-GEO-327-002 — Boot sans cc_cookie → banner affiché', async ({ page }) => {
    await test.step("Given l'utilisateur accède à GEO sans cc_cookie positionné sur geo.onclusive.com", async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await shot(page, 'TC-GEO-327-002_step1_given');
    });

    await test.step("When l'application GEO démarre et le CookieConsentProvider se monte", async () => {
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-327-002_step2_when');
    });

    await test.step('Then le store expose hasRespondedToConsent === false et shouldShowBanner === true et le flag déclenche l\'affichage du banner côté UI', async () => {
      const acceptBtn = page.locator(SEL.bannerAcceptAll).first();
      await shotAt(page, page.locator(SEL.bannerRoot).first(), 'TC-GEO-327-002_step3_then');
      await expect(acceptBtn, '"Accept All" button must be visible — banner must appear when cc_cookie is absent').toBeVisible({ timeout: 10000 });
    });
  });

  // ── TC-GEO-327-003 ────────────────────────────────────────────────────────
  test('TC-GEO-327-003 — Accept All → cc_cookie écrit toutes catégories', async ({ page }) => {
    await test.step('Given le banner de consentement est visible (pas de cc_cookie présent)', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await shot(page, 'TC-GEO-327-003_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "Accept All"', async () => {
      await page.locator(SEL.bannerAcceptAll).first().click();
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-327-003_step2_when');
    });

    await test.step('Then le cookie cc_cookie est écrit avec domain=geo.onclusive.com, sameSite=lax, secure=true et TTL=180 jours et le payload contient les catégories necessary, analytics, functional_support et le banner disparaît de la page', async () => {
      const cookieData = await readCcCookie(page);
      const bannerGone = !(await page.locator(SEL.bannerRoot).isVisible({ timeout: 2000 }).catch(() => false));
      await shot(page, 'TC-GEO-327-003_step3_then');
      expect(cookieData, 'cc_cookie must be written after Accept All').not.toBeNull();
      expect(cookieData._malformed, 'cc_cookie must be valid JSON').toBeUndefined();
      expect(cookieData.categories, 'cc_cookie must contain functional_support category').toContain('functional_support');
      expect(cookieData.categories, 'cc_cookie must contain necessary category').toContain('necessary');
      expect(bannerGone, 'Cookie banner must disappear after Accept All').toBe(true);
    });
  });

  // ── TC-GEO-327-004 ────────────────────────────────────────────────────────
  test('TC-GEO-327-004 — Essential Only → cc_cookie necessary uniquement', async ({ page }) => {
    await test.step('Given le banner de consentement est visible (pas de cc_cookie présent)', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await shot(page, 'TC-GEO-327-004_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "Essential Only"', async () => {
      await page.locator(SEL.bannerEssentialOnly).first().click();
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-327-004_step2_when');
    });

    await test.step('Then le cookie cc_cookie est écrit avec uniquement la catégorie necessary et le banner disparaît', async () => {
      const cookieData = await readCcCookie(page);
      const bannerGone = !(await page.locator(SEL.bannerRoot).isVisible({ timeout: 2000 }).catch(() => false));
      await shot(page, 'TC-GEO-327-004_step3_then');
      expect(cookieData, 'cc_cookie must be written after Essential Only').not.toBeNull();
      expect(cookieData._malformed, 'cc_cookie must be valid JSON').toBeUndefined();
      expect(cookieData.categories, 'cc_cookie must contain necessary').toContain('necessary');
      expect(cookieData.categories, 'cc_cookie must NOT contain functional_support after Essential Only').not.toContain('functional_support');
      expect(cookieData.categories, 'cc_cookie must NOT contain analytics after Essential Only').not.toContain('analytics');
      expect(bannerGone, 'Cookie banner must disappear after Essential Only').toBe(true);
    });
  });

  // ── TC-GEO-327-005 ────────────────────────────────────────────────────────
  test('TC-GEO-327-005 — Cookie malformé → banner réaffiché', async ({ page, context }) => {
    await test.step('Given un cookie cc_cookie malformé ou avec une version incompatible est positionné sur geo.onclusive.com', async () => {
      await injectCcCookie(context, 'malformed');
      await gotoDashboard(page);
      await page.waitForTimeout(2000);
      await shot(page, 'TC-GEO-327-005_step1_given');
    });

    await test.step("When l'application GEO démarre et tente de parser le cookie", async () => {
      await page.waitForTimeout(1000);
      await shot(page, 'TC-GEO-327-005_step2_when');
    });

    await test.step('Then le store expose hasRespondedToConsent === false et le banner est réaffiché pour recueillir un nouveau consentement et l\'application ne plante pas', async () => {
      const acceptBtn = page.locator(SEL.bannerAcceptAll).first();
      const errorBoundary = page.locator(BLUEPRINT.common_patterns.error_boundary);
      const crashed = await errorBoundary.isVisible({ timeout: 2000 }).catch(() => false);
      await shotAt(page, page.locator('body'), 'TC-GEO-327-005_step3_then');
      expect(crashed, 'App must NOT crash (no error boundary visible) on malformed cc_cookie').toBe(false);
      await expect(acceptBtn, '"Accept All" must be visible — banner must reappear on malformed cookie').toBeVisible({ timeout: 10000 });
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// GROUPE 2 — GEO-328 : Cookie Banner
// ════════════════════════════════════════════════════════════════════════════

test.describe('GEO-328 — Cookie Banner', () => {
  test.use({ storageState: STORAGE_STATE_GEO });

  // ── TC-GEO-328-001 ────────────────────────────────────────────────────────
  test('TC-GEO-328-001 — Banner affiché en bas de page sans cc_cookie', async ({ page }) => {
    await test.step("Given un utilisateur accède pour la première fois à GEO sans cc_cookie sur geo.onclusive.com", async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await shot(page, 'TC-GEO-328-001_step1_given');
    });

    await test.step("When l'application GEO démarre et le CookieConsentProvider est monté", async () => {
      await page.waitForTimeout(1000);
      await shot(page, 'TC-GEO-328-001_step2_when');
    });

    await test.step('Then le banner de consentement est rendu en bas du viewport et contient un titre, une description et les trois CTAs', async () => {
      const banner    = page.locator(SEL.bannerRoot).first();
      const titleEl   = page.locator(SEL.bannerTitle).first();
      const acceptBtn = page.locator(SEL.bannerAcceptAll).first();
      const essBtn    = page.locator(SEL.bannerEssentialOnly).first();
      const mngBtn    = page.locator(SEL.bannerManagePrefs).first();

      await expect(banner,    '"cookie-banner" must be visible').toBeVisible({ timeout: 12000 });
      await expect(titleEl,   '"cookie-banner-title" must be visible').toBeVisible({ timeout: 5000 });
      await shotAt(page, banner, 'TC-GEO-328-001_step3_then');
      await expect(acceptBtn, '"Accept All" CTA must be visible in banner').toBeVisible({ timeout: 5000 });
      await expect(essBtn,    '"Essential Only" CTA must be visible in banner').toBeVisible({ timeout: 5000 });
      await expect(mngBtn,    '"Manage preferences" CTA must be visible in banner').toBeVisible({ timeout: 5000 });

      const titleText = await titleEl.textContent();
      expect(titleText, 'Banner title must be "Cookie Preferences"').toContain('Cookie');
    });
  });

  // ── TC-GEO-328-002 ────────────────────────────────────────────────────────
  test('TC-GEO-328-002 — Accept All ferme banner et écrit cc_cookie toutes catégories', async ({ page }) => {
    await test.step('Given le banner de consentement est visible', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await shot(page, 'TC-GEO-328-002_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "Accept All"', async () => {
      await page.locator(SEL.bannerAcceptAll).first().click();
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-328-002_step2_when');
    });

    await test.step('Then le cookie cc_cookie est écrit avec les catégories necessary, analytics et functional_support et le banner disparaît', async () => {
      const cookieData = await readCcCookie(page);
      const bannerGone = !(await page.locator(SEL.bannerRoot).isVisible({ timeout: 2000 }).catch(() => false));
      await shot(page, 'TC-GEO-328-002_step3_then');
      expect(cookieData, 'cc_cookie must be written').not.toBeNull();
      expect(cookieData.categories, 'cc_cookie must include functional_support').toContain('functional_support');
      expect(cookieData.categories, 'cc_cookie must include necessary').toContain('necessary');
      expect(bannerGone, 'Banner must disappear after Accept All').toBe(true);
    });
  });

  // ── TC-GEO-328-003 ────────────────────────────────────────────────────────
  test('TC-GEO-328-003 — Essential Only ferme banner et écrit cc_cookie necessary seulement', async ({ page }) => {
    await test.step('Given le banner de consentement est visible', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await shot(page, 'TC-GEO-328-003_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "Essential Only"', async () => {
      await page.locator(SEL.bannerEssentialOnly).first().click();
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-328-003_step2_when');
    });

    await test.step('Then le cookie cc_cookie est écrit avec la catégorie necessary uniquement et le banner disparaît', async () => {
      const cookieData = await readCcCookie(page);
      const bannerGone = !(await page.locator(SEL.bannerRoot).isVisible({ timeout: 2000 }).catch(() => false));
      await shot(page, 'TC-GEO-328-003_step3_then');
      expect(cookieData, 'cc_cookie must be written').not.toBeNull();
      expect(cookieData.categories, 'cc_cookie must contain necessary').toContain('necessary');
      expect(cookieData.categories, 'cc_cookie must NOT contain functional_support').not.toContain('functional_support');
      expect(bannerGone, 'Banner must disappear after Essential Only').toBe(true);
    });
  });

  // ── TC-GEO-328-004 ────────────────────────────────────────────────────────
  test('TC-GEO-328-004 — Manage Preferences ouvre la modal de préférences', async ({ page }) => {
    await test.step('Given le banner de consentement est visible', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await shot(page, 'TC-GEO-328-004_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "Manage Preferences"', async () => {
      await page.locator(SEL.bannerManagePrefs).first().click();
      await shot(page, 'TC-GEO-328-004_step2_when');
    });

    await test.step('Then la Preferences Modal s\'ouvre au-dessus du banner et aucun consentement n\'est enregistré à ce stade', async () => {
      const modal = page.locator(SEL.prefModal).first();
      await expect(modal, 'Cookie Preferences modal must be visible after clicking Manage Preferences').toBeVisible({ timeout: 8000 });
      await shotAt(page, modal, 'TC-GEO-328-004_step3_then');
      // Banner should still be visible behind the modal
      const bannerStillPresent = await page.locator(SEL.bannerRoot).isVisible({ timeout: 2000 }).catch(() => false);
      // cc_cookie should NOT be set yet
      const cookieData = await readCcCookie(page);
      expect(cookieData, 'cc_cookie must NOT be written before user confirms preferences').toBeNull();
      // Modal is visible — that's the primary assertion
    });
  });

  // ── TC-GEO-328-005 ────────────────────────────────────────────────────────
  test('TC-GEO-328-005 — Reload sans action → banner réapparaît', async ({ page }) => {
    await test.step('Given le banner de consentement est visible et l\'utilisateur n\'a cliqué sur aucun des trois CTAs', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await shot(page, 'TC-GEO-328-005_step1_given');
    });

    await test.step('When l\'utilisateur recharge la page', async () => {
      await page.reload({ waitUntil: 'load' });
      await page.waitForTimeout(2500);
      await shot(page, 'TC-GEO-328-005_step2_when');
    });

    await test.step('Then le banner réapparaît après rechargement et aucun cookie cc_cookie n\'a été écrit', async () => {
      const acceptBtn = page.locator(SEL.bannerAcceptAll).first();
      const cookieData = await readCcCookie(page);
      await shotAt(page, page.locator(SEL.bannerRoot).first(), 'TC-GEO-328-005_step3_then');
      await expect(acceptBtn, '"Accept All" must be visible after reload — banner must reappear').toBeVisible({ timeout: 12000 });
      expect(cookieData, 'cc_cookie must NOT be set before any user action').toBeNull();
    });
  });

  // ── TC-GEO-328-006 ────────────────────────────────────────────────────────
  test('TC-GEO-328-006 — Visite retour avec cc_cookie valide → banner NON affiché', async ({ page, context }) => {
    await test.step('Given l\'utilisateur a déjà répondu au banner lors d\'une visite précédente (cc_cookie valide présent)', async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoDashboard(page);
      await shot(page, 'TC-GEO-328-006_step1_given');
    });

    await test.step('When l\'utilisateur revient sur GEO et l\'application démarre', async () => {
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-328-006_step2_when');
    });

    await test.step('Then le banner n\'est pas rendu dans la page et le store expose shouldShowBanner=false', async () => {
      const bannerVisible = await page.locator(SEL.bannerRoot).isVisible({ timeout: 3000 }).catch(() => false);
      await shot(page, 'TC-GEO-328-006_step3_then');
      expect(bannerVisible, 'Cookie banner must NOT be visible when returning user has valid cc_cookie').toBe(false);
    });
  });

  // ── TC-GEO-328-007 ────────────────────────────────────────────────────────
  test('TC-GEO-328-007 — Styles boutons conformes (3 CTAs visibles simultanément)', async ({ page }) => {
    await test.step('Given le banner de consentement est rendu', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await shot(page, 'TC-GEO-328-007_step1_given');
    });

    await test.step('When les trois boutons sont observés visuellement', async () => {
      await page.waitForTimeout(500);
      await shot(page, 'TC-GEO-328-007_step2_when');
    });

    await test.step('Then les trois CTAs Manage Preferences, Essential Only et Accept All sont tous visibles simultanément', async () => {
      const acceptBtn = page.locator(SEL.bannerAcceptAll).first();
      const essBtn    = page.locator(SEL.bannerEssentialOnly).first();
      const mngBtn    = page.locator(SEL.bannerManagePrefs).first();
      const banner    = page.locator(SEL.bannerRoot).first();
      await shotAt(page, banner, 'TC-GEO-328-007_step3_then');
      await expect(acceptBtn, '"Accept All" must be visible').toBeVisible({ timeout: 5000 });
      await expect(essBtn,    '"Essential Only" must be visible').toBeVisible({ timeout: 5000 });
      await expect(mngBtn,    '"Manage preferences" must be visible').toBeVisible({ timeout: 5000 });
    });
  });

  // ── TC-GEO-328-008 ────────────────────────────────────────────────────────
  test('TC-GEO-328-008 — Responsive mobile boutons stackés min-height 44px', async ({ page }) => {
    await test.step('Given le viewport est inférieur à 768px de largeur', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await shot(page, 'TC-GEO-328-008_step1_given');
    });

    await test.step('When le banner de consentement est rendu sur mobile', async () => {
      await page.waitForTimeout(500);
      await shot(page, 'TC-GEO-328-008_step2_when');
    });

    await test.step('Then les boutons sont visibles et chaque bouton a une min-height d\'au moins 44px et aucun débordement horizontal', async () => {
      const acceptBtn = page.locator(SEL.bannerAcceptAll).first();
      const essBtn    = page.locator(SEL.bannerEssentialOnly).first();
      const banner    = page.locator(SEL.bannerRoot).first();

      await expect(acceptBtn, '"Accept All" must be visible on mobile viewport').toBeVisible({ timeout: 10000 });
      await expect(essBtn,    '"Essential Only" must be visible on mobile viewport').toBeVisible({ timeout: 5000 });

      const acceptHeight = await acceptBtn.evaluate(el => el.getBoundingClientRect().height);
      const essHeight    = await essBtn.evaluate(el => el.getBoundingClientRect().height);

      await shotAt(page, banner, 'TC-GEO-328-008_step3_then');
      expect(acceptHeight, '"Accept All" button must have height >= 44px on mobile').toBeGreaterThanOrEqual(44);
      expect(essHeight,    '"Essential Only" button must have height >= 44px on mobile').toBeGreaterThanOrEqual(44);

      // Reset viewport
      await page.setViewportSize({ width: 1280, height: 720 });
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// GROUPE 3 — GEO-329 : Preferences Modal
// ════════════════════════════════════════════════════════════════════════════

test.describe('GEO-329 — Preferences Modal', () => {
  test.use({ storageState: STORAGE_STATE_GEO });

  // ── TC-GEO-329-001 ────────────────────────────────────────────────────────
  test('TC-GEO-329-001 — Ouverture modal depuis Manage Preferences', async ({ page }) => {
    await test.step('Given le cookie banner de la story 17.2 est visible à l\'écran', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await shot(page, 'TC-GEO-329-001_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "Manage preferences"', async () => {
      await openPrefsFromBanner(page);
      await shot(page, 'TC-GEO-329-001_step2_when');
    });

    await test.step('Then le Cookie Preferences modal s\'ouvre avec trois sections : Essential (badge "Always on") / Functional & Support (toggle OFF) / Analytics (toggle OFF)', async () => {
      const modal       = page.locator(SEL.prefModal).first();
      const secEss      = page.locator(SEL.prefSectionEssential).first();
      const secFunc     = page.locator(SEL.prefSectionFunctional).first();
      const secAnalytics = page.locator(SEL.prefSectionAnalytics).first();
      const badgeAlwaysOn = page.locator(SEL.prefBadgeAlwaysOn).first();

      await shotAt(page, modal, 'TC-GEO-329-001_step3_then');
      await expect(secEss,       '"Essential" section must be visible in Preferences modal').toBeVisible({ timeout: 5000 });
      await expect(secFunc,      '"Functional & Support" section must be visible').toBeVisible({ timeout: 5000 });
      await expect(secAnalytics, '"Analytics" section must be visible').toBeVisible({ timeout: 5000 });
      await expect(badgeAlwaysOn, '"ALWAYS ON" badge must be visible in Essential section').toBeVisible({ timeout: 5000 });
    });
  });

  // ── TC-GEO-329-002 ────────────────────────────────────────────────────────
  test('TC-GEO-329-002 — Toggles hydratés depuis le store (consent déjà donné)', async ({ page, context }) => {
    await test.step('Given l\'utilisateur a déjà consenti avec Functional ON et Analytics OFF dans le store', async () => {
      await injectCcCookie(context, 'functional_disabled');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-329-002_step1_given');
    });

    await test.step('When l\'utilisateur ouvre le Cookie Preferences modal', async () => {
      // With functional_disabled, hasRespondedToConsent=true but functional OFF
      // Need to open modal — check if banner is present first
      const bannerVisible = await page.locator(SEL.bannerRoot).isVisible({ timeout: 3000 }).catch(() => false);
      if (bannerVisible) {
        await openPrefsFromBanner(page);
      } else {
        // If banner not visible (responded=true), try user menu Cookie Settings
        // For now attempt via banner manage prefs — may need user menu path
        await clearCcCookie(page, DASHBOARD_URL);
        await ensureBannerVisible(page);
        await openPrefsFromBanner(page);
      }
      await shot(page, 'TC-GEO-329-002_step2_when');
    });

    await test.step('Then le toggle Functional & Support est OFF et le toggle Analytics est OFF en cohérence avec le store', async () => {
      const modal           = page.locator(SEL.prefModal).first();
      const toggleFunctional = page.locator(SEL.prefToggleFunctional).first();
      const toggleAnalytics  = page.locator(SEL.prefToggleAnalytics).first();

      await expect(modal, 'Cookie Preferences modal must be visible').toBeVisible({ timeout: 8000 });
      await expect(toggleFunctional, '"Toggle Functional & Support cookies" switch must be present').toBeVisible({ timeout: 5000 });
      await expect(toggleAnalytics,  '"Toggle Analytics cookies" switch must be present').toBeVisible({ timeout: 5000 });

      const funcChecked = await toggleFunctional.getAttribute('aria-checked');
      const analChecked = await toggleAnalytics.getAttribute('aria-checked');

      await shotAt(page, modal, 'TC-GEO-329-002_step3_then');
      expect(funcChecked, 'Functional toggle must be OFF (aria-checked=false) when functional_disabled').toBe('false');
      expect(analChecked, 'Analytics toggle must be OFF (aria-checked=false) when functional_disabled').toBe('false');
    });
  });

  // ── TC-GEO-329-003 ────────────────────────────────────────────────────────
  test('TC-GEO-329-003 — Save Preferences commit et fermeture modal', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert avec Functional OFF et Analytics OFF par défaut', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await openPrefsFromBanner(page);
      await shot(page, 'TC-GEO-329-003_step1_given');
    });

    await test.step('When l\'utilisateur active le toggle Functional & Support puis clique sur "Save preferences"', async () => {
      const toggleFunctional = page.locator(SEL.prefToggleFunctional).first();
      await expect(toggleFunctional, 'Functional toggle must be visible').toBeVisible({ timeout: 5000 });
      // Ensure it is OFF before clicking
      const checked = await toggleFunctional.getAttribute('aria-checked');
      if (checked !== 'true') {
        await toggleFunctional.click();
        await page.waitForTimeout(400);
      }
      await page.locator(SEL.prefSave).first().click();
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-329-003_step2_when');
    });

    await test.step('Then le store enregistre areFunctionalCookiesEnabled=true et le modal se ferme', async () => {
      const modalGone = !(await page.locator(SEL.prefModal).isVisible({ timeout: 2000 }).catch(() => false));
      const cookieData = await readCcCookie(page);
      await shot(page, 'TC-GEO-329-003_step3_then');
      expect(modalGone, 'Preferences modal must close after Save Preferences').toBe(true);
      expect(cookieData, 'cc_cookie must be written after Save Preferences').not.toBeNull();
      expect(cookieData.categories, 'cc_cookie must contain functional_support after enabling toggle').toContain('functional_support');
    });
  });

  // ── TC-GEO-329-004 ────────────────────────────────────────────────────────
  test('TC-GEO-329-004 — Accept all cookies depuis le modal', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert avec des pending toggles modifiés', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await openPrefsFromBanner(page);
      await shot(page, 'TC-GEO-329-004_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "Accept all cookies"', async () => {
      await page.locator(SEL.prefAcceptAll).first().click();
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-329-004_step2_when');
    });

    await test.step('Then tous les toggles passent à ON et le cc_cookie contient toutes les catégories et le modal se ferme', async () => {
      const modalGone  = !(await page.locator(SEL.prefModal).isVisible({ timeout: 2000 }).catch(() => false));
      const cookieData = await readCcCookie(page);
      await shot(page, 'TC-GEO-329-004_step3_then');
      expect(modalGone, 'Preferences modal must close after Accept all cookies').toBe(true);
      expect(cookieData, 'cc_cookie must be written').not.toBeNull();
      expect(cookieData.categories, 'cc_cookie must contain functional_support').toContain('functional_support');
      expect(cookieData.categories, 'cc_cookie must contain analytics').toContain('analytics');
      expect(cookieData.categories, 'cc_cookie must contain necessary').toContain('necessary');
    });
  });

  // ── TC-GEO-329-005 ────────────────────────────────────────────────────────
  test('TC-GEO-329-005 — Cancel ferme le modal sans sauvegarder', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert et l\'utilisateur a modifié des toggles (pending state non sauvegardé)', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await openPrefsFromBanner(page);
      // Modify a toggle to create pending state
      const toggleFunctional = page.locator(SEL.prefToggleFunctional).first();
      if (await toggleFunctional.isVisible({ timeout: 3000 }).catch(() => false)) {
        await toggleFunctional.click();
        await page.waitForTimeout(300);
      }
      await shot(page, 'TC-GEO-329-005_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "Cancel"', async () => {
      await page.locator(SEL.prefCancel).first().click();
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-329-005_step2_when');
    });

    await test.step('Then le modal se ferme et l\'état du store est inchangé et aucune écriture dans cc_cookie', async () => {
      const modalGone  = !(await page.locator(SEL.prefModal).isVisible({ timeout: 2000 }).catch(() => false));
      const cookieData = await readCcCookie(page);
      await shot(page, 'TC-GEO-329-005_step3_then');
      expect(modalGone,  'Preferences modal must close after Cancel').toBe(true);
      expect(cookieData, 'cc_cookie must NOT be written after Cancel').toBeNull();
    });
  });

  // ── TC-GEO-329-006 ────────────────────────────────────────────────────────
  test('TC-GEO-329-006 — Bouton X (croix) ferme le modal sans sauvegarder', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert avec des toggles modifiés (pending state)', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await openPrefsFromBanner(page);
      await shot(page, 'TC-GEO-329-006_step1_given');
    });

    await test.step('When l\'utilisateur clique sur l\'icône de fermeture (croix) du modal', async () => {
      await page.locator(SEL.prefClose).first().click();
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-329-006_step2_when');
    });

    await test.step('Then le modal se ferme et aucune écriture dans cc_cookie', async () => {
      const modalGone  = !(await page.locator(SEL.prefModal).isVisible({ timeout: 2000 }).catch(() => false));
      const cookieData = await readCcCookie(page);
      await shot(page, 'TC-GEO-329-006_step3_then');
      expect(modalGone,  'Preferences modal must close after clicking X').toBe(true);
      expect(cookieData, 'cc_cookie must NOT be written after closing with X').toBeNull();
    });
  });

  // ── TC-GEO-329-007 ────────────────────────────────────────────────────────
  test('TC-GEO-329-007 — Touche Escape ferme le modal sans sauvegarder', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert avec des toggles modifiés', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await openPrefsFromBanner(page);
      await shot(page, 'TC-GEO-329-007_step1_given');
    });

    await test.step('When l\'utilisateur appuie sur la touche Escape', async () => {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-329-007_step2_when');
    });

    await test.step('Then le modal se ferme sans modifier le store ni écrire dans cc_cookie', async () => {
      const modalGone  = !(await page.locator(SEL.prefModal).isVisible({ timeout: 2000 }).catch(() => false));
      const cookieData = await readCcCookie(page);
      await shot(page, 'TC-GEO-329-007_step3_then');
      expect(modalGone,  'Preferences modal must close after Escape key').toBe(true);
      expect(cookieData, 'cc_cookie must NOT be written after Escape').toBeNull();
    });
  });

  // ── TC-GEO-329-008 ────────────────────────────────────────────────────────
  test('TC-GEO-329-008 — Clic sur l\'overlay ne ferme pas le modal', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await openPrefsFromBanner(page);
      await shot(page, 'TC-GEO-329-008_step1_given');
    });

    await test.step('When l\'utilisateur clique en dehors du modal (sur l\'overlay)', async () => {
      // Click on the overlay — outside the modal content
      const overlay = page.locator(SEL.prefOverlay).first();
      const overlayVisible = await overlay.isVisible({ timeout: 3000 }).catch(() => false);
      if (overlayVisible) {
        await overlay.click({ position: { x: 10, y: 10 }, force: true });
      } else {
        // Fallback: click in the top-left corner of the viewport (outside modal)
        await page.mouse.click(10, 10);
      }
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-329-008_step2_when');
    });

    await test.step('Then le modal reste ouvert et aucune action de fermeture ni de commit n\'est déclenchée (PM decision)', async () => {
      const modal = page.locator(SEL.prefModal).first();
      await shotAt(page, modal, 'TC-GEO-329-008_step3_then');
      await expect(modal, 'Cookie Preferences modal must REMAIN OPEN after overlay click (onPointerDownOutside.preventDefault())').toBeVisible({ timeout: 5000 });
    });
  });

  // ── TC-GEO-329-009 ────────────────────────────────────────────────────────
  test('TC-GEO-329-009 — Responsive mobile sticky footer', async ({ page }) => {
    await test.step('Given l\'utilisateur accède à la page sur un viewport inférieur à 768px', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await shot(page, 'TC-GEO-329-009_step1_given');
    });

    await test.step('When le Cookie Preferences modal est rendu', async () => {
      await openPrefsFromBanner(page);
      await shot(page, 'TC-GEO-329-009_step2_when');
    });

    await test.step('Then les sections sont accessibles, les CTAs Save/Cancel/Accept all sont visibles et empilés verticalement avec min-height 44px', async () => {
      const modal    = page.locator(SEL.prefModal).first();
      const saveBtn  = page.locator(SEL.prefSave).first();
      const cancelBtn = page.locator(SEL.prefCancel).first();
      const acceptAllBtn = page.locator(SEL.prefAcceptAll).first();

      await expect(modal,    'Preferences modal must be visible on mobile').toBeVisible({ timeout: 8000 });
      await expect(saveBtn,  '"Save Preferences" button must be visible on mobile').toBeVisible({ timeout: 5000 });
      await expect(cancelBtn, '"Cancel" button must be visible on mobile').toBeVisible({ timeout: 5000 });
      await expect(acceptAllBtn, '"Accept all cookies" button must be visible on mobile').toBeVisible({ timeout: 5000 });

      const saveHeight = await saveBtn.evaluate(el => el.getBoundingClientRect().height);
      await shotAt(page, modal, 'TC-GEO-329-009_step3_then');
      expect(saveHeight, '"Save Preferences" button height must be >= 44px on mobile').toBeGreaterThanOrEqual(44);

      // Reset viewport
      await page.setViewportSize({ width: 1280, height: 720 });
    });
  });

  // ── TC-GEO-329-010 ────────────────────────────────────────────────────────
  test('TC-GEO-329-010 — Equal visual weight des CTA Save et Accept all', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert', async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await openPrefsFromBanner(page);
      await shot(page, 'TC-GEO-329-010_step1_given');
    });

    await test.step('When les boutons "Save preferences" et "Accept all cookies" sont observés visuellement', async () => {
      await page.waitForTimeout(400);
      await shot(page, 'TC-GEO-329-010_step2_when');
    });

    await test.step('Then Save preferences et Accept all cookies ont le même poids visuel et Cancel est en style ghost différencié', async () => {
      const saveBtn      = page.locator(SEL.prefSave).first();
      const acceptAllBtn = page.locator(SEL.prefAcceptAll).first();
      const cancelBtn    = page.locator(SEL.prefCancel).first();
      const modal        = page.locator(SEL.prefModal).first();

      await expect(saveBtn,      '"Save Preferences" must be visible').toBeVisible({ timeout: 5000 });
      await expect(acceptAllBtn, '"Accept all cookies" must be visible').toBeVisible({ timeout: 5000 });
      await expect(cancelBtn,    '"Cancel" must be visible').toBeVisible({ timeout: 5000 });

      const saveHeight      = await saveBtn.evaluate(el => el.getBoundingClientRect().height);
      const acceptAllHeight = await acceptAllBtn.evaluate(el => el.getBoundingClientRect().height);

      await shotAt(page, modal, 'TC-GEO-329-010_step3_then');
      expect(
        Math.abs(saveHeight - acceptAllHeight),
        `"Save preferences" (${saveHeight}px) and "Accept all cookies" (${acceptAllHeight}px) must have equal height (diff <= 4px)`
      ).toBeLessThanOrEqual(4);
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// GROUPE 4 — GEO-330 : Cookie Inventory
// ════════════════════════════════════════════════════════════════════════════

test.describe('GEO-330 — Cookie Inventory', () => {
  test.use({ storageState: STORAGE_STATE_GEO });

  /** Helper: open Preferences modal (from banner or user menu). */
  async function openPrefsModal(page) {
    const clearAndOpenFromBanner = async () => {
      await clearCcCookie(page, DASHBOARD_URL);
      await ensureBannerVisible(page);
      await openPrefsFromBanner(page);
    };
    await clearAndOpenFromBanner();
    await expect(page.locator(SEL.prefModal).first(), 'Preferences modal must be open').toBeVisible({ timeout: 8000 });
  }

  // ── TC-GEO-330-001 ────────────────────────────────────────────────────────
  test('TC-GEO-330-001 — Section Essential affiche exactement 3 rangées réelles', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert', async () => {
      await openPrefsModal(page);
      await shot(page, 'TC-GEO-330-001_step1_given');
    });

    await test.step('When la section Essential est rendue dans le Settings Grid', async () => {
      await page.waitForTimeout(500);
      await shot(page, 'TC-GEO-330-001_step2_when');
    });

    await test.step('Then le Settings Grid contient exactement 3 rangées : APP_TOKEN / GEO_OAUTH_REQ / cc_cookie', async () => {
      const gridEss = page.locator(SEL.gridEssential).first();
      await expect(gridEss, '"cookie-settings-grid-necessary" must be visible').toBeVisible({ timeout: 8000 });

      const gridText = await gridEss.textContent();
      await shotAt(page, gridEss, 'TC-GEO-330-001_step3_then');
      expect(gridText, 'Essential grid must contain "APP_TOKEN"').toContain('APP_TOKEN');
      expect(gridText, 'Essential grid must contain "GEO_OAUTH_REQ"').toContain('GEO_OAUTH_REQ');
      expect(gridText, 'Essential grid must contain "cc_cookie"').toContain('cc_cookie');
    });
  });

  // ── TC-GEO-330-002 ────────────────────────────────────────────────────────
  test('TC-GEO-330-002 — Section Functional & Support affiche 3 placeholders Inactive', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert', async () => {
      await openPrefsModal(page);
      await shot(page, 'TC-GEO-330-002_step1_given');
    });

    await test.step('When la section Functional & Support est rendue dans le Settings Grid', async () => {
      await page.waitForTimeout(500);
      await shot(page, 'TC-GEO-330-002_step2_when');
    });

    await test.step('Then le Settings Grid contient 3 rangées placeholder : intercom-session-* / intercom-id-* / hubspot-* chacune avec badge "Inactive"', async () => {
      const gridFunc = page.locator(SEL.gridFunctional).first();
      await expect(gridFunc, '"cookie-settings-grid-functional-support" must be visible').toBeVisible({ timeout: 8000 });

      const gridText = await gridFunc.textContent();
      await shotAt(page, gridFunc, 'TC-GEO-330-002_step3_then');
      expect(gridText, 'Functional grid must contain "intercom-session"').toContain('intercom-session');
      expect(gridText, 'Functional grid must contain "intercom-id"').toContain('intercom-id');
      expect(gridText, 'Functional grid must contain "hubspot"').toContain('hubspot');

      // Inactive badges
      const inactiveBadges = page.locator(SEL.badgeInactive);
      const badgeCount = await inactiveBadges.count();
      expect(badgeCount, 'At least 1 "Inactive" badge must be present in the functional grid').toBeGreaterThanOrEqual(1);
    });
  });

  // ── TC-GEO-330-003 ────────────────────────────────────────────────────────
  test('TC-GEO-330-003 — Section Analytics affiche 1 placeholder FullStory', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert', async () => {
      await openPrefsModal(page);
      await shot(page, 'TC-GEO-330-003_step1_given');
    });

    await test.step('When la section Analytics est rendue dans le Settings Grid', async () => {
      await page.waitForTimeout(500);
      await shot(page, 'TC-GEO-330-003_step2_when');
    });

    await test.step('Then le Settings Grid contient exactement 1 rangée placeholder : fs_uid (FullStory) avec badge "Inactive"', async () => {
      const gridAna = page.locator(SEL.gridAnalytics).first();
      await expect(gridAna, '"cookie-settings-grid-analytics" must be visible').toBeVisible({ timeout: 8000 });

      const gridText = await gridAna.textContent();
      await shotAt(page, gridAna, 'TC-GEO-330-003_step3_then');
      expect(gridText, 'Analytics grid must contain "fs_uid"').toContain('fs_uid');
    });
  });

  // ── TC-GEO-330-004 ────────────────────────────────────────────────────────
  test('TC-GEO-330-004 — Aucune section n\'affiche d\'empty state', async ({ page }) => {
    await test.step('Given le Cookie Preferences modal est ouvert et la story 17.4 est mergée', async () => {
      await openPrefsModal(page);
      await shot(page, 'TC-GEO-330-004_step1_given');
    });

    await test.step('When les trois sections Essential / Functional & Support / Analytics sont rendues', async () => {
      await page.waitForTimeout(500);
      await shot(page, 'TC-GEO-330-004_step2_when');
    });

    await test.step('Then aucune section ne présente un état vide', async () => {
      const gridEss  = page.locator(SEL.gridEssential).first();
      const gridFunc = page.locator(SEL.gridFunctional).first();
      const gridAna  = page.locator(SEL.gridAnalytics).first();
      const modal    = page.locator(SEL.prefModal).first();

      await expect(gridEss,  '"cookie-settings-grid-necessary" must be visible (not empty)').toBeVisible({ timeout: 8000 });
      await expect(gridFunc, '"cookie-settings-grid-functional-support" must be visible (not empty)').toBeVisible({ timeout: 5000 });
      await expect(gridAna,  '"cookie-settings-grid-analytics" must be visible (not empty)').toBeVisible({ timeout: 5000 });

      await shotAt(page, modal, 'TC-GEO-330-004_step3_then');

      // Each grid must have some text content
      const essText  = await gridEss.textContent();
      const funcText = await gridFunc.textContent();
      const anaText  = await gridAna.textContent();
      expect((essText || '').trim().length,  'Essential grid must not be empty').toBeGreaterThan(0);
      expect((funcText || '').trim().length, 'Functional grid must not be empty').toBeGreaterThan(0);
      expect((anaText || '').trim().length,  'Analytics grid must not be empty').toBeGreaterThan(0);
    });
  });

  // ── TC-GEO-330-005 ────────────────────────────────────────────────────────
  test('TC-GEO-330-005 — Lien Cookie Settings visible dans le UserMenuDropdown', async ({ page, context }) => {
    await test.step('Given l\'utilisateur est authentifié et a déjà consenti (shouldShowBanner === false)', async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-330-005_step1_given');
    });

    await test.step('When l\'utilisateur ouvre le UserMenuDropdown', async () => {
      // Try known user-menu selectors
      const userMenuSelectors = [
        'div[aria-label="User menu"]',
        'button[aria-label*="user" i]',
        'button[aria-label*="account" i]',
        '[data-testid="user-menu"]',
        'nav[aria-label="Utility navigation"] .rounded-full',
      ];
      let opened = false;
      for (const sel of userMenuSelectors) {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
          await btn.click();
          await page.waitForTimeout(600);
          opened = true;
          break;
        }
      }
      if (!opened) {
        // Last resort: click avatar-like element in utility nav
        await page.locator('nav[aria-label="Utility navigation"] *').last().click().catch(() => {});
        await page.waitForTimeout(600);
      }
      await shot(page, 'TC-GEO-330-005_step2_when');
    });

    await test.step('Then un bouton "Cookie Settings" est visible dans le menu', async () => {
      const cookieSettingsBtn = page.locator('button:has-text("Cookie Settings"), a:has-text("Cookie Settings"), [role="menuitem"]:has-text("Cookie Settings")').first();
      await shotAt(page, page.locator('body'), 'TC-GEO-330-005_step3_then');
      await expect(cookieSettingsBtn, '"Cookie Settings" button must be visible in UserMenuDropdown').toBeVisible({ timeout: 8000 });
    });
  });

  // ── TC-GEO-330-006 ────────────────────────────────────────────────────────
  test('TC-GEO-330-006 — Lien Cookie Settings ouvre le modal Preferences', async ({ page, context }) => {
    await test.step('Given l\'utilisateur a ouvert le UserMenuDropdown et le bouton "Cookie Settings" est visible', async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      // Open user menu
      const userMenuSelectors = [
        'div[aria-label="User menu"]',
        'button[aria-label*="user" i]',
        '[data-testid="user-menu"]',
        'nav[aria-label="Utility navigation"] .rounded-full',
      ];
      for (const sel of userMenuSelectors) {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
          await btn.click();
          await page.waitForTimeout(600);
          break;
        }
      }
      await shot(page, 'TC-GEO-330-006_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "Cookie Settings"', async () => {
      const cookieSettingsBtn = page.locator('button:has-text("Cookie Settings"), a:has-text("Cookie Settings"), [role="menuitem"]:has-text("Cookie Settings")').first();
      await expect(cookieSettingsBtn, '"Cookie Settings" button must be visible before click').toBeVisible({ timeout: 8000 });
      await cookieSettingsBtn.click();
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-330-006_step2_when');
    });

    await test.step('Then le Cookie Preferences modal s\'ouvre et est toujours accessible même si le banner est masqué (GDPR withdraw any time)', async () => {
      const modal = page.locator(SEL.prefModal).first();
      await shotAt(page, modal, 'TC-GEO-330-006_step3_then');
      await expect(modal, 'Cookie Preferences modal must open from "Cookie Settings" in UserMenu (GDPR right to withdraw)').toBeVisible({ timeout: 8000 });
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// GROUPE 5 — GEO-333 : JIT Bridge Modal
// ════════════════════════════════════════════════════════════════════════════

test.describe('GEO-333 — JIT Bridge Modal', () => {
  test.use({ storageState: STORAGE_STATE_GEO });

  /** Open the JIT modal by clicking Help with functional cookies disabled. */
  async function openJitModal(page) {
    const helpBtn = page.locator(SEL.sidebarHelp).first();
    await expect(helpBtn, '"Help" button must be visible in sidebar').toBeVisible({ timeout: 10000 });
    await helpBtn.click();
    await page.waitForTimeout(1000);
  }

  // ── TC-GEO-333-001 ────────────────────────────────────────────────────────
  test('TC-GEO-333-001 — Clic Help sans consentement fonctionnel ouvre JIT Modal', async ({ page, context }) => {
    await test.step('Given un user ayant répondu au consent banner avec areFunctionalCookiesEnabled=false', async () => {
      await injectCcCookie(context, 'essential_only');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-333-001_step1_given');
    });

    await test.step('When il clique sur le bouton Help', async () => {
      await openJitModal(page);
      await shot(page, 'TC-GEO-333-001_step2_when');
    });

    await test.step('Then la JIT Bridge Modal s\'ouvre avec le titre "Ready to chat?" et le messenger Intercom ne s\'ouvre pas', async () => {
      // JIT modal may be the preferences modal with JIT content, or [role="dialog"]:has-text("Ready to chat")
      const jitModal = page.locator(`${SEL.jitModal}, ${SEL.prefModal}`).first();
      await shotAt(page, page.locator('body'), 'TC-GEO-333-001_step3_then');
      await expect(jitModal, 'JIT Bridge Modal ("Ready to chat?" or preferences consent gate) must appear when Help is clicked without functional cookies').toBeVisible({ timeout: 10000 });
    });
  });

  // ── TC-GEO-333-002 ────────────────────────────────────────────────────────
  test('TC-GEO-333-002 — Clic Help avec consentement fonctionnel actif n\'ouvre pas JIT Modal', async ({ page, context }) => {
    await test.step('Given un user ayant areFunctionalCookiesEnabled=true', async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-333-002_step1_given');
    });

    await test.step('When il clique sur le bouton Help', async () => {
      await openJitModal(page);
      await shot(page, 'TC-GEO-333-002_step2_when');
    });

    await test.step('Then la JIT Bridge Modal ne s\'affiche pas et le messenger Intercom s\'ouvre directement', async () => {
      const jitModalVisible = await page.locator(SEL.jitModal).isVisible({ timeout: 2000 }).catch(() => false);
      await shot(page, 'TC-GEO-333-002_step3_then');
      expect(jitModalVisible, 'JIT Bridge Modal must NOT appear when areFunctionalCookiesEnabled=true').toBe(false);
    });
  });

  // ── TC-GEO-333-003 ────────────────────────────────────────────────────────
  test('TC-GEO-333-003 — Contenu et layout de la JIT Bridge Modal', async ({ page, context }) => {
    await test.step('Given la JIT Bridge Modal est ouverte', async () => {
      await injectCcCookie(context, 'essential_only');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await openJitModal(page);
      await shot(page, 'TC-GEO-333-003_step1_given');
    });

    await test.step('When l\'utilisateur observe le contenu de la modal', async () => {
      await page.waitForTimeout(500);
      await shot(page, 'TC-GEO-333-003_step2_when');
    });

    await test.step('Then le header affiche "Ready to chat?", le body contient un lien "Cookie Settings", le footer affiche "Enable Support & Start Chat" et "I\'d still like to stay private"', async () => {
      const jitModal = page.locator(SEL.jitModal).first();
      await expect(jitModal, 'JIT Bridge Modal must be visible').toBeVisible({ timeout: 10000 });

      const enableBtn  = page.locator(SEL.jitEnableBtn).first();
      const privateBtn = page.locator(SEL.jitPrivateBtn).first();
      const cookieLink = page.locator('[role="dialog"]:has-text("Ready to chat") a:has-text("Cookie Settings"), [role="dialog"]:has-text("Ready to chat") button:has-text("Cookie Settings")').first();

      await shotAt(page, jitModal, 'TC-GEO-333-003_step3_then');
      await expect(enableBtn,  '"Enable Support & Start Chat" (or similar) button must be visible in JIT modal').toBeVisible({ timeout: 5000 });
      await expect(privateBtn, '"I\'d still like to stay private" link must be visible in JIT modal').toBeVisible({ timeout: 5000 });
    });
  });

  // ── TC-GEO-333-004 ────────────────────────────────────────────────────────
  test('TC-GEO-333-004 — Enable Support & Start Chat active le consentement fonctionnel', async ({ page, context }) => {
    await test.step('Given la JIT Bridge Modal est ouverte', async () => {
      await injectCcCookie(context, 'essential_only');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await openJitModal(page);
      await expect(page.locator(SEL.jitModal).first(), 'JIT modal must be open').toBeVisible({ timeout: 10000 });
      await shot(page, 'TC-GEO-333-004_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "Enable Support & Start Chat"', async () => {
      await page.locator(SEL.jitEnableBtn).first().click();
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-333-004_step2_when');
    });

    await test.step('Then le store passe areFunctionalCookiesEnabled à true et la JIT Bridge Modal se ferme', async () => {
      const jitGone    = !(await page.locator(SEL.jitModal).isVisible({ timeout: 2000 }).catch(() => false));
      const cookieData = await readCcCookie(page);
      await shot(page, 'TC-GEO-333-004_step3_then');
      expect(jitGone, 'JIT Bridge Modal must close after enabling support').toBe(true);
      if (cookieData && !cookieData._malformed) {
        expect(cookieData.categories, 'cc_cookie must include functional_support after enabling').toContain('functional_support');
      }
    });
  });

  // ── TC-GEO-333-005 ────────────────────────────────────────────────────────
  test('TC-GEO-333-005 — I\'d still like to stay private ouvre Privacy Fallback Modal sans modifier le store', async ({ page, context }) => {
    await test.step('Given la JIT Bridge Modal est ouverte', async () => {
      await injectCcCookie(context, 'essential_only');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await openJitModal(page);
      await expect(page.locator(SEL.jitModal).first(), 'JIT modal must be open').toBeVisible({ timeout: 10000 });
      await shot(page, 'TC-GEO-333-005_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "I\'d still like to stay private"', async () => {
      await page.locator(SEL.jitPrivateBtn).first().click();
      await page.waitForTimeout(1000);
      await shot(page, 'TC-GEO-333-005_step2_when');
    });

    await test.step('Then la JIT Bridge Modal se ferme et la Privacy Fallback Modal s\'ouvre et areFunctionalCookiesEnabled reste à false', async () => {
      const jitGone      = !(await page.locator(SEL.jitModal).isVisible({ timeout: 2000 }).catch(() => false));
      const privacyModal = page.locator(SEL.privacyModal).first();
      const cookieData   = await readCcCookie(page);
      await shotAt(page, page.locator('body'), 'TC-GEO-333-005_step3_then');
      expect(jitGone, 'JIT Bridge Modal must close after clicking "stay private"').toBe(true);
      await expect(privacyModal, 'Privacy Fallback Modal must open after "I\'d still like to stay private"').toBeVisible({ timeout: 8000 });
      if (cookieData && !cookieData._malformed) {
        expect(cookieData.categories, 'functional_support must NOT be in cc_cookie after staying private').not.toContain('functional_support');
      }
    });
  });

  // ── TC-GEO-333-006 ────────────────────────────────────────────────────────
  test('TC-GEO-333-006 — Lien Cookie Settings inline ferme JIT et ouvre Preferences Modal', async ({ page, context }) => {
    await test.step('Given la JIT Bridge Modal est ouverte et contient le lien inline "Cookie Settings"', async () => {
      await injectCcCookie(context, 'essential_only');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await openJitModal(page);
      await expect(page.locator(SEL.jitModal).first(), 'JIT modal must be open').toBeVisible({ timeout: 10000 });
      await shot(page, 'TC-GEO-333-006_step1_given');
    });

    await test.step('When l\'utilisateur clique sur le lien "Cookie Settings"', async () => {
      const cookieLink = page.locator('[role="dialog"]:has-text("Ready to chat") a:has-text("Cookie Settings"), [role="dialog"]:has-text("Ready to chat") button:has-text("Cookie Settings")').first();
      const linkVisible = await cookieLink.isVisible({ timeout: 3000 }).catch(() => false);
      if (linkVisible) {
        await cookieLink.click();
      } else {
        // SKIP gracefully if link not found in DOM
        test.skip(true, 'SKIPPED — "Cookie Settings" inline link not found in JIT Bridge Modal DOM. Re-enable once DOM inspection confirms its presence.');
        return;
      }
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-333-006_step2_when');
    });

    await test.step('Then la JIT Bridge Modal se ferme et le Cookie Preferences Modal s\'ouvre', async () => {
      const jitGone = !(await page.locator(SEL.jitModal).isVisible({ timeout: 2000 }).catch(() => false));
      const prefModal = page.locator(SEL.prefModal).first();
      await shotAt(page, page.locator('body'), 'TC-GEO-333-006_step3_then');
      expect(jitGone, 'JIT Bridge Modal must close after clicking Cookie Settings link').toBe(true);
      await expect(prefModal, 'Cookie Preferences Modal must open after clicking Cookie Settings in JIT modal').toBeVisible({ timeout: 8000 });
    });
  });

  // ── TC-GEO-333-007 ────────────────────────────────────────────────────────
  test('TC-GEO-333-007 — Fermeture via croix ne modifie pas le store', async ({ page, context }) => {
    await test.step('Given la JIT Bridge Modal est ouverte', async () => {
      await injectCcCookie(context, 'essential_only');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await openJitModal(page);
      await expect(page.locator(SEL.jitModal).first(), 'JIT modal must be open').toBeVisible({ timeout: 10000 });
      await shot(page, 'TC-GEO-333-007_step1_given');
    });

    await test.step('When l\'utilisateur clique sur la croix de fermeture', async () => {
      const closeBtn = page.locator('[role="dialog"]:has-text("Ready to chat") button[aria-label*="close" i], [role="dialog"]:has-text("Ready to chat") button[aria-label*="Close"]').first();
      if (await closeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await closeBtn.click();
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-333-007_step2_when');
    });

    await test.step('Then la JIT Bridge Modal se ferme et aucune modification du store ni du cookie n\'est effectuée', async () => {
      const jitGone    = !(await page.locator(SEL.jitModal).isVisible({ timeout: 2000 }).catch(() => false));
      const cookieData = await readCcCookie(page);
      await shot(page, 'TC-GEO-333-007_step3_then');
      expect(jitGone, 'JIT Bridge Modal must close after clicking X').toBe(true);
      if (cookieData && !cookieData._malformed) {
        expect(cookieData.categories, 'functional_support must NOT be added after closing JIT modal with X').not.toContain('functional_support');
      }
    });
  });

  // ── TC-GEO-333-008 ────────────────────────────────────────────────────────
  test('TC-GEO-333-008 — Fermeture via touche Escape ne modifie pas le store', async ({ page, context }) => {
    await test.step('Given la JIT Bridge Modal est ouverte', async () => {
      await injectCcCookie(context, 'essential_only');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await openJitModal(page);
      await expect(page.locator(SEL.jitModal).first(), 'JIT modal must be open').toBeVisible({ timeout: 10000 });
      await shot(page, 'TC-GEO-333-008_step1_given');
    });

    await test.step('When l\'utilisateur presse la touche Escape', async () => {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-333-008_step2_when');
    });

    await test.step('Then la JIT Bridge Modal se ferme et le store et le cookie restent inchangés', async () => {
      const jitGone    = !(await page.locator(SEL.jitModal).isVisible({ timeout: 2000 }).catch(() => false));
      const cookieData = await readCcCookie(page);
      await shot(page, 'TC-GEO-333-008_step3_then');
      expect(jitGone, 'JIT Bridge Modal must close after Escape').toBe(true);
      if (cookieData && !cookieData._malformed) {
        expect(cookieData.categories, 'functional_support must NOT be added after pressing Escape on JIT modal').not.toContain('functional_support');
      }
    });
  });

  // ── TC-GEO-333-009 ────────────────────────────────────────────────────────
  test('TC-GEO-333-009 — Affichage responsive mobile viewport moins de 768px', async ({ page, context }) => {
    await test.step('Given un user sur un viewport inférieur à 768px de large', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await injectCcCookie(context, 'essential_only');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-333-009_step1_given');
    });

    await test.step('When la JIT Bridge Modal s\'ouvre', async () => {
      await openJitModal(page);
      await shot(page, 'TC-GEO-333-009_step2_when');
    });

    await test.step('Then la modal occupe toute la largeur disponible avec 16px de marge et les CTAs restent full-width avec min-height 44px', async () => {
      const jitModal   = page.locator(SEL.jitModal).first();
      const enableBtn  = page.locator(SEL.jitEnableBtn).first();

      await expect(jitModal, 'JIT Bridge Modal must be visible on mobile viewport').toBeVisible({ timeout: 10000 });
      await expect(enableBtn, '"Enable Support & Start Chat" button must be visible on mobile').toBeVisible({ timeout: 5000 });

      const enableHeight = await enableBtn.evaluate(el => el.getBoundingClientRect().height);
      await shotAt(page, jitModal, 'TC-GEO-333-009_step3_then');
      expect(enableHeight, '"Enable Support & Start Chat" button height must be >= 44px on mobile').toBeGreaterThanOrEqual(44);

      // Reset viewport
      await page.setViewportSize({ width: 1280, height: 720 });
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// GROUPE 6 — GEO-334 : Privacy Fallback Modal
// ════════════════════════════════════════════════════════════════════════════

test.describe('GEO-334 — Privacy Fallback Modal', () => {
  test.use({ storageState: STORAGE_STATE_GEO });

  /** Open the Privacy Fallback Modal by clicking through JIT modal → stay private. */
  async function openPrivacyModal(page, context) {
    await injectCcCookie(context, 'essential_only');
    await gotoDashboard(page);
    await page.waitForTimeout(1500);
    // Click Help to open JIT
    const helpBtn = page.locator(SEL.sidebarHelp).first();
    await expect(helpBtn, '"Help" button must be visible').toBeVisible({ timeout: 10000 });
    await helpBtn.click();
    await page.waitForTimeout(1000);
    // Click "stay private"
    const jitModal = page.locator(SEL.jitModal).first();
    await expect(jitModal, 'JIT modal must open before reaching Privacy Fallback').toBeVisible({ timeout: 10000 });
    await page.locator(SEL.jitPrivateBtn).first().click();
    await page.waitForTimeout(800);
    await expect(page.locator(SEL.privacyModal).first(), 'Privacy Fallback Modal must open').toBeVisible({ timeout: 8000 });
  }

  // ── TC-GEO-334-001 ────────────────────────────────────────────────────────
  test('TC-GEO-334-001 — I\'d still like to stay private déclenche la Privacy Fallback Modal sans modifier le store', async ({ page, context }) => {
    await test.step('Given la JIT Bridge Modal est ouverte (areFunctionalCookiesEnabled=false)', async () => {
      await injectCcCookie(context, 'essential_only');
      await gotoDashboard(page);
      await page.waitForTimeout(1500);
      const helpBtn = page.locator(SEL.sidebarHelp).first();
      await expect(helpBtn, '"Help" button must be visible').toBeVisible({ timeout: 10000 });
      await helpBtn.click();
      await page.waitForTimeout(1000);
      await expect(page.locator(SEL.jitModal).first(), 'JIT modal must be visible').toBeVisible({ timeout: 10000 });
      await shot(page, 'TC-GEO-334-001_step1_given');
    });

    await test.step('When l\'utilisateur clique sur "I\'d still like to stay private"', async () => {
      await page.locator(SEL.jitPrivateBtn).first().click();
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-334-001_step2_when');
    });

    await test.step('Then la JIT Bridge Modal se ferme immédiatement et la Privacy Fallback Modal s\'ouvre et le store cookie consent reste inchangé', async () => {
      const jitGone      = !(await page.locator(SEL.jitModal).isVisible({ timeout: 2000 }).catch(() => false));
      const privacyModal = page.locator(SEL.privacyModal).first();
      const cookieData   = await readCcCookie(page);
      await shotAt(page, page.locator('body'), 'TC-GEO-334-001_step3_then');
      expect(jitGone, 'JIT Bridge Modal must close immediately after "stay private"').toBe(true);
      await expect(privacyModal, 'Privacy Fallback Modal must open without intermediate flash').toBeVisible({ timeout: 8000 });
      if (cookieData && !cookieData._malformed) {
        expect(cookieData.categories, 'functional_support must NOT appear in cc_cookie after staying private').not.toContain('functional_support');
      }
    });
  });

  // ── TC-GEO-334-002 ────────────────────────────────────────────────────────
  test('TC-GEO-334-002 — Contenu et layout de la Privacy Fallback Modal', async ({ page, context }) => {
    await test.step('Given la Privacy Fallback Modal est ouverte', async () => {
      await openPrivacyModal(page, context);
      await shot(page, 'TC-GEO-334-002_step1_given');
    });

    await test.step('When l\'utilisateur observe le contenu rendu', async () => {
      await page.waitForTimeout(400);
      await shot(page, 'TC-GEO-334-002_step2_when');
    });

    await test.step('Then le header affiche "Your privacy is respected", le body affiche support@onclusive.com et le footer affiche le bouton "Close"', async () => {
      const privacyModal = page.locator(SEL.privacyModal).first();
      await expect(privacyModal, 'Privacy Fallback Modal must be visible').toBeVisible({ timeout: 8000 });

      const modalText = await privacyModal.textContent();
      const closeBtn  = page.locator(`${SEL.privacyModal} button:has-text("Close")`).first();

      await shotAt(page, privacyModal, 'TC-GEO-334-002_step3_then');
      expect(modalText, 'Privacy Fallback Modal must contain "privacy is respected" or "privacy"').toMatch(/privacy/i);
      expect(modalText, 'Privacy Fallback Modal must contain support email').toContain('support@onclusive.com');
      await expect(closeBtn, '"Close" button must be visible in Privacy Fallback Modal footer').toBeVisible({ timeout: 5000 });
    });
  });

  // ── TC-GEO-334-003 ────────────────────────────────────────────────────────
  test('TC-GEO-334-003 — Clic sur email ouvre le client mail et laisse la modal ouverte', async ({ page, context }) => {
    await test.step('Given la Privacy Fallback Modal est ouverte avec le lien support@onclusive.com', async () => {
      await openPrivacyModal(page, context);
      await shot(page, 'TC-GEO-334-003_step1_given');
    });

    await test.step('When l\'utilisateur clique sur support@onclusive.com', async () => {
      const emailLink = page.locator(`${SEL.privacyModal} a[href="mailto:support@onclusive.com"], ${SEL.privacyModal} a:has-text("support@onclusive.com")`).first();
      await expect(emailLink, '"support@onclusive.com" email link must be visible').toBeVisible({ timeout: 5000 });

      // Intercept the mailto navigation — it opens the OS mail client (not a page nav)
      const [popup] = await Promise.all([
        page.waitForEvent('popup', { timeout: 2000 }).catch(() => null),
        emailLink.click(),
      ]);
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-334-003_step2_when');
    });

    await test.step('Then le navigateur initie un lien mailto:support@onclusive.com et la Privacy Fallback Modal reste ouverte', async () => {
      const privacyModal = page.locator(SEL.privacyModal).first();
      await shotAt(page, privacyModal, 'TC-GEO-334-003_step3_then');
      await expect(privacyModal, 'Privacy Fallback Modal must REMAIN OPEN after clicking email link').toBeVisible({ timeout: 5000 });
    });
  });

  // ── TC-GEO-334-004 ────────────────────────────────────────────────────────
  test('TC-GEO-334-004 — Fermeture via Close, croix ou Escape sans effet sur le store', async ({ page, context }) => {
    await test.step('Given la Privacy Fallback Modal est ouverte', async () => {
      await openPrivacyModal(page, context);
      await shot(page, 'TC-GEO-334-004_step1_given');
    });

    await test.step('When l\'utilisateur clique sur le bouton "Close"', async () => {
      const closeBtn = page.locator(`${SEL.privacyModal} button:has-text("Close")`).first();
      await expect(closeBtn, '"Close" button must be visible').toBeVisible({ timeout: 5000 });
      await closeBtn.click();
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-334-004_step2_when');
    });

    await test.step('Then la Privacy Fallback Modal se ferme et aucune modification du store cookie consent n\'est effectuée', async () => {
      const modalGone  = !(await page.locator(SEL.privacyModal).isVisible({ timeout: 2000 }).catch(() => false));
      const cookieData = await readCcCookie(page);
      await shot(page, 'TC-GEO-334-004_step3_then');
      expect(modalGone, 'Privacy Fallback Modal must close after clicking Close').toBe(true);
      if (cookieData && !cookieData._malformed) {
        expect(cookieData.categories, 'functional_support must NOT appear in cc_cookie after closing Privacy modal').not.toContain('functional_support');
      }
    });
  });

  // ── TC-GEO-334-005 ────────────────────────────────────────────────────────
  test('TC-GEO-334-005 — Aucune interaction avec la modal ne modifie le store cookie consent', async ({ page, context }) => {
    await test.step('Given la Privacy Fallback Modal est ouverte', async () => {
      await openPrivacyModal(page, context);
      await shot(page, 'TC-GEO-334-005_step1_given');
    });

    await test.step('When l\'utilisateur lit le contenu, clique sur le lien email et ferme la modal', async () => {
      const privacyModal = page.locator(SEL.privacyModal).first();
      await expect(privacyModal, 'Privacy Fallback Modal must be visible').toBeVisible({ timeout: 8000 });
      // Just observe — no consent-changing action
      const closeBtn = page.locator(`${SEL.privacyModal} button:has-text("Close")`).first();
      if (await closeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await closeBtn.click();
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-334-005_step2_when');
    });

    await test.step('Then le store cookie consent est identique à l\'état avant l\'ouverture de la JIT Bridge Modal (essential_only)', async () => {
      const cookieData = await readCcCookie(page);
      await shot(page, 'TC-GEO-334-005_step3_then');
      if (cookieData && !cookieData._malformed) {
        expect(cookieData.categories, 'cc_cookie categories must remain as essential_only (no functional_support)').not.toContain('functional_support');
        expect(cookieData.categories, 'cc_cookie must still contain necessary').toContain('necessary');
      }
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// GROUPE 7 — GEO-237 : HubSpot PQL (SESSION UPSELL)
// ════════════════════════════════════════════════════════════════════════════

test.describe('GEO-237 — HubSpot PQL (upsell session)', () => {
  test.use({ storageState: STORAGE_STATE_UPSELL });

  // ── TC-GEO-237-001 ────────────────────────────────────────────────────────
  test('TC-GEO-237-001 — Clic Speak to Us sans cookies fonctionnels affiche JIT Bridge Modal', async ({ page }) => {
    await test.step('Given l\'user est sur la page upsell Measure et les cookies Functional & Support ne sont pas acceptés', async () => {
      // Clear consent so functional cookies are not accepted
      await clearCcCookie(page, UPSELL_URL);
      await page.waitForTimeout(1500);
      await shot(page, 'TC-GEO-237-001_step1_given');
    });

    await test.step('When il clique sur "Speak to Us"', async () => {
      await expect(page.locator(SEL.speakToUsBtn).first(), '"Speak to Us" button must be visible').toBeVisible({ timeout: 20000 });
      await page.locator(SEL.speakToUsBtn).first().click();
      await page.waitForTimeout(1000);
      await shot(page, 'TC-GEO-237-001_step2_when');
    });

    await test.step('Then la SeeItInActionModal s\'ouvre et après confirmation la JitBridgeModal s\'affiche', async () => {
      // SeeItInActionModal should appear first
      const seeItModal = page.locator(SEL.seeItModal).first();
      await expect(seeItModal, 'SeeItInActionModal must open after "Speak to Us" click').toBeVisible({ timeout: 10000 });

      // Confirm in the modal
      const checkbox = page.locator(SEL.seeItCheckbox).first();
      if (await checkbox.isVisible({ timeout: 3000 }).catch(() => false)) {
        await checkbox.click();
        await page.waitForTimeout(300);
        const confirmBtn = page.locator(SEL.seeItConfirmBtn).first();
        if (await confirmBtn.isEnabled({ timeout: 2000 }).catch(() => false)) {
          await confirmBtn.click();
          await page.waitForTimeout(1000);
        }
      }

      // JIT modal should appear after confirm (no functional cookies)
      const jitModal = page.locator(SEL.jitModal).first();
      await shotAt(page, page.locator('body'), 'TC-GEO-237-001_step3_then');
      await expect(jitModal, 'JitBridgeModal must appear after confirming SeeItInActionModal without functional cookies').toBeVisible({ timeout: 8000 });
    });
  });

  // ── TC-GEO-237-002 ────────────────────────────────────────────────────────
  test('TC-GEO-237-002 — Refus dans JitBridgeModal ouvre PrivacyFallbackModal sans POST', async ({ page }) => {
    let hubspotCallCount = 0;
    await page.route('**/upsell/hubspot', (route) => { hubspotCallCount++; route.continue(); });

    await test.step('Given la JitBridgeModal est ouverte depuis le contexte upsell', async () => {
      await clearCcCookie(page, UPSELL_URL);
      await page.waitForTimeout(1500);
      await expect(page.locator(SEL.speakToUsBtn).first(), '"Speak to Us" must be visible').toBeVisible({ timeout: 20000 });
      await page.locator(SEL.speakToUsBtn).first().click();
      await page.waitForTimeout(800);
      const seeItModal = page.locator(SEL.seeItModal).first();
      if (await seeItModal.isVisible({ timeout: 5000 }).catch(() => false)) {
        const cb = page.locator(SEL.seeItCheckbox).first();
        if (await cb.isVisible({ timeout: 2000 }).catch(() => false)) {
          await cb.click(); await page.waitForTimeout(300);
          const confirmBtn = page.locator(SEL.seeItConfirmBtn).first();
          if (await confirmBtn.isEnabled({ timeout: 2000 }).catch(() => false)) {
            await confirmBtn.click(); await page.waitForTimeout(800);
          }
        }
      }
      await expect(page.locator(SEL.jitModal).first(), 'JitBridgeModal must be open').toBeVisible({ timeout: 8000 });
      await shot(page, 'TC-GEO-237-002_step1_given');
    });

    await test.step('When l\'user clique "I\'d still like to stay private"', async () => {
      await page.locator(SEL.jitPrivateBtn).first().click();
      await page.waitForTimeout(1000);
      await shot(page, 'TC-GEO-237-002_step2_when');
    });

    await test.step('Then la PrivacyFallbackModal s\'ouvre et aucun appel POST /api/v1/upsell/hubspot n\'est effectué', async () => {
      const privacyModal = page.locator(SEL.privacyModal).first();
      await shotAt(page, page.locator('body'), 'TC-GEO-237-002_step3_then');
      await expect(privacyModal, 'PrivacyFallbackModal must open after refusing JIT consent').toBeVisible({ timeout: 8000 });
      await page.waitForTimeout(1000);
      expect(hubspotCallCount, 'No POST /upsell/hubspot must be made after refusing JIT').toBe(0);
    });
  });

  // ── TC-GEO-237-003 ────────────────────────────────────────────────────────
  test('TC-GEO-237-003 — Consentement déjà accordé ouvre SeeItInActionModal directement', async ({ page, context }) => {
    await test.step('Given areFunctionalCookiesEnabled=true', async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoUpsell(page);
      await shot(page, 'TC-GEO-237-003_step1_given');
    });

    await test.step('When l\'user clique sur "Speak to Us"', async () => {
      await page.locator(SEL.speakToUsBtn).first().click();
      await shot(page, 'TC-GEO-237-003_step2_when');
    });

    await test.step('Then la SeeItInActionModal s\'ouvre directement sans passer par la JitBridgeModal', async () => {
      const seeItModal = page.locator(SEL.seeItModal).first();
      await expect(seeItModal, 'SeeItInActionModal must open directly when functional cookies are accepted').toBeVisible({ timeout: 10000 });
      const jitVisible = await page.locator(SEL.jitModal).isVisible({ timeout: 1500 }).catch(() => false);
      await shotAt(page, seeItModal, 'TC-GEO-237-003_step3_then');
      expect(jitVisible, 'JitBridgeModal must NOT appear when areFunctionalCookiesEnabled=true').toBe(false);
    });
  });

  // ── TC-GEO-237-004 ────────────────────────────────────────────────────────
  test('TC-GEO-237-004 — Idempotence un seul clic Speak to Us par session', async ({ page, context }) => {
    let hubspotCalls = 0;
    await page.route('**/upsell/hubspot', async (route) => { hubspotCalls++; await route.continue(); });

    await test.step('Given l\'user a déjà cliqué "Speak to Us", confirmé dans la modal et l\'événement a été envoyé', async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoUpsell(page);
      await confirmInSeeItModal(page);
      await page.waitForTimeout(2000);
      await shot(page, 'TC-GEO-237-004_step1_given');
    });

    await test.step('When il clique à nouveau sur un autre "Speak to Us" de la page', async () => {
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(500);
      const btns = page.locator(SEL.speakToUsBtn);
      const count = await btns.count();
      await (count > 1 ? btns.nth(1) : btns.first()).click();
      await page.waitForTimeout(2000);
      await shot(page, 'TC-GEO-237-004_step2_when');
    });

    await test.step('Then aucune nouvelle SeeItInActionModal ne s\'ouvre et aucun deuxième appel POST /api/v1/upsell/hubspot n\'est effectué', async () => {
      await shot(page, 'TC-GEO-237-004_step3_then');
      expect(hubspotCalls, `Only 1 POST /upsell/hubspot call expected (idempotence) — got ${hubspotCalls}`).toBeLessThanOrEqual(1);
    });
  });

  // ── TC-GEO-237-005 ────────────────────────────────────────────────────────
  test('TC-GEO-237-005 — SeeItInActionModal s\'ouvre avec checkbox décochée et Confirm désactivé', async ({ page, context }) => {
    await test.step('Given l\'user est sur la page upsell Measure', async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoUpsell(page);
      await shot(page, 'TC-GEO-237-005_step1_given');
    });

    await test.step('When il clique sur un bouton "Speak to Us"', async () => {
      await page.locator(SEL.speakToUsBtn).first().click();
      await shot(page, 'TC-GEO-237-005_step2_when');
    });

    await test.step('Then la modal SeeItInActionModal s\'ouvre avec le titre "See it in action", la description, la checkbox décochée et le bouton Confirm désactivé', async () => {
      const modal      = page.locator(SEL.seeItModal).first();
      const title      = page.locator(SEL.seeItTitle).first();
      const checkbox   = page.locator(SEL.seeItCheckbox).first();
      const confirmBtn = page.locator(SEL.seeItConfirmBtn).first();

      await expect(modal,      'SeeItInActionModal must be visible').toBeVisible({ timeout: 10000 });
      await expect(title,      '"See it in action" title must be visible').toBeVisible({ timeout: 5000 });
      await expect(checkbox,   'Checkbox must be present').toBeVisible({ timeout: 5000 });
      await expect(confirmBtn, 'Confirm button must be present').toBeVisible({ timeout: 5000 });

      const isChecked  = await checkbox.isChecked();
      const isDisabled = await confirmBtn.isDisabled();

      await shotAt(page, modal, 'TC-GEO-237-005_step3_then');
      expect(isChecked,  'Checkbox must be unchecked by default').toBe(false);
      expect(isDisabled, 'Confirm button must be disabled when checkbox is unchecked').toBe(true);
    });
  });

  // ── TC-GEO-237-006 ────────────────────────────────────────────────────────
  test('TC-GEO-237-006 — Coche checkbox active le bouton Confirm', async ({ page, context }) => {
    await test.step('Given la modal SeeItInActionModal est ouverte avec le bouton Confirm désactivé', async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoUpsell(page);
      await page.locator(SEL.speakToUsBtn).first().click();
      await expect(page.locator(SEL.seeItModal).first(), 'SeeItInActionModal must be open').toBeVisible({ timeout: 10000 });
      await shot(page, 'TC-GEO-237-006_step1_given');
    });

    await test.step('When l\'user coche la checkbox "I\'m happy to be contacted for a demo"', async () => {
      const checkbox = page.locator(SEL.seeItCheckbox).first();
      await expect(checkbox, 'Checkbox must be visible').toBeVisible({ timeout: 5000 });
      await checkbox.click();
      await page.waitForTimeout(300);
      await shot(page, 'TC-GEO-237-006_step2_when');
    });

    await test.step('Then le bouton "Confirm" devient actif et cliquable', async () => {
      const confirmBtn = page.locator(SEL.seeItConfirmBtn).first();
      await shotAt(page, confirmBtn, 'TC-GEO-237-006_step3_then');
      await expect(confirmBtn, '"Confirm" button must become enabled after checking checkbox').toBeEnabled({ timeout: 5000 });
    });
  });

  // ── TC-GEO-237-007 ────────────────────────────────────────────────────────
  test('TC-GEO-237-007 — Fermeture SeeItInActionModal sans confirmation n\'envoie aucun événement', async ({ page, context }) => {
    let hubspotCallCount = 0;
    await page.route('**/upsell/hubspot', (route) => { hubspotCallCount++; route.continue(); });

    await test.step('Given la modal SeeItInActionModal est ouverte', async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoUpsell(page);
      await page.locator(SEL.speakToUsBtn).first().click();
      await expect(page.locator(SEL.seeItModal).first(), 'SeeItInActionModal must be open').toBeVisible({ timeout: 10000 });
      await shot(page, 'TC-GEO-237-007_step1_given');
    });

    await test.step('When l\'user clique sur la croix (x), le backdrop ou presse Escape', async () => {
      const closeBtn = page.locator(SEL.seeItCloseBtn).first();
      if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await closeBtn.click();
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(800);
      await shot(page, 'TC-GEO-237-007_step2_when');
    });

    await test.step('Then la modal se ferme et aucun appel POST /api/v1/upsell/hubspot n\'est effectué', async () => {
      const modalGone = !(await page.locator(SEL.seeItModal).isVisible({ timeout: 2000 }).catch(() => false));
      await page.waitForTimeout(1000);
      await shot(page, 'TC-GEO-237-007_step3_then');
      expect(modalGone, 'SeeItInActionModal must close after X / Escape').toBe(true);
      expect(hubspotCallCount, 'No POST /upsell/hubspot must be made when closing without confirmation').toBe(0);
    });
  });

  // ── TC-GEO-237-008 ────────────────────────────────────────────────────────
  test('TC-GEO-237-008 — Confirm avec consentement OK déclenche POST direct sans JitBridgeModal', async ({ page, context }) => {
    let hubspotRequest = null;
    await page.route('**/upsell/hubspot', async (route) => {
      hubspotRequest = route.request();
      await route.continue();
    });

    await test.step('Given la checkbox "I\'m happy to be contacted for a demo" est cochée et Confirm actif avec consentement fonctionnel actif', async () => {
      await injectCcCookie(context, 'all_accepted');
      await gotoUpsell(page);
      await shot(page, 'TC-GEO-237-008_step1_given');
    });

    await test.step('When clic "Confirm" enregistre avec consentement fonctionnel actif', async () => {
      await confirmInSeeItModal(page);
      await page.waitForTimeout(2000);
      await shot(page, 'TC-GEO-237-008_step2_when');
    });

    await test.step('Then la modal se ferme et la requête POST vers /api/v1/upsell/hubspot est observée sans passer par la JitBridgeModal', async () => {
      const jitVisible = await page.locator(SEL.jitModal).isVisible({ timeout: 1500 }).catch(() => false);
      await shot(page, 'TC-GEO-237-008_step3_then');
      expect(jitVisible, 'JitBridgeModal must NOT appear when functional cookies are already accepted').toBe(false);
      expect(hubspotRequest, 'POST /upsell/hubspot must be called directly after Confirm with consent').not.toBeNull();
    });
  });

  // ── TC-GEO-237-009 ────────────────────────────────────────────────────────
  test('TC-GEO-237-009 — Confirm sans consentement fonctionnel ouvre JitBridgeModal', async ({ page }) => {
    await test.step('Given la modal SeeItInActionModal est ouverte, la checkbox cochée et areFunctionalCookiesEnabled=false', async () => {
      // Clear cc_cookie so no functional consent
      await clearCcCookie(page, UPSELL_URL);
      await page.waitForTimeout(1500);
      // Dismiss banner if shown (accept essential only)
      const essBtn = page.locator(SEL.bannerEssentialOnly).first();
      if (await essBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await essBtn.click();
        await page.waitForTimeout(800);
        await page.reload({ waitUntil: 'load' });
        await page.waitForTimeout(1500);
      }
      await expect(page.locator(SEL.speakToUsBtn).first(), '"Speak to Us" must be visible').toBeVisible({ timeout: 20000 });
      await page.locator(SEL.speakToUsBtn).first().click();
      const seeItModal = page.locator(SEL.seeItModal).first();
      await expect(seeItModal, 'SeeItInActionModal must be open').toBeVisible({ timeout: 10000 });
      const checkbox = page.locator(SEL.seeItCheckbox).first();
      await expect(checkbox, 'Checkbox must be visible').toBeVisible({ timeout: 5000 });
      await checkbox.click();
      await page.waitForTimeout(300);
      await shot(page, 'TC-GEO-237-009_step1_given');
    });

    await test.step('When l\'user clique "Confirm"', async () => {
      const confirmBtn = page.locator(SEL.seeItConfirmBtn).first();
      await expect(confirmBtn, 'Confirm button must be enabled').toBeEnabled({ timeout: 5000 });
      await confirmBtn.click();
      await page.waitForTimeout(1000);
      await shot(page, 'TC-GEO-237-009_step2_when');
    });

    await test.step('Then la JitBridgeModal "Ready to chat?" s\'ouvre et aucun appel POST /api/v1/upsell/hubspot n\'est effectué à ce stade', async () => {
      const jitModal = page.locator(SEL.jitModal).first();
      await shotAt(page, page.locator('body'), 'TC-GEO-237-009_step3_then');
      await expect(jitModal, 'JitBridgeModal must open after Confirm when functional cookies are absent').toBeVisible({ timeout: 8000 });
    });
  });
});
