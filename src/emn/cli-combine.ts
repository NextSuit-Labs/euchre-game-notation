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
import { upgradeEgn } from "../cli-upgrade";
import { validateEgn } from "../validator";
import { EgnFile } from "../types";
import { MatchType } from "./types";
import { combineEgnToEmn } from "./combiner";

function showHelp() {
  console.log(`
Euchre Match Notation (EMN) Combine CLI (v${PACKAGE_VERSION})

Usage:
  emn-match-combine <input-egn-files...> [options]

Options:
  --output, -o <file>   Path to output .emn match file (required)
  --format <type>       Match format type (BEST_OF_N, PROGRESSIVE, ROUND_ROBIN, etc. Default: BEST_OF_N)
  --target <number>     Target metric for format (e.g. 3 for Best of 3)
  --title <title>       Match title
  --description <desc>  Match description
  --help, -h            Show this help message
  --version, -v         Show version information

Examples:
  emn-match-combine game1.egn game2.egn game3.egn -o match.emn --format BEST_OF_N --target 3 --title "Finals"
`);
}

function parseArgs(args: string[]) {
  const inputFiles: string[] = [];
  let outputFile = "";
  let format: MatchType = "BEST_OF_N";
  let target: number | undefined = undefined;
  let title: string | undefined = undefined;
  let description: string | undefined = undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      showHelp();
      process.exit(0);
    } else if (arg === "--version" || arg === "-v") {
      console.log(`v${PACKAGE_VERSION}`);
      process.exit(0);
    } else if (arg === "--output" || arg === "-o") {
      outputFile = args[++i];
    } else if (arg === "--format") {
      format = args[++i] as MatchType;
    } else if (arg === "--target") {
      target = parseInt(args[++i], 10);
    } else if (arg === "--title") {
      title = args[++i];
    } else if (arg === "--description") {
      description = args[++i];
    } else if (!arg.startsWith("-")) {
      inputFiles.push(arg);
    }
  }

  return { inputFiles, outputFile, format, target, title, description };
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    showHelp();
    process.exit(1);
  }

  const { inputFiles, outputFile, format, target, title, description } = parseArgs(args);

  if (!outputFile) {
    console.error("Error: Output file path is required. Use --output <file.emn>");
    process.exit(1);
  }

  if (inputFiles.length === 0) {
    console.error("Error: At least one input EGN file must be provided.");
    process.exit(1);
  }

  const egnFiles: EgnFile[] = [];
  for (const file of inputFiles) {
    const fullPath = path.resolve(file);
    if (!fs.existsSync(fullPath)) {
      console.error(`Error: File not found: ${file}`);
      process.exit(1);
    }
    const content = fs.readFileSync(fullPath, "utf8");
    let json = JSON.parse(content);
    let valid = validateEgn(json);
    if (!valid.isValid) {
      json = upgradeEgn(json);
      valid = validateEgn(json);
      if (!valid.isValid) {
        console.error(`Error: Invalid EGN file '${file}': ${JSON.stringify(valid.errors)}`);
        process.exit(1);
      }
    }
    egnFiles.push(json as EgnFile);
  }

  try {
    const emnFile = combineEgnToEmn(egnFiles, { format, target, title, description });
    const outputContent = JSON.stringify(emnFile, null, 2);
    fs.writeFileSync(path.resolve(outputFile), outputContent, "utf8");
    console.log(`Successfully compiled ${egnFiles.length} EGN games into ${outputFile}`);
  } catch (err: any) {
    console.error(`Combine failed: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
