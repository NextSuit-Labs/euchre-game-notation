# Future Features & Roadmap

This document outlines planned improvements, optimization opportunities, and future feature ideas for the Euchre Game Notation (EGN) & Euchre Match Notation (EMN) specifications and JavaScript/TypeScript library.

---

## 🟢 Released Features (v1.4 & v1.5)

*Non-breaking enhancements, schema updates, DX polish, and helper additions.*

### 1. Flexible Metadata Date Formats (Implemented in v1.5.0)
- **Location**: `schemas/egn-schema-v1.json`, `schemas/emn/emn-schema-v1.json`, `test/validator.test.ts`, `test/emn/validator.test.ts`
- **Description**: EGN 1.5 and EMN 1.2 schemas now support date-only strings (`YYYY-MM-DD` like `2026-08-11`) and blank `""` date strings in metadata alongside full ISO 8601 date-times (`YYYY-MM-DDTHH:mm:ssZ`).

### 2. Add `isEmnFile` Type Guard (Implemented in v1.4.5)
- **Location**: `src/emn/validator.ts`
- **Description**: Added type guard function matching `isEgnFile`:
  ```typescript
  export function isEmnFile(data: unknown): data is EmnFile {
    return validateEmn(data).isValid;
  }
  ```

### 3. Modern Package `exports` Map (Implemented in v1.4.5)
- **Location**: `package.json`
- **Description**: Added modern subpath exports map so Node.js and bundlers resolve both top-level (`"euchre-game-notation"`) and subpath imports (`"euchre-game-notation/emn"`) cleanly:
  ```json
  "exports": {
    ".": {
      "types": "./dist/src/index.d.ts",
      "default": "./dist/src/index.js"
    },
    "./emn": {
      "types": "./dist/src/emn/index.d.ts",
      "default": "./dist/src/emn/index.js"
    },
    "./package.json": "./package.json"
  }
  ```

### 4. Out-of-Bounds Protection in `extractEgnFromEmn` (Implemented in v1.4.5)
- **Location**: `src/emn/extractor.ts`
- **Description**: Added bounds protection throwing a clear, friendly error when `gameIndex` is out of bounds or negative.

---

## 🟡 Minor Releases Roadmap (v1.6.x)

*Backward-compatible feature additions, extended validation, and performance options.*

### 1. Semantic Match Format Validation in `validateEmn`
- **Location**: `src/emn/validator.ts`
- **Description**: Enforce format-specific validation rules:
  - For `BEST_OF_N`: Target must be a positive odd integer (e.g. 1, 3, 5, 7).
  - For `TARGET_SCORE`: Target must be a positive score threshold (e.g. 10, 21, 50).
  - For `FIXED_GAMES`: Target must be a positive integer matching the game count.

### 2. Automatic Deal Bitpacking inside `.emnb` Binary Conversions (Implemented in v1.4.5)
- **Location**: `src/emn/converter.ts`
- **Description**: Added `EmnBinaryOptions` interface (`{ condenseGames?: boolean }`) allowing `emnToBinary(emnFile, options)` (and `convertEmnJsonToBin`, `convertEmnFileToBinData`) to automatically bitpack embedded EGN sub-game deal objects into condensed base64 strings before Protobuf encoding, achieving up to 60-70% binary size reduction for multi-game match series. Supported in CLI via `--expanded` / `--no-condense`.

### 3. Non-Blocking Async Batch APIs
- **Location**: `src/emn/combiner.ts` / `src/emn/extractor.ts`
- **Description**: Provide `combineEgnToEmnAsync` and `extractAllEgnsFromEmnAsync` (or progress callback hooks) to support large tournament match processing (e.g., 100+ games) without blocking the browser UI main thread.

---

## 🔴 Major Release Roadmap (v2.0.0)

*Future breaking changes, architectural shifts, and schema evolution.*

### 1. Deprecated Symbol & Legacy Schema Removal
- Remove legacy v1.0 uppercase aliases (`EGNFile`, `validateEGN`, `isEGNFile`).
- Remove support for legacy EMN v1.0 format (`games[].players` instead of `playersOverride`).

### 2. Dual Pure ESM & CommonJS Bundling
- Transition build infrastructure to dual target output (`.mjs` / `.cjs`) via `tsup` or `rollup` for optimal tree-shaking in modern web bundlers (Vite, Webpack 5, Next.js, Turbopack).

### 3. Extended Rulesets & Formats
- Extend EGN specification to support 3-player Cutthroat Euchre or custom team structures while maintaining backward compatibility for standard 4-player 2-team Euchre.
