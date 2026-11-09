// manage-scope.spec.js
// E2E — GEO-61 (Manage Scope) + GEO-60 (LLM Engine Configuration)
// CSV : .claude/Data/output/csv/manage-scope.csv
//
// Lancement :
//   SPEC_NAME=manage-scope USE_AUTH=true \
//   BASE_URL=https://staging-geo.onclusive.com/geo \
//   npx playwright test .claude/Data/raw/playwright/manage-scope.spec.js

'use strict';
const { test, expect } = require('@playwright/test');
const path = require('path');

const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H = require('./e2e-helpers');

// ── JDD (3-layer merge) ───────────────────────────────────────────────────────
const COMMON           = require('../test-data/common.json');
const { loadJDD } = require('../test-data/jdd/loadJDD');
const JDD = loadJDD('manage-scope');

// ── Constants (env > JDD) ─────────────────────────────────────────────────────
const BASE_URL         = process.env.BASE_URL        || COMMON.base_url;
const DASHBOARD_UUID   = process.env.DASHBOARD_UUID  || JDD.dashboard_uuid;
const MANAGE_SCOPE_URL = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/manage-scope`;
const SCREENSHOTS_DIR  = path.resolve(__dirname, '../../output/reports/screenshots-manage-scope');
H.ensureDir(SCREENSHOTS_DIR);

const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── Selectors (from BLUEPRINT.manage_scope_page) ──────────────────────────────
const BP  = BLUEPRINT.manage_scope_page;
const SEL = {
  marketsHeading:    'h3:has-text("Countries")',
  categoriesHeading: 'h3:has-text("Categories")',
  llmHeading:        'h2:has-text("LLM Engines")',
  infoHeading:       'h2:has-text("Analysis Information")',
  primaryBadge:      BP.markets_section.primary_badge,          // text="Primary"
  addMarketBtn:      BP.markets_section.add_market_button,      // button:has-text("Add Market"), ...
  addCategoryBtn:    BP.categories_section.add_category_button, // button:has-text("Add Category"), ...
  removeBtn:         BP.markets_section.remove_button,          // button[aria-label^="Remove "]
  toggleClaude:      BP.llm_engines_section.toggle_claude,
  toggleGemini:      BP.llm_engines_section.toggle_gemini,
  toggleGrok:        BP.llm_engines_section.toggle_grok,
  toggleChatGPT:     BP.llm_engines_section.toggle_chatgpt,
  togglePerplexity:  BP.llm_engines_section.toggle_perplexity,
};

// ── Navigate helper ───────────────────────────────────────────────────────────
async function gotoManageScope(page) {
  await page.goto(MANAGE_SCOPE_URL);
  await page.waitForLoadState('networkidle');
  await H.dismissCookieBanner(page);
  const marketsHeading = page.locator(SEL.marketsHeading).first();
  await expect(marketsHeading, '"Countries" heading must be visible after load').toBeVisible({ timeout: 20000 });
}

// ═════════════════════════════════════════════════════════════════════════════
// GEO-61 — Manage Scope page (Countries + Categories)
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-61-TC001 — Current scope is displayed on Manage Scope', async ({ page }) => {
  await test.step('Given an authenticated Editor navigates to the Manage Scope page', async () => {
    await gotoManageScope(page);
    await shot(page, 'GEO-61-TC001_step1_given');
  });

  await test.step('When the page finishes loading', async () => {
    await page.waitForLoadState('networkidle');
    await shot(page, 'GEO-61-TC001_step2_when');
  });

  await test.step('Then the page shows at least one country entry with a Primary badge, at least one category row, the AI Engines section, and the Analysis Information heading', async () => {
    const marketsH = page.locator(SEL.marketsHeading).first();
    await expect(marketsH, '"Countries" section heading must be visible').toBeVisible({ timeout: 10000 });

    const primaryBadge = page.locator('text=Primary').first();
    await expect(primaryBadge, 'A "Primary" badge must be visible in the Countries section').toBeVisible({ timeout: 10000 });

    const categoriesH = page.locator(SEL.categoriesHeading).first();
    await expect(categoriesH, '"Categories" section heading must be visible').toBeVisible({ timeout: 10000 });

    const llmH = page.locator(SEL.llmHeading).first();
    await expect(llmH, '"LLM Engines" section heading must be visible').toBeVisible({ timeout: 10000 });

    const infoH = page.locator(SEL.infoHeading).first();
    await expect(infoH, '"Analysis Information" section heading must be visible').toBeVisible({ timeout: 10000 });

    await shotAt(page, infoH, 'GEO-61-TC001_step3_then');
  });
});

test('GEO-61-TC002 — Add Country button is visible and enabled', async ({ page }) => {
  await test.step('Given the Editor is on the Manage Scope page and the Countries section is visible', async () => {
    await gotoManageScope(page);
    await shot(page, 'GEO-61-TC002_step1_given');
  });

  await test.step('When the Editor views the Countries section', async () => {
    const marketsH = page.locator(SEL.marketsHeading).first();
    await marketsH.scrollIntoViewIfNeeded();
    await shot(page, 'GEO-61-TC002_step2_when');
  });

  await test.step('Then an "Add Country" button is visible and not disabled', async () => {
    const addBtn = page.locator(SEL.addMarketBtn).first();
    await expect(addBtn, '"Add Market" / "Add Country" button must be visible').toBeVisible({ timeout: 10000 });
    await expect(addBtn, '"Add Market" / "Add Country" button must be enabled').toBeEnabled();

    await shotAt(page, addBtn, 'GEO-61-TC002_step3_then');
  });
});

test('GEO-61-TC003 — Add Topic button is visible and enabled', async ({ page }) => {
  await test.step('Given the Editor is on the Manage Scope page and the Categories section is visible', async () => {
    await gotoManageScope(page);
    await shot(page, 'GEO-61-TC003_step1_given');
  });

  await test.step('When the Editor views the Categories section', async () => {
    const categoriesH = page.locator(SEL.categoriesHeading).first();
    await categoriesH.scrollIntoViewIfNeeded();
    await shot(page, 'GEO-61-TC003_step2_when');
  });

  await test.step('Then an "Add Topic" button is visible and not disabled', async () => {
    const addBtn = page.locator(SEL.addCategoryBtn).first();
    await expect(addBtn, '"Add Category" / "Add Topic" button must be visible').toBeVisible({ timeout: 10000 });
    await expect(addBtn, '"Add Category" / "Add Topic" button must be enabled').toBeEnabled();

    await shotAt(page, addBtn, 'GEO-61-TC003_step3_then');
  });
});

test('GEO-61-TC004 — Remove control visible on country row', async ({ page }) => {
  await test.step('Given the Editor is on the Manage Scope page and the Countries section shows at least one country row', async () => {
    await gotoManageScope(page);
    await shot(page, 'GEO-61-TC004_step1_given');
  });

  await test.step('When the Editor inspects the first country row', async () => {
    const marketsH = page.locator(SEL.marketsHeading).first();
    await marketsH.scrollIntoViewIfNeeded();
    await shot(page, 'GEO-61-TC004_step2_when');
  });

  await test.step('Then a remove or delete icon/button is visible on the country row', async () => {
    const firstRemoveBtn = page.locator(SEL.removeBtn).first();
    await expect(firstRemoveBtn, 'A remove/delete button must be visible on at least one country row').toBeVisible({ timeout: 10000 });

    await shotAt(page, firstRemoveBtn, 'GEO-61-TC004_step3_then');
  });
});

test('GEO-61-TC005 — Remove control visible on category row', async ({ page }) => {
  await test.step('Given the Editor is on the Manage Scope page and the Categories section shows at least one category row', async () => {
    await gotoManageScope(page);
    await shot(page, 'GEO-61-TC005_step1_given');
  });

  await test.step('When the Editor inspects the first category row', async () => {
    const categoriesH = page.locator(SEL.categoriesHeading).first();
    await categoriesH.scrollIntoViewIfNeeded();
    await shot(page, 'GEO-61-TC005_step2_when');
  });

  await test.step('Then a remove or delete icon/button is visible on the category row', async () => {
    const removeButtons = page.locator(SEL.removeBtn);
    const count = await removeButtons.count();
    expect(count, 'There must be at least 2 remove buttons (≥1 market row + ≥1 category row)').toBeGreaterThanOrEqual(2);

    const categoryRemoveBtn = removeButtons.nth(1);
    await expect(categoryRemoveBtn, 'A remove/delete button must be visible on at least one category row').toBeVisible({ timeout: 10000 });

    await shotAt(page, categoryRemoveBtn, 'GEO-61-TC005_step3_then');
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// GEO-60 — LLM Engine configuration
// ═════════════════════════════════════════════════════════════════════════════

test('GEO-60-TC001 — AI Engines section shows 5 LLM cards with toggles', async ({ page }) => {
  await test.step('Given the authenticated Editor is on the Manage Scope page', async () => {
    await gotoManageScope(page);
    await shot(page, 'GEO-60-TC001_step1_given');
  });

  await test.step('When the AI Engines section loads', async () => {
    const llmH = page.locator(SEL.llmHeading).first();
    await llmH.scrollIntoViewIfNeeded();
    await expect(llmH, '"LLM Engines" heading must be visible').toBeVisible({ timeout: 10000 });
    await shot(page, 'GEO-60-TC001_step2_when');
  });

  await test.step('Then 5 LLM engine cards are visible, each showing a toggle switch', async () => {
    const llmH = page.locator(SEL.llmHeading).first();
    const llmToggles = [
      { name: 'Claude',      selector: SEL.toggleClaude     },
      { name: 'Gemini',      selector: SEL.toggleGemini     },
      { name: 'Grok',        selector: SEL.toggleGrok       },
      { name: 'ChatGPT',     selector: SEL.toggleChatGPT    },
      { name: 'Perplexity',  selector: SEL.togglePerplexity },
    ];
    for (const { name, selector } of llmToggles) {
      const toggle = page.locator(selector);
      await expect(toggle, `LLM toggle for "${name}" must be visible`).toBeVisible({ timeout: 10000 });
    }

    await shotAt(page, llmH, 'GEO-60-TC001_step3_then');
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// SKIPPED tests
// ═════════════════════════════════════════════════════════════════════════════

test.skip('GEO-61-TC006 — [SKIP] Question and competitor updates are persisted', () => {
  // SKIPPED — Requires saving actual question or competitor modifications on a live staging report,
  // which is a destructive action affecting real analysis data.
  // Re-enable once a dedicated test report or sandbox environment is available.
});

test.skip('GEO-61-TC007 — [SKIP] Add Country disabled when max_brand_markets quota reached', () => {
  // SKIPPED — Requires the organization to have reached the max_brand_markets quota on staging.
  // This state cannot be reliably reproduced without consuming all remaining quota slots.
  // Re-enable with a dedicated quota-exhausted test account.
});

test.skip('GEO-61-TC008 — [SKIP] Add Topic disabled when max_categories quota reached', () => {
  // SKIPPED — Requires the organization to have reached the max_categories quota on staging.
  // Re-enable with a dedicated quota-exhausted test account.
});

test.skip('GEO-61-TC009 — [SKIP] Reader role sees Manage Scope in read-only mode', () => {
  // SKIPPED — Requires authentication with a Reader-role account.
  // Re-enable once a dedicated Reader test account (GEO_READER_EMAIL + GEO_READER_PASSWORD)
  // is configured in the .env file.
});

test.skip('GEO-60-TC002 — [SKIP] Cannot disable the last active LLM', () => {
  // SKIPPED — Requires disabling 4 of 5 LLMs sequentially on the live staging report.
  // This modifies the live report configuration in a hard-to-reverse way.
  // Re-enable with a sandbox report or dedicated test account where LLM changes are safely reversible.
});

test.skip('GEO-60-TC003 — [SKIP] LLM configuration persists until modified again', () => {
  // SKIPPED — Requires saving an LLM configuration change (destructive) as a prerequisite.
  // Re-enable with a dedicated sandbox report.
});

test.skip('GEO-60-TC004 — [SKIP] Minimum 1 LLM constraint shows tooltip when last LLM toggle is attempted', () => {
  // SKIPPED — Requires disabling 4 LLMs to reach the single-active-LLM state.
  // Destructive multi-step sequence on live staging data.
  // Re-enable with a sandbox environment or a pre-configured 1-LLM test report.
});

test.skip('GEO-60-TC005 — [SKIP] Last active LLM toggle is visually disabled', () => {
  // SKIPPED — Same prerequisite as TC004: reaching the single-active-LLM state requires
  // destructive actions on the live staging report.
  // Re-enable with a dedicated 1-LLM test report.
});

test.skip('GEO-60-TC006 — [SKIP] Web Search checkbox visible and interactive on enabled LLM card', () => {
  // SKIPPED — DOM inspection confirmed the "Web search" feature is NOT present on the
  // Manage Scope page for this dashboard (6dc13f88). LLM cards show only name + toggle.
  // Re-enable if/when the Web search checkbox is deployed to the staging environment.
});

test.skip('GEO-60-TC007 — [SKIP] Web search checkbox grayed out on disabled LLM card', () => {
  // SKIPPED — Feature absent (see TC006) AND requires a pre-configured disabled-LLM state.
});

test.skip('GEO-60-TC008 — [SKIP] Reader role sees AI Engines in read-only mode', () => {
  // SKIPPED — Requires authentication with a Reader-role account.
  // Re-enable once a dedicated Reader test account is configured in .env.
});

test.skip('GEO-60-TC009 — [SKIP] LLM configuration persists after navigation', () => {
  // SKIPPED — Requires saving an LLM configuration change (destructive) as a prerequisite.
  // Re-enable with a dedicated sandbox report where changes are safely reversible.
});
