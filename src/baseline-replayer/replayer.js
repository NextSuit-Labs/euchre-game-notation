// EGN Baseline Replayer UI Controller

// 1. SAMPLE FILE CONFIG
const SAMPLE_FILES = {
  "0": "vwec-hand-1.egn",
  "1": "vwec-hand-2.egn",
  "2": "vwec-hand-8.egn",
  "3": "me-and-bears.egn"
};

async function loadSampleHand(key) {
  const filename = SAMPLE_FILES[key];
  if (!filename) return;
  switch (filename) {
    case "vwec-hand-1.egn":
      initializeEGN(vwec1);
      break;
    case "vwec-hand-2.egn":
      initializeEGN(vwec2);
      break;
    case "vwec-hand-8.egn":
      initializeEGN(vwec8);
      break;
    case "me-and-bears.egn":
      initializeEGN(meAndBears);
      break;
  }
}

// 2. State Variables
let egnData = null;
let currentDealIndex = 0;
let steps = [];
let currentStepIndex = 0;
let dealStartingScores = [];

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
  const players = egnData.metadata.players || ["Player 0", "Player 1", "Player 2", "Player 3"];

  document.getElementById("meta-title").textContent = egnData.metadata.title || "Untitled";
  document.getElementById("deal-num").textContent = `Deal #${currentDealIndex + 1}`;
  document.getElementById("phase-type").textContent = step.type;

  document.getElementById("step-info").textContent = `Step: ${currentStepIndex} / ${steps.length - 1}`;
  document.getElementById("action-val").textContent = step.description;

  document.getElementById("annotation-box").textContent = step.annotation || "No annotation at this step.";

  const upcardValEl = document.getElementById("upcard-val");
  upcardValEl.textContent = "Up: ";

  const deal = egnData.deals[currentDealIndex];
  if (step.type === "PLAY") {
    document.getElementById("center-info").style.visibility = "hidden";
    document.getElementById("dealer-val").textContent = "-";
    upcardValEl.appendChild(document.createTextNode("-"));
  } else {
    document.getElementById("center-info").style.visibility = "visible";
    document.getElementById("dealer-val").textContent = deal.initialState.dealer ?? "-";

    if (deal.initialState.upCard) {
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
    document.getElementById(`name-${i}`).textContent = `${players[i]}${deal.initialState.dealer === i ? " (D)" : ""}`;

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

  if (step.type === "BID" && step.bidCall) {
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
    span.textContent = `Called: ${bidValue}`;
    targetSeatEl.appendChild(span);
  }

  // Update tricks won and score changes in metadata sidebar
  let tricksText = "-";
  let scoreText = "-";
  let gameScoreText = "-";

  const startScore = dealStartingScores[currentDealIndex] || [0, 0];
  gameScoreText = `Team 1: ${startScore[0]} | Team 2: ${startScore[1]}`;

  if (step.type === "PLAY") {
    const callTricks = step.callingTeamTricks;
    const defTricks = step.defendingTeamTricks;
    tricksText = `Call Team: ${callTricks} | Def Team: ${defTricks}`;

    if (currentStepIndex === steps.length - 1) {
      scoreText = `+${step.scoreChange[0]} (Team 1) / +${step.scoreChange[1]} (Team 2)`;
      const endScore = [startScore[0] + step.scoreChange[0], startScore[1] + step.scoreChange[1]];
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

// 4. Initialize EGN File
function initializeEGN(data = null) {
  try {
    if (data) {
      egnData = data;
      document.getElementById("egn-input").value = JSON.stringify(egnData, null, 2);
    } else {
      const rawInput = document.getElementById("egn-input").value;
      egnData = JSON.parse(rawInput);
    }

    if (egnData.fileType !== "Euchre Game Notation") {
      alert("Invalid fileType! Must be 'Euchre Game Notation'.");
      return;
    }

    dealStartingScores = [];
    if (egnData.deals && egnData.deals.length > 0) {
      let runningScore = [...(egnData.metadata.initialScore || [0, 0])];
      egnData.deals.forEach((deal) => {
        dealStartingScores.push([...runningScore]);
        const dSteps = compileDealSteps(deal, egnData.metadata.players);
        if (dSteps.length > 0) {
          const finalStep = dSteps[dSteps.length - 1];
          runningScore[0] += finalStep.scoreChange[0];
          runningScore[1] += finalStep.scoreChange[1];
        }
      });
    }

    currentDealIndex = 0;
    currentStepIndex = 0;

    const firstDeal = egnData.deals[currentDealIndex];
    if (firstDeal) {
      steps = compileDealSteps(firstDeal, egnData.metadata.players);
      renderStep();
    } else {
      alert("No deals found in this EGN file.");
    }
  } catch (err) {
    alert("Failed to parse JSON. Error: " + err.message);
  }
}

// 5. Navigation Event Listeners
document.getElementById("load-btn").addEventListener("click", () => initializeEGN());

document.getElementById("sample-select").addEventListener("change", (e) => {
  loadSampleHand(e.target.value);
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentStepIndex < steps.length - 1) {
    currentStepIndex++;
    renderStep();
  } else {
    if (currentDealIndex < egnData.deals.length - 1) {
      currentDealIndex++;
      currentStepIndex = 0;
      steps = compileDealSteps(egnData.deals[currentDealIndex], egnData.metadata.players);
      renderStep();
    }
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderStep();
  } else {
    if (currentDealIndex > 0) {
      currentDealIndex--;
      steps = compileDealSteps(egnData.deals[currentDealIndex], egnData.metadata.players);
      currentStepIndex = steps.length - 1;
      renderStep();
    }
  }
});

document.getElementById("next-hand-btn").addEventListener("click", () => {
  if (currentDealIndex < egnData.deals.length - 1) {
    currentDealIndex++;
    currentStepIndex = 0;
    steps = compileDealSteps(egnData.deals[currentDealIndex], egnData.metadata.players);
    renderStep();
  }
});

document.getElementById("prev-hand-btn").addEventListener("click", () => {
  if (currentDealIndex > 0) {
    currentDealIndex--;
    currentStepIndex = 0;
    steps = compileDealSteps(egnData.deals[currentDealIndex], egnData.metadata.players);
    renderStep();
  }
});

// Auto-load default hand on startup
loadSampleHand("0");
