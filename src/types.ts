/**
 * Core TypeScript definitions for Euchre Game Notation (EGN).
 * Maps directly to the EGN schema v1.0.0.
 */

export type Card = string; // Pattern: ^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$

export type Call = "Pass" | "Order" | "s" | "h" | "d" | "c" | "n" | "x";

export interface Ruleset {
  std?: boolean;
  min_rank?: number;
  winning_score?: number;
  canadian?: boolean;
  loner_lead?: "LEFT_OF_DEALER" | "LEFT_OF_LONER";
  farmers?: boolean;
  partners_best?: boolean;
  go_under?: boolean;
  joker?: boolean;
  allow_no_trump?: boolean;
  fast_break?: boolean;
  four_trick_tokens?: boolean;
}

export interface Metadata {
  matchId?: string;
  title?: string;
  description?: string;
  players: string[];
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

export interface CardExchange {
  sender?: number;
  receiver: number;
  cards: Card[];
}

export type Annotations = Record<number, string[]>;

export interface BiddingPhase {
  phaseNumber: number;
  type: "EUCHRE_BIDDING";
  calls: Call[];
  isAlone: boolean;
  discard?: Card;
  card_exchanges?: CardExchange[];
  calls_annotations?: Annotations;
}

export interface TrickPlayPhase {
  phaseNumber: number;
  type: "TRICK_PLAY";
  initialLead?: number;
  tricks: Card[][];
  tricks_annotations?: Annotations;
}

export type Phase = BiddingPhase | TrickPlayPhase;

export interface AlternativeLine {
  branchIndex: number;
  phases: Phase[];
}

export interface Deal {
  dealNumber: number;
  initialState: InitialState;
  phases: Phase[];
  alternativeLines?: AlternativeLine[];
}

export interface EGNFile {
  fileType: "Euchre Game Notation";
  version: string;
  metadata: Metadata;
  deals: (Deal | string)[];
}