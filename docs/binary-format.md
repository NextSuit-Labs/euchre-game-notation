# EGN Condensed Binary Format Specification (v0 & v1)

This document describes the binary representation of Euchre Game Notation (EGN) files in **Condensed Mode**. 

Condensed mode encodes the full bidding and card play history of individual deals into compact, Base64URL-encoded bitstreams. This document details the bit-level structure, encoding rules, and deck tracking requirements for both **Version 0** (legacy) and **Version 1** (current).

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
| **Up-Card** | Variable | Index of the up-card in the initial remaining deck (see Section 4). |
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
   * For each seat, read `3` bits representing the choice:
     * `0`: **Pass**.
     * `1-3`: Index of the called suit mapping to the remaining 3 suits (excluding the turned-down up-card's suit in alphabetical order: `c`, `d`, `h`, `s`). The loop terminates immediately.
3. **Go Alone**: 1 bit (`1` for alone, `0` otherwise).
4. **Annotations**: Optional bidding comments (see Section 5).

#### Trick Play Phase Payload (`1`)
1. **Num Tricks**: 3 bits (number of tricks, up to 5).
2. **Played Cards Loop**:
   Iterate through each trick. For each trick:
   * Read `cardsPerTrick` cards sequentially. `cardsPerTrick` is `3` if the bidding phase was marked `isAlone`, otherwise `4`.
   * Each card is read as a variable-width integer indexing into the `cardsRemaining` array (see Section 4).
3. **Annotations**: Optional play comments (see Section 5).

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
     * *Note on Mid-Trick Branches*: If the alternative line branches mid-trick in a play phase (e.g. `branchPlayIndex % cardsPerTrick > 0`), the first trick of the alternative play phase contains only the remaining cards needed to complete that trick (`cardsPerTrick - (branchPlayIndex % cardsPerTrick)`). The decoder adjusts the loop limit for the first trick accordingly.

---

## 🕰️ 3. Version 0 Bitstream Structure (Legacy)

Version 0 was used in initial EGN implementations. It has no version header, no annotations, and no alternative lines.

| Field Name | Bit Width | Description |
| :--- | :--- | :--- |
| **Dealer Seat** | 3 bits | Dealer index (`0-3`). |
| **Up-Card** | Variable | Index of the up-card in the initial deck. |
| **Bidding Decisions Loop** | Variable | Decoded exactly like Version 1 bidding. |
| **Go Alone** | 1 bit | `1` for alone, `0` otherwise. |
| **Played Cards Loop** | Variable | Loop of tricks and cards read using the dynamic `cardsRemaining` deck. |

*Note: The parser distinguishes Version 0 from Version 1 by checking if the first 4 bits are `0001`. If they are not, it resets the bit stream reader and decodes as Version 0.*

---

## 🎴 4. Dynamic Deck Tracking (`cardsRemaining`)

To achieve maximum compression, EGN does not write static card bytes. Instead, cards are index-compressed against a dynamic array of remaining cards in the deck (`cardsRemaining`).

1. **Initial Deck**:
   Start with a standard 24-card Euchre deck ordered alphabetically by rank then suit:
   ```ts
   [
     "9c", "9d", "9h", "9s", "Tc", "Td", "Th", "Ts",
     "Jc", "Jd", "Jh", "Js", "Qc", "Qd", "Qh", "Qs",
     "Kc", "Kd", "Kh", "Ks", "Ac", "Ad", "Ah", "As"
   ]
   ```
2. **Upcard Removal**:
   * Read the upcard index as an integer in range `[0, 23]` (encoded using 5 bits).
   * Retrieve the upcard from the deck and remove it. The deck now has 23 cards.
3. **Card Encoding/Decoding**:
   * For each card played, read its index in the `cardsRemaining` array.
   * The number of bits read is determined by $\lceil \log_2(\text{deck length}) \rceil$.
   * Once decoded, the card is removed from `cardsRemaining`.
4. **Alternative Line Simulation**:
   When branching at `branchIndex`, the encoder/decoder simulates the main line plays up to that branch index to compute the exact subset of `cardsRemaining` available at the start of the alternative line.

---

## 💬 5. Annotations Bit-Packing Layout

Annotations map an action index (call index or trick index) to a list of commentary strings.

1. **Presence Flag**: 1 bit (`1` if annotations exist, `0` otherwise).
2. **Annotations Map Payload** (only if Presence Flag is `1`):
   * **Count**: 8 bits (number of annotated actions).
   * **Annotated Action Loop**:
     For each annotation:
     * **Action Index**: 8 bits (which call or trick number contains the comment).
     * **Strings Count**: 8 bits (number of comments on this action).
     * **Strings Loop**:
       For each comment string:
       * **String Length**: 16 bits (length of the UTF-8 byte array).
       * **UTF-8 Bytes**: 8 bits per character/byte.
