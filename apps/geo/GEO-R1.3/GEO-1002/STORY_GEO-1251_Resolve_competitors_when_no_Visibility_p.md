# GEO-1251: Resolve competitors when no Visibility prompt is kept

**Story ID:** GEO-1251
**Issue Type:** Story
**Title:** STORY-45.13: Resolve competitors when no Visibility prompt is kept
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-09
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1251

## User Story

> As a user who kept Competitive prompts but no Visibility prompt for a category, I want the analysis to find the brand's top competitors on its own, so that my Competitive prompts compare my brand with real competitors instead of running empty.

Split out of AC2 of STORY-45.4 (GEO-1233), following the PM comment of 2026-10-09: competitors are resolved when the analysis runs, not during setup. Backend only — nothing changes in the UI.

## Acceptance Criteria

**AC1 — Competitors resolved in the background** *(AC2 of User Story 1.4, as reworded in the epic on 2026-10-09)*

- Given: no visibility questions are configured
- When: the analysis runs
- Then: a background call resolves the top competitors to use in competitive questions, invisible to the user, since they cannot be determined by visibility questions

**AC2 — Competitive prompts run even without Visibility**

- Given: an analysis where a market and category keep Competitive prompts but no Visibility prompt (or none of its Visibility prompts got an answer)
- When: the analysis runs
- Then: the Competitive prompts of that market and category are sent to the AI engines with up to 5 competitors named in place of the placeholders, and their results appear on the dashboard like any other Competitive result

**AC3 — Visibility still wins when it exists**

- Given: a market and category whose Visibility answers name competitors
- When: the analysis runs
- Then: the competitors come from the Visibility answers exactly as today, and no background call is made for that market and category

**AC4 — A failed resolution never fails the analysis**

- Given: the background call fails or returns nothing usable
- When: the analysis runs
- Then: the Competitive prompts still run, with the competitor names left out as today, and the analysis completes

**AC5 — An analysis with only Competitive prompts completes**

- Given: an analysis whose only kept prompts are Competitive (no Visibility, Sentiment or Brand Image prompt anywhere)
- When: the analysis runs
- Then: it completes with its Competitive results, instead of staying in progress

## Technical Details

### Rules (OS-Team, 2026-10-09)

- When fewer competitors are found than the prompt names, the prompt still reads naturally ("Best for X: Nike, A or B?", never "Nike, A, B or ?"), in every language. This is delivered by GEO-1249, which ships first; this story adds no cleanup of its own.
- Ships in the same release as STORY-45.10 (GEO-1239), which lets an analysis keep only Competitive prompts.
- Unbranded analyses (GEO-1209): competitor discovery is disabled in V1, and the Other category is excluded. These guards are added by epic 46.
- The competitors found for a market and category are kept from one daily run to the next, so the compared brands stay the same over time.
- *(added 2026-10-13)* A brand found in the background is never one of the analysed brand's own sub-brands or subsidiaries: when its website belongs to the analysed brand (e.g. "Jordan" on jordan.nike.com for Nike), it is left out of the competitors.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** GEO-1249, GEO-1229, GEO-1233

From Jira:

- GEO-1249 (ships first), STORY-45.1 (GEO-1229) and STORY-45.4 (GEO-1233).

The prompt used to find the competitors was validated by the PM, and the technical decisions are settled (2026-10-09; D6 amended 2026-10-13); both are in the spec below.

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1002
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1251
- External Spec: [epic-45/45-13-resolve-competitors-when-no-visibility-prompt-is-kept.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-13-resolve-competitors-when-no-visibility-prompt-is-kept.md)
