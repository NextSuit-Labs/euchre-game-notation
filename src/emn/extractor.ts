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

import { EmnFile } from "./types";
import { EgnFile } from "../types";
import { validateEgn } from "../validator";

function buildPlayerMap(emnFile: EmnFile): Map<string, string> {
  const masterPlayers = emnFile.metadata.players || [];
  const playerMap = new Map<string, string>();
  masterPlayers.forEach((p) => {
    playerMap.set(p.id, p.name);
  });
  return playerMap;
}

function extractSingle(
  emnFile: EmnFile,
  gameIndex: number,
  playerMap: Map<string, string>
): EgnFile {
  const game = emnFile.games.find((g) => g.gameIndex === gameIndex);
  if (!game) {
    throw new Error(`Game index ${gameIndex} not found in the EMN file.`);
  }

  // Clone the gameData to avoid mutating the original
  const egn: EgnFile = JSON.parse(JSON.stringify(game.gameData));

  // Resolve player names for the game using the EMN game's players mapping
  // game.playersOverride maps seat 0-3 to master player IDs.
  const seatPlayerNames = game.playersOverride.map((pid) => {
    const name = playerMap.get(pid);
    if (!name) {
      throw new Error(`Master player ID "${pid}" in game index ${gameIndex} could not be resolved.`);
    }
    return name;
  });

  if (!egn.metadata) {
    egn.metadata = {} as any;
  }
  egn.metadata.players = seatPlayerNames;

  const validation = validateEgn(egn);
  if (!validation.isValid) {
    throw new Error(`Extracted EGN for game index ${gameIndex} is invalid: ${JSON.stringify(validation.errors)}`);
  }

  return egn;
}

/**
 * Extracts a single EGN file from an EMN file by game index (0-based),
 * performing player name replacements based on the master players registry.
 */
export function extractEgnFromEmn(emnFile: EmnFile, gameIndex: number): EgnFile {
  if (gameIndex < 0 || gameIndex >= emnFile.games.length) {
    throw new Error(`Game index ${gameIndex} out of bounds for match containing ${emnFile.games.length} games.`);
  }
  const playerMap = buildPlayerMap(emnFile);
  return extractSingle(emnFile, gameIndex, playerMap);
}

/**
 * Extracts all EGN files from an EMN file, performing player name replacements
 * based on the master players registry. Returns an array of EgnFile.
 */
export function extractAllEgnsFromEmn(emnFile: EmnFile): EgnFile[] {
  const playerMap = buildPlayerMap(emnFile);
  const sortedGames = [...emnFile.games].sort((a, b) => a.gameIndex - b.gameIndex);
  return sortedGames.map((g) => extractSingle(emnFile, g.gameIndex, playerMap));
}
