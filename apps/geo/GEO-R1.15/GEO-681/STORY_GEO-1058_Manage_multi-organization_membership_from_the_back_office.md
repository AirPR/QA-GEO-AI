# GEO-1058 — Manage multi-organization membership from the back office

**Epic:** [GEO-681](https://onclusive.atlassian.net/browse/GEO-681) — Multi-Organization Membership
**Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Jira:** https://onclusive.atlassian.net/browse/GEO-1058

## User Story

> As an internal Onclusive operator, I want to see and manage all the organizations a user belongs to and the role they hold in each from the back office, so that agency and internal users can be set up across customers without duplicate accounts or workarounds.

## Acceptance Criteria

**AC1 — One row per membership**
- Given: the back office user list
- When: it loads
- Then: it shows users across all organizations, and a user who belongs to several organizations appears once per organization membership with the role and status they hold in that organization

**AC2 — Cross-org search and filters**
- Given: the back office user list
- When: the operator searches by email or name or filters by role or status
- Then: the list narrows accordingly across all organizations

**AC3 — Assign window shows full membership**
- Given: the operator opens the assign organizations action on a user
- When: it opens
- Then: all the organizations the user currently belongs to are shown as selected, so the operator sees the user's full membership at a glance

**AC4 — Assign additional orgs with role per org**
- Given: the operator selects one or more additional organizations for a user
- When: they confirm the assignment
- Then: they choose the role the user holds in each newly selected organization before confirming, and the user is linked to each of them under the same account without affecting their existing memberships

**AC5 — Independent role per selected org**
- Given: the operator sets roles during an assignment
- When: several organizations are selected
- Then: a different role can be chosen for each organization independently, for example reader in one organization and editor in another

**AC6 — Super admin exception**
- Given: the user is a super admin
- When: the operator opens the assign organizations action
- Then: the super admin role is displayed for every selected organization and cannot be changed per organization, because super admins hold their role across the whole platform

**AC7 — Deselect removes only that membership**
- Given: the operator deselects an organization the user belonged to and confirms
- When: the change completes
- Then: the user is removed from that organization only and keeps their other memberships with the role they hold in each

**AC8 — Role change scoped to one org, made clear**
- Given: the operator changes a user's role from a membership row
- When: they confirm
- Then: the new role applies only to that organization, their roles in other organizations are unchanged, and the scope of the change is made clear before confirming

## Technical Notes

- Design: section "Super Admin · Users & Organisations (1.2)" (node 11882:36910, Ready for dev) — frames 1.x (list + change role) and 3.x (assign organisations).
- Flagged: frame 6.1 labels the view-only variant "Reader" — per the roles model backoffice view-only belongs to ADMIN; copy fix requested.
- Super admin state of the assign window missing from Figma (noted by PM, tracked in design story).

## Liens

- Spec complète : epic-35/35-5-manage-multi-organization-membership-from-the-back-office.md
- Epic : [GEO-681](https://onclusive.atlassian.net/browse/GEO-681)
