import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import egnSchema from "../schemas/egn-schema-v1.json";
import { EgnFile } from "./types";

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(egnSchema);

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
  const isValid = validate(data);
  return {
    isValid,
    errors: validate.errors,
  };
}

/**
 * Type guard that validates if an unknown object is a conformant EgnFile.
 */
export function isEgnFile(data: unknown): data is EgnFile {
  return validate(data);
}

/**
 * @deprecated Use {@link validateEgn} instead.
 */
export const validateEGN = validateEgn;

/**
 * @deprecated Use {@link isEgnFile} instead.
 */
export const isEGNFile = isEgnFile;