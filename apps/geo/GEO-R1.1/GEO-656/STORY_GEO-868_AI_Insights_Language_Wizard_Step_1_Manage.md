# GEO-868: [Frontend] AI Insights Language — Wizard Step 1 & Manage Scope (Story 30.2)

**Story:** GEO-868
**Statut:** [DONE] Passed QA
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-656
**Cree:** 2026-06-30
**Jira:** https://onclusive.atlassian.net/browse/GEO-868

## User Story
**As** a user configuring a GEO analysis,
**I want** to explicitly select the language in which my AI insights will be generated,
**so that** I fully understand and control the language of all AI-generated content in my analysis (in-brief summaries, brand territory, themes sentiment).

---

## Acceptance Criteria
**AC1 — Language selector visible in Wizard Step 1**

- Given: I am on the Brand & Country step of the wizard (new analysis)
- When: the step loads
- Then: I see an "AI insights language" field with a language dropdown and a tooltip icon

**AC2 — Tooltip content**

- Given: I hover or click the tooltip on the "AI insights language" field
- When: the tooltip opens
- Then: I read that this language covers: in-brief summaries across the app (including corporate reputation graph), brand territory, and themes sentiment

**AC3 — Default language = my platform language**

- Given: my platform interface is set to French
- When: I open the wizard Brand & Country step for a new analysis
- Then: "French" is preselected in the AI insights language dropdown

**AC4 — Language list: full list + market languages pinned**

- Given: I open the AI insights language dropdown
- When: the dropdown opens
- Then: I see the full supported language list; the languages of my added markets are pinned at the top

**AC5 — Language selection commits immediately (no modal in wizard)**

- Given: I am in the wizard (new analysis)
- When: I select a different language
- Then: the selection is applied immediately with no confirmation modal

**AC6 — Language independent from country selection**

- Given: I change a market's country or language
- When: the change is applied
- Then: the AI insights language field is NOT automatically updated

**AC7 — Language sent in wizard submit payload**

- Given: I complete the wizard and submit
- When: the report is created
- Then: the selected `insightsLanguage` is included in the creation payload

**AC8 — AI insights language visible in Manage Scope**

- Given: I open Manage Scope on an existing report
- When: the scope view loads
- Then: I can see the current AI insights language for this analysis

**AC9 — Language editable in Manage Scope with confirmation modal**

- Given: I am in Manage Scope
- When: I select a different language and confirm in the modal
- Then: the new language is saved and the Manage Scope view reflects the change

**AC10 — Confirmation modal explains the impact**

- Given: I change the AI insights language in Manage Scope
- When: the confirmation modal appears
- Then: it explains that existing insights will be re-generated at the next scheduled analysis run

---

## Technical Details
Key files: `insightsLanguages.ts`, `InsightsLanguageSelector.tsx`, `InsightsLanguageChangeModal.tsx`, `useUpdateInsightsLanguage.ts`, `useWizardStore.ts`, `Step1Content.tsx`, `useSubmitReport.ts`, `ManageScopeView.tsx`, i18n 4 locales. Remove `?lang=` from in-brief API calls.

**Depends on:** GEO-867 (Story 30.1)

📋 Spec complète : [30-2-frontend-insights-language.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-656-ai-insights-language/docs/implementation-artifacts/epics/epic-30/30-2-frontend-insights-language.md)

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-656
- Story: https://onclusive.atlassian.net/browse/GEO-868
