# GEO-1056 — Switch organization without signing out

**Epic:** [GEO-681](https://onclusive.atlassian.net/browse/GEO-681) — Multi-Organization Membership
**Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Jira:** https://onclusive.atlassian.net/browse/GEO-1056

## User Story

> As a user belonging to several organizations, I want to switch between my organizations while staying signed in, so that I can move between customers without re-authenticating.

## Acceptance Criteria

**AC1 — In-app switch, no re-auth**
- Given: a user is working in one organization
- When: they want to switch
- Then: they can change to another of their organizations without signing out and back in

**AC2 — New context is complete and immediate**
- Given: a user switches organization
- When: the new context loads
- Then: all data and actions immediately reflect the newly selected organization only

**AC3 — Nothing from the previous org remains**
- Given: a user switches organization
- When: the switch completes
- Then: no data from the previous organization remains visible

## Technical Notes

- Design: switcher dropdown with "Find a client..." search (frame 11734:18766).
- #1 production risk: cache hygiene — full frontend query-cache clear on switch + backend cache-key audit (all keys org-discriminated).

## Liens

- Spec complète : epic-35/35-3-switch-organization-without-signing-out.md
- Epic : [GEO-681](https://onclusive.atlassian.net/browse/GEO-681)
