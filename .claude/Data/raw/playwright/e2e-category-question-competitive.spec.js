// e2e-category-question-competitive.spec.js
// E2E compact — Competitive: Winner column ↔ detail panel per-engine Won/Lost cross-validation
// CSV : .claude/Data/output/csv/e2e-category-question-competitive.csv
//
// Logic (4 scenarios driven by Winner column value):
//   Winner = Brand Name       → panel: all engines Won  (green)
//   Winner = Competitor Name  → panel: all engines Lost (red)
//   Winner = "Lost" plain     → panel: all engines Lost (red, no single consensus competitor)
//   Winner = "Split" badge    → panel: per-engine mix Won/Lost — "Split" never appears as per-engine label
//
// Lancement staging :
//   SPEC_NAME=e2e-category-question-competitive USE_AUTH=true \
//   BASE_URL=https://staging-geo.onclusive.com/geo \
//   npx playwright test .claude/Data/raw/playwright/e2e-category-question-competitive.spec.js \
//   --project=chromium --workers=1
//
// DOM sélecteurs validés le 2026-07-01 sur staging-geo.onclusive.com :
//   Winner: Brand name       : td:nth-child(3) span.font-medium.text-slate-900  (bold dark)
//   Winner: Competitor name  : td:nth-child(3) span.text-slate-700:not(.font-medium) (lighter, no bold)
//   Winner: "Lost" plain     : td:nth-child(3) span.text-slate-400.text-sm       (faded grey, no badge border)
//   Winner: "Split" badge    : td:nth-child(3) span[class*="border-orange-200"]  (no data-testid)
//   Panel container          : [data-testid="question-detail-panel"]
//   LLM responses section    : [data-testid="question-detail-llm-responses"]
//   Won badge                : .rounded-lg.border.p-3.bg-green-50.border-green-200 > p.font-bold → "Won"
//   Lost badge               : .rounded-lg.border.p-3.bg-red-50.border-red-200   > p.font-bold → "Lost"
//
// Data map (validated 2026-07-01):
//   Brand winner  : Hybrid Cars — all 40 questions show Toyota as winner
//   Competitor win: Electric Cars — 8 Tesla-winner rows (span.text-slate-700)
//   Lost plain    : Electric Cars — 31 rows (span.text-slate-400.text-sm)
//   Split badge   : SUVs — 10 rows (span[class*="border-orange-200"])

'use strict';
const { test, expect } = require('@playwright/test');
const path = require('path');

const COMMON      = require('../test-data/common.json');
const { loadJDD } = require('../test-data/jdd/loadJDD');
// Reuse same JDD as e2e-category-questions-detail (same dashboard + categories)
const JDD = loadJDD('category/e2e-category-questions-detail');

const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H = require('./e2e-helpers');

// ── Constants ─────────────────────────────────────────────────────────────────
const BASE_URL        = process.env.BASE_URL           || COMMON.base_url;
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID     || JDD.dashboard.uuid;
const CAT_HYBRID_UUID = process.env.CATEGORY_UUID      || JDD.category_hybrid.uuid;
const CAT_ELEC_UUID   = process.env.CATEGORY_ELEC_UUID || JDD.category_electric.uuid;
const CAT_SUVS_UUID   = process.env.CATEGORY_SUVS_UUID || JDD.category_suvs?.uuid  || '';
const BRAND           = JDD.target_brand?.name         || 'Toyota';

const HYBRID_URL   = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CAT_HYBRID_UUID}`;
const ELECTRIC_URL = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CAT_ELEC_UUID}`;
const SUVS_URL     = CAT_SUVS_UUID ? `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CAT_SUVS_UUID}` : null;

// Search order per winner type — most likely category first
const BRAND_URLS    = [HYBRID_URL, SUVS_URL, ELECTRIC_URL].filter(Boolean);
const COMP_URLS     = [ELECTRIC_URL, SUVS_URL, HYBRID_URL].filter(Boolean);
const LOST_URLS     = [ELECTRIC_URL, SUVS_URL, HYBRID_URL].filter(Boolean);
const SPLIT_URLS    = [SUVS_URL, ELECTRIC_URL, HYBRID_URL].filter(Boolean);

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-e2e-category-question-competitive');
H.ensureDir(SCREENSHOTS_DIR);

const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── Selectors ─────────────────────────────────────────────────────────────────
const SEL = {
  tableRow:   '[data-testid^="dashboard-questions-row"]',
  panelClose: 'button[aria-label="Close detail panel"], button[aria-label="Fermer le volet de détails"]',

  // Winner column — CSS class variants (no data-testid on competitive winner cells)
  winnerBrandSpan:      'td:nth-child(3) span.font-medium.text-slate-900',
  winnerCompetitorSpan: 'td:nth-child(3) span.text-slate-700:not(.font-medium)',
  winnerLostPlainSpan:  'td:nth-child(3) span.text-slate-400.text-sm',
  winnerSplitBadge:     'td:nth-child(3) span[class*="border-orange-200"]',

  // Detail panel
  detailPanel:  '[data-testid="question-detail-panel"]',
  llmResponses: '[data-testid="question-detail-llm-responses"]',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Navigate to a category URL and wait for the questions table */
async function gotoCategory(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 45000 });
  await page.waitForLoadState('domcontentloaded');
  await H.dismissCookieBanner(page);
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(500);
  const firstRow = page.locator(SEL.tableRow).first();
  await firstRow.waitFor({ state: 'attached', timeout: 30000 });
  await firstRow.scrollIntoViewIfNeeded();
  await expect(firstRow).toBeVisible({ timeout: 15000 });
}

/** Click the Competitive type tab and wait for rows to settle */
async function clickCompetitiveTab(page) {
  // Scope to the filter bar to avoid matching accordion buttons in the "All" view (e.g. "market competitiveness N" on prod)
  const filterBar = page.locator('[data-testid="dashboard-questions-filter-type"]');
  const btn = filterBar.getByRole('button', { name: /Competitive|Concurrentiel/i });
  await btn.waitFor({ state: 'attached', timeout: 15000 });
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await page.waitForTimeout(600);
}

// openDetailPanel, getActiveBadgeType, collectAllEngineBadges are in e2e-helpers.js
const openPanel = (page, row) => H.openDetailPanel(page, row);

// ══════════════════════════════════════════════════════════════════════════════
// E2E-COMP-WN-01 — Winner = Brand Name → all engines Won (green)
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-COMP-WN-01 - Competitive: Winner = Brand Name → all engines show Won in panel', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given I am on the Competitive tab of a category where the tracked brand wins', async () => {
    await gotoCategory(page, HYBRID_URL);
    await clickCompetitiveTab(page);
    await shot(page, 'E2E-COMP-WN-01_step1_given');
  });

  await test.step(`When I find a row where the Winner column shows the brand name (${BRAND})`, async () => {
    let pickedRow  = null;
    let pickedCell = null;

    for (const catUrl of BRAND_URLS) {
      if (pickedRow) break;
      await gotoCategory(page, catUrl);
      await clickCompetitiveTab(page);
      const rows = page.locator(SEL.tableRow);
      const brandRows = rows.filter({ has: page.locator(SEL.winnerBrandSpan) });
      const count = await brandRows.count();
      if (count === 0) continue;

      for (let i = 0; i < Math.min(count, 5); i++) {
        const row  = brandRows.nth(i);
        const cell = row.locator('td:nth-child(3)');
        await openPanel(page, row);
        let panelText = '';
        for (let j = 0; j < 10; j++) {
          await page.waitForTimeout(500);
          panelText = (await page.locator(SEL.llmResponses).textContent().catch(() => '')) || '';
          if (panelText.includes('Won') || panelText.includes('Gagné') ||
              panelText.includes('Lost') || panelText.includes('Perdu')) break;
        }
        if (panelText.includes('Won') || panelText.includes('Gagné')) {
          pickedRow  = row;
          pickedCell = cell;
          break;
        }
      }
    }

    expect(pickedRow, 'No brand-winner row with Won data found across categories').not.toBeNull();
    const winnerText = ((await pickedCell.textContent().catch(() => '')) || '').trim();
    expect(winnerText, `Winner cell must show "${BRAND}"`).toContain(BRAND);
    await shotAt(page, pickedCell, 'E2E-COMP-WN-01_step2_when');
  });

  await test.step('Then the detail panel shows Won (green) badge for every active LLM engine', async () => {
    await expect(page.locator(SEL.llmResponses)).toBeVisible({ timeout: 10000 });
    const engineBadges = await H.collectAllEngineBadges(page, SEL.llmResponses);
    await shotAt(page, page.locator(SEL.detailPanel), 'E2E-COMP-WN-01_step3_then');

    expect(engineBadges.length, 'At least one LLM engine must be visible').toBeGreaterThan(0);
    const withData = engineBadges.filter(b => b.badge !== null);
    expect(withData.length, 'At least one engine must have data for this question').toBeGreaterThan(0);
    for (const { engine, badge } of withData) {
      expect(badge, `${engine}: expected Won (Winner = "${BRAND}"), got "${badge}"`).toBe('won');
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// E2E-COMP-WN-02 — Winner = Competitor Name → all engines Lost (red)
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-COMP-WN-02 - Competitive: Winner = Competitor Name → all engines show Lost in panel', async ({ page }) => {
  test.setTimeout(120000);

  let competitorName = '';

  await test.step('Given I am on the Competitive tab where a competitor brand wins', async () => {
    await gotoCategory(page, ELECTRIC_URL);
    await clickCompetitiveTab(page);
    await shot(page, 'E2E-COMP-WN-02_step1_given');
  });

  await test.step('When I find a row where the Winner column shows a competitor brand name', async () => {
    let pickedRow  = null;
    let pickedCell = null;

    for (const catUrl of COMP_URLS) {
      if (pickedRow) break;
      await gotoCategory(page, catUrl);
      await clickCompetitiveTab(page);
      const rows = page.locator(SEL.tableRow);
      const compRows = rows.filter({ has: page.locator(SEL.winnerCompetitorSpan) });
      const count = await compRows.count();
      if (count === 0) continue;

      for (let i = 0; i < Math.min(count, 10); i++) {
        const row  = compRows.nth(i);
        const cell = row.locator('td:nth-child(3)');
        const name = ((await cell.textContent().catch(() => '')) || '').trim();
        if (!name || name.toLowerCase().includes(BRAND.toLowerCase())) continue;
        await openPanel(page, row);
        let panelText = '';
        for (let j = 0; j < 10; j++) {
          await page.waitForTimeout(500);
          panelText = (await page.locator(SEL.llmResponses).textContent().catch(() => '')) || '';
          if (panelText.includes('Won') || panelText.includes('Gagné') ||
              panelText.includes('Lost') || panelText.includes('Perdu')) break;
        }
        if (panelText.includes('Lost') || panelText.includes('Perdu')) {
          pickedRow       = row;
          pickedCell      = cell;
          competitorName  = name;
          break;
        }
      }
    }

    expect(pickedRow, 'No competitor-winner row with Lost data found across categories').not.toBeNull();
    expect(competitorName, 'Competitor name must not be empty').toBeTruthy();
    await shotAt(page, pickedCell, 'E2E-COMP-WN-02_step2_when');
  });

  await test.step('Then the detail panel shows Lost (red) badge for every active LLM engine', async () => {
    await expect(page.locator(SEL.llmResponses)).toBeVisible({ timeout: 10000 });
    const engineBadges = await H.collectAllEngineBadges(page, SEL.llmResponses);
    await shotAt(page, page.locator(SEL.detailPanel), 'E2E-COMP-WN-02_step3_then');

    expect(engineBadges.length, 'At least one LLM engine must be visible').toBeGreaterThan(0);
    const withData = engineBadges.filter(b => b.badge !== null);
    expect(withData.length, 'At least one engine must have data for this question').toBeGreaterThan(0);
    for (const { engine, badge } of withData) {
      expect(badge, `${engine}: expected Lost (Winner = competitor "${competitorName}"), got "${badge}"`).toBe('lost');
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// E2E-COMP-WN-03 — Winner = "Lost" plain text → all engines Lost (red)
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-COMP-WN-03 - Competitive: Winner = "Lost" plain text → all engines show Lost in panel', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given I am on the Competitive tab where the Winner column shows plain "Lost" text (no badge border)', async () => {
    await gotoCategory(page, ELECTRIC_URL);
    await clickCompetitiveTab(page);
    await shot(page, 'E2E-COMP-WN-03_step1_given');
  });

  await test.step('When I find a row where the Winner column shows plain "Lost" text (span.text-slate-400.text-sm, no badge border)', async () => {
    let pickedRow  = null;
    let pickedCell = null;

    for (const catUrl of LOST_URLS) {
      if (pickedRow) break;
      await gotoCategory(page, catUrl);
      await clickCompetitiveTab(page);
      const rows = page.locator(SEL.tableRow);
      const lostRows = rows.filter({ has: page.locator(SEL.winnerLostPlainSpan) });
      const count = await lostRows.count();
      if (count === 0) continue;

      for (let i = 0; i < Math.min(count, 5); i++) {
        const row  = lostRows.nth(i);
        const cell = row.locator('td:nth-child(3)');
        await openPanel(page, row);
        let panelText = '';
        for (let j = 0; j < 10; j++) {
          await page.waitForTimeout(500);
          panelText = (await page.locator(SEL.llmResponses).textContent().catch(() => '')) || '';
          if (panelText.includes('Won') || panelText.includes('Gagné') ||
              panelText.includes('Lost') || panelText.includes('Perdu')) break;
        }
        if (panelText.includes('Lost') || panelText.includes('Perdu')) {
          pickedRow  = row;
          pickedCell = cell;
          break;
        }
      }
    }

    expect(pickedRow, 'No "Lost" plain-text winner row with data found across categories').not.toBeNull();
    const winnerText = ((await pickedCell.textContent().catch(() => '')) || '').trim();
    expect(winnerText).toMatch(/^Lost$|^Perdu$/i);
    await shotAt(page, pickedCell, 'E2E-COMP-WN-03_step2_when');
  });

  await test.step('Then the detail panel shows Lost (red) badge for every active LLM engine', async () => {
    await expect(page.locator(SEL.llmResponses)).toBeVisible({ timeout: 10000 });
    const engineBadges = await H.collectAllEngineBadges(page, SEL.llmResponses);
    await shotAt(page, page.locator(SEL.detailPanel), 'E2E-COMP-WN-03_step3_then');

    expect(engineBadges.length, 'At least one LLM engine must be visible').toBeGreaterThan(0);
    const withData = engineBadges.filter(b => b.badge !== null);
    expect(withData.length, 'At least one engine must have data for this question').toBeGreaterThan(0);
    for (const { engine, badge } of withData) {
      expect(badge, `${engine}: expected Lost (Winner = "Lost" plain text), got "${badge}"`).toBe('lost');
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// E2E-COMP-WN-04 — Winner = "Split" badge → per-engine mix Won/Lost, "Split" never per-engine
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-COMP-WN-04 - Competitive: Winner = "Split" badge → per-engine mix Won/Lost, Split never per-engine label', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given I am on the Competitive tab where LLMs give different competitive results for the brand', async () => {
    await gotoCategory(page, SUVS_URL || HYBRID_URL);
    await clickCompetitiveTab(page);
    await shot(page, 'E2E-COMP-WN-04_step1_given');
  });

  await test.step('When I find a row where the Winner column shows the orange "Split" badge', async () => {
    let splitRow     = null;
    let splitBadgeEl = null;

    for (const catUrl of SPLIT_URLS) {
      if (splitRow) break;
      await gotoCategory(page, catUrl);
      await clickCompetitiveTab(page);
      const candidate = page.locator(SEL.tableRow)
        .filter({ has: page.locator(SEL.winnerSplitBadge) }).first();
      const found = await candidate.isVisible({ timeout: 5000 }).catch(() => false);
      if (found) {
        splitRow     = candidate;
        splitBadgeEl = candidate.locator(SEL.winnerSplitBadge).first();
      }
    }

    expect(splitRow, 'At least one Split-winner row must exist across all categories').not.toBeNull();
    await expect(splitBadgeEl, '"Split" badge must be visible').toBeVisible();
    const badgeText = (await splitBadgeEl.textContent()).trim();
    expect(badgeText).toMatch(/Split|Partagé/i);

    await shotAt(page, splitBadgeEl, 'E2E-COMP-WN-04_step2_when');
    await openPanel(page, splitRow);
  });

  await test.step('Then each engine shows its individual badge (Won/Lost) — "Split" never appears as a per-engine label', async () => {
    await expect(page.locator(SEL.llmResponses)).toBeVisible({ timeout: 10000 });
    const engineBadges = await H.collectAllEngineBadges(page, SEL.llmResponses);
    await shotAt(page, page.locator(SEL.detailPanel), 'E2E-COMP-WN-04_step3_then');

    expect(engineBadges.length, 'At least one LLM engine must be visible').toBeGreaterThan(0);

    // "Split" must NEVER appear as a per-engine badge
    for (const { engine, badge } of engineBadges) {
      expect(
        ['won', 'lost', null].includes(badge),
        `${engine}: per-engine badge must be Won or Lost (not "Split"), got "${badge}"`
      ).toBe(true);
    }

    // At least one Won AND one Lost → confirms the "Split" aggregate label is accurate
    const withData = engineBadges.filter(b => b.badge !== null);
    expect(withData.length, 'At least one engine must render a badge').toBeGreaterThan(0);
    const wonCount  = withData.filter(b => b.badge === 'won').length;
    const lostCount = withData.filter(b => b.badge === 'lost').length;
    expect(wonCount,  'Split row must have at least one Won engine').toBeGreaterThan(0);
    expect(lostCount, 'Split row must have at least one Lost engine').toBeGreaterThan(0);
  });
});
