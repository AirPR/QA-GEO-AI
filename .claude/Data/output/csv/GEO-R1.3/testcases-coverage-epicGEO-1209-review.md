# GEO-1209 Unbranded Analysis and Other Prompts — epic test case review (GEO-R1.3, generated 2026-10-19)

**Sources (read-only):** `apps/geo/GEO-R1.3/GEO-1209/` (EPIC.md, epic-data.json, 8 STORY_*.md GEO-1241 to GEO-1248, Jira state on 2026-10-19). Consistency references: `apps/geo/GEO-R1.3/QA-READINESS-GEO-R1.3.md` and `apps/geo/GEO-R1.3/TEST-PLAN-GEO-R1.3.md` (scenarios 84–152 for GEO-1209, cross-epic 164–180), and the sibling GEO-1002 CSV / review (style, IDs and test data). Where the epic text and a story disagree, the story ACs are the reference.

**Scope:** 8 Stories (GEO-1241 to GEO-1248), all Ready for QA. **Excluded from the TC scope:** Design Tasks GEO-1185 and GEO-1186 (GEO-1186 text is stale vs GEO-1248 AC9), and the GEO-1068 concept list stories (shared component, tested in the GEO-1068 TCs). Mode: no `--figma`; Figma frames are pending designer updates on all 8 stories, so the ACs are the reference (design copy from the story files is quoted only as a hint).

**CSV:** `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-epicGEO-1209.csv` — 97 TCs, 449 step rows (+1 header), 16 columns, `;` separator, fields quoted with doubled quotes when they hold `;` or `"`, UTF-8 without BOM, LF. One Cucumber step per row; case-level fields on the first row of each TC only. QA Parent = GEO-1209, Components = GEO, QA Component = GEO Module, Labels empty, Test Type = Manual, QA Regression = Yes for Urgent/High. Not imported to Quality Plus, nothing written to Jira.

**Feature flag:** every TC runs with the global unbranded / Other flag ON (precondition), except TC-GEO-1241-002 (AC-1b), which needs the flag OFF.

**Sync 2026-10-20 (`/sync-tcs-epic GEO-1209 GEO-R1.3 --since 2026-10-19`):** the 8 stories were already in line with Jira; the epic was aligned with them by the PO on 2026-10-19 (Quentin Reant, GEO-1209 description 20:44 and comment 865133). 6 TCs updated (descriptions, preconditions, one test-data hint), no TC added or deleted: TC-GEO-1241-005 (P4 validated, GEO-1069 comment 865135), TC-GEO-1242-010 (A15 answered, PR #801), TC-GEO-1242-011 (PO option A, PR #808, A10 partial), TC-GEO-1242-012 / 013 (related bug GEO-1249), TC-GEO-1243-004 (collection after PR #801).

**Sync 2026-10-22 (`/sync-tcs-epic GEO-1209 GEO-R1.3 --since 2026-10-20`):** no story or epic description changed in Jira since 2026-10-20 (local files unchanged). The PO validated the dev i18n sheet of the epic: "Everything is validated except the changes below." (GEO-1209 comment 865635, Quentin Reant, 2026-10-21; dev sheet in comment 865496, Abdenasser Aroukhsiss, 2026-10-20). 19 TCs updated, no TC added or deleted (97 TCs): 12 "[Proposed copy]" markers replaced by "[Validated by PO 2026-10-21 (GEO-1209 comment 865635)]" (TC-GEO-1241-016 / 017, TC-GEO-1243-003 / 009 / 010 / 011 / 014, TC-GEO-1244-010 / 011, TC-GEO-1245-003 / 004, TC-GEO-1247-010); 6 TCs aligned on the texts changed by the PO, marked "[Copy changed by PO 2026-10-21 (GEO-1209 comment 865635, point N); re-run once delivered]" (TC-GEO-1241-001 card descriptions, step subtitle, no "No brand scorecard" point; TC-GEO-1241-006 topic helper; TC-GEO-1241-007 "Add your industry or topic to continue."; TC-GEO-1241-008 / 010 "Switching the mode clears your brand or topic, your countries, your categories and your prompts."; TC-GEO-1241-011 discovery texts "…across your countries." / "…your topic, your countries and their languages."); TC-GEO-1247-009 aligned on the validated banner text (title "{n} prompts are in Other.", body "Pick a category and a type. Anything left as Other still runs, but it returns key concepts only, no metrics.") and renamed, while GEO-1247 AC-6 still reads "improves measurement accuracy" (doc fix requested). Delivery of the changed texts on staging is not confirmed yet: re-run TC-GEO-1241-001 / 006 / 007 / 008 / 010 / 011 once delivered, and TC-GEO-1247-009. Bugs: GEO-1508 and GEO-1509 Passed QA (2026-10-21; TC-GEO-1241-014 / TC-GEO-1246-003 already aligned and PASS); GEO-1249 Ready for QA (re-run TC-GEO-1242-012 / 013 once their setup exists). Report only, nothing applied: GEO-1514 (To Do, "country" instead of "market") and GEO-1507 (GEO-1002, Ready for QA, step "Review" renamed "Summary": TC-GEO-1241-001 / 002 stepper lists to update once it passes QA).

## Summary

| Metric | Value |
|---|---|
| Test cases | 97 |
| Steps (CSV rows) | 449 |
| Stories | 8 |
| Coverage | happy path 67 · edge 16 · error 3 · state 11 |
| Priority | Urgent 0 · High 34 · Medium 56 · Low 7 |
| UI / Functional | UI 5 · Functional 92 |
| Smoke = Yes | 9 |
| QA Regression = Yes | 34 |
| AC coverage | 69 / 69 (every AC has at least one dedicated TC) |
| Exact-text TCs "[Proposed copy]" | 0 (sync 2026-10-22: the 16 are validated by the PO on 2026-10-21, TC-GEO-1241-001 / 006 / 011 with changed copy; TC-GEO-1241-007 / 008 / 010 now also check an exact text) |
| TCs needing special setup | 29 |

| Story | Title | Jira status | ACs | TCs | Steps | Smoke | Happy | Edge | Error | State | High | Medium | Low |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| GEO-1241 | Choose the analysis type | Ready for QA | 13 | 17 | 84 | 2 | 9 | 2 | 1 | 5 | 9 | 8 | 0 |
| GEO-1242 | Run an analysis without a target brand | Ready for QA | 10 | 14 | 66 | 1 | 10 | 3 | 1 | 0 | 7 | 6 | 1 |
| GEO-1243 | Show an Overview built for a topic | Ready for QA | 12 | 15 | 68 | 1 | 12 | 1 | 1 | 1 | 4 | 9 | 2 |
| GEO-1244 | Show the Category view and the prompts for a topic | Ready for QA | 8 | 11 | 47 | 1 | 8 | 2 | 0 | 1 | 2 | 8 | 1 |
| GEO-1245 | Adapt the Action Center, the export and the emails for a topic | Ready for QA | 3 | 5 | 23 | 1 | 4 | 1 | 0 | 0 | 3 | 2 | 0 |
| GEO-1246 | Manage the prompts of an unbranded analysis | Ready for QA | 2 | 4 | 17 | 1 | 3 | 1 | 0 | 0 | 2 | 2 | 0 |
| GEO-1247 | Classify prompts by question type with an Other fallback | Ready for QA | 9 | 14 | 64 | 1 | 8 | 4 | 0 | 2 | 4 | 9 | 1 |
| GEO-1248 | Show prompts in Other on the dashboard | Ready for QA | 12 | 17 | 80 | 1 | 13 | 2 | 0 | 2 | 3 | 12 | 2 |

## Test data

| Item | Value | Used by |
|---|---|---|
| Environment | Staging https://staging-geo.onclusive.com/geo, QA account, interface en-GB | all TCs |
| Organisation T | Pool test organisation (e.g. QA-GEO) with a prompt pool set; P = pool, U = slots in use, read on the dashboard pool block "U / P" (same as GEO-1002) | all wizard and Manage Scope TCs |
| Feature flag | Global unbranded / Other flag ON; OFF only for TC-GEO-1241-002 | all TCs |
| Unbranded wizard scope | Unbranded analysis, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 / C2 (e.g. "Parcel delivery", "International shipping") = 2 x (2 x 30) = 120 suggestions; a third category C3 "Courier services" added for the 180 check | GEO-1241, GEO-1242 wizard TCs, GEO-1247 |
| Brand wizard scope | Brand analysis, brand "Decathlon", market GB (EN), detected categories kept | TC-GEO-1241-010, TC-GEO-1247-001, TC-GEO-1247-014 |
| Analysis UA | Unbranded "Postal services", GB (EN) + FR (FR), C1 + C2, every suggestion kept, 1 custom prompt in C1 with an empty type (Other type), 1 custom Visibility prompt with an empty category (Other category); daily, created early so it reaches 7+ collections | most GEO-1242 to GEO-1248 TCs |
| Analysis UZ | Unbranded "Car insurance", GB (EN), every Category Topics prompt unticked, no prompt in Other; collected | TC-GEO-1243-007, TC-GEO-1248-002 |
| Analysis BA | Brand "Decathlon" created with the flag ON, GB (EN) + FR (FR), 2 categories, 1 Other-type prompt in a real category, 1 Visibility prompt in the Other category; collected | TC-GEO-1245-001, TC-GEO-1246-004, TC-GEO-1247-008, GEO-1248 TCs |
| Analyses UN / BN / UE / UN2 | UN: unbranded niche scope with a category / market naming 0–1 brand (CN) and one naming 2–3 brands (CT); BN: brand analysis with 0–1 competitor in a category / market; UE: unbranded scope whose Category Topics returned no topic (dev support); UN2: new unbranded "Frozen food" for the Competitors card | TC-GEO-1242-011 / 012 / 013, TC-GEO-1243-008, TC-GEO-1243-015 |
| Email | QA account mailbox receiving the analysis ready email; new unbranded analysis "Frozen food" | TC-GEO-1245-005 |
| Dev support | Collection / generation logs and concepts API for internal inputs (QUESTION_ADAPTATION, Perception system instruction, extraction path, attached brands, InBrief input); forced InBrief format failure | see "TCs needing special setup" |

Counts that depend on the organisation (U, P, X) are never hard-coded. Suggestion counts (120, 180, 30 per pair, 60 per added market) come from the AC rule "30 prompts per category and market (10 Visibility, 10 Competitive, 10 Category Topics), no Brand Image" and assume no prompt was added or deleted beforehand. Brand names, themes and winners depend on the AI answers: the TCs call them B1–B4, X, Y, T1, T2, W1, W2 and read them at execution.

## AC inventory and traceability

### GEO-1241 — Choose the analysis type (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Two cards, nothing selected | GEO-1241-001 |
| AC-1b | Flag off, wizard unchanged (updated 2026-10-19) | GEO-1241-002 |
| AC-2 | Selection enables continue and the pill | GEO-1241-003, GEO-1241-004 |
| AC-3 | Topic & Country step in unbranded (updated 2026-10-09) | GEO-1241-005 |
| AC-4 | Topic question and helper | GEO-1241-006 |
| AC-5 | Empty topic | GEO-1241-007 |
| AC-6 | Switching the mode clears the later steps (updated 2026-10-09) | GEO-1241-008, GEO-1241-009, GEO-1241-010 |
| AC-7 | Topic version of the discovery screen (updated 2026-10-09) | GEO-1241-011 |
| AC-8 | Prompt types in unbranded | GEO-1241-012 |
| AC-9 | 30 prompts per category and market | GEO-1241-013 |
| AC-10 | Type badges and selects | GEO-1241-014 |
| AC-11 | Pool cost | GEO-1241-015 |
| AC-12 | Review warning | GEO-1241-016, GEO-1241-017 |

> AC-1b is the only flag OFF TC of the epic. AC-12 extends the GEO-1237 AC-2 missing-metrics warning (TC-GEO-1237-004). AC-8 cites GEO-1233 (EPIC-034 story 1.4); in unbranded there is no background competitor discovery (GEO-1251 guards).

### GEO-1242 — Run an analysis without a target brand (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Mode and topic stored, no target | GEO-1242-001 |
| AC-2 | No brand is the target | GEO-1242-002 |
| AC-3 | Topic split into 2 categories | GEO-1242-003 |
| AC-4 | Production templates, [Competitor 4] (updated 2026-10-07) | GEO-1242-004, GEO-1242-005 |
| AC-5 | Adaptation with the topic (updated 2026-10-07) | GEO-1242-006 |
| AC-6 | 10 Category Topics prompts per category | GEO-1242-007 |
| AC-7 | Category Topics questions run as written (updated 2026-10-09) | GEO-1242-008 |
| AC-8 | Category Topics analysis (updated 2026-10-09) | GEO-1242-009, GEO-1242-010 |
| AC-9 | Competitive with too few competitors (updated 2026-10-19) | GEO-1242-011, GEO-1242-012, GEO-1242-013 |
| AC-10 | Topic not editable (updated 2026-10-09) | GEO-1242-014 |

> AC-9 follows the story (updated 2026-10-19): fewer than 2 competitors = not sent, no row; "still sent with the empty slots removed" only stays for brand analyses (TC-GEO-1242-013). Up to 12 topics per category, production thresholds kept. Epic aligned 2026-10-19 (PO, GEO-1209 description 20:44, comment 865133).

### GEO-1243 — Show an Overview built for a topic (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Sidebar block (updated 2026-10-09) | GEO-1243-001 |
| AC-2 | Hidden widgets | GEO-1243-002 |
| AC-3 | InBrief about the topic (updated 2026-10-09) | GEO-1243-003 |
| AC-4 | Dedicated topic prompt (updated 2026-10-19) | GEO-1243-004 |
| AC-5 | Format check (updated 2026-10-09) | GEO-1243-005, GEO-1243-006 |
| AC-6 | Hidden or empty (updated 2026-10-09) | GEO-1243-007, GEO-1243-008 |
| AC-7 | Top Topics (updated 2026-10-07) | GEO-1243-009 |
| AC-8 | Neutral SOV ring | GEO-1243-010 |
| AC-9 | Landscape table | GEO-1243-011 |
| AC-10 | Citation sources (updated 2026-10-09) | GEO-1243-012 |
| AC-11 | Captions | GEO-1243-013 |
| AC-12 | Analyses list (new, 2026-10-09) | GEO-1243-014, GEO-1243-015 |

> AC-4 follows the story (updated 2026-10-19): one quote per topic in the InBrief input (epic aligned 2026-10-19; PO "ok for the inbrief change", GEO-1209 comment 864534). Top Topics uses the GEO-1068 concept list (no GEO-1068 TC here).

### GEO-1244 — Show the Category view and the prompts for a topic (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | No KPI cards | GEO-1244-001 |
| AC-2 | Time Evolution and matrix (updated 2026-10-09) | GEO-1244-002, GEO-1244-003 |
| AC-3 | Top 10 rule (updated 2026-10-07) | GEO-1244-004, GEO-1244-005 |
| AC-4 | Winner or Split (updated 2026-10-09) | GEO-1244-006, GEO-1244-007 |
| AC-5 | Per collection (updated 2026-10-07) | GEO-1244-008 |
| AC-6 | Detail panel | GEO-1244-009 |
| AC-7 | Category Topics label (updated 2026-10-09) | GEO-1244-010 |
| AC-8 | Landscape title at category scope (updated 2026-10-09) | GEO-1244-011 |

### GEO-1245 — Adapt the Action Center, the export and the emails for a topic (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Action Center hidden | GEO-1245-001, GEO-1245-002 |
| AC-2 | Export | GEO-1245-003, GEO-1245-004 |
| AC-3 | Analysis ready email | GEO-1245-005 |

> No export frame exists for GEO-1245 (GEO-1185 "PowerPoint export" still to come): expected layouts are today's with dropped slides skipped and topic titles.

### GEO-1246 — Manage the prompts of an unbranded analysis (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Fresh suggestions per mode | GEO-1246-001, GEO-1246-002, GEO-1246-004 |
| AC-2 | Type select | GEO-1246-003, GEO-1246-004 |

> Extends GEO-1239 AC-8 (Manage Scope add market / category, TC-GEO-1239-009 / 010) and the type select of GEO-1239.

### GEO-1247 — Classify prompts by question type with an Other fallback (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Type badges in a brand analysis | GEO-1247-001 |
| AC-2 | Each missing dimension falls back alone | GEO-1247-002, GEO-1247-003, GEO-1247-014 |
| AC-3 | Inline add never blocked | GEO-1247-004 |
| AC-4 | Other in the column filters | GEO-1247-005 |
| AC-5 | "Other" in an inline select (updated 2026-10-09) | GEO-1247-006, GEO-1247-007, GEO-1247-008 |
| AC-6 | Non-blocking table warning | GEO-1247-009 |
| AC-7 | Review card (updated 2026-10-09) | GEO-1247-010, GEO-1247-011 |
| AC-8 | Manage Scope | GEO-1247-012 |
| AC-9 | Cost and output of an Other-type prompt (updated 2026-10-07) | GEO-1247-013 |

> AC-3 overrides GEO-1234 AC-3 with the flag ON (TC-GEO-1234-005 stays flag OFF only).

### GEO-1248 — Show prompts in Other on the dashboard (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Sidebar entry | GEO-1248-001, GEO-1248-002 |
| AC-2 | Other category page | GEO-1248-003 |
| AC-3 | Other tab in a real category | GEO-1248-004, GEO-1248-005 |
| AC-4 | Visibility / Competitive in the Other category (updated 2026-10-07) | GEO-1248-006, GEO-1248-007 |
| AC-5 | Competitive in Other runs as written (updated 2026-10-07) | GEO-1248-008 |
| AC-6 | No cross-category extraction (updated 2026-10-07) | GEO-1248-009 |
| AC-7 | Concepts extracted, excluded from KPIs (updated 2026-10-09) | GEO-1248-010 |
| AC-8 | Other-type prompt runs as written (updated 2026-10-07) | GEO-1248-011 |
| AC-9 | Concepts feed InBrief and Top Concepts | GEO-1248-012, GEO-1248-013 |
| AC-10 | Classification takes effect next run | GEO-1248-014 |
| AC-11 | Export | GEO-1248-015 |
| AC-12 | Sources tab and detail panel (updated 2026-10-09) | GEO-1248-016, GEO-1248-017 |

> AC-9 is tested as written; GEO-1186 (Design Task) text is stale (excludes Other from Top Concepts, mentions a "classify in Manage Scope" hint absent from the ACs). The Other page uses the GEO-1068 concept list (no GEO-1068 TC here).

## Cross-epic overrides and links (as requested)

- **GEO-1247 AC-3 overrides GEO-1234 AC-3** (GEO-1002) with the flag ON: the inline confirm is no longer disabled when the category or type is empty; the empty dimension falls back to Other (TC-GEO-1247-004). TC-GEO-1234-005 keeps the precondition "flag OFF" and must not be run with the flag ON.
- **GEO-1246 extends GEO-1239** (Manage Scope prompts): unbranded fresh suggestions on add category / add market (TC-GEO-1246-001 / 002, related TC-GEO-1239-010 / 009) and the unbranded type select (TC-GEO-1246-003); brand analyses keep Reputation and Brand Image (TC-GEO-1246-004). Other prompts on inline selects in Manage Scope: TC-GEO-1247-008 / 012 (related TC-GEO-1239-001).
- **GEO-1241 AC-12 extends the GEO-1237 Review warning** (TC-GEO-1237-004): InBrief and Top Topics are named when no Category Topics and no Other prompt is kept (TC-GEO-1241-016, negative case TC-GEO-1241-017).
- **GEO-1241 AC-8 cites GEO-1233** (EPIC-034 story 1.4 = GEO-1233, TC-GEO-1233-001): no Brand Image, Category Topics instead of Reputation, Competitive with a fourth competitor (TC-GEO-1241-012). GEO-1241 AC-9 / AC-11 mirror TC-GEO-1233-002 and TC-GEO-1229-002 / 003.
- **GEO-1241 AC-1b / GEO-1231 AC-7**: flag OFF = 4-step wizard (TC-GEO-1241-002, same shell as TC-GEO-1231-001 / 002); flag ON = Analysis Type first, 5 steps (TC-GEO-1241-001).
- **Unbranded competitors (GEO-1251 guards):** no background competitor discovery in an unbranded analysis and the Other category excluded from it; Competitive prompts rely on the top brands of the Visibility answers (TC-GEO-1241-012, TC-GEO-1242-005, TC-GEO-1242-011 / 012). Brand analyses keep the GEO-1251 behaviour (TC-GEO-1242-013, related TC-GEO-1251-002). A dedicated "no background call in unbranded" check is log-only (Test plan scenario 173) and is not a GEO-1209 AC.
- **GEO-1068 (shared concept list):** Top Topics (GEO-1243) and the Other page (GEO-1248) use the same component as GEO-1266 to GEO-1268. No GEO-1068 TC is written here; run the GEO-1068 TCs on UA as well (Test plan scenarios 174 / 175).
- **GEO-1069 decision P4** (no website field in an unbranded analysis; validated by PO 2026-10-20, GEO-1069 comment 865135: "OK for all your decisions … no website in unbranded"): asserted in TC-GEO-1241-005 and TC-GEO-1242-003 as per the GEO-1241 rule "no brand website field".
- **Exports / emails:** GEO-1245 relates to GEO-156 (exports) and GEO-428 (email); no export frame exists for GEO-1245 yet (flagged). GEO-1248 AC-11 (Other section) shares the export files with GEO-1245 (Test plan scenarios 176 / 177).
- **Epic aligned 2026-10-19 with the stories** (PO, GEO-1209 description 20:44, comment 865133): GEO-1242 AC-9 (fewer than 2 competitors = not sent, no row), GEO-1243 AC-4 (one quote per topic), up to 12 topics per category (not 7), "Still open" removed. GEO-1186 (Design Task) text is still stale vs GEO-1248 AC-9.
- **GEO-1002 epic 1.4 (updated 2026-10-20) vs unbranded:** GEO-1002 now resolves up to 5 competitors with a background call when a market and category has no usable Visibility answer, while GEO-1209 relies on "competitor search disabled in V1" for unbranded (GEO-1209 comment 860566, Youssef Ait Laydi, 2026-10-09). To confirm with the devs that unbranded stays excluded (impacts TC-GEO-1242-011 / 012).

## Ambiguous ACs and open points (flagged, not guessed)

- **A1 [GEO-1241 AC-1 / AC-2]:** the Rules say the mode pill shows "from step 1 onward", AC-2 says it shows the mode once a card is selected. What the product bar shows before any selection is not specified; the TCs do not assert it.
- **A2 [GEO-1241 AC-5, TC-GEO-1241-007]:** the empty-topic message is not quoted (brand version: "Add your brand to continue."). The expected result only checks that the message names the topic field; check the wording against the strings sheet. **ANSWERED 2026-10-22 sync:** "wizard.topic.validationRequired (same pattern as "Add a country to continue.") --> EN "Add your industry or topic to continue."" (PO, GEO-1209 comment 865635, Quentin Reant, 2026-10-21). TC-GEO-1241-007 expects this text (staging showed "Enter the industry or topic you want to analyse."; re-run once delivered).
- **A3 [GEO-1241 AC-6, TC-GEO-1241-008 / 010]:** "the markets are cleared" — whether a default market is prefilled again after clearing is not specified; the TCs check that none of the previous markets is kept.
- **A4 [GEO-1241 AC-7, TC-GEO-1241-011]:** the topic text of the discovery screen is not quoted (no frame, D13, Proposed). The TC checks that the text refers to the topic and not to a brand. **ANSWERED 2026-10-22 sync:** "wizard.discovering.subtitleTopic --> "Scanning how AI engines see {{topic}} across your countries." wizard.discovering.durationTopic --> "This usually takes about 20 seconds. We look at your topic, your countries and their languages."" (PO, GEO-1209 comment 865635, 2026-10-21). TC-GEO-1241-011 expects these texts (re-run once delivered).
- **A5 [GEO-1241 AC-8 / GEO-1242 AC-4, TC-GEO-1241-012 / TC-GEO-1242-005]:** how the Competitive placeholders read in the wizard and Manage Scope tables is not specified (four slots [Competitor 1] to [Competitor 4], or the {entity} slot only). The TCs expect four competitor slots and no brand name. **PARTIAL 2026-10-20:** the dev quotes the unbranded template as "Compare [Competitor 1], [Competitor 2], [Competitor 3] and [Competitor 4] for car insurance?" (GEO-1242 comment 864761, Abdenasser Aroukhsiss, 2026-10-19); how the tables display it is not stated. TCs unchanged.
- **A6 [GEO-1241 AC-12, TC-GEO-1241-016 / 017]:** (a) whether the warning blocks Create Analysis is not stated (GEO-1237 warnings never block) — not asserted; (b) "no kept prompt in Other" — whether a Visibility or Competitive prompt in the Other category (which produces no concepts, GEO-1248 AC-7) is enough to hide the warning is not specified; TC-GEO-1241-017 uses an Other-type prompt.
- **A7 [GEO-1242 AC-1]:** "stores its mode" is only observable through the UI (topic shown, no brand field, no mode switch in Manage Scope).
- **A8 [GEO-1242 AC-3, TC-GEO-1242-003]:** "consumer search areas" is a qualitative check; discovered names are not deterministic (the AC example is only an example).
- **A9 [GEO-1242 AC-5 / AC-6, TC-GEO-1242-007]:** if QUESTION_ADAPTATION also rephrases English prompts, the 10 Category Topics wordings may not match the AC table word for word. The TC expects the exact templates for GB (EN); confirm whether adaptation applies to Category Topics in English.
- **A10 [GEO-1242 AC-9, TC-GEO-1242-011] — PARTIAL 2026-10-20:** "no row" confirmed: "these prompts are now skipped for that collection, so they show no row in the prompts table" (dev, GEO-1242 comment 864761, Abdenasser Aroukhsiss, 2026-10-19); the epic (PO, 2026-10-19) also reads "has no row". Still open: whether an unsent Competitive prompt still costs a pool slot (GEO-1241 AC-11 says each kept prompt costs one slot per market); not asserted.
- **A11 [GEO-1243 AC-6, TC-GEO-1243-008]:** the empty state copy is not quoted. **PARTIAL 2026-10-22 sync:** validated as shipped through the dev i18n sheet ("Everything is validated except the changes below.", GEO-1209 comment 865635, Quentin Reant, 2026-10-21); the text itself is not quoted in Jira, and the dev adds the validated texts to the strings sheet (comment 865496). TC unchanged.
- **A12 [GEO-1243 AC-10, TC-GEO-1243-012]:** the AI Citation Sources subtitle is not quoted ("refers to the topic"; design reads "…for your topic"). **PARTIAL 2026-10-22 sync:** same as A11 (validated as shipped, comment 865635; the text is not quoted in Jira). TC unchanged.
- **A13 [GEO-1243 AC-12, TC-GEO-1243-014]:** the "Brand / Topic" header and the neutral subtitle are shown only when the list holds an unbranded analysis (open point, PM to confirm whether they always show). The TC runs with UA in the list.
- **A14 [GEO-1243 AC-4, TC-GEO-1243-004]:** InBrief input capped at the 25 most frequent topics (proposal of the attached prompt, not in the AC) and brands attached to the wrong topic: review on the first unbranded runs (open point).
- **A15 [GEO-1242 AC-8 / epic "Still open"] — ANSWERED 2026-10-20:** "the production thresholds stay (25% for positive and neutral topics, 10% for negative)" (PO, GEO-1209 epic description, Quentin Reant, 2026-10-19 20:44); "the Still open point is removed" (GEO-1209 comment 865133). Thresholds are not observable in the UI: TC-GEO-1242-010 checks the 12-topic cap only.
- **A16 [GEO-1244 AC-5, TC-GEO-1244-008]:** with a date range selected, the TC assumes the winner of the latest collection of the range; confirm.
- **A17 [GEO-1245 AC-2, TC-GEO-1245-003 / 004]:** the dropped sheets and slides are not listed and there is no export frame (GEO-1185 "PowerPoint export" to come); the TCs derive them from the hidden widgets of GEO-1243 AC-2 and the hidden Action Center. PDF is not named in the AC (GEO-1173 exports PPT and PDF): not covered.
- **A18 [GEO-1247 AC-9, TC-GEO-1247-013]:** "no keyword graph" — the UI element called keyword graph is not named; the TC checks that the row and the detail panel show themes only.
- **A19 [GEO-1248 AC-4 / AC-7, TC-GEO-1248-007 / 010]:** "feeds no KPI, SOV, rankings or Time Evolution" is only observable by comparison; the TCs use a brand named only by the Other-category prompt and the KPI prompt basis.
- **A20 [GEO-1248 AC-5, TC-GEO-1248-008]:** where the sent wording (placeholders removed) is visible is not specified; the TC reads it in the detail panel, with a log check if the panel shows the stored wording.
- **A21 [GEO-1248 AC-11, TC-GEO-1248-015]:** the export formats are not named; the TC checks PowerPoint and XLSX.
- **A22 [all stories]:** epic numbers cited in the descriptions are inconsistent (EPIC-034 / EPIC-044 vs real EPIC-045 / EPIC-048); the TCs use GEO keys only.

## ACs filtered as technical

- **No AC filtered in full:** 69 / 69 ACs are functional and each has at least one dedicated TC.
- **Technical parts kept as log / API checks inside a functional TC (not turned into UI assertions):** questionTemplates.ts reference (GEO-1242 AC-4), QUESTION_ADAPTATION input and dropped rule (GEO-1242 AC-5), Perception system instruction (GEO-1242 AC-7, GEO-1248 AC-8), Category Topics analysis prompt, attached brands and non engine-native path (GEO-1242 AC-8), source classification and brand grouping input (GEO-1242 AC-2), TOPIC_SUMMARY input (GEO-1243 AC-4), ConceptExtractionService / Gemini path (GEO-1248 AC-8), per market and category extraction (GEO-1248 AC-6).
- **Technical Details not turned into TCs:** flag read through AuthMeResponse.features (46.2 T1b), strings sheet keys and locales (T10 / T11 / T20 / T29; the four-locale check belongs to Test plan scenario 180), ExportI18n implementation, prompts written by the dev team for discovery / adaptation / classification (PM review after leave), designer frame updates.
- **Story rules used only as supporting TCs (each still tied to an AC):** mode pill stays on every step (TC-GEO-1241-004), cancel the mode switch (TC-GEO-1241-009), no brand search / logo / website (TC-GEO-1241-005), 2 or 3 competitors (TC-GEO-1242-012), brand analysis Q7 (TC-GEO-1242-013), 12-topic cap (TC-GEO-1242-010), Action Center URL (TC-GEO-1245-002), brand Manage Scope unchanged (TC-GEO-1246-004), unticked Other not tinted / not on the Review card (TC-GEO-1247-007 / 011), Brand Image never Other (TC-GEO-1247-014), past collections stay where collected (TC-GEO-1248-014).
- **Rules not turned into TCs (no AC implies them; candidates for a later pass):** flag OFF = no prompt can be saved in Other (covered by TC-GEO-1234-005, flag OFF), Other-type prompt returning few or no concepts shows no theme, a brand whose name contains the topic can win (unbranded), brand analysis Overview / prompts table / export unchanged with the flag ON (Test plan non-regression scenarios 182–184).

## Exact-text TCs (validated by the PO on 2026-10-21)

**Sync 2026-10-22:** the strings are validated: "Everything is validated except the changes below." (GEO-1209 comment 865635, Quentin Reant, 2026-10-21, review of the dev i18n sheet of comment 865496). Rows marked "changed" use the new PO text, not yet confirmed on staging: re-run once delivered. A wording difference is now a bug. The FR / ES changes of the same comment (points 1, 3, 6) are not checked by any GEO-1209 TC (four-locale check = Test plan scenario 180).

| TC | String(s) checked | Status |
|---|---|---|
| TC-GEO-1241-001 | "Brand analysis", "Unbranded analysis" cards and their descriptions | changed (points 4–5): new card descriptions, subtitle "Choose what you want to measure", no "No brand scorecard" point |
| TC-GEO-1241-006 | "What industry or topic are you analysing?" and the topic helper | changed (point 5): "The topic frames the analysis and is never measured. We measure the brands AI engines name." |
| TC-GEO-1241-011 | topic version of the discovery screen text | changed (point 2): "…across your countries." / "…your topic, your countries and their languages." |
| TC-GEO-1241-016 | Review warning naming InBrief and Top Topics | validated |
| TC-GEO-1241-017 | Review warning naming InBrief and Top Topics (absence) | validated |
| TC-GEO-1243-003 | "Category summary generated by artificial intelligence" | validated |
| TC-GEO-1243-009 | "Top Topics in the Category" | validated |
| TC-GEO-1243-010 | "How the answers split across entities" | validated |
| TC-GEO-1243-011 | "{topic} landscape" | validated |
| TC-GEO-1243-014 | "Brand / Topic" | validated |
| TC-GEO-1244-010 | "Category Topics" tab and panel label | validated |
| TC-GEO-1244-011 | "{category} landscape" | validated |
| TC-GEO-1245-003 | PowerPoint topic texts (ExportI18n, separate strings sheet tab) | validated |
| TC-GEO-1245-004 | XLSX topic texts (ExportI18n, separate strings sheet tab) | validated |
| TC-GEO-1247-009 | table warning (banner) on prompts in Other | validated as shipped (banner "{n} prompts are in Other." + body); AC-6 wording to be fixed |
| TC-GEO-1247-010 | Review card title with "Other" and its note | validated |
| TC-GEO-1241-007 | "Add your industry or topic to continue." | changed (point 5, A2) |
| TC-GEO-1241-008 | "Switching the mode clears your brand or topic, your countries, your categories and your prompts." | changed (point 2) |
| TC-GEO-1241-010 | same mode-switch text | changed (point 2) |

## TCs needing special setup

| TC | Setup |
|---|---|
| TC-GEO-1242-002 | The inputs of brand grouping and source classification (topic and brands named) are only checkable in the logs (dev support) |
| TC-GEO-1242-004 | The reference wording of the 10 templates is read from frontend/src/utils/questionTemplates.ts (dev support) |
| TC-GEO-1242-005 | A completed collection; reference templates from questionTemplates.ts (dev support) |
| TC-GEO-1242-006 | The QUESTION_ADAPTATION input (topic instead of brand, "entity must not appear" rule dropped) is only checkable in the logs (dev support) |
| TC-GEO-1242-008 | A completed collection; the absence of the Perception system instruction is only checkable in the logs (dev support) |
| TC-GEO-1242-009 | Engine-native concepts ON for organisation T; brands attached and extraction path are only checkable via API / logs (dev support) |
| TC-GEO-1242-010 | Several collections on a topic rich enough to produce more than 12 candidate topics, at least one after the PR #801 deployment on staging (2026-10-19); optional reference: dev report "scooters" (1c58ccfb-ede7-4590-85a3-5edc7ba33e69), category Kick Scooters with 12 topics |
| TC-GEO-1242-011 | An unbranded analysis UN with a niche category or market whose Visibility answers name at most 1 brand; latest collection after the PR #808 deployment on staging (2026-10-19) |
| TC-GEO-1242-012 | A category and market of an unbranded analysis whose Visibility answers name only 2 or 3 brands |
| TC-GEO-1242-013 | A brand analysis with a category and market where 0 or 1 competitor is resolved |
| TC-GEO-1243-004 | The prompt input (one quote per topic, 25 most frequent topics cap) is only checkable in the logs (dev support); a collection completed after the PR #801 deployment on staging (2026-10-19) |
| TC-GEO-1243-006 | Dev support to force the InBrief generation to return an invalid format on every attempt |
| TC-GEO-1243-008 | A scope whose Category Topics / Other prompts returned no topic (dev support or a collection with empty answers) |
| TC-GEO-1243-015 | A value of the card noted before the first collection of a new unbranded analysis, and the list of brands detected by that collection |
| TC-GEO-1244-002 | 7 collections in the window |
| TC-GEO-1244-004 | 7 collections in the window |
| TC-GEO-1244-007 | Prompts with engine disagreement and with an empty ranking in the latest collection (QA to find) |
| TC-GEO-1244-008 | At least 2 collections with a different winner for the same prompt |
| TC-GEO-1245-005 | The QA account mailbox receives the analysis ready email of a new unbranded analysis (first collection) |
| TC-GEO-1247-013 | A completed collection after the prompt was added |
| TC-GEO-1248-002 | The last part needs the next collection after classification |
| TC-GEO-1248-007 | A brand X named only in the answers of the Other-category prompt (QA to find in the detail panel) |
| TC-GEO-1248-008 | A completed collection after the prompt was added |
| TC-GEO-1248-009 | A brand Y named only by Visibility answers of the Other category (QA to find); the extraction scope is otherwise only checkable in the logs |
| TC-GEO-1248-011 | The absence of the Perception system instruction and the Gemini (non engine-native) extraction path are only checkable in the logs (dev support) |
| TC-GEO-1248-012 | A theme T1 produced only by the Other-type prompt of C1 (QA to find in its detail panel) |
| TC-GEO-1248-013 | A theme T2 produced only by the Other-type prompt of BA |
| TC-GEO-1248-014 | The next collection after the change |
| TC-GEO-1248-017 | An Other-type prompt placed in the Other category (no category and no type) so the panel has themes |

Also plan on daily analyses created early in the cycle: UA needs at least 7 collections for TC-GEO-1244-002 and TC-GEO-1244-004, and several collections for TC-GEO-1242-010 and TC-GEO-1244-008. Every TC that reads collected results (all GEO-1242 to GEO-1248 TCs on UA, UZ, BA) needs at least one completed collection.

## Test cases

### GEO-1241 — Choose the analysis type (Story, Ready for QA)

#### TC-GEO-1241-001 - New Analysis opens Analysis Type with two cards and nothing selected

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that, with the unbranded flag ON, New Analysis opens the Analysis Type step with two cards, Brand analysis and Unbranded analysis, each saying what it measures, and nothing selected. Covers AC-1. [Copy changed by PO 2026-10-21 (GEO-1209 comment 865635, point 4-5); re-run once delivered]. Related GEO-1002: TC-GEO-1231-001 (flag OFF shell).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the GEO dashboard of organisation T |  | The dashboard is displayed with New Analysis available |
| 2 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" |
| 3 | Then two cards "Brand analysis" and "Unbranded analysis" are displayed |  | Both cards are shown with their descriptions: Brand analysis "Measure how AI engines see, rank and compare your brand against its competitors." and Unbranded analysis "Measure an industry or a topic: which brands AI engines name, and what they say about it."; the Unbranded analysis card has no "No brand scorecard" point |
| 4 | And no card is selected |  | Neither card is selected and the primary action (Continue) is disabled |

#### TC-GEO-1241-002 - Flag OFF: the wizard keeps four steps with no Analysis Type step and no mode pill

- **ACs:** AC-1b | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** [SKIP while the unbranded flag is ON on staging: run only with the flag OFF (GEO-1241 AC1b)] Verify that, with the unbranded flag OFF, New Analysis opens the four-step wizard starting at Brand & Country, with no Analysis Type step and no mode pill. Covers AC-1b. Related GEO-1002: TC-GEO-1231-001 and TC-GEO-1231-002 (same flag OFF shell).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag OFF (mandatory for this TC).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the GEO dashboard of organisation T |  | The dashboard is displayed with New Analysis available |
| 2 | When the user clicks New Analysis |  | The wizard opens directly on Brand & Country |
| 3 | Then the stepper lists four steps |  | Brand & Country, Categories, Prompts, Summary; no "Analysis Type" step |
| 4 | And no mode pill is shown in the product bar |  | Neither "Brand analysis" nor "Unbranded analysis" is shown in the product bar |
| 5 | And Brand & Country asks for a brand as today |  | The brand search field is displayed; no topic field |

#### TC-GEO-1241-003 - Selecting a card enables Continue and the mode pill shows the mode

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that selecting a card enables the primary action and that the mode pill in the product bar shows the selected mode ("Brand analysis" or "Unbranded analysis"). Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Analysis Type step with nothing selected |  | Continue is disabled |
| 2 | When the user selects the "Brand analysis" card |  | The card is shown selected |
| 3 | Then the primary action is enabled |  | Continue is enabled |
| 4 | And the mode pill shows the mode |  | The product bar pill reads "Brand analysis" |
| 5 | When the user selects the "Unbranded analysis" card instead |  | Only the Unbranded analysis card is selected; Continue stays enabled |
| 6 | Then the mode pill shows the new mode |  | The product bar pill reads "Unbranded analysis" |

#### TC-GEO-1241-004 - The mode pill stays the same on every later step

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that once a mode is selected the mode pill stays on every later step and never changes unless the user goes back and switches the mode (story rule). Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user selected "Unbranded analysis" on Analysis Type and continued |  | Topic & Country is displayed and the pill reads "Unbranded analysis" |
| 2 | When the user fills Topic & Country and continues to Categories | Topic: "Postal services"; markets GB (EN), FR (FR) | Categories is displayed and the pill still reads "Unbranded analysis" |
| 3 | And the user continues to Prompts and then Summary |  | The pill reads "Unbranded analysis" on Prompts and on Summary |
| 4 | Then the pill never changed without a mode switch |  | The pill text is identical on every step from step 1 to Summary |

#### TC-GEO-1241-005 - Unbranded analysis turns step 2 into Topic & Country asking for an industry or topic

- **ACs:** AC-3 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that after selecting Unbranded analysis, Brand & Country is labelled Topic & Country and asks for an industry or topic instead of a brand, with no brand search, no brand logo and no brand website field (story rule; GEO-1069 decision P4). Covers AC-3. [Validated by PO 2026-10-20: P4 (GEO-1069 comment 865135)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Analysis Type step |  | The two cards are displayed |
| 2 | When the user selects "Unbranded analysis" and continues |  | Step 2 opens |
| 3 | Then step 2 is labelled "Topic & Country" |  | The stepper and the step title read "Topic & Country", not "Brand & Country" |
| 4 | And the step asks for an industry or topic instead of a brand |  | A topic text field is displayed; there is no brand search, no brand logo and no brand website field |
| 5 | And the markets block and Language for AI Insights are displayed as in a brand analysis |  | The markets block (country, language) and Language for AI Insights are shown below the topic field |

#### TC-GEO-1241-006 - Topic & Country asks "What industry or topic are you analysing?" with the topic helper

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that Topic & Country shows the question "What industry or topic are you analysing?" and a helper stating that the topic frames the analysis and is never measured. Covers AC-4. [Copy changed by PO 2026-10-21 (GEO-1209 comment 865635, point 5); re-run once delivered].
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user selected "Unbranded analysis" on Analysis Type |  | The Unbranded analysis card is selected |
| 2 | When the user continues to Topic & Country |  | Topic & Country is displayed |
| 3 | Then the field asks the topic question |  | "What industry or topic are you analysing?" is displayed as the field question |
| 4 | And a helper states that the topic frames the analysis and is never measured |  | The helper is shown under the field: "The topic frames the analysis and is never measured. We measure the brands AI engines name." |

#### TC-GEO-1241-007 - An empty topic shows a red border and a message naming the field

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that trying to continue with an empty topic shows a red border on the topic field and a message naming it, and that the user stays on Topic & Country. Covers AC-5. [Copy changed by PO 2026-10-21 (GEO-1209 comment 865635, point 5: wizard.topic.validationRequired); re-run once delivered] Related GEO-1002: TC-GEO-1231-009 (empty brand).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Topic & Country of an unbranded analysis with the topic empty | Markets: GB (EN) | The topic field is empty |
| 2 | When the user tries to continue |  | The click on "Discover Categories" does not leave the step |
| 3 | Then the topic field shows a red border |  | The topic field border is red |
| 4 | And a message naming the field is displayed |  | The message "Add your industry or topic to continue." is shown under the field |
| 5 | When the user types a topic | Topic: "Postal services" | The red border and the message disappear and the user can continue |

#### TC-GEO-1241-008 - Switching from Unbranded to Brand after step 1 asks for a confirmation and clears the later steps

- **ACs:** AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that going back to Analysis Type after step 1 and switching the mode opens a confirmation stating that the brand or topic, the markets, the categories and the prompts are cleared, and that confirming clears them. Covers AC-6. [Copy changed by PO 2026-10-21 (GEO-1209 comment 865635, point 2); re-run once delivered]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user created an unbranded scope up to the Categories step | Topic: "Postal services"; markets GB (EN), FR (FR); categories C1, C2 discovered | Categories shows C1 and C2 and the pill reads "Unbranded analysis" |
| 2 | When the user goes back to Analysis Type | Click step "Analysis Type" in the stepper | Analysis Type shows Unbranded analysis selected |
| 3 | And the user selects "Brand analysis" |  | A confirmation opens |
| 4 | Then the confirmation states what is cleared |  | The text starts with "Switching the mode clears your brand or topic, your countries, your categories and your prompts." |
| 5 | When the user confirms |  | The pill reads "Brand analysis" and the user continues to Brand & Country |
| 6 | Then the later steps are cleared |  | Brand & Country has no brand and none of the previous markets; Categories and Prompts hold none of the previous categories and prompts |

#### TC-GEO-1241-009 - Cancelling the mode switch keeps the mode and every choice

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that cancelling the mode switch confirmation keeps the current mode and every choice (story rule "cancelling keeps everything"). Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user created an unbranded scope up to the Prompts step | Topic: "Postal services"; markets GB (EN), FR (FR); categories C1, C2 | Prompts shows the suggested prompts and the pill reads "Unbranded analysis" |
| 2 | When the user goes back to Analysis Type and selects "Brand analysis" |  | The confirmation opens |
| 3 | And the user cancels the confirmation |  | The confirmation closes |
| 4 | Then the mode is unchanged |  | The Unbranded analysis card is selected and the pill reads "Unbranded analysis" |
| 5 | And every choice is kept |  | Topic & Country still shows "Postal services" and both markets; Categories shows C1 and C2; Prompts shows the same prompts and the same ticks |

#### TC-GEO-1241-010 - Switching from Brand to Unbranded after the Prompts step clears the brand, markets, categories and prompts

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify the other direction of the mode switch: from a brand scope that reached Prompts, switching to Unbranded analysis states and clears the brand, the markets, the categories and the prompts. Covers AC-6. [Copy changed by PO 2026-10-21 (GEO-1209 comment 865635, point 2); re-run once delivered]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user created a brand scope up to the Prompts step | Brand: "Decathlon"; market GB (EN); detected categories kept | Prompts shows the suggestions and the pill reads "Brand analysis" |
| 2 | When the user goes back to Analysis Type and selects "Unbranded analysis" |  | The confirmation opens and its text starts with "Switching the mode clears your brand or topic, your countries, your categories and your prompts." |
| 3 | And the user confirms |  | The pill reads "Unbranded analysis" |
| 4 | Then Topic & Country starts empty |  | The topic field is empty, no brand is shown and none of the previous markets is listed |
| 5 | And no previous category or prompt is kept |  | After entering a topic and discovering, Categories and Prompts show only the new topic results |

#### TC-GEO-1241-011 - Continuing from a valid Topic & Country shows the topic version of the discovery screen

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that continuing from a valid Topic & Country shows the category discovery screen with a topic version of its text, on the same layout as the brand version. Covers AC-7. [Copy changed by PO 2026-10-21 (GEO-1209 comment 865635, point 2); re-run once delivered]. Related GEO-1002: TC-GEO-1231-010 (brand discovery loading screen).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Topic & Country with a valid topic and market | Topic: "Postal services"; market GB (EN) | "Discover Categories" is enabled |
| 2 | When the user clicks "Discover Categories" |  | The category discovery screen is displayed |
| 3 | Then the screen keeps the brand version layout |  | Same layout as the brand discovery screen (loader and two text lines) |
| 4 | And its text is the topic version |  | The text reads "Scanning how AI engines see Postal services across your countries." and "This usually takes about 20 seconds. We look at your topic, your countries and their languages."; it does not use the brand text ("Scanning how AI engines see {brand}..." / "We look at your brand...") |
| 5 | And discovery ends on Categories |  | The Categories step opens with the discovered categories |

#### TC-GEO-1241-012 - Unbranded prompts have no Brand Image, Category Topics instead of Reputation and Competitive with four competitors

- **ACs:** AC-8 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the prompts generated for an unbranded analysis contain no Brand Image prompt, that Reputation becomes Category Topics, and that Competitive prompts take a fourth auto-resolved competitor in the brand's place. Covers AC-8. Related GEO-1002: TC-GEO-1233-001 (brand suggestions). Competitor resolution in unbranded relies on the visibility answers, no background competitor discovery (GEO-1251 guards).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the unbranded scope |  | The prompt table is displayed with every suggestion ticked |
| 2 | When the user opens the Type column filter |  | The filter lists Visibility, Competitive and Category Topics with their counts |
| 3 | Then there is no Brand Image and no Reputation prompt |  | Neither "Brand Image" nor "Reputation" is listed in the filter or shown on a badge |
| 4 | When the user filters on Competitive |  | Only Competitive rows are shown |
| 5 | Then each Competitive prompt holds four competitor slots and no brand |  | Each wording has 4 competitor slots ([Competitor 1] to [Competitor 4]) and names no target brand |

#### TC-GEO-1241-013 - Each category in each market gets 30 prompts: 2 markets x 3 categories = 180 prompts

- **ACs:** AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each category in each market still gets 30 prompts (10 Visibility, 10 Competitive, 10 Category Topics), so 2 markets with 3 categories give 2 x (3 x 30) = 180 prompts. Covers AC-9. Related GEO-1002: TC-GEO-1233-002 (brand count 200 with Brand Image).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Scope: Unbranded analysis, topic "Postal services", markets GB (EN) and FR (FR); the 2 discovered categories C1 and C2 kept and a third category C3 added manually on Categories. No prompt added or deleted before the check.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Categories with C1, C2 and C3 | C3: "Courier services" | Three categories are listed |
| 2 | When the user generates the prompts |  | The Prompts step opens with every newly generated suggestion ticked (generating again keeps the earlier ticks) |
| 3 | Then the table holds 180 prompts |  | "180 selected" is shown and the ring reads "U + 180 / P" |
| 4 | And each category in each market gets 30 prompts | Filter: category C1, market GB (EN) | 30 rows: 10 Visibility, 10 Competitive, 10 Category Topics |
| 5 | And the same split applies to every category and market pair | C2 / C3 with GB (EN) and FR (FR) | Each of the 6 pairs shows 30 rows with the 10 / 10 / 10 split; no Brand Image row |

#### TC-GEO-1241-014 - Type badges and type selects of an unbranded analysis show Visibility, Competitive, Category Topics or Other

- **ACs:** AC-10 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in an unbranded analysis the type badges and the type selects (row select and Add prompt) show only Visibility, Competitive, Category Topics or Other. Covers AC-10. [Validated by QA 2026-10-21: on a prompt already in Other, Other is the current value of the select and is not listed again (dev answer GEO-1509, 46.7 AC5)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the unbranded scope |  | The table is displayed |
| 2 | When the user looks at the type badges |  | Each badge reads Visibility, Competitive or Category Topics |
| 3 | And the user opens the type select of a row |  | The select lists Visibility, Competitive, Category Topics and Other only; on a row already in Other, Other is the current value of the select and the list shows Visibility, Competitive and Category Topics |
| 4 | And the user clicks Add prompt and opens the type select of the new row |  | The select lists Visibility, Competitive, Category Topics and Other only; no Reputation, no Brand Image |
| 5 | When the user confirms the new row with the type left at its default | Prompt: "Which parcel lockers are easiest to use?" - Category C1 - Market GB (EN) - Type left at its default (Other) | The new row badge reads "Other" |

#### TC-GEO-1241-015 - Each kept prompt of an unbranded analysis costs one slot per market

- **ACs:** AC-11 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the prompts of an unbranded analysis are counted against the pool like a brand analysis: each kept prompt costs one slot per market and an unticked one costs nothing. Covers AC-11. Related GEO-1002: TC-GEO-1229-002, TC-GEO-1229-003.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Scope: Unbranded analysis, topic "Postal services", market GB (EN) and FR (FR), the 2 discovered categories = 2 x (2 x 30) = 120 suggestions. No prompt added or deleted before the check.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the unbranded scope |  | "120 selected" is shown and the ring reads "U + 120 / P" |
| 2 | When the user unticks 2 prompts | Any 2 rows | The ring reads "U + 118 / P" |
| 3 | And the user adds a custom prompt in market GB (EN) | Prompt: "Which parcel delivery service is the fastest?" - Category C1 - Type Visibility - Market GB (EN) | The ring reads "U + 119 / P" |
| 4 | And the user adds the same prompt in market FR (FR) | Same text, Category C1, Type Visibility, Market FR (FR) | The ring reads "U + 120 / P" |
| 5 | Then each kept prompt costs one slot per market |  | The ring and "N selected" moved by exactly 1 per ticked prompt per market |

#### TC-GEO-1241-016 - Summary warns that InBrief and Top Topics will not be produced without Category Topics or Other prompts

- **ACs:** AC-12 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that when an unbranded analysis has no kept Category Topics prompt and no kept prompt in Other, the Summary warning names InBrief and Top Topics as metrics the analysis will not produce. Covers AC-12 (extends the GEO-1237 AC-2 missing-metrics warning, see TC-GEO-1237-004). [Validated by QA 2026-10-22: "Other (0)" stays in the filters by design, it shows that no prompt is in Other] [Validated by PO 2026-10-21 (GEO-1209 comment 865635)].
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the unbranded scope |  | The table is displayed with every suggestion ticked |
| 2 | When the user filters on Type Category Topics and unticks every Category Topics prompt | Type filter: Category Topics | Every Category Topics row is unticked |
| 3 | And no prompt is in Other |  | The Type and Category filters list "Other" with a count of 0 (no prompt is in Other) |
| 4 | And the user goes to Summary | Review & Launch | The Summary step is displayed |
| 5 | Then the warning names InBrief and Top Topics as metrics the analysis will not produce |  | The warning names "InBrief" and "Top Topics" |

#### TC-GEO-1241-017 - The InBrief and Top Topics warning is not shown when a Category Topics or Other prompt is kept

- **ACs:** AC-12 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the InBrief / Top Topics warning of Summary is not shown as soon as one Category Topics prompt or one prompt in Other is kept. Covers AC-12 (negative case of the condition). [Validated by PO 2026-10-21 (GEO-1209 comment 865635)].
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given every Category Topics prompt of the unbranded scope is unticked |  | Summary shows the InBrief / Top Topics warning |
| 2 | When the user goes back to Prompts and adds a kept prompt with the type empty | Prompt: "What do people say about parcel lockers?" - Category C1 - Market GB (EN) - Type left at its default (Other) | The row is added ticked with the type "Other" |
| 3 | And the user goes to Summary |  | Summary is displayed |
| 4 | Then the InBrief / Top Topics warning is not shown |  | No warning names InBrief or Top Topics |
| 5 | When the user deletes the Other prompt, ticks one Category Topics prompt and goes to Summary |  | The InBrief / Top Topics warning is still not shown |

### GEO-1242 — Run an analysis without a target brand (Story, Ready for QA)

#### TC-GEO-1242-001 - A created unbranded analysis keeps its mode and topic with no target brand and is named after the topic

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a created unbranded analysis stores its mode and topic with no target brand, and that the topic is its name in the dashboard. Covers AC-1 (emails and exports: TC-GEO-1245-003, TC-GEO-1245-004, TC-GEO-1245-005).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Summary of the unbranded scope |  | Summary shows the markets and the categories; the topic is not shown (PO decision 2026-10-26, GEO-1209 comment 867869) |
| 2 | When the user clicks Create Analysis |  | The creation confirmation is displayed with View analysis |
| 3 | And the user opens the GEO dashboard analyses list |  | The new analysis is listed as "Postal services" in the "Brand / Topic" column |
| 4 | And the user opens the analysis |  | The sidebar block shows "Postal services" |
| 5 | Then no target brand is set |  | No brand is shown as the analysis brand anywhere in the sidebar, Overview or Manage Scope |
| 6 | And the analysis stays unbranded | Manage Scope | Manage Scope shows the topic "Postal services" and no brand field |

#### TC-GEO-1242-002 - No brand is scored, highlighted or protected as the target in an unbranded analysis

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify through the visible output that no brand of an unbranded analysis is scored or treated as the target (no highlight, star or target marker), that brand grouping protects no target, and that source classification works without a target. Covers AC-2. Needs setup: the inputs of brand grouping and source classification (topic and brands named) are only checkable in the logs (dev support).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of analysis UA |  | The unbranded Overview is displayed |
| 2 | When the user looks at the landscape table and the Share of Voice ring |  | No row is highlighted, starred or marked as target; no slice is enlarged |
| 3 | And the user opens a category and its prompts table | Category C1 | No target brand block or target marker is shown on any row |
| 4 | And the user looks at the AI Citation Sources legend |  | No "Owned Media" and no "Competitor Media" entry |
| 5 | Then every brand named by the answers is measured the same way |  | Brand families are grouped in the rankings with no family kept apart as a target |
| 6 | And the logs show the source classification input | Dev support: collection logs of UA | Source classification received the topic and the brands named, with no target brand |

#### TC-GEO-1242-003 - Category discovery splits the topic into 2 consumer search areas with no brand website

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that category discovery of an unbranded analysis splits the topic into 2 consumer search areas (e.g. "postal services" into "parcel delivery" and "international shipping"), with no brand website. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Topic & Country of an unbranded analysis | Topic: "Postal services"; market GB (EN) | Discover Categories is enabled |
| 2 | When the user clicks Discover Categories |  | The discovery screen is displayed, then Categories opens |
| 3 | Then exactly 2 categories are detected |  | Categories lists 2 categories with the AI-generated badge |
| 4 | And they are consumer search areas of the topic |  | Both are areas of "Postal services" (e.g. "Parcel delivery" and "International shipping"), not brand names |
| 5 | And no brand website is used or asked |  | No website field or brand domain is shown on Topic & Country or Categories |

#### TC-GEO-1242-004 - Visibility prompts use the 10 production templates with the category only

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Visibility prompts of an unbranded analysis use the 10 production Visibility templates with {category} only, possibly reworded by the market adaptation (QUESTION_ADAPTATION, e.g. "service", buy → use). Covers AC-4. [Answered by PO 2026-10-06 (GEO-1209 comment 859152) and epic 1.2 AC5: the market adaptation rewords the vocabulary by design] Needs setup: the reference wording of the 10 templates is read from frontend/src/utils/questionTemplates.ts (dev support).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the unbranded scope |  | The table is displayed |
| 2 | When the user filters on Type Visibility, category C1 and market GB (EN) |  | 10 Visibility rows are shown |
| 3 | Then the 10 rows come from the 10 production Visibility templates | Reference: questionTemplates.ts Visibility templates with {category} = C1 | Each wording is a production Visibility template with the category name in the {category} slot, possibly reworded by the market adaptation (e.g. "Best Package Delivery service?", "Which Package Delivery service should I use?") |
| 4 | And no Visibility prompt names a brand or a competitor slot |  | No brand name and no [Competitor N] in any Visibility wording |

#### TC-GEO-1242-005 - Competitive prompts use the production templates with [Competitor 4] and compare the top 4 brands of their category and market

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Competitive prompts use the 10 production Competitive templates with the {entity} slot turned into [Competitor 4], and that after a collection each compares the top 4 brands of that category and market's Visibility answers. Covers AC-4. Needs setup: a completed collection; reference templates from questionTemplates.ts (dev support).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens Manage Scope > Prompts of analysis UA | Filter: Type Competitive, category C1, market GB (EN) | 10 Competitive rows are shown |
| 2 | When the user reads the Competitive wordings | Reference: questionTemplates.ts Competitive templates | Each is a production Competitive template where the {entity} slot reads [Competitor 4], next to [Competitor 1] to [Competitor 3] |
| 3 | And the user opens the C1 rankings for market GB (EN) in the latest collection | Market filter: GB (EN) | The 4 brands most cited by the C1 Visibility answers are noted (B1 to B4) |
| 4 | And the user opens a Competitive prompt detail of C1 for market GB (EN) |  | The detail panel shows the prompt sent and its answers |
| 5 | Then the Competitive prompt compares the top 4 brands of that category and market |  | The sent wording names B1, B2, B3 and B4 and no other brand |

#### TC-GEO-1242-006 - Prompts adapted for a market are built around the topic and need not contain the topic word

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify through the visible output that prompts adapted and translated for a market are built with the topic instead of a brand and are not required to contain the topic word, since the category carries it. Covers AC-5. Needs setup: the QUESTION_ADAPTATION input (topic instead of brand, "entity must not appear" rule dropped) is only checkable in the logs (dev support).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the unbranded scope |  | The table is displayed |
| 2 | When the user filters on market FR (FR) |  | Only FR (FR) rows are shown |
| 3 | Then the prompts are adapted and translated to French |  | Every wording is in French and refers to its category |
| 4 | And no prompt is built around a brand |  | No wording names a target brand |
| 5 | And the topic word is not required in the wording |  | Rows without the word "postal services" (or its translation) are accepted and listed like the others |
| 6 | And the logs show the adaptation input | Dev support: generation logs | QUESTION_ADAPTATION received the topic, not a brand, and no "entity must not appear" rule |

#### TC-GEO-1242-007 - Each category gets the 10 Category Topics prompts, one per theme

- **ACs:** AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each category of an unbranded analysis gets the 10 Category Topics prompts of the AC table, one per theme. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the unbranded scope |  | The table is displayed |
| 2 | When the user filters on Type Category Topics, category C1 and market GB (EN) |  | 10 Category Topics rows are shown |
| 3 | Then the 10 rows match the 10 themes with the category name | C1 = e.g. "Parcel delivery" | "What should I look for in {category}?", "What makes {category} good quality?", "What is good value for money in {category}?", "What do people like most about {category}?", "What are the most common problems with {category}?", "How do I know which {category} options I can trust?", "What is changing in {category} right now?", "What are the ethical and environmental concerns around {category}?", "What do experts recommend about {category}?", "What are the main controversies in {category}?" with {category} = C1 |
| 4 | And category C2 gets the same 10 prompts | Filter: category C2, market GB (EN) | 10 rows with the same 10 themes and {category} = C2 |

#### TC-GEO-1242-008 - Category Topics prompts run as written, with answers not framed around a brand

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that Category Topics prompts run as written, without the Perception system instruction, like prompts with the Other type. Covers AC-7. Needs setup: a completed collection; the absence of the Perception system instruction is only checkable in the logs (dev support).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA |  | The category view is displayed |
| 2 | When the user opens the "Category Topics" tab of the prompts table and opens "What should I look for in {category}?" |  | The detail panel opens |
| 3 | Then the prompt was sent as written |  | The prompt shown is the exact wording of the row, with nothing added about a brand |
| 4 | And the answers are about the category |  | The response per engine discusses the category, not a target brand |
| 5 | And the logs show no Perception system instruction | Dev support: collection logs | The Category Topics request carries no Perception system instruction, as for Other-type prompts |

#### TC-GEO-1242-009 - Category Topics answers return topics with a category-wide sentiment and attached brands on the non engine-native path

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a Category Topics answer is analysed by the Category Topics analysis prompt attached to GEO-1209: topics raised with a sentiment for the category as a whole and up to 3 brands attached to each topic (not displayed), on the non engine-native extraction path even when engine-native concepts are on. Covers AC-8. Needs setup: engine-native concepts ON for organisation T; brands attached and extraction path are only checkable via API / logs (dev support).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. Engine-native concepts are ON for organisation T.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA |  | Top Topics in the Category is displayed |
| 2 | When the user reads the topics |  | Each topic is an aspect of the category with a sentiment (Positive / Mixed / Negative) and a frequency |
| 3 | Then the sentiment describes the category as a whole |  | Topic sentiments refer to how the aspect of the category is presented, not to a brand |
| 4 | And no brand tag is displayed |  | No brand tag next to any topic |
| 5 | And the API / logs show the attached brands and the extraction path | Dev support: concepts API or logs | Each topic carries up to 3 brands as written in the answers; extraction ran on the non engine-native path |

#### TC-GEO-1242-010 - Top Topics keeps at most 12 topics per category

- **ACs:** AC-8 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that each category keeps up to 12 topics (story and epic updated 2026-10-19: up to 12 topics per category instead of 7; the production thresholds 25 % for positive and neutral topics / 10 % for negative are kept, not observable in the UI, not asserted). Covers AC-8. A15 answered (PO, GEO-1209 epic description 2026-10-19: "the production thresholds stay"). Needs setup: several collections on a topic rich enough to produce more than 12 candidate topics.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. UA has several collections completed, at least one of them after the PR #801 deployment on staging (2026-10-19); reports created before show the new topics from their next collection (dev, GEO-1209 comment 864686).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA | Optional reference (dev, GEO-1209 comment 864686): staging report "scooters" (1c58ccfb-ede7-4590-85a3-5edc7ba33e69), category Kick Scooters shows 12 topics | Top Topics in the Category is displayed |
| 2 | When the user clears every filter chip and counts the topics |  | Topics are listed with their frequency |
| 3 | Then the category keeps at most 12 topics |  | No more than 12 topics are listed for C1 |
| 4 | And the same limit applies to category C2 | Category C2 | No more than 12 topics are listed for C2 |

#### TC-GEO-1242-011 - An unbranded Competitive prompt with fewer than 2 competitors is not sent and has no row

- **ACs:** AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that in an unbranded analysis a Competitive prompt outside the Other category is not sent for the run and shows no result in the prompts table when fewer than 2 competitors were extracted for its category and market. Covers AC-9 (story and epic aligned 2026-10-19, PO option A, GEO-1242 comment 864727). The pool slot cost of an unsent prompt is not asserted (A10 open). Needs setup: an unbranded analysis UN with a niche category or market whose Visibility answers name at most 1 brand.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UN: unbranded analysis with a category CN and a market M whose Visibility answers name 0 or 1 brand in the latest collection (niche topic, QA to find), and another category with at least 2 brands named; at least one collection completed. The latest collection of UN was completed after the PR #808 deployment on staging (2026-10-19).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category CN of analysis UN with market filter M |  | The rankings of CN for market M list 0 or 1 brand |
| 2 | When the user opens the prompts table of CN for market M |  | The prompts table is displayed |
| 3 | Then no Competitive prompt shows a result | Competitive tab | No Competitive row is listed for CN in market M |
| 4 | And the Competitive prompts of a category with at least 2 competitors still run | Another category of UN with 2 or more brands named | Its Competitive rows are listed with their winner or "Split" |

#### TC-GEO-1242-012 - An unbranded Competitive prompt with 2 or 3 competitors runs with the missing slots removed

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that an unbranded Competitive prompt whose category and market have 2 or 3 extracted competitors is sent with the missing slots removed from the text (story rule). Covers AC-9. Needs setup: a category and market of an unbranded analysis whose Visibility answers name only 2 or 3 brands. Related bug GEO-1249 (Ready for QA, fix version 1.3: no dangling 'or ?' connector).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UN has a category CT and a market M whose Visibility answers name exactly 2 or 3 brands in the latest collection (QA to find); at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category CT of analysis UN with market filter M |  | The rankings of CT for market M list 2 or 3 brands |
| 2 | When the user opens a Competitive prompt of CT for market M |  | The detail panel opens |
| 3 | Then the prompt was sent with the brands found only |  | The sent wording names the 2 or 3 brands and holds no empty slot and no [Competitor N] |
| 4 | And the prompt shows its result in the prompts table |  | The row shows its winner or "Split" |

#### TC-GEO-1242-013 - A brand analysis Competitive prompt with too few competitors is still sent with the empty slots removed

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a brand analysis still sends a Competitive prompt with fewer than 2 competitors, with the empty slots removed (Q7, unchanged), unlike an unbranded analysis. Covers AC-9 (brand counterpart). Related GEO-1002: TC-GEO-1251-002 / Test plan scenario 187. Needs setup: a brand analysis with a category and market where 0 or 1 competitor is resolved. Related bug GEO-1249 (Ready for QA, fix version 1.3: no dangling 'or ?' connector).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis BN: brand analysis whose category CB in market M has 0 or 1 competitor resolved in the latest collection (QA to find); at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category CB of analysis BN with market filter M |  | The prompts table is displayed |
| 2 | When the user opens the Competitive tab |  | The Competitive rows of CB for market M are listed |
| 3 | Then the Competitive prompts were sent |  | Each row shows a result (winner or "Split") |
| 4 | And their wording has the empty slots removed | Open one row | The sent wording reads naturally with no empty slot and no [Competitor N] |

#### TC-GEO-1242-014 - The topic of an unbranded analysis cannot be changed in Manage Scope

- **ACs:** AC-10 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the topic of an unbranded analysis cannot be changed in Manage Scope, as the brand today. Covers AC-10.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UA |  | The Overview is displayed |
| 2 | When the user opens Manage Scope |  | Manage Scope is displayed |
| 3 | Then the topic is shown read-only |  | "Postal services" is displayed with no edit control, as the brand of a brand analysis |
| 4 | And the topic cannot be changed |  | No field, button or menu lets the user change the topic or the analysis mode |

### GEO-1243 — Show an Overview built for a topic (Story, Ready for QA)

#### TC-GEO-1243-001 - The sidebar block shows the topic first letter and the topic with no extra header

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the sidebar block of an unbranded analysis shows the topic's first letter in the logo slot and the topic, as the brand block does today, with no extra header, mode label or date. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the GEO dashboard |  | Analysis UA is listed |
| 2 | When the user opens analysis UA |  | The analysis loads with its sidebar |
| 3 | Then the sidebar block shows the topic first letter in the logo slot |  | A letter avatar "P" is shown where a brand logo shows today |
| 4 | And the block shows the topic |  | "Postal services" is displayed next to the avatar |
| 5 | And no extra header, mode label or date is shown |  | No "Unbranded analysis" label, no generation date and no header above the block or the Overview |

#### TC-GEO-1243-002 - The unbranded Overview hides the brand scorecard widgets

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Overview of an unbranded analysis does not show the scope bar, the KPI cards and deltas, Time Evolution, Category Prioritization, Corporate Reputation, Brand Territory and the Brand Image hint. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UA |  | The Overview is displayed |
| 2 | When the Overview renders |  | InBrief, Top Topics, Share of Voice, the landscape table and AI Citation Sources are shown |
| 3 | Then the scope bar and the KPI cards with their deltas are not shown |  | No scope bar, no KPI card, no delta |
| 4 | And Time Evolution and Category Prioritization are not shown |  | Neither widget is on the Overview |
| 5 | And Corporate Reputation, Brand Territory and the Brand Image hint are not shown |  | None of the three is on the Overview |

#### TC-GEO-1243-003 - InBrief shows 3 bullets about the topic with "Category summary generated by artificial intelligence"

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that InBrief of an unbranded analysis shows 3 bullets built from the Category Topics answers and the Other-type answers, saying what the answers say about the topic, possibly naming brands the answers attach to a topic, with "Category summary generated by artificial intelligence". Covers AC-3. [Validated by PO 2026-10-21 (GEO-1209 comment 865635)].
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of analysis UA |  | InBrief is displayed |
| 2 | When the user reads InBrief |  | InBrief shows exactly 3 bullets |
| 3 | Then the bullets say what the answers say about the topic |  | The bullets describe aspects of "Postal services" found in Top Topics (and in the Other-type prompt answers) |
| 4 | And any brand named is one the answers attach to a topic |  | A brand named in a bullet appears in the answers of the related topic; InBrief never ranks brands |
| 5 | And the caption is displayed |  | "Category summary generated by artificial intelligence" |

#### TC-GEO-1243-004 - Unbranded InBrief uses the topic summary of its own scope, saying why each topic comes up

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the unbranded InBrief uses the dedicated topic prompt (not the brand Perception summary), fed with the Category Topics and Other-type concepts (label, sentiment, frequency, attached brands, one quote per topic) of the Overview or of the category, so the bullets say why a topic comes up. Covers AC-4 (story updated 2026-10-19: one quote per topic). Needs setup: the prompt input (one quote per topic, 25 most frequent topics cap) is only checkable in the logs (dev support).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. UA has at least one collection completed after the PR #801 deployment on staging (2026-10-19). InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of analysis UA |  | InBrief is displayed |
| 2 | When the user compares InBrief with Top Topics of the Overview |  | The bullets cover topics listed in Top Topics and say why they come up (reason drawn from the answers), not only their names |
| 3 | Then InBrief is a topic summary, not a brand Perception summary |  | No bullet is about a brand perception or "your brand" |
| 4 | When the user opens category C1 |  | The category InBrief is displayed |
| 5 | Then the category InBrief reflects the C1 topics only |  | Its bullets match Top Topics of C1, not topics found only in C2 |
| 6 | And the logs show the topic prompt input | Dev support: InBrief generation logs | TOPIC_SUMMARY input lists label, sentiment, frequency, attached brands and one quote per topic, at most 25 topics |

#### TC-GEO-1243-005 - InBrief bullets are only format-checked: 3 bullets of 150 characters max, brands allowed

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the unbranded InBrief bullets are checked on format only (3 bullets of 150 characters max), with no brand-name check. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of analysis UA |  | InBrief is displayed |
| 2 | When the user counts the bullets and their characters |  | InBrief shows 3 bullets |
| 3 | Then each bullet is 150 characters max |  | No bullet exceeds 150 characters |
| 4 | And bullets naming a brand are not rejected | Compare across categories C1 and C2 | A bullet naming a brand attached to a topic is displayed as is (no brand-name check) |

#### TC-GEO-1243-006 - InBrief shows its error state after the last failed format attempt

- **ACs:** AC-5 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that when every generation attempt fails the format check, the InBrief widget shows its error state after the last attempt. Covers AC-5. Needs setup: dev support to force the InBrief generation to return an invalid format on every attempt.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. Dev support forces the InBrief topic generation of UA to return a wrong format (not 3 bullets, or over 150 characters) on every attempt. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the InBrief generation of analysis UA always fails the format check |  | Dev confirms the forced failure is active |
| 2 | When InBrief is generated and the user opens the Overview |  | The Overview is displayed |
| 3 | Then the widget shows its error state |  | InBrief shows the error state used today, with no partial or over-long bullets |
| 4 | And the rest of the Overview still renders |  | Top Topics, Share of Voice and the landscape table are displayed |

#### TC-GEO-1243-007 - InBrief and Top Topics are hidden when no Category Topics or Other prompt exists

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that InBrief and Top Topics are hidden on the Overview and on a category of an analysis with no Category Topics prompts and no prompts in Other, since no prompt feeds them. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UZ: unbranded analysis, topic "Car insurance", 1 market GB (EN), every Category Topics prompt unticked at creation and no prompt in Other; at least one collection completed. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UZ |  | The Overview is displayed |
| 2 | When the Overview renders |  | Share of Voice and the landscape table are shown |
| 3 | Then InBrief and Top Topics are hidden |  | Neither InBrief nor Top Topics in the Category is on the Overview (no empty state either) |
| 4 | When the user opens a category of UZ |  | The category view is displayed |
| 5 | Then InBrief and Top Topics are hidden at category scope too |  | Neither widget is shown |

#### TC-GEO-1243-008 - InBrief and Top Topics show an empty state when their prompts returned no topic

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that InBrief and Top Topics show an empty state when Category Topics or Other prompts exist in the scope but returned no topic. Covers AC-6. Needs setup: a scope whose Category Topics / Other prompts returned no topic (dev support or a collection with empty answers). The empty state copy is not quoted in the AC.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UE: unbranded analysis whose category CE has Category Topics prompts that returned no topic in the latest collection (dev support to produce it). InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category CE of analysis UE |  | The category view is displayed |
| 2 | When InBrief and Top Topics render |  | Both widgets are shown |
| 3 | Then both show an empty state |  | InBrief and Top Topics display their empty state, not hidden and not an error |

#### TC-GEO-1243-009 - Top Concepts becomes "Top Topics in the Category" with category topics, sentiment and frequency and no brand

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that Top Concepts of an unbranded analysis is titled "Top Topics in the Category" and each topic describes the category, never names a brand, has its sentiment towards the category and its frequency, as in Top Concepts today, with no brand tags. Covers AC-7. [Validated by PO 2026-10-21 (GEO-1209 comment 865635)]. The list uses the shared concept component of GEO-1068 (tested in the GEO-1068 TCs).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of analysis UA |  | The topics widget is displayed |
| 2 | When the widget loads |  | It is titled "Top Topics in the Category" |
| 3 | Then each topic describes the category |  | Every topic is an aspect of postal services (e.g. delivery times, tracking), not a brand |
| 4 | And no topic names a brand and no brand tag is shown |  | No brand name in any topic label; no brand tag |
| 5 | And each topic shows its sentiment and frequency as in Top Concepts today |  | Positive / Mixed / Negative grouping and the frequency are displayed per topic |

#### TC-GEO-1243-010 - The Share of Voice ring is neutral with the subtitle "How the answers split across entities"

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Share of Voice ring keeps the brand analysis calculation, with no enlarged slice, no centre value and the subtitle "How the answers split across entities". Covers AC-8. [Validated by PO 2026-10-21 (GEO-1209 comment 865635)].
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of analysis UA |  | Share of Voice is displayed |
| 2 | When the ring loads |  | The subtitle reads "How the answers split across entities" |
| 3 | Then no slice is enlarged and there is no centre value |  | All slices have the same radius; the centre of the ring is empty |
| 4 | And the ring keeps the brand analysis calculation |  | Top 10 brands by SOV and "Others" for the rest; the slices add up to 100 % |

#### TC-GEO-1243-011 - The rankings table is titled "{topic} landscape" with no highlighted row and no "your brand"

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the rankings table of the unbranded Overview is titled "{topic} landscape", with no highlighted row and tooltips without "your brand". Covers AC-9. [Validated by PO 2026-10-21 (GEO-1209 comment 865635)].
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of analysis UA |  | The rankings table is displayed |
| 2 | When the table loads |  | It is titled "Postal services landscape" |
| 3 | Then no row is highlighted |  | Every brand row has the same style |
| 4 | And no tooltip says "your brand" | Hover each column header and info icon | No tooltip contains "your brand" |

#### TC-GEO-1243-012 - AI Citation Sources refers to the topic, has no Owned / Competitor Media nor Favorability and a "Category Topics" modal tab

- **ACs:** AC-10 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that AI Citation Sources of an unbranded analysis has a subtitle referring to the topic, no Owned Media or Competitor Media in its legend, no Favorability column, and a related prompts modal listing the Category Topics prompts under a "Category Topics" tab. Covers AC-10. The exact subtitle is not quoted in the AC.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of analysis UA |  | AI Citation Sources is displayed |
| 2 | When the widget loads |  | Its subtitle refers to the topic, not to "your brand" |
| 3 | Then the legend has no Owned Media and no Competitor Media |  | Neither entry is in the legend |
| 4 | And there is no Favorability column |  | No Favorability column in the sources table |
| 5 | When the user opens the related prompts modal of a source |  | The modal opens with its tabs |
| 6 | Then the Category Topics prompts are listed under a "Category Topics" tab |  | A "Category Topics" tab lists them; no "Perception" tab |

#### TC-GEO-1243-013 - Widget captions describe the widget and never mention that no brand is set

- **ACs:** AC-11 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that every widget caption of the unbranded Overview describes the widget and never reminds the user that no brand is set. Covers AC-11.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of analysis UA |  | Every widget is displayed |
| 2 | When the user reads each widget caption and info tooltip | InBrief, Top Topics, Share of Voice, landscape table, AI Citation Sources | Each caption describes what the widget shows |
| 3 | Then no caption reminds the user that no brand is set |  | No caption contains "no brand", "without a brand", "your brand" or a call to add a brand |

#### TC-GEO-1243-014 - The analyses list shows the "Brand / Topic" column with the topic and its first letter and no domain

- **ACs:** AC-12 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the GEO dashboard analyses list titles the column "Brand / Topic" and shows an unbranded analysis with the topic and its first letter and no domain. Covers AC-12. [Validated by PO 2026-10-21 (GEO-1209 comment 865635)]. Open point: the header is "Brand / Topic" only when the list holds an unbranded analysis (PM to confirm).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. Organisation T also holds brand analyses.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the GEO dashboard of organisation T |  | The analyses list is displayed |
| 2 | When the list shows analysis UA |  | The column header reads "Brand / Topic" |
| 3 | Then UA shows the topic with its first letter |  | A letter avatar "P" and "Postal services" |
| 4 | And no domain is shown for UA |  | No domain or website under the topic |
| 5 | And brand analyses keep their logo and domain |  | Brand rows are unchanged |

#### TC-GEO-1243-015 - The Competitors card also counts the brands detected in unbranded analyses

- **ACs:** AC-12 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Competitors card of the GEO dashboard also counts the brands detected in unbranded analyses. Covers AC-12. Needs setup: a value of the card noted before the first collection of a new unbranded analysis, and the list of brands detected by that collection.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The Competitors card value C0 of organisation T is noted before the first collection of a new unbranded analysis UN2 (topic "Frozen food", 1 market GB (EN)); UN2 detects N brands not named by any other analysis of T.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Competitors card of organisation T reads C0 |  | The card is displayed on the GEO dashboard |
| 2 | When the first collection of unbranded analysis UN2 completes |  | UN2 rankings list its detected brands |
| 3 | And the user reloads the GEO dashboard |  | The Competitors card is displayed |
| 4 | Then the card counts the brands detected in the unbranded analysis |  | The card reads C0 + N |

### GEO-1244 — Show the Category view and the prompts for a topic (Story, Ready for QA)

#### TC-GEO-1244-001 - An unbranded Category view has no KPI cards and follows the Overview rules at category scope

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a Category view of an unbranded analysis has no KPI cards, and that InBrief, Top Topics, the SOV ring and rankings follow GEO-1243 at category scope. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UA |  | The Overview is displayed |
| 2 | When the user opens category C1 in the sidebar |  | The category view is displayed |
| 3 | Then there are no KPI cards |  | No KPI card and no delta |
| 4 | And InBrief and Top Topics follow the topic rules at category scope |  | InBrief shows 3 bullets about C1 with "Category summary generated by artificial intelligence"; "Top Topics in the Category" lists C1 topics with no brand |
| 5 | And the SOV ring and rankings are neutral |  | SOV ring with no enlarged slice and no centre value; rankings with no highlighted row |

#### TC-GEO-1244-002 - Time Evolution shows the top 10 brands with no highlighted line and no Sentiment tab

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that Time Evolution of an unbranded category shows the top 10 brands with no highlighted line and no Sentiment tab. Covers AC-2. Needs setup: 7 collections in the window.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. Analysis UA has at least 7 completed collections inside the selected window (daily analysis created early in the cycle).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA |  | Time Evolution is displayed |
| 2 | When the chart loads |  | Tabs Share of voice, Visibility, Avg. Position and AI choice are shown |
| 3 | Then there is no Sentiment tab |  | No "Sentiment" tab |
| 4 | And the chart shows 10 brands with no highlighted line |  | 10 lines with the same style; no line is thicker or highlighted as a target |

#### TC-GEO-1244-003 - Brand Prioritization plots the top 5 brands by SOV with no target dot

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Brand Prioritization matrix of an unbranded category plots the top 5 brands by SOV (at most 5 per market) with no target dot. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA with market filter GB (EN) |  | Brand Prioritization is displayed |
| 2 | When the matrix loads |  | Quadrants Stars, Opportunity, At Risk and Monitor are shown |
| 3 | Then it plots the 5 brands with the highest SOV | Compare with the SOV ring of C1, GB (EN) | Exactly the top 5 brands of the SOV ring are plotted |
| 4 | And there is no target dot |  | No dot is styled as target and no label reads "(Target)" |

#### TC-GEO-1244-004 - Time Evolution picks the top 10 by SOV in the latest collection of the window and follows the filters

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that Time Evolution uses the production rule: top 10 brands by SOV in the latest collection inside the selected window, with the market and LLM filters applied, so the list follows the filters. Covers AC-3. Needs setup: 7 collections in the window.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. Analysis UA has at least 7 completed collections inside the selected window (daily analysis created early in the cycle).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA |  | Time Evolution shows 10 brands |
| 2 | When the user compares them with the SOV of the latest collection in the window | SOV ring with the latest collection selected | The 10 brands are the top 10 by SOV of that collection |
| 3 | And the user sets the market filter to FR (FR) |  | Time Evolution redraws |
| 4 | Then the 10 brands follow the market filter |  | They are the top 10 by SOV of FR (FR) in the latest collection |
| 5 | When the user also filters on one LLM | LLM: ChatGPT | Time Evolution redraws with the top 10 for FR (FR) and ChatGPT |

#### TC-GEO-1244-005 - Time Evolution still needs 7 collections in the window

- **ACs:** AC-3 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that Time Evolution of an unbranded category still needs 7 collections in the selected window, as in production. Covers AC-3. [Validated by QA 2026-10-22: with fewer than 7 collections in the window nothing is shown, the Time Evolution widget is hidden]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. A date window holding fewer than 7 collections of UA is selectable.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA |  | The category view is displayed |
| 2 | When the user selects a window with fewer than 7 collections |  | The Time Evolution widget is no longer shown |
| 3 | Then the Time Evolution widget is hidden |  | Nothing is shown for Time Evolution: the widget is hidden, as on brand analyses (no "not enough data" message) |

#### TC-GEO-1244-006 - A prompt shows the brand every engine ranks first, with no favourability filters or count

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a prompt row of an unbranded category shows the brand ranked first when every engine ranks the same brand family first, with no favourability filters or count. Covers AC-4. A brand whose name contains the topic can win like any other brand.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA |  | The prompts table is displayed |
| 2 | When the user opens a Visibility prompt whose engines all rank the same brand family first | Check in the detail panel: same brand family first for every engine | The detail panel shows the same first brand family for every engine |
| 3 | Then its row shows that brand as winner |  | Winner / Themes shows the brand |
| 4 | And there are no favourability filters or count |  | No favourability filter and no favourability count above or in the table |

#### TC-GEO-1244-007 - A prompt shows "Split" when engines disagree or an engine has an empty ranking

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify the production winner rule as is: 2 engines on A and 1 on B (or 1 vs 1 with 2 engines) is "Split", and an engine with an empty ranking (or no engine answer) makes the row "Split"; no "No ranking returned" in the prompts table. Covers AC-4. [Validated by QA 2026-10-22: the 1-vs-1 disagreement of a 2-engine analysis is accepted for the first check] Needs setup: prompts with engine disagreement and with an empty ranking in the latest collection (QA to find).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA |  | The prompts table is displayed |
| 2 | When the user opens a prompt where the engines rank different brands first (2 engines on A and 1 on B, or 1 vs 1 when the analysis has 2 engines) |  | The detail panel shows the different first brands |
| 3 | Then its row shows "Split" |  | Winner / Themes shows the "Split" chip |
| 4 | When the user opens a prompt where one engine returned an empty ranking |  | The detail panel shows the engine with no ranking |
| 5 | Then its row also shows "Split" |  | "Split" is shown; "No ranking returned" never appears in the prompts table |

#### TC-GEO-1244-008 - The prompts table stays on the latest collection when the date changes

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the prompts table always shows the latest collection: selecting an earlier collection or a date range does not reload it, and the winner is never aggregated over the range, as in production. Covers AC-5. [Validated by QA 2026-10-22: the prompts table stays on the latest collection when the date changes (not a bug, F-08)] Needs setup: at least 2 collections with a different winner for the same prompt.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. A prompt R of C1 has a different winner in the latest collection and in an earlier one (QA to find).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA on the latest collection |  | Prompt R shows winner W1 |
| 2 | When the user selects the earlier collection |  | The prompts table is not reloaded |
| 3 | Then prompt R still shows the winner of the latest collection |  | Prompt R still shows winner W1 of the latest collection |
| 4 | When the user selects a date range covering both collections |  | The prompts table is not reloaded |
| 5 | Then the winner is not aggregated over the range |  | Prompt R still shows the winner of the latest collection (W1) |

#### TC-GEO-1244-009 - The prompt detail panel shows the full ranking and the brand chosen per engine with no target block

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the prompt detail panel of an unbranded analysis shows the full ranking and the brand chosen per engine, with no target brand block. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA |  | The prompts table is displayed |
| 2 | When the user opens a Competitive prompt |  | The detail panel opens |
| 3 | Then the panel shows the full ranking |  | Every ranked brand is listed with its position |
| 4 | And the brand chosen per engine |  | Each engine shows the brand it chose |
| 5 | And no target brand block is shown |  | No block about a target brand or its position |

#### TC-GEO-1244-010 - Prompts table tabs and the detail panel label Category Topics prompts "Category Topics"

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the prompts table tabs and the detail panel label Category Topics prompts "Category Topics", never "Perception". Covers AC-7. [Validated by PO 2026-10-21 (GEO-1209 comment 865635)]. [Epic 1.8 AC3: the Other tab follows the type tabs and is hidden at 0]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA |  | The prompts table is displayed |
| 2 | When the user looks at the tabs |  | Tabs ALL, Visibility, Competitive and Category Topics are shown, plus Other when its count is above 0 (hidden at 0); no "Perception" tab |
| 3 | And the user opens the "Category Topics" tab and a prompt |  | Category Topics rows show their themes in Winner / Themes; the detail panel opens |
| 4 | Then the detail panel labels it "Category Topics" |  | The panel type label reads "Category Topics", never "Perception" |

#### TC-GEO-1244-011 - The rankings table at category scope is titled "{category} landscape"

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the rankings table of an unbranded Category view is titled "{category} landscape". Covers AC-8. [Validated by PO 2026-10-21 (GEO-1209 comment 865635)].
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA | C1 = e.g. "Parcel delivery" | The category view is displayed |
| 2 | When the rankings table loads |  | The table is shown |
| 3 | Then it is titled "{category} landscape" |  | "Parcel delivery landscape" (the category name, not the topic) |

### GEO-1245 — Adapt the Action Center, the export and the emails for a topic (Story, Ready for QA)

#### TC-GEO-1245-001 - The Action Center entry is hidden in the sidebar of an unbranded analysis

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the sidebar of an unbranded analysis hides the Action Center entry, while a brand analysis keeps it. Covers AC-1. Related GEO-152 (Action Center).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. Analysis BA: brand analysis "Decathlon" created with the flag ON, markets GB (EN) and FR (FR), 2 categories, plus one custom prompt in a real category with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UA |  | The sidebar is displayed |
| 2 | When the sidebar renders |  | Sections Identity, Performance and Sources are shown |
| 3 | Then the Action Center entry is hidden |  | No "Action Center" entry in the sidebar |
| 4 | When the user opens brand analysis BA |  | The sidebar is displayed |
| 5 | Then the brand analysis keeps its Action Center entry |  | "Action Center" is listed as today |

#### TC-GEO-1245-002 - Opening the Action Center URL of an unbranded analysis shows the dashboard

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that opening the Action Center URL of an unbranded analysis directly shows the dashboard, not an empty Action Center (story rule). Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. The Action Center URL pattern is copied from brand analysis BA and the UUID replaced with the UUID of UA.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has the Action Center URL of analysis UA | URL: Action Center path of BA with the UUID of UA | The URL is ready |
| 2 | When the user opens the URL directly |  | The page loads |
| 3 | Then the dashboard of UA is shown |  | The unbranded Overview (or dashboard) of UA is displayed, not an empty Action Center |

#### TC-GEO-1245-003 - The PowerPoint export of an unbranded analysis uses the topic and skips dropped slides

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the PowerPoint export of an unbranded analysis uses the topic on the cover and in titles, skips the dropped slides, never says "your brand" and puts no target marker on any brand. Covers AC-2. [Validated by PO 2026-10-21 (GEO-1209 comment 865635)]. No export frame exists yet (GEO-1185 "PowerPoint export" to come): expected layouts are today's, with dropped slides skipped.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UA |  | The Overview is displayed |
| 2 | When the user runs the PowerPoint export and opens the file | Export > PowerPoint | The file downloads and opens |
| 3 | Then the cover and the titles use the topic |  | The cover reads "Postal services"; slide titles use the topic or the category names |
| 4 | And the dropped slides are skipped |  | No KPI cards, Time Evolution at Overview, Category Prioritization, Corporate Reputation, Brand Territory or Action Center slide; only the widgets of the unbranded dashboard |
| 5 | And no text says "your brand" | Search the file for "your brand" | No match |
| 6 | And no brand carries a target marker |  | No brand is highlighted or marked as target in rankings, SOV or matrix slides |

#### TC-GEO-1245-004 - The XLSX export of an unbranded analysis uses the topic and skips dropped sheets

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the XLSX export of an unbranded analysis uses the topic in titles, skips the dropped sheets, never says "your brand" and puts no target marker on any brand. Covers AC-2. [Validated by PO 2026-10-21 (GEO-1209 comment 865635)]. No export frame exists yet.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UA |  | The Overview is displayed |
| 2 | When the user runs the XLSX export and opens the file | Export > XLSX | The file downloads and opens |
| 3 | Then the titles use the topic |  | Sheet titles and headers use "Postal services" or the category names |
| 4 | And the dropped sheets are skipped |  | No sheet for KPIs, Corporate Reputation, Brand Territory or Action Center; only the widgets of the unbranded dashboard |
| 5 | And no cell says "your brand" and no brand is marked as target | Search the file for "your brand" and "target" | No match; no target column or marker |

#### TC-GEO-1245-005 - The analysis ready email uses the topic as the analysis name

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the analysis ready email of an unbranded analysis uses the topic as the analysis name in its subject and body. Covers AC-3. Related GEO-428. Needs setup: the QA account mailbox receives the analysis ready email of a new unbranded analysis (first collection).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). A new unbranded analysis "Frozen food" (1 market GB (EN)) is created by the QA account, whose mailbox is accessible; its first collection completes.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the first collection of the unbranded analysis "Frozen food" completed |  | The analysis shows its results |
| 2 | When the user opens the analysis ready email in the QA mailbox |  | The email is received |
| 3 | Then the subject uses the topic as the analysis name |  | The subject names "Frozen food" |
| 4 | And the body uses the topic as the analysis name |  | The body names "Frozen food", no brand name and no "your brand" |

### GEO-1246 — Manage the prompts of an unbranded analysis (Story, Ready for QA)

#### TC-GEO-1246-001 - Adding a category in Manage Scope suggests 10 Visibility, 10 Competitive and 10 Category Topics per market

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that adding a category to an unbranded analysis in Manage Scope brings fresh suggestions of 10 Visibility, 10 Competitive and 10 Category Topics prompts per market, with no Reputation or Brand Image. Covers AC-1 (extends GEO-1239 AC-8, see TC-GEO-1239-010).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. The pool has at least 60 free slots.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens Manage Scope of analysis UA |  | Manage Scope is displayed |
| 2 | When the user adds a category | Category: "Courier services" | Fresh suggestions for the new category are shown, all ticked, with the pool in view |
| 3 | Then each market gets 30 suggestions for the new category | Filter: new category, market GB (EN) | 10 Visibility, 10 Competitive and 10 Category Topics rows |
| 4 | And FR (FR) gets the same split | Filter: new category, market FR (FR) | 10 / 10 / 10, in French |
| 5 | And there is no Reputation or Brand Image suggestion |  | No "Reputation" or "Brand Image" row or filter value |

#### TC-GEO-1246-002 - Adding a market in Manage Scope suggests the unbranded mix and no Brand Image

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that adding a market to an unbranded analysis in Manage Scope brings, for each category, 10 Visibility, 10 Competitive and 10 Category Topics suggestions in the market language, and never creates Brand Image prompts. Covers AC-1 (extends GEO-1239 AC-8, see TC-GEO-1239-009).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. The pool has at least 60 free slots.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens Manage Scope of analysis UA |  | Manage Scope shows the markets GB (EN) and FR (FR) |
| 2 | When the user adds a market | Market: Spain - Spanish (ES) | Fresh suggestions for ES (ES) are shown, all ticked |
| 3 | Then each category gets 30 suggestions in the new market | Filter: market ES (ES), category C1 then C2 | 10 Visibility, 10 Competitive and 10 Category Topics per category = 60 suggestions, in Spanish |
| 4 | And no Brand Image or Reputation suggestion is created |  | No "Brand Image" or "Reputation" row |

#### TC-GEO-1246-003 - The type select of an unbranded analysis in Manage Scope lists Visibility, Competitive, Category Topics and Other only

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that adding or editing a prompt of an unbranded analysis in Manage Scope offers only Visibility, Competitive, Category Topics and Other in the type select. Covers AC-2. [Validated by QA 2026-10-21: on a prompt already in Other, Other is the current value of the select and is not listed again (dev answer GEO-1509, 46.7 AC5)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens Manage Scope > Prompts of analysis UA |  | The prompt table is displayed |
| 2 | When the user clicks Add prompt and opens the type select |  | The select lists Visibility, Competitive, Category Topics and Other only |
| 3 | And the user cancels and opens the type select of an existing row |  | The select lists Visibility, Competitive, Category Topics and Other only; on a row already in Other, Other is the current value of the select and the list shows Visibility, Competitive and Category Topics |
| 4 | Then no Reputation or Brand Image type is offered |  | Neither "Reputation" nor "Brand Image" in either select |

#### TC-GEO-1246-004 - A brand analysis keeps Reputation and Brand Image in Manage Scope with the flag ON

- **ACs:** AC-1, AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that, with the flag ON, a brand analysis keeps Reputation and Brand Image in Manage Scope suggestions and type selects (story rule, brand counterpart of AC-1 and AC-2). Covers AC-1, AC-2 (non-regression of the per-mode rule).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis BA: brand analysis "Decathlon" created with the flag ON, markets GB (EN) and FR (FR), 2 categories, plus one custom prompt in a real category with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); at least one collection completed. The pool has at least 60 free slots.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens Manage Scope > Prompts of brand analysis BA |  | The prompt table is displayed |
| 2 | When the user opens the type select of Add prompt |  | The select lists Visibility, Competitive, Reputation, Brand Image and Other |
| 3 | And the user adds a market | Market: Spain - Spanish (ES) | Fresh suggestions are shown |
| 4 | Then the brand mix is suggested |  | Per category 10 Visibility, 10 Competitive, 10 Reputation, plus 10 Brand Image for the market; no Category Topics |

### GEO-1247 — Classify prompts by question type with an Other fallback (Story, Ready for QA)

#### TC-GEO-1247-001 - Type badges of a brand analysis show Visibility, Competitive, Reputation, Brand Image or Other

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that, with the flag ON, the type badges of a brand analysis show Visibility, Competitive, Reputation, Brand Image or Other. Covers AC-1. Related GEO-1002: TC-GEO-1235-002 (four badges, flag OFF).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Brand scope: Brand analysis selected, brand "Decathlon", market GB (EN), detected categories kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the brand scope |  | The prompt table is displayed |
| 2 | When the user adds a prompt with the type empty | Prompt: "What do runners say about trail shoes?" - Category C1 - Market GB (EN) - Type left at its default (Other) | The row is added |
| 3 | Then the type badges show the five brand values |  | Badges read Visibility, Competitive, Reputation, Brand Image and, for the new row, Other |
| 4 | And no Category Topics badge is shown |  | No "Category Topics" badge in a brand analysis |

#### TC-GEO-1247-002 - A prompt saved without a category is Other on its category only

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a prompt saved without a category is Other on the category alone and keeps its type. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the unbranded scope |  | The prompt table is displayed |
| 2 | When the user adds a prompt with a type and no category | Prompt: "Which courier is best for sending a parcel abroad?" - Category empty - Type Visibility - Market GB (EN) | The row is added |
| 3 | Then the category alone is Other |  | The Category cell reads "Other" |
| 4 | And the type is kept |  | The Type badge reads "Visibility" |

#### TC-GEO-1247-003 - A prompt saved without a type, or without both, is Other on each missing dimension

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a prompt saved without a type is Other on its type only, and that a prompt saved with neither is Other on both. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the unbranded scope |  | The prompt table is displayed |
| 2 | When the user adds a prompt with a category and no type | Prompt: "What do people think of parcel lockers?" - Category C1 - Type empty - Market GB (EN) | The row is added |
| 3 | Then the type alone is Other |  | Category reads C1 and the Type reads "Other" |
| 4 | When the user adds a prompt with neither category nor type | Prompt: "Is it worth paying for tracked delivery?" - Category empty - Type empty - Market GB (EN) | The row is added |
| 5 | Then the prompt is Other on both |  | Category reads "Other" and Type reads "Other" |

#### TC-GEO-1247-004 - Inline add can be confirmed with the category or type empty, falling back to Other

- **ACs:** AC-3 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that with the flag ON the inline add confirm is enabled with the category or the type empty and that the empty dimension falls back to Other, instead of the confirm staying disabled. Covers AC-3. Overrides GEO-1234 AC-3 (TC-GEO-1234-005, flag OFF only).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the unbranded scope |  | The prompt table is displayed |
| 2 | When the user clicks Add prompt and types a prompt | Prompt: "Which parcel service handles returns best?" - Market GB (EN) | The editable row is shown |
| 3 | And the user leaves the category and the type empty |  | The confirm button is enabled |
| 4 | And the user confirms |  | The row is added, kept and marked CUSTOM |
| 5 | Then the empty dimensions fall back to Other |  | Category reads "Other" and Type reads "Other" |

#### TC-GEO-1247-005 - Category and Type column filters list Other as its own value with a live count

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Category and Type column filters list Other as a value of its own with its live count. Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept. On Prompts, 2 custom prompts with an empty category and 1 custom prompt with an empty type were added.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with 2 prompts Other on category and 1 Other on type |  | The prompt table is displayed |
| 2 | When the user opens the Category column filter |  | Other is listed as its own value with count 2 |
| 3 | And the user opens the Type column filter |  | Other is listed as its own value with count 1 |
| 4 | When the user classifies one of the Other-category prompts | Category select: C1 | The row reads C1 |
| 5 | Then the counts are live |  | The Category filter shows Other with count 1 |

#### TC-GEO-1247-006 - In the wizard a missing dimension reads "Other" in an inline select and a kept row is on the warning tint

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that in the wizard the missing dimension of a prompt in Other reads "Other" in an inline select, the kept row is on the warning tint, and picking a value removes the tint and updates the counts. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept. On Prompts, 1 kept custom prompt with an empty category was added.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with a kept prompt Other on its category |  | The row is shown |
| 2 | When the user looks at the row |  | The Category cell is an inline select reading "Other" (never "Pick category") |
| 3 | Then the kept row is on the warning tint |  | The row background is the warning tint |
| 4 | When the user picks a category in the inline select | Category: C1 | The Category reads C1 |
| 5 | Then the tint is removed and the counts are updated |  | The row is no longer tinted; the Category filter count of Other drops by 1 and C1 rises by 1 |

#### TC-GEO-1247-007 - An unticked prompt in Other still reads "Other" in its inline select with no warning tint

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that an unticked prompt in Other still reads "Other" in its inline select ("ticked or not") and that only kept rows are on the warning tint. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept. On Prompts, 1 kept custom prompt with an empty type was added.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with a kept prompt Other on its type |  | The row is on the warning tint |
| 2 | When the user unticks the row |  | The row is greyed |
| 3 | Then its Type still reads "Other" in an inline select |  | The inline select reads "Other" |
| 4 | And the unticked row is not on the warning tint |  | The warning tint is not applied to the unticked row |

#### TC-GEO-1247-008 - In Manage Scope picking a value for an Other prompt removes the tint and updates the counts

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that in Manage Scope the missing dimension of a kept Other prompt reads "Other" in an inline select on the warning tint, and that picking a value removes the tint and updates the counts. Covers AC-5. Related GEO-1002: TC-GEO-1239-001.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis BA: brand analysis "Decathlon" created with the flag ON, markets GB (EN) and FR (FR), 2 categories, plus one custom prompt in a real category with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens Manage Scope > Prompts of brand analysis BA |  | The kept Other-type prompt is shown |
| 2 | When the user looks at its row |  | The Type cell is an inline select reading "Other" and the row is on the warning tint |
| 3 | And the user picks a type | Type: Reputation | The Type reads "Reputation" |
| 4 | Then the tint is removed and the counts are updated |  | The row is no longer tinted; the Type filter count of Other drops by 1 and Reputation rises by 1 |

#### TC-GEO-1247-009 - Kept prompts in Other show a non-blocking warning to classify them

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that when kept prompts sit in Other the table shows a warning asking to classify them and stating that what stays in Other returns key concepts only, and that nothing blocks the launch. Covers AC-6. [Validated by PO 2026-10-21 (GEO-1209 comment 865635): shipped banner text; AC-6 still reads "improves measurement accuracy"]. The banner says "Other", never "uncategorised".
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept. On Prompts, 2 kept custom prompts with an empty category were added.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with 2 kept prompts in Other |  | The prompt table is displayed |
| 2 | When the table renders |  | A warning banner is shown above the table |
| 3 | Then the warning asks to classify them and states what Other returns |  | Title "2 prompts are in Other." and body "Pick a category and a type. Anything left as Other still runs, but it returns key concepts only, no metrics."; it never says "uncategorised" |
| 4 | And nothing blocks the launch |  | Review & Launch is enabled |
| 5 | When the user classifies both prompts | Category: C1 | The warning disappears |

#### TC-GEO-1247-010 - Summary shows the Other card listing each kept Other prompt with its market and an inline select

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that when kept prompts sit in Other, Summary shows a card titled with "Other" (never "Unclassified" or "uncategorised") that lists each with its market and an inline select for the missing value, states it returns key concepts only until classified, and never blocks launch. Covers AC-7. [Validated by PO 2026-10-21 (GEO-1209 comment 865635)].
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept. On Prompts, 1 kept custom prompt with an empty category (market GB (EN)) and 1 kept custom prompt with an empty type (market FR (FR)) were added.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has 2 kept prompts in Other on the Prompts step |  | Both rows are on the warning tint |
| 2 | When the user goes to Summary |  | Summary is displayed |
| 3 | Then a card titled with "Other" is shown |  | The card title contains "Other"; neither "Unclassified" nor "uncategorised" appears |
| 4 | And it lists each kept Other prompt with its market and an inline select for the missing value |  | Row 1: text, GB (EN), Category select "Other"; row 2: text, FR (FR), Type select "Other" |
| 5 | And it states the prompts return key concepts only until classified and launch is not blocked |  | The note says key concepts only until classified; Create Analysis is enabled |
| 6 | When the user picks a category for row 1 in the card | Category: C1 | Row 1 leaves the card; row 2 stays |

#### TC-GEO-1247-011 - The Summary Other card is hidden when no kept prompt is in Other and never lists unticked ones

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the Summary Other card is hidden when no kept prompt sits in Other, and that unticked Other prompts are not listed on it (story rule). Covers AC-7.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Unbranded scope used in the wizard: Unbranded analysis selected, topic "Postal services", markets United Kingdom - English (EN) shown as GB (EN) and France - French (FR), the 2 discovered categories C1 and C2 kept. On Prompts, 1 custom prompt with an empty category was added.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has 1 prompt in Other on the Prompts step |  | The row is kept and tinted |
| 2 | When the user unticks it and goes to Summary |  | Summary is displayed |
| 3 | Then the Other card is hidden |  | No card titled with "Other"; the unticked prompt is not listed |
| 4 | When the user goes back, ticks it again and returns to Summary |  | The Other card is shown with that prompt |

#### TC-GEO-1247-012 - Manage Scope Prompts shows Other prompts on inline selects

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in Manage Scope, Prompts shows the prompts in Other on inline selects, on both dimensions. Covers AC-8. Related GEO-1002: TC-GEO-1239-001.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens Manage Scope of analysis UA |  | Manage Scope is displayed |
| 2 | When the user opens Prompts |  | The prompt table is displayed |
| 3 | Then the prompt Other on its type shows an inline Type select |  | Type cell: inline select reading "Other" |
| 4 | And the prompt Other on its category shows an inline Category select |  | Category cell: inline select reading "Other" |

#### TC-GEO-1247-013 - An Other-type prompt consumes a full slot and returns key concepts only, no keyword graph

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a prompt that is Other on its type consumes a full slot per market and, when it runs, returns key concepts only, with no keyword graph. Covers AC-9. Needs setup: a completed collection after the prompt was added.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens Manage Scope > Prompts of analysis UA |  | The ring reads "X / P" |
| 2 | When the user adds a prompt with the type empty in market GB (EN) and saves | Prompt: "What do people say about Sunday deliveries?" - Category C1 - Type empty - Market GB (EN) | The ring reads "X + 1 / P" |
| 3 | And the next collection runs |  | The collection completes |
| 4 | And the user opens the "Other" tab of the C1 prompts table |  | The prompt is listed |
| 5 | Then it returns key concepts only |  | Winner / Themes shows its theme chips (no winner); the detail panel shows themes, no keyword graph |

#### TC-GEO-1247-014 - Brand Image prompts are never shown as Other on the Category column

- **ACs:** AC-2 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that Brand Image prompts, which have no category, are never shown as "Other" on the Category column (story rule). Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). The wizard is opened with New Analysis on the GEO dashboard. Brand scope: Brand analysis selected, brand "Decathlon", market GB (EN), detected categories kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of the brand scope |  | The prompt table is displayed |
| 2 | When the user filters on Type Brand Image |  | 10 Brand Image rows are shown |
| 3 | Then their Category is not Other |  | The Category cell reads "Overview", never "Other" |
| 4 | And the Category filter count of Other excludes them |  | Other is not listed (or counts 0) in the Category filter |

### GEO-1248 — Show prompts in Other on the dashboard (Story, Ready for QA)

#### TC-GEO-1248-001 - The sidebar shows a last "Other" category when a kept prompt has no category

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that when at least one kept prompt has no category, the sidebar shows a last "Other" category. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UA |  | The sidebar is displayed |
| 2 | When the sidebar lists the categories |  | C1 and C2 are listed |
| 3 | Then a last "Other" category is shown |  | "Other" is the last category entry, after C1 and C2 |
| 4 | When the user clicks "Other" |  | The Other category page opens |

#### TC-GEO-1248-002 - The "Other" sidebar entry is hidden when no kept prompt is left without a category

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the "Other" sidebar category is hidden when no kept prompt has no category, and disappears once no kept prompt is left in it. Covers AC-1. Needs setup: the last part needs the next collection after classification.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UZ: unbranded analysis, topic "Car insurance", 1 market GB (EN), every Category Topics prompt unticked at creation and no prompt in Other; at least one collection completed. Analysis UA as in the other TCs (one Other-category prompt).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UZ |  | The sidebar is displayed |
| 2 | Then no "Other" category is shown |  | Only the real categories are listed |
| 3 | When the user classifies the Other-category prompt of UA in Manage Scope and the next collection runs | Category: C1 | The collection completes |
| 4 | Then the "Other" entry of UA disappears |  | The UA sidebar no longer lists "Other" |

#### TC-GEO-1248-003 - The Other category page shows key concepts and the prompts table with no KPI, SOV, Time Evolution, prioritization or rankings

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Other category page shows the key concepts of its prompts and the prompts table, with no KPI cards, SOV, Time Evolution, prioritization or rankings. Covers AC-2. The concept list uses the shared GEO-1068 component (tested in the GEO-1068 TCs).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UA |  | The sidebar lists "Other" |
| 2 | When the user opens the Other category page |  | The page loads with the tabs Identity and Sources (no Performance) |
| 3 | Then it shows the key concepts of its prompts and the prompts table |  | InBrief, Top Topics and Prompts Analysis are shown |
| 4 | And there are no KPI cards, SOV, Time Evolution, prioritization or rankings |  | None of these widgets is on the page |

#### TC-GEO-1248-004 - A real category with Other-type prompts shows an "Other" tab with its count and key concepts in Winner / Themes

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that when prompts of a real category carry the Other type, the prompts table shows an "Other" tab with its count after the type tabs, whose rows show their key concepts in Winner / Themes. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C1 of analysis UA |  | The prompts table is displayed |
| 2 | When the user looks at the tabs |  | Tabs ALL, Visibility, Competitive, Category Topics, then "Other (1)" |
| 3 | Then the "Other" tab follows the type tabs with its count |  | "Other" is the last tab and its count is 1 |
| 4 | When the user opens the "Other" tab |  | The Other-type prompt is listed with the "Other" badge |
| 5 | Then its row shows its key concepts in Winner / Themes |  | Theme chips (with "+N" if more) and no winner |

#### TC-GEO-1248-005 - The "Other" tab of a real category is hidden at 0

- **ACs:** AC-3 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the "Other" tab of a real category prompts table is hidden when no prompt of the category carries the Other type. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens category C2 of analysis UA, which has no Other-type prompt |  | The prompts table is displayed |
| 2 | When the user looks at the tabs |  | Tabs ALL, Visibility, Competitive and Category Topics |
| 3 | Then no "Other" tab is shown |  | No "Other" tab and no "Other (0)" |

#### TC-GEO-1248-006 - A Visibility or Competitive prompt in the Other category is ranked and shows a winner or "Split"

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a Visibility or Competitive prompt in the Other category is ranked like any other prompt and its row shows the brand ranked first or "Split": production rule in a brand analysis, GEO-1244 rule in an unbranded analysis. Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. Analysis BA: brand analysis "Decathlon" created with the flag ON, markets GB (EN) and FR (FR), 2 categories, plus one custom prompt in a real category with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Other category page of analysis UA |  | The prompts table lists the Visibility prompt in Other |
| 2 | When the user opens its detail panel |  | The full ranking per engine is shown |
| 3 | Then its row shows the brand ranked first or "Split" |  | Winner when every engine ranks the same brand family first, else "Split" (GEO-1244 rule); no themes |
| 4 | When the user opens the Other category page of brand analysis BA |  | The prompts table lists the Visibility prompt in Other |
| 5 | Then its row follows the production winner rule of a brand analysis |  | The row shows the brand ranked first or "Split", as in any brand category |

#### TC-GEO-1248-007 - Prompts in the Other category feed no KPI, SOV, rankings or Time Evolution

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a Visibility or Competitive prompt in the Other category feeds no KPI, SOV, rankings or Time Evolution. Covers AC-4. Needs setup: a brand X named only in the answers of the Other-category prompt (QA to find in the detail panel).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis BA: brand analysis "Decathlon" created with the flag ON, markets GB (EN) and FR (FR), 2 categories, plus one custom prompt in a real category with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); at least one collection completed. In the latest collection of BA, brand X is named only in the answers of the Other-category Visibility prompt.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given brand X is named only by the Other-category prompt of BA |  | The detail panel of that prompt lists X |
| 2 | When the user opens the Overview of BA |  | KPI cards, SOV and rankings are displayed |
| 3 | Then brand X is not in the SOV ring or the rankings |  | X is not listed |
| 4 | And the Overview KPIs do not include the Other-category prompt | Compare the KPI prompt basis with the number of prompts of the real categories | KPIs are computed on the real categories only |
| 5 | And Time Evolution does not show brand X |  | X is not plotted |

#### TC-GEO-1248-008 - A Competitive prompt in the Other category runs as written with unfilled placeholders removed

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a Competitive prompt in the Other category runs as the user wrote it with no [Competitor N] to fill, and that unfilled placeholders typed by hand are removed as in production. Covers AC-5. Needs setup: a completed collection after the prompt was added.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. The pool has room for 2 prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens Manage Scope > Prompts of analysis UA |  | The prompt table is displayed |
| 2 | When the user adds a Competitive prompt with no category | Prompt: "Royal Mail or DPD: which is more reliable for parcels?" - Category empty - Type Competitive - Market GB (EN) | The row is added with Category "Other" |
| 3 | And the user adds a Competitive prompt with no category and a hand-typed placeholder | Prompt: "Is Evri better than [Competitor 1] for small parcels?" - Category empty - Type Competitive - Market GB (EN) | The row is added with Category "Other" |
| 4 | And the next collection runs |  | The collection completes |
| 5 | Then the first prompt was sent as written | Other category page > detail panel | The sent wording is exactly the typed one |
| 6 | And the unfilled placeholder was removed from the second prompt |  | The sent wording has no "[Competitor 1]" and reads naturally |

#### TC-GEO-1248-009 - Competitors from Visibility answers in the Other category feed no other category

- **ACs:** AC-6 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that competitors extracted from Visibility answers of the Other category feed no other category, since extraction runs per market and category. Covers AC-6. Needs setup: a brand Y named only by Visibility answers of the Other category (QA to find); the extraction scope is otherwise only checkable in the logs.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. In the latest collection of UA, brand Y is named by the Visibility answers of the Other category and by no Visibility answer of C1 or C2.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given brand Y is named only by Visibility answers of the Other category of UA |  | The Other category detail panel lists Y |
| 2 | When the user opens the Competitive prompts of C1 and C2 for the same market |  | The detail panels show the competitors compared |
| 3 | Then brand Y is not one of their competitors |  | No C1 or C2 Competitive prompt names Y |

#### TC-GEO-1248-010 - Other-type prompts produce key concepts excluded from KPIs and SOV; Visibility and Competitive prompts in Other produce none

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that key concepts are extracted from Other-type prompts and excluded from KPIs and SOV, while Visibility and Competitive prompts in the Other category are ranked only and produce no concepts. Covers AC-7.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis BA: brand analysis "Decathlon" created with the flag ON, markets GB (EN) and FR (FR), 2 categories, plus one custom prompt in a real category with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens a real category of brand analysis BA with its Other-type prompt |  | The prompts table shows the "Other" tab |
| 2 | When the user opens the "Other" tab |  | The Other-type row shows theme chips in Winner / Themes |
| 3 | Then the Other-type prompt produced key concepts |  | Its detail panel shows its themes |
| 4 | And it is excluded from KPIs and SOV |  | The KPI cards and SOV of the category count only the Visibility, Competitive, Reputation and Brand Image prompts (no Other-type prompt in the KPI basis) |
| 5 | When the user opens the Other category page and the Visibility prompt in Other |  | The row shows a winner or "Split" |
| 6 | Then the Visibility prompt in the Other category produced no concepts |  | No theme chips on its row and no themes in its detail panel |

#### TC-GEO-1248-011 - Other-type concepts follow the mode: about the brand in a brand analysis, topics on the category in an unbranded one

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that an Other-type prompt runs as written without the Perception system instruction and that its concepts follow the mode: about the brand with sentiment towards the brand in a brand analysis, topics with sentiment towards the category in an unbranded analysis. Covers AC-8. Needs setup: the absence of the Perception system instruction and the Gemini (non engine-native) extraction path are only checkable in the logs (dev support).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. Analysis BA: brand analysis "Decathlon" created with the flag ON, markets GB (EN) and FR (FR), 2 categories, plus one custom prompt in a real category with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the "Other" tab of a real category of brand analysis BA |  | The Other-type row is listed |
| 2 | When the user opens its detail panel |  | Themes and sentiment per engine are shown |
| 3 | Then its concepts are about the brand with sentiment towards the brand |  | Themes describe "Decathlon"; the sentiment is towards the brand |
| 4 | When the user opens the "Other" tab of category C1 of unbranded analysis UA and its detail panel |  | Themes and sentiment per engine are shown |
| 5 | Then its concepts are topics with sentiment towards the category |  | Themes describe aspects of C1; the sentiment is towards the category; no brand tag |
| 6 | And the logs show the run and extraction path | Dev support: collection logs | Sent as written with no Perception system instruction; concepts extracted by the Gemini extraction (non engine-native path) |

#### TC-GEO-1248-012 - Other prompts feed InBrief and Top Topics of their category, the Overview and the Other page in an unbranded analysis

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify in an unbranded analysis that an Other-type prompt feeds InBrief and Top Topics of its category and of the Overview, and that a prompt in the Other category feeds the Overview and the Other category page. Covers AC-9 (GEO-1186 text is stale: it excludes Other from Top Concepts). Needs setup: a theme T1 produced only by the Other-type prompt of C1 (QA to find in its detail panel).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. In the latest collection of UA, the Other-type prompt of C1 produced a theme T1 that no Category Topics prompt produced. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Other-type prompt of C1 produced theme T1 |  | Its detail panel lists T1 |
| 2 | When the user opens Top Topics of category C1 |  | Top Topics in the Category is displayed |
| 3 | Then T1 is part of C1 Top Topics |  | T1 is listed |
| 4 | And T1 is part of the Overview Top Topics and not of C2 |  | T1 is listed on the Overview, not in C2 |
| 5 | When the user opens the Other category page |  | Top Topics of the Other page is displayed |
| 6 | Then the Other category page shows the concepts of its prompts only |  | Topics of the Other-category prompts are listed; T1 (from C1) is not |

#### TC-GEO-1248-013 - Other-type themes feed InBrief and Top Concepts of a brand analysis, with KPIs unchanged

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify in a brand analysis that the concepts of an Other-type prompt are part of the InBrief and Top Concepts input of its category and the Overview, while the KPIs do not move (PM Q16). Covers AC-9. Needs setup: a theme T2 produced only by the Other-type prompt of BA.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis BA: brand analysis "Decathlon" created with the flag ON, markets GB (EN) and FR (FR), 2 categories, plus one custom prompt in a real category with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); at least one collection completed. In the latest collection of BA, the Other-type prompt produced a theme T2 that no Reputation prompt produced. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Other-type prompt of BA produced theme T2 |  | Its detail panel lists T2 |
| 2 | When the user opens Top Concepts of its category and of the Overview |  | Top Concepts is displayed |
| 3 | Then T2 is listed in both |  | T2 appears in the category and the Overview Top Concepts |
| 4 | And InBrief can reflect T2 |  | InBrief of the category is generated from the concepts including T2 |
| 5 | And the KPIs do not include the Other-type prompt |  | KPI cards are computed without the Other-type prompt |

#### TC-GEO-1248-014 - An Other prompt classified in Manage Scope moves to its category and type at the next collection

- **ACs:** AC-10 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that an Other prompt classified in Manage Scope moves to its category and type at the next collection and feeds their metrics, while past collections stay where they were collected. Covers AC-10. Needs setup: the next collection after the change.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens Manage Scope > Prompts of analysis UA |  | The Visibility prompt in the Other category is listed |
| 2 | When the user picks a category for it and saves | Category: C1 | The row reads C1 and is no longer tinted |
| 3 | And the next collection runs |  | The collection completes |
| 4 | Then the prompt is in category C1 for the new collection | C1 prompts table, latest collection | The prompt is listed in the C1 Visibility tab and feeds C1 rankings and SOV |
| 5 | And the past collections stay where they were collected | Select the previous collection | The prompt is still under the Other category page for the previous collection |

#### TC-GEO-1248-015 - The export includes the Other section limited to key concepts

- **ACs:** AC-11 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the export includes the Other section, limited to key concepts. Covers AC-11. Related GEO-156 (exports). The AC does not name the formats: the TC checks PowerPoint and XLSX.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens analysis UA |  | The Overview is displayed |
| 2 | When the user runs the PowerPoint export and opens the file | Export > PowerPoint | The file opens |
| 3 | Then it includes the Other section limited to key concepts |  | An "Other" section with its key concepts only: no KPI, SOV, rankings or Time Evolution slide for Other |
| 4 | When the user runs the XLSX export and opens the file | Export > XLSX | The file opens |
| 5 | Then it includes the Other section limited to key concepts |  | An "Other" sheet or section with key concepts only |

#### TC-GEO-1248-016 - The Other category page has the Sources tab of a category page

- **ACs:** AC-12 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Other category page also has the Sources tab of a category page. Covers AC-12.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Other category page of analysis UA |  | The page loads |
| 2 | When the user opens the Sources tab |  | The Sources section is displayed |
| 3 | Then it shows the sources cited by the answers of the Other prompts |  | Same Sources layout as a real category page |

#### TC-GEO-1248-017 - A prompt of the Other page opens the "Other Details" panel with sentiment per engine, themes, response and sources

- **ACs:** AC-12 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a prompt of the Other category page opens the detail panel drawn in "Other Details", with sentiment per engine, themes, response and sources. Covers AC-12. Needs setup: an Other-type prompt placed in the Other category (no category and no type) so the panel has themes.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) with a prompt pool set in the back office and enough free slots for the scope used; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Global unbranded / Other feature flag ON (5-step wizard: Analysis Type, Brand & Country or Topic & Country, Categories, Prompts, Summary). Analysis UA: unbranded analysis created with the wizard, topic "Postal services", markets GB (EN) and FR (FR), the 2 discovered categories C1 and C2 (e.g. "Parcel delivery" and "International shipping"), every suggestion kept, plus one custom prompt in C1 with an empty type (Other type) and one custom Visibility prompt with an empty category (Other category); daily collection, at least one collection completed. UA holds a prompt with neither category nor type (Other on both) collected at least once.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Other category page of analysis UA |  | The prompts table is displayed |
| 2 | When the user opens the prompt that is Other on both dimensions |  | The detail panel opens |
| 3 | Then the panel shows an engine segmented control and the sentiment per engine |  | Engine selector; badge "Sentiment - {ENGINE}" |
| 4 | And it shows the themes, the response and the sources |  | Themes chips, Response text, Sources with "All sources" |
| 5 | When the user switches engine |  | Sentiment, themes, response and sources update for that engine |
