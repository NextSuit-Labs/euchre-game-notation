#!/usr/bin/env node
/*
 * Copyright 2026 Write Words - Make Magic, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const repoRoot = __dirname;
const rulesTsPath = path.join(repoRoot, "src", "engine", "rules.ts");
const outputJsPath = path.join(repoRoot, "src", "baseline-replayer", "rules-engine.js");

function generateRulesEngineJs() {
  const sourceTs = fs.readFileSync(rulesTsPath, "utf8");

  // Transpile TypeScript to clean ES2018 JavaScript (stripping type imports and type annotations)
  const transpiled = ts.transpileModule(sourceTs, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2018,
      module: ts.ModuleKind.CommonJS,
      removeComments: false,
    },
  }).outputText;

  const header = `/*
 * Copyright 2026 Write Words - Make Magic, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// ============================================================================
// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY.
// Generated from src/engine/rules.ts by generate-replayer-rules.js
// ============================================================================

var exports = typeof exports !== "undefined" ? exports : {};
`;

  const footer = `
// Universal browser global & CommonJS export attachment
if (typeof window !== "undefined") {
  window.determineTrump = determineTrump;
  window.determineMaker = determineMaker;
  window.determineIsAlone = determineIsAlone;
  window.determineLeadSeat = determineLeadSeat;
  window.getLeftBowerSuit = getLeftBowerSuit;
  window.getCardValue = getCardValue;
  window.getWinnerIndex = getWinnerIndex;
  window.getPlayerIndexInTrick = getPlayerIndexInTrick;
  window.compileDealSteps = compileDealSteps;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    determineTrump,
    determineMaker,
    determineIsAlone,
    determineLeadSeat,
    getLeftBowerSuit,
    getCardValue,
    getWinnerIndex,
    getPlayerIndexInTrick,
    compileDealSteps,
  };
}
`;

  // Filter out license header from transpiled text to avoid duplication
  let cleanBody = transpiled.replace(/\/\*[\s\S]*?limitations under the License\.\s*\*\/\s*/, "");
  // Replace direct "use strict" and exports definition with safe wrapper
  cleanBody = cleanBody.replace(/"use strict";\s*/g, "");
  cleanBody = cleanBody.replace(/Object\.defineProperty\(exports, "__esModule", \{ value: true \}\);\s*/g, "");

  const finalOutput = header + "\n" + cleanBody.trim() + "\n" + footer;
  fs.writeFileSync(outputJsPath, finalOutput, "utf8");
  console.log(`Generated "${outputJsPath}" from "${rulesTsPath}"`);
}

if (require.main === module) {
  generateRulesEngineJs();
}

module.exports = {
  generateRulesEngineJs,
  rulesTsPath,
  outputJsPath,
};
