import { GV, remapColonies } from "./galaxy";
// Stav hry 1.0 (předělávka). Vše, co se ukládá.
export const SAVE_KEY = "sepot-horizontu-1";
export const SAVE_VERSION = 2;

export type Cur = "ore" | "plasma" | "mass" | "sails";

export interface LogEntry { t: number; k: string; kind: "story" | "fact" | "report"; }

export interface State {
  v: number;
  ch: number;            // 1..4 (zatím)
  stage: number;         // index stadia v kapitole
  t: number;             // celkový herní čas (s)
  chT: number;           // čas v kapitole (s)
  stT: number;           // čas ve stadiu (s)
  res: { ore: number; plasma: number; mass: number; sails: number; energy: number; data: number };
  tot: { ore: number; plasma: number; mass: number; sails: number };
  b: Record<string, number>;        // stavby a vylepšení (počty / úrovně)
  r: Record<string, number>;        // hotový výzkum (1)
  mis: Record<string, number>;      // hotové mise (1)
  run: { id: string; left: number; dur: number } | null; // běžící mise
  unl: Record<string, number>;      // čas odemčení (řazení, tečky)
  seen: Record<string, number>;     // přečtené / zobrazené věci
  log: LogEntry[];
  base: number;                     // zmrazený výkon minulých kapitol (W)
  auto: Record<string, boolean>;    // zapnutá automatika
  bank: Record<string, number>;     // banky automatiky
  // Kap. 2: kolektory roje
  n: number;
  // Kap. 3: disk díry (kg), rotace (úroveň), zásoby chuchvalců
  hole: { D: number; combo: number; flares: number; hits: number; perfect: number };
  // Kap. 4: osídlené uzly galaxie (bitová mapa v řetězci "0/1")
  col: string;
  gv: number;                       // verze rozmístění uzlů galaxie
  prog: Record<string, number>;
  best: { chainHand: number; reson: number };
  stats: { cuts: number; full: number; flares: number; perfect: number; cme: number; sweeps: number };
  done: number;                     // nejvyšší dokončená kapitola
  last: number;                     // reálný čas posledního uložení (ms)
  opt: { sound: boolean; vol: number; noise: number; fx: number };
  story: Record<string, number>;    // úvodní okna
}

export function newState(): State {
  return {
    v: SAVE_VERSION, ch: 1, stage: 0, t: 0, chT: 0, stT: 0,
    res: { ore: 0, plasma: 0, mass: 0, sails: 0, energy: 0, data: 0 },
    tot: { ore: 0, plasma: 0, mass: 0, sails: 0 },
    hole: { D: 0, combo: 0, flares: 0, hits: 0, perfect: 0 },
    b: {}, r: {}, mis: {}, run: null, unl: {}, seen: {}, log: [],
    base: 0, auto: {}, bank: {}, n: 0, col: "", gv: GV, prog: {},
    best: { chainHand: 0, reson: 0 },
    stats: { cuts: 0, full: 0, flares: 0, perfect: 0, cme: 0, sweeps: 0 },
    done: 0, last: Date.now(),
    opt: { sound: false, vol: 0.8, noise: 0.7, fx: 1 },
    story: {},
  };
}

/** Doplní chybějící pole starším uloženým hrám. */
export function migrate(o: any): State {
  const s = newState();
  if (!o || typeof o !== "object") return s;
  if ((o.v ?? 1) < 2) {   // 1.0.0-alfa: Galaxie byla Kap. 3, teď je Kap. 4 (vložena Kap. 3 Díra)
    if (o.ch >= 3) o.ch++;
    if (o.done >= 3) o.done++;
    if (o.story?.intro3) { o.story.intro4 = 1; delete o.story.intro3; }
    if (o.seen?.detail3 != null) { o.seen.detail4 = o.seen.detail3; delete o.seen.detail3; }
  }
  for (const k of Object.keys(s)) {
    if (o[k] === undefined) continue;
    if (s[k] && typeof s[k] === "object" && !Array.isArray(s[k]) && o[k] && typeof o[k] === "object") s[k] = { ...s[k], ...o[k] };
    else s[k] = o[k];
  }
  if (o.gv !== GV) { if (s.col) { s.col = remapColonies(s.col); s.prog = {}; } s.gv = GV; }   // nové rozmístění galaxie
  s.v = SAVE_VERSION;
  return s;
}

export function encodeSave(s: State): string {
  const json = JSON.stringify(s);
  return btoa(unescape(encodeURIComponent(json)));
}
export function decodeSave(str: string): State | null {
  try { return migrate(JSON.parse(decodeURIComponent(escape(atob(str.trim()))))); } catch { return null; }
}
