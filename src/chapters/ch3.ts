// ================= KAPITOLA 3 – DÍRA =================
// Vše, co se ladí v Kap. 3, je v tomto souboru. Simulace jen této kapitoly: CH=3 node /tmp/sim.mjs
// Fyzika: výkon = η · c² · ṁ (akrece). ṁ = hmota disku / doba stékání. Strop = Eddingtonova mez (~10³² W pro 8 M☉),
// nad ni jen výtrysky (Blandford–Znajek). Účinnost η roste s rotací díry z 5,7 % až k 32 %.
import type { State } from "../core/state";
import type { ChapterDef, BDef, RDef, MDef, JDef } from "../core/types";
import { R, ST } from "../core/types";
import { n, has, did, RT } from "../core/bus";
import { count, pct, mass, fixed } from "../core/format";

export const C2 = 8.988e16;
export const PERIOD = 7.3;

/** Ladicí konstanty Kap. 3. */
export const T3 = {
  goals: [3e28, 2.5e29, 4e30, 4e31, 9.5e31, 1.8e32],   // 6 stadií; Eddingtonova mez 1e32, výtrysky ji prolomí
  tau: 30,                    // s – doba, za kterou disk steče do díry (vyhlazení výkonu)
  edd: 1.0e32,                // W – Eddingtonova mez díry 8 M☉
  trap0: 6e11,                // kg/s – jak rychle se plní jedna magnetická past na začátku
  fillUp: 1.6,                // ×plnění za úroveň Silnějšího sběru
  fillT: 10,                  // s – za jak dlouho se past naplní
  period: 7.3,                // s – horká skvrna oběhne disk jednou za puls
  win: [0.32, 0.52],          // rad – polovina okna souzvuku (18°, po výzkumu 30°)
  res: 2,                     // ×výnos při vypuštění v souzvuku se skvrnou
  full: 1.25,                 // ×výnos z plné pasti (přetlak)
  combo: 0.2,                 // +20 % za každý článek řetězu
  comboMax: [8, 12],          // řetěz končí výbuchem disku
  boomS: 30,                  // výbuch disku = energie a data za 30 s výroby
  inj: 0.25,                  // injektor dodá ¼ plnění pasti, stále
  wind: 0.02,                 // lapač zachytí 2 % přítoku (vítr z disku)
  windFloor: 2e9,             // kg/s na lapač i bez přítoku
  ring: 1.12,                 // prstenec lapačů: ×hmota všem lapačům za kus
  spinA: [0, 0.5, 0.7, 0.9, 0.97, 0.99, 0.998],
  spinEta: [0.057, 0.082, 0.104, 0.155, 0.21, 0.264, 0.32],
  jets: 4,                    // výtrysky: ×Eddingtonova mez
  field: 1.25,                // magnetická síť: ×mez za kus
  startMass: 1.5e12, startDisk: 2.5e12,
  energyCapS: 300,
  price: { k: 1, g: 0 },
};

const B = (o: Omit<BDef, "ch">): BDef => ({ ch: 3, ...o });
export const BUILD3: BDef[] = [
  // 1. úroveň – hráč pouští magnetické pasti do disku v souzvuku s horkou skvrnou
  B({ id: "lap", tier: 1, kind: "gen", cur: "mass", c0: 5e11, g: 1.2, req: () => true }),
  B({ id: "clump", tier: 1, kind: "up", cur: "mass", c0: 2e12, g: 5, max: 14, maxAt: (s) => 4 + 2 * s.stage, req: (s) => n(s, "lap") >= 2 }),   // Silnější sběr
  B({ id: "xray", tier: 1, kind: "data", cur: "mass", c0: 1e12, g: 1.45, d: 4e9, req: (s) => n(s, "clump") >= 1 }),
  B({ id: "pool", tier: 1, kind: "up", cur: "mass", c0: 1e13, g: 3.2, max: 5, req: (s) => n(s, "xray") >= 1 && s.hole.hits >= 8 }),   // další past (max 6)
  B({ id: "ring3", tier: 1, kind: "mult", cur: "mass", c0: 3e13, g: 1.6, req: (s) => n(s, "lap") >= 8 && n(s, "pool") >= 1 }),
  // 2. úroveň – automatika: remorkéry hází samy, rotace zvedá účinnost, magnetické pole prorazí mez
  B({ id: "tug", tier: 2, kind: "unit", cur: "mass", c0: 2e15, g: 1.3, req: R("tugs") }),   // akreční injektor
  B({ id: "auto3", tier: 2, kind: "up", cur: "mass", c0: 5e15, g: 2.4, max: 6, maxAt: (s) => traps(s), req: (s) => has(s, "tugs") && n(s, "tug") >= 2 }),   // automatický ventil
  B({ id: "spin", tier: 2, kind: "up", cur: "mass", c0: 4e16, g: 3.6, max: 6, maxAt: (s) => s.stage, req: R("spinup") }),
  B({ id: "field3", tier: 2, kind: "mult", cur: "mass", c0: 2e18, g: 2.2, max: 5, req: R("jets3") }),
];
const Rr = (o: Omit<RDef, "ch">): RDef => ({ ch: 3, ...o });
export const RESEARCH3: RDef[] = [
  Rr({ id: "aim", cost: 1e12, req: (s) => s.hole.perfect >= 5 }),                    // delší předpověď dráhy
  Rr({ id: "qpo", cost: 3e12, req: ST(1) }),                                     // data ×2
  Rr({ id: "tugs", cost: 8e12, req: ST(2), lvl2: true }),                          // remorkéry
  Rr({ id: "guide", cost: 2e13, req: (s) => n(s, "tug") >= 3 }),                 // remorkéry míří do vnitřního prstence
  Rr({ id: "spinup", cost: 5e13, req: ST(3) }),
  Rr({ id: "chain3", cost: 3e13, req: (s) => s.hole.booms >= 2 }),   // delší řetěz                                    // roztáčení díry
  Rr({ id: "jets3", cost: 1.2e14, req: ST(4) }),                                      // výtrysky ×4 mez
  Rr({ id: "beam3", cost: 2e14, req: (s) => s.stage >= 6, final: true }),
];
const M = (o: Omit<MDef, "ch" | "view">): MDef => ({ ch: 3, view: "system", ...o });
export const MISSIONS3: MDef[] = [
  M({ id: "belt3", cost: 2e33, dur: 90, req: () => true, at: [1060, 640] }),                       // pasti ×2
  M({ id: "kelvar3", cost: 3e33, dur: 110, req: ST(1), at: [560, 380] }),                          // data ×2
  M({ id: "tauris3", cost: 4e33, dur: 140, req: ST(2), at: [1150, 330] }),                         // proud z Taurise
  M({ id: "ergo", cost: 5e33, dur: 140, req: ST(3), at: [800, 470] }),                             // η ×1,3 (Penroseův proces)
  M({ id: "star3", cost: 6e34, dur: 160, req: ST(5), at: [380, 700] }),                            // roztržená hvězda: velký proud
];
const J = (id: string, when: (s: State) => boolean, kind?: "fact"): JDef => ({ id, ch: 3, when, kind });
export const JOURNAL3: JDef[] = [
  J("h3_start", () => true),
  J("h3_first", (s) => s.hole.hits >= 1),
  J("f3_isco", (s) => s.hole.perfect >= 1, "fact"),
  J("h3_ten", (s) => s.hole.perfect >= 3),
  J("h3_belt", (s) => did(s, "belt3")),
  J("h3_st1", (s) => s.stage >= 1),
  J("f3_edd", (s) => s.stage >= 1 && s.stT > 90, "fact"),
  J("h3_qpo", (s) => has(s, "qpo")),
  J("h3_kelvar", (s) => did(s, "kelvar3")),
  J("h3_st2", (s) => s.stage >= 2),
  J("h3_tug", (s) => n(s, "tug") >= 1),
  J("h3_boom", (s) => s.hole.booms >= 1),
  J("h3_auto", (s) => n(s, "auto3") >= 1),
  J("h3_tauris", (s) => did(s, "tauris3")),
  J("f3_hawking", (s) => s.stage >= 2 && s.stT > 150, "fact"),
  J("h3_st3", (s) => s.stage >= 3),
  J("h3_spin", (s) => n(s, "spin") >= 1),
  J("f3_cyg", (s) => n(s, "spin") >= 2, "fact"),
  J("h3_ergo", (s) => did(s, "ergo")),
  J("h3_st4", (s) => s.stage >= 4),
  J("h3_flare", (s) => s.hole.flares >= 1),
  J("h3_jets", (s) => has(s, "jets3")),
  J("h3_star", (s) => did(s, "star3")),
  J("f3_tde", (s) => did(s, "star3") && s.stT > 60, "fact"),
  J("h3_st5", (s) => s.stage >= 5),
  J("h3_end", (s) => s.stage >= 6),
];

// ---------- fyzika disku ----------
export const eta = (s: State) => T3.spinEta[Math.min(n(s, "spin"), 6)] * (did(s, "ergo") ? 1.3 : 1);
export const spinA = (s: State) => T3.spinA[Math.min(n(s, "spin"), 6)];
export const eddMax = (s: State) => T3.edd * (has(s, "jets3") ? T3.jets : 1) * Math.pow(T3.field, n(s, "field3"));
/** Přítok do díry (kg/s). */
export const mdot = (s: State) => s.hole.D / T3.tau;
export const holePower = (s: State) => eta(s) * C2 * mdot(s);
/** Plnění jedné pasti (kg/s) a její kapacita (kg). */
export const trapRate = (s: State) => T3.trap0 * Math.pow(T3.fillUp, n(s, "clump")) * (did(s, "belt3") ? 2 : 1);
export const trapCap = (s: State) => trapRate(s) * T3.fillT;
export const traps = (s: State) => 1 + n(s, "pool");
export const win = (s: State) => T3.win[has(s, "aim") ? 1 : 0];
export const comboMax = (s: State) => T3.comboMax[has(s, "chain3") ? 1 : 0];
export const comboMult = (k: number) => 1 + T3.combo * k;
/** Stálé proudy z misí (kg/s). */
export function streams(s: State) {
  let f = 0;
  if (did(s, "tauris3")) f += 0.5 * trapRate(s);
  if (did(s, "star3")) f += 4 * trapRate(s);
  return f;
}
export const injRate = (s: State) => n(s, "tug") * T3.inj * trapRate(s) * (has(s, "guide") ? 1.5 : 1);
/** Kolik hmoty/s zachytí jeden lapač. */
export const lapRate = (s: State) => (T3.wind * mdot(s) + T3.windFloor) * Math.pow(T3.ring, n(s, "ring3"));
/** Přidá hmotu do disku; nad Eddingtonovou mezí záření přebytek odfoukne. Vrací true, když disk vzplanul. */
export function feed(s: State, kg: number) {
  s.hole.D += kg;
  const Dmax = (eddMax(s) * T3.tau) / (eta(s) * C2);
  if (s.hole.D > Dmax) { s.hole.D = Dmax; return true; }
  return false;
}

export const CH3: ChapterDef = {
  id: 3, cur: "mass", view: "star", map: "system", lvl2: 2, price: T3.price,
  goals: () => T3.goals,
  build: BUILD3, research: RESEARCH3, missions: MISSIONS3, journal: JOURNAL3,
  power: holePower,
  passive: (s) => n(s, "lap") * lapRate(s),
  dataMult: (s) => (has(s, "qpo") ? 2 : 1) * (did(s, "kelvar3") ? 2 : 1),
  autos(s, dt) {
    // disk stéká do díry; remorkéry a proudy ho krmí
    s.hole.D -= mdot(s) * dt;
    const f = (injRate(s) + streams(s)) * dt;
    if (f > 0 && feed(s, f)) { RT.flare = (RT.flare || 0) + dt; }
  },
  onStart(s) {
    s.base = 0;   // Aldra zhasla – výkon dává jen disk díry
    s.res.mass = T3.startMass;
    if (!s.hole.D) s.hole.D = T3.startDisk;
  },
  effect(s, id) {
    const lv = n(s, id);
    if (id === "lap") return `+${mass(lapRate(s))}/s za kus`;
    if (id === "clump") return `Plnění pasti ${mass(trapRate(s))}/s → ${mass(trapRate(s) * T3.fillUp)}/s`;
    if (id === "pool") return lv >= 5 ? `Pastí ${traps(s)}` : `Pastí ${traps(s)} → ${traps(s) + 1}`;
    if (id === "ring3") return `Každý lapač zachytí o 12 % víc`;
    if (id === "tug") return `Injektorů ${count(lv)} · +${mass(T3.inj * trapRate(s) * (has(s, "guide") ? 1.5 : 1))}/s za kus`;
    if (id === "auto3") return `Automaticky: ${lv} z ${traps(s)} pastí`;
    if (id === "spin") return `Rotace ${fixed(spinA(s), 3)} → ${fixed(T3.spinA[Math.min(lv + 1, 6)], 3)} · účinnost ${pct(eta(s))} → ${pct(T3.spinEta[Math.min(lv + 1, 6)] * (did(s, "ergo") ? 1.3 : 1))}`;
    if (id === "field3") return `Strop výkonu ×${fixed(T3.field, 2)}`;
    return undefined;
  },
  simStart(s) { s.res.data = 2.3e12; s.res.energy = 4.5e33; },
};
