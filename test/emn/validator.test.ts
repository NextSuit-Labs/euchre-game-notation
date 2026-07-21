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
import { validateEmn, isEmnFile } from "../../src/emn/validator";
import { emnToBinary, binaryToEmn } from "../../src/emn/converter";
import { combineEgnToEmn } from "../../src/emn/cli-combine";
import { EmnFile } from "../../src/emn/types";
import { EgnFile } from "../../src/types";

const mockSubEgn: EgnFile = {
  fileType: "Euchre Game Notation",
  version: "1.4",
  metadata: {
    gameId: "game_01",
    title: "Game 1",
    players: ["Alice", "Bob", "Charlie", "David"],
    initialScore: [0, 0],
  },
  deals: [],
};

const validEmnMock: EmnFile = {
  fileType: "Euchre Match Notation",
  version: "1.0",
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
      players: ["p-01", "p-02", "p-03", "p-04"],
      gameData: mockSubEgn,
    },
    {
      gameIndex: 1,
      players: ["p-01", "p-03", "p-02", "p-04"],
      gameData: mockSubEgn,
    },
  ],
};

describe("Euchre Match Notation (EMN) Validation", () => {
  it("validates a conformant EMN file successfully", () => {
    const res = validateEmn(validEmnMock);
    expect(res.isValid).toBe(true);
    expect(isEmnFile(validEmnMock)).toBe(true);
  });

  it("fails validation for invalid fileType", () => {
    const invalid = { ...validEmnMock, fileType: "Invalid Notation" };
    const res = validateEmn(invalid);
    expect(res.isValid).toBe(false);
  });

  it("fails validation if duplicate master player IDs exist", () => {
    const invalid = {
      ...validEmnMock,
      metadata: {
        ...validEmnMock.metadata,
        players: [
          { id: "p-01", name: "Alice" },
          { id: "p-01", name: "Bob" }, // Duplicate ID
        ],
      },
    };
    const res = validateEmn(invalid);
    expect(res.isValid).toBe(false);
    expect(res.errors?.some((e) => e.message?.includes("Duplicate master player ID"))).toBe(true);
  });

  it("fails validation if game references a non-existent player ID", () => {
    const invalid: any = {
      ...validEmnMock,
      games: [
        {
          gameIndex: 0,
          players: ["p-01", "p-02", "p-99", "p-04"], // p-99 does not exist
          gameData: mockSubEgn,
        },
      ],
    };
    const res = validateEmn(invalid);
    expect(res.isValid).toBe(false);
    expect(res.errors?.some((e) => e.message?.includes("not found in metadata.players"))).toBe(true);
  });

  it("fails validation if a game does not have exactly 4 players", () => {
    const invalid: any = {
      ...validEmnMock,
      games: [
        {
          gameIndex: 0,
          players: ["p-01", "p-02", "p-03"], // Only 3 players
          gameData: mockSubEgn,
        },
      ],
    };
    const res = validateEmn(invalid);
    expect(res.isValid).toBe(false);
  });
});

describe("EMN Protobuf Binary Conversion", () => {
  it("encodes and decodes EMN files to and from binary bytes", () => {
    const binary = emnToBinary(validEmnMock);
    expect(binary[0]).toBe(0x02); // MAGIC_BYTE_EMN

    const decoded = binaryToEmn(binary);
    expect(decoded.fileType).toBe("Euchre Match Notation");
    expect(decoded.metadata.title).toBe("Championship Series");
    expect(decoded.metadata.players.length).toBe(4);
    expect(decoded.games.length).toBe(2);
    expect(decoded.games[0].players).toEqual(["p-01", "p-02", "p-03", "p-04"]);
  });
});

describe("EMN Combine Utility", () => {
  it("combines multiple EGN files into a single valid EMN file", () => {
    const g1: EgnFile = {
      fileType: "Euchre Game Notation",
      version: "1.4",
      metadata: { players: ["Alice", "Bob", "Charlie", "David"], initialScore: [0, 0] },
      deals: [],
    };
    const g2: EgnFile = {
      fileType: "Euchre Game Notation",
      version: "1.4",
      metadata: { players: ["Alice", "Charlie", "Bob", "Eve"], initialScore: [0, 0] },
      deals: [],
    };

    const combined = combineEgnToEmn([g1, g2], {
      format: "BEST_OF_N",
      target: 3,
      title: "Combined Match",
    });

    expect(combined.fileType).toBe("Euchre Match Notation");
    expect(combined.metadata.players.length).toBe(5); // Alice, Bob, Charlie, David, Eve
    expect(combined.games.length).toBe(2);
    expect(validateEmn(combined).isValid).toBe(true);
  });

  it("successfully combines real files from examples/combination examples", () => {
    const fs = require("fs");
    const path = require("path");
    const { upgradeEgn } = require("../../src/cli-upgrade");

    const comboDir = path.resolve(__dirname, "../../examples/combination examples");
    const files = fs.readdirSync(comboDir).filter((f: string) => f.endsWith(".egn"));
    expect(files.length).toBeGreaterThan(0);

    const egnFiles: EgnFile[] = files.map((file: string) => {
      const content = fs.readFileSync(path.join(comboDir, file), "utf8");
      const json = JSON.parse(content);
      return upgradeEgn(json);
    });

    const combined = combineEgnToEmn(egnFiles, {
      format: "FIXED_GAMES",
      target: files.length,
      title: "MotE Week 5 Combined Match",
    });

    const validation = validateEmn(combined);
    expect(validation.isValid).toBe(true);
    expect(combined.games.length).toBe(files.length);

    // Verify binary roundtrip of combined match
    const binary = emnToBinary(combined);
    expect(binary[0]).toBe(0x02);
    const decoded = binaryToEmn(binary);
    expect(decoded.games.length).toBe(files.length);
  });

  it("automatically infers metadata.result when sub-EGN files contain finalScore", () => {
    const g1: EgnFile = {
      fileType: "Euchre Game Notation",
      version: "1.4",
      metadata: {
        players: ["Alice", "Bob", "Charlie", "David"],
        initialScore: [0, 0],
        finalScore: [10, 8], // Team 0 (Alice & Charlie) wins
      },
      deals: [],
    };
    const g2: EgnFile = {
      fileType: "Euchre Game Notation",
      version: "1.4",
      metadata: {
        players: ["Alice", "Bob", "Charlie", "David"],
        initialScore: [0, 0],
        finalScore: [10, 6], // Team 0 (Alice & Charlie) wins
      },
      deals: [],
    };

    const combined = combineEgnToEmn([g1, g2], {
      format: "BEST_OF_N",
      target: 3,
      title: "Series with Final Scores",
    });

    expect(combined.metadata.result).toBeDefined();
    expect(combined.metadata.result?.status).toBe("COMPLETED");
    expect(combined.metadata.result?.winner).toEqual(["p-01", "p-03"]); // Alice & Charlie
    expect(combined.metadata.result?.scores).toEqual({
      "p-01": 2,
      "p-02": 0,
      "p-03": 2,
      "p-04": 0,
    });
  });

  it("calculates individual cumulative points for PROGRESSIVE format", () => {
    const g1: EgnFile = {
      fileType: "Euchre Game Notation",
      version: "1.4",
      metadata: {
        players: ["Alice", "Bob", "Charlie", "David"],
        initialScore: [0, 0],
        finalScore: [10, 7], // Team 0 gets 10, Team 1 gets 7
      },
      deals: [],
    };
    const g2: EgnFile = {
      fileType: "Euchre Game Notation",
      version: "1.4",
      metadata: {
        players: ["Alice", "Charlie", "Bob", "David"],
        initialScore: [0, 0],
        finalScore: [8, 10], // Team 0 gets 8, Team 1 gets 10
      },
      deals: [],
    };

    const combined = combineEgnToEmn([g1, g2], {
      format: "PROGRESSIVE",
      target: 2,
      title: "Progressive Session",
    });

    expect(combined.metadata.result).toBeDefined();
    expect(combined.metadata.result?.status).toBe("COMPLETED");
    // g1: Alice (p-01) & Charlie (p-03) get 10; Bob (p-02) & David (p-04) get 7
    // g2: Alice (p-01) & Bob (p-02) get 8; Charlie (p-03) & David (p-04) get 10
    // Total Alice (p-01): 10 + 8 = 18
    // Total Bob (p-02): 7 + 8 = 15
    // Total Charlie (p-03): 10 + 10 = 20
    // Total David (p-04): 7 + 10 = 17
    expect(combined.metadata.result?.scores).toEqual({
      "p-01": 18,
      "p-02": 15,
      "p-03": 20,
      "p-04": 17,
    });
    expect(combined.metadata.result?.winner).toEqual(["p-03"]);
  });
});
