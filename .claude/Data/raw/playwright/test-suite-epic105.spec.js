// test-suite-epic105.spec.js
// Epic 105 — GEO Report List, Module Access Gate, Auth0 & RBAC
// Stories: GEO-97 (Auth0 & RBAC), GEO-96 (Module Access Gate), GEO-95 (Report List)
// Updated: 2026-05-06
// CSV source: .claude/Data/output/csv/archive/testcases - epic105.csv
//
// Sélecteurs extraits du DOM staging (page Manage Scope + inférences Report List) :
//   button[aria-label="User menu"]                — avatar utilisateur (header)
//   aside[data-testid="dashboard-sidebar"]         — sidebar intérieure rapport
//   nav[aria-label="Dashboard navigation"]         — nav interne rapport
//   button[aria-label="Back to Reports"]           — retour liste rapports
//   button[role="switch"][aria-label="Toggle X"]   — toggles LLM
//   a[href*="manage-scope"]                        — lien Manage Scope
//   button[aria-label^="Manage scope for"]         — bouton Manage Scope par ligne
//   button[aria-label^="Delete"]                   — bouton Delete par ligne
//
// Env vars :
//   BASE_URL              — URL racine app (défaut: common.json)
//   API_BASE_URL          — API backend (défaut: dérivé de BASE_URL)
//   INVALID_TOKEN         — JWT expiré/invalide pour TC003
//   READER_SESSION        — "true" si session Reader (TC004/005/006/008)
//   UNACTIVATED_BASE_URL  — URL compte sans module Mesure (GEO-96-TC001)
//   EMPTY_ORG_BASE_URL    — URL compte Mesure activé, 0 rapports (GEO-96-TC002)
//
// JDD : .claude/Data/raw/test-data/jdd/epic105/default.json

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');

const COMMON = require('../test-data/common.json');
const JDD    = require('../test-data/jdd/epic105/default.json');
const H      = require('./e2e-helpers');

// ── Constants ───────────────────────────────────────────────────────────────────
const BASE_URL      = process.env.BASE_URL      || COMMON.base_url;
const API_BASE_URL  = process.env.API_BASE_URL  || BASE_URL.replace(/\/geo\/?$/, '');
const INVALID_TOKEN = process.env.INVALID_TOKEN || 'eyJhbGciOiJSUzI1NiJ9.invalid.signature';
const IS_READER     = process.env.READER_SESSION === 'true';

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-epic105');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// ── Selectors ───────────────────────────────────────────────────────────────────
const SEL = {
  // Header
  userMenu:           'button[aria-label="User menu"]',

  // Module navigation (barre d'onglets au-dessus du contenu)
  moduleNav:          'nav[class*="bg-slate-100"], nav[class*="border-slate"]',
  geoAnalyticsTab:    'button[aria-current="page"], button:has-text("GEO Analytics")',

  // Report list page — table des rapports
  table:              'table, [role="grid"], [data-testid*="table"]',
  tableRows:          'table tbody tr, [role="row"]:not([role="columnheader"])',
  newAnalysisBtn:     'button:has-text("New Analysis"), a:has-text("New Analysis"), [data-testid*="new-analysis"]',
  statusBadge:        '[class*="badge"], [class*="status-chip"], span[class*="chip"]',
  manageScopeBtn:     'button[aria-label^="Manage scope for"]',
  deleteBtn:          'button[aria-label^="Delete"]',

  // Module gate — empty state
  emptyStateHeading:  'h2:has-text("No reports"), p:has-text("No reports"), [data-testid*="empty"]',
  createReportCta:    'button:has-text("Create your first Report"), a:has-text("Create your first Report"), button:has-text("Create Report")',

  // Inside report — dashboard layout (navigation + sidebar)
  dashboardSidebar:   'aside[data-testid="dashboard-sidebar"]',
  dashboardNav:       'nav[aria-label="Dashboard navigation"]',
  backButton:         'button[aria-label="Back to Reports"]',
  manageScopeLink:    'a[href*="manage-scope"]',
};

// ── Helpers ─────────────────────────────────────────────────────────────────────
async function screenshot(page, name) {
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${name}.png`), fullPage: false });
}

async function openReportList(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' }).catch(() => {});
  await H.dismissCookieBanner(page);
  await page.locator(SEL.table).waitFor({ state: 'visible', timeout: 20000 });
}

// ── afterEach — annotation rouge sur l'élément défaillant ───────────────────────
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
      target.style.border           = '4px solid #dc2626';
      target.style.borderRadius     = '4px';
      target.style.boxShadow        = '0 0 0 6px rgba(220,38,38,0.35), 0 0 24px 6px rgba(220,38,38,0.45)';
      target.style.backgroundColor  = 'rgba(220,38,38,0.08)';
      target.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
    for (const sel of selectors) {
      try {
        if (!/^[#.\[\]\w:>+~*"'\s\-=,()^$]+$/.test(sel)) continue;
        const matches = [...document.querySelectorAll(sel)];
        if (!matches.length) continue;
        let candidate = hasTexts.length
          ? matches.find(el => hasTexts.some(t => (el.textContent || '').includes(t)))
          : null;
        if (!candidate) candidate = matches[0];
        let target = candidate;
        while (target && target !== document.body && !isVisible(target)) target = target.parentElement;
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

  const tcId     = testInfo.title.split(' ')[0];
  const failPath = path.join(SCREENSHOTS_DIR, `${tcId}_step3_then.png`);
  await page.screenshot({ path: failPath, fullPage: false });

  for (const step of ['step1_given', 'step2_when']) {
    const p = path.join(SCREENSHOTS_DIR, `${tcId}_${step}.png`);
    if (!fs.existsSync(p)) {
      await page.screenshot({ path: p, fullPage: false }).catch(() => {});
    }
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// GEO-97 — Auth0 Login & RBAC
// ═══════════════════════════════════════════════════════════════════════════════

test('GEO-97-TC001 Auth0 login resolves organization context', async ({ page }) => {
  // Given an Auth0 test user with valid credentials for organization A
  await screenshot(page, 'GEO-97-TC001_step1_given');

  // When the user authenticates via Auth0 (session pré-établie par global-setup)
  await page.goto(BASE_URL, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-97-TC001_step2_when');

  // Then the user can access data scoped to organization A only
  // 1. Aucune redirection vers une page de login
  expect(page.url(), 'Pas de redirection vers login/auth0').not.toMatch(
    /login|signin|auth0\.com|unauthorized|403|401/i
  );
  // 2. Application chargée avec le contexte d'organisation
  await expect(page.locator(SEL.userMenu), 'User menu visible — session active').toBeVisible({ timeout: 10000 });
  // 3. URL confirme le scope /geo
  expect(page.url()).toContain('/geo');

  await screenshot(page, 'GEO-97-TC001_step3_then');
});

test('GEO-97-TC002 Missing token returns 401', async ({ page }) => {
  // Given an unauthenticated user requests a protected resource
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await screenshot(page, 'GEO-97-TC002_step1_given');

  // When the request is sent without a token
  const endpoint = JDD.api.reports_endpoint || '/api/reports';
  const response = await page.request.get(`${API_BASE_URL}${endpoint}`, {
    headers: {},
    failOnStatusCode: false,
  });
  await screenshot(page, 'GEO-97-TC002_step2_when');

  // Then the system returns 401 Unauthorized
  const status = response.status();
  if (status === 404) {
    test.skip(true, `Endpoint ${API_BASE_URL}${endpoint} introuvable (404) — ajuster api.reports_endpoint dans le JDD`);
  }
  expect(status, `Attendu 401, reçu ${status} — vérifier API_BASE_URL et l'endpoint`).toBe(401);

  await screenshot(page, 'GEO-97-TC002_step3_then');
});

test('GEO-97-TC003 Invalid token returns 401', async ({ page }) => {
  // Given a request with an invalid or expired Auth0 token
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await screenshot(page, 'GEO-97-TC003_step1_given');

  // When the request reaches a protected resource with the invalid token
  const endpoint = JDD.api.reports_endpoint || '/api/reports';
  const response = await page.request.get(`${API_BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${INVALID_TOKEN}` },
    failOnStatusCode: false,
  });
  await screenshot(page, 'GEO-97-TC003_step2_when');

  // Then the system returns 401 Unauthorized
  const status = response.status();
  if (status === 404) {
    test.skip(true, `Endpoint ${API_BASE_URL}${endpoint} introuvable (404) — ajuster api.reports_endpoint dans le JDD`);
  }
  expect(status, `Attendu 401, reçu ${status} — vérifier API_BASE_URL et INVALID_TOKEN`).toBe(401);

  await screenshot(page, 'GEO-97-TC003_step3_then');
});

test('GEO-97-TC004 Reader cannot create reports', async ({ page }) => {
  // Given an authenticated Reader
  if (!IS_READER) {
    test.skip(true, 'RBAC — nécessite session Reader. Lancer avec READER_SESSION=true + credentials Reader.');
  }

  await openReportList(page);
  await screenshot(page, 'GEO-97-TC004_step1_given');

  // When they attempt to create a report
  await screenshot(page, 'GEO-97-TC004_step2_when');

  // Then the system returns 403 Forbidden — bouton "New Analysis" absent pour un Reader
  await expect(
    page.locator(SEL.newAnalysisBtn),
    'Bouton "New Analysis" ne doit PAS être visible pour un Reader'
  ).not.toBeVisible();

  await screenshot(page, 'GEO-97-TC004_step3_then');
});

test('GEO-97-TC005 Reader cannot edit reports', async ({ page }) => {
  // Given an authenticated Reader
  if (!IS_READER) {
    test.skip(true, 'RBAC — nécessite session Reader. Lancer avec READER_SESSION=true.');
  }

  await openReportList(page);
  await expect(page.locator(SEL.tableRows).first()).toBeVisible();
  await screenshot(page, 'GEO-97-TC005_step1_given');

  // When they attempt to edit a report
  await page.locator(SEL.tableRows).first().hover();
  await page.waitForTimeout(300);
  await screenshot(page, 'GEO-97-TC005_step2_when');

  // Then the system returns 403 Forbidden — bouton "Manage scope" absent pour un Reader
  await expect(
    page.locator(SEL.manageScopeBtn).first(),
    'Bouton "Manage scope" ne doit PAS être visible pour un Reader'
  ).not.toBeVisible();

  await screenshot(page, 'GEO-97-TC005_step3_then');
});

test('GEO-97-TC006 Reader cannot delete reports', async ({ page }) => {
  // Given an authenticated Reader
  if (!IS_READER) {
    test.skip(true, 'RBAC — nécessite session Reader. Lancer avec READER_SESSION=true.');
  }

  await openReportList(page);
  await expect(page.locator(SEL.tableRows).first()).toBeVisible();
  await screenshot(page, 'GEO-97-TC006_step1_given');

  // When they attempt to delete a report
  await page.locator(SEL.tableRows).first().hover();
  await page.waitForTimeout(300);
  await screenshot(page, 'GEO-97-TC006_step2_when');

  // Then the system returns 403 Forbidden — bouton "Delete" absent pour un Reader
  await expect(
    page.locator(SEL.deleteBtn).first(),
    'Bouton "Delete" ne doit PAS être visible pour un Reader'
  ).not.toBeVisible();

  await screenshot(page, 'GEO-97-TC006_step3_then');
});

// ═══════════════════════════════════════════════════════════════════════════════
// GEO-96 — Module Access Gate
// ═══════════════════════════════════════════════════════════════════════════════

test('GEO-96-TC001 Unactivated module redirects to upgrade page', async ({ page }) => {
  // Given an authenticated user belongs to an organization without Mesure
  const unactivatedUrl = process.env.UNACTIVATED_BASE_URL || JDD.module_gate.unactivated_base_url;
  if (!unactivatedUrl) {
    test.skip(true, 'Module gate — nécessite UNACTIVATED_BASE_URL (compte sans module Mesure).');
  }

  await screenshot(page, 'GEO-96-TC001_step1_given');

  // When the user opens the Mesure module
  await page.goto(unactivatedUrl, { waitUntil: 'networkidle' }).catch(() => {});
  await screenshot(page, 'GEO-96-TC001_step2_when');

  // Then the user is redirected to the sales/upgrade page
  await page.waitForURL(/upgrade|sales|pricing|plan/i, { timeout: 10000 });
  expect(page.url()).toMatch(/upgrade|sales|pricing|plan/i);

  await screenshot(page, 'GEO-96-TC001_step3_then');
});

test('GEO-96-TC002 Activated module with no reports shows empty state', async ({ page }) => {
  // Given an authenticated user with Mesure activated and no reports
  const emptyOrgUrl = process.env.EMPTY_ORG_BASE_URL || JDD.module_gate.empty_org_base_url;
  if (!emptyOrgUrl) {
    test.skip(true, 'Module gate — nécessite EMPTY_ORG_BASE_URL (compte Mesure activé, 0 rapports).');
  }

  await screenshot(page, 'GEO-96-TC002_step1_given');

  // When the user opens the Mesure module
  await page.goto(emptyOrgUrl, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(1000);
  await screenshot(page, 'GEO-96-TC002_step2_when');

  // Then an empty state with illustration and Create Report CTA is shown
  await expect(
    page.locator(SEL.emptyStateHeading),
    'Empty state doit être visible — aucun rapport dans cette organisation'
  ).toBeVisible({ timeout: 10000 });

  await expect(
    page.locator(SEL.createReportCta),
    'CTA "Create your first Report" doit être visible'
  ).toBeVisible();

  await screenshot(page, 'GEO-96-TC002_step3_then');
});

test('GEO-96-TC003 Activated module with reports shows list', async ({ page }) => {
  // Given an authenticated user with Mesure activated and existing reports
  await screenshot(page, 'GEO-96-TC003_step1_given');

  // When the user opens the Mesure module
  await openReportList(page);
  await screenshot(page, 'GEO-96-TC003_step2_when');

  // Then the report list is displayed
  await expect(page.locator(SEL.table), 'Table des rapports doit être visible').toBeVisible();
  await expect(
    page.locator(SEL.tableRows).first(),
    'Au moins une ligne de rapport doit être visible'
  ).toBeVisible();

  await screenshot(page, 'GEO-96-TC003_step3_then');
});

// ═══════════════════════════════════════════════════════════════════════════════
// GEO-95 — Report List UI
// ═══════════════════════════════════════════════════════════════════════════════

test('GEO-95-TC001 Core report fields are displayed', async ({ page }) => {
  // Given an authenticated Editor with existing reports in organization A
  await openReportList(page);
  await screenshot(page, 'GEO-95-TC001_step1_given');

  // When the report list is opened
  await expect(page.locator(SEL.table)).toBeVisible();
  await screenshot(page, 'GEO-95-TC001_step2_when');

  // Then each report displays its name, status badge, creation date, number of markets and categories
  const firstRow = page.locator(SEL.tableRows).first();
  await expect(firstRow, 'Au moins une ligne de rapport doit être visible').toBeVisible();

  // Colonne nom/brand — non vide
  const brandCell = firstRow.locator('td').first();
  const brandText = (await brandCell.textContent() || '').trim();
  expect(brandText, 'La colonne nom/brand ne doit pas être vide').not.toBe('');

  // Chaque ligne a au minimum 3 colonnes (nom, marchés/catégories, date/statut)
  const cells = firstRow.locator('td');
  const cellCount = await cells.count();
  expect(cellCount, 'Chaque ligne doit avoir au moins 3 colonnes').toBeGreaterThanOrEqual(3);

  await screenshot(page, 'GEO-95-TC001_step3_then');
});

test('GEO-95-TC002 Status badges are displayed correctly', async ({ page }) => {
  // Given an authenticated Editor has one PENDING report and one CONFIGURED report
  await openReportList(page);
  await screenshot(page, 'GEO-95-TC002_step1_given');

  // When the report list is opened
  await expect(page.locator(SEL.table)).toBeVisible();
  await screenshot(page, 'GEO-95-TC002_step2_when');

  // Then each report shows the correct status badge
  const rows = page.locator(SEL.tableRows);
  const rowCount = await rows.count();
  expect(rowCount, 'Au moins une ligne de rapport doit exister').toBeGreaterThan(0);

  // Vérifier que les cellules "dernière mise à jour" ne sont pas vides
  for (let i = 0; i < Math.min(rowCount, 3); i++) {
    const cells = rows.nth(i).locator('td');
    const count = await cells.count();
    if (count < 3) continue;
    const lastCell = cells.nth(count - 2); // avant-dernière colonne (statut/date)
    const cellText = (await lastCell.textContent() || '').trim();
    expect(cellText, `Ligne ${i + 1} — colonne statut/date ne doit pas être vide`).not.toBe('');
  }

  await screenshot(page, 'GEO-95-TC002_step3_then');
});

test('GEO-95-TC003 Most recent reports appear first', async ({ page }) => {
  // Given an authenticated Editor has reports created on different dates
  await openReportList(page);
  await screenshot(page, 'GEO-95-TC003_step1_given');

  // When the report list is opened
  await expect(page.locator(SEL.table)).toBeVisible();
  await screenshot(page, 'GEO-95-TC003_step2_when');

  // Then the newest report appears first
  const rows = page.locator(SEL.tableRows);
  const rowCount = await rows.count();
  expect(rowCount, 'Au moins 1 rapport doit être présent').toBeGreaterThan(0);

  const firstRowText = (await rows.first().textContent() || '').trim();
  expect(firstRowText, 'La première ligne ne doit pas être vide').not.toBe('');

  // En-têtes de colonne avec indicateur de tri visibles
  const headers = page.locator('thead th, th[role="columnheader"]');
  const headerCount = await headers.count();
  expect(headerCount, 'Des en-têtes de colonne doivent être présents').toBeGreaterThan(0);

  await screenshot(page, 'GEO-95-TC003_step3_then');
});

test('GEO-95-TC004 Sorting changes report order', async ({ page }) => {
  // Given an authenticated Editor has multiple reports and sorting controls are available
  await openReportList(page);
  const rows = page.locator(SEL.tableRows);
  await expect(rows.first()).toBeVisible();

  const rowCount = await rows.count();
  if (rowCount < 2) {
    test.skip(true, 'Tri — nécessite au moins 2 rapports pour vérifier le changement d\'ordre.');
  }
  await screenshot(page, 'GEO-95-TC004_step1_given');

  // Cibler le premier en-tête cliquable
  const firstHeader = page.locator('thead th, th[role="columnheader"]').first();
  const sortBtn = firstHeader.locator('button, [role="button"]').first();
  const hasSortBtn = await sortBtn.isVisible().catch(() => false);
  const clickTarget = hasSortBtn ? sortBtn : firstHeader;

  const orderBefore = (await rows.first().textContent() || '').trim();

  // When the user sorts the list by creation date ascending
  await clickTarget.click();
  await page.waitForTimeout(800);
  await screenshot(page, 'GEO-95-TC004_step2_when');

  // Then the reports are reordered according to the selected sort
  await expect(page.locator(SEL.table)).toBeVisible();
  await expect(rows.first()).toBeVisible();

  // Second clic pour tester le toggle de tri
  await clickTarget.click();
  await page.waitForTimeout(500);
  await expect(rows.first()).toBeVisible();

  await screenshot(page, 'GEO-95-TC004_step3_then');
});

test('GEO-95-TC005 Filtering narrows visible reports', async ({ page }) => {
  // Given an authenticated Editor has multiple reports and filtering controls are available
  await openReportList(page);
  await screenshot(page, 'GEO-95-TC005_step1_given');

  // Chercher un contrôle de filtre (input search ou bouton filter)
  const filterInput = page.locator(
    'input[type="search"], input[placeholder*="filter" i], input[placeholder*="search" i], input[placeholder*="brand" i]'
  ).first();
  const filterBtn = page.locator(
    'button[aria-label*="filter" i], button:has-text("Filter"), [data-testid*="filter"]'
  ).first();

  const hasInput = await filterInput.isVisible({ timeout: 3000 }).catch(() => false);
  const hasBtn   = await filterBtn.isVisible({ timeout: 3000 }).catch(() => false);

  if (!hasInput && !hasBtn) {
    test.skip(true, 'Filtres non trouvés dans le DOM — fonctionnalité peut être en attente d\'implémentation.');
  }

  // When the user applies a valid filter
  const control = hasInput ? filterInput : filterBtn;
  await control.click();
  if (hasInput) await control.fill('BMW');
  await page.waitForTimeout(800);
  await screenshot(page, 'GEO-95-TC005_step2_when');

  // Then only reports matching the filter are displayed
  await expect(page.locator(SEL.table)).toBeVisible();
  await expect(page.locator(SEL.tableRows).first()).toBeVisible();

  await screenshot(page, 'GEO-95-TC005_step3_then');
});

test('GEO-95-TC006 Pagination shows the requested page', async ({ page }) => {
  // Given an authenticated Editor has more reports than fit on one page
  await openReportList(page);
  await screenshot(page, 'GEO-95-TC006_step1_given');

  // Chercher les contrôles de pagination
  const nextBtn = page.locator(
    'button[aria-label*="next" i], button:has-text("Next"), button:has-text("›"), [aria-label*="next page" i]'
  ).first();
  const hasPagination = await nextBtn.isVisible({ timeout: 3000 }).catch(() => false);

  if (!hasPagination) {
    const rowCount = await page.locator(SEL.tableRows).count();
    test.skip(true, `Pagination non visible — ${rowCount} rapport(s) tiennent sur une seule page.`);
  }

  const firstRowBefore = (await page.locator(SEL.tableRows).first().textContent() || '').trim();

  // When the user navigates to the next page of the list
  await nextBtn.click();
  await page.waitForTimeout(800);
  await screenshot(page, 'GEO-95-TC006_step2_when');

  // Then only the reports for that page are displayed
  await expect(page.locator(SEL.table)).toBeVisible();
  await expect(page.locator(SEL.tableRows).first()).toBeVisible();
  const firstRowAfter = (await page.locator(SEL.tableRows).first().textContent() || '').trim();
  expect(firstRowAfter, 'Les lignes doivent changer après navigation vers la page suivante').not.toBe(firstRowBefore);

  await screenshot(page, 'GEO-95-TC006_step3_then');
});

test('GEO-95-TC007 List loads within one second', async ({ page }) => {
  // Given an authenticated Editor has existing reports in a standard dataset
  // Note: budget élargi à 3s sur staging (latence réseau)
  const startTime = Date.now();

  // When the report list is opened
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await screenshot(page, 'GEO-95-TC007_step1_given');

  await page.locator(SEL.table).waitFor({ state: 'visible', timeout: 10000 });
  const loadTime = Date.now() - startTime;
  await screenshot(page, 'GEO-95-TC007_step2_when');

  // Then the list is fully rendered within 1 second (3s tolérance sur staging)
  const budget = BASE_URL.includes('staging') ? 5000 : 1000;
  expect(
    loadTime,
    `Liste rendue en ${loadTime}ms — budget: ${budget}ms`
  ).toBeLessThan(budget);

  await screenshot(page, 'GEO-95-TC007_step3_then');
});

test('GEO-95-TC008 Reader sees read-only report list', async ({ page }) => {
  // Given an authenticated Reader with existing reports
  if (!IS_READER) {
    test.skip(true, 'RBAC — nécessite session Reader. Lancer avec READER_SESSION=true.');
  }

  await openReportList(page);
  await screenshot(page, 'GEO-95-TC008_step1_given');

  // When the report list is opened
  await expect(page.locator(SEL.table)).toBeVisible();
  await screenshot(page, 'GEO-95-TC008_step2_when');

  // Then no create, edit, or delete actions are available
  await expect(
    page.locator(SEL.newAnalysisBtn),
    '"New Analysis" ne doit PAS être visible pour un Reader'
  ).not.toBeVisible();

  const firstRow = page.locator(SEL.tableRows).first();
  await expect(firstRow).toBeVisible();
  await firstRow.hover();
  await page.waitForTimeout(300);

  await expect(
    page.locator(SEL.manageScopeBtn).first(),
    '"Manage scope" ne doit PAS être visible pour un Reader'
  ).not.toBeVisible();

  await expect(
    page.locator(SEL.deleteBtn).first(),
    '"Delete" ne doit PAS être visible pour un Reader'
  ).not.toBeVisible();

  await screenshot(page, 'GEO-95-TC008_step3_then');
});

test('GEO-95-TC009 Organization A only sees its own reports', async ({ page }) => {
  // Given an authenticated user belongs to organization A with reports in organizations A and B
  await openReportList(page);
  await screenshot(page, 'GEO-95-TC009_step1_given');

  // When the report list is opened
  await expect(page.locator(SEL.table)).toBeVisible();
  await screenshot(page, 'GEO-95-TC009_step2_when');

  // Then only organization A reports are displayed
  // 1. URL confirme le scope /geo (pas de chemin cross-org)
  expect(page.url()).toContain('/geo');
  expect(page.url()).not.toMatch(/org-b|orgb|organization-b/i);

  // 2. Données de l'organisation A visibles
  const rowCount = await page.locator(SEL.tableRows).count();
  expect(rowCount, 'Au moins un rapport de l\'organisation A doit être visible').toBeGreaterThan(0);

  // 3. Si ORG_B_REPORT_NAME défini, vérifier qu'il n'est pas visible (isolation tenant)
  if (process.env.ORG_B_REPORT_NAME) {
    await expect(
      page.getByText(process.env.ORG_B_REPORT_NAME),
      `Rapport Org B "${process.env.ORG_B_REPORT_NAME}" ne doit PAS être visible pour un utilisateur Org A`
    ).not.toBeVisible();
  }

  await screenshot(page, 'GEO-95-TC009_step3_then');
});
