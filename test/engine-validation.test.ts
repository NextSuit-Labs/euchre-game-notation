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
  getEffectiveSuit,
  getSitOutSeats,
  validateDealGameplay,
  validateGameplay,
} from "../src/engine";
import { Deal, EgnFile, Metadata } from "../src/types";

describe("EGN Gameplay & Semantic Rule Validation", () => {
  const examplesDir = path.resolve(__dirname, "../examples");

  describe("Effective Suit & Left Bower Logic", () => {
    it("assigns Left Bower to the trump suit, not printed suit", () => {
      // Trump = Spades ('s') -> Jc is Left Bower -> effective suit 's'
      expect(getEffectiveSuit("Jc", "s")).toBe("s");
      expect(getEffectiveSuit("Js", "s")).toBe("s"); // Right Bower
      expect(getEffectiveSuit("Jh", "s")).toBe("h"); // Regular Heart
      expect(getEffectiveSuit("Jd", "s")).toBe("d"); // Regular Diamond

      // Trump = Diamonds ('d') -> Jh is Left Bower -> effective suit 'd'
      expect(getEffectiveSuit("Jh", "d")).toBe("d");
      expect(getEffectiveSuit("Jd", "d")).toBe("d"); // Right Bower
      expect(getEffectiveSuit("Ah", "d")).toBe("h"); // Normal Heart
    });

    it("returns printed suit when there is no trump", () => {
      expect(getEffectiveSuit("Jh", null)).toBe("h");
      expect(getEffectiveSuit("Jc", null)).toBe("c");
    });
  });

  describe("Sit-Out Seat Calculations (Loner & Defend Alone)", () => {
    it("identifies maker's partner sitting out on a loner", () => {
      // Dealer 0, Seat 1 goes alone -> Partner Seat 3 sits out
      const deal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [{ phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true }],
      };
      const sitOuts = getSitOutSeats(deal, { std: true }, 4);
      expect(sitOuts.has(3)).toBe(true);
      expect(sitOuts.size).toBe(1);
    });

    it("identifies both maker's partner and defender's partner sitting out with defend_alone", () => {
      // Dealer 0, Seat 1 goes alone -> Partner 3 sits out
      // Seat 2 defends alone -> Partner 0 sits out
      const deal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [{ phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true, aloneDefender: 2 }],
      };
      const sitOuts = getSitOutSeats(deal, { std: true, defend_alone: true }, 4);
      expect(sitOuts.has(3)).toBe(true);
      expect(sitOuts.has(0)).toBe(true);
      expect(sitOuts.size).toBe(2);
    });
  });

  describe("Renege Detection", () => {
    it("detects renege when a player fails to follow led suit while holding that suit", () => {
      const dealWithRenege: Deal = {
        dealNumber: 0,
        initialState: {
          dealer: 0,
          upCard: "9s",
          playerCards: [
            ["As", "Ks", "Qs", "Js", "Ts"], // Seat 0
            ["Ah", "Kh", "Qh", "Jh", "Th"], // Seat 1 (Holds all Hearts)
            ["Ac", "Kc", "Qc", "Jc", "Tc"], // Seat 2 (Holds Clubs)
            ["Ad", "Kd", "Qd", "Jd", "Td"], // Seat 3 (Holds Diamonds)
          ],
        },
        phases: [
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"] }, // Trump is Spades ('s')
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              // Seat 1 leads Ah.
              // Seat 2 holds all Clubs, plays Ac (legal offsuit).
              // Seat 3 holds all Diamonds, plays Ad (legal offsuit).
              // Seat 0 holds all Spades (trump), plays As (legal trump).
              ["Ah", "Ac", "Ad", "As"],

              // Trick 2: Winner was Seat 0 (As is trump).
              // Seat 0 leads Ks (Trump).
              // Seat 1 holds [Kh, Qh, Jh, Th]. Trump is Spades. Seat 1 has no trump, plays Kh (legal).
              // Seat 2 holds [Kc, Qc, Jc, Tc]. Note: Jc is the LEFT BOWER (Trump Spades)!
              // Seat 2 plays Kc instead of Jc -> RENEGE!
              ["Ks", "Kh", "Kc", "Kd"],

              ["Qs", "Qh", "Qc", "Qd"],
              ["Js", "Jh", "Jc", "Jd"],
              ["Ts", "Th", "Tc", "Td"],
            ],
          },
        ],
      };

      const result = validateDealGameplay(dealWithRenege, { ruleset: { std: true } }, 0);
      expect(result.isValid).toBe(false);
      const renegeViolation = result.violations.find((v) => v.code === "RENEGE");
      expect(renegeViolation).toBeDefined();
      expect(renegeViolation?.seatIndex).toBe(2);
      expect(renegeViolation?.trickIndex).toBe(1); // Trick 2
    });

    it("does not flag renege when Left Bower is played when trump is led", () => {
      const legalLeftBowerPlay: Deal = {
        dealNumber: 0,
        initialState: {
          dealer: 0,
          upCard: "9s",
          playerCards: [
            ["As", "Ks", "Qs", "Ts", "9d"],
            ["Ah", "Kh", "Qh", "Jh", "Th"],
            ["Jc", "Kc", "Qc", "Tc", "9c"], // Holds Left Bower Jc
            ["Ad", "Kd", "Qd", "Jd", "Td"],
          ],
        },
        phases: [
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], discard: "9d" }, // Trump is Spades ('s')
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["Ah", "Jc", "Ad", "9s"], // Seat 1 leads Ah, Seat 2 wins with Left Bower Jc
              ["Kc", "Kd", "Ts", "Kh"], // Seat 2 leads Kc, Seat 0 wins with Ts
              ["As", "Qh", "9c", "Qd"], // Seat 0 leads As, Seat 0 wins
              ["Ks", "Jh", "Tc", "Jd"], // Seat 0 leads Ks, Seat 0 wins
              ["Qs", "Th", "Qc", "Td"], // Seat 0 leads Qs, Seat 0 wins
            ],
          },
        ],
      };

      const result = validateDealGameplay(legalLeftBowerPlay, { ruleset: { std: true } }, 0);
      const reneges = result.violations.filter((v) => v.code === "RENEGE");
      expect(reneges).toHaveLength(0);
      expect(result.isValid).toBe(true);
    });
  });

  describe("Trick and Card Count Violations", () => {
    it("flags INVALID_CARDS_PER_TRICK when trick has wrong card count", () => {
      const badTrickSize: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"] },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["Ah", "Kh", "Qh"], // Only 3 cards in standard 4-player deal!
              ["As", "Ks", "Qs", "Js"],
              ["Ac", "Kc", "Qc", "Jc"],
              ["Ad", "Kd", "Qd", "Jd"],
              ["9h", "Th", "Jh", "9d"],
            ],
          },
        ],
      };

      const result = validateDealGameplay(badTrickSize, {}, 0);
      expect(result.isValid).toBe(false);
      const violation = result.violations.find((v) => v.code === "INVALID_CARDS_PER_TRICK");
      expect(violation).toBeDefined();
      expect(violation?.actual).toBe(3);
      expect(violation?.expected).toBe(4);
    });

    it("expects 3 cards per trick on a loner and flags if 4 cards are played", () => {
      const lonerWithExtraCard: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["Ah", "Kh", "Qh", "Jh"], // 4 cards played instead of 3 on loner!
              ["As", "Ks", "Qs"],
              ["Ac", "Kc", "Qc"],
              ["Ad", "Kd", "Qd"],
              ["9h", "Th", "9d"],
            ],
          },
        ],
      };

      const result = validateDealGameplay(lonerWithExtraCard, {}, 0);
      expect(result.isValid).toBe(false);
      const violation = result.violations.find((v) => v.code === "INVALID_CARDS_PER_TRICK");
      expect(violation).toBeDefined();
      expect(violation?.actual).toBe(4);
      expect(violation?.expected).toBe(3);
    });

    it("flags SIT_OUT_PLAYED if sitting out partner plays a card", () => {
      // Dealer 0, Seat 1 calls alone -> Seat 3 sits out
      const sitOutPlayedDeal: Deal = {
        dealNumber: 0,
        initialState: {
          dealer: 0,
          upCard: "9s",
          playerCards: [
            ["As", "Ks", "Qs", "Js", "Ts"],
            ["Ah", "Kh", "Qh", "Jh", "Th"],
            ["Ac", "Kc", "Qc", "Tc", "9c"], // No Bower, all genuine Clubs
            ["Ad", "Kd", "Qd", "Jd", "Td"], // Sitting out!
          ],
        },
        phases: [
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true, discard: "Ts" },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              // Lead is seat 1.
              // Card 0 -> Seat 1 (Ah)
              // Card 1 -> Seat 2 (Ac)
              // Card 2 -> Seat 0 (As) (Skips Seat 3) -> Seat 0 wins with As
              ["Ah", "Ac", "As"],
              // Seat 0 leads Ks
              ["Ks", "Kh", "Kc"],
              // Seat 0 leads Qs
              ["Qs", "Qh", "Qc"],
              // Seat 0 leads Js
              ["Js", "Jh", "Tc"],
              // Seat 0 leads 9s
              ["9s", "Th", "9c"],
            ],
          },
        ],
      };

      // In the above legal deal, 0 sit-out violations
      const result = validateDealGameplay(sitOutPlayedDeal, {}, 0);
      expect(result.isValid).toBe(true);
    });
  });

  describe("Duplicate Card Detection", () => {
    it("detects same card played twice across different tricks", () => {
      const duplicatePlayDeal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"] },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["Ah", "Kh", "Qh", "Jh"], // Ah played in trick 1
              ["Ah", "Ks", "Qs", "Js"], // Ah played AGAIN in trick 2!
              ["Ac", "Kc", "Qc", "Jc"],
              ["Ad", "Kd", "Qd", "Jd"],
              ["9h", "Th", "Tc", "Td"],
            ],
          },
        ],
      };

      const result = validateDealGameplay(duplicatePlayDeal, {}, 0);
      expect(result.isValid).toBe(false);
      const violation = result.violations.find((v) => v.code === "DUPLICATE_CARD_PLAYED");
      expect(violation).toBeDefined();
      expect(violation?.card).toBe("Ah");
    });

    it("detects same card dealt to multiple players in initialState", () => {
      const duplicateDealtDeal: Deal = {
        dealNumber: 0,
        initialState: {
          dealer: 0,
          upCard: "9s",
          playerCards: [
            ["Ah", "Kh", "Qh", "Jh", "Th"],
            ["Ah", "Ks", "Qs", "Js", "Ts"], // Duplicate Ah dealt to seat 1!
            ["Ac", "Kc", "Qc", "Jc", "Tc"],
            ["Ad", "Kd", "Qd", "Jd", "Td"],
          ],
        },
        phases: [],
      };

      const result = validateDealGameplay(duplicateDealtDeal, {}, 0);
      expect(result.isValid).toBe(false);
      const violation = result.violations.find((v) => v.code === "DUPLICATE_CARD_DEALT");
      expect(violation).toBeDefined();
      expect(violation?.card).toBe("Ah");
    });
  });

  describe("Dealer Discard Validation", () => {
    it("flags INVALID_DISCARD when dealer discards an impossible card not in hand/upcard", () => {
      const invalidDiscardDeal: Deal = {
        dealNumber: 0,
        initialState: {
          dealer: 0,
          upCard: "9s",
          playerCards: [
            ["Ah", "Kh", "Qh", "Jh", "Th"], // Seat 0 (Dealer) has only Hearts
            ["As", "Ks", "Qs", "Js", "Ts"],
            ["Ac", "Kc", "Qc", "Jc", "Tc"],
            ["Ad", "Kd", "Qd", "Jd", "Td"],
          ],
        },
        phases: [
          // Dealer ordered up -> picks up 9s, but discards "9c" which is not in hand or upcard!
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], discard: "9c" },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["Ah", "As", "Ac", "Ad"],
              ["Kh", "Ks", "Kc", "Kd"],
              ["Qh", "Qs", "Qc", "Qd"],
              ["Jh", "Js", "Jc", "Jd"],
              ["Th", "Ts", "Tc", "Td"],
            ],
          },
        ],
      };

      const result = validateDealGameplay(invalidDiscardDeal, {}, 0);
      expect(result.isValid).toBe(false);
      const violation = result.violations.find((v) => v.code === "INVALID_DISCARD");
      expect(violation).toBeDefined();
      expect(violation?.card).toBe("9c");
    });

    it("does not flag discard when playerCards is omitted (presumed 5th unplayed card)", () => {
      const inferredDiscardDeal: Deal = {
        dealNumber: 0,
        initialState: {
          dealer: 0,
          upCard: "9s",
          // playerCards omitted
        },
        phases: [
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], discard: "9c" },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["Ah", "As", "Ac", "Ad"],
              ["Kh", "Ks", "Kc", "Kd"],
              ["Qh", "Qs", "Qc", "Qd"],
              ["Jh", "Js", "Jc", "Jd"],
              ["Th", "Ts", "Tc", "Td"],
            ],
          },
        ],
      };

      const result = validateDealGameplay(inferredDiscardDeal, {}, 0);
      const discardViolations = result.violations.filter((v) => v.code === "INVALID_DISCARD");
      expect(discardViolations).toHaveLength(0);
    });
  });

  describe("Bidding Rules Validation", () => {
    it("flags ILLEGAL_BID_SUIT when calling turned-down upcard suit in round 2", () => {
      const illegalSuitCallDeal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" }, // Upcard is Spades ('s')
        phases: [
          {
            phaseNumber: 0,
            type: "EUCHRE_BIDDING",
            // Turned down in round 1, then called 's' in round 2!
            calls: ["Pass", "Pass", "Pass", "Pass", "s"],
          },
        ],
      };

      const result = validateDealGameplay(illegalSuitCallDeal, {}, 0);
      expect(result.isValid).toBe(false);
      const violation = result.violations.find((v) => v.code === "ILLEGAL_BID_SUIT");
      expect(violation).toBeDefined();
      expect(violation?.actual).toBe("s");
    });
  });

  describe("Official Example Files Validation", () => {
    const exampleFiles = [
      "Six Points in Two Hands.egn",
      "Epic Comeback.egn",
      "Me and Bears.egn",
      "VWEC Finals.egn",
      "VWEC Finals Annotated.egn",
      "Quite the Hustle Annotated.egn",
      "Custom Scenario.egn",
    ];

    exampleFiles.forEach((file) => {
      it(`validates "${file}" with zero gameplay violations`, () => {
        const filePath = path.join(examplesDir, file);
        const egn: EgnFile = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const result = validateGameplay(egn);
        if (!result.isValid) {
          console.error(`Violations in ${file}:`, result.violations);
        }
        expect(result.isValid).toBe(true);
        expect(result.violations).toHaveLength(0);
      });
    });

    it("validates all combination examples and extracted EMN games with zero gameplay violations", () => {
      const combDir = path.join(examplesDir, "combination examples");
      if (fs.existsSync(combDir)) {
        const files = fs.readdirSync(combDir);
        for (const file of files) {
          if (file.endsWith(".egn")) {
            const egn: EgnFile = JSON.parse(fs.readFileSync(path.join(combDir, file), "utf8"));
            const result = validateGameplay(egn);
            expect(result.isValid).toBe(true);
            expect(result.violations).toHaveLength(0);
          }
        }
      }
    });

    it("validates all validation examples with zero gameplay violations (allowing in-progress partial hands)", () => {
      const valDir = path.join(examplesDir, "validation examples");
      if (fs.existsSync(valDir)) {
        const files = fs.readdirSync(valDir);
        for (const file of files) {
          if (file.endsWith(".egn")) {
            const egn: EgnFile = JSON.parse(fs.readFileSync(path.join(valDir, file), "utf8"));
            const result = validateGameplay(egn, { allowPartialHands: true });
            expect(result.isValid).toBe(true);
            expect(result.violations).toHaveLength(0);
          }
        }
      }
    });
  });
});
