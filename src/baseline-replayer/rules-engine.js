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

// ============================================================================
// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY.
// Generated from src/engine/rules.ts by generate-replayer-rules.js
// ============================================================================

var exports = typeof exports !== "undefined" ? exports : {};

exports.isOrder = exports.isPass = void 0;
exports.determineTrump = determineTrump;
exports.determineMaker = determineMaker;
exports.determineIsAlone = determineIsAlone;
exports.determineLeadSeat = determineLeadSeat;
exports.getLeftBowerSuit = getLeftBowerSuit;
exports.getCardValue = getCardValue;
exports.getWinnerIndex = getWinnerIndex;
exports.getPlayerIndexInTrick = getPlayerIndexInTrick;
exports.inferPlayerCards = inferPlayerCards;
exports.calculatePlayerCards = calculatePlayerCards;
exports.compileDealSteps = compileDealSteps;
const isPass = (c) => c === "Pass" || c === "p";
exports.isPass = isPass;
const isOrder = (c) => c === "Order" || c === "o";
exports.isOrder = isOrder;
/**
 * Determines the trump suit ('s', 'h', 'c', 'd') for a deal based on bidding calls.
 * Returns null if all passed.
 */
function determineTrump(deal) {
    const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (!bidding || bidding.type !== "EUCHRE_BIDDING")
        return null;
    const upcardSuit = deal.initialState.upCard ? deal.initialState.upCard[1].toLowerCase() : null;
    const callIndex = bidding.calls.findIndex((c) => !(0, exports.isPass)(c));
    if (callIndex === -1)
        return null;
    const call = bidding.calls[callIndex];
    if (callIndex < 4) {
        if ((0, exports.isOrder)(call))
            return upcardSuit;
    }
    else {
        if (["s", "h", "c", "d"].includes(call.toLowerCase()))
            return call.toLowerCase();
    }
    return null;
}
/**
 * Returns the seat index of the player who made the trump call (0-3), or null.
 */
function determineMaker(deal) {
    var _a;
    const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (!bidding || bidding.type !== "EUCHRE_BIDDING")
        return null;
    const dealer = (_a = deal.initialState.dealer) !== null && _a !== void 0 ? _a : 0;
    const callIndex = bidding.calls.findIndex((c) => !(0, exports.isPass)(c));
    if (callIndex === -1)
        return null;
    return (dealer + callIndex + 1) % 4;
}
/**
 * Returns true if the maker went alone.
 */
function determineIsAlone(deal) {
    const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (!bidding || bidding.type !== "EUCHRE_BIDDING")
        return false;
    return Boolean(bidding.isAlone);
}
/**
 * Determines the lead seat for trick 1 based on the ruleset and loner status.
 */
function determineLeadSeat(deal, lonerLead = "LEFT_OF_DEALER") {
    var _a;
    const bidding = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (!bidding || bidding.type !== "EUCHRE_BIDDING")
        return 0;
    const dealer = (_a = deal.initialState.dealer) !== null && _a !== void 0 ? _a : 0;
    const maker = determineMaker(deal);
    if (bidding.isAlone && maker !== null) {
        if (lonerLead === "LEFT_OF_LONER") {
            return (maker + 1) % 4;
        }
        else if (maker === (dealer + 3) % 4) {
            return (dealer + 2) % 4; // Seat 2 starts when seat 3 goes alone
        }
    }
    return (dealer + 1) % 4;
}
/**
 * Returns the same-color suit counterpart (Left Bower suit).
 */
function getLeftBowerSuit(trump) {
    const t = trump.toLowerCase();
    if (t === "d")
        return "h";
    if (t === "h")
        return "d";
    if (t === "s")
        return "c";
    if (t === "c")
        return "s";
    return null;
}
/**
 * Evaluates the numeric strength value of a card within the current trick context.
 */
function getCardValue(card, ledSuit, trump) {
    if (!card)
        return -1;
    const rank = card[0];
    const suit = card[1].toLowerCase();
    const t = trump.toLowerCase();
    const led = ledSuit.toLowerCase();
    // 1. Right Bower
    if (rank === "J" && suit === t)
        return 100;
    // 2. Left Bower
    const isLeftBower = rank === "J" && suit === getLeftBowerSuit(t);
    if (isLeftBower)
        return 99;
    // 3. Other trump cards
    if (suit === t) {
        const trumpRankValues = { A: 14, K: 13, Q: 12, T: 10, "9": 9, "8": 8, "7": 7 };
        return 80 + (trumpRankValues[rank] || 0);
    }
    // 4. Led suit cards
    if (suit === led) {
        const ledRankValues = { A: 14, K: 13, Q: 12, J: 11, T: 10, "9": 9, "8": 8, "7": 7 };
        return 40 + (ledRankValues[rank] || 0);
    }
    return 0;
}
/**
 * Returns the index (0 to 3) of the winning card in the given trick.
 */
function getWinnerIndex(trickCards, trump) {
    if (!trickCards || trickCards.length === 0)
        return 0;
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
function getPlayerIndexInTrick(leadSeat, cardIndex, sitOutSeat) {
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
 * Safely parses a Deal from a Deal object, a JSON string, or a bitpacked Base64 string.
 * Bitpacked strings are decoded dynamically via require or browser global when available,
 * ensuring rules.ts can be transpiled for direct browser use without bundling.
 */
function parseDealInput(deal) {
    if (typeof deal !== "string") {
        return deal;
    }
    const trimmed = deal.trim();
    if (trimmed.startsWith("{")) {
        return JSON.parse(trimmed);
    }
    // Attempt dynamic Node.js require without top-level import
    if (typeof require !== "undefined") {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const bp = require("../bitpacker");
            if (typeof bp.unpackDeal === "function") {
                return bp.unpackDeal(trimmed, 0);
            }
        }
        catch (_a) {
            // Ignored if ../bitpacker is not resolvable
        }
    }
    // Attempt browser global (e.g. from bundle.js)
    if (typeof window !== "undefined") {
        const win = window;
        if (win.EuchreNotation && typeof win.EuchreNotation.unpackDeal === "function") {
            return win.EuchreNotation.unpackDeal(trimmed, 0);
        }
        if (typeof win.unpackDeal === "function") {
            return win.unpackDeal(trimmed, 0);
        }
    }
    throw new Error("Cannot unpack condensed base64 deal string: unpackDeal is not available in this environment.");
}
/**
 * Returns the starting playerCards for each player for a given Deal.
 * If initialState.playerCards is already provided (non-empty), returns them directly.
 * Otherwise, infers them from the bidding and trick play phases based on who won
 * each trick to determine who leads the next trick, restoring any dealer discard
 * if ordered up.
 *
 * @param deal A Deal object, or a condensed Base64 string / JSON string representing a Deal.
 * @param ruleset Optional ruleset configuration (e.g. loner_lead)
 * @returns Array of 4 Card arrays [Seat 0, Seat 1, Seat 2, Seat 3]
 */
function inferPlayerCards(deal, ruleset) {
    var _a, _b, _c, _d, _e;
    const parsedDeal = parseDealInput(deal);
    // 1. Only rely on playerCards if all 4 seats are filled with 5 cards each.
    // If any have less than 5 cards (or are omitted/empty), infer from bidding, discard, and trick play.
    const rawPlayerCards = (_a = parsedDeal.initialState) === null || _a === void 0 ? void 0 : _a.playerCards;
    if (Array.isArray(rawPlayerCards) &&
        rawPlayerCards.length === 4 &&
        rawPlayerCards.every((hand) => Array.isArray(hand) && hand.length === 5)) {
        return rawPlayerCards.map((h) => [...h]);
    }
    // 2. Otherwise, infer them from bidding and trick play phases
    const dealer = (_c = (_b = parsedDeal.initialState) === null || _b === void 0 ? void 0 : _b.dealer) !== null && _c !== void 0 ? _c : 0;
    const biddingPhase = parsedDeal.phases
        ? parsedDeal.phases.find((p) => p.type === "EUCHRE_BIDDING")
        : null;
    let sitOutSeat = null;
    if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING") {
        const isAlone = Boolean(biddingPhase.isAlone);
        const callIndex = biddingPhase.calls.findIndex((c) => !(0, exports.isPass)(c));
        if (callIndex !== -1 && isAlone) {
            const callerSeat = (dealer + 1 + callIndex) % 4;
            sitOutSeat = (callerSeat + 2) % 4;
        }
    }
    const hands = [[], [], [], []];
    // Helper to ensure sitting-out partners (maker's partner on a loner, or defender's partner)
    // retain their cards specified by playerCards if provided.
    const preserveSitOutHands = () => {
        if (sitOutSeat !== null &&
            Array.isArray(rawPlayerCards === null || rawPlayerCards === void 0 ? void 0 : rawPlayerCards[sitOutSeat]) &&
            rawPlayerCards[sitOutSeat].length > 0) {
            hands[sitOutSeat] = [...rawPlayerCards[sitOutSeat]];
        }
        if (biddingPhase &&
            biddingPhase.type === "EUCHRE_BIDDING" &&
            (ruleset === null || ruleset === void 0 ? void 0 : ruleset.defend_alone) &&
            biddingPhase.aloneDefender !== undefined) {
            const defenderPartner = (biddingPhase.aloneDefender + 2) % 4;
            if (Array.isArray(rawPlayerCards === null || rawPlayerCards === void 0 ? void 0 : rawPlayerCards[defenderPartner]) &&
                rawPlayerCards[defenderPartner].length > 0) {
                hands[defenderPartner] = [...rawPlayerCards[defenderPartner]];
            }
        }
    };
    if (!parsedDeal.phases) {
        preserveSitOutHands();
        return hands;
    }
    const playPhase = parsedDeal.phases.find((p) => p.type === "TRICK_PLAY");
    if (!playPhase || !Array.isArray(playPhase.tricks)) {
        preserveSitOutHands();
        return hands;
    }
    const trump = determineTrump(parsedDeal);
    let leadSeat = determineLeadSeat(parsedDeal, (_d = ruleset === null || ruleset === void 0 ? void 0 : ruleset.loner_lead) !== null && _d !== void 0 ? _d : "LEFT_OF_DEALER");
    const numExpectedPlayers = sitOutSeat !== null ? 3 : 4;
    playPhase.tricks.forEach((trickCards) => {
        trickCards.forEach((card, cardIndex) => {
            const playerIndex = getPlayerIndexInTrick(leadSeat, cardIndex, sitOutSeat);
            hands[playerIndex].push(card);
        });
        if (trickCards.length === numExpectedPlayers && trump) {
            const winnerIndex = getWinnerIndex(trickCards, trump);
            leadSeat = getPlayerIndexInTrick(leadSeat, winnerIndex, sitOutSeat);
        }
        else {
            leadSeat = getPlayerIndexInTrick(leadSeat, 1, sitOutSeat);
        }
    });
    // If dealer was ordered up and a discard was given, dealer's original dealt hand
    // had the discard instead of the upcard:
    const orderCallIndex = biddingPhase ? biddingPhase.calls.findIndex((c) => !(0, exports.isPass)(c)) : -1;
    const isOrderedUp = orderCallIndex >= 0 && orderCallIndex < 4;
    const discard = biddingPhase === null || biddingPhase === void 0 ? void 0 : biddingPhase.discard;
    const upCard = (_e = parsedDeal.initialState) === null || _e === void 0 ? void 0 : _e.upCard;
    if (isOrderedUp && upCard && discard) {
        const upcardIdx = hands[dealer].indexOf(upCard);
        if (upcardIdx !== -1) {
            hands[dealer].splice(upcardIdx, 1);
            hands[dealer].push(discard);
        }
        else if (!hands[dealer].includes(discard)) {
            hands[dealer].push(discard);
        }
    }
    preserveSitOutHands();
    return hands;
}
/**
 * Alias for inferPlayerCards.
 */
function calculatePlayerCards(deal, ruleset) {
    return inferPlayerCards(deal, ruleset);
}
/**
 * Compiles a raw EGN Deal structure into a chronological list of game state steps,
 * evaluating trick winners and computing the deal's score change.
 */
function compileDealSteps(deal, metadata = {}) {
    var _a, _b, _c, _d;
    const players = (metadata.players || ["Player 0", "Player 1", "Player 2", "Player 3"]).map((p) => typeof p === "string" ? p : p.name);
    const ruleset = metadata.ruleset;
    let aloneSeat = null;
    let sitOutSeat = null;
    let callingTeam = 0;
    let isAlone = false;
    let callerSeat = null;
    const biddingPhase = deal.phases ? deal.phases.find((p) => p.type === "EUCHRE_BIDDING") : null;
    if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING") {
        isAlone = Boolean(biddingPhase.isAlone);
        const callIndex = biddingPhase.calls.findIndex((c) => !(0, exports.isPass)(c));
        if (callIndex !== -1) {
            const dealer = (_a = deal.initialState.dealer) !== null && _a !== void 0 ? _a : 0;
            callerSeat = (dealer + 1 + callIndex) % 4;
            aloneSeat = callerSeat;
            if (isAlone) {
                sitOutSeat = (aloneSeat + 2) % 4;
            }
            callingTeam = callerSeat % 2;
        }
    }
    // Reconstruct starting player hands if not explicitly present in the EGN
    const initialHands = inferPlayerCards(deal, ruleset);
    const dealer = (_b = deal.initialState.dealer) !== null && _b !== void 0 ? _b : 0;
    const upCard = deal.initialState.upCard;
    const orderCallIndex = biddingPhase ? biddingPhase.calls.findIndex((c) => !(0, exports.isPass)(c)) : -1;
    const isOrderedUp = orderCallIndex >= 0 && orderCallIndex < 4;
    const discard = biddingPhase === null || biddingPhase === void 0 ? void 0 : biddingPhase.discard;
    const hasDiscard = Boolean(isOrderedUp && upCard && discard);
    const compiled = [];
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
    if (!deal.phases)
        return compiled;
    // Phase 1: Bidding calls
    if (biddingPhase && biddingPhase.type === "EUCHRE_BIDDING") {
        let caller = (dealer + 1) % 4;
        biddingPhase.calls.forEach((call, index) => {
            var _a;
            const annot = biddingPhase.callAnnotations ? biddingPhase.callAnnotations[index] : null;
            const currentHands = compiled[compiled.length - 1].hands.map((h) => [...h]);
            // If dealer is ordered up the upcard in first 4 calls and discard is given:
            // Remove discard from dealer hand and add the upcard at the order-up call step
            if (hasDiscard && index === orderCallIndex && upCard && discard) {
                const discIdx = currentHands[dealer].indexOf(discard);
                if (discIdx !== -1) {
                    currentHands[dealer].splice(discIdx, 1);
                }
                else {
                    currentHands[dealer] = currentHands[dealer].filter((c) => c !== discard);
                }
                if (!currentHands[dealer].includes(upCard)) {
                    currentHands[dealer].push(upCard);
                }
            }
            let stepAnnotation = Array.isArray(annot) ? annot.join("\n") : annot || `Player ${caller} called: ${call}`;
            if (hasDiscard && index === orderCallIndex && biddingPhase.callAnnotations) {
                const discardAnnot = (_a = biddingPhase.callAnnotations[16]) !== null && _a !== void 0 ? _a : biddingPhase.callAnnotations["16"];
                if (discardAnnot) {
                    const discardText = Array.isArray(discardAnnot) ? discardAnnot.join("\n") : String(discardAnnot);
                    stepAnnotation = annot
                        ? `${stepAnnotation}\n[Discard] ${discardText}`
                        : `Player ${caller} called: ${call}\n[Discard] ${discardText}`;
                }
            }
            compiled.push({
                type: "BID",
                description: `Bidding: ${players[caller]}`,
                annotation: stepAnnotation,
                hands: currentHands,
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
        if (hasDiscard && upCard && discard && activeHands[dealer].includes(discard)) {
            const discIdx = activeHands[dealer].indexOf(discard);
            if (discIdx !== -1) {
                activeHands[dealer].splice(discIdx, 1);
            }
            if (!activeHands[dealer].includes(upCard)) {
                activeHands[dealer].push(upCard);
            }
        }
        const trump = determineTrump(deal);
        let leadSeat = determineLeadSeat(deal, (_c = ruleset === null || ruleset === void 0 ? void 0 : ruleset.loner_lead) !== null && _c !== void 0 ? _c : "LEFT_OF_DEALER");
        playPhase.tricks.forEach((trickCards, trickIndex) => {
            const currentTrickPlayed = [null, null, null, null];
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
                }
                else {
                    defendingTeamTricks++;
                }
                const lastPlayIndex = compiled.length - 1;
                if (lastPlayIndex >= 0 && compiled[lastPlayIndex].type === "PLAY") {
                    compiled[lastPlayIndex].callingTeamTricks = callingTeamTricks;
                    compiled[lastPlayIndex].defendingTeamTricks = defendingTeamTricks;
                    compiled[lastPlayIndex].trickWinnerSeat = leadSeat;
                }
            }
            else {
                leadSeat = getPlayerIndexInTrick(leadSeat, 1, sitOutSeat);
            }
        });
    }
    // Calculate final score changes for this deal
    let team0Change = 0;
    let team1Change = 0;
    if (callingTeamTricks >= 3) {
        const lonerMarchScore = (_d = ruleset === null || ruleset === void 0 ? void 0 : ruleset.loner_march_score) !== null && _d !== void 0 ? _d : 4;
        const points = callingTeamTricks === 5 ? (isAlone ? lonerMarchScore : 2) : 1;
        if (callingTeam === 0)
            team0Change = points;
        else
            team1Change = points;
    }
    else if (defendingTeamTricks >= 3) {
        const lonerEuchredScore = isAlone && (ruleset === null || ruleset === void 0 ? void 0 : ruleset.loner_euchred_score) ? ruleset.loner_euchred_score : 2;
        const points = lonerEuchredScore; // Euchred = 2 points (or custom loner_euchred_score)
        if (callingTeam === 0)
            team1Change = points;
        else
            team0Change = points;
    }
    // Attach final score change to all compiled steps
    compiled.forEach((step) => {
        step.scoreChange = [team0Change, team1Change];
    });
    return compiled;
}

// Universal browser global & CommonJS export attachment
if (typeof window !== "undefined") {
  window.isPass = exports.isPass;
  window.isOrder = exports.isOrder;
  window.determineTrump = exports.determineTrump;
  window.determineMaker = exports.determineMaker;
  window.determineIsAlone = exports.determineIsAlone;
  window.determineLeadSeat = exports.determineLeadSeat;
  window.getLeftBowerSuit = exports.getLeftBowerSuit;
  window.getCardValue = exports.getCardValue;
  window.getWinnerIndex = exports.getWinnerIndex;
  window.getPlayerIndexInTrick = exports.getPlayerIndexInTrick;
  window.compileDealSteps = exports.compileDealSteps;
  window.inferPlayerCards = exports.inferPlayerCards;
  window.calculatePlayerCards = exports.calculatePlayerCards;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = exports;
}
