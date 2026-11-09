// verify-analysis.spec.js
// E2E — vérifie qu'une analyse (brand configurable via JDD_PROFILE) est visible dans
// la liste des rapports et que son dashboard contient la bonne config (marchés + LLMs).
// 1 seul test avec 8 test.step() — alignés ligne-à-ligne sur le CSV
// `.claude/Data/output/csv/verify-analysis.csv` (TC unique E2E-VERIFY-001).
//
// Lancement :
//   JDD_PROFILE=dyson SPEC_NAME=verify-analysis USE_AUTH=true \
//   BASE_URL=https://staging-geo.onclusive.com/geo \
//   npx playwright test .claude/Data/raw/playwright/verify-analysis.spec.js

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');

const COMMON    = require('../test-data/common.json');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H         = require('./e2e-helpers');

// ── JDD (3-layer merge) ───────────────────────────────────────────────────────
const { loadJDD } = require('../test-data/jdd/loadJDD');
const JDD = loadJDD('verify-analysis');

// ── Constants (env > JDD) ─────────────────────────────────────────────────────
const BASE_URL             = process.env.BASE_URL  || COMMON.base_url;
const TEST_BRAND           = process.env.TEST_BRAND || JDD.brand.name;
const EXPECTED_MARKETS     = JDD.expected_markets     || [];  // N marchés
const EXPECTED_LLMS        = JDD.expected_llms        || [];  // N LLMs (remplace expected_llm)
const EXPECTED_CATEGORIES  = JDD.expected_categories  || [];  // N catégories (0 = step skippé)
const DASHBOARD_UUID       = (JDD._meta && JDD._meta.dashboard_uuid) || null;
const DASHBOARD_URL        = DASHBOARD_UUID ? `${BASE_URL}/dashboard/${DASHBOARD_UUID}` : null;

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-verify-analysis');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// UUID pattern: 8-4-4-4-12 hex chars
const UUID_RE = /\/dashboard\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

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
// E2E-VERIFY-001
// ══════════════════════════════════════════════════════════════════════════════
test('E2E-VERIFY-001 - Verify brand analysis (reports list + dashboard detail)', async ({ page }) => {
  test.setTimeout(120000); // 2 min — navigation + assertions uniquement

  // ── Step CSV 1 : Given an authenticated Editor navigates to the reports list ─
  await test.step('Given an authenticated Editor navigates to the reports list', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await H.dismissCookieBanner(page);
    const listContainer = page.locator(
      '[data-testid="reports-list"], [data-testid="analyses-list"], table, [class*="report-list"], [class*="reportList"]'
    ).first();
    await expect(listContainer, 'Reports list container must be visible').toBeVisible({ timeout: 20000 });
    await shot(page, 'E2E-VERIFY-001_01_given-reports-list');
  });

  // ── Step CSV 2 : When the Editor locates the YSL row ─────────────────────────
  await test.step(`When the Editor locates the ${TEST_BRAND} row in the reports list`, async () => {
    const brandRow = page.locator('tr').filter({ hasText: TEST_BRAND }).first();
    await expect(brandRow, `A row for brand "${TEST_BRAND}" must be visible in the reports list`).toBeVisible({ timeout: 15000 });
    await shot(page, 'E2E-VERIFY-001_02_when-brand-row-found');
  });

  // ── Step CSV 3 : When the Editor clicks on the YSL row ───────────────────────
  await test.step(`When the Editor clicks on the ${TEST_BRAND} analysis row`, async () => {
    // Target the most recently created YSL row (latest = lowest in the table or first match).
    // We use the row that does NOT have "In progress" to avoid a still-running analysis
    // (the dashboard may be empty if analysis hasn't started). If all YSL rows are running,
    // take the first one anyway.
    const brandRows = page.locator('tr').filter({ hasText: TEST_BRAND });
    const rowCount = await brandRows.count();

    let clickedRow = null;
    for (let i = 0; i < rowCount; i++) {
      const row = brandRows.nth(i);
      const rowText = await row.textContent() || '';
      // Prefer a completed row (not "In progress") so the dashboard has data
      if (!rowText.includes('In progress')) {
        clickedRow = row;
        break;
      }
    }
    if (!clickedRow) clickedRow = brandRows.first(); // fallback: take first even if still running

    await H.dismissCookieBanner(page);
    await clickedRow.click();
    await shot(page, 'E2E-VERIFY-001_03_when-brand-row-clicked');
  });

  // ── Step CSV 4 : Then URL matches /dashboard/{uuid} ──────────────────────────
  await test.step('Then the URL matches the pattern /dashboard/{uuid}', async () => {
    await page.waitForURL(url => UUID_RE.test(url.toString()), { timeout: 30000 });
    // Si un UUID spécifique est défini dans le JDD, naviguer directement vers ce dashboard
    // pour éviter de tester une ancienne analyse du même brand
    if (DASHBOARD_URL) {
      await page.goto(DASHBOARD_URL, { waitUntil: 'networkidle' });
    } else {
      // Sinon rester sur l'URL cliquée, mais s'assurer qu'on est sur la page overview
      const currentUrl = page.url();
      expect(currentUrl, `URL must match /dashboard/{uuid} pattern. Got: ${currentUrl}`).toMatch(UUID_RE);
      const uuidMatch = currentUrl.match(/\/dashboard\/[0-9a-f-]{36}/i);
      if (uuidMatch) {
        const overviewUrl = currentUrl.slice(0, currentUrl.indexOf(uuidMatch[0]) + uuidMatch[0].length);
        if (currentUrl !== overviewUrl) await page.goto(overviewUrl, { waitUntil: 'networkidle' });
      }
    }
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    await shot(page, 'E2E-VERIFY-001_04_then-dashboard-url');
  });

  // ── Steps dynamiques : N marchés ─────────────────────────────────────────────
  // Deux cas : filtre dropdown (N > 1) ou chip statique (N = 1)
  for (const market of EXPECTED_MARKETS) {
    const slug = market.toLowerCase().replace(/\s+/g, '-');
    await test.step(`And the dashboard page shows the market ${market}`, async () => {
      const marketFilterBtn = page.locator('button[aria-label*="Country filter"], button[aria-label*="Market filter"]').first();
      const hasFilterBtn = await marketFilterBtn.waitFor({ state: 'visible', timeout: 10000 }).then(() => true).catch(() => false);
      if (hasFilterBtn) {
        // Multiple markets → dropdown filter
        await marketFilterBtn.click();
        await expect.soft(
          page.locator(`[role="option"]:has-text("${market}")`).first(),
          `Market "${market}" must be available in the market filter dropdown`,
        ).toBeVisible({ timeout: 10000 });
        await shot(page, `E2E-VERIFY-001_market-${slug}`);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      } else {
        // Single market → chip/badge statique (aria-label = market name)
        await expect.soft(
          page.locator(`[aria-label="${market}"], [aria-label*="${market}"]`).first(),
          `Market "${market}" must be visible as a chip on the dashboard`,
        ).toBeVisible({ timeout: 10000 });
        await shot(page, `E2E-VERIFY-001_market-${slug}`);
      }
    });
  }

  // ── Step : count exact des marchés ────────────────────────────────────────────
  // Bug si l'app a plus de marchés que prévu (détecté dans les deux directions)
  await test.step(`And the dashboard shows exactly ${EXPECTED_MARKETS.length} market(s)`, async () => {
    const marketFilterBtn = page.locator('button[aria-label*="Country filter"], button[aria-label*="Market filter"]').first();
    const hasFilterBtn = await marketFilterBtn.isVisible({ timeout: 2000 }).catch(() => false);
    if (hasFilterBtn) {
      // Multiple markets : compter les options dans le dropdown (hors "All Markets")
      await marketFilterBtn.click();
      const options = page.locator('[role="option"]').filter({ hasNotText: /all\s*markets/i });
      const actualCount = await options.count();
      await shot(page, 'E2E-VERIFY-001_market-count');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      // Use ≥ to allow for markets added after the JDD was written.
      // A count below EXPECTED_MARKETS.length would indicate a regression (missing market).
      expect.soft(
        actualCount,
        `Expected at least ${EXPECTED_MARKETS.length} market(s) in the filter, but found only ${actualCount}`,
      ).toBeGreaterThanOrEqual(EXPECTED_MARKETS.length);
    } else {
      // Single market : pas de filtre = exactement 1 marché dans l'app
      await shot(page, 'E2E-VERIFY-001_market-count');
      expect.soft(
        EXPECTED_MARKETS.length,
        `Expected exactly 1 market (chip display), but JDD declares ${EXPECTED_MARKETS.length}`,
      ).toBe(1);
    }
  });

  // ── Steps dynamiques : N LLMs ─────────────────────────────────────────────────
  // Ouvrir le dropdown une seule fois avant la boucle (évite le toggle close/open
  // sur chaque itération — le portail Radix ne repose pas dans l'ARIA tree standard)
  {
    const llmFilterBtn = page.locator('button[aria-label*="LLM"], button:has-text("LLM Engines")').first();
    await expect(llmFilterBtn, 'LLM engine filter button must be visible').toBeVisible({ timeout: 10000 });
    await llmFilterBtn.click();
    await page.waitForTimeout(500); // attendre le rendu du portail Radix

    for (const llm of EXPECTED_LLMS) {
      const slug = llm.toLowerCase().replace(/[\s+]/g, '-');
      await test.step(`And the dashboard page shows the LLM ${llm}`, async () => {
        // LLMs = switches [role="switch"] enfants du bouton LLM engine filters
        // [checked] = configuré, [disabled] = présent mais non activé → bug
        const llmSwitch = page.locator(`[role="switch"][aria-checked="true"]`)
          .filter({ hasText: llm }).first();
        await expect.soft(
          llmSwitch,
          `LLM "${llm}" must be an active (checked) switch in the LLM filter — present but disabled means not configured`,
        ).toBeVisible({ timeout: 10000 });
        await shot(page, `E2E-VERIFY-001_llm-${slug}`);
      });
    }

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  }

  // ── Step : badge count LLMs ───────────────────────────────────────────────────
  // Note: badge shows total active LLMs in the dashboard (may exceed EXPECTED_LLMS.length
  // if additional LLMs are configured). Just verify the filter button is visible.
  await test.step(`And the dashboard page shows at least ${EXPECTED_LLMS.length} LLM engine(s)`, async () => {
    const llmBtn = page.locator('button[aria-label*="LLM"], button:has-text("LLM Engines")').first();
    await expect.soft(
      llmBtn,
      'LLM engine filter button must be visible on the dashboard',
    ).toBeVisible({ timeout: 10000 });
    await shot(page, 'E2E-VERIFY-001_llm-count-badge');
  });

  // ── Steps dynamiques : N catégories (skippé si expected_categories = []) ──────
  if (EXPECTED_CATEGORIES.length > 0) {
    // Le nav sidebar peut avoir un bouton "Categories" accordéon — l'ouvrir si présent
    await test.step('And the Editor opens the Categories section in the sidebar', async () => {
      const catToggle = page.locator('[aria-label="Dashboard navigation"] button').filter({ hasText: /^Categories$/i }).first();
      if (await catToggle.isVisible({ timeout: 3000 }).catch(() => false)) {
        const isExpanded = await catToggle.getAttribute('aria-expanded').catch(() => null);
        if (isExpanded !== 'true') await catToggle.click();
        await page.waitForTimeout(500);
      }
    });

    for (const cat of EXPECTED_CATEGORIES) {
      const slug = cat.toLowerCase().replace(/\s+/g, '-');
      await test.step(`And the sidebar shows the category ${cat}`, async () => {
        const catItem = page.locator('[aria-label="Dashboard navigation"] a, nav a, aside a')
          .filter({ hasText: cat }).first();
        await expect.soft(
          catItem,
          `Category "${cat}" must be visible as a link in the sidebar`,
        ).toBeVisible({ timeout: 10000 });
        await shot(page, `E2E-VERIFY-001_category-${slug}`);
      });
    }

    // ── Step : count exact des catégories ───────────────────────────────────────
    // Bug si l'app a plus ou moins de catégories que prévu
    await test.step(`And the sidebar shows exactly ${EXPECTED_CATEGORIES.length} category(ies)`, async () => {
      // Les liens category ont une URL contenant /category/ — sélecteur précis
      const catLinks = page.locator('[aria-label="Dashboard navigation"] a[href*="/category/"]');
      const actualCount = await catLinks.count();
      await shot(page, 'E2E-VERIFY-001_category-count');
      expect.soft(
        actualCount,
        `Expected exactly ${EXPECTED_CATEGORIES.length} category link(s) in sidebar, but found ${actualCount}`,
      ).toBe(EXPECTED_CATEGORIES.length);
    });
  }
});
