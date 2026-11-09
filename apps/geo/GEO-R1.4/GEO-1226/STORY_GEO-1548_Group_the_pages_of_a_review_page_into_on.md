# GEO-1548: STORY-49.2: Group the pages of a review page into one article

**Story ID:** GEO-1548
**Issue Type:** Story
**Title:** STORY-49.2: Group the pages of a review page into one article
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1226
**Fix version:** 1.4
**Created:** 2026-10-27
**Updated:** 2026-11-02
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1548

## User Story

> As a PR manager, I want the paginated pages of one review page to read as a single article, so that the list is short, the counts are honest and review sites are not ranked first only because they are paginated.

- **As** a PR manager
- **I want** the paginated pages of one review page to read as a single article
- **So that** the list is short, the counts are honest and review sites are not ranked first only because they are paginated.

## Acceptance Criteria

_7 functional ACs (Given/When/Then), copied verbatim from the Jira description (customfield_10049 empty)._

### AC1 — One article per review page

- Given: the CNP Assurances analysis, source trustpilot.com
- When: I open the panel
- Then: the cnp.fr reviews show as one article for fr.trustpilot.com and one for fr-be.trustpilot.com, instead of one article per page.

### AC2 — Same page only

- Given: two pages on the same host with different paths
- When: the panel is built
- Then: they are never grouped. Two subdomains are never grouped either.

### AC3 — Title

- Given: pages titled « Avis de CNP Assurances | Lisez les avis marchands de cnp.fr | 2 sur 30 »
- When: they are grouped
- Then: the article title is « Avis de CNP Assurances ».

### AC4 — Tabs

- Given: a grouped article
- When: the panel is built
- Then: it is negative when at least one of its pages is negative; it shows in Lack of visibility only when none of its pages names the brand.

### AC5 — Same number everywhere

- Given: a review site with grouped articles
- When: I compare the card, the panel tabs and the export
- Then: they give the same number of articles, and the cards are sorted by that number.

### AC6 — Review counts

- Given: an article whose pages hold 4, 2, 3 and 2 negative reviews
- When: the panel and the export are built
- Then: the article counts 11 negative reviews.

### AC7 — Unchanged

- Given: a source that is not classified Review Sites, or the « Prompts associated with this source » section
- When: the panel is built
- Then: nothing changes (one article per URL).

## Technical Details

**Technical part (dev only):** one grouping function for panel, card and exports (Review Sites only); card counts recomputed for Review Sites domains only; the panel query gets the VERIFIED filter the card already has (today the card and the panel can disagree).

### Technical Acceptance Criteria (4)

#### TAC1 — Key

- Given: `fr.trustpilot.com/review/cnp.fr`, `?page=2`, `?p=3`, `?pg=4`, `fr-be.trustpilot.com/review/cnp.fr?page=3`, `fr.trustpilot.com/review/axa.fr?page=2`
- When: `articleKey` runs on a Review Sites source
- Then: the first four share one key (pages 1–4), the other two have their own.

#### TAC2 — Not on other sources

- Given: `blog.example.com/?p=12` and `?p=34` on a Journalism source
- When: the panel is built
- Then: two articles.

#### TAC3 — Same count

- Given: a review site with 13 page URLs forming 2 articles, one page now `NOT_FETCHED`
- When: the card, the panel and the XLSX are built
- Then: all three say 2, and the `NOT_FETCHED` page counts nowhere.

#### TAC4 — No vacuous Lack of visibility

- Given: a group whose pages are all `NOT_FETCHED` or `CHECK_FAILED`
- When: the panel is built
- Then: the article is in no tab.

⚠️ **Dev note (not for QA):** T3 (whether trustpilot.com ever has scheme/www/trailing-slash URL variants within one review page) needs a prod query the dev agent could not run (no prod DB access); the conservative default (never merge these variants) is implemented and safe either way. The open design question on pages without stored reviews (comparison pages, ~half of review-site pages) was confirmed by the user: such a page keeps its classic passage only when it is the article's only page.

## Dependencies

- **Blocks:** —
- **Blocked by:** —
- **Related (mentioned in the description):** —

## Definition of Done

- [ ] All 7 functional ACs verified on staging
- [ ] Technical ACs covered by dev tests
- [ ] EN / FR / ES strings checked against the locked strings sheet (tab "GEO-1226 Review pages")
- [ ] No regression on sources not classified Review Sites

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1226
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1548
- External Spec (GitHub): [epic-49/49-2-group-the-pages-of-a-review-page-into-one-article.md](https://github.com/AirPR/geo-analytics/blob/docs/GEO-1226-epic-49-stories/docs/implementation-artifacts/epics/epic-49/49-2-group-the-pages-of-a-review-page-into-one-article.md)
- Design (GEO-1497): https://onclusive.atlassian.net/browse/GEO-1497
- Figma: https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=17435-4056
- Strings sheet: https://docs.google.com/spreadsheets/d/1Nab90jZNdxgAT5pouDk2QxLM5-6skrDF6p2A4w9o0z4/edit#gid=2029821253
