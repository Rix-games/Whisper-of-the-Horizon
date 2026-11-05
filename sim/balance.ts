// Vyvažovací simulace: bot hraje Kapitolu 1 a vypíše časy milníků.
// Spuštění: npx tsx sim/balance.ts
import { BUILDING_IDS, LOCATION_IDS, RESEARCH_IDS, type BuildingId } from '../src/core/defs.js';
import { newState } from '../src/core/state.js';
import * as E from '../src/core/engine.js';

const CLICKS_PER_SEC = Number(process.env.CPS ?? 4);   // ruční klikání, dokud není automat
const EVENT_CATCH = Number(process.env.CATCH ?? 0.6);   // kolik událostí hráč zachytí
const LIMIT_H = Number(process.env.LIMIT ?? 12);

let seed = 42; const rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const s = newState(0);
const marks: [string, number, string][] = [];
const mark = (k: string) => { if (!marks.find((m) => m[0] === k)) marks.push([k, s.time, E.kardashev(s).toFixed(2)]); };
let lastBuy = 0, longestWait = 0, waitStart = 0;

for (let t = 0; t < LIMIT_H * 3600; t++) {
  if (!s.r.auto) for (let i = 0; i < CLICKS_PER_SEC; i++) E.mine(s);
  if (s.event && rng() < EVENT_CATCH) E.claimEvent(s);
  let bought = false;
  for (const id of RESEARCH_IDS) if (E.doResearch(s, id)) { mark('R ' + id); bought = true; }
  for (const id of LOCATION_IDS) if (id !== 'belt' && !s.visited[id] && E.canTravel(s, id)) { E.depart(s, id); }
  for (const id of LOCATION_IDS) if (s.visited[id]) mark('L ' + id);
  const unlocked = BUILDING_IDS.filter((id) => E.isUnlocked(s, id));
  const newest = unlocked.filter((id) => id !== 'replicator').at(-1);
  const pw = E.rates(s).p.energy;
  const missing = unlocked.find((id) => Math.floor(s.b[id]) === 0 && !(id === 'qcomp' && pw < 6e8));
  let olderBought = 0;
  for (let k = 0; k < 50; k++) {
    const { p, c } = E.rates(s);
    let best: BuildingId | null = null, bv = Infinity;
    for (const id of BUILDING_IDS) {
      if (!E.isUnlocked(s, id)) continue;
      if (id === 'smelter' && s.b.smelter > 0 && c.ore > p.ore * 0.85) continue;
      if (id === 'lab' && s.b.lab > 0 && c.energy > p.energy * 0.8) continue;
      if (id === 'qcomp' && (p.energy < 6e8 || c.energy + 2e8 > p.energy * 0.8)) continue;
      if (id === 'forge' && s.b.forge > 0 && c.ore > p.ore * 0.85) continue;
      const cst = E.cost(s, id);
      if (!E.affordable(s, cst)) continue;
      // šetří na novou budovu; starší kupuje jen z přebytků
      if (missing && id !== missing && Object.keys(cst).some((r) => (E.cost(s, missing) as Record<string, number>)[r])) continue;
      if (id !== newest && id !== missing && (olderBought >= 2 || Object.entries(cst).some(([r, x]) => x! > 0.25 * s.res[r as keyof typeof s.res]))) continue;
      // cena relativně k zásobám (méně = výhodnější)
      const v = Object.entries(cst).reduce((a, [r, x]) => a + x! / Math.max(1, s.res[r as keyof typeof s.res] + 1), 0);
      if (v < bv) { bv = v; best = id; }
    }
    if (!best) break;
    E.buy(s, best); bought = true; if (best !== newest && best !== missing) olderBought++;
  }
  if (bought) { longestWait = Math.max(longestWait, s.time - waitStart); waitStart = s.time; lastBuy = s.time; }
  E.tick(s, 1, rng);
  for (const id of BUILDING_IDS) if (s.b[id] >= 1) mark('B ' + id);
  for (const k of [0, 0.25, 0.5, 0.75]) if (E.kardashev(s) >= k) mark('K ' + k);
  if (s.chapterDone) { mark('KONEC KAPITOLY 1'); break; }
}
const fmt = (sec: number) => `${Math.floor(sec / 3600)}:${String(Math.floor((sec % 3600) / 60)).padStart(2, '0')}`;
for (const [k, t, K] of marks) console.log(fmt(t).padStart(6), ' K', K.padStart(5), ' ', k);
console.log('budovy', JSON.stringify(Object.fromEntries(Object.entries(s.b).map(([k, v]) => [k, Math.floor(v)]))));
console.log('nejdelší čekání na nákup:', Math.round(longestWait), 's', ' poslední nákup', fmt(lastBuy));
