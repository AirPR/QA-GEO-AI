# GEO-1063 — Organization lifecycle in the back office

**Epic:** [GEO-681](https://onclusive.atlassian.net/browse/GEO-681) — Multi-Organization Membership
**Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Jira:** https://onclusive.atlassian.net/browse/GEO-1063

## User Story

> As an internal Onclusive operator, I want to create, edit, suspend and soft-delete organizations from the back office, so that the full organization lifecycle is managed in one place, with a safeguard against accidental deletion.

*OS-Team-authored story — ownership left to the team by PM (comment 826052); attached to GEO-681 because the screens ship with the same back-office redesign (frames 4.x). PM review requested before dev.*

## Acceptance Criteria

**AC1 — Organisations tab lists all organizations**
- Given: the operator opens the Organisations tab of Users & Organisations
- When: the list loads
- Then: it shows every organization with name, customer number, user quota usage (used / max), creation date and status (active / suspended), searchable by name and filterable by status

**AC2 — Create an organization**
- Given: the operator clicks "+ Create organisation"
- When: they fill the form (name, master customer number, quotas including user quota, collection frequency, authorized AI Engine providers) and save
- Then: the organization is created with its quotas and appears in the list

**AC3 — Edit an organization**
- Given: the operator opens Edit on an organization
- When: they change any field and save
- Then: the changes are persisted and reflected in the list (user-quota lowering rule per GEO-680: warned, never removes existing users)

**AC4 — Suspend and reactivate an organization**
- Given: an active organization
- When: the operator suspends it
- Then: its members lose access immediately, all collections stop, and its status shows suspended; reactivating restores access and collections

**AC5 — Soft-delete with type-to-confirm**
- Given: the operator chooses Soft-delete on an organization
- When: the confirmation modal opens
- Then: it warns "Members lose access immediately and all collections stop." and requires typing the organization's name to enable the destructive action; on confirm the organization is soft-deleted (not permanently removed)

## Technical Notes

- Design: frames 4.1–4.7 of "Super Admin · Users & Organisations (1.2)" (list, create/edit modals with full quota form + AI provider toggles, read-only variant, type-to-confirm delete).
- Backend largely exists (`AdminOrganisationController`); main work = frontend alignment + reactivate endpoint + seats column + verify scheduler skips suspended orgs.

## Liens

- Spec complète : epic-35/35-9-organization-lifecycle-in-the-back-office.md
- Epic : [GEO-681](https://onclusive.atlassian.net/browse/GEO-681)
- Dépend de : [GEO-680](https://onclusive.atlassian.net/browse/GEO-680)
