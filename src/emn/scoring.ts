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

import { EgnFile } from "../types";
import { calculateFinalScore } from "../engine/scoring";
import { EmnFile, MatchResult, MatchStatus, MatchType } from "./types";
import { validateEmn } from "./validator";

export interface GameScoreSummary {
  gameIndex: number;
  finalScore: [number, number];
  winnerSeats: number[];
  winningPlayerIds: string[];
}

export interface EmnScoreResult extends MatchResult {
  status: MatchStatus;
  winner: string[];
  scores: Record<string, number>;
  teamScores?: Record<string, number>;
  gameScores: GameScoreSummary[];
}

/**
 * Calculates match scores and standings across all sub-games in an EMN match file.
 * Evaluates individual player points or game win tallies, team scores, and overall match winners.
 * Works seamlessly in both Node.js and browser environments.
 */
export function calculateEmnScores(input: EmnFile | string): EmnScoreResult {
  const emn: EmnFile = typeof input === "string" ? JSON.parse(input) : input;

  if (!emn || typeof emn !== "object") {
    throw new Error("Invalid EMN input: expected an EmnFile object or JSON string.");
  }

  const masterPlayers = emn.metadata?.players || [];
  const teams = emn.metadata?.teams || [];
  const formatType: MatchType = emn.metadata?.matchFormat?.type || "BEST_OF_N";
  const target = emn.metadata?.matchFormat?.target;

  const scores: Record<string, number> = {};
  masterPlayers.forEach((p) => {
    if (p && p.id) {
      scores[p.id] = 0;
    }
  });

  const teamScores: Record<string, number> = {};
  teams.forEach((t) => {
    if (t && t.id) {
      teamScores[t.id] = 0;
    }
  });

  const gameScores: GameScoreSummary[] = [];
  const games = Array.isArray(emn.games) ? emn.games : [];

  games.forEach((game, idx) => {
    const gameIndex = typeof game.gameIndex === "number" ? game.gameIndex : idx;
    const seatPlayers = Array.isArray(game.playersOverride)
      ? game.playersOverride
      : [
          masterPlayers[0]?.id || "p-01",
          masterPlayers[1]?.id || "p-02",
          masterPlayers[2]?.id || "p-03",
          masterPlayers[3]?.id || "p-04",
        ];

    // Ensure player entries exist in scores
    seatPlayers.forEach((pid) => {
      if (pid && scores[pid] === undefined) {
        scores[pid] = 0;
      }
    });

    let finalScore: [number, number] = [0, 0];
    const gameData = game.gameData;
    if (gameData) {
      if (
        gameData.metadata &&
        Array.isArray(gameData.metadata.finalScore) &&
        gameData.metadata.finalScore.length === 2 &&
        typeof gameData.metadata.finalScore[0] === "number" &&
        typeof gameData.metadata.finalScore[1] === "number"
      ) {
        finalScore = [gameData.metadata.finalScore[0], gameData.metadata.finalScore[1]];
      } else if (Array.isArray(gameData.deals) && gameData.deals.length > 0) {
        try {
          finalScore = calculateFinalScore(gameData as EgnFile);
        } catch {
          finalScore = [0, 0];
        }
      }
    }

    const ruleset = gameData?.metadata?.ruleset;
    const isNumDeals = Boolean(
      formatType === "PROGRESSIVE" ||
      (ruleset && typeof ruleset.num_deals === "number" && ruleset.num_deals > 0)
    );

    const team0Score = finalScore[0];
    const team1Score = finalScore[1];

    let winnerSeats: number[] = [];
    let winningPlayerIds: string[] = [];

    if (team0Score > team1Score) {
      winnerSeats = [0, 2];
      if (seatPlayers[0]) winningPlayerIds.push(seatPlayers[0]);
      if (seatPlayers[2]) winningPlayerIds.push(seatPlayers[2]);
    } else if (team1Score > team0Score) {
      winnerSeats = [1, 3];
      if (seatPlayers[1]) winningPlayerIds.push(seatPlayers[1]);
      if (seatPlayers[3]) winningPlayerIds.push(seatPlayers[3]);
    }

    if (isNumDeals) {
      // Progressive / num_deals format: Accumulate points scored
      if (seatPlayers[0]) scores[seatPlayers[0]] = (scores[seatPlayers[0]] || 0) + team0Score;
      if (seatPlayers[2]) scores[seatPlayers[2]] = (scores[seatPlayers[2]] || 0) + team0Score;
      if (seatPlayers[1]) scores[seatPlayers[1]] = (scores[seatPlayers[1]] || 0) + team1Score;
      if (seatPlayers[3]) scores[seatPlayers[3]] = (scores[seatPlayers[3]] || 0) + team1Score;

      teams.forEach((t) => {
        if (t.playerIds && t.playerIds.length > 0) {
          const hasT0 = t.playerIds.includes(seatPlayers[0]) || t.playerIds.includes(seatPlayers[2]);
          const hasT1 = t.playerIds.includes(seatPlayers[1]) || t.playerIds.includes(seatPlayers[3]);
          if (hasT0) teamScores[t.id] = (teamScores[t.id] || 0) + team0Score;
          if (hasT1) teamScores[t.id] = (teamScores[t.id] || 0) + team1Score;
        }
      });
    } else {
      // Game-to-10 / Match play: Accumulate game wins
      if (team0Score > team1Score) {
        if (seatPlayers[0]) scores[seatPlayers[0]] = (scores[seatPlayers[0]] || 0) + 1;
        if (seatPlayers[2]) scores[seatPlayers[2]] = (scores[seatPlayers[2]] || 0) + 1;
      } else if (team1Score > team0Score) {
        if (seatPlayers[1]) scores[seatPlayers[1]] = (scores[seatPlayers[1]] || 0) + 1;
        if (seatPlayers[3]) scores[seatPlayers[3]] = (scores[seatPlayers[3]] || 0) + 1;
      }

      teams.forEach((t) => {
        if (t.playerIds && t.playerIds.length > 0) {
          const hasT0 = t.playerIds.includes(seatPlayers[0]) || t.playerIds.includes(seatPlayers[2]);
          const hasT1 = t.playerIds.includes(seatPlayers[1]) || t.playerIds.includes(seatPlayers[3]);
          if (hasT0 && team0Score > team1Score) {
            teamScores[t.id] = (teamScores[t.id] || 0) + 1;
          } else if (hasT1 && team1Score > team0Score) {
            teamScores[t.id] = (teamScores[t.id] || 0) + 1;
          }
        }
      });
    }

    gameScores.push({
      gameIndex,
      finalScore,
      winnerSeats,
      winningPlayerIds,
    });
  });

  const scoreValues = Object.values(scores);
  const maxScore = scoreValues.length > 0 ? Math.max(...scoreValues) : 0;
  const winners = maxScore > 0
    ? Object.keys(scores).filter((id) => scores[id] === maxScore)
    : [];

  let status: MatchStatus = games.length > 0 && winners.length > 0 ? "COMPLETED" : "IN_PROGRESS";

  // Check target if provided (e.g. BEST_OF_N or TARGET_SCORE)
  if (target && target > 0) {
    if (formatType === "BEST_OF_N") {
      const winsNeeded = Math.ceil(target / 2);
      const targetReached = winners.some((w) => scores[w] >= winsNeeded);
      status = targetReached ? "COMPLETED" : games.length >= target ? "COMPLETED" : "IN_PROGRESS";
    } else if (formatType === "TARGET_SCORE") {
      const targetReached = winners.some((w) => scores[w] >= target);
      status = targetReached ? "COMPLETED" : "IN_PROGRESS";
    }
  }

  const result: EmnScoreResult = {
    status,
    winner: winners,
    scores,
    gameScores,
  };

  if (teams.length > 0) {
    result.teamScores = teamScores;
  }

  return result;
}

/**
 * Calculates match standings and updates the `metadata.result` in an EMN file.
 * Returns the updated EmnFile and validates against schema.
 */
export function addScoresToEmn<T extends EmnFile = EmnFile>(emn: T): T {
  const cloned: T = JSON.parse(JSON.stringify(emn));

  if (!cloned.metadata) {
    throw new Error("Cannot add scores: EMN file is missing metadata object.");
  }

  const calc = calculateEmnScores(cloned);
  cloned.metadata.result = {
    status: calc.status,
    winner: calc.winner,
    scores: calc.scores,
  };

  const validation = validateEmn(cloned);
  if (!validation.isValid) {
    const errorDetails = validation.errors?.map((e) => `${e.instancePath || "/"} ${e.message}`).join("; ");
    throw new Error(`Updated EMN failed schema validation: ${errorDetails || "Unknown schema error"}`);
  }

  return cloned;
}
