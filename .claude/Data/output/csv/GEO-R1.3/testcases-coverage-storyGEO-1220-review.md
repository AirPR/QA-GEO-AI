# GEO-1220 [GEO-Administration] API endpoint to override the source type of a domain — story test case review (GEO-R1.3, generated 2026-10-28)

**Sources (read-only):** Jira GEO-1220 (Story, Ready for QA, fixVersion 1.3, assignee Youssef.AitLaydi, reporter Quentin.Reant, no comment, no issue link), read on 2026-10-28 and saved as `apps/geo/GEO-R1.3/NO-EPIC/STORY_GEO-1220_API_endpoint_to_override_the_source_type.md`. Tech spec linked from the ticket (tech-spec-geo-1220-source-classification-override.md) not read. Mode: story only, no `--figma`.

**Scope:** API-only back-office story. **The endpoint ACs are the feature and are not filtered as technical.** Source = the section "Acceptance Criteria (refined in the tech spec — functional, for QA)": AC1, AC2, AC2b, AC3, AC3b, AC4, AC4b, AC5, AC6, AC6b, AC7, AC8, AC8b, AC8c, AC8d, AC9, AC10 (17 ACs). The earlier "Acceptance Criteria" list (AC1–AC8) is superseded and not used. **Out of Scope respected:** no back-office screen, no per-organisation override, no client self-service. **No epic parent yet** (see `apps/geo/GEO-R1.3/NO-EPIC/README.md`).

**CSV:** `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-storyGEO-1220.csv` — 20 TCs, 118 step rows (+1 header), 16 columns, `;` separator, fields quoted with doubled quotes when they hold `;` or `"`, UTF-8 without BOM, LF. One Cucumber step per row; case-level fields on the first row of each TC only. **QA Parent empty** (no epic parent yet — set it when the PO / dev names the epic), QA Story/Task = GEO-1220, Components = GEO, QA Component = GEO Module, Labels empty, Test Type = Manual, QA Regression = Yes for Urgent/High. Not imported to Quality Plus, nothing written to Jira.

## Summary

| Metric | Value |
|---|---|
| Test cases | 20 |
| Steps (CSV rows) | 118 |
| Coverage | happy 9 · edge 2 · error 6 · state 3 |
| Priority | Urgent 0 · High 10 · Medium 10 · Low 0 |
| UI / Functional | UI 0 · Functional 20 |
| Smoke = Yes | 2 |
| QA Regression = Yes | 10 |
| AC coverage | 17 / 17 refined ACs (+ 1 prerequisite TC for the roles) |

| Ticket | Type | Jira status | ACs | TCs | Steps | Smoke | Happy | Edge | Error | State |
|---|---|---|---|---|---|---|---|---|---|---|
| GEO-1220 | Story | Ready for QA | 17 | 20 | 118 | 2 | 9 | 2 | 6 | 3 |

## Test data

| Ref | Description | Used by |
|---|---|---|
| API | `https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications` (GET search, PUT `/{domain}`, DELETE `/{domain}/override`) | all |
| ME | `GET https://staging-geo.onclusive.com/geo/api/v1/auth/me` — role of the logged-in account | 001, 012, 013 |
| {D} | Dedicated test domain agreed with QA: canonical root domain, in the cache with origin GEMINI, no override, cited by analysis A — **to be chosen (OP-1)** | 002, 005–012, 014, 016–018 |
| T0 | Current sourceType of {D}, read with the GET at the start of each TC; used to restore the history | idem |
| {G} | Root domain with origin GEMINI and sourceType JOURNALISM (may be {D}) | 008 |
| {P} | Part of {D} for the search (e.g. first 6 letters) | 018 |
| A | QA-GEO analysis citing {D}, daily run — **to be chosen with {D}** | 002, 005, 007, 010 |
| B | QA-GEO analysis citing trustpilot.com, daily run | 003 |
| PQL | assiya.benramdane+geo@onclusive.com (Lite plan) for the lite analysis citing fr.trustpilot.com | 004 |
| Accounts | QA account (SUPER_ADMIN, to confirm), one ADMIN, one EDITOR, one READER account on staging — **to be provided (OP-2, OP-3)** | 001, 012, 013 |

UI labels used for the dashboard checks: REVIEW_SITES = "Review Sites", SOCIAL_UGC = "Social / UGC", JOURNALISM = "Journalism" (en-GB i18n `dashboard.sources.typeLabels.*`).

**Prerequisite in every write TC:** the account is SUPER_ADMIN (TC-GEO-1220-001 first). An override is **GLOBAL** (every organisation on staging): only the agreed test domain is changed, and each write TC ends with the cleanup — PUT T0 with `applyToHistory = true` when the history or a run stored a new type, then DELETE `/override` (204). Note that DELETE alone never restores past rows (AC6), hence the restore PUT before it.

## AC inventory and traceability

### GEO-1220 — API endpoint to override the source type of a domain (Story, Ready for QA)

| AC | Label | TC(s) | QA verifiable |
|---|---|---|---|
| — | Prerequisite: SUPER_ADMIN role, AC7 accounts | GEO-1220-001 | yes |
| AC1 | Override applies to every future run, no Gemini call | GEO-1220-002 | partly — "no Gemini call" needs dev evidence (logs/DB) |
| AC2 | Override beats the regex (trustpilot.com → SOCIAL_UGC) | GEO-1220-003 | yes (global change, OP-4) |
| AC2b | Override applies to fr.trustpilot.com in a lite analysis, domain shown unchanged | GEO-1220-004 | yes (data dependent) |
| AC3 | applyToHistory = true: historyRowsUpdated, previousSourceType, charts and XLSX / PPTX show the new type | GEO-1220-005 | partly — "every row in every organisation" needs dev evidence (logs/DB) |
| AC3b | Replayed PUT → 200, historyRowsUpdated = 0 | GEO-1220-006 | yes |
| AC4 | applyToHistory = false: history untouched, only future runs | GEO-1220-007 | yes |
| AC4b | PUT of the Gemini type turns the row into OVERRIDE | GEO-1220-008 | partly — "Gemini can no longer change it" needs dev evidence |
| AC5 | Override survives Gemini reclassification and purges | GEO-1220-009 | **NOT VERIFIABLE BY QA** (job / purge, logs/DB) — GET before / after only |
| AC6 | DELETE → 204, gone from GET, past rows unchanged, Gemini writes back origin GEMINI | GEO-1220-010 | yes |
| AC6b | DELETE without override → 404 NO_OVERRIDE, Gemini row intact | GEO-1220-011 | yes |
| AC7 | 403 ACCESS_DENIED for ADMIN on PUT / DELETE, ADMIN GET allowed; EDITOR / READER 403 on GET too | GEO-1220-012 (ADMIN), 013 (EDITOR, READER) | yes, if the accounts exist (OP-2, OP-3) |
| AC8 | Unknown sourceType → 400 VALIDATION_ERROR listing the 9 types | GEO-1220-014 | yes |
| AC8b | Non-canonical domain → 400 with expected form; YouTube channels not supported | GEO-1220-015 | yes |
| AC8c | Missing reason / applyToHistory → 400 | GEO-1220-016 | yes |
| AC8d | [SOURCE_CLASSIFICATION_OVERRIDE] audit log line | GEO-1220-017 | **NOT VERIFIABLE BY QA** (server logs) |
| AC9 | Paginated search with filters and documented fields; size > 100 or unknown type → 400 | GEO-1220-018, 019 | yes |
| AC10 | Prod script for opinion-assurances.fr, GET shows OVERRIDE / ops-script | GEO-1220-020 | **NOT VERIFIABLE BY QA** (prod script, CNP org) — prod GET only if QA has rights (OP-8) |

Every AC has at least one dedicated TC; no two ACs are merged into one TC.

## Not verifiable by QA (logs / DB only) — TCs written, flagged "needs dev evidence (logs/DB)"

| TC | Part needing dev evidence |
|---|---|
| TC-GEO-1220-002 step 6 | AC1 "no Gemini call is made for this domain" — classifier logs of the run |
| TC-GEO-1220-005 step 6 | AC3 "every non-deleted row of the domain in every organisation" — DB count of response_sources |
| TC-GEO-1220-008 step 4 | AC4b "Gemini can no longer change it" — same evidence as AC5 |
| TC-GEO-1220-009 steps 3–4 | AC5 Gemini reclassification and purge (`origin <> 'OVERRIDE'`) triggered by job / migration |
| TC-GEO-1220-017 steps 3–4 | AC8d audit log line |
| TC-GEO-1220-020 steps 1–2 | AC10 prod script run and CNP reports (customer organisation) |

## Ambiguous points and open questions (flagged, not guessed)

- **OP-1 Test domain:** which domain is the dedicated test domain {D} (and analysis A that cites it)? It must be a canonical root domain, origin GEMINI, not regex, cited by a QA-GEO analysis with a daily run. To agree with QA / dev before the run. Every write TC is blocked until then.
- **OP-2 SUPER_ADMIN on staging:** does the QA account assiya.benramdane@onclusive.com have the SUPER_ADMIN role on staging (it has back-office access — enough for ADMIN, not proven for SUPER_ADMIN)? TC-GEO-1220-001 checks it; also needed: an ADMIN account that is not SUPER_ADMIN (AC7).
- **OP-3 Non-admin token for AC7:** how to get an EDITOR and a READER session on staging (existing accounts, invited users in QA-GEO, or a token given by the dev)? TC-GEO-1220-013 is blocked until then.
- **OP-4 Global change on trustpilot.com (AC2, AC2b):** the AC example overrides trustpilot.com, which every analysis on staging may cite. Agree with QA / dev on the time window (one run) or on another regex-listed domain; restore REVIEW_SITES on the history and DELETE at the end.
- **OP-5 Auth for API calls:** the ticket does not say whether the admin API takes the session cookie or a Bearer token. The TCs say "the logged-in staging session"; to confirm with the dev.
- **OP-6 Multi-pod cache (AC3):** the refresh is guaranteed only "on the pod that served the call". If staging runs several pods, a reload served by another pod may show the old type until the cache expires — record the time; not a bug by the AC.
- **OP-7 DELETE audit values (AC8d):** which "new type" and "reason" a DELETE log line holds is not stated.
- **OP-8 AC10 in prod:** QA has no access to the CNP Assurances organisation; whether the QA account may call the prod GET (ADMIN rights in prod) is unknown. Otherwise AC10 is evidenced by the dev / Support only.
- **OP-9 The 9 allowed types:** the ticket says the message lists 9 types but does not list them (the QA oracle file knows 10 UI labels: Journalism, Competitor Media, Aggregators / Encyclopedic, Social / UGC, Owned Media, Academic, Review Sites, Other, Corporate, Press Release). TC-GEO-1220-014 records the list.
- **OP-10 Regex row in the GET (AC2):** "regex results are never stored", so the PUT on trustpilot.com may return a null previousSourceType; not asserted.
- **OP-11 Dashboard type of a domain over mixed history:** when the period mixes old and new types, which type the Citation Sources show is not stated; the TCs use a period of the run day only for new-run checks.

## Technical content filtered

- Endpoint ACs: **not filtered** (they are the feature, as instructed).
- "Technical notes" of the original section (Flyway columns, level-2 lookup order, domain normalisation, aggregate tables, integration test) and the "Immediate step" SQL: no TC of their own; their visible effects are covered by AC2b (normalisation), AC3 (aggregates refreshed) and AC10 (immediate fix).
- Original "Acceptance Criteria" AC1–AC8: superseded by the refined list, not used.

## TCs that need special setup

- **Next daily run:** TC-GEO-1220-002, 003, 007, 010 span one run of A / B (results the day after).
- **Dev on hand:** 002 (step 6), 005 (step 6), 008 (step 4), 009, 017, 020.
- **Other accounts:** 004 (PQL), 012 (ADMIN), 013 (EDITOR, READER).
- **Exports:** 005 and 007 download XLSX / PPTX.
- **Cleanup:** every write TC ends with restore PUT (if needed) + DELETE; check `GET ?overridden=true` is back to its initial content after the campaign.

## Test cases

### GEO-1220 — [GEO-Administration] API endpoint to override the source type of a domain (Story, Ready for QA)

#### TC-GEO-1220-001 - The QA account has the SUPER_ADMIN role and the AC7 accounts have their roles

- **ACs:** Prerequisite of every write TC, AC7 accounts | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify the roles before any call: the QA account must be SUPER_ADMIN for every PUT / DELETE TC, and the ADMIN, EDITOR and READER accounts of AC7 must exist on staging. Prerequisite of TC-GEO-1220-002 to 020.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Accounts: the QA account assiya.benramdane@onclusive.com, plus one ADMIN, one EDITOR and one READER account on staging (to be provided, see review OP-2 / OP-3).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is logged in on staging with the QA account | https://staging-geo.onclusive.com/geo | The GEO dashboard is displayed |
| 2 | When the user calls the current user endpoint | GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | 200 with the email assiya.benramdane@onclusive.com |
| 3 | Then the response shows the SUPER_ADMIN role |   | The role reads SUPER_ADMIN; if not, every write TC of GEO-1220 is BLOCKED until the role is granted |
| 4 | And the AC7 accounts show their roles | GET https://staging-geo.onclusive.com/geo/api/v1/auth/me with the ADMIN, EDITOR and READER accounts | The three accounts show ADMIN, EDITOR and READER (used by TC-GEO-1220-012 and 013) |

#### TC-GEO-1220-002 - An override applies to the next run of any organisation without a Gemini call

- **ACs:** AC1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy | **Flag:** step 6 needs dev evidence (logs/DB)
- **Description:** Verify that after a SUPER_ADMIN override with applyToHistory = false, the next run of an analysis citing the domain stores the override type and makes no Gemini call for that domain. Covers AC1 (refined). The "no Gemini call" part needs dev evidence (logs/DB).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). Analysis A (organisation QA-GEO) cites {D} in its AI Engines Citation Sources and runs daily; the test spans its next run (date recorded). Dashboard checks use the source type labels of the UI (REVIEW_SITES = "Review Sites", SOCIAL_UGC = "Social / UGC", JOURNALISM = "Journalism").

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user reads the classification of the test domain | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | 200; the row of {D} shows origin GEMINI and sourceType T0 (recorded); if T0 is REVIEW_SITES use SOCIAL_UGC as the new type |
| 2 | When the user creates an override without history | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC1","applyToHistory":false} | 200; historyRowsUpdated = 0; previousSourceType = T0 |
| 3 | Then the GET shows the domain as an override | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | The row of {D} shows sourceType REVIEW_SITES, origin OVERRIDE, overriddenBy = the QA account, overriddenAt = the time of the call, reason "QA GEO-1220 AC1" |
| 4 | When the next run of analysis A completes | Analysis A (QA-GEO), next daily run | The run is completed (date recorded) |
| 5 | Then the source of the new run is stored as REVIEW_SITES | Dashboard of A > AI Engines Citation Sources, period = the day of the run only | {D} shows the type "Review Sites" |
| 6 | And no Gemini call is made for the domain during the run | Needs dev evidence (logs/DB): classifier logs of the run of A | The dev confirms that no Gemini classification call was made for {D} (override read from the cache) |
| 7 | And the user restores the history of the domain to its original type | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"T0","reason":"QA GEO-1220 cleanup","applyToHistory":true} | 200; historyRowsUpdated >= 1; previousSourceType = the override type |
| 8 | And the user removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 204 |

#### TC-GEO-1220-003 - An override beats the hard-coded regex list

- **ACs:** AC2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy | **Flag:** global change on trustpilot.com (OP-4)
- **Description:** Verify that a domain matched by a hard-coded regex list (trustpilot.com, REVIEW_SITES) is stored with the override type (SOCIAL_UGC) at the next run. Covers AC2 (refined). Changes trustpilot.com for every organisation on staging during one run: run only with QA / dev agreement and restore at the end.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). Domain under test: trustpilot.com (regex list, REVIEW_SITES) instead of {D}, used only with QA / dev agreement (OP-4). Analysis B (organisation QA-GEO) cites trustpilot.com in its AI Engines Citation Sources and runs daily; the test spans its next run.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given trustpilot.com is classified by the regex list | Dashboard of B > AI Engines Citation Sources | trustpilot.com shows the type "Review Sites" |
| 2 | And the GET holds no override for trustpilot.com | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain=trustpilot.com&overridden=true&page=0&size=20 | 200; no row with origin OVERRIDE (regex results are never stored) |
| 3 | When the user overrides trustpilot.com to SOCIAL_UGC | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/trustpilot.com body {"sourceType":"SOCIAL_UGC","reason":"QA GEO-1220 AC2","applyToHistory":false} | 200; historyRowsUpdated = 0 |
| 4 | And the next run of analysis B completes | Analysis B (QA-GEO), next daily run | The run is completed (date recorded) |
| 5 | Then the next run stores SOCIAL_UGC for trustpilot.com | Dashboard of B > AI Engines Citation Sources, period = the day of the run only | trustpilot.com shows the type "Social / UGC" |
| 6 | And the user restores REVIEW_SITES on the history | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/trustpilot.com body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 cleanup","applyToHistory":true} | 200; historyRowsUpdated >= 1 |
| 7 | And the user removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/trustpilot.com/override | 204; trustpilot.com goes back to the regex list (Review Sites) at the next run |

#### TC-GEO-1220-004 - The override of a root domain applies to its regional subdomain in a lite analysis

- **ACs:** AC2b | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy | **Flag:** data: the lite result must cite fr.trustpilot.com
- **Description:** Verify that the override trustpilot.com -> SOCIAL_UGC applies to fr.trustpilot.com cited by a lite analysis, and that the displayed domain stays fr.trustpilot.com. Covers AC2b (refined).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). Domain under test: trustpilot.com (global change, OP-4). Two sessions: the QA account (SUPER_ADMIN) for PUT / DELETE, and the PQL account assiya.benramdane+geo@onclusive.com (Lite plan, interface language British English en-GB) for the lite analysis. If the lite result does not cite fr.trustpilot.com, run it again with another brand reviewed on Trustpilot France (record the brand).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the SUPER_ADMIN has overridden trustpilot.com to SOCIAL_UGC | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/trustpilot.com body {"sourceType":"SOCIAL_UGC","reason":"QA GEO-1220 AC2b","applyToHistory":false} (QA account session) | 200; historyRowsUpdated = 0 |
| 2 | When the PQL user runs a lite analysis that cites fr.trustpilot.com | PQL account - brand "Decathlon", country France - French (FR) | The lite analysis result is displayed and its sources list fr.trustpilot.com |
| 3 | Then fr.trustpilot.com shows the type of the override | Lite result > sources table | fr.trustpilot.com shows the type "Social / UGC" |
| 4 | And the displayed domain stays the regional subdomain |   | The domain reads "fr.trustpilot.com", not "trustpilot.com" |
| 5 | And the SUPER_ADMIN removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/trustpilot.com/override (QA account session) | 204 |

#### TC-GEO-1220-005 - applyToHistory true updates the history and the charts and exports show the new type

- **ACs:** AC3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy | **Flag:** step 6 needs dev evidence (logs/DB)
- **Description:** Verify that a PUT with applyToHistory = true returns historyRowsUpdated and previousSourceType, and that the source charts and the XLSX / PPTX exports show the new type at once, without waiting for the cache to expire. Covers AC3 (refined). "Every non-deleted row in every organisation" needs dev evidence (logs/DB).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). Analysis A (organisation QA-GEO) cites {D} in its AI Engines Citation Sources and runs daily; the test spans its next run (date recorded). Dashboard checks use the source type labels of the UI (REVIEW_SITES = "Review Sites", SOCIAL_UGC = "Social / UGC", JOURNALISM = "Journalism"). Exports are made with the export icon of the analysis toolbar ("Spreadsheet .xls", "Presentation .pptx") and checked by opening the downloaded file. AC3 guarantees the refresh only on the pod that served the call (OP-6).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Citation Sources of analysis A show the test domain with its original type | Dashboard of A > AI Engines Citation Sources and source type chart, period "Last 30 days" | {D} shows the type label of T0 (recorded) |
| 2 | When the user creates an override with history | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC3","applyToHistory":true} | 200; historyRowsUpdated = N with N >= 1 (recorded); previousSourceType = T0 |
| 3 | Then the source charts show the new type at once | Reload the dashboard of A, same period | {D} shows the type "Review Sites" in AI Engines Citation Sources and is counted under Review Sites in the source type chart, without waiting for the cache to expire |
| 4 | And the XLSX export shows the new type | Export "Spreadsheet .xls", period "Last 30 days" | The row of {D} in the sources sheet shows "Review Sites" |
| 5 | And the PPTX export shows the new type | Export "Presentation .pptx", period "Last 30 days" | The sources slide shows {D} as "Review Sites" |
| 6 | And every non-deleted row of the domain is updated in every organisation | Needs dev evidence (logs/DB): count of response_sources rows of {D} | The dev confirms N equals the number of non-deleted response_sources rows of {D} in all organisations and none keeps T0 |
| 7 | And the user restores the history of the domain to its original type | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"T0","reason":"QA GEO-1220 cleanup","applyToHistory":true} | 200; historyRowsUpdated >= 1; previousSourceType = the override type |
| 8 | And the user removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 204 |

#### TC-GEO-1220-006 - Replaying the same PUT with history changes nothing

- **ACs:** AC3b | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that replaying an identical PUT with applyToHistory = true returns 200 with historyRowsUpdated = 0. Covers AC3b (refined).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given an override with history is applied on the test domain | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC3b","applyToHistory":true} | 200; historyRowsUpdated = N with N >= 1; previousSourceType = T0 |
| 2 | When the user replays the same PUT identically | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC3b","applyToHistory":true} | 200 |
| 3 | Then no history row is updated |   | historyRowsUpdated = 0 |
| 4 | And the override is unchanged | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | sourceType REVIEW_SITES, origin OVERRIDE, reason "QA GEO-1220 AC3b" |
| 5 | And the user restores the history of the domain to its original type | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"T0","reason":"QA GEO-1220 cleanup","applyToHistory":true} | 200; historyRowsUpdated >= 1; previousSourceType = the override type |
| 6 | And the user removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 204 |

#### TC-GEO-1220-007 - applyToHistory false leaves the history untouched and only future runs use the new type

- **ACs:** AC4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a PUT with applyToHistory = false changes no response_sources row (historyRowsUpdated = 0, past periods keep the old type) and only the next run uses the new type. Covers AC4 (refined).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). Analysis A (organisation QA-GEO) cites {D} in its AI Engines Citation Sources and runs daily; the test spans its next run (date recorded). Dashboard checks use the source type labels of the UI (REVIEW_SITES = "Review Sites", SOCIAL_UGC = "Social / UGC", JOURNALISM = "Journalism").

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Citation Sources of analysis A show the test domain with its original type | Dashboard of A > AI Engines Citation Sources, period "Last 30 days" | {D} shows the type label of T0 (recorded) |
| 2 | When the user creates an override without history | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC4","applyToHistory":false} | 200; historyRowsUpdated = 0; previousSourceType = T0 |
| 3 | Then no past row is changed | Reload the dashboard of A, same period | {D} still shows the type label of T0 |
| 4 | And the XLSX export of the past period keeps the original type | Export "Spreadsheet .xls", period "Last 30 days" | The row of {D} shows the type label of T0 |
| 5 | When the next run of analysis A completes | Analysis A (QA-GEO), next daily run | The run is completed (date recorded) |
| 6 | Then only the new run uses the new type | Dashboard of A, period = the day of the run only, then the days before | {D} shows "Review Sites" for the day of the run and the type label of T0 for the days before |
| 7 | And the user restores the history of the domain to its original type | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"T0","reason":"QA GEO-1220 cleanup","applyToHistory":true} | 200; historyRowsUpdated >= 1; previousSourceType = the override type |
| 8 | And the user removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 204 |

#### TC-GEO-1220-008 - Confirming the Gemini type still turns the row into an override

- **ACs:** AC4b | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state | **Flag:** step 4 needs dev evidence (logs/DB)
- **Description:** Verify that a PUT with the type Gemini already gave (JOURNALISM) turns the row into origin OVERRIDE with overriddenBy, overriddenAt and reason set, so Gemini can no longer change it. Covers AC4b (refined).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). Domain under test: {G} = a canonical root domain of the cache with origin GEMINI and sourceType JOURNALISM, agreed with QA (may be {D} when T0 = JOURNALISM).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given a domain is classified JOURNALISM by Gemini | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={G}&sourceType=JOURNALISM&page=0&size=20 | 200; the row of {G} shows origin GEMINI, sourceType JOURNALISM and no overriddenBy, overriddenAt or reason |
| 2 | When the user PUTs the same type | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{G} body {"sourceType":"JOURNALISM","reason":"QA GEO-1220 AC4b","applyToHistory":false} | 200; historyRowsUpdated = 0; previousSourceType = JOURNALISM |
| 3 | Then the row becomes an override | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={G}&page=0&size=20 | origin OVERRIDE; sourceType JOURNALISM; overriddenBy = the QA account; overriddenAt set; reason "QA GEO-1220 AC4b" |
| 4 | And Gemini can no longer change it | Needs dev evidence (logs/DB), same check as TC-GEO-1220-009 | The dev confirms a Gemini reclassification of {G} leaves the row unchanged |
| 5 | And the user removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{G}/override | 204 |

#### TC-GEO-1220-009 - An override row survives Gemini reclassification and cache purges

- **ACs:** AC5 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state | **Flag:** NOT VERIFIABLE BY QA - needs dev evidence (logs/DB)
- **Description:** Verify that an override row is unchanged when the Gemini classifier produces another type for the domain or when a purge respecting origin <> 'OVERRIDE' runs. Covers AC5 (refined). The reclassification and the purge are triggered by job / migration: needs dev evidence (logs/DB); QA only compares the GET before and after.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). A dev is available to trigger (or show the logs of) a Gemini reclassification of {D} and a cache purge respecting origin <> 'OVERRIDE' on staging.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the test domain has an override | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC5","applyToHistory":false} | 200 |
| 2 | And the user records the override row | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | sourceType REVIEW_SITES, origin OVERRIDE, overriddenBy, overriddenAt, reason and updatedAt recorded |
| 3 | When the Gemini classifier produces another type for the domain | Needs dev evidence (logs/DB): the dev triggers a Gemini classification of {D} | The dev shares the log of the Gemini answer for {D} |
| 4 | And a purge respecting origin <> 'OVERRIDE' runs on the cache | Needs dev evidence (logs/DB): the dev runs the purge on staging | The dev shares the purge log or SQL output |
| 5 | Then the override row is unchanged | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | Every recorded field is identical, updatedAt included |
| 6 | And the user removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 204 |

#### TC-GEO-1220-010 - DELETE removes the override, past rows keep their type and Gemini classifies the domain again

- **ACs:** AC6 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that DELETE returns 204, the domain no longer appears in the GET, past response_sources rows keep the override type, and the next run sends the domain through the regex then Gemini, which writes the row back as origin GEMINI. Covers AC6 (refined).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). Analysis A (organisation QA-GEO) cites {D} in its AI Engines Citation Sources and runs daily; the test spans its next run (date recorded). Dashboard checks use the source type labels of the UI (REVIEW_SITES = "Review Sites", SOCIAL_UGC = "Social / UGC", JOURNALISM = "Journalism").

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the test domain has an override applied to the history | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC6","applyToHistory":true} | 200; historyRowsUpdated = N with N >= 1; the dashboard of A shows {D} as "Review Sites" |
| 2 | When the user removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 204 with an empty body |
| 3 | Then the domain no longer appears in the GET | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | 200; {D} is not in content |
| 4 | And past rows keep the override type | Dashboard of A > AI Engines Citation Sources, period "Last 30 days" | {D} still shows "Review Sites" |
| 5 | When the next run of analysis A completes | Analysis A (QA-GEO), next daily run | The run is completed (date recorded) |
| 6 | Then Gemini writes the row back | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | The row of {D} shows origin GEMINI with the type given by Gemini and no overriddenBy, overriddenAt or reason |
| 7 | And the user restores the history of the domain to its original type | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"T0","reason":"QA GEO-1220 cleanup","applyToHistory":true} | 200; historyRowsUpdated >= 1; previousSourceType = the override type |
| 8 | And the user removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 204 |

#### TC-GEO-1220-011 - DELETE on a domain without override returns 404 NO_OVERRIDE

- **ACs:** AC6b | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that DELETE on a domain with a Gemini row and no override, or absent from the cache, returns 404 {"error":"NO_OVERRIDE", ...} and leaves the Gemini row intact. Covers AC6b (refined).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the test domain has a Gemini row and no override | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | The row of {D} shows origin GEMINI (sourceType and updatedAt recorded) |
| 2 | When the user calls DELETE on it | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 404 with {"error":"NO_OVERRIDE", ...} |
| 3 | Then the Gemini row is intact | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | origin, sourceType and updatedAt are identical to step 1 |
| 4 | When the user calls DELETE on a root domain absent from the cache | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/qa-geo-1220-absent-domain.com/override | 404 with {"error":"NO_OVERRIDE", ...} |

#### TC-GEO-1220-012 - An ADMIN can search but gets 403 ACCESS_DENIED on PUT and DELETE

- **ACs:** AC7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error | **Flag:** needs an ADMIN account (OP-2)
- **Description:** Verify that an ADMIN (not SUPER_ADMIN) gets 403 {"error":"ACCESS_DENIED", ...} on PUT and DELETE and can still call the GET. Covers AC7 (refined), ADMIN part.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: an ADMIN account on staging (not SUPER_ADMIN), role checked by TC-GEO-1220-001. Read only: nothing is changed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is logged in with an ADMIN account | GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The role reads ADMIN |
| 2 | When the user calls the search | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?page=0&size=20 | 200 with {content, page, size, totalElements, totalPages} |
| 3 | And the user calls PUT on the test domain | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC7","applyToHistory":false} | 403 with {"error":"ACCESS_DENIED", ...} |
| 4 | And the user calls DELETE on the test domain | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 403 with {"error":"ACCESS_DENIED", ...} |
| 5 | Then the test domain is unchanged | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | The row of {D} still shows origin GEMINI and sourceType T0 |

#### TC-GEO-1220-013 - EDITOR and READER get 403 ACCESS_DENIED on GET, PUT and DELETE

- **ACs:** AC7 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error | **Flag:** needs EDITOR and READER sessions (OP-3)
- **Description:** Verify that EDITOR and READER users get 403 {"error":"ACCESS_DENIED", ...} on the GET, the PUT and the DELETE. Covers AC7 (refined), EDITOR / READER part.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Accounts: one EDITOR and one READER account on staging, roles checked by TC-GEO-1220-001 (how to get these sessions: OP-3). Read only: nothing is changed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is logged in with an EDITOR account | GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The role reads EDITOR |
| 2 | When the user calls the search | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?page=0&size=20 | 403 with {"error":"ACCESS_DENIED", ...} |
| 3 | And the user calls PUT on the test domain | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC7","applyToHistory":false} | 403 with {"error":"ACCESS_DENIED", ...} |
| 4 | Then the DELETE is refused too | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 403 with {"error":"ACCESS_DENIED", ...} |
| 5 | Given the user is logged in with a READER account | GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The role reads READER |
| 6 | When the user calls the search | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?page=0&size=20 | 403 with {"error":"ACCESS_DENIED", ...} |
| 7 | And the user calls PUT on the test domain | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC7","applyToHistory":false} | 403 with {"error":"ACCESS_DENIED", ...} |
| 8 | Then the DELETE is refused too | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 403 with {"error":"ACCESS_DENIED", ...} |

#### TC-GEO-1220-014 - An unknown sourceType returns 400 VALIDATION_ERROR with the 9 allowed types

- **ACs:** AC8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that a PUT with an unknown sourceType returns 400 VALIDATION_ERROR and a message listing the 9 allowed types, and changes nothing. Covers AC8 (refined).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the test domain has no override | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | The row of {D} shows origin GEMINI and sourceType T0 |
| 2 | When the user sends a PUT with an unknown type | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"NEWS_BLOG","reason":"QA GEO-1220 AC8","applyToHistory":false} | 400 VALIDATION_ERROR |
| 3 | Then the message lists the 9 allowed types |   | The message lists 9 types, among them REVIEW_SITES, SOCIAL_UGC and JOURNALISM (full list recorded) |
| 4 | And the test domain is unchanged | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | origin GEMINI, sourceType T0 |

#### TC-GEO-1220-015 - A domain that is not a canonical root domain returns 400 VALIDATION_ERROR

- **ACs:** AC8b | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that PUT and DELETE on a domain that is not a canonical root domain (fr.trustpilot.com, Trustpilot.com, trustpilot.com., not a domain, localhost) return 400 VALIDATION_ERROR with a message giving the expected form, and that YouTube channels are not supported. Covers AC8b (refined).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). Valid body for every PUT: {"sourceType":"SOCIAL_UGC","reason":"QA GEO-1220 AC8b","applyToHistory":false}. Path values are URL-encoded where needed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given no override exists for trustpilot | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain=trustpilot&overridden=true&page=0&size=20 | 200; content is empty |
| 2 | When the user sends a PUT on a regional subdomain | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/fr.trustpilot.com body {"sourceType":"SOCIAL_UGC","reason":"QA GEO-1220 AC8b","applyToHistory":false} | 400 VALIDATION_ERROR; the message gives the expected form (canonical root domain) |
| 3 | And the user sends a PUT with upper case | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/Trustpilot.com body {"sourceType":"SOCIAL_UGC","reason":"QA GEO-1220 AC8b","applyToHistory":false} | 400 VALIDATION_ERROR with the expected form |
| 4 | And the user sends a PUT with a trailing dot | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/trustpilot.com. body {"sourceType":"SOCIAL_UGC","reason":"QA GEO-1220 AC8b","applyToHistory":false} | 400 VALIDATION_ERROR with the expected form |
| 5 | And the user sends a PUT on a text that is not a domain | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/not%20a%20domain body {"sourceType":"SOCIAL_UGC","reason":"QA GEO-1220 AC8b","applyToHistory":false} | 400 VALIDATION_ERROR with the expected form |
| 6 | And the user sends a PUT on localhost | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/localhost body {"sourceType":"SOCIAL_UGC","reason":"QA GEO-1220 AC8b","applyToHistory":false} | 400 VALIDATION_ERROR with the expected form |
| 7 | And the user sends a PUT on a YouTube channel | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/youtube.com%2F%40X body {"sourceType":"SOCIAL_UGC","reason":"QA GEO-1220 AC8b","applyToHistory":false} | 400 VALIDATION_ERROR: YouTube channels are not supported |
| 8 | And the user sends a DELETE on a regional subdomain | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/fr.trustpilot.com/override | 400 VALIDATION_ERROR with the expected form |
| 9 | Then no override was created | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain=trustpilot&overridden=true&page=0&size=20 | 200; content is empty |

#### TC-GEO-1220-016 - A PUT without reason or without applyToHistory returns 400 VALIDATION_ERROR

- **ACs:** AC8c | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that a PUT missing reason or missing applyToHistory returns 400 VALIDATION_ERROR and changes nothing. Covers AC8c (refined).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the test domain has no override | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | The row of {D} shows origin GEMINI and sourceType T0 |
| 2 | When the user sends a PUT without reason | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","applyToHistory":false} | 400 VALIDATION_ERROR |
| 3 | And the user sends a PUT without applyToHistory | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC8c"} | 400 VALIDATION_ERROR |
| 4 | Then the test domain is unchanged | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={D}&page=0&size=20 | origin GEMINI, sourceType T0 |

#### TC-GEO-1220-017 - Every valid PUT and DELETE writes a SOURCE_CLASSIFICATION_OVERRIDE audit log line

- **ACs:** AC8d | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy | **Flag:** NOT VERIFIABLE BY QA - needs dev evidence (logs)
- **Description:** Verify that a valid PUT and a valid DELETE each write a [SOURCE_CLASSIFICATION_OVERRIDE] log line with the action, domain, old type, new type, reason, apply_to_history, history_rows_updated and the user email and sub. Covers AC8d (refined). Server logs only: needs dev evidence (logs/DB).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). A dev shares the staging server log lines at the call times t1 and t2.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user sends a valid PUT | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC8d","applyToHistory":false} at time t1 | 200; historyRowsUpdated = 0 |
| 2 | When the user sends a valid DELETE | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at time t2 | 204 |
| 3 | Then a log line holds the PUT | Needs dev evidence (logs/DB): server logs at t1 | A [SOURCE_CLASSIFICATION_OVERRIDE] line holds the action, domain {D}, old type T0, new type REVIEW_SITES, reason "QA GEO-1220 AC8d", apply_to_history false, history_rows_updated 0, email assiya.benramdane@onclusive.com and the user sub |
| 4 | And a log line holds the DELETE | Needs dev evidence (logs/DB): server logs at t2 | A [SOURCE_CLASSIFICATION_OVERRIDE] line holds the DELETE action, domain {D}, old type REVIEW_SITES, the email and the user sub (new type and reason values for a DELETE: OP-7) |

#### TC-GEO-1220-018 - The search filters by domain, type and override and returns a paginated list

- **ACs:** AC9 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the GET with domain, sourceType, overridden, page and size returns a paginated {content, page, size, totalElements, totalPages} with only matching rows, each giving domain, sourceType, origin, overriddenBy, overriddenAt, reason and updatedAt. Covers AC9 (refined). Run with the SUPER_ADMIN, which holds the ADMIN rights; the ADMIN GET itself is checked by TC-GEO-1220-012.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). {P} = a part of {D} (e.g. its first 6 letters).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the cache holds an override row and Gemini rows | PUT https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D} body {"sourceType":"REVIEW_SITES","reason":"QA GEO-1220 AC9","applyToHistory":false} | 200 |
| 2 | When the user searches with every filter | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain={P}&sourceType=REVIEW_SITES&overridden=true&page=0&size=20 | 200 with {content, page, size, totalElements, totalPages}; page = 0; size = 20; {D} is in content |
| 3 | Then only matching rows are returned |   | Every row has a domain containing {P}, sourceType REVIEW_SITES and origin OVERRIDE |
| 4 | And each row gives the documented fields |   | Each row has domain, sourceType, origin, overriddenBy, overriddenAt, reason and updatedAt |
| 5 | And the search of the AC returns only matching rows | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?domain=assurances&sourceType=REVIEW_SITES&overridden=true&page=0&size=20 | 200; every row has a domain containing "assurances", sourceType REVIEW_SITES and origin OVERRIDE (content may be empty on staging) |
| 6 | And the search without filter lists Gemini and override rows only | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?page=0&size=20 | 200; origin is GEMINI or OVERRIDE on every row, never REGEX |
| 7 | And the user removes the override | DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override | 204 |

#### TC-GEO-1220-019 - The search refuses a page size over 100 and an unknown sourceType

- **ACs:** AC9 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that size > 100 or an unknown sourceType returns 400 on the search, while size = 100 is accepted. Covers AC9 (refined), validation part.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1220 deployed (migration V2.10.6 applied). API base https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications. Calls are sent with the logged-in staging session of the account named below (browser DevTools console of a staging page with fetch and credentials included, or an HTTP client carrying the same session token); request bodies are JSON with Content-Type: application/json. {D} = the dedicated test domain agreed with QA (see review, open point OP-1): a canonical root domain already in the classification cache with origin GEMINI and no override, cited by the QA-GEO analysis A; T0 = its current sourceType, read with the GET at the start of the test. Account: the QA account assiya.benramdane@onclusive.com with the SUPER_ADMIN role (checked by TC-GEO-1220-001 with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). An override is GLOBAL: it applies to every organisation on staging, so only the agreed test domain is changed, and the override is removed with DELETE https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications/{D}/override at the end of the test (after restoring the history to T0 with a PUT applyToHistory = true whenever the history or a run stored a new type). Read only.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user can call the search | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?page=0&size=100 | 200; size = 100 |
| 2 | When the user asks for a page size over 100 | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?page=0&size=101 | 400 |
| 3 | And the user filters on an unknown type | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?sourceType=NEWS_BLOG&page=0&size=20 | 400 |
| 4 | Then a valid search still works | GET https://staging-geo.onclusive.com/geo/api/v1/admin/source-classifications?page=0&size=20 | 200 with {content, page, size, totalElements, totalPages} |

#### TC-GEO-1220-020 - In production opinion-assurances.fr shows as Review Sites and as an ops-script override

- **ACs:** AC10 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy | **Flag:** NOT VERIFIABLE BY QA (prod script) - needs dev evidence (logs/DB)
- **Description:** Verify the immediate CNP fix: after the script local/set-source-classification-override.sql is run in production, opinion-assurances.fr shows as Review Sites in the CNP history (after at most 1 h of cache), and after V2.10.6 the GET shows origin OVERRIDE, overriddenBy ops-script. Covers AC10 (refined). The script run and the CNP reports need dev / Support evidence; QA can only call the prod GET if its account has ADMIN or SUPER_ADMIN rights in production (OP-8).
- **Precondition:** Production https://geo.onclusive.com/geo, release 1.3 deployed (V2.10.6). Read only. The CNP Assurances organisation is not accessible to QA. The prod GET is called with the QA account session if it has ADMIN or SUPER_ADMIN rights in production (OP-8).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the ops script was run in production before the deployment | Needs dev evidence (logs/DB): local/set-source-classification-override.sql with domain=opinion-assurances.fr source_type=REVIEW_SITES | The dev / ops confirm the run date and the script output |
| 2 | When CNP looks at their reports | Needs dev evidence (logs/DB) or Support evidence: CNP Assurances organisation | opinion-assurances.fr shows as "Review Sites" in the history, at most 1 h after the script |
| 3 | And V2.10.6 is deployed in production |   | Release 1.3 is deployed |
| 4 | Then the GET shows the row as an ops-script override | GET https://geo.onclusive.com/geo/api/v1/admin/source-classifications?domain=opinion-assurances.fr&page=0&size=20 | 200; the row shows sourceType REVIEW_SITES, origin OVERRIDE, overriddenBy ops-script |

