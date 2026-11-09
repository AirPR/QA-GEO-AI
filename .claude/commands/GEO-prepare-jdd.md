---
name: GEO-prepare-jdd
description: Prepares the test data set (JDD) of an epic before a run — reads the TC preconditions and test data of the CSV, finds matching data on the target environment (analyses, snapshots, accounts per role, domains, feature flags) in read-only mode, writes jdd/{EPIC}/default.json and lists what is missing or must be created with the user's approval. Trigger with /GEO-prepare-jdd.
---

<command-name>GEO-prepare-jdd</command-name>

# Command: /GEO-prepare-jdd

## Usage
```
/GEO-prepare-jdd --version {VERSION} --epic {EPIC_KEY} [--csv path] [--url https://staging-geo.onclusive.com/geo]
```
Default CSV: `.claude/Data/output/csv/{VERSION}/testcases-coverage-epic{EPIC}.csv`. Default URL: staging.

## Phase 1 — Data needs (read-only, local)
Read every TC of the CSV (`QA Precondition`, `Test data`, Given steps) and list each data need, one line per need:

| Need | TCs | Kind | Constraint |
|---|---|---|---|
| analysis with ≥ 2 countries and a review site cited | TC-…-001, 004 | analysis | Gemini, last run < 7 days |
| EDITOR account | TC-…-012 | account | role EDITOR |

Kinds: analysis, snapshot / run date, category, prompt, account per role, organisation, interface language,
feature flag, domain / URL, file, export, Jira ticket.

## Phase 2 — Find existing data (read-only on the environment)
- Log in with the MCP browser (main account, `.env`), check `GET /geo/api/v1/auth/me` (organisation, role, language,
  `features.*`). Never change the language here. Organisation: data in another organisation may be looked up by switching to it (user rule 2026-11-09: switch, read, switch back to QA-GEO and check `/auth/me`); any creation, update or deletion of data there needs the user's OK first.
- Read the analyses list, their countries / LLMs / last run, categories, snapshots, citations through the app pages
  or the GET calls the pages make (`browser_network_requests`). GET only.
- Reuse the data already known: `.claude/Data/raw/test-data/jdd/common.json`, other `jdd/*/default.json`, the memory
  files (staging UUIDs), the previous run findings of the same feature.
- Accounts per role: variables `GEO_USER_*` of `.env` (main = SUPER_ADMIN, EDITOR, READER, PQL); write only the
  variable names in the JDD, never an email or a password.

## Phase 3 — Write the JDD
`.claude/Data/raw/test-data/jdd/{EPIC_KEY}/default.json` (merged over `common.json`, empty `""` = skipped on purpose):
```json
{
  "epic": "GEO-1226", "version": "GEO-R1.4", "prepared": "YYYY-MM-DD",
  "environment": { "url": "…/geo", "organisation": "QA-GEO", "language": "en-GB", "features": {} },
  "accounts": { "main": "GEO_USER_EMAIL", "editor": "GEO_USER_EDITOR_EMAIL", "reader": "GEO_USER_READER_EMAIL", "pql": "GEO_USER_PQL_EMAIL" },
  "analyses": { "review_pages": { "uuid": "…", "brand": "…", "countries": ["GB"], "llms": ["GEMINI"], "last_run": "…", "used_by": ["TC-…-001"] } },
  "domains": {}, "other": {},
  "missing": [ { "need": "…", "tcs": ["TC-…"], "proposal": "create disposable analysis X (5 prompts), delete after the run" } ],
  "cleanup": []
}
```
Also fill the CSV `Test data` cells that are empty when the value is now known (label fix, autonomous) and list them.

## Phase 4 — Missing data (approval gate)
Present `missing[]` in ONE table with a recommended option per line: reuse other data, create (analysis, override,
setting), ask the dev (forced run, feature flag, fixture), or SKIP the TC with the reason.
- Creating / deleting an analysis, changing a setting, saving in Manage Scope or the back office, a global write
  (e.g. source override) = **explicit user approval**. A test analysis keeps only 5 prompts and goes to `cleanup[]`.
- Data the dev must provide → draft the Jira request (English, tag the dev) and post it only per CLAUDE.md rules.

## Rules
- Read-only on the environment until the user approves a creation. Never print a password.
- One JDD per epic; update it (keep `used_by`) instead of creating a new file per run.
- Never put session cookies or tokens in the JDD.

## Agent
`GEO-jdd-preparer-agent` (see `.claude/agents/GEO-jdd-preparer-agent.md`)
