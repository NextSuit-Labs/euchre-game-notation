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

import * as fs from "fs";
import { describe, it, expect } from "@jest/globals";
import { validateEgn, isEgnFile, validateEGN, isEGNFile, validateDeal, isDeal } from "../src/validator";
import { convertBinToEgnJson, convertEgnJsonToBin } from "../src/converter";
import { packDeal, unpackDeal } from "../src/bitpacker";
import { BiddingPhase, TrickPlayPhase } from "../src/types";
import { VERSION } from "../src/version";

function deleteFileSync(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  for (let i = 0; i < 5; i++) {
    try {
      fs.unlinkSync(filePath);
      return;
    } catch (err: any) {
      if (err.code === "EBUSY" || err.code === "EPERM") {
        const end = Date.now() + 50;
        while (Date.now() < end) { }
      } else {
        throw err;
      }
    }
  }
}

function removeDirSync(dirPath: string) {
  if (!fs.existsSync(dirPath)) return;
  for (let i = 0; i < 5; i++) {
    try {
      fs.rmdirSync(dirPath);
      return;
    } catch (err: any) {
      if (err.code === "EBUSY" || err.code === "ENOTEMPTY" || err.code === "EPERM") {
        const end = Date.now() + 50;
        while (Date.now() < end) { }
      } else {
        throw err;
      }
    }
  }
}

const validMockData = {
  "fileType": "Euchre Game Notation",
  "version": VERSION,
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
        "upCard": "Jd"
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": ["Pass", "Pass", "Pass", "Order"],
          "isAlone": false,
          "discard": "9s",
          "callAnnotations": {
            3: ["Strong order by Player 3"]
          }
        },
        {
          "phaseNumber": 1,
          "type": "TRICK_PLAY",
          "tricks": [
            ["Ac", "Tc", "9c", "Kc"],
            ["Ah", "Kh", "Th", "Qd"],
            ["Jd", "9d", "Ad", "Kd"],
            ["Jh", "Td", "Ks", "Ts"],
            ["Qc", "Qs", "Js", "Jc"]
          ],
          "playAnnotations": {
            1: ["Play 1 annotation for the Tc play"]
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
    const result = validateEgn(validMockData);

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
      "version": VERSION,
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
              "cardExchanges": [
                { "sender": 2, "receiver": 1, "cards": ["9s", "9c", "Ts"] }
              ]
            }
          ]
        }
      ]
    };
    const result = validateEgn(alternateData);
    expect(result.isValid).toBe(true);
  });

  it("should reject an invalid EGN file", () => {
    const invalidData = {
      fileType: "Not Euchre",
      version: VERSION
      // Missing required metadata and deals
    };
    const result = validateEgn(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toBeDefined();

    // verify the deprecated function works the same
    const result2 = validateEGN(invalidData);
    expect(result2.isValid).toBe(false);
    expect(result2.errors).toBeDefined();
  });

  it("should reject validation example files prefixed with invalid and ending in .egn", () => {
    const fs = require("fs");
    const path = require("path");
    const validationDir = path.resolve(__dirname, "../examples/validation examples");

    const invalidEgnFiles = fs.readdirSync(validationDir)
      .filter((fileName: string) => fileName.toLowerCase().startsWith("invalid"));

    // Some repos may not yet include invalid*.egn fixtures; if present, each must fail validation.
    invalidEgnFiles.forEach((fileName: string) => {
      const filePath = path.join(validationDir, fileName);
      const jsonText = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(jsonText);
      const result = validateEgn(parsed);

      expect(result.isValid).toBe(false);
    });
  });

  it("should successfully validate an EGN file where deals is an array of base64 strings", () => {
    const base64DealsData = {
      "fileType": "Euchre Game Notation",
      "version": VERSION,
      "metadata": {
        "players": ["Player0", "Player1", "Player2", "Player3"],
        "initialScore": [0, 0]
      },
      "deals": ["VNMUUiCJNJCjiEpHF1A"]
    };
    const result = validateEgn(base64DealsData);
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
    expect(validateEgn(data0).isValid).toBe(true);

    // 2 players
    const data2 = cloneMock();
    data2.metadata.players = ["P0", "P1"];
    expect(validateEgn(data2).isValid).toBe(true);

    // 5 players
    const data5 = cloneMock();
    data5.metadata.players = ["P0", "P1", "P2", "P3", "P4"];
    expect(validateEgn(data5).isValid).toBe(true);

    // non-string elements should fail
    const dataBad = cloneMock();
    dataBad.metadata.players = ["P0", 123];
    expect(validateEgn(dataBad).isValid).toBe(false);
  });

  it("should validate players as objects with playerIds", () => {
    const data = cloneMock();
    data.metadata.players = [
      "P0",
      {
        name: "P1",
        playerIds: [
          { id: "abc123", source: "euchre-site" },
          { id: "p1-alt", source: "game-community" },
        ],
      },
      {
        name: "P2",
      },
      "P3",
    ];

    expect(validateEgn(data).isValid).toBe(true);
  });

  it("should validate root-level properties", () => {
    // Missing fileType
    const m1 = cloneMock();
    delete m1.fileType;
    expect(validateEgn(m1).isValid).toBe(false);

    // Wrong fileType
    const m2 = cloneMock();
    m2.fileType = "Hearts Game Notation";
    expect(validateEgn(m2).isValid).toBe(false);

    // Missing version
    const m3 = cloneMock();
    delete m3.version;
    expect(validateEgn(m3).isValid).toBe(false);

    // Invalid version format
    const m4 = cloneMock();
    m4.version = "1.1";
    expect(validateEgn(m4).isValid).toBe(false);

    m4.version = "1.1.a";
    expect(validateEgn(m4).isValid).toBe(false);
  });

  it("should validate metadata properties", () => {
    // Missing players
    const m1 = cloneMock();
    delete m1.metadata.players;
    expect(validateEgn(m1).isValid).toBe(false);

    // Missing initialScore
    const m2 = cloneMock();
    delete m2.metadata.initialScore;
    expect(validateEgn(m2).isValid).toBe(false);

    // initialScore size is flexible (no min/max constraint — supports variable player counts)

    // initialScore contains non-integers
    const m4 = cloneMock();
    m4.metadata.initialScore = [1.5, 2];
    expect(validateEgn(m4).isValid).toBe(false);

    // invalid ruleset properties
    const m5 = cloneMock();
    m5.metadata.ruleset.std = "true"; // string instead of boolean
    expect(validateEgn(m5).isValid).toBe(false);

    const m6 = cloneMock();
    m6.metadata.ruleset.loner_lead = "LEFT_OF_PARTNER"; // not in enum
    expect(validateEgn(m6).isValid).toBe(false);

    // valid num_deals (winning_score omitted)
    const m7 = cloneMock();
    delete m7.metadata.ruleset.winning_score;
    m7.metadata.ruleset.num_deals = 8;
    expect(validateEgn(m7).isValid).toBe(true);

    // invalid combination: both winning_score and num_deals present
    const m8 = cloneMock();
    m8.metadata.ruleset.winning_score = 10;
    m8.metadata.ruleset.num_deals = 8;
    expect(validateEgn(m8).isValid).toBe(false);

    // invalid combination: both winning_score and num_deals are 0
    const m9 = cloneMock();
    m9.metadata.ruleset.winning_score = 0;
    m9.metadata.ruleset.num_deals = 0;
    expect(validateEgn(m9).isValid).toBe(false);

    // invalid combination: winning_score = 0 and num_deals omitted
    const m10 = cloneMock();
    m10.metadata.ruleset.winning_score = 0;
    expect(validateEgn(m10).isValid).toBe(false);

    // invalid num_deals (negative)
    const m11 = cloneMock();
    delete m11.metadata.ruleset.winning_score;
    m11.metadata.ruleset.num_deals = -1;
    expect(validateEgn(m11).isValid).toBe(false);

    // invalid num_deals (type string)
    const m12 = cloneMock();
    delete m12.metadata.ruleset.winning_score;
    m12.metadata.ruleset.num_deals = "eight" as any;
    expect(validateEgn(m12).isValid).toBe(false);

    // invalid winning_score (negative)
    const m13 = cloneMock();
    m13.metadata.ruleset.winning_score = -1;
    expect(validateEgn(m13).isValid).toBe(false);
  });

  it("should validate hardened schema constraints (additionalProperties, maxItems, maxLength)", () => {
    // 1. Rejects unknown property in root
    const rootBad = cloneMock();
    (rootBad as any).extraProperty = "not allowed";
    expect(validateEgn(rootBad).isValid).toBe(false);

    // 2. Rejects unknown property in ruleset
    const rulesetBad = cloneMock();
    (rulesetBad.metadata.ruleset as any).extraRule = "not allowed";
    expect(validateEgn(rulesetBad).isValid).toBe(false);

    // 3. Rejects title exceeding maxLength of 128
    const titleTooLong = cloneMock();
    titleTooLong.metadata.title = "a".repeat(129);
    expect(validateEgn(titleTooLong).isValid).toBe(false);

    // 4. Rejects description exceeding maxLength of 1024
    const descTooLong = cloneMock();
    descTooLong.metadata.description = "a".repeat(1025);
    expect(validateEgn(descTooLong).isValid).toBe(false);

    // 5. Rejects player name exceeding maxLength of 64
    const playerTooLong = cloneMock();
    playerTooLong.metadata.players = ["P0", "P1", "P2", "a".repeat(65)];
    expect(validateEgn(playerTooLong).isValid).toBe(false);

    // 6. Rejects players count exceeding maxItems of 10
    const tooManyPlayers = cloneMock();
    tooManyPlayers.metadata.players = Array(11).fill("Player");
    expect(validateEgn(tooManyPlayers).isValid).toBe(false);

    // 7. Rejects deals count exceeding maxItems of 100
    const tooManyDeals = cloneMock();
    tooManyDeals.deals = Array(101).fill(cloneMock().deals[0]);
    expect(validateEgn(tooManyDeals).isValid).toBe(false);
  });

  it("should validate date property with or without timezone offset", () => {
    // Valid date with timezone offset (Z)
    const m1 = cloneMock();
    m1.metadata.date = "2026-05-17T19:00:00Z";
    expect(validateEgn(m1).isValid).toBe(true);

    // Valid date with timezone offset (+05:30)
    const m2 = cloneMock();
    m2.metadata.date = "2026-05-17T19:00:00+05:30";
    expect(validateEgn(m2).isValid).toBe(true);

    // Valid date without timezone offset (T-separated)
    const m3 = cloneMock();
    m3.metadata.date = "2026-05-29T16:30";
    expect(validateEgn(m3).isValid).toBe(true);

    // Valid date without timezone offset (Space-separated)
    const m4 = cloneMock();
    m4.metadata.date = "2026-05-29 16:30:00";
    expect(validateEgn(m4).isValid).toBe(true);

    // Valid date without timezone offset and with subseconds
    const m5 = cloneMock();
    m5.metadata.date = "2026-05-29T16:30:00.123";
    expect(validateEgn(m5).isValid).toBe(true);

    // Invalid date format
    const m6 = cloneMock();
    m6.metadata.date = "not-a-date";
    expect(validateEgn(m6).isValid).toBe(false);

    // Valid date-only format (YYYY-MM-DD e.g. 2026-08-11 or 2026-05-29)
    const m7 = cloneMock();
    m7.metadata.date = "2026-08-11";
    expect(validateEgn(m7).isValid).toBe(true);

    const m8 = cloneMock();
    m8.metadata.date = "2026-05-29";
    expect(validateEgn(m8).isValid).toBe(true);

    // Valid blank date format ("")
    const m9 = cloneMock();
    m9.metadata.date = "";
    expect(validateEgn(m9).isValid).toBe(true);
  });

  it("should validate deal properties and phases", () => {
    // negative dealNumber
    const m1 = cloneMock();
    m1.deals[0].dealNumber = -1;
    expect(validateEgn(m1).isValid).toBe(false);

    // dealer has no max constraint — supports variable player counts (validated by ruleset/num_players)

    // malformed upCard
    const m3 = cloneMock();
    m3.deals[0].initialState.upCard = "invalid";
    expect(validateEgn(m3).isValid).toBe(false);

    m3.deals[0].initialState.upCard = "9z";
    expect(validateEgn(m3).isValid).toBe(false);

    // bidding phase: invalid call
    const m4 = cloneMock();
    m4.deals[0].phases[0].calls = ["Pass", "Order", "InvalidCall"];
    expect(validateEgn(m4).isValid).toBe(false);

    // calls length has no max constraint — supports extended bidding variants

    // trick play: tricks with invalid cards
    const m6 = cloneMock();
    m6.deals[0].phases[1].tricks[0] = ["Ac", "Tc", "9z", "Kc"];
    expect(validateEgn(m6).isValid).toBe(false);
  });

  it("should validate alternative lines and annotations", () => {
    // negative branchIndex in alternative lines
    const m1 = cloneMock();
    m1.deals[0].alternativeLines[0].branchIndex = -1;
    expect(validateEgn(m1).isValid).toBe(false);

    // annotations with non-numeric key
    const m2 = cloneMock();
    m2.deals[0].phases[0].callAnnotations["abc"] = ["annotation text"];
    expect(validateEgn(m2).isValid).toBe(false);

    // annotations value not string array
    const m3 = cloneMock();
    m3.deals[0].phases[0].callAnnotations["2"] = "not-an-array";
    expect(validateEgn(m3).isValid).toBe(false);
  });
  it("should allow values containing HTML/script tags or mathematical comparison characters", () => {
    // 1. Math/HTML character in title
    const docWithMathTitle = cloneMock();
    docWithMathTitle.metadata.title = "Game Title: Team 1 < Team 2";
    expect(validateEgn(docWithMathTitle).isValid).toBe(true);

    // 2. Math/HTML character in description
    const docWithMathDesc = cloneMock();
    docWithMathDesc.metadata.description = "Win probability was > 95%";
    expect(validateEgn(docWithMathDesc).isValid).toBe(true);

    // 3. Math/HTML character in players names
    const docWithMathPlayer = cloneMock();
    docWithMathPlayer.metadata.players = ["Player0", "Player1", "Player2", "Player <3>"];
    expect(validateEgn(docWithMathPlayer).isValid).toBe(true);

    // 4. Math/HTML character in annotations
    const docWithMathAnnot = cloneMock();
    docWithMathAnnot.deals[0].phases[0].callAnnotations["3"] = ["Strong order by Player 3", "More info: 3 < 4"];
    expect(validateEgn(docWithMathAnnot).isValid).toBe(true);
  });

  it("should reject card strings that are blank", () => {
    const dataWithBlankCards = cloneMock();
    dataWithBlankCards.deals[0].initialState.upCard = "";

    const result = validateEgn(dataWithBlankCards);
    expect(result.isValid).toBe(false);
  });

  it("isEgnFile and isEGNFile should work correctly as type guards", () => {
    expect(isEgnFile(validMockData)).toBe(true);
    expect(isEgnFile({})).toBe(false);

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
        if (Array.isArray(val) && val.length === 0 && (key === "playerCards" || key === "cardExchanges" || key === "alternativeLines")) {
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
        if (key === "cardExchanges") {
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
    const tempBinFilePath = path.join(tempDir, "test_game.egnb");

    const jsonStr = JSON.stringify(validMockData, null, 2);

    try {
      convertEgnJsonToBin(jsonStr, tempBinFilePath);
      expect(fs.existsSync(tempBinFilePath)).toBe(true);

      const backJsonStr = convertBinToEgnJson(tempBinFilePath);
      const backObj = JSON.parse(backJsonStr);

      expect(normalizeCondensedEgn(backObj)).toEqual(normalizeCondensedEgn(validMockData));

      const result = validateEgn(backObj);
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
    const path = require("path");
    const tempDir = path.resolve(__dirname, "../temp_test_dir_expanded");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "test_game.egnb");

    const jsonStr = JSON.stringify(validMockData, null, 2);

    try {
      convertEgnJsonToBin(jsonStr, tempBinFilePath, false);
      expect(fs.existsSync(tempBinFilePath)).toBe(true);

      const backJsonStr = convertBinToEgnJson(tempBinFilePath, false);
      const backObj = JSON.parse(backJsonStr);

      expect(normalizeEgn(backObj)).toEqual(normalizeEgn(validMockData));

      const result = validateEgn(backObj);
      expect(result.isValid).toBe(true);
    } finally {
      deleteFileSync(tempBinFilePath);
      removeDirSync(tempDir);
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

  describe("validateDeal & isDeal", () => {
    it("should return valid result and true for conformant Deal object", () => {
      const deal = validMockData.deals[0];
      const result = validateDeal(deal);
      expect(result.isValid).toBe(true);
      expect(isDeal(deal)).toBe(true);
    });

    it("should validate successfully when phaseNumber is omitted in phases", () => {
      const dealWithoutPhaseNumbers = {
        dealNumber: 1,
        initialState: {
          dealer: 0,
          upCard: "Js"
        },
        phases: [
          {
            type: "EUCHRE_BIDDING",
            calls: ["Pass", "Pass", "Order", "Pass"]
          },
          {
            type: "TRICK_PLAY",
            tricks: [
              ["As", "Ks", "Qs", "Ts"],
              ["Ah", "Kh", "Qh", "Jh"],
              ["Ad", "Kd", "Qd", "Jd"],
              ["Ac", "Kc", "Qc", "Jc"],
              ["9s", "9h", "9d", "9c"]
            ]
          }
        ]
      };
      const result = validateDeal(dealWithoutPhaseNumbers);
      expect(result.isValid).toBe(true);
      expect(isDeal(dealWithoutPhaseNumbers)).toBe(true);

      const egnFileWithoutPhaseNumbers = {
        fileType: "Euchre Game Notation",
        version: "1.6",
        metadata: {
          players: ["North", "East", "South", "West"],
          initialScore: [0, 0]
        },
        deals: [dealWithoutPhaseNumbers]
      };
      const fileResult = validateEgn(egnFileWithoutPhaseNumbers);
      expect(fileResult.isValid).toBe(true);
      expect(isEgnFile(egnFileWithoutPhaseNumbers)).toBe(true);
    });

    it("should return invalid result and false for malformed Deal object", () => {
      const invalidDeal = {
        dealNumber: "not-a-number",
        initialState: {}
      };
      const result = validateDeal(invalidDeal);
      expect(result.isValid).toBe(false);
      expect(isDeal(invalidDeal)).toBe(false);
    });
  });

  describe("Metadata teamNames support", () => {
    it("should accept valid teamNames 2-tuple array", () => {
      const dataWithTeams = JSON.parse(JSON.stringify(validMockData));
      dataWithTeams.metadata.teamNames = ["Red Dragons", "Blue Jays"];
      const result = validateEgn(dataWithTeams);
      expect(result.isValid).toBe(true);
      expect(isEgnFile(dataWithTeams)).toBe(true);
    });

    it("should reject teamNames with fewer than 2 items", () => {
      const dataWithTeams = JSON.parse(JSON.stringify(validMockData));
      dataWithTeams.metadata.teamNames = ["Red Dragons"];
      const result = validateEgn(dataWithTeams);
      expect(result.isValid).toBe(false);
    });

    it("should reject teamNames with more than 2 items", () => {
      const dataWithTeams = JSON.parse(JSON.stringify(validMockData));
      dataWithTeams.metadata.teamNames = ["Team 1", "Team 2", "Team 3"];
      const result = validateEgn(dataWithTeams);
      expect(result.isValid).toBe(false);
    });

    it("should reject non-string items in teamNames", () => {
      const dataWithTeams = JSON.parse(JSON.stringify(validMockData));
      dataWithTeams.metadata.teamNames = ["Team 1", 123];
      const result = validateEgn(dataWithTeams);
      expect(result.isValid).toBe(false);
    });
  });

  describe("Shorthand bidding calls 'p' and 'o'", () => {
    it("should accept deals with shorthand 'p' and 'o' calls", () => {
      const dataWithShorthand = JSON.parse(JSON.stringify(validMockData));
      dataWithShorthand.deals[0].phases[0].calls = ["p", "p", "p", "o"];
      const result = validateEgn(dataWithShorthand);
      expect(result.isValid).toBe(true);
      expect(isEgnFile(dataWithShorthand)).toBe(true);
    });

    it("should validate isolated deal with shorthand 'p' and 'o'", () => {
      const dealWithShorthand = JSON.parse(JSON.stringify(validMockData.deals[0]));
      dealWithShorthand.phases[0].calls = ["p", "p", "p", "p", "p", "s"];
      const result = validateDeal(dealWithShorthand);
      expect(result.isValid).toBe(true);
      expect(isDeal(dealWithShorthand)).toBe(true);
    });
  });
});
