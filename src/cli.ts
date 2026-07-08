#!/usr/bin/env node
import { convertBinToEgnJson, convertEgnJsonToBin } from "./converter";
import * as path from "path";
import * as fs from "fs";

function showHelp() {
  console.log(`
Euchre Game Notation (EGN) Converter CLI

Usage:
  egn-convert <input-file> <output-file> [options]

Examples:
  egn-convert game.egn game.condensed.bin
  egn-convert game.egn game.expanded.bin --expanded
  egn-convert game.condensed.bin game.egn

Options:
  --expanded      Use expanded Protobuf schema instead of the default condensed mode
  --help, -h      Show this help message
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h") || args.length < 2) {
    showHelp();
    process.exit(0);
  }

  // Filter out flags to get positional arguments
  const flags = args.filter(arg => arg.startsWith("-"));
  const positionals = args.filter(arg => !arg.startsWith("-"));

  if (positionals.length < 2) {
    console.error("Error: Missing input or output file paths.");
    showHelp();
    process.exit(1);
  }

  const inputPath = path.resolve(positionals[0]);
  const outputPath = path.resolve(positionals[1]);
  const condensed = !flags.includes("--expanded");

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found at "${inputPath}"`);
    process.exit(1);
  }

  try {
    const isBinInput = inputPath.endsWith(".bin");

    if (isBinInput) {
      console.log(`Converting binary "${inputPath}" to JSON "${outputPath}" (condensed: ${condensed})...`);
      const json = convertBinToEgnJson(inputPath, condensed);
      fs.writeFileSync(outputPath, json, "utf8");
    } else {
      console.log(`Converting JSON "${inputPath}" to binary "${outputPath}" (condensed: ${condensed})...`);
      const jsonStr = fs.readFileSync(inputPath, "utf8");
      convertEgnJsonToBin(jsonStr, outputPath, condensed);
    }
    console.log("Conversion completed successfully!");
  } catch (err: any) {
    console.error("Error during conversion:", err.message || err);
    process.exit(1);
  }
}

main();
