// Kapitola 4: Most. Síť průchodných červích děr (Morris–Thorne 1988) mezi soustavami v rameni galaxie.
// Síť je strom s kořenem doma. Záření napojených soustav sbírají roje a teče po mostech domů,
// každý most propustí nejvýš tolik, kolik unese jeho hrdlo. Puls 7,3 s posílá sítí vlnu: ťuknutí
// na most ve chvíli, kdy jím vlna prochází, ho zamkne a zvětší jeho propustnost.
import type { Link, State } from './state.js';
export type { Link };
import { B, ch4 } from './defs.js';

export type NodeType = 'home' | 'red' | 'sun' | 'binary' | 'neutron' | 'blue' | 'assoc' | 'cluster' | 'nebula' | 'arm' | 'kilo' | 'stream';
export interface GNode { id: string; name: string; type: NodeType; x: number; y: number; L: number; d: number; rank: number }

/** Mapa oblasti galaxie: šířka 1,6, výška 1 (jednotky mapy, 1 ≈ 4 000 světelných let). */
export const MAP = { w: 1.6, h: 1, ly: 4000 };
export const HOME: GNode = { id: 'home', name: '', type: 'home', x: 0.16, y: 0.6, L: 0, d: 0, rank: -1 };
export const NET = {
  reach: 0.3,          // nejdelší most (jednotky mapy)
  reveal0: 3,          // soustavy vidět hned na začátku
  open0: 2e18,         // cena prvního mostu (kg exotiky)
  openG: 1.45,         // každý další most dražší
  up0: 4e18,           // rozšíření hrdla z úrovně 0
  upG: 2.0,            // a každá další úroveň
  cap0: 2e33,          // propustnost hrdla úrovně 0 (W)
  capG: 1.35,          // propustnost za úroveň (plocha hrdla)
  swarmF: 0.05,        // kolik záření soustavy zachytí jeden roj
  trapF: 0.05,         // kolik temné hmoty zachytí jedna anihilační past
  anchorK: 0.02,       // kotvy: propustnost až ×3, víc s každou deskou
  wave: 0.55,          // rychlost vlny pulsu (jednotky mapy za s)
  pulse: 7.3,
  lockM: 1.5,          // ruční zámek
  autoM: 1.3,          // fázový zámek
  autoM2: 1.45,        // fázový zámek s Tichou sítí
  autoShare: 0.05,     // kolik čistého přírůstku exotiky si bere jeden razič/směrovač
  autoMax: 0.5,        // všichni dohromady nejvýš
  pairM: 1.1, pairM2: 1.12,
  holeData: 120,       // archiv dat při startu (sekundy výroby stanic a reaktorů)
  startExotic: 1.2e19,
  passSec: 30
};
/** Stadia Kapitoly 4. needW = výkon domů potřebný k dalšímu stadiu. */
export const BSTAGES = [
  { id: 'first', needW: 3.8e34 },
  { id: 'chain', needW: 3e35 },
  { id: 'type3', needW: 1.2e36 },
  { id: 'kilo', needW: 3.5e36 },
  { id: 'halo', needW: 6.5e36 }
];
/** Zářivý výkon typů soustav (W) – řádově podle skutečných objektů. */
const TYPE_L: Record<NodeType, number> = {
  home: 0, red: 2e25, sun: 4e26, binary: 3e27, neutron: 1e27, blue: 3e32, assoc: 3e33, cluster: 6e33, nebula: 2e34, arm: 6e35, kilo: 2e33, stream: 1.3e36
};

// ---------- generování mapy (deterministicky, stejná pro všechny hráče) ----------
function mulberry(a: number) {
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const GREEK = ['Kappa', 'Tessa', 'Hesper', 'Vrána', 'Lyra', 'Sirma', 'Mira', 'Velka', 'Ostra', 'Dalen', 'Ivra', 'Selen', 'Kora', 'Nadir', 'Ambra', 'Tilia', 'Rhea', 'Zora', 'Elva', 'Pelan'];
function nameFor(type: NodeType, r: () => number, used: Set<string>) {
  for (let k = 0; k < 50; k++) {
    const n = Math.floor(r() * 9000) + 1000;
    const g = GREEK[Math.floor(r() * GREEK.length)];
    const nm = type === 'red' ? `GJ ${n}` : type === 'sun' ? g : type === 'binary' ? `${g} A/B` : type === 'neutron' ? `PSR J${n}` : type === 'blue' ? `HD ${n * 31 % 99999}` :
      type === 'assoc' ? `OB ${g} ${1 + n % 9}` : type === 'cluster' ? `NGC ${n}` : type === 'nebula' ? `${g} · mlhovina` : type === 'arm' ? `Rameno ${String.fromCharCode(65 + n % 8)}${n % 90 + 10}` :
      type === 'kilo' ? `GW ${n}` : `Proud Sgr ${String.fromCharCode(65 + n % 6)}${n % 9 + 1}`;
    if (!used.has(nm)) { used.add(nm); return nm; }
  }
  return `X ${used.size}`;
}
function pickType(d: number, r: number): NodeType {
  if (d < 0.36) return r < 0.4 ? 'red' : r < 0.62 ? 'sun' : r < 0.76 ? 'binary' : r < 0.86 ? 'neutron' : 'blue';
  if (d < 0.72) return r < 0.3 ? 'blue' : r < 0.42 ? 'binary' : r < 0.5 ? 'neutron' : r < 0.78 ? 'assoc' : 'cluster';
  if (d < 1.08) return r < 0.28 ? 'assoc' : r < 0.52 ? 'cluster' : r < 0.86 ? 'nebula' : 'neutron';
  return r < 0.6 ? 'arm' : r < 0.85 ? 'nebula' : 'cluster';
}
function generate(seed: number) {
  const r = mulberry(seed), nodes: GNode[] = [], all: { x: number; y: number }[] = [{ x: HOME.x, y: HOME.y }];
  const free = (x: number, y: number, m: number) => all.every((p) => Math.hypot(p.x - x, p.y - y) >= m);
  const place = (n: number, ok: (x: number, y: number) => boolean, m: number) => {
    const out: { x: number; y: number }[] = [];
    for (let k = 0; k < 40000 && out.length < n; k++) {
      const x = 0.05 + r() * (MAP.w - 0.1), y = 0.06 + r() * (MAP.h - 0.12);
      if (!ok(x, y) || !free(x, y, m)) continue;
      out.push({ x, y }); all.push({ x, y });
    }
    return out;
  };
  const dist = (x: number, y: number) => Math.hypot(x - HOME.x, y - HOME.y);
  const normal = place(46, (x, y) => dist(x, y) > 0.11, 0.1);
  const used = new Set<string>();
  normal.sort((a, b) => dist(a.x, a.y) - dist(b.x, b.y)).forEach((p, i) => {
    const d = dist(p.x, p.y), type = i < 3 ? (['red', 'sun', 'neutron'] as NodeType[])[i] : pickType(d, r());
    nodes.push({ id: 'n' + i, name: nameFor(type, r, used), type, x: p.x, y: p.y, L: TYPE_L[type] * Math.pow(10, r() * 0.6 - 0.3), d, rank: i });
  });
  // kilonova: tři uzly bohaté na exotiku v polovině ramene; halo: temné uzly na okrajích mapy
  place(3, (x, y) => dist(x, y) > 0.7 && dist(x, y) < 1.05, 0.09).forEach((p, i) => nodes.push({ id: 'k' + i, name: nameFor('kilo', r, used), type: 'kilo', x: p.x, y: p.y, L: TYPE_L.kilo * (1 + i * 0.4), d: dist(p.x, p.y), rank: 100 + i }));
  place(6, (x, y) => dist(x, y) > 0.95 && (y < 0.2 || y > 0.8 || x > 1.4), 0.09).forEach((p, i) => nodes.push({ id: 'd' + i, name: nameFor('stream', r, used), type: 'stream', x: p.x, y: p.y, L: TYPE_L.stream * Math.pow(10, r() * 0.4 - 0.2), d: dist(p.x, p.y), rank: 200 + i }));
  return nodes;
}
/** Každá soustava musí jít dosáhnout mosty o délce nejvýš NET.reach. */
function connectedAll(nodes: GNode[]) {
  const seen = new Set<string>(['home']), q: GNode[] = [HOME];
  while (q.length) {
    const a = q.shift()!;
    for (const b of nodes) if (!seen.has(b.id) && Math.hypot(a.x - b.x, a.y - b.y) <= NET.reach * 0.92) { seen.add(b.id); q.push(b); }
  }
  return seen.size === nodes.length + 1;
}
let seed0 = 7331;
let gen = generate(seed0);
while (!connectedAll(gen) && seed0 < 7431) gen = generate(++seed0);
export const NODES: GNode[] = gen;
export const NODE: Record<string, GNode> = Object.fromEntries([HOME, ...NODES].map((n) => [n.id, n]));
const NORMAL = NODES.filter((n) => n.rank < 100);

// ---------- co je vidět ----------
export function revealCount(s: State) {
  const b = Math.floor(s.b.beacon);
  return NET.reveal0 + b + (s.r.interf ? Math.floor(b / 2) : 0) + (s.visited.flyby ? 2 : 0);
}
export function isRevealed(s: State, n: GNode) {
  if (n.type === 'home') return true;
  if (n.type === 'kilo') return !!s.visited.kilonova;
  if (n.type === 'stream') return !!s.visited.rotation;
  return n.rank < revealCount(s) || !!s.bridge.links[n.id];
}
export const revealed = (s: State) => NODES.filter((n) => isRevealed(s, n));
export const isConnected = (s: State, id: string) => id === 'home' || !!s.bridge.links[id];
export const dist = (a: GNode, b: GNode) => Math.hypot(a.x - b.x, a.y - b.y);
export const linkLen = (id: string, l: Link) => dist(NODE[l.p], NODE[id]);

// ---------- výkon soustav a propustnost ----------
export function capture(s: State) {
  return 1 - Math.exp(-Math.floor(s.b.bswarm) * NET.swarmF * pairMult(s));
}
export function trapCapture(s: State) {
  return 1 - Math.exp(-Math.floor(s.b.trap) * NET.trapF * (s.r.microlens ? 3 : 1));
}
export const pairMult = (s: State) => Math.pow(s.r.pairs2 ? NET.pairM2 : NET.pairM, Math.floor(s.b.pair));
export function countType(s: State, t: NodeType) {
  let n = 0;
  for (const id in s.bridge.links) if (NODE[id]?.type === t) n++;
  return n;
}
/** Kolik záření soustava pošle do svého mostu (bez omezení hrdel). */
export function nodeOut(s: State, n: GNode, links = s.bridge.links) {
  if (n.type === 'home') return 0;
  if (n.type === 'stream') return n.L * trapCapture(s);
  let v = n.L * capture(s);
  if (s.r.spectral && (n.type === 'blue' || n.type === 'assoc')) v *= 2;
  if (n.type === 'cluster' && s.visited.globular) v *= 2;
  // kulová hvězdokupa posílí sousedy ve stromu (rodiče i děti) ×1,5
  const l = links[n.id];
  if (l && NODE[l.p]?.type === 'cluster') v *= 1.5;
  for (const id in links) if (links[id].p === n.id && NODE[id].type === 'cluster') { v *= 1.5; break; }
  return v;
}
/** Síla jedné kotvy: roste s počtem Casimirových desek (každých 20 desek +100 %). */
export const anchorPer = (s: State, plates = Math.floor(s.b.plate)) => NET.anchorK * (1 + plates / 20);
/** Kotvy ústí: propustnost všech mostů, nasycení nejvýš ×3 (každá další kotva přidá o něco méně). */
export function anchorMult(s: State, anchors = Math.floor(s.b.anchor), plates = Math.floor(s.b.plate)) {
  return 1 + 2 * (1 - Math.exp(-anchors * anchorPer(s, plates)));
}
export function lockMult(s: State, l: Link) {
  if (l.lk <= 0) return 1;
  return l.la ? s.r.quiet ? NET.autoM2 : NET.autoM : NET.lockM;
}
/** Propustnost hrdla bez zámku (W). */
export function capBase(s: State, lv: number) {
  return NET.cap0 * Math.pow(NET.capG, lv) * anchorMult(s) * (s.r.widen ? 1.5 : 1);
}
export const capOf = (s: State, l: Link) => capBase(s, l.lv) * lockMult(s, l);
export interface Flow { supply: Record<string, number>; flow: Record<string, number>; total: number }
/** Tok sítí odspodu stromem: každý most nese svou větev, nejvýš svou propustnost. */
export function network(s: State, links = s.bridge.links, override?: { id: string; lv: number }): Flow {
  const kids: Record<string, string[]> = {};
  for (const id in links) (kids[links[id].p] ??= []).push(id);
  const supply: Record<string, number> = {}, flow: Record<string, number> = {};
  const walk = (id: string): number => {
    let sum = id === 'home' ? 0 : nodeOut(s, NODE[id], links);
    for (const k of kids[id] ?? []) sum += walk(k);
    if (id === 'home') return sum;
    const l = links[id], lv = override?.id === id ? override.lv : l.lv;
    supply[id] = sum;
    flow[id] = Math.min(sum, capBase(s, lv) * lockMult(s, l));
    return flow[id];
  };
  const total = walk('home');
  return { supply, flow, total };
}
let netCache = { key: '', v: { supply: {}, flow: {}, total: 0 } as Flow };
/** Síť pro aktuální stav (s krátkou pamětí, výpočet se volá často). */
export function netNow(s: State) {
  const key = `${s.time}|${s.bridge.n}|${s.b.bswarm}|${s.b.trap}|${s.b.anchor}|${s.b.pair}|${Object.keys(s.r).length}|${Object.values(s.bridge.links).map((l) => l.lv + (l.lk > 0 ? (l.la ? 'a' : 'm') : '')).join()}`;
  if (key !== netCache.key) netCache = { key, v: network(s) };
  return netCache.v;
}
export function netPower(s: State) {
  return ch4(s) && s.bridge.started ? netNow(s).total : 0;
}

// ---------- otevírání a rozšiřování ----------
export function openCost(s: State, from: string, to: string) {
  const len = dist(NODE[from], NODE[to]);
  return NET.open0 * Math.pow(NET.openG, s.bridge.n) * (0.5 + len / 0.2);
}
export function upCost(_s: State, lv: number) {
  return NET.up0 * Math.pow(NET.upG, lv);
}
export function canLink(s: State, from: string, to: string) {
  const a = NODE[from], b = NODE[to];
  return !!a && !!b && ch4(s) && isConnected(s, from) && !isConnected(s, to) && isRevealed(s, b) && dist(a, b) <= NET.reach;
}
/** Nejlevnější napojená soustava, ze které vede most k uzlu `to`. */
export function bestFrom(s: State, to: string) {
  let best: string | null = null, bc = Infinity;
  for (const id of ['home', ...Object.keys(s.bridge.links)]) {
    if (!canLink(s, id, to)) continue;
    const c = openCost(s, id, to);
    if (c < bc) { bc = c; best = id; }
  }
  return best;
}
function addLink(s: State, from: string, to: string) {
  s.bridge.links[to] = { p: from, lv: 0, lk: 0, la: false, t: s.time };
  s.bridge.n++;
  if (NODE[to]?.type === 'cluster') s.bridge.cluster = true;
}
export function openLink(s: State, from: string, to: string) {
  if (!canLink(s, from, to)) return false;
  const c = openCost(s, from, to);
  if (s.res.exotic < c) return false;
  s.res.exotic -= c;
  addLink(s, from, to);
  return true;
}
export function widen(s: State, id: string) {
  const l = s.bridge.links[id];
  if (!l) return false;
  const c = upCost(s, l.lv);
  if (s.res.exotic < c) return false;
  s.res.exotic -= c;
  l.lv++;
  return true;
}
/** O kolik W vzroste výkon domů, když most `id` rozšíříš o úroveň. */
export function widenGain(s: State, id: string) {
  const l = s.bridge.links[id];
  if (!l) return 0;
  return Math.max(0, network(s, s.bridge.links, { id, lv: l.lv + 1 }).total - netNow(s).total);
}
/** O kolik W vzroste výkon domů s novým mostem. */
export function openGain(s: State, from: string, to: string) {
  const links = { ...s.bridge.links, [to]: { p: from, lv: 0, lk: 0, la: false, t: 0 } };
  return Math.max(0, network(s, links).total - netNow(s).total);
}
/** Nejlepší nový most podle přínosu a ceny (pro Raziče a bota). */
export function bestOpen(s: State): { from: string; to: string; cost: number; gain: number } | null {
  let best = null, bv = -1;
  for (const n of revealed(s)) {
    if (isConnected(s, n.id)) continue;
    const from = bestFrom(s, n.id);
    if (!from) continue;
    const cost = openCost(s, from, n.id), gain = openGain(s, from, n.id);
    // i úzká síť má růst do šířky: počítá se i část výkonu, kterou by soustava poslala bez hrdel
    const v = (gain + 0.15 * nodeOut(s, n)) / cost;
    if (v > bv) { bv = v; best = { from, to: n.id, cost, gain }; }
  }
  return best;
}
/** Most, který nejvíc brzdí (větev chce poslat nejvíc přes jeho propustnost). */
export function worstLink(s: State) {
  const f = netNow(s);
  let best: string | null = null, bv = 0;
  for (const id in s.bridge.links) {
    const ex = f.supply[id] - capBase(s, s.bridge.links[id].lv);
    if (ex > bv) { bv = ex; best = id; }
  }
  return best;
}
/** Most v podstromu mostu `id` (i on sám), který brzdí nejvíc: větev za ním chce poslat nejvíc přes jeho propustnost. */
export function limiter(s: State, id: string | null = null): string | null {
  const f = netNow(s), L = s.bridge.links;
  const kids: Record<string, string[]> = {};
  for (const k in L) (kids[L[k].p] ??= []).push(k);
  let best: string | null = null, bv = 1.001;
  const walk = (k: string) => {
    if (k !== 'home') { const r = (f.supply[k] ?? 0) / capOf(s, L[k]); if (r > bv) { bv = r; best = k; } }
    for (const c of kids[k] ?? []) walk(c);
  };
  walk(id ?? 'home');
  return best;
}
/** Jak plný most je (větev / propustnost). Nad 1 = hrdlo nestačí. */
export const fillOf = (s: State, id: string) => (netNow(s).supply[id] ?? 0) / capOf(s, s.bridge.links[id]);
/** Nejlepší rozšíření podle přínosu a ceny. */
export function bestWiden(s: State) {
  let best: string | null = null, bv = 0;
  const f = netNow(s);
  for (const id in s.bridge.links) {
    const l = s.bridge.links[id];
    if (f.supply[id] <= capBase(s, l.lv) * 0.999) continue;
    const v = widenGain(s, id) / upCost(s, l.lv);
    if (v > bv) { bv = v; best = id; }
  }
  return best;
}

// ---------- synchronizace s pulsem ----------
export const SYNC_UPS = { win: { base: 2e19, g: 8, max: 4 }, len: { base: 3e19, g: 8, max: 4 }, dbl: { base: 8e20, g: 1, max: 1 } };
export type SyncUp = keyof typeof SYNC_UPS;
export const SYNC_IDS = Object.keys(SYNC_UPS) as SyncUp[];
export const syncLv = (s: State, id: SyncUp) => s.bridge.lv[id] ?? 0;
export const syncWin = (s: State, l = syncLv(s, 'win')) => 1.4 + 0.3 * l;
export const lockLen = (s: State, l = syncLv(s, 'len')) => 90 + 30 * l;
export const syncCost = (s: State, id: SyncUp) => SYNC_UPS[id].base * Math.pow(SYNC_UPS[id].g, syncLv(s, id));
export function syncUpgrade(s: State, id: SyncUp) {
  const c = syncCost(s, id);
  if (!ch4(s) || syncLv(s, id) >= SYNC_UPS[id].max || s.res.exotic < c) return false;
  s.res.exotic -= c;
  s.bridge.lv[id] = syncLv(s, id) + 1;
  return true;
}
/** Kdy po začátku pulsu projde vlna středem mostu (s). */
export function hitTime(id: string, l: Link) {
  const a = NODE[l.p], b = NODE[id];
  return Math.hypot((a.x + b.x) / 2 - HOME.x, (a.y + b.y) / 2 - HOME.y) / NET.wave;
}
export const wavePhase = (s: State) => s.time % NET.pulse;
/** Jak daleko od vlny most je (s). Při Vícenásobné vlně jde vlna dvakrát za puls. */
export function waveOff(s: State, id: string) {
  const l = s.bridge.links[id];
  if (!l) return 99;
  const th = hitTime(id, l), ph = wavePhase(s);
  let off = Math.abs(ph - th);
  if (syncLv(s, 'dbl')) off = Math.min(off, Math.abs(ph - NET.pulse / 2 - th), Math.abs(ph + NET.pulse / 2 - th));
  return off;
}
export const inWave = (s: State, id: string) => waveOff(s, id) <= syncWin(s) / 2;
/** Ťuknutí na most: když jím zrovna prochází vlna, most se zamkne. */
export function tapLock(s: State, id: string) {
  const l = s.bridge.links[id];
  if (!l || !inWave(s, id)) return false;
  l.lk = lockLen(s);
  l.la = false;
  s.bridge.locks++;
  return true;
}
export const lockedCount = (s: State) => Object.values(s.bridge.links).filter((l) => l.lk > 0).length;

// ---------- automatika ----------
export function autoShares(s: State) {
  const nr = s.off.raider ? 0 : Math.floor(s.b.raider), nt = s.off.router ? 0 : Math.floor(s.b.router);
  const want = NET.autoShare * (nr + nt), k = want > NET.autoMax ? NET.autoMax / want : 1;
  return { raider: NET.autoShare * nr * k, router: NET.autoShare * nt * k };
}
/** Výroba exotiky (kg/s) bez automatiky. */
export function exoticProd(s: State, prodOf: (id: any, r: any) => number) {
  let v = 0;
  for (const id of ['plate', 'pump', 'kcol'] as const) if (s.b[id] >= 1) v += prodOf(id, 'exotic') * Math.floor(s.b[id]);
  return v;
}
/** Krok sítě: zámky, fázové zámky, razič a směrovač, průchod. */
export function bridgeTick(s: State, dt: number, prod: number) {
  const br = s.bridge;
  for (const id in br.links) { const l = br.links[id]; if (l.lk > 0) l.lk = Math.max(0, l.lk - dt); }
  // fázové zámky: na začátku každé vlny zamknou nejvytíženější mosty, které nedrží ruční zámek
  const ph = wavePhase(s), wrapped = (br.wave ?? 0) > ph;
  br.wave = ph;
  if (wrapped && s.b.plock >= 1 && !s.off.plock) {
    const f = netNow(s), n = Math.floor(s.b.plock);
    const ids = Object.keys(br.links).filter((id) => !(br.links[id].lk > 0 && !br.links[id].la))
      .sort((a, b) => f.supply[b] / capBase(s, br.links[b].lv) - f.supply[a] / capBase(s, br.links[a].lv)).slice(0, n);
    for (const id of ids) { br.links[id].lk = lockLen(s); br.links[id].la = true; }
  }
  // razič a směrovač: berou podíl čistého přírůstku exotiky (nikdy zásoby), ale jen když mají co dělat
  const sh = autoShares(s);
  br.rate = { raider: 0, router: 0 };
  br.target ??= { raider: '', router: '' };
  for (const k of ['raider', 'router'] as const) {
    if (!sh[k]) { br.target[k] = ''; continue; }
    const tgt = k === 'raider' ? bestOpen(s) : null, wid = k === 'router' ? worstLink(s) : null;
    br.target[k] = tgt ? tgt.to : wid ?? '';
    if (!br.target[k]) continue;
    const cost = tgt ? tgt.cost : upCost(s, br.links[wid!].lv);
    const take = Math.min(prod * sh[k] * dt, Math.max(0, s.res.exotic), Math.max(0, cost - br.bank[k]));
    s.res.exotic -= take;
    br.bank[k] += take;
    br.rate[k] = take / dt;
    if (br.bank[k] >= cost * 0.9999) {
      br.bank[k] -= cost;
      if (tgt) addLink(s, tgt.from, tgt.to); else br.links[wid!].lv++;
      br.made[k]++;
    }
  }
  if (!br.fullSeen && br.n >= 1 && limiter(s)) br.fullSeen = true;
  if (br.pass >= 0) {
    br.pass -= dt;
    if (br.pass <= 0) { br.pass = -1; br.done = true; if (s.chapterDone < 4) s.chapterDone = 4; }
  }
}
/** Stadium sítě. První cíl je vždy aspoň 1,8× výkon díry, ať kapitola nezačne hotovým stadiem. */
export function bstageDef(s: State) {
  const d = BSTAGES[Math.min(s.bridge.stage, BSTAGES.length - 1)];
  return s.bridge.stage === 0 ? { ...d, needW: Math.max(d.needW, (s.bridge.holeW || 0) * 1.8) } : d;
}
export function bstageReady(s: State, power: number) {
  const d = bstageDef(s), last = s.bridge.stage >= BSTAGES.length - 1;
  const pw = power >= d.needW;
  const mission = s.bridge.stage !== 2 || !!s.visited.kilonova;
  const research = !last || !!s.r.passage;
  return { power: pw, mission, research, ok: ch4(s) && !s.bridge.done && s.bridge.pass < 0 && pw && mission && research };
}
export function bstageAdvance(s: State, power: number) {
  if (!bstageReady(s, power).ok) return false;
  if (s.bridge.stage >= BSTAGES.length - 1) s.bridge.pass = NET.passSec;
  else s.bridge.stage++;
  return true;
}
export const CH4_BUILDINGS = Object.keys(B).slice(Object.keys(B).indexOf('plate'));
