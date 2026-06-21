import { describe, it, expect } from "@jest/globals";
import { convertBinToEgnJson, convertEgnJsonToBin } from "../src/converter";
import * as fs from "fs";
import * as path from "path";

const validMockData = {
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
        "dealer": 3,
        "upCard": "Jd",
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": ["Pass", "Pass", "Pass", "Order"],
          "isAlone": false,
          "calls_annotations": {
            8: ["High index annotation test"]
          }
        }
      ]
    }
  ]
};

describe("EGN Protobuf Converter Core", () => {
  it("should fail when converting invalid JSON to binary (protobuf verification)", () => {
    const invalidJsonStr = JSON.stringify({
      fileType: "Euchre Game Notation",
      version: "1.0.0",
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
      expect(phase.calls_annotations).toBeDefined();
      
      // In JS, object keys are strings at runtime, so we check "8"
      expect(phase.calls_annotations["8"]).toEqual(["High index annotation test"]);
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
      version: "1.0.0",
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
});

