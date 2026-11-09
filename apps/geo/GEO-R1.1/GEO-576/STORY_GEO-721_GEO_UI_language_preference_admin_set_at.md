# GEO-721: [25.7] GEO UI language preference — admin-set at user creation

**Story:** GEO-721
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-576
**Cree:** 2026-06-19
**Jira:** https://onclusive.atlassian.net/browse/GEO-721

## User Story
As an org administrator creating a GEO user, I want to set the user's **GEO interface language** at creation — editable even when the user already exists in Auth0 — stored **only on the GEO side** without writing back to Auth0, so that the user lands in GEO in the chosen language and the **QA team can exercise all four i18n locales from administration**, without affecting the user's language in the other Onclusive apps.

## Acceptance Criteria
1. **Given** the user-creation wizard, **When** the language dropdown is shown, **Then** it offers the four languages (American English, British English, French, Spanish) and is **editable in all cases** — including when the user already exists in Auth0.

2. **Given** an admin selects a language and creates the user, **When** that user logs into GEO, **Then** the whole interface (navigation, labels, wizard, dashboards, administration) renders in the selected language.

3. **Given** a user who already exists in Auth0, **When** the admin sets/changes the GEO language at creation, **Then** that language is **NOT propagated to Auth0** — the user's language in the other Onclusive apps is unchanged.

4. **Given** no language is chosen (or none is available from Auth0), **When** the user is created, **Then** the GEO language defaults to American English (en-US).

5. **(QA)** **Given** the QA team creates one test user per language (en-US, en-GB, fr-FR, es-ES) from administration, **When** each logs in, **Then** each sees the full platform in that language — **including en-GB and es-ES**, independently of Auth0/Middleware limitations.



1. New **nullable** column `users.ui_language_preference` (GEO locale); Flyway migration + MPD + `database_schema.md` updated. `users.language` unchanged (Auth0 cache, Pattern A intact). **[SUPERSÉDÉ par GEO-812]** — `ui_language_preference` supprimée, `users.language` devient GEO-owned full locale.

2. `/auth/me` resolves served language as `ui_language_preference ?? map(users.language) ?? "en-US"`. **[SUPERSÉDÉ par GEO-812]** — résolution = `user.getLanguage()` directement.

3. Provisioning write-logic: NOT_FOUND → both columns; EXISTS_AUTH0_ONLY → `ui_language_preference` only, no Auth0/Middleware push. **[SUPERSÉDÉ par GEO-812]** — write-path unifié vers `users.language` unique.

4. `ProvisioningWizard` dropdown: remove `disabled={foundOnAuth0}` (always editable); payload carries the chosen GEO locale. _(inchangé)_

5. en-GB / es-ES stored verbatim in `ui_language_preference`. **[SUPERSÉDÉ par GEO-812]** — stockage verbatim dans `users.language` directement.

6. Frontend read path accepts full GEO locale returned by `/auth/me` (en-GB passthrough). _(inchangé)_

7. Multi-tenancy/gating unchanged (provision = `SUPER_ADMIN`). _(inchangé)_

## Technical Details
1. New **nullable** column `users.ui_language_preference` (GEO locale); Flyway migration + MPD + `database_schema.md` updated. `users.language` unchanged (Auth0 cache, Pattern A intact). **[SUPERSÉDÉ par GEO-812]** — `ui_language_preference` supprimée, `users.language` devient GEO-owned full locale.

2. `/auth/me` resolves served language as `ui_language_preference ?? map(users.language) ?? "en-US"`. **[SUPERSÉDÉ par GEO-812]** — résolution = `user.getLanguage()` directement.

3. Provisioning write-logic: NOT_FOUND → both columns; EXISTS_AUTH0_ONLY → `ui_language_preference` only, no Auth0/Middleware push. **[SUPERSÉDÉ par GEO-812]** — write-path unifié vers `users.language` unique.

4. `ProvisioningWizard` dropdown: remove `disabled={foundOnAuth0}` (always editable); payload carries the chosen GEO locale. _(inchangé)_

5. en-GB / es-ES stored verbatim in `ui_language_preference`. **[SUPERSÉDÉ par GEO-812]** — stockage verbatim dans `users.language` directement.

6. Frontend read path accepts full GEO locale returned by `/auth/me` (en-GB passthrough). _(inchangé)_

7. Multi-tenancy/gating unchanged (provision = `SUPER_ADMIN`). _(inchangé)_

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-576
- Story: https://onclusive.atlassian.net/browse/GEO-721
