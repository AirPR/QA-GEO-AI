# e2e-category-question-analysis

- **Spec:** `.claude/Data/raw/playwright/e2e-category-question-analysis.spec.js`
- **Active scenarios:** 7
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-CAT-QUESTION-ANALYSIS-001](#e2e-cat-question-analysis-001) | Default display (All tab) | KEEP | GEO-67 |
| [E2E-CAT-QUESTION-ANALYSIS-002](#e2e-cat-question-analysis-002) | Visibility tab table | KEEP | GEO-67 |
| [E2E-CAT-QUESTION-ANALYSIS-003](#e2e-cat-question-analysis-003) | Competitive tab table | KEEP | GEO-67 |
| [E2E-CAT-QUESTION-ANALYSIS-004](#e2e-cat-question-analysis-004) | Perception tab table | KEEP | GEO-67 |
| [E2E-CAT-QUESTION-ANALYSIS-005](#e2e-cat-question-analysis-005) | Visibility detail panel | KEEP | GEO-67 |
| [E2E-CAT-QUESTION-ANALYSIS-006](#e2e-cat-question-analysis-006) | Competitive detail panel | KEEP | GEO-67 |
| [E2E-CAT-QUESTION-ANALYSIS-007](#e2e-cat-question-analysis-007) | Perception detail panel | KEEP | GEO-67 |

---

## E2E-CAT-QUESTION-ANALYSIS-001

**Default display (All tab)**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision) |
| Description | Verify default display of the Prompts Analysis section: AI Engines filter badge = engines in scope / heading visible / 4 type tabs (All/Visibility/Competitive/Perception) with counts / table 4 columns / footer count. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): step 2 — the badge shows the engines activated at analysis creation (Toyota: 4, not 5); steps 3-4 — Questions → Prompts and Market → Country renames (heading 'Prompts Analysis', columns Type / Prompt / Winner / Themes / Country, footer 'Showing X of Y prompts'); step 5 — the first row is expanded and its detail panel opens on load (consistent with scenarios 006 / 007). Consolidates archive E2E-QA-TC001 (GEO-67). Former id: E2E-QA-TC001. Archived in GEO-R1.0/e2e-category-question-analysis.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | Editor is authenticated |
| Labels | e2e,questions,default |
| QA Parent | GEO-67 |
| Components / QA Component | Questions Table / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 04/11 (MCP) — TC aligned on the observed result |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated Editor navigates directly to the YVES SAINT LAURENT luxury perfume category page | URL: https://staging-geo.onclusive.com/geo/dashboard/6dc13f88-8d0b-4e93-b892-9db064c2be41/category/1cab4f3e-2b03-4037-bf39-ca80616052dc | The page loads with the Identity tab active (tablist 'Dashboard sections' / tab 'Identity' [selected]) |
| 2 | Then the AI Engines filter button shows a green badge with the number of engines active in the analysis scope | LLM filter button: aria-label='LLM engine filters' \| Badge selector: numeric-only span inside the button \| Toyota: 4 engines (ChatGPT / Gemini / Grok / Perplexity — Claude not in scope) | The badge displays the number of engines activated at analysis creation (Toyota: 4) |
| 3 | When the Editor scrolls to the Prompts Analysis section | Scroll until the heading 'Prompts Analysis' is visible \| Subtitle: 'All questions across visibility | competitive |
| 4 | Then the All tab is active by default and the table shows 4 columns with at least one row and a footer showing total prompt count | All tab is default active \| 4 column headers: Type / Prompt / Winner / Themes / Country \| Footer text pattern: 'Showing X of Y prompts' (04/11: 'Showing 75 of 75 prompts') | The table is visible with the 4 column headers Type, Prompt, Winner / Themes and Country, and the footer displays the total prompt count. At least one table row (tr[role='button']) is visible. |
| 5 | Then the questions list remains visible and the first row's detail panel is open by default | Panel close button selector: button[aria-label*='Close'] or button:has-text('Close detail panel') \| Table row selector: tr[role='button'] | At least one table row (tr[role='button']) is visible, the first row is expanded (aria-expanded='true') and its detail panel is open on load (the 'Close detail panel' button is visible). |

---

## E2E-CAT-QUESTION-ANALYSIS-002

**Visibility tab table**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Verify the Visibility tab table: click Visibility tab / rows show blue 'Visibility' type badge / Winner-Themes column shows brand name or 'Lost' text / Market column shows circular flag icon. Consolidates archive E2E-QA-TC002 (GEO-67). Former id: E2E-QA-TC002. Archived in GEO-R1.0/e2e-category-question-analysis.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | Category page is loaded |
| Labels | e2e,questions,visibility-tab |
| QA Parent | GEO-67 |
| Components / QA Component | Questions Table / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the YSL luxury perfume category page and the Questions Analysis section is visible | URL: https://staging-geo.onclusive.com/geo/dashboard/6dc13f88-8d0b-4e93-b892-9db064c2be41/category/1cab4f3e-2b03-4037-bf39-ca80616052dc | The Identity tab is active and the Questions Analysis section heading is visible |
| 2 | When the Editor clicks the Visibility tab button | Visibility tab button contains 'Visibility' text + a numeric count badge \| Tab button selector: button:filter(hasText=/^Visibility\s+\d/) | The Visibility tab becomes active and the table refreshes to show only Visibility question rows |
| 3 | Then the first row shows: a blue 'Visibility' type badge in column 1 / a question text in column 2 / brand name or 'Lost' text in column 3 / a circular flag icon in column 4 (Market) | Type badge color: bg-blue-50 text-blue-700 \| Winner cell: brand name span or span.text-slate-400.text-sm 'Lost' \| Market: span.relative.inline-flex.h-5.w-5 with flag emoji | The first Visibility row is fully rendered with all 4 cells correctly populated. The type badge contains the text 'Visibility'. The Market cell contains a circular flag icon. |

---

## E2E-CAT-QUESTION-ANALYSIS-003

**Competitive tab table**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Verify the Competitive tab table: click Competitive tab / rows show amber 'Competitive' type badge / Winner-Themes column shows brand name or 'Lost' text / Market column shows circular flag icon. Consolidates archive E2E-QA-TC003 (GEO-67). Former id: E2E-QA-TC003. Archived in GEO-R1.0/e2e-category-question-analysis.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | Category page is loaded |
| Labels | e2e,questions,competitive-tab |
| QA Parent | GEO-67 |
| Components / QA Component | Questions Table / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the YSL luxury perfume category page and the Questions Analysis section is visible | URL: https://staging-geo.onclusive.com/geo/dashboard/6dc13f88-8d0b-4e93-b892-9db064c2be41/category/1cab4f3e-2b03-4037-bf39-ca80616052dc | The Identity tab is active and the Questions Analysis section heading is visible |
| 2 | When the Editor clicks the Competitive tab button | Competitive tab button contains 'Competitive' text + a numeric count badge | The Competitive tab becomes active and the table refreshes to show only Competitive question rows |
| 3 | Then the first row shows: an amber 'Competitive' type badge in column 1 / a question text / brand name or 'Lost' in column 3 / circular flag in column 4 | Type badge color: bg-amber-50 text-amber-700 \| Winner cell: brand name or 'Lost' \| Market: circular flag icon | The first Competitive row is fully rendered. The type badge contains 'Competitive'. The Market cell contains a circular flag icon. |

---

## E2E-CAT-QUESTION-ANALYSIS-004

**Perception tab table**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Verify the Perception tab table: click Perception tab / rows show violet 'Perception' type badge / Winner-Themes column shows rounded theme chip badges with overflow indicator (+N) / Market column shows circular flag icon. Consolidates archive E2E-QA-TC004 (GEO-67). Former id: E2E-QA-TC004. Archived in GEO-R1.0/e2e-category-question-analysis.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | Category page is loaded |
| Labels | e2e,questions,perception-tab |
| QA Parent | GEO-67 |
| Components / QA Component | Questions Table / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the YSL luxury perfume category page and the Questions Analysis section is visible | URL: https://staging-geo.onclusive.com/geo/dashboard/6dc13f88-8d0b-4e93-b892-9db064c2be41/category/1cab4f3e-2b03-4037-bf39-ca80616052dc | The Identity tab is active and the Questions Analysis section heading is visible |
| 2 | When the Editor clicks the Perception tab button | Perception tab button contains 'Perception' text + a numeric count badge | The Perception tab becomes active and the table refreshes to show only Perception question rows |
| 3 | Then the first row shows: a violet 'Perception' type badge in column 1 / a question text / at least one theme chip badge (rounded-full border bg-white) in column 3 / circular flag in column 4 | Type badge color: bg-violet-50 text-violet-700 \| Theme chip: span.rounded-full.border.bg-white \| Overflow: span showing '+N' \| Market: circular flag | The first Perception row is fully rendered. The type badge contains 'Perception'. The Winner-Themes cell shows at least one theme chip with rounded border styling. |

---

## E2E-CAT-QUESTION-ANALYSIS-005

**Visibility detail panel**

| Field | Value |
|---|---|
| Status | UPDATE; aligned on the observed result 2026-11-04 (user decision) |
| Description | Verify the Visibility detail panel: 2 content sections — (1) Ranking + active LLM name / (2) SOURCES — plus header / 5 LLM logo buttons / LLM switching. Aligned 2026-11-04 on the MCP run of 04/11 (user decision): panel sections are "{brand}'s Position - {ENGINE}", 'Ranking - {Engine}', 'RESPONSE' and 'Sources' (no 'Brand Rankings' / 'AI Citation Sources'); one logo button per engine of the scope, compact mode labels hidden. Consolidates archive E2E-QA-TC005 (GEO-67). Former id: E2E-QA-TC005. Archived in GEO-R1.0/e2e-category-question-analysis.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | Category page loaded |
| Labels | e2e,questions,visibility-panel |
| QA Parent | GEO-67 |
| Components / QA Component | Questions Table / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | FAIL 04/11 (MCP) — TC aligned on the observed result |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the YSL luxury perfume category page with the Visibility tab active and the first Visibility row is expanded | Navigate to category URL / scroll to Questions Analysis / click Visibility tab / click first Visibility row | The row becomes aria-expanded='true' and the detail panel opens beside the table |
| 2 | Then the panel header shows: the question text as h4 title / a blue Visibility type badge / a close button | Panel close button: button[aria-label*='Close'] or button:has-text('Close detail panel') \| Panel heading: h4 \| Visibility badge: contains text 'Visibility' | The detail panel is visible with a question title (h4) and a close button. |
| 3 | Then one LLM logo button per engine of the analysis scope is visible in the panel (logos only — compact mode) AND the text labels are NOT visible | LLM buttons identified by img alt (claude / gemini / grok / openai / perplexity) — one per engine in scope \| Compact mode threshold: >3 LLMs active → label spans must be hidden | One logo button is visible for each engine in scope (e.g. ChatGPT / Gemini / Grok / Perplexity on Toyota, Claude not in scope) and the text labels inside the buttons are NOT visible — compact mode (logos only). |
| 4 | Then the panel body shows the brand position for the active engine, the 'Ranking - {Engine}' list, the 'RESPONSE' section and the 'Sources' section | Position: "{brand}'s Position - {ENGINE}" with favorability + rank (e.g. 'Favorable #1') \| Ranking: 'Ranking - ChatGPT' \| 'RESPONSE' \| 'Sources' | The panel shows "{brand}'s Position - CHATGPT" with its favorability and rank, the 'Ranking - ChatGPT' list, the 'RESPONSE' text and the 'Sources' list; there is no 'Brand Rankings' or 'AI Citation Sources' heading. |
| 5 | When the Editor switches between all the LLM buttons the panel heading remains visible after each switch | Click each engine button of the scope in sequence (e.g. Gemini / Grok / ChatGPT / Perplexity) | After each LLM button click the panel heading (h4) remains visible — the panel does not crash or reset |

---

## E2E-CAT-QUESTION-ANALYSIS-006

**Competitive detail panel**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Verify the Competitive detail panel: 3 content sections — (1) Won or Lost result / (2) About + explanatory text / (3) SOURCES — plus header / 5 LLM logo buttons / LLM switching. Consolidates archive E2E-QA-TC006 (GEO-67). Former id: E2E-QA-TC006. Archived in GEO-R1.0/e2e-category-question-analysis.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | Category page loaded |
| Labels | e2e,questions,competitive-panel |
| QA Parent | GEO-67 |
| Components / QA Component | Questions Table / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the category page with the Competitive tab active and the first Competitive row panel is open (auto-opened or via click) | Navigate to category URL / scroll to Questions Analysis / click Competitive tab / the panel opens automatically on tab switch, or click the first Competitive row if not already open | The detail panel is open for the first Competitive row (panel close button is visible) |
| 2 | Then the panel header shows: the question text as h4 title / an amber Competitive type badge / a close button | Panel close button visible \| Panel heading: h4 \| Competitive badge: contains text 'Competitive' | The detail panel is visible with a question title (h4) and a close button. |
| 3 | Then 5 LLM logo buttons are visible in the panel (logos only — compact mode) AND the text labels are NOT visible (Claude / Gemini / Grok / ChatGPT / Perplexity) | 5 LLM buttons (claude / gemini / grok / openai / perplexity) \| Compact mode threshold: >3 LLMs active → label spans must be hidden | All 5 LLM logo images are visible. Text labels 'Claude' / 'Gemini' / 'Grok' / 'ChatGPT' / 'Perplexity' inside the LLM buttons are NOT visible — compact mode (logos only) is active when 5 LLMs are selected (threshold > 3). [BUG: labels currently visible — compact mode not implemented] |
| 4 | Then the panel body shows 3 content sections: (1) 'Won' or 'Lost' result in a span / (2) 'About' subtitle p element / (3) 'Sources' p element | Section 1: span:has-text('Won') or span:has-text('Lost') \| Section 2: p:has-text('About') \| Section 3: p:has-text('Sources') | All 3 content sections are visible in the Competitive detail panel: result span (Won/Lost) then About p label then Sources p label. |
| 5 | When the Editor switches between all 5 LLM buttons the panel heading remains visible after each switch | Click Gemini / Grok / ChatGPT / Perplexity / Claude in sequence | After each LLM button click the panel heading (h4) remains visible |

---

## E2E-CAT-QUESTION-ANALYSIS-007

**Perception detail panel**

| Field | Value |
|---|---|
| Status | KEEP |
| Description | Verify the Perception detail panel: 4 sections in order — (1) SENTIMENT+LLM name / (2) THEMES / (3) Response / (4) SOURCES — plus header / 5 LLM logo buttons / LLM switching. Consolidates archive E2E-QA-TC007 (GEO-67). Former id: E2E-QA-TC007. Archived in GEO-R1.0/e2e-category-question-analysis.csv. |
| Priority | High |
| Stories | GEO-67 |
| Precondition | Category page loaded |
| Labels | e2e,questions,perception-panel |
| QA Parent | GEO-67 |
| Components / QA Component | Questions Table / E2E flow |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Editor is on the category page with the Perception tab active and the first Perception row with theme data panel is open (auto-opened or via click) | Navigate to category URL / scroll to Questions Analysis / click Perception tab / the panel opens automatically on tab switch, or click the first Perception row with theme chips if not already open | The detail panel is open for the first Perception row with theme data (panel close button is visible) |
| 2 | Then the panel header shows: the question text as h4 title / a violet Perception type badge / a close button | Panel close button visible \| Panel heading: h4 \| Perception badge: contains text 'Perception' | The detail panel is visible with a question title (h4) and a close button. |
| 3 | Then 5 LLM logo buttons are visible in the panel (logos only — compact mode) AND the text labels are NOT visible (Claude / Gemini / Grok / ChatGPT / Perplexity) | 5 LLM buttons (claude / gemini / grok / openai / perplexity) \| Compact mode threshold: >3 LLMs active → label spans must be hidden | All 5 LLM logo images are visible. Text labels 'Claude' / 'Gemini' / 'Grok' / 'ChatGPT' / 'Perplexity' inside the LLM buttons are NOT visible — compact mode (logos only) is active when 5 LLMs are selected (threshold > 3). [BUG: labels currently visible — compact mode not implemented] |
| 4 | Then the Perception panel shows 4 sections in order: (1) 'Sentiment - <LLM name>' / (2) 'Themes' / (3) 'Response' / (4) 'Sources' | Section 1: p:has-text('Sentiment') — matches 'Sentiment - Claude' \| Section 2: p:has-text('Themes') \| Section 3: p:text-is('Response') \| Section 4: p:has-text('Sources') | All 4 sections are visible in the Perception panel in the declared order: SENTIMENT+LLM then THEMES then Response then SOURCES. |
| 5 | When the Editor switches between all 5 LLM buttons the panel heading remains visible and the content updates for each engine | Click Gemini / Grok / ChatGPT / Perplexity / Claude in sequence | After each LLM button click the panel heading (h4) remains visible — no crash or reset |
