import { describe, it, expect } from "@jest/globals";
import { convertBinToEgnJson, convertEgnJsonToBin } from "../src/converter";
import * as fs from "fs";
import * as path from "path";
import { VERSION } from "../src/version";

const validMockData = {
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
    const tempBinFilePath = path.join(tempDir, "players-expanded.bin");

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
    const tempBinFilePath = path.join(tempDir, "players-condensed.bin");

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

    const tempBinFilePath = path.join(__dirname, "invalid_temp_test.bin");

    expect(() => {
      convertEgnJsonToBin(invalidJsonStr, tempBinFilePath);
    }).toThrow("Protobuf verification failed");

    if (fs.existsSync(tempBinFilePath)) {
      fs.unlinkSync(tempBinFilePath);
    }
  });

  it("should fail when converting non-existent binary file", () => {
    expect(() => {
      convertBinToEgnJson("non_existent_file.bin");
    }).toThrow();
  });

  it("should successfully roundtrip annotations with high indices in expanded mode", () => {
    const tempDir = path.resolve(__dirname, "../temp_test_dir_annotations");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "test_game_annotations.bin");
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
    const tempBinFilePath = path.join(tempDir, "corrupted.bin");

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

  it("should successfully roundtrip non-default ruleset configurations", () => {
    const tempDir = path.resolve(__dirname, "../temp_test_dir_rules");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempBinFilePath = path.join(tempDir, "rules.bin");

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
    const tempBinFilePath = path.join(tempDir, "condensed.bin");

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
    const tempBinFilePath = path.join(tempDir, "condensed-discard-playercards.bin");

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
    const tempBinFilePath = path.join(tempDir, "alonedefer.bin");

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
});

