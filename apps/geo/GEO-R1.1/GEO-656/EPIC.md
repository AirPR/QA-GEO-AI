# Replace primary market with an explicit AI insights language field in the Brand & Country step

**Epic ID:** GEO-656
**Statut:** [DONE] Passed QA
**Assigne:** Abdenasser Aroukhsiss
**Cree:** 2026-06-11
**MAJ:** 2026-07-16
**Jira:** https://onclusive.atlassian.net/browse/GEO-656

## Description
As a user setting up an analysis, I want to explicitly choose the language of my AI insights in the Brand & Country step, instead of having it implicitly derived from a primary market, so that I clearly understand and control the language in which AI-generated content is produced across the app.
- Remove the primary market concept from the setup flow - no country is implicitly treated as the one driving the insights language.
- Add a clearly labeled "AI insights language" field to the Brand & Country step.
- Add a tooltip on the field explaining that the selected language will be the language of all AI-generated insights: In-brief summaries across the app (including the corporate reputation graph) and the key concepts graphs (brand territory and themes sentiment).
- The selected language applies consistently to every AI-generated insight in the analysis: In-brief summaries wherever they appear (including the corporate reputation graph), brand territory, and themes sentiment.
- The AI insights language is set at the analysis level: within the same organization, each analysis can have its own insights language.

## Scope
- Remove the primary market concept from the setup flow - no country is implicitly treated as the one driving the insights language.
- Add a clearly labeled "AI insights language" field to the Brand & Country step.
- Add a tooltip on the field explaining that the selected language will be the language of all AI-generated insights: In-brief summaries across the app (including the corporate reputation graph) and the key concepts graphs (brand territory and themes sentiment).
- The selected language applies consistently to every AI-generated insight in the analysis: In-brief summaries wherever they appear (including the corporate reputation graph), brand territory, and themes sentiment.
- The AI insights language is set at the analysis level: within the same organization, each analysis can have its own insights language.

## Stories
| Story | Titre | Statut |
|-------|-------|--------|
| [GEO-868](https://onclusive.atlassian.net/browse/GEO-868) | [Frontend] AI Insights Language — Wizard Step 1 & Manage Scope (Story 30.2) | [DONE] Passed QA |
| [GEO-867](https://onclusive.atlassian.net/browse/GEO-867) | [Backend] AI Insights Language — DB, API & Pipeline (Story 30.1) | [DONE] Passed QA |

## Liens
- https://onclusive.atlassian.net/browse/GEO-656
- https://onclusive.atlassian.net/browse/GEO-868
- https://onclusive.atlassian.net/browse/GEO-867
