# e2e-reader-role

- **Spec:** `.claude/Data/raw/playwright/e2e-reader-role.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-READER-001](#e2e-reader-001) | A Reader browses the organisation analyses and users in read-only mode | NEW | GEO-397, GEO-1053 |

---

## E2E-READER-001

**A Reader browses the organisation analyses and users in read-only mode**

| Field | Value |
|---|---|
| Status | NEW; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | End-to-end: A Reader browses the organisation analyses and users in read-only mode. Pass 1 — per feature, older versions (GEO-R1.0 GEO-397 + GEO-R1.15 GEO-680). Assumptions: Replaces the archive [SKIP] placeholders GEO-61-TC009 and GEO-60-TC008. Epics: GEO-397, GEO-680. Consolidates TC-GEO-397-022, TC-GEO-397-024, TC-GEO-397-026, TC-GEO-1053-001. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): the Reader account exists (+os, organisation Onclusive); button label "New Analysis"; 'AI Citation Sources' renamed 'AI Engines Citation Sources'. |
| Priority | High |
| Stories | GEO-397, GEO-1053 |
| Precondition | Reader account GEO_USER_READER_EMAIL / GEO_USER_READER_PASSWORD in .env (+os); it lands in the organisation Onclusive (not QA-GEO), which holds topic analyses (run 10/11: Hybrid Cars d5c77bfd); read-only: no click on any write control |
| Labels | e2e-suite |
| QA Parent | GEO-397 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user with the READER role has valid credentials for the GEO application | READER role user credentials |  |
| 2 | When the user logs in and the GEO home/dashboard page loads | GEO home or dashboard page |  |
| 3 | Then the New Analysis button is rendered in a visibly disabled/greyed-out state and is not clickable | Button: New Analysis | The New Analysis button appears disabled (greyed out) and clicking it produces no action |
| 4 | Given a READER user is logged into GEO and at least one existing report is available in their organization | READER role user | existing report in the organization |
| 5 | When the READER user opens an existing report | Existing report accessible to the organization |  |
| 6 | Then all report sections (Overview, categories, AI Engines Citation Sources, etc.) load completely with the full data the organization has access to and no section is hidden or restricted | Report sections: Overview, categories, AI Engines Citation Sources | All sections load with full data |
| 7 | Given a READER user has access to a report that has an on-demand run trigger | READER role user | report with on-demand run option |
| 8 | When the READER user inspects the report actions available | On-demand run control |  |
| 9 | Then the on-demand run control is disabled or absent for the READER | Action: on-demand run | The on-demand run action is disabled or hidden |
| 10 | Given un utilisateur avec le rôle reader |  | Le reader est connecté dans l'application |
| 11 | When il ouvre les paramètres utilisateurs |  | La page des paramètres utilisateurs est chargée |
| 12 | Then il voit la liste des utilisateurs de son organisation avec le rôle de chacun (editor ou reader) |  | La liste affiche tous les membres avec leur rôle visible |
