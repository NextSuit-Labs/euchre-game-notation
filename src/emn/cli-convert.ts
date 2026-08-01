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

import * as path from "path";
import * as fs from "fs";
import { convertBinToEmnJson, convertEmnJsonToBin, detectEmnBinaryFormat } from "./converter";
import { PACKAGE_VERSION } from "../version";

function showHelp() {
  console.log(`
Euchre Match Notation (EMN) Converter CLI (v${PACKAGE_VERSION})

Usage:
  emn-match-convert <input-file> <output-file> [options]

Examples:
  emn-match-convert match.emn match.emnb
  emn-match-convert match.emnb match.emn

Options:
  --expanded, --unpack, --no-condense  Expand/unpack embedded EGN game deals when converting
  --help, -h                           Show this help message
  --version, -v                        Show version information
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes("--version") || args.includes("-v")) {
    console.log(`EMN Converter CLI v${PACKAGE_VERSION}`);
    process.exit(0);
  }

  if (args.includes("--help") || args.includes("-h") || args.length < 2) {
    showHelp();
    process.exit(0);
  }

  const flags = args.filter((arg) => arg.startsWith("-"));
  const positionals = args.filter((arg) => !arg.startsWith("-"));

  if (positionals.length < 2) {
    console.error("Error: Missing input or output file paths.");
    showHelp();
    process.exit(1);
  }

  const inputPath = path.resolve(positionals[0]);
  const outputPath = path.resolve(positionals[1]);

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found at "${inputPath}"`);
    process.exit(1);
  }

  try {
    const isBinInput = inputPath.endsWith(".emnb") || detectEmnBinaryFormat(inputPath);
    const isExpanded = flags.includes("--expanded") || flags.includes("--unpack") || flags.includes("--no-condense");

    if (isBinInput) {
      console.log(`Converting binary EMN match "${inputPath}" to JSON "${outputPath}" (unpackGames=${isExpanded})...`);
      const jsonStr = convertBinToEmnJson(inputPath, { unpackGames: isExpanded });
      fs.writeFileSync(outputPath, jsonStr, "utf8");
    } else {
      console.log(`Converting JSON EMN match "${inputPath}" to binary "${outputPath}" (condenseGames=${!isExpanded})...`);
      convertEmnJsonToBin(inputPath, outputPath, { condenseGames: !isExpanded });
    }
    console.log("EMN Conversion completed successfully!");
  } catch (err: any) {
    console.error("Error during EMN conversion:", err.message || err);
    process.exit(1);
  }
}

main();
