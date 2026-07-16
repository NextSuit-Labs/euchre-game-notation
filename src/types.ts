/**
 * Core TypeScript definitions for Euchre Game Notation (EGN).
 * Maps directly to the EGN schema v1.2.0.
 */

export type Card = string; // Pattern: ^([78N9TJQKAX][SsHhCcDdxtngh]|[LRB])$

export type Call = "Pass" | "Order" | "s" | "h" | "d" | "c" | "n" | "x";

export interface Ruleset {
  std?: boolean;
  min_rank?: number;
  winning_score?: number;
  canadian?: boolean;
  loner_lead?: "LEFT_OF_DEALER" | "LEFT_OF_LONER";
  loner_march_score?: number;
  loner_euchred_score?: number;
  defend_alone?: boolean;
  farmers?: boolean;
  partners_best?: boolean;
  go_under?: boolean;
  joker?: boolean;
  num_players?: number;
  allow_no_trump?: boolean;
  fast_break?: boolean;
  four_trick_tokens?: boolean;
}

export interface Metadata {
  gameId?: string;
  title?: string;
  description?: string;
  players: Player[];
  initialScore: [number, number];
  date?: string;
  ruleset?: Ruleset;
}

export interface PlayerId {
  id: string;
  source: string;
}

export interface PlayerObject {
  name: string;
  playerIds?: PlayerId[];
}

export type Player = string | PlayerObject;

export interface InitialState {
  dealer: number;
  upCard: Card;
  playerCards?: Card[][];
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
  isAlone?: boolean;
  aloneDefender?: number; // Seat index of player defending alone, or -1 if none. Only used when ruleset.defend_alone is true.
  discard?: Card;
  cardExchanges?: CardExchange[];
  callAnnotations?: Annotations;
}

export interface TrickPlayPhase {
  phaseNumber: number;
  type: "TRICK_PLAY";
  tricks: Card[][];
  playAnnotations?: Annotations;
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