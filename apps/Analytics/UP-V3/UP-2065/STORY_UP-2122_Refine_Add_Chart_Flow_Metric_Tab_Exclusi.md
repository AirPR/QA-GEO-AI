# UP-2122: Refine "Add Chart" Flow: Metric Tab Exclusivity, Global Search & Chart Reorganization

**Story ID:** UP-2122
**Issue Type:** Story
**Title:** UP Analytics Core Module - Refine "Add Chart" Flow: Metric Tab Exclusivity, Global Search & Chart Reorganization
**Status:** 🟨 Pending Deployment
**Assigned to:** Houssaine Amzil
**Epic:** UP-2065
**Created:** 2026-09-24
**Updated:** 2026-11-02
**Jira link:** https://onclusive.atlassian.net/browse/UP-2122

## Context

### Background
In the current "Add Chart" modal, certain metrics and chart types either overlap across tabs or are categorized under legacy groups, causing confusion during chart discovery. Additionally, search was previously scoped locally to the active tab, requiring users to switch tabs manually if they were not sure where a metric lived. To improve discoverability and provide a clean information architecture, the modal needs to be refined with strict tab exclusivity, cross-tab global search, and reorganized chart categories.
### Problem Statement
The current "Add Chart" modal:
- Allows metrics and chart types to overlap or be inconsistently placed across Coverage and Impact tabs
- Limits metric search to the currently active tab, hindering global discovery
- Groups "Volume by Sentiment" under Volume metrics rather than Sentiment metrics
- Distributes Reach charts across different locations rather than consolidating them under Impact
### Requirement
As a PR & Communications Manager using the Analytics Core Module, I want the "Add Chart" modal to have cleanly categorized metrics, exclusive tab placements, and a global metric search across both tabs, so that I can intuitively locate, search, and add the exact charts I need without ambiguity or navigating back and forth between tabs.

## User Story

**As a** PR & Communications Manager using the Analytics Core Module
**I want** the "Add Chart" modal to have cleanly categorized metrics, exclusive tab placements, and a global metric search across both tabs
**So that** I can intuitively locate, search, and add the exact charts I need without ambiguity or navigating back and forth between tabs

## Acceptance Criteria

### Feature: Metric Tab Exclusivity & Information Architecture
#### Scenario 1: Single-Tab Metric Assignment
- **Given** I open the "Add Chart" modal
- **When** I browse through the Coverage and Impact tabs
- **Then** each metric and chart type must appear in strictly one tab
- **And** no chart or metric should be duplicated across both tabs
### Feature: Global Search Across Tabs
#### Scenario 2: Search Metrics Across Both Tabs
- **Given** I am in the "Add Chart" modal on either tab (Coverage or Impact)
- **When** I type a search query in the search bar (e.g., "Reach" or "Sentiment")
- **Then** the search results should return matching metrics and charts from both Coverage and Impact tabs
- **And** search results should clearly indicate which tab each metric belongs to
#### Scenario 3: Select Search Result from Alternative Tab
- **Given** I am viewing search results matching a metric from the other tab (e.g., searching for an Impact metric while on the Coverage tab)
- **When** I select the chart card from the search results
- **Then** the chart preview panel opens showing the chart configuration
- **And** the preview clearly indicates the destination tab where the chart will be added
#### Scenario 4: Consolidate Reach Charts Under Impact Tab
- **Given** I am browsing the "Add Chart" modal
- **When** I view the Coverage tab
- **Then** no Reach-related charts should be present
- **When** I switch to the Impact tab
- **Then** all Reach metric charts (e.g., Reach trend) must be grouped under the Reach category within the Impact tab
- **And **all charts related to reach should reside in the Impact tab of the dashboard

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
- Story Jira: https://onclusive.atlassian.net/browse/UP-2122
- External Spec: none in Jira description
