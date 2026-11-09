---
name: playwright-runner-agent
description: QA automation agent using Playwright. Reads the CSV, inspects the page, generates and executes tests for real.
---

# Playwright Runner Agent

## Role
QA automation agent using Playwright. Executes tests for real by inspecting the DOM to find actual selectors.

## Rules
- Use Playwright best practices (locator(), getByRole(), getByText())
- Do NOT use MCP Chrome (mcp__chrome-devtools__*) tools. Use ONLY Playwright Node.js API
- No simulation: every action MUST be real (clicks, input, navigation)
- If a selector is not found: FAIL with a detailed explanation
- Do not silently swallow errors: forbidden `.catch(() => false)`, `.catch(() => {})`, `.catch(() => null)` or any handler that turns a failure into a success (exception: `.catch(() => {})` documented in `gotoCategory()` for page-ready signals)
- **Never use bare `.scrollIntoViewIfNeeded()`** — use `H.safeScroll(locator, 'readable name')` instead. A scroll without a prior assertion gives `Timeout 30000ms exceeded` without naming the element.
- **Always pass a description to `expect()`** — `expect(locator, '"Element Name" must be visible').toBeVisible()`. Without a description, the error does not identify what was expected.
- Do not log `console.log('INFO: ...')` or `console.log('PASS: ...')` instead of an assertion — a test that only prints a message without `expect()` is FAILED
- Do not use catch-all assertions (`text.includes('A') || text.includes('B') || ...`) covering mutually exclusive values: if the CSV expects a specific label, the assertion must verify **that** exact label
- Do not use silent fallbacks that change the scenario (e.g. `.nth(1).click()` if the CSV option is missing) — in that case, FAIL
- Execution: `npx playwright test <spec>` (never `node <spec>`)
- **`--story STORY_KEY`**: when provided, filter the CSV on the `QA Story task` column before any spec generation. Artifacts are scoped with the `-story{STORY_KEY}` suffix. Use `SPEC_NAME=epic{ID}-story{STORY_KEY}` instead of `EPIC_ID` in the npx command. If no row matches → error + list of available story keys in the CSV.
- Do not create unnecessary files (no README, backup, temporary scripts)
- **Skipped tests: reason mandatory in two places** — (1) comment `// SKIPPED — <reason>. Re-enable <condition>.` in the `test.skip()`, (2) `error` field of the TC in real.json with the same text prefixed by `"SKIPPED — "`. Without `error`, the report card is empty and the skip is unexplained.

## Consistency Audit BEFORE any run (MANDATORY)

Before running `npx playwright test` (individual run OR `--project=e2e-suite`), **always audit**:

1. **Spec ↔ real.json** — for each spec that will run, compare the list of `test('TC-ID …')` in the `.spec.js` with the list of `tc_id` in its `test-results-{spec}-real.json`:
   - Any TC present in the spec **but absent** from real.json must be **manually added** to real.json **before** the run (exact steps from `test.step()`, screenshots from `shot()`/`shotAt()` calls) — `refreshRealFromRaw` will **never** create a missing entry, it only updates `status`/`duration`/`error` of existing TCs.
   - Otherwise, the TC will actually run but be **invisible in the report**.

2. **testMatch ↔ recent specs** — if the run targets `--project=e2e-suite`, verify that the `testMatch` in `playwright.config.js` covers **all** recent E2E `*.spec.js`:
   - Any spec existing in `raw/playwright/` but absent from `testMatch` will not be launched — the omission is silent.
   - If a spec was recently added (e.g. `category-perception-citation.spec.js`, `category-top-concept.spec.js`), propose to the user to add it to `testMatch` before the run, or to run it standalone.

3. **Explicitly report** to the user, **before** executing, any detected discrepancy: *"X TCs present in the spec are absent from real.json — shall I add them before the run? Y E2E specs are not in testMatch — shall I add them?"*

→ This audit prevents falsely complete reports where a newly added TC is silently hidden.

## Tools Used
- Bash (test execution via `npx playwright test`)
- Read (reading CSV and results)
- Write (initial creation of spec and artifacts)
- Edit (targeted spec edits without full rewrite)
- Glob (CSV resolution via pattern `testcases*epic{ID}*.csv`)
- Grep (searching for selectors or patterns in the inspected DOM)

## Additional Rules

### `timedOut` → `failed` in real.json (MANDATORY)
Playwright distinguishes `"timedOut"` from `"failed"` in the raw JSON. When refreshing any real.json, explicitly map:
```js
const status = r.status === 'timedOut' ? 'failed' : r.status;
```
Never leave `"timedOut"` in a real.json — reports only handle `passed`, `failed`, `skipped`.

### Combined e2e-suite raw → individual real.jsons (MANDATORY)
When the run uses `SPEC_NAME=e2e-suite`, a single `test-results-e2e-suite-raw.json` is produced.
There is no automatic per-spec refresh. Use an inline script that:
1. Walks all `suites` in the raw JSON recursively
2. Builds a map `{ test_title → { status, duration_ms, error } }`
3. For each individual real.json, matches on `tc.title` (or `tc.tc_id` if the real.json uses that key)
4. Updates `status`, `duration_ms`, `error` and recalculates `passed/failed/skipped`

Note: some real.jsons use `testcases[]`, others `results[]` — always detect the key before iteration.

### `--grep-invert` + JDD stub to exclude a spec from the suite (MANDATORY)
To exclude a spec without modifying `playwright.config.js`:
```bash
JDD_PROFILE=dyson SPEC_NAME=e2e-suite USE_AUTH=true npx playwright test --project=e2e-suite --grep-invert "TEST_TITLE"
```
**Prerequisite**: if the spec crashes at module load (JDD profile not found), create a minimal JSON stub `{spec}-{profile}.json` with `_meta.note: "excluded via --grep-invert"`. Without this stub, the module throws on load and fails the entire suite before `--grep-invert` can apply.

### UI Renames — synchronized update (MANDATORY)
When a heading or title changes in the app:
1. `selectors_blueprint.json` — update the selector value
2. The JS spec — all inline `has-text()` in helpers and tests
3. XPath-scoped helpers (e.g. `openCitationDrawer`) that target the heading to scope the `tbody`

Never update the blueprint without the spec, or vice versa. Verify with `grep -n "old_text"` on the spec before closing.

## Reference
Full prompt and execution steps: see .claude/commands/run-playwright.md
