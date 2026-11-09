# Epic GEO-1069: Ask for the Brand Website when a Custom Brand is Entered

Data imported from Jira for epic **GEO-1069: Ask for the Brand Website when a Custom Brand is Entered**

> Last Jira sync: 2026-10-19 — 4 stories + 0 tasks

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview |
| **STORY_{KEY}_*.md** | One file per story (4) |
| **TASK_{KEY}_*.md** | One file per task (0) |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data |

## Epic Overview

In the setup wizard, the user types their brand name and picks it from a dropdown of suggestions. Each suggestion carries the brand's domain, so when the user selects one, the logo is retrieved reliably from that domain. The problem is the custom brand path: when the brand is not in the suggestions (a small company, a local brand, a product line, an unusual spelling), the user just types the name and moves on, and no domain is captured. Logo retrieval then has to guess a domain from the brand name, which frequently produces a wrong logo, another company's logo, or a bare lettermark. Since the brand logo is displayed throughout the analysis (header, rankings, competitive views, exports), a wrong logo undermines the perceived quality of the whole analysis from the first screen.

This epic closes that gap by asking for the brand's website when a custom brand is entered. When the user types a brand without selecting a suggestion, the setup asks for the brand's website URL. The field is optional: providing it gives the correct logo, skipping it gives an honest neutral lettermark. When a URL is provided, the domain derived from it becomes the brand's domain for the analysis, and the logo is retrieved from it through the existing logo pipeline (brand logo service first, favicon as fallback). The user sees the resolved logo immediately in the setup, so a wrong logo is caught and corrected before the analysis is launched rather than discovered in the results. When the URL is left empty, no logo retrieval is attempted at all: the brand is displayed as a lettermark (its initial) everywhere, which replaces today's behavior of guessing a domain from the brand name and risking someone else's logo. A wrong logo is worse than no logo. Selecting a suggestion from the dropdown behaves exactly as today and never asks for a URL, since the domain is already known.

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| GEO-1260 | Story | Ask for the brand website when no suggestion is selected | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1260 |
| GEO-1261 | Story | Accept and normalize any reasonable URL input | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1261 |
| GEO-1262 | Story | Retrieve and preview the logo from the provided domain | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1262 |
| GEO-1263 | Story | Use the captured domain everywhere the brand appears | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1263 |

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1069
- **Stories:**
  - GEO-1260: https://onclusive.atlassian.net/browse/GEO-1260
  - GEO-1261: https://onclusive.atlassian.net/browse/GEO-1261
  - GEO-1262: https://onclusive.atlassian.net/browse/GEO-1262
  - GEO-1263: https://onclusive.atlassian.net/browse/GEO-1263
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- « Proceed without selecting a suggestion » = choosing the « {name} — custom » row of the brand search, also shown when the search returns no result; a typed address (e.g. www.licter.com) prefills the website field; changing the website after discovery clears the categories (GEO-1260).
- Field inline on Brand & Country under the selected custom brand card, globe icon; proposed copy « What is your brand's website? (optional) », placeholder « example.com » (GEO-1260, P5 to be validated).
- Root domain = host, lowercase, without www., port or path; other subdomains kept (shop.brand.co.uk); inline error « Enter a valid website, such as example.com. » on blur or « Discover Categories », step blocked while shown; server refuses an invalid website (GEO-1261, P3 to be validated).
- Preview on blur / Enter: 32px avatar of the brand card, domain under the name, grey pulsing placeholder while loading; Brandfetch → Google favicon → lettermark; Google may return a generic globe (known limit) (GEO-1262).
- New analyses: stored logo → favicon of the stored domain → lettermark everywhere (report list, sidebar + header, rankings target row, PPTX / PDF cover and rankings); no guessed source (name search, AI-cited domain); older analyses unchanged through `entity_domain_confirmed` (GEO-1263, P2 validated).
- Website asked only in a brand analysis, never in an unbranded one (GEO-1260, P4 to be validated; consistent with GEO-1241 in GEO-1209).
- No Figma for this epic (OS-Team exception); rules and examples by OS-Team on 2026-10-14.

## Out of Scope

- Changing the brand suggestion search itself or its provider
- Competitor logo handling; competitors added manually have the same weakness, but this epic only covers the analyzed brand entered at setup
- Using the captured domain for anything beyond logo retrieval and display (for example owned-source classification), even if it becomes possible later
