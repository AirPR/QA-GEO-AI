# Simplify Key Concepts Sentiment Display

**Epic ID:** GEO-1068
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Created:** 2026-08-05
**Updated:** 2026-10-20 (Jira description updated by Quentin Reant on 2026-10-19 20:56 New York time; synced 2026-10-20)
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1068

## Description / Functional Need

The key concepts view currently communicates the sentiment of each concept three times: a polarity classification (positive, mixed or negative, conveyed by color), a numeric sentiment score on a -100 to +100 scale shown next to the concept, and, when the concept is expanded, a barometer gauge that visualizes the same score on a negative-to-positive axis. Combined with the frequency metric that each concept also carries, a single row stacks four numbers and indicators, and users cannot tell which one to read. The numeric score is the weakest of them: at the granularity of a single concept it is not explainable, two concepts with the same polarity but slightly different scores suggest a precision the underlying classification does not have, and the barometer repeats it a third time without adding information.

This epic simplifies the display to the two signals that matter: how often a concept appears (frequency) and whether it is perceived as positive, mixed or negative (polarity). The numeric sentiment score and the barometer disappear from every place a concept is shown, including the expanded detail view and exports. Polarity becomes an explicit label rather than a color-only cue, so the information removed from the score is not lost, it is stated more honestly. Sorting and filtering keep working on polarity. Nothing changes in how concepts are classified or how frequency is computed; this is a display simplification only.

Updated 2026-10-20 after the dev decisions on GEO-1068 (comment of 2026-10-16, D1 to D7): criteria marked (Updated 2026-10-20) changed.
- 1.3: inside a polarity group, the sort goes by frequency, then by name (D1)
- 1.4: the XLSX export loses the Score column (D2); a shared analysis means another user of the same organisation, as share links do not exist yet (D3); in the slide export, the frequency takes the polarity colour and the polarity is a word in the export language (D6)

### Decisions D0–D7 (validated by PO 2026-10-20)

Decisions D0–D7 were taken by OS-Team on 2026-10-16 while the PM was on leave (GEO-1068 comment 863917, Abdenasser Aroukhsiss) and validated by the PO/PM: "OK for all your decisions. Epic updated so it matches: 1.3 sort tie-break by frequency then name (D1), 1.4 no Score column in the XLSX (D2), same organisation instead of shared link (D3) and polarity colour + translated polarity word in the slide export (D6), all marked Updated 2026-10-20. D0, D4, D5 and D7 need no change in the epic." (Quentin Reant, GEO-1068 comment 865134, 2026-10-19 20:56 New York time = 2026-10-20 in Europe).

Dev note (comment 863917): "The score is still computed by the API, only its display is removed."

### Planned stories in the epic description

The epic description lists the four stories below with "Story ID: TBD". They exist in Jira as GEO-1266 to GEO-1269 (numbered 48.1 to 48.4). Since the 2026-10-20 epic update, the epic text is ahead of the stories (unchanged in Jira): 1.3 AC1 now holds the tie-break (already in the GEO-1268 Rules), and 1.4 has 3 ACs (AC1 slide export, AC2 XLSX, AC3 another user of the same organisation) while GEO-1269 keeps 2 (AC1 slide export with the XLSX rule in its Rules, AC2 shared analysis). QA keeps the story numbering (decision 2026-10-20).

- User Story 1.1: Show only frequency and polarity on each concept → GEO-1266
- User Story 1.2: Remove the score and barometer from the expanded concept view → GEO-1267
- User Story 1.3: Keep sorting and filtering consistent with the simplified display → GEO-1268
- User Story 1.4: Apply the simplified display everywhere concepts appear → GEO-1269

### Still open (non-blocking)

- Whether the category-level aggregate sentiment indicator (the -100 to +100 sentiment tile shown among the category metrics) should also be removed or kept; it is a separate element from the per-concept display and is untouched by this epic until decided
- Note (sync 2026-10-20): GEO-1269 rules state "The category-level Sentiment KPI is unchanged (decision D5)". D5 was validated by the PO, who keeps this epic point as is: "D0, D4, D5 and D7 need no change in the epic." (GEO-1068 comment 865134). The tile stays untouched by this epic.

### Dependencies

- Relates to GEO-1209 (EPIC-046: Unbranded Analysis and Other Prompts): GEO-1209 cites this epic as "EPIC-044" for Top Topics (story 1.3 = GEO-1243). The row component (`TopConceptsCard`) is shared by brand Top Concepts and unbranded Top Topics / Other page.

## Scope

_No explicit Scope section in the Jira description; derived from the epic text and the four planned stories._

- Show only frequency and polarity (explicit label) on each concept of the key concepts list
- Remove the numeric sentiment score and the barometer from the expanded concept view
- Keep sorting and filtering working on polarity
- Apply the simplified display to exports (slides, PDF, XLSX) and shared views
- Display simplification only: classification and frequency computation unchanged

## Out of Scope

- Any change to how concepts are classified as positive, mixed or negative, or to how frequency is computed
- The sentiment distribution summary above the concepts list (share of positive, mixed and negative concepts), which stays as is
- Whether the underlying numeric score continues to be computed internally; this epic only removes it from display

## Associated Stories & Tasks

| ID | Type | Title | Status |
|----|------|-------|--------|
| GEO-1266 | Story | 48.1 Show only frequency and polarity on each concept | ⏳ Ready for QA |
| GEO-1267 | Story | 48.2 Remove the score and barometer from the expanded concept view | ⏳ Ready for QA |
| GEO-1268 | Story | 48.3 Keep sorting and filtering consistent with the simplified display | ⏳ Ready for QA |
| GEO-1269 | Story | 48.4 Apply the simplified display everywhere concepts appear | ⏳ Ready for QA |

**Total: 4 stories + 0 tasks — 11 ACs**

## Architecture

_No architecture section in the epic description._ Surfaces from the stories: frontend key concepts list `TopConceptsCard` (GEO-1266), concept detail panel (GEO-1267), sort and filters of the list (GEO-1268); backend exports PPTX / PDF / XLSX (GEO-1269). No Figma (decision D0). Display simplification only: concept classification and frequency computation unchanged.

## Acceptance Criteria — Summary

### GEO-1266 — Show only frequency and polarity on each concept

- AC1: Frequency and polarity only
- AC2: Explicit label
- AC3: Same concepts, same frequency

### GEO-1267 — Remove the score and barometer from the expanded concept view

- AC1: Frequency and polarity, no score
- AC2: No barometer
- AC3: Sources unchanged

### GEO-1268 — Keep sorting and filtering consistent with the simplified display

- AC1: Sort by polarity group (epic 1.3 AC1 Updated 2026-10-20: then by frequency, highest first, inside a group, then by name — D1)
- AC2: Filters unchanged
- AC3: Distribution summary unchanged

### GEO-1269 — Apply the simplified display everywhere concepts appear

- AC1: Slide export (epic 1.4 AC1 Updated 2026-10-20: frequency in the polarity colour, polarity as a word in the export language — D6; XLSX rule = epic 1.4 AC2 Updated 2026-10-20, no Score column — D2)
- AC2: Shared analysis (= epic 1.4 AC3 Updated 2026-10-20: another user of the same organisation; share links do not exist yet and are not part of this epic — D3)

## Links

- https://onclusive.atlassian.net/browse/GEO-1068
- GEO-1266: https://onclusive.atlassian.net/browse/GEO-1266
- GEO-1267: https://onclusive.atlassian.net/browse/GEO-1267
- GEO-1268: https://onclusive.atlassian.net/browse/GEO-1268
- GEO-1269: https://onclusive.atlassian.net/browse/GEO-1269
- Related epic GEO-1209 (Unbranded Analysis and Other Prompts): https://onclusive.atlassian.net/browse/GEO-1209
- Spec 48.1: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-48/48-1-show-only-frequency-and-polarity-on-each-concept.md
- Spec 48.2: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-48/48-2-remove-the-score-and-barometer-from-the-expanded-concept-view.md
- Spec 48.3: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-48/48-3-keep-sorting-and-filtering-consistent-with-the-simplified-display.md
- Spec 48.4: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-48/48-4-apply-the-simplified-display-everywhere-concepts-appear.md
