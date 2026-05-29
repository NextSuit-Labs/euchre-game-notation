# Alternate Euchre Rules in EGN

Euchre is a game famous for its local "house rules" and regional variations. To account for this, the Euchre Game Notation (EGN) metadata includes a `ruleset` object. 

By defining these toggles, parsing engines can accurately reconstruct the game state and correctly validate behaviors that would otherwise be illegal in standard play.

Here are the alternate rules supported in EGN v1.0.0:

## `std` (boolean)
**Default:** `true`
Standardizes the baseline rules of the game. When `true`, it commonly enforces **"Stick the Dealer"** (if all players pass during both bidding rounds, the dealer is forced to call a trump suit, preventing a throw-in). 

## `min_rank` (integer)
**Default:** `9`
Defines the lowest card rank in the deck. While standard Euchre uses a 24-card deck (9s and up), some variations use a 32-card deck extending down to 7s (`min_rank: 7`).

## `winning_total` (integer)
**Default:** `10`
Indicates the target score to win the game. If a team ends a hand with more than this many points, they win the game.

## `canadian` (boolean)
**Default:** `false`
Enables the **"Canadian Loner"** rule. Under this rule, if the dealer's partner orders up the `upCard` during the first round of bidding, the partner is forced to play the hand alone (`isAlone: true`).

## `loner_lead` (string)
**Default:** `"LEFT_OF_DEALER"`
Determines who leads the first trick when a player calls a loner (`isAlone: true`).
* `"LEFT_OF_DEALER"`: The lead remains unchanged; the player to the left of the dealer leads.
* `"LEFT_OF_LONER"`: The lead shifts to the player immediately to the left of the player going alone.

## `farmers` (boolean)
**Default:** `false`
Allows a **"Farmer's Hand"**. If a player receives three or more 9s and 10s (the "farm" cards), they can declare it. Depending on the specific house rules, this might force a misdeal or allow them to exchange cards.

## `partners_best` (boolean)
**Default:** `false`
Also known as **"Call for Best"**. When a player calls a loner, this rule allows their partner to pass them their best card face down. The loner then discards one card to bring their hand back to 5 before play begins. This action is recorded in the `EUCHRE_BIDDING` phase using the `card_exchanges` array if known.

## `go_under` (boolean)
**Default:** `false`
Also known as **"Defend the Left"** or **"Bottoms"**. If a player holds a remarkably poor hand (e.g., three 9s and 10s, or no face cards), they may swap three cards with the unrevealed cards in the kitty. This action is recorded in the `EUCHRE_BIDDING` phase using the `card_exchanges` array if known.

## `joker` (boolean)
**Default:** `false`
Introduces the Joker (or "Benny") to the deck as the highest-ranking trump card, beating even the Right Bower. In EGN, the Joker is represented as the card `"B"`.

## `allow_no_trump` (boolean)
**Default:** `false`
Allows players to bid **"No Trump"** during the second round of bidding. In EGN, this is recorded as a `"n"` call in the `calls` array. When No Trump is active, tricks are won strictly by the highest card of the lead suit.

## `fast_break` (boolean)
**Default:** `false`
If the defending team (the team that did not call trump) gets the first two tricks and then loses the last three, the score for that hand is 0 for both teams. The deal proceeds to the next player as normal

## `four_trick_tokens` (boolean)
**Default:** `false`
If the calling team on a non-loner gets exactly 4 tricks, they get a token (in addition to the normal 1 point for 3-4 tricks). If, at any point in the game, they get to 4 tokens, they turn all their tokens in for 1 extra point. This extra point can end the game if it takes them to the winning score.