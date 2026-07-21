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

import { EgnFile, PlayerObject, PlayerId } from "../types";

export type MatchType =
  | "BEST_OF_N"
  | "PROGRESSIVE"
  | "ROUND_ROBIN"
  | "CUSTOM"
  | "FIXED_GAMES"
  | "TARGET_SCORE"
  | "ELIMINATION"
  | "SWISS"
  | "TIMED"
  | "SINGLE_GAME";

export interface MatchFormat {
  type: MatchType;
  target?: number;
}

export type MatchStatus = "COMPLETED" | "IN_PROGRESS" | "FORFEIT" | "DRAW";

export interface MatchResult {
  status?: MatchStatus;
  winner?: string[];
  scores?: Record<string, number>;
}

export interface MatchPlayer extends PlayerObject {
  id: string; // Authoritative master player ID (e.g. "p-01")
  name: string;
  playerIds?: PlayerId[];
}

export interface MatchMetadata {
  matchId?: string;
  title?: string;
  description?: string;
  date?: string;
  players: MatchPlayer[];
  matchFormat?: MatchFormat;
  result?: MatchResult;
}

export interface EmnGameEntry {
  gameIndex: number;
  players: [string, string, string, string]; // Exactly 4 player IDs [Seat 0: North, Seat 1: East, Seat 2: South, Seat 3: West]
  gameData: EgnFile;
}

export interface EmnFile {
  fileType: "Euchre Match Notation";
  version: string;
  metadata: MatchMetadata;
  games: EmnGameEntry[];
}
