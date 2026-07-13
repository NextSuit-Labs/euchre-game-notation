# Core Minimal Game Logic for EGN Replayers

Because EGN operates on a philosophy of **strict rule-engine deduction**, it does not explicitly record who played which card for tricks 2–5. Instead, cards are listed in the order they were dropped on the table, starting with the lead player. 

To correctly map cards to player seats for all tricks, a replayer must implement a **minimal rules engine** to determine the winner of each trick (who then leads the next).

This document details the minimal mathematical and logical rules required to achieve this.

A reference implementation split into HTML, CSS, and JS is available at "src/baseline-replayer/".

---

## 📋 The Core Algorithm

At the start of each deal, the replayer initializes `leadSeat = deal.initialState.initialLead` (defaulting to `(dealer + 1) % 4` if not specified). 

For each trick:
1. **Seat Mapping**: Map the 4 cards played in sequence to player seats starting at `leadSeat` clockwise:
   $$\text{PlayerSeat}_i = (\text{leadSeat} + i) \pmod 4$$
2. **Led Suit**: Set `ledSuit = trickCards[0].suit`.
3. **Winner Selection**: Evaluate the strength of the 4 cards based on the **Trump Suit** and **Led Suit**.
4. **Lead Update**: The player seat that played the highest-value card becomes the `leadSeat` for the subsequent trick.

---

## 🧭 Trick 1 Initial Lead Resolution

If the initial lead seat (`initialLead`) is not explicitly defined in the EGN play phase, it must be resolved dynamically by the engine using the dealer and bidding metadata:

### 1. Standard Play (No Loner)
If no player went alone (`isAlone === false`), the initial lead is always the seat to the left of the dealer:
$$\text{InitialLead} = (\text{Dealer} + 1) \pmod 4$$

### 2. Loner Play (`isAlone === true`)
If a player went alone, the partner of the loner sits out ($\text{SitOutSeat} = (\text{LonerSeat} + 2) \pmod 4$). The initial lead is determined by the `loner_lead` ruleset configuration:

* **`LEFT_OF_LONER`**: The lead starts with the active player immediately to the left of the lone caller:
  $$\text{InitialLead} = (\text{LonerSeat} + 1) \pmod 4$$
* **`LEFT_OF_DEALER` (Standard)**: The lead starts with the player left of the dealer, **unless that player is the sitting-out partner**:
  - If the partner of the loner is the player left of the dealer ($(\text{LonerSeat} + 2) \equiv (\text{Dealer} + 1) \pmod 4$, which occurs when the player to the right of the dealer goes alone, e.g. Seat 3 goes alone when Seat 0 is dealer):
    - The partner sits out, so the lead shifts clockwise to the dealer's partner:
      $$\text{InitialLead} = (\text{Dealer} + 2) \pmod 4$$
  - Otherwise, the standard lead applies:
    $$\text{InitialLead} = (\text{Dealer} + 1) \pmod 4$$

---

## 🛠️ Step 1: Determining the Trump Suit

To rank the cards, the engine must first determine which suit is trump by parsing the bidding phase:

1. **Round 1 (Call index 0 to 3)**: Bidding moves clockwise starting left of the dealer. If any seat calls `"Order"`, `"PickUp"`, `"Alone"`, or `"Call"`, the trump suit is the suit of the **upcard** (`deal.initialState.upCard`).
2. **Round 2 (Call index 4 to 7)**: Bidding continues clockwise. If any seat calls a suit symbol (`"s"`, `"h"`, `"c"`, `"d"`), that suit becomes the trump suit.
3. If all players pass, it is a misdeal/all-pass, and no play phase occurs.

### 🎴 Upcard Visual States

Across the bidding phase and play phase, the upcard should be rendered dynamically depending on the current bidding sub-phase and play step:
1. **Initial / Dealt State**: Rendered **face up** (revealing suit and rank).
2. **Bidding Round 1 (Call indices 0 to 3)**: Rendered **face up** (players are deciding whether to order/pickup the upcard).
3. **Bidding Round 2 (Call indices 4 to 7)**: Rendered **face down** (the upcard has been turned down; players are calling a different suit).
4. **Trick Play**: **Hidden/removed** from the table entirely, alongside the dealer indicator (as they are no longer relevant to active card-play mechanics), although showing this information somewhere else can be useful for analysis.

---

## 🃏 Step 2: Bower Logic (Card Rankings)

Euchre alters standard card ranks by elevating Jacks. The **Jack of the trump suit** becomes the highest card (Right Bower), and the **Jack of the same color** becomes the second-highest card (Left Bower).

The Left Bower is considered a member of the **trump suit**, not its printed suit.

### Bower Color Pairs
* Clubs (`"c"`) $\leftrightarrow$ Spades (`"s"`)
* Diamonds (`"d"`) $\leftrightarrow$ Hearts (`"h"`)

```javascript
function getLeftBowerSuit(trump) {
  if (trump === 'd') return 'h';
  if (trump === 'h') return 'd';
  if (trump === 's') return 'c';
  if (trump === 'c') return 's';
  return null;
}
```

---

## 🔢 Step 3: Card Strength Evaluation

To find the winner of a trick, each card played is evaluated against the `ledSuit` and `trumpSuit`. Any card not matching trump or the led suit has a value of `0` (it cannot win the trick).

### Strength Tiers

| Tier | Card Type | Evaluation Logic | Value Range |
|:---:|---|---|:---:|
| **5** | **Right Bower** | Rank is `'J'` and Suit is `trump` | `100` |
| **4** | **Left Bower** | Rank is `'J'` and Suit is same-color as `trump` | `99` |
| **3** | **Trump Cards** | Suit matches `trump` (excluding Right/Left) | `80 + RankValue` |
| **2** | **Led Suit Cards** | Suit matches `ledSuit` (excluding Left Bower) | `40 + RankValue` |
| **1** | **Off-Suit Cards** | Any other card | `0` |

### Rank Values
Standard card ranks are mapped to numeric values:
* `'A'` $\rightarrow 14$
* `'K'` $\rightarrow 13$
* `'Q'` $\rightarrow 12$
* `'J'` $\rightarrow 11$
* `'T'` $\rightarrow 10$
* `'9'` $\rightarrow 9$

### Implementation Example

```javascript
function getCardStrength(card, ledSuit, trump) {
  if (!card) return -1;
  const rank = card[0];
  const suit = card[1].toLowerCase();
  
  // 1. Right Bower
  if (rank === 'J' && suit === trump) {
    return 100;
  }
  
  // 2. Left Bower
  const isLeftBower = rank === 'J' && suit === getLeftBowerSuit(trump);
  if (isLeftBower) {
    return 99;
  }
  
  // 3. Other Trump
  if (suit === trump) {
    const trumpRankValues = { 'A': 14, 'K': 13, 'Q': 12, 'T': 10, '9': 9 };
    return 80 + (trumpRankValues[rank] || 0);
  }
  
  // 4. Led Suit
  if (suit === ledSuit) {
    const ledRankValues = { 'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10, '9': 9 };
    return 40 + (ledRankValues[rank] || 0);
  }
  
  // 5. Off-Suit
  return 0;
}
```

---

## 🏆 Step 4: Trick Winner Determination

The winning card is the card with the highest evaluated strength in the trick.

```javascript
function getTrickWinnerIndex(trickCards, trump) {
  if (!trickCards || trickCards.length === 0) return 0;
  const ledSuit = trickCards[0][1].toLowerCase();
  
  let highestVal = -1;
  let winnerIndex = 0;
  
  trickCards.forEach((card, index) => {
    const val = getCardStrength(card, ledSuit, trump);
    if (val > highestVal) {
      highestVal = val;
      winnerIndex = index;
    }
  });
  
  return winnerIndex; // Index in trickCards (0 to 3)
}
```

The seat index of the trick winner is:
$$\text{WinnerSeat} = (\text{leadSeat} + \text{winnerIndex}) \pmod 4$$

This $\text{WinnerSeat}$ is stored and used as the `leadSeat` for the next trick.

---

## 🃏 Alternate Rules Extensions (Joker / Benny)

If rulesets include a Joker (`"B"`), it behaves as the **Best Bower**:
- It represents the highest card overall (value `101`).
- It is considered a member of the **trump suit**.

If a Joker is led, the led suit is considered **trump**.

---

## 🗃️ Dealt Cards (`playerCards`) Reconstruction

Accurate `playerCards` are not guaranteed to be present in EGN files (for example, in files compiled from tournament live streams where the dealt hands are hidden initially, `playerCards` will be empty or missing).

Replayers can handle this discrepancy in one of two ways:
1. **Hidden UI Representation**: Show player hands in the UI as unknown (e.g. rendering `?` card placeholders or hiding starting hand displays entirely) and only reveal cards as they are played.
2. **Dynamic Back-Calculation**: Reconstruct the starting hands prior to showing the UI by aggregating all cards played by each seat throughout the tricks of the play phase.

### Baseline Replayer Choice
The EGN Baseline Replayer chooses **Option 2 (Dynamic Back-Calculation)**. If `playerCards` is missing or contains empty hands, it runs a pre-compilation scan over the play phase tricks, using the trick-winner rules to map each played card back to its originating seat. This populates the starting hands dynamically, ensuring a full interactive replay experience even for partially observable games.

---

## 🙋 Loner Partner Seat Handling

When a bidding phase includes a player going alone (`isAlone: true`), their partner sits out during the play phase. Replayers must handle their visual representation across both game phases:
1. **Bidding Phase (`INITIAL` and `BID` steps)**: The partner still holds their dealt hand. Since they do not play any cards (and their hand is typically unknown/empty in log files), they should be represented as having **5 unknown cards** (using card-back placeholders `🎴`).
2. **Play Phase (`PLAY` steps)**: The partner has officially set their hand down and is sitting out. The UI should display **"Sitting Out"** in place of their hand.

---

## ⚙️ Supported Rulesets & Constraints

This baseline replayer is designed with a lightweight rules scope. The following outline defines what is supported and what constraints are assumed:

### ✅ Supported Features
* **Player Count**: 4 players only (two teams of two).
* **Stick the Dealer (`std` ruleset flag)**: Supports stick the dealer rules (forcing the dealer to make a call in round 2 of bidding if all other players pass, or letting them pass and ending the deal with no score change).
* **Canadian Loner (`canadian` ruleset flag)**: Fully supports forcing a loner if the dealer's partner orders up.
* **Loner Lead Option (`loner_lead`)**: Supports both `LEFT_OF_LONER` and `LEFT_OF_DEALER` lead seat resolution. When loner_lead = LEFT_OF_LONER, the lead for trick 1 after a loner is called will start to the left of the lone caller, rather than the left of the dealer as it would normally be.
* **Score-Tracking Adaptations**: Supports typical scoring changes for outcomes (including Loner March [4 points] and Loner Euchre [2 points]).

### ❌ Unsupported Configurations (Constraints)
* **No Defend Alone**: Defending team cannot declare "alone" to play single-handed.
* **No Joker / Benny**: The Joker rank (`"B"`) is not supported in the bower/trump hierarchy.
* **No No-Trump**: Bidding No Trump (`"n"`) is not supported.
* **No Farmers Hand / Partner's Best**: Card-exchange variants are not supported.
* **No Going Under / Underdog**: Variant declarations (e.g. exchanging cards or scores for low hands) are ignored.
* **No Fast Break**: Scoring rules related to early trick sweeps (like `fast_break`) are not supported.
* **No Four-Trick Tokens**: Extra point tokens for exactly 4 tricks (`four_trick_tokens`) are ignored.

---

## 📈 Score Payout Logic

To calculate scoring outcomes at the end of each deal, EGN replayers evaluate the trick results based on who called trump (the "Maker" or "Calling Team") and whether they played alone.

### 1. Identifying the Calling Team
The caller's seat is found by matching the bidding calls sequence. Bidding moves clockwise starting to the left of the dealer:
$$\text{CallerSeat} = (\text{Dealer} + 1 + \text{FirstNonPassCallIndex}) \pmod 4$$
* **Team 0**: Players at seat indices `0` and `2`.
* **Team 1**: Players at seat indices `1` and `3`.

The calling team is therefore:
$$\text{CallingTeam} = \text{CallerSeat} \pmod 2$$

### 2. Standard Payout Structure
Once all 5 tricks are played, the replayer tallies the trick wins for the Calling Team ($T_c$) and Defending Team ($T_d$):

| Tricks Won | Caller Loner? | Payout Recipient | Points Awarded | Outcome Description |
|:---:|:---:|:---:|:---:|---|
| **$T_c \in \{3, 4\}$** | Any | Calling Team | **`1` point** | Standard Deal Win |
| **$T_c = 5$** | `false` | Calling Team | **`2` points** | Normal March (Sweep) |
| **$T_c = 5$** | `true` | Calling Team | **`4` points** | Loner March |
| **$T_d \geq 3$** | Any | Defending Team | **`2` points** | Euchred (Defenders Win) |

### 3. Ruleset-Driven Payout Customizations
If a custom ruleset is defined in the EGN metadata, replayers should adjust these standard payouts dynamically:
* **Loner March (`loner_march_score`)**: Replaces the default `4` points payout for a Loner March with the custom value (e.g. `5` or `3`).
* **Loner Euchre (`loner_euchred_score`)**: Replaces the default `2` points payout to the defenders when a loner is euchred with the custom value (e.g. `3` or `4`).

---

## 💡 Advanced EGN Features (Beyond Baseline Replayers)

While baseline replayers focus on parsing and displaying the primary line of play, full-featured EGN analysis engines should implement support for several advanced schema features:

### 1. Alternative Lines (`alternativeLines`)
EGN files can store branching analysis paths or "what-if" scenarios (e.g. demonstrating how a different lead card or bidding decision would play out).
* **Structure**: Stored as an array of `AlternativeLine` objects on a `Deal`. Each alternative line specifies a `branchIndex` (the 0-indexed step number in the main phase array where the branch occurs) and a new list of `Phase` objects representing the alternative timeline.
* **Replayer Logic**: An advanced replayer must detect `alternativeLines`, display a visual "branch icon" or interactive pivot button at the branching step, and allow the user to toggle between the main timeline and the branch.

### 2. Rich Action Annotations
EGN supports step-level commentary within `callAnnotations` and `playAnnotations`.
* **Visual Syncing**: Annotations are keyed by the 0-indexed call/play action index. Replayers should render these annotations in sync with the step scrubber (e.g. as callout boxes or a side-panel timeline).
* **Semantic Prefixes**: Annotations frequently begin with markup indicators:
  - `[!]`: Highlights a great play.
  - `[?]`: Highlights a mistake.

### 3. Custom/Variant Rulesets
Advanced EGN ruleset configurations modify the core card rankings and play mechanics:
* **No Trump (`allow_no_trump`)**: When active, a player can call No Trump (`"n"`). Under No Trump, bower promotions are disabled, and tricks are won strictly by the highest card of the led suit.
* **Joker / Benny (`joker`)**: Integrates the Joker (`"B"`) as the highest-ranking trump card (Right Bower becomes 2nd highest, Left Bower 3rd). If led, the led suit becomes trump.
* **Farmer's Hands (`farmers`) & Go Under (`go_under`)**: Triggers starting hand card-exchanges (typically between a player and the kitty).
* **Partner's Best (`partners_best`)**: Triggers a card exchange between partners when a loner is called.
* **Defend Alone (`defend_alone`)**: Allows a defender to sit their partner out to defend alone against a loner. Replayers must recalculate trick seating clockwise, skipping both sitting-out seats.
