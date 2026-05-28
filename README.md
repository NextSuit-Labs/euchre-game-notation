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
4. **Phase Interrupts** (Optional infrastructure to log mid-hand infractions like renegs or misdeals).

---

## 🛠️ File Structure Example (EGN v1.0.0)

Under the hood, an `.egn` file utilizes human-readable, web-native JSON structural primitives:

```json
{
  "fileType": "Euchre Game Notation",
  "version": "1.0.0",
  "metadata": {
    "matchId": "egn_m_20260528_01",
    "title": "Detroit League - Finals Game 2",
    "description": "Championship bracket match recorded live from local venue stream.",
    "players": ["Alex", "Sarah", "Chris", "Taylor"],
    "initialScore": [0, 0]
  },
  "deals": [
    {
      "dealNumber": 1,
      "initialState": {
        "dealer": 3,
        "upCard": "J♦"
      },
      "phases": [
        {
          "phaseNumber": 1,
          "type": "EUCHRE_BIDDING",
          "calls": ["Pass", "Pass", "Pass", "Order"],
          "isAlone": false,
          "discard": "9♠"
        },
        {
          "phaseNumber": 2,
          "type": "TRICK_PLAY",
          "tricks": [
            ["A♣", "10♣", "9♣", "K♣"],
            ["Q♦", "9♦", "A♦", "J♦"],
            ["J♥", "10♦", "K♦", "A♠"],
            ["A♥", "K♥", "10♥", "9♥"],
            ["Q♥", "Q♠", "J♠", "10♠"]
          ]
        }
      ]
    }
  ]
}
