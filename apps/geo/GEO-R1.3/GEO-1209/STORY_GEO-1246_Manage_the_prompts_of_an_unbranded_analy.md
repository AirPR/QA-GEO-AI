# GEO-1246: Manage the prompts of an unbranded analysis

**Story ID:** GEO-1246
**Issue Type:** Story
**Title:** STORY-46.6: Manage the prompts of an unbranded analysis
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1209
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1246

## User Story

> As a user of a running unbranded analysis, I want Manage Scope to suggest prompts that fit a topic, so that a category or a market I add later gets the same mix as at creation.

## Acceptance Criteria

**AC1 — Fresh suggestions per mode**

- Given: an unbranded analysis in Manage Scope
- When: I add a category or a market
- Then: its fresh suggestions are 10 Visibility, 10 Competitive and 10 Category Topics prompts per market, with no Reputation or Brand Image

**AC2 — Type select**

- Given: an unbranded analysis in Manage Scope
- When: I add or edit a prompt
- Then: the type select lists Visibility, Competitive, Category Topics and Other only

## Technical Details

### Rules (OS-Team, 2026-10-08)

- Adding a market to an unbranded analysis never creates Brand Image prompts.
- New suggestions are adapted to the market language with the topic, as at creation (46.2).
- Brand analyses keep Reputation and Brand Image in Manage Scope.

### Reviews

📊 [Functional & design review](https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho) — PM questions Q1–Q15, design points D1–D14 and the frame-by-frame epic ↔ design table. The Q / D ids quoted in this ticket point there.

### Design

- No dedicated frame (review D8). Reuse 45.10's MS.x frames with the unbranded type labels (7.4 badges).

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned in the ticket (the epic cannot start before the GEO-1002 / EPIC-034 wizard exists)
- **Related (mentioned in the ticket or the epic):**
  - GEO-1239 (STORY-45.10: Manage Scope prompts, MS.x frames reused)
  - GEO-1242 (STORY-46.2: suggestions adapted with the topic)

## Definition of Done

- [ ] All acceptance criteria verified (unbranded / Other global flag ON)
- [ ] Brand analysis behaviour unchanged (regression check)
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1209
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1246
- External Spec: [epic-46/46-6-manage-the-prompts-of-an-unbranded-analysis.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-46/46-6-manage-the-prompts-of-an-unbranded-analysis.md)
- Functional & design review: https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho
- Design (Figma): https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707
