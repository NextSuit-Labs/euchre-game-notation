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
import { calculateEmnScores, addScoresToEmn, EmnFile } from "../../src/emn";
import { validateEmn } from "../../src/emn/validator";

describe("EMN Match Scoring Engine", () => {
  const sampleBestOf3: EmnFile = {
    fileType: "Euchre Match Notation",
    version: "1.1",
    metadata: {
      matchId: "match-demo-01",
      title: "Championship Series Table A",
      date: "2026-03-01",
      players: [
        { id: "p-01", name: "Alice" },
        { id: "p-02", name: "Bob" },
        { id: "p-03", name: "Charlie" },
        { id: "p-04", name: "David" },
      ],
      teams: [
        { id: "team-ns", name: "A & C", playerIds: ["p-01", "p-03"] },
        { id: "team-ew", name: "B & D", playerIds: ["p-02", "p-04"] },
      ],
      matchFormat: {
        type: "BEST_OF_N",
        target: 3,
      },
    },
    games: [
      {
        gameIndex: 0,
        playersOverride: ["p-01", "p-02", "p-03", "p-04"],
        gameData: {
          fileType: "Euchre Game Notation",
          version: "1.2",
          metadata: {
            title: "Game 1",
            players: ["Alice", "Bob", "Charlie", "David"],
            initialScore: [0, 0],
            finalScore: [10, 6],
          },
          deals: [],
        },
      },
      {
        gameIndex: 1,
        playersOverride: ["p-01", "p-02", "p-03", "p-04"],
        gameData: {
          fileType: "Euchre Game Notation",
          version: "1.2",
          metadata: {
            title: "Game 2",
            players: ["Alice", "Bob", "Charlie", "David"],
            initialScore: [0, 0],
            finalScore: [8, 10],
          },
          deals: [],
        },
      },
      {
        gameIndex: 2,
        playersOverride: ["p-01", "p-02", "p-03", "p-04"],
        gameData: {
          fileType: "Euchre Game Notation",
          version: "1.2",
          metadata: {
            title: "Game 3 (Decider)",
            players: ["Alice", "Bob", "Charlie", "David"],
            initialScore: [0, 0],
            finalScore: [10, 4],
          },
          deals: [],
        },
      },
    ],
  };

  it("calculates match standings and scores for BEST_OF_N with teams", () => {
    const res = calculateEmnScores(sampleBestOf3);

    expect(res.status).toBe("COMPLETED");
    expect(res.scores).toEqual({
      "p-01": 2,
      "p-02": 1,
      "p-03": 2,
      "p-04": 1,
    });
    expect(res.winner).toEqual(["p-01", "p-03"]);
    expect(res.teamScores).toEqual({
      "team-ns": 2,
      "team-ew": 1,
    });
    expect(res.gameScores).toHaveLength(3);
    expect(res.gameScores[0].finalScore).toEqual([10, 6]);
    expect(res.gameScores[0].winnerSeats).toEqual([0, 2]);
    expect(res.gameScores[0].winningPlayerIds).toEqual(["p-01", "p-03"]);

    expect(res.gameScores[1].finalScore).toEqual([8, 10]);
    expect(res.gameScores[1].winnerSeats).toEqual([1, 3]);
    expect(res.gameScores[1].winningPlayerIds).toEqual(["p-02", "p-04"]);
  });

  it("calculates points accurately for PROGRESSIVE format across partner rotations", () => {
    const progressiveMatch: EmnFile = {
      fileType: "Euchre Match Notation",
      version: "1.1",
      metadata: {
        title: "Progressive Round",
        players: [
          { id: "p-01", name: "Alice" },
          { id: "p-02", name: "Bob" },
          { id: "p-03", name: "Charlie" },
          { id: "p-04", name: "David" },
        ],
        matchFormat: {
          type: "PROGRESSIVE",
        },
      },
      games: [
        {
          gameIndex: 0,
          playersOverride: ["p-01", "p-02", "p-03", "p-04"], // Alice & Charlie (10), Bob & David (7)
          gameData: {
            fileType: "Euchre Game Notation",
            version: "1.6",
            metadata: {
              players: ["Alice", "Bob", "Charlie", "David"],
              initialScore: [0, 0],
              finalScore: [10, 7],
            },
            deals: [],
          },
        },
        {
          gameIndex: 1,
          playersOverride: ["p-01", "p-03", "p-02", "p-04"], // Alice & Bob (8), Charlie & David (10)
          gameData: {
            fileType: "Euchre Game Notation",
            version: "1.6",
            metadata: {
              players: ["Alice", "Charlie", "Bob", "David"],
              initialScore: [0, 0],
              finalScore: [8, 10],
            },
            deals: [],
          },
        },
      ],
    };

    const res = calculateEmnScores(progressiveMatch);

    // Alice: 10 + 8 = 18
    // Bob: 7 + 8 = 15
    // Charlie: 10 + 10 = 20
    // David: 7 + 10 = 17
    expect(res.scores).toEqual({
      "p-01": 18,
      "p-02": 15,
      "p-03": 20,
      "p-04": 17,
    });
    expect(res.winner).toEqual(["p-03"]);
    expect(res.status).toBe("COMPLETED");
  });

  it("dynamically evaluates score from game deals when metadata.finalScore is omitted", () => {
    const matchWithDeals: EmnFile = {
      fileType: "Euchre Match Notation",
      version: "1.1",
      metadata: {
        players: [
          { id: "p-01", name: "Alice" },
          { id: "p-02", name: "Bob" },
          { id: "p-03", name: "Charlie" },
          { id: "p-04", name: "David" },
        ],
        matchFormat: {
          type: "BEST_OF_N",
          target: 1,
        },
      },
      games: [
        {
          gameIndex: 0,
          playersOverride: ["p-01", "p-02", "p-03", "p-04"],
          gameData: {
            fileType: "Euchre Game Notation",
            version: "1.6",
            metadata: {
              players: ["Alice", "Bob", "Charlie", "David"],
              initialScore: [0, 0],
            },
            deals: [
              {
                dealNumber: 0,
                initialState: {
                  dealer: 0,
                  upCard: "9s",
                  playerCards: [
                    ["As", "Ks", "Qs", "Js", "Ts"],
                    ["9h", "Th", "Jh", "Qh", "Kh"],
                    ["9d", "Td", "Jd", "Qd", "Kd"],
                    ["9c", "Tc", "Jc", "Qc", "Kc"],
                  ],
                },
                phases: [
                  {
                    phaseNumber: 0,
                    type: "EUCHRE_BIDDING",
                    calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass"],
                  },
                ],
              },
            ],
          },
        },
      ],
    };

    const res = calculateEmnScores(matchWithDeals);
    expect(res.gameScores).toHaveLength(1);
    expect(res.gameScores[0].finalScore).toEqual([0, 0]);
  });

  it("accepts stringified JSON input", () => {
    const jsonStr = JSON.stringify(sampleBestOf3);
    const res = calculateEmnScores(jsonStr);
    expect(res.status).toBe("COMPLETED");
    expect(res.winner).toEqual(["p-01", "p-03"]);
  });

  it("updates EMN file with addScoresToEmn and validates against schema", () => {
    const updated = addScoresToEmn(sampleBestOf3);
    expect(updated.metadata.result).toBeDefined();
    expect(updated.metadata.result?.status).toBe("COMPLETED");
    expect(updated.metadata.result?.winner).toEqual(["p-01", "p-03"]);
    expect(updated.metadata.result?.scores).toEqual({
      "p-01": 2,
      "p-02": 1,
      "p-03": 2,
      "p-04": 1,
    });

    const validation = validateEmn(updated);
    expect(validation.isValid).toBe(true);
  });
});
