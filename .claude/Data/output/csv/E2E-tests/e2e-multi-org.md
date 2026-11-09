# e2e-multi-org

- **Spec:** `.claude/Data/raw/playwright/e2e-multi-org.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-MULTI-ORG-001](#e2e-multi-org-001) | A multi-organisation user lands in the last organisation, switches and gets the rights of each | NEW | GEO-1055, GEO-1056, GEO-1057 |

---

## E2E-MULTI-ORG-001

**A multi-organisation user lands in the last organisation, switches and gets the rights of each**

| Field | Value |
|---|---|
| Status | NEW — spec blocked: needs a multi-organisation account |
| Description | End-to-end: A multi-organisation user lands in the last organisation, switches and gets the rights of each. Pass 1 — per feature, older versions (GEO-R1.15 GEO-681). Assumptions: The source steps have no Expected result column value: the Then text is the assertion. Consolidates TC-GEO-1055-001, TC-GEO-1056-001, TC-GEO-1057-002. |
| Priority | High |
| Stories | GEO-1055, GEO-1056, GEO-1057 |
| Precondition | User member of two organisations, editor in A and reader in B (missing — open point) |
| Labels | e2e-suite |
| QA Parent | GEO-681 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | — |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a user belongs to more than one organization and previously connected to organization B |  |  |
| 2 | When the user signs in |  |  |
| 3 | Then the user is by default redirected to organization B without being prompted to choose |  |  |
| 4 | Given a user belonging to multiple organizations is working in organization A |  |  |
| 5 | When the user opens the organization switcher and selects organization B |  |  |
| 6 | Then the user is now in organization B without having signed out or re-authenticated |  |  |
| 7 | Given the same user who is an editor in organization A and a reader in organization B |  |  |
| 8 | When the user is in organization B |  |  |
| 9 | Then no editor capabilities are available |  |  |
| 10 | And nothing in the interface suggests the user has editor rights in organization B |  |  |
