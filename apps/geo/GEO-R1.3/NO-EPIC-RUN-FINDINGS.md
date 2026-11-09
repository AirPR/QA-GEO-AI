# GEO-R1.3 — Run findings, tickets without epic (GEO-1220, GEO-1514)

Tickets in fixVersion 1.3 with no epic parent yet (PO / dev to say which epic). Local files: `apps/geo/GEO-R1.3/NO-EPIC/`.
CSVs: `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-storyGEO-1220.csv`, `testcases-coverage-storyGEO-1514.csv`.

## 1. GEO-1514 — MCP run 28/10/2026 (staging, QA-GEO, en-GB / fr-FR / es-ES, en-GB restored)

Report: `runs/28102026-1427/MCP-Report-NO-EPIC-GEO-1514-mcp.html` — 4 PASS, 3 FAIL, 1 PARTIAL, 2 SKIP (NO-GO 56.3 %).
The 27/10 observation (Add category modal says "market") is no longer reproduced.

| # | TC | Finding | Evidence | Decision (recommended) |
|---|---|---|---|---|
| F-01 | TC-GEO-1514-010 step 5 | Manage Scope "What stops from the next run" dialogs still say "market" in en-GB: "For this category and market, …" (5 sibling texts `views.manageScope.prompts.stopWarning.*`), and FR / ES "Pour cette catégorie et ce marché" / "Para esta categoría y este mercado". Keys not listed in the ticket, but the ticket says "country everywhere". | `TC-GEO-1514-010` step 5 screenshot | **POSTED 2026-10-28** (comment 869483 on GEO-1514, Youssef tagged), GEO-1514 → Action Needed; **FIXED 2026-10-29** (retest `runs/29102026-0929`, bundle index-Bz4-PVcj.js, en-GB / fr-FR / es-ES, new keys stopWarning.groupMetrics.*) |
| F-02 | TC-GEO-1514-008 | PPTX cover with the country filter on all countries lists the countries ("United States", "France", "Spain") instead of "All Countries". `cover.allMarkets` is "unchanged" in the ticket; when it is used is not described. | `TC-GEO-1514-008_step3_then.png` | **ASKED 2026-10-28** in comment 869483, no answer; retest 29/10 unchanged (cover lists the selected countries in every case, names in English on FR / ES covers) |
| F-03 | TC-GEO-1514-005 step 4 | Untick all prompts but one then remove the category → "60 prompts across your countries…": the count includes unticked prompts (same rule as GEO-1501). The `_one` wording is right in the 3 languages when reached by deleting prompts. | run notes | **DONE**: CSV step 4 aligned (delete with trash icon); rerun 28/10 (`runs/28102026-1535`) PASS in the 3 languages |
| F-04 | TC-GEO-1514-007, 010 step 6 | Upsell page `/geo/upsell` redirects the QA account; needs the PQL account. CSV account fixed to `+pql` (as in `.env`). | — | **RERUN 28/10**: 007 PARTIAL (PQL account saved in en-US and cannot change language: /settings redirects, PATCH ui-language 401; "Country" column only in the gated Competitive table); 010 step 6 PARTIAL (0 "market" hit in en-US) — to triage |
| F-05 | side | FR / ES: country names stay in English in the wizard Summary and the Add category modal ("United Kingdom · English", "Spain"). Not in GEO-1514 scope. | run notes | Not posted (to triage) |
| F-06 | TC-GEO-1514-001, 004 | translateFailed cannot be triggered without dev help; analysis created screen needs analysis creation. | — | translateFailed stays SKIP; TC-004 PARTIAL on 28/10: one disposable analysis (Decathlon d3fd9ff4, GB + FR, 5 prompts) shows "5 prompts across 2 countries and 1 category…", then deleted (13 analyses, pool 1040/1100 restored); other variants SKIP |

- **2026-10-29 (GEO-1514):** dev answer 870121 — F-02 by design (the PPTX COUNTRIES card lists the countries of the deck; cover.allMarkets is a never-shown fallback). TC-GEO-1514-008 aligned and requalified PASS; new consolidated `runs/GEO-R1.3_GEO-1514_29102026-1814` (GO 80 %, 0 FAIL). Reply 870151. F-05 (country names in English in FR / ES exports) → **BUG CREATED 2026-10-29: GEO-1575** (Low, Exists in Production, fixVersion 1.4, Youssef, To Do, Relates GEO-1514).

## 2. GEO-1220 — prerequisites

- `/auth/me` on staging (28/10): `role: "SUPER_ADMIN"` for assiya.benramdane@onclusive.com → the QA account is the admin account (user, 28/10).
- Open: test domain for PUT / DELETE (global override), EDITOR / READER sessions for AC7, trustpilot.com window for AC2 / AC2b.

## 3. GEO-1220 — read-only API run 28/10/2026 (staging, QA-GEO, SUPER_ADMIN)

Report: `runs/28102026-1546/MCP-Report-NO-EPIC-GEO-1220-mcp.html` — 7 TCs run: 4 PASS, 1 FAIL, 2 PARTIAL; 13 SKIP (writes pending). Staging: 0 override row, 60,065 cache rows before and after (nothing changed).

| # | TC | Finding | Evidence | Decision (recommended) |
|---|---|---|---|---|
| F-07 | TC-GEO-1220-015 | `youtube.com%2F%40X` returns the server's HTML "HTTP Status 400 – Bad Request", not the API JSON `VALIDATION_ERROR` (the other 6 non-canonical domains give the expected JSON 400). The call is rejected, so "not supported" holds. | `TC-GEO-1220-015_step3_then_youtube.png` | **DECIDED 2026-10-29 (user):** TC aligned (any 400 body), TC-015 requalified PASS |
| F-08 | TC-GEO-1220-018 | Gemini rows omit `overriddenBy`, `overriddenAt`, `reason` (no null fields). Override fields not checkable (no override row). | run notes | Recheck after the first valid PUT |
| F-09 | TC-GEO-1220-001, 012, 013 | No ADMIN / EDITOR / READER account on staging for AC7. | — | Ask Youssef for accounts; 012 / 013 SKIP |
| F-10 | write TCs | Candidate test domains: `cyclingelectric.com` (JOURNALISM, GEMINI, only "Electric bikes" 42c3ab89, daily run); fallback `monjouet.ma`, `ebikegeek.co.uk`. Regex domain for AC2 / AC2b instead of trustpilot.com: `capterra.com` (1 analysis) — regional subdomain to confirm with the dev. | run notes | User approval before any valid PUT |
| F-11 | side | Old non-canonical rows still in the cache (e.g. `https://fr.trustpilot.com/review/…`, REVIEW_SITES, May 2026). | run notes | Not posted (to triage) |

## 4. GEO-1220 — AC7 and write runs 28/10/2026 (domains approved by the user: cyclingelectric.com, capterra.com)

Reports: `runs/28102026-1602/MCP-Report-NO-EPIC-GEO-1220-rerun-ac7-mcp.html` (AC7, invalid body) and `runs/28102026-1614/MCP-Report-NO-EPIC-GEO-1220-rerun-writes-mcp.html` (writes): 0 FAIL — 013, 018, 006 PASS; 008, 005 PARTIAL (dev evidence steps); 002, 003, 007, 010 IN PROGRESS; 004, 009, 012, 017, 020 SKIP.

| # | TC | Finding | Evidence | Decision (recommended) |
|---|---|---|---|---|
| F-12 | TC-GEO-1220-013 | EDITOR (+geo) and READER (+os, org Onclusive) get 403 on GET, DELETE and a valid PUT; with an INVALID PUT body they get 400 VALIDATION_ERROR (body validated before the role). No write possible. | `TC-GEO-1220-013_step3_editor_put.png` (run 1602) | TC-013 PASS; validation-before-authorisation not posted (to triage, Low) |
| F-13 | TC-GEO-1220-005 / 006 | applyToHistory=true updated 27 rows; dashboard, XLSX and PPTX showed Review Sites at once; replay = 0 rows; history restored to JOURNALISM (27 rows), Electric bikes back to baseline (Journalism 21 / Review Sites 5 URLs). Replay refreshes `overriddenAt` / `updatedAt`. | run 1614 screenshots | OK; timestamp refresh not posted |
| F-14 | TC-GEO-1220-003 | PUT capterra.com (regex domain, no cache row) answers without `previousSourceType`. | run 1614 | Ask with the next GEO-1220 comment (OP-10) |

**Overrides left on staging until the check of 29/10 (then DELETE → 204, GET absent, DELETE again → 404):**
- `cyclingelectric.com` → REVIEW_SITES, applyToHistory=false (16:14Z) — check after the Electric bikes (42c3ab89) run, about 28/10 22:20 UTC (AC1, AC4 next-run part).
- `capterra.com` → SOCIAL_UGC, applyToHistory=false (16:14Z) — check after the Lictorix Geo (f228f1fe) run, about 29/10 15:50 UTC (AC2).
- **2026-10-28:** run of Electric bikes + Lictorix Geo and backend logs (AC1, AC8d) asked to Youssef, GEO-1220 comment 869527.
- **2026-10-29:** GEO-1514 retest posted (comment 869841, Youssef tagged on point 2); status kept QA In Progress until his answer. Incident: 7 bike suggestions ticked by the header checkbox at ~16:45 UTC 28/10 and unticked at once (44 kept prompts, pool 1040/1100 restored) — use "Selected only" before the header checkbox.

- **2026-10-29 (run `runs/29102026-0952/MCP-Report-NO-EPIC-GEO-1220-check-20261029.html`):** dev runs of 28/10 ~21:39 UTC (comment 869634): Electric bikes snapshot 08141e91, Lictorix Geo snapshot c4b2a494. **TC-002 (AC1), TC-003 (AC2), TC-007 (AC4) PASS** (dashboard, API, XLSX; days before keep their old type), cleanup steps pending. **TC-008 → PASS** (missing step covered by the dev log, 869634). TC-005 stays PARTIAL (needs dev confirmation that the 27 rows cover every organisation). AC8d: both PUTs replayed identically at 2026-10-29 09:50:04.414985Z (cyclingelectric.com) and 09:50:04.558020Z (capterra.com), 200, historyRowsUpdated 0; audit lines asked to Youssef (threaded reply 869859). Overrides kept until the audit lines are shared, then DELETE (TC-010 / 011 / 017). AC10 (TC-020): prod CNP fix applied by the dev on 28/10 (comment 869635), check after the 1.3 production deploy.

| # | TC | Finding | Evidence | Decision (recommended) |
|---|---|---|---|---|
| F-15 | TC-GEO-1220-003 | Lictorix XLSX of 28/10: the Target Sources sheet still lists capterra.com as Review Sites while the rest of the export shows Social / UGC | run 29102026-0952 notes | TO TRIAGE (no TC covers that sheet) |

- **2026-10-29 (production, after the 1.3 deploy, run `runs/29102026-1014/MCP-Report-PROD-R13-postdeploy-20261029.html`, read-only):** TC-GEO-1220-020 (AC10) **PARTIAL** — GET source-classifications?domain=opinion-assurances.fr = REVIEW_SITES, origin OVERRIDE, overriddenBy ops-script, overriddenAt 2026-10-28T22:03:48Z, reason "CNP Assurances Q&A 2026-10-05" (= dev comment 869635); the CNP dashboard step is not checked (no CNP analysis in QA-GEO, no organisation switch); asked to Youssef (threaded reply 869872). Same run: TC-GEO-1515-003 PASS (91 / 91 organisations match the 28/10 prod review list), R1.3 smoke PASS (wizard 5 steps + pool, Unbranded card, custom brand website + logo, GEO-1068 concepts); GEO-1184 Target Sources SKIP in prod (no verified sources yet on Toyota / Bosch) — recheck later.

- **2026-10-29 afternoon:** dev comments 869892 (AC10 verified on the data side in prod: 4,271 CNP rows REVIEW_SITES) and 870047 (AC8d SET audit lines found in Loki, cleanup allowed). User decisions: TC-015 aligned (any 400) → PASS; TC-012 (no plain ADMIN account) and TC-004 (no lite run on a capterra regional subdomain) accepted as justified SKIP; TC-001 requalified PASS (AC7 part covered by TC-013). Cleanup run `runs/29102026-1535`: DELETE cyclingelectric.com / capterra.com 204 at 15:33:48Z, second DELETE 404 NO_OVERRIDE, ?overridden=true = 0 rows; TC-010 IN PROGRESS / TC-011 PARTIAL until the next runs (capterra.com back to regex, cyclingelectric.com rewritten by Gemini). Asked Youssef (threaded reply 870084): action=DELETE lines (TC-017), 27-row scope (TC-005), Gemini-path evidence (TC-009). 28/10 dev-run rows (cyclingelectric.com REVIEW_SITES 7 sources, capterra.com SOCIAL_UGC 24 sources) KEPT as is (user decision 2026-10-29: two QA-GEO test analyses, one day; no restore cycle). TC-010 restore step: N/A.

- **2026-11-03:** next-run check `runs/03112026-1039` (TC-010 PASS with the 28/10 rows kept, TC-011 PASS, TC-009 PARTIAL). Dev 870110: TC-005 and TC-017 (action=REMOVE) closed. Consolidated `runs/GEO-R1.3_GEO-1220_03112026-1041` GO 97.2 %. GEO-1220 promoted and moved to Done; TC-009 (backend-only Gemini log + cache purge proof) **accepted as an exception, user decision 2026-11-03** — evidence asked as a confirmation only (871987, 872000).
