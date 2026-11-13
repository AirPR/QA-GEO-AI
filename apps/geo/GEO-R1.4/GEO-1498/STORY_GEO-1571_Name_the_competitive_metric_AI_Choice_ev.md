# GEO-1571: STORY-53.8: Name the competitive metric AI Choice everywhere

**Story ID:** GEO-1571
**Issue Type:** Story
**Title:** STORY-53.8: Name the competitive metric AI Choice everywhere
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-1498
**Fix version:** 1.4
**Created:** 2026-10-28
**Updated:** 2026-11-12
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1571

## User Story

> As a GEO user, I want to see when engines choose my brand, choose it only in some cases, or do not choose it, so that I understand how strong my position is in head-to-head questions.

- **As** a GEO user
- **I want** to see when engines choose my brand, choose it only in some cases, or do not choose it
- **So that** I understand how strong my position is in head-to-head questions.

## Acceptance Criteria

_2 functional ACs, copied verbatim from the Jira description (customfield_10049 empty)._

### Functional Acceptance Criteria (GEO-1498, User Story 1.7, part 2 of 2)

- Given any place that shows the competitive metric, When it renders, Then the metric is named "AI Choice" (French "Choix IA", Spanish "Elección de IA"), with the same capitalisation everywhere: the matrix tooltips are already renamed (GEO-1524); this replaces "AI choice" in PowerPoint, "Choix de l'IA" and "Elección de la IA" in the trend graph, "Elección IA" in the Spanish upsell KPI and its upgrade gate, the unbranded Brand Rankings tooltip in 4 locales, "LLM Choice %" in the upsell results "AI choice" in the trend graph, "Choix LLM %" and "Elección LLM %" in the upsell rankings, "LLM choice" in PowerPoint and PDF, and the definitions of the KPI and Brand Rankings tooltips, which say "win rate" and "100% means AI engines always pick your brand" today and must describe Chosen plus Conditional
- Given the Share of Voice KPI tooltip, When it renders, Then it reads "Your share of all the brands named in AI responses. In each answer, every brand counts once, however many of its products are named: if Nike Air Max and Nike Pegasus both appear in the same answer, Nike counts as 1 mention." (en-GB and en-US), French "Votre part parmi toutes les marques citées dans les réponses des IA. Dans chaque réponse, chaque marque compte une seule fois, quel que soit le nombre de ses produits cités : si Nike Air Max et Nike Pegasus apparaissent dans la même réponse, Nike compte pour 1 mention.", Spanish "Su cuota entre todas las marcas mencionadas en las respuestas de la IA. En cada respuesta, cada marca cuenta una sola vez, sea cual sea el número de sus productos mencionados: si Nike Air Max y Nike Pegasus aparecen en la misma respuesta, Nike cuenta como 1 mención."

## Technical Details

### Scope note

User Story 1.7 is split in two: the four outcomes on screen are STORY-53.7; this story carries the metric name and the tooltip texts in every surface (prioritization matrices, trend graph, upsell results, PowerPoint and PDF, KPI and Brand Rankings tooltips) and the 4 locales. The new definitions describe the AI Choice and Share of Voice computed by STORY-50.7 (GEO-1556): the renaming can be built now, but the tooltip texts ship with STORY-50.7. Scheduled emails do not change.

## Dependencies

- **Blocks:** none in Jira links
- **Blocked by:** GEO-1556
- See the « Scope note » under Technical Details for the story dependencies stated in the description.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Technical acceptance criteria covered by tests
- [ ] Code reviewed and approved
- [ ] Tested on staging

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-1498
- Story Jira: https://onclusive.atlassian.net/browse/GEO-1571
- External Spec: [53-8-name-the-competitive-metric-ai-choice-everywhere.md](https://github.com/AirPR/geo-analytics/blob/developer/docs/implementation-artifacts/epics/epic-53/53-8-name-the-competitive-metric-ai-choice-everywhere.md)
