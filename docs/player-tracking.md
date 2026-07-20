# Player Tracking with External IDs

## Overview

EGN supports rich player tracking through **Player Objects**, enabling unified player identification across multiple platforms and systems. This is essential for competitive Euchre, where players may participate in games across Euchre.com, tournament systems, communities, or custom platforms.

## Basic Usage

### Simple Player Names (Legacy)

For basic use cases, the `players` array contains simple strings:

```json
{
  "metadata": {
    "players": ["Alice", "Bob", "Charlie", "Diana"]
  }
}
```

### Player Objects (Enhanced)

For advanced use cases requiring cross-platform tracking, use Player Objects:

```json
{
  "metadata": {
    "players": [
      {
        "name": "Alice",
        "playerIds": [
          { "id": "alice-123", "source": "euchre-site" },
          { "id": "player-5", "source": "tournament-2026-nationals" }
        ]
      },
      {
        "name": "Bob",
        "playerIds": [
          { "id": "bob-456", "source": "euchre-site" }
        ]
      },
      "Charlie",
      "Diana"
    ]
  }
}
```

### Mixed Format

EGN allows mixing simple strings and Player Objects in the same `players` array. Players without ID tracking can remain as strings, while players with multi-platform accounts use rich objects.

## Player Object Structure

### PlayerObject Interface

```typescript
interface PlayerObject {
  name: string;              // Required: Display name for the player
  playerIds?: PlayerId[];    // Optional: Array of external ID mappings
}

interface PlayerId {
  id: string;       // The external identifier value
  source: string;   // Platform or system name (e.g., "euchre-site", "tournament-registry")
}
```

## Common Platform Sources

| Source | Description | Example ID |
|--------|-------------|-----------|
| `euchre-site` | Euchre site user account | `user-12345` or username |
| `euchre-community` | user ID | `298479521183` |
| `tournament-registry` | Tournament management system | `2026-nationals-player-15` |
| `custom-platform` | Custom in-house system | Application-specific format |

## Use Cases

### 1. Cross-Platform Game Analysis

Archive games from multiple Euchre platforms with unified player tracking:

```json
{
  "metadata": {
    "title": "Inter-platform Tournament Finals",
    "players": [
      {
        "name": "Championship Player",
        "playerIds": [
          { "id": "champion-123", "source": "euchre-site" },
          { "id": "cp-5", "source": "euchre-community" }
        ]
      }
    ]
  }
}
```

### 2. Tournament Integration

Map tournament registrations to game records:

```json
{
  "metadata": {
    "title": "2026 National Championship Finals",
    "players": [
      {
        "name": "Alice Johnson",
        "playerIds": [
          { "id": "2026-nat-001", "source": "tournament-registry" },
          { "id": "alice.j", "source": "euchre-site" }
        ]
      }
    ]
  }
}
```

### 3. Community Id Integration

Track players across communites with different player ids and external platforms:

```json
{
  "metadata": {
    "players": [
      {
        "name": "User#1234",
        "playerIds": [
          { "id": "987654321", "source": "euchre-community" },
          { "id": "myuserid", "source": "euchre-site" }
        ]
      }
    ]
  }
}
```

## Implementation Guidance

### For Game Loggers

When capturing games, include external IDs for players:

1. **Euchre.com imports**: Automatically populate `playerIds` from Euchre.com user accounts
2. **Manual entry**: Provide UI fields for players to specify their account IDs on multiple platforms
3. **Tournament mode**: Auto-populate from tournament registration data

### For Game Analyzers/Replayers

When loading EGN files:

1. **Display**: Show `name` as the primary player identifier in UI
2. **Linking**: Use `playerIds` to fetch player statistics or cross-reference with other systems
3. **Deduplication**: Use `playerIds` to identify the same player across multiple files
4. **Fallback**: If Player Object not available, treat as simple string

### For Database Storage

```sql
-- Example: EGN Game Players table
CREATE TABLE game_players (
  game_id INT,
  player_index INT,
  player_name VARCHAR(255),
  player_ids JSON,  -- Store playerIds array as JSON
  PRIMARY KEY (game_id, player_index)
);
```

### TypeScript/Node.js Example

```typescript
import { EgnFile, Player, PlayerObject } from "euchre-game-notation";

function extractPlayerIds(player: Player, source: string): string[] {
  if (typeof player === "string") {
    return [];
  }
  
  const playerObj = player as PlayerObject;
  return (playerObj.playerIds || [])
    .filter(id => id.source === source)
    .map(id => id.id);
}

function getPlayerName(player: Player): string {
  if (typeof player === "string") {
    return player;
  }
  
  const playerObj = player as PlayerObject;
  return playerObj.name;
}

// Usage
const egn: EgnFile = loadEgn("game.egn");
egn.metadata.players.forEach((player, index) => {
  const name = getPlayerName(player);
  const euchreComIds = extractPlayerIds(player, "euchre-site");
  console.log(`${index}: ${name}`, euchreComIds);
});
```

## Best Practices

1. **Use consistent source names**: Standardize on a fixed set of platform identifiers within your organization
2. **Normalize IDs**: Store IDs in a canonical format (e.g., lowercase usernames, numeric IDs without prefixes)
3. **Include multiple platforms**: When available, track the same player across 2+ systems for robust deduplication
4. **Validate IDs**: Ensure external IDs are valid and match the claimed source platform
5. **Version your sources**: If a platform changes its ID format, use versioning (e.g., `euchre-site-v2`) to disambiguate

## Backward Compatibility

EGN v1.4 is fully backward compatible with v1.0.0, v1.1.0, v1.2, and v1.3:

- Parsers reading Player Objects will gracefully handle simple strings
- Upgrades from older formats automatically convert player names to simple strings (IDs are lost)
- Use the `egn-upgrade` CLI tool to migrate files to v1.4, then manually add Player Object data as needed

## Migration from Simple Names to Player Objects

To upgrade an existing EGN file with player names to include external IDs:

```json
// Before (v1.1.0 or earlier)
{
  "metadata": {
    "players": ["Alice", "Bob", "Charlie", "Diana"]
  }
}

// After (v1.2+ with external IDs)
{
  "metadata": {
    "players": [
      {
        "name": "Alice",
        "playerIds": [
          { "id": "alice-euchre-site-123", "source": "euchre-site" }
        ]
      },
      {
        "name": "Bob",
        "playerIds": []
      },
      "Charlie",
      "Diana"
    ]
  }
}
```

## Summary

Player Objects in EGN v1.4 enable seamless cross-platform player tracking while maintaining backward compatibility with simple player names. This feature is essential for building robust tournament systems, competitive analytics, and unified game archives across the Euchre community.
