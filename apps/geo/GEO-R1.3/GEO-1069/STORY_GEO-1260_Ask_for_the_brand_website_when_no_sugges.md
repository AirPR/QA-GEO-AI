# GEO-1260: Ask for the brand website when no suggestion is selected

**Story ID:** GEO-1260
**Issue Type:** Story
**Title:** 47.1 Ask for the brand website when no suggestion is selected
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1069
**Created:** 2026-10-14
**Updated:** 2026-10-20
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1260

## User Story

> As a user setting up an analysis for a brand that is not in the suggestions, I want to be asked for my brand's website, so that the analysis uses my real domain instead of guessing one from the name.

## Acceptance Criteria

**AC1 — No suggestion selected**

- Given: I type a brand name and proceed without selecting a dropdown suggestion
- When: the setup continues
- Then: I am asked for the brand's website URL as an optional field

**AC2 — No suggestion at all**

- Given: I type a brand name that returns no suggestions at all
- When: the setup continues
- Then: I am asked for the brand's website URL in the same way

**AC3 — Left empty**

- Given: I am asked for the website URL and leave it empty
- When: I proceed
- Then: the setup continues normally, no logo retrieval is attempted, and the brand is displayed as a neutral lettermark

**AC4 — Suggestion selected**

- Given: I select a brand from the dropdown suggestions
- When: the setup continues
- Then: no website URL is requested and the flow is unchanged from today

**AC5 — Placement and texts** _(Updated 2026-10-20)_

- Given: I pick the Custom Brand row in Brand & Country
- When: the website field appears
- Then: it is an inline field under the custom brand card, before category discovery, with the label "What is your brand's website? (optional)", the placeholder "example.com" and the hint "We use it to show the right logo. Leave it empty to show your brand's initial."

**AC6 — Unbranded** _(Updated 2026-10-20)_

- Given: an unbranded analysis
- When: Topic & Country loads
- Then: the website is never asked

**AC7 — Website change resets categories** _(Updated 2026-10-20)_

- Given: categories were already discovered
- When: I change the website
- Then: the discovered categories are reset, as when the brand is renamed

## Technical Details

### Rules (OS-Team, 2026-10-14)

- « Proceed without selecting a suggestion » = choosing the « {name} — custom » row of the brand search. It is the only way to keep a name that is not a suggestion, and the same row is shown when the search returns no result (AC2).
- If the typed name is itself an address (e.g. www.licter.com), the website field is prefilled with it.
- _(Sync 2026-10-20)_ The rule « changing the website after categories were discovered clears them » was moved by the dev team into AC7. AC5 names the row « the Custom Brand row » (i18n `brand.custom` = "Custom Brand") while this rule still says « {name} — custom »; the TCs use the "Custom Brand" row.

### Validated by the PM (2026-10-20, GEO-1069)

- **P4:** the website is asked only in a brand analysis, never in an unbranded analysis (now AC6).
- **P5:** the field is inline on Brand & Country, right under the selected custom brand, before « Discover Categories » (now AC5 and AC7).
- Source: GEO-1069 comment 865135 (Quentin Reant, 2026-10-19 21:03 New York time): "OK for all your decisions, including storing the website as the brand domain like a selected suggestion."

### Design

No Figma for this epic (OS-Team exception, minor UI): GEO design system of step 1. Design review on staging requested by the PM.

- Field under the selected brand card, same input style as the brand search, globe icon.
- Copy (en-US, validated by the PM): see AC5. The en-GB, fr-FR and es-ES texts are machine translations still to be reviewed.
- A selected suggestion shows exactly today's card.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned
- **Related (mentioned in the ticket or the epic):**
  - GEO-1231 (Set the brand and the markets, GEO-1002): Brand & Country step where the website field sits (P5); GEO-1231 lists the brand website for a custom brand as out of its scope (GEO-1069)
  - GEO-1232 (Review the detected categories, GEO-1002): changing the website after discovery clears the categories
  - GEO-1241 (Choose the analysis type, GEO-1209): no brand website field in an unbranded analysis (P4)

## Definition of Done

- [ ] All acceptance criteria verified (no suggestion selected, no suggestion at all, field left empty, suggestion selected, placement and texts, unbranded, website change resets categories)
- [ ] Prefill of the website field when the typed name is an address verified
- [ ] Categories cleared when the website changes after discovery verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1069
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1260
- External Spec: [epic-47/47-1-ask-for-the-brand-website-when-no-suggestion-is-selected.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-47/47-1-ask-for-the-brand-website-when-no-suggestion-is-selected.md)
