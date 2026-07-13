# Changelog

All notable changes to the Euchre Game Notation (EGN) specification and utility library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-07-11

This release introduces major updates to support various Euchre game variants, including variable player counts, custom scoring, and lone defenders. It also standardizes the JSON schema and TypeScript models to camelCase property naming conventions (a breaking change for existing 1.0.0 JSON data).

### Added
- **Variant Ruleset Options**:
  - `num_players`: Custom player count (default: `4`), supporting variants from 1 to 8 players.
  - `loner_march_score`: Custom score awarded to a team when a player goes alone and wins all tricks (default: `4`).
  - `loner_euchred_score`: Custom score awarded to defenders when a lone bidder is euchred (default: `2`).
  - `defend_alone`: Boolean flag indicating if a player can defend alone against a lone bidder (default: `false`).
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
