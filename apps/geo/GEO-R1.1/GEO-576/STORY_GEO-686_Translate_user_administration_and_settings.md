# GEO-686: [25.5] Translate user administration and settings

**Story:** GEO-686
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-576
**Cree:** 2026-06-18
**Jira:** https://onclusive.atlassian.net/browse/GEO-686

## User Story
As a GEO administrator (or user) with a supported language active, I want the user administration screens (backoffice: users, organisations, provisioning, role/org modals, quotas) and my settings screen to appear in that language, so that account and configuration tasks are as clear as the rest of the app.

## Acceptance Criteria
1. **Given** a supported language is active, **When** I use user administration, **Then** those screens appear in that language.

2. **Given** a supported language is active, **When** I use my settings, **Then** those screens appear in that language.


> ⚠️ **V1 reachability (QA, read before testing):** only en-US (default) and fr-FR are reachable via Auth0 in V1. **es-ES is not user-selectable until story 25.2** (backend currently normalizes `es → en`). **en-GB is never auto-activated in V1** (V2 dropdown only). → Test AC1/AC2 in **fr-FR**; es-ES/en-GB are covered by the technical AC (forced locale) until 25.2.
> ⚠️ **Tighter reachability (specific to this story):** the administration screens are **gated to ADMIN/SUPER_ADMIN** (`RequireBackofficeAccess`). The fr-FR functional test therefore requires an **admin/super-admin account whose Auth0 language is** `fr` — not just any fr user. This tightens the 25.2 soft-dep further: that admin's language is seeded by the same Auth0 path 25.2 fixes.
> ✅ **No orphans in this scope.** Unlike 25.3 (23 es-ES core orphans), the 25.5 scope (`backoffice.*` + `views.settings.*`) is **complete in all 4 languages** — verified by parity script 2026-06-18: `backoffice` = 198/198 keys across en-US/en-GB/fr-FR/es-ES, `views.settings` = 2/2. The 26 known es-ES orphans are all in `dashboard.*`/`views.*`/`wizard.*` (25.3/25.4), none here. → No AC1/AC2 tension, no orphan allow-list to manage.


1. With 25.1 merged (4 locales + fallback chain) and `fr-FR` active, every administration & settings surface (full `backoffice.*` namespace + `views.settings.*`) renders via `t()`/`<Trans>` in French — zero residual hardcoded strings.

2. `pnpm lint:i18n` (eslint-plugin-i18next `no-literal-string`, mode `all`, scope `src/**/*.{ts,tsx}`) exits 0 on `src/backoffice/**` and `src/views/SettingsView.tsx`; any residual user-facing string is extracted to a `t()` key and added to all 4 locales (fr-FR/es-ES values supplied by the PM — never invented).

3. A forced-locale render test (`i18next.changeLanguage("es-ES")` / `"en-GB"`) shows representative backoffice/settings surfaces render the requested locale for present keys (all present in this scope) and fall back cleanly to en-US — verifying es-ES/en-GB independently of Auth0 inaccessibility in V1.

4. The parity test (25.1) keeps `backoffice.*` + `views.settings.*` at strict parity across the 4 locales (0 missing keys); this story introduces no new divergence or orphan.

5. Any new key added to close a gap exists in all 4 locale files; fr-FR/es-ES values are supplied by the PM/source-of-truth (xlsx) — never invented.

## Technical Details
1. With 25.1 merged (4 locales + fallback chain) and `fr-FR` active, every administration & settings surface (full `backoffice.*` namespace + `views.settings.*`) renders via `t()`/`<Trans>` in French — zero residual hardcoded strings.

2. `pnpm lint:i18n` (eslint-plugin-i18next `no-literal-string`, mode `all`, scope `src/**/*.{ts,tsx}`) exits 0 on `src/backoffice/**` and `src/views/SettingsView.tsx`; any residual user-facing string is extracted to a `t()` key and added to all 4 locales (fr-FR/es-ES values supplied by the PM — never invented).

3. A forced-locale render test (`i18next.changeLanguage("es-ES")` / `"en-GB"`) shows representative backoffice/settings surfaces render the requested locale for present keys (all present in this scope) and fall back cleanly to en-US — verifying es-ES/en-GB independently of Auth0 inaccessibility in V1.

4. The parity test (25.1) keeps `backoffice.*` + `views.settings.*` at strict parity across the 4 locales (0 missing keys); this story introduces no new divergence or orphan.

5. Any new key added to close a gap exists in all 4 locale files; fr-FR/es-ES values are supplied by the PM/source-of-truth (xlsx) — never invented.

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-576
- Story: https://onclusive.atlassian.net/browse/GEO-686
