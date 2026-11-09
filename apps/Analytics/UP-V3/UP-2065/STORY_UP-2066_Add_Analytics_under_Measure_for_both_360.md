# UP-2066: Add Analytics under Measure (for both 360 and Critical Mention users)

**Story ID:** UP-2066
**Issue Type:** Story
**Title:** UP Analytics Core Module - Add Analytics under Measure (for both 360 and Critical Mention users)
**Status:** ⬜ Backlog
**Assigned to:** Abderrahim.Bouamar
**Epic:** UP-2065
**Created:** 2026-09-02
**Updated:** 2026-10-28
**Jira link:** https://onclusive.atlassian.net/browse/UP-2066

## Context

## Requirement
As a user
I want Analytics to be the primary landing experience under the Measure module, with dedicated tabs for Analytics and GEO
So that I have a single consolidated place for all measurement without duplicate entry points in Mention.
## Background
- Today, Analytics is accessed via Mention → Chart Analytics, while clicking Measure in the global navigation links directly to GEO.
- We are consolidating all measurement tools under Measure:
  - Removing the "Chart Analytics" tab from Mention.
  - Making Analytics the primary/default landing page within Measure.
  - Introducing a two-tab sub-navigation under Measure: Analytics (default) and GEO.

## User Story

**As a** user
**I want** Analytics to be the primary landing experience under the Measure module, with dedicated tabs for Analytics and GEO
**So that** I have a single consolidated place for all measurement without duplicate entry points in Mention

## Acceptance Criteria

## Acceptance Criteria
### Feature: Add Analytics under Measure (Consolidated Measurement Experience)
#### Scenario 1: Removal of Chart Analytics from Mention Sub-Navigation
- **Given** I am a Core user in the Mention module
- **When** I view the Mention sub-navigation tabs
- **Then** the "Chart Analytics" tab is no longer displayed
#### Scenario 2: Global Navigation Routing to Measure
- **Given** I am logged into the platform
- **When** I click "Measure" from the global navigation menu
- **Then** I am routed to the Measure module
- **And** the "Analytics" tab is selected and displayed by default
#### Scenario 3: Tab Navigation Structure under Measure
- **Given** I am viewing the Measure page
- **When** the page loads
- **Then** two primary tabs are displayed:
  - **Analytics** (or Measure) — Default / Active
  - **GEO**
#### Scenario 4: Switching to the GEO Interface
- **Given** I am on the Measure page with GEO entitlements
- **When** I click the "GEO" tab
- **Then** the GEO interface is displayed seamlessly without requiring re-authentication
#### Scenario 5: Session State and Filter Preservation
- **Given** I have an active dashboard and applied filters in the "Analytics" tab
- **When** I navigate to the "GEO" tab and then return to the "Analytics" tab
- **Then** my active dashboard, selected filters, and view state are fully preserved within the session
#### Scenario 6: Functional Parity and Consistency under Measure
- **Given** I am in the Analytics tab under Measure
- **When** I interact with the module
- **Then** all existing functionality operates identically to prior behavior, including:
  - Dashboards and charts
  - Filters and comparison sets
  - Report creation and top-level actions (e.g., "Create Report")
#### Scenario 7: Entitlements for Analytics-Only Users (No GEO)
- **Given** I have access to Analytics but do not have GEO entitlements in GUM/Auth0
- **When** I view the Measure module tabs
- **Then** the "GEO" tab displays an upsell / demo request state (or diamond lock icon)
#### Scenario 8: Entitlements for Users with Neither Product
- **Given** I do not have access to Analytics or GEO
- **When** I view the global navigation
- **Then** the global Measure icon displays a diamond lock
- **And** clicking the icon routes to the upsell / access request page
#### Scenario 9: User Experience by Cohort (360 vs. Critical Mention)
- **Given** I am accessing the Analytics experience under Measure
- **When** my user account type is resolved:
  - **For 360 Users**:
    - Full access to Analytics under Measure (dashboards, data, and filters)
    - Analytics reports remain accessible via "Reports" in the global top navigation bar
  - **For Critical Mention (CM) Users**:
    - Access to Analytics under Measure (dashboards and data; filters TBD)
    - Analytics reports are hidden for the initial release

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
- Story Jira: https://onclusive.atlassian.net/browse/UP-2066
- External Spec: none in Jira description
