# Determinism of Euchre Game Notation (EGN)

Euchre Game Notation (EGN) relies on the philosophy of **Deterministic Minimalism**. This means that an `.egn` file only stores the raw, unpredictable actions of a game (the rules, the initial score, the deal, the bids, the cards played, etc.). All other game states, such as who won a trick, whose turn it is, and the current score, must be calculated by the parsing engine using the indicated ruleset.

This document outlines the standard deterministic rules a parser must apply when reading an `.egn` file.

## 1. Trump Determination
Trump is determined by the `calls` array in the `EUCHRE_BIDDING` phase.
* **Round 1:** If a player calls `"Order"`, the suit of the `upCard` becomes trump.
* **Round 2:** If all players pass in Round 1, the `upCard` is turned down. If a player calls a suit (`"s"`, `"h"`, `"d"`, `"c"`), that suit becomes trump. If no_trump is allowed, the call is indicated as (`"n"`). If the call is unknown, it is indicated as (`"x"`).
* If all players pass in both rounds, the hand is a throw-in (unless the `std` rule is true, forcing the dealer to call a suit).

## 2. Trick Leading
The lead for each trick dictates the base suit that other players must follow if able.
* **First Trick:** The initial lead defaults to the player to the left of the dealer (e.g., `(dealer + 1) % 4`). If the `loner_lead` rule is active and a player called a Loner, the lead might shift depending on the specific ruleset.
* **Subsequent Tricks:** The winner of trick *N* is always the lead for trick *N+1*.

## 3. Trick Evaluation (Winning a Trick)
To determine the winner of a trick, a parser must evaluate the cards played based on the lead suit and the trump suit.

### Card Rankings (High to Low)
* **Trump Suit:** Joker/Benny (If playing with one), Right Bower (Jack of Trump), Left Bower (Jack of the same color as Trump), A, K, Q, 10, 9.
    * *Note:* The Left Bower is considered a card of the trump suit, NOT its original suit, for the duration of the hand.
* **Lead Suit (if not trump):** A, K, Q, J (if not Left Bower), 10, 9.
* **Off-Suit:** Any card that is neither trump nor the lead suit has no value and cannot win the trick.

### Winner Calculation
1. If any trump cards were played, the highest-ranking trump card wins.
2. If no trump cards were played, the highest-ranking card of the **lead suit** wins.

## 4. Score Calculation
At the end of the `TRICK_PLAY` phase, the parser counts the number of tricks won by each team (Team 0/2 vs. Team 1/3) to determine the score mutation.
* **The "Makers"** are the team of the player who called trump.
* **The "Defenders"** are the opposing team.

### Standard Scoring
* **Makers win 3 or 4 tricks:** 1 point.
* **Makers win 5 tricks:** 2 points.
* **Makers win 5 tricks (Alone):** Points equal to `loner_march_score` (default: 4). Requires `isAlone: true` in the bidding phase.
* **Defenders win 3 or more tricks (Euchred):** 2 points.
* **Loner is Euchred (Defenders win 3+ tricks against a loner):** Points equal to `loner_euchred_score` (default: 2).