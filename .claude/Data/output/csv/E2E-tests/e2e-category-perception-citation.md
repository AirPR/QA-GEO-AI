# e2e-category-perception-citation

- **Spec:** `.claude/Data/raw/playwright/e2e-category-perception-citation.spec.js`
- **Active scenarios:** 3 · **Retired:** 5
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-CAT-PERCEPTION-CITATION-001](#e2e-cat-perception-citation-001) | Perception topics and sentiment filters are displayed | UPDATE | GEO-66 |
| [E2E-CAT-PERCEPTION-CITATION-002](#e2e-cat-perception-citation-002) | AI Citation Sources section is visible with source type breakdown | UPDATE | GEO-66 |
| [E2E-CAT-PERCEPTION-CITATION-008](#e2e-cat-perception-citation-008) | Sources classification: domain↔type mapping matches the oracle | UPDATE | GEO-393, GEO-66 |

---

## E2E-CAT-PERCEPTION-CITATION-001

**Perception topics and sentiment filters are displayed**

| Field | Value |
|---|---|
| Status | UPDATE — headings: "AI Perception Summary" → InBrief logo; "Top Concepts Associated with Your Brand" → "Top Topics Associated with Your Brand" — label |
| Description | Verifies that the Top Concepts section displays perception topic clustering with sentiment filters (All / Positive / Mixed / Negative) and that the AI Perception Summary heading is visible. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: headings: "AI Perception Summary" → InBrief logo; "Top Concepts Associated with Your Brand" → "Top Topics Associated with Your Brand"; driven by step 3 → TC-GEO-1266-002, TC-GEO-1231-008. Consolidates archive GEO-66-TC001 (GEO-66). Former id: GEO-66-TC001. Archived in GEO-R1.0/e2e-category-perception-citation.csv. |
| Priority | Medium |
| Stories | GEO-66 |
| Precondition | An Editor is authenticated and navigates to the category page URL |
| Labels | geo-101,topics-sources,perception-topics |
| QA Parent | GEO-66 |
| Components / QA Component | Topics and sources / Topic clustering,Sentiment filter |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor navigates to the category perception page | URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The category page loads without errors |
| 2 | When the page finishes loading and the perception area is visible | Category page fully rendered (networkidle) with perception sections loaded | The InBrief and Top Topics sections are present in the DOM |
| 3 | Then the InBrief block is visible, the "Top Topics Associated with Your Brand" heading is visible, and sentiment filter buttons (All, Positive, Mixed, Negative) are displayed with numeric counts | InBrief block (h4) \| Top Topics heading (h3) \| Sentiment filter buttons: All (N) \| Positive (N) \| Mixed (N) \| Negative (N) | The InBrief block and Top Topics heading are visible. Sentiment filter buttons showing All / Positive / Mixed / Negative each with a numeric count are visible in the Top Topics section. |

---

## E2E-CAT-PERCEPTION-CITATION-002

**AI Citation Sources section is visible with source type breakdown**

| Field | Value |
|---|---|
| Status | UPDATE — section renamed "AI Engines Citation Sources" (GEO-1196 / GEO-1200), Favorability column removed — label |
| Description | Verifies that the AI Citation Sources section is visible on the category page and displays source type categories (e.g. Journalism, Review Sites) with a filter dropdown — confirming the citation sources widget is rendered and populated. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: section renamed "AI Engines Citation Sources" (GEO-1196 / GEO-1200), Favorability column removed; driven by step 3 → TC-GEO-1125-001. Consolidates archive GEO-66-TC002 (GEO-66). Former id: GEO-66-TC002. Archived in GEO-R1.0/e2e-category-perception-citation.csv. |
| Priority | Medium |
| Stories | GEO-66 |
| Precondition | An Editor is authenticated and opens the category page |
| Labels | geo-101,topics-sources,citation-sources |
| QA Parent | GEO-66 |
| Components / QA Component | Topics and sources / Reputation gaps |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the category page and has scrolled to the AI Engines Citation Sources section | URL: https://staging-geo.onclusive.com/geo/dashboard/89f17431-f9ff-4fb5-bc85-a5fd2f3ac0dc/category/4cde6c93-84c2-453a-ac67-a8467ee5e617 | The page is loaded and the AI Engines Citation Sources section is in the DOM |
| 2 | When the Editor views the AI Engines Citation Sources section | AI Engines Citation Sources section rendered with content | The section heading and its content are visible |
| 3 | Then the "AI Engines Citation Sources" heading is visible, a "Filter by source type" (or "All source types") dropdown button is visible, and at least one source type category button (e.g. "Journalism", "Review Sites") is visible with a citation count | AI Engines Citation Sources heading (h3) \| Filter button: aria-label="Filter by source type" or text "All source types" \| Source type buttons: e.g. "Journalism N (N%)" / "Review Sites N (N%)" | The "AI Engines Citation Sources" heading is visible. A filter by source type dropdown button is visible. At least one source type category (e.g. Journalism, Review Sites, Other) is visible with a citation count and percentage. |

---

## E2E-CAT-PERCEPTION-CITATION-008

**Sources classification: domain↔type mapping matches the oracle**

| Field | Value |
|---|---|
| Status | UPDATE — section renamed "AI Engines Citation Sources" — label |
| Description | Regression test for GEO-393 — verifies that every domain visible in the AI Citation Sources table on the category page is classified into the correct source type, by reading each (domain, type) pair from the table and comparing it to a maintained oracle mapping. Pass = no mismatch between actual Type column and expected type from oracle. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: section renamed "AI Engines Citation Sources"; driven by steps 1-2 → TC-GEO-1125-001. Consolidates archive GEO-66-TC012 (GEO-393, GEO-66). Former id: GEO-66-TC012. Archived in GEO-R1.0/e2e-category-perception-citation.csv. |
| Priority | High |
| Stories | GEO-393, GEO-66 |
| Precondition | Editor is authenticated; the analysis has citation data and a rendered AI Citation Sources table |
| Labels | geo-101,topics-sources,sources-classification,GEO-393,regression |
| QA Parent | GEO-66 |
| Components / QA Component | Topics and sources / AI Citation Sources,classifier |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor opens the category page and scrolls to the AI Engines Citation Sources section | URL: /dashboard/<dashboard_uuid>/category/<category_uuid> | The category page loads with the AI Engines Citation Sources heading and the source-type stacked bar visible |
| 2 | When the AI Engines Citation Sources table is fully rendered with no source-type filter applied (any active segment filter is reset, and "All domains" view is expanded if available) | Table rows parsed as {domain, actualType}: domain read from row aria-label (or first <td>), actualType read from the second <td> (Type column) | All visible domain rows are parsed into (domain, type) pairs with rowCount > 0 |
| 3 | Then for every domain present in BOTH the table and the oracle (raw/test-data/jdd/category/sources-classification-oracle.json) the actual Type column value equals the expected source type. Domains in the oracle that are not present in the current category's table are logged and skipped (no fail). Any mismatch is reported with domain, expectedType, actualType. | Oracle file: raw/test-data/jdd/category/sources-classification-oracle.json (seeded from GEO-393: asics.com / brooksrunning.com / newbalance.com / hoka.com / saucony.com / on-running.com / footlocker.co.uk / jdsports.co.uk / sportsdirect.com / fleetfeet.com / runandbecome.com / runningwarehouse.com → Corporate ; sneakernews.com / 220triathlon.com → Journalism) | mismatches.length === 0 (every domain present in both table and oracle has actualType === expectedType) |

---

## Retired scenarios (no steps — kept for traceability)

| Scenario | Title | Reason |
|---|---|---|
| E2E-CAT-PERCEPTION-CITATION-003 | [SKIP] Source detail shows full information | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-CAT-PERCEPTION-CITATION-004 | [SKIP] Market filter recalculates perception topics and citation sources | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-CAT-PERCEPTION-CITATION-005 | [SKIP] LLM filter recalculates both components | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-CAT-PERCEPTION-CITATION-006 | [SKIP] Empty state messages are displayed | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
| E2E-CAT-PERCEPTION-CITATION-007 | [SKIP] Error state displayed with retry option | [SKIP] placeholder with no executable step; prerequisite listed in the open points; replaced by — (prerequisite in the open points) |
