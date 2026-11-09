# GEO-1534: [Target Sources] Firecrawl usage above the plan: the same pages are captured again every day

**Story ID:** GEO-1534
**Issue Type:** Story
**Title:** [Target Sources] Firecrawl usage above the plan: the same pages are captured again every day
**Status:** 🔍 Code Review
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1513
**Created:** 2026-10-23
**Updated:** 2026-10-23
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1534

## User Story

_No "As a ... I want ... so that" block in the Jira description._

## Acceptance Criteria

_No "Acceptance criteria" section in Jira. The Jira description is copied verbatim below; the expected behaviour is the "Expected" section._

### Problem

The Actions Center verifies the pages AI engines cite with Firecrawl, at one credit per web page. Production now uses **19,000 to 20,000 credits a day**, which is **570,000 to 600,000 a month**. The Firecrawl Growth plan covers **500,000 a month**.

Most of this is repeated work. A daily report selects the same sources every day, so the same pages are captured again on Firecrawl every day, only to find the same content. When the content is unchanged, only the AI judge is skipped today: the Firecrawl credit is already spent.

Measured in production (20 to 23 October), pages selected each day that the same organisation had already read in the previous 3 days:

| Day | Pages selected | Already read in the last 3 days | Share |
|-----|----------------|---------------------------------|-------|
| 20/10 | 14,199 | 6,956 | 49% |
| 21/10 | 13,940 | 8,359 | 60% |
| 22/10 | 17,285 | 9,194 | 53% |
| 23/10 | 14,860 | 8,121 | 55% |

October was already short before this: until the GEO-1258 (https://onclusive.atlassian.net/browse/GEO-1258) fix on 14 October, PDF sources (billed one credit per PDF page) used 30,000 to 40,000 credits a day. The October gap is covered with pay-as-you-go; this ticket is about keeping November and later under the plan.

### Expected

A page whose verdict was confirmed by a capture less than N days ago is not captured again: its existing verdict is reused. Proposed N: 3 days, pending PM confirmation.

### Out of scope

- PDFs served without a .pdf address (one credit per page): a separate fix in the Actions Center job.
- Excluding x.com (30 credits per capture): a product decision, not in this ticket.

## Technical Details

- PR (draft): https://github.com/AirPR/geo-analytics/pull/867 — geo-backend only, the Actions Center job is not touched.
- N is a setting: it can change without a release.
- Backend behaviour, not visible as a UI change; QA check = no new Firecrawl capture / AI judge call for a page confirmed less than N days ago, re-read after N days.

## Comments — PO / dev decisions

_Summary of the Jira comments (read 2026-10-23). Not ACs._

| Date | Author | Decision / information |
|------|--------|------------------------|
| 2026-10-23 | Abdenasser Aroukhsiss (dev) | Changelog: fix in draft PR #867. When a page already has a verdict for the brand confirmed by a real capture less than N days ago (N = 3), the new analysis reuses it: no Firecrawl capture, no AI judge call. After N days the page is read again. A reuse never counts as a capture, so every page is read again at least every N days. |
| 2026-10-23 | Abdenasser Aroukhsiss (dev) | Example: Toyota runs daily and cites caranddriver.com/best-evs read on Monday; Tuesday and Wednesday reuse Monday's verdict (0 credit); Thursday reads the page again. |
| 2026-10-23 | Abdenasser Aroukhsiss (dev) | Expected gain: 49–60% of pages reused, usage from 19–20k to about 11–12.5k credits a day (≈ 330–375k a month, under the 500k plan). Upper bound: the measure ignores the brand family. |
| 2026-10-23 | Abdenasser Aroukhsiss (dev) | Trade-off: a page that changed (brand added or removed) or became unreachable keeps its previous verdict for at most N days. Above 7 days nothing more is saved (a verdict is judged again every 7 days anyway). |
| 2026-10-23 | Abdenasser Aroukhsiss (dev) | **Open, waiting for the PO (Quentin Reant):** approval of the approach and of N = 3 (options N = 0 / 2 / 3 / 4 given with their cost). The PR stays in draft until the PO answers. No PO answer yet. |

## Dependencies

- **Blocks:** None mentioned
- **Blocked by:** PO confirmation of N (pending)
- **Relates to:** GEO-1258 (PDF credits fix, 14 October)

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Code reviewed and merged
- [ ] Tests (unit / E2E) passing
- [ ] QA validated on staging
- [ ] PO decision on N recorded

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1513
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1534
- PR: https://github.com/AirPR/geo-analytics/pull/867
- Related: https://onclusive.atlassian.net/browse/GEO-1258
