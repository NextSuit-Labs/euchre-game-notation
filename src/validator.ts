import Ajv, { ErrorObject } from "ajv";
import egnSchema from "../schemas/egn-schema-v1.json";
import { EGNFile } from "./types";

const ajv = new Ajv();
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
export function validateEGN(data: unknown): ValidationResult {
  const isValid = validate(data);
  return {
    isValid,
    errors: validate.errors,
  };
}

/**
 * Type guard that validates if an unknown object is a conformant EGNFile.
 */
export function isEGNFile(data: unknown): data is EGNFile {
  return validate(data);
}