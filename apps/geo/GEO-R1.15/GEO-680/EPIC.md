# GEO-680 — Organization Quotas and User Management

> Fix Version 1.2 | Label: August26 | Status: 🟨 QA In Progress

## Functional Need

Organization management is too rigid to scale. Organizations have no enforced usage quota, and only internal operators can add users, so every new team member has to go through the operations team even when the organization has room to grow. This slows onboarding and puts routine user management on the wrong team.

This EPIC adds an enforced per-organization user quota set in the back office, and lets editor users add users to their own organization as long as they stay within that quota, without waiting on the operations team. Readers can see who is part of their organization and who holds the editor role, but remain unable to manage users, and editors can only manage users within their own organization. Super admin users are internal: they do not count toward an organization's quota and are never visible in the front office user settings. This builds on the organization and user model introduced in user administration (see [EPIC-013]), adding quotas and self-serve user creation within quota.

## Scope

- Per-organization user quota set and managed in the back office
- Editor users can add users to their own organization within quota
- Reader users can view organization members in read-only
- Super admin users excluded from quota count and hidden from front office
- Rollout default quota of 100 for existing organizations
- Invited-but-not-yet-active users count against the quota
- Suspended users keep their seat; only soft-delete frees a seat

## Out of Scope

- Internal operations monitoring and cost dashboards (covered by EPIC-028)
- Multi-organization membership and organization selection at sign-in (covered by EPIC-030 / GEO-681)
- Role definitions beyond what is needed for editors to add users and readers to be excluded
- Resend invitation (out of scope V1 — backoffice-only)

## Still Open (non-blocking)

- Confirm whether the user quota counts invited-but-not-yet-active users against the limit *(resolved: yes, they count)*
- Confirm whether editors can also resend invitations or remove users they added, or only add *(resolved: resend = out of scope V1)*

## Stories

| # | Story Key | Title | Status | Jira | AC count |
|---|-----------|-------|--------|------|----------|
| 1 | GEO-1051 | Per-organization user quota in the back office | ⏳ Ready for QA | [GEO-1051](https://onclusive.atlassian.net/browse/GEO-1051) | 6 |
| 2 | GEO-1052 | Editors add users within their organization quota | ⏳ Ready for QA | [GEO-1052](https://onclusive.atlassian.net/browse/GEO-1052) | 8 |
| 3 | GEO-1053 | Readers view organization users in read-only | ⏳ Ready for QA | [GEO-1053](https://onclusive.atlassian.net/browse/GEO-1053) | 3 |

**Total ACs : 17**

## Acceptance Criteria — Synthèse

### GEO-1051 — Per-organization user quota in the back office
- AC1 : Operator sets or changes quota → saved and displayed
- AC2 : User list shows current count against quota
- AC3 : Lowering below current count warns but does not remove existing users
- AC4 : Over-quota organizations block all user additions
- AC5 : Super admin users not counted toward quota
- AC6 : Rollout default quota of 100 for all existing organizations

### GEO-1052 — Editors add users within their organization quota
- AC1 : Editor below quota can add user → user created with welcome invitation
- AC2 : Editor at/above quota blocked with clear message
- AC3 : Editor can only add users to their own organization
- AC4 : Reader users cannot add users
- AC5 : Super admin users hidden from front office user list
- AC6 : Editor can change a user's role (Reader ↔ Editor)
- AC7 : Editor can suspend and reactivate a user
- AC8 : Editor can soft-delete a user → seat freed

### GEO-1053 — Readers view organization users in read-only
- AC1 : Reader sees list of organization users with roles
- AC2 : No management actions available to reader
- AC3 : Reader sees only their own organization's users
