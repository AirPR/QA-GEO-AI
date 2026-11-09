# GEO-1514: Say country everywhere instead of market (web app and exports)

**Task ID:** GEO-1514
**Issue Type:** Task
**Title:** Say country everywhere instead of market (web app and exports)
**Status:** ⏳ Ready for QA
**Assigned to:** Youssef.AitLaydi
**Reporter:** Quentin.Reant (PO)
**Priority:** Low
**Fix version:** 1.3
**Epic:** none yet (to be set by the PO / dev, see README.md)
**Created:** 2026-10-21
**Updated:** 2026-10-27
**Jira link:** https://onclusive.atlassian.net/browse/GEO-1514

## Description (Jira, 2026-10-28)

We say country everywhere in GEO, never market (decision of 2026-10-21). It is the same word as the wizard step "Brand & Country" and the prompt table column "Country" that are already in production.

Production still says market in 21 web texts and 8 export texts, listed below with the new text. Only the values change, the keys stay as they are and the `market` variables are not touched. en-GB is the same as en-US except where noted.

The 5 discovery and switch texts (wizard.discovering.subtitle, duration, subtitleTopic, durationTopic and wizard.analysisType.switchBody) are already in my GEO-1209 comment, and wizard.step1.marketsHint and wizard.category.infoBody are rewritten in GEO-1507 (UAT copy fixes, already with country), so they are not repeated here.

A country can be added twice with two languages (the market key is language + country, eg fr-CA and en-CA), so country alone is not enough in a few places:
- category translations are stored per country and language (one field for en-US and one for en-GB), so these texts say "for each country and language"
- the duplicate prompt check compares the language too, so the message names it
Names already show the language when needed (Review rows "Canada · French", Manage Scope "Canada (FR)") and the counts count rows, so they keep "country".

### Web app: frontend/src/i18n/locales/*.json (21 keys)

||Key||EN (en-US, en-GB)||fr-FR||es-ES||
|wizard.category.noResultsHint|Add your own categories; each one is translated for every country and language.|Ajoutez vos propres catégories ; chacune est traduite pour chaque pays et chaque langue.|Añada sus propias categorías; cada una se traduce para cada país e idioma.|
|wizard.category.translateFailed|We could not translate some categories for your new countries or languages. Check their translations.|Nous n'avons pas pu traduire certaines catégories pour vos nouveaux pays ou langues. Vérifiez leurs traductions.|No hemos podido traducir algunas categorías para sus nuevos países o idiomas. Revise sus traducciones.|
|wizard.promptTable.colMarket|Country|Pays|País|
|wizard.promptTable.duplicatePrompt|This prompt already exists for this country, language, category and type.|Ce prompt existe déjà pour ce pays, cette langue, cette catégorie et ce type.|Este prompt ya existe para este país, este idioma, esta categoría y este tipo.|
|wizard.promptTable.noResultsMarket|country `values`|le pays `values`|el país `values`|
|wizard.review.marketsTitle|Countries|Pays|Países|
|wizard.review.dropped.markets_one|`count` country will be dropped: `names`.|`count` pays sera exclu : `names`.|Se excluirá `count` país: `names`.|
|wizard.review.dropped.markets_other|`count` countries will be dropped: `names`.|`count` pays seront exclus : `names`.|Se excluirán `count` países: `names`.|
|wizard.analysisCreated.markets_one|`count` country|`count` pays|`count` país|
|wizard.analysisCreated.markets_other|`count` countries|`count` pays|`count` países|
|wizard.categoryModal.subtitle|Translated for each country and language by AI Sense|Traduite pour chaque pays et chaque langue par AI Sense|Traducida para cada país e idioma por AI Sense|
|wizard.categoryModal.translationsHint|AI Sense translates the category for each country and language. Use the edit icon to adjust any translation.|AI Sense traduit la catégorie pour chaque pays et chaque langue. Utilisez l'icône de modification pour ajuster une traduction.|AI Sense traduce la categoría para cada país e idioma. Use el icono de edición para ajustar cualquier traducción.|
|wizard.deleteCategory.impact_one|`count` prompt across your countries will be deleted with it.|`count` prompt de vos pays sera supprimé avec elle.|`count` prompt de sus países se eliminará con ella.|
|wizard.deleteCategory.impact_other|`count` prompts across your countries will be deleted with it.|`count` prompts de vos pays seront supprimés avec elle.|`count` prompts de sus países se eliminarán con ella.|
|views.manageScope.prompts.subtitle|Add, edit and remove the prompts asked to the AI engines — per country. No need to recreate the analysis.|Ajoutez, modifiez et supprimez les prompts adressés aux moteurs d'IA — par pays. Pas besoin de recréer l'analyse.|Añada, edite y elimine los prompts enviados a los motores de IA, por país. No es necesario recrear el análisis.|
|views.manageScope.prompts.stopWarning.groupInCategory|(unchanged)|C'est le dernier prompt de type `type` de la catégorie `category` pour le pays `market`.|Es el último prompt de tipo `type` de la categoría `category` en el país `market`.|
|views.manageScope.prompts.stopWarning.groupInMarket|(unchanged)|C'est le dernier prompt de type `type` pour le pays `market`.|Es el último prompt de tipo `type` en el país `market`.|
|views.upsell.showcase1Bullet2|Track brand presence in any country and language|Suivez la présence de votre marque dans tout pays et toute langue|Realice un seguimiento de la presencia de su marca en cualquier país e idioma|
|views.upsell.marketLabel|Country|Pays|País|
|views.upsell.result.prompts.colMarket|Country|Pays|País|
|views.upsell.result.taste.desc|The full GEO Analytics platform tracks every country, category and competitor across all major AI engines — with sources, sentiment and an action plan. See it on your real data.|La plateforme GEO Analytics complète suit chaque pays, catégorie et concurrent sur tous les principaux moteurs IA — avec les sources, le sentiment et un plan d'action. Voyez-la avec vos vraies données.|La plataforma GEO Analytics completa rastrea cada país, categoría y competidor en todos los principales motores de IA — con fuentes, sentimiento y un plan de acción. Véala con sus datos reales.|

### Exports: backend ExportI18n.java (8 keys)

||Key||EN (en-US, en-GB)||fr-FR||es-ES||
|cover.markets|COUNTRIES|PAYS|PAÍSES|
|cover.allMarkets|All Countries|(unchanged, already Tous les pays)|(unchanged, already Todos los países)|
|slide.matrix.sub|Visibility vs LLM choice, by category and country|Visibilité vs choix LLM, par catégorie et pays|Visibilidad vs elección LLM, por categoría y país|
|xlsx.brandPillars.subtitle|From BRAND_IMAGE questions, consolidated per dimension per engine (all countries).|Questions BRAND_IMAGE, consolidées par dimension et moteur (tous les pays).|Preguntas BRAND_IMAGE, consolidadas por dimensión y motor (todos los países).|
|xlsx.categoryPrioritization|Category Prioritization (per category × country)|Priorisation des catégories (par catégorie × pays)|Priorización de categorías (por categoría × país)|
|col.market|Country|Pays|País|
|slide.timeEvolution.bandSub|All countries combined, plus one line per country  ·  {0}|Tous les pays combinés, plus une ligne par pays  ·  {0}|Todos los países combinados, más una línea por país  ·  {0}|
|xlsx.te.markets|Countries: {0}|Pays : {0}|Países: {0}|

## Dependencies / links

- Relates: GEO-1209 EPIC-046: Unbranded Analysis and Other Prompts
- Relates: GEO-1507 [Wizard] Copy fixes from UAT: market language, categories info box, unticked prompts

## Comments

- 2026-10-27 Quentin.Reant: @dev  to not forget

## Definition of Done

- [ ] All acceptance criteria verified
- [ ] Test cases written and executed
- [ ] No open blocking bug
- [ ] Ticket moved to Done

## Links

- Parent Epic: none yet
- Jira: https://onclusive.atlassian.net/browse/GEO-1514
- Test cases: .claude/Data/output/csv/GEO-R1.3/testcases-coverage-storyGEO-1514.csv (+ -review.md)
