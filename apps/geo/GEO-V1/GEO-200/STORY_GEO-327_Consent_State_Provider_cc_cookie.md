# Story 17.1: Consent State Provider + cc_cookie persistence

**Story ID:** GEO-327
**Titre:** Story 17.1 — Consent State Provider + cc_cookie persistence (Zustand store + vanilla-cookieconsent integration)
**Statut:** ✅ Done
**Assigne a:** Youssef.AitLaydi
**Epic:** GEO-200 (Cookie Consent for Hubspot/PQL)
**Creee le:** 2026-04-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-327

## Context

Following the cookie domain clarification, GEO writes its consent cookie scoped to `geo.onclusive.com` (prod) / `staging-geo.onclusive.com` (staging). Cross-subdomain sharing with 360 / Review is not technically possible at this scope. Story has been simplified — the original "hybrid read chain" and "dual cookie write" (formerly Story 17.5 / GEO-331) are absorbed here.

## User Story

As a **GEO frontend engineer**,
I want **a Zustand store that mirrors the user's `cc_cookie` consent state and a `vanilla-cookieconsent` v3 integration that persists changes back to the cookie**,
So that **GEO has a single typed consent API consumed by all dependent epics (GEO-243 Intercom, GEO-244 FullStory, future HubSpot epic), with consent changes durably stored on `geo.onclusive.com` for 180 days**.

## Out of Scope

- Banner UI (-> 17.2)
- Preferences modal UI (-> 17.3)
- Cookie inventory rows (-> 17.4)
- i18n strings (-> 17.5)
- Cross-subdomain sharing with 360 / Review (technically impossible at `geo.onclusive.com` scope)

## Acceptance Criteria

**AC1 — Boot avec `cc_cookie` deja present**
**Given** a user lands on GEO with `cc_cookie` already set on `geo.onclusive.com`
**When** the GEO app boots
**Then** `useCookieConsentStore` exposes `hasRespondedToConsent === true`, `areAnalyticsCookiesEnabled` and `areFunctionalCookiesEnabled` reflecting the parsed cookie payload, and **no banner** is shown (le store flag `shouldShowBanner === false`).

**AC2 — Boot sans `cc_cookie`**
**Given** a user lands on GEO with no `cc_cookie`
**When** the GEO app boots
**Then** `hasRespondedToConsent === false`, `shouldShowBanner === true`. Le rendu effectif de la banniere est porte par Story 17.2 — 17.1 expose uniquement le flag.

**AC3 — Commit consent (Accept all / Essential only / Save Preferences)**
**Given** a user clicks "Accept all" / "Essential only" / saves Preferences (banner ou modal)
**When** the choice is committed
**Then** `cc_cookie` est ecrit par `vanilla-cookieconsent` v3 avec : `domain = current host` (auto-detecte), `sameSite=lax`, `secure=true` en prod/staging, TTL = 180 jours, payload conforme au format natif vanilla-cookieconsent v3 avec categories `necessary` (always true), `analytics`, `functional_support`. Le store est mis a jour synchronement (subscribers notifies au prochain render).

**AC4 — Modification preferences depuis le store**
**Given** the user changes preferences from the GEO modal (Story 17.3)
**When** Save is clicked et `savePreferences({analytics, functional})` est appelee sur le store
**Then** le cookie est mis a jour synchronement via l'API lib, le `BroadcastChannel('geo-consent')` est notifie pour cross-tab sync, tous les subscribers de `useCookieConsentStore` recoivent le nouvel etat.

**AC5 — Cross-tab sync**
**Given** a user has consent stored on GEO et plusieurs tabs GEO ouvertes
**When** une autre tab met a jour le cookie de consentement via le `BroadcastChannel('geo-consent')` message OU le poller fallback (interval 1s) detecte un changement de cookie
**Then** le store GEO se rehydrate au prochain render et tous les subscribers recoivent le nouvel etat (sans recharger la page).

**AC6 — Cookie payload malformes / version-mismatch**
**Given** a malformed or version-mismatched cookie payload (JSON corrompu, structure inattendue, version future)
**When** le parser de la lib echoue OU le store detecte un payload incoherent
**Then** le store traite l'utilisateur comme "not yet consented" (`hasRespondedToConsent === false`, `shouldShowBanner === true`) — sans throw, sans casser le boot de l'app, avec un `console.warn` dev-only.
**Et** le cookie corrompu est purge (delete + re-trigger banner) afin que la premiere interaction ecrive un payload propre.

**AC7 — Dev mode fixture seeding**
**Given** un developpeur en `localhost` (Vite `import.meta.env.DEV === true`)
**When** un flag dev (`VITE_GEO_CONSENT_FIXTURE`) est positionne dans `.env.local`
**Then** le store peut etre seede depuis une fixture (objet `{analytics, functional}`) sans cookie reel — utilisable pour developper 17.2/17.3 sans avoir a re-cliquer la banniere a chaque reload. Tree-shaking strict en build prod (verifie).

## Dependencies

- **None** — foundation story for Epic 17.
- **Blocks:** 17.2, 17.3, 17.4 (and indirectly 17.5 i18n).

## Technical Details

- Reference impl: `AirPR/onclusive-core-client:store/cookieConsentStore.ts` (360, Vue/Pinia — port to React/Zustand patterns)
- Reference config: `AirPR/KMPLUS:Kantar.Web.Frontend.Spa/src/cookieconsent.config.js` (Review, vanilla-cookieconsent v3)
- Library: [vanilla-cookieconsent v3](https://cookieconsent.orestbida.com/)
- ADR: `docs/planning-artifacts/epics.md` section Epic 17 architectural decisions

## Definition of Done

- [ ] Zustand store `useCookieConsentStore` created with typed API
- [ ] `cc_cookie` written/read via vanilla-cookieconsent v3 integration
- [ ] All 7 ACs verified via unit tests
- [ ] Cross-tab sync via BroadcastChannel tested
- [ ] Dev mode fixture seeding implemented (tree-shaken in prod)

## Liens

- Epic parent: https://onclusive.atlassian.net/browse/GEO-200
- Story Jira: https://onclusive.atlassian.net/browse/GEO-327
- Spec externe: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-17/17-1-consent-state-provider-cc-cookie.md
