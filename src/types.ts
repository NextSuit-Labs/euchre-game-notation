/**
 * Core TypeScript definitions for Euchre Game Notation (EGN).
 * Maps directly to the EGN schema v1.0.0.
 */

export type Card = string; // Pattern: ^([N9TJQKAX][SsHhCcDdXx]|[LRB])$

export interface Ruleset {
  std?: boolean;
  canadian?: boolean;
  loner_lead?: "LEFT_OF_DEALER" | "LEFT_OF_LONER";
  farmer?: boolean;
  partners_best?: boolean;
  jokers?: number;
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
}

export interface BiddingPhase {
  phaseNumber: number;
  type: "EUCHRE_BIDDING";
  calls: string[];
  isAlone: boolean;
  discard?: Card;
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