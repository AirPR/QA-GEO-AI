# GEO-1169: Actions Center - Target Sources: select the top 100 domains by citation frequency instead of failing prompts

**Task ID:** GEO-1169
**Issue Type:** Task
**Title:** Actions Center - Target Sources: select the top 100 domains by citation frequency instead of failing prompts
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-29
**Updated:** 2026-09-30
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1169

## User Story

_No user story in Jira (Task)._

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

Today the suspect selection (story 10.1, GEO-1116) only keeps the sources cited in gap answers: visibility answers where the brand is ranked worse than 10 or absent, competitive answers where the brand is not first, and perception answers with at least one negative concept. The verification job then checks each article.

The goal is to look at the sources that matter most to the AI engines, not only the ones cited in failing prompts. We will take the top X domains by frequency from AI Citation Sources, and verify all their cited articles the same way as today.

_What changes_

- Source pool: the top X domains of the snapshot, ranked by the same Frequency as the AI Citation Sources table (number of unique URLs of the domain), all markets, all engines and all question types.
- X = 100. It is a configuration value, not a hard-coded one, so we can change it without a release.
- No cap on URLs for now: every cited URL of the top X domains goes to verification.
- "Prompts associated with this source" in the details panel lists every prompt whose answer cites the source, not only the failing ones.

_What stays the same_

- GROUNDED sources only, owned and competitor domains excluded before the ranking, deduplication per answer and URL.
- The verification job, its verdicts and the verdict reuse across snapshots.
- A source is shown in Target Sources only when it has at least one article where the brand is missing or mentioned negatively, same as today. A top X domain where every article names the brand positively or neutrally is not shown.
- Ranking in the UI stays by article count (missing + negative), see GEO-1168.

_Cost_

Estimate on 2026-09-29, across all organisations (16 daily reports + 53 one-off analyses in the week), latest snapshot of each report. The fetch is billed per page on every run, even for unchanged pages.

- Top 100: ~7,800 pages per day, so ~234k pages per month.
- This fits in the Firecrawl Growth plan (500k credits per month, ~289 EUR per month billed yearly), the same plan as the 16.09 costing on GEO-1117, plus ~27 EUR of Gemini. Total ~316 EUR per month, about the same as the failing prompts version (~317 EUR).
- We use about 47% of the plan, so the volume can roughly double before we need the Scale plan.
- To confirm: the scrape options we use cost 1 credit per page (JSON extraction adds 4 credits per page), and whether failed fetches use credits.

**Acceptance criteria:**

- Given a snapshot, the selection keeps the X domains (100 by default) with the highest Frequency after the owned and competitor exclusion, and sends every GROUNDED cited URL of those domains to verification.
- The Frequency used for the ranking is computed the same way as the AI Citation Sources Frequency column (unique URLs per domain).
- A source cited only in answers where the brand is visible, first and positive can now be selected.
- Changing X in the configuration applies to the next selection run without a release.
- A domain of the top X with 0 missing and 0 negative articles does not appear in Target Sources. If no domain of the top X has one, the page shows the all-clear state.
- The prompts listed for a source in the details panel are all the prompts whose answer cites it in the scope, one row per prompt with the icons of the citing engines (see GEO-1178).
- The selection stays idempotent per snapshot and keeps the SUSPECT_SELECTION done marker.
- The selection log shows the number of domains considered, the X applied and the number of URLs sent to verification.

## Technical Details

_No dedicated Technical Details / Implementation Notes section in the Jira description (see the repository spec link below if present)._

## Dependencies

- **Blocks:** None mentioned
- **Blocked by:** None mentioned

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Code reviewed and merged
- [ ] Tests (unit / E2E) passing
- [ ] QA validated on staging
- [ ] Localisation (en-US, en-GB, fr-FR, es-ES) checked where UI copy changes

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-152
- Task Jira: https://onclusive.atlassian.net/browse/GEO-1169
