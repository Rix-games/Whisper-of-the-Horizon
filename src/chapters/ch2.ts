// ================= KAPITOLA 2 – HVĚZDA (Aldra) =================
// Vše, co se ladí v Kap. 2, je v tomto souboru. Simulace jen této kapitoly: CH=2 npm run sim
import type { State } from "../core/state";
import type { ChapterDef, BDef, RDef, MDef, JDef } from "../core/types";
import { R, ST } from "../core/types";
import { n, has, did, mile, emit } from "../core/bus";

export const L_ALDRA = 5.8e31;   // modrý veleobr ~25 M☉, ~1,5·10⁵ L☉

/** Ladicí konstanty Kap. 2. */
export const T2 = {
  goals: [3e19, 3e21, 3e23, 3.8e26, 5e28, 2.6e31],  // Typ II = 3,8·10²⁶ W (celé Slunce); 6 stadií
  firstGoalVsBase: 1.8,       // první cíl aspoň ×1,8 výkonu, se kterým hráč přišel
  area0: 5e-17,               // podíl světla Aldry na kolektor (bez vylepšení)
  colCost0: 3, colCostExp: 0.62, // cena kolektoru = 3 · plocha^0,62
  salvoPer: 120,              // ruční salva = počet / 120
  mirror: 1.6,                // ×plocha za úroveň Zrcadlových plachet
  out: { sieve: 1.5, lift: 25, accel: 1e4, windc: 4e5, shell: 1.5e8, wr: 2e9 } as Record<string, number>, // kg/s za kus
  factShare: 0.5,             // podíl pasivního plazmatu, který berou továrny
  factRate: 0.5, fspeed: 1.5, // salv za s na továrnu, ×za úroveň
  flare: { passive: 2.5, cost: 6, harvest: 1.22, comboStep: 0.1 }, // erupce = pw·(2,5·příjem/s + 6·cena kolektoru)·…
  startPlasma: 40,
  price: { k: 1.2, g: 0 },      // kolečka cen staveb: ×první cena, +zdražení za kus
};

const B = (o: Omit<BDef, "ch">): BDef => ({ ch: 2, ...o });
export const BUILD2: BDef[] = [
  B({ id: "kol", tier: 1, kind: "swarm", cur: "plasma", c0: 3, g: 1, req: () => true }),
  B({ id: "sieve", tier: 1, kind: "gen", cur: "plasma", c0: 15, g: 1.15, req: () => true }),
  B({ id: "corona", tier: 1, kind: "data", cur: "plasma", c0: 60, g: 1.22, d: 3e3, req: (s) => s.tot.plasma >= 40 }),
  B({ id: "mirror", tier: 1, kind: "up", cur: "plasma", c0: 120, g: 3.2, max: 30, req: (s) => s.tot.plasma >= 80 }),
  B({ id: "tame", tier: 1, kind: "up", cur: "plasma", c0: 200, g: 3, max: 4, req: (s) => s.stats.flares >= 1 }),
  B({ id: "jet", tier: 1, kind: "up", cur: "plasma", c0: 350, g: 3, max: 4, req: (s) => s.stats.flares >= 3 }),
  B({ id: "harvest", tier: 1, kind: "up", cur: "plasma", c0: 600, g: 3.4, max: 6, req: (s) => s.stats.flares >= 5 }),
  B({ id: "lift", tier: 1, kind: "gen", cur: "plasma", c0: 2e3, g: 1.17, req: R("lifting") }),
  B({ id: "fact", tier: 2, kind: "auto", cur: "plasma", c0: 3e4, g: 1.3, req: R("replic") }),
  B({ id: "fspeed", tier: 2, kind: "up", cur: "plasma", c0: 1e6, g: 4, max: 6, req: R("replic") }),
  B({ id: "accel", tier: 2, kind: "gen", cur: "plasma", c0: 1e6, g: 1.18, req: ST(2) }),
  B({ id: "windc", tier: 2, kind: "gen", cur: "plasma", c0: 4e7, g: 1.2, req: ST(3) }),
  B({ id: "shell", tier: 2, kind: "gen", cur: "plasma", c0: 1e10, g: 1.2, req: ST(4) }),
  B({ id: "wr", tier: 2, kind: "gen", cur: "plasma", c0: 1.5e12, g: 1.2, req: ST(5) }),
  B({ id: "anchor", tier: 2, kind: "up", cur: "plasma", c0: 3e6, g: 5, max: 3, req: R("anchors") }),
  B({ id: "nudet", tier: 2, kind: "data", cur: "plasma", c0: 1e10, g: 1.25, d: 2e7, req: ST(4) }),
];
const Rr = (o: Omit<RDef, "ch">): RDef => ({ ch: 2, ...o });
export const RESEARCH2: RDef[] = [
  Rr({ id: "optics", cost: 2e4, req: () => true }),                                     // plocha ×2
  Rr({ id: "loops", cost: 1.2e5, req: (s) => s.stats.flares >= 2 }),                    // plazma ×1,5
  Rr({ id: "lifting", cost: 2e5, req: ST(1) }),                                         // hvězdný zdvih
  Rr({ id: "replic", cost: 1.5e6, req: ST(2), lvl2: true }),                            // továrny
  Rr({ id: "thin", cost: 2e7, req: (s) => s.stage >= 2 && n(s, "accel") >= 3 }),         // plocha ×3
  Rr({ id: "anchors", cost: 4e7, req: (s) => n(s, "fact") >= 5 }),                      // kotvy
  Rr({ id: "outer", cost: 2e9, req: (s) => s.stage >= 4 && n(s, "windc") >= 3 }),        // plocha ×3
  Rr({ id: "convect", cost: 6e9, req: (s) => n(s, "shell") >= 15 }),                   // obálka ×2
  Rr({ id: "giant", cost: 3e10, req: (s) => s.stage >= 4 && n(s, "shell") >= 25 }),     // plocha ×1,5
  Rr({ id: "neutrino", cost: 1.5e10, req: (s) => s.stage >= 4 && n(s, "shell") >= 8 }),                                     // data ×3
  Rr({ id: "collapse", cost: 2e11, req: (s) => s.stage >= 6, final: true }),
];
const M = (o: Omit<MDef, "ch">): MDef => ({ ch: 2, ...o });
export const MISSIONS2: MDef[] = [
  M({ id: "dust", cost: 1.5e19, dur: 90, req: () => true, at: [640, 380], view: "system" }),   // plazma ×2
  M({ id: "pulse", cost: 5e21, dur: 120, req: ST(1), at: [800, 500], view: "system" }),        // data ×2
  M({ id: "light", cost: 5e23, dur: 150, req: ST(2), at: [560, 420], view: "near" }),          // plocha ×2
  M({ id: "remnant", cost: 6e28, dur: 160, req: ST(4), at: [1130, 330], view: "near" }),       // plocha ×1,5
  M({ id: "envelope", cost: 3e29, dur: 150, req: (s) => s.stage >= 4 && n(s, "shell") >= 5, at: [700, 600], view: "near" }), // plazma ×1,5
  M({ id: "wind", cost: 3e31, dur: 160, req: ST(5), at: [800, 500], view: "near" }),           // plazma ×2
];
const J = (id: string, when: (s: State) => boolean, kind?: "fact"): JDef => ({ id, ch: 2, when, kind });
export const JOURNAL2: JDef[] = [
  J("c2_start", () => true),
  J("c2_first", (s) => s.n >= 20),
  J("c2_flare", (s) => s.stats.flares >= 1),
  J("c2_cme", (s) => s.stats.cme >= 1),
  J("f2_dyson", (s) => s.n >= 150, "fact"),
  J("c2_reson", (s) => s.best.reson >= 3),
  J("c2_dust", (s) => did(s, "dust")),
  J("c2_st1", (s) => s.stage >= 1),
  J("c2_pulse", (s) => did(s, "pulse")),
  J("c2_st2", (s) => s.stage >= 2),
  J("c2_fact", (s) => n(s, "fact") >= 1),
  J("f2_repl", (s) => n(s, "fact") >= 4, "fact"),
  J("c2_lift", (s) => n(s, "lift") >= 1),
  J("c2_light", (s) => did(s, "light")),
  J("c2_st3", (s) => s.stage >= 3),
  J("c2_typeII", (s) => s.stage >= 4),
  J("c2_anchor", (s) => n(s, "anchor") >= 1),
  J("c2_remnant", (s) => did(s, "remnant")),
  J("c2_red", (s) => s.stage >= 5),
  J("f2_red", (s) => s.stage >= 5 && s.stT > 90, "fact"),
  J("c2_envelope", (s) => did(s, "envelope")),
  J("c2_neutr", (s) => has(s, "neutrino")),
  J("c2_wind", (s) => did(s, "wind")),
  J("c2_last", (s) => s.stage >= 6),
];

// ---------- vzorce ----------
export function areaMult(s: State) {
  let m = Math.pow(T2.mirror, n(s, "mirror"));
  if (has(s, "optics")) m *= 2;
  if (has(s, "thin")) m *= 3;
  if (has(s, "outer")) m *= 3;
  if (did(s, "light")) m *= 2;
  if (did(s, "remnant")) m *= 1.5;
  if (has(s, "giant")) m *= 1.5;
  return m;
}
export const colArea = (s: State) => T2.area0 * areaMult(s);
export const coverage = (s: State) => 1 - Math.exp(-s.n * colArea(s));
export const colCost = (s: State) => T2.colCost0 * Math.pow(areaMult(s), T2.colCostExp);
export const salvo = (s: State) => Math.max(1, Math.floor(s.n / T2.salvoPer));
export function plasmaMult(s: State) {
  let m = 1;
  if (did(s, "dust")) m *= 2;
  if (did(s, "wind")) m *= 2;
  if (did(s, "envelope")) m *= 1.5;
  if (has(s, "loops")) m *= 1.5;
  return m;
}
export const prodRate = (s: State, id: string) => T2.out[id] * mile(n(s, id)) * (id === "shell" && has(s, "convect") ? 2 : 1);
export function plasmaPassive(s: State) { let p = 0; for (const id in T2.out) p += n(s, id) * prodRate(s, id); return p * plasmaMult(s); }
export const factRate = (s: State) => n(s, "fact") * T2.factRate * Math.pow(T2.fspeed, n(s, "fspeed")) * salvo(s);
export const flareMult = (s: State) => Math.pow(T2.flare.harvest, n(s, "harvest"));
/** Plazma z erupce: pw = síla (řízená 1,5+), share = podíl roje zasažený výtryskem. */
export const flareGain = (s: State, pw: number, share: number) =>
  pw * (T2.flare.passive * plasmaPassive(s) + T2.flare.cost * colCost(s)) * (1 + share) * flareMult(s);

export const CH2: ChapterDef = {
  id: 2, cur: "plasma", view: "star", map: "system", lvl2: 2, price: T2.price,
  goals: (s) => { const g = T2.goals.slice(); g[0] = Math.max(g[0], T2.firstGoalVsBase * s.base); return g; },
  build: BUILD2, research: RESEARCH2, missions: MISSIONS2, journal: JOURNAL2,
  power: (s) => s.base + L_ALDRA * coverage(s),
  passive: plasmaPassive,
  dataMult: (s) => (did(s, "pulse") ? 2 : 1) * (has(s, "neutrino") ? 3 : 1),
  onStart(s) { s.res.plasma = T2.startPlasma; },
  autos(s, dt) {
    // Samoreplikující továrny: berou podíl pasivního plazmatu a vypouštějí kolektory
    if (n(s, "fact") > 0 && s.auto.fact !== false) {
      s.bank.fact = Math.min((s.bank.fact || 0) + plasmaPassive(s) * T2.factShare * dt, s.res.plasma);
      const c = colCost(s), k = Math.min(Math.floor(s.bank.fact / c), factRate(s) * dt);
      const whole = Math.floor(k + (s.bank.fracF || 0));
      s.bank.fracF = (s.bank.fracF || 0) + k - whole;
      if (whole > 0) { s.bank.fact -= whole * c; s.res.plasma -= whole * c; s.n += whole; emit("factkol", undefined, whole); }
    }
  },
  botValue(s, id) { return id in T2.out ? (prodRate(s, id) * plasmaMult(s)) / Math.max(1, plasmaPassive(s)) : undefined; },
  simStart(s) { s.base = 1.1e16; s.res.data = 1e8; s.res.energy = 1e19; },
};
