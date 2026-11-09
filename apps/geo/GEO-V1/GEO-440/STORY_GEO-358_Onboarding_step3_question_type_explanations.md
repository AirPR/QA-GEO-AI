# Story 2: [Onboarding step 3] Surface explanations of the 4 question types

**Story ID:** GEO-358
**Titre:** [Onboarding step 3] Surface explanations of the 4 question types (Brand Image, Reputation, Visibility, Competitive) — leverage step to teach scope of insights
**Type:** Story
**Statut:** ⏳ Ready for QA
**Assigné à:** Youssef.AitLaydi
**Epic:** GEO-440 (Design Updates fix version 0.4)
**Créée le:** 2026-05-08
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-358

## Summary

On the question-templates step of the onboarding wizard (where users review the auto-generated question templates), surface a clear explanation of each of the four question-type sections — Brand Image, Reputation, Visibility Analysis, Competitive Analysis. This step is the right moment to educate users on the full scope of what the tool can answer, so they can make informed decisions about which prompts to keep, edit, remove, or add.

## User Story

The onboarding wizard groups its question templates into four sections by type. New users frequently do not understand the distinction between these (especially Brand Image vs. Reputation, or Visibility vs. Competitive), and have no in-app explanation of what each section measures.

Beyond clarifying terminology, this step is the natural opportunity to communicate the full coverage of the tool. Users should leave the step understanding the four distinct insights they will get (brand-level identity, category-level reputation, spontaneous category visibility, head-to-head competitive performance). With that context they can confidently:
- decide whether to keep, edit, or remove individual prompts
- add prompts of their own that fit the type
- understand later in the dashboard why each metric and panel exists

Without this education, users either accept defaults blindly or strip the wizard down without realizing what they will lose.

**Form factor is up to design.** Tooltip on info icon, inline subtitle under each section header, expandable accordion, side panel, illustrated card — designer picks the pattern that fits best with the rest of the wizard. The copy below is what each section needs to communicate; how it surfaces is open.

## Copy to Surface (English)

**Brand Image:** "How AI engines describe your brand. Reveals the overall identity, values, and what your brand is known for according to LLMs. Example: 'What is Nike known for?'"

**Reputation:** "How AI engines talk about your brand within a specific category. Captures the strengths, weaknesses, recurring themes, and sentiment AI associates with you in the context of what you sell. Example: 'Is Nike a good choice for running shoes?'"

**Visibility Analysis:** "How often AI engines spontaneously mention your brand when answering category questions, without your name in the prompt. Tests whether AI knows you exist in your space. Example: 'Best running shoes?'"

**Competitive Analysis:** "How AI engines rank your brand in head-to-head comparisons against named competitors. Reveals whether AI picks you when buyers compare options. Example: 'Nike vs Adidas for running shoes?'"

## Steps to Reproduce (current state)

1. Start a new analysis from the dashboard (New Analysis button)
2. Walk through the wizard until the question-templates step
3. Look at each section header (Brand Image / Reputation / Visibility Analysis / Competitive Analysis)
4. Notice no in-app explanation of what each type measures or why it is being asked

**Expected:** Each of the four section explanations is surfaced so users can read what each question type measures and see an example.
**Actual:** Section headers show the name only. New users have no in-app explanation.

## Acceptance Criteria

**AC1 — Four section explanations visible**
- **Given** I am on the question-templates step of the onboarding wizard
- **When** I look at each of the four sections (Brand Image, Reputation, Visibility Analysis, Competitive Analysis)
- **Then** each surfaces an explanation containing the copy listed above

**AC2 — Explanation includes description and example**
- **Given** the explanation is surfaced
- **When** I read it
- **Then** it includes both the description and the example prompt for that question type

**AC3 — Consistency across wizard variants**
- **Given** the onboarding has multiple variants of the wizard step (PromptsStep vs CategoryPromptsStep)
- **When** the same section appears in either variant
- **Then** the same explanation is surfaced consistently

**AC4 — User understands full coverage**
- **Given** a user new to the tool reaches this step
- **When** they finish reading the four explanations
- **Then** they understand the full coverage of insights the tool will produce (brand-level identity, category-level reputation, spontaneous visibility, head-to-head competitive performance) and can make informed decisions about which prompts to keep, edit, remove, or add

**AC5 — Visual consistency with wizard**
- **Given** the chosen form factor (tooltip, inline subtitle, accordion, side panel, etc.)
- **When** the page renders
- **Then** it remains visually consistent with the rest of the wizard

## Dépendances

- **Bloquée par :** GEO-399 (Design task — defines the form factor and layout)

## Liens

- 🔗 Epic parent : https://onclusive.atlassian.net/browse/GEO-440
- 🔗 Story Jira : https://onclusive.atlassian.net/browse/GEO-358
- 🔗 Design task : https://onclusive.atlassian.net/browse/GEO-399
