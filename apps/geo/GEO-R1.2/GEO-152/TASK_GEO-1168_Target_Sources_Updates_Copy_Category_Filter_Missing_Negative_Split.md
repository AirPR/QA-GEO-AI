# GEO-1168: Actions Center — Target Sources updates (copy, category filter, missing/negative split, panel simplification)

**Task ID:** GEO-1168
**Issue Type:** Task
**Title:** Actions Center — Target Sources updates (copy, category filter, missing/negative split, panel simplification)
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-28
**Updated:** 2026-10-01
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1168

## User Story

_No user story in Jira (Task)._

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

A batch of changes to the Target Sources view based on PM/design feedback. The core shift: we no longer talk about "failing articles" as one number. Everywhere in the UI the count is split into "Not visible in N articles" (articles where the brand is missing) and "Negative perception in N articles" (articles that mention the brand negatively), matching the two reason tags (Improve visibility / Improve perception).

We also remove every "Cited" mention and the In Brief summary (Key Takeaways) from Target Sources.

**Dependency:** the source pool changes in a separate ticket, linked to this one. We will select the top X sources by citation frequency instead of the sources cited in failing prompts. The "Prompts associated with this source" label only makes sense once that change is live, so both tickets should ship together.

_Copy_

- Page subtitle: "Sources to target to improve how AI engines represent your brand, sorted by the number of articles where your brand is missing or negatively represented"
- Verifying state: keep the title and the spinner; drop the progress counter and the explanatory paragraph under the title.
- All clear state: title "All clear", body "Every article used by AI engines describes your brand positively."
- Details panel: section "Failing prompts on this source" becomes "Prompts associated with this source".

_Filters_

- New Category filter dropdown next to the Type filter, populated with the analysis' categories (same ones as the left menu). Filters sources to those impacting the selected category. Note that the API already accepts categoryId.
- Both dropdowns have no leading icon; defaults read "All categories" and "All types". Single select each.

_Card view_

- Card stat line replaced by per-reason lines: "Not visible in N articles" and/or "Negative perception in N articles", one line per applicable reason, both lines when a source has both.
- Cards show both reason badges when both apply.
- "Cited N× in gap answers" line removed from cards.
- Show up to 12 cards before collapsing the rest behind "Show X more sources" (X = total - 12).

_List (table) view_

- Columns: #, Source, Type, Articles. The Cited and Action columns are removed, the Articles chips already show the reason.
- The Articles cell shows the split as two small chips: blue eye-off icon + missing count, purple thumb-down icon + negative count (chip omitted when its count is 0). Ranking stays by total article count, unchanged.

_Details panel_

- Remove the header meta line (failing/positive/cited counts) and the Key Takeaways block (In Brief summary).
- Remove the Failing/Positive articles tabs. The new article tabs ("Lack of visibility (N)" / "Negative perception (N)") follow the new design, see GEO-1178. Positive articles are no longer shown in the panel.
- When a source has only one reason, only that tab is shown.
- Prompts list ("Prompts associated with this source"): follows the new design, see GEO-1178 (one row per prompt, engine filter, 6 prompts before "Show X more prompts").
- Previous/Next source footer unchanged.

_Export (PPT/PDF)_

- Top source cards use the same split copy (e.g. "Not visible in 2 articles · Negative perception in 1 article").
- Table: Cited column removed; Articles column uses the same two-chip split as the in-app table.

**Acceptance criteria:**

_Details panel tabs_

- Given a source with only the Improve visibility badge (missing > 0, negative = 0), when I open its details panel, then I only see the "Lack of visibility (N)" tab.
- Given a source with only the Improve perception badge (missing = 0, negative > 0), when I open its details panel, then I only see the "Negative perception (N)" tab.
- Given a source with both badges, when I open its details panel, then I see both tabs, the "Lack of visibility" tab first and selected by default.
- Each tab shows its count, and the count matches the number of article rows in the tab.
- No positive article is shown anywhere in the panel.
- When I click Previous or Next source, the tabs are rebuilt for the new source with the same rules.

_Card and table_

- Given a source with only one badge, the card shows one reason line and the table shows one chip.
- Given a source with both badges, the card shows both lines and both badges, and the table shows both chips.
- For a given source, the counts on the card, the table chips and the panel tabs are the same, and missing + negative is the total used for ranking.
- With 12 sources or fewer, all cards show and there is no "Show X more sources" button. With more than 12, the button shows X = total - 12.
- The table shows 10 rows before its "Show X more sources" button. The prompts list rules are in GEO-1178.

_Filters_

- The Category filter lists the categories of the analysis, in the same order as the left menu, with "All categories" by default.
- When I select a category, the list only keeps the sources with at least one missing or negative article in answers of that category, and the counts are recalculated for that category.
- Category, Type and the page tabs (All / Improve visibility / Improve perception) combine. When no source matches, the filtered empty state shows.

_Removed elements_

- No "Cited" count appears on any Target Sources surface: cards, table, details panel and export.
- The Key Takeaways block (In Brief summary) and the panel header meta line are gone.
- The verifying state shows the title and the spinner, without the progress counter and without the paragraph.
- When no source has a missing or negative article, the all clear state shows "All clear" and "Every article used by AI engines describes your brand positively."
- The table has no Action column.

_Export (PPT/PDF)_

- The top source cards and the table use the same split copy and chips as the app, with no Cited column.

_Translations_

- Every new and changed string below exists in en-GB, en-US, fr-FR and es-ES, with singular and plural forms where there is a count.
- The Spanish strings use "usted" (su marca), as in the rest of the app.
- The keys that are no longer used are removed from the four locale files.
- When I switch the app language, the card lines, chips, tabs, filters and export all follow it.

**Translations:**

en-US uses the same strings as en-GB. Key names are a proposal, the devs can adapt them. The export reuses the card line strings, joined with " · ".

| String | Key | EN | FR | ES |
| --- | --- | --- | --- | --- |
| Page subtitle (changed) | views.targetSources.subtitle | Sources to target to improve how AI engines represent your brand, sorted by the number of articles where your brand is missing or negatively represented | Sources à cibler pour améliorer la façon dont les moteurs IA représentent votre marque, triées selon le nombre d'articles où votre marque est absente ou représentée négativement | Fuentes en las que actuar para mejorar cómo los motores de IA representan su marca, ordenadas según el número de artículos en los que su marca está ausente o aparece de forma negativa |
| All clear title (changed) | views.targetSources.allClearTitle | All clear | Tout est en ordre | Todo en orden |
| All clear body (changed) | views.targetSources.allClearBody | Every article used by AI engines describes your brand positively. | Tous les articles utilisés par les moteurs IA décrivent votre marque de façon positive. | Todos los artículos utilizados por los motores de IA describen su marca de forma positiva. |
| Card line, missing (changed) | views.targetSources.missingArticles_one / _other | Not visible in {{count}} article / Not visible in {{count}} articles | Non visible dans {{count}} article / Non visible dans {{count}} articles | No visible en {{count}} artículo / No visible en {{count}} artículos |
| Card line, negative (changed) | views.targetSources.negativeArticles_one / _other | Negative perception in {{count}} article / Negative perception in {{count}} articles | Perception négative dans {{count}} article / Perception négative dans {{count}} articles | Percepción negativa en {{count}} artículo / Percepción negativa en {{count}} artículos |
| Table column (new) | views.targetSources.colArticles | Articles | Articles | Artículos |
| Category filter default (reuse) | existing allCategories key | All categories | Toutes les catégories | Todas las categorías |
| Type filter default (new) | views.targetSources.allTypes | All types | Tous les types | Todos los tipos |
| Panel tabs (moved) | see GEO-1178 | see GEO-1178 | see GEO-1178 | see GEO-1178 |
| Panel tabs (moved) | see GEO-1178 | see GEO-1178 | see GEO-1178 | see GEO-1178 |
| Panel prompts section (changed) | views.targetSources.panel.promptsTitle | Prompts associated with this source | Prompts associés à cette source | Prompts asociados a esta fuente |

_Keys no longer used (to remove)_

citedInGapAnswers, colCited, colAction, colFailing, failingArticles, verifyingBody, panel.keyTakeaways, panel.citedCount, panel.positiveCount, panel.failingTab, panel.positiveTab, panel.failingPromptsTitle

## Technical Details

_No dedicated Technical Details / Implementation Notes section in the Jira description (see the repository spec link below if present)._

## Dependencies

- **Blocks:** None mentioned
- **Blocked by:** None mentioned

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Code reviewed and merged
- [ ] Tests (unit / E2E) passing
- [ ] QA validated on staging
- [ ] Localisation (en-US, en-GB, fr-FR, es-ES) checked where UI copy changes

## Links

- Parent Epic: https://onclusive.atlassian.net/browse/GEO-152
- Task Jira: https://onclusive.atlassian.net/browse/GEO-1168
