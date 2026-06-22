import { describe, it, expect } from "@jest/globals";
import {
  packDeal,
  unpackDeal,
  binaryStringToBase64Url,
  base64UrlToBinaryString
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
        upCard: "Jd",
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
        upCard: "Xz",
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
        upCard: "Ah",
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

  it("should successfully unpack a deal with only a bidding phase", () => {
    const deal: Deal = {
      dealNumber: 2,
      initialState: {
        dealer: 2,
        upCard: "Ts",
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
        upCard: "As", // spade upCard -> second round cannot choose spade (s)
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
        upCard: "Jd",
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
        upCard: "Jd",
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
        upCard: "Th",
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Order"],
          isAlone: false,
          calls_annotations: {
            2: ["Bidding annotation 1", "Bidding annotation 2"]
          }
        },
        {
          phaseNumber: 1,
          type: "TRICK_PLAY",
          tricks: [
            ["Ac", "Tc", "9c", "Kc"]
          ],
          tricks_annotations: {
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
    expect(biddingPhase.calls_annotations).toBeDefined();
    expect(biddingPhase.calls_annotations![2]).toEqual(["Bidding annotation 1", "Bidding annotation 2"]);

    const playPhase = unpacked.phases[1] as TrickPlayPhase;
    expect(playPhase.tricks_annotations).toBeDefined();
    expect(playPhase.tricks_annotations![0]).toEqual(["Play annotation"]);

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
        upCard: "Jd",
      },
      phases: [
        {
          phaseNumber: 0,
          type: "EUCHRE_BIDDING",
          calls: ["Pass", "Pass", "Pass", "Pass", "Pass", "s"],
          isAlone: false,
          calls_annotations: {
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
          tricks_annotations: {
            0: ["Trick 1 annotation"],
            1: ["Trick 2 annotation"]
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
    expect(bPhase.calls_annotations!["0"]).toEqual(["First pass annotation"]);
    expect(bPhase.calls_annotations!["5"]).toEqual(["Maker calls suit annotation"]);

    const pPhase = unpacked.phases[1] as TrickPlayPhase;
    expect(pPhase.tricks_annotations!["0"]).toEqual(["Trick 1 annotation"]);
    expect(pPhase.tricks_annotations!["1"]).toEqual(["Trick 2 annotation"]);

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
        upCard: "Th",
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

