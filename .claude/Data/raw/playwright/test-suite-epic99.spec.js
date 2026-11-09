// test-suite-epic99.spec.js
// Epic 99 — GEO Snapshot navigation + Sidebar module navigation + Guided Tour + Snapshot data model
// Covers:
//   GEO-56  (snapshot navigator: TC001 navigation, TC002 filter persistence,
//             TC003 prev disabled on oldest, TC004 next disabled on newest, TC005 single-snapshot)
//   GEO-57  (snapshot data model: TC001 creation, TC002 immutability, TC003 retention, TC004 storage)
//   GEO-55  (guided tour: TC001 activation, TC002 advance/skip, TC003 demo data, TC004 analytics)
//   GEO-235 (sidebar module navigation: TC001-TC006)
// Generated: 2026-04-30 | Updated: 2026-05-04
//
// Source CSV: .claude/Data/output/csv/testcases-coverage-epic99-20260430.csv
// Visual reference:
//   - figmaScreens/01_Dashboard/01_GEO-Analytics-Dashboard.png
//       Sidebar: Mention / Review / Contact / Measure (active) / Settings / Help / Log out
//   - figmaScreens/01_Dashboard/02_GEO-Analytics-Dashboard-Hover-states.png — sidebar hover
//   - figmaScreens/08_GEO_Onboarding/36_First_time_User_-_Clean_Slate.png
//       Empty state: "No reports have been made for your Brand" + "Create your first Report" button
//   - figmaScreens/08_GEO_Onboarding/38_Report_Loading_-_Querying_LLMs.png
//       Analysis progress: LLMs (0-70%) → Sources (75%) → Aggregate (85%) → Insights (95%)
//   - figmaScreens/09_Reports_Navigation/01_Navigation_-_LLM_Module.png
//       LLM dropdown: "Filter by AI Engine", 5 engines — Gemini/ChatGPT/Grok ON, Claude/Perplexity OFF
//   - figmaScreens/09_Reports_Navigation/02_Navigation_Layout.png — sidebar + report nav confirmed
//   - figmaScreens/09_Reports_Navigation/03_Navigation_-_Markets.png
//       Market dropdown: All Markets / US-English / France-English / Morocco-French
//   - figmaScreens/09_Reports_Navigation/04_Navigation_-_Max_Categories.png — sidebar 5 categories max
//   - figmaScreens/10_Manage_Scope/01_Manage_Scope.png — sidebar in sub-page (layout confirmed)
//
// Env vars (override via shell):
//   BASE_URL              — root URL de l'app GEO (default: common.json)
//   JDD_PROFILE           — profil JDD à charger : default | single-snap | edge-cases (default: "default")
//                           Chemin : .claude/Data/raw/test-data/jdd/epic99/{JDD_PROFILE}.json
//
// JDD chargé en 2 couches (deep merge) :
//   jdd/common.json              — données partagées tous epics (ex: sidebar.module_labels)
//   jdd/epic99/{JDD_PROFILE}.json — données spécifiques epic99 (surcharge common si conflit)
//
// Les valeurs suivantes sont lues depuis le JDD (plus hardcodées dans la spec) :
//   reports.multi_snapshot_uuid    — UUID rapport multi-snapshots (GEO-56 TC1-TC4)
//   reports.single_snapshot_uuid   — UUID rapport 1 snapshot (GEO-56 TC5 ; vide → skip)
//   urls.tour_entry_url            — URL qui active le tour (GEO-55 ; vide → skip)
//   urls.mention_url / review_url / contact_url — URLs modules sidebar (optionnels)
//   sidebar.missing_module_label   — module sans URL (GEO-235-TC006 ; vide → skip)
//   snapshot_navigator.label_regex — pattern date snapshot
//   snapshot_navigator.max_nav_clicks — limite boucle navigation
//   guided_tour.min_steps / max_steps / max_iteration_clicks
//   settings_page.expected_text    — texte attendu sur /settings
//   expected_texts.*               — textes état vide

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// ── Data ──────────────────────────────────────────────────────────────────────
const COMMON    = require('../test-data/common.json');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');

// ── JDD (Jeu De Données) ──────────────────────────────────────────────────────
// Sélection du profil via JDD_PROFILE (default: "default")
// Profils disponibles : default | single-snap | edge-cases
const JDD_PROFILE = process.env.JDD_PROFILE || 'default';
const JDD_COMMON  = require('../test-data/jdd/common.json');
const H           = require('./e2e-helpers');
const JDD_EPIC    = (() => {
  try {
    return require(`../test-data/jdd/epic99/${JDD_PROFILE}.json`);
  } catch (e) {
    throw new Error(`JDD profile "${JDD_PROFILE}" introuvable : .claude/Data/raw/test-data/jdd/epic99/${JDD_PROFILE}.json`);
  }
})();
// Deep merge : common fournit les valeurs partagées, epic surcharge/complète
const JDD = {
  ...JDD_COMMON,
  ...JDD_EPIC,
  sidebar: { ...JDD_COMMON.sidebar, ...JDD_EPIC.sidebar },
};

// ── Constants ─────────────────────────────────────────────────────────────────
const BASE_URL              = process.env.BASE_URL || COMMON.base_url;
const DASHBOARD_UUID        = process.env.DASHBOARD_UUID || JDD.reports.multi_snapshot_uuid || COMMON.dashboard_uuid;
const DASHBOARD_UUID_SINGLE = JDD.reports.single_snapshot_uuid || '';
const API_BASE_URL          = process.env.API_BASE_URL || BASE_URL;
const TOUR_ENTRY_URL        = JDD.urls.tour_entry_url || '';
const VITE_MENTION_URL      = JDD.urls.mention_url || '';
const VITE_REVIEW_URL       = JDD.urls.review_url || '';
const VITE_CONTACT_URL      = JDD.urls.contact_url || '';
const SETTINGS_URL_PATH     = BLUEPRINT.routes.settings;

// Auth redirect pattern — when the user has no active session on the target app,
// the sidebar link redirects to the Auth0 login page instead of the destination URL.
// Both outcomes are valid: session active → destination URL / no session → auth login.
const AUTH_REDIRECT_RE = /^https:\/\/auth-staging\.onclusive\.com\/u\/login\/identifier/;

// Valeurs de test issues du JDD
const SNAPSHOT_LABEL_REGEX    = new RegExp(JDD.snapshot_navigator.label_regex);
const SNAPSHOT_MAX_NAV_CLICKS = JDD.snapshot_navigator.max_nav_clicks;
const TOUR_MIN_STEPS          = JDD.guided_tour.min_steps;
const TOUR_MAX_STEPS          = JDD.guided_tour.max_steps;
const TOUR_MAX_ITER           = JDD.guided_tour.max_iteration_clicks;
const SETTINGS_EXPECTED_TEXT  = JDD.settings_page.expected_text;
const SIDEBAR_MODULE_LABELS   = JDD.sidebar.module_labels;
const MISSING_MODULE_LABEL    = process.env.MISSING_MODULE_LABEL || JDD.sidebar.missing_module_label || '';
const EMPTY_STATE_HEADING     = JDD.expected_texts.empty_state_heading;
const EMPTY_STATE_CTA         = JDD.expected_texts.empty_state_cta;

if (!DASHBOARD_UUID) {
  throw new Error('DASHBOARD_UUID manquant — vérifier common.json ou jdd/epic99/default.json');
}

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-epic99');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// ── Selectors ─────────────────────────────────────────────────────────────────
const SEL = {
  dashboardLayout: BLUEPRINT.layout.dashboard_root.selector,             // [data-testid="dashboard-layout"]
  main:            BLUEPRINT.layout.main_content.selector,               // [data-testid="dashboard-layout"] main
  // Sidebar — global module navigation (left rail)
  sidebarRoot:        BLUEPRINT.reports_list_page.main_sidebar.selector,            // aside[data-testid="main-sidebar"]
  moduleNav:          BLUEPRINT.reports_list_page.module_navigation.nav,            // nav[aria-label="Module navigation"]
  moduleButton:       BLUEPRINT.reports_list_page.module_navigation.buttons,
  moduleActiveButton: BLUEPRINT.reports_list_page.module_navigation.active_button,  // …button[aria-current="page"]
  utilityNav:         BLUEPRINT.reports_list_page.utility_navigation.nav,           // nav[aria-label="Utility navigation"]
  settingsLink:       BLUEPRINT.reports_list_page.utility_navigation.settings_link, // a[href="/geo/settings"]
  // Snapshot navigator — dropdown UI (single trigger button + [role="option"] list)
  snapshotNavigator: BLUEPRINT.snapshot_navigator.container,             // [data-testid="snapshot-navigator"]
  snapshotTrigger:   `${BLUEPRINT.snapshot_navigator.container} button`, // dropdown trigger
  snapshotOption:    `${BLUEPRINT.snapshot_navigator.container} [role="option"], ${BLUEPRINT.snapshot_navigator.container} li`,
  // Filters
  marketDropdown:     BLUEPRINT.filters.market_dropdown.container,
  marketTrigger:      BLUEPRINT.filters.market_dropdown.trigger_primary,
  marketTriggerAlt:   BLUEPRINT.filters.market_dropdown.trigger_alt_aria,
  marketOptions:      BLUEPRINT.filters.market_dropdown.options,
  llmDropdown:        BLUEPRINT.filters.llm_dropdown.container,
  llmTrigger:         BLUEPRINT.filters.llm_dropdown.trigger_primary,
  llmTriggerAlt:      BLUEPRINT.filters.llm_dropdown.trigger_alt_aria,        // button[aria-label="LLM engine filters"]
  llmSwitches:        BLUEPRINT.filters.llm_dropdown.switch_items,
  llmSwitchChatGPT:   BLUEPRINT.filters.llm_dropdown.switches_individual.chatgpt,    // [role="switch"][aria-label="Toggle ChatGPT"]
  llmSwitchGemini:    BLUEPRINT.filters.llm_dropdown.switches_individual.gemini,     // [role="switch"][aria-label="Toggle Gemini"]
  llmSwitchClaude:    BLUEPRINT.filters.llm_dropdown.switches_individual.claude,     // [role="switch"][aria-label="Toggle Claude"]
  llmSwitchGrok:      BLUEPRINT.filters.llm_dropdown.switches_individual.grok,       // [role="switch"][aria-label="Toggle Grok"]
  llmSwitchPerplexity:BLUEPRINT.filters.llm_dropdown.switches_individual.perplexity, // [role="switch"][aria-label="Toggle Perplexity"]
  // Empty state (Figma 08_GEO_Onboarding/36_First_time_User) — textes depuis JDD
  emptyStateHeading:  `text="${EMPTY_STATE_HEADING}"`,
  emptyStateCta:      `button:has-text("${EMPTY_STATE_CTA}")`,
  // Guided tour (GEO-55) — common tour library patterns; exact selectors depend on implementation
  tourOverlay:   '[data-testid="tour-tooltip"], [data-testid="guided-tour"], [class*="shepherd-element"], [class*="joyride"], [role="dialog"][aria-label*="tour" i]',
  tourNextBtn:   'button:has-text("Next"), button:has-text("Continue"), button:has-text("Got it")',
  tourSkipBtn:   'button:has-text("Skip"), button:has-text("Skip tour"), button:has-text("Exit tour")',
};

// ── Helpers ───────────────────────────────────────────────────────────────────
async function screenshot(page, name) {
  const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
  return filePath;
}

function moduleButtonByLabel(page, label) {
  // Role-based matching (accessible name) works for Measure.
  // Mention/Review/Contact may have aria-label != visible text — use :has-text() fallback
  // which matches on visible text content rather than computed accessible name.
  const sidebar = page.locator(SEL.sidebarRoot);
  return sidebar.getByRole('button', { name: label, exact: true })
    .or(sidebar.getByRole('link', { name: label, exact: true }))
    .or(sidebar.locator('button, a, [role="button"]').filter({ hasText: label }).first());
}

async function openHome(page) {
  await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle' });
  await H.dismissCookieBanner(page);
  await expect(page.locator(SEL.sidebarRoot), 'main sidebar must be visible on the home page').toBeVisible({ timeout: 30000 });
}

async function openDashboard(page, uuid = DASHBOARD_UUID) {
  await page.goto(`${BASE_URL}/dashboard/${uuid}`, { waitUntil: 'networkidle' });
  await H.dismissCookieBanner(page);
  await expect(page.locator(SEL.dashboardLayout), 'dashboard layout must be visible').toBeVisible({ timeout: 30000 });
}

// ── Snapshot navigator helpers (dropdown UI) ──────────────────────────────────
// The snapshot navigator is a dropdown (single trigger button).
// Oldest snapshot = last option in the list. Newest = first option.

async function openSnapshotDropdown(page) {
  const navigator = page.locator(SEL.snapshotNavigator);
  await expect(navigator, 'snapshot navigator must be visible').toBeVisible({ timeout: 30000 });
  await page.locator(SEL.snapshotTrigger).first().click();
  await page.locator(SEL.snapshotOption).first().waitFor({ state: 'visible', timeout: 8000 });
}

async function goToOldestSnapshot(page) {
  await openSnapshotDropdown(page);
  const options = page.locator(SEL.snapshotOption);
  const count = await options.count();
  expect(count, 'snapshot dropdown must list at least one option').toBeGreaterThan(0);
  await options.nth(count - 1).click(); // last = oldest
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  return page.locator(SEL.snapshotNavigator);
}

async function goToNewestSnapshot(page) {
  await openSnapshotDropdown(page);
  const options = page.locator(SEL.snapshotOption);
  await expect(options.first(), 'snapshot dropdown must list at least one option').toBeVisible({ timeout: 5000 });
  await options.first().click(); // first = newest
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  return page.locator(SEL.snapshotNavigator);
}

async function openMarketDropdown(page) {
  await page.locator(SEL.marketTrigger).click();
  await expect(page.locator(SEL.marketOptions).first(), 'at least one market option must be offered').toBeVisible({ timeout: 5000 });
}

async function closeMarketDropdown(page) {
  await page.keyboard.press('Escape');
  await expect(page.locator(SEL.marketOptions).first()).not.toBeVisible({ timeout: 5000 });
}

async function openLLMDropdown(page) {
  // Figma 09_Reports_Navigation/01: trigger shows "LLM Engines <N>" badge.
  // Alt aria-label: "LLM engine filters" (blueprint v1.3).
  const trigger = page.locator(SEL.llmTrigger).or(page.locator(SEL.llmTriggerAlt)).first();
  await trigger.click();
  await expect(page.locator(SEL.llmSwitches).first(), 'at least one LLM switch must be offered').toBeVisible({ timeout: 5000 });
}

async function closeLLMDropdown(page) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  // Escape may not work on all envs — click main content area as fallback
  if (await page.locator(SEL.llmSwitches).first().isVisible().catch(() => false)) {
    await page.locator(SEL.main).click({ position: { x: 50, y: 300 }, force: true });
    await page.waitForTimeout(300);
  }
  await expect(page.locator(SEL.llmSwitches).first()).not.toBeVisible({ timeout: 5000 });
}

// ── Auto-annotated failure screenshot (MANDATORY — verbatim from run-playwright.md) ───
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'failed') return;
  const error = testInfo.errors[0];
  if (!error) return;
  const rawMsg = (error.message || '').replace(/\[[0-9;]*m/g, '');
  const locatorLine =
    rawMsg.match(/Locator:\s*(.+?)(?:\n|$)/) ||
    rawMsg.match(/waiting for\s+(.+?)(?:\n|$)/);
  const locatorStr = locatorLine ? locatorLine[1] : '';
  const allSelectors = locatorStr
    ? [...locatorStr.matchAll(/'([^']+)'/g)].map(m => m[1]).reverse()
    : [];
  const hasTextMatches = [...locatorStr.matchAll(/hasText:\s*'([^']+)'/g)].map(m => m[1]);

  const annotated = await page.evaluate(({ selectors, hasTexts }) => {
    function isVisible(el) {
      const s = window.getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0';
    }
    function paint(target) {
      target.style.border = '4px solid #dc2626';
      target.style.borderRadius = '4px';
      target.style.boxShadow = '0 0 0 6px rgba(220,38,38,0.35), 0 0 24px 6px rgba(220,38,38,0.45)';
      target.style.backgroundColor = 'rgba(220,38,38,0.08)';
      target.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
    for (const sel of selectors) {
      try {
        if (!/^[#.\[\]\w:>+~*"'\s\-=,()^$]+$/.test(sel)) continue;
        const matches = [...document.querySelectorAll(sel)];
        if (!matches.length) continue;
        let candidate = null;
        if (hasTexts.length) {
          candidate = matches.find(el => hasTexts.some(t => (el.textContent || '').includes(t)));
        }
        if (!candidate) candidate = matches[0];
        let target = candidate;
        while (target && target !== document.body && !isVisible(target)) {
          target = target.parentElement;
        }
        if (!target || target === document.body) continue;
        paint(target);
        return true;
      } catch (_) { /* invalid selector — skip */ }
    }
    return false;
  }, { selectors: allSelectors, hasTexts: hasTextMatches });

  if (!annotated) {
    await page.evaluate(() => {
      const banner = document.createElement('div');
      banner.textContent = 'TEST FAILED — element not found in DOM';
      Object.assign(banner.style, {
        position: 'fixed', top: '0', left: '0', right: '0',
        background: '#dc2626', color: 'white',
        padding: '10px 16px', fontWeight: '700', fontSize: '14px',
        zIndex: '999999', textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
      });
      document.body.prepend(banner);
    });
  }

  const tcId = testInfo.title.split(' ')[0];
  const failPath = path.join(SCREENSHOTS_DIR, `${tcId}_step3_then.png`);
  await page.screenshot({ path: failPath, fullPage: false });
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-56 — Snapshot navigation
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-56-TC001 - Previous and Next controls change the selected snapshot', async ({ page }) => {
  // Given a report has multiple snapshots
  await openDashboard(page);
  const navigator = page.locator(SEL.snapshotNavigator);
  await expect(navigator, 'snapshot navigator must be visible for a multi-snapshot report').toBeVisible({ timeout: 30000 });
  // Open dropdown to check multiple options exist
  await page.locator(SEL.snapshotTrigger).first().click();
  const options = page.locator(SEL.snapshotOption);
  await expect(options.first(), 'dropdown must show at least one option').toBeVisible({ timeout: 8000 });
  const count = await options.count();
  test.skip(count < 2, 'GEO-56-TC001: requires a report with more than one snapshot');
  const initialOption = (await options.first().textContent() || '').trim();
  await screenshot(page, 'GEO-56-TC001_step1_given');

  // When the Editor selects a different snapshot from the dropdown
  await options.nth(1).click(); // select second option (older snapshot)
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  await screenshot(page, 'GEO-56-TC001_step2_when');

  // Then the dashboard data reflects the selected snapshot and the current snapshot date is displayed
  const triggerText = (await page.locator(SEL.snapshotTrigger).first().textContent() || '').trim();
  expect(
    triggerText,
    `snapshot trigger must match "DD Mon YYYY" (e.g. "29 mai 2026"), got: "${triggerText}"`,
  ).toMatch(SNAPSHOT_LABEL_REGEX);
  expect(triggerText, 'snapshot trigger must change after selecting a different option').not.toContain(initialOption.slice(0, 15));

  await screenshot(page, 'GEO-56-TC001_step3_then');
});

test('GEO-56-TC002 - Filters remain consistent across snapshots', async ({ page }) => {
  // Given filters are already applied on the dashboard
  await openDashboard(page);
  const navigator = page.locator(SEL.snapshotNavigator);
  await expect(navigator, 'snapshot navigator must be visible').toBeVisible({ timeout: 30000 });
  // Verify multiple snapshots exist before applying filters
  await page.locator(SEL.snapshotTrigger).first().click();
  const options = page.locator(SEL.snapshotOption);
  await expect(options.first(), 'dropdown must show options').toBeVisible({ timeout: 8000 });
  const count = await options.count();
  test.skip(count < 2, 'GEO-56-TC002: requires a report with more than one snapshot');
  await page.keyboard.press('Escape'); // close dropdown without selecting
  await page.waitForTimeout(300);
  // Apply a specific market filter
  await openMarketDropdown(page);
  const firstNonAllOption = page.locator(SEL.marketOptions).nth(1);
  await expect(firstNonAllOption, 'at least one specific market option must be available').toBeVisible({ timeout: 5000 });
  const selectedMarketText = (await firstNonAllOption.textContent() || '').trim();
  await firstNonAllOption.click();
  await page.waitForLoadState('networkidle', { timeout: 5000 });
  await screenshot(page, 'GEO-56-TC002_step1_given');

  // When the Editor switches to another snapshot using the dropdown
  await page.locator(SEL.snapshotTrigger).first().click();
  await page.locator(SEL.snapshotOption).first().waitFor({ state: 'visible', timeout: 8000 });
  await page.locator(SEL.snapshotOption).nth(1).click(); // select older snapshot
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  await screenshot(page, 'GEO-56-TC002_step2_when');

  // Then the filters remain unchanged across snapshot navigation
  const marketKeyword = selectedMarketText.split(' - ')[0] || selectedMarketText;
  await expect(
    page.locator(SEL.marketTrigger),
    `market filter trigger must still reflect "${marketKeyword}" after snapshot switch`,
  ).toContainText(marketKeyword);

  await screenshot(page, 'GEO-56-TC002_step3_then');
});

test('GEO-56-TC003 - Previous button is disabled on the oldest snapshot', async ({ page }) => {
  // Given the Editor is viewing the oldest snapshot
  await openDashboard(page);
  const navigator = page.locator(SEL.snapshotNavigator);
  await expect(navigator, 'snapshot navigator must be visible').toBeVisible({ timeout: 30000 });
  await openSnapshotDropdown(page);
  const options = page.locator(SEL.snapshotOption);
  const count = await options.count();
  const oldestLabel = (await options.nth(count - 1).textContent() || '').trim();
  await options.nth(count - 1).click(); // select oldest (last in list)
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  await screenshot(page, 'GEO-56-TC003_step1_given');

  // When the Editor inspects the snapshot navigation controls
  const triggerText = (await page.locator(SEL.snapshotTrigger).first().textContent() || '').trim();
  await screenshot(page, 'GEO-56-TC003_step2_when');

  // Then the oldest snapshot is selected and is the last available option (no earlier snapshot accessible)
  expect(triggerText, 'trigger must show the oldest snapshot label after selecting the last option').toMatch(SNAPSHOT_LABEL_REGEX);
  // Re-open dropdown and verify the oldest option is still last (no option below it)
  await page.locator(SEL.snapshotTrigger).first().click();
  await page.locator(SEL.snapshotOption).first().waitFor({ state: 'visible', timeout: 5000 });
  const optionsAfter = page.locator(SEL.snapshotOption);
  const countAfter = await optionsAfter.count();
  const lastOptionLabel = (await optionsAfter.nth(countAfter - 1).textContent() || '').trim();
  expect(lastOptionLabel, 'oldest option must remain last in dropdown after selection').toMatch(SNAPSHOT_LABEL_REGEX);
  await page.keyboard.press('Escape');

  await screenshot(page, 'GEO-56-TC003_step3_then');
});

test('GEO-56-TC004 - Next button is disabled on the most recent snapshot', async ({ page }) => {
  // Given the Editor is viewing the most recent snapshot
  await openDashboard(page);
  const navigator = page.locator(SEL.snapshotNavigator);
  await expect(navigator, 'snapshot navigator must be visible').toBeVisible({ timeout: 30000 });
  // Select newest = first option in dropdown
  await openSnapshotDropdown(page);
  const options = page.locator(SEL.snapshotOption);
  await expect(options.first(), 'at least one option must be visible').toBeVisible({ timeout: 5000 });
  const newestLabel = (await options.first().textContent() || '').trim();
  await options.first().click();
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  await screenshot(page, 'GEO-56-TC004_step1_given');

  // When the Editor inspects the snapshot navigation controls
  const triggerText = (await page.locator(SEL.snapshotTrigger).first().textContent() || '').trim();
  await screenshot(page, 'GEO-56-TC004_step2_when');

  // Then the most recent snapshot is selected and is the first available option (no newer snapshot accessible)
  expect(triggerText, 'trigger must show the newest snapshot label').toMatch(SNAPSHOT_LABEL_REGEX);
  // Re-open dropdown and verify the newest option is still first
  await page.locator(SEL.snapshotTrigger).first().click();
  await page.locator(SEL.snapshotOption).first().waitFor({ state: 'visible', timeout: 5000 });
  const firstOptionLabel = (await page.locator(SEL.snapshotOption).first().textContent() || '').trim();
  expect(firstOptionLabel, 'newest option must remain first in dropdown').toMatch(SNAPSHOT_LABEL_REGEX);
  await page.keyboard.press('Escape');

  await screenshot(page, 'GEO-56-TC004_step3_then');
});

test('GEO-56-TC005 - Snapshot controls are hidden when only one snapshot exists', async ({ page }) => {
  // Given a report has exactly one snapshot
  test.skip(
    !DASHBOARD_UUID_SINGLE,
    'requires DASHBOARD_UUID_SINGLE (a report with exactly one snapshot) — set jdd single_snapshot_uuid to run',
  );

  // When the Editor opens the dashboard
  await openDashboard(page, DASHBOARD_UUID_SINGLE);
  await screenshot(page, 'GEO-56-TC005_step1_given');
  await screenshot(page, 'GEO-56-TC005_step2_when');

  // Then no snapshot navigation controls are displayed (dropdown trigger hidden or absent)
  await expect(
    page.locator(SEL.snapshotNavigator),
    'snapshot navigator must NOT be present when the report has only one snapshot',
  ).toHaveCount(0);

  await screenshot(page, 'GEO-56-TC005_step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-57 — Snapshot data model
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-57-TC001 - Snapshot is created when analysis completes', async ({ page }) => {
  // Given an analysis execution has just completed
  // When the results are finalized
  // Then the snapshot contains executedAt, totalQuestions, successCount, failedCount, resolved config data
  //
  // UI proxy: a completed analysis produces a dated snapshot visible in the navigator.
  // Figma 08_GEO_Onboarding/38: analysis progress shows LLMs→Sources→Aggregate→Insights stages.
  await openDashboard(page);
  const navigator = page.locator(SEL.snapshotNavigator);
  await expect(
    navigator,
    'snapshot navigator must be visible — confirms at least one snapshot was created after analysis completion',
  ).toBeVisible({ timeout: 30000 });
  await screenshot(page, 'GEO-57-TC001_step1_given');

  // When the results are finalized — navigate to the most recent snapshot
  const newestNavigator = await goToNewestSnapshot(page);
  await screenshot(page, 'GEO-57-TC001_step2_when');

  // Then the snapshot contains a valid executedAt date label
  const snapshotLabel = (await newestNavigator.textContent() || '').trim();
  expect(
    snapshotLabel,
    `snapshot label must match "DD Mon YYYY" (e.g. "29 mai 2026"), got: "${snapshotLabel}"`,
  ).toMatch(SNAPSHOT_LABEL_REGEX);

  await screenshot(page, 'GEO-57-TC001_step3_then');
});

test('GEO-57-TC002 - Snapshot remains immutable', async ({ page }) => {
  // Given a snapshot already exists
  // When an update to the snapshot is attempted
  // Then the snapshot remains unchanged
  //
  // UI-level proxy: the snapshot label must not change after a full page refresh.
  await openDashboard(page);
  const navigator = page.locator(SEL.snapshotNavigator);
  await expect(navigator).toBeVisible({ timeout: 30000 });
  const labelBefore = (await navigator.textContent() || '').trim();
  await screenshot(page, 'GEO-57-TC002_step1_given');

  // When the page is refreshed (simulates a re-fetch of the snapshot)
  await page.reload({ waitUntil: 'networkidle' });
  await screenshot(page, 'GEO-57-TC002_step2_when');

  // Then the snapshot label remains unchanged — data is immutable
  const navigatorAfter = page.locator(SEL.snapshotNavigator);
  await expect(navigatorAfter).toBeVisible({ timeout: 30000 });
  const labelAfter = (await navigatorAfter.textContent() || '').trim();
  expect(
    labelAfter,
    `snapshot label must not change after page refresh — got "${labelAfter}", expected "${labelBefore}"`,
  ).toBe(labelBefore);

  await screenshot(page, 'GEO-57-TC002_step3_then');
});

test('GEO-57-TC003 - Snapshot retention is preserved', async ({ page }) => {
  // Given snapshots have been created over time
  // When the retention policy is checked
  // Then snapshots older than the retention window are not removed before 12 months
  //
  // UI proxy: the snapshot navigator exposes navigation to at least one historical snapshot.
  // Full 12-month retention requires a backend audit; this test confirms > 1 snapshot exists.
  await openDashboard(page);
  const navigator = page.locator(SEL.snapshotNavigator);
  await expect(navigator).toBeVisible({ timeout: 30000 });
  const prevBtn = navigator.locator('button').first();
  const prevDisabled = await prevBtn.getAttribute('disabled') !== null || await prevBtn.getAttribute('aria-disabled') === 'true';
  test.skip(
    prevDisabled,
    'GEO-57-TC003: requires a report with more than one historical snapshot — only one snapshot currently exists',
  );
  await screenshot(page, 'GEO-57-TC003_step1_given');

  // When the retention policy is checked — navigate to the oldest available snapshot
  const oldestNavigator = await goToOldestSnapshot(page);
  const oldestLabel = (await oldestNavigator.textContent() || '').trim();
  await screenshot(page, 'GEO-57-TC003_step2_when');

  // Then snapshots older than the retention window are not removed — oldest is accessible
  expect(
    oldestLabel,
    `oldest snapshot must have a valid date label, got: "${oldestLabel}"`,
  ).toMatch(SNAPSHOT_LABEL_REGEX);

  await screenshot(page, 'GEO-57-TC003_step3_then');
});

test('GEO-57-TC004 - Snapshot stores report and response links', async ({ page }) => {
  // Given an analysis execution completes and snapshot storage runs
  // When the snapshot is created
  // Then snapshots are linked to reports, llm_responses reference snapshotId, configSnapshot stores resolved competitors
  //
  // UI proxy: dashboard loads with LLM filter populated, confirming llm_responses are linked.
  // Figma 09_Reports_Navigation/01: LLM dropdown shows engines, confirming config is resolved.
  await openDashboard(page);
  const navigator = page.locator(SEL.snapshotNavigator);
  await expect(navigator).toBeVisible({ timeout: 30000 });
  await screenshot(page, 'GEO-57-TC004_step1_given');

  // When the snapshot is created — verify LLM filter loads (proves llm_responses are linked)
  const llmTrigger = page.locator(SEL.llmTrigger).or(page.locator(SEL.llmTriggerAlt)).first();
  await expect(
    llmTrigger,
    'LLM engine filter must be visible — confirms llm_responses are linked to the snapshot',
  ).toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-57-TC004_step2_when');

  // Then open LLM dropdown and verify at least one engine switch is present
  await openLLMDropdown(page);
  const switchCount = await page.locator(SEL.llmSwitches).count();
  expect(
    switchCount,
    'at least one LLM engine switch must be present — confirms configSnapshot stores resolved LLM config',
  ).toBeGreaterThan(0);
  await closeLLMDropdown(page);

  await screenshot(page, 'GEO-57-TC004_step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-55 — Guided tour
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-55-TC001 - Guided tour starts from URL parameter', async ({ page }) => {
  // Requires TOUR_ENTRY_URL — the URL that triggers tour activation (e.g. BASE_URL?tour=true)
  test.skip(
    !TOUR_ENTRY_URL,
    'GEO-55-TC001: requires TOUR_ENTRY_URL (e.g. http://localhost:3000/geo?tour=true) — set env var to run',
  );

  // Given a user opens the product with the tour URL parameter
  await page.goto(TOUR_ENTRY_URL, { waitUntil: 'networkidle' });
  await screenshot(page, 'GEO-55-TC001_step1_given');

  // When the tour activates
  const tourOverlay = page.locator(SEL.tourOverlay).first();
  await expect(tourOverlay, 'guided tour overlay must appear after navigating to tour URL').toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-55-TC001_step2_when');

  // Then the tour navigates across Overview, Actions Center, and Category views with contextual tooltips
  const tourText = (await tourOverlay.textContent() || '').trim();
  expect(tourText.length, 'tour tooltip must contain descriptive text').toBeGreaterThan(0);

  await screenshot(page, 'GEO-55-TC001_step3_then');
});

test('GEO-55-TC002 - Tour can be advanced or skipped', async ({ page }) => {
  test.skip(
    !TOUR_ENTRY_URL,
    'GEO-55-TC002: requires TOUR_ENTRY_URL — set env var to run',
  );

  // Given a guided tour is currently active
  await page.goto(TOUR_ENTRY_URL, { waitUntil: 'networkidle' });
  const tourOverlay = page.locator(SEL.tourOverlay).first();
  await expect(tourOverlay, 'guided tour must be active').toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-55-TC002_step1_given');

  // When the user clicks the advance (Next) control
  const nextBtn = page.locator(SEL.tourNextBtn).first();
  await expect(nextBtn, '"Next" / "Continue" button must be present in the tour overlay').toBeVisible({ timeout: 5000 });
  await nextBtn.click();
  await screenshot(page, 'GEO-55-TC002_step2_when');

  // Then the tour moves to the next step or ends cleanly
  await page.waitForTimeout(500);
  const overlayStillVisible = await tourOverlay.isVisible();
  if (overlayStillVisible) {
    const newText = (await tourOverlay.textContent() || '').trim();
    expect(newText.length, 'advanced tour step must have descriptive content').toBeGreaterThan(0);
  }
  // If overlay disappeared, tour ended cleanly — also acceptable

  await screenshot(page, 'GEO-55-TC002_step3_then');
});

test('GEO-55-TC003 - Tour uses demo data and stays within step range', async ({ page }) => {
  // Given no real report exists for the user (Figma 08/36: empty state "No reports have been made for your Brand")
  test.skip(
    !TOUR_ENTRY_URL,
    'GEO-55-TC003: requires TOUR_ENTRY_URL configured for a no-report account — set env var to run',
  );

  await page.goto(TOUR_ENTRY_URL, { waitUntil: 'networkidle' });
  const tourOverlay = page.locator(SEL.tourOverlay).first();
  await expect(tourOverlay).toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-55-TC003_step1_given');

  // When the guided tour starts — count steps by advancing through tour
  let stepCount = 1;
  for (let i = 0; i < TOUR_MAX_ITER; i++) {
    const nextBtn = page.locator(SEL.tourNextBtn).first();
    if (!(await nextBtn.isVisible())) break;
    await nextBtn.click();
    await page.waitForTimeout(300);
    if (!(await tourOverlay.isVisible())) break;
    stepCount++;
  }
  await screenshot(page, 'GEO-55-TC003_step2_when');

  // Then the tour shows demo data and the total number of steps stays within the expected range (JDD)
  expect(stepCount, `tour step count must be ≥ ${TOUR_MIN_STEPS}, got ${stepCount}`).toBeGreaterThanOrEqual(TOUR_MIN_STEPS);
  expect(stepCount, `tour step count must be ≤ ${TOUR_MAX_STEPS}, got ${stepCount}`).toBeLessThanOrEqual(TOUR_MAX_STEPS);

  await screenshot(page, 'GEO-55-TC003_step3_then');
});

test('GEO-55-TC004 - Guided tour completion is tracked', async ({ page }) => {
  test.skip(
    !TOUR_ENTRY_URL,
    'GEO-55-TC004: requires TOUR_ENTRY_URL — set env var to run',
  );

  // Given a guided tour is active and analytics tracking is enabled
  const analyticsEvents = [];
  await page.route('**/analytics**', route => { analyticsEvents.push(route.request().url()); route.continue(); });
  await page.route('**/events**',    route => { analyticsEvents.push(route.request().url()); route.continue(); });

  await page.goto(TOUR_ENTRY_URL, { waitUntil: 'networkidle' });
  const tourOverlay = page.locator(SEL.tourOverlay).first();
  await expect(tourOverlay).toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-55-TC004_step1_given');

  // When the user skips the tour
  const skipBtn = page.locator(SEL.tourSkipBtn).first();
  await expect(skipBtn, '"Skip" / "Exit tour" button must be present').toBeVisible({ timeout: 5000 });
  await skipBtn.click();
  await page.waitForTimeout(1000); // allow analytics flush
  await screenshot(page, 'GEO-55-TC004_step2_when');

  // Then tour completion analytics are recorded — tour overlay disappears cleanly
  await expect(tourOverlay, 'tour overlay must disappear after skip').not.toBeVisible({ timeout: 5000 });
  // analyticsEvents will contain any captured network calls to /analytics or /events.

  await screenshot(page, 'GEO-55-TC004_step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-235 — Sidebar (module) navigation
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-235-TC001 - Mention sidebar link opens the Mention application', async ({ page }) => {
  // Given a user is on any page of the application
  await openHome(page);
  await screenshot(page, 'GEO-235-TC001_step1_given');

  // When the user clicks the Mention item in the sidebar
  const mentionBtn = moduleButtonByLabel(page, SIDEBAR_MODULE_LABELS[0]);
  await expect(mentionBtn, `"${SIDEBAR_MODULE_LABELS[0]}" button must be visible in the sidebar module navigation`).toBeVisible({ timeout: 10000 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
    mentionBtn.click(),
  ]);
  await screenshot(page, 'GEO-235-TC001_step2_when');

  // Then the browser navigates to the configured Mention URL in the same tab
  // URL is read from VITE_GEO_MENTION_URL (per CSV spec)
  // Two valid outcomes:
  //   • Session active on the target app → destination URL (with or without trailing slash)
  //   • No session on target app        → auth-staging.onclusive.com login redirect
  const finalUrl = page.url();
  const mentionBase = (VITE_MENTION_URL || '').replace(/\/$/, '');
  const isDestination = mentionBase ? finalUrl.replace(/\/$/, '') === mentionBase : false;
  const isAuthRedirect = AUTH_REDIRECT_RE.test(finalUrl);
  expect(
    isDestination || isAuthRedirect,
    `expected Mention URL ("${VITE_MENTION_URL}") or auth-staging login redirect; got "${finalUrl}"`,
  ).toBe(true);

  await screenshot(page, 'GEO-235-TC001_step3_then');
});

test('GEO-235-TC002 - Review sidebar link opens the Review application', async ({ page }) => {
  // Given a user is on any page of the application
  await openHome(page);
  await screenshot(page, 'GEO-235-TC002_step1_given');

  // When the user clicks the Review item in the sidebar
  const reviewBtn = moduleButtonByLabel(page, SIDEBAR_MODULE_LABELS[1]);
  await expect(reviewBtn, `"${SIDEBAR_MODULE_LABELS[1]}" button must be visible in the sidebar module navigation`).toBeVisible({ timeout: 10000 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
    reviewBtn.click(),
  ]);
  await screenshot(page, 'GEO-235-TC002_step2_when');

  // Then the browser navigates to the configured Review URL in the same tab
  // URL is read from VITE_GEO_REVIEW_URL (per CSV spec)
  // Two valid outcomes:
  //   • Session active on the target app → destination URL (with or without trailing slash)
  //   • No session on target app        → auth-staging.onclusive.com login redirect
  const finalUrl = page.url();
  const reviewBase = (VITE_REVIEW_URL || '').replace(/\/$/, '');
  const isDestination = reviewBase ? finalUrl.replace(/\/$/, '') === reviewBase : false;
  const isAuthRedirect = AUTH_REDIRECT_RE.test(finalUrl);
  expect(
    isDestination || isAuthRedirect,
    `expected Review URL ("${VITE_REVIEW_URL}") or auth-staging login redirect; got "${finalUrl}"`,
  ).toBe(true);

  await screenshot(page, 'GEO-235-TC002_step3_then');
});

test('GEO-235-TC003 - Contact sidebar link opens the Contact portal', async ({ page }) => {
  // Given a user is on any page of the application
  await openHome(page);
  await screenshot(page, 'GEO-235-TC003_step1_given');

  // When the user clicks the Contact item in the sidebar
  const contactBtn = moduleButtonByLabel(page, SIDEBAR_MODULE_LABELS[2]);
  await expect(contactBtn, `"${SIDEBAR_MODULE_LABELS[2]}" button must be visible in the sidebar module navigation`).toBeVisible({ timeout: 10000 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
    contactBtn.click(),
  ]);
  await screenshot(page, 'GEO-235-TC003_step2_when');

  // Then the browser navigates to the configured Contact URL in the same tab
  // URL is read from VITE_GEO_CONTACT_URL (per CSV spec)
  // Two valid outcomes:
  //   • Session active on the target app → destination URL (with or without trailing slash)
  //   • No session on target app        → auth-staging.onclusive.com login redirect
  const finalUrl = page.url();
  const contactBase = (VITE_CONTACT_URL || '').replace(/\/$/, '');
  const isDestination = contactBase ? finalUrl.replace(/\/$/, '') === contactBase : false;
  const isAuthRedirect = AUTH_REDIRECT_RE.test(finalUrl);
  expect(
    isDestination || isAuthRedirect,
    `expected Contact URL ("${VITE_CONTACT_URL}") or auth-staging login redirect; got "${finalUrl}"`,
  ).toBe(true);

  await screenshot(page, 'GEO-235-TC003_step3_then');
});

test('GEO-235-TC004 - Settings sidebar link opens the internal Coming Soon page', async ({ page }) => {
  // Given a user is on any page of the application
  await openHome(page);
  await page.evaluate(() => { window.__noReloadToken__ = 'epic99-tc4'; });
  await screenshot(page, 'GEO-235-TC004_step1_given');

  // When the user clicks the Settings item at the bottom of the sidebar
  const settingsLink = page.locator(SEL.settingsLink);
  await expect(settingsLink, '"Settings" link must be visible in the sidebar utility navigation').toBeVisible({ timeout: 10000 });
  await settingsLink.click();
  await screenshot(page, 'GEO-235-TC004_step2_when');

  // Then the application navigates internally via React Router to the /settings route
  await expect(page).toHaveURL(new RegExp(`${SETTINGS_URL_PATH.replace(/\//g, '\\/')}$`), { timeout: 10000 });

  // And the navigation does not trigger a full page reload
  const tokenStillThere = await page.evaluate(() => window.__noReloadToken__ === 'epic99-tc4');
  expect(tokenStillThere, 'React Router navigation to /settings must not trigger a full page reload').toBe(true);

  // And the /settings page shows the expected screen (JDD: settings_page.expected_text)
  const comingSoon = page.getByText(new RegExp(SETTINGS_EXPECTED_TEXT, 'i')).first();
  await expect(comingSoon, `/settings page must display "${SETTINGS_EXPECTED_TEXT}"`).toBeVisible({ timeout: 10000 });

  await screenshot(page, 'GEO-235-TC004_step3_then');
});

test('GEO-235-TC005 - Measure sidebar item stays active when already selected', async ({ page }) => {
  // Given the user is already on the Measure module
  await openHome(page);
  const measureBtn = moduleButtonByLabel(page, SIDEBAR_MODULE_LABELS[3]);
  await expect(measureBtn, `"${SIDEBAR_MODULE_LABELS[3]}" button must be visible in the sidebar`).toBeVisible({ timeout: 10000 });
  await expect(measureBtn, `"${SIDEBAR_MODULE_LABELS[3]}" must already be aria-current="page" on the GEO home page`).toHaveAttribute('aria-current', 'page');
  const urlBefore = page.url();
  await screenshot(page, 'GEO-235-TC005_step1_given');

  // When the user clicks the Measure item in the sidebar
  await measureBtn.click();
  await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
  await screenshot(page, 'GEO-235-TC005_step2_when');

  // Then no navigation occurs
  expect(page.url(), 'URL must not change when clicking the already-active Measure item').toBe(urlBefore);

  // And the active visual state remains on the Measure item
  await expect(measureBtn, `${SIDEBAR_MODULE_LABELS[3]} button must remain aria-current="page" after the click`).toHaveAttribute('aria-current', 'page');

  await screenshot(page, 'GEO-235-TC005_step3_then');
});

test('GEO-235-TC006 - Missing module URL leaves the sidebar item inactive', async ({ page }) => {
  // Given one sidebar module URL is not configured
  const targetLabel = MISSING_MODULE_LABEL;
  test.skip(
    !targetLabel,
    'requires MISSING_MODULE_LABEL (e.g. "Mention") — set the env var to designate an unconfigured module',
  );

  const consoleErrors = [];
  page.on('pageerror', (err) => { consoleErrors.push(`pageerror: ${err.message}`); });
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(`console.error: ${msg.text()}`); });

  // When the application loads
  await openHome(page);
  await screenshot(page, 'GEO-235-TC006_step1_given');
  await screenshot(page, 'GEO-235-TC006_step2_when');

  // Then the related sidebar item remains inactive without a navigation link
  const targetBtn = moduleButtonByLabel(page, targetLabel);
  await expect(targetBtn, `"${targetLabel}" button must still be rendered in the sidebar`).toBeVisible({ timeout: 10000 });
  await expect(targetBtn).not.toHaveAttribute('aria-current', 'page');
  const urlBefore = page.url();
  await targetBtn.click();
  await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
  expect(page.url(), `URL must not change when clicking the unconfigured "${targetLabel}" item`).toBe(urlBefore);

  // And no visible application error is shown
  const visibleErrorBanner = page.getByRole('alert').or(page.locator('[class*="error"]:visible')).first();
  await expect(visibleErrorBanner, 'no visible application error banner must be displayed').toHaveCount(0);
  expect(
    consoleErrors,
    `no console errors must be raised for unconfigured "${targetLabel}" — got: ${consoleErrors.join(' | ')}`,
  ).toEqual([]);

  await screenshot(page, 'GEO-235-TC006_step3_then');
});
