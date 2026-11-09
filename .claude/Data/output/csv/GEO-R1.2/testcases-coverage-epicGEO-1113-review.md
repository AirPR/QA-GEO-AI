# GEO-1113 — Test case review (v1, CSV generated)

**Epic:** GEO-1113 — Back office: Frequency column on the Organizations list to detect collection abuse
**Story:** GEO-1172 — Back office: show and filter the collection frequency in the Organizations list
**Version:** GEO-R1.2 | **Mode:** no `--figma` | **Generated:** 2026-10-13
**Sources:** `apps/geo/GEO-R1.2/GEO-1113/EPIC.md`, `STORY_GEO-1172_Back_office_show_and_filter_the_collection_freq.md`
**CSV:** `.claude/Data/output/csv/GEO-R1.2/testcases-coverage-epicGEO-1113.csv` — 7 TCs, 46 step rows, 16 columns, `;` separator

## AC inventory — Story GEO-1172 (6 functional ACs)

| AC | Label | TC(s) | Coverage |
|---|---|---|---|
| AC-1 | Frequency column after User quota, "Daily" / "One time" | TC-GEO-1172-001 | happy path |
| AC-2 | No quota row → same empty marker, list does not fail | TC-GEO-1172-002 | edge |
| AC-3 | Header sort: ascending → descending → no sort | TC-GEO-1172-003 | state transition |
| AC-4 | Frequency filter (All, Daily, One time) across all pages, page 1, count | TC-GEO-1172-004, TC-GEO-1172-005 | happy path (x2) |
| AC-5 | Modal change reflected in the list without reload | TC-GEO-1172-006 | state transition |
| AC-6 | Column stays internal (no front office surface) | TC-GEO-1172-007 | negative (visibility) |

Story wording is used for AC-4 and AC-6 (see ambiguities A1, A2).

## Test cases

Common precondition (TC-001 to TC-006): super admin logged in to the GEO back office; Administration > Organizations reachable. Back office URL (staging): https://staging-geo.onclusive.com/geo/backoffice.

### AC-1
**TC-GEO-1172-001 — Frequency column is displayed after User quota with Daily or One time** | High | Smoke: Yes | Regression: Yes | Functional
- Precondition: one DAILY org (org D = QA-GEO) and one ONE_TIME org (org O = Onclusive) exist
1. Given the super admin is logged in to the back office → back office home page displayed
2. When the super admin opens Administration > Organizations → list loads without error
3. Then the header shows a Frequency column right after User quota → Name, Customer number, User quota, Frequency, US org, Status, Created at, Actions
4. And every row with a quota shows "Daily" or "One time" → no raw value (DAILY / ONE_TIME) or blank
5. And org D shows "Daily"
6. And org O shows "One time"

### AC-2
**TC-GEO-1172-002 — Organization without a quota row shows the empty marker and the list does not fail** | Medium | Smoke: No | Regression: No | Functional
- Precondition: an org with no quota row (org N) exists — QA to provide, or a developer must create one (no known UI path); note the empty marker of another optional column first
1. Given an organization without a quota row exists → org N has no active quota row
2. When the super admin opens Administration > Organizations → list loads, no error, no blank page
3. And the super admin locates the row of org N → row displayed with its other columns
4. Then the Frequency cell shows the same empty marker as the other optional columns → not "Daily", "One time", "null" or an error
5. And the other rows still show their Frequency value

### AC-3
**TC-GEO-1172-003 — Frequency column header sorts ascending then descending then back to no sort** | Medium | Smoke: No | Regression: No | Functional
- Precondition: current page has both "Daily" and "One time" rows; reference column (Name) behaviour noted
1. Given the list with no sort applied → default order, no indicator on Frequency
2. When click Frequency header once → ascending indicator
3. Then rows sorted ascending → all "Daily" before "One time"
4. When click a second time → descending indicator
5. Then rows sorted descending → all "One time" before "Daily"
6. When click a third time → indicator removed
7. Then rows back in the default order
8. And the cycle and indicators match the other sortable columns (reference: Name)

### AC-4
**TC-GEO-1172-004 — Frequency filter Daily shows only Daily organizations across all pages and resets to page 1** | High | Smoke: Yes | Regression: Yes | Functional
- Precondition: more than one page in total, more DAILY orgs than one page holds; unfiltered count and DAILY count noted
1. Given the super admin is on page 2 → result count = total
2. And the Frequency filter is next to the Status filter → All, Daily, One time; All selected
3. When the super admin selects Daily → list refreshes
4. Then the list returns to page 1
5. And every row on page 1 shows "Daily" → no "One time", no empty marker
6. And the result count reflects the filter → equals the DAILY count, lower than the total
7. When the super admin goes to the next pages → each page loads
8. Then every row on every page shows "Daily"

**TC-GEO-1172-005 — Frequency filter One time then All restores the full list** | Medium | Smoke: No | Regression: No | Functional
- Precondition: ONE_TIME orgs exist; unfiltered count and ONE_TIME count noted
1. Given the Frequency filter is set to All → count = total
2. When the super admin selects One time → list refreshes, page 1
3. Then every row on every page shows "One time"
4. And the result count equals the ONE_TIME count
5. When the super admin selects All → list refreshes, page 1
6. Then the full list is back → count = total, both values shown

### AC-5
**TC-GEO-1172-006 — Frequency changed in the organization modal is shown in the list without reload** | High | Smoke: No | Regression: Yes | Functional
- Precondition: a modifiable DAILY test org (org T = QA-GEO); restored to DAILY at the end
1. Given the list → org T shows "Daily"
2. When the super admin opens the modal of org T → modal shows Daily
3. And changes the frequency to One time and saves → save confirmed, modal closes
4. Then org T shows "One time" without a manual reload
5. When the super admin sets it back to Daily and saves → save confirmed
6. Then org T shows "Daily" without a manual reload

### AC-6
**TC-GEO-1172-007 — Front office editor and reader do not see the collection frequency** | Medium | Smoke: No | Regression: No | Functional
- Precondition: editor assiya.benramdane@onclusive.com, reader assiya.benramdane+os@onclusive.com
1. Given an editor is logged in to the front office → home page displayed
2. When the editor browses the analyses list, a dashboard, the organization and account settings → pages load
3. Then no screen shows a frequency value, Frequency column, filter or label
4. And no new menu entry or page related to the frequency is available
5. Given a reader is logged in to the front office → home page displayed
6. When the reader browses the analyses list, a dashboard and the account settings → pages load
7. Then no screen shows a frequency value, Frequency column, filter or label

## Summary

- **Total:** 7 TCs, 46 steps. Smoke: TC-001 and TC-004. Regression: TC-001, TC-004 and TC-006.
- **Coverage:** happy path 3 (001, 004, 005), edge 1 (002), state transition 2 (003, 006), negative / visibility 1 (007). Every AC has at least one TC.

### ACs filtered as technical
- TAC-1 — "An integration test covers the frequency filter (`DAILY`, `ONE_TIME`, no filter) and the 400 on an unknown value." (API / integration test, no user-visible behaviour)
- TAC-2 — "Sonar findings on the change are resolved (S3358, S3776)." (code quality)
- Technical Details bullets (PR #576, `EXISTS` on the quota row, client-side sorting, `OrganisationsPage.tsx`) were used only as context and not turned into TCs.

### Ambiguities flagged (not guessed)
- **A1 — AC-4 epic vs story wording.** The epic says "the server returns only the organizations…". The story says "only the organizations … are shown". The TCs use the story wording and check what the UI shows. Server-side filtering is checked indirectly: the filter applies on every page and the result count changes.
- **A2 — AC-6 epic vs story wording.** The epic says "no new front office surface shows it". The story says "no front office screen shows it". The story wording is stricter and is the one used. "Nothing changes for them" cannot be proven exhaustively. TC-007 checks the screens where organization data appears, and the list of screens should be confirmed with the PO.
- **A3 — AC-3 vs epic out of scope ("A sort parameter on the admin organizations endpoint").** These do not contradict each other: the Technical Details say sorting is done on the client and no sort parameter was added. However, the list is paginated on the server, so client-side sorting probably sorts **only the current page**, not the whole list. AC-3 does not say which. TC-003 checks the current page only. PO/dev to confirm the expected scope of the sort.
- **A4 — AC-3 position of empty values.** AC-3 does not say where organizations without a quota row (AC-2 empty marker) go in ascending or descending order. Not tested; to be confirmed.
- **A5 — AC-4 and organizations without a quota row.** With Daily or One time selected, TC-004 expects no empty-marker row; this follows from "only the organizations with that frequency". AC-4 does not say whether **All** includes organizations without a quota row. TC-005 does not check this.
- **A6 — AC-4 combined with the Status filter.** The AC only says the Frequency filter sits next to the Status filter. How the two filters combine (AND), and whether changing Status keeps the Frequency value, is not specified, so it is not tested.
- **A7 — AC-2 test data.** No UI path is known to create an organization without a quota row. A legacy organization or a developer setup is needed. The exact empty marker (e.g. "—") is not named and must be read from another optional column.
- **A8 — AC-5 direction.** The AC names only "an operator changes" the frequency. TC-006 checks both directions (Daily → One time → Daily), and the second change also restores the test data.

### Test data QA must provide
- Back office URL and super admin credentials (target environment)
- Names of a DAILY org, a ONE_TIME org and a modifiable DAILY test org; expected counts of DAILY and ONE_TIME orgs
- An org without a quota row (or a developer setup)
- Front office editor and reader credentials
