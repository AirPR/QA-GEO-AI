# Epic GEO-1226: Target Sources Improvements for Review Pages

Data imported from Jira for epic **GEO-1226: Target Sources Improvements for Review Pages**

> Last Jira sync: 2026-11-03 — 3 stories + 0 tasks

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview |
| **STORY_GEO-1547_List_every_negative_review_of_a_review_p.md** | STORY-49.1: List every negative review of a review page |
| **STORY_GEO-1548_Group_the_pages_of_a_review_page_into_on.md** | STORY-49.2: Group the pages of a review page into one article |
| **STORY_GEO-1549_Show_review_pages_in_the_Target_Sources.md** | STORY-49.3: Show review pages in the Target Sources panel |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data |

## Epic Overview

Review sites (Trustpilot, Google Play, opinion sites) are paginated: today each page is a separate article in the Target Sources panel with one 140-character passage, often the page title. This epic groups the pages of one review page into one article and lists every negative review (at most 10 per page, verbatim, brand name not required), grouped by page. Fix version 1.4.

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| GEO-1547 | Story | STORY-49.1: List every negative review of a review page | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1547 |
| GEO-1548 | Story | STORY-49.2: Group the pages of a review page into one article | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1548 |
| GEO-1549 | Story | STORY-49.3: Show review pages in the Target Sources panel | [READY FOR QA] Ready for QA | https://onclusive.atlassian.net/browse/GEO-1549 |

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1226
- **Stories:** GEO-1547, GEO-1548, GEO-1549
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- Grouping applies to Review Sites sources only. Key = same host + same path, differing only by a pagination parameter (page, p, pg). Subdomains are never grouped (fr.trustpilot.com vs fr-be.trustpilot.com).
- Article title = page title without the page part ("Avis de CNP Assurances").
- Counts use articles: panel tab, failing articles count on the card, card sort, exports (Excel, PDF, PPTX). Review counts = reviews listed (max 10 per page).
- Entries: verbatim, max 140 characters, shortened with "…" on a word boundary (GEO-1201); never a page title, menu, banner, site summary, company reply or positive review (GEO-1224).
- Panel: page blocks (page URL as a link + "N negative reviews"), article chip "N negative reviews", Show more step = 10 reviews (GEO-1161); a one-page review page has no page block and keeps its URL link.
- Strings: views.targetSources.panel.negativeReviews / showMoreReviews (+ _one forms), EN/FR/ES locked 2026-10-22. Dev note on GEO-1549: FR/ES are temporary literal translations, to be corrected against the sheet before prod.
- Open question on GEO-1547 (waiting for the PM): which review-site pages get review mode (default built: a page reviewing one company of the brand family).
- Test data named in the ACs: CNP Assurances analysis, source trustpilot.com.

## Out of Scope

- Sources not classified Review Sites (one passage per page, unchanged).
- "Prompts associated with this source" section.
- Quotes in exports (counts only).
