---
name: generate-testcases
description: Generates structured functional test cases in Given/When/Then format from analysed requirements. Covers nominal, negative and boundary scenarios. Trigger with /gen-tests after /analyze-req.
---

<command-name>generate-testcases</command-name>

# Skill : Test Case Generation

## Trigger
/gen-tests [--scope epic_key?] [--priority high|all?]

## Prerequisites
- .claude/Data/processed/requirements/functional_requirements.json (Source 1: PRD)
- .claude/Data/processed/requirements/acceptance_criteria_mapped.json (Source 2: Jira functional ACs)
- .claude/Data/raw/jira/epics_raw.json (Source 3: Epic descriptions)
- .claude/Data/raw/test-data/selectors_blueprint.json (UI Reference: selectors, labels, known values already validated)
- .claude/Data/raw/test-data/*.json (Page oracles: overview, category-view, wizard, manage-scope, reports-list, common)

## Optional Parameters
- --scope [epic_key] : limit generation to a specific Epic
- --priority [high]  : generate only high priority tests
- --type [nominal|negative|boundary|all] : filter by scenario type (default: all)

## 3 Generation Sources (MANDATORY)

Generation uses **3 distinct sources**, each test case carries a `_source` field:

| Source | File | _source field | Content |
|--------|------|---------------|---------|
| **Jira Functional ACs** | acceptance_criteria_mapped.json | `Jira AC` | Given/When/Then ACs from individual stories (technical bullets excluded) |
| **PRD FRs** | functional_requirements.json | `PRD FR` | Functional requirements + business flows + constraints |
| **Epic Descriptions** | epics_raw.json | `Epic Description` | Scope overviews, cross-story E2E flows, epic-level ACs |

### What to Extract from Each Source
- **Jira AC** → unit tests per story (1 AC = 2-4 tests: nominal + negative + boundary)
- **PRD FR** → tests for FRs not covered by Jira ACs + boundary tests on metrics/thresholds
- **Epic Description** → cross-story E2E tests (complete Epic flow) + epic-level ACs absent from stories + cross-cutting constraints (atomicity, on-demand, performance)

### Numbering
- Jira AC + PRD FR: tc_id = TC-GEO-{story}-001 to 899
- Epic Description: tc_id = TC-GEO-{epic}-901 to 999 (series 900 to avoid conflicts)

## UI Anchoring (MANDATORY via selectors_blueprint.json)

To avoid inventing fragile locators and keep the CSV aligned with the real app surface:

1. **Always consult** `selectors_blueprint.json` before writing a Then step or assertion.
2. **Cite existing values** in Given/When/Then steps instead of inventing:
   - `known_values` in `filters.market_dropdown` → e.g. "United States - English" (never "USA" or "US EN")
   - `known_labels` in `overview_page.kpi_cards` → "Share of Voice", "Visibility"... (exact casing)
   - `headings_h3_inventory` → canonical section titles (e.g. "Category Prioritization", not "Priority Matrix")
   - `dimension_names` in `corporate_reputation_cards` → "Brand Image", "ESG / Sustainability"...
3. **Reuse stable selectors** referenced in the blueprint (data-testid, aria-label, role) instead of crafting raw text in technical steps.
4. **If a required locator is absent from the blueprint**: note the need in `gaps_and_todos` (blueprint field to enrich) and do not invent a fictional `data-testid`. Prefer a locator by heading text or role, consistent with the "data-testid > id > role > text" hierarchy.
5. **Consistency with oracles**: if an AC mentions a label or value, verify it also appears in the corresponding page JSON (`overview.json`, `category-view.json`, etc.) or in the blueprint. Otherwise, it signals an ambiguous AC — flag it rather than completing by extrapolation.

## Execution Steps

1. Load the 3 sources: functional_requirements.json, acceptance_criteria_mapped.json, epics_raw.json
1.b. Load the UI reference: selectors_blueprint.json and page test-data JSONs — used as anchors for labels, known values and locators
2. For each criterion, apply testing techniques:
   a. Nominal scenario   : main flow as specified
   b. Negative scenarios : invalid data, denied access, unexpected state
   c. Boundary values    : field limit values (min, max, min-1, max+1)
3. Structure each test case in Quality Plus format with **Cucumber syntax**:
   - tc_id     : TC-[story_key]-[sequence]
   - story_key : GEO-10, GEO-11, etc.
   - description : [Test case title]
   - qa_priority : Critical/High/Medium/Low
   - test_name : TC-GEO-10-001 - [Description]
   - **test_steps : ["Given ...", "When ...", "Then ...", "And ..."]** (array of Cucumber strings)
   - test_data : [Required data]
   - expected_result : [Global expected result of the test case]
   - labels : ["tag1", "tag2"]
   - qa_parent : [story_key]
   - components : GEO-Module
   - qa_components : GEO_Module
   - qa_precondition : [Preconditions]
   - ui_functional_test_case : Functional
   - test_type : Nominal/Negative/Boundary
   - **_source : "Jira AC" | "PRD FR" | "Epic Description"** (required, identifies the origin)
4. **Apply Cucumber rules for test_steps:**
   - Strict format: `Given`, `When`, `Then`, `And` only
   - No step_number objects, only strings
   - Logical order: Given (preconditions) → When (actions) → Then (verifications)
5. Apply priority (Critical/High/Medium/Low)
6. Save the draft to testcases_draft.json
7. Deduplicate and review → testcases_reviewed.json
8. Display a summary: X test cases generated by type and priority

## Expected Output
- .claude/Data/processed/testcases/testcases_draft.json
- .claude/Data/processed/testcases/testcases_reviewed.json
- Fields: description, qa_priority, test_name, **test_steps[] (array of Cucumber strings)**, test_data, expected_result, labels, qa_parent, components, qa_components, qa_precondition, ui_functional_test_case, test_type
- test_steps format: `["Given ...", "When ...", "Then ...", "And ..."]` (one Cucumber step per string)
- Summary displayed: total, breakdown by type, by priority, by story
