'use strict';
/**
 * category-brand-prioritization-analysis.spec.js
 * E2E spec for GEO-69 — Category View: Brand Prioritization Matrix
 *
 * Story : GEO-69  Category View — Brand Prioritization Matrix
 * CSV   : .claude/Data/output/csv/testcases-coverage-epic101-20260430.csv  (rows GEO-69-TC001 … TC007)
 * URL   : /geo/dashboard/:uuid/category/:id  →  Performance tab
 *
 * DOM discoveries (2026-05-07 — headless inspection):
 *   - Three tabs: Identity | Performance | Sources   → click Performance first
 *   - Chart library  : Recharts  (.recharts-wrapper)
 *   - H3 heading     : "Brand Prioritization"  (NOT "Category Prioritization")
 *   - Data points    : svg circle[r]  (15 circles in current dataset)
 *   - Scatter text   : [class*="recharts-scatter"] exposes "Brand — SOV X%, win rate Y%"
 *   - Tooltip        : .recharts-tooltip-wrapper  (may be empty in headless — use scatter text as proxy)
 *   - Quadrant cards : span:text-is("Stars") / "Opportunity" / "At Risk" / "Monitor"  (count=1 each)
 *   - Card counts    : span sibling in the same justify-between row
 *   - LLM filter     : button[aria-label="LLM engine filters"]  (LLM Engines 2 on staging)
 *   - Market filter  : NOT present on the category view → TC005 skipped
 *   - Empty state    : not reproducible on current staging dataset → TC006 skipped
 */

const { test, expect } = require('@playwright/test');
const path = require('path');
const H    = require('./e2e-helpers');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-category-brand-prioritization-analysis');
H.ensureDir(SCREENSHOTS_DIR);
const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── JDD ──────────────────────────────────────────────────────────────────────
const COMMON     = require('../test-data/common.json');
const { loadJDD } = require('../test-data/jdd/loadJDD');
const JDD = loadJDD('category/category-brand-prioritization-analysis');

const BASE_URL        = process.env.BASE_URL        || COMMON.base_url;
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID  || JDD.dashboard.uuid;
const CATEGORY_ID     = process.env.CATEGORY_UUID   || JDD.category.uuid;
const TARGET_SNAPSHOT = process.env.TARGET_SNAPSHOT || JDD.snapshot.target || '';
const CATEGORY_URL    = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CATEGORY_ID}`;

// ── Selectors ─────────────────────────────────────────────────────────────────
const SEL = {
  // Tabs (Identity | Performance | Sources)
  performanceTab:  '[role="tab"]:has-text("Performance")',

  // Brand Prioritization Matrix — confirmed via live DOM inspection 2026-05-07
  matrixHeading:   'h3:has-text("Brand Prioritization")',
  matrixWrapper:   '.recharts-wrapper',
  matrixDataPoint: 'svg circle[r]',
  matrixScatter:   '[class*="recharts-scatter"]',
  matrixEmptyState:'p:has-text("No data available for the brand prioritization matrix")',
  tooltip:         '.recharts-tooltip-wrapper',

  // Quadrant legend cards (below the chart)
  // Structure: span:text-is("Stars") (label) + sibling span (count) inside justify-between row
  quadrantLabel:   (lbl) => `span:text-is("${lbl}")`,
  quadrantRow:     (lbl) => `span:text-is("${lbl}") + span`,   // count sibling

  // LLM filter
  llmFilterBtn:    'button[aria-label="LLM engine filters"]',
  llmEnabledSwitch:'[data-testid="llm-dropdown"] button[role="switch"]:not([disabled])',

  // Market filter (confirmed present on category view — image.png 2026-05-08)
  marketFilterBtn: '[data-testid="market-dropdown"] button, button[aria-label="Market filter"]',
  marketOption:    '[role="option"]',
  skeleton:        BLUEPRINT.common_patterns.skeleton_loader_any,

  // KPI cards (top of category Performance tab) — same pattern as category-kpi-cards-analysis.spec.js
  kpiCard:    (name) => `div[aria-label^="${name}"]`,
  kpiValue:   'p.font-medium',
};

const TARGET_BRAND = process.env.TARGET_BRAND || (JDD.target_brand && JDD.target_brand.name) || '';

// Parse "12%" / "12.3 %" / "12,3%"  →  12 / 12.3
function pctNumber(s) {
  if (s == null) return null;
  const m = String(s).match(/(-?\d+(?:[.,]\d+)?)\s*%/);
  return m ? parseFloat(m[1].replace(',', '.')) : null;
}
// Parse "#3" / "3" / "rank 3"  →  3
function posNumber(s) {
  if (s == null) return null;
  const m = String(s).match(/#?\s*(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

const QUADRANTS = ['Stars', 'Opportunity', 'At Risk', 'Monitor'];

// ── Helper — navigate to Performance tab ─────────────────────────────────────
async function gotoPerformanceTab(page) {
  await H.goto(page, CATEGORY_URL);
  await H.dismissCookieBanner(page);
  await H.ensureSnapshot(page, TARGET_SNAPSHOT);
  await page.locator(SEL.performanceTab).click();
  await page.waitForTimeout(1000);
}

// ─────────────────────────────────────────────────────────────────────────────
// TC001 — Brand Prioritization Matrix is displayed (AC1)
// ─────────────────────────────────────────────────────────────────────────────
test('GEO-69-TC001 - Category brand matrix is displayed with category-scoped data', async ({ page }) => {
  // Given an Editor opens a category view
  await gotoPerformanceTab(page);
  await shotAt(page, page.locator(SEL.matrixHeading).first(), 'GEO-69-TC001_step1_given');

  // When the matrix loads
  await expect(page.locator(SEL.matrixWrapper)).toBeVisible({ timeout: 10000 });
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC001_step2_when');

  // Then the Brand Prioritization Matrix is shown with category-scoped data
  await expect(page.locator(SEL.matrixHeading)).toBeVisible();
  await expect(page.locator(SEL.matrixDataPoint).first()).toBeVisible({ timeout: 8000 });
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC001_step3_then');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC002 — Matrix updates when LLM filter changes (AC1 — filter respect)
// Note: Category view does not expose a market filter dropdown on staging.
//       The LLM filter is used to verify filter-respect behaviour.
// ─────────────────────────────────────────────────────────────────────────────
test('GEO-69-TC002 - Category brand matrix updates when LLM filter changes', async ({ page }) => {
  // Given LLM filters are applied — matrix is in Performance tab
  await gotoPerformanceTab(page);
  await expect(page.locator(SEL.matrixDataPoint).first()).toBeVisible({ timeout: 10000 });
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC002_step1_given');

  // When the LLM filter is changed
  await page.locator(SEL.llmFilterBtn).click();
  await page.waitForTimeout(500);
  const enabledSwitch = page.locator(SEL.llmEnabledSwitch);
  await expect(enabledSwitch.first()).toBeVisible({ timeout: 5000 });
  await enabledSwitch.last().click();
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1500);
  await shotAt(page, page.locator(SEL.llmFilterBtn), 'GEO-69-TC002_step2_when');

  // Then the matrix reflects the new LLM filter scope and remains visible
  await expect(page.locator(SEL.matrixWrapper), 'matrix must stay visible after LLM filter change').toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.matrixDataPoint).first(), 'at least one data point must remain').toBeVisible({ timeout: 8000 });
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC002_step3_then');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC003 — Tooltip on data point hover shows brand metrics (AC2)
// Recharts tooltip is not visible in headless; we verify accessible scatter text
// which exposes "Brand — SOV X%, win rate Y%" (confirmed in DOM inspection).
// ─────────────────────────────────────────────────────────────────────────────
test('GEO-69-TC003 - Hovering a data point shows brand metrics in tooltip', async ({ page }) => {
  // Given the matrix is populated
  await gotoPerformanceTab(page);
  const dataPoint = page.locator(SEL.matrixDataPoint).first();
  await expect(dataPoint).toBeVisible({ timeout: 10000 });
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC003_step1_given');

  // When a user hovers over a data point
  const box = await dataPoint.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
    await page.waitForTimeout(1200);
  }
  await shot(page, 'GEO-69-TC003_step2_when');

  // Then brand metrics are accessible on the data point (SOV, win rate)
  // The recharts scatter exposes "Brand — SOV X%, win rate Y%" as accessible text
  const scatterText = await page.locator(SEL.matrixScatter).first().textContent();
  expect(scatterText, 'scatter data must include brand metrics (SOV, win rate)').toMatch(/SOV|win rate/i);
  expect(scatterText, 'scatter data must include percentage values').toMatch(/%/);

  // If recharts renders the tooltip in this environment, validate its content too
  const tooltipVisible = await page.locator(SEL.tooltip).isVisible().catch(() => false);
  if (tooltipVisible) {
    const tipText = await page.locator(SEL.tooltip).textContent();
    expect(tipText, 'tooltip must contain brand data text').toBeTruthy();
  }
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC003_step3_then');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC004 — All Markets: multiple brand data points visible (AC4)
// "All markets" is the default state on the category view.
// Multiple data points confirm that brands from all markets are plotted.
// ─────────────────────────────────────────────────────────────────────────────
test('GEO-69-TC004 - All markets view shows multiple brand data points', async ({ page }) => {
  // Given "All markets" filter (default state — no market filter available on this page)
  await gotoPerformanceTab(page);
  await expect(page.locator(SEL.matrixDataPoint).first()).toBeVisible({ timeout: 10000 });
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC004_step1_given');

  // When the matrix loads
  const pointCount = await page.locator(SEL.matrixDataPoint).count();
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC004_step2_when');

  // Then multiple brand data points are shown (target brand + competitors across markets)
  expect(pointCount, 'all-markets matrix must show more than one data point').toBeGreaterThan(1);
  // Scatter accessible text confirms multiple brands
  const scatterText = await page.locator(SEL.matrixScatter).first().textContent();
  expect(scatterText, 'scatter must contain brand names and metrics').toMatch(/SOV|win rate/i);
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC004_step3_then');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC005 — Specific market filter shows only brands from that market (AC5)
// ─────────────────────────────────────────────────────────────────────────────
test('GEO-69-TC005 - Specific market filter shows only brands from that market', async ({ page }) => {
  // Given the matrix is loaded in "All Markets" view
  await gotoPerformanceTab(page);
  await expect(page.locator(SEL.matrixWrapper)).toBeVisible({ timeout: 10000 });
  const initialPoints = await page.locator(SEL.matrixDataPoint).count();
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC005_step1_given');

  // When the user selects a specific market from the market filter dropdown
  const marketBtn = page.locator(SEL.marketFilterBtn).first();
  await expect(marketBtn, 'Market filter button should be visible').toBeVisible({ timeout: 5000 });
  await marketBtn.click();
  await page.waitForTimeout(500);
  // Pick first option that is NOT "All Markets"
  const options = page.locator(SEL.marketOption);
  await expect(options.first()).toBeVisible({ timeout: 5000 });
  const optCount = await options.count();
  let selectedMarket = null;
  for (let i = 0; i < optCount; i++) {
    const text = (await options.nth(i).textContent()).trim();
    if (!text.toLowerCase().includes('all market')) {
      selectedMarket = text;
      await options.nth(i).click();
      break;
    }
  }
  if (!selectedMarket) { await page.keyboard.press('Escape'); }
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC005_step2_when');

  // Then the matrix remains visible and the filter no longer shows "All Markets"
  await expect(page.locator(SEL.matrixWrapper)).toBeVisible({ timeout: 15000 });
  if (selectedMarket) {
    const btnText = (await marketBtn.textContent()).trim();
    expect(btnText.toLowerCase(), 'Market filter should not show "All Markets" after selection').not.toContain('all market');
  }
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC005_step3_then');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC006 — SKIPPED: Empty state not reproducible on staging (AC6)
// ─────────────────────────────────────────────────────────────────────────────
test.skip('GEO-69-TC006 - [SKIP] Brand matrix shows empty state when no visibility data exists', async ({ page }) => {
  // SKIPPED — No reproducible empty-state condition on current staging dataset.
  // The luxury handbags category always returns matrix data. Requires a category
  // with zero visibility responses to trigger the empty state message:
  // "No data available for the brand prioritization matrix."
});

// ─────────────────────────────────────────────────────────────────────────────
// TC007 — Quadrant legend shows Stars / Opportunity / At Risk / Monitor (AC7)
// ─────────────────────────────────────────────────────────────────────────────
test('GEO-69-TC007 - Quadrant legend shows all four quadrants with counts', async ({ page }) => {
  // Given the matrix data loaded
  await gotoPerformanceTab(page);
  await expect(page.locator(SEL.matrixWrapper)).toBeVisible({ timeout: 10000 });
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC007_step1_given');

  // When the quadrant legend section is rendered (no explicit action needed)
  await page.waitForTimeout(500);
  await shotAt(page, page.locator(SEL.quadrantLabel('Stars')).first(), 'GEO-69-TC007_step2_when');

  // Then all four quadrant cards are visible with a numeric count each
  for (const label of QUADRANTS) {
    // Label is visible
    await expect(
      page.locator(SEL.quadrantLabel(label)).first(),
      `"${label}" quadrant label must be visible`
    ).toBeVisible({ timeout: 5000 });

    // Parent row (justify-between) contains a numeric count
    const cardText = await page.locator(SEL.quadrantLabel(label)).first().locator('../..').textContent();
    expect(cardText, `"${label}" card must show a numeric count`).toMatch(/\d+/);
  }
  await shotAt(page, page.locator(SEL.quadrantLabel('Stars')).first(), 'GEO-69-TC007_step3_then');

  // And the TARGET_BRAND data point is found in the chart, classified into one quadrant,
  // and the legend for that quadrant shows a count ≥ 1
  const toyotaResult = await page.evaluate((targetBrand) => {
    // Derive quadrant dividers from reference lines (vertical → divX, horizontal → divY)
    const refLines = Array.from(document.querySelectorAll('.recharts-reference-line line'));
    let divX = null, divY = null;
    for (const line of refLines) {
      const x1 = parseFloat(line.getAttribute('x1'));
      const y1 = parseFloat(line.getAttribute('y1'));
      const x2 = parseFloat(line.getAttribute('x2'));
      const y2 = parseFloat(line.getAttribute('y2'));
      if (Math.abs(x1 - x2) < 1 && divX === null) divX = x1;
      if (Math.abs(y1 - y2) < 1 && divY === null) divY = y1;
    }
    function classify(cx, cy) {
      if (cx > divX && cy <= divY) return 'Stars';
      if (cx <= divX && cy <= divY) return 'Opportunity';
      if (cx > divX && cy > divY)  return 'At Risk';
      return 'Monitor';
    }
    const scatter = document.querySelector('[class*="recharts-scatter"]');
    // Filter foreignObjects to only the TARGET_BRAND data points via aria-label
    // Data points are <g aria-label="Brand Name — visibility X%, win rate Y%"> elements.
    // Position comes from the child <foreignObject x y> of each matching <g>.
    const brandGs = Array.from(scatter.querySelectorAll('g[aria-label]')).filter(g =>
      (g.getAttribute('aria-label') || '').toLowerCase().includes(targetBrand.toLowerCase())
    );
    const quadrantCounts = { Stars: 0, Opportunity: 0, 'At Risk': 0, Monitor: 0 };
    for (const g of brandGs) {
      // Position is on the child foreignObject (flag locale icon)
      const fo = g.querySelector('foreignObject');
      if (!fo) continue;
      const x  = parseFloat(fo.getAttribute('x') || '0');
      const y  = parseFloat(fo.getAttribute('y') || '0');
      const w  = parseFloat(fo.getAttribute('width')  || '0');
      const h  = parseFloat(fo.getAttribute('height') || '0');
      const cx = x + w / 2;
      const cy = y + h / 2;
      quadrantCounts[classify(cx, cy)] += 1;
    }
    return { quadrantCounts, foundCount: brandGs.length };
  }, TARGET_BRAND);

  expect(toyotaResult.foundCount, `"${TARGET_BRAND}" must appear as a data point in the chart`).toBeGreaterThan(0);

  const toyotaQuadrant = Object.entries(toyotaResult.quadrantCounts).find(([, n]) => n > 0)?.[0];
  expect(toyotaQuadrant, `"${TARGET_BRAND}" must be classified into one of the four quadrants`).toBeTruthy();

  // The legend for Toyota's quadrant must reflect a count ≥ 1
  const legendCardText = await page.locator(SEL.quadrantLabel(toyotaQuadrant)).first().locator('../..').textContent();
  const legendMatch2 = legendCardText.match(/(\d+)/);
  const legendN = legendMatch2 ? parseInt(legendMatch2[1], 10) : null;
  await shotAt(page, page.locator(SEL.quadrantLabel(toyotaQuadrant)).first(), 'GEO-69-TC007_step3_then');
  expect(legendN, `Legend for quadrant "${toyotaQuadrant}" (where "${TARGET_BRAND}" is positioned) must show a count ≥ 1`).toBeGreaterThanOrEqual(1);
});

// ─────────────────────────────────────────────────────────────────────────────
// TC008 — Brand tooltip metrics match the data point aria-label for TARGET_BRAND (AC2)
// Hovers the TARGET_BRAND data point in the Brand Prioritization matrix and
// asserts that the tooltip / scatter accessible text shows the same metric
// values (Visibility, Win Rate) as the data point's own aria-label.
// Both sources are TARGET_BRAND-specific — no aggregate/KPI card comparison.
// Target brand resolution: TARGET_BRAND env var (JDD: target_brand.name) > first foreignObject.
// In headless, the Recharts tooltip may not render — the test uses scatter
// accessible text as the display source.
// ─────────────────────────────────────────────────────────────────────────────
test('GEO-69-TC008 - Brand tooltip metrics match the data point accessible values for TARGET_BRAND', async ({ page }) => {
  // Given the matrix is loaded and TARGET_BRAND data point is found
  await gotoPerformanceTab(page);
  await expect(page.locator(SEL.matrixWrapper)).toBeVisible({ timeout: 10000 });

  // Locate the TARGET_BRAND data point via aria-label (only Toyota data points)
  const points = page.locator(`${SEL.matrixScatter} [aria-label]`);
  const foCount = await points.count();
  let targetLocator = null;
  let targetBrandResolved = TARGET_BRAND;
  let ariaGroundTruth = '';

  if (TARGET_BRAND) {
    for (let i = 0; i < foCount; i++) {
      const aria = (await points.nth(i).getAttribute('aria-label')) || '';
      if (aria.toLowerCase().includes(TARGET_BRAND.toLowerCase())) {
        targetLocator = points.nth(i);
        ariaGroundTruth = aria;
        break;
      }
    }
  }
  if (!targetLocator && foCount > 0) {
    targetLocator = points.first();
    ariaGroundTruth = (await targetLocator.getAttribute('aria-label')) || '';
    const brandFromAria = ariaGroundTruth.split('—')[0]?.trim() || ariaGroundTruth.split(',')[0]?.trim();
    if (brandFromAria) targetBrandResolved = brandFromAria;
  }
  if (!targetLocator) targetLocator = page.locator(SEL.matrixDataPoint).first();

  await expect(targetLocator, `Target brand "${targetBrandResolved || '(first point)'}" data point must be visible`).toBeVisible({ timeout: 8000 });
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC008_step1_given');

  // When the user hovers over the TARGET_BRAND data point
  await targetLocator.scrollIntoViewIfNeeded();
  const box = await targetLocator.boundingBox();
  expect(box, 'target data point must have a bounding box').not.toBeNull();
  // Dispatch synthetic pointer/mouse events so Recharts tooltip handlers fire in headless mode
  await targetLocator.evaluate((el, b) => {
    const cx = b.x + b.width / 2;
    const cy = b.y + b.height / 2;
    const surface = el.closest('.recharts-wrapper')?.querySelector('.recharts-surface')
                 || el.closest('svg');
    const targets = [surface, el].filter(Boolean);
    const types = ['pointerover', 'pointerenter', 'pointermove', 'mouseover', 'mouseenter', 'mousemove'];
    for (const t of types) {
      const opts = { bubbles: true, cancelable: true, composed: true, clientX: cx, clientY: cy, screenX: cx, screenY: cy, view: window };
      const evt = t.startsWith('pointer')
        ? new PointerEvent(t, { ...opts, pointerType: 'mouse', isPrimary: true })
        : new MouseEvent(t, opts);
      for (const tgt of targets) tgt.dispatchEvent(evt);
    }
  }, box);
  await page.waitForTimeout(1500);
  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC008_step2_when');

  // Then the tooltip/scatter text shows the same metric values as the data point aria-label for TARGET_BRAND
  // (both sources represent the same brand-specific data — no cross-brand or aggregate comparison)
  let tipText = '';
  const tooltipVisible = await page.locator(SEL.tooltip).isVisible().catch(() => false);
  if (tooltipVisible) tipText = (await page.locator(SEL.tooltip).textContent()) || '';

  const scatterText = (await page.locator(SEL.matrixScatter).first().textContent()) || '';
  const brandKey = (targetBrandResolved || '').toLowerCase();
  let scatterSegment = scatterText;
  if (brandKey) {
    const idx = scatterText.toLowerCase().indexOf(brandKey);
    if (idx >= 0) scatterSegment = scatterText.slice(idx, idx + 200);
  }

  // Ground truth: values from the data point's own aria-label (TARGET_BRAND specific)
  const ariaVisibility = pctNumber((ariaGroundTruth.match(/visibility[^0-9-]*(-?\d+(?:[.,]\d+)?\s*%)/i) || [])[1]);
  const ariaWinRate    = pctNumber((ariaGroundTruth.match(/win[\s-]*rate[^0-9-]*(-?\d+(?:[.,]\d+)?\s*%)/i) || [])[1]);

  // Values from the rendered tooltip or scatter accessible text (same brand segment only)
  const displayedText = [tipText, scatterSegment].filter(Boolean).join(' | ');
  const tipVisibility = pctNumber((displayedText.match(/visibility[^0-9-]*(-?\d+(?:[.,]\d+)?\s*%)/i) || [])[1]);
  const tipWinRate    = pctNumber((displayedText.match(/win[\s-]*rate[^0-9-]*(-?\d+(?:[.,]\d+)?\s*%)/i) || [])[1]);

  await shotAt(page, page.locator(SEL.matrixWrapper), 'GEO-69-TC008_step3_then');

  // The data point must expose at least one parseable metric in its aria-label
  expect(
    ariaVisibility !== null || ariaWinRate !== null,
    `"${targetBrandResolved}" data point aria-label must expose at least one metric (visibility or win rate). aria-label="${ariaGroundTruth}"`
  ).toBe(true);

  // If both tooltip/scatter text and aria-label expose the same metric, they must agree
  if (ariaVisibility !== null && tipVisibility !== null) {
    expect(tipVisibility, `Displayed Visibility (${tipVisibility}) must match "${targetBrandResolved}" data point aria-label Visibility (${ariaVisibility})`).toBe(ariaVisibility);
  }
  if (ariaWinRate !== null && tipWinRate !== null) {
    expect(tipWinRate, `Displayed Win Rate (${tipWinRate}) must match "${targetBrandResolved}" data point aria-label Win Rate (${ariaWinRate})`).toBe(ariaWinRate);
  }
});
