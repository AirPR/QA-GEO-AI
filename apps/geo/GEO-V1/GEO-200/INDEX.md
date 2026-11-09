# INDEX — Epic GEO-200: Cookie Consent for Hubspot/PQL

## Fichiers generes

| # | Fichier | Description | Statut |
|---|---------|-------------|--------|
| 1 | EPIC.md | Vue d'ensemble, scope, AC synthetises, liens | ⏳ Ready for QA |
| 2 | STORY_GEO-327_Consent_State_Provider_cc_cookie.md | Story 17.1 — Zustand ConsentStateProvider, cc_cookie read/write via vanilla-cookieconsent v3, cross-tab sync | Done |
| 3 | STORY_GEO-328_Cookie_Banner_Phase_1.md | Story 17.2 — Cookie banner React wrapper (Option B), 3 CTAs (Accept all / Essential only / Manage preferences) | Done |
| 4 | STORY_GEO-329_Cookie_Preferences_Modal.md | Story 17.3 — Cookie Preferences Modal, per-category toggles, Save/Accept/Cancel flows | Done |
| 5 | STORY_GEO-330_Cookie_Inventory_Essentials.md | Story 17.4 — Cookie Settings Grid, Essential inventory (3 rows), Functional placeholders, "Cookie Settings" link | Done |
| 6 | STORY_GEO-331_Hybrid_Write_Strategy_ABANDONED.md | Story 17.5a — Dual cookie write strategy (ABANDONED — domain scope limitation) | Abandoned |
| 7 | STORY_GEO-332_i18n_EN_FR_Cookie_Consent.md | Story 17.5b — Full EN/FR i18n via react-i18next, namespace cookieConsent | Done |
| 8 | STORY_GEO-333_Help_JIT_Bridge_Modal.md | Story 17.6 — JIT Bridge Modal "Ready to chat?", consent gating for Help/Chat | Done |
| 9 | STORY_GEO-334_Privacy_Fallback_Modal.md | Story 17.7 — Privacy Fallback Modal "Your privacy is respected", GDPR no-consent-wall | Done |
| 10 | STORY_GEO-237_Hubspot_PQL_Feedback.md | HubSpot PQL upsell tracking, SeeItInActionModal, consent gating, 14 ACs | QA In Progress |
| 11 | STORY_GEO-427_Upsell_Page_Content_Refresh.md | Upsell page Figma V2 alignment, 5->3 showcases, new feature cards | Done |
| 12 | README.md | Project overview and story table | — |
| 13 | INDEX.md | This file | — |
| 14 | epic-data.json | Structured JSON data for all stories | — |

## Liens Jira

- Epic: https://onclusive.atlassian.net/browse/GEO-200
- GEO-327 (Story 17.1): https://onclusive.atlassian.net/browse/GEO-327
- GEO-328 (Story 17.2): https://onclusive.atlassian.net/browse/GEO-328
- GEO-329 (Story 17.3): https://onclusive.atlassian.net/browse/GEO-329
- GEO-330 (Story 17.4): https://onclusive.atlassian.net/browse/GEO-330
- GEO-331 (Story 17.5a - Abandoned): https://onclusive.atlassian.net/browse/GEO-331
- GEO-332 (Story 17.5b): https://onclusive.atlassian.net/browse/GEO-332
- GEO-333 (Story 17.6): https://onclusive.atlassian.net/browse/GEO-333
- GEO-334 (Story 17.7): https://onclusive.atlassian.net/browse/GEO-334
- GEO-237 (HubSpot PQL): https://onclusive.atlassian.net/browse/GEO-237
- GEO-427 (Upsell refresh): https://onclusive.atlassian.net/browse/GEO-427
- Projet GEO: https://onclusive.atlassian.net/browse/GEO
- Figma prototype: https://onclusive-cookies-b.figma.site/
- Reference (Review module): https://onclusive.atlassian.net/browse/UP-898

## Progression

```
Epic GEO-200 — Cookie Consent for Hubspot/PQL
Status: Ready for QA

Stories:
  GEO-327  Story 17.1   [DONE      ]  Consent State Provider + cc_cookie persistence
  GEO-328  Story 17.2   [DONE      ]  Cookie Banner Phase 1
  GEO-329  Story 17.3   [DONE      ]  Cookie Preferences Modal
  GEO-330  Story 17.4   [DONE      ]  Cookie Inventory & Essentials Documentation
  GEO-331  Story 17.5a  [ABANDONED ]  Hybrid Write Strategy
  GEO-332  Story 17.5b  [DONE      ]  i18n EN/FR for Cookie Consent
  GEO-333  Story 17.6   [DONE      ]  Help JIT Bridge Modal "Ready to chat?"
  GEO-334  Story 17.7   [DONE      ]  Privacy Fallback Modal "Your privacy is respected"
  GEO-237  —            [QA PROG   ]  Hubspot PQL feedback into Hubspot
  GEO-427  —            [DONE      ]  Upsell page content refresh — Figma V2

Progress: 8 Done / 1 QA In Progress / 1 Abandoned
```

## Details

| Champ | Valeur |
|-------|--------|
| Epic ID | GEO-200 |
| Statut | Ready for QA |
| Assigne a | Youssef.AitLaydi |
| Cree le | 2026-04-14 |
| Mis a jour | 2026-05-18 |
| Stories total | 10 (dont 1 abandoned) |
| Stories Done | 8 |
| Stories QA In Progress | 1 (GEO-237) |
| Stories Abandoned | 1 (GEO-331) |

## Composants Cles

| Composant | Fichier | Story |
|-----------|---------|-------|
| `useCookieConsentStore` (Zustand) | `frontend/src/store/cookieConsentStore.ts` | GEO-327 |
| `CookieConsentBanner` | `frontend/src/components/cookieConsent/CookieConsentBanner.tsx` | GEO-328 |
| `CookiePreferencesModal` | `frontend/src/components/cookieConsent/CookiePreferencesModal.tsx` | GEO-329 |
| `CookieSettingsGrid` | `frontend/src/components/cookieConsent/CookieSettingsGrid.tsx` | GEO-330 |
| `cookieInventory.ts` | `frontend/src/lib/cookieConsent/cookieInventory.ts` | GEO-330 |
| `JitBridgeModal` ("Ready to chat?") | `frontend/src/components/cookieConsent/JitBridgeModal.tsx` | GEO-333 |
| `PrivacyFallbackModal` | `frontend/src/components/cookieConsent/PrivacyFallbackModal.tsx` | GEO-334 |
| `SpeakToUsButton` + `SeeItInActionModal` | `frontend/src/views/auth/` | GEO-237 |
| `UpsellPage` | `frontend/src/views/auth/UpsellPage.tsx` | GEO-427 |
| i18n namespace `cookieConsent` | `frontend/src/i18n/locales/{en,fr}.json` | GEO-332 |
| vanilla-cookieconsent v3 | npm `vanilla-cookieconsent` | GEO-327/328 |

## Risques et Points d'Attention

- **Legal risk (banner):** Style "Accept All" is visually dominant over "Essential Only" — abandons `equalWeightButtons` principle (ICO PECR anti-dark-pattern). PM-approved derogation pending formal legal review (see GEO-328 AC7).
- **FR copies:** Draft by Sally — require copywriter/legal review before production merge (RGPD obligation).
- **GEO-237 amendment:** Post-test amendment added AC10-AC14 (SeeItInActionModal + 401 fix) — verify full 14 ACs in QA.
- **Email support@onclusive.com:** To confirm with PM before merge of GEO-334 (Privacy Fallback Modal).
- **Cross-subdomain:** GEO cookie scoped to `geo.onclusive.com` only — no cross-module consent sharing with 360/Review.
