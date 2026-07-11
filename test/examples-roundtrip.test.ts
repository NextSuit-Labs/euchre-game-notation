import { describe, it, expect } from "@jest/globals";
import { validateEGN } from "../src/validator";
import { convertEgnJsonToBin, convertBinToEgnJson } from "../src/converter";
import * as fs from "fs";
import * as path from "path";

const EXAMPLES_DIR = path.resolve(__dirname, "../examples");

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
        "kitty", "discard", "playerCards", "player_cards",
        "cardExchanges", "initialLead", "initial_lead"
      ].includes(key)) {
        continue;
      }

      // Phase numbers can be 0-based or 1-based; sequence in array dictates order
      if (key === "phaseNumber" || key === "phase_number") {
        continue;
      }

      // Skip play phase properties that are invalid or legacy
      if (isPlayPhase && [
        "isAlone", "is_alone", "aloneDefender", "alone_defender"
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
    }

    if (isRulesetObj) {
      res.std = res.std ?? true;
      res.min_rank = res.min_rank ?? 9;
      res.winning_score = res.winning_score ?? 10;
      res.loner_march_score = res.loner_march_score ?? 4;
      res.loner_euchred_score = res.loner_euchred_score ?? 2;
      res.loner_lead = res.loner_lead ?? "LEFT_OF_DEALER";

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

describe("EGN Example Files Roundtrip Verification", () => {
  const exampleFiles = fs.readdirSync(EXAMPLES_DIR)
    .filter(file => file.endsWith(".egn"));

  it("should find example files to verify", () => {
    expect(exampleFiles.length).toBeGreaterThan(0);
  });

  exampleFiles.forEach(fileName => {
    describe(`Example: ${fileName}`, () => {
      const filePath = path.join(EXAMPLES_DIR, fileName);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const originalObj = JSON.parse(fileContent);

      it("should be valid according to the EGN JSON schema", () => {
        const result = validateEGN(originalObj);
        if (!result.isValid) {
          console.error(`Validation failed for ${fileName}:`, result.errors);
        }
        expect(result.isValid).toBe(true);
      });

      it("should roundtrip correctly in expanded mode", () => {
        const tempBinPath = path.join(EXAMPLES_DIR, `${fileName}.expanded.temp.bin`);
        try {
          // 1. Convert JSON to expanded binary Protobuf
          convertEgnJsonToBin(fileContent, tempBinPath, false);
          expect(fs.existsSync(tempBinPath)).toBe(true);

          // 2. Convert binary Protobuf back to JSON
          const backJsonContent = convertBinToEgnJson(tempBinPath, false);
          const backObj = JSON.parse(backJsonContent);

          // 3. Validate roundtripped EGN
          expect(validateEGN(backObj).isValid).toBe(true);

          // 4. Assert content parity (using normalizeEgnObj to handle Protobuf default representations)
          expect(normalizeEgnObj(backObj, false)).toEqual(normalizeEgnObj(originalObj, false));
        } finally {
          if (fs.existsSync(tempBinPath)) {
            fs.unlinkSync(tempBinPath);
          }
        }
      });

      it("should roundtrip correctly in condensed mode", () => {
        const tempBinPath = path.join(EXAMPLES_DIR, `${fileName}.condensed.temp.bin`);
        try {
          // 1. Convert JSON to condensed binary Protobuf
          convertEgnJsonToBin(fileContent, tempBinPath, true);
          expect(fs.existsSync(tempBinPath)).toBe(true);

          // 2. Convert binary Protobuf back to JSON
          const backJsonContent = convertBinToEgnJson(tempBinPath, true);
          const backObj = JSON.parse(backJsonContent);

          // 3. Validate roundtripped EGN
          expect(validateEGN(backObj).isValid).toBe(true);

          // 4. Assert content parity (ignoring cards/exchanges omitted by the bitpacker)
          expect(normalizeEgnObj(backObj, true)).toEqual(normalizeEgnObj(originalObj, true));
        } finally {
          if (fs.existsSync(tempBinPath)) {
            fs.unlinkSync(tempBinPath);
          }
        }
      });
    });
  });
});
