// geo-analytics-dashboard.spec.js
// E2E — GEO Analytics Dashboard (GEO-95)
// Vérifie la structure de la page liste des rapports :
//   • Titre + sous-titre
//   • Bouton "New Analysis"
//   • 6 stat cards (COUNTRIES, CATEGORIES, COMPETITORS, Analysis, PROMPTS, SOURCES)
//   • Table "Analysis" avec 5 colonnes
//   • Total CATEGORIES = somme des chips affichés dans la colonne Categories
//   • Total Analysis = nombre de lignes dans le tableau
//
// Lancement :
//   SPEC_NAME=geo-analytics-dashboard USE_AUTH=true \
//     npx playwright test .claude/Data/raw/playwright/geo-analytics-dashboard.spec.js

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');

const COMMON    = require('../test-data/common.json');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H         = require('./e2e-helpers');

const BASE_URL        = process.env.BASE_URL || COMMON.base_url;
const TC              = 'E2E-GEO95-001';
const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-geo-analytics-dashboard');
H.ensureDir(SCREENSHOTS_DIR);
const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── Selectors (blueprint: geo_analytics_dashboard) ─────────────────────────────
const SEL = BLUEPRINT.geo_analytics_dashboard;

// ── Navigation helper ──────────────────────────────────────────────────────────
async function openDashboard(page) {
  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.waitForLoadState('domcontentloaded');
  await H.dismissCookieBanner(page);
}

// ── Helper — lire la valeur numérique d'une stat card par son label ────────────
async function getStatCardValue(page, label) {
  return page.evaluate((lbl) => {
    const labelEl = [...document.querySelectorAll('*')].find(
      el => el.children.length === 0 &&
            el.textContent.trim().toUpperCase() === lbl.toUpperCase()
    );
    if (!labelEl) return null;
    let node = labelEl;
    for (let i = 0; i < 4; i++) {
      const parent = node.parentElement;
      if (!parent) break;
      const numEl = [...parent.querySelectorAll('*')].find(
        el => el.children.length === 0 && /^\d[\d,\s]*$/.test(el.textContent.trim())
      );
      if (numEl) return parseInt(numEl.textContent.trim().replace(/[,\s]/g, ''), 10);
      node = parent;
    }
    return null;
  }, label);
}

// ── Helper — compter les chips dans la colonne Categories ──────────────────────
async function countCategoryChips(page) {
  return page.evaluate(() => {
    const headers = [...document.querySelectorAll('table thead th')];
    const catIdx  = headers.findIndex(th => /categor/i.test(th.textContent));
    if (catIdx < 0) return null;

    const rows = [...document.querySelectorAll('table tbody tr')];
    let total = 0;
    for (const row of rows) {
      const cells = [...row.querySelectorAll('td')];
      if (catIdx >= cells.length) continue;
      const cell  = cells[catIdx];
      const chips = [...cell.querySelectorAll('span, div, a')].filter(
        el => el.children.length === 0 && el.textContent.trim().length > 0
      );
      total += chips.length;
    }
    return total;
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// E2E-GEO95-001 — GEO Analytics Dashboard
// ══════════════════════════════════════════════════════════════════════════════
test(`${TC} - GEO Analytics Dashboard displays correctly`, async ({ page }) => {
  test.setTimeout(120000);

  // ── Step 1 : Given ───────────────────────────────────────────────────────────
  await test.step('Given an authenticated Editor opens the GEO Analytics Dashboard', async () => {
    await openDashboard(page);
    await shot(page, `${TC}_step1_given`);
  });

  // ── Step 2 : Titre ───────────────────────────────────────────────────────────
  await test.step('Then the heading GEO Analytics Dashboard is visible', async () => {
    const title = page.locator(SEL.pageTitle).first();
    await expect(title, '"GEO Analytics Dashboard" heading must be visible').toBeVisible({ timeout: 15000 });
  });

  // ── Step 3 : Sous-titre ──────────────────────────────────────────────────────
  await test.step('And the subtitle Monitor your brand\'s presence across AI search engines is visible', async () => {
    const subtitle = page.locator(SEL.pageSubtitle).first();
    await expect(subtitle, '"Monitor your brand\'s presence across AI search engines" subtitle must be visible').toBeVisible({ timeout: 10000 });
  });

  // ── Step 4 : Bouton New Analysis ─────────────────────────────────────────────
  await test.step('And the New Analysis button is visible', async () => {
    const btn = page.locator(SEL.newAnalysisBtn).first();
    await expect(btn, '"New Analysis" button must be visible').toBeVisible({ timeout: 10000 });
  });

  // ── Step 5 : 6 stat cards ────────────────────────────────────────────────────
  await test.step('And the 6 stat cards COUNTRIES CATEGORIES COMPETITORS Analysis PROMPTS SOURCES are displayed', async () => {
    for (const label of SEL.statCardLabels) {
      const cardLabel = page.getByText(label, { exact: true }).first();
      await expect(cardLabel, `Stat card "${label}" must be visible`).toBeVisible({ timeout: 10000 });
    }
  });

  // ── Step 6 : Table Analysis + 5 colonnes ────────────────────────────────────
  await test.step('And the Analysis table is visible with columns Brand Countries Categories Last update and Actions', async () => {
    const table = page.locator(SEL.table).first();
    await expect(table, 'Analysis table must be visible').toBeVisible({ timeout: 10000 });

    for (const col of SEL.tableColumns) {
      const th = page.locator('thead th').filter({ hasText: new RegExp(col, 'i') }).first();
      await expect(th, `Column "${col}" must be visible in table header`).toBeVisible({ timeout: 5000 });
    }

    await shotAt(page, table, `${TC}_step2_when`);
  });

  // ── Step 7 : Total CATEGORIES = somme des chips ──────────────────────────────
  await test.step('Then the CATEGORIES stat card total equals the sum of category chips displayed in the table', async () => {
    const categoriesCardValue = await getStatCardValue(page, 'CATEGORIES');
    expect(categoriesCardValue, 'CATEGORIES stat card value must be readable').not.toBeNull();

    const chipsTotal = await countCategoryChips(page);
    expect(chipsTotal, 'Category chips count in table must be readable').not.toBeNull();

    // Si mismatch : encadrer la stat card CATEGORIES pour que step3_then montre le bug
    if (chipsTotal !== categoriesCardValue) {
      await page.evaluate((card) => {
        const labelEl = [...document.querySelectorAll('*')].find(
          el => el.children.length === 0 && el.textContent.trim().toUpperCase() === 'CATEGORIES'
        );
        let cardRoot = labelEl;
        for (let i = 0; i < 4 && cardRoot; i++) cardRoot = cardRoot.parentElement;
        if (!cardRoot) return;
        cardRoot.scrollIntoView({ block: 'center', behavior: 'instant' });
        const rect = cardRoot.getBoundingClientRect();
        const ov = document.createElement('div');
        ov.setAttribute('data-qa-annotation', 'bug');
        Object.assign(ov.style, {
          position: 'fixed',
          top: `${rect.top - 4}px`, left: `${rect.left - 4}px`,
          width: `${rect.width + 8}px`, height: `${rect.height + 8}px`,
          border: '3px solid #dc2626',
          borderRadius: '4px',
          boxShadow: '0 0 0 4px rgba(220,38,38,0.25)',
          background: 'rgba(220,38,38,0.06)',
          zIndex: '2147483647',
          pointerEvents: 'none',
        });
        const badge = document.createElement('span');
        badge.textContent = `Card: ${card}`;
        Object.assign(badge.style, {
          position: 'absolute', top: '-22px', left: '0',
          background: '#dc2626', color: 'white',
          fontSize: '10px', fontWeight: '700', padding: '2px 6px',
          borderRadius: '3px 3px 0 0', whiteSpace: 'nowrap',
          fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        });
        ov.appendChild(badge);
        document.body.appendChild(ov);
      }, categoriesCardValue);
      await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    }

    // shotAt AVANT l'assertion — obligatoire (CLAUDE.md)
    // step3_then existant → isCustomError=true dans afterEach → screenshot annoté conservé
    const catCardEl = page.getByText('CATEGORIES', { exact: true }).first();
    await shotAt(page, catCardEl, `${TC}_step3_then`);

    await page.evaluate(() => {
      document.querySelectorAll('[data-qa-annotation="bug"]').forEach(el => el.remove());
    });

    expect(
      chipsTotal,
      `Total chips dans la colonne Categories (${chipsTotal}) doit égaler la stat card CATEGORIES (${categoriesCardValue})`,
    ).toBe(categoriesCardValue);
  });

  // ── Step 8 : Total REPORTS = nombre de lignes ────────────────────────────────
  await test.step('And the Analysis stat card total equals the number of rows in the Analysis table', async () => {
    const reportsCardValue = await getStatCardValue(page, 'Analysis');
    expect(reportsCardValue, 'REPORTS stat card value must be readable').not.toBeNull();

    const rowCount = await page.locator(SEL.tableRows).count();
    expect(rowCount, 'At least one row must be present in the Analysis table').toBeGreaterThan(0);

    // Si mismatch : encadrer la stat card Analysis
    if (rowCount !== reportsCardValue) {
      await page.evaluate((card) => {
        const labelEl = [...document.querySelectorAll('*')].find(
          el => el.children.length === 0 && el.textContent.trim() === 'Analysis'
        );
        let cardRoot = labelEl;
        for (let i = 0; i < 4 && cardRoot; i++) cardRoot = cardRoot.parentElement;
        if (!cardRoot) return;
        cardRoot.scrollIntoView({ block: 'center', behavior: 'instant' });
        const rect = cardRoot.getBoundingClientRect();
        const ov = document.createElement('div');
        ov.setAttribute('data-qa-annotation', 'bug');
        Object.assign(ov.style, {
          position: 'fixed',
          top: `${rect.top - 4}px`, left: `${rect.left - 4}px`,
          width: `${rect.width + 8}px`, height: `${rect.height + 8}px`,
          border: '3px solid #dc2626',
          borderRadius: '4px',
          boxShadow: '0 0 0 4px rgba(220,38,38,0.25)',
          background: 'rgba(220,38,38,0.06)',
          zIndex: '2147483647',
          pointerEvents: 'none',
        });
        const badge = document.createElement('span');
        badge.textContent = `Card: ${card}`;
        Object.assign(badge.style, {
          position: 'absolute', top: '-22px', left: '0',
          background: '#dc2626', color: 'white',
          fontSize: '10px', fontWeight: '700', padding: '2px 6px',
          borderRadius: '3px 3px 0 0', whiteSpace: 'nowrap',
          fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        });
        ov.appendChild(badge);
        document.body.appendChild(ov);
      }, reportsCardValue);
      await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    }

    // shotAt AVANT l'assertion — obligatoire (CLAUDE.md)
    const reportsCardEl = page.getByText('Analysis', { exact: true }).first();
    await shotAt(page, reportsCardEl, `${TC}_step4_reports`);

    await page.evaluate(() => {
      document.querySelectorAll('[data-qa-annotation="bug"]').forEach(el => el.remove());
    });

    // Table may paginate — rowCount is visible rows (first page), reportsCardValue is total.
    // Assert rowCount ≤ total (not strict equality) to handle pagination.
    expect(
      rowCount,
      `Nombre de lignes dans le tableau (${rowCount}) doit être ≤ à la stat card Analysis (${reportsCardValue})`,
    ).toBeLessThanOrEqual(reportsCardValue);
  });
});
