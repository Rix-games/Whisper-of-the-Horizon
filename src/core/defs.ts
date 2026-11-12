// Souhrn kapitol. Čísla a texty každé kapitoly jsou v src/chapters/chN.ts – ladí se tam.
import type { State } from "./state";
import type { ChapterDef, BDef, RDef, MDef, JDef } from "./types";
import { CH1 } from "../chapters/ch1";
import { CH2 } from "../chapters/ch2";
import { CH3 } from "../chapters/ch3";

export const CHAPTERS: ChapterDef[] = [CH1, CH2, CH3];
export const LAST_CH = CHAPTERS.length;
/** Počet stadií kapitoly = počet cílů; po posledním následuje závěrečný výzkum. */
export const stagesOf = (s: State) => chOf(s).goals(s).length;

export const BUILD: BDef[] = CHAPTERS.flatMap((c) => c.build);
export const RESEARCH: RDef[] = CHAPTERS.flatMap((c) => c.research);
export const MISSIONS: MDef[] = CHAPTERS.flatMap((c) => c.missions);
export const JOURNAL: JDef[] = CHAPTERS.flatMap((c) => c.journal);
export const BMAP: Record<string, BDef> = Object.fromEntries(BUILD.map((b) => [b.id, b]));
export const RMAP: Record<string, RDef> = Object.fromEntries(RESEARCH.map((r) => [r.id, r]));
export const MMAP: Record<string, MDef> = Object.fromEntries(MISSIONS.map((m) => [m.id, m]));

export const chOf = (s: State) => CHAPTERS[s.ch - 1];
/** Cíl stadia (W) – podmínka ODCHODU ze stadia i. */
export function stageGoal(s: State, i = s.stage): number { const g = chOf(s).goals(s); return g[Math.min(i, g.length - 1)]; }

/** Kardaševovy typy odhalované postupně (od kapitoly ch). */
export const KTYPES = [
  { k: 1, ch: 1, w: 1e16 },
  { k: 2, ch: 2, w: 3.8e26 },
  { k: 3, ch: 3, w: 5e36 },
];
export type { BDef, RDef, MDef, JDef };
