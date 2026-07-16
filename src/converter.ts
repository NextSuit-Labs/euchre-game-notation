import * as fs from "fs";
import * as path from "path";
import protobuf from "protobufjs";
import { packDeal, unpackDeal } from "./bitpacker";

// Magic bytes to identify binary format
const MAGIC_BYTE_EXPANDED = 0x00;
const MAGIC_BYTE_CONDENSED = 0x01;

let loadedCondensedRoot: protobuf.Root | null = null;
let loadedExpandedRoot: protobuf.Root | null = null;

function getProtoDirectory(): string {
  // If running from compiled dist/src, it is ../../schemas
  const path1 = path.resolve(__dirname, "../../schemas");
  // If running from source src (like during tests), it is ../schemas
  const path2 = path.resolve(__dirname, "../schemas");

  if (fs.existsSync(path1)) {
    return path1;
  }
  return path2;
}

function getProtobufRoot(condensed: boolean): protobuf.Root {
  const baseDir = getProtoDirectory();
  if (condensed) {
    if (!loadedCondensedRoot) {
      loadedCondensedRoot = new protobuf.Root();
      loadedCondensedRoot.loadSync(path.join(baseDir, "egn.proto"), { keepCase: true });
    }
    return loadedCondensedRoot;
  } else {
    if (!loadedExpandedRoot) {
      loadedExpandedRoot = new protobuf.Root();
      loadedExpandedRoot.loadSync(path.join(baseDir, "egn-expanded.proto"), { keepCase: true });
    }
    return loadedExpandedRoot;
  }
}

function getLonerLeadEnum(condensed: boolean): protobuf.Enum {
  const root = getProtobufRoot(condensed);
  return root.lookupEnum("egn.Ruleset.LonerLead");
}

const protoToJsonKeyMap: Record<string, string> = {
  file_type: "fileType",
  game_id: "gameId",
  initial_score: "initialScore",
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
        const mappedAnn: any = {};
        for (const annKey of Object.keys(val)) {
          const numKey = Number(annKey);
          const valObj = val[annKey];
          const texts = valObj ? (valObj.texts || []) : [];
          if (!isNaN(numKey)) {
            mappedAnn[numKey] = texts;
          } else {
            mappedAnn[annKey] = texts;
          }
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
export function detectBinaryFormat(binFilePath: string): "condensed" | "expanded" | null {
  try {
    const buffer = fs.readFileSync(binFilePath);
    if (buffer.length === 0) return null;
    
    const magicByte = buffer[0];
    if (magicByte === MAGIC_BYTE_CONDENSED) return "condensed";
    if (magicByte === MAGIC_BYTE_EXPANDED) return "expanded";
    
    return null;
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
        const mappedAnn: any = {};
        for (const annKey of Object.keys(val)) {
          const numKey = Number(annKey);
          const texts = val[annKey];
          const valObj = { texts: Array.isArray(texts) ? texts : (texts ? [texts] : []) };
          if (!isNaN(numKey)) {
            mappedAnn[numKey] = valObj;
          } else {
            mappedAnn[annKey] = valObj;
          }
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
export function convertBinToEgnJson(binFilePath: string, condensed?: boolean): string {
  const buffer = fs.readFileSync(binFilePath);
  
  // If condensed is not specified, auto-detect from magic byte
  if (condensed === undefined) {
    if (buffer.length === 0) {
      throw new Error("Binary file is empty");
    }
    const detected = detectBinaryFormat(binFilePath);
    if (detected !== null) {
      condensed = detected === "condensed";
    } else {
      // Fall back to default if no magic byte found
      condensed = true;
    }
  }
  
  const root = getProtobufRoot(condensed);
  const EgnFileMessage = root.lookupType("egn.EgnFile");
  
  // Skip the magic byte if present (check for magic byte markers)
  let protoBuffer = buffer;
  if (buffer.length > 1 && (buffer[0] === MAGIC_BYTE_CONDENSED || buffer[0] === MAGIC_BYTE_EXPANDED)) {
    protoBuffer = buffer.slice(1);
  }
  
  const message = EgnFileMessage.decode(protoBuffer);
  const rawObj = EgnFileMessage.toObject(message, {
    arrays: true,
    longs: String,
    enums: String,
    defaults: false,
  });
  const mappedObj = mapProtoToEgn(rawObj);

  // If it was condensed, the deals array contains base64 strings.
  // We decode/unpack them back to full Deal objects for the returned JSON string.
  if (condensed && Array.isArray(mappedObj.deals)) {
    mappedObj.deals = mappedObj.deals.map((dealStr: any, idx: number) => {
      if (typeof dealStr === "string") {
        return unpackDeal(dealStr, idx);
      }
      return dealStr;
    });
  }

  return JSON.stringify(mappedObj, null, 2);
}

/**
 * Converts an EGN JSON string to a serialized Protobuf binary file.
 * @param egnJsonStr The EGN JSON string representation.
 * @param outBinFilePath Target path where the Protobuf binary file should be saved.
 * @param condensed If true (default), packs each Deal object to a base64 string and encodes using condensed schema.
 *                  If false, unpacks any base64 strings to full Deal objects and encodes using the expanded schema.
 */
export function convertEgnJsonToBin(egnJsonStr: string, outBinFilePath: string, condensed = true): void {
  const root = getProtobufRoot(condensed);
  const EgnFileMessage = root.lookupType("egn.EgnFile");
  const jsonObj = JSON.parse(egnJsonStr);

  // Pre-process deals array to pack or unpack deals based on condensed flag
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

  const mappedObj = mapEgnToProto(jsonObj, condensed);

  const errMsg = EgnFileMessage.verify(mappedObj);
  if (errMsg) throw new Error("Protobuf verification failed: " + errMsg);

  const message = EgnFileMessage.create(mappedObj);
  const protoBuffer = EgnFileMessage.encode(message).finish();
  
  // Prepend magic byte to identify format
  const magicByte = Buffer.from([condensed ? MAGIC_BYTE_CONDENSED : MAGIC_BYTE_EXPANDED]);
  const finalBuffer = Buffer.concat([magicByte, protoBuffer]);
  fs.writeFileSync(outBinFilePath, finalBuffer);
}
