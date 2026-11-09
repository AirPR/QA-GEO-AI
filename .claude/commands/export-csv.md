---
name: export-csv
description: Serialises test cases from the reviewed JSON into a normalised Quality Plus CSV file. Validates structure, encodes special characters and names the file with today's date. Trigger with /export-csv.
---

<command-name>export-csv</command-name>

# Skill : CSV Export for Quality Plus

## Trigger
/export-csv [--template qualityplus|custom]

## Prerequisites
- .claude/Data/processed/testcases/testcases_reviewed.json must exist

## Optional Parameters
- --template [qualityplus] : use the standard Quality Plus template (default)
- --template [custom]      : ask for a custom column mapping

## Quality Plus Excel Column Mapping

| Excel Column | JSON Source | Value |
|--------------|-------------|-------|
| Description | description | Test case description |
| QA Priority | qa_priority | High, Medium, Low, Critical |
| Test name | test_name | TC-GEO-10-001 - Description (repeated for each step) |
| Test step | test_steps[] | **ONE Cucumber step per row** (Given/When/Then/And) |
| Test data | test_data | Extracted test data (repeated) |
| Expected result | expected_result | **Result specific to this step** (varies per row) |
| labels | labels | tag1, tag2, tag3 (comma separated, repeated) |
| QA Parent | qa_parent | GEO-10 (story_key, repeated) |
| Components | components | GEO-Module (repeated) |
| QA Components | qa_components | GEO_Module (repeated) |
| QA Precondition | qa_precondition | Preconditions (given, repeated) |
| UI/Functional Test case | ui_functional_test_case | Functional (repeated) |
| Test Type | test_type | Nominal, Negative, Boundary (repeated) |
| Source | _source | Jira AC, PRD FR, or Epic Description (repeated) |

### CUCUMBER RULES - IMPORTANT

**CSV structure with step unrolling:**
- A test case with 3 Cucumber steps → **3 CSV rows**
- Each row = 1 step (Given/When/Then/And)
- Columns Test name, QA Parent, Test data, Labels, etc. are **repeated** identically
- Only columns **Test step** and **Expected result** change per row

## Execution Steps

1. Load testcases_reviewed.json
2. Validate presence of mandatory fields:
   - tc_id, test_name, test_steps[], expected_result (required)
   - Alert and list incomplete cases without interrupting
3. **For each test case, apply Cucumber unrolling:**
   - test_steps[] contains N steps → create N CSV rows
   - Each row = 1 Cucumber step only
   - Validate that each step starts with Given/When/Then/And
4. Apply mapping to the 13 Quality Plus columns (see table)
5. **Fill Expected result row by row:**
   - Each CSV row has its own expected result (specific to this step)
   - Results must be different for each step in the flow
6. Serialise array fields (only labels[]):
   - labels[] → "tag1, tag2, tag3" (comma-space separated)
7. Encode problematic characters:
   - Commas in values → double quotes
   - Line breaks → replace with "; "
   - Double quotes → escape with ""
8. Add header row with the exact 13 columns
9. Write file: .claude/Data/output/csv/testcases_import_YYYYMMDD.csv (UTF-8 BOM encoding)

## Expected Output
- File created: .claude/Data/output/csv/testcases_import_YYYYMMDD.csv
- Columns: Description, QA Priority, Test name, Test step, Test data, Expected result, labels, QA Parent, Components, QA Components, QA Precondition, UI/Functional Test case, Test Type
- **Cucumber unrolling applied:** X test cases (JSON) → Y CSV rows (1 step = 1 row)
- Summary: X cases converted to Y rows, Z cases with warnings
- Confirmation: file ready for /import-qp

### Cucumber Unrolling Example

**JSON Input (1 test case):**
```json
{
  "test_name": "TC-GEO-10-001 - Login user",
  "test_steps": [
    "Given the user is on the login page",
    "When the user enters valid credentials",
    "Then the user is redirected to dashboard"
  ],
  "expected_result": "User successfully logged in",
  "qa_parent": "GEO-10"
}
```

**CSV Output (3 rows):**
```
Test name,Test step,Expected result,QA Parent,...
TC-GEO-10-001 - Login user,Given the user is on the login page,Login page loaded,GEO-10,...
TC-GEO-10-001 - Login user,When the user enters valid credentials,Credentials accepted,GEO-10,...
TC-GEO-10-001 - Login user,Then the user is redirected to dashboard,Dashboard displayed,GEO-10,...
```
