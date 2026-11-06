// Čistá herní logika bez prohlížeče. Dá se spustit v Node (simulace) i na mobilu.
import type { Blob, State } from './state.js';
import { HOLE, PHASES, type Amounts, type BuildingId, type EventId, type LocationId, type Res, type ResearchId, B, BUILDING_IDS, EVENTS, EVENT_IDS, FACTS, L, PRESTIGE, R, RESOURCES, RULES, STAGES, STAR, STORY } from './defs.js';

const keys = <T extends object>(o: T) => Object.keys(o) as (keyof T)[];

export const DYSON_BOOST = 1.1;
/** Ladění Kap. 2: zdražování kolektorů nad stav z Kap. 1 (g2) a jak každý kolektor posílí stavby hvězdy (boost). */
export const TUNE = { g2: 1.125, boost: 1.085 };
export const DYSON_CROWD = 1.03;
export const DYSON_CH1_CHEAP = 20;
export const DYSON_CH1_DISCOUNT = 0.4;
export const CONVERTERS: BuildingId[] = ["smelter", "forge", "lab", "qcomp", "replicator", "sieve", "corono", "lifter", "separator", "seismo", "injector", "station", "hawking"];
export const CONVERTER_SCALES = { smelter: true, forge: true, sieve: true, lifter: true, separator: true, seismo: true, injector: true, hawking: true };
const zeroRates = (): Record<Res, number> => ({ ore: 0, metal: 0, energy: 0, data: 0, plasma: 0 });
export function stageDef(s: State) {
  return STAGES[Math.min(s.star.stage, STAGES.length - 1)];
}
export function luminosity(s: State) {
  return s.star.done ? 0 : stageDef(s).L;
}
export function liftEff(s: State) {
  return (s.r.rotlift ? 3 : 1) * (s.r.magsail ? 2 : 1) * (s.visited.kuiper ? 3 : 1);
}
export function liftJ(s: State) {
  return STAR.G * STAR.massKg / (stageDef(s).R * STAR.rSun) * STAR.liftShare / liftEff(s);
}
export function metallicity(s: State) {
  return stageDef(s).z;
}
export function dysonRaw(s: State) {
  return s.b.dyson * B.dyson.prod.energy * mult(s, "dyson");
}
export function coverage(s: State) {
  const Lw = luminosity(s);
  return Lw ? 1 - Math.exp(-dysonRaw(s) / Lw) : 0;
}
export function dysonSat(s: State) {
  const raw = dysonRaw(s);
  return raw > 0 ? luminosity(s) * coverage(s) / raw : 1;
}
/** Lepší návrh roje: trvalý násobič roje, trychtýřů a separátorů. Přestavby (prestiž) jsou vypnuté, schované pro endgame. */
export const REBUILD_ON = false;
export const REDESIGN_MULT = 1.5;
export function prestigeMult(s: State) {
  if (!REBUILD_ON) return s.r.redesign ? REDESIGN_MULT : 1;
  return 1 + PRESTIGE.per * s.p.pts;
}
export function prestigeTarget(s: State) {
  return s.p.run > PRESTIGE.metalUnit ? Math.floor(PRESTIGE.perOrder * Math.log10(s.p.run / PRESTIGE.metalUnit)) : 0;
}
export function prestigeGain(s: State) {
  return Math.max(0, prestigeTarget(s) - s.p.pts);
}

// ---------- Kapitola 3: černá díra ----------
export const RING_BOOST = 1.1;
export const JET_BOOST = 1.1;
export const HOLE_BUILDINGS: BuildingId[] = ["scoop", "injector", "ring", "station", "jet", "hawking"];
export function phaseDef(s: State) {
  return PHASES[Math.min(s.hole.phase, PHASES.length - 1)];
}
/** Poloměr nejmenší stabilní kruhové dráhy (ISCO) v jednotkách GM/c² pro rotaci a (Bardeen, Press, Teukolsky 1972). */
export function iscoR(a: number) {
  const z1 = 1 + Math.cbrt(1 - a * a) * (Math.cbrt(1 + a) + Math.cbrt(1 - a));
  const z2 = Math.sqrt(3 * a * a + z1 * z1);
  return 3 + z2 - Math.sqrt((3 - z1) * (3 + z1 + 2 * z2));
}
/** Účinnost akrece: podíl klidové hmotnosti, který disk vyzáří (5,7 % bez rotace, 32 % u a = 0,998). */
export function diskEta(a: number) {
  return 1 - Math.sqrt(1 - 2 / (3 * iscoR(a)));
}
/** Kolik kg plynu za sekundu injektory skutečně posílají z pasti do disku. */
export function feedRate(s: State) {
  return s.b.injector && !s.off.injector ? s.vent?.inj ?? 0 : 0;
}
/** Místa injektorů na okraji disku (úhly). */
export function injEmitters(s: State) {
  const n = s.b.injector, k = n >= 1 ? Math.min(8, 2 + Math.floor(Math.log10(Math.max(1, n)) * 3)) : 0;
  return Array.from({ length: k }, (_, i) => i * (Math.PI * 2 / k) + 0.4);
}
/** Kolik by injektory chtěly poslat, kdyby měla past dost plynu. */
export function injDemand(s: State) {
  return s.b.injector ? consOf(s, "injector", "plasma") * s.b.injector : 0;
}
/** Svítivost disku ve W. Nad Eddingtonovou mezí jen se štíhlým diskem a jen logaritmicky. */
export function holeLRaw(s: State) {
  return diskEta(s.hole.a) * ventFlow(s) * HOLE.c2;
}
export function holeL(s: State) {
  const raw = holeLRaw(s) * ventHeatMult(s), edd = HOLE.eddW * ventOverMult(s) * ventHeatMult(s);
  if (raw <= edd) return raw;
  return s.r.slim ? edd * (1 + 2 * Math.log(raw / edd)) : edd;
}
export function ringCov(s: State) {
  const f = HOLE.ringF * (s.r.wide ? 2 : 1) * (s.r.thick ? 2 : 1);
  return 1 - Math.exp(-s.b.ring * f);
}
/** Účinnost trysek (Blandford–Znajek): roste s druhou mocninou rotace, v magneticky zablokovaném disku i přes 100 %. */
export function jetEta(s: State) {
  if (!s.r.mad) return 0;
  const a = s.hole.a / HOLE.spinMax;
  return 1.4 * a * a * (s.r.bz ? 2 : 1) * (s.r.penrose ? 2 : 1);
}
export function jetP(s: State) {
  return jetEta(s) * ventFlow(s) * HOLE.c2;
}
export function jetCov(s: State) {
  return s.off.jet ? 0 : 1 - Math.exp(-s.b.jet * HOLE.jetF);
}
/** Oběžná dráha stanic v Schwarzschildových poloměrech a dilatace času γ = 1/√(1 − rₛ/r). */
export function stationR(s: State) {
  return s.r.edge ? 1.01 : s.r.lower ? 1.2 : 3;
}
export function gamma(s: State) {
  return 1 / Math.sqrt(1 - 1 / stationR(s));
}
/** Stanice měří tím víc, čím víc díra a civilizace září: (P / 10²⁰ W)^k, nejméně 1. */
export function holeFb(s: State, k: number) {
  return Math.pow(Math.max(1, powerW(s) / HOLE.fbBase), k);
}
/** Krmení roztáčí díru, trysky ji brzdí. Rovnovážná rotace. */
function spinRates(s: State) {
  const up = ventFlow(s) > 0 ? (s.r.prograde ? 2 : 1) : 0;
  const down = s.b.jet && s.r.mad ? jetCov(s) * (s.r.penrose ? 0.5 : 1) : 0;
  return { up, down };
}
export function spinEq(s: State) {
  const { up, down } = spinRates(s);
  return up + down ? HOLE.spinMax * up / (up + down) : s.hole.a;
}
function holeTick(s: State, dt: number) {
  if (!s.hole.started) {
    s.hole.started = true;
    add(s, "plasma", HOLE.startPlasma);
  }
  if (!s.hole.cap && holeLRaw(s) * ventHeatMult(s) >= HOLE.eddW * ventOverMult(s) * ventHeatMult(s)) s.hole.cap = true;
  const { up, down } = spinRates(s);
  const a = s.hole.a + HOLE.spinRate * dt * (up * (HOLE.spinMax - s.hole.a) - down * s.hole.a);
  s.hole.a = Math.max(0, Math.min(HOLE.spinMax, a));
  if (s.hole.dive >= 0) {
    s.hole.dive -= dt;
    if (s.hole.dive <= 0) {
      s.hole.dive = -1;
      s.hole.done = true;
      if (s.chapterDone < 3) s.chapterDone = 3;
    }
  }
}
export function phaseReady(s: State) {
  const d = phaseDef(s), last = s.hole.phase >= PHASES.length - 1;
  const power2 = powerW(s) >= d.needW, research = !last || !!s.r.dive;
  return { power: power2, research, ok: s.star.done && !s.hole.done && s.hole.dive < 0 && power2 && research };
}
export function advancePhase(s: State) {
  if (!phaseReady(s).ok) return false;
  if (s.hole.phase >= PHASES.length - 1) s.hole.dive = HOLE.diveSec;
  else s.hole.phase++;
  return true;
}
// ---------- Kapitola 3: vypouštění plynu z magnetické pasti ----------
// Plyn ze zpětného pádu se chytá do pasti. Hráč ho vypouští do disku; chuchvalec se stáčí po spirále
// k nejbližší stabilní dráze (ISCO) a tam vzplane: dá data a zvýší žár disku (násobí záření disku).
// Další chuchvalec vypuštěný dřív, než předchozí dopadne, prodlužuje řetěz (kvaziperiodické oscilace).
export const VENT = {
  isco: 0.23,          // vnitřní okraj disku v poloměrech disku (jen geometrie letu)
  fallIn: 0.085,       // rychlost pádu dovnitř: dr/dt = −k·r^−½
  spin: 0.55,          // úhlová rychlost na okraji disku (Kepler: ω ∝ r^−3/2)
  capSec: 40,          // kapacita pasti v sekundách plnění
  valveSec: 2,         // kolik sekund plnění je v jednom chuchvalci (jeden klik za ~2 s)
  share: 0.3,          // jaký díl plynu z naběračů jde do pasti (+10 % za úroveň Sacích kanálů)
  tau: 90,             // jak dlouho plyn v disku září, než spadne do díry (viskózní čas)
  dataPerJ: 1e19,      // data ze záblesku: dataPerJ·√E
  heatPer: 0.035,      // žár za záblesk (×násobič řetězu)
  heatDecay: 0.02,     // chladnutí za sekundu
  heatBonus: 3,        // výkon disku ×(1 + 3·žár)
  dataSec: 1,          // záblesk dá data za tolik sekund běžné výroby
  pulse: 7.3,          // perioda pulsu
  pulseWin: 1.1,       // okno souzvuku po pulsu
  overSec: 15,         // výbuch disku: jak dlouho je disk nad mezí
  overMult: 2,         // a kolikrát víc září
  burstN: 14
};
export type VentUp = "inlet" | "valve" | "trap" | "radius" | "coil";
export const VENT_UPS: Record<VentUp, { base: number; g: number; max: number }> = {
  inlet: { base: 1.5e8, g: 9, max: 5 },
  valve: { base: 3e8, g: 7, max: 12 },
  trap: { base: 5e8, g: 7, max: 12 },
  radius: { base: 2e9, g: 40, max: 5 },
  coil: { base: 6e9, g: 25, max: 6 }
};
export const VENT_IDS = Object.keys(VENT_UPS) as VentUp[];
export const ventLv = (s: State, id: VentUp) => s.vent.lv[id] ?? 0;
export const ventOpen = (s: State) => s.star.done && !!s.r.accrete;
/** Past se plní z přírůstku plazmatu z naběračů: hráč volí, jaký díl do ní jde. */
export const ventShare = (s: State, l = ventLv(s, "inlet")) => Math.min(0.8, VENT.share + 0.1 * l);
export function ventFill(s: State, l = ventLv(s, "inlet")) {
  const scoops = s.b.scoop ? prodOf(s, "scoop", "plasma") * s.b.scoop : 0;
  return Math.max(2e4, scoops) * ventShare(s, l);
}
const ventUnit = (s: State) => Math.max(2e4, s.b.scoop ? prodOf(s, "scoop", "plasma") * s.b.scoop : 0) * VENT.share;
export const ventCap = (s: State, l = ventLv(s, "trap")) => ventUnit(s) * VENT.capSec * Math.pow(1.6, l);
export const ventKg = (s: State, l = ventLv(s, "valve")) => Math.min(ventCap(s), ventUnit(s) * VENT.valveSec * Math.pow(1.5, l));
/** Plyn z ventilu, který právě padá z disku do díry (kg/s). */
export const ventFlow = (s: State) => (s.vent.disk ?? 0) / VENT.tau;
export const ventR = (l: number) => 0.5 + l * 0.09;
export const ventChainMax = (l: number) => 8 + l * 4;
export const ventStep = (l: number) => 0.12 + l * 0.03;
export function ventFlight(r0: number) {
  return (Math.pow(r0, 1.5) - Math.pow(VENT.isco, 1.5)) / (1.5 * VENT.fallIn);
}
/** Poloha chuchvalce v čase t od vypuštění (analyticky z rovnic pádu a Keplerovy rotace). */
export function blobPos(b: Blob, t: number) {
  const k = 1.5 * VENT.fallIn, r15 = Math.max(Math.pow(VENT.isco, 1.5), Math.pow(b.r0, 1.5) - k * t);
  const f = Math.max(1e-6, r15 / Math.pow(b.r0, 1.5));
  return { r: Math.pow(r15, 2 / 3), th: b.th0 - (VENT.spin / k) * Math.log(f) };
}
export const ventChainMult = (s: State) => 1 + ventStep(ventLv(s, "coil")) * Math.max(0, Math.min(s.vent.chain, ventChainMax(ventLv(s, "coil"))) - 1);
export const ventHeatMult = (_s: State) => 1;
export const ventOverMult = (s: State) => s.vent.over > 0 ? VENT.overMult : 1;
export const pulsePhase = (s: State) => s.time % VENT.pulse;
export const ventGoldNow = (s: State) => pulsePhase(s) < VENT.pulseWin;
/** Vypustí jeden chuchvalec. Vrátí ho, nebo null, když je past prázdná. */
export function ventRelease(s: State, th: number, auto = false): Blob | null {
  if (!ventOpen(s)) return null;
  const kg = ventKg(s);
  if (ventTankKg(s) < kg * 0.999) return null;
  s.vent.kg = Math.max(0, ventTankKg(s) - kg);
  if (!auto) {
    s.vent.man = (s.vent.man ?? 0) + kg / 3;
    chainUp(s);
  }
  const b: Blob = { t0: s.time, r0: ventR(ventLv(s, "radius")), th0: th, kg, mult: auto ? 1 : ventChainMult(s), gold: !auto && ventGoldNow(s), auto };
  s.vent.fly.push(b);
  return b;
}
/** Plyn v pasti (kg) a jak je plná (0–1). */
export const ventTankKg = (s: State) => Math.min(s.vent.kg ?? 0, ventCap(s));
export const ventTank = (s: State) => ventTankKg(s) / ventCap(s);
/** Řetěz: chuchvalec (ruční i z injektoru) vypuštěný, když jiný ještě letí, řetěz prodlouží. */
const chained = (b: Blob) => !b.auto || !!b.inj;
function chainUp(s: State) {
  s.vent.chain = s.vent.fly.some(chained) ? s.vent.chain + 1 : 1;
  s.vent.best = Math.max(s.vent.best, s.vent.chain);
}
export function ventCanBurst(s: State) {
  return ventOpen(s) && ventTank(s) >= 0.999;
}
/** Výbuch disku: celá past najednou, disk se na chvíli dostane nad Eddingtonovu mez. */
export function ventBurst(s: State) {
  if (!ventCanBurst(s)) return false;
  const kg = ventTankKg(s) / VENT.burstN, r0 = ventR(ventLv(s, "radius"));
  for (let i = 0; i < VENT.burstN; i++) s.vent.fly.push({ t0: s.time, r0: r0 + (i % 3) * 0.04, th0: i / VENT.burstN * Math.PI * 2, kg, mult: 1.5, gold: false, auto: true });
  s.vent.kg = 0;
  s.vent.over = VENT.overSec;
  return true;
}
export interface Flare { b: Blob; data: number; energy: number }
/** Záblesk na ISCO: data za pár sekund výroby a žár disku. */
function ventFlare(s: State, b: Blob): Flare {
  const g = b.gold ? 2 : 1, w = b.kg * b.mult * g;
  const energy = diskEta(s.hole.a) * w * HOLE.c2;
  const data = Math.sqrt(energy) * VENT.dataPerJ;   // data rostou pomaleji než energie záblesku
  add(s, "data", data);
  s.vent.disk = (s.vent.disk ?? 0) + w;   // plyn se rozprostře v disku a padá do díry s časem tau
  return { b, data, energy };
}
function baseDataRate(s: State) {
  let d = 0;
  for (const id of BUILDING_IDS) if (s.b[id] && B[id].prod?.data) d += prodOf(s, id, "data") * s.b[id] * effOf(s, id);
  return d;
}
/** Krok pasti: plnění, chladnutí, automatický ventil a dopady chuchvalců. Vrací záblesky pro grafiku. */
export const flares: Flare[] = [];
function ventTick(s: State, dt: number) {
  const v = s.vent;
  if (!ventOpen(s)) return;
  const cap = ventCap(s);
  v.kg = Math.min(v.kg ?? 0, cap);
  if (v.kg < cap) {
    const take = Math.min(ventFill(s) * dt, cap - v.kg, Math.max(0, s.res.plasma));
    s.res.plasma -= take;
    v.kg += take;
  }
  // injektory = automatický ventil: z pasti vypouštějí skutečné chuchvalce (velikost dle Ventilu, let dle Poloměru)
  if (s.b.injector && !s.off.injector) {
    // chuchvalec injektoru: nejvýš velikost ventilu, aspoň jeden za 1,5 s, nejvýš 4 za sekundu
    const dem = injDemand(s), per = Math.max(Math.min(ventKg(s), dem * 1.5), dem / 4), em = injEmitters(s);
    v.injC = Math.min((v.injC ?? 0) + dem * dt, per * 2);
    let sent = 0;
    // vypustí celý chuchvalec, nebo co v pasti je (aspoň pětinu chuchvalce)
    while (v.injC >= per && v.kg >= per * 0.2) {
      const kg = Math.min(per, v.kg);
      v.injC -= per; v.kg -= kg; sent += kg;
      v.injK = ((v.injK ?? 0) + 1) % em.length;
      chainUp(s);
      s.vent.fly.push({ t0: s.time, r0: ventR(ventLv(s, "radius")), th0: em[v.injK], kg, mult: ventChainMult(s), gold: ventGoldNow(s), auto: true, inj: true });
    }
    v.inj = (v.inj ?? 0) * (1 - Math.min(1, dt / 3)) + sent / 3;   // průměr za posledních pár sekund
    s.eff.injector = dem > 0 ? Math.min(1, v.inj / dem) : 1;
  } else v.inj = 0;
  v.man = (v.man ?? 0) * (1 - Math.min(1, dt / 3));
  if (v.over > 0) v.over = Math.max(0, v.over - dt);
  v.disk = Math.max(0, (v.disk ?? 0) - ventFlow(s) * dt);
  for (let i = v.fly.length - 1; i >= 0; i--) {
    const b = v.fly[i];
    if (s.time - b.t0 >= ventFlight(b.r0)) {
      v.fly.splice(i, 1);
      flares.push(ventFlare(s, b));
      if (flares.length > 40) flares.shift();
    }
  }
  if (v.chain && !v.fly.some(chained)) v.chain = 0;
}
export function ventUpCost(s: State, id: VentUp) {
  const u = VENT_UPS[id];
  return u.base * Math.pow(u.g, ventLv(s, id));
}
export function ventUpgrade(s: State, id: VentUp) {
  const c = ventUpCost(s, id);
  if (!ventOpen(s) || ventLv(s, id) >= VENT_UPS[id].max || s.res.plasma < c) return false;
  s.res.plasma -= c;
  s.vent.lv[id] = ventLv(s, id) + 1;
  return true;
}
// ---------- čas venku: Vesper mezi směnami spí ----------
export function aldraAge(s: State) {
  if (s.star.done) return STAGES[STAGES.length - 1].age0 + STAGES[STAGES.length - 1].years;
  const d = stageDef(s);
  return d.age0 + d.years * Math.min(1, s.star.t / d.sec);
}
function yearsTick(s: State, dt: number) {
  if (s.yrs === undefined) {
    // starší uložené hry: odhad podle kapitoly
    s.yrs1 = s.chapterDone ? 25 : undefined;
    s.yrs = !s.chapterDone ? s.time / 365.25 : s.yrs1 + aldraAge(s) - STAGES[0].age0;
  }
  if (!s.chapterDone) s.yrs += dt / 365.25;
  else {
    if (s.yrs1 === undefined) s.yrs1 = s.yrs;
    if (!s.star.done) s.yrs = s.yrs1 + aldraAge(s) - STAGES[0].age0;
    else s.yrs += dt / 365.25;
  }
}
export function mult(s: State, id: BuildingId) {
  const r = s.r, v = s.visited;
  let m = 1;
  switch (id) {
    case "drone":
      if (r.swarm) m *= 2;
      if (r.swarm2) m *= 3;
      if (r.nano) m *= 4;
      break;
    case "drill":
      if (r.swarm2) m *= 3;
      if (r.nano) m *= 4;
      break;
    case "catcher":
      if (r.nano) m *= 4;
      break;
    case "smelter":
      if (r.arc) m *= 2;
      if (r.induct) m *= 4;
      break;
    case "forge":
      if (r.plasma) m *= 3;
      if (r.nano) m *= 4;
      if (r.induct) m *= 4;
      break;
    case "lab":
      if (r.lab2) m *= 2;
      if (v.moon) m *= 1.5;
      if (r.cryo) m *= 3;
      if (r.supercond) m *= 2;
      if (r.quantum) m *= 4;
      break;
    case "replicator":
      if (r.nano) m *= 3;
      break;
    case "seismo":
      if (r.census) m *= 2;
      if (r.seis2) m *= 10;
      if (r.pulse2) m *= 3;
      if (r.silicon) m *= 10;
      break;
    case "lifter":
      if (r.coil) m *= 3;
      if (r.rotlift) m *= 3;
      if (r.magsail) m *= 2;
      if (v.kuiper) m *= 3;
      break;
    case "scoop":
      if (r.magscoop) m *= 3;
      if (v.cas) m *= 3;
      if (v.tde) m *= 4;
      if (v.oort) m *= 1.5;
      if (v.cloud) m *= 2;
      break;
    case "injector":
      if (r.mri) m *= 3;
      if (v.dwarf) m *= 1.5;
      break;
    case "station":
      if (r.pulse3) m *= 3;
      if (v.lens) m *= 4;
      if (r.fermi) m *= 10;
      if (v.pulsar) m *= 2;
      break;
    case "hawking":
      if (r.evap) m *= 4;
      if (v.ergo) m *= 3;
      break;
    case "separator":
      if (r.mg) m *= 5;
      if (r.iron) m *= 5;
      if (v.ione) m *= 3;
      if (v.core) m *= 4;
      break;
  }
  if (id === "lab" || id === "qcomp") {
    if (r.silicon) m *= 10;
  }
  // Kapitola 3: každý diskový kolektor posílí naběrače, injektory a Hawkingovy reaktory
  if (id === "scoop" || id === "injector" || id === "hawking") m *= Math.pow(RING_BOOST, s.b.ring) * Math.pow(JET_BOOST, s.b.jet);
  if (id === "lifter" || id === "separator" || id === "seismo") {
    m *= Math.pow(TUNE.boost, s.b.dyson) * prestigeMult(s);
    if (id === "lifter" && s.star.collapse >= 0) m *= STAR.collapseLift;
  }
  if (B[id].prod?.energy && !HOLE_BUILDINGS.includes(id)) {
    if (id === "solar" && r.thinfilm) m *= 2;
    if (id === "mirror" && r.optics) m *= 3;
    if (id === "dyson" && r.statite) m *= 2;
    if (id === "dyson" && r.beam) m *= 2;
    if (id === "dyson" && r.lagrange) m *= 2;
    if (id === "dyson" && r.sail) m *= 4;
    if (id === "dyson" && r.highorbit) m *= 2;
    if (id === "dyson" && r.carbon) m *= 5;
    if (id === "dyson" && r.neon) m *= 3;
    if (id === "dyson" && v.dust) m *= 3;
    if (id === "dyson") m *= prestigeMult(s);
    if (v.giant) m *= 2;
    if (r.supercond) m *= 2;
    m *= Math.pow(DYSON_BOOST, s.b.dyson);
  }
  return m;
}
export function baseOreRate(s: State) {
  return (["drone", "drill", "catcher"] as BuildingId[]).reduce((a, id) => a + s.b[id] * B[id].prod.ore * mult(s, id), 0);
}
export function clickPower(s: State) {
  let p = 1;
  if (s.r.vib) p *= 3;
  if (s.r.vib2) p *= 5;
  if (s.r.resonance) p += baseOreRate(s) * 0.05;
  return p;
}
export function reactorW(s: State) {
  return RULES.baseReactorW * (s.r.supercond ? 2 : 1);
}
/** Stavby z minulých kapitol: Kap. 1 kromě kolektorů končí v Kap. 2, kolektory zanikly v supernově. */
export const CH1_OLD: BuildingId[] = ["drone", "smelter", "solar", "lab", "drill", "mirror", "replicator", "forge", "catcher", "qcomp", "fusion"];
export const CH2_OLD: BuildingId[] = ["dyson", "windnet", "sieve", "corono", "lifter", "separator", "seismo", "swarmfab"];
export function retired(s: State, id: BuildingId) {
  return s.chapterDone >= 1 && CH1_OLD.includes(id) || s.star.done && CH2_OLD.includes(id);
}
export const SALVAGE = { metal: 0.5, dataSec: 120 };
/** Na začátku Kap. 2 Vesper rozebere starou platformu: vrátí půlku kovu z jejích staveb a archiv dat. */
export function salvageGain(s: State) {
  let metal = 0, data = 0;
  for (const id of CH1_OLD) {
    const n = Math.floor(s.b[id]), d = B[id];
    if (!n) continue;
    if (d.base.metal) metal += d.base.metal * (Math.pow(d.growth, n) - 1) / (d.growth - 1);
    if (d.prod?.data) data += d.prod.data * mult(s, id) * n;
  }
  return { metal: metal * SALVAGE.metal, data: data * SALVAGE.dataSec };
}
function salvageTick(s: State) {
  if (s.salvaged || !s.chapterDone || s.star.done) return;
  const g = salvageGain(s);
  add(s, "metal", g.metal);
  add(s, "data", g.data);
  s.salvaged = g;
}
export function prodOf(s: State, id: BuildingId, r: Res) {
  const base = B[id].prod?.[r];
  if (!base || retired(s, id)) return 0;
  let v = base * mult(s, id);
  if (id === "separator") v *= metallicity(s);
  if (id === "dyson") v *= dysonSat(s);
  if (id === "station") v *= gamma(s) * holeFb(s, HOLE.dataFb);
  if (id === "ring") return s.b.ring ? holeL(s) * ringCov(s) / s.b.ring : 0;
  if (id === "jet") return s.b.jet ? jetP(s) * jetCov(s) * (s.visited.pole ? 3 : 1) * (s.visited.stream ? 1.5 : 1) / s.b.jet : 0;
  if (id === "hawking") return consOf(s, "hawking", "plasma") * HOLE.c2 * (r === "data" ? HOLE.hawkData : 1);
  return v;
}
export function consOf(s: State, id: BuildingId, r: Res) {
  if (id === "swarmfab") return r === "metal" || r === "energy" ? makesOf(s, id) * fabPriceFrac(s) * (cost(s, "dyson")[r] ?? 0) : 0;
  const base = B[id].cons?.[r];
  if (!base || retired(s, id)) return 0;
  let v = base * (CONVERTER_SCALES[id] ? mult(s, id) : 1);
  if (id === "lifter" && r === "energy") v *= liftJ(s);
  return v;
}
export function makesOf(s: State, id: BuildingId) {
  const mk = B[id].makes;
  return mk ? mk.rate * mult(s, id) : 0;
}
export const FAB_MAX = 0.5;
export const fabPriceFrac = (s: State) => s.r.mg ? 0.25 : 0.5;
/** Kolik plazmatu má smysl držet ve skladu: 2 minuty spotřeby separátorů a sít, nejméně trojnásobek ceny další stavby. */
export function plasmaCap(s: State) {
  const use = (["separator", "sieve"] as BuildingId[]).reduce((a, id) => a + consOf(s, id, "plasma") * s.b[id], 0);
  const next = Math.max(cost(s, "separator").plasma ?? 0, s.r.fab ? cost(s, "swarmfab").plasma ?? 0 : 0);
  return Math.max(1e10, 120 * use, 3 * next);
}
export function fabTick(s: State, dt: number) {
  const n = Math.floor(s.b.swarmfab);
  if (!n || s.off.swarmfab) {
    s.eff.swarmfab = n ? 0 : 1;
    s.fab = { ...s.fab ?? {}, m: 0, e: 0, made: 0, lim: null, target: null };
    return;
  }
  const { p, c } = rates(s);
  const own = (r) => consOf(s, "swarmfab", r) * n * (s.eff.swarmfab ?? 1);
  const netM = Math.max(0, p.metal - (c.metal - own("metal"))), netE = Math.max(0, p.energy - (c.energy - own("energy")));
  const needM = consOf(s, "swarmfab", "metal") * n, needE = consOf(s, "swarmfab", "energy") * n;
  const e = Math.max(0, Math.min(1, needM ? FAB_MAX * netM / needM : 1, needE ? FAB_MAX * netE / needE : 1));
  const made = makesOf(s, "swarmfab") * n * e * dt, m = needM * e * dt, en = needE * e * dt;
  s.res.metal = Math.max(0, s.res.metal - m);
  s.res.energy = Math.max(0, s.res.energy - en);
  s.b.dyson += made;
  s.bought.dyson = (s.bought.dyson ?? 0) + made;
  s.eff.swarmfab = e;
  const rm = needM ? FAB_MAX * netM / needM : 1, re = needE ? FAB_MAX * netE / needE : 1;
  const lim = e >= 0.995 ? null : rm <= re ? "metal" : "energy";
  const prev: Partial<NonNullable<State["fab"]>> = s.fab ?? {};
  s.fab = { m: m / dt, e: en / dt, made: made / dt, lim, target: null, bank: prev.bank ?? { metal: 0, energy: 0, plasma: 0 }, built: prev.built ?? { lifter: 0, separator: 0 } };
  chainTick(s, dt, lim);
}
// Loděnice dostavuje i těžební řetězec, když ji brzdí kov: chybí-li plazma, trychtýř, jinak separátor.
// Bere jen podíl čistého přírůstku, který zbyde po kolektorech, takže zásoby nevyčerpá.
export const CHAIN_SHARE = 0.3;
export function chainTarget(s: State) {
  if (!s.b.lifter || !s.b.separator || !isUnlocked(s, "lifter") || !isUnlocked(s, "separator")) return null;
  if (s.off.lifter || s.off.separator) return null;
  // separátor jen když plazma přibývá (aspoň 10 % výroby trychtýřů), jinak trychtýř
  const { p, c } = rates(s);
  if (p.plasma - c.plasma > 0.1 * p.plasma) return "separator";
  return (s.eff.lifter ?? 1) < 0.97 ? null : "lifter";
}
export function chainTick(s: State, dt, lim) {
  const f = s.fab, target = lim === "metal" ? chainTarget(s) : null;
  f.target = target;
  if (!target) return;
  const { p, c } = rates(s);
  for (const r of ["metal", "energy", "plasma"]) {
    const v = Math.max(0, p[r] - c[r]) * CHAIN_SHARE * dt;
    const take = Math.min(v, s.res[r]);
    s.res[r] -= take;
    f.bank[r] += take;
  }
  for (let k = 0; k < 2; k++) {
    const cst = cost(s, target);
    if (!keys(cst).every((r) => f.bank[r] >= cst[r])) break;
    for (const r of keys(cst)) (f.bank as Record<string, number>)[r] -= cst[r];
    s.b[target] += 1;
    s.bought[target] = (s.bought[target] ?? 0) + 1;
    f.built[target] += 1;
  }
  // co se do řetězce nepoužije (jiné suroviny než cíl), se vrací do skladu
  const need = cost(s, target);
  for (const r of ["metal", "energy", "plasma"]) if (!(r in need) && f.bank[r] > 0) {
    s.res[r] += f.bank[r];
    f.bank[r] = 0;
  }
}
export function powerW(s: State) {
  let w = reactorW(s);
  for (const id of BUILDING_IDS) if (s.b[id] && B[id].prod?.energy) w += prodOf(s, id, "energy") * s.b[id];
  return w;
}
export function kardashev(s: State) {
  return (Math.log10(Math.max(1, powerW(s))) - 6) / 10;
}
export const effOf = (s: State, id: BuildingId) => B[id].cons ? s.off[id] ? 0 : s.eff[id] ?? 1 : 1;
export function rates(s: State) {
  const p = zeroRates(), c = zeroRates();
  p.energy += reactorW(s);
  for (const id of BUILDING_IDS) {
    const n = s.b[id];
    if (!n) continue;
    const e = effOf(s, id);
    for (const r of keys(B[id].prod ?? {})) p[r] += prodOf(s, id, r) * n * e;
    if (id !== "injector") for (const r of keys(B[id].cons ?? {})) c[r] += consOf(s, id, r) * n * e;
  }
  if (s.r.auto && !s.chapterDone) p.ore += clickPower(s) * RULES.autoClicksPerSec;
  if (ventOpen(s) && ventTank(s) < 0.999) c.plasma += ventFill(s);
  return { p, c };
}
export function rateParts(s: State, r) {
  const prod = [], cons = [];
  if (r === "energy") prod.push(["reactor", reactorW(s)]);
  for (const id of BUILDING_IDS) {
    const n = s.b[id];
    if (!n) continue;
    const e = effOf(s, id);
    const pv = prodOf(s, id, r), cv = consOf(s, id, r);
    if (pv) prod.push([id, pv * n * e]);
    if (cv) cons.push([id, cv * n * e]);
  }
  if (r === "ore" && s.r.auto && !s.chapterDone) prod.push(["auto", clickPower(s) * RULES.autoClicksPerSec]);
  return { prod, cons };
}
export function add(s: State, r: Res, v: number) {
  s.res[r] += v;
  s.total[r] += v;
}
export function cost(s: State, id: BuildingId, n = s.bought[id] ?? Math.floor(s.b[id])) {
  const d = B[id], o: Amounts = {};
  const extra = id === "dyson" && s.p.base >= 0 ? Math.pow(TUNE.g2 / d.growth, Math.max(0, n - s.p.base)) : 1;
  const ch1 = id === "dyson" && !s.chapterDone && n < DYSON_CH1_CHEAP ? DYSON_CH1_DISCOUNT : 1;
  for (const r of keys(d.base)) o[r] = d.base[r] * Math.pow(d.growth, n) * extra * (r === "metal" ? ch1 : 1);
  return o;
}
export function affordable(s: State, c: Amounts) {
  return keys(c).every((r) => s.res[r] >= c[r]);
}
export function pay(s: State, c: Amounts) {
  for (const r of keys(c)) s.res[r] -= c[r];
}
export function isUnlocked(s: State, id: BuildingId) {
  return !retired(s, id) && B[id].unlock(s);
}
export function buy(s: State, id: BuildingId, max: boolean | number = false) {
  if (!isUnlocked(s, id)) return 0;
  const limit = max === true ? 1e4 : typeof max === "number" ? max : 1;
  if (limit > 1 && limit < 1e4 && previewMax(s, id, limit).count < limit) return 0;
  let k = 0;
  while (k < limit) {
    const c = cost(s, id);
    if (!affordable(s, c)) break;
    pay(s, c);
    s.b[id] += 1;
    s.bought[id] = (s.bought[id] ?? 0) + 1;
    k++;
  }
  return k;
}
export const SELL_REFUND = 0.5;
export function sell(s: State, id: BuildingId, n = 1) {
  let k = 0;
  while (k < n && Math.floor(s.b[id]) >= 1) {
    s.b[id] -= 1;
    s.bought[id] = Math.max(0, (s.bought[id] ?? 1) - 1);
    const c = cost(s, id);
    for (const r of keys(c)) s.res[r] += c[r] * SELL_REFUND;
    k++;
  }
  return k;
}
export function previewMax(s: State, id: BuildingId, limit = 1e4, all = false) {
  const res = { ...s.res };
  let n = s.bought[id] ?? Math.floor(s.b[id]);
  let count = 0;
  const total: Amounts = {};
  while (count < limit) {
    const c = cost(s, id, n);
    if (!all && !keys(c).every((r) => res[r] >= c[r])) break;
    for (const r of keys(c)) {
      res[r] -= c[r];
      total[r] = (total[r] ?? 0) + c[r];
    }
    n++;
    count++;
  }
  return { count, total };
}
export function researchAvailable(s: State, id: ResearchId) {
  return !s.r[id] && (!R[id].req || R[id].req(s));
}
export function doResearch(s: State, id: ResearchId) {
  if (!researchAvailable(s, id) || !affordable(s, R[id].cost)) return false;
  pay(s, R[id].cost);
  s.r[id] = true;
  return true;
}
export function travelTime(_s: State, id) {
  return L[id].time;
}
export function locationOpen(s: State, id: LocationId) {
  return id !== "belt" && (!L[id].req || L[id].req(s) || !!s.visited[id]);
}
export function canTravel(s: State, id: LocationId) {
  return !!s.r.scan && !s.travel && locationOpen(s, id) && !s.visited[id] && s.res.energy >= L[id].cost;
}
export function depart(s: State, id: LocationId) {
  if (!canTravel(s, id)) return false;
  s.res.energy -= L[id].cost;
  s.travel = { from: s.loc, to: id, t: 0, total: id === "belt" ? 8 : travelTime(s, id) };
  return true;
}
export function eventReward(s: State, id: EventId) {
  const ev = EVENTS[id];
  const { p } = rates(s);
  return Math.max(ev.min, p[ev.res] * ev.seconds);
}
export function claimEvent(s: State) {
  if (!s.event) return null;
  const id = s.event.id, amount2 = eventReward(s, id);
  add(s, EVENTS[id].res, amount2);
  s.event = null;
  s.nextEvent = RULES.eventEverySec[0] + Math.random() * (RULES.eventEverySec[1] - RULES.eventEverySec[0]);
  return { id, amount: amount2 };
}
export function mine(s: State) {
  const p = clickPower(s);
  add(s, "ore", p);
  s.clicks++;
  return p;
}
export function tick(s: State, dt, rng = Math.random) {
  add(s, "energy", reactorW(s) * dt);
  for (const id of BUILDING_IDS) {
    const d = B[id], n = s.b[id];
    if (!n || d.cons) continue;
    for (const r of keys(d.prod ?? {})) add(s, r, prodOf(s, id, r) * n * dt);
    if (d.makes && !d.cons) s.b[d.makes.building] += makesOf(s, id) * Math.floor(n) * dt;
  }
  if (s.r.auto && !s.chapterDone) add(s, "ore", clickPower(s) * RULES.autoClicksPerSec * dt);
  for (const id of CONVERTERS) {
    if (id === "injector") continue; // injektory berou plyn z magnetické pasti (ventTick)
    const d = B[id], n = s.b[id];
    if (!n || s.off[id]) {
      s.eff[id] = n ? 0 : 1;
      continue;
    }
    const need = (keys(d.cons) as Res[]).map((r): [Res, number] => [r, consOf(s, id, r) * n * dt]);
    let e = 1;
    for (const [r, v] of need) if (v > 0) e = Math.min(e, s.res[r] / v);
    // trychtýře se přivřou, když je ve skladu víc plazmatu, než separátory zpracují za 2 minuty
    if (id === "lifter") {
      const room = plasmaCap(s) - s.res.plasma, made1 = prodOf(s, id, "plasma") * n * dt;
      if (made1 > 0) e = Math.min(e, Math.max(0, room / made1));
    }
    e = Math.max(0, Math.min(1, e));
    const out = (keys(d.prod ?? {}) as Res[]).map((r): [Res, number] => [r, prodOf(s, id, r) * n * dt * e]);
    const made = d.makes ? makesOf(s, id) * Math.floor(n) * dt * e : 0;
    for (const [r, v] of need) s.res[r] -= v * e;
    for (const [r, v] of out) add(s, r, v);
    if (id === "separator") {
      const got = out.reduce((a, [, v]) => a + v, 0);
      s.p.run += got;
      s.p.total = (s.p.total ?? s.p.run - got) + got;
    }
    if (d.makes) s.b[d.makes.building] += made;
    s.eff[id] = e;
  }
  fabTick(s, dt);
  if (s.travel) {
    s.travel.t += dt;
    if (s.travel.t >= s.travel.total) {
      s.visited[s.travel.to] = true;
      s.loc = "belt";
      s.travel = null;
    }
  }
  if (s.event) {
    s.event.ttl -= dt;
    if (s.event.ttl <= 0) {
      s.event = null;
      s.nextEvent = RULES.eventEverySec[0];
    }
  } else {
    s.nextEvent -= dt;
    if (s.nextEvent <= 0) {
      const ok = EVENT_IDS.filter((id) => EVENTS[id].unlock(s));
      if (ok.length) s.event = { id: ok[Math.floor(rng() * ok.length)], ttl: RULES.eventTtlSec };
      else s.nextEvent = 90;
    }
  }
  if (s.chapterDone >= 1 && !s.star.done) {
    const d = stageDef(s), lp = Math.log10(Math.max(1, stageValue(s))), ln = Math.log10(stageNeed(s));
    if (s.star.p0 === void 0) s.star.p0 = Math.min(lp, ln - 1);
    const pf = ln > s.star.p0 ? Math.max(0, Math.min(1, (lp - s.star.p0) / (ln - s.star.p0))) : 1;
    const f0 = s.star.t / d.sec, speed = 1 + STAR.catchUp * Math.max(0, pf - f0);
    s.star.t = Math.min(d.sec * Math.max(pf, f0), s.star.t + dt * speed, d.sec);
    if (s.star.collapse >= 0) {
      s.star.collapse -= dt;
      if (s.star.collapse <= 0) supernova(s);
    }
  }
  s.time += dt;
  const k = kardashev(s);
  if (k > s.peakK) s.peakK = k;
  if (!s.chapterDone && k >= RULES.chapter1K) s.chapterDone = 1;
  if (s.chapterDone >= 1 && s.p.base < 0) s.p.base = Math.floor(s.b.dyson);
  salvageTick(s);
  yearsTick(s, dt);
  if (s.star.done) { holeTick(s, dt); ventTick(s, dt); }
  return checkJournal(s);
}
export function clockYears(s: State) {
  const d = stageDef(s);
  return d.years / d.sec;
}
export const LAST_STAGE = STAGES.length - 1;
export const stageByMetal = (s: State) => !!stageDef(s).needM;
export const stageNeed = (s: State) => stageDef(s).needM ?? stageDef(s).needW;
export const stageValue = (s: State) => stageByMetal(s) ? s.p.total ?? s.p.run : powerW(s);
export function stageReady(s: State) {
  const d = stageDef(s);
  const time = s.star.t >= d.sec, power2 = stageValue(s) >= stageNeed(s);
  const research = s.star.stage < LAST_STAGE || !!s.r.neutrino;
  return { time, power: power2, research, ok: s.chapterDone >= 1 && !s.star.done && s.star.collapse < 0 && time && power2 && research };
}
export function redLoss(s: State) {
  if (s.star.stage !== 0 || s.r.highorbit) return { dyson: 0, lifter: 0 };
  return { dyson: Math.floor(s.b.dyson * STAR.redLoss), lifter: Math.floor(s.b.lifter) };
}
export function advanceStage(s: State) {
  if (!stageReady(s).ok) return false;
  if (s.star.stage >= LAST_STAGE) {
    s.star.collapse = STAR.collapseSec;
    return true;
  }
  const loss = redLoss(s);
  if (loss.dyson || loss.lifter) {
    s.b.dyson -= loss.dyson;
    s.bought.dyson = Math.max(0, (s.bought.dyson ?? 0) - loss.dyson);
    s.b.lifter -= loss.lifter;
    s.bought.lifter = Math.max(0, (s.bought.lifter ?? 0) - loss.lifter);
  }
  s.star.stage++;
  s.star.t = 0;
  s.star.p0 = void 0;
  return true;
}
export const STAR_BUILDINGS: BuildingId[] = ["dyson", "lifter", "separator", "seismo", "swarmfab"];
export function supernova(s: State) {
  const cov = coverage(s);
  add(s, "energy", STAR.snEnergyJ * cov);
  add(s, "metal", 2 * 1989e27 * cov);
  for (const id of STAR_BUILDINGS) {
    s.b[id] = 0;
    s.bought[id] = 0;
    s.off[id] = false;
  }
  s.res.plasma = 0;
  s.star.collapse = -1;
  s.star.done = true;
  if (s.event?.id === "prominence" || s.event?.id === "flare") s.event = null;
  if (s.chapterDone < 2) s.chapterDone = 2;
}
export function canRebuild(s: State) {
  return REBUILD_ON && !!s.r.redesign && !s.star.done && s.star.collapse < 0 && prestigeGain(s) >= 1;
}
export function rebuild(s: State) {
  if (!canRebuild(s)) return 0;
  const g = prestigeGain(s);
  s.p.pts += g;
  s.p.run = 0;
  s.p.count++;
  const keep = Math.max(0, s.p.base);
  const left = { dyson: keep, lifter: 1, separator: 1 };
  for (const id of STAR_BUILDINGS) {
    s.b[id] = left[id] ?? 0;
    s.bought[id] = left[id] ?? 0;
  }
  s.res.metal = 0;
  s.res.energy = 0;
  s.res.plasma = 0;
  return g;
}
export function checkJournal(s: State) {
  const out: string[] = [];
  const day = Math.floor(s.time) + 1;
  for (const st of STORY) if (!s.story[st.id] && st.when(s)) {
    s.story[st.id] = true;
    s.log.unshift({ key: "story." + st.id, kind: "story", day });
    out.push(st.id);
  }
  const ctx2 = { powerW: powerW(s) };
  for (const f of FACTS) if (!s.facts[f.id] && f.when(s, ctx2)) {
    s.facts[f.id] = true;
    s.log.unshift({ key: "fact." + f.id, kind: "fact", day });
    out.push(f.id);
  }
  if (s.log.length > 120) s.log.length = 120;
  return out;
}
export function offlineGain(s: State, seconds: number) {
  const sec = Math.min(Math.max(0, seconds), RULES.offlineCapSec);
  const { p, c } = rates(s);
  const got = {};
  for (const r of RESOURCES) {
    const net = p[r] - c[r];
    if (net > 0) {
      const v = net * sec * RULES.offlineShare;
      add(s, r, v);
      got[r] = v;
    }
  }
  return got;
}
