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
import { EgnFile, Player, PlayerObject } from "../types";
import { EmnFile, MatchPlayer, MatchType, MatchResult } from "./types";
import { validateEmn } from "./validator";

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

function getPlayerKey(p: Player): { name: string; key: string; playerObj: PlayerObject } {
  if (typeof p === "string") {
    const normalizedKey = p.trim().toLowerCase();
    return { name: p, key: normalizedKey, playerObj: { name: p } };
  } else {
    const key = p.playerIds && p.playerIds.length > 0
      ? `${p.playerIds[0].source.trim().toLowerCase()}:${p.playerIds[0].id.trim().toLowerCase()}`
      : p.name.trim().toLowerCase();
    return { name: p.name, key, playerObj: p };
  }
}

export function combineEgnToEmn(
  egnFiles: EgnFile[],
  options: {
    format?: MatchType;
    target?: number;
    title?: string;
    description?: string;
  } = {}
): EmnFile {
  const masterPlayerMap = new Map<string, MatchPlayer>();
  const playerKeyToId = new Map<string, string>();
  let playerCounter = 1;

  // 1. Extract unique players across all games
  egnFiles.forEach((egn) => {
    const players = egn.metadata.players || [];
    players.forEach((p) => {
      const { name, key, playerObj } = getPlayerKey(p);
      if (!playerKeyToId.has(key)) {
        const id = `p-${String(playerCounter++).padStart(2, "0")}`;
        playerKeyToId.set(key, id);
        masterPlayerMap.set(id, {
          id,
          name,
          playerIds: playerObj.playerIds || [{ id, source: "emn-combine" }],
        });
      }
    });
  });

  const masterPlayers = Array.from(masterPlayerMap.values());

  // 2. Build game entries
  const games = egnFiles.map((egn, idx) => {
    const gamePlayers = egn.metadata.players || [];
    const seatPlayerIds: string[] = [];

    for (let seat = 0; seat < 4; seat++) {
      const p = gamePlayers[seat];
      if (p) {
        const { key } = getPlayerKey(p);
        const mappedId = playerKeyToId.get(key);
        if (mappedId) {
          seatPlayerIds.push(mappedId);
        } else {
          seatPlayerIds.push(masterPlayers[seat % masterPlayers.length]?.id || `p-01`);
        }
      } else {
        seatPlayerIds.push(masterPlayers[seat % masterPlayers.length]?.id || `p-01`);
      }
    }

    return {
      gameIndex: idx,
      players: seatPlayerIds as [string, string, string, string],
      gameData: egn,
    };
  });

  // 3. Infer result if sub-EGN files contain metadata.finalScore
  let computedResult: MatchResult | undefined = undefined;
  const gamesWithFinalScore = egnFiles.filter(
    (egn) => egn.metadata && Array.isArray(egn.metadata.finalScore) && egn.metadata.finalScore.length === 2
  );

  if (gamesWithFinalScore.length === egnFiles.length && egnFiles.length > 0) {
    const formatType = options.format || "BEST_OF_N";
    const scores: Record<string, number> = {};
    masterPlayers.forEach((p) => {
      scores[p.id] = 0;
    });

    // Check for win condition consistency across games
    const numDealsFlags = egnFiles.map((egn) =>
      Boolean(egn.metadata?.ruleset && typeof egn.metadata.ruleset.num_deals === "number" && egn.metadata.ruleset.num_deals > 0)
    );
    if (numDealsFlags.some((f) => f) && numDealsFlags.some((f) => !f)) {
      console.warn("Warning: Match contains mixed game completion conditions (some num_deals games and some target score games).");
    }

    games.forEach((game, idx) => {
      const egn = egnFiles[idx];
      const finalScore = egn.metadata.finalScore!;
      const team0Score = finalScore[0];
      const team1Score = finalScore[1];
      const ruleset = egn.metadata.ruleset;

      const isNumDeals = Boolean(
        formatType === "PROGRESSIVE" ||
        (ruleset && typeof ruleset.num_deals === "number" && ruleset.num_deals > 0)
      );

      if (isNumDeals) {
        // Num-deals mode: Add individual points earned in the game to participants
        scores[game.players[0]] = (scores[game.players[0]] || 0) + team0Score;
        scores[game.players[2]] = (scores[game.players[2]] || 0) + team0Score;

        scores[game.players[1]] = (scores[game.players[1]] || 0) + team1Score;
        scores[game.players[3]] = (scores[game.players[3]] || 0) + team1Score;
      } else {
        // Game-to-10 / Target Score mode: Add 1 game win to each participant on winning team
        if (team0Score > team1Score) {
          scores[game.players[0]] = (scores[game.players[0]] || 0) + 1;
          scores[game.players[2]] = (scores[game.players[2]] || 0) + 1;
        } else if (team1Score > team0Score) {
          scores[game.players[1]] = (scores[game.players[1]] || 0) + 1;
          scores[game.players[3]] = (scores[game.players[3]] || 0) + 1;
        }
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const winners = Object.keys(scores).filter((id) => scores[id] === maxScore && maxScore > 0);

    computedResult = {
      status: "COMPLETED",
      winner: winners,
      scores,
    };
  }

  const emnFile: EmnFile = {
    fileType: "Euchre Match Notation",
    version: "1.0",
    metadata: {
      title: options.title || "Combined Euchre Match",
      description: options.description,
      date: new Date().toISOString(),
      players: masterPlayers,
      matchFormat: {
        type: options.format || "BEST_OF_N",
        target: options.target,
      },
      result: computedResult,
    },
    games,
  };

  const validation = validateEmn(emnFile);
  if (!validation.isValid) {
    throw new Error(`Combined EMN validation failed: ${JSON.stringify(validation.errors)}`);
  }

  return emnFile;
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
