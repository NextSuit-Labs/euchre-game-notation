import { Deal, BiddingPhase, TrickPlayPhase, Call } from "./types";

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

/**
 * Encodes/bitpacks an EgnDeal object to a Base64URL string.
 * @param deal The Deal object to encode.
 * @returns The Base64URL representation.
 */
export function packDeal(deal: Deal): string {
  let binaryString = "";
  binaryString += encodeInteger(deal.initialState.dealer, 3);

  let cardsRemaining = [...ALL_CARDS];
  binaryString += encodeCard(deal.initialState.upCard, cardsRemaining);

  deal.phases.forEach((phase) => {
    if (phase.type === "EUCHRE_BIDDING") {
      const bidding = phase as BiddingPhase;
      bidding.calls.forEach((call, callIndex) => {
        if (callIndex < 4) {
          binaryString += encodeR1Call(call);
        } else {
          const remainingSuits = SUITS.filter(
            (suit) => suit !== deal.initialState.upCard[1].toLowerCase()
          );
          binaryString += encodeR2Call(call, remainingSuits);
        }
      });
      binaryString += encodeBoolean(bidding.isAlone ?? false);
    } else if (phase.type === "TRICK_PLAY") {
      const play = phase as TrickPlayPhase;
      play.tricks.forEach((trick) => {
        trick.forEach((card) => {
          binaryString += encodeCard(card, cardsRemaining);
          cardsRemaining = cardsRemaining.filter((c) => c !== card);
        });
      });
    }
  });

  return binaryStringToBase64Url(binaryString);
}

/**
 * Decodes a Base64URL representation back into an EgnDeal object.
 * @param base64Url The Base64URL representation.
 * @param dealNumber Optional dealNumber to set in the returned Deal object. Defaults to 0.
 * @returns The reconstructed Deal object.
 */
export function unpackDeal(base64Url: string, dealNumber: number = 0): Deal {
  const binaryString = base64UrlToBinaryString(base64Url);
  const reader = new BitReader(binaryString);

  const dealer = reader.readInteger(3);
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
    phaseNumber: 0, // In standard deal, bidding phase is phase 0 (or wait, replayer set 1 for bidding, 2 for play. Let's use 0/1 or follow replayer)
    type: "EUCHRE_BIDDING",
    calls,
    isAlone,
  });

  if (!reader.hasMoreBits() || (reader.remainingBits() < 8 && reader.peekRemaining().indexOf("1") === -1)) {
    // Replayer had bidding phaseNumber: 1, let's keep phaseNumber matching the EGN schema version
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
