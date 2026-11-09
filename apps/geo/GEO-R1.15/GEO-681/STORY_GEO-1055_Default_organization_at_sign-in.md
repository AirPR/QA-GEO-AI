# GEO-1055 — Default organization at sign-in

**Epic:** [GEO-681](https://onclusive.atlassian.net/browse/GEO-681) — Multi-Organization Membership
**Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Jira:** https://onclusive.atlassian.net/browse/GEO-1055

## User Story

> As a user belonging to several organizations, I want to be directed to the organization I previously connected to by default when I sign in, so that I always land in the right context.

## Acceptance Criteria

**AC1 — Default to last-used organization**
- Given: a user who belongs to more than one organization
- When: they sign in
- Then: they are by default redirected to the organization they previously connected to

**AC2 — Single-org users go straight in**
- Given: a user who belongs to exactly one organization
- When: they sign in
- Then: they go straight into that organization

**AC3 — Chosen org is visible and scopes everything**
- Given: a user has chosen an organization
- When: they are in the product
- Then: the chosen organization is shown and all data and actions are scoped to it

## Technical Notes

- Design: topbar org indicator, section "Organization selection and switching" (node 11734:19767).
- Known design gap: role not shown in the switcher (tracked in the design story).
- Security decision to settle before dev: active-org resolution = server-side `last_org_id` (proposed default) vs signed header/cookie (concurrent tabs).

## Liens

- Spec complète : epic-35/35-2-default-organization-at-sign-in.md
- Epic : [GEO-681](https://onclusive.atlassian.net/browse/GEO-681)
