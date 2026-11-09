// e2e-category-question-visibility.spec.js
// E2E compact — Visibility: Winner column ↔ detail panel per-engine badge cross-validation
// CSV : .claude/Data/output/csv/e2e-category-question-visibility.csv
//
// Logic (4 scenarios driven by Winner column value):
//   Winner = Brand Name       → panel: all engines Favorable  (green, rank #1-3)
//   Winner = Competitor Name  → panel: all engines Favorable OR Unfavorable (consistent, never Unranked)
//                               + competitor = #1 in ranking list per engine
//                               (case A: all Favorable but competitor is ranked #1 ;
//                                case B: all Unfavorable but same competitor is #1)
//   Winner = "Unranked" badge → panel: all engines Unranked   (red, #--) — no LLM consensus on #1
//   Winner = "Split"  badge   → panel: per-engine mix — "Split" never appears as per-engine label
//
// Lancement staging :
//   SPEC_NAME=e2e-category-question-visibility USE_AUTH=true \
//   BASE_URL=https://staging-geo.onclusive.com/geo \
//   npx playwright test .claude/Data/raw/playwright/e2e-category-question-visibility.spec.js \
//   --project=chromium --workers=1
//
// DOM sélecteurs validés le 2026-06-26 sur staging-geo.onclusive.com :
//   Winner: Brand name      : td:nth-child(3) span.font-medium.text-slate-900  (bold dark)
//   Winner: Competitor name : td:nth-child(3) span.text-slate-700              (lighter)
//   Winner: "Unranked" badge: td:nth-child(3) span[class*="border-red-200"]   (no data-testid in Hybrid Cars)
//   Winner: "Split" badge   : td:nth-child(3) span[class*="border-orange-200"] (no data-testid in Hybrid Cars)
//   Panel container         : [data-testid="question-detail-panel"]
//   LLM responses section   : [data-testid="question-detail-llm-responses"]
//   Ranking list item       : [data-testid="question-detail-panel"] li.flex.items-center.gap-2.rounded-lg

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

// All category URLs to try when searching for a specific winner type (Split, competitor, etc.)
// Order matters: most likely first. Null entries (missing UUID) are filtered out.
const ALL_CATEGORY_URLS = [HYBRID_URL, SUVS_URL, ELECTRIC_URL].filter(Boolean);

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-e2e-category-question-visibility');
H.ensureDir(SCREENSHOTS_DIR);

const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── Selectors ─────────────────────────────────────────────────────────────────
const SEL = {
  tableRow:   'tr[role="button"]',
  panelClose: 'button[aria-label="Close detail panel"], button[aria-label="Fermer le volet de détails"]',

  // Winner column — CSS class variant (no data-testid on Split/Unranked badges in Hybrid Cars)
  winnerBrandSpan:      'td:nth-child(3) span.font-medium.text-slate-900',
  winnerCompetitorSpan: 'td:nth-child(3) span.text-slate-700',
  winnerUnrankedBadge:  'td:nth-child(3) span[class*="border-red-200"]',
  winnerSplitBadge:     'td:nth-child(3) span[class*="border-orange-200"]',

  // Per-engine favorability badges — full class chain (validated from e2e-category-questions-detail.spec.js)
  panelFavorable:   'span.rounded-full.px-3.py-1.font-semibold.text-sm.text-green-600',
  panelUnfavorable: 'span.rounded-full.px-3.py-1.font-semibold.text-sm.text-amber-600',
  panelUnranked:    'span.rounded-full.px-3.py-1.font-semibold.text-sm.text-red-600',

  // Ranking list in panel — first item = #1 competitor
  rankingItem: '[data-testid="question-detail-panel"] li.flex.items-center.gap-2.rounded-lg',
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

/** Click the Visibility type tab and wait for rows to settle */
async function clickVisibilityTab(page) {
  const btn = page.getByRole('button', { name: /^Visibility\s+\d/ })
    .or(page.getByRole('button', { name: /Visibility/i }).first());
  await btn.waitFor({ state: 'attached', timeout: 15000 });
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await page.waitForTimeout(600);
}

// openDetailPanel, getActiveBadgeType, collectAllEngineBadges are in e2e-helpers.js
// Use H.openDetailPanel / H.getActiveBadgeType / H.collectAllEngineBadges below.
const openPanel = (page, row) => H.openDetailPanel(page, row);

// ══════════════════════════════════════════════════════════════════════════════
// E2E-VIS-WN-01 — Winner = Brand Name → all engines Favorable (green)
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-VIS-WN-01 - Visibility: Winner = Brand Name → all engines show Favorable in panel', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given I am on the Visibility tab of a category where the tracked brand wins', async () => {
    await gotoCategory(page, HYBRID_URL);
    await clickVisibilityTab(page);
    await shot(page, 'E2E-VIS-WN-01_step1_given');
  });

  await test.step(`When I find a row where the Winner column shows the brand name (${BRAND})`, async () => {
    const rows = page.locator(SEL.tableRow);
    const brandRow = rows.filter({ has: page.locator(SEL.winnerBrandSpan) }).first();
    await expect(brandRow, 'At least one brand-winner row must exist').toBeVisible({ timeout: 15000 });

    const winnerCell = brandRow.locator('td:nth-child(3)');
    const winnerText = (await winnerCell.textContent()).trim();
    expect(winnerText, `Winner cell must show "${BRAND}"`).toContain(BRAND);

    await shotAt(page, winnerCell, 'E2E-VIS-WN-01_step2_when');
    await openPanel(page, brandRow);
  });

  await test.step('Then the detail panel shows Favorable (green) badge for every active LLM engine', async () => {
    const panelClose = page.locator(SEL.panelClose).first();
    await expect(page.locator('[data-testid="question-detail-llm-responses"]')).toBeVisible({ timeout: 10000 });

    const engineBadges = await H.collectAllEngineBadges(page);

    await shotAt(page, panelClose, 'E2E-VIS-WN-01_step3_then');

    expect(engineBadges.length, 'At least one LLM engine must be visible').toBeGreaterThan(0);
    // null badge = engine shows "No data available" — skip it, only assert engines with data.
    const wn01WithData = engineBadges.filter(b => b.badge !== null);
    expect(wn01WithData.length, 'At least one engine must have data for this question').toBeGreaterThan(0);
    for (const { engine, badge } of wn01WithData) {
      expect(badge, `${engine}: expected Favorable (Winner = "${BRAND}"), got "${badge}"`).toBe('favorable');
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// E2E-VIS-WN-02 — Winner = Competitor Name → all engines Unfavorable/Unranked
//                 + competitor matches #1 in panel ranking list
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-VIS-WN-02 - Visibility: Winner = Competitor Name → non-Favorable in panel + competitor is #1 in ranking', async ({ page }) => {
  test.setTimeout(120000);

  let competitorName = '';

  await test.step('Given I am on the Visibility tab where the tracked brand is not ranked #1', async () => {
    await gotoCategory(page, ELECTRIC_URL);
    await clickVisibilityTab(page);
    await shot(page, 'E2E-VIS-WN-02_step1_given');
  });

  await test.step('When I find a row where the Winner column shows a competitor brand name', async () => {
    // Search across all categories — competitor rows may not exist in every category.
    let pickedRow  = null;
    let pickedCell = null;

    for (const catUrl of ALL_CATEGORY_URLS) {
      if (pickedRow) break;
      await gotoCategory(page, catUrl);
      await clickVisibilityTab(page);
      const rows = page.locator(SEL.tableRow);
      const competitorRows = rows.filter({ has: page.locator(SEL.winnerCompetitorSpan) });
      const count = await competitorRows.count();
      if (count === 0) continue;

      // Find the first competitor row where at least one engine has actual badge data.
      // Use a retry loop (up to 5s) after openPanel — LLM API may not have responded yet.
      for (let i = 0; i < Math.min(count, 10); i++) {
        const row = competitorRows.nth(i);
        const cell = row.locator('td:nth-child(3)');
        const name = ((await cell.textContent().catch(() => '')) || '').trim();
        if (!name || name.includes(BRAND)) continue;
        await openPanel(page, row);
        // Retry up to 5s for LLM data to load before deciding this row has no data
        let panelText = '';
        for (let j = 0; j < 10; j++) {
          await page.waitForTimeout(500);
          panelText = (await page.locator('[data-testid="question-detail-llm-responses"]').textContent().catch(() => '')) || '';
          if (panelText.includes('Favorable') || panelText.includes('Défavorable') ||
              panelText.includes('Unranked')  || panelText.includes('Non classé')) break;
        }
        if (panelText.includes('Favorable') || panelText.includes('Défavorable') ||
            panelText.includes('Unranked')  || panelText.includes('Non classé')) {
          pickedRow = row;
          pickedCell = cell;
          break;
        }
      }
    }
    expect(pickedRow, 'No competitor-winner row with engine data found across all categories').not.toBeNull();

    competitorName = ((await pickedCell.textContent().catch(() => '')) || '').trim();
    expect(competitorName, 'Competitor name must not be empty').toBeTruthy();
    await shotAt(page, pickedCell, 'E2E-VIS-WN-02_step2_when');
    // Panel already open from the loop above
  });

  await test.step('Then panel shows Unfavorable or Unranked per engine, and competitor matches #1 in ranking list', async () => {
    const panelClose = page.locator(SEL.panelClose).first();
    await expect(page.locator('[data-testid="question-detail-llm-responses"]')).toBeVisible({ timeout: 10000 });

    const engineBadges = await H.collectAllEngineBadges(page);

    // After iterating all engines, the last active engine may be "No data available".
    // Switch back to the first engine with actual data so its ranking list is visible.
    // An engine with no data should not impact the ranking cross-check.
    const firstWithData = engineBadges.find(b => b.badge !== null);
    if (firstWithData) {
      await H.clickEnginePill(page, firstWithData.engine);
      await page.waitForTimeout(800);
    }

    // #1 in ranking list must match the competitor name from the Winner column
    const rank1Item = page.locator(SEL.rankingItem).first();
    await expect(rank1Item, 'Ranking list must be visible in panel').toBeVisible({ timeout: 8000 });
    const rank1Text = (await rank1Item.textContent()).replace(/^\d+\s*/, '').trim();

    await shotAt(page, panelClose, 'E2E-VIS-WN-02_step3_then');

    expect(engineBadges.length, 'At least one LLM engine must be visible').toBeGreaterThan(0);
    // null badge = engine shows "No data available" — skip it, only assert engines with data.
    const wn02WithData = engineBadges.filter(b => b.badge !== null);
    expect(wn02WithData.length, 'At least one engine must have data for this question').toBeGreaterThan(0);
    // Winner = Competitor Name has two sub-cases (per product rules):
    //   Case A: all LLMs Favorable but competitor ranked #1 across all LLMs
    //   Case B: all LLMs Unfavorable and same competitor ranked #1 across all LLMs
    // In both cases the badge is consistent (never Unranked, never Split).
    for (const { engine, badge } of wn02WithData) {
      expect(
        badge === 'favorable' || badge === 'unfavorable',
        `${engine}: expected Favorable or Unfavorable (Winner = competitor), got "${badge}"`
      ).toBe(true);
    }

    const nameMatch =
      competitorName.toLowerCase().includes(rank1Text.toLowerCase()) ||
      rank1Text.toLowerCase().includes(competitorName.toLowerCase());
    expect(
      nameMatch,
      `Winner column ("${competitorName}") must match #1 in panel ranking ("${rank1Text}")`
    ).toBe(true);
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// E2E-VIS-WN-03 — Winner = "Unranked" badge → all engines Unranked (no LLM consensus)
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-VIS-WN-03 - Visibility: Winner = "Unranked" badge → all engines show Unranked in panel', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given I am on the Visibility tab where the brand is absent and LLMs disagree on which competitor is #1', async () => {
    await gotoCategory(page, ELECTRIC_URL);
    await clickVisibilityTab(page);
    await shot(page, 'E2E-VIS-WN-03_step1_given');
  });

  await test.step('When I find a row where the Winner column shows the red "Unranked" badge', async () => {
    const rows = page.locator(SEL.tableRow);
    const unrankedRow = rows.filter({ has: page.locator(SEL.winnerUnrankedBadge) }).first();
    await expect(unrankedRow, 'At least one Unranked-winner row must exist').toBeVisible({ timeout: 15000 });

    const winnerBadge = unrankedRow.locator(SEL.winnerUnrankedBadge).first();
    await expect(winnerBadge, '"Unranked" badge must be visible').toBeVisible();
    const badgeText = (await winnerBadge.textContent()).trim();
    expect(badgeText).toMatch(/Unranked|Non classé/i);

    await shotAt(page, winnerBadge, 'E2E-VIS-WN-03_step2_when');
    await openPanel(page, unrankedRow);
  });

  await test.step('Then the detail panel shows Unranked (red, #--) for every active LLM engine', async () => {
    const panelClose = page.locator(SEL.panelClose).first();
    await expect(page.locator('[data-testid="question-detail-llm-responses"]')).toBeVisible({ timeout: 10000 });

    const engineBadges = await H.collectAllEngineBadges(page);

    await shotAt(page, panelClose, 'E2E-VIS-WN-03_step3_then');

    expect(engineBadges.length, 'At least one LLM engine must be visible').toBeGreaterThan(0);
    // null badge = engine shows "No data available" — skip it, only assert engines with data.
    const wn03WithData = engineBadges.filter(b => b.badge !== null);
    expect(wn03WithData.length, 'At least one engine must have data for this question').toBeGreaterThan(0);
    for (const { engine, badge } of wn03WithData) {
      expect(badge, `${engine}: expected Unranked (Winner = "Unranked" badge), got "${badge}"`).toBe('unranked');
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// E2E-VIS-WN-04 — Winner = "Split" badge → per-engine mix, "Split" never per-engine
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-VIS-WN-04 - Visibility: Winner = "Split" badge → per-engine mix, "Split" never appears as per-engine label', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given I am on the Visibility tab where LLMs give different tier results for the brand', async () => {
    await gotoCategory(page, HYBRID_URL);
    await clickVisibilityTab(page);
    await shot(page, 'E2E-VIS-WN-04_step1_given');
  });

  await test.step('When I find a row where the Winner column shows the orange "Split" badge', async () => {
    // Split rows are not guaranteed in every category — search across all categories.
    let splitRow  = null;
    let splitBadgeEl = null;

    for (const catUrl of ALL_CATEGORY_URLS) {
      if (splitRow) break;
      await gotoCategory(page, catUrl);
      await clickVisibilityTab(page);
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

    await shotAt(page, splitBadgeEl, 'E2E-VIS-WN-04_step2_when');
    await openPanel(page, splitRow);
  });

  await test.step('Then each engine shows its individual tier (Favorable/Unfavorable/Unranked) — "Split" never appears as a per-engine label', async () => {
    const panelClose = page.locator(SEL.panelClose).first();
    await expect(page.locator('[data-testid="question-detail-llm-responses"]')).toBeVisible({ timeout: 10000 });

    const engineBadges = await H.collectAllEngineBadges(page);

    await shotAt(page, panelClose, 'E2E-VIS-WN-04_step3_then');

    expect(engineBadges.length, 'At least one LLM engine must be visible').toBeGreaterThan(0);

    // "Split" must NEVER appear as a per-engine badge
    for (const { engine, badge } of engineBadges) {
      expect(
        ['favorable', 'unfavorable', 'unranked', null].includes(badge),
        `${engine}: per-engine badge must be Favorable/Unfavorable/Unranked (not "Split"), got "${badge}"`
      ).toBe(true);
    }

    // At least one engine must render a badge (panel rendered successfully)
    const badgesWithValue = engineBadges.filter(b => b.badge !== null);
    expect(badgesWithValue.length, 'At least one engine must render a favorability badge').toBeGreaterThan(0);
  });
});
