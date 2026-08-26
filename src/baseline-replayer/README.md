# EGN Baseline Replayer

A lightweight, zero-dependency reference implementation and interactive step-by-step replayer for **Euchre Game Notation (.egn)** and **Euchre Match Notation (.emn)**.

## Quick Start (Out-of-the-Box)

No build step or `npm install` is required. You can run this replayer immediately in two ways:

1. **Direct Double-Click**:
   * Open [`index.html`](./index.html) directly in any modern web browser (Chrome, Firefox, Safari, Edge).
2. **Local Static Server**:
   ```bash
   # From this directory:
   npx serve .
   # or with Python:
   python -m http.server 8000
   ```

---

## Architecture & File Structure

| File | Purpose |
| :--- | :--- |
| **[`index.html`](./index.html)** | Interactive UI containing the 4-player table layout, bidding box, trick center-cards, and annotation panel. |
| **[`replayer.js`](./replayer.js)** | UI state manager, step navigation controls, card rendering, and sample loaders. |
| **[`rules-engine.js`](./rules-engine.js)** | *Auto-generated* standalone, zero-dependency browser implementation of the core Euchre rules engine. |
| **[`games.js`](./games.js)** | Sample `.egn` and `.emn` match data for instant testing and demonstration. |
| **[`style.css`](./style.css)** | Responsive dark-mode styling and card layout CSS. |

---

## Single Source of Truth & Build Pipeline

* **TypeScript Engine**: [`src/engine/rules.ts`](../engine/rules.ts) is the single source of truth for all rules evaluation and step calculation logic.
* **Auto-Generation**: Running `npm run build` or `npm test` automatically transpiles `src/engine/rules.ts` into [`rules-engine.js`](./rules-engine.js) via `generate-replayer-rules.js` to ensure zero code duplication.
* **Do not edit [`rules-engine.js`](./rules-engine.js) directly**—make updates in [`src/engine/rules.ts`](../engine/rules.ts) instead.

---

## Using with TypeScript / Modern Web Apps (React, Vite, Next.js)

If you are building a modern web or Node.js application, the core rules and scoring engine is available as a strongly-typed module in [`src/engine/`](../engine/):

```typescript
import { 
  determineTrump, 
  determineMaker, 
  compileDealSteps, 
  calculateFinalScore, 
  addFinalScoreToEgn 
} from "euchre-game-notation";

// Play through an EGN deal and compile step-by-step card states:
const steps = compileDealSteps(deal, egnData.metadata);

// Evaluate final cumulative match/game score:
const finalScore = calculateFinalScore(egnData); // e.g. [10, 9]

// Inject or update metadata.finalScore:
const updatedEgn = addFinalScoreToEgn(egnData);
```
