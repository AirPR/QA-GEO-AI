# Story: Upsell page content refresh — align with Figma V2

**Story ID:** GEO-427
**Titre:** Upsell page content refresh — align with Figma V2 (5->3 showcases, new features)
**Statut:** ✅ Done
**Assigne a:** Youssef.AitLaydi
**Epic:** GEO-200 (Cookie Consent for Hubspot/PQL)
**Creee le:** 2026-05-12
**Lien Jira:** https://onclusive.atlassian.net/browse/GEO-427

## Context

La page Upsell `/geo/upsell` actuelle (livree avec l'epic 1 puis enrichie) ne reflete plus le design Figma actuel. Constate lors de l'implementation de GEO-237 (HubSpot upsell tracking) — la plomberie HubSpot a ete livree sur la version existante du contenu pour ne pas melanger les scopes.

**Figma source de verite:** [Layout — Navigation, node 14083:11425](https://www.figma.com/design/msZlgB0O4kKPc3jlwegBKx/Layout---Navigation?node-id=14083-11425&m=dev)

## Gaps Identified (Figma vs Current Implementation)

| Block | Figma (target) | Current (to rework) |
|-------|---------------|---------------------|
| Hero title | "Your AI Search Intelligence" | "AI Search Analytics" |
| Hero description | "Monitor how your brand appears in AI-generated search results and connect it to your media strategy" | Old long copy |
| Intro paragraph | "Your audiences are already gathering information..." | Different |
| 4 features | Unified AI Monitoring / Actionable Intelligence / Competitive Advantage / Early Warning System | Visibility & Rankings / Priority Source Targets / AI Perception Analysis / Multi-Market Intelligence |
| Demo CTA | "Don't let AI search happen to your brand..." | "Stop guessing how AI sees your brand..." |
| Showcases | **3**: Multi-Engine AI Monitoring / Earned Media to AI Connection / Competitive Intelligence | **5**: Overview Dashboard / Actions Center / Category Deep Dives / Brand Identity / Daily Auto-Refresh |

## Acceptance Criteria

### AC1 — Hero
**Given** un utilisateur arrive sur `/geo/upsell`
**When** la page est rendue
**Then** le titre `h1` affiche exactement `Your AI Search Intelligence`
**And** le badge sous le titre affiche `Upgrade now to unlock access to this product` (inchange)
**And** la description sous le badge affiche exactement `Monitor how your brand appears in AI-generated search results and connect it to your media strategy`
**And** un bouton primaire "Speak to Us" est visible dans le hero

### AC2 — Paragraphe intro (extraction i18n)
**Given** la page Upsell est rendue
**When** la section "Intro + Features grid" s'affiche
**Then** le paragraphe d'intro affiche exactement la copie Figma node `14083:11459`:
> _Your audiences are already gathering information about your brand from AI-generated search results. Onclusive GEO Analytics gives you visibility into what ChatGPT, Gemini, Grok, Claude, and Perplexity are telling them, so you can spot gaps and inaccuracies before your stakeholders do._
**And** cette copie est extraite en cle i18n (`views.upsell.introText`) — plus de string hardcodee dans `UpsellPage.tsx`

### AC3 — Bloc features (4 cards alignees Figma)
**Given** la page Upsell est rendue
**When** la grille de 4 features s'affiche
**Then** les 4 cards apparaissent dans l'ordre exact:
- `Unified AI Monitoring` — icone `visibility.svg` (size 42x42, fond `bg-[#f3e8ff]`) — _Track brand presence across 5 AI engines alongside your earned media, social, and analytics in one platform_
- `Actionable Intelligence` — icone `my_location.svg` (reutilisee, fond `bg-[#cffafe]`) — _Priority Source Targets tell you exactly which publications and domains to pitch for maximum AI visibility impact_
- `Competitive Advantage` — icone `crown.svg` (size 42x42, fond `bg-[#fef9c3]`) — _Understand how competitors are positioned in AI search results and identify opportunities to close the gap_
- `Early Warning System` — icone `siren.svg` (size 42x42, fond `bg-[#fdf2f8]`) — _Automated anomaly detection alerts you to reputation shifts and competitive threats before they escalate_
**And** chaque icone fait partie des assets telecharges depuis Figma MCP (AC8)
**And** les anciennes icones `trending_up.svg`, `action_key.svg`, `public.svg` sont supprimees (`my_location.svg` est conservee car reutilisee par Feature 2)

### AC4 — Demo CTA section
**Given** la page Upsell est rendue
**When** la section Demo CTA s'affiche (sous les features, fond `#faf5ff`)
**Then** le texte central affiche exactement:
> _Don't let AI search happen to your brand. Take control of how you appear in the conversations that drive purchase decisions._
**And** un bouton "Speak to Us" variant `neutral` est visible sous le texte

### AC5 — Showcases (5 -> 3)
**Given** la page Upsell est rendue
**When** la section showcases (sous Demo CTA) s'affiche
**Then** **exactement 3 showcases** sont rendus dans cet ordre:
- **Multi-Engine AI Monitoring** (image a droite, `multi-engine-ai-monitoring.png` 500x500) — tagline `Comprehensive tracking across all major AI search platforms` + 4 bullets (Monitor ChatGPT...Perplexity / Track brand presence in any market and language / Real-time visibility into AI-generated recommendations / Sentiment analysis for AI responses about your brand)
- **Earned Media to AI Connection** (image a gauche, `earned-media-to-ai-connection.png` 500x500) — tagline `See directly how press coverage influences AI search results.` + 4 bullets (Connect PR activity to AI engine responses / Track which articles and sources AI tools cite / Measure message pull-through in AI recommendations / Prove the earned media impact on AI visibility)
- **Competitive Intelligence** (image a droite, `competitive-intelligence.png` 500x500) — tagline `Benchmark your AI presence against competitors.` + 4 bullets (Share of voice across AI platforms / Competitive positioning analysis / Identify competitor advantages in AI search / Track relative brand performance over time)
**And** les 5 anciennes illustrations (overview-dashboard / actions-center / category-deep-dives / brand-identity / weekly-auto-refresh) sont supprimees et remplacees par les 3 nouvelles telechargeees depuis Figma MCP
**And** chaque showcase a un bouton primaire "Speak to Us" sous ses bullets

### AC6 — i18n strict EN-only (FR identique a EN)
**Given** la story livre toutes les nouvelles copies via i18n (`views.upsell.*`)
**When** on inspecte `en.json` et `fr.json`
**Then** les deux fichiers contiennent **strictement les memes valeurs anglaises** pour toutes les cles du namespace `views.upsell.*` (decision SM 2026-05-12 : copie FR pas encore validee par PM)
**And** aucune cle `views.upsell.*` obsolete n'est laissee (showcase4-* / showcase5-* retires)
**And** la nouvelle cle `views.upsell.introText` existe pour porter le paragraphe AC2

### AC7 — Anti-regression tracking HubSpot (story 17-8)
**Given** la story 17-8 (GEO-237) a livre le tracking HubSpot via `useCookieConsentStore` + `POST v1/upsell/hubspot`
**When** le contenu est refonde
**Then** tous les boutons "Speak to Us" (5 instances) passent par le composant `SpeakToUsButton` existant qui appelle `handleSpeakToUs()`
**And** la logique de consent (`pendingUpsellRef`, `hasUpsellSentRef`, useEffect post-consent) est strictement preservee
**And** le tag `data-testid="upsell-speak-to-us"` reste present sur chaque instance
**And** l'idempotence par session reste effective (1 seul POST malgre 5 clics)

### AC8 — Assets Figma telecharges via MCP (pas d'icones externes)
**Given** les nouveaux assets requis sont 4 icones (visibility, crown, siren + reutilisation my_location) et 3 illustrations
**When** le dev integre les assets dans le repo
**Then** chaque asset est telecharge depuis le serveur Figma MCP (call `get_design_context` sur node `14083:11425`)
**And** les icones SVG sont stockees dans `frontend/src/assets/icons/upsell/`
**And** les illustrations PNG sont stockees dans `frontend/src/assets/illustrations/upsell/`
**And** aucune librairie d'icones externe (lucide-react, heroicons, etc.) n'est ajoutee

### AC9 — Tests unitaires a jour
**Given** le fichier `UpsellPage.test.tsx` couvre actuellement 11 tests
**When** le contenu est refonde
**Then** les assertions de rendering sont mises a jour:
- `renders the main title` -> match `Your AI Search Intelligence`
- `renders all 4 feature cards` -> match `Unified AI Monitoring`, `Actionable Intelligence`, `Competitive Advantage`, `Early Warning System`
- `renders all 3 feature showcase titles` -> match `Multi-Engine AI Monitoring`, `Earned Media to AI Connection`, `Competitive Intelligence`
- `renders 5 'Speak to Us' button instances` (`toHaveLength(5)`)
**And** les tests AC1/AC2/AC4/AC5/AC7 de la story 17-8 restent verts sans modification de leur logique
**And** `pnpm test --run -t "UpsellPage"` -> suite verte

### AC10 — Pas de modification backend ni de store
**Given** cette story est purement frontend / cosmetique
**When** le dev finalise la story
**Then** aucun fichier sous `backend/`, `frontend/src/store/`, `frontend/src/lib/`, `frontend/src/components/cookieConsent/` n'est modifie
**And** les seuls fichiers modifies/crees sont sous `frontend/src/views/auth/`, `frontend/src/i18n/locales/`, `frontend/src/i18n/types.ts`, `frontend/src/assets/icons/upsell/`, `frontend/src/assets/illustrations/upsell/`

## Technical Details

- This story is purely frontend / cosmetic — no backend changes.
- All new copies go through i18n (`views.upsell.*`) — no hardcoded strings.
- HubSpot tracking logic from GEO-237 (SpeakToUsButton component) must be preserved as-is.
- Assets sourced from Figma MCP only — no external icon libraries.

## Definition of Done

- [ ] Hero title, description, and intro paragraph match Figma V2 exactly
- [ ] 4 feature cards updated with new icons and copy
- [ ] Demo CTA copy updated
- [ ] Exactly 3 showcases with correct images, taglines, and bullets
- [ ] HubSpot tracking anti-regression: 5 "Speak to Us" buttons all wired to SpeakToUsButton
- [ ] i18n: all copies via `views.upsell.*`, EN=FR (decision SM)
- [ ] Unit tests suite updated and green

## Liens

- Epic parent: https://onclusive.atlassian.net/browse/GEO-200
- Story Jira: https://onclusive.atlassian.net/browse/GEO-427
- Figma source: https://www.figma.com/design/msZlgB0O4kKPc3jlwegBKx/Layout---Navigation?node-id=14083-11425&m=dev
- Spec complète: https://github.com/AirPR/geo-analytics/blob/main/docs/implementation-artifacts/epics/epic-17/17-9-upsell-page-content-refresh.md
