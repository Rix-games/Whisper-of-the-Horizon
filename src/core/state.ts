import { BUILDING_IDS, RESOURCES, type BuildingId, type EventId, type LocationId, type Res, type ResearchId } from './defs.js';

export interface LogEntry { key: string; kind: 'story' | 'fact' | 'sys'; day: number; vars?: Record<string, string> }
type Bag = { metal: number; energy: number; plasma: number };

/** Chuchvalec plynu na cestě k díře: start (čas, poloměr, úhel), hmotnost, násobič řetězu. */
export interface Blob { t0: number; r0: number; th0: number; kg: number; mult: number; gold: boolean; auto: boolean; inj?: boolean }
export interface Link { p: string; lv: number; lk: number; la: boolean; t: number }
export interface Bridge {
  started: boolean; holeW: number; links: Record<string, Link>; n: number; stage: number; pass: number; done: boolean;
  locks: number; lv: Record<string, number>; bank: { raider: number; router: number }; made: { raider: number; router: number };
  archive?: number; rate?: { raider: number; router: number }; target?: { raider: string; router: string }; wave?: number; sel?: string;
}
export interface State {
  v: number;
  res: Record<Res, number>;
  total: Record<Res, number>;          // nasbíráno celkem (pro odemykání)
  b: Record<BuildingId, number>;
  bought: Record<BuildingId, number>;   // koupené kusy (určují cenu)
  r: Partial<Record<ResearchId, true>>;
  off: Partial<Record<BuildingId, boolean>>;
  eff: Partial<Record<BuildingId, number>>;
  visited: Partial<Record<LocationId, true>>;
  loc: LocationId;
  travel: null | { from: LocationId; to: LocationId; t: number; total: number };
  event: null | { id: EventId; ttl: number };
  nextEvent: number;
  time: number;                         // odehrané sekundy
  clicks: number;
  story: Record<string, true>;
  facts: Record<string, true>;
  log: LogEntry[];
  chapterDone: number;
  peakK: number;
  // Kapitola 2: hvězda (p0 = výchozí pokrok stadia pro stárnutí)
  star: { stage: number; t: number; collapse: number; done: boolean; p0?: number };
  // přestavba roje: body, kov tohoto běhu, počet, kolektory ze začátku Kap. 2
  p: { pts: number; run: number; count: number; base: number; total?: number };
  // Kapitola 3: černá díra. a = rotace (0–0,998), phase = fáze, dive = odpočet ponoru (−1 = neběží)
  hole: { a: number; phase: number; dive: number; done: boolean; started: boolean; cap?: boolean };
  // Kapitola 3: magnetická past a vypouštění plynu do disku (engine: vent*)
  vent: { tank: number; fall: number; chain: number; best: number; heat: number; over: number; auto: number; lv: Record<string, number>; fly: Blob[]; disk?: number; share?: number; kg?: number; inj?: number; injC?: number; injK?: number; man?: number; miss?: number };
  // Kapitola 4: síť mostů. links: cílový uzel → most (p = odkud, lv = úroveň hrdla, lk = zbývá zámku v s, la = zámek je automatický)
  bridge: Bridge;
  yrs?: number;                         // kolik let uplynulo venku (Vesper mezi směnami spí)
  yrs1?: number;                        // roky venku na začátku Kap. 2
  seen?: Record<string, string>;
  unl?: Record<string, number>;         // kdy se která stavba odemkla (nejnovější nahoře)        // co hráč na záložce už viděl (tečky u záložek)
  salvaged?: { metal: number; data: number };  // rozebraná platforma Kap. 1 (jednou na začátku Kap. 2)
  yard?: { bank: number; rate: number; built: { ring: number; jet: number }; target: 'ring' | 'jet' | null; eta: number };
  fab?: { m: number; e: number; made: number; lim: 'metal' | 'energy' | null; target: BuildingId | null; bank?: Bag; built?: { lifter: number; separator: number } };
  settings: { sound: boolean; lang: 'cs' | 'en'; vol: Record<string, number> };
  last: number;                         // čas posledního uložení (ms)
}

export const SAVE_VERSION = 1;
const zero = <K extends string>(keys: readonly K[]) => Object.fromEntries(keys.map((k) => [k, 0])) as Record<K, number>;
export function newState(now = Date.now()): State {
  return {
    v: SAVE_VERSION,
    res: zero(RESOURCES),
    total: zero(RESOURCES),
    b: zero(BUILDING_IDS),
    bought: zero(BUILDING_IDS),
    r: {},
    off: {},
    eff: {},
    visited: { belt: true },
    loc: "belt",
    travel: null,
    event: null,
    nextEvent: 180,
    time: 0,
    clicks: 0,
    story: {},
    facts: {},
    log: [],
    chapterDone: 0,
    peakK: -1,
    star: { stage: 0, t: 0, collapse: -1, done: false },
    p: { pts: 0, run: 0, count: 0, base: -1 },
    hole: { a: 0.2, phase: 0, dive: -1, done: false, started: false },
    vent: { tank: 0, kg: 0, fall: 0, chain: 0, best: 0, heat: 0, over: 0, auto: 0, lv: {}, fly: [] },
    bridge: { started: false, holeW: 0, links: {}, n: 0, stage: 0, pass: -1, done: false, locks: 0, lv: {}, bank: { raider: 0, router: 0 }, made: { raider: 0, router: 0 } },
    settings: { sound: false, lang: "cs", vol: {} },
    last: now
  };
}
/** Načte uloženou hru libovolné starší verze a doplní chybějící pole. */
export function migrate(raw: unknown): State {
  const base = newState();
  if (!raw || typeof raw !== "object") return base;
  const o = raw as Record<string, any>;
  const out = { ...base } as Record<string, any>;
  for (const k of Object.keys(base)) {
    const bv = (base as any)[k];
    const ov = o[k];
    if (ov === void 0) continue;
    if (bv && typeof bv === "object" && !Array.isArray(bv) && ov && typeof ov === "object") out[k] = { ...bv, ...ov };
    else out[k] = ov;
  }
  if (Array.isArray(out.log)) out.log = out.log.filter((e) => e.kind !== "event");
  out.v = SAVE_VERSION;
  return out as State;
}
export function encodeSave(s: State): string {
  const json = JSON.stringify(s);
  const bytes2 = new TextEncoder().encode(json);
  let bin = "";
  bytes2.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return "SH1." + btoa(bin);
}
export function decodeSave(text: string): State | null {
  try {
    const body = text.trim().replace(/^SH1\./, "");
    const bin = atob(body);
    const bytes2 = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return migrate(JSON.parse(new TextDecoder().decode(bytes2)));
  } catch {
    return null;
  }
}
