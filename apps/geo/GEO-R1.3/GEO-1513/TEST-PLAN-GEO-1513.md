### QA Test Plan for GEO-1513 — Action Center Improvements

**Updated:** 2026-10-25 | **Source CSV:** testcases-coverage-epicGEO-1513.csv (9 TCs) | **Status:** Approved 2026-10-25

**Objective:** Verify the Action Center improvements: the "Most prompts" sort of the Target Sources cards with a "Used in N prompts" count matching the "Prompts associated with this source" panel, the default sort and the export left unchanged (GEO-1184, design GEO-1208), and the reuse of a page verdict confirmed less than N days ago instead of a new Firecrawl capture (GEO-1534, backend, N pending the PO). Cross-epic integration and non-regression checks are in the release plan TEST-PLAN-GEO-R1.3.

#### Test Scenarios & Detailed Test Cases

**Target Sources Most Prompts Sort (stories: GEO-1184)**

- Scenario 1: Most Prompts Order - Verify that with "Most prompts" selected the Target Sources cards are in descending order of the prompt count shown on them, ranks restarting at 1 in the new order. *(new)*
- Scenario 2: Sort Within Tab, Scope and Period - Verify that the Most prompts sort applies within the current tab (All, Improve visibility, Improve perception) and the current scope and period, the same way the default sort does. *(new)*
- Scenario 3: Prompt Count on Each Card - Verify that each card shows the number of prompts that use the source as "Used in N prompts" ("Used in 1 prompt" in the singular) on a line under the failing-article lines, in both sorts. *(new)*
- Scenario 4: Card Count Matches the Panel - Verify that the count on a card equals the number of distinct prompts listed in its "Prompts associated with this source" section, whose All tab shows the same total (e.g. "All (24)"), all engines and locales together. *(new)*
- Scenario 5: Tie Rule - Verify that sources with the same prompt count are ordered by failing articles, then by domain. *(new)*
- Scenario 6: Default Sort and Export Unchanged - Verify that, when Most prompts is not selected, the default sort by failing articles and the export are unchanged. *(new)*
- Scenario 7: Export Ignores the Sort - Verify that the PPTX and XLSX exports are identical whether Most prompts or the default sort is selected. *(new)*
- Scenario 8: Sort Control and Wording - Verify that the sort control sits in the page header left of the Card view / List view switch, is named "Sort by", and offers "Failing articles" (default) and "Most prompts" with their one-line descriptions. *(new)*
- Scenario 9: List View Prompts Column - Verify that the list view shows a "Prompts" column after "Articles" with a descending indicator while Most prompts is active. *(new)*
- Scenario 10: Sort Choice Persistence - Verify that the sort choice is kept when switching tabs, views, filters and while paging with Show more, and resets to the default on the next visit of the page. *(new)*

**Firecrawl Verdict Reuse (stories: GEO-1534)**

- Scenario 11: Recent Verdict Reused - Verify that a page whose verdict was confirmed by a capture less than N days ago is not captured again on the next run and keeps its existing verdict in Target Sources. *(new)*
- Scenario 12: Page Read Again After N Days - Verify that once N days have passed since its last real capture, the page is captured and judged again, a reuse never counting as a capture. *(new)*

#### Edge Cases & Boundary Conditions

* Source used in a single prompt: the card reads "Used in 1 prompt".
* Prompt count: distinct prompts whose answers cite the domain in the period, all engines and locales together, not the number of answers; a prompt cited by two engines counts once in "All (N)", so All can be smaller than the sum of the engine tabs.
* Equal prompt counts: ordered by failing articles, then domain.
* Default sort selected: the list view keeps its "Prompts" column without the descending indicator.
* Next visit of Target Sources: the sort resets to the default.
* Page that changed (brand added or removed) or became unreachable within N days: keeps its previous verdict for at most N days (GEO-1534 trade-off).
* N above 7 days: nothing more is saved, a verdict being judged again every 7 days anyway.

#### Open Points (not blocking)

* GEO-1513: the epic description holds only its title; the scope is taken from its stories; Design Task GEO-1208 not imported.
* GEO-1184: the design names the sort options "Failing articles" (default) and "Most prompts" with their one-line descriptions (Scenario 8); confirm the final labels and descriptions with the PO.
* GEO-1184 / GEO-1208: the design decisions D-1 to D-7 were submitted "please confirm" and the PO answered only "design done ready for dev" (PO 866287); the designer questions (citations line, count following the filters, panel total vs engine tabs, export not following the sort) have no written PO answer; FR / ES strings still to add to the strings sheet.
* GEO-1534 (dev 867357): the approach and the value of N (3 proposed, options 0 / 2 / 3 / 4) await the PO approval; no AC section, one expected result; backend only, so Scenarios 11 and 12 are checked through the verdict kept in Target Sources plus the Firecrawl usage or logs (dev support needed), and testable only after the PO decision.

**Environment:** Staging — a brand analysis with Target Sources data (Toyota 439acd96), card and list views, PPTX and XLSX exports; dev support for the Firecrawl usage or logs once the PO has decided N (GEO-1534).

**Priority:** High

**Assignee:** Assiya.Benramdane (to confirm)

#### AC Coverage by Story

Result: **4 / 4 ACs covered** (GEO-1184 3/3, GEO-1534 1/1). Every AC maps to at least one scenario. "Partial" = only the visible output is testable (see Open Points). Scenarios 8 to 10 trace to the GEO-1208 design decisions (D-1, D-2, D-6, D-7), not to an AC. GEO-1534 has no AC section; its expected result is counted as one AC.

**GEO-1184 — [Target Sources] Sort the cards by the number of prompts that use each source**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Most prompts: descending prompt count | 1, 2, 3, 5 | Yes |
| AC2 | Card count equals the panel list | 4 | Yes |
| AC3 | Default sort and export unchanged | 6, 7 | Yes |

**GEO-1534 — [Target Sources] Firecrawl usage above the plan: the same pages are captured again every day**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| Expected | Verdict confirmed less than N days ago reused, no new capture | 11, 12 | Partial (backend only; N pending PO; needs Firecrawl usage or logs) |