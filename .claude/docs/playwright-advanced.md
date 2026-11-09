# Playwright — Patterns avancés

## Visual Testing (opt-in)

- Activé via `VISUAL_TESTING=true` — désactivé par défaut
- Baselines : `.claude/Data/raw/playwright/visual-snapshots/` — **commiter les PNG**
- Nommage : `{TC_ID}-{description}-chromium-win32.png`
- `playwright.config.js` : `toHaveScreenshot.maxDiffPixels: 50` + `animations: "disabled"`

```bash
# Générer la baseline
SPEC_NAME={spec} USE_AUTH=true VISUAL_TESTING=true npx playwright test {spec}.spec.js --update-snapshots
# Run de vérification
SPEC_NAME={spec} USE_AUTH=true VISUAL_TESTING=true npx playwright test {spec}.spec.js
```
- Assertions visuelles APRÈS assertions fonctionnelles — ne les remplacent pas
- Tolérance full-page : `maxDiffPixels: 150, fullPage: false`

## Specs SOV multilingues

```bash
SPEC_NAME=e2e-brand-SOV USE_AUTH=true LOCALE=fr BASE_URL=https://staging-geo.onclusive.com/geo npx playwright test e2e-brand-SOV.spec.js --project=chromium --workers=2
```

- `gotoPage()` staging : `waitUntil: "load"` — networkidle ne se déclenche jamais sur staging
- `sovHeading` : `I18N.dashboard.kpi.shareOfVoice` (FR → "Part de voix", ES → "Cuota de voz")
- `sovSubtitle` : hardcodé dans l'app — mapping dans le spec (fr/es/en-us/en-gb)
- Découvrir le texte d'une nouvelle locale : lire `error-context.md` après run échoué
- `build-e2e-suite-report.js` : SC14 = e2e-brand-SOV, SC15 = e2e-category-SOV

## Manipulation de cookies via page.evaluate()

Toujours naviguer vers l'URL cible AVANT `page.evaluate()` pour `document.cookie` :
```js
if (!page.url().includes('staging-geo.onclusive.com')) {
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1000);
}
await page.evaluate(() => {
  document.cookie = `cc_cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
});
```

## Specs avec deux sessions storageState

Régénérer `storageState-upsell.json` avant chaque run epic200 :
```bash
SPEC_NAME=hubspot-upsell-pql USE_AUTH=true npx playwright test hubspot-upsell-pql.spec.js --grep="DOES_NOT_EXIST"
```
Ce dummy run déclenche le global-setup upsell sans exécuter de test.

## Exécution multi-epics séquentielle

Ne jamais allouer plusieurs workers par epic en parallèle (44 Chromium → timeout).
```bash
# Correct — 4 workers pour toute la suite
SPEC_NAME=e2e-suite USE_AUTH=true npx playwright test --project=e2e-suite --workers=4
# Rerun individuel : --workers=2 maximum
```