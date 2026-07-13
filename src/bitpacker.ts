import { Deal, BiddingPhase, TrickPlayPhase, Call, AlternativeLine, Phase } from "./types";

const SUITS = ["s", "h", "c", "d"];

// All ranks from lowest to highest (for deck building)
const ALL_RANKS = ["6", "7", "8", "9", "T", "J", "Q", "K", "A"];

// Min-rank to 2-bit code: 0=9 (24-card), 1=8 (28-card), 2=7 (32-card), 3=6 (36-card)
const MIN_RANK_TO_CODE: Record<number, number> = { 9: 0, 8: 1, 7: 2, 6: 3 };
const CODE_TO_MIN_RANK: number[] = [9, 8, 7, 6];

/**
 * Builds the ordered deck for a given minimum rank.
 * @param minRank Lowest card rank in the deck (9, 8, 7, or 6). Default 9.
 */
function buildDeck(minRank: number = 9): string[] {
  const rankStr = String(minRank);
  const startIdx = ALL_RANKS.indexOf(rankStr);
  const ranks = startIdx >= 0 ? ALL_RANKS.slice(startIdx) : ALL_RANKS.slice(ALL_RANKS.indexOf("9"));
  return ranks.flatMap((rank) => SUITS.map((suit) => rank + suit));
}

/** Standard 24-card deck (min_rank = 9) used by V0 and V1. */
const STANDARD_DECK = buildDeck(9);

/**
 * Options for {@link packDeal}.
 */
export interface PackOptions {
  /**
   * Bitpack version to encode as.
   * - `1` (default): V1 — standard 4-player, 24-card deck. Compact and widely supported.
   * - `2`: V2 — extended header supporting variable player counts, deck sizes, and defend-alone.
   */
  version?: 1 | 2;
  /**
   * Number of players (1–8). Default 4.
   * Only used in V2 encoding. Determines R1/R2 call boundary and cards per trick.
   */
  numPlayers?: number;
  /**
   * Minimum card rank in the deck (9, 8, 7, or 6). Default 9 (standard 24-card deck).
   * Only used in V2 encoding.
   */
  minRank?: number;
  /**
   * If true, returns the raw binary string instead of Base64URL encoding. Defaults to false.
   */
  asBinary?: boolean;
}

// ---------------------------------------------------------------------------
// Primitive encoders / decoders
// ---------------------------------------------------------------------------

function encodeInteger(value: number, maxValue: number): string {
  const bitLen = maxValue.toString(2).length;
  return value.toString(2).padStart(bitLen, "0");
}

function encodeCard(card: string, cardsRemaining: string[]): string {
  const index = cardsRemaining.indexOf(card);
  if (index === -1) {
    throw new Error(`Card ${card} not found in remaining cards.`);
  }
  return encodeInteger(index, cardsRemaining.length - 1);
}

function encodeR1Call(call: string): string {
  return call === "Pass" ? "0" : "1";
}

function encodeR2Call(call: string, possibleSuits: string[]): string {
  if (call === "Pass") {
    return "00";
  } else {
    const char = call[0].toLowerCase();
    const index = possibleSuits.indexOf(char) + 1;
    return encodeInteger(index, 3);
  }
}

function encodeBoolean(value: boolean): string {
  return value ? "1" : "0";
}

export function binaryStringToBase64Url(binaryStr: string): string {
  const paddedStr = binaryStr.padEnd(Math.ceil(binaryStr.length / 8) * 8, "0");
  let byteString = "";
  for (let i = 0; i < paddedStr.length; i += 8) {
    const byte = parseInt(paddedStr.slice(i, i + 8), 2);
    byteString += String.fromCharCode(byte);
  }
  const base64 = Buffer.from(byteString, "binary").toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlToBinaryString(base64Url: string): string {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = base64.length % 4;
  if (padding > 0) {
    base64 += "=".repeat(4 - padding);
  }
  const buffer = Buffer.from(base64, "base64");
  return Array.from(buffer)
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join("");
}

class BitReader {
  private pos = 0;
  constructor(private binaryStr: string) { }

  readBits(numBits: number): string {
    if (this.pos + numBits > this.binaryStr.length) {
      throw new Error("Not enough bits to read");
    }
    const bits = this.binaryStr.slice(this.pos, this.pos + numBits);
    this.pos += numBits;
    return bits;
  }

  remainingBits(): number {
    return this.binaryStr.length - this.pos;
  }

  readInteger(maxValue: number): number {
    const bitLen = maxValue.toString(2).length;
    const bits = this.readBits(bitLen);
    return parseInt(bits, 2);
  }

  readBoolean(): boolean {
    return this.readBits(1) === "1";
  }

  hasMoreBits(): boolean {
    return this.pos < this.binaryStr.length;
  }

  peekRemaining(): string {
    return this.binaryStr.slice(this.pos);
  }
}

function encodeString(str: string): string {
  const bytes = Buffer.from(str, "utf8");
  let bitStr = encodeInteger(bytes.length, 65535); // 16 bits
  for (const byte of bytes) {
    bitStr += byte.toString(2).padStart(8, "0");
  }
  return bitStr;
}

function decodeString(reader: BitReader): string {
  const len = reader.readInteger(65535); // 16 bits
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const bits = reader.readBits(8);
    bytes[i] = parseInt(bits, 2);
  }
  return Buffer.from(bytes).toString("utf8");
}

function encodeAnnotations(annotations: Record<number, string[]> | undefined): string {
  const keys = Object.keys(annotations || {})
    .map(Number)
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);
  if (keys.length === 0) {
    return "0";
  }
  let bits = "1";
  bits += encodeInteger(keys.length, 255);
  for (const key of keys) {
    bits += encodeInteger(key, 255);
    const texts = annotations![key] || [];
    bits += encodeInteger(texts.length, 255);
    for (const text of texts) {
      bits += encodeString(text);
    }
  }
  return bits;
}

function decodeAnnotations(reader: BitReader): Record<number, string[]> | undefined {
  const hasAnn = reader.readBoolean();
  if (!hasAnn) {
    return undefined;
  }
  const annotations: Record<number, string[]> = {};
  const numItems = reader.readInteger(255);
  for (let i = 0; i < numItems; i++) {
    const key = reader.readInteger(255);
    const numTexts = reader.readInteger(255);
    const texts: string[] = [];
    for (let j = 0; j < numTexts; j++) {
      texts.push(decodeString(reader));
    }
    annotations[key] = texts;
  }
  return annotations;
}

// ---------------------------------------------------------------------------
// Phase encoders / decoders (parameterized for V1 and V2)
// ---------------------------------------------------------------------------

/**
 * Encodes a EUCHRE_BIDDING phase.
 * @param bidding The phase to encode.
 * @param upCard The up-card for the deal.
 * @param startActionIndex Offset into the call sequence (used for alt-line branches).
 * @param numPlayers Number of active players. Default 4 (V1). Determines R1/R2 boundary.
 * @param version Bitpack version. Default 1. V2 encodes aloneDefender after isAlone.
 */
function encodeBiddingPhase(
  bidding: BiddingPhase,
  upCard: string,
  startActionIndex = 0,
  numPlayers = 4,
  version = 1,
): string {
  let bits = "";
  bidding.calls.forEach((call, callIndex) => {
    const actualIndex = startActionIndex + callIndex;
    if (actualIndex < numPlayers) {
      bits += encodeR1Call(call);
    } else {
      const remainingSuits = SUITS.filter(
        (suit) => suit !== upCard[1].toLowerCase()
      );
      bits += encodeR2Call(call, remainingSuits);
    }
  });
  bits += encodeBoolean(bidding.isAlone ?? false);

  // V2 only: encode aloneDefender immediately after isAlone, gated on isAlone=true
  if (version >= 2 && (bidding.isAlone ?? false)) {
    const hasDefendAlone =
      bidding.aloneDefender !== undefined && bidding.aloneDefender >= 0;
    bits += encodeBoolean(hasDefendAlone);
    if (hasDefendAlone) {
      bits += encodeInteger(bidding.aloneDefender!, 7); // 3 bits — seat 0–7
    }
  }

  bits += encodeAnnotations(bidding.callAnnotations);
  return bits;
}

/**
 * Decodes a EUCHRE_BIDDING phase from the bit reader.
 * @param reader The bit reader at the correct position.
 * @param upCard The up-card for the deal.
 * @param startActionIndex Offset into the call sequence.
 * @param numPlayers Number of active players. Default 4 (V1). Determines R1/R2 boundary.
 * @param version Bitpack version. Default 1. V2 decodes aloneDefender after isAlone.
 */
function decodeBiddingPhase(
  reader: BitReader,
  upCard: string,
  startActionIndex = 0,
  numPlayers = 4,
  version = 1,
): BiddingPhase {
  const calls: Call[] = [];
  let orderedUp = false;

  if (startActionIndex < numPlayers) {
    for (let i = startActionIndex; i < numPlayers; i++) {
      const bit = reader.readBits(1);
      if (bit === "0") {
        calls.push("Pass");
      } else {
        calls.push("Order");
        orderedUp = true;
        break;
      }
    }
  }

  if (!orderedUp) {
    const remainingSuits = SUITS.filter((suit) => suit !== upCard[1].toLowerCase());
    const round2Start = Math.max(0, startActionIndex - numPlayers);
    for (let i = round2Start; i < numPlayers; i++) {
      const val = reader.readInteger(3);
      if (val === 0) {
        calls.push("Pass");
      } else {
        calls.push(remainingSuits[val - 1] as Call);
        orderedUp = true;
        break;
      }
    }
  }

  const isAlone = reader.readBoolean();

  // V2 only: decode aloneDefender (gated on isAlone=true)
  let aloneDefender: number | undefined = undefined;
  if (version >= 2 && isAlone) {
    const hasDefendAlone = reader.readBoolean();
    if (hasDefendAlone) {
      aloneDefender = reader.readInteger(7); // 3 bits
    }
  }

  const callAnnotations = decodeAnnotations(reader);

  const phase: BiddingPhase = {
    phaseNumber: 0,
    type: "EUCHRE_BIDDING",
    calls,
    isAlone,
  };
  if (aloneDefender !== undefined) {
    phase.aloneDefender = aloneDefender;
  }
  if (callAnnotations) {
    phase.callAnnotations = callAnnotations;
  }
  return phase;
}

/**
 * Encodes a TRICK_PLAY phase.
 * Card index encoding adapts automatically to any deck size via cardsRemaining.
 */
function encodePlayPhase(play: TrickPlayPhase, cardsRemaining: string[]): string {
  let bits = "";
  bits += encodeInteger(play.tricks.length, 7);
  play.tricks.forEach((trick) => {
    trick.forEach((card) => {
      bits += encodeCard(card, cardsRemaining);
      const idx = cardsRemaining.indexOf(card);
      if (idx !== -1) {
        cardsRemaining.splice(idx, 1);
      }
    });
  });
  bits += encodeAnnotations(play.playAnnotations);
  return bits;
}

/**
 * Computes the number of cards played per trick.
 * - Normal:              `numPlayers`
 * - Maker alone:         `numPlayers - 1` (maker's partner sits out)
 * - Maker + defender alone: `numPlayers - 2` (both partners sit out)
 */
function computeCardsPerTrick(numPlayers: number, isAlone: boolean, hasDefendAlone: boolean): number {
  if (!isAlone) return numPlayers;
  return hasDefendAlone ? numPlayers - 2 : numPlayers - 1;
}

/**
 * Decodes a TRICK_PLAY phase from the bit reader.
 * @param reader The bit reader at the correct position.
 * @param isAlone Whether the maker called a loner.
 * @param cardsRemaining The current remaining-cards pool.
 * @param numPlayers Number of active players. Default 4.
 * @param firstTrickCards Override cards-per-trick for the first trick (alt-line partial trick support).
 * @param hasDefendAlone Whether a defender is also going alone (V2 only). Default false.
 *   When true, cardsPerTrick = numPlayers - 2 instead of numPlayers - 1.
 */
function decodePlayPhase(
  reader: BitReader,
  isAlone: boolean,
  cardsRemaining: string[],
  numPlayers = 4,
  firstTrickCards?: number,
  hasDefendAlone = false,
): TrickPlayPhase {
  const numTricks = reader.readInteger(7);
  const tricks: string[][] = [];
  const cardsPerTrick = computeCardsPerTrick(numPlayers, isAlone, hasDefendAlone);

  for (let t = 0; t < numTricks; t++) {
    const trick: string[] = [];
    const limit = (t === 0 && firstTrickCards !== undefined) ? firstTrickCards : cardsPerTrick;
    for (let c = 0; c < limit; c++) {
      const maxVal = cardsRemaining.length - 1;
      if (maxVal < 0) break;
      const cardIndex = reader.readInteger(maxVal);
      const card = cardsRemaining[cardIndex];
      cardsRemaining.splice(cardIndex, 1);
      trick.push(card);
    }
    tricks.push(trick);
  }

  const playAnnotations = decodeAnnotations(reader);

  const phase: TrickPlayPhase = {
    phaseNumber: 1,
    type: "TRICK_PLAY",
    tricks,
  };
  if (playAnnotations) {
    phase.playAnnotations = playAnnotations;
  }
  return phase;
}

/**
 * Returns a copy of the cards remaining after all actions up to (but not including) branchIndex.
 * @param deal The main deal.
 * @param branchIndex The action index at which the branch diverges.
 * @param deck The starting deck for this deal. Defaults to the standard 24-card deck.
 */
function getCardsRemainingAtActionIndex(
  deal: Deal,
  branchIndex: number,
  deck: string[] = STANDARD_DECK,
): string[] {
  const cardsRemaining = [...deck];
  let actionCount = 0;

  for (const phase of deal.phases) {
    if (phase.type === "EUCHRE_BIDDING") {
      const bidding = phase as BiddingPhase;
      const numCalls = bidding.calls.length;
      if (actionCount + numCalls <= branchIndex) {
        actionCount += numCalls;
      } else {
        actionCount = branchIndex;
        break;
      }
    } else if (phase.type === "TRICK_PLAY") {
      const play = phase as TrickPlayPhase;
      for (const trick of play.tricks) {
        for (const card of trick) {
          if (actionCount < branchIndex) {
            const idx = cardsRemaining.indexOf(card);
            if (idx !== -1) {
              cardsRemaining.splice(idx, 1);
            }
            actionCount++;
          } else {
            break;
          }
        }
        if (actionCount >= branchIndex) {
          break;
        }
      }
    }
    if (actionCount >= branchIndex) {
      break;
    }
  }

  return cardsRemaining;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Encodes/bitpacks an EgnDeal object to a Base64URL string.
 *
 * @param deal The Deal object to encode.
 * @param options Encoding options. Defaults to Version 1 (4-player, standard 24-card deck).
 * @returns The Base64URL representation.
 *
 * ### Version 1 (default)
 * Standard 4-player, 24-card (9s and up) encoding. Compact and widely supported.
 * Header: `[0001][dealer:2bits][upCard:5bits]...`
 *
 * ### Version 2
 * Extended encoding supporting variable player counts (4–11), alternate deck sizes
 * (min_rank 9/8/7/6), and defend-alone.
 * Header: `[0010][dealer:3bits][numPlayers-4:3bits][minRankCode:2bits][upCard:Nbits]...`
 */
export function packDeal(deal: Deal, options?: PackOptions): string {
  const version = options?.version ?? 1;
  const binaryString = version === 2 ? packDealV2(deal, options) : packDealV1(deal);

  if (options?.asBinary) {
    return binaryString;
  }
  return binaryStringToBase64Url(binaryString);
}

function packDealV1(deal: Deal): string {
  let binaryString = "0001"; // Version 1 header (4 bits)
  binaryString += encodeInteger(deal.initialState.dealer, 3); // 2 bits (dealer 0–3)

  const cardsRemaining = [...STANDARD_DECK];
  binaryString += encodeCard(deal.initialState.upCard, cardsRemaining);

  binaryString += encodeInteger(deal.phases.length, 7); // 3 bits
  let isAlone = false;
  deal.phases.forEach((phase) => {
    if (phase.type === "EUCHRE_BIDDING") {
      binaryString += "0"; // Phase type flag
      binaryString += encodeBiddingPhase(phase as BiddingPhase, deal.initialState.upCard, 0, 4, 1);
      isAlone = (phase as BiddingPhase).isAlone ?? false;
    } else if (phase.type === "TRICK_PLAY") {
      binaryString += "1";
      binaryString += encodePlayPhase(phase as TrickPlayPhase, cardsRemaining);
    }
  });

  if (deal.alternativeLines && deal.alternativeLines.length > 0) {
    binaryString += "1";
    binaryString += encodeInteger(deal.alternativeLines.length, 255);
    deal.alternativeLines.forEach((altLine) => {
      binaryString += encodeInteger(altLine.branchIndex, 65535);
      const altCardsRemaining = getCardsRemainingAtActionIndex(deal, altLine.branchIndex, STANDARD_DECK);
      binaryString += encodeInteger(altLine.phases.length, 15);
      let altIsAlone = isAlone;
      altLine.phases.forEach((phase) => {
        if (phase.type === "EUCHRE_BIDDING") {
          binaryString += "0";
          binaryString += encodeBiddingPhase(phase as BiddingPhase, deal.initialState.upCard, altLine.branchIndex, 4, 1);
          altIsAlone = (phase as BiddingPhase).isAlone ?? false;
        } else if (phase.type === "TRICK_PLAY") {
          binaryString += "1";
          binaryString += encodePlayPhase(phase as TrickPlayPhase, altCardsRemaining);
        }
      });
    });
  } else {
    binaryString += "0";
  }

  binaryString += "1010"; // End marker
  return binaryString;
}

function packDealV2(deal: Deal, options?: PackOptions): string {
  const numPlayers = options?.numPlayers ?? 4;
  const minRank = options?.minRank ?? 9;
  const minRankCode = MIN_RANK_TO_CODE[minRank] ?? 0;
  const deck = buildDeck(minRank);

  let binaryString = "0010"; // Version 2 header (4 bits)
  binaryString += encodeInteger(deal.initialState.dealer, 7); // 3 bits (dealer 0–7)
  binaryString += encodeInteger(numPlayers - 1, 7);            // 3 bits (0=1p … 7=8p)
  binaryString += encodeInteger(minRankCode, 3);               // 2 bits (deck variant)

  const cardsRemaining = [...deck];
  binaryString += encodeCard(deal.initialState.upCard, cardsRemaining);

  binaryString += encodeInteger(deal.phases.length, 7); // 3 bits
  let isAlone = false;
  deal.phases.forEach((phase) => {
    if (phase.type === "EUCHRE_BIDDING") {
      binaryString += "0";
      binaryString += encodeBiddingPhase(phase as BiddingPhase, deal.initialState.upCard, 0, numPlayers, 2);
      isAlone = (phase as BiddingPhase).isAlone ?? false;
    } else if (phase.type === "TRICK_PLAY") {
      binaryString += "1";
      binaryString += encodePlayPhase(phase as TrickPlayPhase, cardsRemaining);
    }
  });

  if (deal.alternativeLines && deal.alternativeLines.length > 0) {
    binaryString += "1";
    binaryString += encodeInteger(deal.alternativeLines.length, 255);
    deal.alternativeLines.forEach((altLine) => {
      binaryString += encodeInteger(altLine.branchIndex, 65535);
      const altCardsRemaining = getCardsRemainingAtActionIndex(deal, altLine.branchIndex, deck);
      binaryString += encodeInteger(altLine.phases.length, 15);
      let altIsAlone = isAlone;
      altLine.phases.forEach((phase) => {
        if (phase.type === "EUCHRE_BIDDING") {
          binaryString += "0";
          binaryString += encodeBiddingPhase(phase as BiddingPhase, deal.initialState.upCard, altLine.branchIndex, numPlayers, 2);
          altIsAlone = (phase as BiddingPhase).isAlone ?? false;
        } else if (phase.type === "TRICK_PLAY") {
          binaryString += "1";
          binaryString += encodePlayPhase(phase as TrickPlayPhase, altCardsRemaining);
        }
      });
    });
  } else {
    binaryString += "0";
  }

  binaryString += "1010"; // End marker
  return binaryString;
}

/**
 * Decodes a representation back into an EgnDeal object.
 * Automatically detects and handles Version 0 (legacy), Version 1, and Version 2 formats.
 *
 * @param input The Base64URL string or binary string representation.
 * @param dealNumber Optional dealNumber to set in the returned Deal object. Defaults to 0.
 * @param isBinary Optional flag to indicate input is already a binary string. Defaults to false.
 * @returns The reconstructed Deal object.
 */
export function unpackDeal(input: string, dealNumber: number = 0, isBinary: boolean = false): Deal {
  const binaryString = isBinary ? input : base64UrlToBinaryString(input);
  const reader = new BitReader(binaryString);
  const headerBits = binaryString.slice(0, 4);

  if (reader.remainingBits() >= 4 && headerBits === "0010") {
    try {
      return unpackDealV2(reader, binaryString, dealNumber);
    } catch (e) {
      // Coincidental collision: V0 deal started with "0010" but failed to decode as V2. Fall back to V0.
      return unpackDealV0(binaryString, dealNumber);
    }
  }

  if (reader.remainingBits() >= 4 && headerBits === "0001") {
    try {
      return unpackDealV1(reader, binaryString, dealNumber);
    } catch (e) {
      // Coincidental collision: V0 deal started with "0001" but failed to decode as V1. Fall back to V0.
      return unpackDealV0(binaryString, dealNumber);
    }
  }

  // Fall back to legacy Version 0
  return unpackDealV0(binaryString, dealNumber);
}

function unpackDealV2(reader: BitReader, binaryString: string, dealNumber: number): Deal {
  reader.readBits(4); // Consume V2 header

  const dealer = reader.readInteger(7);             // 3 bits
  const numPlayersOffset = reader.readInteger(7);   // 3 bits
  const numPlayers = numPlayersOffset + 1;
  const minRankCode = reader.readInteger(3);        // 2 bits
  const minRank = CODE_TO_MIN_RANK[minRankCode] ?? 9;
  const deck = buildDeck(minRank);

  const cardsRemaining = [...deck];
  const upCardIndex = reader.readInteger(cardsRemaining.length - 1);
  const upCard = cardsRemaining[upCardIndex];

  const deal: Deal = {
    dealNumber,
    initialState: { dealer, upCard },
    phases: [],
  };

  const numPhases = reader.readInteger(7);
  let isAlone = false;
  let hasDefendAlone = false;
  for (let p = 0; p < numPhases; p++) {
    const phaseType = reader.readBits(1);
    if (phaseType === "0") {
      const biddingPhase = decodeBiddingPhase(reader, upCard, 0, numPlayers, 2);
      biddingPhase.phaseNumber = p;
      isAlone = biddingPhase.isAlone ?? false;
      hasDefendAlone = biddingPhase.aloneDefender !== undefined && biddingPhase.aloneDefender >= 0;
      deal.phases.push(biddingPhase);
    } else {
      const playPhase = decodePlayPhase(reader, isAlone, cardsRemaining, numPlayers, undefined, hasDefendAlone);
      playPhase.phaseNumber = p;
      deal.phases.push(playPhase);
    }
  }

  const hasAltLines = reader.readBoolean();
  if (hasAltLines) {
    const numAltLines = reader.readInteger(255);
    const alternativeLines: AlternativeLine[] = [];

    for (let a = 0; a < numAltLines; a++) {
      const branchIndex = reader.readInteger(65535);
      const altCardsRemaining = getCardsRemainingAtActionIndex(deal, branchIndex, deck);
      const numAltPhases = reader.readInteger(15);
      const phases: Phase[] = [];
      let altIsAlone = isAlone;
      let altHasDefendAlone = hasDefendAlone;

      for (let p = 0; p < numAltPhases; p++) {
        const phaseType = reader.readBits(1);
        if (phaseType === "0") {
          const biddingPhase = decodeBiddingPhase(reader, upCard, branchIndex, numPlayers, 2);
          biddingPhase.phaseNumber = p;
          altIsAlone = biddingPhase.isAlone ?? false;
          altHasDefendAlone = biddingPhase.aloneDefender !== undefined && biddingPhase.aloneDefender >= 0;
          phases.push(biddingPhase);
        } else {
          let firstTrickCards = undefined;
          if (p === 0) {
            const mainBiddingPhase = deal.phases.find((ph) => ph.type === "EUCHRE_BIDDING") as BiddingPhase | undefined;
            const biddingDecisionsCount = mainBiddingPhase ? mainBiddingPhase.calls.length : 0;
            const branchPlayIndex = branchIndex - biddingDecisionsCount;
            if (branchPlayIndex > 0) {
              const cardsPerTrick = computeCardsPerTrick(numPlayers, altIsAlone, altHasDefendAlone);
              const cardsAlreadyPlayed = branchPlayIndex % cardsPerTrick;
              if (cardsAlreadyPlayed > 0) {
                firstTrickCards = cardsPerTrick - cardsAlreadyPlayed;
              }
            }
          }
          const playPhase = decodePlayPhase(reader, altIsAlone, altCardsRemaining, numPlayers, firstTrickCards, altHasDefendAlone);
          playPhase.phaseNumber = p;
          phases.push(playPhase);
        }
      }

      alternativeLines.push({ branchIndex, phases });
    }

    deal.alternativeLines = alternativeLines;
  }

  const endMarker = reader.readBits(4);
  if (endMarker !== "1010") {
    throw new Error("Invalid end marker. Bitpack data may be corrupted.");
  }

  return deal;
}

function unpackDealV1(reader: BitReader, binaryString: string, dealNumber: number): Deal {
  reader.readBits(4); // Consume V1 header
  const dealer = reader.readInteger(3); // 2 bits (dealer 0–3)

  const cardsRemaining = [...STANDARD_DECK];
  const upCardIndex = reader.readInteger(cardsRemaining.length - 1);
  const upCard = cardsRemaining[upCardIndex];

  const deal: Deal = {
    dealNumber,
    initialState: { dealer, upCard },
    phases: [],
  };

  const numPhases = reader.readInteger(7); // 3 bits
  let isAlone = false;
  for (let p = 0; p < numPhases; p++) {
    const phaseType = reader.readBits(1);
    if (phaseType === "0") {
      const biddingPhase = decodeBiddingPhase(reader, upCard, 0, 4, 1);
      biddingPhase.phaseNumber = p;
      isAlone = biddingPhase.isAlone ?? false;
      deal.phases.push(biddingPhase);
    } else {
      const playPhase = decodePlayPhase(reader, isAlone, cardsRemaining, 4);
      playPhase.phaseNumber = p;
      deal.phases.push(playPhase);
    }
  }

  const hasAltLines = reader.readBoolean();
  if (hasAltLines) {
    const numAltLines = reader.readInteger(255);
    const alternativeLines: AlternativeLine[] = [];

    for (let a = 0; a < numAltLines; a++) {
      const branchIndex = reader.readInteger(65535);
      const altCardsRemaining = getCardsRemainingAtActionIndex(deal, branchIndex, STANDARD_DECK);
      const numAltPhases = reader.readInteger(15);
      const phases: Phase[] = [];
      let altIsAlone = isAlone;

      for (let p = 0; p < numAltPhases; p++) {
        const phaseType = reader.readBits(1);
        if (phaseType === "0") {
          const biddingPhase = decodeBiddingPhase(reader, upCard, branchIndex, 4, 1);
          biddingPhase.phaseNumber = p;
          altIsAlone = biddingPhase.isAlone ?? false;
          phases.push(biddingPhase);
        } else {
          let firstTrickCards = undefined;
          if (p === 0) {
            const mainBiddingPhase = deal.phases.find((ph) => ph.type === "EUCHRE_BIDDING") as BiddingPhase | undefined;
            const biddingDecisionsCount = mainBiddingPhase ? mainBiddingPhase.calls.length : 0;
            const branchPlayIndex = branchIndex - biddingDecisionsCount;
            if (branchPlayIndex > 0) {
              const cardsPerTrick = altIsAlone ? 3 : 4;
              const cardsAlreadyPlayed = branchPlayIndex % cardsPerTrick;
              if (cardsAlreadyPlayed > 0) {
                firstTrickCards = cardsPerTrick - cardsAlreadyPlayed;
              }
            }
          }
          const playPhase = decodePlayPhase(reader, altIsAlone, altCardsRemaining, 4, firstTrickCards);
          playPhase.phaseNumber = p;
          phases.push(playPhase);
        }
      }

      alternativeLines.push({ branchIndex, phases });
    }

    deal.alternativeLines = alternativeLines;
  }

  const endMarker = reader.readBits(4);
  if (endMarker !== "1010") {
    throw new Error("Invalid end marker. Bitpack data may be corrupted.");
  }

  return deal;
}

function unpackDealV0(binaryString: string, dealNumber: number): Deal {
  // Legacy Version 0 — no version header, no annotations, no alternative lines
  const reader = new BitReader(binaryString);
  const legacyDealer = reader.readInteger(3);
  let cardsRemaining = [...STANDARD_DECK];

  const upCardIndex = reader.readInteger(cardsRemaining.length - 1);
  const upCard = cardsRemaining[upCardIndex];

  const deal: Deal = {
    dealNumber,
    initialState: { dealer: legacyDealer, upCard },
    phases: [],
  };

  if (!reader.hasMoreBits() || (reader.remainingBits() < 8 && reader.peekRemaining().indexOf("1") === -1)) {
    return deal;
  }

  const calls: Call[] = [];
  let orderedUp = false;

  for (let i = 0; i < 4; i++) {
    const bit = reader.readBits(1);
    if (bit === "0") {
      calls.push("Pass");
    } else {
      calls.push("Order");
      orderedUp = true;
      break;
    }
  }

  if (!orderedUp) {
    const remainingSuits = SUITS.filter((suit) => suit !== upCard[1].toLowerCase());
    for (let i = 0; i < 4; i++) {
      const val = reader.readInteger(3);
      if (val === 0) {
        calls.push("Pass");
      } else {
        calls.push(remainingSuits[val - 1] as Call);
        orderedUp = true;
        break;
      }
    }
  }

  const isAlone = reader.readBoolean();

  deal.phases.push({
    phaseNumber: 0,
    type: "EUCHRE_BIDDING",
    calls,
    isAlone,
  });

  if (!reader.hasMoreBits() || (reader.remainingBits() < 8 && reader.peekRemaining().indexOf("1") === -1)) {
    deal.phases[0].phaseNumber = 0;
    return deal;
  }

  const tricks: string[][] = [];
  let currentTrick: string[] = [];
  const cardsPerTrick = isAlone ? 3 : 4;

  while (reader.hasMoreBits()) {
    const maxVal = cardsRemaining.length - 1;
    if (maxVal < 0) break;
    const bitLen = maxVal.toString(2).length;

    if (reader.remainingBits() < bitLen) {
      break;
    }

    if (currentTrick.length === 0 && reader.remainingBits() < 8 && reader.peekRemaining().indexOf("1") === -1) {
      break;
    }

    const cardIndex = reader.readInteger(maxVal);
    const card = cardsRemaining[cardIndex];
    cardsRemaining = cardsRemaining.filter((c) => c !== card);
    currentTrick.push(card);

    if (currentTrick.length === cardsPerTrick) {
      tricks.push(currentTrick);
      currentTrick = [];
    }
  }

  if (currentTrick.length > 0) {
    tricks.push(currentTrick);
  }

  deal.phases[0].phaseNumber = 0;
  deal.phases.push({
    phaseNumber: 1,
    type: "TRICK_PLAY",
    tricks,
  });

  return deal;
}
