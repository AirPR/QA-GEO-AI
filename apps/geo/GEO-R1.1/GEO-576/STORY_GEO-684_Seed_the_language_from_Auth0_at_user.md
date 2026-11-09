# GEO-684: [25.2] Seed the language from Auth0 at user creation

**Story:** GEO-684
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-576
**Cree:** 2026-06-18
**Jira:** https://onclusive.atlassian.net/browse/GEO-684

## User Story
As an org administrator provisioning a new GEO user, I want the new user's interface language to be pre-selected from their Auth0 language (and editable among the supported languages, defaulting to English when none is usable), so that users land in GEO already in the right language without me re-keying it, while GEO stays a write-through cache of Auth0 (no GEO-local override in V1).

## Acceptance Criteria
1. **Given** a language is set for a user in Auth0, **When** that user is added to GEO via the provisioning wizard, **Then** that language is retrieved and pre-selected as the default in the language choice on the user creation step.

2. **Given** the Auth0 language is pre-selected during user creation, **When** I am adding the user, **Then** I can change it to any of the four supported languages (American English, British English, French, Spanish) before confirming.

3. **Given** no usable language is available from Auth0 (absent or unsupported), **When** the user is added, **Then** the language choice defaults to English (en-US).

4. **Given** an existing Auth0 user whose language is French or Spanish, **When** I look them up in the wizard (step 1 → step 2), **Then** the pre-selected value reflects their actual Auth0 language (French → French, Spanish → Spanish) — not a silent fallback to English.



1. `AdminUserService.VALID_LANGUAGES` accepts the V1 short codes `{en, fr, es}` (adds `es`); any value outside → `ValidationException("INVALID_LANGUAGE: supported values are en, fr, es")`.

2. `MiddlewareClient.MIDDLEWARE_LANG_CODES` maps `en → "en"`, `fr → "fr-FR"`, `es → "es"` (exact values from the case-sensitive Middleware allowlist `zh-CN,fr-FR,es,it,de,en`).

3. The Auth0 read path (`searchAuth0ByEmail`) accepts both short and regional codes produced by our own write path and returns the GEO short code (`fr-FR|fr → fr`, `es-ES|es → es`, `en-US|en-GB|en → en`); anything else → `null`. (Fixes the existing write/read asymmetry — required for AC1/AC4.)

4. The provisioning wizard dropdown (`prov-lang`) offers the four languages; `ProvisionUserPayload.language` covers the emitted codes (`en | fr | es`); `data-testid="prov-lang"` preserved.

5. The seed contract stays **Pattern A** (write-through Auth0 cache): `users.language` stores the resolved short code (`en`/`fr`/`es`). **[SUPERSÉDÉ par GEO-812]** — `users.language` sera une locale GEO complète (`en-US|en-GB|fr-FR|es-ES`). Voir GEO-812.

6. Multi-tenancy: `POST /api/v1/admin/users/provision` and `GET /api/v1/admin/users/search/auth0` stay `@PreAuthorize`-gated at backoffice level.

## Technical Details
1. `AdminUserService.VALID_LANGUAGES` accepts the V1 short codes `{en, fr, es}` (adds `es`); any value outside → `ValidationException("INVALID_LANGUAGE: supported values are en, fr, es")`.

2. `MiddlewareClient.MIDDLEWARE_LANG_CODES` maps `en → "en"`, `fr → "fr-FR"`, `es → "es"` (exact values from the case-sensitive Middleware allowlist `zh-CN,fr-FR,es,it,de,en`).

3. The Auth0 read path (`searchAuth0ByEmail`) accepts both short and regional codes produced by our own write path and returns the GEO short code (`fr-FR|fr → fr`, `es-ES|es → es`, `en-US|en-GB|en → en`); anything else → `null`. (Fixes the existing write/read asymmetry — required for AC1/AC4.)

4. The provisioning wizard dropdown (`prov-lang`) offers the four languages; `ProvisionUserPayload.language` covers the emitted codes (`en | fr | es`); `data-testid="prov-lang"` preserved.

5. The seed contract stays **Pattern A** (write-through Auth0 cache): `users.language` stores the resolved short code (`en`/`fr`/`es`). **[SUPERSÉDÉ par GEO-812]** — `users.language` sera une locale GEO complète (`en-US|en-GB|fr-FR|es-ES`). Voir GEO-812.

6. Multi-tenancy: `POST /api/v1/admin/users/provision` and `GET /api/v1/admin/users/search/auth0` stay `@PreAuthorize`-gated at backoffice level.

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-576
- Story: https://onclusive.atlassian.net/browse/GEO-684
