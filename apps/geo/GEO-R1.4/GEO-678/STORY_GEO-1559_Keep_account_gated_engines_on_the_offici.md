# GEO-1559: STORY-50.10: Keep account-gated engines on the official API

**Story ID:** GEO-1559
**Issue Type:** Story
**Title:** STORY-50.10: Keep account-gated engines on the official API
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Youssef.AitLaydi
**Epic:** GEO-678
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1559

## User Story

> As the business, I want account-gated engines to stay on their official API, so that we never capture a surface that forms a contract at sign-in.

- **As** the business
- **I want** account-gated engines to stay on their official API
- **So that** we never capture a surface that forms a contract at sign-in.

_As written in Jira:_

**User Story 1.10** — As the business, I want account-gated engines to stay on their official API, so that we never capture a surface that forms a contract at sign-in.

## Acceptance Criteria

_2 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

✅ **Ready for dev** (2026-10-30) — wave 2. Build and staging captures with the Cloro dev key approved by the PM on 2026-10-30 (GEO-1558); the switch to rendered capture in production still waits for the legal sign-off and the capture vendor contract. Depends on STORY-50.9 (GEO-1558).

**Acceptance Criteria**

- Given an account-gated engine (Claude, Grok), When collection runs, Then the official API is used and no rendered capture is attempted
- Given an engine that no capture vendor can reach today (eg: Perplexity), When collection runs, Then it stays on its official API until a vendor can capture it

## Technical Details

_No technical details in the Jira description._

## Dependencies

- **Blocks:** none in Jira links
- **Blocked by:** none in Jira links

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-678
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1559
- External Spec: [epic-50/50-10-keep-account-gated-engines-on-the-official-api.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-50/50-10-keep-account-gated-engines-on-the-official-api.md)
