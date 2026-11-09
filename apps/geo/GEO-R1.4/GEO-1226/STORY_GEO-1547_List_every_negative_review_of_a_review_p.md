# GEO-1547: STORY-49.1: List every negative review of a review page

**Story ID:** GEO-1547
**Issue Type:** Story
**Title:** STORY-49.1: List every negative review of a review page
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1226
**Fix version:** 1.4
**Created:** 2026-10-27
**Updated:** 2026-11-02
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1547

## User Story

> As a PR manager reading the Target Sources panel, I want every negative review of a review page to be listed, even when the reviewer does not repeat the brand name, so that I see what customers actually criticise instead of the page title.

- **As** a PR manager reading the Target Sources panel
- **I want** every negative review of a review page to be listed, even when the reviewer does not repeat the brand name
- **So that** I see what customers actually criticise instead of the page title.

## Acceptance Criteria

_7 functional ACs (Given/When/Then), copied verbatim from the Jira description (customfield_10049 empty)._

### AC1 — Every negative review, one entry each

- Given: a review page of the brand where 4 users criticise the brand
- When: the page is checked
- Then: the page gives 4 entries, one per review.

### AC2 — Verbatim, 140 characters

- Given: a negative review longer than 140 characters
- When: it is listed
- Then: it is quoted verbatim, shortened with « … » on a word boundary (same rule as GEO-1201).

### AC3 — Brand name not required on a review page

- Given: a review page of the brand and the review « A EVITER ABSOLUMENT - POUR PRENDRE VOTRE ARGENT ILS SONT FORTS »
- When: the page is checked
- Then: the review is listed although it does not name the brand. The GEO-1183 rule (the passage names the brand) stays for every other page.

### AC4 — Never chrome or a positive review

- Given: a review page
- When: it is checked
- Then: no entry is the page title, a menu, a banner, a summary written by the site, a reply from the company or a positive review (GEO-1224).

### AC5 — At most 10 per page

- Given: a page with more than 10 negative reviews
- When: it is checked
- Then: 10 entries are kept, and the page counts 10.

### AC6 — Negative page

- Given: a review page
- When: it is checked
- Then: the page is negative when it holds at least one negative review.

### AC7 — Other sources unchanged

- Given: a page of a source that is not classified Review Sites
- When: it is checked
- Then: it keeps one passage per page, as today.

### Open question

**Waiting for the PM (question on GEO-1226):** which review-site pages get review mode. Default built: only a page that reviews one company of the brand family; a page comparing several companies keeps today's rule (AC7). Reversible by the prompt only.

## Technical Details

**Technical part (dev only):** Flink judge prompt with its own version, optional Kafka fields, reviews table, deploy with stop-with-savepoint. Capture of review pages checked on 2026-10-27 (GEO-1204 does not block).

### Technical Acceptance Criteria (5)

#### TAC1 — Optional contract

- Given: a candidate without `reviewSite`, and a verdict without `reviews` / `pageTitle`
- When: they are consumed
- Then: today's behaviour, no error.

#### TAC2 — Only review pages re-judged

- Given: verdicts judged `depiction-v6` before the deploy
- When: the next run dispatches
- Then: a non-review page is not stale; a review-site page is stale once (expects `review-v1`).

#### TAC3 — Verbatim only

- Given: an engine answer with a quote that is not in the page text
- When: the verdict is built
- Then: the quote is dropped; a page left with no quote is not `NAMED_NEGATIVELY` on that quote.

#### TAC4 — Cap and cut

- Given: 14 negative reviews, one of 200 characters
- When: the verdict is built
- Then: 10 entries; the long one ends with « … » on a word boundary, ≤ 140 characters.

#### TAC5 — Reviews survive reuse

- Given: an unchanged page with a stored review verdict
- When: it is reused (hash match or GEO-1534 window)
- Then: its reviews are still returned for the panel.

⚠️ **Dev note (not for QA):** T1's real Firecrawl captures were not found in the repo; the dev agent used synthetic fixtures reproducing the documented traps instead. Re-run against the real six captures before this reaches prod. Migration moved to V2.10.10 (V2.10.9 collision with `feature/crawl-blocklist`).

## Dependencies

- **Blocks:** —
- **Blocked by:** —
- **Related (mentioned in the description):** GEO-1201, GEO-1183, GEO-1224, GEO-1204, GEO-1534

## Definition of Done

- [ ] All 7 functional ACs verified on staging
- [ ] Technical ACs covered by dev tests
- [ ] EN / FR / ES strings checked against the locked strings sheet (tab "GEO-1226 Review pages")
- [ ] No regression on sources not classified Review Sites

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1226
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1547
- External Spec (GitHub): [epic-49/49-1-list-every-negative-review-of-a-review-page.md](https://github.com/AirPR/geo-analytics/blob/docs/GEO-1226-epic-49-stories/docs/implementation-artifacts/epics/epic-49/49-1-list-every-negative-review-of-a-review-page.md)
- Design (GEO-1497): https://onclusive.atlassian.net/browse/GEO-1497
- Figma: https://www.figma.com/design/xctSRqtM653zRS7QY3KMm0/Measure---GEO-Module?node-id=17435-4056
- Strings sheet: https://docs.google.com/spreadsheets/d/1Nab90jZNdxgAT5pouDk2QxLM5-6skrDF6p2A4w9o0z4/edit#gid=2029821253
