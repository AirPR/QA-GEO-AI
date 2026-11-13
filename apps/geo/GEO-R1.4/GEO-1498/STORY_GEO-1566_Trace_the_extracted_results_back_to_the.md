# GEO-1566: STORY-53.3: Trace the extracted results back to the answer

**Story ID:** GEO-1566
**Issue Type:** Story
**Title:** STORY-53.3: Trace the extracted results back to the answer
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1498
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1566

## User Story

> As a GEO user, I want to see where each extracted result comes from in the answer, so that I can check the ranking, the competitive outcome and the verdict myself.

- **As** a GEO user
- **I want** to see where each extracted result comes from in the answer
- **So that** I can check the ranking, the competitive outcome and the verdict myself.

## Acceptance Criteria

_14 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1498, User Story 1.3)

- Given an answer, When it renders, Then every brand of the extracted ranking is highlighted in the text, the tracked brand with its own style, and brand names inside a table of the answer are not highlighted (PM, 2026-10-30, answer on GEO-1498 to ADR-11 question 6: "every brand of the extracted ranking is highlighted, otherwise clicking a ranking row could lead to nothing in the answer"; this supersedes the epic's original "tracked brand and its competitors" wording)
- Given an engine that names a brand differently from the analysis (eg: "Claude" for Anthropic), When the answer renders, Then that name is highlighted as the brand too
- Given the extracted ranking, When I click a brand row, Then the answer expands if needed, scrolls to the first mention of that brand and highlights it
- Given a Competitive question, When the panel renders, Then it shows the outcome card of story 1.7 and not a ranking, and clicking a brand of the card scrolls to its first mention in the answer; the "About {brand}" card of today goes, and brands carry no text badge: the tracked brand keeps its highlight, as today (the chosen brand has no style of its own)
- Given a brand in the outcome card or the ranking, When it renders, Then it shows the brand family, as the questions table does since GEO-1530, with the name the engine wrote below it when it differs (eg: "BTL Aesthetics", then "Emsculpt Neo"), so the user finds it in the highlighted answer
- Given an unbranded analysis (no tracked brand), When the panel of a Competitive question renders, Then each engine tab shows the full answer, then a winner card "{brand} was chosen" when the answer picks one brand with no condition (frame 10g), otherwise one card for each brand the answer picks under a condition, under "Brands the answer picks, derived from the answer above" (frame 10h); there is no result card above the answer and the pill has no badge
- Given a Visibility answer that names no brand, When the panel renders, Then the answer shows in full with the verdict "No brands named" on the red card, the line "{engine} answered without naming any brand, so this answer has no ranking." and no ranking rows; "Unranked" keeps its current meaning in the questions table (no engine names the brand)
- Given any extracted block (verdict, ranking, competitive outcome, themes), When it renders, Then the result card above the answer carries "Extracted from {engine}'s answer", and every block below the answer sits in the section "Extracted from this answer"
- Given the question panel, When it renders, Then it shows from top to bottom: the result card, the answer card, the section "Extracted from this answer", then the sources; the section has one subtitle line that says what it holds: "Brand ranking derived from the answer above" with the ranking rows (Visibility), "Winning brand derived from the answer above" with one brand card (Competitive, Chosen and Not chosen), "Brands the answer picks, derived from the answer above" with one card per brand (Competitive, Conditional and Overlooked, frames 10b and 10d), "Winner derived from the answer above" with the "{brand} was chosen" card (unbranded), "Perception themes derived from the answer above" with one grey tag per theme, text only, no click (Perception, frame 04a), as in GEO-1017 frames 01, 10a, 10b, 10c, 10g and 04
- Given an answer with nothing to extract ("No brands named", not counted), When the panel renders, Then the section "Extracted from this answer" is not shown and the sources follow the answer card (frames 04f, 04d); when one extraction failed, the section stays with its subtitle and the amber line of story 1.5 replaces its content (frames 04, 04c, 10f)
- Given the ranking, When it renders, Then each brand shows its own logo, the tracked brand included (instead of today's check mark), the tracked brand row keeps its highlight, the list shows every brand the answer names with no top-5 cap, and products of the same brand are folded into one row per brand family (GEO-1553), ranked at the family's best (smallest) rank

### Change 12 Nov 2026: answers collected the old way (GEO-1594)

- Given an analysis date collected before natural answers (one stored row per product, eg: "Toyota Prius", "Toyota Camry Hybrid"), When the Visibility panel renders, Then the ranking shows one row per brand family, numbered 1, 2, 3… with no gap in the order of each brand's best place (a product never pushes the next brand down, GEO-678 US 1.4), with the product the engine ranked below the brand when it differs (eg: "Toyota", then "Toyota Prius")
- Given the same answer, When the panel renders, Then the position card reads "{brand}'s Position", never a product name, and the rank on the card, on the engine tab and on the brand's row in the list is the same number
- Given those dates, When Average Position, Brand Rankings, the questions table or the Excel export are computed, Then they keep the stored places, as before (US 1.7: older dates are not re-read)

## Technical Details

### Scope note

Display only, depends on STORY-50.2 (GEO-1551, mention positions), STORY-50.3 (GEO-1552, brand family and other names), STORY-50.4 (GEO-1553, ranking) and STORY-50.5 (GEO-1554, competitive outcome and picked brands). Story 1.7 = STORY-53.7, story 1.5 = STORY-53.5. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").

## Dependencies

- **Blocks:** GEO-1568, GEO-1570
- **Blocked by:** GEO-1551, GEO-1552, GEO-1553, GEO-1554, GEO-1564, GEO-1567
- **relates to:** GEO-1605 (Bug, Done) — [GEO-Category] Prompt detail panel: clicking a ranking row scrolls its mention under the sticky engine tabs
- **relates to:** GEO-1606 (Bug, Done) — [GEO-Category] Prompt detail panel: brands in the ranking of a natural answer show initials instead of their logo
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1498
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1566
- External Spec: [53-3-trace-the-extracted-results-back-to-the-answer.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-53/53-3-trace-the-extracted-results-back-to-the-answer.md)
