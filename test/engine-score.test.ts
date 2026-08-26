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
import * as path from "path";
import { describe, it, expect } from "@jest/globals";
import {
  determineTrump,
  determineMaker,
  determineIsAlone,
  determineLeadSeat,
  getLeftBowerSuit,
  getCardValue,
  getWinnerIndex,
  getPlayerIndexInTrick,
  compileDealSteps,
  calculateDealScoreChange,
  calculateFinalScore,
  addFinalScoreToEgn,
  addFinalScoreToEgnFile,
} from "../src/engine";
import { packEgnFile, unpackEgnFile } from "../src/converter";
import { Deal, EgnFile, Metadata } from "../src/types";
import { validateEgn } from "../src/validator";

describe("EGN Rules Engine & Scoring Utility", () => {
  const examplesDir = path.resolve(__dirname, "../examples");
  const sixPointsPath = path.join(examplesDir, "Six Points in Two Hands.egn");
  const epicComebackPath = path.join(examplesDir, "Epic Comeback.egn");
  const meAndBearsPath = path.join(examplesDir, "Me and Bears.egn");
  const vwecFinalsPath = path.join(examplesDir, "VWEC Finals.egn");
  const vwecAnnotatedPath = path.join(examplesDir, "VWEC Finals Annotated.egn");
  const quiteTheHustlePath = path.join(examplesDir, "Quite the Hustle Annotated.egn");
  const customScenarioPath = path.join(examplesDir, "Custom Scenario.egn");

  describe("Bidding & Trump Determination", () => {
    it("identifies trump from Round 1 calls (Order, PickUp, Alone, Call)", () => {
      const makeDeal = (call: string, upCard: string): Deal => ({
        dealNumber: 0,
        initialState: { dealer: 0, upCard },
        phases: [{ phaseNumber: 0, type: "EUCHRE_BIDDING", calls: [call as any] }],
      });

      expect(determineTrump(makeDeal("Order", "Ks"))).toBe("s");
      expect(determineTrump(makeDeal("PickUp", "9h"))).toBe("h");
      expect(determineTrump(makeDeal("Alone", "Jd"))).toBe("d");
      expect(determineTrump(makeDeal("Call", "Tc"))).toBe("c");
    });

    it("identifies trump from Round 2 calls", () => {
      const dealR2: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          {
            phaseNumber: 0,
            type: "EUCHRE_BIDDING",
            calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "h"],
          },
        ],
      };
      expect(determineTrump(dealR2)).toBe("h");
    });

    it("returns null when all players pass or bidding is missing", () => {
      const allPassDeal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [{ phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass"] }],
      };
      expect(determineTrump(allPassDeal)).toBeNull();
      expect(determineMaker(allPassDeal)).toBeNull();

      const noPhasesDeal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [],
      };
      expect(determineTrump(noPhasesDeal)).toBeNull();
      expect(determineMaker(noPhasesDeal)).toBeNull();
      expect(determineIsAlone(noPhasesDeal)).toBe(false);
    });

    it("calculates maker seat correctly for different dealer and call positions", () => {
      // Dealer = 0, callIndex = 0 (Seat 1 calls) -> Maker = 1
      const dealSeat1: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [{ phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"] }],
      };
      expect(determineMaker(dealSeat1)).toBe(1);

      // Dealer = 3, callIndex = 0 (Seat 0 calls) -> Maker = (3 + 0 + 1) % 4 = 0
      const dealDealer3: Deal = {
        dealNumber: 0,
        initialState: { dealer: 3, upCard: "9s" },
        phases: [{ phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"] }],
      };
      expect(determineMaker(dealDealer3)).toBe(0);

      // Dealer = 1, callIndex = 3 (Dealer pick up) -> Maker = (1 + 3 + 1) % 4 = 1
      const dealDealerPickUp: Deal = {
        dealNumber: 0,
        initialState: { dealer: 1, upCard: "9s" },
        phases: [{ phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Pass", "Pass", "Pass", "Order"] }],
      };
      expect(determineMaker(dealDealerPickUp)).toBe(1);
    });
  });

  describe("Lead Seat Determination & Loner Rules", () => {
    it("returns left of dealer for standard hands", () => {
      const deal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 2, upCard: "9s" },
        phases: [{ phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"] }],
      };
      expect(determineLeadSeat(deal)).toBe(3); // Left of dealer 2 is 3
    });

    it("handles loner lead rules (LEFT_OF_DEALER vs LEFT_OF_LONER)", () => {
      // Dealer is 0. Seat 3 calls alone (Maker = 3).
      const lonerDeal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          {
            phaseNumber: 0,
            type: "EUCHRE_BIDDING",
            calls: ["Pass", "Pass", "Order"],
            isAlone: true,
          },
        ],
      };
      expect(determineIsAlone(lonerDeal)).toBe(true);

      // Under LEFT_OF_DEALER when seat 3 goes alone, partner seat 1 sits out, so seat 2 leads:
      expect(determineLeadSeat(lonerDeal, "LEFT_OF_DEALER")).toBe(2);

      // Under LEFT_OF_LONER when seat 3 goes alone, seat (3 + 1) % 4 = 0 leads:
      expect(determineLeadSeat(lonerDeal, "LEFT_OF_LONER")).toBe(0);
    });
  });

  describe("Card Valuation & Bower Mechanics", () => {
    it("identifies Left Bower suits correctly for all 4 suits", () => {
      expect(getLeftBowerSuit("s")).toBe("c");
      expect(getLeftBowerSuit("c")).toBe("s");
      expect(getLeftBowerSuit("h")).toBe("d");
      expect(getLeftBowerSuit("d")).toBe("h");
      expect(getLeftBowerSuit("")).toBeNull();
    });

    it("evaluates Right Bower as highest card (100)", () => {
      expect(getCardValue("Js", "c", "s")).toBe(100);
      expect(getCardValue("Jh", "s", "h")).toBe(100);
      expect(getCardValue("Jd", "d", "d")).toBe(100);
      expect(getCardValue("Jc", "h", "c")).toBe(100);
    });

    it("evaluates Left Bower as second highest card (99)", () => {
      // Trump = Spades ('s') -> Jc is Left Bower
      expect(getCardValue("Jc", "c", "s")).toBe(99);
      // Trump = Hearts ('h') -> Jd is Left Bower
      expect(getCardValue("Jd", "h", "h")).toBe(99);
      // Trump = Diamonds ('d') -> Jh is Left Bower
      expect(getCardValue("Jh", "s", "d")).toBe(99);
      // Trump = Clubs ('c') -> Js is Left Bower
      expect(getCardValue("Js", "s", "c")).toBe(99);
    });

    it("evaluates trump hierarchy above non-trump led suits", () => {
      const trump = "h";
      const ledSuit = "s";

      const rightBower = getCardValue("Jh", ledSuit, trump); // 100
      const leftBower = getCardValue("Jd", ledSuit, trump);  // 99
      const trumpAce = getCardValue("Ah", ledSuit, trump);    // 94
      const trumpKing = getCardValue("Kh", ledSuit, trump);   // 93
      const trumpNine = getCardValue("9h", ledSuit, trump);   // 89
      const ledAce = getCardValue("As", ledSuit, trump);      // 54
      const ledKing = getCardValue("Ks", ledSuit, trump);     // 53
      const offSuitAce = getCardValue("Ac", ledSuit, trump);  // 0 (Clubs not led, not trump)

      expect(rightBower).toBeGreaterThan(leftBower);
      expect(leftBower).toBeGreaterThan(trumpAce);
      expect(trumpAce).toBeGreaterThan(trumpKing);
      expect(trumpKing).toBeGreaterThan(trumpNine);
      expect(trumpNine).toBeGreaterThan(ledAce);
      expect(ledAce).toBeGreaterThan(ledKing);
      expect(ledKing).toBeGreaterThan(offSuitAce);
    });

    it("evaluates extended ranks (7s and 8s)", () => {
      expect(getCardValue("8s", "c", "s")).toBe(88);
      expect(getCardValue("7s", "c", "s")).toBe(87);
      expect(getCardValue("8c", "c", "s")).toBe(48);
      expect(getCardValue("7c", "c", "s")).toBe(47);
    });
  });

  describe("Trick Winner & Sit-Out Player Turns", () => {
    it("identifies trick winner when trump is played", () => {
      // Led suit: Hearts ('h'), Trump: Diamonds ('d')
      const trick = ["Ah", "Kh", "9d", "Qh"];
      expect(getWinnerIndex(trick, "d")).toBe(2); // 9d is trump, beats Ah
    });

    it("identifies trick winner when only off-suit is played", () => {
      // Led suit: Clubs ('c'), Trump: Spades ('s')
      const trick = ["Tc", "Qc", "Ac", "9c"];
      expect(getWinnerIndex(trick, "s")).toBe(2); // Ac wins
    });

    it("correctly skips sitting out player in turn indexing", () => {
      // Lead seat = 0, sitOutSeat = 2 (Partner sitting out)
      // Card 0 -> Seat 0
      // Card 1 -> Seat 1
      // Card 2 -> Seat 3 (skips Seat 2!)
      expect(getPlayerIndexInTrick(0, 0, 2)).toBe(0);
      expect(getPlayerIndexInTrick(0, 1, 2)).toBe(1);
      expect(getPlayerIndexInTrick(0, 2, 2)).toBe(3);

      // Lead seat = 3, sitOutSeat = 1
      // Card 0 -> Seat 3
      // Card 1 -> Seat 0
      // Card 2 -> Seat 2 (skips Seat 1!)
      expect(getPlayerIndexInTrick(3, 0, 1)).toBe(3);
      expect(getPlayerIndexInTrick(3, 1, 1)).toBe(0);
      expect(getPlayerIndexInTrick(3, 2, 1)).toBe(2);
    });
  });

  describe("Scoring Scenarios & Point Rules", () => {
    it("awards 1 point for 3 tricks won by calling team", () => {
      // Create a simulated 3-2 deal
      const deal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"] }, // Seat 1 (Team 1) calls
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["As", "9s", "Ks", "Qs"], // Lead seat 1. Winner is seat 1 (Team 1) -> 1
              ["Ah", "9h", "Kh", "Qh"], // Lead seat 1. Winner is seat 1 (Team 1) -> 2
              ["Ac", "9c", "Kc", "Qc"], // Lead seat 1. Winner is seat 1 (Team 1) -> 3
              ["Ad", "9d", "Kd", "Qd"], // Lead seat 1. Winner is seat 0 (Team 0) -> 1
              ["Td", "Jd", "Qd", "Kd"], // Lead seat 0. Winner is seat 3 (Team 1) -> 4
            ],
          },
        ],
      };

      const [t0, t1] = calculateDealScoreChange(deal);
      expect(t0).toBe(0);
      expect(t1).toBe(1); // Team 1 called and won 4 tricks -> 1 point
    });

    it("awards 2 points for a 5-trick march by calling team", () => {
      const egn: EgnFile = JSON.parse(fs.readFileSync(sixPointsPath, "utf8"));
      const deal1 = egn.deals[1];
      const delta = calculateDealScoreChange(deal1, egn.metadata, 1);
      expect(delta).toEqual([2, 0]); // Team 0 marched -> 2 points
    });

    it("awards 4 points for a loner march", () => {
      const egn: EgnFile = JSON.parse(fs.readFileSync(sixPointsPath, "utf8"));
      const deal0 = egn.deals[0];
      const delta = calculateDealScoreChange(deal0, egn.metadata, 0);
      expect(delta).toEqual([4, 0]); // Team 0 loner march -> 4 points
    });

    it("respects custom loner_march_score and loner_euchred_score in ruleset", () => {
      const customMeta: Metadata = {
        players: ["A", "B", "C", "D"],
        initialScore: [0, 0],
        ruleset: {
          loner_march_score: 5,
          loner_euchred_score: 4,
        },
      };

      const egn: EgnFile = JSON.parse(fs.readFileSync(sixPointsPath, "utf8"));
      const deal0 = egn.deals[0]; // Loner march deal

      const delta = calculateDealScoreChange(deal0, customMeta, 0);
      expect(delta).toEqual([5, 0]); // Custom loner march = 5 points
    });

    it("awards 2 points to defending team for euchring the maker", () => {
      // Seat 1 (Team 1) orders up trump ('s' / Spades) on dealer 0
      // Team 0 (Seats 0 and 2) wins 3 tricks, defending and euchring Team 1!
      const deal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"] }, // Seat 1 (Team 1) calls
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              // Trick 1: Seat 1 leads 9h. Seat 2 plays Ah (wins -> Team 0)
              ["9h", "Ah", "Kh", "Qh"],
              // Trick 2: Seat 2 leads 9c. Seat 3 plays Tc, Seat 0 plays Ac (wins -> Team 0)
              ["9c", "Tc", "Ac", "Qc"],
              // Trick 3: Seat 0 leads 9d. Seat 1 plays Td, Seat 2 plays Ad (wins -> Team 0)
              ["9d", "Td", "Ad", "Kd"],
              // Trick 4: Seat 2 leads 9s. Seat 3 plays As (wins -> Team 1)
              ["9s", "As", "Ks", "Ts"],
              // Trick 5: Seat 3 leads Js (Right Bower -> wins -> Team 1)
              ["Js", "Qs", "Jh", "Jc"],
            ],
          },
        ],
      };

      const [t0, t1] = calculateDealScoreChange(deal);
      expect(t0).toBe(2); // Defending Team 0 euchred calling Team 1 -> 2 points
      expect(t1).toBe(0);
    });
  });

  describe("Full Game Simulation & Real-World Examples", () => {
    const allExamples = [
      { name: "Six Points in Two Hands", path: sixPointsPath, expectedFinal: [10, 9] },
      { name: "Epic Comeback", path: epicComebackPath, expectedMinWinnerScore: 10 },
      { name: "Me and Bears", path: meAndBearsPath, expectedMinWinnerScore: 10 },
      { name: "VWEC Finals", path: vwecFinalsPath, expectedMinWinnerScore: 10 },
      { name: "VWEC Finals Annotated", path: vwecAnnotatedPath, expectedMinWinnerScore: 10 },
      { name: "Quite the Hustle Annotated", path: quiteTheHustlePath, expectedMinWinnerScore: 10 },
      { name: "Custom Scenario", path: customScenarioPath, expectedMinWinnerScore: 1 },
    ];

    allExamples.forEach(({ name, path: filePath, expectedFinal, expectedMinWinnerScore }) => {
      it(`simulates full game correctly for "${name}"`, () => {
        const egn: EgnFile = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const finalScore = calculateFinalScore(egn);

        if (expectedFinal) {
          expect(finalScore).toEqual(expectedFinal);
        } else if (expectedMinWinnerScore) {
          const maxScore = Math.max(finalScore[0], finalScore[1]);
          expect(maxScore).toBeGreaterThanOrEqual(expectedMinWinnerScore);
        }

        // Test addFinalScoreToEgn producing valid EGN schema
        const updated = addFinalScoreToEgn(egn);
        expect(updated.metadata.finalScore).toEqual(finalScore);

        const validation = validateEgn(updated);
        expect(validation.isValid).toBe(true);
      });
    });

    it("accurately scores roundtripped bitpacked deals", () => {
      const egn: EgnFile = JSON.parse(fs.readFileSync(vwecFinalsPath, "utf8"));
      const originalScore = calculateFinalScore(egn);

      const packedEgn = packEgnFile(egn);
      const packedScore = calculateFinalScore(packedEgn);
      expect(packedScore).toEqual(originalScore);

      const unpackedEgn = unpackEgnFile(packedEgn);
      const unpackedScore = calculateFinalScore(unpackedEgn);
      expect(unpackedScore).toEqual(originalScore);
    });
  });

  describe("File I/O and Error Handling", () => {
    it("throws clear error if metadata object is missing", () => {
      const invalidEgn: any = { fileType: "Euchre Game Notation", version: "1.6", deals: [] };
      expect(() => addFinalScoreToEgn(invalidEgn)).toThrow("Cannot add finalScore: EGN file is missing metadata object.");
    });

    it("throws clear error if input file path does not exist", () => {
      expect(() => addFinalScoreToEgnFile("non_existent_file.egn")).toThrow("EGN file not found");
    });
  });
});
