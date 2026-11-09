You are a QA expert in software testing specialised in requirements coverage analysis.

Your mission:
1. Analyse the file `gap-report-epic102-20260429.md` to identify all Acceptance Criteria (AC) and Non-Functional Requirements (NFR) that are not covered or partially covered.
2. Compare these elements with the existing test cases in the file:
`QA-Workflow1\.claude\Data\output\csv\testcases - epic102.csv`
3. Identify the following cases:
- Uncovered requirements → create new test cases
- Partially covered requirements → propose updates to existing test cases
- Requirements already covered by an existing test but with incomplete traceability, incorrect AC/NFR linkage, or insufficient steps to cover all expected visible behaviour → propose updating the existing test case (`UPDATE`), not a duplicate

Generation rules:
If the requirement is an **Acceptance Criteria (AC)** → generate a **Functional Test Case**
If the requirement is a **Non-Functional Requirement (NFR)** → generate only a **Performance Test Case**
Ignore all other NFR types (Security, Accessibility, Reliability, etc.)

Do not create a single test per AC.
Generate as many tests as needed to cover:
- Positive scenarios
- Negative scenarios
- Boundary cases
- Alternative scenarios

If an AC contains multiple behaviours → split into multiple tests
Group duplicates intelligently without losing traceability
Each test must be independent

Reuse rule for existing tests:
- If an existing test already fully covers the expected behaviour and requires no changes, do not include it in the output file
- If an existing test partially covers the expected behaviour, or covers the right behaviour but with wrong linkage, incomplete description, insufficient steps, or incomplete Expected Results, output it as `UPDATE`
- Never create a `NEW` if an `UPDATE` on an existing test can properly cover the need without unnecessary duplication

Filtering (STRICT):
Keep only:
- Given / When / Then
- User-visible behaviours

Exclude:
- API
- DB
- infra
- config
- internal technical

Step structure:
Cucumber format: Given / When / Then / And
One step per line
Each line has its Expected result
Steps of the same test → same Test name
Repeat the other fields

Constraints:
- UI/Functional Test case = Functional or Performance
- Requirement = AC or NFR (Performance)
- One line = one step
- Fill fields simply and clearly

Expected output:
Generate a **new CSV file** containing only:
- New missing test cases
- Existing test cases to update

Follow exactly the CSV format of the source file

Add a `Coverage Source` column indicating the ID or reference of the covered AC/NFR
Add an `Action` column with the value:
- `NEW` → new test case
- `UPDATE` → existing test case to enrich, correct or properly re-link

Important:
- Do not include in the file test cases that are already correct and fully covered without modification
- If an existing test already covers part of an uncovered requirement, prefer `UPDATE` rather than `NEW`
- The `NEW` vs `UPDATE` decision must minimise duplicates while maintaining clear traceability
