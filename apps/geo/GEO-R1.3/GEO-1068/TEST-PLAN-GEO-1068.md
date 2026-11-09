### QA Test Plan for GEO-1068 — Simplify Key Concepts Sentiment Display

**Updated:** 2026-10-25 | **Source CSV:** testcases-coverage-epicGEO-1068.csv (36 TCs) | **Status:** Approved 2026-10-25

**Objective:** Verify that key concepts show only their frequency and an explicit Positive / Mixed / Negative polarity label, with no numeric sentiment score nor barometer, in the concept list, the expanded concept view, the sort and filters, the PPTX / PDF / XLSX exports and for other users of the organisation, with the same concepts and frequencies as before the release. Cross-epic integration and non-regression checks are in the release plan TEST-PLAN-GEO-R1.3.

#### Test Scenarios & Detailed Test Cases

**Concept Row Display (stories: GEO-1266)**

- Scenario 1: Frequency and Polarity Only - Verify that each concept row of the key concepts list shows its frequency and its polarity and no numeric sentiment score (no "-80 sentiment").
- Scenario 2: Explicit Polarity Label - Verify that the polarity is stated as an explicit Positive / Mixed / Negative label in the row's meta line, not by colour alone, while the coloured bar and percentage colour stay.
- Scenario 3: Same Concepts, Same Frequency - Verify that the concepts listed and their frequency values are unchanged from before the release for the same analysis and filters.

**Concept Detail Panel (stories: GEO-1267)**

- Scenario 4: Panel Frequency and Polarity, No Score - Verify that the expanded concept view shows the concept's frequency and its polarity label (white pill on the coloured header) and no -100 to +100 sentiment score.
- Scenario 5: No Barometer - Verify that the expanded concept view no longer shows the Negative to Positive barometer gauge or its cursor.
- Scenario 6: Panel Sources Unchanged - Verify that the cited sources and all other existing panel content (coloured header, concept name, close button, frequency) remain unchanged, with no quotes added.

**Concept Sort and Filter (stories: GEO-1268)**

- Scenario 7: Sort by Polarity Group - Verify that sorting by Sentiment orders concepts positive first, then mixed, then negative, by frequency then A–Z inside a group, without exposing any numeric score.
- Scenario 8: Polarity Filters Unchanged - Verify that filtering to positive, mixed or negative behaves exactly as before the release.
- Scenario 9: Distribution Summary Unchanged - Verify that the sentiment distribution summary above the list (share of positive, mixed and negative concepts) is unchanged.

**Concept Exports and Other Users of the Organisation (stories: GEO-1269)**

- Scenario 10: Slide Export Concepts - Verify that the PPTX and PDF key concepts section shows each concept with "{n} sources • {Positive | Mixed | Negative}" with the polarity as a word in the export language and its frequency % in the polarity colour, with no numeric sentiment score and no barometer.
- Scenario 11: Same-Organisation User View - Verify that another user of the same organisation opening the analysis sees the key concepts view matching the simplified main view (epic 1.4 AC3).

#### Edge Cases & Boundary Conditions

* Polarity filter on: the Sentiment sort sorts a single group and reads as by frequency.
* Equal frequencies: ordered by name A–Z, case and accents ignored.
* Chosen topic sort: kept when moving to a category page and back, as the period filter is.
* French XLSX export: Mixed concepts read "Mitigé", as in the summary line and the slide exports.

#### Open Points (not blocking)

* GEO-1068: since the 2026-10-20 epic update, epic 1.4 holds 3 ACs (slide export, XLSX, same organisation) while GEO-1269 keeps 2; QA keeps the story numbering (Scenario 10 includes the XLSX rule, Scenario 11 = epic 1.4 AC3).
* GEO-1068 (still open): polarity filters single or multiple selection and pill counts (A2); reversible Sentiment sort (A3); XLSX headers translated in FR / ES (A4); how the export language is chosen (A5); role needed by the other user of the organisation (A6, Scenario 11); no quote count on brand concept rows (A8).

**Environment:** Staging — the Toyota analysis (439acd96) with its 2026-10-05 baseline exports (GEO-1266 AC3); unbranded flag ON for Top Topics and the Other page; a second user of the same organisation (GEO-1269 AC2); exports in EN, FR and ES.

**Priority:** High

**Assignee:** Assiya.Benramdane (to confirm)

#### AC Coverage by Story

Result: **11 / 11 ACs covered** (GEO-1266 3/3, GEO-1267 3/3, GEO-1268 3/3, GEO-1269 2/2). Every AC maps to at least one scenario. "Partial" = only the visible output is testable (see Open Points).

**GEO-1266 — Show only frequency and polarity on each concept**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Frequency and polarity only | 1 | Yes |
| AC2 | Explicit label | 2 | Yes |
| AC3 | Same concepts, same frequency | 3 | Yes (baseline: Toyota exports of 2026-10-05) |

**GEO-1267 — Remove the score and barometer from the expanded concept view**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Frequency and polarity, no score | 4 | Yes |
| AC2 | No barometer | 5 | Yes |
| AC3 | Sources unchanged | 6 | Yes |

**GEO-1268 — Keep sorting and filtering consistent with the simplified display**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Sort by polarity group | 7 | Yes |
| AC2 | Filters unchanged | 8 | Yes |
| AC3 | Distribution summary unchanged | 9 | Yes |

**GEO-1269 — Apply the simplified display everywhere concepts appear**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Slide export (incl. XLSX rule = epic 1.4 AC2) | 10 | Yes |
| AC2 | Shared analysis (= epic 1.4 AC3, same organisation) | 11 | Yes |