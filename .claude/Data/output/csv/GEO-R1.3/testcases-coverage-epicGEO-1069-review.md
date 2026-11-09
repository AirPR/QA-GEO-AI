# GEO-1069 Ask for the Brand Website when a Custom Brand is Entered — epic test case review (GEO-R1.3, generated 2026-10-19)

**Sources (read-only):** `apps/geo/GEO-R1.3/GEO-1069/` (EPIC.md, epic-data.json, STORY_GEO-1260 to STORY_GEO-1263, imported 2026-10-19). Consistency checked against `apps/geo/GEO-R1.3/QA-READINESS-GEO-R1.3.md` and `apps/geo/GEO-R1.3/TEST-PLAN-GEO-R1.3.md` (Scenarios 70–83, cross-epic 164–180); the story ACs are the reference. No Figma (OS-Team exception, `--figma` not used).

**Scope:** 4 Stories (GEO-1260 to GEO-1263), all Ready for QA, 14 functional ACs. **Out of Scope respected:** brand suggestion search and provider, competitor logo handling. **Sync 2026-10-20 (/sync-tcs-epic, since 2026-10-19):** the PO approved every dev decision (GEO-1069 comment 865135, Quentin Reant, 2026-10-19 21:03 New York time = 2026-10-20): P1 to P5 validated, the captured domain moved from Out of Scope to In scope ("a custom brand with a website now behaves like a selected suggestion"), GEO-1260 AC-5 to AC-7 added, GEO-1261 AC-1/AC-2 and GEO-1262 AC-1 reworded, en-US copy validated (en-GB, fr-FR, es-ES machine translations still to be reviewed). Custom brand row named "Custom Brand" (GEO-1260 AC-5, i18n `brand.custom`). **Sync 2026-10-21 (/sync-tcs-epic, since 2026-10-20):** OP-1 answered by the PO: the generic globe is accepted (GEO-1262 comment 865598, Quentin Reant, 2026-10-20: "Yes accepted, I'll amend"); GEO-1262 AC-2 reworded the same day ("the general favicon is used as fallback"). TC-GEO-1262-004 updated (expects the globe), TC-GEO-1262-008 added (lettermark when the favicon fails to load). **Sync 2026-10-23 (/sync-tcs-epic, full history since the epic creation):** no AC change, no new story or linked bug, the 35 TCs unchanged; design review of the website field validated: "Looks good for me nice work team" (Jalal, designer, GEO-1069 comment 866460, 2026-10-22, reply to the PO request 865135); Brandfetch brand-profile quota still exhausted on staging on 2026-10-23 11:37 UTC (brands/logo returns only {"domain":...} for licter, nike, apple, decathlon, onclusive, toyota .com).

**CSV:** `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-epicGEO-1069.csv` — 35 TCs, 174 step rows (+1 header), 16 columns, `;` separator, fields quoted with doubled quotes when they hold `;` or `"`, UTF-8 without BOM, LF. One Cucumber step per row; case-level fields on the first row of each TC only. QA Parent = GEO-1069, Components = GEO, QA Component = GEO Module, Labels empty, Test Type = Manual, QA Regression = Yes for Urgent/High.

## Summary

| Metric | Value |
|---|---|
| Test cases | 35 |
| Steps (CSV rows) | 174 |
| Stories / Tasks | 4 / 0 |
| Coverage | happy path 14 · edge 13 · error 2 · state 6 |
| Priority | Urgent 0 · High 17 · Medium 18 · Low 0 |
| UI / Functional | UI 0 · Functional 35 |
| Smoke = Yes | 5 (max 2 per story) |
| QA Regression = Yes | 17 |
| ACs covered | 17 / 17 (GEO-1260 AC-5 to AC-7 added 2026-10-20; no AC without TC) + epic In scope rule (TC-GEO-1263-010 to 012; "brand checks" needs AC text, no TC) |

| Story | Jira status | ACs | TCs | Steps | Smoke | Happy | Edge | Error | State |
|---|---|---|---|---|---|---|---|---|---|
| GEO-1260 | Ready for QA | 7 | 7 | 39 | 2 | 3 | 3 | 0 | 1 |
| GEO-1261 | Ready for QA | 3 | 8 | 40 | 1 | 2 | 3 | 2 | 1 |
| GEO-1262 | Ready for QA | 4 | 8 | 37 | 1 | 2 | 3 | 0 | 3 |
| GEO-1263 | Ready for QA | 3 (+ epic In scope) | 12 | 58 | 1 | 7 | 4 | 0 | 1 |

## Test data

| Ref | Description | Used by |
|---|---|---|
| C | Custom brand "Licter", chosen through the "Custom Brand" row (Licter) (confirm it is not a Brandfetch suggestion) | most GEO-1260 / 1261 / 1262 TCs |
| N | Brand name with no suggestion at all (e.g. "Qzxwv Geo Test", to confirm) | TC-GEO-1260-002 |
| S | Brand suggested by Brandfetch with domain and logo (e.g. "Nike", nike.com) | TC-GEO-1260-004, TC-GEO-1263-010 (reference) |
| S0 | Brandfetch suggestion with neither domain nor logo (rare, QA to find) | TC-GEO-1263-007 (blocked if none) |
| W1 / W2 | Domains with a brand logo service logo: licter.com / onclusive.com (to confirm) | GEO-1261, GEO-1262, TC-GEO-1260-006 |
| W3 | Domain with no brand logo service logo but a favicon (QA to provide) | TC-GEO-1262-003 |
| W4 | Site with neither a brand logo nor a favicon: "example.com" (used on staging 2026-10-20) | TC-GEO-1262-004, TC-GEO-1262-008 (with request blocking on "s2/favicons") |
| A1 | Analysis created after the release, custom brand + website licter.com (created by TC-GEO-1261-008), run completed | TC-GEO-1263-001, 002, 006, 008, 011 |
| A2 | Analysis created after the release, custom brand, empty website, run completed; D = domain cited by the AI answers | TC-GEO-1263-003, 004, 009 |
| B | Analysis created after the release, custom brand whose website has a known sub-brand on its own domain (e.g. nike.com / Jordan on jordan.nike.com), a market and category keeping only Competitive prompts, run completed (QA to find) | TC-GEO-1263-012 (blocked if none) |
| O | Analysis created before the release, custom brand, no stored brand domain (QA to provide UUID) + baseline screenshots taken before deployment | TC-GEO-1263-005 |

Environment: an organisation with a prompt pool configured (GEO-1230); unbranded feature flag ON for TC-GEO-1260-007 (the other TCs work with the flag ON or OFF). DevTools Network is used by TC-GEO-1260-003, TC-GEO-1261-008, TC-GEO-1262-001/002/006/007 to check that no logo lookup is sent; the request names are noted at the first run of TC-GEO-1262-001.

## AC inventory and traceability

### GEO-1260 — 47.1 Ask for the brand website when no suggestion is selected (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | No suggestion selected | GEO-1260-001, GEO-1260-005 |
| AC-2 | No suggestion at all | GEO-1260-002 |
| AC-3 | Left empty | GEO-1260-003 |
| AC-4 | Suggestion selected | GEO-1260-004 |
| AC-5 | Placement and texts (Updated 2026-10-20) | GEO-1260-001, GEO-1260-002 |
| AC-6 | Unbranded (Updated 2026-10-20) | GEO-1260-007 |
| AC-7 | Website change resets categories (Updated 2026-10-20) | GEO-1260-006 |

### GEO-1261 — 47.2 Accept and normalize any reasonable URL input (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Any reasonable form | GEO-1261-001, GEO-1261-002, GEO-1261-003, GEO-1261-004 |
| AC-2 | Not a domain | GEO-1261-005, GEO-1261-006, GEO-1261-007 |
| AC-3 | Stored | GEO-1261-008 |

### GEO-1262 — 47.3 Retrieve and preview the logo from the provided domain (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Preview | GEO-1262-001, GEO-1262-002 |
| AC-2 | Fallbacks (reworded 2026-10-20 by the PO: "the general favicon") | GEO-1262-003, GEO-1262-004, GEO-1262-008 |
| AC-3 | Correction | GEO-1262-005, GEO-1262-007 |
| AC-4 | No website | GEO-1262-006, GEO-1262-007 |

### GEO-1263 — 47.4 Use the captured domain everywhere the brand appears (Story, Ready for QA)

| AC | Label | TC(s) |
|---|---|---|
| AC-1 | Captured domain everywhere | GEO-1263-001, GEO-1263-002, GEO-1263-006, GEO-1263-008 |
| AC-2 | No website: lettermark everywhere | GEO-1263-003, GEO-1263-004, GEO-1263-007, GEO-1263-009 |
| AC-3 | Older analyses unchanged | GEO-1263-005 |
| Epic In scope (Updated 2026-10-20) | Website stored as the brand domain: category discovery, owned-domain exclusion, competitor discovery (no GEO-1263 AC yet, AC requested from the PO) | GEO-1263-010, GEO-1263-011, GEO-1263-012 — "brand checks" (P1 only): needs AC text, no TC |

Cross-story: TC-GEO-1263-007 (behaviour change) qualifies GEO-1260 AC-4; TC-GEO-1260-006 covers the GEO-1232 rule (GEO-1002) inside GEO-1069; TC-GEO-1260-007 covers P4 in line with GEO-1241 (GEO-1209).

## ACs filtered as technical

- **GEO-1263 TAC1–TAC4** (DB / export-level: `entity_domain_confirmed`, `entity_domain`, `entity_logo_url`, `v1/brands/search`, PowerPoint generation per flag value, flag set once at BRAND / UNBRANDED creation): excluded, covered by dev tests per the Definition of Done. Their visible outcome is covered by TC-GEO-1263-002 to 005.
- **GEO-1261 server-side refusal** of an invalid website at creation (Technical Details): API-level, not turned into a TC (the UI never lets an invalid value through, TC-GEO-1261-005 to 007).
- The "Where the brand logo appears" table row "XLSX export, e-mails" (no brand logo) is not turned into a TC. The row "Prompts table, target winner" is covered since the 2026-10-20 sync (P1 validated): TC-GEO-1263-008 and 009.

## PM validation status (sync 2026-10-20)

All proposals validated by the PO: "OK for all your decisions, including storing the website as the brand domain like a selected suggestion." (GEO-1069 comment 865135, Quentin Reant). Marker in the TCs: `[Validated by PO 2026-10-20: Pn (GEO-1069 comment 865135)]`.

| Proposal | Content | TC(s) |
|---|---|---|
| P1 | Website stored as the brand domain everywhere — **validated 2026-10-20**, now epic In scope (category discovery, owned-domain exclusion, competitor discovery, prompts table winner domain). "Brand checks" is named in P1 only: needs AC text | TC-GEO-1263-008 to 012 (added 2026-10-20) |
| P2 | `entity_domain_confirmed` keeps older analyses unchanged — **validated 2026-10-20** (blanket approval; baseline B2 still open) | TC-GEO-1263-005 |
| P3 | Domain = full hostname, lowercase, no www., port or path; other subdomains kept — **validated 2026-10-20**, now GEO-1261 AC-1 | TC-GEO-1261-001, 002, 003, 004 |
| P4 | No website field in an unbranded analysis — **validated 2026-10-20**, now GEO-1260 AC-6 | TC-GEO-1260-007 |
| P5 | Field inline on Brand & Country, under the selected custom brand, before "Discover Categories" — **validated 2026-10-20**, now GEO-1260 AC-5 / AC-7 | TC-GEO-1260-001, 002 |

## Exact-text TCs (en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed, identical to en-US in `en-gb.json` on 2026-10-19)

- TC-GEO-1260-001, TC-GEO-1260-002: label "What is your brand's website? (optional)", placeholder "example.com", hint "We use it to show the right logo. Leave it empty to show your brand's initial."
- TC-GEO-1260-007 (label, as a control step).
- TC-GEO-1261-005, 006, 007: error "Enter a valid website, such as example.com."
- Strings in en-GB, fr-FR and es-ES are not covered here (cross-epic Scenario 180 of the test plan).

## Ambiguous ACs and open points (flagged, not guessed)

- OP-1 [GEO-1262 AC-2, TC-GEO-1262-004]: **ANSWERED 2026-10-20 (PO, GEO-1262 comment 865598, Quentin Reant, reply to QA comment 865525):** "Yes accepted, I'll amend". GEO-1262 AC-2 reworded the same day: "the general favicon is used as fallback, and a neutral lettermark only if neither is available" (QA reading, confirmed by the user 2026-10-21: the image of Google's favicon service, the real favicon if any, else the generic globe). TC-GEO-1262-004 now expects the globe; TC-GEO-1262-008 added for the lettermark when the favicon fails to load. The epic text (story 1.3) still says "the site's favicon" (not amended).
- OP-2 [GEO-1263 behaviour change, TC-GEO-1263-007]: a selected Brandfetch suggestion with neither domain nor logo now shows the lettermark, which qualifies GEO-1260 AC-4 ("flow unchanged from today"). PO to confirm; test data is rare (TC blocked if no such suggestion is found).
- OP-3 [GEO-1263 P1]: **ANSWERED 2026-10-20 (PO, GEO-1069 comment 865135, Quentin Reant):** "OK for all your decisions, including storing the website as the brand domain like a selected suggestion." The epic moved it to In scope. TC-GEO-1263-008 to 012 added; "brand checks" needs AC text (no TC). GEO-1263 itself was not updated (P1 still shown as a proposal, no AC for the new scope): AC requested from the PO.
- OP-4 [GEO-1263 AC-1, TC-GEO-1263-001 / 003]: "competitive views" is not listed in the "Where the brand logo appears" table; the TCs use the competitor comparison as example. Confirm which screens are meant. Run 2026-10-20: the target at 0% visibility never shows in the rankings or as a winner, so not checked; re-run on a ranked analysis (Nike / Decathlon, user decision 2026-10-23). Still open.
- OP-5 [GEO-1260 AC-3 / GEO-1262 AC-4, "no logo lookup"]: whether the lookup is front-end (visible in DevTools) or server-side is not stated; the TCs check DevTools and note the request names at the first run. If the lookup is server-side only, these steps become back-end checks. **RESOLVED BY RUN:** the lookup is front-end, visible in DevTools as `GET /geo/api/v1/brands/logo?domain=` then the Google favicon `s2/favicons?domain=` fallback.
- OP-6 [GEO-1260 AC-7, TC-GEO-1260-006]: **PARTIAL 2026-10-20:** the rule is now AC-7 ("the discovered categories are reset, as when the brand is renamed"); still not stated whether it happens at once or at the next "Discover Categories"; the TC checks that the previous categories are not kept.
- OP-7 [GEO-1261 AC-3, TC-GEO-1261-008]: the stored domain is not shown on any screen as text; it is checked through the creation request in DevTools and the domain-based logo. Field names of the request are not specified. **RESOLVED BY RUN (2026-10-23, TC-GEO-1261-008 steps 1-2):** the domain is sent as `entityDomain` ("licter.com") in the discover-categories request.
- OP-8 [GEO-1262 AC-1]: "within moments" has no threshold; the TCs record the delay without asserting a value.
- OP-9 [GEO-1260 AC-3]: "neutral lettermark" for a brand name typed as an address (TC-GEO-1260-005) — letter shown ("w"?) not specified; not asserted. **CLOSED N/A 2026-10-23 (QA, user):** the field is prefilled with the normalized domain, so a logo is shown, never a lettermark.
- Epic open points (non-blocking): website request for manually added competitors — still open. Captured domain for owned-source classification — **ANSWERED 2026-10-20** (epic In scope: "feeds … the owned-domain exclusion"), TC-GEO-1263-011.
- Custom brand row label [GEO-1260 AC-5]: AC-5 and i18n `brand.custom` say "Custom Brand", the GEO-1260 Rules still say "« {name} — custom »". QA decision 2026-10-20: TCs use the "Custom Brand" row.
- Staging limit [GEO-1262 rule "Staging (2026-10-16)"]: the Brandfetch quota is exhausted on staging, so AC-1 shows the favicon fallback; TC-GEO-1262-001 carries a SKIP marker and TC-GEO-1262-003 does not discriminate on staging. Still exhausted on 2026-10-23 11:37 UTC.

## TCs needing special test data or conditions

- **Special data to provide before execution:** TC-GEO-1260-002 (N), TC-GEO-1262-003 (W3 favicon only), TC-GEO-1262-004 and 008 (W4 no favicon; 008 also needs DevTools request blocking on "s2/favicons"), TC-GEO-1263-005 (older analysis O + baseline screenshots taken before deployment), TC-GEO-1263-007 (S0, rare), TC-GEO-1263-008 / 009 (a prompt won by "Licter"), TC-GEO-1263-011 (licter.com cited), TC-GEO-1263-012 (analysis B, blocked if none).
- **Staging:** TC-GEO-1262-001 skipped while the Brandfetch quota is exhausted (GEO-1262 rule, Staging 2026-10-16).
- **Analyses with a completed run:** TC-GEO-1263-001, 002, 006 (A1, created by TC-GEO-1261-008), TC-GEO-1263-003, 004 (A2). Each creation uses prompt-pool slots of the organisation.
- **Feature flag:** TC-GEO-1260-007 needs the unbranded flag ON.
- **DevTools:** TC-GEO-1260-003, TC-GEO-1261-008, TC-GEO-1262-001, 002, 006, 007, 008 (request blocking), TC-GEO-1263-010.

## Alignment after the first MCP run (2026-10-20)

The CSV has been updated after the staging run (runs 20102026-1509, 1516, 1518 and 1534). Where the TCs below differ from the CSV, the CSV is the reference.

- **Custom brand name:** "Licter" is a Brandfetch suggestion (licter.com).
  - Wizard TCs (GEO-1260, GEO-1261-001 to 007, GEO-1262) now use C = "Lictorix Geo".
  - TC-GEO-1261-008 and TC-GEO-1263-010 keep "Licter", chosen through the "Custom Brand" row. A real brand name is needed so the analysis gets ranked. A1 "Lictorix Geo" got 0% visibility.
- **TC-GEO-1260-005:** expects "licter.com". The "www." prefix is removed by the GEO-1261 AC-1 normalization.
- **TC-GEO-1260-007:** step 5 is split. Selecting "Brand analysis" opens the "Switch the analysis type?" dialog, and the next step clicks "Switch type". The dialog opens as soon as the "Brand analysis" card is clicked, before Continue (rerun 20102026-1705), so step 5 says "selects" without "continues" (2026-10-22).
- **TC-GEO-1261-007:** the error disappears as soon as the value is valid or empty, without leaving the field.
- **TC-GEO-1261-008:** new step 2 checks `entityDomain` = "licter.com" in the discover-categories request. The Review step shows neither the brand nor its domain.
- **Network filters:** changed to "brands/logo" and "s2/favicons". The logo lookup is `GET /geo/api/v1/brands/logo?domain=…` and the favicon is loaded from www.google.com/s2/favicons.
- **Test data:** TC-GEO-1262-003 uses W3 = "sqlite.org"; TC-GEO-1262-004 uses W4 = "example.com".
  - TC-GEO-1262-004: the generic globe was shown (FAILED as known limit), and OP-1 was sent to the PO. **Sync 2026-10-21:** OP-1 answered (globe accepted, GEO-1262 comment 865598), TC-GEO-1262-004 now expects the globe and is to be re-run; TC-GEO-1262-008 added (lettermark when the favicon fails to load, DevTools request blocking on "s2/favicons").
- **TC-GEO-1263-011:** expects "Corporate". There is no "Owned Media" type in AI Citation Sources.
- **Rankings precondition:**
  - TC-GEO-1263-001, 002, 003, 004 and 006 now require the target brand to be in the top-10 rankings.
  - TC-GEO-1263-003, 004 and 009 now require A2's categories to match the brand's business. Discovery without a website proposed lighting categories for "Licter".
- **Still open:**
  - TC-GEO-1263-012: data for analysis B still to be found.
  - TC-GEO-1263-005: no pre-release baseline yet (B2).

## Test cases

### GEO-1260 — 47.1 Ask for the brand website when no suggestion is selected

#### TC-GEO-1260-001 - Custom brand row shows an optional website field under the selected brand card

- **ACs:** AC-1, AC-5 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that choosing the "Custom Brand" row of the brand search shows the optional website field inline under the selected custom brand card, before "Discover Categories", with the validated copy. Covers AC-1 and AC-5. [Validated by PO 2026-10-20: P5 (GEO-1069 comment 865135)] Exact-text check on the validated copy (label, placeholder, hint).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Brand & Country step |  | "What brand are you analysing?" is displayed with an empty brand search |
| 2 | When the user types a brand name in the brand search | C = "Licter" | The dropdown lists the matching suggestions, if any, and a "Custom Brand" row for "Licter" |
| 3 | And the user selects the "Custom Brand" row (Licter) |  | The custom brand card "Licter" is displayed as the selected brand |
| 4 | Then a website field is displayed inline right under the selected custom brand card, above "Discover Categories" |  | The field has a globe icon and the same input style as the brand search |
| 5 | And the field label reads the validated copy |  | "What is your brand's website? (optional)" |
| 6 | And the field shows the validated placeholder and hint |  | Placeholder "example.com"; hint "We use it to show the right logo. Leave it empty to show your brand's initial." |
| 7 | And the empty field is not flagged as required |  | No required marker, no red border and no error message while the field is empty |

#### TC-GEO-1260-002 - Brand search with no suggestion shows the same website field

- **ACs:** AC-2, AC-5 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a brand name returning no suggestion at all shows the "Custom Brand" row and the same optional website field as TC-GEO-1260-001. Covers AC-2 and AC-5. [Validated by PO 2026-10-20: P5 (GEO-1069 comment 865135)] Exact-text check on the validated copy.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. N = a brand name that returns no suggestion at all (e.g. "Qzxwv Geo Test", to confirm at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Brand & Country step |  | The brand search is empty |
| 2 | When the user types a brand name that returns no suggestion | N = "Qzxwv Geo Test" | The dropdown shows no suggestion, only the "Custom Brand" row for "Qzxwv Geo Test" |
| 3 | And the user selects the "Custom Brand" row |  | The custom brand card "Qzxwv Geo Test" is displayed as the selected brand |
| 4 | Then the website field is displayed inline under the custom brand card |  | "What is your brand's website? (optional)" with placeholder "example.com" and the hint "We use it to show the right logo. Leave it empty to show your brand's initial." |
| 5 | And the field is empty and optional |  | No required marker, no red border and no error message |

#### TC-GEO-1260-003 - Website left empty lets the setup continue with a lettermark and no logo lookup

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that leaving the website field empty lets the setup continue normally, that no logo retrieval is attempted and that the brand is shown as a neutral lettermark. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). Browser DevTools open on the Network tab (filter "brandfetch" and "favicon"); the names of the logo lookup requests are noted at the first execution of TC-GEO-1262-001.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected and the website field is empty | C = "Licter" | The custom brand card "Licter" is displayed with an empty website field |
| 2 | Then the brand card shows the neutral lettermark |  | The 32px avatar shows the letter "L" (same letter avatar as the dashboard), no logo and no domain under the brand name |
| 3 | And no logo lookup is sent for the brand | DevTools Network | No logo lookup request (brand logo service or favicon) appears, in particular none for a domain guessed from the name (e.g. licter.com) |
| 4 | When the user adds a market and clicks "Discover Categories" | Country United States, language English (EN) | No error is shown under the website field and the discovery loading screen is displayed |
| 5 | Then the Categories step opens with the discovered categories |  | The setup continues normally to the Categories step |
| 6 | And still no logo lookup was sent during the setup | DevTools Network | No logo lookup request for the brand appears in the Network log |

#### TC-GEO-1260-004 - Selecting a suggestion asks for no website and keeps today's flow

- **ACs:** AC-4 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that selecting a brand from the dropdown suggestions requests no website URL and keeps today's brand card and flow. Covers AC-4. Note: GEO-1263 qualifies "flow unchanged" for a suggestion that Brandfetch returns with neither domain nor logo (now a lettermark) — covered by TC-GEO-1263-007.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. S = a brand suggested by Brandfetch with a domain and a logo (e.g. "Nike", nike.com).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Brand & Country step |  | The brand search is empty |
| 2 | When the user types the name of a suggested brand | S = "Nike" | The dropdown lists Brandfetch suggestions with their logo and domain, plus a "Custom Brand" row for "Nike" |
| 3 | And the user selects the suggestion | "Nike" (nike.com) | The selected brand card shows today's card: the Nike logo, the name and the domain |
| 4 | Then no website field is displayed |  | No "What is your brand's website? (optional)" field is shown anywhere on the step |
| 5 | When the user adds a market and clicks "Discover Categories" | Country United States, language English (EN) | The discovery loading screen is displayed and the Categories step opens, as today |

#### TC-GEO-1260-005 - Brand name typed as an address prefills the website field

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that when the typed brand name is itself an address, the website field is prefilled with it. Supports AC-1 (OS-Team rule 2026-10-14, Definition of Done).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Brand & Country step |  | The brand search is empty |
| 2 | When the user types an address as brand name | "www.licter.com" | The dropdown shows a "Custom Brand" row for "www.licter.com" |
| 3 | And the user selects the "Custom Brand" row |  | The custom brand card "www.licter.com" is displayed with the website field under it |
| 4 | Then the website field is prefilled with the typed address |  | The website field contains "www.licter.com" and shows no error |

#### TC-GEO-1260-006 - Changing the website after category discovery clears the discovered categories

- **ACs:** AC-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that changing the website after categories were discovered clears them, as changing the brand does today. Covers AC-7 (OS-Team rule promoted to AC-7 on 2026-10-20; cross-epic with GEO-1232 in GEO-1002). Timing of the reset (at once or at the next "Discover Categories") still not stated (OP-6).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). W1 = "licter.com" (domain with a logo in the brand logo service, to confirm at execution; otherwise use another domain with a Brandfetch logo). W2 = "onclusive.com" (second domain with a different logo). Reference: the effect of changing the brand after discovery (today's behaviour) is noted before execution.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with the website "licter.com" and a market | C = "Licter", W1 = "licter.com", United States / English (EN) | "licter.com" is shown under the brand name |
| 2 | When the user clicks "Discover Categories" |  | The Categories step opens with the discovered categories (list noted) |
| 3 | And the user clicks Back |  | Brand & Country shows "Licter" and "licter.com" |
| 4 | And the user changes the website and the field loses focus | W2 = "onclusive.com" | "onclusive.com" is shown under the brand name, no error |
| 5 | Then the categories discovered for the previous website are cleared |  | Same behaviour as when the brand is changed: the previously discovered categories are not kept |
| 6 | When the user clicks "Discover Categories" |  | The discovery loading screen is displayed again and the Categories step shows the result of the new discovery |

#### TC-GEO-1260-007 - Unbranded analysis shows no website field

- **ACs:** AC-6 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the website field is asked only in a brand analysis, never in an unbranded analysis. Covers AC-6. [Validated by PO 2026-10-20: P4 (GEO-1069 comment 865135)] Cross-epic with GEO-1241 (GEO-1209).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. Unbranded feature flag ON. The user is on the Analysis Type step of the wizard. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Analysis Type step | Unbranded feature flag ON | The "Brand analysis" and "Unbranded analysis" cards are displayed |
| 2 | When the user selects "Unbranded analysis" and continues |  | The Topic & Country step asks "What industry or topic are you analysing?" |
| 3 | And the user types a topic | "Electric cars" | The topic is accepted |
| 4 | Then no website field is displayed |  | No "What is your brand's website? (optional)" field is shown on Topic & Country |
| 5 | When the user goes back and selects "Brand analysis" |  | The dialog "Switch the analysis type?" is displayed with "Cancel" and "Switch type" |
| 6 | And the user clicks "Switch type" and selects the "Custom Brand" row (Lictorix Geo) | C = "Lictorix Geo" | The custom brand card "Lictorix Geo" is displayed on Brand & Country |
| 7 | Then the website field is displayed under the custom brand card |  | "What is your brand's website? (optional)" |

### GEO-1261 — 47.2 Accept and normalize any reasonable URL input

#### TC-GEO-1261-001 - Full URL with protocol, www, path and query gives the root domain

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a full URL with protocol, www prefix, path and query string is accepted and normalized to the brand's root domain. Covers AC-1. [Validated by PO 2026-10-20: P3 (GEO-1069 comment 865135)] The derived domain is read under the brand name (GEO-1262 design).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with an empty website field | C = "Licter" | The website field is empty and the avatar shows the letter "L" |
| 2 | When the user enters a full URL in the website field | "https://www.licter.com/fr/about?x=1" | The value is typed, no error is shown while typing |
| 3 | And the field loses focus | Click outside the field | No inline error is shown |
| 4 | Then the derived root domain is shown under the brand name |  | "licter.com" |
| 5 | And the logo preview is retrieved for that domain |  | The 32px avatar shows the logo found for licter.com instead of the letter "L" |

#### TC-GEO-1261-002 - Protocol, www prefix, trailing slash and bare domain give the same root domain

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that an address with or without protocol, with or without www prefix, with a trailing slash, or a bare domain is normalized to the same root domain. Covers AC-1. [Validated by PO 2026-10-20: P3 (GEO-1069 comment 865135)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with an empty website field | C = "Licter" | The website field is empty |
| 2 | When the user enters an address with the http protocol and the field loses focus | "http://licter.com" | No error; "licter.com" is shown under the brand name |
| 3 | And the user replaces it with an address with the www prefix and the field loses focus | "www.licter.com" | No error; "licter.com" is shown under the brand name |
| 4 | And the user replaces it with a domain with a trailing slash and the field loses focus | "licter.com/" | No error; "licter.com" is shown under the brand name |
| 5 | And the user replaces it with the bare domain and the field loses focus | "licter.com" | No error; "licter.com" is shown under the brand name |
| 6 | Then every form gave the same root domain |  | "licter.com" each time, no inline error for any of the four inputs |

#### TC-GEO-1261-003 - Uppercase address and port number give the lowercase root domain

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that an uppercase address and an address with a port number are normalized to the lowercase root domain without port. Covers AC-1. [Validated by PO 2026-10-20: P3 (GEO-1069 comment 865135)]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with an empty website field | C = "Licter" | The website field is empty |
| 2 | When the user enters an uppercase address and the field loses focus | "LICTER.COM" | No error; "licter.com" (lowercase) is shown under the brand name |
| 3 | And the user replaces it with an address with a port and the field loses focus | "licter.com:8080" | No error; "licter.com" (no port) is shown under the brand name |

#### TC-GEO-1261-004 - Subdomain other than www is kept in the derived domain

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that a subdomain other than www is kept in the derived domain (shop.brand.co.uk stays shop.brand.co.uk). Covers AC-1. [Validated by PO 2026-10-20: P3 (GEO-1069 comment 865135)] Expected result follows the validated P3 definition (now AC-1: full hostname without www).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with an empty website field | C = "Licter" | The website field is empty |
| 2 | When the user enters an address with a subdomain and the field loses focus | "shop.brand.co.uk" | No inline error is shown |
| 3 | Then the subdomain is kept in the domain shown under the brand name |  | "shop.brand.co.uk" (not "brand.co.uk") |

#### TC-GEO-1261-005 - Input that is not a domain shows the inline error and blocks the step

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** error
- **Description:** Verify that an input that cannot be interpreted as a domain shows a clear inline message when the field loses focus, that the step cannot be left while it is shown, and that the input can be corrected. Covers AC-2. Exact-text check on the copy validated by the PO (AC-2).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty. A market is added (United States / English (EN)).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with a market and an empty website field | C = "Licter" | The website field is empty and shows no error |
| 2 | When the user enters a value that is not a domain | "licter" | The value is typed, no error is shown while typing |
| 3 | And the field loses focus | Click outside the field | The website field has a red border and the message "Enter a valid website, such as example.com." is shown under it (same pattern as the brand error of step 1) |
| 4 | When the user clicks "Discover Categories" |  | The step is not left: no discovery loading screen, the error is still shown |
| 5 | Then the user can correct the input |  | The field is editable and still contains "licter" |

#### TC-GEO-1261-006 - Each invalid example input shows the inline error

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** error
- **Description:** Verify that every invalid example of the story (space inside, e-mail address, ftp protocol, localhost, IP address) shows the inline error. Covers AC-2. Exact-text check on the copy validated by the PO (AC-2).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with an empty website field | C = "Licter" | The website field is empty |
| 2 | When the user enters a domain containing a space and the field loses focus | "licter .com" | Red border and "Enter a valid website, such as example.com." |
| 3 | And the user replaces it with an e-mail address and the field loses focus | "john@licter.com" | Red border and "Enter a valid website, such as example.com." |
| 4 | And the user replaces it with an ftp address and the field loses focus | "ftp://licter.com" | Red border and "Enter a valid website, such as example.com." |
| 5 | And the user replaces it with localhost and the field loses focus | "localhost" | Red border and "Enter a valid website, such as example.com." |
| 6 | And the user replaces it with an IP address and the field loses focus | "192.168.0.1" | Red border and "Enter a valid website, such as example.com." |
| 7 | Then no domain is shown under the brand name for any of these inputs |  | No derived domain and no logo preview: the avatar keeps the letter "L" |

#### TC-GEO-1261-007 - Inline error shown on Discover Categories and cleared once the value is valid or empty

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the inline error also shows on "Discover Categories", disappears as soon as the value is valid or empty, and that an empty field lets the setup continue. Covers AC-2. Exact-text check on the copy validated by the PO (AC-2).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty. A market is added (United States / English (EN)).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with a market and an empty website field | C = "Licter" | The website field is empty |
| 2 | When the user types an invalid value and clicks "Discover Categories" without leaving the field first | "john@licter.com" | Red border and "Enter a valid website, such as example.com."; the step is not left |
| 3 | And the user corrects the value to a valid domain | "licter.com" | The red border and the message disappear |
| 4 | And the user replaces it with an invalid value and the field loses focus | "localhost" | The error is shown again |
| 5 | And the user clears the field | (empty) | The red border and the message disappear; the empty field is accepted |
| 6 | Then clicking "Discover Categories" continues the setup |  | The discovery loading screen is displayed and the Categories step opens |

#### TC-GEO-1261-008 - Derived domain is stored as the brand domain of the created analysis

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the derived domain (not the typed URL) is stored as the brand's domain of the created analysis, as shown by the creation request and the domain-based logo after creation. Covers AC-3. This TC creates analysis A1 used by TC-GEO-1263-001, 002 and 006.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). W1 = "licter.com" (domain with a logo in the brand logo service, to confirm at execution; otherwise use another domain with a Brandfetch logo). Browser DevTools open on the Network tab (filter "brandfetch" and "favicon"); the names of the logo lookup requests are noted at the first execution of TC-GEO-1262-001. The organisation prompt pool has enough free slots to create one analysis. Keep only 5 prompts (QA rule), spread over every category: at least one kept prompt per category, otherwise the categories are dropped and Create Analysis is disabled ("At least one category needs a kept prompt.").

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with a full URL as website and a market | "https://www.licter.com/fr/about?x=1", United States / English (EN) | "licter.com" is shown under the brand name with its logo preview (logo noted as L1) |
| 2 | When the user goes through Categories, Prompts and Summary and creates the analysis | Default categories and prompts | The analysis A1 is created and "View analysis" is available |
| 3 | And the user checks the analysis creation request in DevTools | DevTools Network, creation request | The brand domain sent and returned is "licter.com", not the full URL typed |
| 4 | And the user opens the analysis from "View analysis" |  | The dashboard of A1 opens |
| 5 | Then the brand is displayed with the logo of the stored domain |  | The sidebar and header show logo L1 of licter.com, not a lettermark |

### GEO-1262 — 47.3 Retrieve and preview the logo from the provided domain

#### TC-GEO-1262-001 - Confirmed domain shows the logo preview in the brand card within moments

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that confirming a valid domain (field loses focus) displays the retrieved logo in the 32px avatar of the brand card within moments, with a grey pulsing placeholder during the lookup and the domain under the brand name. Covers AC-1. [SKIP on staging while the Brandfetch quota is exhausted (GEO-1262 rule, Staging 2026-10-16): AC1 shows the favicon fallback]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty. W1 = "licter.com" (domain with a logo in the brand logo service, to confirm at execution; otherwise use another domain with a Brandfetch logo). Browser DevTools open on the Network tab (filter "brandfetch" and "favicon"); the names of the logo lookup requests are noted at the first execution of TC-GEO-1262-001.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with an empty website field | C = "Licter" | The 32px avatar shows the letter "L" |
| 2 | When the user types a valid domain in the website field | W1 = "licter.com" | The avatar is unchanged while typing |
| 3 | And the field loses focus | Click outside the field | A grey pulsing placeholder of the same size replaces the avatar, with no text and no layout shift |
| 4 | Then the logo retrieved for the domain is displayed within moments |  | The 32px avatar shows the logo of licter.com, same place and size as the logo of a selected suggestion |
| 5 | And the domain is shown under the brand name |  | "licter.com" |
| 6 | And the logo lookup requests are recorded | DevTools Network | One logo lookup for licter.com is visible (request names noted for the other TCs) |

#### TC-GEO-1262-002 - Lookup runs on Enter and not on every keystroke

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that the logo lookup runs only when the value is confirmed (Enter or loss of focus), not on every keystroke, with one call per domain. Covers AC-1 (OS-Team rule: "confirmed" = blur or Enter).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty. W2 = "onclusive.com" (second domain with a different logo). Browser DevTools open on the Network tab (filter "brandfetch" and "favicon"); the names of the logo lookup requests are noted at the first execution of TC-GEO-1262-001.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with an empty website field | DevTools Network cleared | The avatar shows the letter "L" |
| 2 | When the user types a valid domain one character at a time | W2 = "onclusive.com" | No logo lookup request is sent while typing and the avatar stays the letter "L" |
| 3 | And the user presses Enter |  | The grey pulsing placeholder is shown, then the logo of onclusive.com |
| 4 | Then a single logo lookup was sent for the domain | DevTools Network | One lookup for onclusive.com, none for partial values (e.g. "onclu") |
| 5 | And the domain is shown under the brand name |  | "onclusive.com" |

#### TC-GEO-1262-003 - Favicon is used when the brand logo service has no logo for the domain

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that when the brand logo service has no logo for the domain, the site's favicon is shown in the preview. Covers AC-2. Note: while the Brandfetch quota is exhausted on staging (GEO-1262 rule, Staging 2026-10-16), every domain falls back to the favicon, so this TC does not discriminate between the two cases on staging.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty. W3 = a domain with no logo in the brand logo service but with a favicon (QA to provide before execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with an empty website field | C = "Licter" | The avatar shows the letter "L" |
| 2 | When the user enters a domain unknown to the brand logo service and the field loses focus | W3 (QA to provide) | The grey pulsing placeholder is shown |
| 3 | Then the site's favicon is shown as the brand visual |  | The 32px avatar shows the favicon of W3, not the letter "L" |
| 4 | And the domain is shown under the brand name |  | The W3 domain |

#### TC-GEO-1262-004 - Generic favicon (globe) is shown when the site has neither a logo nor a favicon

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that when the domain has neither a brand logo nor a site favicon, the general favicon returned by the favicon service (generic grey globe) is shown as the brand visual, not the lettermark. Covers AC-2. [Decided by PO 2026-10-20: OP-1 globe accepted (GEO-1262 comment 865598, Quentin Reant): "Yes accepted, I'll amend"; AC-2 now reads "the general favicon is used as fallback"] The lettermark appears only with no domain (TC-GEO-1262-006) or when the favicon fails to load (TC-GEO-1262-008). _(Sync 2026-10-21: title, description and step 3 updated; W4 = "example.com" and C = "Lictorix Geo" in the CSV.)_
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty. W4 = a domain with no logo in the brand logo service and no favicon (QA to provide before execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with an empty website field | C = "Licter" | The avatar shows the letter "L" |
| 2 | When the user enters a domain with neither a brand logo nor a favicon and the field loses focus | W4 (QA to provide) | The grey pulsing placeholder is shown |
| 3 | Then the general favicon is shown as the brand visual |  | The 32px avatar shows the generic grey globe of the favicon service (image from www.google.com/s2/favicons), not the letter "L" |
| 4 | And the domain is shown under the brand name |  | The W4 domain |

#### TC-GEO-1262-005 - Editing the website updates the preview to the logo of the new domain

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that editing the website URL updates the preview to the logo of the new domain, and that the previous domain's logo is never shown nor saved for the new domain. Covers AC-3.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty. W1 = "licter.com" (domain with a logo in the brand logo service, to confirm at execution; otherwise use another domain with a Brandfetch logo). W2 = "onclusive.com" (second domain with a different logo). A market is added (United States / English (EN)).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with a confirmed website | W1 = "licter.com" | The avatar shows the logo of licter.com and "licter.com" is under the brand name |
| 2 | When the user edits the website URL | W2 = "onclusive.com" | The avatar still shows the licter.com logo while typing |
| 3 | And the field loses focus | Click outside the field | The grey pulsing placeholder is shown |
| 4 | Then the preview updates to the logo of the new domain |  | The avatar shows the logo of onclusive.com and "onclusive.com" is under the brand name |
| 5 | And the previous domain's logo is never shown next to the new domain |  | At no moment is the licter.com logo shown with "onclusive.com" |
| 6 | When the user clicks "Discover Categories" and then Back |  | Brand & Country shows "onclusive.com" with the onclusive.com logo, not the licter.com logo |

#### TC-GEO-1262-006 - No website shows the lettermark and triggers no logo lookup

- **ACs:** AC-4 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that with no website URL provided, the setup shows the lettermark as the brand visual and no logo lookup happens. Covers AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty. Browser DevTools open on the Network tab (filter "brandfetch" and "favicon"); the names of the logo lookup requests are noted at the first execution of TC-GEO-1262-001.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with an empty website field | DevTools Network cleared | The custom brand card "Licter" is displayed |
| 2 | Then the lettermark is shown as the brand visual |  | The 32px avatar shows the letter "L" and no domain is shown under the brand name |
| 3 | And no logo lookup is sent | DevTools Network | No logo lookup request appears |
| 4 | When the user clicks in the empty website field and then outside it |  | No error, the avatar keeps the letter "L" and still no logo lookup request appears |

#### TC-GEO-1262-007 - Clearing a confirmed website brings back the lettermark

- **ACs:** AC-3, AC-4 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** state
- **Description:** Verify that clearing a confirmed website removes the previewed logo and brings back the lettermark, with no lookup for the empty value. Supports AC-3 and AC-4.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). The custom brand "Licter" is selected and its website field is empty. W1 = "licter.com" (domain with a logo in the brand logo service, to confirm at execution; otherwise use another domain with a Brandfetch logo). Browser DevTools open on the Network tab (filter "brandfetch" and "favicon"); the names of the logo lookup requests are noted at the first execution of TC-GEO-1262-001.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Licter" is selected with a confirmed website | W1 = "licter.com" | The avatar shows the logo of licter.com |
| 2 | When the user clears the website field and the field loses focus | (empty) | No error is shown |
| 3 | Then the lettermark is shown as the brand visual |  | The avatar shows the letter "L"; the licter.com logo and the domain under the brand name are no longer shown |
| 4 | And no logo lookup is sent for the empty value | DevTools Network | No new logo lookup request appears |

#### TC-GEO-1262-008 - Lettermark is shown when the favicon fails to load

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the neutral lettermark is shown when the favicon image fails to load (no brand logo and no favicon available). Covers AC-2 ("a neutral lettermark only if neither is available"). [Added 2026-10-21 after OP-1 (GEO-1262 comment 865598, Quentin Reant): the generic globe is accepted when the site has no favicon (TC-GEO-1262-004); the lettermark remains the fallback when the favicon fails to load (GEO-1262 rule: "The lettermark appears when there is no domain or when the favicon fails to load")]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Lictorix Geo" (offered only through the "Custom Brand" row, checked on staging 2026-10-20; "Lictorix Geo" is a Brandfetch suggestion for licter.com, so it is not used here). The custom brand "Lictorix Geo" is selected and its website field is empty. W4 = "example.com" (no favicon; used on staging 2026-10-20). Browser DevTools open on the Network tab with request blocking enabled for the pattern "s2/favicons" (test aid that makes the favicon image fail to load; favicon image loaded from www.google.com/s2/favicons, observed on staging 2026-10-20).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the custom brand "Lictorix Geo" is selected with an empty website field | C = "Lictorix Geo" | The avatar shows the letter "L" |
| 2 | When request blocking is on for "s2/favicons" and the user enters a domain with no brand logo and the field loses focus | W4 = "example.com"; DevTools request blocking pattern "s2/favicons" | The grey pulsing placeholder is shown |
| 3 | Then the neutral lettermark is shown as the brand visual |   | The 32px avatar shows the letter "L", same letter avatar as the dashboard |
| 4 | And the domain is shown under the brand name |   | "example.com" |

### GEO-1263 — 47.4 Use the captured domain everywhere the brand appears

#### TC-GEO-1263-001 - Captured domain logo is shown on every brand surface of the app

- **ACs:** AC-1 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a custom brand with a captured domain shows the same domain-based logo in the report list, dashboard sidebar and header, rankings target row (Overview and Category view) and competitive views. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). A1 = analysis created after the release with custom brand "Licter" and website "licter.com" (created by TC-GEO-1261-008), at least one run completed; logo L1 noted at setup.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given analysis A1 exists with a captured domain | A1, logo L1 (licter.com) | A1 is listed in the analyses list |
| 2 | When the user opens the report list |  | The A1 row shows logo L1 |
| 3 | And the user opens the Overview of A1 |  | The dashboard sidebar and header show logo L1 |
| 4 | Then the target brand row of the brand rankings in Overview shows logo L1 |  | Logo L1, not the favicon of a domain cited by the AI answers |
| 5 | When the user opens a Category view | First category of A1 | The target brand row of the rankings shows logo L1 |
| 6 | And the user opens a competitive view | e.g. the competitor comparison of A1 | The target brand shows logo L1 |

#### TC-GEO-1263-002 - Captured domain logo is used on the cover and rankings of the PowerPoint and PDF exports

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the PowerPoint and PDF exports of a custom brand with a captured domain use the same domain-based logo on the cover and the rankings target row. Covers AC-1.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). A1 = analysis created after the release with custom brand "Licter" and website "licter.com" (created by TC-GEO-1261-008), at least one run completed; logo L1 noted at setup.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Overview of analysis A1 is open | A1, logo L1 (licter.com) | The sidebar shows logo L1 |
| 2 | When the user exports the analysis as PowerPoint |  | The .pptx file is downloaded |
| 3 | Then the cover slide shows logo L1 |  | Logo L1 of licter.com |
| 4 | And the target brand row of the rankings slide shows logo L1 |  | Logo L1, not the favicon of a domain cited by the AI answers |
| 5 | When the user exports the analysis as PDF |  | The .pdf file is downloaded |
| 6 | Then the cover and the rankings target row of the PDF show logo L1 |  | Logo L1 on both |

#### TC-GEO-1263-003 - Custom brand without website shows the lettermark on every brand surface of the app

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that a custom brand with no website shows the neutral lettermark consistently in the report list, sidebar, header, rankings target row and competitive views, never a logo from a guessed domain (name search or domain cited by the AI answers). Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). A2 = analysis created after the release with custom brand "Licter" and an empty website, at least one run completed; D = the domain cited by the AI answers for the brand (read in Citation Sources, noted before execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given analysis A2 exists for a custom brand created without website | A2, D noted | A2 is listed in the analyses list |
| 2 | When the user opens the report list |  | The A2 row shows the letter "L", not a logo searched by the brand name |
| 3 | And the user opens the Overview of A2 |  | The dashboard sidebar and header show the letter "L", not the favicon of D |
| 4 | Then the target brand row of the brand rankings in Overview shows the letter "L" |  | Letter "L", not the favicon of D |
| 5 | When the user opens a Category view | First category of A2 | The target brand row of the rankings shows the letter "L" |
| 6 | And the user opens a competitive view | e.g. the competitor comparison of A2 | The target brand shows the letter "L" |

#### TC-GEO-1263-004 - Custom brand without website shows the initial on the PowerPoint and PDF exports

- **ACs:** AC-2 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy
- **Description:** Verify that the PowerPoint and PDF exports of a custom brand with no website show the initial on the cover and the rankings target row, never the favicon of a domain cited by the AI answers. Covers AC-2.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). A2 = analysis created after the release with custom brand "Licter" and an empty website, at least one run completed; D = the domain cited by the AI answers for the brand (read in Citation Sources, noted before execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Overview of analysis A2 is open | A2, D noted | The sidebar shows the letter "L" |
| 2 | When the user exports the analysis as PowerPoint |  | The .pptx file is downloaded |
| 3 | Then the cover slide and the target brand row of the rankings slide show the initial |  | Letter "L" on both, never the favicon of D |
| 4 | When the user exports the analysis as PDF |  | The .pdf file is downloaded |
| 5 | Then the cover and the rankings target row of the PDF show the initial |  | Letter "L" on both, never the favicon of D |

#### TC-GEO-1263-005 - Analysis created before the change keeps today's brand logo behaviour

- **ACs:** AC-3 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** state
- **Description:** Verify that an analysis created before the change with no stored brand domain keeps today's logo behaviour on every surface. Covers AC-3. [Validated by PO 2026-10-20: P2 (GEO-1069 comment 865135)] (marker "domain confirmed at setup"). Baseline still missing (B2 open).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). O = analysis created before the release for a custom brand with no stored brand domain (QA to provide the UUID). Baseline screenshots of its logos (report list, sidebar, header, rankings target row, PowerPoint cover and rankings slide) taken before the release is deployed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given analysis O created before the release has no stored brand domain | O (QA to provide), baseline screenshots | O is listed in the analyses list |
| 2 | When the user opens the report list |  | The O row shows the same logo as the baseline (logo searched by the brand name) |
| 3 | And the user opens the Overview of O |  | The sidebar and header show the same logo as the baseline (favicon of the domain most cited by the AI answers) |
| 4 | Then the target brand row of the rankings shows the same logo as the baseline | Overview and one Category view | Favicon of the domain cited by the AI answers, as in the baseline |
| 5 | When the user exports O as PowerPoint |  | The .pptx file is downloaded |
| 6 | Then the cover and the rankings target row show the same visuals as the baseline |  | No surface switched to the lettermark or to another logo |

#### TC-GEO-1263-006 - Competitor logos and brand variant rows are unchanged by the captured domain

- **ACs:** AC-1 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify that the captured-domain logo rule applies to the target brand only: competitor logos and the brand's variant rows in the rankings are unchanged. Supports AC-1 (rule of the "Where the brand logo appears" table).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). A1 = analysis created after the release with custom brand "Licter" and website "licter.com" (created by TC-GEO-1261-008), at least one run completed; logo L1 noted at setup. The rankings of A1 list at least one competitor and one brand variant row (to confirm at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Overview of analysis A1 is open | A1, logo L1 (licter.com) | The brand rankings are displayed |
| 2 | Then only the target brand row shows logo L1 |  | Logo L1 on the target brand row |
| 3 | And each competitor row shows its own logo |  | Competitor logos are not replaced by logo L1 |
| 4 | And the brand variant rows keep their own visuals |  | Variant rows are not replaced by logo L1 |
| 5 | When the user opens a Category view | First category of A1 | Same result: L1 on the target brand row only, competitor and variant rows unchanged |

#### TC-GEO-1263-007 - Selected suggestion with neither domain nor logo now shows the lettermark

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge
- **Description:** Verify the GEO-1263 behaviour change: a selected suggestion that Brandfetch returned with neither domain nor logo (rare) now shows the lettermark. Supports AC-2; qualifies GEO-1260 AC-4 ("flow unchanged"). Conditional on test data.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. S0 = a brand suggestion returned by Brandfetch with neither domain nor logo (rare, QA to find before execution; TC blocked if none is found).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Brand & Country step |  | The brand search is empty |
| 2 | When the user selects a suggestion that has neither domain nor logo | S0 (QA to find) | The selected brand card is displayed, with no website field (GEO-1260 AC-4) |
| 3 | Then the brand card shows the lettermark |  | The avatar shows the initial of S0, no domain under the name |
| 4 | When the user creates the analysis and opens it once a run is completed | Default categories and prompts | The dashboard of the analysis opens |
| 5 | Then the lettermark is shown in the sidebar, header and rankings target row |  | The initial of S0, never a logo searched by name or the favicon of a domain cited by the AI answers |

#### TC-GEO-1263-008 - Prompts table shows the captured-domain logo for the target brand as winner

- **ACs:** AC-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** Functional | **Coverage:** happy | **Added:** sync 2026-10-20
- **Description:** Verify that in the prompts table, a prompt won by the target brand shows the logo of the captured domain. Covers AC-1 (place "Prompts table, target winner" of the "Where the brand logo appears" table; epic In scope (Updated 2026-10-20): "the winner domain in the prompts table").
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). A1 = analysis created after the release with custom brand "Licter" and website "licter.com" (created by TC-GEO-1261-008), at least one run completed; logo L1 noted at setup. At least one prompt of A1 has "Licter" as winner in the prompts table (to confirm at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Overview of analysis A1 is open | A1, logo L1 (licter.com) | The sidebar shows logo L1 |
| 2 | When the user opens the prompts table of A1 |  | The prompts are listed with their winner |
| 3 | And the user locates a prompt whose winner is the target brand | "Licter" | The prompt row shows "Licter" as winner |
| 4 | Then the winner cell shows logo L1 |  | Logo L1 of licter.com, not a lettermark and not the favicon of a domain cited by the AI answers |

#### TC-GEO-1263-009 - Prompts table shows the lettermark for a custom brand without website as winner

- **ACs:** AC-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge | **Added:** sync 2026-10-20
- **Description:** Verify that in the prompts table, a prompt won by a custom brand created without website shows the neutral lettermark, never a logo from a guessed domain. Covers AC-2 ("the same places", including "Prompts table, target winner"; epic In scope (Updated 2026-10-20)).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). A2 = analysis created after the release with custom brand "Licter" and an empty website, at least one run completed; D = the domain cited by the AI answers for the brand (read in Citation Sources, noted before execution). At least one prompt of A2 has "Licter" as winner in the prompts table (to confirm at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the Overview of analysis A2 is open | A2, D noted | The sidebar shows the letter "L" |
| 2 | When the user opens the prompts table of A2 |  | The prompts are listed with their winner |
| 3 | And the user locates a prompt whose winner is the target brand | "Licter" | The prompt row shows "Licter" as winner |
| 4 | Then the winner cell shows the lettermark |  | Letter "L", never the favicon of D nor a logo searched by the brand name |

#### TC-GEO-1263-010 - Category discovery uses the captured website as the brand domain, like a selected suggestion

- **ACs:** Supports GEO-1261 AC-3; epic In scope | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy | **Added:** sync 2026-10-20
- **Description:** Verify that the website entered for a custom brand is sent to category discovery as the brand domain, in the same way as the domain of a selected suggestion. Supports GEO-1261 AC-3; epic In scope (Updated 2026-10-20): "It therefore also feeds category discovery". The discovered categories are not asserted: on staging the Brandfetch quota degrades the brand description used by discovery (GEO-1179, GEO-1069 comment 864039). [Based on the epic In scope text (Updated 2026-10-20) — GEO-1263 has no AC for it yet; AC requested from the PO]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). The new-analysis wizard is opened from New Analysis on the GEO dashboard; if the unbranded feature flag is ON, "Brand analysis" is chosen on the Analysis Type step. The user is on the Brand & Country step. Custom brand C = "Licter" (to confirm at execution that the name is offered only through the "Custom Brand" row, not as a Brandfetch suggestion; otherwise use another name not suggested). S = "Nike" (nike.com) as reference suggestion. Browser DevTools open on the Network tab.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user selects the suggestion "Nike", adds a market and clicks "Discover Categories" | S = "Nike" (nike.com), United States / English (EN), DevTools Network | The category discovery request is visible in DevTools; the field carrying "nike.com" is noted as the brand domain field |
| 2 | When the user goes back, selects the "Custom Brand" row (Licter) and enters the website | C = "Licter", "licter.com" | "licter.com" is shown under the brand name, no error |
| 3 | And the user clicks "Discover Categories" |  | The discovery loading screen is displayed |
| 4 | Then the discovery request carries the captured domain as the brand domain | DevTools Network | The brand domain field noted for "Nike" contains "licter.com" |

#### TC-GEO-1263-011 - Sources on the captured domain are treated as the brand's own domain

- **ACs:** Supports GEO-1261 AC-3; epic In scope | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** happy | **Added:** sync 2026-10-20
- **Description:** Verify that sources on the captured domain are treated as the brand's own domain, as for a selected suggestion: never proposed as target sources (owned-domain exclusion, same rule as GEO-1116 AC-4 in GEO-R1.2). Epic In scope (Updated 2026-10-20): "It therefore also feeds … the owned-domain exclusion". Supports GEO-1261 AC-3. [Based on the epic In scope text (Updated 2026-10-20) — GEO-1263 has no AC for it yet; AC requested from the PO]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). A1 = analysis created after the release with custom brand "Licter" and website "licter.com" (created by TC-GEO-1261-008), at least one run completed; logo L1 noted at setup. The AI answers of A1 cite licter.com at least once (read in AI Citation Sources, to confirm at execution).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given analysis A1 is open and its AI answers cite licter.com | A1, licter.com | licter.com is listed in AI Citation Sources |
| 2 | When the user reads how licter.com is classified in AI Citation Sources |  | The classification of licter.com is recorded (Owned Media expected, as for the domain of a selected suggestion) |
| 3 | And the user opens the Target Sources of the Action Center | A1 | The target source cards are listed |
| 4 | Then licter.com is never proposed as a target source |  | No target source card for licter.com (owned domain excluded, as for a selected suggestion) |

#### TC-GEO-1263-012 - Competitor discovery treats the captured domain as the analysed brand's domain

- **ACs:** Supports GEO-1261 AC-3; epic In scope | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** Functional | **Coverage:** edge | **Added:** sync 2026-10-20
- **Description:** Verify that the background competitor discovery (GEO-1251) treats the captured website as the analysed brand's domain, as for a selected suggestion: a brand whose website belongs to that domain is left out of the competitors. Epic In scope (Updated 2026-10-20): "It therefore also feeds … competitor discovery"; cross-epic with the GEO-1251 rule (GEO-1002, added 2026-10-13). Supports GEO-1261 AC-3. Conditional on test data (TC blocked if no suitable data is found). [Based on the epic In scope text (Updated 2026-10-20) — GEO-1263 has no AC for it yet; AC requested from the PO]
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, user logged in with the QA account, interface language English (strings checked against the en-US copy validated by the PO on 2026-10-20; en-GB machine translation still to be reviewed), organisation switcher set to an organisation with a prompt pool configured in the back office (e.g. "QA-GEO", to confirm). B = analysis created after the release with a custom brand (chosen through the "Custom Brand" row) whose website has a known sub-brand on its own domain (e.g. website "nike.com" with the sub-brand "Jordan" on jordan.nike.com; QA to find suitable data, TC blocked if none), with at least one market and category keeping only Competitive prompts (no Visibility prompt), at least one run completed.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given analysis B exists with a custom brand whose website has a known sub-brand | B, e.g. website "nike.com", sub-brand "Jordan" (jordan.nike.com) | B is listed with at least one run completed |
| 2 | When the user opens the Competitive results of the market and category that keep only Competitive prompts |  | The Competitive prompts were sent with competitors named in place of the placeholders |
| 3 | Then no competitor named belongs to the captured domain |  | "Jordan" (or any brand whose website is on the captured domain) is not among the competitors, as for the selected suggestion "Nike" |
