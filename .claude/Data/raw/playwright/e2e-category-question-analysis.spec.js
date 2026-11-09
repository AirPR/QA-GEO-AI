// category-question-analysis.spec.js
// 7 test cases — Questions Analysis panel on the YVES SAINT LAURENT luxury perfume
// category page (Identity tab).
//
// TC001 — Default display (All tab)
// TC002 — Visibility tab table
// TC003 — Competitive tab table
// TC004 — Perception tab table
// TC005 — Visibility detail panel (header + compact LLM mode + LLM switch)
// TC006 — Competitive detail panel (header + compact LLM mode + LLM switch)
// TC007 — Perception detail panel (header + compact LLM mode + content sections + LLM switch)
//
// CSV : .claude/Data/output/csv/category-question-analysis.csv
// URL : https://staging-geo.onclusive.com/geo/dashboard/6dc13f88-8d0b-4e93-b892-9db064c2be41/category/1cab4f3e-2b03-4037-bf39-ca80616052dc
//
// Launch :
//   SPEC_NAME=category-question-analysis USE_AUTH=true BASE_URL=https://staging-geo.onclusive.com/geo \
//     npx playwright test .claude/Data/raw/playwright/category-question-analysis.spec.js

'use strict';

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');

const COMMON      = require('../test-data/common.json');
const BLUEPRINT   = require('../test-data/selectors_blueprint.json');
const H           = require('./e2e-helpers');
const { loadJDD } = require('../test-data/jdd/loadJDD');
const JDD = loadJDD('category/category-question-analysis');

// ── Constants ─────────────────────────────────────────────────────────────────
const BASE_URL        = process.env.BASE_URL        || COMMON.base_url;
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID   || JDD.dashboard.uuid;
const CATEGORY_UUID   = process.env.CATEGORY_UUID    || JDD.category.uuid;
const CATEGORY_URL    = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CATEGORY_UUID}`;
const TARGET_SNAPSHOT = process.env.TARGET_SNAPSHOT  || JDD.snapshot.target || null;

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-category-question-analysis');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// ── Selectors ─────────────────────────────────────────────────────────────────
const SEL = {
  // LLM filter
  llmFilterBtn:   'button[aria-label="LLM engine filters"]',

  // Questions Analysis heading
  qaHeading:      ':text("Questions Analysis")',

  // Type tabs (button containing tab name + numeric badge — distinguishes from nav tabs)
  allTab:         'button',          // filtered dynamically via .filter({ hasText: /^All\s+\d/ })
  visibilityTab:  'button',
  competitiveTab: 'button',
  perceptionTab:  'button',

  // Table
  tableRow:       'tr[role="button"]',
  // marketFlag: flag icon varies by build — assertion now checks the market cell (last td)
  marketFlag:     'td:last-child',
  themeBadge:     'span.rounded-full.border.bg-white',

  // Expanded row & detail panel
  expandedRow:    'tr[aria-expanded="true"]',
  panelClose:     'button[aria-label*="Close"], button:has-text("Close detail panel")',
  panelHeading:   'h4',

  // LLM buttons in the detail panel — identified by button[aria-label] on prod
  // (img inside buttons have empty alt on prod; aria-label is the source of truth)
  llmAriaLabels: ['Claude', 'Gemini', 'Grok', 'ChatGPT', 'Perplexity'],

  // Kept for compact-mode label check (text inside buttons must be hidden when ≥ 4 LLMs)
  llmAlts: ['claude', 'gemini', 'grok', 'openai', 'perplexity', 'chatgpt'],
  llmLabels: { claude: 'Claude', gemini: 'Gemini', grok: 'Grok', openai: 'ChatGPT', perplexity: 'Perplexity', chatgpt: 'ChatGPT' },

  // Visibility panel sections (h3 headings)
  panelBrandRankings:     'h3:has-text("Brand Rankings")',    // section 1 title
  panelAICitationSources: 'h3:has-text("AI Citation Sources"), h3:has-text("LLM Engines Citation Sources")', // section 2 title (renamed on prod)

  // Competitive panel sections
  panelAbout:     'p:has-text("About")',             // section 2 subtitle (<p> with uppercase CSS)

  // Perception panel sections (paragraph labels)
  panelResponse:  'p:text-is("Response")',           // section 3
  panelSentiment: 'p:has-text("Sentiment")',         // section 1: "Sentiment - <LLM>"
  panelThemes:    'p:has-text("Themes")',            // section 2
  panelSources:   'p:has-text("Sources")',           // last section (Competitive + Perception)
};

// ── Helpers ───────────────────────────────────────────────────────────────────
async function shot(page, name) {
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${name}.png`), fullPage: false });
}

/**
 * Navigate to category page and wait for Questions Analysis tabs to be ready.
 * Uses getByRole('button', { name }) to match the ARIA accessible name (e.g. "All 24")
 * because textContent of the two child spans is "All"+"24" with no guaranteed space.
 */
async function gotoCategory(page) {
  await page.goto(CATEGORY_URL);
  await page.waitForLoadState('networkidle');

  // Navigate to a specific snapshot if configured
  await H.ensureSnapshot(page, TARGET_SNAPSHOT);

  // Scroll to heading to trigger lazy render
  const heading = page.locator(SEL.qaHeading).first();
  await expect(heading).toBeVisible({ timeout: 20000 });
  await heading.scrollIntoViewIfNeeded();
  // All tab accessible name is "All 24" (or similar) — wait for it to attach, then scroll into view
  const allTab = page.getByRole('button', { name: /^All \d/ });
  await allTab.waitFor({ state: 'attached', timeout: 20000 });
  await allTab.scrollIntoViewIfNeeded();
  await expect(allTab).toBeVisible({ timeout: 10000 });
}

/**
 * Click a type tab (All / Visibility / Competitive / Perception).
 * Matches the ARIA accessible name: "All 24", "Visibility 10", etc.
 */
async function clickTypeTab(page, tabName) {
  const btn = page.getByRole('button', { name: new RegExp(`^${tabName} \\d`) });
  await btn.waitFor({ state: 'attached', timeout: 15000 });
  await btn.scrollIntoViewIfNeeded();
  await expect(btn).toBeVisible({ timeout: 10000 });
  await btn.click();
}

/**
 * Expand the first expandable row of the given type and wait until the panel is open.
 * @param {import('@playwright/test').Page} page
 * @param {string} typeName  e.g. 'Visibility', 'Competitive'
 * @param {object|null} extraFilter  optional additional Playwright filter({ has: ... })
 */
async function expandFirstRow(page, typeName, extraFilter = null) {
  await clickTypeTab(page, typeName);
  let rowLocator = page.locator(SEL.tableRow)
    .filter({ has: page.locator('span').filter({ hasText: typeName }) });
  if (extraFilter) rowLocator = rowLocator.filter(extraFilter);
  const firstRow = rowLocator.first();
  await expect(firstRow).toBeVisible({ timeout: 20000 });
  await firstRow.scrollIntoViewIfNeeded();
  // If the panel is already auto-opened by the app (tab switch behaviour), skip the click
  const panelAlreadyOpen = await page.locator(SEL.panelClose).first().isVisible();
  if (!panelAlreadyOpen) {
    await firstRow.click();
  }
  // Close button confirms the detail panel is open
  await expect(page.locator(SEL.panelClose).first()).toBeVisible({ timeout: 20000 });
}

/**
 * Expand the first Perception row that has theme chips in the Winner/Themes column.
 * Needed for TC004 (table check) and TC007 (panel with Themes/Response sections).
 */
async function expandFirstPerceptionRowWithData(page) {
  await clickTypeTab(page, 'Perception');
  const rowWithData = page.locator(SEL.tableRow)
    .filter({ has: page.locator('span').filter({ hasText: 'Perception' }) })
    .filter({ has: page.locator(SEL.themeBadge) })
    .first();
  await expect(rowWithData).toBeVisible({ timeout: 20000 });
  // If the panel is already auto-opened by the app (tab switch behaviour), skip the click
  const panelAlreadyOpen = await page.locator(SEL.panelClose).first().isVisible();
  if (!panelAlreadyOpen) {
    await rowWithData.click();
  }
  await expect(page.locator(SEL.panelClose).first()).toBeVisible({ timeout: 20000 });
}

/**
 * Assert LLM buttons in the detail panel: ≥ 1 logo visible.
 * Compact mode check (labels hidden) is only applied when ≥ 4 LLMs are visible,
 * since compact mode activates above the 3-LLM threshold.
 */
async function assertLLMButtons(page, tcId, stepName) {
  // Pass 1 — collect which LLM buttons are visible via aria-label
  // On prod, button imgs have empty alt; aria-label is the reliable identifier.
  const visibleAriaLabels = [];
  for (const ariaLabel of SEL.llmAriaLabels) {
    const btn = page.locator(`button[aria-label="${ariaLabel}"]`);
    if (await btn.isVisible({ timeout: 5000 }).catch(() => false)) {
      visibleAriaLabels.push(ariaLabel);
    }
  }
  expect(
    visibleAriaLabels.length,
    `At least 1 LLM button must be visible in the panel (none of ${SEL.llmAriaLabels.join(', ')} found)`
  ).toBeGreaterThan(0);

  // Pass 2 — compact mode check: visible text labels must be hidden when ≥ 4 LLMs active
  const visibleLabels = [];
  if (visibleAriaLabels.length >= 4) {
    for (const label of visibleAriaLabels) {
      const labelEl = page.locator(`button[aria-label="${label}"] span`).filter({ hasText: label });
      if (await labelEl.isVisible()) visibleLabels.push({ alt: label, label });
    }
  }

  if (visibleLabels.length > 0) {
    // Paint a red overlay on EVERY visible label span, then capture before throwing.
    // Use img.closest('button') — more reliable than button:has() in evaluate context.
    // Scroll once to the first LLM button so all buttons are in viewport, then collect rects
    await page.locator(`img[alt="${visibleLabels[0].alt}"]`).scrollIntoViewIfNeeded();
    await page.evaluate((labels) => {
      function addOverlay(rect) {
        const pad = 3;
        const ov  = document.createElement('div');
        ov.setAttribute('data-qa-annotation', 'bug');
        Object.assign(ov.style, {
          position:     'fixed',
          top:          `${rect.top    - pad}px`,
          left:         `${rect.left   - pad}px`,
          width:        `${rect.width  + pad * 2}px`,
          height:       `${rect.height + pad * 2}px`,
          border:       '2px solid #dc2626',
          borderRadius: '3px',
          boxShadow:    '0 0 0 3px rgba(220,38,38,0.25)',
          background:   'rgba(220,38,38,0.08)',
          zIndex:       '2147483647',
          pointerEvents:'none',
        });
        document.body.appendChild(ov);
      }
      for (const { alt, label } of labels) {
        const imgs = [...document.querySelectorAll(`img[alt="${alt}"]`)];
        for (const img of imgs) {
          const btn = img.closest('button');
          if (!btn) continue;
          // Annotate the entire button (text span may be CSS-truncated and too small to see)
          addOverlay(btn.getBoundingClientRect());
        }
      }
    }, visibleLabels);
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    // Screenshot with all annotations — saved BEFORE throw so afterEach doesn't overwrite it
    await shot(page, `${tcId}_${stepName}`);
    const list = visibleLabels.map(v => v.label).join(', ');
    throw new Error(`[BUG] Compact mode not active — ${visibleLabels.length}/5 LLM text labels visible: ${list}`);
  }

  await shot(page, `${tcId}_${stepName}`);
}

/** Switch through available LLMs (by aria-label) and verify panel heading stays visible. */
async function switchAllLLMs(page) {
  for (const ariaLabel of SEL.llmAriaLabels) {
    const btn = page.locator(`button[aria-label="${ariaLabel}"]`);
    if (!await btn.isVisible({ timeout: 1000 }).catch(() => false)) continue;
    await btn.click();
    await expect(page.locator(SEL.panelHeading).first()).toBeVisible({ timeout: 15000 });
  }
}

// ── Mandatory afterEach — annotated failure screenshot (CLAUDE.md) ────────────
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
    function paintOverlay(target) {
      // Scroll first so getBoundingClientRect is accurate in the viewport
      target.scrollIntoView({ block: 'center', behavior: 'instant' });
      const rect = target.getBoundingClientRect();
      const pad  = 4;
      const overlay = document.createElement('div');
      overlay.setAttribute('data-qa-annotation', 'bug');
      Object.assign(overlay.style, {
        position:     'fixed',
        top:          `${rect.top    - pad}px`,
        left:         `${rect.left   - pad}px`,
        width:        `${rect.width  + pad * 2}px`,
        height:       `${rect.height + pad * 2}px`,
        border:       '3px solid #dc2626',
        borderRadius: '4px',
        boxShadow:    '0 0 0 4px rgba(220,38,38,0.25), 0 0 16px rgba(220,38,38,0.4)',
        background:   'rgba(220,38,38,0.06)',
        zIndex:       '2147483647',
        pointerEvents:'none',
      });
      // Small label tag at the top-left corner
      const label = document.createElement('span');
      label.textContent = '🐛 BUG';
      Object.assign(label.style, {
        position:   'absolute',
        top:        '-20px',
        left:       '0',
        background: '#dc2626',
        color:      'white',
        fontSize:   '10px',
        fontWeight: '700',
        padding:    '1px 6px',
        borderRadius: '3px 3px 0 0',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        whiteSpace: 'nowrap',
      });
      overlay.appendChild(label);
      document.body.appendChild(overlay);
      return true;
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
        return paintOverlay(target);
      } catch (_) { /* skip */ }
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

  // Wait for one paint frame so the overlay is rendered before the screenshot
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));

  const tcId    = testInfo.title.split(' ')[0];
  const failPath = path.join(SCREENSHOTS_DIR, `${tcId}_step3_then.png`);
  // If the error is custom (no Playwright locator) and the screenshot was already taken
  // with all annotations by the helper (e.g. assertLLMButtons), keep it — don't overwrite.
  const isCustomError = allSelectors.length === 0 && fs.existsSync(failPath);
  if (!isCustomError) {
    await page.screenshot({ path: failPath, fullPage: false });
  }
  for (const step of ['step1_given', 'step2_when']) {
    const p = path.join(SCREENSHOTS_DIR, `${tcId}_${step}.png`);
    if (!fs.existsSync(p)) {
      await page.screenshot({ path: p, fullPage: false }).catch(() => {});
    }
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// TC001 — Default display (All tab)
// ═══════════════════════════════════════════════════════════════════════════════
test('E2E-QA-TC001 Default display — LLM badge / Questions Analysis heading / All tab / 4 columns / footer', async ({ page }) => {
  await test.step('Given: navigate to category page', async () => {
    await page.goto(CATEGORY_URL);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('tab', { name: /Identity/i })).toBeVisible({ timeout: 20000 });
    await H.ensureSnapshot(page, TARGET_SNAPSHOT);
    await shot(page, 'E2E-QA-TC001_step1_given');
  });

  await test.step('Then: LLM filter badge shows the active LLM count (≥ 1)', async () => {
    const llmBtn = page.locator(SEL.llmFilterBtn);
    await expect(llmBtn).toBeVisible({ timeout: 15000 });
    const badge = llmBtn.locator('span').filter({ hasText: /^\d+$/ });
    await expect(badge, 'LLM filter badge must display a positive number').toBeVisible({ timeout: 10000 });
    const badgeText = await badge.textContent();
    expect(parseInt(badgeText || '0', 10), `LLM filter badge must be ≥ 1 (got "${badgeText}")`).toBeGreaterThan(0);
    await shot(page, 'E2E-QA-TC001_step2_when');
  });

  await test.step('Then: Questions Analysis heading + 4 type tabs visible', async () => {
    const heading = page.locator(SEL.qaHeading).first();
    await expect(heading).toBeVisible({ timeout: 20000 });
    await heading.scrollIntoViewIfNeeded();
    // Wait for All tab by accessible name ("All 24" etc.), scroll into view
    const allTab = page.getByRole('button', { name: /^All \d/ });
    await allTab.waitFor({ state: 'attached', timeout: 20000 });
    await allTab.scrollIntoViewIfNeeded();
    await expect(allTab).toBeVisible({ timeout: 10000 });
    for (const tab of ['Visibility', 'Competitive', 'Perception']) {
      const t = page.getByRole('button', { name: new RegExp(`^${tab} \\d`) });
      await expect(t).toBeVisible({ timeout: 10000 });
    }
  });

  await test.step('Then: All tab active — 4 column headers + at least 1 row + footer', async () => {
    await clickTypeTab(page, 'All');
    await expect(page.locator(SEL.tableRow).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('columnheader', { name: 'Question', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Winner/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Country|Market/i }).first()).toBeVisible();
    await expect(page.locator('text=/Showing \\d+ of \\d+ questions/').first()).toBeVisible({ timeout: 10000 });
    await shot(page, 'E2E-QA-TC001_step3_then');
  });

  await test.step('Then: questions list is visible and no detail panel is open', async () => {
    await expect(page.locator(SEL.tableRow).first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator(SEL.panelClose).first()).toBeHidden();
    await shot(page, 'E2E-QA-TC001_step4_no-panel');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// TC002 — Visibility tab table
// ═══════════════════════════════════════════════════════════════════════════════
test('E2E-QA-TC002 Visibility tab — blue badge / Winner=brand or Lost / Market flag icon', async ({ page }) => {
  await test.step('Given: navigate and scroll to Questions Analysis', async () => {
    await gotoCategory(page);
    await shot(page, 'E2E-QA-TC002_step1_given');
  });

  await test.step('When: click Visibility tab', async () => {
    await clickTypeTab(page, 'Visibility');
    await expect(page.locator(SEL.tableRow).first()).toBeVisible({ timeout: 15000 });
    await shot(page, 'E2E-QA-TC002_step2_when');
  });

  await test.step('Then: first row — blue Visibility badge / Winner or Lost / Market flag', async () => {
    const firstRow = page.locator(SEL.tableRow).first();
    // Type badge contains "Visibility"
    await expect(
      firstRow.locator('td').first().locator('span').filter({ hasText: 'Visibility' })
    ).toBeVisible();
    // Market cell: circular flag icon
    await expect(firstRow.locator(SEL.marketFlag).first()).toBeVisible();
    await shot(page, 'E2E-QA-TC002_step3_then');
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// TC003 — Competitive tab table
// ═══════════════════════════════════════════════════════════════════════════════
test('E2E-QA-TC003 Competitive tab — amber badge / Winner=brand or Lost / Market flag icon', async ({ page }) => {
  await test.step('Given: navigate and scroll to Questions Analysis', async () => {
    await gotoCategory(page);
    await shot(page, 'E2E-QA-TC003_step1_given');
  });

  await test.step('When: click Competitive tab', async () => {
    await clickTypeTab(page, 'Competitive');
    await expect(page.locator(SEL.tableRow).first()).toBeVisible({ timeout: 15000 });
    await shot(page, 'E2E-QA-TC003_step2_when');
  });

  await test.step('Then: first row — amber Competitive badge / Winner or Lost / Market flag', async () => {
    const firstRow = page.locator(SEL.tableRow).first();
    await expect(
      firstRow.locator('td').first().locator('span').filter({ hasText: 'Competitive' })
    ).toBeVisible();
    await expect(firstRow.locator(SEL.marketFlag).first()).toBeVisible();
    await shot(page, 'E2E-QA-TC003_step3_then');
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// TC004 — Perception tab table
// ═══════════════════════════════════════════════════════════════════════════════
test('E2E-QA-TC004 Perception tab — violet badge / theme chip badges in Winner-Themes / Market flag', async ({ page }) => {
  await test.step('Given: navigate and scroll to Questions Analysis', async () => {
    await gotoCategory(page);
    await shot(page, 'E2E-QA-TC004_step1_given');
  });

  await test.step('When: click Perception tab', async () => {
    await clickTypeTab(page, 'Perception');
    await expect(page.locator(SEL.tableRow).first()).toBeVisible({ timeout: 15000 });
    await shot(page, 'E2E-QA-TC004_step2_when');
  });

  await test.step('Then: first row — violet Perception badge / theme chips in col 3 / Market flag', async () => {
    // Use first Perception row that actually has theme chips in col 3
    const firstRowWithThemes = page.locator(SEL.tableRow)
      .filter({ has: page.locator('span').filter({ hasText: 'Perception' }) })
      .filter({ has: page.locator(SEL.themeBadge) })
      .first();
    await expect(firstRowWithThemes).toBeVisible({ timeout: 15000 });
    await expect(
      firstRowWithThemes.locator('td').first().locator('span').filter({ hasText: 'Perception' })
    ).toBeVisible();
    const themesCell = firstRowWithThemes.locator('td').nth(2);
    await expect(themesCell.locator(SEL.themeBadge).first()).toBeVisible();
    await expect(firstRowWithThemes.locator(SEL.marketFlag).first()).toBeVisible();
    await shot(page, 'E2E-QA-TC004_step3_then');
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
// TC005 — Visibility detail panel
// ═══════════════════════════════════════════════════════════════════════════════
test('E2E-QA-TC005 Visibility panel — header / LLM logos / Ranking+SOURCES sections / LLM switch', async ({ page }) => {
  await test.step('Given: navigate, scroll to QA, click Visibility tab, expand first row', async () => {
    await gotoCategory(page);
    // Expand the first Visibility row regardless of win/loss status.
    // On prod all-win datasets, filtering on "Lost" would find no rows.
    await expandFirstRow(page, 'Visibility');
    await shot(page, 'E2E-QA-TC005_step1_given');
  });

  await test.step('Then: panel header — h4 title + Visibility badge + close button visible', async () => {
    await expect(page.locator(SEL.panelHeading).first()).toBeVisible({ timeout: 10000 });
    await shot(page, 'E2E-QA-TC005_step2_when');
  });

  await test.step('Then: 5 LLM logo buttons visible in the panel', async () => {
    await assertLLMButtons(page, 'E2E-QA-TC005', 'step3_then');
  });

  await test.step('Then: panel content — 2 sections: (1) Brand Rankings / (2) AI Citation Sources', async () => {
    // Section 1: "Brand Rankings" h3 heading
    await expect(page.locator(SEL.panelBrandRankings).first()).toBeVisible({ timeout: 15000 });
    // Section 2: "AI Citation Sources" h3 heading
    await expect(page.locator(SEL.panelAICitationSources).first()).toBeVisible({ timeout: 10000 });
    await shot(page, 'E2E-QA-TC005_step4_content');
  });

  await test.step('When: switch all 5 LLMs — panel heading stays visible after each', async () => {
    await switchAllLLMs(page);
    await shot(page, 'E2E-QA-TC005_step5_llm-switch');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// TC006 — Competitive detail panel
// ═══════════════════════════════════════════════════════════════════════════════
test('E2E-QA-TC006 Competitive panel — header / LLM logos / Won|Lost+About+SOURCES sections / LLM switch', async ({ page }) => {
  await test.step('Given: navigate, scroll to QA, click Competitive tab, expand first row', async () => {
    await gotoCategory(page);
    await expandFirstRow(page, 'Competitive');
    await shot(page, 'E2E-QA-TC006_step1_given');
  });

  await test.step('Then: panel header — h4 title + Competitive badge + close button visible', async () => {
    await expect(page.locator(SEL.panelHeading).first()).toBeVisible({ timeout: 10000 });
    await shot(page, 'E2E-QA-TC006_step2_when');
  });

  await test.step('Then: 5 LLM logo buttons visible in the panel', async () => {
    await assertLLMButtons(page, 'E2E-QA-TC006', 'step3_then');
  });

  await test.step('Then: panel content — 3 sections: (1) Won or Lost / (2) About + text / (3) SOURCES', async () => {
    // Section 1: competitive result — "Won" or "Lost" (any element type)
    const wonOrLost = page.locator(':text-is("Won"), :text-is("Lost")').first();
    await expect(wonOrLost).toBeVisible({ timeout: 15000 });
    // Section 2: "About" subtitle (p with uppercase CSS — use has-text for robustness)
    await expect(page.locator(SEL.panelAbout).first()).toBeVisible({ timeout: 15000 });
    // Section 3: SOURCES label
    await expect(page.locator(SEL.panelSources).first()).toBeVisible({ timeout: 10000 });
    await shot(page, 'E2E-QA-TC006_step4_content');
  });

  await test.step('When: switch all 5 LLMs — panel heading stays visible after each', async () => {
    await switchAllLLMs(page);
    await shot(page, 'E2E-QA-TC006_step5_llm-switch');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// TC007 — Perception detail panel
// ═══════════════════════════════════════════════════════════════════════════════
test('E2E-QA-TC007 Perception panel — header / LLM logos / SENTIMENT+THEMES+Response+SOURCES / LLM switch', async ({ page }) => {
  await test.step('Given: navigate, scroll to QA, click Perception tab, expand first row with theme data', async () => {
    await gotoCategory(page);
    await expandFirstPerceptionRowWithData(page);
    await shot(page, 'E2E-QA-TC007_step1_given');
  });

  await test.step('Then: panel header — h4 title + Perception badge + close button visible', async () => {
    await expect(page.locator(SEL.panelHeading).first()).toBeVisible({ timeout: 10000 });
    await shot(page, 'E2E-QA-TC007_step2_when');
  });

  await test.step('Then: 5 LLM logo buttons visible in the panel', async () => {
    await assertLLMButtons(page, 'E2E-QA-TC007', 'step3_then');
  });

  await test.step('Then: Perception panel — 4 sections in order: (1) SENTIMENT+LLM / (2) THEMES / (3) Response / (4) SOURCES', async () => {
    // Section 1: "Sentiment - <LLM name>" heading (e.g. "Sentiment - Claude")
    await expect(page.locator(SEL.panelSentiment).first()).toBeVisible({ timeout: 15000 });
    // Section 2: THEMES label
    await expect(page.locator(SEL.panelThemes).first()).toBeVisible({ timeout: 10000 });
    // Section 3: Response label
    await expect(page.locator(SEL.panelResponse).first()).toBeVisible({ timeout: 10000 });
    // Section 4: SOURCES label
    await expect(page.locator(SEL.panelSources).first()).toBeVisible({ timeout: 10000 });
    await shot(page, 'E2E-QA-TC007_step4_content');
  });

  await test.step('When: switch all 5 LLMs — panel heading stays visible after each', async () => {
    await switchAllLLMs(page);
    await shot(page, 'E2E-QA-TC007_step5_llm-switch');
  });
});
