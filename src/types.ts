/**
 * Core TypeScript definitions for Euchre Game Notation (EGN).
 * Maps directly to the EGN schema v1.0.0.
 */

export type Card = string; // Pattern: ^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$

export type Call = "Pass" | "Order" | "s" | "h" | "d" | "c" | "n" | "x";

export interface Ruleset {
  std?: boolean;
  min_rank?: number;
  canadian?: boolean;
  loner_lead?: "LEFT_OF_DEALER" | "LEFT_OF_LONER";
  farmers?: boolean;
  partners_best?: boolean;
  go_under?: boolean;
  joker?: boolean;
  allow_no_trump?: boolean;
}

export interface Metadata {
  matchId?: string;
  title?: string;
  description?: string;
  players: [string, string, string, string];
  initialScore: [number, number];
  date?: string;
  ruleset?: Ruleset;
}

export interface InitialState {
  dealer: number;
  upCard: Card;
  kitty?: Card[];
  player_cards?: Card[][];
}

export interface BiddingPhase {
  phaseNumber: number;
  type: "EUCHRE_BIDDING";
  calls: Call[];
  isAlone: boolean;
  discard?: Card;
  card_exchange?: {
    sender: number;
    receiver: number;
    cards: Card[];
  };
}

export interface TrickPlayPhase {
  phaseNumber: number;
  type: "TRICK_PLAY";
  initialLead?: number;
  tricks: Card[][];
}

export type Phase = BiddingPhase | TrickPlayPhase;

export interface Deal {
  dealNumber: number;
  initialState: InitialState;
  phases: Phase[];
}

export interface EGNFile {
  fileType: "Euchre Game Notation";
  version: string;
  metadata: Metadata;
  deals: Deal[];
}