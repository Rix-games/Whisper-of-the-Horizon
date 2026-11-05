// Kreslení na plátno: hvězdné pozadí, asteroid a mapa soustavy.
import { L, type LocationId } from '../core/defs.js';
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
// Stylizovaná, ale detailní: vrstvená záře hvězdy, dráhy s hloubkou (zadní polovina tlumená a schovaná
// za hvězdou), tělesa jako koule osvícené od Aldry, pás z jednotlivých kamenů a loď se stopou.
const TILT = 0.42;
type Speck = { a: number; r: number; s: number; b: number };
let belt: Speck[] = [];
let mapBg: HTMLCanvasElement | null = null, mapBgKey = '';
const trail: [number, number][] = [];

function bodyPos(id: LocationId, time: number): [number, number] {
  const l = L[id]; const a = l.angle + (reduce ? 0 : time * l.speed);
  return [Math.cos(a) * l.orbit, Math.sin(a) * l.orbit * TILT];
}
function front(id: LocationId, time: number) { const l = L[id]; return Math.sin(l.angle + (reduce ? 0 : time * l.speed)) >= 0; }

/** Pozadí mapy: mlhovina a vzdálené hvězdy, spočítané jednou pro danou velikost. */
function bakeMapBg(W: number, H: number, dpr: number) {
  const cv = document.createElement('canvas'); cv.width = W * dpr; cv.height = H * dpr;
  const x = cv.getContext('2d')!; x.scale(dpr, dpr);
  let sd = 3; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  const g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
  g.addColorStop(0, '#141a3a'); g.addColorStop(0.55, '#0c0f22'); g.addColorStop(1, '#070812');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  for (const [cx, cy, rad, col] of [[0.18, 0.25, 0.45, '90,60,140'], [0.85, 0.75, 0.5, '40,90,150'], [0.7, 0.15, 0.3, '150,70,90']] as [number, number, number, string][]) {
    const n = x.createRadialGradient(cx * W, cy * H, 0, cx * W, cy * H, rad * W);
    n.addColorStop(0, `rgba(${col},0.10)`); n.addColorStop(1, `rgba(${col},0)`); x.fillStyle = n; x.fillRect(0, 0, W, H);
  }
  for (let i = 0; i < (W * H) / 900; i++) {
    const a = r() ** 2.2 * 0.8 + 0.1; x.fillStyle = r() < 0.15 ? `rgba(255,214,170,${a})` : `rgba(210,222,255,${a})`;
    const s = r() < 0.05 ? 1.6 : 0.8; x.fillRect(r() * W, r() * H, s, s);
  }
  return cv;
}

/** Koule osvícená od hvězdy ve středu: světlá strana míří k Aldře. */
function litSphere(x: CanvasRenderingContext2D, px: number, py: number, rad: number, cx: number, cy: number, base: [string, string, string]) {
  const dx = cx - px, dy = cy - py, d = Math.hypot(dx, dy) || 1, ox = (dx / d) * rad * 0.45, oy = (dy / d) * rad * 0.45;
  const g = x.createRadialGradient(px + ox, py + oy, rad * 0.1, px, py, rad * 1.05);
  g.addColorStop(0, base[0]); g.addColorStop(0.55, base[1]); g.addColorStop(1, base[2]);
  x.fillStyle = g; x.beginPath(); x.arc(px, py, rad, 0, 7); x.fill();
}

export function drawMap(c: HTMLCanvasElement, s: State, time: number) {
  const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
  if (!W || !H) return;
  if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
  const x = c.getContext('2d')!; x.setTransform(dpr, 0, 0, dpr, 0, 0);
  const key = `${W}x${H}@${dpr}`;
  if (!mapBg || mapBgKey !== key) { mapBg = bakeMapBg(W, H, dpr); mapBgKey = key; }
  x.drawImage(mapBg, 0, 0, W, H);
  if (!belt.length) {
    let sd = 9; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    belt = Array.from({ length: 320 }, () => ({ a: r() * Math.PI * 2, r: L.belt.orbit + (r() + r() + r() - 1.5) * 0.03, s: 0.5 + r() ** 3 * 1.6, b: 0.25 + r() * 0.6 }));
  }
  const cx = W / 2, cy = H / 2, sc = Math.min((W / 2) * 0.9, (H / 2 / TILT) * 0.82);
  const P = ([a, b]: [number, number]): [number, number] => [cx + a * sc, cy + b * sc];
  const tt = reduce ? 0 : time;

  // dráhy: polovina za hvězdou (tlumená) nebo před ní (jasnější)
  const orbit = (id: LocationId, half: 'back' | 'front') => {
    const rx = L[id].orbit * sc, ry = rx * TILT;
    x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, half === 'back' ? Math.PI : 0, half === 'back' ? Math.PI * 2 : Math.PI);
    x.strokeStyle = half === 'back' ? 'rgba(150,160,210,0.12)' : 'rgba(170,180,230,0.28)'; x.lineWidth = 1; x.stroke();
    for (let k = 0; k < 24; k++) { // jemné značky po dráze
      const a = (k / 24) * Math.PI * 2, isFront = Math.sin(a) >= 0;
      if ((half === 'front') !== isFront) continue;
      x.fillStyle = isFront ? 'rgba(170,180,230,0.35)' : 'rgba(150,160,210,0.15)';
      x.fillRect(cx + Math.cos(a) * rx - 0.5, cy + Math.sin(a) * ry - 0.5, 1, 1);
    }
  };
  const beltPass = (half: 'back' | 'front') => {
    for (const p of belt) {
      const a = p.a + tt * 0.012, sn = Math.sin(a);
      if ((half === 'front') !== (sn >= 0)) continue;
      const bx = cx + Math.cos(a) * p.r * sc, by = cy + sn * p.r * sc * TILT;
      x.fillStyle = `rgba(214,170,132,${p.b * (sn >= 0 ? 1 : 0.45)})`;
      x.fillRect(bx - p.s / 2, by - p.s / 2, p.s, p.s);
    }
  };
  for (const id of ['giant', 'moon'] as LocationId[]) orbit(id, 'back');
  beltPass('back');

  // Dysonův roj: zadní část
  const nd = Math.min(Math.floor(s.b.dyson), 90);
  const swarm = (half: 'back' | 'front') => {
    for (let i = 0; i < nd; i++) {
      const ring = i % 3, a = (i / nd) * Math.PI * 2 * 3 + tt * (0.12 + ring * 0.03), rr = sc * (0.07 + ring * 0.012);
      const sn = Math.sin(a); if ((half === 'front') !== (sn >= 0)) continue;
      const tilt = [0.35, 0.6, 0.2][ring], rot = [0.3, -0.5, 1.1][ring];
      const ox = Math.cos(a) * rr, oy = sn * rr * tilt;
      const px = cx + ox * Math.cos(rot) - oy * Math.sin(rot), py = cy + ox * Math.sin(rot) + oy * Math.cos(rot);
      const glint = 0.45 + 0.55 * Math.max(0, Math.cos(a * 2 + tt));
      x.fillStyle = `rgba(242,178,90,${(sn >= 0 ? 1 : 0.35) * glint})`; x.fillRect(px - 1.2, py - 0.8, 2.4, 1.6);
    }
  };
  swarm('back');

  // Aldra: bez viditelného lemu, jen široké a slabé rozptýlené světlo, které prosvětlí okolí
  const R = sc * 0.05, far = sc * 0.75;
  const halo = x.createRadialGradient(cx, cy, R, cx, cy, far);
  halo.addColorStop(0, 'rgba(150,175,255,0.16)'); halo.addColorStop(0.15, 'rgba(140,165,255,0.09)');
  halo.addColorStop(0.4, 'rgba(130,155,255,0.04)'); halo.addColorStop(0.7, 'rgba(120,150,255,0.012)'); halo.addColorStop(1, 'rgba(120,150,255,0)');
  x.fillStyle = halo; x.beginPath(); x.arc(cx, cy, far, 0, 7); x.fill();
  const core = x.createRadialGradient(cx - R * 0.2, cy - R * 0.2, 0, cx, cy, R);
  core.addColorStop(0, '#f4f7ff'); core.addColorStop(0.55, '#cbd8ff'); core.addColorStop(0.9, '#8ea6f0'); core.addColorStop(1, '#6f86d6');
  x.fillStyle = core; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fill();

  swarm('front');
  beltPass('front');
  for (const id of ['moon', 'giant'] as LocationId[]) orbit(id, 'front');

  // tělesa
  x.font = '11px "JetBrains Mono", ui-monospace, monospace';
  const label = (id: LocationId, px: number, py: number, rad: number) => {
    const lx = px + rad + 10, ly = py - rad - 8;
    x.strokeStyle = 'rgba(170,180,230,0.35)'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(px + rad * 0.7, py - rad * 0.7); x.lineTo(lx - 2, ly + 3); x.lineTo(lx + 2, ly + 3); x.stroke();
    x.fillStyle = s.visited[id] ? '#e1e4f4' : '#8a90b8';
    x.fillText(t_(id) + (s.visited[id] ? '' : ' ?'), lx + 4, ly + 6);
  };
  const order = (['belt', 'moon', 'giant'] as LocationId[]).sort((a, b) => bodyPos(a, time)[1] - bodyPos(b, time)[1]);
  for (const id of order) {
    const [px, py] = P(bodyPos(id, time)), isFront = front(id, time);
    x.globalAlpha = isFront ? 1 : 0.85;
    if (id === 'giant') {
      const rad = 10;
      const ring = (h: 'back' | 'front') => { x.beginPath(); x.ellipse(px, py, rad * 2.1, rad * 0.55, -0.35, h === 'back' ? Math.PI : 0, h === 'back' ? Math.PI * 2 : Math.PI); x.strokeStyle = 'rgba(226,196,150,0.55)'; x.lineWidth = 2; x.stroke(); x.strokeStyle = 'rgba(226,196,150,0.25)'; x.lineWidth = 4; x.stroke(); };
      ring('back');
      x.save(); x.beginPath(); x.arc(px, py, rad, 0, 7); x.clip();
      x.fillStyle = '#c9a072'; x.fillRect(px - rad, py - rad, rad * 2, rad * 2);
      const bands = ['#e3c08c', '#b07e52', '#d9b07a', '#9c6c48', '#e6c796', '#b9875a'];
      x.save(); x.translate(px, py); x.rotate(-0.35);
      bands.forEach((col, k) => { x.fillStyle = col; x.fillRect(-rad * 1.5, -rad + k * (rad * 2 / bands.length) + Math.sin(tt * 0.3 + k) * 0.4, rad * 3, rad * 2 / bands.length * 0.7); });
      x.restore();
      const sh = x.createRadialGradient(px + (cx - px) / Math.hypot(cx - px, cy - py) * rad * 0.5, py + (cy - py) / Math.hypot(cx - px, cy - py) * rad * 0.5, rad * 0.2, px, py, rad * 1.1);
      sh.addColorStop(0, 'rgba(255,255,255,0.12)'); sh.addColorStop(0.6, 'rgba(10,8,20,0.15)'); sh.addColorStop(1, 'rgba(5,4,12,0.8)');
      x.fillStyle = sh; x.fillRect(px - rad, py - rad, rad * 2, rad * 2);
      x.restore();
      ring('front');
      for (const [mr, msp, mc] of [[rad * 2.6, 0.9, '#c9cbd6'], [rad * 3.4, 0.55, '#b9a58f']] as [number, number, string][]) {
        const ma = tt * msp + mr, mx = px + Math.cos(ma) * mr, my = py + Math.sin(ma) * mr * 0.4;
        x.globalAlpha = Math.sin(ma) < 0 ? 0.55 : 1; litSphere(x, mx, my, 1.8, cx, cy, ['#ffffff', mc, '#1c1a24']); x.globalAlpha = 1;
      }
      label(id, px, py, rad);
    } else if (id === 'moon') {
      const rad = 5.5;
      litSphere(x, px, py, rad, cx, cy, ['#f4fbff', '#a9d6e6', '#20323f']);
      x.strokeStyle = 'rgba(120,170,190,0.5)'; x.lineWidth = 0.6; x.beginPath(); x.moveTo(px - rad * 0.5, py - rad * 0.2); x.lineTo(px + rad * 0.2, py + rad * 0.3); x.lineTo(px + rad * 0.6, py - rad * 0.1); x.stroke();
      label(id, px, py, rad);
    } else {
      const rad = 4;
      litSphere(x, px, py, rad, cx, cy, ['#d9b394', '#8a6a55', '#2a1f1d']);
      const on = reduce || (time % 1.6) < 0.25; // světlo platformy
      x.fillStyle = on ? 'rgba(255,179,92,1)' : 'rgba(255,179,92,0.35)'; x.beginPath(); x.arc(px + 1.5, py - 1.5, on ? 1.4 : 0.9, 0, 7); x.fill();
      label(id, px, py, rad);
    }
    x.globalAlpha = 1;
    if (s.loc === id && !s.travel) { // kde právě kotvíš
      x.strokeStyle = 'rgba(242,165,65,0.8)'; x.lineWidth = 1; x.setLineDash([2, 3]);
      x.beginPath(); x.arc(px, py, (id === 'giant' ? 10 : id === 'moon' ? 5.5 : 4) + 6 + Math.sin(time * 2) * 1, 0, 7); x.stroke(); x.setLineDash([]);
    }
  }
  // stanice u koróny: malý kosočtverec na vnitřní dráze
  { const [px, py] = P(bodyPos('sun', time));
    x.save(); x.translate(px, py); x.rotate(Math.PI / 4); x.fillStyle = s.visited.sun ? '#f2a541' : 'rgba(242,165,65,0.45)'; x.fillRect(-2.5, -2.5, 5, 5); x.restore();
    if (s.loc === 'sun' && !s.travel) { x.strokeStyle = 'rgba(242,165,65,0.8)'; x.setLineDash([2, 3]); x.beginPath(); x.arc(px, py, 9, 0, 7); x.stroke(); x.setLineDash([]); }
    x.fillStyle = s.visited.sun ? '#e1e4f4' : '#8a90b8'; x.fillText(t('loc.sun.short') + (s.visited.sun ? '' : ' ?'), px + 8, py + 14); }

  // Vesper: zakřivená dráha přeletu, stopa, loď s plamenem motoru
  let sp: [number, number], ang = -Math.PI / 2;
  if (s.travel) {
    const a = P(bodyPos(s.travel.from, time)), b = P(bodyPos(s.travel.to, time)), k = s.travel.t / s.travel.total;
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, nx = -(b[1] - a[1]), ny = b[0] - a[0], nl = Math.hypot(nx, ny) || 1, bend = 0.25;
    const ctrl: [number, number] = [mx + nx / nl * Math.hypot(nx, ny) * bend, my + ny / nl * Math.hypot(nx, ny) * bend];
    const q = (u: number): [number, number] => [(1 - u) ** 2 * a[0] + 2 * (1 - u) * u * ctrl[0] + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * ctrl[1] + u * u * b[1]];
    x.setLineDash([2, 5]); x.strokeStyle = 'rgba(242,165,65,0.35)'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(...a); x.quadraticCurveTo(ctrl[0], ctrl[1], b[0], b[1]); x.stroke(); x.setLineDash([]);
    sp = q(k); const ahead = q(Math.min(1, k + 0.01)); ang = Math.atan2(ahead[1] - sp[1], ahead[0] - sp[0]);
    trail.push(sp); if (trail.length > 40) trail.shift();
  } else { trail.length = 0; const p = P(bodyPos(s.loc, time)); sp = [p[0], p[1] - 14]; }
  for (let i = 1; i < trail.length; i++) {
    x.strokeStyle = `rgba(242,165,65,${(i / trail.length) * 0.5})`; x.lineWidth = 1.5;
    x.beginPath(); x.moveTo(...trail[i - 1]); x.lineTo(...trail[i]); x.stroke();
  }
  x.save(); x.translate(sp[0], sp[1]); x.rotate(ang);
  if (s.travel) { const fl = x.createLinearGradient(-4, 0, -14, 0); fl.addColorStop(0, 'rgba(160,210,255,0.9)'); fl.addColorStop(1, 'rgba(160,210,255,0)'); x.fillStyle = fl; x.beginPath(); x.moveTo(-4, -1.6); x.lineTo(-14 - Math.sin(time * 20) * 1.5, 0); x.lineTo(-4, 1.6); x.fill(); }
  x.fillStyle = '#f2a541'; x.beginPath(); x.moveTo(6, 0); x.lineTo(-4, -3.2); x.lineTo(-2.5, 0); x.lineTo(-4, 3.2); x.closePath(); x.fill();
  x.fillStyle = '#fff2dc'; x.fillRect(1, -0.6, 2, 1.2);
  x.restore();
  {
    // trojánské planetky v Lagrangeových bodech L4 a L5 dráhy Taurisu (60° před a za planetou)
    {
      const ga = L.giant.angle + tt * L.giant.speed;
      for (const off of [Math.PI / 3, -Math.PI / 3]) for (let k = 0; k < 26; k++) {
        const a = ga + off + Math.sin(k * 12.9898) * 0.16, rr = L.giant.orbit + Math.sin(k * 78.233) * 0.02;
        const bx = cx + Math.cos(a) * rr * sc, by = cy + Math.sin(a) * rr * sc * TILT;
        x.fillStyle = `rgba(200,180,160,${0.35 + 0.3 * Math.abs(Math.sin(k * 3.1))})`; x.fillRect(bx - 0.6, by - 0.6, 1.2, 1.2);
      }
      for (const id of ['belt', 'moon', 'giant'] as LocationId[]) { // šipky směru oběhu na přední straně
        const a = Math.PI * 0.5 + 0.25, rx = L[id].orbit * sc, ry = rx * TILT;
        const px2 = cx + Math.cos(a) * rx, py2 = cy + Math.sin(a) * ry, ang2 = Math.atan2(Math.cos(a) * ry, -Math.sin(a) * rx);
        x.save(); x.translate(px2, py2); x.rotate(ang2); x.strokeStyle = 'rgba(170,180,230,0.45)'; x.lineWidth = 1;
        x.beginPath(); x.moveTo(-3, -2.5); x.lineTo(1, 0); x.lineTo(-3, 2.5); x.stroke(); x.restore();
      }
    }
    // kometa na protáhlé dráze; chvost míří vždy od hvězdy a je delší blízko ní
    const ea = 0.64, ee = 0.78, w0 = 2.5, th = (tt * 0.05) % (Math.PI * 2);
    const rr = ea * (1 - ee * ee) / (1 + ee * Math.cos(th)), ca = th + w0;
    const kx = cx + Math.cos(ca) * rr * sc, ky = cy + Math.sin(ca) * rr * sc * TILT;
    const ux = (kx - cx) / (Math.hypot(kx - cx, ky - cy) || 1), uy = (ky - cy) / (Math.hypot(kx - cx, ky - cy) || 1), tl = Math.min(45, 12 / Math.max(rr, 0.12));
    // chvost: měkký kužel, který se od hlavy rozšiřuje a slábne; koma: rozmazaná svítící hlava
    const px3 = -uy, py3 = ux, wd = 1.5 + tl * 0.09;
    const tg = x.createLinearGradient(kx, ky, kx + ux * tl, ky + uy * tl);
    tg.addColorStop(0, 'rgba(205,225,255,0.22)'); tg.addColorStop(0.4, 'rgba(180,205,255,0.07)'); tg.addColorStop(1, 'rgba(160,190,255,0)');
    x.fillStyle = tg; x.beginPath();
    x.moveTo(kx + px3 * 1.2, ky + py3 * 1.2);
    x.quadraticCurveTo(kx + ux * tl * 0.5 + px3 * wd * 0.7, ky + uy * tl * 0.5 + py3 * wd * 0.7, kx + ux * tl + px3 * wd, ky + uy * tl + py3 * wd);
    x.lineTo(kx + ux * tl - px3 * wd, ky + uy * tl - py3 * wd);
    x.quadraticCurveTo(kx + ux * tl * 0.5 - px3 * wd * 0.7, ky + uy * tl * 0.5 - py3 * wd * 0.7, kx - px3 * 1.2, ky - py3 * 1.2);
    x.closePath(); x.fill();
    const coma = x.createRadialGradient(kx, ky, 0, kx, ky, 4);
    coma.addColorStop(0, 'rgba(235,245,255,0.6)'); coma.addColorStop(0.3, 'rgba(200,225,255,0.2)'); coma.addColorStop(1, 'rgba(180,210,255,0)');
    x.fillStyle = coma; x.beginPath(); x.arc(kx, ky, 4, 0, 7); x.fill();
  }
  // jemná vinětace
  const v = x.createRadialGradient(cx, cy, Math.min(W, H) * 0.35, cx, cy, Math.max(W, H) * 0.75);
  v.addColorStop(0, 'rgba(5,6,15,0)'); v.addColorStop(1, 'rgba(5,6,15,0.55)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
}
const t_ = (id: LocationId) => t(`loc.${id}.short`);
