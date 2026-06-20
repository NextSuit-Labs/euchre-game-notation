import { describe, it, expect } from "@jest/globals";
import { validateEGN, isEGNFile } from "../src/validator";
import { convertBinToEgnJson, convertEgnJsonToBin } from "../src/converter";
import { packDeal, unpackDeal } from "../src/bitpacker";
import { BiddingPhase, TrickPlayPhase } from "../src/types";

const validMockData = {
  "fileType": "Euchre Game Notation",
  "version": "1.0.0",
  "metadata": {
    "matchId": "egn_m_20260528_01",
    "title": "WEC Finals",
    "description": "Championship bracket match recorded live from local venue stream.",
    "date": "2026-05-17T19:00:00Z",
    "players": ["Player0", "Player1", "Player2", "Player3"],
    "initialScore": [0, 0],
    "ruleset": {
      "std": true,
      "canadian": false,
      "loner_lead": "LEFT_OF_DEALER"
    }
  },
  "deals": [
    {
      "dealNumber": 0,
      "initialState": {
        "dealer": 3,
        "upCard": "Jd",
        "kitty": ["9h", "Qh", "As"]
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": ["Pass", "Pass", "Pass", "Order"],
          "isAlone": false,
          "discard": "9s",
          "calls_annotations": {
            3: ["Strong order by Player 3"]
          }
        },
        {
          "phaseNumber": 1,
          "type": "TRICK_PLAY",
          "initialLead": 0,
          "tricks": [
            ["Ac", "Tc", "9c", "Kc"],
            ["Ah", "Kh", "Th", "Qd"],
            ["Jd", "9d", "Ad", "Kd"],
            ["Jh", "Td", "Ks", "Ts"],
            ["Qc", "Qs", "Js", "Jc"]
          ],
          "tricks_annotations": {
            1: ["Trick 1 annotation"]
          }
        }
      ],
      "alternativeLines": [
        {
          "branchIndex": 0,
          "biddingPhase": {
            "phaseNumber": 0,
            "type": "EUCHRE_BIDDING",
            "calls": ["Pass", "Pass", "Pass", "Pass", "Pass", "s"],
            "isAlone": true,
            "discard": "9s"
          }
        },
        {
          "branchIndex": 1,
          "trickPlayPhase": {
            "phaseNumber": 1,
            "type": "TRICK_PLAY",
            "initialLead": 1,
            "tricks": [
              ["Tc", "9c", "Kc", "Ac"]
            ]
          }
        }
      ]
    }
  ]
};

describe("EGN Validator", () => {
  it("should successfully validate a correct EGN file", () => {
    const result = validateEGN(validMockData);

    // If validation fails, logging the errors helps with debugging
    if (!result.isValid) {
      console.error(result.errors);
    }

    expect(result.isValid).toBe(true);
    expect(result.errors).toBeFalsy();
  });

  it("should successfully validate alternate rules and card exchanges", () => {
    const alternateData = {
      "fileType": "Euchre Game Notation",
      "version": "1.0.0",
      "metadata": {
        "players": ["Player0", "Player1", "Player2", "Player3"],
        "initialScore": [0, 0]
      },
      "deals": [
        {
          "dealNumber": 0,
          "initialState": {
            "dealer": 1,
            "upCard": "B" // The Joker
          },
          "phases": [
            {
              "phaseNumber": 0,
              "type": "EUCHRE_BIDDING",
              "calls": ["Pass", "Pass", "Pass", "x"], // Unknown call
              "isAlone": false,
              "card_exchanges": [
                { "sender": 2, "receiver": 1, "cards": ["9s", "9c", "Ts"] }
              ]
            }
          ]
        }
      ]
    };
    const result = validateEGN(alternateData);
    expect(result.isValid).toBe(true);
  });

  it("should reject an invalid EGN file", () => {
    const invalidData = {
      fileType: "Not Euchre",
      version: "1.0.0"
      // Missing required metadata and deals
    };
    const result = validateEGN(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it("should successfully validate an EGN file where deals is an array of base64 strings", () => {
    const base64DealsData = {
      "fileType": "Euchre Game Notation",
      "version": "1.0.0",
      "metadata": {
        "players": ["Player0", "Player1", "Player2", "Player3"],
        "initialScore": [0, 0]
      },
      "deals": ["VNMUUiCJNJCjiEpHF1A"]
    };
    const result = validateEGN(base64DealsData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toBeFalsy();
  });

  it("isEGNFile should work correctly as a type guard", () => {
    expect(isEGNFile(validMockData)).toBe(true);
    expect(isEGNFile({})).toBe(false);
  });
});

describe("EGN Protobuf Converter", () => {
  function normalizeEgn(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    if (Array.isArray(obj)) {
      return obj.map(normalizeEgn);
    }
    if (typeof obj === "object") {
      const res: any = {};
      for (const key of Object.keys(obj)) {
        const val = obj[key];
        // Skip empty arrays for optional fields that might be defaulted by protobuf arrays option
        if (Array.isArray(val) && val.length === 0 && (key === "kitty" || key === "player_cards" || key === "card_exchanges" || key === "alternativeLines")) {
          continue;
        }
        res[key] = normalizeEgn(val);
      }
      return res;
    }
    return obj;
  }

  function normalizeCondensedEgn(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    if (Array.isArray(obj)) {
      return obj.map(normalizeCondensedEgn);
    }
    if (typeof obj === "object") {
      const res: any = {};
      for (const key of Object.keys(obj)) {
        // Skip fields that the bitpacker drops:
        if (key === "kitty" || key === "discard" || key === "initialLead" || 
            key === "card_exchanges" || key === "calls_annotations" || key === "tricks_annotations" ||
            key === "alternativeLines") {
          continue;
        }
        res[key] = normalizeCondensedEgn(obj[key]);
      }
      return res;
    }
    return obj;
  }

  it("should convert JSON to binary and back to JSON exactly using condensed mode (default)", () => {
    const fs = require("fs");
    const path = require("path");
    const tempDir = path.resolve(__dirname, "../temp_test_dir_condensed");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "test_game.bin");

    const jsonStr = JSON.stringify(validMockData, null, 2);

    try {
      convertEgnJsonToBin(jsonStr, tempBinFilePath);
      expect(fs.existsSync(tempBinFilePath)).toBe(true);

      const backJsonStr = convertBinToEgnJson(tempBinFilePath);
      const backObj = JSON.parse(backJsonStr);

      expect(normalizeCondensedEgn(backObj)).toEqual(normalizeCondensedEgn(validMockData));

      const result = validateEGN(backObj);
      expect(result.isValid).toBe(true);
    } finally {
      if (fs.existsSync(tempBinFilePath)) {
        fs.unlinkSync(tempBinFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  it("should convert JSON to binary and back to JSON exactly using expanded mode (condensed = false)", () => {
    const fs = require("fs");
    const path = require("path");
    const tempDir = path.resolve(__dirname, "../temp_test_dir_expanded");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "test_game.bin");

    const jsonStr = JSON.stringify(validMockData, null, 2);

    try {
      convertEgnJsonToBin(jsonStr, tempBinFilePath, false);
      expect(fs.existsSync(tempBinFilePath)).toBe(true);

      const backJsonStr = convertBinToEgnJson(tempBinFilePath, false);
      const backObj = JSON.parse(backJsonStr);

      expect(normalizeEgn(backObj)).toEqual(normalizeEgn(validMockData));

      const result = validateEGN(backObj);
      expect(result.isValid).toBe(true);
    } finally {
      if (fs.existsSync(tempBinFilePath)) {
        fs.unlinkSync(tempBinFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });
});

describe("EgnDeal Bitpacker", () => {
  it("should pack and unpack a Deal object exactly", () => {
    const originalDeal = validMockData.deals[0];

    // 1. Pack deal to base64url string
    const base64Url = packDeal(originalDeal as any);
    expect(typeof base64Url).toBe("string");

    // 2. Unpack deal back to Deal object
    const unpackedDeal = unpackDeal(base64Url, originalDeal.dealNumber);

    // 3. Verify deal properties match
    expect(unpackedDeal.dealNumber).toBe(originalDeal.dealNumber);
    expect(unpackedDeal.initialState.dealer).toBe(originalDeal.initialState.dealer);
    expect(unpackedDeal.initialState.upCard).toBe(originalDeal.initialState.upCard);

    // Verify phase details
    const biddingPhase = unpackedDeal.phases[0] as BiddingPhase;
    const playPhase = unpackedDeal.phases[1] as TrickPlayPhase;
    const origBidding = originalDeal.phases[0] as BiddingPhase;
    const origPlay = originalDeal.phases[1] as TrickPlayPhase;

    expect(biddingPhase.type).toBe("EUCHRE_BIDDING");
    expect(biddingPhase.calls).toEqual(origBidding.calls);
    expect(biddingPhase.isAlone).toBe(origBidding.isAlone);

    expect(playPhase.type).toBe("TRICK_PLAY");
    expect(playPhase.tricks).toEqual(origPlay.tricks);
  });
});