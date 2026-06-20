Here is a complete, production-ready README.md for your public repository, fully updated to the EGN (Euchre Game Notation) standard under the Apache 2.0 License.

# Euchre Game Notation (EGN) Specification

**Euchre Game Notation (.egn)** is an open-source, platform-agnostic file format specification designed to capture the complete chronological flow of a competitive Euchre match. 

Inspired by Chess PGN (Portable Game Notation), EGN provides a highly optimized, structured canvas to record the details of a Euchre game.

---

## 💡 Core Philosophy: Deterministic Minimalism

Unlike ad-hoc database schemas or nested JSON models that duplicate real-time game states, EGN operates on a philosophy of **strict rule-engine deduction**. 

An `.egn` file purposefully strips out easily calculated metrics—such as trick winners, scoring mutations, or whose turn it is to lead. A compliant parsing engine hydrates this data into a full match state by applying the deterministic rules of Euchre to four foundational variables:
1. **The initial environment** (Who the dealer is and what card is turned up).
2. **The bidding calls** (Sequential decisions mapped clockwise from the dealer's left).
3. **The chronological play stream** (An array-of-arrays mapping card drops exactly as they hit the table).
4. **Annotations** (Optional infrastructure to log mid-hand annotations for commentary or events like renegs or misdeals).

---

## 🛠️ File Structure Example (EGN v1.0.0)

Under the hood, an `.egn` file utilizes human-readable, web-native JSON structural primitives:

```json
{
  "fileType": "Euchre Game Notation",
  "version": "1.0.0",
  "metadata": {
    "matchId": "egn_m_20260528_01",
    "title": "WEC Finals",
    "description": "Championship bracket match recorded live from local venue stream.",
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
          "discard": "9s"
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
* **`Xx`**: Used to denote an unknown rank or suit (e.g., `"Xc"` for an unknown Club, `"Jx"` for an unknown Jack, or `"Xx"` for a completely unknown card). This is especially useful for incomplete match logs or hidden cards.
* **`tngh`**: Used to denote generic trump (`"t"`), next (`"n"`), green suit 1 (`"g"`) and green suit 2 (`"h"`) for when the actual suit doesn't matter to your scenario
* **`B` (Joker/Benny)**: In rulesets that include a Joker (the "Best Bower" or "Benny"), `"B"` represents the Joker.

---

## 📝 Notation Details

When implementing or parsing EGN, keep the following details in mind:

1. **Unknown/Hidden Information (`discard` and `kitty`)**: Depending on how the match data was recorded (e.g., manually transcribed from a live stream vs. exported from a fully observable digital game engine), the dealer's `discard` and the unplayed `kitty` cards might not be known. These properties are optional in the specification and can be omitted if the data is unavailable.
2. **Trick Order and Lead Determination**: The `tricks` array records cards strictly in the chronological order they were dropped on the table. It does not explicitly state which player led each trick. Instead, the lead for the very first trick can be defaulted to the player to the left of the dealer or can be indicated by the `initialLead` property. For all subsequent tricks, the lead is implicitly determined by calculating the winner of the prior trick using standard Euchre rules. This aligns with EGN's philosophy of deterministic minimalism.

## ⏱️ Partial Games

This format can be used to denote partial games by indicating the initial score in the metadata section and only including the actions up to the point you want to highlight in the game.

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
egn-convert match.egn match.condensed.bin
```

Convert a JSON EGN file to an expanded binary file:

```bash
egn-convert match.egn match.expanded.bin --expanded
```

Convert a binary file back to a JSON EGN file:

```bash
egn-convert match.condensed.bin match.egn
```
