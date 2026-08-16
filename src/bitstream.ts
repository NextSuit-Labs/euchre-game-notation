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

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(base64, "base64"));
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function encodeInteger(value: number, maxValue: number): string {
  const bitLen = maxValue.toString(2).length;
  return value.toString(2).padStart(bitLen, "0");
}

export function encodeBoolean(value: boolean): string {
  return value ? "1" : "0";
}

export function binaryStringToBase64Url(binaryStr: string): string {
  if (!binaryStr) return "";
  const paddedStr = binaryStr.padEnd(Math.ceil(binaryStr.length / 8) * 8, "0");
  const byteCount = paddedStr.length / 8;
  const bytes = new Uint8Array(byteCount);
  for (let i = 0; i < byteCount; i++) {
    bytes[i] = parseInt(paddedStr.slice(i * 8, (i + 1) * 8), 2);
  }
  const base64 = bytesToBase64(bytes);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlToBinaryString(base64Url: string): string {
  if (!base64Url) return "";
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = base64.length % 4;
  if (padding > 0) {
    base64 += "=".repeat(4 - padding);
  }
  const bytes = base64ToBytes(base64);
  let result = "";
  for (let i = 0; i < bytes.length; i++) {
    result += bytes[i].toString(2).padStart(8, "0");
  }
  return result;
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
    const val = parseInt(bits, 2);
    if (val > maxValue) {
      throw new Error(`Read integer value ${val} exceeds maximum allowed value ${maxValue}.`);
    }
    return val;
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
  const bytes = textEncoder.encode(str);
  let bitStr = encodeInteger(bytes.length, 65535); // 16 bits
  for (let i = 0; i < bytes.length; i++) {
    bitStr += bytes[i].toString(2).padStart(8, "0");
  }
  return bitStr;
}

export function decodeString(reader: BitReader): string {
  const length = reader.readInteger(65535);
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    const byteBits = reader.readBits(8);
    bytes[i] = parseInt(byteBits, 2);
  }
  return textDecoder.decode(bytes);
}
