# e2e-country-filter

- **Spec:** `.claude/Data/raw/playwright/e2e-country-filter.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-COUNTRY-FILTER-001](#e2e-country-filter-001) | Filter the dashboard by country across Overview and Category views | UPDATE | GEO-263 |

---

## E2E-COUNTRY-FILTER-001

**Filter the dashboard by country across Overview and Category views**

| Field | Value |
|---|---|
| Status | UPDATE — single-country analysis: no country filter is shown (user decision 2026-11-05, not raised to the PO); link to GEO-1229 removed. GEO-1514 (Ready for QA): until it ships, some labels may still read "market" |
| Description | End-to-end: Filter the dashboard by country across Overview and Category views. Pass 1 — per feature, older versions (GEO-R0.3 GEO-263 + R1.3). Assumptions: Label alignment (GEO-1514 Market → Country, Ready for QA; R1.2 filter bar "All Countries"): "market(s)" / "All markets" in the R0.3 wording read "country / countries" / "All Countries" — label only. Known bugs: GEO-1514 (Ready for QA): until it ships, some labels may still read "market". Epics: GEO-263. Consolidates Market Dropdown UI, Selection Persistence, TC-GEO-1229-007, Single-Country UI. Updated 2026-11-05 after the MCP run of 30/10 (user decision): on a single-country analysis no country filter is rendered at all, and that is the expected behaviour. It departs from AC6 of GEO-293 (v0.3: "only that market is shown and no multi-select UI is displayed"), but it is not raised to the PO. The scenario is no longer linked to GEO-1229 (the 1.3 country TCs cover the Country wording and the prompt pool, not this filter). |
| Priority | High |
| Stories | GEO-263 |
| Precondition | Analysis M with United States (EN + ES) and France (TC-GEO-1229-007); a single-country analysis |
| Labels | e2e-suite |
| QA Parent | GEO-263 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 30/10 (MCP) — steps 11-12 updated 2026-11-05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a multi-country report on Overview or Category view |  | Each market has a selectable checkbox and All markets shortcut is available |
| 2 | When the user selects one or two markets | Market A, Market B | The dropdown trigger shows the market names |
| 3 | And when the user selects three or more markets | Market A, B, C | The dropdown trigger shows the selected count (e.g. 3 markets) |
| 4 | Then if the user deselects every market |  | The view falls back to All markets automatically |
| 5 | Given the user has selected a subset of markets on Overview |  | Selection is active |
| 6 | When they navigate to any Category view in the same session |  | The same market selection is applied on the Category view |
| 7 | And when they reload the page |  | The selection is restored to what was active before the reload |
| 8 | When the user opens the market (country) filter |  | The filter lists "United States" once and "France" once (no separate entry per language) |
| 9 | And the user selects "United States" only |  | The filter shows United States selected |
| 10 | Then the results roll up both languages of the country |  | The prompts and results shown include the English and the Spanish prompts of United States, and none of France |
| 11 | Given a single-country report | Single-country analysis (e.g. Licter US, Nike GB, Volkswagen MA) | The Overview or Category view of the analysis is displayed |
| 12 | Then no country filter is displayed |  | No country (market) filter is rendered in the filter bar, so there is no dropdown to open |
