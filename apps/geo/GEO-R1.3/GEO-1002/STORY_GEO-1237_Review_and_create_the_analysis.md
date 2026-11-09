# GEO-1237: Review and create the analysis

**Story ID:** GEO-1237
**Issue Type:** Story
**Title:** STORY-45.8: Review and create the analysis
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-19
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1237

## User Story

> As a user on the Review step, I want to see the scope and the engines on one screen, so that I can confirm the analysis before it is created.

## Acceptance Criteria

**AC1 — Scope and engines**

- Given: I reach Review
- When: it loads
- Then: I see the scope with its markets and categories, and the AI engines

**AC2 — Dropped scope and missing metrics**

- Given: a market, a category or a question type has no kept prompt
- When: Review loads
- Then: a warning names it as dropped, or names the metrics the analysis will not produce

**AC3 — Engines allowed for the organisation**

- Given: the engines
- When: Review loads
- Then: the engines allowed for the organisation in the back office are toggles, on by default with at least one on, and the other engines are not shown, as today

**AC4 — Engines are free**

- Given: I change the engines
- When: the toggles change
- Then: engines never consume slots

**AC5 — Over the pool**

- Given: the pool is over the limit
- When: Review loads
- Then: Create Analysis is disabled

**AC6 — Confirmation**

- Given: I create the analysis
- When: it is scheduled
- Then: a confirmation states its prompts, markets, categories and engines, the unticked suggestions kept on the analysis, that prompt changes apply at the next run, and View analysis

## Technical Details

### Rules (settled — OS-Team, 2026-10-08, updated 2026-10-09)

- A market or a category with no ticked prompt is shown greyed with a "dropped" tag; it is not created, its unticked suggestions neither (Brand Image prompts of a dropped market included), so it never appears in results or exports. It can be added back later in Manage Scope.
- A question type with no ticked prompt in the whole analysis is named in the warning with the metrics it feeds (eg no Brand Image → no Corporate Reputation cards nor Brand Territory).
- An analysis needs at least one category with a ticked prompt: if every category is dropped (even with Brand Image prompts ticked), the banner says so and Create Analysis stays disabled.
- Prompts no longer block the way to Review: the old "each category must have at least one prompt per country" error is replaced by these warnings.
- The engines allowed for the organisation are shown, as today; there is no "higher plans" or "Upgrade" block. If neither Gemini nor ChatGPT is allowed, every allowed engine starts on.
- No "Primary" tag on markets.
- Over the pool, a red banner says how many prompts to untick, and Create Analysis stays disabled.
- The confirmation also says that prompt changes apply at the next run; its figures are those of what was created. It has no subtitle (PM, 2026-10-09); today's "You'll receive an email…" line goes with the old screen. View analysis opens the new analysis, Go to Dashboard goes back to the list. The line about unticked suggestions is hidden when there are none.

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", frames 5.1, 5.2, 5.3 and 5.4 (confirmation; frame 7.6 is its unbranded variant, without its subtitle). The "Available on higher plans" block and the "Primary" tag of the frames are not implemented.

### Technical Acceptance Criteria (dev context — not for QA)

**TAC1 — Dropped computation**

- Given: markets UK, DE, FR; FR has only unticked rows; category « Ready Meals » has kept rows only in UK; no Brand Image row is kept
- When: Review loads
- Then: FR is greyed « dropped », the banner names France and the Brand Image metrics; Ready Meals is not dropped; the payload has no FR market, no FR category row and no FR row in `brandImageQuestions`.

**TAC2 — No more step-3 blocking on gaps**

- Given: a category with prompts in UK only
- When: I click Review & Launch on step 3
- Then: I reach Review (the old « each category must have at least one prompt per country » error is gone).

**TAC3 — Engine defaults**

- Given: the org's allow-list = { claude, perplexity }
- When: Review loads
- Then: both toggles are on; Create is enabled.

**TAC4 — Confirmation and View analysis**

- Given: 36 kept and 7 unticked rows, 2 markets, 3 categories, 3 engines
- When: creation succeeds
- Then: the modal shows those numbers and engine names and the next-run sentence; View analysis opens the new report.

**TAC5 — Only Brand Image kept**

- Given: every category has only unticked rows and Brand Image rows are kept
- When: Review loads
- Then: every category is « dropped », the banner says at least one category needs a kept prompt, Create is disabled (D4).

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1237
- External Spec: [epic-45/45-8-review-and-create-the-analysis.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-8-review-and-create-the-analysis.md)
