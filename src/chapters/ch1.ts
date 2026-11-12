// ================= KAPITOLA 1 – KÁMEN =================
// Vše, co se ladí v Kap. 1, je v tomto souboru. Texty: src/i18n/cs.ts (klíče podle id).
// Simulace jen této kapitoly: CH=1 npm run sim
import type { State } from "../core/state";
import type { ChapterDef, BDef, RDef, MDef, JDef } from "../core/types";
import { R, ST } from "../core/types";
import { n, has, did, mile, emit, RT } from "../core/bus";

/** Ladicí konstanty Kap. 1. */
export const T1 = {
  goals: [2e4, 1e7, 2e10, 2e13, 1e16],   // W – Typ I na konci
  rtg: 500,                               // W platformy na startu
  layerMult: 4,                           // ×ruda za každou hlubší vrstvu (= stadium)
  refine: 1.12,                           // ×ruda za rafinerii
  hand: 1.6,                              // ×ruční řez za úroveň Fokusace
  drone: 0.7,                             // dron dává ×0,7 ručního řezu
  rich: [0.18, 0.4],                      // šance na bohatou žílu bez/po Termální mapě
  dockShare: [0.2, 0.08],                 // podíl příjmu do banky doku: základ + za úroveň
  dockPeriod: 6,                          // s mezi drony z doku (1. úroveň)
  asmShare: 0.3,                          // podíl příjmu pro Autonomní montáž
};

const B = (o: Omit<BDef, "ch">): BDef => ({ ch: 1, ...o });
export const BUILD1: BDef[] = [
  B({ id: "panel", tier: 1, kind: "gen", cur: "ore", c0: 8, g: 1.12, w: 40, req: () => true }),
  B({ id: "scan", tier: 1, kind: "data", cur: "ore", c0: 25, g: 1.22, d: 0.35, req: (s) => s.tot.ore >= 15 }),
  B({ id: "beam", tier: 1, kind: "up", cur: "ore", c0: 20, g: 2.4, max: 5, req: (s) => s.tot.ore >= 10 }),
  B({ id: "cool", tier: 1, kind: "up", cur: "ore", c0: 35, g: 2.4, max: 5, req: (s) => s.tot.ore >= 30 }),
  B({ id: "magnet", tier: 1, kind: "up", cur: "ore", c0: 18, g: 2.2, max: 4, req: (s) => s.tot.ore >= 20 }),
  B({ id: "find", tier: 1, kind: "up", cur: "ore", c0: 60, g: 2.6, max: 5, req: (s) => s.tot.ore >= 50 }),
  B({ id: "refine", tier: 1, kind: "mult", cur: "ore", c0: 90, g: 1.3, req: (s) => s.tot.ore >= 70 }),
  B({ id: "field", tier: 1, kind: "gen", cur: "ore", c0: 1.5e3, g: 1.12, w: 8e4, req: ST(1) }),
  B({ id: "focus", tier: 1, kind: "up", cur: "ore", c0: 600, g: 5, max: 8, req: (s) => s.tot.ore >= 1.5e3 }),
  B({ id: "drone", tier: 2, kind: "unit", cur: "ore", c0: 2e5, g: 1.17, req: R("drones") }),
  B({ id: "dspeed", tier: 2, kind: "up", cur: "ore", c0: 8e5, g: 3, max: 5, req: R("drones") }),
  B({ id: "dock", tier: 2, kind: "auto", cur: "ore", c0: 4e6, g: 4, max: 4, req: R("dock") }),
  B({ id: "farm", tier: 2, kind: "gen", cur: "ore", c0: 5e5, g: 1.12, w: 1e7, req: ST(2) }),
  B({ id: "dcenter", tier: 2, kind: "data", cur: "ore", c0: 1.5e7, g: 1.25, d: 500, req: ST(2) }),
  B({ id: "statite", tier: 2, kind: "gen", cur: "ore", c0: 1.5e9, g: 1.12, w: 3e10, req: R("driver") }),
  B({ id: "ring", tier: 2, kind: "gen", cur: "ore", c0: 2e11, g: 1.12, w: 3e13, req: ST(4) }),
];
const Rr = (o: Omit<RDef, "ch">): RDef => ({ ch: 1, ...o });
export const RESEARCH1: RDef[] = [
  Rr({ id: "spectro", cost: 15, req: () => true }),                       // ruda ×2
  Rr({ id: "cells", cost: 70, req: (s) => n(s, "panel") >= 5 }),           // panely ×3
  Rr({ id: "thermo", cost: 350, req: ST(1) }),                             // víc bohatých žil
  Rr({ id: "drones", cost: 1.2e4, req: ST(2), lvl2: true }),               // drony
  Rr({ id: "dock", cost: 6e4, req: (s) => n(s, "drone") >= 3 }),           // montážní dok
  Rr({ id: "regolith", cost: 6e4, req: (s) => n(s, "farm") >= 1 }),        // farmy ×3
  Rr({ id: "driver", cost: 3e5, req: ST(3) }),                             // statity
  Rr({ id: "assembly", cost: 1.2e6, req: (s) => n(s, "statite") >= 1 }),   // autonomní montáž elektráren
  Rr({ id: "deepdrill", cost: 5e6, req: ST(4) }),                          // ruda ×4
  Rr({ id: "statites", cost: 2.5e7, req: (s) => n(s, "statite") >= 10 }),  // statity ×3
  Rr({ id: "collector", cost: 1.2e8, req: (s) => s.stage >= 5, final: true }),
];
const M = (o: Omit<MDef, "ch" | "view">): MDef => ({ ch: 1, view: "system", ...o });
export const MISSIONS1: MDef[] = [
  M({ id: "belt", cost: 1.5e6, dur: 45, req: (s) => s.t > 60, at: [1010, 610] }),   // ruda ×1,5
  M({ id: "kelvar", cost: 5e8, dur: 90, req: ST(1), at: [1270, 300] }),             // data ×2
  M({ id: "tauris", cost: 2e11, dur: 120, req: ST(2), at: [1225, 330] }),           // výkon ×1,5
  M({ id: "comet", cost: 3e14, dur: 140, req: ST(3), at: [330, 170] }),             // ruda ×2
  M({ id: "chthon", cost: 2e17, dur: 150, req: ST(4), at: [880, 500] }),            // prstenec ×2
];
const J = (id: string, when: (s: State) => boolean, kind?: "fact"): JDef => ({ id, ch: 1, when, kind });
export const JOURNAL1: JDef[] = [
  J("c1_start", () => true),
  J("c1_cut", (s) => s.stats.cuts >= 25),
  J("c1_panel", (s) => n(s, "panel") >= 1),
  J("c1_full", (s) => s.stats.full >= 1),
  J("f1_aldra", (s) => s.t > 150, "fact"),
  J("c1_chain", (s) => s.best.chainHand >= 3),
  J("c1_belt", (s) => did(s, "belt")),
  J("c1_st1", (s) => s.stage >= 1),
  J("c1_layer1", (s) => s.stage >= 1 && s.stT > 40),
  J("f1_kard", (s) => s.stage >= 1 && s.stT > 90, "fact"),
  J("c1_kelvar", (s) => did(s, "kelvar")),
  J("c1_st2", (s) => s.stage >= 2),
  J("c1_layer2", (s) => s.stage >= 2 && s.stT > 50),
  J("c1_drone", (s) => n(s, "drone") >= 1),
  J("f1_drone", (s) => n(s, "drone") >= 5, "fact"),
  J("c1_dock", (s) => n(s, "dock") >= 1),
  J("c1_tauris", (s) => did(s, "tauris")),
  J("c1_st3", (s) => s.stage >= 3),
  J("c1_layer3", (s) => s.stage >= 3 && s.stT > 50),
  J("c1_drones20", (s) => n(s, "drone") >= 20),
  J("c1_statite", (s) => n(s, "statite") >= 1),
  J("f1_statite", (s) => n(s, "statite") >= 3, "fact"),
  J("c1_comet", (s) => did(s, "comet")),
  J("c1_st4", (s) => s.stage >= 4),
  J("c1_layer4", (s) => s.stage >= 4 && s.stT > 50),
  J("c1_chthon", (s) => did(s, "chthon")),
  J("c1_typeI", (s) => s.stage >= 5),
];

// ---------- vzorce ----------
export const GEN1 = ["panel", "field", "farm", "statite", "ring"];
/** Vrstva asteroidu = hloubka řezu = stadium. */
export const layerIdx = (s: State) => (s.ch === 1 ? Math.min(s.stage, 4) : 4);
export function oreMult(s: State) {
  let m = Math.pow(T1.layerMult, layerIdx(s)) * Math.pow(T1.refine, n(s, "refine"));
  if (has(s, "spectro")) m *= 2;
  if (has(s, "deepdrill")) m *= 4;
  if (did(s, "belt")) m *= 1.5;
  if (did(s, "comet")) m *= 2;
  return m;
}
export const handMult = (s: State) => Math.pow(T1.hand, n(s, "focus"));
export const richChance = (s: State) => (has(s, "thermo") ? T1.rich[1] : T1.rich[0]);
const BM = Object.fromEntries(BUILD1.map((b) => [b.id, b]));
export function genW(s: State, id: string) {
  let w = BM[id].w! * mile(n(s, id));
  if (id === "panel" && has(s, "cells")) w *= 3;
  if (id === "farm" && has(s, "regolith")) w *= 3;
  if (id === "statite" && has(s, "statites")) w *= 3;
  if (id === "ring" && did(s, "chthon")) w *= 2;
  if (did(s, "tauris")) w *= 1.5;
  return w;
}
const price = (s: State, id: string) => BM[id].c0 * Math.pow(BM[id].g, n(s, id));
export const droneCost = (s: State) => price(s, "drone");
export const dockPeriod = (s: State) => T1.dockPeriod / (1 + 0.6 * Math.max(0, n(s, "dock") - 1));

export const CH1: ChapterDef = {
  id: 1, cur: "ore", view: "body", map: "system", lvl2: 2,
  goals: () => T1.goals,
  build: BUILD1, research: RESEARCH1, missions: MISSIONS1, journal: JOURNAL1,
  power(s) { let P = T1.rtg; for (const id of GEN1) P += n(s, id) * genW(s, id); return P; },
  passive: () => 0,
  dataMult: (s) => (did(s, "kelvar") ? 2 : 1),
  autos(s, dt) {
    // Montážní dok: banka z podílu příjmu rudy, staví drony
    if (n(s, "dock") > 0 && s.auto.dock !== false) {
      s.bank.dock = (s.bank.dock || 0) + RT.rate.ore * (T1.dockShare[0] + T1.dockShare[1] * n(s, "dock")) * dt;
      s.bank.dockT = (s.bank.dockT || 0) + dt;
      const c = droneCost(s);
      if (s.bank.dockT >= dockPeriod(s) && s.bank.dock >= c && s.res.ore >= c) {
        s.bank.dock -= c; s.res.ore -= c; s.b.drone = n(s, "drone") + 1; s.bank.dockT = 0;
        emit("dockdrone");
      }
      s.bank.dock = Math.min(s.bank.dock, c * 2, s.res.ore);
    }
    // Autonomní montáž: banka staví elektrárnu s nejlepším poměrem W / cena
    if (has(s, "assembly") && s.auto.assembly !== false) {
      s.bank.asm = Math.min((s.bank.asm || 0) + RT.rate.ore * T1.asmShare * dt, s.res.ore);
      let best = "", bv = 0;
      for (const id of GEN1) {
        if (s.unl["b_" + id] == null) continue;
        const v = genW(s, id) / price(s, id);
        if (v > bv) { bv = v; best = id; }
      }
      if (best && s.bank.asm >= price(s, best)) {
        const c = price(s, best); s.bank.asm -= c; s.res.ore -= c; s.b[best] = n(s, best) + 1; emit("autobuy", best);
      }
    }
  },
  botValue(s, id) { return GEN1.includes(id) ? genW(s, id) / Math.max(1, CH1.power(s)) : undefined; },
};
