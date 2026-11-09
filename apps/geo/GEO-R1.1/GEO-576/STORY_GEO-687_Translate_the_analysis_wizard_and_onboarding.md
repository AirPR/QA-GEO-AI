# GEO-687: [25.4] Translate the analysis wizard and onboarding

**Story:** GEO-687
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-576
**Cree:** 2026-06-18
**Jira:** https://onclusive.atlassian.net/browse/GEO-687

## User Story
As a GEO user with a supported language active, I want the analysis wizard and onboarding (its steps, fields, guidance, and screens) to appear in that language, so that I can configure and launch an analysis end-to-end in my own language.

## Acceptance Criteria
1. **Given** a supported language is active, **When** I use the analysis wizard, **Then** its steps, fields, and guidance appear in that language.

2. **Given** a supported language is active, **When** I go through onboarding, **Then** its screens appear in that language.


> ⚠️ **"Onboarding" = the 4-step analysis wizard (QA, read before testing).** Code investigation 2026-06-18: GEO has **no separate "onboarding" surface** (no `onboarding` namespace, no Onboarding/Welcome component). The PRD names the wizard itself a "4-step onboarding wizard". The `7-3-guided-tour` story (Epic 7) is a **separate, unshipped** feature — out of this Epic's scope. → **AC1 and AC2 target the same surface** (the wizard). See PM open question Q1.
> ⚠️ **Step 3 QUESTION TEXT is OUT of scope (QA, read before testing).** The questions shown in Step 3 ("Best {category}?", "Is {entity} a good {category} brand?", competitive questions with [Competitor N]) **do NOT follow the UI language**: they are backend-AI-adapted content (`POST /questions/adapt-batch`), keyed on the **analysed market language**. This matches the Epic's "Out of scope" (analysis-content translation). → **Do not fail the story** because a question's text is not in the UI language. Only the **wizard chrome** (labels, buttons, headers, guidance, info banners, states) follows the active language.
> ⚠️ **V1 reachability (QA, read before testing):** only en-US (default) and fr-FR are reachable via Auth0 in V1. **es-ES is not user-selectable until story 25.2** (backend currently normalizes `es → en`). **en-GB is never auto-activated in V1** (V2 dropdown only). → Test AC1/AC2 in **fr-FR**; es-ES/en-GB are covered by the technical AC (forced locale) until 25.2.
> ⚠️ **Known es-ES limitation (PM flag):** 3 wizard-scope keys (`wizard.category.quotaExceededByAi`, `wizard.topBar.ariaBack`, `wizard.topBar.newAnalysis`) are absent from the es-ES catalogue and fall back to English. This matches the OS-Team scoping decision (2026-06-18: es-ES EN-fallback acceptable, re-adding to the xlsx = product action) but is in literal tension with AC1. Do not reopen the ticket for these 3 keys until the product action ships.


1. With 25.1 merged (4 locales + fallback chain) and `fr-FR` active, every wizard surface (namespace `wizard.*`: steps, brand/market, category discovery, prompts, review, LLM toggles, modals, empty/loading states) renders via `t()` in French — zero residual hardcoded strings.

2. `pnpm lint:i18n` (eslint-plugin-i18next `no-literal-string`, mode `all`) exits 0 on `src/components/wizard/**`; any residual user-facing string is extracted to a `t()` key and added to all 4 locales.

3. A forced-locale render test (`i18next.changeLanguage("es-ES")` / `"en-GB"`) shows wizard surfaces render the requested locale for present keys and fall back cleanly to en-US for absent keys. Includes pluralized keys (`wizard.prompts.count_one`/`count_other`) checked at count 0/1/N per locale (i18next plural rules are locale-specific: fr-FR and es-ES differ from English).

4. The 3 es-ES wizard orphans stay in the explicit allow-list inherited from 25.1 (no new divergence introduced).

5. Any new key added to close a gap exists in all 4 locale files; fr-FR/es-ES values are supplied by the PM/source-of-truth (xlsx) — never invented.

## Technical Details
1. With 25.1 merged (4 locales + fallback chain) and `fr-FR` active, every wizard surface (namespace `wizard.*`: steps, brand/market, category discovery, prompts, review, LLM toggles, modals, empty/loading states) renders via `t()` in French — zero residual hardcoded strings.

2. `pnpm lint:i18n` (eslint-plugin-i18next `no-literal-string`, mode `all`) exits 0 on `src/components/wizard/**`; any residual user-facing string is extracted to a `t()` key and added to all 4 locales.

3. A forced-locale render test (`i18next.changeLanguage("es-ES")` / `"en-GB"`) shows wizard surfaces render the requested locale for present keys and fall back cleanly to en-US for absent keys. Includes pluralized keys (`wizard.prompts.count_one`/`count_other`) checked at count 0/1/N per locale (i18next plural rules are locale-specific: fr-FR and es-ES differ from English).

4. The 3 es-ES wizard orphans stay in the explicit allow-list inherited from 25.1 (no new divergence introduced).

5. Any new key added to close a gap exists in all 4 locale files; fr-FR/es-ES values are supplied by the PM/source-of-truth (xlsx) — never invented.

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-576
- Story: https://onclusive.atlassian.net/browse/GEO-687
