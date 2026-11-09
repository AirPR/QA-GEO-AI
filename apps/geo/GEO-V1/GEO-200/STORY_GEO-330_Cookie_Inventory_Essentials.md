# Story 17.4: Cookie Inventory & Essentials Documentation

**Story ID:** GEO-330
**Titre:** Story 17.4 — Cookie Inventory & Essentials Documentation (Auth0 SSO, CSRF, cc_cookie + placeholders)
**Statut:** ✅ Done
**Assigne a:** Youssef.AitLaydi
**Epic:** GEO-200 (Cookie Consent for Hubspot/PQL)
**Creee le:** 2026-04-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-330

## User Story

As a **GEO user opening Cookie Settings**,
I want **to see a clear inventory of every cookie GEO sets, grouped by category, with name, provider, and purpose**,
So that **I have informed consent (GDPR requirement) and understand what each cookie does before opting in**.

## Acceptance Criteria

**AC1 — Essential section : 3 rangees reelles (audit code-verifie)**
**Given** the user opens the Cookie Preferences modal
**When** the Essential section est rendue
**Then** le Settings Grid contient exactement 3 rangees correspondant aux cookies reellement ecrits par GEO :

| Cookie | Provider | Purpose |
|--------|----------|---------|
| `APP_TOKEN` | Onclusive (Auth0) | Carries your Auth0 access token to keep you signed in to GEO. Required for every API call. |
| `GEO_OAUTH_REQ` | Onclusive | Holds the temporary OAuth2 state during the Auth0 login redirect. Set just before login, expires within ~10 minutes. |
| `cc_cookie` | Onclusive | Stores your cookie consent preferences for this site, valid for 180 days. |

_Note: Les anciens placeholders `session_id` et `csrf_token` sont incorrects (audit code 2026-05-06). Pas de cookie CSRF distinct — protection via SameSite=Lax + httpOnly._

**AC2 — Functional & Support section : placeholders documentes (Intercom + HubSpot)**
**Given** the user opens the Cookie Preferences modal
**When** the Functional & Support section est rendue
**Then** le Settings Grid contient 3 rangees placeholder marquees badge Inactive (slate-100 bg, slate-600 text) :

| Cookie | Provider | Activated By |
|--------|----------|-------------|
| `intercom-session-*` | Intercom | GEO-243 (Intercom) |
| `intercom-id-*` | Intercom | GEO-243 (Intercom) |
| `hubspot-*` | HubSpot | Future HubSpot epic |

**AC3 — Analytics section : placeholder FullStory documente**
**Given** the user opens the Cookie Preferences modal
**When** the Analytics section est rendue
**Then** le Settings Grid contient 1 rangee placeholder :

| Cookie | Provider | Activated By |
|--------|----------|-------------|
| `fs_uid` | FullStory | GEO-244 (FullStory) |

**AC4 — Empty state remplace**
**Given** Story 17.3 Modal Preferences est en place
**When** Story 17.4 est mergee
**Then** aucune section n'affiche d'empty state — chaque section affiche ses rangees reelles (AC1, AC2, AC3).

**AC5 — Markup HTML semantique accessible**
**Given** le Settings Grid est rendu
**When** une rangee est inspectee
**Then** chaque rangee est un `<tr>` avec 3 `<td>` (Cookie / Provider / Purpose). `<thead>` avec 3 `<th scope="col">`. Hierarchie `<table><thead><tbody>` correcte. Cookie name dans `<code>` (monospace).

**AC6 — i18n placeholder (continuite 17.3 -> 17.5)**
**Given** Story 17.5 (i18n EN/FR) n'est pas encore livree
**When** le Settings Grid est rendu en 17.4
**Then** les strings sont hardcodees EN dans `copy.types.ts` + 4 variants (en.generic, en.intercom, fr.generic, fr.intercom). Marker `// TODO 17.5` present dans CookieSettingsGrid.tsx.

**AC7 — Source unique (single source of truth)**
**Given** un developer aval (GEO-243, GEO-244) doit modifier l'inventaire
**When** il consulte le code
**Then** il trouve une et une seule source : `frontend/src/lib/cookieConsent/cookieInventory.ts`. Le composant `CookieSettingsGrid` consomme cette source via prop `id: SectionId`.

**AC8 — Pas de leak entre categories (TypeScript)**
**Given** le typage TypeScript
**When** on utilise l'inventaire
**Then** le mapping `SectionId -> InventoryKey` est compile statiquement. `Record<SectionId, InventoryKey>` garantit l'exhaustivite.

**AC9 — Wiring "Cookie Settings" link (entree modal hors banner)**
**Given** un user deja consenti (`shouldShowBanner === false`)
**When** il veut re-ouvrir le modal
**Then** un bouton "Cookie Settings" est visible dans `UserMenuDropdown` (aucun `Footer.tsx` n'existe dans GEO). Cliquer appelle `useCookieConsentStore.getState().openPreferences()`. Toujours visible (GDPR withdraw any time).

**AC10 — Tests RTL cibles inventory**
**Given** les tests unitaires
**When** on mount `CookieSettingsGrid` pour chaque categorie
**Then** 17 tests RTL verts (AC1-AC6). 9 tests sanity `cookieInventory.test.ts` verts. Total 26/26.

## Technical Details — Files Modified

| File | Action |
|------|--------|
| `frontend/src/lib/cookieConsent/cookieInventory.ts` | MODIFIE — `inactive?` + `activatedBy?` fields |
| `frontend/src/lib/cookieConsent/copy.types.ts` | MODIFIE — `settingsGrid` + `cookieSettingsLink` |
| `frontend/src/lib/cookieConsent/copy.en.generic.ts` | MODIFIE |
| `frontend/src/lib/cookieConsent/copy.en.intercom.ts` | MODIFIE |
| `frontend/src/lib/cookieConsent/copy.fr.generic.ts` | MODIFIE |
| `frontend/src/lib/cookieConsent/copy.fr.intercom.ts` | MODIFIE |
| `frontend/src/components/cookieConsent/CookieSettingsGrid.tsx` | NOUVEAU |
| `frontend/src/components/cookieConsent/CookieSettingsGrid.test.tsx` | NOUVEAU |
| `frontend/src/components/cookieConsent/CookiePreferencesModal.tsx` | MODIFIE — wiring grid |
| `frontend/src/components/layout/UserMenuDropdown.tsx` | MODIFIE — AC9 |
| `frontend/src/lib/cookieConsent/cookieInventory.test.ts` | NOUVEAU |

## Definition of Done

- [ ] Settings Grid visible in all 3 sections of Cookie Preferences Modal
- [ ] Essential section: exactly 3 real rows (APP_TOKEN, GEO_OAUTH_REQ, cc_cookie)
- [ ] Functional & Support: 3 placeholder rows with Inactive badge
- [ ] Analytics: 1 placeholder row (fs_uid / FullStory)
- [ ] "Cookie Settings" link in UserMenuDropdown (AC9)
- [ ] 26/26 tests green

## Liens

- Epic parent: https://onclusive.atlassian.net/browse/GEO-200
- Story Jira: https://onclusive.atlassian.net/browse/GEO-330
- Spec complète: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-17/17-4-cookie-inventory-essentials.md
