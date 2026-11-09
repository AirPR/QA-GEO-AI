# Story 17.3: Cookie Preferences Modal

**Story ID:** GEO-329
**Titre:** Story 17.3 — Cookie Preferences Modal (Settings Grid + per-category toggles + Save)
**Statut:** ✅ Done
**Assigne a:** Youssef.AitLaydi
**Epic:** GEO-200 (Cookie Consent for Hubspot/PQL)
**Creee le:** 2026-04-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-329

## User Story

As a **GEO user wanting fine-grained control over cookies**,
I want **to open a Cookie Preferences modal that displays each cookie category with toggles, allowing me to enable/disable Functional and Analytics individually before saving**,
So that **I can give informed, granular consent and revisit my choices anytime**.

## Out of Scope

- Cookie inventory rows (-> 17.4)
- Hybrid write to both cookies (-> 17.5)
- i18n strings (-> 17.6)

## Dependencies

- **Blocked by:** 17.1 (store), 17.2 (lib mounted)
- **Blocks:** 17.4 (modal shell needed before populating inventory)

## Acceptance Criteria

**AC1 — Ouverture depuis "Manage preferences" du banner**
**Given** the cookie banner from Story 17.2 is visible
**When** the user clicks "Manage preferences"
**Then** the Cookie Preferences modal opens with **three sections**: Essential (locked-on, badge "Always on", no toggle), Functional & Support (toggle, default OFF for first-time users), Analytics (toggle, default OFF for first-time users). Le focus est pose sur le premier element focusable du modal (Radix Dialog par defaut).

**AC2 — Hydratation depuis le store quand consent deja donne**
**Given** the user has previously consented (`useCookieConsentStore.getState().hasRespondedToConsent === true`)
**When** the modal is opened
**Then** chaque toggle reflete **l'etat courant** charge depuis le store : `areAnalyticsCookiesEnabled` -> toggle Analytics, `areFunctionalCookiesEnabled` -> toggle Functional & Support. L'Essential reste toujours ON (read-only). L'utilisateur peut modifier les toggles modifiables avant de sauvegarder.

**AC3 — Save Preferences (commit partiel)**
**Given** the modal is open
**When** the user toggles "Functional & Support" et/ou "Analytics" puis clique sur **"Save preferences"**
**Then** `useCookieConsentStore.getState().savePreferences({ analytics, functional })` est appelee avec les valeurs refletees par les toggles, `cc_cookie` est mis a jour via la lib v3, le store passe a l'etat correspondant (`hasRespondedToConsent === true`, `shouldShowBanner === false`), le modal se ferme.

**AC4 — Accept all cookies (depuis le modal, override pending)**
**Given** the modal is open avec des pending toggles modifies
**When** the user clicks **"Accept all cookies"**
**Then** tous les toggles modifiables passent a ON visuellement (override des pending), `useCookieConsentStore.getState().acceptAll()` est appelee, `cc_cookie` est ecrit avec `categories: ["necessary", "analytics", "functional_support"]`, le modal se ferme. **PM-valide 2026-05-07**: Accept all override les pending sans condition.

**AC5 — Cancel / fermeture sans sauvegarder (overlay click bloque)**
**Given** the modal is open avec des toggles modifies (pending state) mais non encore sauvegardes
**When** the user clicks **"Cancel"** OU ferme le modal via la croix OU via la touche Escape
**Then** l'etat du store n'est **pas** modifie, les toggles pending sont jetes (la prochaine ouverture re-hydrate depuis le store), le modal se ferme. Aucun ecrit `cc_cookie` ne se produit.
**Et** si le user n'avait jamais consenti avant, `shouldShowBanner` reste `true` et le banner reste visible.
**Note PM 2026-05-07**: un **click sur l'overlay n'est PAS un Cancel implicite** — le modal reste ouvert (`onPointerDownOutside.preventDefault()`). Seuls Cancel / X / Esc ferment sans commit.

**AC6 — Settings Grid (Cookie / Provider / Purpose) — DEFERE 17.4**
Le Settings Grid sous chaque section est **entierement livre par Story 17.4** (PM-valide 2026-05-07). En 17.3 chaque section affiche uniquement titre + description + toggle/badge. La Story 17.4 ajoute `<table>` Cookie/Provider/Purpose sans refacto du modal.

**AC7 — Responsive mobile (sticky footer)**
**Given** the user accede sur un viewport `< 768px`
**When** le modal est rendu
**Then** les sections sont scrollables verticalement (`overflow-y-auto` sur la zone des sections, `max-h-[85vh]` sur le DialogContent), les toggles restent accessibles (>= 44x44px touch target), le footer du modal contenant les boutons "Cancel", "Save preferences", "Accept all cookies" reste visible en bas du modal et stack verticalement (`flex-col` mobile, `md:flex-row` desktop).

**AC8 — Accessibilite clavier & lecteur d'ecran**
**Given** the modal is open
**When** l'utilisateur navigue uniquement au clavier
**Then**:
- Le focus initial atterrit sur un element focusable du modal (Radix gere).
- `Tab` cycle dans l'ordre logique : toggles puis CTAs footer.
- `Escape` ferme le modal sans sauvegarder (equivalent Cancel — AC5).
- Le focus est trap dans le modal tant qu'il est ouvert (Radix Dialog).
- A la fermeture, le focus retourne sur l'element qui a ouvert le modal (Manage preferences button du banner — Radix gere).
- Markup : `role="dialog"`, `aria-labelledby` auto-cable sur `<DialogTitle>` par Radix.
- Toggles `role="switch"`, `aria-checked` reflete l'etat, `aria-labelledby` + `aria-describedby` pointent sur le titre + description de la section.

**AC9 — Equal visual weight des CTAs (anti-dark-pattern ICO)**
**Given** les boutons "Save preferences", "Accept all cookies" et "Cancel" sont rendus
**When** observes visuellement et programmatiquement
**Then** "Save preferences" et "Accept all cookies" ont **equal visual weight** (memes classes Tailwind `bg-sky-700 text-white h-9 px-3.5`, contrastes equivalents >= 4.5:1) — aucun n'est subordonne a l'autre. "Cancel" est rendu en style ghost (`bg-transparent text-slate-600`) pour differencier l'action de retraite des deux actions de commit. Conformite ICO PECR.

**AC10 — i18n placeholder (continuite 17.2 -> 17.5)**
**Given** Story 17.5 (i18n EN/FR) n'est pas encore livree
**When** le modal est rendu en 17.3
**Then** les strings sont consommees via `COOKIE_CONSENT_COPY_EN` (barrel `frontend/src/lib/cookieConsent/copy.ts`). Marker `// TODO 17.5 — replace with t('cookieConsent.settingsDialog.*')` present en haut de `CookiePreferencesModal.tsx`.

## Technical Notes

- Reuse `vanilla-cookieconsent` v3 `preferencesModal` config — feed it the structure expected by the lib, with `linkedCategory` mappings to `essentials` / `functional` / `analytics`
- Layout reference: `AirPR/onclusive-core-client:components/shared/CookieConsent/CookieConsentSettingsDialog.vue`
- Pending toggle state lives in the lib's internal state until Save is clicked — only then does the store from 17.1 update
- "Always on" badge for Essential category — non-toggleable, copy from 360 locales `cookieConsent.settingsDialog.essential.badge`
- The Settings Grid (cookies inventory) markup is delivered by Story 17.4 — this story implements the **modal shell**, sections, toggles, and Save/Accept/Cancel CTAs
- Visual: Tailwind v4, dialog primitive (existing in GEO design system), match Figma Make + 360 Vue dialog visual

## Definition of Done

- [ ] Cookie Preferences modal opens from "Manage preferences" with 3 sections
- [ ] Toggles hydrated from store on open
- [ ] Save Preferences, Accept all, Cancel flows all working correctly
- [ ] Overlay click does NOT close modal (PM decision)
- [ ] All AC1-AC10 verified via 32 unit tests (green)
- [ ] Mobile responsive with sticky footer

## Liens

- Epic parent: https://onclusive.atlassian.net/browse/GEO-200
- Story Jira: https://onclusive.atlassian.net/browse/GEO-329
- Spec complète: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-17/17-3-cookie-preferences-modal.md
