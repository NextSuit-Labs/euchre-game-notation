#!/usr/bin/env node
import * as fs from "fs";
import { PACKAGE_VERSION, SCHEMA_VERSION } from "./version";

function showHelp() {
  console.log(`
EGN File Upgrade CLI (v${PACKAGE_VERSION})

Upgrades older EGN files to current version format by:
  - Renaming snake_case properties to camelCase
  - Removing redundant fields (kitty, initialLead)
  - Supporting backward compatibility with v1.0.0 and v1.1.0 formats

Usage:
  egn-upgrade <input-file> [output-file]

Examples:
  egn-upgrade old-game.egn                    # Updates in place
  egn-upgrade old-game.egn new-game.egn       # Saves to new file

Options:
  --help, -h      Show this help message
  --version, -v   Show version information
`);
}

/**
 * Recursively upgrade an object from old format to current version format.
 * Handles snake_case -> camelCase conversion and field removals.
 */
function upgradeObject(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => upgradeObject(item));
  }

  const upgraded: any = {};

  for (const [key, value] of Object.entries(obj)) {
    // Skip removed fields
    if (key === "kitty" 
        || key === "initialLead"
        || key === "timings"
        || key === "views"
        || key === "layouts"
        || key === "videoUrl"
        || key === "viewSwitches"
        || key === "screens") {
      continue;
    }

    // Rename snake_case to camelCase
    const newKey =
      {
        calls_annotations: "callAnnotations",
        tricks_annotations: "playAnnotations",
        player_cards: "playerCards",
        card_exchanges: "cardExchanges",
        match_id: "gameId",
        matchId: "gameId", // In case it's already in transition
        initial_score: "initialScore",
        initialScore: "initialScore",
        initial_state: "initialState",
        initialState: "initialState",
        phase_number: "phaseNumber",
        phaseNumber: "phaseNumber",
        is_alone: "isAlone",
        isAlone: "isAlone",
        alone_defender: "aloneDefender",
        aloneDefender: "aloneDefender",
        play_annotations: "playAnnotations",
        playAnnotations: "playAnnotations",
        alternative_lines: "alternativeLines",
        alternativeLines: "alternativeLines",
        branch_index: "branchIndex",
        branchIndex: "branchIndex",
        up_card: "upCard",
        upCard: "upCard",
        file_type: "fileType",
        fileType: "fileType",
        loner_lead: "loner_lead", // Keep in ruleset (no change)
        min_rank: "min_rank", // Keep in ruleset (no change)
        winning_score: "winning_score", // Keep in ruleset (no change)
        loner_march_score: "loner_march_score", // Keep in ruleset (no change)
        loner_euchred_score: "loner_euchred_score", // Keep in ruleset (no change)
        defend_alone: "defend_alone", // Keep in ruleset (no change)
        num_players: "num_players", // Keep in ruleset (no change)
        allow_no_trump: "allow_no_trump", // Keep in ruleset (no change)
        fast_break: "fast_break", // Keep in ruleset (no change)
        four_trick_tokens: "four_trick_tokens", // Keep in ruleset (no change)
        go_under: "go_under", // Keep in ruleset (no change)
        partners_best: "partners_best", // Keep in ruleset (no change)
        farmers: "farmers", // Keep in ruleset (no change)
        joker: "joker", // Keep in ruleset (no change)
        canadian: "canadian", // Keep in ruleset (no change)
        std: "std", // Keep in ruleset (no change)
        player_ids: "playerIds",
        playerIds: "playerIds",
      }[key] || key;

    upgraded[newKey] = upgradeObject(value);
  }

  return upgraded;
}

function upgradeEgn(jsonString: string): string {
  const parsed = JSON.parse(jsonString);

  // Update version to current version
  if (parsed.version) {
    parsed.version = SCHEMA_VERSION;
  }

  // Recursively upgrade all properties
  const upgraded = upgradeObject(parsed);

  return JSON.stringify(upgraded, null, 2);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes("--version") || args.includes("-v")) {
    console.log(`EGN Upgrade v${PACKAGE_VERSION}`);
    process.exit(0);
  }

  if (args.includes("--help") || args.includes("-h") || args.length < 1) {
    showHelp();
    process.exit(0);
  }

  const positionals = args.filter((arg) => !arg.startsWith("-"));

  if (positionals.length < 1) {
    console.error("Error: Missing input file path.");
    showHelp();
    process.exit(1);
  }

  const inputPath = positionals[0];
  const outputPath = positionals[1] || inputPath; // Default to in-place upgrade

  // Read input file
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  try {
    const inputData = fs.readFileSync(inputPath, "utf8");
    const upgradedData = upgradeEgn(inputData);

    // Write output file
    fs.writeFileSync(outputPath, upgradedData, "utf8");

    if (inputPath === outputPath) {
      console.log(`✓ Successfully upgraded: ${inputPath}`);
    } else {
      console.log(`✓ Successfully upgraded: ${inputPath} → ${outputPath}`);
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.error(`Error: Invalid JSON in input file: ${err.message}`);
    } else if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error("Error: An unknown error occurred");
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { upgradeEgn };
