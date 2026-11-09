# Story 12.7: Dashboard — Brand Territory Chart

**Story ID:** GEO-190
**Titre:** Story 12.7: Dashboard — Brand Territory Chart
**Statut:** Done
**Epic:** GEO-174 (EPIC-012)
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-190
**Dépend de:** Story 12.3 (GEO-186) + Story 12.4 (GEO-187)

## User Story

**As** an Editor  
**I want** to see a packed bubble chart showing which product categories AI engines spontaneously associate with my brand  
**So that** I can discover unexpected brand associations and assess my brand territory

## Acceptance Criteria

1. **Given** Editor on Overview Identity section, **When** brand territory data exists, **Then** packed bubble chart affiché avec chaque bulle représentant une catégorie détectée (using `category_normalized`)

2. **Given** bubble chart, **When** renders, **Then** chaque bulle dimensionnée proportionnellement à la fréquence de mention (%); labelisée avec nom catégorie et pourcentage; colorée via rotation 8 couleurs pastels (Sky-400, Violet-400, Emerald-400, Amber-400, Rose-400, Cyan-400, Indigo-400, Orange-400)

3. **Given** bubble chart on desktop, **When** user hovers, **Then** hover state visible (subtle scale ou border highlight); cursor change en pointer

4. **Given** user clicks a bubble, **When** detail panel opens (< 500ms, NFR-BI3), **Then** affiche: nom territoire, mention count, pourcentage du total brand territory, jusqu'à 2 phrases contexte IA dédupliquées (using `context_normalized`)

5. **Given** detail panel, **When** user switches between LLM tabs, **Then** phrases contexte raw spécifiques à chaque LLM affichées (using original `context`, not normalized)

6. **Given** no brand territory data, **When** section renders, **Then** placeholder "No brand territory data" affiché

7. **Given** bubble chart container, **When** rendered, **Then** suit: `rounded-xl border border-[#E2E8F0] bg-white shadow-[0px_1px_2px_rgba(10,13,20,0.03)]`

## Technical Details

- **FRs couverts:** FR32d, FR38-ext
- **NFRs couverts:** NFR-BI2, NFR-BI3
- **Chart library:** D3.js ou @nivo/circle-packing (TBD)
- **Scope:** Frontend
- **Estimation:** ~2.5 jours
- **Dépend de:** Story 12.3 + Story 12.4

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment
