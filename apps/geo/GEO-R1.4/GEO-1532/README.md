# Epic GEO-1532: Align the Lite Analysis on Natural Answers

Data imported from Jira for epic **GEO-1532: Align the Lite Analysis on Natural Answers**

> Last Jira sync: 2026-11-13 — 0 stories + 0 tasks

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview, full Jira description (planned user stories and their ACs verbatim) |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data (stories[] empty, plannedStories[] from the description) |

_No STORY_ / TASK_ file: the epic has no child Story or Task in Jira yet._

## Epic Overview

The Lite Analysis (the free analysis a prospect gets before buying) still asks the engines for a fixed JSON structure and computes its metrics the old way: Share of Voice over 10 slots per visibility answer, Average Position with a penalty of 11 when the brand is absent, and the answer language forced to the insights language (GEO-918). Once GEO-678 ships, the full analysis reads natural answers with new rules, so a prospect would see one Share of Voice in the Lite Analysis and a different one after purchase.

The goal is to run the Lite Analysis on the same reader and the same formulas as the full analysis. This is low priority: it can ship after GEO-678, and until then the gap is accepted.

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| — | — | No child Story / Task in Jira | — | — |

Planned in the description (Story ID: TBD): 1.1 Use the natural answer reader in the Lite Analysis; 1.2 Use the same formulas as the full analysis.

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1532
- **Stories:** none yet
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- Status Backlog, fix version 1.4. No child Story / Task yet: 2 user stories (6 ACs) are written in the epic description with Story ID: TBD.
- Dependency: GEO-678 (Natural Answer Collection and Parsing)
- Dependency: [NEW 27 OCT] GEO-1498 (Natural Answer Display): the answer card reused in the Perception rows
- Other children: none.
- Test cases cannot be generated per story until the stories exist in Jira (re-import this epic once they are created).

## Out of Scope

- [CHANGED 27 OCT] Any change to the layout of the Lite Analysis screens or to the upsell flow, except the Perception answer card of story 1.1
- Rendered capture for the Lite Analysis: it follows the route set for each engine in production
