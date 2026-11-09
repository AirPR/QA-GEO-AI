# Epic GEO-1068: Simplify Key Concepts Sentiment Display

Data imported from Jira for epic **GEO-1068: Simplify Key Concepts Sentiment Display**

> Last Jira sync: 2026-10-19 — 4 stories + 0 tasks

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview |
| **STORY_{KEY}_*.md** | One file per story (4) |
| **TASK_{KEY}_*.md** | One file per task (0) |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data |

## Epic Overview

The key concepts view currently communicates the sentiment of each concept three times: a polarity classification (positive, mixed or negative, conveyed by color), a numeric sentiment score on a -100 to +100 scale shown next to the concept, and, when the concept is expanded, a barometer gauge that visualizes the same score on a negative-to-positive axis. Combined with the frequency metric that each concept also carries, a single row stacks four numbers and indicators, and users cannot tell which one to read. The numeric score is the weakest of them: at the granularity of a single concept it is not explainable, two concepts with the same polarity but slightly different scores suggest a precision the underlying classification does not have, and the barometer repeats it a third time without adding information.

This epic simplifies the display to the two signals that matter: how often a concept appears (frequency) and whether it is perceived as positive, mixed or negative (polarity). The numeric sentiment score and the barometer disappear from every place a concept is shown, including the expanded detail view and exports. Polarity becomes an explicit label rather than a color-only cue, so the information removed from the score is not lost, it is stated more honestly. Sorting and filtering keep working on polarity. Nothing changes in how concepts are classified or how frequency is computed; this is a display simplification only.

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| GEO-1266 | Story | Show only frequency and polarity on each concept | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1266 |
| GEO-1267 | Story | Remove the score and barometer from the expanded concept view | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1267 |
| GEO-1268 | Story | Keep sorting and filtering consistent with the simplified display | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1268 |
| GEO-1269 | Story | Apply the simplified display everywhere concepts appear | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1269 |

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1068
- **Stories:**
  - GEO-1266: https://onclusive.atlassian.net/browse/GEO-1266
  - GEO-1267: https://onclusive.atlassian.net/browse/GEO-1267
  - GEO-1268: https://onclusive.atlassian.net/browse/GEO-1268
  - GEO-1269: https://onclusive.atlassian.net/browse/GEO-1269
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- Concept row: `[3 quotes •] 12 sources • [Negative]` — frequency % kept, « -80 sentiment » replaced by the Positive / Mixed / Negative pill of the filters (without count); coloured bar and % colour stay (GEO-1266).
- Applies to brand Top Concepts (Overview / category), unbranded Top Topics (Overview / category) and the unbranded Other page (GEO-1266).
- Detail panel: header keeps polarity colour, name, close button; label in a white pill variant `90% frequency • [Positive]`; score and Negative → Positive gauge removed; no quotes added (D4, D7) (GEO-1267).
- Sort « Sentiment »: positive → mixed → negative, then frequency desc, then name A→Z (D1); sort menu keeps Frequency, Sentiment, A–Z; filters and distribution summary unchanged (GEO-1268).
- Exports: PPTX / PDF rows `{n} sources • {Positive | Mixed | Negative}` in EN / FR / ES, frequency % in polarity colour (D6); XLSX columns Concept · Sentiment · Sources · Frequency · Cited by, « Score » removed (D2) (GEO-1269).
- Shared analysis = any user of the same organisation (no share link yet, D3); category-level Sentiment KPI unchanged (D5) (GEO-1269).
- Decisions D0–D7 taken by OS-Team on 2026-10-16 while the PM is on leave.

## Out of Scope

- Any change to how concepts are classified as positive, mixed or negative, or to how frequency is computed
- The sentiment distribution summary above the concepts list (share of positive, mixed and negative concepts), which stays as is
- Whether the underlying numeric score continues to be computed internally; this epic only removes it from display
