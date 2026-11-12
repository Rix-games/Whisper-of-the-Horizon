// Pohledy žebříku měřítka (mimo hrací mechaniky): pozadí, Soustava, Okolí, díra po Aldře, značky misí.
import { mulberry } from "../core/rng";
import type { State } from "../core/state";
import { MISSIONS, MMAP } from "../core/defs";
import { mVisible } from "../core/engine";
import { coverage } from "../chapters/ch2";
import { GAL_SITES } from "../chapters/ch3";
import { gsp } from "../mech/ch3";
import { MONO, SANS } from "../mech/fx";
import { find } from "../i18n";

// ---------- pozadí (cache podle velikosti) ----------
let bg: HTMLCanvasElement | null = null, bgKey = "";
export function background(c: CanvasRenderingContext2D, W: number, H: number, dpr: number, ch: number) {
  const key = `${W}x${H}x${dpr}x${ch}`;
  if (bgKey !== key) {
    bgKey = key; bg = document.createElement("canvas"); bg.width = Math.round(W * dpr); bg.height = Math.round(H * dpr);
    const g = bg.getContext("2d")!; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = "#04050a"; g.fillRect(0, 0, W, H);
    const tint = ch === 1 ? "60,90,170" : ch === 2 ? "70,60,150" : "110,60,130";
    let gr = g.createRadialGradient(W * 0.72, H * 0.2, 0, W * 0.72, H * 0.2, Math.max(W, H) * 0.75);
    gr.addColorStop(0, `rgba(${tint},.28)`); gr.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    gr = g.createRadialGradient(W * 0.15, H * 0.88, 0, W * 0.15, H * 0.88, Math.max(W, H) * 0.55);
    gr.addColorStop(0, "rgba(25,60,100,.22)"); gr.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // jemná mlhovina (pruh Mléčné dráhy)
    const r = mulberry(7);
    g.globalCompositeOperation = "lighter";
    for (let i = 0; i < 160; i++) {
      const t = r(), x = t * W, y = H * (0.25 + 0.5 * t) + (r() - 0.5) * H * 0.22, rad = 40 + r() * 140;
      const ng = g.createRadialGradient(x, y, 0, x, y, rad);
      ng.addColorStop(0, `rgba(${r() < 0.5 ? "120,140,220" : "200,150,220"},${0.012 + r() * 0.018})`); ng.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = ng; g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }
    g.globalCompositeOperation = "source-over";
    const cnt = (W * H) / 1800;
    for (let i = 0; i < cnt; i++) {
      const x = r() * W, y = r() * H, big = r() > 0.975, rad = big ? r() * 1.3 + 0.8 : r() * 0.9 + 0.2;
      g.globalAlpha = 0.2 + r() * 0.7; g.fillStyle = r() < 0.15 ? "#ffd9b0" : r() < 0.35 ? "#b8ccff" : "#ffffff";
      g.beginPath(); g.arc(x, y, rad, 0, 7); g.fill();
    }
    g.globalAlpha = 1;
  }
  c.drawImage(bg!, 0, 0, W, H);
}

// ---------- Soustava Aldry ----------
const SYS = { cx: 800, cy: 500 };
const orbit = (r: number, a: number, k = 0.42) => [SYS.cx + Math.cos(a) * r, SYS.cy + Math.sin(a) * r * k];
export function drawSystem(c: CanvasRenderingContext2D, s: State, T: number) {
  const { cx, cy } = SYS;
  // dráhy
  c.strokeStyle = "rgba(140,160,210,.13)"; c.lineWidth = 1;
  for (const r of [120, 260, 470, 640]) { c.beginPath(); c.ellipse(cx, cy, r, r * 0.42, 0, 0, 7); c.stroke(); }
  // pás Ceres-IX
  const rr = mulberry(9);
  for (let i = 0; i < 420; i++) {
    const a = rr() * 6.283 + T * 0.01, r = 260 + (rr() - 0.5) * 34;
    const p = orbit(r, a);
    c.fillStyle = `rgba(200,190,175,${0.25 + rr() * 0.4})`; c.fillRect(p[0], p[1], 1.6, 1.6);
  }
  // kometární oblak
  for (let i = 0; i < 160; i++) {
    const a = rr() * 6.283, r = 700 + rr() * 140, p = orbit(r, a, 0.45);
    c.fillStyle = "rgba(170,210,255,.18)"; c.fillRect(p[0], p[1], 1.2, 1.2);
  }
  // hvězda / díra
  if (s.ch <= 2) {
    const red = s.ch === 2 && s.stage === 4, wr = s.ch === 2 && s.stage >= 5;
    const col = red ? "255,140,80" : wr ? "210,195,255" : "160,195,255", R = red ? 34 : wr ? 14 : 22;
    const g = c.createRadialGradient(cx, cy, 0, cx, cy, R * 5);
    g.addColorStop(0, `rgba(${col},.75)`); g.addColorStop(0.2, `rgba(${col},.25)`); g.addColorStop(1, `rgba(${col},0)`);
    c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R * 5, 0, 7); c.fill();
    c.fillStyle = red ? "#ffd9b0" : "#f4f8ff"; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.fill();
  } else drawHole(c, cx, cy, 16, T);
  // roj (Kap. 2+)
  if (s.ch >= 2) {
    const cov = s.ch === 2 ? coverage(s) : 0.45, vis = Math.max(0.05, Math.min(1, (Math.log10(Math.max(cov, 1e-14)) + 14) / 14));
    c.save(); c.globalCompositeOperation = "lighter";
    for (let i = 0; i < 260 * vis; i++) { const a = i * 2.39996 + T * 0.05, r = 70 + (i % 3) * 14, p = orbit(r, a, 0.5); c.fillStyle = "rgba(255,215,150,.7)"; c.fillRect(p[0], p[1], 1.6, 1.6); }
    c.restore();
  }
  // vnitřní chtonická planeta
  const pc = orbit(120, T * 0.12); planet(c, pc[0], pc[1], 6, "#8a5a46");
  // Tauris a Kelvar
  const pt = orbit(470, 2.3 + T * 0.02); planet(c, pt[0], pt[1], 17, "#c89a6a", true);
  const pk = [pt[0] + Math.cos(T * 0.6) * 34, pt[1] + Math.sin(T * 0.6) * 14]; planet(c, pk[0], pk[1], 4, "#dfe8f0");
  // platforma VESPER-7 v pásu
  const pp = orbit(260, 0.55);
  c.fillStyle = "#f2a65a"; c.beginPath(); c.arc(pp[0], pp[1], 3.5, 0, 7); c.fill();
  label(c, pp[0] + 8, pp[1] + 16, "VESPER-7", "#f2a65a");
  label(c, pt[0] + 22, pt[1] - 14, "Tauris");
  label(c, pk[0] + 8, pk[1] + 12, "Kelvar");
  label(c, cx - 70, cy + 44, s.ch <= 2 ? "Aldra" : "Díra po Aldře");
}
function planet(c: CanvasRenderingContext2D, x: number, y: number, r: number, col: string, bands = false) {
  const g = c.createRadialGradient(x - r * 0.4, y - r * 0.4, r * 0.1, x, y, r);
  g.addColorStop(0, "#ffffff"); g.addColorStop(0.15, col); g.addColorStop(1, "#0b0d14");
  c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill();
  if (bands) { c.save(); c.beginPath(); c.arc(x, y, r, 0, 7); c.clip(); c.strokeStyle = "rgba(90,60,40,.35)"; c.lineWidth = 2; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(x - r, y + k * r * 0.32); c.lineTo(x + r, y + k * r * 0.32 + 2); c.stroke(); } c.restore(); }
}
export function drawHole(c: CanvasRenderingContext2D, x: number, y: number, R: number, T: number) {
  c.save(); c.globalCompositeOperation = "lighter";
  for (let i = 0; i < 3; i++) {
    c.strokeStyle = `rgba(255,${170 - i * 30},${90 - i * 20},${0.35 - i * 0.1})`; c.lineWidth = R * (0.5 - i * 0.1);
    c.beginPath(); c.ellipse(x, y, R * (2.4 + i * 0.6), R * (0.6 + i * 0.15), 0.2, 0, 7); c.stroke();
  }
  const g = c.createRadialGradient(x, y, R * 0.8, x, y, R * 1.6);
  g.addColorStop(0, "rgba(255,190,120,.7)"); g.addColorStop(1, "rgba(255,120,60,0)");
  c.fillStyle = g; c.beginPath(); c.arc(x, y, R * 1.6, 0, 7); c.fill();
  c.restore();
  c.fillStyle = "#000"; c.beginPath(); c.arc(x, y, R, 0, 7); c.fill();
  void T;
}
/** Pohled Hvězda v Kap. 3: díra po Aldře se zbytkem supernovy. */
export function drawRemnant(c: CanvasRenderingContext2D, T: number) {
  c.save(); c.globalCompositeOperation = "lighter";
  const r = mulberry(4);
  for (let i = 0; i < 900; i++) {
    const a = r() * 6.283, d = 260 + (r() - 0.5) * 70 + Math.sin(a * 7) * 18;
    c.fillStyle = r() < 0.5 ? "rgba(255,120,150,.25)" : "rgba(120,200,255,.22)";
    c.fillRect(800 + Math.cos(a) * d, 500 + Math.sin(a) * d * 0.9, 2, 2);
  }
  c.restore();
  drawHole(c, 800, 500, 40, T);
}

// ---------- Okolí (desítky světelných let) ----------
export function drawNear(c: CanvasRenderingContext2D, s: State, T: number) {
  const r = mulberry(12);
  for (let i = 0; i < 46; i++) {
    const x = 120 + r() * 1360, y = 90 + r() * 820, sz = 1 + r() * 2.6, hue = r();
    const col = hue < 0.3 ? "255,210,170" : hue < 0.7 ? "220,230,255" : "255,170,140";
    const g = c.createRadialGradient(x, y, 0, x, y, sz * 5);
    g.addColorStop(0, `rgba(${col},.6)`); g.addColorStop(1, `rgba(${col},0)`);
    c.fillStyle = g; c.beginPath(); c.arc(x, y, sz * 5, 0, 7); c.fill();
    c.fillStyle = `rgb(${col})`; c.beginPath(); c.arc(x, y, sz * 0.7, 0, 7); c.fill();
  }
  // bublina větru kolem Aldry
  c.strokeStyle = "rgba(150,170,255,.18)"; c.lineWidth = 2; c.beginPath(); c.ellipse(800, 500, 210, 180, 0.3, 0, 7); c.stroke();
  // starý pozůstatek supernovy
  c.save(); c.globalCompositeOperation = "lighter";
  for (let i = 0; i < 300; i++) { const a = r() * 6.283, d = 70 + (r() - 0.5) * 18; c.fillStyle = "rgba(255,130,160,.25)"; c.fillRect(1130 + Math.cos(a) * d, 330 + Math.sin(a) * d, 1.6, 1.6); }
  c.restore();
  if (s.ch <= 2) {
    const g = c.createRadialGradient(800, 500, 0, 800, 500, 60);
    g.addColorStop(0, "rgba(170,200,255,.9)"); g.addColorStop(1, "rgba(170,200,255,0)");
    c.fillStyle = g; c.beginPath(); c.arc(800, 500, 60, 0, 7); c.fill();
  } else drawHole(c, 800, 500, 9, T);
  label(c, 830, 470, s.ch <= 2 ? "Aldra" : "Díra po Aldře");
}

// ---------- značky misí a let Vesper ----------
export function missionPos(id: string): [number, number] {
  const m = MMAP[id];
  if (m.view === "galaxy") { const p = GAL_SITES[id]; const q = gsp({ x: p[0], y: p[1] }); return [q[0], q[1]]; }
  return m.at;
}
const ORIGIN: Record<string, [number, number]> = { system: [800 + Math.cos(0.55) * 260, 500 + Math.sin(0.55) * 260 * 0.42], near: [800, 500], galaxy: [0, 0] };
export function drawMissions(c: CanvasRenderingContext2D, s: State, view: string, T: number, sx: number, hover: string | null) {
  const fs = 13 / Math.max(sx, 0.3);
  for (const m of MISSIONS) {
    if (m.ch !== s.ch || m.view !== view || !mVisible(s, m.id)) continue;
    const [x, y] = missionPos(m.id), done = !!s.mis[m.id], run = s.run?.id === m.id;
    const pul = 0.6 + 0.4 * Math.sin(T * 2 + x);
    c.strokeStyle = done ? "rgba(142,240,200,.7)" : run ? "rgba(242,166,90,.9)" : `rgba(242,166,90,${0.45 + 0.4 * pul})`;
    c.lineWidth = 1.6; c.beginPath(); c.arc(x, y, 9 + (done ? 0 : pul * 3), 0, 7); c.stroke();
    if (done) { c.fillStyle = "rgba(142,240,200,.8)"; c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); }
    if (!done || hover === m.id) label(c, x + 14, y - 10, find("m", m.id).n, done ? "#8ef0c8" : "#f2c48a", fs);
  }
  if (s.run && MMAP[s.run.id].view === view) {
    const [tx, ty] = missionPos(s.run.id);
    let [ox, oy] = ORIGIN[view];
    if (view === "galaxy") { const h = gsp({ x: -0.51, y: -0.46 }); ox = h[0]; oy = h[1]; }
    const f = 1 - s.run.left / s.run.dur, k = f < 0.5 ? f * 2 : (1 - f) * 2;
    const x = ox + (tx - ox) * k, y = oy + (ty - oy) * k;
    c.setLineDash([3, 6]); c.strokeStyle = "rgba(242,166,90,.35)"; c.lineWidth = 1; c.beginPath(); c.moveTo(ox, oy); c.lineTo(tx, ty); c.stroke(); c.setLineDash([]);
    const a = Math.atan2(ty - oy, tx - ox) + (f < 0.5 ? 0 : Math.PI);
    c.save(); c.translate(x, y); c.rotate(a); c.fillStyle = "#ffe2b0";
    c.beginPath(); c.moveTo(7, 0); c.lineTo(-5, -4); c.lineTo(-3, 0); c.lineTo(-5, 4); c.closePath(); c.fill();
    c.fillStyle = "rgba(255,170,90,.8)"; c.fillRect(-9, -1, 4, 2); c.restore();
  }
}
export function missionAt(s: State, view: string, x: number, y: number): string | null {
  for (const m of MISSIONS) {
    if (m.ch !== s.ch || m.view !== view || !mVisible(s, m.id)) continue;
    const p = missionPos(m.id); if (Math.hypot(p[0] - x, p[1] - y) < 18) return m.id;
  }
  return null;
}
let LS = 1;
/** Měřítko scény – popisky drží čitelnou velikost na obrazovce (min. 12–13 px). */
export function setLabelScale(sx: number) { LS = Math.max(sx, 0.3); }
export function label(c: CanvasRenderingContext2D, x: number, y: number, t: string, col = "#9aa6bd", fs = 13 / LS) {
  c.font = `${fs}px ${MONO}`; c.textAlign = "left";
  c.fillStyle = "rgba(0,0,0,.7)"; c.fillText(t, x + 1, y + 1); c.fillStyle = col; c.fillText(t, x, y);
}
export { SANS };
