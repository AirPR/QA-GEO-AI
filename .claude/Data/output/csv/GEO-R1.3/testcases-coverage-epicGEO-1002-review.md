# GEO-1002 Setup Revamp — Prompt-Pool Quota and New-Analysis Wizard — epic test case review (GEO-R1.3, generated 2026-10-19, synced with Jira 2026-10-22)

**Sources (read-only):** `apps/geo/GEO-R1.3/GEO-1002/` (EPIC.md, epic-data.json, 13 STORY_*.md, Jira state on 2026-10-19). Consistency references: `apps/geo/GEO-R1.3/QA-READINESS-GEO-R1.3.md` and `apps/geo/GEO-R1.3/TEST-PLAN-GEO-R1.3.md` (scenarios 1–69). Where the epic text and a story disagree, the story ACs are the reference.

**Scope:** 13 Stories (GEO-1229 to GEO-1240, GEO-1251), all Ready for QA. **Excluded from the TC scope:** bugs GEO-1271, GEO-1272, GEO-1274 (open on 2026-10-19, Ready for QA since 2026-10-19; linked in the Description of the TCs touching their behaviour) and Design Task GEO-1012. Mode: no `--figma`.

**CSV:** `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-epicGEO-1002.csv` — 111 TCs, 485 step rows (+1 header), 16 columns, `;` separator, fields quoted with doubled quotes when they hold `;` or `"`, UTF-8 without BOM, LF. One Cucumber step per row; case-level fields on the first row of each TC only. QA Parent = GEO-1002, Components = GEO, QA Component = GEO Module, Labels empty, Test Type = Manual, QA Regression = Yes for Urgent/High. Not imported to Quality Plus, nothing written to Jira.

## Summary

| Metric | Value |
|---|---|
| Test cases | 111 |
| Steps (CSV rows) | 485 |
| Stories | 14 |
| Coverage | happy path 53 · edge 31 · error 14 · state 13 |
| Priority | Urgent 0 · High 62 · Medium 46 · Low 3 |
| UI / Functional | UI 9 · Functional 102 |
| Smoke = Yes | 13 |
| QA Regression = Yes | 65 |
| AC coverage | 75 / 76 (69 functional ACs covered under their own story + GEO-1233 AC-2 covered under GEO-1251-001; GEO-1515: 5 of 6 ACs, AC-4 has no TC by user decision 2026-10-22); GEO-1237 TAC1–TAC5 excluded (not counted) |

| Story | Title | Jira status | ACs | TCs | Steps | Smoke | Happy | Edge | Error | State |
|---|---|---|---|---|---|---|---|---|---|---|
| GEO-1229 | Share one prompt pool across all analyses | Ready for QA | 5 | 7 | 31 | 1 | 4 | 0 | 1 | 2 |
| GEO-1230 | Set the prompt pool of an organisation in the back office | Ready for QA | 4 | 10 | 44 | 1 | 4 | 2 | 2 | 2 |
| GEO-1231 | Set the brand and the markets | Ready for QA | 7 | 11 | 49 | 1 | 7 | 3 | 1 | 0 |
| GEO-1232 | Review the detected categories | Ready for QA | 4 | 8 | 34 | 1 | 3 | 4 | 1 | 0 |
| GEO-1233 | Review the suggested prompts | Ready for QA | 7 | 7 | 32 | 1 | 3 | 1 | 0 | 3 |
| GEO-1234 | Add a prompt inline | Ready for QA | 4 | 8 | 32 | 1 | 3 | 3 | 2 | 0 |
| GEO-1235 | Sort, filter and edit the prompt table | Ready for QA | 8 | 10 | 43 | 1 | 6 | 4 | 0 | 0 |
| GEO-1236 | Track the pool while selecting prompts | Ready for QA | 4 | 5 | 23 | 1 | 1 | 1 | 2 | 1 |
| GEO-1237 | Review and create the analysis | Ready for QA | 6 | 11 | 48 | 1 | 4 | 5 | 2 | 0 |
| GEO-1238 | Leave the wizard | Ready for QA | 2 | 7 | 29 | 1 | 3 | 4 | 0 | 0 |
| GEO-1239 | Manage prompts after launch | Ready for QA | 9 | 14 | 63 | 1 | 7 | 3 | 1 | 3 |
| GEO-1240 | See the prompt pool on the GEO dashboard | Ready for QA | 5 | 5 | 22 | 1 | 2 | 1 | 1 | 1 |
| GEO-1251 | Resolve competitors when no Visibility prompt is kept | Ready for QA | 5 | 5 | 20 | 1 | 4 | 0 | 1 | 0 |
| GEO-1515 | Set the prompt pool of existing organisations from their old quota | Ready for QA | 6 | 3 | 15 | 0 | 2 | 0 | 0 | 1 |

### Sync 2026-10-22 (`/sync-tcs-epic GEO-1002 GEO-R1.3 --since 2026-10-20`)

All comments of GEO-1002, its 13 stories, GEO-1515, Design Task GEO-1012 and the linked bugs (any date, threaded replies included) were matched against the run findings (F / Q / K) and the questions file (A1–A17). No AC changed in Jira since the 2026-10-20 sync (epic and the 13 stories identical to the local files). Plan confirmed by the user on 2026-10-22.

- **Updated (15 TCs):** TC-GEO-1232-002 (GEO-1504 empty state), TC-GEO-1235-007 (GEO-1511), TC-GEO-1230-006 (Q-11, GEO-1515 note), TC-GEO-1230-009 (A5 / GEO-1272, GEO-1515 note), TC-GEO-1237-006 (Q-04: ChatGPT and Gemini on by default, GEO-1237 Rules / TAC3), TC-GEO-1239-002 / 009 (Q-10: suggestions at the end of the table, no "Suggested Prompts" heading), TC-GEO-1239-002 / 007 / 008 (Q-05: saved at once, no Save button), TC-GEO-1239-013 (GEO-1515 note), TC-GEO-1251-002 (Q-08 / Q-09, GEO-1502 works as designed), TC-GEO-1234-003 / 004 and TC-GEO-1235-003 / 004 (Q-06: "Other" placeholder and "Other (0)").
- **Added (4 TCs):** TC-GEO-1231-011 (GEO-1506), TC-GEO-1232-008 (GEO-1501), TC-GEO-1238-007 (GEO-1500 / Q-14), TC-GEO-1239-014 (GEO-1503). 107 → 111 TCs.
- **Kept strict, bug to create:** TC-GEO-1239-004 (F-12: deleting a prompt in Manage Scope has no confirmation, toast + Undo, against the GEO-1239 Rules "Deleting asks for confirmation (no Undo here)"); F-08 copy (TC-GEO-1232-005 / 006, TC-GEO-1238-001 / 002, TC-GEO-1235-006).
- **Re-run:** TC-GEO-1238-004, TC-GEO-1235-007, TC-GEO-1230-009, TC-GEO-1240-004, TC-GEO-1229-007, TC-GEO-1251-002, TC-GEO-1237-006, and the 4 added TCs.
- **GEO-1515:** from 1.3 no organisation is left without a pool; the "no pool" steps of TC-GEO-1230-006, TC-GEO-1230-009 (step 4) and TC-GEO-1239-013 are not applicable when no such organisation exists (no dev setup requested).
- **GEO-1514 (To Do, country instead of market):** when delivered, "markets" in TC-GEO-1232-005 / 008, the "Markets" Summary card (TC-GEO-1237-001), the duplicate message (TC-GEO-1234-007) and the "Market" filter labels change. Not applied yet.
- **Story wording to fix (PO / dev, no TC impact):** GEO-1238 Rules "Going back to a previous step with unsaved changes keeps today's message." (obsolete since GEO-1500: no dialog); GEO-1239 Rules "Deleting asks for confirmation (no Undo here)." (app: toast + Undo, F-12).
- **Still asked to the PO:** Q-01, Q-02, Q-10 (metrics part), Q-12 + A8 FR / ES, F-03 + A7.

## Test data

| Item | Value | Used by |
|---|---|---|
| Environment | Staging https://staging-geo.onclusive.com/geo, QA account, interface en-GB | all front-office TCs |
| Back office | https://staging-geo.onclusive.com/geo/backoffice, super admin account, Administration > Organizations | GEO-1230 and every TC that changes a pool |
| Organisation T | Pool test organisation (e.g. QA-GEO) with a prompt pool set; P = pool, U = slots in use, read at execution on the dashboard pool block "U / P" | all pool TCs |
| Pool settings | U + 30 (over-pool on arrival with 40 suggestions), U (exactly at the limit), U - 2 / U - 5 / U - 10 (below usage) — set in the back office and restored after each TC | GEO-1229-005/006, GEO-1230-007, GEO-1233-003, GEO-1236-002 to 005, GEO-1237-009, GEO-1240-002/003 |
| Unbranded feature flag | OFF (4-step wizard). Mandatory for GEO-1234-005 and GEO-1231-001/002 | all wizard TCs |
| Brand | "Decathlon" (any brand detected by discovery works; no brand quota) | wizard TCs |
| Minimal scope (SMALL) | 1 market GB (EN), 1 category C1 = 40 suggestions (30 + 10 Brand Image) | pool-limit and wizard TCs |
| Two-market scope (TWO) | GB (EN) + FR (FR), categories C1 + C2 = 140 suggestions (2 x (10 + 2 x 30)) | table, Review and inline-add TCs |
| Analysis A | Brand analysis of T created with the new wizard, 2 markets, ≥ 2 categories, ≥ 5 unticked suggestions, ≥ 1 past collection | GEO-1236-004, GEO-1239, GEO-1240-005 |
| Analyses D / M / R / W / V / F | D disposable (delete tests); M with United States EN + ES and France FR (country filter); R daily analysis (downgrade); W, V, F competitor-resolution analyses (GEO-1251) | see each TC precondition |

Counts that depend on the organisation (U, P, ring values) are never hard-coded: expected results use U, P, X and relative changes (+1, -2...). Suggestion counts (40, 60, 140, 200) come from the AC rule "10 per type per category per market + 10 Brand Image per market" and assume no prompt was added or deleted beforehand.

## AC inventory and traceability

### GEO-1229 — Share one prompt pool across all analyses (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | One pool, no structural cap | GEO-1229-001 |
| AC-2 | One slot per market, unticked costs nothing | GEO-1229-002, GEO-1229-003 |
| AC-3 | Deleting an analysis frees its slots | GEO-1229-004 |
| AC-4 | Downgrade never touches what exists | GEO-1229-005, GEO-1229-006 (also GEO-1239 AC-9) |
| AC-5 | Filter by country, languages roll up | GEO-1229-007 |

### GEO-1230 — Set the prompt pool of an organisation in the back office (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | One field replaces the old quotas | GEO-1230-001, GEO-1230-002, GEO-1230-003 |
| AC-2 | Whole number ≥ 1, with usage hint | GEO-1230-004, GEO-1230-005, GEO-1230-006 |
| AC-3 | Lowering below usage warns, never blocks | GEO-1230-007 |
| AC-4 | Prompts column in the organisations list | GEO-1230-006, GEO-1230-008, GEO-1230-009, GEO-1230-010 |

### GEO-1231 — Set the brand and the markets (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Questions | GEO-1231-003 |
| AC-2 | Add a country: country first, then language | GEO-1231-004 |
| AC-3 | Change a market's language, no limit | GEO-1231-005, GEO-1231-006, GEO-1231-007 |
| AC-4 | Language for AI Insights | GEO-1231-008 |
| AC-5 | Empty brand | GEO-1231-009 |
| AC-6 | Discovery loading screen | GEO-1231-010 |
| AC-7 | Wizard shell (applies to every step) | GEO-1231-001, GEO-1231-002, GEO-1231-011 |

> AC-7 is written for the unbranded flag OFF (4 steps). With the flag ON (GEO-1209, GEO-1241) Analysis Type comes first and the stepper has 5 steps: run GEO-1231-001 / 002 with the flag OFF, and check the flag-ON shell with the GEO-1209 TCs.

### GEO-1232 — Review the detected categories (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Detected categories with badge and translations; empty state | GEO-1232-001, GEO-1232-002 |
| AC-2 | Add category modal with editable translations | GEO-1232-003, GEO-1232-004 |
| AC-3 | Removing a category with prompts states the impact | GEO-1232-005, GEO-1232-006, GEO-1232-008 |
| AC-4 | No limit | GEO-1232-007 |

### GEO-1233 — Review the suggested prompts (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | 10 per type per category per market, all ticked | GEO-1233-001 |
| AC-2 | Competitors resolved in the background | — delivered by GEO-1251, no TC here; covered by GEO-1251-001 |
| AC-3 | 10 Brand Image prompts per market | GEO-1233-002 |
| AC-4 | Over-pool state on arrival | GEO-1233-003 |
| AC-5 | Re-ticking a muted row | GEO-1233-004 |
| AC-6 | Trash deletes, untick mutes | GEO-1233-005, GEO-1233-006 |
| AC-7 | Coming back from Categories keeps my work | GEO-1233-007 (also GEO-1238-007) |

### GEO-1234 — Add a prompt inline (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Editable row at the top | GEO-1234-001, GEO-1234-002, GEO-1234-008 |
| AC-2 | Selects limited to the analysis | GEO-1234-003, GEO-1234-004 |
| AC-3 | No inference, confirm gated (flag OFF) | GEO-1234-005 |
| AC-4 | Added row: kept, highlighted, CUSTOM | GEO-1234-006, GEO-1234-007 |

> AC-3 is overridden by GEO-1247 AC3 (GEO-1209) when the unbranded flag is ON (confirm no longer disabled when category or type is empty). GEO-1234-005 carries the precondition "unbranded feature flag OFF".

### GEO-1235 — Sort, filter and edit the prompt table (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Columns | GEO-1235-001 |
| AC-2 | Category and type on every row | GEO-1235-002 |
| AC-3 | Header menus | GEO-1235-003, GEO-1235-004 |
| AC-4 | No results | GEO-1235-005 |
| AC-5 | Empty table | GEO-1235-006 |
| AC-6 | Pinned tracker and header | GEO-1235-007 |
| AC-7 | Edit wording only | GEO-1235-008, GEO-1235-009 |
| AC-8 | Show prompts | GEO-1235-010 |

### GEO-1236 — Track the pool while selecting prompts (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Ring and popover | GEO-1236-001 |
| AC-2 | Exactly at the limit | GEO-1236-002 |
| AC-3 | Over the limit (updated 2026-10-09) | GEO-1236-003, GEO-1236-004 |
| AC-4 | The system never removes a prompt | GEO-1236-005 |

> GEO-1236-004 also covers GEO-1239 AC-2 "if the pool has room" and AC-9 (Manage Scope no-room case).

### GEO-1237 — Review and create the analysis (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Scope and engines | GEO-1237-001 |
| AC-2 | Dropped scope and missing metrics | GEO-1237-002, GEO-1237-003, GEO-1237-004, GEO-1237-005 |
| AC-3 | Engines allowed for the organisation | GEO-1237-006, GEO-1237-007 |
| AC-4 | Engines are free | GEO-1237-008 |
| AC-5 | Over the pool | GEO-1237-009 |
| AC-6 | Confirmation | GEO-1237-010, GEO-1237-011 |
| TAC1–TAC5 | Technical ACs (dev context — not for QA) | — excluded (not for QA; technical, payload / database checks) |

> GEO-1237-005 comes from the story rule "an analysis needs at least one category with a ticked prompt" (Rules section), not from TAC5.

### GEO-1238 — Leave the wizard (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Confirmation on Back to Dashboard | GEO-1238-001, GEO-1238-002, GEO-1238-003, GEO-1238-004, GEO-1238-007 |
| AC-2 | Cancel keeps everything | GEO-1238-005, GEO-1238-006 |

### GEO-1239 — Manage prompts after launch (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Same table, filters and tracker | GEO-1239-001 |
| AC-2 | Suggested Prompts (unticked suggestions at the end of the table, no heading) | GEO-1239-002 |
| AC-3 | Edit wording from the next run | GEO-1239-003 |
| AC-4 | Delete frees the slot, keeps the history | GEO-1239-004 |
| AC-5 | Last prompt of a group can be deleted | GEO-1239-005 |
| AC-6 | Version history | GEO-1239-006 |
| AC-7 | Category or type change | GEO-1239-007, GEO-1239-008 |
| AC-8 | Add a category or a market | GEO-1239-009, GEO-1239-010, GEO-1239-014 |
| AC-9 | No free slot in the pool (Updated 2026-10-20) | GEO-1239-011, GEO-1239-012, GEO-1239-013 (also GEO-1236-004, GEO-1229-006) |

### GEO-1240 — See the prompt pool on the GEO dashboard (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Pool block | GEO-1240-001 |
| AC-2 | Exactly at the limit | GEO-1240-002 |
| AC-3 | Over the limit | GEO-1240-003 |
| AC-4 | Prompts column | GEO-1240-004 |
| AC-5 | Counts follow changes | GEO-1240-005 |

### GEO-1251 — Resolve competitors when no Visibility prompt is kept (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Competitors resolved in the background (= GEO-1233 AC-2) | GEO-1251-001 |
| AC-2 | Competitive prompts run even without Visibility | GEO-1251-002 |
| AC-3 | Visibility still wins when it exists | GEO-1251-003 |
| AC-4 | A failed resolution never fails the analysis | GEO-1251-004 |
| AC-5 | An analysis with only Competitive prompts completes | GEO-1251-005 |

## Cross-epic flags (as requested)

- **GEO-1233 AC-2** is delivered by GEO-1251: no TC under GEO-1233; covered by TC-GEO-1251-001 (its Description cites GEO-1233 AC-2).
- **GEO-1237 TAC1–TAC5** are "not for QA" technical ACs: excluded. GEO-1237-005 is based on the functional rule of the Rules section, not on TAC5.
- **GEO-1234 AC-3** is overridden by **GEO-1247 AC3** (GEO-1209) when the unbranded feature flag is ON. TC-GEO-1234-005 has the precondition "Unbranded feature flag OFF (mandatory for this TC)". Do not run it with the flag ON; the flag-ON behaviour belongs to the GEO-1247 TCs.
- **GEO-1231 AC-7** (wizard shell) must stay valid when GEO-1209 adds the Analysis Type step. TC-GEO-1231-001 / 002 are written for the flag OFF (4 steps: Brand & Country, Categories, Prompts, Summary — step renamed by GEO-1507, Passed QA 2026-10-22). With the flag ON the first step is Analysis Type and the stepper has 5 steps (GEO-1241 AC1b / Test plan scenario 10 in both states).
- **GEO-1236 AC-3** (updated 2026-10-09): over the pool, Add prompt and ticking stay possible in the wizard (Figma 4.5 superseded); only Review & Launch is blocked. Manage Scope keeps the room check (TC-GEO-1236-004); since 2026-10-20 (GEO-1239 AC-9, PO decision GEO-1002 comment 865136) a pool with no free slot disables Add prompt, Add country and Add category up front (TC-GEO-1239-011 to 013).

## TCs linked to known bugs (expected results not softened)

| Bug | Subject | Status (2026-10-22) | TC(s) |
|---|---|---|---|
| GEO-1274 | Back office Create organisation: the required Prompt pool field has no asterisk | Passed QA (QA comment 865456, 2026-10-20) | TC-GEO-1230-001, TC-GEO-1230-003, TC-GEO-1230-005; not-configured case: TC-GEO-1230-006 (dev rule 864704, Q-11) |
| GEO-1272 | Back office Organisations: sorting by Prompts mixes the organisations with no pool between the others | Ready for QA again 2026-10-21 (partially fixed on 2026-10-20: sort applied to the current page only, QA comment 865458): re-run both cases | TC-GEO-1230-009 |
| GEO-1271 | Wizard Review: the missing Brand Image warning does not name the metrics that stay empty | Passed QA (QA comment 865457, 2026-10-20) | TC-GEO-1237-004 |
| GEO-1249 | Competitive prompts end with "or ?" when fewer than 3 competitors are found | Ready for QA (moved to 1.3, PO comment 864621): re-run | TC-GEO-1251-002 |
| GEO-1500 | "Exit and Discard" on a stepper back-click keeps every choice (F-01) | Passed QA 2026-10-22 (QA comment 866499); dialog removed from the stepper path (dev 865946) | TC-GEO-1238-007 (added), TC-GEO-1238-004 (re-run) |
| GEO-1501 | Remove-category dialog counts prompts of a removed market (F-02) | Passed QA 2026-10-22 (QA comment 866512) | TC-GEO-1232-008 (added) |
| GEO-1502 | Share of Voice omits competitors named in Competitive-only prompts (F-04) | Abandoned 2026-10-21: works as designed (dev comment 865950) | TC-GEO-1251-002 (expected result aligned) |
| GEO-1503 | Cancel in Add Country shows "Discard Category" (F-05) | Passed QA 2026-10-22 (QA comment 866513) | TC-GEO-1239-014 (added) |
| GEO-1504 | Empty Categories step says "We could not detect categories" after manual removal (F-06) | Passed QA 2026-10-22 (QA comment 866514) | TC-GEO-1232-002 (expected result aligned) |
| GEO-1505 | Brand identity hint links "Settings" instead of "Manage Scope" (F-07) | Passed QA 2026-10-22 (QA comment 866544) | none (outside the GEO-1002 ACs) |
| GEO-1506 | Intercom chat button covers the wizard "Continue" button (F-11) | Passed QA 2026-10-22 (QA comment 866550) | TC-GEO-1231-011 (added) |
| GEO-1507 | Wizard copy fixes from UAT (market language, categories info box, unticked prompts, step "Summary") | Passed QA 2026-10-22 (QA comment 866560); the dev's 6 copy questions to the PO (866136) are open | Step rename applied in every TC (Summary); "Review & Launch" unchanged |
| GEO-1510 | Row height changes on hover in the prompt table (UAT) | Passed QA 2026-10-22 | none |
| GEO-1511 | "Add prompt" bar touches the top edge once sticky (UAT; F-10 reported on it, comment 866045) | Ready for QA (fixed in PR #839, dev comment 866530): re-run | TC-GEO-1235-007 |
| GEO-1512 | GEO dashboard KPI cards react like buttons but do nothing (UAT) | Passed QA 2026-10-22 | none |

A failure on these steps is linked to the bug (reopen it if the fix does not hold), not re-raised.

## TCs that need special setup

- **Back-office pool change (super admin, restore afterwards):** TC-GEO-1229-005, TC-GEO-1229-006, TC-GEO-1230-007, TC-GEO-1233-003, TC-GEO-1236-002, TC-GEO-1236-003, TC-GEO-1236-004, TC-GEO-1236-005, TC-GEO-1237-009, TC-GEO-1239-011, TC-GEO-1239-012, TC-GEO-1240-002, TC-GEO-1240-003.
- **Specific organisations in the back office:** TC-GEO-1230-006 (an organisation with no pool set yet), TC-GEO-1239-013 (organisation "GEO Stress Test", no pool, holding at least one analysis to identify at execution; after GEO-1515 the "no pool" TCs TC-GEO-1230-006, TC-GEO-1230-009 step 4 and TC-GEO-1239-013 are not applicable when no organisation without a pool exists), TC-GEO-1230-010 (one organisation exactly at its pool and one over it), TC-GEO-1237-006 (allowed AI engines of T read in the back office).
- **Needs a later collection (results only visible after the next run):** TC-GEO-1229-005, TC-GEO-1231-008, TC-GEO-1239-002, TC-GEO-1239-003, TC-GEO-1239-007, TC-GEO-1239-008, TC-GEO-1251-001, TC-GEO-1251-002, TC-GEO-1251-003, TC-GEO-1251-005. Plan them on daily analyses created early in the cycle.
- **Needs prior history:** TC-GEO-1239-006 (prompt edits on two different days).
- **Logs / dev support:** TC-GEO-1251-003 last step (no background call — collection logs only), TC-GEO-1251-004 (forced failure of the background competitor call). GEO-1251 is backend only: AC-1 to AC-5 are verified through their visible output.
- **Tedious data:** TC-GEO-1235-006 (delete all 40 prompts of the minimal scope one by one to reach the empty table).

## Ambiguous ACs (flagged, not guessed)

- **A1 [GEO-1229 AC-2, TC-GEO-1229-002]:** "a kept prompt runs in two markets" — the table holds one row per prompt per market, so the TC treats the same wording in two markets as two rows (rule "one ticked prompt in one market = one slot"). Confirm that is the meaning. **Answered 2026-10-22 (sync, epic text):** "A prompt costs one slot per market." (GEO-1002 description). TC unchanged.
- **A2 [GEO-1229 AC-5, TC-GEO-1229-007]:** "When I filter it" does not name the filter. The Rules name the dashboard market filter; the TC uses the analysis market (country) filter on the Overview. The label of the merged country entry is not specified.
- **A3 [GEO-1229 AC-4, TC-GEO-1229-005/006]:** "running analyses are untouched" is only observable at the next collection; "only adding prompts is blocked" — the TC asserts that ticking a suggestion is also blocked in Manage Scope (GEO-1236 AC-3). Confirm ticking counts as adding. **Answered 2026-10-20 (PO, GEO-1002 comment 865136, Quentin Reant):** in Manage Scope with no free slot "suggestions cannot be ticked, until a slot is freed": ticking is blocked like adding. TC-GEO-1229-006 updated.
- **A4 [GEO-1230 AC-1, GEO-1274]:** the AC does not mention the asterisk; the Rules make the field required. TC-GEO-1230-001/003 expect the required marker used by the other required fields. **Answered 2026-10-19 (dev, GEO-1274, Youssef Ait Laydi):** "The label reads « Prompt pool * » wherever the field is required"; empty field: "Prompt pool is required.". TC-GEO-1230-001/003/005 updated. The not-configured organisation case (no asterisk, field optional) waits for PO confirmation (Q-11), TC-GEO-1230-006 unchanged.
- **A5 [GEO-1230 AC-4, GEO-1272]:** where the organisations with no pool ("—") go when sorting by Prompts is not specified; TC-GEO-1230-009 only asserts they are grouped, not interleaved. **Partial 2026-10-19:** GEO-1272 deployed on staging (Youssef Ait Laydi, "Deployed on staging"), no rule on which end the "—" rows go; TC unchanged, re-run. **Decided 2026-10-22 (QA, user):** every "—" row is grouped at the end, in both directions and across pages (behaviour observed in QA comment 865458). TC-GEO-1230-009 updated; GEO-1272 Ready for QA again 2026-10-21: re-run. Not applicable after GEO-1515 when no organisation without a pool exists.
- **A6 [GEO-1231 AC-2]:** the AC says "primary language", while the Rules removed the primary-language concept ("no Primary tag", default language prefilled and listed first). The TC uses the default language and checks no "Primary" tag. **Answered (PO, GEO-1231 comment 860312, Quentin Reant, 2026-10-09, found 2026-10-22):** "We removed the concept of primary language in the setup (replace by Ai inisght field)". TC unchanged; AC2 wording to be fixed in the story.
- **A7 [GEO-1231 AC-4, TC-GEO-1231-008]:** which surfaces are "insights and summaries" is not listed; the TC checks InBrief and AI summaries. **Still open 2026-10-22:** goes to the PO with F-03 (category names translated by the AI Insights language).
- **A8 [GEO-1231 AC-6, GEO-1232 AC-1, GEO-1236 AC-2/AC-3, GEO-1237 AC-2/AC-5/AC-6, GEO-1239 AC-5, GEO-1240 AC-2/AC-3]:** the exact UI text is not quoted in the ACs (loading text "about 20 seconds", empty state copy, amber "short message", over-limit message, dropped warning, red banner, confirmation sentences, last-prompt warning). Expected results describe the content; check the exact wording against the strings sheet (link in EPIC.md). **Partial 2026-10-22:** dev "Copy rule: English in the 4 locales until the PM strings sheet arrives" (GEO-1237 comment 862188); EN copy since changed by the PO through GEO-1507 (Passed QA) and GEO-1514 (To Do). QA decision: the shipped en-GB text is the reference. FR / ES sheet (GEO-1002 comment 862834, 2026-10-14) still waits for the PO, asked with Q-12.
- **A9 [GEO-1232 AC-1, TC-GEO-1232-002]:** "with none" — the TC reaches the empty state by removing every category (Rules: the last category can be removed). Reaching it through a discovery that returns nothing needs a brand with no category, not available on demand.
- **A10 [GEO-1233 AC-5 vs GEO-1236 AC-3]:** AC-5 says re-ticking works "when the pool has room", but GEO-1236 AC-3 (updated 2026-10-09) lets the user tick over the pool in the wizard. TC-GEO-1233-004 runs with room only. The condition looks outdated for the wizard (still true in Manage Scope). **Answered (PO, GEO-1236 comment 860379, Quentin Reant, 2026-10-09, found 2026-10-22):** "over the pool, only Review & Launch is blocked in the wizard. Adding a prompt and ticking an unticked prompt stay possible". The "room" condition of GEO-1233 AC-5 applies to Manage Scope only; TC-GEO-1233-004 unchanged.
- **A11 [GEO-1233 AC-1 / AC-3]:** "10 prompts per question type" — the TCs assume 3 types per category (Visibility, Competitive, Reputation), consistent with "3 x 30" in AC-3.
- **A12 [GEO-1235 AC-4]:** "launch stays enabled" is read as "enabled while the selection fits the pool".
- **A13 [GEO-1237 AC-5, TC-GEO-1237-009]:** Review & Launch is blocked over the pool on the Prompts step, so Review can only load over the pool if the pool changes while the user is on Review (pool lowered in the back office, another analysis created meanwhile). The TC lowers the pool from the back office and reopens Review from the stepper. Confirm the intended path. **Answered 2026-10-19 (PO, GEO-1002 comment 864533, Quentin Reant):** "1. accepted" on the dev point that the wizard ring keeps the old pool until the user changes step (GEO-1002 comment 863243): the stepper reload is the intended path. TC-GEO-1237-009 description updated.
- **A14 [GEO-1237 AC-3, TC-GEO-1237-007]:** "with at least one on" — not specified whether the last toggle cannot be turned off or Create Analysis is disabled with none on; the TC accepts both. **Answered 2026-10-20 (QA, by design, Q-03):** turning off the last engine turns every engine back on; TC-GEO-1237-007 updated.
- **A15 [GEO-1238 AC-1]:** "Given any step" vs Rules "as soon as something was entered": with nothing entered the user leaves directly (TC-GEO-1238-003).
- **A16 [GEO-1236-004 / GEO-1239 AC-2]:** how Manage Scope refuses a tick or an add with no room (tick refused, or Save disabled) is not specified; the TC accepts both. **Answered 2026-10-20 (PO, GEO-1002 comment 865136, Quentin Reant):** "let`s go with (b). When the pool has no free slot (exactly full or over), Add prompt, Add country and Add category are all disabled up front and suggestions cannot be ticked". TC-GEO-1236-004 no longer accepts "Save disabled"; GEO-1239 AC-9 added with TC-GEO-1239-011 to 013.
- **A17 [GEO-1251 AC-5]:** "no Visibility, Sentiment or Brand Image prompt" — the wizard has no Sentiment type (Visibility, Competitive, Reputation, Brand Image); read as Reputation. **Decided 2026-10-22 (QA, user):** read as Reputation (the app names Sentiment as a Reputation metric: "No Reputation prompt is left: Sentiment, Top Concepts and the AI Perception Summary stop updating."). Doc fix only.
- **A18 [GEO-1251 AC-1 / AC-3]:** "invisible to the user" and "no background call is made" are only checkable in the logs.

## Technical content filtered

- **ACs filtered as technical:** GEO-1237 TAC1–TAC5 (dev context — not for QA: dropped computation payload, step-3 blocking, engine defaults, confirmation numbers, only Brand Image kept).
- **AC moved:** GEO-1233 AC-2 (delivered by GEO-1251, tested there).
- **Technical Details not turned into TCs:** step order built as data (GEO-1231), GEO-1249 shipping first and the natural phrasing with fewer competitors (GEO-1251, belongs to GEO-1249), competitors kept from one daily run to the next (GEO-1251), unbranded guards added by epic 46 (GEO-1251), known GEO-581 limitation on a Competitive prompt changed during a running collection (GEO-1239).
- **Story rules used only as supporting TCs (each still tied to an AC):** required Prompt pool (GEO-1230-003), no-pool organisation (GEO-1230-006), duplicate category (GEO-1232-004), confirmation without prompts (GEO-1232-006), single new row and cancel (GEO-1234-002), filtered-market prefill (GEO-1234-004), duplicate prompt (GEO-1234-007), 300-character limit (GEO-1234-008), Type / Market sort order (GEO-1235-004), row selects rules (GEO-1235-009), all categories dropped (GEO-1237-005), last engine (GEO-1237-007), no unticked-suggestions line (GEO-1237-011), direct exit with nothing entered (GEO-1238-003), sub-brands excluded from competitors (step of GEO-1251-001).
- **Rules not turned into TCs (no AC implies them; candidates for a later pass):** grey ring "— / —" for an organisation without a pool (wizard, Manage Scope, dashboard), launch waiting while the pool loads, discovery failure / "Add categories manually", browser confirmation on reload or tab close, Back to Dashboard disabled during discovery and creation, no pool block on an empty dashboard, pool block hidden when the pool cannot be loaded, every analysis listed beyond 100, footnote "Unticked prompts cost nothing and stay on the analysis.", single-market category name used as is, translation failure notice.

## Test cases

### GEO-1229 — Share one prompt pool across all analyses (Story, Ready for QA)

#### TC-GEO-1229-001 - Keeping prompts across brands, categories and markets only decreases the shared pool

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that prompts kept in any analysis draw on the single organisation pool and that no per-brand, per-category, per-country or per-language cap blocks the user, even beyond the old per-type, Countries and Categories max quotas. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". The pool has at least 200 free slots (P - U >= 200). Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the GEO dashboard of organisation T |  | The pool block reads "U / P" |
| 2 | When the user starts a new analysis for a brand that no analysis of the organisation uses yet | Brand: a brand not used yet in T (e.g. "Decathlon") | Brand & Country accepts the brand with no brand quota message |
| 3 | And the user adds 4 markets including one country in two languages | United Kingdom - English (EN), France - French (FR), United States - English (EN), United States - Spanish (ES) | The 4 market rows are added with no country, language or market limit message |
| 4 | And the user keeps every detected category and adds categories until there are at least 6 | Extra categories: "Running shoes", "Cycling", "Camping" | Every category is added with no category limit message |
| 5 | And the user opens the Prompts step |  | The toolbar ring reads "U + S / P", S being the number of ticked prompts of this analysis |
| 6 | Then no per-brand, per-category, per-country or per-language cap blocks the selection |  | The only limit shown is the pool ring; Review & Launch is enabled while U + S <= P |

#### TC-GEO-1229-002 - The same prompt kept in two markets consumes two slots

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a kept prompt that runs in two markets consumes two pool slots (one ticked prompt in one market = one slot). Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step with room left in the pool.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step of an analysis with markets GB (EN) and FR (FR) |  | The toolbar ring reads "X / P" (X = U + ticked prompts of this analysis) |
| 2 | When the user adds a custom prompt in market GB (EN) | Prompt: "Which brand sells the best trail running shoes?" - Category C1 - Type Visibility - Market GB (EN) | The row is added ticked and the ring reads "X + 1 / P" |
| 3 | And the user adds the same prompt in market FR (FR) | Same text, Category C1, Type Visibility, Market FR (FR) | The row is accepted (same text in another market is not a duplicate) and the ring reads "X + 2 / P" |
| 4 | Then the prompt kept in two markets consumes two slots |  | "N selected" and the ring both increased by 2 for the two rows |

#### TC-GEO-1229-003 - An unticked prompt consumes no slot

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that unticking a prompt frees its slot and ticking it back consumes it again: an unticked prompt consumes none. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). The user is on the Prompts step with room left in the pool.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with every suggestion ticked |  | The ring reads "U + 40 / P" and "40 selected" is shown |
| 2 | When the user unticks 3 prompts | Any 3 rows | The 3 rows are greyed and the ring reads "U + 37 / P" |
| 3 | Then the unticked prompts consume no slot |  | "37 selected" is shown and the popover "this analysis" part reads 37 |
| 4 | When the user ticks one of them again |  | The ring reads "U + 38 / P" |

#### TC-GEO-1229-004 - Deleting an analysis returns its slots to the pool immediately

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that deleting an analysis returns its slots to the pool immediately, on the dashboard pool block and in the wizard ring. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Organisation T holds a disposable analysis D whose "Prompts" column reads S slots (S > 0).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the GEO dashboard of organisation T | Analysis D, Prompts column = S | The pool block reads "U / P" and the Prompts column of D reads S |
| 2 | When the user deletes analysis D and confirms |  | Analysis D disappears from the Analysis table |
| 3 | Then its slots return to the pool immediately |  | Without reloading the page, the pool block reads "U - S / P" |
| 4 | When the user clicks New Analysis and reaches the Prompts step | Any brand, 1 market, 1 category | The ring popover shows other analyses = U - S |

#### TC-GEO-1229-005 - A pool lowered below usage leaves existing prompts and running analyses untouched

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that when the pool is reduced below usage (downgrade or non-renewal), existing prompts and running analyses are untouched. Covers AC-4. Needs setup: back-office admin access to lower the pool of organisation T, and a later collection.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Organisation T has a daily analysis R running with its Prompts column = S. Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. The pool of T is lowered in the back office to U - 10 (below usage) before the test. The pool is restored at the end of the test.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the pool of organisation T was lowered below usage in the back office | Pool: U - 10 | The back office saves the new pool with the below-usage warning |
| 2 | When the user opens the GEO dashboard of organisation T |  | Every analysis is still listed with the same Prompts column values; the pool block reads "U / U - 10" in red |
| 3 | And the user opens Manage Scope > Prompts of analysis R |  | Every kept prompt is still listed and ticked; none was removed or unticked |
| 4 | Then analysis R keeps collecting | Next daily collection after the change | The next run of R is collected with the same prompts and its results are updated |

#### TC-GEO-1229-006 - Over a lowered pool only adding prompts is blocked until the count fits

- **ACs:** AC-4, GEO-1239 AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that after a downgrade below usage only adding prompts is blocked, while unticking, deleting and editing stay possible, and that adding works again once the count fits. Covers AC-4 and GEO-1239 AC-9. Updated 2026-10-20 (PO decision, GEO-1002 comment 865136): with no free slot, Add prompt, Add country and Add category are disabled up front and suggestions cannot be ticked. Needs setup: back-office admin access to lower the pool of organisation T.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Organisation T has an analysis R. Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. The pool of T is lowered in the back office to U - 2 (2 slots over). The pool is restored at the end of the test.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the pool of organisation T is 2 slots below usage | Pool: U - 2 | The Manage Scope ring of analysis R reads "U / U - 2" in red |
| 2 | When the user tries to tick a suggested prompt or add a prompt in Manage Scope > Prompts of analysis R |  | Add prompt, Add country and Add category are disabled and suggested prompts cannot be ticked |
| 3 | And the user edits the wording of a kept prompt and saves | New wording: existing wording + " in 2026" | The edit is saved |
| 4 | And the user unticks 3 kept prompts and saves |  | The unticks are saved and the ring reads "U - 3 / U - 2" |
| 5 | Then adding prompts is possible again once the count fits |  | Add prompt, Add country and Add category are enabled again; ticking one suggested prompt is accepted and the ring reads "U - 2 / U - 2" |

#### TC-GEO-1229-007 - The dashboard market filter lists a country once and rolls up its languages

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in an analysis with several country and language pairs, the market filter lists one entry per country and selecting it rolls up all its languages together. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". A collected brand analysis M has the markets United States - English (EN), United States - Spanish (ES) and France - French (FR).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of analysis M | Analysis M | The Overview is displayed |
| 2 | When the user opens the market (country) filter |  | The filter lists "United States" once and "France" once (no separate entry per language) |
| 3 | And the user selects "United States" only |  | The filter shows United States selected |
| 4 | Then the results roll up both languages of the country |  | The prompts and results shown include the English and the Spanish prompts of United States, and none of France |

### GEO-1230 — Set the prompt pool of an organisation in the back office (Story, Ready for QA)

#### TC-GEO-1230-001 - Create organisation shows one required Prompt pool field in place of the old quotas

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Create organisation form shows one "Prompt pool" field, marked as required, replacing the four per-type fields and the "Countries" and "Categories max" fields, while the user quota, collection frequency (Daily or One time) and allowed AI engines stay as today. Covers AC-1. Bug GEO-1274 (no asterisk) fixed on staging 2026-10-19, Ready for QA: re-run.
- **Precondition:** Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the super admin is on Administration > Organizations |  | The organisations list is displayed |
| 2 | When the super admin opens the Create organisation form |  | The form opens with its quotas section |
| 3 | Then the quotas show one "Prompt pool" field marked as required |  | The label reads "Prompt pool *", with the required marker used by the other required fields (such as "Name *") |
| 4 | And the four per-type fields and the "Countries" and "Categories max" fields are not shown |  | No per-type prompt field, no "Countries" field and no "Categories max" field |
| 5 | And the user quota, collection frequency and allowed AI engines stay as today |  | User quota, collection frequency with "Daily" and "One time", and the allowed AI engines are displayed |

#### TC-GEO-1230-002 - Edit organisation shows the Prompt pool field with its saved value

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that editing an existing organisation shows the "Prompt pool" field with its saved value instead of the old per-type, "Countries" and "Categories max" fields. Covers AC-1.
- **Precondition:** Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Organisation T has a saved pool P.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the super admin is on Administration > Organizations |  | The organisations list is displayed |
| 2 | When the super admin opens the edit form of organisation T | Organisation T | The edit form opens |
| 3 | Then the "Prompt pool" field shows the saved value |  | "Prompt pool" = P |
| 4 | And the old quota fields are not shown |  | No per-type prompt field, no "Countries" and no "Categories max" field; User quota, collection frequency and allowed AI engines keep their values |

#### TC-GEO-1230-003 - An organisation cannot be created without a Prompt pool

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that the Prompt pool is required when creating an organisation: saving with an empty Prompt pool is refused. Covers AC-1 (required rule). Bug GEO-1274 (no asterisk, no required message) fixed on staging 2026-10-19, Ready for QA: re-run. Strings from GEO-1274 (dev, 2026-10-19).
- **Precondition:** Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the super admin is on the Create organisation form |  | The form is displayed with an empty "Prompt pool" field |
| 2 | When the super admin fills every other required field and leaves Prompt pool empty | Name: "QA pool required 1019"; User quota: 5; Frequency: Daily; one AI engine | The form is filled except Prompt pool |
| 3 | And the super admin saves |  | Create stays disabled and the organisation is not created |
| 4 | Then the Prompt pool field is flagged as required |  | The "Prompt pool" field shows "Prompt pool is required." and its label reads "Prompt pool *" |

#### TC-GEO-1230-004 - Prompt pool accepts a whole number of at least 1 with a usage hint

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Prompt pool field accepts a whole number of at least 1 and shows the usage hint, such as "138 of 150 prompts in use.". Covers AC-2.
- **Precondition:** Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Organisation T has U prompts in use and a saved pool.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the super admin is on the edit form of organisation T | Organisation T | The "Prompt pool" field shows its value with a usage hint |
| 2 | When the super admin enters a new whole number | Prompt pool: U + 50 | The value is accepted in the field |
| 3 | Then the usage hint states the prompts in use over the entered pool |  | "U of U + 50 prompts in use." (same pattern as "138 of 150 prompts in use.") |
| 4 | When the super admin saves and reopens organisation T |  | The saved pool is U + 50 and the hint is still shown |
| 5 | And the super admin sets the pool to 1, the lowest accepted value, and saves | Prompt pool: 1 (restore the previous value afterwards) | The value 1 is accepted (with the below-usage warning when U > 1) |

#### TC-GEO-1230-005 - Prompt pool refuses zero, negative, decimal and non-numeric values

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that the Prompt pool field accepts only a whole number of at least 1. Covers AC-2. Error text from GEO-1274 (dev, 2026-10-19).
- **Precondition:** Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Organisation T has a saved pool P.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the super admin is on the edit form of organisation T |  | "Prompt pool" = P |
| 2 | When the super admin enters 0 and saves | Prompt pool: 0 | The value is refused with "Enter a whole number of at least 1." and the pool stays P |
| 3 | And the super admin enters a negative value and saves | Prompt pool: -5 | The value is refused with "Enter a whole number of at least 1." and the pool stays P |
| 4 | And the super admin enters a decimal value and saves | Prompt pool: 12.5 | The value is refused with "Enter a whole number of at least 1." and the pool stays P |
| 5 | And the super admin enters a non-numeric value | Prompt pool: "abc" | "abc" cannot be entered in the field (or is refused with "Enter a whole number of at least 1.") |

#### TC-GEO-1230-006 - An organisation without a pool shows an empty field, no hint and "—" in the list

- **ACs:** AC-2, AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that an organisation whose pool is not set yet shows an empty Prompt pool field with no usage hint and "—" in the Prompts column, and that a saved value cannot be cleared back to empty. Covers AC-2 and AC-4 (no-pool rule). Needs setup: an organisation with no pool set (existing organisation not yet filled by an operator). [Sync 2026-10-22: Q-11 answered by the dev: "No asterisk in view mode or for a not-configured organisation, where the field stays optional" (GEO-1274 comment 864704). After GEO-1515 (pool set from the old quota at the 1.3 deploy) no organisation is left without a pool: the steps on organisation N are not applicable when no such organisation exists.]
- **Precondition:** Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Organisation N has no prompt pool set yet. After GEO-1515 (V2.10.7, "None is left not configured", GEO-1515 comment 866014), check Administration > Organizations for a "—" row first; if none exists, the "no pool" steps are not applicable (no dev setup requested).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the super admin is on Administration > Organizations | Organisation N | The row of N shows "—" in the Prompts column |
| 2 | When the super admin opens the edit form of organisation N |  | The "Prompt pool" field is empty, labelled "Prompt pool" without asterisk (optional for a not-configured organisation), and no usage hint is shown |
| 3 | And the super admin enters a pool and saves | Prompt pool: 100 | The pool is saved and the row of N shows "U / 100" |
| 4 | Then the saved pool cannot be cleared back to empty | Clear the field and save | The empty value is refused and the pool stays 100 |

#### TC-GEO-1230-007 - Lowering the pool below usage warns and still saves

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that saving a pool lower than the prompts in use shows a warning that existing prompts and running analyses are untouched and that adding prompts stays blocked until the count fits, without blocking the save. Covers AC-3. Needs setup: organisation T with U > 10 prompts in use; restore the pool afterwards.
- **Precondition:** Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Organisation T has U prompts in use (U > 10) and a pool P >= U.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the super admin is on the edit form of organisation T |  | The hint reads "U of P prompts in use." |
| 2 | When the super admin lowers the pool below usage | Prompt pool: U - 10 | The hint reads "U of U - 10 prompts in use." |
| 3 | And the super admin saves |  | A warning states that existing prompts and running analyses are untouched and that adding prompts stays blocked until the count fits |
| 4 | Then the save is not blocked |  | The pool U - 10 is saved and the list shows "U / U - 10" in red for organisation T |

#### TC-GEO-1230-008 - Organisations list shows a Prompts column next to User quota and keeps Frequency

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the organisations list shows a "Prompts" column next to User quota with prompts in use over the pool (e.g. 138 / 150), and that the Frequency column and filter stay. Covers AC-4.
- **Precondition:** Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Organisation T has U prompts in use and a pool P >= U.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the super admin is logged in to the back office |  | The back office home page is displayed |
| 2 | When the super admin opens Administration > Organizations |  | The organisations list loads |
| 3 | Then a "Prompts" column is shown next to User quota |  | The "Prompts" header sits next to "User quota" |
| 4 | And the row of organisation T shows prompts in use over the pool |  | "U / P" (same pattern as "138 / 150"), not red |
| 5 | And the Frequency column and filter stay |  | The Frequency column ("Daily" / "One time") and its filter are displayed, as well as the US and Created columns |

#### TC-GEO-1230-009 - The Prompts column of the organisations list is sortable

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the "Prompts" column of the organisations list can be sorted, organisations being ordered by their prompts in use, with the organisations without a pool ("—") not interleaved between the others. Covers AC-4. Bug GEO-1272 (organisations with no pool mixed between the others): partially fixed on 2026-10-20 (sort applied to the current page only, QA comment 865458), back to Ready for QA on 2026-10-21: re-run the 1-page and the 2-page (Status = all statuses) cases. [Sync 2026-10-22: A5 decided by QA: the "—" rows go at the end in both directions.]
- **Precondition:** Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. The list holds several organisations with a pool and at least one organisation with no pool ("—"). After GEO-1515 (no organisation left without a pool), the "—" step is not applicable when no such organisation exists.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the super admin is on Administration > Organizations |  | The list shows the "Prompts" column |
| 2 | When the super admin sorts the Prompts column ascending |  | The organisations are ordered by prompts in use, lowest first |
| 3 | And the super admin sorts the Prompts column descending |  | The organisations are ordered by prompts in use, highest first |
| 4 | Then the organisations without a pool are not mixed between the others | Default view (active organisations, one page), then Status = all statuses (2 pages) | Every "—" row is grouped at the end, in both directions and across pages, never between two organisations with a value |

#### TC-GEO-1230-010 - The Prompts value is red only when the prompts in use are above the pool

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** Verify that the Prompts value is red only when over the pool, and that a value exactly at the pool (e.g. 150 / 150) is not red. Covers AC-4. Needs setup: one organisation exactly at its pool and one over it (pool lowered in the back office).
- **Precondition:** Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Organisation E has prompts in use equal to its pool; organisation O has prompts in use above its pool; organisation T is below its pool.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the super admin is on Administration > Organizations | Organisations E, O and T | The three rows are visible |
| 2 | Then the Prompts value of organisation T is not red |  | "U / P" with U < P in the default colour |
| 3 | And the Prompts value of organisation E is not red |  | e.g. "150 / 150" in the default colour |
| 4 | And the Prompts value of organisation O is red |  | e.g. "160 / 150" in red |

### GEO-1231 — Set the brand and the markets (Story, Ready for QA)

#### TC-GEO-1231-001 - New Analysis opens the wizard on Brand & Country with the sidebar stepper (flag OFF)

- **ACs:** AC-7 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** [SKIP while the unbranded flag is ON on staging: run only with the flag OFF (GEO-1241 AC1b)] Verify that New Analysis on the GEO dashboard opens the wizard on its first step, Brand & Country with the unbranded flag OFF, with a sidebar stepper naming each step and carrying Back to Dashboard, a fixed footer with Back and the primary action, and the content above the footer scrolling. Covers AC-7. Written for the flag OFF (4 steps); with the flag ON (GEO-1209) Analysis Type comes first and the stepper has 5 steps.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag OFF (4-step wizard: Brand & Country, Categories, Prompts, Summary); the wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the GEO dashboard |  | The New Analysis button is displayed |
| 2 | When the user clicks New Analysis |  | The wizard opens directly on Brand & Country, with no "New analysis" top bar |
| 3 | Then the sidebar stepper names each step |  | "Brand & Country", "Categories", "Prompts" and "Summary", with Brand & Country as the current step |
| 4 | And the sidebar carries Back to Dashboard |  | "Back to Dashboard" is shown in the sidebar |
| 5 | And the footer keeps Back and the primary action |  | The footer shows "Back" and "Discover Categories" |
| 6 | When the user adds markets until the content is longer than the screen and scrolls | 6 markets | The content above the footer scrolls while the footer and the sidebar stay in place |

#### TC-GEO-1231-002 - The wizard shell stays the same on every step

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** [SKIP while the unbranded flag is ON on staging: run only with the flag OFF (GEO-1241 AC1b)] Verify that on Categories, Prompts and Summary the sidebar stepper marks the current step and carries Back to Dashboard, and the footer keeps Back and the primary action fixed while the content scrolls. Covers AC-7 (applies to every step). Written for the flag OFF (4 steps).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag OFF (4-step wizard: Brand & Country, Categories, Prompts, Summary); the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step |  | The stepper marks Categories as current; Back to Dashboard is in the sidebar; the footer shows Back and the primary action |
| 2 | When the user continues to the Prompts step and scrolls the prompt table |  | The stepper marks Prompts as current; the footer with Back and Review & Launch stays fixed while the content scrolls |
| 3 | And the user continues to the Summary step |  | The stepper marks Summary as current; the footer shows Back and Create Analysis |
| 4 | Then the shell is identical on every step |  | Same sidebar stepper with the 4 step names and Back to Dashboard, same fixed footer |

#### TC-GEO-1231-003 - Brand & Country asks for the brand and the countries

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify that Brand & Country asks "What brand are you analysing?" and "Which countries do you want to analyse?". Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the GEO dashboard |  | The New Analysis button is displayed |
| 2 | When the user clicks New Analysis |  | Brand & Country is displayed |
| 3 | Then the brand question is displayed |  | "What brand are you analysing?" |
| 4 | And the countries question is displayed |  | "Which countries do you want to analyse?" |

#### TC-GEO-1231-004 - Add country composer: country first, language disabled until then and prefilled

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in the Add country composer the user picks a country first, and the language select, disabled until then, is prefilled with the country's primary (default) language listed first and lists its other languages, with no "Primary" tag. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. The user is on Brand & Country with brand "Decathlon" entered.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Brand & Country |  | The markets section shows Add country |
| 2 | When the user clicks Add country |  | The composer opens with a country select and a language select |
| 3 | Then the language select is disabled until a country is picked |  | The language select is greyed and cannot be opened |
| 4 | When the user picks a country with several languages | Country: a multilingual country (e.g. Canada or Switzerland) | The language select becomes enabled and is prefilled with the default language of the country |
| 5 | And the user opens the language select |  | The default language is listed first, the other languages of the country follow, labels read like "English (EN)" and no "Primary" tag is shown |

#### TC-GEO-1231-005 - Changing the language of a market row applies

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that changing the language of a market row applies, the country of the row staying fixed. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. The user is on Brand & Country with brand "Decathlon" and a market row for a multilingual country.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a market row with its default language | Market: Canada - English (EN) (or another multilingual country) | The row shows the country and its language |
| 2 | When the user changes the language of the row | Language: French (FR) | The row now shows the new language |
| 3 | Then the change applies |  | The row shows Canada with the language French (FR); the country cannot be changed in the row (only the language select is editable) |

#### TC-GEO-1231-006 - One country in two languages gives two market rows

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that adding the same country twice with two languages gives two market rows. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. The user is on Brand & Country with brand "Decathlon".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Brand & Country |  | The markets section is displayed |
| 2 | When the user adds United States in English | Country: United States - Language: English (EN) | A market row "United States - English (EN)" is added |
| 3 | And the user adds United States in Spanish | Country: United States - Language: Spanish (ES) | A second market row "United States - Spanish (ES)" is added |
| 4 | Then the country in two languages shows as two market rows |  | Two distinct rows for United States, one per language |

#### TC-GEO-1231-007 - No limit applies to the number of markets

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that no limit applies to the number of markets (the old "Countries" quota is gone). Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. The user is on Brand & Country with brand "Decathlon".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Brand & Country |  | The markets section is displayed |
| 2 | When the user adds 12 markets | UK, France, Germany, Spain, Italy, Netherlands, Belgium (FR), Belgium (NL), United States (EN), United States (ES), Canada (EN), Canada (FR) | Each market row is added |
| 3 | Then no market limit is shown |  | Add country stays available, no quota or limit message, Discover Categories stays enabled |

#### TC-GEO-1231-008 - Language for AI Insights applies only to this analysis's insights and summaries

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Language for AI Insights below the markets applies to this analysis's insights and summaries only, the prompts staying in their market languages. Covers AC-4. Needs setup: wait for the first collection of the created analysis.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Interface language en-GB. InBrief = the block headed by the logo "InBrief powered by AI Sense" (rendered as an image, not as text), with a bullet list and a "… generated by artificial intelligence" footer.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Brand & Country | Brand "Decathlon"; markets GB (EN) and FR (FR) | The Language for AI Insights field is shown below the markets |
| 2 | When the user sets the Language for AI Insights to a language other than the interface language | Language for AI Insights: French | The field shows French |
| 3 | And the user creates the analysis and waits for its first collection |  | The analysis is collected |
| 4 | Then the AI insights and summaries of the analysis are in French |  | InBrief (logo "InBrief powered by AI Sense") and the AI summaries (Identity summary, Brand Image / reputation insights, topics) are written in French |
| 5 | And the rest stays unchanged |  | The interface stays in en-GB and the UK prompts stay in English; other analyses keep their own insight language |

#### TC-GEO-1231-009 - An empty brand shows a red border and "Add your brand to continue."

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that trying to continue with an empty brand shows a red border on the field and a message naming it, such as "Add your brand to continue.", and that Discover Categories then stays disabled until a brand is set. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Brand & Country with an empty brand and one market | Market: United Kingdom - English (EN) | The brand field is empty |
| 2 | When the user clicks Discover Categories |  | The wizard stays on Brand & Country |
| 3 | Then the brand field shows a red border and a message naming it |  | Red border and "Add your brand to continue." |
| 4 | And Discover Categories stays disabled until a brand is set |  | Discover Categories is disabled |
| 5 | When the user enters a brand | Brand: "Decathlon" | The error clears and Discover Categories is enabled |

#### TC-GEO-1231-010 - Continuing from a valid Brand & Country shows the discovery loading screen

- **ACs:** AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify that continuing from a valid Brand & Country shows a loading screen, with no footer, stating that category discovery takes about 20 seconds. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on a valid Brand & Country | Brand "Decathlon"; market United Kingdom - English (EN) | Discover Categories is enabled |
| 2 | When the user clicks Discover Categories |  | A loading screen is displayed |
| 3 | Then the loading screen states that category discovery takes about 20 seconds |  | The text states about 20 seconds (exact wording from the strings sheet) |
| 4 | And Brand & Country stays the active step with no footer |  | The stepper still marks Brand & Country; no footer is shown; Back to Dashboard is disabled |
| 5 | When discovery ends |  | The Categories step opens |

#### TC-GEO-1231-011 - The footer buttons stay fully visible and clickable next to the Intercom launcher

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** edge
- **Description:** Verify that on steps 1 to 4 the footer buttons (Back and the primary action) are centred and stay fully visible and clickable next to the Intercom chat launcher, at 1920x1080, 1440x900 and 1280x720. Covers AC-7 (the footer keeps Back and the primary action fixed). Regression of bug GEO-1506 (Passed QA 2026-10-22, QA comment 866550; design: Back and Continue centred, GEO-1506 comment 865919). Added 2026-10-22 (sync, F-11).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), detected categories kept. The Intercom chat launcher is shown at the bottom right of the window.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the browser window is 1920x1080 and the user is on the Analysis Type step with the Brand analysis card selected | Window 1920x1080 | The footer shows Back and Continue, centred; the Intercom launcher is at the bottom right |
| 2 | When the user goes through steps 1 to 4 | Analysis Type, Brand & Country, Categories, Prompts | The primary action reads Continue, Discover Categories, Generate Prompts, then Review & Launch |
| 3 | Then on each step the footer buttons never overlap the Intercom launcher |  | The primary action is fully readable, with a clear gap to the launcher (no overlap) |
| 4 | And the primary action is clickable at its centre and at its right edge | Click near the right edge of the primary action | The click is taken by the button, not by the launcher (the next step opens) |
| 5 | When the same checks are done at the other window sizes | Windows 1440x900 and 1280x720 | Same result on steps 1 to 4: no overlap, buttons fully visible and clickable |

### GEO-1232 — Review the detected categories (Story, Ready for QA)

#### TC-GEO-1232-001 - Detected categories show an AI-generated badge and a translation per market language

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each category detected from the brand shows an "AI generated" badge and its translation per market language. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Brand "Decathlon"; markets United Kingdom - English (EN), France - French (FR), Spain - Spanish (ES).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on a valid Brand & Country with 3 markets |  | Discover Categories is enabled |
| 2 | When the user clicks Discover Categories and discovery ends |  | The Categories step lists the detected categories as a flat list |
| 3 | Then each detected category shows an "AI generated" badge |  | Every detected row carries the "AI generated" badge |
| 4 | And each category shows its translation per market language without being opened |  | The row title is the English name, followed by "EN · FR (…) · ES (…)" with the French and Spanish names, a pencil and a cross |

#### TC-GEO-1232-002 - With no category, an empty state invites the user to add one

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that with no category, an empty state invites the user to add one, Generate Prompts is disabled and the stepper does not let the user jump to Prompts or Summary. Covers AC-1. [Sync 2026-10-22: bug GEO-1504 (empty state said "We could not detect categories" after manual removal) Passed QA 2026-10-22, QA comment 866514; empty-state text aligned.]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. The user is on the Categories step with the detected categories of brand "Decathlon".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step |  | The detected categories are listed |
| 2 | When the user removes every category and confirms each removal |  | The list becomes empty |
| 3 | Then an empty state invites the user to add a category |  | The empty state reads "No categories for {brand}" and "Add at least one category for {brand}." with an "Add Category" button; "We could not detect categories" is not shown (GEO-1504, Passed QA 2026-10-22) |
| 4 | And Generate Prompts is disabled |  | Generate Prompts cannot be clicked |
| 5 | And the stepper does not let the user jump to Prompts or Summary |  | Clicking Prompts or Summary in the stepper does nothing |

#### TC-GEO-1232-003 - Add category modal: name and an editable translation per market

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that Add category opens a modal where the user enters a name and reviews an editable translation per market before adding the category. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. The user is on the Categories step of brand "Decathlon" with markets United Kingdom - English (EN) and France - French (FR).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step |  | Add category is displayed |
| 2 | When the user clicks Add category |  | The modal opens with a name input |
| 3 | And the user enters a name and confirms it | Name: "Trail running shoes" | A translation per market is filled: English and French |
| 4 | And the user edits the French translation | French: "Chaussures de trail running" (different from the AI proposal) | The French translation shows the edited text |
| 5 | Then the category is added with its translations | Click Add | "Trail Running Shoes" (name rewritten to Title Case, by design: PO, GEO-1232 comment 869031) is listed with "Chaussures de trail running" as its French translation |

#### TC-GEO-1232-004 - A category name already used in the analysis cannot be added

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that a name already used by another category of the analysis, whatever the letter case, shows an error in the Add category modal and cannot be added. Covers AC-2 (duplicate rule).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. The user is on the Categories step with a category named C1.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step with category C1 |  | C1 is listed |
| 2 | When the user opens Add category and types the name of C1 in another letter case | Name: C1 in upper case | The modal shows an error on the name |
| 3 | Then the category cannot be added |  | The add action is disabled or refused; the list still holds a single C1 |

#### TC-GEO-1232-005 - Removing a category with prompts states how many prompts are deleted with it

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that removing a category that holds prompts asks for a confirmation stating how many prompts across the markets are deleted with it, kept suggestions included. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user has reached the Prompts step once (prompts generated) and unticked 2 prompts of C1.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step | Filter Category = C1 | The table shows N prompts for C1 across GB (EN) and FR (FR), ticked and unticked (N = 60 when no prompt was added or deleted: 30 C1 prompts per market x 2 markets; the Brand Image prompts are listed under "Overview", not C1) |
| 2 | When the user clicks Back to the Categories step |  | The Categories step is displayed |
| 3 | And the user clicks the cross of C1 |  | A confirmation opens |
| 4 | Then the confirmation states the number of prompts deleted with the category |  | The message states N prompts across the markets, the 2 unticked suggestions included |
| 5 | When the user confirms the removal and returns to Prompts |  | C1 is gone and none of its prompts is listed |

#### TC-GEO-1232-006 - Removing a category without prompts still asks for confirmation

- **ACs:** AC-3 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that removing a category that holds no prompt still asks for confirmation, without a prompt count. Covers AC-3 (confirmation rule).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. The user is on the Categories step before any prompt generation.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step before generating prompts |  | The categories are listed |
| 2 | When the user clicks the cross of a category |  | A confirmation opens |
| 3 | Then the confirmation does not state a prompt count |  | No number of deleted prompts is stated |

#### TC-GEO-1232-007 - No limit applies when adding or removing categories

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that no limit applies when adding or removing categories (the old "Categories max" is gone). Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. The user is on the Categories step of brand "Decathlon".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step |  | The detected categories are listed |
| 2 | When the user adds categories until there are 12 | "Cycling", "Camping", "Hiking", "Swimming", "Fitness", "Yoga", ... | Each category is added |
| 3 | Then no category limit applies |  | Add category stays available, no limit message, Generate Prompts stays enabled |
| 4 | When the user removes 10 categories |  | Each removal is accepted after its confirmation, with no minimum message while at least one category remains |

#### TC-GEO-1232-008 - After removing a market, the remove-category confirmation counts only the remaining market

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that after removing a market without generating the prompts again, the remove-category confirmation counts only the prompts of the remaining market. Covers AC-3. Regression of bug GEO-1501 (Passed QA 2026-10-22, QA comment 866512). Once GEO-1514 is delivered, "markets" reads "countries" in the message. Added 2026-10-22 (sync, F-02).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed). The user has reached the Prompts step once (prompts generated), with no prompt added or deleted.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with prompts generated for GB (EN) and FR (FR) | Filter Category = C1 | The C1 prompts of GB (EN) and FR (FR) are listed (60) |
| 2 | When the user goes back to Brand & Country and removes France - French (FR) | Market removed: FR (FR) | Only United Kingdom - English (EN) is left |
| 3 | And the user goes forward to Categories without generating the prompts again and clicks the cross of C1 |  | A confirmation opens |
| 4 | Then the confirmation counts only the prompts of the remaining market |  | "30 prompts across your markets will be deleted with it." (the 30 C1 prompts of GB (EN)), not 60 |
| 5 | When the user cancels the removal | Cancel | The confirmation closes and C1 stays listed |

### GEO-1233 — Review the suggested prompts (Story, Ready for QA)

#### TC-GEO-1233-001 - Each category in each market gets 10 ticked prompts per question type

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each category in each market gets 10 suggested prompts per question type, all ticked, each carrying the category and type that produced it. Covers AC-1. AC-2 of this story is delivered by GEO-1251 (no TC here, see TC-GEO-1251-001).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step with category C1 |  | Generate Prompts is enabled |
| 2 | When the user clicks Generate Prompts and generation ends |  | The Prompts step shows one table with every prompt |
| 3 | Then category C1 gets 10 prompts per question type in market GB (EN) | Filter Category = C1, then Type = Visibility / Competitive / Reputation | 10 Visibility, 10 Competitive and 10 Reputation prompts for C1 in GB (EN) |
| 4 | And every suggestion is ticked |  | "40 selected" (30 for C1 + 10 Brand Image); no greyed row |
| 5 | And each prompt carries the category and type that produced it |  | Each C1 row shows Category C1 and its type badge |

#### TC-GEO-1233-002 - Each market gets 10 Brand Image prompts: 2 markets x 3 categories = 200 prompts

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each market also gets 10 Brand Image prompts, so 2 markets with 3 categories give 2 x (10 + 3 x 30) = 200 prompts. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". The pool has at least 200 free slots. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Brand "Decathlon"; markets GB (EN) and FR (FR); exactly 3 categories C1, C2, C3.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step with exactly 3 categories and 2 markets |  | Generate Prompts is enabled |
| 2 | When the user clicks Generate Prompts and generation ends |  | The Prompts step is displayed |
| 3 | Then each market gets 10 Brand Image prompts | Filter Type = Brand Image, then Market = GB (EN) / FR (FR) | 10 Brand Image prompts per market, with category "Overview" |
| 4 | And the table holds 200 prompts in total |  | "200 selected" and the ring reads "U + 200 / P" |

#### TC-GEO-1233-003 - Suggestions above the free pool open Prompts in the over-pool state

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that when the suggestions exceed the free pool, Prompts opens in the over-pool state with nothing unticked automatically, and that unticking prompts until the count fits clears it. Covers AC-4. Needs setup: the pool of organisation T set in the back office to U + 30 (free pool smaller than the 40 suggestions).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Pool of T set to U + 30 (30 free slots); restore it afterwards. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the free pool is 30 slots and the analysis will generate 40 suggestions | Pool = U + 30 | The user is on the Categories step with C1 |
| 2 | When the user clicks Generate Prompts and generation ends |  | The Prompts step opens |
| 3 | Then the Prompts step is in the over-pool state |  | The ring reads "U + 40 / U + 30" in red, the message states 10 prompts over, Review & Launch is disabled |
| 4 | And no prompt was unticked automatically |  | "40 selected"; no greyed row |
| 5 | When the user unticks 10 prompts |  | The ring reads "U + 30 / U + 30" and Review & Launch is enabled |

#### TC-GEO-1233-004 - Re-ticking a muted row keeps it again without regenerating it

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that a muted (unticked) row ticked again while the pool has room is kept again with the same wording, without being regenerated. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). The pool has room.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step |  | Every prompt is ticked |
| 2 | When the user unticks a prompt and notes its wording | Any Visibility prompt of C1 | The row is greyed (muted) and the ring decreases by 1 |
| 3 | And the user ticks the same row again |  | The row is no longer greyed and the ring increases by 1 |
| 4 | Then the prompt is kept again without being regenerated |  | The row shows exactly the same wording, category, type and market as before |

#### TC-GEO-1233-005 - The trash icon deletes a kept prompt, which is not the same as unticking

- **ACs:** AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the trash icon deletes a kept prompt from the table, whereas unticking only greys the row and keeps it on the analysis. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with 40 prompts |  | "40 selected" |
| 2 | When the user unticks prompt A | Prompt A = any C1 row | Prompt A stays in the table, greyed; "39 selected" |
| 3 | And the user clicks the trash icon of kept prompt B | Prompt B = another C1 row | Prompt B disappears from the table and an Undo toast is shown |
| 4 | Then the trash deletes and the untick mutes | Show prompts = All | The table holds 39 rows: A is still listed greyed, B is gone; "38 selected" |

#### TC-GEO-1233-006 - The trash icon deletes a muted prompt, with Undo for 5 seconds

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the trash icon also deletes a muted prompt, and that the Undo toast shown for 5 seconds restores it. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with a muted prompt A | Untick prompt A first | Prompt A is greyed |
| 2 | When the user clicks the trash icon of prompt A |  | Prompt A disappears and an Undo toast is shown |
| 3 | And the user clicks Undo within 5 seconds |  | Prompt A is back in the table, still unticked |
| 4 | When the user clicks the trash icon of prompt A again and waits more than 5 seconds |  | The toast disappears and prompt A stays deleted |

#### TC-GEO-1233-007 - Coming back from Categories with a new category keeps the work on Prompts

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that going back to Categories, adding a category and returning to Prompts keeps the ticked and unticked states, edits and custom prompts, and gives only the new category its suggestions, 10 per type per market, all ticked. Covers AC-7.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". The pool has at least 200 free slots. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step |  | Prompts of C1, C2 and Brand Image in GB (EN) and FR (FR) are listed |
| 2 | When the user unticks prompt A, edits the wording of prompt B and adds a custom prompt D | B new wording: "Which brand offers the best value hiking boots?"; D: "Is Decathlon good for camping gear?" - C1 - Reputation - GB (EN) | A is greyed, B shows the new wording, D is listed with the CUSTOM badge |
| 3 | And the user goes Back to Categories and adds a category | Category: "Cycling" | "Cycling" is listed |
| 4 | And the user returns to the Prompts step |  | The Prompts step is displayed after generation for the new category |
| 5 | Then the previous work is kept |  | A is still unticked, B keeps its edited wording, D is still listed with CUSTOM; C1, C2 and Brand Image counts are unchanged |
| 6 | And only the new category gets its suggestions | Filter Category = Cycling | 10 Visibility, 10 Competitive and 10 Reputation prompts per market for "Cycling" (60), all ticked |

### GEO-1234 — Add a prompt inline (Story, Ready for QA)

#### TC-GEO-1234-001 - Add prompt opens an editable row at the top of the table

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that Add prompt opens an editable row at the top of the table with a text input, category, type and market selects, and confirm and cancel. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step |  | The prompt table and Add prompt are displayed |
| 2 | When the user clicks Add prompt |  | An editable row opens at the top of the table |
| 3 | Then the row holds a text input and the category, type and market selects |  | Text input, Category select, Type select and Market select are displayed |
| 4 | And the row holds confirm and cancel |  | Confirm and cancel controls are displayed on the row |

#### TC-GEO-1234-002 - Only one new row at a time and cancel leaves the table unchanged

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that only one new row can be open at a time (clicking Add prompt again goes back to it) and that cancel leaves the table unchanged. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has opened a new row and typed a prompt | Prompt: "Which brand makes the lightest tents?" | The new row is at the top with the typed text |
| 2 | When the user clicks Add prompt again |  | No second row opens; the focus goes back to the open row with its text |
| 3 | And the user clicks cancel |  | The new row closes |
| 4 | Then the table is unchanged |  | Same number of rows and same "N selected" and ring value as before Add prompt |

#### TC-GEO-1234-003 - Category and market selects list only the analysis values, market prefilled

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the category select lists only the analysis categories with no Add category action, that the market select lists only the analysis markets prefilled from context (first market when no single-market filter), and that for a Brand Image prompt the category is cleared and disabled showing Overview. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step with no filter.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has opened a new row with Add prompt |  | The new row is at the top; Category and Type show the placeholder "Other" (no value selected; flag ON, GEO-1247 AC3); the Type select lists Visibility, Reputation, Competitive, Brand Image, Other |
| 2 | When the user opens the category select |  | Only C1 and C2 are listed, with no Add category action |
| 3 | And the user opens the market select |  | Only GB (EN) and FR (FR) are listed; the select is prefilled with GB (EN), the first market of the analysis |
| 4 | When the user picks type Brand Image | Type: Brand Image | The category select is cleared and disabled and shows "Overview" |

#### TC-GEO-1234-004 - Market select is prefilled with the filtered market

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that when the table is filtered on exactly one market, the market select of the new row is prefilled with that market. Covers AC-2 (prefilled from context).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the table is filtered on market FR (FR) only | Market filter = FR (FR) | Only FR (FR) prompts are listed |
| 2 | When the user clicks Add prompt |  | A new row opens at the top |
| 3 | Then the market select is prefilled with the filtered market |  | Market = FR (FR); Category and Type show the placeholder "Other" (no value selected) |

#### TC-GEO-1234-005 - Nothing infers the category or type and confirm stays disabled until both are picked (flag OFF)

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** [SKIP while the unbranded flag is ON on staging: run only with the flag OFF (GEO-1241 AC1b)] Verify, with the unbranded feature flag OFF, that nothing suggests or infers the category or type of a typed prompt and that confirm stays disabled until both are picked. Covers AC-3. With the flag ON, GEO-1247 AC3 (GEO-1209) overrides this AC: confirm is no longer disabled when category or type is empty; do not run this TC with the flag ON.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag OFF (mandatory for this TC). Unbranded feature flag OFF (4-step wizard: Brand & Country, Categories, Prompts, Summary); the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has opened a new row with Add prompt |  | The new row is at the top |
| 2 | When the user types a prompt | Prompt: "Which brand sells the most durable hiking boots?" | The text is in the input; Category and Type stay empty (nothing suggested or inferred) |
| 3 | Then confirm is disabled |  | Confirm cannot be clicked |
| 4 | When the user picks only a category | Category: C1 | Type stays empty and confirm is still disabled |
| 5 | And the user picks a type | Type: Visibility | Confirm becomes enabled |

#### TC-GEO-1234-006 - A confirmed prompt is kept, highlighted and marked CUSTOM

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a confirmed prompt is added kept (ticked), highlighted and marked with a CUSTOM badge, announced by the toast "Prompt added. It uses one pool slot.", with "?" added when missing. Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step with room in the pool.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has filled a new row | Prompt: "Which brand sells the best kayaks" - Category C2 - Type Competitive - Market GB (EN) | Confirm is enabled; ring reads "X / P" |
| 2 | When the user confirms |  | The toast "Prompt added. It uses one pool slot." is shown |
| 3 | Then the row is added kept and highlighted |  | The row is ticked, highlighted, at the top of the table; the ring reads "X + 1 / P" |
| 4 | And the row is marked with a CUSTOM badge |  | CUSTOM badge on the row; the wording ends with "?" |
| 5 | When the user performs the next action on the table | Sort Category ascending | The highlight is removed; the CUSTOM badge stays |

#### TC-GEO-1234-007 - A duplicate prompt is refused in the same market, accepted in another market

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that a prompt identical to an existing one for the same market, category and type (ignoring letter case, extra spaces and the final "?") shows an error and cannot be added, while the same text in another market is accepted. Covers AC-4 (duplicate rule).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step; prompt E exists in C1 - Visibility - GB (EN).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given prompt E exists for C1, Visibility, GB (EN) | Prompt E (read its wording) | E is listed |
| 2 | When the user adds E again in upper case with extra spaces and without "?" for the same category, type and market | Wording of E in upper case, double spaces, no "?"; C1; Visibility; GB (EN) | An error is shown and the row is not added |
| 3 | And the user changes the market of the new row to FR (FR) and confirms | Market: FR (FR) | The prompt is added for FR (FR) with the CUSTOM badge |

#### TC-GEO-1234-008 - A typed prompt is limited to 300 characters with a counter from 250

- **ACs:** AC-1 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a typed prompt is limited to 300 characters and that a character counter shows from 250 characters. Covers AC-1 (text input rule).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has opened a new row with Add prompt |  | The text input is empty and no counter is shown |
| 2 | When the user types 249 characters | 249-character text | No counter is shown |
| 3 | And the user types up to 250 characters | 250-character text | A character counter is shown |
| 4 | When the user tries to type beyond 300 characters | 301-character text | The input stops at 300 characters (or confirm is refused) |

### GEO-1235 — Sort, filter and edit the prompt table (Story, Ready for QA)

#### TC-GEO-1235-001 - The prompt table shows the columns Prompt, Category, Type, Market and Actions

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the Prompts table shows the columns Prompt, Category, Type, Market and Actions. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has generated prompts |  | The Prompts step is displayed |
| 2 | When the table renders |  | All prompts of all markets are in one table, with no market or type tabs |
| 3 | Then the table shows its five columns |  | "Prompt", "Category", "Type", "Market", "Actions" |

#### TC-GEO-1235-002 - Each prompt shows its category and one of the four type badges

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify that each prompt shows its category and one of Visibility, Competitive, Reputation or Brand Image, Brand Image prompts showing the category "Overview". Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step |  | The table renders |
| 2 | When the user looks at the type badges |  | Every row carries a type badge |
| 3 | Then each prompt shows one of the four types |  | Only "Visibility", "Competitive", "Reputation" or "Brand Image" badges |
| 4 | And each prompt shows its category |  | C1 or C2 for Visibility, Competitive and Reputation rows; "Overview" for Brand Image rows |

#### TC-GEO-1235-003 - Category header menu: sort, value checkboxes with live counts and Clear filter

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Category header sort trigger opens a menu with Sort ascending, Sort descending, a checkbox list of values with live counts and Clear filter, and that the header then counts the controls applied. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step, no filter applied.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step |  | The Category header has a sort trigger |
| 2 | When the user clicks the sort trigger of the Category header |  | A menu opens with "Sort ascending", "Sort descending", a checkbox list and "Clear filter" |
| 3 | Then the checkbox list shows each value with its live count |  | C1 (60), C2 (60), Overview (20) and Other (0) (listed with no prompt in Other, by design: QA decision 2026-10-22, Q-06) |
| 4 | When the user checks C1 and chooses Sort ascending |  | Only C1 prompts are listed and the header shows the number 2 (1 value + 1 sort) |
| 5 | When the user clicks Clear filter |  | All prompts are listed again, the sort is removed and the header shows no number |

#### TC-GEO-1235-004 - Type and Market menus: sort order, one sort at a time, counts follow the other filters

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the Type and Market header menus offer the same controls, that types sort as Visibility, Reputation, Competitive, Brand Image, markets sort on their label, only one sort applies at a time, and the counts follow the other active filters (a value with no prompt stays listed with 0). Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step, no filter applied.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step |  | No filter or sort is applied |
| 2 | When the user opens the Type header menu and chooses Sort ascending |  | Rows are ordered Visibility, Reputation, Competitive, Brand Image |
| 3 | And the user opens the Market header menu and chooses Sort ascending |  | Rows are ordered on the market label (FR (FR) before GB (EN)); the Type sort is replaced and the Type header loses its number |
| 4 | When the user checks C2 in the Category menu and opens the Type menu | Category = C2 | Visibility (20), Competitive (20), Reputation (20), Brand Image (0) and Other (0) still listed |

#### TC-GEO-1235-005 - Combined filters matching nothing show a no-results card while launch stays enabled

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that combined filters matching nothing show a no-results card naming the filters in conflict with Clear all filters, and that launch stays enabled. Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step with the selection within the pool.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step |  | Review & Launch is enabled |
| 2 | When the user filters Category = C1 and Type = Brand Image | Category: C1; Type: Brand Image | No prompt matches |
| 3 | Then a no-results card names the filters in conflict |  | The card names Category C1 and Type Brand Image and offers "Clear all filters" |
| 4 | And launch stays enabled |  | Review & Launch is enabled; "N selected" is unchanged |
| 5 | When the user clicks Clear all filters |  | All prompts are listed and no header shows a number |

#### TC-GEO-1235-006 - An empty table keeps the filters and the pool tracker and shows its own Add prompt

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that when the table is empty the filters and the pool tracker stay and an empty-state card carries its own Add prompt; Review & Launch is disabled with no prompt. Covers AC-5. Needs setup: every prompt deleted with the trash icon (minimal scope, 40 prompts).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). The user is on the Prompts step and deletes the 40 prompts one by one with the trash icon.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given every prompt of the analysis was deleted | 40 trash clicks | The table has no row |
| 2 | When the table renders |  | An empty-state card is displayed |
| 3 | Then the filters and the pool tracker stay |  | Header filters and the ring "U / P" are still displayed |
| 4 | And the empty-state card carries its own Add prompt |  | The card shows an Add prompt button; Review & Launch is disabled |
| 5 | When the user clicks Add prompt in the card |  | The editable new row opens |

#### TC-GEO-1235-007 - The pool tracker line and the table header stay pinned while the body scrolls

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that once the pool tracker line reaches the top while scrolling, it and the table header stay pinned and only the body scrolls. Covers AC-6. [Sync 2026-10-22: F-10 reported on GEO-1511; fixed in PR #839 (dev, GEO-1511 comment 866530, 2026-10-22), Ready for QA: re-run.]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step (140 prompts).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with 140 prompts |  | The pool tracker line and the table header are displayed |
| 2 | When the user scrolls down until the pool tracker line reaches the top |  | The tracker line stops at the top |
| 3 | Then the tracker line and the table header stay pinned | Keep scrolling to the last row | The ring and the column headers stay visible |
| 4 | And only the table body scrolls | Also check, as asked in GEO-1511 comment 866530: analysis > Prompts, and the Add market and Add category dialogs of Manage Scope | The rows move under the pinned header; no row shows above the pinned bar, which pins at the top with a small gap (about 12 px) (GEO-1511); the footer stays fixed |

#### TC-GEO-1235-008 - Editing a prompt changes only its wording

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that editing a prompt and saving changes only its wording (with "?" added when missing), category and type changing only through the row selects. Covers AC-7.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a prompt of C1, Reputation, GB (EN) | Prompt R | R shows its wording, C1, Reputation, GB (EN) |
| 2 | When the user edits the wording of R without "?" | New wording: "Is Decathlon a trusted brand for running gear" | The edit field shows the new text |
| 3 | And the user saves |  | R shows "Is Decathlon a trusted brand for running gear?" |
| 4 | Then only the wording changed |  | Category C1, type Reputation, market GB (EN) and the ticked state of R are unchanged |

#### TC-GEO-1235-009 - Row selects change category and type with the Brand Image and placeholder rules

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that category and type change only through the row selects shown on hover: choosing Brand Image sets the category to Overview, leaving Brand Image asks for a category first, a Competitive prompt containing [Competitor N] cannot change type, and the market cannot be changed. Covers AC-7.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user hovers a Visibility row of C1 | Prompt V | Category and Type show as selects; Market is not editable |
| 2 | When the user sets its type to Brand Image | Type: Brand Image | The category becomes "Overview" |
| 3 | And the user sets its type back to Visibility | Type: Visibility | A category is asked first; after picking C1 the row reads C1 - Visibility |
| 4 | When the user tries to change the type of a Competitive prompt containing [Competitor N] | Competitive prompt with "[Competitor 1]" | The change is refused with a message asking to remove the placeholders first |

#### TC-GEO-1235-010 - Show prompts menu filters All, Selected only or Unselected only

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Prompt header Show prompts menu shows All, Selected only or Unselected only, and that the selected count stays in view and counts the whole analysis whatever the filters. Covers AC-8.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step and has unticked 5 prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given 135 prompts are ticked and 5 unticked |  | "135 selected" is displayed |
| 2 | When the user opens the Show prompts menu of the Prompt header |  | "All", "Selected only" and "Unselected only" are offered |
| 3 | And the user chooses Unselected only |  | Only the 5 greyed rows are listed; "135 selected" stays in view |
| 4 | And the user chooses Selected only |  | Only the 135 ticked rows are listed; "135 selected" stays in view |
| 5 | Then choosing All lists every prompt | All | 140 rows are listed |

### GEO-1236 — Track the pool while selecting prompts (Story, Ready for QA)

#### TC-GEO-1236-001 - The toolbar ring reads the slots used after creation and its popover splits them

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the toolbar ring reads the slots used after creation over the pool (e.g. 138 / 150) as the selection changes, and that its popover splits other analyses, this analysis and free slots. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". The pool has at least 40 free slots. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with 40 ticked prompts |  | The toolbar ring reads "U + 40 / P" |
| 2 | When the user hovers the ring |  | The popover opens |
| 3 | Then the popover splits other analyses, this analysis and free slots |  | Other analyses = U, Kept in this analysis = 40, Free = P - U - 40 |
| 4 | When the user unticks 2 prompts |  | The ring reads "U + 38 / P" and the popover shows 38 for this analysis and "38 selected" |
| 5 | And the user reaches the ring with the keyboard | Tab key | The popover also opens on keyboard focus |

#### TC-GEO-1236-002 - A selection exactly at the limit turns the ring amber and keeps launch enabled

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a selection exactly at the limit turns the ring amber with a short message and keeps launch enabled. Covers AC-2. Needs setup: pool of organisation T set to U + 30.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Pool of T set to U + 30; restore it afterwards. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step over the limit | Pool = U + 30, 40 ticked | The ring reads "U + 40 / U + 30" in red |
| 2 | When the user unticks 10 prompts |  | The ring reads "U + 30 / U + 30" |
| 3 | Then the ring turns amber with a short message |  | Amber ring with its at-limit message; the popover shows "Need more room? Contact your account manager." |
| 4 | And launch stays enabled |  | Review & Launch is enabled |

#### TC-GEO-1236-003 - Over the limit the ring is red and only Review & Launch is blocked

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that over the limit the ring turns red, the message states how many prompts are over and Review & Launch is blocked until the count fits, while adding and ticking prompts stay possible. Covers AC-3 (updated 2026-10-09; Figma 4.5 greying Add prompt is superseded). Needs setup: pool of organisation T set to U + 30.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Pool of T set to U + 30; restore it afterwards. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). The user has unticked 10 prompts (ring at "U + 30 / U + 30").

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the selection is exactly at the limit | 30 ticked, 10 unticked | The ring is amber |
| 2 | When the user ticks 2 unticked prompts |  | The ticks are accepted |
| 3 | Then the ring turns red and the message states how many prompts are over |  | Red ring "U + 32 / U + 30" with a message stating 2 prompts over |
| 4 | And Review & Launch is blocked |  | Review & Launch is disabled |
| 5 | When the user adds a custom prompt | Prompt: "Which brand has the best ski jackets?" - C1 - Visibility - GB (EN) | Add prompt is enabled and the prompt is added; the message states 3 prompts over |
| 6 | And the user unticks 3 prompts |  | The ring reads "U + 30 / U + 30" and Review & Launch is enabled again |

#### TC-GEO-1236-004 - In Manage Scope ticking or adding a prompt still needs room in the pool

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that in Manage Scope ticking a suggested prompt or adding a prompt still needs room in the pool. Covers AC-3 (Manage Scope part) and GEO-1239 AC-2 (if the pool has room) and AC-9. Updated 2026-10-20 (PO decision, GEO-1002 comment 865136): with no free slot, suggestions cannot be ticked and Add prompt is disabled up front. Needs setup: pool of organisation T set exactly to its usage U.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Pool of T set to U (no free slot); restore it afterwards. Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Manage Scope > Prompts of analysis A with no free slot | Pool = U | The ring reads "U / U" (amber) |
| 2 | When the user tries to tick a suggested prompt | A row under Suggested Prompts | The suggested prompt checkboxes are disabled: the prompt cannot be ticked |
| 3 | And the user tries to add a prompt | Prompt: "Which brand sells the best climbing ropes?" - category of A - Visibility - GB (EN) | Add prompt is disabled: no prompt can be added |
| 4 | Then unticking a kept prompt frees a slot | Untick 1 kept prompt and save | The ring reads "U - 1 / U" and ticking one suggested prompt is now accepted |

#### TC-GEO-1236-005 - Over the limit the system never removes a prompt

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that over the limit the system never removes or unticks a prompt and the only ways back are unticking prompts or contacting the account manager. Covers AC-4. Needs setup: pool of organisation T set to U + 30.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Pool of T set to U + 30; restore it afterwards. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step over the limit | 40 ticked, pool U + 30 | Red ring, 10 over |
| 2 | When the user hovers the ring |  | The popover shows "Need more room? Contact your account manager." |
| 3 | And the user goes Back to Categories and returns to Prompts |  | The Prompts step is displayed |
| 4 | Then no prompt was removed or unticked by the system |  | "40 selected", 40 rows, the ring still reads "U + 40 / U + 30" |

### GEO-1237 — Review and create the analysis (Story, Ready for QA)

#### TC-GEO-1237-001 - Summary shows the scope with its markets and categories, and the AI engines

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that Summary shows the scope with its markets and categories, and the AI engines, with no "Primary" tag on markets. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The selection is within the pool.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step within the pool |  | Review & Launch is enabled |
| 2 | When the user clicks Review & Launch |  | The Summary step loads |
| 3 | Then the scope shows the markets |  | United Kingdom · English and France · French, with no "Primary" tag |
| 4 | And the scope shows the categories |  | C1 and C2 |
| 5 | And the AI engines are shown |  | The engines allowed for organisation T are shown as toggles |

#### TC-GEO-1237-002 - A market with no kept prompt is shown dropped and named in the warning

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a market with no kept prompt is greyed with a "dropped" tag on Summary and named in the warning. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user unticks every prompt of FR (FR) | Filter Market = FR (FR), untick all 70 rows | No FR (FR) prompt is ticked |
| 2 | When the user clicks Review & Launch |  | Summary loads |
| 3 | Then France · French is greyed with a "dropped" tag |  | France · French greyed with "dropped"; United Kingdom · English not dropped |
| 4 | And the warning names France as dropped |  | The warning names France |

#### TC-GEO-1237-003 - A category with no kept prompt is shown dropped and named in the warning

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a category with no kept prompt in any market is greyed with a "dropped" tag on Summary and named in the warning. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user unticks every prompt of category C2 | Filter Category = C2, untick all 60 rows | No C2 prompt is ticked |
| 2 | When the user clicks Review & Launch |  | Summary loads |
| 3 | Then C2 is greyed with a "dropped" tag |  | C2 greyed with "dropped"; C1 not dropped |
| 4 | And the warning names C2 as dropped |  | The warning names C2 |

#### TC-GEO-1237-004 - A question type with no kept prompt is named with the metrics it will not produce

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a question type with no ticked prompt in the whole analysis is named in the warning with the metrics the analysis will not produce (e.g. no Brand Image: no Corporate Reputation cards nor Brand Territory). Covers AC-2. Bug GEO-1271 fixed on staging 2026-10-19 (Ready for QA); exact copy from the fix comment (GEO-1271, 2026-10-19).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user unticks every Brand Image prompt | Filter Type = Brand Image, untick all 20 rows | No Brand Image prompt is ticked |
| 2 | When the user clicks Review & Launch |  | Summary loads |
| 3 | Then the warning names the missing question type |  | The warning names Brand Image |
| 4 | And the warning names the metrics the analysis will not produce |  | The warning reads "No Brand Image prompts are kept, so the Corporate Reputation cards and Brand Territory stay empty, with a prompt to add questions." |

#### TC-GEO-1237-005 - When every category is dropped Create Analysis stays disabled

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that an analysis needs at least one category with a ticked prompt: if every category is dropped, even with Brand Image prompts ticked, the banner says so and Create Analysis stays disabled. Covers AC-2 (functional rule of the story, not TAC5).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user is on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given only Brand Image prompts are ticked | Untick every C1 and C2 row (120) | "20 selected" |
| 2 | When the user clicks Review & Launch |  | Summary loads |
| 3 | Then every category is shown dropped |  | C1 and C2 greyed with "dropped" |
| 4 | And the banner says at least one category needs a kept prompt |  | The banner states that at least one category needs a kept prompt |
| 5 | And Create Analysis stays disabled |  | Create Analysis cannot be clicked |

#### TC-GEO-1237-006 - Only the engines allowed for the organisation are shown, on by default

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the engines allowed for the organisation in the back office are toggles, ChatGPT and Gemini on by default when allowed (if neither is allowed, every allowed engine is on), and that the other engines are not shown (no "Available on higher plans" or Upgrade block). Covers AC-3. Needs setup: read the allowed AI engines of organisation T in the back office. [Sync 2026-10-22: Q-04 answered by the GEO-1237 Rules ("If neither Gemini nor ChatGPT is allowed, every allowed engine starts on.") and TAC3; QA reading accepted.]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. The allowed AI engines of T are read in the back office (e.g. ChatGPT, Gemini, Perplexity). Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the allowed AI engines of organisation T are known | Allowed engines from the back office | The list of allowed engines is noted |
| 2 | When the user reaches Summary |  | Summary loads |
| 3 | Then each allowed engine is a toggle, with ChatGPT and Gemini on by default |  | One toggle per allowed engine; ChatGPT and Gemini are on when allowed, every other allowed engine is off; if neither ChatGPT nor Gemini is allowed, every allowed engine is on |
| 4 | And the other engines are not shown |  | No engine outside the allowed list; no "Available on higher plans" or Upgrade block |

#### TC-GEO-1237-007 - Turning off the last engine turns every engine back on

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that at least one engine stays on: turning off the last engine on turns every engine back on. Covers AC-3. [Validated by QA 2026-10-20: by design]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). The user is on Summary with every allowed engine on.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Summary with every allowed engine on |  | All engine toggles are on |
| 2 | When the user turns off every engine but one |  | The toggles turn off |
| 3 | And the user tries to turn off the last engine |  | All 5 engine toggles turn back on |
| 4 | Then at least one engine stays on |  | The analysis cannot be created with no engine |

#### TC-GEO-1237-008 - Engines never consume slots

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that changing the engine toggles never changes the pool count, on Summary and after creation. Covers AC-4. [QA 2026-10-23: the pool figures are only shown on the Prompts step (Summary has none), so the slots are checked on the Prompts ring after toggling an engine on Summary; no analysis is created]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). The organisation allows at least 2 engines.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with S kept prompts | S = 40 | The pool ring reads "U + 40 / P" |
| 2 | When the user goes to Summary and turns one engine off |  | The engine toggle is off; Summary shows no pool figures |
| 3 | And the user goes back to Prompts |  | The pool ring still reads "U + 40 / P" |
| 4 | Then turning the engine back on does not change the pool either | Back on Summary, turn the engine on, then return to Prompts | The pool ring still reads "U + 40 / P"; engines never consume slots (on an existing analysis, its Prompts column does not depend on its number of engines) |

#### TC-GEO-1237-009 - The analysis cannot be created when the pool goes over during the wizard

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that when the pool goes over the limit while the user is on Summary, the analysis cannot be created: back on Prompts the ring is red with the number of prompts over, and Summary and Review & Launch cannot be opened. Covers AC-5. Needs setup: the pool is lowered in the back office from a second tab while the user is on Summary. The wizard re-reads the pool only when the user changes step (accepted by the PO, GEO-1002 comment 864533, 2026-10-19). Aligned 2026-10-23 (QA decision): over the pool only Review & Launch is blocked (GEO-1236 rule), so Summary cannot be reopened and its red banner with Create Analysis disabled cannot be reached (run 23102026-1210).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Second browser tab open on the back office edit form of organisation T; restore the pool afterwards. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). The user is on Summary within the pool.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Summary with 40 kept prompts within the pool |  | Create Analysis is enabled |
| 2 | When the pool of organisation T is lowered to U + 30 from the back office tab | Pool: U + 30 | The back office saves the pool |
| 3 | And the user goes Back to Prompts |  | The Prompts step loads with the current pool |
| 4 | Then the ring is red and states how many prompts are over |  | The ring reads "U + 40 / U + 30" in red with "10 prompts over. Untick prompts or contact your account manager." |
| 5 | And Summary and Review & Launch cannot be opened |  | The Summary step of the stepper and the Review & Launch button are disabled, so the analysis cannot be created |

#### TC-GEO-1237-010 - The creation confirmation states the created scope and offers View analysis

- **ACs:** AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the confirmation of a scheduled analysis states its prompts, markets, categories and engines, the unticked suggestions kept on the analysis, that prompt changes apply at the next run, and offers View analysis, with no subtitle. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", markets GB (EN) and FR (FR), 2 categories C1 and C2 kept from discovery (others removed) = 2 x (10 + 2 x 30) = 140 suggested prompts. The user has unticked 7 prompts (133 kept) and keeps 3 engines on.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Summary with 133 kept prompts, 7 unticked, 2 markets, 2 categories and 3 engines |  | Create Analysis is enabled |
| 2 | When the user clicks Create Analysis |  | The analysis is scheduled and the "Analysis created" confirmation opens; Back to Dashboard is hidden |
| 3 | Then the confirmation states the prompts, markets, categories and engines |  | 133 prompts, 2 markets, 2 categories and the names of the 3 engines |
| 4 | And the confirmation states the unticked suggestions kept on the analysis and that prompt changes apply at the next run |  | 7 unticked suggestions kept; the next-run sentence; no subtitle and no "You'll receive an email" line |
| 5 | When the user clicks View analysis |  | The new analysis opens |

#### TC-GEO-1237-011 - The unticked-suggestions line is hidden when there are none

- **ACs:** AC-6 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** Verify that the confirmation hides the line about unticked suggestions when none were left, and that Go to Dashboard returns to the list. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). Every prompt kept (none unticked).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Summary with 40 kept prompts and none unticked |  | Create Analysis is enabled |
| 2 | When the user clicks Create Analysis |  | The confirmation opens |
| 3 | Then no line about unticked suggestions is shown |  | 40 prompts, 1 market, 1 category and the engines are stated; no unticked-suggestions line |
| 4 | When the user clicks Go to Dashboard |  | The GEO dashboard list is displayed with the new analysis |

### GEO-1238 — Leave the wizard (Story, Ready for QA)

#### TC-GEO-1238-001 - Back to Dashboard with choices entered opens "Exit setup?"

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that Back to Dashboard, once something was entered, opens the "Exit setup?" confirmation stating there is no draft and that exiting discards every choice, naming the brand, and that Exit and Discard returns to the dashboard. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Brand & Country and has entered a brand and a market | Brand "Decathlon"; market GB (EN) | The entries are shown |
| 2 | When the user clicks Back to Dashboard |  | The "Exit setup?" confirmation opens |
| 3 | Then the confirmation states that exiting discards every choice since there is no draft |  | The message names "Decathlon", says there is no draft and that every choice is discarded |
| 4 | And the confirmation offers Resume Setup and Exit and Discard |  | "Resume Setup" and "Exit and Discard" are shown |
| 5 | When the user clicks Exit and Discard |  | The GEO dashboard is displayed and no analysis was created |

#### TC-GEO-1238-002 - The exit confirmation opens on every step

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that Back to Dashboard opens "Exit setup?" on Categories, Prompts and Summary, the message including the prompts kept. Covers AC-1 (any step).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step |  | Back to Dashboard is enabled |
| 2 | When the user clicks Back to Dashboard |  | "Exit setup?" opens; the user clicks Resume Setup |
| 3 | And the user goes to the Prompts step and clicks Back to Dashboard |  | "Exit setup?" opens and says the prompts kept are discarded too; the user clicks Resume Setup |
| 4 | And the user goes to Summary and clicks Back to Dashboard |  | "Exit setup?" opens |

#### TC-GEO-1238-003 - With nothing entered Back to Dashboard leaves directly

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that with nothing entered, Back to Dashboard and Back on Brand & Country leave the wizard directly without confirmation. Covers AC-1 (confirmation only once something was entered).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user has just opened the wizard and entered nothing |  | Brand & Country is empty |
| 2 | When the user clicks Back to Dashboard |  | The GEO dashboard is displayed with no confirmation |
| 3 | And the user opens the wizard again and clicks Back on Brand & Country |  | The GEO dashboard is displayed with no confirmation |

#### TC-GEO-1238-004 - Back on the first step with choices entered opens "Exit setup?"

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that Back on the first step (Analysis Type, flag ON) opens the "Exit setup?" confirmation once something was entered on a later step. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Brand & Country with a brand entered | Brand "Decathlon" | The brand is shown |
| 2 | When the user clicks Back in the footer |  | The Analysis Type step is displayed with Brand analysis still selected |
| 3 | And the user clicks Back in the footer on Analysis Type |  | The "Exit setup?" confirmation opens naming "Decathlon" |

#### TC-GEO-1238-005 - Resume Setup keeps the user on the same step with every choice

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that cancelling the exit confirmation with Resume Setup keeps the user on the same step with every choice intact. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). The user is on the Prompts step and has unticked 2 prompts and added a custom prompt.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step with 39 selected and a CUSTOM prompt |  | The ring and "39 selected" are shown |
| 2 | When the user clicks Back to Dashboard |  | "Exit setup?" opens |
| 3 | And the user clicks Resume Setup |  | The confirmation closes |
| 4 | Then the user stays on the same step with every choice intact |  | Prompts step, "39 selected", the 2 unticked rows and the CUSTOM prompt unchanged |

#### TC-GEO-1238-006 - The cross and Esc also keep every choice

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that closing the exit confirmation with the cross or the Esc key keeps the user on the same step with every choice intact. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). The user is on the Categories step with an added category "Cycling".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step |  | C1 and "Cycling" are listed |
| 2 | When the user clicks Back to Dashboard and closes the confirmation with the cross |  | The user stays on Categories with C1 and "Cycling" |
| 3 | And the user clicks Back to Dashboard and presses Esc | Esc key | The user stays on Categories with C1 and "Cycling" |

#### TC-GEO-1238-007 - A stepper back-click or the footer Back opens the previous step with no dialog and keeps every choice

- **ACs:** AC-1 and GEO-1233 AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a click on an earlier step in the stepper, or the footer Back, opens that step directly with no "Exit setup?" dialog, with or without a pending change, and that every choice is kept when going forward again; "Exit setup?" only opens from Back to Dashboard (and Back on the first step). Covers AC-1 and GEO-1233 AC-7. Regression of bug GEO-1500 (Passed QA 2026-10-22, QA comment 866499); expected behaviour from the dev: "A click on an earlier step in the stepper, with or without a pending change … opens the clicked step directly: no dialog" (GEO-1500 comment 865946, Q-14). Added 2026-10-22 (sync, F-01 / Q-14).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), detected categories C1 and C2 kept. The user has reached the Prompts step once (prompts generated).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step after Generate Prompts | Brand "Decathlon"; GB (EN); C1 and C2 | The prompts are listed with "N selected" |
| 2 | When the user clicks Categories in the stepper and adds a category | Category: "Cycling" | The Categories step opens directly, with no dialog; "Cycling" is listed (Custom) |
| 3 | And the user removes C2 and goes forward to Prompts | Confirm the removal of C2 | The "Cycling" suggestions are listed and no C2 prompt is left |
| 4 | And the user unticks one prompt and clicks Brand & Country in the stepper |  | Brand & Country opens directly, with no "Exit setup?" dialog |
| 5 | And the user goes forward again to Prompts and clicks Back in the footer |  | The Categories step opens directly, with no dialog |
| 6 | Then every choice is kept when going forward again | Continue to Prompts | Brand "Decathlon", GB (EN), "Cycling" kept, C2 still removed, the unticked prompt still unticked and the "selected" count unchanged |
| 7 | When the user clicks Back to Dashboard |  | "Exit setup?" opens; the user clicks Resume Setup and stays on Prompts with every choice intact |

### GEO-1239 — Manage prompts after launch (Story, Ready for QA)

#### TC-GEO-1239-001 - Manage Scope Prompts shows the wizard's table, filters and pool tracker

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Prompts section of Manage Scope shows the wizard's table, filters and pool tracker, without per-country or per-type tabs and without the per-group Reset button. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the dashboard of analysis A |  | Manage Scope is reachable |
| 2 | When the user opens Manage Scope > Prompts |  | The Prompts section is displayed |
| 3 | Then the wizard's table is shown |  | Columns "Prompt", "Category", "Type", "Market", "Actions" in one table; no per-country or per-type tabs; no Reset button |
| 4 | And the wizard's filters are shown |  | Category, Type and Market header menus and the Show prompts menu |
| 5 | And the pool tracker is shown |  | The ring "U / P" with its popover |

#### TC-GEO-1239-002 - Retained unticked suggestions show at the end of the table and can be ticked when the pool has room

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that retained unticked suggestions show unticked and greyed at the end of the table (no "Suggested Prompts" heading), and that ticking one keeps it from the next run when the pool has room. Covers AC-2. The no-room case is covered by TC-GEO-1236-004. Needs setup: a later collection to see the prompt collected. [Sync 2026-10-22: Q-10 heading part — suggestions sit at the end of the table, as in frames MS.1 / MS.4 (dev design check, GEO-1002 comment 863490); Q-05 — a tick is saved at once, no Save button (dev, GEO-1002 comment 864688).]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". The pool has free slots. Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Manage Scope > Prompts of analysis A |  | The kept prompts are listed |
| 2 | When the user scrolls to the end of the table |  | The unticked suggestions are listed, unticked and greyed, at the end of the table (no "Suggested Prompts" heading) |
| 3 | And the user ticks one suggested prompt | Suggested prompt G | The ring increases by 1 and G is kept at once (no Save button) |
| 4 | Then G is kept from the next run | Next collection of A | G is collected and appears in the results of the next run only; the tick is not written in the version history |

#### TC-GEO-1239-003 - Editing a prompt in Manage Scope changes only its wording, from the next run

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that editing a prompt in Manage Scope and saving changes only its wording, applied from the next run. Covers AC-3. Needs setup: a later collection after the edit.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a kept prompt K of analysis A collected in past runs | Prompt K (C1, Visibility, GB (EN)) | K shows its original wording |
| 2 | When the user edits the wording of K and saves | New wording: original wording + " in 2026" | K shows the new wording; category, type, market and ticked state are unchanged |
| 3 | Then past results keep the original wording | Results of the last run | The last run shows K with its original wording |
| 4 | And the next run uses the new wording | Next collection of A | The next run shows K with the new wording |

#### TC-GEO-1239-004 - Deleting a prompt frees its slot and keeps its past data points

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that deleting a prompt in Manage Scope asks for confirmation (no Undo), returns its slot to the pool and keeps its past data points in the history. Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a kept prompt K of analysis A with past data points | Prompt K | The ring reads "X / P" |
| 2 | When the user clicks the trash icon of K |  | A confirmation opens |
| 3 | And the user confirms |  | K is removed from the table, with no Undo toast |
| 4 | Then its slot returns to the pool |  | The ring reads "X - 1 / P" |
| 5 | And its past data points stay in the history | Results of past runs | The past results of K are still shown |

#### TC-GEO-1239-005 - The last prompt of a group can be deleted with a warning naming the metrics that stop

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that deleting the last prompt of a question type, category or market is allowed (the GEO-581 minimum of 1 prompt per group goes away) and that a warning names the metrics the analysis will stop producing. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts. Group G = market GB (EN) x category C1 x type Reputation reduced to a single kept prompt beforehand.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the group GB (EN) x C1 x Reputation holds a single prompt | Filters: Market GB (EN), Category C1, Type Reputation | One row is listed |
| 2 | When the user deletes that last prompt |  | The deletion is allowed (no minimum error) |
| 3 | Then a warning names the metrics the analysis will stop producing |  | The warning names the Reputation metrics of C1 in GB (EN) |
| 4 | When the user confirms |  | The prompt is deleted and the group is empty |

#### TC-GEO-1239-006 - Version history groups prompt changes by date with count and original and edited wording

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the version history groups prompt changes by date with their count and the original and edited wording. Covers AC-6. Needs setup: prompt edits made on at least two different days.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts. Two prompts of A edited on day D1 and one prompt edited on day D2.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given prompts of analysis A were changed on two dates | D1: 2 edits; D2: 1 edit | The changes are saved |
| 2 | When the user opens the version history |  | The version history is displayed |
| 3 | Then the changes are grouped by date with their count |  | A D2 group with 1 change and a D1 group with 2 changes |
| 4 | And each change shows the original and the edited wording |  | Original and edited wording of each of the 3 prompts |

#### TC-GEO-1239-007 - A category change keeps the prompt history where it was collected

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that changing the category of a prompt keeps its history where it was collected, the change showing in the history as deleted from the old category and added to the new one. Covers AC-7. Needs setup: a later collection after the change. [Sync 2026-10-22: Q-05 — Manage Scope saves a change at once, with no Save button: "Manage Scope has none: every add is saved at once" (dev, GEO-1002 comment 864688).]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts. Analysis A has categories C1 and C2; prompt K (C1, Visibility) has past results.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given prompt K of category C1 has past results | Prompt K | K is listed under C1 |
| 2 | When the user changes the category of K to C2 with the row select | Category: C2 | K is listed under C2 at once (no Save button, no confirmation) |
| 3 | Then the version history shows K deleted from C1 and added to C2 |  | Two entries: deleted from C1, added to C2 |
| 4 | And the past results of K stay under C1 | Category view C1, past runs | The past results of K are still counted in C1 |
| 5 | And the next run collects K under C2 | Next collection of A | K results appear under C2 from the next run |

#### TC-GEO-1239-008 - A type change ends the old series and starts a new one

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that changing the type of a prompt ends its old series and starts a new one. Covers AC-7. Needs setup: a later collection after the change. [Sync 2026-10-22: Q-05 — Manage Scope saves a change at once, with no Save button: "Manage Scope has none: every add is saved at once" (dev, GEO-1002 comment 864688).]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts. Prompt K (C1, Visibility, no [Competitor N] placeholder) has past results.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given prompt K of type Visibility has past results | Prompt K | K shows type Visibility |
| 2 | When the user changes the type of K to Reputation with the row select | Type: Reputation | K shows type Reputation at once (no Save button, no confirmation) |
| 3 | Then the Visibility series of K ends | Visibility results, past runs | The past Visibility results of K stay and get no new data point |
| 4 | And a new Reputation series starts from the next run | Next collection of A | K results appear as Reputation from the next run |

#### TC-GEO-1239-009 - Adding a market brings fresh suggestions, all ticked, with the pool in view

- **ACs:** AC-8 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that adding a market in Manage Scope brings fresh suggestions for it, all ticked, with the pool in view; what the user unticks joins the retained set (unticked suggestions at the end of the table), and the market cannot be saved with no ticked prompt nor over the pool. Covers AC-8.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". The pool has enough free slots for a new market. Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is in Manage Scope of analysis A |  | Add market is available |
| 2 | When the user adds a market | Market: Spain - Spanish (ES) | Fresh suggestions for Spain are generated, all ticked, with the pool ring in view |
| 3 | And the user unticks every suggestion of the new market |  | Save is refused with no ticked prompt |
| 4 | And the user ticks back all but 3 suggestions and saves |  | The market is added; the ring reflects the ticked prompts |
| 5 | Then the 3 unticked suggestions join the suggestions at the end of the table | Manage Scope > Prompts | The 3 rows are listed unticked and greyed at the end of the table (no "Suggested Prompts" heading); the new prompts show as "Added" in the version history |

#### TC-GEO-1239-010 - Adding a category brings fresh suggestions, all ticked, with the pool in view

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that adding a category in Manage Scope brings fresh suggestions for it in every market, all ticked, with the pool in view, joining the retained set. Covers AC-8.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". The pool has enough free slots for a new category. Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is in Manage Scope of analysis A |  | Add category is available |
| 2 | When the user adds a category | Category: "Cycling" | Fresh suggestions for "Cycling" in GB (EN) and FR (FR) are shown, all ticked, with the pool ring in view |
| 3 | And the user saves |  | The category is added |
| 4 | Then the new prompts join the analysis | Filter Category = Cycling | The "Cycling" prompts are listed in Manage Scope > Prompts and show as "Added" in the version history |

#### TC-GEO-1239-011 - With the pool exactly full, Add prompt, Add country and Add category are disabled and suggestions cannot be ticked

- **ACs:** AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that in Manage Scope, when the pool has no free slot because it is exactly full, Add prompt, Add country and Add category are disabled up front and suggestions cannot be ticked, until unticking a prompt frees a slot. Covers AC-9. Added 2026-10-20 (GEO-1239 AC-9 and Rules, PO decision GEO-1002 comment 865136). Needs setup: pool of organisation T set exactly to its usage U.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Pool of T set to U (no free slot); restore it afterwards. Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts. A is a disposable QA analysis (changes in Manage Scope are saved).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Manage Scope > Prompts of analysis A with the pool exactly full | Pool = U | The ring reads "U / U" (amber) |
| 2 | When the user looks at the add actions of the Prompts section |  | Add prompt, Add country and Add category are disabled |
| 3 | And the user tries to tick a suggested prompt | A row under Suggested Prompts | The suggestion cannot be ticked |
| 4 | Then unticking a kept prompt frees a slot | Untick 1 kept prompt | The ring reads "U - 1 / U"; Add prompt, Add country and Add category are enabled and suggestions can be ticked again |

#### TC-GEO-1239-012 - Over the pool the add actions stay disabled while editing, deleting and unticking stay possible

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that in Manage Scope, when the pool is over the limit (lowered below usage), Add prompt, Add country and Add category are disabled up front and suggestions cannot be ticked, while editing, deleting and unticking prompts stay possible. Covers AC-9. Added 2026-10-20 (GEO-1239 AC-9 and Rules, PO decision GEO-1002 comment 865136). Needs setup: back-office admin access to lower the pool of organisation T.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. The pool of T is lowered in the back office to U - 2 (2 slots over). The pool is restored at the end of the test. Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts. A is a disposable QA analysis (changes in Manage Scope are saved).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Manage Scope > Prompts of analysis A with the pool 2 slots below usage | Pool: U - 2 | The ring reads "U / U - 2" in red |
| 2 | When the user looks at the add actions and the suggested prompts |  | Add prompt, Add country and Add category are disabled and suggested prompts cannot be ticked |
| 3 | And the user edits the wording of a kept prompt and saves | New wording: existing wording + " in 2026" | The edit is saved |
| 4 | And the user deletes a kept prompt | A kept prompt of A | The prompt is deleted and the ring reads "U - 1 / U - 2" |
| 5 | Then unticking a kept prompt stays possible | Untick 1 kept prompt | The ring reads "U - 2 / U - 2"; Add prompt, Add country and Add category stay disabled (no free slot) |

#### TC-GEO-1239-013 - With no pool configured, the add actions are disabled while editing, deleting and unticking stay possible

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that in Manage Scope of an organisation with no prompt pool configured, Add prompt, Add country and Add category are disabled up front and suggestions cannot be ticked, while editing, deleting and unticking prompts stay possible. Covers AC-9 (Rules 2026-10-20: "exactly full, over or not configured"). Added 2026-10-20 (GEO-1239 AC-9 and Rules, PO decision GEO-1002 comment 865136). Needs setup: an organisation with no pool that holds at least one analysis. [Sync 2026-10-22: after GEO-1515 (pool set from the old quota at the 1.3 deploy) no organisation is left without a pool: the "no pool" steps are not applicable unless a no-pool organisation exists (no dev setup requested).]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the organisation "GEO Stress Test", which has no prompt pool set in the back office (Prompts column "—" in Administration > Organizations). It must hold at least one analysis N, to be identified at execution (if it holds none, the TC is blocked). N is opened from its dashboard in Manage Scope > Prompts; N is treated as disposable (changes in Manage Scope are saved). After GEO-1515 (V2.10.7), check that "GEO Stress Test" still shows "—" in Administration > Organizations; if no organisation without a pool exists, the TC is not applicable (no dev setup requested).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Manage Scope > Prompts of analysis N of an organisation with no pool | Organisation "GEO Stress Test", analysis N | The prompts of N are listed |
| 2 | When the user looks at the add actions of the Prompts section |  | Add prompt, Add country and Add category are disabled |
| 3 | And the user tries to tick a suggested prompt | A row under Suggested Prompts (if N has one) | The suggestion cannot be ticked |
| 4 | And the user edits the wording of a kept prompt and saves | New wording: existing wording + " in 2026" | The edit is saved |
| 5 | Then unticking and deleting prompts stay possible | Untick 1 kept prompt, then delete 1 other kept prompt | Both changes are applied; Add prompt, Add country and Add category stay disabled |

#### TC-GEO-1239-014 - Cancel in Add Country asks to discard the country addition

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that cancelling the Add Country dialog of Manage Scope asks to discard the country addition, with the country wording, and that Exit and Discard closes the dialog without adding the country. Covers AC-8. Regression of bug GEO-1503 (Passed QA 2026-10-22, QA comment 866513). Added 2026-10-22 (sync, F-05).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". The pool has enough free slots for a new market. Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts. Nothing is saved: the dialog is cancelled.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is in Manage Scope of analysis A |  | Add Country is available |
| 2 | When the user opens Add Country, picks a country and reaches the Prompts step of the dialog | Country: Spain - Spanish (ES) | The suggestions for Spain are shown |
| 3 | And the user clicks Cancel |  | "Discard Country" opens with "Your country addition is incomplete. Exiting now will result in the loss of all unsaved progress. Are you sure you want to proceed?" and the buttons Cancel and Exit and Discard |
| 4 | Then the dialog names the country, not a category |  | "Discard Category" and "Your category creation is incomplete" are not shown |
| 5 | When the user clicks Exit and Discard |  | The dialog closes; Spain - Spanish (ES) is not added and no entry is written in the version history |

### GEO-1240 — See the prompt pool on the GEO dashboard (Story, Ready for QA)

#### TC-GEO-1240-001 - The dashboard pool block shows the kept prompts over the pool with the wizard's ring

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the GEO dashboard shows a pool block with the kept prompts of all analyses over the pool (e.g. 138 / 150) with the wizard's ring, and that hovering it splits used and free. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Organisation T has at least one analysis and U < P.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is logged in to organisation T |  | The GEO dashboard is reachable |
| 2 | When the GEO dashboard loads |  | The "Analysis" table is displayed |
| 3 | Then a pool block is shown in the header of the Analysis table |  | Next to the number of analyses (e.g. "5 analyses"), the ring reads "U / P" |
| 4 | When the user hovers the ring |  | The popover splits used (U) and free (P - U) slots |

#### TC-GEO-1240-002 - A pool exactly at the limit shows an amber ring and New Analysis stays available

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a pool exactly at the limit shows an amber ring with a short message while New Analysis stays available. Covers AC-2. Needs setup: pool of organisation T set to U in the back office.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Pool of T set to U; restore it afterwards.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the pool of organisation T equals its usage | Pool = U | The back office shows "U / U" |
| 2 | When the GEO dashboard loads |  | The pool block is displayed |
| 3 | Then the ring is amber with a short message |  | Amber ring "U / U" with its at-limit message |
| 4 | And New Analysis stays available |  | New Analysis is enabled and opens the wizard |

#### TC-GEO-1240-003 - A pool over the limit shows a red ring and a new analysis cannot be launched

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that a pool over the limit (e.g. after a downgrade) shows a red ring with how many prompts are over, and that a new analysis can be started but not launched until the count fits. Covers AC-3. Needs setup: pool of organisation T lowered below usage in the back office.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Back office: super admin account logged in to the GEO back office (staging: https://staging-geo.onclusive.com/geo/backoffice), Administration > Organizations reachable. Pool of T set to U - 5; restore it afterwards. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the pool of organisation T is 5 slots below usage | Pool = U - 5 | The back office shows "U / U - 5" in red |
| 2 | When the GEO dashboard loads |  | The pool block is displayed |
| 3 | Then the ring is red with how many prompts are over |  | Red ring "U / U - 5" with a message stating 5 prompts over |
| 4 | When the user clicks New Analysis and goes to the Prompts step | Brand "Decathlon", GB (EN), 1 category | The wizard opens and the Prompts step is reached |
| 5 | Then the new analysis cannot be launched |  | The ring is red and Review & Launch is disabled |

#### TC-GEO-1240-004 - The sortable Prompts column shows the slots of each analysis and adds up to the pool block

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the analyses table has a sortable "Prompts" column after Categories showing the pool slots each analysis uses (kept prompts x markets), adding up to the pool block. Covers AC-4. [Validated by QA 2026-10-20: by design]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Organisation T has at least 3 analyses.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the GEO dashboard of organisation T is loaded |  | The Analysis table is displayed |
| 2 | Then a "Prompts" column is shown after Categories |  | "Prompts" header right after "Categories" |
| 3 | And the column adds up to the pool block | Sum of the Prompts column (Show more to list every analysis) | The sum equals U of the pool block "U / P" |
| 4 | And the value of an analysis equals its kept prompts across its markets | Analysis A (Manage Scope > Prompts: ticked rows) | The Prompts value of A equals its number of ticked rows |
| 5 | When the user sorts the Prompts column | Click the header twice | The analyses are ordered by Prompts descending then ascending; the Brand sort is removed |

#### TC-GEO-1240-005 - Dashboard counts follow an edited or deleted analysis

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that after an analysis is edited or deleted, the pool block and the Prompts column reflect it when the user comes back to the dashboard. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Existing brand analysis A of organisation T created with the new wizard (markets GB (EN) and FR (FR), at least 2 categories, at least 5 suggestions left unticked at creation, at least one past collection), opened from its dashboard in Manage Scope > Prompts. Organisation T also holds a disposable analysis D with S slots.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the dashboard shows the pool block "U / P" and the Prompts column of A = a |  | Values noted |
| 2 | When the user unticks 2 kept prompts in Manage Scope of A, saves and comes back to the dashboard |  | The Prompts column of A reads a - 2 and the pool block "U - 2 / P" |
| 3 | And the user deletes analysis D |  | D disappears from the list |
| 4 | Then the counts reflect the deletion |  | The pool block reads "U - 2 - S / P" and the column still adds up to it |

### GEO-1251 — Resolve competitors when no Visibility prompt is kept (Story, Ready for QA)

#### TC-GEO-1251-001 - Competitors are resolved in the background when no Visibility prompt is kept

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that for an analysis with no Visibility prompt kept for a market and category, the top competitors used in Competitive prompts are resolved by a background call when the analysis runs, invisible to the user (no competitor step in the wizard). Covers AC-1 and GEO-1233 AC-2 (delivered by this story). Backend only: verified through its observable output (competitors named in the Competitive results). Needs setup: a collection after creation.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). Every Visibility prompt of C1 unticked or deleted before creation; Competitive prompts kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user creates an analysis whose market and category keep Competitive prompts but no Visibility prompt | GB (EN) x C1: 0 Visibility, 10 Competitive kept | The wizard shows no competitor step and no visible competitor call |
| 2 | When the analysis runs | First collection | The collection completes |
| 3 | Then the Competitive results of GB (EN) x C1 name competitors | Competitive results / prompt details | Competitor brands are named in the Competitive prompts and answers of C1 |
| 4 | And the analysed brand's own sub-brands are not used as competitors | Brand "Decathlon" | No brand whose website belongs to Decathlon is listed as a competitor |

#### TC-GEO-1251-002 - Competitive prompts run with up to 5 competitors when there is no Visibility

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Competitive prompts of a market and category with no Visibility prompt are sent with up to 5 competitors named in place of the placeholders, and that their results appear on the dashboard like any other Competitive result. Covers AC-2. Needs setup: a collection after creation. [Sync 2026-10-22: Q-08 — the background call keeps at most 5 competitors (dev, GEO-1002 comment 860501) and the templates have 3 slots; Q-09 — Share of Voice of a Competitive-only analysis is the share of Competitive wins (dev, GEO-1502 comment 865950, bug Abandoned as works as designed). GEO-1249 Ready for QA: re-run.]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Analysis W created like TC-GEO-1251-001 (GB (EN) x C1 with Competitive prompts and no Visibility prompt) and collected once.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given analysis W has been collected once | Analysis W | The dashboard of W is available |
| 2 | When the user opens the Competitive results of GB (EN) x C1 |  | The Competitive prompts and answers are listed |
| 3 | Then each prompt names up to 5 competitors in place of the placeholders |  | No "[Competitor N]" placeholder left; 1 to 3 competitor names (one per template slot; up to 5 are resolved in the background); the prompt reads naturally, with no trailing "or ?" (GEO-1249) |
| 4 | And the results appear like any other Competitive result |  | Competitive charts of C1 are filled (AI Choice; Share of Voice = share of Competitive wins, only brands ranked #1 listed); Brand Rankings stays empty, as the Summary warning states: "No Visibility prompts are kept, so Visibility %, Average Position and Brand Rankings stay empty, and Share of Voice counts Competitive answers only." (Brand Prioritization not asserted, question to the dev) |

#### TC-GEO-1251-003 - Competitors come from the Visibility answers when they exist

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that for a market and category whose Visibility answers name competitors, the Competitive prompts use those competitors exactly as today and no background call is made. Covers AC-3. The "no background call" part needs log access (dev support); in the UI only the competitor source is checked. Needs setup: a collection after creation.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". A brand analysis V with Visibility and Competitive prompts kept for GB (EN) x C1, collected once. Log access to the collection job (dev support) for the last step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given analysis V keeps Visibility and Competitive prompts for GB (EN) x C1 and has been collected | Analysis V | The Visibility answers name competitor brands |
| 2 | When the user compares the competitors named in the Competitive prompts with those of the Visibility answers |  | Both lists are displayed |
| 3 | Then the Competitive prompts use the competitors from the Visibility answers |  | The named competitors come from the Visibility answers |
| 4 | And no background competitor call is made for GB (EN) x C1 | Collection logs | The logs show no background competitor resolution for that market and category |

#### TC-GEO-1251-004 - A failed competitor resolution never fails the analysis

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that when the background call fails or returns nothing usable, the Competitive prompts still run with the competitor names left out as today and the analysis completes. Covers AC-4. Needs setup: dev support to force the failure of the background call.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". An analysis F like TC-GEO-1251-001 (no Visibility prompt for GB (EN) x C1). Dev support forces the background competitor call to fail (or return nothing) for the next collection.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the background competitor call is forced to fail for analysis F |  | The failure is in place |
| 2 | When the analysis runs | Next collection | The collection is not left in progress |
| 3 | Then the Competitive prompts still run with the competitor names left out | Competitive results of GB (EN) x C1 | The Competitive prompts were sent without competitor names, reading naturally |
| 4 | And the analysis completes | Dashboard list | Analysis F is completed with its results |

#### TC-GEO-1251-005 - An analysis with only Competitive prompts completes

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that an analysis whose only kept prompts are Competitive (no Visibility, Sentiment or Brand Image prompt anywhere) completes with its Competitive results instead of staying in progress. Covers AC-5. "Sentiment" in the AC is read as the Reputation type of the wizard (flagged). Needs setup: a collection after creation.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (role allowed to create analyses), interface language British English (en-GB). Organisation switcher set to the pool test organisation T (e.g. QA-GEO) whose prompt pool is set in the back office; P = pool and U = slots used by its existing analyses, read at execution on the dashboard pool block "U / P". Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the Brand analysis card is selected on the Analysis Type step and Continue is clicked before Brand & Country; the wizard is opened with New Analysis on the GEO dashboard. Minimal scope: brand "Decathlon", 1 market United Kingdom - English (EN) shown as GB (EN), 1 category C1 kept from discovery (other detected categories removed) = 40 suggested prompts (10 Visibility + 10 Competitive + 10 Reputation for C1, 10 Brand Image). Every Visibility, Reputation and Brand Image prompt unticked before creation; only the 10 Competitive prompts of C1 kept.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user creates an analysis keeping only Competitive prompts | 10 Competitive prompts kept, 30 unticked | The analysis is created with 10 prompts |
| 2 | When the analysis runs | First collection | The collection runs |
| 3 | Then the analysis completes instead of staying in progress | Dashboard list | The analysis is completed |
| 4 | And it shows its Competitive results | Dashboard of the analysis | Competitive results are displayed, with competitors found in the background |

### GEO-1515 — Set the prompt pool of existing organisations from their old quota (Story, Ready for QA)

Story imported 2026-10-22 (STORY-45.14, 6 ACs). Only the TCs that QA can run without the developer are kept (user decision 2026-10-22): the PM review list (AC-5), no organisation left without a pool on 1.3 (AC-6 / AC-1) and the production check against the review list (AC-1/2/3/5). Not kept: the per-organisation staging checks of AC-1 to AC-4 (they need the staging review list from the developer). AC-4 (deleted organisations skipped) has no TC. Open PO question from the dev (#866014): are "categories" counted per country or per organisation? The expected values of TC-GEO-1515-001 and -003 depend on it. Impact: from 1.3 no organisation is left without a pool, so the "no pool" steps of TC-GEO-1230-006, TC-GEO-1230-009 (step 4) and TC-GEO-1239-013 become not applicable on staging.

#### TC-GEO-1515-001 - The PM review list gives each production organisation with its old quota, computed pool and usage

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that before the production run the PM receives the list of production organisations with their name, old quota values, computed pool and prompts used today, and that the organisations still on the default quota (8,000) are flagged. Covers AC-5. Source: attachment geo-1515-1-organisations.csv on GEO-1515 (dev comment 866014, 2026-10-21, read-only run on production 1.2).
- **Precondition:** Jira access to GEO-1515 (https://onclusive.atlassian.net/browse/GEO-1515) with the QA account. Release 1.3 not yet deployed in production.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the QA account is on the Jira ticket GEO-1515 |  | The ticket shows the attachment geo-1515-1-organisations.csv |
| 2 | When the attachment geo-1515-1-organisations.csv is opened |  | One row per live production organisation (84 rows on 2026-10-21), posted before the 1.3 production deploy |
| 3 | Then each row gives the name, the old quota values, the computed pool and the prompts used today |  | Columns organisation, countries, categories, visibility, competitive, perception, brand_image, computed_pool and prompts_used_today are filled for every row |
| 4 | And the computed pool follows the formula of AC-1 | Nabep 3, 2, 5, 5, 5, 5; Roche Italia 1, 1, 20, 20, 20, 10; QA-GEO 20, 20, 20, 20, 20, 20 | computed_pool = 105 for Nabep, 70 for Roche Italia, 24400 for QA-GEO |
| 5 | And the organisations still on the default quota are flagged | Column default_quota_8000 | Every row with 25 countries, 5 categories and 20 prompts per type is flagged t; on 2026-10-21 no row is on the default quota and every row is f |

#### TC-GEO-1515-002 - From release 1.3 no existing organisation is left without a pool

- **ACs:** AC-6, AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the conversion ships in release 1.3, while the old quota values still exist, so that from the 1.3 deploy no organisation is left "not configured" (dev comment 866014: "None is left not configured"). Covers AC-6 and AC-1.
- **Precondition:** Staging back office https://staging-geo.onclusive.com/geo/backoffice, QA account logged in with super admin rights, interface language British English (en-GB), Administration > Organizations reachable. Staging runs release 1.3 (conversion V2.10.7 applied by the deploy). GEO-1515 has fix version 1.3.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the GEO-1515 ticket has fix version 1.3 and staging runs release 1.3 | Fix version of GEO-1515 | Fix version = 1.3 |
| 2 | When the super admin opens Administration > Organizations |  | The organisations list loads with the Prompts column |
| 3 | And the super admin sorts the Prompts column and reads every page |  | Every organisation is reviewed |
| 4 | Then no active or suspended organisation shows "—" in the Prompts column |  | Every active or suspended row shows "U / P" with a pool P of at least 1; deleted organisations keep "—" (AC-4) |

#### TC-GEO-1515-003 - After the 1.3 production deploy the pools written match the review list

- **ACs:** AC-1, AC-2, AC-3, AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify, right after the 1.3 production deploy, that the pools written in production match the computed pools of the review list geo-1515-1-organisations.csv. Covers AC-1, AC-2, AC-3 and AC-5. Read-only check on production, nothing changed. Expected values follow AC-1 as written; they change if the PO changes the formula (dev comment 866014, point 3: categories per country or per organisation) or if a quota was edited in 1.2 before the deploy (then the post-deploy review run of dev is the reference). Staging coverage 2026-10-28: AC-1 to AC-4 verified on staging with the staging review files of the developer (GEO-1515 comment 868950; 7 converted organisations = computed pool). The production run is done by the PO after the deploy (GEO-1515 comment 869027).
- **Precondition:** Production back office https://geo.onclusive.com/geo/backoffice, QA account logged in with super admin rights, interface language British English (en-GB), Administration > Organizations reachable. Release 1.3 deployed in production. Review list geo-1515-1-organisations.csv (GEO-1515 attachment, 2026-10-21) at hand. Read-only: no pool is changed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given release 1.3 is deployed in production and the super admin is on Administration > Organizations |  | The organisations list loads with the Prompts column |
| 2 | When the super admin reads the Prompts column of the sampled organisations | Nabep, Roche Italia, Trial - Great Eastern, Onclusive - TechOps, QA-GEO | Each row shows "U / P" |
| 3 | Then each pool equals the computed pool of the review list | Nabep 105; Roche Italia 70; Trial - Great Eastern 140; Onclusive - TechOps 1600; QA-GEO 24400 | P = computed_pool for each sampled organisation |
| 4 | And the organisations full on day one show as full, not red | Nabep, Roche Italia | "105 / 105" and "70 / 70" in the default colour |
| 5 | And an organisation with no prompt shows its full pool | Onclusive - TechOps | "0 / 1600" |
| 6 | And no organisation shows "—" or a red value | Whole list, every page | No "—" row and no red Prompts value |
