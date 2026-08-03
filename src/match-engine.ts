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

export interface GenericMatchPlayer {
  id: string;
  name: string;
  playerIds?: Array<{ id: string; source: string }>;
}

export interface GenericGameData {
  fileType: string;
  metadata?: {
    players?: any[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface GenericMatchGameEntry<TGame = GenericGameData> {
  gameIndex: number;
  playersOverride: string[];
  gameData: TGame;
}

export interface GenericMatchFile<TGame = GenericGameData> {
  fileType: string;
  version: string;
  metadata: {
    matchId?: string;
    title?: string;
    description?: string;
    players?: GenericMatchPlayer[];
    [key: string]: unknown;
  };
  games: GenericMatchGameEntry<TGame>[];
}

/**
 * Extracts a single game from a match series file by game index (0-based),
 * resolving player seat IDs back to master player names.
 */
export function extractGameFromMatch<TGame extends GenericGameData = GenericGameData>(
  matchFile: GenericMatchFile<TGame>,
  gameIndex: number,
  validator?: (game: TGame) => { isValid: boolean; errors?: any }
): TGame {
  if (gameIndex < 0 || gameIndex >= matchFile.games.length) {
    throw new Error(`Game index ${gameIndex} out of bounds for match containing ${matchFile.games.length} games.`);
  }

  const gameEntry = matchFile.games.find((g) => g.gameIndex === gameIndex);
  if (!gameEntry) {
    throw new Error(`Game index ${gameIndex} not found in the match file.`);
  }

  const masterPlayers = matchFile.metadata?.players || [];
  const playerMap = new Map<string, string>();
  masterPlayers.forEach((p) => {
    playerMap.set(p.id, p.name);
  });

  const game: TGame = JSON.parse(JSON.stringify(gameEntry.gameData));

  if (Array.isArray(gameEntry.playersOverride)) {
    const seatPlayerNames = gameEntry.playersOverride.map((pid) => {
      const name = playerMap.get(pid);
      if (!name) {
        throw new Error(`Master player ID "${pid}" in game index ${gameIndex} could not be resolved.`);
      }
      return name;
    });

    if (!game.metadata) {
      game.metadata = {};
    }
    game.metadata.players = seatPlayerNames;
  }

  if (validator) {
    const validation = validator(game);
    if (!validation.isValid) {
      throw new Error(`Extracted game for index ${gameIndex} is invalid: ${JSON.stringify(validation.errors)}`);
    }
  }

  return game;
}

/**
 * Extracts all games from a match series file, resolving player seat IDs to master player names.
 */
export function extractAllGamesFromMatch<TGame extends GenericGameData = GenericGameData>(
  matchFile: GenericMatchFile<TGame>,
  validator?: (game: TGame) => { isValid: boolean; errors?: any }
): TGame[] {
  const sortedGames = [...matchFile.games].sort((a, b) => a.gameIndex - b.gameIndex);
  return sortedGames.map((g) => extractGameFromMatch(matchFile, g.gameIndex, validator));
}
