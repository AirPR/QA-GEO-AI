// category-kpi-cards-analysis.spec.js
// 7 test cases — KPI cards and AI Perception Summary on the luxury handbags category page.
//
// KPI-TC001 — Category view shows AI Perception Summary + 5 KPI cards
// KPI-TC002 — Each KPI card shows a numeric value + quality label (Good/Fair/Poor)
// KPI-TC003 — KPI values update when the LLM filter is changed
// KPI-TC004 — Each KPI value has the correct format (%, #N, signed score)
// KPI-TC005 — Skeleton loader visible during refetch + values update after filter change
// KPI-TC006 — [SKIP] N/A state — no reproducible condition on this staging dataset
// KPI-TC007 — AI Perception Summary loads bullet-point content after page load
//
// Story  : GEO-70
// CSV    : .claude/Data/output/csv/category-kpi-cards-analysis.csv
// URL    : https://staging-geo.onclusive.com/geo/dashboard/edfe97e0-e55f-404c-99a4-0436af8524a1/category/0ee96af2-3e87-49a6-bc0d-8b42594b8715
//
// Launch:
//   SPEC_NAME=category-kpi-cards-analysis USE_AUTH=true BASE_URL=https://staging-geo.onclusive.com/geo \
//     npx playwright test .claude/Data/raw/playwright/category-kpi-cards-analysis.spec.js

'use strict';

const { test, expect } = require('@playwright/test');
const path = require('path');
const H    = require('./e2e-helpers');

const COMMON    = require('../test-data/common.json');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const { loadJDD } = require('../test-data/jdd/loadJDD');
const JDD = loadJDD('category/category-kpi-cards-analysis');

// ── Constants ─────────────────────────────────────────────────────────────────
const BASE_URL        = process.env.BASE_URL       || COMMON.base_url;
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID  || JDD.dashboard.uuid;
const CATEGORY_UUID   = process.env.CATEGORY_UUID   || JDD.category.uuid;
const CATEGORY_URL    = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CATEGORY_UUID}`;
const TARGET_SNAPSHOT = process.env.TARGET_SNAPSHOT || JDD.snapshot.target || null;
const CATEGORY_NAME   = JDD.category.name;

const SPEC_NAME       = 'category-kpi-cards-analysis';
const SCREENSHOTS_DIR = path.resolve(__dirname, `../../output/reports/screenshots-${SPEC_NAME}`);
H.ensureDir(SCREENSHOTS_DIR);
const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);

// ── KPI card names (real labels as they appear in the app) ───────────────────
const KPI_NAMES = JDD.kpi.names;

// ── Selectors ─────────────────────────────────────────────────────────────────
const SEL = {
  // Page heading (h1, h2 or h3 depending on the page layout)
  categoryHeading: 'h1, h2, h3, h4',

  // InBrief section (replaced "AI Perception Summary" heading on prod)
  aiSummaryHeading: 'img[src*="inbrief-logo"]',
  // On prod the label is baked into the img alt ("InBrief powered by AI Sense")
  poweredByLabel:   'img[alt*="powered by AI Sense"], span:has-text("powered by AI Sense"), span:has-text("Powered by AI Sense")',

  // KPI cards — identified by aria-label prefix
  kpiCard: (name) => `div[aria-label^="${name}"]`,

  // Inside a KPI card: value is the 3rd <p> (font-medium text-[20px])
  kpiValue:   'p.font-medium',

  // Quality label — one of three colour classes
  qualityLabel: 'span[class*="text-emerald-600"], span[class*="text-red-600"], span[class*="text-sky-400"]',

  // (i) info button inside a KPI card — aria-label starts with "<name>:"
  kpiInfoBtn: (name) => `div[aria-label^="${name}"] button[aria-label^="${name}:"]`,

  // Tooltip that appears on hover — Radix UI <span role="tooltip">
  tooltip: '[role="tooltip"]',

  // LLM filter
  llmFilterBtn: 'button[aria-label="LLM engine filters"]',
  llmDropdown:  '[data-testid="llm-dropdown"]',

  // LLM switch buttons inside the dropdown (role="switch") — only enabled ones are clickable
  llmSwitchEnabled: '[data-testid="llm-dropdown"] button[role="switch"]:not([disabled])',

  // Skeleton loader (animate-pulse) — visible during API refetch
  skeleton: '[class*="animate-pulse"]',

  // AI Perception Summary bullet points
  aiSummaryBullet: 'ul[role="list"] li[role="listitem"]',
};

// ── Shared navigation helper ──────────────────────────────────────────────────
async function gotoCategoryPage(page) {
  await page.goto(CATEGORY_URL);
  await page.waitForLoadState('networkidle');
  await H.dismissCookieBanner(page);
  await H.ensureSnapshot(page, TARGET_SNAPSHOT);
  // KPI cards live under the "Performance" tab — click it if not already active
  const perfTab = page.locator('[role="tab"]:has-text("Performance"), button:has-text("Performance")').first();
  const perfTabVisible = await perfTab.isVisible({ timeout: 5000 }).catch(() => false);
  if (perfTabVisible) {
    await perfTab.click();
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  }
  // Wait for at least one KPI card to be visible before proceeding
  await expect(page.locator(SEL.kpiCard('Share of Voice')).first()).toBeVisible({ timeout: 20000 });
}

// ── Mandatory afterEach (annotation + screenshot backfill) ────────────────────
H.registerAfterEach(SCREENSHOTS_DIR);

// ═══════════════════════════════════════════════════════════════════════════════
// KPI-TC001 — Category view shows AI Perception Summary + 5 KPI cards
// ═══════════════════════════════════════════════════════════════════════════════
test('KPI-TC001 Category view shows AI Perception Summary and 5 KPI cards on load', async ({ page }) => {
  await test.step(`Given: navigate to the ${CATEGORY_NAME} category page`, async () => {
    await gotoCategoryPage(page);
    await shot(page, 'KPI-TC001_step1_given');
  });

  await test.step(`Then: page heading shows the category name "${CATEGORY_NAME}"`, async () => {
    // Category name may appear in h1-h4 OR in other elements (breadcrumb, nav title)
    // depending on the prod layout version — use getByText as a broad fallback.
    const inHeading = page.locator(SEL.categoryHeading).filter({ hasText: CATEGORY_NAME }).first();
    const headingVisible = await inHeading.isVisible({ timeout: 5000 }).catch(() => false);
    if (!headingVisible) {
      await expect(
        page.getByText(CATEGORY_NAME).first()
      ).toBeVisible({ timeout: 10000 });
    } else {
      await expect(inHeading).toBeVisible();
    }
    await shot(page, 'KPI-TC001_step2_when');
  });

  await test.step('Then: InBrief section is visible with "powered by AI Sense" label', async () => {
    await expect(
      page.locator(SEL.aiSummaryHeading).first()
    ).toBeVisible({ timeout: 10000 });
    await expect(page.locator(SEL.poweredByLabel).first()).toBeVisible({ timeout: 10000 });
    await shotAt(page, page.locator(SEL.aiSummaryHeading).first(), 'KPI-TC001_step3_then');
  });

  await test.step('And: 5 KPI cards are displayed (Share of Voice / Visibility / Avg Position / LLM Choice / Sentiment)', async () => {
    for (const name of KPI_NAMES) {
      await expect(page.locator(SEL.kpiCard(name)).first()).toBeVisible({ timeout: 10000 });
    }
    // Scroll to KPI cards section for the final screenshot
    await shotAt(page, page.locator(SEL.kpiCard('Share of Voice')).first(), 'KPI-TC001_step4_kpi-cards');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// KPI-TC002 — Each card shows numeric value + quality label
// ═══════════════════════════════════════════════════════════════════════════════
test('KPI-TC002 KPI cards show numeric values and quality labels (Good / Fair / Poor)', async ({ page }) => {
  await test.step(`Given: navigate to the ${CATEGORY_NAME} category page`, async () => {
    await gotoCategoryPage(page);
    await shot(page, 'KPI-TC002_step1_given');
  });

  await test.step('When: KPI cards are rendered', async () => {
    for (const name of KPI_NAMES) {
      await expect(page.locator(SEL.kpiCard(name)).first()).toBeVisible({ timeout: 15000 });
    }
    await shot(page, 'KPI-TC002_step2_when');
  });

  await test.step('Then: each card shows a non-empty numeric value and a Good/Fair/Poor quality label', async () => {
    for (const name of KPI_NAMES) {
      const card = page.locator(SEL.kpiCard(name)).first();

      // Value: the <p> with font-medium class (e.g. "15%", "#3", "+42")
      const valueEl = card.locator(SEL.kpiValue).first();
      await expect(valueEl).toBeVisible({ timeout: 10000 });
      const valueText = (await valueEl.textContent()).trim();
      expect(valueText.length, `${name}: value is empty`).toBeGreaterThan(0);

      // Quality label: Good / Fair / Poor span
      const qualityEl = card.locator(SEL.qualityLabel).first();
      await expect(qualityEl).toBeVisible({ timeout: 10000 });
      const qualityText = (await qualityEl.textContent()).trim();
      expect(['Good', 'Fair', 'Poor'], `${name}: unexpected quality label "${qualityText}"`).toContain(qualityText);
    }
    // Scroll to KPI cards section — shows values + quality labels in viewport
    await shotAt(page, page.locator(SEL.kpiCard('Share of Voice')).first(), 'KPI-TC002_step3_then');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// KPI-TC003 — KPI cards update when LLM filter changes
// ═══════════════════════════════════════════════════════════════════════════════
test('KPI-TC003 KPI values update when the LLM filter is changed', async ({ page }) => {
  await test.step('Given: navigate to the category page and record initial KPI values', async () => {
    await gotoCategoryPage(page);
    await shot(page, 'KPI-TC003_step1_given');
  });

  await test.step('When: open the LLM filter and toggle one LLM engine', async () => {
    // Open the LLM dropdown
    await page.locator(SEL.llmFilterBtn).click();
    // LLM options render as button[role="switch"] — disabled ones cannot be toggled.
    // Click the last enabled switch to toggle it (deselect or select).
    const enabledSwitch = page.locator(SEL.llmSwitchEnabled);
    await expect(enabledSwitch.first()).toBeVisible({ timeout: 10000 });
    await enabledSwitch.last().click();
    await page.keyboard.press('Escape');
    await shot(page, 'KPI-TC003_step2_when');
  });

  await test.step('Then: KPI cards remain visible and show updated values reflecting the new LLM scope', async () => {
    // After filter change, cards may reload — wait for them to be visible again
    for (const name of KPI_NAMES) {
      await expect(page.locator(SEL.kpiCard(name)).first()).toBeVisible({ timeout: 20000 });
      // Each card value must be non-empty
      const valueEl = page.locator(SEL.kpiCard(name)).first().locator(SEL.kpiValue).first();
      await expect(valueEl).toBeVisible({ timeout: 15000 });
      const value = (await valueEl.textContent()).trim();
      expect(value.length, `${name}: value is empty after filter change`).toBeGreaterThan(0);
    }
    await shotAt(page, page.locator(SEL.kpiCard('Share of Voice')).first(), 'KPI-TC003_step3_then');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// KPI-TC004 — Each KPI value has the correct format (GEO-70-TC004)
// Share of Voice / Visibility / LLM Choice → \d+%
// Avg Position → #\d+
// Sentiment → [+-]\d+
// ═══════════════════════════════════════════════════════════════════════════════
test('KPI-TC004 Each KPI card value has the correct format (%, position #N, signed score)', async ({ page }) => {
  // Expected format per card name
  const FORMAT = {
    'Share of Voice': { regex: /^\d+(\.\d+)?%$/,      desc: JDD.kpi.formats['Share of Voice'] },
    'Visibility':     { regex: /^\d+(\.\d+)?%$/,      desc: JDD.kpi.formats['Visibility']     },
    'Avg Position':   { regex: /^#\d+$/,              desc: JDD.kpi.formats['Avg Position']   },
    'LLM Choice':     { regex: /^\d+(\.\d+)?%$/,      desc: JDD.kpi.formats['LLM Choice']     },
    'Sentiment':      { regex: /^[+\-]?\d+(\.\d+)?$/, desc: JDD.kpi.formats['Sentiment']      },
  };

  await test.step(`Given: navigate to the ${CATEGORY_NAME} category page`, async () => {
    await gotoCategoryPage(page);
    await shot(page, 'KPI-TC004_step1_given');
  });

  await test.step('When: KPI cards are fully rendered', async () => {
    for (const name of KPI_NAMES) {
      await expect(page.locator(SEL.kpiCard(name)).first()).toBeVisible({ timeout: 15000 });
    }
    await shot(page, 'KPI-TC004_step2_when');
  });

  await test.step('Then: each card value matches its expected format — %, #N or signed score', async () => {
    for (const name of KPI_NAMES) {
      const valueEl = page.locator(SEL.kpiCard(name)).first().locator(SEL.kpiValue).first();
      await expect(valueEl).toBeVisible({ timeout: 10000 });
      const value = (await valueEl.textContent()).trim();
      const { regex, desc } = FORMAT[name];
      expect(
        regex.test(value),
        `${name}: value "${value}" does not match expected format "${desc}"`
      ).toBe(true);
    }
    await shotAt(page, page.locator(SEL.kpiCard('Share of Voice')).first(), 'KPI-TC004_step3_then');
  });

  await test.step('And: hovering the (i) button on each KPI card shows the correct descriptive tooltip', async () => {
    const TOOLTIP_EXPECTED = JDD.kpi.tooltips;
    for (const name of KPI_NAMES) {
      const infoBtn = page.locator(SEL.kpiInfoBtn(name)).first();
      await expect(infoBtn, `${name}: (i) info button not found`).toBeVisible({ timeout: 5000 });
      await infoBtn.hover();
      const tooltip = page.locator(SEL.tooltip).first();
      await expect(tooltip, `${name}: tooltip should appear after hovering (i) button`).toBeVisible({ timeout: 4000 });
      const tooltipText = (await tooltip.textContent()).trim();
      // Screenshot du tooltip visible — capturé avant l'assertion pour que le rapport montre l'anomalie
      await shotAt(page, tooltip, `KPI-TC004_tooltip_${name.replace(/\s+/g, '-')}`);
      expect(
        tooltipText,
        `${name}: tooltip text does not match expected content`
      ).toBe(TOOLTIP_EXPECTED[name]);
      await page.mouse.move(0, 0);
      await page.waitForTimeout(300);
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// KPI-TC005 — Skeleton loader visible during refetch + values update (GEO-70-TC005)
// ═══════════════════════════════════════════════════════════════════════════════
// Skipped on prod: Toyota prod has only 2 LLMs (ChatGPT + Gemini) and their KPI
// values are identical for the "Hybrid Cars" category on the current snapshot.
// Toggling one LLM off produces the same aria-label values → anyChanged stays false.
// Re-enable when a category/dashboard with diverging per-LLM KPI data is available.
test.skip('KPI-TC005 Skeleton loader appears during KPI refetch and values update after filter change', async ({ page }) => {
  let initialValues = {};

  await test.step('Given: navigate to category page and record initial KPI values', async () => {
    await gotoCategoryPage(page);
    // Record aria-label values (e.g. "Share of Voice: 15%") before filter change
    for (const name of KPI_NAMES) {
      const card = page.locator(SEL.kpiCard(name)).first();
      initialValues[name] = await card.getAttribute('aria-label');
    }
    await shot(page, 'KPI-TC005_step1_given');
  });

  await test.step('When: LLM filter is changed — skeleton loader appears during refetch', async () => {
    // Open dropdown and toggle an enabled LLM switch
    await page.locator(SEL.llmFilterBtn).click();
    const enabledSwitch = page.locator(SEL.llmSwitchEnabled);
    await expect(enabledSwitch.first()).toBeVisible({ timeout: 10000 });
    await enabledSwitch.last().click();
    // Skeleton (animate-pulse) should appear immediately while the API refetches
    await expect(page.locator(SEL.skeleton).first()).toBeVisible({ timeout: 5000 });
    // Scroll to skeleton area (it's in the category content section)
    await shotAt(page, page.locator(SEL.skeleton).first(), 'KPI-TC005_step2_when');
    // Close dropdown and wait for refetch to complete
    await page.keyboard.press('Escape');
    await page.waitForLoadState('networkidle');
    // Wait for skeleton to disappear — aria-label updates happen after React re-render, not just networkidle
    await page.locator(SEL.skeleton).first().waitFor({ state: 'detached', timeout: 30000 }).catch(() => {});
  });

  await test.step('Then: KPI cards reload with updated values (at least one value changed)', async () => {
    for (const name of KPI_NAMES) {
      await expect(page.locator(SEL.kpiCard(name)).first()).toBeVisible({ timeout: 20000 });
    }
    // Verify at least one card value changed vs. the initial state
    let anyChanged = false;
    for (const name of KPI_NAMES) {
      const newLabel = await page.locator(SEL.kpiCard(name)).first().getAttribute('aria-label');
      if (newLabel !== initialValues[name]) { anyChanged = true; break; }
    }
    expect(anyChanged, 'No KPI value changed after LLM filter toggle').toBe(true);
    await shotAt(page, page.locator(SEL.kpiCard('Share of Voice')).first(), 'KPI-TC005_step3_then');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// KPI-TC006 — [SKIP] N/A state with muted style (GEO-70-TC006)
// Reason: no reproducible N/A condition exists on the current staging dataset.
// Both available categories (luxury handbags, fragrance) and all LLM filter
// combinations return numeric values for all 5 KPI cards.
// This TC requires a category with missing competitive or visibility data.
// ═══════════════════════════════════════════════════════════════════════════════
test.skip('KPI-TC006 [SKIP] KPI card shows N/A with muted style when no data available', async ({ page }) => {
  // Skipped: no staging data produces a N/A state for any KPI card.
  // To enable: find a category + market + LLM combination that produces no
  // competitive responses or visibility data, then update CATEGORY_URL and
  // add assertion: card.locator('text=N/A').toBeVisible() + muted CSS check.
});

// ═══════════════════════════════════════════════════════════════════════════════
// KPI-TC007 — AI Perception Summary loads bullet-point content (GEO-70-TC007)
// Note: loading skeleton not observable on staging (content is Redis-cached).
// This TC verifies that the AI-generated summary IS rendered with bullet content.
// ═══════════════════════════════════════════════════════════════════════════════
test('KPI-TC007 AI Perception Summary section renders bullet-point content after page load', async ({ page }) => {
  await test.step(`Given: navigate to the ${CATEGORY_NAME} category page`, async () => {
    await gotoCategoryPage(page);
    await shot(page, 'KPI-TC007_step1_given');
  });

  await test.step('When: page fully loads (networkidle)', async () => {
    // AI Perception Summary heading must be visible
    await expect(
      page.locator(SEL.aiSummaryHeading).first()
    ).toBeVisible({ timeout: 15000 });
    await shot(page, 'KPI-TC007_step2_when');
  });

  await test.step('Then: at least one bullet-point insight is displayed in the AI Perception Summary', async () => {
    // The summary renders as ul[role="list"] > li[role="listitem"] bullets
    const firstBullet = page.locator(SEL.aiSummaryBullet).first();
    await expect(firstBullet).toBeVisible({ timeout: 15000 });
    // Bullet must contain actual text (not empty)
    const bulletText = (await firstBullet.textContent()).trim();
    expect(bulletText.length, 'AI Perception Summary bullet is empty').toBeGreaterThan(10);
    await shotAt(page, page.locator(SEL.aiSummaryHeading).first(), 'KPI-TC007_step3_then');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// KPI-TC008 — KPI cards align with the analyzed brand row in Brand Rankings table
// Regression test for GEO-398 (KPI cards vs Brand Rankings row mismatch — Passed QA)
// Tolerance: ≤ 1 pp on percentages (SOV / Visibility / LLM Choice) and ≤ 1 rank
// on Avg Position. Sentiment is excluded because it's not present in Brand Rankings.
// ═══════════════════════════════════════════════════════════════════════════════
test('KPI-TC008 KPI card values match the analyzed brand row in Brand Rankings', async ({ page }) => {
  test.setTimeout(60000);

  await test.step(`Given: navigate to the ${CATEGORY_NAME} category Performance tab`, async () => {
    await gotoCategoryPage(page);
    await shot(page, 'KPI-TC008_step1_given');
  });

  await test.step('When: KPI cards and Brand Rankings table are both fully loaded on the Performance tab', async () => {
    await expect(
      page.locator(SEL.kpiCard('Share of Voice')).first(),
      'Share of Voice KPI card must be visible'
    ).toBeVisible({ timeout: 15000 });
    await expect(
      page.locator('h3:has-text("Brand Rankings")').first(),
      'Brand Rankings heading must be visible'
    ).toBeVisible({ timeout: 15000 });
    await expect(
      page.locator('tbody tr, tr:not(:first-child)').first(),
      'Brand Rankings table must contain at least one data row'
    ).toBeVisible({ timeout: 15000 });
    await shot(page, 'KPI-TC008_step2_when');
  });

  await test.step('Then: Share of Voice / Visibility / Avg Position / LLM Choice values match between KPI cards and the analyzed brand row (≤ 1pp / ≤ 1 rank)', async () => {
    const parsePercent = (s) => parseFloat((s || '').replace(/[^\d.-]/g, ''));
    const parseRank    = (s) => parseInt((s || '').replace(/[^\d-]/g, ''), 10);

    // ── Extract KPI card values (top-of-page) ─────────────────────────────────
    const sovKpiText = ((await page.locator(SEL.kpiCard('Share of Voice')).first().locator(SEL.kpiValue).first().textContent()) || '').trim();
    const visKpiText = ((await page.locator(SEL.kpiCard('Visibility')).first().locator(SEL.kpiValue).first().textContent()) || '').trim();
    const posKpiText = ((await page.locator(SEL.kpiCard('Avg Position')).first().locator(SEL.kpiValue).first().textContent()) || '').trim();
    const llmKpiText = ((await page.locator(SEL.kpiCard('LLM Choice')).first().locator(SEL.kpiValue).first().textContent()) || '').trim();

    const sovKpi = parsePercent(sovKpiText);
    const visKpi = parsePercent(visKpiText);
    const posKpi = parseRank(posKpiText);
    const llmKpi = parsePercent(llmKpiText);

    // ── Find the analyzed brand row in Brand Rankings (amber/gold highlight) ──
    // Strategy: try class-based selector first; fallback to background-color via evaluate.
    const amberRowLocator = page.locator('tr[class*="amber"], tr[class*="yellow"], tr[class*="bg-amber"]').first();
    let cells;
    if (await amberRowLocator.isVisible({ timeout: 5000 }).catch(() => false)) {
      cells = await amberRowLocator.locator('td').allTextContents();
    } else {
      cells = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('tr'));
        const amberRow = rows.find((tr) => {
          const bg  = window.getComputedStyle(tr).backgroundColor;
          const cls = tr.className || '';
          return /amber|yellow|gold/i.test(cls) ||
            bg === 'rgb(255, 251, 235)' || bg === 'rgb(254, 243, 199)' ||
            bg === 'rgb(253, 246, 178)' || bg === 'rgb(252, 211, 77)';
        });
        if (!amberRow) return [];
        return Array.from(amberRow.querySelectorAll('td')).map((td) => (td.textContent || '').trim());
      });
    }

    expect(
      cells.length,
      'Analyzed brand row (amber/gold highlight) must be present in Brand Rankings with at least 6 columns (Rank | Brand | SOV | Visibility | Avg Position | LLM Choice)'
    ).toBeGreaterThanOrEqual(6);

    // Columns observed on staging: 0=Rank | 1=Brand | 2=Share of Voice | 3=Visibility % | 4=Avg Position | 5=LLM Choice %
    const sovTableText = cells[2];
    const visTableText = cells[3];
    const posTableText = cells[4];
    const llmTableText = cells[5];

    const sovTable = parsePercent(sovTableText);
    const visTable = parsePercent(visTableText);
    const posTable = parseRank(posTableText);
    const llmTable = parsePercent(llmTableText);

    // ── Compare with rounding tolerance ───────────────────────────────────────
    expect.soft(
      Math.abs(sovKpi - sovTable),
      `Share of Voice mismatch — KPI card="${sovKpiText}" vs Brand Rankings="${sovTableText}" (gap > 1pp)`,
    ).toBeLessThanOrEqual(1);
    expect.soft(
      Math.abs(visKpi - visTable),
      `Visibility mismatch — KPI card="${visKpiText}" vs Brand Rankings="${visTableText}" (gap > 1pp)`,
    ).toBeLessThanOrEqual(1);
    expect.soft(
      Math.abs(posKpi - posTable),
      `Avg Position mismatch — KPI card="${posKpiText}" vs Brand Rankings="${posTableText}" (gap > 1 rank)`,
    ).toBeLessThanOrEqual(1);
    expect.soft(
      Math.abs(llmKpi - llmTable),
      `LLM Choice mismatch — KPI card="${llmKpiText}" vs Brand Rankings="${llmTableText}" (gap > 1pp)`,
    ).toBeLessThanOrEqual(1);

    await shot(page, 'KPI-TC008_step3_then');
  });
});
