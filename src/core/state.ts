import { BUILDING_IDS, RESOURCES, type BuildingId, type EventId, type LocationId, type Res, type ResearchId } from './defs.js';

export interface LogEntry { key: string; kind: 'story' | 'fact' | 'sys'; day: number; vars?: Record<string, string> }
type Bag = { metal: number; energy: number; plasma: number };

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
