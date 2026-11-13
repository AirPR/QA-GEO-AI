### QA Test Plan for GEO-1005 — Add Google AI Overviews as a Tracked Surface

**Updated:** 2026-11-13 | **Source CSV:** pending | **Status:** Approved 2026-11-13

**Objective:** Verify that Google AI Overviews becomes one more engine of the analysis: it can be allowed in the back office and selected in the wizard and Manage Scope after Gemini, with its name, Google "G" logo and green colour; it is captured per country from the Google Search page through the capture vendor with no API fallback, the full AI Overview after "Show more", no capture in the excluded countries and an amber line in the Review step, the add-country dialog and Manage Scope; a prompt with no AI Overview is a "Not triggered" result left out of every metric, the trends and the Excel Raw Data, and an excluded country shows "Not available"; the AI Overview is read by the shared reader of GEO-678 and shown in the full answer card of GEO-1498; and it shows wherever engines show (filters, per-engine breakdowns, pills, Actions Center, exports) in the fixed engine order ChatGPT, Gemini, Google AI Overviews, the place of Google AI Mode, Grok, Claude, Perplexity. Images (GEO-1599 AC2 to AC5) are moved to GEO-1608 and are not tested here.

#### Test Scenarios & Detailed Test Cases

**Engine Selection (stories: GEO-1595)**

- Scenario 1: AI Overviews Engine Card - Verify that for an organisation allowed Google AI Overviews the wizard engine step and Manage Scope show one more card after Gemini, named "Google AI Overviews", with the Google "G" logo, the green border #34A853 and no description.
- Scenario 2: Back Office Option Off by Default - Verify that Google AI Overviews is one more allowed engine in the back office, off by default for new and existing organisations.
- Scenario 3: Prompt Pool Unchanged - Verify that turning on Google AI Overviews does not change the prompt pool count.
- Scenario 4: Collected From the Next Run - Verify that Google AI Overviews turned on in Manage Scope of an existing analysis is collected from the next run.
- Scenario 5: At Least One Engine at Creation - Verify that creating an organisation in the back office requires at least one AI engine, Create staying disabled while none is ticked, with "Seleccione al menos un motor de IA" in Spanish (PO 876278, 876972).

**Capture per Country (stories: GEO-1596)**

- Scenario 6: Captured From the Country's Google Page - Verify that the AI Overview of a prompt is captured from the Google Search page of the prompt's country, through the capture vendor and its country setting, with no instruction added.
- Scenario 7: Full AI Overview After Show More - Verify that an AI Overview shown in part behind "Show more" is stored in full, as a user reads it after "Show more".
- Scenario 8: Raw Answer Kept - Verify with dev evidence that the raw AI Overview is kept with its route, vendor, country and date, text, sources and source places.
- Scenario 9: No API Fallback - Verify that when the vendor returns no usable AI Overview the answer is not counted and the question is never sent to the Gemini API in its place.
- Scenario 10: Excluded Countries - Verify that no AI Overview is collected in the countries the vendor cannot capture (China, Cuba, Ethiopia, Iceland, Iran, Sri Lanka on 6 Nov 2026).
- Scenario 11: Review Banner Line - Verify that selecting Google AI Overviews with excluded countries adds "Google AI Overviews won't apply to {countries}." to the amber Review banner with every country named, the list joined in the page language (e.g. "France, Espagne et Italie"), and that creation stays allowed (PO 876972).
- Scenario 12: Every Country Excluded - Verify that when every selected country is excluded the line reads "Google AI Overviews won't apply to any of your selected countries." and creation stays allowed even with AI Overviews as the only engine.
- Scenario 13: Run Fails With No Applicable Engine - Verify that a run where no engine of the analysis applies to the selected countries fails with "No selected engine applies to the selected countries." (PO 876279).
- Scenario 14: Add-Country Dialog Line - Verify that adding an excluded country in Manage Scope to an analysis with Google AI Overviews shows "Google AI Overviews won't apply to {countries}." in the dialog before confirming, and adding stays allowed.
- Scenario 15: Manage Scope Line - Verify that Manage Scope of an analysis with Google AI Overviews and an excluded country shows the amber line under the AI engines when turning the engine on and on every later opening, as long as such a country remains.

**Prompts Without an AI Overview (stories: GEO-1597)**

- Scenario 16: Not Triggered Is a Result - Verify that a prompt whose Google page shows no AI Overview is stored as "not triggered", a result and not a failed capture.
- Scenario 17: Not Available Pill and Tab - Verify that a question of an excluded country shows the AI Overviews pill "Not available" in the grey badge and the tab "Google AI Overviews is not available in {country}." with no extracted block and no sources (frame 04d) (PO 876972).
- Scenario 18: Left Out of the Metrics - Verify that a prompt with no AI Overview is left out of every metric for that date, never counted as not named, unranked or not chosen.
- Scenario 19: Not Triggered Pill and Tab - Verify that the pill shows "Not triggered" in the grey "Not counted" badge, rank badge place and size, compact form included, and the tab reads "No AI Overview was returned for this question in {country}." with its fr-FR and es-ES texts, no extracted block and no sources (PO 876294).
- Scenario 20: Trend Gap - Verify that a prompt with an AI Overview on one date and none on the next gives no AI Overviews value for that date in the trends.
- Scenario 21: No Excel Row - Verify that a prompt with no AI Overview has no AI Overviews row in the Excel Raw Data sheet.

**Reading the AI Overview (stories: GEO-1598)**

- Scenario 22: Shared Reader - Verify that the ranking, competitive outcome, themes and tone and sources of an AI Overview are extracted with the same rules as the other engines, brand family included.
- Scenario 23: Google Page Residue Removed - Verify that "Show more", "AI responses may include mistakes" and the feedback buttons never appear in an AI Overview shown in the question panel.
- Scenario 24: Source Places Kept - Verify that sources cited as links next to the paragraphs keep the place where the AI Overview cites them, so the panel numbers them as for the other engines.
- Scenario 25: Text Only Read - Verify that brands, outcomes and themes of an AI Overview come from its text only.

**AI Overview in the Question Panel (stories: GEO-1599)**

- Scenario 26: Full Answer Card - Verify that an AI Overview tab uses the full answer card with no change (clamp, "Show full answer", brand highlights, citation mini card, Sources card).
- Scenario 27: No Inline Citations - Verify that an AI Overview with no numbered citation shows "no inline citations" in its header and lists its sources in the Sources card.
- Scenario 28: Header Counts - Verify that the character and citation counts of an AI Overview header count its text and cited sources only.

**AI Overviews Everywhere Engines Show (stories: GEO-1600)**

- Scenario 29: Filters and Breakdowns - Verify that AI Overviews is one more engine with its name and logo in the engine filters and the per-engine breakdowns (KPIs, Brand Rankings, trends, sources, Corporate Reputation panel, Brand Territory pie in green, Related Prompts modal).
- Scenario 30: Engine Order - Verify that every engine list (wizard, Manage Scope, filters, panel pills, Actions Center tabs, export engine lists) follows ChatGPT, Gemini, Google AI Overviews, then Grok, Claude and Perplexity, the PowerPoint export now listing Grok before Claude (PO 876278, 876281).
- Scenario 31: Compact Pill - Verify that with 4 engines or more the AI Overviews pill shows its logo only, with "Google AI Overviews" in the tooltip.
- Scenario 32: Logo Everywhere - Verify that the AI Overviews logo shows in the wizard, Manage Scope, back office, engine filters, pills, Sources card, Actions Center and exports, never a blank or default icon.
- Scenario 33: Exports - Verify that Excel, PowerPoint and PDF exports show "Google AI Overviews" wherever they show an engine.
- Scenario 34: Analysis Without AI Overviews - Verify that an analysis without AI Overviews shows it nowhere and the other engines as today.

#### Edge Cases & Boundary Conditions

* Excluded country (6 on 6 Nov 2026): no capture, not a failure, "Not available" in the panel.
* Every selected country excluded with AI Overviews as the only engine: creation allowed; the run fails with "No selected engine applies to the selected countries." (PO 876279).
* Capture with no usable AI Overview: not counted, no API fallback, never sent to Gemini.
* Prompt with no AI Overview: "Not triggered", no metric value, no trend point, no Excel row.
* AI Overview partly behind "Show more": stored in full.
* AI Overview citing links but no numbered marker: "no inline citations" in the header, sources still listed.
* 4 engines or more: logo-only pill, name in the tooltip.
* {countries} with several countries: joined in the page language, no hard-coded "and" (PO 876972).

#### Open Points (not blocking)

* GEO-1596 AC9: one banner with one line per Google engine needs Google AI Mode (GEO-1006), which has no story yet; not testable in this plan.
* GEO-1599 AC2 to AC5 (images) are moved to GEO-1608 (876497) and get no scenario; AC6 (broken image hidden) is not testable since the vendor returns no image in the AI Overview, and AC7 is checked on text and citations only (Scenario 28).
* GEO-1598 AC4: no image is returned by the vendor, so "images not read" is checked only as text-only reading (Scenario 25).
* GEO-1597: how "Not available" (excluded country) shows in the Excel Raw Data and in the trends is not defined (dev 876069); no scenario until answered.
* GEO-1597: how "Not triggered" and "Not available" show in the Questions Analysis table is not defined; the ACs and frame 04d cover the question panel only.
* GEO-1596 / GEO-1597: leaving AI Overviews out of the metrics for a whole excluded country is stated in a dev comment (876069) and not in the ACs — AC text not yet updated.
* GEO-1596 AC5: the excluded-country list comes from the vendor and can change (876069); the plan uses the 6 countries of 6 Nov 2026 and the stored list read before the run.
* GEO-1005: the approval to capture the Google surfaces is still "to confirm"; tests run on staging only.
* Prerequisite: the stories deployed on staging, AI Overviews answers captured with the Cloro dev key, the corrected FR / ES strings (876972, 877165), and prompts that give no AI Overview (97% of 165 real prompts had one, 876490), e.g. generic UK Visibility prompts.

**Environment:** Staging (https://staging-geo.onclusive.com/geo), org QA-GEO, interface en-GB checked with GET /geo/api/v1/auth/me (FR and ES only for the string scenarios, then en-GB restored).

**Priority:** High

#### AC Coverage by Story

Result: **34 / 40 functional ACs covered** (GEO-1595 5/5, GEO-1596 10/11, GEO-1597 6/6, GEO-1598 4/4, GEO-1599 3/8, GEO-1600 6/6); the ACs with no scenario are flagged "No" with their reason and listed in Open Points, and "No — dev evidence" marks a scenario that needs dev evidence rather than the UI. Technical ACs are not mapped one by one: the observable ones are covered by the scenarios of their story, the others need dev evidence. "Partial" = only the visible output is testable.

**GEO-1595 — Select AI Overviews as an engine**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Engine card | 1 | Yes |
| AC2 | Back office option | 2 | Yes |
| AC3 | Pool unchanged | 3 | Yes |
| AC4 | Next run | 4 | Yes |
| AC5 | At least one engine | 5 | Yes |

**GEO-1596 — Capture the AI Overview per country**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Country page, vendor setting | 6 | Partial (capture settings not visible) |
| AC2 | Full after Show more | 7 | Yes |
| AC3 | Raw kept | 8 | No — dev evidence |
| AC4 | No API fallback | 9 | Partial (failure to be forced) |
| AC5 | Excluded countries | 10 | Yes |
| AC6 | Review line | 11 | Yes |
| AC7 | All countries excluded | 12 | Yes |
| AC8 | Run fails | 13 | Yes |
| AC9 | One banner for both Google engines | — | No — needs GEO-1006 (open point) |
| AC10 | Add-country dialog | 14 | Yes |
| AC11 | Manage Scope line | 15 | Yes |

**GEO-1597 — Handle the prompts where Google shows no AI Overview**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Not triggered stored | 16 | Yes (data needed) |
| AC2 | Not available | 17 | Yes |
| AC3 | Out of the metrics | 18 | Yes |
| AC4 | Not triggered pill and tab | 19 | Yes |
| AC5 | Trends | 20 | Yes (two dates needed) |
| AC6 | No Excel row | 21 | Yes |

**GEO-1598 — Read the AI Overview like any other answer**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Shared reader | 22 | Yes |
| AC2 | Residue removed | 23 | Yes |
| AC3 | Source places | 24 | Yes |
| AC4 | Images not read | 25 | Partial (no image returned, open point) |

**GEO-1599 — Read the AI Overview in the question panel**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Full answer card | 26 | Yes |
| AC2–AC5 | Images, captions, viewer | — | No — moved to GEO-1608 (876497) |
| AC6 | Broken image hidden | — | No — no image returned (open point) |
| AC7 | Images not counted | 28 | Partial (text and citations only) |
| AC8 | No inline citations | 27 | Yes |

**GEO-1600 — Show AI Overviews everywhere engines show**

| AC | Summary | Scenario(s) | Testable |
|---|---|---|---|
| AC1 | Filters and breakdowns | 29 | Yes |
| AC2 | Engine order | 30 | Yes |
| AC3 | Compact pill | 31 | Yes |
| AC4 | Logo everywhere | 32 | Yes |
| AC5 | Exports | 33 | Yes |
| AC6 | Analysis without AI Overviews | 34 | Yes |
