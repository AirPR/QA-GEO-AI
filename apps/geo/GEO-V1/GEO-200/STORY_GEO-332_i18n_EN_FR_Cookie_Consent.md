# Story 17.5b: i18n EN/FR for Cookie Consent

**Story ID:** GEO-332
**Titre:** Story 17.5 — i18n EN/FR for Cookie Consent (import 360 locales, namespace cookieConsent)
**Statut:** ✅ Done
**Assigne a:** Youssef.AitLaydi
**Epic:** GEO-200 (Cookie Consent for Hubspot/PQL)
**Creee le:** 2026-04-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-332

## User Story

As a **GEO user**,
I want **the cookie consent banner, modal and settings to be fully translated in English and French**,
So that **I get the GDPR-required clear and informed consent in my own language, matching the cross-module Onclusive standard**.

## Out of Scope

- ES, DE, IT translations (deferred — V1 is EN/FR only per Epic 13 alignment)
- Other modules' i18n (-> Epic 13)
- JIT modal / Privacy fallback strings (-> GEO-243)

## Dependencies

- **Blocked by:** 17.2 (banner UI), 17.3 (modal UI). Can run in parallel with 17.4.
- **Soft dependency:** Epic 13 Story 13.1 (i18n infrastructure) — done.

## Technical Notes

- Source of truth for copies: `AirPR/onclusive-core-client:locales/en-GB.json` and `fr-FR.json` (namespace `cookieConsent`)
- Format: JSON files under `frontend/src/i18n/locales/{en,fr}.json` (namespace `cookieConsent`)
- **Option A selected** (react-i18next — Epic 13 Story 13.1 `done` at 17.5 start)
- Warning: copies FR are a draft (Sally) — copywriter/legal review required before production merge (RGPD: consent must be clear in the user's language).

## Acceptance Criteria

**AC1 — Langue UI = `en` -> copies anglaises**
**Given** la langue UI courante (`i18n.language` via react-i18next) resout a `"en"`
**When** la banniere de consentement, le modal Cookie Preferences (titre, descriptions, CTAs, sections, badges, en-tetes Settings Grid) sont rendus
**Then** toutes les copies user-facing sont en anglais, sourcees du namespace `cookieConsent` via `useTranslation()` (react-i18next, Option A)

**AC2 — Langue UI = `fr` -> copies francaises**
**Given** la langue UI courante resout a `"fr"`
**When** les surfaces ci-dessus sont rendues
**Then** toutes les copies user-facing sont en francais, sourcees du meme namespace (parite structurelle EN/FR validee par test automatique)

**AC3 — Changement de langue runtime -> mise a jour sans reload**
**Given** un utilisateur a la banniere OU le modal ouvert avec une langue `lang_A`
**When** la langue bascule a `lang_B` via `i18n.changeLanguage()`
**Then** toutes les strings visibles basculent en `lang_B` sans rechargement. La lib v3 recoit `setCookieConsentLanguage(locale)` via `CookieConsentProvider useEffect([i18n.language, isReady])`

**AC5 — Aucune string EN hardcodee residuelle**
**Given** la story est implementee
**When** un grep cible est passe sur les composants/providers
**Then** zero hit sur `COOKIE_CONSENT_COPY_EN.` — toutes remplacees par `t("cookieConsent.*")`. Zero `// TODO 17.5` restant.

**AC6 — Lib `vanilla-cookieconsent` v3 recoit les deux locales**
**Given** la lib v3 est initialisee par `buildCookieConsentConfig()`
**When** la config est construite
**Then** `language.translations` contient `en` ET `fr` (via `buildTranslationBlock(copy)`), `language.default = "en"`

**AC7 — Parite de structure FR <-> EN (test automatique)**
**Given** les JSON `en.json` et `fr.json` exportent le namespace `cookieConsent`
**When** un test de parite compare les structures (deep key paths)
**Then** strictement les memes chemins de cles dans les deux — test casse si une cle est ajoutee EN sans FR

**AC8 — Couverture exhaustive du namespace `cookieConsent`**
**Given** les surfaces livrees par 17.2 / 17.3 / 17.4
**When** la traduction est livree
**Then** toutes les sous-cles (`consentModal.*`, `preferencesModal.*`, `preferencesModal.sections.*`, `preferencesModal.settingsGrid.*`, `cookieSettingsLink`) existent en EN ET FR

**AC10 — Tests jsdom sans `NO_I18NEXT_INSTANCE`**
**Given** les composants appellent `useTranslations()` (react-i18next)
**When** les tests unitaires s'executent
**Then** `import "@/i18n/i18n"` en tete des fichiers de test initialise l'instance globale — 0 erreur `NO_I18NEXT_INSTANCE`, tous les tests passent (Banner 16/16, Modal 32/32, Grid 17/17, Provider 10/10)

## Deployment Notes

Warning D6: Les copies FR sont un draft Sally — review copywriter/legal requise avant merge en production (RGPD : le consentement doit etre clair dans la langue de l'utilisateur).

## Definition of Done

- [ ] All cookie consent text served via react-i18next `t()` calls — zero hardcoded strings
- [ ] EN and FR translations structurally identical (parity test green)
- [ ] Runtime language switch updates all cookie consent strings without reload
- [ ] 75/75 unit tests passing (Banner 16 + Modal 32 + Grid 17 + Provider 10)
- [ ] FR draft reviewed by copywriter/legal before production merge

## Liens

- Epic parent: https://onclusive.atlassian.net/browse/GEO-200
- Story Jira: https://onclusive.atlassian.net/browse/GEO-332
- Spec complète: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-17/17-5-i18n-en-fr-cookie-consent.md
