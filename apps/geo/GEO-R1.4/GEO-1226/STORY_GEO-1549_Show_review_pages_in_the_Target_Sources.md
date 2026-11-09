# GEO-1549: STORY-49.3: Show review pages in the Target Sources panel

**Story ID:** GEO-1549
**Issue Type:** Story
**Title:** STORY-49.3: Show review pages in the Target Sources panel
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1226
**Fix version:** 1.4
**Created:** 2026-10-27
**Updated:** 2026-11-02
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1549

## User Story

> As a PR manager, I want a review page to show as one article with its negative reviews grouped by page, so that I can read what customers criticise and open the page where each review sits.

- **As** a PR manager
- **I want** a review page to show as one article with its negative reviews grouped by page
- **So that** I can read what customers criticise and open the page where each review sits.

## Acceptance Criteria

_7 functional ACs (Given/When/Then), copied verbatim from the Jira description (customfield_10049 empty)._

### AC1 — Reviews by page

- Given: an article grouping several pages
- When: I open it in the panel
- Then: the reviews are listed by page, in page order; each page block starts with the page URL as a link that opens the page, then its count (« 4 negative reviews »), then its reviews. The URL shows in full even when it is long.

### AC2 — Article chip

- Given: an article with 17 negative reviews
- When: it is shown
- Then: a chip under the title reads « 17 negative reviews ». There is no page count and no « of 20 reviews ».

### AC3 — URL line

- Given: an article that groups several pages
- When: it is shown
- Then: its URL line is plain text. A review page with one page has no page block: its reviews show under the title and its URL line opens the page, as today.

### AC4 — Entry

- Given: a negative review
- When: it is shown
- Then: the entry is the quote only, without the user name, the rating or the date.

### AC5 — Show more

- Given: an article with more than 10 negative reviews
- When: it is shown
- Then: the first 10 reviews show, then « Show N more reviews ». The step counts reviews, not pages; when the cut falls inside a page, the header of that page shows above its first reviews and the rest shows after the click.

### AC6 — Engines

- Given: an article grouping pages cited by different engines
- When: it is shown
- Then: the cited-by icons are the engines that cite any of its pages.

### AC7 — Lack of visibility

- Given: a review page whose pages never name the brand
- When: I open the Lack of visibility tab
- Then: it shows as one article with its pages as links, without quotes.

## Design

Figma page « GEO-1497 - Review pages in the Target Sources panel »: frames 1.1, 1.2, 1.3, 1.4 and 2.1 (OS native). Strings: Target Sources strings sheet, tab « GEO-1226 Review pages ».

## Technical Details

### Technical Acceptance Criteria (3)

#### TAC1 — Step counts reviews

- Given: pages with 4, 2, 3 and 2 reviews and 6 more on later pages (17)
- When: the article renders
- Then: 10 entries (page 5 shows 1 of its 2 under its header), then « Show 7 more reviews »; after the click, 17 entries.

#### TAC2 — One page

- Given: an article with one page and 3 reviews
- When: it renders
- Then: no page block, 3 entries under the title, the URL line is a link.

#### TAC3 — Older API

- Given: an `ArticleDto` without `pages`
- When: it renders
- Then: today's article row with its passage.

⚠️ **Dev note (not for QA):** the FR/ES texts of `negativeReviews`/`showMoreReviews` are temporary literal translations — the Google Sheets tab « GEO-1226 Review pages » was not read in this pass. They must be corrected against the locked sheet before prod; EN text matches the epic wording exactly.

## Dependencies

- **Blocks:** —
- **Blocked by:** —
- **Related (mentioned in the description):** GEO-1497

## Definition of Done

- [ ] All 7 functional ACs verified on staging
- [ ] Technical ACs covered by dev tests
- [ ] EN / FR / ES strings checked against the locked strings sheet (tab "GEO-1226 Review pages")
- [ ] No regression on sources not classified Review Sites

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1226
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1549
- External Spec (GitHub): [epic-49/49-3-show-review-pages-in-the-target-sources-panel.md](https://github.com/AirPR/geo-analytics/blob/docs/GEO-1226-epic-49-stories/docs/implementation-artifacts/epics/epic-49/49-3-show-review-pages-in-the-target-sources-panel.md)
- Design (GEO-1497): https://onclusive.atlassian.net/browse/GEO-1497
- Figma: https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=17435-4056
- Strings sheet: https://docs.google.com/spreadsheets/d/1Nab90jZNdxgAT5pouDk2QxLM5-6skrDF6p2A4w9o0z4/edit#gid=2029821253
