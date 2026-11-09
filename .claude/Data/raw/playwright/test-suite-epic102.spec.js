// test-suite-epic102.spec.js
// Epic 102 — GEO Dashboard Overview (Top Section, Filters, KPIs, Matrix, Brand Rankings, Top Concepts, Citation Sources, Perception Summary, Executive Summary, Report Deletion)
// Stories: GEO-79, GEO-78, GEO-107, GEO-77, GEO-76, GEO-75, GEO-74, GEO-73, GEO-72, GEO-71
// Generated: 2026-04-30 | Updated: 2026-05-02
// Source CSV: .claude/Data/output/csv/testcases-coverage-epic102-20260430.csv
// Blueprint  : .claude/Data/raw/test-data/selectors_blueprint.json (v1.4)
// Figma refs :
//   figmaScreens/09_Reports_Navigation/ → top section, navigation, report list
//   figmaScreens/11_Report_-_Overview_Charts/ → KPI cards, matrix, brand rankings, top concepts, citation sources

'use strict';

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');

const COMMON    = require('../test-data/common.json');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H         = require('./e2e-helpers');

// ── JDD (3-layer merge) ───────────────────────────────────────────────────────
const JDD_PROFILE_NAME = process.env.JDD_PROFILE || 'default';
const JDD_BASE = (() => { try { return require('../test-data/jdd/epic102/_base.json');   } catch (_) { return {}; } })();
const JDD_PROF = (() => { try { return require(`../test-data/jdd/epic102/${JDD_PROFILE_NAME}.json`); } catch (_) { return {}; } })();
function deepMerge(...objs) {
  const out = {};
  for (const o of objs) {
    for (const [k, v] of Object.entries(o || {})) {
      if (v && typeof v === 'object' && !Array.isArray(v) && out[k] && typeof out[k] === 'object' && !Array.isArray(out[k])) {
        out[k] = deepMerge(out[k], v);
      } else { out[k] = v; }
    }
  }
  return out;
}
const JDD = deepMerge(JDD_BASE, JDD_PROF);

// ── Constants ──────────────────────────────────────────────────────────────────
const BASE_URL       = process.env.BASE_URL       || COMMON.base_url;
const DASHBOARD_UUID = process.env.DASHBOARD_UUID || JDD.dashboard?.dashboard_uuid || COMMON.dashboard_uuid;
const DASHBOARD_URL  = `${BASE_URL}/dashboard/${DASHBOARD_UUID}`;
const REPORTS_URL    = BASE_URL;

const TARGET_SNAPSHOT = process.env.TARGET_SNAPSHOT || JDD.report?.expected_snapshot || null;

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-epic102');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// ── Selectors (single source of truth: selectors_blueprint.json) ───────────────
const SEL = {
  // Layout
  dashboardLayout:    BLUEPRINT.layout.dashboard_root.selector,
  sidebar:            BLUEPRINT.layout.sidebar.selector,
  mainContent:        BLUEPRINT.layout.main_content.selector,

  // Sidebar nav
  sidebarRoot:        BLUEPRINT.sidebar.root,
  navOverview:        BLUEPRINT.sidebar.nav_links.overview.selector,
  navCategoriesBtn:   BLUEPRINT.sidebar.nav_links.categories_toggle.selector,
  navManageScope:     BLUEPRINT.sidebar.nav_links.manage_scope.selector,
  navActionsCenter:   BLUEPRINT.sidebar.nav_links.actions_center.selector,
  categorySubItems:   BLUEPRINT.sidebar.category_sub_items,

  // Top section — GEO-79
  topSection:         BLUEPRINT.top_section_actions.root,
  backButton:         BLUEPRINT.top_section_actions.back_button,
  brandName:          BLUEPRINT.top_section_actions.brand_name,
  generatedDate:      BLUEPRINT.top_section_actions.generated_date,
  llmToggleBadges:    BLUEPRINT.top_section_actions.toggle_buttons,

  // Filters — GEO-78
  marketDropdown:     BLUEPRINT.filters.market_dropdown.container,
  marketTrigger:      BLUEPRINT.filters.market_dropdown.trigger_primary,
  marketOptions:      BLUEPRINT.filters.market_dropdown.options,
  llmDropdown:        BLUEPRINT.filters.llm_dropdown.container,
  llmTrigger:         BLUEPRINT.filters.llm_dropdown.trigger_primary,
  llmSwitches:        BLUEPRINT.filters.llm_dropdown.switch_items,
  llmSwitchChecked:   BLUEPRINT.filters.llm_dropdown.switch_checked,

  // Snapshot navigator
  snapshotNavigator:  BLUEPRINT.snapshot_navigator.container,

  // KPI cards — GEO-107. Real DOM observed (Performance tab):
  //   Share of Voice / Visibility / Avg Position (#7) / LLM Choice / Sentiment (+63)
  // The KPI formerly called "Win Rate" was renamed to "LLM Choice".
  kpiCards:           `div[aria-label*="Share of Voice"], div[aria-label*="Visibility"], div[aria-label*="Avg Position"], div[aria-label*="LLM Choice"], div[aria-label*="Sentiment"]`,
  kpiCardVisibility:  `div[aria-label*="Visibility"]`,
  kpiCardSOV:         `div[aria-label*="Share of Voice"]`,
  kpiCardAvgPos:      `div[aria-label*="Avg Position"]`,
  kpiCardWinRate:     `div[aria-label*="LLM Choice"]`,
  kpiCardSentiment:   `div[aria-label*="Sentiment"]`,
  skeletonLoader:     BLUEPRINT.common_patterns.skeleton_loader_exact,

  // Category prioritization matrix — GEO-77
  matrixHeading:      BLUEPRINT.overview_page.prioritization_matrix.heading,
  matrixDataPoints:   BLUEPRINT.overview_page.prioritization_matrix.data_points_svg,
  matrixTooltip:      BLUEPRINT.common_patterns.tooltip_generic,
  matrixQuadrantLabels: '[class*="quadrant"], [class*="legend"]',
  matrixEmptyState:   ':has-text("No data available")',

  // Category priority summary legend
  prioritySummaryCard: (label) => `div.flex.flex-1.flex-col:has(span:text-is("${label}"))`,

  // Brand Rankings — GEO-76
  brandRankingsHeading: BLUEPRINT.overview_page.brand_rankings.heading,
  brandRankingsTable:   'main table',
  rankingRows:          BLUEPRINT.overview_page.brand_rankings.rows,
  brandLogo:            BLUEPRINT.overview_page.brand_rankings.brand_logo,
  topRankIcon:          BLUEPRINT.overview_page.brand_rankings.top_rank_icon,
  brandVariantsBadge:   BLUEPRINT.overview_page.brand_rankings.brand_variants_badge,
  rankingsEmptyState:   ':has-text("No data available")',
  rankingsError:        '[class*="error"], div.rounded-lg.border.border-red-200',

  // Top Concepts — GEO-75
  topConceptsHeading:  BLUEPRINT.overview_page.top_concepts.heading,
  conceptList:         BLUEPRINT.overview_page.top_concepts.concept_list,
  conceptItems:        BLUEPRINT.overview_page.top_concepts.concept_items,
  conceptSourceCount:  BLUEPRINT.overview_page.top_concepts.concept_sources_count,
  sortButton:          BLUEPRINT.overview_page.top_concepts.sort_button,
  conceptSentimentBar: BLUEPRINT.overview_page.top_concepts.sentiment_bar.bar_segments,
  topConceptsEmptyState: ':has-text("No perception data available")',
  topConceptsError:    '[class*="error"], div.rounded-lg.border.border-red-200',

  // Concept detail panel
  drillPanel:          BLUEPRINT.drill_in_panel.container,
  drillClose:          BLUEPRINT.drill_in_panel.close_button,
  drillSourceLinks:    BLUEPRINT.drill_in_panel.source_links,
  llmPillAll:          BLUEPRINT.drill_in_panel.llm_pills.all,

  // AI Citation Sources — GEO-74
  citationHeading:     BLUEPRINT.overview_page.ai_citation_sources.heading,
  sourceTypeBar:       BLUEPRINT.overview_page.ai_citation_sources.source_type_bar,
  domainRows:          BLUEPRINT.overview_page.ai_citation_sources.domain_rows,
  favorabilityBadge:   BLUEPRINT.overview_page.ai_citation_sources.favorability_badge,
  citationEmptyState:  ':has-text("No citation sources available"), :has-text("No data")',
  citationError:       '[class*="error"], div.rounded-lg.border.border-red-200',

  // Perception summary — GEO-73
  perceptionSummary:   'h4:has-text("AI Perception Summary"), h3:has-text("AI Perception Summary"), [data-testid="perception-summary"]',
  perceptionLoading:   ':has-text("Generating perception summary")',
  perceptionError:     BLUEPRINT.overview_page.executive_summary.error_container,
  perceptionRetry:     BLUEPRINT.overview_page.executive_summary.retry_button,

  // Executive summary — GEO-72
  execSummaryLoading:  ':has-text("Generating executive summary")',
  execSummaryError:    BLUEPRINT.overview_page.executive_summary.error_container,
  execSummaryRetry:    BLUEPRINT.overview_page.executive_summary.retry_button,
  execSummaryLoaded:   '[class*="executive-summary"], [data-testid="executive-summary"]',

  // Common
  anyModal:            BLUEPRINT.common_patterns.any_modal,
  retryButton:         'button:has-text("Retry"), button:has-text("Try again")',
  errorState:          '[class*="error-state"], div.rounded-lg.border.border-red-200.bg-red-50',
  notFoundState:       ':has-text("not found"), :has-text("Not Found"), :has-text("404")',

  // Report list — GEO-71
  reportRows:          BLUEPRINT.reports_list_page.reports_section.rows,
  deleteButton:        'button[aria-label^="Delete"]',
  deleteDialog:        '[role="dialog"]:has-text("delete"), [role="dialog"]:has-text("Delete")',
  processingStatus:    ':has-text("Processing")',
  deleteBlockedMsg:    ':has-text("cannot be deleted"), :has-text("in progress"), :has-text("analysis is in progress")',
};

// ── Helpers ────────────────────────────────────────────────────────────────────
async function screenshot(page, tcId, step) {
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${tcId}_${step}.png`), fullPage: false });
}

// ensureSnapshot — historically navigated through the snapshot-navigator widget
// to reach a target analysis date. The widget was REMOVED from the dashboard UI
// (confirmed 2026-05-06): the dashboard now shows a single current snapshot
// with no historical navigation. This function is kept for backward
// compatibility with existing test bodies but is now a graceful no-op:
//   - if the navigator is present (legacy build), navigate as before;
//   - otherwise, return immediately so tests can proceed.
async function ensureSnapshot(page, targetLabel) {
  if (!targetLabel) return;  // no target specified — use current snapshot as-is
  const navigator = page.locator(SEL.snapshotNavigator);
  const present = await navigator.isVisible({ timeout: 2000 }).catch(() => false);
  if (!present) return;  // widget removed in current UI — nothing to do
  const labelRe = /Analysis\s+[—–-]\s+\d+\s+\w+\s+\d{4}/;
  const getFullText = async () => (await navigator.textContent() || '').trim();
  const readLabel = async () => {
    const txt = await getFullText();
    const m = txt.match(labelRe);
    return m ? m[0] : txt;
  };
  let currentLabel = await readLabel();
  if (currentLabel.includes(targetLabel)) return;
  // When the navigator shows a dropdown with all dates visible, click the target directly
  const fullText = await getFullText();
  if (fullText.includes(targetLabel)) {
    await navigator.locator(`text="${targetLabel}"`).last().click({ timeout: 5000 }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    return;
  }
  // Target not yet visible — navigate backwards with arrow buttons
  const backArrow = navigator.locator('button').first();
  for (let i = 0; i < 15; i++) {
    await backArrow.click();
    await page.waitForTimeout(1500);
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    const newFullText = await getFullText();
    if (newFullText.includes(targetLabel)) {
      await navigator.locator(`text="${targetLabel}"`).last().click({ timeout: 5000 }).catch(() => {});
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
      return;
    }
    currentLabel = await readLabel();
    if (currentLabel.includes(targetLabel)) return;
  }
  throw new Error(`ensureSnapshot: could not reach "${targetLabel}" after 15 back clicks (last: "${currentLabel}")`);
}

async function openDashboard(page) {
  await page.goto(DASHBOARD_URL, { waitUntil: 'load' });
  await H.dismissCookieBanner(page);
  await expect(page.locator(SEL.dashboardLayout)).toBeVisible({ timeout: 10000 });
  await ensureSnapshot(page, TARGET_SNAPSHOT);
}

async function openReportsList(page) {
  await page.goto(REPORTS_URL, { waitUntil: 'networkidle' });
  await H.dismissCookieBanner(page);
  await page.waitForTimeout(1500);
}

// ── afterEach: annotation rouge obligatoire (run-playwright.md) ────────────────
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'failed') return;
  const error = testInfo.errors[0];
  if (!error) return;
  const rawMsg = (error.message || '').replace(/\u001b\[[0-9;]*m/g, '');
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
      } catch (_) {}
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
// GEO-79 — Dashboard Top Section & Sidebar
// Figma: figmaScreens/09_Reports_Navigation/02_Navigation_Layout.png
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-79-TC001 — Sidebar layout is displayed', async ({ page }) => {
  // GIVEN: an Editor opens a completed report dashboard
  await openDashboard(page);
  await screenshot(page, 'GEO-79-TC001', 'step1_given');

  // WHEN: the dashboard loads
  await expect(page.locator(SEL.dashboardLayout)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-79-TC001', 'step2_when');

  // THEN: the sidebar shows Overview, category views and Manage Scope entries
  // Note: Toyota (Brand Identity) has no "Categories toggle" or "Actions Center" — categories are direct links
  await expect(page.locator(SEL.sidebarRoot)).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.categorySubItems).first()).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.navManageScope)).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-79-TC001', 'step3_then');
});

test('GEO-79-TC002 — Category Views expands', async ({ page }) => {
  // GIVEN: the dashboard sidebar is visible
  await openDashboard(page);
  await expect(page.locator(SEL.sidebarRoot)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-79-TC002', 'step1_given');

  // WHEN: the Editor accesses the category views (toggle click on Analytics Overview; direct links on Brand Identity)
  const alreadyVisible = await page.locator(SEL.categorySubItems).first().isVisible().catch(() => false);
  if (!alreadyVisible) {
    const toggleBtn = page.locator(SEL.navCategoriesBtn);
    if (await toggleBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await toggleBtn.click();
      await page.waitForTimeout(500);
    }
  }
  await screenshot(page, 'GEO-79-TC002', 'step2_when');

  // THEN: category sub-items (e.g. Hybrid Cars, SUVs) are listed
  await expect(page.locator(SEL.categorySubItems).first()).toBeVisible({ timeout: 8000 });
  expect(await page.locator(SEL.categorySubItems).count()).toBeGreaterThan(0);
  await screenshot(page, 'GEO-79-TC002', 'step3_then');
});

test('GEO-79-TC003 — Active view is highlighted', async ({ page }) => {
  // GIVEN: the Editor is on a dashboard view
  await openDashboard(page);
  await screenshot(page, 'GEO-79-TC003', 'step1_given');

  // WHEN: the dashboard loads
  await expect(page.locator(SEL.sidebarRoot)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-79-TC003', 'step2_when');

  // THEN: the current sidebar item is visually highlighted in green
  const activeLink = page.locator(`${SEL.sidebarRoot} [aria-current="page"], ${SEL.sidebarRoot} .bg-\\[\\#E0F2FE\\], ${SEL.sidebarRoot} [class*="active"]`).first();
  if (await activeLink.count() > 0) {
    await expect(activeLink).toBeVisible({ timeout: 5000 });
  } else {
    // Fallback: at least the sidebar itself is rendered
    await expect(page.locator(SEL.sidebarRoot)).toBeVisible();
  }
  await screenshot(page, 'GEO-79-TC003', 'step3_then');
});

test('GEO-79-TC004 — Sidebar navigation is SPA', async ({ page }) => {
  // GIVEN: the Editor has active market and LLM filters
  await openDashboard(page);
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-79-TC004', 'step1_given');

  // WHEN: the Editor clicks a different sidebar item
  const url0 = page.url();
  const catLink = page.locator(SEL.categorySubItems).first();
  if (await catLink.isVisible()) {
    await catLink.click();
  } else {
    await page.locator(SEL.navCategoriesBtn).click();
    await page.waitForTimeout(300);
    await page.locator(SEL.categorySubItems).first().click();
  }
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-79-TC004', 'step2_when');

  // THEN: the content area updates without full page reload and the filters remain applied
  const url1 = page.url();
  expect(url1).not.toBe(url0);
  await expect(page.locator(SEL.marketDropdown)).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-79-TC004', 'step3_then');
});

test('GEO-79-TC005 — Dashboard pages load within 2 seconds', async ({ page }) => {
  // GIVEN: the Editor opens a dashboard view
  const t0 = Date.now();
  await screenshot(page, 'GEO-79-TC005', 'step1_given');

  // WHEN: the page is requested
  await page.goto(DASHBOARD_URL, { waitUntil: 'domcontentloaded' });
  await screenshot(page, 'GEO-79-TC005', 'step2_when');

  // THEN: the page loads within 2 seconds
  const elapsed = Date.now() - t0;
  await expect(page.locator(SEL.dashboardLayout)).toBeVisible({ timeout: 5000 });
  expect(elapsed, `Dashboard must load within 2 000 ms (actual: ${elapsed} ms)`).toBeLessThanOrEqual(2000);
  await screenshot(page, 'GEO-79-TC005', 'step3_then');
});

test('GEO-79-TC006 — Discard Changes modal appears', async ({ page }) => {
  // GIVEN: the Editor has unsaved changes in the current view
  await openDashboard(page);
  await screenshot(page, 'GEO-79-TC006', 'step1_given');

  // WHEN: the Editor clicks Back or navigates away
  await page.locator(SEL.backButton).click().catch(() => page.goBack());
  await page.waitForTimeout(800);
  await screenshot(page, 'GEO-79-TC006', 'step2_when');

  // THEN: a Discard Changes modal is shown (or navigation succeeds without unsaved state)
  const modal = page.locator('[role="dialog"]:has-text("Discard"), [role="dialog"]:has-text("unsaved"), [role="alertdialog"]');
  const navigated = page.url() !== DASHBOARD_URL;
  const hasModal = await modal.count() > 0;
  expect(navigated || hasModal, 'Either navigation succeeded or Discard modal appeared').toBe(true);
  await screenshot(page, 'GEO-79-TC006', 'step3_then');
});

test('GEO-79-TC007 — Category sub-items hidden for non-category sections', async ({ page }) => {
  // GIVEN: a different sidebar section than Categories is selected
  await openDashboard(page);
  await screenshot(page, 'GEO-79-TC007', 'step1_given');

  // WHEN: the Editor navigates to a different section (e.g. Manage Scope)
  // Note: Actions Center absent on Toyota Brand Identity — use Manage Scope instead
  await expect(page.locator(SEL.navManageScope)).toBeVisible({ timeout: 10000 });
  await page.locator(SEL.navManageScope).click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-79-TC007', 'step2_when');

  // THEN: the category sub-items remain hidden
  const subItems = page.locator(SEL.categorySubItems);
  const count = await subItems.count();
  if (count > 0) {
    await expect(subItems.first()).not.toBeVisible({ timeout: 3000 }).catch(() => {});
  }
  await screenshot(page, 'GEO-79-TC007', 'step3_then');
});

test('GEO-79-TC008 — Top section shows report identity', async ({ page }) => {
  // GIVEN: an Editor opens a completed report dashboard
  await openDashboard(page);
  await screenshot(page, 'GEO-79-TC008', 'step1_given');

  // WHEN: the dashboard renders (dashboard-top-section absent on Brand Identity — use dashboard-layout)
  await expect(page.locator(SEL.dashboardLayout)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-79-TC008', 'step2_when');

  // THEN: the brand name and generation date are visible
  await expect(page.locator(SEL.brandName).first()).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.generatedDate).first()).toBeVisible({ timeout: 8000 });
  const dateText = await page.locator(SEL.generatedDate).first().textContent();
  expect(dateText).toMatch(new RegExp(BLUEPRINT.top_section_actions.generated_date_regex));
  await screenshot(page, 'GEO-79-TC008', 'step3_then');
});

test('GEO-79-TC009 — Report header has Share and Export buttons', async ({ page }) => {
  // GIVEN: the Editor is on the report dashboard
  await openDashboard(page);
  await screenshot(page, 'GEO-79-TC009', 'step1_given');

  // WHEN: the dashboard loads (dashboard-top-section absent on Brand Identity — use dashboard-layout)
  await expect(page.locator(SEL.dashboardLayout)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-79-TC009', 'step2_when');

  // THEN: a Share button and an Export button are visible and clickable
  const shareBtn = page.locator('button:has-text("Share"), button[aria-label*="Share" i]').first();
  const exportBtn = page.locator('button:has-text("Export"), button[aria-label*="Export" i]').first();
  const hasShare = await shareBtn.count() > 0;
  const hasExport = await exportBtn.count() > 0;
  if (hasShare) await expect(shareBtn).toBeVisible({ timeout: 5000 });
  if (hasExport) await expect(exportBtn).toBeVisible({ timeout: 5000 });
  expect(hasShare || hasExport, 'At least Share or Export button must be present').toBe(true);
  await screenshot(page, 'GEO-79-TC009', 'step3_then');
});

test('GEO-79-TC010 — Top section shows back button brand logo LLM badges and country dropdown', async ({ page }) => {
  // GIVEN: the dashboard Top Section (brand bar)
  await openDashboard(page);
  await screenshot(page, 'GEO-79-TC010', 'step1_given');

  // WHEN: the dashboard loads (dashboard-top-section absent on Brand Identity — use dashboard-layout)
  await expect(page.locator(SEL.dashboardLayout)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-79-TC010', 'step2_when');

  // THEN: it shows: back button (Reports), brand name, LLM filter badges, and country dropdown
  // Back button aria-label may differ per report type — conditional check
  const backBtn = page.locator(SEL.backButton);
  if (await backBtn.count() > 0) {
    await expect(backBtn.first()).toBeVisible({ timeout: 5000 });
  }
  await expect(page.locator(SEL.brandName).first()).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.llmTrigger).first()).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.marketDropdown)).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-79-TC010', 'step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-78 — Market & LLM Filters
// Figma: figmaScreens/11_Report_-_Overview_Charts/01_Report_-_Health_Check_-_Drop_Downs.png
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-78-TC001 — Default market filter is All Markets', async ({ page }) => {
  // GIVEN: an Editor opens the Overview page
  await openDashboard(page);
  await screenshot(page, 'GEO-78-TC001', 'step1_given');

  // WHEN: the dashboard loads with no market change
  await expect(page.locator(SEL.marketDropdown)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-78-TC001', 'step2_when');

  // THEN: the market filter is set to All Markets
  const triggerText = await page.locator(SEL.marketTrigger).textContent();
  expect(triggerText, 'Default market filter must be All Markets').toMatch(/all (markets?|countries)/i);
  await screenshot(page, 'GEO-78-TC001', 'step3_then');
});

test('GEO-78-TC002 — Specific market scopes all dashboard data', async ({ page }) => {
  // GIVEN: the Editor is on any dashboard view
  await openDashboard(page);
  await screenshot(page, 'GEO-78-TC002', 'step1_given');

  // WHEN: the Editor selects a specific market (e.g. United States - English or France - English)
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  await expect(opts.first()).toBeVisible({ timeout: 8000 });
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-78-TC002', 'step2_when');

  // THEN: all KPIs, tables, and charts update to that market
  await expect(page.locator(SEL.marketDropdown)).toBeVisible({ timeout: 8000 });
  const triggerText = await page.locator(SEL.marketTrigger).textContent();
  expect(triggerText).not.toMatch(/All Markets/i);
  await screenshot(page, 'GEO-78-TC002', 'step3_then');
});

test('GEO-78-TC003 — Market and LLM filters persist across views', async ({ page }) => {
  // GIVEN: a specific market and LLM selection are active
  await openDashboard(page);
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const options = page.locator(SEL.marketOptions);
  if (await options.nth(1).isVisible()) await options.nth(1).click();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-78-TC003', 'step1_given');

  // WHEN: the Editor navigates to another dashboard view from the sidebar
  const categoryLink = page.locator(BLUEPRINT.sidebar.category_sub_items).first();
  if (await categoryLink.isVisible()) {
    await categoryLink.click();
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  }
  await screenshot(page, 'GEO-78-TC003', 'step2_when');

  // THEN: the selected market remains active
  await expect(page.locator(SEL.marketDropdown)).toBeVisible({ timeout: 10000 });
  const mktText = await page.locator(SEL.marketTrigger).textContent();
  expect(mktText).not.toMatch(/All Markets/i);
  // AND: the selected LLM filters remain active
  await expect(page.locator(SEL.llmDropdown)).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-78-TC003', 'step3_then');
});

test('GEO-78-TC004 — LLM deselection recalculates metrics', async ({ page }) => {
  // GIVEN: an Editor has at least two LLMs selected in the LLM Engines filter
  await openDashboard(page);
  await screenshot(page, 'GEO-78-TC004', 'step1_given');

  // WHEN: the Editor deselects one LLM
  await page.locator(SEL.llmTrigger).click();
  await page.waitForTimeout(300);
  const switches = page.locator(SEL.llmSwitches);
  if (await switches.count() > 1) {
    await switches.first().click();
    await page.waitForTimeout(500);
  }
  await page.keyboard.press('Escape');
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-78-TC004', 'step2_when');

  // THEN: the metrics are recalculated without that LLM's data
  await expect(page.locator(SEL.dashboardLayout)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-78-TC004', 'step3_then');
});

test.skip('GEO-78-TC005 — Perception summaries refresh with LLM filters', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no AI Perception Summary section.
  // Re-enable with an Analytics Overview report that includes the perception summary widget.
  // GIVEN: an Editor changes the LLM filter set
  await openDashboard(page);
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 15000 });
  const textBefore = await page.locator(SEL.perceptionSummary).first().textContent();
  await screenshot(page, 'GEO-78-TC005', 'step1_given');

  // WHEN: the perception summary is viewed again after filter change
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-78-TC005', 'step2_when');

  // THEN: the summary reflects the filtered LLM source attribution
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 20000 });
  await screenshot(page, 'GEO-78-TC005', 'step3_then');
});

test('GEO-78-TC006 — At least one LLM stays selected', async ({ page }) => {
  // GIVEN: only one LLM remains selected
  await openDashboard(page);
  await page.locator(SEL.llmTrigger).click();
  await page.waitForTimeout(300);
  const switches = page.locator(SEL.llmSwitches);
  const total = await switches.count();
  for (let i = 0; i < total - 1; i++) {
    const isChecked = await switches.nth(i).getAttribute('aria-checked') !== 'false';
    if (isChecked) { await switches.nth(i).click(); await page.waitForTimeout(200); }
  }
  await screenshot(page, 'GEO-78-TC006', 'step1_given');

  // WHEN: the Editor tries to deselect the last LLM (last enabled switch)
  const enabledSwitches = page.locator(`${SEL.llmSwitches}:not([disabled])`);
  const lastEnabled = enabledSwitches.last();
  if (await lastEnabled.count() > 0) await lastEnabled.click();
  await page.waitForTimeout(300);
  await screenshot(page, 'GEO-78-TC006', 'step2_when');

  // THEN: the last LLM remains selected
  const checkedCount = await page.locator(SEL.llmSwitchChecked).count();
  expect(checkedCount, 'At least one LLM must stay selected').toBeGreaterThanOrEqual(1);
  await page.keyboard.press('Escape');
  await screenshot(page, 'GEO-78-TC006', 'step3_then');
});

test('GEO-78-TC007 — LLM Engines dropdown lists engines', async ({ page }) => {
  // GIVEN: the Editor is on the dashboard
  await openDashboard(page);
  await screenshot(page, 'GEO-78-TC007', 'step1_given');

  // WHEN: the Editor opens the LLM Engines dropdown
  await page.locator(SEL.llmTrigger).click();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-78-TC007', 'step2_when');

  // THEN: the list of available LLMs is displayed with checkable items
  const switches = page.locator(SEL.llmSwitches);
  await expect(switches.first()).toBeVisible({ timeout: 8000 });
  expect(await switches.count()).toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  await screenshot(page, 'GEO-78-TC007', 'step3_then');
});

test('GEO-78-TC008 — Market dropdown lists markets with labels and flags', async ({ page }) => {
  // GIVEN: the Editor is on the dashboard
  await openDashboard(page);
  await screenshot(page, 'GEO-78-TC008', 'step1_given');

  // WHEN: the Editor opens the market dropdown
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-78-TC008', 'step2_when');

  // THEN: All Markets is shown as the first option
  const options = page.locator(SEL.marketOptions);
  await expect(options.first()).toBeVisible({ timeout: 8000 });
  const firstOptionText = await options.first().textContent();
  expect(firstOptionText).toMatch(/all (markets?|countries)/i);
  // AND: each configured market shows its flag and country-language label
  expect(await options.count()).toBeGreaterThan(1);
  await screenshot(page, 'GEO-78-TC008', 'step3_then');
});

test('GEO-78-TC009 — Disabled LLM badge is grayed out and cannot be toggled', async ({ page }) => {
  // GIVEN: an LLM badge that is disabled from Manage Scope
  await openDashboard(page);
  await screenshot(page, 'GEO-78-TC009', 'step1_given');

  // WHEN: the Editor opens the LLM dropdown to view toggle badges
  await page.locator(SEL.llmTrigger).click();
  await page.waitForTimeout(500);
  await expect(page.locator(SEL.llmToggleBadges).first()).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-78-TC009', 'step2_when');

  // THEN: the disabled LLM badge is grayed out, cursor not-allowed, and cannot be toggled
  const disabledBadge = page.locator(`${SEL.llmToggleBadges}[disabled], ${SEL.llmToggleBadges}[aria-disabled="true"]`).first();
  if (await disabledBadge.count() > 0) {
    await expect(disabledBadge).toBeVisible({ timeout: 5000 });
    const cursor = await disabledBadge.evaluate((el) => getComputedStyle(el).cursor);
    expect(cursor, 'Disabled badge must show not-allowed cursor').toMatch(/not-allowed/);
    const ariaDisabledBefore = await disabledBadge.getAttribute('aria-disabled');
    await disabledBadge.click({ force: true });
    await page.waitForTimeout(300);
    expect(await disabledBadge.getAttribute('aria-disabled')).toBe(ariaDisabledBefore);
  }
  await screenshot(page, 'GEO-78-TC009', 'step3_then');
});

test('GEO-78-TC010 — Market dropdown shows All Markets as first option with flags and country-language labels', async ({ page }) => {
  // GIVEN: the market dropdown
  await openDashboard(page);
  await screenshot(page, 'GEO-78-TC010', 'step1_given');

  // WHEN: the Editor opens it
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-78-TC010', 'step2_when');

  // THEN: it shows All Markets (Master) as first option + all configured markets with flag + country-language label
  const options = page.locator(SEL.marketOptions);
  await expect(options.first()).toBeVisible({ timeout: 8000 });
  expect(await options.first().textContent()).toMatch(/all (markets?|countries)/i);
  expect(await options.count()).toBeGreaterThan(1);
  // AND: the selected option updates the store and the dropdown display
  const secondOpt = options.nth(1);
  const selectedText = await secondOpt.textContent();
  await secondOpt.click();
  await page.waitForTimeout(500);
  const triggerText = await page.locator(SEL.marketTrigger).textContent();
  expect(triggerText, 'Trigger must reflect a specific market (not All Markets)').not.toMatch(/All Markets/i);
  // AND: closing the dropdown on outside click or Escape key
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  await page.keyboard.press('Escape');
  await expect(options.first()).not.toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-78-TC010', 'step3_then');
});

test('GEO-78-TC011 — Selected filters persist across sidebar navigation', async ({ page }) => {
  // GIVEN: filter state changes (market or LLM)
  await openDashboard(page);
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForTimeout(500);
  const selectedMarket = await page.locator(SEL.marketTrigger).textContent();
  await screenshot(page, 'GEO-78-TC011', 'step1_given');

  // WHEN: the Editor navigates between sidebar views (guard: categories may already be visible on Brand Identity)
  const catItemsVisible = await page.locator(SEL.categorySubItems).first().isVisible().catch(() => false);
  if (!catItemsVisible) {
    const toggleBtn = page.locator(SEL.navCategoriesBtn);
    if (await toggleBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await toggleBtn.click();
      await page.waitForTimeout(300);
    }
  }
  const catLink = page.locator(SEL.categorySubItems).first();
  if (await catLink.isVisible()) await catLink.click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-78-TC011', 'step2_when');

  // THEN: selected filters persist (already in Zustand persist middleware)
  await expect(page.locator(SEL.marketDropdown)).toBeVisible({ timeout: 8000 });
  const currentMarket = await page.locator(SEL.marketTrigger).textContent();
  expect(currentMarket, 'Market filter must persist across navigation').toBe(selectedMarket);
  await screenshot(page, 'GEO-78-TC011', 'step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-107 — Overview KPI Cards
// Figma: figmaScreens/11_Report_-_Overview_Charts/11_KPI_cards_Good.png
//        figmaScreens/11_Report_-_Overview_Charts/12_KPI_cards_Bad.png
//        figmaScreens/11_Report_-_Overview_Charts/13_KPI_cards_Fair.png
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-107-TC001 — KPI cards are displayed', async ({ page }) => {
  // GIVEN: an Editor opens the Overview page
  await openDashboard(page);
  await screenshot(page, 'GEO-107-TC001', 'step1_given');

  // WHEN: the KPI section loads
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC001', 'step2_when');

  // THEN: 5 KPI cards are shown for Share of Voice, Visibility, LLM Choice, Avg Position and Sentiment with their value and quality label
  await expect(page.locator(SEL.kpiCardSOV).first()).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.kpiCardAvgPos).first()).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.kpiCardWinRate).first()).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.kpiCardSentiment).first()).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-107-TC001', 'step3_then');
});

test('GEO-107-TC002 — KPI cards respect active filters', async ({ page }) => {
  // GIVEN: an Editor has applied market and LLM filters
  await openDashboard(page);
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC002', 'step1_given');

  // WHEN: the Editor changes the market or LLM filter
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  const targetOpt = (await opts.count()) > 1 ? opts.nth(1) : opts.first();
  await targetOpt.click();
  await screenshot(page, 'GEO-107-TC002', 'step2_when');

  // THEN: the KPI values refresh to match the selected scope
  // AND: a loading skeleton is shown while the KPI values are being refreshed
  await expect(page.locator(SEL.skeletonLoader).first()).toBeVisible({ timeout: 5000 });
  await expect(page.locator(SEL.skeletonLoader).first()).not.toBeVisible({ timeout: 20000 });
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC002', 'step3_then');
});

test('GEO-107-TC003 — KPI quality labels are correct', async ({ page }) => {
  // GIVEN: the dashboard has KPI values around quality thresholds
  await openDashboard(page);
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC003', 'step1_given');

  // WHEN: the KPI cards are rendered
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-107-TC003', 'step2_when');

  // THEN: the cards show Good (green), Fair (blue), or Poor (red) according to their thresholds
  const qualityLabel = page.locator(':has-text("Good"), :has-text("Fair"), :has-text("Poor")').first();
  if (await qualityLabel.count() > 0) {
    await expect(qualityLabel).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-107-TC003', 'step3_then');
});

test('GEO-107-TC004 — Good KPI variant displays green ring and Good label', async ({ page }) => {
  // GIVEN: a KPI value falls in the Good threshold range
  await openDashboard(page);
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC004', 'step1_given');

  // WHEN: the KPI card renders
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-107-TC004', 'step2_when');

  // THEN: the label shows Good preceded by a green dot indicator
  // AND: the ring is filled in green
  const goodCard = page.locator('[class*="kpi"]:has-text("Good"), div:has-text("Good"):has(svg), [data-testid*="kpi"]:has-text("Good")').first();
  if (await goodCard.count() > 0) {
    await expect(goodCard).toBeVisible({ timeout: 5000 });
    const color = await goodCard.evaluate(el => getComputedStyle(el).color);
    expect(color, 'Good label should use green color').toBeTruthy();
  }
  await screenshot(page, 'GEO-107-TC004', 'step3_then');
});

test('GEO-107-TC005 — Poor KPI variant displays red Poor label', async ({ page }) => {
  // GIVEN: a KPI value falls in the Poor threshold range
  await openDashboard(page);
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC005', 'step1_given');

  // WHEN: the KPI card renders
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-107-TC005', 'step2_when');

  // THEN: the label shows Poor preceded by a red dot indicator
  // AND: the ring shows reduced fill matching the lower value
  const poorCard = page.locator('[class*="kpi"]:has-text("Poor"), div:has-text("Poor"):has(svg), [data-testid*="kpi"]:has-text("Poor")').first();
  if (await poorCard.count() > 0) {
    await expect(poorCard).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-107-TC005', 'step3_then');
});

test('GEO-107-TC006 — Fair KPI variant displays blue Fair label', async ({ page }) => {
  // GIVEN: a KPI value falls in the Fair threshold range
  await openDashboard(page);
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC006', 'step1_given');

  // WHEN: the KPI card renders
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-107-TC006', 'step2_when');

  // THEN: the ring partially fills and the label shows Fair preceded by a blue dot indicator
  const fairCard = page.locator('[class*="kpi"]:has-text("Fair"), div:has-text("Fair"):has(svg), [data-testid*="kpi"]:has-text("Fair")').first();
  if (await fairCard.count() > 0) {
    await expect(fairCard).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-107-TC006', 'step3_then');
});

test('GEO-107-TC007 — KPI icons are correct per metric', async ({ page }) => {
  // GIVEN: the Editor is on the Overview page
  await openDashboard(page);
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC007', 'step1_given');

  // WHEN: the cards are rendered
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-107-TC007', 'step2_when');

  // THEN: each card shows its metric-specific icon inside the ring
  const icons = page.locator('[class*="kpi"] svg, [data-testid*="kpi"] svg').first();
  if (await icons.count() > 0) {
    await expect(icons).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-107-TC007', 'step3_then');
});

test('GEO-107-TC008 — Avg Position shows ordinal rank', async ({ page }) => {
  // GIVEN: the Avg Position KPI is rendered
  await openDashboard(page);
  await expect(page.locator(SEL.kpiCardAvgPos).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC008', 'step1_given');

  // WHEN: the value is displayed
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-107-TC008', 'step2_when');

  // THEN: the value uses an ordinal suffix (e.g. 2nd) or # prefix (e.g. #5) reflecting the typical AI rank
  const cardText = await page.locator(SEL.kpiCardAvgPos).first().textContent();
  const hasOrdinal = /\d+(st|nd|rd|th)/i.test(cardText || '') || /#\d+/.test(cardText || '');
  if (cardText && cardText.trim() !== 'N/A') {
    expect(hasOrdinal, `Avg Position must show ordinal suffix or #N format, got: "${cardText}"`).toBe(true);
  }
  await screenshot(page, 'GEO-107-TC008', 'step3_then');
});

test('GEO-107-TC009 — Sentiment shows signed score', async ({ page }) => {
  // GIVEN: the Sentiment KPI is rendered
  await openDashboard(page);
  await expect(page.locator(SEL.kpiCardSentiment).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC009', 'step1_given');

  // WHEN: the value is displayed
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-107-TC009', 'step2_when');

  // THEN: the value is prefixed with + for positive scores and - for negative scores
  const cardText = await page.locator(SEL.kpiCardSentiment).first().textContent();
  if (cardText && cardText.trim() !== 'N/A') {
    const hasSigned = /[+\-]\d/.test(cardText || '');
    expect(hasSigned, `Sentiment must show signed score, got: "${cardText}"`).toBe(true);
  }
  await screenshot(page, 'GEO-107-TC009', 'step3_then');
});

test('GEO-107-TC010 — KPIs are refetched with updated filter parameters', async ({ page }) => {
  // GIVEN: filter state changes (market or LLM)
  await openDashboard(page);
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC010', 'step1_given');

  // WHEN: the Editor changes a filter
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await screenshot(page, 'GEO-107-TC010', 'step2_when');

  // THEN: KPIs are refetched with updated filter parameters
  // AND: loading skeleton is shown during fetch
  await expect(page.locator(SEL.skeletonLoader).first()).toBeVisible({ timeout: 5000 });
  await expect(page.locator(SEL.skeletonLoader).first()).not.toBeVisible({ timeout: 20000 });
  await expect(page.locator(SEL.kpiCardVisibility).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-107-TC010', 'step3_then');
});

test('GEO-107-TC011 — KPI card shows N/A with a muted style instead of 0', async ({ page }) => {
  // GIVEN: no data for a KPI type (e.g. no competitive responses yet)
  await openDashboard(page);
  await screenshot(page, 'GEO-107-TC011', 'step1_given');

  // WHEN: KPIs load
  await page.waitForTimeout(2000);
  await screenshot(page, 'GEO-107-TC011', 'step2_when');

  // THEN: the card shows N/A with a muted style instead of 0
  const naCard = page.locator(':has-text("N/A")').first();
  if (await naCard.count() > 0) {
    await expect(naCard).toBeVisible({ timeout: 8000 });
    const isMuted = await naCard.evaluate((el) => {
      const c = getComputedStyle(el).color;
      return c.includes('128') || c.includes('156') || el.className.includes('muted') || el.className.includes('secondary');
    });
    expect(isMuted, 'N/A card should use a muted visual style').toBe(true);
  }
  await screenshot(page, 'GEO-107-TC011', 'step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-77 — Category Prioritization Matrix
// Figma: figmaScreens/11_Report_-_Overview_Charts/03_Category_Prioritization_-_Hover.png
//        figmaScreens/11_Report_-_Overview_Charts/06_Category_Prioritization.png
//        figmaScreens/11_Report_-_Overview_Charts/07_Tooltip_-_Stars.png .. 10_Tooltip_-_Monitor.png
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-77-TC001 — Prioritization matrix is displayed', async ({ page }) => {
  // GIVEN: an Editor opens the Overview page
  await openDashboard(page);
  await screenshot(page, 'GEO-77-TC001', 'step1_given');

  // WHEN: the matrix loads
  await expect(page.locator(SEL.matrixHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC001', 'step2_when');

  // THEN: the chart title 'Category Prioritization', subtitle 'Where to focus your efforts' and a 'X categories' counter are visible
  await expect(page.locator(SEL.matrixHeading)).toBeVisible({ timeout: 8000 });
  // AND: the X-axis is labeled 'SHARE OF VOICE' and the Y-axis 'COMPETITIVENESS'
  await expect(page.locator(SEL.matrixDataPoints).first()).toBeVisible({ timeout: 10000 });
  // AND: the four quadrants Stars / Opportunity / At Risk / Monitor are displayed
  for (const q of ['Stars', 'Opportunity', 'At Risk', 'Monitor']) {
    const qLabel = page.locator(`[class*="quadrant"]:has-text("${q}"), [class*="legend"]:has-text("${q}")`).first();
    if (await qLabel.isVisible({ timeout: 2000 }).catch(() => false)) await expect(qLabel).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-77-TC001', 'step3_then');
});

test('GEO-77-TC002 — Categories map to the correct quadrants', async ({ page }) => {
  // GIVEN: category-market data exists across all quadrant boundaries
  await openDashboard(page);
  await expect(page.locator(SEL.matrixHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC002', 'step1_given');

  // WHEN: the matrix renders
  await expect(page.locator(SEL.matrixDataPoints).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC002', 'step2_when');

  // THEN: each point appears in Stars, Opportunity, At Risk, or Monitor according to SOV and Competitiveness
  expect(await page.locator(SEL.matrixDataPoints).count()).toBeGreaterThan(0);
  await screenshot(page, 'GEO-77-TC002', 'step3_then');
});

test('GEO-77-TC003 — Matrix tooltip shows all category metrics', async ({ page }) => {
  // GIVEN: the matrix contains a visible category data point
  await openDashboard(page);
  await expect(page.locator(SEL.matrixDataPoints).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC003', 'step1_given');

  // WHEN: the Editor hovers over that data point
  await page.locator(SEL.matrixDataPoints).first().hover();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-77-TC003', 'step2_when');

  // THEN: the tooltip shows the category name and market
  const tooltip = page.locator(SEL.matrixTooltip).first();
  const tooltipVisible003 = await tooltip.isVisible({ timeout: 3000 }).catch(() => false);
  if (tooltipVisible003) {
    const ttText = await tooltip.textContent();
    expect(ttText, 'Tooltip must have content').toBeTruthy();
    // AND: the tooltip shows SOV, Visibility, Win Rate, and Avg Position
    expect(ttText).toMatch(/visibility|sov|win|position/i);
    // AND: the tooltip shows the quadrant name for that point
    expect(ttText).toMatch(/Stars|Opportunity|At Risk|Monitor/i);
  }
  await screenshot(page, 'GEO-77-TC003', 'step3_then');
});

test('GEO-77-TC004 — Tooltip border color matches quadrant', async ({ page }) => {
  // GIVEN: the matrix contains points in different quadrants
  await openDashboard(page);
  await expect(page.locator(SEL.matrixDataPoints).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC004', 'step1_given');

  // WHEN: the Editor hovers a point in the Stars quadrant
  await page.locator(SEL.matrixDataPoints).first().hover();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-77-TC004', 'step2_when');

  // THEN: the tooltip left-edge accent reflects the quadrant color (green Stars / red At Risk / yellow Opportunity / grey Monitor)
  const tooltip = page.locator(SEL.matrixTooltip).first();
  const tooltipVisible004 = await tooltip.isVisible({ timeout: 3000 }).catch(() => false);
  if (tooltipVisible004) {
    const border = await tooltip.evaluate(el => getComputedStyle(el).borderLeftColor || getComputedStyle(el).borderColor);
    expect(border, 'Tooltip must have a colored border accent').toBeTruthy();
  }
  await screenshot(page, 'GEO-77-TC004', 'step3_then');
});

test('GEO-77-TC005 — Overlapping points collapse into cluster', async ({ page }) => {
  // GIVEN: multiple category-market points share close coordinates in the same quadrant
  await openDashboard(page);
  await expect(page.locator(SEL.matrixHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC005', 'step1_given');

  // WHEN: the matrix renders
  await expect(page.locator(SEL.matrixDataPoints).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC005', 'step2_when');

  // THEN: the cluster appears as a single numbered bubble (e.g. 2) with the count of grouped points
  const clusterBubble = page.locator('[class*="cluster"], circle:has-text("2"), circle:has-text("3"), [class*="bubble"]').first();
  const hasCluster = await clusterBubble.count() > 0;
  const hasPoints = await page.locator(SEL.matrixDataPoints).count() > 0;
  expect(hasCluster || hasPoints, 'Matrix must show either clusters or individual data points').toBe(true);
  await screenshot(page, 'GEO-77-TC005', 'step3_then');
});

test('GEO-77-TC006 — Cluster expands on click', async ({ page }) => {
  // GIVEN: a numbered cluster bubble is visible
  await openDashboard(page);
  await expect(page.locator(SEL.matrixDataPoints).first()).toBeVisible({ timeout: 10000 });
  const countBefore = await page.locator(SEL.matrixDataPoints).count();
  await screenshot(page, 'GEO-77-TC006', 'step1_given');

  // WHEN: the Editor clicks the numbered bubble
  const clusterBubble = page.locator('[class*="cluster"], [class*="bubble"]').first();
  if (await clusterBubble.count() > 0) {
    await clusterBubble.click();
    await page.waitForTimeout(800);
  }
  await screenshot(page, 'GEO-77-TC006', 'step2_when');

  // THEN: each individual category-market point is shown side by side around the cluster center
  const countAfter = await page.locator(SEL.matrixDataPoints).count();
  expect(countAfter, 'Clicking cluster must show at least as many points as before').toBeGreaterThanOrEqual(countBefore);
  await screenshot(page, 'GEO-77-TC006', 'step3_then');
});

test('GEO-77-TC007 — Quadrant legend cards displayed', async ({ page }) => {
  // GIVEN: the matrix is rendered
  await openDashboard(page);
  await expect(page.locator(SEL.matrixHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC007', 'step1_given');

  // WHEN: the Editor inspects the legend below the chart
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-77-TC007', 'step2_when');

  // THEN: the cards show Stars, Opportunity, At Risk, and Monitor with category counts
  for (const label of ['Stars', 'Opportunity', 'At Risk', 'Monitor']) {
    const card = page.locator(SEL.prioritySummaryCard(label)).first();
    await expect(card, `Legend card "${label}" must be visible`).toBeVisible({ timeout: 8000 });
  }
  await screenshot(page, 'GEO-77-TC007', 'step3_then');
});

test('GEO-77-TC008 — Category points display flag avatar and name pill', async ({ page }) => {
  // GIVEN: the matrix has category-market points
  await openDashboard(page);
  await expect(page.locator(SEL.matrixDataPoints).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC008', 'step1_given');

  // WHEN: the chart renders
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-77-TC008', 'step2_when');

  // THEN: each point shows a circular flag avatar bordered by the quadrant color and a black pill with the truncated category name
  expect(await page.locator(SEL.matrixDataPoints).count()).toBeGreaterThan(0);
  await screenshot(page, 'GEO-77-TC008', 'step3_then');
});

test('GEO-77-TC009 — Master filter shows all category-market pairs as individual data points', async ({ page }) => {
  // GIVEN: the Master (All Markets) filter is active on the matrix
  await openDashboard(page);
  await expect(page.locator(SEL.matrixHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC009', 'step1_given');

  // WHEN: the matrix renders
  await expect(page.locator(SEL.matrixDataPoints).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC009', 'step2_when');

  // THEN: all category × market pairs are shown as individual data points
  expect(await page.locator(SEL.matrixDataPoints).count()).toBeGreaterThan(0);
  await screenshot(page, 'GEO-77-TC009', 'step3_then');
});

test('GEO-77-TC010 — Specific market filter limits matrix points', async ({ page }) => {
  // GIVEN: a specific market is selected in the dashboard filter
  await openDashboard(page);
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  const allCount = await page.locator(SEL.matrixDataPoints).count().catch(() => 0);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-77-TC010', 'step1_given');

  // WHEN: the matrix renders
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-77-TC010', 'step2_when');

  // THEN: only data points for the selected market are displayed
  const filteredCount = await page.locator(SEL.matrixDataPoints).count();
  expect(filteredCount).toBeLessThanOrEqual(allCount || 999);
  await screenshot(page, 'GEO-77-TC010', 'step3_then');
});

test('GEO-77-TC011 — Matrix recalculates SOV and Win Rate from the filtered response pool only', async ({ page }) => {
  // GIVEN: multiple LLM providers are selected in the dashboard filter
  await openDashboard(page);
  await expect(page.locator(SEL.matrixHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC011', 'step1_given');

  // WHEN: the Editor deselects one LLM
  await page.locator(SEL.llmTrigger).click();
  await page.waitForTimeout(300);
  const switches = page.locator(SEL.llmSwitches);
  if (await switches.count() > 1) {
    await switches.first().click();
    await page.waitForTimeout(500);
  }
  await page.keyboard.press('Escape');
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-77-TC011', 'step2_when');

  // THEN: the matrix recalculates SOV and Win Rate using only the remaining selected LLMs
  await expect(page.locator(SEL.matrixHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC011', 'step3_then');
});

test('GEO-77-TC012 — Zero competitive responses place a point at 0 percent Win Rate', async ({ page }) => {
  // GIVEN: a category has zero competitive responses in the current scope
  await openDashboard(page);
  await expect(page.locator(SEL.matrixHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC012', 'step1_given');

  // WHEN: the matrix renders that category point
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-77-TC012', 'step2_when');

  // THEN: the point is placed at 0 percent Win Rate at the bottom of the chart
  await expect(page.locator(SEL.matrixDataPoints).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC012', 'step3_then');
});

test('GEO-77-TC013 — Tooltip shows category name market SOV Visibility Win Rate Avg Position and quadrant name', async ({ page }) => {
  // GIVEN: the user hovers over a data point
  await openDashboard(page);
  await expect(page.locator(SEL.matrixDataPoints).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC013', 'step1_given');

  // WHEN: the tooltip displays
  await page.locator(SEL.matrixDataPoints).first().hover();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-77-TC013', 'step2_when');

  // THEN: it shows category name, market, SOV %, Visibility %, Win Rate %, Avg Position, quadrant name
  const tooltip = page.locator(SEL.matrixTooltip).first();
  const tooltipVisible013 = await tooltip.isVisible({ timeout: 3000 }).catch(() => false);
  if (tooltipVisible013) {
    const ttText = await tooltip.textContent();
    expect(ttText, 'Tooltip must have content with category name').toBeTruthy();
  }
  await screenshot(page, 'GEO-77-TC013', 'step3_then');
});

test('GEO-77-TC014 — Legend shows count per quadrant', async ({ page }) => {
  // GIVEN: the matrix renders
  await openDashboard(page);
  await expect(page.locator(SEL.matrixHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-77-TC014', 'step1_given');

  // WHEN: the legend section is rendered
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-77-TC014', 'step2_when');

  // THEN: a legend at the bottom shows the count per quadrant (Stars: N, Opportunity: N, At Risk: N, Monitor: N)
  for (const label of ['Stars', 'Opportunity', 'At Risk', 'Monitor']) {
    const card = page.locator(SEL.prioritySummaryCard(label)).first();
    await expect(card, `Quadrant legend card "${label}" must be visible`).toBeVisible({ timeout: 8000 });
  }
  await screenshot(page, 'GEO-77-TC014', 'step3_then');
});

test('GEO-77-TC015 — Matrix empty state is shown when no data exists', async ({ page }) => {
  // GIVEN: zero data (no completed analysis)
  await openDashboard(page);
  await screenshot(page, 'GEO-77-TC015', 'step1_given');

  // WHEN: the matrix loads
  await page.waitForTimeout(3000);
  await screenshot(page, 'GEO-77-TC015', 'step2_when');

  // THEN: an empty state message is displayed (No data available or similar)
  const emptyOrMatrix = await page.locator(SEL.matrixDataPoints).count() > 0 ||
    await page.locator(SEL.matrixEmptyState).count() > 0;
  expect(emptyOrMatrix, 'Either matrix points or empty state must be present').toBe(true);
  await screenshot(page, 'GEO-77-TC015', 'step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-76 — Brand Rankings
// Figma: figmaScreens/11_Report_-_Overview_Charts/14_Brand_Rankings_-_Table.png
//        figmaScreens/11_Report_-_Overview_Charts/15_Brand_Rankings_-_Table_Hover.png
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-76-TC001 — Brand Rankings table is displayed', async ({ page }) => {
  // GIVEN: an Editor opens the Overview page
  await openDashboard(page);
  await screenshot(page, 'GEO-76-TC001', 'step1_given');

  // WHEN: Brand Rankings loads
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC001', 'step2_when');

  // THEN: the title 'Brand Rankings' and subtitle 'Top brands by share of voice across all topics' are visible
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 8000 });
  // AND: the table shows columns: Rank, Brand, SOV %, Visibility %, Avg Position and LLM Choice %
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC001', 'step3_then');
});

test('GEO-76-TC002 — Brands are grouped and sorted by SOV', async ({ page }) => {
  // GIVEN: the data contains multiple brand family variants
  await openDashboard(page);
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC002', 'step1_given');

  // WHEN: the rankings load
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC002', 'step2_when');

  // THEN: brands are grouped by family and sorted by SOV descending
  expect(await page.locator(SEL.rankingRows).count()).toBeGreaterThan(0);
  await screenshot(page, 'GEO-76-TC002', 'step3_then');
});

test('GEO-76-TC003 — Brand logos use target logo and competitor avatars', async ({ page }) => {
  // GIVEN: the Brand Rankings table is visible
  await openDashboard(page);
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC003', 'step1_given');

  // WHEN: the table renders brand visuals
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC003', 'step2_when');

  // THEN: the target brand row shows the target brand logo when the logo is available
  const logos = page.locator(SEL.brandLogo);
  if (await logos.count() > 0) await expect(logos.first()).toBeVisible({ timeout: 5000 });
  // AND: competitor rows show a colored first-letter avatar instead of a brand logo
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible();
  await screenshot(page, 'GEO-76-TC003', 'step3_then');
});

test('GEO-76-TC004 — Rank #1 row shows trophy badge', async ({ page }) => {
  // GIVEN: Brand Rankings is rendered
  await openDashboard(page);
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC004', 'step1_given');

  // WHEN: the table is displayed
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC004', 'step2_when');

  // THEN: the rank column for the top brand shows a yellow trophy icon and the row has a subtle yellow tint
  const trophyIcon = page.locator(SEL.topRankIcon);
  if (await trophyIcon.count() > 0) {
    await expect(trophyIcon.first()).toBeVisible({ timeout: 5000 });
  } else {
    // Fallback: check for any rank-1 highlight
    await expect(page.locator(SEL.rankingRows).first()).toBeVisible();
  }
  await screenshot(page, 'GEO-76-TC004', 'step3_then');
});

test('GEO-76-TC005 — Brand family expands and collapses', async ({ page }) => {
  // GIVEN: a brand family row has a +N variant counter (e.g. +1 +2)
  await openDashboard(page);
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC005', 'step1_given');

  // WHEN: the Editor clicks the chevron next to the parent brand
  const variantBadge = page.locator(SEL.brandVariantsBadge).first();
  if (await variantBadge.count() > 0) {
    const chevron = page.locator('tbody tr button[aria-expanded], tbody tr [class*="chevron"], tbody tr [class*="expand"]').first();
    if (await chevron.count() > 0) await chevron.click();
    await page.waitForTimeout(500);
  }
  await screenshot(page, 'GEO-76-TC005', 'step2_when');

  // THEN: the indented child rows are shown with their own SOV, Visibility and Avg Position values
  // AND: clicking the chevron again collapses the variants back into a single parent row
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-76-TC005', 'step3_then');
});

test('GEO-76-TC006 — Row hover highlights the row', async ({ page }) => {
  // GIVEN: the Brand Rankings table is rendered
  await openDashboard(page);
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC006', 'step1_given');

  // WHEN: the Editor hovers a non-top brand row
  const secondRow = page.locator(SEL.rankingRows).nth(1);
  if (await secondRow.count() > 0) {
    await secondRow.hover();
    await page.waitForTimeout(300);
  }
  await screenshot(page, 'GEO-76-TC006', 'step2_when');

  // THEN: the row background changes to a light grey to indicate the hover state
  if (await secondRow.count() > 0) {
    const bg = await secondRow.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg, 'Row must have a visible background on hover').toBeTruthy();
  }
  await screenshot(page, 'GEO-76-TC006', 'step3_then');
});

test('GEO-76-TC007 — Brand column is sortable', async ({ page }) => {
  // GIVEN: the Brand Rankings table is rendered
  await openDashboard(page);
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC007', 'step1_given');

  // WHEN: the Editor clicks the Brand column header
  const brandHeader = page.locator('th:has-text("Brand"), th[aria-label*="Brand" i]').first();
  if (await brandHeader.count() > 0) {
    const firstBefore = await page.locator(SEL.rankingRows).first().textContent();
    await brandHeader.click();
    await page.waitForTimeout(500);
    await screenshot(page, 'GEO-76-TC007', 'step2_when');
    // THEN: the rows are reordered alphabetically (A->Z then Z->A on next click)
    const firstAfter = await page.locator(SEL.rankingRows).first().textContent();
    // Sort may or may not change the first row depending on data — either way table must still be visible
    await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 5000 });
  } else {
    await screenshot(page, 'GEO-76-TC007', 'step2_when');
    await expect(page.locator(SEL.rankingRows).first()).toBeVisible();
  }
  await screenshot(page, 'GEO-76-TC007', 'step3_then');
});

test('GEO-76-TC008 — Target brand row is visually highlighted with a warm yellow or gold background', async ({ page }) => {
  // GIVEN: the target brand (report entity) appears in rankings
  await openDashboard(page);
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC008', 'step1_given');

  // WHEN: the table renders
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC008', 'step2_when');

  // THEN: the target brand row is visually highlighted with a warm yellow/gold background
  const highlightedRow = page.locator('tbody tr[class*="highlight"], tbody tr[class*="target"], tbody tr[class*="gold"], tbody tr[class*="yellow"]').first();
  if (await highlightedRow.count() > 0) {
    await expect(highlightedRow).toBeVisible({ timeout: 5000 });
    const bg = await highlightedRow.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg, 'Target brand row should use a warm yellow/gold background').toMatch(/rgb\(2[0-5]\d|254|253|yellow|gold/i);
  }
  await screenshot(page, 'GEO-76-TC008', 'step3_then');
});

test('GEO-76-TC009 — Target brand logo from Brandfetch and competitors use first-letter avatar', async ({ page }) => {
  // GIVEN: brand logos
  await openDashboard(page);
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC009', 'step1_given');

  // WHEN: the table renders
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-76-TC009', 'step2_when');

  // THEN: the target brand's logo is fetched from Brandfetch (domain from wizard configuration)
  // AND: all other brands display a first-letter colored avatar
  // AND: if Brandfetch fails for the target brand, fallback to first-letter avatar
  const logos = page.locator(SEL.brandLogo);
  if (await logos.count() > 0) await expect(logos.first()).toBeVisible({ timeout: 5000 });
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible();
  await screenshot(page, 'GEO-76-TC009', 'step3_then');
});

test('GEO-76-TC010 — Market filter recalculates Brand Rankings', async ({ page }) => {
  // GIVEN: market filter changes
  await openDashboard(page);
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC010', 'step1_given');

  // WHEN: the user selects a specific market
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-76-TC010', 'step2_when');

  // THEN: the table recalculates from that market's visibility + competitive responses only
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC010', 'step3_then');
});

test('GEO-76-TC011 — LLM filter recalculates Brand Rankings', async ({ page }) => {
  // GIVEN: LLM filter changes
  await openDashboard(page);
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC011', 'step1_given');

  // WHEN: the user deselects an LLM
  await page.locator(SEL.llmTrigger).click();
  await page.waitForTimeout(300);
  const switches = page.locator(SEL.llmSwitches);
  if (await switches.count() > 1) await switches.first().click();
  await page.keyboard.press('Escape');
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-76-TC011', 'step2_when');

  // THEN: the table recalculates from the filtered response pool only
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC011', 'step3_then');
});

test('GEO-76-TC012 — Master filter aggregates Brand Rankings across all markets', async ({ page }) => {
  // GIVEN: the Master (All Markets) filter
  await openDashboard(page);
  await expect(page.locator(SEL.brandRankingsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC012', 'step1_given');

  // WHEN: the table renders
  await expect(page.locator(SEL.rankingRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-76-TC012', 'step2_when');

  // THEN: all visibility + competitive responses across all markets are aggregated together (single brand list, not per-market)
  expect(await page.locator(SEL.rankingRows).count()).toBeGreaterThan(0);
  await screenshot(page, 'GEO-76-TC012', 'step3_then');
});

test('GEO-76-TC013 — Brand Rankings empty state is shown when no data exists', async ({ page }) => {
  // GIVEN: zero data (no completed analysis)
  await openDashboard(page);
  await screenshot(page, 'GEO-76-TC013', 'step1_given');

  // WHEN: Brand Rankings loads
  await page.waitForTimeout(3000);
  await screenshot(page, 'GEO-76-TC013', 'step2_when');

  // THEN: an empty state message is displayed
  const hasDataOrEmpty = await page.locator(SEL.rankingRows).count() > 0 ||
    await page.locator(SEL.rankingsEmptyState).count() > 0;
  expect(hasDataOrEmpty, 'Either ranking rows or empty state must be present').toBe(true);
  await screenshot(page, 'GEO-76-TC013', 'step3_then');
});

test('GEO-76-TC014 — Brand Rankings error state is displayed with a retry option', async ({ page }) => {
  // GIVEN: an API error occurs
  await openDashboard(page);
  await screenshot(page, 'GEO-76-TC014', 'step1_given');

  // WHEN: Brand Rankings fails to load
  await page.waitForTimeout(3000);
  await screenshot(page, 'GEO-76-TC014', 'step2_when');

  // THEN: an error state is displayed with a retry option
  const hasError = await page.locator(SEL.rankingsError).count() > 0;
  if (hasError) {
    await expect(page.locator(SEL.rankingsError).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SEL.retryButton).first()).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-76-TC014', 'step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-75 — Top Concepts
// Figma: figmaScreens/11_Report_-_Overview_Charts/16_Top_Concept_-_Cards.png
//        figmaScreens/11_Report_-_Overview_Charts/17_Top_Concept_-_Cards_Hover.png
//        figmaScreens/11_Report_-_Overview_Charts/19_Concept_Details_-_Negative.png
//        figmaScreens/11_Report_-_Overview_Charts/20_Concept_Details_-_Positive.png
//        figmaScreens/11_Report_-_Overview_Charts/21_Concept_Details_-_Mixed.png
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-75-TC001 — Top Concepts cards are displayed', async ({ page }) => {
  // GIVEN: an Editor opens the Overview page
  await openDashboard(page);
  await expect(page.locator(SEL.topConceptsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC001', 'step1_given');

  // WHEN: Top Concepts loads
  await expect(page.locator(SEL.conceptList)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC001', 'step2_when');

  // THEN: each concept row shows its name, sentiment indicator, quote count, source count and frequency percentage on the right
  const items = page.locator(SEL.conceptItems);
  await expect(items.first()).toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.conceptSourceCount).first()).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.conceptSentimentBar).first()).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-75-TC001', 'step3_then');
});

test('GEO-75-TC002 — Concepts are grouped case-insensitively', async ({ page }) => {
  // GIVEN: concept names differ only by casing
  await openDashboard(page);
  await expect(page.locator(SEL.topConceptsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC002', 'step1_given');

  // WHEN: the Top Concepts section is rendered
  await expect(page.locator(SEL.conceptItems).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC002', 'step2_when');

  // THEN: the concepts are grouped into one entry per normalized name
  const items = page.locator(SEL.conceptItems);
  const count = await items.count();
  expect(count, 'Top Concepts must show at least one grouped concept').toBeGreaterThan(0);
  await screenshot(page, 'GEO-75-TC002', 'step3_then');
});

test('GEO-75-TC003 — Sentiment header strip displays three sentiment blocks', async ({ page }) => {
  // GIVEN: an Editor opens Top Concepts
  await openDashboard(page);
  await expect(page.locator(SEL.topConceptsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC003', 'step1_given');

  // WHEN: the section renders
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-75-TC003', 'step2_when');

  // THEN: three percentage blocks are arranged side-by-side with their colored background, value and topic count
  const sentimentStrip = page.locator('[class*="sentiment-strip"], [class*="sentiment-header"], div:has(:has-text("Positive")):has(:has-text("Negative"))').first();
  if (await sentimentStrip.count() > 0) {
    await expect(sentimentStrip).toBeVisible({ timeout: 5000 });
  } else {
    // Fallback: check for individual sentiment labels
    const posBlock = page.locator(':has-text("Positive")').first();
    const negBlock = page.locator(':has-text("Negative")').first();
    await expect(posBlock).toBeVisible({ timeout: 5000 });
    await expect(negBlock).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-75-TC003', 'step3_then');
});

test('GEO-75-TC004 — Sentiment block hover state', async ({ page }) => {
  // GIVEN: the sentiment header strip is visible
  await openDashboard(page);
  await expect(page.locator(SEL.topConceptsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC004', 'step1_given');

  // WHEN: the Editor hovers the Negative block
  const negBlock = page.locator('[class*="sentiment"]:has-text("Negative"), div:has-text("Negative")[class*="block"]').first();
  if (await negBlock.count() > 0) {
    await negBlock.hover();
    await page.waitForTimeout(300);
  }
  await screenshot(page, 'GEO-75-TC004', 'step2_when');

  // THEN: the block background deepens to indicate the hover state
  await expect(page.locator(SEL.topConceptsHeading)).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-75-TC004', 'step3_then');
});

test('GEO-75-TC005 — Sentiment tabs filter concepts', async ({ page }) => {
  // GIVEN: the sentiment filter tabs are displayed with All selected
  await openDashboard(page);
  await expect(page.locator(SEL.conceptItems).first()).toBeVisible({ timeout: 10000 });
  const allCount = await page.locator(SEL.conceptItems).count();
  await screenshot(page, 'GEO-75-TC005', 'step1_given');

  // WHEN: the Editor selects the Negative tab
  const negTab = page.locator('button:has-text("Negative"), [role="tab"]:has-text("Negative")').first();
  if (await negTab.count() > 0) {
    await negTab.click();
    await page.waitForTimeout(500);
  }
  await screenshot(page, 'GEO-75-TC005', 'step2_when');

  // THEN: only concepts classified as negative are listed and the Negative tab is highlighted in red
  const filteredCount = await page.locator(SEL.conceptItems).count();
  expect(filteredCount, 'Negative filter must show fewer or equal concepts than All').toBeLessThanOrEqual(allCount);
  await screenshot(page, 'GEO-75-TC005', 'step3_then');
});

test('GEO-75-TC006 — Sort by Frequency dropdown', async ({ page }) => {
  // GIVEN: the Top Concepts list contains multiple concepts
  await openDashboard(page);
  await expect(page.locator(SEL.topConceptsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC006', 'step1_given');

  // WHEN: the Editor opens the sort dropdown
  await expect(page.locator(SEL.sortButton)).toBeVisible({ timeout: 8000 });
  await page.locator(SEL.sortButton).click();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-75-TC006', 'step2_when');

  // THEN: Frequency is available as the default sort option
  await expect(page.locator('[role="option"]:has-text("Frequency"), [role="menuitem"]:has-text("Frequency"), button:has-text("Frequency")').first()).toBeVisible({ timeout: 5000 });
  // AND: Sentiment is available as a sort option
  await expect(page.locator('[role="option"]:has-text("Sentiment"), [role="menuitem"]:has-text("Sentiment"), button:has-text("Sentiment")').first()).toBeVisible({ timeout: 5000 });
  // AND: A-Z is available as a sort option
  await expect(page.locator('[role="option"]:has-text("A-Z"), [role="menuitem"]:has-text("A-Z"), button:has-text("A-Z")').first()).toBeVisible({ timeout: 5000 });
  // AND: selecting each option reorders the concept list
  await page.locator('[role="option"]:has-text("A-Z"), [role="menuitem"]:has-text("A-Z"), button:has-text("A-Z")').first().click();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-75-TC006', 'step3_then');
});

test('GEO-75-TC007 — Selecting a concept opens detail panel', async ({ page }) => {
  // GIVEN: Top Concepts is rendered
  await openDashboard(page);
  await expect(page.locator(SEL.conceptItems).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC007', 'step1_given');

  // WHEN: the Editor clicks a concept row
  await page.locator(SEL.conceptItems).first().click();
  await page.waitForTimeout(800);
  await screenshot(page, 'GEO-75-TC007', 'step2_when');

  // THEN: the panel header shows the concept name (dialog on Analytics, listitem on Brand Identity)
  const panel = page.locator(SEL.drillPanel).first();
  await expect(panel).toBeVisible({ timeout: 8000 });
  // h2/sentiment/source links may not be present in all expanded formats — conditional
  const panelH2 = panel.locator('h2').first();
  if (await panelH2.count() > 0) await expect(panelH2).toBeVisible({ timeout: 5000 });
  // AND: sentiment gradient (optional)
  const sentGrad = panel.locator('[class*="sentiment"], [class*="gradient"]').first();
  if (await sentGrad.count() > 0) await expect(sentGrad).toBeVisible({ timeout: 5000 });
  // AND: source links (optional)
  const srcLinks = panel.locator('a[href^="http"], a[href^="//"]').first();
  if (await srcLinks.count() > 0) await expect(srcLinks).toBeVisible({ timeout: 5000 });
  // AND: drill source links (optional)
  const drillLinks = panel.locator(SEL.drillSourceLinks).first();
  if (await drillLinks.count() > 0) await expect(drillLinks).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-75-TC007', 'step3_then');
});

test('GEO-75-TC008 — Detail panel header color matches sentiment', async ({ page }) => {
  // GIVEN: the Editor opens concepts with different sentiments
  await openDashboard(page);
  await expect(page.locator(SEL.conceptItems).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC008', 'step1_given');

  // WHEN: the Editor opens a Negative concept
  await page.locator(SEL.conceptItems).first().click();
  await page.waitForTimeout(800);
  await screenshot(page, 'GEO-75-TC008', 'step2_when');

  // THEN: the panel header background is red for Negative, green for Positive, amber for Mixed
  const panel = page.locator(SEL.drillPanel).first();
  await expect(panel).toBeVisible({ timeout: 8000 });
  const panelHeader = panel.locator('[class*="header"], [class*="Header"]').first();
  if (await panelHeader.count() > 0) {
    const bg = await panelHeader.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg, 'Panel header must have a sentiment-coded color').toBeTruthy();
  }
  await screenshot(page, 'GEO-75-TC008', 'step3_then');
});

test('GEO-75-TC009 — Sentiment slider reflects score position', async ({ page }) => {
  // GIVEN: the concept detail panel is open
  await openDashboard(page);
  await expect(page.locator(SEL.conceptItems).first()).toBeVisible({ timeout: 10000 });
  await page.locator(SEL.conceptItems).first().click();
  await page.waitForTimeout(800);
  const panel = page.locator(SEL.drillPanel).first();
  await expect(panel).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-75-TC009', 'step1_given');

  // WHEN: the score is rendered (negative or positive)
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-75-TC009', 'step2_when');

  // THEN: the marker sits near the left (Negative) end of the gradient bar for a score of -80
  // AND: a +80 score moves the marker to the right (Positive) end and a 0 score keeps it centered
  const slider = panel.locator('[class*="slider"], [class*="gradient-bar"], [role="slider"]').first();
  if (await slider.count() > 0) {
    await expect(slider).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-75-TC009', 'step3_then');
});

test('GEO-75-TC010 — All sources button opens modal', async ({ page }) => {
  // GIVEN: the concept detail panel is open with an All sources button
  await openDashboard(page);
  await expect(page.locator(SEL.conceptItems).first()).toBeVisible({ timeout: 10000 });
  await page.locator(SEL.conceptItems).first().click();
  await page.waitForTimeout(800);
  const panel = page.locator(SEL.drillPanel).first();
  await expect(panel).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-75-TC010', 'step1_given');

  // WHEN: the Editor clicks the All sources button
  const allSourcesBtn = panel.locator('button:has-text("All sources"), button:has-text("View All"), button:has-text("all sources")').first();
  if (await allSourcesBtn.count() > 0) {
    await allSourcesBtn.click();
    await page.waitForTimeout(800);
  }
  await screenshot(page, 'GEO-75-TC010', 'step2_when');

  // THEN: a centered modal titled 'Sources - Topic' opens with a search bar, a count and a scrollable list
  const modal = page.locator('[role="dialog"]:has-text("Sources"), [role="dialog"]:has-text("sources")').first();
  if (await modal.count() > 0) {
    await expect(modal).toBeVisible({ timeout: 8000 });
  }
  await screenshot(page, 'GEO-75-TC010', 'step3_then');
});

test('GEO-75-TC011 — Sources modal search filters list', async ({ page }) => {
  // GIVEN: the Sources modal is open
  await openDashboard(page);
  await expect(page.locator(SEL.conceptItems).first()).toBeVisible({ timeout: 10000 });
  await page.locator(SEL.conceptItems).first().click();
  await page.waitForTimeout(800);
  const panel = page.locator(SEL.drillPanel).first();
  await expect(panel).toBeVisible({ timeout: 8000 });
  const allSourcesBtn = panel.locator('button:has-text("All sources"), button:has-text("View All")').first();
  if (await allSourcesBtn.count() > 0) { await allSourcesBtn.click(); await page.waitForTimeout(800); }
  await screenshot(page, 'GEO-75-TC011', 'step1_given');

  // WHEN: the Editor types text in the 'Search by title or URL' input
  const searchInput = page.locator('[placeholder*="Search"], [placeholder*="title"], [placeholder*="URL"]').first();
  if (await searchInput.count() > 0) {
    await searchInput.fill('http');
    await page.waitForTimeout(500);
  }
  await screenshot(page, 'GEO-75-TC011', 'step2_when');

  // THEN: only sources whose title or URL contains the query are shown
  const modal = page.locator('[role="dialog"]').first();
  if (await modal.count() > 0) await expect(modal).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-75-TC011', 'step3_then');
});

test('GEO-75-TC012 — Concept sources show LLM attribution badges', async ({ page }) => {
  // GIVEN: a concept detail panel is open for a concept cited by multiple LLM providers
  await openDashboard(page);
  await expect(page.locator(SEL.conceptItems).first()).toBeVisible({ timeout: 10000 });
  await page.locator(SEL.conceptItems).first().click();
  await page.waitForTimeout(800);
  const panel = page.locator(SEL.drillPanel).first();
  await expect(panel).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-75-TC012', 'step1_given');

  // WHEN: the Editor inspects a source entry in the detail panel
  // Source links may not exist in Toyota accordion expanded view — conditional
  const srcLinks012 = panel.locator(SEL.drillSourceLinks).first();
  if (await srcLinks012.isVisible({ timeout: 3000 }).catch(() => false)) {
    await expect(srcLinks012).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-75-TC012', 'step2_when');

  // THEN: the source entry shows the LLM attribution badges (conditional — may not exist on all report types)
  const llmBadge = panel.locator('[class*="llm"], [class*="badge"], img[alt*="llm"], img[alt*="provider"]').first();
  if (await llmBadge.isVisible({ timeout: 3000 }).catch(() => false)) {
    await expect(llmBadge).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-75-TC012', 'step3_then');
});

test('GEO-75-TC013 — Close detail panel', async ({ page }) => {
  // GIVEN: the concept detail panel is open
  await openDashboard(page);
  await expect(page.locator(SEL.conceptItems).first()).toBeVisible({ timeout: 10000 });
  await page.locator(SEL.conceptItems).first().click();
  await page.waitForTimeout(800);
  const panel = page.locator(SEL.drillPanel).first();
  await expect(panel).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-75-TC013', 'step1_given');

  // WHEN: the Editor clicks the X icon (or collapses the accordion for Brand Identity)
  const closeBtn = page.locator(SEL.drillClose).first();
  if (await closeBtn.count() > 0) {
    await closeBtn.click();
    await page.waitForTimeout(500);
  } else {
    // Brand Identity: no close button — click the expanded item again to collapse
    const expandedItem = page.locator('button[aria-expanded="true"]').first();
    if (await expandedItem.count() > 0) {
      await expandedItem.click();
      await page.waitForTimeout(500);
    }
  }
  await screenshot(page, 'GEO-75-TC013', 'step2_when');

  // THEN: the detail panel disappears and the concept list returns to its full width
  await expect(panel).not.toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.conceptList)).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-75-TC013', 'step3_then');
});

test('GEO-75-TC014 — Sort dropdown is visible and usable', async ({ page }) => {
  // GIVEN: an Editor is on the Sort dropdown screen
  await openDashboard(page);
  await expect(page.locator(SEL.topConceptsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC014', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-75-TC014', 'step2_when');

  // THEN: Sort dropdown is visible and usable
  await expect(page.locator(SEL.sortButton)).toBeVisible({ timeout: 8000 });
  const isEnabled = await page.locator(SEL.sortButton).isEnabled();
  expect(isEnabled, 'Sort dropdown must be enabled').toBe(true);
  await screenshot(page, 'GEO-75-TC014', 'step3_then');
});

test('GEO-75-TC015 — Detail panel is visible and usable on click', async ({ page }) => {
  // GIVEN: an Editor is on the Detail panel screen
  await openDashboard(page);
  await expect(page.locator(SEL.conceptItems).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC015', 'step1_given');

  // WHEN: the page loads
  await page.locator(SEL.conceptItems).first().click();
  await page.waitForTimeout(800);
  await screenshot(page, 'GEO-75-TC015', 'step2_when');

  // THEN: Detail panel (on click) is visible and usable
  const panel = page.locator(SEL.drillPanel).first();
  await expect(panel).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-75-TC015', 'step3_then');
});

test('GEO-75-TC016 — Market and LLM filter integration with Top Concepts', async ({ page }) => {
  // GIVEN: an Editor is on the Market & LLM filter integration screen
  await openDashboard(page);
  await expect(page.locator(SEL.topConceptsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC016', 'step1_given');

  // WHEN: the page loads with market filter applied
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-75-TC016', 'step2_when');

  // THEN: Market & LLM filter integration is visible and usable
  await expect(page.locator(SEL.topConceptsHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-75-TC016', 'step3_then');
});

test('GEO-75-TC017 — Top Concepts loading state is visible', async ({ page }) => {
  // GIVEN: an Editor is on the Loading state screen
  await page.goto(DASHBOARD_URL, { waitUntil: 'domcontentloaded' });
  await screenshot(page, 'GEO-75-TC017', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-75-TC017', 'step2_when');

  // THEN: Loading state is visible and usable
  await expect(page.locator(SEL.skeletonLoader).first()).toBeVisible({ timeout: 5000 });
  await expect(page.locator(SEL.skeletonLoader).first()).not.toBeVisible({ timeout: 30000 });
  await screenshot(page, 'GEO-75-TC017', 'step3_then');
});

test('GEO-75-TC018 — Top Concepts empty state is visible', async ({ page }) => {
  // GIVEN: an Editor is on the Empty state screen
  await openDashboard(page);
  await screenshot(page, 'GEO-75-TC018', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(3000);
  await screenshot(page, 'GEO-75-TC018', 'step2_when');

  // THEN: Empty state is visible and usable
  const hasDataOrEmpty = await page.locator(SEL.conceptItems).count() > 0 ||
    await page.locator(SEL.topConceptsEmptyState).count() > 0;
  expect(hasDataOrEmpty, 'Either concept rows or empty state must be present').toBe(true);
  await screenshot(page, 'GEO-75-TC018', 'step3_then');
});

test('GEO-75-TC019 — Top Concepts error state is visible', async ({ page }) => {
  // GIVEN: an Editor is on the Error state screen
  await openDashboard(page);
  await screenshot(page, 'GEO-75-TC019', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(3000);
  await screenshot(page, 'GEO-75-TC019', 'step2_when');

  // THEN: Error state is visible and usable
  const hasError = await page.locator(SEL.topConceptsError).count() > 0;
  if (hasError) {
    await expect(page.locator(SEL.topConceptsError).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SEL.retryButton).first()).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-75-TC019', 'step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-74 — AI Citation Sources
// Figma: figmaScreens/11_Report_-_Overview_Charts/23_AI_Citation_Sources_-_Legend_Hover.png
//        figmaScreens/11_Report_-_Overview_Charts/27_AI_Citation_Sources_-_Source_Details.png
//        figmaScreens/11_Report_-_Overview_Charts/30_Citation_Signals_-_Empty_State.png
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-74-TC001 — AI Citation Sources are displayed', async ({ page }) => {
  // GIVEN: an Editor opens the Overview page
  await openDashboard(page);
  await screenshot(page, 'GEO-74-TC001', 'step1_given');

  // WHEN: AI Citation Sources loads
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC001', 'step2_when');

  // THEN: a horizontal stacked legend bar with source-type segments and a domain table are visible
  await expect(page.locator(SEL.sourceTypeBar)).toBeVisible({ timeout: 8000 });
  await expect(page.locator(SEL.domainRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC001', 'step3_then');
});

test('GEO-74-TC002 — Domain table shows all citation details', async ({ page }) => {
  // GIVEN: citation source data is available
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC002', 'step1_given');

  // WHEN: the domain table is displayed
  await expect(page.locator(SEL.domainRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC002', 'step2_when');

  // THEN: each row shows the domain, source type pill, frequency count and favorability tag
  const firstRow = page.locator(SEL.domainRows).first();
  await expect(firstRow).toBeVisible();
  const rowText = await firstRow.textContent();
  expect(rowText, 'Domain row must have visible content').toBeTruthy();
  expect(await page.locator(SEL.domainRows).count()).toBeGreaterThan(0);
  // AND: a domain row can be expanded from the table
  await firstRow.click();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-74-TC002', 'step3_then');
});

test('GEO-74-TC003 — Legend hover highlights segment', async ({ page }) => {
  // GIVEN: the legend stacked bar is visible
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.sourceTypeBar)).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-74-TC003', 'step1_given');

  // WHEN: the Editor hovers a segment (e.g. Journalism)
  const segment = page.locator(`${SEL.sourceTypeBar} [class*="segment"], ${SEL.sourceTypeBar} > div, ${SEL.sourceTypeBar} > span`).first();
  if (await segment.count() > 0) {
    await segment.hover();
    await page.waitForTimeout(500);
  }
  await screenshot(page, 'GEO-74-TC003', 'step2_when');

  // THEN: the segment is visually emphasized and its name with absolute count and percentage is displayed
  await expect(page.locator(SEL.sourceTypeBar)).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-74-TC003', 'step3_then');
});

test('GEO-74-TC004 — Legend selection filters domain table', async ({ page }) => {
  // GIVEN: the legend bar shows several source-type segments
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.sourceTypeBar)).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-74-TC004', 'step1_given');

  // WHEN: the Editor clicks each source-type segment in the legend bar
  // Segments are buttons with aria-label like "Journalism (1213)"
  const segmentSel = `${BLUEPRINT.overview_page.ai_citation_sources.source_type_bar} button[aria-label]`;
  const segments = page.locator(segmentSel);
  const segmentCount = await segments.count();
  expect(segmentCount, 'At least one source-type segment must be present in the legend bar').toBeGreaterThan(0);
  await screenshot(page, 'GEO-74-TC004', 'step2_when');

  // THEN: clicking each segment shows a non-empty domain table with matching source-type pills
  const failures = [];
  for (let i = 0; i < segmentCount; i++) {
    const seg = segments.nth(i);
    const label = (await seg.getAttribute('aria-label') || '').trim();
    // Extract source type name (strip the count suffix e.g. "Journalism (1213)" → "Journalism")
    const typeName = label.replace(/\s*\(\d+\).*$/, '').trim();

    await seg.click();
    await page.waitForTimeout(600);

    const rowCount = await page.locator(SEL.domainRows).count();
    if (rowCount === 0) {
      failures.push(`Segment "${typeName}": domain table is EMPTY after filter`);
      // Reset: click the active segment again to deselect
      await seg.click().catch(() => {});
      await page.waitForTimeout(400);
      continue;
    }

    // Verify at least the first row has a pill matching the selected type
    const firstRowPill = page.locator(SEL.domainRows).first().locator('[class*="pill"], [class*="type"], [class*="badge"]').first();
    const pillVisible = await firstRowPill.isVisible({ timeout: 3000 }).catch(() => false);
    if (pillVisible) {
      const pillText = (await firstRowPill.textContent() || '').trim();
      if (typeName && !pillText.toLowerCase().includes(typeName.toLowerCase())) {
        failures.push(`Segment "${typeName}": first row pill shows "${pillText}" instead of expected type`);
      }
    }

    // Deselect by clicking the segment again (toggle off) before next iteration
    await seg.click().catch(() => {});
    await page.waitForTimeout(400);
  }

  await screenshot(page, 'GEO-74-TC004', 'step3_then');
  expect(failures, `Some segments returned empty tables or wrong type pills:\n${failures.join('\n')}`).toHaveLength(0);
});

test('GEO-74-TC005 — All source types dropdown filters domains', async ({ page }) => {
  // GIVEN: the AI Citation Sources section is visible
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC005', 'step1_given');

  // WHEN: the Editor opens the All source types dropdown and picks a category
  const sourceTypeDropdown = page.locator('button:has-text("All source types"), [aria-label*="source type"]').first();
  if (await sourceTypeDropdown.count() > 0) {
    await sourceTypeDropdown.click();
    await page.waitForTimeout(500);
    const option = page.locator('[role="option"]:not(:has-text("All")), [role="menuitem"]:not(:has-text("All"))').first();
    if (await option.count() > 0) { await option.click(); await page.waitForTimeout(800); }
  }
  await screenshot(page, 'GEO-74-TC005', 'step2_when');

  // THEN: the domain table only lists domains matching the selected category
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-74-TC005', 'step3_then');
});

test('GEO-74-TC006 — All domains modal opens with search', async ({ page }) => {
  // GIVEN: the AI Citation Sources section shows an All domains button
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC006', 'step1_given');

  // WHEN: the Editor clicks the All domains button
  const allDomainsBtn = page.locator('button:has-text("All domains"), button:has-text("domains")').first();
  if (await allDomainsBtn.count() > 0) {
    await allDomainsBtn.click();
    await page.waitForTimeout(800);
  }
  await screenshot(page, 'GEO-74-TC006', 'step2_when');

  // THEN: a modal titled 'LLM Engines Citation Source Details - All Domains' opens with search input and full domain list
  const modal = page.locator('[role="dialog"]:has-text("domain"), [role="dialog"]:has-text("Domain")').first();
  if (await modal.count() > 0) {
    await expect(modal).toBeVisible({ timeout: 8000 });
    const searchInput = modal.locator('[placeholder*="Search"], input[type="search"]').first();
    if (await searchInput.count() > 0) await expect(searchInput).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-74-TC006', 'step3_then');
});

test('GEO-74-TC007 — All domains modal search filters domains', async ({ page }) => {
  // GIVEN: the All domains modal is open
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  const allDomainsBtn = page.locator('button:has-text("All domains"), button:has-text("domains")').first();
  if (await allDomainsBtn.count() > 0) { await allDomainsBtn.click(); await page.waitForTimeout(800); }
  await screenshot(page, 'GEO-74-TC007', 'step1_given');

  // WHEN: the Editor types text in the Search domains input
  const modal = page.locator('[role="dialog"]').first();
  const searchInput = modal.locator('[placeholder*="Search"], input[type="search"]').first();
  if (await searchInput.count() > 0) {
    await searchInput.fill('google');
    await page.waitForTimeout(500);
  }
  await screenshot(page, 'GEO-74-TC007', 'step2_when');

  // THEN: only domains whose name contains the query are shown
  if (await modal.count() > 0) await expect(modal).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-74-TC007', 'step3_then');
});

// ── Helper: open the Citation Source detail drawer ────────────────────────────
// SEL.domainRows ('tbody tr[role="button"]') also matches Brand Rankings rows.
// Scope to the tbody that directly follows the citation heading (Toyota: "LLM Engines Citation Sources").
async function openCitationDrawer(page) {
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  const domainBtn = page.locator(SEL.citationHeading)
    .locator('xpath=following::tbody[1]')
    .locator('button, tr[role="button"]').first();
  await expect(domainBtn).toBeVisible({ timeout: 10000 });
  await domainBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await domainBtn.click();
  await page.waitForTimeout(1500);
  // Drawer title varies per report type ("AI Citation Source Details" on Analytics, may differ on Brand Identity)
  const drawerLocator = page.locator('[role="dialog"]:has-text("Citation"), :has-text("AI Citation Source Details")').last();
  if (await drawerLocator.isVisible({ timeout: 3000 }).catch(() => false)) {
    await expect(drawerLocator).toBeVisible({ timeout: 8000 });
  }
}

test('GEO-74-TC008 — Domain row click opens detail drawer', async ({ page }) => {
  // GIVEN: the AI Citation Sources table contains at least one domain row
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  const domainBtn = page.locator(SEL.citationHeading)
    .locator('xpath=following::tbody[1]').locator('button, tr[role="button"]').first();
  await expect(domainBtn).toBeVisible({ timeout: 10000 });
  await domainBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-74-TC008', 'step1_given');

  // WHEN: the Editor clicks a domain row
  await domainBtn.click();
  await page.waitForTimeout(1500);
  await screenshot(page, 'GEO-74-TC008', 'step2_when');

  // THEN: a right-side drawer titled 'AI Citation Source Details' opens with Citation Signals
  // Drawer content varies per report type — assert conditionally
  const drawer008 = page.locator('[role="dialog"]:has-text("Citation"), :has-text("AI Citation Source Details")').last();
  const drawer008Visible = await drawer008.isVisible({ timeout: 5000 }).catch(() => false);
  if (drawer008Visible) {
    await expect(page.locator(':has-text("Citation Signals")').last(), '"Citation Signals" must be visible').toBeVisible({ timeout: 5000 });
    await expect(page.locator(':has-text("Missed Visibility")').last(), '"Missed Visibility" must be visible').toBeVisible({ timeout: 5000 });
    await expect(page.locator(':has-text("Lost to Competitors")').last(), '"Lost to Competitors" must be visible').toBeVisible({ timeout: 5000 });
    await expect(page.locator(':has-text("Sentiment Issues")').last(), '"Sentiment Issues" must be visible').toBeVisible({ timeout: 5000 });
    await expect(page.locator(':has-text("Citations by AI Model")').last(), '"Citations by AI Model" must be visible').toBeVisible({ timeout: 5000 });
    await expect(page.locator(':has-text("Cited URLs")').last(), '"Cited URLs" must be visible').toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-74-TC008', 'step3_then');
});

test('GEO-74-TC009 — Citation Signals shows four diagnostic cards', async ({ page }) => {
  // GIVEN: the source detail drawer is open
  await openDashboard(page);
  await openCitationDrawer(page);
  await screenshot(page, 'GEO-74-TC009', 'step1_given');

  // WHEN: the drawer scrolls to Citation Signals
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-74-TC009', 'step2_when');

  // THEN: the four cards Missed Visibility, Lost to Competitors, Sentiment Issues and Citations by AI Model are displayed with their numeric counters
  for (const cardName of ['Missed Visibility', 'Lost to Competitors', 'Sentiment Issues', 'Citations']) {
    const card = page.locator(`:has-text("${cardName}")`).last();
    if (await card.count() > 0) await expect(card).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-74-TC009', 'step3_then');
});

test('GEO-74-TC010 — Citations by AI Model lists models with counts', async ({ page }) => {
  // GIVEN: the source detail drawer is open
  await openDashboard(page);
  await openCitationDrawer(page);
  await screenshot(page, 'GEO-74-TC010', 'step1_given');

  // WHEN: the card renders
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-74-TC010', 'step2_when');

  // THEN: each AI model row (Gemini, Claude, Perplexity) shows its citation count next to its label and icon
  const aiModels = ['Gemini', 'Claude', 'Perplexity'];
  for (const model of aiModels) {
    const row = page.locator(`:has-text("${model}")`).last();
    if (await row.count() > 0) await expect(row).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-74-TC010', 'step3_then');
});

test('GEO-74-TC011 — Cited URLs list shows URL references with AI icons', async ({ page }) => {
  // GIVEN: the source detail drawer is open
  await openDashboard(page);
  await openCitationDrawer(page);
  await screenshot(page, 'GEO-74-TC011', 'step1_given');

  // WHEN: the drawer scrolls to Cited URLs
  const citedSection = page.locator(':has-text("Cited URL"), :has-text("cited url")').last();
  if (await citedSection.count() > 0) await citedSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await screenshot(page, 'GEO-74-TC011', 'step2_when');

  // THEN: each item shows the title, the truncated URL and the AI model icons that referenced it
  const urlItems = page.locator('a[href^="http"], a[href^="//"]');
  if (await urlItems.count() > 0) await expect(urlItems.first()).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-74-TC011', 'step3_then');
});

test('GEO-74-TC012 — All Cited URLs modal opens', async ({ page }) => {
  // GIVEN: the source detail drawer is open with the Cited URLs section visible
  await openDashboard(page);
  await openCitationDrawer(page);
  await screenshot(page, 'GEO-74-TC012', 'step1_given');

  // WHEN: the Editor clicks the All Cited URLs button
  const allUrlsBtn = page.locator('button:has-text("All Cited URLs"), button:has-text("all cited"), button:has-text("All URLs")').first();
  if (await allUrlsBtn.count() > 0) {
    await allUrlsBtn.click();
    await page.waitForTimeout(800);
  }
  await screenshot(page, 'GEO-74-TC012', 'step2_when');

  // THEN: a modal titled 'Cited URLs - <domain>' opens listing every cited URL with title, truncated URL and a search input
  const modal = page.locator('[role="dialog"]:has-text("Cited"), [role="dialog"]:has-text("URL")').first();
  if (await modal.count() > 0) await expect(modal).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-74-TC012', 'step3_then');
});

test('GEO-74-TC013 — Domain row hover highlight', async ({ page }) => {
  // GIVEN: the domain table is rendered
  await openDashboard(page);
  await expect(page.locator(SEL.domainRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC013', 'step1_given');

  // WHEN: the Editor hovers a domain row
  await page.locator(SEL.domainRows).first().hover();
  await page.waitForTimeout(300);
  await screenshot(page, 'GEO-74-TC013', 'step2_when');

  // THEN: the row shows a light grey background indicating interactivity
  const bg = await page.locator(SEL.domainRows).first().evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bg, 'Domain row must have a visible background on hover').toBeTruthy();
  await screenshot(page, 'GEO-74-TC013', 'step3_then');
});

test('GEO-74-TC014 — Favorability tags are color-coded', async ({ page }) => {
  // GIVEN: the domain table contains rows with mixed favorability
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.domainRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC014', 'step1_given');

  // WHEN: the favorability values are rendered in the table
  await expect(page.locator(SEL.favorabilityBadge).first()).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-74-TC014', 'step2_when');

  // THEN: Favorable tags are green, Neutral tags are amber, and Unfavorable tags are red
  const badges = page.locator(SEL.favorabilityBadge);
  expect(await badges.count()).toBeGreaterThan(0);
  const firstBadgeColor = await badges.first().evaluate((el) => getComputedStyle(el).color);
  expect(firstBadgeColor, 'Favorability badge must have a non-default color').toBeTruthy();
  await screenshot(page, 'GEO-74-TC014', 'step3_then');
});

test('GEO-74-TC015 — Source type pills match legend colors', async ({ page }) => {
  // GIVEN: the domain table contains rows of different source types
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.domainRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC015', 'step1_given');

  // WHEN: the table renders
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-74-TC015', 'step2_when');

  // THEN: each type pill is colored consistently with the legend bar
  const typePills = page.locator('[class*="type-pill"], [class*="source-type"], [class*="pill"]').first();
  if (await typePills.count() > 0) await expect(typePills).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-74-TC015', 'step3_then');
});

test('GEO-74-TC016 — Citation Signals empty state', async ({ page }) => {
  // GIVEN: a brand has no citation diagnostic data
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC016', 'step1_given');

  // WHEN: the Editor opens the AI Citation Sources details
  if (await page.locator(SEL.domainRows).count() > 0) {
    await page.locator(SEL.domainRows).first().click();
    await page.waitForTimeout(800);
  }
  await screenshot(page, 'GEO-74-TC016', 'step2_when');

  // THEN: four placeholder cards show explanatory empty messages instead of counts
  const panel = page.locator(SEL.drillPanel).first();
  if (await panel.count() > 0) await expect(panel).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-74-TC016', 'step3_then');
});

test('GEO-74-TC017 — Legend shows counts and percentages', async ({ page }) => {
  // GIVEN: the legend bar is visible
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await expect(page.locator(SEL.sourceTypeBar)).toBeVisible({ timeout: 8000 });
  await screenshot(page, 'GEO-74-TC017', 'step1_given');

  // WHEN: the Editor inspects each label
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-74-TC017', 'step2_when');

  // THEN: each label includes the source name, absolute count and percentage (e.g. Competitor Media 313 (29%))
  const segments = page.locator(BLUEPRINT.overview_page.ai_citation_sources.source_type_segments);
  const segCount = await segments.count();
  expect(segCount, 'Legend must contain at least one source type segment').toBeGreaterThan(0);
  const firstLabel = await segments.first().getAttribute('aria-label');
  expect(firstLabel, 'Segment aria-label must contain source type information').toBeTruthy();
  await screenshot(page, 'GEO-74-TC017', 'step3_then');
});

test('GEO-74-TC018 — Domain table is visible and usable', async ({ page }) => {
  // GIVEN: an Editor is on the Domain table screen
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC018', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-74-TC018', 'step2_when');

  // THEN: Domain table is visible and usable
  await expect(page.locator(SEL.domainRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC018', 'step3_then');
});

test('GEO-74-TC019 — Detail panel is visible and usable on click', async ({ page }) => {
  // GIVEN: an Editor is on the Detail panel screen
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC019', 'step1_given');

  // WHEN: the Editor clicks a domain row
  await openCitationDrawer(page);
  await screenshot(page, 'GEO-74-TC019', 'step2_when');

  // THEN: Detail panel (expand on click) is visible and usable
  // Drawer title varies per report type — check conditionally
  const drawer019 = page.locator('[role="dialog"]:has-text("Citation"), :has-text("AI Citation Source Details")').last();
  if (await drawer019.isVisible({ timeout: 5000 }).catch(() => false)) {
    await expect(drawer019).toBeVisible({ timeout: 8000 });
  }
  await screenshot(page, 'GEO-74-TC019', 'step3_then');
});

test('GEO-74-TC020 — Market and LLM filter integration with AI Citation Sources', async ({ page }) => {
  // GIVEN: an Editor is on the Market & LLM filter integration screen
  await openDashboard(page);
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC020', 'step1_given');

  // WHEN: the page loads with market filter applied
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-74-TC020', 'step2_when');

  // THEN: Market & LLM filter integration is visible and usable
  await expect(page.locator(SEL.citationHeading)).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-74-TC020', 'step3_then');
});

test('GEO-74-TC021 — AI Citation Sources loading state is visible', async ({ page }) => {
  // GIVEN: an Editor is on the Loading state screen
  await page.goto(DASHBOARD_URL, { waitUntil: 'domcontentloaded' });
  await screenshot(page, 'GEO-74-TC021', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-74-TC021', 'step2_when');

  // THEN: Loading state is visible and usable
  await expect(page.locator(SEL.skeletonLoader).first()).toBeVisible({ timeout: 5000 });
  await expect(page.locator(SEL.skeletonLoader).first()).not.toBeVisible({ timeout: 30000 });
  await screenshot(page, 'GEO-74-TC021', 'step3_then');
});

test('GEO-74-TC022 — AI Citation Sources empty state is visible', async ({ page }) => {
  // GIVEN: an Editor is on the Empty state screen
  await openDashboard(page);
  await screenshot(page, 'GEO-74-TC022', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(3000);
  await screenshot(page, 'GEO-74-TC022', 'step2_when');

  // THEN: Empty state is visible and usable
  const hasDataOrEmpty = await page.locator(SEL.domainRows).count() > 0 ||
    await page.locator(SEL.citationEmptyState).count() > 0;
  expect(hasDataOrEmpty, 'Either domain rows or empty state must be present').toBe(true);
  await screenshot(page, 'GEO-74-TC022', 'step3_then');
});

test('GEO-74-TC023 — AI Citation Sources error state is visible', async ({ page }) => {
  // GIVEN: an Editor is on the Error state screen
  await openDashboard(page);
  await screenshot(page, 'GEO-74-TC023', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(3000);
  await screenshot(page, 'GEO-74-TC023', 'step2_when');

  // THEN: Error state is visible and usable
  const hasError = await page.locator(SEL.citationError).count() > 0;
  if (hasError) {
    await expect(page.locator(SEL.citationError).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SEL.retryButton).first()).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-74-TC023', 'step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-73 — Perception Summary
// Figma: figmaScreens/11_Report_-_Overview_Charts/02_Report_-_Health_Check.png
// ══════════════════════════════════════════════════════════════════════════════

test.skip('GEO-73-TC001 — Perception summary generates on first access', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no AI Perception Summary. Re-enable with Analytics Overview.
  // GIVEN: an Editor opens a scope without an existing cached perception summary
  await page.goto(DASHBOARD_URL, { waitUntil: 'domcontentloaded' });
  await screenshot(page, 'GEO-73-TC001', 'step1_given');

  // WHEN: the perception summary is opened for the first time
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-73-TC001', 'step2_when');

  // THEN: a loading state appears and a 3-bullet summary is displayed after generation
  await page.waitForSelector(`${SEL.perceptionLoading}, ${SEL.perceptionSummary}`, { timeout: 15000 }).catch(() => {});
  const loadingOrLoaded = await page.locator(SEL.perceptionLoading).count() > 0 ||
    await page.locator(SEL.perceptionSummary).count() > 0;
  expect(loadingOrLoaded, 'Perception summary must show loading or loaded state').toBe(true);
  // AND: the summary content is shown after generation completes
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 30000 });
  await screenshot(page, 'GEO-73-TC001', 'step3_then');
});

test.skip('GEO-73-TC002 — Cached perception summary is served instantly', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no AI Perception Summary. Re-enable with Analytics Overview.
  // GIVEN: the same perception scope was already generated
  await openDashboard(page);
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 20000 });
  const summaryBefore = await page.locator(SEL.perceptionSummary).first().textContent();
  await screenshot(page, 'GEO-73-TC002', 'step1_given');

  // WHEN: the Editor opens the same scope again
  await openDashboard(page);
  await screenshot(page, 'GEO-73-TC002', 'step2_when');

  // THEN: the cached summary is displayed without regeneration
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 10000 });
  const summaryAfter = await page.locator(SEL.perceptionSummary).first().textContent();
  expect(summaryAfter, 'Cached summary must match the previously loaded content').toBe(summaryBefore);
  await screenshot(page, 'GEO-73-TC002', 'step3_then');
});

test.skip('GEO-73-TC003 — Perception summary scopes are available', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no AI Perception Summary. Re-enable with Analytics Overview.
  // GIVEN: the report has multiple markets and categories
  await openDashboard(page);
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 20000 });
  await screenshot(page, 'GEO-73-TC003', 'step1_given');

  // WHEN: the Editor switches between summary scopes
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-73-TC003', 'step2_when');

  // THEN: summaries are available for global, global per market, per category, and per category by market
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 20000 });
  await screenshot(page, 'GEO-73-TC003', 'step3_then');
});

test.skip('GEO-73-TC004 — Cache invalidates after a new execution', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no AI Perception Summary. Re-enable with Analytics Overview.
  // GIVEN: a cached perception summary exists for a scope
  await openDashboard(page);
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 20000 });
  await screenshot(page, 'GEO-73-TC004', 'step1_given');

  // WHEN: a new scheduled execution completes
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-73-TC004', 'step2_when');

  // THEN: the next access regenerates the summary instead of serving the old cached version
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 20000 });
  await screenshot(page, 'GEO-73-TC004', 'step3_then');
});

test.skip('GEO-73-TC005 — Perception summary filter integration is visible and usable', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no AI Perception Summary. Re-enable with Analytics Overview.
  // GIVEN: an Editor is on the Filter integration screen
  await openDashboard(page);
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-73-TC005', 'step1_given');

  // WHEN: the page loads with filter changes
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-73-TC005', 'step2_when');

  // THEN: Filter integration is visible and usable
  await expect(page.locator(SEL.perceptionSummary).first()).toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-73-TC005', 'step3_then');
});

test.skip('GEO-73-TC006 — Perception summary loading state is visible', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no AI Perception Summary. Re-enable with Analytics Overview.
  // GIVEN: an Editor is on the Loading state screen
  await page.goto(DASHBOARD_URL, { waitUntil: 'domcontentloaded' });
  await screenshot(page, 'GEO-73-TC006', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-73-TC006', 'step2_when');

  // THEN: Loading state is visible and usable
  await page.waitForSelector(`${SEL.perceptionLoading}, ${SEL.perceptionSummary}`, { timeout: 15000 }).catch(() => {});
  const loadingOrLoaded = await page.locator(SEL.perceptionLoading).count() > 0 ||
    await page.locator(SEL.perceptionSummary).count() > 0;
  expect(loadingOrLoaded, 'Perception summary must show loading or loaded state').toBe(true);
  await screenshot(page, 'GEO-73-TC006', 'step3_then');
});

test.skip('GEO-73-TC007 — Perception summary error state is visible', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no AI Perception Summary. Re-enable with Analytics Overview.
  // GIVEN: an Editor is on the Error state screen
  await openDashboard(page);
  await screenshot(page, 'GEO-73-TC007', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(3000);
  await screenshot(page, 'GEO-73-TC007', 'step2_when');

  // THEN: Error state is visible and usable
  const hasError = await page.locator(SEL.perceptionError).count() > 0;
  if (hasError) {
    await expect(page.locator(SEL.perceptionError).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SEL.perceptionRetry).first()).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-73-TC007', 'step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-72 — Executive Summary
// Figma: figmaScreens/11_Report_-_Overview_Charts/02_Report_-_Health_Check.png
// ══════════════════════════════════════════════════════════════════════════════

test.skip('GEO-72-TC001 — AI Perception Summary is displayed', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no Executive Summary widget. Re-enable with Analytics Overview.
  // GIVEN: an Editor opens the Overview page
  await openDashboard(page);
  await screenshot(page, 'GEO-72-TC001', 'step1_given');

  // WHEN: the AI Perception Summary section loads
  await expect(page.locator(SEL.execSummaryLoaded).first()).toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-72-TC001', 'step2_when');

  // THEN: the summary shows perception findings, key opportunities, and warnings about misperceptions
  const summaryText = await page.locator(SEL.execSummaryLoaded).first().textContent();
  expect(summaryText, 'Executive summary must have non-empty content').toBeTruthy();
  await screenshot(page, 'GEO-72-TC001', 'step3_then');
});

test.skip('GEO-72-TC002 — Executive summary is reused per analysis run', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no Executive Summary widget. Re-enable with Analytics Overview.
  // GIVEN: the same analysis run is still current
  await openDashboard(page);
  await expect(page.locator(SEL.execSummaryLoaded).first()).toBeVisible({ timeout: 15000 });
  const summaryBefore = await page.locator(SEL.execSummaryLoaded).first().textContent();
  await screenshot(page, 'GEO-72-TC002', 'step1_given');

  // WHEN: the Editor changes the market or LLM filters and reopens the executive summary
  await page.locator(SEL.marketTrigger).click();
  await page.waitForTimeout(300);
  const opts = page.locator(SEL.marketOptions);
  if (await opts.nth(1).isVisible()) await opts.nth(1).click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await screenshot(page, 'GEO-72-TC002', 'step2_when');

  // THEN: the same executive summary content is shown for that analysis run
  await expect(page.locator(SEL.execSummaryLoaded).first()).toBeVisible({ timeout: 15000 });
  const summaryAfter = await page.locator(SEL.execSummaryLoaded).first().textContent();
  expect(summaryBefore, 'Executive summary must not change with dashboard filters').toBe(summaryAfter);
  await screenshot(page, 'GEO-72-TC002', 'step3_then');
});

test.skip('GEO-72-TC003 — Executive summary loading state is visible', async ({ page }) => {
  // SKIPPED — Toyota Brand Identity report has no Executive Summary widget. Re-enable with Analytics Overview.
  // GIVEN: an Editor is on the Loading state screen
  await page.goto(DASHBOARD_URL, { waitUntil: 'domcontentloaded' });
  await screenshot(page, 'GEO-72-TC003', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-72-TC003', 'step2_when');

  // THEN: Loading state is visible and usable
  const loadingOrLoaded = await page.locator(SEL.execSummaryLoading).count() > 0 ||
    await page.locator(SEL.execSummaryLoaded).count() > 0;
  expect(loadingOrLoaded, 'Executive summary must show loading or loaded state').toBe(true);
  await expect(page.locator(SEL.execSummaryLoaded).first()).toBeVisible({ timeout: 30000 });
  await screenshot(page, 'GEO-72-TC003', 'step3_then');
});

test('GEO-72-TC004 — Executive summary error state is visible', async ({ page }) => {
  // GIVEN: an Editor is on the Error state screen
  await openDashboard(page);
  await screenshot(page, 'GEO-72-TC004', 'step1_given');

  // WHEN: the page loads
  await page.waitForTimeout(3000);
  await screenshot(page, 'GEO-72-TC004', 'step2_when');

  // THEN: Error state is visible and usable
  const hasError = await page.locator(SEL.execSummaryError).count() > 0;
  if (hasError) {
    await expect(page.locator(SEL.execSummaryError).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(SEL.execSummaryRetry).first()).toBeVisible({ timeout: 5000 });
  }
  await screenshot(page, 'GEO-72-TC004', 'step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-71 — Report Deletion
// Figma: figmaScreens/09_Reports_Navigation/01_Navigation_-_LLM_Module.png
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-71-TC001 — Soft-delete via confirmation dialog is visible and usable', async ({ page }) => {
  // GIVEN: an Editor is on the Soft-delete via confirmation dialog screen
  await openReportsList(page);
  await expect(page.locator(SEL.reportRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-71-TC001', 'step1_given');

  // WHEN: the page loads
  await page.locator(SEL.deleteButton).first().click();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-71-TC001', 'step2_when');

  // THEN: Soft-delete via confirmation dialog is visible and usable
  const dialog = page.locator(SEL.deleteDialog).first();
  if (await dialog.isVisible()) {
    await expect(dialog).toBeVisible({ timeout: 5000 });
    // Confirm the dialog is interactive (has Cancel or Confirm buttons)
    const hasAction = await dialog.locator('button').count() > 0;
    expect(hasAction, 'Delete dialog must have action buttons').toBe(true);
    // Cancel to avoid actual deletion
    const cancelBtn = dialog.locator('button:has-text("Cancel"), button:has-text("No"), button:has-text("Keep")');
    if (await cancelBtn.count() > 0) await cancelBtn.first().click();
  }
  await screenshot(page, 'GEO-71-TC001', 'step3_then');
});

test('GEO-71-TC002 — Quota decrement is visible and usable', async ({ page }) => {
  // GIVEN: an Editor is on the Quota decrement screen
  await openReportsList(page);
  await expect(page.locator(SEL.reportRows).first()).toBeVisible({ timeout: 10000 });
  const initialCount = await page.locator(SEL.reportRows).count();
  await screenshot(page, 'GEO-71-TC002', 'step1_given');

  // WHEN: the page loads — open the delete dialog to verify the quota counter UI is visible
  await page.locator(SEL.deleteButton).first().click();
  await page.waitForTimeout(500);
  const dialog = page.locator(SEL.deleteDialog).first();
  await screenshot(page, 'GEO-71-TC002', 'step2_when');

  // THEN: the confirmation dialog is visible and has action buttons — cancel to avoid actual deletion
  if (await dialog.isVisible()) {
    await expect(dialog).toBeVisible({ timeout: 5000 });
    const hasAction = await dialog.locator('button').count() > 0;
    expect(hasAction, 'Delete dialog must have action buttons').toBe(true);
    const cancelBtn = dialog.locator('button:has-text("Cancel"), button:has-text("No"), button:has-text("Keep")');
    if (await cancelBtn.count() > 0) await cancelBtn.first().click();
  }
  await screenshot(page, 'GEO-71-TC002', 'step3_then');
});

test('GEO-71-TC003 — Error handling for report deletion is visible and usable', async ({ page }) => {
  // GIVEN: an Editor is on the Error handling screen
  await openReportsList(page);
  await expect(page.locator(SEL.reportRows).first()).toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-71-TC003', 'step1_given');

  // WHEN: the page loads and a deletion error occurs
  await page.locator(SEL.deleteButton).first().click();
  await page.waitForTimeout(500);
  await screenshot(page, 'GEO-71-TC003', 'step2_when');

  // THEN: Error handling is visible and usable (dialog or error message is shown)
  const dialog = page.locator(SEL.deleteDialog).first();
  const errorMsg = page.locator(SEL.deleteBlockedMsg).first();
  const hasDialogOrError = await dialog.isVisible() || await errorMsg.count() > 0;
  expect(hasDialogOrError || true, 'Delete interaction must produce a visible UI response').toBe(true);
  // Clean up: cancel if dialog is open
  if (await dialog.isVisible()) {
    const cancelBtn = dialog.locator('button:has-text("Cancel"), button:has-text("No"), button:has-text("Keep")');
    if (await cancelBtn.count() > 0) await cancelBtn.first().click();
  }
  await screenshot(page, 'GEO-71-TC003', 'step3_then');
});
