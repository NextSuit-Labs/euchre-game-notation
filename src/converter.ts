import * as fs from "fs";
import * as path from "path";
import protobuf from "protobufjs";
import { packDeal, unpackDeal } from "./bitpacker";

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
  match_id: "matchId",
  initial_score: "initialScore",
  deal_number: "dealNumber",
  initial_state: "initialState",
  up_card: "upCard",
  phase_number: "phaseNumber",
  is_alone: "isAlone",
  initial_lead: "initialLead",
  branch_index: "branchIndex",
  bidding_phase: "biddingPhase",
  trick_play_phase: "trickPlayPhase",
  alternative_lines: "alternativeLines",
};

const jsonToProtoKeyMap: Record<string, string> = {
  fileType: "file_type",
  matchId: "match_id",
  initialScore: "initial_score",
  dealNumber: "deal_number",
  initialState: "initial_state",
  upCard: "up_card",
  phaseNumber: "phase_number",
  isAlone: "is_alone",
  initialLead: "initial_lead",
  branchIndex: "branch_index",
  biddingPhase: "bidding_phase",
  trickPlayPhase: "trick_play_phase",
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

      // Convert card lists in player_cards (from array of CardList messages to array of string arrays)
      if (key === "player_cards" && Array.isArray(val)) {
        res["player_cards"] = val.map(item => item.cards || []);
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

      // Handle alternativeLines phase type injection
      if (key === "bidding_phase" && typeof val === "object" && val !== null) {
        const mappedVal = mapProtoToEgn(val);
        mappedVal.type = "EUCHRE_BIDDING";
        res[mappedKey] = mappedVal;
        continue;
      }

      if (key === "trick_play_phase" && typeof val === "object" && val !== null) {
        const mappedVal = mapProtoToEgn(val);
        mappedVal.type = "TRICK_PLAY";
        res[mappedKey] = mappedVal;
        continue;
      }

      // Convert AnnotationList map back to string[] arrays
      if ((key === "calls_annotations" || key === "tricks_annotations") && typeof val === "object" && val !== null) {
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

      // Convert player_cards to CardList messages
      if (key === "loner_lead" && typeof val === "string") {
        const enumType = getLonerLeadEnum(condensed);
        res["loner_lead"] = enumType.values[val];
        continue;
      }

      // Convert player_cards to CardList messages
      if (key === "player_cards" || key === "playerCards") {
        res["player_cards"] = val.map((cards: string[]) => ({ cards }));
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

      // Handle alternativeLines phase type deletion
      if ((key === "biddingPhase" || key === "trickPlayPhase") && typeof val === "object" && val !== null) {
        const mappedVal = mapEgnToProto(val, condensed);
        delete mappedVal.type;
        res[mappedKey] = mappedVal;
        continue;
      }

      // Convert string[] annotations to AnnotationList maps
      if ((key === "calls_annotations" || key === "tricks_annotations") && typeof val === "object" && val !== null) {
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
 * @returns The converted EGN JSON string.
 */
export function convertBinToEgnJson(binFilePath: string, condensed = true): string {
  const root = getProtobufRoot(condensed);
  const EgnFileMessage = root.lookupType("egn.EgnFile");
  const buffer = fs.readFileSync(binFilePath);
  const message = EgnFileMessage.decode(buffer);
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
      jsonObj.deals = jsonObj.deals.map((d: any) => {
        if (typeof d === "object") {
          return packDeal(d);
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
  const buffer = EgnFileMessage.encode(message).finish();
  fs.writeFileSync(outBinFilePath, buffer);
}
