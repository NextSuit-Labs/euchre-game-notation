# EMN Match Format Parameters (`matchFormat.parameters`)

**Applies to:** Euchre Match Notation (EMN) v1.3+ (package `v1.6.6+`)  
**Schema Field:** `metadata.matchFormat.parameters` (`Record<string, string>`, max 64 characters per value)

This document explains the rationale behind `matchFormat.parameters` and provides recommended key conventions and concrete examples across all EMN match types.

---

## 🎯 Design Rationale

### 1. The Match-Level Counterpart to EGN's `metadata.ruleset`
In Euchre Game Notation (EGN), game-level rule variations (e.g., Canadian Loner, Stick the Dealer, Joker, `winning_score`, `num_deals`) live inside `metadata.ruleset` rather than multiplying top-level game types.

In Euchre Match Notation (EMN), `metadata.matchFormat` plays that same role at the match and tournament layer:
- **`type`** defines the macro tournament structure (`DUPLICATE`, `PROGRESSIVE`, `SWISS`, `BEST_OF_N`, etc.).
- **`target`** defines the primary stopping condition (number of games, hands/deals, points, rounds, or minutes).
- **`parameters`** carries optional, orthogonal match-level rules—such as whether contestants are scored as individuals, partnerships, or teams, how standings are calculated, and how tables rotate.

### 2. Avoiding Enum Explosion & Schema Bloat
Variants like *Individual*, *Partnership*, and *Team* are not unique to Duplicate Euchre—they apply equally to `PROGRESSIVE`, `ROUND_ROBIN`, `SWISS`, and `ELIMINATION`. Encoding every combination into `matchFormat.type` (e.g., `DUPLICATE_INDIVIDUAL_MATCHPOINTS`, `DUPLICATE_TEAM_BAM`, `PROGRESSIVE_PARTNERSHIP`) would fragment the enum and bloat validation and Protobuf definitions.

A single optional `map<string, string>` (`parameters`) solves this once with minimal schema surface:
- **Zero breaking changes**: Existing `.emn` and `.emnb` files without `parameters` remain 100% valid.
- **Future-proof**: New tournament directors, leagues, and clubs can express custom tiebreakers or movement rules without waiting for a schema revision.
- **Compact binary serialization**: Maps directly to Protobuf `map<string, string> parameters = 3;` and is omitted entirely when empty.

### 3. Clean Boundary Between Notation and UX
The core EMN primitives (`metadata.players`, `metadata.teams`, `games[].playersOverride`, and `dealNumber`) already capture 100% of the gameplay, seating, and board identity. A replayer can step through every card and trick without `parameters`.

However, when an `.emn` file records final standings in `metadata.result.scores` (for example, `18.5` vs `13.5`), consumers need context to interpret and display those numbers accurately:
- Without `parameters`, a replayer must guess whether the event was Individual, Partnership, or Team by inspecting `metadata.teams`—which breaks if `teams` is used for non-scoring club affiliations—and cannot tell whether scores represent Matchpoints, Board-a-Match, IMPs, or raw game points.
- With `parameters`, loggers, replayers, and automated scoring tools share an explicit, lightweight contract while keeping tournament logistics and UI views in the application layer.

---

## 🔑 Recommended Parameter Keys

Keys and values are convention-based strings (max 64 characters per value). Using `UPPER_SNAKE_CASE` for standardized enum-like values is recommended for consistency across tools.

| Key | Purpose | Common Values |
| :--- | :--- | :--- |
| `unit` | Contestant scoring unit | `"INDIVIDUAL"`, `"PARTNERSHIP"`, `"TEAM"` |
| `scoring` | How match/board scores are calculated | `"WINS"`, `"TOTAL_POINTS"`, `"MATCHPOINTS"`, `"BOARD_A_MATCH"`, `"IMPS"` |
| `movement` | Table/seat rotation scheme | `"MITCHELL"`, `"HOWELL"`, `"RAINBOW"`, `"WINNERS_MOVE"`, `"LOSERS_MOVE"`, `"FIXED"` |
| `tiebreaker` | Primary tiebreaking criterion | `"HEAD_TO_HEAD"`, `"POINT_DIFFERENTIAL"`, `"BUCHHOLZ"`, `"SONNEBORN_BERGER"`, `"PLAYOFF"` |
| `seating` | Seat assignment policy | `"FIXED"`, `"ROTATING"`, `"CROSS_SEATED"` |
| `clockPolicy` | Behavior when a timed match expires | `"FINISH_DEAL"`, `"FINISH_GAME"`, `"HARD_STOP"` |
| `bracket` | Elimination bracket structure | `"SINGLE"`, `"DOUBLE"`, `"CONSOLATION"` |
| `tables` | Number of concurrent tables (as string) | `"2"`, `"4"`, `"8"` |

---

## 📋 Examples by Match Type

### `DUPLICATE`

In `DUPLICATE` matches, `target` is the predetermined number of hands (deals) played per contestant/board set.

#### Individual Duplicate (Matchpoints, Rainbow Movement)
Each player rotates partners every round and is ranked individually by Matchpoints across shared boards.
```json
"matchFormat": {
  "type": "DUPLICATE",
  "target": 12,
  "parameters": {
    "unit": "INDIVIDUAL",
    "scoring": "MATCHPOINTS",
    "movement": "RAINBOW"
  }
}
```

#### Partnership / Pairs Duplicate (Matchpoints, Mitchell Movement)
Fixed 2-player partnerships (listed in `metadata.teams`) compare results against other pairs sitting the same direction (N/S vs. N/S, E/W vs. E/W).
```json
"matchFormat": {
  "type": "DUPLICATE",
  "target": 24,
  "parameters": {
    "unit": "PARTNERSHIP",
    "scoring": "MATCHPOINTS",
    "movement": "MITCHELL"
  }
}
```

#### Team-of-Four Duplicate (Board-a-Match, Cross-Seated)
Two 4-player teams compete across 2 tables (Team A sits N/S at Table 1 and E/W at Table 2), awarding 1 / 0.5 / 0 per board.
```json
"matchFormat": {
  "type": "DUPLICATE",
  "target": 16,
  "parameters": {
    "unit": "TEAM",
    "scoring": "BOARD_A_MATCH",
    "seating": "CROSS_SEATED",
    "tables": "2"
  }
}
```

#### Team-of-Four Duplicate (Total Points / IMPs)
Same 2-table cross-seated layout, scored by cumulative point differential or IMP conversion.
```json
"matchFormat": {
  "type": "DUPLICATE",
  "target": 16,
  "parameters": {
    "unit": "TEAM",
    "scoring": "TOTAL_POINTS",
    "seating": "CROSS_SEATED",
    "tables": "2"
  }
}
```

---

### `PROGRESSIVE`

#### Classic Individual Progressive Euchre
Players rotate tables and switch partners after every round; winners move up and split.
```json
"matchFormat": {
  "type": "PROGRESSIVE",
  "target": 8,
  "parameters": {
    "unit": "INDIVIDUAL",
    "scoring": "TOTAL_POINTS",
    "movement": "WINNERS_MOVE",
    "tiebreaker": "EUCHRES"
  }
}
```

#### Partnership Progressive
Fixed pairs move up or down tables based on game outcome.
```json
"matchFormat": {
  "type": "PROGRESSIVE",
  "target": 6,
  "parameters": {
    "unit": "PARTNERSHIP",
    "scoring": "WINS",
    "movement": "WINNERS_MOVE",
    "tiebreaker": "POINT_DIFFERENTIAL"
  }
}
```

---

### `SWISS`

#### Partnership Swiss Tournament
Pairs are matched by current record each round, using Buchholz (opponents' match points) as the tiebreaker.
```json
"matchFormat": {
  "type": "SWISS",
  "target": 5,
  "parameters": {
    "unit": "PARTNERSHIP",
    "scoring": "WINS",
    "tiebreaker": "BUCHHOLZ"
  }
}
```

---

### `ROUND_ROBIN`

#### Club League Round-Robin
Every partnership plays every other partnership once; ties broken by head-to-head result.
```json
"matchFormat": {
  "type": "ROUND_ROBIN",
  "target": 7,
  "parameters": {
    "unit": "PARTNERSHIP",
    "scoring": "WINS",
    "tiebreaker": "HEAD_TO_HEAD"
  }
}
```

---

### `ELIMINATION`

#### Double-Elimination Championship Bracket
```json
"matchFormat": {
  "type": "ELIMINATION",
  "target": 4,
  "parameters": {
    "unit": "PARTNERSHIP",
    "bracket": "DOUBLE",
    "seating": "FIXED"
  }
}
```

---

### `BEST_OF_N`

#### Championship Best-of-5 Series
```json
"matchFormat": {
  "type": "BEST_OF_N",
  "target": 5,
  "parameters": {
    "unit": "PARTNERSHIP",
    "scoring": "WINS",
    "seating": "ROTATING"
  }
}
```

---

### `TARGET_SCORE`

#### Cumulative 50-Point Race
```json
"matchFormat": {
  "type": "TARGET_SCORE",
  "target": 50,
  "parameters": {
    "unit": "PARTNERSHIP",
    "scoring": "TOTAL_POINTS"
  }
}
```

---

### `TIMED`

#### 45-Minute Timed Session
Players finish the current hand in progress when the clock expires.
```json
"matchFormat": {
  "type": "TIMED",
  "target": 45,
  "parameters": {
    "unit": "PARTNERSHIP",
    "scoring": "TOTAL_POINTS",
    "clockPolicy": "FINISH_DEAL"
  }
}
```

---

### `FIXED_GAMES`

#### 4-Game Social Night Set
```json
"matchFormat": {
  "type": "FIXED_GAMES",
  "target": 4,
  "parameters": {
    "unit": "INDIVIDUAL",
    "scoring": "TOTAL_POINTS",
    "movement": "RAINBOW"
  }
}
```

---

### `CUSTOM`

#### House / League Special Format
```json
"matchFormat": {
  "type": "CUSTOM",
  "target": 10,
  "parameters": {
    "name": "KING_OF_THE_HILL",
    "unit": "PARTNERSHIP",
    "scoring": "WINS",
    "tiebreaker": "POINT_DIFFERENTIAL"
  }
}
```

---

## 🛠️ Guidelines for Tooling & Consumers

1. **Ignore Unknown Keys**: Parsers, replayers, and validators must ignore unrecognized parameter keys so custom club/platform extensions never break interoperability.
2. **Graceful Fallback**: When `parameters` is omitted, infer defaults cleanly (e.g., `unit` from `metadata.teams`—no teams = `INDIVIDUAL`, 2-player teams = `PARTNERSHIP`, 4-player teams = `TEAM`).
3. **Keep Values Short**: Every parameter value is validated to `maxLength: 64`. Use concise tokens rather than prose descriptions (use `metadata.description` for human-readable event notes).
