# GEO-683: [25.1] Foundation — i18n 4-locale extension + fallback chain

**Story:** GEO-683
**Statut:** [DONE] Done
**Assigne:** Youssef.AitLaydi
**Epic:** GEO-576
**Cree:** 2026-06-18
**Jira:** https://onclusive.atlassian.net/browse/GEO-683

## User Story
As the GEO frontend platform, I want the i18n layer to support the four languages (en-US, en-GB, fr-FR, es-ES) with a deterministic fallback chain sourced from the user's Auth0 language, so that every other V1 story builds on an accurate locale infrastructure and any not-yet-translated text degrades gracefully to English.

## Acceptance Criteria
1. **Given** a supported language is active, **When** a screen renders text not yet translated in that language, **Then** the text falls back to English (en-US) — never a blank or a missing-key marker (US 1.7).

2. **Given** some text on a screen falls back to English, **When** the screen renders, **Then** the rest of the screen stays in the active language (per-key fallback, not per-screen).

3. **Given** a user whose Auth0 language is one of the four supported, **When** the app loads after auth resolves, **Then** the interface renders in that language.

4. **Given** a user with no usable Auth0 language (absent or unsupported), **When** the app loads, **Then** the interface renders in American English (en-US).



1. `i18n.ts` registers the four locale resources and a fallback chain: en-GB → en-US, fr-FR → en-US, es-ES → en-US, default en-US.

2. `useSyncI18nLanguage.tsx` — `SUPPORTED_LANGUAGES` holds the four codes; `AUTH0_LANG_MAP` is defensive (accepts short + regional codes); unknown → en-US.

3. `types.ts` `Language` enum reflects the four locales; `TranslationKeys` unchanged.

4. `useTranslations.ts` `currentLanguage` type covers the four codes.

5. Catalogue integrity test extended to 4-locale key parity (es-ES orphan allow-list); `fr = en` invariant relaxed.

## Technical Details
1. `i18n.ts` registers the four locale resources and a fallback chain: en-GB → en-US, fr-FR → en-US, es-ES → en-US, default en-US.

2. `useSyncI18nLanguage.tsx` — `SUPPORTED_LANGUAGES` holds the four codes; `AUTH0_LANG_MAP` is defensive (accepts short + regional codes); unknown → en-US.

3. `types.ts` `Language` enum reflects the four locales; `TranslationKeys` unchanged.

4. `useTranslations.ts` `currentLanguage` type covers the four codes.

5. Catalogue integrity test extended to 4-locale key parity (es-ES orphan allow-list); `fr = en` invariant relaxed.

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-576
- Story: https://onclusive.atlassian.net/browse/GEO-683
