// Kapitola 3: kreslení černé díry, jejího profilu a mapy okolí.
// Stylizované, ne realistické: stín díry, fotonový prstenec, akreční disk s Dopplerovým zjasněním,
// ohnutý obraz zadní strany disku, trysky a ergosféra podle fáze.
import { HOLE, L, type LocationId } from '../core/defs.js';
import type { State } from '../core/state.js';
import { iscoR } from '../core/engine.js';
import { t } from '../i18n/index.js';
import { bakeMapBg, bakeNebula, sfbm } from './scene.js';

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const MONO = '"JetBrains Mono", ui-monospace, monospace';

export interface HoleView {
  phase: number;      // 0 zpětný pád … 4 ergosféra
  a: number;          // rotace díry
  lum: number;        // jas disku 0–1 (logaritmicky podle svítivosti)
  cov: number;        // pokrytí disku kolektory
  rings: number;      // počet kolektorů
  jets: number;       // síla trysek 0–1
  jetCov: number;     // pokrytí trysek lapači
  stations: number;
  gamma: number;
  feed: number;       // injektory 0–8 proudů
  dive: number;       // odpočet ponoru, −1 = neběží
  done: boolean;
}

// Barvy disku podle fáze: [vnitřek, střed, okraj]
const DISK: [number, number, number][][] = [
  [[255, 196, 140], [214, 104, 58], [110, 40, 34]],
  [[255, 236, 200], [255, 160, 82], [170, 62, 38]],
  [[248, 246, 255], [255, 196, 128], [196, 86, 52]],
  [[240, 244, 255], [255, 204, 140], [200, 92, 60]],
  [[236, 240, 255], [255, 210, 150], [204, 96, 66]],
];
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const mixc = (a: number[], b: number[], k: number) => a.map((v, i) => Math.round(lerp(v, b[i], k)));

// ---------- textura disku (pohled shora, mezikruží) ----------
let diskTex: HTMLCanvasElement | null = null, diskKey = '';
function bakeDisk(px: number, phase: number) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = px;
  const x = cv.getContext('2d')!, img = x.createImageData(px, px), d = img.data, c = px / 2;
  const pal = DISK[phase], rin = 0.2, patchy = phase === 0 ? 0.75 : 0.35;
  for (let j = 0; j < px; j++) for (let i = 0; i < px; i++) {
    const u = (i - c) / c, v = (j - c) / c, r = Math.hypot(u, v);
    if (r > 1 || r < rin * 0.85) continue;
    const th = Math.atan2(v, u), q = (r - rin) / (1 - rin);
    // spirální proužky: úhel se stáčí s logaritmem poloměru
    const sw = th + 2.4 * Math.log(r + 0.05);
    const streak = sfbm(Math.cos(sw) * 2.2 + r * 9, Math.sin(sw) * 2.2 + r * 9, 5);
    const fine = sfbm(Math.cos(sw * 3) * 6 + 40, Math.sin(sw * 3) * 6 + r * 30, 3);
    const fall = Math.pow(Math.max(0, 1 - q), 1.6) * (q < 0 ? Math.max(0, 1 + q * 8) : 1);
    let b = fall * (1 - patchy + patchy * (streak * 1.25 + fine * 0.35));
    b = Math.max(0, Math.min(1.2, b * 1.25));
    const col = q < 0.35 ? mixc(pal[0], pal[1], Math.max(0, q) / 0.35) : mixc(pal[1], pal[2], (q - 0.35) / 0.65);
    const o = (j * px + i) * 4, lift = Math.max(0, b - 1) * 200;
    d[o] = Math.min(255, col[0] + lift); d[o + 1] = Math.min(255, col[1] + lift); d[o + 2] = Math.min(255, col[2] + lift);
    const edge = Math.min(1, (1 - r) * 14) * Math.min(1, (r - rin * 0.85) * 30);
    d[o + 3] = Math.min(255, 255 * Math.min(1, b) * edge);
  }
  x.putImageData(img, 0, 0);
  return cv;
}

let bg: HTMLCanvasElement | null = null, bgKey = '';
let layer: HTMLCanvasElement | null = null;
let neb: HTMLCanvasElement | null = null, nebKey = '';
function prep(c: HTMLCanvasElement) {
  const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
  if (!W || !H) return null;
  if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
  const x = c.getContext('2d')!;
  x.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { x, W, H, dpr };
}
function nebula(px: number) {
  if (!neb || nebKey !== String(px)) { neb = bakeNebula(px); nebKey = String(px); }
  return neb;
}

/** Černá díra vlevo (Kapitola 3). full = větší pohled s pozadím. */
export function drawHole(c: HTMLCanvasElement, v: HoleView, time: number, sub: string, full = false) {
  const p = prep(c); if (!p) return;
  const { x, W, H, dpr } = p, tt = reduce ? 0 : time, m = Math.min(W, H);
  if (full) {
    const key = `${W}x${H}@${dpr}`;
    if (!bg || bgKey !== key) { bg = bakeMapBg(W, H, dpr); bgKey = key; }
    x.drawImage(bg, 0, 0, W, H);
  } else x.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H * 0.5, Rsh = m * 0.095, Rout = m * 0.43, incl = 0.2 + v.phase * 0.012;
  const pal = DISK[v.phase];
  // pozůstatek supernovy daleko v pozadí
  const nr = m * 0.62, npx = Math.min(640, Math.round(nr * 2 * dpr));
  x.globalAlpha = 0.22;
  x.save(); x.translate(cx, cy); x.rotate(tt * 0.002); x.drawImage(nebula(npx), -nr, -nr, nr * 2, nr * 2); x.restore();
  x.globalAlpha = 1;
  // teplá záře
  const glowA = 0.1 + v.lum * 0.25;
  const halo = x.createRadialGradient(cx, cy, Rsh, cx, cy, Rout * 1.15);
  halo.addColorStop(0, `rgba(${pal[1].join(',')},${glowA})`);
  halo.addColorStop(0.4, `rgba(${pal[2].join(',')},${glowA * 0.35})`);
  halo.addColorStop(1, `rgba(${pal[2].join(',')},0)`);
  x.fillStyle = halo; x.fillRect(0, 0, W, H);

  const tpx = Math.min(900, Math.round(Rout * 2 * dpr)), tkey = `${v.phase}:${tpx}`;
  if (!diskTex || diskKey !== tkey) { diskTex = bakeDisk(tpx, v.phase); diskKey = tkey; }
  const rot = tt * 0.09, alpha = 0.55 + v.lum * 0.45;
  // vnitřní okraj disku podle ISCO (stín má poloměr ~5,2 GM/c²)
  const rinPx = Math.max(Rsh * 1.04, (iscoR(v.a) / 5.2) * Rsh), texIn = 0.2;
  const scaleR = Math.max(Rout, rinPx / texIn);
  if (!layer) layer = document.createElement('canvas');
  if (layer.width !== c.width || layer.height !== c.height) { layer.width = c.width; layer.height = c.height; }
  const lx = layer.getContext('2d')!;
  const disk = (half: 'back' | 'front') => {
    lx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lx.globalCompositeOperation = 'source-over';
    lx.clearRect(0, 0, W, H);
    lx.save();
    lx.beginPath();
    if (half === 'back') lx.rect(0, 0, W, cy); else lx.rect(0, cy, W, H - cy);
    lx.clip();
    lx.translate(cx, cy); lx.scale(1, incl); lx.rotate(rot);
    lx.drawImage(diskTex!, -scaleR, -scaleR, scaleR * 2, scaleR * 2);
    lx.restore();
    // Dopplerovo zjasnění: strana letící k nám (vlevo) jasnější a modřejší, druhá tmavší
    lx.globalCompositeOperation = 'source-atop';
    const dg = lx.createLinearGradient(cx - scaleR, cy, cx + scaleR, cy);
    dg.addColorStop(0, `rgba(235,242,255,${0.35 + v.lum * 0.2})`);
    dg.addColorStop(0.42, 'rgba(255,255,255,0)');
    dg.addColorStop(0.58, 'rgba(20,6,12,0)');
    dg.addColorStop(1, 'rgba(20,6,12,0.6)');
    lx.fillStyle = dg; lx.fillRect(0, 0, W, H);
    lx.globalCompositeOperation = 'source-over';
    x.save();
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.globalAlpha = alpha * (half === 'back' ? 0.8 : 1);
    x.drawImage(layer!, 0, 0);
    x.restore();
  };
  // ohnutý obraz zadní strany disku: prstenec kolem stínu
  {
    const la = (0.3 + v.lum * 0.55) * (v.phase === 0 ? 0.55 : 1), r0 = Rsh * 1.02, r1 = Rsh * 1.75;
    const lg = x.createRadialGradient(cx, cy, r0, cx, cy, r1);
    lg.addColorStop(0, `rgba(${pal[0].join(',')},${la})`);
    lg.addColorStop(0.25, `rgba(${pal[1].join(',')},${la * 0.6})`);
    lg.addColorStop(1, `rgba(${pal[2].join(',')},0)`);
    x.fillStyle = lg;
    x.beginPath(); x.arc(cx, cy, r1, 0, 7); x.arc(cx, cy, r0, 0, 7, true); x.fill();
    // nad dírou je obraz zadní strany disku nejvýraznější
    x.save(); x.beginPath(); x.rect(0, 0, W, cy - Rsh * 0.2); x.clip();
    x.globalAlpha = 0.7; x.fillStyle = lg;
    x.beginPath(); x.ellipse(cx, cy, r1 * 0.95, r1 * 0.9, 0, 0, 7); x.arc(cx, cy, r0, 0, 7, true); x.fill();
    x.restore(); x.globalAlpha = 1;
  }
  // ergosféra (fáze 4): třpytivá zploštělá obálka
  if (v.phase >= 4) {
    const eg = x.createRadialGradient(cx, cy, Rsh * 0.95, cx, cy, Rsh * 1.5);
    eg.addColorStop(0, 'rgba(184,146,255,0.32)');
    eg.addColorStop(1, 'rgba(184,146,255,0)');
    x.fillStyle = eg;
    x.beginPath(); x.ellipse(cx, cy, Rsh * 1.5, Rsh * 1.32, 0, 0, 7); x.fill();
    for (let i = 0; i < 26; i++) {
      const a = i * 2.399 + tt * (0.6 + (i % 3) * 0.2), rr = Rsh * (1.08 + (i % 5) * 0.07);
      x.fillStyle = `rgba(214,196,255,${0.25 + 0.5 * Math.max(0, Math.sin(tt * 2 + i))})`;
      x.fillRect(cx + Math.cos(a) * rr - 0.8, cy + Math.sin(a) * rr * 0.88 - 0.8, 1.6, 1.6);
    }
  }
  disk('back');
  // trysky (za stínem dolní, nad ním horní)
  const jet = (dir: 1 | -1) => {
    if (v.jets <= 0) return;
    const len = m * (0.28 + 0.22 * v.jets), w0 = Rsh * 0.22, w1 = Rsh * (0.7 + 0.5 * v.jets);
    const y0 = cy - dir * Rsh * 0.5, y1 = y0 - dir * len;
    const g = x.createLinearGradient(cx, y0, cx, y1);
    g.addColorStop(0, `rgba(196,214,255,${0.55 * v.jets + 0.15})`);
    g.addColorStop(0.35, `rgba(150,150,255,${0.22 * v.jets + 0.06})`);
    g.addColorStop(1, 'rgba(140,120,255,0)');
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(cx - w0, y0); x.quadraticCurveTo(cx - w1 * 0.4, (y0 + y1) / 2, cx - w1, y1);
    x.lineTo(cx + w1, y1); x.quadraticCurveTo(cx + w1 * 0.4, (y0 + y1) / 2, cx + w0, y0);
    x.closePath(); x.fill();
    // uzly v trysce
    for (let k = 0; k < 6; k++) {
      const f = ((tt * 0.35 + k / 6) % 1 + 1) % 1, yy = y0 - dir * len * f, ww = lerp(w0, w1, f) * 0.35;
      x.fillStyle = `rgba(226,232,255,${(1 - f) * 0.7 * (0.4 + v.jets * 0.6)})`;
      x.beginPath(); x.ellipse(cx, yy, ww, ww * 0.5, 0, 0, 7); x.fill();
    }
    // lapače trysek: zlaté obloučky přes trysku
    const nl = Math.round(v.jetCov * 5);
    for (let k = 0; k < nl; k++) {
      const f = 0.3 + k * 0.13, yy = y0 - dir * len * f, ww = lerp(w0, w1, f) * 1.25;
      x.strokeStyle = 'rgba(242,178,90,0.7)'; x.lineWidth = 1.2;
      x.beginPath(); x.ellipse(cx, yy, ww, ww * 0.18, 0, 0, 7); x.stroke();
    }
  };
  jet(-1);
  // stín díry a fotonový prstenec
  const sg = x.createRadialGradient(cx, cy, Rsh * 0.7, cx, cy, Rsh * 1.04);
  sg.addColorStop(0, '#000000'); sg.addColorStop(0.92, '#020205'); sg.addColorStop(1, 'rgba(2,2,5,0)');
  x.fillStyle = sg; x.beginPath(); x.arc(cx, cy, Rsh * 1.04, 0, 7); x.fill();
  x.strokeStyle = `rgba(255,240,220,${0.5 + v.lum * 0.45})`; x.lineWidth = 1.2;
  x.beginPath(); x.arc(cx, cy, Rsh * 1.05, 0, 7); x.stroke();
  x.strokeStyle = `rgba(255,220,180,${0.12 + v.lum * 0.15})`; x.lineWidth = 3;
  x.beginPath(); x.arc(cx, cy, Rsh * 1.09, 0, 7); x.stroke();
  jet(1);
  // dilatační stanice: tyrkysové tečky těsně nad stínem, čím hlouběji, tím pomaleji
  const ns = Math.min(12, v.stations);
  for (let i = 0; i < ns; i++) {
    const a = i / ns * Math.PI * 2 + tt * 0.25 / v.gamma, rr = Rsh * (1.16 + 0.5 / v.gamma);
    const sx = cx + Math.cos(a) * rr, sy = cy + Math.sin(a) * rr * 0.35;
    if (Math.sin(a) < 0 && Math.abs(sx - cx) < Rsh) continue; // za dírou
    x.fillStyle = 'rgba(127,211,234,0.95)';
    x.fillRect(sx - 1.2, sy - 1.2, 2.4, 2.4);
  }
  disk('front');
  // proudy plynu z injektorů: tečky po spirále k disku
  for (let j = 0; j < v.feed; j++) {
    for (let q = 0; q < 9; q++) {
      const f = ((tt * 0.12 + q / 9 + j * 0.37) % 1 + 1) % 1;
      const a = j * 2.2 + f * 2.6, rr = lerp(m * 0.62, Rout * 0.9, f);
      const sx = cx + Math.cos(a) * rr, sy = cy + Math.sin(a) * rr * incl * 1.4;
      x.fillStyle = `rgba(255,${180 + q * 6},${150 + q * 8},${f * 0.55})`;
      x.beginPath(); x.arc(sx, sy, 0.8 + f * 1.1, 0, 7); x.fill();
    }
  }
  // diskové kolektory: zlaté oběžné dráhy v rovině disku
  const nr2 = Math.min(4, Math.ceil(v.rings / 15));
  for (let k = 0; k < nr2; k++) {
    const rr = Rout * (1.04 + k * 0.08);
    x.strokeStyle = `rgba(242,178,90,${0.12 + v.cov * 0.12})`; x.lineWidth = 1;
    x.beginPath(); x.ellipse(cx, cy, rr, rr * incl, 0, 0, 7); x.stroke();
  }
  const nd = Math.min(90, v.rings);
  for (let i = 0; i < nd; i++) {
    const k = i % Math.max(1, nr2), a = i * 2.39996 + tt * (0.05 + k * 0.01), rr = Rout * (1.04 + k * 0.08);
    const sn = Math.sin(a), px = cx + Math.cos(a) * rr, py = cy + sn * rr * incl;
    const gl = 0.5 + 0.5 * Math.max(0, Math.cos(i * 1.7 + tt * 0.8));
    x.fillStyle = sn >= 0 ? `rgba(255,${190 + gl * 50},${120 + gl * 80},${0.6 + gl * 0.4})` : 'rgba(200,150,100,0.35)';
    x.fillRect(px - 1.3, py - 0.7, 2.6, 1.4);
  }
  // ponor sondy
  if (v.dive >= 0) {
    const f = 1 - v.dive / 30, a = f * 14, rr = lerp(Rout * 0.8, Rsh * 1.5, Math.pow(f, 0.7));
    const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr * 0.5;
    x.fillStyle = '#f2a541'; x.beginPath(); x.arc(px, py, 2.2, 0, 7); x.fill();
    const pr = ((tt * 0.137) % 1) * Rout;
    x.strokeStyle = `rgba(242,165,65,${0.4 * (1 - pr / Rout)})`; x.lineWidth = 1;
    x.beginPath(); x.arc(cx, cy, Rsh + pr, 0, 7); x.stroke();
  }
  if (sub) {
    x.font = `600 12px ${MONO}`; x.textAlign = 'center';
    x.fillStyle = 'rgba(242,178,90,0.95)';
    x.fillText(sub, cx, H - 10);
    x.textAlign = 'left';
  }
}

// ---------- profil díry (záložka Horizont) ----------
// Řez rovinou osy rotace: horizont, ergosféra, fotonová sféra, ISCO, disk z boku, stanice.
// Pozadí: gravitační studna (Flammův paraboloid) a paprsky světla ohnuté dírou.
export interface ProfileView extends HoleView { stationR: number }

/** Dráhy fotonů kolem díry (Schwarzschild, rₛ = 1): zrychlení −1,5·L²·r̂/r⁴ dává přesnou rovnici dráhy světla. */
let rays: { pts: [number, number][]; cap: boolean }[] | null = null;
function bakeRays() {
  const out: { pts: [number, number][]; cap: boolean }[] = [];
  for (const b of [-4.6, -3.3, -2.66, -2.605, -1.7, 1.2, 2.61, 2.7, 3.6, 5.2]) {
    let px = -9, py = b, vx = 1, vy = 0;
    const Lm = Math.abs(px * vy - py * vx), pts: [number, number][] = [[px, py]];
    let cap = false;
    for (let i = 0; i < 9000; i++) {
      const r = Math.hypot(px, py);
      if (r < 1.0) { cap = true; break; }
      if (px > 9 || Math.abs(py) > 7 || r > 12) break;
      const dt = Math.min(0.02, 0.004 * r * r);
      const k = -1.5 * Lm * Lm / Math.pow(r, 5);
      vx += k * px * dt; vy += k * py * dt;
      const n = Math.hypot(vx, vy); vx /= n; vy /= n;
      px += vx * dt; py += vy * dt;
      if (i % 3 === 0) pts.push([px, py]);
    }
    out.push({ pts, cap });
  }
  return out;
}

/** Text s dolním indexem bez spoléhání na glyf ₛ (JetBrains Mono ho nemá). */
function rsText(x: CanvasRenderingContext2D, v: number, px: number, py: number) {
  const s = v.toFixed(2).replace('.', ',') + ' r';
  x.fillText(s, px, py);
  const w = x.measureText(s).width, f = x.font;
  x.font = f.replace(/(\d+)px/, (_m, n) => `${Math.round(Number(n) * 0.75)}px`);
  x.fillText('s', px + w, py + 3);
  x.font = f;
  return w + 7;
}

export function drawProfile(c: HTMLCanvasElement, v: ProfileView, time: number, title: string) {
  const p = prep(c); if (!p) return;
  const { x, W, H, dpr } = p, tt = reduce ? 0 : time;
  const key = `${W}x${H}@${dpr}`;
  if (!bg || bgKey !== key) { bg = bakeMapBg(W, H, dpr); bgKey = key; }
  x.drawImage(bg, 0, 0, W, H);
  const narrow = W < 560, legW = narrow ? 0 : 214;
  const a = v.a, rp = 0.5 * (1 + Math.sqrt(1 - a * a));                      // horizont v rₛ
  const rph = 1 + Math.cos((2 / 3) * Math.acos(-a));                         // fotonová dráha (souběžná) v rₛ
  const ris = iscoR(a) / 2, rst = v.stationR, rmax = Math.max(3.1, rst + 0.1);
  const cx = narrow ? W * 0.42 : (W - legW) * 0.42, cy = H * 0.5;
  const u = Math.min((W - legW - cx - 24) / rmax, H * 0.36);                // 1 rₛ v pixelech
  const P = (rx: number, ry: number): [number, number] => [cx + rx * u, cy + ry * u];
  const pal = DISK[v.phase];

  // gravitační studna: soustředné kružnice v rovině disku, čím blíž díře, tím hlouběji (Flamm 1916)
  x.save();
  x.beginPath(); x.rect(0, 0, W - legW, H); x.clip();
  const sag = (r: number) => 2 * Math.sqrt(Math.max(0, r - 1)) ; // hloubka paraboloidu z(r)
  const zMax = sag(7);
  for (let i = 0; i < 9; i++) {
    const r = 1.15 + i * i * 0.09 + i * 0.35, dz = (zMax - sag(r)) * 0.11 * u;
    x.strokeStyle = `rgba(150,140,230,${0.03 + (1 - i / 9) * 0.06})`; x.lineWidth = 1;
    x.beginPath(); x.ellipse(cx, cy + dz, r * u, r * u * 0.16, 0, 0, Math.PI); x.stroke();
  }
  for (let k = 0; k < 14; k++) {
    const ang = k / 14 * Math.PI;
    x.strokeStyle = 'rgba(150,140,230,0.07)';
    x.beginPath();
    for (let r = 1.15; r < 7; r += 0.2) {
      const dz = (zMax - sag(r)) * 0.11 * u, px2 = cx + Math.cos(ang) * r * u, py2 = cy + dz + Math.sin(ang) * r * u * 0.16;
      r === 1.15 ? x.moveTo(px2, py2) : x.lineTo(px2, py2);
    }
    x.stroke();
  }
  x.restore();

  // paprsky světla: hvězdy za dírou, ohnuté gravitací; jeden oběhne fotonovou sféru
  if (!rays) rays = bakeRays();
  const shrink = (r: number) => r + (rph - 1.5) * Math.exp(-(r - 1.5) / 1.6); // přizpůsobení rotující díře
  const map = (q: [number, number]): [number, number] => {
    const r = Math.hypot(q[0], q[1]) || 1, r2 = shrink(r);
    return P(q[0] / r * r2, q[1] / r * r2);
  };
  x.save();
  x.beginPath(); x.rect(0, 0, W - legW, H); x.clip();
  for (const ray of rays) {
    x.strokeStyle = ray.cap ? 'rgba(255,214,170,0.16)' : 'rgba(220,226,255,0.16)'; x.lineWidth = 1;
    x.beginPath();
    let started = false;
    for (const q of ray.pts) {
      const r = Math.hypot(q[0], q[1]);
      if (shrink(r) < rp) break;
      const [sx, sy] = map(q);
      if (!started) { x.moveTo(sx, sy); started = true; } else x.lineTo(sx, sy);
    }
    x.stroke();
    // foton putující po paprsku
    const n = ray.pts.length, f = ((tt * 0.09 + ray.pts[0][1] * 0.13) % 1 + 1) % 1, q = ray.pts[Math.floor(f * (n - 1))];
    if (shrink(Math.hypot(q[0], q[1])) > rp) {
      const [sx, sy] = map(q);
      x.fillStyle = ray.cap ? 'rgba(255,214,170,0.85)' : 'rgba(226,232,255,0.85)';
      x.beginPath(); x.arc(sx, sy, 1.3, 0, 7); x.fill();
    }
  }
  x.restore();

  // disk z boku: od ISCO ven, tloušťka podle fáze, strana k nám (vlevo) jasnější
  const th = u * (0.035 + v.phase * 0.022);
  for (const sgn of [-1, 1]) {
    const x0 = cx + sgn * ris * u, x1 = sgn > 0 ? W - legW - 6 : 6;
    const g = x.createLinearGradient(x0, 0, x1, 0), boost = sgn < 0 ? 1 : 0.7;
    g.addColorStop(0, `rgba(${pal[0].join(',')},${(0.6 + v.lum * 0.4) * boost})`);
    g.addColorStop(0.18, `rgba(${pal[1].join(',')},${(0.45 + v.lum * 0.3) * boost})`);
    g.addColorStop(1, `rgba(${pal[2].join(',')},0.04)`);
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(x0, cy - th * 0.35); x.quadraticCurveTo((x0 + x1) / 2, cy - th * 1.5, x1, cy - th * 2.3);
    x.lineTo(x1, cy + th * 2.3); x.quadraticCurveTo((x0 + x1) / 2, cy + th * 1.5, x0, cy + th * 0.35);
    x.closePath(); x.fill();
    // horké chuchvalce plynu putující k díře
    for (let k = 0; k < 7; k++) {
      const f = ((tt * 0.07 * (1 + k * 0.13) + k / 7) % 1 + 1) % 1, rr = lerp(4.6, ris, f * f);
      const [hx, hy] = P(sgn * rr, Math.sin(k * 3.1 + tt) * 0.02 * rr);
      if (hx < 6 || hx > W - legW - 6) continue;
      x.fillStyle = `rgba(${pal[0].join(',')},${0.15 + f * 0.6})`;
      x.beginPath(); x.ellipse(hx, hy, 1.6 + f * 2.2, 0.8 + f * 0.6, 0, 0, 7); x.fill();
    }
  }
  // trysky podél osy rotace
  if (v.jets > 0) for (const dir of [-1, 1]) {
    const y1 = dir < 0 ? 4 : H - 4, w1 = u * (0.35 + 0.45 * v.jets);
    const g = x.createLinearGradient(cx, cy, cx, y1);
    g.addColorStop(0, `rgba(196,214,255,${0.5 * v.jets + 0.12})`); g.addColorStop(1, 'rgba(140,120,255,0)');
    x.fillStyle = g;
    x.beginPath(); x.moveTo(cx - u * 0.07, cy + dir * u * rp); x.lineTo(cx - w1, y1); x.lineTo(cx + w1, y1); x.lineTo(cx + u * 0.07, cy + dir * u * rp); x.closePath(); x.fill();
    for (let k = 0; k < 5; k++) {
      const f = ((tt * 0.4 + k / 5) % 1 + 1) % 1, yy = lerp(cy + dir * u * rp, y1, f);
      x.fillStyle = `rgba(226,232,255,${(1 - f) * 0.6})`;
      x.beginPath(); x.ellipse(cx, yy, lerp(u * 0.05, w1 * 0.4, f), 1.2 + f * 2, 0, 0, 7); x.fill();
    }
  }
  // ergosféra: na rovníku 1 rₛ, na pólech splývá s horizontem; prostor v ní strhává vše s sebou
  const eRy = rp + (1 - rp) * 0.12;
  x.save();
  x.beginPath(); x.ellipse(cx, cy, u, u * eRy, 0, 0, 7);
  x.fillStyle = `rgba(184,146,255,${0.07 + (v.phase >= 4 ? 0.1 : 0)})`; x.fill();
  x.setLineDash([3, 4]); x.strokeStyle = 'rgba(184,146,255,0.75)'; x.lineWidth = 1; x.stroke();
  x.restore();
  for (let i = 0; i < 22; i++) {
    const lat = ((i * 0.618) % 1) * 2 - 1, f = ((tt * (0.25 + a * 0.4) * (1.2 - Math.abs(lat)) + i * 0.37) % 1 + 1) % 1;
    const rr = lerp(rp * 1.04, 0.97, ((i * 0.37) % 1)), ex = Math.cos(f * Math.PI * 2) * rr, ey = lat * eRy * Math.sqrt(1 - ex * ex / (rr * rr + 1e-6)) * 0.9;
    if (Math.sin(f * Math.PI * 2) < 0 && Math.hypot(ex, ey) < rp * 1.02) continue;
    const [sx, sy] = P(ex, ey);
    x.fillStyle = `rgba(214,196,255,${0.25 + 0.45 * Math.max(0, Math.sin(f * Math.PI * 2))})`;
    x.fillRect(sx - 2.2, sy - 0.6, 4.4, 1.2); // čárka ve směru strhávání
  }
  // fotonová sféra
  x.save(); x.setLineDash([2, 5]); x.strokeStyle = 'rgba(255,240,220,0.6)'; x.lineWidth = 1;
  x.beginPath(); x.arc(cx, cy, rph * u, 0, 7); x.stroke(); x.restore();
  // horizont: tma s jemným lemem a fotonový prstenec
  const hg = x.createRadialGradient(cx, cy, 0, cx, cy, rp * u);
  hg.addColorStop(0, '#000'); hg.addColorStop(0.88, '#020208'); hg.addColorStop(1, '#14102a');
  x.fillStyle = hg; x.beginPath(); x.arc(cx, cy, rp * u, 0, 7); x.fill();
  x.strokeStyle = `rgba(255,232,205,${0.55 + v.lum * 0.35})`; x.lineWidth = 1.4; x.stroke();
  // ISCO
  x.save(); x.setLineDash([6, 4]); x.strokeStyle = 'rgba(242,165,65,0.9)'; x.lineWidth = 1.2;
  x.beginPath(); x.arc(cx, cy, ris * u, 0, 7); x.stroke(); x.restore();
  // stanice na své dráze; obíhají pomaleji o dilataci
  if (v.stations > 0) {
    x.strokeStyle = 'rgba(127,211,234,0.4)'; x.lineWidth = 1;
    x.beginPath(); x.arc(cx, cy, rst * u, 0, 7); x.stroke();
    const n = Math.min(8, v.stations);
    for (let i = 0; i < n; i++) {
      const ang = i / n * Math.PI * 2 + tt * 0.3 / v.gamma, [sx, sy] = P(Math.cos(ang) * rst, Math.sin(ang) * rst);
      x.fillStyle = '#7fd3ea'; x.fillRect(sx - 2, sy - 1, 4, 2); x.fillRect(sx - 0.5, sy - 3, 1, 6);
    }
  }
  // ponor sondy po spirále k fotonové sféře
  if (v.dive >= 0) {
    const f = 1 - v.dive / HOLE.diveSec, ang = f * 16, rr = lerp(3, rph * 1.02, Math.pow(f, 0.6));
    const [sx, sy] = P(Math.cos(ang) * rr, Math.sin(ang) * rr * 0.8);
    x.fillStyle = '#f2a541'; x.beginPath(); x.arc(sx, sy, 2.4, 0, 7); x.fill();
  }

  // pravítko pod dírou: kde leží jednotlivé poloměry
  const rows: [string, number, string][] = [
    [t('ui.hole.horizon'), rp, '255,230,200'],
    [t('ui.hole.photon'), rph, '255,240,220'],
    ['ISCO', ris, '242,178,90'],
    [t('ui.hole.ergo'), 1, '206,180,255'],
  ];
  if (v.stations > 0) rows.push([t('ui.hole.stations'), rst, '127,211,234']);
  rows.sort((p1, p2) => p1[1] - p2[1]);
  const ry = H - 26;
  x.strokeStyle = 'rgba(200,205,235,0.35)'; x.lineWidth = 1;
  x.beginPath(); x.moveTo(cx, ry); x.lineTo(cx + rmax * u, ry); x.stroke();
  x.font = `11px ${MONO}`; x.fillStyle = 'rgba(176,181,212,0.8)'; x.textAlign = 'center';
  for (let k = 0; k <= Math.floor(rmax); k++) {
    x.fillRect(cx + k * u - 0.5, ry - 3, 1, 6);
    x.fillText(`${Math.round(k * HOLE.rsKm)} km`, cx + k * u, ry + 15);
  }
  x.textAlign = 'left';
  rows.forEach(([, r, col]) => {
    x.fillStyle = `rgba(${col},0.95)`;
    x.beginPath(); x.moveTo(cx + r * u, ry - 1); x.lineTo(cx + r * u - 3.5, ry - 8); x.lineTo(cx + r * u + 3.5, ry - 8); x.closePath(); x.fill();
  });

  // legenda vpravo
  if (!narrow) {
    const lx = W - legW + 10, top = 16;
    x.fillStyle = 'rgba(10,12,28,0.6)'; x.strokeStyle = 'rgba(120,128,180,0.25)';
    x.beginPath(); x.roundRect(lx - 10, top - 6, legW - 6, 26 + rows.length * 30 + (v.stations > 0 ? 50 : 0), 8); x.fill(); x.stroke();
    x.font = `600 11px ${MONO}`; x.fillStyle = 'rgba(176,181,212,0.85)';
    x.fillText(t('ui.hole.legend').toUpperCase(), lx, top + 8);
    rows.forEach(([name, r, col], i) => {
      const yy = top + 30 + i * 30;
      x.fillStyle = `rgba(${col},0.95)`; x.fillRect(lx, yy - 6, 8, 8);
      x.font = `12px ${MONO}`; x.fillText(name, lx + 16, yy + 2);
      x.font = `11px ${MONO}`; x.fillStyle = 'rgba(176,181,212,0.85)';
      const km = `${(r * HOLE.rsKm).toFixed(1).replace('.', ',')} km · `;
      x.fillText(km, lx + 16, yy + 16);
      rsText(x, r, lx + 16 + x.measureText(km).width, yy + 16);
    });
    // dvoje hodiny: Vesper nahoře a stanice u horizontu; ručička stanice jde γ× pomaleji
    if (v.stations > 0) {
      const yy = top + 30 + rows.length * 30 + 4;
      const clock = (px: number, label: string, rate: number, col: string) => {
        x.strokeStyle = col; x.lineWidth = 1.2;
        x.beginPath(); x.arc(px, yy + 8, 9, 0, 7); x.stroke();
        const ang = -Math.PI / 2 + tt * 1.2 * rate;
        x.beginPath(); x.moveTo(px, yy + 8); x.lineTo(px + Math.cos(ang) * 7, yy + 8 + Math.sin(ang) * 7); x.stroke();
        x.font = `11px ${MONO}`; x.fillStyle = col; x.fillText(label, px + 14, yy + 12);
      };
      clock(lx + 9, 'Vesper', 1, 'rgba(225,228,244,0.9)');
      clock(lx + 104, `γ ${v.gamma >= 10 ? Math.round(v.gamma) : v.gamma.toFixed(1).replace('.', ',')}×`, 1 / v.gamma, 'rgba(127,211,234,0.95)');
    }
  }
  x.font = `600 12px ${MONO}`; x.fillStyle = 'rgba(225,228,244,0.9)';
  x.fillText(title.toUpperCase(), 14, 22);
  x.font = `11px ${MONO}`; x.fillStyle = 'rgba(176,181,212,0.7)';
  x.fillText(t('ui.hole.profileSub'), 14, 38);
}

// ---------- mapa okolí díry ----------
const MAP_IDS: LocationId[] = ['cas', 'lens', 'tde', 'pole', 'ergo'];
const TILT = 0.42;
const trail: [number, number][] = [];
function pos(id: LocationId, tt: number): [number, number] {
  const l = L[id], a = l.angle + tt * l.speed;
  if (id === 'pole') return [0, -0.36];
  return [Math.cos(a) * l.orbit, Math.sin(a) * l.orbit * TILT];
}
export function drawHoleMap(c: HTMLCanvasElement, s: State, v: HoleView, time: number) {
  const p = prep(c); if (!p) return;
  const { x, W, H, dpr } = p, tt = reduce ? 0 : time;
  const key = `${W}x${H}@${dpr}`;
  if (!bg || bgKey !== key) { bg = bakeMapBg(W, H, dpr); bgKey = key; }
  x.drawImage(bg, 0, 0, W, H);
  const cx = W / 2, cy = H / 2, sc = Math.min(W / 2 * 0.9, H / 2 / TILT * 0.82);
  const P = (q: [number, number]): [number, number] => [cx + q[0] * sc, cy + q[1] * sc];
  // mlhovina: zploštělá obálka kolem díry
  const nr = sc * 0.95, npx = Math.min(640, Math.round(nr * 2 * dpr));
  x.save(); x.translate(cx, cy); x.scale(1, 0.62); x.rotate(tt * 0.003); x.globalAlpha = 0.5;
  x.drawImage(nebula(npx), -nr, -nr, nr * 2, nr * 2); x.restore(); x.globalAlpha = 1;
  // dráhy misí
  for (const id of MAP_IDS) {
    if (id === 'pole' || !(L[id].req?.(s) || s.visited[id])) continue;
    const rx = L[id].orbit * sc;
    x.strokeStyle = 'rgba(170,180,230,0.22)'; x.lineWidth = 1;
    x.beginPath(); x.ellipse(cx, cy, rx, rx * TILT, 0, 0, 7); x.stroke();
  }
  // díra s diskem
  const pal = DISK[v.phase], dr = sc * 0.1;
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, dr * 2.4);
  g.addColorStop(0, `rgba(${pal[1].join(',')},${0.25 + v.lum * 0.3})`); g.addColorStop(1, `rgba(${pal[2].join(',')},0)`);
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, dr * 2.4, 0, 7); x.fill();
  x.fillStyle = `rgba(${pal[1].join(',')},${0.5 + v.lum * 0.4})`;
  x.beginPath(); x.ellipse(cx, cy, dr, dr * TILT * 0.6, 0, 0, 7); x.fill();
  if (v.jets > 0) {
    for (const dir of [-1, 1]) {
      const jg = x.createLinearGradient(cx, cy, cx, cy + dir * sc * 0.4);
      jg.addColorStop(0, `rgba(196,214,255,${0.5 * v.jets + 0.1})`); jg.addColorStop(1, 'rgba(140,120,255,0)');
      x.fillStyle = jg;
      x.beginPath(); x.moveTo(cx - 1.5, cy); x.lineTo(cx - sc * 0.04, cy + dir * sc * 0.4); x.lineTo(cx + sc * 0.04, cy + dir * sc * 0.4); x.lineTo(cx + 1.5, cy); x.fill();
    }
  }
  x.fillStyle = '#000'; x.beginPath(); x.arc(cx, cy, dr * 0.32, 0, 7); x.fill();
  x.strokeStyle = 'rgba(255,235,210,0.85)'; x.lineWidth = 1; x.stroke();
  // mise
  x.font = `12px ${MONO}`;
  for (const id of MAP_IDS) {
    if (!(L[id].req?.(s) || s.visited[id])) continue;
    const [px, py] = P(pos(id, tt)), done = !!s.visited[id];
    x.strokeStyle = done ? 'rgba(127,214,154,0.9)' : 'rgba(242,178,90,0.95)'; x.lineWidth = 1.4;
    x.beginPath(); x.moveTo(px, py - 5); x.lineTo(px + 5, py); x.lineTo(px, py + 5); x.lineTo(px - 5, py); x.closePath(); x.stroke();
    if (done) { x.fillStyle = 'rgba(127,214,154,0.35)'; x.fill(); }
    x.fillStyle = done ? '#e1e4f4' : '#b0b5d4';
    x.fillText(t(`loc.${id}.short`), px + 9, py + 4);
  }
  // Vesper
  let sp: [number, number], ang = -Math.PI / 2;
  const home: [number, number] = P([-0.62, -0.22]);
  if (s.travel && MAP_IDS.includes(s.travel.to)) {
    const b = P(pos(s.travel.to, tt)), k = s.travel.t / s.travel.total;
    const ctrl: [number, number] = [(home[0] + b[0]) / 2, Math.min(home[1], b[1]) - sc * 0.15];
    const q = (f: number): [number, number] => [(1 - f) ** 2 * home[0] + 2 * (1 - f) * f * ctrl[0] + f * f * b[0], (1 - f) ** 2 * home[1] + 2 * (1 - f) * f * ctrl[1] + f * f * b[1]];
    x.setLineDash([3, 4]); x.strokeStyle = 'rgba(242,165,65,0.35)'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(...home); x.quadraticCurveTo(ctrl[0], ctrl[1], b[0], b[1]); x.stroke(); x.setLineDash([]);
    sp = q(k); const ah = q(Math.min(1, k + 0.01)); ang = Math.atan2(ah[1] - sp[1], ah[0] - sp[0]);
    trail.push(sp); if (trail.length > 40) trail.shift();
  } else { trail.length = 0; sp = home; }
  for (let i = 1; i < trail.length; i++) {
    x.strokeStyle = `rgba(242,165,65,${i / trail.length * 0.5})`; x.lineWidth = 1.5;
    x.beginPath(); x.moveTo(...trail[i - 1]); x.lineTo(...trail[i]); x.stroke();
  }
  x.save(); x.translate(sp[0], sp[1]); x.rotate(ang);
  x.fillStyle = '#f2a541';
  x.beginPath(); x.moveTo(6, 0); x.lineTo(-4, -3.2); x.lineTo(-2.5, 0); x.lineTo(-4, 3.2); x.closePath(); x.fill();
  x.restore();
  x.fillStyle = '#b0b5d4'; x.fillText('VESPER-7', home[0] + 9, home[1] + 16);
  const vg = x.createRadialGradient(cx, cy, Math.min(W, H) * 0.35, cx, cy, Math.max(W, H) * 0.75);
  vg.addColorStop(0, 'rgba(5,6,15,0)'); vg.addColorStop(1, 'rgba(5,6,15,0.5)');
  x.fillStyle = vg; x.fillRect(0, 0, W, H);
}
