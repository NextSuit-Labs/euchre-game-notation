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
  determineTrump,
  determineMaker,
  determineIsAlone,
  determineLeadSeat,
  getCardValue,
  getWinnerIndex,
  compileDealSteps,
  calculateDealScoreChange,
  calculateFinalScore,
  validateDealGameplay,
  getSitOutSeats,
  getActivePlayerSeat,
  getEffectiveSuit,
} from "../src/engine";
import { Deal, EgnFile, Metadata, Ruleset } from "../src/types";

describe("EGN Engine: Alternative Rulesets & Edge Cases", () => {
  describe("1. Loner Lead Variations (loner_lead)", () => {
    // Dealer = 0
    // Seat 1 calls loner (partner = Seat 3 sits out)
    const dealSeat1Loner: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9s" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["As", "Ks", "Qs"],
            ["Ah", "Kh", "Qh"],
            ["Ad", "Kd", "Qd"],
            ["Ac", "Kc", "Qc"],
            ["Js", "Jh", "Ts"],
          ],
        },
      ],
    };

    // Dealer = 0
    // Seat 3 calls loner (partner = Seat 1 sits out)
    const dealSeat3Loner: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9s" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Pass", "Pass", "Order"], isAlone: true },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["As", "Ks", "Qs"],
            ["Ah", "Kh", "Qh"],
            ["Ad", "Kd", "Qd"],
            ["Ac", "Kc", "Qc"],
            ["Js", "Jh", "Ts"],
          ],
        },
      ],
    };

    it("LEFT_OF_DEALER: starts left of dealer unless partner is sitting out", () => {
      // Seat 1 loner -> left of dealer is Seat 1 (the loner caller himself leads!)
      expect(determineLeadSeat(dealSeat1Loner, "LEFT_OF_DEALER")).toBe(1);

      // Seat 3 loner -> left of dealer is Seat 1, but Seat 1 is sitting out!
      // Lead shifts clockwise to dealer's partner (Seat 2)
      expect(determineLeadSeat(dealSeat3Loner, "LEFT_OF_DEALER")).toBe(2);
    });

    it("LEFT_OF_LONER: starts strictly left of the lone caller", () => {
      // Seat 1 loner -> left of loner is Seat 2
      expect(determineLeadSeat(dealSeat1Loner, "LEFT_OF_LONER")).toBe(2);

      // Seat 3 loner -> left of loner is Seat 0 (the dealer)
      expect(determineLeadSeat(dealSeat3Loner, "LEFT_OF_LONER")).toBe(0);
    });

    it("compiles step-by-step table states with correct lead and sit-outs for both rulesets", () => {
      const metaLeftOfDealer: Metadata = {
        players: ["N", "E", "S", "W"],
        initialScore: [0, 0],
        ruleset: { loner_lead: "LEFT_OF_DEALER" },
      };

      const stepsDealer = compileDealSteps(dealSeat3Loner, metaLeftOfDealer);
      const playStepsDealer = stepsDealer.filter((s) => s.type === "PLAY");
      expect(playStepsDealer.length).toBe(15); // 5 tricks * 3 cards
      expect(playStepsDealer[0].sitOutSeat).toBe(1); // Seat 1 sits out

      const metaLeftOfLoner: Metadata = {
        players: ["N", "E", "S", "W"],
        initialScore: [0, 0],
        ruleset: { loner_lead: "LEFT_OF_LONER" },
      };

      const stepsLoner = compileDealSteps(dealSeat3Loner, metaLeftOfLoner);
      const playStepsLoner = stepsLoner.filter((s) => s.type === "PLAY");
      expect(playStepsLoner[0].sitOutSeat).toBe(1);
    });
  });

  describe("2. Custom Scoring Payouts (loner_march_score & loner_euchred_score)", () => {
    // Deal where Seat 1 (Team 1) goes alone on Spades and sweeps all 5 tricks
    const lonerSweepDeal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9s" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Js", "9s", "Ts"], // Seat 1 leads Right Bower -> wins
            ["Jh", "Qc", "Kc"], // Left Bower -> wins
            ["As", "Qd", "Kd"], // Ace of trump -> wins
            ["Ks", "Qh", "Kh"], // King of trump -> wins
            ["Qs", "Td", "Ad"], // Queen of trump -> wins (Sweep 5/5)
          ],
        },
      ],
    };

    // Deal where Seat 1 (Team 1) goes alone on Spades, but defenders win 3 tricks (Euchred)
    const lonerEuchredDeal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9s" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Js", "9s", "Ts"], // Seat 1 wins (Maker = 1)
            ["Jh", "Qc", "Kc"], // Seat 1 wins (Maker = 2)
            ["9h", "Ah", "Kh"], // Seat 1 leads 9h, Seat 2 plays Ah (wins -> Team 0)
            ["Ad", "Kd", "Qd"], // Seat 2 leads Ad (wins -> Team 0)
            ["Ac", "Tc", "Qc"], // Seat 2 leads Ac (wins -> Team 0, 3 tricks -> Euchred!)
          ],
        },
      ],
    };

    it("awards standard 2 points for Loner March by default (2 for non-loner, 4 for loner)", () => {
      const [t0, t1] = calculateDealScoreChange(lonerSweepDeal, { players: ["N", "E", "S", "W"], initialScore: [0, 0] });
      expect(t0).toBe(0);
      expect(t1).toBe(4);
    });

    it("awards custom points for Loner March when loner_march_score is configured", () => {
      const meta5Pts: Metadata = {
        players: ["N", "E", "S", "W"],
        initialScore: [0, 0],
        ruleset: { loner_march_score: 5 },
      };
      const [t0A, t1A] = calculateDealScoreChange(lonerSweepDeal, meta5Pts);
      expect(t1A).toBe(5);

      const meta3Pts: Metadata = {
        players: ["N", "E", "S", "W"],
        initialScore: [0, 0],
        ruleset: { loner_march_score: 3 },
      };
      const [t0B, t1B] = calculateDealScoreChange(lonerSweepDeal, meta3Pts);
      expect(t1B).toBe(3);
    });

    it("awards standard 2 points when defenders euchre a loner by default", () => {
      const [t0, t1] = calculateDealScoreChange(lonerEuchredDeal, { players: ["N", "E", "S", "W"], initialScore: [0, 0] });
      expect(t0).toBe(2); // Defenders (Team 0) receive 2 points
      expect(t1).toBe(0);
    });

    it("awards custom points when defenders euchre a loner with loner_euchred_score", () => {
      const metaCustomEuchre: Metadata = {
        players: ["N", "E", "S", "W"],
        initialScore: [0, 0],
        ruleset: { loner_euchred_score: 4 },
      };
      const [t0, t1] = calculateDealScoreChange(lonerEuchredDeal, metaCustomEuchre);
      expect(t0).toBe(4); // Defenders get 4 points for euchring a loner
      expect(t1).toBe(0);
    });

    it("calculates cumulative game score with custom rulesets across multiple hands", () => {
      const egnFile: EgnFile = {
        fileType: "Euchre Game Notation",
        version: "1.6",
        metadata: {
          players: ["North", "East", "South", "West"],
          initialScore: [0, 0],
          ruleset: {
            loner_march_score: 5,
            loner_euchred_score: 3,
          },
        },
        deals: [lonerSweepDeal, lonerEuchredDeal],
      };

      const finalScore = calculateFinalScore(egnFile);
      // Deal 0: Team 1 sweeps loner -> +5 points (Score: [0, 5])
      // Deal 1: Team 0 euchres loner -> +3 points (Score: [3, 5])
      expect(finalScore).toEqual([3, 5]);
    });
  });

  describe("3. Defend Alone (defend_alone) & 1v1 Showdown Mechanics", () => {
    const defendAloneRuleset: Ruleset = {
      std: true,
      defend_alone: true,
    };

    it("validates 1v1 showdown when maker is Seat 1 and defender is Seat 0 (opposing teams)", () => {
      const valid1v1Deal: Deal = {
        dealNumber: 0,
        initialState: {
          dealer: 0,
          upCard: "9s",
          playerCards: [
            ["9h", "Th", "Ah", "Kh", "Qh"], // Seat 0 (Dealer & Defender alone)
            ["Js", "Jh", "As", "Ks", "Qs"], // Seat 1 (Maker alone)
            ["9c", "Tc", "Jc", "Qc", "Kc"], // Seat 2 (Defender partner -> sits out)
            ["9d", "Td", "Jd", "Qd", "Kd"], // Seat 3 (Maker partner -> sits out)
          ],
        },
        phases: [
          {
            phaseNumber: 0,
            type: "EUCHRE_BIDDING",
            calls: ["Order"],
            isAlone: true,
            aloneDefender: 0, // Seat 0 (Team 0) defends alone against Seat 1 (Team 1)
            discard: "9h",
          },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["Js", "9s"],
              ["Jh", "Th"],
              ["As", "Kh"],
              ["Ks", "Qh"],
              ["Qs", "Ah"],
            ],
          },
        ],
      };

      const sitOuts = getSitOutSeats(valid1v1Deal, defendAloneRuleset, 4);
      expect(sitOuts.has(3)).toBe(true); // Maker's partner (Seat 3) sits out
      expect(sitOuts.has(2)).toBe(true); // Defender's partner (Seat 2) sits out
      expect(sitOuts.size).toBe(2);

      // Active player advances skipping both sit-out seats:
      // Lead Seat 1 -> next active is Seat 0 (skipping 2 and 3)
      expect(getActivePlayerSeat(1, 0, sitOuts, 4)).toBe(1);
      expect(getActivePlayerSeat(1, 1, sitOuts, 4)).toBe(0);

      // Validates gameplay legality with 2 cards per trick
      const validation = validateDealGameplay(valid1v1Deal, { ruleset: defendAloneRuleset });
      expect(validation.isValid).toBe(true);
      expect(validation.violations.length).toBe(0);
    });

    it("rejects illegal alone defender from the maker's own team", () => {
      const illegalAloneDefenderDeal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          {
            phaseNumber: 0,
            type: "EUCHRE_BIDDING",
            calls: ["Order"],
            isAlone: true,
            aloneDefender: 3, // Seat 3 is maker's partner (Team 1), cannot defend alone against partner!
          },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [["Js", "9h"], ["Jh", "Th"], ["As", "Kh"], ["Ks", "Qh"], ["Qs", "Ah"]],
          },
        ],
      };

      const validation = validateDealGameplay(illegalAloneDefenderDeal, { ruleset: defendAloneRuleset });
      expect(validation.isValid).toBe(false);
      expect(validation.violations.some((v) => v.code === "ILLEGAL_ALONE_DEFENDER")).toBe(true);
    });

    it("rejects defend alone when ruleset does not enable defend_alone", () => {
      const dealWithDisabledDefendAlone: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          {
            phaseNumber: 0,
            type: "EUCHRE_BIDDING",
            calls: ["Order"],
            isAlone: true,
            aloneDefender: 0,
          },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [["Js", "9h", "Ts"], ["Jh", "Th", "Qc"], ["As", "Kh", "Kd"], ["Ks", "Qh", "Qd"], ["Qs", "Ah", "Ad"]],
          },
        ],
      };

      const validation = validateDealGameplay(dealWithDisabledDefendAlone, { ruleset: { defend_alone: false } });
      expect(validation.isValid).toBe(false);
      expect(validation.violations.some((v) => v.code === "ILLEGAL_ALONE_DEFENDER")).toBe(true);
    });
  });

  describe("4. Canadian Loner Rules (canadian)", () => {
    it("handles Canadian loner where dealer partner orders up", () => {
      // Dealer is Seat 0. Dealer's partner is Seat 2.
      // Seat 2 calls "Order" -> under Canadian rules, Seat 2 must go alone (partner Seat 0 sits out)
      const canadianDeal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Pass", "Order"], isAlone: true },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["As", "Ks", "Qs"], // 3 cards per trick
              ["Ah", "Kh", "Qh"],
              ["Ad", "Kd", "Qd"],
              ["Ac", "Kc", "Qc"],
              ["Js", "Jh", "Ts"],
            ],
          },
        ],
      };

      const meta: Metadata = {
        players: ["N", "E", "S", "W"],
        initialScore: [0, 0],
        ruleset: { canadian: true },
      };

      const sitOuts = getSitOutSeats(canadianDeal, meta.ruleset);
      expect(sitOuts.has(0)).toBe(true); // Dealer (Seat 0) sits out because Seat 2 went alone

      const validation = validateDealGameplay(canadianDeal, meta);
      expect(validation.isValid).toBe(true);
    });
  });

  describe("5. Variable Player Counts (num_players)", () => {
    it("handles 6-player Euchre sit-out calculation (partner is across at maker + 3)", () => {
      // 6-player game: Seat 0, 2, 4 (Team 0) vs Seat 1, 3, 5 (Team 1)
      // Seat 1 calls loner -> Partner is (1 + 3) % 6 = Seat 4
      const deal6P: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [{ phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true }],
      };

      const sitOuts = getSitOutSeats(deal6P, { num_players: 6 }, 6);
      expect(sitOuts.has(4)).toBe(true); // Partner at seat 4 sits out
      expect(sitOuts.size).toBe(1);

      // Active player progression with 6 players skipping Seat 4:
      // Starting lead 1:
      expect(getActivePlayerSeat(1, 0, sitOuts, 6)).toBe(1);
      expect(getActivePlayerSeat(1, 1, sitOuts, 6)).toBe(2);
      expect(getActivePlayerSeat(1, 2, sitOuts, 6)).toBe(3);
      expect(getActivePlayerSeat(1, 3, sitOuts, 6)).toBe(5); // Skips 4!
      expect(getActivePlayerSeat(1, 4, sitOuts, 6)).toBe(0);
    });
  });

  describe("6. Bidding Suit Constraints in Round 2", () => {
    it("rejects calling the turned-down upcard suit in Round 2", () => {
      const dealIllegalRound2: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" }, // Upcard is Spades ('s')
        phases: [
          {
            phaseNumber: 0,
            type: "EUCHRE_BIDDING",
            // All 4 pass in Round 1 -> upcard turned down.
            // Seat 1 calls "s" in Round 2 -> ILLEGAL because Spades was turned down!
            calls: ["Pass", "Pass", "Pass", "Pass", "s"],
          },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["As", "Ks", "Qs", "Js"],
              ["Ah", "Kh", "Qh", "Jh"],
              ["Ad", "Kd", "Qd", "Jd"],
              ["Ac", "Kc", "Qc", "Jc"],
              ["Ts", "Th", "Td", "Tc"],
            ],
          },
        ],
      };

      const validation = validateDealGameplay(dealIllegalRound2);
      expect(validation.isValid).toBe(false);
      expect(validation.violations.some((v) => v.code === "ILLEGAL_BID_SUIT")).toBe(true);
    });

    it("accepts legal alternative suits in Round 2", () => {
      const dealLegalRound2: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" }, // Upcard is Spades
        phases: [
          {
            phaseNumber: 0,
            type: "EUCHRE_BIDDING",
            calls: ["Pass", "Pass", "Pass", "Pass", "h"], // Hearts is legal!
          },
          {
            phaseNumber: 1,
            type: "TRICK_PLAY",
            tricks: [
              ["Ah", "Kh", "Qh", "Jh"],
              ["As", "Ks", "Qs", "Js"],
              ["Ad", "Kd", "Qd", "Jd"],
              ["Ac", "Kc", "Qc", "Jc"],
              ["Ts", "Th", "Td", "Tc"],
            ],
          },
        ],
      };

      const validation = validateDealGameplay(dealLegalRound2);
      expect(validation.isValid).toBe(true);
      expect(determineTrump(dealLegalRound2)).toBe("h");
    });
  });

  describe("7. Bower Card Valuation & Trick Winner Edge Cases", () => {
    it("ranks Right Bower (100) > Left Bower (99) > Ace of Trump (94) > King of Trump (93)", () => {
      const trump = "h"; // Hearts is trump -> Right Bower = Jh, Left Bower = Jd
      const ledSuit = "h";

      expect(getCardValue("Jh", ledSuit, trump)).toBe(100); // Right Bower
      expect(getCardValue("Jd", ledSuit, trump)).toBe(99);  // Left Bower
      expect(getCardValue("Ah", ledSuit, trump)).toBe(94);  // Ace of Trump
      expect(getCardValue("Kh", ledSuit, trump)).toBe(93);  // King of Trump
      expect(getCardValue("Qh", ledSuit, trump)).toBe(92);  // Queen of Trump
      expect(getCardValue("Th", ledSuit, trump)).toBe(90);  // Ten of Trump
      expect(getCardValue("9h", ledSuit, trump)).toBe(89);  // Nine of Trump
    });

    it("Left Bower beats non-trump Aces even when offsuit is led", () => {
      const trump = "s"; // Spades is trump -> Left Bower is Jc
      // Trick: Seat 1 leads Ah (offsuit), Seat 2 plays Kh, Seat 3 trumps with Jc (Left Bower), Seat 0 plays 9h
      const trick = ["Ah", "Kh", "Jc", "9h"];
      const winnerIdx = getWinnerIndex(trick, trump);
      expect(winnerIdx).toBe(2); // Seat 3's Jc wins
    });

    it("Offsuit Jack is strictly an ordinary card of led suit or discard", () => {
      const trump = "s"; // Spades is trump -> Jh is regular Jack of Hearts
      // Trick: Seat 1 leads Th, Seat 2 plays Jh (Jack of Hearts = 51), Seat 3 plays Qh (52), Seat 0 plays Kh (53)
      const trick = ["Th", "Jh", "Qh", "Kh"];
      const winnerIdx = getWinnerIndex(trick, trump);
      expect(winnerIdx).toBe(3); // Kh beats Jh and Qh
    });
  });
});
