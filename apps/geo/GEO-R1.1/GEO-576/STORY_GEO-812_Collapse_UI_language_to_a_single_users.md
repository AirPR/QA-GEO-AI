# GEO-812: [25.10] Collapse UI language to a single users.language column (technical refactor)

**Story:** GEO-812
**Statut:** [DONE] Done
**Assigne:** Unassigned
**Epic:** GEO-576
**Cree:** 2026-06-23
**Jira:** https://onclusive.atlassian.net/browse/GEO-812

## User Story
**Epic:** GEO-576 (Multi-Language Support) · **Technical refactor** (architect decision, 2026-06-23). **No functional behavior change.**

## Context

## Acceptance Criteria
**None new — functional behavior is unchanged.** The functional ACs of **GEO-684 / GEO-721 / GEO-801 / GEO-802** remain valid verbatim: admin sets the GEO interface language at creation; the user self-switches in Settings; all four locales (incl. en-GB / es-ES) work; the GEO choice is never propagated to Auth0. This ticket is a pure technical refactor of how that behavior is persisted (1 column instead of 2).


1. **Migration (flyway clean, local-only)** — rewrite `V2.0.1__create_users_table.sql`: `language VARCHAR(10) DEFAULT 'en-US' NOT NULL` (was `'en'`), comment block updated to the GEO-owned full-locale semantics; **delete** `V2.5.9__add_users_ui_language_preference.sql`. Local DB reset / `flyway clean` (no backfill, no data preserved — OS-Team decision). MPD + `database_schema.md` updated in the **same** change (invariant: MPD in sync with migrations at all times).

2. **Entity** — remove `User.uiLanguagePreference` (field + getter/setter); `language` default init → `"en-US"`; javadoc updated.

3. **Read-path** — `AuthMeService.resolveServedLanguage(user)` returns `user.getLanguage()` directly (already a full GEO locale); thin defensive guard → `DEFAULT_GEO_LOCALE` if null/invalid. The `ui_language_preference ?? map(language) ?? en-US` chain is removed.

4. **Self-service write-path** — `AuthMeService.updateOwnUiLanguage(uiLanguage)` validates via `GeoUiLocaleSupport.isValidLocale` (400 otherwise) → `user.setLanguage(uiLanguage)` (verbatim, en-GB/es-ES incl.) → save. Single effective `@Transactional`. **No** Auth0/Middleware call. Self-only (target = principal from JWT).

5. **Provisioning write-path** (`AdminUserService.provision`/`create`) — store the chosen **full GEO locale** directly in `users.language`. For a **NOT_FOUND** Auth0 user, the Middleware/Auth0 seed still **collapses** to the allowlisted short code (`en-GB→en`, etc.) via `GeoUiLocaleSupport.toShortSeed` — now a **transient** transform, not a stored column. For **EXISTS_AUTH0_ONLY**, no Auth0/Middleware push (AC3) — the chosen GEO locale is still stored in `users.language`. `CreateUserRequest.uiLanguagePreference` removed; `language` = full GEO locale.

6. **All seed paths map short→full** — `GeoOidcCallbackHandler` (first-login) and the GUM webhook (`GumEventHandler`) must write the **full GEO locale** (`GeoUiLocaleSupport.servedLocale` mapping) so the column never becomes heterogeneous (it is served verbatim by `/auth/me`).

7. `GeoUiLocaleSupport` — kept as the single backend locale source. Usages shift: `servedLocale` now used at **seed** time (short→full), no longer in the `/auth/me` read-path; `toShortSeed` (Middleware collapse) + `normaliseAuth0ToShort` (wizard preselect read-path) + `emailLocale` (defensive, en-GB→en) unchanged.

8. **Frontend** — no behavior change: `SettingsView` reads `user.language` (now the full locale directly); `resolveSupportedLanguage` / `AUTH0_LANG_MAP` kept (defensive); `ProvisioningWizard` payload = full GEO locale; remove `uiLanguagePreference` from `backoffice/api/types.ts`.

9. **Tests** — rewrite assertions targeting `ui_language_preference` → `users.language` (`AdminUserServiceLanguageTest`, `AuthMeServiceTest`); keep `AuthControllerTest` HTTP contract, `useUpdateUiLanguage.test.ts`, `SettingsView.test.tsx`, `ProvisioningWizard.test`. `mvn verify` + `pnpm check`/`lint:i18n` green.

10. **Docs (source of truth)** — `architecture.md`: replace the _GEO UI language override_ 2-column section with the single-column model and **remove** the documented deviation. MPD + `database_schema.md`: drop `ui_language_preference`, update `language` semantics.

## Technical Details
1. **Migration (flyway clean, local-only)** — rewrite `V2.0.1__create_users_table.sql`: `language VARCHAR(10) DEFAULT 'en-US' NOT NULL` (was `'en'`), comment block updated to the GEO-owned full-locale semantics; **delete** `V2.5.9__add_users_ui_language_preference.sql`. Local DB reset / `flyway clean` (no backfill, no data preserved — OS-Team decision). MPD + `database_schema.md` updated in the **same** change (invariant: MPD in sync with migrations at all times).

2. **Entity** — remove `User.uiLanguagePreference` (field + getter/setter); `language` default init → `"en-US"`; javadoc updated.

3. **Read-path** — `AuthMeService.resolveServedLanguage(user)` returns `user.getLanguage()` directly (already a full GEO locale); thin defensive guard → `DEFAULT_GEO_LOCALE` if null/invalid. The `ui_language_preference ?? map(language) ?? en-US` chain is removed.

4. **Self-service write-path** — `AuthMeService.updateOwnUiLanguage(uiLanguage)` validates via `GeoUiLocaleSupport.isValidLocale` (400 otherwise) → `user.setLanguage(uiLanguage)` (verbatim, en-GB/es-ES incl.) → save. Single effective `@Transactional`. **No** Auth0/Middleware call. Self-only (target = principal from JWT).

5. **Provisioning write-path** (`AdminUserService.provision`/`create`) — store the chosen **full GEO locale** directly in `users.language`. For a **NOT_FOUND** Auth0 user, the Middleware/Auth0 seed still **collapses** to the allowlisted short code (`en-GB→en`, etc.) via `GeoUiLocaleSupport.toShortSeed` — now a **transient** transform, not a stored column. For **EXISTS_AUTH0_ONLY**, no Auth0/Middleware push (AC3) — the chosen GEO locale is still stored in `users.language`. `CreateUserRequest.uiLanguagePreference` removed; `language` = full GEO locale.

6. **All seed paths map short→full** — `GeoOidcCallbackHandler` (first-login) and the GUM webhook (`GumEventHandler`) must write the **full GEO locale** (`GeoUiLocaleSupport.servedLocale` mapping) so the column never becomes heterogeneous (it is served verbatim by `/auth/me`).

7. `GeoUiLocaleSupport` — kept as the single backend locale source. Usages shift: `servedLocale` now used at **seed** time (short→full), no longer in the `/auth/me` read-path; `toShortSeed` (Middleware collapse) + `normaliseAuth0ToShort` (wizard preselect read-path) + `emailLocale` (defensive, en-GB→en) unchanged.

8. **Frontend** — no behavior change: `SettingsView` reads `user.language` (now the full locale directly); `resolveSupportedLanguage` / `AUTH0_LANG_MAP` kept (defensive); `ProvisioningWizard` payload = full GEO locale; remove `uiLanguagePreference` from `backoffice/api/types.ts`.

9. **Tests** — rewrite assertions targeting `ui_language_preference` → `users.language` (`AdminUserServiceLanguageTest`, `AuthMeServiceTest`); keep `AuthControllerTest` HTTP contract, `useUpdateUiLanguage.test.ts`, `SettingsView.test.tsx`, `ProvisioningWizard.test`. `mvn verify` + `pnpm check`/`lint:i18n` green.

10. **Docs (source of truth)** — `architecture.md`: replace the _GEO UI language override_ 2-column section with the single-column model and **remove** the documented deviation. MPD + `database_schema.md`: drop `ui_language_preference`, update `language` semantics.

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-576
- Story: https://onclusive.atlassian.net/browse/GEO-812
