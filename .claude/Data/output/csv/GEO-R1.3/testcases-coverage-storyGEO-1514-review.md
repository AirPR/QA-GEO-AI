# GEO-1514 Say country everywhere instead of market (web app and exports) — task test case review (GEO-R1.3, generated 2026-10-28)

**Sources (read-only):** Jira GEO-1514 (Task, Ready for QA, fixVersion 1.3, assignee Youssef.AitLaydi, reporter Quentin.Reant; Relates GEO-1209 and GEO-1507; one comment of the PO on 2026-10-27, a reminder to the dev), read on 2026-10-28 and saved as `apps/geo/GEO-R1.3/NO-EPIC/TASK_GEO-1514_Say_country_everywhere_instead_of_market.md`. Run notes: `apps/geo/GEO-R1.3/GEO-1002-RUN-FINDINGS.md` (side findings of 2026-10-27). Mode: story only, no `--figma`.

**Scope:** the 21 web texts (`frontend/src/i18n/locales/*.json`) and the 8 export texts (`ExportI18n.java`) of the ticket tables, with the exact EN (en-US = en-GB), fr-FR and es-ES values. No AC in the ticket: each table row is numbered as a requirement (W-1 to W-21, E-1 to E-8) plus the sweep S-1 asked by QA. **Out of scope (as stated in the ticket):** the 5 discovery and switch texts already in the GEO-1209 comment (`wizard.discovering.subtitle`, `duration`, `subtitleTopic`, `durationTopic`, `wizard.analysisType.switchBody`) and the texts rewritten by GEO-1507 (`wizard.step1.marketsHint`, `wizard.category.infoBody`). Keys and `{{market}}` variables are not tested. **No epic parent yet** (see `apps/geo/GEO-R1.3/NO-EPIC/README.md`).

**CSV:** `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-storyGEO-1514.csv` — 10 TCs, 73 step rows (+1 header), 16 columns, `;` separator, fields quoted with doubled quotes when they hold `;` or `"`, UTF-8 without BOM, LF. One Cucumber step per row; case-level fields on the first row of each TC only. **QA Parent empty** (no epic parent yet — set it when the PO / dev names the epic), QA Story/Task = GEO-1514, Components = GEO, QA Component = GEO Module, Labels empty, Test Type = Manual, QA Regression = Yes for Urgent/High. Not imported to Quality Plus, nothing written to Jira.

## Summary

| Metric | Value |
|---|---|
| Test cases | 10 |
| Steps (CSV rows) | 73 |
| Coverage | happy 8 · edge 2 · error 0 · state 0 |
| Priority | Urgent 0 · High 2 · Medium 7 · Low 1 |
| UI / Functional | UI 10 · Functional 0 |
| Smoke = Yes | 1 |
| QA Regression = Yes | 2 |
| AC coverage | 30 / 30 requirements (21 web keys W-1..W-21, 8 export keys E-1..E-8, sweep S-1) |

| Ticket | Type | Jira status | ACs | TCs | Steps | Smoke | Happy | Edge | Error | State |
|---|---|---|---|---|---|---|---|---|---|---|
| GEO-1514 | Task | Ready for QA | 30 | 10 | 73 | 1 | 8 | 2 | 0 | 0 |

## Language switch rule

Switching the account language to fr-FR / es-ES is allowed **only for these language TCs** (001–009). The language is a saved account setting: each TC ends with "set the language back to British English (en-GB)", checked with `GET https://staging-geo.onclusive.com/geo/api/v1/auth/me`. TC-007 does the same for the PQL account. The sweep (010) runs in en-GB only.

## Point to check first

- **Known observation (run of 2026-10-27, not posted):** the wizard "Add category" modal still said "market" (side finding in `GEO-1002-RUN-FINDINGS.md`, before GEO-1514 was Ready for QA). Check it first: TC-GEO-1514-005 steps 2–3 and TC-GEO-1514-010 step 1.

## Test data

| Ref | Description | Used by |
|---|---|---|
| Wizard | QA-GEO, unbranded flag ON, Brand analysis, brand "Decathlon"; countries GB (EN), FR (FR), ES (ES) as each TC says | 001–005, 010 |
| R | Disposable QA-GEO analysis with France - French (FR): one Visibility prompt in C1 and one Brand Image prompt in France | 006 |
| A | Read-only analysis with 2+ countries: Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e | 008, 009, 010 |
| PQL | assiya.benramdane+pql@onclusive.com (Lite plan), upsell page and lite result | 007, 010 |
| Disposable | 5 analyses of 5 prompts each, created then deleted (user approval first) | 004 |

## AC inventory and traceability

### GEO-1514 — Say country everywhere instead of market (Task, Ready for QA)

| Req | Key | TC |
|---|---|---|
| W-1 | `wizard.category.noResultsHint` | TC-GEO-1514-001 |
| W-2 | `wizard.category.translateFailed` | TC-GEO-1514-001 |
| W-3 | `wizard.promptTable.colMarket` | TC-GEO-1514-002 |
| W-4 | `wizard.promptTable.duplicatePrompt` | TC-GEO-1514-002 |
| W-5 | `wizard.promptTable.noResultsMarket` | TC-GEO-1514-002 |
| W-6 | `wizard.review.marketsTitle` | TC-GEO-1514-003 |
| W-7 | `wizard.review.dropped.markets_one` | TC-GEO-1514-003 |
| W-8 | `wizard.review.dropped.markets_other` | TC-GEO-1514-003 |
| W-9 | `wizard.analysisCreated.markets_one` | TC-GEO-1514-004 |
| W-10 | `wizard.analysisCreated.markets_other` | TC-GEO-1514-004 |
| W-11 | `wizard.categoryModal.subtitle` | TC-GEO-1514-005 |
| W-12 | `wizard.categoryModal.translationsHint` | TC-GEO-1514-005 |
| W-13 | `wizard.deleteCategory.impact_one` | TC-GEO-1514-005 |
| W-14 | `wizard.deleteCategory.impact_other` | TC-GEO-1514-005 |
| W-15 | `views.manageScope.prompts.subtitle` | TC-GEO-1514-006 |
| W-16 | `views.manageScope.prompts.stopWarning.groupInCategory` (FR / ES only, EN unchanged) | TC-GEO-1514-006 |
| W-17 | `views.manageScope.prompts.stopWarning.groupInMarket` (FR / ES only, EN unchanged) | TC-GEO-1514-006 |
| W-18 | `views.upsell.showcase1Bullet2` | TC-GEO-1514-007 |
| W-19 | `views.upsell.marketLabel` | TC-GEO-1514-007 |
| W-20 | `views.upsell.result.prompts.colMarket` | TC-GEO-1514-007 |
| W-21 | `views.upsell.result.taste.desc` | TC-GEO-1514-007 |
| E-1 | `cover.markets` | TC-GEO-1514-008 |
| E-2 | `cover.allMarkets` (FR / ES unchanged) | TC-GEO-1514-008 |
| E-3 | `slide.matrix.sub` | TC-GEO-1514-008 |
| E-4 | `xlsx.brandPillars.subtitle` | TC-GEO-1514-009 |
| E-5 | `xlsx.categoryPrioritization` | TC-GEO-1514-009 |
| E-6 | `col.market` | TC-GEO-1514-009 |
| E-7 | `slide.timeEvolution.bandSub` | TC-GEO-1514-008 |
| E-8 | `xlsx.te.markets` | TC-GEO-1514-009 |
| S-1 | `Sweep:` no visible "market" left in en-GB (asked by QA) | TC-GEO-1514-010 |

Every requirement has a TC; TCs are grouped by screen (as asked), one TC = one screen, the 3 languages inside.

| TC | Screen | Requirements |
|---|---|---|
| 001 | Wizard — Categories step | W-1, W-2 |
| 002 | Wizard — prompt table | W-3, W-4, W-5 |
| 003 | Wizard — Summary (review) | W-6, W-7, W-8 |
| 004 | Wizard — analysis created | W-9, W-10 |
| 005 | Wizard — Add category modal, remove category dialog | W-11 to W-14 |
| 006 | Manage Scope — Prompts subtitle, stop warnings FR / ES | W-15 to W-17 |
| 007 | Upsell page and lite result | W-18 to W-21 |
| 008 | PPTX export — cover and slides | E-1, E-2, E-3, E-7 |
| 009 | XLSX export | E-4, E-5, E-6, E-8 |
| 010 | Sweep en-GB: no "market" left | S-1 |

## Ambiguous points and open questions (flagged, not guessed)

- **OP-10 Add category modal:** still "market" on 2026-10-27 (see above). If still there, it is a GEO-1514 gap (or a key the ticket did not list).
- **OP-11 Stop warnings in EN:** "(unchanged)" in the ticket — EN text not asserted by TC-006; the current EN text is recorded.
- **OP-12 translateFailed (W-2):** the message shows only when a category translation fails after adding countries or languages; no way for QA to force it. Dev help needed, otherwise TC-001 steps 3, 5 and 7 are BLOCKED.
- **OP-13 Analysis created (W-9, W-10):** needs 5 disposable analyses (EN 1 and 2 countries, FR 2, ES 1 and 2) — user approval before creating them (QA autonomy rule), 5 prompts each, deleted at the end. FR one / other differ only by the number ("1 pays" / "2 pays").
- **OP-14 Upsell page:** the route of the upsell page and the lite quota of the PQL account are not in the ticket; reuse the latest lite result if the quota blocks a new run.
- **OP-15 Placeholder values:** the exact rendering of `{{names}}`, `{{values}}` and `{0}` (e.g. "France (FR)" vs "France · French") is not in the ticket; the TCs assert the fixed words and that the placeholders are filled.
- **OP-16 col.market:** the ticket does not say where it is used; checked in the XLSX (TC-009) and in the PPTX if a Country column appears.
- **OP-17 Sweep scope:** aria-labels (e.g. the F-09 country filter label) are not visible text; record them separately if they still say market.
- **Follow-up (not done here):** once GEO-1514 is verified, the R1.3 epic CSVs (GEO-1002, 1209, 1069, 1068) still quote "market" in expected UI texts — to align in a later pass (not edited, as asked).

## Technical content filtered

- File paths (`frontend/src/i18n/locales/*.json`, `ExportI18n.java`) and the "keys stay as they are" rule: context only, no TC.
- The country + language explanation (market key = language + country) is the reason for the wording; checked through the texts themselves (W-1, W-2, W-4, W-11, W-12).

## TCs that need special setup

- **Language switch:** 001–009 (restore en-GB at the end, check /auth/me).
- **Creates data:** 004 (5 disposable analyses, approval first); 006 needs disposable analysis R.
- **Dev help:** 001 (translation failure).
- **PQL account:** 007, 010 step 6.
- **Exports:** 008, 009, 010 step 7 (open the files).

## Test cases

### GEO-1514 — Say country everywhere instead of market (web app and exports) (Task, Ready for QA)

#### TC-GEO-1514-001 - Wizard Categories step says country and language in EN FR and ES

- **ACs:** W-1, W-2 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge | **Flag:** W-2 needs a translation failure (OP-12)
- **Description:** Verify the Categories step texts wizard.category.noResultsHint and wizard.category.translateFailed in en-GB, fr-FR and es-ES. Covers W-1 and W-2 (GEO-1514 web keys). wizard.category.infoBody is out of scope (GEO-1507).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1514 deployed, user logged in with the QA account, organisation switcher set to "QA-GEO". The interface language is a saved account setting (user menu > language): it starts in British English (en-GB, checked with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me), is switched to Français (fr-FR) and Español (es-ES) only for this TC, and is set back to British English (en-GB) at the end (checked again with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). Expected texts are the GEO-1514 values: the keys and the {{market}} variables are unchanged, so {{count}}, {{names}}, {{values}}, {{type}}, {{category}}, {{market}} and {0} are shown filled with the real values. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the wizard is opened with New Analysis on the GEO dashboard, the Brand analysis card is selected and Continue is clicked. The wizard is left without creating the analysis unless the TC says otherwise. Scope: brand "Decathlon", country United Kingdom - English (EN). translateFailed shows only when a category translation fails after new countries or languages are added: a dev may have to force the failure (OP-12); if it cannot be triggered, steps 3, 5 and 7 are marked BLOCKED.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step with every detected category removed | Brand "Decathlon", country United Kingdom - English (EN) | The empty state reads "Add your own categories; each one is translated for every country and language." |
| 2 | When the user adds a country and the translation of a category fails | Back to Brand & Country, add France - French (FR), Continue (translation failure forced by the dev if needed) | The country is added and the Categories step is shown again |
| 3 | Then the translation failure message says countries or languages |   | "We could not translate some categories for your new countries or languages. Check their translations." |
| 4 | When the user switches the language to Français (fr-FR) and replays steps 1 and 2 | Settings > Interface Language: Français | "Ajoutez vos propres catégories ; chacune est traduite pour chaque pays et chaque langue." |
| 5 | Then the French translation failure message is shown |   | "Nous n'avons pas pu traduire certaines catégories pour vos nouveaux pays ou langues. Vérifiez leurs traductions." |
| 6 | When the user switches the language to Español (es-ES) and replays steps 1 and 2 | Settings > Interface Language: Español | "Añada sus propias categorías; cada una se traduce para cada país e idioma." |
| 7 | Then the Spanish translation failure message is shown |   | "No hemos podido traducir algunas categorías para sus nuevos países o idiomas. Revise sus traducciones." |
| 8 | And the user sets the language back to British English (en-GB) | Settings > Interface Language: British English; GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The interface is in British English and /auth/me shows en-GB |

#### TC-GEO-1514-002 - Wizard prompt table says Country in the column, the duplicate message and the no-result filter

- **ACs:** W-3, W-4, W-5 | **Priority:** High | **Smoke:** Yes | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify the prompt table texts wizard.promptTable.colMarket, duplicatePrompt and noResultsMarket in en-GB, fr-FR and es-ES. Covers W-3, W-4 and W-5 (GEO-1514 web keys). The duplicate message names the language because the duplicate check compares it.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1514 deployed, user logged in with the QA account, organisation switcher set to "QA-GEO". The interface language is a saved account setting (user menu > language): it starts in British English (en-GB, checked with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me), is switched to Français (fr-FR) and Español (es-ES) only for this TC, and is set back to British English (en-GB) at the end (checked again with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). Expected texts are the GEO-1514 values: the keys and the {{market}} variables are unchanged, so {{count}}, {{names}}, {{values}}, {{type}}, {{category}}, {{market}} and {0} are shown filled with the real values. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the wizard is opened with New Analysis on the GEO dashboard, the Brand analysis card is selected and Continue is clicked. The wizard is left without creating the analysis unless the TC says otherwise. Scope: brand "Decathlon", countries United Kingdom - English (EN) and France - French (FR), 1 category kept, user on the Prompts step.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Prompts step | Brand "Decathlon", countries GB (EN) and FR (FR), 1 category | The country column header reads "Country" |
| 2 | When the user adds a prompt that already exists for the same country, language, category and type | Text of an existing suggested prompt, same category, same type, country GB (EN) | "This prompt already exists for this country, language, category and type." and the confirm button is disabled |
| 3 | And the user filters the table so that no row matches with a country selected | Search "zzzz" + country filter GB (EN) | The no-result text names the filter as "country " followed by the selected country (e.g. "country GB (EN)") |
| 4 | When the user switches the language to Français (fr-FR) and replays steps 1 to 3 | Settings > Interface Language: Français | Column "Pays"; "Ce prompt existe déjà pour ce pays, cette langue, cette catégorie et ce type."; the no-result text names the filter as "le pays " followed by the selected country |
| 5 | When the user switches the language to Español (es-ES) and replays steps 1 to 3 | Settings > Interface Language: Español | Column "País"; "Este prompt ya existe para este país, este idioma, esta categoría y este tipo."; the no-result text names the filter as "el país " followed by the selected country |
| 6 | Then no prompt table text says market |   | In the 3 languages no visible text of the table says market / marché / mercado |
| 7 | And the user sets the language back to British English (en-GB) | Settings > Interface Language: British English; GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The interface is in British English and /auth/me shows en-GB |

#### TC-GEO-1514-003 - Wizard Summary says Countries and the dropped countries in EN FR and ES

- **ACs:** W-6, W-7, W-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify wizard.review.marketsTitle and wizard.review.dropped.markets_one / _other in en-GB, fr-FR and es-ES. Covers W-6, W-7 and W-8 (GEO-1514 web keys). A country is dropped when none of its prompts is ticked.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1514 deployed, user logged in with the QA account, organisation switcher set to "QA-GEO". The interface language is a saved account setting (user menu > language): it starts in British English (en-GB, checked with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me), is switched to Français (fr-FR) and Español (es-ES) only for this TC, and is set back to British English (en-GB) at the end (checked again with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). Expected texts are the GEO-1514 values: the keys and the {{market}} variables are unchanged, so {{count}}, {{names}}, {{values}}, {{type}}, {{category}}, {{market}} and {0} are shown filled with the real values. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the wizard is opened with New Analysis on the GEO dashboard, the Brand analysis card is selected and Continue is clicked. The wizard is left without creating the analysis unless the TC says otherwise. Scope: brand "Decathlon", countries United Kingdom - English (EN), France - French (FR) and Spain - Spanish (ES), 1 category. {names} = the dropped country names as shown by the app.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Summary step with 3 countries kept | Brand "Decathlon", countries GB (EN), FR (FR), ES (ES), 1 category | The countries section title reads "Countries" |
| 2 | When the user unticks every prompt of one country and comes back to the Summary step | Prompts step: untick all prompts of FR (FR) | "1 country will be dropped: {names}." with the French country name |
| 3 | And the user unticks every prompt of a second country and comes back to the Summary step | Prompts step: untick all prompts of ES (ES) | "2 countries will be dropped: {names}." with both names |
| 4 | When the user switches the language to Français (fr-FR) and replays steps 1 to 3 in a new wizard | Settings > Interface Language: Français | Title "Pays"; "1 pays sera exclu : {names}."; "2 pays seront exclus : {names}." |
| 5 | When the user switches the language to Español (es-ES) and replays steps 1 to 3 in a new wizard | Settings > Interface Language: Español | Title "Países"; "Se excluirá 1 país: {names}."; "Se excluirán 2 países: {names}." |
| 6 | Then the user leaves the wizard without creating the analysis | Back to Dashboard > confirm leaving | No analysis is created |
| 7 | And the user sets the language back to British English (en-GB) | Settings > Interface Language: British English; GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The interface is in British English and /auth/me shows en-GB |

#### TC-GEO-1514-004 - Analysis created screen counts countries in EN FR and ES

- **ACs:** W-9, W-10 | **Priority:** Low | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy | **Flag:** creates 5 disposable analyses - user approval needed (OP-13)
- **Description:** Verify wizard.analysisCreated.markets_one / _other in en-GB, fr-FR and es-ES. Covers W-9 and W-10 (GEO-1514 web keys). Creates disposable analyses (user approval needed before execution), deleted at the end.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1514 deployed, user logged in with the QA account, organisation switcher set to "QA-GEO". The interface language is a saved account setting (user menu > language): it starts in British English (en-GB, checked with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me), is switched to Français (fr-FR) and Español (es-ES) only for this TC, and is set back to British English (en-GB) at the end (checked again with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). Expected texts are the GEO-1514 values: the keys and the {{market}} variables are unchanged, so {{count}}, {{names}}, {{values}}, {{type}}, {{category}}, {{market}} and {0} are shown filled with the real values. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the wizard is opened with New Analysis on the GEO dashboard, the Brand analysis card is selected and Continue is clicked. The wizard is left without creating the analysis unless the TC says otherwise. Creating analyses needs the user approval first (OP-13). Each disposable analysis keeps only 5 prompts (shared pool) and is deleted at the end of the test. Scope: brand "Decathlon", 1 category, 5 prompts ticked; 1 country = United Kingdom - English (EN); 2 countries = United Kingdom - English (EN) and France - French (FR).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Summary step of an analysis with 1 country | Brand "Decathlon", GB (EN), 1 category, 5 prompts ticked | The Summary step is displayed |
| 2 | When the user creates the analysis | Create analysis | The analysis created screen reads "1 country" |
| 3 | And the user creates a second disposable analysis with 2 countries | GB (EN) and FR (FR), 5 prompts ticked | The analysis created screen reads "2 countries" |
| 4 | When the user switches the language to Français (fr-FR) and creates a disposable analysis with 2 countries | Settings > Interface Language: Français | The analysis created screen reads "2 pays" |
| 5 | When the user switches the language to Español (es-ES) and creates a disposable analysis with 1 country | Settings > Interface Language: Español | The analysis created screen reads "1 país" |
| 6 | And the user creates a disposable analysis with 2 countries in Spanish | GB (EN) and FR (FR), 5 prompts ticked | The analysis created screen reads "2 países" |
| 7 | Then the user deletes the 5 disposable analyses | GEO dashboard > Analysis table > delete | The 5 analyses are gone and their slots are back in the pool |
| 8 | And the user sets the language back to British English (en-GB) | Settings > Interface Language: British English; GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The interface is in British English and /auth/me shows en-GB |

#### TC-GEO-1514-005 - Add category modal and delete category dialog say country and language in EN FR and ES

- **ACs:** W-11, W-12, W-13, W-14 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy | **Flag:** check first: modal still said market on 2026-10-27 (OP-10)
- **Description:** Verify wizard.categoryModal.subtitle, wizard.categoryModal.translationsHint and wizard.deleteCategory.impact_one / _other in en-GB, fr-FR and es-ES. Covers W-11 to W-14 (GEO-1514 web keys). Known observation of the 2026-10-27 run (not posted): the Add category modal still said "market" - check it first.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1514 deployed, user logged in with the QA account, organisation switcher set to "QA-GEO". The interface language is a saved account setting (user menu > language): it starts in British English (en-GB, checked with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me), is switched to Français (fr-FR) and Español (es-ES) only for this TC, and is set back to British English (en-GB) at the end (checked again with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). Expected texts are the GEO-1514 values: the keys and the {{market}} variables are unchanged, so {{count}}, {{names}}, {{values}}, {{type}}, {{category}}, {{market}} and {0} are shown filled with the real values. Unbranded feature flag ON (5-step wizard: Analysis Type, Brand & Country, Categories, Prompts, Summary); the wizard is opened with New Analysis on the GEO dashboard, the Brand analysis card is selected and Continue is clicked. The wizard is left without creating the analysis unless the TC says otherwise. Scope: brand "Decathlon", countries United Kingdom - English (EN) and France - French (FR), 2 categories C1 and C2 kept from discovery.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on the Categories step with 2 countries | Brand "Decathlon", GB (EN) and FR (FR) | The detected categories are listed |
| 2 | When the user opens the Add category modal | Add category | The subtitle reads "Translated for each country and language by AI Sense" |
| 3 | And the user types a category name | Name "Running shoes" | The hint reads "AI Sense translates the category for each country and language. Use the edit icon to adjust any translation." |
| 4 | When the user deletes every prompt of category C1 but one, goes back to Categories and removes C1 | Prompts step: delete (trash icon) every prompt of C1 but one, unticking is not enough because the count includes unticked prompts (same rule as GEO-1501); Back; remove C1; Cancel | The dialog reads "1 prompt across your countries will be deleted with it." |
| 5 | And the user removes category C2 with N prompts kept | Remove C2; Cancel | The dialog reads "N prompts across your countries will be deleted with it." with the real N |
| 6 | When the user switches the language to Français (fr-FR) and replays steps 1 to 5 in a new wizard | Settings > Interface Language: Français | "Traduite pour chaque pays et chaque langue par AI Sense"; "AI Sense traduit la catégorie pour chaque pays et chaque langue. Utilisez l'icône de modification pour ajuster une traduction."; "1 prompt de vos pays sera supprimé avec elle."; "N prompts de vos pays seront supprimés avec elle." |
| 7 | When the user switches the language to Español (es-ES) and replays steps 1 to 5 in a new wizard | Settings > Interface Language: Español | "Traducida para cada país e idioma por AI Sense"; "AI Sense traduce la categoría para cada país e idioma. Use el icono de edición para ajustar cualquier traducción."; "1 prompt de sus países se eliminará con ella."; "N prompts de sus países se eliminarán con ella." |
| 8 | And the user sets the language back to British English (en-GB) | Settings > Interface Language: British English; GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The interface is in British English and /auth/me shows en-GB |

#### TC-GEO-1514-006 - Manage Scope prompts subtitle and stop warnings say country in EN FR and ES

- **ACs:** W-15, W-16, W-17 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** edge
- **Description:** Verify views.manageScope.prompts.subtitle in en-GB, fr-FR and es-ES, and the stop warnings groupInCategory / groupInMarket in fr-FR and es-ES (EN unchanged by GEO-1514). Covers W-15, W-16 and W-17 (GEO-1514 web keys).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1514 deployed, user logged in with the QA account, organisation switcher set to "QA-GEO". The interface language is a saved account setting (user menu > language): it starts in British English (en-GB, checked with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me), is switched to Français (fr-FR) and Español (es-ES) only for this TC, and is set back to British English (en-GB) at the end (checked again with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). Expected texts are the GEO-1514 values: the keys and the {{market}} variables are unchanged, so {{count}}, {{names}}, {{values}}, {{type}}, {{category}}, {{market}} and {0} are shown filled with the real values. Disposable QA-GEO analysis R with country France - French (FR): category C1 has a single Visibility prompt in France (FR) and there is a single Brand Image prompt in France (FR). Manage Scope saves a tick at once: the stop warnings are cancelled, nothing is unticked. {type}, {category} and {country} are the real values shown.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on Manage Scope > Prompts of analysis R in en-GB | Analysis R > Manage Scope > Prompts | The subtitle reads "Add, edit and remove the prompts asked to the AI engines — per country. No need to recreate the analysis." |
| 2 | When the user switches the language to Français (fr-FR) and reopens Manage Scope > Prompts | Settings > Interface Language: Français | The subtitle reads "Ajoutez, modifiez et supprimez les prompts adressés aux moteurs d'IA — par pays. Pas besoin de recréer l'analyse." |
| 3 | And the user unticks the last Visibility prompt of category C1 in France | C1 / Visibility / France (FR); Cancel | "C'est le dernier prompt de type {type} de la catégorie {category} pour le pays {country}." with the real values |
| 4 | And the user unticks the last Brand Image prompt in France | Brand Image / France (FR); Cancel | "C'est le dernier prompt de type {type} pour le pays {country}." with the real values |
| 5 | When the user switches the language to Español (es-ES) and reopens Manage Scope > Prompts | Settings > Interface Language: Español | The subtitle reads "Añada, edite y elimine los prompts enviados a los motores de IA, por país. No es necesario recrear el análisis." |
| 6 | And the user replays the last Visibility prompt of category C1 | C1 / Visibility / France (FR); Cancel | "Es el último prompt de tipo {type} de la categoría {category} en el país {country}." with the real values |
| 7 | Then the last Brand Image prompt warning says country | Brand Image / France (FR); Cancel | "Es el último prompt de tipo {type} en el país {country}." with the real values; nothing was unticked |
| 8 | And the user sets the language back to British English (en-GB) | Settings > Interface Language: British English; GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The interface is in British English and /auth/me shows en-GB |

#### TC-GEO-1514-007 - Upsell page and lite result say Country in EN FR and ES

- **ACs:** W-18, W-19, W-20, W-21 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy | **Flag:** PQL account and lite quota (OP-14)
- **Description:** Verify views.upsell.showcase1Bullet2, views.upsell.marketLabel, views.upsell.result.prompts.colMarket and views.upsell.result.taste.desc in en-GB, fr-FR and es-ES. Covers W-18 to W-21 (GEO-1514 web keys).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1514 deployed, user logged in with the PQL account assiya.benramdane+pql@onclusive.com (Lite plan) on the upsell page (lite analysis form and result). The interface language is a saved account setting (user menu > language): it starts in British English (en-GB, checked with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me), is switched to Français (fr-FR) and Español (es-ES) only for this TC, and is set back to British English (en-GB) at the end (checked again with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). Expected texts are the GEO-1514 values: the keys and the {{market}} variables are unchanged, so {{count}}, {{names}}, {{values}}, {{type}}, {{category}}, {{market}} and {0} are shown filled with the real values. If the lite quota blocks a new run, the latest lite result is reopened (OP-14).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the PQL user is on the upsell page in en-GB | PQL account, upsell page | "Track brand presence in any country and language" in the showcase; the lite form field label reads "Country" |
| 2 | When the user runs a lite analysis | Brand "Decathlon", country France | The Prompts table column reads "Country"; the taste block reads "The full GEO Analytics platform tracks every country, category and competitor across all major AI engines — with sources, sentiment and an action plan. See it on your real data." |
| 3 | When the user switches the language to Français (fr-FR) and reopens the upsell page | Settings > Interface Language: Français | "Suivez la présence de votre marque dans tout pays et toute langue"; field label "Pays" |
| 4 | And the user opens the lite result in French | Same lite analysis | Column "Pays"; "La plateforme GEO Analytics complète suit chaque pays, catégorie et concurrent sur tous les principaux moteurs IA — avec les sources, le sentiment et un plan d'action. Voyez-la avec vos vraies données." |
| 5 | When the user switches the language to Español (es-ES) and reopens the upsell page | Settings > Interface Language: Español | "Realice un seguimiento de la presencia de su marca en cualquier país e idioma"; field label "País" |
| 6 | Then the lite result says País in Spanish | Same lite analysis | Column "País"; "La plataforma GEO Analytics completa rastrea cada país, categoría y competidor en todos los principales motores de IA — con fuentes, sentimiento y un plan de acción. Véala con sus datos reales." |
| 7 | And the PQL user sets the language back to British English (en-GB) | Settings > Interface Language: British English; GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The interface is in British English and /auth/me shows en-GB |

#### TC-GEO-1514-008 - PPTX export cover and slides say countries in EN FR and ES

- **ACs:** E-1, E-2, E-3, E-7 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify the PPTX export texts cover.markets, cover.allMarkets, slide.matrix.sub and slide.timeEvolution.bandSub in en-GB, fr-FR and es-ES. Covers E-1, E-2, E-3 and E-7 (GEO-1514 export keys). cover.allMarkets is unchanged in FR and ES ("Tous les pays", "Todos los países").
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1514 deployed, user logged in with the QA account, organisation switcher set to "QA-GEO". The interface language is a saved account setting (user menu > language): it starts in British English (en-GB, checked with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me), is switched to Français (fr-FR) and Español (es-ES) only for this TC, and is set back to British English (en-GB) at the end (checked again with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). Expected texts are the GEO-1514 values: the keys and the {{market}} variables are unchanged, so {{count}}, {{names}}, {{values}}, {{type}}, {{category}}, {{market}} and {0} are shown filled with the real values. Read-only analysis A with at least 2 countries: Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e (or another QA-GEO analysis with 2+ countries, recorded), country filter left on all countries. Exports are made with the export icon of the analysis toolbar and checked by opening the downloaded file (export language = interface language by design).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on analysis A in en-GB with all countries | Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, country filter: all | The analysis overview is displayed |
| 2 | When the user exports the analysis as a presentation | Export "Presentation .pptx" | A .pptx file is downloaded |
| 3 | Then the cover says countries |   | Cover label "COUNTRIES" with the value "All Countries" |
| 4 | And the slides say country |   | Matrix slide subtitle "Visibility vs LLM choice, by category and country"; time evolution band "All countries combined, plus one line per country  ·  {0}" with {0} filled |
| 5 | When the user switches the language to Français (fr-FR) and exports the presentation again | Settings > Interface Language: Français | Cover "PAYS" / "Tous les pays"; "Visibilité vs choix LLM, par catégorie et pays"; "Tous les pays combinés, plus une ligne par pays  ·  {0}" |
| 6 | When the user switches the language to Español (es-ES) and exports the presentation again | Settings > Interface Language: Español | Cover "PAÍSES" / "Todos los países"; "Visibilidad vs elección LLM, por categoría y país"; "Todos los países combinados, más una línea por país  ·  {0}" |
| 7 | And the user sets the language back to British English (en-GB) | Settings > Interface Language: British English; GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The interface is in British English and /auth/me shows en-GB |

#### TC-GEO-1514-009 - XLSX export sheets say country in EN FR and ES

- **ACs:** E-4, E-5, E-6, E-8 | **Priority:** Medium | **Smoke:** No | **Regression:** No | **Type:** UI | **Coverage:** happy
- **Description:** Verify the XLSX export texts xlsx.brandPillars.subtitle, xlsx.categoryPrioritization, col.market and xlsx.te.markets in en-GB, fr-FR and es-ES. Covers E-4, E-5, E-6 and E-8 (GEO-1514 export keys). col.market is also checked in the PPTX if a Country column appears there.
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1514 deployed, user logged in with the QA account, organisation switcher set to "QA-GEO". The interface language is a saved account setting (user menu > language): it starts in British English (en-GB, checked with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me), is switched to Français (fr-FR) and Español (es-ES) only for this TC, and is set back to British English (en-GB) at the end (checked again with GET https://staging-geo.onclusive.com/geo/api/v1/auth/me). Expected texts are the GEO-1514 values: the keys and the {{market}} variables are unchanged, so {{count}}, {{names}}, {{values}}, {{type}}, {{category}}, {{market}} and {0} are shown filled with the real values. Read-only analysis A with at least 2 countries: Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e (or another QA-GEO analysis with 2+ countries, recorded), country filter left on all countries. Exports are made with the export icon of the analysis toolbar and checked by opening the downloaded file (export language = interface language by design).

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user is on analysis A in en-GB with all countries | Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e, country filter: all | The analysis overview is displayed |
| 2 | When the user exports the analysis as a spreadsheet | Export "Spreadsheet .xls" | A spreadsheet file is downloaded |
| 3 | Then the sheets say country |   | "From BRAND_IMAGE questions, consolidated per dimension per engine (all countries)."; "Category Prioritization (per category × country)"; column "Country"; "Countries: {0}" with {0} filled |
| 4 | When the user switches the language to Français (fr-FR) and exports the spreadsheet again | Settings > Interface Language: Français | "Questions BRAND_IMAGE, consolidées par dimension et moteur (tous les pays)."; "Priorisation des catégories (par catégorie × pays)"; column "Pays"; "Pays : {0}" |
| 5 | When the user switches the language to Español (es-ES) and exports the spreadsheet again | Settings > Interface Language: Español | "Preguntas BRAND_IMAGE, consolidadas por dimensión y motor (todos los países)."; "Priorización de categorías (por categoría × país)"; column "País"; "Países: {0}" |
| 6 | And the user sets the language back to British English (en-GB) | Settings > Interface Language: British English; GET https://staging-geo.onclusive.com/geo/api/v1/auth/me | The interface is in British English and /auth/me shows en-GB |

#### TC-GEO-1514-010 - No visible text says market in en-GB on the web app and the exports

- **ACs:** S-1 | **Priority:** High | **Smoke:** No | **Regression:** Yes | **Type:** UI | **Coverage:** happy
- **Description:** Verify in en-GB that no visible UI text says Market / Markets on the wizard, the GEO dashboard, Manage Scope, the analysis pages, the upsell page and the exports (keys, URL parameters and the {{market}} variables excluded). Covers S-1 (sweep asked by QA lead, decision of 2026-10-21 "country everywhere"). Start with the wizard Add category modal (known observation of 2026-10-27).
- **Precondition:** Staging https://staging-geo.onclusive.com/geo, GEO-1514 deployed, interface language British English (en-GB), organisation switcher set to "QA-GEO", unbranded feature flag ON. Read-only analysis A (Toyota 439acd96-0b1b-4da4-9e07-612d38e9783e or another QA-GEO analysis with 2+ countries). PQL account assiya.benramdane+pql@onclusive.com for the upsell page. The check covers visible text, tooltips, empty states, dialogs and toasts (case-insensitive "market"); i18n keys, URL parameters and attribute names are excluded. Every hit is recorded with its screen, key if known, and a screenshot.

| # | Test step | Test data | Expected result |
|---|---|---|---|
| 1 | Given the user opens the wizard Add category modal first | New Analysis > Brand analysis > Brand & Country > Categories > Add category | No visible text says market |
| 2 | When the user goes through every wizard step and dialog | Analysis Type, Brand & Country (Add country), Categories, Prompts (filters, add prompt), Summary, exit dialog, remove category dialog | No visible text says market |
| 3 | And the user checks the GEO dashboard | Analysis table, pool block, country filter, tooltips | No visible text says market |
| 4 | And the user checks the analysis pages | Analysis A: Overview, category views, sources, Action Center, filters and tooltips | No visible text says market |
| 5 | And the user checks Manage Scope | Analysis A > Manage Scope: every tab, Add country and Add category dialogs (opened and cancelled) | No visible text says market |
| 6 | And the user checks the upsell page and the lite result | PQL account | No visible text says market |
| 7 | Then the exports say country only | Analysis A: "PDF", "Presentation .pptx", "Spreadsheet .xls" | No text of the three files says market / Markets |

