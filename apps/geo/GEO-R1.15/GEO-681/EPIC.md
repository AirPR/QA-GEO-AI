# GEO-681 — Multi-Organization Membership

> Fix Version 1.2 | Label: August26 | Status: 🟨 QA In Progress

## Functional Need

Today a person can belong to only one organization, so anyone who works across two customers needs two separate accounts with separate credentials. This is awkward for agencies and internal staff who legitimately operate across multiple customers, and it forces them to sign out and back in to move between contexts.

This EPIC lets a single user belong to several organizations under one account. On signing in, a user who belongs to more than one organization chooses which one to enter, and they can switch between their organizations without signing out. At all times the user only sees the data of the organization they are currently in, so data is never mixed across organizations. A user's role is set per organization, not per account: the same person can be a reader in one organization and an editor in another, and their rights always follow the organization they are currently in.

Extends the organization and user model introduced in user administration (EPIC-013) and interacts with editor self-serve user management (GEO-680 / EPIC-029), whose editor rights apply only in the organizations where the user holds the editor role.

## Scope

- Single account linked to several organizations, role chosen per organization
- At sign-in, multi-org users land in the organization they previously connected to
- In-app organization switcher without re-authentication
- Rights (editor / reader) scoped to the active organization at all times
- Back office: assign, remove and change roles across organizations; no duplicate accounts
- Back office: provision new users into one or several organizations at once
- Back office: account-wide suspend, reactivate and soft-delete
- Back office: full organization lifecycle (create, edit, suspend, soft-delete) — frames 4.x

## Out of Scope

- Internal operations monitoring and cost dashboards (covered by EPIC-028)
- Per-organization user quotas and editor self-serve user management (covered by GEO-680 / EPIC-029)
- Cross-organization views showing data from more than one organization simultaneously
- Changes to authentication beyond adding the organization choice
- New roles or changes to what reader and editor roles can do

## Still Open (non-blocking)

- Confirm whether an editor adding an existing user by email learns the account already exists in another organization (cross-organization privacy; back office existence check applies to internal operators only)
- Confirm whether the user is notified when their role in one of their organizations changes
- Confirm whether restoring a soft-deleted user brings back previous memberships and roles, or restores as unassigned *(resolved 2026-08-03: restore = UNASSIGNED; operator re-assigns afterwards)*
- Confirm which EPIC owns organization suspension and soft-deletion (frames 4.x ship with this back-office redesign but are OS-Team-authored; PM review requested before dev)

## Resolved

- A user's role can differ per organization: role is a property of the membership, not the account
- Multi-org user defaults to the organization they previously connected to at sign-in
- Role in an additional organization is chosen at assignment time, per organization (design revision 2026-07-30)
- Suspending and soft-deleting a user apply to the whole account across all organizations (design revision 2026-07-30)

## Stories

| # | Story Key | Title | Status | Jira | AC count |
|---|-----------|-------|--------|------|----------|
| 1 | GEO-1054 | A user belongs to multiple organizations | ⏳ Ready for QA | [GEO-1054](https://onclusive.atlassian.net/browse/GEO-1054) | 4 |
| 2 | GEO-1055 | Default organization at sign-in | ⏳ Ready for QA | [GEO-1055](https://onclusive.atlassian.net/browse/GEO-1055) | 3 |
| 3 | GEO-1056 | Switch organization without signing out | ⏳ Ready for QA | [GEO-1056](https://onclusive.atlassian.net/browse/GEO-1056) | 3 |
| 4 | GEO-1057 | Rights follow the active organization | ⏳ Ready for QA | [GEO-1057](https://onclusive.atlassian.net/browse/GEO-1057) | 4 |
| 5 | GEO-1058 | Manage multi-organization membership from the back office | ⏳ Ready for QA | [GEO-1058](https://onclusive.atlassian.net/browse/GEO-1058) | 8 |
| 6 | GEO-1059 | Provision a new user into several organizations | ⏳ Ready for QA | [GEO-1059](https://onclusive.atlassian.net/browse/GEO-1059) | 4 |
| 7 | GEO-1060 | Suspend, reactivate and soft-delete a user account | ⏳ Ready for QA | [GEO-1060](https://onclusive.atlassian.net/browse/GEO-1060) | 5 |
| 8 | GEO-1063 | Organization lifecycle in the back office | ⏳ Ready for QA | [GEO-1063](https://onclusive.atlassian.net/browse/GEO-1063) | 5 |

**Total ACs : 36**

## Acceptance Criteria — Synthèse

### GEO-1054 — A user belongs to multiple organizations
- AC1 : Adding existing user to an org links them (same account, role chosen) — no duplicate
- AC2 : Multi-org user sees only the active organization's data
- AC3 : Role change in one org leaves other orgs unchanged
- AC4 : Removed from one org → retains access to remaining orgs with their roles

### GEO-1055 — Default organization at sign-in
- AC1 : Multi-org user lands in the organization they previously connected to
- AC2 : Single-org user goes straight in
- AC3 : Chosen org is shown and scopes all data and actions

### GEO-1056 — Switch organization without signing out
- AC1 : User switches org without signing out
- AC2 : New context loads immediately with the new org's data only
- AC3 : No data from the previous org remains visible after switch

### GEO-1057 — Rights follow the active organization
- AC1 : Editor capabilities available where user holds editor role (incl. GEO-680 quota)
- AC2 : No editor capabilities where user holds reader role
- AC3 : Rights update immediately on org switch, no sign-out
- AC4 : User lands on an allowed screen if current screen is forbidden in new org

### GEO-1058 — Manage multi-organization membership from the back office
- AC1 : User list shows one row per membership; multi-org users appear once per org
- AC2 : Cross-org search and filter by email, name, role, status
- AC3 : Assign window shows full current membership at a glance
- AC4 : Operator assigns additional orgs with a role chosen per org
- AC5 : Different role can be set per org independently in one assignment
- AC6 : Super admin role shown for every org in assign window; not editable per org
- AC7 : Deselecting an org removes only that membership; others unchanged
- AC8 : Role change from membership row scoped to one org; scope made clear before confirming

### GEO-1059 — Provision a new user into several organizations
- AC1 : Email existence check blocks duplicate accounts; operator directed to manage existing user
- AC2 : Operator selects one or several orgs and chooses role per org
- AC3 : Single welcome email; user accesses all assigned orgs with chosen roles on activation
- AC4 : Quota-reached org refuses addition as defined in GEO-680

### GEO-1060 — Suspend, reactivate and soft-delete a user account
- AC1 : Suspension is account-wide; access paused, memberships/roles/data intact
- AC2 : Reactivation restores all orgs with original roles
- AC3 : Soft-delete moves to a restorable deleted list (not permanent removal)
- AC4 : Restore from deleted list makes account usable again (restored as UNASSIGNED)
- AC5 : Suspended/deleted status visible and filterable in back office user list

### GEO-1063 — Organization lifecycle in the back office
- AC1 : Organisations tab lists all orgs (name, quota usage, creation date, status); searchable and filterable
- AC2 : Create org with name, customer number, quotas, AI Engine providers
- AC3 : Edit org; lowering user quota warns but never removes existing users
- AC4 : Suspend org → members lose access, collections stop; reactivate restores both
- AC5 : Soft-delete with type-to-confirm safeguard; org moved to deleted list, not permanently removed
