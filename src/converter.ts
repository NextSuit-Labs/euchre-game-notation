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
import protobuf from "protobufjs";
import { packDeal, unpackDeal } from "./bitpacker";
import { COMMON_PROTO_SCHEMA, CONDENSED_PROTO_SCHEMA, EXPANDED_PROTO_SCHEMA } from "./proto-schemas";
import { EgnFile } from "./types";
import { validateEgn } from "./validator";

// Magic bytes to identify binary format
const MAGIC_BYTE_EXPANDED = 0x00;
const MAGIC_BYTE_CONDENSED = 0x01;
const MAX_BINARY_DATA_BYTES = 8 * 1024 * 1024;

let loadedCondensedRoot: protobuf.Root | null = null;
let loadedExpandedRoot: protobuf.Root | null = null;

function buildProtobufRoot(schema: string): protobuf.Root {
  const root = new protobuf.Root();
  protobuf.parse(COMMON_PROTO_SCHEMA, root, { keepCase: true });
  protobuf.parse(schema, root, { keepCase: true });
  return root;
}

function getProtobufRoot(condensed: boolean): protobuf.Root {
  if (condensed) {
    if (!loadedCondensedRoot) {
      loadedCondensedRoot = buildProtobufRoot(CONDENSED_PROTO_SCHEMA);
    }
    return loadedCondensedRoot;
  } else {
    if (!loadedExpandedRoot) {
      loadedExpandedRoot = buildProtobufRoot(EXPANDED_PROTO_SCHEMA);
    }
    return loadedExpandedRoot;
  }
}

function getLonerLeadEnum(condensed: boolean): protobuf.Enum {
  const root = getProtobufRoot(condensed);
  return root.lookupEnum("egn.Ruleset.LonerLead");
}

function createSafeMap<T>(): Record<string, T> {
  return Object.create(null) as Record<string, T>;
}

function assertAnnotationIndexKey(key: string): void {
  if (!/^\d+$/.test(key)) {
    throw new Error(`Invalid annotation map key: ${key}. Annotation keys must be numeric.`);
  }
}

function formatValidationErrors(errors: ReturnType<typeof validateEgn>["errors"]): string {
  if (!errors || errors.length === 0) {
    return "Unknown validation error";
  }

  return errors
    .map((error) => `${error.instancePath || "/"} ${error.message || "is invalid"}`.trim())
    .join("; ");
}

function assertValidEgnFile(egnFile: unknown, context: string): asserts egnFile is EgnFile {
  const validation = validateEgn(egnFile);
  if (!validation.isValid) {
    throw new Error(`${context}: ${formatValidationErrors(validation.errors)}`);
  }
}

function assertBinaryDataSize(binData: Uint8Array, context: string): void {
  if (binData.length > MAX_BINARY_DATA_BYTES) {
    throw new Error(`${context}: binary data exceeds ${MAX_BINARY_DATA_BYTES} bytes`);
  }
}

function assertNumericAnnotationKeys(value: unknown): void {
  if (!value || typeof value !== "object") {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      assertNumericAnnotationKeys(item);
    }
    return;
  }

  const record = value as Record<string, unknown>;
  for (const [key, child] of Object.entries(record)) {
    if ((key === "callAnnotations" || key === "playAnnotations") && child && typeof child === "object") {
      for (const annotationKey of Object.keys(child as Record<string, unknown>)) {
        assertAnnotationIndexKey(annotationKey);
      }
    }

    assertNumericAnnotationKeys(child);
  }
}

const protoToJsonKeyMap: Record<string, string> = {
  file_type: "fileType",
  game_id: "gameId",
  initial_score: "initialScore",
  final_score: "finalScore",
  deal_number: "dealNumber",
  initial_state: "initialState",
  up_card: "upCard",
  phase_number: "phaseNumber",
  is_alone: "isAlone",
  alone_defender: "aloneDefender",
  branch_index: "branchIndex",
  alternative_lines: "alternativeLines",
};

const jsonToProtoKeyMap: Record<string, string> = {
  fileType: "file_type",
  gameId: "game_id",
  initialScore: "initial_score",
  finalScore: "final_score",
  dealNumber: "deal_number",
  initialState: "initial_state",
  upCard: "up_card",
  phaseNumber: "phase_number",
  isAlone: "is_alone",
  aloneDefender: "alone_defender",
  branchIndex: "branch_index",
  alternativeLines: "alternative_lines",
};

function mapProtoToEgn(protoObj: any): any {
  if (protoObj === null || protoObj === undefined) return protoObj;

  if (Array.isArray(protoObj)) {
    return protoObj.map(mapProtoToEgn);
  }

  if (typeof protoObj === "object") {
    const res: any = {};
    for (const key of Object.keys(protoObj)) {
      const val = protoObj[key];
      const mappedKey = protoToJsonKeyMap[key] || key;

      // Skip empty finalScore array if not present in original metadata
      if (mappedKey === "finalScore" && Array.isArray(val) && val.length === 0) {
        continue;
      }

      // Convert card lists in playerCards (from array of CardList messages to array of string arrays)
      if (key === "playerCards" && Array.isArray(val)) {
        res["playerCards"] = val.map(item => item.cards || []);
        continue;
      }

      // Convert metadata.players from protobuf oneof form into JSON schema form:
      // - string player => "Name"
      // - object player => { name, playerIds: [{ id, source }] }
      if (key === "players" && Array.isArray(val)) {
        res["players"] = val.map((player: any) => {
          if (typeof player === "string") {
            return player;
          }

          if (player && typeof player === "object" && typeof player.name === "string" && !player.player_with_id) {
            return player.name;
          }

          const nested = player?.player_with_id ?? player;
          if (!nested || typeof nested !== "object") {
            return player;
          }

          const mapped: any = { name: nested.name ?? "" };
          if (Array.isArray(nested.ids)) {
            mapped.playerIds = nested.ids.map((idObj: any) => ({
              id: idObj?.id ?? "",
              source: idObj?.source ?? "",
            }));
          }
          return mapped;
        });
        continue;
      }

      // Convert tricks (from array of Trick messages to array of string arrays)
      if (key === "tricks" && Array.isArray(val)) {
        res["tricks"] = val.map(item => item.cards || []);
        continue;
      }

      // Flatten phases (unwrap from BiddingPhase bidding / TrickPlayPhase play nested ones)
      if (key === "phases" && Array.isArray(val)) {
        res["phases"] = val.map(p => {
          if (p.bidding) {
            const biddingJson = mapProtoToEgn(p.bidding);
            biddingJson.type = "EUCHRE_BIDDING";
            return biddingJson;
          } else if (p.play) {
            const playJson = mapProtoToEgn(p.play);
            playJson.type = "TRICK_PLAY";
            return playJson;
          }
          return mapProtoToEgn(p);
        });
        continue;
      }

      // Convert AnnotationList map back to string[] arrays
      if ((key === "callAnnotations" || key === "playAnnotations") && typeof val === "object" && val !== null) {
        const mappedAnn: any = createSafeMap<string[]>();
        for (const annKey of Object.keys(val)) {
          assertAnnotationIndexKey(annKey);
          const numKey = Number(annKey);
          const valObj = val[annKey];
          const texts = valObj ? (valObj.texts || []) : [];
          mappedAnn[numKey] = texts;
        }
        res[mappedKey] = mappedAnn;
        continue;
      }

      res[mappedKey] = mapProtoToEgn(val);
    }
    return res;
  }

  return protoObj;
}

/**
 * Detects whether a binary file is in condensed or expanded format by reading the magic byte.
 * @param binFilePath Path to the binary file
 * @returns 'condensed' or 'expanded', or null if magic byte is not recognized
 */
export function detectBinaryFormatFromData(binData: Uint8Array): "condensed" | "expanded" | null {
  assertBinaryDataSize(binData, "Binary input too large for format detection");

  if (binData.length === 0) {
    return null;
  }

  const magicByte = binData[0];
  if (magicByte === MAGIC_BYTE_CONDENSED) return "condensed";
  if (magicByte === MAGIC_BYTE_EXPANDED) return "expanded";

  return null;
}

export function detectBinaryFormat(binFilePath: string): "condensed" | "expanded" | null {
  try {
    return detectBinaryFormatFromData(fs.readFileSync(binFilePath));
  } catch {
    return null;
  }
}

function mapEgnToProto(jsonObj: any, condensed: boolean): any {
  if (jsonObj === null || jsonObj === undefined) return jsonObj;

  if (Array.isArray(jsonObj)) {
    return jsonObj.map(p => mapEgnToProto(p, condensed));
  }

  if (typeof jsonObj === "object") {
    const res: any = {};
    for (const key of Object.keys(jsonObj)) {
      const val = jsonObj[key];
      const mappedKey = jsonToProtoKeyMap[key] || key;

      // Convert playerCards to CardList messages
      if (key === "loner_lead" && typeof val === "string") {
        const enumType = getLonerLeadEnum(condensed);
        res["loner_lead"] = enumType.values[val];
        continue;
      }

      // Convert metadata.players JSON schema forms into protobuf oneof form:
      // - "Name" => { name: "Name" }
      // - { name, playerIds } => { player_with_id: { name, ids } }
      if (key === "players" && Array.isArray(val)) {
        res["players"] = val.map((player: any) => {
          if (typeof player === "string") {
            return { name: player };
          }

          const ids = Array.isArray(player?.playerIds)
            ? player.playerIds.map((idObj: any) => ({
              id: idObj?.id ?? "",
              source: idObj?.source ?? "",
            }))
            : [];

          return {
            player_with_id: {
              name: player?.name ?? "",
              ids,
            },
          };
        });
        continue;
      }

      // Convert playerCards to CardList messages
      if (key === "playerCards") {
        res["playerCards"] = val.map((cards: string[]) => ({ cards }));
        continue;
      }

      // Convert tricks to Trick messages
      if (key === "tricks") {
        res["tricks"] = val.map((cards: string[]) => ({ cards }));
        continue;
      }

      // Wrap phase structures into the phase oneof field
      if (key === "phases" && Array.isArray(val)) {
        res["phases"] = val.map(p => {
          const mappedPhase = mapEgnToProto(p, condensed);
          delete mappedPhase.type; // Removed since the oneof wrapper defines the type implicitly
          if (p.type === "EUCHRE_BIDDING") {
            return { bidding: mappedPhase };
          } else if (p.type === "TRICK_PLAY") {
            return { play: mappedPhase };
          }
          return mappedPhase;
        });
        continue;
      }

      // Convert string[] annotations to AnnotationList maps
      if ((key === "callAnnotations" || key === "playAnnotations") && typeof val === "object" && val !== null) {
        const mappedAnn: any = createSafeMap<{ texts: string[] }>();
        for (const annKey of Object.keys(val)) {
          assertAnnotationIndexKey(annKey);
          const numKey = Number(annKey);
          const texts = val[annKey];
          const valObj = { texts: Array.isArray(texts) ? texts : (texts ? [texts] : []) };
          mappedAnn[numKey] = valObj;
        }
        res[mappedKey] = mappedAnn;
        continue;
      }

      res[mappedKey] = mapEgnToProto(val, condensed);
    }
    return res;
  }

  return jsonObj;
}

/**
 * Converts a binary protobuf serialized file to an EGN JSON string.
 * @param binFilePath Path to the serialized Protobuf binary file.
 * @param condensed If true (default), decodes using condensed schema and unpacks base64 strings to full Deal objects.
 *                  If false, decodes using the expanded schema.
 *                  If undefined, auto-detects from magic byte.
 * @returns The converted EGN JSON string.
 */
function resolveCondensedMode(binData: Uint8Array, condensed?: boolean): boolean {
  assertBinaryDataSize(binData, "Binary input too large for conversion");

  if (condensed === undefined) {
    if (binData.length === 0) {
      throw new Error("Binary file is empty");
    }
    const detected = detectBinaryFormatFromData(binData);
    if (detected !== null) {
      return detected === "condensed";
    } else {
      return true;
    }
  }

  return condensed;
}

function stripMagicByte(binData: Uint8Array): Uint8Array {
  if (binData.length > 1 && (binData[0] === MAGIC_BYTE_CONDENSED || binData[0] === MAGIC_BYTE_EXPANDED)) {
    return binData.slice(1);
  }
  return binData;
}

function normalizeEgnForEncoding(egnFile: EgnFile, condensed: boolean): any {
  const jsonObj = JSON.parse(JSON.stringify(egnFile));

  if (Array.isArray(jsonObj.deals)) {
    if (condensed) {
      const numPlayers = jsonObj.metadata?.ruleset?.num_players ?? 4;
      const minRank = jsonObj.metadata?.ruleset?.min_rank ?? 9;
      jsonObj.deals = jsonObj.deals.map((d: any) => {
        if (typeof d === "object") {
          const hasDefendAlone = d.phases?.some((p: any) => p.type === "EUCHRE_BIDDING" && p.aloneDefender !== undefined && p.aloneDefender !== -1);
          const hasDiscard =
            d.phases?.some((p: any) => p.type === "EUCHRE_BIDDING" && p.discard !== undefined)
            || d.alternativeLines?.some((line: any) =>
              line?.phases?.some((p: any) => p.type === "EUCHRE_BIDDING" && p.discard !== undefined));
          const hasPlayerCards =
            Array.isArray(d.initialState?.playerCards)
            && d.initialState.playerCards.some((cards: any) => Array.isArray(cards) && cards.length > 0);
          const dealer = d.initialState?.dealer ?? 0;
          const needsV3 = hasDiscard || hasPlayerCards;
          const needsV2 = numPlayers !== 4 || minRank !== 9 || hasDefendAlone || dealer >= 4;
          const version: 1 | 2 | 3 = needsV3 ? 3 : (needsV2 ? 2 : 1);
          return packDeal(d, { version, numPlayers, minRank });
        }
        return d;
      });
    } else {
      jsonObj.deals = jsonObj.deals.map((d: any, idx: number) => {
        if (typeof d === "string") {
          return unpackDeal(d, idx);
        }
        return d;
      });
    }
  }

  return jsonObj;
}

export function convertBinDataToEgnFile(binData: Uint8Array, condensed?: boolean): EgnFile {
  const resolvedCondensed = resolveCondensedMode(binData, condensed);
  const root = getProtobufRoot(resolvedCondensed);
  const EgnFileMessage = root.lookupType("egn.EgnFile");
  const protoBuffer = stripMagicByte(binData);
  const message = EgnFileMessage.decode(protoBuffer);
  const rawObj = EgnFileMessage.toObject(message, {
    arrays: true,
    longs: String,
    enums: String,
    defaults: false,
  });
  const mappedObj = mapProtoToEgn(rawObj);

  if (resolvedCondensed && Array.isArray(mappedObj.deals)) {
    mappedObj.deals = mappedObj.deals.map((dealStr: any, idx: number) => {
      if (typeof dealStr === "string") {
        return unpackDeal(dealStr, idx);
      }
      return dealStr;
    });
  }

  assertValidEgnFile(mappedObj, "Decoded binary failed EGN schema validation");
  return mappedObj;
}

export function convertBinDataToEgnJson(binData: Uint8Array, condensed?: boolean): string {
  return JSON.stringify(convertBinDataToEgnFile(binData, condensed), null, 2);
}

/**
 * Converts a binary protobuf serialized file to an EGN JSON string.
 * @param binFilePath Path to the serialized Protobuf binary file.
 * @param condensed If true (default), decodes using condensed schema and unpacks base64 strings to full Deal objects.
 *                  If false, decodes using the expanded schema.
 *                  If undefined, auto-detects from magic byte.
 * @returns The converted EGN JSON string.
 */
export function convertBinToEgnJson(binFilePath: string, condensed?: boolean): string {
  return convertBinDataToEgnJson(fs.readFileSync(binFilePath), condensed);
}

export function convertEgnFileToBinData(egnFile: EgnFile, condensed = true): Uint8Array {
  assertNumericAnnotationKeys(egnFile);
  assertValidEgnFile(egnFile, "Input EGN failed schema validation before binary conversion");

  const root = getProtobufRoot(condensed);
  const EgnFileMessage = root.lookupType("egn.EgnFile");
  const mappedObj = mapEgnToProto(normalizeEgnForEncoding(egnFile, condensed), condensed);

  const errMsg = EgnFileMessage.verify(mappedObj);
  if (errMsg) throw new Error("Protobuf verification failed: " + errMsg);

  const message = EgnFileMessage.create(mappedObj);
  const protoBuffer = EgnFileMessage.encode(message).finish();
  const finalBuffer = new Uint8Array(protoBuffer.length + 1);
  finalBuffer[0] = condensed ? MAGIC_BYTE_CONDENSED : MAGIC_BYTE_EXPANDED;
  finalBuffer.set(protoBuffer, 1);
  assertBinaryDataSize(finalBuffer, "Encoded binary output too large");
  return finalBuffer;
}

/**
 * Converts an EGN JSON string to a serialized Protobuf binary file.
 * @param egnJsonStr The EGN JSON string representation.
 * @param outBinFilePath Target path where the Protobuf binary file should be saved.
 * @param condensed If true (default), packs each Deal object to a base64 string and encodes using condensed schema.
 *                  If false, unpacks any base64 strings to full Deal objects and encodes using the expanded schema.
 */
export function convertEgnJsonToBin(egnJsonStr: string, outBinFilePath: string, condensed = true): void {
  fs.writeFileSync(outBinFilePath, convertEgnJsonToBinData(egnJsonStr, condensed));
}

export function convertEgnJsonToBinData(egnJsonStr: string, condensed = true): Uint8Array {
  return convertEgnFileToBinData(JSON.parse(egnJsonStr) as EgnFile, condensed);
}
