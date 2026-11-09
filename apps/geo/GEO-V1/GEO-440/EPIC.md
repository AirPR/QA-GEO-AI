# Design Updates (fix version 0.4)

**Epic ID:** GEO-440
**Statut:** 🟨 In Progress
**Assigné à:** Youssef.AitLaydi
**Créée le:** 2026-05-14
**Mise à jour:** 2026-05-18
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-440

## Description / Functional Need

Consolidated EPIC grouping all design-related stories, tasks, and bugs targeted for fix version 0.4. Replaces the previous Design QA - Batch #01 (GEO-337) and Design QA - Batch #02 (GEO-406) containers.

## Scope

- LLM ordering standardisation (ChatGPT, Gemini, Grok, Claude, Perplexity everywhere)
- Onboarding wizard UX improvements (step indicator, question type explanations, AI engines message)
- Category view bug fixes (LLM buttons visibility, Citation Signal cards accordion)
- Manage Scope bug fixes (Brand Image delete affordance, Add Market helper text)
- Report list bug fixes (brand logos display and mismatch)
- KPI and Brand Rankings tooltips (SOV trim, Visibility / Avg Position / LLM Choice addition)
- Chart interaction fixes (quadrant blue selection box)
- Corporate Reputation expand alignment with Questions table
- Report structural refactor (layout / visual)
- Last analysis screen design (replace loading stage)
- Category suggestion delete UX improvement
- Primary market hover tooltip
- Homepage and empty state terminology rename: Reports → Analysis
- Scrollbar visibility accessibility fix
- Top Concepts panel source items clickability and LLM logo display
- Citation Sources scroll and resize fix

## Out of Scope

- Data fetching or component contract changes (structural refactor story GEO-445)
- Rewriting non-applicable body copy in empty state beyond Report/Reports → Analysis/Analyses rename (GEO-482)

## Stories Associées

| Story | ID Jira | Type | Titre | Statut |
|-------|---------|------|-------|--------|
| Story 1 | GEO-355 | Story | [LLM order] Reorder LLM list to ChatGPT, Gemini, Grok, Claude, Perplexity (everywhere) | ⏳ Ready for QA |
| Story 2 | GEO-358 | Story | [Onboarding step 3] Surface explanations of the 4 question types | ⏳ Ready for QA |
| Bug 1 | GEO-367 | Bug | [GEO-Category] 5 LLM logo buttons not visible correctly after expanding a row | 🔴 Abandoned |
| Bug 2 | GEO-368 | Bug | [GEO-Category] Multiple Citation Signal cards stay expanded simultaneously | ✅ Passed QA |
| Bug 3 | GEO-378 | Bug | [GEO-Manage-scope] Brand Image questions retain empty entries and lack delete option | ✅ Passed QA |
| Bug 4 | GEO-385 | Bug | [GEO-Report-list] Brand logos display letter placeholders instead of actual logos | ✅ Passed QA |
| Bug 5 | GEO-386 | Bug | [GEO-Report-list] Brand logo mismatch between Reports list and Overview header | ✅ Passed QA |
| Task 1 | GEO-389 | Task | Trim SOV tooltip and add Visibility / Avg Position / LLM Choice tooltips to Brand Rankings | ⏳ Ready for QA |
| Bug 6 | GEO-391 | Bug | Misleading "max AI engines reached" message when all 5 LLMs selected | ✅ Passed QA |
| Bug 7 | GEO-392 | Bug | Clicking quadrant fills or plot area draws unintended blue selection box | ✅ Passed QA |
| Bug 8 | GEO-395 | Bug | Corporate Reputation expand — LLM tabs issues (tooltip, design, order) | 🔴 Abandoned |
| Design 1 | GEO-399 | Design Task | Design - [Onboarding step 3] Surface explanations of the 4 question types | ✅ Done |
| Bug 9 | GEO-405 | Bug | [GEO-Manage-scope] Add Market helper text mentions non-existent 'edit icon' | ✅ Passed QA |
| Bug 10 | GEO-415 | Bug | Onboarding step indicator highlights Step 1 and Step 2 simultaneously | ✅ Passed QA |
| Story 3 | GEO-442 | Story | Issue #10: Citation Signal card expanding resizes all others and creates scroll | 🟨 Action Needed |
| Story 4 | GEO-443 | Story | Issue #9: Top Concepts sources in details panel | ✅ Passed QA |
| Story 5 | GEO-444 | Story | Issue #11: Scroll bar visibility | ✅ Passed QA |
| Story 6 | GEO-445 | Story | GEO Analytics report — structural refactor (layout / visual) | ⏳ Ready for QA |
| Story 7 | GEO-446 | Story | Design "Last analysis" screen to replace loading stage | 🟨 Requirements Needed |
| Story 8 | GEO-447 | Story | Category suggestion - more visible delete + review confirmation dialog | ⏳ Backlog |
| Story 9 | GEO-448 | Story | Add hover tooltip explaining "Primary market" | ✅ Ready for Release |
| Design 2 | GEO-449 | Design Task | Design "Last analysis" screen to replace loading stage | 🟨 In Progress |
| Design 3 | GEO-451 | Design Task | Design - Category suggestion — more visible delete + review confirmation dialog | 🟨 In Progress |
| Story 10 | GEO-460 | Story | Rename homepage "Reports" header to "Analysis" | ✅ Passed QA |
| Bug 11 | GEO-482 | Bug | Empty state for "no analyses" uses "Reports" instead of "Analysis" | ⏳ Ready for QA |

## Acceptance Criteria — Synthèse

Aggregated from child stories and bugs:

- **GEO-355:** LLM list in all surfaces follows the canonical order ChatGPT, Gemini, Grok, Claude, Perplexity.
- **GEO-358:** Each of the 4 question-type sections in the onboarding wizard shows an explanation with description and example prompt.
- **GEO-368:** Only one Citation Signal card stays expanded at a time in the AI Citation Source Details panel.
- **GEO-378:** Brand Image questions have a proper delete affordance; empty entries do not persist.
- **GEO-385 / GEO-386:** Actual brand logos displayed in Reports list; logo is consistent between list row and report header.
- **GEO-389:** SOV tooltip trimmed on KPI cards and Brand Rankings; Visibility / Avg Position / LLM Choice tooltips added to table column headers.
- **GEO-391:** No misleading "contact sales" message when all available LLMs are selected.
- **GEO-392:** No blue selection box appears when clicking quadrant fills or chart plot area.
- **GEO-405:** Add Market helper text references the dropdown interaction, not a non-existent edit icon.
- **GEO-415:** Only the current onboarding step is highlighted in the step indicator.
- **GEO-448:** Hover tooltip on "Primary market" label reads "Reference market for category names displayed in the analysis."
- **GEO-460 / GEO-482:** All user-facing occurrences of "Reports" / "Report" on the homepage and empty state replaced with "Analysis" / "Analyses".

## Liens

- 🔗 Epic : https://onclusive.atlassian.net/browse/GEO-440
- 🔗 GEO-355 : https://onclusive.atlassian.net/browse/GEO-355
- 🔗 GEO-358 : https://onclusive.atlassian.net/browse/GEO-358
- 🔗 GEO-367 : https://onclusive.atlassian.net/browse/GEO-367
- 🔗 GEO-368 : https://onclusive.atlassian.net/browse/GEO-368
- 🔗 GEO-378 : https://onclusive.atlassian.net/browse/GEO-378
- 🔗 GEO-385 : https://onclusive.atlassian.net/browse/GEO-385
- 🔗 GEO-386 : https://onclusive.atlassian.net/browse/GEO-386
- 🔗 GEO-389 : https://onclusive.atlassian.net/browse/GEO-389
- 🔗 GEO-391 : https://onclusive.atlassian.net/browse/GEO-391
- 🔗 GEO-392 : https://onclusive.atlassian.net/browse/GEO-392
- 🔗 GEO-395 : https://onclusive.atlassian.net/browse/GEO-395
- 🔗 GEO-399 : https://onclusive.atlassian.net/browse/GEO-399
- 🔗 GEO-405 : https://onclusive.atlassian.net/browse/GEO-405
- 🔗 GEO-415 : https://onclusive.atlassian.net/browse/GEO-415
- 🔗 GEO-442 : https://onclusive.atlassian.net/browse/GEO-442
- 🔗 GEO-443 : https://onclusive.atlassian.net/browse/GEO-443
- 🔗 GEO-444 : https://onclusive.atlassian.net/browse/GEO-444
- 🔗 GEO-445 : https://onclusive.atlassian.net/browse/GEO-445
- 🔗 GEO-446 : https://onclusive.atlassian.net/browse/GEO-446
- 🔗 GEO-447 : https://onclusive.atlassian.net/browse/GEO-447
- 🔗 GEO-448 : https://onclusive.atlassian.net/browse/GEO-448
- 🔗 GEO-449 : https://onclusive.atlassian.net/browse/GEO-449
- 🔗 GEO-451 : https://onclusive.atlassian.net/browse/GEO-451
- 🔗 GEO-460 : https://onclusive.atlassian.net/browse/GEO-460
- 🔗 GEO-482 : https://onclusive.atlassian.net/browse/GEO-482
- 🔗 Projet : https://onclusive.atlassian.net/browse/GEO
