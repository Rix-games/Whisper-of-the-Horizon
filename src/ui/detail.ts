// Okno detailu mechaniky kapitoly (záložka Detail): řez asteroidem, život Aldry, galaxie.
import type { State } from "../core/state";
import { tx } from "../i18n";
import { layerIdx, T1 } from "../chapters/ch1";
import { coverage } from "../chapters/ch2";
import { colCount, starsOn, capture, zoneR } from "../chapters/ch3";
import { galaxie } from "../mech/ch3";
import { count, pct } from "../core/format";
import { MONO, SANS } from "../mech/fx";
import { img } from "./img";

const COLS = ["#6d655c", "#5c4a3e", "#8a7a55", "#9aa3ad", "#8a6fd0"];
const PHASES = [
  { r: 20, c: "#b9d2ff" }, { r: 21, c: "#b9d2ff" }, { r: 23, c: "#c7dbff" }, { r: 25, c: "#d2e0ff" },
  { r: 40, c: "#ffb070" }, { r: 16, c: "#d9d0ff" }, { r: 6, c: "#ffffff" },
];

export function drawDetail(cv: HTMLCanvasElement, s: State, T: number) {
  const dpr = Math.min(2, devicePixelRatio || 1), w = cv.clientWidth, hh = cv.clientHeight;
  if (!w || !hh) return;
  if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(hh * dpr); }
  const c = cv.getContext("2d")!; c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, hh);
  const X = tx(s.ch) as any;
  c.font = `13px ${MONO}`; c.textAlign = "left"; c.fillStyle = "#9aa6bd";
  if (s.ch === 1) cutaway(c, s, T, w, hh, X);
  else if (s.ch === 2) {
    // život Aldry: fáze zleva doprava
    const n = PHASES.length, y = hh * 0.45;
    for (let i = 0; i < n; i++) {
      const x = w * (0.08 + (0.84 * i) / (n - 1)), p = PHASES[i], on = i === Math.min(s.stage, n - 1);
      const g = c.createRadialGradient(x, y, 0, x, y, p.r * 3);
      g.addColorStop(0, p.c); g.addColorStop(0.35, p.c + "55"); g.addColorStop(1, p.c + "00");
      c.globalAlpha = i <= s.stage ? 1 : 0.35; c.fillStyle = g; c.beginPath(); c.arc(x, y, p.r * 3, 0, 7); c.fill();
      c.fillStyle = p.c; c.beginPath(); c.arc(x, y, p.r, 0, 7); c.fill(); c.globalAlpha = 1;
      if (on) { c.strokeStyle = "#ffd27a"; c.lineWidth = 2; c.beginPath(); c.arc(x, y, p.r + 8 + Math.sin(T * 3) * 2, 0, 7); c.stroke(); }
      c.textAlign = "center"; c.font = `${on ? 600 : 400} 13px ${SANS}`; c.fillStyle = on ? "#ffd27a" : "#9aa6bd";
      c.fillText(X.stages[i], x, y + 70);
    }
    c.textAlign = "left"; c.font = `13px ${MONO}`; c.fillStyle = "#9aa6bd";
    c.fillText(`${X.indicator}: ${pct(coverage(s))} · kolektory ${count(s.n)}`, 20, hh - 24);
  } else {
    // galaxie zmenšeně s hranicí dosahu
    const k = Math.min(w / 1600, hh / 1000) * 1.1;
    c.save(); c.translate((w - 1600 * k) / 2, (hh - 1000 * k) / 2); c.scale(k, k);
    galaxie.draw(c, s, { T, sx: k, passive: true, fx: 0 }, { x: -1e4, y: -1e4, px: 0, py: 0, down: false, inside: false });
    c.restore();
    c.font = `13px ${MONO}`; c.fillStyle = "#9aa6bd";
    c.fillText(`Kolonie ${colCount(s)} · hvězdy ${count(starsOn(s).v)} · zachycení ${pct(capture(s))} · dosah ${zoneR(s).toFixed(2).replace(".", ",")}`, 20, hh - 24);
  }
}

// ---------- Kap. 1: výřez asteroidem ----------
const LAY = [
  { a: "#8a7f74", b: "#5f574f", sp: "#b7aa98" },   // regolit
  { a: "#4c4038", b: "#2f2722", sp: "#7a6a58" },   // uhlíkatý plášť
  { a: "#8f7a4c", b: "#5a4a2c", sp: "#e6c46e" },   // kovová žíla
  { a: "#8d96a2", b: "#555d68", sp: "#dfe8f2" },   // niklové jádro
  { a: "#6f55b8", b: "#3a2a70", sp: "#cdb6ff" },   // izotopová žíla
];
/** Hranice vrstvy i (0 = povrch) jako zlomek poloměru. */
const edge = (i: number) => 1 - i * 0.19;
const jag = (a: number, k: number) => 1 + 0.035 * Math.sin(a * 5 + k) + 0.022 * Math.sin(a * 11 + k * 2.3) + 0.012 * Math.sin(a * 23 + k);
function rnd(i: number) { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

function cutaway(c: CanvasRenderingContext2D, s: State, T: number, w: number, hh: number, X: any) {
  const li = layerIdx(s), R = Math.min(w * 0.2, hh * 0.34), cx = Math.min(w * 0.36, R * 1.3 + 70), cy = hh * 0.52;
  const A0 = -Math.PI / 2, A1 = 0.12;                           // výřez: od vrcholu doprava
  // jemná záře za tělesem
  const halo = c.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.6);
  halo.addColorStop(0, "rgba(120,140,190,.10)"); halo.addColorStop(1, "rgba(120,140,190,0)");
  c.fillStyle = halo; c.fillRect(0, 0, w, hh);
  // povrch tělesa (obrázek, jinak kresba) mimo výřez
  c.save(); c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, R * 1.6, A1, A0 + Math.PI * 2); c.closePath(); c.clip();
  const im = img("asteroid");
  if (im) { const k = (R * 2.5) / Math.max(im.width, im.height); c.drawImage(im, cx - (im.width * k) / 2, cy - (im.height * k) / 2, im.width * k, im.height * k); }
  else {
    const g = c.createRadialGradient(cx - R * 0.4, cy - R * 0.4, R * 0.1, cx, cy, R * 1.05);
    g.addColorStop(0, "#9b9084"); g.addColorStop(1, "#2c2722");
    c.fillStyle = g; c.beginPath();
    for (let k = 0; k <= 96; k++) { const a = (k / 96) * Math.PI * 2, r = R * jag(a, 0); k ? c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : c.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
    c.fill();
  }
  c.restore();
  // vrstvy ve výřezu
  for (let i = 0; i < 5; i++) {
    const r0 = R * edge(i), L = LAY[i], open = i <= li;
    const g = c.createRadialGradient(cx, cy, r0 * 0.75, cx, cy, r0);
    g.addColorStop(0, L.b); g.addColorStop(1, L.a);
    c.fillStyle = g; c.beginPath(); c.moveTo(cx, cy);
    for (let k = 0; k <= 40; k++) { const a = A0 + ((A1 - A0) * k) / 40, r = r0 * (i ? jag(a, i * 3) : 1); c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
    c.closePath(); c.fill();
    // zrnka minerálů
    const r1 = R * edge(i + 1);
    c.fillStyle = L.sp;
    for (let k = 0; k < 26; k++) {
      const a = A0 + (A1 - A0) * rnd(i * 97 + k), r = r1 + (r0 - r1) * (0.15 + 0.7 * rnd(i * 31 + k * 7));
      const tw = open ? 0.55 + 0.45 * Math.sin(T * 2 + k) : 0.25;
      c.globalAlpha = tw * (i === li ? 1 : 0.6); c.beginPath(); c.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1 + rnd(k + i) * 1.6, 0, 7); c.fill();
    }
    c.globalAlpha = 1;
    // neprozkoumané vrstvy ztlumit
    if (!open) {
      c.fillStyle = "rgba(4,5,10,.55)"; c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, r0 * 1.02, A0, A1); c.closePath(); c.fill();
    }
  }
  // hrany výřezu
  c.strokeStyle = "rgba(255,255,255,.18)"; c.lineWidth = 1;
  c.beginPath(); c.moveTo(cx + Math.cos(A0) * R * 1.04, cy + Math.sin(A0) * R * 1.04); c.lineTo(cx, cy); c.lineTo(cx + Math.cos(A1) * R * 1.04, cy + Math.sin(A1) * R * 1.04); c.stroke();
  // aktuální hloubka – svítící okraj
  const rc = R * edge(li), pulse = 0.6 + 0.4 * Math.sin(T * 3);
  c.save(); c.shadowColor = "#ffb85a"; c.shadowBlur = 14 * pulse; c.strokeStyle = `rgba(255,200,110,${0.55 + 0.45 * pulse})`; c.lineWidth = 2.5;
  c.beginPath(); c.arc(cx, cy, rc, A0 + 0.02, A1 - 0.02); c.stroke(); c.restore();
  // laser z platformy nad tělesem k aktuální hloubce
  const aL = A0 + (A1 - A0) * 0.42, tx0 = cx + Math.cos(aL) * R * 1.55, ty0 = cy + Math.sin(aL) * R * 1.55;
  const tx1 = cx + Math.cos(aL) * rc, ty1 = cy + Math.sin(aL) * rc, fl = 0.75 + 0.25 * Math.sin(T * 37) * Math.sin(T * 13);
  c.save(); c.globalCompositeOperation = "lighter";
  c.strokeStyle = `rgba(255,120,60,${0.35 * fl})`; c.lineWidth = 7; c.beginPath(); c.moveTo(tx0, ty0); c.lineTo(tx1, ty1); c.stroke();
  c.strokeStyle = `rgba(255,230,190,${0.9 * fl})`; c.lineWidth = 1.6; c.beginPath(); c.moveTo(tx0, ty0); c.lineTo(tx1, ty1); c.stroke();
  const sg = c.createRadialGradient(tx1, ty1, 0, tx1, ty1, 18);
  sg.addColorStop(0, "rgba(255,240,200,.95)"); sg.addColorStop(0.3, "rgba(255,150,70,.5)"); sg.addColorStop(1, "rgba(255,120,60,0)");
  c.fillStyle = sg; c.beginPath(); c.arc(tx1, ty1, 18, 0, 7); c.fill();
  for (let k = 0; k < 7; k++) {                                     // jiskry
    const ph = (T * 1.7 + k / 7) % 1, a = aL + Math.PI + (rnd(k) - 0.5) * 1.8, d = ph * 34;
    c.fillStyle = `rgba(255,${180 + 60 * rnd(k + 3)},120,${1 - ph})`;
    c.beginPath(); c.arc(tx1 + Math.cos(a) * d, ty1 + Math.sin(a) * d, 1.4, 0, 7); c.fill();
  }
  c.restore();
  // hlavička laseru
  c.fillStyle = "#c9d3e6"; c.beginPath(); c.arc(tx0, ty0, 4, 0, 7); c.fill();
  c.font = `11px ${MONO}`; c.fillStyle = "#7d879c"; c.textAlign = "center"; c.fillText("VESPER-7", tx0, ty0 - 10);
  // popisky vrstev vpravo s vodicí čarou
  c.textAlign = "left";
  const lx = Math.max(cx + R * 1.25, w * 0.58), step = Math.min(64, (hh - 70) / 5), y0 = cy - step * 2;
  for (let i = 0; i < 5; i++) {
    const rm = R * (edge(i) + edge(i + 1)) / 2, am = A0 + (A1 - A0) * 0.82, px = cx + Math.cos(am) * rm, py = cy + Math.sin(am) * rm;
    const y = y0 + i * step, on = i === li, done = i < li;
    c.strokeStyle = on ? "rgba(255,210,122,.7)" : "rgba(125,135,156,.35)"; c.lineWidth = 1;
    c.beginPath(); c.moveTo(px, py); c.lineTo(lx - 34, y - 4); c.lineTo(lx - 10, y - 4); c.stroke();
    c.fillStyle = LAY[i].sp; c.beginPath(); c.arc(px, py, 2.5, 0, 7); c.fill();
    c.font = `${on ? 600 : 500} 15px ${SANS}`; c.fillStyle = on ? "#ffd27a" : done ? "#dfe4ef" : "#5d6678";
    c.fillText(`${done ? "✓ " : on ? "▶ " : ""}${i <= li ? X.layer[i] : "???"}`, lx, y);
    c.font = `12px ${MONO}`; c.fillStyle = on ? "#e3a970" : done ? "#8ef0c8" : "#4a5266";
    c.fillText(i > li ? "neprozkoumáno" : i ? `${count(Math.pow(T1.layerMult, i))}× víc rudy` : "základní výnos", lx, y + 17);
  }
}
