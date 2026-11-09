# GEO-1068 Simplify Key Concepts Sentiment Display — epic test case review (GEO-R1.3, generated 2026-10-19)

**Sources (read-only):** `apps/geo/GEO-R1.3/GEO-1068/` (EPIC.md, epic-data.json, STORY_GEO-1266 to STORY_GEO-1269, imported 2026-10-19). Consistency checked against `apps/geo/GEO-R1.3/QA-READINESS-GEO-R1.3.md` and `apps/geo/GEO-R1.3/TEST-PLAN-GEO-R1.3.md` (Scenarios 153–163, cross-epic 174–178, non-regression 181 and 185); the story ACs are the reference. No Figma (decision D0, `--figma` not used). **Sync 2026-10-20:** decisions D0–D7 validated by the PO (Quentin Reant, GEO-1068 comment 865134, 2026-10-19 20:56 New York time = 2026-10-20 in Europe); the epic text was updated the same day (epic 1.3 AC1, 1.4 AC1–AC3 marked "Updated 2026-10-20"). The story ACs (unchanged in Jira) stay the reference for AC numbering. Style and test-data conventions aligned with the GEO-1002 and GEO-1069 files of the same folder.

**Scope:** 4 Stories (GEO-1266 to GEO-1269), all Ready for QA, 11 functional ACs. **Out of Scope respected:** concept classification and frequency computation (no TC; only "unchanged" checks against a baseline), the sentiment distribution summary (only an "unchanged" check, GEO-1268 AC-3), and whether the numeric score is still computed internally (no TC).

**CSV:** `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-epicGEO-1068.csv` — 36 TCs, 159 step rows (+1 header), 16 columns, `;` separator, fields quoted with doubled quotes when they hold `;` or `"`, UTF-8 without BOM, LF. One Cucumber step per row; case-level fields on the first row of each TC only. QA Parent = GEO-1068, Components = GEO, QA Component = GEO Module, Labels empty, Test Type = Manual, QA Regression = Yes for Urgent/High. Not imported to Quality Plus, nothing written to Jira.

## Summary

| Metric | Value |
|---|---|
| Test cases | 36 |
| Steps (CSV rows) | 162 |
| Stories / Tasks | 4 / 0 |
| Coverage | happy path 23 · edge 6 · error 0 · state 7 |
| Priority | Urgent 0 · High 16 · Medium 19 · Low 1 |
| UI / Functional | UI 4 · Functional 32 |
| Smoke = Yes | 4 (1 per story) |
| QA Regression = Yes | 16 |
| Unbranded-surface TCs (flag ON, GEO-1209) | 9 |
| TCs validated by PO 2026-10-20 (D0–D7, GEO-1068 comment 865134) | 21 (pending: 0) |
| AC coverage | 11 / 11 (no AC without a dedicated TC); 0 AC filtered as technical |

| Story | Title | Jira status | ACs | TCs | Steps | Smoke | Happy | Edge | Error | State |
|---|---|---|---|---|---|---|---|---|---|---|
| GEO-1266 | 48.1 Show only frequency and polarity on each concept | Ready for QA | 3 | 8 | 33 | 1 | 6 | 0 | 0 | 2 |
| GEO-1267 | 48.2 Remove the score and barometer from the expanded concept view | Ready for QA | 3 | 8 | 37 | 1 | 6 | 1 | 0 | 1 |
| GEO-1268 | 48.3 Keep sorting and filtering consistent with the simplified display | Ready for QA | 3 | 9 | 40 | 1 | 6 | 1 | 0 | 2 |
| GEO-1269 | 48.4 Apply the simplified display everywhere concepts appear | Ready for QA | 2 | 11 | 52 | 1 | 5 | 4 | 0 | 2 |

No error-handling TC: none of the 11 ACs implies an invalid input, a failure or a permission case.

## Test data

| Ref | Description | Used by |
|---|---|---|
| Env | Staging https://staging-geo.onclusive.com/geo, QA account, interface en-GB, QA organisation of the release (e.g. "QA-GEO", to confirm). GEO-1068 deployed on staging | all TCs |
| B | Brand analysis, collected, created with the GEO-R1.3 wizard; Top Topics on the Overview with at least one Positive concept P, one Mixed concept M, one Negative concept N; category pages C1 and C2 with concepts (UUID to confirm) | GEO-1266-001, GEO-1266-002, GEO-1266-005, GEO-1267-001, GEO-1267-002, GEO-1267-004, GEO-1268-001, GEO-1268-002, GEO-1268-003, GEO-1268-005, GEO-1269-001, GEO-1269-002, GEO-1269-003, GEO-1269-004, GEO-1269-005, GEO-1269-006, GEO-1269-007, GEO-1269-008, GEO-1269-009, GEO-1269-010 |
| B-tie | Two concepts of the same polarity with the same frequency % (in B or another brand analysis, to find at execution) | GEO-1268-002 |
| O | Brand analysis **"Toyota"** on staging (https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e), created and collected before the GEO-R1.3 release: 7 concepts on the Overview (5 Positive, 1 Mixed, 1 Negative), category **Voitures hybrides** with concepts. Filters identical to the baseline: custom period **Sep 28 – Oct 4, 2026**, markets United States, Spain, France, engines ChatGPT, Perplexity, Gemini, Grok. **Baseline** = XLSX + PPTX exported on 2026-10-05, before the GEO-1068 deployment ("Score" column, "+86 sentiment"): `.claude/Data/raw/test-data/baselines/GEO-1068/Toyota_baseline_20261005.xlsx` / `.pptx`. GEO-1266-008 and GEO-1267-007 use O without the baseline | GEO-1266-007, GEO-1266-008, GEO-1267-006, GEO-1267-007, GEO-1268-006, GEO-1268-008, GEO-1269-010, GEO-1269-011 |
| U | Unbranded feature flag ON (GEO-1209); unbranded analysis (topic), collected, Top Topics with a Positive, a Mixed and a Negative topic, and at least one prompt in the Other category so that the Other category page lists key concepts | GEO-1266-003, GEO-1266-004, GEO-1266-006, GEO-1267-003, GEO-1267-005, GEO-1267-008, GEO-1268-004, GEO-1268-007, GEO-1268-009 |
| U2 | Second user of the same organisation (not the creator of B), separate browser session | GEO-1269-009 |
| Export languages | English (EN), French (FR), Spanish (ES) — stated as test data on each export step. Expected FR / ES labels are the strings-sheet values (not quoted in the story) | GEO-1269-001 to 008, 011 |

Values that depend on the data (frequency %, source and quote counts, pill counts) are never hard-coded: expected results use {f}, {n}, {q} — except the TCs on O, whose expected values are read from the 2026-10-05 baseline and written in the steps.

## AC inventory and traceability

### GEO-1266 — 48.1 Show only frequency and polarity on each concept (Story, Ready for QA)

Story GEO-1266 — 3 ACs identified (numbered AC1–AC3 in the source, reused as AC-1…AC-3).

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Frequency and polarity only | GEO-1266-001, GEO-1266-002, GEO-1266-003, GEO-1266-004, GEO-1266-008 |
| AC-2 | Explicit label | GEO-1266-005, GEO-1266-006 |
| AC-3 | Same concepts, same frequency | GEO-1266-007 |

### GEO-1267 — 48.2 Remove the score and barometer from the expanded concept view (Story, Ready for QA)

Story GEO-1267 — 3 ACs identified (numbered AC1–AC3 in the source, reused as AC-1…AC-3).

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Frequency and polarity, no score | GEO-1267-001, GEO-1267-002, GEO-1267-003, GEO-1267-007 |
| AC-2 | No barometer | GEO-1267-004, GEO-1267-005, GEO-1267-007 |
| AC-3 | Sources unchanged | GEO-1267-006, GEO-1267-008 |

### GEO-1268 — 48.3 Keep sorting and filtering consistent with the simplified display (Story, Ready for QA)

Story GEO-1268 — 3 ACs identified (numbered AC1–AC3 in the source, reused as AC-1…AC-3).

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Sort by polarity group | GEO-1268-001, GEO-1268-002, GEO-1268-003, GEO-1268-004 |
| AC-2 | Filters unchanged | GEO-1268-005, GEO-1268-006, GEO-1268-007 |
| AC-3 | Distribution summary unchanged | GEO-1268-008, GEO-1268-009 |

### GEO-1269 — 48.4 Apply the simplified display everywhere concepts appear (Story, Ready for QA)

Story GEO-1269 — 2 ACs identified (numbered AC1–AC2 in the source, reused as AC-1…AC-2).

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Slide export (+ XLSX rule = epic 1.4 AC2, Updated 2026-10-20) | GEO-1269-001, GEO-1269-002, GEO-1269-003, GEO-1269-004, GEO-1269-005, GEO-1269-006, GEO-1269-007, GEO-1269-008, GEO-1269-011 |
| AC-2 | Shared analysis (= epic 1.4 AC3, Updated 2026-10-20) | GEO-1269-009, GEO-1269-010 |

Numbering note (sync 2026-10-20): the epic now lists 3 ACs for US 1.4 (AC1 slide, AC2 XLSX, AC3 shared) while story GEO-1269 keeps 2. QA decision 2026-10-20: keep the story numbering; TC-GEO-1269-006 to 008 and 009 / 010 carry the epic cross-reference in their Description.

## Decisions D0–D7 validated by PO 2026-10-20 (taken by OS-Team 2026-10-16, PM on leave)

Each of these TCs carries "[Validated by PO 2026-10-20: Dn (GEO-1068 comment 865134)]" at the end of its Description (was "[Pending PM validation: Dn]"). PO quote (Quentin Reant, GEO-1068 comment 865134, 2026-10-19 20:56 New York time): "OK for all your decisions. Epic updated so it matches: 1.3 sort tie-break by frequency then name (D1), 1.4 no Score column in the XLSX (D2), same organisation instead of shared link (D3) and polarity colour + translated polarity word in the slide export (D6), all marked Updated 2026-10-20. D0, D4, D5 and D7 need no change in the epic." No expected result changed.

| Decision | Content | TC(s) | Source |
|---|---|---|---|
| D0 | No Figma; the row label reuses the Positive / Mixed / Negative filter pill, without the count, in the meta line `[q quotes •] n sources • [Label]` | GEO-1266-001, GEO-1266-002, GEO-1266-003, GEO-1266-004, GEO-1266-005, GEO-1266-006, GEO-1266-008, GEO-1269-009 | Validated (no epic change), GEO-1068 comment 865134 |
| D1 | Inside a polarity group: frequency (highest first), then name A→Z; with a polarity filter on, the Sentiment sort reads as by frequency | GEO-1268-002, GEO-1268-003, GEO-1268-004 | Validated, epic 1.3 AC1 Updated 2026-10-20, GEO-1068 comment 865134 |
| D2 | XLSX concepts tables: Concept · Sentiment · Sources · Frequency · Cited by; "Score" column removed | GEO-1269-006, GEO-1269-007, GEO-1269-008 | Validated, epic 1.4 AC2 Updated 2026-10-20, GEO-1068 comment 865134 |
| D3 | "Shared analysis / recipient" = another user of the same organisation opening the analysis (no share link exists) | GEO-1269-009 | Validated, epic 1.4 AC3 Updated 2026-10-20, GEO-1068 comment 865134 |
| D4 | No quotes in the concept detail panel (none added) | GEO-1267-006, GEO-1267-008 | Validated (no epic change), GEO-1068 comment 865134 |
| D5 | Category-level Sentiment KPI tile kept unchanged (the epic keeps it "untouched by this epic until decided") | GEO-1269-010 | Validated (no epic change; the epic keeps the tile "untouched by this epic until decided"), GEO-1068 comment 865134 |
| D6 | In PPTX / PDF the frequency % takes the polarity colour (green / amber / red) | GEO-1269-005 | Validated, epic 1.4 AC1 Updated 2026-10-20, GEO-1068 comment 865134 |
| D7 | The polarity label is a white pill on the coloured panel header: `90% frequency • [Positive]` | GEO-1267-001, GEO-1267-002, GEO-1267-003, GEO-1269-009 | Validated (no epic change), GEO-1068 comment 865134 |

## Unbranded surfaces (shared concept list, GEO-1209)

`TopConceptsCard` is shared by brand Top Topics, unbranded Top Topics (GEO-1243) and the unbranded Other category page (GEO-1248). Each of GEO-1266 / 1267 / 1268 has brand TCs and dedicated unbranded TCs with the precondition "Unbranded feature flag ON (GEO-1209)"; the Description cites GEO-1209 and the GEO-1243 / GEO-1248 story keys.

| Story | AC | Unbranded TC | Surfaces |
|---|---|---|---|
| GEO-1266 | AC-1 | GEO-1266-003 | Top Topics (Overview + category page) |
| GEO-1266 | AC-1 | GEO-1266-004 | Other category page |
| GEO-1266 | AC-2 | GEO-1266-006 | Top Topics (Overview), Other category page |
| GEO-1267 | AC-1 | GEO-1267-003 | Top Topics (Overview), Other category page |
| GEO-1267 | AC-2 | GEO-1267-005 | Top Topics (Overview), Other category page |
| GEO-1267 | AC-3 | GEO-1267-008 | Top Topics (Overview) |
| GEO-1268 | AC-1 | GEO-1268-004 | Top Topics (Overview), Other category page |
| GEO-1268 | AC-2 | GEO-1268-007 | Top Topics (Overview), Other category page |
| GEO-1268 | AC-3 | GEO-1268-009 | Top Topics (Overview) |

- **GEO-1266 AC-3 (same concepts, same frequency) has no unbranded TC:** unbranded analyses are new in GEO-R1.3, so there is no "today" display to compare with (see A1).
- These TCs overlap Test plan Scenarios 174 and 175; run them in the same session as the GEO-1243 / GEO-1248 TCs (same analysis U).

## Cross-epic flags (review only, no TC)

- **GEO-1269 vs GEO-1245 / GEO-1248 (unbranded exports, GEO-1209):** the unbranded PPTX / PDF / XLSX (topic in titles, dropped sheets, Other section limited to key concepts) use the same simplified concept rows. No unbranded export TC is written here; the GEO-1209 export TCs should assert "{n} sources • {label}", no score and no Score column on their concept sections (Test plan Scenarios 176–178).
- **GEO-1269 vs GEO-1263 (GEO-1069, cover / brand row in rankings):** different sections of the same export file. One export run can serve TC-GEO-1269-001 / 002 / 006 and the GEO-1263 export TCs (Scenario 176).
- **Epic "Still open" point vs GEO-1269 D5 — RESOLVED 2026-10-20:** D5 validated by the PO (GEO-1068 comment 865134), who keeps the epic text as is ("untouched by this epic until decided"). TC-GEO-1269-010 follows the story and is a non-regression TC (Scenario 185).
- **Older analyses (non-regression, Scenario 181):** TC-GEO-1266-007, TC-GEO-1266-008, TC-GEO-1267-006, TC-GEO-1267-007, TC-GEO-1268-006, TC-GEO-1268-008, TC-GEO-1269-010, TC-GEO-1269-011 run on analysis O and check the simplified display (no score, no barometer) and unchanged content.
- **TC-GEO-1267-007** covers AC-1 and AC-2 together for older analyses only; it is a supplementary non-regression TC, AC-1 and AC-2 keep their dedicated TCs (TC-GEO-1267-001 and TC-GEO-1267-004).

## TCs that need special setup

- **Pre-deployment baseline of analysis O (resolved 2026-10-19):** GEO-1266-007, GEO-1267-006, GEO-1268-006, GEO-1268-008, GEO-1269-010, GEO-1269-011 compare O (Toyota) with the XLSX / PPTX exported on 2026-10-05, before the GEO-1068 deployment. Always apply the baseline period Sep 28 – Oct 4, 2026 (not "Last 7 days"), or the values differ. Limits of the baseline: the order of the sources in the detail panel is not in the export (TC-GEO-1267-006 checks the source count only) and the presentation of the distribution summary is not compared (TC-GEO-1268-008 checks the values).
- **Unbranded feature flag ON + unbranded analysis U with Other prompts:** GEO-1266-003, GEO-1266-004, GEO-1266-006, GEO-1267-003, GEO-1267-005, GEO-1267-008, GEO-1268-004, GEO-1268-007, GEO-1268-009.
- **Second user account of the same organisation:** GEO-1269-009.
- **Data with two concepts of the same polarity and the same frequency %:** GEO-1268-002 (to find at execution; blocked if none).
- **Export files to open (PowerPoint, PDF reader, Excel) and three export languages:** GEO-1269-001 to 008 and 011.

## Ambiguous ACs (flagged, not guessed)

- **A1 — RESOLVED 2026-10-19 (QA, baseline B1) [GEO-1266 AC-3, GEO-1267 AC-3, GEO-1268 AC-2 / AC-3]:** "unchanged from today" / "exactly as it does today" / "unchanged by this epic" need a pre-release reference that the stories do not provide. The TCs compare with the XLSX / PPTX of analysis O (Toyota) exported on 2026-10-05, before deployment (resolved 2026-10-19). For unbranded surfaces there is no "today" (new in GEO-R1.3), so no comparison TC is written for them.
- **A2 [GEO-1268 AC-2]:** today's filter behaviour is not described (single or multiple selection, how a filter is removed, whether pill counts follow other filters). TC-GEO-1268-005 asserts only the observable rules (only the selected polarity, row count = pill count, full list restored) and TC-GEO-1268-006 compares with the baseline.
- **A3 [GEO-1268 AC-1]:** sort direction is not specified (can the Sentiment sort be reversed to Negative first?). The TCs check the default order Positive → Mixed → Negative only. The A→Z tie-break (D1) does not say how case and accents are handled.
- **A4 — ANSWERED 2026-10-21 (observed, rerun 21102026-1539): the XLSX headers are translated — FR "Concept · Sentiment · Sources · Fréquence · Cité par", ES "Concepto · Sentimiento · Fuentes · Frecuencia · Citado por". Previously PARTIAL 2026-10-20 [GEO-1269 AC-1]:** the XLSX rule is now an explicit AC in the epic (1.4 AC2 "Given an XLSX export of the analysis, When the key concepts are exported, Then there is no Score column (Updated 2026-10-20)", Quentin Reant, GEO-1068, 2026-10-20); header translation in FR / ES still open. Original point: the AC names only the "slide export"; the XLSX rules (columns, no Score — D2) come from the story Rules. TC-GEO-1269-006 to 008 are tied to AC-1 through those rules. Whether XLSX column headers are translated in FR / ES is not stated (TC-GEO-1269-007 / 008 expect translated headers: to confirm).
- **A5 — ANSWERED 2026-10-21 (QA, user): the export language is the interface language of the site, by design; the FR / ES TCs set it in Settings > Interface Language before the export and restore en-GB at the end.** Original point [GEO-1269 AC-1, export languages]: how the export language is chosen (export dialog option or interface language) is not described, and the FR / ES strings for Positive / Mixed / Negative and "sources" are not quoted. The TCs give the language as test data and check against the strings sheet.
- **Q6 — ANSWERED 2026-10-21 (dev, by design):** the polarity of a topic is computed per view, on the answers of that view only (category page = Category Topics answers of that category; Overview = all categories merged). Topics are merged by name case-insensitively on the Overview ("Satisfaction client" VUS + "satisfaction client" Voitures hybrides = one topic, 12 sources = 4 + 8). Polarity = mean score of the topic quotes in the view (> 0.2 Positive, < -0.2 Negative, otherwise Mixed); the % is the frequency (answers citing the topic / answers of the view). So a topic can be Positive on the Overview and Mixed on a category page. No TC change.
- **A6 — PARTIAL 2026-10-20 [GEO-1269 AC-2]:** epic 1.4 AC3 now reads "Given another user of the same organisation, When they open the key concepts view of the analysis, Then the display matches the simplified main view" (Updated 2026-10-20, D3 validated in GEO-1068 comment 865134); no role is named, which supports the QA assumption (any user of the same organisation). Original point: "shared analysis" / "recipient" — no share link exists; read as another user of the same organisation (D3). Whether the recipient needs a particular role is not stated.
- **A7 [GEO-1267 AC-3]:** "all other existing content" is listed only through the Rules (header with name and close button, frequency, sources section). Any other panel element present today is not inventoried; TC-GEO-1267-006 compares with a baseline screenshot.
- **A8 [GEO-1266 AC-1 / AC-2]:** the brand row meta line is read as "{n} sources • {Label}" (the quote count is unbranded only, per the Rules); the Design AC writes the quote part as optional. Confirm brand rows never show a quote count.
- **A9 [GEO-1268 AC-3, TC-GEO-1268-009]:** the unbranded distribution summary has no "today" reference; the TC checks presence and consistency with the pill counts only.
- **A10 — RESOLVED 2026-10-20 [Epic vs GEO-1269]:** epic "Still open" (category sentiment tile) vs D5 (kept). PO (Quentin Reant, GEO-1068 comment 865134): "OK for all your decisions. … D0, D4, D5 and D7 need no change in the epic." D5 validated; the epic keeps the point as "untouched by this epic until decided". TC-GEO-1269-010 unchanged (marker only).

## Technical content filtered

- **ACs filtered as technical:** none (11 / 11 ACs are functional).
- **Technical details not turned into TCs:** component name `TopConceptsCard` (used only to identify the shared surfaces), "Surface: backend / frontend" notes, "No frontend work for the shared view", internal computation of the numeric score (Out of Scope).
- **Story rules used as supporting TCs (each tied to an AC):** sort menu keeps Frequency / Sentiment / A–Z (step of GEO-1268-001), filter on + Sentiment sort (GEO-1268-003), tie-break A→Z (GEO-1268-002), no quotes in the panel (steps of GEO-1267-006 / 008), coloured % in exports (GEO-1269-005), XLSX columns (GEO-1269-006 to 008), category Sentiment KPI kept (GEO-1269-010).
- **Not covered (no AC implies them):** in-app polarity labels in fr-FR / es-ES interface languages (the pill reuses the filter strings), the unbranded exports (GEO-1245 / GEO-1248 TCs).

## Test cases

### GEO-1266 — 48.1 Show only frequency and polarity on each concept (Story, Ready for QA)

#### TC-GEO-1266-001 - Brand Top Topics rows show frequency and polarity with no numeric sentiment score

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each concept row of the brand Overview Top Topics list shows its frequency % and its polarity (Positive, Mixed or Negative) and no numeric sentiment score (no "-80 sentiment"). Covers AC-1. [Validated by PO 2026-10-20: D0 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The Overview is displayed with the "Top Topics Associated with Your Brand" card |
| 2 | When the user looks at the rows of the "Top Topics Associated with Your Brand" card |  | Each row shows the concept name, its frequency % and the meta line "{n} sources • {Positive \| Mixed \| Negative}" |
| 3 | Then no row shows a numeric sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on any row |
| 4 | And a row of each polarity shows the same simplified layout | Concepts P (Positive), M (Mixed), N (Negative) | P, M and N each show their frequency % and their polarity label, and no score |

#### TC-GEO-1266-002 - Brand category page Top Topics rows show frequency and polarity with no score

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Top Topics rows of a brand category page show frequency % and polarity only, with no numeric sentiment score. Covers AC-1. [Validated by PO 2026-10-20: D0 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the category page C1 of brand analysis B | Analysis B, category C1 | The category page is displayed with its "Top Topics Associated with Your Brand" card |
| 2 | When the user looks at the rows of "Top Topics Associated with Your Brand" |  | Each row shows the concept name, its frequency % and the meta line "{n} sources • {Positive \| Mixed \| Negative}" |
| 3 | Then no row shows a numeric sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on any row |
| 4 | When the user opens another category page of B | Category C2 of B | Its "Top Topics Associated with Your Brand" rows show frequency % and polarity label only, with no score |

#### TC-GEO-1266-003 - Unbranded Top Topics rows show quotes, sources, frequency and polarity with no score

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify on the unbranded Top Topics list (shared concept list, GEO-1209 / GEO-1243) that each topic row shows its quote count, source count, frequency % and polarity, and no numeric sentiment score. Covers AC-1. Unbranded surface (GEO-1209, GEO-1243). [Validated by PO 2026-10-20: D0 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Unbranded feature flag ON (GEO-1209). Unbranded analysis U (topic, collected; UUID to confirm at execution) whose Overview "Top Topics in the Category" lists at least one Positive topic P, one Mixed topic M and one Negative topic N, with at least one prompt in the Other category so that the Other category page lists key concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of unbranded analysis U | Analysis U | The unbranded Overview is displayed with "Top Topics in the Category" |
| 2 | When the user looks at the rows of Top Topics |  | Each row shows the topic, its frequency % and the meta line "{q} quotes • {n} sources • {Positive \| Mixed \| Negative}" |
| 3 | Then no row shows a numeric sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on any row |
| 4 | When the user opens a category page of U | Category C1 of U | The Top Topics rows of the category page show the same meta line, frequency % and polarity label, with no score |

#### TC-GEO-1266-004 - Unbranded Other page concept rows show frequency and polarity with no score

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify on the Other category page of an unbranded analysis (shared concept list, GEO-1209 / GEO-1248) that each concept row shows its quote count, source count, frequency % and polarity, and no numeric sentiment score. Covers AC-1. Unbranded surface (GEO-1209, GEO-1248). [Validated by PO 2026-10-20: D0 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Unbranded feature flag ON (GEO-1209). Unbranded analysis U (topic, collected; UUID to confirm at execution) whose Overview "Top Topics in the Category" lists at least one Positive topic P, one Mixed topic M and one Negative topic N, with at least one prompt in the Other category so that the Other category page lists key concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Other category page of unbranded analysis U | Analysis U, category Other | The Other page is displayed with its key concepts and the prompts table |
| 2 | When the user looks at the key concept rows |  | Each row shows the concept, its frequency % and the meta line "{q} quotes • {n} sources • {Positive \| Mixed \| Negative}" |
| 3 | Then no row shows a numeric sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on any row |

#### TC-GEO-1266-005 - Polarity is stated as an explicit Positive, Mixed or Negative label, not by colour alone

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify that on brand Top Topics the polarity of each concept is stated as an explicit label (the Positive / Mixed / Negative filter pill without its count, in the row meta line) while the coloured accent bar and the colour of the frequency % stay. Covers AC-2. [Validated by PO 2026-10-20: D0 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The "Top Topics Associated with Your Brand" card is displayed with the Positive, Mixed and Negative filter pills above it |
| 2 | When the user looks at the row of a Positive concept | Concept P | The meta line ends with a "Positive" pill styled like the "Positive" filter pill, without a count (e.g. "12 sources • Positive") |
| 3 | And the user looks at the row of a Mixed concept | Concept M | The meta line ends with a "Mixed" pill styled like the "Mixed" filter pill, without a count |
| 4 | And the user looks at the row of a Negative concept | Concept N | The meta line ends with a "Negative" pill styled like the "Negative" filter pill, without a count |
| 5 | Then the polarity can be read without relying on colour |  | Each row states its polarity in text; the coloured accent bar and the colour of the frequency % are still shown and match the label (green Positive, amber Mixed, red Negative) |

#### TC-GEO-1266-006 - Unbranded Top Topics and Other page state polarity as an explicit label

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify on the unbranded Top Topics list and the unbranded Other category page (shared concept list) that the polarity of each row is stated as an explicit label pill, not by colour alone. Covers AC-2. Unbranded surface (GEO-1209, GEO-1243, GEO-1248). The Other page of U has no Mixed concept, so the Mixed position is checked on the Overview only. [Validated by PO 2026-10-20: D0 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Unbranded feature flag ON (GEO-1209). Unbranded analysis U (topic, collected; UUID to confirm at execution) whose Overview "Top Topics in the Category" lists at least one Positive topic P, one Mixed topic M and one Negative topic N, with at least one prompt in the Other category so that the Other category page lists key concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of unbranded analysis U | Analysis U | "Top Topics in the Category" is displayed with the Positive, Mixed and Negative filter pills |
| 2 | When the user looks at a topic row of each polarity | Topics P (Positive), M (Mixed), N (Negative) | Each meta line ends with its "Positive", "Mixed" or "Negative" pill without a count (e.g. "3 quotes • 12 sources • Negative"); the accent bar and the % colour are kept |
| 3 | When the user opens the Other category page of U | Category Other | The key concept rows are displayed |
| 4 | Then every concept row states its polarity as a label |  | Each row ends with its "Positive", "Mixed" or "Negative" pill without a count, matching the colour of its accent bar |

#### TC-GEO-1266-007 - An older analysis lists the same concepts with the same frequency as before the release

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify on analysis O (Toyota, created before the release) that the simplified display lists exactly the same concepts with the same frequency, polarity and source count as the pre-deployment XLSX baseline (display change only). Covers AC-3. Non-regression on older analyses. [QA 2026-10-21: the category "Voitures électriques" was removed from O after the baseline, which changes the Overview totals, so frequencies are compared on the category "Voitures hybrides"; Grok turned back on for O]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Analysis O = brand analysis "Toyota" on staging (https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e), created and collected before the GEO-R1.3 release. Filters on O, identical to the baseline: custom period Sep 28, 2026 – Oct 4, 2026, markets United States, Spain, France, AI engines ChatGPT, Perplexity, Gemini, Grok. Baseline = exports of O produced on 2026-10-05, before the GEO-1068 deployment (old display: "Score" column, "+86 sentiment"): .claude/Data/raw/test-data/baselines/GEO-1068/Toyota_baseline_20261005.xlsx and Toyota_baseline_20261005.pptx.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of analysis O with the baseline filters | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok), sort: Frequency | The "Top Topics Associated with Your Brand" card is displayed |
| 2 | When the user compares the listed concepts with the baseline | Baseline XLSX, sheet "Overview", table "Top Concepts" (7 concepts) | The same 7 concepts are listed: Fiabilité, Efficacité énergétique, Leadership hybride, Usage urbain, Coûts d'entretien, Coût d'achat, Bruit à l'accélération; none added, none missing |
| 3 | And the user compares the frequency % of each concept with the baseline | Category page "Voitures hybrides" of O; baseline XLSX, sheet "Voitures hybrides", column "Frequency" | On "Voitures hybrides": Fiabilité 28%, Efficacité énergétique 28%, Leadership hybride 16%, Usage urbain 8%, Coûts d'entretien 7%, Bruit à l'accélération 6%, Coût d'achat 5% |
| 4 | And the user compares the polarity and the source count of each concept with the baseline | Baseline XLSX, columns "Sentiment" and "Sources" | Coût d'achat is Mixed (8 sources), Bruit à l'accélération is Negative (7 sources), the 5 others are Positive (Fiabilité 23, Efficacité énergétique 29, Leadership hybride 17, Usage urbain 19, Coûts d'entretien 10 sources); each polarity is now stated by its label |
| 5 | Then only the display changed |  | Same concepts, polarity and source counts as the baseline on the Overview and same frequencies as the baseline on "Voitures hybrides"; only the "{score} sentiment" text (e.g. "+86 sentiment") is gone |

#### TC-GEO-1266-008 - An analysis created before the release shows the simplified concept rows

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that an analysis created before the release (O, Toyota) also shows the simplified concept rows (frequency and polarity label, no numeric sentiment score) on its Overview and category pages. Covers AC-1. Non-regression on older analyses. [Validated by PO 2026-10-20: D0 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Analysis O = brand analysis "Toyota" on staging (https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e), created and collected before the GEO-R1.3 release. Filters on O, identical to the baseline: custom period Sep 28, 2026 – Oct 4, 2026, markets United States, Spain, France, AI engines ChatGPT, Perplexity, Gemini, Grok.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of analysis O created before the release | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok) | The "Top Topics Associated with Your Brand" card is displayed |
| 2 | When the user looks at the rows of the "Top Topics Associated with Your Brand" card |  | Each row shows its frequency % and the meta line "{n} sources • {Positive \| Mixed \| Negative}" |
| 3 | Then no row shows a numeric sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "+86 sentiment", "-43 sentiment") is shown on any row |
| 4 | When the user opens the category page "Voitures hybrides" of O | Category C1 = Voitures hybrides | Its "Top Topics Associated with Your Brand" rows show frequency % and polarity label only, with no score |

### GEO-1267 — 48.2 Remove the score and barometer from the expanded concept view (Story, Ready for QA)

#### TC-GEO-1267-001 - Concept detail panel shows frequency and the polarity label with no sentiment score

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the expanded concept view (detail panel opened from a brand Top Topics row) shows the concept frequency and its polarity label in a white pill on the coloured header, and no -100 to +100 sentiment score. Covers AC-1. [Validated by PO 2026-10-20: D7 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The "Top Topics Associated with Your Brand" card is displayed |
| 2 | When the user clicks the row of a Positive concept | Concept P | The concept detail panel opens with a coloured header showing the concept name and the close button |
| 3 | Then the header shows the frequency and the polarity label |  | The header reads "{f}% frequency • Positive", "Positive" in a white pill (e.g. "90% frequency • Positive") |
| 4 | And no sentiment score is shown in the panel |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown anywhere in the panel |
| 5 | And the panel frequency matches the clicked row |  | The frequency % in the header equals the frequency % of the row of P |

#### TC-GEO-1267-002 - Panel header keeps its polarity colour with a readable white label for Mixed and Negative

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** Verify that for Mixed and Negative concepts the detail panel header keeps its polarity colour and shows the polarity label as a readable white pill next to the frequency, with no score. Covers AC-1. [Validated by PO 2026-10-20: D7 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The "Top Topics Associated with Your Brand" card is displayed |
| 2 | When the user clicks the row of a Mixed concept | Concept M | The panel opens with the header in the Mixed (amber) colour and reads "{f}% frequency • Mixed", "Mixed" in a white pill readable on the header |
| 3 | And the user closes the panel and clicks the row of a Negative concept | Concept N | The panel opens with the header in the Negative (red) colour and reads "{f}% frequency • Negative", "Negative" in a white pill readable on the header |
| 4 | Then neither panel shows a sentiment score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown anywhere in the panel for M and N |

#### TC-GEO-1267-003 - Unbranded concept detail panel shows frequency and the polarity label with no score

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in an unbranded analysis the detail panel opened from Top Topics and from the Other category page shows the frequency and the polarity label (white pill) and no -100 to +100 sentiment score. Covers AC-1. Unbranded surface (GEO-1209, GEO-1243, GEO-1248). [Validated by PO 2026-10-20: D7 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Unbranded feature flag ON (GEO-1209). Unbranded analysis U (topic, collected; UUID to confirm at execution) whose Overview "Top Topics in the Category" lists at least one Positive topic P, one Mixed topic M and one Negative topic N, with at least one prompt in the Other category so that the Other category page lists key concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of unbranded analysis U | Analysis U | "Top Topics in the Category" is displayed |
| 2 | When the user clicks the row of a topic | Topic P | The detail panel opens with a coloured header showing the topic name and the close button |
| 3 | Then the header shows the frequency and the polarity label with no score |  | The header reads "{f}% frequency • Positive" with a white pill; No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown anywhere in the panel |
| 4 | When the user opens the Other category page of U and clicks a concept row | Category Other, any concept | The panel header reads "{f}% frequency • {Positive \| Mixed \| Negative}" with a white pill and shows no sentiment score |

#### TC-GEO-1267-004 - Concept detail panel shows no barometer gauge

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the expanded concept view of a brand analysis no longer shows the Negative to Positive barometer gauge or its cursor, whatever the polarity. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The "Top Topics Associated with Your Brand" card is displayed |
| 2 | When the user clicks the row of a Positive concept | Concept P | The concept detail panel opens |
| 3 | Then the barometer gauge is not shown |  | No Negative-to-Positive gauge bar and no cursor are displayed in the panel |
| 4 | When the user opens the panel of a Mixed and then of a Negative concept | Concepts M, N | Neither panel shows the gauge bar or its cursor |

#### TC-GEO-1267-005 - Unbranded concept detail panel shows no barometer gauge

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in an unbranded analysis the detail panel opened from Top Topics and from the Other category page shows no barometer gauge and no cursor. Covers AC-2. Unbranded surface (GEO-1209, GEO-1243, GEO-1248).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Unbranded feature flag ON (GEO-1209). Unbranded analysis U (topic, collected; UUID to confirm at execution) whose Overview "Top Topics in the Category" lists at least one Positive topic P, one Mixed topic M and one Negative topic N, with at least one prompt in the Other category so that the Other category page lists key concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of unbranded analysis U | Analysis U | "Top Topics in the Category" is displayed |
| 2 | When the user clicks the row of a topic | Topic N (Negative) | The detail panel opens |
| 3 | Then the barometer gauge is not shown |  | No Negative-to-Positive gauge bar and no cursor are displayed in the panel |
| 4 | When the user opens the Other category page of U and clicks a concept row | Category Other, any concept | The panel shows no gauge bar and no cursor |

#### TC-GEO-1267-006 - Concept detail panel keeps its sources and existing content, with no quotes added

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the expanded concept view of analysis O keeps its header, frequency and cited sources unchanged compared with the pre-deployment XLSX baseline (frequency and source count; the order of the sources is not in the baseline), and that no quote is added. Covers AC-3. [Validated by PO 2026-10-20: D4 (GEO-1068 comment 865134)] [QA 2026-10-21: the category "Voitures électriques" was removed from O after the baseline, which changes the Overview totals, so frequencies are compared on the category "Voitures hybrides"; Grok turned back on for O]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Analysis O = brand analysis "Toyota" on staging (https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e), created and collected before the GEO-R1.3 release. Filters on O, identical to the baseline: custom period Sep 28, 2026 – Oct 4, 2026, markets United States, Spain, France, AI engines ChatGPT, Perplexity, Gemini, Grok. Baseline = exports of O produced on 2026-10-05, before the GEO-1068 deployment (old display: "Score" column, "+86 sentiment"): .claude/Data/raw/test-data/baselines/GEO-1068/Toyota_baseline_20261005.xlsx and Toyota_baseline_20261005.pptx.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of analysis O with the baseline filters | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok) | The "Top Topics Associated with Your Brand" card is displayed |
| 2 | When the user clicks the row of concept Fiabilité | Concept Fiabilité (Positive) | The concept detail panel opens |
| 3 | Then the header keeps the concept name, its polarity colour and the close button |  | The header shows "Fiabilité" on the Positive (green) colour, with the close button |
| 4 | And the frequency is still shown | Concept Fiabilité opened from the category page "Voitures hybrides" of O; baseline XLSX, sheet "Voitures hybrides": Fiabilité, Frequency 28% | The header shows "28% frequency" |
| 5 | And the sources section lists as many cited sources as before | Baseline XLSX, sheet "Overview": Fiabilité, Sources 23 | The sources section is displayed and lists 23 sources |
| 6 | And no quote is shown in the panel |  | The panel has no quotes section and no quote text |
| 7 | When the user clicks the close button |  | The panel closes and the "Top Topics Associated with Your Brand" card is displayed |

#### TC-GEO-1267-007 - An analysis created before the release shows no score and no barometer in the concept panel

- **ACs:** AC-1, AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the concept detail panel of an analysis created before the release (O, Toyota) also shows the simplified view: frequency and polarity, no sentiment score and no barometer. Covers AC-1 and AC-2 for older analyses (supplementary non-regression; AC-1 and AC-2 each keep their dedicated TCs TC-GEO-1267-001 and TC-GEO-1267-004).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Analysis O = brand analysis "Toyota" on staging (https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e), created and collected before the GEO-R1.3 release. Filters on O, identical to the baseline: custom period Sep 28, 2026 – Oct 4, 2026, markets United States, Spain, France, AI engines ChatGPT, Perplexity, Gemini, Grok.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of analysis O created before the release | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok) | The "Top Topics Associated with Your Brand" card is displayed |
| 2 | When the user clicks the row of a Negative concept | Concept N = Bruit à l'accélération | The concept detail panel opens with its frequency and the "Negative" label in the header |
| 3 | Then no sentiment score is shown in the panel |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-43 sentiment") is shown anywhere in the panel |
| 4 | And the barometer gauge is not shown |  | No Negative-to-Positive gauge bar and no cursor are displayed |

#### TC-GEO-1267-008 - Unbranded concept detail panel keeps its sources and content, with no quotes added

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in an unbranded analysis the detail panel keeps its coloured header with the topic name and close button, the frequency and the sources section, and adds no quote. Covers AC-3. Unbranded surface (GEO-1209, GEO-1243). [Validated by PO 2026-10-20: D4 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Unbranded feature flag ON (GEO-1209). Unbranded analysis U (topic, collected; UUID to confirm at execution) whose Overview "Top Topics in the Category" lists at least one Positive topic P, one Mixed topic M and one Negative topic N, with at least one prompt in the Other category so that the Other category page lists key concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of unbranded analysis U | Analysis U | "Top Topics in the Category" is displayed |
| 2 | When the user clicks the row of a topic | Topic M (Mixed) | The detail panel opens with a coloured header showing the topic name, the frequency and the close button |
| 3 | Then the sources section lists the cited sources of the topic |  | The sources section is displayed with at least one source |
| 4 | And no quote is shown in the panel |  | The panel has no quotes section and no quote text |
| 5 | When the user clicks the close button |  | The panel closes and Top Topics is displayed |

### GEO-1268 — 48.3 Keep sorting and filtering consistent with the simplified display (Story, Ready for QA)

#### TC-GEO-1268-001 - Sort by Sentiment orders concepts Positive, then Mixed, then Negative with no score shown

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that sorting brand Top Topics by Sentiment orders the concepts by polarity group (Positive first, then Mixed, then Negative) without exposing any numeric score, and that the sort menu keeps its three entries. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The "Top Topics Associated with Your Brand" card is displayed with its sort menu |
| 2 | When the user opens the sort menu |  | The menu lists "Sort by Frequency", "Sort by Sentiment" and "Sort A-Z", and no score entry |
| 3 | And the user selects Sentiment | Sort: Sentiment | The list is re-ordered |
| 4 | Then the Positive concepts come first, then the Mixed ones, then the Negative ones |  | Every "Positive" row is above every "Mixed" row, and every "Mixed" row is above every "Negative" row |
| 5 | And no numeric score is exposed |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on the rows or in the sort menu |

#### TC-GEO-1268-002 - Inside a polarity group concepts are ordered by frequency, then A–Z

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that with the Sentiment sort, concepts inside a polarity group are ordered by frequency (highest first) and by name A→Z when frequencies are equal. Covers AC-1. Needs data: two concepts of the same polarity with the same frequency %. [Validated by PO 2026-10-20: D1 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Analysis B (or another brand analysis, to find at execution) has two concepts of the same polarity with the same frequency % (e.g. two Positive concepts at 12%).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B sorted by Sentiment | Sort: Sentiment | The concepts are grouped Positive, Mixed, Negative |
| 2 | When the user reads the frequency % inside the Positive group |  | The frequency % decreases from top to bottom (highest first) |
| 3 | And the user reads the frequency % inside the Mixed and the Negative groups |  | In each group the frequency % decreases from top to bottom |
| 4 | Then concepts with the same frequency are ordered by name A→Z | Two concepts of the same polarity with the same frequency % | The concept whose name comes first alphabetically is listed first |

#### TC-GEO-1268-003 - With a polarity filter on, the Sentiment sort orders the single group by frequency

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that when a polarity filter is on, the Sentiment sort sorts a single group and reads as a sort by frequency, with no score exposed. Covers AC-1. [Validated by PO 2026-10-20: D1 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B sorted by Sentiment | Sort: Sentiment | The concepts are grouped Positive, Mixed, Negative |
| 2 | When the user selects the Negative filter pill | Filter: Negative | Only "Negative" concepts are listed |
| 3 | Then the list is ordered by frequency |  | The frequency % decreases from top to bottom, as with the Frequency sort under the same filter |
| 4 | And no numeric score is exposed |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on any row |

#### TC-GEO-1268-004 - Unbranded Top Topics and Other page sort by Sentiment in polarity groups

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify on the unbranded Top Topics list and the unbranded Other category page that the Sentiment sort orders rows Positive, then Mixed, then Negative, by frequency inside a group, with no score. Covers AC-1. Unbranded surface (GEO-1209, GEO-1243, GEO-1248). The Other page of U has no Mixed concept, so the Mixed position is checked on the Overview only. [Validated by PO 2026-10-20: D1 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Unbranded feature flag ON (GEO-1209). Unbranded analysis U (topic, collected; UUID to confirm at execution) whose Overview "Top Topics in the Category" lists at least one Positive topic P, one Mixed topic M and one Negative topic N, with at least one prompt in the Other category so that the Other category page lists key concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of unbranded analysis U | Analysis U | "Top Topics in the Category" is displayed with its sort menu ("Sort by Frequency", "Sort by Sentiment", "Sort A-Z") |
| 2 | When the user sorts Top Topics by Sentiment | Sort: Sentiment | The list is re-ordered |
| 3 | Then the topics are grouped Positive, then Mixed, then Negative, by frequency inside each group |  | Every "Positive" row is above every "Mixed" row, above every "Negative" row; the frequency % decreases inside each group |
| 4 | And no numeric score is exposed |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown on any row |
| 5 | When the user opens the Other category page of U and sorts its concepts by Sentiment | Category Other, Sort: Sentiment | The concepts are grouped Positive, Mixed, Negative, by frequency inside each group, with no score |

#### TC-GEO-1268-005 - Polarity filters list only the concepts of the selected polarity

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Positive, Mixed and Negative filters of brand Top Topics still list only the concepts of the selected polarity, with pill counts matching the rows, and that removing the filter restores the full list. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The Positive, Mixed and Negative filter pills are shown above the list with their counts |
| 2 | When the user selects the Positive filter pill | Filter: Positive | Only "Positive" concepts are listed and their number equals the count of the Positive pill |
| 3 | And the user deselects Positive and selects Mixed | Filter: Mixed | Only "Mixed" concepts are listed and their number equals the count of the Mixed pill |
| 4 | And the user deselects Mixed and selects Negative | Filter: Negative | Only "Negative" concepts are listed and their number equals the count of the Negative pill |
| 5 | Then removing the filter restores the full list |  | All concepts are listed again; their number equals the sum of the three pill counts |

#### TC-GEO-1268-006 - Polarity filter counts and results of an older analysis match the baseline

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify on analysis O (Toyota, created before the release) that the polarity filter pill counts and the concepts listed under each filter are the same as in the pre-deployment XLSX baseline (counts derived from the baseline rows by polarity). Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Analysis O = brand analysis "Toyota" on staging (https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e), created and collected before the GEO-R1.3 release. Filters on O, identical to the baseline: custom period Sep 28, 2026 – Oct 4, 2026, markets United States, Spain, France, AI engines ChatGPT, Perplexity, Gemini, Grok. Baseline = exports of O produced on 2026-10-05, before the GEO-1068 deployment (old display: "Score" column, "+86 sentiment"): .claude/Data/raw/test-data/baselines/GEO-1068/Toyota_baseline_20261005.xlsx and Toyota_baseline_20261005.pptx.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of analysis O with the baseline filters | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok) | The Positive, Mixed and Negative filter pills are shown with their counts |
| 2 | When the user compares the three pill counts with the baseline | Baseline XLSX, sheet "Overview", table "Top Concepts": 5 Positive, 1 Mixed, 1 Negative | The pills show Positive 5, Mixed 1, Negative 1 |
| 3 | And the user selects the Positive filter | Filter: Positive | The list shows Fiabilité, Efficacité énergétique, Leadership hybride, Usage urbain and Coûts d'entretien only |
| 4 | And the user selects the Mixed filter | Filter: Mixed | The list shows Coût d'achat only |
| 5 | And the user selects the Negative filter | Filter: Negative | The list shows Bruit à l'accélération only |
| 6 | Then filtering behaves as before the release |  | Same counts and same filtered concepts as the baseline; only the row display is simplified |

#### TC-GEO-1268-007 - Unbranded polarity filters list only the topics of the selected polarity

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify on the unbranded Top Topics list and the unbranded Other category page that the Positive, Mixed and Negative filters list only the rows of the selected polarity, as on brand Top Topics. Covers AC-2. Unbranded surface (GEO-1209, GEO-1243, GEO-1248).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Unbranded feature flag ON (GEO-1209). Unbranded analysis U (topic, collected; UUID to confirm at execution) whose Overview "Top Topics in the Category" lists at least one Positive topic P, one Mixed topic M and one Negative topic N, with at least one prompt in the Other category so that the Other category page lists key concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of unbranded analysis U | Analysis U | "Top Topics in the Category" shows the Positive, Mixed and Negative filter pills with their counts |
| 2 | When the user selects each polarity filter in turn | Positive, then Mixed, then Negative | Each filter lists only the topics of that polarity and their number equals the pill count |
| 3 | And the user removes the filter |  | All topics are listed again |
| 4 | When the user opens the Other category page of U and selects the Positive filter | Category Other, Filter: Positive | Only "Positive" concepts are listed and their number equals the pill count |

#### TC-GEO-1268-008 - The sentiment distribution summary above the list is unchanged

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the sentiment distribution summary above the concepts list of analysis O is unchanged by the epic: same values as the pre-deployment baseline and not affected by the Sentiment sort. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Analysis O = brand analysis "Toyota" on staging (https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e), created and collected before the GEO-R1.3 release. Filters on O, identical to the baseline: custom period Sep 28, 2026 – Oct 4, 2026, markets United States, Spain, France, AI engines ChatGPT, Perplexity, Gemini, Grok. Baseline = exports of O produced on 2026-10-05, before the GEO-1068 deployment (old display: "Score" column, "+86 sentiment"): .claude/Data/raw/test-data/baselines/GEO-1068/Toyota_baseline_20261005.xlsx and Toyota_baseline_20261005.pptx.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of analysis O with the baseline filters | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok) | The sentiment distribution summary is displayed in the "Top Topics Associated with Your Brand" card, above its topics list |
| 2 | When the user compares the summary with the baseline | Baseline XLSX, sheet "Overview": "71% Positive · 14% Mixed · 14% Negative" (PPTX slide 4: 5 / 1 / 1 topics) | The summary shows 71% positive, 14% mixed and 14% negative |
| 3 | And the user sorts the list by Sentiment | Sort: Sentiment | The list is re-ordered |
| 4 | Then the distribution summary is unchanged |  | The summary still shows 71% positive, 14% mixed and 14% negative |

#### TC-GEO-1268-009 - Unbranded Top Topics shows its sentiment distribution summary

- **ACs:** AC-3 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the unbranded Top Topics list keeps its sentiment distribution summary (share of positive, mixed and negative topics) above the list. Covers AC-3. Unbranded surface (GEO-1209, GEO-1243).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Unbranded feature flag ON (GEO-1209). Unbranded analysis U (topic, collected; UUID to confirm at execution) whose Overview "Top Topics in the Category" lists at least one Positive topic P, one Mixed topic M and one Negative topic N, with at least one prompt in the Other category so that the Other category page lists key concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of unbranded analysis U | Analysis U | "Top Topics in the Category" is displayed |
| 2 | When the user looks above the list of topics |  | The sentiment distribution summary shows the share of positive, mixed and negative topics |
| 3 | Then the summary is consistent with the filter pills |  | The positive, mixed and negative shares follow the Positive, Mixed and Negative pill counts |

### GEO-1269 — 48.4 Apply the simplified display everywhere concepts appear (Story, Ready for QA)

#### TC-GEO-1269-001 - PowerPoint export in English shows concepts with frequency and polarity only

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in the PowerPoint export (English) of a brand analysis each key concept row reads "{n} sources • {Positive | Mixed | Negative}" with its frequency %, with no numeric sentiment score and no barometer. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Export action of the analysis available (PowerPoint / PDF / Excel). The export language is the interface language of the site (by design, QA 2026-10-21): for a French or Spanish export, Settings > Interface Language is set to French (France) / Spanish (Spain) before the export, and English (United Kingdom) is restored at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B; period Sep 28 – Oct 4, 2026 (the default period has no Mixed or Negative concept in the top 10) | The export action is available |
| 2 | When the user exports the analysis as PowerPoint in English | Format: PPTX; export language: English (EN) | A .pptx file is downloaded |
| 3 | And the user opens the key concepts slides |  | The key concepts section lists the concepts of B |
| 4 | Then each concept shows its source count, its polarity and its frequency % | Concepts P, M, N | Each concept row reads "{n} sources • {label}" with its frequency %: "Positive" for P, "Mixed" for M, "Negative" for N |
| 5 | And no numeric sentiment score and no barometer are shown |  | No "+80 sentiment" / "-80 sentiment" text, no -100 to +100 value and no gauge on any key concepts slide |

#### TC-GEO-1269-002 - PDF export in English shows concepts with frequency and polarity only

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in the PDF export (same deck as the PowerPoint, English) each key concept row reads "{n} sources • {Positive | Mixed | Negative}" with its frequency %, with no numeric sentiment score and no barometer. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Export action of the analysis available (PowerPoint / PDF / Excel). The export language is the interface language of the site (by design, QA 2026-10-21): for a French or Spanish export, Settings > Interface Language is set to French (France) / Spanish (Spain) before the export, and English (United Kingdom) is restored at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B; period Sep 28 – Oct 4, 2026 (the default period has no Mixed or Negative concept in the top 10) | The export action is available |
| 2 | When the user exports the analysis as PDF in English | Format: PDF; export language: English (EN) | A .pdf file is downloaded |
| 3 | And the user opens the key concepts pages |  | The key concepts section lists the same concepts as the PowerPoint export |
| 4 | Then each concept shows its source count, its polarity and its frequency % | Concepts P, M, N | Each concept row reads "{n} sources • {label}" with its frequency % ("Positive", "Mixed" or "Negative") |
| 5 | And no numeric sentiment score and no barometer are shown |  | No "+80 sentiment" / "-80 sentiment" text, no -100 to +100 value and no gauge on any key concepts page |

#### TC-GEO-1269-003 - PowerPoint and PDF exports in French show the polarity labels in French

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the PowerPoint and PDF exports in French show each key concept with its source count, its polarity label and its frequency % in French, with no numeric sentiment score and no barometer. Covers AC-1. Exact French strings to check against the strings sheet (not quoted in the story).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Export action of the analysis available (PowerPoint / PDF / Excel). The export language is the interface language of the site (by design, QA 2026-10-21): for a French or Spanish export, Settings > Interface Language is set to French (France) / Spanish (Spain) before the export, and English (United Kingdom) is restored at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The export action is available |
| 2 | When the user exports the analysis as PowerPoint in French | Format: PPTX; export language: French (FR), interface language set to French (France) in Settings > Interface Language before the export | A .pptx file is downloaded |
| 3 | Then each concept row shows the polarity label and the word "sources" in French | Concepts P, M, N | The positive, mixed and negative labels and "sources" are the French strings of the strings sheet; no English "Positive", "Mixed", "Negative" left |
| 4 | And no numeric sentiment score and no barometer are shown |  | No "+80 sentiment" / "-80 sentiment" text, no -100 to +100 value and no gauge on any key concepts slide |
| 5 | When the user exports the analysis as PDF in French | Format: PDF; export language: French (FR), interface language set to French (France) in Settings > Interface Language before the export | The key concepts pages show the same French labels as the PowerPoint, with no score and no gauge |

#### TC-GEO-1269-004 - PowerPoint and PDF exports in Spanish show the polarity labels in Spanish

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the PowerPoint and PDF exports in Spanish show each key concept with its source count, its polarity label and its frequency % in Spanish, with no numeric sentiment score and no barometer. Covers AC-1. Exact Spanish strings to check against the strings sheet (not quoted in the story).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Export action of the analysis available (PowerPoint / PDF / Excel). The export language is the interface language of the site (by design, QA 2026-10-21): for a French or Spanish export, Settings > Interface Language is set to French (France) / Spanish (Spain) before the export, and English (United Kingdom) is restored at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The export action is available |
| 2 | When the user exports the analysis as PowerPoint in Spanish | Format: PPTX; export language: Spanish (ES), interface language set to Spanish (Spain) in Settings > Interface Language before the export | A .pptx file is downloaded |
| 3 | Then each concept row shows the polarity label and the word "sources" in Spanish | Concepts P, M, N | The positive, mixed and negative labels and "sources" are the Spanish strings of the strings sheet; no English "Positive", "Mixed", "Negative" left |
| 4 | And no numeric sentiment score and no barometer are shown |  | No "+80 sentiment" / "-80 sentiment" text, no -100 to +100 value and no gauge on any key concepts slide |
| 5 | When the user exports the analysis as PDF in Spanish | Format: PDF; export language: Spanish (ES), interface language set to Spanish (Spain) in Settings > Interface Language before the export | The key concepts pages show the same Spanish labels as the PowerPoint, with no score and no gauge |

#### TC-GEO-1269-005 - In slide exports the frequency % takes the polarity colour

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that in the PowerPoint export the frequency % of each key concept takes its polarity colour (green Positive, amber Mixed, red Negative), like the row accent bar and as on the dashboard. Covers AC-1. [Validated by PO 2026-10-20: D6 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Export action of the analysis available (PowerPoint / PDF / Excel). The export language is the interface language of the site (by design, QA 2026-10-21): for a French or Spanish export, Settings > Interface Language is set to French (France) / Spanish (Spain) before the export, and English (United Kingdom) is restored at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has exported brand analysis B as PowerPoint in English | Format: PPTX; export language: English (EN); analysis B, period Sep 28 – Oct 4, 2026 (the default period has no Mixed or Negative concept in the top 10) | The .pptx file is open on the key concepts slides |
| 2 | When the user looks at the frequency % of a Positive, a Mixed and a Negative concept | Concepts P, M, N | The frequency % of P is green, of M amber and of N red |
| 3 | Then each frequency % has the colour of its row accent bar |  | For every concept row the % colour matches its accent bar and the dashboard colour of the same concept |

#### TC-GEO-1269-006 - XLSX export in English has no Score column in the concepts tables

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in the XLSX export (English) the concepts tables have the columns Concept · Sentiment · Sources · Frequency · Cited by, that the "Score" column is removed and that the Sentiment column holds the polarity label. Covers AC-1 (XLSX rule of GEO-1269 = epic 1.4 AC2, Updated 2026-10-20). [Validated by PO 2026-10-20: D2 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Export action of the analysis available (PowerPoint / PDF / Excel). The export language is the interface language of the site (by design, QA 2026-10-21): for a French or Spanish export, Settings > Interface Language is set to French (France) / Spanish (Spain) before the export, and English (United Kingdom) is restored at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B; period Sep 28 – Oct 4, 2026 (the default period has no Mixed or Negative concept in the top 10) | The export action is available |
| 2 | When the user exports the analysis as Excel in English | Format: XLSX; export language: English (EN) | A .xlsx file is downloaded |
| 3 | And the user opens every concepts table of the workbook |  | The concepts tables are present |
| 4 | Then each concepts table has the columns Concept, Sentiment, Sources, Frequency and Cited by |  | The header row reads "Concept", "Sentiment", "Sources", "Frequency", "Cited by" in this order; there is no "Score" column |
| 5 | And the Sentiment column holds the polarity label of each concept | Concepts P, M, N | "Positive" for P, "Mixed" for M, "Negative" for N; no numeric score in any cell |
| 6 | And the concepts and frequencies match the dashboard |  | Same concepts and same frequency values as the "Top Topics Associated with Your Brand" card of B |

#### TC-GEO-1269-007 - XLSX export in French shows the polarity labels in French with no Score column

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that in the XLSX export in French the Sentiment column of the concepts tables holds the French polarity labels and that no Score column is present. Covers AC-1 (XLSX rule of GEO-1269 = epic 1.4 AC2, Updated 2026-10-20). Exact French strings to check against the strings sheet. [Validated by PO 2026-10-20: D2 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Export action of the analysis available (PowerPoint / PDF / Excel). The export language is the interface language of the site (by design, QA 2026-10-21): for a French or Spanish export, Settings > Interface Language is set to French (France) / Spanish (Spain) before the export, and English (United Kingdom) is restored at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The export action is available |
| 2 | When the user exports the analysis as Excel in French | Format: XLSX; export language: French (FR), interface language set to French (France) in Settings > Interface Language before the export | A .xlsx file is downloaded |
| 3 | Then the concepts tables have five columns and no Score column |  | The header row has the French equivalents of Concept, Sentiment, Sources, Frequency and Cited by, in this order; no Score column |
| 4 | And the Sentiment column holds the French polarity labels | Concepts P, M, N | The positive, mixed and negative labels are the French strings of the strings sheet; no English label and no numeric score |

#### TC-GEO-1269-008 - XLSX export in Spanish shows the polarity labels in Spanish with no Score column

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that in the XLSX export in Spanish the Sentiment column of the concepts tables holds the Spanish polarity labels and that no Score column is present. Covers AC-1 (XLSX rule of GEO-1269 = epic 1.4 AC2, Updated 2026-10-20). Exact Spanish strings to check against the strings sheet. [Validated by PO 2026-10-20: D2 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Export action of the analysis available (PowerPoint / PDF / Excel). The export language is the interface language of the site (by design, QA 2026-10-21): for a French or Spanish export, Settings > Interface Language is set to French (France) / Spanish (Spain) before the export, and English (United Kingdom) is restored at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of brand analysis B | Analysis B | The export action is available |
| 2 | When the user exports the analysis as Excel in Spanish | Format: XLSX; export language: Spanish (ES), interface language set to Spanish (Spain) in Settings > Interface Language before the export | A .xlsx file is downloaded |
| 3 | Then the concepts tables have five columns and no Score column |  | The header row has the Spanish equivalents of Concept, Sentiment, Sources, Frequency and Cited by, in this order; no Score column |
| 4 | And the Sentiment column holds the Spanish polarity labels | Concepts P, M, N | The positive, mixed and negative labels are the Spanish strings of the strings sheet; no English label and no numeric score |

#### TC-GEO-1269-009 - Another user of the organisation sees the simplified key concepts view

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that another user of the same organisation opening the analysis (no share link exists; decision D3) sees the key concepts view matching the simplified main view: rows, detail panel, sort and filters. Covers AC-2 (= epic 1.4 AC3). Needs a second user account. [Validated by PO 2026-10-20: D0, D3, D7 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Second user account U2 of the same organisation (not the creator of B, role allowed to open analyses; to confirm at execution), logged in in a separate browser session.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given user U2 of the same organisation opens brand analysis B | User U2, analysis B | The Overview of B is displayed with the "Top Topics Associated with Your Brand" card |
| 2 | When U2 looks at the rows of the "Top Topics Associated with Your Brand" card |  | Each row shows its frequency % and "{n} sources • {Positive \| Mixed \| Negative}"; No -100 to +100 value and no "{score} sentiment" text (e.g. "-80 sentiment", "+80 sentiment") is shown |
| 3 | And U2 clicks the row of a concept | Concept P | The panel header reads "{f}% frequency • Positive" with a white pill; no score and no gauge |
| 4 | And U2 sorts the list by Sentiment and selects the Negative filter | Sort: Sentiment; Filter: Negative | The list is grouped Positive, Mixed, Negative, then only Negative concepts are listed |
| 5 | Then the display matches the main view of the QA account | Same analysis B open with the QA account | Same concepts, frequency %, labels, panel content, sort and filter results |

#### TC-GEO-1269-010 - The category-level Sentiment KPI tile is kept unchanged

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the category-level Sentiment KPI tile (aggregate -100 to +100 indicator among the category metrics) is still shown and unchanged, while the per-concept score is removed. Covers AC-2 (= epic 1.4 AC3) (rule D5, validated by PO; the epic keeps the tile "untouched by this epic until decided"). Non-regression, with the value of analysis O compared with the pre-deployment baseline. [Validated by PO 2026-10-20: D5 (GEO-1068 comment 865134)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Brand analysis B (collected, created with the GEO-R1.3 wizard; UUID to confirm at execution) whose Overview Top Topics list holds at least one Positive concept P, one Mixed concept M and one Negative concept N, and whose category page C1 also lists concepts. Analysis O = brand analysis "Toyota" on staging (https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e), created and collected before the GEO-R1.3 release. Filters on O, identical to the baseline: custom period Sep 28, 2026 – Oct 4, 2026, markets United States, Spain, France, AI engines ChatGPT, Perplexity, Gemini, Grok. Baseline = exports of O produced on 2026-10-05, before the GEO-1068 deployment (old display: "Score" column, "+86 sentiment"): .claude/Data/raw/test-data/baselines/GEO-1068/Toyota_baseline_20261005.xlsx and Toyota_baseline_20261005.pptx.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the category page C1 of brand analysis B | Analysis B, category C1 | The category metrics are displayed |
| 2 | Then the Sentiment KPI tile is shown with its -100 to +100 value |  | The Sentiment tile is displayed among the category metrics with its aggregate value, as before the release |
| 3 | When the user opens the category page "Voitures hybrides" of analysis O with the baseline filters | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok), category Voitures hybrides | The category metrics are displayed |
| 4 | Then the Sentiment KPI tile shows the baseline value | Baseline XLSX, sheet "Voitures hybrides", Gauge "Sentiment" (PPTX slide 14) | The Sentiment tile is shown with the value +75 and the band "Good", as in the baseline |
| 5 | And the concept rows of the page show no per-concept score |  | No -100 to +100 value and no "{score} sentiment" text (e.g. "+86 sentiment") is shown on the Top Topics rows |

#### TC-GEO-1269-011 - Slide export of an analysis created before the release shows the simplified concepts

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the PowerPoint export of an analysis created before the release (O, Toyota) shows the same key concepts and frequencies as the pre-deployment PPTX baseline, now in the simplified form (source count, polarity label and frequency %, no score, no barometer). Covers AC-1. Non-regression on older analyses. [QA 2026-10-21: the category "Voitures électriques" was removed from O after the baseline, which changes the Overview totals, so frequencies are compared on the category "Voitures hybrides"; Grok turned back on for O]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to the QA organisation of the release (e.g. "QA-GEO", to confirm at execution). GEO-1068 deployed on staging. Analysis O = brand analysis "Toyota" on staging (https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e), created and collected before the GEO-R1.3 release. Filters on O, identical to the baseline: custom period Sep 28, 2026 – Oct 4, 2026, markets United States, Spain, France, AI engines ChatGPT, Perplexity, Gemini, Grok. Baseline = exports of O produced on 2026-10-05, before the GEO-1068 deployment (old display: "Score" column, "+86 sentiment"): .claude/Data/raw/test-data/baselines/GEO-1068/Toyota_baseline_20261005.xlsx and Toyota_baseline_20261005.pptx. Export action of the analysis available (PowerPoint / PDF / Excel). The export language is the interface language of the site (by design, QA 2026-10-21): for a French or Spanish export, Settings > Interface Language is set to French (France) / Spanish (Spain) before the export, and English (United Kingdom) is restored at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of analysis O with the baseline filters | Analysis O (Toyota), baseline filters (Sep 28 – Oct 4, 2026; United States, Spain, France; ChatGPT, Perplexity, Gemini, Grok) | The export action is available |
| 2 | When the user exports the analysis as PowerPoint in English | Format: PPTX; export language: English (EN) | A .pptx file is downloaded |
| 3 | Then the key concepts slides list the same concepts and frequencies as the baseline | Baseline PPTX slide 4 (Overview) and slide 17 (Voitures hybrides) | Overview (slide 4): the same 7 concepts as the baseline (frequencies not compared). Voitures hybrides (slide 17): Fiabilité 28%, Efficacité énergétique 28%, Leadership hybride 16%, Usage urbain 8%, Coûts d'entretien 7%, Bruit à l'accélération 6%, Coût d'achat 5% |
| 4 | And each concept row reads "{n} sources • {label}" with its frequency % |  | e.g. "23 sources • Positive" for Fiabilité, "8 sources • Mixed" for Coût d'achat, "7 sources • Negative" for Bruit à l'accélération |
| 5 | And no numeric sentiment score and no barometer are shown |  | No "{score} sentiment" text (baseline: "+86 sentiment", "-43 sentiment"), no -100 to +100 value and no gauge on any key concepts slide |
