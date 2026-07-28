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

import { EgnFile, Player, PlayerObject } from "../types";
import { EmnFile, MatchPlayer, MatchType, MatchResult } from "./types";
import { validateEmn } from "./validator";

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

/**
 * Combines multiple sub-EGN files into a unified Euchre Match Notation (.emn) structure.
 * This function runs entirely in-memory and is safe to use in browser/web environments.
 */
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
    const players = egn.metadata?.players || [];
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
    const gamePlayers = egn.metadata?.players || [];
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
      playersOverride: seatPlayerIds as [string, string, string, string],
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
        scores[game.playersOverride[0]] = (scores[game.playersOverride[0]] || 0) + team0Score;
        scores[game.playersOverride[2]] = (scores[game.playersOverride[2]] || 0) + team0Score;

        scores[game.playersOverride[1]] = (scores[game.playersOverride[1]] || 0) + team1Score;
        scores[game.playersOverride[3]] = (scores[game.playersOverride[3]] || 0) + team1Score;
      } else {
        // Game-to-10 / Target Score mode: Add 1 game win to each participant on winning team
        if (team0Score > team1Score) {
          scores[game.playersOverride[0]] = (scores[game.playersOverride[0]] || 0) + 1;
          scores[game.playersOverride[2]] = (scores[game.playersOverride[2]] || 0) + 1;
        } else if (team1Score > team0Score) {
          scores[game.playersOverride[1]] = (scores[game.playersOverride[1]] || 0) + 1;
          scores[game.playersOverride[3]] = (scores[game.playersOverride[3]] || 0) + 1;
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
    version: "1.1",
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
