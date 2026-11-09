# GEO-1052 — Editors add users within their organization quota

**Epic:** GEO-680 — Organization Quotas and User Management
**Fix Version:** 1.2 | **Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Created:** 2026-07-31 | **Updated:** 2026-08-04
**Jira:** https://onclusive.atlassian.net/browse/GEO-1052

---

## User Story

> As an editor user, I want to add users to my own organization, so that my team can be onboarded without waiting on the operations team, as long as we stay within our quota.

---

## Acceptance Criteria

**AC1 — Add under quota**

- **Given:** an editor in an organization that is below its user quota
- **When:** they add a user
- **Then:** the user is created in that organization and receives the standard welcome invitation

**AC2 — Blocked when quota full**

- **Given:** an editor in an organization that has reached or exceeded its user quota
- **When:** they try to add a user
- **Then:** the action is blocked and a clear message explains the quota is full

**AC3 — Own organization only**

- **Given:** an editor
- **When:** they manage users
- **Then:** they can only add users to the organization they are currently in and where they hold the editor role, never to another organization (per-organization roles covered by GEO-681)

**AC4 — Readers cannot add**

- **Given:** a reader user
- **When:** they view the product
- **Then:** they cannot add users

**AC5 — Super admins hidden from front office**

- **Given:** a front office user (editor or reader)
- **When:** they view the user settings
- **Then:** super admin users do not appear in the user list

**AC6 — Editor changes a user's role**

- **Given:** an editor viewing the user list
- **When:** they open a user's row actions and change the role (Reader ↔ Editor)
- **Then:** the new role is saved and reflected in the list immediately

**AC7 — Editor suspends and reactivates a user**

- **Given:** an editor viewing an active user
- **When:** they suspend the user
- **Then:** the user can no longer sign in, appears with status suspended, and still occupies a seat
- **Given:** a suspended user
- **When:** the editor reactivates them
- **Then:** the user regains access with the same role as before

**AC8 — Editor soft-deletes a user**

- **Given:** an editor viewing a user of their organization
- **When:** they soft-delete the user
- **Then:** the user loses access, no longer appears as active, and their seat is freed in the quota count

---

## Technical Notes / Scope notes

- Resend invitation: out of scope V1 (absent from design, stays backoffice-only)
- Guard rails: an editor can never act on themselves or on ADMIN/SUPER_ADMIN users; assignable roles limited to Reader/Editor
- Duplicate email: per PM decision (GEO-681 comment 826052), the editor may learn the account already exists in another organization — the step-1 error can say so explicitly
- "All statuses" filter includes soft-deleted users (OS-Team 2026-08-03); deleted rows expose no row actions (restore is backoffice-only)
- ACs 6–8 confirmed in scope by PM (comment 826032, 2026-08-03; out-of-scope line removed from the epic)

---

## Liens

- Spec complète : [epic-34/34-2-editors-add-users-within-their-organization-quota.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-680-org-quotas-user-management/docs/implementation-artifacts/epics/epic-34/34-2-editors-add-users-within-their-organization-quota.md)
- Epic : https://onclusive.atlassian.net/browse/GEO-680
- Dépendance : GEO-681 (Multi-Organization Membership — per-org roles)
