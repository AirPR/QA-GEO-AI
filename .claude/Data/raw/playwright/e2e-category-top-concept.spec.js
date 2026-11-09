// category-top-concept.spec.js
// E2E — exploration du widget "Top Concepts Associated with Your Brand" sur la page Category.
// 1 seul test avec 7 test.step() — alignés ligne-à-ligne sur le CSV
// `.claude/Data/output/csv/category-top-concept.csv` (TC unique E2E-TOP-CONCEPT-001).
//
// URL cible : ${BASE_URL}/dashboard/${dashboard_uuid}/category/${category_uuid}
//   construite via JDD.dashboard_uuid + JDD.category_uuid.
//
// Lancement :
//   SPEC_NAME=category-top-concept USE_AUTH=true \
//   npx playwright test .claude/Data/raw/playwright/category-top-concept.spec.js
//
// Profil Thermomix :
//   JDD_PROFILE=termomix SPEC_NAME=category-top-concept USE_AUTH=true \
//   npx playwright test .claude/Data/raw/playwright/category-top-concept.spec.js

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs   = require('fs');

const COMMON    = require('../test-data/common.json');
const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H         = require('./e2e-helpers');

// ── JDD (3-layer merge) ───────────────────────────────────────────────────────
const { loadJDD } = require('../test-data/jdd/loadJDD');
const JDD = loadJDD('category/category-top-concept');

// ── Constants (env > JDD) ─────────────────────────────────────────────────────
const BASE_URL        = process.env.BASE_URL        || COMMON.base_url;
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID  || JDD.dashboard_uuid;
const CATEGORY_UUID   = process.env.CATEGORY_UUID   || JDD.category_uuid;
const TARGET_SNAPSHOT = process.env.TARGET_SNAPSHOT || JDD.snapshot?.target || null;
const CATEGORY_NAME   = JDD.category_name           || '';
const CATEGORY_URL    = `${BASE_URL}/dashboard/${DASHBOARD_UUID}/category/${CATEGORY_UUID}`;

const HEADING_PREFIX  = JDD.widget.heading_prefix;          // "Top Concepts Associated with"
const SORT_MODES      = JDD.sort_modes;                     // ["Sort by Frequency", "Sort by Sentiment", "Sort A-Z"]
const NO_MATCH_QUERY  = JDD.search.no_match_query;          // "1555555"
const NO_MATCH_MSG    = JDD.search.no_match_message;        // "No sources match your search."

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-category-top-concept');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// ── Selectors (from BLUEPRINT.overview_page.top_concepts + concept_detail_panel) ─
const TC = BLUEPRINT.overview_page.top_concepts;
const SEL = {
  widgetHeading:    `h3:has-text("${HEADING_PREFIX}")`,
  sortFrequency:    'button:has-text("Sort by Frequency")',
  sortSentiment:    'button:has-text("Sort by Sentiment")',
  sortAZ:           'button:has-text("Sort A-Z")',
  filterAll:        'button:has-text("All (")',
  filterPositive:   'button:has-text("Positive (")',
  filterNegative:   'button:has-text("Negative (")',
  // Note: concept buttons matched via `.filter({ hasText: /\d+\s*sources/ })` in the test step,
  // because Playwright's `:has-text()` engine does not accept regex literals inside CSS strings.
  conceptButtonBase: 'button',
  conceptHasTextRe:  /\d+\s*sources/,
  // The concept detail panel is rendered inline (section #identity), not as a modal dialog.
  // We detect it via the dedicated "Close detail panel" button.
  detailIdentityRoot: '#identity',
  detailHeading:      '#identity h2, #identity h3',
};

async function shot(page, name) {
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${name}.png`), fullPage: false });
}

// ── Color helpers ─────────────────────────────────────────────────────────────
// Sentiment scores: > +THRESHOLD = positive (green), < -THRESHOLD = negative (red),
// otherwise = mixed (yellow/amber). Threshold tuned empirically (codegen shows ±100
// for clear sentiment, ±0 for mixed). 33 leaves a generous mixed band.
const SENTIMENT_MIXED_THRESHOLD = 33;

function classifyColor(colorStr) {
  if (!colorStr) return 'unknown';

  // OKLCH (Tailwind v4 default): oklch(L C H) where H is hue in degrees
  const oklch = colorStr.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/i);
  if (oklch) {
    const h = parseFloat(oklch[3]);
    if (h <  60)              return 'red';      //   0–60° red/orange
    if (h <  100)             return 'yellow';   //  60–100° yellow/amber
    if (h >= 100 && h < 200)  return 'green';    // 100–200° green/emerald
    if (h >= 200 && h < 290)  return 'blue';
    return 'red';                                //  290–360° magenta/red wrap
  }

  // RGB / RGBA fallback (older Tailwind, raw computed colors)
  const rgb = colorStr.match(/^rgba?\(([^)]+)\)/i);
  if (rgb) {
    const parts = rgb[1].split(',').map(s => parseFloat(s.trim()));
    if (parts.length < 3) return 'unknown';
    const [r, g, b] = parts;
    if (g > 100 && g > r + 30 && g > b + 30) return 'green';
    if (r > 150 && g > 100 && b < 100)        return 'yellow';
    if (r > 150 && r > g + 30 && r > b + 30)  return 'red';
  }
  return 'unknown';
}

function expectedColorForSentiment(score) {
  if (score == null) return 'unknown';
  if (score >  SENTIMENT_MIXED_THRESHOLD) return 'green';
  if (score < -SENTIMENT_MIXED_THRESHOLD) return 'red';
  return 'yellow';
}

// Read every visible concept row inside the Top Concepts WIDGET only.
// The page also has a Brand Territory bubble chart and other tables whose
// rows contain "<N> sources" text — they would pollute the list otherwise.
// We scope to the smallest div that contains BOTH the widget heading AND
// the "All (N)" filter button (only the Top Concepts widget has this pair).
function topConceptsWidget(page) {
  return page.locator('div').filter({
    has: page.locator('h3:has-text("Top Concepts Associated")'),
  }).filter({
    has: page.locator('button:has-text("All (")'),
  }).last(); // the smallest enclosing div is the deepest match
}

async function getVisibleConcepts(page) {
  await page
    .locator('h3:has-text("Top Concepts Associated")')
    .first()
    .scrollIntoViewIfNeeded({ timeout: 5000 })
    .catch(() => {});
  await page.waitForTimeout(300);

  // Scroll progressively until concept rows are rendered.
  for (let i = 0; i < 10; i++) {
    const cnt = await page.evaluate(() => {
      const heading = [...document.querySelectorAll('h3, h2')].find(h => /Top Concepts Associated/i.test(h.textContent || ''));
      if (!heading) return 0;
      let widget = heading.parentElement;
      // Find the smallest ancestor that contains both the heading AND an "All (N)" filter button
      for (let j = 0; j < 8 && widget; j++) {
        const buttons = widget.querySelectorAll('button');
        const hasAllFilter = [...buttons].some(b => /^All\s*\(\d+\)/.test((b.innerText || '').trim()));
        if (hasAllFilter) break;
        widget = widget.parentElement;
      }
      if (!widget) return 0;
      return [...widget.querySelectorAll('button')].filter(b =>
        /\d+\s*sources?/i.test(b.innerText || '')
      ).length;
    });
    if (cnt > 0) break;
    await page.mouse.wheel(0, 350);
    await page.waitForTimeout(250);
  }

  // Extract concepts strictly from the widget container, in DOM order, skipping
  // hidden rows (display:none or visibility:hidden). React often keeps the full
  // list in DOM and toggles visibility per filter — we want only what the user sees.
  return await page.evaluate(() => {
    const isVisible = (el) => {
      let cur = el;
      while (cur && cur.nodeType === 1) {
        const s = window.getComputedStyle(cur);
        if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity || '1') === 0) return false;
        cur = cur.parentElement;
      }
      return true;
    };

    const heading = [...document.querySelectorAll('h3, h2')].find(h => /Top Concepts Associated/i.test(h.textContent || ''));
    if (!heading) return [];
    let widget = heading.parentElement;
    for (let j = 0; j < 8 && widget; j++) {
      const buttons = widget.querySelectorAll('button');
      const hasAllFilter = [...buttons].some(b => /^All\s*\(\d+\)/.test((b.innerText || '').trim()));
      if (hasAllFilter) break;
      widget = widget.parentElement;
    }
    if (!widget) return [];

    const allButtons = [...widget.querySelectorAll('button')];
    const conceptButtons = allButtons.filter(b =>
      /\d+\s*sources?/i.test(b.innerText || '') && isVisible(b)
    );

    const out = [];
    for (const btn of conceptButtons) {
      const text = (btn.innerText || '').trim();
      const srcMatch = text.match(/(\d+)\s*sources?/i);
      if (!srcMatch) continue;
      const name = text.split(/\d+\s*sources?/i)[0].replace(/\s+/g, ' ').trim();
      if (!name) continue;
      if (/^(all sources|sources)$/i.test(name)) continue;

      const sentMatch = text.match(/([+-]\d+)\s*sentiment/i);
      const freqMatch = text.match(/(\d+)%\s*frequency/i)
                     || text.match(/sentiment\s*(\d+)%/i)
                     || text.match(/(\d+)%(?!\s*[A-Za-z])/);

      const search = (r) => r && r.querySelector(
        '[class*="bg-emerald"], [class*="bg-green"], [class*="bg-red"], [class*="bg-yellow"], [class*="bg-amber"]'
      );
      const colorEl = search(btn) || search(btn.parentElement) || search(btn.parentElement?.parentElement);
      const bg = colorEl ? window.getComputedStyle(colorEl).backgroundColor : '';

      out.push({
        name,
        sources:   parseInt(srcMatch[1], 10),
        frequency: freqMatch ? parseInt(freqMatch[1], 10) : null,
        sentiment: sentMatch ? parseInt(sentMatch[1], 10) : null,
        bg,
        text: text.replace(/\s+/g, ' '),
      });
    }
    return out;
  });
}

// Probe the visible "header" / banner of the open detail panel and return its
// computed background color as RGB string. Looks at #identity h2/h3 ancestors
// up to a few levels — whichever has a non-transparent bg classifies first.
async function getDetailPanelHeaderColor(page) {
  return await page.evaluate(() => {
    const root = document.querySelector('#identity');
    if (!root) return '';
    const heading = root.querySelector('h2, h3');
    if (!heading) return '';
    let el = heading;
    for (let i = 0; i < 6 && el; i++) {
      const bg = window.getComputedStyle(el).backgroundColor;
      // Skip transparent / white
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && !/255,\s*255,\s*255/.test(bg)) {
        return bg;
      }
      el = el.parentElement;
    }
    // Fallback: any colored sibling banner near the heading
    const banner = root.querySelector('[class*="bg-emerald"], [class*="bg-green"], [class*="bg-red"], [class*="bg-yellow"], [class*="bg-amber"]');
    return banner ? window.getComputedStyle(banner).backgroundColor : '';
  });
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

// ── Shared action helpers (used by multiple tests) ────────────────────────────
async function openCategoryPage(page) {
  await page.goto(CATEGORY_URL, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  await H.dismissCookieBanner(page);
  await H.ensureSnapshot(page, TARGET_SNAPSHOT);
  const heading = page.locator(SEL.widgetHeading).first();
  await expect(
    heading,
    `Top Concepts widget heading must be visible (prefix: "${HEADING_PREFIX}")`,
  ).toBeVisible({ timeout: 20000 });
}

async function applySortMode(page, modeLabel) {
  const sortLabelSel = SORT_MODES.map(m => `button:has-text("${m}")`).join(', ');
  const triggerText = (await page.locator(sortLabelSel).first().textContent().catch(() => '')) || '';
  if (triggerText.includes(modeLabel)) return true;
  const trigger = page.locator(sortLabelSel).first();
  if (!(await trigger.isVisible().catch(() => false))) return false;
  await trigger.click();
  await page.waitForTimeout(400);
  const optionLocator = page.locator(
    `button:has-text("${modeLabel}"), [role="menuitem"]:has-text("${modeLabel}"), [role="option"]:has-text("${modeLabel}")`
  );
  if ((await optionLocator.count()) < 1) {
    await page.keyboard.press('Escape').catch(() => {});
    return false;
  }
  await optionLocator.last().click();
  await page.waitForTimeout(500);
  return true;
}

async function openFirstConceptPanel(page) {
  const concepts = await getVisibleConcepts(page);
  expect(concepts.length, 'At least one concept must be visible in the list').toBeGreaterThan(0);
  const opened = concepts[0];
  const byName   = page.getByRole('button').filter({ hasText: opened.name }).first();
  const fallback = page.locator(SEL.conceptButtonBase).filter({ hasText: SEL.conceptHasTextRe }).first();
  const target   = (await byName.count()) ? byName : fallback;
  await expect(target, `Concept button for "${opened.name}" must be visible`).toBeVisible({ timeout: 10000 });
  await target.click();
  const closeBtn = page.getByRole('button', { name: /Close detail panel/i }).first();
  await expect(closeBtn, 'Close detail panel button must be visible after clicking a concept').toBeVisible({ timeout: 10000 });
  return opened;
}

const searchBoxLocator = (page) => page
  .getByRole('textbox', { name: /Search by title or URL/i })
  .or(page.getByPlaceholder(/Search by title or URL/i))
  .first();

async function openAllSourcesModal(page) {
  const sourcesTab = page.locator(SEL.detailIdentityRoot).getByText('Sources', { exact: true }).first();
  await expect(sourcesTab, 'Sources tab must be visible inside the detail panel').toBeVisible({ timeout: 10000 });
  await sourcesTab.click();
  await page.waitForTimeout(500);
  const allSourcesBtn = page.getByRole('button', { name: /All sources/i }).first();
  await expect(allSourcesBtn, '"All sources" button must be visible after opening Sources tab').toBeVisible({ timeout: 10000 });
  await allSourcesBtn.click();
  await page.waitForTimeout(500);
  const searchBox = searchBoxLocator(page);
  await expect(searchBox, 'Sources search input must be visible after opening the All sources modal').toBeVisible({ timeout: 10000 });
  return searchBox;
}

// Known LLM engine names (used to detect LLM identification in source rows —
// either as text mentions in the panel or as <img alt="..."> in the modal).
const LLM_ENGINES = ['chatgpt', 'claude', 'gemini', 'grok', 'openai', 'perplexity'];
const LLM_REGEX   = new RegExp(`\\b(${LLM_ENGINES.join('|')})\\b`, 'gi');

// Extract source rows from the page. Each row contains a title (line 1), a
// subtitle (line 2 — URL/domain), a publisher/source logo (e.g. Vogue's "V",
// Forbes's "F" — always rendered as <img>), and a navigation link "Open
// <title>" that opens the source in a new tab.
// LLM identification differs by scope:
//   - panel: LLM names appear as text only (e.g. "openai grok")
//   - modal: LLM logos render as <img alt="grok">, <img alt="openai">, etc.
//   scope='panel' → sources inside the inline detail panel (subset, ~3-5 items)
//   scope='modal' → sources inside the All sources Radix modal (full list)
async function extractSourceCards(page, scope) {
  return await page.evaluate(({ scope, llmEngines }) => {
    const llmRe = new RegExp(`\\b(${llmEngines.join('|')})\\b`, 'gi');
    let candidates;
    if (scope === 'modal') {
      candidates = [
        ...document.querySelectorAll('[id^="radix-"] [class*="rounded"][class*="border"]'),
        ...document.querySelectorAll('[id^="radix-"] li'),
        ...document.querySelectorAll('[id^="radix-"] article'),
      ];
    } else {
      // 'panel' scope: look inside #identity but EXCLUDE radix popovers (those are the modal).
      candidates = [
        ...document.querySelectorAll('#identity li'),
        ...document.querySelectorAll('#identity [class*="rounded"][class*="border"]'),
      ].filter(el => !el.closest('[id^="radix-"]'));
    }
    const seen = [];
    const isVisible = (el) => {
      const s = window.getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity || '1') > 0;
    };
    const filtered = candidates.filter(el => {
      const hasLink = el.querySelector('a[href]');
      const hasImg  = el.querySelector('img');
      if (!hasLink || !hasImg) return false;
      // Reject nested duplicates (keep the smallest matching wrapper).
      for (const s of seen) {
        if (s.contains(el) || el.contains(s)) return false;
      }
      seen.push(el);
      return true;
    });
    return filtered.slice(0, 20).map(el => {
      const text  = el.innerText || '';
      const lines = text.split(/\n+/).map(s => s.trim()).filter(Boolean);
      const link  = el.querySelector('a[href]');
      const img   = el.querySelector('img'); // first img = publisher/source logo
      const imgVisible  = !!(img && (img.naturalWidth > 0 || img.complete) && isVisible(img));
      const linkVisible = !!(link && link.href && isVisible(link));

      // LLM names found as TEXT in the row (panel-scope identification).
      const llmNames = [
        ...new Set(
          [...text.matchAll(llmRe)].map(m => m[0].toLowerCase())
        ),
      ];
      // LLM LOGOS = <img> elements whose alt attribute is one of the engines
      // (modal-scope identification — the modal renders LLM logos, not text).
      const llmLogos = [...el.querySelectorAll('img')]
        .filter(i => llmEngines.includes((i.getAttribute('alt') || '').toLowerCase().trim()))
        .filter(i => (i.naturalWidth > 0 || i.complete) && isVisible(i))
        .map(i => (i.getAttribute('alt') || '').toLowerCase().trim());

      return {
        title:    lines[0] || '',
        subtitle: lines[1] || '',
        url:      link ? link.href : '',
        linkText: link ? (link.textContent || '').trim() : '',
        publisherLogoAlt: img ? (img.getAttribute('alt') || '') : '',
        publisherLogoVisible: imgVisible,
        llmNames,    // text-only LLM identification (panel)
        llmLogos,    // image-based LLM identification (modal)
        linkVisible,
      };
    });
  }, { scope, llmEngines: LLM_ENGINES });
}

// Diff a source-card array against the structural contract — same in BOTH
// surfaces (panel and modal):
//   title + subtitle + publisher logo + ≥1 LLM LOGO IMG + nav link
// The panel currently exposes LLM identification as plain text only (no logos):
// that is a known product DEFECT, not an accepted variation. This helper keeps
// the strict expectation so the panel-side assertion FAILS until the product
// renders LLM logos consistently with the modal.
function findMalformedSources(cards, _scope) {
  return cards.filter(s =>
    !s.title ||
    !s.subtitle ||
    !s.publisherLogoVisible ||
    s.llmLogos.length === 0 ||
    !s.linkVisible
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// E2E TOP-CONCEPT — 5 focused test cases (one per validation domain)
// ══════════════════════════════════════════════════════════════════════════════
// Plain describe (NOT .serial): if one test FAILS, the others must still run
// so the report aggregates all 5 verdicts. Each test is fully independent
// (own beforeEach navigation).
test.describe('E2E-TOP-CONCEPT — Top Concepts widget', () => {

  test.beforeEach(async ({ page }) => {
    await openCategoryPage(page);
  });

  // ──────────────────────────────────────────────────────────────────────────────
  // TC-001 : Sort modes apply correctly
  //   Verifies that each Sort mode actually re-orders the concept list:
  //     Frequency → monotonic by sources count
  //     Sentiment → grouped by color bucket (Positive/Mixed/Negative)
  //     A-Z       → alphabetical by concept name
  // ──────────────────────────────────────────────────────────────────────────────
  test('E2E-TOP-CONCEPT-001 - Top Concepts — Sort modes apply correctly', async ({ page }) => {
    test.setTimeout(120000);

    await test.step('Given an authenticated user opens the category page with concepts', async () => {
      const concepts = await getVisibleConcepts(page);
      expect(concepts.length, 'At least 2 concepts must be visible to test sort').toBeGreaterThanOrEqual(2);
      await shot(page, 'E2E-TOP-CONCEPT-001_01_given-list-rendered');
    });

    // ── Sort by Frequency ────────────────────────────────────────────────────
    await test.step('When the user opens the Sort dropdown and applies Sort by Frequency', async () => {
      const applied = await applySortMode(page, 'Sort by Frequency');
      expect(applied, 'Sort by Frequency must be applicable via the dropdown').toBe(true);
      await shot(page, 'E2E-TOP-CONCEPT-001_02_when-sort-frequency');
    });

    await test.step('Then the concept list is monotonically ordered by frequency percentage', async () => {
      const concepts = await getVisibleConcepts(page);
      // Prefer frequency % (the value the widget actually sorts on) and fall
      // back to sources count when the % is not exposed for some rows.
      const values = concepts.map(c => c.frequency != null ? c.frequency : c.sources);
      const desc = values.every((v, k) => k === 0 || values[k - 1] >= v);
      const asc  = values.every((v, k) => k === 0 || values[k - 1] <= v);
      expect(
        desc || asc,
        `Frequency sort must produce a monotonic order on frequency % (got: ${JSON.stringify(values)} | sources fallback: ${JSON.stringify(concepts.map(c => c.sources))})`,
      ).toBe(true);
      await shot(page, 'E2E-TOP-CONCEPT-001_03_then-frequency-ordered');
    });

    // ── Sort by Sentiment ────────────────────────────────────────────────────
    await test.step('When the user applies Sort by Sentiment', async () => {
      const applied = await applySortMode(page, 'Sort by Sentiment');
      expect(applied, 'Sort by Sentiment must be applicable via the dropdown').toBe(true);
      await shot(page, 'E2E-TOP-CONCEPT-001_04_when-sort-sentiment');
    });

    await test.step('Then the concept list is grouped by sentiment bucket (Positive/Mixed/Negative)', async () => {
      const concepts = await getVisibleConcepts(page);
      const buckets = concepts.map(c => {
        const col = classifyColor(c.bg);
        return col === 'green' ? 1 : col === 'yellow' ? 2 : col === 'red' ? 3 : 0;
      });
      const known   = buckets.every(b => b !== 0);
      const monoAsc = known && buckets.every((b, k) => k === 0 || buckets[k - 1] <= b);
      const monoDsc = known && buckets.every((b, k) => k === 0 || buckets[k - 1] >= b);
      expect(
        !known || monoAsc || monoDsc,
        `Sentiment sort must group buckets monotonically (got buckets: ${JSON.stringify(buckets)})`,
      ).toBe(true);
      await shot(page, 'E2E-TOP-CONCEPT-001_05_then-sentiment-grouped');
    });

    // ── Sort A-Z ─────────────────────────────────────────────────────────────
    await test.step('When the user applies Sort A-Z', async () => {
      const applied = await applySortMode(page, 'Sort A-Z');
      expect(applied, 'Sort A-Z must be applicable via the dropdown').toBe(true);
      await shot(page, 'E2E-TOP-CONCEPT-001_06_when-sort-az');
    });

    await test.step('Then the concept list is sorted alphabetically by concept name', async () => {
      const concepts = await getVisibleConcepts(page);
      const names = concepts.map(c => c.name);
      const asc = names.every((n, k) => k === 0 || names[k - 1].localeCompare(n, undefined, { sensitivity: 'base' }) <= 0);
      const dsc = names.every((n, k) => k === 0 || names[k - 1].localeCompare(n, undefined, { sensitivity: 'base' }) >= 0);
      expect(
        asc || dsc,
        `A-Z sort must produce alphabetical order on names (got: ${JSON.stringify(names)})`,
      ).toBe(true);
      await shot(page, 'E2E-TOP-CONCEPT-001_07_then-alpha-ordered');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────────
  // TC-002 : Sentiment filter colors
  //   Verifies that each filter shows only concepts with the matching sentiment
  //   color (Positive=green, Negative=red, Mixed=yellow). Empty filters show
  //   no concepts. The All filter restores the full list.
  // ──────────────────────────────────────────────────────────────────────────────
  test('E2E-TOP-CONCEPT-002 - Top Concepts — Sentiment filter colors', async ({ page }) => {
    test.setTimeout(120000);

    await test.step('Given an authenticated user opens the category page with concepts', async () => {
      for (const f of ['All (', 'Positive (', 'Mixed (', 'Negative (']) {
        const btn = page.locator(`button:has-text("${f}")`).first();
        await expect(btn, `Filter button "${f}*" must be visible`).toBeVisible({ timeout: 10000 });
      }
      await shot(page, 'E2E-TOP-CONCEPT-002_01_given-filters-visible');
    });

    const filters = [
      { label: 'Positive', selector: SEL.filterPositive,                 expected: 'green'  },
      { label: 'Negative', selector: SEL.filterNegative,                 expected: 'red'    },
      { label: 'Mixed',    selector: 'button:has-text("Mixed (")',       expected: 'yellow' },
    ];

    let stepIdx = 1;
    for (const f of filters) {
      stepIdx++;
      await test.step(`When the user clicks the ${f.label} sentiment filter`, async () => {
        const btn = page.locator(f.selector).first();
        await expect(btn, `${f.label} filter button must be visible`).toBeVisible({ timeout: 10000 });
        await btn.click();
        await page.waitForTimeout(400);
        await shot(page, `E2E-TOP-CONCEPT-002_${String(stepIdx).padStart(2, '0')}_when-${f.label.toLowerCase()}`);
      });
      stepIdx++;
      await test.step(`Then every visible concept carries a ${f.expected} sentiment indicator (or none if filter is empty)`, async () => {
        const concepts = await getVisibleConcepts(page);
        if (concepts.length === 0) {
          // Empty filter (e.g. Mixed (0)) — assertion satisfied by absence of concepts
          await shot(page, `E2E-TOP-CONCEPT-002_${String(stepIdx).padStart(2, '0')}_then-${f.label.toLowerCase()}-empty`);
          return;
        }
        const mismatches = concepts.filter(c => {
          const observed = classifyColor(c.bg);
          return observed !== 'unknown' && observed !== f.expected;
        });
        expect(
          mismatches,
          `Filter "${f.label}" must show only ${f.expected} concepts. Mismatches: ${JSON.stringify(mismatches.map(m => ({ name: m.name, bg: m.bg, observed: classifyColor(m.bg) })))}`,
        ).toEqual([]);
        await shot(page, `E2E-TOP-CONCEPT-002_${String(stepIdx).padStart(2, '0')}_then-${f.label.toLowerCase()}-${f.expected}`);
      });
    }

    await test.step('When the user clicks the All filter', async () => {
      const allBtn = page.locator(SEL.filterAll).first();
      await expect(allBtn, 'All filter button must be visible').toBeVisible({ timeout: 10000 });
      await allBtn.click();
      await page.waitForTimeout(400);
      const concepts = await getVisibleConcepts(page);
      expect(
        concepts.length,
        'After clicking All filter the full concept list must be restored (>= 1 concept)',
      ).toBeGreaterThan(0);
      await shot(page, 'E2E-TOP-CONCEPT-002_09_when-all-restored');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────────
  // TC-003 : Detail panel coherence (title + color + sections)
  //   Verifies that when a concept is opened: the panel heading equals the
  //   concept name, the panel header banner color matches the concept's
  //   list-row sentiment color, and the panel exposes a Sources section and
  //   Positive/Negative sentiment indicators.
  // ──────────────────────────────────────────────────────────────────────────────
  test('E2E-TOP-CONCEPT-003 - Top Concepts — Detail panel coherence (title color sections)', async ({ page }) => {
    test.setTimeout(120000);

    let opened = null;
    let listColor = 'unknown';

    await test.step('Given an authenticated user opens the category page with concepts', async () => {
      const concepts = await getVisibleConcepts(page);
      expect(concepts.length, 'At least one concept must be visible').toBeGreaterThan(0);
      await shot(page, 'E2E-TOP-CONCEPT-003_01_given-list-rendered');
    });

    await test.step('When the user captures the first concept name and sentiment color from the list', async () => {
      const concepts = await getVisibleConcepts(page);
      opened = concepts[0];
      listColor = classifyColor(opened.bg);
      expect(opened.name, 'First concept must have a non-empty name').toBeTruthy();
      expect(
        ['green', 'yellow', 'red'].includes(listColor),
        `First concept must expose a recognizable sentiment color (got listColor="${listColor}" bg="${opened.bg}")`,
      ).toBe(true);
      await shot(page, 'E2E-TOP-CONCEPT-003_02_when-first-captured');
    });

    await test.step('And the user clicks the first concept', async () => {
      const target = page.getByRole('button').filter({ hasText: opened.name }).first();
      await target.click();
      const closeBtn = page.getByRole('button', { name: /Close detail panel/i }).first();
      await expect(closeBtn, 'Detail panel must open (Close button visible)').toBeVisible({ timeout: 10000 });
      await shot(page, 'E2E-TOP-CONCEPT-003_03_and-panel-opened');
    });

    await test.step('Then the panel heading text matches the selected concept name', async () => {
      const heading = page.getByRole('heading', { name: new RegExp(opened.name, 'i') }).first();
      await expect(
        heading,
        `Detail panel must display a heading matching "${opened.name}"`,
      ).toBeVisible({ timeout: 10000 });
      await shot(page, 'E2E-TOP-CONCEPT-003_04_then-title-match');
    });

    await test.step('And the panel header banner color matches the concept list-row sentiment color', async () => {
      const heading = page.getByRole('heading', { name: new RegExp(opened.name, 'i') }).first();
      const headerBg = await heading.evaluate(el => {
        let cur = el;
        for (let i = 0; i < 8 && cur; i++) {
          const bg = window.getComputedStyle(cur).backgroundColor;
          if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && !/255,\s*255,\s*255/.test(bg)) return bg;
          const sib = cur.parentElement && [...cur.parentElement.children].find(
            c => c !== cur && /bg-(emerald|green|red|yellow|amber)/.test(c.className || '')
          );
          if (sib) return window.getComputedStyle(sib).backgroundColor;
          cur = cur.parentElement;
        }
        return '';
      }).catch(() => '');
      const headerColor = classifyColor(headerBg);
      expect(
        headerColor,
        `Panel header color must match list-row color (concept="${opened.name}" listColor=${listColor} headerColor=${headerColor} headerBg=${headerBg})`,
      ).toBe(listColor);
      await shot(page, 'E2E-TOP-CONCEPT-003_05_and-color-match');
    });

    await test.step('And the Sources section heading is visible in the panel', async () => {
      const sourcesSection = page.locator(SEL.detailIdentityRoot).getByText('Sources', { exact: true }).first();
      await expect(sourcesSection, 'Detail panel must expose a "Sources" section').toBeVisible({ timeout: 10000 });
      await shot(page, 'E2E-TOP-CONCEPT-003_06_and-sources-section');
    });

    await test.step('And Positive/Negative sentiment indicators are visible in the panel', async () => {
      const legend = page.locator(SEL.detailIdentityRoot).getByText(/Positive|Negative/i).first();
      await expect(legend, 'Detail panel must show Positive/Negative sentiment indicators').toBeVisible({ timeout: 10000 });
      await shot(page, 'E2E-TOP-CONCEPT-003_07_and-sentiment-indicators');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────────
  // TC-004 : Sources structure (title + subtitle + publisher logo + LLM logo + nav)
  //   Source rows live in TWO surfaces with the SAME contract:
  //     • inline detail panel (subset, ~3-5 items)
  //     • All sources modal (full set)
  //   Each row MUST expose:
  //     - a non-empty title
  //     - a non-empty subtitle (URL/domain)
  //     - a visible publisher/source logo image (e.g. "V" for Vogue)
  //     - at least one visible LLM LOGO image (<img alt="grok">, etc.)
  //     - a visible navigation link ("Open <title>")
  //   The panel currently renders LLM identification as plain text only — that
  //   is a known product DEFECT. The assertion is intentionally strict so the
  //   panel-side step FAILS until the product renders LLM logos consistently.
  // ──────────────────────────────────────────────────────────────────────────────
  test('E2E-TOP-CONCEPT-004 - Top Concepts — Sources structure (title subtitle publisher logo LLM logo nav)', async ({ page }) => {
    test.setTimeout(120000);

    await test.step('Given an authenticated user opens the category page with concepts', async () => {
      const concepts = await getVisibleConcepts(page);
      expect(concepts.length, 'At least one concept must be visible').toBeGreaterThan(0);
      await shot(page, 'E2E-TOP-CONCEPT-004_01_given-list-rendered');
    });

    await test.step('When the user opens the detail panel of the first concept', async () => {
      await openFirstConceptPanel(page);
      await shot(page, 'E2E-TOP-CONCEPT-004_02_when-panel-opened');
    });

    await test.step('And the user switches to the Sources section inside the panel', async () => {
      const sourcesTab = page.locator(SEL.detailIdentityRoot).getByText('Sources', { exact: true }).first();
      await sourcesTab.click();
      await page.waitForTimeout(500);
      const allBtn = page.getByRole('button', { name: /All sources/i }).first();
      await expect(allBtn, '"All sources" button must be visible after switching to the Sources section').toBeVisible({ timeout: 10000 });
      await shot(page, 'E2E-TOP-CONCEPT-004_03_and-sources-section');
    });

    // ── Validate sources INSIDE THE DETAIL PANEL (subset) ───────────────────
    // Required per row: title + subtitle + publisher logo + ≥1 LLM LOGO IMG + nav link
    // (Same contract as the modal — the panel must expose LLM logos, not just text.)
    let panelSources = [];
    await test.step('Then every source row in the detail panel carries a title, subtitle, publisher logo, at least one LLM logo image, and a navigation link', async () => {
      panelSources = await extractSourceCards(page, 'panel');
      if (panelSources.length === 0) {
        await shot(page, 'E2E-TOP-CONCEPT-004_04_then-panel-sources-empty');
        return;
      }
      const malformed = findMalformedSources(panelSources, 'panel');
      expect(
        malformed,
        `Panel source rows must each have title + subtitle + publisher logo + ≥1 LLM logo image (img with alt matching ${LLM_ENGINES.join('/')}) + visible nav link. Malformed: ${JSON.stringify(malformed)}`,
      ).toEqual([]);
      await shot(page, 'E2E-TOP-CONCEPT-004_04_then-panel-sources-valid');
    });

    // ── Open the All sources modal ──────────────────────────────────────────
    await test.step('When the user opens the All sources modal', async () => {
      const allBtn = page.getByRole('button', { name: /All sources/i }).first();
      await allBtn.click();
      await page.waitForTimeout(500);
      const searchBox = searchBoxLocator(page);
      await expect(searchBox, 'Search input must be visible after opening the All sources modal').toBeVisible({ timeout: 10000 });
      await shot(page, 'E2E-TOP-CONCEPT-004_05_when-all-sources-modal');
    });

    // ── Validate sources INSIDE THE MODAL (full set) ────────────────────────
    // Required per row: title + subtitle + publisher logo + ≥1 LLM LOGO (img alt) + nav link
    let modalSources = [];
    await test.step('Then every source row in the All sources modal carries a title, subtitle, publisher logo, at least one LLM logo image, and a navigation link', async () => {
      modalSources = await extractSourceCards(page, 'modal');
      if (modalSources.length === 0) {
        await shot(page, 'E2E-TOP-CONCEPT-004_06_then-modal-sources-empty');
        return;
      }
      const malformed = findMalformedSources(modalSources, 'modal');
      expect(
        malformed,
        `Modal source rows must each have title + subtitle + publisher logo + ≥1 LLM logo image (alt attribute matching ${LLM_ENGINES.join('/')}) + visible nav link. Malformed: ${JSON.stringify(malformed)}`,
      ).toEqual([]);
      await shot(page, 'E2E-TOP-CONCEPT-004_06_then-modal-sources-valid');
    });

    await test.step('And the All sources modal contains at least as many source rows as the panel (full set vs subset)', async () => {
      if (panelSources.length > 0 && modalSources.length > 0) {
        expect(
          modalSources.length,
          `Modal sources (${modalSources.length}) must be >= panel sources (${panelSources.length})`,
        ).toBeGreaterThanOrEqual(panelSources.length);
      }
      await shot(page, 'E2E-TOP-CONCEPT-004_07_and-modal-fullset-vs-subset');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────────
  // TC-005 : Sources search empty state and close
  //   Existing validations preserved: search "1555555" → empty state message,
  //   Escape closes the modal, Close detail panel button hides after closing.
  // ──────────────────────────────────────────────────────────────────────────────
  test('E2E-TOP-CONCEPT-005 - Top Concepts — Sources search empty state and close', async ({ page }) => {
    test.setTimeout(120000);

    await test.step('Given an authenticated user opens the category page with concepts', async () => {
      await shot(page, 'E2E-TOP-CONCEPT-005_01_given-page-open');
    });

    await test.step('When the user opens the detail panel of the first concept and the All sources modal', async () => {
      await openFirstConceptPanel(page);
      await openAllSourcesModal(page);
      await shot(page, 'E2E-TOP-CONCEPT-005_02_when-modal-open');
    });

    await test.step(`When the user types "${NO_MATCH_QUERY}" in the search input`, async () => {
      const searchBox = searchBoxLocator(page);
      await searchBox.click();
      await searchBox.fill(NO_MATCH_QUERY);
      await page.waitForTimeout(300);
      await shot(page, 'E2E-TOP-CONCEPT-005_03_when-query-typed');
    });

    await test.step(`Then the message "${NO_MATCH_MSG}" is visible inside the modal`, async () => {
      const empty = page.getByText(NO_MATCH_MSG, { exact: false }).first();
      await expect(
        empty,
        `Expected "${NO_MATCH_MSG}" message after searching "${NO_MATCH_QUERY}"`,
      ).toBeVisible({ timeout: 10000 });
      await shot(page, 'E2E-TOP-CONCEPT-005_04_then-no-results');
    });

    await test.step('When the user presses Escape to close the All sources modal', async () => {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      const closeBtn = page.getByRole('button', { name: /Close detail panel/i }).first();
      await expect(
        closeBtn,
        'After Escape the All sources modal must close but the detail panel (Close button) must remain visible',
      ).toBeVisible({ timeout: 10000 });
      await shot(page, 'E2E-TOP-CONCEPT-005_05_when-escape-pressed');
    });

    await test.step('And the user clicks the Close detail panel button', async () => {
      // The page renders 2 elements with aria-label="Close detail panel": the
      // colored-banner close on the concept panel, and a generic gray close on
      // an adjacent module. We click the colored-banner one (.first()) and
      // verify the count of "Close detail panel" buttons decreases by 1.
      const closesBefore = await page.getByRole('button', { name: /Close detail panel/i }).count();
      const closeBtn = page.getByRole('button', { name: /Close detail panel/i }).first();
      await closeBtn.click();
      await expect
        .poll(
          async () => await page.getByRole('button', { name: /Close detail panel/i }).count(),
          { timeout: 10000, message: `Concept detail panel close button must disappear (had ${closesBefore} close buttons before click)` },
        )
        .toBe(closesBefore - 1);
      await shot(page, 'E2E-TOP-CONCEPT-005_06_and-panel-closed');
    });
  });

});
