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
 * Canonical schema version emitted in EGN file metadata.
 *
 * The validator supports this family plus 1.3.x patch aliases for backward compatibility.
 */
export const SCHEMA_VERSION = "1.3";

/**
 * Current npm package version for CLI/library releases.
 */
export const PACKAGE_VERSION = "1.3.1";

/**
 * Backward-compatible alias used across existing code/tests.
 */
export const VERSION = SCHEMA_VERSION;

/**
 * Supported schema version family matcher.
 */
export const SUPPORTED_SCHEMA_VERSION_RE = /^1\.[23](?:\.\d+)?$/;

export function isSupportedSchemaVersion(version: string): boolean {
	return SUPPORTED_SCHEMA_VERSION_RE.test(version);
}
