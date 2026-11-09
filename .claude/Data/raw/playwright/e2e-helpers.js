/**
 * e2e-helpers.js — Shared helpers for all GEO E2E specs.
 *
 * Usage in a spec:
 *   const H = require('./e2e-helpers');
 *   const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-my-spec');
 *   H.ensureDir(SCREENSHOTS_DIR);
 *   const shot = H.makeShot(SCREENSHOTS_DIR);
 *   H.registerAfterEach(SCREENSHOTS_DIR);
 *
 * Then use shot(), H.assertLLMButtons(), H.switchAllLLMs() directly in your spec.
 */

'use strict';

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');

// ── GEO LLM constants ─────────────────────────────────────────────────────────
const LLM_ALTS   = ['claude', 'gemini', 'grok', 'openai', 'perplexity'];
const LLM_LABELS = { claude: 'Claude', gemini: 'Gemini', grok: 'Grok', openai: 'ChatGPT', perplexity: 'Perplexity' };

// ── Directory helper ──────────────────────────────────────────────────────────
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ── Screenshot helper factory ─────────────────────────────────────────────────
/**
 * Returns a bound `shot(page, name)` function scoped to screenshotsDir.
 * @param {string} screenshotsDir  Absolute path to the screenshots folder.
 */
function makeShot(screenshotsDir) {
  return async (page, name) => {
    await page.screenshot({ path: path.join(screenshotsDir, `${name}.png`), fullPage: false });
  };
}

/**
 * Returns a bound `shotAt(page, locator, name)` function that scrolls a locator
 * into view before capturing — so the screenshot shows the relevant section,
 * not the top of the page.
 *
 * Usage:
 *   const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
 *   await shotAt(page, page.locator('[aria-label^="Share of Voice"]').first(), 'KPI-TC004_step3_then');
 *
 * @param {string} screenshotsDir  Absolute path to the screenshots folder.
 */
function makeShotAt(screenshotsDir) {
  return async (page, locator, name) => {
    await locator.scrollIntoViewIfNeeded();
    // One paint frame after scroll so layout is settled
    await page.evaluate(() => new Promise(r => requestAnimationFrame(r)));
    await page.screenshot({ path: path.join(screenshotsDir, `${name}.png`), fullPage: false });
  };
}

// ── LLM logo + compact-mode assertion ────────────────────────────────────────
/**
 * Assert all 5 LLM logo buttons are visible AND text labels are NOT visible (compact mode).
 * If labels are visible (bug): paint red overlays on the buttons, screenshot, then throw.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} screenshotsDir  Absolute path to screenshots folder.
 * @param {string} tcId            e.g. 'E2E-QA-TC007'
 * @param {string} stepName        e.g. 'step3_then'
 */
async function assertLLMButtons(page, screenshotsDir, tcId, stepName) {
  const shot = makeShot(screenshotsDir);

  // Pass 1 — all 5 logos must be visible
  for (const alt of LLM_ALTS) {
    const logo = page.locator(`button:has(img[alt="${alt}"]) img[alt="${alt}"]`);
    await expect(logo).toBeVisible({ timeout: 10000 });
  }

  // Pass 2 — collect every label that is visible (should be hidden in compact mode)
  const visibleLabels = [];
  for (const alt of LLM_ALTS) {
    const label   = LLM_LABELS[alt];
    const labelEl = page.locator(`button:has(img[alt="${alt}"]) span`).filter({ hasText: label });
    if (await labelEl.isVisible()) visibleLabels.push({ alt, label });
  }

  if (visibleLabels.length > 0) {
    // Scroll to the first affected button so all LLM buttons are in viewport
    await page.locator(`img[alt="${visibleLabels[0].alt}"]`).scrollIntoViewIfNeeded();
    // Paint a fixed overlay on EVERY button that shows a visible label
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
      for (const { alt } of labels) {
        const imgs = [...document.querySelectorAll(`img[alt="${alt}"]`)];
        for (const img of imgs) {
          const btn = img.closest('button');
          if (!btn) continue;
          // Annotate the entire button — the label span may be CSS-truncated (too small to see)
          addOverlay(btn.getBoundingClientRect());
        }
      }
    }, visibleLabels);
    // Wait 2 animation frames so overlays are painted before screenshot
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    // Screenshot with annotations — saved BEFORE throw so afterEach doesn't overwrite it
    await shot(page, `${tcId}_${stepName}`);
    const list = visibleLabels.map(v => v.label).join(', ');
    throw new Error(`[BUG] Compact mode not active — ${visibleLabels.length}/5 LLM text labels visible: ${list}`);
  }

  await shot(page, `${tcId}_${stepName}`);
}

// ── LLM switch helper ─────────────────────────────────────────────────────────
/**
 * Click through all 5 LLM buttons in sequence and assert the panel heading stays visible.
 * @param {import('@playwright/test').Page} page
 * @param {string} panelHeadingSelector  CSS selector for the panel heading (default: 'h4')
 */
async function switchAllLLMs(page, panelHeadingSelector = 'h4') {
  const order = ['gemini', 'grok', 'openai', 'perplexity', 'claude'];
  for (const alt of order) {
    await page.locator(`button:has(img[alt="${alt}"])`).click();
    await expect(page.locator(panelHeadingSelector).first()).toBeVisible({ timeout: 15000 });
  }
}

// ── Mandatory afterEach — annotated failure screenshot (CLAUDE.md) ────────────
/**
 * Register the shared afterEach hook. Call ONCE at the top of each spec file,
 * before any test() blocks.
 *
 * What it does on failure:
 * 1. Extracts the Playwright locator CSS from the error message.
 * 2. Paints a position:fixed red overlay on the matching DOM element.
 * 3. If no element found: adds a red banner at the top of the page.
 * 4. Saves (or keeps) the annotated screenshot as {tcId}_step3_then.png.
 * 5. Backfills step1_given and step2_when if they don't exist yet.
 *
 * @param {string} screenshotsDir  Absolute path to the screenshots folder.
 */
function registerAfterEach(screenshotsDir) {
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
        const badge = document.createElement('span');
        badge.textContent = '🐛 BUG';
        Object.assign(badge.style, {
          position: 'absolute', top: '-20px', left: '0',
          background: '#dc2626', color: 'white',
          fontSize: '10px', fontWeight: '700', padding: '1px 6px',
          borderRadius: '3px 3px 0 0',
          fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
          whiteSpace: 'nowrap',
        });
        overlay.appendChild(badge);
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
        } catch (_) { /* invalid selector — skip */ }
      }
      return false;
    }, { selectors: allSelectors, hasTexts: hasTextMatches });

    if (!annotated) {
      // Extract a human-readable element name from the locator string:
      // 1. has-text("…")  → the text inside quotes
      // 2. getByRole(…, { name: "…" }) → the name value
      // 3. fallback → first 100 chars of the raw locator string
      const hasTextMatch = locatorStr.match(/has-text\(["']([^"']+)["']\)/);
      const nameMatch    = locatorStr.match(/name:\s*["']([^"']+)["']/);
      const elementName  = (hasTextMatch && hasTextMatch[1])
        || (nameMatch && nameMatch[1])
        || locatorStr.replace(/locator\(|['")]/g, '').trim().slice(0, 100);

      await page.evaluate((label) => {
        const banner = document.createElement('div');
        banner.textContent = label
          ? `TEST FAILED — "${label}" non trouvé dans le DOM`
          : 'TEST FAILED — element not found in DOM';
        Object.assign(banner.style, {
          position: 'fixed', top: '0', left: '0', right: '0',
          background: '#dc2626', color: 'white',
          padding: '10px 16px', fontWeight: '700', fontSize: '14px',
          zIndex: '999999', textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        });
        document.body.prepend(banner);
      }, elementName);
    }

    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));

    const tcId     = testInfo.title.split(' ')[0];
    const failPath = path.join(screenshotsDir, `${tcId}_step3_then.png`);
    // If error is custom (no Playwright locator) and screenshot already exists with annotations, keep it.
    const isCustomError = allSelectors.length === 0 && fs.existsSync(failPath);
    if (!isCustomError) {
      await page.screenshot({ path: failPath, fullPage: false });
    }
    // Backfill earlier steps that were never reached
    for (const step of ['step1_given', 'step2_when']) {
      const p = path.join(screenshotsDir, `${tcId}_${step}.png`);
      if (!fs.existsSync(p)) {
        await page.screenshot({ path: p, fullPage: false }).catch(() => {});
      }
    }
  });
}

// ── Safe scroll helper ────────────────────────────────────────────────────────
/**
 * Assert an element is visible (with a clear human-readable name in the error),
 * then scroll it into view.
 *
 * Replaces naked `locator.scrollIntoViewIfNeeded()` calls whose errors only say
 * "Timeout 30000ms exceeded" without mentioning which element was expected.
 *
 * Usage:
 *   await H.safeScroll(page.locator(SEL.citationHeading).first(), 'LLM Engines Citation Sources heading');
 *
 * On failure the error will read:
 *   Error: "LLM Engines Citation Sources heading" must be visible before scroll
 *
 * @param {import('@playwright/test').Locator} locator
 * @param {string} elementName  Human-readable name shown in the error message.
 * @param {number} [timeout=20000]
 */
async function safeScroll(locator, elementName, timeout = 20000) {
  await expect(locator, `"${elementName}" must be visible before scroll`).toBeVisible({ timeout });
  await locator.scrollIntoViewIfNeeded();
}

// ── Auth0 / page load helpers ─────────────────────────────────────────────────
/**
 * Navigate to a URL and wait for network idle.
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 */
async function goto(page, url) {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
}

// ── Snapshot navigator (category page dropdown pattern) ───────────────────────
/**
 * Select a specific snapshot from the category page snapshot dropdown.
 * No-op if targetLabel is falsy or the snapshot is already selected.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string|null} targetLabel  Partial label to match, e.g. "05 mai". Pass null to skip.
 */
async function ensureSnapshot(page, targetLabel) {
  if (!targetLabel) return;
  const snapBtn = page.locator('button').filter({
    hasText: /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+20\d{2}\b/,
  }).first();
  if (!await snapBtn.isVisible({ timeout: 3000 }).catch(() => false)) return;
  if ((await snapBtn.textContent() || '').includes(targetLabel)) return;
  await snapBtn.click();
  await page.waitForTimeout(600);
  const option = page.locator(`[role="option"]:has-text("${targetLabel}"), button:has-text("${targetLabel}")`).first();
  if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
    await option.click();
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  } else {
    await page.keyboard.press('Escape');
  }
}

// ── Cookie banner ─────────────────────────────────────────────────────────────
/**
 * Dismisses the cookie consent banner if visible.
 * Safe to call multiple times — no-op if banner is absent.
 * @param {import('@playwright/test').Page} page
 */
async function dismissCookieBanner(page) {
  // Prod banner: bouton direct [data-testid="cc-cta-accept"] (pas de wrapper cookie-banner)
  const prodAccept = page.locator('[data-testid="cc-cta-accept"]');
  const prodVisible = await prodAccept.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false);
  if (prodVisible) {
    await prodAccept.click();
    await page.waitForTimeout(1000);
    return;
  }

  // Generic fallback: "Essential Only" / "Accept All" not wrapped in a data-testid
  // (observed on staging-geo.onclusive.com — generic cookie consent dialog)
  const essentialBtn = page.locator('button:has-text("Essential Only"), button:has-text("Accept All")').first();
  const essentialVisible = await essentialBtn.waitFor({ state: 'visible', timeout: 3000 }).then(() => true).catch(() => false);
  if (essentialVisible) {
    await essentialBtn.click();
    await page.waitForTimeout(1000);
    return;
  }

  // Staging banner: wrapper [data-testid="cookie-banner"]
  const banner = page.locator('[data-testid="cookie-banner"]');
  const visible = await banner.waitFor({ state: 'visible', timeout: 2000 }).then(() => true).catch(() => false);
  if (!visible) return;
  // Prefer "Necessary only" / "Reject" — avoid accepting tracking cookies during tests
  const necessaryBtn = banner.locator('button').filter({
    hasText: /necessary only|nécessaire uniquement|essential only|reject|refuser|decline/i,
  }).first();
  const urlBefore = page.url();
  if (await necessaryBtn.count() > 0) {
    await necessaryBtn.click();
  } else {
    // Fallback: last button (typically the most restrictive option)
    const btns = banner.locator('button');
    if (await btns.count() > 0) await btns.last().click();
  }
  // Wait briefly then check if cookie click caused a navigation away
  await page.waitForTimeout(1500);
  if (page.url() !== urlBefore) {
    // Navigate back to the original page and wait for API data to load
    await page.goto(urlBefore, { waitUntil: 'load' });
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  } else {
    await banner.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
  }
}

// ── Filter state helpers (overview: market + LLMs) ────────────────────────────
// Designed to unskip GEO-79-TC004 — "Filter state persists across sidebar nav".
// The helpers capture / set / assert / reset the dashboard overview filters
// (market dropdown + LLM toggle switches) without leaking state across tests.

const FILTER_SEL = {
  marketButton:    'button[aria-label^="Country filter"], button[aria-label^="Market filter"]',
  llmFilterButton: 'button[aria-label="LLM engine filters"]',
  llmSwitch:       '[role="switch"]',
};

/**
 * Capture the current filter state on the dashboard overview page.
 * Opens the LLM dropdown to read the switches and closes it afterwards.
 *
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<{ market: string|null, llms: string[] }>}
 */
async function captureFilterState(page) {
  const marketBtn = page.locator(FILTER_SEL.marketButton).first();
  let market = null;
  if (await marketBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    const aria = await marketBtn.getAttribute('aria-label');
    const m = aria && aria.match(/(?:Country|Market) filter\s*[—-]\s*(.+)/);
    market = m ? m[1].trim() : ((await marketBtn.innerText()).trim().replace(/^[^\w]+/, ''));
  }

  const llmBtn = page.locator(FILTER_SEL.llmFilterButton).first();
  const llmBtnVisible = await llmBtn.isVisible({ timeout: 2000 }).catch(() => false);
  if (llmBtnVisible) {
    await llmBtn.click();
    await page.waitForTimeout(400);
  }

  const switches = page.locator(FILTER_SEL.llmSwitch);
  const count = await switches.count();
  const llms = [];
  for (let i = 0; i < count; i++) {
    const sw = switches.nth(i);
    const checked = await sw.getAttribute('aria-checked');
    if (checked !== 'true') continue;
    const label = await sw.evaluate((el) => {
      let node = el;
      for (let lvl = 0; lvl < 4; lvl++) {
        const text = (node.innerText || node.textContent || '').trim();
        if (text && text.length < 40) return text;
        node = node.parentElement;
        if (!node) break;
      }
      return el.getAttribute('aria-label') || '';
    });
    if (label) llms.push(label.trim());
  }

  if (llmBtnVisible) {
    await page.keyboard.press('Escape').catch(() => {});
    await page.waitForTimeout(200);
  }

  return { market, llms };
}

/**
 * Open the market filter dropdown and select an option by partial label.
 * No-op when the market filter is absent (e.g. single-market dashboards).
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} label  Partial label of the target market (e.g. "United States").
 */
async function setMarketFilter(page, label) {
  const marketBtn = page.locator(FILTER_SEL.marketButton).first();
  await expect(marketBtn, `"Market filter" button must be visible to set market`).toBeVisible({ timeout: 10000 });
  await marketBtn.click();
  await page.waitForTimeout(400);
  const option = page.locator(`[role="option"]:has-text("${label}"), button:has-text("${label}")`).first();
  await expect(option, `Market option "${label}" must be visible in the dropdown`).toBeVisible({ timeout: 5000 });
  await option.click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
}

/**
 * Assert that the captured filter state matches an expected snapshot.
 * Pass only the fields you care about — undefined fields are skipped.
 *
 * @param {import('@playwright/test').Page} page
 * @param {{ market?: string|null, llms?: string[] }} expected
 * @param {{ scope?: string }} [options]  scope appears in the assertion error.
 */
async function expectFilterStatePersisted(page, expected, options = {}) {
  const scope = options.scope || 'current view';
  const actual = await captureFilterState(page);
  if (expected.market !== undefined) {
    expect(actual.market, `Market filter must persist on ${scope} — expected "${expected.market}"`).toBe(expected.market);
  }
  if (expected.llms !== undefined) {
    expect([...actual.llms].sort(), `LLM filter switches must persist on ${scope}`).toEqual([...expected.llms].sort());
  }
}

/**
 * Register an afterEach hook that calls `restoreFn` to bring filters back to their
 * baseline state. Eliminates cross-test side effects when a test mutates filters.
 *
 * @param {() => Promise<void>} restoreFn  Best-effort restoration callback.
 */
function registerFilterResetAfterEach(restoreFn) {
  test.afterEach(async () => {
    try { await restoreFn(); } catch (_) { /* best-effort */ }
  });
}

// ── Question detail panel helpers (Visibility / Competitive tabs) ─────────────

/** Standard close-button selector for the category question detail panel. */
const PANEL_CLOSE_SEL = 'button[aria-label="Close detail panel"], button[aria-label="Fermer le volet de détails"]';

/**
 * Closes any currently open detail panel, then clicks `row` to open its panel.
 * Prevents the "wrong row already open" bug where the panel would stay on a
 * different row if a panel was already open before the click.
 *
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Locator} row  The table row to open.
 */
async function openDetailPanel(page, row) {
  const closeBtn = page.locator(PANEL_CLOSE_SEL).first();
  if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await closeBtn.click();
    await page.waitForTimeout(400);
  }
  await row.scrollIntoViewIfNeeded();
  await row.click();
  await expect(closeBtn, 'Detail panel must open').toBeVisible({ timeout: 15000 });
}

/**
 * Polls the LLM responses container until a badge keyword appears (up to 5s).
 * Uses textContent() instead of CSS visibility to handle:
 *   - transition-opacity duration-150 (badge in DOM but opacity:0 during switch)
 *   - "No data available from X" (no badge element at all)
 *
 * Supports both Visibility (Favorable/Unfavorable/Unranked) and
 * Competitive (Won/Lost) panel badges — English and French UI.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} [containerSel]  Selector for the LLM responses container.
 * @returns {Promise<'favorable'|'unfavorable'|'unranked'|'won'|'lost'|null>}
 */
async function getActiveBadgeType(page, containerSel = '[data-testid="question-detail-llm-responses"]') {
  const container = page.locator(containerSel);
  for (let i = 0; i < 10; i++) {
    await page.waitForTimeout(500);
    const text = (await container.textContent().catch(() => '')) || '';
    // Check Unfavorable BEFORE Favorable (Unfavorable contains "Favorable" substring)
    if (text.includes('Unfavorable') || text.includes('Défavorable')) return 'unfavorable';
    if (text.includes('Favorable'))                                    return 'favorable';
    if (text.includes('Unranked')    || text.includes('Non classé'))   return 'unranked';
    if (text.includes('Won')         || text.includes('Gagné'))        return 'won';
    if (text.includes('Lost')        || text.includes('Perdu'))        return 'lost';
  }
  // Engine has "No data available" or unknown state after 5s — no badge keyword found.
  return null;
}

/**
 * Clicks through all visible LLM engine buttons and collects per-engine badge types.
 * Iterates by aria-label (no .all()) to avoid stale handles after React re-renders.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} [containerSel]  Passed through to getActiveBadgeType.
 * @returns {Promise<Array<{engine: string, badge: 'favorable'|'unfavorable'|'unranked'|'won'|'lost'|null}>>}
 */
// Mapping engine label → data-testid suffix (shared by collectAllEngineBadges + clickEnginePill)
const ENGINE_PILL_MAP = [
  { label: 'ChatGPT',    testid: 'dashboard-question-engine-pill-openai' },
  { label: 'Gemini',     testid: 'dashboard-question-engine-pill-gemini' },
  { label: 'Grok',       testid: 'dashboard-question-engine-pill-grok' },
  { label: 'Claude',     testid: 'dashboard-question-engine-pill-claude' },
  { label: 'Perplexity', testid: 'dashboard-question-engine-pill-perplexity' },
];

async function collectAllEngineBadges(page, containerSel) {
  const badges = [];
  for (const { label, testid } of ENGINE_PILL_MAP) {
    const btn = page.locator(`[data-testid="${testid}"]`);
    const visible = await btn.isVisible({ timeout: 1000 }).catch(() => false);
    if (!visible) continue;
    await btn.click();
    const badge = await getActiveBadgeType(page, containerSel);
    badges.push({ engine: label, badge });
  }
  return badges;
}

/**
 * Click the engine pill for the given engine label (e.g. 'ChatGPT', 'Gemini').
 * Uses data-testid — never aria-label (engine pills have no aria-label in GEO).
 */
async function clickEnginePill(page, engineLabel) {
  const entry = ENGINE_PILL_MAP.find(e => e.label === engineLabel);
  if (!entry) throw new Error(`clickEnginePill: unknown engine "${engineLabel}"`);
  await page.locator(`[data-testid="${entry.testid}"]`).click();
}

// ── Performance helpers ───────────────────────────────────────────────────────
// Designed to unskip GEO-79-TC005 — "Dashboard pages load within 2 seconds".

/**
 * Measure wall-clock time between `page.goto(url)` and `readyLocator` becoming visible.
 * Use for SLA-style assertions like "Overview must render within 2s".
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 * @param {import('@playwright/test').Locator} readyLocator  Element that signals "fully rendered".
 * @param {{ waitUntil?: 'commit'|'load'|'domcontentloaded'|'networkidle', timeout?: number }} [options]
 * @returns {Promise<number>}  Elapsed milliseconds.
 */
async function measurePageLoadMs(page, url, readyLocator, options = {}) {
  const t0 = Date.now();
  await page.goto(url, { waitUntil: options.waitUntil || 'commit' });
  await readyLocator.waitFor({ state: 'visible', timeout: options.timeout || 30000 });
  return Date.now() - t0;
}

/**
 * Read browser-level navigation timings from the Performance API.
 * Returns null fields when the corresponding paint entry is not available.
 *
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<{ domContentLoaded: number, loadEventEnd: number, firstPaint: number|null, firstContentfulPaint: number|null }>}
 */
async function getNavigationTimings(page) {
  return page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] || {};
    const paint = performance.getEntriesByType('paint') || [];
    const fp  = paint.find(p => p.name === 'first-paint');
    const fcp = paint.find(p => p.name === 'first-contentful-paint');
    return {
      domContentLoaded:     nav.domContentLoadedEventEnd || 0,
      loadEventEnd:         nav.loadEventEnd             || 0,
      firstPaint:           fp  ? fp.startTime  : null,
      firstContentfulPaint: fcp ? fcp.startTime : null,
    };
  });
}

module.exports = {
  LLM_ALTS,
  LLM_LABELS,
  ensureDir,
  makeShot,
  makeShotAt,
  assertLLMButtons,
  switchAllLLMs,
  registerAfterEach,
  safeScroll,
  goto,
  ensureSnapshot,
  dismissCookieBanner,
  // Filter state (GEO-79-TC004)
  captureFilterState,
  setMarketFilter,
  expectFilterStatePersisted,
  registerFilterResetAfterEach,
  // Performance (GEO-79-TC005)
  measurePageLoadMs,
  getNavigationTimings,
  // Question detail panel — Visibility / Competitive tabs
  PANEL_CLOSE_SEL,
  openDetailPanel,
  getActiveBadgeType,
  collectAllEngineBadges,
  clickEnginePill,
};
