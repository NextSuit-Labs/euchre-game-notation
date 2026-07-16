/**
 * Canonical schema version emitted in EGN file metadata.
 *
 * The validator supports this family plus 1.2.x patch aliases for backward compatibility.
 */
export const SCHEMA_VERSION = "1.2";

/**
 * Current npm package version for CLI/library releases.
 */
export const PACKAGE_VERSION = "1.2.3";

/**
 * Backward-compatible alias used across existing code/tests.
 */
export const VERSION = SCHEMA_VERSION;

/**
 * Supported schema version family matcher.
 */
export const SUPPORTED_SCHEMA_VERSION_RE = /^1\.2(?:\.\d+)?$/;

export function isSupportedSchemaVersion(version: string): boolean {
	return SUPPORTED_SCHEMA_VERSION_RE.test(version);
}
