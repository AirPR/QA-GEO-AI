/**
 * Hook PreToolUse — Write
 * Bloque (demande confirmation) si le fichier cible existe déjà
 * dans les dossiers auto-approuvés (.claude/Data/output/ et apps/geo/data/).
 * Laisse passer la création de nouveaux fichiers sans interruption.
 */

const input = require('fs').readFileSync(0, 'utf8');
const data = JSON.parse(input);

const fp = data.tool_input && data.tool_input.file_path;
if (!fp) process.exit(0);

// Normaliser les séparateurs (Windows backslash → forward slash)
const norm = fp.replace(/\\/g, '/');

// Ne s'applique qu'aux dossiers auto-approuvés
const inScope =
  norm.includes('.claude/Data/output/') ||
  norm.includes('apps/geo/data/');

if (!inScope) process.exit(0);

// Si le fichier existe déjà → demander confirmation
if (require('fs').existsSync(fp)) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'ask',
      permissionDecisionReason:
        'Fichier existant — modification manuelle requise (création seule est auto-approuvée) : ' + fp
    }
  }));
} else {
  // Nouveau fichier → création autorisée directement
  process.exit(0);
}
