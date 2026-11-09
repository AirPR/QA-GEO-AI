# GEO-152 Action Center / Target Sources + AI Engines Citation Sources — epic test case review (GEO-R1.2, regenerated 2026-10-07)

**Sources (read-only):** `apps/geo/GEO-R1.2/GEO-152/` (EPIC.md, epic-data.json, STORY_*.md, TASK_*.md, re-imported 2026-10-07; ACs unchanged in Jira, statuses updated). Reused bases: the per-story CSVs `testcases-coverage-story{GEO-1120,1125,1166,1168,1169,1173,1178,1183}.csv` (QA-validated corrections kept, then aligned on the accepted product changes below and on relative counts), and the 7 realigned TC-GEO-1117 TCs of the previous epic CSV (synced 2026-10-05). Wording reference: `testcases-tnr-GEO-152-action-center.csv` and `testcases-tnr-GEO-152-stories.csv` (TNR IDs not copied).

**Scope:** 13 Stories (GEO-1116 to GEO-1126, GEO-1183, GEO-1184) + 5 Tasks (GEO-1166, GEO-1168, GEO-1169, GEO-1173, GEO-1178). **Excluded:** GEO-1144 (converted to a Bug in Jira, `excludedType: Bug` in epic-data.json; its behaviour is kept as the FR/ES translation check of TC-GEO-1125-004 and the Excel Brief check of TC-GEO-1124-009). GEO-1184 is in **Backlog**: its TCs are written from its ACs and flagged **not yet delivered** (design pending).

**CSV:** `.claude/Data/output/csv/GEO-R1.2/testcases-coverage-epicGEO-152.csv` — 221 TCs, 1094 step rows (+1 header), 16 columns, `;` separator, fields quoted with doubled quotes when they hold `;` or `"`, UTF-8 without BOM, LF. One Cucumber step per row; case-level fields on the first row of each TC only. QA Parent = GEO-152, Components = GEO, QA Component = GEO Module, Labels empty, Test Type = Manual, QA Regression = Yes for Urgent/High.

## Summary

| Metric | Value |
|---|---|
| Test cases | 221 |
| Steps (CSV rows) | 1094 |
| Stories / Tasks | 13 / 5 |
| Coverage | happy path 133 · edge 45 · error 10 · state 33 |
| Priority | Urgent 3 · High 132 · Medium 76 · Low 10 |
| UI / Functional | UI 35 · Functional 186 |
| Smoke = Yes | 22 (max 2 per story/task) |
| QA Regression = Yes | 135 |
| ACs without TC | none |

| Story/Task | Type | Jira status | TCs | Steps | Smoke | Happy | Edge | Error | State | Base |
|---|---|---|---|---|---|---|---|---|---|---|
| GEO-1116 | Story | QA In Progress | 6 | 30 | 1 | 2 | 2 | 2 | 0 | generated from ACs (old epic TCs as reference) |
| GEO-1117 | Story | QA In Progress | 12 | 49 | 1 | 4 | 4 | 2 | 2 | previous epic CSV (7 TCs) + 5 new |
| GEO-1118 | Story | QA In Progress | 14 | 64 | 1 | 10 | 2 | 0 | 2 | generated from ACs (old epic TCs as reference) |
| GEO-1119 | Story | QA In Progress | 2 | 8 | 1 | 0 | 0 | 0 | 2 | generated from ACs (old epic TCs as reference) |
| GEO-1120 | Story | QA In Progress | 17 | 76 | 2 | 7 | 8 | 0 | 2 | story CSV |
| GEO-1121 | Story | Ready for QA | 3 | 11 | 1 | 0 | 0 | 1 | 2 | generated from ACs (old epic TCs as reference) |
| GEO-1122 | Story | Ready for QA | 5 | 22 | 0 | 1 | 0 | 0 | 4 | generated from ACs (old epic TCs as reference) |
| GEO-1123 | Story | Action Needed | 19 | 75 | 1 | 12 | 5 | 1 | 1 | generated from ACs (old epic TCs as reference) |
| GEO-1124 | Story | QA In Progress | 9 | 49 | 1 | 7 | 1 | 0 | 1 | generated from ACs (old epic TCs as reference) |
| GEO-1125 | Story | QA In Progress | 18 | 103 | 1 | 15 | 1 | 2 | 0 | story CSV + 1 new |
| GEO-1126 | Story | QA In Progress | 13 | 54 | 1 | 9 | 3 | 0 | 1 | generated from ACs (old epic TCs as reference) |
| GEO-1183 | Story | Ready for QA | 9 | 47 | 1 | 5 | 2 | 1 | 1 | story CSV |
| GEO-1184 | Story | Backlog (not yet delivered) | 5 | 21 | 1 | 3 | 1 | 0 | 1 | generated from ACs (old epic TCs as reference) |
| GEO-1166 | Task | Passed QA | 7 | 35 | 1 | 4 | 2 | 0 | 1 | story CSV |
| GEO-1168 | Task | Ready for QA | 29 | 168 | 2 | 21 | 3 | 0 | 5 | story CSV |
| GEO-1169 | Task | Ready for QA | 14 | 61 | 2 | 7 | 3 | 0 | 4 | story CSV |
| GEO-1173 | Task | Passed QA | 4 | 23 | 2 | 3 | 0 | 0 | 1 | story CSV |
| GEO-1178 | Task | QA In Progress | 35 | 198 | 2 | 23 | 8 | 1 | 3 | story CSV |

## Test data

| Organisation | Analysis | UUID | Used by |
|---|---|---|---|
| QA-GEO | Toyota, period "Last 7 days" (rolling; countries United States, France, Spain; categories Voitures hybrides > VUS > Voitures électriques on 2026-10-06) | `439acd96-0b1b-4da4-9e07-612d38e9783e` | Action Center, Overview / AI Engines Citation Sources and exports (most TCs) |
| QA-GEO | BYD, AI Engines = Gemini only (all-clear candidate, observed 2026-10-01/02) | `76aad462-a33f-4bdb-a925-2c1533e97a53` | All-clear TCs (Conditional) |
| Onclusive | Tesla / Nike / Lidl Nederland | `4419839a-317f-4f9d-8a8c-32184906a2aa` / `51f6eb92-0d7a-4c77-8fa8-e46d5d610309` / `1444d4ef-9555-4c35-bfd6-52af5128e180` | GEO-1183 |
| GEO Stress Test 2026-10 | AstraZeneca / Cruz Roja Argentina ("Pages could not be checked") | `458c20e9-1dcc-4e82-a05b-2fca56431396` / `a3eb5a05-3cfa-4132-a116-3fec6a9e0c87` | TC-GEO-1121-003 (Conditional) |
| — | PQL account assiya.benramdane+geo@onclusive.com (Lite plan) | — | TC-GEO-1125-011 (Conditional) |

Counts that drift (number of target sources, article counts, prompt counts, slide numbers) are never hard-coded in expected results: reused TCs now use letters (a missing, b negative, n prompts, N, M, X) or relations (equal, lower than or equal, never increasing). Reference sources of the reused GEO-1168 / GEO-1178 TCs (B, V, P, E2, S6) are picked at execution with an example domain.

## AC inventory and traceability

### GEO-1116 (Story, QA In Progress)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Three qualifying legs | GEO-1116-001 |
| AC-2 | Being ranked low does not qualify | GEO-1116-002 |
| AC-3 | Articles recorded with the source | GEO-1116-003 |
| AC-4 | Owned and competitor domains excluded | GEO-1116-004 |
| AC-5 | Not bounded by the AI Citation Sources cap | GEO-1116-005 |
| AC-6 | Model-declared URLs never qualify a source | GEO-1116-006 |

### GEO-1117 (Story, QA In Progress)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Every article, no cap | GEO-1117-001 |
| AC-2 | What the check determines | GEO-1117-002, GEO-1117-012 |
| AC-3 | Products discovered on the page count | GEO-1117-003 |
| AC-4 | Verdicts persisted, never re-judged | GEO-1117-008 |
| AC-5 | False positives kept, never counted | GEO-1117-004 |
| AC-6 | False positives persisted like failing articles | GEO-1117-009 |
| AC-7 | What is kept, 140-character passage | GEO-1117-005, GEO-1117-012 |
| AC-8 | Unfetchable articles count for nothing | GEO-1117-006 |
| AC-9 | Zero failing articles: source disappears | GEO-1117-007 |
| AC-10 | What counts as negative | GEO-1117-010 |
| AC-11 | Check that could not be completed | GEO-1117-011 |

### GEO-1118 (Story, QA In Progress)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Order and tie-break | GEO-1118-001 |
| AC-2 | Source type filter | GEO-1118-002 |
| AC-3 | Two views, one fixed order | GEO-1118-003 |
| AC-4 | What a card shows | GEO-1118-004, GEO-1118-014 |
| AC-5 | Where the badges come from | GEO-1118-005, GEO-1118-014 |
| AC-6 | Three verdict tabs | GEO-1118-006 |
| AC-7 | The "All" tab | GEO-1118-007 |
| AC-8 | A verdict tab ranks on that verdict alone | GEO-1118-008 |
| AC-9 | Tab membership | GEO-1118-009 |
| AC-10 | Badges do not change per tab | GEO-1118-010 |
| AC-11 | Empty tab | GEO-1118-011 |
| AC-12 | Logo and neutral placeholder | GEO-1118-012 |
| AC-13 | Top ten, then an explicit control | GEO-1118-013 |

### GEO-1119 (Story, QA In Progress)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | No partial list, ever | GEO-1119-001 |
| AC-2 | Transition without a page reload | GEO-1119-002 |

### GEO-1120 (Story, QA In Progress)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Recompute, do not filter; ranks renumbered | GEO-1120-001, GEO-1120-002 |
| AC-2 | Source type filter | GEO-1120-003, GEO-1120-004 |
| AC-3 | Filter lists only what is present | GEO-1120-005, GEO-1120-006, GEO-1120-016 |
| AC-4 | Date range membership | GEO-1120-007, GEO-1120-017 |
| AC-5 | Multi-scope articles | GEO-1120-008 |
| AC-6 | Empty sources disappear | GEO-1120-009 |
| AC-7 | Filters first, then the tab | GEO-1120-010 |
| AC-8 | No effect on the export | GEO-1120-011 |
| AC-9 | 7-day floor of the source window | GEO-1120-012, GEO-1120-013, GEO-1120-014, GEO-1120-015 |

### GEO-1121 (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | All-clear instead of an empty list | GEO-1121-001, GEO-1121-003 |
| AC-2 | The message alone | GEO-1121-002 |

### GEO-1122 (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Any scope change, next scheduled execution | GEO-1122-001 |
| AC-2 | New scope verified under the same rules | GEO-1122-005 |
| AC-3 | Page re-checked on every run | GEO-1122-003 |
| AC-4 | Staleness window overrides the conditional response | GEO-1122-004 |
| AC-5 | List covers the full scope of the run | GEO-1122-002 |

### GEO-1123 (Story, Action Needed)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Panel open and close | GEO-1123-001, GEO-1123-018 |
| AC-2 | Panel ignores the active verdict tab | GEO-1123-002 |
| AC-3 | Brief is one deterministic sentence | GEO-1123-003, GEO-1123-016 |
| AC-4 | No zero counts | GEO-1123-004 |
| AC-5 | Singular forms | GEO-1123-005 |
| AC-6 | In-Brief visual treatment | GEO-1123-006 |
| AC-7 | Not-named articles show no passage | GEO-1123-007 |
| AC-8 | Verbatim passage | GEO-1123-008, GEO-1123-017, GEO-1123-019 |
| AC-9 | Citing engines per article | GEO-1123-009 |
| AC-10 | Two evidence tabs | GEO-1123-010 |
| AC-11 | What a positive article shows | GEO-1123-011 |
| AC-12 | No positive articles, no tab | GEO-1123-012 |
| AC-13 | Panel header counts | GEO-1123-013 |
| AC-14 | Positive articles change nothing outside the panel | GEO-1123-014 |
| AC-15 | Failing prompts carry no outcome | GEO-1123-015 |

### GEO-1124 (Story, QA In Progress)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Always the "All" tab | GEO-1124-001 |
| AC-2 | Recomputed inside the export scope | GEO-1124-002 |
| AC-3 | All categories and all source types | GEO-1124-003 |
| AC-4 | Excel carries the full evidence (stacked tables) | GEO-1124-004, GEO-1124-009 |
| AC-5 | PowerPoint: brief for the top three sources only | GEO-1124-005, GEO-1124-010 |
| AC-6 | (deleted by the PM 2026-09-17: verifying state) | — (AC deleted) |
| AC-7 | All-clear state | GEO-1124-007 |
| AC-8 | 7-day source window applies to the export | GEO-1124-008 |

### GEO-1125 (Story, QA In Progress)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Section and modal carry three columns | GEO-1125-001, GEO-1125-002, GEO-1125-003, GEO-1125-004 |
| AC-2 | Favorability is not a sort key | GEO-1125-005, GEO-1125-006 |
| AC-3 | No favorability badge anywhere | GEO-1125-007, GEO-1125-008 |
| AC-4 | Exports drop it too | GEO-1125-009, GEO-1125-010, GEO-1125-018 |
| AC-5 | Lite (PQL) result table too | GEO-1125-011 |
| AC-6 | Removed, not hidden | GEO-1125-012, GEO-1125-013 |
| AC-7 | Everything else untouched | GEO-1125-014, GEO-1125-015, GEO-1125-016, GEO-1125-017 |

### GEO-1126 (Story, QA In Progress)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Two sections in order, count block gone | GEO-1126-001 |
| AC-2 | Related Prompts preview | GEO-1126-002 |
| AC-3 | Cited URLs preview | GEO-1126-003, GEO-1126-007 |
| AC-4 | Prompts modal | GEO-1126-004 |
| AC-5 | Prompts modal tabbed by question type | GEO-1126-005 |
| AC-6 | A prompt appears once | GEO-1126-006 |
| AC-7 | Perception tab lists questions | GEO-1126-011 |
| AC-8 | Search additive to the tab | GEO-1126-008 |
| AC-9 | Counts agree | GEO-1126-010 |
| AC-10 | Empty tab | GEO-1126-009 |
| AC-11 | Panel respects the active scope, no 7-day floor | GEO-1126-012, GEO-1126-013 |

### GEO-1183 (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | caranddriver.com passage contains Tesla or Cybertruck, highlighted | GEO-1183-001 |
| AC-2 | No passage missing the brand (Tesla, Nike, Lidl NL) | GEO-1183-002, GEO-1183-003, GEO-1183-004 |
| AC-3 | Verbatim parts, "…" joins, 140 characters | GEO-1183-005, GEO-1183-006, GEO-1183-007, GEO-1183-008 |
| AC-4 | Verdicts unchanged after the re-judge | GEO-1183-009 |

### GEO-1184 (Story, Backlog (not yet delivered))

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | "Most prompts" orders cards by prompt count | GEO-1184-001 |
| AC-2 | Card count = prompts listed in the panel | GEO-1184-002 |
| AC-3 | Default sort and export unchanged | GEO-1184-003 |
| — | Design / requirement checks (no numbered AC) | GEO-1184-004, GEO-1184-005 |

### GEO-1166 (Task, Passed QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Footer sticky at every scroll position | GEO-1166-001 |
| AC-2 | Next/Previous swaps data in place and syncs the selection | GEO-1166-002, GEO-1166-003 |
| AC-3 | Counter shows the position in the filtered scope | GEO-1166-004 |
| AC-4 | First/last items disable the button | GEO-1166-005, GEO-1166-006 |
| AC-5 | Works in card view and list view | GEO-1166-007 |

### GEO-1168 (Task, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Visibility-only: Lack of visibility tab only | GEO-1168-001 |
| AC-2 | Perception-only: Negative perception tab only | GEO-1168-002 |
| AC-3 | Both: two tabs, Lack of visibility first and selected | GEO-1168-003 |
| AC-4 | Tab count = article rows | GEO-1168-004 |
| AC-5 | No positive article in the panel | GEO-1168-005 |
| AC-6 | Previous/Next rebuilds the tabs | GEO-1168-006 |
| AC-7 | One badge: one line and one chip | GEO-1168-007 |
| AC-8 | Two badges: two lines, two badges, two chips | GEO-1168-008 |
| AC-9 | Same counts on card, chips and tabs; total drives ranking | GEO-1168-009 |
| AC-10 | 12 cards then "Show X more sources" | GEO-1168-010, GEO-1168-011 |
| AC-11 | Table: 10 rows then "Show X more sources" | GEO-1168-012 |
| AC-12 | Category filter in left-menu order | GEO-1168-013 |
| AC-13 | Category selection recalculates | GEO-1168-014 |
| AC-14 | Category, Type and tabs combine; filtered empty state | GEO-1168-015, GEO-1168-016 |
| AC-15 | No "Cited" count anywhere | GEO-1168-017 |
| AC-16 | No Key Takeaways and no header meta line | GEO-1168-018 |
| AC-17 | Verifying state: title and spinner only | GEO-1168-019 |
| AC-18 | All clear copy | GEO-1168-020 |
| AC-19 | No Action column | GEO-1168-021 |
| AC-20 | Export (PPT/PDF) split copy, no Cited column | GEO-1168-022 |
| AC-21 | Strings in the four locales | GEO-1168-023, GEO-1168-024, GEO-1168-025, GEO-1168-026 |
| AC-22 | Spanish uses usted | GEO-1168-027 |
| AC-23 | Unused keys removed | GEO-1168-028 |
| AC-24 | Language switch updates every surface | GEO-1168-029 |

### GEO-1169 (Task, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Top X domains by Frequency selected, all GROUNDED URLs verified | GEO-1169-001, GEO-1169-002 |
| AC-2 | Frequency = AI Citation Sources Frequency | GEO-1169-003, GEO-1169-004 |
| AC-3 | Source cited only in positive answers can be selected | GEO-1169-005, GEO-1169-006 |
| AC-4 | X configurable without a release | GEO-1169-007 |
| AC-5 | No missing/negative article: not shown; all clear | GEO-1169-008, GEO-1169-009 |
| AC-6 | Prompts = every prompt citing the source, one row per prompt | GEO-1169-010, GEO-1169-011, GEO-1169-012 |
| AC-7 | Idempotent per snapshot, done marker kept | GEO-1169-013 |
| AC-8 | Selection log content | GEO-1169-014 |

### GEO-1173 (Task, Passed QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Action Center is the last slide of the PPT | GEO-1173-001, GEO-1173-004 |
| AC-2 | Action Center is the last page of the PDF | GEO-1173-002, GEO-1173-004 |
| AC-3 | Export order follows the GEO tabs (derived) | GEO-1173-003 |

### GEO-1178 (Task, QA In Progress)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Missing only: Lack of visibility tab and line | GEO-1178-001 |
| AC-2 | Negative only: Negative perception tab and line | GEO-1178-002 |
| AC-3 | Both: two tabs, first selected; prompts unchanged on switch | GEO-1178-003, GEO-1178-004, GEO-1178-033 |
| AC-4 | Tab count = articles = card line | GEO-1178-005 |
| AC-5 | Explanation line uses the brand | GEO-1178-006 |
| AC-6 | A prompt appears once, one icon per engine | GEO-1178-009 |
| AC-7 | Engine tab filters and recalculates "Show X more prompts" | GEO-1178-013 |
| AC-8 | Engine tabs follow the AI Engines filter | GEO-1178-014 |
| AC-9 | 6 prompts then "Show X more prompts" | GEO-1178-015, GEO-1178-016, GEO-1178-030 |
| AC-10 | Previous/Next rebuilds tabs and engine filter | GEO-1178-017, GEO-1178-031 |
| AC-11 | New strings in the four locales | GEO-1178-018, GEO-1178-019, GEO-1178-020, GEO-1178-021, GEO-1178-029 |
| AC-12 | Page name "Action Center" / "Action Centre" | GEO-1178-022, GEO-1178-023, GEO-1178-024 |
| AC-13 | English export header "ACTION CENTER · TARGET SOURCES" | GEO-1178-025, GEO-1178-026, GEO-1178-027 |
| — | Design / requirement checks (no numbered AC) | GEO-1178-007, GEO-1178-008, GEO-1178-010, GEO-1178-011, GEO-1178-012, GEO-1178-028, GEO-1178-032, GEO-1178-034, GEO-1178-035 |

## AC / app gaps (accepted changes applied; the AC text is outdated)

| Story / AC | AC says | Accepted behaviour asserted | Source | TC(s) |
|---|---|---|---|---|
| GEO-1116 AC-1, AC-2, AC-5 | Suspect pool = sources cited in gap answers (three legs), never limited to the capped AI Citation Sources list | Pool = top 100 domains by citation Frequency (X configurable); legs no longer bound the pool | GEO-1169 | 1116-001, 1116-002, 1116-005 |
| GEO-1117 AC-5 / GEO-1123 AC-10 to AC-12 | Panel shows positive articles in a "Positive articles" tab | No positive article anywhere in the panel; positives checked via the source-detail API | GEO-1168 | 1117-004, 1117-009, 1123-010 to 012, 1168-005 |
| GEO-1118 AC-1, AC-4, AC-7, AC-8 | "N failing articles" + "Cited N× in gap answers"; tie-break by badges then citations | "Not visible in N articles" / "Negative perception in N articles", total = missing + negative; no Cited line; tie-break not visible on screen | GEO-1168 | 1118-001, 004, 007, 008 |
| GEO-1118 AC-2 | Default entry "All source types" | "All types" + a Category filter "All categories" | GEO-1168 | 1118-002, 1120-003/005/006 |
| GEO-1118 AC-13 | Top ten, then a control | 12 cards then "Show X more sources" (X = total - 12); table 10 rows | GEO-1168 | 1118-013, 1168-010 to 012 |
| GEO-1119 AC-1 | Plain verifying state | Title + spinner, no progress counter, no paragraph | GEO-1168 | 1119-001, 1168-019 |
| GEO-1120 AC-1 | Citation counts recomputed in scope | Citation count no longer displayed, recomputation not observable | GEO-1168 | 1120-001 |
| GEO-1121 DAC1 | "All clear, no verified source problems" + long body | "All clear" / "Every article used by AI engines describes your brand positively."; distinct "Pages could not be checked" state when nothing was checked | GEO-1168, GEO-1194 | 1121-001 to 003, 1168-020 |
| GEO-1123 AC-3 to AC-6 | Brief (Key Takeaways, In-Brief treatment) in the panel | No brief block in the panel; the deterministic sentence survives in the Excel Brief column (EN template, FR/ES translated) | GEO-1168, GEO-1162 | 1123-003 to 006, 1123-016, 1124-009 |
| GEO-1123 AC-7 | Per-article "No mention of {brand} anywhere on this page" | One tab line "None of these articles mentions {brand} anywhere on the page." | GEO-1178 | 1123-007, 1178-001/006 |
| GEO-1123 AC-13 | Header states failing, positive and cited counts | No header meta line | GEO-1168 | 1123-013, 1168-018 |
| GEO-1123 AC-15 | Question, engine and country per row | One row per prompt with every citing engine icon and the market flag; no duplicate even ignoring case (GEO-1219 open) | GEO-1178, GEO-1167 | 1123-015, 1178-009, 1169-011 |
| GEO-1124 AC-5 / DAC1 | Slide table "# · Source · Type · Action · Failing articles · Cited" | 4 columns "# \| Source \| Type \| Failing articles" (EN) / "Articles problématiques" (FR) / "Artículos problemáticos" (ES); Cited removed on purpose; GEO-1222 open (header currently "Articles" / "Artículos") | GEO-1160, GEO-1168, GEO-1222 | 1124-005, 1124-010, 1168-017, 1168-022 |
| GEO-1124 AC-1 / GEO-1173 | Section position not specified / middle of the deck | Last slide/page, eyebrow "ACTION CENTER · TARGET SOURCES" (41 slides on Toyota on 2026-10-06); category sections in left-nav order | GEO-1173, GEO-1189 | 1124-001, 1173-001 to 004 |
| GEO-1125 DAC1 / AC-1 | "LLM Engines Citation Sources" | "AI Engines Citation Sources", subtitle "See which domains AI Engines reference most often for your brand and niche" (app, XLSX, Lite page); exactly 3 columns, no chevron column | GEO-1196, GEO-1200, GEO-1198 | 1125-001, 002, 009, 011 |
| GEO-1125 AC-4 | Three columns in the exports | Plus: PPTX/PDF Sources slides show 10 rows and the domain total equals the app "All domains" count; XLSX types match the app | GEO-1199, GEO-1197 | 1125-009, 1125-018 |
| GEO-1126 AC-3 | "Cited URLs" / "All Cited URLs" | "Sources" / "All sources (n)" | GEO-625 | 1126-003, 1126-007 |
| GEO-1178 engine tabs | With 2 or 3 engines icon + name + count | From 3 engines icon + count only (name in the tooltip); 1 or 2 engines icon + name + count; order All, ChatGPT, Gemini, Perplexity | GEO-1187 | 1178-010, 011, 012, 035 |
| GEO-1178 AC-12 | en-GB "Action Centre" | en-GB "Action Center" (same as en-US) | GEO-1188 | 1178-023, 1178-029 |

## Open points (need a decision — flagged, not guessed)

- OP-1 [GEO-1124 AC-4, TC-GEO-1124-004]: after GEO-1168 (positive articles out of the panel, "no Cited count on any surface"), does the Excel Target Sources sheet still carry the positive articles table and the "Citations in qualifying answers" column? The TC records them, it does not assert them.
- OP-2 [GEO-1124 AC-5, TC-GEO-1124-005]: do the top 3 cards of the PPTX/PDF slide still carry the brief sentence, or only the split card lines of GEO-1168? Recorded, not asserted.
- OP-3 [GEO-1123 AC-3 to AC-5, TC-GEO-1123-003/004/005/016]: the deterministic brief now lives only in the Excel Brief column. Is the positive part (", and {p} articles that cover the brand positively") still appended now that positives are hidden from the panel? The TCs accept both endings and check the failing part, zero counts and singular forms.
- OP-4 [GEO-1118 AC-1 / AC-8]: the tie-break (badges, then citations) cannot be read on screen since the citation count is hidden (GEO-1168), and GEO-1184 describes the current code as "failing articles, then badges, then citations, then domain". Confirm the tie-break or accept it as untestable in the UI.
- OP-5 [GEO-1118 AC-8]: on a verdict tab, should a two-badge card show only the line of the tab or both lines? Not specified after GEO-1168; only the order is asserted.
- OP-6 [GEO-1118 AC-11, GEO-1168 AC-14, GEO-1126 AC-10]: empty verdict tab, filtered empty state and empty prompts tab have no specified copy and no staging data (the Type filter resets to "All types" when it no longer matches, observed 2026-10-01). TCs are Conditional and record the copy.
- OP-7 [GEO-1121, GEO-1124 AC-7, GEO-1168 AC-18, GEO-1169 AC-5, GEO-1173 TC-004]: no genuine all-clear analysis exists on staging (BYD Gemini-only is a candidate only). Create a dedicated all-clear report?
- OP-8 [GEO-1122]: the scope-change TCs alter a shared daily analysis (Toyota); a disposable analysis is preferred. The staleness window value (7 days proposed 2026-09-16) still awaits PM confirmation (TC-GEO-1122-004).
- OP-9 [GEO-1123 AC-1]: the panel is a modal dialog; clicking another card while the panel is open closes it instead of switching (observed 2026-10-05). Is switching expected?
- OP-10 [GEO-1126 AC-3/AC-4, TC-GEO-1126-004/007]: no AC specifies what "All sources (n)" opens (design DAC4 only), and the English title of the prompts modal ("All related Prompts - {domain}") was last read in French; to re-check.
- OP-11 [GEO-1168 AC-21, TC-GEO-1168-024/025/026]: the FR/ES page subtitle and the FR all-clear body differed from the ticket table on 2026-10-01 ("triées par nombre", "Fuentes a las que dirigirse", "positivement"). The TCs keep the ticket strings: fix the strings or the ticket.
- OP-12 [GEO-1178 AC-11 / GEO-1168 AC-23, TC-GEO-1178-029 / 1168-028]: must the keys no longer used also be deleted from the locale files (static review)?
- OP-13 [GEO-1120 AC-9]: the "Last 7 days" preset spanned 8 snapshots on 2026-10-06, so "Last analysis" and "Last 7 days" totals may differ by one snapshot (TC-GEO-1124-008 records any difference); the citation counter aggregation across pooled days and the short-history wording remain open PM questions.
- OP-14 [GEO-1173]: the task has no numbered AC; AC-1 to AC-3 are derived from its single sentence (last slide in PPT, last page in PDF, order of the GEO tabs).
- OP-15 [GEO-1184, Backlog]: wording ("Most prompts", "Used in N prompts"), sort control position, persistence of the sort across tabs and its effect on the export are pending design; TC-GEO-1184-003 assumes the export ignores the on-screen sort. All 5 TCs are blocked until delivery.
- OP-16 [GEO-1116 AC-4]: a group domain owning competitor brands (e.g. stellantis.com, listed 2026-09-28) is not specified as a competitor family domain; TC-GEO-1116-004 checks only the competitor domains of the analysis.
- OP-17 [GEO-1134]: the 8 localisation TCs TC-GEO-1134-L001 to L008 of the previous epic CSV are not part of the 18 stories/tasks in scope (GEO-1134 is tracked outside this epic) and were dropped from this file. Move them to a dedicated GEO-1134 CSV if they are still needed.
- OP-18 [GEO-1201 open, GEO-1183 AC-3]: passages are still cut mid-word without "…"; TC-GEO-1183-006 keeps the AC-3 "…" join as the expected result and fails until GEO-1201 is fixed. GEO-1222 (open) makes the EN/ES checks of TC-GEO-1124-010 fail as well; GEO-1219 (open) can fail TC-GEO-1178-009 / 1123-015.

## Back-end only and conditional TCs

- **Back-end verifiable only (SKIP in UI runs):** GEO-1116-001, GEO-1116-002, GEO-1116-006, GEO-1122-003, GEO-1122-004, GEO-1169-001, GEO-1169-002, GEO-1169-003, GEO-1169-004, GEO-1169-005, GEO-1169-007, GEO-1169-013, GEO-1169-014.
- **Conditional (data or timing dependent):** GEO-1117-011, GEO-1118-011, GEO-1119-001, GEO-1119-002, GEO-1121-001, GEO-1121-002, GEO-1121-003, GEO-1122-001, GEO-1122-002, GEO-1122-005, GEO-1124-007, GEO-1125-011, GEO-1126-009, GEO-1183-009, GEO-1168-010, GEO-1168-016, GEO-1168-019, GEO-1168-020, GEO-1168-026, GEO-1169-009, GEO-1173-004, GEO-1178-016.
- **Blocked by data:** GEO-1178-012 (no source with 4 or more engines on staging). **Blocked by delivery:** GEO-1184-001 to 005 (Backlog).
- **ACs filtered as technical:** none of the functional AC lists contains technical bullets (the Technical Part of every story lives in the repository spec). Not turned into TCs: GEO-1124 AC-6 (deleted by the PM on 2026-09-17), the GEO-1166 implementation notes (keyboard ArrowLeft/ArrowRight binding, analytics event `action_center.source_nav`), GEO-1183 implementation notes (prompt version bump).

## Diff vs the previous epic CSV

Previous file: 97 TCs (incl. 10 tagged OBSOLETE and 8 GEO-1134 TCs), 399 step rows; no TC was keyed on GEO-1166, 1168, 1169, 1173, 1178, 1183 or 1184. New file: 221 TCs, 1094 step rows.

| Story/Task | Old TCs | New TCs | Added | Removed | Kept ID (content updated) | Notes |
|---|---|---|---|---|---|---|
| GEO-1116 | 6 | 6 | 0 | 0 | 6 | Regenerated from ACs; AC-1/2/5 realigned on GEO-1169; AC-3/4 rewritten as UI checks on Toyota. |
| GEO-1117 | 7 | 12 | 5 | 0 | 7 | 7 realigned TCs reused (006 + GEO-1164 step); added 008 (AC-4), 009 (AC-6), 010 (AC-10), 011 (AC-11), 012 (GEO-1158/1191). Smoke moved to 002. |
| GEO-1118 | 14 | 14 | 0 | 0 | 14 | Regenerated on current UI (GEO-1168 split lines, All types, 12 cards); 014 now = DAC7 two-badge layout (old 014 "count per type" merged into 002). |
| GEO-1119 | 2 | 2 | 0 | 0 | 2 | Regenerated (GEO-1168 verifying state content). |
| GEO-1120 | 9 | 17 | 8 | 0 | 9 | Replaced by the story CSV: IDs 001-009 reused with a different meaning, 010-017 added; aligned on GEO-1168 (All types, no Cited, All Countries). |
| GEO-1121 | 2 | 3 | 1 | 0 | 2 | Regenerated with the GEO-1168 copy; added 003 (GEO-1194 "Pages could not be checked"). |
| GEO-1122 | 4 | 5 | 1 | 0 | 4 | Kept 001-004; added 005 (AC-2, was uncovered). |
| GEO-1123 | 17 | 19 | 2 | 0 | 17 | 10 OBSOLETE TCs rewritten on the accepted behaviour (brief checked on the Excel Brief column, no positive tab, no meta line); added 018 (GEO-1161) and 019 (GEO-1202). |
| GEO-1124 | 7 | 9 | 2 | 0 | 7 | Regenerated (last slide, 4-column table, ALL tab, export scope); added 009 (GEO-1162 FR/ES Brief) and 010 (GEO-1160/1222 PDF headers). |
| GEO-1125 | 7 | 18 | 11 | 0 | 7 | Replaced by the story CSV (old IDs 001-007 reused with a different meaning); aligned on GEO-1198/1196/1200/1144/1197; added 018 (GEO-1199). |
| GEO-1126 | 14 | 13 | 0 | GEO-1126-014 | 13 | Regenerated with correct AC mapping (old IDs kept, AC references fixed) and GEO-625 labels; 014 removed (duplicate of 001). |
| GEO-1183 | 0 | 9 | 9 | 0 | 0 | New in the epic file (story CSV reused, aligned on accepted changes and relative counts). |
| GEO-1184 | 0 | 5 | 5 | 0 | 0 | Generated from its 3 ACs + 2 requirement rules (tab/scope, ties); not yet delivered (Backlog). |
| GEO-1166 | 0 | 7 | 7 | 0 | 0 | New in the epic file (story CSV reused, aligned on accepted changes and relative counts). |
| GEO-1168 | 0 | 29 | 29 | 0 | 0 | New in the epic file (story CSV reused, aligned on accepted changes and relative counts). |
| GEO-1169 | 0 | 14 | 14 | 0 | 0 | New in the epic file (story CSV reused, aligned on accepted changes and relative counts). |
| GEO-1173 | 0 | 4 | 4 | 0 | 0 | New in the epic file (story CSV reused, aligned on accepted changes and relative counts). |
| GEO-1178 | 0 | 35 | 35 | 0 | 0 | New in the epic file (story CSV reused, aligned on accepted changes and relative counts). |
| GEO-1134 | 8 | 0 | 0 | GEO-1134-L001, GEO-1134-L002, GEO-1134-L003, GEO-1134-L004, GEO-1134-L005, GEO-1134-L006, GEO-1134-L007, GEO-1134-L008 | 0 | Removed: out of the 18-item scope (see OP-17). |

## Test cases

### GEO-1116 — Story (QA In Progress)

#### TC-GEO-1116-001 - Sources cited on the three gap legs are verified when they rank in the top 100 by Frequency

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that sources cited in a visibility answer where the brand is entirely absent, in a competitive answer where the brand is not chosen, or in a negative concept answer are selected and sent to verification. Covers AC-1. Updated 2026-10-07 per GEO-1169: the pool is now the top 100 domains by citation Frequency, so the three legs no longer bound the selection (AC/app gap, accepted change); this TC checks that gap-leg sources inside the top 100 are still selected.
- **Precondition:** A completed snapshot of an analysis with its suspect selection done. Reference data identifies three GROUNDED, non-owned, non-competitor domains ranked in the top 100 by Frequency: domain V cited in a visibility answer where the brand is absent, domain C cited in a competitive answer where the brand is not the winner, domain N cited in a perception answer with a negative concept. Back-end access to the selection / verification job of the snapshot is available (job output, logs or database read access). Back-end verifiable only: SKIP in UI runs.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed snapshot holding domains V, C and N in its top 100 by Frequency | Domains V, C, N from reference data | The three domains and their cited URLs are known |
| 2 | When the suspect selection runs over that snapshot |  | The selection run completes and sets its SUSPECT_SELECTION done marker |
| 3 | Then domains V, C and N are in the selected domain list |  | The three domains appear in the selected domain list |
| 4 | And every GROUNDED cited URL of V, C and N is sent to verification |  | The URLs cited in the gap answers are in the list of URLs sent to verification |

#### TC-GEO-1116-002 - Brand present but not ranked first no longer decides the selection

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a source cited only in visibility answers where the brand is present but not ranked first is not excluded by the leg rule. Covers AC-2. Updated 2026-10-07 per GEO-1169: AC-2 described the visibility leg of the failing-prompt pool; with the top 100 by Frequency pool such a source is selected when it ranks in the top 100 (AC/app gap, accepted change). Back-end only.
- **Precondition:** A completed snapshot of an analysis with its suspect selection done. Reference data identifies domain R (GROUNDED, non-owned, non-competitor, ranked in the top 100 by Frequency) cited only in visibility answers where the brand is present but not ranked first. Back-end access to the selection / verification job of the snapshot is available (job output, logs or database read access). Back-end verifiable only: SKIP in UI runs.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed snapshot where domain R is cited only in visibility answers where the brand is present but not ranked first | Domain R from reference data | Domain R is in the top 100 of the reference ranking by Frequency |
| 2 | When the suspect selection runs over that snapshot |  | The selection run completes |
| 3 | Then domain R is in the selected domain list |  | Domain R is selected through its Frequency, not excluded by the visibility leg |
| 4 | And its GROUNDED cited URLs are sent to verification |  | Every GROUNDED cited URL of domain R is in the list of URLs sent to verification |

#### TC-GEO-1116-003 - A target source carries the specific articles it was cited on

- **ACs:** AC-3 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each target source is recorded with the specific article pages on which AI engines cited it, so its details panel lists article URLs of that domain, not only the domain. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards on the ALL tab |
| 2 | When the user opens the details panel of the source ranked #1 | Source #1 (e.g. frandroid.com) | The details panel opens with the header "#1 · {domain}" |
| 3 | Then the user reads the article rows of the selected tab |  | Each row shows its article title (when the page has one) and a URL of the same domain as the source, shown without protocol |
| 4 | And the user clicks "Show N more articles" if it is displayed |  | All the articles of the tab are listed and their number equals the tab count |
| 5 | When the user opens the first article URL in a new browser tab | First article of the tab | A specific article page of the source domain opens, not only the home page of the domain |

#### TC-GEO-1116-004 - Owned brand and competitor domains are never listed as target sources

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that a domain owned by the analysed brand (every country domain of the brand family, compared on the registrable name by strict equality) or by a competitor of the analysis is never a target source, even when AI engines cite it, while a media domain carrying the brand as a subdomain (e.g. toyota.caranddriver.com) stays a legitimate target source. Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. The competitor brands of the analysis are read on its Overview before the test.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The Overview is displayed with the section "AI Engines Citation Sources" |
| 2 | When the user clicks "All domains" and searches "toyota" | Search field: toyota | The modal lists the Toyota-owned domains cited by AI engines, e.g. toyota.fr, toyota.es, toyota.com (record them) |
| 3 | And the user searches the domains of the competitors of the analysis | Competitor domains of the analysis, e.g. hyundai.com, honda.com, peugeot.fr | The competitor domains cited by AI engines are listed (record them) |
| 4 | When the user opens the Action Center and clicks "Show N more sources" until all sources are listed | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | All target sources are listed and the "Show N more sources" button is no longer displayed |
| 5 | Then the user searches the Toyota-owned domains in the list | Ctrl+F "toyota." and each recorded domain | No target source has a domain whose registrable name is "toyota" (toyota.fr, toyota.es, toyota.com, toyota.co.uk...) |
| 6 | And the user searches each recorded competitor domain in the list | Each competitor domain recorded in step 3 | None of the recorded competitor domains is listed as a target source |
| 7 | And the user checks media domains carrying the brand name as a subdomain | e.g. toyota.caranddriver.com (only if cited in the window) | A media domain whose registrable name is not "toyota" is not excluded because of the brand subdomain (record "not cited" if absent) |

#### TC-GEO-1116-005 - Target Sources is not limited to the domains shown in AI Engines Citation Sources

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the target list is not bounded by the capped list of domains that AI Engines Citation Sources displays. Covers AC-5. Updated 2026-10-07 per GEO-1169: the pool is the top 100 domains by Frequency of the snapshot, so AC-5 "never limited to the capped list" now reads "not limited to the rows displayed on the Overview" (AC/app gap, accepted change: the pool is capped at X = 100 domains).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The section "AI Engines Citation Sources" shows its first domain rows and the "All domains (M)" button |
| 2 | And the user records the domains shown in the section table |  | The domains displayed in the table are recorded |
| 3 | When the user opens the Action Center and clicks "Show N more sources" until all sources are listed | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | All target sources are listed; the user records their total S |
| 4 | Then the total of target sources is higher than the number of rows of the section table |  | S is higher than the number of domain rows displayed in the section table and at most 100 (X) |
| 5 | And at least one target source is not in the rows displayed in the section table |  | At least one target source domain is absent from the recorded section rows |

#### TC-GEO-1116-006 - Model-declared URLs are excluded at selection

- **ACs:** AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that a cited URL the model wrote from memory (not opened during web search) never qualifies a source and is excluded at selection by the GROUNDED whitelist, not left to fail at fetch; rows with an unknown provenance are excluded too. Covers AC-6. Back-end only.
- **Precondition:** A completed snapshot of an analysis with its suspect selection done. The snapshot contains at least one model-declared (non-GROUNDED) cited URL of a domain ranked in the top 100, and that domain has at least one GROUNDED URL as well. Back-end access to the selection / verification job of the snapshot is available (job output, logs or database read access). Back-end verifiable only: SKIP in UI runs.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed snapshot holding a model-declared URL of a top 100 domain | Model-declared URL from reference data | The URL is stored with a provenance other than GROUNDED |
| 2 | When the suspect selection runs over that snapshot |  | The selection run completes |
| 3 | Then the model-declared URL is not in the list of URLs sent to verification |  | The URL is absent from the verification list: it was excluded at selection, not fetched and failed |
| 4 | And only GROUNDED URLs of the domain are sent to verification |  | Every URL sent to verification has the provenance GROUNDED; rows with no provenance are excluded and counted in the selection log |
| 5 | And no target source is listed only because of model-declared URLs | Action Center of the same analysis | A domain cited only through non-GROUNDED URLs does not appear in any tab of Target Sources |

### GEO-1117 — Story (QA In Progress)

#### TC-GEO-1117-001 - All suspect articles verified no cap

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify every suspect article is checked with no cap on volume. Covers AC-1.
- **Precondition:** A completed analysis with more than 50 suspect articles across all suspect sources.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed analysis with a large number of suspect articles across multiple sources |  | The analysis is complete and the Action Center shows a Target Sources list |
| 2 | When the Target Sources list and explanation panels are inspected |  | All sources in the list have at least one verdict-checked article |
| 3 | Then every article listed in the panel sits under the Lack of visibility (N) or Negative perception (N) tab — no article is listed as unchecked due to a cap |  | Each article row in any open panel belongs to one of the two article tabs with no unchecked or pending state remaining after verification completes, and each tab count N equals the matching card line (Not visible in N articles / Negative perception in N articles) |

#### TC-GEO-1117-002 - Check determines brand family presence and depiction

- **ACs:** AC-2 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify the check determines brand family presence and depiction. Covers AC-2.
- **Precondition:** A completed analysis with at least one source having an article where the brand is absent, an article where the brand is named negatively, and an article where the brand is named positively.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed analysis with a source that has a brand-absent article, a negatively depicted article, and an article where the brand is named positively |  | The source appears in the Target Sources list |
| 2 | When the explanation panel is opened and the Lack of visibility (N) and Negative perception (N) tabs are reviewed |  | The panel opens with both article tabs, Lack of visibility first and selected by default, and no Positive articles tab |
| 3 | Then the Lack of visibility tab shows the line None of these articles mentions {brand} anywhere on the page. and its article rows show no passage |  | The explanation line uses the brand name of the analysis and no passage block appears on any row of the Lack of visibility tab |
| 4 | And the Negative perception tab shows the line Each of these articles mentions {brand} negatively. with a passage on each row, and the brand-positive article appears in neither tab |  | Each Negative perception row shows its passage, no Positive articles tab exists, and the positively depicted article is listed in neither article tab |

#### TC-GEO-1117-003 - Product named on page counts as brand family

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify a brand product named on the page counts as the brand family being named. Covers AC-3.
- **Precondition:** A completed analysis where at least one suspect article names a brand product that never appeared in any LLM answer, without mentioning the parent brand name.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed analysis where a suspect article page names only a brand product (not the parent brand name itself) |  | The analysis is complete with at least one article where a brand product is named but not the parent brand |
| 2 | When the explanation panel is opened for that source |  | The explanation panel opens showing the article in question |
| 3 | Then the article is not classified as brand-absent — it has a depiction verdict (neutral/positive or negative) |  | The article is not listed under the Lack of visibility tab: it is either under the Negative perception tab with a passage naming the product, or absent from the panel (neutral or positive verdict), confirming the product naming was treated as the brand family being named |

#### TC-GEO-1117-004 - False positives not counted as failing

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify false positive articles are not counted as failing and do not affect rank or badges. Covers AC-5.
- **Precondition:** A completed analysis with at least one source that has missing and/or negative articles and at least one false-positive article (brand named neutrally or positively on the page). API access required: authenticated session with browser devtools (Network tab) open on the Action Center to read the source-detail API response of that source.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed analysis where a source has missing and/or negative articles and false-positive articles (brand named neutrally or positively) |  | The source appears in the Target Sources list with its card lines Not visible in X articles and/or Negative perception in Y articles |
| 2 | When the explanation panel of that source is opened and the source-detail API response is inspected in the browser Network tab |  | The panel opens with its article tabs and the source-detail API response for the source is captured |
| 3 | Then the panel tab counts Lack of visibility (X) and Negative perception (Y) equal the card lines X and Y, with no Positive articles tab and no header meta line |  | Card lines and tab counts match, no Positive articles tab is shown, and no failing/positive/cited count line appears under the panel header |
| 4 | And the source-detail API response lists the neutral or positive verdict articles of the source, but they are not counted in the missing and negative totals shown on the card and used for ranking | Source-detail API response (Network tab): count the articles by verdict | The API response contains at least one neutral/positive verdict article for the source, the missing count X plus the negative count Y (the ranking total) excludes them, and the badges reflect only the missing/negative articles |

#### TC-GEO-1117-005 - Failing article passage max 140 chars

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify failing article with negative mention shows passage max 140 characters. Covers AC-7.
- **Precondition:** A completed analysis with at least one failing article where the brand is mentioned negatively. The article must have a passage extracted.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed analysis with at least one source having a failing article where the brand is named negatively |  | The source appears in the Target Sources list and the explanation panel is accessible |
| 2 | When the explanation panel is opened on the Negative perception (N) tab and the article with a negative mention is displayed |  | The tab shows the line Each of these articles mentions {brand} negatively. and the article row shows a quoted passage with the brand name highlighted, with no per-article verdict line |
| 3 | Then the extracted passage is shown verbatim with the brand name highlighted |  | The passage text is visible in an indented/quoted block with the brand name highlighted |
| 4 | And the passage does not exceed 140 characters including spaces | Count the characters of the displayed passage including spaces | The passage length is at most 140 characters including spaces |

#### TC-GEO-1117-006 - Unfetchable article contributes nothing

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify unfetchable articles contribute nothing to source count or rank. Covers AC-8. Updated 2026-10-07 per GEO-1164: a page answering an HTTP error or redirecting to another site is not fetched, so it is never presented as "No mention of the brand anywhere on this page".
- **Precondition:** A completed analysis where at least one suspect article URL was unreachable (404, timeout, or service error) during verification.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed analysis where at least one suspect article URL returned a fetch error |  | The analysis is complete and the Target Sources list is visible |
| 2 | When the explanation panel is opened for the source whose article was unfetchable |  | The panel opens showing the source's evidence |
| 3 | Then the unfetchable article is counted in neither card line and is not listed in the panel article tabs |  | The Not visible in N articles and Negative perception in N articles counts exclude the unfetchable article — it appears neither in the Lack of visibility nor in the Negative perception tab |
| 4 | And the unfetchable article is not presented as a brand-absent article | Open every URL of the "Lack of visibility (N)" tab of the source | No listed article is an HTTP error page (404, 500, 503...), a "server error" page or a redirect to another site home page or unrelated content |

#### TC-GEO-1117-007 - Source with zero failing articles absent from list

- **ACs:** AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify a source with zero failing articles after verification does not appear in the list. Covers AC-9.
- **Precondition:** A completed analysis where at least one of the top 100 domains selected by citation Frequency (GEO-1169) had every article verified as neutral or positive (brand named without negativity on every page).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed analysis where a top-100 domain had all its articles verify as false positives (0 missing and 0 negative articles) |  | The analysis is complete and the Action Center is open |
| 2 | When the Target Sources list renders on the ALL tab |  | The Target Sources list is displayed |
| 3 | Then the source with 0 missing and 0 negative articles is not present in any tab of the Target Sources list |  | The source does not appear in the ALL, IMPROVE VISIBILITY, or IMPROVE PERCEPTION tabs |

#### TC-GEO-1117-008 - Verdicts are persisted and read the same way by every surface

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the verdict of an article is persisted and every later read (card lines, panel tabs, Excel export) uses the same verdict; an article is never re-judged within the same analysis. Covers AC-4. The re-judge across snapshots is GEO-1122 AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of a source with both reasons | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com | The tabs "Lack of visibility (N)" and "Negative perception (N)" are shown; the user records the article URLs of each tab |
| 2 | When the user closes the panel, switches to the list view and back, and reloads the page | F5 on the Action Center | The Target Sources list is displayed again in the same order |
| 3 | And the user opens the details panel of the same source again |  | Each tab lists exactly the same article URLs as recorded in step 1, under the same tab |
| 4 | When the user exports the analysis as "Spreadsheet .xls" with the same scope |  | An .xlsx file is downloaded |
| 5 | Then the Verdict of each recorded article in the failing articles table matches its tab | Target Sources sheet, failing articles table | Articles of "Lack of visibility" carry the brand-absent verdict ("No mention of {brand} anywhere on this page") and articles of "Negative perception" carry the negative verdict; no article changed verdict between the panel and the file |

#### TC-GEO-1117-009 - False positive articles are persisted with their verdict and passage

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that an article naming the brand neutrally or positively (false positive) is persisted with its verdict and its supporting passage like a failing article, while it is never shown in the panel. Covers AC-6. Updated 2026-10-07 per GEO-1168: positive articles are no longer shown in the details panel, so they are checked through the source-detail API response.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. A source of the list has at least one false positive article. API access: authenticated session with the browser DevTools (Network tab) open on the Action Center to read the source-detail API response.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis with the Network tab open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed |
| 2 | When the user opens the details panel of the source and captures its source-detail API response | Source with a false positive article (from reference data) | The panel opens and the source-detail response is captured |
| 3 | Then the response lists the false positive article with its neutral or positive verdict |  | The article is returned with a verdict that is neither brand-absent nor negative |
| 4 | And the false positive article carries its supporting passage |  | The passage field of the article is filled with the text that supports the verdict, at most 140 characters |
| 5 | And the false positive article is not shown in the panel |  | The article URL is listed under neither "Lack of visibility (N)" nor "Negative perception (N)" |

#### TC-GEO-1117-010 - Only a criticism, failure, risk or harm attributable to the brand is a negative verdict

- **ACs:** AC-10 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify the definition of a negative depiction on a sample of verdicts: negative only when the page states or implies a criticism, a failure, a risk or a harm attributable to the brand or one of its products; a factual report of unfavourable news (recall, lawsuit, poor result) is negative; a favourable statement about a competitor or a weak incidental criticism is not; ambiguity resolves to neutral. Covers AC-10. Updated 2026-10-07: the judge verdict bugs GEO-1192, GEO-1204, GEO-1190 and GEO-1203 are data-side issues; this TC checks the expected verdict behaviour only, with no data-specific counts.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Open judge bugs that must not be generalised from a single page: GEO-1204 (some negative pages still not negative), GEO-1190 / GEO-1203 (competitor or homonym counted as the brand).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the "Negative perception (N)" tab of the first 5 sources with the "Improve perception" badge | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | Each tab lists articles with a quoted passage under "Each of these articles mentions Toyota negatively." |
| 2 | When the user reads each passage |  | The passages are displayed |
| 3 | Then each passage states or implies a criticism, a failure, a risk or a harm attributable to Toyota or to one of its products | e.g. a recall, a lawsuit, a poor test result, a reliability complaint | Every passage carries a criticism, failure, risk or harm of Toyota or a Toyota product (record any passage that does not) |
| 4 | And no passage is only a favourable statement about a competitor | e.g. "Tesla leads the EV market" | No article is listed as negative only because a competitor is praised |
| 5 | And no passage is only a weak or incidental remark inside an otherwise neutral article |  | Every listed passage is a clear criticism, not an incidental remark or an ambiguous sentence (ambiguous pages are neutral, not negative) |

#### TC-GEO-1117-011 - A check that could not be completed counts for nothing

- **ACs:** AC-11 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that an article whose check could not be completed (verification service unavailable, unsupported language, unusable content) contributes nothing to any count or rank and is not shown as a failing article. Covers AC-11. Updated 2026-10-07 per GEO-1164 (unreadable page not presented as "No mention of the brand") and GEO-1194 (when no page could be checked, the page says so instead of "All clear", see TC-GEO-1121-003). Conditional: needs an article whose check did not complete in the snapshot (back-end reference data).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference data identifies source K with at least one article whose check outcome is "could not be completed" and at least one failing article. API access: browser DevTools (Network tab) on the Action Center.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis with the Network tab open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed |
| 2 | When the user opens the details panel of source K and captures its source-detail API response | Source K from reference data | The response lists the not-completed article with its outcome |
| 3 | Then the not-completed article is listed in no article tab |  | The article URL is under neither "Lack of visibility (N)" nor "Negative perception (N)" |
| 4 | And the card lines of source K exclude the not-completed article |  | The "Not visible in N articles" / "Negative perception in N articles" counts equal the rows of the two tabs; the not-completed article adds nothing |
| 5 | And the rank of source K is computed without it |  | Source K is ranked by its missing + negative total only |

#### TC-GEO-1117-012 - Lack of visibility articles really do not name the brand in the article body

- **ACs:** AC-2, AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that an article naming the brand in its title or body is never listed as a Lack of visibility article, and that a brand name appearing only in page chrome (ads, image credits, logos, related links, navigation) does not count as a mention. Covers AC-2, AC-7. Updated 2026-10-07 per GEO-1158 and GEO-1191.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. An article page seen today may differ from the page captured at analysis time: record the URL and the capture date when a step fails.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of the first source with the "Improve visibility" badge | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The panel opens on "Lack of visibility (N)" with "None of these articles mentions Toyota anywhere on the page." |
| 2 | When the user opens the first 3 listed articles in new browser tabs |  | Each article page loads its content (no error page, no consent wall, no bot challenge) |
| 3 | Then the user searches "Toyota" and the Toyota product names in the title and the body of each article | Ctrl+F "Toyota", "Prius", "RAV4", "bZ4X", "Corolla" | For each of the 3 articles, no Toyota brand or product name is found in the article title or body |
| 4 | And the user checks where any remaining match sits |  | Any remaining match is in an ad, an image credit, a logo, a related-article link or the navigation only, which does not count as a mention |

### GEO-1118 — Story (QA In Progress)

#### TC-GEO-1118-001 - Target Sources list is ranked by failing article total

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the list titled "Target Sources" orders the sources by failing article count (missing + negative). Covers AC-1. Updated 2026-10-07 per GEO-1168: the count is split into "Not visible in N articles" / "Negative perception in N articles" (total = missing + negative) and the citation count is no longer shown, so the tie-break (badges, then citations) cannot be read on screen and is not asserted (open point).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Toyota analysis and clicks "Action Center" in the left menu | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The page shows the title "Target Sources" and the subtitle "Sources to target to improve how AI engines represent your brand, sorted by the number of articles where your brand is missing or negatively represented" |
| 2 | When the user computes the total of each of the first 12 cards | Total = missing + negative | The totals are computed from the "Not visible in N articles" and "Negative perception in N articles" lines |
| 3 | Then the totals never increase from one rank to the next |  | Rank 1 holds the highest total and each card total is lower than or equal to the card above it |
| 4 | When the user clicks "Show N more sources" |  | The remaining cards are listed |
| 5 | Then the order rule still holds down to the last card |  | The totals never increase from one rank to the next, down to the last card |

#### TC-GEO-1118-002 - Source type filter beside the tabs lists the types in scope with their count

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a source type filter is available beside the verdict tabs, offering only the source types present in the current scope, each with its source count, after a default "all types" entry. Covers AC-2. Updated 2026-10-07 per GEO-1168: the default entry reads "All types" (AC says "All source types") and a Category filter "All categories" sits next to it (AC/app gap, accepted change).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed on the ALL tab |
| 2 | Then the user checks the filters beside the verdict tabs |  | A Category filter reading "All categories" and a Type filter reading "All types" are displayed beside the tabs, with no leading icon |
| 3 | When the user opens the Type filter |  | It lists "All types" (selected) then only the source types present in the list, each with its count, e.g. "Journalism (N)"; no type shows a 0 count |
| 4 | And the user selects "Journalism" | Type: Journalism | Only cards with the "Journalism" chip are listed and their number equals the count shown for Journalism in the dropdown |
| 5 | And the user selects "All types" again |  | The full list and its total are displayed again |

#### TC-GEO-1118-003 - Card view and list view show the sources in the same fixed order

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a card view and a table view are both available through an explicit control and show the sources in the same fixed order, with no user-triggered re-sorting. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The cards are displayed with the "Card view" / "List view" toggle at the top right |
| 2 | When the user switches to the list view |  | The sources are shown as table rows in the same order as the cards (row 1 = card 1, row 2 = card 2...) |
| 3 | Then the user clicks each column header of the table | #, Source, Type, Articles | No header re-orders the rows and no sort control is offered |
| 4 | When the user switches back to the card view |  | The cards are displayed again in the same order, with no sort control on the list |

#### TC-GEO-1118-004 - A card shows rank, logo, domain, type, reason badges and reason lines

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify the content of a target source card. Covers AC-4. Updated 2026-10-07 per GEO-1168: the failing article count is shown as one line per reason ("Not visible in N articles" / "Negative perception in N articles") and the citation count ("Cited N× in gap answers") is removed (AC/app gap, accepted change).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The first 12 source cards are displayed |
| 2 | When the user reads the first 12 cards |  | Each card shows its rank, a logo (or a neutral placeholder) next to the domain in bold, a source type chip (e.g. "Journalism") and its reason badge(s) |
| 3 | Then the user compares the badges and the lines of each card |  | A card with "IMPROVE VISIBILITY" shows "Not visible in N article(s)", a card with "IMPROVE PERCEPTION" shows "Negative perception in N article(s)", a card with both badges shows both lines |
| 4 | And the user looks for a citation count on the cards |  | No card shows "Cited", "gap answers" or "failing articles" |

#### TC-GEO-1118-005 - Reason badges come from the verdicts of the failing articles only

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that "Improve visibility" is shown when at least one failing article does not name the brand family and "Improve perception" when at least one names it negatively, a source with both shows both, and no badge comes from the outcome of an answer. Covers AC-5. Since GEO-1169 a source cited only in answers where the brand is visible, first and positive can carry a badge, which proves the badge does not come from the answer outcome.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed on the ALL tab |
| 2 | When the user opens the details panel of a source with only the "IMPROVE VISIBILITY" badge | First visibility-only card | Only the tab "Lack of visibility (N)" is shown |
| 3 | And the user opens the details panel of a source with only the "IMPROVE PERCEPTION" badge | First perception-only card | Only the tab "Negative perception (N)" is shown |
| 4 | And the user opens the details panel of a source with both badges | e.g. frandroid.com | Both tabs "Lack of visibility (N)" and "Negative perception (N)" are shown |
| 5 | Then each badge matches the article tabs of its source |  | IMPROVE VISIBILITY is shown if and only if the panel has a "Lack of visibility" tab, IMPROVE PERCEPTION if and only if it has a "Negative perception" tab |

#### TC-GEO-1118-006 - Three verdict tabs with ALL selected by default

- **ACs:** AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify that three tabs scope the list, "All", "Improve visibility" and "Improve perception", and that "All" is selected by default. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Toyota analysis and clicks "Action Center" in the left menu | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The Target Sources page is displayed |
| 2 | Then the user checks the verdict tabs |  | Three tabs are shown, "ALL", "IMPROVE VISIBILITY" and "IMPROVE PERCEPTION", each verdict tab with its icon |
| 3 | And the user checks the selected tab |  | "ALL" is underlined as the selected tab |

#### TC-GEO-1118-007 - ALL tab shows the total of both verdicts per source

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that on the "All" tab each source shows its failing articles of both verdicts and that the order follows the total. Covers AC-7. Updated 2026-10-07 per GEO-1168: the total is shown as two reason lines whose sum is the ranking total.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis on the ALL tab | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed |
| 2 | When the user locates a source with both badges | e.g. frandroid.com | Its card shows "Not visible in a articles" and "Negative perception in b articles" |
| 3 | And the user opens its details panel |  | The tabs read "Lack of visibility (a)" and "Negative perception (b)" |
| 4 | Then the card carries the articles of both verdicts |  | The card total a + b equals the sum of the two tab counts |
| 5 | And the card is ranked by a + b against the other sources |  | The source sits between the cards whose totals are higher or equal and lower or equal to a + b |

#### TC-GEO-1118-008 - A verdict tab ranks its sources on that verdict alone

- **ACs:** AC-8 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that on "Improve visibility" or "Improve perception" each source is counted and ranked on the failing articles of that verdict alone. Covers AC-8. Whether a card shows only the line of the tab or both lines is not specified after GEO-1168 (open point); the order by the count of the tab is asserted.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed on the ALL tab |
| 2 | When the user selects the "IMPROVE VISIBILITY" tab |  | The list is recomputed, ranked from 1 with no gap |
| 3 | Then the sources are ordered by their "Not visible in N articles" count |  | The count never increases from one rank to the next |
| 4 | When the user selects the "IMPROVE PERCEPTION" tab |  | The list is recomputed, ranked from 1 with no gap |
| 5 | Then the sources are ordered by their "Negative perception in N articles" count |  | The count never increases from one rank to the next |

#### TC-GEO-1118-009 - A verdict tab lists only the sources having articles of that verdict

- **ACs:** AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a source with no failing article of the selected verdict does not appear in that verdict tab. Covers AC-9.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes a visibility-only source and a perception-only source on the ALL tab | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | Source V shows only "IMPROVE VISIBILITY" and source P only "IMPROVE PERCEPTION" |
| 2 | When the user selects the "IMPROVE PERCEPTION" tab |  | Only sources carrying the IMPROVE PERCEPTION badge are listed |
| 3 | Then source V is not listed and source P is listed |  | No visibility-only source appears on the tab |
| 4 | When the user selects the "IMPROVE VISIBILITY" tab |  | Only sources carrying the IMPROVE VISIBILITY badge are listed |
| 5 | Then source P is not listed and source V is listed |  | No perception-only source appears on the tab |

#### TC-GEO-1118-010 - Badges of a source do not change from one tab to another

- **ACs:** AC-10 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the badges of a listed source stay the same on the verdict tabs as on the "All" tab. Covers AC-10.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes a source with both badges on the ALL tab | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com | The source shows "IMPROVE VISIBILITY" and "IMPROVE PERCEPTION" |
| 2 | When the user selects the "IMPROVE VISIBILITY" tab |  | The source is listed |
| 3 | Then the source shows both badges, exactly as on the ALL tab |  | Both badges are displayed |
| 4 | When the user selects the "IMPROVE PERCEPTION" tab |  | The source is listed |
| 5 | Then the source shows both badges, exactly as on the ALL tab |  | Both badges are displayed |

#### TC-GEO-1118-011 - Empty verdict tab says no source carries that verdict and other tabs stay reachable

- **ACs:** AC-11 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** state
- **Description:** Verify that a verdict tab holding no source states that no source carries that verdict in the current scope and that the other tabs stay reachable (design DAC4 "clean slate", frames 13746:120414 / 13746:120488). Covers AC-11. Conditional: needs a scope where one verdict tab is empty (not found on the Toyota analysis on 2026-09-25); the exact copy is not specified and is recorded at execution.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Conditional: a scope (country, AI engine, Category or Type filter) where one verdict tab holds no source while the ALL tab lists sources. If none can be found, record "not available".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user applies a scope where no source carries the "Improve perception" verdict | e.g. a Type or Category with visibility-only sources (from reference data) | The ALL tab lists only sources with the IMPROVE VISIBILITY badge |
| 2 | When the user selects the "IMPROVE PERCEPTION" tab |  | No source card is displayed |
| 3 | Then the tab states that no source carries that verdict in the current scope |  | An empty-state message is displayed instead of the list (record the copy); "All clear" is not shown |
| 4 | And the other tabs stay reachable |  | Clicking "ALL" and "IMPROVE VISIBILITY" lists their sources again |

#### TC-GEO-1118-012 - Domain logo with a neutral placeholder in card, table and panel

- **ACs:** AC-12 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** Verify that the domain logo is shown next to the source name in the card view, the table view and the details panel, retrieved like in AI Citation Sources, with a neutral placeholder when no logo is returned. Covers AC-12.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The cards are displayed |
| 2 | Then each card shows a logo next to the domain |  | A favicon is shown for domains that have one and a neutral placeholder (generic globe) for the others; no broken image |
| 3 | When the user switches to the list view |  | Each row of the Source column shows the same logo or placeholder as its card |
| 4 | And the user opens the details panel of the first row |  | The panel header shows the same logo or placeholder next to "#1 · {domain}" |
| 5 | And the user compares a logo with AI Engines Citation Sources | Same domain on the Overview | The domain shows the same favicon in both views |

#### TC-GEO-1118-013 - First 12 cards and 10 table rows, then an explicit "Show N more sources" control

- **ACs:** AC-13 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that above the first page of sources the remainder is revealed by an explicit control. Covers AC-13. Updated 2026-10-07 per GEO-1168: 12 cards (not 10) are shown before "Show N more sources" with N = total - 12, and the table shows 10 rows (AC/app gap, accepted change).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed |
| 2 | Then exactly 12 cards ranked 1 to 12 are displayed, followed by the control |  | "Show N more sources" is displayed with N = total target sources - 12 |
| 3 | When the user clicks "Show N more sources" |  | All the remaining cards are listed and the button is no longer displayed |
| 4 | When the user switches to the list view and reloads the page |  | 10 rows are displayed, followed by "Show N more sources" with N = total - 10 |

#### TC-GEO-1118-014 - [Figma] Two badges are stacked on the card and inline in the panel header

- **ACs:** AC-4, AC-5 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** [Figma] Verify that a source carrying both verdicts shows both badges stacked on the list card (frame 14288:16725) and inline in the details panel header (frame 13746:123851), as decided by the PM ("do not harmonise the component"). Covers DAC7 of AC-4 / AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The cards are displayed |
| 2 | When the user locates a card with both badges | e.g. frandroid.com | The card shows "IMPROVE VISIBILITY" and "IMPROVE PERCEPTION" |
| 3 | Then the two badges are stacked on the card |  | One badge is displayed above the other at the top right of the card |
| 4 | When the user opens the details panel of that source |  | The panel header shows both badges |
| 5 | Then the two badges are displayed inline in the panel header |  | The badges sit side by side on one line next to the type chip |

### GEO-1119 — Story (QA In Progress)

#### TC-GEO-1119-001 - Verifying state replaces the list while verification runs

- **ACs:** AC-1 | **Priority:** Urgent | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that while article verification is still running the Action Center shows a plain "verifying sources" state instead of a partial target list. Covers AC-1. Updated 2026-10-07 per GEO-1168: the state shows its title and a spinner, with no progress counter and no explanatory paragraph. The title wording is not specified and is recorded at execution. Conditional.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis of the organisation whose article verification is running - open its Action Center right after a new analysis finishes its collection or right after a scheduled execution starts verification (measured duration: a few seconds to about 4 minutes). Exports are not checked: a file exported during verification can show a list or the all-clear message by PM decision (not a defect).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an analysis whose article verification is running | New analysis or scheduled execution in progress (record the analysis and the time) | The analysis dashboard is reachable |
| 2 | When the user opens its Action Center |  | The Target Sources area shows a verifying state with a title and a spinner (record the title) |
| 3 | Then no partial list is shown |  | No source card, table row, tab count or "Show N more sources" button is displayed |
| 4 | And the verifying state shows no progress counter and no paragraph |  | No counter such as "N / M" and no explanatory paragraph is shown under the title |

#### TC-GEO-1119-002 - Target list appears without a page reload when verification completes

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that when verification completes the target list becomes available without a full page reload. Covers AC-2. Conditional.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis of the organisation whose article verification is running - open its Action Center right after a new analysis finishes its collection or right after a scheduled execution starts verification (measured duration: a few seconds to about 4 minutes). Exports are not checked: a file exported during verification can show a list or the all-clear message by PM decision (not a defect).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center showing the verifying state | Same analysis as TC-GEO-1119-001 | The verifying state is displayed |
| 2 | When the user stays on the page without reloading until verification completes | Do not press F5 or reload | The page stays open |
| 3 | Then the verifying state is replaced by the Target Sources list |  | The ranked list (or the all-clear state) appears in place of the verifying state without a full page reload |
| 4 | And the list is complete |  | The verdict tabs, the filters and "Show N more sources" (when more than 12 sources) are displayed |

### GEO-1120 — Story (QA In Progress)

#### TC-GEO-1120-001 - Country filter recomputes counts, badges and order within scope

- **ACs:** AC-1 | **Priority:** Urgent | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that applying a country filter recomputes failing article counts, citation counts, reason badges and the order inside the selected scope instead of filtering the globally computed list. Covers AC-1. Updated 2026-10-07 per GEO-1168: the citation count is no longer displayed on any Target Sources surface, so its recomputation cannot be read on screen (AC/app gap, accepted change).
- **Precondition:** A completed analysis covering at least two markets (e.g. France and Germany). Source A carries both IMPROVE VISIBILITY and IMPROVE PERCEPTION badges on All Countries, but in France only its brand-absent failing articles exist. Source B is ranked below source A on All Countries but has more failing articles than source A in France. Global and per-market failing article and citation counts per source are known from reference data.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center Target Sources list with "All Countries" selected |  | The Target Sources list is displayed on the ALL tab and source A is ranked above source B |
| 2 | When the user selects France in the countries filter | Country: France | The countries filter shows France and the Target Sources list re-renders |
| 3 | Then the counter lines of each source count only the failing articles of the France scope |  | The card of source A shows "Not visible in N articles" with N equal to its France-only count, not its All Countries count |
| 4 | And the reason badges are recomputed inside the France scope |  | Source A shows the IMPROVE VISIBILITY badge only and the IMPROVE PERCEPTION badge is no longer displayed |
| 5 | And no citation counter is displayed on the cards |  | No "Cited N× in gap answers" line is shown; the recomputed scope is read from the "Not visible in N articles" / "Negative perception in N articles" lines |
| 6 | And the order of the list is recomputed inside the France scope |  | Source B is now displayed above source A |

#### TC-GEO-1120-002 - Displayed ranks renumbered 1 to N with no gaps after a filter

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that after any filter the displayed ranks are positions renumbered 1...N with no gaps, never the ranks of the unfiltered list (PM decision 2026-09-17). Covers AC-1.
- **Precondition:** A completed analysis with at least 6 target sources on the ALL tab and at least 2 AI engines. Keeping a single AI engine removes some sources from the middle of the unfiltered list.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Target Sources list is displayed unfiltered on the ALL tab | AI Engines: all (e.g. "AI Engines 3") | The sources show ranks 1, 2, 3 ... in order |
| 2 | When the user keeps a single AI engine in the AI Engines filter | AI engine: one engine only (e.g. ChatGPT) | The AI Engines filter shows 1 selected engine and the list re-renders |
| 3 | Then the first displayed source shows rank 1 |  | The first card shows rank 1 |
| 4 | And the displayed ranks run 1, 2, 3 ... N with no gap |  | Ranks are contiguous; no rank of the unfiltered list is kept (e.g. never 1, 4, 7, 9) |
| 5 | When the user selects all AI engines again | AI Engines: all | The AI Engines filter shows all engines selected and the list re-renders |
| 6 | Then the ranks are renumbered 1 ... N on the full list |  | The full list is displayed with contiguous ranks starting at 1 |

#### TC-GEO-1120-003 - Source type filter keeps only the selected type and re-ranks it

- **ACs:** AC-2 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that selecting a source type keeps only the sources of that type and recomputes ranks and counts inside that selection (design frame DAC2 13862:447428). Covers AC-2. Updated 2026-10-07 per GEO-1168: the default entry of the Type filter reads "All types".
- **Precondition:** A completed analysis whose target list mixes several source types including Journalism (e.g. Journalism, Review Sites, Social/UGC, Aggregator/Encyclopedic). Reference counts per source are known.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center ALL tab with the Type filter on "All types" |  | Cards carry several type chips: "Journalism", "Review Sites", "Social/UGC", "Aggregator/Encyclopedic" |
| 2 | When the user opens the Type filter and selects "Journalism" | Source type: Journalism | The dropdown closes and the Type filter input shows "Journalism" |
| 3 | Then only sources carrying the "Journalism" type chip remain |  | No card carries a "Review Sites", "Social/UGC" or "Aggregator/Encyclopedic" chip |
| 4 | And the ranks of the remaining sources are renumbered from 1 with no gap |  | Ranks read 1, 2, 3, 4 ... and never keep the unfiltered ranks (e.g. never 1, 4, 7, 9) |
| 5 | And the counter lines of each remaining source are computed inside the Journalism selection |  | Each card shows "Not visible in N article(s)" and/or "Negative perception in N article(s)" matching the Journalism-scoped reference counts |

#### TC-GEO-1120-004 - Source type filter recomputes verdict tab membership

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the tab membership is recomputed inside the source type selection: each verdict tab lists only sources of the selected type that carry that verdict. Covers AC-2.
- **Precondition:** A completed analysis with Journalism sources carrying only brand-absent articles (e.g. electrek.co), only negative perception articles (e.g. motortrend.com) and both (e.g. caranddriver.com), plus non-Journalism sources in both verdicts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Type filter is set to "Journalism" on the ALL tab | Source type: Journalism | The Type filter input shows "Journalism" and only Journalism sources are listed |
| 2 | When the user selects the IMPROVE VISIBILITY tab |  | The IMPROVE VISIBILITY tab is active |
| 3 | Then only Journalism sources with at least one brand-absent failing article are listed |  | caranddriver.com and electrek.co are listed, motortrend.com is absent and no non-Journalism source is listed |
| 4 | And their ranks start at 1 with no gap |  | Ranks read 1, 2 ... |
| 5 | When the user selects the IMPROVE PERCEPTION tab |  | The IMPROVE PERCEPTION tab is active |
| 6 | Then only Journalism sources with at least one negative perception failing article are listed |  | caranddriver.com and motortrend.com are listed, electrek.co is absent and no non-Journalism source is listed |

#### TC-GEO-1120-005 - Source type filter lists only the types present in scope

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Type dropdown lists only the source types present in the current scope (design frame DAC1 13862:446929). Covers AC-3. Updated 2026-10-07 per GEO-1168: the default entry reads "All types".
- **Precondition:** A completed analysis whose current target list holds a known set of source types (e.g. Journalism, Review Sites, Social/UGC, Aggregator/Encyclopedic). At least one source type exists elsewhere in the product (e.g. AI Citation Sources) but has no target source in this scope.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center Target Sources list with no source type selected |  | The Type filter is displayed beside the tabs with its default all-types entry |
| 2 | When the user opens the Type filter |  | The dropdown opens with "All types" as first entry followed by the types with their source count, e.g. "Journalism (N)", "Review Sites (N)", "Social/UGC (N)" |
| 3 | Then every listed type matches at least one source of the current target list | Reference: types present in the current scope | Each listed type corresponds to at least one card carrying that type chip |
| 4 | And no source type absent from the current scope is listed |  | The type with no target source in this scope does not appear and no entry shows a count of (0) |

#### TC-GEO-1120-006 - Source type list follows a scope change

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the Type dropdown is recomputed when another filter changes the scope and drops a type that is no longer present. Covers AC-3.
- **Precondition:** A completed analysis where Social/UGC target sources exist only on Germany answers, and Journalism and Review Sites sources exist on France answers.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given "All Countries" is selected and the Type dropdown lists "Social/UGC" |  | The dropdown shows "All types", "Journalism (n)", "Review Sites (n)", "Social/UGC (n)" |
| 2 | When the user selects France in the countries filter | Country: France | The countries filter shows France and the list re-renders |
| 3 | And the user opens the Type filter |  | The dropdown opens |
| 4 | Then "Social/UGC" is no longer listed |  | The dropdown lists only "All types", "Journalism (n)" and "Review Sites (n)" with counts of the France scope |

#### TC-GEO-1120-007 - Date range counts only articles with a qualifying answer in range

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a failing article counts only if at least one of its qualifying answers falls inside the selected range. A range longer than 7 days is used so the AC-9 floor does not widen it. Covers AC-4.
- **Precondition:** A DAILY report with more than 30 days of history. Source A has 4 brand-absent failing articles: 2 with at least one qualifying answer in the last 30 days, 2 whose qualifying answers are all older than 30 days.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Action Center is displayed with a date range covering the full report history | Date range: full history (e.g. Last 90 days) | The card of source A shows "Not visible in 4 articles" |
| 2 | When the user selects a date range longer than 7 days that excludes the older answers | Date range: Last 30 days (or a custom range longer than 7 days) | The date filter shows the selected range and the list re-renders |
| 3 | Then source A counts only its failing articles with a qualifying answer inside the range |  | The card of source A shows "Not visible in 2 articles" |
| 4 | And the rank of source A is recomputed with that count |  | Source A is ranked against the in-range counts of the other sources and ranks stay contiguous from 1 |

#### TC-GEO-1120-008 - Multi-scope article counts only in scopes holding one of its answers

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a failing article whose qualifying answers span several scopes counts in a single selected scope only if at least one of its qualifying answers belongs to it. Covers AC-5.
- **Precondition:** Source A has failing article X with qualifying answers in France and Germany, and failing article Y with qualifying answers in Germany only. Both are brand-absent articles.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given "All Countries" is selected |  | The card of source A shows "Not visible in 2 articles" |
| 2 | When the user selects France in the countries filter | Country: France | The list re-renders for the France scope |
| 3 | Then article X is counted for source A and article Y is not |  | The card of source A shows "Not visible in 1 article" |
| 4 | When the user selects Germany in the countries filter | Country: Germany | The list re-renders for the Germany scope |
| 5 | Then both articles X and Y are counted for source A |  | The card of source A shows "Not visible in 2 articles" |

#### TC-GEO-1120-009 - Source with no failing article in scope disappears

- **ACs:** AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that a source with no failing article in the selected scope is not displayed. Covers AC-6.
- **Precondition:** Source A has failing articles only on France answers and is visible on the ALL tab with "All Countries".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given source A is visible on the ALL tab with "All Countries" selected |  | The card of source A is displayed |
| 2 | When the user selects Germany in the countries filter | Country: Germany | The list re-renders for the Germany scope |
| 3 | Then source A does not appear on the ALL tab |  | No card for source A and no card shows a zero counter (e.g. "Not visible in 0 articles") |
| 4 | And source A does not appear on the IMPROVE VISIBILITY and IMPROVE PERCEPTION tabs |  | Source A is absent from both verdict tabs |

#### TC-GEO-1120-010 - Filters define the scope before the verdict tab

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that with a filter and a verdict tab both active the filter defines the scope first and the tab then selects the verdict inside it, so counts, badges and order of the tab come from the filtered failing articles only. No design frame exists for this state (owed on GEO-158). Covers AC-7.
- **Precondition:** Source A has brand-absent failing articles only on Germany answers and negative perception articles only on France answers. Source B has brand-absent failing articles on France answers. Reference France counts are known.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given France is selected in the countries filter | Country: France | The Target Sources list shows the France scope on the ALL tab |
| 2 | When the user selects the IMPROVE VISIBILITY tab |  | The IMPROVE VISIBILITY tab is active |
| 3 | Then source A is not listed on the IMPROVE VISIBILITY tab |  | Source A is absent because its brand-absent articles are outside the France scope |
| 4 | And source B is listed with counts computed from its France failing articles only |  | The card of source B shows "Not visible in N articles" with N equal to its France-only count |
| 5 | And the order and ranks of the tab are computed from the France failing articles |  | Ranks start at 1 with no gap and follow the France-only counts |

#### TC-GEO-1120-011 - Source type filter has no effect on the analysis export

- **ACs:** AC-8 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the on-screen Type filter has no effect on the Target Sources section of the analysis export, like the category filter of story 1.9. Covers AC-8.
- **Precondition:** A completed analysis with target sources of several types. A reference export has been generated with the Type filter on "All types" and the same markets, AI engines and date range. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls").

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Type filter is set to "Journalism" on the Action Center | Source type: Journalism | The Type filter input shows "Journalism" |
| 2 | When the user exports the analysis as "Spreadsheet .xls" and as "Presentation .pptx" | Export: Excel and PowerPoint | The two export files are downloaded |
| 3 | Then the Target Sources section of the export includes sources of every type |  | Sources typed Review Sites, Social/UGC or Aggregator/Encyclopedic are present in the section, not only Journalism |
| 4 | And the section is identical to the reference export |  | Same sources, same order and same counts as the reference export generated with all source types |

#### TC-GEO-1120-012 - Range shorter than 7 days is widened to the 7-day floor

- **ACs:** AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that on a selected range shorter than 7 days the sources are pooled over a 7-day window ending on the most recent snapshot in scope. Covers AC-9.
- **Precondition:** A DAILY report with at least 10 daily snapshots, most recent snapshot on day D. Source S has failing articles only on answers of day D-5. Source T has failing articles only on answers of day D-8.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center of the report |  | The Target Sources list is displayed |
| 2 | When the user selects a 2-day custom range ending on the most recent snapshot | Date range: D-1 to D | The date filter shows the 2-day range and the list re-renders |
| 3 | Then source S is listed in the Target Sources |  | Source S is displayed because day D-5 falls inside the 7-day window D-6 to D |
| 4 | And source T is not listed |  | Source T is absent because day D-8 falls outside the 7-day window |

#### TC-GEO-1120-013 - Range longer than 7 days is used in full

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a selected range longer than 7 days is used in full and not truncated to 7 days. Covers AC-9.
- **Precondition:** A DAILY report with more than 30 days of history, most recent snapshot on day D. Source U has failing articles only on answers of day D-20.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Action Center is displayed with "Last 7 days" selected | Date range: Last 7 days | Source U is not listed |
| 2 | When the user selects a 30-day range ending on the most recent snapshot | Date range: Last 30 days (or custom D-29 to D) | The date filter shows the 30-day range and the list re-renders |
| 3 | Then source U is listed in the Target Sources |  | Source U is displayed because the full 30-day range is pooled |

#### TC-GEO-1120-014 - Report younger than 7 days uses every day it has

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a report holding fewer than 7 days of history pools every day it has. The view wording for short history is an open PM question and is not asserted. Covers AC-9.
- **Precondition:** A DAILY report created 3 days ago with snapshots on days D-2, D-1 and D. Source V has failing articles only on answers of day D-2.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center of the 3-day-old report |  | The Target Sources list is displayed |
| 2 | When the user selects a 1-day range on the most recent snapshot | Date range: D only | The date filter shows the 1-day range and the list re-renders |
| 3 | Then source V is listed in the Target Sources |  | Source V is displayed because the window pools every available day D-2 to D |

#### TC-GEO-1120-015 - AI Citation Sources keeps the selected range below 7 days

- **ACs:** AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the 7-day floor applies to the Action Center only: on a range shorter than 7 days AI Citation Sources keeps the selected range, so the two views show different source sets by design (not a bug). Covers AC-9.
- **Precondition:** Same report as TC-GEO-1120-012: most recent snapshot on day D, source S cited and failing only on answers of day D-5.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a 2-day custom range ending on the most recent snapshot is selected | Date range: D-1 to D | The date filter shows the 2-day range |
| 2 | When the user opens the Action Center |  | Source S is listed in the Target Sources |
| 3 | And the user opens AI Citation Sources with the same filters |  | AI Citation Sources is displayed for the D-1 to D range |
| 4 | Then source S is not listed in AI Citation Sources |  | Source S is absent because AI Citation Sources uses the selected 2-day range unchanged |
| 5 | And the source sets of the two views differ |  | The difference is the expected behaviour of AC-9 and must not be filed as a bug |

#### TC-GEO-1120-016 - Long source type name crops in the input with a tooltip

- **ACs:** AC-3 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** [Figma] Verify the long type name corner case of annotation 13969:25773 and example 13970:14902: the list grows to fit the widest type name, the input stays at 200px and crops a long selection with an ellipsis, the full name shows in a tooltip on hover. Covers DAC-3 (AC-3).
- **Precondition:** A completed analysis whose current scope contains at least one source of type "Aggregator/Encyclopedic".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Type filter |  | The dropdown is wide enough to show "Aggregator/Encyclopedic (1)" in full without cropping |
| 2 | When the user selects "Aggregator/Encyclopedic" | Source type: Aggregator/Encyclopedic | The dropdown closes |
| 3 | Then the input stays 200px wide and crops the selection with an ellipsis | Check width with browser DevTools | The input shows "Aggregator/Enc…" with an ellipsis and its width is 200px |
| 4 | When the user hovers over the source type input |  | A tooltip opens |
| 5 | Then the tooltip shows the full type name |  | The tooltip reads "Aggregator/Encyclopedic" |

#### TC-GEO-1120-017 - Global filter bar layout on the Action Center

- **ACs:** AC-4 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** [Figma] Verify the global filter bar shown on every frame of the Action Center and that the category is not a control of this bar. Covers DAC-4. Updated 2026-10-07 per GEO-1168: the page has its own Category filter next to the Type filter; it is not part of the global filter bar.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e (3 AI engines, several countries) opened with its default filters.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The "Target Sources" page is displayed |
| 2 | Then the global filter bar at the top right shows the date, AI engine and country filters and the export icon |  | The bar shows "Last 7 days", "AI Engines" with its count badge, "All Countries" and the export (download) icon |
| 3 | And the global filter bar holds no category control |  | Categories are selected from the left navigation or from the page Category filter next to the Type filter ("All categories"), not from the global filter bar |

### GEO-1121 — Story (Ready for QA)

#### TC-GEO-1121-001 - All clear message is shown instead of an empty list

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that when no source survives the verification funnel the Action Center shows an all-clear message instead of an empty list. Covers AC-1. Updated 2026-10-07 per GEO-1168: copy "All clear" / "Every article used by AI engines describes your brand positively." (DAC1 copy superseded). Conditional (no genuine all-clear analysis on staging on 2026-10-06).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis or a scope (AI Engines filter) where no source has a missing or negative article. Candidate: BYD 76aad462-a33f-4bdb-a925-2c1533e97a53 with the AI Engines filter on Gemini only (showed "All clear" on 2026-10-01 and 2026-10-02). If no candidate shows the state, record "not available". AstraZeneca and Cruz Roja Argentina ("Pages could not be checked") are not valid all-clear data.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of an analysis where no source has a missing or negative article | https://staging-geo.onclusive.com/geo/dashboard/76aad462-a33f-4bdb-a925-2c1533e97a53/actions - AI Engines = Gemini only (candidate) | The Action Center page is displayed |
| 2 | Then the user checks the Target Sources area |  | A check icon, the title "All clear" and the text "Every article used by AI engines describes your brand positively." are displayed |
| 3 | And the user checks that it is not the unchecked-pages state |  | "Pages could not be checked" is not displayed |

#### TC-GEO-1121-002 - All clear state carries the message alone with no source list

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** state
- **Description:** Verify that the all-clear state carries the message alone, with no source list under it (healthy-sources list removed by the PM). Covers AC-2. Conditional.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis or a scope (AI Engines filter) where no source has a missing or negative article. Candidate: BYD 76aad462-a33f-4bdb-a925-2c1533e97a53 with the AI Engines filter on Gemini only (showed "All clear" on 2026-10-01 and 2026-10-02). If no candidate shows the state, record "not available". AstraZeneca and Cruz Roja Argentina ("Pages could not be checked") are not valid all-clear data.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Action Center shows the all-clear state | Same analysis and scope as TC-GEO-1121-001 | "All clear" is displayed |
| 2 | Then no list is shown under the message |  | No source card, table row, verdict tab count, filter result or "Show N more sources" button is displayed |
| 3 | And no healthy-sources list is shown |  | No list of sources that cover the brand positively ("relationships to maintain") is displayed |

#### TC-GEO-1121-003 - Nothing could be checked shows "Pages could not be checked", not "All clear"

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that when no cited page could be checked the Target Sources area shows a distinct state instead of the all-clear message. Covers AC-1 (edge: the all-clear claim must not be made on unchecked pages). Updated 2026-10-07 per GEO-1194. Conditional: valid only while the AstraZeneca and Cruz Roja Argentina one-time reports are not re-collected.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account (access to the organisation "GEO Stress Test 2026-10"), interface language British English (en-GB), organisation switcher set to "GEO Stress Test 2026-10". One-time reports AstraZeneca 458c20e9-1dcc-4e82-a05b-2fca56431396 and Cruz Roja Argentina a3eb5a05-3cfa-4132-a116-3fec6a9e0c87 (single snapshot 2026-10-05, not re-collected).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the AstraZeneca analysis | https://staging-geo.onclusive.com/geo/dashboard/458c20e9-1dcc-4e82-a05b-2fca56431396/actions | The Action Center page is displayed |
| 2 | Then the user checks the Target Sources area |  | A grey warning icon, the title "Pages could not be checked" and the text "None of the cited pages could be checked." are displayed |
| 3 | And the user checks that the all-clear state is not shown |  | No "All clear" text, no green check icon and no source card are displayed |
| 4 | When the user opens the Action Center of the Cruz Roja Argentina analysis | https://staging-geo.onclusive.com/geo/dashboard/a3eb5a05-3cfa-4132-a116-3fec6a9e0c87/actions | The same "Pages could not be checked" state is displayed, with no "All clear" |
| 5 | When the user opens the Action Center of the Toyota analysis (organisation QA-GEO) | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The ranked source list is displayed, with neither "Pages could not be checked" nor "All clear" |

### GEO-1122 — Story (Ready for QA)

#### TC-GEO-1122-001 - A scope change takes effect on the next scheduled execution

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that a Manage Scope change (country, topic, AI engine or question) takes effect on the next scheduled execution, which produces a new snapshot with a complete re-analysis, and not immediately. Covers AC-1. Conditional.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A daily analysis whose scope may be changed temporarily (Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e was used on 2026-09-25 with Germany added, then restored); a disposable analysis is preferred (open point). Manage Scope holds Countries, Categories, AI insights language, AI Engines and Prompts. Conditional: the checks after the change need the next scheduled execution to have completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the analysis and notes the list | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The user records the total of target sources, the #1 source and the countries offered by the countries filter |
| 2 | When the user adds a country in Manage Scope and saves | Manage Scope > Countries: add a country not in scope (e.g. Germany) | The scope change is saved |
| 3 | Then the user reopens the Action Center before the next scheduled execution |  | The list is unchanged: same total and same #1 source as in step 1, and the added country is not offered yet |
| 4 | When the next scheduled execution has completed and the user reopens the Action Center | After the next daily run | The countries filter offers the added country and the period selector shows a new snapshot date |
| 5 | And the user removes the added country in Manage Scope and saves |  | The original scope is saved |

#### TC-GEO-1122-002 - After the execution the target list covers the full scope of the run

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that once the execution completes the target list covers the full scope of that run, ordered under the same rules. Covers AC-5. Conditional (runs after TC-GEO-1122-001 step 4).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A daily analysis whose scope may be changed temporarily (Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e was used on 2026-09-25 with Germany added, then restored); a disposable analysis is preferred (open point). Manage Scope holds Countries, Categories, AI insights language, AI Engines and Prompts. Conditional: the checks after the change need the next scheduled execution to have completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the next scheduled execution after the scope addition has completed | Same analysis as TC-GEO-1122-001 | The Action Center shows the Target Sources list (no verifying state) |
| 2 | When the user selects "All Countries" |  | The list covers the previous countries and the added country |
| 3 | Then sources of the added country are part of the list |  | Keeping only the added country lists sources (or the all-clear state), and they are also present in the All Countries list |
| 4 | And the list is ordered under the same rules |  | The ranks start at 1 with no gap and the totals (missing + negative) never increase from one rank to the next |

#### TC-GEO-1122-003 - A page already verified is re-checked on every run and reused only when unchanged

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that an article already verified in a previous snapshot is re-checked on every run (provider change detection), an unchanged page reuses its stored verdict without a full re-fetch or re-judge, and a changed page is re-fetched and re-judged; a failed pass never silently reuses a stored verdict. Covers AC-3. Back-end only.
- **Precondition:** Two consecutive snapshots of a daily analysis exist. Reference data identifies article U (page unchanged between the two runs) and article C (page changed between the two runs), both verified in the first snapshot. Back-end access to the selection / verification job of the snapshot is available (job output, logs or database read access). Back-end verifiable only: SKIP in UI runs.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given articles U and C were verified in the previous snapshot and reappear in the new one | Articles U and C from reference data | Both articles carry a stored verdict from the previous snapshot |
| 2 | When the verification of the new snapshot runs |  | The acquisition provider is called for both URLs in this run |
| 3 | Then article U returns the change status "same" and reuses its stored verdict |  | No full re-fetch and no new judge call is logged for U; its verdict is unchanged |
| 4 | And article C returns the change status "changed" and is re-fetched and re-judged |  | A full fetch and a new judge call are logged for C and its new verdict is stored |
| 5 | And a pass that fails does not reuse a stored verdict | Article whose provider call failed in the run (if any) | The article carries the "check could not be completed" outcome of GEO-1117 AC-11, not the previous verdict |

#### TC-GEO-1122-004 - A stored verdict reaching the staleness window is re-judged

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that a stored verdict that reaches the staleness window is re-fetched and re-judged regardless of the provider change status. Covers AC-4. Back-end only. The window value (7 days proposed on 2026-09-16) awaits PM confirmation (open point).
- **Precondition:** A daily analysis with an article whose stored verdict is older than the configured staleness window and whose page is unchanged (change status "same"). Back-end access to the selection / verification job of the snapshot is available (job output, logs or database read access). Back-end verifiable only: SKIP in UI runs.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a stored verdict older than the staleness window | Configured staleness window (record the value) | The verdict date and the window value are known |
| 2 | When the next verification run processes the article |  | The provider returns the change status "same" |
| 3 | Then the article is re-fetched in full and re-judged |  | A full fetch and a new judge call are logged although the page is unchanged |
| 4 | And the new verdict replaces the stored one with a new date |  | The stored verdict date is the date of this run |

#### TC-GEO-1122-005 - The new scope is verified under the same rules

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the suspect articles of the new snapshot are verified under exactly the same rules as any other article: same card rules, same tabs, same explanation lines and same passage rules for the added scope. Covers AC-2. Conditional (runs after TC-GEO-1122-001 step 4).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". A daily analysis whose scope may be changed temporarily (Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e was used on 2026-09-25 with Germany added, then restored); a disposable analysis is preferred (open point). Manage Scope holds Countries, Categories, AI insights language, AI Engines and Prompts. Conditional: the checks after the change need the next scheduled execution to have completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the next scheduled execution after the scope addition has completed | Same analysis as TC-GEO-1122-001 | The countries filter offers the added country |
| 2 | When the user keeps only the added country in the countries filter |  | A Target Sources list ranked from 1 is displayed for that country (or the all-clear state) |
| 3 | Then each card shows its badges and reason lines under the same rules |  | Each card shows "Not visible in N articles" and/or "Negative perception in N articles" matching its badges; no card shows a 0 count |
| 4 | And the details panel of the #1 source follows the same verification rules |  | "Lack of visibility" rows show no passage; "Negative perception" rows show a highlighted passage of at most 140 characters |

### GEO-1123 — Story (Action Needed)

#### TC-GEO-1123-001 - Details panel opens beside the list and closes on a second click

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that selecting a card opens the panel beside the list with the article evidence and the prompts section, and selecting the same card again closes it. Covers AC-1. Updated 2026-10-07 per GEO-1168: the panel no longer carries the brief (Key Takeaways block removed). Observed 2026-10-05: the panel is a modal dialog and the second click closes it through the backdrop (open point on switching to another card).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources list is displayed with ranked source cards on the ALL tab |
| 2 | When the user clicks the card ranked #1 |  | The details panel opens on the right, the list stays visible behind it and card #1 shows the selected state |
| 3 | Then the user checks the panel content |  | It shows "#1 · {domain}", the article tab(s) "Lack of visibility (N)" / "Negative perception (N)" with their articles, then "Prompts associated with this source", and the footer "Previous" / "Source 1 of N" / "Next source" |
| 4 | When the user clicks card #1 again | Click on the card area outside the panel | The panel closes and the list is displayed with no selected card |
| 5 | And the user opens the panel of card #1 again and clicks the close (×) button |  | The panel closes |

#### TC-GEO-1123-002 - The panel shows every failing article whatever the active verdict tab

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a panel opened from a verdict tab shows every failing article of the source across both verdicts, so the card count and the panel counts differ when the source carries both verdicts. Covers AC-2. Updated 2026-10-07 per GEO-1168: the brief part of AC-2 no longer applies (no brief in the panel).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes the two reason lines of a source with both badges on the ALL tab | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com | The card shows "Not visible in a articles" and "Negative perception in b articles" |
| 2 | When the user selects the "IMPROVE PERCEPTION" tab and opens the details panel of the noted source |  | The details panel of the source opens |
| 3 | Then both article tabs are shown with the counts of the ALL tab |  | "Lack of visibility (a)" and "Negative perception (b)" are shown, a and b as noted in step 1 |
| 4 | When the user clicks "Lack of visibility (a)" |  | The articles where the brand is not named are listed under "None of these articles mentions Toyota anywhere on the page.", although the page tab is IMPROVE PERCEPTION |

#### TC-GEO-1123-003 - Excel Brief follows the deterministic template for a source with both verdicts

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the brief is one deterministic sentence built from the AC-3 template. Covers AC-3. Updated 2026-10-07 per GEO-1168: the brief (Key Takeaways) is removed from the details panel; the remaining surface is the Brief column of the Excel Target Sources sheet (ranked sources table). Whether the positive part is still appended is an open point.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes a source with both badges and its two reason lines | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com | The card shows "Not visible in a articles" and "Negative perception in b articles" |
| 2 | When the user exports the analysis as "Spreadsheet .xls" |  | An .xlsx file is downloaded |
| 3 | And the user reads the Brief cell of that source in the ranked sources table | Target Sources sheet, column Brief | The cell holds one sentence |
| 4 | Then the sentence follows the both-verdicts template | Template: "This source has {n} unfavorable articles: {a} where the brand is entirely absent and {b} where the brand is depicted negatively." | The sentence reads "This source has n unfavorable articles: a where the brand is entirely absent and b where the brand is depicted negatively" with n = a + b, ending with a full stop or with the positive part ", and {p} articles that cover the brand positively." |
| 5 | And no AI-generated or recommendation sentence is added |  | No other sentence (e.g. "Fixing these three articles would flip this source healthy") is in the cell |

#### TC-GEO-1123-004 - Excel Brief never states a zero count

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a source with no positive article has no positive part and that no zero count is stated in the brief. Covers AC-4. Updated 2026-10-07 per GEO-1168: checked on the Excel Brief column (brief removed from the panel).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user exports the analysis as "Spreadsheet .xls" | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | An .xlsx file is downloaded |
| 2 | When the user reads every Brief cell of the ranked sources table | Target Sources sheet, column Brief | All brief sentences are read |
| 3 | Then no brief states a zero count | Search: " 0 ", ", and 0 articles" | No sentence contains "0 unfavorable", "0 where" or ", and 0 articles that cover the brand positively" |
| 4 | And a single-verdict source uses the single-verdict template | Visibility-only source | The sentence reads "This source has n unfavorable articles where the brand is entirely absent." (with or without the positive part), with no "0 where the brand is depicted negatively" |

#### TC-GEO-1123-005 - Excel Brief uses the singular form when a count equals one

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the noun of a count equal to one takes its singular form ("1 unfavorable article", "1 article that covers the brand positively"). Covers AC-5. Updated 2026-10-07 per GEO-1168: checked on the Excel Brief column (brief removed from the panel).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. The list holds at least one source with exactly 1 failing article (card line "Not visible in 1 article" or "Negative perception in 1 article").

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes a source whose card shows exactly one failing article | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The card reads "Not visible in 1 article" (or "Negative perception in 1 article") and no other line |
| 2 | When the user exports the analysis as "Spreadsheet .xls" and reads the Brief cell of that source | Target Sources sheet, column Brief | The cell holds one sentence |
| 3 | Then the sentence uses the singular form |  | The sentence reads "This source has 1 unfavorable article where the brand ..." and never "1 unfavorable articles" |
| 4 | And a positive part with one article uses the singular form | Only if a positive part is present | "and 1 article that covers the brand positively" (never "1 articles") |

#### TC-GEO-1123-006 - No In-Brief block is shown in the details panel

- **ACs:** AC-6 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify the brief presentation. Covers AC-6. Updated 2026-10-07 per GEO-1168: the Key Takeaways (In-Brief) block and its "Summary generated by artificial intelligence" disclaimer are removed from the panel (AC/app gap, accepted change), so the TC asserts their absence.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of the source ranked #1 | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The details panel opens |
| 2 | Then no In-Brief block is displayed |  | No "Key Takeaways" block, no summary sentence and no "Summary generated by artificial intelligence" disclaimer is shown in the panel |
| 3 | And the panel starts with the header and the article tabs |  | Under the header come the article tab(s), their explanation line and the articles |

#### TC-GEO-1123-007 - Brand-absent articles show the no-mention line and no passage

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a failing article where the brand is not named carries an explicit no-mention indication and shows no passage from the page. Covers AC-7. Updated 2026-10-07 per GEO-1178: the indication is one line under the "Lack of visibility (N)" tab, "None of these articles mentions {brand} anywhere on the page.", not repeated on each row (per-article line "No mention of {brand} anywhere on this page" removed).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of a source with the "IMPROVE VISIBILITY" badge | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The panel opens on "Lack of visibility (N)" |
| 2 | Then the no-mention indication is shown once under the tab | Brand: Toyota | "None of these articles mentions Toyota anywhere on the page." is shown once between the tabs and the first article |
| 3 | And no article row shows a passage from the page |  | No row of the tab shows a quoted passage; each row shows only its title, URL and engine icons |

#### TC-GEO-1123-008 - Negative passages are verbatim, highlight the brand and stay within 140 characters

- **ACs:** AC-8 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a failing article with a negative mention shows the extracted passage verbatim with the brand or product name highlighted, at most 140 characters including spaces. Covers AC-8. Updated 2026-10-07 per GEO-1182 / GEO-1183 (the passage always includes the brand or product and it is highlighted). How a passage ends is covered by TC-GEO-1183-006 (GEO-1201 open).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Open bugs that must not fail this TC: GEO-1201 (passage cut mid-word without "…"), GEO-1190 / GEO-1203 (competitor or homonym counted as the brand).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of the first source with the "IMPROVE PERCEPTION" badge | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The details panel opens |
| 2 | When the user clicks "Negative perception (N)" |  | "Each of these articles mentions Toyota negatively." is shown and every row shows a quoted passage in italics with a vertical bar on its left |
| 3 | Then every passage shows a highlighted brand or product name |  | Each passage contains Toyota or a Toyota product name shown in bold on a highlight chip |
| 4 | And the user counts the characters of each passage | Text inside the curly quotes, spaces included | No passage is longer than 140 characters |
| 5 | When the user opens the article of the first passage and searches its words | Ctrl+F on the first 5 words of the passage | The words are found on the page as shown in the passage (verbatim) |

#### TC-GEO-1123-009 - Each failing article shows the AI engines that cited it

- **ACs:** AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each failing article shows the icons of the AI engines that cited it. Covers AC-9.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of the source ranked #1 | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The details panel opens with its articles listed |
| 2 | Then each article row shows the icon(s) of the AI engine(s) that cited it |  | At least one engine icon (ChatGPT, Gemini and/or Perplexity) is right-aligned on each row |
| 3 | When the user hovers an engine icon |  | A tooltip shows the engine name |
| 4 | And the user checks the "Negative perception (N)" tab |  | Each negative article row also shows its engine icons |

#### TC-GEO-1123-010 - Evidence tabs are the reason tabs with the first one selected

- **ACs:** AC-10 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify the evidence tabs of the panel. Covers AC-10. Updated 2026-10-07 per GEO-1168 / GEO-1178: the tabs "Failing articles" / "Positive articles" are replaced by "Lack of visibility (N)" / "Negative perception (N)", each with its count, "Lack of visibility" first and selected by default; no positive tab (AC/app gap, accepted change).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of a source with both badges | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com | The details panel opens |
| 2 | Then two evidence tabs are shown, each with its count |  | "Lack of visibility (N)" with the eye-off icon and "Negative perception (N)" with the thumb-down icon |
| 3 | And "Lack of visibility (N)" is first and selected by default |  | "Lack of visibility (N)" is the left, active segment |
| 4 | And no "Failing articles" or "Positive articles" tab is shown |  | Neither label appears in the panel |

#### TC-GEO-1123-011 - Positive articles are kept in the data but shown on no surface of the panel

- **ACs:** AC-11 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify what is shown for positive articles. Covers AC-11. Updated 2026-10-07 per GEO-1168: positive articles are no longer shown in the panel (no tab, no row, no verdict label); they are checked via the source-detail API response, which carries title, address, passage and citing engines (AC/app gap, accepted change).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. A source of the list has at least one positive (neutral or positive) article. API access: browser DevTools (Network tab) on the Action Center.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of the source with a positive article with the Network tab open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - source from reference data | The panel opens and the source-detail response is captured |
| 2 | Then the response carries the positive article with its title, address, passage and citing engines |  | The four fields are filled for the positive article |
| 3 | And the panel shows no positive article |  | The positive article URL appears in no tab, and no label such as "Covers Toyota accurately and positively" or "Toyota ranked #1 on this page" is displayed |

#### TC-GEO-1123-012 - No positive tab is shown, whether or not the source has positive articles

- **ACs:** AC-12 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** Verify that a source without positive articles shows no "Positive articles" tab. Covers AC-12. Updated 2026-10-07 per GEO-1168: the tab is removed for every source, so it is also absent for a source that has positive articles.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference data identifies one source with positive articles and one without.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of a source without positive articles | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | Only the reason tab(s) are shown |
| 2 | Then no "Positive articles" tab is shown |  | No positive tab or positive count is displayed |
| 3 | When the user opens the details panel of a source with positive articles | Source from reference data | Only the reason tab(s) are shown |
| 4 | Then no "Positive articles" tab is shown either |  | No positive tab or positive count is displayed |

#### TC-GEO-1123-013 - Panel header shows rank, domain, type and badges with no count line

- **ACs:** AC-13 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify the panel header. Covers AC-13. Updated 2026-10-07 per GEO-1168: the header meta line (failing, positive and cited counts) is removed (AC/app gap, accepted change).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of the source ranked #1 | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The details panel opens |
| 2 | Then the header shows the logo, "#1 · {domain}", the source type chip and the reason badge(s) |  | The header elements are displayed with a close (×) button |
| 3 | And no count line is shown under the header |  | No "N failing articles · N positive · cited N× in gap answers" line or any cited count is displayed |

#### TC-GEO-1123-014 - Positive articles change no count outside the panel

- **ACs:** AC-14 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that positive articles change nothing outside the panel: rank, badges, card counts, table counts and tab membership come from failing articles alone. Covers AC-14.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. A source of the list has at least one positive article (reference data or source-detail API response).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user captures the source-detail API response of the source with positive articles | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - source from reference data | The response lists p positive articles, a missing and b negative articles |
| 2 | Then the card of the source shows only its failing counts |  | The card shows "Not visible in a articles" and/or "Negative perception in b articles"; p is added to neither line |
| 3 | When the user switches to the list view |  | The Articles chips of the source show a and b only |
| 4 | And the user checks the rank of the source |  | The source is ranked by a + b against the other sources |
| 5 | And the user checks the verdict tabs |  | The source is listed on IMPROVE VISIBILITY only if a > 0 and on IMPROVE PERCEPTION only if b > 0 |

#### TC-GEO-1123-015 - Prompt rows show question, engines and country, once per prompt and with no outcome

- **ACs:** AC-15 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each prompt row shows the question, the engine(s) and the country, and no outcome (brand absent, competitor chosen, unfavorable). Covers AC-15. Updated 2026-10-07 per GEO-1178 / GEO-1167: section "Prompts associated with this source", one row per prompt with the icons of every citing engine and the market flag; no duplicate even ignoring case (GEO-1219 open: "Kia" / "KIA" case duplicates, expected = one row).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of the source ranked #1 | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The details panel opens |
| 2 | When the user scrolls to "Prompts associated with this source" and clicks "Show X more prompts" |  | The full prompts list is displayed under the "All" engine tab |
| 3 | Then each prompt row shows the prompt text, its engine icon(s) and the market flag |  | The country is shown as a flag (no UUID, no blank) |
| 4 | And no prompt text appears on two rows | Compare the texts ignoring case, spacing and quotes | Each prompt appears once with the icons of all the engines citing it |
| 5 | And no outcome is shown on any row |  | No "Brand absent", "Competitor chosen", "Unfavorable" or winner (e.g. "Tesla #1") is displayed |

#### TC-GEO-1123-016 - Excel Brief follows the negative-depiction template for a perception-only source

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify the template row "Failing part, one verdict, negative depiction" of the brief. Covers AC-3. Updated 2026-10-07 per GEO-1168: checked on the Excel Brief column (brief removed from the panel).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes a source with only the "IMPROVE PERCEPTION" badge | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The card shows only "Negative perception in b articles" |
| 2 | When the user exports the analysis as "Spreadsheet .xls" and reads the Brief cell of that source | Target Sources sheet, column Brief | The cell holds one sentence |
| 3 | Then the sentence follows the negative-depiction template | Template: "This source has {n} unfavorable articles where the brand is depicted negatively." | The sentence reads "This source has b unfavorable articles where the brand is depicted negatively" (singular when b = 1), with no "entirely absent" part |

#### TC-GEO-1123-017 - Passages keep the capitalisation of the page

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that passages are shown verbatim with the capital letters of the page, never all in lower case. Covers AC-8. Non-regression of GEO-1159.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the "Negative perception (N)" tab of a source with the "IMPROVE PERCEPTION" badge | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. caranddriver.com | The negative articles are listed with their passage |
| 2 | Then every passage keeps the capital letters of the page |  | Sentence starts and proper nouns are capitalised and "Toyota" is written with a capital T; no passage is entirely in lower case |
| 3 | When the user opens the article of the first passage and searches its first words | Ctrl+F on the first 5 words of the passage | The words are found on the page with exactly the same capitalisation |

#### TC-GEO-1123-018 - Article lists show 10 articles then "Show N more articles"

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a tab with more than 10 articles shows 10 articles followed by a "Show N more articles" button. Covers AC-1 (failing articles of the panel). Updated 2026-10-07 per GEO-1161.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of a source with more than 10 articles in one tab | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - e.g. frandroid.com (any source whose tab count is above 10) | The tab count is above 10 |
| 2 | Then exactly 10 articles are displayed, followed by the button |  | "Show N more articles" is displayed with N = tab count - 10 |
| 3 | When the user clicks "Show N more articles" |  | All the articles of the tab are displayed (their number equals the tab count) and the button is no longer displayed |
| 4 | And the user opens a source whose tabs hold 10 articles or fewer |  | No "Show N more articles" button is displayed |

#### TC-GEO-1123-019 - Passages and article titles show page text without markdown or escape characters

- **ACs:** AC-8 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that passages and titles are page text as a reader sees it, with no markdown link, link target, bold markers, image syntax, table pipes or escape backslash. Covers AC-8. Updated 2026-10-07 per GEO-1202. Restricted to the Toyota analysis (older verdicts of other reports are cleaned when re-judged).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the "Negative perception (N)" tab of the first 10 sources with the "IMPROVE PERCEPTION" badge | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The passages are listed |
| 2 | Then no passage contains markdown or a link target | Look for [text](url), (https://, **, ![, table pipes, backslash | No passage contains link syntax, a link target, bold markers, image syntax, table pipes or a backslash |
| 3 | When the user reads the article titles of the details panels of the first 5 sources | e.g. a title with an apostrophe such as "l'électrique" | Titles with an apostrophe are displayed as on the page |
| 4 | Then no article title contains a backslash | Ctrl+F "\" | No title shows an escape character (e.g. "l\'électrique") |

### GEO-1124 — Story (QA In Progress)

#### TC-GEO-1124-001 - PowerPoint Target Sources slide is built from the ALL tab whatever the screen shows

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the exported Target Sources section is built from the "All" tab with the total failing article count per source, whatever tab and view the user stands on. Covers AC-1. Updated 2026-10-07 per GEO-1160 / GEO-1173: the section is the last slide, its table has 4 columns "# | Source | Type | Failing articles" (Cited column removed on purpose).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis with default filters | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The user notes the sources ranked 1 to 10 of the ALL tab and the total M of target sources |
| 2 | When the user selects the "IMPROVE PERCEPTION" tab and switches to the list view |  | The screen shows the reduced perception list in the table |
| 3 | And the user exports the analysis as "Presentation .pptx" |  | A .pptx file is downloaded |
| 4 | Then the user opens the last slide of the deck |  | It shows "ACTION CENTER · TARGET SOURCES", the title "Where PR effort pays first" and the subtitle "Top N of M verified target sources · every claim checked against the page itself", M being the total noted in step 1 |
| 5 | And the user checks the top 3 cards and the table of the slide |  | The cards are the sources ranked 1 to 3 and the table rows follow ranks 4 to 10 of the ALL tab (visibility-only sources included), not the perception list on screen |
| 6 | And the user checks the counts of the slide |  | Each source shows its total of both verdicts (missing and negative counts as in the app), not its perception count only |

#### TC-GEO-1124-002 - Excel Target Sources sheet is recomputed inside the export scope

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the counts, the badges and the order of the exported section are recomputed inside the export scope (countries, AI engines, period) under the rules of GEO-1120. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. Open bugs on other sheets that must not fail this TC: GEO-1210 / GEO-1211 (Excel gauges and Raw Data residuals).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis and keeps only one country | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" - Country: United States | The list is recomputed; the user notes the #1 source and its reason lines |
| 2 | When the user exports the analysis as "Spreadsheet .xls" |  | An .xlsx file is downloaded |
| 3 | Then the user reads the first line of the Target Sources sheet | Sheet named Target Sources in the export language | One title line "Toyota - {sheet} ({markets} · {engines} · snapshot {dates})" names the selected country and the engines of the page |
| 4 | And the user reads rank 1 of the ranked sources table |  | Rank 1 is the #1 source noted in step 1 |
| 5 | And the user compares its counts with the app |  | Its Brand absent and Depicted negatively values equal its "Not visible in N articles" and "Negative perception in N articles" lines in the United States scope, and its Badges match the card |

#### TC-GEO-1124-003 - Export covers all categories and all source types whatever the screen filters

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that all categories and all source types are always covered and that the on-screen Category and Type filters have no effect on the exported section. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes the sources ranked 1 to 10 with default filters | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The ALL-tab order and the total M are noted |
| 2 | When the user selects a category and the type "Journalism" | Category: first category of the left menu; Type: Journalism | The screen shows a reduced list |
| 3 | And the user exports the analysis as "PDF" and as "Spreadsheet .xls" |  | The two files are downloaded |
| 4 | Then the last page of the PDF lists the ALL-tab sources of step 1 | Page rendered and read visually | The top cards and the table follow ranks 1 to 10 of step 1, including types other than Journalism, and the subtitle states M |
| 5 | And the ranked sources table of the Excel sheet holds every source of step 1 |  | The table holds M rows with every source type, not only Journalism sources of the selected category |

#### TC-GEO-1124-004 - Excel Target Sources sheet carries the panel evidence in stacked tables

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Excel Target Sources sheet carries the full evidence of the panel in stacked tables: ranked sources, failing articles, positive articles, failing prompts, under a one-line house-style header. Covers AC-4. Open point: after GEO-1168 (positive articles removed from the panel, no Cited count on any surface) the presence of the positive articles table and of the "Citations in qualifying answers" column is to be confirmed; they are recorded, not asserted.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user exports the analysis as "Spreadsheet .xls" with default filters | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | An .xlsx file is downloaded |
| 2 | When the user opens the Target Sources sheet |  | The first line is one title line "{entity} - {sheet} ({markets} · {engines} · snapshot {date})", with no key/value block |
| 3 | Then the first table is the ranked sources table |  | Its columns start with Rank, Domain, Source type, Badges, Failing articles, Brand absent, Depicted negatively and include Brief (record whether "Positive articles" and "Citations in qualifying answers" are present) |
| 4 | And the failing articles table follows |  | Columns: Domain, Source rank, Article title, URL, Verdict, Passage, Citing engines; the Passage cell is empty for brand-absent articles whose Verdict reads "No mention of {brand} anywhere on this page" |
| 5 | And the failing prompts table is present |  | Columns: Domain, Source rank, Question, Engine, Country, with no Outcome column |
| 6 | And the user records whether a positive articles table is present |  | If present: columns Domain, Source rank, Article title, URL, Passage, Citing engines, with no Verdict column, kept separate from the failing articles table |

#### TC-GEO-1124-005 - PowerPoint shows the top 3 sources as cards and the next ones in the table

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the deck carries the top three sources as cards and the failing article counts of the other displayed sources, and that when the sources exceed what the slide holds the full total is stated. Covers AC-5. Updated 2026-10-07 per GEO-1168 (cards use the split copy) and GEO-1160 (table "# | Source | Type | Failing articles", no Cited column). Whether the top 3 cards still carry the brief sentence is an open point (recorded, not asserted).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes the reason lines of the cards ranked 1 to 3 and the total M | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The reason lines and M are noted |
| 2 | When the user exports the analysis as "Presentation .pptx" |  | A .pptx file is downloaded |
| 3 | Then the last slide shows three top cards for ranks 1, 2 and 3 |  | Each card shows its rank, favicon, domain, badges and the same reason lines as the app joined with " · " (e.g. "Not visible in N articles · Negative perception in N articles"), singular "1 article" when a count is 1 (record whether a brief sentence is shown) |
| 4 | And the table lists ranks 4 to 10 with their counts |  | The table has exactly 4 columns "#", "Source", "Type", "Failing articles"; each row shows its missing and negative counts as in the app; no "Cited" column |
| 5 | And the subtitle states the full total |  | "Top 10 of M verified target sources · every claim checked against the page itself" |

#### TC-GEO-1124-007 - Export carries the all-clear message alone when no source survives

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that when no source survives verification in the exported scope the section carries the all-clear message alone. Covers AC-7. Conditional (same data as TC-GEO-1121-001).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis or a scope where no source has a missing or negative article (candidate BYD 76aad462-a33f-4bdb-a925-2c1533e97a53 with AI Engines = Gemini only). Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Action Center shows the all-clear state | https://staging-geo.onclusive.com/geo/dashboard/76aad462-a33f-4bdb-a925-2c1533e97a53/actions - AI Engines = Gemini only (candidate) | "All clear" is displayed |
| 2 | When the user exports the analysis as "Presentation .pptx" with the same scope |  | A .pptx file is downloaded |
| 3 | Then the last slide carries the all-clear message alone |  | It shows "ACTION CENTER · TARGET SOURCES", a check icon and "All clear" with "Every article used by AI engines describes your brand positively.", with no source list |
| 4 | When the user exports the analysis as "Spreadsheet .xls" with the same scope |  | An .xlsx file is downloaded |
| 5 | Then the Target Sources sheet carries the all-clear message alone |  | The sheet shows the all-clear message and no ranked sources rows |

#### TC-GEO-1124-008 - Export Target Sources section uses the 7-day source window

- **ACs:** AC-8 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the 7-day source window of GEO-1120 AC-9 applies to the exported Target Sources section, while the AI Citation Sources section of the export keeps the export scope unchanged. Covers AC-8.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes the Target Sources total T7 with "Last 7 days" | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | T7 and the #1 source are noted |
| 2 | When the user selects the period "Last analysis", clicks "Apply" and exports the analysis as "Presentation .pptx" | Date preset: Last analysis | A .pptx file is downloaded |
| 3 | Then the Target Sources slide is built on at least 7 days |  | The subtitle states M = T7 and the #1 card is the #1 source noted in step 1 (any difference is recorded with the snapshot dates) |
| 4 | And the AI Citation Sources slide follows the selected period only | Slide "Which sources shape your AI presence" | Its domain total equals the "All domains" count of the Overview for "Last analysis", lower than the "Last 7 days" count |

#### TC-GEO-1124-009 - Excel Brief column is written in the export language

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Brief column of the Excel Target Sources sheet is written in the export language (French "Cette source compte ...", Spanish "Esta fuente tiene ..."), never in English. Covers AC-4 (localisation). Updated 2026-10-07 per GEO-1162.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user switches the interface language to French and clicks "Save changes" | Settings > Preferences > Interface Language = French | The interface is displayed in French |
| 2 | When the user exports the Toyota analysis as a spreadsheet | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | A French .xlsx file is downloaded |
| 3 | Then every cell of the summary column of the target sources sheet is in French | Sheet "Sources à cibler", column "Résumé" | Every cell reads like "Cette source compte N articles problématiques ..."; no cell starts with "This source has" |
| 4 | When the user switches the interface language to Spanish, saves and exports the analysis as a spreadsheet again | Interface Language = Spanish | A Spanish .xlsx file is downloaded |
| 5 | Then every cell of the summary column is in Spanish | Sheet "Fuentes a priorizar", column "Resumen" | Every cell reads like "Esta fuente tiene N artículos problemáticos ..."; no cell starts with "This source has" |
| 6 | And the user switches the interface language back to British English and clicks "Save changes" | Interface Language = British English | The interface is displayed in British English and the left menu shows "Action Center" |

#### TC-GEO-1124-010 - PDF Target Sources table has 4 separate columns ending with the failing articles header

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the ranked sources table of the Action Center · Target Sources page (last page) has 4 separate columns "# | Source | Type | <failing articles>" in English, French and Spanish, with no Cited column (removed on purpose) and no concatenated headers. Covers AC-5. Updated 2026-10-07 per GEO-1160 / GEO-1222: expected last header "Failing articles" (EN), "Articles problématiques" (FR), "Artículos problemáticos" (ES). GEO-1222 is open (currently "Articles" / "Artículos"), so EN and ES are expected to fail until it is fixed.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user exports the Toyota analysis as "PDF" in British English | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | A PDF file is downloaded |
| 2 | Then the last page shows the ranked sources table with 4 columns | Last page (41 of 41 on 2026-10-06) | The headers are "#", "Source", "Type", "Failing articles"; no "Cited" header |
| 3 | When the user switches the interface language to French, saves and exports the analysis as "PDF" | Interface Language = French | A French PDF file is downloaded |
| 4 | Then the last page table headers are separate and in French | Title "Où l'effort RP paie d'abord" | The last header reads "Articles problématiques", separate from "Type", with no "Citée" column and no concatenation |
| 5 | When the user switches the interface language to Spanish, saves and exports the analysis as "PDF" | Interface Language = Spanish | A Spanish PDF file is downloaded |
| 6 | Then the last page table headers are separate and in Spanish | Title "Dónde rinde primero el esfuerzo de RR. PP." | The last header reads "Artículos problemáticos", with no "Citada" column and no concatenation |
| 7 | And the user switches the interface language back to British English and clicks "Save changes" | Interface Language = British English | The interface is displayed in British English |

### GEO-1125 — Story (QA In Progress)

#### TC-GEO-1125-001 - Citation Sources section shows only Domain Type and Frequency columns

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the AI Engines Citation Sources section carries the Domain, Type and Frequency columns only, with no Favorability column. Covers AC-1 (DAC1, Figma 11725:94037). Wording aligned with staging after GEO-625 (unified Sources modals) and the LLM Engines to AI Engines rename (2026-10-05). Updated 2026-10-07 per GEO-1198 (exactly 3 columns, no chevron column) and GEO-1196 / GEO-1200 (section name "AI Engines Citation Sources" and its subtitle, PO confirmed).
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the overview page of the Toyota dashboard | Dashboard 439acd96-0b1b-4da4-9e07-612d38e9783e | The dashboard overview is displayed |
| 2 | When the AI Engines Citation Sources section renders |  | "AI Engines Citation Sources" and "See which domains AI Engines reference most often for your brand and niche" are displayed, with the "All source types" filter, the stacked bar and its legend |
| 3 | Then the domain table shows exactly three column headers |  | The headers read "Domain", "Type" and "Frequency", in this order, each with a sort icon |
| 4 | And no Favorability column and no chevron column are present |  | No header or column labelled "Favorability" (or Favorable / Mixed / Unfavorable) and no empty chevron column is displayed; each row shows only the domain with its favicon and external-link icon, the type chip and the frequency |
| 5 | And the "All domains" button is displayed under the table |  | "All domains" with the count badge N is displayed under the last row |

#### TC-GEO-1125-002 - All domains modal shows only Domain Type and Frequency columns

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the "All domains" modal carries the Domain, Type and Frequency columns only, also after a search. Covers AC-1 (DAC2, Figma 11725:94227). Wording aligned with staging after GEO-625 (unified Sources modals) and the LLM Engines to AI Engines rename (2026-10-05). Updated 2026-10-07 per GEO-1198: exactly 3 columns Domain · Type · Frequency, no chevron column.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the AI Engines Citation Sources section is displayed |  | The domain table and the "All domains (N)" button are displayed |
| 2 | When the user clicks the "All domains" button |  | A modal opens with the title "Sources - All domains", the subtitle "Showing N of M domains" and the search field "Search domains..." |
| 3 | Then the modal table shows exactly three column headers |  | The headers read "Domain", "Type" and "Frequency", in this order, each with a sort icon |
| 4 | And no Favorability column and no chevron column are present in the modal |  | No header or column labelled "Favorability" (or Favorable / Mixed / Unfavorable) and no chevron column is displayed in the modal |
| 5 | When the user types a domain in the search field | Search term: the first domain of the list (for example "reuters") | The list is narrowed to the domains matching the term |
| 6 | Then the filtered table still shows only the Domain, Type and Frequency columns |  | The headers still read "Domain", "Type" and "Frequency" and no Favorability column appears |

#### TC-GEO-1125-003 - [Figma] Source type filter and legend hover keep the three-column table

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** [Figma] Verify that the source type filter and the legend hover states keep the table at Domain, Type and Frequency only. Covers AC-1 (DAC1 frame 11725:94037 "Legend Select / Source Filter", DAC3 frames 11725:93656 and 11725:93846 "Legend Hover"). Updated 2026-10-05: the hover highlight of the Figma frames is not required by any AC, so it is not checked.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the AI Engines Citation Sources section is displayed with "All source types" |  | The domain table lists domains of several types |
| 2 | When the user hovers a segment of the stacked bar | Segment: Journalism | The table behind it is unchanged (no hover highlight is required: no AC covers it) |
| 3 | Then the table still shows only the Domain, Type and Frequency columns |  | The headers read "Domain", "Type" and "Frequency" and no Favorability column appears |
| 4 | When the user selects one source type in the "All source types" filter | Source type: Journalism | The table lists only domains with the "Journalism" type chip |
| 5 | Then the filtered table still shows only the Domain, Type and Frequency columns |  | The headers read "Domain", "Type" and "Frequency" and no Favorability column appears |

#### TC-GEO-1125-004 - Citation Sources table has three columns in fr-FR and es-ES

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Citation Sources section and the All domains modal carry three columns and no translated Favorability header in the French and Spanish locales. Covers AC-1 (localisation, Definition of Done). Updated 2026-10-07 per GEO-1144: the modal subtitle "Showing N of M domains" is translated in French and Spanish.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time. The app language can be switched to fr-FR and es-ES. The test restores the app language to en-GB at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user switches the app language to es-ES | Locale: es-ES | The section heading reads "Fuentes de citación de los motores de IA" |
| 2 | When the Citation Sources section renders |  | The domain table is displayed |
| 3 | Then the table shows exactly three column headers |  | Three headers are displayed (Spanish labels of Domain, Type and Frequency) and no header reads "Favorabilidad" or any other translation of Favorability |
| 4 | And the All domains modal shows exactly three column headers |  | The modal opened from the "All domains" button shows the same three headers and no Favorability header |
| 5 | And the All domains modal subtitle is translated in Spanish |  | The subtitle under the modal title is in Spanish, with no English "Showing N of M domains" |
| 6 | When the user switches the app language to fr-FR | Locale: fr-FR | The section heading is displayed in French |
| 7 | Then the section table and the All domains modal show exactly three column headers |  | Three headers are displayed in both tables and no header reads "Favorabilité" or any other translation of Favorability |
| 8 | And the All domains modal subtitle is translated in French |  | The subtitle under the modal title is in French, with no English "Showing N of M domains" |
| 9 | And the user switches the app language back to en-GB | Locale: en-GB | The section heading reads "AI Engines Citation Sources" again |

#### TC-GEO-1125-005 - Favorability is not a sort key in the Citation Sources section

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that only Domain, Type and Frequency are offered as sort keys in the section table and that Favorability is not. Covers AC-2.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the AI Engines Citation Sources section is displayed |  | The domain table is displayed with the headers "Domain", "Type" and "Frequency" |
| 2 | When the user inspects the sortable headers of the table |  | Exactly three headers carry a sort icon: "Domain", "Type" and "Frequency" |
| 3 | And the user clicks the "Frequency" header |  | The rows are re-ordered by frequency |
| 4 | And the user clicks the "Domain" header |  | The rows are re-ordered alphabetically by domain |
| 5 | And the user clicks the "Type" header |  | The rows are re-ordered by type |
| 6 | Then no Favorability sort key is offered |  | No header, sort menu or sort option named "Favorability" exists, and no fourth sortable header is present |

#### TC-GEO-1125-006 - Favorability is not a sort key in the All domains modal

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that only Domain, Type and Frequency are offered as sort keys in the All domains modal and that Favorability is not. Covers AC-2. Wording aligned with staging after GEO-625 (unified Sources modals) and the LLM Engines to AI Engines rename (2026-10-05).
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the "All domains" modal is open |  | "Sources - All domains" is displayed with the headers "Domain", "Type" and "Frequency" |
| 2 | When the user inspects the sortable headers of the modal table |  | Exactly three headers carry a sort icon: "Domain", "Type" and "Frequency" |
| 3 | And the user clicks the "Frequency" header |  | The rows are re-ordered by frequency |
| 4 | And the user clicks the "Type" header |  | The rows are re-ordered by type |
| 5 | Then no Favorability sort key is offered |  | No header, sort menu or sort option named "Favorability" exists, and no fourth sortable header is present |

#### TC-GEO-1125-007 - No favorability badge on domain rows of the section and the All domains modal

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that no favorable, mixed or unfavorable badge is shown for a domain in the section table and in the All domains modal. Covers AC-3.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the AI Engines Citation Sources section is displayed |  | The domain table is displayed |
| 2 | When the domain rows of the section render |  | Each row shows the favicon, the domain with its external-link icon, the type chip (for example "Journalism", "Social / UGC", "Competitor Media") and the frequency |
| 3 | Then no favorability badge is shown on any row |  | No "Favorable", "Mixed" or "Unfavorable" badge, chip or coloured indicator is displayed on any domain row |
| 4 | When the user opens the "All domains" modal and scrolls through the list |  | The modal lists the domains with the same row layout |
| 5 | Then no favorability badge is shown on any row of the modal |  | No "Favorable", "Mixed" or "Unfavorable" badge, chip or coloured indicator is displayed on any domain row of the modal |

#### TC-GEO-1125-008 - No favorability badge in the source details panel

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the source details panel of a domain shows no favorable, mixed or unfavorable badge. Covers AC-3 (Figma 11725:95113 / 11725:125298 "Source Details"). Wording aligned with staging after GEO-625 (unified Sources modals) and the LLM Engines to AI Engines rename (2026-10-05).
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the AI Engines Citation Sources section is displayed |  | The domain table is displayed |
| 2 | When the user clicks the first domain of the table | Domain: first row of the table | The side panel "AI Engines Citation Source Details" opens |
| 3 | Then the panel shows its sections without any favorability badge |  | "Related Prompts" with the "All related Prompts (n)" control and "Sources" with the "All sources (n)" control are displayed, and no "Favorable", "Mixed" or "Unfavorable" badge is shown for the domain |
| 4 | When the user scrolls to the end of the panel |  | All sections of the panel have been displayed |
| 5 | Then no favorability badge or label is shown anywhere in the panel |  | No "Favorable", "Mixed" or "Unfavorable" badge, chip or label is shown in the panel header, the prompt rows or the cited URL rows |
| 6 | When the user opens the details panel of a domain from the "All domains" modal | Domain: any row of the modal | The side panel "AI Engines Citation Source Details" opens for that domain |
| 7 | Then no favorability badge is shown in that panel either |  | No "Favorable", "Mixed" or "Unfavorable" badge is shown for the domain |

#### TC-GEO-1125-009 - XLSX export AI Citation Sources table carries Domain Type and Frequency only

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the domain table of the AI Citation Sources section in the XLSX workbook carries Domain, Type and Frequency only. Covers AC-4. Updated 2026-10-07 per GEO-1200 (section named "AI Engines Citation Sources" in the XLSX) and GEO-1197 (XLSX source types match the app).
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time. The user can export the analysis from the "Export" button at the top right of the dashboard. The runner downloads the file and parses it (XLSX: xl/workbook.xml, xl/sharedStrings.xml and xl/worksheets/*.xml; PPTX: ppt/slides/slide*.xml).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the overview page of the Toyota dashboard |  | The "Export" button is displayed at the top right |
| 2 | When the user exports the analysis in Excel (XLSX) format | Format: XLSX | An .xlsx file is downloaded |
| 3 | And the runner opens the AI Citation Sources section of the workbook | Sheet: the sheet holding the AI Citation Sources domain table (see the open points of the epic review) | The sheet holding the citation sources domain table is found |
| 4 | Then the header row of the domain table carries Domain, Type and Frequency only |  | The header row has exactly three cells: "Domain", "Type" and "Frequency" |
| 5 | And no Favorability column or value is present in that table |  | No header reads "Favorability" and no cell of the table holds "Favorable", "Mixed" or "Unfavorable" |
| 6 | And the data rows match the domain table of the dashboard |  | The first rows list the same domains, types and frequencies as the section table on screen, with three cells per row |
| 7 | And the source types of the workbook match the types of the app | e.g. kbb.com and cars.com, a gouv.fr domain | Each domain carries the same type as its chip in the app (kbb.com / cars.com = Aggregators, gouv.fr = Gov / NGO) |
| 8 | And the section is named as in the app |  | The block title reads "AI Engines Citation Sources" (no "LLM Engines") |

#### TC-GEO-1125-010 - PPTX export AI Citation Sources slide table carries Domain Type and Frequency only

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the domain table of the AI Citation Sources slide in the PowerPoint deck carries Domain, Type and Frequency only. Covers AC-4. Updated 2026-10-05: the slide is "Which sources shape your AI presence" and its table is drawn with text shapes, so the three columns are checked from the header texts and the row values.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time. The user can export the analysis from the "Export" button at the top right of the dashboard. The runner downloads the file and parses it (XLSX: xl/workbook.xml, xl/sharedStrings.xml and xl/worksheets/*.xml; PPTX: ppt/slides/slide*.xml).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the overview page of the Toyota dashboard |  | The "Export" button is displayed at the top right |
| 2 | When the user exports the analysis in PowerPoint (PPTX) format | Format: PPTX | A .pptx file is downloaded |
| 3 | And the runner opens the AI Citation Sources slide of the deck | Slide: "Which sources shape your AI presence" (eyebrow "SOURCES · OVERVIEW") | The slide XML holding the citation sources domain table is found |
| 4 | Then the domain table of the slide has exactly three columns |  | The domain table of the slide shows exactly three column headers, "Domain", "Type" and "Frequency", and each data row has three values (domain, type, frequency); the table may be drawn with text shapes instead of an a:tbl |
| 5 | And no Favorability column or value is present on the slide |  | No text on the slide reads "Favorability", "Favorable", "Mixed" or "Unfavorable" |

#### TC-GEO-1125-011 - Lite PQL result table has no Favorability column and stays aligned with its ghost rows

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Lite (PQL) result table carries no Favorability column (no blurred grey pill column) and that the real table and the gated ghost rows keep the same column count and stay aligned. Covers AC-5. Updated 2026-10-07 per GEO-1198 (Lite result table has exactly 3 columns Domain · Type · Frequency) and GEO-1200 (section name "AI Engines Citation Sources" on the Lite page). Conditional: needs the PQL account and one Lite analysis run.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in on staging with the dedicated PQL account assiya.benramdane+geo@onclusive.com (Lite plan), app language en-GB, and a Lite analysis result is displayed with its result table and the gated ghost rows beneath it. The real table and the ghost rows are two table-fixed tables that share the same colgroup: they must keep the same column count and stay aligned after the Favorability column is removed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is logged in with the PQL account on staging and a Lite analysis result is displayed | Account: assiya.benramdane+geo@onclusive.com | The Lite result page shows the result table and the gated ghost rows beneath it |
| 2 | When the result table renders |  | The table headers and the first real rows are displayed |
| 3 | Then the result table has exactly the columns Domain, Type and Frequency |  | Exactly three headers "Domain", "Type" and "Frequency"; no chevron column; the section is named "AI Engines Citation Sources" |
| 4 | And no Favorability column is displayed in the result table |  | No header reads "Favorability" and no cell shows the blurred grey favorability pill |
| 5 | And no Favorability column is displayed in the gated ghost rows |  | No ghost row shows a blurred grey favorability pill in a dedicated column |
| 6 | And the real table and the ghost rows table have the same column count |  | Both tables have the same number of col entries in their colgroup and the same number of cells per row |
| 7 | And the columns of the ghost rows are aligned with the columns of the real table |  | For each column, the left and right edges of the ghost row cells match the header and real row cells (within 1 px); no column is shifted or overflowing |

#### TC-GEO-1125-012 - Citation sources API returns no favorability field for a domain

- **ACs:** AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that the backend no longer returns any favorability value in the domain data of the citation sources response (removed, not hidden). Covers AC-6.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time. The runner can capture the network response of GET /geo/api/v1/reports/{id}/overview/citation-sources.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the overview page of the Toyota dashboard |  | The page sends GET /geo/api/v1/reports/{id}/overview/citation-sources |
| 2 | When the citation sources response is received |  | The response status is 200 and it lists the domains shown in the section |
| 3 | Then no domain object carries a favorability field |  | No key named favorability, favorable, mixed, unfavorable or favorabilityLabel (any case) exists at any level of the domain objects |
| 4 | And each domain object carries only the citation source fields | Expected keys (captured 2026-09-25): domain, sourceType, frequency, citedBy, visibilityGaps, competitiveLosses, sentimentIssues, llmCitations, citedUrls | Every domain object has exactly these keys and no additional one |
| 5 | When the user opens the "All domains" modal |  | The modal lists the N domains |
| 6 | Then the data loaded for the modal carries no favorability field either |  | No request made to load the modal returns a favorability key for a domain |

#### TC-GEO-1125-013 - Citation Sources DOM holds no hidden Favorability column

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that the Favorability column is removed from the DOM and not hidden (no hidden header, cell or col entry). Covers AC-6.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the AI Engines Citation Sources section is displayed |  | The domain table is displayed |
| 2 | When the runner inspects the DOM of the section table |  | The table element, its colgroup (if any), header cells and row cells are read |
| 3 | Then the table holds exactly three columns in the DOM |  | Each header row has three th cells, each data row has three td cells and the colgroup (if any) has three col entries |
| 4 | And no hidden favorability element exists |  | No element with display:none, visibility:hidden, aria-hidden or zero width carries favorability text, a favorability class or a favorability data attribute |
| 5 | When the user opens the "All domains" modal and the runner inspects its table |  | The modal table is read |
| 6 | Then the modal table holds exactly three columns and no hidden favorability element |  | Three th per header row, three td per data row, and no hidden favorability element |

#### TC-GEO-1125-014 - Questions Analysis favourability filter is unchanged

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the favourability filter of Questions Analysis is still present and works as before; the removal covers the source-level label only. Covers AC-7.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time. A reference export of the same dashboard generated before GEO-1125 was deployed (or from production if GEO-1125 is not yet released there) is available for comparison (see the open points of the epic review).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Questions Analysis page of the Toyota dashboard |  | The Questions Analysis page is displayed with its question list |
| 2 | When the user opens the favourability filter |  | The favourability filter is displayed with the same label and the same options as in the reference |
| 3 | And the user selects one favourability option | Option: the first option of the filter | The filter shows the selected option |
| 4 | Then the question list is narrowed to that favourability |  | Only questions with the selected favourability are listed and the count is updated |
| 5 | When the user clears the filter |  | The full question list is displayed again |

#### TC-GEO-1125-015 - Question detail panel favourability is unchanged

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the question detail panel still shows its favourability information as before; the removal covers the source-level label only. Covers AC-7.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time. A reference export of the same dashboard generated before GEO-1125 was deployed (or from production if GEO-1125 is not yet released there) is available for comparison (see the open points of the epic review).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Questions Analysis page of the Toyota dashboard |  | The question list is displayed |
| 2 | When the user opens the detail panel of a question | Question: the first question of the list | The question detail panel opens |
| 3 | Then the favourability information of the question is displayed as before |  | The favourability label or indicator shown in the panel is present, with the same wording and position as in the reference |
| 4 | And the rest of the panel is unchanged |  | The panel sections are the same as in the reference |

#### TC-GEO-1125-016 - XLSX Corporate Reputation block of the Overview sheet keeps its favourability column

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Corporate Reputation block of the XLSX workbook (in the Overview sheet) still carries its favourability information; the removal covers the source-level label only. Covers AC-7. Updated 2026-10-05: the workbook has no separate Corporate Reputation sheet, the block is in the Overview sheet.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time. The user can export the analysis from the "Export" button at the top right of the dashboard. The runner downloads the file and parses it (XLSX: xl/workbook.xml, xl/sharedStrings.xml and xl/worksheets/*.xml; PPTX: ppt/slides/slide*.xml). A reference export of the same dashboard generated before GEO-1125 was deployed (or from production if GEO-1125 is not yet released there) is available for comparison (see the open points of the epic review).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user exports the analysis in Excel (XLSX) format | Format: XLSX | An .xlsx file is downloaded |
| 2 | When the runner opens the Overview sheet and finds the Corporate Reputation block | Sheet: Overview (block near the top of the sheet) | The Corporate Reputation table is found in the Overview sheet |
| 3 | Then its header row still includes the favourability column |  | The header row of the block includes a Favorability column next to its other columns |
| 4 | And its rows hold favourability values |  | Each row of the block has a favourability value (e.g. a percentage or a favourable / mixed / unfavourable value) |

#### TC-GEO-1125-017 - XLSX Raw Data sheet is unchanged

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Raw Data sheet of the XLSX workbook is unchanged; the removal covers the source-level label only. Covers AC-7.
- **Precondition:** GEO-1125 is deployed on staging (https://staging-geo.onclusive.com/geo). The user is logged in with the standard account assiya.benramdane@onclusive.com, app language en-GB, and opens the Toyota dashboard (439acd96-0b1b-4da4-9e07-612d38e9783e) on the overview (Health Check) page with the default dashboard filters. The section "AI Engines Citation Sources" shows at least 10 domains and the "All domains (N)" button, where N is the domain count shown on the button at execution time. The user can export the analysis from the "Export" button at the top right of the dashboard. The runner downloads the file and parses it (XLSX: xl/workbook.xml, xl/sharedStrings.xml and xl/worksheets/*.xml; PPTX: ppt/slides/slide*.xml). A reference export of the same dashboard generated before GEO-1125 was deployed (or from production if GEO-1125 is not yet released there) is available for comparison (see the open points of the epic review).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user exports the analysis in Excel (XLSX) format | Format: XLSX | An .xlsx file is downloaded |
| 2 | When the runner opens the Raw Data sheet | Sheet: Raw Data | The sheet exists in the workbook |
| 3 | Then its header row is the same as in the reference export |  | Same column headers, same order, favourability-related columns included |
| 4 | And its rows hold favourability values as before |  | The favourability-related columns are filled with values of the same kind as in the reference |

#### TC-GEO-1125-018 - PowerPoint and PDF Sources slides show 10 rows and the app domain total

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the AI Citation Sources slide of the PowerPoint and PDF exports shows 10 domain rows with Domain, Type and Frequency only and states a domain total equal to the "All domains" count of the app. Covers AC-4. Updated 2026-10-07 per GEO-1199.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of the Toyota analysis and notes the "All domains (M)" count | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | M is noted from the "All domains" button of "AI Engines Citation Sources" |
| 2 | When the user exports the analysis as "Presentation .pptx" |  | A .pptx file is downloaded |
| 3 | Then the AI citation sources slide shows 10 domain rows | Slide "Which sources shape your AI presence", eyebrow "SOURCES · OVERVIEW" | Exactly 10 rows with Domain, Type and Frequency, in the order of the app table |
| 4 | And the slide states the domain total of the app |  | The domain total on the slide equals M |
| 5 | When the user exports the analysis as "PDF" |  | A PDF file is downloaded |
| 6 | Then the Sources page shows the same 10 rows and the same total | Page rendered and read visually | 10 rows and a domain total equal to M, with no Favorability column |

### GEO-1126 — Story (QA In Progress)

#### TC-GEO-1126-001 - Details panel shows Related Prompts then Sources, without the citation-count block

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the details panel of a selected domain shows "Related Prompts" first and the cited URLs second, and that the per-engine citation-count block is gone. Covers AC-1. Labels follow staging after GEO-625 (unified Sources labels): the "Cited URLs" section reads "Sources" and its control "All sources (n)".
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Overview of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The section "AI Engines Citation Sources" is displayed with its domain table |
| 2 | When the user clicks the first domain of the table | e.g. toyota.fr | The panel "AI Engines Citation Source Details" opens with a close (×) button |
| 3 | Then "Related Prompts" is the first section |  | The "Related Prompts" heading is at the top of the panel content |
| 4 | And the cited URLs section comes second |  | The "Sources" section is below "Related Prompts" |
| 5 | And no per-engine citation-count block is shown |  | No block of citation counts per AI engine is displayed in the panel |

#### TC-GEO-1126-002 - Related Prompts preview lists the first prompts with engine icons and the total control

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Related Prompts section lists the first prompts, each with its text and the icons of the AI engines that produced it, followed by "All related Prompts" carrying the total count. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the first domain of "AI Engines Citation Sources" is open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e - e.g. toyota.fr | The "Related Prompts" section is displayed |
| 2 | Then the first prompts are listed with their text |  | Each preview row shows the prompt text |
| 3 | And each prompt shows the icons of the AI engines that produced it |  | One or more engine icons are shown on each row |
| 4 | And the "All related Prompts" control shows the total count |  | "All related Prompts" is displayed under the preview with the total count n |

#### TC-GEO-1126-003 - Sources preview shows the count heading, URL rows and the "All sources" control

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the cited URLs section heading carries the total count, lists the first URLs with their title, address and citing engine icons, and ends with a control carrying the same total. Covers AC-3. Labels follow staging after GEO-625 (unified Sources labels): the "Cited URLs" section reads "Sources" and its control "All sources (n)". (AC/app gap, accepted change).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the first domain of "AI Engines Citation Sources" is open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The panel is displayed |
| 2 | When the user scrolls to the "Sources" section |  | The section heading carries the total count (e.g. "Sources (n)") |
| 3 | Then the first URLs are listed with their title, address and citing engine icons |  | Each row shows a favicon, the page title, the address and the engine icons |
| 4 | And the "All sources" control carries the same total |  | "All sources (n)" is displayed with the same n as the heading |

#### TC-GEO-1126-004 - All related Prompts modal opens with header, count, search field and full list

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the "All related Prompts" control opens a modal headed "All related Prompts - {domain}" with the prompt count, a search field over prompt text and the full list. Covers AC-4. The English modal title was last read in French on 2026-09-25 and is to be re-checked (open point).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the first domain of "AI Engines Citation Sources" is open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e - e.g. toyota.fr | The panel shows "All related Prompts" with its count n (record n) |
| 2 | When the user clicks "All related Prompts" |  | A modal opens |
| 3 | Then the modal is headed with the domain and the prompt count |  | The title reads "All related Prompts - {domain}" and the prompt count n is displayed |
| 4 | And a search field over prompt text is available |  | A search field is displayed above the list |
| 5 | And the full list is displayed |  | All n prompts can be listed by scrolling the modal |

#### TC-GEO-1126-005 - Prompts modal has four question-type tabs with counts and All selected

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify that four tabs scope the prompts modal - All, Visibility, Competitive and Perception - each carrying its own count, with All selected by default. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the "All related Prompts" modal of the first domain is open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e - e.g. toyota.fr | The modal is displayed |
| 2 | Then four tabs are shown |  | "All", "Visibility", "Competitive" and "Perception" |
| 3 | And each tab carries its own count |  | Each tab label shows a count, e.g. "Visibility (n)" |
| 4 | And "All" is selected by default |  | "All" is the active tab when the modal opens |

#### TC-GEO-1126-006 - A prompt produced by several engines appears once in the panel and in the modal

- **ACs:** AC-6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a prompt produced by several AI engines is listed once, carrying every citing engine icon, both in the panel preview and in the modal. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the first domain of "AI Engines Citation Sources" is open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e - e.g. toyota.fr | The Related Prompts preview is displayed |
| 2 | Then each prompt text of the preview appears on one row only |  | A prompt cited by several engines shows all its engine icons on its single row |
| 3 | When the user opens "All related Prompts" and scrolls the "All" tab |  | The full list is displayed |
| 4 | Then no prompt text appears on two rows | Compare the texts ignoring case | Each prompt appears once with the icons of all the engines that produced it |

#### TC-GEO-1126-007 - [Figma] All sources modal lists the cited URLs of the domain

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** [Figma] Verify what the control of the cited URLs section opens (frame 11725:96680, DAC4): a modal titled with the domain and the source count, a search field over title and address, and rows with favicon, title, address and engine icons. Supports AC-3. The epic carries no AC for this modal (flagged requirement gap). Labels follow staging after GEO-625 (unified Sources labels): the "Cited URLs" section reads "Sources" and its control "All sources (n)".
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the first domain of "AI Engines Citation Sources" is open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e - e.g. toyota.fr | The "Sources" section shows "All sources (n)" |
| 2 | When the user clicks "All sources (n)" |  | A modal opens with the domain name and the count n (record the title) |
| 3 | Then a search field over title and address is available | Search term: a word of the first title | Only the URLs whose title or address contains the term are listed |
| 4 | And each row shows the favicon, the title, the address and the engine icons |  | The four elements are displayed on each row |

#### TC-GEO-1126-008 - Search applies inside the selected tab

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that with a tab selected and a search term entered the list shows the prompts of that tab matching the term (search is additive to the tab). Covers AC-8.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the "All related Prompts" modal of the first domain is open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e - e.g. toyota.fr | The modal is displayed with "All" selected |
| 2 | When the user selects "Visibility" and types a word of its first prompt in the search field | A word of the first Visibility prompt | Only Visibility prompts containing the word are listed |
| 3 | And the user selects "Perception" with the same search term |  | Only Perception prompts containing the term are listed (or the tab says there is none) |
| 4 | And the user selects "All" with the same search term |  | Prompts of every type containing the term are listed |

#### TC-GEO-1126-009 - An empty tab says so and the other tabs stay reachable

- **ACs:** AC-10 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** state
- **Description:** Verify that a tab holding no prompt says so and the other tabs stay reachable. Covers AC-10. Conditional: needs a domain with an empty question-type tab (no empty-state message observed on 2026-09-25); the copy is not specified and is recorded at execution.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Conditional: a domain whose prompts modal has a tab with a count of 0 (e.g. a domain cited in visibility answers only).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the "All related Prompts" modal of a domain with an empty tab is open | Domain from reference data | One tab shows a count of 0 |
| 2 | When the user selects the empty tab |  | No prompt row is listed |
| 3 | Then the tab says that it holds no prompt |  | An empty-state message is displayed (record the copy) |
| 4 | And the other tabs stay reachable |  | Clicking "All" lists the prompts again |

#### TC-GEO-1126-010 - Panel control, modal header and tab sum state the same total

- **ACs:** AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the panel control, the modal header and the sum of the tab counts state the same total for the same domain. Covers AC-9. The numbers of the design frames are sample data and are not used as fixtures.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the first domain shows "All related Prompts" with its count n | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e - e.g. toyota.fr | n is recorded |
| 2 | When the user opens "All related Prompts" |  | The modal shows the prompt count |
| 3 | Then the modal count equals n |  | The modal header states n |
| 4 | And the sum of the question-type tab counts equals n |  | Visibility + Competitive + Perception = n |

#### TC-GEO-1126-011 - Perception tab lists questions, not negative concepts

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the Perception tab lists questions: one perception answer that surfaced several negative concepts produces one row, and the negative concept names no longer appear in AI Citation Sources. Covers AC-7.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference data identifies a domain cited in a perception answer that surfaced at least 2 negative concepts.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the "All related Prompts" modal of the reference domain is open | Domain from reference data | The modal is displayed |
| 2 | When the user selects the "Perception" tab |  | The perception prompts are listed |
| 3 | Then the perception question appears on one row only |  | The question is listed once, not once per negative concept |
| 4 | And no negative concept name is displayed |  | No concept label or concept name is shown on the rows, in the panel or in the modal |

#### TC-GEO-1126-012 - Panel prompts and URLs follow the dashboard scope

- **ACs:** AC-11 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the prompts and URLs of the panel are those of the current market, AI engine and date scope of the dashboard. Covers AC-11.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the first domain shows "All related Prompts (n)" with default filters | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | n and the engine icons of the preview are recorded |
| 2 | When the user keeps a single AI engine in the AI Engines filter and reopens the panel of the same domain | AI Engines: ChatGPT only | The panel opens |
| 3 | Then the prompts and URLs listed are only those cited by that engine |  | Every prompt and URL row shows the ChatGPT icon only and the "All related Prompts" count is lower than or equal to n |
| 4 | When the user keeps a single country in the countries filter and reopens the panel | One country of the analysis | Every prompt row carries the selected market only |

#### TC-GEO-1126-013 - The panel follows the selected period with no 7-day floor

- **ACs:** AC-11 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the 7-day source window of GEO-1120 does not apply to the panel: on a period shorter than 7 days the panel follows the selected period, so it can differ from the Action Center by design (not a defect). Covers AC-11 (7-day floor clause).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the details panel of the first domain with "Last 7 days" | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | "All related Prompts (n7)" is recorded |
| 2 | When the user selects the period "Last analysis", clicks "Apply" and reopens the panel of the same domain | Date preset: Last analysis | "All related Prompts (n1)" is displayed |
| 3 | Then the panel follows the selected period |  | n1 is lower than or equal to n7 and the panel lists only prompts of the last analysis |
| 4 | And the Action Center keeps its 7-day window for the same period | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last analysis" | The Target Sources total is the same as with "Last 7 days" (expected difference between the two views, not a bug) |

### GEO-1183 — Story (Ready for QA)

#### TC-GEO-1183-001 - Car and Driver EV of the Year passage contains Tesla or Cybertruck and the name is highlighted

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that on the caranddriver.com article "Presenting Car and Driver's 2024 EV of the Year" the negative passage contains "Tesla" or "Cybertruck" and the name is highlighted in the details panel. Covers AC-1. Related: GEO-1182 (highlight only matches the exact matched entity).
- **Precondition:** GEO-1183 is deployed on staging (https://staging-geo.onclusive.com/geo) and the existing verdicts have been re-judged with the new judge prompt. The user is logged in, interface language en-GB, and the organisation switcher is set to "Onclusive" (not QA-GEO). Tesla analysis: https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions, period "5 Oct 2026", AI Engines 3, United States - English. Reference capture: .claude/Data/processed/testcases/test-results/geo1183-passages-20261006.json (collected 2026-10-06). Ranks and counts depend on the selected period and must be re-checked on staging just before execution.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center of the Tesla analysis | https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions - period "5 Oct 2026" | The Target Sources cards are displayed on the ALL tab |
| 2 | And the caranddriver.com card is displayed in the list | caranddriver.com (rank depends on the period) | The card shows the IMPROVE PERCEPTION badge and "Negative perception in N articles" |
| 3 | When the user opens the details panel of caranddriver.com |  | The details panel opens on the right with the header "#N · caranddriver.com", the tab "Negative perception (N)" and the line "Each of these articles mentions Tesla negatively." |
| 4 | And the user locates the article "Presenting Car and Driver's 2024 EV of the Year" | URL caranddriver.com/news/a61836993/hyundai-ioniq-5-n-ev-of-the-year-2024/ | The article row shows its title, its URL and a quoted passage in italics |
| 5 | Then the passage contains "Tesla" or "Cybertruck" | Page sentence: "And before any Tesla loyalists complain that we aren't giving the Cybertruck its due, know that the one we rented broke on the second day, effectively parking itself with just a few hundred miles on its odometer." | The quoted passage contains the word "Tesla" or "Cybertruck" and is no longer "know that the one we rented broke on the second day, effectively parking itself with just a few hundred miles on its odometer." |
| 6 | And the brand or product name is highlighted in the passage |  | "Tesla" (or "Cybertruck") is shown in bold on a highlight chip inside the passage |

#### TC-GEO-1183-002 - Tesla analysis - no negative passage is missing the brand or product name

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that no negative passage in the Target Sources panel of the Tesla analysis is missing the brand or product name. Covers AC-2.
- **Precondition:** GEO-1183 is deployed on staging (https://staging-geo.onclusive.com/geo) and the existing verdicts have been re-judged with the new judge prompt. The user is logged in, interface language en-GB, and the organisation switcher is set to "Onclusive" (not QA-GEO). Tesla analysis: https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions, period "5 Oct 2026", AI Engines 3, United States - English. Reference capture: .claude/Data/processed/testcases/test-results/geo1183-passages-20261006.json (collected 2026-10-06). Ranks and counts depend on the selected period and must be re-checked on staging just before execution.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center of the Tesla analysis | https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions - period "5 Oct 2026" | The Target Sources cards are displayed on the ALL tab |
| 2 | And the user selects the "Improve perception" tab |  | Only the sources with the IMPROVE PERCEPTION badge are listed and each card shows "Negative perception in N articles" |
| 3 | When the user opens the details panel of the first source | Source #1 of the Improve perception tab | The details panel opens on the right with the header "#1 · source domain", the tab "Negative perception (N)" and the line "Each of these articles mentions Tesla negatively." |
| 4 | Then every passage of the "Negative perception (N)" tab contains the brand or a product name of the brand | Brand family of Tesla. Check the readable passage text inside the curly quotes. Watch-list: consumerreports.org "2021 Tesla Model S Road Test Report" (in the capture "tesla" appears only inside a link URL). electrek.co "Tesla Cybercab" (name present but not highlighted - GEO-1182). | Each quoted passage contains the brand or product name as written on the page and no passage without the name is shown |
| 5 | And the user repeats the check on every source with "Next source" until the last one | Footer "Source k of M" | All negative passages of the analysis are checked and none of them is missing the brand or product name |

#### TC-GEO-1183-003 - Nike analysis - no negative passage is missing the brand or product name

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that no negative passage in the Target Sources panel of the Nike analysis is missing the brand or product name. Covers AC-2. Failed on 2026-10-05 (bloomberg.com) in the former Nike report.
- **Precondition:** GEO-1183 is deployed on staging (https://staging-geo.onclusive.com/geo) and the existing verdicts have been re-judged with the new judge prompt. The user is logged in, interface language en-GB, and the organisation switcher is set to "Onclusive" (not QA-GEO). Nike analysis: https://staging-geo.onclusive.com/geo/dashboard/51f6eb92-0d7a-4c77-8fa8-e46d5d610309/actions, period "6 Oct 2026", AI Engines 5, United States - English. The former Nike report 8f6d09b3-59ca-4ed1-8cb4-b31d21e19c5f shows "Report unavailable" since 2026-10-06. Reference capture: .claude/Data/processed/testcases/test-results/geo1183-passages-20261006.json (collected 2026-10-06). Ranks and counts depend on the selected period and must be re-checked on staging just before execution.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center of the Nike analysis | https://staging-geo.onclusive.com/geo/dashboard/51f6eb92-0d7a-4c77-8fa8-e46d5d610309/actions - period "6 Oct 2026" | The Target Sources cards are displayed on the ALL tab |
| 2 | And the user selects the "Improve perception" tab |  | Only the sources with the IMPROVE PERCEPTION badge are listed and each card shows "Negative perception in N articles" |
| 3 | When the user opens the details panel of the first source | Source #1 of the Improve perception tab | The details panel opens on the right with the header "#1 · source domain", the tab "Negative perception (N)" and the line "Each of these articles mentions Nike negatively." |
| 4 | Then every passage of the "Negative perception (N)" tab contains the brand or a product name of the brand | Brand family of Nike. Check the readable passage text inside the curly quotes. Watch-list: bloomberg.com "Athletic Shoe Brands Hoka, On Running Beating Industry Giants Like Nike, Adidas" (no "Nike" in its passage on 2026-10-05 in the former Nike report - check whether it is listed in the current report). | Each quoted passage contains the brand or product name as written on the page and no passage without the name is shown |
| 5 | And the user repeats the check on every source with "Next source" until the last one | Footer "Source k of M" | All negative passages of the analysis are checked and none of them is missing the brand or product name |

#### TC-GEO-1183-004 - Lidl Nederland analysis - no negative passage is missing the brand or product name

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that no negative passage in the Target Sources panel of the Lidl Nederland analysis is missing the brand or product name. Covers AC-2.
- **Precondition:** GEO-1183 is deployed on staging (https://staging-geo.onclusive.com/geo) and the existing verdicts have been re-judged with the new judge prompt. The user is logged in, interface language en-GB, and the organisation switcher is set to "Onclusive" (not QA-GEO). Lidl Nederland analysis: https://staging-geo.onclusive.com/geo/dashboard/1444d4ef-9555-4c35-bfd6-52af5128e180/actions, period "Last 7 days" (29 Sep - 5 Oct 2026 in the capture), AI Engines 2, United Kingdom - English. Reference capture: .claude/Data/processed/testcases/test-results/geo1183-passages-20261006.json (collected 2026-10-06). Ranks and counts depend on the selected period and must be re-checked on staging just before execution.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center of the Lidl analysis | https://staging-geo.onclusive.com/geo/dashboard/1444d4ef-9555-4c35-bfd6-52af5128e180/actions - period "Last 7 days" | The Target Sources cards are displayed on the ALL tab |
| 2 | And the user selects the "Improve perception" tab |  | Only the sources with the IMPROVE PERCEPTION badge are listed and each card shows "Negative perception in N articles" |
| 3 | When the user opens the details panel of the first source | Source #1 of the Improve perception tab | The details panel opens on the right with the header "#1 · source domain", the tab "Negative perception (N)" and the line "Each of these articles mentions Lidl negatively." |
| 4 | Then every passage of the "Negative perception (N)" tab contains the brand or a product name of the brand | Brand family of Lidl. Check the readable passage text inside the curly quotes. Watch-list: trustpilot.com "Lidl Nederland - Lidl.nl reviews" (matched entity "Lidl Nederland"). | Each quoted passage contains the brand or product name as written on the page and no passage without the name is shown |
| 5 | And the user repeats the check on every source with "Next source" until the last one | Footer "Source k of M" | All negative passages of the analysis are checked and none of them is missing the brand or product name |

#### TC-GEO-1183-005 - Negative passages are at most 140 characters in the three analyses

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that every negative passage shown in the Target Sources panel is at most 140 characters including spaces and "…" joins, in the Tesla, Nike and Lidl Nederland analyses. Covers AC-3 (length part).
- **Precondition:** GEO-1183 is deployed on staging (https://staging-geo.onclusive.com/geo) and the existing verdicts have been re-judged with the new judge prompt. The user is logged in, interface language en-GB, and the organisation switcher is set to "Onclusive" (not QA-GEO). Tesla analysis: https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions, period "5 Oct 2026", AI Engines 3, United States - English. Nike analysis: https://staging-geo.onclusive.com/geo/dashboard/51f6eb92-0d7a-4c77-8fa8-e46d5d610309/actions, period "6 Oct 2026", AI Engines 5, United States - English. The former Nike report 8f6d09b3-59ca-4ed1-8cb4-b31d21e19c5f shows "Report unavailable" since 2026-10-06. Lidl Nederland analysis: https://staging-geo.onclusive.com/geo/dashboard/1444d4ef-9555-4c35-bfd6-52af5128e180/actions, period "Last 7 days" (29 Sep - 5 Oct 2026 in the capture), AI Engines 2, United Kingdom - English. Reference capture: .claude/Data/processed/testcases/test-results/geo1183-passages-20261006.json (collected 2026-10-06). Ranks and counts depend on the selected period and must be re-checked on staging just before execution.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center of the Tesla analysis | https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions - period "5 Oct 2026" | The Target Sources cards are displayed on the ALL tab |
| 2 | When the user opens the details panel of each source with negative articles using "Next source" | "Negative perception (N)" tab | Each panel lists its negative articles with a quoted passage |
| 3 | Then each passage is at most 140 characters long | Length = text inside the curly quotes, quotes excluded, spaces and each "…" counted as 1 character | No passage is longer than 140 characters |
| 4 | And the same check is done on the Nike analysis | https://staging-geo.onclusive.com/geo/dashboard/51f6eb92-0d7a-4c77-8fa8-e46d5d610309/actions - period "6 Oct 2026" | No passage is longer than 140 characters |
| 5 | And the same check is done on the Lidl Nederland analysis | https://staging-geo.onclusive.com/geo/dashboard/1444d4ef-9555-4c35-bfd6-52af5128e180/actions - period "Last 7 days" | No passage is longer than 140 characters |

#### TC-GEO-1183-006 - A sentence longer than 140 characters is shortened with "…" joins and not cut mid-word

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that when the supporting sentence does not fit in 140 characters the passage keeps the part with the name and the part with the criticism joined with "…" instead of being cut mid-word. Covers AC-3 ("…" joins part). Known bug: GEO-1201 (passage cut at 140 characters mid-word without "…"). Updated 2026-10-07: GEO-1201 is still open; the "…" join of AC-3 stays the expected behaviour.
- **Precondition:** GEO-1183 is deployed on staging (https://staging-geo.onclusive.com/geo) and the existing verdicts have been re-judged with the new judge prompt. The user is logged in, interface language en-GB, and the organisation switcher is set to "Onclusive" (not QA-GEO). Tesla analysis: https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions, period "5 Oct 2026", AI Engines 3, United States - English. Nike analysis: https://staging-geo.onclusive.com/geo/dashboard/51f6eb92-0d7a-4c77-8fa8-e46d5d610309/actions, period "6 Oct 2026", AI Engines 5, United States - English. The former Nike report 8f6d09b3-59ca-4ed1-8cb4-b31d21e19c5f shows "Report unavailable" since 2026-10-06. Lidl Nederland analysis: https://staging-geo.onclusive.com/geo/dashboard/1444d4ef-9555-4c35-bfd6-52af5128e180/actions, period "Last 7 days" (29 Sep - 5 Oct 2026 in the capture), AI Engines 2, United Kingdom - English. Reference capture: .claude/Data/processed/testcases/test-results/geo1183-passages-20261006.json (collected 2026-10-06). Ranks and counts depend on the selected period and must be re-checked on staging just before execution.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the details panel of caranddriver.com in the Tesla analysis | https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions - period "5 Oct 2026" | The details panel opens on the right with the header "#N · caranddriver.com", the tab "Negative perception (N)" and the line "Each of these articles mentions Tesla negatively." |
| 2 | When the user reads the passage of the article "Presenting Car and Driver's 2024 EV of the Year" | The page sentence is longer than 140 characters so it cannot be shown whole | The article row shows a quoted passage in italics |
| 3 | Then the passage is shortened with "…" at each cut | Expected shape (Jira example): "…before any Tesla loyalists complain that we aren't giving the Cybertruck its due, know that the one we rented broke on the second day…" | The passage starts and/or ends with "…" where the page sentence was cut and does not end on a partial word such as "e" or "abus" |
| 4 | And the passage keeps both the part with the name and the part with the criticism | Name = "Tesla" or "Cybertruck", criticism = "broke on the second day" | The passage contains the name and "broke on the second day" |
| 5 | And no passage of the Tesla, Nike and Lidl Nederland panels ends mid-word | Capture examples: caranddriver.com "…Maybe the car was abus" (Tesla), insideevs.com "…from both model" (Tesla), birminghammail.co.uk "…as soon as I o" (Lidl) | Every passage ends on a complete word, on the page punctuation or on "…" |

#### TC-GEO-1183-007 - Each part of a passage is verbatim from the article page

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each part of a negative passage (the text between "…" joins) is found word for word on the article page, with no rewording and no case change. Covers AC-3 (verbatim part).
- **Precondition:** GEO-1183 is deployed on staging (https://staging-geo.onclusive.com/geo) and the existing verdicts have been re-judged with the new judge prompt. The user is logged in, interface language en-GB, and the organisation switcher is set to "Onclusive" (not QA-GEO). Tesla analysis: https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions, period "5 Oct 2026", AI Engines 3, United States - English. Nike analysis: https://staging-geo.onclusive.com/geo/dashboard/51f6eb92-0d7a-4c77-8fa8-e46d5d610309/actions, period "6 Oct 2026", AI Engines 5, United States - English. The former Nike report 8f6d09b3-59ca-4ed1-8cb4-b31d21e19c5f shows "Report unavailable" since 2026-10-06. Lidl Nederland analysis: https://staging-geo.onclusive.com/geo/dashboard/1444d4ef-9555-4c35-bfd6-52af5128e180/actions, period "Last 7 days" (29 Sep - 5 Oct 2026 in the capture), AI Engines 2, United Kingdom - English. Reference capture: .claude/Data/processed/testcases/test-results/geo1183-passages-20261006.json (collected 2026-10-06). Ranks and counts depend on the selected period and must be re-checked on staging just before execution. Article pages must still be reachable (no paywall, page not removed), otherwise the sample is replaced by another passage of the same analysis.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the details panel of caranddriver.com in the Tesla analysis | https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions - period "5 Oct 2026" | The details panel opens on the right with the header "#N · caranddriver.com", the tab "Negative perception (N)" and the line "Each of these articles mentions Tesla negatively." |
| 2 | When the user opens the article "Presenting Car and Driver's 2024 EV of the Year" from its URL in a new tab | caranddriver.com/news/a61836993/hyundai-ioniq-5-n-ev-of-the-year-2024/ | The article page opens |
| 3 | Then each part of the passage is found on the page with the same words, case and punctuation | Split the passage on "…" and search each part on the page (Ctrl+F) | Every part is found as-is on the page and only "…" is added between or around the parts |
| 4 | And the same check is done on a Nike passage | sgbonline.com: "Stifel’s 2025 All-Star Sneaker Survey Sees Nike Mentions Fall to All-Time Low" | The passage is found as-is on the article page |
| 5 | And the same check is done on a Lidl Nederland passage | birminghammail.co.uk: "I don't like singling Lidl out, but every time I think they've set the bar at a new low, they somehow find a way of dropping it further. Lid" | Each part of the passage between "…" joins is found as-is on the article page |

#### TC-GEO-1183-008 - Passages show the page text without raw markdown syntax

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that negative passages show the text as written on the page, without raw markdown syntax (link brackets and URLs, "**", "#") that is not visible on the page. Covers AC-3 (verbatim part, error case). Updated 2026-10-07 per GEO-1202 (fixed, Passed QA on the Toyota analysis): older verdicts of the Tesla, Nike and Lidl Nederland reports are cleaned only when re-judged.
- **Precondition:** GEO-1183 is deployed on staging (https://staging-geo.onclusive.com/geo) and the existing verdicts have been re-judged with the new judge prompt. The user is logged in, interface language en-GB, and the organisation switcher is set to "Onclusive" (not QA-GEO). Tesla analysis: https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions, period "5 Oct 2026", AI Engines 3, United States - English. Nike analysis: https://staging-geo.onclusive.com/geo/dashboard/51f6eb92-0d7a-4c77-8fa8-e46d5d610309/actions, period "6 Oct 2026", AI Engines 5, United States - English. The former Nike report 8f6d09b3-59ca-4ed1-8cb4-b31d21e19c5f shows "Report unavailable" since 2026-10-06. Lidl Nederland analysis: https://staging-geo.onclusive.com/geo/dashboard/1444d4ef-9555-4c35-bfd6-52af5128e180/actions, period "Last 7 days" (29 Sep - 5 Oct 2026 in the capture), AI Engines 2, United Kingdom - English. Reference capture: .claude/Data/processed/testcases/test-results/geo1183-passages-20261006.json (collected 2026-10-06). Ranks and counts depend on the selected period and must be re-checked on staging just before execution.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the details panel of insideevs.com in the Tesla analysis | https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions - period "5 Oct 2026" | The details panel opens on the right with the header "#N · insideevs.com", the tab "Negative perception (N)" and the line "Each of these articles mentions Tesla negatively." |
| 2 | When the user reads the passage of the article "The Best EVs To Buy In March 2026: Our Favorites In Every Category" | Capture: "Unfortunately, [Tesla did remove standard Autosteer](https://insideevs.com/news/785225/tesla-removes-autopilot-base-models/) from both model" | The article row shows a quoted passage in italics |
| 3 | Then the passage shows the link text only |  | The passage reads "Unfortunately, Tesla did remove standard Autosteer from both model…" with no "[", "](" or URL |
| 4 | And the Nike passages show no "**" or "#" markers | dickssportinggoods.com: "…replace Nike track **shoes** that did n't last…" and thestreet.com: "…TheStreet # Nike making its most famous sneakers harder to buy" | The passages show "shoes" and "Nike making its most famous sneakers harder to buy" without "**" or "#" |
| 5 | And no passage of the Tesla, Nike and Lidl Nederland panels contains a raw markdown link | Search the panels for "](http" | No passage contains a markdown link or a URL that is not visible as text on the article page |

#### TC-GEO-1183-009 - Verdicts of the Target Sources are unchanged after the re-judge

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the re-judge only changes the passages and not the verdicts: the same sources keep the same negative articles and counts as in the reference capture. Covers AC-4. Conditional: needs a re-judge run after the capture of 2026-10-06 on the same snapshots.
- **Precondition:** GEO-1183 is deployed on staging (https://staging-geo.onclusive.com/geo) and the existing verdicts have been re-judged with the new judge prompt. The user is logged in, interface language en-GB, and the organisation switcher is set to "Onclusive" (not QA-GEO). Tesla analysis: https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions, period "5 Oct 2026", AI Engines 3, United States - English. Nike analysis: https://staging-geo.onclusive.com/geo/dashboard/51f6eb92-0d7a-4c77-8fa8-e46d5d610309/actions, period "6 Oct 2026", AI Engines 5, United States - English. The former Nike report 8f6d09b3-59ca-4ed1-8cb4-b31d21e19c5f shows "Report unavailable" since 2026-10-06. Lidl Nederland analysis: https://staging-geo.onclusive.com/geo/dashboard/1444d4ef-9555-4c35-bfd6-52af5128e180/actions, period "Last 7 days" (29 Sep - 5 Oct 2026 in the capture), AI Engines 2, United Kingdom - English. Reference capture: .claude/Data/processed/testcases/test-results/geo1183-passages-20261006.json (collected 2026-10-06). Capture snapshots: Tesla c5e3bc35-df7d-4041-ba5e-c625e2beb276, Nike 04742461-339d-4f0a-a52d-48573d597a71, Lidl Nederland 7c3dc64d-87f5-42ed-a2b4-0b94e3fe1c4d. A new re-judge of the existing verdicts (new judge prompt version) has been run on these snapshots after 2026-10-06 09:56 UTC and its date is confirmed by the developer. Only negative articles are in the capture, so "Improve visibility" verdicts are not compared.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the reference capture of the negative articles per source is available for the three analyses | geo1183-passages-20261006.json | The capture lists the negative articles (title, URL) and their passages for each source |
| 2 | And a re-judge has been run after the capture on the same snapshots | Re-judge date confirmed by the developer, later than 2026-10-06 09:56 UTC | The re-judge date is later than the capture date |
| 3 | When the user opens the Action Center of the Tesla analysis with the capture filters | https://staging-geo.onclusive.com/geo/dashboard/4419839a-317f-4f9d-8a8c-32184906a2aa/actions - "5 Oct 2026", AI Engines 3, United States - English | The number of sources and of Improve perception sources equals the reference capture |
| 4 | Then each source shows the same "Negative perception in N articles" count as in the capture | e.g. caranddriver.com and electrek.co | All Improve perception sources and their negative article counts are identical to the capture |
| 5 | And each source panel lists the same negative articles as in the capture | Compare the article URLs of the "Negative perception (N)" tab | No negative article is added or removed and only the passage text may differ |
| 6 | And the same comparison is done on the Nike and Lidl Nederland analyses | Nike "6 Oct 2026". Lidl Nederland with the capture date range 29 Sep - 5 Oct 2026, AI Engines 2, United Kingdom - English | The sources, counts and negative articles are identical to the capture |

### GEO-1184 — Story (Backlog (not yet delivered))

#### TC-GEO-1184-001 - Most prompts sort orders the cards by descending prompt count

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that with "Most prompts" selected the cards are in descending order of the prompt count shown on them. Covers AC-1. Not yet delivered (GEO-1184 in Backlog, design pending).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. NOT YET DELIVERED: GEO-1184 is in Backlog and its design is pending (sort control position and wording, prompt count wording on the card, sort kept or not across tabs). "Most prompts" and "Used in N prompts" are the provisional wordings of the ticket. Blocked until the story is delivered.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of the Toyota analysis | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The cards are sorted by the default sort (failing articles) and each card shows "Used in N prompts" |
| 2 | When the user selects the sort option "Most prompts" | Sort: Most prompts (provisional wording) | The list is re-sorted |
| 3 | Then the cards are in descending order of their prompt count |  | The "Used in N prompts" value never increases from one card to the next |
| 4 | And the ranks are renumbered from 1 |  | The first card shows rank 1 and the ranks run with no gap |

#### TC-GEO-1184-002 - Card prompt count equals the prompts listed in the panel

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the prompt count on a card equals the number of prompts listed in "Prompts associated with this source" of its panel (distinct prompts, all LLMs and locales, not answer citations). Covers AC-2. Not yet delivered (GEO-1184 in Backlog, design pending).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. NOT YET DELIVERED: GEO-1184 is in Backlog and its design is pending (sort control position and wording, prompt count wording on the card, sort kept or not across tabs). "Most prompts" and "Used in N prompts" are the provisional wordings of the ticket. Blocked until the story is delivered.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes the prompt count of the card ranked #1 | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The card shows "Used in N prompts" |
| 2 | When the user opens its details panel and clicks "Show X more prompts" on the "All" engine tab |  | The full prompts list is displayed |
| 3 | Then the number of prompt rows equals N |  | The rows of "Prompts associated with this source" equal the card count |

#### TC-GEO-1184-003 - Default sort and export are unchanged when "Most prompts" is not selected

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the default sort (failing articles) and the export are unchanged when the "Most prompts" option is not selected. Covers AC-3. Not yet delivered (GEO-1184 in Backlog, design pending).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. NOT YET DELIVERED: GEO-1184 is in Backlog and its design is pending (sort control position and wording, prompt count wording on the card, sort kept or not across tabs). "Most prompts" and "Used in N prompts" are the provisional wordings of the ticket. Blocked until the story is delivered. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center with the default sort | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The cards are ordered by failing article total (missing + negative), highest first |
| 2 | When the user exports the analysis as "Presentation .pptx" |  | A .pptx file is downloaded |
| 3 | Then the Target Sources slide follows the default order |  | The top 3 cards and the table follow the failing article order of the ALL tab |
| 4 | When the user selects "Most prompts" and exports again |  | A .pptx file is downloaded |
| 5 | Then the exported order is not affected by the on-screen sort |  | The slide order is the same as in step 3 (open point: confirm the export ignores the sort, as stated by AC-3 for the default case only) |

#### TC-GEO-1184-004 - Most prompts sort applies inside the current tab and scope

- **ACs:** design / requirement check | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the "Most prompts" sort applies within the current verdict tab and the current scope and period, like the default sort. Covers the requirement "the sort applies within the current tab and scope" (not a numbered AC). Not yet delivered (GEO-1184 in Backlog, design pending).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. NOT YET DELIVERED: GEO-1184 is in Backlog and its design is pending (sort control position and wording, prompt count wording on the card, sort kept or not across tabs). "Most prompts" and "Used in N prompts" are the provisional wordings of the ticket. Blocked until the story is delivered.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given "Most prompts" is selected on the ALL tab | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The cards are sorted by prompt count |
| 2 | When the user selects the "IMPROVE PERCEPTION" tab |  | Only perception sources are listed |
| 3 | Then the perception sources are in descending order of their prompt count |  | The "Used in N prompts" value never increases from one card to the next (record whether the sort stayed selected, open design point) |
| 4 | When the user keeps a single country in the countries filter |  | The list is recomputed for that country |
| 5 | Then the prompt counts and the order are recomputed in that scope |  | Each card count is lower than or equal to its All Countries count and the order is descending |

#### TC-GEO-1184-005 - Ties of the Most prompts sort are broken by failing articles then domain

- **ACs:** design / requirement check | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that sources with the same prompt count are sorted by failing articles, then by domain. Covers the tie rule of the requirement (not a numbered AC). Not yet delivered (GEO-1184 in Backlog, design pending).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. NOT YET DELIVERED: GEO-1184 is in Backlog and its design is pending (sort control position and wording, prompt count wording on the card, sort kept or not across tabs). "Most prompts" and "Used in N prompts" are the provisional wordings of the ticket. Blocked until the story is delivered. The list holds at least two sources with the same prompt count.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given "Most prompts" is selected | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The cards are sorted by prompt count |
| 2 | When the user locates two cards with the same "Used in N prompts" value |  | Two tied cards are found |
| 3 | Then the card with more failing articles comes first | Failing articles = missing + negative | The tied card with the higher total is ranked above |
| 4 | And cards tied on both counts are sorted by domain |  | The domains are in alphabetical order |

### GEO-1166 — Task (Passed QA)

#### TC-GEO-1166-001 - Footer stays sticky at every panel scroll position

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify the Previous / Next footer is sticky and stays visible while the panel content scrolls under it. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center page of the Toyota analysis |  | The "Target Sources" list is displayed with the tabs "ALL", "IMPROVE VISIBILITY", "IMPROVE PERCEPTION" and the ranked sources |
| 2 | When the user opens the details panel of the source ranked #1 |  | The details panel opens over the list with a footer showing "Previous" (left), "Source 1 of N" (center) and "Next source" (right) |
| 3 | And the user scrolls the panel content to the middle |  | The articles and prompts scroll under the footer; "Previous", "Source 1 of N" and "Next source" stay visible at the bottom of the panel |
| 4 | And the user scrolls the panel content to the very bottom |  | The end of "Prompts associated with this source" is reachable and the footer is still visible and not overlapping hidden content |
| 5 | Then the user scrolls back to the top of the panel |  | The footer remains fixed at the bottom of the panel at every scroll position |

#### TC-GEO-1166-002 - Next source swaps panel content in place and syncs the selected card

- **ACs:** AC-2 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify "Next source" replaces the panel data with the next ranked source without closing the panel and moves the selected state to the matching card behind the panel. Covers AC-2. Rule confirmed by the user on 2026-10-04: after Next/Previous the article tab resets to the first tab "Lack of visibility (N)" (not asserted here).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center page of the Toyota analysis in card view |  | The "Target Sources" cards are displayed in ranked order |
| 2 | And the user opens the details panel of the source ranked #1 |  | The panel header shows "#1 · {domain of card 1}", the footer shows "Source 1 of N" and card #1 shows the selected state |
| 3 | When the user clicks "Next source" |  | The panel stays open (no close / reopen) and its content is replaced by the source ranked #2 |
| 4 | Then the panel header, badges, article tabs and prompts belong to the source of card #2 |  | The header reads "#2 · {domain of card 2}" with its source type and reason badges; the footer reads "Source 2 of N" |
| 5 | And the selected state behind the panel moved to card #2 |  | Card #2 shows the selected state and card #1 no longer does |

#### TC-GEO-1166-003 - Previous swaps panel content back in place and syncs the selected card

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify "Previous" replaces the panel data with the previous ranked source without closing the panel and moves the selected state back to the matching card. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center page of the Toyota analysis in card view |  | The "Target Sources" cards are displayed in ranked order |
| 2 | And the user opens the details panel of the source ranked #3 |  | The panel header shows "#3 · {domain of card 3}", the footer shows "Source 3 of N" and card #3 shows the selected state |
| 3 | When the user clicks "Previous" |  | The panel stays open (no close / reopen) and its content is replaced by the source ranked #2 |
| 4 | Then the panel header, badges, article tabs and prompts belong to the source of card #2 |  | The header reads "#2 · {domain of card 2}"; the footer reads "Source 2 of N" |
| 5 | And the selected state behind the panel moved to card #2 |  | Card #2 shows the selected state and card #3 no longer does |

#### TC-GEO-1166-004 - Counter shows the position within the filtered scope

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify the "Source X of Y" counter uses the position in the currently filtered list (reason tab + Type filter), not the global rank, and Y equals the number of sources in that filtered list. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center page of the Toyota analysis |  | The "Target Sources" list is displayed with the tabs "ALL", "IMPROVE VISIBILITY", "IMPROVE PERCEPTION" and the ranked sources |
| 2 | When the user selects the "IMPROVE PERCEPTION" tab | Tab: IMPROVE PERCEPTION | Only sources with the "Improve perception" badge are listed; the user notes their count Y |
| 3 | And the user selects a source type in the Type filter | Source type: Journalism (or any type listed with a count) | The list keeps only the sources of that type in the "IMPROVE PERCEPTION" tab; the user notes the new count Y |
| 4 | And the user opens the details panel of the 2nd source of the filtered list |  | The details panel opens for that source |
| 5 | Then the footer counter reads "Source 2 of Y" |  | The counter shows 2 (position in the filtered list) and Y (number of sources in the filtered list), not the global rank or the unfiltered total; the panel header also shows the filtered position "#2 · {domain}", not the global rank |
| 6 | And the user clicks "Next source" |  | The panel shows the 3rd source of the filtered list (not the next global rank): the header reads "#3 · {domain}" and the counter reads "Source 3 of Y" |

#### TC-GEO-1166-005 - Previous is disabled on the first source

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify "Previous" is disabled when the panel shows the first source of the list and clicking it does nothing (no wrap-around). Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center page of the Toyota analysis |  | The "Target Sources" list is displayed with the tabs "ALL", "IMPROVE VISIBILITY", "IMPROVE PERCEPTION" and the ranked sources |
| 2 | When the user opens the details panel of the first source of the list |  | The footer reads "Source 1 of N" |
| 3 | Then the "Previous" button is displayed in its disabled state |  | "Previous" is greyed out, marked aria-disabled="true" and shows a not-allowed cursor, while "Next source" stays enabled |
| 4 | And the user clicks the disabled "Previous" button |  | Nothing happens: the panel still shows the first source and the counter still reads "Source 1 of N" (no jump to the last source) |

#### TC-GEO-1166-006 - Next source is disabled on the last source

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify "Next source" is disabled when the panel shows the last source of the list and clicking it does nothing (no wrap-around). Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center page of the Toyota analysis |  | The "Target Sources" list is displayed |
| 2 | And the user selects the "IMPROVE PERCEPTION" tab to get a short list | Tab: IMPROVE PERCEPTION | The filtered list is displayed; the user notes its count N |
| 3 | When the user opens the details panel of the last source of the list |  | The footer reads "Source N of N" |
| 4 | Then the "Next source" button is displayed in its disabled state |  | "Next source" is greyed out, marked aria-disabled="true" and shows a not-allowed cursor, while "Previous" stays enabled |
| 5 | And the user clicks the disabled "Next source" button |  | Nothing happens: the panel still shows the last source and the counter still reads "Source N of N" (no jump to the first source) |

#### TC-GEO-1166-007 - Previous and Next source work in the list view overlay

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify the footer navigation works the same way when the panel is opened from the list (table) view: content swaps in place and the selected row is synced. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Action Center page of the Toyota analysis |  | The "Target Sources" list is displayed |
| 2 | And the user switches to the list (table) view |  | The sources are displayed as table rows in the same ranked order as the cards |
| 3 | When the user opens the details panel of the row ranked #1 |  | The panel opens over the table with the footer "Previous" (disabled), "Source 1 of N" and "Next source"; row #1 shows the selected state |
| 4 | And the user clicks "Next source" |  | The panel stays open and shows "#2 · {domain of row 2}"; the counter reads "Source 2 of N"; row #2 shows the selected state and row #1 no longer does |
| 5 | Then the user clicks "Previous" |  | The panel shows "#1 · {domain of row 1}" again; the counter reads "Source 1 of N"; row #1 is selected again |

### GEO-1168 — Task (Ready for QA)

#### TC-GEO-1168-001 - Visibility-only source panel shows only the Lack of visibility tab

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the details panel of a source with only the Improve visibility badge shows only the "Lack of visibility (N)" tab. Covers AC-1. Panel tab names follow GEO-1178.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed on the ALL tab |
| 2 | And source V shows only the Improve visibility badge | Source V | The card of source V shows the IMPROVE VISIBILITY badge only and the line "Not visible in v articles" |
| 3 | When the user opens the details panel of source V |  | The details panel of source V opens |
| 4 | Then only the "Lack of visibility (N)" tab is displayed | N = v | A single tab "Lack of visibility (v)" is shown and no "Negative perception" tab is present |

#### TC-GEO-1168-002 - Perception-only source panel shows only the Negative perception tab

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the details panel of a source with only the Improve perception badge shows only the "Negative perception (N)" tab. Covers AC-2. Panel tab names follow GEO-1178.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed on the ALL tab |
| 2 | And source P shows only the Improve perception badge | Source P | The card of source P shows the IMPROVE PERCEPTION badge only and the line "Negative perception in p articles" |
| 3 | When the user opens the details panel of source P |  | The details panel of source P opens |
| 4 | Then only the "Negative perception (N)" tab is displayed | N = p | A single tab "Negative perception (p)" is shown and no "Lack of visibility" tab is present |

#### TC-GEO-1168-003 - Two-badge source panel shows both tabs with Lack of visibility first and selected

- **ACs:** AC-3 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the details panel of a source with both badges shows both tabs, "Lack of visibility" first and selected by default. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed on the ALL tab |
| 2 | And source B shows both reason badges | Source B (e.g. frandroid.com) | The card of source B shows the IMPROVE VISIBILITY and IMPROVE PERCEPTION badges |
| 3 | When the user opens the details panel of source B |  | The details panel of source B opens |
| 4 | Then both article tabs are displayed |  | Two tabs are shown: "Lack of visibility (a)" and "Negative perception (b)" |
| 5 | And the "Lack of visibility" tab is the first tab |  | "Lack of visibility (a)" is positioned before "Negative perception (b)" |
| 6 | And the "Lack of visibility" tab is selected by default |  | "Lack of visibility (a)" is the active tab and its article rows are displayed |

#### TC-GEO-1168-004 - Panel tab counts match the number of article rows

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that each panel tab shows its count and that the count matches the number of article rows listed in the tab. Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open | Source B: a missing, b negative | The tabs "Lack of visibility (a)" and "Negative perception (b)" are displayed |
| 2 | When the user views the "Lack of visibility" tab and clicks "Show N more articles" if displayed |  | All the articles of the tab are listed |
| 3 | Then the number of article rows equals the count in the tab label |  | Exactly a article rows are listed |
| 4 | When the user selects the "Negative perception" tab |  | The "Negative perception (b)" tab becomes active |
| 5 | Then the number of article rows equals the count in the tab label |  | Exactly b article rows are listed |

#### TC-GEO-1168-005 - No positive article is shown anywhere in the details panel

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that positive articles are no longer shown anywhere in the details panel (former Positive articles tab removed). Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines. Source B also has at least 1 verified positive article (URL known from the source-detail API response or reference data).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open | Positive article of source B (from the API response) | The details panel of source B is displayed |
| 2 | Then no tab for positive articles is displayed |  | Only "Lack of visibility (a)" and "Negative perception (b)" exist; there is no "Positive" tab |
| 3 | And the "Lack of visibility" tab does not list the positive article |  | The positive article URL is absent from the rows |
| 4 | When the user selects the "Negative perception" tab |  | The "Negative perception (b)" tab becomes active |
| 5 | Then the "Negative perception" tab does not list the positive article |  | The positive article URL is absent from the rows |
| 6 | And no other section of the panel shows the positive article |  | The positive article URL appears nowhere in the panel (header, prompts section, footer) |

#### TC-GEO-1168-006 - Panel tabs are rebuilt when navigating with Previous and Next source

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the panel tabs are rebuilt with the same rules for the new source when clicking Previous or Next source. Covers AC-6.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines. The user picks a source B whose next source in the list has a single reason.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open |  | Tabs "Lack of visibility (a)" and "Negative perception (b)" are displayed |
| 2 | When the user clicks "Next source" until a single-reason source is shown |  | The panel shows a source with one badge |
| 3 | Then the tabs are rebuilt for the new source |  | Only the tab of its reason is displayed, with its own count |
| 4 | When the user clicks "Previous" until source B is shown again |  | The panel shows source B again |
| 5 | Then the tabs are rebuilt with both reasons |  | Both tabs "Lack of visibility (a)" and "Negative perception (b)" are displayed, "Lack of visibility" first and selected |

#### TC-GEO-1168-007 - Single-badge source shows one reason line on card and one chip in table

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a source with only one badge shows a single reason line on its card and a single chip in the Articles cell of the table (chip omitted when its count is 0). Covers AC-7.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed |
| 2 | Then the card of source V shows one reason line | Source V | The card shows "Not visible in v articles" and no "Negative perception in" line |
| 3 | And the card of source P shows one reason line | Source P | The card shows "Negative perception in p articles" and no "Not visible in" line |
| 4 | When the user switches to list view |  | The Target Sources table is displayed |
| 5 | Then the Articles cell of source V shows one chip |  | Only the blue eye-off chip with v is shown; no purple thumb-down chip |
| 6 | And the Articles cell of source P shows one chip |  | Only the purple thumb-down chip with p is shown; no blue eye-off chip |

#### TC-GEO-1168-008 - Two-badge source shows both lines and badges on card and both chips in table

- **ACs:** AC-8 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a source with both badges shows both reason lines and both badges on its card and both chips in the table. Covers AC-8.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed |
| 2 | Then the card of source B shows both reason badges | Source B | The IMPROVE VISIBILITY and IMPROVE PERCEPTION badges are both shown |
| 3 | And the card of source B shows both reason lines |  | The card shows "Not visible in a articles" and "Negative perception in b articles" on two separate lines |
| 4 | When the user switches to list view |  | The Target Sources table is displayed |
| 5 | Then the Articles cell of source B shows both chips |  | A blue eye-off chip with a and a purple thumb-down chip with b are shown |

#### TC-GEO-1168-009 - Counts are consistent across card, table chips and panel tabs and drive ranking

- **ACs:** AC-9 | **Priority:** Urgent | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that for a given source the counts on the card, the table chips and the panel tabs are identical, and that missing + negative is the total used for ranking. Covers AC-9.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed |
| 2 | Then the card of source B shows its missing and negative counts | Source B | "Not visible in a articles" and "Negative perception in b articles" are shown |
| 3 | When the user switches to list view |  | The Target Sources table is displayed |
| 4 | Then the chips of source B show the same counts as the card |  | Blue eye-off chip a and purple thumb-down chip b |
| 5 | When the user opens the details panel of source B |  | The details panel of source B opens |
| 6 | Then the panel tabs show the same counts as the card and the chips |  | Tabs "Lack of visibility (a)" and "Negative perception (b)" |
| 7 | And the list is ranked by the total article count missing + negative | Totals of B, V, P and of their neighbours | Each source is ranked below every source with a higher total and above every source with a lower total |

#### TC-GEO-1168-010 - Card view with 12 sources or fewer shows all cards without Show more button

- **ACs:** AC-10 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that with 12 sources or fewer all cards are displayed and no "Show X more sources" button is shown (boundary = 12). Covers AC-10.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Conditional: a scope holding 12 target sources or fewer on the ALL tab (e.g. a Type or a Category whose list holds 12 sources or fewer), found at execution.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user applies a scope holding 12 target sources or fewer | e.g. Type filter on a type with 12 sources or fewer | The Target Sources view is displayed on the ALL tab |
| 2 | When the user selects card view |  | The cards are displayed |
| 3 | Then all the sources are shown as cards |  | The number of cards equals the count of the selected scope |
| 4 | And no "Show X more sources" button is shown |  | No "Show X more sources" button is present below the cards |

#### TC-GEO-1168-011 - Card view with more than 12 sources collapses behind Show X more sources

- **ACs:** AC-10 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that with more than 12 sources only 12 cards are shown and the button reads "Show X more sources" with X = total - 12. Covers AC-10.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page with more than 12 target sources | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources view is displayed on the ALL tab |
| 2 | When the user selects card view |  | The cards are displayed |
| 3 | Then only the first 12 sources are shown as cards |  | 12 cards are displayed, ranks 1 to 12 |
| 4 | And the collapse button shows the number of remaining sources | X = total - 12 | The button "Show X more sources" is displayed below the cards |

#### TC-GEO-1168-012 - Table view shows 10 rows before the Show X more sources button

- **ACs:** AC-11 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the table view shows 10 rows before its "Show X more sources" button. X = total - 10 (observed on staging; not stated in the ticket). Covers AC-11.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page with more than 10 target sources | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources view is displayed on the ALL tab |
| 2 | When the user selects list view |  | The Target Sources table is displayed |
| 3 | Then only the first 10 sources are shown as rows |  | 10 rows are displayed, ranks 1 to 10 |
| 4 | And a "Show X more sources" button is shown below the table | X = total - 10 | The button "Show X more sources" is displayed below the table |

#### TC-GEO-1168-013 - Category filter lists the analysis categories in left menu order with All categories default

- **ACs:** AC-12 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the new Category filter, next to the Type filter, lists the categories of the analysis in the same order as the left menu, with "All categories" by default. Covers AC-12.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. The left menu lists the categories of the analysis (Voitures hybrides > VUS > Voitures électriques on 2026-10-06).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page |  | The Target Sources view is displayed |
| 2 | Then a Category filter is displayed next to the Type filter |  | The Category dropdown is shown beside the Type dropdown |
| 3 | And the Category filter shows its default value |  | The Category dropdown reads "All categories" |
| 4 | When the user opens the Category filter |  | The list of categories is displayed |
| 5 | Then the options are the categories of the analysis | Categories listed in the left menu | Every category of the left menu is listed, and no other category |
| 6 | And the options are in the same order as the left menu |  | The option order matches the left menu order exactly |

#### TC-GEO-1168-014 - Selecting a category keeps only impacted sources and recalculates counts

- **ACs:** AC-13 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that selecting a category keeps only sources with at least one missing or negative article in answers of that category, and recalculates the counts for that category. Covers AC-13.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines. Category C1 = the first category of the left menu.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view with "All categories" selected | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The user notes the total and the reason lines of source B |
| 2 | When the user selects category C1 in the Category filter | Category: C1 | The Category dropdown shows C1 and the list re-renders |
| 3 | Then only sources with at least one missing or negative article in C1 answers are listed |  | The total is lower than or equal to the total of step 1 and no card shows a 0 count |
| 4 | And the counts of source B are recalculated for C1 |  | If source B is still listed, each of its lines is lower than or equal to its All categories value and its badges match its lines |
| 5 | When the user switches to list view |  | The Target Sources table is displayed |
| 6 | Then the chips of source B show the C1 counts |  | The chips of source B equal its C1 card lines |

#### TC-GEO-1168-015 - Category, Type and page tabs filters combine

- **ACs:** AC-14 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Category filter, the Type filter and the page tabs (All / Improve visibility / Improve perception) combine. Covers AC-14.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Category C1 = the first category of the left menu.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page on the ALL tab with default filters |  | Category reads "All categories" and Type reads "All types" |
| 2 | When the user selects category C1 | Category: C1 | Only sources impacting C1 are listed |
| 3 | And the user selects the type "Journalism" | Type: Journalism | Only sources of type Journalism impacting C1 are listed |
| 4 | And the user selects the IMPROVE PERCEPTION tab |  | The IMPROVE PERCEPTION tab is active |
| 5 | Then only sources matching the three criteria are listed |  | Every listed source is of type Journalism, impacts C1 and carries the IMPROVE PERCEPTION badge; the ranks start at 1 with no gap |

#### TC-GEO-1168-016 - Combined filters with no matching source show the filtered empty state

- **ACs:** AC-14 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that when the combination of Category, Type and page tab matches no source, the filtered empty state is shown. Covers AC-14. Observed 2026-10-01: the Type filter resets to "All types" when it no longer matches, so the filtered empty state could not be produced (open point). Conditional.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Conditional: a combination of category, type and tab with no matching source, found at execution (e.g. a category + a rare type + IMPROVE VISIBILITY).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page with default filters |  | The Target Sources list is displayed |
| 2 | When the user applies a combination of filters matching no source | Category + Type + Tab with no matching source (found at execution) | The filters show the selected values |
| 3 | Then the filtered empty state is displayed |  | The filtered empty state is shown instead of the list (copy not specified, see ambiguity) |
| 4 | And the all clear state is not displayed |  | "All clear" is not shown |

#### TC-GEO-1168-017 - No Cited count on cards, table, details panel and export

- **ACs:** AC-15 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that no "Cited" count appears on any Target Sources surface: cards, table, details panel and export. Covers AC-15. Updated 2026-10-07 per GEO-1160: the Cited column of the PPTX/PDF table is removed on purpose.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view |  | The Target Sources cards are displayed |
| 2 | Then no card shows a "Cited" count |  | No "Cited N× in gap answers" line or other "Cited" text appears on any card |
| 3 | When the user switches to list view |  | The Target Sources table is displayed |
| 4 | Then the table has no Cited column |  | No "Cited" column header nor cited count is displayed |
| 5 | When the user opens the details panel of source B |  | The details panel opens |
| 6 | Then the panel shows no "Cited" count |  | No "Cited" text or citation count appears in the panel |
| 7 | When the user exports the analysis as "Presentation .pptx" and as "PDF" |  | The two files are downloaded |
| 8 | Then the Target Sources slide and page show no "Cited" count |  | No "Cited" text, cited count or Cited column appears on the last slide / page (table columns "#", "Source", "Type", "Failing articles") |

#### TC-GEO-1168-018 - Key Takeaways block and panel header meta line are removed

- **ACs:** AC-16 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the Key Takeaways block (In Brief summary) and the panel header meta line (failing/positive/cited counts) are no longer displayed. Covers AC-16.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page |  | The Target Sources view is displayed |
| 2 | When the user opens the details panel of source B |  | The details panel of source B opens |
| 3 | Then the panel header shows no meta line |  | No failing, positive or cited count line is shown under the source name |
| 4 | And no Key Takeaways block is displayed |  | No "Key Takeaways" / In Brief summary block is present in the panel or on the page |

#### TC-GEO-1168-019 - Verifying state shows only title and spinner

- **ACs:** AC-17 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** state
- **Description:** Verify that the verifying state shows the title and the spinner, without the progress counter and without the explanatory paragraph. Covers AC-17.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis whose Target Sources verification is still in progress (verifying state of GEO-1119).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the verification of the analysis is in progress |  | The analysis is in verifying state |
| 2 | When the user opens Action Center > Target Sources |  | The verifying state is displayed instead of the list |
| 3 | Then the verifying title is displayed |  | The verifying state title is visible |
| 4 | And a spinner is displayed |  | The spinner is visible and animated |
| 5 | And no progress counter is displayed |  | No progress counter (e.g. N / M) is visible |
| 6 | And no explanatory paragraph is displayed under the title |  | No body text is shown under the title |

#### TC-GEO-1168-020 - All clear state shows the new title and body copy

- **ACs:** AC-18 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that when no source has a missing or negative article the all clear state shows "All clear" and "Every article used by AI engines describes your brand positively." Covers AC-18.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis or a scope where no source has a missing or negative article (candidate BYD 76aad462-a33f-4bdb-a925-2c1533e97a53 with AI Engines = Gemini only).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an analysis where no source has a missing or negative article |  | The analysis is completed |
| 2 | When the user opens Action Center > Target Sources |  | The all clear state is displayed instead of a list |
| 3 | Then the all clear title is displayed |  | All clear |
| 4 | And the all clear body is displayed |  | Every article used by AI engines describes your brand positively. |
| 5 | And no source list is displayed |  | No card or table row is shown |

#### TC-GEO-1168-021 - Table view has no Action column

- **ACs:** AC-19 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the table has no Action column and that its columns are #, Source, Type, Articles. Covers AC-19.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page |  | The Target Sources view is displayed |
| 2 | When the user switches to list view |  | The Target Sources table is displayed |
| 3 | Then the table has no Action column |  | No "Action" column header nor action control is present in the rows |
| 4 | And the table columns are #, Source, Type and Articles |  | Exactly four column headers in this order: #, Source, Type, Articles |

#### TC-GEO-1168-022 - PPT and PDF export use the split copy and chips with no Cited column

- **ACs:** AC-20 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that in the PPT and PDF export the top source cards and the table use the same split copy and chips as the app, with no Cited column. Covers AC-20. Updated 2026-10-07 per GEO-1160 / GEO-1222: the exported ranked table has 4 columns "# | Source | Type | Failing articles" (Cited removed on purpose); GEO-1222 is open (header currently "Articles").
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes the reason lines of source B and of a source S with a count of 1 | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The reason lines are noted |
| 2 | When the user exports the analysis as "Presentation .pptx" |  | The .pptx file is downloaded |
| 3 | Then the top source card of source B uses the split copy | Source B among the top 3 (e.g. #1) | "Not visible in a articles · Negative perception in b articles" |
| 4 | And a count of 1 uses the singular form | Source S among the exported sources | "... in 1 article" (never "1 articles") |
| 5 | And the Target Sources table shows the split counts in its last column |  | Each row shows its missing (eye-off) and negative (thumb-down) counts as the app chips, under the header "Failing articles" |
| 6 | And the Target Sources table has no Cited column |  | Exactly 4 columns "#", "Source", "Type", "Failing articles"; no "Cited" column |
| 7 | When the user exports the analysis as "PDF" |  | The PDF file is downloaded |
| 8 | Then the PDF shows the same split copy and counts as the PPT with no Cited column | Last page rendered and read visually | Same card lines and same table, 4 columns, no Cited column |

#### TC-GEO-1168-023 - New and changed strings in en-GB and en-US

- **ACs:** AC-21 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the new and changed strings exist in en-GB and en-US (same strings), with singular and plural forms. Covers AC-21.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is en-GB and the user is on the Target Sources page | Language: en-GB | The Target Sources view is displayed |
| 2 | Then the page subtitle is displayed |  | Sources to target to improve how AI engines represent your brand, sorted by the number of articles where your brand is missing or negatively represented |
| 3 | And the card lines use singular and plural forms | Source S (count 1); Source B | Card S: "Not visible in 1 article" or "Negative perception in 1 article"; card B: "Not visible in a articles" / "Negative perception in b articles" |
| 4 | And the filter defaults are displayed |  | "All categories" and "All types" |
| 5 | When the user switches to list view |  | The Target Sources table is displayed |
| 6 | Then the Articles column header is displayed |  | Articles |
| 7 | When the user opens the details panel of source B |  | The details panel opens |
| 8 | Then the prompts section title is displayed |  | Prompts associated with this source |
| 9 | When the user switches the app language to en-US and reloads Target Sources | Language: en-US | The Target Sources view is displayed in en-US |
| 10 | Then all the strings above are identical to en-GB |  | Same subtitle, card lines, filter defaults, Articles header and prompts section title as in en-GB |

#### TC-GEO-1168-024 - New and changed strings in fr-FR

- **ACs:** AC-21 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the new and changed strings exist in fr-FR with singular and plural forms. Covers AC-21. Observed 2026-10-01: the French subtitle differs from the ticket table (open point: fix the string or the ticket).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is fr-FR and the user is on the Target Sources page | Language: fr-FR | The Target Sources view is displayed in French |
| 2 | Then the page subtitle is displayed |  | Sources à cibler pour améliorer la façon dont les moteurs IA représentent votre marque, triées selon le nombre d'articles où votre marque est absente ou représentée négativement |
| 3 | And the card lines use singular and plural forms | Source S (count 1); Source B | Card S: "Non visible dans 1 article" or "Perception négative dans 1 article"; card B: "Non visible dans a articles" / "Perception négative dans b articles" |
| 4 | And the filter defaults are displayed |  | "Toutes les catégories" and "Tous les types" |
| 5 | When the user switches to list view |  | The Target Sources table is displayed |
| 6 | Then the Articles column header is displayed |  | Articles |
| 7 | When the user opens the details panel of source B |  | The details panel opens |
| 8 | Then the prompts section title is displayed |  | Prompts associés à cette source |
| 9 | And the user switches the app language back to en-GB | Language: en-GB | The Target Sources view is displayed in British English |

#### TC-GEO-1168-025 - New and changed strings in es-ES

- **ACs:** AC-21 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the new and changed strings exist in es-ES with singular and plural forms. Covers AC-21. Observed 2026-10-01: the Spanish subtitle differs from the ticket table (open point: fix the string or the ticket).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is es-ES and the user is on the Target Sources page | Language: es-ES | The Target Sources view is displayed in Spanish |
| 2 | Then the page subtitle is displayed |  | Fuentes en las que actuar para mejorar cómo los motores de IA representan su marca, ordenadas según el número de artículos en los que su marca está ausente o aparece de forma negativa |
| 3 | And the card lines use singular and plural forms | Source S (count 1); Source B | Card S: "No visible en 1 artículo" or "Percepción negativa en 1 artículo"; card B: "No visible en a artículos" / "Percepción negativa en b artículos" |
| 4 | And the filter defaults are displayed |  | "Todas las categorías" and "Todos los tipos" |
| 5 | When the user switches to list view |  | The Target Sources table is displayed |
| 6 | Then the Articles column header is displayed |  | Artículos |
| 7 | When the user opens the details panel of source B |  | The details panel opens |
| 8 | Then the prompts section title is displayed |  | Prompts asociados a esta fuente |
| 9 | And the user switches the app language back to en-GB | Language: en-GB | The Target Sources view is displayed in British English |

#### TC-GEO-1168-026 - All clear state strings in en-US, fr-FR and es-ES

- **ACs:** AC-21 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the changed all clear title and body exist in en-US, fr-FR and es-ES (en-GB covered by TC-GEO-1168-020). Covers AC-21. Observed 2026-10-01: the French all-clear body differs from the ticket table (open point).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis or a scope where no source has a missing or negative article (candidate BYD 76aad462-a33f-4bdb-a925-2c1533e97a53 with AI Engines = Gemini only). The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is en-US and the user opens Target Sources of the all clear analysis | Language: en-US | The all clear state is displayed |
| 2 | Then the all clear title and body are displayed in en-US |  | "All clear" / "Every article used by AI engines describes your brand positively." |
| 3 | When the user switches the app language to fr-FR | Language: fr-FR | The all clear state is displayed in French |
| 4 | Then the all clear title and body are displayed in fr-FR |  | "Tout est en ordre" / "Tous les articles utilisés par les moteurs IA décrivent votre marque de façon positive." |
| 5 | When the user switches the app language to es-ES | Language: es-ES | The all clear state is displayed in Spanish |
| 6 | Then the all clear title and body are displayed in es-ES |  | "Todo en orden" / "Todos los artículos utilizados por los motores de IA describen su marca de forma positiva." |

#### TC-GEO-1168-027 - Spanish strings address the user with usted

- **ACs:** AC-22 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the new and changed Spanish strings use "usted" (su marca), as in the rest of the app. Covers AC-22.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. A second analysis or scope in the all-clear state is available (candidate BYD 76aad462-a33f-4bdb-a925-2c1533e97a53, AI Engines = Gemini only). The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is es-ES and the user is on the Target Sources page | Language: es-ES | The Target Sources view is displayed in Spanish |
| 2 | Then the page subtitle uses the usted form |  | The subtitle contains "su marca" twice and never "tu marca" |
| 3 | When the user opens Target Sources of the all clear analysis |  | The all clear state is displayed |
| 4 | Then the all clear body uses the usted form |  | Todos los artículos utilizados por los motores de IA describen su marca de forma positiva. |
| 5 | And no new or changed string uses the tú form |  | No "tu marca", "tus" or tú-form verb appears in the subtitle, card lines, filters, Articles header, prompts section title or all clear state |

#### TC-GEO-1168-028 - Unused translation keys are removed from the four locale files

- **ACs:** AC-23 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify by static review that the keys no longer used are removed from the en-GB, en-US, fr-FR and es-ES locale files. Covers AC-23.
- **Precondition:** Read access to the frontend locale files en-GB, en-US, fr-FR and es-ES of the GEO-1168 build.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the four locale files of the GEO-1168 build are open | en-GB, en-US, fr-FR, es-ES | The four files are readable |
| 2 | When the user searches the views.targetSources namespace for the removed keys | citedInGapAnswers, colCited, colAction, colFailing, failingArticles, verifyingBody, panel.keyTakeaways, panel.citedCount, panel.positiveCount, panel.failingTab, panel.positiveTab, panel.failingPromptsTitle | The search runs on each of the 4 files |
| 3 | Then none of the removed keys is found in any locale file |  | 0 occurrence of each of the 12 keys in each of the 4 files |
| 4 | And no raw translation key is displayed on the Target Sources page |  | No text such as "views.targetSources.colCited" is visible on cards, table, filters or panel |

#### TC-GEO-1168-029 - Switching the app language updates card lines, chips, tabs, filters and export

- **ACs:** AC-24 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that when the app language is switched, the card lines, chips, tabs, filters and export all follow it. Covers AC-24.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read on their cards at execution (they roll with the window): B = a source with both badges (e.g. frandroid.com: a missing, b negative articles), V = a source with the Improve visibility badge only (v missing), P = a source with the Improve perception badge only (p negative), S = a source with a count of exactly 1 on one of its lines. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in en-GB in card view | Language: en-GB | Card B shows "Not visible in a articles" and "Negative perception in b articles" |
| 2 | When the user switches the app language to fr-FR | Language: fr-FR | The page is re-rendered in French |
| 3 | Then the card lines follow the new language |  | Card B shows "Non visible dans a articles" and "Perception négative dans b articles" |
| 4 | And the filters follow the new language |  | The filters read "Toutes les catégories" and "Tous les types" |
| 5 | And the table chips follow the new language |  | In list view, the chips of source B show a and b with no English text (tooltip or label, if any, in French) |
| 6 | And the panel tabs follow the new language |  | In the details panel of source B the tabs read "Manque de visibilité (a)" and "Perception négative (b)" |
| 7 | When the user exports the analysis as "Presentation .pptx" |  | The .pptx file is downloaded |
| 8 | Then the export follows the new language |  | The last slide reads "ACTIONS · SOURCES À CIBLER" and card B reads "Non visible dans a articles · Perception négative dans b articles" |
| 9 | And the user switches the app language back to en-GB | Language: en-GB | The page is displayed in British English |

### GEO-1169 — Task (Ready for QA)

#### TC-GEO-1169-001 - Top X domains by Frequency are selected and all their GROUNDED URLs sent to verification

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the selection keeps the 100 domains with the highest Frequency and sends every GROUNDED cited URL of those domains to verification, with no URL cap. Covers AC-1. Backend-verifiable only (SKIP in UI runs).
- **Precondition:** A completed snapshot exists with more than 100 GROUNDED domains after the owned and competitor exclusion. X is at its default value (100). A reference ranking of the snapshot domains by Frequency is available. Backend access to the selection job of the snapshot is available (selected domain list with Frequency, list of URLs sent to verification, selection log).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed snapshot with more than 100 GROUNDED domains after the owned and competitor exclusion | X = 100 (default) | The snapshot and its reference ranking of domains by Frequency are available |
| 2 | When the suspect selection runs over that snapshot |  | The selection run completes and sets its SUSPECT_SELECTION done marker |
| 3 | Then exactly the 100 domains with the highest Frequency are selected |  | The selected domain list contains 100 domains and matches the top 100 of the reference ranking |
| 4 | And every GROUNDED cited URL of those 100 domains is sent to verification |  | The number of URLs sent to verification equals the number of distinct GROUNDED cited URLs of the 100 domains, with no cap applied |
| 5 | And no URL of a domain ranked below the top 100 and no non-GROUNDED citation is sent to verification |  | None of the URLs sent to verification belongs to a domain ranked 101 or lower, and none comes from a non-GROUNDED citation |

#### TC-GEO-1169-002 - Owned and competitor domains are excluded before the top X ranking

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that owned and competitor domains are removed before the ranking, so they do not take a top X slot. Covers AC-1 (edge case). Backend-verifiable only (SKIP in UI runs).
- **Precondition:** The analysis has owned and competitor domains configured. In the snapshot, one owned domain and one competitor domain each have a Frequency within the top 100 before exclusion, and more than 102 GROUNDED domains exist in total. Backend access to the selection job of the snapshot is available (selected domain list with Frequency, list of URLs sent to verification, selection log).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a snapshot where an owned domain and a competitor domain rank in the top 100 by Frequency before exclusion | Owned domain: toyota.com, competitor domain: honda.com (Toyota analysis) | Both domains are present in the reference ranking within the top 100 |
| 2 | When the suspect selection runs over that snapshot |  | The selection run completes |
| 3 | Then neither the owned domain nor the competitor domain is selected |  | toyota.com and honda.com are absent from the selected domain list and none of their URLs is sent to verification |
| 4 | And the selection still contains 100 domains, including the domains ranked 101 and 102 before the exclusion |  | The selected domain list contains 100 domains and includes the two domains that ranked 101 and 102 in the ranking before exclusion |

#### TC-GEO-1169-003 - Selection Frequency matches the AI Citation Sources Frequency column

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Frequency used for the selection ranking is the same value as the Frequency column of AI Citation Sources (unique URLs per domain). Covers AC-2. Backend-verifiable only (SKIP in UI runs).
- **Precondition:** A completed snapshot exists and its suspect selection has run. The AI Citation Sources table is opened on the same snapshot with a scope covering all markets, all engines and all question types. Backend access to the selection job of the snapshot is available (selected domain list with Frequency, list of URLs sent to verification, selection log).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the selection output of the snapshot lists the selected domains with their Frequency | Domains ranked 1, 50 and 100 in the selection | The Frequency of the 3 domains is recorded from the selection output |
| 2 | When the user opens the AI Citation Sources table of the same snapshot with all markets, all engines and all question types |  | The table lists the domains with their Frequency column |
| 3 | Then the Frequency of each of the 3 domains in the table equals the Frequency used by the selection |  | The 3 Frequency values are identical in the table and in the selection output |
| 4 | And the order of the selected domains matches the Frequency order of the table once owned and competitor domains are set aside |  | The selected domains appear in the same relative order as in the AI Citation Sources table sorted by Frequency |

#### TC-GEO-1169-004 - Frequency counts unique URLs, not citations

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a domain with one URL cited many times ranks by its number of unique URLs, the same way as AI Citation Sources. Covers AC-2 (edge case). Backend-verifiable only (SKIP in UI runs).
- **Precondition:** A completed snapshot exists in which domain A has 1 distinct URL cited in 30 answers and domain B has 5 distinct URLs each cited in 1 answer. Both are GROUNDED, non-owned and non-competitor. Backend access to the selection job of the snapshot is available (selected domain list with Frequency, list of URLs sent to verification, selection log).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a snapshot where domain A has 1 URL cited in 30 answers and domain B has 5 distinct URLs cited once each | Domain A: 1 URL x 30 answers, domain B: 5 URLs x 1 answer | Both domains are present in the snapshot citations |
| 2 | When the suspect selection ranks the domains of the snapshot |  | The selection ranking is produced |
| 3 | Then domain A has a Frequency of 1 and domain B a Frequency of 5 |  | The selection output shows Frequency 1 for domain A and 5 for domain B, identical to the AI Citation Sources Frequency column |
| 4 | And domain B ranks above domain A |  | Domain B is placed above domain A in the selection ranking |

#### TC-GEO-1169-005 - Source cited only in positive answers is selected and sent to verification

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a top X domain cited only in answers where the brand is visible, first and positive is selected, which the failing-prompts selection did not allow. Covers AC-3. Backend-verifiable only (SKIP in UI runs).
- **Precondition:** A completed snapshot exists in which a GROUNDED, non-owned, non-competitor domain ranks in the top 100 by Frequency and is cited only in answers where the brand is visible, ranked first and has no negative concept (identified from reference data). Backend access to the selection job of the snapshot is available (selected domain list with Frequency, list of URLs sent to verification, selection log).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a top 100 domain cited only in answers where the brand is visible, first and positive | Domain identified from the snapshot reference data | The domain is in the top 100 of the reference ranking and has no gap answer |
| 2 | When the suspect selection runs over that snapshot |  | The selection run completes |
| 3 | Then the domain is in the selected domain list |  | The domain appears in the selected domain list |
| 4 | And all its GROUNDED cited URLs are sent to verification |  | Every GROUNDED cited URL of the domain is in the list of URLs sent to verification |

#### TC-GEO-1169-006 - Positive-only source with a missing article is listed in Target Sources

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify in the UI that a source cited only in positive answers now reaches Target Sources when one of its articles does not mention the brand. Covers AC-3.
- **Precondition:** GEO-1168 and GEO-1169 are deployed together on the target environment. The user is logged in, app language en-GB, and opens the Target Sources page of the Action Center of the staging Toyota analysis https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions (verification finished, period "Last 7 days", other filters at their defaults). Reference data identifies source S: cited only in answers where the brand is visible, first and positive, with at least one verified article that does not mention the brand.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page on the ALL tab |  | The Target Sources list is displayed |
| 2 | When the user locates source S in the list | Source S from reference data | Source S is listed with its count of articles where the brand is missing |
| 3 | And the user opens the details panel of source S |  | The details panel of source S opens |
| 4 | Then every prompt under "Prompts associated with this source" is a prompt where the brand is visible, first and positive |  | No listed prompt is a gap answer, which confirms that the source entered the pool through its Frequency and not through a failing prompt |

#### TC-GEO-1169-007 - X is changed in configuration and applies to the next selection run

- **ACs:** AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that changing X in the configuration applies to the next selection run without a release. Covers AC-4. Backend-verifiable only (SKIP in UI runs).
- **Precondition:** Access to the selection configuration value X on the test environment is available. A new snapshot with more than 50 GROUNDED domains after exclusion will be produced after the change (new analysis run). Backend access to the selection job of the snapshot is available (selected domain list with Frequency, list of URLs sent to verification, selection log).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given X is set to 100 in the configuration | X = 100 | The configuration shows X = 100 |
| 2 | When X is set to 50 in the configuration without any deployment | X = 50 | The configuration shows X = 50 and no release or deployment is performed |
| 3 | And the next selection run executes on a new snapshot |  | The selection run completes on the new snapshot |
| 4 | Then the selection keeps exactly the 50 domains with the highest Frequency |  | The selected domain list of the new snapshot contains 50 domains, the top 50 of the reference ranking |
| 5 | And the selection log shows X applied = 50 |  | The log of the run reports X = 50 |
| 6 | And X is set back to 100 in the configuration | X = 100 | The configuration shows X = 100 again |

#### TC-GEO-1169-008 - Top X domain with no missing or negative article is not shown in Target Sources

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that a selected domain whose articles all name the brand positively or neutrally does not appear in Target Sources. Covers AC-5.
- **Precondition:** GEO-1168 and GEO-1169 are deployed together on the target environment. The user is logged in, app language en-GB, and opens the Target Sources page of the Action Center of the staging Toyota analysis https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions (verification finished, period "Last 7 days", other filters at their defaults). Reference data identifies domain D: in the top 100 selection, all its articles verified with the brand present and not negative (0 missing, 0 negative).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page on the ALL tab |  | The Target Sources list is displayed |
| 2 | When the user browses the full Target Sources list | Domain D from reference data | The whole list is loaded |
| 3 | Then domain D is not listed |  | Domain D does not appear in the Target Sources list |
| 4 | And every listed source has at least one missing or negative article |  | Each listed source shows a count of at least 1 missing or negative article |

#### TC-GEO-1169-009 - All-clear state when no top X domain has a missing or negative article

- **ACs:** AC-5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the page shows the all-clear state when no domain of the top X has a missing or negative article. Covers AC-5 (state).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: a completed analysis or scope in which no domain of the top X has a missing or negative article, confirmed from back-end reference data (candidate BYD 76aad462-a33f-4bdb-a925-2c1533e97a53, AI Engines = Gemini only).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the Action Center of that analysis |  | The Action Center page loads |
| 2 | When the Target Sources page is displayed |  | The Target Sources page renders |
| 3 | Then the all-clear state is shown |  | The title "All clear" and the body "Every article used by AI engines describes your brand positively." are displayed |
| 4 | And no source list is shown under it |  | No source card or table row is displayed under the all-clear message |

#### TC-GEO-1169-010 - Prompts panel lists every prompt citing the source, not only failing ones

- **ACs:** AC-6 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that "Prompts associated with this source" lists every prompt whose answer cites the source in the scope, including non-failing prompts. Covers AC-6.
- **Precondition:** GEO-1168 and GEO-1169 are deployed together on the target environment. The user is logged in, app language en-GB, and opens the Target Sources page of the Action Center of the staging Toyota analysis https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions (verification finished, period "Last 7 days", other filters at their defaults). Reference data identifies source S, listed in Target Sources and cited both in gap answers and in answers where the brand is visible, first and positive, with the full list of prompts citing S in the default scope.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page on the ALL tab |  | The Target Sources list is displayed |
| 2 | When the user opens the details panel of source S | Source S from reference data | The details panel of source S opens |
| 3 | Then the section "Prompts associated with this source" is displayed below the articles |  | The section title "Prompts associated with this source" is shown below the article list |
| 4 | And the list includes at least one prompt where the brand is visible, first and positive |  | At least one listed prompt is a non-failing prompt from the reference data |
| 5 | And the number of prompts equals the number of prompts citing source S in the scope |  | 6 prompts are shown and 6 + X of "Show X more prompts" equals the reference count of prompts citing S |

#### TC-GEO-1169-011 - Prompt cited by several engines appears once with one icon per engine

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a prompt whose answers cite the source on several engines is listed on one row with the icons of the citing engines. Covers AC-6. Updated 2026-10-07 per GEO-1167 (one row per prompt, final design) and GEO-1219 (open: case duplicates such as "Kia" / "KIA"; expected = one row).
- **Precondition:** GEO-1168 and GEO-1169 are deployed together on the target environment. The user is logged in, app language en-GB, and opens the Target Sources page of the Action Center of the staging Toyota analysis https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions (verification finished, period "Last 7 days", other filters at their defaults). Reference data identifies source S and a prompt P whose ChatGPT answer and Gemini answer both cite S.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source S is open | Source S, prompt P (cited by ChatGPT and Gemini) | The section "Prompts associated with this source" is displayed |
| 2 | When the user locates prompt P in the list, expanding "Show X more prompts" if needed |  | Prompt P is visible in the list |
| 3 | Then prompt P appears on exactly one row |  | Prompt P is listed once |
| 4 | And the row of prompt P shows the ChatGPT and Gemini icons |  | The row shows the prompt text, its market flag and one icon for ChatGPT and one for Gemini |

#### TC-GEO-1169-012 - Prompts list is limited to the current scope

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the prompts listed for a source follow the scope of the page (AI Engines filter). Covers AC-6.
- **Precondition:** GEO-1168 and GEO-1169 are deployed together on the target environment. The user is logged in, app language en-GB, and opens the Target Sources page of the Action Center of the staging Toyota analysis https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions (verification finished, period "Last 7 days", other filters at their defaults). Reference data identifies source S cited by ChatGPT answers and by answers of at least one other engine, with the list of prompts whose ChatGPT answer cites S.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source S is open with all filters at their defaults | Source S | The prompts list shows prompts cited by several engines |
| 2 | When the user sets the AI Engines filter of the page to ChatGPT only | AI Engines = ChatGPT | The page is recomputed in the ChatGPT scope |
| 3 | And the user opens the details panel of source S again |  | The details panel of source S opens |
| 4 | Then the list only contains the prompts whose ChatGPT answer cites source S |  | The listed prompts match the reference list of prompts cited by ChatGPT, and each row shows only the ChatGPT icon |

#### TC-GEO-1169-013 - Selection is idempotent per snapshot and keeps the done marker

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that running the selection again on the same snapshot does not change its result and keeps the SUSPECT_SELECTION done marker. Covers AC-7. Backend-verifiable only (SKIP in UI runs).
- **Precondition:** A snapshot has completed its suspect selection and has the SUSPECT_SELECTION done marker. The selected domains and the URLs sent to verification by the first run are recorded. A way to trigger the selection job again for the same snapshot is available. Backend access to the selection job of the snapshot is available (selected domain list with Frequency, list of URLs sent to verification, selection log).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a snapshot with the SUSPECT_SELECTION done marker and a recorded selection result |  | The done marker is present and the first selection result is recorded |
| 2 | When the selection job is triggered again for the same snapshot |  | The job run ends without error |
| 3 | Then the selected domains and the URLs sent to verification are identical to the first run |  | No domain or URL is added or removed, and no URL is sent to verification a second time |
| 4 | And the SUSPECT_SELECTION done marker is still set for the snapshot |  | The snapshot keeps a single SUSPECT_SELECTION done marker |

#### TC-GEO-1169-014 - Selection log shows domains considered, X applied and URLs sent

- **ACs:** AC-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the selection log reports the number of domains considered, the X applied and the number of URLs sent to verification. Covers AC-8. Backend-verifiable only (SKIP in UI runs).
- **Precondition:** A selection run has completed for a known snapshot with X = 100. The number of GROUNDED domains after the owned and competitor exclusion and the number of URLs sent to verification are known from reference data. Backend access to the selection job of the snapshot is available (selected domain list with Frequency, list of URLs sent to verification, selection log).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a completed selection run for a known snapshot | X = 100 | The run is completed |
| 2 | When the selection log of that run is opened |  | The log entries of the run are displayed |
| 3 | Then the log shows the number of domains considered |  | The reported number of domains equals the reference number of domains considered |
| 4 | And the log shows the X applied | X = 100 | The log reports X = 100 |
| 5 | And the log shows the number of URLs sent to verification |  | The reported number of URLs equals the number of URLs in the verification list of the run |

### GEO-1173 — Task (Passed QA)

#### TC-GEO-1173-001 - Action Center is the last slide of the PowerPoint export

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Action Center (Target Sources) section is placed as the last slide of the PowerPoint analysis export and no longer appears in the middle of the deck (previously around slide 9). Covers AC-1. Updated 2026-10-07 per GEO-1189: on the Toyota analysis the deck had 41 slides on 2026-10-06 with the Action Center last (count drifts with the scope).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of a completed analysis |  | The analysis is displayed and the left navigation lists Overview, Categories and "Action Center" as its last entry |
| 2 | When the user clicks the export (download) icon button in the analysis toolbar |  | The "Export analysis as" menu opens with the options "PDF", "Presentation .pptx" and "Spreadsheet .xls" |
| 3 | And the user selects "Presentation .pptx" | Option: Presentation .pptx | The PowerPoint export is generated and the .pptx file is downloaded |
| 4 | And the user opens the downloaded deck |  | The deck opens and all slides are listed |
| 5 | Then the last slide of the deck is the Action Center · Target Sources slide |  | The final slide shows the eyebrow "ACTION CENTER · TARGET SOURCES", the title "Where PR effort pays first" and the subtitle "Top N of M verified target sources · every claim checked against the page itself" with the ranked sources |
| 6 | And no Action Center slide appears before the other analysis sections |  | No "ACTION CENTER · TARGET SOURCES" slide is found in the middle of the deck (e.g. around slide 9) and no other section slide comes after it |

#### TC-GEO-1173-002 - Action Center is the last page of the PDF export

- **ACs:** AC-2 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the Action Center (Target Sources) section is placed as the last page of the PDF analysis export and no longer appears in the middle of the document (previously around slide 9). Covers AC-2. Updated 2026-10-07 per GEO-1189.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Overview of a completed analysis |  | The analysis is displayed and the left navigation lists Overview, Categories and "Action Center" as its last entry |
| 2 | When the user clicks the export (download) icon button in the analysis toolbar |  | The "Export analysis as" menu opens with the options "PDF", "Presentation .pptx" and "Spreadsheet .xls" |
| 3 | And the user selects "PDF" | Option: PDF | The PDF export is generated and the .pdf file is downloaded |
| 4 | And the user opens the downloaded PDF |  | The PDF opens and all pages are listed |
| 5 | Then the last page of the PDF is the Action Center · Target Sources page |  | The final page shows the eyebrow "ACTION CENTER · TARGET SOURCES", the title "Where PR effort pays first" and the subtitle "Top N of M verified target sources · every claim checked against the page itself" with the ranked sources |
| 6 | And no Action Center page appears before the other analysis sections |  | No "ACTION CENTER · TARGET SOURCES" page is found in the middle of the PDF (e.g. around page 9) and no other section page comes after it |

#### TC-GEO-1173-003 - Export section order follows the GEO tab order

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the section order of the PowerPoint and PDF exports follows the order of the GEO analysis navigation, with the Action Center last. Covers AC-3. Updated 2026-10-07 per GEO-1189: the category sections follow the left navigation order.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Overview https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e, period "Last 7 days", AI Engines and countries left at their defaults. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user notes the order of the analysis navigation in GEO | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e | The order is recorded from first to last: Overview (Identity, Performance, Sources), the categories in the left navigation order (Voitures hybrides > VUS > Voitures électriques on 2026-10-06), then "Action Center" as the last entry |
| 2 | When the user exports the analysis with "Presentation .pptx" and opens the deck | Option: Presentation .pptx | The deck opens and all slides are listed |
| 3 | Then the order of the sections in the deck matches the recorded GEO navigation order |  | Each exported section appears in the same relative order as in the GEO navigation and the "ACTION CENTER · TARGET SOURCES" slide closes the deck |
| 4 | And the category sections of the deck follow the left navigation order |  | The category section slides appear in the recorded order (e.g. Voitures hybrides, then VUS, then Voitures électriques) |
| 5 | When the user exports the analysis with "PDF" and opens the document | Option: PDF | The PDF opens and all pages are listed |
| 6 | Then the order of the sections in the PDF matches the order of the PowerPoint deck |  | The PDF pages follow the same section order as the deck and the "ACTION CENTER · TARGET SOURCES" page closes the PDF |

#### TC-GEO-1173-004 - All clear Target Sources slide closes the PPT and PDF exports

- **ACs:** AC-1, AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** [Figma] Verify that when the Action Center has no target source, the "All clear" Target Sources slide is still exported as the last slide of the PowerPoint and the last page of the PDF. Design state: PPT/PDF · Corner · All clear (node 14430:82200). Relates to AC-1 and AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Conditional: an analysis or a scope where no source has a missing or negative article (candidate BYD 76aad462-a33f-4bdb-a925-2c1533e97a53 with AI Engines = Gemini only). Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on a completed analysis whose Action Center has no target source |  | The Action Center shows no target source in its list |
| 2 | When the user exports the analysis with "Presentation .pptx" and opens the deck | Option: Presentation .pptx | The deck opens and all slides are listed |
| 3 | Then the last slide of the deck is the all-clear Target Sources slide |  | The final slide shows the eyebrow "ACTION CENTER · TARGET SOURCES", a check icon, the title "All clear" and the text "Every article used by AI engines describes your brand positively." |
| 4 | When the user exports the analysis with "PDF" and opens the document | Option: PDF | The PDF opens and all pages are listed |
| 5 | Then the last page of the PDF is the all-clear Target Sources page |  | The final page shows the eyebrow "ACTION CENTER · TARGET SOURCES", a check icon, the title "All clear" and the text "Every article used by AI engines describes your brand positively." |

### GEO-1178 — Task (QA In Progress)

#### TC-GEO-1178-001 - Missing-only source panel shows only the Lack of visibility tab and its explanation line

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the details panel of a source with only missing articles shows only the "Lack of visibility (N)" tab and its explanation line. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed on the ALL tab |
| 2 | And source V shows only the Improve visibility badge | Source V (e.g. zonebourse.com) | The card of source V shows the IMPROVE VISIBILITY badge only and the line "Not visible in v articles" |
| 3 | When the user opens the details panel of source V |  | The panel opens with the header "#k · {domain of V}" |
| 4 | Then only the "Lack of visibility (N)" tab is displayed | N = v | A single tab "Lack of visibility (v)" with the eye-off icon is shown and no "Negative perception" tab is present |
| 5 | And the explanation line of the tab is displayed | Brand: Toyota | "None of these articles mentions Toyota anywhere on the page." is shown under the tab, with the eye-off icon |

#### TC-GEO-1178-002 - Negative-only source panel shows only the Negative perception tab and its explanation line

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the details panel of a source with only negative articles shows only the "Negative perception (N)" tab and its explanation line. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed on the ALL tab |
| 2 | And source P shows only the Improve perception badge | Source P (e.g. trustpilot.com) | The card of source P shows the IMPROVE PERCEPTION badge only and the line "Negative perception in p articles" |
| 3 | When the user opens the details panel of source P |  | The panel opens with the header "#k · {domain of P}" |
| 4 | Then only the "Negative perception (N)" tab is displayed | N = p | A single tab "Negative perception (p)" with the thumb-down icon is shown and no "Lack of visibility" tab is present |
| 5 | And the explanation line of the tab is displayed | Brand: Toyota | "Each of these articles mentions Toyota negatively." is shown under the tab, with the thumb-down icon |

#### TC-GEO-1178-003 - Two-reason source panel shows both tabs with Lack of visibility first and selected by default

- **ACs:** AC-3 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a source with both reasons shows both tabs with their icons, "Lack of visibility" first and selected by default. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed on the ALL tab |
| 2 | When the user opens the details panel of source B | Source B (e.g. frandroid.com) | The panel opens with the header "#k · {domain of B}" |
| 3 | Then both article tabs are displayed at the top of the panel, each with its icon |  | A two-segment control shows "Lack of visibility (a)" with the eye-off icon and "Negative perception (b)" with the thumb-down icon |
| 4 | And the "Lack of visibility" tab is the first tab |  | "Lack of visibility (a)" is the left segment, before "Negative perception (b)" |
| 5 | And the "Lack of visibility" tab is selected by default |  | "Lack of visibility (a)" is the active (white) segment, "None of these articles mentions Toyota anywhere on the page." is shown and its articles are listed |

#### TC-GEO-1178-004 - Switching the article tab does not change the prompts section

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the prompts section stays below the articles after a divider and does not change when switching the article tab. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open on the "Lack of visibility (a)" tab | Source B | The missing articles are listed |
| 2 | And the prompts section is displayed below the articles, separated by a divider |  | A short horizontal divider is followed by "Prompts associated with this source", the engine filter on "All", 6 prompt rows and "Show X more prompts" (record X and the 6 rows) |
| 3 | When the user selects the "Negative perception (b)" tab |  | The negative articles are listed and "Each of these articles mentions Toyota negatively." is shown |
| 4 | Then the prompts section is unchanged |  | The heading, the engine tabs and counts, the 6 prompt rows (same text, engine icons and flags) and "Show X more prompts" are identical to step 2, still below the divider |
| 5 | When the user selects the "Lack of visibility (a)" tab again |  | The missing articles are listed again |
| 6 | Then the prompts section is still unchanged |  | The prompts section is identical to step 2 |

#### TC-GEO-1178-005 - Tab counts match the number of articles in each tab and the card line of the source

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the count of each tab matches the number of articles in the tab and the card line of the source. Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in card view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources cards are displayed |
| 2 | And the card of source B shows its reason lines | Source B | The card shows "Not visible in a articles" and "Negative perception in b articles" |
| 3 | When the user opens the details panel of source B |  | The tabs "Lack of visibility (a)" and "Negative perception (b)" are displayed |
| 4 | And the user clicks "Show N more articles" if it is displayed |  | The remaining missing articles are added to the list |
| 5 | Then the "Lack of visibility" tab lists as many articles as its count |  | Exactly a article rows are listed under "Lack of visibility (a)" |
| 6 | When the user selects the "Negative perception (b)" tab |  | The negative articles are listed |
| 7 | Then the "Negative perception" tab lists as many articles as its count |  | Exactly b article rows are listed under "Negative perception (b)" |
| 8 | And both tab counts match the card line of source B |  | a = "Not visible in a articles" and b = "Negative perception in b articles" |

#### TC-GEO-1178-006 - Explanation line uses the analysis brand name and is not repeated on each article

- **ACs:** AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the explanation line of each tab uses the brand name of the analysis and is not repeated on each article. Covers AC-5.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open on the "Lack of visibility (a)" tab | Source B; brand of the analysis: Toyota | The missing articles are listed |
| 2 | Then one explanation line is shown under the tab with the brand name |  | "None of these articles mentions Toyota anywhere on the page." is shown once, between the tabs and the first article |
| 3 | And no article row repeats a per-article verdict line |  | Each article row only shows its title, URL and engine icons, with no verdict text |
| 4 | When the user selects the "Negative perception (b)" tab |  | The negative articles are listed |
| 5 | Then one explanation line is shown under the tab with the brand name |  | "Each of these articles mentions Toyota negatively." is shown once, between the tabs and the first article |
| 6 | And no article row repeats a per-article verdict line |  | Each negative article row only shows its title, URL, engine icons and passage, with no "describes negatively" verdict text |

#### TC-GEO-1178-007 - Each article shows its title, URL and the icons of the engines that cite it

- **ACs:** design / requirement check | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that each article shows its title, URL and the icons of the engines that cite it, with no passage on missing articles. Covers the article-row rule (R-4).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open on the "Lack of visibility (a)" tab | Source B | The missing articles are listed |
| 2 | Then each article row shows the article title |  | Each row shows a globe/favicon icon and the article title in bold |
| 3 | And each article row shows the article URL |  | Each row shows the URL in grey under the title, without protocol, starting with the domain of B |
| 4 | And each article row shows the icons of the engines that cite it |  | Each row shows at least one engine icon (ChatGPT, Gemini and/or Perplexity), right-aligned |
| 5 | And missing articles show no negative passage |  | No quoted passage is shown on the "Lack of visibility" article rows |

#### TC-GEO-1178-008 - Negative articles also show the passage where the brand is mentioned negatively

- **ACs:** design / requirement check | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that negative articles also show the passage where the brand is mentioned negatively. Covers the article-row rule (R-4).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open | Source B | The "Lack of visibility (a)" tab is selected |
| 2 | When the user selects the "Negative perception (b)" tab |  | The negative articles are listed |
| 3 | Then each negative article row shows its title, URL and citing engine icons |  | Each row shows the bold title, the grey URL starting with the domain of B and the right-aligned engine icons |
| 4 | And each negative article row shows the passage where Toyota is mentioned negatively | Brand: Toyota | Under the URL, each row shows a passage of the article mentioning Toyota negatively, in italics, inside curly quotes, with a vertical bar on its left |

#### TC-GEO-1178-009 - A prompt cited by several engines appears once, with its market flag and one icon per engine

- **ACs:** AC-6 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a prompt cited by several engines appears once, with its market flag and one icon per engine. Covers AC-6. Updated 2026-10-07 per GEO-1167 (one row per prompt, final design) and GEO-1219 (open): no duplicate even ignoring case (e.g. "Kia" / "KIA" must be one row).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open | Source B, n prompts | "Prompts associated with this source" is displayed below the articles with the engine filter on "All" |
| 2 | When the user clicks "Show X more prompts" |  | All n prompts of source B are listed |
| 3 | Then a prompt cited by several engines appears exactly once in the list | e.g. "Best Voitures Électriques?" (cited by ChatGPT, Gemini, Perplexity) or any prompt with 2 engine icons or more | One single row shows the prompt (no duplicate row per engine) |
| 4 | And the row shows the prompt text and its market flag |  | The row shows the prompt text in quotes and the flag of its market at the bottom right |
| 5 | And the row shows one icon per engine that cites the source |  | One icon per citing engine is shown before the flag |
| 6 | And no prompt text is listed twice in the list, even ignoring case | Compare the texts ignoring case, spacing and quotes (GEO-1219) | All n rows have different prompt texts |

#### TC-GEO-1178-010 - Engine filter shows "All" by default, then one tab per engine with its prompt count, in a fixed engine order

- **ACs:** design / requirement check | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the engine filter shows "All" by default (no count), then one tab per engine with its prompt count, in the fixed order ChatGPT, Gemini, Perplexity (QA decision). Covers the engine-filter rule (R-7). Updated 2026-10-06: GEO-1187 fixed and accepted by QA — from 3 engines each tab shows the icon and the count, the engine name is in the tooltip.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open | Source B (3 engines) | "Prompts associated with this source" is displayed |
| 2 | Then the engine filter is displayed above the prompts list |  | The filter sits between the heading and the first prompt row |
| 3 | And "All" is the first tab and is selected by default |  | "All" is the first tab, shown as the active (white) tab, with no count |
| 4 | And one tab is shown for each engine present in the prompts of source B | Engines in scope: ChatGPT, Gemini, Perplexity | Exactly 3 engine tabs follow "All" |
| 5 | And each engine tab shows the number of prompts of the list cited by that engine |  | Each engine tab shows the engine icon and its prompt count as a bare number, the engine name appears in the tooltip on hover; "All" covers the distinct prompts (counts overlap) |
| 6 | And the engine tabs are in the fixed order ChatGPT, Gemini, Perplexity, not sorted by count | QA decision | The order is "All", ChatGPT, Gemini, Perplexity (checked with the tooltips), whatever the counts |

#### TC-GEO-1178-011 - With 2 engines the tabs show icon, name and count, with 3 engines icon and count only

- **ACs:** design / requirement check | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** Verify that with 2 engines the engine tabs show the icon, the name and the count, and with 3 engines only the icon and the count (name in the tooltip). Covers the engine-filter rule (R-7). Updated 2026-10-06: compact layout from 3 engines accepted by QA in GEO-1187 (comment 858930)
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open | Source B, 3 engines | The engine filter shows "All" and 3 engine tabs |
| 2 | Then each engine tab shows the engine icon and the count only, with the engine name in the tooltip |  | [icon] cG, [icon] cM, [icon] cP with no label cut and no ellipsis; hovering a tab shows "ChatGPT", "Gemini" or "Perplexity" with its count |
| 3 | When the user opens the details panel of source E2 | Source E2 (e.g. prnewswire.com), 2 engines | The engine filter shows "All" and 2 engine tabs |
| 4 | Then each engine tab shows the engine icon, the engine name and the count in parentheses |  | [icon] "ChatGPT (N)", [icon] "Gemini (N)" (engines of E2); "All" shows no count |
| 5 | And a prompt cited by both engines shows both icons and its flag | Any prompt of E2 cited by both engines | The row shows the two engine icons and the market flag |

#### TC-GEO-1178-012 - With 4 or more engines the engine tabs still show only the icon and the count

- **ACs:** design / requirement check | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** Verify that with 4 or more engines the engine tabs still show only the icon and the count (compact layout applies from 3 engines since GEO-1187). Covers the engine-filter rule (R-7). BLOCKED BY DATA: no source with 4+ engines on the Toyota staging analysis.
- **Precondition:** An analysis with at least 4 AI engines enabled and a source cited by at least 4 of them. NOT AVAILABLE on the Toyota staging analysis (Grok and Claude disabled): TC blocked by data.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source M is open | Source M: 4 or more engines | The engine filter shows "All" and one tab per engine |
| 2 | Then each engine tab shows only the engine icon and the count |  | Each engine tab shows the icon followed by a bare number, with no engine name and no parentheses (design frame 15220:79515) |
| 3 | And the "All" tab is still displayed as "All" |  | "All" is shown as the first tab, selected, with no count |

#### TC-GEO-1178-013 - Selecting an engine tab keeps only its prompts and recalculates "Show X more prompts"

- **ACs:** AC-7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that selecting an engine tab keeps only the prompts cited by that engine and recalculates the "Show X more prompts" count. Covers AC-7.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open with the engine filter on "All" | Source B, n prompts | 6 prompt rows and "Show X more prompts" with X = n - 6 are shown |
| 2 | When the user selects the ChatGPT engine tab | ChatGPT tab count cG | The ChatGPT tab becomes the active (white) tab and "All" becomes inactive |
| 3 | Then the list only keeps the prompts cited by ChatGPT |  | Up to 6 rows are shown and each one has the ChatGPT icon |
| 4 | And the "Show X more prompts" count is recalculated for the ChatGPT tab | X = cG - 6 | "Show X more prompts" shows cG - 6 (no button when cG is 6 or less) |
| 5 | When the user clicks "Show X more prompts" |  | cG rows are listed, each with the ChatGPT icon |
| 6 | When the user selects the Perplexity engine tab | X = cP - 6 | Up to 6 rows with the Perplexity icon and "Show X more prompts" with X = cP - 6 are shown |
| 7 | When the user selects "All" again |  | 6 rows and "Show X more prompts" with X = n - 6 are shown |

#### TC-GEO-1178-014 - Engine tabs only list the engines in the AI Engines filter of the page

- **ACs:** AC-8 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the engine tabs only list the engines in the AI Engines filter of the page. Covers AC-8. Step 7 checks observed behaviour (article counts follow the scope, observed; not specified).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page with the default AI Engines filter (3 engines) | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The user notes source B and its engine tabs |
| 2 | When the user opens the details panel of source B |  | The engine filter shows "All" and the ChatGPT, Gemini and Perplexity tabs with their counts |
| 3 | When the user closes the panel and turns Gemini off in the AI Engines filter of the page | AI Engines: ChatGPT, Perplexity | The filter badge reads "AI Engines 2" and the list is recalculated |
| 4 | And the user opens the details panel of source B again |  | The panel opens with the footer "Source k of M" of the recalculated list |
| 5 | Then the engine filter only lists the engines in the current scope |  | Only "All", the ChatGPT tab and the Perplexity tab are shown, with icon, name and count (2 engines); no Gemini tab is present |
| 6 | And the prompts list only contains prompts cited by the engines in scope |  | No row shows the Gemini icon |
| 7 | And the article counts follow the scope (observed) |  | The tab counts equal the card lines of source B in the 2-engine scope, lower than or equal to the 3-engine counts |
| 8 | And the user turns Gemini back on in the AI Engines filter |  | The default AI Engines selection is restored |

#### TC-GEO-1178-015 - The prompts list shows 6 prompts before the "Show X more prompts" button

- **ACs:** AC-9 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the prompts list shows 6 prompts before the "Show X more prompts" button. Covers AC-9.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open with the engine filter on "All" | Source B, n prompts (n > 6) | The prompts section is displayed |
| 2 | Then exactly 6 prompt rows are shown |  | 6 prompt rows are visible |
| 3 | And the "Show X more prompts" button is shown under the 6th prompt | X = n - 6 | An outlined button "Show X more prompts" is centred under the 6th row |
| 4 | When the user clicks "Show X more prompts" |  | The X remaining prompts are added to the list |
| 5 | Then all the prompts are listed |  | n prompt rows are visible and the button is no longer displayed |

#### TC-GEO-1178-016 - "Show 1 more prompt" uses the singular form when one prompt remains

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the button uses the singular form "Show 1 more prompt" when one prompt remains. Covers AC-9.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution). Conditional: an engine tab G7 holding exactly 7 prompts (any source); if none is found, record "not available".

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the source holding the engine tab G7 is open | Engine tab with exactly 7 prompts | The engine filter is on "All" |
| 2 | When the user selects the engine tab G7 |  | The tab is active and 6 rows are shown |
| 3 | Then the button uses the singular form | X = 7 - 6 = 1 | "Show 1 more prompt" is shown (not "prompts") |
| 4 | When the user clicks "Show 1 more prompt" |  | 7 rows are listed, each with the icon of the selected engine |

#### TC-GEO-1178-017 - Previous / Next source rebuilds the article tabs and the engine filter for the new source

- **ACs:** AC-10 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that Previous / Next source rebuilds the article tabs and the engine filter for the new source with the same rules. Covers AC-10.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the source ranked #1 is open and it has both reasons | Source B ranked #1 (otherwise open B and use its rank k) | Both article tabs, the engine filter with its tabs and the footer "Source k of M" are shown |
| 2 | And the user selects the "Negative perception (b)" tab and the ChatGPT engine tab |  | Both tabs are active |
| 3 | When the user clicks "Next source" |  | The panel shows the next source and the footer reads "Source k+1 of M" |
| 4 | Then the article tabs are rebuilt for the new source |  | Only the tab(s) of its reasons are shown, the first one selected, with its explanation line |
| 5 | And the engine filter is rebuilt for the new source |  | The engine filter shows "All" (selected) and one tab per engine present in its prompts, with 6 rows and "Show X more prompts" recalculated |
| 6 | When the user clicks "Previous" |  | The panel shows source B again with the footer "Source k of M" |
| 7 | Then the article tabs and the engine filter are rebuilt for source B |  | "Lack of visibility (a)" is first and selected, "Negative perception (b)" is second, and the engine filter shows "All" (selected) and the 3 engine tabs |

#### TC-GEO-1178-018 - New panel strings in en-GB

- **ACs:** AC-11 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the new panel strings exist in en-GB. Covers AC-11.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is en-GB and the details panel of source B is open | Source B | The panel is displayed |
| 2 | Then the article tabs read in the language |  | "Lack of visibility (a)" and "Negative perception (b)" |
| 3 | And the explanation line of the missing tab reads in the language |  | "None of these articles mentions Toyota anywhere on the page." |
| 4 | When the user selects the negative perception tab |  | "Each of these articles mentions Toyota negatively." |
| 5 | And the default engine tab reads "All" |  | "All" |
| 6 | And the show more button uses the plural form | X remaining prompts (X > 1) | "Show X more prompts" |
| 7 | When the user selects an engine tab with exactly 7 prompts (if available) | 1 remaining | "Show 1 more prompt" (singular) |

#### TC-GEO-1178-019 - New panel strings in en-US are the same as en-GB

- **ACs:** AC-11 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the new panel strings in en-US are the same as en-GB. Covers AC-11.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution). The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is en-US and the details panel of source B is open | Source B | The panel is displayed |
| 2 | Then the article tabs read in the language |  | "Lack of visibility (a)" and "Negative perception (b)" |
| 3 | And the explanation line of the missing tab reads in the language |  | "None of these articles mentions Toyota anywhere on the page." |
| 4 | When the user selects the negative perception tab |  | "Each of these articles mentions Toyota negatively." |
| 5 | And the default engine tab reads "All" |  | "All" |
| 6 | And the show more button uses the plural form | X remaining prompts (X > 1) | "Show X more prompts" |
| 7 | When the user selects an engine tab with exactly 7 prompts (if available) | 1 remaining | "Show 1 more prompt" (singular) |
| 8 | And the user switches the app language back to en-GB | Language: en-GB | The interface is displayed in British English and the left menu shows "Action Center" |

#### TC-GEO-1178-020 - New panel strings in fr-FR

- **ACs:** AC-11 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the new panel strings exist in fr-FR and that engine names are not translated. Covers AC-11.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution). The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is fr-FR and the details panel of source B is open | Source B | The panel is displayed |
| 2 | Then the article tabs read in the language |  | "Manque de visibilité (a)" and "Perception négative (b)" |
| 3 | And the explanation line of the missing tab reads in the language |  | "Aucun de ces articles ne mentionne Toyota sur la page." |
| 4 | When the user selects the negative perception tab |  | "Chacun de ces articles mentionne Toyota de façon négative." |
| 5 | And the default engine tab reads "Tous" |  | "Tous" |
| 6 | And the show more button uses the plural form | X remaining prompts (X > 1) | "Afficher X prompts de plus" |
| 7 | When the user selects an engine tab with exactly 7 prompts (if available) | 1 remaining | "Afficher 1 prompt de plus" |
| 8 | And the engine names are not translated |  | The engine names (ChatGPT, Gemini, Perplexity) are shown unchanged in the tooltips |
| 9 | And the user switches the app language back to en-GB | Language: en-GB | The interface is displayed in British English and the left menu shows "Action Center" |

#### TC-GEO-1178-021 - New panel strings in es-ES

- **ACs:** AC-11 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify that the new panel strings exist in es-ES and that engine names are not translated. Covers AC-11.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution). The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is es-ES and the details panel of source B is open | Source B | The panel is displayed |
| 2 | Then the article tabs read in the language |  | "Falta de visibilidad (a)" and "Percepción negativa (b)" |
| 3 | And the explanation line of the missing tab reads in the language |  | "Ninguno de estos artículos menciona a Toyota en la página." |
| 4 | When the user selects the negative perception tab |  | "Cada uno de estos artículos menciona a Toyota de forma negativa." |
| 5 | And the default engine tab reads "Todos" |  | "Todos" |
| 6 | And the show more button uses the plural form | X remaining prompts (X > 1) | "Mostrar X prompts más" |
| 7 | When the user selects an engine tab with exactly 7 prompts (if available) | 1 remaining | "Mostrar 1 prompt más" |
| 8 | And the engine names are not translated |  | The engine names (ChatGPT, Gemini, Perplexity) are shown unchanged in the tooltips |
| 9 | And the user switches the app language back to en-GB | Language: en-GB | The interface is displayed in British English and the left menu shows "Action Center" |

#### TC-GEO-1178-022 - Page name reads "Action Center" in en-US everywhere it is used

- **ACs:** AC-12 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the page name reads "Action Center" in en-US everywhere it is used. Covers AC-12.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution). Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is en-US and the user is on the Toyota dashboard |  | The dashboard is displayed |
| 2 | Then the page name in the layout (left menu entry) reads "Action Center" | key layout.actionsCenter | "Action Center" is shown, not "Actions Center" |
| 3 | When the user opens the page | /actions | The Target Sources page is displayed |
| 4 | Then the page title reads "Action Center" | key views.actions.title | "Action Center" is shown, not "Actions Center" |
| 5 | And no other place on the page shows "Actions Center" |  | No breadcrumb, header or tab label shows "Actions Center" |
| 6 | And the user switches the app language back to en-GB | Language: en-GB | The interface is displayed in British English and the left menu shows "Action Center" |

#### TC-GEO-1178-023 - Page name reads "Action Center" in en-GB everywhere it is used

- **ACs:** AC-12 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the page name reads "Action Center" in en-GB everywhere it is used (same as en-US). Covers AC-12. Updated 2026-10-07 per GEO-1188 (Passed QA, QA decision 2026-10-02): en-GB reads "Action Center", not "Action Centre" as written in AC-12 (AC/app gap, accepted change).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is en-GB and the user is on the Toyota dashboard |  | The dashboard is displayed |
| 2 | Then the page name in the layout (left menu entry) reads "Action Center" | key layout.actionsCenter | "Action Center" is shown (same as en-US), not "Action Centre" nor "Actions Centre" |
| 3 | When the user opens the page | /actions | The Target Sources page is displayed |
| 4 | Then the page title reads "Action Center" | key views.actions.title | "Action Center" is shown (same as en-US), not "Action Centre" nor "Actions Centre" |
| 5 | And no other place on the page shows "Action Centre" or "Actions Centre" |  | No breadcrumb, header or tab label shows "Action Centre" or "Actions Centre" |

#### TC-GEO-1178-024 - French and Spanish page names are unchanged

- **ACs:** AC-12 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the French and Spanish page names stay "Centre d'actions" and "Centro de acciones". Covers AC-12.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution). Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is fr-FR and the user is on the Toyota dashboard |  | The dashboard is displayed in French |
| 2 | Then the page name in the layout and the page title read "Centre d'actions" |  | "Centre d'actions" is shown in both places |
| 3 | When the user switches the app language to es-ES |  | The dashboard is displayed in Spanish |
| 4 | Then the page name in the layout and the page title read "Centro de acciones" |  | "Centro de acciones" is shown in both places |
| 5 | And the user switches the app language back to en-GB | Language: en-GB | The interface is displayed in British English and the left menu shows "Action Center" |

#### TC-GEO-1178-025 - English PPT export slide header reads "ACTION CENTER · TARGET SOURCES" in en-US and en-GB

- **ACs:** AC-13 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify the English PPT export slide header: "ACTION CENTER · TARGET SOURCES" in en-US and en-GB (one English string, as per ticket). Covers AC-13.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution). Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is en-US and the user is on the Target Sources page |  | The page is displayed |
| 2 | When the user exports the analysis in PPT format | Export format: PPT | The PPT file is downloaded |
| 3 | Then the Target Sources slide header reads "ACTION CENTER · TARGET SOURCES" |  | "ACTION CENTER · TARGET SOURCES" is shown and "ACTIONS · TARGET SOURCES" is not |
| 4 | When the user switches the app language to en-GB and exports in PPT again | Export format: PPT | The PPT file is downloaded |
| 5 | Then the Target Sources slide header reads "ACTION CENTER · TARGET SOURCES" | One English string for en-GB and en-US (ticket) | Same English string as in en-US: "ACTION CENTER · TARGET SOURCES" (not "ACTION CENTRE", not "ACTIONS") |

#### TC-GEO-1178-026 - English PDF export slide header reads "ACTION CENTER · TARGET SOURCES" in en-US and en-GB

- **ACs:** AC-13 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify the English PDF export slide header: "ACTION CENTER · TARGET SOURCES" in en-US and en-GB (one English string, as per ticket). Covers AC-13.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution). Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is en-US and the user is on the Target Sources page |  | The page is displayed |
| 2 | When the user exports the analysis in PDF format | Export format: PDF | The PDF file is downloaded |
| 3 | Then the Target Sources page header reads "ACTION CENTER · TARGET SOURCES" |  | "ACTION CENTER · TARGET SOURCES" is shown and "ACTIONS · TARGET SOURCES" is not |
| 4 | When the user switches the app language to en-GB and exports in PDF again | Export format: PDF | The PDF file is downloaded |
| 5 | Then the Target Sources page header reads "ACTION CENTER · TARGET SOURCES" | One English string for en-GB and en-US (ticket) | Same English string as in en-US: "ACTION CENTER · TARGET SOURCES" (not "ACTION CENTRE", not "ACTIONS") |

#### TC-GEO-1178-027 - No export shows "Actions Center" or "Actions Centre"

- **ACs:** AC-13 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that none of the exports (PPT, PDF, Excel) shows "Actions Center" or "Actions Centre". Covers AC-13.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution). Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is en-GB and the user is on the Target Sources page |  | The page is displayed |
| 2 | When the user exports the analysis in PPT, PDF and Excel formats | Formats: PPT, PDF, Excel | The 3 files are downloaded |
| 3 | Then a text search in each file finds neither "Actions Center" nor "Actions Centre" | Search terms: "Actions Center", "Actions Centre" (case-insensitive) | 0 matches in the PPT, PDF and Excel files |
| 4 | When the user switches the app language to en-US and exports again in the 3 formats |  | The 3 files are downloaded |
| 5 | Then a text search in each file finds neither "Actions Center" nor "Actions Centre" |  | 0 matches in the PPT, PDF and Excel files |
| 6 | And the user switches the app language back to en-GB | Language: en-GB | The interface is displayed in British English and the left menu shows "Action Center" |

#### TC-GEO-1178-028 - French and Spanish PPT/PDF headers keep "ACTIONS" and "ACCIONES"

- **ACs:** design / requirement check | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the French and Spanish PPT/PDF slide headers keep "ACTIONS" and "ACCIONES". Covers the export-header rule (R-10).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution). Exports are made with the export icon of the analysis toolbar ("Export analysis as": "PDF", "Presentation .pptx", "Spreadsheet .xls") and checked by opening the downloaded file (PPTX/XLSX read from their XML parts; the PDF has no text layer, so its pages are rendered and read visually). On 2026-10-06 the Toyota deck had 41 slides/pages with Action Center · Target Sources last. The test changes the saved interface language (Settings > Preferences > Interface Language, "Save changes") and restores British English at the end.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the app language is fr-FR and the user is on the Target Sources page |  | The page is displayed in French |
| 2 | When the user exports the analysis in PPT and PDF formats |  | Both files are downloaded |
| 3 | Then the Target Sources slide header starts with "ACTIONS" | section.actions FR | The header reads "ACTIONS · SOURCES À CIBLER" (unchanged) in both files |
| 4 | When the user switches the app language to es-ES and exports in PPT and PDF |  | Both files are downloaded |
| 5 | Then the Target Sources slide header starts with "ACCIONES" | section.actions ES | The header reads "ACCIONES · FUENTES A PRIORIZAR" (unchanged) in both files |
| 6 | And the user switches the app language back to en-GB | Language: en-GB | The interface is displayed in British English |

#### TC-GEO-1178-029 - New keys exist in the four locales and the old panel keys are no longer used

- **ACs:** AC-11 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** Verify by static review that the new keys exist in the four locales and that the keys no longer used are not referenced. Supports AC-11 (R-11). en-GB page-name keys expected "Action Center" per GEO-1188 (Passed QA).
- **Precondition:** Read access to the frontend locale files (en-GB, en-US, fr-FR, es-ES) and ExportI18n of the GEO-1178 build.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the four locale files of the GEO-1178 build are open | en-GB, en-US, fr-FR, es-ES | The files are readable |
| 2 | Then the new keys exist in each locale with the strings of the ticket | panel.lackOfVisibilityTab, panel.negativePerceptionTab, panel.lackOfVisibilityIntro, panel.negativePerceptionIntro, panel.allEngines | Each key is present in the 4 files with the EN/FR/ES string of the Translations table (en-US = en-GB) |
| 3 | And views.actions.title and layout.actionsCenter have the new English values | GEO-1188 | en-US "Action Center", en-GB "Action Center", fr-FR "Centre d'actions", es-ES "Centro de acciones" |
| 4 | And section.actions in ExportI18n has the new English value |  | EN "ACTION CENTER" (one string for en-GB and en-US, as per ticket), FR "ACTIONS", ES "ACCIONES" |
| 5 | And the keys no longer used are not referenced by the panel | panel.missingTab, panel.negativeTab, panel.noMention, panel.describesNegatively | No UI code references these keys (whether they must also be deleted from the locale files is an open point) |

#### TC-GEO-1178-030 - [Figma] No "Show more prompts" button when the tab has 6 prompts or fewer

- **ACs:** AC-9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** [Figma] Verify that no "Show X more prompts" button is shown when the tab has 6 prompts or fewer. Covers AC-9 (boundary).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source S6 is open with the engine filter on "All" | Source S6 (e.g. youtube.com), exactly 6 prompts | The engine filter shows "All" and its engine tabs, and 6 prompt rows are listed |
| 2 | Then no show-more button is displayed | Boundary: exactly 6 | No "Show X more prompts" button is shown under the list |
| 3 | When the user selects an engine tab of S6 holding fewer than 6 prompts |  | Fewer than 6 prompt rows are listed, each with the icon of that engine |
| 4 | Then no show-more button is displayed | Fewer than 6 | No "Show X more prompts" button is shown under the list |

#### TC-GEO-1178-031 - [Figma] Panel footer shows "Previous", the "Source k of M" counter and "Next source", with Previous disabled on the first source

- **ACs:** AC-10 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** [Figma] Verify that the panel footer shows "Previous", the "Source k of M" counter and "Next source", with Previous disabled on the first source. Supports AC-10.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of the source ranked #1 is open | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The panel header reads "#1 · {domain}" |
| 2 | Then the footer shows the navigation controls | M = total target sources | The footer shows "Previous", "Source 1 of M" and "Next source" with a right chevron |
| 3 | And the "Previous" button is disabled |  | "Previous" is greyed out and clicking it does nothing |
| 4 | When the user clicks "Next source" |  | The panel shows "#2 · {domain of card 2}" and the footer reads "Source 2 of M" |
| 5 | Then the "Previous" button is enabled |  | "Previous" is active |

#### TC-GEO-1178-032 - [Figma] Panel header shows rank · domain, type chip and reason badges

- **ACs:** design / requirement check | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** [Figma] Verify that the panel header shows "#rank · domain", the type chip and the reason badges. Design check, no numbered AC.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open | Source B (e.g. frandroid.com, Journalism) | The panel header is displayed with a close (×) icon |
| 2 | Then the header shows the source logo or favicon and "#k · {domain}" |  | "#k · {domain of B}" |
| 3 | And the header shows the type chip of the source |  | The type of B (e.g. "Journalism") |
| 4 | And the header shows the reason badges of the source |  | The "Improve visibility" and "Improve perception" badges are shown inline |

#### TC-GEO-1178-033 - [Figma] Details panel opened from the list view shows the same tabs and prompts

- **ACs:** AC-3 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy
- **Description:** [Figma] Verify that the details panel opened from the list view shows the same article tabs and prompts section as from the card view. Supports AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Target Sources page in list view | https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions - period "Last 7 days" | The Target Sources table is displayed with source B in its row |
| 2 | When the user clicks the row of source B |  | The details panel of source B opens over the table and the row is highlighted |
| 3 | Then the article tabs are the same as from the card view |  | "Lack of visibility (a)" (selected) and "Negative perception (b)" are shown with "None of these articles mentions Toyota anywhere on the page." |
| 4 | And the prompts section is the same as from the card view |  | "Prompts associated with this source", "All" and the engine tabs with the same counts, 6 rows and the same "Show X more prompts" |

#### TC-GEO-1178-034 - [Figma] Selected state of the article tabs, engine tabs and coloured explanation lines

- **ACs:** design / requirement check | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** [Figma] Verify the selected state of the article tabs and engine tabs and the colour and icon of the explanation lines. Design check, no numbered AC.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of source B is open | Source B | "Lack of visibility (a)" is selected |
| 2 | Then the selected article tab is highlighted |  | "Lack of visibility (a)" is a white segment with a blue eye-off icon and text; "Negative perception (b)" is grey |
| 3 | And the explanation line uses the colour and icon of its tab |  | "None of these articles mentions Toyota anywhere on the page." is blue with the eye-off icon |
| 4 | When the user selects the "Negative perception (b)" tab |  | "Negative perception (b)" becomes the white segment and "Lack of visibility (a)" turns grey |
| 5 | Then the explanation line uses the colour and icon of its tab |  | "Each of these articles mentions Toyota negatively." is purple with the thumb-down icon |
| 6 | When the user selects the Gemini engine tab |  | The Gemini tab becomes a white tab with the coloured Gemini icon and "All" becomes grey |

#### TC-GEO-1178-035 - With a single engine the filter shows "All" and one engine tab with icon, name and count

- **ACs:** design / requirement check | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** Verify that with a single engine the filter shows "All" and one engine tab with icon, name and count. Updated 2026-10-07 per GEO-1187 (accepted 2026-10-06): with 1 or 2 engines the tab shows icon, name and count. Supports the engine-filter rule (R-7).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language British English (en-GB), organisation switcher set to "QA-GEO". Toyota analysis 439acd96-0b1b-4da4-9e07-612d38e9783e, Action Center https://staging-geo.onclusive.com/geo/dashboard/439acd96-0b1b-4da4-9e07-612d38e9783e/actions, period "Last 7 days" (a date preset applies only after clicking "Apply"), AI Engines and countries left at their defaults, card view, ALL tab. Ranks, counts and listed sources roll with the window and must be read at execution time: expected results check relations, not fixed values. Reference sources, read at execution (ranks and counts roll with the window): B = a source with both reasons and prompts from 3 engines (e.g. frandroid.com: a missing, b negative articles, n prompts, engine tab counts cG / cM / cP for ChatGPT / Gemini / Perplexity), V = a source with missing articles only (e.g. zonebourse.com, v articles), P = a source with negative articles only (e.g. trustpilot.com, p articles), E2 = a source whose prompts come from exactly 2 engines (e.g. prnewswire.com), S6 = a source with exactly 6 prompts (e.g. youtube.com), G7 = an engine tab holding exactly 7 prompts (found at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the details panel of a source whose prompts come from a single engine is open | Source V (e.g. zonebourse.com) if single-engine, otherwise any single-engine source | The prompts section is displayed |
| 2 | Then the engine filter is still displayed |  | The filter shows "All" (selected, no count) and one engine tab "{Engine} (N)" with its icon |
| 3 | And the prompts list shows 6 rows and the show-more button | X = N - 6 | 6 rows with the engine icon and "Show X more prompts" (no button when N is 6 or less) |
| 4 | When the user selects the engine tab |  | The same rows and the same "Show X more prompts" are shown |

