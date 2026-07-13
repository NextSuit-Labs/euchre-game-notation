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

## 🛠️ File Structure Example (EGN v1.1.0)

Under the hood, an `.egn` file utilizes human-readable, web-native JSON structural primitives:

```json
{
  "fileType": "Euchre Game Notation",
  "version": "1.1.0",
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
        "upCard": "Jd",
        "kitty": ["9h", "Qh", "As"]
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
          "initialLead": 0,
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
        "upCard": "Ah",
        "kitty": ["9d", "Ks", "Ts"]
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
          "initialLead": 2,
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
        "upCard": "9s",
        "kitty": ["As", "Jc", "Js"]
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
          "initialLead": 2,
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

1. **Unknown/Hidden Information (`discard` and `kitty`)**: Depending on how the game data was recorded (e.g., manually transcribed from a live stream vs. exported from a fully observable digital game engine), the dealer's `discard` and the unplayed `kitty` cards might not be known. These properties are optional in the specification and can be omitted if the data is unavailable.
2. **Trick Order and Lead Determination**: The `tricks` array records cards strictly in the chronological order they were dropped on the table. It does not explicitly state which player led each trick. Instead, the lead for the very first trick can be defaulted to the player to the left of the dealer or can be indicated by the `initialLead` property. For all subsequent tricks, the lead is implicitly determined by calculating the winner of the prior trick using standard Euchre rules. This aligns with EGN's philosophy of deterministic minimalism.
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
4. **Alternative Lines (Branching)**: Analysis networks or theoretical branching plays can be specified via the optional `alternativeLines` array on any deal. Each alternative line contains a `branchIndex` (a 0-based decision index representing the point of deviation from the main game flow) and a `phases` list containing alternative Bidding or TrickPlay phases representing the sequence of alternate actions.
5. **Flexible Metadata Fields**:
   * **Player Count**: The `players` array supports any number of player names (instead of being strictly restricted to a size of 4) to accommodate different gameplay variants or incomplete logs.
   * **Flexible Date Formats**: The `date` property supports ISO-8601 date-time strings either with a timezone offset (e.g., `2026-05-17T19:00:00Z` or `+05:30`) or in local timezone-less formats (e.g., `2026-05-30T03:51` or `2026-06-02 19:02`).

---

## 💾 Binary Serialization (Condensed vs. Expanded)

EGN supports two binary serialization modes for storage optimization. For detailed layout details, see the [Condensed Binary Format Specification](docs/binary-format.md).

### ⚡ Condensed Mode (Default)
In condensed mode, the `deals` list is replaced by an array of Base64URL-encoded bitpacked strings. 
* **Version 1 (`0001`)**: The bitstream starts with a 4-bit version header (`0001`). It packs the dealer index (2 bits), up-card, bidding calls, played cards, and directly encodes both **commentary annotations** and **alternative branching lines** into the bitstream, concluding with an explicit ending marker (`1010`) to separate the payload from padding zeros.
* **Backward Compatibility**: Fully compatible with legacy Version 0 bitpacked streams (which lack the version header, annotations, and alternative lines). The parser automatically falls back to Version 0 decoding if the `0001` header is not present.

### 🔍 Expanded Mode
In expanded mode, the entire EGN JSON structure (including metadata, annotations, and alternative lines) is serialized directly into binary using Protobuf.

---

## ⏱️ Partial Games

This format can be used to denote partial games by indicating the initial score in the metadata section and only including the actions up to the point you want to highlight in the game.

---

## 🚀 Applications & Ecosystem

EGN is developed under the **NextSuit Labs** brand (copyrighted by **Write Words - Make Magic LLC**). The following companion applications leverage the EGN standard to analyze, render, and record Euchre games:

* **[Replayer](https://nextsuitlabs.com/replayer.html)**: Interactive desktop-grade replay and analysis board. Load `.egn` files, scrub through bidding and card drops, toggle player perspectives, edit annotations, and study alternate theoretical branching lines.
* **[Logger](https://nextsuitlabs.com/logger.html)**: Real-time speed logger allowing tournament watchers or game coordinators to record live games and immediately compile valid EGN logs.
* **[Renderer](https://nextsuitlabs.com/renderer.html)**: High-fidelity transparent overlay rendering studio and canvas editor for OBS live-stream overlays and broadcast video production.

---

## 🛠️ CLI Utility (`egn-convert`)

The package includes a command-line tool `egn-convert` to convert between human-readable JSON (`.egn`) files and optimized binary Protobuf (`.bin`) representations.

### Installation

Install the package globally using npm:

```bash
npm install -g euchre-game-notation
```

Or run it directly using `npx`:

```bash
npx egn-convert --help
```

### Usage

Convert a JSON EGN file to an optimized condensed binary file:

```bash
egn-convert game.egn game.condensed.bin
```

Convert a JSON EGN file to an expanded binary file:

```bash
egn-convert game.egn game.expanded.bin --expanded
```

Convert a binary file back to a JSON EGN file:

```bash
egn-convert game.condensed.bin game.egn
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
