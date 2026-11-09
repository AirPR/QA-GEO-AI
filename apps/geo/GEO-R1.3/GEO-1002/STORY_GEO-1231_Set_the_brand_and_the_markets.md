# GEO-1231: Set the brand and the markets

**Story ID:** GEO-1231
**Issue Type:** Story
**Title:** STORY-45.2: Set the brand and the markets
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1002
**Created:** 2026-10-08
**Updated:** 2026-10-16
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1231

## User Story

> As a user on Brand & Country, I want to name my brand and add as many markets as I need, so that the prompts are localised for each country and language.

## Acceptance Criteria

**AC1 — Questions**

- Given: Brand & Country loads
- When: it renders
- Then: it asks "What brand are you analyzing?" and "Which countries do you want to analyze?"

**AC2 — Add a country: country first, then language**

- Given: I click Add country
- When: the composer opens
- Then: I pick a country first, and the language select, disabled until then, is prefilled with its primary language and lists its other languages

**AC3 — Change a market's language, no limit**

- Given: a market row
- When: I change its language
- Then: it applies, and one country in two languages means two market rows, with no limit on markets

**AC4 — Language for AI Insights**

- Given: Brand & Country
- When: I fill it
- Then: the Language for AI Insights below the markets applies to this analysis's insights and summaries only

**AC5 — Empty brand**

- Given: the brand is empty
- When: I try to continue
- Then: the field shows a red border and a message naming it, such as "Add your brand to continue."

**AC6 — Discovery loading screen**

- Given: Brand & Country is valid
- When: I continue
- Then: a loading screen states that category discovery takes about 20 seconds

**AC7 — Wizard shell (epic intro, applies to every step)**

- Given: I click New Analysis on the GEO dashboard
- When: the wizard opens
- Then: it opens on the first step of the setup (Brand & Country; once the unbranded analysis epic GEO-1209 ships, Analysis Type comes first), the sidebar stepper names each step and carries Back to Dashboard, the footer keeps Back and the primary action fixed, and everything above the footer scrolls

## Technical Details

### Rules (settled — OS-Team, 2026-10-08, updated 2026-10-09)

- The "New analysis" top bar of the wizard is removed; Back to Dashboard in the sidebar replaces it. With nothing filled, Back to Dashboard (and Back on Brand & Country) leaves directly; otherwise the existing exit confirmation opens.
- In a market row, the country is fixed and only the language can be changed. To change the country, remove the row and add another.
- There is no "Primary" tag in the language menus: the primary-language concept was removed from the setup and replaced by the Language for AI Insights field (2026-10-09). When I pick a country, its default language is prefilled and listed first. Languages read like "English (EN)".
- With an empty brand, the first click on Discover Categories shows the error; the button then stays disabled until a brand is set.
- The discovery loading screen shows while Brand & Country is still the active step, with no footer.
- As today: if discovery fails, step 2 opens empty with the error message; if it takes too long, "Add categories manually" opens step 2 with the add form; a market can only be removed when there are at least 2; Undo after removing a market works even when the same country is used in another language.
- AC7 must not contradict the unbranded analysis epic (GEO-1209), which adds Analysis Type as the first step (PM, 2026-10-09). The step order is built as data so that step can be inserted without other change.
- Out of scope: the brand website for a custom brand (GEO-1069).

### Design

Figma "Measure - GEO Module", page "GEO-1012 - Wizard/Prompt Pool", frames V3 Master Form shell, 2.1, 2.2, 2.2b, 2.2c, 2.2d, 2.3 and 2.5. The "Primary" tag of 2.2c and 2.2d is not implemented.

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
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1231
- External Spec: [epic-45/45-2-set-the-brand-and-the-markets.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-45/45-2-set-the-brand-and-the-markets.md)
