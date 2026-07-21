# Euchre Match Notation (.emn) Specification

**Version:** 1.0  
**License:** Apache-2.0  

Euchre Match Notation (EMN) is a meta-specification for representing multi-game series, tournaments, and social club sessions played by a common pool of players.

---

## 🎯 Overview & Use Cases

While Euchre Game Notation (EGN) defines the structure of individual games, EMN wraps sequences of EGN games into unified match structures:
- **Series Matches**: Best-of-3, Best-of-5, or target score championship series.
- **Tournament & League Rounds**: Progressive Euchre, round-robin, Swiss-system, or elimination matches.
- **Seat Rotations & Substitutions**: Dynamic mapping of master player IDs to game seat slots (`0: North`, `1: East`, `2: South`, `3: West`) with player substitutions across games.
- **Master Player Registry**: Centralized player profiles and platform IDs (`playerIds`), eliminating metadata duplication.
- **Self-Contained & Deterministic**: Inline embedding of sub-EGN games for offline validity and complete independence.

---

## 🏗️ File Structure Example (`.emn`)

```json
{
  "fileType": "Euchre Match Notation",
  "version": "1.0",
  "metadata": {
    "matchId": "emn_m_20260719_finals",
    "title": "NextSuit League 2026 Finals",
    "description": "Best of 3 championship series with seat rotations.",
    "date": "2026-07-19T19:00:00Z",
    "players": [
      {
        "id": "p-01",
        "name": "Alice",
        "playerIds": [{ "id": "p-01", "source": "league-registry" }]
      },
      {
        "id": "p-02",
        "name": "Bob",
        "playerIds": [{ "id": "p-02", "source": "league-registry" }]
      },
      {
        "id": "p-03",
        "name": "Charlie",
        "playerIds": [{ "id": "p-03", "source": "league-registry" }]
      },
      {
        "id": "p-04",
        "name": "David",
        "playerIds": [{ "id": "p-04", "source": "league-registry" }]
      },
      {
        "id": "p-05",
        "name": "Eve",
        "playerIds": [{ "id": "p-05", "source": "league-registry" }]
      }
    ],
    "matchFormat": {
      "type": "BEST_OF_N",
      "target": 3
    },
    "result": {
      "status": "COMPLETED",
      "winner": ["p-01", "p-04"],
      "scores": {
        "p-01": 2,
        "p-04": 2,
        "p-02": 1,
        "p-03": 1
      }
    }
  },
  "games": [
    {
      "gameIndex": 0,
      "players": ["p-01", "p-02", "p-03", "p-04"],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": { "initialScore": [0, 0] },
        "deals": []
      }
    },
    {
      "gameIndex": 1,
      "players": ["p-01", "p-03", "p-02", "p-04"],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": { "initialScore": [0, 0] },
        "deals": []
      }
    },
    {
      "gameIndex": 2,
      "players": ["p-01", "p-02", "p-05", "p-04"],
      "gameData": {
        "fileType": "Euchre Game Notation",
        "version": "1.4",
        "metadata": { "initialScore": [0, 0] },
        "deals": []
      }
    }
  ]
}
```

---

## 🪑 Seating Conventions

Every game in `games` contains an array of **exactly 4 player ID strings** matching master IDs in `metadata.players`:

| Index | Seat | Partnership | Notes |
| :--- | :--- | :--- | :--- |
| `0` | **North** | Team 0 | Dealer by default if not indicated elsewhere |
| `1` | **East** | Team 1 | Opponent |
| `2` | **South** | Team 0 | Partner of North |
| `3` | **West** | Team 1 | Partner of East |

---

## 🏆 Match Formats (`matchFormat`)

| Format Code | Description | Target Field Meaning |
| :--- | :--- | :--- |
| `BEST_OF_N` | First team to win majority of N games wins | Total maximum games (e.g. 3, 5) |
| `PROGRESSIVE` | Rotating partner tournament; cumulative individual scoring | Total rounds/games |
| `ROUND_ROBIN` | All players/pairs play against all others | Rounds per matchup |
| `FIXED_GAMES` | Fixed number of games played regardless of outcome | Total game count |
| `TARGET_SCORE` | First to reach cumulative total score threshold | Target cumulative score |
| `ELIMINATION` | Single/double elimination bracket match | Round number |
| `SWISS` | Swiss-system tournament match pairing | Round number |
| `TIMED` | Time-bound match session | Duration limit in minutes |
| `SINGLE_GAME` | Standalone single game match | Unused |
| `CUSTOM` | Arbitrary or non-standard ruleset | Custom metric |

---

## 📊 Generic Results (`metadata.result`)

- `status`: `"COMPLETED"`, `"IN_PROGRESS"`, `"FORFEIT"`, `"DRAW"`.
- `winner`: Array of winning master player IDs (or team key).
- `scores`: Key-value map of player ID or team key to accumulated score metric.

---

## ⚙️ Architectural Boundary

- **EMN (Match Layer)**: Handles match metadata, player registry, seat rotations, format rules, and overall results. Contains no move commentary or trick annotations.
- **EGN (Game Layer)**: Inline `gameData` EGN objects contain all gameplay moves, card bitstreams, deal analysis, and trick commentary.
