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
});
