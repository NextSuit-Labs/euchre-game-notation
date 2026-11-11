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

// ============================================================================
// EGN & EMN WORKBENCH CONTROLLER
// ============================================================================

(function () {
  'use strict';

  const E = window.EuchreNotation;

  if (!E) {
    console.error("EuchreNotation library bundle not found on window object!");
    return;
  }

  // DOM Elements - Navigation
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  // EGN Workspace Elements
  const egnInput = document.getElementById('egn-input');
  const egnOutput = document.getElementById('egn-output');
  const egnSampleSelect = document.getElementById('egn-sample-select');
  const egnDropzone = document.getElementById('egn-dropzone');
  const egnFileInput = document.getElementById('egn-file-input');

  // EGN Validation Elements
  const egnSchemaBadge = document.getElementById('egn-schema-badge');
  const egnGameplayBadge = document.getElementById('egn-gameplay-badge');
  const egnViolationList = document.getElementById('egn-violation-list');
  const egnStatDeals = document.getElementById('egn-stat-deals');
  const egnStatSize = document.getElementById('egn-stat-size');
  const egnStatScore = document.getElementById('egn-stat-score');

  // EGN Hashes
  const egnHashBaseline = document.getElementById('egn-hash-baseline');
  const egnHashGame = document.getElementById('egn-hash-game');
  const egnHashFull = document.getElementById('egn-hash-full');

  // EMN Workspace Elements
  const emnInput = document.getElementById('emn-input');
  const emnOutput = document.getElementById('emn-output');
  const emnSampleSelect = document.getElementById('emn-sample-select');
  const emnDropzone = document.getElementById('emn-dropzone');
  const emnFileInput = document.getElementById('emn-file-input');

  // EMN Validation Elements
  const emnSchemaBadge = document.getElementById('emn-schema-badge');
  const emnGameplayBadge = document.getElementById('emn-gameplay-badge');
  const emnViolationList = document.getElementById('emn-violation-list');
  const emnStatGames = document.getElementById('emn-stat-games');
  const emnStatPlayers = document.getElementById('emn-stat-players');
  const emnStatFormat = document.getElementById('emn-stat-format');

  // Combiner & Extractor Elements
  const combinerInputList = document.getElementById('combiner-input-list');
  const combinerFormatSelect = document.getElementById('combiner-format-select');
  const combinerTargetInput = document.getElementById('combiner-target-input');
  const combinerTitleInput = document.getElementById('combiner-title-input');
  const combinerOutput = document.getElementById('combiner-output');

  const extractorEmnInput = document.getElementById('extractor-emn-input');
  const extractorGameSelect = document.getElementById('extractor-game-select');
  const extractorOutput = document.getElementById('extractor-output');

  // Deal Player Cards Workspace Elements
  const dealInput = document.getElementById('deal-input');
  const dealOutput = document.getElementById('deal-output');
  const dealSampleSelect = document.getElementById('deal-sample-select');
  const dealDropzone = document.getElementById('deal-dropzone');
  const dealFileInput = document.getElementById('deal-file-input');
  const dealFileIndexContainer = document.getElementById('deal-file-index-container');
  const dealFileIndexSelect = document.getElementById('deal-file-index-select');
  const dealSourceBadge = document.getElementById('deal-source-badge');
  const dealStatDealer = document.getElementById('deal-stat-dealer');
  const dealStatUpcard = document.getElementById('deal-stat-upcard');
  const dealStatTrump = document.getElementById('deal-stat-trump');
  const dealStatMaker = document.getElementById('deal-stat-maker');
  const chkDealCompact = document.getElementById('chk-deal-compact');
  let currentLoadedEgn = null;

  // Samples Data
  const SAMPLES = {
    egn: {
      standard: {
        fileType: "Euchre Game Notation",
        version: "1.6",
        metadata: {
          title: "VWEC Finals - Hand 1",
          description: "First deal of the Virtual World Euchre Championship Finals. Standard order-up.",
          players: ["WWMM", "Llama", "Euchrazy1", "LeftyKnavey"],
          initialScore: [0, 0],
          ruleset: {
            std: true,
            canadian: false,
            loner_lead: "LEFT_OF_LONER"
          }
        },
        deals: [
          {
            dealNumber: 0,
            initialState: {
              dealer: 2,
              upCard: "Kc"
            },
            phases: [
              {
                type: "EUCHRE_BIDDING",
                calls: ["Pass", "Pass", "Pass", "Order"],
                isAlone: false
              },
              {
                type: "TRICK_PLAY",
                tricks: [
                  ["Ad", "9d", "Qd", "9c"],
                  ["Ks", "As", "Ac", "Js"],
                  ["Kh", "Qh", "Ah", "Tc"],
                  ["Kd", "9h", "Kc", "9s"],
                  ["Jc", "Qs", "Jd", "Jh"]
                ]
              }
            ]
          }
        ]
      },
      renege: {
        fileType: "Euchre Game Notation",
        version: "1.2",
        metadata: {
          title: "Renege Test Deal",
          players: ["North", "East", "South", "West"],
          initialScore: [0, 0]
        },
        deals: [
          {
            dealNumber: 1,
            initialState: {
              dealer: 0,
              upCard: "9s",
              playerCards: [
                ["As", "Ks", "Qs", "Js", "Ts"],
                ["Ah", "Kh", "Qh", "9c", "Tc"],
                ["Ad", "Kd", "Qd", "Jd", "Td"],
                ["Ac", "Kc", "Qc", "Jc", "Jh"]
              ]
            },
            phases: [
              {
                type: "EUCHRE_BIDDING",
                phaseNumber: 0,
                calls: ["Pass", "Pass", "Pass", "Order"]
              },
              {
                type: "TRICK_PLAY",
                phaseNumber: 1,
                tricks: [
                  ["As", "9c", "Ad", "Ac"], // East played 9c while holding hearts (Spades led, but wait: renege happens when holding led suit)
                  ["Ks", "Ah", "Kd", "Kc"], // East plays Ah while spade trump led
                  ["Qs", "Kh", "Qd", "Qc"],
                  ["Js", "Qh", "Jd", "Jc"],
                  ["Ts", "Tc", "Td", "Jh"]
                ]
              }
            ]
          }
        ]
      },
      loner: {
        fileType: "Euchre Game Notation",
        version: "1.2",
        metadata: {
          title: "Loner March 4-Point Deal",
          players: ["Alice", "Bob", "Charlie", "David"],
          initialScore: [0, 0],
          finalScore: [4, 0]
        },
        deals: [
          {
            dealNumber: 1,
            initialState: {
              dealer: 0,
              upCard: "Jc",
              playerCards: [
                ["Tc", "Js", "Ac", "Kc", "Qc"], // Alice holds all 5 top clubs!
                ["Ah", "Kh", "Qh", "Jh", "Th"],
                ["Ad", "Kd", "Qd", "Jd", "Td"],
                ["As", "Ks", "Qs", "Ts", "9s"]
              ]
            },
            phases: [
              {
                type: "EUCHRE_BIDDING",
                phaseNumber: 0,
                isAlone: true,
                calls: ["Pass", "Pass", "Pass", "Order"],
                discard: "Tc"
              },
              {
                type: "TRICK_PLAY",
                phaseNumber: 1,
                tricks: [
                  ["Ah", "As", "Jc"],
                  ["Js", "Kh", "Ks"],
                  ["Ac", "Qh", "Qs"],
                  ["Kc", "Jh", "Ts"],
                  ["Qc", "Th", "9s"]
                ]
              }
            ]
          }
        ]
      }
    },
    emn: {
      matchBestOf3: {
        fileType: "Euchre Match Notation",
        version: "1.1",
        metadata: {
          matchId: "match-demo-01",
          title: "Championship Series Table A",
          date: "2026-03-01",
          players: [
            { id: "p-01", name: "Alice" },
            { id: "p-02", name: "Bob" },
            { id: "p-03", name: "Charlie" },
            { id: "p-04", name: "David" }
          ],
          teams: [
            { id: "team-ns", name: "A & C", playerIds: ["p-01", "p-03"] },
            { id: "team-ew", name: "B & D", playerIds: ["p-02", "p-04"] }
          ],
          matchFormat: {
            type: "BEST_OF_N",
            target: 3
          },
          result: {
            status: "COMPLETED",
            winner: ["p-01", "p-03"],
            scores: { "p-01": 2, "p-02": 1, "p-03": 2, "p-04": 1 }
          }
        },
        games: [
          {
            gameIndex: 0,
            playersOverride: ["p-01", "p-02", "p-03", "p-04"],
            gameData: {
              fileType: "Euchre Game Notation",
              version: "1.2",
              metadata: {
                title: "Game 1",
                players: ["Alice", "Bob", "Charlie", "David"],
                finalScore: [10, 6]
              },
              deals: [
                "AgAAmQEAAQEFAAcBBRAPEA8QDwA="
              ]
            }
          },
          {
            gameIndex: 1,
            playersOverride: ["p-01", "p-02", "p-03", "p-04"],
            gameData: {
              fileType: "Euchre Game Notation",
              version: "1.2",
              metadata: {
                title: "Game 2",
                players: ["Alice", "Bob", "Charlie", "David"],
                finalScore: [8, 10]
              },
              deals: [
                "AgAAmQEAAQEFAAcBBRAPEA8QDwA="
              ]
            }
          },
          {
            gameIndex: 2,
            playersOverride: ["p-01", "p-02", "p-03", "p-04"],
            gameData: {
              fileType: "Euchre Game Notation",
              version: "1.2",
              metadata: {
                title: "Game 3 (Decider)",
                players: ["Alice", "Bob", "Charlie", "David"],
                finalScore: [10, 4]
              },
              deals: [
                "AgAAmQEAAQEFAAcBBRAPEA8QDwA="
              ]
            }
          }
        ]
      }
    },
    deal: {
      inferred: {
        dealNumber: 1,
        initialState: {
          dealer: 0,
          upCard: "9s"
        },
        phases: [
          {
            type: "EUCHRE_BIDDING",
            phaseNumber: 0,
            calls: ["Pass", "Pass", "Pass", "Order"]
          },
          {
            type: "TRICK_PLAY",
            phaseNumber: 1,
            tricks: [
              ["Jh", "9d", "Jd", "Ts"],
              ["Ks", "Qd", "Kd", "Ah"],
              ["Js", "Kc", "Ad", "Kh"],
              ["Qc", "9h", "9s", "Ac"],
              ["Tc", "Qh", "As", "Jc"]
            ]
          }
        ]
      },
      explicit: {
        dealNumber: 1,
        initialState: {
          dealer: 0,
          upCard: "9s",
          playerCards: [
            ["Jh", "Tc", "Qc", "Js", "Ks"],
            ["9d", "Qd", "Kc", "9h", "Qh"],
            ["Jd", "Ad", "Kd", "As", "9s"],
            ["Ts", "Jc", "Kh", "Ah", "Ac"]
          ]
        },
        phases: [
          {
            type: "EUCHRE_BIDDING",
            phaseNumber: 0,
            calls: ["Pass", "Pass", "Pass", "Order"]
          },
          {
            type: "TRICK_PLAY",
            phaseNumber: 1,
            tricks: [
              ["Jh", "9d", "Jd", "Ts"],
              ["Ks", "Qd", "Kd", "Ah"],
              ["Js", "Kc", "Ad", "Kh"],
              ["Qc", "9h", "9s", "Ac"],
              ["Tc", "Qh", "As", "Jc"]
            ]
          }
        ]
      },
      loner: {
        dealNumber: 0,
        initialState: {
          dealer: 0,
          upCard: "9h"
        },
        phases: [
          {
            type: "EUCHRE_BIDDING",
            phaseNumber: 0,
            calls: ["Order"],
            isAlone: true
          },
          {
            type: "TRICK_PLAY",
            phaseNumber: 1,
            tricks: [
              ["9h", "Th", "Ah"],
              ["Jc", "Qs", "Js"],
              ["Qh", "As", "Kh"],
              ["Ts", "Jh", "9d"],
              ["9s", "Jd", "Tc"]
            ]
          }
        ]
      },
      orderedUp: {
        dealNumber: 1,
        initialState: {
          dealer: 0,
          upCard: "9s"
        },
        phases: [
          {
            type: "EUCHRE_BIDDING",
            phaseNumber: 0,
            calls: ["Order"],
            discard: "9c"
          },
          {
            type: "TRICK_PLAY",
            phaseNumber: 1,
            tricks: [
              ["Ah", "Kh", "Qh", "Th"],
              ["As", "Ks", "Qs", "Js"],
              ["Ad", "Kd", "Qd", "Jd"],
              ["Ac", "Kc", "Qc", "Tc"],
              ["9s", "Ts", "Td", "Jc"]
            ]
          }
        ]
      },
      condensed: "AwAABwMAAAAHAAAACwAAABAAAAAXAAAAGgAAACEAAAAiAAAAKAAAAC0AAAAyAAAAAgEAAAAAAAAAAA=="
    }
  };

  // Helper: Format bytes
  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // Helper: Download Blob as file
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Helper: Copy text to clipboard
  function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btnElement ? btnElement.innerHTML : '';
      if (btnElement) {
        btnElement.innerHTML = '✓ Copied!';
        setTimeout(() => { btnElement.innerHTML = originalText; }, 1800);
      }
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  }

  // ==========================================================================
  // NAVIGATION & TAB SWITCHING
  // ==========================================================================
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // ==========================================================================
  // EGN OPERATIONS
  // ==========================================================================

  function parseEgnInput() {
    const text = egnInput.value.trim();
    if (!text) throw new Error("Please enter or paste EGN JSON or upload a file first.");
    return JSON.parse(text);
  }

  function validateEgnWorkspace() {
    egnViolationList.innerHTML = '';
    const text = egnInput.value.trim();

    if (!text) {
      egnSchemaBadge.className = 'badge badge-neutral';
      egnSchemaBadge.textContent = 'Awaiting Input';
      egnGameplayBadge.className = 'badge badge-neutral';
      egnGameplayBadge.textContent = 'Awaiting Input';
      egnStatDeals.textContent = '-';
      egnStatSize.textContent = '-';
      egnStatScore.textContent = '-';
      egnHashBaseline.textContent = '-';
      egnHashGame.textContent = '-';
      egnHashFull.textContent = '-';
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      egnSchemaBadge.className = 'badge badge-invalid';
      egnSchemaBadge.textContent = 'Invalid JSON';
      egnGameplayBadge.className = 'badge badge-neutral';
      egnGameplayBadge.textContent = 'Skipped';
      renderViolations([
        { code: 'JSON_SYNTAX_ERROR', message: e.message, instancePath: '/' }
      ], egnViolationList);
      return;
    }

    // Update Stats
    const dealCount = Array.isArray(parsed.deals) ? parsed.deals.length : 0;
    egnStatDeals.textContent = dealCount;
    egnStatSize.textContent = formatBytes(new Blob([text]).size);

    if (parsed.metadata && Array.isArray(parsed.metadata.finalScore)) {
      egnStatScore.textContent = `${parsed.metadata.finalScore[0]} - ${parsed.metadata.finalScore[1]}`;
    } else {
      try {
        const computed = E.calculateFinalScore(parsed);
        egnStatScore.textContent = `${computed[0]} - ${computed[1]} (Calculated)`;
      } catch (err) {
        egnStatScore.textContent = 'N/A';
      }
    }

    // 1. Schema Validation
    const schemaRes = E.validateEgn(parsed);
    if (schemaRes.isValid) {
      egnSchemaBadge.className = 'badge badge-valid';
      egnSchemaBadge.textContent = '✓ Schema Valid';
    } else {
      egnSchemaBadge.className = 'badge badge-invalid';
      egnSchemaBadge.textContent = '✗ Schema Invalid';
    }

    // 2. Gameplay Validation
    let gameplayRes = { isValid: true, violations: [] };
    try {
      gameplayRes = E.validateGameplay(parsed, { checkHandInventory: true });
      if (gameplayRes.isValid) {
        egnGameplayBadge.className = 'badge badge-valid';
        egnGameplayBadge.textContent = '✓ Gameplay Valid';
      } else {
        egnGameplayBadge.className = 'badge badge-invalid';
        egnGameplayBadge.textContent = `✗ ${gameplayRes.violations.length} Rule Violation(s)`;
      }
    } catch (err) {
      gameplayRes = {
        isValid: false,
        violations: [{ code: 'ENGINE_ERROR', message: err.message, dealIndex: 0 }]
      };
      egnGameplayBadge.className = 'badge badge-warn';
      egnGameplayBadge.textContent = 'Engine Error';
    }

    // Aggregate & Render Violations
    const allViolations = [];
    if (!schemaRes.isValid && schemaRes.errors) {
      schemaRes.errors.forEach(err => {
        allViolations.push({
          code: 'SCHEMA_ERROR',
          message: err.message || 'Validation failed',
          instancePath: err.instancePath || '/'
        });
      });
    }
    if (!gameplayRes.isValid && gameplayRes.violations) {
      allViolations.push(...gameplayRes.violations);
    }

    if (allViolations.length > 0) {
      renderViolations(allViolations, egnViolationList);
    } else {
      egnViolationList.innerHTML = '<div style="color: var(--accent-green); font-size: 0.88rem; padding: 12px; font-weight: 600;">✓ All Schema and Euchre gameplay rules passed with 0 violations!</div>';
    }

    // Update Hashes
    try {
      egnHashBaseline.textContent = E.hashBaselineEgn(parsed);
      egnHashGame.textContent = E.hashEgn(parsed);
      egnHashFull.textContent = E.hashFullEgn(parsed);
    } catch (e) {
      egnHashBaseline.textContent = 'Error computing hash';
      egnHashGame.textContent = '-';
      egnHashFull.textContent = '-';
    }
  }

  function renderViolations(violations, container) {
    container.innerHTML = '';
    violations.forEach(v => {
      const item = document.createElement('div');
      item.className = 'violation-item';

      const code = document.createElement('div');
      code.className = 'violation-code';
      code.textContent = v.code || 'VIOLATION';
      item.appendChild(code);

      const msg = document.createElement('div');
      msg.className = 'violation-msg';
      msg.textContent = v.message;
      item.appendChild(msg);

      if (v.instancePath || v.dealIndex !== undefined) {
        const path = document.createElement('div');
        path.className = 'violation-path';
        path.textContent = v.instancePath
          ? `Path: ${v.instancePath}`
          : `Deal #${(v.dealIndex || 0) + 1}${v.trickIndex !== undefined ? `, Trick #${v.trickIndex + 1}` : ''}`;
        item.appendChild(path);
      }

      container.appendChild(item);
    });
  }

  // EGN Input Events
  egnInput.addEventListener('input', () => {
    validateEgnWorkspace();
  });

  // Preset Sample Loader
  egnSampleSelect.addEventListener('change', () => {
    const key = egnSampleSelect.value;
    if (SAMPLES.egn[key]) {
      egnInput.value = JSON.stringify(SAMPLES.egn[key], null, 2);
      validateEgnWorkspace();
    }
  });

  // EGN Converters
  document.getElementById('btn-egn-pack').addEventListener('click', () => {
    try {
      const parsed = parseEgnInput();
      const packed = E.packEgnFile(parsed);
      const jsonStr = JSON.stringify(packed, null, 2);
      egnOutput.value = jsonStr;
      egnInput.value = jsonStr;
      validateEgnWorkspace();
    } catch (e) {
      alert("Deal packing failed: " + e.message);
    }
  });

  document.getElementById('btn-egn-unpack').addEventListener('click', () => {
    try {
      const parsed = parseEgnInput();
      const unpacked = E.unpackEgnFile(parsed);
      const jsonStr = JSON.stringify(unpacked, null, 2);
      egnOutput.value = jsonStr;
      egnInput.value = jsonStr;
      validateEgnWorkspace();
    } catch (e) {
      alert("Deal unpacking failed: " + e.message);
    }
  });

  document.getElementById('btn-egn-baseline').addEventListener('click', () => {
    try {
      const parsed = parseEgnInput();
      const baseline = E.convertToBaselineEgn(parsed);
      egnOutput.value = JSON.stringify(baseline, null, 2);
    } catch (e) {
      alert("Baseline conversion failed: " + e.message);
    }
  });

  document.getElementById('btn-egn-upgrade').addEventListener('click', () => {
    try {
      const upgraded = E.upgradeEgn(egnInput.value.trim());
      const jsonStr = typeof upgraded === 'string' ? upgraded : JSON.stringify(upgraded, null, 2);
      egnOutput.value = jsonStr;
      egnInput.value = jsonStr;
      validateEgnWorkspace();
    } catch (e) {
      alert("Upgrade failed: " + e.message);
    }
  });

  // EGN Binary Export (.egnb)
  document.getElementById('btn-egn-to-bin').addEventListener('click', () => {
    try {
      const parsed = parseEgnInput();
      const condensed = document.getElementById('egn-bin-mode-select').value === 'condensed';
      const binData = E.convertEgnFileToBinData(parsed, condensed);

      const blob = new Blob([binData], { type: 'application/octet-stream' });
      const filename = `${parsed.metadata?.gameId || 'game'}.${condensed ? 'condensed' : 'expanded'}.egnb`;
      downloadBlob(blob, filename);

      const origSize = new Blob([JSON.stringify(parsed)]).size;
      const binSize = binData.length;
      const savings = Math.round((1 - binSize / origSize) * 100);

      egnOutput.value = `// Successfully encoded Protobuf Binary: ${filename}\n// Original JSON Size: ${formatBytes(origSize)}\n// Encoded Binary Size: ${formatBytes(binSize)} (${savings}% size reduction)\n// Magic Byte Header: 0x0${binData[0]} (${condensed ? 'Condensed' : 'Expanded'})\n\n// Base64 Binary Stream:\n${btoa(String.fromCharCode.apply(null, binData))}`;
    } catch (e) {
      alert("Binary encoding failed: " + e.message);
    }
  });

  // EGN Replayer Bridge
  document.getElementById('btn-egn-replayer').addEventListener('click', () => {
    try {
      const text = egnInput.value.trim();
      if (!text) {
        alert("Please load or paste an EGN game first.");
        return;
      }
      JSON.parse(text); // Validate syntax
      localStorage.setItem('egn_workbench_replay_data', text);
      window.open('../baseline-replayer/index.html?source=workbench', '_blank');
    } catch (e) {
      alert("Cannot launch replayer: Invalid EGN JSON.");
    }
  });

  // ==========================================================================
  // EMN OPERATIONS
  // ==========================================================================

  function parseEmnInput() {
    const text = emnInput.value.trim();
    if (!text) throw new Error("Please enter or paste EMN JSON or upload a file first.");
    return JSON.parse(text);
  }

  function validateEmnWorkspace() {
    emnViolationList.innerHTML = '';
    const text = emnInput.value.trim();

    if (!text) {
      emnSchemaBadge.className = 'badge badge-neutral';
      emnSchemaBadge.textContent = 'Awaiting Input';
      emnGameplayBadge.className = 'badge badge-neutral';
      emnGameplayBadge.textContent = 'Awaiting Input';
      emnStatGames.textContent = '-';
      emnStatPlayers.textContent = '-';
      emnStatFormat.textContent = '-';
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      emnSchemaBadge.className = 'badge badge-invalid';
      emnSchemaBadge.textContent = 'Invalid JSON';
      emnGameplayBadge.className = 'badge badge-neutral';
      emnGameplayBadge.textContent = 'Skipped';
      renderViolations([
        { code: 'JSON_SYNTAX_ERROR', message: e.message, instancePath: '/' }
      ], emnViolationList);
      return;
    }

    // Update EMN Stats
    const gamesCount = Array.isArray(parsed.games) ? parsed.games.length : 0;
    emnStatGames.textContent = gamesCount;
    const playersCount = parsed.metadata && Array.isArray(parsed.metadata.players) ? parsed.metadata.players.length : 0;
    emnStatPlayers.textContent = playersCount;
    emnStatFormat.textContent = parsed.metadata?.matchFormat?.type || 'N/A';

    // 1. EMN Schema & Integrity Validation
    const emnRes = E.validateEmn(parsed);
    if (emnRes.isValid) {
      emnSchemaBadge.className = 'badge badge-valid';
      emnSchemaBadge.textContent = '✓ Schema & Master IDs Valid';
    } else {
      emnSchemaBadge.className = 'badge badge-invalid';
      emnSchemaBadge.textContent = '✗ Schema/Integrity Error';
    }

    // 2. Multi-Game Gameplay Validation
    const matchViolations = [];
    if (Array.isArray(parsed.games)) {
      parsed.games.forEach((game, gIdx) => {
        if (game.gameData && typeof game.gameData === 'object') {
          try {
            const res = E.validateGameplay(game.gameData);
            if (!res.isValid && res.violations) {
              res.violations.forEach(v => {
                matchViolations.push({
                  code: `GAME_${gIdx + 1}_${v.code}`,
                  message: `[Game ${gIdx + 1}] ${v.message}`,
                  instancePath: `/games/${gIdx}/gameData`
                });
              });
            }
          } catch (err) {
            matchViolations.push({
              code: `GAME_${gIdx + 1}_ENGINE_ERROR`,
              message: `[Game ${gIdx + 1}] Rules engine error: ${err.message}`,
              instancePath: `/games/${gIdx}`
            });
          }
        }
      });
    }

    if (matchViolations.length === 0) {
      emnGameplayBadge.className = 'badge badge-valid';
      emnGameplayBadge.textContent = '✓ All Sub-Games Gameplay Valid';
    } else {
      emnGameplayBadge.className = 'badge badge-invalid';
      emnGameplayBadge.textContent = `✗ ${matchViolations.length} Sub-Game Violation(s)`;
    }

    // Render Violations
    const allViolations = [];
    if (!emnRes.isValid && emnRes.errors) {
      emnRes.errors.forEach(err => {
        allViolations.push({
          code: 'SCHEMA_INTEGRITY_ERROR',
          message: err.message,
          instancePath: err.instancePath
        });
      });
    }
    allViolations.push(...matchViolations);

    if (allViolations.length > 0) {
      renderViolations(allViolations, emnViolationList);
    } else {
      emnViolationList.innerHTML = '<div style="color: var(--accent-green); font-size: 0.88rem; padding: 12px; font-weight: 600;">✓ Match schema, master players, seat overrides, and all sub-games passed with 0 errors!</div>';
    }
  }

  // EMN Input Events
  emnInput.addEventListener('input', () => {
    validateEmnWorkspace();
  });

  emnSampleSelect.addEventListener('change', () => {
    const key = emnSampleSelect.value;
    if (SAMPLES.emn[key]) {
      emnInput.value = JSON.stringify(SAMPLES.emn[key], null, 2);
      validateEmnWorkspace();
    }
  });

  // EMN Converters
  document.getElementById('btn-emn-pack').addEventListener('click', () => {
    try {
      const parsed = parseEmnInput();
      const packed = E.packEmnFile(parsed);
      const jsonStr = JSON.stringify(packed, null, 2);
      emnOutput.value = jsonStr;
      emnInput.value = jsonStr;
      validateEmnWorkspace();
    } catch (e) {
      alert("EMN packing failed: " + e.message);
    }
  });

  document.getElementById('btn-emn-unpack').addEventListener('click', () => {
    try {
      const parsed = parseEmnInput();
      const unpacked = E.unpackEmnFile(parsed);
      const jsonStr = JSON.stringify(unpacked, null, 2);
      emnOutput.value = jsonStr;
      emnInput.value = jsonStr;
      validateEmnWorkspace();
    } catch (e) {
      alert("EMN unpacking failed: " + e.message);
    }
  });

  document.getElementById('btn-emn-to-bin').addEventListener('click', () => {
    try {
      const parsed = parseEmnInput();
      const condense = document.getElementById('emn-bin-condense-chk').checked;
      const binData = E.emnToBinary(parsed, { condenseGames: condense });

      const blob = new Blob([binData], { type: 'application/octet-stream' });
      const filename = `${parsed.metadata?.matchId || 'match'}.emnb`;
      downloadBlob(blob, filename);

      const origSize = new Blob([JSON.stringify(parsed)]).size;
      const binSize = binData.length;
      const savings = Math.round((1 - binSize / origSize) * 100);

      emnOutput.value = `// Successfully encoded Protobuf Match Binary: ${filename}\n// Original JSON Size: ${formatBytes(origSize)}\n// Encoded Binary Size: ${formatBytes(binSize)} (${savings}% size reduction)\n// Magic Byte Header: 0x02 (EMN)\n// Condense Sub-Game Deals: ${condense}\n\n// Base64 Binary Stream:\n${btoa(String.fromCharCode.apply(null, binData))}`;
    } catch (e) {
      alert("EMN binary encoding failed: " + e.message);
    }
  });

  document.getElementById('btn-emn-score').addEventListener('click', () => {
    try {
      const parsed = parseEmnInput();
      const scores = E.calculateEmnScores(parsed);
      emnOutput.value = `// Calculated Match Standings & Scores:\n` + JSON.stringify(scores, null, 2);
    } catch (e) {
      alert("EMN scoring calculation failed: " + e.message);
    }
  });

  // ==========================================================================
  // CROSS-FORMAT: COMBINER & EXTRACTOR
  // ==========================================================================

  // Combiner
  document.getElementById('btn-combine-add-sample').addEventListener('click', () => {
    const area = document.createElement('div');
    area.className = 'combiner-entry';
    area.style.marginBottom = '12px';
    area.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary);">Sub-Game EGN</span>
        <button class="btn btn-sm btn-secondary btn-remove-subgame" type="button" style="color: var(--accent-rose);">Remove</button>
      </div>
      <textarea class="code-textarea subgame-textarea" style="min-height: 120px; height: 120px;">${JSON.stringify(SAMPLES.egn.standard, null, 2)}</textarea>
    `;
    area.querySelector('.btn-remove-subgame').addEventListener('click', () => area.remove());
    combinerInputList.appendChild(area);
  });

  document.getElementById('btn-run-combine').addEventListener('click', () => {
    try {
      const textareas = combinerInputList.querySelectorAll('.subgame-textarea');
      if (textareas.length === 0) {
        alert("Please add at least one sub-game EGN or use the sample button.");
        return;
      }

      const egnFiles = [];
      textareas.forEach((ta, idx) => {
        const t = ta.value.trim();
        if (t) {
          try {
            egnFiles.push(JSON.parse(t));
          } catch (err) {
            throw new Error(`Sub-Game #${idx + 1} has invalid JSON syntax: ${err.message}`);
          }
        }
      });

      if (egnFiles.length === 0) throw new Error("No valid sub-games found.");

      const format = combinerFormatSelect.value;
      const targetVal = parseInt(combinerTargetInput.value, 10);
      const target = isNaN(targetVal) ? undefined : targetVal;
      const title = combinerTitleInput.value.trim() || undefined;

      const combined = E.combineEgnToEmn(egnFiles, { format, target, title });
      const jsonStr = JSON.stringify(combined, null, 2);
      combinerOutput.value = jsonStr;

      // Also set in EMN tab for convenience
      emnInput.value = jsonStr;
      validateEmnWorkspace();
    } catch (e) {
      alert("Combine error: " + e.message);
    }
  });

  // Extractor
  document.getElementById('btn-load-sample-extractor').addEventListener('click', () => {
    extractorEmnInput.value = JSON.stringify(SAMPLES.emn.matchBestOf3, null, 2);
    updateExtractorGameOptions();
  });

  function updateExtractorGameOptions() {
    extractorGameSelect.innerHTML = '';
    const text = extractorEmnInput.value.trim();
    if (!text) return;

    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed.games)) {
        parsed.games.forEach((g, idx) => {
          const opt = document.createElement('option');
          opt.value = idx;
          const gameTitle = g.gameData?.metadata?.title || `Game ${idx + 1}`;
          opt.textContent = `Game ${idx + 1}: ${gameTitle}`;
          extractorGameSelect.appendChild(opt);
        });
      }
    } catch (e) {
      // ignore
    }
  }

  extractorEmnInput.addEventListener('input', () => {
    updateExtractorGameOptions();
  });

  document.getElementById('btn-extract-game').addEventListener('click', () => {
    try {
      const text = extractorEmnInput.value.trim();
      if (!text) throw new Error("Please enter or paste an EMN match file first.");
      const parsed = JSON.parse(text);
      const gameIdx = parseInt(extractorGameSelect.value, 10);
      if (isNaN(gameIdx)) throw new Error("Please select a game index to extract.");

      const extracted = E.extractEgnFromEmn(parsed, gameIdx);
      extractorOutput.value = JSON.stringify(extracted, null, 2);
    } catch (e) {
      alert("Extraction error: " + e.message);
    }
  });

  document.getElementById('btn-extract-all').addEventListener('click', () => {
    try {
      const text = extractorEmnInput.value.trim();
      if (!text) throw new Error("Please enter or paste an EMN match file first.");
      const parsed = JSON.parse(text);
      const allGames = E.extractAllEgnsFromEmn(parsed);

      extractorOutput.value = `// Extracted ${allGames.length} Game(s):\n` + JSON.stringify(allGames, null, 2);
    } catch (e) {
      alert("Extraction error: " + e.message);
    }
  });

  // ==========================================================================
  // DRAG & DROP FILE HANDLING
  // ==========================================================================

  function setupDropzone(dropzone, fileInput, onFileLoaded) {
    dropzone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        handleFile(files[0], onFileLoaded);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (fileInput.files && fileInput.files.length > 0) {
        handleFile(fileInput.files[0], onFileLoaded);
      }
    });
  }

  function handleFile(file, callback) {
    const isBinary = file.name.endsWith('.egnb') || file.name.endsWith('.emnb');

    if (isBinary) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const uint8 = new Uint8Array(arrayBuffer);
        callback(uint8, file.name, true);
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        callback(e.target.result, file.name, false);
      };
      reader.readAsText(file);
    }
  }

  // Hook up EGN Dropzone
  setupDropzone(egnDropzone, egnFileInput, (content, filename, isBinary) => {
    if (isBinary) {
      try {
        const jsonStr = E.convertBinDataToEgnJson(content);
        egnInput.value = jsonStr;
        validateEgnWorkspace();
      } catch (err) {
        alert(`Failed to decode binary file ${filename}: ${err.message}`);
      }
    } else {
      egnInput.value = content;
      validateEgnWorkspace();
    }
  });

  // Hook up EMN Dropzone
  setupDropzone(emnDropzone, emnFileInput, (content, filename, isBinary) => {
    if (isBinary) {
      try {
        const jsonStr = E.convertBinDataToEmnJson(content, { unpackGames: true });
        emnInput.value = jsonStr;
        validateEmnWorkspace();
      } catch (err) {
        alert(`Failed to decode binary file ${filename}: ${err.message}`);
      }
    } else {
      emnInput.value = content;
      validateEmnWorkspace();
    }
  });

  // Hook up Copy Buttons
  document.querySelectorAll('.btn-copy-hash').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        copyToClipboard(targetEl.textContent.trim(), btn);
      }
    });
  });

  document.getElementById('btn-copy-egn-output').addEventListener('click', (e) => {
    copyToClipboard(egnOutput.value, e.target);
  });

  document.getElementById('btn-copy-emn-output').addEventListener('click', (e) => {
    copyToClipboard(emnOutput.value, e.target);
  });

  document.getElementById('btn-copy-combiner-output').addEventListener('click', (e) => {
    copyToClipboard(combinerOutput.value, e.target);
  });

  document.getElementById('btn-copy-extractor-output').addEventListener('click', (e) => {
    copyToClipboard(extractorOutput.value, e.target);
  });

  // ==========================================================================
  // DEAL PLAYER CARDS WORKSPACE OPERATIONS
  // ==========================================================================

  function updateDealIndexSelect(count) {
    if (count > 1) {
      dealFileIndexContainer.style.display = 'flex';
      const prevVal = dealFileIndexSelect.value;
      dealFileIndexSelect.innerHTML = '';
      for (let i = 0; i < count; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `Deal ${i}`;
        dealFileIndexSelect.appendChild(opt);
      }
      if (prevVal && parseInt(prevVal, 10) < count) {
        dealFileIndexSelect.value = prevVal;
      }
    } else {
      dealFileIndexContainer.style.display = 'none';
    }
  }

  function calculateDealCardsWorkspace() {
    const raw = dealInput.value.trim();
    if (!raw) {
      dealSourceBadge.className = 'badge badge-neutral';
      dealSourceBadge.textContent = 'Awaiting Input';
      dealStatDealer.textContent = '-';
      dealStatUpcard.textContent = '-';
      dealStatTrump.textContent = '-';
      dealStatMaker.textContent = '-';
      for (let s = 0; s < 4; s++) {
        const b = document.getElementById(`seat-badge-${s}`);
        const c = document.getElementById(`seat-cards-${s}`);
        if (b) {
          b.className = 'badge badge-neutral';
          b.textContent = 'Waiting';
        }
        if (c) {
          c.innerHTML = '<span style="color: var(--text-muted); font-size: 0.8rem;">No cards calculated</span>';
        }
      }
      dealOutput.value = '';
      return;
    }

    try {
      let dealObj = null;
      let ruleset = undefined;

      if (!raw.startsWith('{') && !raw.startsWith('[')) {
        // Condensed Base64 deal string
        dealObj = E.unpackDeal(raw, 0);
        dealFileIndexContainer.style.display = 'none';
      } else {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.deals)) {
          currentLoadedEgn = parsed;
          ruleset = parsed.metadata?.ruleset;
          updateDealIndexSelect(parsed.deals.length);
          const selIdx = parseInt(dealFileIndexSelect.value || '0', 10);
          const candidate = parsed.deals[selIdx] || parsed.deals[0];
          dealObj = typeof candidate === 'string' ? E.unpackDeal(candidate, selIdx) : candidate;
        } else if (Array.isArray(parsed)) {
          updateDealIndexSelect(parsed.length);
          const selIdx = parseInt(dealFileIndexSelect.value || '0', 10);
          const candidate = parsed[selIdx] || parsed[0];
          dealObj = typeof candidate === 'string' ? E.unpackDeal(candidate, selIdx) : candidate;
        } else {
          dealObj = parsed;
          dealFileIndexContainer.style.display = 'none';
        }
      }

      if (!dealObj || typeof dealObj !== 'object') {
        throw new Error('Input is not a valid Deal structure.');
      }

      const rawHands = dealObj.initialState?.playerCards;
      const hasComplete = Array.isArray(rawHands) &&
        rawHands.length === 4 &&
        rawHands.every(h => Array.isArray(h) && h.length === 5);

      // Run engine calculation
      const cards = E.inferPlayerCards(dealObj, ruleset);

      // Update Source Badge
      if (hasComplete) {
        dealSourceBadge.className = 'badge badge-success';
        dealSourceBadge.textContent = '✓ Provided Directly (4x5 cards)';
      } else {
        dealSourceBadge.className = 'badge badge-info';
        dealSourceBadge.textContent = '⚡ Inferred from Play';
      }

      // Update Stats
      const dealer = dealObj.initialState?.dealer ?? 0;
      dealStatDealer.textContent = `Seat ${dealer}`;
      dealStatUpcard.textContent = dealObj.initialState?.upCard || 'None';

      const trump = E.determineTrump(dealObj);
      const suitSymbols = { s: '♠ Spades', h: '♥ Hearts', c: '♣ Clubs', d: '♦ Diamonds' };
      dealStatTrump.textContent = trump ? (suitSymbols[trump.toLowerCase()] || trump.toUpperCase()) : 'None';

      const maker = E.determineMaker(dealObj);
      const isAlone = E.determineIsAlone(dealObj);
      if (maker !== null) {
        dealStatMaker.textContent = `Seat ${maker} (Team ${maker % 2})${isAlone ? ' [Alone]' : ''}`;
      } else {
        dealStatMaker.textContent = 'All Passed';
      }

      let sitOutSeat = null;
      if (isAlone && maker !== null) {
        sitOutSeat = (maker + 2) % 4;
      }

      // Render cards for Seats 0..3
      for (let s = 0; s < 4; s++) {
        const badge = document.getElementById(`seat-badge-${s}`);
        const container = document.getElementById(`seat-cards-${s}`);
        if (!badge || !container) continue;

        if (s === dealer) {
          badge.className = 'badge badge-purple';
          badge.textContent = 'Dealer';
        } else if (s === maker) {
          badge.className = 'badge badge-cyan';
          badge.textContent = isAlone ? 'Maker (Alone)' : 'Maker';
        } else if (s === sitOutSeat) {
          badge.className = 'badge badge-neutral';
          badge.textContent = 'Sitting Out';
        } else {
          badge.className = 'badge badge-neutral';
          badge.textContent = `Team ${s % 2}`;
        }

        const seatCards = cards[s] || [];
        container.innerHTML = '';
        if (seatCards.length === 0) {
          container.innerHTML = `<span style="color: var(--text-muted); font-size: 0.8rem;">${s === sitOutSeat ? 'Sat out (loner call)' : 'No cards dealt'}</span>`;
        } else {
          seatCards.forEach(c => {
            const chip = document.createElement('span');
            const suit = c.length >= 2 ? c[1].toLowerCase() : '';
            const isRed = suit === 'h' || suit === 'd';
            chip.className = `card-chip ${isRed ? 'suit-red' : 'suit-black'}`;
            const suitIcon = suit === 's' ? '♠' : suit === 'h' ? '♥' : suit === 'd' ? '♦' : suit === 'c' ? '♣' : suit;
            chip.textContent = `${c[0]}${suitIcon}`;
            container.appendChild(chip);
          });
        }
      }

      dealOutput.value = chkDealCompact.checked ? JSON.stringify(cards) : JSON.stringify(cards, null, 2);
    } catch (e) {
      dealSourceBadge.className = 'badge badge-error';
      dealSourceBadge.textContent = 'Evaluation Error';
      dealOutput.value = 'Error calculating player cards: ' + e.message;
    }
  }

  // Deal Input Events
  dealInput.addEventListener('input', () => {
    calculateDealCardsWorkspace();
  });

  dealFileIndexSelect.addEventListener('change', () => {
    calculateDealCardsWorkspace();
  });

  chkDealCompact.addEventListener('change', () => {
    calculateDealCardsWorkspace();
  });

  document.getElementById('btn-deal-calc').addEventListener('click', () => {
    calculateDealCardsWorkspace();
  });

  document.getElementById('btn-deal-format').addEventListener('click', () => {
    try {
      const raw = dealInput.value.trim();
      if (raw.startsWith('{') || raw.startsWith('[')) {
        dealInput.value = JSON.stringify(JSON.parse(raw), null, 2);
      }
    } catch (e) {
      alert('Cannot format invalid JSON: ' + e.message);
    }
  });

  document.getElementById('btn-deal-clear').addEventListener('click', () => {
    dealInput.value = '';
    calculateDealCardsWorkspace();
  });

  document.getElementById('btn-copy-deal-output').addEventListener('click', (e) => {
    copyToClipboard(dealOutput.value, e.target);
  });

  // Deal Sample Selector
  dealSampleSelect.addEventListener('change', () => {
    const key = dealSampleSelect.value;
    if (SAMPLES.deal && SAMPLES.deal[key]) {
      const sample = SAMPLES.deal[key];
      dealInput.value = typeof sample === 'string' ? sample : JSON.stringify(sample, null, 2);
      calculateDealCardsWorkspace();
    }
  });

  // Deal Dropzone & File Upload
  setupDropzone(dealDropzone, dealFileInput, (content) => {
    dealInput.value = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    calculateDealCardsWorkspace();
  });

  // Bridge from EGN Studio to Deal Player Cards tab
  document.getElementById('btn-egn-deal-cards').addEventListener('click', () => {
    try {
      const parsed = parseEgnInput();
      if (!Array.isArray(parsed.deals) || parsed.deals.length === 0) {
        alert('Active EGN has no deals to evaluate.');
        return;
      }
      dealInput.value = JSON.stringify(parsed, null, 2);
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      document.getElementById('nav-tab-deal').classList.add('active');
      document.getElementById('tab-deal').classList.add('active');
      calculateDealCardsWorkspace();
    } catch (e) {
      alert('Failed to load deal from EGN: ' + e.message);
    }
  });

  // Initial Workspace Population with Sample
  egnInput.value = JSON.stringify(SAMPLES.egn.standard, null, 2);
  validateEgnWorkspace();

  emnInput.value = JSON.stringify(SAMPLES.emn.matchBestOf3, null, 2);
  validateEmnWorkspace();

  updateExtractorGameOptions();

  dealInput.value = JSON.stringify(SAMPLES.deal.inferred, null, 2);
  calculateDealCardsWorkspace();

})();
