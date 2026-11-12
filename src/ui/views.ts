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
import { img } from "./img";

// ---------- pozadí (cache podle velikosti) ----------
let bg: HTMLCanvasElement | null = null, bgKey = "";
export function background(c: CanvasRenderingContext2D, W: number, H: number, dpr: number, ch: number) {
  const key = `${W}x${H}x${dpr}x${ch}x${img("bg") ? 1 : 0}`;
  if (bgKey !== key) {
    bgKey = key; bg = document.createElement("canvas"); bg.width = Math.round(W * dpr); bg.height = Math.round(H * dpr);
    const g = bg.getContext("2d")!; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = "#04050a"; g.fillRect(0, 0, W, H);
    const I = img("bg");
    if (I) {   // obrázek pozadí přes celou obrazovku (cover), hvězdy z kódu se už nepřidávají
      const k = Math.max(W / I.width, H / I.height), w = I.width * k, h = I.height * k;
      g.drawImage(I, (W - w) / 2, (H - h) / 2, w, h);
      const tint = ch === 1 ? "60,90,170" : ch === 2 ? "70,60,150" : "110,60,130";
      const gr = g.createRadialGradient(W * 0.72, H * 0.2, 0, W * 0.72, H * 0.2, Math.max(W, H) * 0.75);
      gr.addColorStop(0, `rgba(${tint},.18)`); gr.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      return void c.drawImage(bg!, 0, 0, W, H);
    }
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

/** Obrázek s rozmazanými okraji (aby nebyl vidět obdélník), počítá se jednou. */
const softC: Record<string, HTMLCanvasElement> = {};
function soft(k: "system"): HTMLCanvasElement | null {
  if (softC[k]) return softC[k];
  const I = img(k); if (!I) return null;
  const cv = document.createElement("canvas"); cv.width = I.width; cv.height = I.height;
  const g = cv.getContext("2d")!; g.drawImage(I, 0, 0);
  g.globalCompositeOperation = "destination-in";
  const w = I.width, h = I.height, e = 0.12;
  const gx = g.createLinearGradient(0, 0, w, 0); gx.addColorStop(0, "rgba(0,0,0,0)"); gx.addColorStop(e, "#000"); gx.addColorStop(1 - e, "#000"); gx.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = gx; g.fillRect(0, 0, w, h);
  const gy = g.createLinearGradient(0, 0, 0, h); gy.addColorStop(0, "rgba(0,0,0,0)"); gy.addColorStop(e, "#000"); gy.addColorStop(1 - e, "#000"); gy.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = gy; g.fillRect(0, 0, w, h);
  return (softC[k] = cv);
}

// ---------- Soustava Aldry ----------
// Rozvržení odpovídá obrázku kap1-soustava (16:9 vložené do 1600×1000, svisle od y = 53).
const IY = 53, IH = 893;
const at = (nx: number, ny: number): [number, number] => [nx * 1600, IY + ny * IH];
export const SYS = {
  aldra: at(0.499, 0.482), chthon: at(0.591, 0.492), tauris: at(0.802, 0.415), kelvar: at(0.775, 0.443),
  platform: at(0.42, 0.66), comet: at(0.655, 0.134), beltR: 0.2,
};
const orbit = (r: number, a: number, k = 0.42) => [SYS.aldra[0] + Math.cos(a) * r, SYS.aldra[1] + Math.sin(a) * r * k];
export function drawSystem(c: CanvasRenderingContext2D, s: State, T: number) {
  const [cx, cy] = SYS.aldra, I = soft("system");
  if (I) {
    c.drawImage(I, 0, IY, 1600, IH);
    if (s.ch >= 3) { c.fillStyle = "rgba(4,5,10,.9)"; c.beginPath(); c.arc(cx, cy, 34, 0, 7); c.fill(); drawHole(c, cx, cy, 12, T); }
    else if (s.ch === 2 && s.stage >= 4) {   // rudý veleobr / Wolf-Rayet přebarví hvězdu
      const red = s.stage === 4, col = red ? "255,130,70" : "200,180,255", R = red ? 40 : 18;
      c.save(); c.globalCompositeOperation = red ? "source-over" : "lighter";
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, R * 2.2); g.addColorStop(0, `rgba(${col},.95)`); g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R * 2.2, 0, 7); c.fill(); c.restore();
    }
  } else {
    c.strokeStyle = "rgba(140,160,210,.13)"; c.lineWidth = 1;
    for (const r of [150, 330, 470, 640]) { c.beginPath(); c.ellipse(cx, cy, r, r * 0.42, 0, 0, 7); c.stroke(); }
    const rr = mulberry(9);
    for (let i = 0; i < 420; i++) { const a = rr() * 6.283 + T * 0.01, r = 330 + (rr() - 0.5) * 40, p = orbit(r, a); c.fillStyle = `rgba(200,190,175,${0.25 + rr() * 0.4})`; c.fillRect(p[0], p[1], 1.6, 1.6); }
    if (s.ch <= 2) {
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, 110);
      g.addColorStop(0, "rgba(160,195,255,.75)"); g.addColorStop(0.2, "rgba(160,195,255,.25)"); g.addColorStop(1, "rgba(160,195,255,0)");
      c.fillStyle = g; c.beginPath(); c.arc(cx, cy, 110, 0, 7); c.fill();
      c.fillStyle = "#f4f8ff"; c.beginPath(); c.arc(cx, cy, 22, 0, 7); c.fill();
    } else drawHole(c, cx, cy, 16, T);
    planet(c, SYS.chthon[0], SYS.chthon[1], 7, "#8a5a46");
    planet(c, SYS.tauris[0], SYS.tauris[1], 26, "#c89a6a", true);
    planet(c, SYS.kelvar[0], SYS.kelvar[1], 5, "#dfe8f0");
  }
  // roj (Kap. 2+)
  if (s.ch >= 2) {
    const cov = s.ch === 2 ? coverage(s) : 0.45, vis = Math.max(0.05, Math.min(1, (Math.log10(Math.max(cov, 1e-14)) + 14) / 14));
    c.save(); c.globalCompositeOperation = "lighter";
    for (let i = 0; i < 260 * vis; i++) { const a = i * 2.39996 + T * 0.05, r = 80 + (i % 3) * 16, p = orbit(r, a, 0.5); c.fillStyle = "rgba(255,215,150,.7)"; c.fillRect(p[0], p[1], 1.8, 1.8); }
    c.restore();
  }
  const [px, py] = SYS.platform;
  c.fillStyle = "#f2a65a"; c.beginPath(); c.arc(px, py, 4, 0, 7); c.fill();
  c.strokeStyle = "rgba(242,166,90,.5)"; c.beginPath(); c.arc(px, py, 9 + Math.sin(T * 2) * 1.5, 0, 7); c.stroke();
  label(c, px + 12, py + 16, "VESPER-7", "#f2a65a");
  label(c, SYS.tauris[0] + 30, SYS.tauris[1] - 42, "Tauris");
  label(c, SYS.kelvar[0] - 78, SYS.kelvar[1] + 30, "Kelvar");
  label(c, cx - 30, cy + 58, s.ch <= 2 ? "Aldra" : "Díra po Aldře");
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
const ORIGIN: Record<string, [number, number]> = { system: SYS.platform, near: [800, 500], galaxy: [0, 0] };
export function drawMissions(c: CanvasRenderingContext2D, s: State, view: string, T: number, sx: number, hover: string | null) {
  const fs = 13 / Math.max(sx, 0.3);
  for (const m of MISSIONS) {
    if (m.ch !== s.ch || m.view !== view || !mVisible(s, m.id)) continue;
    const [x, y] = missionPos(m.id), done = !!s.mis[m.id], run = s.run?.id === m.id;
    const pul = 0.6 + 0.4 * Math.sin(T * 2 + x);
    c.strokeStyle = done ? "rgba(142,240,200,.7)" : run ? "rgba(242,166,90,.9)" : `rgba(242,166,90,${0.45 + 0.4 * pul})`;
    c.lineWidth = 1.6; c.beginPath(); c.arc(x, y, 9 + (done ? 0 : pul * 3), 0, 7); c.stroke();
    if (done) { c.fillStyle = "rgba(142,240,200,.8)"; c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); }
    if (!done || hover === m.id) label(c, x + 14, y + 26, find("m", m.id).n, done ? "#8ef0c8" : "#f2c48a", fs);
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
