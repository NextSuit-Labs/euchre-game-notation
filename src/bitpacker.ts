import { Deal, BiddingPhase, TrickPlayPhase, Call, AlternativeLine, Phase } from "./types";

const SUITS = ["s", "h", "c", "d"];
const RANKS = ["9", "T", "J", "Q", "K", "A"];
const ALL_CARDS = RANKS.flatMap((rank) => SUITS.map((suit) => rank + suit));

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
  constructor(private binaryStr: string) {}

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

function encodeBiddingPhase(bidding: BiddingPhase, upCard: string, startActionIndex = 0): string {
  let bits = "";
  bidding.calls.forEach((call, callIndex) => {
    const actualIndex = startActionIndex + callIndex;
    if (actualIndex < 4) {
      bits += encodeR1Call(call);
    } else {
      const remainingSuits = SUITS.filter(
        (suit) => suit !== upCard[1].toLowerCase()
      );
      bits += encodeR2Call(call, remainingSuits);
    }
  });
  bits += encodeBoolean(bidding.isAlone ?? false);
  bits += encodeAnnotations(bidding.calls_annotations);
  return bits;
}

function decodeBiddingPhase(reader: BitReader, upCard: string, startActionIndex = 0): BiddingPhase {
  const calls: Call[] = [];
  let orderedUp = false;

  if (startActionIndex < 4) {
    for (let i = startActionIndex; i < 4; i++) {
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
    const round2Start = Math.max(0, startActionIndex - 4);
    for (let i = round2Start; i < 4; i++) {
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
  const calls_annotations = decodeAnnotations(reader);

  const phase: BiddingPhase = {
    phaseNumber: 0,
    type: "EUCHRE_BIDDING",
    calls,
    isAlone,
  };
  if (calls_annotations) {
    phase.calls_annotations = calls_annotations;
  }
  return phase;
}

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
  bits += encodeAnnotations(play.tricks_annotations);
  return bits;
}

function decodePlayPhase(reader: BitReader, isAlone: boolean, cardsRemaining: string[], firstTrickCards?: number): TrickPlayPhase {
  const numTricks = reader.readInteger(7);
  const tricks: string[][] = [];
  const cardsPerTrick = isAlone ? 3 : 4;

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

  const tricks_annotations = decodeAnnotations(reader);

  const phase: TrickPlayPhase = {
    phaseNumber: 1,
    type: "TRICK_PLAY",
    tricks,
  };
  if (tricks_annotations) {
    phase.tricks_annotations = tricks_annotations;
  }
  return phase;
}

function getCardsRemainingAtActionIndex(deal: Deal, branchIndex: number): string[] {
  const cardsRemaining = [...ALL_CARDS];
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

/**
 * Encodes/bitpacks an EgnDeal object to a Base64URL string in Version 1.
 * @param deal The Deal object to encode.
 * @returns The Base64URL representation.
 */
export function packDeal(deal: Deal): string {
  let binaryString = "0001"; // Version 1 header (4 bits)
  binaryString += encodeInteger(deal.initialState.dealer, 3);

  const cardsRemaining = [...ALL_CARDS];
  binaryString += encodeCard(deal.initialState.upCard, cardsRemaining);

  // 1. Encode main phases
  binaryString += encodeInteger(deal.phases.length, 7); // 3 bits
  let isAlone = false;
  deal.phases.forEach((phase) => {
    if (phase.type === "EUCHRE_BIDDING") {
      binaryString += "0"; // Phase type 0
      binaryString += encodeBiddingPhase(phase as BiddingPhase, deal.initialState.upCard);
      isAlone = (phase as BiddingPhase).isAlone;
    } else if (phase.type === "TRICK_PLAY") {
      binaryString += "1"; // Phase type 1
      binaryString += encodePlayPhase(phase as TrickPlayPhase, cardsRemaining);
    }
  });

  // 2. Encode alternative lines
  if (deal.alternativeLines && deal.alternativeLines.length > 0) {
    binaryString += "1"; // Has alternative lines flag
    binaryString += encodeInteger(deal.alternativeLines.length, 255); // 8 bits
    deal.alternativeLines.forEach((altLine) => {
      binaryString += encodeInteger(altLine.branchIndex, 65535); // 16 bits

      // Simulate cardsRemaining up to branchIndex
      const altCardsRemaining = getCardsRemainingAtActionIndex(deal, altLine.branchIndex);

      // Encode alternative phases
      binaryString += encodeInteger(altLine.phases.length, 15); // 4 bits
      let altIsAlone = isAlone;
      altLine.phases.forEach((phase) => {
        if (phase.type === "EUCHRE_BIDDING") {
          binaryString += "0";
          binaryString += encodeBiddingPhase(phase as BiddingPhase, deal.initialState.upCard, altLine.branchIndex);
          altIsAlone = (phase as BiddingPhase).isAlone;
        } else if (phase.type === "TRICK_PLAY") {
          binaryString += "1";
          binaryString += encodePlayPhase(phase as TrickPlayPhase, altCardsRemaining);
        }
      });
    });
  } else {
    binaryString += "0"; // No alternative lines
  }

  // Explicit ending marker
  binaryString += "1010";

  return binaryStringToBase64Url(binaryString);
}

/**
 * Decodes a Base64URL representation back into an EgnDeal object.
 * Supports both Version 0 (legacy) and Version 1 format.
 * @param base64Url The Base64URL representation.
 * @param dealNumber Optional dealNumber to set in the returned Deal object. Defaults to 0.
 * @returns The reconstructed Deal object.
 */
export function unpackDeal(base64Url: string, dealNumber: number = 0): Deal {
  const binaryString = base64UrlToBinaryString(base64Url);
  let reader = new BitReader(binaryString);

  let isV1 = false;
  let dealer = 0;
  if (reader.remainingBits() >= 4 && binaryString.slice(0, 4) === "0001") {
    isV1 = true;
    reader.readBits(4); // Consume Version 1 header
    dealer = reader.readInteger(3);
  }

  if (!isV1) {
    // Fall back to legacy Version 0 parsing logic
    reader = new BitReader(binaryString);
    const legacyDealer = reader.readInteger(3);
    let cardsRemaining = [...ALL_CARDS];

    const upCardIndex = reader.readInteger(cardsRemaining.length - 1);
    const upCard = cardsRemaining[upCardIndex];

    const deal: Deal = {
      dealNumber,
      initialState: {
        dealer: legacyDealer,
        upCard,
      },
      phases: [],
    };

    if (!reader.hasMoreBits() || (reader.remainingBits() < 8 && reader.peekRemaining().indexOf("1") === -1)) {
      return deal;
    }

    // Decode bidding phase
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

    // Decode play phase
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

  // Version 1 parsing logic
  let cardsRemaining = [...ALL_CARDS];
  const upCardIndex = reader.readInteger(cardsRemaining.length - 1);
  const upCard = cardsRemaining[upCardIndex];

  const deal: Deal = {
    dealNumber,
    initialState: {
      dealer,
      upCard,
    },
    phases: [],
  };

  const numPhases = reader.readInteger(7); // 3 bits
  let isAlone = false;
  for (let p = 0; p < numPhases; p++) {
    const phaseType = reader.readBits(1);
    if (phaseType === "0") {
      const biddingPhase = decodeBiddingPhase(reader, upCard);
      biddingPhase.phaseNumber = p;
      isAlone = biddingPhase.isAlone;
      deal.phases.push(biddingPhase);
    } else {
      const playPhase = decodePlayPhase(reader, isAlone, cardsRemaining);
      playPhase.phaseNumber = p;
      deal.phases.push(playPhase);
    }
  }

  // Decode alternative lines
  const hasAltLines = reader.readBoolean();
  if (hasAltLines) {
    const numAltLines = reader.readInteger(255);
    const alternativeLines: AlternativeLine[] = [];

    for (let a = 0; a < numAltLines; a++) {
      const branchIndex = reader.readInteger(65535);

      // Simulate cardsRemaining up to branchIndex
      const altCardsRemaining = getCardsRemainingAtActionIndex(deal, branchIndex);

      const numPhases = reader.readInteger(15);
      const phases: Phase[] = [];
      let altIsAlone = isAlone;

      for (let p = 0; p < numPhases; p++) {
        const phaseType = reader.readBits(1);
        if (phaseType === "0") {
          const biddingPhase = decodeBiddingPhase(reader, upCard, branchIndex);
          biddingPhase.phaseNumber = p;
          altIsAlone = biddingPhase.isAlone;
          phases.push(biddingPhase);
        } else {
          let firstTrickCards = undefined;
          if (p === 0) {
            const mainBiddingPhase = deal.phases.find((phase) => phase.type === "EUCHRE_BIDDING") as BiddingPhase | undefined;
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
          const playPhase = decodePlayPhase(reader, altIsAlone, altCardsRemaining, firstTrickCards);
          playPhase.phaseNumber = p;
          phases.push(playPhase);
        }
      }

      alternativeLines.push({
        branchIndex,
        phases,
      });
    }

    deal.alternativeLines = alternativeLines;
  }

  // Explicit ending code assertion
  const endMarker = reader.readBits(4);
  if (endMarker !== "1010") {
    throw new Error("Invalid end marker. Bitpack data may be corrupted.");
  }

  return deal;
}
