# UP-334: API & Pipeline for CM Saved Searches & Results

**Story ID:** UP-334
**Issue Type:** Story
**Title:** UP Analytics Core Module - API & Pipeline for CM Saved Searches & Results
**Status:** 🟨 In Progress
**Assigned to:** Abderrahim.Bouamar
**Epic:** UP-2065
**Created:** 2025-07-16
**Updated:** 2026-11-02
**Jira link:** https://onclusive.atlassian.net/browse/UP-334

## Context

## **Requirement :**
**As a** PR & Communications Manager with access to the Analytics Module – Core, **I want **the system to pull all my saved custom searches and chart settings via API from Critical Mention, **So that** my charts in Analytics automatically match my brand’s color scheme without manual reconfiguration.

## Assumptions
- User should pull the same data they have in CM to Analytics
- User should have the same filters, date ranges and saved searches from CM to Analytics
- User should be able to pull articles from Monitor CM to view in Analytics
- User should be able to do aggregations on the data from CM in Analytics
- User information should flow from CM to Analytics without seamlessly (Auth0, and user information)

## User Story

**As a** PR & Communications Manager with access to the Analytics Module – Core
**I want** the system to pull all my saved custom searches and chart settings via API from Critical Mention
**So that** my charts in Analytics automatically match my brand’s color scheme without manual reconfiguration

## Acceptance Criteria

## **Feature : Import Saved Searches and Articles via API**
**As a **user using the Analytics Module – Core, **I want** the system to automatically pull saved searches and their underlying articles at the account level via API, **So that** I can analyze consistent, account-level media data in dashboards and reports without needing to reconfigure searches manually.
### **Acceptance Criteria:**
**Scenario 1: Pull Saved Searches via API**
- **Given** I have saved searches configured in Critical Mention
- **When** I access the Analytics Module
- **Then** the system should retrieve the list of saved searches via a secure API call
- **And** display them in the appropriate dashboard
**Scenario 2: Pull Underlying Articles for Each Saved Search**
- **Given** saved searches are retrieved
- **When** I select or load a saved search in Analytics
- **Then** the system should also pull the full list of associated articles
- **And** those articles should populate the relevant charts, dashboards, and reports.
**Scenario 3: Automatic Sync and Refresh**
- **Given** saved searches or articles are updated in Critical Mention
- **When** I access Analytics or manually refresh
- **Then** the changes should reflect automatically in Analytics via the API integration.
**Scenario 4: Error Handling and Access Control**
- **Given** there is a failure to retrieve saved searches or articles via the API
- **Then** the system should display a clear error message
- **And** ensure that only users with appropriate access can view the data.
## **Feature : Import saved dashboards**
**As a** user using the Analytics Module – Core, **I want** the system to automatically import my saved dashboards and templates from Critical Mention, **So that** I can continue working with my existing dashboard layouts and configurations without having to rebuild them manually in Analytics.
### **Acceptance Criteria:**
**Scenario 1: Import Saved Dashboards via API**
- **Given** I have saved dashboards configured in Critical Mention
- **When** I access the Analytics Module for the first time or trigger a sync
- **Then** the system should retrieve all saved dashboards via a secure API call
- **And** display them in my Analytics dashboard library, preserving their original layout and widget configuration.
**Scenario 2: Preserve Dashboard Configuration and Chart Settings**
- **Given** a saved dashboard is imported from Critical Mention
- **When** the dashboard is rendered in Analytics
- **Then** all chart types, filters, date ranges, and saved search associations should be preserved
- **And** the dashboard should display data consistent with the original Critical Mention configuration.
**Scenario 3: Partial Import and Error Handling**
- **Given** one or more dashboards or templates fail to import due to API errors or incompatible configurations
- **When** the import process completes
- **Then** the system should display a summary of successfully imported and failed items
- **And** provide actionable error messages so the user can resolve issues manually.
## **Feature: User access and roles settings**
**As a** user or administrator using the Analytics Module – Core, **I want** the system to manage user access and role-based permissions seamlessly, **So that** the right users have the right level of access to dashboards, reports, and settings without manual reconfiguration.
### **Acceptance Criteria:**
**Scenario 1: Sync User Roles from Critical Mention**
- **Given** users have assigned roles such as Admin, Editor, or Viewer in Critical Mention
- **When** they access the Analytics Module
- **Then** the system should automatically retrieve and apply their corresponding roles via the API
- **And** grant or restrict access to features based on those roles.
**Scenario 2: Role Change Propagation**
- **Given** an Admin updates a user's role in the Analytics Module or Critical Mention
- **When** the change is saved
- **Then** the updated permissions should take effect immediately upon the user's next action or page refresh
- **And** the user should be notified of any significant access changes.
**Scenario 3: Access Revocation and Session Handling**
- **Given** a user's access is revoked by an Admin
- **When** the user is currently active in the Analytics Module
- **Then** their session should be terminated or restricted within a defined timeout period
- **And** they should be redirected to an appropriate access-denied or logout page.
## **Feature: Filters and Filtering Rules Sync**
**As a** user using the Analytics Module – Core, **I want** the system to synchronize filtering rules and logic between Critical Mention and Analytics, **So that** the data displayed in my charts and reports is filtered consistently across both platforms without manual intervention.
### **Acceptance Criteria:**
**Scenario 1: Sync Filtering Rules via API**
- **Given** I have specific filtering rules, such as keyword exclusions or source filters, set up in Critical Mention
- **When** I access the Analytics Module
- **Then** the system should retrieve these rules via API
- **And** apply them to the data being processed for Analytics charts and dashboards.
**Scenario 2: Real-time Filter Updates**
- **Given** a filter or filtering rule is modified in Critical Mention
- **When** I refresh the Analytics dashboard
- **Then** the updated filtering rules should be applied immediately to the displayed data.
### **Mapping for CM and analytics filters:**
| Critical Mention Filter | Analytics Equivalent | Sync Logic / Notes |
| --- | --- | --- |
| Media type (tv, radio, print, web, podcast and social) | Media type (tv, radio, print, web, podcast and social) |  |
| Country | Country |  |
| Language | Language |  |
| Social platform (FB, X, LI, TT, IG) | Media category for social media (FB, X, LI, TT, IG) |  |
| Article sentiment (Positive, Negative, Neutral) | Sentiment (Positive, Negative, Neutral) |  |
| Podcast categories | Podcast Media categories |  |
| Radio programs and Radio stations | NA ( No media categories for TV) |  |
| TV Programs & Cast/Crew Names | NA ( No media categories for TV) |  |
| TV Channels | NA ( No media categories for TV) |  |
| US states | NA (only countries are included) |  |
| Market | NA |  |

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
- Story Jira: https://onclusive.atlassian.net/browse/UP-334
- External Spec: none in Jira description
