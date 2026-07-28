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
import { PACKAGE_VERSION } from "../version";
import { EmnFile } from "./types";
import { extractEgnFromEmn, extractAllEgnsFromEmn } from "./extractor";

function showHelp() {
  console.log(`
Euchre Match Notation (EMN) Extract CLI (v${PACKAGE_VERSION})

Usage:
  emn-match-extract <input-emn-file> [options]

Options:
  --output, -o <path>   Output directory (when extracting all) or output file path (when extracting a single game)
  --game, -g <index>    0-based index of the single game to extract. If omitted, all games are extracted.
  --help, -h            Show this help message
  --version, -v         Show version information

Examples:
  # Extract all games to the output directory "extracted_games"
  emn-match-extract match.emn -o ./extracted_games

  # Extract only Game 1 (index 0) to "game1.egn"
  emn-match-extract match.emn -g 0 -o game1.egn
`);
}

function parseArgs(args: string[]) {
  let inputFile = "";
  let outputPath = "";
  let gameIndex: number | undefined = undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      showHelp();
      process.exit(0);
    } else if (arg === "--version" || arg === "-v") {
      console.log(`v${PACKAGE_VERSION}`);
      process.exit(0);
    } else if (arg === "--output" || arg === "-o") {
      outputPath = args[++i];
    } else if (arg === "--game" || arg === "-g") {
      gameIndex = parseInt(args[++i], 10);
    } else if (!arg.startsWith("-")) {
      inputFile = arg;
    }
  }

  return { inputFile, outputPath, gameIndex };
}

export function runCli(args: string[]) {
  const { inputFile, outputPath, gameIndex } = parseArgs(args);

  if (!inputFile) {
    console.error("Error: Input EMN file is required.");
    showHelp();
    process.exit(1);
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`Error: Input file "${inputFile}" does not exist.`);
    process.exit(1);
  }

  let emnContent: EmnFile;
  try {
    const raw = fs.readFileSync(inputFile, "utf8");
    emnContent = JSON.parse(raw);
  } catch (err: any) {
    console.error(`Error: Failed to parse input EMN file. ${err.message}`);
    process.exit(1);
  }

  if (emnContent.fileType !== "Euchre Match Notation") {
    console.error(`Error: Input file must be "Euchre Match Notation" (got "${emnContent.fileType}").`);
    process.exit(1);
  }

  try {
    if (gameIndex !== undefined) {
      const result = extractEgnFromEmn(emnContent, gameIndex);
      const outFilePath = outputPath || `game_${gameIndex + 1}.egn`;
      fs.writeFileSync(outFilePath, JSON.stringify(result, null, 2), "utf8");
      console.log(`Extracted Game ${gameIndex + 1} to: ${outFilePath}`);
    } else {
      const results = extractAllEgnsFromEmn(emnContent);
      const destDir = outputPath || ".";
      if (destDir !== "." && !fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      const inputBasename = path.basename(inputFile, path.extname(inputFile));

      results.forEach((egn, idx) => {
        const outFileName = `${inputBasename}_game_${idx + 1}.egn`;
        const outFilePath = path.join(destDir, outFileName);
        fs.writeFileSync(outFilePath, JSON.stringify(egn, null, 2), "utf8");
        console.log(`Extracted Game ${idx + 1} to: ${outFilePath}`);
      });
    }
  } catch (err: any) {
    console.error(`Error: Extraction failed. ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  runCli(process.argv.slice(2));
}
