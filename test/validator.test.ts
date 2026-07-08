import { describe, it, expect } from "@jest/globals";
import { validateEGN, isEGNFile } from "../src/validator";
import { convertBinToEgnJson, convertEgnJsonToBin } from "../src/converter";
import { packDeal, unpackDeal } from "../src/bitpacker";
import { BiddingPhase, TrickPlayPhase } from "../src/types";

const validMockData = {
  "fileType": "Euchre Game Notation",
  "version": "1.0.0",
  "metadata": {
    "gameId": "egn_m_20260528_01",
    "title": "WEC Finals",
    "description": "Championship bracket game recorded live from local venue stream.",
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
          "phases": [
            {
              "phaseNumber": 0,
              "type": "EUCHRE_BIDDING",
              "calls": ["Pass", "Pass", "Pass", "Pass", "Pass", "s"],
              "isAlone": true,
              "discard": "9s"
            }
          ]
        },
        {
          "branchIndex": 1,
          "phases": [
            {
              "phaseNumber": 1,
              "type": "TRICK_PLAY",
              "initialLead": 1,
              "tricks": [
                ["Tc", "9c", "Kc", "Ac"]
              ]
            }
          ]
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

  function cloneMock(): any {
    return JSON.parse(JSON.stringify(validMockData));
  }

  it("should validate players array of any size", () => {
    // 0 players
    const data0 = cloneMock();
    data0.metadata.players = [];
    expect(validateEGN(data0).isValid).toBe(true);

    // 2 players
    const data2 = cloneMock();
    data2.metadata.players = ["P0", "P1"];
    expect(validateEGN(data2).isValid).toBe(true);

    // 5 players
    const data5 = cloneMock();
    data5.metadata.players = ["P0", "P1", "P2", "P3", "P4"];
    expect(validateEGN(data5).isValid).toBe(true);

    // non-string elements should fail
    const dataBad = cloneMock();
    dataBad.metadata.players = ["P0", 123];
    expect(validateEGN(dataBad).isValid).toBe(false);
  });

  it("should validate root-level properties", () => {
    // Missing fileType
    const m1 = cloneMock();
    delete m1.fileType;
    expect(validateEGN(m1).isValid).toBe(false);

    // Wrong fileType
    const m2 = cloneMock();
    m2.fileType = "Hearts Game Notation";
    expect(validateEGN(m2).isValid).toBe(false);

    // Missing version
    const m3 = cloneMock();
    delete m3.version;
    expect(validateEGN(m3).isValid).toBe(false);

    // Invalid version format
    const m4 = cloneMock();
    m4.version = "1.0";
    expect(validateEGN(m4).isValid).toBe(false);

    m4.version = "1.0.a";
    expect(validateEGN(m4).isValid).toBe(false);
  });

  it("should validate metadata properties", () => {
    // Missing players
    const m1 = cloneMock();
    delete m1.metadata.players;
    expect(validateEGN(m1).isValid).toBe(false);

    // Missing initialScore
    const m2 = cloneMock();
    delete m2.metadata.initialScore;
    expect(validateEGN(m2).isValid).toBe(false);

    // initialScore size != 2
    const m3 = cloneMock();
    m3.metadata.initialScore = [1];
    expect(validateEGN(m3).isValid).toBe(false);

    m3.metadata.initialScore = [1, 2, 3];
    expect(validateEGN(m3).isValid).toBe(false);

    // initialScore contains non-integers
    const m4 = cloneMock();
    m4.metadata.initialScore = [1.5, 2];
    expect(validateEGN(m4).isValid).toBe(false);

    // invalid ruleset properties
    const m5 = cloneMock();
    m5.metadata.ruleset.std = "true"; // string instead of boolean
    expect(validateEGN(m5).isValid).toBe(false);

    const m6 = cloneMock();
    m6.metadata.ruleset.loner_lead = "LEFT_OF_PARTNER"; // not in enum
    expect(validateEGN(m6).isValid).toBe(false);
  });

  it("should validate date property with or without timezone offset", () => {
    // Valid date with timezone offset (Z)
    const m1 = cloneMock();
    m1.metadata.date = "2026-05-17T19:00:00Z";
    expect(validateEGN(m1).isValid).toBe(true);

    // Valid date with timezone offset (+05:30)
    const m2 = cloneMock();
    m2.metadata.date = "2026-05-17T19:00:00+05:30";
    expect(validateEGN(m2).isValid).toBe(true);

    // Valid date without timezone offset (T-separated)
    const m3 = cloneMock();
    m3.metadata.date = "2026-05-29T16:30";
    expect(validateEGN(m3).isValid).toBe(true);

    // Valid date without timezone offset (Space-separated)
    const m4 = cloneMock();
    m4.metadata.date = "2026-05-29 16:30:00";
    expect(validateEGN(m4).isValid).toBe(true);

    // Valid date without timezone offset and with subseconds
    const m5 = cloneMock();
    m5.metadata.date = "2026-05-29T16:30:00.123";
    expect(validateEGN(m5).isValid).toBe(true);

    // Invalid date format
    const m6 = cloneMock();
    m6.metadata.date = "not-a-date";
    expect(validateEGN(m6).isValid).toBe(false);

    // Invalid local date-time format (missing time)
    const m7 = cloneMock();
    m7.metadata.date = "2026-05-29";
    expect(validateEGN(m7).isValid).toBe(false);
  });

  it("should validate deal properties and phases", () => {
    // negative dealNumber
    const m1 = cloneMock();
    m1.deals[0].dealNumber = -1;
    expect(validateEGN(m1).isValid).toBe(false);

    // dealer out of range
    const m2 = cloneMock();
    m2.deals[0].initialState.dealer = 4;
    expect(validateEGN(m2).isValid).toBe(false);

    // malformed upCard
    const m3 = cloneMock();
    m3.deals[0].initialState.upCard = "invalid";
    expect(validateEGN(m3).isValid).toBe(false);

    m3.deals[0].initialState.upCard = "9z";
    expect(validateEGN(m3).isValid).toBe(false);

    // bidding phase: invalid call
    const m4 = cloneMock();
    m4.deals[0].phases[0].calls = ["Pass", "Order", "InvalidCall"];
    expect(validateEGN(m4).isValid).toBe(false);

    // bidding phase: calls length > 8
    const m5 = cloneMock();
    m5.deals[0].phases[0].calls = ["Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass"];
    expect(validateEGN(m5).isValid).toBe(false);

    // trick play: tricks with invalid cards
    const m6 = cloneMock();
    m6.deals[0].phases[1].tricks[0] = ["Ac", "Tc", "9z", "Kc"];
    expect(validateEGN(m6).isValid).toBe(false);

    // trick play: initialLead out of range
    const m7 = cloneMock();
    m7.deals[0].phases[1].initialLead = 5;
    expect(validateEGN(m7).isValid).toBe(false);
  });

  it("should validate alternative lines and annotations", () => {
    // negative branchIndex in alternative lines
    const m1 = cloneMock();
    m1.deals[0].alternativeLines[0].branchIndex = -1;
    expect(validateEGN(m1).isValid).toBe(false);

    // annotations with non-numeric key
    const m2 = cloneMock();
    m2.deals[0].phases[0].calls_annotations["abc"] = ["annotation text"];
    expect(validateEGN(m2).isValid).toBe(false);

    // annotations value not string array
    const m3 = cloneMock();
    m3.deals[0].phases[0].calls_annotations["2"] = "not-an-array";
    expect(validateEGN(m3).isValid).toBe(false);
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