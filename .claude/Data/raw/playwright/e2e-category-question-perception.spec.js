// e2e-category-question-perception.spec.js
// E2E compact — Perception: Themes column ↔ detail panel themes cross-validation
// CSV : .claude/Data/output/csv/e2e-category-question-perception.csv
//
// Logic (2 scenarios driven by Themes column content in Perception tab):
//   Themes column = "Aucun thème" / empty  → panel THEMES section:
//                                             "Aucun thème détecté dans les résultats des LLM" (vide)
//   Themes column = theme badges            → panel THEMES section:
//                                             Liste des thèmes (badge spans)
//
// Lancement staging :
//   SPEC_NAME=e2e-category-question-perception USE_AUTH=true \
//   BASE_URL=https://staging-geo.onclusive.com/geo \
//   npx playwright test .claude/Data/raw/playwright/e2e-category-question-perception.spec.js \
//   --project=chromium --workers=1
//
// DOM sélecteurs (à valider au premier run) :
//   Table rows        : [data-testid^="dashboard-questions-row"]
//   Themes cell       : td:nth-child(3)  (3rd col — same position for all question types)
//   Detail panel      : [data-testid="question-detail-panel"]
//   LLM responses     : [data-testid="question-detail-llm-responses"]
//   THEMES heading    : :text("THEMES") | :text("Thèmes")
//   No-themes message : :text("Aucun thème") | :text("No themes")

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

const HYBRID_URL   = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CAT_HYBRID_UUID}`;
const ELECTRIC_URL = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CAT_ELEC_UUID}`;
const SUVS_URL     = CAT_SUVS_UUID ? `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CAT_SUVS_UUID}` : null;

// Search order — most likely to have Perception rows first
const ALL_CATEGORY_URLS = [HYBRID_URL, SUVS_URL, ELECTRIC_URL].filter(Boolean);

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-e2e-category-question-perception');
H.ensureDir(SCREENSHOTS_DIR);

const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── Selectors ─────────────────────────────────────────────────────────────────
const SEL = {
  tableRow:     '[data-testid^="dashboard-questions-row"]',
  panelClose:   'button[aria-label="Close detail panel"], button[aria-label="Fermer le volet de détails"]',
  detailPanel:  '[data-testid="question-detail-panel"]',
  llmResponses: '[data-testid="question-detail-llm-responses"]',

  // Themes column in the questions table (3rd column — same position for all question types)
  themesCell: 'td:nth-child(3)',

  // THEMES section heading in the detail panel
  themesSection: ':text("THEMES"), :text("Thèmes"), p:has-text("Themes")',

  // Empty-state message in the panel when no themes are detected
  // Validated 2026-07-03 on staging: the actual text rendered is "No theme extracted"
  noThemesMsg: ':text("No theme extracted"), :text("Aucun thème"), :text("No themes")',

  // SENTIMENT section heading in the detail panel
  sentimentSection: ':text("SENTIMENT")',

  // RESPONSE section heading in the detail panel
  responseSection: ':text("RESPONSE"), :text("RÉPONSE")',

  // Sentiment cards in detail panel
  positiveCard: 'div.bg-emerald-50',
  sentimentCard: 'div.bg-emerald-50, div[class*="bg-amber-50"], div[class*="bg-red-50"]',

  // Rank badges — must NOT appear in Perception panel
  favorableBadge:   'span.rounded-full.px-3.py-1.font-semibold.text-sm.text-green-600',
  unrankedBadge:    'span.rounded-full.px-3.py-1.font-semibold.text-sm.text-red-600',

  // LLM engine buttons — use data-testid (engine pills have no aria-label in GEO)
  llmBtn: '[data-testid="dashboard-question-engine-pill-openai"], [data-testid="dashboard-question-engine-pill-gemini"], [data-testid="dashboard-question-engine-pill-grok"], [data-testid="dashboard-question-engine-pill-claude"], [data-testid="dashboard-question-engine-pill-perplexity"]',
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

/** Click the Perception type tab and wait for rows to settle */
async function clickPerceptionTab(page) {
  const btn = page.getByRole('button', { name: /^Perception\s+\d/ })
    .or(page.getByRole('button', { name: /Perception/i }).first());
  await btn.waitFor({ state: 'attached', timeout: 15000 });
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await page.waitForTimeout(600);
}

/**
 * Returns true if the Themes cell of a Perception row contains theme content
 * (at least one span child, or non-empty/non-dash text that is not "Aucun thème").
 */
async function rowHasThemes(row) {
  const cell    = row.locator(SEL.themesCell);
  const text    = ((await cell.textContent().catch(() => '')) || '').trim();
  if (!text || text === '—') return false;
  if (/^Aucun/i.test(text))  return false;
  const spanCount = await cell.locator('span').count();
  return spanCount > 0 || text.length > 3;
}

const openPanel = (page, row) => H.openDetailPanel(page, row);

// ══════════════════════════════════════════════════════════════════════════════
// E2E-PERC-TH-01 — Themes = "Aucun thème" → panel THEMES section shows empty state
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-PERC-TH-01 - Perception: Themes = Aucun thème → panel shows empty themes section', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given I am on the Perception tab where no themes are detected in LLM results', async () => {
    await gotoCategory(page, HYBRID_URL);
    await clickPerceptionTab(page);
    await shot(page, 'E2E-PERC-TH-01_step1_given');
  });

  await test.step('When I find a row where the Themes column shows "Aucun thème" (no themes detected in any LLM)', async () => {
    let pickedRow  = null;
    let pickedCell = null;

    for (const catUrl of ALL_CATEGORY_URLS) {
      if (pickedRow) break;
      await gotoCategory(page, catUrl);
      await clickPerceptionTab(page);

      const rows  = page.locator(SEL.tableRow);
      const count = await rows.count();
      if (count === 0) continue;

      for (let i = 0; i < Math.min(count, 30); i++) {
        const row  = rows.nth(i);
        const cell = row.locator(SEL.themesCell);
        const text = ((await cell.textContent().catch(() => '')) || '').trim();

        // "No themes" if: empty text, "—", starts with "Aucun", or cell has no span children
        const spanCount  = await cell.locator('span').count();
        const isNoThemes = !text || text === '—' || /^Aucun/i.test(text) || spanCount === 0;

        if (isNoThemes) {
          pickedRow  = row;
          pickedCell = cell;
          break;
        }
      }
    }

    // Dynamic skip — if no blank-themes rows exist in current dataset, skip instead of fail.
    // Next run: if the data appears, the test will execute automatically.
    if (!pickedRow) {
      test.skip(true, 'No Perception rows with blank Themes found in current dataset — skipping. Will auto-run when data is available.');
      return;
    }
    await shotAt(page, pickedCell, 'E2E-PERC-TH-01_step2_when');
    await openPanel(page, pickedRow);
  });

  await test.step('Then the detail panel THEMES section shows "Aucun thème détecté dans les résultats des LLM" (empty)', async () => {
    await expect(page.locator(SEL.detailPanel),  'Detail panel must be visible').toBeVisible({ timeout: 10000 });
    await expect(page.locator(SEL.llmResponses), 'LLM responses section must be visible').toBeVisible({ timeout: 10000 });

    // THEMES section heading must be present in the panel
    const themesHeading = page.locator(SEL.themesSection).first();
    await expect(themesHeading, 'THEMES section heading must be visible').toBeVisible({ timeout: 10000 });

    // Empty-state message must appear when no themes are detected
    const noThemesMsg = page.locator(SEL.noThemesMsg).first();
    await shotAt(page, themesHeading, 'E2E-PERC-TH-01_step3_then');
    await expect(
      noThemesMsg,
      '"Aucun thème" empty-state message must be visible in the panel THEMES section when no themes exist'
    ).toBeVisible({ timeout: 8000 });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// E2E-PERC-SENT-01 — Perception panel: SENTIMENT + RESPONSE sections visible, no rank badges
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-PERC-SENT-01 - Perception: panel shows SENTIMENT + RESPONSE sections, no rank badges', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given I am on the Perception tab and I open a question in the detail panel', async () => {
    await gotoCategory(page, HYBRID_URL);
    await clickPerceptionTab(page);
    await shot(page, 'E2E-PERC-SENT-01_step1_given');
  });

  await test.step('When the detail panel opens for a Perception question', async () => {
    const rows  = page.locator(SEL.tableRow);
    const count = await rows.count();
    expect(count, 'At least one Perception row must exist').toBeGreaterThan(0);

    const firstRow = rows.first();
    await openPanel(page, firstRow);
    await expect(page.locator(SEL.detailPanel), 'Detail panel must be visible').toBeVisible({ timeout: 10000 });
    await shotAt(page, page.locator(SEL.detailPanel), 'E2E-PERC-SENT-01_step2_when');
  });

  await test.step('Then SENTIMENT section and RESPONSE section are visible and no rank badges appear', async () => {
    // SENTIMENT heading — actual text is "Sentiment - CHATGPT" (includes LLM name)
    const sentimentHeading = page.locator(SEL.sentimentSection).first();
    await expect(sentimentHeading, 'SENTIMENT section heading must be visible in Perception panel').toBeVisible({ timeout: 10000 });

    // Sentiment value text (Positive / Negative / Mixed / Neutral) — scoped to llm-responses section
    // DOM: paragraph "Sentiment - CHATGPT" + sibling generic "Mixed" (no colored div card)
    const sentimentValue = page.locator(SEL.llmResponses)
      .getByText(/^(Positive|Negative|Mixed|Neutral)$/).first();
    await expect(sentimentValue, 'Sentiment value (Positive/Negative/Mixed/Neutral) must be visible in Perception panel').toBeVisible({ timeout: 8000 });

    // RESPONSE section heading
    const responseHeading = page.locator(SEL.responseSection).first();
    await expect(responseHeading, 'RESPONSE section heading must be visible in Perception panel').toBeVisible({ timeout: 8000 });

    // No Favorable / Unranked rank badge (those belong to Visibility, not Perception)
    const rankBadgeVisible = await page.locator(`${SEL.favorableBadge}, ${SEL.unrankedBadge}`)
      .first().isVisible({ timeout: 2000 }).catch(() => false);
    await shotAt(page, sentimentHeading, 'E2E-PERC-SENT-01_step3_then');
    expect(rankBadgeVisible, 'No Favorable/Unranked rank badge must appear in Perception panel').toBe(false);
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// E2E-PERC-SENT-02 — Perception: switching LLM engine → SENTIMENT section stays, per-engine sentiment shown
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-PERC-SENT-02 - Perception: switching LLM engine keeps SENTIMENT section with per-engine value', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given a Perception question detail panel is open with multiple LLM engines available', async () => {
    await gotoCategory(page, HYBRID_URL);
    await clickPerceptionTab(page);
    const firstRow = page.locator(SEL.tableRow).first();
    await openPanel(page, firstRow);
    await expect(page.locator(SEL.detailPanel), 'Detail panel must be visible').toBeVisible({ timeout: 10000 });
    await shot(page, 'E2E-PERC-SENT-02_step1_given');
  });

  await test.step('When I switch to a second LLM engine in the panel', async () => {
    const llmBtns = page.locator(SEL.llmBtn);
    const count   = await llmBtns.count();
    expect(count, 'At least 2 LLM engine buttons must be visible').toBeGreaterThanOrEqual(2);

    // Click second LLM button
    await llmBtns.nth(1).click();
    await page.waitForTimeout(600);
    await shotAt(page, page.locator(SEL.detailPanel), 'E2E-PERC-SENT-02_step2_when');
  });

  await test.step('Then SENTIMENT section remains visible and a sentiment card is shown for the selected engine', async () => {
    const sentimentHeading = page.locator(SEL.sentimentSection).first();
    await expect(sentimentHeading, 'SENTIMENT section must remain visible after switching LLM engine').toBeVisible({ timeout: 10000 });

    // Sentiment value text (Positive / Negative / Mixed / Neutral) in the llmResponses container
    // DOM: paragraph "Sentiment - GEMINI" + sibling generic "Mixed" (same pattern as default engine)
    const sentimentValue = page.locator(SEL.llmResponses)
      .getByText(/^(Positive|Negative|Mixed|Neutral)$/).first();
    await shotAt(page, sentimentHeading, 'E2E-PERC-SENT-02_step3_then');
    await expect(sentimentValue, 'Sentiment value must be visible for the newly selected LLM engine').toBeVisible({ timeout: 8000 });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// E2E-PERC-TH-02 — Themes = theme badges → panel THEMES section shows themes list
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-PERC-TH-02 - Perception: Themes = theme badges → panel shows themes list', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given I am on the Perception tab where one or more themes are detected in LLM results', async () => {
    await gotoCategory(page, HYBRID_URL);
    await clickPerceptionTab(page);
    await shot(page, 'E2E-PERC-TH-02_step1_given');
  });

  await test.step('When I find a row where the Themes column shows one or more theme badges', async () => {
    let pickedRow  = null;
    let pickedCell = null;

    for (const catUrl of ALL_CATEGORY_URLS) {
      if (pickedRow) break;
      await gotoCategory(page, catUrl);
      await clickPerceptionTab(page);

      const rows  = page.locator(SEL.tableRow);
      const count = await rows.count();
      if (count === 0) continue;

      for (let i = 0; i < Math.min(count, 30); i++) {
        const row     = rows.nth(i);
        const hasThms = await rowHasThemes(row);
        if (hasThms) {
          pickedRow  = row;
          pickedCell = row.locator(SEL.themesCell);
          break;
        }
      }
    }

    // Dynamic skip — if no rows with themes exist in current dataset, skip instead of fail.
    if (!pickedRow) {
      test.skip(true, 'No Perception rows with theme badges found in current dataset — skipping. Will auto-run when data is available.');
      return;
    }
    await shotAt(page, pickedCell, 'E2E-PERC-TH-02_step2_when');
    await openPanel(page, pickedRow);
  });

  await test.step('Then the detail panel THEMES section shows the list of detected themes', async () => {
    await expect(page.locator(SEL.detailPanel),  'Detail panel must be visible').toBeVisible({ timeout: 10000 });
    await expect(page.locator(SEL.llmResponses), 'LLM responses section must be visible').toBeVisible({ timeout: 10000 });

    // THEMES section heading must be present
    const themesHeading = page.locator(SEL.themesSection).first();
    await expect(themesHeading, 'THEMES section heading must be visible').toBeVisible({ timeout: 10000 });

    // "Aucun thème" empty state must NOT be shown (themes exist)
    const noThemesVisible = await page.locator(SEL.noThemesMsg).first()
      .isVisible({ timeout: 2000 }).catch(() => false);
    expect(
      noThemesVisible,
      'Panel must NOT show "Aucun thème" empty state when theme badges are present in the table'
    ).toBe(false);

    // At least one theme badge (span) must be visible inside the panel
    const panelThemeBadge = page.locator(`${SEL.detailPanel} span[class*="rounded"]`).first();
    await shotAt(page, themesHeading, 'E2E-PERC-TH-02_step3_then');
    await expect(
      panelThemeBadge,
      'At least one theme badge must be visible in the panel THEMES section'
    ).toBeVisible({ timeout: 8000 });
  });
});
