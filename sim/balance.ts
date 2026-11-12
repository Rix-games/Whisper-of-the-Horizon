// Simulace tempa: bot hraje mechaniku kapitoly a nakupuje jako rozumný hráč.
//   npm run sim                 celá hra (Kap. 1–3)
//   CH=2 npm run sim            jen Kap. 2 z typického startovního stavu (chapters/ch2.ts → simStart)
// Proměnné: SEED, LIMIT (s), TL (výpis po N s), EV=1 (všechny události), SKILL (0..1, aktivita bota)
// Výstup je krátký: časy stadií, K, příjem a mezery bez novinky > 8 min.
import { newState } from "../src/core/state";
import * as E from "../src/core/engine";
import { CHAPTERS } from "../src/core/defs";
import { seedRnd } from "../src/core/rng";
import { kamen } from "../src/mech/ch1";
import { hvezda } from "../src/mech/ch2";
import { galaxie } from "../src/mech/ch3";
import { fxUpdate, setFx } from "../src/mech/fx";

const env = (k: string, d: number) => (process.env[k] ? Number(process.env[k]) : d);
const SEED = env("SEED", 1), LIMIT = env("LIMIT", 6 * 3600), TL = env("TL", 0), SKILL = env("SKILL", 1), ONLY = env("CH", 0);
seedRnd(SEED); setFx(false);
const s = newState();
if (ONLY > 1) { s.ch = ONLY; CHAPTERS[ONLY - 1].simStart?.(s); CHAPTERS[ONLY - 1].onStart?.(s); }
const mechs: any = { 1: kamen, 2: hvezda, 3: galaxie };
const M = { x: 800, y: 500, px: 800, py: 500, down: false, inside: true };
let mech = mechs[s.ch]; mech.reset();
const ev: [number, string][] = [];
const nov = (w: string) => ev.push([s.t, w]);
E.on((e) => {
  if (["unlock", "runlock", "munlock", "stage", "mdone", "research"].includes(e.type)) nov(`${e.type}:${e.id}`);
  if (e.type === "chapter") { mech = mechs[s.ch]; mech.reset(); nov("KAPITOLA " + s.ch); }
});
const fmt = (t: number) => `${Math.floor(t / 3600)}:${String(Math.floor((t % 3600) / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
const e2 = (x: number) => x.toExponential(1);
const out: string[] = [];
let lastKey = "", chStart = 0, buyT = 0, tlT = 0, idle = 0;
const dt = 0.05;

function shop() {
  const C = E.chDef(s);
  for (const r of C.research) if (!s.r[r.id] && !r.final && E.rVisible(s, r.id) && s.res.data >= r.cost) E.doResearch(s, r.id);
  for (const m of C.missions) if (!s.run && !s.mis[m.id] && E.mVisible(s, m.id) && s.res.energy >= m.cost) E.startMission(s, m.id);
  // šetři na první kus nové klíčové stavby, když je do ~90 s příjmu
  let save = "", saveC = 0;
  for (const b of C.build) {
    if (b.kind === "swarm" || !E.unlocked(s, b.id) || (s.b[b.id] || 0) > 0) continue;
    if (!["auto", "unit", "gen", "mult"].includes(b.kind)) continue;
    const c = E.cost(s, b.id);
    if (c > s.res[b.cur] && c < Math.max(E.RT.rate[b.cur], 1e-9) * 90) { save = b.id; saveC = c; break; }
  }
  mech.reserve = saveC;   // bot nevypouští kolektory z peněz, na které šetří
  for (let k = 0; k < 300; k++) {
    let best = "", bv = 0;
    for (const b of C.build) {
      if (b.kind === "swarm" || !E.unlocked(s, b.id) || E.maxed(s, b.id)) continue;
      const c = E.cost(s, b.id), have = s.res[b.cur];
      if (c > have || (save && c > saveC * 0.02 && b.id !== save)) continue;
      const cnt = s.b[b.id] || 0;
      let ben = C.botValue?.(s, b.id);
      if (ben === undefined) ben = b.kind === "mult" ? 0.12 : b.kind === "unit" ? 1 / (cnt + 6) : b.kind === "data" ? 0.6 / (cnt + 1) : b.kind === "gen" ? 0.2 : 0.3;
      const v = ben / (c / have + 1e-9);
      if (v > bv) { bv = v; best = b.id; }
    }
    if (!best) break;
    E.buy(s, best, 1);
  }
  const fin = C.research.find((r) => r.final);
  if (fin && E.rVisible(s, fin.id) && !s.r[fin.id] && s.res.data >= fin.cost) {
    E.doResearch(s, fin.id);
    out.push(`Kap. ${s.ch} hotová v ${fmt(s.t)} (kapitola ${fmt(s.t - chStart)})`);
    if (ONLY || s.ch >= CHAPTERS.length) return true;
    E.archiveData(s); E.nextChapter(s); chStart = s.t;
  }
  return false;
}

while (s.t < LIMIT) {
  idle -= dt;
  if (idle <= 0 && Math.random() > SKILL) idle = 4;
  if (idle > 0) { if (M.down) { M.down = false; mech.up?.(s, M); } } else mech.bot(s, dt, M);
  mech.update(s, dt, M);
  E.tick(s, dt);
  fxUpdate(dt);
  buyT -= dt;
  if (buyT <= 0) { buyT = 1; if (shop()) break; }
  const cur = E.chDef(s).cur, key = s.ch + "." + s.stage;
  if (key !== lastKey) { out.push(`  ${key} @ ${fmt(s.t)}  K ${E.K(E.power(s)).toFixed(2)}  ${cur}/s ${e2(E.RT.rate[cur])}  data/s ${e2(E.dataRate(s))}`); lastKey = key; }
  if (TL && (tlT -= dt) <= 0) {
    tlT = TL;
    const b = Object.entries(s.b).filter(([id]) => E.chDef(s).build.some((x) => x.id === id)).map(([id, v]) => id + ":" + v).join(" ");
    console.log(`${fmt(s.t)} ${key} K ${E.K(E.power(s)).toFixed(2)} ${cur} ${e2(s.res[cur])} (${e2(E.RT.rate[cur])}/s) data ${e2(s.res.data)} (${e2(E.dataRate(s))}/s) E ${e2(s.res.energy)} n ${e2(s.n)} | ${b}`);
  }
}
console.log(out.join("\n"));
if (process.env.EV) for (const [t, w] of ev) console.log(fmt(t), w);
let prev = ev.length ? ev[0][0] : 0; const gaps: string[] = [];
for (const [t, w] of ev) { if (t - prev > 480) gaps.push(`${fmt(prev)}→${fmt(t)} (${Math.round((t - prev) / 60)} min) před ${w}`); prev = t; }
if (gaps.length) console.log("Mezery > 8 min:\n " + gaps.join("\n "));
// DUMP=soubor.json – uloží stav na konci běhu (uloženou hru pro kontrolní snímky)
if (process.env.DUMP) (await import("node:fs")).writeFileSync(process.env.DUMP, JSON.stringify(s));
