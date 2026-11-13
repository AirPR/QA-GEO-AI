# GEO-1568: STORY-53.5: Keep the answer readable when parsing fails

**Story ID:** GEO-1568
**Issue Type:** Story
**Title:** STORY-53.5: Keep the answer readable when parsing fails
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1498
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1568

## User Story

> As a GEO user, I want to read the answer even when part of it could not be parsed, so that one failed extraction never hides the rest.

- **As** a GEO user
- **I want** to read the answer even when part of it could not be parsed
- **So that** one failed extraction never hides the rest.

## Acceptance Criteria

_5 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1498, User Story 1.5)

- Given an answer where one extraction failed (eg: perception themes, ranking, competitive outcome), When the panel renders, Then only that block changes: it keeps its title and shows one amber italic line instead of its content, as Corporate Reputation does for "AI consolidation unavailable", and the answer and the other blocks render normally
- Given an extraction that failed, When the analysis metrics are computed, Then that answer is left out of the metric the extraction feeds, it is not counted as unranked or not chosen
- Given an extraction that failed, When the next analysis run happens, Then the new run extracts it again from its own answers, and the analysis date where it failed keeps its line, which reads "{Themes} could not be extracted from this answer. The next analysis run extracts its own answers; this date stays as it is." (never "will retry on the next analysis run")
- Given an engine answer that is empty, cut or refused, When I open its tab, Then it is not counted: the pill is marked "Not counted", the panel says "{engine} returned no answer for this run" and shows no extracted block
- Given an analysis run before this epic shipped, When I open a question, Then the answer card shows the tracked brand's excerpt as today, as no full answer is stored for those dates, with no clamp, no character count and no highlight, and the extracted blocks and sources show as for any other answer

## Technical Details

### States of the panel (GEO-1498, "Surfaces and States")

| State | Answer card | Extracted blocks |
|---|---|---|
| Loading | Skeleton of frame 04e | Skeleton of frame 04e |
| Engine added after the last run | "Analysis pending", as today | Not shown |
| Panel failed to load | Error with Retry, as today | Not shown |
| One extraction failed | Shown in full | The failed block keeps its title and shows one amber italic line instead of its content |
| Analysis run before this epic shipped | The tracked brand's excerpt, as today (no full answer is stored for those dates) | Rendered as today, a competitive win shows Chosen and a loss Not chosen |
| Answer with no inline citations | Shown in full, "no inline citations" in the header | Rendered |
| Answer not counted (cut, refused, empty) | "{engine} returned no answer for this run" | Not shown, engine pill marked "Not counted" |

### Scope note

Display only, depends on STORY-50.6 (GEO-1555, answer status and state of each extraction). The metric exclusion (AC2) is computed by STORY-50.6 / STORY-50.7 and only checked here. Design: GEO-1017 (Figma "Measure - GEO Module", page "Natural answer display", frames 04, 04c, 04d, 04e, 04f, 10f).

## Dependencies

- **Blocks:** GEO-1570
- **Blocked by:** GEO-1555, GEO-1556, GEO-1566
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1498
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1568
- External Spec: [53-5-keep-the-answer-readable-when-parsing-fails.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-53/53-5-keep-the-answer-readable-when-parsing-fails.md)
