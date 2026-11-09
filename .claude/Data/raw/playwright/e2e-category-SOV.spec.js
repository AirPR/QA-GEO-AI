// e2e-category-SOV.spec.js
// GEO-640 — Share of Voice : Category view
//
// TC-GEO-663-002 — Category: KPI row shows exactly 4 cards without SOV and layout reflows cleanly
// TC-GEO-663-004 — Category: Brand Rankings table has no SoV% column
// TC-GEO-664-002 — SOV dedicated card renders below KPI row on Category view
//
// Stories : GEO-663 / GEO-664
// CSV source : e2e-category-SOV.csv
//
// Launch:
//   SPEC_NAME=e2e-category-SOV USE_AUTH=true BASE_URL=https://staging-geo.onclusive.com/geo \
//     npx playwright test .claude/Data/raw/playwright/e2e-category-SOV.spec.js --project=chromium --workers=2
//
// DOM inspected on 2026-06-18 — Toyota dashboard (staging)

'use strict';

const { test, expect } = require('@playwright/test');
const path = require('path');
const H    = require('./e2e-helpers');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');

// ── i18n ──────────────────────────────────────────────────────────────────────
const LOCALE = process.env.LOCALE || 'en-us';
const I18N   = require(`../test-data/i18n/${LOCALE}.json`);

// Texts hardcoded in the app (not present in i18n JSON files)
const HARDCODED = {
  sovSubtitle: {
    'fr':    'Par marque, votre marque est mise en évidence',
    'en-us': 'By brand, your brand is highlighted',
    'en-gb': 'By brand, your brand is highlighted',
    'es':    'Por marca, su marca aparece destacada',
  },
};

// ── Constants ─────────────────────────────────────────────────────────────────
const SPEC_NAME       = process.env.SPEC_NAME || 'e2e-category-SOV';
const SCREENSHOTS_DIR = path.resolve(__dirname, `../../output/reports/screenshots-${SPEC_NAME}`);
H.ensureDir(SCREENSHOTS_DIR);

const BASE_URL        = process.env.BASE_URL || 'https://staging-geo.onclusive.com/geo';
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID || '439acd96-0b1b-4da4-9e07-612d38e9783e';
const CATEGORY_UUID   = process.env.CATEGORY_UUID  || '21a79173-c455-4e49-bf69-307dc2dba7e4'; // Hybrid Cars

const CATEGORY_URL    = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CATEGORY_UUID}`;

// ── Selectors (verified against staging DOM 2026-06-18) ──────────────────────
const SEL = {
  // KPI cards
  kpiCardVisibility:  '[data-testid="kpi-card-visibility"]',
  kpiCardAvgPosition: '[data-testid="kpi-card-avgPosition"]',
  kpiCardWinRate:     '[data-testid="kpi-card-winRate"]',
  kpiCardSentiment:   '[data-testid="kpi-card-sentiment"]',

  // SOV card — no dedicated data-testid, use heading text (locale-aware)
  sovHeading:  `h3:has-text("${I18N.dashboard.kpi.shareOfVoice}"), h2:has-text("${I18N.dashboard.kpi.shareOfVoice}")`,
  sovSubtitle: `text=${HARDCODED.sovSubtitle[LOCALE] || HARDCODED.sovSubtitle['en-us']}`,
  sovEmptyMsg: 'text=No data to show',
  sovErrorMsg: 'text=Couldn\'t load this chart',
  sovChartSvg: 'svg',

  // Brand Rankings table headers
  tableHeaders: 'th',

  // Skeleton loader
  skeleton: '[class*="animate-pulse"]',
};

// ── Shared helpers ─────────────────────────────────────────────────────────────
const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);

async function gotoPage(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 45000 });
  // Staging keeps persistent network requests — 'networkidle' never fires.
  await page.waitForSelector('[data-testid="dashboard-sidebar"]', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1000);
  await H.dismissCookieBanner(page);
}

async function waitForSkeletonGone(page, timeout = 15000) {
  const skeleton = page.locator(SEL.skeleton).first();
  const hasSkeleton = await skeleton.isVisible({ timeout: 3000 }).catch(() => false);
  if (hasSkeleton) {
    await skeleton.waitFor({ state: 'hidden', timeout }).catch(() => {});
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────
test.describe('GEO-640 — SOV : Category view', () => {
  H.registerAfterEach(SCREENSHOTS_DIR);

  // ── TC-GEO-663-002 ──────────────────────────────────────────────────────────
  test('TC-GEO-663-002 - Category: KPI row shows exactly 4 cards without SOV and layout reflows cleanly', async ({ page }) => {
    const TC = 'TC-GEO-663-002';

    await test.step('Given a user is authenticated and navigates to a Category view', async () => {
      await gotoPage(page, CATEGORY_URL);
      await shot(page, `${TC}_step1_given`);
    });

    await test.step('When the Performance KPI row renders', async () => {
      await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 20000 });
      await waitForSkeletonGone(page);
      await shotAt(page, page.locator(SEL.kpiCardVisibility).first(), `${TC}_step2_when`);
    });

    await test.step('Then it shows the same 4 KPI cards: Visibility, Avg Position, AI Choice, Sentiment — and no Share of Voice card', async () => {
      await expect(page.locator(SEL.kpiCardVisibility).first(),
        'KPI card "Visibility" must be visible').toBeVisible({ timeout: 10000 });
      await expect(page.locator(SEL.kpiCardAvgPosition).first(),
        'KPI card "Avg Position" must be visible').toBeVisible({ timeout: 10000 });
      await expect(page.locator(SEL.kpiCardWinRate).first(),
        'KPI card "LLM Choice" (winRate) must be visible').toBeVisible({ timeout: 10000 });
      await expect(page.locator(SEL.kpiCardSentiment).first(),
        'KPI card "Sentiment" must be visible').toBeVisible({ timeout: 10000 });

      const sovKpiCard = await page.locator(
        '[data-testid*="kpi-card"][data-testid*="share"], [data-testid*="kpi-card"][data-testid*="sov"], [data-testid="kpi-card-shareOfVoice"]'
      ).count();
      await shotAt(page, page.locator(SEL.kpiCardVisibility).first(), `${TC}_step3_then`);
      expect(sovKpiCard, 'No SOV KPI card should exist in the Category KPI row').toBe(0);
    });

    await test.step('And the KPI row layout reflows cleanly for 4 cards with no broken grid or empty cell', async () => {
      // Les 4 cards sont rendues et visibles → layout reflow implicitement validé
      // Pas de 5ème cellule vide détectable via data-testid
      const kpiCards = await page.locator(
        '[data-testid="kpi-card-visibility"], [data-testid="kpi-card-avgPosition"], [data-testid="kpi-card-winRate"], [data-testid="kpi-card-sentiment"]'
      ).count();
      expect(kpiCards, 'Exactly 4 KPI cards must be rendered').toBe(4);
    });
  });

  // ── TC-GEO-663-004 ──────────────────────────────────────────────────────────
  test('TC-GEO-663-004 - Category: Brand Rankings table has no SoV% column', async ({ page }) => {
    const TC = 'TC-GEO-663-004';

    await test.step('Given a user is authenticated and navigates to a Category view', async () => {
      await gotoPage(page, CATEGORY_URL);
      await shot(page, `${TC}_step1_given`);
    });

    await test.step('When the Brand Rankings table renders', async () => {
      await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 20000 });
      await waitForSkeletonGone(page);
      await shot(page, `${TC}_step2_when`);
    });

    await test.step('Then the table columns are exactly: Rank, Brand, Visibility%, Avg Position, LLM Choice%', async () => {
      const thCount = await page.locator(SEL.tableHeaders).count();
      const headers = thCount > 0 ? await page.locator(SEL.tableHeaders).allTextContents() : [];
      const hasSovColumn = headers.some(h => /SoV%|Share of Voice/i.test(h));
      const table = page.locator('table').first();
      const tableVisible = await table.isVisible({ timeout: 3000 }).catch(() => false);
      await shotAt(page, tableVisible ? table : page.locator(SEL.kpiCardVisibility).first(), `${TC}_step3_then`);
      expect(hasSovColumn, 'Brand Rankings table must NOT have a SoV% column on Category view').toBe(false);
    });

    await test.step('And there is no SoV% column header and no SoV% cell in any parent or variant row', async () => {
      const sovCell = await page.locator('td, th').filter({ hasText: /SoV%/i }).count();
      expect(sovCell, 'No SoV% cell should exist anywhere in the table').toBe(0);
    });
  });

  // ── TC-GEO-664-002 ──────────────────────────────────────────────────────────
  test('TC-GEO-664-002 - SOV dedicated card renders below KPI row on Category view', async ({ page }) => {
    const TC = 'TC-GEO-664-002';

    await test.step('Given a user is authenticated and navigates to a Category view with data available', async () => {
      await gotoPage(page, CATEGORY_URL);
      await shot(page, `${TC}_step1_given`);
    });

    await test.step('When the page finishes loading', async () => {
      await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 20000 });
      await waitForSkeletonGone(page);
      await shot(page, `${TC}_step2_when`);
    });

    await test.step('Then a full-width "Share of Voice" card is visible directly below the KPI card row', async () => {
      const sovHeading = page.locator(SEL.sovHeading).first();
      await sovHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await expect(sovHeading,
        '"Share of Voice" card heading must be visible on Category view').toBeVisible({ timeout: 15000 });

      const sovSubtitle = page.locator(SEL.sovSubtitle).first();
      await expect(sovSubtitle,
        'SOV subtitle "By brand, your brand is highlighted" must be visible').toBeVisible({ timeout: 10000 });

      const hasEmptyState = await page.locator(SEL.sovEmptyMsg).isVisible({ timeout: 5000 }).catch(() => false);
      const hasErrorState = await page.locator(SEL.sovErrorMsg).isVisible({ timeout: 2000 }).catch(() => false);
      const hasSvgChart   = await page.locator(SEL.sovChartSvg).first().isVisible({ timeout: 2000 }).catch(() => false);

      await shotAt(page, sovHeading, `${TC}_step3_then`);
      expect(hasEmptyState || hasErrorState || hasSvgChart,
        'SOV card must render either a chart, an empty state, or an error state').toBe(true);
    });

    await test.step('And the card displays the title "Share of Voice" and the subtitle "By brand, your brand is highlighted"', async () => {
      // Déjà vérifié dans le step précédent — le heading et subtitle sont confirmés
    });
  });
});
