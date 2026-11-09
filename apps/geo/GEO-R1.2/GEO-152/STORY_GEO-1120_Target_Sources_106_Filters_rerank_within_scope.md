# GEO-1120: [Target Sources] 10.6 — Filters re-rank within scope

**Story ID:** GEO-1120
**Issue Type:** Story
**Title:** [Target Sources] 10.6 — Filters re-rank within scope
**Status:** [QA IN PROGRESS] QA In Progress
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-15
**Updated:** 2026-10-02
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1120

## User Story

**As** a user analyzing several countries, categories, AI engines, and date ranges,
**I want** the target list scoped to my current filters,
**so that** the priorities reflect the market and period I am looking at.

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

_Story 1.6 of EPIC-010. Written by the team from the PM's 2026-09-14 epic rewrite, updated with the PM's answers of 2026-09-16 and his decision of 2026-09-17._

**State:** ✅ Ready — one new criterion (AC9), the rank question settled on 2026-09-17, two questions recorded rather than guessed.

**The highest-risk story of the set.** Not because of a blocker — because it is the easiest to implement wrongly and the most expensive to correct afterwards. AC9 raises that risk rather than lowering it: **it changes what "the selected range" means for this view alone.**

---

**As** a user analyzing several countries, categories, AI engines, and date ranges,
**I want** the target list scoped to my current filters,
**so that** the priorities reflect the market and period I am looking at.

### Functional ACs

_(copied verbatim from the epic)_

**AC1 — Recompute, do not filter — and the displayed ranks are renumbered** ⭐ _changed by the PM, 2026-09-17_

- Given: country, category, AI engine, date range, **and source type** filters
- When: a filter is applied
- Then: failing article counts, citation counts, reason badges, and the resulting order are **recomputed within the selected scope** rather than globally computed and then filtered, and the **displayed ranks are renumbered 1…N with no gaps**
- _The PM, 2026-09-17: "The rank is_ **_a position, not a stable identifier_**_." The design frame_ `13862:447428` _kept the ranks of the unfiltered list, 1, 4, 7, 9, and is corrected to 1, 2, 3, 4._

**AC2 — Source type filter**

- Given: the source type filter
- When: a source type is selected
- Then: only the sources of that type remain, and the ranks, the counts, and the **tab membership** are recomputed inside that selection under the same rules as every other filter

**AC3 — The filter lists only what is present** — ✅ _verified against production by the PM, 2026-09-16_

- Given: the source type filter
- When: it is displayed
- Then: it lists only the source types present in the current scope

**AC4 — Date range membership**

- Given: a date range filter
- When: it is applied
- Then: a failing article counts only if at least one of its qualifying answers falls inside the selected range
- ⚠️ _Since AC9, "the selected range" means the_ **_effective_** _window — the selected range widened to the 7-day floor. AC4 is the membership test; AC9 is what it tests against._

**AC5 — Multi-scope articles**

- Given: a failing article whose qualifying answers span several scopes
- When: a single scope is selected
- Then: the article counts in that scope only if at least one of its qualifying answers belongs to it

**AC6 — Empty sources disappear**

- Given: a source with no failing articles in the selected scope
- When: the filtered list renders
- Then: that source does not appear

**AC7 — Filters first, then the tab** — ✅ _confirmed by the PM, 2026-09-16_

- Given: a filter and a verdict tab are both active
- When: the list renders
- Then: the filters define the scope first and the tab then selects the verdict inside that scope, so the counts, the badges, and the order of the tab are computed from the **filtered** failing articles only

**AC8 — No effect on the export**

- Given: the source type filter
- When: the analysis export is generated
- Then: the filter has no effect on the exported section, like the category filter of User Story 1.9

**AC9 — The source window has a 7-day floor** ⭐ _added by the PM, 2026-09-16 — copied verbatim from the epic_

- Given: any selected date range
- When: the target list is built
- Then: the sources are pooled over a window of **at least 7 days ending on the most recent snapshot in scope**; a selected range **longer** than 7 days is used in full, and a report holding **fewer** than 7 days of history uses every day it has. This window applies to the **Actions Center only**. AI Citation Sources keeps the selected range unchanged, so on a range shorter than 7 days the two views deliberately cover different periods and their source sets do not tie

---

### Why the floor exists, and why the two views must not be reconciled

> _"We ran an investigation on the Toyota report to check whether the cited sources are consistent across analyses._ **_They are not, on a single analysis._** _… AI Citation Sources reports what the engines cited in the period the user chose, while the Actions Center must rank on a stable source set, and a single analysis does not produce one._ **_Do not reconcile them._**_"_

🚩 **Read this before filing a bug.** On a range shorter than 7 days the Actions Center and AI Citation Sources show **different source sets for the same report and the same filters**. That is the specification. The epic records the consequence as accepted debt: _"Whether the dashboard minimum should rise to 7 days everywhere is a separate decision and needs its own story."_

The matching criterion on the **export** is AC8 of story 1.9, and the matching **exclusion** for AI Citation Sources is the last AC of story 1.11. All three were added together and must stay together.

---

### 🚩 Open question for the PM — how the citation counter aggregates across the pooled days

AC9 settles which **sources** are pooled. It does not say what happens to the counter the card, the table and the panel header all display — _"Cited 12× in gap answers"_.

The same URL cited on five of the seven pooled days is one article — unambiguous. But its citation count can be read two ways, and **they produce different rankings**, because that counter is the tie-break of story 1.3 AC1:

| Reading | What it measures | Effect |
| --- | --- | --- |
| **Sum across the window** | how insistently the engines keep citing it | a source cited every day outranks one cited once by seven different answers |
| **Distinct qualifying answers** | how widely it spreads across the analysis | the reverse |

Nothing in the epic chooses. **Not implemented either way until answered.**

### The short-history case — behaviour settled, one wording gap

**The behaviour is not in doubt.** AC9 says it: a report with two snapshots pools those two days, one snapshot pools one. Nothing degrades, nothing special-cases.

**One wording gap, for the PM.** AC9 is phrased in _days_, but what the floor buys is pooled **analyses** — the reason given is that sources _"are not consistent across analyses, on a single analysis"_. For a `DAILY` organisation the two are the same number. For a `ONE_TIME` organisation they are not: snapshots arrive only when a scope change re-arms a run, so a two-year-old report has abundant _history_ and often **one** analysis in any 7-day window. It satisfies AC9 as written while getting none of what AC9 is for.

**The product question that follows:** when the window holds fewer analyses than the floor assumes, does the view say anything? It changes no line of the implementation either way — and a `DAILY` report is in the same position on day 1, which is the first Actions Center a new client ever sees.

---

## Design ACs

Figma: canvas **Action Center**, section `13719:92628`. Frames reviewed 2026-09-14, re-reviewed 2026-09-16.

**DAC1 — Source type filter open (**`13862:446929`) — the dropdown listing the source types, AC3 requiring only the types present in the current scope.

**DAC2 — A source type applied (**`13862:447428`) — "Journalism" selected, the list re-scoped and re-ranked inside that selection (AC2). ⭐ _Correction requested 2026-09-17: the frame kept the ranks of the unfiltered list, 1, 4, 7, 9. They become 1, 2, 3, 4 (AC1)._

**DAC3 — Long source type names crop, the list does not** — annotation `13969:25773` + example `13970:14902`, verbatim: _"Corner case: the list grows to fit the widest type name. The input stays at 200px and crops a long selection with an ellipsis; the full name shows in a tooltip on hover."_ Three testable rules: the **dropdown** widens to the widest option; the **input** is fixed at 200 px and truncates with an ellipsis (`Aggregator/Enc…`); the full name shows **on hover**.

**DAC4 — Global filter bar (on every frame)** — `Last 7 days` · `AI Engines (3)` · `All Markets` · export icon, top-right. The category filter is the left navigation, not a control in this bar.

### Design observation — answered 2026-09-16, still open on 2026-09-17

No frame shows a **filter and a verdict tab active together**, which is exactly AC7's case. `13862:447428` shows the filter with the **ALL** tab only. The PM confirmed the gap and kept the rule: _"You are right. AC7 is the rule and it stands: scope first, verdict second. Asking the designer for the frame."_ **The rule does not wait for the frame** — it is listed on GEO-158 as still owed.

---

The **Technical Part** and the technical ACs live in the repository spec — they are dev context and are not read by QA. They cover the scope-parameterised query, the cache key on the **effective** window, the multi-snapshot pooling (this is the first view in the product that does not anchor on a single snapshot), and the single server-side computation of the window. TAC2, which requires contiguous ranks, **stands as written** after the 2026-09-17 arbitration.

📋 Spec complète : [10-6-filters-rerank-within-scope.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-6-filters-rerank-within-scope.md)
📄 Epic README : [README.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md)
🔀 PR : https://github.com/AirPR/geo-analytics/pull/549

## Technical Details

_No dedicated Technical Details / Implementation Notes section in the Jira description (see the repository spec link below if present)._

## Dependencies

- **Blocks:** None mentioned
- **Blocked by:** None mentioned

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Code reviewed and merged
- [ ] Tests (unit / E2E) passing
- [ ] QA validated on staging
- [ ] Localisation (en-US, en-GB, fr-FR, es-ES) checked where UI copy changes

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-152
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1120
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/10-6-filters-rerank-within-scope.md
- External Spec: https://github.com/AirPR/geo-analytics/blob/feature/GEO-152-actions-center-target-sources/docs/implementation-artifacts/epics/epic-10-target-sources/README.md
- External Spec: https://github.com/AirPR/geo-analytics/pull/549
