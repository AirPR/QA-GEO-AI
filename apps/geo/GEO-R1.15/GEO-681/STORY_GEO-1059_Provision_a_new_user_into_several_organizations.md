# GEO-1059 — Provision a new user into several organizations

**Epic:** [GEO-681](https://onclusive.atlassian.net/browse/GEO-681) — Multi-Organization Membership
**Status:** ⏳ Ready for QA
**Assignee:** Abdenasser Aroukhsiss
**Jira:** https://onclusive.atlassian.net/browse/GEO-1059

## User Story

> As an internal Onclusive operator, I want to provision a new user into one or several organizations with a role chosen for each, so that agency and internal users are set up correctly from the start with a single account.

## Acceptance Criteria

**AC1 — Email existence check blocks duplicates**
- Given: the operator provisions a new user
- When: they enter the email address
- Then: the system checks whether an account with that email already exists before proceeding, and if it does the operator is prevented from creating a duplicate account and directed to manage the existing user's memberships instead

**AC2 — Several orgs, role per org**
- Given: the operator provisions a new user
- When: they reach the organization step
- Then: they can select one or several organizations and choose the role the user gets in each selected organization

**AC3 — Single welcome email, all orgs accessible**
- Given: the operator confirms the provisioning
- When: the account is created
- Then: the user receives a single welcome email and, once activated, can access every organization they were given with the role chosen for each

**AC4 — Quota refusal per org**
- Given: a selected organization has reached its user quota
- When: the operator tries to provision a user into it
- Then: adding the user to that organization is refused as defined in GEO-680 (EPIC-029)

## Technical Notes

- Design: 4-step wizard (Email → Identity → Organisation → Review & submit), frames 5.1–5.8.
- Suspended orgs shown greyed and unselectable; email-exists error state; quota-reached refused state.
- All-or-nothing provisioning: if one selected org is at quota at submit time, nothing is created.

## Liens

- Spec complète : epic-35/35-6-provision-a-new-user-into-several-organizations.md
- Epic : [GEO-681](https://onclusive.atlassian.net/browse/GEO-681)
- Dépend de : [GEO-680](https://onclusive.atlassian.net/browse/GEO-680)
