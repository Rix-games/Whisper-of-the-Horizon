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
  if (n.type === 'stream') return 8;
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
  let best: string | null = null, bd = 15;
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
  assoc: '170,205,255', cluster: '255,242,220', nebula: '255,150,190', arm: '214,222,255', kilo: '245,205,85', stream: '255,226,190'
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
  if (n.type === 'stream') {
    // hvězdný proud: roztažený oblouk drobných starých hvězd z roztrhané trpasličí galaxie
    let sd = Math.floor(seed * 1000) % 2147483646 + 1;
    const rr = () => (sd = sd * 16807 % 2147483647) / 2147483647, ang = seed % 3.14;
    for (let i = 0; i < 34; i++) {
      const t = rr() * 2 - 1, off = (rr() - 0.5) * 3.2, bend = t * t * 5;
      const qx = px + Math.cos(ang) * t * r * 3 - Math.sin(ang) * (off + bend), qy = py + Math.sin(ang) * t * r * 3 + Math.cos(ang) * (off + bend);
      x.fillStyle = `rgba(${c},${(0.35 + rr() * 0.5) * (1 - Math.abs(t) * 0.5)})`; x.fillRect(qx, qy, 1.3, 1.3);
    }
    const hg = x.createRadialGradient(px, py, 0, px, py, r * 2.2);
    hg.addColorStop(0, `rgba(${c},0.22)`); hg.addColorStop(1, `rgba(${c},0)`);
    x.fillStyle = hg; x.beginPath(); x.arc(px, py, r * 2.2, 0, 7); x.fill();
    if (on) { x.setLineDash([2, 3]); x.strokeStyle = `rgba(${EXO},0.7)`; x.lineWidth = 1; x.beginPath(); x.ellipse(px, py, r * 2.4, r * 1.1, ang, 0, 7); x.stroke(); x.setLineDash([]); }
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
  tips: { x: number; y: number; t: number; text: string; ok: boolean }[];
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
  // značky na mostech: zámek (◆ ruční, ◇ fázový) s odpočtem a plnost u vybraného/plného mostu pod myší
  x.font = `600 12px ${MONO}`; x.textAlign = 'center';
  for (const id in links) {
    const l = links[id], [ax, ay] = toPx(g, NODE[l.p]), [bx, by] = toPx(g, NODE[id]), mx = (ax + bx) / 2, my = (ay + by) / 2;
    if (l.lk > 0) {
      const k = 5;
      x.fillStyle = l.la ? 'rgba(180,215,255,0.95)' : 'rgba(255,255,255,0.98)'; x.strokeStyle = 'rgba(10,12,24,0.9)'; x.lineWidth = 2;
      x.beginPath(); x.moveTo(mx, my - k); x.lineTo(mx + k, my); x.lineTo(mx, my + k); x.lineTo(mx - k, my); x.closePath(); x.stroke(); x.fill();
      if (id === ui.sel || id === ui.hoverLink) { x.fillStyle = 'rgba(255,255,255,0.95)'; x.fillText(`×${l.la ? (s.r.quiet ? '1,45' : '1,3') : '1,5'} · ${Math.ceil(l.lk)} s`, mx, my - 10); }
    } else if (id === ui.sel || id === ui.hoverLink) {
      const sup = ui.flow.supply[id] ?? 0, cap = capOf(s, l), r = sup / cap;
      x.fillStyle = r > 1.001 ? `rgb(${AMBER})` : 'rgba(207,226,255,0.95)';
      x.fillText(r > 1.001 ? `plný · chce ${r >= 10 ? Math.round(r) : r.toFixed(1).replace('.', ',')}×` : `${Math.round(r * 100)} %`, mx, my - 10);
    }
  }
  x.textAlign = 'left';
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
  // krátké hlášky u kurzoru (zamčeno / vlna za X s)
  for (let i = ui.tips.length - 1; i >= 0; i--) {
    const q = ui.tips[i], age = time - q.t;
    if (age > 1.6 || i < ui.tips.length - 2) { ui.tips.splice(i, 1); continue; }
    x.globalAlpha = Math.min(1, (1.6 - age) * 2);
    label(x, q.text, q.x + 10, q.y - age * 14, q.ok ? '#ffffff' : `rgb(${PULSE})`, W);
    x.globalAlpha = 1;
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
const hash2 = (i: number, j: number, k: number) => { const v = Math.sin(i * 127.1 + j * 311.7 + k * 74.7) * 43758.5453; return v - Math.floor(v); };
/** Obloha druhé strany v bodě (X, Y): hvězdy, pás Mléčné dráhy, mlhovina v barvě cílové soustavy a cílová hvězda uprostřed. */
function skyAt(X: number, Y: number, col: number[], seed: number): number[] {
  const band = Math.exp(-Math.pow(Y * 0.9 - X * 0.35 + 0.15, 2) * 3.2) * (0.55 + 0.45 * sfbm(X * 1.6 + seed, Y * 1.6, 3));
  const neb = Math.max(0, sfbm(X * 1.1 + seed * 3, Y * 1.1 - seed, 3) + 0.1);
  let r = 5 + band * 34 + neb * col[0] * 0.28, g = 6 + band * 32 + neb * col[1] * 0.22, b = 13 + band * 44 + neb * col[2] * 0.3;
  const ci = Math.floor(X * 26), cj = Math.floor(Y * 26), h = hash2(ci, cj, seed);
  if (h > 0.93) {
    const ox = ci + 0.5 - X * 26, oy = cj + 0.5 - Y * 26, d = ox * ox + oy * oy, w = Math.exp(-d * 9) * (h - 0.93) * 14 * 255;
    const warm = hash2(cj, ci, 3) > 0.7;
    r += w * (warm ? 1 : 0.85); g += w * (warm ? 0.85 : 0.9); b += w * (warm ? 0.65 : 1);
  }
  const rr = Math.hypot(X, Y), core = Math.exp(-Math.pow(rr / 0.05, 2)) * 255, glow = Math.exp(-rr / 0.22);
  return [r + core + glow * col[0] * 0.7, g + core + glow * col[1] * 0.7, b + core + glow * col[2] * 0.7];
}
/** Ústí jako čočka (Ellisova červí díra): uvnitř je celá obloha druhé strany stlačená k okraji do Einsteinova prstence. */
function lensTex(n: GNode, px: number) {
  const key = n.id + px;
  let cv = skyCache.get(key);
  if (cv) return cv;
  if (skyCache.size > 12) skyCache.clear();
  cv = document.createElement('canvas'); cv.width = cv.height = px;
  const x = cv.getContext('2d')!, img = x.createImageData(px, px), d = img.data, c = px / 2;
  const col = TYPE_COL[n.type === 'home' ? 'sun' : n.type].split(',').map(Number), seed = (n.x * 13 + n.y * 7) % 10;
  for (let j = 0; j < px; j++) for (let i = 0; i < px; i++) {
    const u = (i - c) / c, v = (j - c) / c, rho = Math.hypot(u, v);
    if (rho > 1) continue;
    // čím blíž k okraji, tím větší kus oblohy druhé strany: β = tan(ρ·π/2)·0,3
    const k = Math.tan(Math.min(1.5, rho * Math.PI / 2)) * 0.3 / Math.max(1e-4, rho);
    const [r, g, b] = skyAt(u * k, v * k, col, seed);
    const ring = Math.exp(-Math.pow((rho - 0.93) / 0.035, 2)) * 70, edge = Math.pow(rho, 6) * 30;
    const o = (j * px + i) * 4;
    d[o] = Math.min(255, r + ring + edge); d[o + 1] = Math.min(255, g + ring + edge); d[o + 2] = Math.min(255, b + ring * 1.1 + edge * 1.2);
    d[o + 3] = Math.min(255, (1 - rho) * c * 3 * 255);
  }
  x.putImageData(img, 0, 0);
  skyCache.set(key, cv);
  return cv;
}
export function drawMouth(c: HTMLCanvasElement, n: GNode, time: number, title: string, sub: string, sub2 = '') {
  const p = prep(c); if (!p) return;
  const { x, W, H } = p, cx = W / 2, cy = H / 2 - 18, R = Math.min(W, H) * 0.34, tt = reduce ? 0 : time;
  x.clearRect(0, 0, W, H);
  // naše strana: slabé světlo ohnuté kolem koule
  const halo = x.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.5);
  halo.addColorStop(0, 'rgba(160,175,255,0.22)'); halo.addColorStop(1, 'rgba(160,175,255,0)');
  x.fillStyle = halo; x.beginPath(); x.arc(cx, cy, R * 1.5, 0, 7); x.fill();
  x.save(); x.translate(cx, cy); x.rotate(tt * 0.03);
  x.drawImage(lensTex(n, 300), -R, -R, R * 2, R * 2);
  x.restore();
  // jemný třpyt okraje, který obíhá (světlo naší strany, které hrdlo stáčí kolem)
  const a0 = tt * 0.4;
  x.strokeStyle = 'rgba(232,236,255,0.35)'; x.lineWidth = 1.2;
  x.beginPath(); x.arc(cx, cy, R * 1.01, a0, a0 + 1.1); x.stroke();
  x.beginPath(); x.arc(cx, cy, R * 1.01, a0 + Math.PI, a0 + Math.PI + 0.7); x.stroke();
  const hl = x.createRadialGradient(cx - R * 0.42, cy - R * 0.48, 0, cx - R * 0.42, cy - R * 0.48, R * 0.45);
  hl.addColorStop(0, 'rgba(255,255,255,0.14)'); hl.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = hl; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fill();
  x.textAlign = 'center'; x.font = `600 14px "Chakra Petch", ${MONO}`; x.fillStyle = 'rgba(232,236,255,0.95)';
  x.fillText(title, cx, cy + R + 26);
  x.font = `12px ${MONO}`; x.fillStyle = 'rgba(176,181,212,0.85)'; x.fillText(sub, cx, cy + R + 44);
  if (sub2) { x.fillStyle = 'rgba(142,240,200,0.8)'; x.fillText(sub2, cx, cy + R + 60); }
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
// Mléčná dráha jako příčková spirála: čtyři ramena (logaritmické spirály, sklon ~12°), prachové pásy na vnitřní straně
// ramen, růžové oblasti tvorby hvězd, příčka a výduť. Domov (díra po Aldře) leží v rameni Persea, Slunce o kus blíž ke středu.
const GAL_IDS: LocationId[] = ['flyby', 'magnetar', 'globular', 'kilonova', 'frb', 'rotation', 'bubbles'];
const GB = 0.3, GR0 = 0.11;
const ARMS = [
  { ph: 0, w: 1, key: 'perseus' }, { ph: Math.PI, w: 1, key: 'scutum' },
  { ph: Math.PI / 2, w: 0.45, key: 'sagittarius' }, { ph: Math.PI * 1.5, w: 0.45, key: 'norma' }
];
const armTh = (ph: number, r: number) => ph + Math.log(r / GR0) / GB;
const wrapA = (a: number) => { a = (a + Math.PI) % (Math.PI * 2); return a < 0 ? a + Math.PI : a - Math.PI; };
export const GAL_HOME = { r: 0.66, a: armTh(0, 0.66) };
const GAL_SUN = { r: 0.56, a: armTh(0, 0.66) - 0.12 };
/** Polohy misí v rovině galaxie (r 0–1, úhel). Vztažené k domovu, aby dávaly smysl na mapě. */
const GAL_POS: Record<string, { r: number; a: number }> = {
  flyby: { r: 0.7, a: GAL_HOME.a + 0.1 }, magnetar: { r: 0.6, a: GAL_HOME.a - 0.55 }, globular: { r: 0.93, a: GAL_HOME.a + 0.9 },
  kilonova: { r: 0.46, a: GAL_HOME.a + 0.7 }, frb: { r: 1.0, a: GAL_HOME.a + 2.6 }, rotation: { r: 0.98, a: GAL_HOME.a - 1.6 }, bubbles: { r: 0.03, a: 1.57 }
};
let galBg: HTMLCanvasElement | null = null, galKey = '';
function galGeo(W: number, H: number) {
  const tilt = 0.6, R = Math.min(W * 0.45, (H - 30) * 0.47 / tilt);
  return { cx: W / 2, cy: H / 2 + 6, R, tilt };
}
const galXY = (g: ReturnType<typeof galGeo>, r: number, a: number): [number, number] => [g.cx + Math.cos(a) * r * g.R, g.cy + Math.sin(a) * r * g.R * g.tilt];
function galPos(id: LocationId, g: ReturnType<typeof galGeo>): [number, number] {
  const q = GAL_POS[id] ?? { r: (L[id] as { orbit: number }).orbit, a: (L[id] as { angle: number }).angle };
  return galXY(g, q.r, q.a);
}
/** Jas a barva galaxie v bodě roviny (u, v): [r, g, b] 0–255. */
function galPix(u: number, v: number): [number, number, number] {
  const r = Math.hypot(u, v), th = Math.atan2(v, u);
  if (r > 1.25) return [0, 0, 0];
  const ba = 0.45, bxu = u * Math.cos(ba) + v * Math.sin(ba), bxv = -u * Math.sin(ba) + v * Math.cos(ba);
  const bar = Math.exp(-(Math.pow(bxu / 0.26, 2) + Math.pow(bxv / 0.075, 2)));
  const bulge = Math.exp(-Math.pow(r / 0.1, 2)) + 0.35 * Math.exp(-r / 0.16);
  const disk = Math.exp(-r / 0.3) * 0.7 * Math.max(0, 1 - r / 1.2);
  const clump = 0.25 + 1.5 * Math.max(0, sfbm(u * 11 + 3, v * 11 - 5, 4) + 0.35) * (0.7 + 0.6 * Math.max(0, sfbm(u * 30, v * 30, 2) + 0.4));
  const rag = 0.35 * sfbm(u * 4.5 - 7, v * 4.5 + 2, 3);   // ramena nejsou dokonalé spirály: roztřepený okraj
  let arm = 0, dust = 0;
  if (r > 0.1) for (const A of ARMS) {
    const d = wrapA(th - armTh(A.ph, r) + rag), fade = Math.min(1, (r - 0.1) / 0.18) * Math.max(0, Math.min(1, (1.15 - r) / 0.3));
    arm += A.w * Math.exp(-Math.pow(d * r / (0.06 + 0.05 * r), 2)) * fade;
    dust += A.w * Math.exp(-Math.pow((d + 0.3 / (r + 0.3)) * r / 0.025, 2)) * fade * (0.5 + 0.5 * clump);
  }
  arm *= clump;
  const dk = Math.max(0.3, 1 - dust * 0.55);
  const R = (disk * 110 + arm * 120 + bar * 220 + bulge * 255) * dk;
  const G = (disk * 112 + arm * 140 + bar * 190 + bulge * 225) * dk;
  const B = (disk * 160 + arm * 220 + bar * 140 + bulge * 165) * dk;
  return [R, G, B];
}
export function drawGalaxy(c: HTMLCanvasElement, s: State, time: number, names: (id: string) => string, open: (id: LocationId) => boolean) {
  const p = prep(c); if (!p) return;
  const { x, W, H, dpr } = p, g = galGeo(W, H), tt = reduce ? 0 : time;
  const key = `${W}x${H}@${dpr}`;
  if (galKey !== key || !galBg) {
    galKey = key; galBg = document.createElement('canvas'); galBg.width = Math.round(W * dpr); galBg.height = Math.round(H * dpr);
    const bx = galBg.getContext('2d')!;
    // 1) hustota galaxie v polovičním rozlišení, roztažená (měkké)
    const lw = Math.round(W / 2), lh = Math.round(H / 2), lo = document.createElement('canvas'); lo.width = lw; lo.height = lh;
    const lx = lo.getContext('2d')!, img = lx.createImageData(lw, lh), d = img.data;
    for (let j = 0; j < lh; j++) for (let i = 0; i < lw; i++) {
      const u = (i * 2 - g.cx) / g.R, v = (j * 2 - g.cy) / (g.R * g.tilt), [r, gg, b] = galPix(u, v), o = (j * lw + i) * 4;
      d[o] = 5 + Math.min(250, r); d[o + 1] = 6 + Math.min(249, gg); d[o + 2] = 15 + Math.min(240, b); d[o + 3] = 255;
    }
    lx.putImageData(img, 0, 0);
    bx.imageSmoothingEnabled = true; bx.drawImage(lo, 0, 0, galBg.width, galBg.height);
    bx.setTransform(dpr, 0, 0, dpr, 0, 0);
    let sd = 5;
    const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
    // 2) hvězdy v popředí i pozadí
    for (let i = 0; i < W * H / 300; i++) { bx.fillStyle = `rgba(220,228,255,${r() * 0.35})`; bx.fillRect(r() * W, r() * H, 1, 1); }
    // 3) jasné hvězdy, oblasti tvorby hvězd a hvězdokupy podél ramen
    for (let i = 0; i < 2600; i++) {
      const A = ARMS[i % 4], rr = 0.12 + Math.pow(r(), 0.8) * 0.98, a = armTh(A.ph, rr) + (r() - 0.5) * 0.12 / rr, [px, py] = galXY(g, rr, a);
      const k = r();
      if (k < 0.05 * A.w) {
        const pg = bx.createRadialGradient(px, py, 0, px, py, 3.5);
        pg.addColorStop(0, 'rgba(255,140,190,0.6)'); pg.addColorStop(1, 'rgba(255,140,190,0)');
        bx.fillStyle = pg; bx.beginPath(); bx.arc(px, py, 3.5, 0, 7); bx.fill();
      } else if (k < 0.6) { bx.fillStyle = `rgba(200,220,255,${0.3 + r() * 0.6})`; bx.fillRect(px, py, r() < 0.08 ? 1.6 : 1, r() < 0.08 ? 1.6 : 1); }
    }
    // kulové hvězdokupy v halu
    for (let i = 0; i < 26; i++) {
      const a = r() * 6.283, rr = 0.3 + r() * 0.9, px = g.cx + Math.cos(a) * rr * g.R, py = g.cy + Math.sin(a) * rr * g.R * 0.95;
      bx.fillStyle = 'rgba(255,232,200,0.55)'; bx.beginPath(); bx.arc(px, py, 1.3, 0, 7); bx.fill();
    }
    // 4) jména ramen a střed
    bx.font = `italic 12px ${MONO}`; bx.textAlign = 'center';
    for (const A of ARMS) {
      const rr = A.w > 0.8 ? 0.92 : 0.8, [px, py] = galXY(g, rr, armTh(A.ph, rr) + 0.1);
      bx.fillStyle = 'rgba(176,190,240,0.55)'; bx.fillText(names('arm.' + A.key), px, py);
    }
    bx.fillStyle = 'rgba(255,226,180,0.7)'; bx.fillText(names('center'), g.cx, g.cy + g.R * g.tilt * 0.22 + 14);
  }
  x.drawImage(galBg, 0, 0, W, H);
  // Slunce a Země: odkud Vesper kdysi přiletěl
  const [sx, sy] = galXY(g, GAL_SUN.r, GAL_SUN.a);
  x.fillStyle = 'rgba(255,233,184,0.95)'; x.beginPath(); x.arc(sx, sy, 2.4, 0, 7); x.fill();
  x.strokeStyle = 'rgba(255,233,184,0.5)'; x.lineWidth = 1; x.beginPath(); x.arc(sx, sy, 6, 0, 7); x.stroke();
  x.font = `12px ${MONO}`; x.textAlign = 'right'; x.fillStyle = 'rgba(255,233,184,0.85)'; x.fillText(names('sun'), sx - 10, sy + 4);
  // naše oblast (výřez sítě mostů ~6 400 × 4 000 ly) a domov
  const [hx, hy] = galXY(g, GAL_HOME.r, GAL_HOME.a), bw = Math.max(34, 0.13 * g.R), bh = Math.max(22, 0.08 * g.R);
  x.strokeStyle = `rgba(${EXO},0.85)`; x.lineWidth = 1.2; x.strokeRect(hx - bw * 0.2, hy - bh * 0.6, bw, bh);
  x.fillStyle = `rgb(${AMBER})`; x.beginPath(); x.arc(hx, hy, 2.6, 0, 7); x.fill();
  const pl = (tt * 0.5) % 1;
  x.strokeStyle = `rgba(${PULSE},${0.7 * (1 - pl)})`; x.beginPath(); x.arc(hx, hy, 4 + pl * 18, 0, 7); x.stroke();
  const hn = names('home'), hw = x.measureText(hn).width, hlx = Math.min(W - hw - 8, hx - bw * 0.2);
  x.textAlign = 'left'; x.fillStyle = 'rgba(8,10,22,0.6)'; x.fillRect(hlx - 3, hy - bh * 0.6 - 19, hw + 6, 17);
  x.fillStyle = `rgba(${EXO},0.95)`; x.fillText(hn, hlx, hy - bh * 0.6 - 6);
  // mise
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
    const right = px > g.cx;
    x.font = `12px ${MONO}`; x.textAlign = right ? 'left' : 'right';
    const lbl = names(id), w = x.measureText(lbl).width, lx = right ? px + 12 : px - 12;
    x.fillStyle = 'rgba(8,10,22,0.6)'; x.fillRect(right ? lx - 3 : lx - w - 3, py - 9, w + 6, 17);
    x.fillStyle = done ? 'rgba(176,181,212,0.9)' : 'rgba(232,236,255,0.98)'; x.fillText(lbl, lx, py + 4);
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
