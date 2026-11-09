# GEO-1262: Retrieve and preview the logo from the provided domain

**Story ID:** GEO-1262
**Issue Type:** Story
**Title:** 47.3 Retrieve and preview the logo from the provided domain
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-1069
**Created:** 2026-10-14
**Updated:** 2026-10-20
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1262

## User Story

> As a user who just provided my brand's website, I want to immediately see the logo that was found, so that I can confirm it is correct before launching the analysis.

## Acceptance Criteria

**AC1 — Preview** _(Updated 2026-10-20)_

- Given: a valid domain has been entered
- When: it is confirmed
- Then: the logo retrieved for that domain replaces the avatar of the custom brand card within moments

**AC2 — Fallbacks** _(Updated 2026-10-20, PO)_

- Given: the brand logo service has no logo for the domain
- When: the preview is shown
- Then: the general favicon is used as fallback, and a neutral lettermark only if neither is available

**AC3 — Correction**

- Given: the previewed logo is wrong
- When: I edit the website URL
- Then: the preview updates to the logo of the new domain

**AC4 — No website**

- Given: no website URL was provided
- When: the setup is displayed
- Then: the lettermark is shown as the brand visual and no logo lookup happens

## Technical Details

### Rules (OS-Team, 2026-10-14)

- « Confirmed » = the field loses focus or the user presses Enter with a valid value, not on every keystroke.
- The brand logo service is Brandfetch, already used by the product (same lookup as the brand description of category discovery: one call per domain).
- After a website change, the previous domain's logo is never shown nor saved for the new domain.
- **Known limit:** the favicon comes from Google's favicon service, which answers with a generic globe when a site has no favicon. The globe is then shown, not the lettermark — same as every logo of the dashboard today. The lettermark appears when there is no domain or when the favicon fails to load.
- _(Sync 2026-10-21)_ **AC2 amended by the PO (2026-10-20 19:34 New York time):** "the site's favicon" became "the general favicon", right after his reply to the QA question on the generic globe (OP-1). Source: GEO-1262 comment 865598 (Quentin Reant, 2026-10-20, reply to QA comment 865525): "Yes accepted, I'll amend, thank you Assiya". QA reading (confirmed by the user 2026-10-21): the general favicon = the image of Google's favicon service, i.e. the site's favicon if any, else the generic globe; the lettermark remains for no domain or a favicon that fails to load. The epic text (story 1.3) still says "the site's favicon".
- **Staging (2026-10-16):** the Brandfetch key has hit its quota, so AC1 shows the favicon fallback there; AC1 cannot be validated on staging until the quota is restored.

### Design

No Figma for this epic (OS-Team exception): GEO design system. Design review on staging requested by the PM.

- The 32px avatar of the selected brand card shows the logo found (same place and size as a selected suggestion's logo); the domain is shown under the brand name.
- While the lookup runs, a grey pulsing placeholder of the same size, no text, no layout shift.
- Lettermark = the same letter avatar as the dashboard.

## Dependencies

- **Blocks:** Not mentioned
- **Blocked by:** Not mentioned
- **Related (mentioned in the ticket or the epic):**
  - GEO-1179 (Bug, Done): Brandfetch description sent to the category discovery prompt; same Brandfetch lookup (one call per domain)
  - GEO-1151 (Bug, Done): AI category discovery ignored the brand website

## Definition of Done

- [ ] All acceptance criteria verified (preview, favicon / lettermark fallbacks, correction, no website)
- [ ] Loading placeholder and no previous-domain logo after a change verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1069
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1262
- External Spec: [epic-47/47-3-retrieve-and-preview-the-logo-from-the-provided-domain.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-47/47-3-retrieve-and-preview-the-logo-from-the-provided-domain.md)
