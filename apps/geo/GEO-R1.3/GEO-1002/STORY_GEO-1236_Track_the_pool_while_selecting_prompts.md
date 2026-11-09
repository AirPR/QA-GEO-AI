# GEO-1236: Track the pool while selecting prompts

**Story ID:** GEO-1236
**Issue Type:** Story
**Title:** STORY-45.7: Track the pool while selecting prompts
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1236

## User Story

> As a user assembling prompts, I want to see the pool balance at all times, so that I never commit an analysis that overspends my quota.

## Acceptance Criteria

**AC1 — Ring and popover**

- Given: Prompts
- When: my selection changes
- Then: the toolbar ring reads the slots used after creation over the pool, such as 138 / 150, and its popover splits other analyses, this analysis and free slots

**AC2 — Exactly at the limit**

- Given: the selection is exactly at the limit
- When: the tracker updates
- Then: the ring turns amber with a short message and launch stays enabled

**AC3 — Over the limit (Updated 2026-10-09)**

- Given: the selection is over the limit
- When: the tracker updates
- Then: the ring turns red, the message states how many prompts are over, and Review & Launch is blocked until the count fits, while adding and ticking prompts stay possible so I can assemble every prompt, then untick down to the pool; in Manage Scope, ticking or adding still needs room in the pool

**AC4 — The system never removes a prompt**

- Given: I am over the limit
- When: I look for a way back
- Then: the system never removes a prompt: I untick prompts or contact my account manager for a larger pool

## Technical Details

### Rules (settled — OS-Team, 2026-10-08, updated 2026-10-09)

- "N selected" and "Kept in this analysis" both count the ticked prompts of this analysis.
- The popover opens on hover and on keyboard focus of the ring. "Need more room? Contact your account manager." shows only at the limit or over the pool.
- Over the pool, only Review & Launch is blocked. Add prompt and ticking an unticked prompt stay possible at the limit and over it, so I can add all my prompts first and then untick down to the pool. Unticking, deleting, editing and filtering are never blocked. Manage Scope does not change: ticking or adding there still needs room in the pool (STORY-45.10).
- An organisation without a pool sees a grey ring "— / —" and a message to contact the account manager; only the launch is blocked.
- While the pool is loading, launch waits until it is known.
- If another analysis takes slots meanwhile and creation is refused, the ring shows the real figures when I come back to Prompts.
- If the pool was lowered below what other analyses already use, the ring stays red even with every prompt unticked.

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", frames 4.4, 4.5, 4.19 and 4.20. Frame 4.5 greys Add prompt over the pool: superseded on 2026-10-09, Add prompt stays available.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1002
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1236
- External Spec: [epic-45/45-7-track-the-pool-while-selecting-prompts.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-7-track-the-pool-while-selecting-prompts.md)
