# e2e-hubspot-upsell-pql

- **Spec:** `.claude/Data/raw/playwright/e2e-hubspot-upsell-pql.spec.js`
- **Active scenarios:** 8 · **Retired:** 4
- **Source:** E2E suite review up to GEO-R1.3 (2026-10-28) — `.claude/Data/processed/e2e-scenarios/e2e-suite-GEO-R1.3-scenarios.md`
- Step texts are the exact Given/When/Then wording used by the spec (`test.step()`).

| Scenario | Title | Status | Stories |
|---|---|---|---|
| [E2E-UPSELL-PQL-001](#e2e-upsell-pql-001) | Modal See it in action affichée au clic | KEEP | GEO-237 |
| [E2E-UPSELL-PQL-002](#e2e-upsell-pql-002) | Confirm activé après coche de la checkbox | KEEP | GEO-237 |
| [E2E-UPSELL-PQL-003](#e2e-upsell-pql-003) | Fermeture modal sans confirmation -> aucun appel backend | KEEP | GEO-237 |
| [E2E-UPSELL-PQL-004](#e2e-upsell-pql-004) | Confirmation + cookies accordés -> appel direct sans JitBridgeModal | KEEP | GEO-237 |
| [E2E-UPSELL-PQL-005](#e2e-upsell-pql-005) | Idempotence - un seul appel HubSpot par session | KEEP | GEO-237 |
| [E2E-UPSELL-PQL-006](#e2e-upsell-pql-006) | Erreur HubSpot non-bloquante pour l'utilisateur | KEEP | GEO-237 |
| [E2E-UPSELL-PQL-007](#e2e-upsell-pql-007) | Les 5 boutons "Speak to Us" déclenchent la même logique | KEEP | GEO-237 |
| [E2E-UPSELL-PQL-008](#e2e-upsell-pql-008) | Réponse 401 ne déclenche pas de redirection Auth0 | KEEP | GEO-237 |

---

## E2E-UPSELL-PQL-001

**Modal See it in action affichée au clic**

| Field | Value |
|---|---|
| Status | KEEP — rebuilt from the spec texts; needs the upsell storageState (regenerate before the run); last run failed — check the account / page in the spec phase |
| Description | Hubspot PQL feedback from the upsell page (See it in action modal). Scenario rebuilt from the test()/test.step() texts of e2e-hubspot-upsell-pql.spec.js (no archive CSV); expected results = the step texts. No newer TC changes the upsell flow (KEEP). Note: the spec TC numbers do not match the ids of GEO-R1.0/testcases-coverage-storyGEO-237.csv. Consolidates spec TC-GEO-237-001 (GEO-237). Former id: TC-GEO-237-001. |
| Priority | High |
| Stories | GEO-237 |
| Precondition | Upsell account (module not activated) with storageState-upsell.json (UPSELL_USER_EMAIL in .env); upsell page Measure |
| Labels | e2e-suite |
| QA Parent | GEO-200 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 FAIL (8 failed in the file) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given l'user est sur la page upsell Measure |  | L'user est sur la page upsell Measure |
| 2 | When il clique sur un bouton "Speak to Us" |  | Il clique sur un bouton "Speak to Us" |
| 3 | Then la modal s'ouvre avec le titre "See it in action", la description, la checkbox décochée et le bouton Confirm désactivé |  | La modal s'ouvre avec le titre "See it in action", la description, la checkbox décochée et le bouton Confirm désactivé |

---

## E2E-UPSELL-PQL-002

**Confirm activé après coche de la checkbox**

| Field | Value |
|---|---|
| Status | KEEP — rebuilt from the spec texts; needs the upsell storageState (regenerate before the run); last run failed — check the account / page in the spec phase |
| Description | Hubspot PQL feedback from the upsell page (See it in action modal). Scenario rebuilt from the test()/test.step() texts of e2e-hubspot-upsell-pql.spec.js (no archive CSV); expected results = the step texts. No newer TC changes the upsell flow (KEEP). Note: the spec TC numbers do not match the ids of GEO-R1.0/testcases-coverage-storyGEO-237.csv. Consolidates spec TC-GEO-237-002 (GEO-237). Former id: TC-GEO-237-002. |
| Priority | High |
| Stories | GEO-237 |
| Precondition | Upsell account (module not activated) with storageState-upsell.json (UPSELL_USER_EMAIL in .env); upsell page Measure |
| Labels | e2e-suite |
| QA Parent | GEO-200 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 FAIL (8 failed in the file) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given la modal SeeItInActionModal est ouverte |  | La modal SeeItInActionModal est ouverte |
| 2 | When l'user coche la checkbox "I'm happy to be contacted for a demo" |  | L'user coche la checkbox "I'm happy to be contacted for a demo" |
| 3 | Then le bouton "Confirm" devient actif (clickable) |  | Le bouton "Confirm" devient actif (clickable) |

---

## E2E-UPSELL-PQL-003

**Fermeture modal sans confirmation -> aucun appel backend**

| Field | Value |
|---|---|
| Status | KEEP — rebuilt from the spec texts; needs the upsell storageState (regenerate before the run); last run failed — check the account / page in the spec phase |
| Description | Hubspot PQL feedback from the upsell page (See it in action modal). Scenario rebuilt from the test()/test.step() texts of e2e-hubspot-upsell-pql.spec.js (no archive CSV); expected results = the step texts. No newer TC changes the upsell flow (KEEP). Note: the spec TC numbers do not match the ids of GEO-R1.0/testcases-coverage-storyGEO-237.csv. Consolidates spec TC-GEO-237-003 (GEO-237). Former id: TC-GEO-237-003. |
| Priority | High |
| Stories | GEO-237 |
| Precondition | Upsell account (module not activated) with storageState-upsell.json (UPSELL_USER_EMAIL in .env); upsell page Measure |
| Labels | e2e-suite |
| QA Parent | GEO-200 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 FAIL (8 failed in the file) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given la modal SeeItInActionModal est ouverte |  | La modal SeeItInActionModal est ouverte |
| 2 | When l'user ferme la modal (croix / backdrop / touche Escape) |  | L'user ferme la modal (croix / backdrop / touche Escape) |
| 3 | Then la modal se ferme et aucun appel POST /api/v1/upsell/hubspot n'est effectué |  | La modal se ferme et aucun appel POST /api/v1/upsell/hubspot n'est effectué |

---

## E2E-UPSELL-PQL-004

**Confirmation + cookies accordés -> appel direct sans JitBridgeModal**

| Field | Value |
|---|---|
| Status | KEEP — rebuilt from the spec texts; needs the upsell storageState (regenerate before the run); last run failed — check the account / page in the spec phase |
| Description | Hubspot PQL feedback from the upsell page (See it in action modal). Scenario rebuilt from the test()/test.step() texts of e2e-hubspot-upsell-pql.spec.js (no archive CSV); expected results = the step texts. No newer TC changes the upsell flow (KEEP). Note: the spec TC numbers do not match the ids of GEO-R1.0/testcases-coverage-storyGEO-237.csv. Consolidates spec TC-GEO-237-007 (GEO-237). Former id: TC-GEO-237-007. |
| Priority | High |
| Stories | GEO-237 |
| Precondition | Upsell account (module not activated) with storageState-upsell.json (UPSELL_USER_EMAIL in .env); upsell page Measure |
| Labels | e2e-suite |
| QA Parent | GEO-200 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 FAIL (8 failed in the file) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given areFunctionalCookiesEnabled est true (consentement accordé) et la page upsell est chargée |  | AreFunctionalCookiesEnabled est true (consentement accordé) et la page upsell est chargée |
| 2 | When l'user ouvre la modal, coche la checkbox et clique "Confirm" |  | L'user ouvre la modal, coche la checkbox et clique "Confirm" |
| 3 | Then POST /api/v1/upsell/hubspot est appelé directement sans ouvrir la JitBridgeModal |  | POST /api/v1/upsell/hubspot est appelé directement sans ouvrir la JitBridgeModal |

---

## E2E-UPSELL-PQL-005

**Idempotence - un seul appel HubSpot par session**

| Field | Value |
|---|---|
| Status | KEEP — rebuilt from the spec texts; needs the upsell storageState (regenerate before the run); last run failed — check the account / page in the spec phase |
| Description | Hubspot PQL feedback from the upsell page (See it in action modal). Scenario rebuilt from the test()/test.step() texts of e2e-hubspot-upsell-pql.spec.js (no archive CSV); expected results = the step texts. No newer TC changes the upsell flow (KEEP). Note: the spec TC numbers do not match the ids of GEO-R1.0/testcases-coverage-storyGEO-237.csv. Consolidates spec TC-GEO-237-008 (GEO-237). Former id: TC-GEO-237-008. |
| Priority | High |
| Stories | GEO-237 |
| Precondition | Upsell account (module not activated) with storageState-upsell.json (UPSELL_USER_EMAIL in .env); upsell page Measure |
| Labels | e2e-suite |
| QA Parent | GEO-200 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 FAIL (8 failed in the file) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given l'user a déjà cliqué "Speak to Us" et confirmé - l'événement a été envoyé |  | L'user a déjà cliqué "Speak to Us" et confirmé - l'événement a été envoyé |
| 2 | When il clique à nouveau sur un autre "Speak to Us" de la page et confirme |  | Il clique à nouveau sur un autre "Speak to Us" de la page et confirme |
| 3 | Then aucun deuxième appel POST /api/v1/upsell/hubspot n'est effectué |  | Aucun deuxième appel POST /api/v1/upsell/hubspot n'est effectué |

---

## E2E-UPSELL-PQL-006

**Erreur HubSpot non-bloquante pour l'utilisateur**

| Field | Value |
|---|---|
| Status | KEEP — rebuilt from the spec texts; needs the upsell storageState (regenerate before the run); last run failed — check the account / page in the spec phase |
| Description | Hubspot PQL feedback from the upsell page (See it in action modal). Scenario rebuilt from the test()/test.step() texts of e2e-hubspot-upsell-pql.spec.js (no archive CSV); expected results = the step texts. No newer TC changes the upsell flow (KEEP). Note: the spec TC numbers do not match the ids of GEO-R1.0/testcases-coverage-storyGEO-237.csv. Consolidates spec TC-GEO-237-010 (GEO-237). Former id: TC-GEO-237-010. |
| Priority | High |
| Stories | GEO-237 |
| Precondition | Upsell account (module not activated) with storageState-upsell.json (UPSELL_USER_EMAIL in .env); upsell page Measure |
| Labels | e2e-suite |
| QA Parent | GEO-200 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 FAIL (8 failed in the file) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given HubSpot API retourne une erreur (503) - simulée via page.route() |  | HubSpot API retourne une erreur (503) - simulée via page.route() |
| 2 | When l'user ouvre la modal, coche la checkbox et clique "Confirm" |  | L'user ouvre la modal, coche la checkbox et clique "Confirm" |
| 3 | Then le frontend reçoit 200 OK et aucune UI d'erreur n'est affichée à l'user |  | Le frontend reçoit 200 OK et aucune UI d'erreur n'est affichée à l'user |

---

## E2E-UPSELL-PQL-007

**Les 5 boutons "Speak to Us" déclenchent la même logique**

| Field | Value |
|---|---|
| Status | KEEP — rebuilt from the spec texts; needs the upsell storageState (regenerate before the run); last run failed — check the account / page in the spec phase |
| Description | Hubspot PQL feedback from the upsell page (See it in action modal). Scenario rebuilt from the test()/test.step() texts of e2e-hubspot-upsell-pql.spec.js (no archive CSV); expected results = the step texts. No newer TC changes the upsell flow (KEEP). Note: the spec TC numbers do not match the ids of GEO-R1.0/testcases-coverage-storyGEO-237.csv. Consolidates spec TC-GEO-237-011 (GEO-237). Former id: TC-GEO-237-011. |
| Priority | High |
| Stories | GEO-237 |
| Precondition | Upsell account (module not activated) with storageState-upsell.json (UPSELL_USER_EMAIL in .env); upsell page Measure |
| Labels | e2e-suite |
| QA Parent | GEO-200 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 FAIL (8 failed in the file) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given les 5 instances du bouton "Speak to Us" sont présentes sur la page upsell Measure |  | Les 5 instances du bouton "Speak to Us" sont présentes sur la page upsell Measure |
| 2 | When l'user clique sur n'importe laquelle des 5 instances |  | L'user clique sur n'importe laquelle des 5 instances |
| 3 | Then la modal SeeItInActionModal s'ouvre à chaque fois et la même logique s'applique quel que soit le bouton |  | La modal SeeItInActionModal s'ouvre à chaque fois et la même logique s'applique quel que soit le bouton |

---

## E2E-UPSELL-PQL-008

**Réponse 401 ne déclenche pas de redirection Auth0**

| Field | Value |
|---|---|
| Status | KEEP — rebuilt from the spec texts; needs the upsell storageState (regenerate before the run); last run failed — check the account / page in the spec phase |
| Description | Hubspot PQL feedback from the upsell page (See it in action modal). Scenario rebuilt from the test()/test.step() texts of e2e-hubspot-upsell-pql.spec.js (no archive CSV); expected results = the step texts. No newer TC changes the upsell flow (KEEP). Note: the spec TC numbers do not match the ids of GEO-R1.0/testcases-coverage-storyGEO-237.csv. Consolidates spec TC-GEO-237-012 (GEO-237). Former id: TC-GEO-237-012. |
| Priority | High |
| Stories | GEO-237 |
| Precondition | Upsell account (module not activated) with storageState-upsell.json (UPSELL_USER_EMAIL in .env); upsell page Measure |
| Labels | e2e-suite |
| QA Parent | GEO-200 |
| Components / QA Component | GEO / GEO Module |
| Smoke / Regression | Yes / Yes |
| UI/Functional · Test type | Functional · Automated |
| Last result | suite 30/05 FAIL (8 failed in the file) |

| # | Step | Test data | Expected result |
|---|---|---|---|
| 1 | Given POST /api/v1/upsell/hubspot retourne 401 - simulé via page.route() |  | POST /api/v1/upsell/hubspot retourne 401 - simulé via page.route() |
| 2 | When l'user ouvre la modal, coche la checkbox et clique "Confirm" |  | L'user ouvre la modal, coche la checkbox et clique "Confirm" |
| 3 | Then aucune redirection vers Auth0 n'est déclenchée et l'user reste sur la page upsell |  | Aucune redirection vers Auth0 n'est déclenchée et l'user reste sur la page upsell |

---

## Retired scenarios (no steps — kept for traceability)

| Scenario | Title | Reason |
|---|---|---|
| E2E-UPSELL-PQL-009 | Confirmation + cookies absents -> JitBridgeModal | test.skip placeholder with no executable step (needs the functional-cookie / JIT consent state or an @onclusive.com tracking check); kept in the epic suite (testcases-coverage-storyGEO-237.csv) — open point |
| E2E-UPSELL-PQL-010 | Acceptation dans JIT -> événement HubSpot envoyé | test.skip placeholder with no executable step (needs the functional-cookie / JIT consent state or an @onclusive.com tracking check); kept in the epic suite (testcases-coverage-storyGEO-237.csv) — open point |
| E2E-UPSELL-PQL-011 | Refus dans JIT -> PrivacyFallbackModal - aucun appel | test.skip placeholder with no executable step (needs the functional-cookie / JIT consent state or an @onclusive.com tracking check); kept in the epic suite (testcases-coverage-storyGEO-237.csv) — open point |
| E2E-UPSELL-PQL-012 | Utilisateur @onclusive.com exclu du tracking HubSpot | test.skip placeholder with no executable step (needs the functional-cookie / JIT consent state or an @onclusive.com tracking check); kept in the epic suite (testcases-coverage-storyGEO-237.csv) — open point |
