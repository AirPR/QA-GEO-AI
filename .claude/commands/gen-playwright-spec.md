---
name: gen-playwright-spec
description: Generates a complete Playwright E2E spec for a new feature or page. Produces the JS spec, initial real.json, and updates selectors_blueprint.json. Trigger with /gen-playwright-spec.
---

<command-name>gen-playwright-spec</command-name>

# Skill : Playwright E2E Spec Generation

## Trigger
```
/gen-playwright-spec --spec SPEC_NAME --feature "FEATURE_DESCRIPTION"
```
Example: `/gen-playwright-spec --spec category-live-analysis --feature "GEO-88 Live Analysis Progress on category page"`

## Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| `--spec` | yes | Spec name (snake-case) — e.g. `category-live-analysis` |
| `--feature` | yes | Short description of the covered feature |
| `--page-type` | no | `category` \| `dashboard` \| `list` (default: `dashboard`) |
| `--profile` | no | JDD profile to use (default: `default`) |

The user also provides: TC list (Given/When/Then), UUIDs (dashboard, category), and target snapshot if applicable.

---

## Step 1 — Reading Sources

Read in order:
1. `.claude/Data/raw/test-data/selectors_blueprint.json` — identify existing sections for the target page
2. `.claude/Data/raw/playwright/e2e-helpers.js` — API of available helpers
3. An existing spec of the same page type as reference:
   - Category page → `category-perception-citation.spec.js`
   - Dashboard → `GEO-dashboard-overview.spec.js`
   - List → `manage-scope.spec.js`
4. Existing JDDs in `.claude/Data/raw/test-data/jdd/` to understand the expected structure

---

## Step 2 — TC Analysis

For each Given/When/Then TC:
- Identify UI elements to locate (headings, buttons, tables, drawers, modals)
- Check if a selector already exists in the blueprint → reuse it
- List new selectors to add to the blueprint
- Identify necessary inline helpers (navigation, drawer, modal)
- Decide if the TC is activatable or must be `test.skip()` (network state, data not found on staging, etc.)

---

## Step 3 — Spec Generation

### Mandatory complete structure

```js
// {spec-name}.spec.js
// E2E — {FEATURE_DESCRIPTION}
// CSV : .claude/Data/output/csv/{spec-name}.csv
//
// Launch:
//   SPEC_NAME={spec-name} USE_AUTH=true \
//   BASE_URL=https://staging-geo.onclusive.com/geo \
//   npx playwright test .claude/Data/raw/playwright/{spec-name}.spec.js

'use strict';
const { test, expect } = require('@playwright/test');
const path = require('path');

const BLUEPRINT = require('../test-data/selectors_blueprint.json');
const H = require('./e2e-helpers');

// JDD (3-layer merge)
const COMMON           = require('../test-data/common.json');
const JDD_PROFILE_NAME = process.env.JDD_PROFILE || 'default';
const JDD_COMMON = require('../test-data/jdd/common.json');
const JDD_BASE   = require('../test-data/jdd/{jdd-subfolder}/{spec-name}-base.json');
const JDD_PROF = (() => {
  try {
    return require(`../test-data/jdd/{jdd-subfolder}/{spec-name}-${JDD_PROFILE_NAME}.json`);
  } catch (e) {
    throw new Error(`JDD profile "${JDD_PROFILE_NAME}" not found: {spec-name}-${JDD_PROFILE_NAME}.json`);
  }
})();
function deepMerge(...objs) { /* standard deepMerge */ }
const JDD = deepMerge(JDD_COMMON, JDD_BASE, JDD_PROF);

// Constants
const BASE_URL        = process.env.BASE_URL        || COMMON.base_url;
const DASHBOARD_UUID  = process.env.DASHBOARD_UUID  || JDD.dashboard_uuid;
const CATEGORY_ID     = process.env.CATEGORY_ID     || JDD.category_uuid;     // if category page
const TARGET_SNAPSHOT = process.env.TARGET_SNAPSHOT || JDD.snapshot?.target || null;
const PAGE_URL        = `${BASE_URL}/dashboard/${DASHBOARD_UUID}`;             // adapt per page type
const SCREENSHOTS_DIR = path.resolve(__dirname, '../../output/reports/screenshots-{spec-name}');
H.ensureDir(SCREENSHOTS_DIR);

const shot   = H.makeShot(SCREENSHOTS_DIR);
const shotAt = H.makeShotAt(SCREENSHOTS_DIR);
H.registerAfterEach(SCREENSHOTS_DIR);

// Selectors (via blueprint)
const SEL = {
  // Examples — adapt per feature
  // someHeading: BLUEPRINT.{page}.{section}.heading,
  // someRows:    BLUEPRINT.{page}.{section}.rows,
};

// Navigation helper
async function gotoPage(page) {
  await page.goto(PAGE_URL, { waitUntil: 'load' });
  await H.dismissCookieBanner(page);
  await H.ensureSnapshot(page, TARGET_SNAPSHOT);
  // Tab guard if category page:
  // const tab = page.locator('[role="tab"]:has-text("Identity")').first();
  // if (!(await tab.getAttribute('aria-selected') === 'true')) { await tab.click(); await page.waitForTimeout(500); }
  // await page.evaluate(() => window.scrollTo(0, 400));
  // await page.waitForTimeout(500);
  // await expect(page.locator(SEL.anchorHeading).first()).toBeVisible({ timeout: 20000 });
}

// Tests

test('{FEATURE_PREFIX}-TC001 — {TC TITLE}', async ({ page }) => {
  await test.step('Given ...', async () => {
    await gotoPage(page);
    await shot(page, '{FEATURE_PREFIX}-TC001_step1_given');
  });

  await test.step('When ...', async () => {
    // interactions
    await shot(page, '{FEATURE_PREFIX}-TC001_step2_when');
  });

  await test.step('Then ...', async () => {
    // assertions with shotAt before toBe/toContain
    await shotAt(page, element, '{FEATURE_PREFIX}-TC001_step3_then');
    await expect(element).toBeVisible({ timeout: 10000 });
  });
});

// Skipped tests at the bottom with justification
test.skip('{FEATURE_PREFIX}-TC00X — [SKIP] ...', () => {
  // SKIPPED — reason. Re-enable if condition.
});
```

### TC Generation Rules

**Navigation**:
- `waitUntil: 'load'` — never `networkidle` (SSE active on the GEO dashboard)
- `H.dismissCookieBanner(page)` — after each `goto`
- `H.ensureSnapshot(page, TARGET_SNAPSHOT)` — if the spec uses snapshots

**Assertions**:
- Always `shotAt(page, element, ...)` BEFORE `.toBe()` / `.toContain()` / `.toEqual()`
- `waitForSelector(SEL.xxx, { timeout: 15000 })` before `count()` if React async
- For value comparisons `.toBe()` (counts, totals, stat cards): manually highlight the source element if mismatch, BEFORE `shotAt` — `H.registerAfterEach` cannot annotate these cases (no Playwright selector in the error). Highlight the element **supposed to display the correct value** (e.g. the stat card). See full pattern in `playwright-script-generator-agent.md` §"Manual annotation for `.toBe()` failures".
- For Perception Summary elements: mandatory multi-fallback selector:
  `'h4:has-text("AI Perception Summary"), h3:has-text("AI Perception Summary"), [data-testid="perception-summary"]'`

**Drawers / panels**:
- Use an XPath-scoped helper if table ambiguity is possible:
  ```js
  page.locator('h3:has-text("Section Title")')
    .locator('xpath=following::tbody[1]')
    .locator('button, tr[role="button"]').first()
  ```

**React Toggles**:
- Re-query at each iteration (no `.all()` before a click loop)

**Radix Dropdowns**:
- Open ONCE before the assertion loop (would toggle otherwise)
- Close with `Escape` after

**afterEach backfill**:
- `H.registerAfterEach(SCREENSHOTS_DIR)` handles failure annotation AND backfill of missing screenshots

---

## Step 4 — Blueprint Update

Add a section to `selectors_blueprint.json` for the new page/feature:

```json
"{page_key}": {
  "{section_key}": {
    "heading":      "h3:has-text(\"Section Title\")",
    "rows":         "tbody tr[role=\"button\"]",
    "preferred_fix": "data-testid=\"section-rows\""
  }
}
```

Rules:
- Reuse existing keys if the same section appears on multiple pages
- Mark `[class*="..."]` fallbacks with `preferred_fix: "data-testid=\"...\""`
- Do not duplicate selectors already present in another section

---

## Step 5 — Initial real.json Creation

File: `.claude/Data/processed/testcases/test-results/test-results-{spec-name}-real.json`

```json
{
  "spec_name": "{spec-name}",
  "profile_meta": {
    "profile": "{JDD_PROFILE}",
    "description": "{feature description}"
  },
  "generated": "{ISO date}",
  "total": N,
  "passed": 0,
  "failed": 0,
  "skipped": M,
  "duration_ms": 0,
  "testcases": [
    {
      "tc_id": "{FEATURE_PREFIX}-TC001",
      "title": "{FEATURE_PREFIX}-TC001 — {title}",
      "status": "pending",
      "duration_ms": 0,
      "steps": [
        "Given ...",
        "When ...",
        "Then ..."
      ],
      "screenshots": [
        "screenshots-{spec-name}/{FEATURE_PREFIX}-TC001_step1_given.png",
        "screenshots-{spec-name}/{FEATURE_PREFIX}-TC001_step2_when.png",
        "screenshots-{spec-name}/{FEATURE_PREFIX}-TC001_step3_then.png"
      ],
      "error": ""
    }
  ]
}
```

Rules:
- `steps[]` = **exact** texts from `test.step('...')` in the spec — never paraphrased
- `screenshots[]` = **exact** names passed to `shot()` or `shotAt()` — prefixed by `screenshots-{spec-name}/`
- Active TCs → `"status": "pending"` before the first run
- Skipped TCs → `"status": "skipped"`, `"steps": []`, `"screenshots": []`, `"error": "SKIPPED — ..."`

---

## Step 6 — JDD Creation if Absent

If JDD files do not exist yet:

**`{spec-name}-base.json`**:
```json
{
  "_meta": {
    "description": "Base JDD — {feature description}",
    "note": "Merged with jdd/common.json and jdd/{subfolder}/{spec-name}-{profile}.json at load time."
  }
}
```

**`{spec-name}-default.json`** (nominal profile):
```json
{
  "_meta": { "profile": "default" },
  "dashboard_uuid": "",
  "category_uuid": "",
  "snapshot": { "target": "" }
}
```

---

## Step 7 — Validation (optional)

If the user requests immediate validation:
```bash
SPEC_NAME={spec-name} JDD_PROFILE={profile} USE_AUTH=true \
  DASHBOARD_UUID={uuid} CATEGORY_ID={cat_uuid} TARGET_SNAPSHOT="{snapshot}" \
  npx playwright test .claude/Data/raw/playwright/{spec-name}.spec.js --project=chromium
```

Update the real.json with results via inline node script.

---

## Final Checklist Before Delivery

- [ ] Complete JS spec with all Given/When/Then TCs
- [ ] `H.registerAfterEach(SCREENSHOTS_DIR)` present
- [ ] `BLUEPRINT` imported and used in `SEL`
- [ ] `selectors_blueprint.json` updated with new selectors
- [ ] real.json created with exact steps and screenshots
- [ ] JDD base + default created if absent
- [ ] Non-testable TCs correctly skipped with justification
- [ ] No anti-patterns present (networkidle, domainRows without scope, class selector without fallback)
