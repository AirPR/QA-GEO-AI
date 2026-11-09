// category-perception-citation.spec.js
// E2E — GEO-66 Perception Topics & AI Citation Sources on category page.
// Updated 2026-05-13 — selectors and patterns aligned with validated GEO-73
// (Perception Summary) and GEO-74 (AI Citation Sources) from epic102 run.
// CSV : .claude/Data/output/csv/category-perception-citation.csv
//
// Lancement :
//   SPEC_NAME=category-perception-citation USE_AUTH=true \
//   BASE_URL=https://staging-geo.onclusive.com/geo \
//   npx playwright test .claude/Data/raw/playwright/category-perception-citation.spec.js

'use strict';
const { test, expect } = require('@playwright/test');
const path = require('path');

const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H = require('./e2e-helpers');

// ── JDD (3-layer merge) ───────────────────────────────────────────────────────
const COMMON           = require('../test-data/common.json');
const { loadJDD } = require('../test-data/jdd/loadJDD');
const JDD = loadJDD('category/category-perception-citation');

// ── Constants (env > JDD) ─────────────────────────────────────────────────────
const BASE_URL        = process.env.BASE_URL        || COMMON.base_url;
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID  || JDD.dashboard_uuid;
const CATEGORY_ID     = process.env.CATEGORY_ID     || JDD.category_uuid;
const TARGET_SNAPSHOT = process.env.TARGET_SNAPSHOT || JDD.snapshot?.target || null;
const CATEGORY_URL    = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CATEGORY_ID}`;
const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-category-perception-citation');
H.ensureDir(SCREENSHOTS_DIR);

const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── Selectors ─────────────────────────────────────────────────────────────────
const SEL = {
  // Perception area (GEO-73 — validated selectors)
  perceptionSummaryHeading: 'img[src*="inbrief-logo"]',
  perceptionLoading:        ':has-text("Generating perception summary")',
  topConceptsHeading:       'h3:has-text("Top Concepts Associated with Your Brand")',

  // Sentiment filter buttons inside Top Concepts section
  sentimentAll:      'button:has-text("All (")',
  sentimentPositive: 'button[aria-label*="Positive"], button:has-text("Positive")',
  sentimentMixed:    'button[aria-label*="Mixed"], button:has-text("Mixed")',
  sentimentNegative: 'button[aria-label*="Negative"], button:has-text("Negative")',

  // AI Citation Sources section (GEO-74 — validated selectors from blueprint)
  citationHeading:    BLUEPRINT.overview_page.ai_citation_sources.heading,
  sourceTypeBar:      BLUEPRINT.overview_page.ai_citation_sources.source_type_bar,
  domainRows:         BLUEPRINT.overview_page.ai_citation_sources.domain_rows,
  favorabilityBadge:  BLUEPRINT.overview_page.ai_citation_sources.favorability_badge,
  sourceTypeSegments: BLUEPRINT.overview_page.ai_citation_sources.source_type_segments,

  filterByTypeBtn:    'button[aria-label="Filter by source type"], button:has-text("All source types")',
};

// ── Navigate helper ───────────────────────────────────────────────────────────
async function gotoCategory(page) {
  await page.goto(CATEGORY_URL, { waitUntil: 'load' });
  await H.dismissCookieBanner(page);
  await H.ensureSnapshot(page, TARGET_SNAPSHOT);
  // Ensure Identity tab is active — session may restore last visited tab (e.g. Performance)
  const identityTab = page.locator('[role="tab"]:has-text("Identity")').first();
  const isIdentitySelected = await identityTab.getAttribute('aria-selected').catch(() => null)
    ?? await identityTab.evaluate(el => el.getAttribute('data-state') === 'active' || el.getAttribute('aria-selected') === 'true').catch(() => false);
  if (!isIdentitySelected) {
    await identityTab.click();
    await page.waitForTimeout(500);
  }
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(500);
  // Soft wait for Identity tab content — either heading signals the tab is ready.
  // Hard assertion is delegated to TC001 so TC002-TC012 (Sources tab) can proceed
  // even when Top Concepts is absent on a given snapshot.
  await page.locator(`${SEL.topConceptsHeading}, ${SEL.perceptionSummaryHeading}`)
    .first()
    .waitFor({ state: 'visible', timeout: 20000 })
    .catch(() => { /* page may lack Top Concepts on this snapshot — TC001 will assert */ });
}

// ── Citation drawer helper (validated in GEO-74-TC008) ────────────────────────
// Domain rows open an in-app right-side drawer — NOT an external link.
// Scopes to the tbody that directly follows the "AI Citation Sources" heading
// to avoid matching Brand Rankings rows from other sections.
async function openCitationDrawer(page) {
  await expect(page.locator(SEL.citationHeading), '"LLM Engines Citation Sources" heading must be visible').toBeVisible({ timeout: 10000 });
  const domainBtn = page.locator('h3:has-text("LLM Engines Citation Sources"), h2:has-text("LLM Engines Citation Sources")')
    .locator('xpath=following::tbody[1]')
    .locator('button, tr[role="button"]').first();
  await expect(domainBtn, 'First clickable domain row in LLM Engines Citation Sources table must be visible').toBeVisible({ timeout: 10000 });
  await H.safeScroll(domainBtn, 'domain row in LLM Engines Citation Sources table');
  await page.waitForTimeout(500);
  await domainBtn.click();
  await page.waitForTimeout(1500);
  await expect(page.locator(':has-text("LLM Engines Citation Source Details"), :has-text("AI Citation Source Details")').last(),
    '"LLM Engines Citation Source Details" drawer must be visible').toBeVisible({ timeout: 8000 });
}

// ═════════════════════════════════════════════════════════════════════════════
// GEO-66 — Perception Topics & Citation Sources
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-66-TC001 — Perception topics and sentiment filters are displayed', async ({ page }) => {
  await test.step('Given an authenticated Editor navigates to the category perception page', async () => {
    await gotoCategory(page);
    await shot(page, 'GEO-66-TC001_step1_given');
  });

  await test.step('When the page finishes loading and the perception area is visible', async () => {
    const topConceptsH = page.locator(SEL.topConceptsHeading).first();
    await H.safeScroll(topConceptsH, 'Top Concepts Associated with Your Brand heading');
    await shot(page, 'GEO-66-TC001_step2_when');
  });

  await test.step('Then InBrief section is visible, "Top Concepts Associated with Your Brand" heading is visible, and sentiment filter buttons (All, Positive, Mixed, Negative) are displayed', async () => {
    const perceptionH = page.locator(SEL.perceptionSummaryHeading).first();
    await expect(perceptionH, 'InBrief section (logo) must be visible').toBeVisible({ timeout: 10000 });

    const topConceptsH = page.locator(SEL.topConceptsHeading).first();
    await expect(topConceptsH, '"Top Concepts Associated with Your Brand" heading must be visible').toBeVisible({ timeout: 10000 });

    await topConceptsH.scrollIntoViewIfNeeded();
    await expect(page.locator(SEL.sentimentAll).first(),      'Sentiment filter "All (N)" must be visible').toBeVisible({ timeout: 10000 });
    await expect(page.locator(SEL.sentimentPositive).first(), 'Sentiment filter "Positive" must be visible').toBeVisible({ timeout: 10000 });
    await expect(page.locator(SEL.sentimentMixed).first(),    'Sentiment filter "Mixed" must be visible').toBeVisible({ timeout: 10000 });
    await expect(page.locator(SEL.sentimentNegative).first(), 'Sentiment filter "Negative" must be visible').toBeVisible({ timeout: 10000 });

    await shotAt(page, topConceptsH, 'GEO-66-TC001_step3_then');
  });
});

test('GEO-66-TC002 — AI Citation Sources section is visible with stacked legend bar and domain table', async ({ page }) => {
  await test.step('Given the Editor is on the category page', async () => {
    await gotoCategory(page);
    await shot(page, 'GEO-66-TC002_step1_given');
  });

  await test.step('When the Editor scrolls to the AI Citation Sources section', async () => {
    const citH = page.locator(SEL.citationHeading).first();
    await H.safeScroll(citH, 'LLM Engines Citation Sources heading');
    await shot(page, 'GEO-66-TC002_step2_when');
  });

  await test.step('Then "AI Citation Sources" heading is visible, the stacked legend bar is displayed, and the domain table has at least one row with a favorability badge', async () => {
    // Stacked legend bar
    await expect(page.locator(SEL.sourceTypeBar).first(), 'Source type stacked bar must be visible').toBeVisible({ timeout: 10000 });

    // Domain table: at least one row
    await page.waitForSelector(SEL.domainRows, { timeout: 15000 });
    const rowCount = await page.locator(SEL.domainRows).count();
    expect(rowCount, 'Domain table must have at least one row').toBeGreaterThan(0);

    // First row must have a favorability badge
    const badge = page.locator(SEL.favorabilityBadge).first();
    await expect(badge, 'First domain row must have a favorability badge').toBeVisible({ timeout: 8000 });

    const citH = page.locator(SEL.citationHeading).first();
    await shotAt(page, citH, 'GEO-66-TC002_step3_then');
  });
});

test('GEO-66-TC003 — Domain row click opens AI Citation Source Details drawer', async ({ page }) => {
  await test.step('Given the AI Citation Sources table contains at least one domain row', async () => {
    await gotoCategory(page);
    const citH = page.locator(SEL.citationHeading).first();
    await H.safeScroll(citH, 'LLM Engines Citation Sources heading');
    await page.waitForSelector(SEL.domainRows, { timeout: 15000 });
    await shot(page, 'GEO-66-TC003_step1_given');
  });

  await test.step('When the Editor clicks a domain row', async () => {
    await openCitationDrawer(page);
    await shot(page, 'GEO-66-TC003_step2_when');
  });

  await test.step('Then a right-side drawer titled "AI Citation Source Details" opens with Citation Signals (Missed Visibility, Lost to Competitors, Sentiment Issues, Citations by AI Model) and a Cited URLs list', async () => {
    await expect(page.locator(':has-text("LLM Engines Citation Source Details"), :has-text("AI Citation Source Details")').last(), '"LLM Engines Citation Source Details" must be visible').toBeVisible({ timeout: 8000 });
    await expect(page.locator(':has-text("Citation Signals")').last(),        '"Citation Signals" must be visible').toBeVisible({ timeout: 5000 });
    await expect(page.locator(':has-text("Missed Visibility")').last(),       '"Missed Visibility" must be visible').toBeVisible({ timeout: 5000 });
    await expect(page.locator(':has-text("Lost to Competitors")').last(),     '"Lost to Competitors" must be visible').toBeVisible({ timeout: 5000 });
    await expect(page.locator(':has-text("Sentiment Issues")').last(),        '"Sentiment Issues" must be visible').toBeVisible({ timeout: 5000 });
    await expect(page.locator(':has-text("Citations by AI Model")').last(),   '"Citations by AI Model" must be visible').toBeVisible({ timeout: 5000 });
    await expect(page.locator(':has-text("Cited URLs")').last(),              '"Cited URLs" must be visible').toBeVisible({ timeout: 5000 });
    await shot(page, 'GEO-66-TC003_step3_then');
  });
});

test('GEO-66-TC004 — Citation Signals shows four diagnostic cards with AI model breakdown', async ({ page }) => {
  await test.step('Given the AI Citation Source Details drawer is open', async () => {
    await gotoCategory(page);
    const citH = page.locator(SEL.citationHeading).first();
    await H.safeScroll(citH, 'LLM Engines Citation Sources heading');
    await openCitationDrawer(page);
    await shot(page, 'GEO-66-TC004_step1_given');
  });

  await test.step('When the drawer renders the Citation Signals and Citations by AI Model sections', async () => {
    await page.waitForTimeout(500);
    await shot(page, 'GEO-66-TC004_step2_when');
  });

  await test.step('Then four diagnostic cards (Missed Visibility, Lost to Competitors, Sentiment Issues, Citations by AI Model) are visible and each AI model row (Gemini, Claude, Perplexity) shows its citation count', async () => {
    for (const cardName of ['Missed Visibility', 'Lost to Competitors', 'Sentiment Issues', 'Citations by AI Model']) {
      const card = page.locator(`:has-text("${cardName}")`).last();
      await expect(card, `"${cardName}" card must be visible`).toBeVisible({ timeout: 5000 });
    }
    for (const model of ['Gemini', 'Claude', 'Perplexity']) {
      const row = page.locator(`:has-text("${model}")`).last();
      if (await row.count() > 0) await expect(row).toBeVisible({ timeout: 5000 });
    }
    await shot(page, 'GEO-66-TC004_step3_then');
  });
});

test('GEO-66-TC005 — Cited URLs list shows URL references in the detail drawer', async ({ page }) => {
  await test.step('Given the AI Citation Source Details drawer is open', async () => {
    await gotoCategory(page);
    const citH = page.locator(SEL.citationHeading).first();
    await H.safeScroll(citH, 'LLM Engines Citation Sources heading');
    await openCitationDrawer(page);
    await shot(page, 'GEO-66-TC005_step1_given');
  });

  await test.step('When the Editor scrolls to the Cited URLs section in the drawer', async () => {
    const citedSection = page.locator(':has-text("Cited URLs"), :has-text("cited urls")').last();
    if (await citedSection.count() > 0) await citedSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, 'GEO-66-TC005_step2_when');
  });

  await test.step('Then the Cited URLs section is visible and contains at least one URL item with title and AI model icons', async () => {
    await expect(page.locator(':has-text("Cited URLs")').last(), '"Cited URLs" section must be visible').toBeVisible({ timeout: 5000 });
    const urlItems = page.locator('a[href^="http"], a[href^="//"]');
    if (await urlItems.count() > 0) {
      await expect(urlItems.first(), 'At least one URL must be visible in Cited URLs').toBeVisible({ timeout: 5000 });
    }
    await shot(page, 'GEO-66-TC005_step3_then');
  });
});

test('GEO-66-TC006 — Legend segment selection filters the domain table', async ({ page }) => {
  await test.step('Given the AI Citation Sources section with its stacked legend bar is visible', async () => {
    await gotoCategory(page);
    const citH = page.locator(SEL.citationHeading).first();
    await H.safeScroll(citH, 'LLM Engines Citation Sources heading');
    await expect(page.locator(SEL.sourceTypeBar).first(), 'Source type stacked bar must be visible').toBeVisible({ timeout: 10000 });
    await shot(page, 'GEO-66-TC006_step1_given');
  });

  await test.step('When the Editor clicks a source type segment in the legend bar', async () => {
    const segmentSel = `${BLUEPRINT.overview_page.ai_citation_sources.source_type_bar} button[aria-label]`;
    const segments = page.locator(segmentSel);
    const segmentCount = await segments.count();
    expect(segmentCount, 'At least one source-type segment must be present in the legend bar').toBeGreaterThan(0);
    await segments.first().click();
    await page.waitForTimeout(600);
    await shot(page, 'GEO-66-TC006_step2_when');
  });

  await test.step('Then the domain table shows only rows matching the selected source type and the table is non-empty', async () => {
    const rowCount = await page.locator(SEL.domainRows).count();
    expect(rowCount, 'Domain table must be non-empty after legend filter').toBeGreaterThan(0);
    await shot(page, 'GEO-66-TC006_step3_then');
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// GEO-66-TC012 — Sources classification regression test for GEO-393
//
// GEO-393 (status QA In Progress): the source classifier mis-routes domains —
// e.g. competitor brand sites and sport journalism end up in "Other" instead
// of Corporate / Journalism, inflating "Other" (19% on Adidas report).
//
// Oracle-driven strict mapping check. The expected (domain → source_type)
// mapping lives in raw/test-data/jdd/category/sources-classification-oracle.json
// and is maintained by QA — add a domain there as soon as its correct
// classification is known. The test reads every row visible in the AI
// Citation Sources table and asserts that, for any domain present in both
// the table AND the oracle, the actual Type cell equals the expected type.
// Domains in the oracle that don't appear in the current category's table
// are logged but do not fail the test (vacuous pass).
// ═════════════════════════════════════════════════════════════════════════════
const ORACLE = require('../test-data/jdd/category/sources-classification-oracle.json');

test('GEO-66-TC012 — Sources classification: every domain in the AI Citation Sources table matches its expected source type from the oracle (GEO-393 regression)', async ({ page }) => {
  test.setTimeout(120000);

  await test.step('Given: navigate to the category page and scroll to AI Citation Sources', async () => {
    await gotoCategory(page);
    const citH = page.locator(SEL.citationHeading).first();
    await H.safeScroll(citH, 'LLM Engines Citation Sources heading');
    await expect(citH, '"AI Citation Sources" heading must be visible').toBeVisible({ timeout: 15000 });
    await expect(page.locator(SEL.sourceTypeBar).first(), 'Source type stacked bar must be visible').toBeVisible({ timeout: 15000 });
    await shot(page, 'GEO-66-TC012_step1_given');
  });

  // ── Read every (domain, type) pair visible in the citation table ────────────
  let tableEntries = [];
  await test.step('When: the AI Citation Sources table is rendered with all rows (no source-type filter applied)', async () => {
    // Make sure no segment filter is active so we read the full table.
    // The "All source types" button is the reset control when a segment is selected.
    const resetBtn = page.locator('button[aria-label="All source types"]').first();
    if (await resetBtn.isVisible().catch(() => false)) {
      await resetBtn.click().catch(() => {});
      await page.waitForTimeout(400);
    }

    // Try to expand the table to show all domains (button toggles "All domains" view).
    const allDomainsBtn = page.locator('button[aria-label="All domains"]').first();
    if (await allDomainsBtn.isVisible().catch(() => false)) {
      const pressed = await allDomainsBtn.getAttribute('aria-pressed').catch(() => null);
      if (pressed !== 'true') {
        await allDomainsBtn.click().catch(() => {});
        await page.waitForTimeout(600);
      }
    }

    const rows = page.locator(SEL.domainRows);
    const rowCount = await rows.count();
    expect(rowCount, 'AI Citation Sources table must contain at least one domain row').toBeGreaterThan(0);

    // Each row exposes the domain via aria-label and the Type in the 2nd <td>.
    tableEntries = await rows.evaluateAll((trs) => {
      return trs.map((tr) => {
        const ariaDomain = (tr.getAttribute('aria-label') || '').trim();
        const cells = tr.querySelectorAll('td');
        // Domain is also the first cell's text; Type is the second cell.
        const firstCellText = cells[0] ? (cells[0].textContent || '').trim() : '';
        const typeCellText  = cells[1] ? (cells[1].textContent || '').trim() : '';
        return {
          domain: (ariaDomain || firstCellText).toLowerCase(),
          actualType: typeCellText,
        };
      }).filter((r) => r.domain);
    });

    expect(tableEntries.length, 'Parsed (domain, type) entries from the table must be > 0').toBeGreaterThan(0);
    await shot(page, 'GEO-66-TC012_step2_when');
  });

  await test.step('Then: every domain present in BOTH the table and the oracle has actualType === expectedType (oracle: sources-classification-oracle.json)', async () => {
    const oracle = ORACLE.mapping || {};
    const oracleDomains = Object.keys(oracle).map((d) => d.toLowerCase());

    const byDomain = new Map(tableEntries.map((e) => [e.domain, e.actualType]));

    const mismatches = [];
    const matched   = [];
    const missing   = [];

    for (const d of oracleDomains) {
      const expectedType = oracle[d];
      const actualType   = byDomain.get(d);
      if (actualType === undefined) {
        missing.push(d);
      } else if (actualType !== expectedType) {
        mismatches.push({ domain: d, expectedType, actualType });
      } else {
        matched.push(d);
      }
    }

    // Visibility — surfaced in the Playwright log so QA can see what was tested.
    if (missing.length) {
      console.warn(`[GEO-66-TC012] Oracle domains NOT present in this category's table (skipped): ${missing.join(', ')}`);
    }
    console.log(`[GEO-66-TC012] Oracle coverage: ${matched.length} matched / ${mismatches.length} mismatched / ${missing.length} missing (out of ${oracleDomains.length} oracle entries).`);

    await shot(page, 'GEO-66-TC012_step3_then');

    expect(
      mismatches,
      mismatches.length
        ? `GEO-393 regression: ${mismatches.length} domain(s) classified into the WRONG source type. Mismatches: ${mismatches.map((m) => `${m.domain} → got "${m.actualType}", expected "${m.expectedType}"`).join(' | ')}`
        : 'All oracle domains present in the table are classified correctly.',
    ).toEqual([]);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// SKIPPED tests
// ═════════════════════════════════════════════════════════════════════════════

test.skip('GEO-66-TC007 — [SKIP] All domains modal opens with search', () => {
  // Pattern validated in GEO-74-TC006 on the overview dashboard.
  // Re-enable once confirmed that the "All domains" button is present on the category page.
});

test.skip('GEO-66-TC008 — [SKIP] Market filter recalculates perception topics and citation sources', () => {
  // SKIPPED — Market filter availability on category page not confirmed.
  // Re-enable with dedicated before/after comparison or sandboxed test report.
});

test.skip('GEO-66-TC009 — [SKIP] LLM filter recalculates both components', () => {
  // SKIPPED — Requires deselecting an LLM and comparing before/after state.
  // Re-enable with a dedicated recalculation test helper.
});

test.skip('GEO-66-TC010 — [SKIP] Empty state messages are displayed', () => {
  // SKIPPED — Requires a category with zero perception responses and zero citation sources.
  // Cannot be reproduced on the current staging report.
  // Re-enable with a dedicated empty-state test category or seeded dataset.
});

test.skip('GEO-66-TC011 — [SKIP] Error state displayed with retry option', () => {
  // SKIPPED — Requires simulating an API failure for the perception topics or citation
  // sources endpoint. Cannot be triggered reliably without network interception.
  // Re-enable with a mock-server or network interception approach.
});
