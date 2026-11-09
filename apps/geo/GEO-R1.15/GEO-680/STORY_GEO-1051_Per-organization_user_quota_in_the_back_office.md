# GEO-1051 — Per-organization user quota in the back office

**Epic:** GEO-680 — Organization Quotas and User Management
**Fix Version:** 1.2 | **Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Created:** 2026-07-31 | **Updated:** 2026-08-04
**Jira:** https://onclusive.atlassian.net/browse/GEO-1051

---

## User Story

> As an internal operator, I want to set a user quota on each organization, so that the number of users an organization can have is controlled centrally.

---

## Acceptance Criteria

**AC1 — Set or change the quota**

- **Given:** an operator opens an organization in the back office
- **When:** they set or change its user quota
- **Then:** the quota is saved and shown on the organization

**AC2 — Current count shown against the quota**

- **Given:** an organization with a set quota
- **When:** its user list is viewed
- **Then:** the current user count is shown against the quota

**AC3 — Lowering below current count warns but does not remove**

- **Given:** an operator lowers a quota below the current user count
- **When:** they save
- **Then:** the change is not blocked, they are warned, and existing users are not removed automatically

**AC4 — Over-quota organizations block all adds**

- **Given:** an organization whose user count is above its quota
- **When:** anyone tries to add a user to it
- **Then:** adding users is blocked for as long as the organization remains above quota

**AC5 — Super admins are not counted**

- **Given:** an organization with super admin users
- **When:** the user count is compared against the quota
- **Then:** super admin users are not counted toward the quota

**AC6 — Rollout default of 100**

- **Given:** the organizations existing at rollout
- **When:** the quota feature is released
- **Then:** every organization receives a default quota of 100, and an internal operator then manually adjusts each organization's quota to its real entitlement

---

## Technical Notes / Seat-counting rules (settled)

- Invited-but-not-yet-active users **count** against the quota
- Suspended users keep counting; only soft-delete frees a seat

---

## Liens

- Spec complète : [epic-34/34-1-per-organization-user-quota-in-the-back-office.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-680-org-quotas-user-management/docs/implementation-artifacts/epics/epic-34/34-1-per-organization-user-quota-in-the-back-office.md)
- Epic : https://onclusive.atlassian.net/browse/GEO-680
