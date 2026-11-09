# Story: Hubspot PQL feedback into Hubspot

**Story ID:** GEO-237
**Titre:** GEO: Hubspot PQL feedback into Hubspot
**Statut:** 🟨 QA In Progress
**Assigne a:** Quentin.Reant
**Epic:** GEO-200 (Cookie Consent for Hubspot/PQL)
**Creee le:** 2026-04-14
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-237

## Context

For the PQL page in GEO/Measure, we will need to track the events back into HubSpot in order for the sales team to capture and track leads.
Implementation should be the same as in the other modules.
Full documentation of HubSpot integration: https://onclusive.atlassian.net/wiki/spaces/PT2/pages/5154209795/HubSpot+Integration+Guide+Login+Upsell+Events

## Acceptance Criteria

### AC1 — Cookies absents -> popup JIT
**Given** l'user est sur la page upsell Measure
**And** les cookies Functional & Support ne sont pas acceptes
**When** il clique sur "Speak to Us"
**Then** la JitBridgeModal s'affiche (identique au comportement "Help")
**And** aucun appel POST /geo/api/upsell/hubspot n'est effectue

### AC2 — Acceptation dans la popup -> evenement envoye immediatement
**Given** la JitBridgeModal est ouverte depuis le contexte upsell
**When** l'user clique "Enable support"
**Then** areFunctionalCookiesEnabled passe a true
**And** POST /geo/api/upsell/hubspot est appele automatiquement
**And** l'evenement upsell_cta avec product: "geo" est visible dans la HubSpot timeline du contact

### AC3 — Refus dans la popup -> aucun evenement
**Given** la JitBridgeModal est ouverte depuis le contexte upsell
**When** l'user clique "I'd still like to stay private"
**Then** la PrivacyFallbackModal s'ouvre (comportement existant)
**And** aucun appel backend n'est effectue

### AC4 — Consentement deja accorde -> appel direct
**Given** areFunctionalCookiesEnabled === true
**When** l'user clique sur n'importe quel "Speak to Us" de la page
**Then** POST /geo/api/upsell/hubspot est appele sans popup
**And** l'evenement apparait dans HubSpot

### AC5 — Idempotence par session
**Given** l'user a deja clique "Speak to Us" et l'evenement a ete envoye
**When** il clique a nouveau sur un autre "Speak to Us" de la page
**Then** aucun deuxieme appel backend n'est effectue

### AC6 — Utilisateur interne exclu
**Given** le JWT contient un email @onclusive.com
**When** POST /geo/api/upsell/hubspot est appele
**Then** aucun evenement n'est envoye a HubSpot
**And** la reponse est 200 OK

### AC7 — Erreur HubSpot non-bloquante
**Given** HubSpot API retourne une erreur (5xx ou timeout)
**When** l'endpoint est appele
**Then** l'erreur est loggee (ERROR)
**And** le frontend recoit 200 OK
**And** aucune UI d'erreur n'est affichee a l'user

### AC8 — Securite du token
**Then** HUBSPOT_ACCESS_TOKEN n'apparait jamais dans les reponses API, les logs applicatifs, ni les variables Vite exposees au client

### AC9 — 7 boutons couverts
**Given** les 7 instances du bouton "Speak to Us" sur la page upsell
**When** l'user clique sur n'importe laquelle
**Then** la meme logique de consentement + meme appel backend s'applique

## Amendment 2026-05-13 — Acceptance Criteria additionnels

Deux changements requis post-test conditions reelles : (1) popup de confirmation "See it in action" avant tout envoi HubSpot, (2) fix bug 401 (intercepteur axios redirige vers Auth0).

### AC10 — Popup "See it in action" affichee au clic
**Given** l'user est sur la page upsell Measure
**When** il clique sur n'importe quel bouton "Speak to Us" (5 instances)
**Then** la modal SeeItInActionModal s'ouvre avec le titre `See it in action`
**And** la description `One of our specialists will reach out to show you how this module can fit into your current workflow.` est visible
**And** la checkbox `I'm happy to be contacted for a demo` est presente et decochee
**And** le bouton `Confirm` est desactive

### AC11 — Bouton Confirm active apres coche
**Given** la modal SeeItInActionModal est ouverte
**When** l'user coche la checkbox `I'm happy to be contacted for a demo`
**Then** le bouton `Confirm` devient actif (clickable)

### AC12 — Fermeture sans confirmation -> aucun evenement
**Given** la modal SeeItInActionModal est ouverte
**When** l'user clique sur la croix (x), le backdrop ou Escape
**Then** la modal se ferme
**And** aucun appel POST /api/v1/upsell/hubspot n'est effectue
**And** pendingUpsellRef.current reste `false`

### AC13 — Confirmation -> logique cookie consent preservee
**Given** la modal SeeItInActionModal est ouverte et la checkbox est cochee
**When** l'user clique `Confirm`
**Then** la modal se ferme
**And** si areFunctionalCookiesEnabled = true -> POST /api/v1/upsell/hubspot est appele directement (AC4 original preserve)
**And** si areFunctionalCookiesEnabled = false -> la JitBridgeModal s'ouvre (AC1 original preserve)

### AC14 — Fix 401 : pas de redirection Auth0
**Given** POST /api/v1/upsell/hubspot retourne 401 (etat inattendu)
**When** postUpsellEvent est appele
**Then** aucune redirection vers Auth0 n'est declenchee (axios `validateStatus` whitelist 200-299 ET 401)
**And** l'erreur est loggee silencieusement en DEV (console.warn)
**And** l'user reste sur la page upsell

## Technical Details

- Endpoint: `POST /api/v1/upsell/hubspot`
- Event type: `upsell_cta` with `product: "geo"`
- Session idempotence via `hasUpsellSentRef` (ref not state — no re-render)
- Internal users (@onclusive.com) excluded from HubSpot tracking
- HUBSPOT_ACCESS_TOKEN is backend-only — never exposed to client
- New modal flow: SeeItInActionModal (confirmation checkbox) -> JitBridgeModal (if no functional consent) -> POST hubspot

## Definition of Done

- [ ] All 14 ACs (original + amendment) verified
- [ ] "See it in action" confirmation modal implemented (AC10-AC13)
- [ ] 401 no longer triggers Auth0 redirect (AC14)
- [ ] Session idempotence: max 1 POST per session (AC5)
- [ ] Internal users excluded (AC6)
- [ ] HUBSPOT_ACCESS_TOKEN never exposed to client (AC8)

## Liens

- Epic parent: https://onclusive.atlassian.net/browse/GEO-200
- Story Jira: https://onclusive.atlassian.net/browse/GEO-237
- HubSpot integration docs: https://onclusive.atlassian.net/wiki/spaces/PT2/pages/5154209795/HubSpot+Integration+Guide+Login+Upsell+Events
- Spec complète: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-17/17-8-hubspot-upsell-event-measure-pql.md
