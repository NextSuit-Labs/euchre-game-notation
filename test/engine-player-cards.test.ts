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
import { execSync } from "child_process";
import { describe, it, expect } from "@jest/globals";
import { calculatePlayerCards, inferPlayerCards } from "../src/engine";
import { unpackDeal } from "../src/bitpacker";
import { Deal, EgnFile } from "../src/types";

describe("Deal Player Cards Engine Inference & CLI", () => {
  const cliPath = path.resolve(__dirname, "../dist/src/cli-deal-cards.js");
  const examplesDir = path.resolve(__dirname, "../examples");

  describe("inferPlayerCards unit tests", () => {
    it("returns playerCards directly if already provided", () => {
      const explicitHands = [
        ["As", "Ks", "Qs", "Js", "Ts"],
        ["Ah", "Kh", "Qh", "Jh", "Th"],
        ["Ac", "Kc", "Qc", "Jc", "Tc"],
        ["Ad", "Kd", "Qd", "Jd", "Td"],
      ];

      const deal: Deal = {
        dealNumber: 0,
        initialState: {
          dealer: 0,
          upCard: "9s",
          playerCards: explicitHands,
        },
        phases: [
          {
            type: "EUCHRE_BIDDING",
            phaseNumber: 0,
            calls: ["Order"],
          },
        ],
      };

      const result = inferPlayerCards(deal);
      expect(result).toEqual(explicitHands);
      // Ensure alias works identically
      expect(calculatePlayerCards(deal)).toEqual(explicitHands);
    });

    it("does NOT rely on playerCards if any seat has fewer than 5 cards (infers from play instead)", () => {
      // In this deal, Seat 0 only has 2 cards specified in initialState.playerCards,
      // while the full trick play has all 5 cards played by each seat.
      const egnPath = path.join(examplesDir, "Six Points in Two Hands.egn");
      const egn = JSON.parse(fs.readFileSync(egnPath, "utf8")) as EgnFile;
      const rawDeal = egn.deals[1];
      const deal = typeof rawDeal === "string" ? unpackDeal(rawDeal, 1) : JSON.parse(JSON.stringify(rawDeal));

      // Artificially attach incomplete playerCards
      deal.initialState.playerCards = [
        ["Jh", "Tc"], // only 2 cards (< 5)
        [],
        [],
        [],
      ];

      const hands = inferPlayerCards(deal, egn.metadata?.ruleset);
      // Because one or more seats had fewer than 5 cards, it must infer all 5 cards from trick play!
      expect(hands[0]).toEqual(["Jh", "Tc", "Qc", "Js", "Ks"]);
      expect(hands[1]).toEqual(["9d", "Qd", "Kc", "9h", "Qh"]);
      expect(hands[2]).toEqual(["Jd", "Ad", "Kd", "As", "9s"]);
      expect(hands[3]).toEqual(["Ts", "Jc", "Kh", "Ah", "Ac"]);
    });

    it("does NOT rely on playerCards if fewer than 4 seats are provided", () => {
      const egnPath = path.join(examplesDir, "Six Points in Two Hands.egn");
      const egn = JSON.parse(fs.readFileSync(egnPath, "utf8")) as EgnFile;
      const rawDeal = egn.deals[1];
      const deal = typeof rawDeal === "string" ? unpackDeal(rawDeal, 1) : JSON.parse(JSON.stringify(rawDeal));

      // Only 3 seats provided (< 4)
      deal.initialState.playerCards = [
        ["Jh", "Tc", "Qc", "Js", "Ks"],
        ["9d", "Qd", "Kc", "9h", "Qh"],
        ["Jd", "Ad", "Kd", "As", "9s"],
      ];

      const hands = inferPlayerCards(deal, egn.metadata?.ruleset);
      expect(hands).toHaveLength(4);
      expect(hands[3]).toEqual(["Ts", "Jc", "Kh", "Ah", "Ac"]);
    });

    it("infers player cards from trick play by evaluating trick winners and lead sequence", () => {
      // Deal 1 from Six Points in Two Hands (all 4 players active, dealer 1, upcard Qd)
      const egnPath = path.join(examplesDir, "Six Points in Two Hands.egn");
      const egn = JSON.parse(fs.readFileSync(egnPath, "utf8")) as EgnFile;
      const rawDeal = egn.deals[1];
      const deal = typeof rawDeal === "string" ? unpackDeal(rawDeal, 1) : rawDeal;

      // Note: deal.initialState.playerCards is NOT present in this file!
      expect(deal.initialState.playerCards).toBeUndefined();

      const hands = inferPlayerCards(deal, egn.metadata?.ruleset);

      expect(hands).toHaveLength(4);
      // All 4 players have 5 cards
      hands.forEach((hand) => {
        expect(hand).toHaveLength(5);
      });

      // Verify specific known cards for seats
      expect(hands[0]).toEqual(["Jh", "Tc", "Qc", "Js", "Ks"]);
      expect(hands[1]).toEqual(["9d", "Qd", "Kc", "9h", "Qh"]);
      expect(hands[2]).toEqual(["Jd", "Ad", "Kd", "As", "9s"]);
      expect(hands[3]).toEqual(["Ts", "Jc", "Kh", "Ah", "Ac"]);
    });

    it("handles loner calls where partner sits out", () => {
      // Deal 0 from Six Points in Two Hands: Seat 1 orders alone, Seat 3 sits out (partner of maker 1)
      const egnPath = path.join(examplesDir, "Six Points in Two Hands.egn");
      const egn = JSON.parse(fs.readFileSync(egnPath, "utf8")) as EgnFile;
      const rawDeal = egn.deals[0];
      const deal = typeof rawDeal === "string" ? unpackDeal(rawDeal, 0) : rawDeal;

      const hands = inferPlayerCards(deal, egn.metadata?.ruleset);

      // Seat 0 sat out, so its inferred hand is empty [] when omitted
      expect(hands[0]).toEqual([]);
      expect(hands[1]).toEqual(["9s", "9h", "Qh", "Ts", "Jc"]);
      expect(hands[2]).toEqual(["As", "Jh", "Jd", "Th", "Qs"]);
      expect(hands[3]).toEqual(["Js", "Ah", "Kh", "9d", "Tc"]);
    });

    it("retains loner partner hand specified by playerCards even when other players are inferred from trick play", () => {
      // In Deal 0: Seat 2 calls alone, Seat 0 (partner) sits out.
      const egnPath = path.join(examplesDir, "Six Points in Two Hands.egn");
      const egn = JSON.parse(fs.readFileSync(egnPath, "utf8")) as EgnFile;
      const rawDeal = egn.deals[0];
      const deal = typeof rawDeal === "string" ? unpackDeal(rawDeal, 0) : JSON.parse(JSON.stringify(rawDeal));

      // Partner (Seat 0) has their dealt cards specified, but active players are empty/incomplete
      const partnerCards = ["9c", "Tc", "Jc", "Qc", "Kc"];
      deal.initialState.playerCards = [
        partnerCards,
        [],
        [],
        [],
      ];

      const hands = inferPlayerCards(deal, egn.metadata?.ruleset);

      // Seat 0 sat out, so its hand must remain the cards specified by playerCards!
      expect(hands[0]).toEqual(partnerCards);
      // Active players must have their 5 cards inferred from trick play
      expect(hands[1]).toEqual(["9s", "9h", "Qh", "Ts", "Jc"]);
      expect(hands[2]).toEqual(["As", "Jh", "Jd", "Th", "Qs"]);
      expect(hands[3]).toEqual(["Js", "Ah", "Kh", "9d", "Tc"]);
    });

    it("restores dealer discard when dealer was ordered up in round 1", () => {
      const deal: Deal = {
        dealNumber: 1,
        initialState: {
          dealer: 0,
          upCard: "9s",
        },
        phases: [
          {
            type: "EUCHRE_BIDDING",
            phaseNumber: 0,
            calls: ["Order"], // Ordered up round 1 (trump is Spades 's')
            discard: "9c",   // Dealer discarded 9c, picked up 9s
          },
          {
            type: "TRICK_PLAY",
            phaseNumber: 1,
            tricks: [
              // Lead seat: (dealer + 1) % 4 = 1. Seat 1 wins each trick and continues leading.
              ["As", "Ks", "Qs", "Ts"], // Seat 1 leads As (highest trump), Seat 0 plays Ts.
              ["Ah", "Kh", "Qh", "Th"], // Seat 1 leads Ah, Seat 0 plays Th.
              ["Ad", "Kd", "Qd", "Td"], // Seat 1 leads Ad, Seat 0 plays Td.
              ["Ac", "Kc", "Qc", "Tc"], // Seat 1 leads Ac, Seat 0 plays Tc.
              ["Jh", "9d", "Jd", "9s"], // Seat 1 leads Jh, Seat 0 plays 9s (picked up upcard).
            ],
          },
        ],
      };

      const hands = inferPlayerCards(deal);
      // Dealer (Seat 0) played: Ts, Th, Td, Tc, and 9s (the upCard).
      // But initial dealt hand before pickup must have had 9c (the discard), NOT 9s!
      expect(hands[0]).toContain("9c");
      expect(hands[0]).not.toContain("9s");
      expect(hands[0]).toHaveLength(5);
      expect(hands[0]).toEqual(["Ts", "Th", "Td", "Tc", "9c"]);
    });

    it("accepts a condensed base64 string directly", () => {
      const egnPath = path.join(examplesDir, "Six Points in Two Hands.egn");
      const egn = JSON.parse(fs.readFileSync(egnPath, "utf8")) as EgnFile;
      const { packDeal } = require("../src/bitpacker");
      const packed = packDeal(egn.deals[1] as Deal, 4, 9, 2);

      const hands = inferPlayerCards(packed);
      expect(hands).toHaveLength(4);
      hands.forEach((h) => expect(h).toHaveLength(5));
      expect(hands[1]).toEqual(["9d", "Qd", "Kc", "9h", "Qh"]);
    });

    it("renders discard annotation when key 16 is specified in callAnnotations", () => {
      const { compileDealSteps } = require("../src/engine/rules");
      const deal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard: "9s" },
        phases: [
          {
            type: "EUCHRE_BIDDING",
            calls: ["Pass", "Pass", "Pass", "Order"],
            discard: "9c",
            callAnnotations: {
              "3": ["Ordered up alone"],
              "16": ["Pitched 9c, kept protected Ace"],
            },
          },
        ],
      };

      const steps = compileDealSteps(deal);
      const orderStep = steps.find((s: any) => s.callIndex === 3);
      expect(orderStep).toBeDefined();
      expect(orderStep.annotation).toContain("[Discard] Pitched 9c, kept protected Ace");
    });
  });

  describe("egn-deal-cards CLI", () => {
    it("prints help message with --help", () => {
      const out = execSync(`node "${cliPath}" --help`, { encoding: "utf8" });
      expect(out).toContain("EGN Deal Player Cards Utility CLI");
      expect(out).toContain("Usage:");
    });

    it("prints version with --version", () => {
      const out = execSync(`node "${cliPath}" --version`, { encoding: "utf8" });
      expect(out).toContain("EGN Deal Player Cards CLI v");
    });

    it("evaluates a deal from an EGN file with --deal", () => {
      const egnFile = path.join(examplesDir, "Six Points in Two Hands.egn");
      const out = execSync(`node "${cliPath}" "${egnFile}" --deal 1`, { encoding: "utf8" });
      const parsed = JSON.parse(out);
      expect(parsed).toHaveLength(4);
      expect(parsed[0]).toEqual(["Jh", "Tc", "Qc", "Js", "Ks"]);
      expect(parsed[1]).toEqual(["9d", "Qd", "Kc", "9h", "Qh"]);
    });

    it("outputs cards for a single seat with --seat", () => {
      const egnFile = path.join(examplesDir, "Six Points in Two Hands.egn");
      const out = execSync(`node "${cliPath}" "${egnFile}" --deal 1 --seat 2 --compact`, { encoding: "utf8" });
      const parsed = JSON.parse(out);
      expect(parsed).toEqual(["Jd", "Ad", "Kd", "As", "9s"]);
    });

    it("prints human-readable summary with --summary", () => {
      const egnFile = path.join(examplesDir, "Six Points in Two Hands.egn");
      const out = execSync(`node "${cliPath}" "${egnFile}" --deal 1 --summary`, { encoding: "utf8" });
      expect(out).toContain("=== Deal Cards (Inferred from Play) ===");
      expect(out).toContain("Seat 0 (North): [ Jh, Tc, Qc, Js, Ks ]");
    });

    it("writes to output file with --output", () => {
      const egnFile = path.join(examplesDir, "Six Points in Two Hands.egn");
      const tmpOut = path.resolve(__dirname, "../tmp-player-cards-test.json");
      try {
        execSync(`node "${cliPath}" "${egnFile}" --deal 1 --output "${tmpOut}"`, { encoding: "utf8" });
        expect(fs.existsSync(tmpOut)).toBe(true);
        const data = JSON.parse(fs.readFileSync(tmpOut, "utf8"));
        expect(data).toHaveLength(4);
      } finally {
        if (fs.existsSync(tmpOut)) {
          fs.unlinkSync(tmpOut);
        }
      }
    });

    it("evaluates all deals when --deal all is specified", () => {
      const egnFile = path.join(examplesDir, "Six Points in Two Hands.egn");
      const out = execSync(`node "${cliPath}" "${egnFile}" --deal all`, { encoding: "utf8" });
      const parsed = JSON.parse(out);
      expect(parsed).toHaveLength(2); // Two deals in this EGN
      expect(parsed[0]).toHaveLength(4);
      expect(parsed[1]).toHaveLength(4);
    });
  });
});
