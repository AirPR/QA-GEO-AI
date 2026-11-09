# GEO-724: User Story 11.3: Excel workbook export

**Story:** GEO-724
**Statut:** [DONE] Passed QA
**Assigne:** Abdenasser Aroukhsiss
**Epic:** GEO-156
**Cree:** 2026-06-19
**Jira:** https://onclusive.atlassian.net/browse/GEO-724

## User Story
As a **user**, I want to export my analysis as an Excel workbook, so that I can explore the underlying data, build my own views, and use the raw LLM responses for downstream analysis.

---

## Acceptance Criteria
**AC1 — Workbook structure (5 tabs)**

- **Given** an analysis with results, **When** I export to Excel, **Then** I receive a workbook with these sheets:

| Sheet | Contents | Cap|
| Overview | Identity (In-Brief, corporate reputation, brand territory, top concepts), Performance (KPI metrics, category prioritization, brand rankings), Sources (media-type split, top domains) | Brand rankings top 10|
| Brand Pillars | 4 dimensions (Brand Image, Employer Brand, ESG/Sustainability, Leadership) x engine; each row: dimension, engine, sentiment, insights, Source URLs (pipe-separated), Source Domains (pipe-separated) | 4 dimensions|
| One tab per category | Same spine as Overview, scoped to that category | Brand rankings top 10|
| Raw Data | One row per question x engine: snapshot, country, category, type, question, engine, favorability, sentiment, themes, full response (type-aware), Source URLs (pipe-separated), Source Domains (pipe-separated) | Ranking text capped at top 10 entries|

**AC2 — Type-aware Raw Data responses**

- **Given** the Raw Data sheet, **When** I open it, **Then** visibility questions show no prose answer; competitive answers carry comparison prose + winner + ranking; perception answers carry the full free text.

**AC3 — Pipe-separated sources**

- **Given** the source columns in Raw Data, **When** I load the workbook into spreadsheet tooling, **Then** Source URLs and Source Domains are pipe-separated so they can be split into rows for analysis.

**AC4 — Ranking format in Raw Data**

- **Given** a visibility or competitive row, **When** I read the ranking, **Then** it is formatted as "1. Brand (chosen) — 2. Brand * — 3. Brand …" where * marks the target brand and "(chosen)" marks the engine's top pick.

**AC5 — XLS UX flows**

Three alternative flows are designed. Engineering must benchmark real export size and generation time, then implement the matching flow(s):

- **Flow A — Fast / Low Volume:** "Your export has started. It will be ready soon" toast → completion toast with "Download Export" + email copy. No modals.
- **Flow B — High Volume (volume > cap):** "Export spreadsheet?" modal warns about cap. Actions: Cancel / Export anyway. Completion toast restates the cap.
- **Flow C — Slow Export:** Started toast → "We'll email your export" modal → email delivery + optional inline completion toast if user is still on the page.

Copy corrections vs Figma mock (annotation card 06):

- "Your expert has completed" → "Your export has completed"
- "Domaines" → "domains"

---

## Technical Details
N/A

## Liens
- Epic: https://onclusive.atlassian.net/browse/GEO-156
- Story: https://onclusive.atlassian.net/browse/GEO-724
