# GEO-1057 — Rights follow the active organization

**Epic:** [GEO-681](https://onclusive.atlassian.net/browse/GEO-681) — Multi-Organization Membership
**Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Jira:** https://onclusive.atlassian.net/browse/GEO-1057

## User Story

> As a user who has different roles in different organizations, I want my rights to always match the organization I am currently in, so that I can do everything my role allows there and nothing more.

## Acceptance Criteria

**AC1 — Editor capabilities where editor**
- Given: a user who is an editor in one organization and a reader in another
- When: they are in the organization where they are an editor
- Then: all editor capabilities are available there, including adding users within quota as defined in GEO-680 (EPIC-029)

**AC2 — Reader-only where reader**
- Given: the same user
- When: they are in the organization where they are a reader
- Then: editor capabilities are not available and nothing in the interface suggests they have editor rights there

**AC3 — Rights change immediately on switch**
- Given: a user switches organization
- When: the new context loads
- Then: their rights immediately reflect their role in the newly selected organization without signing out

**AC4 — No broken/forbidden landing**
- Given: a user is on a screen that their role in the newly selected organization does not allow
- When: they switch organization
- Then: they land on a screen their role allows instead of a broken or forbidden state

## Technical Notes

- Backend mechanism comes from the membership story (authorities derived from the active-org membership).
- This story = frontend role gating on active-org role + route guards + security test suite.

## Liens

- Spec complète : epic-35/35-4-rights-follow-the-active-organization.md
- Epic : [GEO-681](https://onclusive.atlassian.net/browse/GEO-681)
- Dépend de : [GEO-1054](https://onclusive.atlassian.net/browse/GEO-1054), [GEO-680](https://onclusive.atlassian.net/browse/GEO-680)
