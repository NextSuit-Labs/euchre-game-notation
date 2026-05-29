import { describe, it, expect } from "@jest/globals";
import { validateEGN, isEGNFile } from "../src/validator";

const validMockData = {
  "fileType": "Euchre Game Notation",
  "version": "1.0.0",
  "metadata": {
    "matchId": "egn_m_20260528_01",
    "title": "WEC Finals",
    "description": "Championship bracket match recorded live from local venue stream.",
    "date": "2026-05-17T19:00:00Z",
    "players": ["Player0", "Player1", "Player2", "Player3"],
    "initialScore": [0, 0],
    "ruleset": {
      "std": true,
      "canadian": false,
      "loner_lead": "LEFT_OF_DEALER"
    }
  },
  "deals": [
    {
      "dealNumber": 0,
      "initialState": {
        "dealer": 3,
        "upCard": "Jd",
        "kitty": ["9h", "Qh", "As"]
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": ["Pass", "Pass", "Pass", "Order"],
          "isAlone": false,
          "discard": "9s"
        },
        {
          "phaseNumber": 1,
          "type": "TRICK_PLAY",
          "initialLead": 0,
          "tricks": [
            ["Ac", "Tc", "9c", "Kc"],
            ["Ah", "Kh", "Th", "Qd"],
            ["Jd", "9d", "Ad", "Kd"],
            ["Jh", "Td", "Ks", "Ts"],
            ["Qc", "Qs", "Js", "Jc"]
          ]
        }
      ]
    }
  ]
};

describe("EGN Validator", () => {
  it("should successfully validate a correct EGN file", () => {
    const result = validateEGN(validMockData);
    
    // If validation fails, logging the errors helps with debugging
    if (!result.isValid) {
      console.error(result.errors);
    }
    
    expect(result.isValid).toBe(true);
    expect(result.errors).toBeFalsy();
  });

  it("should reject an invalid EGN file", () => {
    const invalidData = {
      fileType: "Not Euchre",
      version: "1.0.0"
      // Missing required metadata and deals
    };
    const result = validateEGN(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it("isEGNFile should work correctly as a type guard", () => {
    expect(isEGNFile(validMockData)).toBe(true);
    expect(isEGNFile({})).toBe(false);
  });
});