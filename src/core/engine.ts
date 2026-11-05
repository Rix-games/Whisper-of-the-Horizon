// Čistá herní logika bez prohlížeče. Dá se spustit v Node (simulace) i na mobilu.
import {
  B, BUILDING_IDS, EVENTS, EVENT_IDS, FACTS, L, R, RESOURCES, RULES, STORY,
  type Amounts, type BuildingId, type EventId, type LocationId, type Res, type ResearchId,
} from './defs.js';
import type { State } from './state.js';

type Rates = Record<Res, number>;
export const DYSON_BOOST = 1.1;
// převodníky; u taveb výzkum zvyšuje propustnost (vstup i výstup), u laboratoří účinnost
export const CONVERTERS: BuildingId[] = ['smelter', 'forge', 'lab', 'qcomp', 'replicator'];
const CONVERTER_SCALES: Partial<Record<BuildingId, boolean>> = { smelter: true, forge: true };
const zeroRates = (): Rates => ({ ore: 0, metal: 0, energy: 0, data: 0 });

/** Násobič výkonu budovy ze všech výzkumů, míst a roje. */
export function mult(s: State, id: BuildingId): number {
  const r = s.r, v = s.visited;
  let m = 1;
  switch (id) {
    case 'drone': if (r.swarm) m *= 2; if (r.swarm2) m *= 3; if (r.nano) m *= 4; break;
    case 'drill': if (r.swarm2) m *= 3; if (r.nano) m *= 4; break;
    case 'catcher': if (r.nano) m *= 4; break;
    case 'smelter': if (r.arc) m *= 2; if (r.induct) m *= 4; break;
    case 'forge': if (r.plasma) m *= 3; if (r.nano) m *= 4; if (r.induct) m *= 4; break;
    case 'lab': if (r.lab2) m *= 2; if (v.moon) m *= 1.5; if (r.cryo) m *= 3; if (r.supercond) m *= 2; if (r.quantum) m *= 4; break;
    case 'replicator': if (r.nano) m *= 3; break;
  }
  if (B[id].prod?.energy) {
    if (id === 'solar' && r.thinfilm) m *= 2;
    if (id === 'mirror' && r.optics) m *= 3;
    if (id === 'dyson' && r.statite) m *= 2;
    if (id === 'dyson' && r.beam) m *= 2;
    if (id === 'dyson' && r.lagrange) m *= 2;
    if (v.giant) m *= 2;
    if (r.supercond) m *= 2;
    m *= Math.pow(DYSON_BOOST, s.b.dyson);
  }
  return m;
}

export function baseOreRate(s: State): number {
  return (['drone', 'drill', 'catcher'] as BuildingId[]).reduce((a, id) => a + s.b[id] * B[id].prod!.ore! * mult(s, id), 0);
}

export function clickPower(s: State): number {
  let p = 1;
  if (s.r.vib) p *= 3;
  if (s.r.vib2) p *= 5;
  if (s.r.resonance) p += baseOreRate(s) * 0.05;
  return p;
}

export function reactorW(s: State): number {
  return RULES.baseReactorW * (s.r.supercond ? 2 : 1);
}

/** Hrubá výroba energie ve W – z ní se počítá Kardaševovo číslo. */
export function powerW(s: State): number {
  let w = reactorW(s);
  for (const id of BUILDING_IDS) {
    const e = B[id].prod?.energy;
    if (e && s.b[id]) w += e * s.b[id] * mult(s, id);
  }
  return w;
}

export function kardashev(s: State): number {
  return (Math.log10(Math.max(1, powerW(s))) - 6) / 10;
}

/** Výroba a spotřeba za sekundu při poslední známé účinnosti převodníků. */
export function rates(s: State): { p: Rates; c: Rates } {
  const p = zeroRates(), c = zeroRates();
  p.energy += reactorW(s);
  for (const id of BUILDING_IDS) {
    const d = B[id], n = s.b[id];
    if (!n) continue;
    const e = d.cons ? (s.off[id] ? 0 : (s.eff[id] ?? 1)) : 1;
    const m = mult(s, id);
    for (const r of Object.keys(d.prod ?? {}) as Res[]) p[r] += d.prod![r]! * n * m * e;
    // převodníky: výzkum zvyšuje propustnost, takže roste i spotřeba (zachování hmoty)
    for (const r of Object.keys(d.cons ?? {}) as Res[]) c[r] += d.cons![r]! * n * (CONVERTER_SCALES[id] ? m : 1) * e;
  }
  if (s.r.auto) p.ore += clickPower(s) * RULES.autoClicksPerSec;
  return { p, c };
}

/** Násobek spotřeby převodníku: tavírny s výzkumem zpracují víc rudy, laboratoře jen zlepšují účinnost. */
export function consScale(s: State, id: BuildingId): number { return CONVERTER_SCALES[id] ? mult(s, id) : 1; }

/** Rozpis jednoho zdroje: kdo kolik vyrábí a kdo kolik spotřebuje (za sekundu). Klíče jsou id budov, 'reactor' a 'auto'. */
export function rateParts(s: State, r: Res): { prod: [string, number][]; cons: [string, number][] } {
  const prod: [string, number][] = [], cons: [string, number][] = [];
  if (r === 'energy') prod.push(['reactor', reactorW(s)]);
  for (const id of BUILDING_IDS) {
    const d = B[id], n = s.b[id];
    if (!n) continue;
    const e = d.cons ? (s.off[id] ? 0 : (s.eff[id] ?? 1)) : 1;
    const m = mult(s, id);
    const pv = d.prod?.[r], cv = d.cons?.[r];
    if (pv) prod.push([id, pv * n * m * e]);
    if (cv) cons.push([id, cv * n * (CONVERTER_SCALES[id] ? m : 1) * e]);
  }
  if (r === 'ore' && s.r.auto) prod.push(['auto', clickPower(s) * RULES.autoClicksPerSec]);
  return { prod, cons };
}

function add(s: State, r: Res, v: number) { s.res[r] += v; s.total[r] += v; }

export function cost(s: State, id: BuildingId, n = s.bought[id] ?? Math.floor(s.b[id])): Amounts {
  const d = B[id], o: Amounts = {};
  for (const r of Object.keys(d.base) as Res[]) o[r] = d.base[r]! * Math.pow(d.growth, n);
  return o;
}
export function affordable(s: State, c: Amounts): boolean {
  return (Object.keys(c) as Res[]).every((r) => s.res[r] >= c[r]!);
}
function pay(s: State, c: Amounts) { for (const r of Object.keys(c) as Res[]) s.res[r] -= c[r]!; }

export function isUnlocked(s: State, id: BuildingId) { return B[id].unlock(s); }

/** Postaví 1 kus, nebo co nejvíc (max). Vrací počet. */
export function buy(s: State, id: BuildingId, max = false): number {
  if (!isUnlocked(s, id)) return 0;
  let k = 0;
  while (k < (max ? 10000 : 1)) {
    const c = cost(s, id);
    if (!affordable(s, c)) break;
    pay(s, c); s.b[id] += 1; s.bought[id] = (s.bought[id] ?? 0) + 1; k++;
  }
  return k;
}

/** Cena a počet při nákupu "max" bez změny stavu. */
export function previewMax(s: State, id: BuildingId): { count: number; total: Amounts } {
  const res = { ...s.res }; let n = s.bought[id] ?? Math.floor(s.b[id]); let count = 0; const total: Amounts = {};
  while (count < 10000) {
    const c = cost(s, id, n);
    if (!(Object.keys(c) as Res[]).every((r) => res[r] >= c[r]!)) break;
    for (const r of Object.keys(c) as Res[]) { res[r] -= c[r]!; total[r] = (total[r] ?? 0) + c[r]!; }
    n++; count++;
  }
  return { count, total };
}

export function researchAvailable(s: State, id: ResearchId) { return !s.r[id] && (!R[id].req || R[id].req!(s)); }
export function doResearch(s: State, id: ResearchId): boolean {
  if (!researchAvailable(s, id) || !affordable(s, R[id].cost)) return false;
  pay(s, R[id].cost); s.r[id] = true; return true;
}

export function travelTime(_s: State, id: LocationId) { return L[id].time; }
export function canTravel(s: State, id: LocationId) {
  return !!s.r.scan && !s.travel && id !== 'belt' && !s.visited[id] && s.res.energy >= L[id].cost;
}
export function depart(s: State, id: LocationId): boolean {
  if (!canTravel(s, id)) return false;
  s.res.energy -= L[id].cost;
  s.travel = { from: s.loc, to: id, t: 0, total: id === 'belt' ? 8 : travelTime(s, id) };
  return true;
}

export function eventReward(s: State, id: EventId): number {
  const ev = EVENTS[id];
  const { p } = rates(s);
  return Math.max(ev.min, p[ev.res] * ev.seconds);
}
export function claimEvent(s: State): { id: EventId; amount: number } | null {
  if (!s.event) return null;
  const id = s.event.id, amount = eventReward(s, id);
  add(s, EVENTS[id].res, amount);
  s.event = null;
  s.nextEvent = RULES.eventEverySec[0] + Math.random() * (RULES.eventEverySec[1] - RULES.eventEverySec[0]);
  return { id, amount };
}

export function mine(s: State): number {
  const p = clickPower(s); add(s, 'ore', p); s.clicks++; return p;
}

/** Jeden krok simulace. Vrací nové záznamy deníku (klíče) pro zobrazení. */
export function tick(s: State, dt: number, rng: () => number = Math.random): string[] {
  // výrobci
  add(s, 'energy', reactorW(s) * dt);
  for (const id of BUILDING_IDS) {
    const d = B[id], n = s.b[id];
    if (!n || d.cons) continue;
    const m = mult(s, id);
    if (d.prod) for (const r of Object.keys(d.prod) as Res[]) add(s, r, d.prod[r]! * n * m * dt);
    if (d.makes) s.b[d.makes.building] += d.makes.rate * Math.floor(n) * m * dt;
  }
  if (s.r.auto) add(s, 'ore', clickPower(s) * RULES.autoClicksPerSec * dt);
  // převodníky s účinností podle dostupnosti vstupu
  for (const id of CONVERTERS) {
    const d = B[id], n = s.b[id];
    if (!n || s.off[id]) { s.eff[id] = n ? 0 : 1; continue; }
    const m = mult(s, id), throughput = CONVERTER_SCALES[id] ? m : 1;
    let e = 1;
    for (const r of Object.keys(d.cons!) as Res[]) {
      const need = d.cons![r]! * n * throughput * dt;
      if (need > 0) e = Math.min(e, s.res[r] / need);
    }
    e = Math.max(0, Math.min(1, e));
    for (const r of Object.keys(d.cons!) as Res[]) s.res[r] -= d.cons![r]! * n * throughput * dt * e;
    for (const r of Object.keys(d.prod ?? {}) as Res[]) add(s, r, d.prod![r]! * n * m * dt * e);
    if (d.makes) s.b[d.makes.building] += d.makes.rate * Math.floor(n) * m * dt * e; // replikátor staví podle dostupné energie
    s.eff[id] = e;
  }
  // let
  if (s.travel) {
    s.travel.t += dt;
    // expedice: po příletu se bonus zapíše natrvalo a Vesper se vrátí k platformě
    if (s.travel.t >= s.travel.total) { s.visited[s.travel.to] = true; s.loc = 'belt'; s.travel = null; }
  }
  // události
  if (s.event) {
    s.event.ttl -= dt;
    if (s.event.ttl <= 0) { s.event = null; s.nextEvent = RULES.eventEverySec[0]; }
  } else {
    s.nextEvent -= dt;
    if (s.nextEvent <= 0) {
      const ok = EVENT_IDS.filter((id) => EVENTS[id].unlock(s));
      if (ok.length) s.event = { id: ok[Math.floor(rng() * ok.length)], ttl: RULES.eventTtlSec };
      else s.nextEvent = 90; // první událost přijde chvíli po odemčení
    }
  }
  s.time += dt;
  if (!s.chapterDone && kardashev(s) >= RULES.chapter1K) s.chapterDone = 1;
  return checkJournal(s);
}

export function checkJournal(s: State): string[] {
  const out: string[] = [];
  const day = Math.floor(s.time) + 1;
  for (const st of STORY) if (!s.story[st.id] && st.when(s)) { s.story[st.id] = true; s.log.unshift({ key: 'story.' + st.id, kind: 'story', day }); out.push(st.id); }
  const ctx = { powerW: powerW(s) };
  for (const f of FACTS) if (!s.facts[f.id] && f.when(s, ctx)) { s.facts[f.id] = true; s.log.unshift({ key: 'fact.' + f.id, kind: 'fact', day }); out.push(f.id); }
  if (s.log.length > 120) s.log.length = 120;
  return out;
}

/** Offline: jen malé zásoby, žádné stavby, výzkum ani lety se nedokončí. */
export function offlineGain(s: State, seconds: number): Partial<Record<Res, number>> {
  const sec = Math.min(Math.max(0, seconds), RULES.offlineCapSec);
  const { p, c } = rates(s);
  const got: Partial<Record<Res, number>> = {};
  for (const r of RESOURCES) {
    const net = p[r] - c[r];
    if (net > 0) { const v = net * sec * RULES.offlineShare; add(s, r, v); got[r] = v; }
  }
  return got;
}
