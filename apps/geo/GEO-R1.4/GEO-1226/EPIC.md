# Target Sources Improvements for Review Pages

**Epic ID:** GEO-1226
**Status:** [QA IN PROGRESS] QA In Progress
**Assigned to:** Abdenasser Aroukhsiss
**Fix version:** 1.4
**Created:** 2026-10-07
**Updated:** 2026-11-11
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1226

## Description / Functional Need

### Context

Review sites (Trustpilot, Google Play, opinion sites) are among the most cited sources in Target Sources, and they do not behave like articles: the reviews of one company are split over many pages, each page holds about 20 reviews from different users, and the useful content is the reviews themselves, not the page header.

Example on production, CNP Assurances, source #1 trustpilot.com: "Negative perception (13)" lists fr.trustpilot.com/review/cnp.fr?page=2, ?page=3 up to ?page=10, plus fr-be.trustpilot.com/review/cnp.fr?page=3, 4 and 5, each with one passage, mostly the page title "Avis de CNP Assurances | Lisez les avis marchands de cnp.fr | 2 sur 29", while the pages hold many 1-star reviews.

Today, on developer:

- The panel lists one article per URL (TargetSourceDetailService.java:86), so each page of the same review page is a separate article. The list is hard to read, the count is inflated, and the card ranking (sorted by failing articles) favours review sites only because they are paginated.
- The check returns one verdict and one passage of 140 characters per URL (DepictionPrompt.java:75, one passage column in action_verdicts), so out of 20 reviews on a page the user sees one quote at best.
- The judge only receives excerpts of 300 characters around the brand name (Prefilter.java:32). On a company review page most reviews do not repeat the brand name, so they never reach the judge.
- The passage must contain the brand or product name (GEO-1183), so a review like "A EVITER ABSOLUMENT - POUR PRENDRE VOTRE ARGENT ILS SONT FORTS" can never be quoted, while the page is entirely about CNP.

### Goal

For a review page, the panel shows one article, and under it every negative review of every page, one entry per review. Three levels, used with the same meaning in the rest of this epic:

- Review: what one user wrote. A page holds several reviews from different users.
- Page: one URL, eg: fr.trustpilot.com/review/cnp.fr?page=3.
- Article: the line in the panel. For a review page, it groups all the pages of the same review page.

### Dependencies

GEO-1204: if the capture of a review page holds only the header (reviews loaded by script), there is no review to list. The capture must return the reviews first.

### Design

Design: GEO-1497, Figma page "GEO-1497 - Review pages in the Target Sources panel" ([link](https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=17435-4056)), frames 1.1 (review page as one article, first 10 reviews), 1.2 (Show more expanded), 1.3 (Lack of visibility), 1.4 (one-page review page) and 2.1 (OS native), with the changes listed in the changelog below.

Strings (locked 2026-10-22, EN/FR/ES): tab "GEO-1226 Review pages" of the [Target Sources strings sheet](https://docs.google.com/spreadsheets/d/1Nab90jZNdxgAT5pouDk2QxLM5-6skrDF6p2A4w9o0z4/edit#gid=2029821253). 4 new strings, as i18next plural keys: views.targetSources.panel.negativeReviews ("{{count}} negative reviews", used for the chip under the title and the count of each page block) and views.targetSources.panel.showMoreReviews ("Show {{count}} more reviews"), each with its _one form. No other new text: the page block header is the page URL.

### Changelog

- 2026-10-21: design review of GEO-1497. Removed "of 20 reviews" from the page block (the judge does not return the total of a page). Page block header = page URL as the link instead of "Page 2". No "N pages" chip. Entry = quote only (open point 2 closed). No page count under the title (open point 3 closed). Show more = first 10 reviews. Grouped article URL line = plain text; one-page review page keeps its URL link. Lack of visibility rule for a grouped article. Cited-by icons = union of the pages. Open point 1 (cap per page) still open.
- 2026-10-22: design updated by Jalal and checked (GEO-1497). Strings locked and added to the strings sheet, tab "GEO-1226 Review pages".
- 2026-10-22: open point 1 closed, the judge returns at most 10 negative reviews per page; counts use the reviews listed, so the design does not change. No open point left.

## Scope

### 1. One article per review page

- Two pages of a source belong to the same article when they have the same host and the same path and differ only by a pagination parameter (page, p, pg). Different subdomains are not grouped: fr.trustpilot.com and fr-be.trustpilot.com stay two articles.
- The article title is the page title without the page part (eg: "Avis de CNP Assurances", not "Avis de CNP Assurances | 10 sur 28").
- The article is negative when at least one of its pages is negative. This verdict only decides the tab where the article shows.
- The article shows in Lack of visibility only when none of its pages names the brand.
- Counts use articles, not pages or reviews: the tab count in the panel, the failing articles count on the card, the card sort, and the export (Excel, PDF, PPTX).
- Each page is still checked on its own, as today.
- The "Prompts associated with this source" section does not change.

### 2. Every negative review, not one per page

- This applies to sources classified as Review Sites (the badge on the card). Other sources keep one passage per page, as today.
- The judge reads the whole captured page, not the excerpts around the brand name, as the page is about the brand.
- The judge returns every review of the page that criticises the brand. Each negative review is its own entry: if 4 users criticise the brand on page 2, page 2 gives 4 entries.
- The judge returns at most 10 negative reviews per page. The counts (page block, chip under the title, export) count the reviews listed, so a page never shows more than "10 negative reviews" and the panel does not say that more exist.
- Each entry is the review quoted verbatim, at most 140 characters, shortened with "…" on a word boundary when needed (same rule as GEO-1201). It does not need to contain the brand name: the GEO-1183 rule stays for other sources.
- A page is negative when it holds at least one negative review. The page title, the site menu, a banner or a positive review are never quoted (GEO-1224).

> **PO decision 2026-11-11 (GEO-1583 comment 876255, Quentin Reant):** "Any criticism = listed please" — a review that criticises the brand is listed even when it is rated 4 or 5 stars (answer to the dev question 876222 on the conflict between "every review that criticises the brand" and "a positive review is never quoted"). The Jira scope text is not updated yet (synced 2026-11-12).

### 3. Panel

- Under the article, the reviews are listed by page, in page order. Each page block starts with the page URL as a link that opens the page, then its count, eg: fr.trustpilot.com/review/cnp.fr?page=2 and "4 negative reviews", then its reviews. The URL shows in full even when it is long.
- The panel does not show the total number of reviews of a page ("of 20 reviews"): the judge returns the negative reviews only.
- Under the article title, a chip gives the number of negative reviews of the article (eg: "17 negative reviews"). There is no chip for the number of pages.
- The URL line of an article that groups several pages is plain text, as each page block opens its own page. A review page with one page has no page block: its reviews show under the title and its URL line opens the page, as today.
- Each entry is the quote only, without the user name, the rating or the date.
- The cited-by icons of the article are the engines that cite any of its pages.
- The article shows its first 10 reviews and a "Show N more reviews" for the rest, the same step as the articles list (GEO-1161). The step counts reviews, not pages. When the cut falls inside a page, the header of that page shows above its first reviews and the rest shows after the click.
- The export shows the number of negative reviews per article, not the quotes.

## Out of Scope

_No "Out of Scope" section in the Jira description._ Limits stated in the scope:

- Sources not classified Review Sites keep one passage per page, as today (GEO-1183 rule unchanged for them).
- The "Prompts associated with this source" section does not change.
- The export shows the number of negative reviews per article, not the quotes.

## Associated Stories & Tasks

| ID | Type | Title | Status |
|----|------|-------|--------|
| GEO-1547 | Story | STORY-49.1: List every negative review of a review page | [READY FOR QA] Ready for QA (2026-11-11) |
| GEO-1548 | Story | STORY-49.2: Group the pages of a review page into one article | [QA IN PROGRESS] QA In Progress |
| GEO-1549 | Story | STORY-49.3: Show review pages in the Target Sources panel | [QA IN PROGRESS] QA In Progress |

Other children, not imported: GEO-1204 (Bug, Passed QA 2026-11-10), GEO-1497 (Design Task, Done).

## Architecture

_No dedicated architecture section in the description._ Code references given in the Context: TargetSourceDetailService.java:86 (one article per URL today), DepictionPrompt.java:75 (one verdict and one 140-character passage per URL), Prefilter.java:32 (300-character excerpts around the brand name). Story technical parts: Flink judge prompt with its own version (review-v1), optional Kafka fields, reviews table, one grouping function (articleKey) for panel, card and exports.

## Acceptance Criteria — Summary

_Epic acceptance criteria, verbatim from Jira:_

1. On the CNP Assurances analysis, trustpilot.com shows the cnp.fr reviews as one article for fr.trustpilot.com and one for fr-be.trustpilot.com, instead of one article per page.
2. A page with 4 negative reviews from 4 users shows 4 entries under its page block.
3. Each entry is quoted verbatim from the page, and its page block opens that page.
4. No entry is a page title, a menu, a banner or a positive review.
5. A review that does not name the brand is listed when it criticises it.
6. Two different pages on the same host (different paths) are never grouped.
7. The count on the card, the count in the panel and the export give the same number.
8. An article with more than 10 negative reviews shows the first 10 and a "Show N more reviews" for the rest.
9. A review page whose pages never name the brand shows in Lack of visibility as one article; it does not show there when one of its pages names the brand.
10. A page with more than 10 negative reviews lists 10 entries under its page block, and its count reads "10 negative reviews".

## Links

- https://onclusive.atlassian.net/browse/GEO-1226
- GEO-1547: https://onclusive.atlassian.net/browse/GEO-1547
- GEO-1548: https://onclusive.atlassian.net/browse/GEO-1548
- GEO-1549: https://onclusive.atlassian.net/browse/GEO-1549
- Design task GEO-1497: https://onclusive.atlassian.net/browse/GEO-1497
- Figma: https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=17435-4056
- Strings sheet: https://docs.google.com/spreadsheets/d/1Nab90jZNdxgAT5pouDk2QxLM5-6skrDF6p2A4w9o0z4/edit#gid=2029821253
