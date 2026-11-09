# e2e-manage-scope-prompts

- **Spec:** `.claude/Data/raw/playwright/e2e-manage-scope-prompts.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-MANAGE-SCOPE-PROMPTS-001](#e2e-manage-scope-prompts-001) | Manage Scope > Prompts of a brand analysis: wizard table, pool tracker, suggestions and types (read-only) | NEW | GEO-1239, GEO-1246 |

---

## E2E-MANAGE-SCOPE-PROMPTS-001

**Manage Scope > Prompts of a brand analysis: wizard table, pool tracker, suggestions and types (read-only)**

| Field | Value |
|---|---|
| Status | NEW |
| Description | End-to-end: Manage Scope > Prompts of a brand analysis: wizard table, pool tracker, suggestions and types (read-only). Pass 1 — per epic (GEO-1002 / GEO-1209). Assumptions: TC-GEO-1246-004 is limited to the Add prompt type list (steps 1-2): adding a market saves suggestions, so steps 3-4 stay an open point. Epics: GEO-1002, GEO-1209. Consolidates TC-GEO-1239-001, TC-GEO-1239-002, TC-GEO-1246-004, TC-GEO-1239-006. |
| Priority | High |
| Stories | GEO-1239, GEO-1246 |
| Precondition | Brand analysis BA with retained unticked suggestions and a version history (JDD); Read-only: no tick, no save (Manage Scope saves at once — memory "Manage Scope autosave") |
| Labels | e2e-suite |
| QA Parent | GEO-1002 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | — |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the dashboard of analysis A |  | Manage Scope is reachable |
| 2 | When the user opens Manage Scope > Prompts |  | The Prompts section is displayed |
| 3 | Then the wizard's table is shown |  | Columns "Prompt", "Category", "Type", "Market", "Actions" in one table; no per-country or per-type tabs; no Reset button |
| 4 | And the wizard's filters are shown |  | Category, Type and Market header menus and the Show prompts menu |
| 5 | And the pool tracker is shown |  | The ring "U / P" with its popover |
| 6 | When the user scrolls to the end of the table |  | The unticked suggestions are listed, unticked and greyed, at the end of the table (no "Suggested Prompts" heading) |
| 7 | When the user opens the type select of Add prompt |  | The select lists Visibility, Competitive, Reputation, Brand Image and Other |
| 8 | When the user opens the version history |  | The version history is displayed |
| 9 | Then the changes are grouped by date with their count |  | A D2 group with 1 change and a D1 group with 2 changes |
| 10 | And each change shows the original and the edited wording |  | Original and edited wording of each of the 3 prompts |
