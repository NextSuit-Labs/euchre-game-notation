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

import { ErrorObject } from "ajv";
import { Deal, EgnFile } from "./types";
import {
  validateEgn as compiledValidateEgn,
  validateDeal as compiledValidateDeal,
} from "./generated/validators";

type CompiledValidator = ((data: unknown, ...args: any[]) => boolean) & {
  errors?: ErrorObject[] | null;
};

const precompiledValidateEgn = compiledValidateEgn as CompiledValidator;
const precompiledValidateDeal = compiledValidateDeal as CompiledValidator;

export interface ValidationResult {
  isValid: boolean;
  errors?: ErrorObject[] | null;
}

/**
 * Validates an unknown data object against the EGN JSON Schema.
 * 
 * @param data The parsed JSON object to validate.
 * @returns A ValidationResult indicating success and containing any schema errors.
 */
export function validateEgn(data: unknown): ValidationResult {
  const isValid = Boolean(precompiledValidateEgn(data));
  return {
    isValid,
    errors: precompiledValidateEgn.errors ?? null,
  };
}

/**
 * Validates a single deal object against the EGN Deal Schema.
 *
 * @param data The parsed Deal JSON object to validate.
 * @returns A ValidationResult indicating success and containing any schema errors.
 */
export function validateDeal(data: unknown): ValidationResult {
  const isValid = Boolean(precompiledValidateDeal(data));
  return {
    isValid,
    errors: precompiledValidateDeal.errors ?? null,
  };
}

/**
 * Type guard that validates if an unknown object is a conformant EgnFile.
 */
export function isEgnFile(data: unknown): data is EgnFile {
  return Boolean(precompiledValidateEgn(data));
}

/**
 * Type guard that validates if an unknown object is a conformant Deal.
 */
export function isDeal(data: unknown): data is Deal {
  return Boolean(precompiledValidateDeal(data));
}

/**
 * @deprecated Use {@link validateEgn} instead.
 */
export const validateEGN = validateEgn;

/**
 * @deprecated Use {@link isEgnFile} instead.
 */
export const isEGNFile = isEgnFile;