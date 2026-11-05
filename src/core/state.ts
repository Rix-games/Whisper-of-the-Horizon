import { BUILDING_IDS, RESOURCES, type BuildingId, type EventId, type LocationId, type Res, type ResearchId } from './defs.js';

export const SAVE_VERSION = 1;

export interface LogEntry { key: string; kind: 'story' | 'fact' | 'sys'; day: number; vars?: Record<string, string> }

export interface State {
  v: number;
  res: Record<Res, number>;
  total: Record<Res, number>;          // nasbíráno celkem (pro odemykání)
  b: Record<BuildingId, number>;
  bought: Record<BuildingId, number>;   // ručně koupené kusy (určují cenu)
  r: Partial<Record<ResearchId, true>>;
  off: Partial<Record<BuildingId, boolean>>;
  eff: Partial<Record<BuildingId, number>>;
  visited: Partial<Record<LocationId, true>>;
  loc: LocationId;
  travel: null | { from: LocationId; to: LocationId; t: number; total: number };
  event: null | { id: EventId; ttl: number };
  nextEvent: number;
  time: number;                         // odehrané sekundy (kosmické hodiny běží jen při hraní)
  clicks: number;
  story: Record<string, true>;
  facts: Record<string, true>;
  log: LogEntry[];
  chapterDone: number;
  settings: { sound: boolean; lang: 'cs' | 'en'; vol: Record<string, number> }; // vol: hlasitosti 0–1 podle větví zvuku
  last: number;                         // čas posledního uložení (ms)
}

const zero = <K extends string>(keys: readonly K[]) => Object.fromEntries(keys.map((k) => [k, 0])) as Record<K, number>;

export function newState(now = Date.now()): State {
  return {
    v: SAVE_VERSION,
    res: zero(RESOURCES),
    total: zero(RESOURCES),
    b: zero(BUILDING_IDS),
    bought: zero(BUILDING_IDS),
    r: {}, off: {}, eff: {},
    visited: { belt: true }, loc: 'belt', travel: null,
    event: null, nextEvent: 180,
    time: 0, clicks: 0,
    story: {}, facts: {}, log: [],
    chapterDone: 0,
    settings: { sound: false, lang: 'cs', vol: {} },
    last: now,
  };
}

/** Načte uloženou hru libovolné starší verze a doplní chybějící pole. */
export function migrate(raw: unknown): State {
  const base = newState();
  if (!raw || typeof raw !== 'object') return base;
  const o = raw as Record<string, unknown>;
  const out = { ...base } as Record<string, unknown>;
  for (const k of Object.keys(base)) {
    const bv = (base as unknown as Record<string, unknown>)[k];
    const ov = o[k];
    if (ov === undefined) continue;
    if (bv && typeof bv === 'object' && !Array.isArray(bv) && ov && typeof ov === 'object') out[k] = { ...(bv as object), ...(ov as object) };
    else out[k] = ov;
  }
  // zápisy o událostech (kometa, erupce) do deníku nepatří, starší uložené hry je měly
  if (Array.isArray(out.log)) out.log = (out.log as { kind: string }[]).filter((e) => e.kind !== 'event');
  out.v = SAVE_VERSION;
  return out as unknown as State;
}

export function encodeSave(s: State): string {
  const json = JSON.stringify(s);
  const bytes = new TextEncoder().encode(json);
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return 'SH1.' + btoa(bin);
}

export function decodeSave(text: string): State | null {
  try {
    const body = text.trim().replace(/^SH1\./, '');
    const bin = atob(body);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return migrate(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    return null;
  }
}
