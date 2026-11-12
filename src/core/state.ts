// Stav hry 1.0 (předělávka). Vše, co se ukládá.
export const SAVE_KEY = "sepot-horizontu-1";
export const SAVE_VERSION = 1;

export type Cur = "ore" | "plasma" | "sails";

export interface LogEntry { t: number; k: string; kind: "story" | "fact" | "report"; }

export interface State {
  v: number;
  ch: number;            // 1..3 (zatím)
  stage: number;         // index stadia v kapitole
  t: number;             // celkový herní čas (s)
  chT: number;           // čas v kapitole (s)
  stT: number;           // čas ve stadiu (s)
  res: { ore: number; plasma: number; sails: number; energy: number; data: number };
  tot: { ore: number; plasma: number; sails: number };
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
  // Kap. 3: osídlené uzly galaxie (bitová mapa v řetězci "0/1")
  col: string;
  prog: Record<string, number>;
  best: { chainHand: number; reson: number };
  stats: { cuts: number; full: number; flares: number; perfect: number; cme: number; sweeps: number };
  done: number;                     // nejvyšší dokončená kapitola
  last: number;                     // reálný čas posledního uložení (ms)
  opt: { sound: boolean; vol: number; fx: number };
  story: Record<string, number>;    // úvodní okna
}

export function newState(): State {
  return {
    v: SAVE_VERSION, ch: 1, stage: 0, t: 0, chT: 0, stT: 0,
    res: { ore: 0, plasma: 0, sails: 0, energy: 0, data: 0 },
    tot: { ore: 0, plasma: 0, sails: 0 },
    b: {}, r: {}, mis: {}, run: null, unl: {}, seen: {}, log: [],
    base: 0, auto: {}, bank: {}, n: 0, col: "", prog: {},
    best: { chainHand: 0, reson: 0 },
    stats: { cuts: 0, full: 0, flares: 0, perfect: 0, cme: 0, sweeps: 0 },
    done: 0, last: Date.now(),
    opt: { sound: false, vol: 0.8, fx: 1 },
    story: {},
  };
}

/** Doplní chybějící pole starším uloženým hrám. */
export function migrate(o: any): State {
  const s = newState();
  if (!o || typeof o !== "object") return s;
  for (const k of Object.keys(s)) {
    if (o[k] === undefined) continue;
    if (s[k] && typeof s[k] === "object" && !Array.isArray(s[k]) && o[k] && typeof o[k] === "object") s[k] = { ...s[k], ...o[k] };
    else s[k] = o[k];
  }
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
