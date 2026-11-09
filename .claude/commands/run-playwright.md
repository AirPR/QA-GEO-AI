---
name: run-playwright
description: Runs the Playwright test suite with the configured parameters. Reads the CSV, inspects the page, generates and executes tests. Trigger with /run-tests.
---

<command-name>run-playwright</command-name>

# Skill : Playwright Test Execution

## Trigger
/run-tests --epic EPIC_ID --url URL [--headed?] [--story story_key?]

Example : `/run-tests --epic 102 --url http://localhost:3000/geo`

## CSV Resolution
The CSV is identified from the `--epic` parameter:
- Search in `.claude/Data/output/csv/` for a file whose name contains the epic ID (e.g. `102`)
- Example: `--epic 102` → selects `testcases - epic102.csv`
- If no file matches → error, ask the user to verify the epic ID
- If `--epic` is absent → error, this parameter is mandatory

## Story Filtering (`--story`)

If `--story STORY_KEY` is provided (e.g. `--story GEO-448`):
- Load the full epic CSV, then filter rows whose **`QA Story task`** column matches exactly `STORY_KEY`
- If no row matches → display available story keys in the CSV (unique values of `QA Story task`) and stop with an explicit error
- Output files receive a `-story{STORY_KEY}` suffix to avoid overwriting the full epic spec:
  - Spec         : `test-suite-epic{ID}-story{STORY_KEY}.spec.js`
  - Raw          : `test-results-epic{ID}-story{STORY_KEY}-raw.json`
  - Real         : `test-results-epic{ID}-story{STORY_KEY}-real.json`
  - Log          : `execution-log-epic{ID}-story{STORY_KEY}.txt`
  - Screenshots  : `screenshots-epic{ID}-story{STORY_KEY}/`
- The execution command uses `SPEC_NAME` (not `EPIC_ID`) to align artifact naming:
  ```bash
  SPEC_NAME=epic{ID}-story{STORY_KEY} USE_AUTH=true BASE_URL={URL} \
    npx playwright test .claude/Data/raw/playwright/test-suite-epic{ID}-story{STORY_KEY}.spec.js 2>&1 \
    | tee .claude/Data/processed/testcases/test-results/execution-log-epic{ID}-story{STORY_KEY}.txt
  ```
- Without `--story` → standard behavior: all TCs in the epic, naming `epic{ID}`

## Output File Naming (scoped by epic)
Strict split between working artifacts (`processed/`) and final deliverables (`output/`):
- `.claude/Data/raw/playwright/test-suite-epic{ID}.spec.js` (spec source)
- `.claude/Data/raw/playwright/test-results-epic{ID}-raw.json` (raw Playwright JSON)
- `.claude/Data/processed/testcases/test-results/` (single shared folder, parsed working artifacts):
  - `test-results-epic{ID}-real.json` (parsed results)
  - `execution-log-epic{ID}.txt` (Playwright log)
- `.claude/Data/output/reports/` (final deliverables):
  - `EXECUTION_REPORT_REAL_epic{ID}.html` (detailed per-epic report)
  - `screenshots-epic{ID}/` (screenshots, siblings of the HTML so paths stay short)

## Prerequisites
- CSV corresponding to the epic in `.claude/Data/output/csv/`
- Playwright installed: npm list playwright
- Target application URL (--url parameter)

## Execution Prompt

You are a QA automation agent using Playwright.

Your mission:
1. Read the CSV file identified via the `--epic` parameter (see "CSV Resolution" above). Never rely on "most recent file" or a date-based filename.
2. Open the provided application URL.
3. For each test case:
   - Understand the test case description.
   - Identify the user actions (click, input, navigation, validation).
   - Inspect the page to find the correct selectors (prefer data-testid, id, role, or text).
4. Generate a Playwright test script in JavaScript.
5. Execute the Playwright tests.
6. Return:
   - The generated Playwright code
   - The execution result (pass/fail)
   - Any errors with explanation

Rules:
- Use Playwright best practices (locator(), getByRole(), getByText()).
- Add waits only when necessary.
- Each test case should be a separate test().
- Keep the code clean and readable.
- Do NOT use MCP Chrome (mcp__chrome-devtools__*) tools. Use ONLY Playwright Node.js API directly.
- All page inspection and interaction must be done via Playwright (page.evaluate, page.locator, etc.).
- Do NOT create unnecessary files (no README, no INDEX, no SUMMARY, no backup, no temporary scripts).

## Locator Selection Rules (STRICT)

### UI Structure Elements
For any structural element — Summary, section titles, menus, navigation, buttons, table structures — use ONLY stable locators.

MANDATORY priority order:
1. `data-testid` (e.g. `page.locator('[data-testid="summary-section"]')`)
2. `id` (e.g. `page.locator('#main-nav')`)
3. `role` via `getByRole()` IF the ARIA role is stable and unambiguous

`getByText()` is FORBIDDEN for UI structure elements.

### Dynamic Content from Test Data
`getByText()` is ALLOWED ONLY for dynamic content coming from test data:
- Category sub-elements (e.g. `"AI Chatbot"`, `"Social Media"`)
- Market filter values (e.g. `"United States - English"`, `"France - French"`)
- Any label whose value comes from CSV/business data, not static UI

### Examples
```js
// ✅ Correct — structural button
page.locator('[data-testid="apply-filters-btn"]')
page.getByRole('button', { name: 'Apply' })  // if role is stable

// ✅ Correct — dynamic test data content
page.getByText('AI Chatbot')
page.getByText('United States - English')

// ❌ Forbidden — static section title
page.getByText('Summary')
page.getByText('Filters')
```

## Execution Steps

### 1. CSV Reading
- Identify the CSV file in `.claude/Data/output/csv/` whose name contains the epic ID provided via `--epic`
- Group rows by "Test name" (same Test name = same case)
- Each CSV row = 1 Cucumber step (Given/When/Then)
- Extract: tc_id, description, test_steps[], expected_result, metadata
- If `--story` is provided: after loading, filter to keep only rows whose `QA Story task` === `STORY_KEY`. If 0 rows → error + list of available story keys in the CSV.

### 2. Page Inspection
- Open the URL in Playwright (headed mode by default)
- Scan the DOM to identify interactive elements
- Map selectors: data-testid > id > role > text > CSS
- List available elements for each action

### 3. Script Generation
- Create a Playwright JavaScript script
- 1 test() per test case
- Map Cucumber steps to Playwright actions:
  - Given → page.goto(), setup, preconditions
  - When → page.click(), page.fill(), page.selectOption()
  - Then → expect(page.locator()).toBeVisible(), .toHaveText()
- **MANDATORY**: include the `test.afterEach` block below immediately after the imports and `SCREENSHOTS_DIR` declaration, before the first `test()`. This block is generic and must be present in EVERY generated spec file, regardless of the epic:

```js
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'failed') return;
  const error = testInfo.errors[0];
  if (!error) return;
  // Strip ANSI color codes
  const rawMsg = (error.message || '').replace(/\u001b\[[0-9;]*m/g, '');
  // Extract CSS selectors from the Playwright locator string.
  // Handles both standard "Locator:" errors and TimeoutErrors ("waiting for" line).
  const locatorLine =
    rawMsg.match(/Locator:\s*(.+?)(?:\n|$)/) ||
    rawMsg.match(/waiting for\s+(.+?)(?:\n|$)/);
  const locatorStr = locatorLine ? locatorLine[1] : '';
  // Single-quoted selectors, last → first (most specific to least)
  const allSelectors = locatorStr
    ? [...locatorStr.matchAll(/'([^']+)'/g)].map(m => m[1]).reverse()
    : [];
  // Extract `hasText: '...'` filters to disambiguate when several elements match the same selector
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

  // Fallback: nothing matched → paint a red banner at the top.
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
  // Always overwrite step3_then with the annotated failure state.
  const failPath = path.join(SCREENSHOTS_DIR, `${tcId}_step3_then.png`);
  await page.screenshot({ path: failPath, fullPage: false });
  // Backfill any step1_given / step2_when that the test body never reached,
  // so the HTML report never shows "(screenshot missing)" placeholders.
  for (const step of ['step1_given', 'step2_when']) {
    const p = path.join(SCREENSHOTS_DIR, `${tcId}_${step}.png`);
    if (!fs.existsSync(p)) {
      await page.screenshot({ path: p, fullPage: false }).catch(() => {});
    }
  }
});
```

- Save: `.claude/Data/raw/playwright/test-suite-epic{ID}.spec.js` (see "Output File Naming")

### 4. Real Execution
- **MANDATORY**: run the suite via `npx playwright test` AND pipe the output to the log file with `tee`. The log follows the CLAUDE.md convention (`processed/testcases/test-results/execution-log-epic{ID}.txt`):

```bash
mkdir -p .claude/Data/processed/testcases/test-results
EPIC_ID={ID} DASHBOARD_UUID={UUID} BASE_URL={URL} HEADLESS=true \
  npx playwright test .claude/Data/raw/playwright/test-suite-epic{ID}.spec.js 2>&1 \
  | tee .claude/Data/processed/testcases/test-results/execution-log-epic{ID}.txt
```

- Never `node <file>` — this is not a standalone Node script
- Headed mode (VISIBLE browser) by default without `HEADLESS=true`
- Log each step in real time:
  - What is being searched (selector)
  - What is found (element)
  - What is done (action)
  - What is verified (assertion)
- Screenshot at each step

### 5. Results
- Save JSON results
- Save execution log
- Save screenshots
- Display summary:
  - Total tests executed
  - Passed / Failed / Skipped
  - Total duration
  - List of failures with explanation

### 6. real.json Creation / Update (MANDATORY)

**On the first execution of a new spec**, create `test-results-{spec}-real.json` in `processed/testcases/test-results/` with:

- `steps[]` = exact texts extracted from `// Given`, `// When`, `// Then` comments (or `test.step('...')`) in the spec — **never leave `steps: []` empty**
- `screenshots[]` = exact names passed to `shot(page, '...')` or `shotAt(page, el, '...')` in the spec, prefixed by `screenshots-{spec}/`

Example for a TC with 3 screenshots:
```json
{
  "tc_id": "GEO-79-TC001",
  "title": "GEO-79-TC001 — Sidebar layout is displayed",
  "status": "passed",
  "duration_ms": 0,
  "steps": [
    "Given an Editor opens a completed report dashboard",
    "When the dashboard loads",
    "Then the sidebar shows Overview, Categories and Manage Scope entries"
  ],
  "error": ""
}
```

**After initial creation**: `refreshRealFromRaw` automatically updates `status` / `duration_ms` / `error` on each run — `steps[]` are never overwritten.

**Reviewer rule**: before delivering, verify that `steps` is not `[]` for any active TC — if so, re-read the spec and fill in.

## Expected Output (ONLY these files, all scoped by epic — see "Output File Naming")
Working artifacts (intermediate):
- `.claude/Data/raw/playwright/test-suite-epic{ID}.spec.js` (generated spec)
- `.claude/Data/raw/playwright/test-results-epic{ID}-raw.json` (raw Playwright JSON)
- `.claude/Data/processed/testcases/test-results/` (single shared folder, one set per epic):
  - `test-results-epic{ID}-real.json` (parsed results)
  - `execution-log-epic{ID}.txt` (detailed log)

Final deliverables (shareable):
- `.claude/Data/output/reports/screenshots-epic{ID}/` (screenshots)
- **MANDATORY: `.claude/Data/output/reports/EXECUTION_REPORT_REAL_epic{ID}.html`** (detailed report)
  - Metrics: total, passed, failed, success rate, duration
  - Per-test detail: status, Given/When/Then steps, embedded screenshots
  - Root cause analysis for failed tests
  - Screenshot paths use `screenshots-epic{ID}/<file>.png` (siblings)

- Summary printed: total, passed, failed, duration
- Suggest running /export-results if any test failed

## Assertion Rules (STRICT — no exceptions)

- Forbidden: `.catch(() => false)`, `.catch(() => {})`, `.catch(() => null)` or any handler that silently swallows errors. If a locator may be missing, write `await expect(locator).toBeVisible()` and let Playwright fail explicitly.
- Forbidden: `console.log('INFO: ...')` or `console.log('PASS: ...')` **in place of an assertion**. A branch `if (elementVisible) { expect(...) } else { console.log('not found') }` incorrectly makes the test green and violates CLAUDE.md.
- Forbidden: catch-all assertions like `text.includes('A') || text.includes('B') || text.includes('C') || ...` covering mutually exclusive values. If the CSV expects a specific label, the assertion must verify **that** label.
- Forbidden: silent fallbacks that change the scenario (e.g. `.nth(1).click()` if the CSV option is not found). If the option is absent → FAIL with a clear message.
- Forbidden: `waitForTimeout` outside initial setup — use `waitFor`, `toBeVisible({ timeout })`, or `waitForURL` to wait for a specific state.
- For any "message X is displayed" in the CSV: use `await expect(locator).toHaveText('X')` or `toContainText('X')` on a targeted locator, never `page.textContent().includes('X')` on the entire page.
