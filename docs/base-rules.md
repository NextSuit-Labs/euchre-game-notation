# Standard Euchre Rules

Euchre is a classic trick-taking card game played with a partner. These standard rules describe the baseline game structure supported by Euchre Game Notation (EGN).

---

## 👥 Players and Partnerships
* **Players:** 4 players.
* **Partnerships:** 2 teams of 2. Partners sit opposite each other (North-South vs. East-West).
* **Objective:** Be the first team to score 10 points (or the score defined in the ruleset).

---

## 🎴 The Deck
Standard Euchre is played with a **24-card deck** consisting of the **9, 10, Jack, Queen, King, and Ace** of each of the four suits (Clubs `c`, Diamonds `d`, Hearts `h`, and Spades `s`).

### Card Rank (Non-Trump Suits)
From highest to lowest:
1. **Ace (A)**
2. **King (K)**
3. **Queen (Q)**
4. **Jack (J)**
5. **Ten (T)**
6. **Nine (9)**

### Card Rank (Trump Suit)
When a suit is called trump, the Jacks become the highest cards in the game:
1. **Right Bower:** The Jack of the trump suit (highest card).
2. **Left Bower:** The Jack of the *other* suit of the same color (e.g., if Hearts are trump, the Jack of Diamonds is the Left Bower). The Left Bower is considered a member of the trump suit for all play purposes.
3. **Ace of Trump**
4. **King of Trump**
5. **Queen of Trump**
6. **Ten of Trump**
7. **Nine of Trump**

---

## 🃏 The Deal
1. The dealer distributes **5 cards** to each player in clockwise order (usually in groups of 2 and 3).
2. The remaining 4 cards are placed face-down in the center. This is called the **kitty**.
3. The top card of the kitty is turned face-up. This is the **up-card**.

---

## 📣 Bidding (Making Trump)
Players bid clockwise starting from the player to the dealer's left (Seat 1). The goal is to determine the trump suit.

### Round 1: Ordering Up
Each player can choose to accept the suit of the up-card as trump:
* **Pass:** The player passes the decision to the next player.
* **Order Up / Take Up:** 
  * If an opponent calls it, they "order it up."
  * If the dealer's partner calls it, they "assist."
  * If the dealer calls it, they "take it up."
  * The dealer accepts the up-card's suit as trump, takes the up-card into their hand, and discards one card face-down to the kitty. Bidding ends immediately.

### Round 2: Calling a New Suit
If all four players pass in Round 1, the up-card is turned face-down, and a second round of bidding begins:
* Each player in clockwise order can choose to call any of the remaining three suits as trump.
* If a player calls a suit, bidding ends immediately.
* **Stick the Dealer:** If all players pass in Round 2, the dealer is forced to choose a trump suit (standard rules).

### Going Alone (`isAlone`)
When making trump (in Round 1 or Round 2), the player who makes the call can declare they are **going alone**.
* The caller's partner discards their hand face-down and sits out for the deal.
* The caller plays the hand alone against the two defenders.

---

## ⚔️ Playing the Hand
The hand consists of **5 tricks**.

1. **The Lead:** The player to the dealer's left leads the first card (unless a loner lead rule shifts this to the player to the left of the loner).
2. **Following Suit:** In clockwise order, players must play a card of the suit led if they have one.
   * *Note on the Left Bower:* If trump is led, the Left Bower must be played if the player has no other trump cards, as it is considered part of the trump suit.
3. **Winning the Trick:** 
   * If any trump cards are played, the highest trump card wins the trick.
   * If no trump cards are played, the highest card of the suit led wins the trick.
   * The player who wins the trick leads the next card.

---

## 📊 Scoring
Points are awarded at the end of the 5 tricks:

| Scenario | Tricks Won | Points Awarded |
|---|---|---|
| **Makers (Standard)** | 3 or 4 tricks | **1 point** |
| **Makers (March)** | 5 tricks | **2 points** |
| **Makers (Loner March)** | 5 tricks (alone) | **4 points** |
| **Defenders (Euchre)** | Defenders win 3+ tricks | **2 points** |
| **Defenders (Loner Euchre)** | Defenders win 3+ tricks against a loner | **2 points** |

The first team to reach **10 points** wins the game.
