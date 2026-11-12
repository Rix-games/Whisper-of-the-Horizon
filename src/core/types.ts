// Sdílené typy definic kapitol.
import type { State, Cur } from "./state";

export type BKind = "gen" | "data" | "mult" | "up" | "unit" | "auto" | "swarm";
/** Stavba / vylepšení. c0 = první cena, g = zdražení za kus, w = W/kus (gen), d = B/s/kus (data). */
export interface BDef {
  id: string; ch: number; tier: 1 | 2; kind: BKind; cur: Cur;
  c0: number; g: number; max?: number;
  /** Strop úrovní podle stavu (např. podle stadia). */
  maxAt?: (s: State) => number;
  req: (s: State) => boolean;
  w?: number; d?: number;
}
export interface RDef { id: string; ch: number; cost: number; req: (s: State) => boolean; lvl2?: boolean; final?: boolean; }
/** Mise: cost = energie v J, dur = s, at = poloha na mapě, view = pohled mapy. */
export interface MDef { id: string; ch: number; cost: number; dur: number; req: (s: State) => boolean; at: [number, number]; view: string; }
export interface JDef { id: string; ch: number; when: (s: State) => boolean; kind?: "story" | "fact"; }

export interface ChapterDef {
  id: number; cur: Cur; view: string; map: string;
  /** Cíle stadií (W) – podmínka ODCHODU ze stadia i. */
  goals: (s: State) => number[];
  lvl2: number;                       // stadium, od kterého běží 2. úroveň
  /** Ladicí kolečka cen: násobek první ceny a přídavek ke zdražení za kus (jen stavby, ne vylepšení). */
  price?: { k: number; g: number };
  build: BDef[]; research: RDef[]; missions: MDef[]; journal: JDef[];
  power(s: State): number;            // výkon W
  passive(s: State): number;          // pasivní příjem suroviny kapitoly /s
  dataMult(s: State): number;
  autos?(s: State, dt: number): void; // automatika
  onStart?(s: State): void;           // dar na začátku kapitoly
  /** Hodnota pro bota v simulaci (přibližný relativní přínos kusu). */
  botValue?(s: State, id: string): number | undefined;
  /** Typický stav na začátku kapitoly – pro simulaci jen této kapitoly (CH=n). */
  simStart?(s: State): void;
}

export const R = (id: string) => (s: State) => !!s.r[id];
export const ST = (n: number) => (s: State) => s.stage >= n;
