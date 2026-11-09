# GEO-1244: Show the Category view and the prompts for a topic

**Story ID:** GEO-1244
**Issue Type:** Story
**Title:** STORY-46.4: Show the Category view and the prompts for a topic
**Status:** ⏳ Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1209
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1244

## User Story

> As a user of an unbranded analysis, I want each category page and the prompt details to compare brands with no target, so that I see which brand wins each category and each prompt.

## Acceptance Criteria

**AC1 — No KPI cards**

- Given: a Category view
- When: it loads
- Then: there are no KPI cards, and InBrief, Top Topics, the SOV ring and rankings follow story 1.3 at category scope

**AC2 — Time Evolution and matrix** (Updated 2026-10-09)

- Given: Time Evolution and Brand Prioritization
- When: they load
- Then: Time Evolution shows the top 10 brands with no highlighted line and no Sentiment tab, and the matrix plots the top 5 brands by SOV with no target dot

**AC3 — Top 10 rule** (Updated 2026-10-07)

- Given: Time Evolution
- When: it selects its 10 brands
- Then: it uses the production rule: top 10 by SOV in the latest collection inside the selected window, with the market and LLM filters applied, so the list follows the filters, and the chart still needs 7 collections in the window

**AC4 — Winner or Split** (Updated 2026-10-09)

- Given: the prompts table
- When: it loads
- Then: each prompt shows the brand ranked first when every engine ranks the same brand family first, otherwise "Split", following the production rule as is (2 engines on A and 1 on B is Split, an engine with an empty ranking makes it Split), with no favourability filters or count

**AC5 — Per collection** (Updated 2026-10-07)

- Given: the prompts table
- When: the winner is computed
- Then: it is per collection (the latest or the selected one), not over the date range, as in production

**AC6 — Detail panel**

- Given: a prompt detail panel
- When: it opens
- Then: it shows the full ranking and the brand chosen per engine, with no target brand block

**AC7 — Category Topics label** (Updated 2026-10-09)

- Given: the prompts table tabs and the detail panel
- When: they show Category Topics prompts
- Then: they are labelled "Category Topics", not "Perception"

**AC8 — Landscape title at category scope** (Updated 2026-10-09)

- Given: the rankings table at category scope
- When: it loads
- Then: it is titled "{category} landscape"

## Technical Details

### Rules (OS-Team, updated 2026-10-09)

- The winner follows the production rule as is: one brand family ranked first by **every** engine; otherwise « Split ». An engine with an empty ranking makes the row « Split », and so does a prompt with no engine answer at all. There is no « No ranking returned » in the prompts table.
- A brand whose name contains the topic (« Postal Services Inc » in a « postal services » analysis) can win like any other brand.
- The matrix shows at most 5 brands per market, the 5 with the highest SOV.
- Category Topics rows show their themes in Winner / Themes, as Perception rows do today.
- Brand analyses keep today's rules (winner, favourability, filters).

### Reviews

📊 [Functional & design review](https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho) — PM questions Q1–Q16, design points D1–D14 and the frame-by-frame epic ↔ design table. PM answers of 2026-10-09 (GEO-1209 comment, GEO-1244 comment) applied below.

### PM decisions (2026-10-09)

- Q5: the matrix plots the top 5 brands by SOV, as target + 4 competitors in brand mode (AC2, T5).
- Q4: the winner follows the production code as is (`findConsensusWinner`): an engine with an empty ranking gives « Split », zero engines too; no « No ranking returned » in the prompts table, « every engine with data » removed (AC4, T1).
- Q6: tabs and detail panel say « Category Topics » (AC7, T10).
- Q14: « {category} landscape » at category scope (AC8, T11).
- Design: U.2 and U.3.

### Open points

- 🎨 **Designer (non-blocking):** U.2 / U.3 get the top 5 matrix with no target dot, « Category Topics » tabs and rows, Competitive rows with 4 brands and « {category} landscape » (GEO-1244 comment #860370). Dev follows the ACs meanwhile.

### Design

Figma page « Analysis - Unbranded »:

- **U.2 Category · Package Shipping** (`16008:8016`) and **U.3 … Period view** (`16008:13954`): no KPI cards; Prompts Analysis (badges, tabs ALL / Visibility / Competitive / Category Topics / Other, search, columns Prompts · Winner / Themes · Market, « Split » chip); Time Evolution tabs Share of voice / Visibility / Avg. Position / AI choice (no Sentiment); Brand Prioritization (Stars / Opportunity / At Risk / Monitor, no « (Target) »); « {category} landscape ».
- **Questions Analysis tables** (`15999:193282`): per-tab variants.
- 🎨 **Designer update requested (GEO-1244 #860370, non-blocking):** matrix with the top 5 brands by SOV and no target dot; tabs and detail panel « Category Topics » with Category Topics rows (« What should I look for in {category}? ») instead of brand-reputation ones (« Is USPS good for… »); Competitive rows compare 4 brands, not 6; « {category} landscape » at category scope (as in U.2). The ACs above already state the target; dev does not wait for the frames.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned in the ticket (the epic cannot start before the GEO-1002 / EPIC-034 wizard exists)
- **Related (mentioned in the ticket or the epic):**
  - GEO-1243 (STORY-46.3: InBrief, Top Topics, SOV ring and rankings rules applied at category scope)

## Definition of Done

- [ ] All acceptance criteria verified (unbranded / Other global flag ON)
- [ ] Brand analysis behaviour unchanged (regression check)
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1209
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1244
- External Spec: [epic-46/46-4-show-the-category-view-and-the-prompts-for-a-topic.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-46/46-4-show-the-category-view-and-the-prompts-for-a-topic.md)
- Functional & design review: https://claude.ai/artifact/HMh5vxPJkBD4JTX228ysho
- Design (Figma): https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=13458-101707
