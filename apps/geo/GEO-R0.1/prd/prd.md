---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain-skipped', 'step-06-innovation-skipped', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete', 'step-e-01-discovery', 'step-e-02-review', 'step-e-03-edit']
lastEdited: '2026-03-16'
editHistory:
  - date: '2026-03-16'
    changes: 'PM feedback integration: FR38 expanded from 3 to 8 improvement area types with severity thresholds (Critical/Warning/Info), special rules (favorability>=95% clears competitive, max 3 reputation items). FR38b added for Actions Center market filter. FR26 enriched with markets/categories count and sorting/filtering. FR26b added last refresh date.'
  - date: '2026-03-11'
    changes: 'Removed Journey 5 (Ahmed/Monitoring), Admin role, Platform Ops (FR85-FR90). Generalized LLM refs. Removed technical details (pipeline DAG, system instructions table, rate limit internals, NFR18b-e). Aligned PRD with processing_v2: FR32 5 KPIs (+Sentiment), FR33 axes/quadrants corrected (Stars/Opportunity/At Risk/Monitor), FR38 3 issue types specified, FR82b Sentiment formula added, FR31 4 hierarchical levels, FR36 frequency+quotes, FR37 favorability rules+panel detail, FR45 favorability rules per type.'
  - date: '2026-03-05'
    changes: 'Changelog integration: FR31 on-demand perception summaries, FR29 LLM filtering scope extended, FR74 email notification content enriched, FR46b Category View scope clarification'
classification:
  projectType: 'SaaS B2B'
  domain: 'MarTech / AI Brand Intelligence'
  complexity: 'medium'
  projectContext: 'brownfield'
inputDocuments:
  - docs/product-specification.md
  - docs/index.md
  - docs/project-overview.md
  - docs/TECHNICAL_DOCUMENTATION.md
  - docs/ARCHITECTURE.md
  - docs/METRICS_CALCULATIONS.md
  - docs/COMPETITIVE_ANALYSIS.md
  - docs/PRODUCTION_ARCHITECTURE.md
  - docs/PRICING_STRATEGY.md
  - docs/integration-architecture.md
  - docs/api-contracts-backend.md
  - docs/data-models-backend.md
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 39
projectType: 'brownfield'
prioritySource: 'docs/product-specification.md'
---

# Product Requirements Document - AI Presence

**Author:** OS-Team
**Date:** 2026-03-04

## Executive Summary

AI Presence is a SaaS platform that gives PR and communications teams visibility into how their brand appears across AI search engines — and a concrete action plan to improve it.

AI search engines are reshaping how consumers discover and evaluate brands. PR teams currently have no way to know how these engines rank their brand, what sources they cite, or why a competitor appears first. AI Presence solves this by querying multiple LLM providers in parallel with structured prompts, aggregating results into visibility rankings, competitive positioning, and reputation analysis — all broken down by market and product/service category.

The target user is a PR/comms lead responsible for brand reputation. Their workflow with AI Presence:

1. **Configure (V1)** — Define brand, markets, categories, and questions
2. **Analyze (V2)** — AI Presence queries multiple LLMs in parallel, classifies cited sources, detects areas of improvement
3. **Diagnose (V2)** — See visibility rankings, competitive win/loss rates, reputation topics per market and category
4. **Act (V2)** — Use Improvement Areas and Priority Source Targets as an outreach plan: specific publications and domains to contact, prioritized by impact
5. **Track (V2)** — Scheduled weekly execution provides fresh snapshots to measure whether outreach is moving the needle

This PRD documents the product specification for production. V1 delivers report configuration, V2 adds processing and dashboard. A development team will use it to build the product incrementally.

### What Makes This Special

AI Presence is the only tool in the market that closes the loop from monitoring to action. Competitors (Profound, Peec, Meltwater, Talkwalker) show dashboards of brand visibility across AI engines. AI Presence shows that AND tells you exactly which third-party sources to target — because AI search engines don't generate answers from nothing. They cite specific publications, review sites, and content. If a source is cited by ChatGPT and Gemini in your category but doesn't mention your brand, that's a gap. AI Presence finds those gaps, prioritizes them by impact, and gives your PR team a ranked outreach list.

Key capabilities no competitor offers:

- **Priority Source Targets** — Domain-level prioritization with gap analysis, per-LLM citation tracking, and impact scoring
- **Areas of Improvement Detection** — Identifies visibility drops, competitive losses, and reputation risks with scoped source recommendations
- **Category-Based Analysis** — Multi-category per market analysis with cross-language matching (e.g., "Solar Energy" in en-US maps to "Energie Solaire" in fr-FR)
- **4-Level Perception Summaries** — AI-generated summaries at global, per-market, per-category, and per-category-per-market levels
- **11-Category Source Classification** — Most granular source taxonomy in the market (Corporate, Journalism, Government/NGO, Academic, Owned, Competitor, etc.)

## Project Classification

| Attribute           | Value                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Project Type**    | SaaS B2B — multi-tenant platform with tiered subscriptions                                                                      |
| **Domain**          | MarTech / AI Search Intelligence                                                                                                |
| **Complexity**      | Medium-High — multi-LLM orchestration, source attribution, metric aggregation with cross-market penalties                       |
| **Project Context** | Brownfield — working MVP exists, this PRD serves as handover spec for production rebuild                                        |
| **V1 Scope**        | Report configuration only (auth, wizard, quota, report list). Processing and dashboard in V2. |
| **V2 Scope**        | Scheduled execution (weekly cron), dashboard, metrics, manage scope, notifications, export. No time evolution comparison or trend analysis. |

## Success Criteria

### User Success

- **First-time value (V1):** PR lead can configure a full report (brand, markets, categories, questions, LLMs) in under 10 minutes
- **First results (V2):** PR lead receives first analysis results within 2-6 minutes of initial configuration, with immediately actionable Priority Source Targets
- **"Aha" moment (V2):** User sees specific publications and domains cited by AI search engines in their category that don't mention their brand — "These are the sources I need to contact"
- **Mid-term value (V2):** After outreach to discovered sources, user sees improved visibility metrics on subsequent weekly executions
- **Ongoing engagement (V2):** Weekly email notifications with refreshed report

### Business Success

- Pricing model defined ($150-$3,000/mo across 4 tiers) but launch targets and retention KPIs are TBD
- Product must support tiered structure: from Starter (limited LLMs, markets, categories) through Enterprise (all LLMs, multiple markets, multiple categories per market)

### Technical Success

- **V1:** Multi-tenancy, Auth0 SSO, quota validation, report configuration persistence
- **V2:** Analysis execution (2-6 minutes per report), scheduled weekly execution, email notifications, dashboard
- **Scaling and infrastructure decisions** deferred to dev team

### Measurable Outcomes

| Outcome                  | Target                                                | Version |
| ------------------------ | ----------------------------------------------------- | ------- |
| Report configuration time | Under 10 minutes for a full setup                    | V1      |
| Analysis completion time | 2-6 minutes (all enabled LLMs, all markets)           | V2      |
| Report email delivery    | Within 1 minute of analysis completion                | V2      |
| Weekly execution         | Automated, same-day completion for all active reports | V2      |
| LLM provider support     | All enabled providers executing in parallel           | V2      |

## Product Scope & Phased Development

### Strategy

**Approach:** Production-ready rebuild. The existing MVP has validated product-market fit. The production system is built incrementally: V1 delivers configuration, V2 delivers processing and dashboard, V3 adds advanced features. Multi-tenant architecture is a foundational requirement from V1.

**Key Principle:** No feature regression from the current MVP by the end of V2. Every capability users have today must exist, plus new multi-tenant, scheduling, and historical features.

### V1 — Report Configuration

- Module activation gate (Mesure module check, sales redirect)
- Multi-tenant architecture with Auth0 authentication
- Role-based access (Editor, Reader)
- 4-step onboarding wizard (brand, markets, categories, prompts)
- Quota management with double validation (brand × market, categories, questions per type, LLMs)
- Report list (status, creation date)

### V2 — Processing + Dashboard

- Scheduled weekly execution (cron) + immediate execution on first configuration
- Multi-LLM parallel analysis (extensible provider list)
- Dashboard: Overview, Actions Center, Category Views (with integrated perception analysis)
- Anomaly detection with Priority Source Targets
- AI Perception Summary (global + per-market + per-category)
- Brand family normalization (AI-powered entity grouping)
- 11-category source classification
- Executive summary generation
- Brand Rankings with SOV, Visibility, Avg Position, LLM Choice, Sentiment metrics
- Category Prioritization Matrix (SOV × Competitiveness)
- Improvement Areas with severity, type, and source targets
- Unified Questions Tables (visibility + competitive + perception)
- Incremental analysis (add market, category)
- Manage Scope (markets, categories, LLM engine toggles)
- Shared reports (read-only, token-based, no auth required)
- PPTX/PDF export
- Email notifications (on analysis execution completion)

### V3 — Advanced Features

- Snapshot navigation (browse previous weekly snapshots, no trend analysis)
- Guided tour

### Future Phases

**Growth:**
- Time evolution / week-over-week comparison analysis
- Additional LLM providers (AI Overviews, AI Mode, Copilot, DeepSeek, Meta AI)
- Content optimization recommendations
- Answer accuracy validation
- API access for programmatic retrieval
- Slack integration for notifications
- Alerting system (significant change detection between scheduled runs)

**Expansion:**
- Traffic attribution (AI visibility → business outcomes)
- Automated outreach workflows
- AI crawler analytics
- Predictive visibility modeling
- White-label agency offering
- Competitive benchmarking across organizations (anonymized)
- Custom LLM provider support (bring your own model)

### Risk Mitigation

**Technical Risks:**

| Risk | Impact | Mitigation |
|------|--------|------------|
| LLM API changes (pricing, rate limits, response format) | Analysis breaks or costs spike | Abstract LLM integration behind Prompt API; monitor API changelogs; budget for provider cost fluctuations |
| Analysis timeout at scale (many tenants refreshing weekly) | Failed refreshes, degraded experience | Staggered scheduling with retry logic; queue-based processing; per-tenant rate limit budgets |
| Brand normalization accuracy | Wrong entities grouped, bad metrics | AI-powered grouping with domain hints (proven in MVP); fallback to entity-as-own-brand if grouping confidence low |
| Source classification errors | Wrong recommendations in Priority Source Targets | 11-category taxonomy validated in MVP; confidence scoring on classifications |

**Market Risks:**

| Risk | Impact | Mitigation |
|------|--------|------------|
| LLM providers restrict web search APIs | Core analysis capability lost | Multi-provider redundancy; at least 2 must work for viable analysis |
| Competitor (Profound) adds source targeting | Differentiation eroded | Depth of analysis (category-based, 4-level summaries, 11-category taxonomy) is hard to replicate quickly |

**Resource Risks:**

| Risk | Impact | Mitigation |
|------|--------|------------|
| Dev team unfamiliar with LLM orchestration patterns | Slow rebuild | This PRD + MVP codebase as reference implementation; LLM response schemas documented |
| Prompt engineering complexity underestimated | Poor analysis quality | Existing prompts are proven — port prompt logic, don't rewrite from scratch |
| LLM API costs scale with usage | Cost overrun | Quota system directly controls cost exposure per organization |

## User Journeys

### Journey 1: Sarah — In-House PR Lead, First Report Setup

**Who:** Sarah is Head of Communications at a mid-size B2B SaaS company. She's been hearing that prospects say "ChatGPT recommended your competitor" in sales calls. She has no idea how her brand appears in AI search engines or what to do about it.

**Opening Scene:** Sarah logs into AI Presence via SSO. She's greeted by the onboarding wizard. She enters her company name, selects 3 markets (US, UK, France), and AI Presence's AI suggests 4 product categories relevant to her brand. She reviews the suggested categories, keeps 3, and removes one that's not a priority. For each category, AI Presence generates 10 visibility, 10 competitive, and 10 perception questions. She tweaks a few to match her brand's positioning and adds 2 custom competitive questions. She submits the configuration.

**Rising Action:** 4 minutes later, she receives an email: "Your AI Presence report is ready." She opens the Overview and immediately sees her brand is ranked #4 on average across AI engines, with 38% visibility. Her main competitor is #1. She drills into her top category and sees the Brand Prioritization Matrix — her competitor has 2x her Share of Voice.

**Climax:** She opens the Actions Center and sees 12 Areas of Improvement. The Priority Source Targets show 8 publications that are cited by ChatGPT and Gemini in her category but never mention her brand. Three of them are industry publications she already has relationships with. She realizes: "I just need to pitch these 3 editors and I can move the needle."

**Resolution:** Sarah assigns her UK team member to focus on the UK-specific sources, sends the French market findings to her Paris colleague, and personally reaches out to the 3 US publications. Next Monday, the weekly refresh runs automatically. Over the following weeks, she tracks whether her outreach is improving visibility.

**Capabilities revealed**: Onboarding wizard, AI category discovery, question customization, analysis execution with progress/email, Overview dashboard, Actions Center, Priority Source Targets, multi-market filtering.

---

### Journey 2: Marcus — Team Member, Category Specialist

**Who:** Marcus handles product PR for the "Cloud Infrastructure" category at the same company. Sarah set up the report; Marcus focuses on his category across all markets.

**Opening Scene:** Marcus receives the weekly refresh email and logs in. He navigates to the "Cloud Infrastructure" category view via the sidebar.

**Rising Action:** He sees his brand's visibility dropped from 45% to 32% this week. The perception analysis shows a new negative topic: "reliability concerns" — likely triggered by a recent outage that got press coverage. He checks the AI Citation Sources and sees 3 tech journalism outlets are now citing a competitor case study that wasn't there last week.

**Climax:** He opens the Areas of Improvement for his category and sees the specific publications driving the negative shift. The Priority Source Targets highlight 2 domains where a positive feature article could counterbalance the narrative. He also notices a source he'd contacted last month is now citing his brand — confirming the outreach strategy works.

**Resolution:** Marcus drafts a pitch for the 2 target publications, coordinates with the product team on a reliability post-mortem blog, and flags the reputation shift to Sarah in their weekly sync. He'll check the next refresh to see if the narrative improves.

**Capabilities revealed**: Category View navigation, perception analysis, AI Citation Sources, Areas of Improvement per category, weekly refresh email.

---

### Journey 3: Elena — PR Agency Account Manager

**Who:** Elena runs the digital PR practice at a mid-size agency. She manages 8 client accounts and needs to demonstrate measurable value to retain them.

**Opening Scene:** Elena logs in and sees her report list — one per client. She's preparing for a quarterly review with her biggest client, a consumer electronics brand. She opens that client's report.

**Rising Action:** She reviews the Overview across the client's 5 markets. The Brand Prioritization Matrix shows strong performance in the US and Germany but poor visibility in Japan and Brazil. She drills into the Japan category view and sees the client is not ranked at all in 3 out of 5 categories — while local competitors dominate.

**Climax:** She opens the Actions Center and exports the Priority Source Targets for Japan. The tool shows 6 Japanese tech publications that are heavily cited by AI engines but don't mention her client. She now has a concrete, data-backed expansion plan to pitch: "Here are the 6 publications we need to target in Japan to get your brand into AI search results."

**Resolution:** Elena presents the findings in the quarterly review. The client approves a Japan PR campaign targeting the identified sources. Elena repeats this process for each of her 8 clients, using the weekly refresh cadence to track campaign effectiveness and report measurable improvement to each client.

**Capabilities revealed**: Multi-report management (report list), cross-market comparison, Priority Source Targets export/presentation, per-client isolation.

---

### Journey 4: Team Collaboration — Weekly Refresh Cycle

**Who:** The full team — Sarah (lead), Marcus (category specialist), and 2 other team members covering different markets.

**Opening Scene:** Monday morning. AI Presence's weekly auto-refresh ran overnight. All 4 team members receive an email notification: "Your AI Presence report has been refreshed."

**Rising Action:** Each team member opens the report and navigates to their area of focus. Sarah checks the Overview for the big picture. Marcus checks Cloud Infrastructure. The UK team member checks all UK-market category views. The French team member checks French market results.

**Climax:** They meet for a 15-minute sync. Each person reports what changed in their scope — which sources are now citing the brand, which new areas of improvement appeared, and which outreach efforts seem to be working based on improved metrics.

**Resolution:** The team updates their outreach priorities for the week, using the refreshed Priority Source Targets as their action plan. The cycle repeats every Monday.

**Capabilities revealed**: Weekly auto-refresh, email notifications to all editors, per-user scope focus (category/market), report as shared team workspace.

---

### Journey → Capability Traceability

| Capability Area | Journeys | Version |
|----------------|----------|---------|
| Auth0 authentication | J1 | V1 |
| Module activation gate (Mesure) | J1 | V1 |
| Onboarding wizard (brand, markets, categories, prompts) | J1 | V1 |
| Quota management | J1, J2, J3 | V1 |
| Report list | J1, J3 | V1 |
| Multi-LLM parallel analysis | J1, J2 | V2 |
| Dashboard views (Overview, Actions Center, Category) | J1, J2, J3, J4 | V2 |
| Anomaly detection & Priority Source Targets | J1, J2, J3 | V2 |
| Scheduled weekly execution | J2, J3, J4 | V2 |
| Incremental analysis (add market/category) | J2 | V2 |
| Manage Scope | J2 | V2 |
| Multi-report management (per-client isolation) | J3 | V2 |
| Shared reports (read-only, token-based) | J1, J4 | V2 |
| Export PPTX/PDF | J1, J3 | V2 |
| Market/LLM filtering | J2, J3 | V2 |
| Analysis completion notification | J4 | V2 |
| Snapshot navigation (browse previous snapshots) | J2 | V3 |

## SaaS B2B Requirements

### Multi-Tenant Model

- Each organization operates in complete data isolation — no cross-organization data visibility
- Organization context is resolved via Auth0 authentication token
- All resources (reports, brands, markets, categories) are scoped to the organization

### Permission Model

| Capability | Editor | Reader |
|-----------|:---:|:---:|
| Create/edit/delete report configurations | ✅ | ❌ |
| Add/remove markets, categories | ✅ | ❌ |
| Configure LLM engines | ✅ | ❌ |
| Share reports (generate links) | ✅ | ❌ |
| Export PPTX/PDF | ✅ | ✅ |
| View dashboard & all report views | ✅ | ✅ |
| Filter by market, LLM, category | ✅ | ✅ |
| Access shared report links | ✅ | ✅ |

### Quota Management

- **Quota unit**: 1 brand × 1 market = 1 quota. Additional quotas for questions and categories per package
- **Quota visibility**: Users see remaining quota in Manage Scope before consuming
- **At-quota behavior**: UI displays remaining quota; adding blocked when limit reached
- **At-limit behavior**: Users are notified they cannot add new brands/markets — no hard block on existing scheduled analyses
- **Quota administration**: Managed externally on a separate administration platform

### Notifications & Integrations

- **Email notifications** (V2):
  - Analysis execution completed — first-time or scheduled weekly (with key metrics and perception summary)
  - Quota near-exhaustion warning (80% and 100%)

| Integration | Purpose | V1 Status |
|-------------|---------|-----------|
| **Auth0** | SSO authentication | V1 — Required |
| **Prompt API** (internal ML service) | LLM gateway — routes all calls to configured providers (wizard in V1, batch in V2) | V1/V2 — Required |
| **Brand logo service** | Brand logos in UI (Brandfetch or equivalent) | V1 — Nice-to-have |
| **Email service** | Notifications (analysis execution complete, quota warning) | V2 — Required, provider at dev team's discretion |
| CRM, Slack, GA, Jira | — | Not planned |

### External Dependencies

- Organization onboarding depends on external admin platform provisioning (Auth0 org, quota assignment)
- Shared report links remain accessible without authentication — token-based access is independent of org context (V2)
- Scheduled weekly execution runs automatically for all active reports — no quota check gates the execution (V2)

## Functional Requirements

### Priority Legend

| Priority | Meaning | Scope |
|----------|---------|-------|
| **V1** | First release — configuration only | Auth, Module Activation, Setup Wizard (4 steps), Quota Validation, Report List |
| **V2** | Second release — processing + dashboard | Scheduled Execution (Weekly Cron), Dashboard, Overview, Category View (with perception), Actions Center, Metrics, Manage Scope, Incremental Analysis, Notifications, Sharing & Export |
| **V3** | Post-V2 — planned but not blocking | Snapshot Navigation, Guided Tour |

### Authentication & Organization Context [V1]

- FR0: When user accesses the Mesure module, system checks if the module is activated for their organization. If not activated → redirect to sales page. If activated and no configuration exists → display empty state with "Create Report" button.
- FR1: Editor can log in via Auth0 and access only their organization's data
- FR2: Reader can log in via Auth0 and access their organization's data in read-only mode
- FR3: System resolves organization context from the authenticated user's token
- FR4: Unauthenticated users can access shared reports via token-based links

### Analysis Setup (Onboarding Wizard) [V1]

- FR5: Editor can search and select a brand with auto-completed suggestions (logo + domain)
  - *AC:* Real-time autocomplete with brand name + logo/favicon + domain. If no match, user can enter a custom brand name. Empty brand at "Discover Categories" → error.
- FR6: Editor can add multiple markets (country + language) with auto-detected language
  - *AC:* Country selection auto-fills the primary official language (overridable). Minimum 1 market required. Maximum enforced by quota (`max_brand_markets`). Duplicate country+language pairs rejected with error. Market removal is undoable.
- FR7: Editor can designate one market as primary
  - *AC:* First market added is automatically Primary. Only one Primary at a time — selecting another switches it. Primary market determines the source language for category names and translations.
- FR8: Editor can trigger AI-based category discovery for the selected brand
  - *AC:* AI returns categories labeled "AI GENERATED". User can view translations per category. If AI returns 0 categories → empty state prompting to add a custom category. Empty category list at "Review Prompts" click → error, no navigation.
- FR9: Editor can add custom categories with automatic AI translation per market language
  - *AC:* Custom categories labeled "CUSTOM". Category name entered in English, auto-translated to all configured market languages. User can manually override translations.
- FR10: Editor can remove AI-generated or custom categories
  - *AC:* Last-one rule: deletion disabled when only 1 category remains. Deletion requires confirmation.
- FR11: Editor can review and edit auto-generated prompts (perception, visibility, competitive) per market and per category
  - *AC:* Questions organized by market, then by type (Reputation, Visibility Analysis, Competitive Analysis), then by category. 10 default questions per type per category. Questions are editable inline. Auto-punctuation: missing "?" appended automatically. Empty question rejected — restores last saved version.
- FR12: Editor can add or remove individual questions within each prompt type
  - *AC:* User can add questions per category section. Question deletion is undoable. Question count updates in real-time. Max 20 questions per type per market (60 max per market). Beyond limit → user notified and action blocked.
- FR13: Editor can reset questions to default per category
  - *AC:* "Reset" button per category restores all questions to AI-generated defaults, undoing all edits/additions/deletions for that category.
- FR14: Editor can enable or disable each available LLM engine
  - *AC:* Default engines are pre-selected (configurable). User can enable/disable each engine. Minimum 1 engine required — if user disables all, system auto-enables all (smart-select). Maximum enforced by quota (`max_llms`).
- FR15: Editor can review a summary (markets count, categories count, total questions count) before submitting the configuration
  - *AC:* 3 summary cards displayed. Total questions = markets × categories × 30 (default). Reflects actual question count including user additions/deletions.
- FR16: Editor can submit the report configuration from the review step
  - *AC:* "Review & Configure" button triggers atomic save (config + questions + LLM selection). If save fails → nothing persisted, error message. On **first-time configuration** → analysis starts automatically, user redirected to report page with real-time progress. **Subsequent edits** to an existing configuration are saved immediately but results are produced at the next scheduled weekly execution (same day/time as initial configuration).
- FR17: System validates quotas during configuration setup
  - *AC:* Quota brand×market is validated **twice**: at the start of configuration (to show available capacity) and at submission time (to prevent concurrent overcommit by multiple editors in the same organization). If quota is exceeded at submission → save rejected with error, user sees updated quota. Quotas enforced:
    - brand × market count (`max_brand_markets`)
    - categories count (`max_categories`)
    - questions per type per category (`max_q_perception_per_category`, `max_q_visibility_per_category`, `max_q_competitive_per_category`)
    - LLM engines count (`max_llms`)
  - Warning displayed when a limit is reached. Adding disabled at limit.

### Analysis Execution [V2]

- FR18: System executes the analysis pipeline across all enabled LLM providers in parallel
  - *AC:* Each enabled LLM receives all questions. Analysis produces: source classification, brand family grouping, visibility/competitive/perception metrics, competitor detection, semantic clustering, PR insights, Priority Source Targets, and Executive Summary.
- FR18b: System enforces structured JSON output from all LLM providers
  - *AC:* All LLM responses must be valid JSON. Malformed responses are rejected and retried.
- FR19: System displays real-time progress during analysis execution
  - *AC:* On first-time configuration → progress bar visible immediately. On subsequent edits → report shows PENDING status until next scheduled weekly execution.
- FR20: System continues analysis if one LLM provider fails (graceful degradation)
  - *AC:* If some LLMs fail, analysis completes with available results. Report status: COMPLETED if all OK, COMPLETED_PARTIAL if some failed. FAILED only if all LLMs fail. A single LLM being down never causes FAILED.
- FR20b: System normalizes brand entities into brand families using AI-powered grouping with domain hints
  - *AC:* Entity name variants (e.g., "BMW", "BMW Group", "Bayerische Motoren Werke") are grouped into a single brand family. Visibility and competitive metrics are aggregated by brand family, not individual entity strings. Fallback: if grouping confidence is low, entity treated as its own brand family.
- FR20c: System extracts and deduplicates citation sources from all LLM responses
  - *AC:* All URLs cited in LLM responses are extracted and deduplicated by normalized domain. Each unique source retains attribution to which LLM(s) cited it.
- FR20d: System identifies brand-owned and competitor-owned sources separately
  - *AC:* Sources matching the target brand's domain are tagged "Owned". Sources matching a competitor's domain are tagged "Competitor". Classification uses domain hints from brand family grouping (FR20b). Unmatched sources classified per the 11-category taxonomy.
- FR20e: System displays brand logos using a domain-based logo service
  - *AC:* Brand logos fetched from Brandfetch (or equivalent) using the brand's domain. Displayed in Brand Rankings tables, KPI cards, and report list. Fallback: first-letter avatar if logo unavailable.
- FR21: During analysis execution, Editor can navigate away and return to check progress
  - *AC:* Report list shows status badge "Processing X%". Clicking "View" returns to progress page.
- FR25b: System translates questions into each market's language automatically
  - *AC:* Questions authored in the primary market language are auto-translated to all configured market languages. User can override translations in the wizard.
- FR25c: System supports cross-language category matching (e.g., "Solar Energy" ↔ "Energie Solaire")
  - *AC:* Category names entered in the primary market language are matched to their translations across markets. Aggregation groups results by canonical category regardless of language.

### Report List [V1]

- FR26: Editor can view a list of all reports for their organization with status, metadata, and date
  - *AC:* List shows report name, status badge (PENDING/CONFIGURED), creation date, number of markets, and number of categories. Sorted by most recent. Supports sorting and filtering. Paginated (limit/offset). Scoped to user's organisation only.

### Dashboard & Report Navigation [V2]

- FR26b: Report list displays full execution metadata (status badge with PROCESSING/COMPLETED/COMPLETED_PARTIAL/FAILED, last run date, last refresh date, execution time)
- FR27: Editor can navigate between report views via sidebar (Overview, Actions Center, Category Views, Settings)
  - *AC:* Sidebar persists across all views. Active view highlighted. Category Views expandable with sub-items per category. Navigation does not reload the page (SPA).
- FR28: Editor can select a market filter (Master/All Markets or individual market)
  - *AC:* Default is "Master (All Markets)" which aggregates across all markets. Selecting a specific market scopes all KPIs, tables, and charts to that market. Filter state persists across view navigation within the same report.
- FR29: Editor can filter results by LLM engine(s) — filtering applies to all views including perception summaries and reputation topics (filtered by source attribution before generation)
  - *AC:* Multi-select LLM filter listing all active engines. Default: all active LLMs selected. Deselecting an LLM recalculates all metrics excluding that LLM's data. Perception summaries regenerated with filtered source attribution. Min 1 LLM must remain selected.
- FR30: Editor can delete a report
  - *AC:* Soft delete with confirmation dialog. Deleted reports no longer appear in list. Editor role required. Shared links for deleted reports return 404.

### Overview [V2]

- FR31: System generates AI Perception Summary on-demand per filter combination at 4 hierarchical levels, and caches results for subsequent access
  - *AC:* **4 levels**: Global (all categories, all markets), Global per market, Per category (all markets), Per category × market. Summary generated via LLM call on first access per unique (scope, market, category, LLM selection) combination. Each summary = 3 bullet points (150 chars max). Loading state displayed during generation. Cached result served on subsequent access without re-generation. Cache invalidated on each new scheduled execution. Summaries filtered by selected LLMs (source attribution filtering).
- FR31b: System generates an Executive Summary with Areas of Improvement and scoped source recommendations
  - *AC:* Includes structured summary with key findings, top anomalies, and recommended domains per improvement area. Displayed at the top of the Overview page. Generated once per analysis run (not on-demand).
- FR32: System displays 5 KPI cards: Share of Voice, Visibility, Avg Position, LLM Choice / Win Rate, Sentiment
  - *AC:* Each KPI shows current value with unit (%, position, score). Values computed per formulas in FR79-FR82b. All KPIs respect active market and LLM filters. Each KPI has a quality label (Good/Fair/Poor) based on thresholds.
- FR33: System displays Category Prioritization Matrix (SOV × Win Rate) with market flags
  - *AC:* SOV on X-axis, Win Rate on Y-axis. Each data point = one category × market pair, with market flag. 4 quadrants: **Stars** (high SOV + high win rate), **Opportunity** (low SOV + high win rate), **At Risk** (high SOV + low win rate), **Monitor** (low SOV + low win rate). Threshold: SOV 50%, Win Rate 50%.
- FR34: System displays Category Performance visualization (SOV, Competitive Wins, Perception Sentiment)
  - *AC:* One visualization per category showing 3 sub-metrics. Values as percentages.
- FR35: System displays Brand Rankings table (rank, brand with logo, SOV%, Visibility%, Avg Position, LLM Choice%)
  - *AC:* Table sorted by SOV descending. Target brand highlighted. Logo fetched from Brandfetch. Brands discovered from competitive analysis results. Respects market/LLM filters.
- FR36: System displays Top Concepts with sentiment distribution, frequency, and LLM attribution badges
  - *AC:* Concepts extracted from perception responses, grouped by name across all responses. Each concept shows: frequency (% of responses mentioning it), sentiment score, and LLM attribution badges (`cited_by`). Header bar shows distribution: N positive / N negative / N neutral topics. List sorted by frequency descending. Expandable detail panel shows up to 3 quotes with source URLs and a sentiment gradient.
- FR37: System displays AI Citation Sources with source type breakdown and priority domain table
  - *AC:* **Stacked bar** showing distribution of unique URLs by source type (11-category taxonomy). Clicking a segment filters the table by that type. **Domain table** columns: Domain, Frequency (unique URLs count), Favorability (% of responses where brand performs well when this domain is cited). Favorability rules: visibility (rank #1 = favorable, mentioned but not #1 = neutral, absent = unfavorable), competitive (won = favorable, lost = unfavorable), perception (positive sentiment = favorable, negative = unfavorable). Color thresholds: ≥60% green, 40-59% amber, <40% red. **Expandable detail** per domain: Visibility Gaps, Competitive Losses, Sentiment Issues, LLM Citations breakdown, and Cited URLs list.

### Actions Center [V2]

- FR38: System detects and displays 8 types of improvement areas with severity scoring, each detected per LLM per category
  - *AC:* **8 issue types across 3 dimensions:**
    - **Visibility dimension:**
      - **`low_visibility`** — "Category Underperforming": Detected when visibility is significantly below the brand's average across categories on a given LLM. Shows visibility % and gap vs average.
      - **`poor_position`** — "Poor Average Position": Detected when brand's average ranking position is below threshold for a category × LLM.
      - **`category_market_low`** — "Market Underperforming": Detected when brand's visibility in a specific category × market is below threshold.
      - **`owned_media_gap`** — "Owned Media Gap": Detected when brand-owned sources are not cited by LLMs in a category where competitors' owned sources are cited.
    - **Competitive dimension:**
      - **`low_favorability`** — "Losing in Category": Detected when win rate is low for a category × LLM. Shows win rate and gap vs average.
      - **`category_market_losing`** — "Losing in Market": Detected when brand is consistently losing competitive questions in a specific category × market.
      - **`low_source_favorability`** — "Unfavorable Sources": Detected when key citation sources show unfavorable brand positioning.
    - **Reputation dimension:**
      - **`negative_sentiment`** — "Negative Topics": Detected when perception concepts have negative sentiment scores (< -0.5). Priority: High (< -0.6), Medium (-0.5 to -0.6).
  - **Severity thresholds:** Critical (metric < 25%), Warning (metric < 40%), Info (metric < 50%). Sorted by severity: critical > warning > info.
  - **Special rules:**
    - All competitive improvements are cleared when global favorability >= 95%.
    - Max 3 reputation items surfaced per category (highest severity first).
  - Issues are detected **per LLM** — a category can generate multiple issues if multiple LLMs show distinct problems. Each issue shows: type badge, severity indicator, category name, LLM that detected it, and number of target domains.
- FR38b: Editor can filter Areas of Improvement by market/country
  - *AC:* Market filter scopes improvement areas to the selected market. Default: all markets. Combinable with LLM filter (FR29).
- FR39: Editor can expand an issue to view detail panel with Quick Stats, Priority Source Targets, Owned Media, and Competitor Media sections
  - *AC:* Expanded detail shows:
    - **Quick Stats**: Relevant KPIs for the issue context (win rate, visibility %, gap vs avg, or sentiment score depending on type)
    - **Priority Source Targets**: Third-party domains cited in responses where the brand underperforms, with favorability, citation count, and gaps count
    - **Owned Media**: Brand-owned domains cited by LLMs (identified via source classification)
    - **Competitor Media**: Competitor-owned domains cited in relevant responses
- FR40: System provides Priority Source Targets with specific domains, favorability, citation counts, and gap counts
  - *AC:* Domains listed with favorability (Favorable/Neutral/Unfavorable based on brand's performance in responses citing that domain), total citation count, and gaps count (questions where brand underperforms and domain is cited). Per-LLM logo badges. Sorted by impact potential.

### Category View [V2]

- FR41: System displays per-category AI Perception Summary with key insight
  - *AC:* Summary scoped to the selected category. Shows key insight as one-sentence highlight. Generated on-demand and cached (same mechanism as FR31).
- FR42: System displays per-category KPI cards (same 5 metrics scoped to category)
  - *AC:* Same 5 KPIs as FR32 but computed for the selected category only. Respects market/LLM filters.
- FR43: System displays per-category Brand Prioritization Matrix
  - *AC:* Same visualization as FR33 but with brands (not categories) as data points, scoped to the selected category.
- FR44: System displays per-category Brand Rankings table
  - *AC:* Same structure as FR35 but scoped to the selected category.
- FR45: System displays Unified Questions Table with visibility and competitive and perception questions, favorability status, and LLM responses
  - *AC:* Table shows all questions for the category grouped by type (Visibility/Competitive/Perception). Each row shows question text, winner/themes column, market flag, and per-LLM rank badges. **Favorability rules per type:**
    - **Visibility**: Won (brand #1 in all LLMs) = Favorable. Split (brand #1 in some LLMs) = Neutral. Lost (brand mentioned but not #1) = Neutral. Not Named (brand absent) = Unfavorable.
    - **Competitive**: Won = Favorable. Split = Neutral. Lost = Unfavorable.
    - **Perception**: Positive sentiment = Favorable. Mixed = Neutral. Negative = Unfavorable.
  - Winner column: shows brand name + "You" badge if won, competitor name if all LLMs agree on same #1, "Lost" if LLMs disagree, "Split" badge if mixed. Filterable by question type.
- FR45b: User can filter questions by favorability (favorable, split, not favorable)
  - *AC:* Filter applies to all question types in the Unified Questions Table. Default: all favorabilities shown. Filter combinable with question type filter.
- FR46: Editor can expand a question row to view full ranking, sources, and per-LLM details
  - *AC:* Expanded detail shows: for visibility questions — full brand ranking list; for competitive questions — win/loss per LLM; for all — cited sources and full LLM response text per engine.
- FR46b: Category View focuses on category-scoped metrics, rankings, questions, and citation sources — improvement areas are surfaced in Overview and Actions Center only
  - *AC:* Category View does not display anomaly cards or improvement actions. Those are exclusively in Overview (FR31-FR37) and Actions Center (FR38-FR40).
- FR47: System displays per-category perception topics with sentiment distribution and LLM attribution
  - *AC:* Perception analysis integrated within each Category View. Shows topic clustering with sentiment filtering (All/Positive/Mixed/Negative) and LLM attribution badges per concept.
- FR48: System displays per-category perception questions with sentiment, key themes, and per-LLM response detail
  - *AC:* Perception questions listed alongside visibility and competitive in the Unified Questions Table (FR45). Each perception row shows sentiment score, key themes, and expandable per-LLM detail. Filterable by sentiment.
- FR49: System displays per-category AI Citation Sources including reputation gaps
  - *AC:* Citation sources table includes perception-related sources. Highlights reputation gaps (domains cited by competitors but not by the brand) within the category scope.
- FR50: User can view source details (URL, title, domain, LLM attribution)
  - *AC:* Accessible from any citation source in Overview (FR37) or Category View (FR49). Shows full URL, page title, normalized domain, and which LLM(s) cited the source.

### Incremental Analysis [V2]

- FR51: Editor can add a new market to an existing report — changes take effect on next analysis run
  - *AC:* Select country+language pair (not already in report). Config saved immediately. Quota consumed: +1 brand_market on save. New market included in next scheduled weekly execution.
- FR52: Editor can add a new category to an existing report — changes take effect on next analysis run
  - *AC:* Category name + per-market translations. Config saved immediately. No additional brand_market quota consumed (category is within existing markets). New category included in next scheduled weekly execution.
- FR53: System automatically extracts top competitors per category per market from visibility rankings — these become the default entities used in competitive questions
  - *AC:* During execution, visibility responses are parsed for brand mentions. Top N brands (per `max_competitors_per_category`) populate competitive questions. If visibility fails for all LLMs, competitive questions use generic placeholders. User can also manually add competitors via Settings (FR53b).
- FR53b: Editor can add a competitor to an existing report — changes take effect on next analysis run
  - *AC:* Manual competitor addition in Manage Scope. Added competitors are merged with auto-detected ones. Total capped at `max_competitors_per_category`. Changes apply on next scheduled weekly execution.
- FR54: All scope and configuration changes (markets, categories, competitors, questions, LLMs) are persisted and automatically applied on the next analysis run
  - *AC:* Changes saved to DB immediately. No immediate re-execution. Next scheduled weekly execution uses the updated config. UI shows "Changes will take effect on next scheduled execution" confirmation.

### Manage Scope (Settings) [V2]

- FR56: Editor can view and manage the list of markets and categories for a report
  - *AC:* Displays all markets with their categories. Markets and categories can be added (via incremental wizard FR51/FR52) or removed. Removing a market/category removes associated results.
- FR57: Editor can enable or disable LLM engines for an existing report — changes take effect on next analysis run
  - *AC:* User can enable/disable each LLM engine. Min 1 engine must remain active. Changes saved immediately, applied on next scheduled weekly execution.
- FR57b: Editor can modify, add, or remove questions on an existing report — changes take effect on next analysis run
  - *AC:* Same editing capabilities as wizard Steps 3-4. Max 20 questions per type per market. Changes saved immediately, applied on next scheduled weekly execution.
- FR58: System displays question counts per category and market
  - *AC:* Breakdown: N visibility + N competitive + N perception questions per category×market. Total question count for the report.
- FR59: System displays analysis metadata (creation date, last analysis date, execution time)
  - *AC:* Shows creation timestamp, last successful analysis timestamp, total execution time of last run, number of runs completed.

### Scheduled Weekly Execution [V2]

- FR60: System automatically refreshes all active reports on a weekly cadence
  - *AC:* All active configurations are automatically executed weekly at the same day/time as their initial configuration (or last edit). Same configuration (markets, categories, questions, LLM selection). No user intervention required. Each execution produces a new snapshot.
- FR62: System staggers weekly refreshes to respect LLM provider rate limits
  - *AC:* No thundering herd — refreshes queued and staggered across the refresh window. Fair scheduling across tenants.

### Snapshot Navigation [V3]

- FR65: System stores results from each analysis run as an immutable snapshot
  - *AC:* Each scheduled weekly execution produces a new snapshot. Snapshots immutable. Minimum retention: 12 months.
- FR66: User can navigate between analysis snapshots using previous/next controls
  - *AC:* Navigation between snapshots with current snapshot date displayed. Viewing an older snapshot updates all dashboard data to reflect that snapshot's results. No trend analysis or cross-run comparison.

### Sharing & Export [V2]

- FR68: Editor can generate a shareable link (token-based, no auth required) for a report
  - *AC:* Token is cryptographically random (min 32 chars). Link format: `/reports/shared/{token}`. No authentication required to access. Editor can regenerate token (invalidates previous link).
- FR69: Shared report provides full read-only access to all views (Overview, Actions Center, Categories)
  - *AC:* All views accessible. No edit, delete, or configuration actions available. No navigation to other reports. Organisation branding preserved.
- FR70: Shared report supports market and LLM filtering
  - *AC:* Same filter UI as authenticated view. Filters do not modify stored data — client-side or re-query only.
- FR71: Editor can export report sections to PPTX (branded slide deck with screenshots)
  - *AC:* PPTX includes: title slide, one slide per selected section with chart screenshots and key metrics. Branded with organization logo. Generation < 30s (NFR4).
- FR72: Editor can export report to PDF via browser print dialog
  - *AC:* Print-optimized CSS stylesheet. All visible sections included. Charts rendered as static images. No interactive elements in print view.
- FR73: Editor can select which sections to include in the export
  - *AC:* User selects which sections to include (Overview, Actions Center, each Category). At least one section required. Selection applies to both PPTX and PDF exports.

### Notifications [V2]

- FR74: System sends email notification when an analysis execution completes (first-time or scheduled weekly)
  - *AC:* Email sent to all editors in the organization. Includes: report name, status (COMPLETED/COMPLETED_PARTIAL), 4 KPI values, AI perception summary snippet, and direct link to report. Sent within 5 minutes of completion. One email per report executed.
- FR76: System sends email notification when organization quota reaches warning threshold
  - *AC:* Warning at 80% and 100% of brand_market quota. Email includes current usage, max quota, and reset date. Sent to all editors in the organization.

### Guided Tour [V3]

- FR77: System provides a guided tour accessible via URL parameter
  - *AC:* Tour triggered by `?tour=true` URL parameter. Tour uses demo/sample data (not real user data). Tour can be dismissed at any step. Tour state not persisted — refreshing restarts.
- FR78: Tour navigates automatically across views (Overview, Actions Center, Category) with contextual tooltips
  - *AC:* Sequential steps highlighting key features: KPI cards, filters, question table, perception summary, Actions Center anomalies. User can advance or skip. 8-12 steps total.

### Metrics Calculation [V2]

- FR79: System calculates Share of Voice as Visibility × (2 / (Avg Position + 1))
  - *AC:* SOV expressed as percentage (0-100%). If Avg Position = 0 (not ranked), SOV = 0. Computed per category×market×LLM, then aggregated 1/N across active LLMs.
- FR80: System calculates Visibility as mentions / maximum possible mentions, capped at 100%
  - *AC:* Mentions = number of visibility questions where the brand appears in the response. Max possible = total visibility questions. Visibility = mentions / max × 100, capped at 100%.
- FR81: System calculates Average Position as arithmetic mean of all rank positions, with penalty position 11 for unranked brands
  - *AC:* Position extracted from ranked lists in LLM responses (1-10). Brands not mentioned receive position 11 (penalty). Avg Position = sum of positions / count of questions. Lower is better.
- FR82: System calculates LLM Choice / Win Rate as wins (target ranked #1) / total competitive questions
  - *AC:* Win = target brand ranked #1 in competitive question response. Win Rate = wins / total competitive questions × 100%. Computed per LLM, then aggregated 1/N.
- FR82b: System calculates Sentiment as weighted average of perception concept scores, weighted by frequency
  - *AC:* Each perception concept has a sentiment_score (-1.0 to +1.0) and a frequency (proportion of responses mentioning it). Overall Sentiment = sum(score × frequency) / sum(frequency). Displayed as score from -100 to +100. Quality labels: Positive (≥ 0), Negative (< 0).
- FR84: System aggregates Master (All Markets) metrics as arithmetic mean across all category-market pairs
  - *AC:* Master = simple arithmetic mean of per-market values. No weighting by market size. Applied to all 4 KPIs. Displayed when market filter = "Master (All Markets)".

### Error States UI [V1/V2]

| Scenario | Code | UI Message / Behavior |
|----------|------|----------------------|
| **Quota / Structural validation** | 400 / 403 | See `quota.md` §1 — warning displayed, adding disabled, per-limit-type messages. 403 displays `used/max` and `resetDate`. |
| **Org rate limit (wizard)** | 429 | "Too many requests. Please wait a moment." Discovery temporarily disabled. |
| **Circuit breaker (wizard)** | 503 | Inline error: "AI service temporarily unavailable." Retry button with 30s timer. |
| **LLM provider down (batch)** | — | Progress slows down. Unavailable provider indicated visually. Analysis continues with remaining engines. |
| **COMPLETED_PARTIAL** | — | Info message: "Analysis complete — {N}/{M} AI engines returned results." Failed engines will be retried automatically at next scheduled execution. |
| **FAILED** | — | Error message: "Analysis failed — please contact support." |

## Non-Functional Requirements

### Performance

- NFR1: Dashboard pages (Overview, Category View, Actions Center) load within 2 seconds after analysis completion
- NFR2: Real-time progress updates during analysis are delivered with sub-second latency from backend event to UI update
- NFR3: Report sharing links load the full report within 5 seconds for external stakeholders
- NFR4: Export (PPTX) generation completes within 30 seconds for a full report
- NFR4b: Question-level detail (per-LLM responses, rankings) opens within 500ms
- NFR4c: Report list loads within 1 second for tenants with up to 50 reports
- NFR4d: Priority Source Targets and Areas of Improvement are calculated during the analysis pipeline, not on dashboard load

### Security & Data Isolation

- NFR5: Complete data isolation between organizations — no cross-tenant data access under any circumstance
- NFR6: All data in transit encrypted via TLS
- NFR7: Auth0 tokens validated on every API request
- NFR8: Shared report tokens are unguessable (cryptographically random) and optionally expirable
- NFR9: LLM API keys are managed server-side — never exposed to client
- NFR9b: Rate limiting on all public API endpoints to prevent abuse
- NFR9c: GDPR compliance — ability to delete all tenant data on request (right to erasure). Data processing limited to configured markets' analysis scope.
- NFR9d: No PII stored beyond what Auth0 provides (email, name) and user-configured brand/market data

### Scalability

- NFR10: System supports concurrent analysis execution across multiple organizations without degradation
- NFR11: Scheduled weekly execution queue handles peak load (all executions triggering simultaneously) with staggered execution
- NFR12: System scales to support 100+ organizations with independent analysis workloads
- NFR12b: Analysis workload scales horizontally — background workers can be added without architectural changes

### Reliability

- NFR13: Analysis execution is idempotent — a scheduled re-execution produces the same outcome without data duplication
- NFR14: Partial LLM failure (1-2 providers down) does not block analysis completion — results delivered for available providers
- NFR15: Scheduled executions that fail are automatically retried once before alerting the user
- NFR16: No data loss on application restart — all analysis state is persisted
- NFR16b: System uptime target: 99.5% (allows ~3.6 hours downtime/month)

### Integration

- NFR17: Email service integration is provider-agnostic — swappable without code changes (SendGrid, Resend, SES, etc.)

### Integration Resilience

- NFR18: All LLM calls go through the internal Prompt API — the system never contacts LLM providers directly
- NFR18b: If the Prompt API or individual LLM providers are unavailable, the system degrades gracefully — affected analyses are marked FAILED with automatic retry, the system never crashes
- NFR19: Auth0 integration failure degrades gracefully — existing sessions remain valid, new logins show clear error
- NFR19b: Auth0 SSO supports standard enterprise identity providers (SAML, OIDC)
- NFR20: Email notification delivery failures are logged and retried — notification failure does not affect analysis execution

## Glossary

| Term | Definition |
|------|-----------|
| **AI Presence** | The product name — SaaS platform for monitoring brand perception across AI search engines |
| **Brand Family** | A group of entity name variants referring to the same brand (e.g., "BMW", "BMW Group", "Bayerische Motoren Werke"), grouped by AI during analysis |
| **Brand Market** | 1 brand × 1 market = 1 quota unit. The fundamental consumption unit for billing |
| **Category** | A product/service vertical the brand competes in (e.g., "Skincare", "Cloud Infrastructure"). Discovered by AI or added manually |
| **COMPLETED_PARTIAL** | Report status when some but not all LLM providers returned results |
| **Cross-language matching** | Mapping category names across languages (e.g., "Solar Energy" ↔ "Energie Solaire") for consistent aggregation |
| **Executive Summary** | AI-generated structured summary with key findings, top anomalies, and recommended domains |
| **LLM Choice / Win Rate** | Percentage of competitive questions where the target brand is ranked #1. Wins / total competitive questions × 100% |
| **Priority Source Targets (PST)** | Domains prioritized by impact — publications cited by AI engines in the brand's category that don't mention the brand. The core actionable output |
| **Share of Voice (SOV)** | Visibility × (2 / (Avg Position + 1)). Measures both presence and prominence in AI search results |
| **Snapshot** | An immutable point-in-time capture of all analysis results from a single execution. Scheduled weekly execution creates new snapshots |
| **Source Taxonomy** | 11-category classification of cited URLs: Corporate, Journalism, Government/NGO, Aggregator, Academic, Press Release, Review Sites, Social/UGC, Other, Owned, Competitor |
| **Visibility** | Mentions / maximum possible mentions × 100%, capped at 100%. Measures how often a brand appears in AI responses |
| **Areas of Improvement** | Automatically detected issues (visibility gaps, competitive losses, reputation risks) with severity scoring and scoped source recommendations |