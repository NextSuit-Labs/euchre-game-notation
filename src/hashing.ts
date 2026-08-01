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

import * as crypto from "crypto";
import { EgnFile } from "./types";
import { convertToBaselineEgn } from "./cli-baseline-egn";

/**
 * Deterministic JSON stringifier with sorted keys for canonical hashing.
 */
export function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, child]) => `${JSON.stringify(key)}:${stableStringify(child)}`);
    return `{${entries.join(",")}}`;
  }

  return JSON.stringify(value);
}

/**
 * Generates a deterministic SHA-256 hex hash of the full EGN file (including all annotations,
 * alternative lines, and metadata). Uses key sorting for canonical hashing.
 */
export function hashEgn(egn: EgnFile): string {
  const canonical = stableStringify(egn);
  return crypto.createHash("sha256").update(canonical).digest("hex");
}

/**
 * Alias for hashEgn. Generates a SHA-256 hash of the complete EGN file.
 */
export const hashFullEgn = hashEgn;

/**
 * Generates a SHA-256 hash of the baseline EGN (with all analysis annotations and alternative lines stripped).
 */
export function hashBaselineEgn(egn: EgnFile): string {
  const baselineObj = convertToBaselineEgn(egn);
  const canonical = stableStringify(baselineObj);
  return crypto.createHash("sha256").update(canonical).digest("hex");
}
