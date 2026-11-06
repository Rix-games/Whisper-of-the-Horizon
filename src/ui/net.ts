// Kapitola 4: kreslení sítě mostů v rameni galaxie, ústí červí díry, profilu hrdla a mapy galaxie.
// Vrstvy: 1) pozadí ramene a hvězdné pole (cache podle velikosti), 2) soustavy a mosty, 3) tok, vlna a záblesky.
import type { State } from '../core/state.js';
import { L, type LocationId } from '../core/defs.js';
import { HOME, MAP, NET, NODE, NODES, type GNode, type NodeType, capBase, capOf, hitTime, inWave, isConnected, isRevealed, syncWin, wavePhase } from '../core/bridge.js';
import { sfbm } from './scene.js';

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const MONO = '"JetBrains Mono", ui-monospace, monospace';
const EXO = '142,240,200';      // #8ef0c8 exotická hmota
const AMBER = '242,165,65';
const COOL = '111,168,255';
const PULSE = '184,146,255';

function prep(c: HTMLCanvasElement) {
  const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
  if (!W || !H) return null;
  if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
  const x = c.getContext('2d')!;
  x.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { x, W, H, dpr };
}

// ---------- geometrie mapy ----------
export interface Geo { ox: number; oy: number; k: number; W: number; H: number }
export function netGeo(W: number, H: number): Geo {
  const m = 26, k = Math.min((W - 2 * m) / MAP.w, (H - 2 * m - 18) / MAP.h);
  return { ox: (W - MAP.w * k) / 2, oy: (H - 18 - MAP.h * k) / 2, k, W, H };
}
export const toPx = (g: Geo, n: { x: number; y: number }): [number, number] => [g.ox + n.x * g.k, g.oy + n.y * g.k];
/** Velikost soustavy na mapě podle výkonu (px). */
export function nodeR(n: GNode) {
  if (n.type === 'home') return 9;
  if (n.type === 'dark') return 8;
  return Math.max(3, Math.min(13, 2.2 + (Math.log10(Math.max(1, n.L)) - 24) * 0.82));
}
export function hitNode(g: Geo, s: State, mx: number, my: number): string | null {
  let best: string | null = null, bd = Infinity;
  for (const n of [HOME, ...NODES]) {
    if (!isRevealed(s, n)) continue;
    const [px, py] = toPx(g, n), d = Math.hypot(mx - px, my - py);
    if (d < Math.max(16, nodeR(n) + 8) && d < bd) { bd = d; best = n.id; }
  }
  return best;
}
export function hitLink(g: Geo, s: State, mx: number, my: number): string | null {
  let best: string | null = null, bd = 11;
  for (const id in s.bridge.links) {
    const [ax, ay] = toPx(g, NODE[s.bridge.links[id].p]), [bx, by] = toPx(g, NODE[id]);
    const dx = bx - ax, dy = by - ay, t = Math.max(0.12, Math.min(0.88, ((mx - ax) * dx + (my - ay) * dy) / (dx * dx + dy * dy || 1)));
    const d = Math.hypot(mx - (ax + dx * t), my - (ay + dy * t));
    if (d < bd) { bd = d; best = id; }
  }
  return best;
}

// ---------- pozadí: výřez spirálního ramene ----------
const bgCache = new Map<string, HTMLCanvasElement>();
function armBg(W: number, H: number, dpr: number, g: Geo) {
  const key = `${W}x${H}@${dpr}`;
  let cv = bgCache.get(key);
  if (cv) return cv;
  if (bgCache.size > 4) bgCache.clear();
  cv = document.createElement('canvas');
  cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
  const x = cv.getContext('2d')!;
  // šum ramene v nízkém rozlišení, pak roztáhnout (rychlé a měkké)
  const lw = Math.max(64, Math.round(W / 4)), lh = Math.max(40, Math.round(H / 4));
  const lo = document.createElement('canvas'); lo.width = lw; lo.height = lh;
  const lx = lo.getContext('2d')!, img = lx.createImageData(lw, lh), d = img.data;
  for (let j = 0; j < lh; j++) for (let i = 0; i < lw; i++) {
    const mx = ((i / lw) * W - g.ox) / g.k, my = ((j / lh) * H - g.oy) / g.k;
    // osa ramene: od domova (vlevo dole) šikmo vzhůru doprava, lehce prohnutá
    const ax = mx, ay = 0.78 - mx * 0.42 + 0.08 * Math.sin(mx * 2.2);
    const dy = (my - ay) / 0.5, band = Math.exp(-dy * dy * 1.3);
    const n1 = sfbm(mx * 2.4 + 3, my * 2.4 + 7, 4), n2 = sfbm(mx * 6 + 11, my * 6 - 4, 3);
    const lane = Math.exp(-Math.pow((my - ay + 0.07 + n2 * 0.06) / 0.05, 2)) * band;   // tmavý prachový pás
    const glow = Math.max(0, band * (0.55 + n1 * 0.7) - lane * 0.9);
    const warm = Math.max(0, n2) * band;
    const o = (j * lw + i) * 4;
    d[o] = 10 + glow * 52 + warm * 30; d[o + 1] = 12 + glow * 44 + warm * 12; d[o + 2] = 26 + glow * 72 + warm * 6; d[o + 3] = 255;
    void ax;
  }
  lx.putImageData(img, 0, 0);
  x.imageSmoothingEnabled = true;
  x.drawImage(lo, 0, 0, cv.width, cv.height);
  x.setTransform(dpr, 0, 0, dpr, 0, 0);
  // tři vrstvy hvězd (vzdálené drobné, střední, pár jasných)
  let sd = 11;
  const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
  for (let i = 0; i < W * H / 260; i++) {
    const px = r() * W, py = r() * H, mx = (px - g.ox) / g.k, my = (py - g.oy) / g.k;
    const ay = 0.78 - mx * 0.42 + 0.08 * Math.sin(mx * 2.2), inBand = Math.exp(-Math.pow((my - ay) / 0.42, 2) * 1.6);
    if (r() > 0.35 + inBand * 0.65) continue;
    const layer = r(), a = layer < 0.75 ? 0.25 + r() * 0.3 : layer < 0.96 ? 0.45 + r() * 0.35 : 0.8;
    const col = r() < 0.2 ? `rgba(255,214,170,${a})` : r() < 0.1 ? `rgba(170,200,255,${a})` : `rgba(220,228,255,${a})`;
    x.fillStyle = col;
    const sz = layer < 0.75 ? 0.7 : layer < 0.96 ? 1.1 : 1.7;
    x.fillRect(px, py, sz, sz);
  }
  // měřítko
  const ly = Math.round(1000 / MAP.ly * g.k);
  x.strokeStyle = 'rgba(176,181,212,0.55)'; x.lineWidth = 1;
  x.beginPath(); x.moveTo(14, H - 14); x.lineTo(14 + ly, H - 14); x.moveTo(14, H - 18); x.lineTo(14, H - 10); x.moveTo(14 + ly, H - 18); x.lineTo(14 + ly, H - 10); x.stroke();
  x.font = `12px ${MONO}`; x.fillStyle = 'rgba(176,181,212,0.75)'; x.textAlign = 'left';
  x.fillText('1 000 ly', 20 + ly, H - 10);
  bgCache.set(key, cv);
  return cv;
}

// ---------- soustavy ----------
const TYPE_COL: Record<NodeType, string> = {
  home: '232,236,255', red: '255,138,106', sun: '255,233,184', binary: '255,243,214', neutron: '230,251,255', blue: '188,216,255',
  assoc: '170,205,255', cluster: '255,242,220', nebula: '255,150,190', arm: '214,222,255', kilo: '245,205,85', dark: '142,240,200'
};
function drawNode(x: CanvasRenderingContext2D, n: GNode, px: number, py: number, time: number, on: boolean) {
  const r = nodeR(n), c = TYPE_COL[n.type], seed = n.x * 97 + n.y * 61;
  if (n.type === 'home') {
    // domovská díra: tmavý stín s jantarovým prstencem
    x.fillStyle = '#000'; x.beginPath(); x.arc(px, py, r * 0.8, 0, 7); x.fill();
    x.strokeStyle = `rgba(${AMBER},0.95)`; x.lineWidth = 2; x.beginPath(); x.ellipse(px, py, r * 1.8, r * 0.6, -0.3, 0, 7); x.stroke();
    x.strokeStyle = 'rgba(255,220,170,0.6)'; x.lineWidth = 1; x.beginPath(); x.arc(px, py, r * 0.95, 0, 7); x.stroke();
    return;
  }
  if (n.type === 'dark') {
    // temný uzel nesvítí: jen prstenec gravitační čočky
    x.setLineDash([3, 4]); x.strokeStyle = `rgba(${c},${on ? 0.85 : 0.5})`; x.lineWidth = 1.3;
    x.beginPath(); x.arc(px, py, r + Math.sin(time * 0.8 + seed) * 0.6, 0, 7); x.stroke(); x.setLineDash([]);
    x.strokeStyle = `rgba(${c},0.18)`; x.beginPath(); x.arc(px, py, r * 1.7, 0, 7); x.stroke();
    return;
  }
  const halo = x.createRadialGradient(px, py, 0, px, py, r * 2.6);
  halo.addColorStop(0, `rgba(${c},0.32)`); halo.addColorStop(1, `rgba(${c},0)`);
  x.fillStyle = halo; x.beginPath(); x.arc(px, py, r * 2.6, 0, 7); x.fill();
  if (n.type === 'cluster' || n.type === 'assoc' || n.type === 'arm') {
    // shluk bodů (hvězdokupa, asociace, úsek ramene)
    const k = n.type === 'arm' ? 26 : n.type === 'cluster' ? 14 : 6;
    let sd = Math.floor(seed * 1000) % 2147483646 + 1;
    const rr = () => (sd = sd * 16807 % 2147483647) / 2147483647;
    for (let i = 0; i < k; i++) {
      const a = rr() * 6.283, d = Math.pow(rr(), n.type === 'cluster' ? 1.6 : 0.8) * r * 1.25;
      x.fillStyle = `rgba(${i % 4 === 0 && n.type !== 'cluster' ? '188,216,255' : c},${0.55 + rr() * 0.45})`;
      const sz = n.type === 'arm' ? 1.3 : 1.5;
      x.fillRect(px + Math.cos(a) * d - sz / 2, py + Math.sin(a) * d - sz / 2, sz, sz);
    }
  } else if (n.type === 'nebula') {
    for (let i = 0; i < 3; i++) {
      const a = seed + i * 2.1, g = x.createRadialGradient(px + Math.cos(a) * r * 0.5, py + Math.sin(a) * r * 0.5, 0, px, py, r * 1.6);
      g.addColorStop(0, i === 1 ? 'rgba(127,211,234,0.35)' : `rgba(${c},0.38)`); g.addColorStop(1, `rgba(${c},0)`);
      x.fillStyle = g; x.beginPath(); x.arc(px, py, r * 1.6, 0, 7); x.fill();
    }
    x.fillStyle = 'rgba(255,255,255,0.9)'; x.fillRect(px - 1, py - 1, 2, 2);
  } else if (n.type === 'binary') {
    const a = time * 0.6 + seed;
    for (const [k, rad] of [[0, r * 0.7], [Math.PI, r * 0.5]] as [number, number][]) {
      x.fillStyle = k ? 'rgba(255,217,160,1)' : `rgba(${c},1)`;
      x.beginPath(); x.arc(px + Math.cos(a + k) * r * 0.55, py + Math.sin(a + k) * r * 0.55, rad, 0, 7); x.fill();
    }
  } else if (n.type === 'kilo') {
    x.strokeStyle = `rgba(${c},0.8)`; x.lineWidth = 1.2; x.beginPath(); x.arc(px, py, r * 1.2, 0, 7); x.stroke();
    x.strokeStyle = `rgba(${EXO},0.6)`; x.beginPath(); x.arc(px, py, r * 1.8 + Math.sin(time + seed) * 1.5, 0, 7); x.stroke();
    x.fillStyle = 'rgba(255,248,220,1)'; x.beginPath(); x.arc(px, py, r * 0.45, 0, 7); x.fill();
  } else {
    x.fillStyle = `rgba(${c},1)`; x.beginPath(); x.arc(px, py, n.type === 'neutron' ? r * 0.55 : r * 0.75, 0, 7); x.fill();
    if (n.type === 'neutron') {
      // maják pulsaru: krátké záblesky dvou kuželů
      const a = (reduce ? 0.8 : time * 2.6) + seed, len = r * 3.2;
      x.fillStyle = `rgba(${c},0.45)`;
      for (const k of [0, Math.PI]) {
        x.beginPath(); x.moveTo(px, py);
        x.lineTo(px + Math.cos(a + k - 0.12) * len, py + Math.sin(a + k - 0.12) * len);
        x.lineTo(px + Math.cos(a + k + 0.12) * len, py + Math.sin(a + k + 0.12) * len); x.closePath(); x.fill();
      }
    }
  }
  if (on) {
    // roj kolem napojené soustavy: tenký prstenec v barvě exotiky
    x.setLineDash([2, 3]); x.strokeStyle = `rgba(${EXO},0.7)`; x.lineWidth = 1;
    x.beginPath(); x.ellipse(px, py, r * 1.9 + 3, (r * 1.9 + 3) * 0.55, (reduce ? 0 : time * 0.15) + seed, 0, 7); x.stroke(); x.setLineDash([]);
  }
}

// ---------- celá síť ----------
export interface NetUI {
  flow: { supply: Record<string, number>; flow: Record<string, number> };
  hover: string | null; hoverLink: string | null; sel: string | null;
  drag: { from: string; mx: number; my: number; to: string | null; ok: boolean; cost: string } | null;
  raider: string; router: string; raiderFrom: string; raiderP: number;
  pulseText: string; flashes: { id: string; t: number; ok: boolean }[]; burst: { id: string; t: number }[];
}
export function drawNet(c: HTMLCanvasElement, s: State, ui: NetUI, time: number, names: (n: GNode) => string) {
  const p = prep(c); if (!p) return;
  const { x, W, H, dpr } = p, g = netGeo(W, H), tt = reduce ? 0 : time;
  x.drawImage(armBg(W, H, dpr, g), 0, 0, W, H);
  const links = s.bridge.links, ph = wavePhase(s);
  // vlna pulsu od domova
  const [hx, hy] = toPx(g, HOME);
  for (const off of s.bridge.lv.dbl ? [0, NET.pulse / 2] : [0]) {
    const q = (ph - off + NET.pulse) % NET.pulse, rad = q * NET.wave * g.k;
    if (rad > 0 && rad < Math.hypot(W, H)) {
      const a = Math.max(0, 0.5 * (1 - q / 4));
      x.strokeStyle = `rgba(${PULSE},${a})`; x.lineWidth = 1.6; x.beginPath(); x.arc(hx, hy, rad, 0, 7); x.stroke();
      x.strokeStyle = `rgba(${PULSE},${a * 0.35})`; x.lineWidth = 6; x.beginPath(); x.arc(hx, hy, rad, 0, 7); x.stroke();
    }
  }
  // mosty
  for (const id in links) {
    const l = links[id], [ax, ay] = toPx(g, NODE[l.p]), [bx, by] = toPx(g, NODE[id]);
    const sup = ui.flow.supply[id] ?? 0, cap = capOf(s, l), fl = ui.flow.flow[id] ?? 0, full = sup > cap * 0.999;
    const lock = l.lk > 0, wide = 1.4 + Math.min(4.6, l.lv * 0.28), win = inWave(s, id);
    const col = lock ? (l.la ? '226,240,255' : '244,246,255') : full ? AMBER : COOL;
    const age = Math.min(1, (s.time - (l.t ?? 0)) / 1.2);
    const ex = ax + (bx - ax) * age, ey = ay + (by - ay) * age;
    if (full && !lock) { x.strokeStyle = `rgba(${AMBER},0.2)`; x.lineWidth = wide + 7; x.beginPath(); x.moveTo(ax, ay); x.lineTo(ex, ey); x.stroke(); }
    if (lock) { x.strokeStyle = `rgba(255,255,255,${l.la ? 0.08 : 0.14})`; x.lineWidth = wide + 9; x.beginPath(); x.moveTo(ax, ay); x.lineTo(ex, ey); x.stroke(); }
    if (win) { x.strokeStyle = `rgba(${PULSE},0.55)`; x.lineWidth = wide + 6; x.beginPath(); x.moveTo(ax, ay); x.lineTo(ex, ey); x.stroke(); }
    if (ui.router === id) { x.strokeStyle = `rgba(${EXO},${0.35 + 0.25 * Math.sin(tt * 4)})`; x.lineWidth = wide + 4; x.beginPath(); x.moveTo(ax, ay); x.lineTo(ex, ey); x.stroke(); }
    x.strokeStyle = `rgba(${col},${id === ui.sel || id === ui.hoverLink ? 1 : 0.85})`; x.lineWidth = wide;
    x.beginPath(); x.moveTo(ax, ay); x.lineTo(ex, ey); x.stroke();
    // tok domů: ubíhající čárkování, rychlost podle toku
    if (fl > 0 && age >= 1) {
      const sp = 10 + Math.max(0, Math.log10(fl) - 30) * 6;
      x.setLineDash([2 + Math.min(4, wide * 0.6), 9]); x.lineDashOffset = -tt * sp * (lock ? 1.8 : 1);
      x.strokeStyle = lock ? 'rgba(255,255,255,0.95)' : full ? 'rgba(255,241,214,0.95)' : 'rgba(207,226,255,0.85)'; x.lineWidth = Math.max(1, wide * 0.55);
      x.beginPath(); x.moveTo(bx, by); x.lineTo(ax, ay); x.stroke(); x.setLineDash([]); x.lineDashOffset = 0;
    }
    // ústí: drobné čočky na obou koncích
    for (const [qx, qy] of [[ax, ay], [bx, by]] as [number, number][]) {
      x.strokeStyle = `rgba(${col},0.7)`; x.lineWidth = 1; x.beginPath(); x.arc(qx + (bx - ax) * (qx === ax ? 0.06 : -0.06), qy + (by - ay) * (qx === ax ? 0.06 : -0.06), 2.2 + wide * 0.3, 0, 7); x.stroke();
    }
    // přetlak u ústí plného mostu
    if (full) {
      const k = Math.min(1, Math.log10(sup / cap + 1) * 2), gg = x.createRadialGradient(bx, by, 0, bx, by, 18 + k * 14);
      gg.addColorStop(0, `rgba(${AMBER},${0.35 * k + 0.1 * Math.sin(tt * 3)})`); gg.addColorStop(1, `rgba(${AMBER},0)`);
      x.fillStyle = gg; x.beginPath(); x.arc(bx, by, 32, 0, 7); x.fill();
    }
  }
  // razič: most se teprve otevírá
  if (ui.raider && ui.raiderFrom && NODE[ui.raider] && NODE[ui.raiderFrom]) {
    const [ax, ay] = toPx(g, NODE[ui.raiderFrom]), [bx, by] = toPx(g, NODE[ui.raider]);
    x.setLineDash([6, 6]); x.lineDashOffset = -tt * 8; x.strokeStyle = `rgba(${EXO},0.5)`; x.lineWidth = 1.4;
    x.beginPath(); x.moveTo(ax, ay); x.lineTo(ax + (bx - ax) * Math.max(0.08, ui.raiderP), ay + (by - ay) * Math.max(0.08, ui.raiderP)); x.stroke(); x.setLineDash([]); x.lineDashOffset = 0;
  }
  // soustavy
  for (const n of [...NODES, HOME]) {
    if (!isRevealed(s, n)) continue;
    const [px, py] = toPx(g, n), on = isConnected(s, n.id);
    drawNode(x, n, px, py, tt, on && n.type !== 'home');
  }
  // tah myší: nový most
  const dr = ui.drag;
  if (dr) {
    const [ax, ay] = toPx(g, NODE[dr.from]);
    const tx = dr.to ? toPx(g, NODE[dr.to])[0] : dr.mx, ty = dr.to ? toPx(g, NODE[dr.to])[1] : dr.my;
    // dosah mostu kolem výchozí soustavy
    x.strokeStyle = `rgba(${EXO},0.18)`; x.setLineDash([2, 6]); x.lineWidth = 1; x.beginPath(); x.arc(ax, ay, NET.reach * g.k, 0, 7); x.stroke();
    x.setLineDash([6, 5]); x.strokeStyle = dr.to ? (dr.ok ? `rgba(${EXO},0.95)` : 'rgba(224,101,106,0.9)') : 'rgba(176,181,212,0.6)'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(ax, ay); x.lineTo(tx, ty); x.stroke(); x.setLineDash([]);
    if (dr.cost) label(x, dr.cost, tx + 12, ty - 12, dr.ok ? `rgb(${EXO})` : '#e0656a', W);
  }
  // záblesky zámků a vyvalení toku po rozšíření
  for (let i = ui.flashes.length - 1; i >= 0; i--) {
    const f = ui.flashes[i], age = time - f.t, l = links[f.id];
    if (age > 0.9 || !l) { ui.flashes.splice(i, 1); continue; }
    const [ax, ay] = toPx(g, NODE[l.p]), [bx, by] = toPx(g, NODE[f.id]), mx = (ax + bx) / 2, my = (ay + by) / 2;
    x.strokeStyle = f.ok ? `rgba(255,255,255,${1 - age / 0.9})` : `rgba(176,181,212,${0.6 * (1 - age / 0.9)})`; x.lineWidth = 2;
    x.beginPath(); x.arc(mx, my, 6 + age * 40, 0, 7); x.stroke();
  }
  for (let i = ui.burst.length - 1; i >= 0; i--) {
    const f = ui.burst[i], age = time - f.t, l = links[f.id];
    if (age > 1.4 || !l) { ui.burst.splice(i, 1); continue; }
    // vlna toku po rozšíření: od vzdáleného ústí k domovu
    const [ax, ay] = toPx(g, NODE[l.p]), [bx, by] = toPx(g, NODE[f.id]), k = age / 1.4;
    const qx = bx + (ax - bx) * k, qy = by + (ay - by) * k, gg = x.createRadialGradient(qx, qy, 0, qx, qy, 16);
    gg.addColorStop(0, `rgba(255,246,220,${1 - k})`); gg.addColorStop(1, 'rgba(255,246,220,0)');
    x.fillStyle = gg; x.beginPath(); x.arc(qx, qy, 16, 0, 7); x.fill();
  }
  // jména: domov, výběr, co je pod myší a nejjasnější napojené soustavy; popisky se nepřekrývají
  x.font = `12px ${MONO}`;
  const boxes: [number, number, number, number][] = [];
  const hot = (n: GNode) => n.id === ui.hover || n.id === ui.drag?.to || n.id === ui.drag?.from || n.id === ui.sel || n.id === ui.raider;
  const lit = [...NODES].filter((n) => isRevealed(s, n) && isConnected(s, n.id)).sort((a, b) => b.L - a.L).slice(0, 8);
  const order = [HOME, ...NODES.filter((n) => isRevealed(s, n) && hot(n)), ...lit];
  for (const n of order) {
    const [px, py] = toPx(g, n), r = nodeR(n), txt = names(n), w = x.measureText(txt).width;
    const right = px > W - 140, lx = right ? px - r - 6 - w : px + r + 6, ly = py - r - 3;
    const box: [number, number, number, number] = [lx - 2, ly - 12, w + 4, 16];
    if (!hot(n) && n.type !== 'home' && boxes.some((q) => q[0] < box[0] + box[2] && box[0] < q[0] + q[2] && q[1] < box[1] + box[3] && box[1] < q[1] + q[3])) continue;
    boxes.push(box);
    x.fillStyle = 'rgba(8,10,22,0.55)'; x.fillRect(box[0], box[1], box[2], box[3]);
    x.fillStyle = hot(n) ? 'rgba(232,236,255,1)' : n.type === 'home' ? `rgba(${AMBER},0.95)` : 'rgba(176,181,212,0.85)';
    x.textAlign = 'left';
    x.fillText(txt, lx, ly);
  }
  x.textAlign = 'left';
  // puls vlevo dole
  x.font = `12px ${MONO}`; x.fillStyle = `rgba(${PULSE},0.9)`; x.fillText(ui.pulseText, 14, H - 30);
}
function label(x: CanvasRenderingContext2D, t: string, px: number, py: number, col: string, W: number) {
  x.font = `600 12px ${MONO}`;
  const w = x.measureText(t).width + 12, lx = Math.min(W - w - 6, px);
  x.fillStyle = 'rgba(10,12,24,0.85)'; x.fillRect(lx, py - 14, w, 20);
  x.fillStyle = col; x.textAlign = 'left'; x.fillText(t, lx + 6, py);
}
/** Kdy projde vlna mostem – pro text „vlna za X s“ u vybraného mostu. */
export function waveIn(s: State, id: string) {
  const l = s.bridge.links[id];
  if (!l) return 0;
  const th = hitTime(id, l), ph = wavePhase(s);
  let d = th - ph;
  if (d < -syncWin(s) / 2) d += NET.pulse;
  return Math.max(0, d);
}

// ---------- ústí: skleněná koule s ohnutým obrazem druhé strany (Ellisova červí díra) ----------
const skyCache = new Map<string, HTMLCanvasElement>();
function skyTex(n: GNode, px: number) {
  const key = n.id + px;
  let cv = skyCache.get(key);
  if (cv) return cv;
  if (skyCache.size > 12) skyCache.clear();
  cv = document.createElement('canvas'); cv.width = cv.height = px;
  const x = cv.getContext('2d')!, c = TYPE_COL[n.type === 'home' ? 'sun' : n.type];
  const bg = x.createLinearGradient(0, 0, px, px);
  bg.addColorStop(0, '#06070f'); bg.addColorStop(0.5, `rgba(${c},0.22)`); bg.addColorStop(1, '#05060d');
  x.fillStyle = '#05060d'; x.fillRect(0, 0, px, px); x.fillStyle = bg; x.fillRect(0, 0, px, px);
  let sd = Math.floor(n.x * 1e4 + n.y * 7e3) + 3;
  const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
  // pás Mléčné dráhy z druhé strany
  for (let i = 0; i < px * 3; i++) {
    const t = r(), yy = px * (0.35 + 0.3 * t) + (r() - 0.5) * px * 0.18;
    x.fillStyle = `rgba(235,236,255,${0.08 + r() * 0.2})`; x.fillRect(r() * px, yy, 1, 1);
  }
  for (let i = 0; i < px * px / 140; i++) { x.fillStyle = `rgba(230,236,255,${0.3 + r() * 0.6})`; x.fillRect(r() * px, r() * px, r() < 0.06 ? 2 : 1, r() < 0.06 ? 2 : 1); }
  // cílová soustava jasně uprostřed
  const g = x.createRadialGradient(px * 0.5, px * 0.48, 0, px * 0.5, px * 0.48, px * 0.32);
  g.addColorStop(0, `rgba(255,255,255,1)`); g.addColorStop(0.08, `rgba(${c},0.95)`); g.addColorStop(0.4, `rgba(${c},0.18)`); g.addColorStop(1, `rgba(${c},0)`);
  x.fillStyle = g; x.fillRect(0, 0, px, px);
  // kruhová maska s měkkým okrajem: otočené kopie pak nevytvoří hranaté „desky“
  x.globalCompositeOperation = 'destination-in';
  const m = x.createRadialGradient(px / 2, px / 2, px * 0.3, px / 2, px / 2, px / 2);
  m.addColorStop(0, 'rgba(0,0,0,1)'); m.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = m; x.fillRect(0, 0, px, px);
  x.globalCompositeOperation = 'source-over';
  skyCache.set(key, cv);
  return cv;
}
export function drawMouth(c: HTMLCanvasElement, n: GNode, time: number, title: string, sub: string) {
  const p = prep(c); if (!p) return;
  const { x, W, H } = p, cx = W / 2, cy = H / 2 - 10, R = Math.min(W, H) * 0.36, tt = reduce ? 0 : time;
  x.clearRect(0, 0, W, H);
  const tex = skyTex(n, 256);
  // obraz za koulí (vlastní obloha) a v kouli obloha druhé strany, ohnutá jako čočka
  x.save(); x.beginPath(); x.arc(cx, cy, R, 0, 7); x.clip();
  x.fillStyle = '#05060d'; x.fillRect(cx - R, cy - R, R * 2, R * 2);
  x.translate(cx, cy); x.rotate(tt * 0.04);
  for (let k = 0; k < 6; k++) {
    const f = 1 - k * 0.14, s = R * 2.6 * f;
    x.globalAlpha = k ? 0.4 : 1;
    x.save(); x.rotate(k * 0.9); x.scale(1, 1 - k * 0.04); x.drawImage(tex, -s / 2, -s / 2, s, s); x.restore();
  }
  x.restore(); x.globalAlpha = 1;
  // Einsteinův prstenec a okraj koule
  const rim = x.createRadialGradient(cx, cy, R * 0.78, cx, cy, R * 1.04);
  rim.addColorStop(0, 'rgba(255,255,255,0)'); rim.addColorStop(0.75, 'rgba(232,236,255,0.55)'); rim.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = rim; x.beginPath(); x.arc(cx, cy, R * 1.04, 0, 7); x.fill();
  x.strokeStyle = 'rgba(138,144,184,0.45)'; x.lineWidth = 1; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.stroke();
  const hl = x.createRadialGradient(cx - R * 0.4, cy - R * 0.45, 0, cx - R * 0.4, cy - R * 0.45, R * 0.5);
  hl.addColorStop(0, 'rgba(255,255,255,0.16)'); hl.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = hl; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fill();
  x.textAlign = 'center'; x.font = `600 14px "Chakra Petch", ${MONO}`; x.fillStyle = 'rgba(232,236,255,0.95)';
  x.fillText(title, cx, cy + R + 22);
  x.font = `12px ${MONO}`; x.fillStyle = 'rgba(176,181,212,0.85)'; x.fillText(sub, cx, cy + R + 40);
  x.textAlign = 'left';
}

// ---------- profil hrdla (vnořený diagram Morris–Thorne) ----------
export interface ThroatView { a: GNode; b: GNode; lv: number; fill: number; lock: boolean; title: string; lines: string[]; aName: string; bName: string }
export function drawThroat(c: HTMLCanvasElement, v: ThroatView, time: number) {
  const p = prep(c); if (!p) return;
  const { x, W, H } = p, cx = W / 2, top = 46, bot = H - 40, mid = (top + bot) / 2, tt = reduce ? 0 : time;
  x.fillStyle = '#070913'; x.fillRect(0, 0, W, H);
  const span = (bot - top) / 2, wMax = Math.min(W * 0.42, 300), r0 = 14 + Math.min(40, v.lv * 2.6);
  // tvar: r(y) = r0·cosh — trychtýř, hrdlo, trychtýř
  const rad = (t: number) => r0 + (wMax - r0) * Math.pow(Math.abs(t), 2.2);
  const ca = TYPE_COL[v.a.type === 'home' ? 'home' : v.a.type], cb = TYPE_COL[v.b.type];
  for (let i = 0; i <= 12; i++) {
    const t = -1 + i / 6, y = mid + t * span, r = rad(t);
    x.strokeStyle = `rgba(${t < 0 ? ca : cb},${0.18 + 0.4 * (1 - Math.abs(t))})`; x.lineWidth = i === 6 ? 2.2 : 1;
    if (i === 6) x.strokeStyle = v.lock ? 'rgba(255,255,255,1)' : v.fill >= 0.999 ? `rgba(${AMBER},1)` : 'rgba(232,236,255,0.9)';
    x.beginPath(); x.ellipse(cx, y, r, r * 0.16, 0, 0, 7); x.stroke();
  }
  for (const sgn of [-1, 1]) {
    x.strokeStyle = 'rgba(232,236,255,0.55)'; x.lineWidth = 1.4; x.beginPath();
    for (let i = 0; i <= 60; i++) { const t = -1 + i / 30, y = mid + t * span, px = cx + sgn * rad(t); i ? x.lineTo(px, y) : x.moveTo(px, y); }
    x.stroke();
  }
  // záře hrdla podle vytížení
  const gl = x.createRadialGradient(cx, mid, 0, cx, mid, r0 * 2.4);
  gl.addColorStop(0, v.lock ? 'rgba(255,255,255,0.3)' : v.fill >= 0.999 ? `rgba(${AMBER},0.35)` : 'rgba(207,226,255,0.18)'); gl.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = gl; x.beginPath(); x.ellipse(cx, mid, r0 * 2.4, r0 * 0.8, 0, 0, 7); x.fill();
  // tok domů: čárkování shora (vzdálená soustava) dolů (domov)
  x.setLineDash([4, 8]); x.lineDashOffset = -tt * (v.lock ? 40 : 22); x.strokeStyle = 'rgba(255,241,214,0.9)'; x.lineWidth = 2;
  x.beginPath(); x.moveTo(cx, top + 20); x.lineTo(cx, bot - 20); x.stroke(); x.setLineDash([]); x.lineDashOffset = 0;
  // měřítko hrdla
  x.strokeStyle = `rgb(${EXO})`; x.lineWidth = 1.2;
  x.beginPath(); x.moveTo(cx - r0, mid - 14); x.lineTo(cx + r0, mid - 14); x.moveTo(cx - r0, mid - 19); x.lineTo(cx - r0, mid - 9); x.moveTo(cx + r0, mid - 19); x.lineTo(cx + r0, mid - 9); x.stroke();
  x.font = `600 15px "Chakra Petch", ${MONO}`; x.fillStyle = 'rgba(232,236,255,0.95)'; x.textAlign = 'left';
  x.fillText(v.title, 16, 26);
  x.font = `13px ${MONO}`;
  x.fillStyle = `rgba(${cb},0.95)`; x.fillText(v.bName, 16, top + 6);
  x.fillStyle = `rgba(${ca},0.95)`; x.fillText(v.aName, 16, bot + 18);
  x.fillStyle = 'rgba(176,181,212,0.95)';
  v.lines.forEach((ln, i) => x.fillText(ln, Math.min(W - 230, cx + r0 + 26), mid - 2 + i * 18));
}

// ---------- mapa galaxie s misemi ----------
const GAL_IDS: LocationId[] = ['flyby', 'magnetar', 'globular', 'kilonova', 'frb', 'rotation', 'bubbles'];
let galBg: HTMLCanvasElement | null = null, galKey = '';
function galGeo(W: number, H: number) {
  const R = Math.min(W * 0.46, H * 0.46 / 0.62);
  return { cx: W / 2, cy: H / 2, R, tilt: 0.62 };
}
/** Poloha mise: orbit = vzdálenost od středu galaxie (0–1), angle = úhel. Domov je na 0,55 ve směru 3,6 rad. */
function galPos(id: LocationId, g: ReturnType<typeof galGeo>): [number, number] {
  const d = L[id] as { orbit: number; angle: number };
  return [g.cx + Math.cos(d.angle) * d.orbit * g.R, g.cy + Math.sin(d.angle) * d.orbit * g.R * g.tilt];
}
export const GAL_HOME = { r: 0.58, a: 4.19 };
export function drawGalaxy(c: HTMLCanvasElement, s: State, time: number, names: (id: LocationId) => string, open: (id: LocationId) => boolean) {
  const p = prep(c); if (!p) return;
  const { x, W, H, dpr } = p, g = galGeo(W, H), tt = reduce ? 0 : time;
  const key = `${W}x${H}@${dpr}`;
  if (galKey !== key || !galBg) {
    galKey = key; galBg = document.createElement('canvas'); galBg.width = Math.round(W * dpr); galBg.height = Math.round(H * dpr);
    const bx = galBg.getContext('2d')!; bx.scale(dpr, dpr);
    bx.fillStyle = '#05060f'; bx.fillRect(0, 0, W, H);
    let sd = 5;
    const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
    for (let i = 0; i < W * H / 500; i++) { bx.fillStyle = `rgba(220,228,255,${r() * 0.4})`; bx.fillRect(r() * W, r() * H, 1, 1); }
    // jádro (příčka) a dvě hlavní ramena jako logaritmické spirály, mezi nimi prach a mlhoviny
    bx.save(); bx.translate(g.cx, g.cy); bx.scale(1, g.tilt);
    const disk = bx.createRadialGradient(0, 0, 0, 0, 0, g.R);
    disk.addColorStop(0, 'rgba(120,130,190,0.16)'); disk.addColorStop(1, 'rgba(60,70,120,0)');
    bx.fillStyle = disk; bx.beginPath(); bx.arc(0, 0, g.R, 0, 7); bx.fill();
    for (let i = 0; i < 14000; i++) {
      const arm = i % 2, th = 5.4 * Math.sqrt(r()), rr = 0.1 * Math.exp(0.42 * th) + (r() - 0.5) * 0.06 * (1 + th * 0.25);
      if (rr > 1.02 || rr < 0.05) continue;
      const a = th + arm * Math.PI + (r() - 0.5) * 0.3, px = Math.cos(a) * rr * g.R, py = Math.sin(a) * rr * g.R;
      const k = r();
      if (k < 0.08) { bx.fillStyle = 'rgba(150,170,255,0.05)'; bx.beginPath(); bx.arc(px, py, 7, 0, 7); bx.fill(); continue; }
      bx.fillStyle = k < 0.4 ? `rgba(170,200,255,${0.3 + r() * 0.5})` : `rgba(255,236,214,${0.2 + r() * 0.45})`;
      const sz = r() < 0.04 ? 2 : 1;
      bx.fillRect(px, py, sz, sz);
      if (k > 0.992) { bx.fillStyle = 'rgba(255,150,190,0.35)'; bx.beginPath(); bx.arc(px, py, 2.2, 0, 7); bx.fill(); }
    }
    const core = bx.createRadialGradient(0, 0, 0, 0, 0, g.R * 0.3);
    core.addColorStop(0, 'rgba(255,240,210,0.95)'); core.addColorStop(0.25, 'rgba(255,214,160,0.5)'); core.addColorStop(1, 'rgba(255,200,150,0)');
    bx.fillStyle = core; bx.beginPath(); bx.ellipse(0, 0, g.R * 0.3, g.R * 0.22, 0.5, 0, 7); bx.fill();
    bx.restore();
  }
  x.drawImage(galBg, 0, 0, W, H);
  // naše oblast (výřez sítě mostů)
  const hx = g.cx + Math.cos(GAL_HOME.a) * GAL_HOME.r * g.R, hy = g.cy + Math.sin(GAL_HOME.a) * GAL_HOME.r * g.R * g.tilt;
  x.strokeStyle = `rgba(${EXO},0.8)`; x.lineWidth = 1.2; x.strokeRect(hx - 26, hy - 16, 52, 32);
  x.font = `12px ${MONO}`; x.fillStyle = `rgba(${EXO},0.95)`; x.textAlign = 'center'; x.fillText(names('home' as LocationId), hx, hy + 30);
  for (const id of GAL_IDS) {
    if (!open(id)) continue;
    const [px, py] = galPos(id, g), done = !!s.visited[id], fly = s.travel?.to === id;
    x.strokeStyle = done ? `rgba(${EXO},0.9)` : `rgba(${AMBER},0.95)`; x.lineWidth = 1.5;
    x.beginPath(); x.arc(px, py, 7 + (done || reduce ? 0 : Math.sin(tt * 2) * 1.5), 0, 7); x.stroke();
    if (done) { x.fillStyle = `rgba(${EXO},0.5)`; x.beginPath(); x.arc(px, py, 4, 0, 7); x.fill(); }
    if (fly && s.travel) {
      const k = s.travel.t / s.travel.total;
      x.setLineDash([3, 5]); x.strokeStyle = `rgba(${EXO},0.6)`; x.beginPath(); x.moveTo(hx, hy); x.lineTo(px, py); x.stroke(); x.setLineDash([]);
      x.fillStyle = `rgb(${EXO})`; x.beginPath(); x.arc(hx + (px - hx) * k, hy + (py - hy) * k, 3, 0, 7); x.fill();
    }
    x.fillStyle = done ? 'rgba(176,181,212,0.85)' : 'rgba(232,236,255,0.95)'; x.textAlign = px > g.cx ? 'left' : 'right';
    x.fillText(names(id), px + (px > g.cx ? 12 : -12), py + 4);
  }
  x.textAlign = 'left';
}
export function galaxyHit(W: number, H: number, s: State, mx: number, my: number, open: (id: LocationId) => boolean): LocationId | null {
  const g = galGeo(W, H);
  let best: LocationId | null = null, bd = 20;
  for (const id of GAL_IDS) {
    if (!open(id) || s.visited[id]) continue;
    const [px, py] = galPos(id, g), d = Math.hypot(mx - px, my - py);
    if (d < bd) { bd = d; best = id; }
  }
  return best;
}
export { capBase };
