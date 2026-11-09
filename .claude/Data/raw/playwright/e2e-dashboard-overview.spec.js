// GEO-dashboard-overview.spec.js
// E2E — GEO-79 Sidebar/Layout + GEO-78 LLM Filters + GEO-72 AI Perception Summary + GEO-107 KPI Cards
// CSV : .claude/Data/output/csv/GEO-dashboard-overview.csv
//
// Launch:
//   SPEC_NAME=GEO-dashboard-overview USE_AUTH=true \
//   BASE_URL=https://staging-geo.onclusive.com/geo \
//   npx playwright test .claude/Data/raw/playwright/GEO-dashboard-overview.spec.js

'use strict';
const { test, expect } = require('@playwright/test');
const path = require('path');

const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H = require('./e2e-helpers');

// ── JDD (3-layer merge) ───────────────────────────────────────────────────────
const COMMON           = require('../test-data/common.json');
const { loadJDD } = require('../test-data/jdd/loadJDD');
const JDD = loadJDD('GEO-dashboard-overview');

// ── Constants (env > JDD) ─────────────────────────────────────────────────────
const BASE_URL        = process.env.BASE_URL        || COMMON.base_url;
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID  || JDD.dashboard_uuid;
const TARGET_SNAPSHOT = process.env.TARGET_SNAPSHOT || JDD.snapshot?.target || null;
const DASHBOARD_URL   = `${BASE_URL}/dashboard/${DASHBOARD_UUID}`;

// ── i18n — LOCALE=fr | en-gb | en-us (default) | es ──────────────────────────
const LOCALE = process.env.LOCALE || 'en-us';
const I18N   = require(`../test-data/i18n/${LOCALE}.json`);
const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-GEO-dashboard-overview');
H.ensureDir(SCREENSHOTS_DIR);

const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── Selectors ─────────────────────────────────────────────────────────────────
const SEL = {
  // Sidebar
  sidebar:            '[data-testid="dashboard-sidebar"]',
  overviewActiveLink: 'a[aria-current="page"]',
  categoriesBtn:      `[data-testid="dashboard-sidebar"] button:has-text("${I18N.layout.categories}")`,
  manageScopeLink:    'a[href*="/manage-scope"]',
  // actionsCenter: not yet implemented
  categorySubItems:   '[data-testid="dashboard-sidebar"] a[href*="/category/"]',

  // Top bar / header
  backBtnAnalysis:    `button[aria-label="${I18N.dashboard.topSection.ariaBack}"]`,
  generatedLabel:     `text=${I18N.dashboard.topSection.generated}`,
  llmFilterBtn:       '[data-testid="llm-dropdown-trigger"]',

  // AI Perception Summary
  perceptionHeading:  'img[src*="inbrief-logo"]',

  // KPI cards (data-testid — language-independent)
  kpiVisibility:      '[data-testid="kpi-card-visibility"]',
  kpiLLMChoice:       '[data-testid="kpi-card-winRate"]',
  kpiSentiment:       '[data-testid="kpi-card-sentiment"]',

  // LLM dropdown items
  llmSwitches:        '[role="switch"]',

  // Identity cards
  identityCardTitles: [
    I18N.dashboard.reputation.brandImage,
    I18N.dashboard.reputation.employerBrand,
    I18N.dashboard.reputation.esg,
    I18N.dashboard.reputation.leadership,
  ],
  sentimentBadge:     `span:is(:has-text("${I18N.dashboard.reputation.positive}"), :has-text("${I18N.dashboard.reputation.negative}"), :has-text("Neutral"), :has-text("${I18N.dashboard.reputation.mixed}"))`,
  closePanelBtn:      `button[aria-label="${I18N.dashboard.signals.closePanel}"]`,
  drillInTabAll:      `button:has-text("${I18N.dashboard.concepts.all}")`,
};

// ── Navigate helper ───────────────────────────────────────────────────────────
async function gotoDashboard(page) {
  await page.goto(DASHBOARD_URL, { waitUntil: 'load' });
  await H.dismissCookieBanner(page);
  await H.ensureSnapshot(page, TARGET_SNAPSHOT);
  await page.waitForTimeout(1000);
  // Wait for fonts to finish loading so page.screenshot() doesn't timeout on CDN fonts
  await page.evaluate(() => document.fonts.ready).catch(() => {});
  const sidebar = page.locator(SEL.sidebar);
  await expect(sidebar, 'Sidebar must be visible after load').toBeVisible({ timeout: 20000 });
}

// ═════════════════════════════════════════════════════════════════════════════
// GEO-79 — Sidebar / Layout
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-79-TC001 — Sidebar layout is displayed', async ({ page }) => {
  // Given an Editor opens a completed report dashboard
  await gotoDashboard(page);
  await shot(page, 'GEO-79-TC001_step1_given');

  // When the dashboard loads
  const sidebar = page.locator(SEL.sidebar);
  await sidebar.scrollIntoViewIfNeeded();
  await shot(page, 'GEO-79-TC001_step2_when');

  // Then the sidebar shows Overview, Categories sub-items (auto-expanded), and Manage Scope entries
  await expect(page.locator(SEL.overviewActiveLink).first(), 'Overview link must be visible in sidebar').toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.categorySubItems).first(), 'At least one Categories sub-item must be visible in sidebar (accordion is auto-expanded)').toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.manageScopeLink).first(), 'Manage Scope link must be visible in sidebar').toBeVisible({ timeout: 10000 });

  await shotAt(page, sidebar, 'GEO-79-TC001_step3_then');
});

test('GEO-79-TC002 — Categories accordion is auto-expanded', async ({ page }) => {
  // Given the dashboard sidebar is visible
  await gotoDashboard(page);
  await shot(page, 'GEO-79-TC002_step1_given');

  // When the dashboard loads (no click needed — Categories is auto-expanded by the app)
  const sidebar = page.locator(SEL.sidebar);
  await sidebar.scrollIntoViewIfNeeded();
  await shot(page, 'GEO-79-TC002_step2_when');

  // Then category sub-items are listed under Categories without any user action
  const subItems = page.locator(SEL.categorySubItems);
  await expect(subItems.first(), 'At least one category sub-item must be visible — Categories accordion is auto-expanded by the app').toBeVisible({ timeout: 10000 });

  await shotAt(page, sidebar, 'GEO-79-TC002_step3_then');
});

test('GEO-79-TC003 — Active view is highlighted', async ({ page }) => {
  // Given the Editor is on a dashboard view
  await gotoDashboard(page);
  await shot(page, 'GEO-79-TC003_step1_given');

  // When the dashboard loads
  const sidebar = page.locator(SEL.sidebar);
  await sidebar.scrollIntoViewIfNeeded();
  await shot(page, 'GEO-79-TC003_step2_when');

  // Then the current sidebar item is visually highlighted (aria-current=page)
  const activeLink = page.locator(SEL.overviewActiveLink).first();
  await expect(activeLink, 'Overview link must have aria-current="page" to indicate active state').toBeVisible({ timeout: 10000 });

  await shotAt(page, sidebar, 'GEO-79-TC003_step3_then');
});

test('GEO-79-TC007 — Category sub-items stay displayed for non-category sections', async ({ page }) => {
  // Given the Editor is on Overview (a non-category section)
  await gotoDashboard(page);
  await shot(page, 'GEO-79-TC007_step1_given');

  // When the dashboard loads with Overview active
  const sidebar = page.locator(SEL.sidebar);
  await sidebar.scrollIntoViewIfNeeded();
  await shot(page, 'GEO-79-TC007_step2_when');

  // Then the category sub-items remain visible — accordion stays expanded across non-category sections
  const subItems = page.locator(SEL.categorySubItems);
  await expect(subItems.first(), 'Category sub-items must remain visible on Overview — the Categories accordion stays expanded across non-category sections').toBeVisible({ timeout: 10000 });

  await shotAt(page, sidebar, 'GEO-79-TC007_step3_then');
});

test('GEO-79-TC008 — Report header shows name and generated date', async ({ page }) => {
  // Given the Editor opens a completed report
  await gotoDashboard(page);
  await shot(page, 'GEO-79-TC008_step1_given');

  // When the dashboard loads
  await shot(page, 'GEO-79-TC008_step2_when');

  // Then the brand name (e.g. Chanel) and the Generated <date> label are displayed
  const generatedLabel = page.locator(SEL.generatedLabel).first();
  await expect(generatedLabel, '"Generated" label must be visible in the header').toBeVisible({ timeout: 10000 });

  await shotAt(page, generatedLabel, 'GEO-79-TC008_step3_then');
});

test('GEO-79-TC010 — AC3 it shows: back arrow next to brand image', async ({ page }) => {
  // Given the dashboard Top Section (brand bar)
  await gotoDashboard(page);
  await shot(page, 'GEO-79-TC010_step1_given');

  // When the dashboard loads
  await shot(page, 'GEO-79-TC010_step2_when');

  // Then it shows: a back arrow ("Back to Analysis") next to the brand image, the Generated date and the LLM filter
  const backBtn = page.locator(SEL.backBtnAnalysis).first();
  await expect(backBtn, 'Back arrow (aria-label="Back to Analysis") must be visible next to the brand image').toBeVisible({ timeout: 10000 });

  const llmFilterBtn = page.locator(SEL.llmFilterBtn).first();
  await expect(llmFilterBtn, 'LLM engine filters button must be visible in the top bar').toBeVisible({ timeout: 10000 });

  const generatedLabel = page.locator(SEL.generatedLabel).first();
  await expect(generatedLabel, '"Generated" date label must be visible in the top bar').toBeVisible({ timeout: 10000 });

  await shotAt(page, backBtn, 'GEO-79-TC010_step3_then');
});

// ═════════════════════════════════════════════════════════════════════════════
// GEO-78 — Filters
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-78-TC007 — LLM Engines dropdown lists engines', async ({ page }) => {
  // Given the Editor is on the dashboard
  await gotoDashboard(page);
  await shot(page, 'GEO-78-TC007_step1_given');

  // When the Editor opens the LLM Engines dropdown
  const llmBtn = page.locator(SEL.llmFilterBtn).first();
  await llmBtn.scrollIntoViewIfNeeded();
  await llmBtn.click();
  await page.waitForTimeout(500);
  await shot(page, 'GEO-78-TC007_step2_when');

  // Then the list of available LLMs is displayed with checkable items
  const switches = page.locator(SEL.llmSwitches);
  await expect(switches.first(), 'At least one LLM switch must be visible in the dropdown').toBeVisible({ timeout: 10000 });
  const switchCount = await switches.count();
  expect(switchCount, 'At least 2 LLM engine switches must be present').toBeGreaterThanOrEqual(2);

  await shotAt(page, switches.first(), 'GEO-78-TC007_step3_then');

  await page.keyboard.press('Escape');
});

// ═════════════════════════════════════════════════════════════════════════════
// GEO-72 — AI Perception Summary
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-72-TC001 — AI Perception Summary is displayed', async ({ page }) => {
  // Given an Editor opens the Overview page
  await gotoDashboard(page);
  await shot(page, 'GEO-72-TC001_step1_given');

  // When the AI Perception Summary section loads
  const perceptionH = page.locator(SEL.perceptionHeading).first();
  await perceptionH.scrollIntoViewIfNeeded();
  await shot(page, 'GEO-72-TC001_step2_when');

  // Then the summary shows perception findings, key opportunities, and warnings about misperceptions
  await expect(perceptionH, '"AI Perception Summary" heading must be visible').toBeVisible({ timeout: 15000 });

  await shotAt(page, perceptionH, 'GEO-72-TC001_step3_then');
});

// ═════════════════════════════════════════════════════════════════════════════
// GEO-107 — KPI Cards
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-107-TC001 — KPI cards are displayed', async ({ page }) => {
  // Given an Editor opens the Overview page
  await gotoDashboard(page);
  await shot(page, 'GEO-107-TC001_step1_given');

  // When the KPI section loads
  const visibilityCard = page.locator(SEL.kpiVisibility).first();
  await visibilityCard.scrollIntoViewIfNeeded();
  await shot(page, 'GEO-107-TC001_step2_when');

  // Then KPI cards are visible for Visibility, LLM Choice, and Sentiment with their labels
  await expect(visibilityCard, 'Visibility KPI card must be visible').toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.kpiLLMChoice).first(), 'LLM Choice KPI card must be visible').toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.kpiSentiment).first(), 'Sentiment KPI card must be visible').toBeVisible({ timeout: 10000 });

  await shotAt(page, visibilityCard, 'GEO-107-TC001_step3_then');
});

test.skip('GEO-107-TC011 — AC5 the card shows "N/A" with a muted style instead of 0', () => {
  // SKIPPED — Requires a dashboard where at least one KPI has no data (shows N/A instead of a value).
  // The Toyota prod dashboard (afcdc69f) has data for all KPI cards — no N/A state is reachable.
  // Re-enable with a dedicated JDD pointing to a dashboard in a partial-data state.
});

// ═════════════════════════════════════════════════════════════════════════════
// SKIPPED tests
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-79-TC004 — Sidebar navigation is SPA — filters persist across views', async ({ page }) => {
  // Given the Editor has active filters on Overview (at minimum the LLM filter is set)
  await gotoDashboard(page);
  await shot(page, 'GEO-79-TC004_step1_given');

  const beforeState = await H.captureFilterState(page);
  expect(beforeState.llms.length, 'At least one LLM must be active on Overview to make the filter-persistence test meaningful').toBeGreaterThan(0);

  // When the Editor clicks a different sidebar item (SPA navigation to a category sub-item)
  const firstCategoryLink = page.locator(SEL.categorySubItems).first();
  await expect(firstCategoryLink, 'A category sub-item must be visible in the sidebar to perform SPA navigation').toBeVisible({ timeout: 10000 });
  await firstCategoryLink.click();
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(800);
  await shot(page, 'GEO-79-TC004_step2_when');

  // Then the destination view renders AND the filters remain applied
  await H.expectFilterStatePersisted(page, { llms: beforeState.llms }, { scope: 'category page after SPA navigation' });
  await shot(page, 'GEO-79-TC004_step3_then');
});

test('GEO-79-TC005 — Dashboard pages load within 2 seconds', async ({ page }) => {
  // Given an Editor opens the dashboard once (auth + cookie banner handled by the helper)
  await gotoDashboard(page);
  await shot(page, 'GEO-79-TC005_step1_given');

  // When the page is requested again — measure the cache-warmed render time to the KPI section
  const kpiCard = page.locator(SEL.kpiVisibility).first();
  const ms = await H.measurePageLoadMs(page, DASHBOARD_URL, kpiCard, { waitUntil: 'commit', timeout: 30000 });
  await shot(page, 'GEO-79-TC005_step2_when');

  // Then the KPI section must be visible within 2000 ms (Overview SLA)
  expect(ms, `Overview must render the KPI section within 2000 ms (actual ${ms} ms)`).toBeLessThan(2000);
  await shotAt(page, kpiCard, 'GEO-79-TC005_step3_then');
});

test.skip('GEO-79-TC006 — [SKIP] Discard Changes modal appears', () => {
  // SKIPPED — Requires creating an unsaved changes state on the overview page.
  // The overview page is read-only; triggering unsaved changes requires Manage Scope edits.
  // Re-enable with a dedicated before/after dirty-state helper.
});

test.skip('GEO-79-TC009 — [SKIP] Report header has Share and Export buttons', () => {
  // SKIPPED — Share and Export buttons were not found in the DOM inspection of this
  // dashboard. These actions may be restricted by role/permission or not yet implemented.
  // Re-enable once DOM inspection confirms their presence on this dashboard.
});

// ═════════════════════════════════════════════════════════════════════════════
// Identity Cards — Brand Image / Employer Brand / ESG / Leadership
// ═════════════════════════════════════════════════════════════════════════════

test('IDENTITY-TC001 — All 5 LLM engines are active by default', async ({ page }) => {
  // Given an authenticated user is on the Toyota dashboard
  await gotoDashboard(page);
  await shot(page, 'IDENTITY-TC001_step1_given');

  // When the user opens the LLM Engines filter dropdown
  const llmBtn = page.locator(SEL.llmFilterBtn).first();
  await llmBtn.click();
  await page.waitForTimeout(500);
  await shot(page, 'IDENTITY-TC001_step2_when');

  // Then all 5 engines are toggled ON (aria-checked=true)
  const LLM_ENGINES = ['ChatGPT', 'Gemini', 'Grok', 'Claude', 'Perplexity'];
  for (const engine of LLM_ENGINES) {
    const toggle = page.locator(`button[role="switch"]`).filter({ has: page.locator(`xpath=ancestor::button[@aria-checked]`) }).first();
    // Use evaluate to check aria-checked per engine label
    const isChecked = await page.evaluate((name) => {
      const switches = Array.from(document.querySelectorAll('button[role="switch"]'));
      const row = switches.find(s => s.closest('[class]')?.innerText?.includes(name));
      return row ? row.getAttribute('aria-checked') === 'true' : null;
    }, engine);
    expect(isChecked, `LLM engine "${engine}" must be active (aria-checked=true)`).toBe(true);
  }

  await shotAt(page, llmBtn, 'IDENTITY-TC001_step3_then');
  await page.keyboard.press('Escape');
});

test('IDENTITY-TC002 — 4 identity cards present below InBrief', async ({ page }) => {
  // Given an authenticated user is on the Toyota dashboard with Identity tab active
  await gotoDashboard(page);
  await shot(page, 'IDENTITY-TC002_step1_given');

  // When the Identity section is fully rendered
  await page.waitForTimeout(1000);
  await shot(page, 'IDENTITY-TC002_step2_when');

  // Then exactly 4 cards are visible: Brand Image, Employer Brand, ESG / Sustainability, Leadership
  for (const title of SEL.identityCardTitles) {
    const card = page.locator(`span.font-semibold:has-text("${title}")`).first();
    await expect(card, `Identity card "${title}" must be visible`).toBeVisible({ timeout: 15000 });
  }

  const mainContent = page.locator('main').first();
  await shotAt(page, mainContent, 'IDENTITY-TC002_step3_then');
});

test('IDENTITY-TC003 — Each card shows sentiment badge and 3 AI bullets', async ({ page }) => {
  // Given the 4 identity cards are visible
  await gotoDashboard(page);
  await shot(page, 'IDENTITY-TC003_step1_given');

  // When the cards are fully rendered
  await page.locator(`span.font-semibold:has-text("${SEL.identityCardTitles[0]}")`).first().waitFor({ state: 'visible', timeout: 15000 });
  await shot(page, 'IDENTITY-TC003_step2_when');

  // Then each card has 1 sentiment badge + exactly 3 bullet points
  const sentimentLabels = [
    I18N.dashboard.reputation.positive,
    I18N.dashboard.reputation.negative,
    I18N.dashboard.reputation.mixed,
    'Neutral',
  ];
  const results = await page.evaluate(({ titles, sentimentLabels }) => {
    return titles.map(title => {
      const titleEl = Array.from(document.querySelectorAll('span')).find(s => s.textContent?.trim() === title);
      if (!titleEl) return { title, found: false };
      let card = titleEl.parentElement;
      for (let i = 0; i < 6; i++) {
        if (card && card.querySelectorAll('li').length >= 3) break;
        card = card?.parentElement;
      }
      const sentiment = Array.from(card?.querySelectorAll('span') || [])
        .find(s => sentimentLabels.includes(s.textContent?.trim()))?.textContent?.trim();
      const bulletCount = card ? Array.from(card.querySelectorAll('li')).filter(li => li.textContent?.trim()).length : 0;
      return { title, found: true, sentiment, bulletCount };
    });
  }, { titles: SEL.identityCardTitles, sentimentLabels });

  for (const r of results) {
    expect(r.found, `Card "${r.title}" must be found in the DOM`).toBe(true);
    expect(r.sentiment, `Card "${r.title}" must display a sentiment badge`).toBeTruthy();
    expect(r.bulletCount, `Card "${r.title}" must display exactly 3 bullet points`).toBe(3);
  }

  const mainContent = page.locator('main').first();
  await shotAt(page, mainContent, 'IDENTITY-TC003_step3_then');
});

test('IDENTITY-TC004 — Drill-in panel opens with 6 LLM tabs', async ({ page }) => {
  // Given the 4 identity cards are visible
  await gotoDashboard(page);
  await shot(page, 'IDENTITY-TC004_step1_given');

  // When the user clicks on the Brand Image card
  const brandImageCard = page.locator(`span.font-semibold:has-text("${SEL.identityCardTitles[0]}")`).first();
  await expect(brandImageCard, `"${SEL.identityCardTitles[0]}" card must be visible before clicking`).toBeVisible({ timeout: 15000 });
  await brandImageCard.click();
  await page.waitForTimeout(800);
  await shot(page, 'IDENTITY-TC004_step2_when');

  // Then the panel displays 6 tabs: All + 5 LLM engines
  const closeBtn = page.locator(SEL.closePanelBtn).first();
  await expect(closeBtn, 'Drill-in panel must be open (close button visible)').toBeVisible({ timeout: 10000 });

  const LLM_ENGINES = ['ChatGPT', 'Gemini', 'Grok', 'Claude', 'Perplexity'];
  for (const engine of LLM_ENGINES) {
    await expect(page.locator(`button[aria-label="${engine}"]`).first(),
      `LLM tab "${engine}" must be visible in the drill-in panel`).toBeVisible({ timeout: 5000 });
  }
  const allTab = page.locator('button').filter({ hasText: new RegExp(`^${I18N.dashboard.concepts.all}$`) }).first();
  await expect(allTab, `"${I18N.dashboard.concepts.all}" tab must be visible in the drill-in panel`).toBeVisible({ timeout: 5000 });

  await shotAt(page, closeBtn, 'IDENTITY-TC004_step3_then');

  await page.locator(SEL.closePanelBtn).first().click();
});

test('IDENTITY-TC005 — Per-LLM tab shows raw bullets and engine-specific sources', async ({ page }) => {
  // Given the Brand Image drill-in panel is open
  await gotoDashboard(page);
  await shot(page, 'IDENTITY-TC005_step1_given');

  const brandImageCard = page.locator(`span.font-semibold:has-text("${SEL.identityCardTitles[0]}")`).first();
  await expect(brandImageCard, `"${SEL.identityCardTitles[0]}" card must be visible`).toBeVisible({ timeout: 15000 });
  await brandImageCard.click();
  await page.locator(SEL.closePanelBtn).first().waitFor({ state: 'visible', timeout: 10000 });

  // Capture All-tab bullets as baseline
  const allBullets = await page.evaluate((closeSel) => {
    let container = document.querySelector(closeSel)?.parentElement;
    for (let i = 0; i < 8; i++) {
      if (container?.innerText?.includes('Sources') && container.querySelectorAll('li').length > 0) break;
      container = container?.parentElement;
    }
    return Array.from(container?.querySelectorAll('li') || []).map(li => li.textContent?.trim()).filter(Boolean);
  }, SEL.closePanelBtn);

  await shot(page, 'IDENTITY-TC005_step2_when');

  // Helper — find panel root that contains both bullets and sources
  const getPanelContent = () => page.evaluate((closeSel) => {
    // Walk up from the close button until we reach an ancestor that contains
    // both <li> bullet items AND <a href> source links (Sources section)
    let panel = document.querySelector(closeSel);
    for (let i = 0; i < 20; i++) {
      panel = panel?.parentElement;
      if (!panel) break;
      const hasBullets  = panel.querySelectorAll('li').length > 0;
      const hasLinks    = panel.querySelectorAll('a[href]').length > 0;
      const hasSourcesText = (panel.innerText || '').includes('Sources');
      if (hasBullets && hasLinks && hasSourcesText) break;
    }
    const bullets     = Array.from(panel?.querySelectorAll('li') || []).map(li => li.textContent?.trim()).filter(Boolean);
    const sourceCount = Array.from(panel?.querySelectorAll('a[href]') || []).filter(a => a.textContent?.trim()).length;
    return { bullets, sourceCount };
  }, SEL.closePanelBtn);

  // When switching to each LLM tab — Then raw bullets and sources are present per engine
  const LLM_ENGINES = ['ChatGPT', 'Gemini', 'Grok', 'Claude', 'Perplexity'];
  const perEngineBullets = {};
  for (const engine of LLM_ENGINES) {
    await page.locator(`button[aria-label="${engine}"]`).first().click();
    // Wait for panel content to update — sources load asynchronously after tab switch
    await page.waitForTimeout(1500);

    const { bullets, sourceCount } = await getPanelContent();

    expect(bullets.length, `Engine "${engine}" must show at least 3 raw bullets`).toBeGreaterThanOrEqual(3);
    expect(sourceCount, `Engine "${engine}" must show at least 1 cited source`).toBeGreaterThanOrEqual(1);

    perEngineBullets[engine] = bullets;
  }

  // Then at least 2 engines show different bullets (proves per-engine raw response, not consolidation)
  const uniqueFirstBullets = new Set(LLM_ENGINES.map(e => perEngineBullets[e]?.[0]));
  expect(uniqueFirstBullets.size, 'At least 2 LLM engines must show different first bullets — proving per-engine raw response (no consolidation)').toBeGreaterThanOrEqual(2);

  await shotAt(page, page.locator(SEL.closePanelBtn).first(), 'IDENTITY-TC005_step3_then');
  await page.locator(SEL.closePanelBtn).first().click();
});

test('GEO-78-TC001 — Default market filter is All Markets', async ({ page }) => {
  // Given an Editor opens the Overview page
  await gotoDashboard(page);
  await shot(page, 'GEO-78-TC001_step1_given');

  // When the dashboard loads with no market change
  const marketBtn = page.locator('[data-testid="market-dropdown-trigger"]').first();
  await expect(marketBtn, 'Market/Country filter button must be visible on the Overview page').toBeVisible({ timeout: 10000 });
  await shot(page, 'GEO-78-TC001_step2_when');

  // Then the country filter is set to the locale-specific "All" value by default
  const state = await H.captureFilterState(page);
  expect(state.market, `Default country filter must be "${I18N.dashboard.market.allMarkets}" (actual: "${state.market}")`).toMatch(new RegExp(I18N.dashboard.market.allMarkets, 'i'));
  await shotAt(page, marketBtn, 'GEO-78-TC001_step3_then');
});
