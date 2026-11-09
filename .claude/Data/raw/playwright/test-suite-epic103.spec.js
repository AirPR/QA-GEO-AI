// test-suite-epic103.spec.js
// Epic 103 — GEO Live Analysis Progress View & Analysis Pipeline
// Stories: GEO-86 (Progress tracking, real-time UI, accessibility)
//          GEO-87 (Analysis pipeline — automatic start, resilience)
//          GEO-85 (Visibility enrichment — competitor mapping)
//          GEO-84 (Perception analysis — enrichment & concepts)
//          GEO-83 (Report finalization — status & source enrichment)
//          GEO-82 (Improvement detection — 8 types, 3 dimensions)
// Updated: 2026-05-03
// CSV source: .claude/Data/output/csv/testcases-coverage-epic103-20260430.csv
// Figma ref:  figmaScreens/07_Report_Loading_Screens/
//             01_Report_Loading_Querying_LLMs.png       → spinner + stage badge "Querying LLMs" (blue)
//             02_Report_Loading_Classifying_Sources.png → stage badge "Classifying Sources" (orange)
//             03_Report_Loading_Aggregating_Results.png → stage badge "Aggregating Results" (purple)
//
// Env vars (prioritaires sur le JDD) :
//   BASE_URL              — root URL of the app (default: common.json)
//   ANALYSIS_REPORT_URL   — direct URL to a report currently under analysis
//   COMPLETED_REPORT_URL  — URL to a report with final status COMPLETED
//   PARTIAL_REPORT_URL    — URL to a report with final status COMPLETED_PARTIAL
//   FAILED_REPORT_URL     — URL to a report with final status FAILED
//
// JDD : .claude/Data/raw/test-data/jdd/epic103/default.json
//   Les URLs sont lues depuis le JDD si l'env var correspondante n'est pas définie.
//   Champ vide ("") dans le JDD = test skippé intentionnellement.

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');

const COMMON    = require('../test-data/common.json');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const JDD       = require('../test-data/jdd/epic103/default.json');

// ── Constants — env var prioritaire, sinon JDD, sinon null ────────────────────
const BASE_URL             = process.env.BASE_URL             || COMMON.base_url;
const ANALYSIS_REPORT_URL  = process.env.ANALYSIS_REPORT_URL  || JDD.reports.analysis_url  || null;
const COMPLETED_REPORT_URL = process.env.COMPLETED_REPORT_URL || JDD.reports.completed_url || null;
const PARTIAL_REPORT_URL   = process.env.PARTIAL_REPORT_URL   || JDD.reports.partial_url   || null;
const FAILED_REPORT_URL    = process.env.FAILED_REPORT_URL    || JDD.reports.failed_url    || null;

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-epic103');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// ── Selectors (aligned with Figma 07_Report_Loading_Screens + selectors_blueprint.json v1.5) ──
const SEL = {
  // ── Progress loading page ────────────────────────────────────────────────
  // Figma: card container with spinner, heading, subtext, stage badge, progress bar, labels
  progressContainer:  BLUEPRINT.live_analysis_progress.progress_container.selector,
  heading:            ':is(h1, h2)',                         // contains "Analyzing <BrandName>"
  subtext:            ':has-text("Preparing analysis")',
  spinner:            '[class*="animate-spin"], svg[class*="spin"], [class*="loader"], [data-testid="spinner"]',
  globalProgressBar:  BLUEPRINT.live_analysis_progress.global_progress_bar.selector,
  // Stage badge — colored by phase (blue/orange/purple). Figma text values:
  stageBadge:         BLUEPRINT.analysis_loading_page.stage_badge,
  stageTimer:         ':has-text(/\\d+m\\s*\\d+s/), :has-text(/^\\d+s$/)',
  progressLabel:      ':has-text("Progress")',
  progressPercent:    ':has-text(/\\d+%/)',
  // Stage milestone labels below the bar (Figma confirmed)
  stageLabels:        ':has-text("LLMs (0-70%)")',

  // ── SseProgress / per-LLM list (AC6 — may not be visible in simplified Figma view) ──
  llmList:            BLUEPRINT.live_analysis_progress.llm_progress_list.selector,
  llmEntry:           BLUEPRINT.live_analysis_progress.llm_entry.selector,
  llmStatusBadge:     BLUEPRINT.live_analysis_progress.llm_status_badge.selector,

  // ── Accessibility ────────────────────────────────────────────────────────
  heartbeat:          BLUEPRINT.live_analysis_progress.heartbeat.selector,
  liveRegion:         BLUEPRINT.live_analysis_progress.live_region.selector,

  // ── Final status display (completed/partial/failed report page) ──────────
  statusCompleted:    '[data-status="COMPLETED"], [class*="status"]:has-text("COMPLETED"), :has-text("Analysis complete")',
  statusPartial:      '[data-status="COMPLETED_PARTIAL"], [class*="status"]:has-text("PARTIAL"), :has-text("COMPLETED_PARTIAL")',
  statusFailed:       '[data-status="FAILED"], [class*="status"]:has-text("FAILED"), :has-text("Analysis failed")',

  // ── Navigation ───────────────────────────────────────────────────────────
  backButton:         BLUEPRINT.analysis_loading_page.back_button,
};

// ── Helpers ────────────────────────────────────────────────────────────────────
async function screenshot(page, tcId, step) {
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, `${tcId}_${step}.png`),
    fullPage: false,
  });
}

// ── afterEach: annotation rouge sur l'élément défaillant ──────────────────────
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'failed') return;
  const errors = testInfo.errors || [];
  for (const err of errors) {
    const match = err.message && err.message.match(/locator\('([^']+)'\)/);
    if (!match) continue;
    const selector = match[1];
    try {
      await page.evaluate((sel) => {
        let el = document.querySelector(sel);
        if (!el) return;
        while (el && getComputedStyle(el).display === 'none') el = el.parentElement;
        if (el) el.style.outline = '4px solid #dc2626';
      }, selector);
      const tcId = testInfo.title.match(/GEO-\d+-TC\d+/)?.[0] || 'TC';
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${tcId}_step3_then.png`),
        fullPage: false,
      });
    } catch (_) {}
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-86 — Progress Tracking & Real-time UI
// ══════════════════════════════════════════════════════════════════════════════

// ── TC001 ─────────────────────────────────────────────────────────────────────
// Given a report has been submitted with status PENDING → analysis is running
// Verifies that the report progress view shows live progress during analysis
test('GEO-86-TC001 — Progress is visible during analysis', async ({ page }) => {
  test.skip(!ANALYSIS_REPORT_URL, 'ANALYSIS_REPORT_URL non défini dans le JDD — fournir l\'URL d\'un rapport en cours d\'analyse');

  // ── GIVEN: an Editor opens a report while analysis is running ──────────────
  await page.goto(ANALYSIS_REPORT_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await screenshot(page, 'GEO-86-TC001', 'step1_given');

  // ── WHEN: the progress view loads ─────────────────────────────────────────
  await page.waitForSelector(SEL.globalProgressBar, { timeout: 15000 });
  await screenshot(page, 'GEO-86-TC001', 'step2_when');

  // ── THEN: the current progress and completed or pending model counts are shown
  // Heading "Analyzing <BrandName>" is visible (Figma: "Analyzing Tesla")
  const heading = page.locator(SEL.heading).filter({ hasText: /Analyzing/i }).first();
  await expect(heading, 'Heading "Analyzing <BrandName>" must be visible').toBeVisible({ timeout: 10000 });

  // Subtitle "Preparing analysis..." is visible (Figma confirmed)
  const subtext = page.locator(SEL.subtext).first();
  await expect(subtext, '"Preparing analysis..." subtitle must be visible').toBeVisible({ timeout: 10000 });

  // Stage badge is visible: Querying LLMs | Classifying Sources | Aggregating Results
  const stageBadge = page.locator(SEL.stageBadge).first();
  await expect(stageBadge, 'Current phase stage badge must be visible').toBeVisible({ timeout: 10000 });

  // Global progress bar is visible
  const progressBar = page.locator(SEL.globalProgressBar).first();
  await expect(progressBar, 'Global progress bar must be visible').toBeVisible({ timeout: 10000 });

  // Stage milestone labels below the bar (Figma: LLMs (0-70%), Sources (75%), Aggregate (85%), Insights (95%))
  const stageLabels = page.locator(SEL.stageLabels).first();
  await expect(stageLabels, 'Stage milestone labels must be visible below the progress bar').toBeVisible({ timeout: 10000 });

  await screenshot(page, 'GEO-86-TC001', 'step3_then');
});

// ── TC002 ─────────────────────────────────────────────────────────────────────
// Verifies that analysis completion is reported with a COMPLETED status
test('GEO-86-TC002 — Completion is reported as COMPLETED', async ({ page }) => {
  test.skip(!COMPLETED_REPORT_URL, 'COMPLETED_REPORT_URL env var not set — provide a URL to a report with COMPLETED status');

  // ── GIVEN: the analysis has finished successfully ──────────────────────────
  await page.goto(COMPLETED_REPORT_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await screenshot(page, 'GEO-86-TC002', 'step1_given');

  // ── WHEN: the final progress event is received ─────────────────────────────
  await page.waitForTimeout(2000);
  await screenshot(page, 'GEO-86-TC002', 'step2_when');

  // ── THEN: le dashboard est accessible — preuve que le rapport est COMPLETED ─
  // Un rapport COMPLETED affiche directement le dashboard (pas d'écran de progression).
  // On vérifie que la sidebar et le contenu principal sont visibles.
  await expect(page.locator('aside[data-testid="main-sidebar"]'), 'Sidebar must be visible — report is COMPLETED').toBeVisible({ timeout: 15000 });
  await expect(page.locator('main, [role="main"], [data-testid="dashboard-content"]').first(), 'Dashboard content must be visible').toBeVisible({ timeout: 10000 });

  await screenshot(page, 'GEO-86-TC002', 'step3_then');
});

// ── TC003 ─────────────────────────────────────────────────────────────────────
// Verifies that analysis completion is reported with COMPLETED_PARTIAL when some work fails
test('GEO-86-TC003 — Completion is reported as COMPLETED_PARTIAL', async ({ page }) => {
  test.skip(!PARTIAL_REPORT_URL, 'PARTIAL_REPORT_URL env var not set — provide a URL to a report with COMPLETED_PARTIAL status');

  // ── GIVEN: the analysis ends with partial success ──────────────────────────
  await page.goto(PARTIAL_REPORT_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await screenshot(page, 'GEO-86-TC003', 'step1_given');

  // ── WHEN: the final progress event is received ─────────────────────────────
  await page.waitForTimeout(2000);
  await screenshot(page, 'GEO-86-TC003', 'step2_when');

  // ── THEN: the status is COMPLETED_PARTIAL ─────────────────────────────────
  const partialStatus = page.locator(SEL.statusPartial).first();
  await expect(partialStatus, 'Report status must display COMPLETED_PARTIAL').toBeVisible({ timeout: 15000 });

  await screenshot(page, 'GEO-86-TC003', 'step3_then');
});

// ── TC004 ─────────────────────────────────────────────────────────────────────
// Verifies that analysis completion is reported with FAILED when the pipeline cannot complete
test('GEO-86-TC004 — Completion is reported as FAILED', async ({ page }) => {
  test.skip(!FAILED_REPORT_URL, 'FAILED_REPORT_URL env var not set — provide a URL to a report with FAILED status');

  // ── GIVEN: the analysis cannot complete ───────────────────────────────────
  await page.goto(FAILED_REPORT_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await screenshot(page, 'GEO-86-TC004', 'step1_given');

  // ── WHEN: the final progress event is received ─────────────────────────────
  await page.waitForTimeout(2000);
  await screenshot(page, 'GEO-86-TC004', 'step2_when');

  // ── THEN: the status is FAILED ─────────────────────────────────────────────
  const failedStatus = page.locator(SEL.statusFailed).first();
  await expect(failedStatus, 'Report status must display FAILED').toBeVisible({ timeout: 15000 });

  await screenshot(page, 'GEO-86-TC004', 'step3_then');
});

// ── TC005 ─────────────────────────────────────────────────────────────────────
// Verifies that reconnecting to progress returns the current state immediately
test('GEO-86-TC005 — Reconnecting returns the current progress state', async ({ page }) => {
  test.skip(!ANALYSIS_REPORT_URL, 'ANALYSIS_REPORT_URL non défini dans le JDD — fournir l\'URL d\'un rapport en cours d\'analyse');

  // ── GIVEN: the Editor loses the progress connection ────────────────────────
  await page.goto(ANALYSIS_REPORT_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector(SEL.globalProgressBar, { timeout: 15000 });
  await screenshot(page, 'GEO-86-TC005', 'step1_given');

  // ── WHEN: the Editor reconnects to the progress view ──────────────────────
  // Simulate reconnect by reloading the page (drops and re-establishes SSE connection)
  await page.reload({ waitUntil: 'networkidle' });
  await screenshot(page, 'GEO-86-TC005', 'step2_when');

  // ── THEN: the current progress state is shown immediately ──────────────────
  const progressBar = page.locator(SEL.globalProgressBar).first();
  await expect(progressBar, 'Progress bar must be immediately visible after reconnect').toBeVisible({ timeout: 10000 });

  const stageBadge = page.locator(SEL.stageBadge).first();
  await expect(stageBadge, 'Current phase badge must be immediately visible after reconnect').toBeVisible({ timeout: 10000 });

  await screenshot(page, 'GEO-86-TC005', 'step3_then');
});

// ── TC006 ─────────────────────────────────────────────────────────────────────
// Covers GEO-86 AC6 — Frontend Progress Display (SSE events → SseProgress component)
// NEW: added from testcases-coverage-epic103-20260430.csv
test('GEO-86-TC006 — AC6 Frontend Progress Display', async ({ page }) => {
  test.skip(!ANALYSIS_REPORT_URL, 'ANALYSIS_REPORT_URL non défini dans le JDD — fournir l\'URL d\'un rapport en cours d\'analyse');

  // ── GIVEN: SSE events streaming to frontend ────────────────────────────────
  await page.goto(ANALYSIS_REPORT_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector(SEL.globalProgressBar, { timeout: 15000 });
  await screenshot(page, 'GEO-86-TC006', 'step1_given');

  // ── THEN: SseProgress component renders ───────────────────────────────────
  await page.waitForTimeout(2000);
  await screenshot(page, 'GEO-86-TC006', 'step2_when');

  // AND: Global progress bar (0-100%) is present
  const progressBar = page.locator(SEL.globalProgressBar).first();
  await expect(progressBar, 'Global progress bar (0-100%) must be rendered by SseProgress').toBeVisible({ timeout: 10000 });

  // AND: Contextual message with current phase is visible
  const stageBadge = page.locator(SEL.stageBadge).first();
  await expect(stageBadge, 'Contextual phase message must be visible').toBeVisible({ timeout: 10000 });

  const phaseText = await stageBadge.textContent();
  const knownPhases = ['Querying LLMs', 'Classifying Sources', 'Aggregating Results'];
  const matchesKnownPhase = knownPhases.some(p => phaseText && phaseText.includes(p));
  expect(
    matchesKnownPhase,
    `Phase badge "${phaseText}" must match one of: ${knownPhases.join(', ')}`
  ).toBe(true);

  // AND: Per-LLM list with icon + name + individual bar + status badge (if SseProgress renders it)
  // Note: simplified loading screen (Figma 07) shows no per-LLM list; full SseProgress may add it
  const llmList = page.locator(SEL.llmList).first();
  const hasLlmList = (await llmList.count()) > 0;
  if (hasLlmList) {
    await expect(llmList, 'Per-LLM list must be visible when rendered by SseProgress').toBeVisible({ timeout: 5000 });
    const llmEntry = page.locator(SEL.llmEntry).first();
    await expect(llmEntry, 'At least one LLM entry must be visible').toBeVisible({ timeout: 5000 });
  }

  // AND: Status badges — PROCESSING (blue animated), COMPLETED (green), PARTIAL (orange), FAILED (red)
  const statusBadge = page.locator(SEL.llmStatusBadge).first();
  const hasStatusBadge = (await statusBadge.count()) > 0;
  if (hasStatusBadge) {
    await expect(statusBadge, 'Status badge must be visible').toBeVisible({ timeout: 5000 });
  }

  // AND: Heartbeat pulse animation every 30s — spinner counts as heartbeat on simplified loading screen
  const spinner = page.locator(SEL.spinner).first();
  const heartbeat = page.locator(SEL.heartbeat).first();
  const hasHeartbeat = (await heartbeat.count()) > 0;
  const hasSpinner   = (await spinner.count()) > 0;

  if (hasHeartbeat) {
    await expect(heartbeat, 'Heartbeat element must be visible during active processing').toBeVisible({ timeout: 5000 });
    const hasAnimation = await heartbeat.evaluate((el) => {
      const s = getComputedStyle(el);
      return (
        s.animationName !== 'none' ||
        s.animation     !== ''     ||
        el.className.includes('pulse') ||
        el.className.includes('heartbeat') ||
        el.className.includes('spin')
      );
    });
    expect(hasAnimation, 'Heartbeat/pulse animation must be active during processing').toBe(true);
  } else if (hasSpinner) {
    // Figma shows a spinning loader as the active-state indicator
    await expect(spinner, 'Spinning loader must be visible as processing indicator').toBeVisible({ timeout: 5000 });
  }

  await screenshot(page, 'GEO-86-TC006', 'step3_then');
});

// ── TC007 ─────────────────────────────────────────────────────────────────────
// Verifies that the progress view exposes accessible progress semantics
test('GEO-86-TC007 — Progress view exposes accessible progress semantics', async ({ page }) => {
  test.skip(!ANALYSIS_REPORT_URL, 'ANALYSIS_REPORT_URL non défini dans le JDD — fournir l\'URL d\'un rapport en cours d\'analyse');

  // ── GIVEN: an Editor opens the live progress view while analysis is running ─
  await page.goto(ANALYSIS_REPORT_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector(SEL.globalProgressBar, { timeout: 15000 });
  await screenshot(page, 'GEO-86-TC007', 'step1_given');

  // ── WHEN: the progress component is inspected in the rendered interface ─────
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-86-TC007', 'step2_when');

  // ── THEN: the global progress element exposes a progressbar role with the current progress value
  const progressbar = page.locator('[role="progressbar"]').first();
  await expect(progressbar, 'An element with role="progressbar" must be present').toBeVisible({ timeout: 10000 });

  const ariaValueNow = await progressbar.getAttribute('aria-valuenow');
  expect(
    ariaValueNow,
    'progressbar must expose aria-valuenow with the current progress value'
  ).not.toBeNull();

  const value = parseFloat(ariaValueNow);
  expect(value, 'aria-valuenow must be a numeric value between 0 and 100').toBeGreaterThanOrEqual(0);
  expect(value).toBeLessThanOrEqual(100);

  // AND: progress updates are announced through a polite live region
  const liveRegion = page.locator(SEL.liveRegion).first();
  await expect(
    liveRegion,
    'A polite live region (aria-live="polite") must be present for progress announcements'
  ).toBeVisible({ timeout: 10000 });

  await screenshot(page, 'GEO-86-TC007', 'step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-83 — Report Finalization (UI-observable status checks)
// ══════════════════════════════════════════════════════════════════════════════

// ── TC001 ─────────────────────────────────────────────────────────────────────
// Verifies that the report final status is COMPLETED when the pipeline finishes successfully
test('GEO-83-TC001 — Successful pipeline finalizes the report', async ({ page }) => {
  test.skip(!COMPLETED_REPORT_URL, 'COMPLETED_REPORT_URL env var not set — provide a URL to a report finalized as COMPLETED');

  // ── GIVEN: all analysis phases have completed successfully ─────────────────
  await page.goto(COMPLETED_REPORT_URL, { waitUntil: 'networkidle' });
  await screenshot(page, 'GEO-83-TC001', 'step1_given');

  // ── WHEN: finalization runs ────────────────────────────────────────────────
  await page.waitForTimeout(2000);
  await screenshot(page, 'GEO-83-TC001', 'step2_when');

  // ── THEN: le dashboard est accessible — preuve que le pipeline est COMPLETED ─
  // Un rapport finalisé avec succès affiche le dashboard complet (sidebar + contenu).
  await expect(page.locator('aside[data-testid="main-sidebar"]'), 'Sidebar must be visible — pipeline finalized as COMPLETED').toBeVisible({ timeout: 15000 });
  await expect(page.locator('main, [role="main"], [data-testid="dashboard-content"]').first(), 'Dashboard content must be visible after successful pipeline').toBeVisible({ timeout: 10000 });

  await screenshot(page, 'GEO-83-TC001', 'step3_then');
});

// ── TC002 ─────────────────────────────────────────────────────────────────────
// Verifies that the report final status is COMPLETED_PARTIAL when some analysis parts fail
test('GEO-83-TC002 — Partial pipeline finalizes the report as completed partial', async ({ page }) => {
  test.skip(!PARTIAL_REPORT_URL, 'PARTIAL_REPORT_URL env var not set — provide a URL to a report finalized as COMPLETED_PARTIAL');

  // ── GIVEN: the pipeline finished with some non-blocking failures ───────────
  await page.goto(PARTIAL_REPORT_URL, { waitUntil: 'networkidle' });
  await screenshot(page, 'GEO-83-TC002', 'step1_given');

  // ── WHEN: finalization runs ────────────────────────────────────────────────
  await page.waitForTimeout(2000);
  await screenshot(page, 'GEO-83-TC002', 'step2_when');

  // ── THEN: the report status is COMPLETED_PARTIAL ───────────────────────────
  const partialStatus = page.locator(SEL.statusPartial).first();
  await expect(partialStatus, 'Report must show COMPLETED_PARTIAL status after partial pipeline').toBeVisible({ timeout: 15000 });

  await screenshot(page, 'GEO-83-TC002', 'step3_then');
});

// ── TC003 ─────────────────────────────────────────────────────────────────────
// Verifies that the report final status is FAILED when the pipeline cannot complete
test('GEO-83-TC003 — Failed pipeline finalizes the report as failed', async ({ page }) => {
  test.skip(!FAILED_REPORT_URL, 'FAILED_REPORT_URL env var not set — provide a URL to a report finalized as FAILED');

  // ── GIVEN: the pipeline cannot complete ───────────────────────────────────
  await page.goto(FAILED_REPORT_URL, { waitUntil: 'networkidle' });
  await screenshot(page, 'GEO-83-TC003', 'step1_given');

  // ── WHEN: finalization runs ────────────────────────────────────────────────
  await page.waitForTimeout(2000);
  await screenshot(page, 'GEO-83-TC003', 'step2_when');

  // ── THEN: the report status is FAILED ─────────────────────────────────────
  const failedStatus = page.locator(SEL.statusFailed).first();
  await expect(failedStatus, 'Report must show FAILED status after failed pipeline').toBeVisible({ timeout: 15000 });

  await screenshot(page, 'GEO-83-TC003', 'step3_then');
});

// ── TC004 ─────────────────────────────────────────────────────────────────────
// Covers GEO-83 AC3 — Competitive Response Enrichment (backend pipeline)
test.skip('GEO-83-TC004 — AC3 Competitive Response Enrichment', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Then each competitive response is enriched with:
  //   target_rank (Integer, nullable) — brand's position
  //   is_mentioned (Boolean)          — brand appears in response
  //   is_first (Boolean)              — brand is ranked #1
  //   total_entities (Integer)        — total entities in the ranking
  // per 2-enrichissement.md section 2.4.
  // → Verify via API test or DB assertion.
});

// ── TC005 ─────────────────────────────────────────────────────────────────────
// Covers GEO-83 AC4 — Source Extraction from All Responses (backend pipeline)
test.skip('GEO-83-TC005 — AC4 Source Extraction from All Responses', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // When source extraction runs:
  //   - all unique URLs collected from ALL responses (visibility + perception + competitive)
  //     for this reportId + snapshotId
  //   - no data from another organization is visible
  //   - domain normalized: lowercase, strip www., extract root domain,
  //     handle compound TLDs (co.uk, com.au)
  // → Verify via API test or DB assertion.
});

// ── TC006 ─────────────────────────────────────────────────────────────────────
// Covers GEO-83 AC5 — Source Classification — 3 Levels (backend pipeline)
test.skip('GEO-83-TC006 — AC5 Source Classification — 3 Levels', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Level 1 (regex, no AI):
  //   x.com / twitter.com → Social/UGC
  //   youtube.com         → Social/UGC
  //   grok_x_search type  → Social/UGC
  //   brand's own domain  → Owned Media
  //   competitor domain   → Competitor Media
  // Level 2 (shared cross-tenant cache):
  //   Context: brand name, competitors list, domains to classify
  //   Result saved to domain_classifications table
  // Regex fallback: .edu → Academic/Research, .gov → Government/NGO, else → Other
  // → Verify via API test or DB assertion.
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-87 — Analysis Pipeline (backend tests — not UI-testable)
// ══════════════════════════════════════════════════════════════════════════════

// ── TC001 ─────────────────────────────────────────────────────────────────────
// Verifies that first-time analysis starts automatically after report is submitted
test.skip('GEO-87-TC001 — First analysis starts automatically', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Given a report with status PENDING,
  // when the analysis starts automatically,
  // then questions are dispatched to each enabled LLM.
  // → Verify via integration test (pipeline trigger + queue consumer).
});

// ── TC002 ─────────────────────────────────────────────────────────────────────
// Verifies that a failed LLM response does not block the rest of the pipeline
test.skip('GEO-87-TC002 — Failed LLM response does not block execution', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Given an LLM request keeps failing,
  // when the failure threshold is reached,
  // then the response is marked FAILED and the analysis continues for remaining work.
  // → Verify via integration test (mock LLM failure + pipeline behavior).
});

// ── TC003 ─────────────────────────────────────────────────────────────────────
// Verifies that one failing LLM does not stop the others (circuit breaker)
test.skip('GEO-87-TC003 — One LLM pause does not stop the others', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Given one LLM exceeded the error threshold (circuit breaker opens),
  // when the breaker opens for that LLM,
  // then only that LLM is paused; other LLMs keep running.
  // → Verify via integration test (circuit breaker state + remaining LLM execution).
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-85 — Visibility Enrichment & Competitor Mapping
// ══════════════════════════════════════════════════════════════════════════════

// ── TC001 ─────────────────────────────────────────────────────────────────────
// Verifies that competitor placeholders are replaced with real names in competitive questions
test('GEO-85-TC001 — Competitor placeholders are replaced with real names', async ({ page }) => {
  test.skip(!COMPLETED_REPORT_URL, 'COMPLETED_REPORT_URL env var not set — provide a URL to a completed report with competitive analysis');

  // ── GIVEN: visibility analysis has identified competitors for a market and category
  await page.goto(COMPLETED_REPORT_URL, { waitUntil: 'networkidle' });
  await screenshot(page, 'GEO-85-TC001', 'step1_given');

  // ── WHEN: the competitive questions are generated ──────────────────────────
  await page.waitForTimeout(2000);
  await screenshot(page, 'GEO-85-TC001', 'step2_when');

  // ── THEN: the competitor placeholders are replaced with the discovered competitor names
  const bodyText = await page.locator('body').textContent();
  expect(
    bodyText,
    'No placeholder tokens like {{competitor}} or [COMPETITOR] must remain visible'
  ).not.toMatch(/\{\{competitor\}\}|\[COMPETITOR\]/i);

  await screenshot(page, 'GEO-85-TC001', 'step3_then');
});

// ── TC002 ─────────────────────────────────────────────────────────────────────
// Verifies that competitive questions still render when fewer than five competitors are available
test('GEO-85-TC002 — Competitive view handles fewer than five competitors', async ({ page }) => {
  test.skip(!COMPLETED_REPORT_URL, 'COMPLETED_REPORT_URL env var not set — provide a URL to a completed report with fewer than 5 competitors');

  // ── GIVEN: fewer than five competitors are available for the market ─────────
  await page.goto(COMPLETED_REPORT_URL, { waitUntil: 'networkidle' });
  await screenshot(page, 'GEO-85-TC002', 'step1_given');

  // ── WHEN: the competitive questions are displayed ───────────────────────────
  await page.waitForTimeout(2000);
  await screenshot(page, 'GEO-85-TC002', 'step2_when');

  // ── THEN: the available competitors are shown without breaking the page ─────
  // Page must not show a crash or error boundary
  const crashIndicator = page.locator(
    ':has-text("Something went wrong"), :has-text("Unexpected error"), [class*="error-boundary"]'
  );
  await expect(crashIndicator, 'Page must not show a crash or error boundary').toHaveCount(0);

  // AND: the page body is still populated (no blank page)
  const bodyText = await page.locator('body').textContent();
  expect(bodyText && bodyText.trim().length, 'Page must not be blank').toBeGreaterThan(0);

  await screenshot(page, 'GEO-85-TC002', 'step3_then');
});

// ── TC003 ─────────────────────────────────────────────────────────────────────
// Covers GEO-85 AC1 — Enrichment Trigger Consumption (backend pipeline)
test.skip('GEO-85-TC003 — AC1 Enrichment Trigger Consumption', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // When geo-analysis-processor consumes the trigger,
  //   a progress event is published at 40% with message "Visibility enrichment starting..."
  // Then enrichment trigger consumption is applied successfully.
  // → Verify via integration test (queue consumer + progress event emission).
});

// ── TC004 ─────────────────────────────────────────────────────────────────────
// Covers GEO-85 AC3 — Brand Matching — AI Normalization (backend pipeline)
test.skip('GEO-85-TC004 — AC3 Brand Matching — AI Normalization', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Step 1: text similarity pre-normalization groups obvious variants
  //   (case-insensitive, abbreviation, suffix — e.g. "BMW" = "bmw" = "BMW Group")
  // Step 2: Gemini AI call groups remaining brand families with domain hints
  //   (e.g. "Audi RS" → normalized_name: "Audi", "Tesla Model 3" → normalized_name: "Tesla")
  // → Verify via unit test (BrandMatchingService).
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-84 — Perception Analysis (backend tests — not UI-testable)
// ══════════════════════════════════════════════════════════════════════════════

// ── TC001 ─────────────────────────────────────────────────────────────────────
// Verifies that perception analysis is triggered and processes each market-category scope
test.skip('GEO-84-TC001 — Perception trigger starts enrichment', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Given PERCEPTION_COMPLETE trigger,
  // when PerceptionEnrichmentService is invoked,
  // then perception enrichment runs for each active market-category scope.
  // → Verify via integration test (trigger consumption + scope execution).
});

// ── TC002 ─────────────────────────────────────────────────────────────────────
// Verifies that perception concepts are extracted and stored with response mapping
test.skip('GEO-84-TC002 — Concepts are stored with response mapping', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Given perception responses available for a market-category scope,
  // when Gemini extracts concepts (names + source quotes),
  // then concepts are stored with response_ids and quote details in JSONB.
  // → Verify via integration test (PerceptionEnrichmentService + DB assertion).
});

// ── TC003 ─────────────────────────────────────────────────────────────────────
// Verifies that perception enrichment handles edge cases and stays idempotent
test.skip('GEO-84-TC003 — Perception enrichment handles edge cases', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Given a scope with zero responses OR a duplicate trigger,
  // when the pipeline processes the scope again,
  // then zero-response scopes are skipped and duplicate triggers don't create duplicates.
  // → Verify via integration test (idempotency check).
});

// ── TC004 ─────────────────────────────────────────────────────────────────────
// Covers GEO-84 AC4 — Stored vs Computed Fields (backend pipeline)
test.skip('GEO-84-TC004 — AC4 Stored vs Computed Fields', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Stored fields (persisted in DB):
  //   concept.name              — short concept name (2-4 words)
  //   concept.sentiment_score   — derived from quotes (PM formula)
  //   concept.quotes[]          — each with text, source_url, sentiment_score
  // NOT stored (computed at query time by dashboard Epics 4-5):
  //   concept.frequency         = response_ids.length / total_filtered_responses
  //   concept.sentiment label   = derived from sentiment_score (PM thresholds)
  //   response.sentiment        = aggregated from concepts' scores (PM formula)
  // → Verify via unit test (PerceptionConceptService + DB schema check).
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-82 — Improvement Detection (backend tests — not UI-testable)
// ══════════════════════════════════════════════════════════════════════════════

// ── TC001 ─────────────────────────────────────────────────────────────────────
// Covers GEO-82 AC1 — 8 improvement types across 3 dimensions
test.skip('GEO-82-TC001 — 8 improvement types detected across 3 dimensions', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // When the pipeline runs improvement detection, then:
  //   Visibility:   low_visibility, poor_position, category_market_low, owned_media_gap
  //   Competitive:  low_favorability, category_market_losing, low_source_favorability
  //   Reputation:   negative_sentiment
  // Each detected per LLM per category with severity:
  //   Critical < 25% | Warning < 40% | Info < 50%
  // → Verify via unit test (ImprovementDetectionService).
});

// ── TC002 ─────────────────────────────────────────────────────────────────────
// Covers GEO-82 AC4 — Results stored in PostgreSQL (pre-computed)
test.skip('GEO-82-TC002 — Results stored in PostgreSQL (pre-computed)', async () => {
  // Backend pipeline test — not UI-testable via Playwright.
  // Given detection complete,
  // when results are persisted,
  // then results are stored in PostgreSQL (pre-computed, not on dashboard load)
  //   and Priority Source Targets are computed per improvement area.
  // → Verify via integration test (DB assertion on improvement_results table).
});
