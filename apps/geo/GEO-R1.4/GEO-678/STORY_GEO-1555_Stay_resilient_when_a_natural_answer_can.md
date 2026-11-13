# GEO-1555: STORY-50.6: Stay resilient when a natural answer cannot be fully parsed

**Story ID:** GEO-1555
**Issue Type:** Story
**Title:** STORY-50.6: Stay resilient when a natural answer cannot be fully parsed
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1555

## User Story

> As a user, I want the analysis to behave predictably when an engine's natural answer cannot be fully interpreted, so that one unparseable answer does not corrupt or block the rest of my analysis.

- **As** a user
- **I want** the analysis to behave predictably when an engine's natural answer cannot be fully interpreted
- **So that** one unparseable answer does not corrupt or block the rest of my analysis.

## Acceptance Criteria

_8 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-678, User Story 1.6)

**AC1 — Partial extraction kept**

- Given: a natural answer that cannot be fully parsed
- When: it is processed
- Then: the parts that can be extracted are kept and the parts that cannot are recorded as unavailable rather than guessed

**AC2 — No usable data**

- Given: an answer that yields no usable structured data
- When: the analysis aggregates results
- Then: that single answer is excluded without failing the question or the analysis

**AC3 — Failed extraction left out of its metric**

- Given: one extraction that failed on an answer (eg: the ranking or the competitive outcome)
- When: the metrics are computed
- Then: that answer is left out of the metric the extraction feeds, and is not counted as unranked or not chosen; today such an answer counts as not named, so this applies to new analysis dates only

**AC4 — Raw answer kept** _(delivered by STORY-50.1)_

- Given: parsing produces a result
- When: it is stored
- Then: the raw answer remains available so the extraction can be corrected and re-run later

**AC5 — Themes read in full, failure per country and category**

- Given: perception themes
- When: they are extracted
- Then: each answer is read in full, not cut, and a failure applies to the country and category being extracted, as the extraction runs per country and category

**AC6 — Next run extracts again**

- Given: an extraction that failed (eg: perception themes)
- When: the next analysis run happens
- Then: the new run extracts it again from its own answers, and the analysis date where it failed keeps the extraction as unavailable

**AC7 — Cut, refused or empty answers not counted**

- Given: an answer that is cut before its end, a refusal to answer, or an empty answer
- When: the metrics are computed
- Then: it is left out of every metric (today it counts as not named, new dates only), and the question panel shows it as not counted for that engine (display in GEO-1498)

**AC8 — No brand is not a refusal**

- Given: an answer that does answer the question but names no brand
- When: it is processed
- Then: it is not a refusal and follows the rule of story 1.4

### Rules (for QA)

QA checks on staging, on the test organisation, with one engine switched to natural (`llm_providers.answer_mode`), through the support read of the stored states (the display is GEO-1498) and the dashboard values:

- An answer refused by the engine is stored as not counted (reason refusal) and the Visibility of that question and engine does not count it in its total.
- An empty answer is stored as not counted (reason empty).
- An answer cut before its end (eg: engine stopped on its length limit) is stored as not counted (reason truncated).
- When the theme extraction of one country × category fails, its answers are marked with themes unavailable; the Sentiment and Top Concepts of the other countries and categories are unchanged, and the analysis completes.
- An answer that names no brand is counted (not a refusal) and shows the brand as not mentioned.
- The other engines of the analysis (still structured) and analyses run before the switch keep today's values.

**Decisions that change what QA sees (2026-11-03):**

- The questions table follows the metrics: an answer that is not counted is not in its value for that engine. The question panel still lists it (shown as not counted by GEO-1498).
- Until STORY-50.7, a competitive answer whose outcome could not be read is left out of AI Choice and also of the competitive part of Share of Voice.
- The Excel export keeps every answer in its raw sheets (no change).

## Technical Details

### Scope note

Backend only, depends on STORY-50.1 to 50.5 (GEO-1550 to GEO-1554). AC4 is delivered by STORY-50.1 and the full-text reading of AC5 by STORY-50.2; this story adds the failure unit of AC5. The "not counted" display is GEO-1498; the metric formulas (SOV, AI Choice) are STORY-50.7. The rules apply to new analysis dates only: analyses collected before the switch and engines still structured keep today's behaviour.

## Dependencies

- **Blocks:** GEO-1568, GEO-1569, GEO-1570, GEO-1556, GEO-1567
- **Blocked by:** GEO-1550, GEO-1552, GEO-1553, GEO-1554, GEO-1551
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1555
- External Spec: [50-6-stay-resilient-when-a-natural-answer-cannot-be-fully-parsed.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-50/50-6-stay-resilient-when-a-natural-answer-cannot-be-fully-parsed.md)
