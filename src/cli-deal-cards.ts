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
import { inferPlayerCards } from "./engine";
import { unpackDeal } from "./bitpacker";
import { Deal, EgnFile } from "./types";
import { PACKAGE_VERSION } from "./version";

function showHelp(): void {
  console.log(`
EGN Deal Player Cards Utility CLI (v${PACKAGE_VERSION})

Takes in a Euchre Deal (or an EGN game file) and outputs an array of playerCards
for each player for that deal. If playerCards are already provided in initialState,
they are returned directly. Otherwise, they are inferred from the bidding and
trick play phases by evaluating trick winners and lead sequence.

Usage:
  egn-deal-cards <input-file-or-json> [options]
  cat deal.json | egn-deal-cards [options]

Examples:
  egn-deal-cards deal.json
  egn-deal-cards game.egn --deal 0
  egn-deal-cards game.egn --deal all
  egn-deal-cards '{"initialState":{"dealer":0,"upCard":"9s"},"phases":[...]}'
  egn-deal-cards game.egn --seat 2
  egn-deal-cards game.egn --summary

Options:
  -d, --deal <index|all>   0-based deal index to evaluate from an EGN file (default: 0).
                           Pass 'all' to evaluate every deal in the file.
  -s, --seat <0-3>         Output cards only for the specified seat index (0..3).
  -c, --compact            Output compact single-line JSON.
  --summary                Display formatted human-readable seats summary.
  -o, --output <file>      Write output JSON to the specified file path.
  -h, --help               Show this help message.
  -v, --version            Show version information.
`);
}

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => {
      resolve(data);
    });
    process.stdin.on("error", (err) => {
      reject(err);
    });
  });
}

function extractDealFromInput(rawText: string, dealOption: string): { deals: Deal[]; isSingleDeal: boolean; ruleset?: any } {
  const trimmed = rawText.trim();
  if (!trimmed) {
    throw new Error("Empty input received.");
  }

  // Case 1: Base64 condensed deal string directly
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    const unpacked = unpackDeal(trimmed, 0);
    return { deals: [unpacked], isSingleDeal: true };
  }

  const parsed = JSON.parse(trimmed);

  // Case 2: Full EGN file
  if (Array.isArray(parsed.deals)) {
    const egn = parsed as EgnFile;
    const ruleset = egn.metadata?.ruleset;

    if (dealOption.toLowerCase() === "all") {
      const deals = egn.deals.map((d, idx) => (typeof d === "string" ? unpackDeal(d, idx) : d));
      return { deals, isSingleDeal: false, ruleset };
    }

    const targetIndex = parseInt(dealOption, 10);
    if (isNaN(targetIndex) || targetIndex < 0 || targetIndex >= egn.deals.length) {
      throw new Error(`Invalid deal index: ${dealOption}. EGN file contains ${egn.deals.length} deal(s) (indices 0-${egn.deals.length - 1}).`);
    }

    const rawDeal = egn.deals[targetIndex];
    const deal = typeof rawDeal === "string" ? unpackDeal(rawDeal, targetIndex) : rawDeal;
    return { deals: [deal], isSingleDeal: true, ruleset };
  }

  // Case 3: Array of deals directly
  if (Array.isArray(parsed)) {
    if (dealOption.toLowerCase() === "all") {
      const deals = parsed.map((d, idx) => (typeof d === "string" ? unpackDeal(d, idx) : d));
      return { deals, isSingleDeal: false };
    }
    const targetIndex = parseInt(dealOption, 10) || 0;
    const rawDeal = parsed[targetIndex];
    if (!rawDeal) {
      throw new Error(`Deal index ${targetIndex} not found in array of length ${parsed.length}.`);
    }
    const deal = typeof rawDeal === "string" ? unpackDeal(rawDeal, targetIndex) : rawDeal;
    return { deals: [deal], isSingleDeal: true };
  }

  // Case 4: Single Deal object
  if (typeof parsed === "object" && parsed !== null) {
    return { deals: [parsed as Deal], isSingleDeal: true };
  }

  throw new Error("Input could not be recognized as a Deal object, EGN file, or condensed deal string.");
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    showHelp();
    process.exit(0);
  }

  if (args.includes("--version") || args.includes("-v")) {
    console.log(`EGN Deal Player Cards CLI v${PACKAGE_VERSION}`);
    process.exit(0);
  }

  let dealOpt = "0";
  let seatOpt: number | null = null;
  let compact = false;
  let summary = false;
  let outputFile: string | null = null;
  const positionals: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-d" || arg === "--deal") {
      dealOpt = args[++i];
    } else if (arg.startsWith("--deal=")) {
      dealOpt = arg.split("=")[1];
    } else if (arg === "-s" || arg === "--seat") {
      seatOpt = parseInt(args[++i], 10);
    } else if (arg.startsWith("--seat=")) {
      seatOpt = parseInt(arg.split("=")[1], 10);
    } else if (arg === "-c" || arg === "--compact") {
      compact = true;
    } else if (arg === "--summary") {
      summary = true;
    } else if (arg === "-o" || arg === "--output") {
      outputFile = args[++i];
    } else if (arg.startsWith("--output=")) {
      outputFile = arg.split("=")[1];
    } else if (!arg.startsWith("-")) {
      positionals.push(arg);
    }
  }

  let rawInput = "";
  if (positionals.length > 0) {
    const candidatePath = path.resolve(positionals[0]);
    if (fs.existsSync(candidatePath)) {
      rawInput = fs.readFileSync(candidatePath, "utf8");
    } else {
      // Treat as inline JSON / Base64 argument
      rawInput = positionals[0];
    }
  } else if (!process.stdin.isTTY) {
    rawInput = await readStdin();
  } else {
    console.error("Error: Missing input Deal or EGN file path.");
    showHelp();
    process.exit(1);
  }

  try {
    const { deals, isSingleDeal, ruleset } = extractDealFromInput(rawInput, dealOpt);

    const seatNames = ["Seat 0 (North)", "Seat 1 (East)", "Seat 2 (South)", "Seat 3 (West)"];

    if (summary) {
      deals.forEach((deal, dIdx) => {
        const cards = inferPlayerCards(deal, ruleset);
        const rawHands = deal.initialState?.playerCards;
        const hasComplete = Array.isArray(rawHands) &&
          rawHands.length === 4 &&
          rawHands.every((h) => Array.isArray(h) && h.length === 5);

        if (!isSingleDeal || deals.length > 1) {
          console.log(`\n=== Deal ${deal.dealNumber ?? dIdx} (${hasComplete ? "Explicit" : "Inferred"}) ===`);
        } else {
          console.log(`\n=== Deal Cards (${hasComplete ? "Explicit playerCards (4x5)" : "Inferred from Play"}) ===`);
        }
        console.log(`Dealer: Seat ${deal.initialState?.dealer ?? 0} | UpCard: ${deal.initialState?.upCard ?? "None"}`);

        cards.forEach((seatCards, sIdx) => {
          if (seatOpt === null || seatOpt === sIdx) {
            console.log(`  ${seatNames[sIdx]}: [ ${seatCards.join(", ")} ]`);
          }
        });
      });
      return;
    }

    let result: unknown;
    if (isSingleDeal) {
      const cards = inferPlayerCards(deals[0], ruleset);
      if (seatOpt !== null) {
        if (seatOpt < 0 || seatOpt > 3) {
          throw new Error(`Invalid seat index: ${seatOpt}. Must be 0, 1, 2, or 3.`);
        }
        result = cards[seatOpt] || [];
      } else {
        result = cards;
      }
    } else {
      result = deals.map((d) => {
        const cards = inferPlayerCards(d, ruleset);
        if (seatOpt !== null) {
          return cards[seatOpt] || [];
        }
        return cards;
      });
    }

    const outputJson = compact ? JSON.stringify(result) : JSON.stringify(result, null, 2);

    if (outputFile) {
      const resolvedOut = path.resolve(outputFile);
      fs.writeFileSync(resolvedOut, outputJson, "utf8");
      console.log(`Successfully wrote playerCards to "${resolvedOut}"`);
    } else {
      console.log(outputJson);
    }
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

