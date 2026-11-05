// Herní obsah Kapitoly 1. Čísla jsou ve skutečných jednotkách:
// ruda a kov v kg, energie v J (výroba ve W = J/s), data v bajtech.
import type { State } from './state.js';

export type Res = 'ore' | 'metal' | 'energy' | 'data';
export const RESOURCES: Res[] = ['ore', 'metal', 'energy', 'data'];
export type Amounts = Partial<Record<Res, number>>;

export type BuildingId = 'drone' | 'smelter' | 'solar' | 'lab' | 'drill' | 'mirror' | 'replicator' | 'forge' | 'catcher' | 'qcomp' | 'fusion' | 'dyson';
export type ResearchId = 'vib' | 'swarm' | 'deep' | 'arc' | 'scan' | 'thinfilm' | 'auto' | 'lab2' | 'mirror' | 'repl' | 'resonance' | 'forge'
  | 'cryo' | 'signal' | 'optics' | 'catcher' | 'swarm2' | 'fusion' | 'supercond' | 'plasma' | 'quantum' | 'vib2' | 'dyson' | 'nano'
  | 'statite' | 'induct' | 'beam' | 'lagrange';

export interface BuildingDef {
  base: Amounts;          // cena první kusu
  growth: number;         // násobek ceny za každý další kus
  prod?: Amounts;         // výroba za sekundu na kus
  cons?: Amounts;         // spotřeba za sekundu na kus (převodníky)
  makes?: { building: BuildingId; rate: number }; // staví jiné budovy (replikátor)
  unlock: (s: State) => boolean;
}

export const BUILDINGS: Record<BuildingId, BuildingDef> = {
  drone:     { base: { ore: 10 }, growth: 1.25, prod: { ore: 0.5 }, unlock: () => true },
  smelter:   { base: { ore: 500 }, growth: 1.17, prod: { metal: 1 }, cons: { ore: 2 }, unlock: (s) => s.total.ore >= 800 || s.b.smelter > 0 },
  solar:     { base: { metal: 120 }, growth: 1.18, prod: { energy: 2000 }, unlock: (s) => s.total.metal >= 200 || s.b.solar > 0 },
  lab:       { base: { metal: 600, energy: 3e6 }, growth: 1.2, prod: { data: 1000 }, cons: { energy: 3000 }, unlock: (s) => s.b.solar >= 3 || s.b.lab > 0 },
  drill:     { base: { metal: 400, data: 2e4 }, growth: 1.18, prod: { ore: 12 }, unlock: (s) => !!s.r.deep },
  mirror:    { base: { metal: 3000, data: 1e5 }, growth: 1.17, prod: { energy: 4e5 }, unlock: (s) => !!s.r.mirror },
  replicator:{ base: { metal: 4000, data: 3e5 }, growth: 1.3, makes: { building: 'drone', rate: 0.05 }, cons: { energy: 2.5e5 }, unlock: (s) => !!s.r.repl },
  forge:     { base: { ore: 2e5, metal: 8e3, data: 1e6 }, growth: 1.18, prod: { metal: 100 }, cons: { ore: 200 }, unlock: (s) => !!s.r.forge },
  catcher:   { base: { ore: 8e5, metal: 5e4, data: 5e6 }, growth: 1.18, prod: { ore: 5000 }, unlock: (s) => !!s.r.catcher },
  qcomp:     { base: { metal: 1e6, energy: 1e11 }, growth: 1.2, prod: { data: 2e8 }, cons: { energy: 2e8 }, unlock: (s) => !!s.r.quantum },
  fusion:    { base: { ore: 1e6, metal: 1e5, data: 1e7 }, growth: 1.2, prod: { energy: 5e7 }, unlock: (s) => !!s.r.fusion },
  dyson:     { base: { metal: 2e6, energy: 2e11 }, growth: 1.12, prod: { energy: 2e12 }, unlock: (s) => !!s.r.dyson },
};
export const BUILDING_IDS = Object.keys(BUILDINGS) as BuildingId[];
export const B: Record<BuildingId, BuildingDef> = BUILDINGS;

export interface ResearchDef { cost: Amounts; req?: (s: State) => boolean; reqKey?: string }
const has = (...ids: string[]) => (s: State): boolean => ids.every((id) => (s.r as Record<string, true>)[id] || (s.visited as Record<string, true>)[id]);
export const RESEARCH: Record<ResearchId, ResearchDef> = {
  vib:       { cost: { data: 2e4 } },
  swarm:     { cost: { data: 5e4 } },
  deep:      { cost: { data: 8e4 } },
  arc:       { cost: { data: 1.2e5 } },
  scan:      { cost: { data: 1.8e5 } },
  thinfilm:  { cost: { data: 2.5e5 } },
  auto:      { cost: { data: 3e5 }, req: has('scan') },
  lab2:      { cost: { data: 3.5e5 }, req: has('arc') },
  mirror:    { cost: { data: 4e5 }, req: has('thinfilm') },
  repl:      { cost: { data: 5e5 }, req: has('auto') },
  resonance: { cost: { data: 6e5 }, req: has('vib', 'deep') },
  forge:     { cost: { data: 8e5 }, req: has('mirror') },
  cryo:      { cost: { data: 1e6 }, req: has('moon'), reqKey: 'moon' },
  signal:    { cost: { data: 2e6 }, req: has('moon'), reqKey: 'moon' },
  optics:    { cost: { data: 3e6 }, req: has('mirror', 'forge') },
  catcher:   { cost: { data: 4e6 }, req: has('moon'), reqKey: 'moon' },
  swarm2:    { cost: { data: 6e6 }, req: has('repl') },
  fusion:    { cost: { data: 1e7 }, req: has('giant'), reqKey: 'giant' },
  supercond: { cost: { data: 2e7, metal: 1e6 }, req: has('giant'), reqKey: 'giant' },
  plasma:    { cost: { data: 1.5e8 }, req: has('forge', 'fusion') },
  quantum:   { cost: { data: 3e8 }, req: has('cryo', 'fusion') },
  vib2:      { cost: { data: 6e8 }, req: has('resonance', 'giant') },
  dyson:     { cost: { data: 1e9 }, req: has('sun'), reqKey: 'sun' },
  nano:      { cost: { data: 4e9 }, req: has('dyson') },
  statite:   { cost: { data: 1.2e10 }, req: has('dyson') },
  induct:    { cost: { data: 4e10 }, req: has('nano') },
  beam:      { cost: { data: 2e11 }, req: has('statite') },
  lagrange:  { cost: { data: 1e12 }, req: has('beam') },
};
export const RESEARCH_IDS = Object.keys(RESEARCH) as ResearchId[];
export const R: Record<ResearchId, ResearchDef> = RESEARCH;

export interface LocationDef { cost: number; time: number; orbit: number; angle: number; speed: number }
// cost v J energie, time v sekundách
export const LOCATIONS = {
  belt:  { cost: 0, time: 0, orbit: 0.36, angle: 0.3, speed: 0.02 },
  moon:  { cost: 2e7, time: 45, orbit: 0.52, angle: 2.2, speed: 0.014 },
  giant: { cost: 3e9, time: 80, orbit: 0.72, angle: 4.1, speed: 0.009 },
  sun:   { cost: 2e11, time: 120, orbit: 0.15, angle: 1.2, speed: 0.05 },
} satisfies Record<string, LocationDef>;
export type LocationId = keyof typeof LOCATIONS;
export const LOCATION_IDS = Object.keys(LOCATIONS) as LocationId[];
export const L: Record<LocationId, LocationDef> = LOCATIONS;

// Krátké události pro aktivního hráče. Odměna = sekundy produkce daného zdroje.
export const EVENTS = {
  comet: { res: 'ore' as Res, seconds: 90, min: 50, unlock: (s: State) => s.b.drone >= 2 },
  flare: { res: 'energy' as Res, seconds: 60, min: 5e4, unlock: (s: State) => s.b.solar >= 1 },
  echo:  { res: 'data' as Res, seconds: 60, min: 2e3, unlock: (s: State) => !!s.r.scan },
};
export type EventId = keyof typeof EVENTS;
export const EVENT_IDS = Object.keys(EVENTS) as EventId[];

// Palubní deník: klíče textů se spouštějí podmínkou.
export const STORY: { id: string; when: (s: State) => boolean }[] = [
  { id: 'start', when: () => true },
  { id: 'drone', when: (s) => s.b.drone >= 1 },
  { id: 'iso', when: (s) => s.total.ore >= 150 },
  { id: 'smelt', when: (s) => s.b.smelter >= 1 },
  { id: 'lab', when: (s) => s.b.lab >= 1 },
  { id: 'scan', when: (s) => !!s.r.scan },
  { id: 'depart', when: (s) => !!s.travel || !!s.visited.moon },
  { id: 'moon', when: (s) => !!s.visited.moon },
  { id: 'repl', when: (s) => s.b.replicator >= 1 },
  { id: 'signal', when: (s) => !!s.r.signal },
  { id: 'giant', when: (s) => !!s.visited.giant },
  { id: 'fusion', when: (s) => s.b.fusion >= 1 },
  { id: 'sun', when: (s) => !!s.visited.sun },
  { id: 'dyson1', when: (s) => s.b.dyson >= 1 },
  { id: 'dyson10', when: (s) => s.b.dyson >= 10 },
  { id: 'typeI', when: (s) => s.chapterDone >= 1 },
];

// Zajímavosti ze skutečné vědy, jednou za hru.
export const FACTS: { id: string; when: (s: State, c: { powerW: number }) => boolean }[] = [
  { id: 'kardashev', when: (s) => s.time > 20 },
  { id: 'megawatt', when: (_s, c) => c.powerW >= 1e6 },
  { id: 'solar', when: (s) => s.b.solar >= 1 },
  { id: 'bytes', when: (s) => s.b.lab >= 1 },
  { id: 'europa', when: (s) => !!s.visited.moon },
  { id: 'vonneumann', when: (s) => s.b.replicator >= 1 },
  { id: 'he3', when: (s) => !!s.visited.giant },
  { id: 'corona', when: (s) => !!s.visited.sun },
  { id: 'dyson', when: (s) => s.b.dyson >= 1 },
  { id: 'statite', when: (s) => !!s.r.statite },
];

// Konstanty pravidel
export const RULES = {
  baseReactorW: 500,          // palubní reaktor platformy
  offlineShare: 0.1,          // offline přinese 10 % produkce
  offlineCapSec: 8 * 3600,    // nejvýš za 8 hodin
  autoClicksPerSec: 3,
  eventEverySec: [180, 360] as [number, number],
  eventTtlSec: 20,
  chapter1K: 1.0,             // konec Kapitoly 1 = Kardašev Typ I
};
