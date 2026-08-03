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
import { extractGameFromMatch, extractAllGamesFromMatch } from "../match-engine";

/**
 * Extracts a single EGN file from an EMN file by game index (0-based),
 * performing player name replacements based on the master players registry.
 */
export function extractEgnFromEmn(emnFile: EmnFile, gameIndex: number): EgnFile {
  return extractGameFromMatch(emnFile as any, gameIndex, validateEgn as any) as unknown as EgnFile;
}

/**
 * Extracts all EGN files from an EMN file, performing player name replacements
 * based on the master players registry. Returns an array of EgnFile.
 */
export function extractAllEgnsFromEmn(emnFile: EmnFile): EgnFile[] {
  return extractAllGamesFromMatch(emnFile as any, validateEgn as any) as unknown as EgnFile[];
}
