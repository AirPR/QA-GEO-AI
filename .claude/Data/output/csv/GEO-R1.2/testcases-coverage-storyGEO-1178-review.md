# GEO-1178 — Test case review (v5, validated v4 + GEO-1188 re-scoping; CSV generated)

**Task:** GEO-1178 — Action Center - Target Sources: details panel tabs and prompts list from the new design (engine filter, one row per prompt)
**Epic:** GEO-152 | **Version:** GEO-R1.2 | **Status in Jira:** Ready for QA
**Source:** `apps/geo/GEO-R1.2/GEO-152/TASK_GEO-1178_Action_Center_Target_Sources_details_panel_tabs_and_prompts_.md` (+ `epic-data.json`, 13 ACs)
**Format reference:** `testcases-coverage-storyGEO-1168.csv` (not modified)
**Target CSV (after validation):** `.claude/Data/output/csv/GEO-R1.2/testcases-coverage-storyGEO-1178.csv`

## Figma pass (v2)

- **Design source.** Jira has no child issue under GEO-1178. The Design Task of the epic, GEO-158 "Design - Actions Center", links to Figma file `xctSRqtM653zRS7QY3KMm0` ("Measure - GEO Module").
- **Frames.** The 5 frames named in the ticket were confirmed with `GET /v1/files/{key}/nodes` (all type FRAME, 1280×832, none of them an N0TE annotation). They were exported as PNG in batches of 3 + 2 and read visually.

| Node | Frame name | Inferred state |
|------|------------|----------------|
| 13746:123761 | Target Sources — Card view · details overlay | Panel open from card view, two-reason source, "Lack of visibility (2)" selected, engine filter "All", 3 prompts |
| 13861:13367 | Target Sources · Details panel · Negative perception tab | "Negative perception (1)" selected with the negative passage; prompts section identical |
| 15220:79515 | Target Sources · Details panel · Next Source | Source #2 after Next source: 5 engines (icon + count only), 6 prompts + "Show 12 more prompts" |
| 15688:25012 | Target Sources · Details panel · LLM filter · Gemini | "Gemini (2)" engine tab selected: 2 prompts, no show-more button |
| 13746:122399 | Target Sources — List view · details overlay | Same panel opened from the table view |

**Design facts used in the expected results:**

- **Panel header:** "#N · domain", a type chip and the reason badges.
- **Article tabs:** a two-segment control. "Lack of visibility (N)" has an eye-off icon and "Negative perception (N)" has a thumb-down icon. The selected segment is a white pill.
- **Explanation line:** shown with the tab icon. It is blue for the missing tab and purple for the negative tab.
- **Article row:** a globe/favicon icon, the title in bold, the URL in grey without protocol and the citing engine icons on the right.
- **Negative passage:** in italics, inside curly quotes, with a vertical bar on its left.
- **Divider:** a short centred horizontal line, then the heading "Prompts associated with this source".
- **Engine filter:**
  - "All" comes first and shows no count.
  - With 2–3 engines, each tab shows the icon, the name and the count in parentheses ("Gemini (2)").
  - With more engines, each tab shows the icon and a bare count.
  - The selected tab is a white pill with a coloured icon.
- **Prompt row:** the text in curly quotes, then the engine icons and the market flag at the bottom right.
- **Show more:** an outlined, centred button "Show X more prompts".
- **Footer:** "Previous" (disabled on #1), "Source k of M", "Next source".

## Staging data (v3 — real values)

- **Exploration:** read-only exploration on staging, 2026-10-02. Toyota dashboard `439acd96-0b1b-4da4-9e07-612d38e9783e` → `/actions` → Target Sources, card view, ALL tab, **261 sources**. Brand "Toyota". Filters: "Last 7 days", "AI Engines 3" (ChatGPT, Gemini, Perplexity; Grok and Claude are off and cannot be enabled), "All Countries".
- **Deployment:** GEO-1178 is deployed. The page name shows "Action Center", the app language is English (`html lang="en"`), probably en-US (to be confirmed, see OP-22).

| Alias | Source | Data used |
|-------|--------|-----------|
| **B** (both reasons, 3 engines) | #1 · frandroid.com (Journalism) | Card "Not visible in 39 articles" / "Negative perception in 5 articles". Tabs "Lack of visibility (39)" / "Negative perception (5)". The article list shows "Show 29 more articles". Engine tabs All, ChatGPT (28), Gemini (7), Perplexity (71). All = 79 prompts → "Show 73 more prompts". ChatGPT → "Show 22 more prompts", Gemini → "Show 1 more prompt", Perplexity → "Show 65 more prompts". Multi-engine prompts "“Best Voitures Électriques?”" and "“Good Voitures Électriques?”" (FR flag, ChatGPT + Gemini + Perplexity). |
| **V** (missing only, 1 engine = **E1**) | #2 · zonebourse.com | Card "Not visible in 23 articles". Tab "Lack of visibility (23)" only. Engine tabs All, Perplexity (32). 32 prompts → "Show 26 more prompts". This is the source right after B. |
| V-alt (missing only, 3 engines) | #3 · autobild.es | "Lack of visibility (20)". ChatGPT (62), Gemini (36), Perplexity (54). 89 prompts → "Show 83 more prompts". |
| **P** (negative only) | #12 · trustpilot.com (Review Sites) | Card "Negative perception in 10 articles". Tab "Negative perception (10)" only. ChatGPT (8), Gemini (10), Perplexity (11). 23 prompts → "Show 17 more prompts". Prompt "“Avis sur Toyota pour les VUS ?”" (FR, 3 engines). Alt: #38 · fiches-auto.fr "Negative perception (5)". |
| **E2** (exactly 2 engines) | #22 · prnewswire.com | "Lack of visibility (7)". ChatGPT (28), Gemini (8). 32 prompts → "Show 26 more prompts". Prompt "“Best hybrid cars?”" (US flag, ChatGPT + Gemini). Alt: #39 · abc.es ChatGPT (17), Gemini (9), 24 prompts, "“¿Reseñas de Toyota para SUVs?”" (ES flag). |
| **S6** (exactly 6 prompts, 3 engines) | #10 · youtube.com (Social / UGC) | Card "Not visible in 4 articles" / "Negative perception in 7 articles". ChatGPT (2), Gemini (1), Perplexity (4). 6 prompts, no show-more button. |
| S6-alt (exactly 6 prompts, 1 engine) | #16 · evupdatemedia.us | "Lack of visibility (4)" / "Negative perception (3)". All + ChatGPT (6). 6 prompts, no button. |
| **M** (4+ engines) | **Not available** | Grok and Claude are disabled on the analysis, so TC-012 is blocked by data (OP-21). |
| AC-8 scope | frandroid.com with Gemini off | "AI Engines 2", 261 → 222 sources, frandroid.com still #1 ("Source 1 of 222"). Card "Not visible in 36 articles" / "Negative perception in 5 articles". Tab "Lack of visibility (36)". Engine tabs All, ChatGPT (28), Perplexity (71). All = 79 / "Show 73 more prompts". No Gemini icon in any row. |

Engine counts overlap (28 + 7 + 71 ≠ 79): "All" counts each prompt once, which matches the one-row-per-prompt rule. The values depend on "Last 7 days" and may drift (OP-23), so re-check them right before execution.

Common CSV fields for every TC: QA Parent = `GEO-152`, Components = `GEO`, QA Component = `GEO Module`, QA Story/Task = `GEO-1178`, Test Type = `Manual`, Labels = empty. QA Regression = Yes for Urgent/High, No for Medium/Low. `[Figma]` and `[Observed]` TCs carry the tag in their title and Description.

---

## AC inventory

| AC | Short label | TC(s) |
|----|-------------|-------|
| AC-1 | Missing-only source: only "Lack of visibility (N)" tab + explanation line | TC-001 |
| AC-2 | Negative-only source: only "Negative perception (N)" tab + explanation line | TC-002 |
| AC-3 | Both reasons: both tabs, LoV selected by default, switching tab does not change prompts | TC-003, TC-004 |
| AC-4 | Tab count = number of articles in the tab = card line | TC-005 |
| AC-5 | Explanation line uses the analysis brand name | TC-006 |
| AC-6 | Prompt cited by several engines appears once, one icon per engine | TC-009 |
| AC-7 | Engine tab filters the list and recalculates "Show X more prompts" | TC-013 |
| AC-8 | Engine tabs restricted to the page AI Engines filter | TC-014 |
| AC-9 | 6 prompts before "Show X more prompts" | TC-015, TC-016, TC-030 |
| AC-10 | Previous / Next rebuilds tabs and engine filter | TC-017 |
| AC-11 | All new strings exist in en-GB, en-US, fr-FR, es-ES | TC-018, TC-019, TC-020, TC-021 |
| AC-12 | Page name: "Action Center" en-US, "Action Centre" en-GB (QA decision: "Action Center" in en-GB too, GEO-1188), FR/ES unchanged | TC-022, TC-023, TC-024 |
| AC-13 | English PPT/PDF header "ACTION CENTER · TARGET SOURCES"; no "Actions Center"/"Actions Centre" in PPT/PDF/Excel | TC-025, TC-026, TC-027 |

| Rule | Short label | TC(s) |
|------|-------------|-------|
| R-1 | 2 tabs at the top, each with its icon; N = number of articles | TC-003, TC-005, TC-034 |
| R-2 | One reason: only that tab. Both: LoV first and selected by default | TC-001, TC-002, TC-003 |
| R-3 | One explanation line per tab, not repeated on each article | TC-006 |
| R-4 | Article = title + URL + citing engine icons; negative articles also show the passage | TC-007, TC-008 |
| R-5 | Prompts section below the articles, divider, independent of the article tab | TC-004 |
| R-6 | One row per prompt: text + market flag + engine icons | TC-009 |
| R-7 | Engine filter "All" + one tab per engine with count; icon + name for 2–3, icon + count only for more | TC-010, TC-011, TC-012, TC-034, TC-035 |
| R-8 | First 6 prompts then "Show X more prompts" (X per engine tab) | TC-013, TC-015, TC-016, TC-030 |
| R-9 | Page name without S, both keys everywhere | TC-022, TC-023, TC-024 |
| R-10 | PPT/PDF header EN changed; FR "ACTIONS", ES "ACCIONES" | TC-025, TC-026, TC-028 |
| R-11 | Translations; en-US = en-GB; engine names untranslated; old keys unused | TC-018 to TC-021, TC-029 |
| [Figma] / [Observed] | Visual states of the design, plus the behaviour seen on staging that the ticket does not specify | TC-030 to TC-035 |

No AC is filtered as technical.

---

## Shared preconditions

- **PRE-A (main data set):** GEO-1178 is deployed on staging (`https://staging-geo.onclusive.com/geo`). The user is logged in and the starting app language is **en-US** (staging shows "Action Center"; OP-22 resolved). TCs that test en-GB (TC-018, TC-023, TC-025, TC-026) switch to en-GB explicitly.
  - **Data volatility (OP-23 resolved):** every count and rank in these TCs depends on the "Last 7 days" period (captured on staging 2026-10-02). Re-check them on staging just before execution and update the test data if they changed.
  - The user opens Action Center > Target Sources of the Toyota analysis (dashboard `439acd96-0b1b-4da4-9e07-612d38e9783e`, brand "Toyota").
  - The page filters are at their defaults: "Last 7 days", "AI Engines 3" (ChatGPT, Gemini, Perplexity), "All Countries", card view, ALL tab, 261 sources.
  - The reference sources are B = #1 frandroid.com, V = #2 zonebourse.com, P = #12 trustpilot.com, E2 = #22 prnewswire.com and S6 = #10 youtube.com, with the values of the staging table above.
- **PRE-M (4+ engines):** an analysis with at least 4 AI engines enabled and a source cited by at least 4 of them. **Not available** on the Toyota staging analysis (OP-21).
- **PRE-EXP (exports):** same as PRE-A. The analysis can be exported in PPT, PDF and Excel.

---

## TCs grouped by AC

### AC-1

**TC-GEO-1178-001 — Missing-only source panel shows only the Lack of visibility tab and its explanation line** (AC-1, R-2)
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the user is on the Target Sources page in card view | | The Target Sources cards are displayed on the ALL tab |
| 2 | And source V shows only the Improve visibility badge | V = #2 zonebourse.com | The card of zonebourse.com shows the IMPROVE VISIBILITY badge only and the line "Not visible in 23 articles" |
| 3 | When the user opens the details panel of source V | | The panel opens with the header "#2 · zonebourse.com" |
| 4 | Then only the "Lack of visibility (N)" tab is displayed | N = 23 | A single tab "Lack of visibility (23)" with the eye-off icon is shown and no "Negative perception" tab is present |
| 5 | And the explanation line of the tab is displayed | Brand: Toyota | "None of these articles mentions Toyota anywhere on the page." is shown under the tab, with the eye-off icon |

### AC-2

**TC-GEO-1178-002 — Negative-only source panel shows only the Negative perception tab and its explanation line** (AC-2, R-2)
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the user is on the Target Sources page in card view | | The Target Sources cards are displayed on the ALL tab |
| 2 | And source P shows only the Improve perception badge | P = #12 trustpilot.com | The card of trustpilot.com shows the IMPROVE PERCEPTION badge only and the line "Negative perception in 10 articles" |
| 3 | When the user opens the details panel of source P | | The panel opens with the header "#12 · trustpilot.com" |
| 4 | Then only the "Negative perception (N)" tab is displayed | N = 10 | A single tab "Negative perception (10)" with the thumb-down icon is shown and no "Lack of visibility" tab is present |
| 5 | And the explanation line of the tab is displayed | Brand: Toyota | "Each of these articles mentions Toyota negatively." is shown under the tab, with the thumb-down icon |

### AC-3

**TC-GEO-1178-003 — Two-reason source panel shows both tabs with Lack of visibility first and selected by default** (AC-3, R-1, R-2)
Priority: High | Smoke: **Yes** | Regression: Yes | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the user is on the Target Sources page in card view | | The Target Sources cards are displayed on the ALL tab |
| 2 | When the user opens the details panel of source B | B = #1 frandroid.com | The panel opens with the header "#1 · frandroid.com" |
| 3 | Then both article tabs are displayed at the top of the panel, each with its icon | | A two-segment control shows "Lack of visibility (39)" with the eye-off icon and "Negative perception (5)" with the thumb-down icon |
| 4 | And the "Lack of visibility" tab is the first tab | | "Lack of visibility (39)" is the left segment, before "Negative perception (5)" |
| 5 | And the "Lack of visibility" tab is selected by default | | "Lack of visibility (39)" is the active (white) segment, "None of these articles mentions Toyota anywhere on the page." is shown and its articles are listed |

**TC-GEO-1178-004 — Switching the article tab does not change the prompts section** (AC-3, R-5)
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open on the "Lack of visibility (39)" tab | B = frandroid.com | The missing articles are listed |
| 2 | And the prompts section is displayed below the articles, separated by a divider | | A short horizontal divider is followed by "Prompts associated with this source", the engine filter "All" / "ChatGPT (28)" / "Gemini (7)" / "Perplexity (71)" on "All", 6 prompt rows and "Show 73 more prompts" |
| 3 | When the user selects the "Negative perception (5)" tab | | The 5 negative articles are listed and "Each of these articles mentions Toyota negatively." is shown |
| 4 | Then the prompts section is unchanged | | The heading, the engine tabs and counts, the 6 prompt rows (same text, engine icons and flags) and "Show 73 more prompts" are identical to step 2, still below the divider |
| 5 | When the user selects the "Lack of visibility (39)" tab again | | The missing articles are listed again |
| 6 | Then the prompts section is still unchanged | | The prompts section is identical to step 2 |

### AC-4

**TC-GEO-1178-005 — Tab counts match the number of articles in each tab and the card line of the source** (AC-4, R-1)
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the user is on the Target Sources page in card view | | The Target Sources cards are displayed |
| 2 | And the card of source B shows its reason lines | B = frandroid.com | The card shows "Not visible in 39 articles" and "Negative perception in 5 articles" |
| 3 | When the user opens the details panel of source B | | The tabs "Lack of visibility (39)" and "Negative perception (5)" are displayed |
| 4 | And the user clicks "Show 29 more articles" | | The remaining missing articles are added to the list |
| 5 | Then the "Lack of visibility" tab lists as many articles as its count | | Exactly 39 article rows are listed under "Lack of visibility (39)" |
| 6 | When the user selects the "Negative perception (5)" tab | | The negative articles are listed |
| 7 | Then the "Negative perception" tab lists as many articles as its count | | Exactly 5 article rows are listed under "Negative perception (5)" |
| 8 | And both tab counts match the card line of source B | | 39 = "Not visible in 39 articles" and 5 = "Negative perception in 5 articles" |

### AC-5

**TC-GEO-1178-006 — Explanation line uses the analysis brand name and is not repeated on each article** (AC-5, R-3)
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open on the "Lack of visibility (39)" tab | Brand of the analysis: Toyota | The missing articles are listed |
| 2 | Then one explanation line is shown under the tab with the brand name | | "None of these articles mentions Toyota anywhere on the page." is shown once, between the tabs and the first article |
| 3 | And no article row repeats a per-article verdict line | | Each article row only shows its title, URL and engine icons, with no verdict text |
| 4 | When the user selects the "Negative perception (5)" tab | | The 5 negative articles are listed |
| 5 | Then one explanation line is shown under the tab with the brand name | | "Each of these articles mentions Toyota negatively." is shown once, between the tabs and the first article |
| 6 | And no article row repeats a per-article verdict line | | Each negative article row only shows its title, URL, engine icons and passage, with no "describes negatively" verdict text |

### R-4 (article rows)

**TC-GEO-1178-007 — Each article shows its title, URL and the icons of the engines that cite it** (R-4)
Priority: Medium | Smoke: No | Regression: No | UI | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open on the "Lack of visibility (39)" tab | B = frandroid.com | The missing articles are listed |
| 2 | Then each article row shows the article title | | Each row shows a globe/favicon icon and the article title in bold |
| 3 | And each article row shows the article URL | | Each row shows the URL in grey under the title, without protocol, starting with "frandroid.com/" |
| 4 | And each article row shows the icons of the engines that cite it | | Each row shows at least one engine icon (ChatGPT, Gemini and/or Perplexity), right-aligned |
| 5 | And missing articles show no negative passage | | No quoted passage is shown on the "Lack of visibility" article rows |

**TC-GEO-1178-008 — Negative articles also show the passage where the brand is mentioned negatively** (R-4)
Priority: Medium | Smoke: No | Regression: No | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open | B = frandroid.com | The "Lack of visibility (39)" tab is selected |
| 2 | When the user selects the "Negative perception (5)" tab | | The 5 negative articles are listed |
| 3 | Then each negative article row shows its title, URL and citing engine icons | | Each row shows the bold title, the grey URL starting with "frandroid.com/" and the right-aligned engine icons |
| 4 | And each negative article row shows the passage where Toyota is mentioned negatively | Brand: Toyota | Under the URL, each row shows a passage of the article mentioning Toyota negatively, in italics, inside curly quotes, with a vertical bar on its left |

### AC-6

**TC-GEO-1178-009 — A prompt cited by several engines appears once, with its market flag and one icon per engine** (AC-6, R-6)
Priority: High | Smoke: **Yes** | Regression: Yes | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open | B = frandroid.com, 79 prompts | "Prompts associated with this source" is displayed below the articles with the engine filter on "All" |
| 2 | When the user clicks "Show 73 more prompts" | | All 79 prompts of frandroid.com are listed |
| 3 | Then the prompt "Best Voitures Électriques?" appears exactly once in the list | Cited by ChatGPT, Gemini, Perplexity | One single row shows "“Best Voitures Électriques?”" (no duplicate row per engine) |
| 4 | And the row shows the prompt text and its market flag | Market: France | The row shows "“Best Voitures Électriques?”" and the French flag at the bottom right |
| 5 | And the row shows one icon per engine that cites the source | | 3 engine icons (ChatGPT, Gemini, Perplexity) are shown before the flag |
| 6 | And no prompt text is listed twice in the list | Also check "“Good Voitures Électriques?”" (FR, same 3 engines) | All 79 rows have different prompt texts and "“Good Voitures Électriques?”" also appears once with 3 icons |

### R-7 (engine filter)

**TC-GEO-1178-010 — Engine filter shows "All" by default, then one tab per engine with its prompt count, in a fixed engine order** (R-7, OP-17) — *modified v5*
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A
**Note:** Known bug GEO-1187 — engine tab labels truncated, counts hidden.

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open | B = frandroid.com | "Prompts associated with this source" is displayed |
| 2 | Then the engine filter is displayed above the prompts list | | The filter sits between the heading and the first prompt row |
| 3 | And "All" is the first tab and is selected by default | | "All" is the first tab, shown as the active (white) tab, with no count |
| 4 | And one tab is shown for each engine present in the prompts of source B | Engines in scope: ChatGPT, Gemini, Perplexity | Exactly 3 engine tabs follow "All": ChatGPT, Gemini, Perplexity |
| 5 | And each engine tab shows the number of prompts of the list cited by that engine | | The tabs read "ChatGPT (28)", "Gemini (7)" and "Perplexity (71)", each with its icon; "All" covers 79 distinct prompts (counts overlap) |
| 6 | And the engine tabs are in the fixed order ChatGPT, Gemini, Perplexity, not sorted by count | QA decision (OP-17) | The order is "All", "ChatGPT (28)", "Gemini (7)", "Perplexity (71)", even though Perplexity has the highest count |

**TC-GEO-1178-011 — With 2 or 3 engines the engine tabs show the icon, the name and the count** (R-7) — *modified v5*
Priority: Medium | Smoke: No | Regression: No | UI | Precondition: PRE-A
**Note:** Known bug GEO-1187 — engine tab labels truncated, counts hidden.

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open | B = frandroid.com, 3 engines | The engine filter shows "All" and 3 engine tabs |
| 2 | Then each engine tab shows the engine icon, the engine name and the count in parentheses | | [icon] "ChatGPT (28)", [icon] "Gemini (7)", [icon] "Perplexity (71)" |
| 3 | When the user opens the details panel of source E2 | E2 = #22 prnewswire.com, 2 engines | The engine filter shows "All" and 2 engine tabs |
| 4 | Then each engine tab shows the engine icon, the engine name and the count in parentheses | | [icon] "ChatGPT (28)", [icon] "Gemini (8)"; "All" shows no count |
| 5 | And a prompt cited by both engines shows both icons and its flag | "Best hybrid cars?" | The row "“Best hybrid cars?”" shows the ChatGPT and Gemini icons and the US flag |

**TC-GEO-1178-012 — With more than 3 engines the engine tabs show only the icon and the count** (R-7) — **BLOCKED BY DATA**
Priority: Medium | Smoke: No | Regression: No | UI | Precondition: PRE-M. Not available on the Toyota staging analysis, where Grok and Claude are disabled (OP-21).

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source M is open | Source M: 4 or more engines | The engine filter shows "All" and one tab per engine |
| 2 | Then each engine tab shows only the engine icon and the count | | Each engine tab shows the icon followed by a bare number, with no engine name and no parentheses (design frame 15220:79515) |
| 3 | And the "All" tab is still displayed as "All" | | "All" is shown as the first tab, selected, with no count |

### AC-7

**TC-GEO-1178-013 — Selecting an engine tab keeps only its prompts and recalculates "Show X more prompts"** (AC-7, R-8)
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open with the engine filter on "All" | B = frandroid.com, 79 prompts | 6 prompt rows and "Show 73 more prompts" are shown |
| 2 | When the user selects the "ChatGPT (28)" engine tab | | "ChatGPT (28)" becomes the active (white) tab and "All" becomes inactive |
| 3 | Then the list only keeps the prompts cited by ChatGPT | | 6 rows are shown and each one has the ChatGPT icon |
| 4 | And the "Show X more prompts" count is recalculated for the ChatGPT tab | X = 28 - 6 = 22 | "Show 22 more prompts" is shown |
| 5 | When the user clicks "Show 22 more prompts" | | 28 rows are listed, each with the ChatGPT icon |
| 6 | When the user selects the "Perplexity (71)" engine tab | X = 71 - 6 = 65 | 6 rows with the Perplexity icon and "Show 65 more prompts" are shown |
| 7 | When the user selects the "Gemini (7)" engine tab | X = 7 - 6 = 1 | 6 rows with the Gemini icon and "Show 1 more prompt" are shown |
| 8 | When the user selects "All" again | | 6 rows and "Show 73 more prompts" are shown |

### AC-8

**TC-GEO-1178-014 — Engine tabs only list the engines in the AI Engines filter of the page** (AC-8)
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the user is on the Target Sources page with the filter "AI Engines 3" | 261 sources | frandroid.com is #1 |
| 2 | When the user opens the details panel of frandroid.com | | The engine filter shows "All", "ChatGPT (28)", "Gemini (7)" and "Perplexity (71)" |
| 3 | When the user closes the panel and turns Gemini off in the AI Engines filter of the page | AI Engines: ChatGPT, Perplexity | The filter badge reads "AI Engines 2" and the list is recalculated to 222 sources, with frandroid.com still #1 |
| 4 | And the user opens the details panel of frandroid.com again | | The panel opens with the footer "Source 1 of 222" |
| 5 | Then the engine filter only lists the engines in the current scope | | Only "All", "ChatGPT (28)" and "Perplexity (71)" are shown. No Gemini tab is present |
| 6 | And the prompts list only contains prompts cited by the engines in scope | | 6 rows and "Show 73 more prompts" are shown, and no row shows the Gemini icon |
| 7 | And the article counts follow the scope (observed, see OP-6) | | The tab reads "Lack of visibility (36)" and the card shows "Not visible in 36 articles" / "Negative perception in 5 articles" |

### AC-9

**TC-GEO-1178-015 — The prompts list shows 6 prompts before the "Show X more prompts" button** (AC-9, R-8)
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open with the engine filter on "All" | B = frandroid.com, 79 prompts | The prompts section is displayed |
| 2 | Then exactly 6 prompt rows are shown | | 6 prompt rows are visible |
| 3 | And the "Show X more prompts" button is shown under the 6th prompt | X = 79 - 6 = 73 | An outlined button "Show 73 more prompts" is centred under the 6th row |
| 4 | When the user clicks "Show 73 more prompts" | | The 73 remaining prompts are added to the list |
| 5 | Then all 79 prompts are listed | | 79 prompt rows are visible |

**TC-GEO-1178-016 — "Show 1 more prompt" uses the singular form when one prompt remains** (AC-9, R-8, R-11)
Priority: Medium | Smoke: No | Regression: No | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open | B = frandroid.com | The engine filter is on "All" |
| 2 | When the user selects the "Gemini (7)" engine tab | | The Gemini tab is active and 6 rows are shown |
| 3 | Then the button uses the singular form | X = 7 - 6 = 1 | "Show 1 more prompt" is shown (not "prompts") |
| 4 | When the user clicks "Show 1 more prompt" | | 7 rows are listed, each with the Gemini icon |

### AC-10

**TC-GEO-1178-017 — Previous / Next source rebuilds the article tabs and the engine filter for the new source** (AC-10)
Priority: Medium | Smoke: No | Regression: No | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source B is open | B = #1 frandroid.com | "Lack of visibility (39)" and "Negative perception (5)" are shown, the engine filter shows "All", "ChatGPT (28)", "Gemini (7)", "Perplexity (71)", and the footer reads "Source 1 of 261" |
| 2 | And the user selects the "Negative perception (5)" tab and the "ChatGPT (28)" engine tab | | Both tabs are active |
| 3 | When the user clicks "Next source" | | The panel shows "#2 · zonebourse.com" and the footer reads "Source 2 of 261" |
| 4 | Then the article tabs are rebuilt for the new source | zonebourse.com: missing only | Only "Lack of visibility (23)" is shown, with "None of these articles mentions Toyota anywhere on the page." |
| 5 | And the engine filter is rebuilt for the new source | zonebourse.com: 1 engine, 32 prompts | The engine filter shows "All" and "Perplexity (32)" only, with 6 rows and "Show 26 more prompts" |
| 6 | When the user clicks "Previous" | | The panel shows "#1 · frandroid.com" and the footer reads "Source 1 of 261" |
| 7 | Then the article tabs and the engine filter are rebuilt for source B | | "Lack of visibility (39)" is first and selected, "Negative perception (5)" is second, and the engine filter shows "All", "ChatGPT (28)", "Gemini (7)", "Perplexity (71)" with 6 rows and "Show 73 more prompts" |

### AC-11

**TC-GEO-1178-018 — New panel strings in en-GB** (AC-11, R-11)
Priority: Medium | Smoke: No | Regression: No | UI | Precondition: PRE-A, app language switched to en-GB

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the app language is en-GB and the details panel of source B is open | B = frandroid.com | The panel is displayed |
| 2 | Then the article tabs read in English | | "Lack of visibility (39)" and "Negative perception (5)" |
| 3 | And the explanation line of the missing tab reads in English | | "None of these articles mentions Toyota anywhere on the page." |
| 4 | When the user selects the "Negative perception (5)" tab | | "Each of these articles mentions Toyota negatively." |
| 5 | And the default engine tab reads "All" | | "All" |
| 6 | And the show more button reads in English (plural) | 73 remaining | "Show 73 more prompts" |
| 7 | When the user selects the "Gemini (7)" engine tab | 1 remaining | "Show 1 more prompt" (singular) |

**TC-GEO-1178-019 — New panel strings in en-US are the same as en-GB** (AC-11, R-11)
Priority: Medium | Smoke: No | Regression: No | UI | Precondition: PRE-A, app language en-US

These are the same 7 steps as TC-018, run in en-US. Expected strings: "Lack of visibility (39)", "Negative perception (5)", "None of these articles mentions Toyota anywhere on the page.", "Each of these articles mentions Toyota negatively.", "All", "Show 73 more prompts", "Show 1 more prompt".

**TC-GEO-1178-020 — New panel strings in fr-FR** (AC-11, R-11)
Priority: Medium | Smoke: No | Regression: No | UI | Precondition: PRE-A, app language switched to fr-FR

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the app language is fr-FR and the details panel of source B is open | B = frandroid.com | The panel is displayed in French |
| 2 | Then the article tabs read in French | | "Manque de visibilité (39)" and "Perception négative (5)" |
| 3 | And the explanation line of the missing tab reads in French | | "Aucun de ces articles ne mentionne Toyota sur la page." |
| 4 | When the user selects the "Perception négative (5)" tab | | "Chacun de ces articles mentionne Toyota de façon négative." |
| 5 | And the default engine tab reads "Tous" | | "Tous" |
| 6 | And the show more button reads in French (plural) | 73 remaining | "Afficher 73 prompts de plus" |
| 7 | When the user selects the "Gemini (7)" engine tab | 1 remaining | "Afficher 1 prompt de plus" |
| 8 | And the engine names are not translated | | "ChatGPT (28)", "Gemini (7)", "Perplexity (71)" are shown unchanged |

**TC-GEO-1178-021 — New panel strings in es-ES** (AC-11, R-11)
Priority: Medium | Smoke: No | Regression: No | UI | Precondition: PRE-A, app language switched to es-ES

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the app language is es-ES and the details panel of source B is open | B = frandroid.com | The panel is displayed in Spanish |
| 2 | Then the article tabs read in Spanish | | "Falta de visibilidad (39)" and "Percepción negativa (5)" |
| 3 | And the explanation line of the missing tab reads in Spanish | | "Ninguno de estos artículos menciona a Toyota en la página." |
| 4 | When the user selects the "Percepción negativa (5)" tab | | "Cada uno de estos artículos menciona a Toyota de forma negativa." |
| 5 | And the default engine tab reads "Todos" | | "Todos" |
| 6 | And the show more button reads in Spanish (plural) | 73 remaining | "Mostrar 73 prompts más" |
| 7 | When the user selects the "Gemini (7)" engine tab | 1 remaining | "Mostrar 1 prompt más" |
| 8 | And the engine names are not translated | | "ChatGPT (28)", "Gemini (7)", "Perplexity (71)" are shown unchanged |

### AC-12

**TC-GEO-1178-022 — Page name reads "Action Center" in en-US everywhere it is used** (AC-12, R-9)
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A, app language en-US

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the app language is en-US and the user is on the Toyota dashboard | | The dashboard is displayed |
| 2 | Then the page name in the layout (left menu entry) reads "Action Center" | key `layout.actionsCenter` | "Action Center" is shown, not "Actions Center" |
| 3 | When the user opens the page | `/actions` | The Target Sources page is displayed |
| 4 | Then the page title reads "Action Center" | key `views.actions.title` | "Action Center" is shown, not "Actions Center" |
| 5 | And no other place on the page shows "Actions Center" | | No breadcrumb, header or tab label shows "Actions Center" |

**TC-GEO-1178-023 — Page name reads "Action Center" in en-GB everywhere it is used** (AC-12, R-9) — *modified v5*
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-A, app language switched to en-GB
**Note:** QA decision 2026-10-02 — deviates from GEO-1178 AC-12 ('Action Centre'); expected to fail until GEO-1188 is fixed.

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the app language is en-GB and the user is on the Toyota dashboard | | The dashboard is displayed |
| 2 | Then the page name in the layout (left menu entry) reads "Action Center" | key `layout.actionsCenter`; QA decision, deviates from AC-12 (GEO-1188) | "Action Center" is shown (same as en-US), not "Action Centre" nor "Actions Centre" |
| 3 | When the user opens the page | `/actions` | The Target Sources page is displayed |
| 4 | Then the page title reads "Action Center" | key `views.actions.title`; QA decision, deviates from AC-12 (GEO-1188) | "Action Center" is shown (same as en-US), not "Action Centre" nor "Actions Centre" |
| 5 | And no other place on the page shows "Action Centre" or "Actions Centre" | | No breadcrumb, header or tab label shows "Action Centre" or "Actions Centre" |

**TC-GEO-1178-024 — French and Spanish page names are unchanged** (AC-12, R-9)
Priority: Medium | Smoke: No | Regression: No | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the app language is fr-FR and the user is on the Toyota dashboard | | The dashboard is displayed in French |
| 2 | Then the page name in the layout and the page title read "Centre d'actions" | | "Centre d'actions" is shown in both places |
| 3 | When the user switches the app language to es-ES | | The dashboard is displayed in Spanish |
| 4 | Then the page name in the layout and the page title read "Centro de acciones" | | "Centro de acciones" is shown in both places |

### AC-13

**TC-GEO-1178-025 — English PPT export slide header reads "ACTION CENTER · TARGET SOURCES" in en-US and en-GB** (AC-13, R-10) — *modified v5*
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-EXP

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the app language is en-US and the user is on the Target Sources page | | The page is displayed |
| 2 | When the user exports the analysis in PPT format | Export format: PPT | The PPT file is downloaded |
| 3 | Then the Target Sources slide header reads "ACTION CENTER · TARGET SOURCES" | | "ACTION CENTER · TARGET SOURCES" is shown and "ACTIONS · TARGET SOURCES" is not |
| 4 | When the user switches the app language to en-GB and exports in PPT again | Export format: PPT | The PPT file is downloaded |
| 5 | Then the Target Sources slide header reads "ACTION CENTER · TARGET SOURCES" | One English string for en-GB and en-US (ticket) | Same English string as in en-US: "ACTION CENTER · TARGET SOURCES" (not "ACTION CENTRE", not "ACTIONS") |

**TC-GEO-1178-026 — English PDF export slide header reads "ACTION CENTER · TARGET SOURCES" in en-US and en-GB** (AC-13, R-10) — *modified v5*
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-EXP

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the app language is en-US and the user is on the Target Sources page | | The page is displayed |
| 2 | When the user exports the analysis in PDF format | Export format: PDF | The PDF file is downloaded |
| 3 | Then the Target Sources page header reads "ACTION CENTER · TARGET SOURCES" | | "ACTION CENTER · TARGET SOURCES" is shown and "ACTIONS · TARGET SOURCES" is not |
| 4 | When the user switches the app language to en-GB and exports in PDF again | Export format: PDF | The PDF file is downloaded |
| 5 | Then the Target Sources page header reads "ACTION CENTER · TARGET SOURCES" | One English string for en-GB and en-US (ticket) | Same English string as in en-US: "ACTION CENTER · TARGET SOURCES" (not "ACTION CENTRE", not "ACTIONS") |

**TC-GEO-1178-027 — No export shows "Actions Center" or "Actions Centre"** (AC-13)
Priority: High | Smoke: No | Regression: Yes | Functional | Precondition: PRE-EXP

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the app language is en-GB and the user is on the Target Sources page | | The page is displayed |
| 2 | When the user exports the analysis in PPT, PDF and Excel formats | Formats: PPT, PDF, Excel | The 3 files are downloaded |
| 3 | Then a text search in each file finds neither "Actions Center" nor "Actions Centre" | Search terms: "Actions Center", "Actions Centre" (case-insensitive) | 0 matches in the PPT, PDF and Excel files |
| 4 | When the user switches the app language to en-US and exports again in the 3 formats | | The 3 files are downloaded |
| 5 | Then a text search in each file finds neither "Actions Center" nor "Actions Centre" | | 0 matches in the PPT, PDF and Excel files |

### R-10 (non-English export header)

**TC-GEO-1178-028 — French and Spanish PPT/PDF headers keep "ACTIONS" and "ACCIONES"** (R-10)
Priority: Medium | Smoke: No | Regression: No | Functional | Precondition: PRE-EXP

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the app language is fr-FR and the user is on the Target Sources page | | The page is displayed in French |
| 2 | When the user exports the analysis in PPT and PDF formats | | Both files are downloaded |
| 3 | Then the Target Sources slide header starts with "ACTIONS" | section.actions FR | The header still reads "ACTIONS · …" (unchanged) in both files |
| 4 | When the user switches the app language to es-ES and exports in PPT and PDF | | Both files are downloaded |
| 5 | Then the Target Sources slide header starts with "ACCIONES" | section.actions ES | The header still reads "ACCIONES · …" (unchanged) in both files |

### R-11 (static review of keys)

**TC-GEO-1178-029 — New keys exist in the four locales and the old panel keys are no longer used** (R-11, supports AC-11)
Priority: Low | Smoke: No | Regression: No | Functional | Precondition: read access to the frontend locale files (en-GB, en-US, fr-FR, es-ES) and ExportI18n of the GEO-1178 build

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the four locale files of the GEO-1178 build are open | en-GB, en-US, fr-FR, es-ES | The files are readable |
| 2 | Then the new keys exist in each locale with the strings of the ticket | panel.lackOfVisibilityTab, panel.negativePerceptionTab, panel.lackOfVisibilityIntro, panel.negativePerceptionIntro, panel.allEngines | Each key is present in the 4 files with the EN/FR/ES string of the Translations table (en-US = en-GB) |
| 3 | And views.actions.title and layout.actionsCenter have the new English values | QA decision, deviates from AC-12 (GEO-1188) | en-US "Action Center", en-GB "Action Center", fr-FR "Centre d'actions", es-ES "Centro de acciones" |
| 4 | And section.actions in ExportI18n has the new English value | | EN "ACTION CENTER" (one string for en-GB and en-US, as per ticket), FR "ACTIONS", ES "ACCIONES" |
| 5 | And the keys no longer used are not referenced by the panel | panel.missingTab, panel.negativeTab, panel.noMention, panel.describesNegatively | No UI code references these keys (whether they must also be deleted is open, see OP-9) |

### [Figma] / [Observed] — states not covered by an AC

**TC-GEO-1178-030 — [Figma] No "Show more prompts" button when the tab has 6 prompts or fewer** (AC-9, R-8; frames 13746:123761, 15688:25012; staging boundary)
Priority: Medium | Smoke: No | Regression: No | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source S6 is open with the engine filter on "All" | S6 = #10 youtube.com, exactly 6 prompts | The engine filter shows "All", "ChatGPT (2)", "Gemini (1)", "Perplexity (4)" and 6 prompt rows are listed |
| 2 | Then no show-more button is displayed | Boundary: exactly 6 | No "Show X more prompts" button is shown under the list |
| 3 | When the user selects the "Gemini (1)" engine tab | | 1 prompt row is listed, with the Gemini icon |
| 4 | Then no show-more button is displayed | Fewer than 6 | No "Show X more prompts" button is shown under the list |
| 5 | When the user opens the details panel of #16 evupdatemedia.us | 1 engine, exactly 6 prompts | "All" and "ChatGPT (6)" are shown with 6 prompt rows and no "Show X more prompts" button |

**TC-GEO-1178-031 — [Figma] Panel footer shows "Previous", the "Source k of M" counter and "Next source", with Previous disabled on the first source** (AC-10 context; frames 13746:123761, 15220:79515)
Priority: Medium | Smoke: No | Regression: No | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of frandroid.com is open | Ranked #1 | The panel header reads "#1 · frandroid.com" |
| 2 | Then the footer shows the navigation controls | M = 261 | The footer shows "Previous", "Source 1 of 261" and "Next source" with a right chevron |
| 3 | And the "Previous" button is disabled | | "Previous" is greyed out and clicking it does nothing |
| 4 | When the user clicks "Next source" | | The panel shows "#2 · zonebourse.com" and the footer reads "Source 2 of 261" |
| 5 | Then the "Previous" button is enabled | | "Previous" is active |

**TC-GEO-1178-032 — [Figma] Panel header shows rank · domain, type chip and reason badges** (frames 13746:123761, 15220:79515)
Priority: Low | Smoke: No | Regression: No | UI | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of frandroid.com is open | B = #1 frandroid.com (Journalism) | The panel header is displayed with a close (×) icon |
| 2 | Then the header shows the source logo or favicon and "#1 · frandroid.com" | | "#1 · frandroid.com" |
| 3 | And the header shows the type chip of the source | | "Journalism" |
| 4 | And the header shows the reason badges of the source | | The "Improve visibility" and "Improve perception" badges are shown (see OP-18) |

**TC-GEO-1178-033 — [Figma] Details panel opened from the list view shows the same tabs and prompts** (AC-3 context; frame 13746:122399)
Priority: Medium | Smoke: No | Regression: No | Functional | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the user is on the Target Sources page in list view | | The Target Sources table is displayed with frandroid.com in row 1 |
| 2 | When the user clicks the row of frandroid.com | | The details panel of frandroid.com opens over the table and the row is highlighted |
| 3 | Then the article tabs are the same as from the card view | | "Lack of visibility (39)" (selected) and "Negative perception (5)" are shown with "None of these articles mentions Toyota anywhere on the page." |
| 4 | And the prompts section is the same as from the card view | | "Prompts associated with this source", "All", "ChatGPT (28)", "Gemini (7)", "Perplexity (71)", 6 rows and "Show 73 more prompts" are shown |

**TC-GEO-1178-034 — [Figma] Selected state of the article tabs, engine tabs and coloured explanation lines** (R-1, R-7; frames 13746:123761, 13861:13367, 15688:25012)
Priority: Low | Smoke: No | Regression: No | UI | Precondition: PRE-A

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of frandroid.com is open | | "Lack of visibility (39)" is selected |
| 2 | Then the selected article tab is highlighted | | "Lack of visibility (39)" is a white segment with a blue eye-off icon and text; "Negative perception (5)" is grey |
| 3 | And the explanation line uses the colour and icon of its tab | | "None of these articles mentions Toyota anywhere on the page." is blue with the eye-off icon |
| 4 | When the user selects the "Negative perception (5)" tab | | "Negative perception (5)" becomes the white segment and "Lack of visibility (39)" turns grey |
| 5 | Then the explanation line uses the colour and icon of its tab | | "Each of these articles mentions Toyota negatively." is purple with the thumb-down icon |
| 6 | When the user selects the "Gemini (7)" engine tab | | "Gemini (7)" becomes a white tab with the coloured Gemini icon and "All" becomes grey |

**TC-GEO-1178-035 — [Observed] With a single engine the filter shows "All" and one engine tab with icon, name and count** (R-7, OP-3; staging behaviour, not specified by ticket or design) — *new v3*
Priority: Low | Smoke: No | Regression: No | UI | Precondition: PRE-A
**Note:** pending PO confirmation (comment on GEO-1178). The expected results describe the behaviour observed on staging 2026-10-02.

| # | Test step | Test data | Expected result |
|---|-----------|-----------|-----------------|
| 1 | Given the details panel of source E1 is open | E1 = #2 zonebourse.com, 1 engine, 32 prompts | The prompts section is displayed |
| 2 | Then the engine filter is still displayed | | The filter shows "All" (selected, no count) and one engine tab "Perplexity (32)" with its icon |
| 3 | And the prompts list shows 6 rows and the show-more button | X = 32 - 6 = 26 | 6 rows with the Perplexity icon and "Show 26 more prompts" |
| 4 | When the user selects the "Perplexity (32)" tab | | The same 6 rows and "Show 26 more prompts" are shown |

---

## Automation notes (for later spec generation, not CSV content)

- Prompt rows: `li[data-testid="actions-panel-prompt-row"]` with a `data-engines` attribute (use it for the icon-per-engine assertions in TC-009/013/014).
- Engine tabs: `[data-testid="actions-panel-engine-tab-{all|openai|gemini|perplexity}"]`.
- Footer counter "Source k of M" and header "#k · domain" are visible text and can be used as navigation checks.

## Changes vs v4 (GEO-1188 re-scoping, QA decision 2026-10-02)

- **TC-023:** the en-GB page name is now expected to read "Action Center" (left menu and page title), not "Action Centre". A note says this deviates from AC-12 and is expected to fail until GEO-1188 is fixed. The title was changed accordingly.
- **TC-025 / TC-026:** the en-GB export header is reverted to "ACTION CENTER · TARGET SOURCES" (same as en-US, as per ticket) and the expected-failure note is removed.
- **TC-029:** en-GB views.actions.title / layout.actionsCenter = "Action Center" (GEO-1188 note); section.actions EN "ACTION CENTER" for en-GB and en-US.
- **TC-010 / TC-011:** note "Known bug GEO-1187 — engine tab labels truncated, counts hidden."
- **TC-022 (en-US "Action Center") and TC-027 (no "Actions Center"/"Actions Centre" in exports):** checked, still consistent, unchanged.
- **OP-11:** resolved — "exports correct; bug is the en-GB UI page name (GEO-1188)". OP-6 is unchanged.

## Changes vs draft v3 (user decisions)

- **PRE-A:** the starting app language is en-US (OP-22). Added the data-volatility rule: counts depend on "Last 7 days" (captured 2026-10-02) and must be re-checked on staging just before execution (OP-23).
- **TC-025 / TC-026:** they now start in en-US ("ACTION CENTER · TARGET SOURCES") and switch to en-GB, where the expected header is "ACTION CENTRE · TARGET SOURCES". A note says this deviates from the ticket by QA decision: en-GB currently reads "ACTION CENTER", so the step is expected to fail and is to be reported as a bug (OP-11).
- **TC-029 step 4:** aligned with OP-11 (section.actions en-GB = "ACTION CENTRE").
- **TC-010:** new step 6 asserts the fixed engine order "All", "ChatGPT (28)", "Gemini (7)", "Perplexity (71)", not sorted by count (OP-17) (5 → 6 steps).
- **TC-035:** note "pending PO confirmation (comment on GEO-1178)" (OP-3).

## Changes vs draft v2

- **Placeholders replaced with real staging data in every panel TC** (001–011, 013–018, 020, 021, 030–034, and TC-019 by reference):
  - B = frandroid.com (39/5; 79 prompts; ChatGPT 28 / Gemini 7 / Perplexity 71; "Show 73 / 22 / 1 / 65 more prompts").
  - V = zonebourse.com (23).
  - P = trustpilot.com (10).
  - E2 = prnewswire.com (ChatGPT 28 / Gemini 8, "Best hybrid cars?" US).
  - S6 = youtube.com and evupdatemedia.us (exactly 6 prompts).
  - Multi-engine prompt "“Best Voitures Électriques?”" (FR, 3 engines).
- **TC-005:** added the step "Show 29 more articles" to reach 39 rows (7 → 8 steps).
- **TC-011:** added a prompt-row step for E2 (4 → 5 steps).
- **TC-013:** added the Perplexity step "Show 65 more prompts" (7 → 8 steps).
- **TC-014:** now turns Gemini off ("AI Engines 2", 261 → 222 sources, "Source 1 of 222", no Gemini tab) and adds an observed step on article counts (39 → 36) (6 → 7 steps).
- **TC-017:** Next from frandroid.com → zonebourse.com rebuilds both article tabs and the engine filter ("Perplexity (32)" only, "Show 26 more prompts").
- **TC-018 to TC-021:** strings use the real counts: "Show 73 more prompts" / "Afficher 73 prompts de plus" / "Mostrar 73 prompts más", and the singular on the Gemini (7) tab.
- **TC-030:** renamed "6 prompts or fewer", with the exactly-6 boundary on youtube.com and evupdatemedia.us (4 → 5 steps).
- **TC-012:** marked **BLOCKED BY DATA** (no 4+ engine source available).
- **New TC-035** [Observed]: single-engine display (zonebourse.com "All" + "Perplexity (32)").
- **PRE-A:** dashboard `439acd96-…`, filters "Last 7 days" / "AI Engines 3" / "All Countries", 261 sources, app language English (en-US to confirm). TC-018 and TC-023 now switch explicitly to en-GB.
- **New section:** Automation notes (data-testid hooks).

## Coverage summary (v5)

- **Total TCs:** 35 (29 AC/rule-derived + 5 [Figma] + 1 [Observed]). 1 of them (TC-012) is blocked by data.
- **Total steps:** 192 (the CSV will have 192 data rows: 185 written in tables + 7 for TC-019, which mirrors TC-018)
- **Expected failure (by QA decision):** TC-023 steps 2, 4 and 5 (en-GB page name "Action Center"), until GEO-1188 is fixed
- **Known bug:** GEO-1187 (engine tab labels truncated, counts hidden) affects TC-010 and TC-011
- **Priority:** Urgent 0 / High 16 / Medium 15 / Low 4
- **Smoke = Yes:** TC-003, TC-009
- **QA Regression = Yes:** the 16 High TCs
- **UI / Functional:** UI 10 (TC-007, 011, 012, 018–021, 032, 034, 035) / Functional 25
- **Coverage type:**
  - Happy path: 20 (TC-003, 005–010, 013, 015, 018–023, 025–027, 029, 033)
  - Edge / boundary: 8 (TC-001, 002, 011, 012, 016, 024, 030, 035)
  - State transition: 5 (TC-004, 014, 017, 028, 031)
  - UI / visual [Figma]: 2 (TC-032, 034)
  - Error handling: 0. No AC describes an error path.
- **AC coverage:** 13/13 ACs and all 11 rules are covered, and all 5 Figma frames are referenced.
- **ACs filtered as technical:** none.

---

## Ambiguities and open points

### Resolved or observed

| # | Resolution |
|---|------------|
| OP-1 | **Resolved.** With exactly 6 prompts there is no button (youtube.com and evupdatemedia.us on staging, consistent with the design). Covered by TC-030. |
| OP-3 | **Observed, pending PO.** With a single engine, staging shows "All" + one tab "Perplexity (32)" (icon, name, count). Covered by TC-035 as [Observed]. It will be raised to the PO in a comment on GEO-1178. |
| OP-4 | **Resolved by design and staging.** With 2–3 engines the tabs show icon + name + "(count)". "All" has no count. |
| OP-6 | **Observed, still under discussion.** The article counts follow the AI Engines filter: with Gemini off, frandroid.com goes from "Lack of visibility (39)" to "(36)" and the card from "Not visible in 39 articles" to "36". Asserted in TC-014 step 7. The ticket does not state it, so please confirm. |
| OP-12 | **Resolved except source M.** Real staging data is in place (see table). |
| OP-13 | **Resolved.** Figma pass done. |
| OP-11 | **Resolved: exports correct; bug is the en-GB UI page name (GEO-1188).** PPT/PDF headers read "ACTION CENTER · TARGET SOURCES" in en-GB and en-US, as per ticket (TC-025/026). The en-GB page name must read "Action Center" like en-US (QA decision, deviates from AC-12, PO to align). TC-023 is expected to fail until GEO-1188 is fixed. |
| OP-17 | **Resolved.** The expected behaviour is the staging one: a fixed engine order ChatGPT, Gemini, Perplexity, not sorted by count. Asserted in TC-010 step 6. Related known bug: GEO-1187 (engine tab labels truncated, counts hidden), noted on TC-010/011. |
| OP-22 | **Resolved.** The starting app language is en-US. TC-018/019/022/023 still test en-US and en-GB explicitly. |
| OP-23 | **Resolved.** The volatility rule is added to the shared preconditions (re-check counts on staging just before execution). |

### Still open

| # | Topic | Open question |
|---|-------|---------------|
| OP-2 | Show more behaviour | It is unknown whether "Show 73 more prompts" reveals all remaining prompts (assumed in TC-015 and TC-009) or another batch, and whether a "Show less" exists. Please confirm on staging. |
| OP-5 | Tab reset on Previous / Next | TC-017 navigates to a source with a different structure, so the reset of the selection is not asserted. Please confirm that the article tab and engine tab reset to their defaults when going back to a source. |
| OP-7 | Places using the page-name keys | TC-022/023 check the left menu entry and the page title only. |
| OP-8 | Full FR/ES export header | Only "ACTIONS" / "ACCIONES" is specified. |
| OP-9 | Old keys | It is not said whether the old keys must be deleted from the files or only left unused. |
| OP-10 | Excel content | Only the absence of "Actions Center" / "Actions Centre" is asserted. |
| OP-14 | GEO-1168 overlap | GEO-1168 TC-001 to 004 and TC-006 should be reviewed or marked superseded. |
| OP-15 | Page name in the design | The Figma frames still show "Actions Center". Staging shows "Action Center", which matches the ticket. |
| OP-16 | Design mock data | Engine counts in frame 15220:79515 are inconsistent with "Show 12 more prompts". This does not matter for testing, since staging is consistent (counts overlap, "All" counts each prompt once). |
| OP-18 | Header badges | One design frame shows only one badge for a two-reason source. TC-032 expects both. Please check on staging. |
| OP-19 | Row icons inside an engine tab | It is unknown whether a row inside an engine tab keeps the icons of the other citing engines. Only the presence of the selected engine icon is asserted. |
| OP-20 | Footer label asymmetry | The labels are "Previous" vs "Next source", confirmed on staging. Is this intended? |
| OP-21 | **New.** TC-012 blocked by data | No analysis with 4 or more engines: Grok and Claude are disabled on the Toyota analysis and cannot be enabled. An analysis with 4+ engines is needed to run TC-012. |

---

**Next step:** after validation I will write `.claude/Data/output/csv/GEO-R1.2/testcases-coverage-storyGEO-1178.csv`. It will use the 16 columns, `;` separator, one step per row and first-row-only case fields, as in the GEO-1168 CSV.
