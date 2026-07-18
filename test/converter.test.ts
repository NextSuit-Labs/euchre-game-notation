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
import {
  convertBinDataToEgnFile,
  convertBinToEgnJson,
  convertEgnFileToBinData,
  convertEgnJsonToBin,
  detectBinaryFormatFromData,
} from "../src/converter";
import * as fs from "fs";
import * as path from "path";
import protobuf from "protobufjs";
import { COMMON_PROTO_SCHEMA, EXPANDED_PROTO_SCHEMA } from "../src/proto-schemas";
import { BiddingPhase, Deal, EgnFile } from "../src/types";
import { VERSION } from "../src/version";

const validMockData: EgnFile = {
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
        "dealer": 3,
        "upCard": "Jd"
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": ["Pass", "Pass", "Pass", "Order"],
          "isAlone": false,
          "callAnnotations": {
            8: ["High index annotation test"]
          }
        }
      ]
    }
  ]
};

describe("EGN Protobuf Converter Core", () => {
  it("should roundtrip metadata.players object entries in expanded mode", () => {
    const tempDir = path.resolve(__dirname, "../temp_test_dir_players_expanded");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "players-expanded.egnb");

    const playersData = {
      fileType: "Euchre Game Notation",
      version: VERSION,
      metadata: {
        players: [
          "P0",
          {
            name: "P1",
            playerIds: [
              { id: "abc123", source: "euchre-site" },
              { id: "p1-alt", source: "euchre-community" }
            ]
          },
          "P2",
          {
            name: "P3",
            playerIds: []
          }
        ],
        initialScore: [0, 0]
      },
      deals: []
    };

    try {
      convertEgnJsonToBin(JSON.stringify(playersData), tempBinFilePath, false);
      const decodedObj = JSON.parse(convertBinToEgnJson(tempBinFilePath, false));
      expect(decodedObj.metadata.players).toEqual(playersData.metadata.players);
    } finally {
      if (fs.existsSync(tempBinFilePath)) {
        fs.unlinkSync(tempBinFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  it("should roundtrip metadata.players object entries in condensed mode", () => {
    const tempDir = path.resolve(__dirname, "../temp_test_dir_players_condensed");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "players-condensed.egnb");

    const playersData = {
      fileType: "Euchre Game Notation",
      version: VERSION,
      metadata: {
        players: [
          "P0",
          {
            name: "P1",
            playerIds: [
              { id: "abc123", source: "euchre-site" }
            ]
          },
          "P2",
          {
            name: "P3",
            playerIds: []
          }
        ],
        initialScore: [0, 0]
      },
      deals: []
    };

    try {
      convertEgnJsonToBin(JSON.stringify(playersData), tempBinFilePath, true);
      const decodedObj = JSON.parse(convertBinToEgnJson(tempBinFilePath, true));
      expect(decodedObj.metadata.players).toEqual(playersData.metadata.players);
    } finally {
      if (fs.existsSync(tempBinFilePath)) {
        fs.unlinkSync(tempBinFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  it("should fail when converting invalid JSON to binary (protobuf verification)", () => {
    const invalidJsonStr = JSON.stringify({
      fileType: "Euchre Game Notation",
      version: VERSION,
      metadata: {
        players: "not-an-array", // Violates repeated string (array) expectation
        initialScore: [0, 0]
      },
      deals: []
    });

    const tempBinFilePath = path.join(__dirname, "invalid_temp_test.egnb");

    expect(() => {
      convertEgnJsonToBin(invalidJsonStr, tempBinFilePath);
    }).toThrow("Input EGN failed schema validation before binary conversion");

    if (fs.existsSync(tempBinFilePath)) {
      fs.unlinkSync(tempBinFilePath);
    }
  });

  it("should fail when converting non-existent binary file", () => {
    expect(() => {
      convertBinToEgnJson("non_existent_file.egnb");
    }).toThrow();
  });

  it("should successfully roundtrip annotations with high indices in expanded mode", () => {
    const tempDir = path.resolve(__dirname, "../temp_test_dir_annotations");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "test_game_annotations.egnb");
    const jsonStr = JSON.stringify(validMockData, null, 2);

    try {
      // 1. Convert to expanded binary
      convertEgnJsonToBin(jsonStr, tempBinFilePath, false);
      expect(fs.existsSync(tempBinFilePath)).toBe(true);

      // 2. Convert back to JSON
      const backJsonStr = convertBinToEgnJson(tempBinFilePath, false);
      const backObj = JSON.parse(backJsonStr);

      // Verify the annotations survived exactly
      const phase = backObj.deals[0].phases[0];
      expect(phase.callAnnotations).toBeDefined();

      // In JS, object keys are strings at runtime, so we check "8"
      expect(phase.callAnnotations["8"]).toEqual(["High index annotation test"]);
    } finally {
      if (fs.existsSync(tempBinFilePath)) {
        fs.unlinkSync(tempBinFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  it("should fail when converting a corrupted binary file to JSON", () => {
    const tempDir = path.resolve(__dirname, "../temp_test_dir_corrupted");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "corrupted.egnb");

    // Write trash bytes
    fs.writeFileSync(tempBinFilePath, Buffer.from([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc]));

    try {
      expect(() => {
        convertBinToEgnJson(tempBinFilePath);
      }).toThrow();
    } finally {
      if (fs.existsSync(tempBinFilePath)) {
        fs.unlinkSync(tempBinFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  it("should fail when binary input exceeds the maximum allowed size", () => {
    const oversizedBinary = new Uint8Array((8 * 1024 * 1024) + 1);

    expect(() => {
      convertBinDataToEgnFile(oversizedBinary);
    }).toThrow("Binary input too large for conversion");
  });

  it("should fail when decoded binary does not conform to the EGN schema", () => {
    const root = new protobuf.Root();
    protobuf.parse(COMMON_PROTO_SCHEMA, root, { keepCase: true });
    protobuf.parse(EXPANDED_PROTO_SCHEMA, root, { keepCase: true });
    const EgnFileMessage = root.lookupType("egn.EgnFile");

    const invalidDecodedData = {
      file_type: "Euchre Game Notation",
      version: VERSION,
      metadata: {
        players: ["P0", "P1", "P2", "P3"],
        initial_score: [0, 0],
        title: "a".repeat(129)
      },
      deals: []
    };

    const protoBuffer = EgnFileMessage.encode(EgnFileMessage.create(invalidDecodedData)).finish();
    const invalidBinary = new Uint8Array(protoBuffer.length + 1);
    invalidBinary[0] = 0x00;
    invalidBinary.set(protoBuffer, 1);

    expect(() => {
      convertBinDataToEgnFile(invalidBinary, false);
    }).toThrow("Decoded binary failed EGN schema validation");
  });

  it("should fail when input EGN does not conform to the schema before binary conversion", () => {
    const invalidEgn = {
      ...validMockData,
      metadata: {
        ...validMockData.metadata,
        title: "a".repeat(129)
      }
    } as EgnFile;

    expect(() => {
      convertEgnFileToBinData(invalidEgn, false);
    }).toThrow("Input EGN failed schema validation before binary conversion");
  });

  it("should reject non-numeric annotation map keys before binary conversion", () => {
    const unsafeAnnotations = Object.create(null) as Record<number, string[]>;
    (unsafeAnnotations as Record<string, string[]>)["__proto__"] = ["unsafe"];

    const invalidEgn = {
      ...validMockData,
      deals: [
        {
          ...(validMockData.deals[0] as Deal),
          phases: [
            {
              ...((validMockData.deals[0] as Deal).phases[0] as BiddingPhase),
              callAnnotations: unsafeAnnotations
            }
          ]
        }
      ]
    } as EgnFile;

    expect(() => {
      convertEgnFileToBinData(invalidEgn, false);
    }).toThrow("Invalid annotation map key: __proto__. Annotation keys must be numeric.");
  });

  it("should successfully roundtrip non-default ruleset configurations", () => {
    const tempDir = path.resolve(__dirname, "../temp_test_dir_rules");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "rules.egnb");

    const rulesData = {
      fileType: "Euchre Game Notation",
      version: VERSION,
      metadata: {
        players: ["P0", "P1", "P2", "P3"],
        initialScore: [4, 5],
        ruleset: {
          std: false,
          min_rank: 7,
          winning_score: 15,
          canadian: true,
          loner_lead: "LEFT_OF_LONER",
          farmers: true,
          partners_best: true,
          go_under: true,
          joker: true,
          allow_no_trump: true,
          fast_break: true,
          four_trick_tokens: true
        }
      },
      deals: []
    };

    try {
      const jsonStr = JSON.stringify(rulesData);

      // Test expanded mode roundtrip for all rules
      convertEgnJsonToBin(jsonStr, tempBinFilePath, false);
      const decodedJsonStr = convertBinToEgnJson(tempBinFilePath, false);
      const decodedObj = JSON.parse(decodedJsonStr);

      expect(decodedObj.metadata.ruleset).toEqual(rulesData.metadata.ruleset);
      expect(decodedObj.metadata.initialScore).toEqual(rulesData.metadata.initialScore);
    } finally {
      if (fs.existsSync(tempBinFilePath)) {
        fs.unlinkSync(tempBinFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  it("should preserve annotations and alternative lines in condensed mode", () => {
    const tempDir = path.resolve(__dirname, "../temp_test_dir_condensed_preservation");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "condensed.egnb");

    const testData = {
      fileType: "Euchre Game Notation",
      version: VERSION,
      metadata: {
        players: ["P0", "P1", "P2", "P3"],
        initialScore: [0, 0]
      },
      deals: [
        {
          dealNumber: 0,
          initialState: {
            dealer: 3,
            upCard: "Jd"
          },
          phases: [
            {
              phaseNumber: 0,
              type: "EUCHRE_BIDDING",
              calls: ["Pass", "Pass", "Pass", "Order"],
              isAlone: false,
              callAnnotations: {
                3: ["Annotation on order"]
              }
            }
          ],
          alternativeLines: [
            {
              branchIndex: 0,
              phases: [
                {
                  phaseNumber: 0,
                  type: "EUCHRE_BIDDING",
                  calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "s"],
                  isAlone: true
                }
              ]
            }
          ]
        }
      ]
    };

    try {
      const jsonStr = JSON.stringify(testData);

      // Convert to condensed binary
      convertEgnJsonToBin(jsonStr, tempBinFilePath, true);

      // Convert back to JSON
      const backJsonStr = convertBinToEgnJson(tempBinFilePath, true);
      const backObj = JSON.parse(backJsonStr);

      // Verify they are preserved
      const phase = backObj.deals[0].phases[0];
      expect(phase.callAnnotations).toBeDefined();
      expect(phase.callAnnotations["3"]).toEqual(["Annotation on order"]);

      expect(backObj.deals[0].alternativeLines).toBeDefined();
      expect(backObj.deals[0].alternativeLines.length).toBe(1);
      expect(backObj.deals[0].alternativeLines[0].branchIndex).toBe(0);
      expect(backObj.deals[0].alternativeLines[0].phases[0].calls).toEqual(["Pass", "Pass", "Pass", "Pass", "Pass", "s"]);
    } finally {
      if (fs.existsSync(tempBinFilePath)) {
        fs.unlinkSync(tempBinFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  it("should preserve discard and playerCards in condensed mode", () => {
    const tempDir = path.resolve(__dirname, "../temp_test_dir_condensed_discard_playercards");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "condensed-discard-playercards.egnb");

    const testData = {
      fileType: "Euchre Game Notation",
      version: VERSION,
      metadata: {
        players: ["P0", "P1", "P2", "P3"],
        initialScore: [0, 0]
      },
      deals: [
        {
          dealNumber: 0,
          initialState: {
            dealer: 3,
            upCard: "Jd",
            playerCards: [
              ["Ac", "Kc", "Qc", "Tc", "9c"],
              ["As", "Ks", "Qs", "Ts", "9s"],
              ["Ah", "Kh", "Qh", "Th", "9h"],
              ["Ad", "Kd", "Qd", "Td", "9d"]
            ]
          },
          phases: [
            {
              phaseNumber: 0,
              type: "EUCHRE_BIDDING",
              calls: ["Pass", "Pass", "Pass", "Order"],
              isAlone: false,
              discard: "9s"
            }
          ]
        }
      ]
    };

    try {
      convertEgnJsonToBin(JSON.stringify(testData), tempBinFilePath, true);
      const backObj = JSON.parse(convertBinToEgnJson(tempBinFilePath, true));
      expect(backObj.deals[0].phases[0].discard).toBe("9s");
      expect(backObj.deals[0].initialState.playerCards).toEqual(testData.deals[0].initialState.playerCards);
    } finally {
      if (fs.existsSync(tempBinFilePath)) {
        fs.unlinkSync(tempBinFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  it("should preserve aloneDefender in both condensed and expanded modes", () => {
    const tempDir = path.resolve(__dirname, "../temp_test_dir_alonedefer");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "alonedefer.egnb");

    const testData = {
      fileType: "Euchre Game Notation",
      version: VERSION,
      metadata: {
        players: ["P0", "P1", "P2", "P3"],
        initialScore: [0, 0],
        ruleset: {
          defend_alone: true
        }
      },
      deals: [
        {
          dealNumber: 0,
          initialState: {
            dealer: 3,
            upCard: "Jd"
          },
          phases: [
            {
              phaseNumber: 0,
              type: "EUCHRE_BIDDING",
              calls: ["Pass", "Pass", "Pass", "Order"],
              isAlone: true,
              aloneDefender: 1
            }
          ]
        }
      ]
    };

    try {
      const jsonStr = JSON.stringify(testData);

      // 1. Test condensed mode
      convertEgnJsonToBin(jsonStr, tempBinFilePath, true);
      let backObj = JSON.parse(convertBinToEgnJson(tempBinFilePath, true));
      expect(backObj.deals[0].phases[0].aloneDefender).toBe(1);

      // 2. Test expanded mode
      convertEgnJsonToBin(jsonStr, tempBinFilePath, false);
      backObj = JSON.parse(convertBinToEgnJson(tempBinFilePath, false));
      expect(backObj.deals[0].phases[0].aloneDefender).toBe(1);
    } finally {
      if (fs.existsSync(tempBinFilePath)) {
        fs.unlinkSync(tempBinFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  it("should roundtrip EgnFile objects directly through in-memory binary data", () => {
    const encodedCondensed = convertEgnFileToBinData(validMockData, true);
    expect(encodedCondensed).toBeInstanceOf(Uint8Array);
    expect(detectBinaryFormatFromData(encodedCondensed)).toBe("condensed");

    const decodedCondensed = convertBinDataToEgnFile(encodedCondensed);
    expect(decodedCondensed).toEqual(validMockData);

    const encodedExpanded = convertEgnFileToBinData(validMockData, false);
    expect(encodedExpanded).toBeInstanceOf(Uint8Array);
    expect(detectBinaryFormatFromData(encodedExpanded)).toBe("expanded");

    const decodedExpanded = convertBinDataToEgnFile(encodedExpanded);
    const expectedDeal = validMockData.deals[0] as Deal;
    const decodedDeal = decodedExpanded.deals[0] as Deal;
    const expectedPhase = expectedDeal.phases[0] as BiddingPhase;
    const decodedPhase = decodedDeal.phases[0] as BiddingPhase;
    expect(decodedExpanded as any).toMatchObject(validMockData as any);
    expect(decodedPhase.callAnnotations).toEqual(expectedPhase.callAnnotations);
  });
});

