# GEO-1183 — Test case review (v1, CSV generated)

**Story:** GEO-1183 — [Target Sources] The passage must always include the brand or product name
**Epic:** GEO-152 | **Version:** GEO-R1.2 | **Status in Jira (2026-10-06):** Action Needed (local copy says Code Review)
**Source:** `apps/geo/GEO-R1.2/GEO-152/STORY_GEO-1183_Target_Sources_The_passage_must_always_include_the_brand_or_.md` (local copy 2026-10-02), cross-checked with the live Jira description (read-only REST, updated 2026-10-06T05:59).
**Mode:** no `--figma`
**CSV:** `.claude/Data/output/csv/GEO-R1.2/testcases-coverage-storyGEO-1183.csv` — 9 TCs, 47 step rows, 16 columns, `;` separator

## Jira vs local copy

The "Acceptance criteria" and "Requirement" sections in Jira are **identical** to the local copy, so the ACs did not change. The only differences are:

- the status, now "Action Needed"
- the QA comment of 2026-10-05, verdict FAIL:
  - AC1 PASS
  - AC2 FAIL 1/93 (Nike, bloomberg.com)
  - AC3 140 chars PASS, "…" joins FAIL (GEO-1201)
  - AC4 NOT VERIFIABLE

The local story file was not modified.

## Test data

- **Environment:** staging `https://staging-geo.onclusive.com/geo`, organisation **Onclusive**, interface en-GB.
- **Panel strings** (screenshot `.claude/Data/output/reports/runs/GEO-R1.2_GEO-152_09112026-1404/screenshots-GEO-1183/bug_GEO-1183_step2.png`):
  - header "#N · domain"
  - tab "Negative perception (N)"
  - line "Each of these articles mentions Tesla negatively."
  - the passage is in italics inside curly quotes, and the brand is shown in bold on a highlight chip
  - footer "Source k of M" / "Next source"
- **Reference capture:** `.claude/Data/processed/testcases/test-results/geo1183-passages-20261006.json` (2026-10-06 09:56 UTC). It is post-deployment and was taken after the first re-judge.

| Analysis | Dashboard | Period / filters (capture) | Snapshot | Sources | With negative | Negative passages |
|---|---|---|---|---|---|---|
| Tesla | `4419839a-317f-4f9d-8a8c-32184906a2aa` | "5 Oct 2026", AI Engines 3, United States - English | `c5e3bc35-…` | 36 | 29 | 54 |
| Nike | `51f6eb92-0d7a-4c77-8fa8-e46d5d610309` (see OP-7) | "6 Oct 2026", AI Engines 5, United States - English | `04742461-…` | 42 | 29 | 41 |
| Lidl Nederland | `1444d4ef-9555-4c35-bfd6-52af5128e180` | "Last 7 days" (29 Sep–5 Oct), AI Engines 2, United Kingdom - English | `7c3dc64d-…` | 66 | 25 | 29 |

## Observations from the capture (2026-10-06)

These are not TC content. They are useful at execution time.

- **AC-1:**
  - The caranddriver.com passage is now "into believing the car is burning dinosaur remains. And before any Tesla loyalists complain that we aren't giving the Cybertruck its due," (137 chars).
  - It contains "Tesla" and "Cybertruck", so AC-1 passes.
  - It has **lost the criticism** ("broke on the second day"), see OP-4.
- **AC-2:**
  - All 124 passages contain the matched entity (case-insensitive), except electrek.co "Tesla Cybercab". That passage reads "Tesla to prove its Cybercab", so the name is present but not highlighted (GEO-1182).
  - The consumerreports.org passage contains "tesla" only inside a markdown link URL (OP-3).
- **AC-3:**
  - No passage is longer than 140 characters.
  - Only 1 passage contains "…", and that "…" is page text (dohmenadvocaten.nl).
  - Many passages still end mid-word at 139–140 chars (GEO-1201).
  - Raw markdown is present (GEO-1202).

## AC inventory

The ACs are not numbered in Jira, so they are numbered here in reading order. The "Requirement" bullets are labelled R-1…R-5. They are context only and no TC is generated from them on their own.

```
Story GEO-1183 — 4 ACs identified:
AC-1: caranddriver.com "2024 EV of the Year" passage contains Tesla/Cybertruck + name highlighted → TC-GEO-1183-001
AC-2: no passage missing the brand/product name (Tesla, Nike, Lidl NL on staging) → TC-GEO-1183-002, -003, -004
AC-3: passages verbatim (apart from "…" joins) and ≤ 140 characters → TC-GEO-1183-005, -006, -007, -008
AC-4: verdicts unchanged after the re-judge → TC-GEO-1183-009 (conditional, OP-1/OP-2)
```

R-1 is "fits → kept as is". R-2 is "does not fit → name part + criticism part joined with …". R-3 is "each part verbatim, 140 limit on the whole". R-4 is "the returned entity is exactly as in the passage (highlight)". R-5 is "fallback to the prefilter window when the name is missing".

No bullet was filtered as technical, because the ACs have no technical bullets. The Context and Requirement paragraphs mention DepictionPrompt.VERSION and PromptTemplateBuilder. These are not ACs and are not tested.

## Shared fields

- QA Parent = `GEO-152`
- Components = `GEO`
- QA Component = `GEO Module`
- QA Story/Task = `GEO-1183`
- Test Type = `Manual`
- Labels empty
- QA Regression = Yes for High, No for Medium
- The precondition is on the first row: deployment and re-judge done, organisation Onclusive, en-GB, analysis URL, period, capture reference, and a drift warning

## TCs grouped by AC

### AC-1

**TC-GEO-1183-001 — Car and Driver EV of the Year passage contains Tesla or Cybertruck and the name is highlighted** | High | Smoke Yes | Regression Yes | Functional | Happy path

1. **Given** the user is on the Action Center of the Tesla analysis (`/dashboard/4419839a-…/actions`, "5 Oct 2026").
   → The Target Sources cards are displayed on the ALL tab.
2. **And** the caranddriver.com card is displayed (#5 on 5 Oct, #11 on 4 Oct).
   → The card shows IMPROVE PERCEPTION and "Negative perception in N articles".
3. **When** the user opens the details panel of caranddriver.com.
   → The panel shows "#N · caranddriver.com", "Negative perception (N)" and "Each of these articles mentions Tesla negatively."
4. **And** the user locates "Presenting Car and Driver's 2024 EV of the Year".
   → The row shows the title, the URL and a quoted passage in italics.
5. **Then** the passage contains "Tesla" or "Cybertruck".
   → The passage contains the name and is no longer the old name-less text.
6. **And** the name is highlighted.
   → "Tesla" (or "Cybertruck") is shown in bold on a highlight chip.

### AC-2

There is one TC per analysis named in the AC: separate URLs, periods and reference totals. Each TC goes through all the negative passages of its analysis with "Next source".

**TC-GEO-1183-002 — Tesla analysis: no negative passage is missing the brand or product name** | High | Regression Yes | Functional | Happy path

1. **Given** the user is on the Tesla Action Center.
   → The cards are on the ALL tab.
2. **And** the user selects "Improve perception".
   → Only IMPROVE PERCEPTION sources are listed.
3. **When** the user opens the panel of source #1.
   → The panel has the header "#1 · …", the tab "Negative perception (N)" and the brand line.
4. **Then** every passage contains the brand or a product name.
   - Watch-list: consumerreports.org (OP-3), electrek.co Cybercab.
   → No passage without the name.
5. **And** the user repeats the check with "Next source" to the last source (54 passages in the capture).
   → None is missing the name.

**TC-GEO-1183-003 — Nike analysis: no negative passage is missing the brand or product name**

Same structure as TC-002, on the Nike report `51f6eb92-…`, "6 Oct 2026", 41 passages. The watch-list is bloomberg.com "Athletic Shoe Brands Hoka, On Running…", which failed on 2026-10-05 in the former report.

**TC-GEO-1183-004 — Lidl Nederland analysis: no negative passage is missing the brand or product name**

Same structure as TC-002, on Lidl Nederland, "Last 7 days", 29 passages. The watch-list is trustpilot.com, whose matched entity is "Lidl Nederland".

### AC-3

**TC-GEO-1183-005 — Negative passages are at most 140 characters in the three analyses** | High | Regression Yes | Functional | Edge (boundary)

1. **Given** the user is on the Tesla Action Center.
2. **When** the user opens each source panel with negative articles ("Next source").
3. **Then** each passage is ≤ 140 characters.
   - The text inside the quotes counts, the quotes do not.
   - Spaces and "…" count as 1 character (OP-5).
4. **And** the same check is done on Nike (41 passages).
5. **And** the same check is done on Lidl Nederland (29 passages).

**TC-GEO-1183-006 — A sentence longer than 140 characters is shortened with "…" joins and not cut mid-word** | High | Regression Yes | Functional | Edge / error

Known bug: GEO-1201.

1. **Given** the user is on the caranddriver.com panel (Tesla).
2. **When** the user reads the passage of the "2024 EV of the Year" article. The page sentence is 213 chars.
3. **Then** the passage is shortened with "…" at each cut, in the Jira example shape. It must not end on a partial word ("e", "abus").
4. **And** the passage keeps both the name part and the criticism part ("broke on the second day"). This step comes from R-2 (OP-4).
5. **And** no passage in the 3 analyses ends mid-word.
   - Capture examples: "…Maybe the car was abus", "…from both model", "…as soon as I o".

**TC-GEO-1183-007 — Each part of a passage is verbatim from the article page** | High | Regression Yes | Functional | Happy path

1. **Given** the user is on the caranddriver.com panel (Tesla).
2. **When** the user opens the article URL in a new tab.
3. **Then** each part of the passage is found on the page as-is (same words, case and punctuation). The passage is split on "…" and each part is searched with Ctrl+F.
4. **And** the same check is done on a Nike passage (sgbonline.com "Stifel's 2025 All-Star Sneaker Survey…").
5. **And** the same check is done on a Lidl Nederland passage (birminghammail.co.uk "I don't like singling Lidl out…").

If an article is behind a paywall or has been removed, replace it with another passage from the same analysis. Such a case is not a FAIL.

**TC-GEO-1183-008 — Passages show the page text without raw markdown syntax** | Medium | Regression No | Functional | Error

Known bug: GEO-1202. Scope: OP-6.

1. **Given** the user is on the insideevs.com panel (Tesla).
2. **When** the user reads the "Best EVs To Buy In March 2026" passage. The capture has "[Tesla did remove standard Autosteer](https://…)".
3. **Then** only the link text is shown, with no "[", "](" or URL.
4. **And** the Nike passages (dickssportinggoods.com "**shoes**", thestreet.com "# Nike making…") show no "**" or "#".
5. **And** no passage in the 3 analyses contains "](http".

### AC-4

**TC-GEO-1183-009 — Verdicts of the Target Sources are unchanged after the re-judge** | High | Regression Yes | Functional | State transition (conditional)

1. **Given** the reference capture is available. It lists the negative articles per source.
2. **And** a re-judge has run after 2026-10-06 09:56 UTC on the same snapshots. The developer confirms the date.
3. **When** the user opens the Tesla Action Center with the capture filters.
   → 36 sources are listed, 29 of them in Improve perception.
4. **Then** each source shows the same "Negative perception in N articles" as in the capture (54 articles in total).
5. **And** each panel lists the same negative article URLs. No article is added or removed, and only the passage text may differ.
6. **And** the same comparison is done for Nike (29/41) and Lidl Nederland (29 Sep–5 Oct 2026, 25/29).

Without a later re-judge on the same snapshots, this TC is **BLOCKED / not UI-verifiable**. See OP-1 and OP-2.

## Coverage summary

| AC | TCs | Type |
|---|---|---|
| AC-1 | 001 | Happy path |
| AC-2 | 002, 003, 004 | Happy path (one per analysis) |
| AC-3 | 005, 006, 007, 008 | 005 edge (boundary), 006 edge/error, 007 happy path, 008 error |
| AC-4 | 009 | State transition (conditional) |

- **Totals:** 9 TCs, 47 step rows.
- **Breakdown:** happy path 5 (001–004, 007), edge 2 (005, 006), error 1 (008), state 1 (009).
- **Smoke:** TC-001 only.
- **Priority:** High 8, Medium 1.
- **Filtered as technical:** none.
- **Not separately tested:**
  - R-1 is implicit in 005/007.
  - R-5 (fallback to the prefilter window) cannot be told apart in the UI from a "good" LLM passage. Its outcome is covered by AC-2 (002–004).

## Open points (decision needed)

- **OP-1 — AC-4 has no true "before" baseline.**
  - The verdicts were already re-judged before 2026-10-05, because the caranddriver passage changed after the ticket was written.
  - No capture exists from before the first re-judge, so AC-4 cannot be verified for that re-judge through the UI.
  - TC-009 only checks the **next** re-judge against the 2026-10-06 capture. That re-judge will happen, for example, with the fix of GEO-1201 and the AC-2 fallback, which bumps the prompt version again.
  - Options:
    - (a) keep TC-009 as conditional
    - (b) ask the developer for a DB/log comparison of the verdicts before and after the re-judge and mark AC-4 as verified by dev evidence
    - (c) mark AC-4 as not UI-verifiable
- **OP-2 — The AC-4 comparison is limited to negative verdicts on fixed snapshots.**
  - The capture holds only negative articles, so "Improve visibility" verdicts (brand absent) are not compared.
  - Lidl uses "Last 7 days", which is a rolling window. The capture window 29 Sep–5 Oct 2026 must be reselected as a date range, and the date picker may not allow it.
  - A new snapshot on the same analyses will change the counts. Should a capture of the missing articles be added before the next re-judge?
- **OP-3 — Is a name found only inside a link URL "present"?**
  - consumerreports.org (Tesla) reads "RECALL ALERT: There are 24 recalls on this vehicle. [Learn More.](https://www.consumerreports.org/cars/tesla/…".
  - The string "tesla" appears only inside the URL, which the page does not show as text.
  - The TCs check the readable passage text. Is this passage a FAIL of AC-2, or is it handled through GEO-1202?
- **OP-4 — Is keeping the criticism acceptance-binding?**
  - R-2 says the passage keeps "the part with the name and the part with the criticism". The ACs only require the name.
  - The current caranddriver passage contains "Tesla"/"Cybertruck" but not "broke on the second day", so TC-001 passes and TC-006 step 4 fails.
  - Confirm with the PO whether step 4 stays in TC-006.
- **OP-5 — How is "…" counted?**
  - TC-005 counts "…" as 1 character (U+2026) and excludes the curly quotes. If the backend uses "..." (3 chars), the count changes. Please confirm.
- **OP-6 — Is raw markdown a GEO-1183 AC-3 failure?**
  - Raw markdown (GEO-1202) is text that does not appear on the rendered page, so TC-008 treats it as a "verbatim" violation.
  - If the PO tracks it only in GEO-1202, TC-008 can be moved to the GEO-1202 bug or kept here at Medium.
- **OP-7 — Which Nike report should be used?**
  - The Nike report named in the 2026-10-05 QA comment (`8f6d09b3-…`) returns "Report unavailable" since 2026-10-06.
  - The TCs use the only Nike report in org Onclusive, `51f6eb92-…`. It was created 2026-10-06 05:53 UTC with status COMPLETED_PARTIAL and 1 snapshot.
  - Confirm that this is the Nike analysis the AC means.
- **OP-8 — Highlight beyond caranddriver is not in the ACs.**
  - R-4 (entity exactly as in the passage) is only checked through AC-1, on caranddriver.
  - The electrek.co "Tesla Cybercab" passage has no highlight, which is tracked in GEO-1182. Should a highlight sweep over all passages be added to AC-2 TCs?
