# UP-2184: Edit chart subheader alongside chart title

**Story ID:** UP-2184
**Issue Type:** Story
**Title:** UP Analytics Core Module - Edit chart subheader alongside chart title
**Status:** 🟨 Pending Deployment
**Assigned to:** Houssaine Amzil
**Epic:** UP-2065
**Created:** 2026-10-21
**Updated:** 2026-11-02
**Jira link:** https://onclusive.atlassian.net/browse/UP-2184

## Context

## Requirement
As a user
I want to edit a chart's subheader (the description line under the chart title) in the same place I rename the chart
So that I can fix typos or tailor the subheader to my audience without recreating the chart.
## Background
- User feedback: "I can edit the name (good) but I don't see how I can edit the subheader. Not a huge deal but I already made a spelling mistake..."
- Today, chart cards on Analytics dashboards (Core and Premium) offer **Rename** in the ⋯ menu, which only edits the title. The subheader comes from the chart definition and cannot be changed.
- The fix extends the existing rename flow rather than adding a separate action.

## User Story

**As a** user
**I want** to edit a chart's subheader (the description line under the chart title) in the same place I rename the chart
**So that** I can fix typos or tailor the subheader to my audience without recreating the chart

## Acceptance Criteria

## Acceptance Criteria
### Feature: Edit chart title and subheader
#### Scenario 1: Menu entry
- **Given** I am on an Analytics dashboard (Core or Premium) and not in read-only mode
- **When** I open the ⋯ menu on a chart card
- **Then** I see an **Edit title** option (replacing "Rename")
#### Scenario 2: Inline editing of title and subheader
- **Given** I click **Edit title**
- **When** the chart header switches to edit mode
- **Then** I see two inputs: the chart title (pre-filled) and the subheader (pre-filled with the current subheader, placeholder "Subheader (optional)")
- **And** I can Save (✓ or Enter) or Cancel (✕ or Esc)
#### Scenario 3: Saving changes
- **Given** I have edited the title and/or subheader
- **When** I save
- **Then** both the new title and subheader are displayed on the chart card
- **And** they persist after switching dashboard tabs, switching dashboards, navigating to GEO and back, or reloading the page
#### Scenario 4: Clearing the subheader
- **Given** I clear the subheader input
- **When** I save
- **Then** the chart is displayed with the title only (no subheader line)
#### Scenario 5: Validation
- **Given** the title input is empty
- **When** I try to save
- **Then** no changes are applied and the previous title and subheader are kept
#### Scenario 6: Default subheader
- **Given** I have never edited a chart's subheader
- **When** I view the chart
- **Then** the default subheader from the chart definition is shown (including the comparison-mode variant where applicable)
#### Scenario 7: Read-only permalinks
- **Given** I am viewing a read-only dashboard snapshot
- **When** I view a chart card
- **Then** the **Edit title** option is not available, and the customised title/subheader are displayed
#### Scenario 8: Reports
- **Given** I have customised a chart's subheader
- **When** I create a report from the dashboard
- **Then** the chart is included with its customised title (subheader handling in reports TBD)

## Technical Details

_No technical details section in the Jira description._

## Dependencies
- **Blocks:** not mentioned in description
- **Blocked by:** not mentioned in description

## Definition of Done
- [ ] All Acceptance Criteria implemented and verified
- [ ] QA tests passed on staging
- [ ] No regression on the Analytics module
- [ ] Deployed to production

## Links
- Parent Epic: https://onclusive.atlassian.net/browse/UP-2065
- Story Jira: https://onclusive.atlassian.net/browse/UP-2184
- External Spec: none in Jira description
