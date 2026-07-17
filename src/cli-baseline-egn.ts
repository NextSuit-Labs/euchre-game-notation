#!/usr/bin/env node
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import egnSchema from "../schemas/egn-schema-v1.json";
import { convertBinToEgnJson, convertEgnJsonToBin } from "./converter";
import { validateEGN } from "./validator";
import { EGNFile } from "./types";
import { PACKAGE_VERSION } from "./version";

function showHelp() {
  console.log(`
EGN Baseline CLI (v${PACKAGE_VERSION})

Usage:
  egn-baseline <input-file> [output-file] [options]

Examples:
  egn-baseline game.egn
  egn-baseline game.egn baseline.egn
  egn-baseline game.egnb baseline.egn
  egn-baseline game.expanded.egnb baseline.egnb --expanded

Options:
  --expanded      Use expanded Protobuf schema instead of the default condensed mode
  --hash          Return only the stripped baseline hash instead of writing/printing the stripped EGN
  --help, -h      Show this help message
  --version, -v   Show version information
`);
}

export function collectAnalysisPropertyNames(schema: unknown = egnSchema, propertyName?: string): string[] {
  const names = new Set<string>();

  function visit(node: unknown, currentPropertyName?: string) {
    if (!node || typeof node !== "object") {
      return;
    }

    const schemaNode = node as Record<string, unknown>;
    const description = typeof schemaNode.description === "string" ? schemaNode.description : "";
    if (description.includes("Analysis-only content") && currentPropertyName) {
      names.add(currentPropertyName);
    }

    if (schemaNode.properties && typeof schemaNode.properties === "object") {
      for (const [childPropertyName, childSchema] of Object.entries(schemaNode.properties as Record<string, unknown>)) {
        visit(childSchema, childPropertyName);
      }
    }

    if (schemaNode.definitions && typeof schemaNode.definitions === "object") {
      for (const childSchema of Object.values(schemaNode.definitions as Record<string, unknown>)) {
        visit(childSchema);
      }
    }

    if (schemaNode.items) {
      visit(schemaNode.items);
    }

    for (const key of ["oneOf", "anyOf", "allOf"]) {
      const variants = schemaNode[key];
      if (Array.isArray(variants)) {
        for (const variant of variants) {
          visit(variant);
        }
      }
    }
  }

  visit(schema, propertyName);
  return Array.from(names);
}

const analysisPropertyNames = new Set(collectAnalysisPropertyNames());

function shouldStripProperty(key: string): boolean {
  return analysisPropertyNames.has(key);
}

function convertToBaselineEgn(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value
      .map((item) => convertToBaselineEgn(item))
      .filter((item) => item !== undefined)
      .filter((item) => {
        if (Array.isArray(item) && item.length === 0) return false;
        if (item && typeof item === "object" && Object.keys(item as Record<string, unknown>).length === 0) return false;
        return true;
      });
  }

  if (value && typeof value === "object") {
    const stripped: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (shouldStripProperty(key)) {
        continue;
      }

      const strippedChild = convertToBaselineEgn(child);
      if (strippedChild === undefined) {
        continue;
      }

      if (Array.isArray(strippedChild) && strippedChild.length === 0) {
        continue;
      }

      if (strippedChild && typeof strippedChild === "object" && Object.keys(strippedChild as Record<string, unknown>).length === 0) {
        continue;
      }

      stripped[key] = strippedChild;
    }
    return stripped;
  }

  return value;
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, child]) => `${JSON.stringify(key)}:${stableStringify(child)}`);
    return `{${entries.join(",")}}`;
  }

  return JSON.stringify(value);
}

function hashBaselineEgn(egn: EGNFile): string {
  const stripped = convertToBaselineEgn(egn) as Record<string, unknown>;
  const canonical = stableStringify(stripped);
  return crypto.createHash("sha256").update(canonical).digest("hex");
}

function loadEgnFromInput(inputPath: string, condensed: boolean): EGNFile {
  const ext = path.extname(inputPath).toLowerCase();

  if (ext === ".egnb") {
    const jsonText = convertBinToEgnJson(inputPath, condensed);
    const parsed = JSON.parse(jsonText) as EGNFile;
    const validation = validateEGN(parsed);
    if (!validation.isValid) {
      throw new Error(`Input binary failed validation: ${JSON.stringify(validation.errors)}`);
    }
    return parsed;
  }

  const jsonText = fs.readFileSync(inputPath, "utf8");
  const parsed = JSON.parse(jsonText) as EGNFile;
  const validation = validateEGN(parsed);
  if (!validation.isValid) {
    throw new Error(`Input JSON failed validation: ${JSON.stringify(validation.errors)}`);
  }
  return parsed;
}

function writeStrippedEgn(inputPath: string, outputPath: string | undefined, condensed: boolean, asHash: boolean): string {
  const egn = loadEgnFromInput(inputPath, condensed);
  const stripped = convertToBaselineEgn(egn) as EGNFile;

  if (asHash) {
    return hashBaselineEgn(egn);
  }

  const outputExt = outputPath ? path.extname(outputPath).toLowerCase() : ".egn";
  const outputIsBinary = outputExt === ".egnb";

  if (outputPath) {
    const outputText = JSON.stringify(stripped, null, 2);

    if (outputIsBinary) {
      const tmpJsonPath = path.resolve(path.dirname(outputPath), `${path.basename(outputPath, ".egnb")}.json`);
      fs.writeFileSync(tmpJsonPath, outputText, "utf8");
      convertEgnJsonToBin(outputText, outputPath, condensed);
      fs.unlinkSync(tmpJsonPath);
    } else {
      fs.writeFileSync(outputPath, outputText, "utf8");
    }
  }

  return JSON.stringify(stripped, null, 2);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes("--version") || args.includes("-v")) {
    console.log(`EGN Baseline v${PACKAGE_VERSION}`);
    process.exit(0);
  }

  if (args.includes("--help") || args.includes("-h") || args.length < 1) {
    showHelp();
    process.exit(0);
  }

  const flags = args.filter(arg => arg.startsWith("-"));
  const positionals = args.filter(arg => !arg.startsWith("-"));

  if (positionals.length < 1) {
    console.error("Error: Missing input file path.");
    showHelp();
    process.exit(1);
  }

  const inputPath = path.resolve(positionals[0]);
  const outputPath = positionals[1] ? path.resolve(positionals[1]) : undefined;
  const inputExt = path.extname(inputPath).toLowerCase();
  const condensed = inputExt === ".egnb"
    ? !flags.includes("--expanded")
    : !flags.includes("--expanded");
  const asHash = flags.includes("--hash");

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found at "${inputPath}"`);
    process.exit(1);
  }

  try {
    const result = writeStrippedEgn(inputPath, outputPath, condensed, asHash);
    if (asHash) {
      console.log(result);
    } else if (outputPath) {
      console.log(`Wrote stripped EGN to "${outputPath}"`);
    } else {
      console.log(result);
    }
  } catch (err: any) {
    console.error("Error during baseline EGN processing:", err.message || err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { hashBaselineEgn, convertToBaselineEgn };
