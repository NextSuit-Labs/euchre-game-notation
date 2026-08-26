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

import { describe, it, expect } from "@jest/globals";
import { validateEgn } from "../src/validator";
import { convertEgnJsonToBin, convertBinToEgnJson, unpackEgnFile, packEgnFile } from "../src/converter";
import { upgradeEgn } from "../src/cli-upgrade";
import { validateEmn } from "../src/emn/validator";
import { emnToBinary, binaryToEmn, unpackEmnFile, packEmnFile } from "../src/emn/converter";
import { extractAllEgnsFromEmn } from "../src/emn/extractor";
import { EgnFile, UnpackedEgnFile } from "../src/types";
import { EmnFile, UnpackedEmnFile } from "../src/emn/types";
import * as fs from "fs";
import * as path from "path";

const EXAMPLES_DIR = path.resolve(__dirname, "../examples");

function deleteFileSync(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  for (let i = 0; i < 5; i++) {
    try {
      fs.unlinkSync(filePath);
      return;
    } catch (err: any) {
      if (err.code === "EBUSY" || err.code === "EPERM") {
        const end = Date.now() + 50;
        while (Date.now() < end) {}
      } else {
        throw err;
      }
    }
  }
}

function getFilesRecursively(dir: string, fileExt: string): string[] {
  const results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...getFilesRecursively(filePath, fileExt));
    } else if (file.endsWith(fileExt)) {
      results.push(filePath);
    }
  }
  return results;
}

// Normalize helper to compare original JSON and roundtrips
function normalizeEgnObj(obj: any, isCondensed = false, isRuleset = false): any {
  if (obj === null || obj === undefined) return undefined;

  if (Array.isArray(obj)) {
    const arr = obj.map(o => normalizeEgnObj(o, isCondensed)).filter(val => val !== undefined);
    return arr.length > 0 ? arr : undefined;
  }

  if (typeof obj === "object") {
    const res: any = {};

    // Identify special object types
    const isBiddingPhase = obj.type === "EUCHRE_BIDDING" || "calls" in obj;
    const isPlayPhase = obj.type === "TRICK_PLAY" || obj.type === "TRICK_PLAY_PHASE" || "tricks" in obj;
    const isRulesetObj = isRuleset || "std" in obj || "min_rank" in obj || "minRank" in obj || "winning_score" in obj || "winningScore" in obj;

    // Normalize and copy properties
    for (const key of Object.keys(obj)) {
      let val = obj[key];

      // Ignore keys not preserved in condensed mode
      if (isCondensed && [
        "cardExchanges"
      ].includes(key)) {
        continue;
      }

      // Normalize casing for ruleset keys to snake_case for consistency
      if (isRulesetObj) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        res[snakeKey] = normalizeEgnObj(val, isCondensed);
        continue;
      }

      const normalizedVal = normalizeEgnObj(val, isCondensed);
      if (normalizedVal !== undefined && !(Array.isArray(normalizedVal) && normalizedVal.length === 0)) {
        res[key] = normalizedVal;
      }
    }

    // Populate default values for missing keys
    if (isBiddingPhase) {
      res.isAlone = res.isAlone ?? res.is_alone ?? false;
      delete res.is_alone; // Clean up casing duplicate
      if (res.phaseNumber === undefined) res.phaseNumber = 0;
    }

    if (isPlayPhase) {
      if (res.phaseNumber === undefined) res.phaseNumber = 1;
    }

    if (isRulesetObj) {
      res.std = res.std ?? true;
      res.min_rank = res.min_rank ?? 9;
      res.winning_score = res.winning_score ?? 10;
      res.loner_march_score = res.loner_march_score ?? 4;
      res.loner_euchred_score = res.loner_euchred_score ?? 2;
      res.loner_lead = res.loner_lead ?? "LEFT_OF_DEALER";
      res.num_deals = res.num_deals ?? 0;

      for (const k of [
        "canadian", "farmers", "partners_best", "go_under", "joker",
        "allow_no_trump", "fast_break", "four_trick_tokens", "defend_alone"
      ]) {
        res[k] = res[k] ?? false;
      }
    }

    return Object.keys(res).length > 0 ? res : undefined;
  }

  return obj;
}

describe("EGN All Example Files Roundtrip & Bitpacker Verification", () => {
  const allEgnFiles = getFilesRecursively(EXAMPLES_DIR, ".egn");

  it("should find all example .egn files recursively across subdirectories", () => {
    expect(allEgnFiles.length).toBeGreaterThanOrEqual(30);
  });

  allEgnFiles.forEach(filePath => {
    const relativePath = path.relative(EXAMPLES_DIR, filePath);
    describe(`Example: ${relativePath}`, () => {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const originalObj = JSON.parse(fileContent) as EgnFile;

      it("should be valid according to the EGN JSON schema (or valid after upgrade)", () => {
        const result = validateEgn(originalObj);
        if (!result.isValid) {
          // If legacy, verify that upgrade produces a valid EGN
          const upgraded = upgradeEgn(originalObj);
          expect(validateEgn(upgraded).isValid).toBe(true);
        } else {
          expect(result.isValid).toBe(true);
        }
      });

      it("should successfully pack and unpack deal objects", () => {
        const egnToTest = upgradeEgn(originalObj);
        const unpacked: UnpackedEgnFile = unpackEgnFile(egnToTest);
        expect(unpacked.fileType).toBe("Euchre Game Notation");

        // Verify that deals are expanded objects
        unpacked.deals.forEach(deal => {
          expect(typeof deal).toBe("object");
          expect(deal).toHaveProperty("dealNumber");
        });

        // Pack back to condensed EGN
        const repacked: EgnFile = packEgnFile(unpacked);
        repacked.deals.forEach(deal => {
          expect(typeof deal).toBe("string");
        });

        // Roundtrip back to unpacked and assert equivalence
        const roundtripped = unpackEgnFile(repacked);
        expect(normalizeEgnObj(roundtripped.deals, true)).toEqual(normalizeEgnObj(unpacked.deals, true));
      });

      it("should roundtrip correctly in expanded mode Protobuf", () => {
        const tempBinPath = path.join(path.dirname(filePath), `${path.basename(filePath)}.expanded.temp.egnb`);
        const egnToTest = upgradeEgn(originalObj);
        const jsonToConvert = JSON.stringify(egnToTest);
        try {
          // 1. Convert JSON to expanded binary Protobuf
          convertEgnJsonToBin(jsonToConvert, tempBinPath, false);
          expect(fs.existsSync(tempBinPath)).toBe(true);

          // 2. Convert binary Protobuf back to JSON
          const backJsonContent = convertBinToEgnJson(tempBinPath, false);
          const backObj = JSON.parse(backJsonContent);

          // 3. Validate roundtripped EGN
          expect(validateEgn(backObj).isValid).toBe(true);

          // 4. Assert content parity
          expect(normalizeEgnObj(backObj, false)).toEqual(normalizeEgnObj(egnToTest, false));
        } finally {
          deleteFileSync(tempBinPath);
        }
      });

      it("should roundtrip correctly in condensed mode Protobuf", () => {
        const tempBinPath = path.join(path.dirname(filePath), `${path.basename(filePath)}.temp.egnb`);
        const egnToTest = upgradeEgn(originalObj);
        const jsonToConvert = JSON.stringify(egnToTest);
        try {
          // 1. Convert JSON to condensed binary Protobuf
          convertEgnJsonToBin(jsonToConvert, tempBinPath, true);
          expect(fs.existsSync(tempBinPath)).toBe(true);

          // 2. Convert binary Protobuf back to JSON
          const backJsonContent = convertBinToEgnJson(tempBinPath, true);
          const backObj = JSON.parse(backJsonContent);

          // 3. Validate roundtripped EGN
          expect(validateEgn(backObj).isValid).toBe(true);

          // 4. Assert content parity (ignoring cardExchanges omitted by bitpacker)
          expect(normalizeEgnObj(backObj, true)).toEqual(normalizeEgnObj(egnToTest, true));
        } finally {
          deleteFileSync(tempBinPath);
        }
      });
    });
  });
});

describe("EMN Example Files Bitpacker & Binary Conversion Verification", () => {
  const allEmnFiles = getFilesRecursively(EXAMPLES_DIR, ".emn");

  it("should find example .emn files", () => {
    expect(allEmnFiles.length).toBeGreaterThan(0);
  });

  allEmnFiles.forEach(filePath => {
    const relativePath = path.relative(EXAMPLES_DIR, filePath);
    describe(`EMN Match: ${relativePath}`, () => {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const emnObj = JSON.parse(fileContent) as EmnFile;

      it("should be valid according to the EMN schema", () => {
        expect(validateEmn(emnObj).isValid).toBe(true);
      });

      it("should roundtrip through bitpacked Protobuf binary (.emnb) and unpack games", () => {
        // 1. Convert EMN to bitpacked binary buffer
        const binBuffer = emnToBinary(emnObj, { condenseGames: true });
        expect(binBuffer.length).toBeGreaterThan(0);

        // 2. Decode binary buffer to unpacked EMN
        const decodedUnpacked = binaryToEmn(binBuffer, { unpackGames: true }) as UnpackedEmnFile;
        expect(decodedUnpacked.fileType).toBe("Euchre Match Notation");

        // Verify sub-games contain expanded Deal objects
        decodedUnpacked.games.forEach(g => {
          g.gameData.deals.forEach(deal => {
            expect(typeof deal).toBe("object");
          });
        });

        // 3. Re-pack unpacked EMN to standard EmnFile
        const repackedEmn = packEmnFile(decodedUnpacked);
        expect(validateEmn(repackedEmn).isValid).toBe(true);
      });

      it("should extract all embedded EGN games and verify each extracts properly", () => {
        const egns = extractAllEgnsFromEmn(emnObj);
        expect(egns.length).toBe(emnObj.games.length);

        egns.forEach(egn => {
          expect(validateEgn(egn).isValid).toBe(true);
          const unpacked = unpackEgnFile(egn);
          const repacked = packEgnFile(unpacked);
          expect(normalizeEgnObj(unpackEgnFile(repacked).deals, true)).toEqual(normalizeEgnObj(unpacked.deals, true));
        });
      });
    });
  });
});
