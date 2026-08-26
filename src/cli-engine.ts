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

import * as fs from "fs";
import * as path from "path";
import { addFinalScoreToEgn, calculateFinalScore, validateGameplay } from "./engine";
import { EgnFile } from "./types";
import { PACKAGE_VERSION } from "./version";

function showHelp(): void {
  console.log(`
Euchre Game Notation (EGN) Engine Utility CLI (v${PACKAGE_VERSION})

Reads an EGN file, plays through all deals using the Euchre rules engine,
calculates the cumulative final score, verifies gameplay legality (reneges,
duplicate cards, trick counts), and updates 'finalScore' in metadata.

Usage:
  egn-engine <input-file> [output-file] [options]

Examples:
  egn-engine game.egn
  egn-engine game.egn --in-place
  egn-engine game.egn output.egn
  egn-engine game.egn --stdout
  egn-engine game.egn --check
  egn-engine game.egn --validate-gameplay

Options:
  -i, --in-place            Update the input EGN file in place
  -s, --stdout              Output updated EGN JSON to stdout
  -c, --check               Verify if the file's existing finalScore matches the calculated score
  --validate-gameplay       Validate gameplay rules (reneges, duplicates, sit-out plays, trick sizes)
  -h, --help                Show this help message
  -v, --version             Show version information
`);
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.includes("--version") || (args.includes("-v") && !args.includes("--validate-gameplay"))) {
    console.log(`EGN Engine Utility v${PACKAGE_VERSION}`);
    process.exit(0);
  }

  if (args.includes("--help") || args.includes("-h") || args.length === 0) {
    showHelp();
    process.exit(0);
  }

  const flags = args.filter((arg) => arg.startsWith("-"));
  const positionals = args.filter((arg) => !arg.startsWith("-"));

  if (positionals.length === 0) {
    console.error("Error: Missing input EGN file path.");
    showHelp();
    process.exit(1);
  }

  const inputPath = path.resolve(positionals[0]);
  const outputPath = positionals.length > 1 ? path.resolve(positionals[1]) : undefined;
  const inPlace = flags.includes("--in-place") || flags.includes("-i");
  const toStdout = flags.includes("--stdout") || flags.includes("-s");
  const checkOnly = flags.includes("--check") || flags.includes("-c");
  const validateRules = flags.includes("--validate-gameplay") || flags.includes("--validate");

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found at "${inputPath}"`);
    process.exit(1);
  }

  try {
    const rawJson = fs.readFileSync(inputPath, "utf8");
    const egn = JSON.parse(rawJson) as EgnFile;

    // 1. Gameplay Rule Validation
    if (validateRules) {
      const validationResult = validateGameplay(egn);
      if (!validationResult.isValid) {
        console.error(`❌ Gameplay validation failed for "${path.basename(inputPath)}" with ${validationResult.violations.length} violation(s):`);
        validationResult.violations.forEach((v, idx) => {
          console.error(`  [${idx + 1}] ${v.code} (Deal ${v.dealIndex}${v.trickIndex !== undefined ? `, Trick ${v.trickIndex + 1}` : ""}): ${v.message}`);
        });
        process.exit(1);
      } else {
        console.log(`✅ Gameplay validation passed: No reneges, duplicates, or rule violations found.`);
      }
    }

    const computedFinalScore = calculateFinalScore(egn);

    if (checkOnly) {
      const existingScore = egn.metadata?.finalScore;
      if (!existingScore) {
        console.log(`❌ No finalScore in "${path.basename(inputPath)}". Computed score: [${computedFinalScore.join(", ")}]`);
        process.exit(1);
      }
      const matches = existingScore[0] === computedFinalScore[0] && existingScore[1] === computedFinalScore[1];
      if (matches) {
        console.log(`✅ finalScore [${existingScore.join(", ")}] matches computed game result.`);
        process.exit(0);
      } else {
        console.log(
          `❌ finalScore mismatch: recorded [${existingScore.join(", ")}], but computed [${computedFinalScore.join(", ")}].`
        );
        process.exit(1);
      }
    }

    const updatedEgn = addFinalScoreToEgn(egn);
    const formattedJson = JSON.stringify(updatedEgn, null, 2) + "\n";

    if (toStdout) {
      process.stdout.write(formattedJson);
      process.exit(0);
    }

    const targetPath = outputPath || (inPlace ? inputPath : undefined);

    if (targetPath) {
      fs.writeFileSync(targetPath, formattedJson, "utf8");
      console.log(`✅ Updated finalScore to [${computedFinalScore.join(", ")}] in "${targetPath}"`);
    } else if (!validateRules) {
      // If neither output-file nor --in-place given, output informative result and suggest --in-place
      console.log(`Game: "${egn.metadata?.title || path.basename(inputPath)}"`);
      console.log(`Initial Score: [${(egn.metadata?.initialScore || [0, 0]).join(", ")}]`);
      console.log(`Final Score:   [${computedFinalScore.join(", ")}]`);
      console.log(`\nTo save changes directly to the file, use: egn-engine "${positionals[0]}" --in-place`);
    }
  } catch (err: any) {
    console.error("Error evaluating EGN game with engine:", err.message || err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
