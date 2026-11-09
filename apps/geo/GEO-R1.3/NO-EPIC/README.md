# GEO-R1.3 — tickets with no epic parent (temporary folder)

These two tickets of fixVersion 1.3 (Ready for QA, assignee Youssef.AitLaydi) have **no epic parent in Jira yet**. The PO / dev will say which epic they belong to. Until then their local files live here.

| Key | Type | Title | File | Test cases |
|---|---|---|---|---|
| GEO-1220 | Story | [GEO-Administration] API endpoint to override the source type of a domain | `STORY_GEO-1220_API_endpoint_to_override_the_source_type.md` | `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-storyGEO-1220.csv` |
| GEO-1514 | Task | Say country everywhere instead of market (web app and exports) | `TASK_GEO-1514_Say_country_everywhere_instead_of_market.md` | `.claude/Data/output/csv/GEO-R1.3/testcases-coverage-storyGEO-1514.csv` |

Imported read-only from Jira on 2026-10-28.

**When the epic is known:** move the file under `apps/geo/GEO-R1.3/{EPIC_KEY}/`, add the ticket to `epic.stories[]` of that epic's `epic-data.json` (and its README / INDEX), set the `QA Parent` column of the CSV to the epic key (empty for now), then delete this folder once it is empty.
