# Story 0.1: Shared Infrastructure Setup

**Story ID:** GEO-98  
**Titre:** [Story 0.1] Shared Infrastructure Setup  
**Statut:** Done  
**Assigné à:** Abdenasser Aroukhsiss  
**Epic:** GEO-106 (EPIC-000)  
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-98

## User Story

**As** a developer  
**I want** the shared infrastructure components configured and ready  
**So that** all subsequent stories can build on a solid foundation

## Acceptance Criteria

**Given** the project structure (Sprint 0 complete), **When** this story is implemented, **Then** the following are configured and tested:

- PromptApiClient bean (WebClient, 40s timeout for wizard, 60s for processor) in both services
- PromptTemplateRegistrar for registering prompt templates on startup
- EmailService interface + SendGrid implementation skeleton
- KafkaConfig with all 8 topic definitions
- RedisConfig for wizard rate limiting
- Resilience4j CircuitBreaker configuration per LLM provider
- Flyway baseline configuration
- geo-flink-jobs Maven module created with Flink 1.20 dependencies

**Note:** 
- This is the ONLY technical-only story. All subsequent stories deliver user value.
- No database tables created here — tables created just-in-time in each story.
- [UPDATED post-spike 2026-03-18] No custom SecurityConfig or CORS — onclusive-auth-spring-boot-starter auto-configures SecurityFilterChain. CORS handled by Vite proxy (dev) / API Gateway (prod).

## Definition of Done

- ✅ All acceptance criteria met
- ✅ Unit tests written and passing
- ✅ Code reviewed and approved
- ✅ Tested in staging environment

## Dependencies

- None (foundation story for all other epics)

## Technical Notes

- This is a pure infrastructure setup story
- Foundation for all subsequent Epic 1-5 implementation
- Enables parallel development once completed
- No user-facing functionality in this story
