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
import { SCHEMA_VERSION } from "../version";
import { convertToBaselineGame, hashBaselineGame } from "../hashing";

// Re-export core modules
export * from "../types";
export * from "../validator";
export * from "../converter";
export * from "../bitpacker";
export * from "../version";
export * from "../bitstream";
export * from "../hashing";
export * from "../card-encoding";
export * from "../match-engine";
export * from "../engine";
export * as emn from "../emn";
export * from "../emn";

/**
 * Baseline conversion for browser workbench. Strips analysis annotations and alternative lines.
 */
export function convertToBaselineEgn(value: unknown): unknown {
  return convertToBaselineGame(value);
}

/**
 * Generates a SHA-256 hash of the baseline EGN.
 */
export function hashBaselineEgn(egn: EgnFile): string {
  return hashBaselineGame(egn, convertToBaselineEgn);
}

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
        matchId: "gameId",
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
        loner_lead: "loner_lead",
        min_rank: "min_rank",
        winning_score: "winning_score",
        loner_march_score: "loner_march_score",
        loner_euchred_score: "loner_euchred_score",
        defend_alone: "defend_alone",
        num_players: "num_players",
        allow_no_trump: "allow_no_trump",
        fast_break: "fast_break",
        four_trick_tokens: "four_trick_tokens",
        go_under: "go_under",
        max_deals: "num_deals",
        num_deals: "num_deals",
        partners_best: "partners_best",
        farmers: "farmers",
        joker: "joker",
        canadian: "canadian",
        std: "std",
        player_ids: "playerIds",
        playerIds: "playerIds",
      }[key] || key;

    upgraded[newKey] = upgradeObject(value);
  }

  return upgraded;
}

export function upgradeEgn(jsonString: string): string;
export function upgradeEgn(data: EgnFile): EgnFile;
export function upgradeEgn(input: string | EgnFile): string | EgnFile {
  const parsed: any = typeof input === "string" ? JSON.parse(input) : input;

  if (parsed.version) {
    parsed.version = SCHEMA_VERSION;
  }

  const upgraded = upgradeObject(parsed);

  if (Array.isArray(upgraded.deals)) {
    upgraded.deals.forEach((deal: any) => {
      const normalizePhases = (phases: any[]) => {
        if (Array.isArray(phases)) {
          phases.forEach((ph: any, idx: number) => {
            if (ph.type === "EUCHRE_BIDDING") {
              ph.phaseNumber = 0;
            } else if (ph.type === "TRICK_PLAY" || ph.type === "TRICK_PLAY_PHASE") {
              ph.phaseNumber = 1;
              delete ph.isAlone;
              delete ph.is_alone;
              delete ph.aloneDefender;
              delete ph.alone_defender;
              delete ph.initialLead;
              delete ph.initial_lead;
            } else if (typeof ph.phaseNumber === "number" && ph.phaseNumber > 0 && phases.length <= 2) {
              ph.phaseNumber = idx;
            }
          });
        }
      };

      if (deal && typeof deal === "object") {
        normalizePhases(deal.phases);
        if (Array.isArray(deal.alternativeLines)) {
          deal.alternativeLines.forEach((alt: any) => {
            if (alt && typeof alt === "object") {
              normalizePhases(alt.phases);
            }
          });
        }
      }
    });
  }

  return typeof input === "string" ? JSON.stringify(upgraded, null, 2) : upgraded as EgnFile;
}
