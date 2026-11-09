# GEO-685: [25.3] Translate the core interface

**Story:** GEO-685
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-576
**Cree:** 2026-06-18
**Jira:** https://onclusive.atlassian.net/browse/GEO-685

## User Story
As a GEO user with a supported language active, I want the core interface (navigation, buttons, labels, table headers, tooltips, empty states) to appear in that language and to stay in that language as I move between the views of an analysis, so that I can use GEO end-to-end in my own language.

## Acceptance Criteria
1. **Given** a supported language is active, **When** I navigate the app, **Then** navigation, buttons, labels, table headers, tooltips, and empty states all appear in that language.

2. **Given** a supported language is active, **When** I move between the different views of an analysis, **Then** the interface text stays in that language throughout.


> ⚠️ **V1 reachability (QA, read before testing):** only en-US (default) and fr-FR are reachable via Auth0 in V1. **es-ES is not user-selectable until story 25.2** (backend currently normalizes `es → en`). **en-GB is never auto-activated in V1** (V2 dropdown only). → Test AC1/AC2 in **fr-FR**; es-ES/en-GB are covered by the technical AC (forced locale) until 25.2.
> ⚠️ **Known es-ES limitation (PM flag):** 23 core-scope keys (`dashboard.sov.*`, `dashboard.reportError.*`, `views.addCategory.*`, `views.upsell.seeItInAction*`) are absent from the es-ES catalogue and fall back to English. This matches the OS-Team scoping decision (2026-06-18: es-ES EN-fallback acceptable, re-adding to the xlsx = product action) but is in literal tension with AC1. Do not reopen the ticket for these 23 keys until the product action ships.


1. With 25.1 merged (4 locales + fallback chain) and `fr-FR` active, every core surface (namespaces `common`, `layout`, `status`, `dashboard`, `views`, `actions`, `quota`, `cookieConsent`) renders via `t()` in French — zero residual hardcoded strings.

2. `pnpm lint:i18n` (eslint-plugin-i18next `no-literal-string`, mode `all`) exits 0 on core components; any residual user-facing string is extracted to a `t()` key and added to all 4 locales.

3. A forced-locale render test (`i18next.changeLanguage("es-ES")` / `"en-GB"`) shows core surfaces render the requested locale for present keys and fall back cleanly to en-US for absent keys — verifying es-ES/en-GB independently of Auth0 inaccessibility in V1.

4. The 23 es-ES core orphans stay in the explicit allow-list inherited from 25.1 (no new divergence introduced).

5. Any new key added to close a gap exists in all 4 locale files; fr-FR/es-ES values are supplied by the PM/source-of-truth (xlsx) — never invented.

## Technical Details
1. With 25.1 merged (4 locales + fallback chain) and `fr-FR` active, every core surface (namespaces `common`, `layout`, `status`, `dashboard`, `views`, `actions`, `quota`, `cookieConsent`) renders via `t()` in French — zero residual hardcoded strings.

2. `pnpm lint:i18n` (eslint-plugin-i18next `no-literal-string`, mode `all`) exits 0 on core components; any residual user-facing string is extracted to a `t()` key and added to all 4 locales.

3. A forced-locale render test (`i18next.changeLanguage("es-ES")` / `"en-GB"`) shows core surfaces render the requested locale for present keys and fall back cleanly to en-US for absent keys — verifying es-ES/en-GB independently of Auth0 inaccessibility in V1.

4. The 23 es-ES core orphans stay in the explicit allow-list inherited from 25.1 (no new divergence introduced).

5. Any new key added to close a gap exists in all 4 locale files; fr-FR/es-ES values are supplied by the PM/source-of-truth (xlsx) — never invented.

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-576
- Story: https://onclusive.atlassian.net/browse/GEO-685
