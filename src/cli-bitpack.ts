#!/usr/bin/env node
import { packDeal } from "./bitpacker";
import * as path from "path";
import * as fs from "fs";

function showHelp() {
  console.log(`
EGN Deal Bitpacker CLI (egn-bitpack-deal)

Converts specific deals in an EGN file into Base64URL-encoded condensed strings.

Usage:
  egn-bitpack-deal <input-file> [options]

Examples:
  egn-bitpack-deal match.egn --deals 0,2
  egn-bitpack-deal match.egn

Options:
  --deals <list>  Comma-separated list of 0-based deal indices or deal numbers to bitpack (e.g. 0,2).
                  If not specified, all deals in the EGN file will be output.
  --help, -h      Show this help message
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    showHelp();
    process.exit(0);
  }

  // Parse --deals option
  let dealsArg: string | null = null;
  const filteredArgs: string[] = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--deals") {
      dealsArg = args[i + 1];
      i++; // Skip next arg
    } else if (args[i].startsWith("--deals=")) {
      dealsArg = args[i].split("=")[1];
    } else {
      filteredArgs.push(args[i]);
    }
  }

  if (filteredArgs.length < 1) {
    console.error("Error: Missing input EGN file path.");
    showHelp();
    process.exit(1);
  }

  const inputPath = path.resolve(filteredArgs[0]);

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found at "${inputPath}"`);
    process.exit(1);
  }

  try {
    const jsonStr = fs.readFileSync(inputPath, "utf8");
    const jsonObj = JSON.parse(jsonStr);

    if (!Array.isArray(jsonObj.deals)) {
      throw new Error("Invalid EGN file structure: missing or invalid 'deals' array.");
    }

    let targetDeals: number[] | null = null;
    if (dealsArg !== null) {
      targetDeals = dealsArg.split(",").map(val => Number(val.trim()));
    }

    jsonObj.deals.forEach((deal: any, idx: number) => {
      // Determine if this deal is targeted
      const isTarget = targetDeals === null || targetDeals.includes(idx) || (typeof deal === "object" && targetDeals.includes(deal.dealNumber));
      if (!isTarget) {
        return;
      }

      if (typeof deal === "string") {
        console.log(deal);
      } else if (typeof deal === "object") {
        const packed = packDeal(deal);
        console.log(packed);
      }
    });
  } catch (err: any) {
    console.error("Error during bitpacking:", err.message || err);
    process.exit(1);
  }
}

main();
