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

import { Card, Deal, Metadata, Ruleset } from "../types";

export type Suit = "s" | "h" | "c" | "d";

export interface DealStep {
  type: "INITIAL" | "BID" | "PLAY";
  description: string;
  annotation: string;
  hands: Card[][];
  playedCards: (Card | null)[];
  bidCall?: { seat: number; call: string } | null;
  callIndex?: number;
  sitOutSeat: number | null;
  callingTeam: number;
  callingTeamTricks: number;
  defendingTeamTricks: number;
  trickWinnerSeat?: number;
  scoreChange?: [number, number];
}

/**
 * Determines the trump suit from the bidding calls of a deal.
 * Returns 's', 'h', 'c', 'd', or null.
 */
export function determineTrump(deal: Deal): string | null {
  const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
  if (!bidding || bidding.type !== "EUCHRE_BIDDING") return null;

  const upcardSuit = deal.initialState.upCard ? deal.initialState.upCard[1].toLowerCase() : null;
  const callIndex = bidding.calls.findIndex((c) => c !== "Pass");
  if (callIndex === -1) return null;

  const call = bidding.calls[callIndex];
  if (callIndex < 4) {
    if (["Order", "PickUp", "Alone", "Call"].includes(call)) return upcardSuit;
  } else {
    if (["s", "h", "c", "d"].includes(call.toLowerCase())) return call.toLowerCase();
  }
  return null;
}

/**
 * Returns the seat index of the player who made the trump call (0-3), or null.
 */
export function determineMaker(deal: Deal): number | null {
  const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
  if (!bidding || bidding.type !== "EUCHRE_BIDDING") return null;

  const dealer = deal.initialState.dealer ?? 0;
  const callIndex = bidding.calls.findIndex((c) => c !== "Pass");
  if (callIndex === -1) return null;

  return (dealer + callIndex + 1) % 4;
}

/**
 * Returns true if the maker went alone.
 */
export function determineIsAlone(deal: Deal): boolean {
  const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
  if (!bidding || bidding.type !== "EUCHRE_BIDDING") return false;

  return Boolean(bidding.isAlone);
}

/**
 * Determines the lead seat for trick 1 based on the ruleset and loner status.
 */
export function determineLeadSeat(deal: Deal, lonerLead: "LEFT_OF_DEALER" | "LEFT_OF_LONER" = "LEFT_OF_DEALER"): number {
  const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
  if (!bidding || bidding.type !== "EUCHRE_BIDDING") return 0;

  const dealer = deal.initialState.dealer ?? 0;
  const maker = determineMaker(deal);

  if (bidding.isAlone && maker !== null) {
    if (lonerLead === "LEFT_OF_LONER") {
      return (maker + 1) % 4;
    } else if (maker === (dealer + 3) % 4) {
      return (dealer + 2) % 4; // Seat 2 starts when seat 3 goes alone
    }
  }
  return (dealer + 1) % 4;
}

/**
 * Returns the same-color suit counterpart (Left Bower suit).
 */
export function getLeftBowerSuit(trump: string): string | null {
  const t = trump.toLowerCase();
  if (t === "d") return "h";
  if (t === "h") return "d";
  if (t === "s") return "c";
  if (t === "c") return "s";
  return null;
}

/**
 * Evaluates the numeric strength value of a card within the current trick context.
 */
export function getCardValue(card: string, ledSuit: string, trump: string): number {
  if (!card) return -1;
  const rank = card[0];
  const suit = card[1].toLowerCase();
  const t = trump.toLowerCase();
  const led = ledSuit.toLowerCase();

  // 1. Right Bower
  if (rank === "J" && suit === t) return 100;

  // 2. Left Bower
  const isLeftBower = rank === "J" && suit === getLeftBowerSuit(t);
  if (isLeftBower) return 99;

  // 3. Other trump cards
  if (suit === t) {
    const trumpRankValues: Record<string, number> = { A: 14, K: 13, Q: 12, T: 10, "9": 9, "8": 8, "7": 7 };
    return 80 + (trumpRankValues[rank] || 0);
  }

  // 4. Led suit cards
  if (suit === led) {
    const ledRankValues: Record<string, number> = { A: 14, K: 13, Q: 12, J: 11, T: 10, "9": 9, "8": 8, "7": 7 };
    return 40 + (ledRankValues[rank] || 0);
  }

  return 0;
}

/**
 * Returns the index (0 to 3) of the winning card in the given trick.
 */
export function getWinnerIndex(trickCards: string[], trump: string): number {
  if (!trickCards || trickCards.length === 0) return 0;
  const ledSuit = trickCards[0][1].toLowerCase();
  let bestVal = -1;
  let bestIndex = 0;

  trickCards.forEach((card, index) => {
    const val = getCardValue(card, ledSuit, trump);
    if (val > bestVal) {
      bestVal = val;
      bestIndex = index;
    }
  });
  return bestIndex;
}

/**
 * Retrieves the seat index of the player whose turn it was in the trick, skipping any sit-out player.
 */
export function getPlayerIndexInTrick(leadSeat: number, cardIndex: number, sitOutSeat: number | null): number {
  let player = leadSeat;
  let count = 0;
  while (count < cardIndex) {
    player = (player + 1) % 4;
    if (player !== sitOutSeat) {
      count++;
    }
  }
  return player;
}

/**
 * Compiles a raw EGN Deal structure into a chronological list of game state steps,
 * evaluating trick winners and computing the deal's score change.
 */
export function compileDealSteps(deal: Deal, metadata: Partial<Metadata> = {}): DealStep[] {
  const players = (metadata.players || ["Player 0", "Player 1", "Player 2", "Player 3"]).map((p) =>
    typeof p === "string" ? p : p.name
  );
  const ruleset: Ruleset | undefined = metadata.ruleset;

  let aloneSeat: number | null = null;
  let sitOutSeat: number | null = null;
  let callingTeam = 0;
  let isAlone = false;
  let callerSeat: number | null = null;

  const biddingPhase = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
  if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING") {
    isAlone = Boolean(biddingPhase.isAlone);
    const callIndex = biddingPhase.calls.findIndex((c) => c !== "Pass");
    if (callIndex !== -1) {
      const dealer = deal.initialState.dealer ?? 0;
      callerSeat = (dealer + 1 + callIndex) % 4;
      aloneSeat = callerSeat;
      if (isAlone) {
        sitOutSeat = (aloneSeat + 2) % 4;
      }
      callingTeam = callerSeat % 2;
    }
  }

  // Reconstruct starting player hands if not explicitly present in the EGN
  let initialHands: Card[][] = deal.initialState.playerCards
    ? deal.initialState.playerCards.map((h) => [...h])
    : [[], [], [], []];
  const hasEmptyHand = initialHands.some((h, i) => i !== sitOutSeat && h.length === 0);

  if (hasEmptyHand && deal.phases) {
    const playPhase = deal.phases.find((p) => p.type === "TRICK_PLAY");
    if (playPhase && playPhase.type === "TRICK_PLAY") {
      initialHands = [[], [], [], []];
      const trump = determineTrump(deal);
      let leadSeat = determineLeadSeat(deal, ruleset?.loner_lead ?? "LEFT_OF_DEALER");

      playPhase.tricks.forEach((trickCards) => {
        trickCards.forEach((card, cardIndex) => {
          const playerIndex = getPlayerIndexInTrick(leadSeat, cardIndex, sitOutSeat);
          initialHands[playerIndex].push(card);
        });
        if (trickCards.length === (sitOutSeat !== null ? 3 : 4) && trump) {
          const winnerIndex = getWinnerIndex(trickCards, trump);
          leadSeat = getPlayerIndexInTrick(leadSeat, winnerIndex, sitOutSeat);
        } else {
          leadSeat = getPlayerIndexInTrick(leadSeat, 1, sitOutSeat);
        }
      });
    }
  }

  const compiled: DealStep[] = [];

  // Initial step
  compiled.push({
    type: "INITIAL",
    description: "Initial Deal",
    annotation: "Cards dealt. Upcard is turned up.",
    hands: initialHands,
    playedCards: [null, null, null, null],
    bidCall: null,
    sitOutSeat: sitOutSeat,
    callingTeam: callingTeam,
    callingTeamTricks: 0,
    defendingTeamTricks: 0,
  });

  if (!deal.phases) return compiled;

  // Phase 1: Bidding calls
  if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING") {
    const dealer = deal.initialState.dealer ?? 0;
    let caller = (dealer + 1) % 4;

    biddingPhase.calls.forEach((call, index) => {
      const annot = biddingPhase.callAnnotations ? biddingPhase.callAnnotations[index] : null;
      compiled.push({
        type: "BID",
        description: `Bidding: ${players[caller]}`,
        annotation: Array.isArray(annot) ? annot.join("\n") : annot || `Player ${caller} called: ${call}`,
        hands: compiled[compiled.length - 1].hands.map((h) => [...h]),
        playedCards: [null, null, null, null],
        bidCall: { seat: caller, call: call },
        callIndex: index,
        sitOutSeat: sitOutSeat,
        callingTeam: callingTeam,
        callingTeamTricks: 0,
        defendingTeamTricks: 0,
      });
      caller = (caller + 1) % 4;
    });
  }

  // Phase 2: Trick Play
  let callingTeamTricks = 0;
  let defendingTeamTricks = 0;

  const playPhase = deal.phases.find((p) => p.type === "TRICK_PLAY");
  if (playPhase && playPhase.type === "TRICK_PLAY") {
    const activeHands = compiled[compiled.length - 1].hands.map((h) => [...h]);
    const trump = determineTrump(deal);
    let leadSeat = determineLeadSeat(deal, ruleset?.loner_lead ?? "LEFT_OF_DEALER");

    playPhase.tricks.forEach((trickCards, trickIndex) => {
      const currentTrickPlayed: (Card | null)[] = [null, null, null, null];

      trickCards.forEach((card, cardIndex) => {
        const playerIndex = getPlayerIndexInTrick(leadSeat, cardIndex, sitOutSeat);
        const absolutePlayIndex = trickIndex * 4 + cardIndex;

        activeHands[playerIndex] = activeHands[playerIndex].filter((c) => c !== card);
        currentTrickPlayed[playerIndex] = card;

        const annot = playPhase.playAnnotations ? playPhase.playAnnotations[absolutePlayIndex] : null;

        compiled.push({
          type: "PLAY",
          description: `Trick ${trickIndex + 1}, Card ${cardIndex + 1}`,
          annotation: Array.isArray(annot) ? annot.join("\n") : annot || `Player ${playerIndex + 1} played ${card}`,
          hands: activeHands.map((h) => [...h]),
          playedCards: [...currentTrickPlayed],
          bidCall: null,
          sitOutSeat: sitOutSeat,
          callingTeam: callingTeam,
          callingTeamTricks: callingTeamTricks,
          defendingTeamTricks: defendingTeamTricks,
        });
      });

      if (trickCards.length === (sitOutSeat !== null ? 3 : 4) && trump) {
        const winnerIndex = getWinnerIndex(trickCards, trump);
        leadSeat = getPlayerIndexInTrick(leadSeat, winnerIndex, sitOutSeat);

        const winnerTeam = leadSeat % 2;
        if (winnerTeam === callingTeam) {
          callingTeamTricks++;
        } else {
          defendingTeamTricks++;
        }

        const lastPlayIndex = compiled.length - 1;
        if (lastPlayIndex >= 0 && compiled[lastPlayIndex].type === "PLAY") {
          compiled[lastPlayIndex].callingTeamTricks = callingTeamTricks;
          compiled[lastPlayIndex].defendingTeamTricks = defendingTeamTricks;
          compiled[lastPlayIndex].trickWinnerSeat = leadSeat;
        }
      } else {
        leadSeat = getPlayerIndexInTrick(leadSeat, 1, sitOutSeat);
      }
    });
  }

  // Calculate final score changes for this deal
  let team0Change = 0;
  let team1Change = 0;

  if (callingTeamTricks >= 3) {
    const lonerMarchScore = ruleset?.loner_march_score ?? 4;
    const points = callingTeamTricks === 5 ? (isAlone ? lonerMarchScore : 2) : 1;
    if (callingTeam === 0) team0Change = points;
    else team1Change = points;
  } else if (defendingTeamTricks >= 3) {
    const lonerEuchredScore = isAlone && ruleset?.loner_euchred_score ? ruleset.loner_euchred_score : 2;
    const points = lonerEuchredScore; // Euchred = 2 points (or custom loner_euchred_score)
    if (callingTeam === 0) team1Change = points;
    else team0Change = points;
  }

  // Attach final score change to all compiled steps
  compiled.forEach((step) => {
    step.scoreChange = [team0Change, team1Change];
  });

  return compiled;
}
