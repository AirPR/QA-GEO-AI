# Story 0.2: Database Forward Migrations + Seed Data

**Story ID:** GEO-108  
**Titre:** [Story 0.2] Database Forward Migrations + Seed Data  
**Statut:** Done  
**Assigné à:** Abdenasser Aroukhsiss  
**Epic:** GEO-106 (EPIC-000)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-108

## User Story

**As** the development team  
**I want** all remaining database tables created and a complete BMW report seeded  
**So that** Epic 3 (Pipeline) can start in parallel with Epic 2 (Wizard) without waiting for the wizard UI to produce data

## Context

This is an infrastructure enabler that breaks the sequential dependency between Epic 2 and Epic 3. The analysis pipeline (Epic 3) needs a fully configured report in the database — but it doesn't need the wizard UI. By creating all tables and seeding realistic data now, a second developer can start Epic 3 immediately.

## Acceptance Criteria

**AC1:** Config-manager migrations — 4 new Flyway migrations create:
  - category_translations
  - questions
  - llm_configurations
  - report_job_queue

**AC2:** Analysis-processor migrations — 4 new Flyway migrations create:
  - snapshots
  - llm_responses
  - response_sources
  - domain_classifications

**AC3:** Config-manager JPA entities with correct inheritance and @SQLRestriction:
  - CategoryTranslation
  - Question
  - LlmConfiguration
  - ReportJobQueue

**AC4:** Analysis-processor JPA entities with correct inheritance and @SQLRestriction:
  - Snapshot
  - LlmResponse
  - ResponseSource
  - DomainClassification

**AC5:** Config-manager repositories for all new entities

**AC6:** Analysis-processor repositories for all new entities

**AC7:** All missing enums created:
  - JobStatus
  - ResponseStatus
  - QuestionType
  - SourceType
  - SourceCategory
  - SummaryScope

**AC8:** Seed migration with complete BMW report configuration:
  - 1 report (PENDING status)
  - 2 markets
  - 3 categories
  - 6 category_translations
  - ~96 questions
  - 5 llm_configurations
  - 1 report_job_queue entry

**AC9:** Both services start successfully with all migrations applied

**AC10:** Existing tests pass — `cd backend && mvn verify` passes with zero regressions

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- Story 0.1 (Shared Infrastructure Setup)

## Technical Notes

- Enables parallel development of Epic 2 and Epic 3
- No UI functionality needed — pure database setup
- BMW seed data allows testing without wizard generation
- Migrations follow Flyway conventions
- All entities include @SQLRestriction for multi-tenant support
