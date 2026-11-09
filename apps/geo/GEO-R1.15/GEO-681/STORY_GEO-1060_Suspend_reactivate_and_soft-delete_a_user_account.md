# GEO-1060 — Suspend, reactivate and soft-delete a user account

**Epic:** [GEO-681](https://onclusive.atlassian.net/browse/GEO-681) — Multi-Organization Membership
**Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Jira:** https://onclusive.atlassian.net/browse/GEO-1060

## User Story

> As an internal Onclusive operator, I want to suspend, reactivate, and soft-delete a user account across all its organizations, so that I can quickly pause or remove a person's access without losing their setup.

## Acceptance Criteria

**AC1 — Suspension is account-wide, non-destructive**
- Given: the operator suspends a user
- When: the suspension takes effect
- Then: the user can no longer sign in and all their access is paused across every organization they belong to, while their memberships, roles, and data remain intact

**AC2 — Reactivation restores everything**
- Given: a suspended user
- When: the operator reactivates them
- Then: the user regains access to all their organizations with the same role in each as before the suspension

**AC3 — Soft-delete moves to a restorable list**
- Given: the operator soft-deletes a user
- When: they confirm the action
- Then: the user loses access to every organization they belonged to and is moved to a deleted list instead of being permanently removed

**AC4 — Restore from deleted list**
- Given: a soft-deleted user
- When: the operator restores them from the deleted list
- Then: the account is usable again without re-creating it *(restored as UNASSIGNED — memberships not revived; operator re-assigns organizations via Assign organisations flow)*

**AC5 — Status visible and filterable**
- Given: a user is suspended or soft-deleted
- When: the back office user list is viewed or filtered by status
- Then: their status is visible and filterable

## Technical Notes

- Design: confirm modals frames 2.2 / 2.4 (account-wide copy).
- Account-wide semantics confirmed by PM (design revision 2026-07-30) — status stays at account level, not per membership.
- Restore semantics settled by PM (comment 826052, 2026-08-03): restore = UNASSIGNED; operator re-assigns orgs afterwards.

## Liens

- Spec complète : epic-35/35-7-suspend-reactivate-and-soft-delete-a-user-account.md
- Epic : [GEO-681](https://onclusive.atlassian.net/browse/GEO-681)
