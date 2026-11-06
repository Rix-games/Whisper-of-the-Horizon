import { t } from '../i18n/index.js';
import { L } from '../core/defs.js';

export const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export let stars: any[] = [];
export function sizeStars(c) {
  const d = Math.min(2, devicePixelRatio || 1);
  c.width = innerWidth * d;
  c.height = innerHeight * d;
  const n = Math.round(innerWidth * innerHeight / 4500);
  stars = Array.from({ length: n }, () => {
    const tint = Math.random() < 0.12 ? "#ffd9b0" : Math.random() < 0.2 ? "#bcd0ff" : "#e6e9ff";
    return [Math.random() * c.width, Math.random() * c.height, (Math.random() * 1.2 + 0.3) * d, Math.random() * 6, tint];
  });
}
export function drawStars(c, time) {
  const x = c.getContext("2d");
  x.clearRect(0, 0, c.width, c.height);
  for (const [sx, sy, r, p, tint] of stars) {
    x.globalAlpha = reduce ? 0.5 : 0.3 + 0.3 * Math.sin(time * 0.6 + p);
    x.fillStyle = tint;
    x.fillRect(sx, sy, r, r);
  }
  x.globalAlpha = 1;
}
export let seed = 7;
export const rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
export const LATTICE = 64;
export const lat = [];
export const lerp = (a, b, t2) => a + (b - a) * t2;
export const fade = (t2) => t2 * t2 * (3 - 2 * t2);
export function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = fade(x - xi), yf = fade(y - yi);
  const g = (i, j) => lat[(i & LATTICE - 1) * LATTICE + (j & LATTICE - 1)];
  return lerp(lerp(g(xi, yi), g(xi + 1, yi), xf), lerp(g(xi, yi + 1), g(xi + 1, yi + 1), xf), yf);
}
export function fbm(x, y, oct = 5) {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < oct; i++) {
    v += a * vnoise(x * f, y * f);
    a *= 0.5;
    f *= 2.03;
  }
  return v;
}
export let tex = null;
export let texFor = 0;
export let shapeR: (a: number) => number = () => 1;
export const SS = 2;
export const LIGHT = (() => {
  const v = [-0.78, -0.42, 0.46];
  const l = Math.hypot(...v);
  return v.map((a) => a / l);
})();
export const LCOL = [0.86, 0.93, 1.1];
export function bakeRock(W) {
  seed = 11;
  lat.length = 0;
  for (let i = 0; i < LATTICE * LATTICE; i++) lat.push(rnd());
  const harm = Array.from({ length: 9 }, (_, k) => ({ k: k + 2, amp: 0.085 / (k + 1) ** 0.85 * (0.5 + rnd()), ph: rnd() * Math.PI * 2 }));
  shapeR = (a) => 0.83 + harm.reduce((s, h) => s + h.amp * Math.sin(h.k * a + h.ph), 0) + (vnoise(Math.cos(a) * 6 + 30, Math.sin(a) * 6 + 30) - 0.5) * 0.035;
  const craters = [];
  for (let i = 0; i < 34; i++) {
    const tier = i < 3 ? 0 : i < 11 ? 1 : 2;
    const r = tier === 0 ? 0.16 + rnd() * 0.1 : tier === 1 ? 0.06 + rnd() * 0.05 : 0.018 + rnd() * 0.03;
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * 0.8;
    craters.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, r, fresh: tier === 2 ? rnd() < 0.35 : rnd() < 0.15 });
  }
  const S2 = W * SS, R0 = S2 * 0.42, c = S2 / 2;
  const bump = (u, v, lim) => {
    let h = (fbm(u * 2.4 + 5, v * 2.4 + 9) - 0.5) * 0.22 + (fbm(u * 9 + 50, v * 9 + 50, 4) - 0.5) * 0.05 + (fbm(u * 28, v * 28, 2) - 0.5) * 0.012;
    let ej = 0, floor = 0;
    for (const k of craters) {
      const cr = Math.hypot(k.x, k.y) / lim, z0 = Math.sqrt(Math.max(0.06, 1 - cr * cr));
      const er = cr > 1e-4 ? [k.x / Math.hypot(k.x, k.y), k.y / Math.hypot(k.x, k.y)] : [1, 0];
      const dx = u - k.x, dy = v - k.y, dr = (dx * er[0] + dy * er[1]) / z0, dt = -dx * er[1] + dy * er[0];
      const d = Math.hypot(dr, dt) / k.r;
      if (d < 1) {
        h -= (1 - d * d) * k.r * 0.75;
        floor = Math.max(floor, 1 - d);
      } else if (d < 1.5) h += Math.sin((d - 1) / 0.5 * Math.PI) * k.r * 0.28;
      if (k.fresh && d < 2.6) ej = Math.max(ej, (1 - Math.max(0, d - 1) / 1.6) * 0.6);
    }
    return { h, ej, floor };
  };
  const cv = document.createElement("canvas");
  cv.width = cv.height = S2;
  const x = cv.getContext("2d"), img = x.createImageData(S2, S2), px = img.data;
  const e = 1.2 / R0;
  for (let j = 0; j < S2; j++) for (let i = 0; i < S2; i++) {
    const u = (i - c) / R0, v = (j - c) / R0, rr = Math.hypot(u, v), lim = shapeR(Math.atan2(v, u));
    if (rr >= lim) continue;
    const q = rr / lim, z = Math.sqrt(Math.max(0, 1 - q * q));
    const b0 = bump(u, v, lim), bx = bump(u + e, v, lim).h - b0.h, by = bump(u, v + e, lim).h - b0.h;
    let nx = u / lim * 0.95 - bx / e * 0.55, ny = v / lim * 0.95 - by / e * 0.55, nz = z * 0.95 + 0.05;
    const nl = Math.hypot(nx, ny, nz);
    nx /= nl;
    ny /= nl;
    nz /= nl;
    const nd = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2];
    const diff = Math.max(0, nd), wrap = Math.max(0, (nd + 0.25) / 1.25) ** 2;
    const n = fbm(u * 3.2 + 3, v * 3.2 + 7);
    let r = lerp(70, 132, n), g = lerp(66, 124, n), b = lerp(64, 118, n);
    const rust = fbm(u * 1.8 + 40, v * 1.8 + 40, 4);
    if (rust > 0.56) {
      const k2 = Math.min(1, (rust - 0.56) / 0.12) * 0.55;
      r = lerp(r, 150, k2);
      g = lerp(g, 98, k2);
      b = lerp(b, 70, k2);
    }
    r *= 1 - b0.floor * 0.25;
    g *= 1 - b0.floor * 0.25;
    b *= 1 - b0.floor * 0.22;
    r = lerp(r, 175, b0.ej * 0.5);
    g = lerp(g, 170, b0.ej * 0.5);
    b = lerp(b, 165, b0.ej * 0.5);
    const metal = fbm(u * 40 + 7, v * 40 + 3, 2) > 0.74 ? 1 : 0;
    const hz = nz + LIGHT[2], hl = Math.hypot(LIGHT[0], LIGHT[1], hz), spec = metal * Math.max(0, (nx * LIGHT[0] + ny * LIGHT[1] + nz * hz) / hl) ** 30 * 1.6;
    const bounce = (1 - wrap) * 0.07 * Math.max(0, -nx * 0.6 + ny * 0.6 + 0.3);
    const rim = q > 0.9 && nd > 0 ? ((q - 0.9) / 0.1) ** 2 * 0.45 : 0;
    const k = wrap * 1.15 + diff * 0.15 + 0.035;
    const o = (j * S2 + i) * 4;
    px[o] = Math.min(255, r * (k * LCOL[0] + bounce * 1.2) + (spec + rim) * 220);
    px[o + 1] = Math.min(255, g * (k * LCOL[1] + bounce * 0.95) + (spec + rim) * 235);
    px[o + 2] = Math.min(255, b * (k * LCOL[2] + bounce * 0.75) + (spec + rim) * 255);
    px[o + 3] = Math.min(255, (lim - rr) * R0 * 255);
  }
  x.putImageData(img, 0, 0);
  tex = cv;
  texFor = W;
}
export function drawPlatform(x, cx, R0, t2) {
  const px = cx - R0 * 0.24, py = cx - R0 * 0.36, s = R0 / 210;
  x.save();
  x.translate(px, py);
  x.rotate(-0.45);
  x.scale(s, s);
  x.fillStyle = "rgba(10,12,24,0.55)";
  x.fillRect(-15, 3, 34, 6);
  x.fillStyle = "#9aa6c8";
  x.fillRect(-14, -4, 12, 8);
  x.fillRect(2, -6, 14, 10);
  x.fillStyle = "#5d6ea8";
  x.fillRect(-30, -2, 14, 4);
  x.fillRect(18, -2, 14, 4);
  x.fillStyle = "#d6dcf0";
  x.fillRect(7, -12, 2, 6);
  const on = reduce || t2 % 1.6 < 0.25;
  x.fillStyle = on ? "#ffb35c" : "rgba(255,179,92,0.25)";
  x.beginPath();
  x.arc(8, -13, on ? 2.6 : 1.6, 0, 7);
  x.fill();
  if (on) {
    x.fillStyle = "rgba(255,179,92,0.25)";
    x.beginPath();
    x.arc(8, -13, 7, 0, 7);
    x.fill();
  }
  x.fillStyle = "rgba(127,211,234,0.9)";
  x.fillRect(-10, -1, 2, 2);
  x.fillRect(6, -2, 2, 2);
  x.fillRect(11, -2, 2, 2);
  x.restore();
}
export const bits = [];
export let pulse = 0;
export let clock = 0;
export function hitRock(px, py, W = 520) {
  pulse = 1;
  const c = W / 2, R0 = W * 0.42;
  if (px === void 0 || py === void 0) {
    const a = Math.random() * 7;
    px = c + Math.cos(a) * R0 * 0.6;
    py = c + Math.sin(a) * R0 * 0.6;
  }
  if (reduce) return;
  const base = Math.atan2(py - c, px - c);
  for (let i = 0; i < 12; i++) {
    const dust = i >= 8, a = base + (Math.random() - 0.5) * 1.6, sp = (dust ? 30 : 80) + Math.random() * (dust ? 50 : 160);
    bits.push({ x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: dust ? 1.1 : 0.55 + Math.random() * 0.4, size: dust ? 10 + Math.random() * 14 : 2 + Math.random() * 3, dust });
  }
  if (bits.length > 160) bits.splice(0, bits.length - 160);
}
export function drawRock(c, dt, drones = 0) {
  const x = c.getContext("2d"), W = c.width, cx = W / 2, R0 = W * 0.42;
  if (!tex || texFor !== W) bakeRock(W);
  pulse = Math.max(0, pulse - dt * 6);
  clock += dt;
  x.clearRect(0, 0, W, W);
  const glow = x.createRadialGradient(cx, cx, R0 * 0.7, cx, cx, R0 * 1.3);
  glow.addColorStop(0, "rgba(242,165,65,0.08)");
  glow.addColorStop(1, "rgba(242,165,65,0)");
  x.fillStyle = glow;
  x.fillRect(0, 0, W, W);
  const n = Math.min(Math.floor(drones), 24), pos = [];
  for (let i = 0; i < n; i++) {
    const rad = R0 * (1.04 + i % 5 * 0.05), sp = 0.25 + i % 7 * 0.04, a = i * 2.39996 + (reduce ? 0 : clock * sp) * (i % 2 ? 1 : -1);
    const tilt = 0.32 + i % 3 * 0.08, ox = Math.cos(a) * rad, oy = Math.sin(a) * rad * tilt;
    const rot = i % 4 * 0.5 - 0.6, rx = ox * Math.cos(rot) - oy * Math.sin(rot), ry = ox * Math.sin(rot) + oy * Math.cos(rot);
    pos.push([cx + rx, cx + ry, Math.sin(a) < 0, i]);
  }
  const drawDrone = ([dx, dy, behind, i]) => {
    const fire = !reduce && Math.sin(clock * (1.3 + i % 5 * 0.21) + i * 1.7) > 0.93;
    if (fire && !behind) {
      const tx = cx + (dx - cx) * 0.55, ty = cx + (dy - cx) * 0.55;
      x.strokeStyle = "rgba(242,165,65,0.55)";
      x.lineWidth = 1.5;
      x.beginPath();
      x.moveTo(dx, dy);
      x.lineTo(tx, ty);
      x.stroke();
    }
    x.globalAlpha = behind ? 0.35 : 1;
    x.fillStyle = "rgba(127,211,234,0.25)";
    x.beginPath();
    x.arc(dx, dy, 6, 0, 7);
    x.fill();
    x.fillStyle = fire ? "#f2c27a" : "#cfeef7";
    x.beginPath();
    x.arc(dx, dy, 2.4, 0, 7);
    x.fill();
    x.globalAlpha = 1;
  };
  pos.filter((p) => p[2]).forEach(drawDrone);
  const sc = 1 - pulse * 0.035;
  x.save();
  x.translate(cx, cx);
  x.scale(sc, sc);
  x.drawImage(tex, -cx, -cx, W, W);
  x.translate(-cx, -cx);
  drawPlatform(x, cx, R0, clock);
  x.restore();
  pos.filter((p) => !p[2]).forEach(drawDrone);
  for (let i = bits.length - 1; i >= 0; i--) {
    const b = bits[i];
    b.life += dt;
    if (b.life >= b.max) {
      bits.splice(i, 1);
      continue;
    }
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.vx *= 0.96;
    b.vy *= 0.96;
    const k = 1 - b.life / b.max;
    if (b.dust) {
      x.fillStyle = `rgba(170,140,115,${0.18 * k})`;
      x.beginPath();
      x.arc(b.x, b.y, b.size * (1.4 - k * 0.6), 0, 7);
      x.fill();
    } else {
      x.fillStyle = `rgba(208,141,92,${k})`;
      x.fillRect(b.x, b.y, b.size, b.size);
    }
  }
}
export const TILT = 0.42;
export let belt = [];
export let mapBg = null;
export let mapBgKey = "";
export const trail = [];
export function bodyPos(id, time): [number, number] {
  const l = L[id];
  const a = l.angle + (reduce ? 0 : time * l.speed);
  return [Math.cos(a) * l.orbit, Math.sin(a) * l.orbit * TILT];
}
export function front(id, time) {
  const l = L[id];
  return Math.sin(l.angle + (reduce ? 0 : time * l.speed)) >= 0;
}
export function bakeMapBg(W, H, dpr) {
  const cv = document.createElement("canvas");
  cv.width = W * dpr;
  cv.height = H * dpr;
  const x = cv.getContext("2d");
  x.scale(dpr, dpr);
  let sd = 3;
  const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
  const g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
  g.addColorStop(0, "#141a3a");
  g.addColorStop(0.55, "#0c0f22");
  g.addColorStop(1, "#070812");
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);
  for (const [cx, cy, rad, col] of <[number, number, number, string][]>[[0.18, 0.25, 0.45, "90,60,140"], [0.85, 0.75, 0.5, "40,90,150"], [0.7, 0.15, 0.3, "150,70,90"]]) {
    const n = x.createRadialGradient(cx * W, cy * H, 0, cx * W, cy * H, rad * W);
    n.addColorStop(0, `rgba(${col},0.10)`);
    n.addColorStop(1, `rgba(${col},0)`);
    x.fillStyle = n;
    x.fillRect(0, 0, W, H);
  }
  for (let i = 0; i < W * H / 900; i++) {
    const a = r() ** 2.2 * 0.8 + 0.1;
    x.fillStyle = r() < 0.15 ? `rgba(255,214,170,${a})` : `rgba(210,222,255,${a})`;
    const s = r() < 0.05 ? 1.6 : 0.8;
    x.fillRect(r() * W, r() * H, s, s);
  }
  return cv;
}
export function litSphere(x, px, py, rad, cx, cy, base) {
  const dx = cx - px, dy = cy - py, d = Math.hypot(dx, dy) || 1, ox = dx / d * rad * 0.45, oy = dy / d * rad * 0.45;
  const g = x.createRadialGradient(px + ox, py + oy, rad * 0.1, px, py, rad * 1.05);
  g.addColorStop(0, base[0]);
  g.addColorStop(0.55, base[1]);
  g.addColorStop(1, base[2]);
  x.fillStyle = g;
  x.beginPath();
  x.arc(px, py, rad, 0, 7);
  x.fill();
}
export function drawMap(c, s, time) {
  const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
  if (!W || !H) return;
  if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
    c.width = Math.round(W * dpr);
    c.height = Math.round(H * dpr);
  }
  const x = c.getContext("2d");
  x.setTransform(dpr, 0, 0, dpr, 0, 0);
  const key = `${W}x${H}@${dpr}`;
  if (!mapBg || mapBgKey !== key) {
    mapBg = bakeMapBg(W, H, dpr);
    mapBgKey = key;
  }
  x.drawImage(mapBg, 0, 0, W, H);
  if (!belt.length) {
    let sd = 9;
    const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
    belt = Array.from({ length: 320 }, () => ({ a: r() * Math.PI * 2, r: L.belt.orbit + (r() + r() + r() - 1.5) * 0.03, s: 0.5 + r() ** 3 * 1.6, b: 0.25 + r() * 0.6 }));
  }
  const cx = W / 2, cy = H / 2, sc = Math.min(W / 2 * 0.9, H / 2 / TILT * 0.82);
  const P = ([a, b]: number[]): [number, number] => [cx + a * sc, cy + b * sc];
  const tt = reduce ? 0 : time;
  const orbit = (id, half) => {
    const rx = L[id].orbit * sc, ry = rx * TILT;
    x.beginPath();
    x.ellipse(cx, cy, rx, ry, 0, half === "back" ? Math.PI : 0, half === "back" ? Math.PI * 2 : Math.PI);
    x.strokeStyle = half === "back" ? "rgba(150,160,210,0.12)" : "rgba(170,180,230,0.28)";
    x.lineWidth = 1;
    x.stroke();
    for (let k = 0; k < 24; k++) {
      const a = k / 24 * Math.PI * 2, isFront = Math.sin(a) >= 0;
      if (half === "front" !== isFront) continue;
      x.fillStyle = isFront ? "rgba(170,180,230,0.35)" : "rgba(150,160,210,0.15)";
      x.fillRect(cx + Math.cos(a) * rx - 0.5, cy + Math.sin(a) * ry - 0.5, 1, 1);
    }
  };
  const beltPass = (half) => {
    for (const p of belt) {
      const a = p.a + tt * 0.012, sn = Math.sin(a);
      if (half === "front" !== sn >= 0) continue;
      const bx = cx + Math.cos(a) * p.r * sc, by = cy + sn * p.r * sc * TILT;
      x.fillStyle = `rgba(214,170,132,${p.b * (sn >= 0 ? 1 : 0.45)})`;
      x.fillRect(bx - p.s / 2, by - p.s / 2, p.s, p.s);
    }
  };
  for (const id of ["giant", "moon"]) orbit(id, "back");
  beltPass("back");
  const nd = s.star.done ? 0 : Math.min(Math.floor(s.b.dyson), 90);
  const swR = s.chapterDone >= 1 && s.star.stage >= 1 ? 0.13 : 0.07;
  const swarm = (half) => {
    for (let i = 0; i < nd; i++) {
      const ring = i % 3, a = i / nd * Math.PI * 2 * 3 + tt * (0.12 + ring * 0.03), rr = sc * (swR + ring * 0.012);
      const sn = Math.sin(a);
      if (half === "front" !== sn >= 0) continue;
      const tilt = [0.35, 0.6, 0.2][ring], rot = [0.3, -0.5, 1.1][ring];
      const ox = Math.cos(a) * rr, oy = sn * rr * tilt;
      const px = cx + ox * Math.cos(rot) - oy * Math.sin(rot), py = cy + ox * Math.sin(rot) + oy * Math.cos(rot);
      const glint = 0.45 + 0.55 * Math.max(0, Math.cos(a * 2 + tt));
      x.fillStyle = `rgba(242,178,90,${(sn >= 0 ? 1 : 0.35) * glint})`;
      x.fillRect(px - 1.2, py - 0.8, 2.4, 1.6);
    }
  };
  swarm("back");
  const st = s.chapterDone >= 1 ? s.star.stage : 0, red = st >= 1 && !s.star.done;
  const R2 = sc * (red ? 0.1 : 0.05), far = sc * 0.75, gl = red ? "255,140,80" : "140,165,255";
  if (s.star.done) {
    const neb = x.createRadialGradient(cx, cy, sc * 0.05, cx, cy, sc * 0.3);
    neb.addColorStop(0, "rgba(80,200,190,0.10)");
    neb.addColorStop(0.6, "rgba(255,90,110,0.14)");
    neb.addColorStop(1, "rgba(255,90,110,0)");
    x.fillStyle = neb;
    x.beginPath();
    x.arc(cx, cy, sc * 0.3, 0, 7);
    x.fill();
    x.fillStyle = "#020205";
    x.beginPath();
    x.arc(cx, cy, 3.2, 0, 7);
    x.fill();
    x.strokeStyle = "rgba(255,225,190,0.8)";
    x.lineWidth = 1;
    x.beginPath();
    x.arc(cx, cy, 3.6, 0, 7);
    x.stroke();
  } else {
    const halo = x.createRadialGradient(cx, cy, R2, cx, cy, far);
    halo.addColorStop(0, `rgba(${gl},0.16)`);
    halo.addColorStop(0.15, `rgba(${gl},0.09)`);
    halo.addColorStop(0.4, `rgba(${gl},0.04)`);
    halo.addColorStop(0.7, `rgba(${gl},0.012)`);
    halo.addColorStop(1, `rgba(${gl},0)`);
    x.fillStyle = halo;
    x.beginPath();
    x.arc(cx, cy, far, 0, 7);
    x.fill();
    const core = x.createRadialGradient(cx - R2 * 0.2, cy - R2 * 0.2, 0, cx, cy, R2);
    if (red) {
      core.addColorStop(0, "#ffe2c0");
      core.addColorStop(0.5, "#ffa15e");
      core.addColorStop(0.9, "#d0532c");
      core.addColorStop(1, "#a8391f");
    } else {
      core.addColorStop(0, "#f4f7ff");
      core.addColorStop(0.55, "#cbd8ff");
      core.addColorStop(0.9, "#8ea6f0");
      core.addColorStop(1, "#6f86d6");
    }
    x.fillStyle = core;
    x.beginPath();
    x.arc(cx, cy, R2, 0, 7);
    x.fill();
  }
  swarm("front");
  beltPass("front");
  for (const id of ["moon", "giant"]) orbit(id, "front");
  x.font = '11px "JetBrains Mono", ui-monospace, monospace';
  const label2 = (id, px, py, rad) => {
    const lx = px + rad + 10, ly = py - rad - 8;
    x.strokeStyle = "rgba(170,180,230,0.35)";
    x.lineWidth = 1;
    x.beginPath();
    x.moveTo(px + rad * 0.7, py - rad * 0.7);
    x.lineTo(lx - 2, ly + 3);
    x.lineTo(lx + 2, ly + 3);
    x.stroke();
    x.fillStyle = s.visited[id] ? "#e1e4f4" : "#8a90b8";
    x.fillText(t_(id) + (s.visited[id] ? "" : " ?"), lx + 4, ly + 6);
  };
  const order = ["belt", "moon", "giant"].sort((a, b) => bodyPos(a, time)[1] - bodyPos(b, time)[1]);
  for (const id of order) {
    const [px, py] = P(bodyPos(id, time)), isFront = front(id, time);
    x.globalAlpha = isFront ? 1 : 0.85;
    if (id === "giant" && s.chapterDone >= 1 && s.star.stage >= 2) {
      const rad = 4.5;
      litSphere(x, px, py, rad, cx, cy, ["#e8b49a", "#7a4636", "#1f1210"]);
      x.strokeStyle = "rgba(255,140,80,0.55)";
      x.lineWidth = 0.7;
      x.beginPath();
      x.moveTo(px - rad * 0.6, py);
      x.lineTo(px, py + rad * 0.3);
      x.lineTo(px + rad * 0.5, py - rad * 0.3);
      x.stroke();
      label2("core", px, py, rad);
    } else if (id === "giant") {
      const rad = 10;
      const ring = (h) => {
        x.beginPath();
        x.ellipse(px, py, rad * 2.1, rad * 0.55, -0.35, h === "back" ? Math.PI : 0, h === "back" ? Math.PI * 2 : Math.PI);
        x.strokeStyle = "rgba(226,196,150,0.55)";
        x.lineWidth = 2;
        x.stroke();
        x.strokeStyle = "rgba(226,196,150,0.25)";
        x.lineWidth = 4;
        x.stroke();
      };
      ring("back");
      x.save();
      x.beginPath();
      x.arc(px, py, rad, 0, 7);
      x.clip();
      x.fillStyle = "#c9a072";
      x.fillRect(px - rad, py - rad, rad * 2, rad * 2);
      const bands = ["#e3c08c", "#b07e52", "#d9b07a", "#9c6c48", "#e6c796", "#b9875a"];
      x.save();
      x.translate(px, py);
      x.rotate(-0.35);
      bands.forEach((col, k) => {
        x.fillStyle = col;
        x.fillRect(-rad * 1.5, -rad + k * (rad * 2 / bands.length) + Math.sin(tt * 0.3 + k) * 0.4, rad * 3, rad * 2 / bands.length * 0.7);
      });
      x.restore();
      const sh = x.createRadialGradient(px + (cx - px) / Math.hypot(cx - px, cy - py) * rad * 0.5, py + (cy - py) / Math.hypot(cx - px, cy - py) * rad * 0.5, rad * 0.2, px, py, rad * 1.1);
      sh.addColorStop(0, "rgba(255,255,255,0.12)");
      sh.addColorStop(0.6, "rgba(10,8,20,0.15)");
      sh.addColorStop(1, "rgba(5,4,12,0.8)");
      x.fillStyle = sh;
      x.fillRect(px - rad, py - rad, rad * 2, rad * 2);
      x.restore();
      ring("front");
      for (const [mr, msp, mc] of <[number, number, string][]>[[rad * 2.6, 0.9, "#c9cbd6"], [rad * 3.4, 0.55, "#b9a58f"]]) {
        const ma = tt * msp + mr, mx = px + Math.cos(ma) * mr, my = py + Math.sin(ma) * mr * 0.4;
        x.globalAlpha = Math.sin(ma) < 0 ? 0.55 : 1;
        litSphere(x, mx, my, 1.8, cx, cy, ["#ffffff", mc, "#1c1a24"]);
        x.globalAlpha = 1;
      }
      label2(id, px, py, rad);
    } else if (id === "moon") {
      const rad = 5.5;
      litSphere(x, px, py, rad, cx, cy, ["#f4fbff", "#a9d6e6", "#20323f"]);
      x.strokeStyle = "rgba(120,170,190,0.5)";
      x.lineWidth = 0.6;
      x.beginPath();
      x.moveTo(px - rad * 0.5, py - rad * 0.2);
      x.lineTo(px + rad * 0.2, py + rad * 0.3);
      x.lineTo(px + rad * 0.6, py - rad * 0.1);
      x.stroke();
      label2(id, px, py, rad);
    } else {
      const rad = 4;
      litSphere(x, px, py, rad, cx, cy, ["#d9b394", "#8a6a55", "#2a1f1d"]);
      const on = reduce || time % 1.6 < 0.25;
      x.fillStyle = on ? "rgba(255,179,92,1)" : "rgba(255,179,92,0.35)";
      x.beginPath();
      x.arc(px + 1.5, py - 1.5, on ? 1.4 : 0.9, 0, 7);
      x.fill();
      label2(id, px, py, rad);
    }
    x.globalAlpha = 1;
    if (s.loc === id && !s.travel) {
      x.strokeStyle = "rgba(242,165,65,0.8)";
      x.lineWidth = 1;
      x.setLineDash([2, 3]);
      x.beginPath();
      x.arc(px, py, (id === "giant" ? 10 : id === "moon" ? 5.5 : 4) + 6 + Math.sin(time * 2) * 1, 0, 7);
      x.stroke();
      x.setLineDash([]);
    }
  }
  if (locOpen(s, "ione")) {
    const [px, py] = P(bodyPos("ione", time));
    if (s.visited.ione) {
      for (let i = 0; i < 26; i++) {
        const a = i * 0.24 - 3;
        const [qx, qy] = P([Math.cos(L.ione.angle + time * L.ione.speed + a * 0.05) * L.ione.orbit, Math.sin(L.ione.angle + time * L.ione.speed + a * 0.05) * L.ione.orbit * TILT]);
        x.fillStyle = `rgba(214,150,110,${0.25 + i % 3 * 0.15})`;
        x.fillRect(qx + Math.sin(i * 7.1) * 3, qy + Math.cos(i * 3.3) * 2, 1.4, 1.4);
      }
    } else litSphere(x, px, py, 3.2, cx, cy, ["#ffd9b8", "#b5603c", "#2a1410"]);
    label2("ione", px, py, 3.2);
  }
  if (locOpen(s, "kuiper")) {
    for (let i = 0; i < 120; i++) {
      const a = i * 0.0524 + time * L.kuiper.speed + Math.sin(i * 12.9) * 0.03, rr = L.kuiper.orbit * (1 + Math.sin(i * 4.7) * 0.04);
      const [qx, qy] = P([Math.cos(a) * rr, Math.sin(a) * rr * TILT]);
      x.fillStyle = `rgba(190,225,240,${0.18 + i * 37 % 10 / 30})`;
      x.fillRect(qx, qy, 1.1, 1.1);
    }
    const [px, py] = P(bodyPos("kuiper", time));
    litSphere(x, px, py, 2.4, cx, cy, ["#ffffff", "#bfe3f0", "#1d2d36"]);
    label2("kuiper", px, py, 2.4);
  }
  if (locOpen(s, "dust")) {
    const rr = L.dust.orbit * sc;
    x.save();
    x.translate(cx, cy);
    x.scale(1, TILT);
    const g = x.createRadialGradient(0, 0, rr * 0.75, 0, 0, rr * 1.2);
    g.addColorStop(0, "rgba(170,110,70,0)");
    g.addColorStop(0.5, `rgba(170,110,70,${s.visited.dust ? 0.08 : 0.16})`);
    g.addColorStop(1, "rgba(170,110,70,0)");
    x.fillStyle = g;
    x.beginPath();
    x.arc(0, 0, rr * 1.2, 0, 7);
    x.fill();
    x.restore();
    const [px, py] = P(bodyPos("dust", time));
    x.fillStyle = "rgba(220,170,120,0.9)";
    x.beginPath();
    x.arc(px, py, 1.6, 0, 7);
    x.fill();
    label2("dust", px, py, 2);
  }
  if (!(s.chapterDone >= 1 && (s.star.stage >= 1 || s.star.done))) {
    const [px, py] = P(bodyPos("sun", time));
    x.save();
    x.translate(px, py);
    x.rotate(Math.PI / 4);
    x.fillStyle = s.visited.sun ? "#f2a541" : "rgba(242,165,65,0.45)";
    x.fillRect(-2.5, -2.5, 5, 5);
    x.restore();
    if (s.loc === "sun" && !s.travel) {
      x.strokeStyle = "rgba(242,165,65,0.8)";
      x.setLineDash([2, 3]);
      x.beginPath();
      x.arc(px, py, 9, 0, 7);
      x.stroke();
      x.setLineDash([]);
    }
    x.fillStyle = s.visited.sun ? "#e1e4f4" : "#8a90b8";
    x.fillText(t("loc.sun.short") + (s.visited.sun ? "" : " ?"), px + (px >= cx ? 10 : -10 - x.measureText(t("loc.sun.short") + " ?").width), py + (py >= cy ? 16 : -10));
  }
  let sp, ang = -Math.PI / 2;
  if (s.travel) {
    const a = P(bodyPos(s.travel.from, time)), b = P(bodyPos(s.travel.to, time)), k = s.travel.t / s.travel.total;
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, nx = -(b[1] - a[1]), ny = b[0] - a[0], nl = Math.hypot(nx, ny) || 1, bend = 0.25;
    const ctrl = [mx + nx / nl * Math.hypot(nx, ny) * bend, my + ny / nl * Math.hypot(nx, ny) * bend];
    const q = (u) => [(1 - u) ** 2 * a[0] + 2 * (1 - u) * u * ctrl[0] + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * ctrl[1] + u * u * b[1]];
    x.setLineDash([2, 5]);
    x.strokeStyle = "rgba(242,165,65,0.35)";
    x.lineWidth = 1;
    x.beginPath();
    x.moveTo(...a);
    x.quadraticCurveTo(ctrl[0], ctrl[1], b[0], b[1]);
    x.stroke();
    x.setLineDash([]);
    sp = q(k);
    const ahead = q(Math.min(1, k + 0.01));
    ang = Math.atan2(ahead[1] - sp[1], ahead[0] - sp[0]);
    trail.push(sp);
    if (trail.length > 40) trail.shift();
  } else {
    trail.length = 0;
    const p = P(bodyPos(s.loc, time));
    sp = [p[0], p[1] - 14];
  }
  for (let i = 1; i < trail.length; i++) {
    x.strokeStyle = `rgba(242,165,65,${i / trail.length * 0.5})`;
    x.lineWidth = 1.5;
    x.beginPath();
    x.moveTo(...trail[i - 1]);
    x.lineTo(...trail[i]);
    x.stroke();
  }
  x.save();
  x.translate(sp[0], sp[1]);
  x.rotate(ang);
  if (s.travel) {
    const fl = x.createLinearGradient(-4, 0, -14, 0);
    fl.addColorStop(0, "rgba(160,210,255,0.9)");
    fl.addColorStop(1, "rgba(160,210,255,0)");
    x.fillStyle = fl;
    x.beginPath();
    x.moveTo(-4, -1.6);
    x.lineTo(-14 - Math.sin(time * 20) * 1.5, 0);
    x.lineTo(-4, 1.6);
    x.fill();
  }
  x.fillStyle = "#f2a541";
  x.beginPath();
  x.moveTo(6, 0);
  x.lineTo(-4, -3.2);
  x.lineTo(-2.5, 0);
  x.lineTo(-4, 3.2);
  x.closePath();
  x.fill();
  x.fillStyle = "#fff2dc";
  x.fillRect(1, -0.6, 2, 1.2);
  x.restore();
  {
    {
      const ga = L.giant.angle + tt * L.giant.speed;
      for (const off of [Math.PI / 3, -Math.PI / 3]) for (let k = 0; k < 26; k++) {
        const a = ga + off + Math.sin(k * 12.9898) * 0.16, rr2 = L.giant.orbit + Math.sin(k * 78.233) * 0.02;
        const bx = cx + Math.cos(a) * rr2 * sc, by = cy + Math.sin(a) * rr2 * sc * TILT;
        x.fillStyle = `rgba(200,180,160,${0.35 + 0.3 * Math.abs(Math.sin(k * 3.1))})`;
        x.fillRect(bx - 0.6, by - 0.6, 1.2, 1.2);
      }
      for (const id of ["belt", "moon", "giant"]) {
        const a = Math.PI * 0.5 + 0.25, rx = L[id].orbit * sc, ry = rx * TILT;
        const px2 = cx + Math.cos(a) * rx, py2 = cy + Math.sin(a) * ry, ang2 = Math.atan2(Math.cos(a) * ry, -Math.sin(a) * rx);
        x.save();
        x.translate(px2, py2);
        x.rotate(ang2);
        x.strokeStyle = "rgba(170,180,230,0.45)";
        x.lineWidth = 1;
        x.beginPath();
        x.moveTo(-3, -2.5);
        x.lineTo(1, 0);
        x.lineTo(-3, 2.5);
        x.stroke();
        x.restore();
      }
    }
    const ea = 0.64, ee = 0.78, w0 = 2.5, th = tt * 0.05 % (Math.PI * 2);
    const rr = ea * (1 - ee * ee) / (1 + ee * Math.cos(th)), ca = th + w0;
    const kx = cx + Math.cos(ca) * rr * sc, ky = cy + Math.sin(ca) * rr * sc * TILT;
    const ux = (kx - cx) / (Math.hypot(kx - cx, ky - cy) || 1), uy = (ky - cy) / (Math.hypot(kx - cx, ky - cy) || 1), tl = Math.min(45, 12 / Math.max(rr, 0.12));
    const px3 = -uy, py3 = ux, wd = 1.5 + tl * 0.09;
    const tg = x.createLinearGradient(kx, ky, kx + ux * tl, ky + uy * tl);
    tg.addColorStop(0, "rgba(205,225,255,0.22)");
    tg.addColorStop(0.4, "rgba(180,205,255,0.07)");
    tg.addColorStop(1, "rgba(160,190,255,0)");
    x.fillStyle = tg;
    x.beginPath();
    x.moveTo(kx + px3 * 1.2, ky + py3 * 1.2);
    x.quadraticCurveTo(kx + ux * tl * 0.5 + px3 * wd * 0.7, ky + uy * tl * 0.5 + py3 * wd * 0.7, kx + ux * tl + px3 * wd, ky + uy * tl + py3 * wd);
    x.lineTo(kx + ux * tl - px3 * wd, ky + uy * tl - py3 * wd);
    x.quadraticCurveTo(kx + ux * tl * 0.5 - px3 * wd * 0.7, ky + uy * tl * 0.5 - py3 * wd * 0.7, kx - px3 * 1.2, ky - py3 * 1.2);
    x.closePath();
    x.fill();
    const coma = x.createRadialGradient(kx, ky, 0, kx, ky, 4);
    coma.addColorStop(0, "rgba(235,245,255,0.6)");
    coma.addColorStop(0.3, "rgba(200,225,255,0.2)");
    coma.addColorStop(1, "rgba(180,210,255,0)");
    x.fillStyle = coma;
    x.beginPath();
    x.arc(kx, ky, 4, 0, 7);
    x.fill();
  }
  const v = x.createRadialGradient(cx, cy, Math.min(W, H) * 0.35, cx, cy, Math.max(W, H) * 0.75);
  v.addColorStop(0, "rgba(5,6,15,0)");
  v.addColorStop(1, "rgba(5,6,15,0.55)");
  x.fillStyle = v;
  x.fillRect(0, 0, W, H);
}
export const t_ = (id) => t(`loc.${id}.short`);
export const locOpen = (s, id) => !!s.visited[id] || !L[id].req || L[id].req(s);
export const PAL = {
  ms: { core: [248, 251, 255], mid: [186, 205, 255], edge: [86, 112, 222], glow: "140,170,255", plasma: "190,220,255", contrast: 0.34, freq: 15 },
  he: { core: [255, 226, 182], mid: [255, 150, 82], edge: [168, 48, 30], glow: "255,140,80", plasma: "255,190,140", contrast: 0.7, freq: 3.2 },
  c: { core: [255, 222, 175], mid: [255, 143, 76], edge: [160, 44, 28], glow: "255,130,75", plasma: "255,180,130", contrast: 0.75, freq: 3.4 },
  neo: { core: [255, 218, 168], mid: [252, 136, 72], edge: [152, 40, 27], glow: "255,122,70", plasma: "255,175,125", contrast: 0.8, freq: 3.6 },
  si: { core: [255, 214, 160], mid: [248, 128, 66], edge: [145, 36, 26], glow: "255,115,66", plasma: "255,170,120", contrast: 0.85, freq: 3.8 }
};
export const LAYERS = {
  ms: [["H", 1, "#2b3a78"], ["H → He", 0.4, "#5b3f92"]],
  he: [["H", 1, "#6e2a3e"], ["He", 0.58, "#5b3f92"], ["He → C · O", 0.32, "#93406f"]],
  c: [["H", 1, "#6e2a3e"], ["He", 0.72, "#5b3f92"], ["C · O", 0.5, "#93406f"], ["C → Ne · Mg", 0.28, "#bb5a40"]],
  neo: [["H", 1, "#6e2a3e"], ["He", 0.78, "#5b3f92"], ["C · O", 0.6, "#93406f"], ["Ne · O", 0.43, "#bb5a40"], ["Ne · O → Si · S", 0.26, "#d8903c"]],
  si: [["H", 1, "#6e2a3e"], ["He", 0.8, "#5b3f92"], ["C · O", 0.66, "#93406f"], ["Ne · O", 0.52, "#bb5a40"], ["Si · S", 0.37, "#d8903c"], ["Si → Fe", 0.2, "#a9b2c6"]]
};
export const STAR_LAT = 64;
export const slat = [];
(() => {
  let sd = 23;
  for (let i = 0; i < STAR_LAT * STAR_LAT; i++) slat.push((sd = sd * 16807 % 2147483647) / 2147483647);
})();
export function snoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = fade(x - xi), yf = fade(y - yi);
  const g = (i, j) => slat[(i & STAR_LAT - 1) * STAR_LAT + (j & STAR_LAT - 1)];
  return lerp(lerp(g(xi, yi), g(xi + 1, yi), xf), lerp(g(xi, yi + 1), g(xi + 1, yi + 1), xf), yf);
}
export function sfbm(x, y, oct = 4) {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < oct; i++) {
    v += a * snoise(x * f, y * f);
    a *= 0.5;
    f *= 2.07;
  }
  return v;
}
export let starTex = null;
export let starTexKey = "";
export function bakeStar(px, stage2) {
  const p = PAL[stage2], out = [];
  for (const off of [0, 37.7]) {
    const cv = document.createElement("canvas");
    cv.width = cv.height = px;
    const x = cv.getContext("2d"), img = x.createImageData(px, px), d = img.data, c = px / 2;
    for (let j = 0; j < px; j++) for (let i = 0; i < px; i++) {
      const u = (i - c) / c, v = (j - c) / c, r2 = u * u + v * v;
      if (r2 >= 1) continue;
      const mu = Math.sqrt(1 - r2);
      const k = 1 / (0.35 + mu), su = u * k * p.freq + off, sv = v * k * p.freq + off * 0.6;
      const cell = 1 - Math.abs(2 * sfbm(su, sv) - 1);
      const big = sfbm(u * 1.6 + off + 9, v * 1.6 + 4, 3);
      const limb = stage2 === "ms" ? 0.4 + 0.55 * Math.pow(mu, 0.5) : 0.22 + 0.74 * Math.pow(mu, 0.8);
      let b = limb * (1 + p.contrast * (cell * 0.75 + big * 0.5 - 0.62));
      b = Math.max(0, Math.min(1.15, b));
      const t1 = Math.min(1, b), col = t1 < 0.55 ? p.edge.map((e, q) => lerp(e, p.mid[q], t1 / 0.55)) : p.mid.map((m, q) => lerp(m, p.core[q], (t1 - 0.55) / 0.45));
      const o = (j * px + i) * 4, lift = Math.max(0, b - 1) * 255;
      d[o] = Math.min(255, col[0] + lift);
      d[o + 1] = Math.min(255, col[1] + lift);
      d[o + 2] = Math.min(255, col[2] + lift);
      d[o + 3] = Math.min(255, (1 - Math.sqrt(r2)) * c * 2 * 255);
    }
    x.putImageData(img, 0, 0);
    out.push(cv);
  }
  return [out[0], out[1]];
}
export let nebTex = null;
export let nebKey = "";
export function bakeNebula(px) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = px;
  const x = cv.getContext("2d"), img = x.createImageData(px, px), d = img.data, c = px / 2;
  for (let j = 0; j < px; j++) for (let i = 0; i < px; i++) {
    const u = (i - c) / c, v = (j - c) / c, r = Math.hypot(u, v);
    if (r > 1) continue;
    const a = Math.atan2(v, u), shell = Math.exp(-(((r - 0.72) / 0.16) ** 2));
    const fil = Math.pow(1 - Math.abs(2 * sfbm(Math.cos(a) * 3 + r * 6, Math.sin(a) * 3 + r * 6, 5) - 1), 3);
    const ox = sfbm(u * 4 + 20, v * 4 + 20, 4), inner = Math.exp(-(((r - 0.45) / 0.22) ** 2));
    const hR = shell * fil * 1.4, oT = inner * ox * 0.9 + shell * (1 - fil) * 0.15;
    const o = (j * px + i) * 4;
    d[o] = Math.min(255, 255 * hR + 70 * oT);
    d[o + 1] = Math.min(255, 70 * hR + 210 * oT);
    d[o + 2] = Math.min(255, 95 * hR + 200 * oT);
    d[o + 3] = Math.min(255, 255 * Math.min(1, hR * 0.9 + oT * 0.8) * (1 - Math.max(0, r - 0.9) * 10));
  }
  x.putImageData(img, 0, 0);
  return cv;
}
export let starBg = null;
export let starBgKey = "";
export function drawStar(c, v, time, labels, full = true) {
  const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
  if (!W || !H) return;
  if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
    c.width = Math.round(W * dpr);
    c.height = Math.round(H * dpr);
  }
  const x = c.getContext("2d");
  x.setTransform(dpr, 0, 0, dpr, 0, 0);
  const key = `${W}x${H}@${dpr}`;
  if (full) {
    if (!starBg || starBgKey !== key) {
      starBg = bakeMapBg(W, H, dpr);
      starBgKey = key;
    }
    x.drawImage(starBg, 0, 0, W, H);
  } else x.clearRect(0, 0, W, H);
  const tt = reduce ? 0 : time, m = Math.min(W, H);
  const giant = v.stage !== "ms";
  const cx = W * (full ? 0.44 : 0.5), cy = H * 0.5, R2 = m * (giant ? full ? 0.34 : 0.27 : full ? 0.19 : 0.17);
  const p = PAL[v.stage] ?? PAL.si;
  if (v.done) {
    drawRemnant(x, W, H, cx, cy, m * (full ? 1 : 0.9), tt, v.snAge, dpr);
    if (full) label(x, labels.title, labels.sub);
    return;
  }
  const k = v.collapse >= 0 ? 1 - v.collapse / 30 : 0;
  const sx = k ? Math.sin(tt * 47) * k * 3 : 0, sy = k ? Math.cos(tt * 39) * k * 3 : 0;
  const scx = cx + sx, scy = cy + sy;
  const halo = x.createRadialGradient(scx, scy, R2 * 0.9, scx, scy, R2 * (giant ? 2.1 : 3.4));
  halo.addColorStop(0, `rgba(${p.glow},${0.42 + k * 0.3})`);
  halo.addColorStop(0.25, `rgba(${p.glow},0.14)`);
  halo.addColorStop(1, `rgba(${p.glow},0)`);
  x.fillStyle = halo;
  x.fillRect(0, 0, W, H);
  if (!giant) {
    x.save();
    x.translate(scx, scy);
    x.rotate(tt * 0.01);
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * Math.PI * 2 + Math.sin(i * 3.7) * 0.2, len = R2 * (1.6 + 0.6 * Math.sin(i * 1.9 + tt * 0.2));
      const g = x.createLinearGradient(0, 0, Math.cos(a) * len, Math.sin(a) * len);
      g.addColorStop(0.45, `rgba(${p.glow},0.10)`);
      g.addColorStop(1, `rgba(${p.glow},0)`);
      x.strokeStyle = g;
      x.lineWidth = R2 * 0.08;
      x.beginPath();
      x.moveTo(Math.cos(a) * R2 * 0.9, Math.sin(a) * R2 * 0.9);
      x.lineTo(Math.cos(a) * len, Math.sin(a) * len);
      x.stroke();
    }
    x.restore();
  }
  const n = Math.min(420, Math.floor(v.dyson));
  const orbitR = (ring) => R2 * (giant ? 1.22 + ring * 0.07 : 1.55 + ring * 0.16);
  const TILTS = [0.28, 0.42, 0.18, 0.55, 0.34], ROTS = [-0.25, 0.4, 0.1, -0.6, 0.75];
  const pos = (i) => {
    const ring = i % 5, a = i * 2.39996 + tt * (0.05 + ring * 0.012) * (ring % 2 ? 1 : -1);
    const rr = orbitR(ring), ox = Math.cos(a) * rr, oy = Math.sin(a) * rr * TILTS[ring];
    return [scx + ox * Math.cos(ROTS[ring]) - oy * Math.sin(ROTS[ring]), scy + ox * Math.sin(ROTS[ring]) + oy * Math.cos(ROTS[ring]), Math.sin(a)];
  };
  const swarm = (front2) => {
    if (!n) return;
    for (let ring = 0; ring < Math.min(5, n); ring++) {
      const rr = orbitR(ring);
      x.save();
      x.translate(scx, scy);
      x.rotate(ROTS[ring]);
      x.beginPath();
      x.ellipse(0, 0, rr, rr * TILTS[ring], 0, front2 ? 0 : Math.PI, front2 ? Math.PI : Math.PI * 2);
      x.strokeStyle = `rgba(242,178,90,${front2 ? 0.16 : 0.07})`;
      x.lineWidth = 1;
      x.stroke();
      x.restore();
    }
    for (let i = 0; i < n; i++) {
      const [px2, py, sn] = pos(i);
      if (sn >= 0 !== front2) continue;
      const glint = 0.5 + 0.5 * Math.max(0, Math.cos(i * 1.7 + tt * 0.8));
      x.fillStyle = front2 ? `rgba(255,${190 + glint * 50},${120 + glint * 80},${0.55 + glint * 0.45})` : "rgba(200,150,100,0.35)";
      x.fillRect(px2 - 1.3, py - 0.8, 2.6, 1.6);
    }
  };
  swarm(false);
  const px = Math.min(720, Math.round(R2 * 2 * dpr)), skey = `${v.stage}:${px}`;
  if (!starTex || starTexKey !== skey) {
    starTex = bakeStar(px, v.stage);
    starTexKey = skey;
  }
  const mix2 = 0.5 + 0.5 * Math.sin(tt * 0.12);
  x.save();
  x.translate(scx, scy);
  x.rotate(tt * 4e-3);
  x.globalAlpha = 1;
  x.drawImage(starTex[0], -R2, -R2, R2 * 2, R2 * 2);
  x.globalAlpha = mix2;
  x.drawImage(starTex[1], -R2, -R2, R2 * 2, R2 * 2);
  x.globalAlpha = 1;
  x.restore();
  if (k) {
    x.fillStyle = `rgba(255,250,240,${k * 0.35 * (0.5 + 0.5 * Math.sin(tt * 9))})`;
    x.beginPath();
    x.arc(scx, scy, R2, 0, 7);
    x.fill();
  }
  if (v.coverage > 2e-3) {
    const cv = Math.min(1, v.coverage);
    x.fillStyle = `rgba(18,10,14,${cv * 0.72})`;
    x.beginPath();
    x.arc(scx, scy, R2, 0, 7);
    x.fill();
    const ir = x.createRadialGradient(scx, scy, R2, scx, scy, orbitR(4) * 1.08);
    ir.addColorStop(0, `rgba(255,120,60,${cv * 0.05})`);
    ir.addColorStop(0.8, `rgba(255,110,50,${cv * 0.2})`);
    ir.addColorStop(1, "rgba(255,110,50,0)");
    x.fillStyle = ir;
    x.beginPath();
    x.arc(scx, scy, orbitR(4) * 1.08, 0, 7);
    x.fill();
  }
  const nl = Math.min(9, Math.floor(v.lifters));
  for (let j = 0; j < nl; j++) {
    const a = -Math.PI * 0.85 + j * (Math.PI * 1.15 / Math.max(1, nl - 1 || 1)) + (nl === 1 ? 0.6 : 0);
    const bx = scx + Math.cos(a) * R2, by = scy + Math.sin(a) * R2, nx = Math.cos(a), ny = Math.sin(a), tx = -ny, ty = nx;
    const reach = R2 * (giant ? 0.42 : 0.75);
    x.strokeStyle = `rgba(${p.plasma},0.28)`;
    x.lineWidth = 1;
    for (const sgn of [-1, 1]) {
      x.beginPath();
      x.moveTo(bx + tx * sgn * R2 * 0.05, by + ty * sgn * R2 * 0.05);
      x.quadraticCurveTo(bx + nx * reach * 0.5 + tx * sgn * R2 * 0.03, by + ny * reach * 0.5 + ty * sgn * R2 * 0.03, bx + nx * reach + tx * sgn * R2 * 0.1, by + ny * reach + ty * sgn * R2 * 0.1);
      x.stroke();
    }
    const dots = k ? 14 : 7, speed = k ? 0.9 : 0.28;
    for (let q = 0; q < dots; q++) {
      const f = ((tt * speed + q / dots + j * 0.13) % 1 + 1) % 1, w = Math.sin(f * Math.PI * 3 + j) * R2 * 0.02;
      const qx = bx + nx * reach * f + tx * w, qy = by + ny * reach * f + ty * w;
      x.fillStyle = `rgba(${p.plasma},${(1 - f) * 0.9})`;
      x.beginPath();
      x.arc(qx, qy, 1.2 + (1 - f) * 1.2, 0, 7);
      x.fill();
    }
    x.fillStyle = "rgba(242,165,65,0.9)";
    x.fillRect(bx + nx * reach - 1.5, by + ny * reach - 1.5, 3, 3);
  }
  swarm(true);
  if (!full) {
    if (labels.sub) {
      x.font = '600 12px "JetBrains Mono", ui-monospace, monospace';
      x.textAlign = "center";
      x.fillStyle = "rgba(242,178,90,0.95)";
      x.fillText(labels.sub, cx, H - 10);
      x.textAlign = "left";
    }
    return;
  }
  drawOnion(x, W, H, m, v.stage, labels.layers, tt);
  label(x, labels.title, labels.sub);
  const vg = x.createRadialGradient(W / 2, H / 2, m * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
  vg.addColorStop(0, "rgba(5,6,15,0)");
  vg.addColorStop(1, "rgba(5,6,15,0.5)");
  x.fillStyle = vg;
  x.fillRect(0, 0, W, H);
}
export function label(x, title, sub) {
  x.font = '600 12px "JetBrains Mono", ui-monospace, monospace';
  x.fillStyle = "rgba(225,228,244,0.9)";
  x.fillText(title.toUpperCase(), 14, 22);
  x.font = '11px "JetBrains Mono", ui-monospace, monospace';
  x.fillStyle = "rgba(176,181,212,0.85)";
  x.fillText(sub, 14, 38);
}
export function drawOnion(x, W, H, m, stage2, title, tt) {
  const L2 = LAYERS[stage2];
  if (!L2) return;
  const r = Math.min(m * 0.17, 74), ox = W - r - 18, oy = H - r - 22;
  x.save();
  x.fillStyle = "rgba(10,12,24,0.55)";
  x.beginPath();
  x.arc(ox, oy, r + 8, 0, 7);
  x.fill();
  for (const [, f, col] of L2) {
    x.fillStyle = col;
    x.beginPath();
    x.arc(ox, oy, r * f, 0, 7);
    x.fill();
    x.strokeStyle = "rgba(10,12,24,0.6)";
    x.lineWidth = 1;
    x.stroke();
  }
  const core = L2[L2.length - 1], cr = r * core[1] * (1 + 0.03 * Math.sin(tt * 0.86));
  const g = x.createRadialGradient(ox, oy, 0, ox, oy, cr);
  g.addColorStop(0, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = g;
  x.beginPath();
  x.arc(ox, oy, cr, 0, 7);
  x.fill();
  x.font = '10px "JetBrains Mono", ui-monospace, monospace';
  x.textBaseline = "middle";
  const lx = ox - r - 16, top = oy - (L2.length - 1) * 8;
  L2.forEach(([name, , col], i) => {
    const ly = top + i * 16, w = x.measureText(name).width;
    x.fillStyle = col;
    x.fillRect(lx - 9, ly - 4, 8, 8);
    x.strokeStyle = "rgba(255,255,255,0.3)";
    x.lineWidth = 0.5;
    x.strokeRect(lx - 9, ly - 4, 8, 8);
    x.fillStyle = "rgba(225,228,244,0.92)";
    x.fillText(name, lx - 14 - w, ly);
  });
  x.textBaseline = "alphabetic";
  x.font = '600 10px "Chakra Petch", ui-sans-serif, sans-serif';
  x.fillStyle = "rgba(176,181,212,0.9)";
  const tw = x.measureText(title.toUpperCase()).width;
  x.fillText(title.toUpperCase(), ox - tw / 2, oy - r - 12);
  x.restore();
}
export function drawRemnant(x, W, H, cx, cy, m, tt, age, dpr) {
  const Rn = m * 0.44, px = Math.min(720, Math.round(Rn * 2 * dpr));
  if (!nebTex || nebKey !== String(px)) {
    nebTex = bakeNebula(px);
    nebKey = String(px);
  }
  const grow = Math.min(1, 0.15 + age / 8);
  x.globalAlpha = Math.min(1, age / 3);
  x.save();
  x.translate(cx, cy);
  x.rotate(tt * 3e-3);
  x.drawImage(nebTex, -Rn * grow, -Rn * grow, Rn * 2 * grow, Rn * 2 * grow);
  x.restore();
  x.globalAlpha = 1;
  const r0 = m * 0.045;
  const lens = x.createRadialGradient(cx, cy, r0, cx, cy, r0 * 3.2);
  lens.addColorStop(0, "rgba(255,214,170,0.55)");
  lens.addColorStop(0.18, "rgba(255,170,110,0.22)");
  lens.addColorStop(1, "rgba(255,150,90,0)");
  x.fillStyle = lens;
  x.beginPath();
  x.arc(cx, cy, r0 * 3.2, 0, 7);
  x.fill();
  x.fillStyle = "#020205";
  x.beginPath();
  x.arc(cx, cy, r0, 0, 7);
  x.fill();
  x.strokeStyle = "rgba(255,232,200,0.85)";
  x.lineWidth = 1.4;
  x.beginPath();
  x.arc(cx, cy, r0 * 1.06, 0, 7);
  x.stroke();
  if (age < 6) {
    const f = age / 6;
    x.fillStyle = `rgba(255,255,255,${Math.max(0, 1 - f * 1.6)})`;
    x.fillRect(0, 0, W, H);
    x.strokeStyle = `rgba(200,230,255,${(1 - f) * 0.8})`;
    x.lineWidth = 3 + 10 * (1 - f);
    x.beginPath();
    x.arc(cx, cy, m * (0.05 + f * 0.9), 0, 7);
    x.stroke();
  }
}
export const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const mix = (a, b, t2) => a.map((v, i) => Math.round(v + (b[i] - v) * t2));
export const rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
export let secTex = null;
export let secKey = "";
export function drawSection(c, stage2, time, collapse, labels) {
  const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
  if (!W || !H) return;
  if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
    c.width = Math.round(W * dpr);
    c.height = Math.round(H * dpr);
  }
  const x = c.getContext("2d");
  x.setTransform(dpr, 0, 0, dpr, 0, 0);
  const key = `${W}x${H}@${dpr}`;
  if (!starBg || starBgKey !== key) {
    starBg = bakeMapBg(W, H, dpr);
    starBgKey = key;
  }
  x.drawImage(starBg, 0, 0, W, H);
  const Ls = LAYERS[stage2];
  if (!Ls) return;
  const tt = reduce ? 0 : time, p = PAL[stage2] ?? PAL.si;
  const k = collapse >= 0 ? 1 - collapse / 30 : 0;
  const r = Math.min(H * 0.36, W * 0.24);
  const ox = Math.max(r + 40, W * 0.36) + (k ? Math.sin(tt * 47) * k * 2 : 0), oy = H * 0.56;
  const a0 = -Math.PI / 2, a1 = 0;
  const glow = x.createRadialGradient(ox, oy, r * 0.9, ox, oy, r * 1.9);
  glow.addColorStop(0, `rgba(${p.glow},0.45)`);
  glow.addColorStop(0.35, `rgba(${p.glow},0.12)`);
  glow.addColorStop(1, `rgba(${p.glow},0)`);
  x.fillStyle = glow;
  x.beginPath();
  x.arc(ox, oy, r * 1.9, 0, 7);
  x.fill();
  const px = Math.min(720, Math.round(r * 2 * dpr)), sk = `${stage2}:${px}`;
  if (!secTex || secKey !== sk) {
    secTex = bakeStar(px, stage2);
    secKey = sk;
  }
  x.save();
  x.beginPath();
  x.moveTo(ox, oy);
  x.arc(ox, oy, r, a1, a0 + Math.PI * 2);
  x.closePath();
  x.clip();
  x.drawImage(secTex[0], ox - r, oy - r, r * 2, r * 2);
  x.globalAlpha = 0.5 + 0.5 * Math.sin(tt * 0.12);
  x.drawImage(secTex[1], ox - r, oy - r, r * 2, r * 2);
  x.globalAlpha = 1;
  x.restore();
  const hot = [255, 236, 200];
  Ls.forEach(([, f, col], i) => {
    const inner = i + 1 < Ls.length ? Ls[i + 1][1] : 0, base = hexRgb(col);
    const g = x.createRadialGradient(ox, oy, r * inner, ox, oy, r * f);
    g.addColorStop(0, rgb(mix(base, hot, 0.35 + i * 0.06)));
    g.addColorStop(1, rgb(mix(base, [8, 8, 20], 0.25)));
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(ox, oy);
    x.arc(ox, oy, r * f, a0, a1);
    x.closePath();
    x.fill();
  });
  x.save();
  x.beginPath();
  x.moveTo(ox, oy);
  x.arc(ox, oy, r, a0, a1);
  x.closePath();
  x.clip();
  const env0 = Ls.length > 1 ? Ls[1][1] : 0;
  for (let j = 0; j < 9; j++) {
    const rr = r * (env0 + (1 - env0) * ((j + 0.5) / 9)), sh = Math.sin(tt * 0.3 + j * 1.7) * 0.08;
    x.strokeStyle = "rgba(255,255,255,0.06)";
    x.lineWidth = 1;
    x.beginPath();
    x.arc(ox, oy, rr, a0 + 0.12 + sh, a1 - 0.12 + sh);
    x.stroke();
  }
  Ls.forEach(([, f]) => {
    x.strokeStyle = "rgba(255,240,220,0.28)";
    x.lineWidth = 1;
    x.beginPath();
    x.arc(ox, oy, r * f, a0, a1);
    x.stroke();
  });
  x.restore();
  const core = Ls[Ls.length - 1], cr = r * core[1] * (1 + 0.04 * Math.sin(tt * 0.86) + k * 0.15 * Math.sin(tt * 9));
  const cg = x.createRadialGradient(ox, oy, 0, ox, oy, cr * 1.6);
  cg.addColorStop(0, "rgba(255,255,245,0.85)");
  cg.addColorStop(0.35, "rgba(255,230,190,0.35)");
  cg.addColorStop(1, "rgba(255,220,180,0)");
  x.save();
  x.beginPath();
  x.moveTo(ox, oy);
  x.arc(ox, oy, r, a0, a1);
  x.closePath();
  x.clip();
  x.fillStyle = cg;
  x.beginPath();
  x.arc(ox, oy, cr * 1.6, 0, 7);
  x.fill();
  x.restore();
  for (const a of [a0, a1]) {
    const ex = ox + Math.cos(a) * r, ey = oy + Math.sin(a) * r;
    x.strokeStyle = "rgba(255,240,215,0.55)";
    x.lineWidth = 1.2;
    x.beginPath();
    x.moveTo(ox, oy);
    x.lineTo(ex, ey);
    x.stroke();
  }
  x.strokeStyle = "rgba(5,6,15,0.35)";
  x.lineWidth = 4;
  x.beginPath();
  x.arc(ox, oy, r - 2, a1 + 0.02, a0 + Math.PI * 2 - 0.02);
  x.stroke();
  x.font = '13px "JetBrains Mono", ui-monospace, monospace';
  x.textBaseline = "middle";
  const lx = Math.min(W - 120, ox + r + 56), gap = Math.min(32, (H - 90) / Ls.length), top = oy - r * 0.55 - (Ls.length - 1) * gap / 2 + r * 0.25;
  Ls.forEach(([name, f, col], i) => {
    const inner = i + 1 < Ls.length ? Ls[i + 1][1] : 0, mid = r * (f + inner) / 2, a = -Math.PI / 4 + (i - (Ls.length - 1) / 2) * 0.12;
    const sx = ox + Math.cos(a) * mid, sy = oy + Math.sin(a) * mid, ly = top + i * gap;
    x.strokeStyle = "rgba(225,228,244,0.4)";
    x.lineWidth = 1;
    x.beginPath();
    x.moveTo(sx, sy);
    x.lineTo(lx - 24, ly);
    x.lineTo(lx - 10, ly);
    x.stroke();
    x.fillStyle = "rgba(255,255,255,0.95)";
    x.beginPath();
    x.arc(sx, sy, 2, 0, 7);
    x.fill();
    const base = hexRgb(col);
    x.fillStyle = rgb(mix(base, hot, 0.3));
    x.beginPath();
    x.arc(lx, ly, 5.5, 0, 7);
    x.fill();
    x.strokeStyle = "rgba(255,255,255,0.4)";
    x.stroke();
    x.fillStyle = "rgba(232,234,248,0.96)";
    x.fillText(name, lx + 14, ly);
  });
  x.textBaseline = "alphabetic";
  label(x, labels.title, labels.sub);
}
