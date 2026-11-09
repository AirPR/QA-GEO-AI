# GEO-1053 — Readers view organization users in read-only

**Epic:** GEO-680 — Organization Quotas and User Management
**Fix Version:** 1.2 | **Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Created:** 2026-07-31 | **Updated:** 2026-08-04
**Jira:** https://onclusive.atlassian.net/browse/GEO-1053

---

## User Story

> As a reader user, I want to see the user settings of my organization, so that I know who is part of my organization and who holds the editor role.

---

## Acceptance Criteria

**AC1 — Reader sees the list with roles**

- **Given:** a reader user
- **When:** they open the user settings
- **Then:** they see the list of users in their organization with each user's role (editor or reader)

**AC2 — No management actions**

- **Given:** a reader user viewing the user settings
- **When:** they look at the page
- **Then:** no actions to create users, delete users, or change a user's role are available to them

**AC3 — Own organization only**

- **Given:** a reader user
- **When:** they view the user settings
- **Then:** they only see users belonging to their own organization

---

## Technical Notes / Design notes (frame 3.1, node 11832:1744)

- Blue info banner: *"You have view-only access. Contact an editor in your organisation to manage users."*
- Seats bar kept, caption: *"Managed by your organisation's editors"*
- No Provision button, no ACTIONS column; same search/filters/pagination as the editor view

---

## Liens

- Spec complète : [epic-34/34-3-readers-view-organization-users-in-read-only.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-680-org-quotas-user-management/docs/implementation-artifacts/epics/epic-34/34-3-readers-view-organization-users-in-read-only.md)
- Epic : https://onclusive.atlassian.net/browse/GEO-680
