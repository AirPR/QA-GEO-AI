# GEO-1054 — A user belongs to multiple organizations

**Epic:** [GEO-681](https://onclusive.atlassian.net/browse/GEO-681) — Multi-Organization Membership
**Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Jira:** https://onclusive.atlassian.net/browse/GEO-1054

## User Story

> As a user who works across more than one customer, I want a single account that can belong to several organizations, so that I do not need separate accounts and credentials for each one.

## Acceptance Criteria

**AC1 — Adding an existing user links, never duplicates**
- Given: an operator or editor adds an existing user to an organization
- When: the user is already part of another organization
- Then: they are linked to the additional organization under the same account, with a role chosen for that organization

**AC2 — Strict data isolation**
- Given: a user belonging to several organizations
- When: they are within one organization
- Then: they only see that organization's data and never another organization's data

**AC3 — Role changes are per organization**
- Given: a user belonging to several organizations
- When: their role is changed in one organization
- Then: their roles in their other organizations are unchanged

**AC4 — Removal from one org keeps the others**
- Given: a user is removed from one of their organizations
- When: they sign in
- Then: they retain access to their remaining organizations with the role they hold in each

## Technical Notes

- Foundational story: new `user_org_memberships` table (role per membership) + backfill, `GeoTenantFilter` resolves org and authorities from memberships.
- Depends on GEO-680 (UserSeatService) and EPIC-013.

## Liens

- Spec complète : epic-35/35-1-a-user-belongs-to-multiple-organizations.md
- Epic : [GEO-681](https://onclusive.atlassian.net/browse/GEO-681)
- Dépend de : [GEO-680](https://onclusive.atlassian.net/browse/GEO-680)
