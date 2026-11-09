'use strict';
/**
 * loadJDD.js — Chargement JDD en 4 couches avec support multi-env.
 *
 * Ordre de merge (priorité croissante) :
 *   JDD_COMMON < JDD_ENV < JDD_BASE < JDD_PROF
 *
 * Variables d'environnement :
 *   TARGET_ENV   = staging (défaut) | prod
 *   JDD_PROFILE  = default (défaut) | dyson | toyota | aldo | ...
 *
 * Usage dans un spec :
 *   const { loadJDD } = require('../test-data/jdd/loadJDD');
 *   const JDD = loadJDD('verify-analysis');              // jdd/verify-analysis-{base,default}.json
 *   const JDD = loadJDD('category/category-top-concept'); // jdd/category/category-top-concept-{base,default}.json
 */

const fs   = require('fs');
const path = require('path');

const JDD_ROOT = __dirname;

function deepMerge(...objs) {
  const out = {};
  for (const obj of objs) {
    if (!obj) continue;
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === 'object' && !Array.isArray(v) && out[k] && typeof out[k] === 'object')
        out[k] = deepMerge(out[k], v);
      else
        out[k] = v;
    }
  }
  return out;
}

function tryRequire(filePath) {
  if (fs.existsSync(filePath)) return require(filePath);
  return {};
}

/**
 * @param {string} specName  Nom du spec sans suffixe, ex: 'verify-analysis'
 *                           ou 'category/category-top-concept' pour les specs category
 * @returns {object}         JDD mergé prêt à l'emploi
 */
function loadJDD(specName) {
  const TARGET_ENV      = process.env.TARGET_ENV  || 'staging';
  const JDD_PROFILE_NAME = process.env.JDD_PROFILE || 'default';

  const JDD_COMMON = tryRequire(path.join(JDD_ROOT, 'common.json'));
  const JDD_ENV    = tryRequire(path.join(JDD_ROOT, 'env', `${TARGET_ENV}.json`));
  const JDD_BASE   = tryRequire(path.join(JDD_ROOT, `${specName}-base.json`));

  const profPath = path.join(JDD_ROOT, `${specName}-${JDD_PROFILE_NAME}.json`);
  if (!fs.existsSync(profPath)) {
    throw new Error(`JDD profile "${JDD_PROFILE_NAME}" introuvable : ${specName}-${JDD_PROFILE_NAME}.json`);
  }
  const JDD_PROF = require(profPath);

  return deepMerge(JDD_COMMON, JDD_ENV, JDD_BASE, JDD_PROF);
}

module.exports = { loadJDD, deepMerge };
