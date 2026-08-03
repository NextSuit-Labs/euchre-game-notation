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

import { encodeInteger } from "./bitstream";

/**
 * Card deck constants and encoding utilities.
 */
export const SUITS = ["s", "h", "c", "d"];

export const ALL_RANKS = [
  "2", "3", "4", "5", "6", "7",
  "8", "9", "T", "J", "Q", "K", "A"
];
export const ALL_RANKS_WITH_CAVALIER = [
  "2", "3", "4", "5", "6", "7",
  "8", "9", "T", "J", "C", "Q", "K", "A"
];
export const TRIUMPHS = [
  "0", "1", "2", "3", "4", "5",
  "6", "7", "8", "9", "10", "11",
  "12", "13", "14", "15", "16",
  "17", "18", "19", "20", "21"
]

export const MIN_RANK_TO_CODE: Record<number, number> = { 9: 0, 8: 1, 7: 2, 6: 3, 2: 4 };
export const CODE_TO_MIN_RANK: number[] = [9, 8, 7, 6, 2];

/**
 * Builds the ordered card deck for a given minimum rank.
 * @param minRank Lowest card rank in the deck (9, 8, 7, 6, or 2 for 52-card standard deck). Default 9.
 */
export function buildDeck(
  minRank: number = 9,
  includeCavalier: boolean = false,
  includeTriumphs: boolean = false
): string[] {
  const rankStr = String(minRank);
  const rankArray = includeCavalier ? ALL_RANKS_WITH_CAVALIER : ALL_RANKS;
  const startIdx = rankArray.indexOf(rankStr);
  const ranks = startIdx >= 0 ? rankArray.slice(startIdx) : rankArray.slice(rankArray.indexOf("9"));
  return ranks.flatMap((rank) => SUITS.map((suit) => rank + suit)).concat(includeTriumphs ? TRIUMPHS : []);
}

/** Standard 24-card Euchre deck (min_rank = 9). */
export const STANDARD_DECK = buildDeck(9);

/** Standard 52-card deck (min_rank = 2). */
export const FULL_52_CARD_DECK = buildDeck(2);

/** French Tarot 78-card deck (min_rank = 2). */
export const FULL_78_CARD_DECK = buildDeck(2, true, true);

export function encodeCard(card: string, cardsRemaining: string[]): string {
  const index = cardsRemaining.indexOf(card);
  if (index === -1) {
    throw new Error(`Card ${card} not found in remaining cards.`);
  }
  return encodeInteger(index, cardsRemaining.length - 1);
}

export function encodeCardFromDeck(card: string, deck: string[]): string {
  const index = deck.indexOf(card);
  if (index === -1) {
    throw new Error(`Card ${card} not found in deck.`);
  }
  return encodeInteger(index, deck.length - 1);
}

export function encodeR1Call(call: string): string {
  return call === "Pass" ? "0" : "1";
}

export function encodeR2Call(call: string, possibleSuits: string[]): string {
  if (call === "Pass") {
    return "00";
  } else {
    const char = call[0].toLowerCase();
    const index = possibleSuits.indexOf(char) + 1;
    return encodeInteger(index, 3);
  }
}
