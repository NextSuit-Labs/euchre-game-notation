# Changelog

All notable changes to the Euchre Game Notation (EGN) specification and utility library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
