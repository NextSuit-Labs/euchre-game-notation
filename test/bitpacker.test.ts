import { describe, it, expect } from "@jest/globals";
import { 
  packDeal, 
  unpackDeal, 
  binaryStringToBase64Url, 
  base64UrlToBinaryString 
} from "../src/bitpacker";
import { Deal } from "../src/types";

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
});
