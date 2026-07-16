import { describe, it, expect } from "@jest/globals";
import {
  packDeal,
  unpackDeal,
  binaryStringToBase64Url,
  base64UrlToBinaryString,
  PackOptions,
} from "../src/bitpacker";
import { BiddingPhase, Deal, TrickPlayPhase } from "../src/types";

describe("EGN Bitpacker Helpers", () => {
  it("should convert binary strings to base64url and back exactly", () => {
    const binary = "10101010111100001100110000110011";
    const b64 = binaryStringToBase64Url(binary);
    const roundtrip = base64UrlToBinaryString(b64);

    // Since binaryStringToBase64Url pads with 0s to byte boundaries,
    // we check that the original binary is a prefix of the roundtripped binary
    expect(roundtrip.startsWith(binary)).toBe(true);
  });

  it("should handle padding correctly in base64url conversion", () => {
    const emptyBinary = "";
    const b64 = binaryStringToBase64Url(emptyBinary);
    expect(b64).toBe("");
    expect(base64UrlToBinaryString(b64)).toBe("");
  });
});

describe("packDeal and unpackDeal edge/error cases", () => {
  it("should fail when packing a card not in remaining cards list", () => {
    const invalidDeal: Deal = {
      dealNumber: 0,
      initialState: {
        dealer: 0,
        upCard: "Jd"
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass"],
          isAlone: false
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Ac", "Tc", "9c", "Kc"],
            // Duplicate card: "Ac" has already been played
            ["Ac", "Qs", "Js", "Jc"]
          ]
        }
      ]
    };

    expect(() => packDeal(invalidDeal)).toThrow("not found in remaining cards");
  });

  it("should fail when packing an invalid card name", () => {
    const invalidDeal: Deal = {
      dealNumber: 0,
      initialState: {
        dealer: 0,
        // Card that does not exist in standard deck
        upCard: "Xz"
      },
      phases: []
    };

    expect(() => packDeal(invalidDeal)).toThrow("not found in remaining cards");
  });

  it("should successfully unpack a minimal deal with no phases", () => {
    const deal: Deal = {
      dealNumber: 5,
      initialState: {
        dealer: 1,
        upCard: "Ah"
      },
      phases: []
    };
    const packed = packDeal(deal);
    const unpacked = unpackDeal(packed, 5);

    expect(unpacked.dealNumber).toBe(5);
    expect(unpacked.initialState.dealer).toBe(1);
    expect(unpacked.initialState.upCard).toBe("Ah");
    expect(unpacked.phases.length).toBe(0);
  });

  it("should successfully unpack using raw binary string with isBinary=true", () => {
    const deal: Deal = {
      dealNumber: 5,
      initialState: {
        dealer: 1,
        upCard: "Ah"
      },
      phases: []
    };
    const packed = packDeal(deal);
    const binary = base64UrlToBinaryString(packed);
    const unpacked = unpackDeal(binary, 5, true);

    expect(unpacked.dealNumber).toBe(5);
    expect(unpacked.initialState.dealer).toBe(1);
    expect(unpacked.initialState.upCard).toBe("Ah");
    expect(unpacked.phases.length).toBe(0);
  });

  it("should successfully pack as binary string with asBinary=true and roundtrip", () => {
    const deal: Deal = {
      dealNumber: 5,
      initialState: {
        dealer: 1,
        upCard: "Ah"
      },
      phases: []
    };
    const binary = packDeal(deal, { asBinary: true });
    expect(/^[01]+$/.test(binary)).toBe(true);

    const unpacked = unpackDeal(binary, 5, true);
    expect(unpacked.dealNumber).toBe(5);
    expect(unpacked.initialState.dealer).toBe(1);
    expect(unpacked.initialState.upCard).toBe("Ah");
  });

  it("should successfully unpack a deal with only a bidding phase", () => {
    const deal: Deal = {
      dealNumber: 2,
      initialState: {
        dealer: 2,
        upCard: "Ts"
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Pass", "Order"],
          isAlone: true
        }
      ]
    };
    const packed = packDeal(deal);
    const unpacked = unpackDeal(packed, 2);

    expect(unpacked.dealNumber).toBe(2);
    expect(unpacked.initialState.dealer).toBe(2);
    expect(unpacked.initialState.upCard).toBe("Ts");
    expect(unpacked.phases.length).toBe(1);
    expect(unpacked.phases[0].type).toBe("EUCHRE_BIDDING");
    expect((unpacked.phases[0] as any).calls).toEqual(["Pass", "Pass", "Pass", "Order"]);
    expect((unpacked.phases[0] as any).isAlone).toBe(true);
  });

  it("should handle second round of bidding in pack/unpack", () => {
    const deal: Deal = {
      dealNumber: 1,
      initialState: {
        dealer: 0,
        upCard: "As" // spade upCard -> second round cannot choose spade (s)
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          // Round 1 passes (4 calls), Round 2: Pass, then Call clubs ("c")
          calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "c"],
          isAlone: false
        }
      ]
    };
    const packed = packDeal(deal);
    const unpacked = unpackDeal(packed, 1);

    expect(unpacked.phases.length).toBe(1);
    expect((unpacked.phases[0] as any).calls).toEqual(["Pass", "Pass", "Pass", "Pass", "Pass", "c"]);
    expect((unpacked.phases[0] as any).isAlone).toBe(false);
  });

  it("should fail to unpack when there are not enough bits to read", () => {
    // "A" decodes to less than 8 bits, so it will fail when reading upcard index
    expect(() => unpackDeal("A")).toThrow("Not enough bits to read");
  });

  it("should handle alone player trick sizes (3 cards per trick) in play phase", () => {
    const deal: Deal = {
      dealNumber: 3,
      initialState: {
        dealer: 3,
        upCard: "Jd"
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Order"],
          isAlone: true
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Ac", "Tc", "9c"],
            ["Ah", "Kh", "Th"]
          ]
        }
      ]
    };

    const packed = packDeal(deal);
    const unpacked = unpackDeal(packed, 3);

    expect(unpacked.phases.length).toBe(2);
    expect(unpacked.phases[0].type).toBe("EUCHRE_BIDDING");
    expect((unpacked.phases[0] as any).isAlone).toBe(true);

    expect(unpacked.phases[1].type).toBe("TRICK_PLAY");
    const playPhase = unpacked.phases[1] as TrickPlayPhase;
    expect(playPhase.tricks.length).toBe(2);
    expect(playPhase.tricks[0].length).toBe(3);
    expect(playPhase.tricks[0]).toEqual(["Ac", "Tc", "9c"]);
  });

  it("should throw error if duplicate cards are played in tricks", () => {
    const invalidDeal: Deal = {
      dealNumber: 0,
      initialState: {
        dealer: 0,
        upCard: "Jd"
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass"],
          isAlone: false
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Ac", "Ac", "Tc", "Kc"]
          ]
        }
      ]
    };
    expect(() => packDeal(invalidDeal)).toThrow("not found in remaining cards");
  });

  it("should handle binary conversion of empty inputs correctly", () => {
    expect(binaryStringToBase64Url("")).toBe("");
    expect(base64UrlToBinaryString("")).toBe("");
  });

  it("should successfully roundtrip alternative lines and annotations in V1", () => {
    const complexDeal: Deal = {
      dealNumber: 4,
      initialState: {
        dealer: 1,
        upCard: "Th"
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Order"],
          isAlone: false,
          callAnnotations: {
            2: ["Bidding annotation 1", "Bidding annotation 2"]
          }
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Ac", "Tc", "9c", "Kc"]
          ],
          playAnnotations: {
            0: ["Play annotation"]
          }
        }
      ],
      alternativeLines: [
        {
          branchIndex: 1,
          phases: [
            {
              phaseNumber: 1,
              type: "TRICK_PLAY",
              tricks: [
                ["Ah", "Kh", "Qh", "Jh"]
              ]
            }
          ]
        }
      ]
    };

    const packed = packDeal(complexDeal);
    const unpacked = unpackDeal(packed, 4);

    expect(unpacked.dealNumber).toBe(4);
    expect(unpacked.initialState.dealer).toBe(1);
    expect(unpacked.initialState.upCard).toBe("Th");

    // Verify main line annotations
    const biddingPhase = unpacked.phases[0] as BiddingPhase;
    expect(biddingPhase.callAnnotations).toBeDefined();
    expect(biddingPhase.callAnnotations![2]).toEqual(["Bidding annotation 1", "Bidding annotation 2"]);

    const playPhase = unpacked.phases[1] as TrickPlayPhase;
    expect(playPhase.playAnnotations).toBeDefined();
    expect(playPhase.playAnnotations![0]).toEqual(["Play annotation"]);

    // Verify alternative line
    expect(unpacked.alternativeLines).toBeDefined();
    expect(unpacked.alternativeLines!.length).toBe(1);
    expect(unpacked.alternativeLines![0].branchIndex).toBe(1);
    expect(unpacked.alternativeLines![0].phases[0].type).toBe("TRICK_PLAY");
    expect((unpacked.alternativeLines![0].phases[0] as TrickPlayPhase).tricks[0]).toEqual(["Ah", "Kh", "Qh", "Jh"]);
  });

  it("should successfully roundtrip multiple alternative lines and complex annotations at different branch indices", () => {
    const complexDeal: Deal = {
      dealNumber: 10,
      initialState: {
        dealer: 0,
        upCard: "Jd"
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "s"],
          isAlone: false,
          callAnnotations: {
            0: ["First pass annotation"],
            5: ["Maker calls suit annotation"]
          }
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Ac", "Tc", "9c", "Kc"],
            ["Ah", "Kh", "Th", "Qd"]
          ],
          playAnnotations: {
            0: ["Play 1 annotation"],
            1: ["Play 2 annotation"]
          }
        }
      ],
      alternativeLines: [
        {
          branchIndex: 0,
          phases: [
            {
              phaseNumber: 0,
              type: "EUCHRE_BIDDING",
              calls: ["Order"],
              isAlone: true
            }
          ]
        },
        {
          branchIndex: 10,
          phases: [
            {
              phaseNumber: 1,
              type: "TRICK_PLAY",
              tricks: [
                ["Ah", "9h", "Th", "Kh"]
              ]
            }
          ]
        }
      ]
    };

    const packed = packDeal(complexDeal);
    const unpacked = unpackDeal(packed, 10);

    expect(unpacked.phases.length).toBe(2);

    // Verify main line annotations
    const bPhase = unpacked.phases[0] as BiddingPhase;
    expect(bPhase.callAnnotations!["0"]).toEqual(["First pass annotation"]);
    expect(bPhase.callAnnotations!["5"]).toEqual(["Maker calls suit annotation"]);

    const pPhase = unpacked.phases[1] as TrickPlayPhase;
    expect(pPhase.playAnnotations!["0"]).toEqual(["Play 1 annotation"]);
    expect(pPhase.playAnnotations!["1"]).toEqual(["Play 2 annotation"]);

    // Verify alternative lines
    expect(unpacked.alternativeLines!.length).toBe(2);

    // Alternative line 0
    expect(unpacked.alternativeLines![0].branchIndex).toBe(0);
    expect(unpacked.alternativeLines![0].phases[0].type).toBe("EUCHRE_BIDDING");
    expect((unpacked.alternativeLines![0].phases[0] as BiddingPhase).calls).toEqual(["Order"]);

    // Alternative line 1
    expect(unpacked.alternativeLines![1].branchIndex).toBe(10);
    expect(unpacked.alternativeLines![1].phases[0].type).toBe("TRICK_PLAY");
    expect((unpacked.alternativeLines![1].phases[0] as TrickPlayPhase).tricks[0]).toEqual(["Ah", "9h", "Th", "Kh"]);
  });

  it("should successfully roundtrip alternative lines that branch mid-trick (non-standard first trick size)", () => {
    const midTrickDeal: Deal = {
      dealNumber: 4,
      initialState: {
        dealer: 2,
        upCard: "Th"
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "c"],
          isAlone: false,
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Ad", "Tc", "Kc", "Td"],
            ["Ah", "Qc", "Jc", "9h"],
            ["Kd", "9d", "Qd", "9s"],
            ["As", "Qs", "Js", "Ts"]
          ],
        }
      ],
      alternativeLines: [
        {
          branchIndex: 7, // 6 bidding calls + 1 card played (Ad) = 7
          phases: [
            {
              phaseNumber: 0,
              type: "TRICK_PLAY",
              tricks: [
                ["Ac", "Qs", "9h"], // 3 cards instead of 4
                ["As", "Ks", "Ts", "9s"]
              ]
            }
          ]
        }
      ]
    };

    const packed = packDeal(midTrickDeal);
    const unpacked = unpackDeal(packed, 4);

    expect(unpacked.alternativeLines).toBeDefined();
    expect(unpacked.alternativeLines!.length).toBe(1);
    expect(unpacked.alternativeLines![0].branchIndex).toBe(7);

    const altPhase = unpacked.alternativeLines![0].phases[0] as TrickPlayPhase;
    expect(altPhase.tricks[0]).toEqual(["Ac", "Qs", "9h"]);
    expect(altPhase.tricks[1]).toEqual(["As", "Ks", "Ts", "9s"]);
  });
});

// ---------------------------------------------------------------------------
// V2 — Basic round-trips
// ---------------------------------------------------------------------------

describe("V2 Bitpacker — basic round-trips", () => {
  it("V2 encodes and decodes a minimal deal (no phases)", () => {
    const deal: Deal = {
      dealNumber: 1,
      initialState: { dealer: 0, upCard: "Ah" },
      phases: [],
    };
    const packed = packDeal(deal, { version: 2 });
    const unpacked = unpackDeal(packed, 1);

    expect(unpacked.initialState.dealer).toBe(0);
    expect(unpacked.initialState.upCard).toBe("Ah");
    expect(unpacked.phases.length).toBe(0);
  });

  it("V2 produces a different bitstream from V1 for the same deal", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 1, upCard: "Ts" },
      phases: [],
    };
    const v1 = packDeal(deal, { version: 1 });
    const v2 = packDeal(deal, { version: 2 });
    expect(v1).not.toBe(v2);
    // Both decode to the same logical content
    expect(unpackDeal(v1).initialState.upCard).toBe("Ts");
    expect(unpackDeal(v2).initialState.upCard).toBe("Ts");
  });

  it("V2 round-trips dealer values 4–7 (beyond V1's 2-bit limit)", () => {
    for (const dealer of [4, 5, 6, 7]) {
      const deal: Deal = {
        dealNumber: 0,
        initialState: { dealer, upCard: "9h" },
        phases: [],
      };
      const packed = packDeal(deal, { version: 2 });
      const unpacked = unpackDeal(packed);
      expect(unpacked.initialState.dealer).toBe(dealer);
    }
  });

  it("V2 round-trips a full bidding + play phase (4-player, standard deck)", () => {
    const deal: Deal = {
      dealNumber: 7,
      initialState: { dealer: 2, upCard: "Jd" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Order"],
          isAlone: false,
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Ac", "Tc", "9c", "Kc"],
            ["Ah", "Kh", "Qh", "Jh"],
          ],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2 });
    const unpacked = unpackDeal(packed, 7);

    expect(unpacked.dealNumber).toBe(7);
    expect(unpacked.initialState.upCard).toBe("Jd");
    const bp = unpacked.phases[0] as BiddingPhase;
    expect(bp.calls).toEqual(["Pass", "Pass", "Order"]);
    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.tricks[0]).toEqual(["Ac", "Tc", "9c", "Kc"]);
    expect(pp.tricks[1]).toEqual(["Ah", "Kh", "Qh", "Jh"]);
  });
});

// ---------------------------------------------------------------------------
// V2 — numPlayers: R1/R2 call boundary
// ---------------------------------------------------------------------------

describe("V2 Bitpacker — numPlayers and R1/R2 boundary", () => {
  it("5-player: R1 has 5 positions (0–4), R2 starts at position 5", () => {
    // upCard=As → R2 remaining suits: [h, c, d]
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "As" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "h"],
          isAlone: false,
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 5 });
    const unpacked = unpackDeal(packed);
    const bp = unpacked.phases[0] as BiddingPhase;
    expect(bp.calls).toEqual(["Pass", "Pass", "Pass", "Pass", "Pass", "h"]);
  });

  it("6-player: R1 has 6 positions, R2 starts at position 6", () => {
    // upCard=Ts → R2 remaining suits: [h, c, d]
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "Ts" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "c"],
          isAlone: false,
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 6 });
    const unpacked = unpackDeal(packed);
    const bp = unpacked.phases[0] as BiddingPhase;
    expect(bp.calls).toEqual(["Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "c"]);
  });

  it("numPlayers=1: R1 has 1 position, round-trips correctly", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9h" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Order"],
          isAlone: false,
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 1 });
    const unpacked = unpackDeal(packed);
    const bp = unpacked.phases[0] as BiddingPhase;
    expect(bp.calls).toEqual(["Order"]);
  });

  it("numPlayers=8: R1 has 8 positions, round-trips correctly", () => {
    // All 8 R1 passes then a R2 hearts call; upCard=As
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "As" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "h"],
          isAlone: false,
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 8 });
    const unpacked = unpackDeal(packed);
    const bp = unpacked.phases[0] as BiddingPhase;
    expect(bp.calls).toEqual(["Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "h"]);
  });
});

// ---------------------------------------------------------------------------
// V2 — cardsPerTrick
// ---------------------------------------------------------------------------

describe("V2 Bitpacker — cardsPerTrick", () => {
  it("6-player non-loner: 6 cards per trick", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "Jd" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: false },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["Ac", "Tc", "9c", "Kc", "Ah", "Kh"]],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 6 });
    const unpacked = unpackDeal(packed);
    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.tricks[0].length).toBe(6);
    expect(pp.tricks[0]).toEqual(["Ac", "Tc", "9c", "Kc", "Ah", "Kh"]);
  });

  it("6-player loner (no defend alone): 5 cards per trick (numPlayers-1)", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "Jd" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["Ac", "Tc", "9c", "Kc", "Ah"]],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 6 });
    const unpacked = unpackDeal(packed);
    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.tricks[0].length).toBe(5);
    expect(pp.tricks[0]).toEqual(["Ac", "Tc", "9c", "Kc", "Ah"]);
  });

  it("6-player loner + alone defender: 4 cards per trick (numPlayers-2)", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "Jd" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Order"],
          isAlone: true,
          aloneDefender: 3,
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["Ac", "Tc", "9c", "Kc"]],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 6 });
    const unpacked = unpackDeal(packed);
    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.tricks[0].length).toBe(4);
    expect(pp.tricks[0]).toEqual(["Ac", "Tc", "9c", "Kc"]);
  });

  it("4-player loner + alone defender: 2 cards per trick (numPlayers-2)", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 1, upCard: "Ks" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Order"],
          isAlone: true,
          aloneDefender: 0,
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Ac", "Ah"],
            ["Kc", "Kh"],
            ["Qc", "Qh"],
          ],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 4 });
    const unpacked = unpackDeal(packed);
    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.tricks[0].length).toBe(2);
    expect(pp.tricks[0]).toEqual(["Ac", "Ah"]);
    expect(pp.tricks[1]).toEqual(["Kc", "Kh"]);
    expect(pp.tricks[2]).toEqual(["Qc", "Qh"]);
  });

  it("8-player non-loner: 8 cards per trick", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "Jd" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: false },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["Ac", "Tc", "9c", "Kc", "Ah", "Kh", "Qh", "Th"]],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 8 });
    const unpacked = unpackDeal(packed);
    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.tricks[0].length).toBe(8);
    expect(pp.tricks[0]).toEqual(["Ac", "Tc", "9c", "Kc", "Ah", "Kh", "Qh", "Th"]);
  });
});

// ---------------------------------------------------------------------------
// V2 — aloneDefender field
// ---------------------------------------------------------------------------

describe("V2 Bitpacker — aloneDefender", () => {
  it("aloneDefender is preserved through round-trip (seat 0)", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9h" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true, aloneDefender: 0 },
      ],
    };
    const unpacked = unpackDeal(packDeal(deal, { version: 2 }));
    expect((unpacked.phases[0] as BiddingPhase).aloneDefender).toBe(0);
  });

  it("aloneDefender is preserved through round-trip (seat 5)", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9h" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true, aloneDefender: 5 },
      ],
    };
    const unpacked = unpackDeal(packDeal(deal, { version: 2 }));
    expect((unpacked.phases[0] as BiddingPhase).aloneDefender).toBe(5);
  });

  it("aloneDefender is absent when isAlone=false", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9h" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: false },
      ],
    };
    const unpacked = unpackDeal(packDeal(deal, { version: 2 }));
    expect((unpacked.phases[0] as BiddingPhase).aloneDefender).toBeUndefined();
  });

  it("aloneDefender is absent when isAlone=true but no defender (field omitted)", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9h" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true },
      ],
    };
    const unpacked = unpackDeal(packDeal(deal, { version: 2 }));
    expect((unpacked.phases[0] as BiddingPhase).aloneDefender).toBeUndefined();
  });

  it("aloneDefender is absent when set to -1 (sentinel for none)", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9h" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true, aloneDefender: -1 },
      ],
    };
    const unpacked = unpackDeal(packDeal(deal, { version: 2 }));
    expect((unpacked.phases[0] as BiddingPhase).aloneDefender).toBeUndefined();
  });

  it("V1 encoding silently ignores aloneDefender (not encoded in V1 bitstream)", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9h" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: true, aloneDefender: 2 },
      ],
    };
    // V1 does not encode aloneDefender — it is silently dropped
    const unpacked = unpackDeal(packDeal(deal, { version: 1 }));
    expect((unpacked.phases[0] as BiddingPhase).aloneDefender).toBeUndefined();
    expect((unpacked.phases[0] as BiddingPhase).isAlone).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// V2 — deck size variants (minRank)
// ---------------------------------------------------------------------------

describe("V2 Bitpacker — deck size variants", () => {
  it("minRank=8: can encode/decode 28-card deck with 8-rank cards", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "8s" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: false },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["8h", "8c", "8d", "9s"]],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, minRank: 8 });
    const unpacked = unpackDeal(packed);

    expect(unpacked.initialState.upCard).toBe("8s");
    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.tricks[0]).toEqual(["8h", "8c", "8d", "9s"]);
  });

  it("minRank=7: can encode/decode 32-card deck with 7-rank and 8-rank cards", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "7s" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: false },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["7h", "8h", "8c", "9s"]],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, minRank: 7 });
    const unpacked = unpackDeal(packed);

    expect(unpacked.initialState.upCard).toBe("7s");
    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.tricks[0]).toEqual(["7h", "8h", "8c", "9s"]);
  });

  it("minRank=6: can encode/decode 36-card deck with 6-rank cards", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "6s" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: false },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["6h", "6c", "7s", "8d"]],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, minRank: 6 });
    const unpacked = unpackDeal(packed);

    expect(unpacked.initialState.upCard).toBe("6s");
    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.tricks[0]).toEqual(["6h", "6c", "7s", "8d"]);
  });

  it("minRank=9 (default) rejects 8-rank cards not in the standard deck", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "9h" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Order"], isAlone: false },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["8s", "Ac", "Kc", "Qc"]], // 8s not in standard 24-card deck
        },
      ],
    };
    expect(() => packDeal(deal, { version: 2, minRank: 9 })).toThrow("not found in remaining cards");
  });

  it("minRank round-trips correctly for all four deck sizes", () => {
    const configs: { minRank: 9 | 8 | 7 | 6; upCard: string }[] = [
      { minRank: 9, upCard: "9s" },
      { minRank: 8, upCard: "8s" },
      { minRank: 7, upCard: "7s" },
      { minRank: 6, upCard: "6s" },
    ];
    for (const { minRank, upCard } of configs) {
      const deal: Deal = {
        dealNumber: 0,
        initialState: { dealer: 0, upCard },
        phases: [],
      };
      const unpacked = unpackDeal(packDeal(deal, { version: 2, minRank }));
      expect(unpacked.initialState.upCard).toBe(upCard);
    }
  });
});

// ---------------------------------------------------------------------------
// V2 — annotations
// ---------------------------------------------------------------------------

describe("V2 Bitpacker — annotations", () => {
  it("V2 round-trips callAnnotations and playAnnotations", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "Jd" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Order"],
          isAlone: false,
          callAnnotations: {
            1: ["[!] Great order-up", "Secondary note"],
          },
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["Ac", "Tc", "9c", "Kc"]],
          playAnnotations: {
            0: ["[??] Questionable lead"],
          },
        },
      ],
    };
    const unpacked = unpackDeal(packDeal(deal, { version: 2 }));

    const bp = unpacked.phases[0] as BiddingPhase;
    expect(bp.callAnnotations![1]).toEqual(["[!] Great order-up", "Secondary note"]);

    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.playAnnotations![0]).toEqual(["[??] Questionable lead"]);
  });

  it("V2 annotations survive alongside aloneDefender", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "Jd" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Order"],
          isAlone: true,
          aloneDefender: 1,
          callAnnotations: { 0: ["[!!] Bold loner"] },
        },
      ],
    };
    const unpacked = unpackDeal(packDeal(deal, { version: 2 }));
    const bp = unpacked.phases[0] as BiddingPhase;
    expect(bp.aloneDefender).toBe(1);
    expect(bp.callAnnotations![0]).toEqual(["[!!] Bold loner"]);
  });
});

// ---------------------------------------------------------------------------
// V2 — alternative lines
// ---------------------------------------------------------------------------

describe("V2 Bitpacker — alternative lines", () => {
  it("V2 round-trips a simple alternative line", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "Jd" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Pass", "Order"], isAlone: false },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["Ac", "Tc", "9c", "Kc"]],
        },
      ],
      alternativeLines: [
        {
          branchIndex: 1,
          phases: [
            {
              phaseNumber: 0,
              type: "TRICK_PLAY",
              tricks: [["Ah", "Kh", "Qh", "Jh"]],
            },
          ],
        },
      ],
    };
    const unpacked = unpackDeal(packDeal(deal, { version: 2 }));

    expect(unpacked.alternativeLines).toBeDefined();
    expect(unpacked.alternativeLines![0].branchIndex).toBe(1);
    const altPp = unpacked.alternativeLines![0].phases[0] as TrickPlayPhase;
    expect(altPp.tricks[0]).toEqual(["Ah", "Kh", "Qh", "Jh"]);
  });

  it("V2 alt line inherits main-line aloneDefender for cardsPerTrick", () => {
    // numPlayers=6, isAlone=true, aloneDefender=3 → cardsPerTrick=4 (6-2)
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "Jd" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Order"],
          isAlone: true,
          aloneDefender: 3,
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["Ac", "Tc", "9c", "Kc"]], // 4 cards (6-2=4)
        },
      ],
      alternativeLines: [
        {
          branchIndex: 5, // 1 bid call + 4 play cards
          phases: [
            {
              phaseNumber: 0,
              type: "TRICK_PLAY",
              tricks: [["Ah", "Kh", "Qh", "Jh"]], // also 4 cards
            },
          ],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 6 });
    const unpacked = unpackDeal(packed);

    const bp = unpacked.phases[0] as BiddingPhase;
    expect(bp.aloneDefender).toBe(3);

    const pp = unpacked.phases[1] as TrickPlayPhase;
    expect(pp.tricks[0].length).toBe(4);

    const altPp = unpacked.alternativeLines![0].phases[0] as TrickPlayPhase;
    expect(altPp.tricks[0]).toEqual(["Ah", "Kh", "Qh", "Jh"]);
  });

  it("V2 mid-trick alt line with aloneDefender uses numPlayers-2 for firstTrickCards", () => {
    // numPlayers=6, isAlone=true, aloneDefender=3 → cardsPerTrick=4
    // branchIndex=3: 1 bid call + 2 cards played → firstTrickCards = 4-2 = 2
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 0, upCard: "Jd" },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Order"],
          isAlone: true,
          aloneDefender: 3,
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Ac", "Tc", "9c", "Kc"], // trick 1 (4 cards)
            ["Ah", "Kh", "Qh", "Jh"], // trick 2 (4 cards)
          ],
        },
      ],
      alternativeLines: [
        {
          branchIndex: 3, // 1 bid + 2 play cards (Ac, Tc)
          phases: [
            {
              phaseNumber: 0,
              type: "TRICK_PLAY",
              tricks: [
                ["Ad", "Kd"],               // 2 remaining cards to complete trick 1
                ["Qc", "9h", "Th", "9s"],   // full trick 2 (4 cards)
              ],
            },
          ],
        },
      ],
    };
    const packed = packDeal(deal, { version: 2, numPlayers: 6 });
    const unpacked = unpackDeal(packed);

    const altPp = unpacked.alternativeLines![0].phases[0] as TrickPlayPhase;
    expect(altPp.tricks[0]).toEqual(["Ad", "Kd"]);
    expect(altPp.tricks[1]).toEqual(["Qc", "9h", "Th", "9s"]);
  });
});

// ---------------------------------------------------------------------------
// V2 — backward compatibility: V1 encoded deals still decode correctly
// ---------------------------------------------------------------------------

describe("V2 Bitpacker — backward compatibility", () => {
  it("V1-encoded deals are still decoded correctly by unpackDeal after V2 support is added", () => {
    const deal: Deal = {
      dealNumber: 3,
      initialState: { dealer: 2, upCard: "Ts" },
      phases: [
        { phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Pass", "Order"], isAlone: false },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [["Ac", "Tc", "9c", "Kc"]],
        },
      ],
    };
    // packDeal defaults to V1
    const v1Packed = packDeal(deal);
    const unpacked = unpackDeal(v1Packed, 3);

    expect(unpacked.dealNumber).toBe(3);
    expect(unpacked.initialState.dealer).toBe(2);
    expect(unpacked.initialState.upCard).toBe("Ts");
    expect((unpacked.phases[0] as BiddingPhase).calls).toEqual(["Pass", "Order"]);
    expect((unpacked.phases[1] as TrickPlayPhase).tricks[0]).toEqual(["Ac", "Tc", "9c", "Kc"]);
  });

  it("unpackDeal auto-detects V2 header and uses extended decoding", () => {
    const deal: Deal = {
      dealNumber: 0,
      initialState: { dealer: 5, upCard: "8s" },
      phases: [],
    };
    // dealer=5 and upCard=8s only work in V2 (dealer>3 requires 3-bit field, minRank<9 requires extended deck)
    const v2Packed = packDeal(deal, { version: 2, minRank: 8 });
    const unpacked = unpackDeal(v2Packed);
    expect(unpacked.initialState.dealer).toBe(5);
    expect(unpacked.initialState.upCard).toBe("8s");
  });

  it("should successfully fall back to V0 when V1/V2 parsing fails due to coincidental header collisions", () => {
    // Legacy V0 deal: dealer = 0 (bits 00), upCard = "As" (index 23 -> bits 10111)
    // The bitstream will begin with 0010... which matches the V2 header.
    // If it's decoded as V2, it will fail (due to wrong structure/end marker) and must fall back to V0.
    const deal: Deal = {
      dealNumber: 0,
      initialState: {
        dealer: 0,
        upCard: "Ad"
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Pass", "Order"],
          isAlone: false,
        },
      ],
    };

    // V0 layout: [dealer: 2bits ("00")][upCardIndex: 5bits ("10111")][calls: 4bits ("0001")][isAlone: 1bit ("0")]
    // bits: 00 + 10111 + 0001 + 0 = 0010 1110 0010 (12 bits)
    const binary = "001011100010"; // Starts with "0010" (V2 header collision!)
    const b64 = binaryStringToBase64Url(binary);

    // This should successfully decode as V0
    const unpacked = unpackDeal(b64);
    expect(unpacked.initialState.dealer).toBe(0);
    expect(unpacked.initialState.upCard).toBe("Ad");
    const bp = unpacked.phases[0] as BiddingPhase;
    expect(bp.calls).toEqual(["Pass", "Pass", "Pass", "Order"]);
    expect(bp.isAlone).toBe(false);
  });
});
