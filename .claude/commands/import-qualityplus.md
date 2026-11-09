---
name: import-qualityplus
description: Pushes the test case CSV to Quality Plus via REST API. Handles authentication, duplicate detection, and test case creation/update. Trigger with /import-qp after /export-csv.
---

<command-name>import-qualityplus</command-name>

# Skill: Import into Quality Plus

## Trigger
/import-qualityplus [--file csv_path?] [--suite suite_id?] [--dry-run?]

## Prerequisites
- Environment variable QP_URL defined
- Environment variable QP_TOKEN defined
- Environment variable QP_PROJECT_ID defined
- CSV file present in .claude/Data/output/csv/

## Optional parameters
- --file [path]   : specify a particular CSV file (default: latest dated file)
- --suite [id]    : target a specific test suite in Quality Plus
- --dry-run       : validate CSV structure only, no API call

## Quality Plus API — Technical reference (MANDATORY)

- **Base URL** : `https://apps-qalityplus.soldevelo.com`
- **OpenAPI spec** : `GET /v3/api-docs` (public, no auth required)
- **Import endpoint** : `POST /api/testCases/import`
- **Auth** : `Authorization: Bearer $QP_TOKEN`
- **Description format** : ADF (Atlassian Document Format) required — plain text is rejected:
  ```json
  { "version": 1, "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "..." }] }] }
  ```
- **Payload** :
  ```json
  {
    "projectId": "$QP_PROJECT_ID",
    "testCases": [{
      "name": "TC-XXX-001 - Title",
      "testSteps": [{ "step": "Given...", "data": "", "result": "..." }],
      "properties": {
        "description": "<ADF object>",
        "customfield_16347": { "value": "High" },
        "customfield_16381": "GEO-152",
        "customfield_13100": ["GEOModule"],
        "customfield_16314": "<ADF object>",
        "customfield_16382": "GEO-1116",
        "customfield_10501": { "value": "Yes" },
        "customfield_13290": { "value": "Manual" },
        "customfield_16313": { "value": "Functional" }
      }
    }]
  }
  ```
- **CSV → `properties` field mapping** (use Jira customfield IDs — QP names like `qaParent` are rejected):
  | CSV column                | `properties` key    | Format |
  |---------------------------|---------------------|--------|
  | `Description`             | `description`       | ADF object |
  | `QA Priority`             | `customfield_16347` | `{ "value": "High" }` |
  | `QA Parent`               | `customfield_16381` | plain string |
  | `QA Component`            | `customfield_13100` | array ⚠️ no spaces |
  | `QA Precondition`         | `customfield_16314` | ADF object |
  | `QA Story/Task`           | `customfield_16382` | plain string |
  | `Smoke`                   | `customfield_10501` | `{ "value": "Yes" }` |
  | `Test Type`               | `customfield_13290` | `{ "value": "Manual" }` |
  | `UI/Functional Test case` | `customfield_16313` | `{ "value": "Functional" }` |
- **Success response** : `{ "success": [{ "testCaseKey": "GEO-XXXX", "name": "..." }], "errors": [] }`
- **Duplicate search** (`GET /api/testCases/search`): requires advanced plan → unavailable, skip this step

## Execution steps

1. Read `.env`: `QP_URL`, `QP_TOKEN`, `QP_PROJECT_ID`
2. Identify the target CSV file (--file or latest dated file in output/csv/)
3. If --dry-run: validate CSV structure only, display result without API call
4. Parse the CSV (delimiter `;`) — group rows by `Test name` to build TCs with their steps
5. Build JSON payload: convert `Description` to ADF, map all CSV columns to their `customfield_XXXXX` keys in `properties`
6. `POST $QP_URL/api/testCases/import` with the full payload
7. Display summary: X created (with QP keys assigned), Y errors with detail

## Expected output
- Summary: X created (QP keys assigned), Z errors
- Error detail per TC name and message
- Link to Quality Plus: `$QP_URL`
