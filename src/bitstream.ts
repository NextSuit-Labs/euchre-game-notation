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

/**
 * Bitstream utilities for reading and writing binary bit sequences.
 */

export function encodeInteger(value: number, maxValue: number): string {
  const bitLen = maxValue.toString(2).length;
  return value.toString(2).padStart(bitLen, "0");
}

export function encodeBoolean(value: boolean): string {
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

export class BitReader {
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

export function encodeString(str: string): string {
  const bytes = Buffer.from(str, "utf8");
  let bitStr = encodeInteger(bytes.length, 65535); // 16 bits
  for (const byte of bytes) {
    bitStr += byte.toString(2).padStart(8, "0");
  }
  return bitStr;
}

export function decodeString(reader: BitReader): string {
  const length = reader.readInteger(65535);
  const bytes: number[] = [];
  for (let i = 0; i < length; i++) {
    const byteBits = reader.readBits(8);
    bytes.push(parseInt(byteBits, 2));
  }
  return Buffer.from(bytes).toString("utf8");
}
