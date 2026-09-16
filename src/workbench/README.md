# EGN & EMN Developer Workbench

A comprehensive, zero-dependency browser-based workbench and verification suite for **Euchre Game Notation (.egn)** and **Euchre Match Notation (.emn)**.

The workbench allows developers, tournament organizers, and Euchre analysts to validate, convert, bitpack, inspect, combine, and extract game and match notation files entirely client-side.

---

## 🚀 Quick Start (Zero Build Required)

No build step or Node.js server is required to run the workbench. You can open it immediately:

1. **Direct Double-Click**:
   * Double-click [`index.html`](./index.html) to open it directly in Chrome, Edge, Firefox, or Safari.
2. **Local Static Server**:
   ```bash
   # From this directory:
   npx serve .
   # or with Python:
   python -m http.server 8080
   ```

---

## 🛠️ Features & Capabilities

### 1. EGN Single Game Tools
* **JSON Schema Validation**: Validates against the official `egn-schema-v1.json` specification using Ajv. Displays formatted schema errors with JSON pointer paths.
* **Euchre Rules & Gameplay Engine Verification**:
  * Evaluates deal mechanics in real-time.
  * Detects **reneges** (playing off-suit while holding cards in the led suit, reporting the exact held cards).
  * Validates **hand inventory** (verifying that played cards match dealt hands).
  * Enforces **sit-out rules** during loner bids and lone defenses.
  * Validates trick counts, cards per trick, duplicate cards dealt or played, and illegal bidding calls.
* **Protobuf Binary (.egnb) Converter**:
  * Encodes EGN JSON into serialized `.egnb` binary files.
  * Supports both **Condensed** mode (magic byte `0x01` with bitpacked deals) and **Expanded** mode (magic byte `0x00`).
  * Real-time file size comparison and compression metrics.
  * One-click download of generated binary files.
  * Decodes uploaded `.egnb` files back into readable formatted JSON.
* **Deal Bitpacking & Unpacking**:
  * Compresses expanded Deal JSON arrays into compact Base64 strings (`packEgnFile`).
  * Expands compact Base64 strings into readable full Deal JSON objects (`unpackEgnFile`).
* **Baseline Stripper & Canonical Hasher**:
  * Strips analysis annotations, commentary, and alternative lines (`convertToBaselineEgn`).
  * Generates deterministic SHA-256 hashes: **Baseline Hash**, **Game Hash**, and **Full File Hash** with 1-click clipboard copy.
* **Legacy Format Upgrader**:
  * Converts legacy v1.0 and v1.1 files from `snake_case` to standard `camelCase`.
  * Normalizes phase numbering (`0` for bidding, `1` for trick play) and strips obsolete fields (`kitty`, `initialLead`).
* **Direct Replayer Bridge**:
  * Click **"▶ Replay Game"** to launch the current game directly in the interactive [Baseline Replayer](../baseline-replayer/index.html).

---

### 2. EMN Match Series Tools
* **Match Schema & Integrity Validation**:
  * Validates against `emn-schema-v1.json` and referenced EGN schemas.
  * Validates **master player registry** uniqueness (`metadata.players`).
  * Validates **team consistency** (ensures team members exist in the master player pool).
  * Validates **per-game seat assignments** (`games[i].playersOverride`).
  * Validates inline sub-EGN schemas across all match games.
* **Match-Wide Gameplay Engine Validation**:
  * Iterates through every embedded sub-game in the match and executes gameplay rules validation, reporting violations categorized by game and deal.
* **Protobuf Match Binary (.emnb) Converter**:
  * Encodes EMN JSON into serialized `.emnb` binary files (magic byte `0x02`).
  * Supports automatic deal bitpacking across embedded games (`condenseGames`), reducing binary sizes by up to 60–70%.
  * One-click download of `.emnb` files.
  * Decodes uploaded `.emnb` files into EMN JSON.
* **Match Bitpacking**:
  * Batch bitpacks or unpacks deals across all games in the match series.
* **Match Standings & Score Calculator**:
  * Evaluates player and team point totals, game win tallies, and match standings (`calculateEmnScores`).

---

### 3. Cross-Format Suite: Combiner & Extractor
* **EGN to EMN Match Combiner**:
  * Combines multiple individual EGN games into a unified EMN match file (`combineEgnToEmn`).
  * Configurable match formats: `BEST_OF_N`, `PROGRESSIVE`, `ROUND_ROBIN`, `TARGET_SCORE`, `FIXED_GAMES`, and `SINGLE_GAME`.
  * Automatically unifies players into a master registry and calculates match results and winners if sub-games contain final scores.
* **EMN to EGN Game Extractor**:
  * Extracts individual sub-EGN games or all games from an EMN match file (`extractEgnFromEmn`, `extractAllEgnsFromEmn`).
  * Automatically resolves player ID references in seat assignments (`playersOverride`) and substitutes player names into the extracted EGN metadata.

---

## 📁 File Structure

| File | Purpose |
| :--- | :--- |
| **[`index.html`](./index.html)** | Main web interface containing the EGN, EMN, and Combiner/Extractor workspaces. |
| **[`workbench.css`](./workbench.css)** | NextSuit Labs dark-mode glassmorphic stylesheet using Outfit & Fira Code typography. |
| **[`workbench.js`](./workbench.js)** | UI controller wiring up events, drag-and-drop, downloads, and replayer bridges. |
| **[`bundle.js`](./bundle.js)** | Self-contained, zero-dependency browser bundle containing all library logic (`window.EuchreNotation`). |
| **[`browser-shims.js`](./browser-shims.js)** | Client-side shims for Node built-ins (`fs`, `path`) allowing in-memory operations. |
| **[`entry.ts`](./entry.ts)** | TypeScript entry point used by `esbuild` to compile `bundle.js`. |

---

## 🔄 Building & Regenerating the Bundle

The standalone browser bundle `bundle.js` is automatically compiled whenever `npm run build` or `npm test` is executed.

To manually recompile `bundle.js` after editing TypeScript source files:
```bash
npm run build:workbench
```
Or run the generator script directly:
```bash
node generate-workbench-bundle.js
```
