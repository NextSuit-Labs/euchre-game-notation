/*
 * Copyright 2026 Write Words - Make Magic, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// EGN Baseline Replayer UI Controller

// 1. SAMPLE FILE CONFIG
const SAMPLE_FILES = {
  "0": "vwec-hand-1.egn",
  "1": "vwec-hand-2.egn",
  "2": "vwec-hand-8.egn",
  "3": "me-and-bears.egn",
  "4": "MotE-W5.emn"
};

async function loadSampleHand(key) {
  const filename = SAMPLE_FILES[key];
  if (!filename) return;
  switch (filename) {
    case "vwec-hand-1.egn":
      initializeEgn(vwec1);
      break;
    case "vwec-hand-2.egn":
      initializeEgn(vwec2);
      break;
    case "vwec-hand-8.egn":
      initializeEgn(vwec8);
      break;
    case "me-and-bears.egn":
      initializeEgn(meAndBears);
      break;
    case "MotE-W5.emn":
      initializeEgn(moteW5Match);
      break;
  }
}

// 2. State Variables
let egnData = null;
let currentDealIndex = 0;
let steps = [];
let currentStepIndex = 0;
let dealStartingScores = [];
let isEmnMode = false;
let gameStartIndices = [];
let currentGameIndex = 0;
let games = [];
const MAX_INPUT_CHARS = 2_000_000;

// Helper to create card DOM element securely
function createCardElement(cardStr) {
  const span = document.createElement("span");
  span.className = "card-txt";

  if (!cardStr || cardStr === "Xx") {
    span.style.backgroundColor = "var(--bg-light)";
    span.style.color = "var(--text-gray)";
    span.style.borderColor = "var(--bg-light)";
    span.textContent = "🎴";
  } else {
    const rank = cardStr[0];
    const suit = cardStr[1].toLowerCase();
    const suitSymbols = { 's': '♠', 'h': '♥', 'c': '♣', 'd': '♦' };
    const symbol = suitSymbols[suit] || suit;

    span.classList.add(`suit-${suit}`);
    span.textContent = `${rank}${symbol}`;
  }
  return span;
}

// 3. Render Current Step
function renderStep() {
  if (steps.length === 0) return;
  const step = steps[currentStepIndex];
  const deal = egnData.deals[currentDealIndex];
  const dealMeta = (isEmnMode && egnData.dealMetadatas) ? egnData.dealMetadatas[currentDealIndex] : egnData.metadata;
  const players = dealMeta.players || ["Player 0", "Player 1", "Player 2", "Player 3"];

  document.getElementById("meta-title").textContent = dealMeta.title || egnData.metadata.title || "Untitled";
  document.getElementById("deal-num").textContent = `Hand ${currentDealIndex + 1} / ${egnData.deals.length}`;
  document.getElementById("phase-type").textContent = step.type;

  document.getElementById("step-info").textContent = `Step: ${currentStepIndex + 1} / ${steps.length}`;
  const gameInfoEl = document.getElementById("game-info");
  if (gameInfoEl) {
    gameInfoEl.textContent = `Game: ${currentGameIndex + 1} / ${games.length || 1}`;
  }
  document.getElementById("action-val").textContent = step.description;

  document.getElementById("annotation-box").textContent = step.annotation || "No annotation at this step.";

  const upcardValEl = document.getElementById("upcard-val");
  upcardValEl.textContent = "Up: ";

  if (step.type === "PLAY") {
    document.getElementById("center-info").style.visibility = "hidden";
    document.getElementById("dealer-val").textContent = "-";
    upcardValEl.appendChild(document.createTextNode("-"));
  } else {
    document.getElementById("center-info").style.visibility = "visible";
    const dealer = deal ? deal.initialState.dealer ?? "-" : "-";
    document.getElementById("dealer-val").textContent = dealer;

    if (deal && deal.initialState.upCard) {
      if (step.type === "INITIAL" || (step.type === "BID" && step.callIndex < 4)) {
        upcardValEl.appendChild(createCardElement(deal.initialState.upCard));
      } else {
        upcardValEl.appendChild(createCardElement("Xx"));
      }
    } else {
      upcardValEl.appendChild(document.createTextNode("-"));
    }
  }

  for (let i = 0; i < 4; i++) {
    const nameEl = document.getElementById(`name-${i}`);
    const dealer = deal ? (deal.initialState.dealer ?? 0) : 0;
    nameEl.textContent = `${players[i]}${dealer === i ? " (D)" : ""}`;

    const makerSeat = deal ? determineMaker(deal) : null;
    if (step.type === 'PLAY' && makerSeat === i) {
      nameEl.classList.add("maker-highlight");
    } else {
      nameEl.classList.remove("maker-highlight");
    }

    const cardsEl = document.getElementById(`cards-${i}`);
    cardsEl.textContent = "";

    const hand = step.hands[i];
    if (i === step.sitOutSeat && step.type === "PLAY") {
      const span = document.createElement("span");
      span.style.color = "var(--text-gray)";
      span.style.fontStyle = "italic";
      span.textContent = "Sitting Out";
      cardsEl.appendChild(span);
    } else if (i === step.sitOutSeat && (step.type === "INITIAL" || step.type === "BID")) {
      for (let k = 0; k < 5; k++) {
        cardsEl.appendChild(createCardElement("Xx"));
        cardsEl.appendChild(document.createTextNode(" "));
      }
    } else if (hand && hand.length > 0) {
      hand.forEach((card) => {
        cardsEl.appendChild(createCardElement(card));
        cardsEl.appendChild(document.createTextNode(" "));
      });
    } else {
      cardsEl.textContent = "No cards";
    }
  }

  const centerContainer = document.getElementById("center-cards-container");
  centerContainer.textContent = "";

  const cardinalDirections = ["card-n", "card-e", "card-s", "card-w"];
  for (let i = 0; i < 4; i++) {
    const playedCard = step.playedCards[i];
    if (playedCard) {
      const cardDiv = document.createElement("div");
      cardDiv.className = `center-card ${cardinalDirections[i]}`;
      if (step.trickWinnerSeat === i) {
        cardDiv.classList.add("winning-card");
      }
      cardDiv.appendChild(createCardElement(playedCard));
      centerContainer.appendChild(cardDiv);
    }
  }

  if (step.type === "BID" && step.bidCall && deal) {
    const bidderSeat = step.bidCall.seat;
    const bidValue = step.bidCall.call;
    const targetSeatEl = document.getElementById(`cards-${bidderSeat}`);
    targetSeatEl.textContent = "";

    const span = document.createElement("span");
    span.style.backgroundColor = "var(--color-accent)";
    span.style.color = "white";
    span.style.padding = "2px 8px";
    span.style.borderRadius = "4px";
    span.style.fontWeight = "bold";
    span.textContent = `${formatCall(bidValue, determineIsAlone(deal))}`;
    targetSeatEl.appendChild(span);
  }

  // Update tricks won and score changes in metadata sidebar
  let tricksText = "-";
  let scoreText = "-";
  let gameScoreText = "-";

  const startingScore = dealStartingScores[currentDealIndex] || (dealMeta.initialScore || [0, 0]);

  if (step.callingTeam !== null) {
    tricksText = `Team ${step.callingTeam + 1}: ${step.callingTeamTricks} | Team ${step.callingTeam === 0 ? 2 : 1}: ${step.defendingTeamTricks}`;

    if (step.scoreChange) {
      const [t0Change, t1Change] = step.scoreChange;
      scoreText = `Team 1: +${t0Change} | Team 2: +${t1Change}`;

      const endScore = [startingScore[0] + t0Change, startingScore[1] + t1Change];
      gameScoreText = `Team 1: ${endScore[0]} | Team 2: ${endScore[1]} (End of Hand)`;
    } else {
      scoreText = "In Progress";
    }
  } else {
    tricksText = "Bidding Phase";
    scoreText = "Bidding Phase";
  }

  document.getElementById("tricks-won").textContent = tricksText;
  document.getElementById("deal-score").textContent = scoreText;
  document.getElementById("game-score-val").textContent = gameScoreText;
}

function formatCall(call, isAlone) {
  const isAloneSuffix = isAlone ? " (Alone)" : "";
  switch (call) {
    case "Order": return call + isAloneSuffix;
    case "s": return "Spades" + isAloneSuffix;
    case "h": return "Hearts" + isAloneSuffix;
    case "c": return "Clubs" + isAloneSuffix;
    case "d": return "Diamonds" + isAloneSuffix;
  }
  return call;
}

function loadDeal(index) {
  if (!egnData || !egnData.deals || index < 0 || index >= egnData.deals.length) return;
  currentDealIndex = index;
  currentStepIndex = 0;

  if (isEmnMode && egnData.dealMetadatas && egnData.dealMetadatas[currentDealIndex]) {
    currentGameIndex = egnData.dealMetadatas[currentDealIndex].gameIndex || 0;
  } else {
    currentGameIndex = 0;
  }

  const deal = egnData.deals[currentDealIndex];
  const dealMeta = (isEmnMode && egnData.dealMetadatas) ? egnData.dealMetadatas[currentDealIndex] : egnData.metadata;

  steps = compileDealSteps(deal, dealMeta);
  renderStep();
}

function initializeEmn(matchData) {
  isEmnMode = true;
  games = matchData.games || [];
  const gameSection = document.getElementById("game-controls-section");
  if (gameSection) gameSection.style.display = "block";

  var masterPlayerMap = {};
  (matchData.metadata.players || []).forEach(p => {
    masterPlayerMap[p.id] = p.name;
  });

  const allDeals = [];
  const allDealMetadatas = [];
  dealStartingScores = [];
  gameStartIndices = [];

  (matchData.games || []).forEach((game, gIdx) => {
    gameStartIndices.push(allDeals.length);
    var gameTitle = (game.gameData.metadata && game.gameData.metadata.title) || ("Game " + (gIdx + 1));
    var seatPlayerNames = (game.players || []).map(pid => masterPlayerMap[pid] || pid);
    var subDeals = (game.gameData && game.gameData.deals) || [];
    var initialScore = (game.gameData.metadata && game.gameData.metadata.initialScore) || [0, 0];
    var ruleset = (game.gameData.metadata && game.gameData.metadata.ruleset) || { std: true };

    var runningScore = [...initialScore];

    subDeals.forEach((deal, dIdx) => {
      dealStartingScores.push([...runningScore]);

      const dealMeta = {
        title: (matchData.metadata.title || "Match") + " - " + gameTitle + " (Hand " + (dIdx + 1) + "/" + subDeals.length + ")",
        players: seatPlayerNames,
        initialScore: initialScore,
        ruleset: ruleset,
        gameIndex: gIdx
      };

      allDeals.push(deal);
      allDealMetadatas.push(dealMeta);

      const dSteps = compileDealSteps(deal, dealMeta);
      if (dSteps.length > 0) {
        const finalStep = dSteps[dSteps.length - 1];
        if (finalStep.scoreChange) {
          runningScore[0] += finalStep.scoreChange[0];
          runningScore[1] += finalStep.scoreChange[1];
        }
      }
    });
  });

  if (allDeals.length === 0) {
    alert("No deals found in this EMN match file.");
    return;
  }

  egnData = {
    fileType: "Euchre Match Notation",
    metadata: {
      title: matchData.metadata.title || "Match",
      players: matchData.metadata.players
    },
    deals: allDeals,
    dealMetadatas: allDealMetadatas
  };

  currentDealIndex = 0;
  currentStepIndex = 0;
  currentGameIndex = 0;
  loadDeal(0);
}

// 4. Initialize EGN File
function initializeEgn(data = null) {
  try {
    isEmnMode = false;
    currentGameIndex = 0;
    games = data ? [data] : [];
    gameStartIndices = [];
    const gameSection = document.getElementById("game-controls-section");
    if (gameSection) gameSection.style.display = "none";

    if (data) {
      egnData = data;
      document.getElementById("egn-input").value = JSON.stringify(egnData, null, 2);
    } else {
      const rawInput = document.getElementById("egn-input").value;
      if (rawInput.length > MAX_INPUT_CHARS) {
        alert(`Input is too large (${rawInput.length.toLocaleString()} chars). Max allowed is ${MAX_INPUT_CHARS.toLocaleString()} chars.`);
        return;
      }
      egnData = JSON.parse(rawInput);
    }

    if (egnData.fileType === "Euchre Match Notation") {
      initializeEmn(egnData);
      return;
    }

    if (egnData.fileType !== "Euchre Game Notation") {
      alert("Invalid fileType! Must be 'Euchre Game Notation' or 'Euchre Match Notation'.");
      return;
    }

    dealStartingScores = [];
    if (egnData.deals && egnData.deals.length > 0) {
      let runningScore = [...(egnData.metadata.initialScore || [0, 0])];
      egnData.deals.forEach((deal) => {
        dealStartingScores.push([...runningScore]);
        const dSteps = compileDealSteps(deal, egnData.metadata);
        if (dSteps.length > 0) {
          const finalStep = dSteps[dSteps.length - 1];
          if (finalStep.scoreChange) {
            runningScore[0] += finalStep.scoreChange[0];
            runningScore[1] += finalStep.scoreChange[1];
          }
        }
      });
    }

    currentDealIndex = 0;
    currentStepIndex = 0;

    const firstDeal = egnData.deals[currentDealIndex];
    if (firstDeal) {
      steps = compileDealSteps(firstDeal, egnData.metadata);
      renderStep();
    } else {
      alert("No deals found in this EGN file.");
    }
  } catch (err) {
    alert("Failed to parse JSON. Error: " + err.message);
  }
}

// 5. Navigation Event Listeners
document.getElementById("load-btn").addEventListener("click", () => initializeEgn());

document.getElementById("sample-select").addEventListener("change", (e) => {
  loadSampleHand(e.target.value);
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentStepIndex < steps.length - 1) {
    currentStepIndex++;
    renderStep();
  } else {
    if (egnData && egnData.deals && currentDealIndex < egnData.deals.length - 1) {
      loadDeal(currentDealIndex + 1);
    }
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderStep();
  } else {
    if (currentDealIndex > 0) {
      loadDeal(currentDealIndex - 1);
      currentStepIndex = steps.length - 1;
      renderStep();
    }
  }
});

document.getElementById("next-hand-btn").addEventListener("click", () => {
  if (egnData && egnData.deals && currentDealIndex < egnData.deals.length - 1) {
    loadDeal(currentDealIndex + 1);
  }
});

document.getElementById("prev-hand-btn").addEventListener("click", () => {
  if (currentDealIndex > 0) {
    loadDeal(currentDealIndex - 1);
  }
});

document.getElementById("next-game-btn").addEventListener("click", () => {
  if (!isEmnMode || gameStartIndices.length === 0 || !egnData.dealMetadatas) return;
  const curGameIdx = egnData.dealMetadatas[currentDealIndex].gameIndex;
  if (curGameIdx < gameStartIndices.length - 1) {
    loadDeal(gameStartIndices[curGameIdx + 1]);
  }
});

document.getElementById("prev-game-btn").addEventListener("click", () => {
  if (!isEmnMode || gameStartIndices.length === 0 || !egnData.dealMetadatas) return;
  const curGameIdx = egnData.dealMetadatas[currentDealIndex].gameIndex;
  const curGameStart = gameStartIndices[curGameIdx];
  if (currentDealIndex > curGameStart) {
    loadDeal(curGameStart);
  } else if (curGameIdx > 0) {
    loadDeal(gameStartIndices[curGameIdx - 1]);
  }
});

// Auto-load default hand on startup
loadSampleHand("0");
