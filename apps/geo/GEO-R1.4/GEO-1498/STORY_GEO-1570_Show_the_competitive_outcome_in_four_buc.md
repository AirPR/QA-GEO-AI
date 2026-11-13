# GEO-1570: STORY-53.7: Show the competitive outcome in four buckets

**Story ID:** GEO-1570
**Issue Type:** Story
**Title:** STORY-53.7: Show the competitive outcome in four buckets
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1498
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1570

## User Story

> As a GEO user, I want to see when engines choose my brand, choose it only in some cases, or do not choose it, so that I understand how strong my position is in head-to-head questions.

- **As** a GEO user
- **I want** to see when engines choose my brand, choose it only in some cases, or do not choose it
- **So that** I understand how strong my position is in head-to-head questions.

## Acceptance Criteria

_19 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1498, User Story 1.7, part 1 of 2)

- Given a competitive outcome, When it is shown anywhere, Then it uses one of four labels: "Chosen", "Conditional", "Not chosen", "Overlooked" (French: "Choisie", "Sous conditions", "Non choisie", "Ignorée"; Spanish: "Elegida", "Condicional", "No elegida", "Ignorada")
- Given the AI Choice KPI card, When it renders, Then it keeps the layout of the other KPI cards (icon in the ring, value on the right, quality pill and delta, as today), and the ring becomes a donut in four parts: Chosen and Conditional highlighted (Chosen solid, Conditional lighter), Not chosen and Overlooked muted, the value being Chosen plus Conditional; the ring is amber on the Overview and on the category view, which loses its quality colour: Chosen #F59E0B, Conditional #FCD34D, Not chosen #CBD5E1, Overlooked #E2E8F0, the icon in amber
- Given the AI Choice donut, When I hover it, Then it shows the number and the share of answers in each of the four outcomes
- Given a competitive row of the questions table, When every counted engine is Chosen, or the counted engines mix Chosen and Conditional, Then the "Winner / Themes" cell shows my brand with its logo, as today, so the cell agrees with the Favorable filter
- Given a competitive row, When every counted engine is Conditional, Then the cell shows "Conditional" in the green badge (green-50 fill, green-200 border, green-700 text)
- Given a competitive row, When every counted engine is Not chosen and picked the same competitor with no condition, Then the cell shows that competitor with its logo, as today
- Given a competitive row, When every counted engine is Not chosen with different picks, or the counted engines mix Not chosen and Overlooked, Then the cell shows "Not chosen" in plain grey text, as "Lost" today, so the cell agrees with the Not Favorable filter (eg: Gemini picks UPS, ChatGPT gives UPS and FedEx the conditions, the cell shows "Not chosen")
- Given a competitive row, When every counted engine is Overlooked, Then the cell shows "Overlooked" in the red badge (red-50 fill, red-200 border, red-700 text)
- Given a competitive row, When the counted engines mix a Chosen or Conditional outcome with a Not chosen or Overlooked one, Then the cell shows "Split", as today
- Given an unbranded analysis (no tracked brand), When a competitive row renders, Then the cell shows the brand that every counted engine chose with no condition, otherwise "Split"
- Given an engine that is not counted for a question, or whose outcome could not be extracted, When the cell, the favorability and AI Choice are computed, Then that engine is left out
- Given a competitive row where no engine is counted, When it renders, Then the cell shows the grey "Not counted" chip and the row is neither Favorable nor Not favorable in the filter and the header bar
- Given the favorability filter and the header bar of the questions table, When they count competitive questions, Then Favorable means every counted engine is Chosen or Conditional, Not Favorable means every counted engine is Not chosen or Overlooked, and Split is a mix
- Given the question panel of a competitive question, When it renders, Then each engine pill shows the outcome of that engine in the badge that shows the rank today, same size and place: emerald for Chosen and Conditional (as "#1"), red for Not chosen and Overlooked (as "#--"), grey "Not counted" when the engine is not counted or its outcome could not be extracted; the pill keeps the production layout, its compact form with many engines included
- Given an engine whose outcome is Chosen, When its tab is open, Then the card is titled "{brand}'s results - {engine}" with "Chosen" as its headline, on the green card of a win today; Conditional uses the green card too, Not chosen and Overlooked the red card of a loss today, and the card carries no text badge
- Given an engine whose outcome is Conditional or Overlooked, When its tab is open, Then the card shows the outcome only, with no condition per brand: the user reads why in the answer, shown above the card
- Given an engine whose outcome is Not chosen, When its tab is open, Then the card shows "Not chosen" and "{brand} was chosen" for the brand or brands the answer picks
- Given an answer that is not counted, When its engine tab is open, Then the pill is marked "Not counted" and the tab shows "{engine} returned no answer for this run", without the "may not have responded yet" line
- Given the AI Choice column of Brand Rankings, When it renders, Then each brand shows Chosen plus Conditional, with no tooltip on the value, as today; a brand with no outcome in the scope shows the existing "—", configured or not, a brand that is not configured gets no win from a competitive answer, and a configured brand with outcomes but never chosen shows 0%

## Technical Details

### Scope note

User Story 1.7 is split in two: this story carries the four outcomes on screen; the metric name "AI Choice" and the Share of Voice tooltip are STORY-53.8. Depends on STORY-50.5 (GEO-1554, outcomes and picked brands), STORY-50.6 (GEO-1555, not counted) and STORY-50.7 (GEO-1556, AI Choice = Chosen + Conditional computed by the backend). The PowerPoint and PDF ring keeps one colour. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display").

## Dependencies

- **Blocks:** none in Jira links
- **Blocked by:** GEO-1554, GEO-1555, GEO-1556, GEO-1566, GEO-1568
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1498
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1570
- External Spec: [53-7-show-the-competitive-outcome-in-four-buckets.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-53/53-7-show-the-competitive-outcome-in-four-buckets.md)
