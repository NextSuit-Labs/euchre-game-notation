# Euchre Game Notation (EGN) Specification

**Euchre Game Notation (.egn)** is an open-source, platform-agnostic file format specification designed to capture the complete chronological flow of a competitive Euchre game. 

Inspired by Chess PGN (Portable Game Notation), EGN provides a highly optimized, structured canvas to record the details of a Euchre game.

---

## 💡 Core Philosophy: Deterministic Minimalism

Unlike ad-hoc database schemas or nested JSON models that duplicate real-time game states, EGN operates on a philosophy of **strict rule-engine deduction**. 

An `.egn` file purposefully strips out easily calculated metrics—such as trick winners, scoring mutations, or whose turn it is to lead. A compliant parsing engine hydrates this data into a full game state by applying the deterministic rules of Euchre to four foundational variables:
1. **The initial environment** (Who the dealer is and what card is turned up).
2. **The bidding calls** (Sequential decisions mapped clockwise from the dealer's left).
3. **The chronological play stream** (An array-of-arrays mapping card drops exactly as they hit the table).
4. **Annotations** (Optional infrastructure to log mid-hand annotations for commentary or events like renegs or misdeals).

---

## 🛠️ File Structure Example (EGN v1.2.0)

Under the hood, an `.egn` file utilizes human-readable, web-native JSON structural primitives:

```json
{
  "fileType": "Euchre Game Notation",
  "version": "1.2.0",
  "metadata": {
    "gameId": "egn_m_20260528_01",
    "title": "WEC Finals",
    "description": "Championship bracket game recorded live from local venue stream.",
    "date": "2026-05-17T19:00:00Z",
    "players": ["Player0", "Player1", "Player2", "Player3"],
    "initialScore": [0, 0],
    "ruleset": {
      "std": true,
      "canadian": false,
      "loner_lead": "LEFT_OF_DEALER"
    } 
  },
  "deals": [
    {
      "dealNumber": 0,
      "initialState": {
        "dealer": 3,
        "upCard": "Jd"
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": ["Pass", "Pass", "Pass", "Order"],
          "isAlone": false,
          "discard": "9s",
          "callAnnotations": {
            "3": ["[!]Strong order by Dealer"]
          }
        },
        {
          "phaseNumber": 1,
          "type": "TRICK_PLAY",
          "tricks": [
            ["Ac", "Tc", "9c", "Kc"],
            ["Ah", "Kh", "Th", "Qd"],
            ["Jd", "9d", "Ad", "Kd"],
            ["Jh", "Td", "Ks", "Ts"],
            ["Qc", "Qs", "Js", "Jc"]
          ],
          "playAnnotations": {
            "2": ["[?]Mistake here by Seat 2."]
          }
        }
      ],
      "alternativeLines": [
        {
          "branchIndex": 0,
          "phases": [
            {
              "phaseNumber": 0,
              "type": "EUCHRE_BIDDING",
              "calls": ["Pass", "Pass", "Pass", "Pass", "Pass", "s"],
              "isAlone": true,
              "discard": "9s"
            }
          ]
        }
      ]
    },
    {
      "dealNumber": 1,
      "initialState": {
        "dealer": 0,
        "upCard": "Ah"
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": ["Pass", "Pass", "Order"],
          "isAlone": true,
          "discard": "Kd"
        },
        {
          "phaseNumber": 1,
          "type": "TRICK_PLAY",
          "tricks": [
            ["9d", "Ad", "Ah"],
            ["Qc", "Ac", "9h"],
            ["Jh", "Jc", "Th"],
            ["Jd", "Qs", "Qh"],
            ["As", "Js", "Ts"]
          ]
        }
      ]
    },
    {
      "dealNumber": 2,
      "initialState": {
        "dealer": 1,
        "upCard": "9s"
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": ["Pass", "Pass", "Pass", "Pass", "Pass", "d"],
          "isAlone": false
        },
        {
          "phaseNumber": 1,
          "type": "TRICK_PLAY",
          "tricks": [
            ["Ac", "Tc", "9c", "Kc"],
            ["Qc", "Qd", "Ad", "Ts"],
            ["Ah", "Kh", "9h", "Kd"],
            ["Jd", "9d", "Qh", "Ks"],
            ["Td", "Jh", "Th", "Qs"]
          ]
        }
      ]
     }
  ]
}
```

---

## 🃏 Card Representation

In EGN, cards are primarily represented by a two-character string indicating their rank (Capital letter) and suit (Lowercase letter) (e.g., `"9c"`, `"Ts"`, `"Jd"`, `"Qh"`, `"Kc"`, `"As"`). However, the specification also allows for the following alternative and special representations:

* **`N`**: Can be used as an alternative notation for the 9 rank (e.g., `"Nc"` for the 9 of Clubs).
* **`R` and `L`**: Can be used to explicitly denote the Right and Left Bowers. It is important to note that the Left Bower (`"L"`) always represents the Jack of the same color as the called trump suit.
* **`Xx`**: Used to denote an unknown rank or suit (e.g., `"Xc"` for an unknown Club, `"Jx"` for an unknown Jack, or `"Xx"` for a completely unknown card). This is especially useful for incomplete game logs or hidden cards.
* **`tngh`**: Used to denote generic trump (`"t"`), next (`"n"`), green suit 1 (`"g"`) and green suit 2 (`"h"`) for when the actual suit doesn't matter to your scenario
* **`B` (Joker/Benny)**: In rulesets that include a Joker (the "Best Bower" or "Benny"), `"B"` represents the Joker.

---

## 📝 Notation Details

When implementing or parsing EGN, keep the following details in mind:

1. **Unknown/Hidden Information (`discard`)**: Depending on how the game data was recorded (e.g., manually transcribed from a live stream vs. exported from a fully observable digital game engine), the dealer's `discard` might not be known. This properties are optional in the specification and can be omitted if the data is unavailable.

2. **Trick Order and Lead Determination**: The `tricks` array records cards strictly in the chronological order they were dropped on the table. It does not explicitly state which player led each trick. Instead, the lead for the very first trick can be defaulted to the active player to the left of the dealer (except on loners when loner_lead is set to LEFT_OF_LONER). For all subsequent tricks, the lead is implicitly determined by calculating the winner of the prior trick using standard Euchre rules. This aligns with EGN's philosophy of deterministic minimalism.

3. **Annotations**: Optional commentary infrastructure for bidding or trick play. Annotations are defined under `callAnnotations` (for bidding phases) and `playAnnotations` (for trick play phases) as a map from a decision/trick index to an array of strings (e.g., `{"3": ["Order Up on Jacks", "Maker went alone"]}`). Annotation strings may optionally begin with a **label tag** to classify the quality of a decision:

   | Label  | Meaning                                    |
   |--------|--------------------------------------------|
   | `[??]` | Blunder — a severely bad decision          |
   | `[?]`  | Mistake — a clear error                    |
   | `[?!]` | Dubious — questionable, probably wrong     |
   | `[!?]` | Interesting — creative, but debatable      |
   | `[!]`  | Great play — a solid, correct decision     |
   | `[!!]` | Brilliant play — an excellent decision     |

   For example: `"[??]Throwing trump here lost the hand."` or `"[!!]Perfect lone call."`. See [docs/annotations.md](docs/annotations.md) for full details.

4. **Alternative Lines (Branching)**: Analysis networks or theoretical branching plays can be specified via the optional `alternativeLines` array on any deal. Each alternative line contains a `branchIndex` (a 0-based decision index representing the point of deviation from the main game flow) and a `phases` list containing alternative Bidding or TrickPlay phases representing the sequence of alternate actions. For replayer implementation details, see [docs/replayer-logic.md](docs/replayer-logic.md).

5. **Flexible Metadata Fields**:
   * **Player Count**: The `players` array supports any number of player names (instead of being strictly restricted to a size of 4) to accommodate different gameplay variants or incomplete logs.
   * **Player Objects with External ID Tracking**: Players can be specified as simple strings or as rich player objects containing name and external ID mappings. This enables tracking the same player across multiple platforms and systems:
     ```json
     {
       "players": [
         "Simple Player Name",
         {
           "name": "Player Name",
           "playerIds": [
             { "id": "player-123", "source": "euchre-site" },
             { "id": "tournament-2026-P5", "source": "tournament-registry" }
           ]
         }
       ]
     }
     ```
     This format supports any number of external ID systems, allowing for unified player identification across Euchre websites, tournament registrations, chat community IDs, or custom platform identifiers. See [docs/player-tracking.md](docs/player-tracking.md) for implementation details.
   * **Flexible Date Formats**: The `date` property supports ISO-8601 date-time strings either with a timezone offset (e.g., `2026-05-17T19:00:00Z` or `+05:30`) or in local timezone-less formats (e.g., `2026-05-30T03:51` or `2026-06-02 19:02`).

6. **Variant Rulesets**: For extensive documentation on alternate rules and regional variations supported in EGN, see [docs/alternate-rules.md](docs/alternate-rules.md).

---

## 💾 Binary Serialization (Condensed vs. Expanded)

EGN supports two binary serialization modes for storage optimization. Binary files include a **magic byte** header that enables automatic format detection without external metadata. For complete technical specifications including all version details, see the [Condensed Binary Format Specification](docs/binary-format.md).

### 🔍 Automatic Format Detection

All EGN binary files begin with a single-byte **magic byte** that identifies the format:

* **`0x00`** — Expanded format (Protobuf)
* **`0x01`** — Condensed format (Base64URL bitpacked deals)

When converting binary files to JSON, the CLI automatically detects the format from this header:

```bash
# Format auto-detected from magic byte
egn-convert game.bin game.json
# Output: "Format auto-detected: condensed" (or "expanded")
```

This allows seamless round-trip conversion without requiring the user to specify the format. Legacy binary files without a magic byte will default to condensed format.

### ⚡ Condensed Mode (Default)
In condensed mode, the `deals` list is replaced by an array of Base64URL-encoded bitpacked strings. The format is highly optimized and supports multiple versions:

* **Version 1 (`0001`)**: The standard format featuring a 4-bit version header, dealer index, up-card, bidding calls, played cards, and encodes **commentary annotations** and **alternative branching lines** directly into the bitstream.
* **Version 2 (`0010`)**: Extended format supporting variant rulesets with variable player counts (1-8 players), alternate deck sizes (24, 28, 32, or 36 cards), and the `aloneDefender` feature for defending-alone scenarios.
* **Version 3 (`0011`)**: Premium format extending V2 with optional preservation of game state details like the `discard` (card discarded when picking up the up-card) and `playerCards` (initial hands dealt to each player).
* **Version 0 (Legacy)**: Fully compatible with legacy Version 0 bitpacked streams (which lack the version header, annotations, and alternative lines). The parser automatically falls back to Version 0 decoding if none of the modern headers are detected.
* **Automatic Version Selection**: The converter automatically selects the optimal version (V1, V2, or V3) based on the features present in your EGN data, ensuring compact encoding while preserving all necessary information.

For detailed bit-level specifications, version detection logic, and encoding examples, see [docs/binary-format.md](docs/binary-format.md).

### 🔍 Expanded Mode
In expanded mode, the entire EGN JSON structure (including metadata, annotations, and alternative lines) is serialized directly into binary using Protobuf for maximum compatibility and ease of integration with other systems.

---

## ⏱️ Partial Games

This format can be used to denote partial games by indicating the initial score in the metadata section and only including the actions up to the point you want to highlight in the game.
---

## 🔐 Baseline EGNs

A **baseline EGN** is a deterministic, analysis-free version of a game record. It contains only the essential game flow information by stripping all optional metadata:
- Removes `callAnnotations` (bidding comments)
- Removes `playAnnotations` (trick play comments)
- Removes `alternativeLines` (branching analysis)
- Preserves all game-critical data (bidding, play, ruleset, player info)

Baseline EGNs are useful for:
- **Deduplication**: Identify duplicate game records across systems by comparing baseline hashes
- **Fair Comparison**: Compare game records without being influenced by subjective annotations
- **Validation**: Create canonical hashes of game records for verification and auditing
- **Archival**: Store lightweight versions for long-term record keeping

Each baseline EGN has a deterministic SHA256 hash that remains identical regardless of the source format (condensed or expanded binary). Use the `egn-baseline` CLI tool to generate baseline versions and hashes. For more details, see [docs/determinism-of-egn.md](docs/determinism-of-egn.md).
---

## 🚀 Applications & Ecosystem

EGN is developed under the **NextSuit Labs** brand (copyrighted by **Write Words - Make Magic LLC**). The following companion applications leverage the EGN standard to analyze, render, and record Euchre games:

* **[Replayer](https://nextsuitlabs.com/replayer.html)**: Interactive desktop-grade replay and analysis board. Load `.egn` files, scrub through bidding and card drops, toggle player perspectives, edit annotations, and study alternate theoretical branching lines.
* **[Logger](https://nextsuitlabs.com/logger.html)**: Real-time speed logger allowing tournament watchers or game coordinators to record live games and immediately compile valid EGN logs.
* **[Renderer](https://nextsuitlabs.com/renderer.html)**: High-fidelity transparent overlay rendering studio and canvas editor for OBS live-stream overlays and broadcast video production.

---

## 🛠️ Command-Line Tools

The package includes several command-line utilities for working with EGN files:

### Installation

Install the package globally using npm:

```bash
npm install -g euchre-game-notation
```

Or run tools directly using `npx`:

```bash
npx egn-convert --help
```

### Available Tools

#### `egn-convert` — Format Conversion
Converts between human-readable JSON (`.egn`) files and optimized binary representations.

```bash
# JSON to condensed binary (default, most compact)
egn-convert game.egn game.condensed.bin

# JSON to expanded binary (Protobuf)
egn-convert game.egn game.expanded.bin --expanded

# Binary back to JSON
egn-convert game.condensed.bin game.egn
```

#### `egn-bitpack-deal` — Deal Bitpacking
Compresses specific deals from an EGN file into Base64URL-encoded bitstream strings for analysis or storage.

```bash
# Bitpack all deals
egn-bitpack-deal game.egn

# Bitpack specific deals (comma-separated indices)
egn-bitpack-deal game.egn --deals 0,2,5
```

#### `egn-baseline` — Baseline Generation & Hashing
Extracts "baseline" EGN files by removing all analysis-only properties (`callAnnotations`, `playAnnotations`, `alternativeLines`) and generates deterministic SHA256 hashes. Useful for deduplication, validation, and comparing game records without analysis metadata.

```bash
# Extract baseline and hash a game
egn-baseline game.egn

# Hash only (without output file)
egn-baseline game.egn --hash
```

For details on baseline EGNs and their use cases, see [docs/determinism-of-egn.md](docs/determinism-of-egn.md).

#### `egn-upgrade` — Version Migration
Upgrades older EGN files (v1.0.0, v1.1.0) to the v1.2.0 format by automatically renaming snake_case properties to camelCase, removing redundant fields, and updating the version string.

```bash
# Upgrade in-place
egn-upgrade old-game.egn

# Upgrade to new file
egn-upgrade old-game.egn new-game.egn
```

---

## 💻 Programmatic API Usage

Install the package locally in your project:

```bash
npm install euchre-game-notation
```

### 1. Schema Validation

Ensure an EGN JSON object conforms strictly to the specification:

```typescript
import { validateEGN, isEGNFile, EGNFile } from "euchre-game-notation";

const parsedData = JSON.parse(egnJsonString);

// Option A: Detailed validation result
const result = validateEGN(parsedData);
if (result.isValid) {
  console.log("Valid EGN file!");
} else {
  console.error("Schema validation errors:", result.errors);
}

// Option B: TypeScript Type Guard
if (isEGNFile(parsedData)) {
  const egn: EGNFile = parsedData; // Typecasted automatically
  console.log(`Loaded game: ${egn.metadata.title}`);
}
```

### 2. Serialization & Format Conversion

Convert between JSON strings and binary representations programmatically:

```typescript
import { convertEgnJsonToBin, convertBinToEgnJson } from "euchre-game-notation";

// Convert EGN JSON string to a condensed binary file
convertEgnJsonToBin(egnJsonString, "path/to/output.bin", true);

// Convert a condensed binary file back to a pretty-printed EGN JSON string
const decodedJsonString = convertBinToEgnJson("path/to/output.bin", true);
```
