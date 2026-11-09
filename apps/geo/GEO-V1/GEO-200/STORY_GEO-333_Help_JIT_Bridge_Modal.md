# Story 17.6: Help JIT Bridge Modal "Ready to chat?"

**Story ID:** GEO-333
**Titre:** Story 17.6 — Help JIT Bridge Modal "Ready to chat?"
**Statut:** ✅ Done
**Assigne a:** Youssef.AitLaydi
**Epic:** GEO-200 (Cookie Consent for Hubspot/PQL)
**Creee le:** 2026-04-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-333

## Story Narrative

As a **GEO user who consented to Essential cookies only and clicks the Help / Chat button**,
I want **a modal explaining that Live Chat requires enabling Intercom & HubSpot cookies, with options to either accept and start chatting OR stay private**,
So that **I can make a granular informed consent decision at the moment I express interest in the feature**.

## Context

- Pulled in-scope Epic 17 from GEO-243 by PM decision 2026-05-06 (Figma review).
- Figma node `12987:64849` (file `msZlgB0O4kKPc3jlwegBKx`, "Layout - Navigation").
- Initially out-of-scope; pulled in-scope for coherent user flow (Cookie Consent + JIT bridge + Privacy fallback delivered together).

## Dependencies

- **Bloque par:** 17.1, 17.2, 17.3
- **Soft sync:** 17.5 (i18n keys `readyToChat.*`), 17.7 (Privacy Fallback target)
- **Soft dep GEO-243:** Help button wiring + Intercom Messenger boot remain GEO-243 scope. Without GEO-243, this story ships modal + store API only — accessible via dev-tools, not in production UI.

## Risks

- ICO PECR: aligned with Story 17.2 AC7 PM decision (stroke + filled buttons abandons equalWeightButtons — legal review required before prod).
- Without Intercom backend, "Enable Support & Start Chat" commits consent but messenger does not boot (acceptable transitionally).

## Acceptance Criteria

**AC1 — Trigger conditions**
**Given** a user has previously consented (`hasRespondedToConsent === true`) AND `areFunctionalCookiesEnabled === false`
**When** the user clicks the Help button (or any GEO entry point that requires live chat — wired by GEO-243)
**Then** instead of opening the messenger (which requires functional cookies), the JIT Bridge Modal opens with the title "Ready to chat?", description, and 2 CTAs.
Et si `areFunctionalCookiesEnabled === true` (deja opt-in functional), le clic Help ouvre directement le messenger Intercom (logique cablee GEO-243) — le JIT modal ne s'affiche **pas**.

**AC2 — Layout & content (Figma node 12987:64849)**
**Given** the JIT Bridge Modal is open
**When** rendu
**Then**:
- **Header**: titre "Ready to chat?" (Inter Semi-Bold 16/22), close icon 20x20 en haut a droite (rounded 6 px, hover slate-50).
- **Body**: description en Inter Medium 14/20 slate-600, contenant un lien inline **"Cookie Settings"** souligne sky-700 qui ouvre le modal preferences (Story 17.3) et ferme le JIT Modal.
- **Footer centered**:
  - CTA primary **"Enable Support & Start Chat"** (Filled primary, Medium 40, full-width inside footer padding 20 px), avec icone chat 20x20 a gauche (Figma asset `mark_unread_chat_alt`, fill currentColor).
  - Sous le CTA, ghost-link **"I'd still like to stay private"** (Small 36, color sky-700, underline, text-underline-offset 3 px).
- Modal width 480 px (vs 600 px pour le preferences modal — JIT bridge plus compact).
- Border-radius 4 px, shadow `0 1px 2px rgba(10,13,20,0.03), 0 8px 24px rgba(15,23,42,0.08)`.

**AC3 — "Enable Support & Start Chat" — opt-in cible Functional**
**Given** the modal is open
**When** the user clicks **"Enable Support & Start Chat"**
**Then**:
- `useCookieConsentStore.savePreferences({ analytics: <inchange>, functional: true })` est appelee — **seul `functional_support` passe a `true`**, `analytics` reste a son etat precedent.
- `cc_cookie` est mis a jour via la lib v3, `BroadcastChannel('geo-consent')` notifie les autres tabs.
- Le modal JIT se ferme.
- **Si GEO-243 est livre**: Intercom Messenger boot et demarre une session chat. **Si GEO-243 n'est pas encore livre**: le modal se ferme, le store est mis a jour, mais le messenger ne boot pas (acceptable transitionnellement).

**AC4 — "I'd still like to stay private" — bascule vers Privacy Fallback**
**Given** the modal is open
**When** the user clicks **"I'd still like to stay private"**
**Then**:
- **Aucun changement** dans le store — `functional_support` reste a `false`, le cookie n'est pas reecrit.
- Le modal JIT se ferme.
- Le **Privacy Fallback Modal** (Story 17.7) s'ouvre immediatement, dans la meme frame React (pas de flash de fond entre les deux modals).

**AC5 — Lien "Cookie Settings" inline**
**Given** the description du modal contient le lien inline `Cookie Settings`
**When** the user clique dessus
**Then**:
- Le modal JIT se ferme.
- Le **Cookie Preferences Modal** (Story 17.3) s'ouvre, hydrate depuis le store.
- L'utilisateur peut ensuite reviser ses preferences globales et Save — comportement Story 17.3 inchange.

**AC6 — Close button & Escape**
**Given** the modal is open
**When** the user clique sur la croix OU presse `Escape`
**Then** le modal se ferme **sans rien modifier** (ni store, ni cookie). Aucun fallback n'est ouvert.

**AC7 — Accessibilite clavier & lecteur d'ecran**
**Given** le modal est ouvert
**When** l'utilisateur navigue uniquement au clavier
**Then**:
- Focus initial atterrit sur un element focusable du modal (Radix Dialog convention).
- `Tab` cycle dans l'ordre logique : close icon -> lien Cookie Settings inline -> "Enable Support & Start Chat" -> "I'd still like to stay private".
- `Escape` ferme le modal (equivalent close icon — AC6).
- Focus trap actif tant que le modal est ouvert (Radix Dialog natif).
- Markup: `role="dialog"`, `aria-labelledby` pointant sur le titre.

**AC8 — Responsive mobile**
**Given** the user accede sur un viewport `< 768px`
**When** le modal est rendu
**Then**:
- Le modal occupe `calc(100vw - 32px)` avec margin 16 px de chaque cote.
- Les CTAs restent full-width (Enable Support) + auto-width centre (stay private), min-height 44 px sur le primary.
- Pas d'overflow horizontal.

**AC9 — Pas de re-trigger apres refus**
**Given** the user a deja clique "I'd still like to stay private"
**When** the user clique encore Help
**Then** le JIT Bridge Modal **se reaffiche** a chaque clic (pas de memorisation du refus).

**AC10 — i18n placeholder (handoff 17.5)**
**Given** Story 17.5 livre les copies EN/FR pour `readyToChat.*`
**When** le modal JIT est rendu
**Then** toutes les strings sont sourcees via `t("cookieConsent.readyToChat.*")` — aucune string EN hardcodee. La description avec lien inline `{cookieSettingsLink}` est rendue via un helper de substitution (split sur le token, render link `<button>` au milieu).

## Definition of Done

- [ ] JIT Bridge Modal opens correctly when Help clicked without Functional consent
- [ ] "Enable Support & Start Chat" sets functional_support=true, closes modal
- [ ] "I'd still like to stay private" opens Privacy Fallback Modal (Story 17.7) without store change
- [ ] "Cookie Settings" inline link opens Cookie Preferences Modal (Story 17.3)
- [ ] Close/Escape closes modal without any state change
- [ ] All AC1-AC10 verified via unit tests

## Liens

- Epic parent: https://onclusive.atlassian.net/browse/GEO-200
- Story Jira: https://onclusive.atlassian.net/browse/GEO-333
- Spec complète: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-17/17-6-help-jit-bridge-modal.md
