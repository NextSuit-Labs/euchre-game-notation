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
import { extractEgnFromEmn, extractAllEgnsFromEmn } from "../../src/emn/extractor";
import { EmnFile } from "../../src/emn/types";
import { EgnFile } from "../../src/types";

const mockEmn: EmnFile = {
  fileType: "Euchre Match Notation",
  version: "1.1",
  metadata: {
    matchId: "match_123",
    title: "Testing Extractor",
    players: [
      { id: "p-01", name: "Alice Master" },
      { id: "p-02", name: "Bob Master" },
      { id: "p-03", name: "Charlie Master" },
      { id: "p-04", name: "David Master" },
    ],
  },
  games: [
    {
      gameIndex: 0,
      playersOverride: ["p-01", "p-02", "p-03", "p-04"],
      gameData: {
        fileType: "Euchre Game Notation",
        version: "1.4",
        metadata: {
          gameId: "g1",
          players: ["Alice Old", "Bob Old", "Charlie Old", "David Old"],
          initialScore: [0, 0],
        },
        deals: [],
      },
    },
    {
      gameIndex: 1,
      playersOverride: ["p-04", "p-03", "p-02", "p-01"],
      gameData: {
        fileType: "Euchre Game Notation",
        version: "1.4",
        metadata: {
          gameId: "g2",
          players: ["David Old", "Charlie Old", "Bob Old", "Alice Old"],
          initialScore: [0, 0],
        },
        deals: [],
      },
    },
  ],
};

describe("EMN Extractor", () => {
  it("should extract a single EGN game and perform player name replacements", () => {
    const egn: EgnFile = extractEgnFromEmn(mockEmn, 0);
    expect(egn.metadata.gameId).toBe("g1");
    expect(egn.metadata.players).toEqual([
      "Alice Master",
      "Bob Master",
      "Charlie Master",
      "David Master",
    ]);

    const egn2: EgnFile = extractEgnFromEmn(mockEmn, 1);
    expect(egn2.metadata.gameId).toBe("g2");
    expect(egn2.metadata.players).toEqual([
      "David Master",
      "Charlie Master",
      "Bob Master",
      "Alice Master",
    ]);
  });

  it("should extract all EGN games sorted by index", () => {
    const egns: EgnFile[] = extractAllEgnsFromEmn(mockEmn);
    expect(egns).toHaveLength(2);
    expect(egns[0].metadata.gameId).toBe("g1");
    expect(egns[0].metadata.players).toEqual([
      "Alice Master",
      "Bob Master",
      "Charlie Master",
      "David Master",
    ]);
    expect(egns[1].metadata.gameId).toBe("g2");
    expect(egns[1].metadata.players).toEqual([
      "David Master",
      "Charlie Master",
      "Bob Master",
      "Alice Master",
    ]);
  });

  it("should throw error when requesting non-existent index", () => {
    expect(() => extractEgnFromEmn(mockEmn, 99)).toThrow();
  });
});

import * as fs from "fs";
import * as path from "path";
import { combineEgnToEmn } from "../../src/emn/combiner";
import { upgradeEgn } from "../../src/cli-upgrade";

describe("EMN Roundtrip for Combination Examples", () => {
  it("should roundtrip a combined EMN back to EGNs and match the upgraded original EGNs", () => {
    const examplesDir = path.join(__dirname, "../../examples/combination examples");
    const egnFiles: EgnFile[] = [];
    const upgradedOriginals: EgnFile[] = [];

    for (let i = 1; i <= 6; i++) {
      const filePath = path.join(examplesDir, `MotE W5 G${i}.egn`);
      const raw = fs.readFileSync(filePath, "utf8");
      const json = JSON.parse(raw) as EgnFile;
      // We upgrade the original first to v1.4 format
      const upgraded = upgradeEgn(json);
      egnFiles.push(upgraded);
      upgradedOriginals.push(upgraded);
    }

    // Combine upgraded EGNs to EMN
    const emn = combineEgnToEmn(egnFiles, {
      format: "BEST_OF_N",
      target: 6,
      title: "MotE W5 Match"
    });

    // Extract EGNs back out
    const extracted = extractAllEgnsFromEmn(emn);

    expect(extracted).toHaveLength(6);

    // Compare each extracted EGN to the upgraded original EGN
    extracted.forEach((egn, idx) => {
      const upgradedOrig = upgradedOriginals[idx];
      expect(egn).toEqual(upgradedOrig);
    });
  });
});

