# e2e-wizard-brand-website

- **Spec:** `.claude/Data/raw/playwright/e2e-wizard-brand-website.spec.js`
- **Active scenarios:** 1
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-WIZARD-WEBSITE-001](#e2e-wizard-website-001) | Custom brand website: field, URL normalisation, logo preview and errors (no creation) | NEW | GEO-1241, GEO-1260, GEO-1261, GEO-1262, GEO-1238 |

---

## E2E-WIZARD-WEBSITE-001

**Custom brand website: field, URL normalisation, logo preview and errors (no creation)**

| Field | Value |
|---|---|
| Status | NEW |
| Description | End-to-end: Custom brand website: field, URL normalisation, logo preview and errors (no creation). Pass 1 — per epic (GEO-1069). Assumptions: Strings checked against the en-US copy validated by the PO (TC precondition); en-GB identical for these strings. Epics: GEO-1209, GEO-1069, GEO-1002. Consolidates TC-GEO-1241-001, TC-GEO-1241-003, TC-GEO-1260-001, TC-GEO-1261-005, TC-GEO-1261-007, TC-GEO-1261-001, TC-GEO-1262-005, TC-GEO-1262-007, TC-GEO-1262-004, TC-GEO-1238-001. |
| Priority | High |
| Stories | GEO-1241, GEO-1260, GEO-1261, GEO-1262, GEO-1238 |
| Precondition | Staging, en-GB, flag ON; Brand logo service reachable (Brandfetch quota — see memory GEO-1069 runs); Nothing is created: the scenario ends with Exit and Discard |
| Labels | e2e-suite |
| QA Parent | GEO-1209 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | — |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | When the user clicks New Analysis |  | The wizard opens on step 1 "Analysis Type"; the stepper lists 5 steps: Analysis Type, Brand & Country, Categories, Prompts, Summary; the step subtitle reads "Choose what you want to measure" |
| 2 | When the user selects the "Brand analysis" card |  | The card is shown selected |
| 3 | When the user types a brand name in the brand search | C = "Lictorix Geo" | The dropdown lists the matching suggestions, if any, and a "Custom Brand" row for "Lictorix Geo" |
| 4 | And the user selects the "Custom Brand" row (Lictorix Geo) |  | The custom brand card "Lictorix Geo" is displayed as the selected brand |
| 5 | Then a website field is displayed inline right under the selected custom brand card, above "Discover Categories" |  | The field has a globe icon and the same input style as the brand search |
| 6 | And the field label reads the validated copy |  | "What is your brand's website? (optional)" |
| 7 | And the field shows the validated placeholder and hint |  | Placeholder "example.com"; hint "We use it to show the right logo. Leave it empty to show your brand's initial." |
| 8 | And the empty field is not flagged as required |  | No required marker, no red border and no error message while the field is empty |
| 9 | When the user enters a value that is not a domain | "licter" | The value is typed, no error is shown while typing |
| 10 | And the field loses focus | Click outside the field | The website field has a red border and the message "Enter a valid website, such as example.com." is shown under it (same pattern as the brand error of step 1) |
| 11 | When the user clicks "Discover Categories" |  | The step is not left: no discovery loading screen, the error is still shown |
| 12 | Then the user can correct the input |  | The field is editable and still contains "licter" |
| 13 | And the user corrects the value to a valid domain | "licter.com" | The red border and the message disappear as soon as the value is valid, without leaving the field |
| 14 | When the user enters a full URL in the website field | "https://www.licter.com/fr/about?x=1" | The value is typed, no error is shown while typing |
| 15 | And the field loses focus | Click outside the field | No inline error is shown |
| 16 | Then the derived root domain is shown under the brand name |  | "licter.com" |
| 17 | And the logo preview is retrieved for that domain |  | The 32px avatar shows the logo found for licter.com instead of the letter "L" |
| 18 | When the user edits the website URL | W2 = "onclusive.com" | The avatar still shows the licter.com logo while typing |
| 19 | And the field loses focus | Click outside the field | The grey pulsing placeholder is shown |
| 20 | Then the preview updates to the logo of the new domain |  | The avatar shows the logo of onclusive.com and "onclusive.com" is under the brand name |
| 21 | And the previous domain's logo is never shown next to the new domain |  | At no moment is the licter.com logo shown with "onclusive.com" |
| 22 | When the user clears the website field and the field loses focus | (empty) | No error is shown |
| 23 | Then the lettermark is shown as the brand visual |  | The avatar shows the letter "L"; the licter.com logo and the domain under the brand name are no longer shown |
| 24 | When the user enters a domain with neither a brand logo nor a favicon and the field loses focus | W4 = "example.com" | The grey pulsing placeholder is shown |
| 25 | Then the general favicon is shown as the brand visual |  | The 32px avatar shows the generic grey globe of the favicon service (image from www.google.com/s2/favicons), not the letter "L" |
| 26 | And the domain is shown under the brand name |  | The W4 domain |
| 27 | When the user clicks Back to Dashboard | Custom brand "Lictorix Geo" entered | The "Exit setup?" confirmation opens |
| 28 | And the confirmation offers Resume Setup and Exit and Discard |  | "Resume Setup" and "Exit and Discard" are shown |
| 29 | When the user clicks Exit and Discard |  | The GEO dashboard is displayed and no analysis was created |
