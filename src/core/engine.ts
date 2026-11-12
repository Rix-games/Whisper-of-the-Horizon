// Obecné jádro hry: ceny, nákupy, výzkum, mise, stadia, kapitoly, tick.
// Vzorce kapitol jsou v src/chapters/chN.ts (power, passive, autos…).
import { State, newState, Cur } from "./state";
import { CHAPTERS, BMAP, BUILD, RMAP, RESEARCH, MMAP, MISSIONS, JOURNAL, stagesOf, LAST_CH, stageGoal, chOf } from "./defs";
import { on, emit, RT, n, gain, mile } from "./bus";
import { colCost, salvo } from "../chapters/ch2";

export { on, emit, RT, gain };
export const K = (P: number) => (Math.log10(Math.max(P, 1)) - 6) / 10;
export const chDef = chOf;
export const power = (s: State) => chOf(s).power(s);
export const passive = (s: State) => chOf(s).passive(s);
export function dataRate(s: State) {
  let d = 0;
  for (const b of chOf(s).build) if (b.kind === "data") d += n(s, b.id) * b.d! * mile(n(s, b.id));
  return d * chOf(s).dataMult(s);
}

// ---------- ceny ----------
/** Zdražení za kus a první cena s ladicími kolečky kapitoly (price.k, price.g). */
export function gOf(id: string) { const d = BMAP[id], p = CHAPTERS[d.ch - 1].price; return d.kind === "up" || d.g === 1 || !p ? d.g : d.g + p.g; }
export function c0Of(id: string) { const d = BMAP[id], p = CHAPTERS[d.ch - 1].price; return d.kind === "up" || !p ? d.c0 : d.c0 * p.k; }
export function cost(s: State, id: string, k = 0): number {
  const d = BMAP[id];
  if (d.kind === "swarm") return colCost(s) * salvo(s);
  return c0Of(id) * Math.pow(gOf(id), n(s, id) + k);
}
export function costN(s: State, id: string, cnt: number) {
  const d = BMAP[id];
  const g = gOf(id);
  if (d.kind === "swarm" || g === 1) return cost(s, id) * cnt;
  return (cost(s, id) * (Math.pow(g, cnt) - 1)) / (g - 1);   // geometrický součet
}
export function capOf(s: State, id: string) {
  const d = BMAP[id];
  let m = d.max ?? Infinity;
  if (d.maxAt) m = Math.min(m, d.maxAt(s));
  return m;
}
export const maxed = (s: State, id: string) => n(s, id) >= capOf(s, id);
export function maxAfford(s: State, id: string) {
  const d = BMAP[id], have = s.res[d.cur];
  if (maxed(s, id)) return 0;
  const c = cost(s, id);
  if (have < c) return 0;
  const g = gOf(id);
  if (g === 1 || d.kind === "swarm") return Math.floor(have / c);
  let m = Math.floor(Math.log((have * (g - 1)) / c + 1) / Math.log(g));
  m = Math.min(m, capOf(s, id) - n(s, id));
  return Math.max(0, m);
}
export function unlocked(s: State, id: string) {
  const d = BMAP[id];
  if (d.ch !== s.ch) return false;
  if (s.unl["b_" + id] != null) return true;
  if (d.req(s)) { s.unl["b_" + id] = s.t; emit("unlock", id); return true; }
  return false;
}
export function buy(s: State, id: string, cnt = 1): boolean {
  const d = BMAP[id];
  if (!unlocked(s, id) || maxed(s, id)) return false;
  cnt = Math.min(cnt, capOf(s, id) - n(s, id));
  if (cnt <= 0) return false;
  const c = costN(s, id, cnt);
  if (s.res[d.cur] < c) return false;
  s.res[d.cur] -= c;
  if (d.kind === "swarm") { s.n += salvo(s) * cnt; emit("kol", id, cnt); }
  else s.b[id] = n(s, id) + cnt;
  emit("buy", id, cnt);
  return true;
}

// ---------- výzkum ----------
export function rVisible(s: State, id: string) {
  const r = RMAP[id];
  if (r.ch !== s.ch) return false;
  if (s.unl["r_" + id] != null) return true;
  if (r.req(s)) { s.unl["r_" + id] = s.t; emit("runlock", id); return true; }
  return false;
}
export function doResearch(s: State, id: string) {
  const r = RMAP[id];
  if (!rVisible(s, id) || s.r[id] || s.res.data < r.cost) return false;
  s.res.data -= r.cost; s.r[id] = 1;
  emit("research", id);
  if (r.final) emit("final", id);
  return true;
}

// ---------- mise ----------
export function mVisible(s: State, id: string) {
  const m = MMAP[id];
  if (m.ch !== s.ch) return false;
  if (s.unl["m_" + id] != null) return true;
  if (m.req(s)) { s.unl["m_" + id] = s.t; emit("munlock", id); return true; }
  return false;
}
export function startMission(s: State, id: string) {
  const m = MMAP[id];
  if (s.run || s.mis[id] || !mVisible(s, id) || s.res.energy < m.cost) return false;
  s.res.energy -= m.cost; s.run = { id, left: m.dur, dur: m.dur };
  emit("mstart", id);
  return true;
}

// ---------- kapitoly ----------
export const stageMax = stagesOf;
export const finalReady = (s: State) => s.stage >= stagesOf(s);
/** Archiv dat při přechodu: 2 min výroby minulé kapitoly. */
export function archiveData(s: State) { const g = dataRate(s) * 120; s.res.data += g; return g; }
export function nextChapter(s: State) {
  const P = power(s);
  s.done = Math.max(s.done, s.ch);
  if (s.ch >= LAST_CH) { emit("theend"); return; }
  s.base = P; s.ch++; s.stage = 0; s.chT = 0; s.stT = 0;
  s.res.energy = Math.min(s.res.energy, P * 300);
  chOf(s).onStart?.(s);
  emit("chapter", String(s.ch));
}

// ---------- hlavní krok ----------
export function tick(s: State, dt: number) {
  s.t += dt; s.chT += dt; s.stT += dt;
  const C = chOf(s), P = C.power(s); RT.P = P;
  s.res.energy += P * dt;
  s.res.data += dataRate(s) * dt;
  const ps = C.passive(s);
  if (ps > 0) gain(s, C.cur, ps * dt);
  for (const c of ["ore", "plasma", "sails"] as Cur[]) {   // klouzavý průměr příjmu
    const k = Math.min(1, dt * 0.35);
    RT.rate[c] = RT.rate[c] * (1 - k) + (RT.inc[c] / Math.max(dt, 1e-3)) * k;
    RT.inc[c] = 0;
  }
  C.autos?.(s, dt);
  if (s.run) {
    s.run.left -= dt;
    if (s.run.left <= 0) { const id = s.run.id; s.mis[id] = 1; s.run = null; emit("mdone", id); }
  }
  if (s.stage < stagesOf(s) && C.power(s) >= stageGoal(s)) { s.stage++; s.stT = 0; emit("stage", String(s.stage)); }
  RT.jt -= dt;
  if (RT.jt <= 0) {   // odemykání a deník 2× za s
    RT.jt = 0.5;
    for (const b of C.build) unlocked(s, b.id);
    for (const r of C.research) rVisible(s, r.id);
    for (const m of C.missions) mVisible(s, m.id);
    for (const j of C.journal) {
      if (s.seen["j_" + j.id]) continue;
      if (j.when(s)) { s.seen["j_" + j.id] = 1; s.log.push({ t: s.t, k: j.id, kind: j.kind || "story" }); emit("journal", j.id); break; }
    }
    if (s.log.length > 200) s.log.splice(0, s.log.length - 200);
  }
}

/** Slabý offline přírůstek (jen malé zásoby, max. 10 min). */
export function offline(s: State, sec: number) {
  const el = Math.min(sec, 600);
  if (el < 30) return null;
  const C = chOf(s), out: [string, number][] = [];
  const e = C.power(s) * el * 0.5, d = dataRate(s) * el * 0.5, c = C.passive(s) * el * 0.25;
  s.res.energy += e; out.push(["energy", e]);
  if (d > 0) { s.res.data += d; out.push(["data", d]); }
  if (c > 0) { gain(s, C.cur, c); out.push([C.cur, c]); }
  return { sec: el, out };
}
export const fresh = () => newState();
export { BUILD, RESEARCH, MISSIONS, JOURNAL };
