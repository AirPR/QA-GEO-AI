# GEO-867: [Backend] AI Insights Language — DB, API & Pipeline (Story 30.1)

**Story:** GEO-867
**Statut:** [DONE] Passed QA
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-656
**Cree:** 2026-06-30
**Jira:** https://onclusive.atlassian.net/browse/GEO-867

## User Story
**As** a developer building the GEO platform,
**I want** the backend to store and expose an `insights_language` field at the report level, and use it throughout the AI text generation pipeline,
**so that** every AI-generated insight (in-brief summaries, brand territory labels, themes sentiment labels) is consistently produced in the language explicitly chosen by the user for their analysis.

---

## Acceptance Criteria
**AC1 — **`insights_language` persisted on report creation

- Given: an Editor creates a new analysis via the wizard
- When: the wizard submits the configuration
- Then: the `insights_language` value selected in Step 1 is stored on the report and returned in the report detail and scope responses

**AC2 — **`insights_language` editable on existing reports

- Given: an Editor opens Manage Scope on an existing report
- When: they change and confirm the AI insights language
- Then: the new value is persisted immediately and returned in subsequent scope responses

**AC3 — In-brief summaries produced in **`insights_language`

- Given: an analysis has `insights_language = "fr"`
- When: any user (regardless of their own UI language) views an in-brief summary for that report
- Then: the summary text is in French

**AC4 — In-brief language is fixed per analysis**

- Given: two users with different UI languages viewing the same report
- When: they both open the in-brief summary
- Then: both see the same language — the report's `insights_language` — not their respective UI languages

**AC5 — Perception concepts extracted in **`insights_language`

- Given: an analysis has `insights_language = "es"`
- When: the enrichment pipeline extracts perception concepts after batch completion
- Then: the concept names (brand territory labels, themes sentiment labels) are in Spanish

**AC6 — Each analysis has its own **`insights_language`

- Given: an organisation with two analyses — one `insights_language = "en"`, another `insights_language = "fr"`
- When: both analyses complete
- Then: in-brief summaries and concept labels are in English for the first, French for the second

---

## Technical Details
Key files: Flyway `V2.7.0`, `Report.java`, `CreateReportRequest`, `ScopeResponse`, `ReportDetailResponse`, `PATCH /api/v1/reports/{id}/insights-language`, `ExecutiveSummaryService`, `PerceptionSummaryService`, `OverviewController`, `ConceptExtractionService`, `PerceptionEnrichmentService`.

📋 Spec complète : [30-1-backend-insights-language.md](https://github.com/AirPR/geo-analytics/blob/feature/GEO-656-ai-insights-language/docs/implementation-artifacts/epics/epic-30/30-1-backend-insights-language.md)

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-656
- Story: https://onclusive.atlassian.net/browse/GEO-867
