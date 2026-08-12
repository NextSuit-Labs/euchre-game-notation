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

import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";
import {
  convertEmnFileToBinData,
  convertBinDataToEmnFile,
  convertEmnJsonToBinData,
  convertBinDataToEmnJson,
  convertEmnJsonToBin,
  convertBinToEmnJson,
  detectEmnBinaryFormatFromData,
  detectEmnBinaryFormat,
  unpackEmnFile,
  packEmnFile,
  MAGIC_BYTE_EMN,
  EmnFile,
  UnpackedEmnFile
} from "../../src/emn";

const mockSubEgn = {
  fileType: "Euchre Game Notation",
  version: "1.5",
  metadata: {
    title: "Game 1",
    players: ["Alice", "Bob", "Charlie", "David"],
    initialScore: [0, 0] as [number, number],
  },
  deals: [],
};

const validEmnMock: EmnFile = {
  fileType: "Euchre Match Notation",
  version: "1.1",
  metadata: {
    matchId: "match_01",
    title: "Championship Series",
    description: "Best of 3 series",
    date: "2026-07-20T12:00:00Z",
    players: [
      { id: "p-01", name: "Alice", playerIds: [{ id: "p-01", source: "test" }] },
      { id: "p-02", name: "Bob", playerIds: [{ id: "p-02", source: "test" }] },
      { id: "p-03", name: "Charlie", playerIds: [{ id: "p-03", source: "test" }] },
      { id: "p-04", name: "David", playerIds: [{ id: "p-04", source: "test" }] },
    ],
    matchFormat: {
      type: "BEST_OF_N",
      target: 3,
    },
    result: {
      status: "COMPLETED",
      winner: ["p-01", "p-03"],
      scores: { "p-01": 2, "p-03": 2, "p-02": 1, "p-04": 1 },
    },
  },
  games: [
    {
      gameIndex: 0,
      playersOverride: ["p-01", "p-02", "p-03", "p-04"],
      gameData: mockSubEgn as any,
    },
    {
      gameIndex: 1,
      playersOverride: ["p-01", "p-03", "p-02", "p-04"],
      gameData: mockSubEgn as any,
    },
  ],
};

describe("EMN Binary Converter (.emnb)", () => {
  const tempDir = path.join(__dirname, "../../temp_test_emnb");

  beforeAll(() => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("should encode EmnFile to binary bytes with magic byte 0x02 header", () => {
    const bytes = convertEmnFileToBinData(validEmnMock);
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes[0]).toBe(MAGIC_BYTE_EMN);
    expect(detectEmnBinaryFormatFromData(bytes)).toBe(true);
  });

  it("should roundtrip EmnFile -> binary bytes -> EmnFile cleanly", () => {
    const bytes = convertEmnFileToBinData(validEmnMock);
    const decoded = convertBinDataToEmnFile(bytes);

    expect(decoded.fileType).toBe("Euchre Match Notation");
    expect(decoded.version).toBe("1.1");
    expect(decoded.metadata.title).toBe("Championship Series");
    expect(decoded.games).toHaveLength(2);
    expect(decoded.games[0].playersOverride).toEqual(["p-01", "p-02", "p-03", "p-04"]);
  });

  it("should roundtrip EMN JSON string -> binary bytes -> JSON string", () => {
    const jsonStr = JSON.stringify(validEmnMock);
    const bytes = convertEmnJsonToBinData(jsonStr);
    const decodedJsonStr = convertBinDataToEmnJson(bytes);
    const decodedObj = JSON.parse(decodedJsonStr);

    expect(decodedObj.metadata.title).toBe("Championship Series");
  });

  it("should convert EMN JSON file to .emnb binary file and back", () => {
    const jsonPath = path.join(tempDir, "match.emn");
    const binPath = path.join(tempDir, "match.emnb");

    fs.writeFileSync(jsonPath, JSON.stringify(validEmnMock, null, 2), "utf8");

    // Convert .emn to .emnb
    convertEmnJsonToBin(jsonPath, binPath);
    expect(fs.existsSync(binPath)).toBe(true);
    expect(detectEmnBinaryFormat(binPath)).toBe(true);

    // Convert .emnb back to .emn JSON string
    const decodedJsonStr = convertBinToEmnJson(binPath);
    const decodedObj = JSON.parse(decodedJsonStr);

    expect(decodedObj.metadata.matchFormat?.type).toBe("BEST_OF_N");
    expect(decodedObj.games[1].playersOverride).toEqual(["p-01", "p-03", "p-02", "p-04"]);
  });

  it("should roundtrip the sample MotE W5 Match.emn -> .emnb binary -> decoded EMN", () => {
    const sampleEmnPath = path.join(__dirname, "../../examples/combination examples/MotE W5 Match.emn");
    const rawJsonStr = fs.readFileSync(sampleEmnPath, "utf8");
    const originalEmn: EmnFile = JSON.parse(rawJsonStr);

    // Convert EMN -> EMNB binary bytes
    const binaryBytes = convertEmnFileToBinData(originalEmn);
    expect(binaryBytes[0]).toBe(MAGIC_BYTE_EMN);
    expect(detectEmnBinaryFormatFromData(binaryBytes)).toBe(true);

    // Convert EMNB binary bytes -> EMN File
    const decodedEmn = convertBinDataToEmnFile(binaryBytes);

    expect(decodedEmn.fileType).toBe("Euchre Match Notation");
    expect(decodedEmn.version).toBe("1.1");
    expect(decodedEmn.metadata.title).toBe(originalEmn.metadata.title);
    expect(decodedEmn.metadata.players).toHaveLength(originalEmn.metadata.players.length);
    expect(decodedEmn.games).toHaveLength(originalEmn.games.length);

    // Verify all game indexes, seat assignments, titles, and deal counts match
    originalEmn.games.forEach((game, idx) => {
      expect(decodedEmn.games[idx].gameIndex).toBe(game.gameIndex);
      expect(decodedEmn.games[idx].playersOverride).toEqual(game.playersOverride);
      expect(decodedEmn.games[idx].gameData.metadata.title).toBe(game.gameData.metadata.title);
      expect(decodedEmn.games[idx].gameData.deals).toHaveLength(game.gameData.deals.length);
    });
  });

  it("should automatically condense/bitpack embedded EGN deal objects when condenseGames is true (default)", () => {
    const sampleEmnPath = path.join(__dirname, "../../examples/combination examples/MotE W5 Match.emn");
    const rawJsonStr = fs.readFileSync(sampleEmnPath, "utf8");
    const originalEmn: EmnFile = JSON.parse(rawJsonStr);

    // Condensed encoding (default)
    const condensedBytes = convertEmnFileToBinData(originalEmn, { condenseGames: true });
    // Expanded encoding
    const expandedBytes = convertEmnFileToBinData(originalEmn, { condenseGames: false });

    // Condensed binary payload should be smaller than expanded payload
    expect(condensedBytes.length).toBeLessThan(expandedBytes.length);

    // Both should decode back to valid EmnFile objects
    const decodedCondensed = convertBinDataToEmnFile(condensedBytes);
    const decodedExpanded = convertBinDataToEmnFile(expandedBytes);

    expect(decodedCondensed.games).toHaveLength(originalEmn.games.length);
    expect(decodedExpanded.games).toHaveLength(originalEmn.games.length);

    // Verify deals in decodedCondensed are condensed deal strings
    expect(typeof decodedCondensed.games[0].gameData.deals[0]).toBe("string");
  });

  it("should unpack all embedded sub-game deals when unpackEmnFile or unpackGames is used", () => {
    const sampleEmnPath = path.join(__dirname, "../../examples/combination examples/MotE W5 Match.emn");
    const rawJsonStr = fs.readFileSync(sampleEmnPath, "utf8");
    const originalEmn: EmnFile = JSON.parse(rawJsonStr);

    // Create a bitpacked binary payload
    const condensedBytes = convertEmnFileToBinData(originalEmn, { condenseGames: true });

    // Decode with unpackGames: true
    const unpackedEmn: UnpackedEmnFile = convertBinDataToEmnFile(condensedBytes, { unpackGames: true }) as UnpackedEmnFile;
    expect(typeof unpackedEmn.games[0].gameData.deals[0]).toBe("object");
    expect(unpackedEmn.games[0].gameData.deals[0].dealNumber).toBe(0);

    // Test standalone unpackEmnFile
    const packedEmn = packEmnFile(originalEmn);
    expect(typeof packedEmn.games[0].gameData.deals[0]).toBe("string");

    const manualUnpacked = unpackEmnFile(packedEmn);
    expect(typeof manualUnpacked.games[0].gameData.deals[0]).toBe("object");
    expect(manualUnpacked.games[0].gameData.deals[0].dealNumber).toBe(0);
  });
});
