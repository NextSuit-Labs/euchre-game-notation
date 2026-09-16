# Changelog

All notable changes to the Euchre Game Notation (EGN) specification and utility library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.1] - 2026-09-11

### Added & Improved
- **EGN & EMN Web Workbench (`src/workbench/`)**:
  - Implemented a complete zero-dependency browser workbench supporting all converters, validators, bitpackers, combiners, and extractors across `src/` for both EGN single games and EMN match series.
  - Interactive UI with NextSuit Labs glassmorphic dark theme, Google Fonts (`Outfit` and `Fira Code`), real-time status badges, live stats, and drag-and-drop file support (`.egn`, `.emn`, `.egnb`, `.emnb`).
  - Cross-format suite: Match combiner (`combineEgnToEmn`) to merge multiple EGNs into a unified EMN with automatic score calculation, and match extractor (`extractEgnFromEmn`, `extractAllEgnsFromEmn`) with master player name resolution.
  - Added `generate-workbench-bundle.js` utilizing `esbuild` to compile a standalone browser bundle (`src/workbench/bundle.js`) exporting `window.EuchreNotation`, integrated into `package.json` (`npm run build:workbench` and `npm run prebuild`).
- **Dealer Discard & Upcard Pickup in Baseline Replayer & Rules Engine**:
  - Updated `compileDealSteps` (`src/engine/rules.ts`) to support dealer discards: when the dealer is ordered up the upcard in the first 4 calls and a `discard` is specified, the discarded card is removed from the dealer's hand and the upcard is added at the order-up call step and maintained through all subsequent trick play steps.
  - Added pre-discard hand reconstruction for deals where starting `playerCards` was omitted so the dealer's pre-discard hand is accurately rendered during the initial deal and early bidding passes.
  - Auto-generated updated `src/baseline-replayer/rules-engine.js` and connected the workbench to the visual replayer with a 1-click launch bridge (`?source=workbench`).
- **EMN Match Scoring Engine (`src/emn/scoring.ts`)**:
  - Added `calculateEmnScores` to calculate player point accumulations, game win tallies, team scores, game-by-game summaries, and overall match standings across all match formats (`BEST_OF_N`, `PROGRESSIVE`, `TARGET_SCORE`, etc.).
  - Added `addScoresToEmn` to calculate standings and persist `metadata.result` in EMN files with schema validation.
  - Dynamically evaluates game scores from deal sequences when `metadata.finalScore` is omitted.
  - Wired into the Workbench UI (`#btn-emn-score`) and `combineEgnToEmn` combiner pipeline.
- **Canonical Hashing Normalization & Parity (`src/hashing.ts`, `src/cli-baseline-egn.ts`)**:
  - Excluded obsolete `phaseNumber` from all SHA-256 hash calculations across both full game hashing (`hashGame`, `hashEgn`, `hashFullEgn`) and baseline hashing (`hashBaselineGame`, `hashBaselineEgn`, `convertToBaselineEgn`).
  - Full game hashing now performs identical canonical pruning as baseline hashing: strips empty arrays (including `playerCards`, `teamNames`, `cardExchanges`), empty player hand arrays, empty objects (e.g., empty `ruleset`), and `undefined` entries.
  - Full game hashing now normalizes shorthand bidding calls (`"p"` -> `"Pass"`, `"o"` -> `"Order"`), ensuring full equivalence between shorthand and full-word games.
  - Guarantees byte-for-byte identical SHA-256 hashes between full hash and baseline hash for all clean/non-annotated games.
- **Shorthand Bidding Calls Support (`"p"` and `"o"`)**:
  - Added support for `"p"` (shorthand for `"Pass"`) and `"o"` (shorthand for `"Order"`) in EGN bidding phases (`schemas/egn-schema-v1.json`, `src/types.ts`).
  - Strict specification conformance: Round 1 order-up calls only allow `"Order"` and `"o"`.
  - Seamless bitpacker encoding (`src/card-encoding.ts`): encodes `"p"` and `"o"` identically to `"Pass"` and `"Order"` in binary `.egnb` streams.
  - Full rules engine & semantic validation integration (`src/engine/rules.ts`, `src/engine/validation.ts`): trump determination, maker deduction, loner rules, dealer pickup/discard, and round 2 bid suit checks recognize shorthand tokens.
  - Baseline hashing normalization (`src/hashing.ts`, `src/cli-baseline-egn.ts`): maps `"p"` -> `"Pass"` and `"o"` -> `"Order"` during baseline conversion so shorthand games produce the exact same canonical SHA-256 baseline hash as full-word games.
  - Visual baseline replayer (`src/baseline-replayer/replayer.js`): formats shorthand calls into user-friendly text (`"Pass"`, `"Order"`, `"Order (Alone)"`).
  - Re-generated updated `src/baseline-replayer/rules-engine.js` and standalone workbench bundle `src/workbench/bundle.js`.
- **Unit Test Coverage**:
  - Added unit tests in `test/engine-score.test.ts` for dealer discard, upcard pickup in `compileDealSteps`, and shorthand call handling.
  - Added unit tests in `test/validator.test.ts` and `test/bitpacker.test.ts` verifying schema validation and condensed bitpacking roundtrips for `"p"` and `"o"`.
  - Added unit tests in `test/engine-validation.test.ts` testing round 2 suit validation and dealer pickup/discard with shorthand bids.
  - Added unit tests in `test/emn/scoring.test.ts` covering match play, progressive scoring, deal-based score evaluation, and `addScoresToEmn`.
  - Added unit tests in `test/converter.test.ts` verifying clean game hash parity, `phaseNumber` independence, and shorthand baseline hash equivalence (421 total passed tests).

## [1.6.0] - 2026-08-23

### Added & Improved
- **Team Names Support in EGN & EMN**:
  - Added optional `teamNames: [string, string]` 2-tuple property to EGN metadata schema (`schemas/egn-schema-v1.json`, `src/types.ts`) for partnership names (`[Team 0/2 Name, Team 1/3 Name]`).
  - Added optional `teams: MatchTeam[]` array property to EMN metadata schema (`schemas/emn/emn-schema-v1.json`, `src/emn/types.ts`) with `id`, `name`, optional `playerIds`, and optional `color`.
  - Added Protobuf serialization/deserialization for `team_names` in `schemas/egn-common.proto` (`.egnb`) and `MatchTeam` in `schemas/emn/emn.proto` (`.emnb`).
  - Added semantic validation in `src/emn/validator.ts` ensuring unique team IDs and valid master player ID references.
- **Optional `phaseNumber` (EGN Schema 1.6)**:
  - Removed `phaseNumber` from the required properties of `biddingPhase` and `trickPlayPhase` in `schemas/egn-schema-v1.json`.
  - Updated TypeScript definitions (`src/types.ts`) with optional `phaseNumber?: number;` on `BiddingPhase` and `TrickPlayPhase`.
  - Upgraded canonical schema version to `1.6` with regex pattern `^1\.[23456](?:\.\d+)?$`.
- **Deterministic Baseline Hash Preservation**:
  - Updated `convertToBaselineEgn` (`src/cli-baseline-egn.ts`) and `convertToBaselineGame` (`src/hashing.ts`) to canonically populate `phaseNumber` (`0` for `EUCHRE_BIDDING`, `1` for `TRICK_PLAY`) during baseline conversion.
  - Guarantees byte-for-byte identical SHA-256 baseline hashes whether files are written with or without explicit `phaseNumber` properties.
- **Dedicated Gameplay & Semantic Rule Validation (`src/engine/validation.ts`)**:
  - Implemented `validateDealGameplay` and `validateGameplay` to detect reneges (with Left Bower dynamic suit resolution), duplicate dealt/played cards, illegal round 2 bid suits, trick count mismatches, and sit-out violations (for lone callers and defending alone).
- **EGN Engine CLI (`egn-engine`)**:
  - Renamed CLI tool to `src/cli-engine.ts` executable as `egn-engine`.
  - Added `--validate-gameplay` flag to check game integrity.

## [1.5.3] - 2026-08-15

### Added & Improved
- **DRY Converter Bitpacking**: Updated `src/converter.ts` (`convertEgnFileToProtoObject` and `packEgnFile`) to directly leverage `packDeal`'s auto-detection rather than duplicating version selection conditions.
- **Universal Browser-Compatible Bitstream (`src/bitstream.ts`)**: Replaced Node.js `Buffer` usage with standard web `Uint8Array`, `TextEncoder`, `TextDecoder`, `btoa`, and `atob` with cross-runtime fallbacks, making bitstream and Base64URL encoding/decoding fully portable in Vite, Webpack, and browser environments.
- **Canonical Hashing Speedup (`src/hashing.ts`)**: Accelerated `stableStringify` by replacing `localeCompare` with fast lexicographical sorting for ASCII JSON keys.
- **Defensive Bitstream Bounds-Checking**: Added bounds assertions to `BitReader.readInteger` and `decodePlayerCards` (`src/bitpacker.ts`) to immediately throw descriptive errors on malformed or corrupted bitstreams.
- **Developer Utilities**: Added and exported `validateDeal`, `isDeal` (`src/validator.ts`), and `isGenericMatchFile` (`src/match-engine.ts`) for validating individual deals and match series structures.
- **Test Suite Expansion**: Added unit tests covering all version auto-detection paths, bitstream UTF-8 encoding, bounds checking, and new validation guards (313 total passed tests).

## [1.5.2] - 2026-08-14

### Added & Improved
- **Dynamic Bitpacker Version Auto-Detection**: Refactored `packDeal` in `src/bitpacker.ts` to automatically detect and select the most compact compatible serialization format (V1, V2, or V3) if `options.version` is omitted. It selects Version 3 only when required by advanced features (non-empty `playerCards` or non-empty `discard` fields), Version 2 for custom rulesets (variable player counts, alternate deck sizes, dealer index $\ge 4$, or defend-alone), and Version 1 otherwise.
- **Auto-Detection Unit Tests**: Added comprehensive test coverage in `test/bitpacker.test.ts` verifying all auto-detection logic paths and correctness of version boundaries.

### Fixed
- **Browser-Compatible SHA-256 Hashing**: Replaced the `import * as crypto from "crypto"` Node.js built-in in `src/hashing.ts` with [`@noble/hashes`](https://github.com/paulmillr/noble-hashes) (`sha2` module). The hashing API (`hashGame`, `hashFullGame`, `hashBaselineGame`, `hashEgn`, `hashFullEgn`, `hashBaselineEgn`) is unchanged and produces **byte-for-byte identical** SHA-256 output — verified against all FIPS 180-4 test vectors and real EGN payloads. This allows the library to be imported in browser environments (Vite, Webpack, etc.) without `crypto.createHash is not a function` errors.

## [1.5.1] - 2026-08-12

### Fixed & Improved
- **Website Landing Page (`index.html`)**: Fully integrated high-level information and specifications for Euchre Match Notation (EMN) to document tournament, series, seat rotations, and CLI features.
- **Card Preview Syntax Fix**: Added required `phaseNumber` field to the hero section's EGN JSON preview card to align with schema requirements.

## [1.5.0] - 2026-08-11

### Added & Improved
- **EGN Schema 1.5 Specification**: Added support for date-only formats (e.g., `2026-08-11`) and empty string dates (`""`) in metadata via `{ "format": "date" }` and regex pattern `^$|^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?)?$`.
- **EMN Schema 1.2 Specification**: Added support for date-only formats (e.g., `2026-08-11`) and empty string dates (`""`) in match metadata and gameData via `{ "format": "date" }` and regex pattern `^$|^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?)?$`.

## [1.4.8] - 2026-08-03

### Fixed & Improved
- **Decoupled Generic Hashing Module (`src/hashing.ts`)**: Refactored `src/hashing.ts` to expose game-agnostic functions (`hashGame`, `hashFullGame`, `hashBaselineGame`, `convertToBaselineGame`) decoupled from `cli-baseline-egn.ts` and `egn-schema-v1.json` via injectable `BaselineConverterFn` callbacks. Re-exported EGN aliases (`hashEgn`, `hashFullEgn`, `hashBaselineEgn`) for 100% backward compatibility.
- **Generic Match Engine (`src/match-engine.ts`)**: Extracted generic match series extraction (`extractGameFromMatch`, `extractAllGamesFromMatch`) into `src/match-engine.ts` using generic TypeScript interfaces (`GenericMatchFile<TGame>`, `GenericGameData`) with zero EGN-specific references, allowing EMN, SMN, HMN, WMN, SHMN, and FTMN to share identical match extraction logic.
- **French Tarot & Cavalier Card Encoding**: Added `ALL_RANKS_WITH_CAVALIER`, `TRIUMPHS`, and `FULL_78_CARD_DECK` to `src/card-encoding.ts` and made `buildDeck(minRank, includeCavalier, includeTriumphs)` fully extensible for 78-card French Tarot decks.
- **Multi-Game Architecture Specifications**: Added detailed implementation plans in `future/` for 5-Player Sheepshead (`SHEEPSHEAD_GAME_NOTATION_PLAN.md`) and 78-card French Tarot (`FRENCH_TAROT_GAME_NOTATION_PLAN.md`), including `red_suits_reverse_pip_order` ruleset options for traditional Tarot variants.

## [1.4.7] - 2026-08-01

### Fixed & Improved
- **Phase 1 Internal Module Decoupling**: Decoupled core library infrastructure into dedicated files (`src/bitstream.ts`, `src/hashing.ts`, `src/card-encoding.ts`) in preparation for multi-game `@tgn/core` architecture while maintaining 100% backward compatibility for all top-level exports.
- **Binary Decoding Phase Normalization**: Updated `convertBinDataToEgnFile` (`src/converter.ts`) to ensure decoded `.egnb` binary files automatically normalize phase numbers to standard 0-based values (`0` for bidding, `1` for play).
- **Bitpacker `phaseNumber` Fix for Alternative Lines**: Fixed phase number calculation when unpacking alternative lines in `unpackDealV1`, `unpackDealV2`, and `unpackDealV3` (`src/bitpacker.ts`). Previously set `phaseNumber` to `branchIndex + p`; now correctly assigns standard 0-based phase numbers (`0` for bidding, `1` for trick play).
- **`upgradeEgn` Alternative Line Phase Normalization**: Updated `upgradeEgn` (`src/cli-upgrade.ts`) to recursively normalize legacy 1-based phase numbers (1 $\rightarrow$ 0, 2 $\rightarrow$ 1) across both main `deal.phases` AND nested `deal.alternativeLines[i].phases`, as well as stripping non-schema legacy fields from `TRICK_PLAY` phases.
- **Comprehensive Recursive Example Test Suite**: Updated `test/examples-roundtrip.test.ts` to recursively scan and verify all 42 `.egn` and `.emn` files across all subdirectories in `examples/`. Expanded deal bitpacking and Protobuf test coverage from 149 to **301 passed unit tests**.

## [1.4.6] - 2026-07-31

### Added
- **`hashEgn` & `hashFullEgn` Functions**: Added `hashEgn(egn)` (and `hashFullEgn(egn)`) helper functions (`src/cli-baseline-egn.ts` & re-exported at top-level) to generate a deterministic SHA-256 hex hash of the complete EGN file (including all annotations, alternative lines, and metadata) using canonical key sorting.

## [1.4.5] - 2026-07-31

### Added
- **`UnpackedEmnFile` & `UnpackedEmnGameEntry` Types**: Added `UnpackedEmnFile` and `UnpackedEmnGameEntry` TypeScript interfaces (`src/emn/types.ts`) representing an `EmnFile` where all embedded sub-game `gameData` objects have fully expanded `Deal` arrays (`UnpackedEgnFile`).
- **`unpackEmnFile` & `packEmnFile` Helpers**: Added `unpackEmnFile(emnFile)` and `packEmnFile(emnFile)` helper functions (`src/emn/converter.ts`) to expand or bitpack all deal strings across all embedded sub-games in an EMN match file.
- **Automatic Deal Bitpacking & Unpacking in `.emnb`**: Added `EmnBinaryOptions` (`{ condenseGames?: boolean }`) to `emnToBinary`, `convertEmnFileToBinData`, `convertEmnJsonToBinData`, and `convertEmnJsonToBin` (defaults to `true` for maximum binary compression). Added `{ unpackGames?: boolean }` decoding options to `binaryToEmn`, `convertBinDataToEmnFile`, `convertBinDataToEmnJson`, and `convertBinToEmnJson`.
- **`isEmnFile` Type Guard**: Added `isEmnFile(data: unknown): data is EmnFile` type guard in `src/emn/validator.ts` (re-exported at root).
- **Package Subpath `exports` Map**: Configured `"exports"` in `package.json` mapping top-level `.` and `./emn` subpaths for clean ESM/CommonJS resolution across Node.js, Vite, Webpack 5, and Next.js.
- **CLI Flags**: Updated `emn-match-convert` CLI to support `--expanded` / `--unpack` / `--no-condense` flags for controlling deal packing/unpacking during `.emn` $\leftrightarrow$ `.emnb` conversions.
- **Out-of-Bounds Protection**: Added bounds validation in `extractEgnFromEmn` throwing descriptive errors if `gameIndex` is out of bounds or negative.

## [1.4.4] - 2026-07-29

### Added
- **`UnpackedEgnFile` Type**: Added `UnpackedEgnFile` TypeScript interface (`src/types.ts`) representing an `EgnFile` where the `deals` array strictly contains fully expanded `Deal` objects (no condensed base64 strings).
- **`unpackEgnFile` & `packEgnFile` Helpers**: Added `unpackEgnFile(egnFile)` and `packEgnFile(egnFile)` helper functions in `src/converter.ts` (and exported at root) to easily unpack all base64 deal strings to `Deal` objects or pack all `Deal` objects to condensed base64 strings.

## [1.4.3] - 2026-07-28

### Added
- **Direct Top-Level EMN Exports**: Re-exported all EMN types and functions (`EmnFile`, `EmnGameEntry`, `MatchPlayer`, `validateEmn`, `combineEgnToEmn`, `extractEgnFromEmn`, etc.) directly at the top-level package entrypoint (`src/index.ts`). Clients can now import directly from `"euchre-game-notation"` without reaching into deep internal paths like `"euchre-game-notation/dist/src/emn"`. (Namespace usage `import { emn } from "euchre-game-notation"` remains fully supported).

## [1.4.2] - 2026-07-28

### Changed (Breaking — EMN Schema v1.1)
- **EMN `games[].players` renamed to `playersOverride`**: The per-game seat mapping array inside each EMN `games` entry has been renamed from `players` to `playersOverride` to clearly distinguish it from the embedded EGN `gameData.metadata.players` array. The `playersOverride` array is the authoritative source of seat-to-master-player-ID mappings for match-level display and scoring; the inner EGN array is treated as legacy metadata only.
- **EMN Schema bumped to v1.1**: The `version` field pattern in `emn-schema-v1.json` now requires `1.1` (or any `1.1.x` patch). Files produced by EMN v1.0 tools (using `players`) will fail schema validation and must be migrated.
- **EMN version module (`src/emn/version.ts`)**: Added `EMN_SCHEMA_VERSION`, `SUPPORTED_EMN_SCHEMA_VERSION_RE`, and `isSupportedEmnSchemaVersion()` for programmatic version gating.
- **Validator version check**: `validateEmn()` now explicitly rejects unsupported EMN schema versions with a clear error message.
- **Replayer updated**: Baseline replayer (`replayer.js`) updated to read `game.playersOverride` when hydrating player names from an EMN match file.

### Documentation
- Added **4-player / 2-team scope note** to the EMN section of `README.md` and to `docs/emn/match-specification.md` clarifying that EMN only supports standard 4-seat Euchre formats.
- Updated all JSON examples in `docs/emn/match-specification.md` to use `playersOverride`.
- Updated `gameData.$ref` in `emn-schema-v1.json` to reference the EGN JSON schema for strict sub-game validation.

## [1.4.1] - 2026-07-28

### Added
- **Match Extract CLI (`emn-match-extract`)**: Added a CLI tool and library API (`extractEgnFromEmn`, `extractAllEgnsFromEmn`) to extract individual or all EGN games from a unified `.emn` match file with automatic restoration of master player names.
- **Extractor Web-app Support**: Exposed pure in-memory, browser-safe extractor methods `extractEgnFromEmn` and `extractAllEgnsFromEmn` to support client-side extraction.
- **Validation on Extract**: Integrated EGN schema validation checks directly into the extraction pipeline to ensure that all extracted games are valid EGN files.
- **Combiner Web-app Support**: Moved EMN combiner logic into a standalone, browser-safe file (`src/emn/combiner.ts`) with zero Node.js filesystem dependencies, enabling web applications to combine EGN games into matches programmatically.

## [1.4.0] - 2026-07-21

### Added
- **Euchre Match Notation (EMN) Specification & Support**: Introduced the `.emn` meta-specification and schema (`schemas/emn/emn-schema-v1.json`, `schemas/emn/emn.proto`) to represent multi-game series, round-robins, and progressive tournaments.
- **Match Combine CLI (`emn-match-combine`)**: Added a CLI tool and library API (`combineEgnToEmn`) to combine multiple EGN games into a single `.emn` match with automatic player deduplication, master ID assignment (`p-01`, `p-02`), seat mapping, and format-aware score calculation.
- **Optional `finalScore` Metadata**: Added optional `metadata.finalScore` (`[number, number]`) to EGN schema, Protobuf schemas, and TypeScript typings to record game completion scores.
- **Fixed Hand Limit Support (`num_deals`):** Introduced optional ruleset property `num_deals` (integer, minimum `1`) to specify a limit on the number of hands/deals played in a game (ideal for progressive Euchre). Games set to num_deals do not have a winner, but rather count the number of points scored by each player individually across multiple rounds.
- **Mutually Exclusive Completion Conditions:** Added schema validation enforcing that a ruleset enforces either `winning_score` OR `num_deals`, but not both simultaneously (`not: { required: ["winning_score", "num_deals"] }`).
- **Protobuf & Types updates:** Expanded Protobuf schemas (`optional int32 num_deals = 17`, `repeated int32 final_score = 8`, `message MatchPlayer`), updated TypeScript definitions, and updated EMN serialization with magic byte `0x02`.
- **Baseline Replayer Match Support:** Added full playback support for `.emn` match files including dynamic player seat-name resolution, multi-tier navigation (step, hand, and game controls), and panel toggles to auto-hide match navigation in single EGN mode. Updated [docs/replayer-logic.md](docs/replayer-logic.md) to document these concepts.

## [1.3.1] - 2026-07-18

### Changed
- Standardized Apache 2.0 copyright headers across comment-friendly source files (`.ts`, `.js`, `.css`, `.html`) in core source, CLI scripts, baseline replayer assets, and test files.

### Documentation
- Added a formal "Source File Header Policy" to `CONTRIBUTING.md`, including:
  - Required full-header usage for comment-friendly source files.
  - Shebang/header placement guidance for CLI scripts.
  - Exclusions for generated files and non-commentable formats.
  - Canonical project copyright line and optional SPDX short form.

## [1.3.0] - 2026-07-18

### Added
- **Egn Casing Standard aliases:** Added preferred camel-case exports `EgnFile`, `validateEgn`, and `isEgnFile` to resolve naming discrepancies across the public API.

### Changed
- **Schema-level validation loosening:** Removed strict HTML/XSS input patterns (`^[^<>]*$`) from text and description fields (`gameId`, `title`, `description`, player names, player IDs, player sources, and commentary annotations) in the EGN JSON schema. This allows natural notation for mathematical comparisons (e.g. `score < 10`) and flow/arrows (e.g. `->`), delegating context-aware output encoding and sanitization responsibilities to the rendering client applications.
- **Internal Naming Casing Migration:** Migrated all internal components, CLI tools (`egn-baseline`, `egn-convert`, `egn-upgrade`), examples, and test suites to standard `Egn` camel casing.

### Deprecated
- **Legacy EGN casing exports:** Marked `EGNFile`, `validateEGN`, and `isEGNFile` as `@deprecated` in JSDoc. These remain exported and fully functional for backward-compatibility but will be removed in a future major release.

### Documentation
- Added a "Security & Safe Rendering Guidelines" section to the README explaining why HTML characters are allowed in the schema and detailing the client-side context-aware output encoding responsibilities.
- Updated all README examples and documentation to prefer standard `Egn` casing.

## [1.2.4] - 2026-07-17

### Added
- Browser-safe in-memory converter exports: `convertBinDataToEgnFile`, `convertBinDataToEgnJson`, `convertEgnFileToBinData`, `convertEgnJsonToBinData`, and `detectBinaryFormatFromData`.
- Maintained centralization of the proto definitions using a generated file `proto-schemas.ts` that is generated at test/build time using `generate-proto-schemas.js`.
- Created test to ensure that the `proto-schemas.ts` matches the source of truth `.proto` files.
- Added converter tests covering oversized binary rejection, decode-side schema validation, encode-side schema validation, and non-numeric annotation-map key rejection.

### Changed
- Binary file naming now uses `.egnb` for condensed output by default, with `.expanded.egnb` reserved for expanded protobuf output.
- The converter's Node.js file helpers and browser-safe in-memory helpers now share the same serialization and magic-byte detection logic.
- Converter encode/decode helpers now enforce EGN schema validation at the conversion boundary and reject non-numeric annotation-map keys.
- Converter binary inputs and outputs are now capped at 8 MiB.

### Documentation
- Updated the README and binary format documentation to describe the new in-memory/browser conversion APIs and the new validation and size-limit behavior.

## [1.2.3] - 2026-07-16

Add support for calling upgrade function with EGNFile object rather than just a json string.

## [1.2.2] - 2026-07-16

This release decouples the **schema version** from the **npm package version**. The canonical schema version emitted in EGN file metadata is now `1.2` (major.minor only). The npm package version (`1.2.2`) continues to use patch increments for library/tooling updates that do not alter the EGN schema itself. The validator accepts both bare `1.2` and any `1.2.x` patch strings for full backward compatibility.

### Changed
- **Schema version decoupling**: The `version` field written to EGN files is now `"1.2"` (not `"1.2.2"`). The `SCHEMA_VERSION` constant in `src/version.ts` is `"1.2"`, while `PACKAGE_VERSION` tracks the npm release (`"1.2.2"`). The schema regex `^1\.2(?:\.\d+)?$` ensures files stamped with any `1.2.x` patch alias remain valid.
- **Centralized version source**: All CLI tools and the `egn-upgrade` migration output reference `SCHEMA_VERSION` directly, so future patch releases require no schema file changes.

### Added
- **Security enhancements**: Added schema-level security hardening measures, including `additionalProperties: false` guards and XSS-pattern rejection via `^[^<>]*$` field constraints.

## [1.2.1] - 2026-07-16

This release exported the upgradeEgn function and renamed the functions: stripAnalysisItems -> convertToBaselineEgn and hashStrippedEgn -> hashBaselineEgn

## [1.2.0] - 2026-07-15

This release improves schema flexibility and validation robustness to accommodate real-world game scenarios and future variations.

### Added
- **Centralized Version Management**: Created `src/version.ts` to maintain a single version constant, making future releases easier to manage across all components.
- **Enhanced Schema Documentation**: Added explicit markers in the schema for "Analysis-only content" properties (`playAnnotations`, `callAnnotations`, `alternativeLines`) to support baseline hashing.
- **Baseline EGN Functionality**:
  - New `egn-baseline` CLI tool for extracting baseline EGN files by removing all analysis-only properties (`callAnnotations`, `playAnnotations`, `alternativeLines`).
  - Generates deterministic SHA256 hashes for game records, enabling deduplication and fair comparison across systems.
  - Supports both condensed and expanded binary formats; produces identical hashes regardless of source format.
  - Useful for validation, archival, and comparing game records without subjective annotations.
- **Version Migration Tool**:
  - New `egn-upgrade` CLI tool for automatic migration of EGN files from v1.0.0 and v1.1.0 to v1.2.0 format.
  - Automatically converts snake_case properties to camelCase (`match_id` → `gameId`, `initial_state` → `initialState`, etc.).
  - Removes redundant fields that were deprecated in v1.2.0 (`kitty`, `initialLead`).
  - Preserves all game-critical data while modernizing file format.

### Changed
- **Schema Flexibility**: Updated the `phases` array validation to allow `minItems: 0`, enabling support for setup-only scenarios where deals are recorded before any bidding or trick play occurs (e.g., `Custom Scenario.egn`).
- **Binary Format**: Added a magic-byte to differentiate condensed and expanded formats automatically.
- **Binary Bitstream Format (Version 3)**:
  - Added new 4-bit version header `0011` (Version 3) extending V2 with optional preservation of game state details.
  - Supports optional `discard` field in BiddingPhase to track the card discarded when a player picks up the up-card.
  - Supports optional `playerCards` array in InitialState to preserve the initial hands dealt to each player.
  - Backward compatible with V2 data; discard and playerCards are omitted when not present.
- **CLI Tools Enhanced**:
  - All CLI tools now support `--version` and `-v` flags to display version information.
  - Updated help text across all tools to include version badges (e.g., "egn-convert CLI (v1.2.0)").
  - Automatic version detection improved to select optimal binary format (V1, V2, or V3) based on present features.

### Fixed
- **Validation Compliance**: External EGN file validation suite now passes at 100% (42/42 real files), resolving edge cases with empty phase arrays.

### Removed
- **Redundant Metadata Fields**:
  - Removed `kitty` field from Metadata (redundant; can be determined from cards played and refined when the discard from bidding phase is provided).
  - Removed `initialLead` field from Metadata (redundant; the first player to act and lead information is derivable from dealer seat, loner bid, and loner_lead ruleset).

## [1.1.0] - 2026-07-11

This release introduces major updates to support various Euchre game variants, including variable player counts, custom scoring, and lone defenders. It also standardizes the JSON schema and TypeScript models to camelCase property naming conventions (a breaking change for existing 1.0.0 JSON data).

### Added
- **Variant Ruleset Options**:
  - `num_players`: Custom player count (default: `4`), supporting variants from 1 to 8 players.
  - `loner_march_score`: Custom score awarded to a team when a player goes alone and wins all tricks (default: `4`).
  - `loner_euchred_score`: Custom score awarded to defenders when a lone bidder is euchred (default: `2`).
  - `defend_alone`: Boolean flag indicating if a player can defend alone against a lone bidder (default: `false`).
- **Player Tracking with External IDs**:
  - Enhanced `players` array in Metadata to support both simple player names (string) and rich player objects with external ID tracking.
  - New `PlayerObject` format: `{ "name": "Player Name", "playerIds": [{ "id": "player-123", "source": "platform-name" }, ...] }`
  - Enables tracking of the same player across multiple game platforms and systems (e.g., Euchre.com user IDs, tournament registration IDs, etc.).
  - Supports any number of external ID systems via the `playerIds` array.
- **Phase Fields**:
  - `aloneDefender`: Seat index of the defender who chooses to play alone against a lone bidder, or `-1` if no one is defending alone. Only applicable when `defend_alone` is enabled in the ruleset.
- **Binary Bitstream Format (Version 2)**:
  - Added new 4-bit version header `0010` (Version 2) to support variant settings.
  - Expanded **Dealer Seat** representation to 3 bits (supporting up to 8 players).
  - Added **Num Players** field (3 bits) encoding `numPlayers - 1` (supporting 1 to 8 players).
  - Added **Min Rank Code** field (2 bits) to support alternate deck sizes:
    - `00`: Rank 9 (24-card deck)
    - `01`: Rank 8 (28-card deck)
    - `10`: Rank 7 (32-card deck)
    - `11`: Rank 6 (36-card deck)
  - Added bitpacking support for `aloneDefender` seat indices inside the Bidding Phase payload.
  - Added support for branching on mid-bidding and mid-trick plays in alternative lines.

- **CLI & Utilities**:
  - Added `egn-bitpack-deal` command-line utility (defined in [cli-bitpack.ts](file:///c:/Users/Rob/Desktop/Desktop%202/Rob/Coding%20Projects/EuchreGameNotation/euchre-game-notation/src/cli-bitpack.ts)) to compress and decompress EGN JSON strings to/from hexadecimal bitstream formats directly via the terminal.
  - Added `egn-baseline` command-line utility (defined in [cli-baseline-egn.ts](file:///c:/Users/Rob/Desktop/Desktop%202/Rob/Coding%20Projects/EuchreGameNotation/euchre-game-notation/src/cli-baseline-egn.ts)) for extracting baseline EGN files and generating deterministic SHA256 hashes by stripping all analysis-only properties (`playAnnotations`, `callAnnotations`, `alternativeLines`).
  - **Automatic Version Detection**: The converter automatically selects the optimal bitstream format (V1, V2, or V3) based on the features present in the EGN data, ensuring compact encoding while preserving all necessary information.
- **New Example Notation Files**:
  - Added [Custom Scenario.egn](file:///c:/Users/Rob/Desktop/Desktop%202/Rob/Coding%20Projects/EuchreGameNotation/euchre-game-notation/examples/Custom%20Scenario.egn) demonstrating custom configuration variants.
  - Added [Me and Bears.egn](file:///c:/Users/Rob/Desktop/Desktop%202/Rob/Coding%20Projects/EuchreGameNotation/euchre-game-notation/examples/Me%20and%20Bears.egn) showing a complete match record.
  - Added [Quite the Hustle Annotated.egn](file:///c:/Users/Rob/Desktop/Desktop%202/Rob/Coding%20Projects/EuchreGameNotation/euchre-game-notation/examples/Quite%20the%20Hustle%20Annotated.egn) containing rich comments.
- **Documentation**:
  - Created [annotations.md](file:///c:/Users/Rob/Desktop/Desktop%202/Rob/Coding%20Projects/EuchreGameNotation/euchre-game-notation/docs/annotations.md) detailing Chess-style bracket labels (e.g. `[??]`, `[?]`, `[!]`, etc.) for game analysis commentary.

### Changed (Breaking Changes)
- **camelCase Property Standardization**:
  - Renamed property names in the EGN schema, TypeScript types, and bitpacker/converter/validator from snake_case to camelCase:
    - `matchId` $\rightarrow$ `gameId` (in Metadata)
    - `player_cards` $\rightarrow$ `playerCards` (in InitialState)
    - `card_exchanges` $\rightarrow$ `cardExchanges` (in BiddingPhase)
    - `calls_annotations` $\rightarrow$ `callAnnotations` (in BiddingPhase)
    - `tricks_annotations` $\rightarrow$ `playAnnotations` (in TrickPlayPhase)
    - Internal JSON schema definitions updated (e.g., `card_list` $\rightarrow$ `cardList`).
- **Removed Restrictions**:
  - Removed restrictive validation checks (such as `minItems`/`maxItems` and index limits) that strictly assumed 4 players or exactly two teams.

### Fixed
- Fixed a bug in the bitpacker that improperly handled alternative branching lines.
- Fixed a bug in processing bidding binaries where bitwise alignments caused misread calls.
- Resolved and aligned repository metadata, stylesheets, and documentation links.

## [1.0.0] - 2026-06-25

Initial release of the Euchre Game Notation (EGN) specification and utility library.

### Added
- Standard JSON schema definitions for `.egn` files.
- Binary serialization/deserialization for condensed representation.
- CLI converter utility (`egn-convert`).
- Basic validator and converter implementation.
- Support for alternate lines (branching) and annotations.
- Initial set of example games and documentation.
