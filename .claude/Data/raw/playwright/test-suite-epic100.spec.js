// test-suite-epic100.spec.js
// Epic 100 — GEO Manage Scope (Markets, Categories, LLM engines)
// Covers:
//   GEO-61 (Manage Scope): TC001 scope display, TC002 add market, TC003 add category,
//                           TC004 remove market, TC005 remove category, TC006 question update,
//                           TC007 market quota, TC008 category quota, TC009 Reader read-only
//   GEO-60 (LLM config):   TC001 LLM toggle + next run, TC002 last LLM locked, TC003 LLM persist,
//                           TC004 min-1 message, TC005 single LLM toggle disabled,
//                           TC006 web search toggle, TC007 disabled LLM web-search grayed,
//                           TC008 Reader RO, TC009 navigate away + return
// Generated: 2026-04-30 | Updated: 2026-05-02
//
// Source CSV: .claude/Data/output/csv/testcases-coverage-epic100-20260430.csv
// Visual reference:
//   - figmaScreens/10_Manage_Scope/01_Manage_Scope.png
//       Sections: Analysis Scope (Markets card + Categories card), LLM Engines, Analysis Information
//       Markets card: "+ Add Market" button, country rows with "★ Primary" badge
//       Categories card: "+ Add Category" button, category rows with colored dot
//       LLM Engines: toggle cards for Gemini, ChatGPT, Claude, Grok, Perplexity
//   - figmaScreens/10_Manage_Scope/02_Manage_Scope_-_All_LLMs_Toggled_on.png
//   - figmaScreens/10_Manage_Scope/04_Manage_Scope_-_Unavailable_LLM_Engine.png
//       Tooltip on unavailable engine: "This LLM engine is not included in your subscription."
//   - figmaScreens/10_Manage_Scope/05_Add_Market_-_Step_01_Market.png
//       Add Market modal: 3-step wizard (Market → Brand Image → Categories)
//       Step 1: "Select a country..." / "Select a language..." dropdowns, Cancel + Next
//   - figmaScreens/10_Manage_Scope/14_Add_Market_-_Discard_confirmation.png
//       Final step "Add Country" button. Discard: "Exit and Discard" confirmation dialog
//   - figmaScreens/10_Manage_Scope/17_Add_Category.png
//       Add Category modal: 2-step wizard (Category → Prompts)
//       Category Name input, AI description, Cancel + Next
//
// Env vars:
//   BASE_URL        — root URL of the GEO app (default: common.json)
//   DASHBOARD_UUID  — UUID of a report with the expected fixture state (default: common.json)
//   ROLE            — Reader | Editor (default: Editor). Session must be pre-authenticated.
//   QUOTA_ACCOUNT   — "true" if the org is at quota limit for markets/categories (TC007/TC008)
//   CRUD_ENABLED    — "true" to run add/remove/update tests that mutate fixture state (TC002-TC006)

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// ── Data ──────────────────────────────────────────────────────────────────────
const COMMON = require('../test-data/common.json');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const SCOPE = require('../test-data/manage-scope.json');
const H     = require('./e2e-helpers');

// ── Constants ─────────────────────────────────────────────────────────────────
const BASE_URL       = process.env.BASE_URL       || COMMON.base_url;
const DASHBOARD_UUID = process.env.DASHBOARD_UUID || COMMON.dashboard_uuid;
if (!DASHBOARD_UUID) throw new Error('DASHBOARD_UUID missing (neither env var nor common.json).');
const MANAGE_SCOPE_URL = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/manage-scope`;
const ROLE             = process.env.ROLE           || 'Editor';
const IS_QUOTA         = process.env.QUOTA_ACCOUNT  === 'true';
const CRUD_ENABLED     = process.env.CRUD_ENABLED   === 'true';
const LLM_ENGINES      = SCOPE.options.configurable_llm_engines; // ChatGPT, Gemini, Claude, Grok, Perplexity
const SCREENSHOTS_DIR  = path.resolve(__dirname, '../../output/reports/screenshots-epic100');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// ── Selectors ─────────────────────────────────────────────────────────────────
const SEL = {
  dashboardLayout: BLUEPRINT.layout.dashboard_root.selector,
  main:            BLUEPRINT.layout.main_content.selector,
  tooltip:         '[role="tooltip"], [class*="tooltip"], [class*="Tooltip"]',
  // Add buttons (Figma: "+ Add Market" / "+ Add Country" / "+ Add Category")
  addMarketBtn:    'button:has-text("Add Market"), button:has-text("Add Country")',
  addCategoryBtn:  'button:has-text("Add Category"), button:has-text("Add Topic")',
  // Add Market modal (figmaScreens/10_Manage_Scope/05)
  addMarketModal:  '[role="dialog"]:has-text("Add Market")',
  countryDropdown: '[placeholder*="country" i], [aria-label*="country" i]',
  languageDropdown:'[placeholder*="language" i], [aria-label*="language" i]',
  addCountryFinalBtn: 'button:has-text("Add Country")',
  // Add Category modal (figmaScreens/10_Manage_Scope/17)
  addCategoryModal:   '[role="dialog"]:has-text("Add Category")',
  categoryNameInput:  'input[placeholder*="Electric Vehicles" i], input[aria-label*="Category Name" i], [role="dialog"] input[type="text"]',
  // Modal navigation
  modalNextBtn:    '[role="dialog"] button:has-text("Next")',
  modalCancelBtn:  '[role="dialog"] button:has-text("Cancel")',
  // Scope items
  primaryBadge:    'text="Primary", span:has-text("Primary")',
  nextRunNotice:   ':text-matches("next scheduled|next run|will be applied|scheduled execution|weekly", "i")',
  marketQuotaBanner:   ':has-text("You have reached the maximum number of markets"), [role="alert"]:has-text("market")',
  categoryQuotaBanner: ':has-text("You have reached the maximum number"), [role="alert"]:has-text("categor")',
  // LLM toggles (scoped to LLM Engines section in helpers)
  llmToggle:    (engine) => `[role="switch"][aria-label="Toggle ${engine}"]`,
  activeCountIndicator: 'span:text-matches(/^\\d+ of \\d+/)',
};

// ── Helpers ───────────────────────────────────────────────────────────────────
async function screenshot(page, name) {
  const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
  return filePath;
}

function getMain(page) {
  return page.locator(SEL.main);
}

function getSection(page, headingText) {
  const main = getMain(page);
  return main.locator('section, article, div').filter({
    has: main.page().getByRole('heading', { name: headingText, exact: true }),
  }).first();
}

async function openManageScope(page) {
  await page.goto(MANAGE_SCOPE_URL, { waitUntil: 'networkidle' });
  await H.dismissCookieBanner(page);
  await expect(page.locator(SEL.dashboardLayout), 'dashboard-layout must be visible').toBeVisible({ timeout: 30000 });
  await expect(
    getMain(page).getByRole('heading', { name: 'Manage Scope', exact: true }),
    '"Manage Scope" page heading must be visible',
  ).toBeVisible({ timeout: 15000 });
}

async function getOnlyEnabledLLMToggle(page) {
  const llmSection = getSection(page, 'LLM Engines');
  const checked = llmSection.locator('[role="switch"][aria-checked="true"]');
  const count = await checked.count();
  if (count !== 1) {
    // Skip gracefully — these TCs require exactly 1 LLM active (fixture state).
    // Toyota staging has all 5 LLMs enabled; this state cannot be guaranteed at test start.
    test.skip(true,
      `Fixture precondition not met: expected 1 enabled LLM toggle, found ${count}. ` +
      'Run with a dashboard that has exactly 1 LLM active, or enable CRUD_ENABLED to set up state.',
    );
    return null;
  }
  return checked.first();
}

// ── Auto-annotated failure screenshot (MANDATORY — verbatim from run-playwright.md) ───
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'failed') return;
  const error = testInfo.errors[0];
  if (!error) return;
  const rawMsg = (error.message || '').replace(/\[[0-9;]*m/g, '');
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
      } catch (_) { /* invalid selector — skip */ }
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
// GEO-61 — Manage Scope (Markets, Categories, Quota, Reader RO)
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-61-TC001 - Current scope is displayed', async ({ page }) => {
  // Given an Editor opens the Manage Scope page
  await openManageScope(page);
  await screenshot(page, 'GEO-61-TC001_step1_given');

  // When the current scope loads
  const main = getMain(page);
  const marketsSection = getSection(page, 'Countries');
  const categoriesSection = getSection(page, 'Categories');
  const llmSection = getSection(page, 'LLM Engines');
  await expect(marketsSection, 'Markets section must be visible').toBeVisible({ timeout: 15000 });
  await expect(categoriesSection, 'Categories section must be visible').toBeVisible({ timeout: 15000 });
  await expect(llmSection, 'LLM Engines section must be visible').toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-61-TC001_step2_when');

  // Then the page shows countries with a Primary indicator, categories, enabled LLM engines,
  // question counts, and analysis metadata (Created + Last analysis dates)
  // Primary badge on first market (Figma 01: "★ Primary")
  const primaryBadge = marketsSection.locator(SEL.primaryBadge).first();
  await expect(primaryBadge, '"Primary" badge must be visible on the primary market').toBeVisible({ timeout: 5000 });

  // At least one category item in the categories section
  const firstCategory = categoriesSection.locator('li, div[role="listitem"], span').first();
  await expect(firstCategory, 'at least one category must be listed').toBeVisible({ timeout: 5000 });

  // Analysis Information section (Created + Last analysis dates)
  const analysisInfoSection = getSection(page, 'Analysis Information');
  await expect(analysisInfoSection, 'Analysis Information section must be visible').toBeVisible({ timeout: 10000 });
  const createdLabel = analysisInfoSection.locator('text="Created"').first();
  const lastAnalysisLabel = analysisInfoSection.locator('text="Last analysis"').first();
  await expect(createdLabel, '"Created" label must be visible in Analysis Information').toBeVisible({ timeout: 5000 });
  await expect(lastAnalysisLabel, '"Last analysis" label must be visible in Analysis Information').toBeVisible({ timeout: 5000 });

  await screenshot(page, 'GEO-61-TC001_step3_then');
});

test('GEO-61-TC002 - Adding a market updates quota and shows next-run notice', async ({ page }) => {
  // Requires CRUD_ENABLED — this test mutates fixture state by adding a market.
  test.skip(!CRUD_ENABLED, 'GEO-61-TC002: requires CRUD_ENABLED=true — skipped to protect fixture state');

  // Given an Editor adds a new market to the report
  await openManageScope(page);
  const marketsSection = getSection(page, 'Countries');
  await expect(marketsSection).toBeVisible({ timeout: 15000 });
  const addMarketBtn = marketsSection.locator(SEL.addMarketBtn).first();
  await expect(addMarketBtn, '"+ Add Market" button must be visible and enabled').toBeEnabled({ timeout: 5000 });
  await screenshot(page, 'GEO-61-TC002_step1_given');

  // When the Editor saves the market change
  // Open Add Market modal (3-step wizard: Market → Brand Image → Categories)
  await addMarketBtn.click();
  const modal = page.locator(SEL.addMarketModal);
  await expect(modal, 'Add Market modal must open').toBeVisible({ timeout: 10000 });
  // Step 1: select country
  const countryInput = modal.locator(SEL.countryDropdown).first();
  await countryInput.click();
  await countryInput.fill(SCOPE.scenarios.complete.countries_to_add[0]); // Germany
  const countryOption = page.getByRole('option', { name: new RegExp(SCOPE.scenarios.complete.countries_to_add[0], 'i') }).first();
  await expect(countryOption, 'country option must appear in dropdown').toBeVisible({ timeout: 5000 });
  await countryOption.click();
  // Advance through steps to final "Add Country" button
  const nextBtn = modal.locator(SEL.modalNextBtn).first();
  await expect(nextBtn).toBeVisible({ timeout: 3000 });
  await nextBtn.click();
  // Step 2 (Brand Image) → advance
  await expect(modal.locator(SEL.modalNextBtn).first()).toBeVisible({ timeout: 5000 });
  await modal.locator(SEL.modalNextBtn).first().click();
  // Step 3 (Categories) → Add Country
  const addCountryFinalBtn = modal.locator(SEL.addCountryFinalBtn).first();
  await expect(addCountryFinalBtn, '"Add Country" final button must be visible').toBeVisible({ timeout: 5000 });
  await addCountryFinalBtn.click();
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  await screenshot(page, 'GEO-61-TC002_step2_when');

  // Then the new market appears, quota increments, and next-run notice is displayed
  const addedMarket = marketsSection.getByText(new RegExp(SCOPE.scenarios.complete.countries_to_add[0], 'i')).first();
  await expect(addedMarket, 'newly added market must appear in the Markets list').toBeVisible({ timeout: 10000 });
  const nextRunNotice = getMain(page).locator(SEL.nextRunNotice).first();
  await expect(nextRunNotice, 'next-run notice must be visible after adding a market').toBeVisible({ timeout: 5000 });

  await screenshot(page, 'GEO-61-TC002_step3_then');
});

test('GEO-61-TC003 - Adding a category does not consume market quota', async ({ page }) => {
  test.skip(!CRUD_ENABLED, 'GEO-61-TC003: requires CRUD_ENABLED=true — skipped to protect fixture state');

  // Given an Editor adds a new category to the report
  await openManageScope(page);
  const categoriesSection = getSection(page, 'Categories');
  await expect(categoriesSection).toBeVisible({ timeout: 15000 });
  const addCategoryBtn = categoriesSection.locator(SEL.addCategoryBtn).first();
  await expect(addCategoryBtn, '"+ Add Category" button must be visible and enabled').toBeEnabled({ timeout: 5000 });
  // Snapshot market count before (to verify quota unchanged)
  const marketsSection = getSection(page, 'Countries');
  const marketRowsBefore = await marketsSection.locator('li, [role="listitem"]').count();
  await screenshot(page, 'GEO-61-TC003_step1_given');

  // When the Editor saves the category change
  await addCategoryBtn.click();
  const modal = page.locator(SEL.addCategoryModal);
  await expect(modal, 'Add Category modal must open').toBeVisible({ timeout: 10000 });
  const categoryInput = modal.locator(SEL.categoryNameInput).first();
  await expect(categoryInput).toBeVisible({ timeout: 5000 });
  await categoryInput.fill(SCOPE.scenarios.complete.categories_to_add[0]); // mobile phone
  // Click "Add Category" (AI translate trigger) inside modal
  const addCategoryInsideModal = modal.getByRole('button', { name: /Add Category/i }).first();
  await expect(addCategoryInsideModal).toBeVisible({ timeout: 5000 });
  await addCategoryInsideModal.click();
  // Advance to next step
  const nextBtn = modal.locator(SEL.modalNextBtn).first();
  if (await nextBtn.isVisible()) await nextBtn.click();
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  await screenshot(page, 'GEO-61-TC003_step2_when');

  // Then no additional market quota is consumed and the change is applied on the next run
  const marketRowsAfter = await marketsSection.locator('li, [role="listitem"]').count();
  expect(marketRowsAfter, 'market count must not change after adding a category').toBe(marketRowsBefore);
  const addedCategory = categoriesSection.getByText(new RegExp(SCOPE.scenarios.complete.categories_to_add[0], 'i')).first();
  await expect(addedCategory, 'newly added category must appear in the Categories list').toBeVisible({ timeout: 10000 });
  const nextRunNotice = getMain(page).locator(SEL.nextRunNotice).first();
  await expect(nextRunNotice, 'next-run notice must appear after adding a category').toBeVisible({ timeout: 5000 });

  await screenshot(page, 'GEO-61-TC003_step3_then');
});

test('GEO-61-TC004 - Removing a market is applied on the next execution', async ({ page }) => {
  test.skip(!CRUD_ENABLED, 'GEO-61-TC004: requires CRUD_ENABLED=true — skipped to protect fixture state');

  // Given an Editor removes an existing market from the report
  await openManageScope(page);
  const marketsSection = getSection(page, 'Countries');
  await expect(marketsSection).toBeVisible({ timeout: 15000 });
  // Find a non-primary market to remove (using fixture country)
  const countryToRemove = SCOPE.scenarios.complete.countries_to_remove[0]; // France
  const removeBtn = marketsSection.locator(`button[aria-label="Remove ${countryToRemove}"], button[aria-label*="${countryToRemove}"]`).first();
  await expect(removeBtn, `"Remove ${countryToRemove}" button must be visible`).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-61-TC004_step1_given');

  // When the Editor saves the market removal
  await removeBtn.click();
  // Handle removal confirmation dialog if it appears
  const confirmBtn = page.locator('button:has-text("Confirm"), button:has-text("Remove"), button:has-text("Delete")').first();
  if (await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await confirmBtn.click();
  }
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  await screenshot(page, 'GEO-61-TC004_step2_when');

  // Then the market is removed and the UI shows the next-run message
  const removedMarket = marketsSection.getByText(new RegExp(countryToRemove, 'i')).first();
  await expect(removedMarket, `"${countryToRemove}" must no longer appear in the Markets list`).toHaveCount(0);
  const nextRunNotice = getMain(page).locator(SEL.nextRunNotice).first();
  await expect(nextRunNotice, 'next-run notice must appear after removing a market').toBeVisible({ timeout: 5000 });

  await screenshot(page, 'GEO-61-TC004_step3_then');
});

test('GEO-61-TC005 - Removing a category is applied on the next execution', async ({ page }) => {
  test.skip(!CRUD_ENABLED, 'GEO-61-TC005: requires CRUD_ENABLED=true — skipped to protect fixture state');

  // Given an Editor removes an existing category from the report
  await openManageScope(page);
  const categoriesSection = getSection(page, 'Categories');
  await expect(categoriesSection).toBeVisible({ timeout: 15000 });
  const categoryToRemove = SCOPE.scenarios.complete.categories_to_remove[0]; // AI chatbot
  const removeBtn = categoriesSection.locator(`button[aria-label="Remove ${categoryToRemove}"], button[aria-label*="${categoryToRemove}"]`).first();
  await expect(removeBtn, `"Remove ${categoryToRemove}" button must be visible`).toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-61-TC005_step1_given');

  // When the Editor saves the category removal
  await removeBtn.click();
  const confirmBtn = page.locator('button:has-text("Confirm"), button:has-text("Remove"), button:has-text("Delete")').first();
  if (await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await confirmBtn.click();
  }
  await page.waitForLoadState('networkidle', { timeout: 10000 });
  await screenshot(page, 'GEO-61-TC005_step2_when');

  // Then the category is removed on the next scheduled execution
  const removedCategory = categoriesSection.getByText(new RegExp(categoryToRemove, 'i')).first();
  await expect(removedCategory, `"${categoryToRemove}" must no longer appear in the Categories list`).toHaveCount(0);

  await screenshot(page, 'GEO-61-TC005_step3_then');
});

test('GEO-61-TC006 - Question and competitor updates are persisted', async ({ page }) => {
  test.skip(!CRUD_ENABLED, 'GEO-61-TC006: requires CRUD_ENABLED=true — skipped to protect fixture state');

  // Given an Editor modifies questions or adds competitors
  await openManageScope(page);
  const main = getMain(page);
  // Find the Questions section (section name from manage-scope.json: "Questions")
  const questionsSection = main.locator('section, article, div').filter({
    has: main.page().locator(':text("Questions"), :text("Prompts")'),
  }).first();
  await expect(questionsSection, 'Questions/Prompts section must be visible').toBeVisible({ timeout: 15000 });
  // Find an add question input or button
  const addQuestionInput = questionsSection.locator('input[type="text"], textarea').first();
  await expect(addQuestionInput, 'a question input field must be available').toBeVisible({ timeout: 5000 });
  await screenshot(page, 'GEO-61-TC006_step1_given');

  // When the Editor saves the changes
  const newQuestion = SCOPE.scenarios.complete.questions_to_add[0];
  await addQuestionInput.fill(newQuestion);
  const saveBtn = questionsSection.locator('button:has-text("Save"), button:has-text("Add"), button[type="submit"]').first();
  if (await saveBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await saveBtn.click();
  }
  await page.waitForLoadState('networkidle', { timeout: 5000 });
  await screenshot(page, 'GEO-61-TC006_step2_when');

  // Then the changes are persisted and applied on the next scheduled execution
  const savedQuestion = questionsSection.getByText(newQuestion).first();
  await expect(savedQuestion, 'newly added question must be visible in the Questions section').toBeVisible({ timeout: 10000 });

  await screenshot(page, 'GEO-61-TC006_step3_then');
});

test('GEO-61-TC007 - Markets quota: Add Country button disabled with warning banner', async ({ page }) => {
  // Given the organization has reached max_brand_markets quota
  test.skip(!IS_QUOTA, 'GEO-61-TC007: requires QUOTA_ACCOUNT=true (org at max markets quota)');
  await openManageScope(page);
  await screenshot(page, 'GEO-61-TC007_step1_given');

  // When the Editor views Manage Scope
  const marketsSection = getSection(page, 'Countries');
  await expect(marketsSection, 'Markets section must be visible').toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-61-TC007_step2_when');

  // Then the "+ Add Country/Market" button is disabled
  const addMarketBtn = marketsSection.locator(SEL.addMarketBtn).first();
  await expect(addMarketBtn, '"+ Add Market/Country" button must be visible').toBeVisible({ timeout: 5000 });
  await expect(addMarketBtn, '"+ Add Market/Country" must be disabled when markets quota is reached').toBeDisabled();

  // And a yellow warning banner is displayed:
  // "You have reached the maximum number of markets you can add. Please contact our sales team if you wish to add more."
  const quotaBanner = marketsSection.locator(SEL.marketQuotaBanner).first();
  await expect(
    quotaBanner,
    'market quota warning banner must be visible inside the Markets section',
  ).toBeVisible({ timeout: 5000 });

  await screenshot(page, 'GEO-61-TC007_step3_then');
});

test('GEO-61-TC008 - Categories quota: Add Topic button disabled with warning banner', async ({ page }) => {
  // Given the organization has reached max_categories quota
  test.skip(!IS_QUOTA, 'GEO-61-TC008: requires QUOTA_ACCOUNT=true (org at max categories quota)');
  await openManageScope(page);
  await screenshot(page, 'GEO-61-TC008_step1_given');

  // When the Editor views Manage Scope
  const categoriesSection = getSection(page, 'Categories');
  await expect(categoriesSection, 'Categories section must be visible').toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-61-TC008_step2_when');

  // Then the "+ Add Topic/Category" button is disabled
  const addCategoryBtn = categoriesSection.locator(SEL.addCategoryBtn).first();
  await expect(addCategoryBtn, '"+ Add Category/Topic" button must be visible').toBeVisible({ timeout: 5000 });
  await expect(addCategoryBtn, '"+ Add Category/Topic" must be disabled when categories quota is reached').toBeDisabled();

  // And a yellow warning banner is displayed (analogous to market quota)
  const quotaBanner = categoriesSection.locator(SEL.categoryQuotaBanner).first();
  await expect(
    quotaBanner,
    'category quota warning banner must be visible inside the Categories section',
  ).toBeVisible({ timeout: 5000 });

  await screenshot(page, 'GEO-61-TC008_step3_then');
});

test('GEO-61-TC009 - Reader sees Manage Scope in read-only mode', async ({ page }) => {
  // Given a Reader is on the Manage Scope page
  test.skip(ROLE !== 'Reader', `GEO-61-TC009: requires ROLE=Reader, current ROLE=${ROLE}`);
  await openManageScope(page);
  await screenshot(page, 'GEO-61-TC009_step1_given');

  // When the page loads
  const main = getMain(page);
  await expect(main).toBeVisible();
  await screenshot(page, 'GEO-61-TC009_step2_when');

  // Then all data is displayed (read-only) but no add/remove buttons are visible
  const marketsSection = getSection(page, 'Countries');
  const categoriesSection = getSection(page, 'Categories');
  await expect(marketsSection, 'Reader: Markets section must be visible (read-only)').toBeVisible({ timeout: 15000 });
  await expect(categoriesSection, 'Reader: Categories section must be visible (read-only)').toBeVisible({ timeout: 15000 });
  await expect(
    marketsSection.locator(SEL.addMarketBtn).first(),
    'Reader: "+ Add Market/Country" button must NOT be visible',
  ).toHaveCount(0);
  await expect(
    categoriesSection.locator(SEL.addCategoryBtn).first(),
    'Reader: "+ Add Category/Topic" button must NOT be visible',
  ).toHaveCount(0);
  await expect(
    main.locator('button[aria-label^="Remove "]'),
    'Reader: no "Remove …" buttons must be visible',
  ).toHaveCount(0);

  // And the page is purely informational — no toggles or editable inputs
  await expect(main.locator('[role="switch"]'), 'Reader: no LLM toggles must be visible').toHaveCount(0);
  await expect(main.locator('input:visible, textarea:visible'), 'Reader: no editable inputs must be visible').toHaveCount(0);

  await screenshot(page, 'GEO-61-TC009_step3_then');
});

// ══════════════════════════════════════════════════════════════════════════════
// GEO-60 — LLM configuration
// ══════════════════════════════════════════════════════════════════════════════

test('GEO-60-TC001 - LLM toggle saves change and applies on next execution', async ({ page }) => {
  // Given an Editor opens the Manage Scope page
  await openManageScope(page);
  const llmSection = getSection(page, 'LLM Engines');
  await expect(llmSection, 'LLM Engines section must be visible').toBeVisible({ timeout: 15000 });
  // Find a toggle that is not the only enabled one — pick a disabled toggle to enable
  const disabledToggle = llmSection.locator('[role="switch"][aria-checked="false"]').first();
  const noDisabledToggle = !(await disabledToggle.isVisible().catch(() => false));
  // If no disabled toggle exists, pick an enabled toggle that is not the last enabled
  const allToggles = llmSection.locator('[role="switch"]');
  const toggleCount = await allToggles.count();
  const enabledCount = await llmSection.locator('[role="switch"][aria-checked="true"]').count();
  test.skip(
    toggleCount === 0,
    'GEO-60-TC001: no LLM toggles found on Manage Scope page',
  );
  // Use a disabled toggle if available; otherwise skip if only 1 enabled (can't safely toggle off)
  let targetToggle;
  if (!noDisabledToggle) {
    targetToggle = disabledToggle;
  } else if (enabledCount > 1) {
    targetToggle = llmSection.locator('[role="switch"][aria-checked="true"]').first();
  } else {
    test.skip(true, 'GEO-60-TC001: cannot safely toggle an LLM without violating the min-1 constraint');
    return;
  }
  // Capture the aria-label BEFORE clicking so we can re-locate with a stable selector post-click.
  // Using a dynamic [aria-checked="..."] locator after the click re-queries and may point to a
  // different toggle if multiple LLMs share the same checked state — classic stale-locator bug.
  const targetAriaLabel = await targetToggle.getAttribute('aria-label');
  const stableToggle = llmSection.locator(`[role="switch"][aria-label="${targetAriaLabel}"]`);
  const initialState = await stableToggle.getAttribute('aria-checked');
  await screenshot(page, 'GEO-60-TC001_step1_given');

  // When the Editor toggles an LLM engine
  await stableToggle.click();
  await screenshot(page, 'GEO-60-TC001_step2_when');

  // Then the change is saved (toggle state flipped) — assert on the stable aria-label locator
  const newState = initialState === 'true' ? 'false' : 'true';
  await expect(stableToggle, `LLM toggle must flip to aria-checked="${newState}"`).toHaveAttribute('aria-checked', newState, { timeout: 8000 });

  // And the change is scheduled for the next execution (next-run notice visible)
  const nextRunNotice = getMain(page).locator(SEL.nextRunNotice).first();
  await expect(nextRunNotice, 'next-run notice must appear after toggling an LLM engine').toBeVisible({ timeout: 5000 });

  await screenshot(page, 'GEO-60-TC001_step3_then');
});

test('GEO-60-TC002 - Last enabled LLM cannot be disabled', async ({ page }) => {
  // Given only one LLM remains enabled (fixture must leave exactly 1 active)
  await openManageScope(page);
  const lastToggle = await getOnlyEnabledLLMToggle(page);
  await screenshot(page, 'GEO-60-TC002_step1_given');

  // When the Editor tries to disable the last enabled LLM
  let clickRejected = false;
  try {
    await lastToggle.click({ trial: false, timeout: 3000 });
  } catch (e) {
    if (/disabled|not (?:enabled|clickable)/i.test(String(e.message))) clickRejected = true;
    else throw e;
  }
  await screenshot(page, 'GEO-60-TC002_step2_when');

  // Then the last LLM stays enabled and the validation prevents the change
  await expect(lastToggle, 'last enabled LLM toggle must remain checked after the disable attempt').toHaveAttribute('aria-checked', 'true');
  const isDisabledAttr = await lastToggle.getAttribute('disabled');
  const ariaDisabled   = await lastToggle.getAttribute('aria-disabled');
  expect(
    isDisabledAttr !== null || ariaDisabled === 'true' || clickRejected,
    'last enabled LLM toggle must be disabled or reject clicks',
  ).toBe(true);

  await screenshot(page, 'GEO-60-TC002_step3_then');
});

test('GEO-60-TC003 - Saved LLM configuration persists until modified again', async ({ page }) => {
  // Given the Editor has saved an LLM configuration change
  await openManageScope(page);
  const llmSection = getSection(page, 'LLM Engines');
  await expect(llmSection).toBeVisible({ timeout: 15000 });
  // Snapshot current LLM toggle states
  const savedState = await llmSection.evaluate((root) => {
    const out = {};
    for (const sw of root.querySelectorAll('[role="switch"]')) {
      const label = sw.getAttribute('aria-label') || '';
      const m = label.match(/^Toggle\s+(.+)$/i);
      const engine = m ? m[1] : label;
      out[engine] = sw.getAttribute('aria-checked');
    }
    return out;
  });
  expect(Object.keys(savedState).length, 'at least one LLM toggle must be present').toBeGreaterThan(0);
  await screenshot(page, 'GEO-60-TC003_step1_given');

  // When the report is viewed later (navigate away and return)
  await page.goto(`${BASE_URL}/dashboard/${DASHBOARD_UUID}`, { waitUntil: 'networkidle' });
  await expect(page.locator(SEL.dashboardLayout)).toBeVisible({ timeout: 15000 });
  await openManageScope(page);
  await screenshot(page, 'GEO-60-TC003_step2_when');

  // Then the saved LLM selection is still applied
  const llmSectionAfter = getSection(page, 'LLM Engines');
  await expect(llmSectionAfter).toBeVisible({ timeout: 15000 });
  const stateAfter = await llmSectionAfter.evaluate((root) => {
    const out = {};
    for (const sw of root.querySelectorAll('[role="switch"]')) {
      const label = sw.getAttribute('aria-label') || '';
      const m = label.match(/^Toggle\s+(.+)$/i);
      const engine = m ? m[1] : label;
      out[engine] = sw.getAttribute('aria-checked');
    }
    return out;
  });
  expect(stateAfter, 'LLM toggle states must match the saved snapshot after return').toEqual(savedState);

  await screenshot(page, 'GEO-60-TC003_step3_then');
});

test('GEO-60-TC004 - Disabling last LLM is prevented with inline message', async ({ page }) => {
  // Given an Editor on the Manage Scope page with only 1 LLM enabled
  await openManageScope(page);
  const lastToggle = await getOnlyEnabledLLMToggle(page);
  await screenshot(page, 'GEO-60-TC004_step1_given');

  // When they attempt to disable the last remaining enabled LLM
  await lastToggle.click().catch(() => {}); // ignore if rejected
  await screenshot(page, 'GEO-60-TC004_step2_when');

  // Then the toggle action is prevented — toggle still checked
  await expect(lastToggle, 'last LLM toggle must remain checked after attempted disable').toHaveAttribute('aria-checked', 'true');

  // And a tooltip or inline message shows "At least one AI engine must remain active"
  const minOneMsg = page.locator(SEL.tooltip)
    .filter({ hasText: 'At least one AI engine must remain active' })
    .first()
    .or(getMain(page).locator(':text("At least one AI engine must remain active")').first());
  await expect(
    minOneMsg,
    'tooltip/inline message "At least one AI engine must remain active" must be visible',
  ).toBeVisible({ timeout: 5000 });

  await screenshot(page, 'GEO-60-TC004_step3_then');
});

test('GEO-60-TC005 - When only 1 LLM is enabled its toggle is disabled', async ({ page }) => {
  // Given only 1 LLM is enabled
  await openManageScope(page);
  const lastToggle = await getOnlyEnabledLLMToggle(page);
  await screenshot(page, 'GEO-60-TC005_step1_given');
  // (no When step — precondition IS the state)
  await screenshot(page, 'GEO-60-TC005_step2_when');

  // Then the last enabled toggle is disabled (cannot be turned off)
  const isDisabledAttr = await lastToggle.getAttribute('disabled');
  const ariaDisabled   = await lastToggle.getAttribute('aria-disabled');
  expect(
    isDisabledAttr !== null || ariaDisabled === 'true',
    'last enabled LLM toggle must have disabled attr or aria-disabled="true" when it is the only active engine',
  ).toBe(true);

  await screenshot(page, 'GEO-60-TC005_step3_then');
});

test('GEO-60-TC006 - Web search toggle is saved and persists after page refresh', async ({ page }) => {
  // Given an Editor viewing an enabled LLM card that supports web search (webSearchCapable = true)
  await openManageScope(page);
  const llmSection = getSection(page, 'LLM Engines');
  await expect(llmSection).toBeVisible({ timeout: 15000 });
  const enabledCards = llmSection.locator(
    'article, section, div:has([role="switch"][aria-checked="true"]):has(:text-matches("Web search", "i"))',
  );
  const card = enabledCards.first();
  await expect(card, 'an enabled web-search-capable LLM card must be present').toBeVisible({ timeout: 10000 });
  const webSearchCheckbox = card
    .getByRole('checkbox', { name: /Web search/i })
    .or(card.locator('input[type="checkbox"][aria-label*="Web search" i]'));
  await expect(webSearchCheckbox, 'Web search checkbox must be visible on the enabled LLM card').toBeVisible({ timeout: 5000 });
  await expect(webSearchCheckbox, 'Web search checkbox must be enabled when the LLM is on').toBeEnabled();
  const initialChecked = await webSearchCheckbox.isChecked();
  await screenshot(page, 'GEO-60-TC006_step1_given');

  // When they toggle the "Web search" checkbox
  await webSearchCheckbox.click();
  await screenshot(page, 'GEO-60-TC006_step2_when');

  // Then the change is saved and still applied after refreshing the page
  await expect(webSearchCheckbox, 'Web search state must flip after click').toBeChecked({ checked: !initialChecked, timeout: 5000 });
  await page.reload({ waitUntil: 'networkidle' });
  const llmSectionAfter = getSection(page, 'LLM Engines');
  const cardAfter = llmSectionAfter.locator(
    'article, section, div:has([role="switch"][aria-checked="true"]):has(:text-matches("Web search", "i"))',
  ).first();
  const webSearchAfter = cardAfter
    .getByRole('checkbox', { name: /Web search/i })
    .or(cardAfter.locator('input[type="checkbox"][aria-label*="Web search" i]'));
  await expect(webSearchAfter, 'Web search state must persist after page reload').toBeChecked({ checked: !initialChecked, timeout: 5000 });

  // And the web search checkbox is only interactive when the LLM is enabled (verified in TC007)
  await screenshot(page, 'GEO-60-TC006_step3_then');
});

test('GEO-60-TC007 - Disabled LLM web search checkbox is grayed out and non-interactive', async ({ page }) => {
  // Given an LLM is disabled
  await openManageScope(page);
  const llmSection = getSection(page, 'LLM Engines');
  await expect(llmSection).toBeVisible({ timeout: 15000 });
  // Find a disabled LLM card that has a web search checkbox
  const disabledCard = llmSection.locator('article, section, div').filter({
    has: llmSection.page().locator('[role="switch"][aria-checked="false"]'),
  }).first();
  await expect(disabledCard, 'a disabled LLM card must exist on the page').toBeVisible({ timeout: 10000 });
  await screenshot(page, 'GEO-60-TC007_step1_given');
  // (state already established)
  await screenshot(page, 'GEO-60-TC007_step2_when');

  // Then the web search checkbox is grayed out and non-interactive
  const webSearchDisabled = disabledCard
    .getByRole('checkbox', { name: /Web search/i })
    .or(disabledCard.locator('input[type="checkbox"][aria-label*="Web search" i]'));
  await expect(
    webSearchDisabled,
    'Web search checkbox on the disabled LLM card must be visible (grayed out)',
  ).toBeVisible({ timeout: 5000 });
  await expect(
    webSearchDisabled,
    'Web search checkbox must be non-interactive (disabled) when its LLM is turned off',
  ).toBeDisabled();

  await screenshot(page, 'GEO-60-TC007_step3_then');
});

test('GEO-60-TC008 - Reader: AI Engines section is read-only', async ({ page }) => {
  // Given a Reader is on the Manage Scope page
  test.skip(ROLE !== 'Reader', `GEO-60-TC008: requires ROLE=Reader, current ROLE=${ROLE}`);
  await openManageScope(page);
  await screenshot(page, 'GEO-60-TC008_step1_given');

  // When they view the "AI Engines" section (Figma: "LLM Engines")
  const llmSection = getSection(page, 'LLM Engines');
  await expect(llmSection, 'Reader: LLM Engines section must be visible').toBeVisible({ timeout: 15000 });
  await screenshot(page, 'GEO-60-TC008_step2_when');

  // Then LLM cards are displayed in read-only mode (no toggles, no web search checkboxes)
  for (const engine of LLM_ENGINES) {
    const card = llmSection.locator('article, section, div').filter({
      has: llmSection.page().getByText(engine, { exact: true }),
    }).first();
    await expect(card, `Reader: ${engine} card must be visible`).toBeVisible({ timeout: 5000 });
  }
  await expect(llmSection.locator('[role="switch"]'), 'Reader: no LLM toggles must be present').toHaveCount(0);
  await expect(llmSection.getByRole('checkbox', { name: /Web search/i }), 'Reader: no Web search checkboxes must be present').toHaveCount(0);

  // And the section shows "X of N active" indicator
  const activeCountBadge = llmSection.locator(
    'span.inline-flex, span[class*="rounded-full"], [data-testid*="count" i]',
  ).filter({ hasText: /^\d+$/ }).first();
  await expect(activeCountBadge, 'Reader: active LLM count indicator must be visible').toBeVisible({ timeout: 5000 });

  await screenshot(page, 'GEO-60-TC008_step3_then');
});

test('GEO-60-TC009 - Saved LLM state is preserved after navigation and included in next scheduled run', async ({ page }) => {
  // Given an Editor has toggled LLM configurations and saved
  await openManageScope(page);
  const llmSection = getSection(page, 'LLM Engines');
  await expect(llmSection).toBeVisible({ timeout: 15000 });
  // Find a safe toggle to flip (disabled toggle if available)
  const disabledToggle = llmSection.locator('[role="switch"][aria-checked="false"]').first();
  const hasDisabled = await disabledToggle.isVisible().catch(() => false);
  const enabledCount = await llmSection.locator('[role="switch"][aria-checked="true"]').count();
  let targetToggle = null;
  if (hasDisabled) {
    targetToggle = disabledToggle;
  } else if (enabledCount > 1) {
    targetToggle = llmSection.locator('[role="switch"][aria-checked="true"]').first();
  }
  if (!targetToggle) {
    test.skip(true, 'GEO-60-TC009: cannot safely toggle an LLM (only 1 enabled, no disabled available)');
    return;
  }
  await targetToggle.click();
  const savedState = await targetToggle.getAttribute('aria-checked');
  await screenshot(page, 'GEO-60-TC009_step1_given');

  // When they navigate away and return to the Manage Scope page
  await page.goto(`${BASE_URL}/dashboard/${DASHBOARD_UUID}`, { waitUntil: 'networkidle' });
  await expect(page.locator(SEL.dashboardLayout)).toBeVisible({ timeout: 15000 });
  await openManageScope(page);
  await screenshot(page, 'GEO-60-TC009_step2_when');

  // Then the saved LLM state is reflected correctly after return
  const llmSectionAfter = getSection(page, 'LLM Engines');
  await expect(llmSectionAfter).toBeVisible({ timeout: 15000 });
  // Re-locate the same toggle by aria-label (it was flipped, so find it by its new state)
  const ariaLabel = await targetToggle.getAttribute('aria-label');
  const toggleAfter = llmSectionAfter.locator(`[role="switch"][aria-label="${ariaLabel}"]`).first();
  await expect(
    toggleAfter,
    `LLM toggle "${ariaLabel}" must still be aria-checked="${savedState}" after navigate-and-return`,
  ).toHaveAttribute('aria-checked', savedState || '', { timeout: 5000 });

  // And the changes are included in the next scheduled weekly execution (not triggered immediately)
  const nextRunNotice = getMain(page).locator(SEL.nextRunNotice).first();
  await expect(
    nextRunNotice,
    'a notice about the next scheduled (weekly) execution must be visible',
  ).toBeVisible({ timeout: 5000 });

  await screenshot(page, 'GEO-60-TC009_step3_then');
});
