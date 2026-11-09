// test-suite-epic263.spec.js
// E2E — GEO-263: Multi-Select Market Filter (Stories 16.1, 16.2, 16.3)
// CSV: .claude/Data/output/csv/testcases-coverage-epic263.csv
//
// Launch:
//   EPIC_ID=263 USE_AUTH=true \
//   npx playwright test .claude/Data/raw/playwright/test-suite-epic263.spec.js --project=chromium

'use strict';
const { test, expect } = require('@playwright/test');
const path = require('path');

const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H = require('./e2e-helpers');

// ── JDD (2-layer merge) ───────────────────────────────────────────────────────
const JDD_COMMON = require('../test-data/jdd/common.json');
const JDD_EPIC   = require('../test-data/jdd/epic263/default.json');
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
const JDD = deepMerge(JDD_COMMON, JDD_EPIC);

// ── Constants (env > JDD) ─────────────────────────────────────────────────────
const BASE_URL        = process.env.BASE_URL        || 'https://staging-geo.onclusive.com/geo';
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID  || JDD.dashboard.dashboard_uuid;
const TARGET_SNAPSHOT = process.env.TARGET_SNAPSHOT || JDD.snapshot?.target || null;
const DASHBOARD_URL   = `${BASE_URL}/dashboard/${DASHBOARD_UUID}`;
const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-epic263');
H.ensureDir(SCREENSHOTS_DIR);

const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── Selectors (GEO-263 — multi-select market filter) ─────────────────────────
const SEL = {
  // Market multi-select (GEO-263 new feature)
  // Note: selectors are exploratory — the exact DOM depends on staging implementation
  marketTrigger:    BLUEPRINT.filters.market_multi_select.trigger,
  allMarketsOption: BLUEPRINT.filters.market_multi_select.all_markets_option,
  marketOption:     BLUEPRINT.filters.market_multi_select.market_option,
  countLabel:       BLUEPRINT.filters.market_multi_select.count_label_pattern,

  // Sidebar / navigation
  sidebar:          '[data-testid="dashboard-sidebar"]',
  categoriesBtn:    '[data-testid="dashboard-sidebar"] button:has-text("Categories")',
  categorySubItems: '[data-testid="dashboard-sidebar"] a[href*="/category/"]',

  // KPI cards (to assert re-render after market change)
  kpiAny:           '[aria-label*="Visibility"], [aria-label*="Share of Voice"], [aria-label*="Sentiment"]',
};

// ── Navigate helper ───────────────────────────────────────────────────────────
async function gotoDashboard(page) {
  await page.goto(DASHBOARD_URL, { waitUntil: 'load' });
  await H.dismissCookieBanner(page);
  await H.ensureSnapshot(page, TARGET_SNAPSHOT);
  await page.waitForTimeout(1000);
  await expect(page.locator(SEL.sidebar), 'Sidebar must be visible').toBeVisible({ timeout: 20000 });
}

// ── Helper: open market multi-select dropdown ─────────────────────────────────
async function openMarketDropdown(page) {
  const trigger = page.locator(SEL.marketTrigger).first();
  await trigger.waitFor({ state: 'visible', timeout: 10000 });
  await trigger.click();
  await page.waitForTimeout(600);
}

// ── Helper: get current market trigger text ───────────────────────────────────
async function getMarketTriggerText(page) {
  const trigger = page.locator(SEL.marketTrigger).first();
  return (await trigger.textContent() || '').trim();
}

// ═════════════════════════════════════════════════════════════════════════════
// GEO-263 — Story 16.1 : Multi-select dropdown UI
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-263-TC001 — Market Dropdown UI', async ({ page }) => {
  await test.step('Given a multi-country report is open on the Overview page', async () => {
    await gotoDashboard(page);
    await shot(page, 'GEO-263-TC001_step1_given');
  });

  await test.step('When the user opens the market multi-select dropdown', async () => {
    await openMarketDropdown(page);

    // Assert "All markets" option is visible
    const allOption = page.locator(SEL.allMarketsOption).first();
    await expect(allOption, '"All markets" shortcut must be visible in the dropdown').toBeVisible({ timeout: 8000 });

    // Assert at least one selectable market option is present
    await page.waitForSelector(SEL.marketOption, { timeout: 8000 });
    const options = page.locator(SEL.marketOption);
    const optCount = await options.count();
    expect(optCount, 'At least 1 selectable market option must be listed').toBeGreaterThan(0);

    await shot(page, 'GEO-263-TC001_step2_when');
  });

  await test.step('Then selecting markets shows names or count, and deselecting all restores All markets', async () => {
    const options = page.locator(SEL.marketOption);
    const optCount = await options.count();
    const trigger  = page.locator(SEL.marketTrigger).first();

    // Select exactly 1 market first (avoids "all selected = All markets" edge case when optCount === 2)
    await page.locator(SEL.marketOption).first().click();
    await page.waitForTimeout(400);

    // Assert trigger shows the selected market name (not "All markets")
    const triggerText1 = (await trigger.textContent() || '').toLowerCase();
    await shotAt(page, trigger, 'GEO-263-TC001_step3_then');
    expect(triggerText1, 'Trigger must show market name (not "All markets") when 1 market selected').not.toMatch(/^all markets$/i);

    // If 3+ market options exist, select 2 more → expect count label
    if (optCount >= 3) {
      await page.locator(SEL.marketOption).nth(1).click();
      await page.waitForTimeout(300);
      await page.locator(SEL.marketOption).nth(2).click();
      await page.waitForTimeout(300);
      const triggerText3 = (await trigger.textContent() || '').toLowerCase();
      expect(triggerText3, 'Trigger must show market count (e.g. "3 markets") when 3+ markets selected').toMatch(/\d+\s*market/i);
    }

    // Reset: click "All markets" to deselect → trigger should show "All markets"
    const allOption = page.locator(SEL.allMarketsOption).first();
    if (await allOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await allOption.click();
      await page.waitForTimeout(400);
    }
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    const triggerAfter = (await trigger.textContent() || '').toLowerCase();
    expect(triggerAfter, 'Trigger must show "All markets" after deselecting all').toMatch(/all/i);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// GEO-263 — Story 16.2 : Panel Data Aggregation
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-263-TC002 — Panel Data Aggregation', async ({ page }) => {
  await test.step('Given two or more markets are selected in the market filter', async () => {
    await gotoDashboard(page);

    // Open dropdown and select first 2 market options
    await openMarketDropdown(page);
    await page.waitForSelector(SEL.marketOption, { timeout: 8000 });
    const options = page.locator(SEL.marketOption);
    const optCount = await options.count();

    if (optCount < 2) {
      test.skip(true, 'Dashboard does not have at least 2 markets — skipping aggregation test');
      return;
    }
    for (let i = 0; i < 2; i++) {
      await page.locator(SEL.marketOption).nth(i).click();
      await page.waitForTimeout(300);
    }
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    await shot(page, 'GEO-263-TC002_step1_given');
  });

  await test.step('When KPI cards and panels render for the selected market subset', async () => {
    // Wait for at least one KPI card to become visible (panels re-rendered)
    await page.waitForSelector(SEL.kpiAny, { timeout: 15000 });
    const kpiCard = page.locator(SEL.kpiAny).first();
    await kpiCard.scrollIntoViewIfNeeded();
    await shot(page, 'GEO-263-TC002_step2_when');
  });

  await test.step('Then panels re-render with aggregated data and no error or empty state', async () => {
    // Assert at least one KPI card is visible
    const kpiCard = page.locator(SEL.kpiAny).first();
    await expect(kpiCard, 'At least one KPI card must be visible after market selection').toBeVisible({ timeout: 10000 });

    // Assert no error dialog or toast
    const errorDialog = page.locator('[role="dialog"]:has-text("error"), [role="alert"]:has-text("error")').first();
    const hasError = await errorDialog.isVisible({ timeout: 2000 }).catch(() => false);
    expect(hasError, 'No error dialog must appear after selecting markets').toBe(false);

    await shotAt(page, kpiCard, 'GEO-263-TC002_step3_then');
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// GEO-263 — Story 16.3 : Selection Persistence
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-263-TC003 — Selection Persistence', async ({ page }) => {
  let selectedMarketText = '';

  await test.step('Given a market subset is selected on the Overview page', async () => {
    await gotoDashboard(page);

    await openMarketDropdown(page);
    await page.waitForSelector(SEL.marketOption, { timeout: 8000 });
    const options = page.locator(SEL.marketOption);
    if (await options.count() === 0) {
      test.skip(true, 'No market options found — skipping persistence test');
      return;
    }
    // Select first available market
    await page.locator(SEL.marketOption).first().click();
    await page.waitForTimeout(400);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    selectedMarketText = await getMarketTriggerText(page);
    expect(
      selectedMarketText.toLowerCase(),
      'Market trigger must NOT show "All markets" after selecting a market'
    ).not.toMatch(/^all markets$/i);

    await shot(page, 'GEO-263-TC003_step1_given');
  });

  await test.step('When navigating to a Category view in the same session', async () => {
    // Expand Categories in sidebar if needed
    const alreadyExpanded = await page.locator(SEL.categorySubItems).first().isVisible().catch(() => false);
    if (!alreadyExpanded) {
      await page.locator(SEL.categoriesBtn).first().click();
      await page.waitForTimeout(600);
    }

    // Click the first category sub-item
    const firstCategory = page.locator(SEL.categorySubItems).first();
    await expect(firstCategory, 'At least one category sub-item must be visible').toBeVisible({ timeout: 10000 });
    await firstCategory.click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);

    await shot(page, 'GEO-263-TC003_step2_when');
  });

  await test.step('Then the market selection persists on Category view and after page reload', async () => {
    // Verify market selection still active on category page
    const triggerOnCategory = await getMarketTriggerText(page);
    expect(
      triggerOnCategory.toLowerCase(),
      'Market selection must persist when navigating from Overview to Category'
    ).not.toMatch(/^all markets$/i);

    // Reload page and verify selection restored
    await page.reload({ waitUntil: 'load' });
    await H.dismissCookieBanner(page);
    await page.waitForTimeout(1500);

    const triggerAfterReload = await getMarketTriggerText(page);
    expect(
      triggerAfterReload.toLowerCase(),
      'Market selection must be restored after page reload'
    ).not.toMatch(/^all markets$/i);

    const trigger = page.locator(SEL.marketTrigger).first();
    await shotAt(page, trigger, 'GEO-263-TC003_step3_then');
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// SKIPPED tests
// ═════════════════════════════════════════════════════════════════════════════

test.skip('GEO-263-TC004 — [SKIP] Shared Link Reset', () => {
  // SKIPPED — Requires a /shared/ route URL which is not available in the current test environment.
  // To re-enable: provide a valid shared link URL in JDD (jdd/epic263/default.json → report.shared_link_url)
  // and add logic to navigate via that URL then assert market trigger shows "All markets".
});

test.skip('GEO-263-TC005 — [SKIP] Single-Country UI', () => {
  // SKIPPED — Requires a separate dashboard UUID configured with exactly 1 market.
  // The provided dashboard (b731d98b-…) is multi-country. Add a single_market_dashboard_uuid
  // in jdd/epic263/default.json to enable this test.
  // Expected: no multi-select dropdown, only a static chip showing the single market.
});
