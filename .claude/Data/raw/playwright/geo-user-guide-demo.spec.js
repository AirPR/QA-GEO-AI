/**
 * GEO Analytics — User Guide Video Recording
 * Covers all 12 sections of GEO-User-Guide.docx
 * Interface language: French | Environment: Staging
 *
 * Run with:
 *   node .claude/Data/raw/playwright/geo-user-guide-demo.spec.js
 *
 * Output video: .claude/Data/output/video/geo-user-guide-demo/
 */

const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Credentials come from .env (run with plain node, so the file is parsed here)
const dotenvPath = path.resolve(__dirname, '../../../../.env');
if (fs.existsSync(dotenvPath)) {
  for (const line of fs.readFileSync(dotenvPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !(key in process.env)) process.env[key] = val;
  }
}

const BASE_URL  = 'https://staging-geo.onclusive.com/geo';
const EMAIL     = process.env.GEO_USER_EMAIL;
const PASSWORD  = process.env.GEO_USER_PASSWORD;
const DASHBOARD = '439acd96-0b1b-4da4-9e07-612d38e9783e';
const CATEGORY  = '21a79173-c455-4e49-bf69-307dc2dba7e4';
const VIDEO_DIR = path.resolve(__dirname, '../../output/video/geo-user-guide-demo');

// ─── Helpers ───────────────────────────────────────────────────────────────

const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function showOverlay(page, title, subtitle = '') {
  await page.evaluate(({ t, s }) => {
    const existing = document.getElementById('__geo_overlay__');
    if (existing) existing.remove();
    const div = document.createElement('div');
    div.id = '__geo_overlay__';
    div.style.cssText = [
      'position:fixed', 'top:16px', 'left:16px', 'z-index:99999',
      'background:rgba(30,41,59,0.92)', 'color:#fff',
      'font-family:system-ui,sans-serif', 'padding:10px 18px',
      'border-radius:8px', 'border-left:4px solid #3b82f6',
      'pointer-events:none', 'max-width:460px', 'box-shadow:0 4px 16px rgba(0,0,0,0.3)'
    ].join(';');
    div.innerHTML = `<div style="font-size:13px;font-weight:700">${t}</div>${s ? `<div style="font-size:11px;opacity:0.72;margin-top:3px">${s}</div>` : ''}`;
    document.body.appendChild(div);
  }, { t: title, s: subtitle });
}

async function hideOverlay(page) {
  await page.evaluate(() => { document.getElementById('__geo_overlay__')?.remove(); });
}

async function scrollTo(page, selector) {
  try {
    await page.locator(selector).first().scrollIntoViewIfNeeded({ timeout: 3000 });
    await wait(600);
  } catch (_) {}
}

async function safeClick(page, selector, timeout = 5000) {
  try {
    await page.locator(selector).first().click({ timeout });
  } catch (e) {
    console.log(`safeClick skipped: ${selector.substring(0, 70)}`);
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────

(async () => {
  fs.mkdirSync(VIDEO_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: false, slowMo: 60 });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: VIDEO_DIR, size: { width: 1440, height: 900 } },
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
  });
  const page = await context.newPage();

  try {

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 2 — Connexion
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '2. Acces et connexion', 'Redirection automatique vers la page Auth0');
    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 30000 });
    await wait(2500);

    await showOverlay(page, '2.1 Connexion SSO via Auth0', 'Saisie des identifiants Onclusive — session conservee a la prochaine visite');
    await wait(1500);

    try {
      const emailInput = page.locator('input[name="username"], input[type="email"], #username').first();
      await emailInput.waitFor({ timeout: 8000 });
      await emailInput.fill(EMAIL);
      await wait(700);
      await safeClick(page, 'button[type="submit"], button:has-text("Continue"), button:has-text("Continuer")', 4000);
      await wait(1000);
      const pwdInput = page.locator('input[type="password"]').first();
      await pwdInput.waitFor({ timeout: 5000 });
      await pwdInput.fill(PASSWORD);
      await wait(700);
      await page.locator('button[type="submit"]').first().click({ timeout: 5000 });
      await wait(3000);
    } catch (e) {
      console.log('Login variant:', e.message.substring(0, 80));
    }

    await page.waitForURL('**/geo/**', { timeout: 20000 }).catch(() => {});
    await wait(2000);

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 2.3 — Liste des rapports
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '2.3 Liste des rapports', 'Nom, statut (En cours / Complete), date de creation et derniere analyse');
    await wait(4000);

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 3 — Wizard : creation d'une analyse
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '3. Creation d\'une analyse — l\'assistant (Wizard)', 'Clic sur "Nouvelle analyse" — barre de progression + en-tete persistant');
    await wait(1500);
    await safeClick(page, '[data-testid="reports-view-create-btn"]', 6000);
    await wait(2500);

    // Etape 1 — Marque et pays
    await showOverlay(page, '3.1 Etape 1 — Marque et pays', 'Auto-complete Brandfetch : nom, logo, metadata. Marches : au moins 1 requis');
    await wait(1500);
    try {
      const brandInput = page.locator('[data-testid="wizard-brand-search-input"]').first();
      await brandInput.click({ timeout: 4000 });
      await brandInput.type('Renault', { delay: 120 });
      await wait(2000);
      await page.locator('[role="option"]:has-text("Renault"), li:has-text("Renault")').first().click({ timeout: 3000 });
      await wait(1000);
    } catch (_) {}
    await wait(2000);

    await showOverlay(page, '3.1 Marches et langue des insights IA', 'Un marche = pays + langue. La langue des insights IA est choisie explicitement.');
    await scrollTo(page, '[data-testid="wizard-insights-language-trigger-btn"]');
    await wait(3000);

    await safeClick(page, '[data-testid="wizard-next-btn"]', 5000);
    await wait(3000);

    // Etape 2 — Decouverte des categories
    await showOverlay(page, '3.2 Etape 2 — Decouverte des categories par IA', 'Badge "AI GENERATED" — "+ Ajouter une categorie" pour ajout manuel');
    await wait(4000);
    await safeClick(page, '[data-testid="wizard-next-btn"]', 5000);
    await wait(3000);

    // Etape 3 — Revision des questions
    await showOverlay(page, '3.3 Etape 3 — Questions (Prompts)', 'Par marche (onglets) et par type : Sentiment / Visibilite / Competitif');
    await wait(2000);
    await showOverlay(page, '3.3 Edition en ligne', 'Survol -> icone crayon (edit) + corbeille (delete). Quotas par type de question.');
    await wait(4000);
    await safeClick(page, '[data-testid="wizard-next-btn"]', 5000);
    await wait(3000);

    // Etape 4 — Revue et lancement
    await showOverlay(page, '3.4 Etape 4 — Revue et lancement', 'Selection des moteurs IA : Gemini + ChatGPT actifs par defaut');
    await wait(2000);
    await showOverlay(page, '3.4 Moteurs IA disponibles', 'Gemini, ChatGPT, Claude, Grok, Perplexity — au moins 1 actif requis');
    await wait(4000);

    // Annuler
    await showOverlay(page, 'Abandonner — retour a la liste des rapports', 'Quitter l\'assistant : dialog de confirmation si modifications non sauvegardees');
    await safeClick(page, '[data-testid="wizard-back-btn"]', 4000);
    await wait(2000);
    // Confirmer si dialog apparait
    await safeClick(page, 'button:has-text("Discard"), button:has-text("Quitter"), button:has-text("Oui"), button:has-text("Abandon")', 3000);
    await wait(2000);

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 4 — Suivi de l'execution
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '4. Suivi de l\'execution de l\'analyse', 'Pipeline resilient : chaque moteur IA interroge en parallele — statut temps reel');
    await page.goto(`${BASE_URL}/dashboard/${DASHBOARD}`, { waitUntil: 'load', timeout: 20000 });
    await wait(3500);

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 5 — Overview
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '5. Tableau de bord — Vue d\'ensemble (Overview)', 'En-tete : fleche retour, marque + logo, date de generation, badges moteurs actifs');
    await wait(3500);

    await showOverlay(page, '5.1 Navigation et sidebar', 'Sidebar : Vue d\'ensemble, accordeon Categories, acces Gerer le perimetre');
    await wait(3000);

    // Filtres
    await showOverlay(page, '5.2 Filtre pays', 'Master (tous pays) ou pays specifique — rescope toutes les metriques et graphiques');
    await safeClick(page, '[data-testid="market-dropdown-trigger"]', 4000);
    await wait(2500);
    await page.keyboard.press('Escape');
    await wait(500);

    await showOverlay(page, '5.2 Filtre moteurs LLM', 'Tous les moteurs actifs par defaut — au moins 1 requis');
    await safeClick(page, '[data-testid="llm-dropdown-trigger"]', 4000);
    await wait(2500);
    await page.keyboard.press('Escape');
    await wait(500);

    // KPI cards
    await showOverlay(page, '5.3 Les 4 KPI cards', 'Visibilite % | Position moy. | Choix IA (Win Rate) | Sentiment');
    await scrollTo(page, '[data-testid="kpi-card-visibility"]');
    await wait(4000);

    // Trend graph
    await showOverlay(page, '5.3 Evolution dans le temps', 'Graphique de tendance par metrique (Part de voix, Visibilite, Position, Choix IA, Sentiment)');
    await scrollTo(page, '[data-testid="trend-graph-overview"]');
    await wait(3500);

    // Matrice
    await showOverlay(page, '5.4 Matrice de priorisation des categories', 'X = Visibilite % | Y = Win Rate % — 4 quadrants : Forces / Opportunites / Defis / Surveillance');
    await scrollTo(page, 'svg');
    await wait(4000);

    // Rankings
    await showOverlay(page, '5.5 Classement des marques (Brand Rankings)', 'Toutes les marques citees — tri Visibilite desc. Ligne expandable : detail par moteur.');
    await scrollTo(page, '[data-testid="dashboard-rankings-table"]');
    await wait(4000);

    // Top concepts
    await showOverlay(page, '5.6 Top Concepts (themes associes a la marque)', 'Concept, repartition sentiment, frequence, badges moteurs. Sources cliquables.');
    await scrollTo(page, '[data-testid="top-concepts-card"]');
    await wait(3500);

    await showOverlay(page, '5.6 Sources imbriquees par concept', 'Clic sur un theme -> panneau lateral avec les sources associees (titre, URL, editeur)');
    await safeClick(page, '[data-testid="top-concept-item-0"] button', 4000);
    await wait(4000);

    // Citation sources
    await showOverlay(page, '5.7 Sources de citation des moteurs IA', 'Graphique par type (Journalisme, Entreprise...) + tableau domaines avec favorabilite');
    await scrollTo(page, '[data-testid="citation-sources-card"]');
    await wait(4000);

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 9 — Identite de marque (Overview > onglet Identity)
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '9. Identite de marque et reputation corporate', 'Onglet Identity sur le tableau de bord — au-dela des metriques brutes');
    await safeClick(page, '[data-testid="dashboard-section-tab-identity"]', 5000);
    await wait(3000);

    await showOverlay(page, '9.1 In-Brief', '3 bullets IA : personnalite, positionnement et reputation de la marque');
    await scrollTo(page, '[data-testid="views-overview-title"]');
    await wait(3500);

    await showOverlay(page, '9.2 Cartes de reputation corporate (4 dimensions)', 'Brand Image | Employer Brand | ESG/Sustainability | Leadership — badge Positive/Mixed/Negative');
    await scrollTo(page, 'text=Brand Image');
    await wait(4000);

    await showOverlay(page, '9.3 Panneau de detail par dimension', '6 onglets : All + 1 par moteur — reponse brute et sources associees');
    // Click first reputation card
    try {
      const card = page.locator('text=Brand Image').first();
      await card.click({ timeout: 4000 });
      await wait(3000);
      await page.keyboard.press('Escape');
      await wait(500);
    } catch (_) {}

    await showOverlay(page, '9.4 Brand Territory Chart', 'Graphe de bulles des themes : taille = frequence. Survol pour detail, clic pour contexte IA.');
    await scrollTo(page, 'h2:has-text("Brand Territory"), h3:has-text("Brand Territory")');
    await wait(4000);

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 6 — Vues Categorie
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '6. Vues Categorie — Voitures hybrides', 'Clic sur une categorie dans la sidebar — 3 onglets : Identite | Performance | Sources');
    await page.goto(`${BASE_URL}/dashboard/${DASHBOARD}/category/${CATEGORY}`, { waitUntil: 'load', timeout: 20000 });
    await wait(3000);

    await showOverlay(page, '6.1 KPIs et resume de la categorie', 'Memes KPIs scopes a la categorie — resume IA specifique a ce contexte');
    await scrollTo(page, '[data-testid="kpi-card-visibility"]');
    await wait(3500);

    await showOverlay(page, '6. Onglet Performance', 'Matrice Visibilite x Win Rate des marques concurrentes dans cette categorie');
    await safeClick(page, '[data-testid="dashboard-section-tab-performance"]', 5000);
    await wait(2500);
    await scrollTo(page, 'svg');
    await wait(3000);

    await showOverlay(page, '6.2 Classement marques par categorie', 'Detail par moteur sur expansion de chaque ligne');
    await scrollTo(page, '[data-testid="dashboard-rankings-table"]');
    await wait(3500);

    await showOverlay(page, '6.3 Tableau des questions', 'Toutes les questions posees aux IA : Visibilite | Perception | Competitif');
    await scrollTo(page, 'table');
    await wait(3000);

    await showOverlay(page, '6.3 Statuts des reponses', 'Favorable (vert, rang 1-3) | Unfavorable (orange, rang 4-10) | Unranked (rouge)');
    await wait(4000);

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 7 — Manage Scope
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '7. Gerer le perimetre (Manage Scope)', 'Modifier une analyse sans la recreer : marches, categories, moteurs, prompts');
    await page.goto(`${BASE_URL}/dashboard/${DASHBOARD}/manage-scope`, { waitUntil: 'load', timeout: 20000 });
    await wait(3000);

    await showOverlay(page, '7.1 Pays et marches', 'Badge Primary — "+ Ajouter un pays" consomme un quota de marche. Dernier restant protege.');
    await wait(3500);

    await showOverlay(page, '7.1 Categories', '"+ Ajouter un sujet" — dernier restant : impossible a supprimer');
    await scrollTo(page, 'text=Categories, text=Catégories');
    await wait(3500);

    await showOverlay(page, '7.3 Configuration des moteurs LLM', 'Toggle ON/OFF + checkbox "web search" — sauvegarde immediate, pas de bouton Save');
    await scrollTo(page, 'text=AI Engines, text=Moteurs IA');
    await wait(3500);

    await showOverlay(page, '7.4 Prompts', 'Ajouter, modifier, supprimer les questions — historique des actions disponible');
    await scrollTo(page, 'text=Prompts, text=Questions');
    await wait(3500);

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 8 — Snapshots
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '8. Snapshots et navigation historique', 'Chaque execution complete cree un snapshot immuable — retention 12+ mois');
    await page.goto(`${BASE_URL}/dashboard/${DASHBOARD}`, { waitUntil: 'load', timeout: 20000 });
    await wait(2500);

    await showOverlay(page, '8.2 Navigateur de snapshots — plage de dates', 'Selectionner une periode -> tout le tableau de bord reflete les donnees figees');
    await safeClick(page, '[data-testid="date-range-picker-trigger"]', 4000);
    await wait(3500);
    await page.keyboard.press('Escape');
    await wait(1000);

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 10 — Export
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '10. Export et partage des rapports', 'Bouton Export -> Excel / PowerPoint / PDF — traitement en arriere-plan, lien par e-mail');
    await safeClick(page, '[data-testid="dashboard-export-trigger-btn"]', 5000);
    await wait(3500);

    await showOverlay(page, '10.1 Excel', 'Onglet Overview + 1 onglet/categorie + donnees brutes (1 ligne par question x moteur)');
    await wait(2000);
    await showOverlay(page, '10.2 PowerPoint', 'Deck Onclusive : resume executif, metriques, slides par categorie, recommandations');
    await wait(2000);
    await showOverlay(page, '10.3 PDF', 'Document fixe imprimable — vue filtree avec graphiques rendus');
    await wait(2500);
    await page.keyboard.press('Escape');
    await wait(1000);

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 12 — Multi-langue (dans le Wizard)
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, '12. Support multilingue', 'Interface disponible en : EN (US/UK), Francais, Espanol — choix conserve');
    await wait(2000);

    await showOverlay(page, '12.2 Langue des insights IA', 'Choisie a l\'etape 1 du wizard — independante de la langue de l\'interface');
    // Navigate to wizard step 1 to show the language selector
    await safeClick(page, '[data-testid="reports-view-create-btn"]', 4000);
    await wait(2000);
    await scrollTo(page, '[data-testid="wizard-insights-language-trigger-btn"]');
    await safeClick(page, '[data-testid="wizard-insights-language-trigger-btn"]', 4000);
    await wait(3000);
    await page.keyboard.press('Escape');
    await wait(500);
    // Leave wizard
    await safeClick(page, '[data-testid="wizard-back-btn"]', 4000);
    await wait(1500);

    // ═══════════════════════════════════════════════════════════════════════
    // Fin
    // ═══════════════════════════════════════════════════════════════════════

    await showOverlay(page, 'GEO Analytics — Guide utilisateur complet', 'Onclusive | Generative Engine Optimization');
    await page.goto(`${BASE_URL}/dashboard/${DASHBOARD}`, { waitUntil: 'load', timeout: 20000 });
    await wait(5000);
    await hideOverlay(page);
    await wait(2000);

  } catch (err) {
    console.error('Erreur script:', err.message);
  } finally {
    await context.close();
    await browser.close();
    console.log(`\nVideo enregistree dans : ${VIDEO_DIR}`);
    console.log('Format : .webm — lecture avec VLC, Chrome ou Firefox');
  }
})();
