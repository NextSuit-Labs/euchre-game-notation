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

import { sha256 as nobleSha256 } from "@noble/hashes/sha2";
import { bytesToHex } from "@noble/hashes/utils.js";

/** SHA-256 hex digest — works in both Node.js and browser environments. */
const sha256 = (message: string): string => bytesToHex(nobleSha256(message));

/** Standard TGN analysis/annotation property names stripped during baseline conversion */
export const DEFAULT_TGN_ANALYSIS_KEYS = new Set<string>([
  "alternativeLines",
  "alternative_lines",
  "calls_annotations",
  "callAnnotations",
  "tricks_annotations",
  "tricksAnnotations",
  "playAnnotations",
  "annotations",
  "notes",
  "tags"
]);

/**
 * Generic baseline converter function signature.
 */
export type BaselineConverterFn = (gameObj: unknown) => unknown;

/**
 * Deterministic JSON stringifier with sorted keys for canonical hashing.
 */
export function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }

  if (value && typeof value === "object" && value !== null) {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => (a === b ? 0 : a < b ? -1 : 1))
      .map(([key, child]) => `${JSON.stringify(key)}:${stableStringify(child)}`);
    return `{${entries.join(",")}}`;
  }

  return JSON.stringify(value);
}

/**
 * Recursively converts a game object into a baseline object by stripping analysis annotations,
 * alternative lines, and commentary properties.
 */
export function convertToBaselineGame(
  value: unknown,
  analysisKeys: Set<string> | string[] = DEFAULT_TGN_ANALYSIS_KEYS
): unknown {
  const keySet = Array.isArray(analysisKeys) ? new Set(analysisKeys) : analysisKeys;

  if (Array.isArray(value)) {
    return value
      .map((item) => convertToBaselineGame(item, keySet))
      .filter((item) => item !== undefined)
      .filter((item) => {
        if (Array.isArray(item) && item.length === 0) return false;
        if (item && typeof item === "object" && item !== null && Object.keys(item as Record<string, unknown>).length === 0) return false;
        return true;
      });
  }

  if (value && typeof value === "object" && value !== null) {
    const stripped: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (keySet.has(key)) {
        continue;
      }

      const strippedChild = convertToBaselineGame(child, keySet);
      if (strippedChild === undefined) {
        continue;
      }

      if (Array.isArray(strippedChild) && strippedChild.length === 0) {
        continue;
      }

      if (strippedChild && typeof strippedChild === "object" && strippedChild !== null && Object.keys(strippedChild as Record<string, unknown>).length === 0) {
        continue;
      }

      stripped[key] = strippedChild;
    }
    return stripped;
  }

  return value;
}

/**
 * Generates a deterministic SHA-256 hex hash of a full game notation object (including all annotations,
 * alternative lines, and metadata). Uses key sorting for canonical hashing.
 */
export function hashGame(gameObj: unknown): string {
  const canonical = stableStringify(gameObj);
  return sha256(canonical);
}

/**
 * Alias for hashGame. Generates a SHA-256 hash of the complete game notation object.
 */
export const hashFullGame = hashGame;

/**
 * Generates a SHA-256 hash of a baseline game notation object using a baseline converter function.
 * Defaults to convertToBaselineGame.
 */
export function hashBaselineGame(
  gameObj: unknown,
  converter: BaselineConverterFn = convertToBaselineGame
): string {
  const baselineObj = converter(gameObj);
  const canonical = stableStringify(baselineObj);
  return sha256(canonical);
}

/** EGN-specific aliases for backward compatibility */
export const hashEgn = hashGame;
export const hashFullEgn = hashFullGame;
