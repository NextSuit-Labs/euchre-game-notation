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

import { unpackDeal } from "../bitpacker";
import { Deal, EgnFile, Metadata } from "../types";
import { validateEgn } from "../validator";
import { compileDealSteps } from "./rules";

function getFs(): any {
  if (typeof require !== "undefined") {
    try {
      return require("fs");
    } catch {
      // ignore
    }
  }
  return null;
}

/**
 * Calculates the score change ([Team 0/2 change, Team 1/3 change]) resulting from a single deal.
 * Unpacks the deal if provided as a condensed base64 string.
 */
export function calculateDealScoreChange(
  deal: Deal | string,
  metadata: Partial<Metadata> = {},
  dealIndex = 0
): [number, number] {
  const unpackedDeal: Deal = typeof deal === "string" ? unpackDeal(deal, dealIndex) : deal;
  const compiledSteps = compileDealSteps(unpackedDeal, metadata);
  if (compiledSteps.length > 0 && compiledSteps[0].scoreChange) {
    return compiledSteps[0].scoreChange;
  }
  return [0, 0];
}

/**
 * Simulates through all deals in an EGN file from the initial score,
 * returning the final cumulative score: [Team 0/2 score, Team 1/3 score].
 */
export function calculateFinalScore(egn: EgnFile): [number, number] {
  const initialScore: [number, number] =
    Array.isArray(egn.metadata?.initialScore) && egn.metadata.initialScore.length === 2
      ? [egn.metadata.initialScore[0], egn.metadata.initialScore[1]]
      : [0, 0];

  let currentScore: [number, number] = [initialScore[0], initialScore[1]];

  if (Array.isArray(egn.deals)) {
    egn.deals.forEach((deal, idx) => {
      const delta = calculateDealScoreChange(deal, egn.metadata, idx);
      currentScore = [currentScore[0] + delta[0], currentScore[1] + delta[1]];
    });
  }

  return currentScore;
}

/**
 * Plays through an EGN file with the rules engine, calculates the final score,
 * and sets or updates `metadata.finalScore`. Returns the updated EgnFile.
 * Validates the updated EGN file against the schema.
 */
export function addFinalScoreToEgn<T extends EgnFile = EgnFile>(egn: T): T {
  const cloned: T = JSON.parse(JSON.stringify(egn));

  if (!cloned.metadata) {
    throw new Error("Cannot add finalScore: EGN file is missing metadata object.");
  }

  const finalScore = calculateFinalScore(cloned);
  cloned.metadata.finalScore = [finalScore[0], finalScore[1]];

  const validation = validateEgn(cloned);
  if (!validation.isValid) {
    const errorDetails = validation.errors?.map((e) => `${e.instancePath || "/"} ${e.message}`).join("; ");
    throw new Error(`Updated EGN failed schema validation: ${errorDetails || "Unknown schema error"}`);
  }

  return cloned;
}

/**
 * Reads an EGN file from disk, calculates the final score by playing through all deals,
 * updates `metadata.finalScore`, and optionally writes it to `outputPath` (or `inputPath` if in-place).
 * Returns the updated EgnFile object.
 */
export function addFinalScoreToEgnFile(inputPath: string, outputPath?: string): EgnFile {
  const fs = getFs();
  if (!fs || !fs.existsSync || !fs.readFileSync || !fs.writeFileSync) {
    throw new Error("addFinalScoreToEgnFile requires a Node.js environment with filesystem access.");
  }

  if (!fs.existsSync(inputPath)) {
    throw new Error(`EGN file not found at path: ${inputPath}`);
  }

  const rawJson = fs.readFileSync(inputPath, "utf8");
  const parsed = JSON.parse(rawJson) as EgnFile;
  const updated = addFinalScoreToEgn(parsed);

  const targetPath = outputPath || inputPath;
  if (outputPath || outputPath === inputPath) {
    fs.writeFileSync(targetPath, JSON.stringify(updated, null, 2) + "\n", "utf8");
  }

  return updated;
}
