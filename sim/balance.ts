// Vyvažovací simulace: bot hraje kapitoly a vypíše časy milníků.
// Spuštění: npx tsx sim/balance.ts
// Proměnné: CPS (kliky/s), CATCH (podíl zachycených událostí), LIMIT (hodiny),
//   CH=1 jen Kapitola 1, CH=2 do supernovy, PRESTIGE=1 bot přestavuje roj,
//   TL=minuty  průběh K a surovin po čase, SNAP=sekundy,... stav budov,
//   SAVEAT=ch2,ch3  vypíše uloženou hru (SH1.…) na začátku kapitoly,
//   DUMP=soubor  uloží stav na začátku Kap. 3, START=soubor  začne z něj, SEED=číslo.
import { readFileSync, writeFileSync } from 'node:fs';
import { BUILDING_IDS, LOCATION_IDS, RESEARCH_IDS, B, type BuildingId, type Res } from '../src/core/defs.js';
import { newState, migrate, encodeSave } from '../src/core/state.js';
import * as E from '../src/core/engine.js';

const CLICKS_PER_SEC = Number(process.env.CPS ?? 4);
const EVENT_CATCH = Number(process.env.CATCH ?? 0.6);
const LIMIT_H = Number(process.env.LIMIT ?? 30);
const STOP_CH = Number(process.env.CH ?? 99);
const PRESTIGE = process.env.PRESTIGE !== '0';
const TL = Number(process.env.TL ?? 0) * 60;
const SNAP = (process.env.SNAP ?? '').split(',').filter(Boolean).map(Number);
const SAVEAT = (process.env.SAVEAT ?? '').split(',').filter(Boolean);
const DUMPAT = (process.env.DUMPAT ?? '').split(',').filter(Boolean).map((x) => x.split(':')); // sekundy:soubor

if (process.env.G2) E.TUNE.g2 = Number(process.env.G2);
if (process.env.BOOST) E.TUNE.boost = Number(process.env.BOOST);
let seed = Number(process.env.SEED ?? 42); const rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const s = process.env.START ? migrate(JSON.parse(readFileSync(process.env.START, 'utf8'))) : newState(0);
const t0 = s.time;
const marks: [string, number, string][] = [];
const mark = (k: string) => { if (!marks.find((m) => m[0] === k)) marks.push([k, s.time, E.kardashev(s).toFixed(2)]); };
let lastBuy = 0, longestWait = 0, waitStart = s.time;
const CH1: BuildingId[] = ['drone', 'smelter', 'solar', 'lab', 'drill', 'mirror', 'replicator', 'forge', 'catcher', 'qcomp', 'fusion', 'dyson'];
const CH2: BuildingId[] = ['dyson', 'windnet', 'sieve', 'corono', 'lifter', 'separator', 'seismo', 'swarmfab'];
const CH2_SET = new Set(CH2);
const chapterSet = (): BuildingId[] => s.chapterDone === 0 ? CH1 : s.chapterDone === 1 ? CH2 : BUILDING_IDS.filter((id) => !CH1.includes(id) && !CH2_SET.has(id));
const e = (v: number) => v.toExponential(1);

// ---- chování bota podle kapitoly ----
const VENTBOT = Number(process.env.VENT ?? 2); // kolik chuchvalců za sekundu bot vypustí
const FEED_SHARE = Number(process.env.FEED ?? 0.6); // kolik výroby plynu bot pošle do díry
function botWants(st: typeof s, id: BuildingId) {
  if (st.chapterDone < 2) return true;
  const { p, c } = E.rates(st);
  if (id === 'injector' || id === 'hawking') return (c.plasma - (E.ventOpen(st) && E.ventTank(st) < 0.999 ? E.ventFill(st) : 0)) + E.consOf(st, id, 'plasma') <= FEED_SHARE * p.plasma;
  if (id === 'jet') return E.jetCov(st) < 0.97;
  return true;
}
function botWeight(_s: typeof s, _id: BuildingId) { return 1; }
function botAct(st: typeof s) {
  if (VENTBOT && st.star.done) {
    for (let k = 0; k < VENTBOT; k++) E.ventRelease(st, rng() * 6.28); if (E.ventCanBurst(st)) E.ventBurst(st); for (const id of E.VENT_IDS) if (E.ventUpCost(st, id) < 0.1 * st.res.plasma) E.ventUpgrade(st, id); }
  if (st.star.done && E.phaseReady(st).ok) { E.advancePhase(st); marks.push([st.hole.dive >= 0 ? 'PONOR' : 'FÁZE ' + st.hole.phase, st.time, E.kardashev(st).toFixed(2)]); }
}
function botStatus(st: typeof s) {
  if (st.chapterDone === 1) return `stadium ${st.star.stage} t ${Math.round(st.star.t)} pokrytí ${E.coverage(st).toFixed(2)} body ${st.p.pts}`;
  if (st.star.done) return `fáze ${st.hole.phase} a ${st.hole.a.toFixed(2)} L ${e(E.holeL(st))} kryt ${E.ringCov(st).toFixed(2)} trysky ${e(E.jetP(st))} γ ${E.gamma(st).toFixed(1)} | ${chapterSet().map((id) => id + ' ' + Math.floor(st.b[id])).join(' ')}`;
  return '';
}
function botMarks(_s: typeof s): string[] { return []; }

function buyChapter1() {
  const unlocked = BUILDING_IDS.filter((id) => E.isUnlocked(s, id));
  const newest = unlocked.filter((id) => id !== 'replicator').at(-1);
  const pw = E.rates(s).p.energy;
  const missing = unlocked.find((id) => Math.floor(s.b[id]) === 0 && !(id === 'qcomp' && pw < 6e8));
  let olderBought = 0, bought = false;
  for (let k = 0; k < 50; k++) {
    const { p, c } = E.rates(s);
    let best: BuildingId | null = null, bv = Infinity;
    for (const id of CH1) {
      if (!E.isUnlocked(s, id)) continue;
      if (id === 'smelter' && s.b.smelter > 0 && c.ore > p.ore * 0.85) continue;
      if (id === 'lab' && s.b.lab > 0 && c.energy > p.energy * 0.8) continue;
      if (id === 'qcomp' && (p.energy < 6e8 || c.energy + 2e8 > p.energy * 0.8)) continue;
      if (id === 'forge' && s.b.forge > 0 && c.ore > p.ore * 0.85) continue;
      if (id === 'replicator' && c.energy + 2.5e5 > p.energy * 0.8) continue;
      const cst = E.cost(s, id);
      if (!E.affordable(s, cst)) continue;
      if (missing && id !== missing && Object.keys(cst).some((r) => (E.cost(s, missing) as Record<string, number>)[r])) continue;
      if (id !== newest && id !== missing && (olderBought >= 2 || Object.entries(cst).some(([r, x]) => x! > 0.25 * s.res[r as Res]))) continue;
      const v = Object.entries(cst).reduce((a, [r, x]) => a + x! / Math.max(1, s.res[r as Res] + 1), 0);
      if (v < bv) { bv = v; best = id; }
    }
    if (!best) break;
    E.buy(s, best); bought = true; if (best !== newest && best !== missing) olderBought++;
  }
  return bought;
}

/** Obecný bot pro další kapitoly: kupuje nejlevnější vzhledem k zásobám, převodníky jen když mají vstup. */
function buyLater() {
  let bought = false;
  const ids = chapterSet().filter((id) => E.isUnlocked(s, id));
  const missing = ids.find((id) => Math.floor(s.b[id]) === 0 && botWants(s, id));
  for (let k = 0; k < 60; k++) {
    const { p, c } = E.rates(s);
    let best: BuildingId | null = null, bv = Infinity;
    for (const id of ids) {
      if (!botWants(s, id)) continue;
      const d = B[id];
      // převodník: po přikoupení musí zůstat vstup v plusu (energii trychtýřů hlídá účinnost)
      if (d.cons && id !== 'swarmfab' && s.b[id] >= 1) {
        const starve = (Object.keys(d.cons) as Res[]).some((r) => p[r] - c[r] < E.consOf(s, id, r) * 1.05);
        if (starve) continue;
      }
      if (id === 'swarmfab' && (s.eff.swarmfab ?? 1) < 0.9 && s.b.swarmfab >= 1) continue;
      const cst = E.cost(s, id);
      if (!E.affordable(s, cst)) continue;
      if (missing && id !== missing && Object.keys(cst).some((r) => (E.cost(s, missing) as Record<string, number>)[r] && cst[r as Res]! > 0.1 * s.res[r as Res])) continue;
      const v = Object.entries(cst).reduce((a, [r, x]) => a + x! / Math.max(1, s.res[r as Res] + 1), 0) * botWeight(s, id);
      if (v < bv) { bv = v; best = id; }
    }
    if (!best) break;
    E.buy(s, best); bought = true;
  }
  return bought;
}

let nextTL = s.time + TL;
const tl = () => {
  const { p, c } = E.rates(s);
  const net = (r: Res) => p[r] - c[r];
  console.log(`TL ${fmt(s.time - t0)} K ${E.kardashev(s).toFixed(2)} kov ${e(s.res.metal)} ${e(net('metal'))}/s energie ${e(s.res.energy)} ${e(net('energy'))}/s plazma ${e(s.res.plasma)} ${e(net('plasma'))}/s data ${e(s.res.data)} ${e(net('data'))}/s ${botStatus(s)}`);
};
for (let t = 0; t < LIMIT_H * 3600; t++) {
  if (!s.r.auto && !s.chapterDone) for (let i = 0; i < CLICKS_PER_SEC; i++) E.mine(s);
  if (s.event && rng() < EVENT_CATCH) E.claimEvent(s);
  let bought = false;
  for (const id of RESEARCH_IDS) if (E.doResearch(s, id)) { mark('R ' + id); bought = true; }
  for (const id of LOCATION_IDS) if (id !== 'belt' && !s.visited[id] && E.canTravel(s, id)) E.depart(s, id);
  for (const id of LOCATION_IDS) if (id !== 'belt' && s.visited[id]) mark('L ' + id);
  if (s.chapterDone === 1) {
    if (E.stageReady(s).ok) { E.advanceStage(s); mark('STADIUM ' + (s.star.collapse >= 0 ? 'kolaps' : s.star.stage)); }
    if (PRESTIGE && E.canRebuild(s) && E.prestigeGain(s) >= Math.max(4, s.p.pts * 0.5)) { const g = E.rebuild(s); mark(`PŘESTAVBA ${s.p.count} (+${g})`); marks.at(-1)![0] += ` #${s.p.count}`; }
  }
  botAct(s);
  bought = (s.chapterDone === 0 ? buyChapter1() : buyLater()) || bought;
  if (bought) { longestWait = Math.max(longestWait, s.time - waitStart); waitStart = s.time; lastBuy = s.time; }
  const ch = s.chapterDone;
  E.tick(s, 1, rng);
  for (const m of botMarks(s)) mark(m);
  if (TL && s.time >= nextTL) { nextTL += TL; tl(); }
  if (SNAP.includes(Math.round(s.time - t0))) console.log(`STAV ${fmt(s.time - t0)}:`, Object.entries(s.b).filter(([id, v]) => v >= 1 && chapterSet().includes(id as BuildingId)).map(([k, v]) => `${k} ${Math.floor(v)}`).join(', '));
  for (const [sec, file] of DUMPAT) if (Math.round(s.time - t0) === Number(sec)) writeFileSync(file, JSON.stringify(s));
  for (const id of BUILDING_IDS) if (s.b[id] >= 1) mark('B ' + id);
  for (const k of [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.25, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3]) if (E.kardashev(s) >= k) mark('K ' + k);
  if (s.chapterDone > ch) {
    mark('KONEC KAPITOLY ' + s.chapterDone);
    longestWait = 0; waitStart = s.time;
    if (SAVEAT.includes('ch' + (s.chapterDone + 1))) console.log(`SAVE ch${s.chapterDone + 1}:`, encodeSave(s));
    if (s.chapterDone === 2 && process.env.DUMP) writeFileSync(process.env.DUMP, JSON.stringify(s));
    if (s.chapterDone === 1 && process.env.DUMP1) writeFileSync(process.env.DUMP1, JSON.stringify(s));
  }
  if (s.chapterDone >= STOP_CH) break;
}
function fmt(sec: number) { return `${Math.floor(sec / 3600)}:${String(Math.floor((sec % 3600) / 60)).padStart(2, '0')}:${String(Math.floor(sec % 60)).padStart(2, '0')}`; }
for (const [k, t, K] of marks) console.log(fmt(t - t0).padStart(8), ' K', K.padStart(5), ' ', k);
console.log('budovy', JSON.stringify(Object.fromEntries(Object.entries(s.b).filter(([id]) => chapterSet().includes(id as BuildingId)).map(([k, v]) => [k, Math.floor(v)]))));
console.log('nejdelší čekání na nákup:', Math.round(longestWait), 's', ' poslední nákup', fmt(lastBuy - t0), ' konec', fmt(s.time - t0));
