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

import protobuf from "protobufjs";
import { COMMON_PROTO_SCHEMA, EMN_PROTO_SCHEMA } from "../proto-schemas";
import { EmnFile } from "./types";
import { validateEmn } from "./validator";

export const MAGIC_BYTE_EMN = 0x02;
const MAX_BINARY_DATA_BYTES = 16 * 1024 * 1024;

let loadedEmnRoot: protobuf.Root | null = null;

function getEmnProtobufRoot(): protobuf.Root {
  if (!loadedEmnRoot) {
    const root = new protobuf.Root();
    protobuf.parse(COMMON_PROTO_SCHEMA, root, { keepCase: true });
    protobuf.parse(EMN_PROTO_SCHEMA, root, { keepCase: true });
    loadedEmnRoot = root;
  }
  return loadedEmnRoot;
}

function getMatchTypeEnum(): protobuf.Enum {
  const root = getEmnProtobufRoot();
  return root.lookupEnum("egn.MatchFormat.MatchType");
}

function getMatchStatusEnum(): protobuf.Enum {
  const root = getEmnProtobufRoot();
  return root.lookupEnum("egn.MatchResult.Status");
}

/**
 * Encodes an EmnFile object into Protobuf binary bytes with magic byte header 0x02.
 */
export function emnToBinary(emnFile: EmnFile): Uint8Array {
  const validation = validateEmn(emnFile);
  if (!validation.isValid) {
    throw new Error(`Invalid EMN File: ${JSON.stringify(validation.errors)}`);
  }

  const root = getEmnProtobufRoot();
  const MatchFileMsg = root.lookupType("egn.MatchFile");
  const matchTypeEnum = getMatchTypeEnum();
  const matchStatusEnum = getMatchStatusEnum();

  const formatType = emnFile.metadata.matchFormat?.type;
  const protoFormatType = formatType !== undefined ? matchTypeEnum.values[formatType] : undefined;

  const resultStatus = emnFile.metadata.result?.status;
  const protoStatus = resultStatus !== undefined ? matchStatusEnum.values[resultStatus] : undefined;

  const protoObject = {
    file_type: emnFile.fileType,
    version: emnFile.version,
    metadata: {
      match_id: emnFile.metadata.matchId,
      title: emnFile.metadata.title,
      description: emnFile.metadata.description,
      date: emnFile.metadata.date,
      players: emnFile.metadata.players.map((p) => ({
        id: p.id,
        name: p.name,
        player_ids: p.playerIds || [],
      })),
      match_format: emnFile.metadata.matchFormat
        ? {
            type: protoFormatType,
            target: emnFile.metadata.matchFormat.target,
          }
        : undefined,
      result: emnFile.metadata.result
        ? {
            status: protoStatus,
            winner: emnFile.metadata.result.winner || [],
            scores: emnFile.metadata.result.scores || {},
          }
        : undefined,
    },
    games: emnFile.games.map((g) => ({
      game_index: g.gameIndex,
      players: g.players,
      egn_json: JSON.stringify(g.gameData),
    })),
  };

  const err = MatchFileMsg.verify(protoObject);
  if (err) {
    throw new Error(`Protobuf verification failed: ${err}`);
  }

  const message = MatchFileMsg.create(protoObject);
  const buffer = MatchFileMsg.encode(message).finish();

  const binaryWithHeader = new Uint8Array(buffer.length + 1);
  binaryWithHeader[0] = MAGIC_BYTE_EMN;
  binaryWithHeader.set(buffer, 1);

  return binaryWithHeader;
}

/**
 * Decodes Protobuf binary bytes (with magic byte 0x02) into an EmnFile object.
 */
export function binaryToEmn(data: Uint8Array): EmnFile {
  if (data.length > MAX_BINARY_DATA_BYTES) {
    throw new Error(`Data size exceeds limit of ${MAX_BINARY_DATA_BYTES} bytes`);
  }

  let payload = data;
  if (data.length > 0 && data[0] === MAGIC_BYTE_EMN) {
    payload = data.subarray(1);
  }

  const root = getEmnProtobufRoot();
  const MatchFileMsg = root.lookupType("egn.MatchFile");
  const matchTypeEnum = getMatchTypeEnum();
  const matchStatusEnum = getMatchStatusEnum();

  const decoded = MatchFileMsg.decode(payload) as any;
  const decodedObject = MatchFileMsg.toObject(decoded, {
    enums: String,
    longs: String,
    defaults: true,
    oneofs: true,
  });

  const rawFormatType = decodedObject.metadata?.match_format?.type;
  const formatTypeStr = typeof rawFormatType === "number"
    ? matchTypeEnum.valuesById[rawFormatType]
    : rawFormatType;

  const rawStatus = decodedObject.metadata?.result?.status;
  const statusStr = typeof rawStatus === "number"
    ? matchStatusEnum.valuesById[rawStatus]
    : rawStatus;

  const emnFile: EmnFile = {
    fileType: "Euchre Match Notation",
    version: decodedObject.version || "1.0",
    metadata: {
      matchId: decodedObject.metadata?.match_id || undefined,
      title: decodedObject.metadata?.title || undefined,
      description: decodedObject.metadata?.description || undefined,
      date: decodedObject.metadata?.date || undefined,
      players: (decodedObject.metadata?.players || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        playerIds: (p.player_ids || []).map((idObj: any) => ({
          id: idObj.id,
          source: idObj.source,
        })),
      })),
      matchFormat: decodedObject.metadata?.match_format
        ? {
            type: (formatTypeStr || "BEST_OF_N") as any,
            target: decodedObject.metadata.match_format.target,
          }
        : undefined,
      result: decodedObject.metadata?.result
        ? {
            status: statusStr as any,
            winner: decodedObject.metadata.result.winner || [],
            scores: decodedObject.metadata.result.scores || {},
          }
        : undefined,
    },
    games: (decodedObject.games || []).map((g: any) => {
      let gameData: any = {};
      if (g.egn_json) {
        try {
          gameData = JSON.parse(g.egn_json);
        } catch (e) {
          gameData = {};
        }
      }
      return {
        gameIndex: g.game_index,
        players: g.players as [string, string, string, string],
        gameData,
      };
    }),
  };

  const validation = validateEmn(emnFile);
  if (!validation.isValid) {
    throw new Error(`Decoded EMN file failed validation: ${JSON.stringify(validation.errors)}`);
  }

  return emnFile;
}
