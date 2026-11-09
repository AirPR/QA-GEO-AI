### QA Test Plan for GEO-1113 — Back office: Frequency column on the Organizations list to detect collection abuse

**Updated:** 2026-10-13 | **Source CSV:** testcases-coverage-epicGEO-1113.csv (7 TCs)

**Objective:** Each organization has a collection frequency: Daily refreshes every day, One time collects once. Until now an operator could only see this value inside the organization modal, one organization at a time. This epic adds the frequency to the back office Organizations list as a sortable column and as a filter that covers every page. Internal operators can then find organizations collecting daily without the entitlement and stop the cost early. The value stays internal to the back office: front office users see no change.

#### Test Scenarios & Detailed Test Cases

**Back Office Organizations List — Collection Frequency Column, Sort & Filter (stories: GEO-1172)**

- Scenario 1: Frequency Column Display - Verify that a super admin opening Administration > Organizations sees a Frequency column right after User quota, showing "Daily" or "One time" on each row.
- Scenario 2: No Quota Row Marker - Verify that an organization without a quota row shows the same empty marker in the Frequency cell as the other optional columns, and that the list still loads.
- Scenario 3: Frequency Column Sorting - Verify that clicking the Frequency column header cycles the rows through ascending, descending and back to no sort, exactly like the other sortable columns.
- Scenario 4: Daily Filter Across Pages - Verify that selecting Daily in the new Frequency filter shows only Daily organizations on every page, returns the list to page 1 and updates the result count.
- Scenario 5: One Time and All Filter - Verify that selecting One time shows only One time organizations with an updated result count, and that selecting All brings back the full list.
- Scenario 6: Modal and List Consistency - Verify that after a new frequency is saved in the organization modal, that row's Frequency column shows the new value without a manual page reload.
- Scenario 7: Front Office Unchanged - Verify that front office editor and reader users see no frequency value, column, filter, label or new screen anywhere in the product.

#### Edge Cases & Boundary Conditions

* Organization without a quota row (legacy or edge case): the Frequency cell shows the same empty marker as the other optional columns and the list does not fail.
* Third click on the Frequency column header: the sort is removed and the rows return to their default order.
* Frequency filter selected while on a page other than page 1: the list returns to page 1 and the result count reflects the filter.
* Frequency filter set back to All: the full list and the unfiltered result count are restored.
* Frequency changed and saved in the organization modal: the list row updates without a manual page reload.

#### Open Points (not blocking)

* GEO-1172: AC3 - Sorting runs on the client and covers only the current page (no sort parameter on the endpoint, which is out of scope at epic level), and no column shows a sort-direction indicator, including Name. PO to confirm that "sort by frequency" applies to the current page only and that having no indicator is expected.
* GEO-1172: AC4 - Staging has only 6 Daily organizations (one page of 20), so "across all pages" cannot be checked on staging. A dataset with more than 20 organizations of the filtered frequency is needed.
* GEO-1172: AC4 - The AC does not say whether "All" includes organizations without a quota row, or whether Daily and One time exclude them.
* GEO-1172: AC4 - The AC does not specify how the Frequency filter combines with the Status filter (expected AND, whether the page resets, whether one filter's reset affects the other).
* GEO-1172: AC2 - There is no UI path to create an organization without a quota row. Deleted organizations (Status = all statuses) show "—" in Frequency. Dev to confirm whether they are valid test data for "no quota row" or whether a dedicated legacy organization is needed.
* GEO-1172: AC6 - On a Daily organization, the front office Time Evolution chart subtitle mentions "daily". PO to confirm this is chart granularity and unrelated to the collection frequency.
* GEO-1172: AC1/AC4 - The filter options are lower-case ("all frequencies / daily / one time") where the AC says "All, Daily, One time", and the column after Frequency is labelled "US" where the epic says "US org". PO to confirm the expected wording.

**Environment:** Staging

**Priority:** High
