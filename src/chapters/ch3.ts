// ================= KAPITOLA 3 – GALAXIE =================
// Vše, co se ladí v Kap. 3, je v tomto souboru. Simulace jen této kapitoly: CH=3 npm run sim
import type { State } from "../core/state";
import type { ChapterDef, BDef, RDef, MDef, JDef } from "../core/types";
import { R, ST } from "../core/types";
import { n, has, did } from "../core/bus";
import { galaxyNodes } from "../core/galaxy";

export const L_SUN = 3.828e26;

/** Ladicí konstanty Kap. 3. */
export const T3 = {
  goals: [5e31, 4e32, 3e33, 3e34, 6e35, 5.2e36],   // Typ III ≈ 5·10³⁶ W (Mléčná dráha); 6 stadií
  firstGoalVsBase: 1.8,
  cap0: 0.002, capStep: 1.08, capMax: 0.16,    // podíl světla hvězd zachycený roji kolonií
  sail0: 0.6, sailPerStar: 0.02, loom: 1.12,     // plachty/s = (0,6 + 0,02·Σ√(hvězdy/1000))·…
  beamDrain: 1.5,                               // svazek bere 1,5× výkon za s (× síla svazku)
  energyCapS: 300,                              // na startu kapitoly max. 300 s výkonu v zásobě energie
  startSails: 25,
  price: { k: 1, g: 0 },      // kolečka cen staveb: ×první cena, +zdražení za kus
  zone: [0.5, 0.7, 0.9, 1.1, 1.35, 1.7, 2.2], // hranice dosahu sond od domova (souřadnice galaxie) podle stadia
  need: [3, 0.38],
  probe: [0.5, 0.4],          // sondy: ×šance na šíření a ×rychlost za úroveň
  beacon: 0.3,                // síla svazku jednoho majáku (ruční svazek = 1)
  mature: 720,
  boost: 2,                   // zachycení ×N za výzkumy Roje u každé hvězdy a Roje v halu                // s, než nová kolonie postaví roj a svítí naplno (zachycení roste z 10 % na 100 %)          // doba osídlení (s při síle 1) = 0,6·(hvězdy/10⁴)^0,3
  reach: [0.12, 0.035],       // dosah svazku (podíl poloměru galaxie): základ + za úroveň
};

const B = (o: Omit<BDef, "ch">): BDef => ({ ch: 3, ...o });
export const BUILD3: BDef[] = [
  B({ id: "power", tier: 1, kind: "up", cur: "sails", c0: 20, g: 2.6, max: 6, maxAt: (s) => 1 + s.stage, req: () => true }),
  B({ id: "loom", tier: 1, kind: "mult", cur: "sails", c0: 25, g: 1.35, req: () => true }),
  B({ id: "reach", tier: 1, kind: "up", cur: "sails", c0: 35, g: 2.7, max: 6, maxAt: (s) => 1 + s.stage, req: (s) => s.tot.sails >= 15 }),
  B({ id: "spread", tier: 1, kind: "up", cur: "sails", c0: 30, g: 2.5, max: 6, maxAt: (s) => 1 + s.stage, req: (s) => s.tot.sails >= 25 }),
  B({ id: "swarm3", tier: 1, kind: "mult", cur: "sails", c0: 40, g: 1.35, maxAt: (s) => 4 + 4 * s.stage, req: (s) => s.tot.sails >= 30 }),
  B({ id: "interf", tier: 1, kind: "data", cur: "sails", c0: 50, g: 1.22, d: 4e9, req: (s) => s.tot.sails >= 40 }),
  B({ id: "probe", tier: 2, kind: "up", cur: "sails", c0: 3e3, g: 3.2, max: 5, maxAt: (s) => s.stage - 1, req: R("probes") }),
  B({ id: "beacon", tier: 2, kind: "auto", cur: "sails", c0: 5e3, g: 2, req: R("beacons") }),
  B({ id: "radio", tier: 2, kind: "data", cur: "sails", c0: 2e5, g: 1.25, d: 3e12, req: ST(3) }),
];
const Rr = (o: Omit<RDef, "ch">): RDef => ({ ch: 3, ...o });
export const RESEARCH3: RDef[] = [
  Rr({ id: "sailcloth", cost: 4e12, req: () => true }),                                 // plachty ×2
  Rr({ id: "dyson3", cost: 3e13, req: (s) => n(s, "swarm3") >= 3 }),                    // zachycení ×3
  Rr({ id: "probes", cost: 2e14, req: ST(2), lvl2: true }),                             // sondy
  Rr({ id: "beacons", cost: 1e15, req: (s) => n(s, "probe") >= 1 }),                    // majáky
  Rr({ id: "gaia", cost: 6e15, req: ST(3) }),                                           // šíření ×1,5, data ×2
  Rr({ id: "halo", cost: 4e16, req: (s) => s.stage >= 3 && n(s, "beacon") >= 4 }),      // zachycení ×3
  Rr({ id: "seeds", cost: 1.5e17, req: (s) => s.stage >= 4 && colCount(s) >= 120 }),   // kolonie dozrávají 2× rychleji
  Rr({ id: "jets", cost: 3e17, req: ST(5) }),                                           // zachycení ×2
  Rr({ id: "sgra", cost: 2e16, req: (s) => s.stage >= 6, final: true }),
];
const M = (o: Omit<MDef, "ch" | "view" | "at">): MDef => ({ ch: 3, view: "galaxy", at: [0, 0], ...o });
export const MISSIONS3: MDef[] = [
  M({ id: "magnetar", cost: 5e34, dur: 90, req: () => true }),     // plachty ×2
  M({ id: "pulsar", cost: 1e35, dur: 120, req: ST(1) }),           // data ×2
  M({ id: "globular", cost: 8e35, dur: 120, req: ST(2) }),         // zachycení ×1,5
  M({ id: "kilonova", cost: 5e36, dur: 140, req: ST(3) }),         // data ×3
  M({ id: "nebula", cost: 2e37, dur: 140, req: (s) => s.stage >= 3 && colCount(s) >= 60 }), // dozrávání ×1,5 rychleji
  M({ id: "frb", cost: 1e38, dur: 150, req: ST(4) }),              // šíření ×2, plachty ×2
  M({ id: "stream", cost: 4e38, dur: 150, req: (s) => s.stage >= 4 && colCount(s) >= 140 }), // šíření ×1,5
  M({ id: "fermi", cost: 2e39, dur: 160, req: ST(5) }),            // příběh
];
/** Polohy misí v souřadnicích galaxie (−1..1). */
export const GAL_SITES: Record<string, [number, number]> = {
  magnetar: [-0.62, 0.18], pulsar: [-0.3, -0.62], nebula: [-0.05, 0.62], stream: [0.62, 0.15], globular: [-0.15, -0.78], kilonova: [0.42, 0.52], frb: [0.78, -0.35], fermi: [0.0, 0.0],
};
const J = (id: string, when: (s: State) => boolean, kind?: "fact"): JDef => ({ id, ch: 3, when, kind });
export const JOURNAL3: JDef[] = [
  J("c3_start", () => true),
  J("c3_first", (s) => colCount(s) >= 3),
  J("f3_sail", (s) => s.chT > 120, "fact"),
  J("c3_ten", (s) => colCount(s) >= 10),
  J("c3_magnetar", (s) => did(s, "magnetar")),
  J("c3_st1", (s) => s.stage >= 1),
  J("c3_ruin", (s) => colCount(s) >= 25),
  J("c3_globular", (s) => did(s, "globular")),
  J("c3_st2", (s) => s.stage >= 2),
  J("c3_probe", (s) => n(s, "probe") >= 1),
  J("f3_vn", (s) => n(s, "probe") >= 2, "fact"),
  J("c3_beacon", (s) => n(s, "beacon") >= 1),
  J("c3_kilonova", (s) => did(s, "kilonova")),
  J("c3_pulsar", (s) => did(s, "pulsar")),
  J("c3_st3", (s) => s.stage >= 3),
  J("c3_sun", (s) => s.stage >= 3 && s.stT > 100),
  J("c3_nebula", (s) => did(s, "nebula")),
  J("c3_st3b", (s) => s.stage >= 4),
  J("c3_stream", (s) => did(s, "stream")),
  J("c3_hundred", (s) => colCount(s) >= 100),
  J("c3_frb", (s) => did(s, "frb")),
  J("c3_st4", (s) => s.stage >= 5),
  J("f3_sgra", (s) => s.stage >= 5 && s.stT > 120, "fact"),
  J("c3_fermi", (s) => did(s, "fermi")),
  J("c3_typeIII", (s) => s.stage >= 6),
];

// ---------- kolonie ----------
export function colCount(s: State) { let c = 0; for (let i = 0; i < s.col.length; i++) if (s.col[i] === "1") c++; return c; }
export const isOn = (s: State, i: number) => s.col[i] === "1";
export function setOn(s: State, i: number) {
  if (s.col.length < i + 1) s.col = s.col.padEnd(i + 1, "0");
  s.col = s.col.slice(0, i) + "1" + s.col.slice(i + 1);
  delete s.prog[i];
  s.prog["t" + i] = s.t;   // čas založení – kolonie pak dozrává
}
export const matureT = (s: State) => T3.mature / ((has(s, "seeds") ? 2 : 1) * (did(s, "nebula") ? 1.5 : 1));
/** Zralost kolonie 0,1–1 (roj se staví postupně). */
export function maturity(s: State, i: number) {
  const t0 = s.prog["t" + i];
  if (t0 == null) return 1;
  return Math.min(1, 0.1 + 0.9 * ((s.t - t0) / matureT(s)));
}
let cache = { key: "", v: 0, sq: 0, t: -1 };
/** v = hvězdy vážené zralostí, sq = Σ√hvězd (plachty). Přepočet nejvýš 1× za s. */
export function starsOn(s: State) {
  if (cache.key !== s.col || Math.abs(s.t - cache.t) >= 1) {
    let v = 0, sq = 0;
    galaxyNodes().forEach((p, i) => { if (p.home || !isOn(s, i)) return; v += p.stars * maturity(s, i); sq += Math.sqrt(p.stars / 1e3); });
    cache = { key: s.col, v, sq, t: s.t };
  }
  return cache;
}
export function capture(s: State) {
  let c = T3.cap0 * Math.pow(T3.capStep, n(s, "swarm3"));
  if (has(s, "dyson3")) c *= T3.boost;
  if (has(s, "halo")) c *= T3.boost;
  if (did(s, "globular")) c *= 1.5;
  if (has(s, "jets")) c *= 2;
  return Math.min(T3.capMax, c);
}
export function sailMult(s: State) {
  let m = Math.pow(T3.loom, n(s, "loom"));
  if (has(s, "sailcloth")) m *= 2;
  if (did(s, "magnetar")) m *= 2;
  if (did(s, "frb")) m *= 2;
  return m;
}
export const sailPassive = (s: State) => (T3.sail0 + starsOn(s).sq * T3.sailPerStar) * sailMult(s);
export const zoneR = (s: State) => T3.zone[Math.min(s.stage, T3.zone.length - 1)];
export function inZone(s: State, i: number) { const N = galaxyNodes(), h = N[0], p = N[i]; return Math.hypot(p.x - h.x, p.y - h.y) <= zoneR(s); }
export const needOf = (stars: number) => T3.need[0] * Math.pow(stars / 1e4 + 1, T3.need[1]);
export const spreadMult = (s: State) => (did(s, "frb") ? 2 : 1) * (has(s, "gaia") ? 1.5 : 1) * (did(s, "stream") ? 1.5 : 1);

export const CH3: ChapterDef = {
  id: 3, cur: "sails", view: "galaxy", map: "galaxy", lvl2: 2, price: T3.price,
  goals: (s) => { const g = T3.goals.slice(); g[0] = Math.max(g[0], T3.firstGoalVsBase * s.base); return g; },
  build: BUILD3, research: RESEARCH3, missions: MISSIONS3, journal: JOURNAL3,
  power: (s) => s.base + starsOn(s).v * L_SUN * capture(s),
  passive: sailPassive,
  dataMult: (s) => (did(s, "kilonova") ? 3 : 1) * (has(s, "gaia") ? 2 : 1) * (did(s, "pulsar") ? 2 : 1),
  onStart(s) {
    s.res.sails = T3.startSails;
    s.res.energy = Math.min(s.res.energy, CH3.power(s) * T3.energyCapS);
    if (!s.col) setOn(s, 0);
  },
  simStart(s) { s.base = 2.6e31; s.res.data = 2e11; s.res.energy = 2.6e31 * 300; },
};
