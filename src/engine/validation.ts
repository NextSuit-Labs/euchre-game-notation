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

import { unpackDeal } from "../bitpacker";
import { Card, Deal, EgnFile, Metadata, Ruleset } from "../types";
import {
  determineLeadSeat,
  determineMaker,
  determineTrump,
  getLeftBowerSuit,
  getWinnerIndex,
} from "./rules";

export type GameplayViolationCode =
  | "DUPLICATE_CARD_PLAYED"
  | "DUPLICATE_CARD_DEALT"
  | "INVALID_TRICK_COUNT"
  | "INVALID_CARDS_PER_TRICK"
  | "RENEGE"
  | "CARD_NOT_IN_HAND"
  | "SIT_OUT_PLAYED"
  | "INVALID_DISCARD"
  | "ILLEGAL_BID_SUIT"
  | "INVALID_BID_COUNT"
  | "ILLEGAL_ALONE_DEFENDER";

export interface GameplayViolation {
  code: GameplayViolationCode;
  dealIndex: number;
  trickIndex?: number;
  cardIndex?: number;
  seatIndex?: number;
  card?: string;
  expected?: string | number | string[];
  actual?: string | number | string[];
  message: string;
}

export interface GameplayValidationOptions {
  /**
   * Enforce that cards played must exist in the dealt playerCards if provided.
   * Default: true
   */
  checkHandInventory?: boolean;

  /**
   * Allow incomplete deals with fewer than 5 tricks (e.g. paused/in-progress games).
   * Default: false
   */
  allowPartialHands?: boolean;
}

export interface GameplayValidationResult {
  isValid: boolean;
  violations: GameplayViolation[];
}

/**
 * Returns the effective suit of a card taking trump and the Left Bower into account.
 * For example, if Diamonds ('d') is trump, the Jack of Hearts ("Jh") has an effective suit of 'd'.
 */
export function getEffectiveSuit(card: Card, trump: string | null): string {
  if (!card || card.length < 2) return "";
  const rank = card[0];
  const printedSuit = card[1].toLowerCase();

  if (trump) {
    const t = trump.toLowerCase();
    if (rank === "J" && printedSuit === getLeftBowerSuit(t)) {
      return t; // Left Bower belongs to the trump suit!
    }
  }
  return printedSuit;
}

/**
 * Identifies all seats that are sitting out in the deal (maker's partner and/or defender's partner).
 */
export function getSitOutSeats(deal: Deal, ruleset?: Ruleset, numPlayers = 4): Set<number> {
  const sitOuts = new Set<number>();
  const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
  if (!bidding || bidding.type !== "EUCHRE_BIDDING") return sitOuts;

  const maker = determineMaker(deal);

  // Maker going alone: partner sits out
  if (bidding.isAlone && maker !== null) {
    const partnerSeat = (maker + Math.floor(numPlayers / 2)) % numPlayers;
    sitOuts.add(partnerSeat);
  }

  // Defending alone (if ruleset allows defend_alone)
  if (ruleset?.defend_alone && typeof bidding.aloneDefender === "number" && bidding.aloneDefender >= 0) {
    const defenderPartner = (bidding.aloneDefender + Math.floor(numPlayers / 2)) % numPlayers;
    sitOuts.add(defenderPartner);
  }

  return sitOuts;
}

/**
 * Helper to advance player index in a trick, skipping any sitting-out seats.
 */
export function getActivePlayerSeat(leadSeat: number, cardIndex: number, sitOutSeats: Set<number>, numPlayers = 4): number {
  let player = leadSeat;
  let count = 0;
  while (count < cardIndex) {
    player = (player + 1) % numPlayers;
    if (!sitOutSeats.has(player)) {
      count++;
    }
  }
  return player;
}

/**
 * Validates a single deal for gameplay rules, card counts, reneges, and duplicate cards.
 */
export function validateDealGameplay(
  deal: Deal | string,
  metadata: Partial<Metadata> = {},
  dealIndex = 0,
  options: GameplayValidationOptions = {}
): GameplayValidationResult {
  const violations: GameplayViolation[] = [];
  const ruleset = metadata.ruleset;
  const numPlayers = ruleset?.num_players ?? 4;
  const checkInventory = options.checkHandInventory ?? true;
  const allowPartial = options.allowPartialHands ?? false;

  const unpackedDeal: Deal = typeof deal === "string" ? unpackDeal(deal, dealIndex) : deal;

  const upCard = unpackedDeal.initialState?.upCard;
  const upcardSuit = upCard && upCard.length >= 2 ? upCard[1].toLowerCase() : null;

  // 1. Initial Dealt Cards Validation
  const dealtCardsSeen = new Map<string, string>(); // card -> location description
  if (upCard) {
    dealtCardsSeen.set(upCard, "upcard");
  }

  if (Array.isArray(unpackedDeal.initialState?.playerCards)) {
    unpackedDeal.initialState.playerCards.forEach((hand, seatIdx) => {
      if (Array.isArray(hand)) {
        hand.forEach((card) => {
          if (dealtCardsSeen.has(card)) {
            violations.push({
              code: "DUPLICATE_CARD_DEALT",
              dealIndex,
              seatIndex: seatIdx,
              card,
              message: `Card ${card} was dealt to seat ${seatIdx}, but was already present in ${dealtCardsSeen.get(card)}.`,
            });
          } else {
            dealtCardsSeen.set(card, `seat ${seatIdx} starting hand`);
          }
        });
      }
    });
  }

  // 2. Bidding Phase Validation
  const biddingPhase = unpackedDeal.phases
    ? unpackedDeal.phases.find((p) => p.type === "EUCHRE_BIDDING")
    : null;

  const trump = determineTrump(unpackedDeal);
  const maker = determineMaker(unpackedDeal);
  const sitOutSeats = getSitOutSeats(unpackedDeal, ruleset, numPlayers);

  if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING") {
    const calls = biddingPhase.calls || [];

    if (calls.length > numPlayers * 2) {
      violations.push({
        code: "INVALID_BID_COUNT",
        dealIndex,
        expected: `<= ${numPlayers * 2}`,
        actual: calls.length,
        message: `Too many bidding calls in deal ${dealIndex}: found ${calls.length}, maximum allowed is ${numPlayers * 2}.`,
      });
    }

    // Check round 2 call suit: cannot call the turned-down upcard suit
    const firstNonPassIdx = calls.findIndex((c) => c !== "Pass");
    if (firstNonPassIdx >= numPlayers && firstNonPassIdx !== -1 && upcardSuit) {
      const round2Call = calls[firstNonPassIdx];
      if (typeof round2Call === "string" && round2Call.toLowerCase() === upcardSuit) {
        violations.push({
          code: "ILLEGAL_BID_SUIT",
          dealIndex,
          expected: `Suit other than turned-down upcard suit '${upcardSuit}'`,
          actual: round2Call,
          message: `Player called suit '${round2Call}' in round 2, which matches the turned-down upcard suit '${upcardSuit}'.`,
        });
      }
    }

    // Check defend_alone legality
    if (typeof biddingPhase.aloneDefender === "number" && biddingPhase.aloneDefender >= 0) {
      if (!ruleset?.defend_alone) {
        violations.push({
          code: "ILLEGAL_ALONE_DEFENDER",
          dealIndex,
          seatIndex: biddingPhase.aloneDefender,
          message: `Seat ${biddingPhase.aloneDefender} declared aloneDefender, but ruleset.defend_alone is not enabled.`,
        });
      } else if (maker !== null && biddingPhase.aloneDefender % 2 === maker % 2) {
        violations.push({
          code: "ILLEGAL_ALONE_DEFENDER",
          dealIndex,
          seatIndex: biddingPhase.aloneDefender,
          message: `Seat ${biddingPhase.aloneDefender} cannot defend alone because they are on the maker's team (maker is seat ${maker}).`,
        });
      }
    }

    // Check discard validity if dealer's full starting hand is known
    const dealer = unpackedDeal.initialState?.dealer ?? 0;
    const isDealerPickUp = firstNonPassIdx >= 0 && firstNonPassIdx < numPlayers;

    if (isDealerPickUp && biddingPhase.discard && unpackedDeal.initialState?.playerCards) {
      const dealerHand = unpackedDeal.initialState.playerCards[dealer];
      if (Array.isArray(dealerHand) && dealerHand.length === 5) {
        const validOptions = new Set([...dealerHand, ...(upCard ? [upCard] : [])]);
        if (!validOptions.has(biddingPhase.discard)) {
          violations.push({
            code: "INVALID_DISCARD",
            dealIndex,
            seatIndex: dealer,
            card: biddingPhase.discard,
            message: `Dealer discarded ${biddingPhase.discard}, but it was not present in dealer's dealt hand or upcard.`,
          });
        }
      }
    }
  }

  // 3. Trick Play Validation
  const playPhase = unpackedDeal.phases
    ? unpackedDeal.phases.find((p) => p.type === "TRICK_PLAY")
    : null;

  if (playPhase && playPhase.type === "TRICK_PLAY") {
    const tricks = playPhase.tricks || [];
    const expectedTricks = 5;

    if (!allowPartial && tricks.length !== expectedTricks) {
      violations.push({
        code: "INVALID_TRICK_COUNT",
        dealIndex,
        expected: expectedTricks,
        actual: tricks.length,
        message: `Deal ${dealIndex} has ${tricks.length} tricks, expected exactly ${expectedTricks}.`,
      });
    }

    const expectedCardsPerTrick = numPlayers - sitOutSeats.size;

    // Track cards played in this deal to catch duplicates
    const playedCardsInDeal = new Map<string, { trickIndex: number; cardIndex: number }>();

    // Reconstruct / track active player hands
    let playerHands: Card[][] = [[], [], [], []];
    let handsKnown = false;

    if (
      Array.isArray(unpackedDeal.initialState?.playerCards) &&
      unpackedDeal.initialState.playerCards.every((h) => Array.isArray(h) && h.length === 5)
    ) {
      handsKnown = true;
      playerHands = unpackedDeal.initialState.playerCards.map((h) => [...h]);

      // Apply upcard pickup and discard to dealer
      const dealer = unpackedDeal.initialState?.dealer ?? 0;
      const biddingCalls = biddingPhase?.calls || [];
      const callIdx = biddingCalls.findIndex((c) => c !== "Pass");
      if (callIdx >= 0 && callIdx < numPlayers && upCard) {
        playerHands[dealer].push(upCard);
        if (biddingPhase?.discard) {
          const discIdx = playerHands[dealer].indexOf(biddingPhase.discard);
          if (discIdx !== -1) {
            playerHands[dealer].splice(discIdx, 1);
          }
        }
      }
    }

    let leadSeat = determineLeadSeat(unpackedDeal, ruleset?.loner_lead ?? "LEFT_OF_DEALER");

    tricks.forEach((trickCards, trickIdx) => {
      if (trickCards.length !== expectedCardsPerTrick) {
        violations.push({
          code: "INVALID_CARDS_PER_TRICK",
          dealIndex,
          trickIndex: trickIdx,
          expected: expectedCardsPerTrick,
          actual: trickCards.length,
          message: `Trick ${trickIdx + 1} has ${trickCards.length} cards, expected ${expectedCardsPerTrick} (num_players: ${numPlayers}, sitting out: ${sitOutSeats.size}).`,
        });
      }

      let ledEffectiveSuit: string | null = null;

      trickCards.forEach((card, cardIdx) => {
        const playerSeat = getActivePlayerSeat(leadSeat, cardIdx, sitOutSeats, numPlayers);

        // Check sit-out violation
        if (sitOutSeats.has(playerSeat)) {
          violations.push({
            code: "SIT_OUT_PLAYED",
            dealIndex,
            trickIndex: trickIdx,
            cardIndex: cardIdx,
            seatIndex: playerSeat,
            card,
            message: `Seat ${playerSeat} played card ${card} in trick ${trickIdx + 1}, but is sitting out for this deal.`,
          });
        }

        // Check duplicate card play
        if (playedCardsInDeal.has(card)) {
          const prev = playedCardsInDeal.get(card)!;
          violations.push({
            code: "DUPLICATE_CARD_PLAYED",
            dealIndex,
            trickIndex: trickIdx,
            cardIndex: cardIdx,
            seatIndex: playerSeat,
            card,
            message: `Card ${card} was played by seat ${playerSeat} in trick ${trickIdx + 1}, but was already played in trick ${prev.trickIndex + 1}.`,
          });
        } else {
          playedCardsInDeal.set(card, { trickIndex: trickIdx, cardIndex: cardIdx });
        }

        const playedEffectiveSuit = getEffectiveSuit(card, trump);

        // First card establishes the led suit
        if (cardIdx === 0) {
          ledEffectiveSuit = playedEffectiveSuit;
        } else if (ledEffectiveSuit && playedEffectiveSuit !== ledEffectiveSuit) {
          // Following to lead with a different suit: check for renege
          if (handsKnown && checkInventory) {
            const currentHand = playerHands[playerSeat] || [];
            const hasLedSuit = currentHand.some((c) => getEffectiveSuit(c, trump) === ledEffectiveSuit);

            if (hasLedSuit) {
              const holdingLedCards = currentHand.filter((c) => getEffectiveSuit(c, trump) === ledEffectiveSuit);
              violations.push({
                code: "RENEGE",
                dealIndex,
                trickIndex: trickIdx,
                cardIndex: cardIdx,
                seatIndex: playerSeat,
                card,
                expected: `Card of suit '${ledEffectiveSuit}'`,
                actual: card,
                message: `Seat ${playerSeat} reneged in trick ${trickIdx + 1}: played ${card} (suit '${playedEffectiveSuit}') while holding led suit '${ledEffectiveSuit}' (${holdingLedCards.join(", ")}).`,
              });
            }
          }
        }

        // Check hand inventory if initial hands were known
        if (handsKnown && checkInventory) {
          const currentHand = playerHands[playerSeat] || [];
          const cardInHandIdx = currentHand.indexOf(card);
          if (cardInHandIdx === -1) {
            violations.push({
              code: "CARD_NOT_IN_HAND",
              dealIndex,
              trickIndex: trickIdx,
              cardIndex: cardIdx,
              seatIndex: playerSeat,
              card,
              message: `Seat ${playerSeat} played ${card} in trick ${trickIdx + 1}, but it was not in their hand.`,
            });
          } else {
            currentHand.splice(cardInHandIdx, 1);
          }
        }
      });

      // Update lead seat for next trick based on trick winner
      if (trickCards.length === expectedCardsPerTrick && trump) {
        const winnerIndex = getWinnerIndex(trickCards, trump);
        leadSeat = getActivePlayerSeat(leadSeat, winnerIndex, sitOutSeats, numPlayers);
      } else {
        leadSeat = getActivePlayerSeat(leadSeat, 1, sitOutSeats, numPlayers);
      }
    });
  }

  return {
    isValid: violations.length === 0,
    violations,
  };
}

/**
 * Validates an entire EGN file across all deals for gameplay legality, reneges, and duplicate cards.
 */
export function validateGameplay(
  egn: EgnFile,
  options: GameplayValidationOptions = {}
): GameplayValidationResult {
  const allViolations: GameplayViolation[] = [];

  if (Array.isArray(egn.deals)) {
    egn.deals.forEach((deal, dealIdx) => {
      const result = validateDealGameplay(deal, egn.metadata, dealIdx, options);
      if (!result.isValid) {
        allViolations.push(...result.violations);
      }
    });
  }

  return {
    isValid: allViolations.length === 0,
    violations: allViolations,
  };
}
