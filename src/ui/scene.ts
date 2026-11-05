// Kreslení na plátno: hvězdné pozadí, asteroid a mapa soustavy.
import { L, LOCATION_IDS, type LocationId } from '../core/defs.js';
import type { State } from '../core/state.js';
import { t } from '../i18n/index.js';

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- hvězdy ----------
let stars: [number, number, number, number, string][] = [];
export function sizeStars(c: HTMLCanvasElement) {
  const d = Math.min(2, devicePixelRatio || 1);
  c.width = innerWidth * d; c.height = innerHeight * d;
  const n = Math.round((innerWidth * innerHeight) / 4500);
  stars = Array.from({ length: n }, () => {
    const tint = Math.random() < 0.12 ? '#ffd9b0' : Math.random() < 0.2 ? '#bcd0ff' : '#e6e9ff';
    return [Math.random() * c.width, Math.random() * c.height, (Math.random() * 1.2 + 0.3) * d, Math.random() * 6, tint];
  });
}
export function drawStars(c: HTMLCanvasElement, time: number) {
  const x = c.getContext('2d')!;
  x.clearRect(0, 0, c.width, c.height);
  for (const [sx, sy, r, p, tint] of stars) {
    x.globalAlpha = reduce ? 0.5 : 0.3 + 0.3 * Math.sin(time * 0.6 + p);
    x.fillStyle = tint; x.fillRect(sx, sy, r, r);
  }
  x.globalAlpha = 1;
}

// ---------- asteroid ----------
// Povrch se jednou spočítá po pixelech (výšková mapa → normály → světlo od Aldry zleva nahoře)
// a uloží do skrytého plátna. Každý snímek se pak jen vykreslí a přidají se drony a úlomky.
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const LATTICE = 64, lat: number[] = [];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const fade = (t: number) => t * t * (3 - 2 * t);
function vnoise(x: number, y: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), xf = fade(x - xi), yf = fade(y - yi);
  const g = (i: number, j: number) => lat[((i & (LATTICE - 1)) * LATTICE + (j & (LATTICE - 1)))];
  return lerp(lerp(g(xi, yi), g(xi + 1, yi), xf), lerp(g(xi, yi + 1), g(xi + 1, yi + 1), xf), yf);
}
function fbm(x: number, y: number, oct = 5): number {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { v += a * vnoise(x * f, y * f); a *= 0.5; f *= 2.03; }
  return v; // zhruba 0–1
}

type Crater = { x: number; y: number; r: number; fresh: boolean };
let tex: HTMLCanvasElement | null = null, texFor = 0;
let shapeR: (a: number) => number = () => 1;
const SS = 2; // povrch se počítá ve dvojnásobném rozlišení a pak zmenší (ostré hrany bez schodů)
// Aldra je modrý veleobr, světlo je proto chladně modrobílé; přichází zleva shora a trochu z boku
const LIGHT = (() => { const v = [-0.78, -0.42, 0.46]; const l = Math.hypot(...v); return v.map((a) => a / l); })();
const LCOL = [0.86, 0.93, 1.1];

function bakeRock(W: number) {
  seed = 11; lat.length = 0;
  for (let i = 0; i < LATTICE * LATTICE; i++) lat.push(rnd());
  // obrys: harmonické + jemný šum, aby okraj působil skalnatě
  const harm = Array.from({ length: 9 }, (_, k) => ({ k: k + 2, amp: 0.085 / (k + 1) ** 0.85 * (0.5 + rnd()), ph: rnd() * Math.PI * 2 }));
  shapeR = (a) => 0.83 + harm.reduce((s, h) => s + h.amp * Math.sin(h.k * a + h.ph), 0) + (vnoise(Math.cos(a) * 6 + 30, Math.sin(a) * 6 + 30) - 0.5) * 0.035;
  const craters: Crater[] = [];
  for (let i = 0; i < 34; i++) {
    const tier = i < 3 ? 0 : i < 11 ? 1 : 2;
    const r = tier === 0 ? 0.16 + rnd() * 0.1 : tier === 1 ? 0.06 + rnd() * 0.05 : 0.018 + rnd() * 0.03;
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * 0.8;
    craters.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, r, fresh: tier === 2 ? rnd() < 0.35 : rnd() < 0.15 });
  }
  const S = W * SS, R0 = S * 0.42, c = S / 2;
  // výška nerovností (bez základního tvaru), krátery zkreslené perspektivou u okraje
  const bump = (u: number, v: number, lim: number): { h: number; ej: number; floor: number } => {
    let h = (fbm(u * 2.4 + 5, v * 2.4 + 9) - 0.5) * 0.22 + (fbm(u * 9 + 50, v * 9 + 50, 4) - 0.5) * 0.05 + (fbm(u * 28, v * 28, 2) - 0.5) * 0.012;
    let ej = 0, floor = 0;
    for (const k of craters) {
      const cr = Math.hypot(k.x, k.y) / lim, z0 = Math.sqrt(Math.max(0.06, 1 - cr * cr));
      const er = cr > 1e-4 ? [k.x / Math.hypot(k.x, k.y), k.y / Math.hypot(k.x, k.y)] : [1, 0];
      const dx = u - k.x, dy = v - k.y, dr = (dx * er[0] + dy * er[1]) / z0, dt = -dx * er[1] + dy * er[0];
      const d = Math.hypot(dr, dt) / k.r;
      if (d < 1) { h -= (1 - d * d) * k.r * 0.75; floor = Math.max(floor, 1 - d); }
      else if (d < 1.5) h += Math.sin((d - 1) / 0.5 * Math.PI) * k.r * 0.28;
      if (k.fresh && d < 2.6) ej = Math.max(ej, (1 - Math.max(0, d - 1) / 1.6) * 0.6);
    }
    return { h, ej, floor };
  };
  const cv = document.createElement('canvas'); cv.width = cv.height = S;
  const x = cv.getContext('2d')!, img = x.createImageData(S, S), px = img.data;
  const e = 1.2 / R0;
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
    const u = (i - c) / R0, v = (j - c) / R0, rr = Math.hypot(u, v), lim = shapeR(Math.atan2(v, u));
    if (rr >= lim) continue;
    const q = rr / lim, z = Math.sqrt(Math.max(0, 1 - q * q));
    // základní normála protáhlého tělesa + nerovnosti z výškové mapy
    const b0 = bump(u, v, lim), bx = bump(u + e, v, lim).h - b0.h, by = bump(u, v + e, lim).h - b0.h;
    let nx = (u / lim) * 0.95 - bx / e * 0.55, ny = (v / lim) * 0.95 - by / e * 0.55, nz = z * 0.95 + 0.05;
    const nl = Math.hypot(nx, ny, nz); nx /= nl; ny /= nl; nz /= nl;
    const nd = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2];
    const diff = Math.max(0, nd), wrap = Math.max(0, (nd + 0.25) / 1.25) ** 2; // měkký přechod do stínu
    // albedo: šedý regolit s hnědavým nádechem, tmavá dna kráterů, světlé čerstvé výhozy, rezavé skvrny rudy
    const n = fbm(u * 3.2 + 3, v * 3.2 + 7);
    let r = lerp(70, 132, n), g = lerp(66, 124, n), b = lerp(64, 118, n);
    const rust = fbm(u * 1.8 + 40, v * 1.8 + 40, 4);
    if (rust > 0.56) { const k = Math.min(1, (rust - 0.56) / 0.12) * 0.55; r = lerp(r, 150, k); g = lerp(g, 98, k); b = lerp(b, 70, k); }
    r *= 1 - b0.floor * 0.25; g *= 1 - b0.floor * 0.25; b *= 1 - b0.floor * 0.22;
    r = lerp(r, 175, b0.ej * 0.5); g = lerp(g, 170, b0.ej * 0.5); b = lerp(b, 165, b0.ej * 0.5);
    // kovová zrnka: malý lesklý odlesk
    const metal = fbm(u * 40 + 7, v * 40 + 3, 2) > 0.74 ? 1 : 0;
    const hz = nz + LIGHT[2], hl = Math.hypot(LIGHT[0], LIGHT[1], hz), spec = metal * Math.max(0, (nx * LIGHT[0] + ny * LIGHT[1] + nz * hz) / hl) ** 30 * 1.6;
    // světlo: hlavní (modrobílé), slabé teplé odražené ve stínu, okrajový lem na osvětlené straně
    const bounce = (1 - wrap) * 0.07 * Math.max(0, -nx * 0.6 + ny * 0.6 + 0.3);
    const rim = q > 0.9 && nd > 0 ? ((q - 0.9) / 0.1) ** 2 * 0.45 : 0;
    const k = wrap * 1.15 + diff * 0.15 + 0.035;
    const o = (j * S + i) * 4;
    px[o] = Math.min(255, r * (k * LCOL[0] + bounce * 1.2) + (spec + rim) * 220);
    px[o + 1] = Math.min(255, g * (k * LCOL[1] + bounce * 0.95) + (spec + rim) * 235);
    px[o + 2] = Math.min(255, b * (k * LCOL[2] + bounce * 0.75) + (spec + rim) * 255);
    px[o + 3] = Math.min(255, (lim - rr) * R0 * 255); // vyhlazený okraj
  }
  x.putImageData(img, 0, 0);
  tex = cv; texFor = W;
}

/** Platforma VESPER-7 na osvětlené straně: moduly, sluneční křídla a blikající maják. */
function drawPlatform(x: CanvasRenderingContext2D, cx: number, R0: number, t: number) {
  const px = cx - R0 * 0.24, py = cx - R0 * 0.36, s = R0 / 210;
  x.save(); x.translate(px, py); x.rotate(-0.45); x.scale(s, s);
  x.fillStyle = 'rgba(10,12,24,0.55)'; x.fillRect(-15, 3, 34, 6);                  // stín
  x.fillStyle = '#9aa6c8'; x.fillRect(-14, -4, 12, 8); x.fillRect(2, -6, 14, 10);   // moduly
  x.fillStyle = '#5d6ea8'; x.fillRect(-30, -2, 14, 4); x.fillRect(18, -2, 14, 4);   // panely
  x.fillStyle = '#d6dcf0'; x.fillRect(7, -12, 2, 6);                                 // anténa
  const on = reduce || (t % 1.6) < 0.25;
  x.fillStyle = on ? '#ffb35c' : 'rgba(255,179,92,0.25)'; x.beginPath(); x.arc(8, -13, on ? 2.6 : 1.6, 0, 7); x.fill();
  if (on) { x.fillStyle = 'rgba(255,179,92,0.25)'; x.beginPath(); x.arc(8, -13, 7, 0, 7); x.fill(); }
  x.fillStyle = 'rgba(127,211,234,0.9)'; x.fillRect(-10, -1, 2, 2); x.fillRect(6, -2, 2, 2); x.fillRect(11, -2, 2, 2); // okna
  x.restore();
}

type Bit = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; dust: boolean };
const bits: Bit[] = [];
let pulse = 0, clock = 0;
/** Úder do asteroidu; x, y jsou v pixelech plátna (bez nich náhodné místo na povrchu). */
export function hitRock(px?: number, py?: number, W = 520) {
  pulse = 1;
  const c = W / 2, R0 = W * 0.42;
  if (px === undefined || py === undefined) { const a = Math.random() * 7; px = c + Math.cos(a) * R0 * 0.6; py = c + Math.sin(a) * R0 * 0.6; }
  if (reduce) return;
  const base = Math.atan2(py - c, px - c);
  for (let i = 0; i < 12; i++) {
    const dust = i >= 8, a = base + (Math.random() - 0.5) * 1.6, sp = (dust ? 30 : 80) + Math.random() * (dust ? 50 : 160);
    bits.push({ x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: dust ? 1.1 : 0.55 + Math.random() * 0.4, size: dust ? 10 + Math.random() * 14 : 2 + Math.random() * 3, dust });
  }
  if (bits.length > 160) bits.splice(0, bits.length - 160);
}

export function drawRock(c: HTMLCanvasElement, dt: number, drones = 0) {
  const x = c.getContext('2d')!, W = c.width, cx = W / 2, R0 = W * 0.42;
  if (!tex || texFor !== W) bakeRock(W);
  pulse = Math.max(0, pulse - dt * 6); clock += dt;
  x.clearRect(0, 0, W, W);
  const glow = x.createRadialGradient(cx, cx, R0 * 0.7, cx, cx, R0 * 1.3);
  glow.addColorStop(0, 'rgba(242,165,65,0.08)'); glow.addColorStop(1, 'rgba(242,165,65,0)');
  x.fillStyle = glow; x.fillRect(0, 0, W, W);
  // drony obíhají po skloněných elipsách; ty za asteroidem se kreslí před ním (pod něj)
  const n = Math.min(Math.floor(drones), 24), pos: [number, number, boolean, number][] = [];
  for (let i = 0; i < n; i++) {
    const rad = R0 * (1.04 + (i % 5) * 0.05), sp = 0.25 + (i % 7) * 0.04, a = i * 2.39996 + (reduce ? 0 : clock * sp) * (i % 2 ? 1 : -1);
    const tilt = 0.32 + (i % 3) * 0.08, ox = Math.cos(a) * rad, oy = Math.sin(a) * rad * tilt;
    const rot = (i % 4) * 0.5 - 0.6, rx = ox * Math.cos(rot) - oy * Math.sin(rot), ry = ox * Math.sin(rot) + oy * Math.cos(rot);
    pos.push([cx + rx, cx + ry, Math.sin(a) < 0, i]);
  }
  const drawDrone = ([dx, dy, behind, i]: [number, number, boolean, number]) => {
    const fire = !reduce && Math.sin(clock * (1.3 + (i % 5) * 0.21) + i * 1.7) > 0.93;
    if (fire && !behind) { // krátký těžební paprsek k povrchu
      const tx = cx + (dx - cx) * 0.55, ty = cx + (dy - cx) * 0.55;
      x.strokeStyle = 'rgba(242,165,65,0.55)'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(dx, dy); x.lineTo(tx, ty); x.stroke();
    }
    x.globalAlpha = behind ? 0.35 : 1;
    x.fillStyle = 'rgba(127,211,234,0.25)'; x.beginPath(); x.arc(dx, dy, 6, 0, 7); x.fill();
    x.fillStyle = fire ? '#f2c27a' : '#cfeef7'; x.beginPath(); x.arc(dx, dy, 2.4, 0, 7); x.fill();
    x.globalAlpha = 1;
  };
  pos.filter((p) => p[2]).forEach(drawDrone);
  const sc = 1 - pulse * 0.035;
  x.save(); x.translate(cx, cx); x.scale(sc, sc); x.drawImage(tex!, -cx, -cx, W, W); x.translate(-cx, -cx); drawPlatform(x, cx, R0, clock); x.restore();
  pos.filter((p) => !p[2]).forEach(drawDrone);
  // úlomky a prach z úderu
  for (let i = bits.length - 1; i >= 0; i--) {
    const b = bits[i]; b.life += dt;
    if (b.life >= b.max) { bits.splice(i, 1); continue; }
    b.x += b.vx * dt; b.y += b.vy * dt; b.vx *= 0.96; b.vy *= 0.96;
    const k = 1 - b.life / b.max;
    if (b.dust) { x.fillStyle = `rgba(170,140,115,${0.18 * k})`; x.beginPath(); x.arc(b.x, b.y, b.size * (1.4 - k * 0.6), 0, 7); x.fill(); }
    else { x.fillStyle = `rgba(208,141,92,${k})`; x.fillRect(b.x, b.y, b.size, b.size); }
  }
}

// ---------- mapa soustavy ----------
function bodyPos(id: LocationId, time: number): [number, number] {
  const l = L[id]; const a = l.angle + (reduce ? 0 : time * l.speed);
  return [Math.cos(a) * l.orbit, Math.sin(a) * l.orbit * 0.6];
}
export function drawMap(c: HTMLCanvasElement, s: State, time: number) {
  const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
  if (!W || !H) return;
  if (c.width !== Math.round(W * dpr)) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
  const x = c.getContext('2d')!; x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2, sc = Math.min(W / 2, H / 2 / 0.6) * 0.92;
  const P = ([a, b]: [number, number]): [number, number] => [cx + a * sc, cy + b * sc];
  for (const id of LOCATION_IDS) {
    if (id === 'sun') continue;
    x.beginPath(); x.ellipse(cx, cy, L[id].orbit * sc, L[id].orbit * sc * 0.6, 0, 0, 7);
    x.strokeStyle = 'rgba(139,145,182,0.25)'; x.lineWidth = 1; x.setLineDash(id === 'belt' ? [2, 4] : []); x.stroke();
  }
  x.setLineDash([]);
  // Aldra – modrý veleobr
  const sg = x.createRadialGradient(cx, cy, 0, cx, cy, sc * 0.13);
  sg.addColorStop(0, '#ffffff'); sg.addColorStop(0.35, '#cfdcff'); sg.addColorStop(0.7, 'rgba(125,156,255,0.35)'); sg.addColorStop(1, 'rgba(125,156,255,0)');
  x.fillStyle = sg; x.beginPath(); x.arc(cx, cy, sc * 0.13, 0, 7); x.fill();
  // Dysonův roj
  const n = Math.min(Math.floor(s.b.dyson), 72);
  for (let i = 0; i < n; i++) {
    const a = (i / 72) * Math.PI * 2 + (reduce ? 0 : time * 0.15);
    x.beginPath(); x.ellipse(cx, cy, sc * 0.085, sc * 0.085 * 0.6, 0, a, a + 0.05);
    x.strokeStyle = '#f2a541'; x.lineWidth = 3; x.stroke();
  }
  // pás asteroidů
  for (let k = 0; k < 40; k++) {
    const a = k * 0.157 + (reduce ? 0 : time * 0.02);
    x.fillStyle = 'rgba(208,141,92,0.55)';
    x.fillRect(cx + Math.cos(a) * L.belt.orbit * sc - 1, cy + Math.sin(a) * L.belt.orbit * sc * 0.6 - 1, 2, 2);
  }
  // tělesa
  const look: Record<LocationId, [string, number]> = { belt: ['#d08d5c', 4], moon: ['#cfeef7', 5], giant: ['#c79a6b', 9], sun: ['#ffffff', 0] };
  x.font = '11px "JetBrains Mono", monospace';
  for (const id of LOCATION_IDS) {
    const [px, py] = P(bodyPos(id, time)); const [col, rad] = look[id];
    if (rad) { x.beginPath(); x.arc(px, py, rad, 0, 7); x.fillStyle = col; x.fill(); }
    if (id === 'giant') { x.beginPath(); x.ellipse(px, py, rad * 1.8, rad * 0.4, -0.3, 0, 7); x.strokeStyle = 'rgba(226,189,143,0.6)'; x.lineWidth = 1; x.stroke(); }
    x.fillStyle = s.visited[id] ? '#e1e4f4' : '#b0b5d4';
    x.fillText(t(`loc.${id}.short`), px + (rad || sc * 0.1) + 6, py + 4);
  }
  // loď Vesper
  let sp: [number, number];
  if (s.travel) {
    const a = P(bodyPos(s.travel.from, time)), b = P(bodyPos(s.travel.to, time)), k = s.travel.t / s.travel.total;
    sp = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    x.beginPath(); x.moveTo(...a); x.lineTo(...b); x.strokeStyle = 'rgba(242,165,65,0.4)'; x.setLineDash([3, 4]); x.stroke(); x.setLineDash([]);
  } else { const p = P(bodyPos(s.loc, time)); sp = [p[0], p[1] - 12]; }
  x.save(); x.translate(sp[0], sp[1]); x.beginPath(); x.moveTo(0, -5); x.lineTo(4, 4); x.lineTo(-4, 4); x.closePath(); x.fillStyle = '#f2a541'; x.fill(); x.restore();
}
