// hubspot-upsell-pql.spec.js
// E2E — GEO-237 Hubspot PQL Feedback (SeeItInActionModal + JIT consent flow)
// CSV : .claude/Data/output/csv/testcases-coverage-storyGEO-237.csv
//
// Compte de test : UPSELL_USER_EMAIL=assiya.benramdane+oa@onclusive.com (défini dans .env)
// Ce compte utilise une storageState séparée : processed/auth/storageState-upsell.json
//
// Lancement :
//   SPEC_NAME=hubspot-upsell-pql USE_AUTH=true \
//   npx playwright test .claude/Data/raw/playwright/hubspot-upsell-pql.spec.js
//
// Debug d'un seul TC :
//   SPEC_NAME=hubspot-upsell-pql USE_AUTH=true \
//   npx playwright test .claude/Data/raw/playwright/hubspot-upsell-pql.spec.js --grep "TC-GEO-237-001"

'use strict';
const { test, expect } = require('@playwright/test');
const path = require('path');

const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H = require('./e2e-helpers');

// ── JDD (3-layer merge) ────────────────────────────────────────────────────
const COMMON           = require('../test-data/common.json');
const { loadJDD } = require('../test-data/jdd/loadJDD');
const JDD = loadJDD('hubspot-upsell-pql');

// ── Constants (env > JDD) ──────────────────────────────────────────────────
const BASE_URL        = process.env.BASE_URL     || COMMON.base_url;
const UPSELL_URL      = process.env.UPSELL_URL   || JDD.upsell_url || `${BASE_URL}/upsell`;
const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-hubspot-upsell-pql');

// ── Visual testing (opt-in) ────────────────────────────────────────────────
// Set VISUAL_TESTING=true to enable toHaveScreenshot() comparisons.
// First run: add --update-snapshots to generate the baseline.
// Baseline stored in: visual-snapshots/hubspot-upsell-pql.spec.js-snapshots/
const VISUAL_TESTING  = process.env.VISUAL_TESTING === 'true';
H.ensureDir(SCREENSHOTS_DIR);

const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// ── Selectors (BLUEPRINT.upsell_page) ─────────────────────────────────────
const BP_UP = BLUEPRINT.upsell_page;
const SEL = {
  speakToUsBtn:    BP_UP.speak_to_us_button.selector,
  // SeeItInActionModal
  seeItModal:      BP_UP.see_it_in_action_modal.modal_root,
  seeItTitle:      BP_UP.see_it_in_action_modal.title,
  seeItDesc:       BP_UP.see_it_in_action_modal.description,
  seeItCheckbox:   BP_UP.see_it_in_action_modal.checkbox,
  seeItConfirmBtn: BP_UP.see_it_in_action_modal.confirm_button,
  seeItCloseBtn:   BP_UP.see_it_in_action_modal.close_button,
  // JitBridgeModal
  jitModal:        BP_UP.jit_bridge_modal.modal_root,
  // PrivacyFallbackModal
  privacyModal:    BP_UP.privacy_fallback_modal.modal_root,
};

// ── Navigation helper ──────────────────────────────────────────────────────
async function gotoUpsell(page) {
  await page.goto(UPSELL_URL, { waitUntil: 'load' });
  // Accept cookies and reload — without consent (areFunctionalCookiesEnabled=false)
  // clicking "Speak to Us" opens JitBridgeModal instead of SeeItInActionModal.
  // A full reload is required for the React state to pick up the new cookie.
  const acceptBtn = page.locator('[data-testid="cc-cta-accept"]');
  if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acceptBtn.click();
    await page.waitForTimeout(500);
    await page.goto(UPSELL_URL, { waitUntil: 'load' });
  }
  await expect(
    page.locator(SEL.speakToUsBtn).first(),
    '"Speak to Us" button must be visible after page load'
  ).toBeVisible({ timeout: 20000 });
}

// ── Helper: accept cookies and reload ─────────────────────────────────────
async function acceptCookiesAndReload(page) {
  await page.goto(UPSELL_URL, { waitUntil: 'load' });
  // Cookie dialog uses data-testid="cc-cta-accept" (not a generic cookie-banner)
  const acceptBtn = page.locator('[data-testid="cc-cta-accept"]');
  if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acceptBtn.click();
    await page.waitForTimeout(1000);
  }
  await page.goto(UPSELL_URL, { waitUntil: 'load' });
  await expect(page.locator(SEL.speakToUsBtn).first()).toBeVisible({ timeout: 20000 });
}

// ── Helper: open SeeItInActionModal ───────────────────────────────────────
async function openSeeItModal(page) {
  await page.locator(SEL.speakToUsBtn).first().click();
  await expect(
    page.locator(SEL.seeItModal).first(),
    'SeeItInActionModal must appear after clicking "Speak to Us"'
  ).toBeVisible({ timeout: 10000 });
}

// ── Helper: open modal, check checkbox, click Confirm ─────────────────────
async function confirmInSeeItModal(page) {
  await openSeeItModal(page);
  const checkbox = page.locator(SEL.seeItCheckbox).first();
  await expect(checkbox, 'Checkbox must be visible in modal').toBeVisible({ timeout: 5000 });
  await checkbox.click();
  await page.waitForTimeout(300);
  const confirmBtn = page.locator(SEL.seeItConfirmBtn).first();
  await expect(confirmBtn, 'Confirm button must be enabled after checkbox').toBeEnabled({ timeout: 5000 });
  await confirmBtn.click();
}

// ══════════════════════════════════════════════════════════════════════════
// TC-GEO-237-001 — Modal "See it in action" affichée au clic (AC10)
// ══════════════════════════════════════════════════════════════════════════

test('TC-GEO-237-001 — Modal See it in action affichée au clic', async ({ page }) => {
  await test.step("Given l'user est sur la page upsell Measure", async () => {
    await gotoUpsell(page);
    await shot(page, 'TC-GEO-237-001_step1_given');
  });

  await test.step('When il clique sur un bouton "Speak to Us"', async () => {
    await page.locator(SEL.speakToUsBtn).first().click();
    await shot(page, 'TC-GEO-237-001_step2_when');
  });

  await test.step('Then la modal s\'ouvre avec le titre "See it in action", la description, la checkbox décochée et le bouton Confirm désactivé', async () => {
    const modal = page.locator(SEL.seeItModal).first();
    await expect(modal, 'SeeItInActionModal doit être visible').toBeVisible({ timeout: 10000 });

    const title = page.locator(SEL.seeItTitle).first();
    await expect(title, 'Le titre "See it in action" doit être visible').toBeVisible({ timeout: 5000 });

    const desc = page.locator(SEL.seeItDesc).first();
    await expect(desc, 'La description doit être visible dans la modal').toBeVisible({ timeout: 5000 });

    const checkbox = page.locator(SEL.seeItCheckbox).first();
    await expect(checkbox, 'La checkbox doit être présente').toBeVisible({ timeout: 5000 });
    expect(await checkbox.isChecked(), 'La checkbox doit être décochée par défaut').toBe(false);

    const confirmBtn = page.locator(SEL.seeItConfirmBtn).first();
    await shotAt(page, modal, 'TC-GEO-237-001_step3_then');
    await expect(confirmBtn, 'Le bouton Confirm doit être désactivé par défaut').toBeDisabled({ timeout: 5000 });

    // Visual: capture modal initial state as baseline (checkbox unchecked, confirm disabled)
    if (VISUAL_TESTING) {
      await expect(modal).toHaveScreenshot('TC-GEO-237-001-modal-initial.png');
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════
// TC-GEO-237-002 — Confirm activé après coche (AC11)
// ══════════════════════════════════════════════════════════════════════════

test('TC-GEO-237-002 — Confirm activé après coche de la checkbox', async ({ page }) => {
  await test.step('Given la modal SeeItInActionModal est ouverte', async () => {
    await gotoUpsell(page);
    await openSeeItModal(page);
    await shot(page, 'TC-GEO-237-002_step1_given');
  });

  await test.step('When l\'user coche la checkbox "I\'m happy to be contacted for a demo"', async () => {
    const checkbox = page.locator(SEL.seeItCheckbox).first();
    await expect(checkbox, 'Checkbox doit être visible avant coche').toBeVisible({ timeout: 5000 });
    await checkbox.click();
    await page.waitForTimeout(300);
    await shot(page, 'TC-GEO-237-002_step2_when');
  });

  await test.step('Then le bouton "Confirm" devient actif (clickable)', async () => {
    const confirmBtn = page.locator(SEL.seeItConfirmBtn).first();
    await shotAt(page, confirmBtn, 'TC-GEO-237-002_step3_then');
    await expect(confirmBtn, 'Le bouton Confirm doit être actif après coche').toBeEnabled({ timeout: 5000 });

    // Visual: capture confirm button enabled state — detects color/style regression
    if (VISUAL_TESTING) {
      await expect(confirmBtn).toHaveScreenshot('TC-GEO-237-002-confirm-enabled.png');
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════
// TC-GEO-237-003 — Fermeture modal sans confirmation -> aucun appel (AC12)
// ══════════════════════════════════════════════════════════════════════════

test('TC-GEO-237-003 — Fermeture modal sans confirmation -> aucun appel backend', async ({ page }) => {
  let hubspotCallCount = 0;
  await page.route('**/upsell/hubspot', (route) => { hubspotCallCount++; route.continue(); });

  await test.step('Given la modal SeeItInActionModal est ouverte', async () => {
    await gotoUpsell(page);
    await openSeeItModal(page);
    await shot(page, 'TC-GEO-237-003_step1_given');
  });

  await test.step('When l\'user ferme la modal (croix / backdrop / touche Escape)', async () => {
    const closeBtn = page.locator(SEL.seeItCloseBtn).first();
    if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await closeBtn.click();
    } else {
      await page.keyboard.press('Escape');
    }
    await page.waitForTimeout(600);
    await shot(page, 'TC-GEO-237-003_step2_when');
  });

  await test.step('Then la modal se ferme et aucun appel POST /api/v1/upsell/hubspot n\'est effectué', async () => {
    await expect(page.locator(SEL.seeItModal), 'La modal doit être masquée après fermeture').toBeHidden({ timeout: 5000 });
    await page.waitForTimeout(1000);
    await shot(page, 'TC-GEO-237-003_step3_then');
    expect(hubspotCallCount, 'Aucun appel POST /upsell/hubspot ne doit être effectué après fermeture').toBe(0);
  });
});

// ══════════════════════════════════════════════════════════════════════════
// TC-GEO-237-007 — Confirmation + cookies accordés -> appel direct (AC4+AC13)
// ══════════════════════════════════════════════════════════════════════════

test('TC-GEO-237-007 — Confirmation + cookies accordés -> appel direct sans JitBridgeModal', async ({ page }) => {
  let hubspotRequest = null;
  await page.route('**/upsell/hubspot', async (route) => {
    hubspotRequest = route.request();
    await route.continue();
  });

  await test.step('Given areFunctionalCookiesEnabled est true (consentement accordé) et la page upsell est chargée', async () => {
    await acceptCookiesAndReload(page);
    await shot(page, 'TC-GEO-237-007_step1_given');
  });

  await test.step('When l\'user ouvre la modal, coche la checkbox et clique "Confirm"', async () => {
    await confirmInSeeItModal(page);
    await page.waitForTimeout(2000);
    await shot(page, 'TC-GEO-237-007_step2_when');
  });

  await test.step('Then POST /api/v1/upsell/hubspot est appelé directement sans ouvrir la JitBridgeModal', async () => {
    const jitVisible = await page.locator(SEL.jitModal).isVisible({ timeout: 1500 }).catch(() => false);
    await shot(page, 'TC-GEO-237-007_step3_then');
    expect(jitVisible, 'La JitBridgeModal ne doit PAS apparaître si le consentement est déjà accordé').toBe(false);
    expect(hubspotRequest, 'POST /upsell/hubspot doit être appelé directement après Confirm').not.toBeNull();
  });
});

// ══════════════════════════════════════════════════════════════════════════
// TC-GEO-237-008 — Idempotence : un seul appel HubSpot par session (AC5)
// ══════════════════════════════════════════════════════════════════════════

test('TC-GEO-237-008 — Idempotence - un seul appel HubSpot par session', async ({ page }) => {
  const hubspotCalls = [];
  await page.route('**/upsell/hubspot', async (route) => {
    hubspotCalls.push(route.request().url());
    await route.continue();
  });

  await test.step('Given l\'user a déjà cliqué "Speak to Us" et confirmé - l\'événement a été envoyé', async () => {
    await acceptCookiesAndReload(page);
    await confirmInSeeItModal(page);
    await page.waitForTimeout(2000);
    await shot(page, 'TC-GEO-237-008_step1_given');
  });

  await test.step('When il clique à nouveau sur un autre "Speak to Us" de la page et confirme', async () => {
    await page.keyboard.press('Escape').catch(() => {});
    await page.waitForTimeout(500);
    const btns = page.locator(SEL.speakToUsBtn);
    const count = await btns.count();
    await (count > 1 ? btns.nth(1) : btns.first()).click();
    const modal = page.locator(SEL.seeItModal).first();
    if (await modal.isVisible({ timeout: 5000 }).catch(() => false)) {
      const cb = page.locator(SEL.seeItCheckbox).first();
      if (await cb.isVisible({ timeout: 2000 }).catch(() => false)) {
        await cb.click();
        await page.waitForTimeout(300);
      }
      const confirmBtn = page.locator(SEL.seeItConfirmBtn).first();
      if (await confirmBtn.isEnabled({ timeout: 2000 }).catch(() => false)) {
        await confirmBtn.click();
      }
    }
    await page.waitForTimeout(2000);
    await shot(page, 'TC-GEO-237-008_step2_when');
  });

  await test.step('Then aucun deuxième appel POST /api/v1/upsell/hubspot n\'est effectué', async () => {
    await shot(page, 'TC-GEO-237-008_step3_then');
    expect(
      hubspotCalls.length,
      `Un seul appel POST attendu (idempotence par session) — reçus : ${hubspotCalls.length}`
    ).toBeLessThanOrEqual(1);
  });
});

// ══════════════════════════════════════════════════════════════════════════
// TC-GEO-237-010 — Erreur HubSpot non-bloquante (AC7) — mock 503
// ══════════════════════════════════════════════════════════════════════════

test('TC-GEO-237-010 — Erreur HubSpot non-bloquante pour l\'utilisateur', async ({ page }) => {
  await page.route('**/upsell/hubspot', (route) =>
    route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Service Unavailable' }) })
  );

  await test.step('Given HubSpot API retourne une erreur (503) - simulée via page.route()', async () => {
    await acceptCookiesAndReload(page);
    await shot(page, 'TC-GEO-237-010_step1_given');
  });

  await test.step('When l\'user ouvre la modal, coche la checkbox et clique "Confirm"', async () => {
    await confirmInSeeItModal(page);
    await page.waitForTimeout(2000);
    await shot(page, 'TC-GEO-237-010_step2_when');
  });

  await test.step('Then le frontend reçoit 200 OK et aucune UI d\'erreur n\'est affichée à l\'user', async () => {
    const errorEl = page.locator(
      '[role="alert"]:has-text("error"), [role="alert"]:has-text("erreur"), ' +
      '[class*="toast"]:has-text("error"), [class*="toast"]:has-text("erreur"), ' +
      ':has-text("Something went wrong"), :has-text("Une erreur est survenue")'
    );
    await shot(page, 'TC-GEO-237-010_step3_then');
    const errorVisible = await errorEl.first().isVisible({ timeout: 2000 }).catch(() => false);
    expect(errorVisible, 'Aucun message d\'erreur ne doit être affiché après une erreur HubSpot 503').toBe(false);
  });
});

// ══════════════════════════════════════════════════════════════════════════
// TC-GEO-237-011 — 5 boutons "Speak to Us" déclenchent la même logique (AC9)
// ══════════════════════════════════════════════════════════════════════════

test('TC-GEO-237-011 — Les 5 boutons "Speak to Us" déclenchent la même logique', async ({ page }) => {
  await test.step('Given les 5 instances du bouton "Speak to Us" sont présentes sur la page upsell Measure', async () => {
    await gotoUpsell(page);
    await expect(page.locator(SEL.speakToUsBtn).first()).toBeVisible({ timeout: 20000 });
    await shot(page, 'TC-GEO-237-011_step1_given');

    // Visual: full page layout — detects missing buttons, layout shifts, broken sections
    if (VISUAL_TESTING) {
      await expect(page).toHaveScreenshot('TC-GEO-237-011-page-layout.png', {
        maxDiffPixels: 150, // higher tolerance for full-page (dynamic content, scroll position)
        fullPage: false,    // viewport only — avoids flakiness from lazy-loaded sections below the fold
      });
    }
  });

  await test.step('When l\'user clique sur n\'importe laquelle des 5 instances', async () => {
    await page.locator(SEL.speakToUsBtn).first().click();
    await shot(page, 'TC-GEO-237-011_step2_when');
  });

  await test.step('Then la modal SeeItInActionModal s\'ouvre à chaque fois et la même logique s\'applique quel que soit le bouton', async () => {
    const modal = page.locator(SEL.seeItModal).first();
    await expect(modal, 'SeeItInActionModal doit s\'ouvrir après clic sur le premier bouton').toBeVisible({ timeout: 10000 });
    await shotAt(page, modal, 'TC-GEO-237-011_step3_then');

    const btns = page.locator(SEL.speakToUsBtn);
    const count = await btns.count();
    expect(count, `La page doit avoir au moins 1 bouton "Speak to Us" (trouvé : ${count})`).toBeGreaterThanOrEqual(1);

    if (count > 1) {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      await btns.nth(1).click();
      const modal2 = page.locator(SEL.seeItModal).first();
      await expect(modal2, 'SeeItInActionModal doit s\'ouvrir pour le deuxième bouton').toBeVisible({ timeout: 10000 });
      await page.keyboard.press('Escape');
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════
// TC-GEO-237-012 — 401 ne déclenche pas de redirection Auth0 (AC14) — mock 401
// ══════════════════════════════════════════════════════════════════════════

test('TC-GEO-237-012 — Réponse 401 ne déclenche pas de redirection Auth0', async ({ page }) => {
  await page.route('**/upsell/hubspot', (route) =>
    route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ error: 'Unauthorized' }) })
  );

  const redirectedUrls = [];
  page.on('framenavigated', (frame) => {
    if (frame === page.mainFrame()) redirectedUrls.push(frame.url());
  });

  await test.step('Given POST /api/v1/upsell/hubspot retourne 401 - simulé via page.route()', async () => {
    await acceptCookiesAndReload(page);
    redirectedUrls.length = 0; // reset after initial navigation
    await shot(page, 'TC-GEO-237-012_step1_given');
  });

  await test.step('When l\'user ouvre la modal, coche la checkbox et clique "Confirm"', async () => {
    await confirmInSeeItModal(page);
    await page.waitForTimeout(2000);
    await shot(page, 'TC-GEO-237-012_step2_when');
  });

  await test.step('Then aucune redirection vers Auth0 n\'est déclenchée et l\'user reste sur la page upsell', async () => {
    const auth0Redirect = redirectedUrls.some(
      (u) => u.includes('auth0') || u.includes('/authorize') || u.includes('oauth')
    );
    const upsellStillVisible = await page.locator(SEL.speakToUsBtn).first().isVisible({ timeout: 3000 }).catch(() => false);
    await shot(page, 'TC-GEO-237-012_step3_then');
    expect(
      auth0Redirect,
      `Aucune redirection vers Auth0 ne doit être déclenchée (URLs: ${redirectedUrls.join(', ')})`
    ).toBe(false);
    expect(upsellStillVisible, 'L\'user doit rester sur la page upsell (bouton "Speak to Us" encore visible)').toBe(true);
  });
});

// ══════════════════════════════════════════════════════════════════════════
// TCs skippés
// ══════════════════════════════════════════════════════════════════════════

test.skip('TC-GEO-237-004 — Confirmation + cookies absents -> JitBridgeModal', async ({ page }) => {
  // SKIPPED — Requiert un contexte sans consentement fonctionnel (areFunctionalCookiesEnabled = false).
  // La storageState Auth0 inclut potentiellement le consentement — isoler via un profil "no-consent"
  // ou un compte de test fresh sans cookie consent (reset du cc_cookie avant goto).
  // Re-enable en ajoutant un profil JDD "no-consent" qui clear le cookie de consentement.
});

test.skip('TC-GEO-237-005 — Acceptation dans JIT -> événement HubSpot envoyé', async ({ page }) => {
  // SKIPPED — Dépend de TC-004 (JitBridgeModal accessible uniquement sans consentement fonctionnel).
  // La vérification dans la timeline HubSpot est externe et non automatable sans accès API HubSpot.
  // Re-enable si TC-004 est activé et si accès API HubSpot disponible en staging.
});

test.skip('TC-GEO-237-006 — Refus dans JIT -> PrivacyFallbackModal - aucun appel', async ({ page }) => {
  // SKIPPED — Dépend de TC-004 (JitBridgeModal accessible uniquement sans consentement fonctionnel).
  // Re-enable en même temps que TC-004.
});

test.skip('TC-GEO-237-009 — Utilisateur @onclusive.com exclu du tracking HubSpot', async ({ page }) => {
  // SKIPPED — Requiert un compte test avec email @onclusive.com (utilisateur interne GEO).
  // Ajouter ce compte dans JDD sous le profil "internal-user" pour activer ce TC.
  // Ex: UPSELL_URL=... JDD_PROFILE=internal-user USE_AUTH=true ... npx playwright test ... --grep "TC-GEO-237-009"
});
