# GEO-1178: Action Center - Target Sources: details panel tabs and prompts list from the new design (engine filter, one row per prompt)

**Task ID:** GEO-1178
**Issue Type:** Task
**Title:** Action Center - Target Sources: details panel tabs and prompts list from the new design (engine filter, one row per prompt)
**Status:** [READY FOR QA] Ready for QA
**Assigned to:** Abdenasser Aroukhsiss
**Epic:** GEO-152
**Created:** 2026-09-30
**Updated:** 2026-10-01
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1178

## User Story

_No user story in Jira (Task)._

## Acceptance Criteria

_Jira description copied verbatim below (ACs in their original format)._

The details panel of Target Sources follows the new design (Figma, Action Center section, frames 13746:123761, 13861:13367, 15220:79515, 15688:25012 and 13746:122399). This ticket replaces the panel part of GEO-1168 (tab names and prompts list). Everything else in GEO-1168 stays the same.

_Article tabs_

- 2 tabs at the top of the panel: "Lack of visibility (N)" and "Negative perception (N)", each with its icon. N is the number of articles of the tab.
- When a source has only one reason, we only show that tab. When it has both, "Lack of visibility" is first and selected by default.
- Under each tab, one line explains the verdict for all the articles of the tab, so we no longer repeat it on each article:
- Lack of visibility: "None of these articles mentions {brand} anywhere on the page."
- Negative perception: "Each of these articles mentions {brand} negatively."
- Each article shows its title, URL and the icons of the engines that cite it. Negative articles also show the passage where the brand is mentioned negatively.

_Prompts associated with this source_

- The section stays below the articles, separated by a divider, and does not change with the article tab.
- One row per prompt (prompt text + market flag), with the icons of every engine whose answer to this prompt cites the source. This closes the grouping question of GEO-1167.
- An engine filter above the list: "All" (default), then one tab per engine present in the prompts of the source, with its count (number of prompts of the list cited by that engine). With 2 or 3 engines the tab shows the icon and the name, with more engines it only shows the icon and the count.
- Show the first 6 prompts, then "Show X more prompts" (X = remaining prompts in the selected engine tab).

_Page name_

- We remove the S from the page name to match the new design: "Action Center" in en-US and "Action Centre" in en-GB. French and Spanish do not change.
- It covers the 2 existing keys, views.actions.title and layout.actionsCenter, so every place that uses them follows.
- In the PPT and PDF exports, the slide header changes from "ACTIONS · TARGET SOURCES" to "ACTION CENTER · TARGET SOURCES" in English. French and Spanish keep "ACTIONS" and "ACCIONES".

**Acceptance criteria:**

- Given a source with only missing articles, when I open its panel, then I only see the "Lack of visibility (N)" tab and its explanation line.
- Given a source with only negative articles, when I open its panel, then I only see the "Negative perception (N)" tab and its explanation line.
- Given a source with both, I see both tabs, "Lack of visibility" selected by default, and switching tab does not change the prompts section.
- The count of each tab matches the number of articles in the tab and the card line of the source.
- The explanation line uses the brand name of the analysis.
- A prompt cited by several engines appears once, with one icon per engine.
- When I select an engine tab, the list only keeps the prompts cited by that engine, and the "Show X more prompts" count is recalculated.
- The engine tabs only list the engines in the current scope (AI Engines filter of the page).
- The list shows 6 prompts before the "Show X more prompts" button.
- Previous / Next source rebuilds the tabs and the engine filter for the new source with the same rules.
- All the new strings exist in en-GB, en-US, fr-FR and es-ES.
- The page name shows "Action Center" in en-US and "Action Centre" in en-GB, and the French and Spanish names stay the same.
- The English PPT and PDF slide header reads "ACTION CENTER · TARGET SOURCES", and none of the exports (PPT, PDF, Excel) shows "Actions Center" or "Actions Centre".

**Translations:**

en-US uses the same strings as en-GB. Key names are a proposal. Engine names (Gemini, ChatGPT...) are not translated. Keys no longer used: panel.missingTab, panel.negativeTab (from GEO-1168), panel.noMention, panel.describesNegatively (the per-article verdict lines).

| String | Key | EN | FR | ES |
| --- | --- | --- | --- | --- |
| Tab, missing | views.targetSources.panel.lackOfVisibilityTab | Lack of visibility ({{count}}) | Manque de visibilité ({{count}}) | Falta de visibilidad ({{count}}) |
| Tab, negative | views.targetSources.panel.negativePerceptionTab | Negative perception ({{count}}) | Perception négative ({{count}}) | Percepción negativa ({{count}}) |
| Explanation, missing tab | views.targetSources.panel.lackOfVisibilityIntro | None of these articles mentions {{brand}} anywhere on the page. | Aucun de ces articles ne mentionne {{brand}} sur la page. | Ninguno de estos artículos menciona a {{brand}} en la página. |
| Explanation, negative tab | views.targetSources.panel.negativePerceptionIntro | Each of these articles mentions {{brand}} negatively. | Chacun de ces articles mentionne {{brand}} de façon négative. | Cada uno de estos artículos menciona a {{brand}} de forma negativa. |
| Engine filter, default | views.targetSources.panel.allEngines | All | Tous | Todos |
| Show more (existing key, reused) | views.targetSources.panel.showMorePrompts_one / _other | Show {{count}} more prompt / Show {{count}} more prompts | Afficher {{count}} prompt de plus / Afficher {{count}} prompts de plus | Mostrar {{count}} prompt más / Mostrar {{count}} prompts más |
| Page name (existing key, changed) | views.actions.title | Action Center (en-US) / Action Centre (en-GB) | Centre d'actions (unchanged) | Centro de acciones (unchanged) |
| Page name in the layout (existing key, changed) | layout.actionsCenter | Action Center (en-US) / Action Centre (en-GB) | Centre d'actions (unchanged) | Centro de acciones (unchanged) |
| Export slide header (existing key in ExportI18n, changed; one English string for en-GB and en-US) | section.actions | ACTION CENTER (today ACTIONS) | ACTIONS (unchanged) | ACCIONES (unchanged) |

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
- Task Jira: https://onclusive.atlassian.net/browse/GEO-1178
