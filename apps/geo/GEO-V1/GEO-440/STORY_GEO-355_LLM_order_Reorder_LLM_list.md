# Story 1: [LLM order] Reorder LLM list to ChatGPT, Gemini, Grok, Claude, Perplexity (everywhere)

**Story ID:** GEO-355
**Titre:** [LLM order] Reorder LLM list to ChatGPT, Gemini, Grok, Claude, Perplexity (everywhere)
**Type:** Story
**Statut:** ⏳ Ready for QA
**Assigné à:** Youssef.AitLaydi
**Epic:** GEO-440 (Design Updates fix version 0.4)
**Créée le:** 2026-05-08
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-355

## Summary

When viewing the question detail panel from the unified questions table (and everywhere else LLMs are listed: LLM Engine filter dropdown, Brand Rankings, AI Citation Sources, Settings), the LLM order should be ChatGPT, Gemini, Grok, Claude, Perplexity. Currently Gemini comes first.

## User Story

We want ChatGPT first because it's the most-used LLM and the most familiar reference point for users reviewing answers. The order is centralized in a single constant; changing it there propagates everywhere — desired behavior for consistency.

## Steps to Reproduce (current state)

1. Open any completed report
2. Navigate to the Questions view
3. Click any question row to open the detail panel
4. Look at the order of the LLM sections / columns
5. Also open the LLM Engine filter dropdown in the report header and look at the toggle order

**Expected:** All LLM lists appear in the order: ChatGPT, Gemini, Grok, Claude, Perplexity.
**Actual:** LLM lists appear in the order: Gemini, ChatGPT, Grok, Claude, Perplexity.

## Acceptance Criteria

**AC1 — Question detail panel LLM order**
- **Given** I open the question detail panel
- **When** the panel renders the per-LLM responses
- **Then** the order is ChatGPT, Gemini, Grok, Claude, Perplexity

**AC2 — LLM Engine filter dropdown order**
- **Given** I open the LLM Engine filter dropdown in the report header
- **When** the toggles render
- **Then** they appear in the same order

**AC3 — All other LLM surfaces**
- **Given** I view any other surface that lists LLMs (Brand Rankings, AI Citation Sources, Settings)
- **When** LLMs are displayed
- **Then** they follow the same ChatGPT-first order

## Technical Details

- **Constant:** `LLM_PROVIDER_ORDER` in `/frontend/src/config/llmConfig.js`
- **Current value:** `['gemini', 'openai', 'grok', 'claude', 'perplexity']`
- **New value:** `['openai', 'gemini', 'grok', 'claude', 'perplexity']`
- This single edit propagates to all consumers: UnifiedQuestionsTable detail panel, LLM Engine filter dropdown, BrandRankingTable, UnifiedCitationSources, SettingsViewV2, etc. No per-component overrides needed.

## Dépendances

- **Bloque :** GEO-395 (Corporate Reputation expand LLM order alignment)

## Liens

- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-440
- 🔗 Story Jira : https://onclusive.atlassian.net/browse/GEO-355
