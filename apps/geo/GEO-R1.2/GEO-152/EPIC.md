# Actions Center - Target Sources

**Epic ID:** GEO-152
**Status:** [QA IN PROGRESS] QA In Progress
**Assigned to:** Youssef.AitLaydi
**Created:** 2026-04-06
**Updated:** 2026-09-25
**Jira link:** https://onclusive.atlassian.net/browse/GEO-152

## Description / Functional Need

PR professionals using GEO need to act on what the analysis finds, not only watch it. Prospects say this directly: the tool must help identify which media sources are a priority for influencing a brand's reputation on LLMs.

The Actions Center is a source-first view titled "Target Sources": a ranked list of the third-party sources most worth influencing, where every listed source has been verified against its actual pages. The funnel has four steps.

1. Answers where the brand is absent (visibility questions), not chosen (competitive questions), or associated with negative concepts designate suspect sources and the specific articles they were cited on.
2. Every one of those articles is fetched.
3. Each fetched page is checked: does it name the brand family (parent brand, variations, products), and if named, is the depiction negative? Pages that cover the brand without negativity are false positives: they never enter the failing article count, the ranking or the badges, but the check keeps them and the explanation panel shows them as positive articles.
4. Only sources with at least one confirmed failing article remain, ranked by how many failing articles they have. The result is a to-do list where every claim is provable from the page itself: "this source has N checked articles that AI engines rely on, and none of them mention the brand" is a pitch a PR person can send as-is.

Because the verdict comes from the page and not from the answer that led to it, a source carries only the two labels the page check can prove: "Improve visibility" when the brand is absent from the page, and "Improve perception" when the page names the brand negatively. A source can carry both.

The two verdicts also give the list its navigation. Three tabs scope the target list: "All", "Improve visibility", and "Improve perception". A PR professional pitching an absent brand and a PR professional answering a negative page do different work, so each tab ranks the sources by the article count of that verdict alone.

This inversion also settles how AI Citation Sources and the Actions Center relate: AI Citation Sources is the monitoring surface and the Actions Center is the actionability surface.

Two changes to AI Citation Sources make that split honest, and both belong to this epic because they are the monitoring half of the same rework:

- The per-source favourability label is removed from the AI Citation Sources table. Favourability there was inferred from the outcomes of the answers a source was cited in, not from anything the source actually says, so it asserted about a source a judgement the monitoring view has not verified. Any judgement about whether a source helps or hurts the brand now lives only in the Actions Center, where the underlying pages are checked.
- In a source's expanded detail, the citation-count signal is replaced by a plain list of the tracked questions the source was used to answer, shown under the section heading "Related Prompts". The monitoring view then shows where a source actually appears across the analysis, rather than an opaque count.

---

#### User Story 1.1: Select suspect sources from gap answers

Story ID: TBD

> As a PR professional, I want the analysis to identify the sources cited in answers where my brand underperforms, so that the sources most involved in my visibility problems become candidates for action.

Acceptance Criteria:

- Given a completed analysis, When suspect sources are selected, Then a source qualifies as suspect only if it is cited in at least one visibility question answer where the brand is entirely absent, one competitive question answer where the brand is not the chosen winner, or one negative concept
- Given a visibility answer where the brand is present but not ranked first, When suspect selection runs, Then that answer does not qualify any source on the visibility leg
- Given a suspect source, When it is recorded, Then the specific articles it was cited on in qualifying answers are recorded with it
- Given a domain owned by the analyzed brand or by a competitor, When suspect selection runs, Then that domain is excluded from the suspect list regardless of the answers citing it
- Given the sources cited in qualifying answers, When the suspect set is built, Then it covers every source cited in those answers, and it is never limited to the capped list of domains that AI Citation Sources displays
- Given a cited URL that the model wrote from memory rather than opened during web search (a model-declared URL, see GEO-1107), When suspect selection runs, Then that URL never qualifies a source and never enters the suspect article set

#### User Story 1.2: Verify every suspect article against its page

Story ID: TBD

> As a PR professional, I want each suspect article checked for what it actually says about my brand, so that the target list only contains sources with a confirmed problem I can act on.

Acceptance Criteria:

- Given the suspect articles of an analysis, When verification runs, Then every suspect article is fetched and checked, with no cap on the number of articles
- Given a fetched article, When it is checked, Then the check determines whether the brand family (parent brand, brand variations, and products) is named anywhere on the page, and if named, whether the depiction is negative, neutral, or positive
- Given a page that names a brand-family entity that never appeared in any LLM answer (typically a product of the brand), When the check runs, Then that naming counts as the brand family being named; the brand variations from the brand matching step and the products already resolved to the parent brand in visibility rankings seed the check, but they do not bound it
- Given a verification verdict for an article, When it is produced, Then the verdict is persisted with the article, and every later read (ranking, briefs, filters) uses the persisted verdict; an article is never re-judged within the same analysis
- Given a fetched article that names the brand family with a neutral or positive depiction, When verification concludes, Then the article is a false positive on every qualification leg including negative concepts: it never counts towards the failing article count, the ranking, or the badges of its source
- Given a false positive article, When it is recorded, Then its verdict and its supporting passage are persisted with it in the same way as a failing article
- Given a fetched article where the brand family is not named, or is named negatively, Then the article is kept as a failing article, and for negative mentions the exact passage is extracted for display, limited to a maximum of 140 characters including spaces
- Given an article that could not be fetched, When verification concludes, Then that article contributes nothing to any source's failing article count or rank
- Given a source whose failing article count reaches zero after verification, When the target list is built, Then that source does not appear in it
- Given a fetched article that names the brand family, When the depiction is judged, Then it is negative only when the page states or implies a criticism, a failure, a risk, or a harm attributable to the brand or to one of its products; a favourable statement about a competitor is not negative; a factual report of unfavourable news (a recall, a lawsuit, a poor result) is negative; a weak or incidental criticism inside an otherwise neutral article is not negative; and when the depiction is ambiguous the verdict is neutral, never negative
- Given an article whose check could not be completed (the verification service is unavailable, the language is unsupported, or the content is unusable), When verification concludes, Then the article is treated like an unfetchable article and contributes nothing to any source's failing article count or rank

#### User Story 1.3: Ranked Target Sources list with verdict tabs

Story ID: TBD

> As a PR professional, I want a ranked list of the verified sources most worth influencing, so that I know where to start without interpreting analytics.

Acceptance Criteria:

- Given verified sources with failing articles, When the Actions Center is opened, Then a list titled "Target Sources" shows the sources ordered by failing article count, with ties broken first by number of reason badges and then by the citation count defined in this story [CHANGED 2026-09-17]
- Given the target list, When the user is on the Actions Center, Then a source type filter is available beside the tabs, it offers only the source types present in the current scope, each with its source count, preceded by an "All source types" entry which is the default, exactly as AI Citation Sources does today
- Given the target list, When the user is on the Actions Center, Then a card view and a table view are both available, switchable by an explicit control, and both show the sources in the same fixed order with no user-triggered re-sorting
- Given a target source card, When it is displayed, Then it shows the rank, the source name with its icon, the source type, the applicable reason badges among "Improve visibility" and "Improve perception", the failing article count, and the citation count defined below, labelled so that the two numbers cannot be read as the same measure [CHANGED 2026-09-17]
- Given a target source, When its citation count is computed, Then it counts the distinct combinations of one failing article, one question, and one AI engine across the qualifying answers of the pooled window: the same failing article cited for the same question by the same engine on several pooled days counts once, the same failing article cited for the same question by three engines counts three, and two failing articles of the source cited in the same answer count two; a false positive article never contributes to this count [NEW 2026-09-17]
- Given a target source, When its reason badges are computed, Then they come from the persisted verdicts of its failing articles only: "Improve visibility" when at least one failing article does not name the brand family, and "Improve perception" when at least one failing article names the brand family negatively; a source carrying both verdicts shows both badges, and no badge is derived from the outcome of an answer
- Given the target list, When the Actions Center is opened, Then three tabs scope the list: "All", "Improve visibility", and "Improve perception", and "All" is the tab selected by default
- Given the "All" tab, When the list renders, Then each source shows its total failing article count across both verdicts, and the order follows the rules of the first acceptance criterion of this story
- Given the "Improve visibility" or the "Improve perception" tab, When the list renders, Then each source shows the failing article count of that verdict alone, and the sources are ordered by that count, with ties broken by the citation count defined in this story, recomputed over the failing articles of that verdict alone [CHANGED 2026-09-17]
- Given a source with no failing article of the selected verdict, When the "Improve visibility" or the "Improve perception" tab renders, Then that source does not appear in the tab
- Given a verdict tab, When it renders, Then the badges of a listed source stay the same as in the "All" tab
- Given a tab holding no source, When it renders, Then it states that no source carries that verdict in the current scope, and the other tabs stay reachable
- Given a target source, When it is displayed in the card view, in the table view, or in the explanation panel, Then the domain logo is shown next to the source name, retrieved the same way as in AI Citation Sources, and a neutral placeholder is shown when no logo is returned
- Given more than ten qualifying sources, When the list renders, Then the top ten are visible and the remainder are revealed by an explicit control

#### User Story 1.4: Explanation panel for each target source

Story ID: TBD

> As a PR professional, I want to open a target source and see the full evidence in plain language, so that I can build my pitch directly from what the pages say.

Acceptance Criteria:

- Given the target sources list, When I select a card, Then a panel opens beside the list showing a plain-language brief, the failing articles, and the failing prompts, and selecting the same card again closes the panel
- Given a verdict tab is selected, When I open a card from that tab, Then the panel shows every failing article of the source across both verdicts, and the brief states the full split; the card count and the brief count therefore differ when the source carries both verdicts
- Given the brief, When it is generated, Then it is one deterministic sentence with no AI generation, built as a failing part plus a positive part that is added only when the source has positive articles and that replaces the full stop:

| Case | Sentence |
| --- | --- |
| Failing part, one verdict, brand absent | This source has {n} unfavorable articles where the brand is entirely absent. |
| Failing part, one verdict, negative depiction | This source has {n} unfavorable articles where the brand is depicted negatively. |
| Failing part, both verdicts | This source has {n} unfavorable articles: {a} where the brand is entirely absent and {b} where the brand is depicted negatively. |
| Positive part | , and {p} articles that cover the brand positively. |

- Given a source with no positive article, When the brief is generated, Then the positive part is omitted and no zero count is stated
- Given any count in the sentence equals one, When the brief is generated, Then the noun of that count takes its singular form ("1 unfavorable article", "1 article that covers the brand positively")
- Given the brief, When it is displayed, Then it uses the In-Brief visual treatment of the platform; the treatment governs the presentation only, and the text stays deterministic
- Given a failing article where the brand is not named, When it is displayed, Then it carries an explicit "no mention of the brand anywhere on this page" indication, and no passage from the page is shown
- Given a failing article with a negative mention, When it is displayed, Then the extracted passage is shown verbatim with the brand name highlighted, and the passage never exceeds 140 characters including spaces
- Given each failing article, When it is displayed, Then the AI engines that cited it are shown alongside it
- Given the panel of a source that has positive articles, When it opens, Then two tabs separate the evidence, "Failing articles" and "Positive articles", each carrying its own count, and "Failing articles" is the tab selected by default
- Given the "Positive articles" tab, When it renders, Then each entry shows the article title, its address, the passage that supports the verdict, and the AI engines that cited it, and no verdict label is shown [CHANGED 2026-09-17]
- Given a source that has no positive article, When the panel opens, Then the "Positive articles" tab is not shown
- Given the panel header, When it renders, Then it states the failing article count, the positive article count, and the citation count defined in User Story 1.3 [CHANGED 2026-09-17]
- Given the positive articles of a source, When any count outside the panel is computed, Then they change nothing: the rank, the badges, the card counts, the table counts, and the tab membership stay built from failing articles alone
- Given the failing prompts section, When it is displayed, Then each entry shows the question, the engine and the country, and no outcome is shown; the three outcome values (brand absent, competitor chosen, unfavorable) still decide which prompts qualify as failing, and they are rendered on no surface [CHANGED 2026-09-17]

#### User Story 1.5: Verification progress state

Story ID: TBD

> As a user opening the Actions Center before verification has finished, I want a clear in-progress state, so that I never mistake an incomplete list for the final one.

Acceptance Criteria:

- Given an analysis whose article verification is still running, When the Actions Center is opened, Then the view shows a "verifying sources" state instead of a partial target list
- Given verification completes, When the user is on the Actions Center, Then the target list becomes available without requiring a full page reload

#### User Story 1.6: Filters re-rank within scope

Story ID: TBD

> As a user analyzing several countries, categories, AI engines, and date ranges, I want the target list scoped to my current filters, so that the priorities reflect the market and period I am looking at.

Acceptance Criteria:

- Given country, category, AI engine, date range, and source type filters, When a filter is applied, Then failing article counts, citation counts, reason badges, and the resulting order are recomputed within the selected scope rather than globally computed and then filtered, and the displayed ranks are renumbered 1…N with no gaps [CHANGED 2026-09-17]
- Given the source type filter, When a source type is selected, Then only the sources of that type remain, and the ranks, the counts, and the tab membership are recomputed inside that selection under the same rules as every other filter
- Given the source type filter, When it is displayed, Then it lists only the source types present in the current scope
- Given a date range filter, When it is applied, Then a failing article counts only if at least one of its qualifying answers falls inside the selected range
- Given a failing article whose qualifying answers span several scopes, When a single scope is selected, Then the article counts in that scope only if at least one of its qualifying answers belongs to it
- Given a source with no failing articles in the selected scope, When the filtered list renders, Then that source does not appear
- Given a filter and a verdict tab are both active, When the list renders, Then the filters define the scope first and the tab then selects the verdict inside that scope, so the counts, the badges, and the order of the tab are computed from the filtered failing articles only
- Given the source type filter, When the analysis export is generated, Then the filter has no effect on the exported section, like the category filter of User Story 1.9
- Given any selected date range, When the target list is built, Then the sources are pooled over a window of at least 7 days ending on the most recent snapshot in scope; a selected range longer than 7 days is used in full, and a report holding fewer than 7 days of history uses every day it has. This window applies to the Actions Center only. AI Citation Sources keeps the selected range unchanged, so on a range shorter than 7 days the two views deliberately cover different periods and their source sets do not tie

#### User Story 1.7: Empty state with PR value

Story ID: TBD

> As a user whose brand shows no verified source problems, I want the Actions Center to remain useful, so that a clean result reads as an achievement rather than an empty page.

Acceptance Criteria:

- Given no source survives the verification funnel, When the Actions Center is opened, Then an all-clear message is shown instead of an empty list
- Given the all-clear state, When it renders, Then it carries the all-clear message alone, and no source list is shown under it

#### User Story 1.8: Scope additions keep the target list current

Story ID: TBD

> As a user extending an existing analysis, I want newly added scope to go through the same verification funnel, so that the target list stays trustworthy after changes.

Acceptance Criteria:

- Given an existing analysis, When any Manage Scope dimension changes (country, topic, AI engine, or question), Then the change takes effect on the next scheduled execution, which produces a new snapshot with a complete re-analysis
- Given the new snapshot's qualifying answers, When their suspect articles are selected, Then they are verified under exactly the same rules as any other article
- Given an article already verified in a previous snapshot, When it reappears in a new snapshot, Then the page is re-checked with a conditional request on every run; an unchanged page reuses the stored verdict and is neither re-fetched in full nor re-judged, and a changed page is re-fetched and re-judged
- Given a stored verdict, When it reaches the staleness window, Then the article is re-fetched and re-judged regardless of the conditional response
- Given the execution completes, When the Actions Center is opened, Then the target list covers the full scope of that run, ordered under the same rules

#### User Story 1.9: Target Sources in the analysis export

Story ID: TBD

> As a PR professional, I want the analysis export to carry the Target Sources list and its evidence, so that the priorities I act on, and the pitch I send, stand on their own outside the product.

The exported section reuses the rules of User Stories 1.3, 1.4, 1.6 and 1.7 for its content, its per-source fields, its briefs, its evidence and its ordering. The criteria below state only what the export does differently.

Acceptance Criteria:

- Given an analysis export in PowerPoint, PDF, or Excel, When it is generated, Then it carries a Target Sources section built from the "All" tab, with the total failing article count per source, whatever tab and view the user stands on
- Given the export scope (markets, AI engines, and date range), When the section is built, Then the counts, the badges and the order are recomputed inside that scope under the rules of User Story 1.6
- Given the category and source type dimensions, When the section is built, Then all categories and all source types are always covered, and the on-screen category and source type filters have no effect on the section
- Given the Excel workbook, When it is generated, Then the Target Sources tab carries the full evidence of the panel of User Story 1.4: the ranked list, the brief, each failing article with its verdict and citing engines, each positive article with its passage and citing engines, and the failing prompts; the tab holds four stacked tables, specified on GEO-1124 [CHANGED 2026-09-17]
- Given the PowerPoint deck, When it is generated, Then it carries the brief for the top three sources only and the failing article count for every other displayed source, and when the sources exceed what a slide holds, the top sources are shown and the full totals are stated, following the capping convention of the other slides; this cap applies to the deck alone, and the Excel tab keeps the brief for every source under the previous criterion [CHANGED 2026-09-17]
- ~~Given article verification is still running, When an export is requested, Then the section carries the verifying state instead of a partial list~~ [DELETED 2026-09-17]
- Given no source survives verification in the exported scope, When the section is built, Then it carries the all-clear message alone
- Given the export scope, When the Target Sources section is built, Then the source window rule of User Story 1.6 applies unchanged: at least 7 days, the full range when it is longer, and every available day on a report younger than 7 days

Accepted consequences of the export decisions [NEW 2026-09-17]

- An export started while verification runs can carry the all-clear message, because production has no completed-snapshot concept. Detail on GEO-1124.
- The screen and the file disagree while verification runs: User Story 1.5 keeps its on-screen state, the export has no equivalent.
- The deck states no scope for this section, so a three-day export can show sources drawn from the seven-day floor with no indication.

#### User Story 1.10: Remove the favourability label from AI Citation Sources

Story ID: GEO-1125

> As a user reading AI Citation Sources, I want the favourability label gone, so that the monitoring view states what it can measure and stops asserting a judgement it has not verified.

Acceptance Criteria:

- Given the AI Citation Sources section and the "All domains" modal, When either renders, Then it carries Domain, Type and Frequency only, and no Favorability column
- Given either table, When the sortable headers render, Then Favorability is not offered as a sort key
- Given the section, the modal, or the source details panel, When any of them renders, Then no favorable, mixed or unfavorable badge is shown for a domain
- Given the XLSX workbook and the PowerPoint deck, When the AI Citation Sources section is generated, Then the domain table carries Domain, Type and Frequency only
- Given the Lite (PQL) result table, When it renders, Then it carries no Favorability column either
- Given the removal, When it is implemented, Then the backend computation is removed with the column, not hidden
- Given the Questions Analysis favourability filter, the question detail panel, the Corporate Reputation sheet and the Raw Data sheet, When this story ships, Then they are unchanged: the removal covers the source-level label only

#### User Story 1.11: A source's detail panel lists the prompts it was used in

Story ID: GEO-1126

> As a user inspecting a cited domain, I want the prompts that cite it and the URLs it was cited on, so that I see where a domain actually appears instead of reading an opaque count.

Acceptance Criteria:

- Given a domain is selected in AI Citation Sources, When the details panel opens, Then it shows "Related Prompts" first and "Cited URLs" second, and the per-engine citation-count block is gone
- Given the Related Prompts section, When it renders, Then it lists the first prompts, each with its text and the icons of the AI engines that produced it, followed by an "All related Prompts" control carrying the total count
- Given the Cited URLs section, When it renders, Then its heading carries the total count, it lists the first URLs with their title, their address and the citing engine icons, followed by an "All Cited URLs" control carrying the same total
- Given the All related Prompts control, When it is activated, Then a modal opens headed "All related Prompts - {domain}" with the prompt count, a search field over prompt text, and the full list
- Given the prompts modal, When it renders, Then four tabs scope the list, All, Visibility, Competitive and Perception, each carrying its own count, and All is selected by default
- Given one prompt produced by several AI engines, When it is listed, Then it appears once, carrying every citing engine's icon
- Given the Perception tab, When it renders, Then it lists questions, not concepts: one perception answer that surfaced several negative concepts produces one row, and the negative concept names no longer appear in AI Citation Sources
- Given a tab is selected and a search term entered, When the list renders, Then it shows the prompts of that tab matching the term
- Given the panel control, the modal header, and the sum of the tab counts, When they render for the same domain, Then they state the same total
- Given a tab holding no prompt, When it renders, Then it says so and the other tabs stay reachable
- Given the market, AI engine and date filters of the dashboard, When the panel opens, Then its prompts and URLs are those of the current scope; the 7-day source window of User Story 1.6 does not apply here

## Scope

_No explicit "Scope" list in the Jira description; the in-scope work is the set of User Stories defined in the epic:_

- User Story 1.1: Select suspect sources from gap answers
- User Story 1.2: Verify every suspect article against its page
- User Story 1.3: Ranked Target Sources list with verdict tabs
- User Story 1.4: Explanation panel for each target source
- User Story 1.5: Verification progress state
- User Story 1.6: Filters re-rank within scope
- User Story 1.7: Empty state with PR value
- User Story 1.8: Scope additions keep the target list current
- User Story 1.9: Target Sources in the analysis export
- User Story 1.10: Remove the favourability label from AI Citation Sources
- User Story 1.11: A source's detail panel lists the prompts it was used in

## Out of Scope

- AI-generated briefs (deterministic templates only); this exclusion covers the brief text only. It does not constrain how the page depiction check is implemented, and it does not constrain the presentation: the brief uses the In-Brief visual treatment of the platform while its text stays deterministic
- Judging the prominence or quality of a brand mention; presence is binary, and a page naming the brand without negativity is discarded even if the mention is weak
- Outreach workflow features (contact information, export to a pitch list, status tracking)
- Any change to anomaly detection logic, thresholds, or the section views where anomalies keep appearing
- Anomaly information inside the Target Sources view (no anomaly chips or thresholds in cards or panels)
- A second in-product placement of the target list outside the Actions Center tab (the analysis export section of User Story 1.9 is in scope)
- Evolution across analyses: whether target sources carry lifecycle information (new, improving, resolved), how the list is stabilized between runs, and which trend baseline applies

### Still open (blocking)

- Money cost of the verification funnel. The volume was measured on 2026-09-08 (about 19,700 URLs per day across 50 active reports, a sustained rate of 0.23 requests per second, no concentration per domain), and that measurement establishes that no cap on the number of articles is required. It does not establish the monetary cost. The OpenRouter unit price of the chosen Gemini model, the average input token count per article page, and the resulting monthly bill at cold start and at steady state are still owed.
- The acquisition chain. GCH covers 12.4% of the URLs the engines cite (measured 2026-09-15 on 2,972 Toyota source URLs), so the Onclusive crawler carries 88% of the volume. This is now a feasibility question, not a fallback question. It is blocked on crawler API credentials on staging and on the production value of ENABLEESINDEX.

### Decided, recorded here for traceability

- 2026-09-14: the depiction check runs on Gemini through the platform LlmGateway in OpenRouter mode (option C1 of the spike), not the ml-mesh sentiment service (C2).
- 2026-09-15: the legal review of fetching, storing and displaying third-party content is validated by the PM, export and public shared report links included.
- 2026-09-16: the definition of negative for the depiction check is set (see User Story 1.2).
- 2026-09-16: the source window of the Actions Center has a 7-day floor (see User Story 1.6).
- 2026-09-17: the Excel Target Sources tab holds four stacked tables, specified on GEO-1124 (User Story 1.9). [NEW 2026-09-17]
- 2026-09-17: positive articles are carried by the Excel export, reversing the decision of 2026-09-16 (User Story 1.9). [NEW 2026-09-17]
- 2026-09-17: the export carries no verifying state and keeps the snapshot resolution of today (User Story 1.9). [NEW 2026-09-17]
- 2026-09-17: the deck carries the brief for the top three sources only; Excel keeps every brief (User Story 1.9). [NEW 2026-09-17]
- 2026-09-17: the exported section carries no scope line and no period label. The PDF is the slide in landscape (User Story 1.9). [NEW 2026-09-17]
- 2026-09-17: the displayed ranks are renumbered 1…N after a filter (User Story 1.6). [NEW 2026-09-17]
- 2026-09-17: a positive article carries no verdict label (User Story 1.4). [NEW 2026-09-17]
- 2026-09-17: the citation counter counts one article, one question and one AI engine; pooled days collapse and false positives are excluded (User Story 1.3). [NEW 2026-09-17]
- 2026-09-17: a failing prompt row carries no outcome. This supersedes the answer of 2026-09-16, which removed only the winner (User Story 1.4). [NEW 2026-09-17]
- 2026-09-21: the UI copy of this epic is locked in four locales (en-US, en-GB, fr-FR, es-ES), 64 new keys. See the Localisation and copy section. [NEW 2026-09-21]

### Known future evolution, not in this version

- The visibility qualification leg currently requires the brand to be entirely absent. Real-case testing may later widen it to a rank threshold (for example, rank worse than 5). The selection rule must stay configurable so that change does not require a rework.
- The dashboard still lets a user select a range shorter than 7 days, so on such a range the Actions Center and AI Citation Sources cover different periods by design. Whether the dashboard minimum should rise to 7 days everywhere is a separate decision and needs its own story.

### Localisation and copy

UI copy locked 2026-09-21 in four locales, 64 new keys, with the glossary and the per-story mapping: https://docs.google.com/spreadsheets/d/1Nab90jZNdxgAT5pouDk2QxLM5-6skrDF6p2A4w9o0z4/edit. Terms: Target Sources = Sources à cibler / Fuentes a priorizar; gap answers = réponses défavorables / respuestas desfavorables; failing and unfavorable article both = article problématique / artículo problemático, so panel.outcomeUnfavorable reads Problématique / Problemático. citedInGapAnswers and panel.citationCount qualify a source, feminine in both languages: Citée, Citada. Spanish uses usted. Out of scope, tracked on GEO-1134: 39 existing es-ES.json strings break the usted rule (36 after User Story 1.11), listed on the sheet.

## Associated Stories & Tasks

| ID | Type | Title | Status |
|----|------|-------|--------|
| GEO-1116 | Story | [Target Sources] 10.1 — Select suspect sources from gap answers | [QA IN PROGRESS] QA In Progress |
| GEO-1117 | Story | [Target Sources] 10.2 — Verify every suspect article against its page | [QA IN PROGRESS] QA In Progress |
| GEO-1118 | Story | [Target Sources] 10.3 — Ranked Target Sources list with verdict tabs | [QA IN PROGRESS] QA In Progress |
| GEO-1119 | Story | [Target Sources] 10.5 — Verification progress state | [QA IN PROGRESS] QA In Progress |
| GEO-1120 | Story | [Target Sources] 10.6 — Filters re-rank within scope | [QA IN PROGRESS] QA In Progress |
| GEO-1121 | Story | [Target Sources] 10.7 — Empty state with PR value | [READY FOR QA] Ready for QA |
| GEO-1122 | Story | [Target Sources] 10.8 — Scope additions keep the target list current | [READY FOR QA] Ready for QA |
| GEO-1123 | Story | [Target Sources] 10.4 — Explanation panel for each target source | [READY FOR QA] Ready for QA |
| GEO-1124 | Story | [Target Sources] 10.9 — Target Sources in the analysis export | [READY FOR QA] Ready for QA |
| GEO-1125 | Story | [Citation Sources] 10.10 — Remove the Favorability column from AI Citation Sources | [READY FOR QA] Ready for QA |
| GEO-1126 | Story | [Citation Sources] 10.11 — Replace the citation-count signal with the list of questions a source was used in | [READY FOR QA] Ready for QA |
| GEO-1144 | Story | Localize the deterministic Target Source brief (FR/ES) — currently English-only | [READY FOR QA] Ready for QA |
| GEO-1166 | Task | Actions Center — Previous/Next source navigation in details panel | [READY FOR QA] Ready for QA |
| GEO-1168 | Task | Actions Center — Target Sources updates (copy, category filter, missing/negative split, panel simplification) | [READY FOR QA] Ready for QA |
| GEO-1169 | Task | Actions Center - Target Sources: select the top 100 domains by citation frequency instead of failing prompts | [READY FOR QA] Ready for QA |
| GEO-1173 | Task | [GEO-Export] Put the Action Center as last slide in PPT and PDF export | [READY FOR QA] Ready for QA |
| GEO-1178 | Task | Action Center - Target Sources: details panel tabs and prompts list from the new design (engine filter, one row per prompt) | [READY FOR QA] Ready for QA |
| GEO-1183 | Story | [Target Sources] The passage must always include the brand or product name | [CODE REVIEW] Code Review |
| GEO-1184 | Story | [Target Sources] Sort the cards by the number of prompts that use each source | [BACKLOG] Backlog |

## Architecture

_No dedicated Architecture section in the Jira description. The funnel (suspect selection -> page fetch -> depiction check -> ranked list) is described in the Functional Need above; technical parts live in the repository specs linked from each story._

## Acceptance Criteria — Summary

_The epic description embeds per-User-Story ACs (see above). Aggregated from the imported Stories & Tasks:_

- **GEO-1116** (Story, 6 ACs): AC1 Three qualifying legs; AC2 Being ranked low does not qualify; AC3 Articles are recorded with the source; AC4 Owned and competitor domains excluded (+2 more)
- **GEO-1117** (Story, 11 ACs): AC1 Every article, no cap; AC2 What the check determines; AC3 Extended scope: products discovered on the page; AC4 Verdicts are persisted and never re-judged (+7 more)
- **GEO-1118** (Story, 13 ACs): AC1 Order and tie-break; AC2 Source type filter; AC3 Two views, one fixed order; AC4 What a card shows (+9 more)
- **GEO-1119** (Story, 2 ACs): AC1 No partial list, ever; AC2 Transition without a page reload
- **GEO-1120** (Story, 9 ACs): AC1 Recompute, do not filter — and the displayed ranks are renumbered; AC2 Source type filter; AC3 The filter lists only what is present; AC4 Date range membership (+5 more)
- **GEO-1121** (Story, 2 ACs): AC1 All-clear instead of an empty list; AC2 The message alone
- **GEO-1122** (Story, 5 ACs): AC1 Any scope change, next scheduled execution; AC2 The new scope is verified under the same rules; AC3 The page is re-checked on every run; AC4 The staleness window overrides the conditional response (+1 more)
- **GEO-1123** (Story, 15 ACs): AC1 Panel open and close; AC2 The panel ignores the active verdict tab; AC3 The brief is one deterministic sentence; AC4 No zero counts (+11 more)
- **GEO-1124** (Story, 7 ACs): AC1 Always the "All" tab, whatever the user is looking at; AC2 Recomputed inside the export scope; AC3 All categories and all source types, always; AC4 Excel carries the full evidence of the panel, in four stacked tables (+3 more)
- **GEO-1125** (Story, 7 ACs): AC1 The section and the modal carry three columns; AC2 Favorability is not a sort key; AC3 No favorability badge anywhere on the surface; AC4 The exports drop it too (+3 more)
- **GEO-1126** (Story, 11 ACs): AC1 Two sections, in order, and the count block is gone; AC2 What the panel previews; AC3 Cited URLs preview; AC4 The prompts modal (+7 more)
- **GEO-1144** (Story, 0 ACs): see story file
- **GEO-1166** (Task, 5 ACs): AC1 Footer is sticky and visible at all panel scroll positions.; AC2 Next/Previous swaps panel data in place and syncs the selected card/row behind the panel.; AC3 Counter shows position within the current filtered scope.; AC4 First/last items disable the corresponding button. (+1 more)
- **GEO-1168** (Task, 24 ACs): AC1; AC2; AC3; AC4 Each tab shows its count, and the count matches the number of article rows in the tab. (+20 more)
- **GEO-1169** (Task, 8 ACs): AC1 Given a snapshot, the selection keeps the X domains (100 by default) with the highest Frequency after the owned and competitor exclusion, and sends every GROUNDED cited URL of those domains to verification.; AC2 The Frequency used for the ranking is computed the same way as the AI Citation Sourc (+4 more)
- **GEO-1173** (Task, 0 ACs): see story file
- **GEO-1178** (Task, 13 ACs): AC1; AC2; AC3 Given a source with both, I see both tabs, "Lack of visibility" selected by default, and switching tab does not change the prompts section.; AC4 The count of each tab matches the number of articles in the tab and the card line of the source. (+9 more)
- **GEO-1183** (Story, 4 ACs): AC1 On the caranddriver.com article above, the passage contains "Tesla" or "Cybertruck" and the name is highlighted in the panel.; AC2 No passage in the Target Sources panel of the Tesla, Nike and Lidl Nederland analyses on staging is missing the brand or product name.; AC3 Passages stay verbatim (a
- **GEO-1184** (Story, 3 ACs): AC1 With "Most prompts" selected, the cards are in descending order of the prompt count shown on them.; AC2 The count on a card equals the number of prompts listed in its panel.; AC3 The default sort and the export are unchanged when the option is not selected.

## Links

- https://onclusive.atlassian.net/browse/GEO-152
- GEO-1116: https://onclusive.atlassian.net/browse/GEO-1116
- GEO-1117: https://onclusive.atlassian.net/browse/GEO-1117
- GEO-1118: https://onclusive.atlassian.net/browse/GEO-1118
- GEO-1119: https://onclusive.atlassian.net/browse/GEO-1119
- GEO-1120: https://onclusive.atlassian.net/browse/GEO-1120
- GEO-1121: https://onclusive.atlassian.net/browse/GEO-1121
- GEO-1122: https://onclusive.atlassian.net/browse/GEO-1122
- GEO-1123: https://onclusive.atlassian.net/browse/GEO-1123
- GEO-1124: https://onclusive.atlassian.net/browse/GEO-1124
- GEO-1125: https://onclusive.atlassian.net/browse/GEO-1125
- GEO-1126: https://onclusive.atlassian.net/browse/GEO-1126
- GEO-1144: https://onclusive.atlassian.net/browse/GEO-1144
- GEO-1166: https://onclusive.atlassian.net/browse/GEO-1166
- GEO-1168: https://onclusive.atlassian.net/browse/GEO-1168
- GEO-1169: https://onclusive.atlassian.net/browse/GEO-1169
- GEO-1173: https://onclusive.atlassian.net/browse/GEO-1173
- GEO-1178: https://onclusive.atlassian.net/browse/GEO-1178
- GEO-1183: https://onclusive.atlassian.net/browse/GEO-1183
- GEO-1184: https://onclusive.atlassian.net/browse/GEO-1184
