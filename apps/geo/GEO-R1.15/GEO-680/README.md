# GEO-680 — Organization Quotas and User Management

> EPIC-34 | Fix Version 1.2 | Label: August26

## Overview

This epic adds an enforced per-organization user quota set in the back office, and lets editor users add users to their own organization within that quota, without waiting on the operations team. Readers can view organization members in read-only. Super admin users are excluded from quota count and hidden from the front office.

| Field | Value |
|-------|-------|
| Epic | GEO-680 |
| Status | 🟨 QA In Progress |
| Assignee | Abdenasser Aroukhsiss |
| Reporter | Quentin.Reant |
| Fix Version | 1.2 (2026-09-24) |
| Created | 2026-06-17 |
| Updated | 2026-08-04 |
| Jira | https://onclusive.atlassian.net/browse/GEO-680 |

## Stories

| # | Story Key | Title | Status |
|---|-----------|-------|--------|
| 1 | GEO-1051 | Per-organization user quota in the back office | ⏳ Ready for QA |
| 2 | GEO-1052 | Editors add users within their organization quota | ⏳ Ready for QA |
| 3 | GEO-1053 | Readers view organization users in read-only | ⏳ Ready for QA |

## Architecture / Key Points

- **Quota enforcement:** per-organization quota set in back office; blocks all user adds when at/above quota
- **Seat counting:** invited-but-not-yet-active users count; suspended users keep their seat; soft-delete frees a seat
- **Super admins:** excluded from quota count, not visible in front office user settings
- **Editor scope:** editors can only manage users within their own organization
- **Rollout:** default quota of 100 for all existing organizations
- **Dependency:** GEO-681 (Multi-Organization Membership — per-org roles)

## Files

```
GEO-680/
├── EPIC.md                                                            ← overview + scope + AC synthesis
├── STORY_GEO-1051_Per-organization_user_quota_in_the_back_office.md
├── STORY_GEO-1052_Editors_add_users_within_their_organization_quota.md
├── STORY_GEO-1053_Readers_view_organization_users_in_read-only.md
├── README.md                                                          ← this file
├── INDEX.md                                                           ← numbered index + progress
└── epic-data.json                                                     ← structured data (source for scripts)
```

## Links

- Epic Jira: https://onclusive.atlassian.net/browse/GEO-680
- Depends on: https://onclusive.atlassian.net/browse/GEO-681
