# Ask for the Brand Website when a Custom Brand is Entered

**Epic ID:** GEO-1069
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Created:** 2026-08-05
**Updated:** 2026-10-20
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1069

## Description / Functional Need

In the setup wizard, the user types their brand name and picks it from a dropdown of suggestions. Each suggestion carries the brand's domain, so when the user selects one, the logo is retrieved reliably from that domain. The problem is the custom brand path: when the brand is not in the suggestions (a small company, a local brand, a product line, an unusual spelling), the user just types the name and moves on, and no domain is captured. Logo retrieval then has to guess a domain from the brand name, which frequently produces a wrong logo, another company's logo, or a bare lettermark. Since the brand logo is displayed throughout the analysis (header, rankings, competitive views, exports), a wrong logo undermines the perceived quality of the whole analysis from the first screen.

This epic closes that gap by asking for the brand's website when a custom brand is entered. When the user types a brand without selecting a suggestion, the setup asks for the brand's website URL. The field is optional: providing it gives the correct logo, skipping it gives an honest neutral lettermark. When a URL is provided, the domain derived from it becomes the brand's domain for the analysis, and the logo is retrieved from it through the existing logo pipeline (brand logo service first, favicon as fallback). The user sees the resolved logo immediately in the setup, so a wrong logo is caught and corrected before the analysis is launched rather than discovered in the results. When the URL is left empty, no logo retrieval is attempted at all: the brand is displayed as a lettermark (its initial) everywhere, which replaces today's behavior of guessing a domain from the brand name and risking someone else's logo. A wrong logo is worse than no logo. Selecting a suggestion from the dropdown behaves exactly as today and never asks for a URL, since the domain is already known.

### Update 2026-10-20 (Quentin Reant, PO/PM)

Epic text: "Updated 2026-10-20 after the dev decisions on GEO-1069 (comment of 2026-10-16): criteria marked (Updated 2026-10-20) changed. The epic had no Figma frame: the website field follows the GEO design system already used in Brand & Country, and the design team still has to review it on staging. The en-GB, fr-FR and es-ES texts are machine translations and still need a review."

- 1.1: field placement and texts; never asked in an unbranded analysis; changing the website resets the discovered categories (GEO-1260 AC5 to AC7)
- 1.2: the domain keeps the full hostname without www; error text (GEO-1261 AC1, AC2)
- 1.3: the preview replaces the avatar of the custom brand card (GEO-1262 AC1)
- Scope: the website is stored as the brand's domain, the same as the domain of a selected suggestion, so it feeds everything that domain feeds today
- Source: GEO-1069 comment 865135 (Quentin Reant, 2026-10-19 21:03 New York time): "OK for all your decisions, including storing the website as the brand domain like a selected suggestion." P1 to P5 validated.

### Planned stories in the epic description

The epic description lists the four stories below with "Story ID: TBD". They exist in Jira as GEO-1260 to GEO-1263 (numbered 47.1 to 47.4); their ACs match the epic text.

- User Story 1.1: Ask for the brand website when no suggestion is selected → GEO-1260
- User Story 1.2: Accept and normalize any reasonable URL input → GEO-1261
- User Story 1.3: Retrieve and preview the logo from the provided domain → GEO-1262
- User Story 1.4: Use the captured domain everywhere the brand appears → GEO-1263

### Still open (non-blocking)

- Whether the same ask-for-URL flow should be extended to manually added competitors in a follow-up
- _(Removed 2026-10-20)_ Whether the captured domain should also feed owned-source classification: answered by the In scope rule below (the website feeds the owned-domain exclusion).
- Note (sync 2026-10-23, full history): no AC change since the 2026-10-21 sync; design review of the website field validated: "Looks good for me nice work team" (Jalal, designer, GEO-1069 comment 866460, 2026-10-22, reply to the PO request 865135); Brandfetch brand-profile quota still exhausted on staging on 2026-10-23 11:37 UTC (brands/logo returns only {"domain":...} for licter, nike, apple, decathlon, onclusive, toyota .com).
- Note (sync 2026-10-21): GEO-1262 AC2 was amended by the PO on 2026-10-20 ("the general favicon is used as fallback", generic globe accepted, GEO-1262 comment 865598, Quentin Reant), but the epic text of User Story 1.3 still reads "the site's favicon is used as fallback". The story is the reference for the TCs.
- Note (sync 2026-10-20): GEO-1263 proposal P1 is validated and the epic now puts it In scope. GEO-1263 itself is not updated (P1 still listed as a proposal, no AC for the new scope). P1 also names "the brand checks", which the epic In scope does not list.

### Dependencies

- Relates to GEO-1002 (EPIC-045: Setup Revamp - Prompt-Pool Quota and New-Analysis Wizard): the website field sits on the Brand & Country step of the new wizard (GEO-1231).
- Relates to GEO-1151 and GEO-1179 (Bugs, Done): AI category discovery ignored the brand website / used another company's categories for small brands; GEO-1179 sends the Brandfetch description to the discovery prompt.
- Brand logo service = Brandfetch, favicon fallback = Google favicon service (GEO-1262).

## Scope

_No explicit Scope section in the Jira description; derived from the epic text and the four planned stories._

- Ask for the brand website (optional field) when the user proceeds with a custom brand, i.e. without selecting a dropdown suggestion or when the search returns no suggestion
- Accept and normalize any reasonable URL input into the brand domain (full hostname without protocol, www prefix, path or query), with the inline error "Enter a valid website, such as example.com." for input that cannot be interpreted as a domain (Updated 2026-10-20)
- Retrieve and preview the logo from the provided domain in the setup (brand logo service first, favicon as fallback, neutral lettermark otherwise)
- Store the derived domain as the brand domain of the analysis and use the setup logo everywhere the brand appears (header, rankings, competitive views, exports)
- No website provided: no logo retrieval and a neutral lettermark everywhere, replacing the domain guessed from the brand name
- Selecting a suggestion behaves exactly as today and never asks for a URL
- **In scope (Updated 2026-10-20):** "The website is stored as the brand's domain, the same as the domain of a selected suggestion. It therefore also feeds category discovery, the owned-domain exclusion, competitor discovery and the winner domain in the prompts table. This adds no new behaviour: a custom brand with a website now behaves like a selected suggestion."

## Out of Scope

- Changing the brand suggestion search itself or its provider
- Competitor logo handling; competitors added manually have the same weakness, but this epic only covers the analyzed brand entered at setup
- _(Removed 2026-10-20, moved to In scope)_ ~~Using the captured domain for anything beyond logo retrieval and display (for example owned-source classification), even if it becomes possible later~~

## Associated Stories & Tasks

| ID | Type | Title | Status |
|----|------|-------|--------|
| GEO-1260 | Story | 47.1 Ask for the brand website when no suggestion is selected | ⏳ Ready for QA |
| GEO-1261 | Story | 47.2 Accept and normalize any reasonable URL input | ⏳ Ready for QA |
| GEO-1262 | Story | 47.3 Retrieve and preview the logo from the provided domain | ⏳ Ready for QA |
| GEO-1263 | Story | 47.4 Use the captured domain everywhere the brand appears | ⏳ Ready for QA |

**Total: 4 stories + 0 tasks — 17 ACs** (GEO-1260 AC5 to AC7 added 2026-10-20) (GEO-1263 also carries 4 technical ACs, TAC1 to TAC4, not counted)

## Architecture

_No architecture section in the epic description._ Surfaces from the stories: wizard Brand & Country step, website field under the selected custom brand card (GEO-1260); URL normalization with server-side refusal of an invalid website at creation (GEO-1261); logo preview through Brandfetch then Google favicon, lettermark otherwise (GEO-1262); stored `entity_domain` / `entity_logo_url` and the new `entity_domain_confirmed` flag drive the brand logo in the report list, dashboard sidebar and header, rankings target row and PowerPoint / PDF export (GEO-1263). No Figma (OS-Team exception).

## Acceptance Criteria — Summary

### GEO-1260 — Ask for the brand website when no suggestion is selected

- AC1: No suggestion selected
- AC2: No suggestion at all
- AC3: Left empty
- AC4: Suggestion selected
- AC5: Placement and texts (Updated 2026-10-20)
- AC6: Unbranded (Updated 2026-10-20)
- AC7: Website change resets categories (Updated 2026-10-20)

### GEO-1261 — Accept and normalize any reasonable URL input

- AC1: Any reasonable form (Updated 2026-10-20)
- AC2: Not a domain (Updated 2026-10-20)
- AC3: Stored

### GEO-1262 — Retrieve and preview the logo from the provided domain

- AC1: Preview (Updated 2026-10-20)
- AC2: Fallbacks (Updated 2026-10-20, PO: "the general favicon"; epic text not amended)
- AC3: Correction
- AC4: No website

### GEO-1263 — Use the captured domain everywhere the brand appears

- AC1: Captured domain everywhere
- AC2: No website: lettermark everywhere
- AC3: Older analyses unchanged
- Technical: TAC1 New custom brand without website: no guess anywhere; TAC2 Older report unchanged; TAC3 Export; TAC4 Flag set once

## Links

- https://onclusive.atlassian.net/browse/GEO-1069
- GEO-1260: https://onclusive.atlassian.net/browse/GEO-1260
- GEO-1261: https://onclusive.atlassian.net/browse/GEO-1261
- GEO-1262: https://onclusive.atlassian.net/browse/GEO-1262
- GEO-1263: https://onclusive.atlassian.net/browse/GEO-1263
- Related epic GEO-1002 (Setup Revamp - Prompt-Pool Quota and New-Analysis Wizard): https://onclusive.atlassian.net/browse/GEO-1002
- Related bug GEO-1151: https://onclusive.atlassian.net/browse/GEO-1151
- Related bug GEO-1179: https://onclusive.atlassian.net/browse/GEO-1179
- Spec 47.1: https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-47/47-1-ask-for-the-brand-website-when-no-suggestion-is-selected.md
- Spec 47.2: https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-47/47-2-accept-and-normalize-any-reasonable-url-input.md
- Spec 47.3: https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-47/47-3-retrieve-and-preview-the-logo-from-the-provided-domain.md
- Spec 47.4: https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-47/47-4-use-the-captured-domain-everywhere-the-brand-appears.md
