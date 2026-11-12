# e2e-manage-scope

- **Spec:** `.claude/Data/raw/playwright/e2e-manage-scope.spec.js`
- **Active scenarios:** 7 · **Retired:** 11
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-MANAGE-SCOPE-001](#e2e-manage-scope-001) | Current scope is displayed on Manage Scope | UPDATE | GEO-61 |
| [E2E-MANAGE-SCOPE-002](#e2e-manage-scope-002) | Add Country button is visible and enabled | UPDATE | GEO-61 |
| [E2E-MANAGE-SCOPE-003](#e2e-manage-scope-003) | Add Topic button is visible and enabled | UPDATE | GEO-61 |
| [E2E-MANAGE-SCOPE-004](#e2e-manage-scope-004) | Remove control visible on country row | UPDATE | GEO-61 |
| [E2E-MANAGE-SCOPE-005](#e2e-manage-scope-005) | Remove control visible on category row | UPDATE | GEO-61 |
| [E2E-MANAGE-SCOPE-010](#e2e-manage-scope-010) | AI Engines section shows 5 LLM cards with toggles | UPDATE | GEO-60 |
| [E2E-MANAGE-SCOPE-015](#e2e-manage-scope-015) | Enabled LLM card shows logo, name and on/off switch (no Web search checkbox) | UPDATE | GEO-60 |

---

## E2E-MANAGE-SCOPE-001

**Current scope is displayed on Manage Scope**

| Field | Value |
|---|---|
| Status | UPDATE — Countries no longer carry a "Primary" badge (primary market replaced by "Language for AI Insights", GEO-656 R1.1; no "Primary" tag in TC-GEO-1231-004 / TC-GEO-1237-001) — behaviour change (confirmed at the gate); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verifies that the Manage Scope page loads and displays the current report scope: countries with Primary indicator, categories, enabled LLM engines, question counts, and report metadata. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: Countries no longer carry a "Primary" badge (primary market replaced by "Language for AI Insights", GEO-656 R1.1; no "Primary" tag in TC-GEO-1231-004 / TC-GEO-1237-001); driven by step 3 → TC-GEO-1231-008, TC-GEO-1237-001 step 3. Consolidates archive GEO-61-TC001 (GEO-61). Former id: GEO-61-TC001. Archived in GEO-R1.0/e2e-manage-scope.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): test data moved to Toyota 439acd96 (luxury handbags dashboard not on staging); "Countries/Markets" → "Countries" (GEO-1514). |
| Priority | High |
| Stories | GEO-61 |
| Precondition | An Editor is authenticated and navigates to the Manage Scope URL for the Toyota dashboard (staging QA-GEO, 439acd96 — the luxury handbags dashboard 89f17431 does not exist on staging) |
| Labels | geo-100,manage-scope,current-scope |
| QA Parent | GEO-61 |
| Components / QA Component | Manage Scope / Scope overview,Metadata |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor navigates to the Manage Scope page | URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/manage-scope | The Manage Scope page loads without errors |
| 2 | When the page finishes loading | Manage Scope page fully rendered (networkidle) | The page content is visible with identifiable scope sections |
| 3 | Then the page shows: at least one country entry (no "Primary" tag), at least one category row, the AI Engines section with LLM cards, and at least one metadata field (creation date or last analysis date) | Countries section (no "Primary" tag) \| Categories section \| AI Engines section with LLM cards \| Metadata field (creation date / last analysis) | All scope sections are visible: Countries (≥1 country row, no "Primary" tag), Categories (≥1 category row), AI Engines (LLM cards), and report metadata (at least one date field visible) |

---

## E2E-MANAGE-SCOPE-002

**Add Country button is visible and enabled**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) — still valid ("or equivalent" covers the sentence-case "Add country", GEO-1533); enabled only while the pool has room (TC-GEO-1239-011) |
| Description | Verifies that the Add Country button is visible and enabled on the Manage Scope page (AC2 adapted: verifies the add-country entry point is accessible without performing a destructive save). Consolidates archive GEO-61-TC002 (GEO-61). Former id: GEO-61-TC002. Archived in GEO-R1.0/e2e-manage-scope.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): test data moved to Toyota 439acd96 (luxury handbags dashboard not on staging); "Countries/Markets" → "Countries" (GEO-1514). |
| Priority | High |
| Stories | GEO-61 |
| Precondition | An Editor is authenticated and opens the Manage Scope page for the Toyota dashboard (staging QA-GEO, 439acd96 — the luxury handbags dashboard 89f17431 does not exist on staging) |
| Labels | geo-100,manage-scope,markets |
| QA Parent | GEO-61 |
| Components / QA Component | Manage Scope / Market update |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the Manage Scope page and the Countries section is visible | URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/manage-scope | The Manage Scope page is loaded and the Countries section is visible |
| 2 | When the Editor views the Countries section | Countries section loaded with current country rows | The section shows at least one country entry with its configuration |
| 3 | Then an "+ Add Country" button (or equivalent) is visible and not disabled — confirming the add-country entry point is accessible and quota has not been reached on this staging report | Add Country button: button or link containing text "+ Add Country" or "Add Country" or "Add Market" | An "+ Add Country" or equivalent button is visible and in an enabled (not disabled) state — the add-country flow is accessible on the staging report |

---

## E2E-MANAGE-SCOPE-003

**Add Topic button is visible and enabled**

| Field | Value |
|---|---|
| Status | UPDATE — "+ Add Topic" is now "Add category" (TC-GEO-1239-010 step 1, sentence case GEO-1533 Passed QA) — label; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verifies that the Add Topic/Category button is visible and enabled on the Manage Scope page (AC3 adapted: verifies the add-category entry point is accessible without performing a destructive save). Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: "+ Add Topic" is now "Add category" (TC-GEO-1239-010 step 1, sentence case GEO-1533 Passed QA); driven by step 3 → TC-GEO-1239-010. Consolidates archive GEO-61-TC003 (GEO-61). Former id: GEO-61-TC003. Archived in GEO-R1.0/e2e-manage-scope.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): test data moved to Toyota 439acd96 (luxury handbags dashboard not on staging); "Countries/Markets" → "Countries" (GEO-1514). |
| Priority | High |
| Stories | GEO-61 |
| Precondition | An Editor is authenticated and opens the Manage Scope page for the Toyota dashboard (staging QA-GEO, 439acd96 — the luxury handbags dashboard 89f17431 does not exist on staging) |
| Labels | geo-100,manage-scope,categories |
| QA Parent | GEO-61 |
| Components / QA Component | Manage Scope / Category update |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the Manage Scope page and the Categories section is visible | URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/manage-scope | The Manage Scope page is loaded and the Categories section is visible |
| 2 | When the Editor views the Categories section | Categories section loaded with current category rows | The section shows at least one category entry |
| 3 | Then an "Add category" button (or equivalent) is visible and not disabled — confirming the add-category entry point is accessible on this staging report | Add category button: button or link containing text "Add category" | An "Add category" or equivalent button is visible and in an enabled (not disabled) state — the add-category flow is accessible on the staging report |

---

## E2E-MANAGE-SCOPE-004

**Remove control visible on country row**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | Verifies that each country row in the Countries section shows a remove/delete control (AC2 adapted: verifies the remove-country entry point is visible without performing a destructive save). Consolidates archive GEO-61-TC004 (GEO-61). Former id: GEO-61-TC004. Archived in GEO-R1.0/e2e-manage-scope.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): test data moved to Toyota 439acd96 (luxury handbags dashboard not on staging); "Countries/Markets" → "Countries" (GEO-1514). |
| Priority | Medium |
| Stories | GEO-61 |
| Precondition | An Editor is authenticated and opens the Manage Scope page for the Toyota dashboard (staging QA-GEO, 439acd96 — the luxury handbags dashboard 89f17431 does not exist on staging) |
| Labels | geo-100,manage-scope,markets,removal |
| QA Parent | GEO-61 |
| Components / QA Component | Manage Scope / Market update |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the Manage Scope page and the Countries section shows at least one country row | URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/manage-scope | The Countries section is visible with at least one country entry |
| 2 | When the Editor inspects the first country row | First country row in the Countries list | The row is rendered with its country name and configuration details |
| 3 | Then a remove or delete icon/button is visible on the country row — confirming the remove-country entry point is present in the UI (not interacted with) | Remove/delete control: trash icon or button with aria-label containing "remove" or "delete" on the country row | A remove or delete control (icon button or text link) is visible on at least the first country row — the remove-country flow is accessible from the UI |

---

## E2E-MANAGE-SCOPE-005

**Remove control visible on category row**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-11 (user decision) |
| Description | Verifies that each category row in the Categories section shows a remove/delete control (AC3 adapted: verifies the remove-category entry point is visible without performing a destructive save). Consolidates archive GEO-61-TC005 (GEO-61). Former id: GEO-61-TC005. Archived in GEO-R1.0/e2e-manage-scope.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): test data moved to Toyota 439acd96 (luxury handbags dashboard not on staging); "Countries/Markets" → "Countries" (GEO-1514). |
| Priority | Medium |
| Stories | GEO-61 |
| Precondition | An Editor is authenticated and opens the Manage Scope page for the Toyota dashboard (staging QA-GEO, 439acd96 — the luxury handbags dashboard 89f17431 does not exist on staging) |
| Labels | geo-100,manage-scope,categories,removal |
| QA Parent | GEO-61 |
| Components / QA Component | Manage Scope / Category update |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the Manage Scope page and the Categories section shows at least one category row | URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/manage-scope | The Categories section is visible with at least one category entry |
| 2 | When the Editor inspects the first category row | First category row in the Categories list | The row is rendered with its category name and configuration details |
| 3 | Then a remove or delete icon/button is visible on the category row — confirming the remove-category entry point is present in the UI (not interacted with) | Remove/delete control: trash icon or button with aria-label containing "remove" or "delete" on the category row | A remove or delete control is visible on at least the first category row — the remove-category flow is accessible from the UI |

---

## E2E-MANAGE-SCOPE-010

**AI Engines section shows 5 LLM cards with toggles**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verifies that the AI Engines section on the Manage Scope page displays 5 LLM engine cards each with a visible toggle switch showing enabled/disabled state. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): the AI Engines section is a grid of 5 cards with switches and no "X of 5 active" indicator. Consolidates archive GEO-60-TC001 (GEO-60). Former id: GEO-60-TC001. Archived in GEO-R1.0/e2e-manage-scope.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): test data moved to Toyota 439acd96 (luxury handbags dashboard not on staging); "Countries/Markets" → "Countries" (GEO-1514). |
| Priority | High |
| Stories | GEO-60 |
| Precondition | An Editor is authenticated and opens the Manage Scope page for the Toyota dashboard (staging QA-GEO, 439acd96 — the luxury handbags dashboard 89f17431 does not exist on staging) |
| Labels | geo-100,manage-scope,llm |
| QA Parent | GEO-60 |
| Components / QA Component | LLM configuration / LLM toggles |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the authenticated Editor is on the Manage Scope page | URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/manage-scope | The Manage Scope page loads and the AI Engines section is visible |
| 2 | When the AI Engines section loads | AI Engines section rendered with LLM cards | The section is visible with at least one LLM card |
| 3 | Then 5 LLM engine cards are visible (Claude, Gemini, Grok, ChatGPT/OpenAI, Perplexity) each showing the engine name/logo and a toggle switch in either enabled or disabled state | 5 LLM cards: Claude \| Gemini \| Grok \| ChatGPT (OpenAI) \| Perplexity — each with a toggle switch (role=switch or similar) | All 5 LLM engine cards are visible in the AI Engines section. Each card shows the engine name (or logo) and a toggle switch (e.g. ChatGPT / Gemini / Grok / Perplexity on, Claude off). No "X of 5 active" counter is shown. |

---

## E2E-MANAGE-SCOPE-015

**Enabled LLM card shows logo, name and on/off switch (no Web search checkbox)**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision); labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verifies that an enabled LLM card on the Manage Scope page shows its logo, name and on/off switch, and no Web Search checkbox. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): no Web search checkbox on Manage Scope; enabled cards show only the logo, the name and the on/off switch (the scope API still returns webSearchEnabled per engine). Consolidates archive GEO-60-TC006 (GEO-60). Former id: GEO-60-TC006. Archived in GEO-R1.0/e2e-manage-scope.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): test data moved to Toyota 439acd96 (luxury handbags dashboard not on staging); "Countries/Markets" → "Countries" (GEO-1514). |
| Priority | High |
| Stories | GEO-60 |
| Precondition | An Editor is authenticated and opens the Manage Scope page with at least one LLM enabled |
| Labels | geo-100,manage-scope,llm |
| QA Parent | GEO-60 |
| Components / QA Component | LLM configuration / LLM toggles |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the Manage Scope page and the AI Engines section is loaded with at least one LLM in enabled state | URL: https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/manage-scope \| At least one LLM card is in enabled (toggled on) state | The AI Engines section is visible with at least one enabled LLM card |
| 2 | When the Editor views an enabled LLM card | First enabled LLM card in the AI Engines section | The enabled LLM card is fully rendered with its configuration controls |
| 3 | Then the enabled LLM card shows the engine logo, the engine name and its on/off switch | Card content: logo + name + role=switch (aria-checked=true) | The enabled LLM card shows its logo, its name and the switch in the on state |
| 4 | And no "Web search" checkbox is displayed on the LLM card | No input[type="checkbox"] or "Web search" text inside the LLM cards | No "Web search" checkbox, toggle or text is displayed on any LLM card of Manage Scope |

---

## Retired scenarios (no steps — kept for traceability)

| Scenario | Title | Reason |
|---|---|---|
| E2E-MANAGE-SCOPE-006 | [SKIP] Question and competitor updates are persisted | [SKIP] placeholder with no executable step; replaced by TC-GEO-1239-003 (edit a prompt, applied at the next run) — save action, open point; replaced by TC-GEO-1239-003 (open point: Manage Scope save) |
| E2E-MANAGE-SCOPE-007 | [SKIP] Add Country disabled when max_brand_markets quota reached | [SKIP] placeholder with no executable step; quota replaced by the prompt pool: TC-GEO-1239-011 (needs a back-office pool change) — open point; replaced by TC-GEO-1239-011 (open point: back-office pool) |
| E2E-MANAGE-SCOPE-008 | [SKIP] Add Topic disabled when max_categories quota reached | [SKIP] placeholder with no executable step; quota replaced by the prompt pool: TC-GEO-1239-011 — open point; replaced by TC-GEO-1239-011 (open point: back-office pool) |
| E2E-MANAGE-SCOPE-009 | [SKIP] Reader role sees Manage Scope in read-only mode | [SKIP] placeholder with no executable step; replaced by NEW E2E-READER-001 (Reader account missing); replaced by E2E-READER-001 |
| E2E-MANAGE-SCOPE-011 | [SKIP] Cannot disable the last active LLM | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-MANAGE-SCOPE-012 | [SKIP] LLM configuration persists until modified again | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-MANAGE-SCOPE-013 | [SKIP] Minimum 1 LLM constraint shows tooltip when last LLM toggle is attempted | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-MANAGE-SCOPE-014 | [SKIP] Last active LLM toggle is visually disabled | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-MANAGE-SCOPE-016 | [SKIP] Web search checkbox grayed out on disabled LLM card | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-MANAGE-SCOPE-017 | [SKIP] Reader role sees AI Engines in read-only mode | [SKIP] placeholder with no executable step; replaced by NEW E2E-READER-001 (Reader account missing); replaced by E2E-READER-001 |
| E2E-MANAGE-SCOPE-018 | [SKIP] LLM configuration persists after navigation | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
