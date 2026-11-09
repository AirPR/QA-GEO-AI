# Epic GEO-1002: Setup Revamp - Prompt-Pool Quota and New-Analysis Wizard

Data imported from Jira for epic **GEO-1002: Setup Revamp - Prompt-Pool Quota and New-Analysis Wizard**

> Last Jira sync: 2026-10-19 — 13 stories + 0 tasks (GEO-1515 added on 2026-10-22: 14 stories + 0 tasks)

## Project Structure

| File | Description |
|------|-------------|
| **EPIC.md** | Epic overview |
| **STORY_{KEY}_*.md** | One file per story (14) |
| **TASK_{KEY}_*.md** | One file per task (0) |
| **INDEX.md** | File index and progress |
| **epic-data.json** | Structured data |

## Epic Overview

This epic rebuilds the new-analysis wizard around a prompt pool. Today coverage is sold as a fixed per-brand, per-country and per-category unit, so cost grows with every client and agencies onboard only their largest accounts, and the Prompts step never shows what a selection will consume. Sales feedback and the pricing signals ask for the same things: multi-brand packaging, a simpler meter and no per-engine pricing. With this epic, prompts are the only meter, never engines: brands, categories, countries and languages are unlimited, and one pool is shared by every analysis of the organisation. A prompt costs one slot per market.

The wizard has four steps: Brand & Country, Categories, Prompts and Review. It opens from the New Analysis button of the GEO dashboard, straight on Brand & Country. The sidebar stepper names each step and carries Back to Dashboard, the footer keeps Back and the primary action fixed, and everything above the footer scrolls. Everything set during creation stays manageable after launch in Manage Scope.

## Stories & Tasks

| ID | Type | Title | Status | Link |
|----|------|-------|--------|------|
| GEO-1229 | Story | Share one prompt pool across all analyses | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1229 |
| GEO-1231 | Story | Set the brand and the markets | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1231 |
| GEO-1232 | Story | Review the detected categories | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1232 |
| GEO-1233 | Story | Review the suggested prompts | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1233 |
| GEO-1234 | Story | Add a prompt inline | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1234 |
| GEO-1235 | Story | Sort, filter and edit the prompt table | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1235 |
| GEO-1236 | Story | Track the pool while selecting prompts | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1236 |
| GEO-1237 | Story | Review and create the analysis | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1237 |
| GEO-1238 | Story | Leave the wizard | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1238 |
| GEO-1239 | Story | Manage prompts after launch | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1239 |
| GEO-1240 | Story | See the prompt pool on the GEO dashboard | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1240 |
| GEO-1230 | Story | Set the prompt pool of an organisation in the back office | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1230 |
| GEO-1251 | Story | Resolve competitors when no Visibility prompt is kept | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1251 |
| GEO-1515 | Story | Set the prompt pool of existing organisations from their old quota | ⏳ Ready for QA | https://onclusive.atlassian.net/browse/GEO-1515 |

## Direct Jira Access

- **Epic:** https://onclusive.atlassian.net/browse/GEO-1002
- **Stories:** GEO-1229, GEO-1231, GEO-1232, GEO-1233, GEO-1234, GEO-1235, GEO-1236, GEO-1237, GEO-1238, GEO-1239, GEO-1240, GEO-1230, GEO-1251, GEO-1515
- **Project:** https://onclusive.atlassian.net/browse/GEO

## Key Points

- Prompts are the only meter: brands, categories, countries and languages are unlimited; one pool is shared by every analysis of the organisation; a prompt costs one slot per market (GEO-1229).
- Over the pool, the wizard blocks only Review & Launch / Create Analysis; adding and ticking prompts stay possible (updated 2026-10-09, GEO-1236, GEO-1237). In Manage Scope, ticking or adding still needs room in the pool (GEO-1239).
- An organisation without a pool sees a grey ring "— / —" with a message to contact the account manager (GEO-1229, GEO-1236, GEO-1240).
- Back office: one required "Prompt pool" field replaces the four per-type fields, "Countries" and "Categories max"; sortable "Prompts" column in the organisations list (GEO-1230).
- Wizard: Brand & Country, Categories, Prompts, Review; sidebar stepper with Back to Dashboard; exit confirmation as soon as something was entered (GEO-1231, GEO-1238).
- Prompts step: 10 suggestions per question type per category per market + 10 Brand Image per market, all ticked; unticked prompts cost nothing and stay on the analysis (GEO-1233).
- Existing organisations get their pool once, on the 1.3 deploy, from their old quota: countries x (categories x (Visibility + Competitive + Perception) + Brand Image); pools already set by an admin and deleted organisations are not touched; no organisation is left "not configured" (GEO-1515, dev comment 866014).
- Competitors resolved in the background when no Visibility prompt is kept, backend only (GEO-1251, split out of GEO-1233 AC2, which has nothing to test in GEO-1233).
- GEO-1237 also carries Technical Acceptance Criteria TAC1 to TAC5, marked "dev context — not for QA" (kept under Technical Details, not counted as ACs).

## Out of Scope

- The unbranded analysis, the Analysis Type step and the Other fallback (EPIC-035)
- Plan names and price points (pricing v0.3, set by Management and Sales)
- Buying or requesting prompts in the product: no payment, no pack or upgrade request; a larger pool goes through the account manager
- Billing and invoicing changes, and the advance-notice policy for price changes at renewal
- Agency workspaces and consolidated billing (client workspaces spec)
- AI "Suggest more" on the Prompts step, and save as draft in the wizard
- Bulk paste and CSV import of custom prompts, a later scale path
