---
name: export-results
description: Parses raw Playwright results and synchronises them to Quality Plus by associating each result with its corresponding test case. Updates execution statuses and attaches evidence. Trigger with /export-results after /run-tests.
---

<command-name>export-results</command-name>

# Skill : Results Export to Quality Plus

## Trigger
/export-results [--execution-id id?] [--run-date YYYYMMDD?]

## Prerequisites
- .claude/Data/raw/playwright/test-results-raw.json must exist
- .claude/Data/processed/testcases/testcases_reviewed.json must exist (for mapping)
- Quality Plus environment variables defined

## Optional Parameters
- --execution-id [id]       : ID of the existing Quality Plus execution (created automatically if absent)
- --run-date [YYYYMMDD]    : date of the execution to process (default: most recent)

## Execution Steps

1. Load test-results-raw.json
2. Load testcases_reviewed.json for tc_id ↔ Playwright spec mapping
3. Parse each result:
   - Status: passed → Pass | failed → Fail | skipped → Skip
   - Duration in milliseconds
   - Error message and stack trace if Fail
   - Screenshot and trace path if Fail
4. Save parsed results and analysed failures
5. Create or retrieve the execution in Quality Plus
6. Push results via Quality Plus API
7. Attach screenshots as attachments for failed tests

## Expected Output
- .claude/Data/processed/testcases/test-results/test-results-epic{ID}-real.json (parsed results, per epic)
- Results updated in Quality Plus
- Summary: X Pass, Y Fail, Z Skip synchronised
- If failures exist: invitation to run /create-bugs
