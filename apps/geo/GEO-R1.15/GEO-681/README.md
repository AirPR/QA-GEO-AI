# GEO-681 — Multi-Organization Membership

**Fix Version:** GEO-R1.2 | **Status:** 🟨 QA In Progress | **Label:** August26
**Assignee:** Abdenasser Aroukhsiss
**Jira:** https://onclusive.atlassian.net/browse/GEO-681

## Overview

A single user account can now belong to several organizations. On signing in, a multi-org user is directed to their last-used organization. They can switch between their organizations without signing out. Rights (editor / reader) are scoped to the active organization at all times. Internal operators can manage the full multi-organization lifecycle from the back office.

## Stories

| # | Key | Title | Status |
|---|-----|-------|--------|
| 1 | [GEO-1054](https://onclusive.atlassian.net/browse/GEO-1054) | A user belongs to multiple organizations | ⏳ Ready for QA |
| 2 | [GEO-1055](https://onclusive.atlassian.net/browse/GEO-1055) | Default organization at sign-in | ⏳ Ready for QA |
| 3 | [GEO-1056](https://onclusive.atlassian.net/browse/GEO-1056) | Switch organization without signing out | ⏳ Ready for QA |
| 4 | [GEO-1057](https://onclusive.atlassian.net/browse/GEO-1057) | Rights follow the active organization | ⏳ Ready for QA |
| 5 | [GEO-1058](https://onclusive.atlassian.net/browse/GEO-1058) | Manage multi-organization membership from the back office | ⏳ Ready for QA |
| 6 | [GEO-1059](https://onclusive.atlassian.net/browse/GEO-1059) | Provision a new user into several organizations | ⏳ Ready for QA |
| 7 | [GEO-1060](https://onclusive.atlassian.net/browse/GEO-1060) | Suspend, reactivate and soft-delete a user account | ⏳ Ready for QA |
| 8 | [GEO-1063](https://onclusive.atlassian.net/browse/GEO-1063) | Organization lifecycle in the back office | ⏳ Ready for QA |

**Total : 8 stories | 36 ACs**

## Architecture

```
GEO-681/
├── EPIC.md                                                    ← Vue d'ensemble + ACs synthèse
├── README.md                                                  ← Ce fichier
├── INDEX.md                                                   ← Index numéroté + progression
├── epic-data.json                                             ← Données structurées
├── STORY_GEO-1054_A_user_belongs_to_multiple_organizations.md
├── STORY_GEO-1055_Default_organization_at_sign-in.md
├── STORY_GEO-1056_Switch_organization_without_signing_out.md
├── STORY_GEO-1057_Rights_follow_the_active_organization.md
├── STORY_GEO-1058_Manage_multi-organization_membership_from_the_back_office.md
├── STORY_GEO-1059_Provision_a_new_user_into_several_organizations.md
├── STORY_GEO-1060_Suspend_reactivate_and_soft-delete_a_user_account.md
└── STORY_GEO-1063_Organization_lifecycle_in_the_back_office.md
```

## Related Epics

- [GEO-680](https://onclusive.atlassian.net/browse/GEO-680) — Organization Quotas and User Management (EPIC-029) — depended upon by several stories
- EPIC-013 — User Administration (foundational model)
