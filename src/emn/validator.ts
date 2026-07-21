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

import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import egnSchema from "../../schemas/egn-schema-v1.json";
import emnSchema from "../../schemas/emn/emn-schema-v1.json";
import { validateEgn } from "../validator";
import { EmnFile } from "./types";

const ajv = new Ajv();
addFormats(ajv);
ajv.addSchema(egnSchema, "../egn-schema-v1.json");
ajv.addSchema(egnSchema, "egn-schema-v1.json");

const validateSchema = ajv.compile(emnSchema);

export interface EmnValidationResult {
  isValid: boolean;
  errors?: (ErrorObject | { instancePath: string; message: string })[] | null;
}

/**
 * Validates an unknown data object against the EMN JSON Schema and semantic rules.
 *
 * @param data The parsed JSON object to validate.
 * @returns An EmnValidationResult indicating success and containing any errors.
 */
export function validateEmn(data: unknown): EmnValidationResult {
  const isSchemaValid = validateSchema(data);
  if (!isSchemaValid) {
    return {
      isValid: false,
      errors: validateSchema.errors,
    };
  }

  const emnData = data as any as EmnFile;
  const customErrors: { instancePath: string; message: string }[] = [];

  // 1. Verify master player IDs are unique
  const masterPlayerIds = new Set<string>();
  emnData.metadata.players.forEach((player, idx) => {
    if (masterPlayerIds.has(player.id)) {
      customErrors.push({
        instancePath: `/metadata/players/${idx}/id`,
        message: `Duplicate master player ID '${player.id}' in metadata.players`,
      });
    } else {
      masterPlayerIds.add(player.id);
    }
  });

  // 2. Verify games[i].players IDs exist in master player pool and are unique within each game
  emnData.games.forEach((game, gameIdx) => {
    if (!game.players || game.players.length !== 4) {
      customErrors.push({
        instancePath: `/games/${gameIdx}/players`,
        message: `Game at index ${gameIdx} must contain exactly 4 player IDs`,
      });
      return;
    }

    const gamePlayerIds = new Set<string>();
    game.players.forEach((pId, seatIdx) => {
      if (!masterPlayerIds.has(pId)) {
        customErrors.push({
          instancePath: `/games/${gameIdx}/players/${seatIdx}`,
          message: `Player ID '${pId}' in game ${gameIdx} (seat ${seatIdx}) not found in metadata.players`,
        });
      }
      if (gamePlayerIds.has(pId)) {
        customErrors.push({
          instancePath: `/games/${gameIdx}/players/${seatIdx}`,
          message: `Duplicate player ID '${pId}' in game ${gameIdx}`,
        });
      } else {
        gamePlayerIds.add(pId);
      }
    });

    // 3. Validate inline sub-EGN gameData
    const egnResult = validateEgn(game.gameData);
    if (!egnResult.isValid) {
      egnResult.errors?.forEach((err) => {
        customErrors.push({
          instancePath: `/games/${gameIdx}/gameData${err.instancePath || ""}`,
          message: `Sub-EGN Validation Error: ${err.message}`,
        });
      });
    }
  });

  if (customErrors.length > 0) {
    return {
      isValid: false,
      errors: customErrors,
    };
  }

  return {
    isValid: true,
    errors: null,
  };
}

/**
 * Type guard that validates if an unknown object is a conformant EmnFile.
 */
export function isEmnFile(data: unknown): data is EmnFile {
  return validateEmn(data).isValid;
}
