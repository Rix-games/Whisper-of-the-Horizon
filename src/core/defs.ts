// Herní obsah. Čísla jsou ve skutečných jednotkách:
// ruda, kov a plazma v kg, energie v J (výroba ve W = J/s), data v bajtech.
import type { State } from './state.js';

export type Res = 'ore' | 'metal' | 'energy' | 'data' | 'plasma' | 'exotic';
export type Amounts = Partial<Record<Res, number>>;

export type BuildingId = 'drone' | 'smelter' | 'solar' | 'lab' | 'drill' | 'mirror' | 'replicator' | 'forge' | 'catcher' | 'qcomp' | 'fusion' | 'dyson' | 'windnet' | 'sieve' | 'corono' | 'lifter' | 'separator' | 'seismo' | 'swarmfab'
  | 'scoop' | 'injector' | 'ring' | 'station' | 'jet' | 'hawking' | 'yard'
  | 'plate' | 'beacon' | 'bswarm' | 'anchor' | 'plock' | 'raider' | 'router' | 'pair' | 'pump' | 'kcol' | 'gwdet' | 'trap';
export type ResearchId = 'vib' | 'swarm' | 'deep' | 'arc' | 'scan' | 'thinfilm' | 'auto' | 'lab2' | 'mirror' | 'repl' | 'resonance' | 'forge' | 'cryo' | 'signal' | 'optics' | 'catcher' | 'swarm2' | 'fusion' | 'supercond' | 'plasma' | 'quantum' | 'vib2' | 'dyson' | 'nano' | 'statite' | 'induct' | 'beam' | 'lagrange' | 'lift' | 'sep' | 'seismo' | 'coil' | 'fab' | 'sail' | 'redesign' | 'highorbit' | 'census' | 'rotlift' | 'carbon' | 'seis2' | 'mg' | 'neon' | 'pulse2' | 'silicon' | 'magsail' | 'iron' | 'neutrino'
  | 'accrete' | 'dilate' | 'prograde' | 'magscoop' | 'wide' | 'mri' | 'lower' | 'pulse3' | 'thick' | 'slim' | 'mad' | 'edge'
  | 'bz' | 'fermi' | 'kugel' | 'penrose' | 'evap' | 'dive' | 'yard'
  | 'interf' | 'widen' | 'vacuum' | 'pumpr' | 'router' | 'plockr' | 'raider' | 'pairs' | 'pairs2' | 'spectral' | 'quiet' | 'shifted' | 'detector' | 'microlens' | 'trapr' | 'passage';

export interface BuildingDef {
  base: Amounts;          // cena prvního kusu
  growth: number;         // násobek ceny za každý další kus
  prod?: Amounts;         // výroba za sekundu na kus
  cons?: Amounts;         // spotřeba za sekundu na kus (převodníky)
  makes?: { building: BuildingId; rate: number }; // staví jiné budovy
  unlock: (s: State) => boolean;
}
export interface ResearchDef { cost: Amounts; req?: (s: State) => boolean; reqKey?: string }
export interface LocationDef { cost: number; time: number; orbit: number; angle: number; speed: number; req?: (s: State) => boolean }
export interface PhaseDef { id: string; needW: number; disk: number }
export interface StageDef { id: string; age0: number; years: number; sec: number; L: number; T: number; R: number; z: number; needW: number; needM?: number }
export interface EventDef { res: Res; seconds: number; min: number; unlock: (s: State) => boolean }
export interface Trigger { id: string; when: (s: State, c?: { powerW: number }) => boolean }


export const RESOURCES: Res[] = ["ore", "metal", "energy", "data", "plasma", "exotic"];
export const BUILDINGS: Record<BuildingId, BuildingDef> = {
  drone: { base: { ore: 10 }, growth: 1.25, prod: { ore: 0.5 }, unlock: () => true },
  smelter: { base: { ore: 500 }, growth: 1.17, prod: { metal: 1 }, cons: { ore: 2 }, unlock: (s) => s.total.ore >= 800 || s.b.smelter > 0 },
  solar: { base: { metal: 120 }, growth: 1.18, prod: { energy: 2e3 }, unlock: (s) => s.total.metal >= 200 || s.b.solar > 0 },
  lab: { base: { metal: 600, energy: 3e6 }, growth: 1.2, prod: { data: 1e3 }, cons: { energy: 3e3 }, unlock: (s) => s.b.solar >= 3 || s.b.lab > 0 },
  drill: { base: { metal: 400, data: 2e4 }, growth: 1.18, prod: { ore: 12 }, unlock: (s) => !!s.r.deep },
  mirror: { base: { metal: 3e3, data: 1e5 }, growth: 1.17, prod: { energy: 4e5 }, unlock: (s) => !!s.r.mirror },
  replicator: { base: { metal: 4e3, data: 3e5 }, growth: 1.3, makes: { building: "drone", rate: 0.05 }, cons: { energy: 25e4 }, unlock: (s) => !!s.r.repl },
  forge: { base: { ore: 2e5, metal: 8e3, data: 1e5 }, growth: 1.18, prod: { metal: 100 }, cons: { ore: 200 }, unlock: (s) => !!s.r.forge },
  catcher: { base: { ore: 8e5, metal: 5e4, data: 5e5 }, growth: 1.18, prod: { ore: 5e3 }, unlock: (s) => !!s.r.catcher },
  qcomp: { base: { metal: 1e6, energy: 1e11 }, growth: 1.2, prod: { data: 2e8 }, cons: { energy: 2e8 }, unlock: (s) => !!s.r.quantum },
  fusion: { base: { ore: 1e6, metal: 1e5, data: 1e6 }, growth: 1.2, prod: { energy: 5e7 }, unlock: (s) => !!s.r.fusion },
  dyson: { base: { metal: 2e6, energy: 2e11 }, growth: 1.12, prod: { energy: 2e12 }, unlock: (s) => !!s.r.dyson && !s.star.done },
  // Kapitola 2. Trychtýř: prod = kg plazmatu za sekundu, spotřeba energie = stejné kg × G·M/R hvězdy (engine).
  // Kapitola 2, první stupeň: slabší stavby bez posílení od kolektorů. Vedou rychle k trychtýřům a separátorům.
  windnet: { base: { metal: 2e6 }, growth: 1.15, prod: { plasma: 2e7 }, unlock: ch2 },
  sieve: { base: { metal: 4e6, plasma: 1e8 }, growth: 1.15, prod: { metal: 1e7 }, cons: { plasma: 2e7 }, unlock: ch2 },
  corono: { base: { metal: 5e6, energy: 3e16 }, growth: 1.16, prod: { data: 5e9 }, cons: { energy: 2e12 }, unlock: ch2 },
  lifter: { base: { metal: 5e6, energy: 2e17 }, growth: 1.16, prod: { plasma: 1e6 }, cons: { energy: 1e6 }, unlock: (s) => !!s.r.lift && !s.star.done },
  separator: { base: { metal: 5e6, plasma: 2e7 }, growth: 1.16, prod: { metal: 5e6 }, cons: { plasma: 5e6 }, unlock: (s) => !!s.r.sep && !s.star.done },
  seismo: { base: { metal: 1e8, energy: 5e17 }, growth: 1.2, prod: { data: 5e10 }, cons: { energy: 2e13 }, unlock: (s) => !!s.r.seismo && !s.star.done },
  // Loděnice staví kolektory sama z podílu přírůstku kovu a energie (engine: fabTick); zásoby nevyčerpá.
  swarmfab: { base: { metal: 2e10, plasma: 5e9 }, growth: 1.3, makes: { building: "dyson", rate: 0.02 }, cons: { metal: 1, energy: 1 }, unlock: (s) => !!s.r.fab && !s.star.done },
  // Kapitola 3: černá díra. Plyn (plazma) z mlhoviny krmí akreční disk, kolektory chytají jeho záření.
  // Výkon disku a trysek, pokrytí kolektory a dilataci počítá engine (holeL, jetP, ringCov, gamma).
  scoop: { base: { plasma: 1e7 }, growth: 1.22, prod: { plasma: 1e5 }, unlock: (s) => !!s.r.accrete && hole3(s) },
  injector: { base: { plasma: 3e7 }, growth: 1.2, cons: { plasma: 2e5 }, unlock: (s) => !!s.r.mri && hole3(s) },
  ring: { base: { plasma: 6e7 }, growth: 1.15, prod: { energy: 1 }, unlock: (s) => !!s.r.accrete && hole3(s) },
  station: { base: { plasma: 3e8 }, growth: 1.22, prod: { data: 1.5e27 }, cons: { energy: 1e17 }, unlock: (s) => !!s.r.dilate && hole3(s) },
  jet: { base: { plasma: 1e15 }, growth: 1.18, prod: { energy: 1 }, unlock: (s) => !!s.r.mad && hole3(s) },
  hawking: { base: { plasma: 1e17, energy: 1e39 }, growth: 1.2, prod: { energy: 1, data: 1 }, cons: { plasma: 1e4 }, unlock: (s) => !!s.r.kugel && hole3(s) },
  // Orbitální montovna: sama staví diskové kolektory a tryskové lapače z podílu čistého přírůstku plazmatu (engine yardTick)
  yard: { base: { plasma: 3e16 }, growth: 1.6, unlock: (s) => !!s.r.yard && hole3(s) },
  // Kapitola 4: Most. Exotická hmota (kg) drží hrdla červích děr otevřená. Výkon domů počítá síť (bridge.ts).
  // Ruční stupeň: desky, majáky, roje, kotvy. Automatický stupeň: zámky, raziče, směrovače, páry, pumpy.
  plate: { base: { exotic: 2e18 }, growth: 1.15, prod: { exotic: 2e17 }, unlock: ch4 },
  bswarm: { base: { exotic: 3e18 }, growth: 1.13, unlock: ch4 },
  beacon: { base: { exotic: 4e18 }, growth: 1.4, prod: { data: 1 }, unlock: ch4 },
  anchor: { base: { exotic: 4e19 }, growth: 1.2, unlock: (s) => ch4(s) && (s.bridge?.n ?? 0) >= 3 },
  pump: { base: { exotic: 3e21 }, growth: 1.16, prod: { exotic: 4e19 }, unlock: (s) => ch4(s) && !!s.r.pumpr },
  router: { base: { exotic: 2e21 }, growth: 1.3, unlock: (s) => ch4(s) && !!s.r.router },
  plock: { base: { exotic: 5e21 }, growth: 1.25, unlock: (s) => ch4(s) && !!s.r.plockr },
  raider: { base: { exotic: 3e21 }, growth: 1.3, unlock: (s) => ch4(s) && !!s.r.raider },
  pair: { base: { exotic: 2e22 }, growth: 1.25, unlock: (s) => ch4(s) && !!s.r.pairs },
  kcol: { base: { exotic: 3e23 }, growth: 1.2, prod: { exotic: 1e20, data: 1 }, unlock: (s) => ch4(s) && !!s.visited.kilonova },
  gwdet: { base: { exotic: 1e24 }, growth: 1.22, prod: { data: 1 }, unlock: (s) => ch4(s) && !!s.r.detector },
  trap: { base: { exotic: 2e24 }, growth: 1.2, unlock: (s) => ch4(s) && !!s.r.trapr }
};
export const BUILDING_IDS = Object.keys(BUILDINGS) as BuildingId[];
function ch2(s: State) { return s.chapterDone >= 1 && !s.star.done; }
/** Kapitola 4 běží od konce ponoru (díra je hotová). */
export function ch4(s: State) { return !!s.hole?.done; }
export function bstage(n: number) { return (s: State) => ch4(s) && (s.bridge?.stage ?? 0) >= n; }
export const B: Record<BuildingId, BuildingDef> = BUILDINGS;
/** Kapitola 3 běží: po supernově, před koncem kapitoly se díra pořád krmí. */
export const hole3 = (s: State) => s.star.done && !s.hole?.done;
export const phase = (n: number) => (s: State) => s.star.done && (s.hole?.phase ?? 0) >= n;
export const stage = (n: number) => (s: State) => s.chapterDone >= 1 && s.star.stage >= n && !s.star.done;
export const has = (...ids: string[]) => (s: State) => ids.every((id) => (s.r as Record<string, true>)[id] || (s.visited as Record<string, true>)[id]);
export const RESEARCH: Record<ResearchId, ResearchDef> = {
  vib: { cost: { data: 2e4 } },
  swarm: { cost: { data: 5e4 } },
  deep: { cost: { data: 8e4 } },
  arc: { cost: { data: 12e4 } },
  scan: { cost: { data: 18e4 } },
  thinfilm: { cost: { data: 25e4 } },
  auto: { cost: { data: 3e5 }, req: has("scan") },
  lab2: { cost: { data: 35e4 }, req: has("arc") },
  mirror: { cost: { data: 4e5 }, req: has("thinfilm") },
  repl: { cost: { data: 5e5 }, req: has("auto") },
  resonance: { cost: { data: 6e5 }, req: has("vib", "deep") },
  forge: { cost: { data: 8e5 }, req: has("mirror") },
  cryo: { cost: { data: 1e6 }, req: has("moon"), reqKey: "moon" },
  signal: { cost: { data: 2e6 }, req: has("moon"), reqKey: "moon" },
  optics: { cost: { data: 3e6 }, req: has("mirror", "forge") },
  catcher: { cost: { data: 4e6 }, req: has("moon"), reqKey: "moon" },
  swarm2: { cost: { data: 6e6 }, req: has("repl") },
  fusion: { cost: { data: 1e7 }, req: has("giant"), reqKey: "giant" },
  supercond: { cost: { data: 2e7, metal: 1e6 }, req: has("giant"), reqKey: "giant" },
  plasma: { cost: { data: 15e7 }, req: has("forge", "fusion") },
  quantum: { cost: { data: 2e8 }, req: has("cryo", "fusion") },
  vib2: { cost: { data: 6e8 }, req: has("resonance", "giant") },
  dyson: { cost: { data: 1e9 }, req: has("sun"), reqKey: "sun" },
  nano: { cost: { data: 4e9 }, req: has("dyson") },
  statite: { cost: { data: 12e9 }, req: has("dyson") },
  induct: { cost: { data: 4e10 }, req: has("nano") },
  beam: { cost: { data: 2e11 }, req: has("statite") },
  lagrange: { cost: { data: 1e12 }, req: has("beam") },
  // Kapitola 2: Hvězda
  lift: { cost: { data: 2e14 }, req: (s) => s.chapterDone >= 1, reqKey: "typeI" },
  sep: { cost: { data: 6e14 }, req: has("lift") },
  seismo: { cost: { data: 5e14 }, req: has("lift") },
  coil: { cost: { data: 2e15 }, req: has("lift") },
  fab: { cost: { data: 8e15 }, req: has("sep") },
  sail: { cost: { data: 1e14 }, req: has("sep") },
  redesign: { cost: { data: 2e15 }, req: has("sep") },
  highorbit: { cost: { data: 1e16 }, req: has("sail") },
  census: { cost: { data: 5e16 }, req: has("seismo") },
  rotlift: { cost: { data: 3e22 }, req: stage(1), reqKey: "stage1" },
  carbon: { cost: { data: 2e23 }, req: stage(1), reqKey: "stage1" },
  seis2: { cost: { data: 1e24 }, req: stage(1), reqKey: "stage1" },
  mg: { cost: { data: 5e26 }, req: stage(2), reqKey: "stage2" },
  neon: { cost: { data: 3e27 }, req: stage(2), reqKey: "stage2" },
  pulse2: { cost: { data: 1e28 }, req: stage(2), reqKey: "stage2" },
  silicon: { cost: { data: 1e29 }, req: stage(3), reqKey: "stage3" },
  magsail: { cost: { data: 5e29 }, req: stage(3), reqKey: "stage3" },
  iron: { cost: { data: 5e30 }, req: stage(4), reqKey: "stage4" },
  neutrino: { cost: { data: 3e31 }, req: stage(4), reqKey: "stage4" },
  // Kapitola 3: Horizont
  accrete: { cost: { data: 1e30 }, req: (s) => s.star.done, reqKey: "nova" },
  dilate: { cost: { data: 1e33 }, req: phase(1), reqKey: "phase1" },
  prograde: { cost: { data: 1e31 }, req: has("accrete") },
  magscoop: { cost: { data: 4e31 }, req: has("accrete") },
  wide: { cost: { data: 1.5e32 }, req: has("accrete") },
  mri: { cost: { data: 1.2e34 }, req: phase(1), reqKey: "phase1" },
  lower: { cost: { data: 8e33 }, req: phase(1), reqKey: "phase1" },
  pulse3: { cost: { data: 4e34 }, req: phase(1), reqKey: "phase1" },
  thick: { cost: { data: 2e35 }, req: phase(1), reqKey: "phase1" },
  slim: { cost: { data: 1e36 }, req: (s) => phase(2)(s) && !!s.hole.cap, reqKey: "eddCap" },
  mad: { cost: { data: 4e36 }, req: phase(2), reqKey: "phase2" },
  edge: { cost: { data: 2e37 }, req: phase(2), reqKey: "phase2" },
  bz: { cost: { data: 1e38 }, req: phase(3), reqKey: "phase3" },
  fermi: { cost: { data: 3e38 }, req: phase(3), reqKey: "phase3" },
  kugel: { cost: { data: 1e39 }, req: phase(3), reqKey: "phase3" },
  penrose: { cost: { data: 1e40 }, req: phase(4), reqKey: "phase4" },
  evap: { cost: { data: 2e40 }, req: phase(4), reqKey: "phase4" },
  yard: { cost: { data: 3e38 }, req: phase(3), reqKey: "phase3" },
  dive: { cost: { data: 6e40 }, req: phase(4), reqKey: "phase4" },
  // Kapitola 4: Most
  interf: { cost: { data: 1.5e40 }, req: ch4, reqKey: "ch4" },
  widen: { cost: { data: 4e40 }, req: ch4, reqKey: "ch4" },
  vacuum: { cost: { data: 2e41 }, req: has("widen") },
  router: { cost: { data: 8e41 }, req: bstage(1), reqKey: "bstage1" },
  plockr: { cost: { data: 2e42 }, req: has("router") },
  raider: { cost: { data: 4e42 }, req: has("router") },
  pumpr: { cost: { data: 1.5e42 }, req: bstage(1), reqKey: "bstage1" },
  pairs: { cost: { data: 2e43 }, req: bstage(2), reqKey: "bstage2" },
  spectral: { cost: { data: 4e43 }, req: bstage(2), reqKey: "bstage2" },
  quiet: { cost: { data: 6e43 }, req: has("plockr", "pairs") },
  pairs2: { cost: { data: 2e44 }, req: bstage(3), reqKey: "bstage3" },
  shifted: { cost: { data: 6e43 }, req: bstage(3), reqKey: "bstage3" },
  detector: { cost: { data: 1e44 }, req: bstage(3), reqKey: "bstage3" },
  microlens: { cost: { data: 1e45 }, req: bstage(4), reqKey: "bstage4" },
  trapr: { cost: { data: 4e44 }, req: bstage(4), reqKey: "bstage4" },
  passage: { cost: { data: 2e45 }, req: bstage(4), reqKey: "bstage4" }
};
export const RESEARCH_IDS = Object.keys(RESEARCH) as ResearchId[];
export const R: Record<ResearchId, ResearchDef> = RESEARCH;
export const LOCATIONS = {
  belt: { cost: 0, time: 0, orbit: 0.36, angle: 0.3, speed: 0.02 },
  moon: { cost: 2e7, time: 45, orbit: 0.52, angle: 2.2, speed: 0.014 },
  giant: { cost: 3e9, time: 80, orbit: 0.72, angle: 4.1, speed: 9e-3 },
  sun: { cost: 2e11, time: 120, orbit: 0.15, angle: 1.2, speed: 0.05, req: (s) => !(s.chapterDone >= 1 && s.star.stage >= 1) },
  // Kapitola 2: mise za energii, každá dá trvalý násobič
  ione: { cost: 5e20, time: 90, orbit: 0.25, angle: 5.3, speed: 0.03, req: (s) => s.chapterDone >= 1 && !s.star.done },
  kuiper: { cost: 3e24, time: 150, orbit: 0.93, angle: 0.9, speed: 4e-3, req: (s) => s.chapterDone >= 1 && s.star.stage >= 1 && !s.star.done },
  core: { cost: 1e28, time: 120, orbit: 0.72, angle: 4.1, speed: 9e-3, req: (s) => s.chapterDone >= 1 && s.star.stage >= 2 && !s.star.done },
  dust: { cost: 3e29, time: 100, orbit: 0.42, angle: 2.9, speed: 0.012, req: (s) => s.chapterDone >= 1 && s.star.stage >= 3 && !s.star.done },
  // Kapitola 3: mise kolem černé díry za energii ze supernovy
  cas: { cost: 1e41, time: 90, orbit: 0.82, angle: 0.6, speed: 3e-3, req: (s) => s.star.done && !!s.r.accrete },
  lens: { cost: 3e41, time: 120, orbit: 0.95, angle: 3.6, speed: 2e-3, req: phase(1) },
  tde: { cost: 1e42, time: 120, orbit: 0.62, angle: 2.2, speed: 6e-3, req: phase(2) },
  pole: { cost: 2e42, time: 90, orbit: 0.3, angle: 4.9, speed: 0, req: phase(3) },
  ergo: { cost: 4e42, time: 150, orbit: 0.16, angle: 1.4, speed: 0, req: phase(4) },
  // další cesty za energii ze supernovy (Kap. 3)
  oort: { cost: 3e41, time: 100, orbit: 0.99, angle: 5.4, speed: 1.5e-3, req: (s) => s.star.done && !!s.r.accrete },
  pulsar: { cost: 1.2e42, time: 110, orbit: 0.88, angle: 2.8, speed: 2.5e-3, req: phase(1) },
  cloud: { cost: 4e42, time: 140, orbit: 0.97, angle: 4.3, speed: 1e-3, req: phase(2) },
  dwarf: { cost: 1e43, time: 120, orbit: 0.5, angle: 0.2, speed: 8e-3, req: phase(3) },
  stream: { cost: 2.5e43, time: 150, orbit: 0.72, angle: 3.2, speed: 4e-3, req: phase(4) },
  // Kapitola 4: mise v oblasti galaxie (orbit/angle = poloha na mapě galaxie)
  flyby: { cost: 1e42, time: 60, orbit: 0.68, angle: 4.4, speed: 0, req: (s) => ch4(s) && (s.bridge?.n ?? 0) >= 1 },
  magnetar: { cost: 2e42, time: 90, orbit: 0.45, angle: 3.1, speed: 0, req: bstage(1) },
  globular: { cost: 3e42, time: 100, orbit: 0.9, angle: 4.5, speed: 0, req: bstage(2) },
  kilonova: { cost: 4e42, time: 120, orbit: 0.38, angle: 2.4, speed: 0, req: bstage(2) },
  frb: { cost: 4e42, time: 90, orbit: 0.92, angle: 0.8, speed: 0, req: bstage(3) },
  rotation: { cost: 5e42, time: 120, orbit: 0.99, angle: 5.3, speed: 0, req: bstage(4) },
  bubbles: { cost: 6e42, time: 150, orbit: 0.06, angle: 1.57, speed: 0, req: (s: State): boolean => bstage(4)(s) && has("rotation")(s) }
} satisfies Record<string, LocationDef>;
export type LocationId = keyof typeof LOCATIONS;
export const LOCATION_IDS = Object.keys(LOCATIONS) as LocationId[];
export const L: Record<LocationId, LocationDef> = LOCATIONS;
export const STAGES: StageDef[] = [
  { id: "ms", age0: 46e5, years: 24e5, sec: 2400, L: 31e30, T: 3e4, R: 10, z: 0.02, needW: 1e21 },
  { id: "he", age0: 7e6, years: 7e5, sec: 2400, L: 75e30, T: 3600, R: 1e3, z: 0.05, needW: 1e26 },
  { id: "c", age0: 77e5, years: 600, sec: 1800, L: 8e31, T: 3500, R: 1100, z: 0.15, needW: 3e28 },
  { id: "neo", age0: 7700600, years: 1, sec: 1800, L: 85e30, T: 3450, R: 1150, z: 0.3, needW: 1e30 },
  { id: "si", age0: 7700610, years: 1 / 365.25, sec: 1800, L: 9e31, T: 3400, R: 1200, z: 0.5, needW: 25e30 }
];
export const STAR = {
  massKg: 25 * 1989e27,
  G: 6674e-14,
  rSun: 6957e5,
  collapseSec: 30,
  // když hráč předběhne hvězdu, stárne rychleji (náskok 50 % = 11× rychleji)
  catchUp: 20,
  // odpočet „poslední těžby“ před kolapsem
  collapseLift: 10,
  // trychtýře během odpočtu ×10
  snEnergyJ: 1e44,
  // kinetická energie výbuchu (skutečný řád)
  redLoss: 0.5,
  // bez vysokých drah shoří polovina roje
  liftShare: 1e-4
  // podíl energie G·M/R, který platí civilizace; zbytek dodá hvězda sama (Criswell)
};
// Kapitola 3: černá díra po Aldře (8 Sluncí). Fáze končí, když výkon civilizace dosáhne needW.
// disk = vzhled disku pro grafiku (0 slabý zpětný pád … 4 ergosféra).
export const PHASES: PhaseDef[] = [
  { id: "fallback", needW: 1e23, disk: 0 },
  { id: "thin", needW: 1e27, disk: 1 },
  { id: "edd", needW: 1.5e32, disk: 2 },
  { id: "jets", needW: 4e33, disk: 3 },
  { id: "ergo", needW: 2e34, disk: 4 }
];
export const HOLE = {
  massSun: 8,
  massKg: 8 * 1989e27,
  c2: 8.98755e16,
  rsKm: 23.6,             // Schwarzschildův poloměr 2GM/c²
  eddW: 1.26e31 * 8,      // Eddingtonova svítivost
  spin0: 0.2,             // rotace díry na začátku kapitoly
  spinMax: 0.998,         // Thorneova mez
  spinRate: 0.02,         // jak rychle se rotace blíží rovnováze (1/s)
  ringF: 0.03,            // kolik disku zakryje jeden kolektor
  jetF: 0.04,             // kolik trysek zachytí jeden lapač
  dataFb: 0.4,            // stanice sílí s výkonem civilizace (P/1e20)^0.4
  hawkData: 1e5,          // bajtů za každý joule Hawkingova záření (informace z vypařování)
  fbBase: 1e20,
  startPlasma: 6e7,       // plyn ze zpětného pádu na začátku kapitoly
  diveSec: 30
};
export const PRESTIGE = { per: 0.25, metalUnit: 1e12, perOrder: 2 };
export const EVENTS = {
  // v Kapitole 2 ruda ani zásoba energie nepomůžou: místo komet a erupcí kovový asteroid a protuberance
  comet: { res: "ore", seconds: 90, min: 50, unlock: (s) => s.b.drone >= 2 && !s.chapterDone },
  flare: { res: "energy", seconds: 60, min: 5e4, unlock: (s) => s.b.solar >= 1 && !s.chapterDone },
  mtype: { res: "metal", seconds: 90, min: 1e9, unlock: (s) => s.chapterDone >= 1 && !s.star.done },
  echo: { res: "data", seconds: 60, min: 2e3, unlock: (s) => !!s.r.scan },
  prominence: { res: "plasma", seconds: 90, min: 1e6, unlock: (s) => s.b.lifter >= 1 && !s.star.done },
  // Kapitola 3: shluk plynu z mlhoviny
  clump: { res: "plasma", seconds: 90, min: 1e7, unlock: (s) => s.b.scoop >= 1 && hole3(s) },
  // Kapitola 4: fluktuace hrdla (exotika)
  flux: { res: "exotic", seconds: 90, min: 1e19, unlock: (s) => ch4(s) && (s.bridge?.n ?? 0) >= 1 }
} satisfies Record<string, EventDef>;
export type EventId = keyof typeof EVENTS;
export const EVENT_IDS = Object.keys(EVENTS) as EventId[];
export const STORY: Trigger[] = [
  { id: "start", when: () => true },
  { id: "drone", when: (s) => s.b.drone >= 1 },
  { id: "iso", when: (s) => s.total.ore >= 150 },
  { id: "smelt", when: (s) => s.b.smelter >= 1 },
  { id: "lab", when: (s) => s.b.lab >= 1 },
  { id: "scan", when: (s) => !!s.r.scan },
  { id: "depart", when: (s) => !!s.travel || !!s.visited.moon },
  { id: "moon", when: (s) => !!s.visited.moon },
  { id: "repl", when: (s) => s.b.replicator >= 1 },
  { id: "signal", when: (s) => !!s.r.signal },
  { id: "giant", when: (s) => !!s.visited.giant },
  { id: "fusion", when: (s) => s.b.fusion >= 1 },
  { id: "sun", when: (s) => !!s.visited.sun },
  { id: "dyson1", when: (s) => s.b.dyson >= 1 },
  { id: "dyson10", when: (s) => s.b.dyson >= 10 },
  { id: "typeI", when: (s) => s.chapterDone >= 1 },
  // Kapitola 2
  { id: "lifter", when: (s) => s.b.lifter >= 1 },
  { id: "sep", when: (s) => s.b.separator >= 1 },
  { id: "seismo", when: (s) => s.b.seismo >= 1 },
  { id: "census", when: (s) => !!s.r.census },
  { id: "rebuild", when: (s) => s.p.count >= 1 },
  { id: "red", when: (s) => s.star.stage >= 1 },
  { id: "typeII", when: (s) => s.chapterDone >= 1 && !s.star.done && s.peakK >= 2 },
  { id: "carbon", when: (s) => s.star.stage >= 2 },
  { id: "pulse2", when: (s) => !!s.r.pulse2 },
  { id: "neo", when: (s) => s.star.stage >= 3 },
  { id: "si", when: (s) => s.star.stage >= 4 },
  { id: "collapse", when: (s) => s.star.collapse >= 0 },
  { id: "salvage", when: (s) => !!s.salvaged },
  { id: "nova", when: (s) => s.star.done },
  // Kapitola 3
  { id: "hole", when: (s) => !!s.r.accrete },
  { id: "disk", when: (s) => s.b.ring >= 1 && (s.vent?.best ?? 0) >= 1 },
  { id: "station", when: (s) => s.b.station >= 1 },
  { id: "chain5", when: (s) => (s.vent?.best ?? 0) >= 5 },
  { id: "burst", when: (s) => (s.vent?.over ?? 0) > 0 && !s.hole?.done },
  { id: "inj", when: (s) => s.b.injector >= 1 },
  { id: "station10", when: (s) => s.b.station >= 10 },
  { id: "spin", when: (s) => (s.hole?.a ?? 0) >= 0.9 && !s.hole?.done },
  { id: "yard", when: (s) => (s.b.yard ?? 0) >= 1 },
  { id: "hawk", when: (s) => s.b.hawking >= 1 },
  { id: "thin", when: (s) => (s.hole?.phase ?? 0) >= 1 },
  { id: "pulse3", when: (s) => !!s.r.pulse3 },
  { id: "edd", when: (s) => (s.hole?.phase ?? 0) >= 2 },
  { id: "lens", when: (s) => !!s.visited.lens },
  { id: "jets", when: (s) => s.b.jet >= 1 },
  { id: "fermi", when: (s) => !!s.r.fermi },
  { id: "ergo", when: (s) => (s.hole?.phase ?? 0) >= 4 },
  { id: "dive", when: (s) => (s.hole?.dive ?? -1) >= 0 },
  { id: "horizon", when: (s) => !!s.hole?.done },
  // Kapitola 4
  { id: "order", when: (s) => !!s.bridge?.started },
  { id: "where", when: (s) => !!s.bridge?.started && s.b.plate >= 1 },
  { id: "bridge1", when: (s) => (s.bridge?.n ?? 0) >= 1 },
  { id: "full", when: (s) => !!s.bridge?.fullSeen },
  { id: "net5", when: (s) => (s.bridge?.n ?? 0) >= 5 },
  { id: "lock1", when: (s) => (s.bridge?.locks ?? 0) >= 1 },
  { id: "relic", when: (s) => (s.bridge?.stage ?? 0) >= 1 && (s.bridge?.n ?? 0) >= 8 },
  { id: "cluster", when: (s) => !!s.bridge?.cluster },
  { id: "auto4", when: (s) => s.b.router >= 1 },
  { id: "pair", when: (s) => s.b.pair >= 1 },
  { id: "net20", when: (s) => (s.bridge?.n ?? 0) >= 20 },
  { id: "rhythm", when: (s) => (s.bridge?.locks ?? 0) >= 12 },
  { id: "typeIII", when: (s) => ch4(s) && s.peakK >= 3 },
  { id: "kilonova", when: (s) => !!s.visited.kilonova },
  { id: "shifted", when: (s) => !!s.r.shifted },
  { id: "halo", when: (s) => !!s.visited.rotation },
  { id: "pass", when: (s) => (s.bridge?.pass ?? -1) >= 0 },
  { id: "bubbles", when: (s) => !!s.visited.bubbles },
  { id: "through", when: (s) => !!s.bridge?.done }
];
export const FACTS: Trigger[] = [
  { id: "kardashev", when: (s) => s.time > 20 },
  { id: "megawatt", when: (_s, c) => c.powerW >= 1e6 },
  { id: "solar", when: (s) => s.b.solar >= 1 },
  { id: "bytes", when: (s) => s.b.lab >= 1 },
  { id: "europa", when: (s) => !!s.visited.moon },
  { id: "vonneumann", when: (s) => s.b.replicator >= 1 },
  { id: "he3", when: (s) => !!s.visited.giant },
  { id: "corona", when: (s) => !!s.visited.sun },
  { id: "dyson", when: (s) => s.b.dyson >= 1 },
  { id: "statite", when: (s) => !!s.r.statite },
  { id: "criswell", when: (s) => !!s.r.lift },
  { id: "mercury", when: (s) => !!s.visited.ione },
  { id: "chthon", when: (s) => !!s.visited.core },
  { id: "dustgrain", when: (s) => !!s.visited.dust },
  { id: "metals", when: (s) => s.b.separator >= 1 },
  { id: "seismo", when: (s) => s.b.seismo >= 1 },
  { id: "betelgeuse", when: (s) => s.star.stage >= 1 },
  { id: "typeII", when: (s) => s.peakK >= 2 },
  { id: "carbon", when: (s) => s.star.stage >= 2 },
  { id: "iron", when: (s) => s.star.stage >= 4 },
  { id: "sn1987a", when: (s) => !!s.r.neutrino },
  { id: "nova", when: (s) => s.star.done },
  { id: "rs", when: (s) => !!s.r.accrete },
  { id: "dyson79", when: (s) => s.star.done && s.time > 0 },
  { id: "qpo", when: (s) => (s.vent?.best ?? 0) >= 3 },
  { id: "accretion", when: (s) => (s.vent?.best ?? 0) >= 1 },
  { id: "gps", when: (s) => s.b.station >= 1 },
  { id: "isco", when: (s) => !!s.r.prograde },
  { id: "cas", when: (s) => !!s.visited.cas },
  { id: "eddington", when: (s) => (s.hole?.phase ?? 0) >= 2 },
  { id: "kerr", when: (s) => (s.hole?.a ?? 0) >= 0.9 },
  { id: "tde", when: (s) => !!s.visited.tde },
  { id: "bz", when: (s) => s.b.jet >= 1 },
  { id: "fermi", when: (s) => !!s.r.fermi },
  { id: "hawking", when: (s) => !!s.r.kugel },
  { id: "penrose", when: (s) => !!s.r.penrose },
  // Kapitola 4
  { id: "er", when: (s) => (s.bridge?.n ?? 0) >= 1 },
  { id: "casimir", when: (s) => ch4(s) && s.b.plate >= 1 },
  { id: "morris", when: (s) => (s.bridge?.n ?? 0) >= 3 },
  { id: "pll", when: (s) => s.b.plock >= 1 },
  { id: "erepr", when: (s) => s.b.pair >= 1 },
  { id: "sagan", when: (s) => ch4(s) && s.peakK >= 3 },
  { id: "gw170817", when: (s) => !!s.visited.kilonova },
  { id: "rubin", when: (s) => !!s.visited.rotation },
  { id: "fermib", when: (s) => !!s.visited.bubbles }
];
export const RULES = {
  baseReactorW: 500,
  // palubní reaktor platformy
  offlineShare: 0.1,
  // offline přinese 10 % produkce
  offlineCapSec: 8 * 3600,
  // nejvýš za 8 hodin
  autoClicksPerSec: 3,
  eventEverySec: [180, 360] as [number, number],
  eventTtlSec: 20,
  chapter1K: 1
  // konec Kapitoly 1 = Kardašev Typ I
  // konec Kapitoly 2 = supernova
};
