// ================= KAPITOLA 5 – MÍSTNÍ SKUPINA =================
// Vše, co se ladí v Kap. 5, je v tomto souboru. Simulace jen této kapitoly: CH=5 node /tmp/sim.mjs
// Satelitní galaxie obíhají Mléčnou dráhu. V pericentru z nich slapy trhají hvězdy do proudů (surovina Hvězdné proudy).
// Z proudů se staví roje kolem hvězd Mléčné dráhy (výkon) a světlo vytržených hvězd se přičítá k výkonu.
import type { State } from "../core/state";
import type { ChapterDef, BDef, RDef, MDef, JDef } from "../core/types";
import { R, ST } from "../core/types";
import { n, has, did, gain, emit } from "../core/bus";
import { count, pct, num } from "../core/format";
import { capture as capture4, L_SUN } from "./ch4";

/** Ladicí konstanty Kap. 5. */
export const T5 = {
  goals: [1.2, 1.7, 2.5, 3.5, 5.8, 9],   // cíle stadií jako násobek výkonu Mléčné dráhy na startu (≈ 5·10³⁶ W → 3·10³⁷ W, K 3,07 → 3,15)
  swarm: 1.06,                // každý roj z proudů: zachycené světlo ×1,06
  capMax: 0.9,
  H: 0.02,                    // ruční sklizeň: podíl zbylých hvězd za s v pericentru (× slapy)
  relay: 0.5,                 // relé sklízí poloviční rychlostí
  peri: 0.03,                 // bonus za průlet nejbližším bodem při ruční sklizni (podíl zbylých hvězd)
  merge: 0.6,                 // splynutí: z proudů se zachytí 60 % zbylých hvězd (× grip – velké galaxie splynou celé), světlo všech
  gone: 0.06,                 // pod 6 % zbylých hvězd je galaxie pohlcená
  mergeR: 1.05,               // pericentrum uvnitř disku (v poloměrech Mléčné dráhy) = splynutí
  zone: [0.2, 0.05],          // okno sklizně: nejbližších 20 % (+5 %/úroveň) rozpětí mezi pericentrem a apocentrem
  speed: 1.15,                // úhlová rychlost dráhy = speed·a^−1,5 rad/s
  tail: 0.002,                // proudy kolem Mléčné dráhy dávají pasivně za s 0,2 % hvězd v proudech (× sklizeň × (1 + Proudy v halu))
  pilotT: 7,                  // navaděč upraví jednu dráhu každých 7 s / počet navaděčů
  pilotQ: 1.3,                // cílové pericentrum navaděče
  energyCapS: 300,
  startStreams: 0,
  price: { k: 1, g: 0 },
};

// ---------- satelitní galaxie (hmota hvězd v M☉, d = skutečná vzdálenost v tisících světelných let) ----------
export interface SatDef { id: string; m: number; d: number; a: number; e: number; w: number; M0: number; st: number; kind: "d" | "c" | "m33" | "m31"; sz: number; mis?: string; }
const S = (id: string, m: number, d: number, a: number, e: number, w: number, st: number, kind: SatDef["kind"] = "d", sz = 0, M0 = (w * 1.7) % 6.28, mis?: string): SatDef =>
  ({ id, m, d, a, e, w, M0, st, kind, sz: sz || Math.round(22 + 7 * Math.log10(m / 1e5 + 1)), mis });
export const SATS: SatDef[] = [
  S("sgr", 1.5e7, 70, 1.6, 0.26, 2.4, 0),
  S("dra", 3e5, 250, 2.7, 0.48, 1.0, 0),
  S("umi", 3e5, 250, 2.8, 0.4, 5.4, 0),
  S("scl", 2.3e6, 280, 2.95, 0.45, 4.0, 0),
  S("sex", 5e5, 280, 2.9, 0.3, 1.9, 1),
  S("car", 4e5, 330, 3.1, 0.45, 5.9, 1),
  S("fnx", 2e7, 480, 3.4, 0.35, 3.0, 1),
  S("leo2", 7e5, 760, 3.8, 0.3, 0.6, 1),
  S("leo1", 5.5e6, 830, 3.9, 0.3, 0.2, 1),
  S("cvn", 2.3e5, 710, 3.75, 0.35, 1.4, 1),
  S("lmc", 2.7e9, 160, 2.4, 0.3, 4.6, 2, "c", 64, 1.2, "mag"),
  S("smc", 4.6e8, 200, 2.6, 0.35, 4.95, 2, "c", 44, 1.5, "mag"),
  S("phx", 7.7e5, 1400, 3.95, 0.3, 3.9, 3),
  S("leoa", 6e6, 2600, 4.1, 0.25, 0.9, 3),
  S("wlm", 4.3e7, 3000, 4.25, 0.2, 3.5, 3),
  S("n6822", 1e8, 1600, 4.2, 0.25, 2.6, 3),
  S("ic1613", 1e8, 2400, 4.3, 0.2, 5.6, 3),
  S("peg", 6.6e6, 3000, 4.2, 0.28, 5.1, 3),
  S("m33", 5e9, 2700, 3.9, 0.44, 3.77, 4, "m33", 74, Math.PI, "tri"),
  S("m31", 1e11, 2500, 4.4, 0.6, 2.65, 5, "m31", 240, Math.PI),
];
export const SMAP: Record<string, SatDef> = Object.fromEntries(SATS.map((d) => [d.id, d]));
export const satOn = (s: State, d: SatDef) => s.stage >= d.st && (!d.mis || did(s, d.mis));
export const live = (s: State, d: SatDef) => satOn(s, d) && sat(s, d).g === 0;
export function sat(s: State, d: SatDef) {
  let o = s.sat[d.id];
  if (!o) o = s.sat[d.id] = { e: d.e, M: d.M0, st: 1, g: 0 };
  return o;
}
/** Poloha na dráze v poloměrech Mléčné dráhy (r = vzdálenost od středu). */
export function orbit(d: SatDef, e: number, M: number) {
  let E = M;
  for (let i = 0; i < 6; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  const x = d.a * (Math.cos(E) - e), y = d.a * Math.sqrt(1 - e * e) * Math.sin(E), c = Math.cos(d.w), sn = Math.sin(d.w);
  return { x: x * c - y * sn, y: x * sn + y * c, r: d.a * (1 - e * Math.cos(E)) };
}
export const qOf = (d: SatDef, e: number) => d.a * (1 - e);
export const zoneK = (s: State) => T5.zone[0] + T5.zone[1] * n(s, "wide5");
export function inPeri(s: State, d: SatDef) { const o = sat(s, d), p = orbit(d, o.e, o.M), q = qOf(d, o.e); return p.r < q + (2 * d.a * o.e) * zoneK(s) + 0.08; }
/** Síla slapů podle pericentra: blíž = víc hvězd za průlet. */
export const tid = (q: number) => Math.max(0.4, Math.min(3, Math.pow(1.7 / q, 2)));
export const joined = (s: State) => SATS.filter((d) => s.sat[d.id] && s.sat[d.id].g > 0).length;
/** Galaxie, ze kterých už vede slapový proud (sklizené aspoň trochu nebo pohlcené). */
export const tapped = (s: State) => SATS.filter((d) => s.sat[d.id] && (s.sat[d.id].g > 0 || s.sat[d.id].st < 0.98)).length;
export const absorbedM = (s: State) => SATS.reduce((a, d) => a + (s.sat[d.id] && s.sat[d.id].g > 0 ? d.m : 0), 0);

/** Kolik suroviny dá jedna vytržená hvězda (M☉). */
export function yieldMult(s: State) {
  let y = 1 + 0.5 * n(s, "net5");
  if (has(s, "tide5")) y *= 2;
  if (has(s, "maps5")) y *= 1.5;
  if (has(s, "bridge5")) y *= 2;
  if (did(s, "sgrs")) y *= 1.5;
  if (did(s, "mag")) y *= 2;
  return y;
}
export function cap5(s: State) {
  let c = (s.prog.c5 || 0.16) * Math.pow(T5.swarm, n(s, "swarm5"));
  if (has(s, "halo5")) c *= 1.25;
  if (did(s, "smith")) c *= 1.2;
  if (did(s, "gss")) c *= 1.2;
  return Math.min(T5.capMax, c);
}
/** Světlo hvězd vytržených do proudů (v L☉). */
export const lumK = (s: State) => (has(s, "young5") ? 3 : 1);
export const streamL = (s: State) => (s.prog.S5 || 0) * lumK(s);
export const relayRate = (s: State) => T5.relay * (has(s, "relay2") ? 2 : 1);
export const tailRate = (s: State) => T5.tail * (s.prog.S5 || 0) * yieldMult(s) * (1 + n(s, "tails5")) * (did(s, "void5") ? 2 : 1);

/** Vytrhne hvězdy z galaxie: dm M☉ (podíl k ze zbylých). Vrátí získanou surovinu. */
/** Hmotné galaxie drží hvězdy pevněji: podíl za průlet klesá s hmotou (LMC, Trojúhelník i Andromeda ~30× pomaleji než malé). */
export const grip = (m: number) => Math.min(1, Math.max(0.03, Math.pow(2e7 / m, 0.7)));
export function rip(s: State, d: SatDef, k: number) {
  const o = sat(s, d), dm = d.m * o.st * Math.min(1, k * grip(d.m));
  o.st -= dm / d.m;
  const g = dm * yieldMult(s);
  gain(s, "streams", g); s.prog.S5 = (s.prog.S5 || 0) + dm;   // S5 = hvězdy vytržené do proudů (světlo)
  if (o.st < T5.gone) absorb(s, d, 1);
  return g;
}
/** Galaxie pohlcena (how 1) nebo splynula (how 2). Zbylé hvězdy přidají světlo. */
export function absorb(s: State, d: SatDef, how: 1 | 2) {
  const o = sat(s, d);
  if (o.g) return 0;
  const rest = d.m * o.st;
  let g = 0;
  if (how === 2) { g = rest * T5.merge * grip(d.m) * yieldMult(s); gain(s, "streams", g); }   // velká galaxie splyne celá, do proudů jde jen okraj
  s.prog.S5 = (s.prog.S5 || 0) + rest;
  o.st = 0; o.g = how;
  emit(how === 2 ? "merge5" : "absorb5", d.id, g);
  return g;
}
/** Nejvyšší výstřednost – Andromeda nesmí splynout dřív než ve finále. */
export const eMax = (d: SatDef) => (d.kind === "m31" ? 1 - 1.3 / d.a : 0.92);
/** Nová výstřednost (prak / navaděč) se zachováním směru na dráze. */
export function setE(s: State, d: SatDef, ne: number) {
  const o = sat(s, d);
  ne = Math.min(ne, eMax(d));
  let E = o.M; for (let i = 0; i < 6; i++) E -= (E - o.e * Math.sin(E) - o.M) / (1 - o.e * Math.cos(E));
  const nu = 2 * Math.atan2(Math.sqrt(1 + o.e) * Math.sin(E / 2), Math.sqrt(1 - o.e) * Math.cos(E / 2));
  const E2 = 2 * Math.atan2(Math.sqrt(1 - ne) * Math.sin(nu / 2), Math.sqrt(1 + ne) * Math.cos(nu / 2));
  o.e = ne; o.M = E2 - ne * Math.sin(E2);
}
/** Běhové (neukládané) hodnoty: kdo má relé, kdy naposledy průlet, záblesky. */
export const RT5 = { relays: [] as string[], pilotT: 0, pilot: "" as string, pilotFx: 0, harvest: {} as Record<string, number>, prevR: {} as Record<string, number>, prevDr: {} as Record<string, number> };

const B = (o: Omit<BDef, "ch">): BDef => ({ ch: 5, ...o });
export const BUILD5: BDef[] = [
  // 1. úroveň – hráč sklízí v pericentru a prakem mění dráhy
  B({ id: "swarm5", tier: 1, kind: "mult", cur: "streams", c0: 2e6, g: 1.68, maxAt: (s) => (cap5(s) >= T5.capMax ? n(s, "swarm5") : 5 + 5 * s.stage), req: () => true }),   // na stropu zachycení už další roje nic nepřidají
  B({ id: "net5", tier: 1, kind: "up", cur: "streams", c0: 4e6, g: 3.2, max: 8, maxAt: (s) => 2 + s.stage, req: (s) => n(s, "swarm5") >= 2 }),
  B({ id: "obs5", tier: 1, kind: "data", cur: "streams", c0: 6e6, g: 1.3, d: 2e13, req: (s) => n(s, "net5") >= 1 }),
  B({ id: "wide5", tier: 1, kind: "up", cur: "streams", c0: 2e7, g: 3.5, max: 5, maxAt: (s) => 1 + s.stage, req: (s) => tapped(s) >= 2 && n(s, "obs5") >= 1 }),
  // 2. úroveň – automatika: relé sklízejí samy, proudy dávají surovinu samy, navaděče srovnávají dráhy
  B({ id: "relay5", tier: 2, kind: "auto", cur: "streams", c0: 5e8, g: 1.9, maxAt: (s) => Math.max(1, SATS.filter((d) => live(s, d)).length), req: R("relays5") }),
  B({ id: "tails5", tier: 2, kind: "up", cur: "streams", c0: 2e9, g: 2.4, max: 8, maxAt: (s) => s.stage, req: R("tails5r") }),
  B({ id: "pilot5", tier: 2, kind: "auto", cur: "streams", c0: 5e9, g: 2.2, max: 6, req: R("pilots5") }),
  B({ id: "radio5", tier: 2, kind: "data", cur: "streams", c0: 3e9, g: 1.3, d: 4e14, req: (s) => s.stage >= 3 && n(s, "relay5") >= 2 }),
];
const Rr = (o: Omit<RDef, "ch">): RDef => ({ ch: 5, ...o });
export const RESEARCH5: RDef[] = [
  Rr({ id: "tide5", cost: 3e16, req: (s) => s.chT > 60 }),                                // sklizeň ×2
  Rr({ id: "maps5", cost: 1.2e17, req: (s) => tapped(s) >= 3 }),                            // sklizeň ×1,5
  Rr({ id: "relays5", cost: 4e17, req: ST(2), lvl2: true }),                              // relé
  Rr({ id: "tails5r", cost: 1e18, req: (s) => s.stage >= 2 && tapped(s) >= 6 }),         // Hvězdné proudy (pasivně)
  Rr({ id: "halo5", cost: 2e18, req: ST(3) }),                                            // zachycení ×1,5
  Rr({ id: "pilots5", cost: 4e18, req: (s) => s.stage >= 3 && n(s, "relay5") >= 3 }),    // navaděče
  Rr({ id: "young5", cost: 1e19, req: ST(4) }),                                         // světlo proudů ×3
  Rr({ id: "relay2", cost: 2e19, req: (s) => s.stage >= 4 && n(s, "relay5") >= 6 }),      // relé ×2
  Rr({ id: "bridge5", cost: 4e19, req: ST(5) }),                                          // sklizeň ×2
  Rr({ id: "mw31", cost: 1e19, req: ST(6), final: true }),
];
const M = (o: Omit<MDef, "ch" | "view">): MDef => ({ ch: 5, view: "group", ...o });
export const MISSIONS5: MDef[] = [
  M({ id: "sgrs", cost: 6e38, dur: 90, at: [470, 330], req: (s) => s.chT > 90 }),                    // sklizeň ×1,5
  M({ id: "leot", cost: 1e39, dur: 110, at: [250, 230], req: ST(1) }),                                // data ×2
  M({ id: "smith", cost: 1.5e39, dur: 120, at: [770, 640], req: (s) => s.stage >= 1 && s.stT > 150 }), // zachycení ×1,2
  M({ id: "mag", cost: 2e39, dur: 120, at: [380, 760], req: ST(2) }),                                 // Magellanova mračna na dráze, sklizeň ×2
  M({ id: "bary", cost: 2.5e39, dur: 140, at: [930, 400], req: ST(3) }),                               // data ×2 (příběh)
  M({ id: "tri", cost: 3e39, dur: 150, at: [1085, 790], req: (s) => s.stage >= 3 && s.stT > 120 }),   // M33 na dráze
  M({ id: "void5", cost: 4e39, dur: 150, at: [300, 520], req: ST(4) }),                              // proudy ×2
  M({ id: "gss", cost: 6e39, dur: 160, at: [1180, 330], req: (s) => s.stage >= 4 && s.stT > 120 }),   // zachycení ×1,3
  M({ id: "and", cost: 8e39, dur: 160, at: [1250, 250], req: (s) => s.stage >= 5 && s.stT > 60 }),     // data ×2 (jádro Andromedy)
];
const J = (id: string, when: (s: State) => boolean, kind?: "fact"): JDef => ({ id, ch: 5, when, kind });
export const JOURNAL5: JDef[] = [
  J("g_start", () => true),
  J("g_first", (s) => (s.prog.S5 || 0) > 0),
  J("f_sgr", (s) => s.chT > 100, "fact"),
  J("g_join", (s) => joined(s) >= 1),
  J("g_sling", (s) => (s.prog.sl5 || 0) >= 1),
  J("g_sgrs", (s) => did(s, "sgrs")),
  J("g_st1", (s) => s.stage >= 1),
  J("f_dm", (s) => s.stage >= 1 && s.stT > 200, "fact"),
  J("g_leot", (s) => did(s, "leot")),
  J("g_five", (s) => tapped(s) >= 5),
  J("g_smith", (s) => did(s, "smith")),
  J("g_st2", (s) => s.stage >= 2),
  J("g_lmc", (s) => !!s.sat.lmc && s.sat.lmc.st < 0.9),
  J("g_relay", (s) => n(s, "relay5") >= 1),
  J("g_mag", (s) => did(s, "mag")),
  J("g_tails", (s) => n(s, "tails5") >= 1),
  J("g_st3", (s) => s.stage >= 3),
  J("g_bary", (s) => did(s, "bary")),
  J("g_pilot", (s) => n(s, "pilot5") >= 1),
  J("f_m33", (s) => s.stage >= 3 && s.stT > 240, "fact"),
  J("g_tri", (s) => did(s, "tri")),
  J("g_st4", (s) => s.stage >= 4),
  J("g_ten", (s) => tapped(s) >= 10),
  J("g_void", (s) => did(s, "void5")),
  J("g_gss", (s) => did(s, "gss")),
  J("g_st5", (s) => s.stage >= 5),
  J("f_m31", (s) => s.stage >= 5 && s.stT > 120, "fact"),
  J("g_and", (s) => did(s, "and")),
  J("g_m31h", (s) => !!s.sat.m31 && s.sat.m31.st < 0.97),
  J("g_st6", (s) => s.stage >= 6),
];

export const CH5: ChapterDef = {
  id: 5, cur: "streams", view: "group", map: "group", lvl2: 2, price: T5.price,
  goals: (s) => T5.goals.map((g) => g * (s.prog.P5 || s.base)),
  build: BUILD5, research: RESEARCH5, missions: MISSIONS5, journal: JOURNAL5,
  power: (s) => L_SUN * cap5(s) * ((s.prog.L5 || 0) + streamL(s)),
  passive: tailRate,
  dataMult: (s) => (did(s, "leot") ? 2 : 1) * (did(s, "bary") ? 2 : 1) * (did(s, "and") ? 2 : 1),
  autos(s, dt) {
    // dráhy, splynutí, relé a navaděče běží v jádru (i když je karta skrytá)
    const L = SATS.filter((d) => live(s, d));
    for (const d of L) {
      const o = sat(s, d);
      o.M += T5.speed * Math.pow(d.a, -1.5) * dt;
      if (o.M > 6.2832) o.M -= 6.2832;
      const p = orbit(d, o.e, o.M);
      if (p.r < T5.mergeR) { absorb(s, d, 2); continue; }
    }
    // relé: na nejhmotnějších galaxiích, sklízí v pericentru
    const nr = n(s, "relay5");
    RT5.relays = nr ? L.filter((d) => sat(s, d).g === 0).sort((a, b) => b.m * sat(s, b).st - a.m * sat(s, a).st).slice(0, nr).map((d) => d.id) : [];
    for (const id of RT5.relays) {
      const d = SMAP[id], o = sat(s, d);
      if (o.g || !inPeri(s, d) || RT5.harvest[id] > 0) continue;   // ručně sklízená galaxie: relé nepřidává
      rip(s, d, T5.H * relayRate(s) * tid(qOf(d, o.e)) * dt);
    }
    // navaděče: postupně srovnávají dráhy na výhodné pericentrum (nikdy ne do splynutí)
    const np = n(s, "pilot5");
    if (np && (RT5.pilotT -= dt) <= 0) {
      RT5.pilotT = T5.pilotT / np;
      let best: SatDef | null = null, bv = 0;
      for (const d of L) {
        const o = sat(s, d); if (o.g) continue;
        const et = Math.max(0.05, Math.min(0.9, 1 - T5.pilotQ / d.a)), gap = Math.abs(o.e - et);
        if (gap > 0.02 && d.m * o.st * gap > bv) { bv = d.m * o.st * gap; best = d; }
      }
      if (best) {
        const o = sat(s, best), et = Math.max(0.05, Math.min(0.9, 1 - T5.pilotQ / best.a));
        setE(s, best, o.e + Math.sign(et - o.e) * Math.min(0.06, Math.abs(et - o.e)));
        RT5.pilot = best.id; RT5.pilotFx = 1.2;
      }
    }
    RT5.pilotFx = Math.max(0, RT5.pilotFx - dt);
    // finále: po výzkumu Mlékomeda Andromeda za 6 s splyne s Mléčnou dráhou
    if (s.r.mw31 && sat(s, SMAP.m31).g === 0 && (s.prog.fin5 = (s.prog.fin5 || 0) + dt) > 6) absorb(s, SMAP.m31, 2);
    for (const k in RT5.harvest) RT5.harvest[k] = Math.max(0, RT5.harvest[k] - dt);
  },
  onStart(s) {
    s.prog.c5 = Math.max(0.02, capture4(s));
    s.prog.L5 = s.base / (L_SUN * s.prog.c5);   // hvězdy Mléčné dráhy (L☉), jejichž světlo už roje zachytávají
    s.prog.P5 = s.base;
    s.res.streams = T5.startStreams;
    s.res.data = Math.min(s.res.data, 3e16);
    s.res.energy = Math.min(s.res.energy, s.base * T5.energyCapS);
    for (const d of SATS) sat(s, d);
  },
  effect(s, id) {
    const lv = n(s, id), x = (v: number) => (Math.round(v * 10) / 10).toString().replace(".", ",") + "×";
    if (id === "swarm5") return `Zachycené světlo ${pct(cap5(s))} → ${pct(Math.min(T5.capMax, cap5(s) * T5.swarm))}`;
    if (id === "net5") return `Sklizeň ${x(1 + 0.5 * lv)} → ${x(1 + 0.5 * (lv + 1))}`;
    if (id === "wide5") return `Okno sklizně ${pct(T5.zone[0] + T5.zone[1] * lv)} dráhy → ${pct(T5.zone[0] + T5.zone[1] * (lv + 1))}`;
    if (id === "relay5") return !lv ? "První relé začne sklízet samo" : `${lv} relé ${lv === 1 ? "sklízí samo" : lv < 5 ? "sklízejí sama" : "sklízí samo"} · další na ${lv + 1}. galaxii`;
    if (id === "tails5") return `+${num(tailRate(s) / (1 + lv))} M☉/s z proudů kolem galaxie`;
    if (id === "pilot5") return !lv ? "Navaděč začne srovnávat dráhy" : `Dráhy srovnává ${lv}× rychleji → ${lv + 1}×`;
    return undefined;
  },
  botValue(s, id) {
    if (id === "swarm5") return 0.3;
    if (id === "relay5") return 0.6;
    if (id === "tails5") return 0.5;
    return undefined;
  },
  simStart(s) {
    s.base = 5.2e36; s.res.data = 3e16; s.res.energy = 5.2e36 * 300;
    s.b.swarm3 = 30; s.r.dyson3 = 1; s.r.halo = 1; s.r.jets = 1;   // zachycení Kap. 4 na maximu
  },
};
