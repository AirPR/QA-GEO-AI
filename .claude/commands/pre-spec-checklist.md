# Pre-Spec Checklist — Confirmed Implementation Patterns

Call before any Playwright E2E spec generation or modification.
Trigger with `/pre-spec-checklist`.

---

## 1. Portability — mandatory env vars

Every **category page** spec must read UUIDs from the environment:

```js
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID  || 'hardcoded-fallback-uuid';
const CATEGORY_UUID   = process.env.CATEGORY_UUID   || 'hardcoded-fallback-uuid';
const TARGET_SNAPSHOT = process.env.TARGET_SNAPSHOT || null;
```

Launch:
```bash
SPEC_NAME=my-spec USE_AUTH=true DASHBOARD_UUID=xxx CATEGORY_UUID=yyy TARGET_SNAPSHOT="05 mai" \
  npx playwright test "my-spec.spec.js" --project=chromium
```

---

## 2. Category pages — Performance tab

KPI cards are found under the **Performance** tab (not Identity or Sources).
Always click the tab after navigation, before any KPI assertion:

```js
const perfTab = page.locator('[role="tab"]:has-text("Performance"), button:has-text("Performance")').first();
if (await perfTab.isVisible({ timeout: 5000 }).catch(() => false)) {
  await perfTab.click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
}
```

---

## 3. Snapshot navigator — two patterns per page type

### Pattern A — Category pages (dropdown)
The navigator is a `<button>` that opens a dropdown menu:

```js
async function ensureSnapshot(page, targetLabel) {
  if (!targetLabel) return;
  const snapBtn = page.locator('button:has-text("Analysis —")').first();
  if (!await snapBtn.isVisible({ timeout: 3000 }).catch(() => false)) return;
  if ((await snapBtn.textContent()).includes(targetLabel)) return;
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
```

### Pattern B — Overview/dashboard pages (dropdown list, epic102)
The navigator displays ALL dates simultaneously in its text.
Check if `fullText.includes(targetLabel)` then click directly on the target text.

---

## 4. KPI cards — confirmed selectors

```js
const SEL = {
  // Prefix ^= mandatory — aria-label may have suffixes (": not available", ": Your overall...")
  kpiCard:    (name) => `div[aria-label^="${name}"]`,

  // Numeric value inside the card
  kpiValue:   'p.font-medium',

  // (i) info button — aria-label starts with "<name>:"
  kpiInfoBtn: (name) => `div[aria-label^="${name}"] button[aria-label^="${name}:"]`,

  // Radix UI Tooltip
  tooltip:    '[role="tooltip"]',
};
```

**Standard KPI_NAMES:** `['Share of Voice', 'Visibility', 'Avg Position', 'LLM Choice', 'Sentiment']`

**Expected formats:**
```js
const FORMAT = {
  'Share of Voice': { regex: /^\d+(\.\d+)?%$/,       desc: 'percentage (e.g. 15%)'     },
  'Visibility':     { regex: /^\d+(\.\d+)?%$/,       desc: 'percentage (e.g. 94%)'     },
  'Avg Position':   { regex: /^#\d+$/,               desc: 'position (e.g. #3)'        },
  'LLM Choice':     { regex: /^\d+(\.\d+)?%$/,       desc: 'percentage (e.g. 63%)'     },
  'Sentiment':      { regex: /^[+\-]?\d+(\.\d+)?$/,  desc: 'signed score (e.g. +42)'   },
};
```

---

## 5. Radix UI Tooltips — hover, not click

The `(i)` buttons trigger the tooltip on **hover** only (not click).

```js
await infoBtn.hover();
const tooltip = page.locator('[role="tooltip"]').first();
await expect(tooltip).toBeVisible({ timeout: 4000 });
const tooltipText = (await tooltip.textContent()).trim();
expect(tooltipText).toBe(EXPECTED_TEXT); // exact check, not toContain()
// Dismiss
await page.mouse.move(0, 0);
await page.waitForTimeout(300);
```

**KPI tooltip texts (reference):**
```js
const TOOLTIP_EXPECTED = {
  'Share of Voice': "Your overall brand presence across AI responses. Each mention of your brand or its product variants counts separately. If Nike Air Max and Nike Pegasus both appear in the same answer, that's 2 mentions. Recommendations where AI engines pick your brand first also count. Range 0–100%.",
  'Visibility':     'How often your brand is named in AI responses, regardless of rank. Range 0–100%. 75% means your brand was cited in 75% of relevant questions across the selected AI engines.',
  'Avg Position':   'Your typical rank when an AI engine lists brands. Lower is better. #1 means you are usually named first in the response.',
  'LLM Choice':     'Your win rate on head-to-head competitive questions. 100% means AI engines always pick your brand over the named competitors.',
  'Sentiment':      'Average tone of how AI engines describe your brand, scored –100 (negative) to +100 (positive).',
};
```

---

## 6. Error element capture — MANDATORY before any assertion

For any assertion on a visible element, take `shotAt` BEFORE `.toBe()` / `.toEqual()`:

```js
// Mandatory on any element that could fail
await shotAt(page, element, `${TC_ID}_step_description`);
expect(actualValue).toBe(expectedValue);
```

**Critical cases where afterEach CANNOT annotate automatically:**
- Tooltips, dropdowns, modals — disappear before afterEach runs
- `.toBe()` / `.toEqual()` assertions on values — no CSS selector in the error
- Given/When steps — only `step3_then` is overwritten by afterEach

## 7. Checklist before generating a spec

- [ ] Inspect DOM in headless mode before writing selectors (`node -e "..."` + Playwright)
- [ ] Check if the page has tabs → click the correct one before asserting
- [ ] Check the snapshot navigator type (dropdown or list) → choose the correct pattern
- [ ] Add `DASHBOARD_UUID` / `CATEGORY_UUID` / `TARGET_SNAPSHOT` as env vars
- [ ] Update `selectors_blueprint.json` with new selectors
- [ ] Import `BLUEPRINT` in the spec
- [ ] Use `H.registerAfterEach(SCREENSHOTS_DIR)` (e2e-helpers)

## 7. Checklist after modifying a TC

- [ ] Update the **CSV** (rows of the modified TC)
- [ ] Manually update the **real.json** (steps[] — `refreshRealFromRaw` does not do this)
- [ ] Re-run the test to update the raw JSON
- [ ] Regenerate the report (`node build-e2e-suite-report.js`)
