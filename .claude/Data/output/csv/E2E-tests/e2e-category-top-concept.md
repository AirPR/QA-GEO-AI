# e2e-category-top-concept

- **Spec:** `.claude/Data/raw/playwright/e2e-category-top-concept.spec.js`
- **Active scenarios:** 5
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-TOP-CONCEPT-001](#e2e-top-concept-001) | Top Topics — sort modes (Frequency, Sentiment in polarity groups, A-Z) | UPDATE | GEO-75, GEO-75, GEO-1268 |
| [E2E-TOP-CONCEPT-002](#e2e-top-concept-002) | Top Topics — explicit polarity labels and polarity filters | UPDATE | GEO-75, GEO-75, GEO-1266, GEO-1268 |
| [E2E-TOP-CONCEPT-003](#e2e-top-concept-003) | Top Topics — detail panel shows frequency and polarity, no score, no barometer | UPDATE | GEO-75, GEO-75, GEO-1267 |
| [E2E-TOP-CONCEPT-004](#e2e-top-concept-004) | Top Concepts — Sources structure (title subtitle publisher logo LLM logo nav) | UPDATE | GEO-75 |
| [E2E-TOP-CONCEPT-005](#e2e-top-concept-005) | Top Concepts — Sources search empty state and close | UPDATE | GEO-75 |

---

## E2E-TOP-CONCEPT-001

**Top Topics — sort modes (Frequency, Sentiment in polarity groups, A-Z)**

| Field | Value |
|---|---|
| Status | UPDATE — simplified concepts: explicit polarity label, no score, no barometer, Sentiment sort Positive → Mixed → Negative (GEO-1068) — behaviour change (confirmed at the gate); aligned on the observed result 2026-11-04 (user decision) |
| Description | Verifies that each Sort mode of the Top Concepts widget actually re-orders the concept list as expected (Frequency by frequency % \| Sentiment by color bucket \| A-Z alphabetical). Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: simplified key concepts (GEO-1068) — simplified concepts: explicit polarity label, no score, no barometer, Sentiment sort Positive → Mixed → Negative (GEO-1068). Aligned 2026-11-04 on the MCP run of 04/11 (user decision): step 3 — Sort by Frequency orders the topics by frequency % (descending), not by sources count. Consolidates archive E2E-TOP-CONCEPT-001, TC-GEO-1268-001, TC-GEO-1268-002. Archived in GEO-R1.0/e2e-category-top-concept.csv. |
| Priority | High |
| Stories | GEO-75, GEO-75, GEO-1268 |
| Precondition | The user is authenticated and the category contains at least 2 concepts |
| Labels | e2e,top-concepts,sort,smoke |
| QA Parent | GEO-75 |
| Components / QA Component | Top Concepts widget / E2E sort |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated user opens the category page with concepts | Category URL: BASE_URL/dashboard/{dashboard_uuid}/category/{category_uuid} | The Top Topics widget heading is visible (prefix Top Topics Associated with Your Brand) and the concept list is rendered |
| 2 | When the user opens the Sort dropdown and applies Sort by Frequency | Sort mode: Sort by Frequency | The dropdown closes and the trigger label updates to Sort by Frequency |
| 3 | Then the concept list is ordered by frequency % in descending order | Sort mode: Frequency | Each consecutive concept has a frequency % <= the previous one (e.g. 51, 44, 42, 31 …); the sources count is not the sort key and may be out of order |
| 4 | When the user opens the sort menu |  | The menu lists "Sort by Frequency", "Sort by Sentiment" and "Sort A-Z", and no score entry |
| 5 | And the user selects Sentiment | Sort: Sentiment | The list is re-ordered |
| 6 | Then the Positive concepts come first, then the Mixed ones, then the Negative ones |  | Every "Positive" row is above every "Mixed" row, and every "Mixed" row is above every "Negative" row |
| 7 | And no numeric score is exposed |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on the rows or in the sort menu |
| 8 | When the user reads the frequency % inside the Positive group |  | The frequency % decreases from top to bottom (highest first) |
| 9 | And the user reads the frequency % inside the Mixed and the Negative groups |  | In each group the frequency % decreases from top to bottom |
| 10 | Then concepts with the same frequency are ordered by name A→Z | Two concepts of the same polarity with the same frequency % | The concept whose name comes first alphabetically is listed first |
| 11 | When the user applies Sort A-Z | Sort mode: Sort A-Z | The dropdown closes and the trigger label updates to Sort A-Z |
| 12 | Then the concept list is sorted alphabetically by concept name | Sort mode: A-Z | Concept names are in alphabetical order (case-insensitive ascending or descending) |

---

## E2E-TOP-CONCEPT-002

**Top Topics — explicit polarity labels and polarity filters**

| Field | Value |
|---|---|
| Status | UPDATE — simplified concepts: explicit polarity label, no score, no barometer, Sentiment sort Positive → Mixed → Negative (GEO-1068) — behaviour change (confirmed at the gate) |
| Description | Verifies that the sentiment filters in the Top Concepts widget show only concepts whose sentiment indicator color matches the selected filter (Positive=green Negative=red Mixed=yellow). Empty filters show no concepts and the All filter restores the full list. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: simplified key concepts (GEO-1068) — simplified concepts: explicit polarity label, no score, no barometer, Sentiment sort Positive → Mixed → Negative (GEO-1068). Consolidates archive E2E-TOP-CONCEPT-002, TC-GEO-1266-005, TC-GEO-1268-005. Archived in GEO-R1.0/e2e-category-top-concept.csv. |
| Priority | High |
| Stories | GEO-75, GEO-75, GEO-1266, GEO-1268 |
| Precondition | The user is authenticated and the category contains concepts of multiple sentiments |
| Labels | e2e,top-concepts,filter,colors |
| QA Parent | GEO-75 |
| Components / QA Component | Top Concepts widget / E2E filter |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated user opens the category page with concepts | Category URL: BASE_URL/dashboard/{dashboard_uuid}/category/{category_uuid} | The Top Topics widget is visible with all sentiment filter buttons (All Positive Mixed Negative) clickable |
| 2 | When the user looks at the row of a Positive concept | Concept P | The meta line ends with a "Positive" pill styled like the "Positive" filter pill, without a count (e.g. "12 sources • Positive") |
| 3 | And the user looks at the row of a Mixed concept | Concept M | The meta line ends with a "Mixed" pill styled like the "Mixed" filter pill, without a count |
| 4 | And the user looks at the row of a Negative concept | Concept N | The meta line ends with a "Negative" pill styled like the "Negative" filter pill, without a count |
| 5 | Then the polarity can be read without relying on colour |  | Each row states its polarity in text; the coloured accent bar and the colour of the frequency % are still shown and match the label (green Positive, amber Mixed, red Negative) |
| 6 | When the user selects the Positive filter pill | Filter: Positive | Only "Positive" concepts are listed and their number equals the count of the Positive pill |
| 7 | And the user deselects Positive and selects Mixed | Filter: Mixed | Only "Mixed" concepts are listed and their number equals the count of the Mixed pill |
| 8 | And the user deselects Mixed and selects Negative | Filter: Negative | Only "Negative" concepts are listed and their number equals the count of the Negative pill |
| 9 | Then removing the filter restores the full list |  | All concepts are listed again; their number equals the sum of the three pill counts |

---

## E2E-TOP-CONCEPT-003

**Top Topics — detail panel shows frequency and polarity, no score, no barometer**

| Field | Value |
|---|---|
| Status | UPDATE — simplified concepts: explicit polarity label, no score, no barometer, Sentiment sort Positive → Mixed → Negative (GEO-1068) — behaviour change (confirmed at the gate) |
| Description | Verifies that opening the detail panel of a concept produces a panel whose heading equals the concept name and whose header banner color matches the concept list-row sentiment color and that the panel exposes the expected sections (Sources + sentiment indicators). Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: simplified key concepts (GEO-1068) — simplified concepts: explicit polarity label, no score, no barometer, Sentiment sort Positive → Mixed → Negative (GEO-1068). Consolidates archive E2E-TOP-CONCEPT-003, TC-GEO-1267-001, TC-GEO-1267-002, TC-GEO-1267-004, TC-GEO-1267-006. Archived in GEO-R1.0/e2e-category-top-concept.csv. |
| Priority | High |
| Stories | GEO-75, GEO-75, GEO-1267 |
| Precondition | The user is authenticated and the category contains at least one concept |
| Labels | e2e,top-concepts,detail-panel,coherence |
| QA Parent | GEO-75 |
| Components / QA Component | Top Concepts widget / E2E detail-panel |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated user opens the category page with concepts | Category URL: BASE_URL/dashboard/{dashboard_uuid}/category/{category_uuid} | The Top Topics widget is visible with at least one concept in the list |
| 2 | When the user clicks the row of a Positive concept | Concept P | The concept detail panel opens with a coloured header showing the concept name and the close button |
| 3 | Then the header shows the frequency and the polarity label |  | The header reads "{f}% frequency • Positive", "Positive" in a white pill (e.g. "90% frequency • Positive") |
| 4 | And no sentiment score is shown in the panel |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown anywhere in the panel |
| 5 | And the panel frequency matches the clicked row |  | The frequency % in the header equals the frequency % of the row of P |
| 6 | When the user clicks the row of a Mixed concept | Concept M | The panel opens with the header in the Mixed (amber) colour and reads "{f}% frequency • Mixed", "Mixed" in a white pill readable on the header |
| 7 | And the user closes the panel and clicks the row of a Negative concept | Concept N | The panel opens with the header in the Negative (red) colour and reads "{f}% frequency • Negative", "Negative" in a white pill readable on the header |
| 8 | Then neither panel shows a sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown anywhere in the panel for M and N |
| 9 | Then the barometer gauge is not shown |  | No Negative-to-Positive gauge bar and no cursor are displayed in the panel |
| 10 | And the Sources section heading is visible in the panel | Section: Sources | A clickable Sources element/section is visible inside the panel content |
| 11 | And no quote is shown in the panel |  | The panel has no quotes section and no quote text |

---

## E2E-TOP-CONCEPT-004

**Top Concepts — Sources structure (title subtitle publisher logo LLM logo nav)**

| Field | Value |
|---|---|
| Status | UPDATE — widget heading "Top Topics Associated with Your Brand" (TC-GEO-1266-002); sources unchanged (TC-GEO-1267-006) — label; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verifies that every source row exposed by the Top Concepts widget (both inside the inline detail panel — subset — and inside the All sources modal — full set) carries a non-empty title a non-empty subtitle (URL/domain) a visible publisher logo (e.g. Vogue's V Forbes's F) at least one visible LLM logo image (img with alt matching chatgpt/claude/gemini/grok/openai/perplexity) and a visible navigation link to open the source. The panel and modal share the same contract. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: widget heading "Top Topics Associated with Your Brand" (TC-GEO-1266-002); sources unchanged (TC-GEO-1267-006); driven by Given step → TC-GEO-1266-002. Consolidates archive E2E-TOP-CONCEPT-004 (GEO-75). Archived in GEO-R1.0/e2e-category-top-concept.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): sources are listed directly in the panel (no Sources section to switch to); each source row is itself the link (no 'Open <title>' label). |
| Priority | High |
| Stories | GEO-75 |
| Precondition | The user is authenticated and the category contains at least one concept with sources |
| Labels | e2e,top-concepts,sources,structure |
| QA Parent | GEO-75 |
| Components / QA Component | Top Concepts widget / E2E sources |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated user opens the category page with concepts | Category URL: BASE_URL/dashboard/{dashboard_uuid}/category/{category_uuid} | The Top Topics widget is visible |
| 2 | When the user opens the detail panel of the first concept | Click on the first concept button | The detail panel opens with the Close detail panel button visible |
| 3 | And the user switches to the Sources section inside the panel | Sources are listed directly in the panel (no separate Sources section to switch to) | The Sources content is shown with a subset of sources and the All sources button |
| 4 | Then every source row in the detail panel carries a title subtitle publisher logo at least one LLM logo image and a navigation link | Panel sources subset (visible inside #identity outside any radix popover) | Each source row in the panel exposes: a non-empty title a non-empty subtitle (URL/domain) a visible publisher/source logo image at least one visible LLM logo image (img with alt attribute matching chatgpt/claude/gemini/grok/openai/perplexity img.naturalWidth>0) and a visible navigation link with href (the row itself is the link: a[href] target=_blank, data-testid 'dashboard-concept-sources-item' — no separate 'Open <title>' label) |
| 5 | When the user opens the All sources modal | Click All sources button | The All sources modal opens with the Search by title or URL input visible |
| 6 | Then every source row in the All sources modal carries a title subtitle publisher logo at least one LLM logo image and a navigation link | Modal sources full set (inside [id^=radix-] popover) | Each source row in the modal exposes: a non-empty title a non-empty subtitle (URL/domain) a visible publisher/source logo image at least one LLM logo image (img with alt attribute matching chatgpt/claude/gemini/grok/openai/perplexity img.naturalWidth>0) and a visible navigation link with href |
| 7 | And the All sources modal contains at least as many source rows as the panel (full set vs subset) | Modal source count vs panel source count | modalSources.length >= panelSources.length (the modal must expose at least as many sources as the inline panel — the modal is the full set the panel a subset) |

---

## E2E-TOP-CONCEPT-005

**Top Concepts — Sources search empty state and close**

| Field | Value |
|---|---|
| Status | UPDATE — widget heading "Top Topics Associated with Your Brand" (TC-GEO-1266-002); sources unchanged (TC-GEO-1267-006) — label; empty-state text aligned on the observed result 2026-11-05 (user decision) — label; labels / test data aligned 2026-11-11 (MCP run of 10/11) |
| Description | Verifies that searching a non-matching term in the All sources modal displays the No sources match your search empty state and that closing the modal and the panel restores the original page state. Updated 2026-10-28 at the e2e-suite-GEO-R1.3 review gate: widget heading "Top Topics Associated with Your Brand" (TC-GEO-1266-002); sources unchanged (TC-GEO-1267-006); driven by Given step → TC-GEO-1266-002. Aligned 2026-11-05 on the MCP run of 30/10 (user decision, not a bug): the empty-state message reads "No sources match your search" with no final period — the old text came from the R1.0 E2E (Figma) and the copy changed after the PASS of 30/05. The "{n} sources" count in the modal header is not checked by this scenario. Stories 1266–1268 are covered in the GEO-1068 CSV. Consolidates archive E2E-TOP-CONCEPT-005 (GEO-75). Archived in GEO-R1.0/e2e-category-top-concept.csv. Aligned 2026-11-11 on the MCP run of 10/11 (user decision): sources are listed directly in the panel (no Sources section to click before All sources). |
| Priority | High |
| Stories | GEO-75 |
| Precondition | The user is authenticated and the category contains concepts with sources |
| Labels | e2e,top-concepts,sources,search,close |
| QA Parent | GEO-75 |
| Components / QA Component | Top Concepts widget / E2E search |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | PASS 10/11 (MCP) — TC aligned on the observed result (labels / test data) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an authenticated user opens the category page with concepts | Category URL: BASE_URL/dashboard/{dashboard_uuid}/category/{category_uuid} | The Top Topics widget is visible |
| 2 | When the user opens the detail panel of the first concept and the All sources modal | Click first concept then All sources (sources are listed directly in the panel) | The All sources modal is open with the Search by title or URL input visible |
| 3 | When the user types 1555555 in the search input | Search query: 1555555 (non-matching) | The input value is updated and the source list reacts to the query |
| 4 | Then the message No sources match your search is visible inside the modal | Empty state message: No sources match your search | The text No sources match your search (no final period) is rendered inside the All sources modal |
| 5 | When the user presses Escape to close the All sources modal | Keyboard: Escape | The All sources modal is dismissed and the detail panel remains visible |
| 6 | And the user clicks the Close detail panel button | Click Close detail panel button | The detail panel is closed and the Close detail panel button is no longer visible |
