# EGN Condensed Binary Format Specification (v0, v1, v2, & v3)

This document describes the binary representation of Euchre Game Notation (EGN) files in **Condensed Mode**. 

Condensed mode encodes the full bidding and card play history of individual deals into compact, Base64URL-encoded bitstreams. This document details the bit-level structure, encoding rules, and deck tracking requirements for **Version 0** (legacy), **Version 1** (standard), **Version 2** (extended alternate rules), and **Version 3** (discard/playerCards preservation).

---

## 🔍 0. Magic Byte Header & Format Detection

All EGN binary files (`.egnb`) begin with a single-byte **magic byte** header that identifies the serialization format. This header enables automatic detection without requiring external metadata.

| Byte | Format | Description |
| :--- | :--- | :--- |
| `0x00` | **Expanded** | Full EGN JSON structure serialized using Protobuf |
| `0x01` | **Condensed** | Base64URL-encoded bitpacked deals (this document) |

### Encoding & Decoding

* **Encoding**: When creating a binary file, prepend the magic byte to the serialized payload.
  * Condensed: `[0x01] + [protobuf-encoded condensed message]`
  * Expanded: `[0x00] + [protobuf-encoded expanded message]`

* **Decoding**: Read the first byte to determine format, then skip it before deserializing the remaining Protobuf payload.
  * If the first byte is `0x00` or `0x01`, skip it and proceed with Protobuf decoding.
  * If the first byte is neither, the file is legacy (pre-magic byte format) and should default to condensed format.

### File Extensions

| Extension | Format | Description |
| :--- | :--- | :--- |
| `.egnb` | **Condensed** (default) | Base64URL bitpacked deals — most compact |
| `.expanded.egnb` | **Expanded** | Full Protobuf-serialized EGN structure |

### CLI Usage

The EGN CLI automatically detects the format from the magic byte:

```bash
egn-convert game.egnb game.json
# Automatically detects "condensed" or "expanded" from magic byte
# Displays: "Format auto-detected: condensed"
```

### Programmatic Usage

The library exposes the same magic-byte aware conversion logic for both file-based Node.js workflows and browser-safe in-memory workflows.

* **Node.js file helpers**:
   * `convertEgnJsonToBin(egnJson, outPath, condensed)`
   * `convertBinToEgnJson(binPath, condensed?)`
   * `detectBinaryFormat(binPath)`
* **In-memory helpers**:
   * `convertEgnJsonToBinData(egnJson, condensed)`
   * `convertBinDataToEgnJson(binData, condensed?)`
   * `convertEgnFileToBinData(egnFile, condensed)`
   * `convertBinDataToEgnFile(binData, condensed?)`
   * `detectBinaryFormatFromData(binData)`

When the `condensed` flag is omitted during decoding, the converter reads the first byte and automatically chooses expanded (`0x00`) or condensed (`0x01`) mode. Legacy binaries without a magic byte still default to condensed mode.

### Validation and Safety Limits

All converter entry points enforce the same safety checks regardless of whether they are used from Node.js file paths or in-memory browser data.

* **Schema validation after decode**: Binary decode validates the reconstructed `EGNFile` before returning it.
* **Schema validation before encode**: Binary encode validates the input `EGNFile` before serializing it.
* **Numeric-only annotation keys**: Annotation maps such as `callAnnotations` and `playAnnotations` only accept numeric keys.
* **Binary size cap**: Binary inputs and outputs are limited to **8 MiB**.

These checks make the converter fail fast on malformed, non-conformant, or oversized payloads instead of returning partially trusted data.

---

## ⚡ 1. Overview & Base64URL Encoding

A condensed deal is represented as a string using the **Base64URL** alphabet (RFC 4648) with no padding (`=`). 

To reconstruct the data:
1. Decode the Base64URL string into a raw byte array.
2. Read the byte array as a continuous stream of bits (MSB to LSB).
3. Align the bits to the field definitions described below.
4. Any leftover bits at the end of the stream are padding `0`s (rounded up to the nearest byte boundary).

---

## 🏗️ 2. Version 1 Bitstream Structure

The bitstream of a Version 1 deal consists of a **Header**, **Main Phase Payload**, **Alternative Lines Payload**, and an **End Marker**.

| Field Name | Bit Width | Description |
| :--- | :--- | :--- |
| **Version Header** | 4 bits | Always `0001` (denoting Version 1). |
| **Dealer Seat** | 3 bits | Dealer index: `0` (South), `1` (West), `2` (North), `3` (East). |
| **Up-Card** | Variable | Index of the up-card in the initial remaining deck (see Section 5). |
| **Num Phases** | 3 bits | Total number of bidding and play phases (e.g. `2`). |
| **Phases** | Variable | Sequence of phase payloads (see Section 2.1). |
| **Has Alt Lines** | 1 bit | `1` if the deal has alternative branching lines, `0` otherwise. |
| **Alt Lines Payload** | Variable | List of alternative lines (only if `Has Alt Lines == 1`, see Section 2.2). |
| **End Marker** | 4 bits | Always `1010` (used to separate payload from trailing base64 padding `0`s). |

---

### 📥 2.1. Phase Payloads

Each phase starts with a **Phase Type** bit:
* `0`: Bidding Phase
* `1`: Trick Play Phase

#### Bidding Phase Payload (`0`)
1. **Bidding Decisions Loop**:
   Iterate clockwise from the dealer's left (up to 4 seats).
   * For each seat, read 1 bit:
     * `1`: Calls **Order** (first round) or another suit (second round). The loop terminates immediately.
     * `0`: Calls **Pass**.
2. **Second Round Bidding** (only if all 4 seats passed in the first round):
   Iterate clockwise from the dealer's left (up to 4 seats).
   * For each seat, read `2` bits representing the choice:
     * `0`: **Pass**.
     * `1-3`: Index of the called suit mapping to the remaining 3 suits (excluding the turned-down up-card's suit in alphabetical order: `c`, `d`, `h`, `s`). The loop terminates immediately.
3. **Go Alone**: 1 bit (`1` for alone, `0` otherwise).
4. **Annotations**: Optional bidding comments (see Section 6).

#### Trick Play Phase Payload (`1`)
1. **Num Tricks**: 3 bits (number of tricks, up to 5).
2. **Played Cards Loop**:
   Iterate through each trick. For each trick:
   * Read `cardsPerTrick` cards sequentially. `cardsPerTrick` is `3` if the bidding phase was marked `isAlone`, otherwise `4`.
   * Each card is read as a variable-width integer indexing into the `cardsRemaining` array (see Section 5).
3. **Annotations**: Optional play comments (see Section 6).

---

### 🌿 2.2. Alternative Lines Payload

If **Has Alt Lines** is `1`, the alternative lines are decoded as follows:
1. **Num Alternative Lines**: 8 bits (up to 255 alternative paths).
2. **Alternative Lines Loop**:
   For each alternative line:
   * **Branch Index**: 16 bits (0-based decision index mapping to the action index in the main line).
   * **Num Alternative Phases**: 4 bits (number of phases in the branching path).
   * **Phases Loop**:
     For each alternative phase:
     * Read **Phase Type** bit (`0` or `1`).
     * Decode bidding or trick play phase exactly as in main line.
     * *Note on Mid-Bidding Branches*: If the alternative line branches during a bidding phase (i.e. `branchIndex` is less than the total number of bidding decisions in the main line), the bidding phase in the alternative line begins decoding at `startActionIndex = branchIndex`. Bidding decisions in the main line prior to `branchIndex` are skipped, and the loops for Round 1 and Round 2 bidding are adjusted to decode only the remaining decisions.
     * *Note on Mid-Trick Branches*: If the alternative line branches mid-trick in a play phase (e.g. `branchPlayIndex % cardsPerTrick > 0`), the first trick of the alternative play phase contains only the remaining cards needed to complete that trick (`cardsPerTrick - (branchPlayIndex % cardsPerTrick)`). The decoder adjusts the loop limit for the first trick accordingly.

---

## 🏗️ 3. Version 2 Bitstream Structure (Extended Rules)

Version 2 extends the header to support variable player counts (1–8), alternate deck sizes (24, 28, 32, or 36 cards), and the `aloneDefender` feature.

| Field Name | Bit Width | Description |
| :--- | :--- | :--- |
| **Version Header** | 4 bits | Always `0010` (denoting Version 2). |
| **Dealer Seat** | 3 bits | Dealer index (`0-7` to support up to 8 players). |
| **Num Players** | 3 bits | Value encoded is `numPlayers - 1` (covers range of 1–8 players). |
| **Min Rank Code** | 2 bits | Determines the lowest rank in the deck:<br>`00`: Rank 9 (24-card)<br>`01`: Rank 8 (28-card)<br>`10`: Rank 7 (32-card)<br>`11`: Rank 6 (36-card) |
| **Up-Card** | Variable | Index of the up-card in the initial dynamic remaining deck (see Section 5). |
| **Num Phases** | 3 bits | Total number of bidding and play phases. |
| **Phases** | Variable | Sequence of phase payloads (see Section 3.1). |
| **Has Alt Lines** | 1 bit | `1` if the deal has alternative branching lines, `0` otherwise. |
| **Alt Lines Payload** | Variable | List of alternative lines (only if `Has Alt Lines == 1`). |
| **End Marker** | 4 bits | Always `1010`. |

---

### 📥 3.1. Phase Payloads

#### Bidding Phase Payload (`0`)
1. **Bidding Decisions Loop**:
   Iterate clockwise from the dealer's left (up to `numPlayers` seats).
   * For each seat, read 1 bit:
     * `1`: Calls **Order** (first round) or another suit (second round). The loop terminates immediately.
     * `0`: Calls **Pass**.
2. **Second Round Bidding** (only if all `numPlayers` seats passed in the first round):
   Iterate clockwise from the dealer's left (up to `numPlayers` seats).
   * For each seat, read `2` bits representing the choice:
     * `0`: **Pass**.
     * `1-3`: Index of the called suit mapping to the remaining 3 suits (excluding the turned-down up-card's suit in alphabetical order: `c`, `d`, `h`, `s`). The loop terminates immediately.
3. **Go Alone**: 1 bit (`1` for alone, `0` otherwise).
4. **Alone Defender** (only if Go Alone is `1`):
   * **Has Defender**: 1 bit (`1` if a defender is defending alone, `0` otherwise).
   * **Defender Seat**: 3 bits (only if Has Defender is `1`). Seat index of the defender (`0-7`).
5. **Annotations**: Optional bidding comments (see Section 6).

#### Trick Play Phase Payload (`1`)
1. **Num Tricks**: 3 bits (number of tricks).
2. **Played Cards Loop**:
   Iterate through each trick. For each trick:
   * Read `cardsPerTrick` cards sequentially:
     * **Normal**: `numPlayers` cards.
     * **Maker Alone**: `numPlayers - 1` cards (maker's partner sits out).
     * **Maker + Defender Alone**: `numPlayers - 2` cards (both partners sit out).
   * Each card is read as a variable-width integer indexing into the dynamic `cardsRemaining` array (see Section 5).
3. **Annotations**: Optional play comments (see Section 6).

---

## 🏗️ 4. Version 3 Bitstream Structure (Optional State Preservation)

Version 3 extends Version 2 to optionally preserve game state details that can be recalculated from other data but are valuable to preserve exactly as they occurred:
- **Discard**: The card discarded by the picker when picking up the up-card.
- **Player Cards**: The initial hands dealt to each player before any cards are played.

The header is identical to Version 2, but **Bidding Phase Payload** and **Initial State** encoding are extended.

| Field Name | Bit Width | Description |
| :--- | :--- | :--- |
| **Version Header** | 4 bits | Always `0011` (denoting Version 3). |
| **Dealer Seat** | 3 bits | Dealer index (`0-7` to support up to 8 players). |
| **Num Players** | 3 bits | Value encoded is `numPlayers - 1` (covers range of 1–8 players). |
| **Min Rank Code** | 2 bits | Determines the lowest rank in the deck (same as Version 2). |
| **Up-Card** | Variable | Index of the up-card in the initial dynamic remaining deck. |
| **Initial Player Cards** | Variable | Optional preserved initial hands (see Section 4.1). |
| **Num Phases** | 3 bits | Total number of bidding and play phases. |
| **Phases** | Variable | Sequence of phase payloads with extended bidding (see Section 4.2). |
| **Has Alt Lines** | 1 bit | `1` if the deal has alternative branching lines, `0` otherwise. |
| **Alt Lines Payload** | Variable | List of alternative lines (only if `Has Alt Lines == 1`). |
| **End Marker** | 4 bits | Always `1010`. |

### 🎯 4.1. Initial Player Cards (Optional State Preservation)

Immediately after the **Up-Card** field:

1. **Has Player Cards**: 1 bit (`1` if initial hands are preserved, `0` otherwise).
2. **Player Cards Payload** (only if Has Player Cards is `1`):
   * **Num Players with Cards**: 3 bits (number of players whose initial cards are recorded).
   * **Player Cards Loop**:
     For each player:
     * **Num Cards**: 4 bits (number of cards in this player's initial hand, typically 5 for a standard game, up to 8 for variants).
     * **Cards Loop**:
       For each card:
       * Read card index from the initial full deck (using $\lceil \log_2(\text{deckSize}) \rceil$ bits).
       * Note: Cards in player hands are **not** removed from the dynamic `cardsRemaining` deck used during play encoding. The player cards are purely informational for reconstruction purposes.

### 📥 4.2. Extended Bidding Phase Payload (Version 3)

After the standard Version 2 bidding decisions and `Go Alone` flag:

4. **Discard** (only after successful pickup in bidding phase):
   * **Has Discard**: 1 bit (`1` if a discard is recorded, `0` otherwise).
   * **Discard Card**: Variable bits (only if Has Discard is `1`). Card index in the initial full deck.
5. **Annotations**: Optional bidding comments (see Section 6).

---

## 🕰️ 5. Version 0 Bitstream Structure (Legacy)

Version 0 was used in initial EGN implementations. It has no version header, no annotations, and no alternative lines.

| Field Name | Bit Width | Description |
| :--- | :--- | :--- |
| **Dealer Seat** | 3 bits | Dealer index (`0-3`). |
| **Up-Card** | Variable | Index of the up-card in the initial deck. |
| **Bidding Decisions Loop** | Variable | Decoded exactly like Version 1 bidding. |
| **Go Alone** | 1 bit | `1` for alone, `0` otherwise. |
| **Played Cards Loop** | Variable | Loop of tricks and cards read using the dynamic `cardsRemaining` deck. |

*Note: The parser distinguishes Version 0 from Version 1 & 2 by checking if the first 4 bits are `0001` or `0010`. If they are not, it resets the bit stream reader and decodes as Version 0.*

---

## 🎴 6. Dynamic Deck Tracking (`cardsRemaining`)

To achieve maximum compression, EGN does not write static card bytes. Instead, cards are index-compressed against a dynamic array of remaining cards in the deck (`cardsRemaining`).

1. **Initial Deck**:
   Constructed based on the **Min Rank Code** (Version 2) or standard 24-card deck (Version 0 & 1):
   * Rank 9 (Code `00` / Standard): 24 cards (`9` and up).
   * Rank 8 (Code `01`): 28 cards (`8` and up).
   * Rank 7 (Code `10`): 32 cards (`7` and up).
   * Rank 6 (Code `11`): 36 cards (`6` and up).
   
   All decks are ordered alphabetically by rank then suit:
   ```ts
   // Example standard 24-card deck:
   [
     "9c", "9d", "9h", "9s", "Tc", "Td", "Th", "Ts",
     "Jc", "Jd", "Jh", "Js", "Qc", "Qd", "Qh", "Qs",
     "Kc", "Kd", "Kh", "Ks", "Ac", "Ad", "Ah", "As"
   ]
   ```
2. **Upcard Encoding/Decoding**:
   * Read/write the upcard index as an integer in range `[0, deckSize - 1]` (encoded using $\lceil \log_2(\text{deckSize}) \rceil$ bits).
   * Note that the upcard is **not** immediately removed from the `cardsRemaining` deck. The deck retains all cards at the start of the play phase. If the upcard is actually played during trick play, it is removed at that point like any other card.
3. **Card Encoding/Decoding**:
   * For each card played, read/write its index in the `cardsRemaining` array.
   * The number of bits read/written is determined by $\lceil \log_2(\text{deck length}) \rceil$.
   * Once decoded, the card is removed from `cardsRemaining`.
4. **Alternative Line Simulation**:
   When branching at `branchIndex`, the encoder/decoder simulates the main line plays up to that branch index to compute the exact subset of `cardsRemaining` available at the start of the alternative line.

---

## 💬 7. Annotations Bit-Packing Layout

Annotations map an action index (call index or play index) to a list of commentary strings.

1. **Presence Flag**: 1 bit (`1` if annotations exist, `0` otherwise).
2. **Annotations Map Payload** (only if Presence Flag is `1`):
   * **Count**: 8 bits (number of annotated actions).
   * **Annotated Action Loop**:
     For each annotation:
     * **Action Index**: 8 bits (which call index or play index contains the comment).
     * **Strings Count**: 8 bits (number of comments on this action).
     * **Strings Loop**:
       For each comment string:
       * **String Length**: 16 bits (length of the UTF-8 byte array).
       * **UTF-8 Bytes**: 8 bits per character/byte.
