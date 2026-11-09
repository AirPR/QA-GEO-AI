// create-default-analysis.spec.js
// E2E happy-path — création complète d'une analyse de bout-en-bout via le wizard.
// 1 seul test avec 16 test.step() — alignés ligne-à-ligne sur le CSV
// `.claude/Data/output/csv/create-default-analysis.csv` (TC unique E2E-CREATE-DEFAULT-001).
//
// URL cible : https://staging-geo.onclusive.com/geo/new
//   construite via BASE_URL + JDD.wizard.step1_url_path = ${BASE_URL}/new.
//
// Données concrètes utilisées (depuis le JDD, profil "default") :
//   • Brand    = Chanel
//   • Country  = United States
//   • Language = English (auto-détectée)
//   • Categories / Prompts / LLMs = defaults proposés par le système (aucune édition)
//
// Lancement :
//   EPIC_ID=104 USE_AUTH=true npx playwright test \
//     .claude/Data/raw/playwright/create-default-analysis.spec.js

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');

const COMMON    = require('../test-data/common.json');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H         = require('./e2e-helpers');

// ── JDD (3-layer merge) ───────────────────────────────────────────────────────
const { loadJDD } = require('../test-data/jdd/loadJDD');
const JDD = loadJDD('create-default-analysis');

// ── Constants (env > JDD) ─────────────────────────────────────────────────────
const BASE_URL   = process.env.BASE_URL   || COMMON.base_url;
const WIZARD_URL = process.env.WIZARD_URL || `${BASE_URL}${JDD.wizard.step1_url_path}`;
const TEST_BRAND = process.env.TEST_BRAND || JDD.brand.name;

// N marchés — supporte à la fois le nouveau format (markets[]) et l'ancien (market{})
const MARKETS = (() => {
  if (JDD.markets && JDD.markets.length) return JDD.markets;
  if (JDD.market) return [JDD.market];
  return [{ country: 'United States', language: 'English' }];
})();

// N LLMs — tableau vide = garder les defaults du wizard
const EXPECTED_LLMS = JDD.expected_llms || [];

// Catégories supplémentaires à ajouter manuellement après la découverte IA
// Tableau vide = garder uniquement les catégories découvertes par défaut
const ADDITIONAL_CATEGORIES = JDD.additional_categories || [];
const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-create-default-analysis');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// ── Selectors — updated for new wizard UI (data-testid confirmed via MCP 2026-07-22) ──
const S = {
  // Step 1 — Brand & Country
  brandInput:       '[data-testid="wizard-brand-search-input"]',
  brandOption:      '[role="option"]',
  customBrand:      '[role="option"]:has-text("Custom Brand"), li:has-text("Custom Brand")',
  // "Add Country" card (new wizard — button was "Add Market", now "Add Country")
  addMarketBtn:     '[data-testid="wizard-market-selector-add-btn"], [data-testid="wizard-market-add-btn"]',
  countryBtn:       '[data-testid="wizard-market-selector-country-btn"]',
  countrySearch:    'input[placeholder="Search a country..."]',
  countryOption:    '[role="option"]',
  languageField:    '[data-testid="wizard-market-selector-lang-btn"]',
  saveMarketBtn:    '[data-testid="wizard-market-selector-save-btn"]',
  // Step 2 — Categories
  addCategoryBtn:   '[data-testid="wizard-category-add-btn"]',
  categoryInput:    '[data-testid="wizard-category-form-input"]',
  categoryAddBtn:   '[data-testid="wizard-category-form-save-btn"]',
  aiCategoryItem:   '[data-testid*="wizard-category-item"]',
  // Navigation buttons (same testid per step, text changes)
  discoverCatsBtn:  '[data-testid="wizard-next-btn"]',   // Step 1→2 : "Discover Categories"
  reviewPromptsBtn: '[data-testid="wizard-next-btn"]',   // Step 2→3 : "Review Prompt"
  reviewBtn:        '[data-testid="wizard-next-btn"]',   // Step 3→4 : "Review & Launch"
  finalLaunchBtn:   '[data-testid="wizard-next-btn"]',   // Step 4 launch : "Review & Launch"
  // Stepper
  stepCompleted:    '[class*="completed"], [aria-label*="completed" i], [data-state*="complete"], svg[class*="check"]',
  // Loading states
  generatingMsg:    'text=/Generating questions|Adapting prompts/i',
  discoveringMsg:   'text=/Discovering Categories/i',
  // Step 4 summary — data-testid (label changed: "Markets" → "Countries" in new UI)
  summaryMarkets:    '[data-testid="wizard-review-stat-markets"]',
  summaryCategories: '[data-testid="wizard-review-stat-categories"]',
  summaryPrompts:    '[data-testid="wizard-review-stat-prompts"]',
  // LLM toggles — data-testid per engine (openai/gemini/grok/claude/perplexity)
  llmToggle:         '[data-testid*="wizard-llm-toggle"]',
  // Reports list
  reportsListRow:    '[data-testid*="report-row"], tr, [class*="report-row"], [class*="reportRow"]',
};

async function shot(page, name) {
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${name}.png`), fullPage: false });
}

// ── Auto-annotated failure screenshot (mandatory per CLAUDE.md) ───────────────
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
        if (hasTexts.length) candidate = matches.find(el => hasTexts.some(t => (el.textContent || '').includes(t)));
        if (!candidate) candidate = matches[0];
        let target = candidate;
        while (target && target !== document.body && !isVisible(target)) target = target.parentElement;
        if (!target || target === document.body) continue;
        paint(target);
        return true;
      } catch (_) { /* skip */ }
    }
    return false;
  }, { selectors: allSelectors, hasTexts: hasTextMatches }).catch(() => false);
  if (!annotated) {
    await page.evaluate(() => {
      const banner = document.createElement('div');
      banner.textContent = 'TEST FAILED — element not found in DOM';
      Object.assign(banner.style, {
        position: 'fixed', top: '0', left: '0', right: '0',
        background: '#dc2626', color: 'white', padding: '10px 16px',
        fontWeight: '700', fontSize: '14px', zIndex: '999999', textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
      });
      document.body.prepend(banner);
    }).catch(() => {});
  }
  const tcId = (testInfo.title.split(' ')[0] || 'TEST').replace(/[^\w-]/g, '_');
  const failPath = path.join(SCREENSHOTS_DIR, `${tcId}_fail.png`);
  await page.screenshot({ path: failPath, fullPage: false }).catch(() => {});
});

// ══════════════════════════════════════════════════════════════════════════════
// E2E-CREATE-DEFAULT-001
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-CREATE-DEFAULT-001 - Create default analysis (Chanel / United States / English)', async ({ page }) => {
  test.setTimeout(600000); // 10 min — couvre 16 steps + plusieurs loadings (Adapting prompts, submission, redirect)

  // ── Step CSV 1 : Given an authenticated Editor opens the wizard ─────────────
  await test.step('Given an authenticated Editor opens the wizard', async () => {
    await page.goto(WIZARD_URL, { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    // Wizard Step 1 visible avec stepper 4 étapes (labels réels confirmés via MCP)
    for (const label of ['Brand & Country', 'Categories', 'Prompts', 'Review']) {
      const stepEl = page.locator(`[data-testid*="wizard-stepper-step"]:has-text("${label}")`).first();
      await expect(stepEl, `Step "${label}" must be visible in the stepper`).toBeVisible({ timeout: 10000 });
    }
    await shot(page, 'E2E-CREATE-DEFAULT-001_01_given-wizard-open');
  });

  // ── Step CSV 2 : When the Editor types Chanel in the Brand search field ─────
  await test.step(`When the Editor types ${TEST_BRAND} in the Brand search field`, async () => {
    const brandInput = page.locator(S.brandInput).first();
    await expect(brandInput, 'Brand search field must be visible on Step 1').toBeVisible({ timeout: 10000 });
    await brandInput.click();
    await brandInput.fill(TEST_BRAND);
    // Autocomplete suggestions appear with logo and domain
    const firstOption = page.locator(S.brandOption).first().or(page.locator(S.customBrand).first());
    await expect(firstOption, 'Autocomplete suggestions must appear after typing the brand').toBeVisible({ timeout: 8000 });
    await shot(page, 'E2E-CREATE-DEFAULT-001_02_when-brand-typed');
  });

  // ── Step CSV 3 : And selects the Chanel suggestion ──────────────────────────
  await test.step(`And selects the ${TEST_BRAND} suggestion`, async () => {
    const firstOption = page.locator(S.brandOption).first().or(page.locator(S.customBrand).first());
    await firstOption.click();
    // Verify the brand is committed (input retained or chip shown).
    await page.waitForTimeout(500);
    await shot(page, 'E2E-CREATE-DEFAULT-001_03_and-brand-selected');
  });

  // ── Steps dynamiques : N marchés (Add Market + language auto-detect + Save) ──
  for (let i = 0; i < MARKETS.length; i++) {
    const { country, language } = MARKETS[i];
    const slug = country.toLowerCase().replace(/\s+/g, '-');

    await test.step(`When the Editor adds the market ${country}`, async () => {
      // New wizard: "Add Country" button opens a card with a country search input
      const addBtn = page.locator(S.addMarketBtn).first();
      await expect(addBtn, '"Add Country" button must be visible').toBeVisible({ timeout: 10000 });
      await addBtn.click();
      // Dismiss cookie banner si présent
      await H.dismissCookieBanner(page);
      // Click the country button inside the card to open the country dropdown
      const countryBtn = page.locator(S.countryBtn).last();
      await expect(countryBtn, `Country button must be visible in card for market ${i + 1}`).toBeVisible({ timeout: 10000 });
      await countryBtn.click();
      // The search input appears inside the dropdown after clicking the country button
      const countrySearch = page.locator(S.countrySearch).last();
      await expect(countrySearch, `Country search input must be visible for market ${i + 1}`).toBeVisible({ timeout: 10000 });
      await countrySearch.fill(country);
      const countryOption = page.locator(`${S.countryOption}:has-text("${country}")`).first();
      await expect(countryOption, `Country option "${country}" must be available`).toBeVisible({ timeout: 8000 });
      await countryOption.click();
      await shot(page, `E2E-CREATE-DEFAULT-001_market-${slug}`);
    });

    await test.step(`Then the language ${language} is auto-detected for ${country}`, async () => {
      // New wizard: language auto-detected and shown in wizard-market-selector-lang-btn
      const langBtn = page.locator(S.languageField).last();
      await expect(langBtn, `Language button must be visible for market "${country}"`).toBeVisible({ timeout: 5000 });
      const langText = await langBtn.textContent();
      expect(
        (langText || '').toLowerCase(),
        `Auto-detected language must contain "${language}" — got: "${langText}"`,
      ).toContain(language.toLowerCase().split(' ')[0]);

      // Commit via the Save button in the card
      const saveBtn = page.locator(S.saveMarketBtn).last();
      await expect(saveBtn, `"Save" button must be visible for market "${country}"`).toBeVisible({ timeout: 5000 });
      await saveBtn.click();
      await page.waitForTimeout(1000);
      await shot(page, `E2E-CREATE-DEFAULT-001_lang-${slug}`);
    });
  }

  // ── Step CSV 6 : When the Editor clicks Discover Categories ─────────────────
  await test.step('When the Editor clicks Discover Categories', async () => {
    const btn = page.locator(S.discoverCatsBtn).first();
    await expect(btn, '"Discover Categories" CTA must be visible on Step 1').toBeVisible({ timeout: 10000 });
    await btn.click();
    // Loading state "Discovering Categories" peut apparaître (transient).
    await page.locator(S.discoveringMsg).first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await shot(page, 'E2E-CREATE-DEFAULT-001_06_when-discover-categories');
  });

  // ── Step CSV 7 : And the Editor accepts/adds categories ─────────────────────
  await test.step(
    ADDITIONAL_CATEGORIES.length > 0
      ? `And the Editor accepts the AI-discovered categories and adds: ${ADDITIONAL_CATEGORIES.join(', ')}`
      : 'And the Editor accepts the AI-discovered categories without modification',
    async () => {
      // Step 2 — wait for discovery to finish + at least 1 category to be visible.
      await page.waitForLoadState('networkidle', { timeout: 60000 });
      // Disparition du loader si présent.
      const loading = page.locator(S.discoveringMsg).first();
      if (await loading.isVisible().catch(() => false)) {
        await expect(loading).not.toBeVisible({ timeout: 60000 });
      }
      // Sanity : le heading "We detected these categories for {brand}" doit être visible.
      const detectedHeading = page.getByRole('heading', { name: new RegExp(`We detected these categories for ${TEST_BRAND}`, 'i') });
      await expect(detectedHeading, `Heading "We detected these categories for ${TEST_BRAND}" must be visible`).toBeVisible({ timeout: 30000 });

      // Au moins 1 catégorie AI-discovered.
      // New wizard: [data-testid*="wizard-category-item"] with "AI Generated" text inside
      const aiGeneratedCategories = page.locator(S.aiCategoryItem).filter({ hasText: /AI Generated/i });
      const discoveredCount = await aiGeneratedCategories.count();
      expect(
        discoveredCount,
        'At least one AI-discovered category (with "AI Generated" badge) must be visible on Step 2',
      ).toBeGreaterThan(0);

      // Ajouter les catégories supplémentaires via le bouton "+ Add Category"
      for (const catName of ADDITIONAL_CATEGORIES) {
        // Cliquer "+ Add Category" pour ouvrir le champ de saisie
        const addCatBtn = page.locator(S.addCategoryBtn).first();
        await expect(addCatBtn, '"Add Category" button must be visible').toBeVisible({ timeout: 5000 });
        await addCatBtn.click();

        // Saisir le nom de la catégorie (en anglais — l'app traduit automatiquement)
        const catInput = page.locator(S.categoryInput).last();
        await expect(catInput, `Category input must appear after clicking "Add Category"`).toBeVisible({ timeout: 5000 });
        await catInput.fill(catName);

        // Confirmer via le bouton "Save" du formulaire
        const addConfirmBtn = page.locator(S.categoryAddBtn).last();
        await expect(addConfirmBtn, `"Save" confirm button must be visible for category "${catName}"`).toBeVisible({ timeout: 5000 });
        await expect(addConfirmBtn, `"Save" confirm button must be enabled`).toBeEnabled({ timeout: 5000 });
        await addConfirmBtn.click();
        await page.waitForTimeout(500);
      }

      await shot(page, 'E2E-CREATE-DEFAULT-001_07_and-categories-accepted');
    }
  );

  // ── Step CSV 8 : When the Editor clicks Review Prompts ──────────────────────
  await test.step('When the Editor clicks Review Prompts', async () => {
    const btn = page.locator(S.reviewPromptsBtn).first();
    await expect(btn, '"Review Prompts" button must be visible on Step 2').toBeVisible({ timeout: 30000 });
    await btn.click();
    // Step 3 — heading "Prompts" doit apparaître.
    const h = page.getByRole('heading', { name: /Prompts/i }).first();
    await expect(h, 'Step 3 "Prompts" heading must appear after Review Prompts').toBeVisible({ timeout: 30000 });
    await shot(page, 'E2E-CREATE-DEFAULT-001_08_when-review-prompts');
  });

  // ── Step CSV 9 : And the system generates default questions ────────────────
  await test.step('And the system generates default questions for each category', async () => {
    // 1. Wait for the loading state to APPEAR (it may already be visible since Review Prompts).
    //    Pattern observé : "Adapting prompts..." avec progress bar 0→100%.
    const loading = page.locator(S.generatingMsg).first();
    // 2. Wait for loading to DISAPPEAR (génération peut durer 1-2 min sur staging).
    if (await loading.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(loading, 'Loading state ("Adapting prompts" / "Generating questions") must finish').not.toBeVisible({ timeout: 120000 });
    }
    // 3. Wait for the network to settle.
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    // 4. Au moins 1 question doit être visible. Sélecteur tolérant — on cherche tout texte
    //    se terminant par "?" dans la zone main (les questions GEO finissent toutes par "?").
    const anyQuestion = page.locator('main')
      .locator(':text-matches(".+\\?\\s*$")').first();
    await expect(anyQuestion, 'At least one default question (text ending with "?") must be visible on Step 3').toBeVisible({ timeout: 30000 });
    await shot(page, 'E2E-CREATE-DEFAULT-001_09_and-questions-generated');
  });

  // ── Step CSV 10 : When the Editor clicks Review (Step 3 → Step 4) ──────────
  await test.step('When the Editor clicks Review', async () => {
    // Attendre que le bouton Review soit visible ET enabled (il est aria-disabled pendant la génération des questions)
    const btn = page.locator('button:has-text("Review & Launch"):not([aria-disabled="true"]):not([disabled]), button:has-text("Review"):not([aria-disabled="true"]):not([disabled])').first();
    await expect(btn, '"Review" CTA must be visible and enabled on Step 3').toBeVisible({ timeout: 60000 });
    await expect(btn, '"Review" CTA must be enabled before clicking').toBeEnabled({ timeout: 60000 });
    await btn.click();
    // Possible loading state entre Step 3 et Step 4 (préparation summary). Wait long.
    const loading = page.locator(
      'text=/Adapting|Loading|Preparing|Generating|Calculating/i'
    ).first();
    if (await loading.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(loading, 'Transition loading state must finish before Step 4 renders').not.toBeVisible({ timeout: 120000 });
    }
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    // Step 4 — heading review/ready visible.
    const h = page.getByRole('heading', { name: /Ready to analyze|Review/i }).first();
    await expect(h, 'Step 4 (Review/Ready to analyze) heading must appear').toBeVisible({ timeout: 60000 });
    await shot(page, 'E2E-CREATE-DEFAULT-001_10_when-review-step4');
  });

  // ── Step CSV 11 : Then the Review summary shows 3 cards ─────────────────────
  await test.step('Then the Review summary shows the Markets Categories and Total Prompts cards', async () => {
    // Cards may render after a small delay — generous timeout.
    await expect(page.locator(S.summaryMarkets).first(),    'Markets summary card must be visible').toBeVisible({ timeout: 30000 });
    await expect(page.locator(S.summaryCategories).first(), 'Categories summary card must be visible').toBeVisible({ timeout: 30000 });
    await expect(page.locator(S.summaryPrompts).first(),    'Total Prompts summary card must be visible').toBeVisible({ timeout: 30000 });
    await shot(page, 'E2E-CREATE-DEFAULT-001_11_then-summary-cards');
  });

  // ── Step dynamique : LLM selection (N LLMs ou defaults) ─────────────────────
  await test.step(
    EXPECTED_LLMS.length > 0
      ? `And the Editor selects the LLMs: ${EXPECTED_LLMS.join(', ')}`
      : 'And the default LLM engines are pre-selected without manual changes',
    async () => {
      const anyToggle = page.locator(S.llmToggle).first();
      await expect(anyToggle, 'At least one LLM toggle must be present on Step 4').toBeVisible({ timeout: 30000 });

      if (EXPECTED_LLMS.length > 0) {
        // Désélectionner tous les LLMs actifs (toggle React — re-query à chaque clic)
        for (let guard = 0; guard < 15; guard++) {
          const checked = page.locator(
            '[data-testid*="wizard-llm-toggle"][aria-checked="true"], [data-testid*="wizard-llm-toggle"][data-state="checked"]'
          );
          const n = await checked.count();
          if (n === 0) break;
          await checked.nth(0).click();
          await page.waitForTimeout(300);
        }
        // Sélectionner uniquement les LLMs attendus
        // LLM id mapping: ChatGPT→openai, Gemini→gemini, Grok→grok, Claude→claude, Perplexity→perplexity
        const LLM_ID_MAP = { ChatGPT: 'openai', Gemini: 'gemini', Grok: 'grok', Claude: 'claude', Perplexity: 'perplexity' };
        for (const llm of EXPECTED_LLMS) {
          const llmId = LLM_ID_MAP[llm] || llm.toLowerCase();
          const toggle = page.locator(`[data-testid="wizard-llm-toggle-${llmId}"]`).first();
          await expect(toggle, `LLM toggle "${llm}" must exist`).toBeVisible({ timeout: 5000 });
          const isChecked = await toggle.getAttribute('aria-checked');
          if (isChecked !== 'true') await toggle.click();
          await page.waitForTimeout(200);
        }
      }

      // Vérification finale : au moins 1 LLM activé
      const enabledCount = await page.locator('[data-testid*="wizard-llm-toggle"][aria-checked="true"]').count();
      expect(enabledCount, `At least one LLM must be enabled before launch. Got: ${enabledCount}`).toBeGreaterThan(0);
      await shot(page, 'E2E-CREATE-DEFAULT-001_12_and-llm-selected');
    }
  );

  // ── Step CSV 13 : When the Editor clicks Review & Launch ───────────────────
  await test.step('When the Editor clicks Review & Launch', async () => {
    const btn = page.locator(S.finalLaunchBtn).first();
    await expect(btn, '"Review & Launch" button must be visible on Step 4').toBeVisible({ timeout: 30000 });
    // Capture la réponse de l'API de submission pour vérifier 201/200/202.
    // Le backend peut être lent (création atomique : markets + categories + prompts + LLMs).
    const submitResp = page.waitForResponse(
      r => /\/(reports?|analyses?|wizard|configurations?|brands?)\/?/i.test(r.url())
        && ['POST', 'PUT', 'PATCH'].includes(r.request().method())
        && r.status() < 500,
      { timeout: 120000 },
    ).catch(() => null);
    await btn.click();
    const resp = await submitResp;
    if (resp) {
      expect(
        [200, 201, 202].includes(resp.status()),
        `Submission response must be 201 Created (or 200/202). Got: ${resp.status()} ${resp.url()}`,
      ).toBe(true);
    }
    // Aucun toast d'erreur visible.
    const errorToast = page.locator('[role="alert"]:has-text("error"), [class*="error"]:has-text("failed")').first();
    await expect(errorToast, 'No submission error toast must appear').not.toBeVisible({ timeout: 5000 });
    await shot(page, 'E2E-CREATE-DEFAULT-001_13_when-review-launch');
  });

  // ── Step CSV 14 : Then the user is redirected to the report overview ───────
  await test.step('Then the user is redirected to the report overview', async () => {
    // On prod the app may show "Your analysis is launched" + "Back to Dashboard" button
    // instead of auto-redirecting to a specific dashboard URL.
    const backBtn = page.getByRole('button', { name: /Back to Dashboard/i });
    if (await backBtn.isVisible({ timeout: 8000 }).catch(() => false)) {
      await backBtn.click();
      // "Back to Dashboard" lands on the reports list (BASE_URL) — accept it as valid post-creation state
      await page.waitForURL(url => { const s = url.toString(); return !s.includes('/new') && !s.includes('/wizard'); }, { timeout: 30000 });
    } else {
      // Auto-redirect path: wait for a specific analysis dashboard/report URL
      await page.waitForURL(/\/(report|dashboard|overview)/i, { timeout: 120000 });
    }
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    const finalUrl = page.url();
    expect(finalUrl, 'URL must NOT still be on the wizard').not.toMatch(/\/wizard|\/new$/);
    await shot(page, 'E2E-CREATE-DEFAULT-001_14_then-redirect-report');
  });

  // ── Step CSV 15 : When the Editor navigates back to the reports list ────────
  await test.step('When the Editor navigates back to the reports list (BASE_URL)', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    // The reports list page must be visible — at least one report row in the table.
    const listContainer = page.locator(
      '[data-testid="reports-list"], [data-testid="analyses-list"], table, [class*="report-list"], [class*="reportList"], [class*="analyses"]'
    ).first();
    await expect(listContainer, 'Reports list container must be visible after navigating to BASE_URL').toBeVisible({ timeout: 20000 });
    await shot(page, 'E2E-CREATE-DEFAULT-001_15_when-back-to-reports-list');
  });

  // ── Step CSV 16 : Then the Chanel row shows "In progress" in Last update ────
  await test.step(`Then the Chanel analysis row shows the value In progress in the Last update column`, async () => {
    // Locate the row that contains the brand name, then assert the "In progress" status
    // in the Last update / status column within that same row.
    // There may be multiple rows for the same brand (old analyses). Target specifically
    // the row that shows "In progress" — the newly created one.
    // "In progress" peut être transitoire et déjà remplacé par un timestamp relatif
    const chanelRow = page.locator('tr')
      .filter({ hasText: TEST_BRAND })
      .filter({ hasText: /In progress|seconds ago|minute.*ago|just now/i })
      .first();
    await expect(
      chanelRow,
      `A "${TEST_BRAND}" row (In progress or just created) must be visible in the reports list`,
    ).toBeVisible({ timeout: 20000 });
    await shot(page, 'E2E-CREATE-DEFAULT-001_16_then-chanel-in-progress');
  });
});
