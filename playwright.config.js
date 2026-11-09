// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

// RUN_ID drives the reporter output path so each run writes its own results file.
// - EPIC_ID=102            → test-results-epic102-raw.json
// - SPEC_NAME=create-default-analysis → test-results-create-default-analysis-raw.json
// - neither set            → test-results-unknown-raw.json
const EPIC_ID = process.env.EPIC_ID || 'unknown';
const RUN_ID  = process.env.EPIC_ID
  ? `epic${process.env.EPIC_ID}`
  : (process.env.SPEC_NAME || 'unknown');

// HEADLESS=true overrides the default headed mode.
const headless = process.env.HEADLESS === 'true';

// USE_AUTH=true — authenticate via Auth0 before the run and reuse the session.
// Runs global-setup.js once (login + storageState save), then each test context
// is pre-authenticated. Currently scoped to epic99 by convention:
//   EPIC_ID=99 USE_AUTH=true npx playwright test .claude/Data/raw/playwright/test-suite-epic99.spec.js
// Credentials: GEO_USER_EMAIL + GEO_USER_PASSWORD in .env (copy from .env.example)
const useAuth = process.env.USE_AUTH === 'true';
const STORAGE_STATE = path.resolve(__dirname,
  process.env.SPEC_NAME === 'hubspot-upsell-pql'
    ? '.claude/Data/processed/auth/storageState-upsell.json'
    : '.claude/Data/processed/auth/storageState.json');

module.exports = defineConfig({
  testDir: './.claude/Data/raw/playwright',
  // outputDir = where Playwright stores per-test artifacts (error-context.md,
  // .last-run.json, plus traces/videos/screenshots if enabled in `use`).
  // Default would be ./test-results/ at the project root — we move it here
  // to keep the project root clean and group all Playwright raw output.
  outputDir: './.claude/Data/raw/playwright/artifacts',
  // globalSetup runs once before all tests — performs Auth0 login when USE_AUTH=true.
  globalSetup: useAuth ? './.claude/Data/raw/playwright/global-setup.js' : undefined,
  // 240s — covers the wizard's Step 2 → Step 3 transition (categories discovery
  // + question generation can take 90-120s on staging). Individual long-running
  // E2E tests can still bump higher via test.setTimeout().
  timeout: 240000,
  expect: {
    // 20s default for assertions — gives slow-rendering elements time to appear
    timeout: 20000,
    toHaveScreenshot: {
      // Tolerance for visual snapshots — allows minor anti-aliasing differences
      maxDiffPixels: 50,
      // Disable CSS animations before capturing to avoid flaky diffs
      animations: 'disabled',
    },
  },
  // Visual snapshots stored alongside the spec file (committed to git as baseline)
  snapshotDir: './.claude/Data/raw/playwright/visual-snapshots',
  // fullyParallel: true — tests within the same spec file run in parallel across workers.
  // Each test() gets its own browser context (isolated page + storageState), so parallel
  // execution is safe as long as tests don't share mutable state via test fixtures.
  // Epic specs (117+ TCs per file) benefit most: 3 workers → ~3× faster runs.
  // If a specific spec requires sequential ordering, add:
  //   test.describe.configure({ mode: 'serial' }) at the top of that file.
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: 3,
  reporter: [
    ['json', { outputFile: `.claude/Data/raw/playwright/test-results-${RUN_ID}-raw.json` }],
    // No HTML reporter: our custom report (build-multi-epic-report.js) covers
    // both stakeholder + debug needs. The raw JSON above is the only artifact
    // our pipeline parses. List reporter for terminal feedback during runs.
    ['list']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000/geo',
    headless,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30000,
    navigationTimeout: 45000,
    screenshot: 'off',
    video: 'off',
    trace: 'off',
    // Inject saved session into every test context when USE_AUTH=true.
    // storageState is written by global-setup.js (cookies + localStorage).
    storageState: useAuth ? STORAGE_STATE : undefined,
  },
  projects: [
    {
      // Default project — runs any spec passed explicitly on the CLI.
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // All-epics suite — regroupe les 12 specs epic (test-suite-epicXX).
      // Lancement : SPEC_NAME=all-epics USE_AUTH=true BASE_URL=https://... npx playwright test --project=all-epics --workers=4
      name: 'all-epics',
      use: { ...devices['Desktop Chrome'] },
      testMatch: [
        '**/test-suite-epic99.spec.js',
        '**/test-suite-epic100.spec.js',
        '**/test-suite-epic101.spec.js',
        '**/test-suite-epic102.spec.js',
        '**/test-suite-epic103.spec.js',
        '**/test-suite-epic104.spec.js',
        '**/test-suite-epic105.spec.js',
        '**/test-suite-epic174.spec.js',
        '**/test-suite-epic200.spec.js',
        '**/test-suite-epic257.spec.js',
        '**/test-suite-epic263.spec.js',
        '**/test-suite-epicGEO-397.spec.js',
      ],
    },
    {
      // E2E suite — regroupe les 12 specs E2E (création + vérification +analyse).
      // Lancement : SPEC_NAME=e2e-suite USE_AUTH=true npx playwright test --project=e2e-suite
      // Chaque spec reste lançable indépendamment via le project 'chromium'.
      name: 'e2e-suite',
      use: { ...devices['Desktop Chrome'] },
      testMatch: [
        '**/e2e-geo-analytics-dashboard.spec.js',
        // '**/e2e-create-default-analysis.spec.js',
        '**/e2e-dashboard-overview.spec.js',
        '**/e2e-verify-analysis.spec.js',
        '**/e2e-category-questions-table.spec.js',
        '**/e2e-category-question-analysis.spec.js',
        '**/e2e-category-kpi-cards.spec.js',
        '**/e2e-category-brand-prioritization.spec.js',
        '**/e2e-category-brand-rankings.spec.js',
        '**/e2e-category-top-concept.spec.js',
        '**/e2e-category-perception-citation.spec.js',
        '**/e2e-manage-scope.spec.js',
        '**/e2e-hubspot-upsell-pql.spec.js',
        '**/e2e-brand-SOV.spec.js',
        '**/e2e-category-SOV.spec.js',
        '**/e2e-category-question-visibility.spec.js',
        '**/e2e-category-question-competitive.spec.js',
        '**/e2e-category-question-perception.spec.js',
      ],
    },
  ],
});
