# User Administration improvements — organization config defaults, LLM allow-list, user editing & super-admin

**Epic ID:** GEO-397
**Statut:** 🟨 Ready for QA
**Assigné à:** Youssef.AitLaydi
**Créée le:** 2026-05-11
**Mise à jour:** 2026-05-19
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-397

---

## Description / Functional Need

Tighten the User Administration backoffice so internal admins can configure organizations, manage users, and grant super-admin rights without leaving the UI. Removes obsolete fields, fixes defaults that no longer reflect product reality, and adds missing user lifecycle operations.

---

## Scope

### 1) Set the Brand Image questions to 20 by default
- Default value for the Brand Image questions count on an organization is 20.
- Existing organizations keep their current value; the new default applies only to newly created organizations and to the field default on the create-organization form.

### 2) Remove the Frequency field
- Drop the Frequency field from the organization creation/edit form.
- Drop it from the read view as well — it is no longer used by the product (scheduling is handled elsewhere).

### 3) Remove the "Competitors / category (auto-detected)" field
- Drop this field from the organization creation/edit form. Competitor auto-detection runs at report time and is not configured per organization.

### 4) Rename "Brand x Markets max" to "Markets"
- Field label updated to "Markets" on create, edit, and read views.
- Tooltip / helper text updated to match the new wording.

### 5) Replace "LLMs Max" with an LLM allow-list (checkboxes)
- Replace the numeric "LLMs Max" field with a set of checkboxes — one per available LLM (ChatGPT, Gemini, Grok, Claude, Perplexity).
- Each organization stores the explicit allow-list of LLMs they are entitled to use, not just a count.
- When users in that organization run an analysis, the LLM picker is constrained to the allow-list.

### 6) Allow modification of existing users
- Provide an Edit action on an existing user row.
- Editable fields at minimum: name, organization membership, super-admin flag (see item 7).
- Confirm the change is persisted and reflected on the user's next login.

### 7) Allow setting / unsetting Super-admin at user creation and modification
- "Super admin" can be selected in the role dropdown in create-user and edit-user forms.
- Selecting/unselecting it grants or revokes super-admin rights on save.
- Audit trail captures who granted/revoked super-admin and when.

### 8) Enforce READER role restrictions in GEO
- The READER role already exists at the platform level — this EPIC ensures GEO honours it correctly.
- When a user with the READER role accesses GEO, the "New analysis" button is greyed out and not clickable (disabled state with tooltip explaining why).
- Any other report-creation entry points (e.g. duplicate report, run on-demand, scheduled analysis triggers) are similarly disabled for readers.
- Readers can still view all existing reports and dashboards in their organization with no data restriction.
- Non-reader users keep their current full CRUD behaviour; only the disable rules above are added.

---

## Out of Scope

- No change to authentication / SSO setup.
- No change to org-level branding / theming.
- No additional customer-facing roles beyond READER and the existing default (full CRUD) in V1.

---

## Stories Associées

Aucune story associée à ce jour.

---

## Acceptance Criteria — Epic Level

**AC1 — New organization form**
- **Given** a super admin creates a new organization
- **When** they open the form
- **Then** the Brand Image questions field defaults to 20, the Frequency and "Competitors / category (auto-detected)" fields are absent, the "Brand x Markets max" label reads "Markets", and the LLMs configuration is a checkbox allow-list (not a numeric max)

**AC2 — Edit existing organization**
- **Given** a super admin edits an existing organization
- **When** they save changes
- **Then** the new defaults and field set apply consistently; legacy LLMs-Max values are migrated to a pre-checked allow-list reflecting the previous count under the canonical LLM order

**AC3 — Edit existing user**
- **Given** a super admin opens the users page
- **When** they click Edit on a user row
- **Then** they can update the user's editable fields including Super admin being available in the role dropdown and the change persists

**AC4 — Create user with Super admin role**
- **Given** a super admin creates a new user
- **When** they select the Super admin role in the dropdown
- **Then** the user is granted super-admin rights without a separate ticket

**AC5 — Audit trail for super-admin changes**
- **Given** super-admin grants/revokes are performed via the UI
- **When** audited
- **Then** an audit log captures the actor, target, action (grant/revoke), and timestamp

**AC6 — READER role: new analysis button disabled**
- **Given** a user with the READER role logs into GEO
- **When** the app loads
- **Then** the "New analysis" button is rendered in a disabled/greyed-out state, is not clickable, and shows a tooltip explaining the restriction

**AC7 — READER role: full read access to existing reports**
- **Given** a reader
- **When** they open any existing report
- **Then** all sections (Overview, categories, AI Citation Sources, etc.) load with the full data their organization has access to — no data is hidden by the role

**AC8 — READER role: all creation entry points blocked**
- **Given** a reader
- **When** they attempt any report-creation entry point (duplicate, on-demand run, scheduled trigger)
- **Then** the action is blocked client-side via disabled controls and server-side rejects the request if bypassed

---

## Liens

- Jira Epic : https://onclusive.atlassian.net/browse/GEO-397
- Projet GEO : https://onclusive.atlassian.net/browse/GEO
