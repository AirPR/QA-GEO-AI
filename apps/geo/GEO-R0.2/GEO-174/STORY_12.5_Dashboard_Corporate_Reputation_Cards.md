# Story 12.5: Dashboard — Corporate Reputation Cards

**Story ID:** GEO-188
**Titre:** Story 12.5: Dashboard — Corporate Reputation Cards
**Statut:** Done
**Epic:** GEO-174 (EPIC-012)
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-188
**Dépend de:** Story 12.3 (GEO-186) + Story 12.4 (GEO-187)

## User Story

**As** an Editor  
**I want** to see 4 Corporate Reputation dimension cards with sentiment and AI-consolidated insights  
**So that** I can quickly assess how AI engines perceive my brand across Brand Image, Employer Brand, ESG/Sustainability, and Leadership

## Acceptance Criteria

1. **Given** Editor on Overview Identity section, **When** brand image data exists, **Then** 4 cartes de dimension en grille 2x2: Brand Image, Employer Brand, ESG/Sustainability, Leadership

2. **Given** a dimension card, **When** renders, **Then** affiche: icône pilier, nom pilier, sentiment badge (Positive=`emerald-600`, Mixed=`amber-500`, Negative=`red-500`), jusqu'à 3 bullets d'insights consolidés IA (label bold + détail)

3. **Given** dimension with null sentiment, **When** card renders, **Then** carte montre état atténué "No data available" sans sentiment badge

4. **Given** card styling, **When** rendered, **Then** cartes suivent: `rounded-xl border border-[#E2E8F0] bg-white shadow-[0px_1px_2px_rgba(10,13,20,0.03)]`; labels Inter 14px/600, détails Inter 14px/400; colored bullet dots par sentiment

5. **Given** market filter changed, **When** cards re-render, **Then** sentiment et insights mis à jour pour refléter le marché sélectionné

6. **Given** dashboard loads, **When** cards render, **Then** rendu dans les 2 secondes (NFR-BI2)

## Technical Details

- **FRs couverts:** FR32b
- **NFRs couverts:** NFR-BI2
- **Scope:** Frontend
- **Estimation:** ~2 jours
- **Dépend de:** Story 12.3 (données) + Story 12.4 (layout)

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment
