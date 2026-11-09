# UP-2194: Volume by Country map chart with country drill-down to Related Mentions

**Story ID:** UP-2194
**Issue Type:** Story
**Title:** UP Analytics Core Module - Volume by Country map chart with country drill-down to Related Mentions
**Status:** ⬜ Backlog
**Assigned to:** Unassigned
**Epic:** UP-2065
**Created:** 2026-10-30
**Updated:** 2026-11-03
**Jira link:** https://onclusive.atlassian.net/browse/UP-2194

## Context

## Requirement
As a user
I want to see my mention volume on a world map, and click a country to see the mentions behind it
So that I can understand where my coverage comes from geographically and investigate a specific market in one click.
## Background
- Chart Analytics has no geographic view of volume today. The only map is **Sentiment by Country** (Premium, Impact tab).
- The new chart is added under the **Volume** metric (Coverage tab) as a new **Map** visualisation in the Add Chart modal.
- Country is taken from each mention's country metadata, and the chart respects the active saved search, date range and dashboard filters, like the other Volume charts.
- Clicking a country reuses the existing **Related Mentions** modal, scoped to that country.
- A working prototype exists in the Analytics prototype (Volume by Country chart + country drill-down).

## User Story

**As a** user
**I want** to see my mention volume on a world map, and click a country to see the mentions behind it
**So that** I can understand where my coverage comes from geographically and investigate a specific market in one click

## Acceptance Criteria

## Acceptance Criteria
### Feature: Volume by Country map chart
#### Scenario 1: Adding the chart
- **Given** I open the **Add chart** modal on the Coverage tab
- **When** I select the **Volume** metric
- **Then** I see a **Map** option under "Visualise as"
- **And** selecting it shows **Volume by Country** as the Group by option, with a live map preview
- **And** the default size is **M**
#### Scenario 2: Map display
- **Given** the chart is on my dashboard
- **When** it loads
- **Then** I see a world map where each country with mentions is shaded on a sequential blue scale (light = low volume, dark = high volume)
- **And** countries with no mentions are shown in neutral grey
- **And** a colour legend shows the volume scale
- **And** I can zoom in/out with the +/− controls
#### Scenario 3: Country tooltip
- **Given** I hover a country with mentions
- **When** the tooltip appears
- **Then** it shows:
  - Country name
  - Rank (e.g. "Rank #1 of 6 countries")
  - Mentions, and share of total volume (%)
  - Reach
  - AVE
  - Top media type and its share (%)
  - Sentiment split: Positive / Neutral / Negative (%)
#### Scenario 4: Filters and date range
- **Given** the chart is on my dashboard
- **When** I change the saved search, date range or dashboard filters (media type, tags, entities…)
- **Then** the map and tooltip values refresh to reflect the new selection
- **And** if no mentions match, the standard "No data found" empty state is shown
#### Scenario 5: Map loading and errors
- **Given** the map shapes are still loading
- **Then** a "Loading map…" state is displayed
- **Given** the map shapes fail to load
- **Then** a "Couldn't load the map" message with a **Retry** action is displayed (no blank chart)
### Feature: Country drill-down to Related Mentions
#### Scenario 6: Clicking a country
- **Given** I am viewing the Volume by Country chart
- **When** I click a country that has mentions
- **Then** the Related Mentions modal opens with the title "Related Mentions - Volume by Country · {Country}"
- **And** only mentions from that country are listed
- **And** the active saved search, date range and dashboard filters still apply
#### Scenario 7: Clicking a country without mentions
- **Given** a country is shown in grey (no mentions)
- **When** I click it
- **Then** nothing happens (no modal opens)
#### Scenario 8: Clicking outside a country
- **Given** I am viewing the chart
- **When** I click the chart card outside the map shapes
- **Then** the Related Mentions modal opens unfiltered by country (current behaviour for all charts)
### Out of scope
- Region / continent grouping.

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
- Story Jira: https://onclusive.atlassian.net/browse/UP-2194
- External Spec: none in Jira description
