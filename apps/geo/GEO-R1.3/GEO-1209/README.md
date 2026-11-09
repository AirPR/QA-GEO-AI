# Epic GEO-1209: Unbranded Analysis and Other Prompts

Data imported from Jira for epic **GEO-1209: Unbranded Analysis and Other Prompts**

> Last Jira sync: 2026-10-19 — 8 stories + 0 tasks

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview |
| **STORY_{KEY}_*.md** | One file per story (8) |
| **TASK_{KEY}_*.md** | One file per task (0) |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data |

## Epic Overview

This epic opens GEO to analyses without a brand, and lets a prompt run without a category or a question type. An unbranded analysis measures an industry or a topic instead of a brand (football, car insurance, frozen food). The topic frames the analysis and is never measured: the measured entities are the brands the AI answers name. Everything set during creation stays manageable after launch in Manage Scope. An unbranded analysis stays unbranded: adding a brand to it comes in a later version.

It builds on the new-analysis wizard and the prompt pool of EPIC-034 (https://onclusive.atlassian.net/browse/GEO-1002). This epic adds a first step, Analysis Type, before Brand & Country, so the wizard has five steps: Analysis Type, Brand & Country (Topic & Country in an unbranded analysis), Categories, Prompts and Review. From step 1 onward a mode pill in the product bar reads Brand analysis or Unbranded analysis. An unbranded analysis consumes the pool exactly like a brand analysis. Both features ship behind one global flag, off until validated, then on for every organisation. While the flag is off, the wizard stays as it is today: four steps, no Analysis Type step and no mode pill.

A prompt that misses its category or its type falls back to Other instead of being blocked. It still runs and returns key concepts, which feed InBrief and Top Concepts (Top Topics in an unbranded analysis), and it moves to its category and type once classified. In EPIC-034 both are required.

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| GEO-1241 | Story | Choose the analysis type | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1241 |
| GEO-1242 | Story | Run an analysis without a target brand | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1242 |
| GEO-1243 | Story | Show an Overview built for a topic | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1243 |
| GEO-1244 | Story | Show the Category view and the prompts for a topic | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1244 |
| GEO-1245 | Story | Adapt the Actions Center, the export and the emails for a topic | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1245 |
| GEO-1246 | Story | Manage the prompts of an unbranded analysis | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1246 |
| GEO-1247 | Story | Classify prompts by question type with an Other fallback | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1247 |
| GEO-1248 | Story | Show prompts in Other on the dashboard | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1248 |

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1209
- **Stories:** GEO-1241, GEO-1242, GEO-1243, GEO-1244, GEO-1245, GEO-1246, GEO-1247, GEO-1248
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- Unbranded analysis and the Other fallback ship behind one global flag, off until validated, then on for every organisation; flag off, the wizard is today's four-step brand wizard (GEO-1241 AC1b, updated 2026-10-19). QA needs the flag ON.
- The wizard gets a first step, Analysis Type, before Brand & Country (Topic & Country in an unbranded analysis): 5 steps; mode pill "Brand analysis" / "Unbranded analysis" from step 1; switching the mode after step 1 clears the later steps after a confirmation (GEO-1241).
- Unbranded prompt mix: Visibility, Competitive ([Competitor 4] replaces the brand) and Category Topics (10 fixed themes); no Reputation, no Brand Image; 30 prompts per category per market; one pool slot per market as in a brand analysis (GEO-1241, GEO-1242, GEO-1246).
- The topic is the analysis name everywhere (dashboard, list "Brand / Topic", emails, exports) and cannot be edited after creation; no brand is target, highlighted or protected (GEO-1242, GEO-1243, GEO-1245).
- A Competitive prompt of an unbranded analysis with fewer than 2 competitors is not sent for the run and has no row in the prompts table (GEO-1242 AC9, updated 2026-10-19 — differs from the epic description text).
- Overview and Category view: no KPI cards / scope bar / Time Evolution on the Overview; InBrief from Category Topics + Other-type concepts (one quote per topic, updated 2026-10-19); "Top Topics in the Category"; neutral SOV ring; "{topic} landscape" / "{category} landscape"; winner or "Split" per production rule (GEO-1243, GEO-1244).
- Actions Center entry hidden (direct URL shows the dashboard); exports and analysis ready email use the topic (GEO-1245).
- Other fallback (both modes): a missing category or type becomes "Other" (never "Unclassified" / "uncategorised" / "Pick category"); warning tint, non-blocking banner and Review card; Other-type prompts return key concepts only and never move KPIs/SOV; "Other" sidebar category with key concepts, prompts table, Sources tab and "Other Details" panel (GEO-1247, GEO-1248).
- Many new strings are added by the dev team with status "Proposed" and reviewed by the PM after his leave: wording may change.

## Out of Scope

- The prompt pool, the prompt table and the wizard steps Brand & Country to Review (EPIC-034)
- Plan names and price points (pricing v0.3, set by Management and Sales)
- Agency workspaces and consolidated billing (client workspaces spec)
- Adding a brand to an unbranded analysis, a later version
