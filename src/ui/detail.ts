// Okno detailu mechaniky kapitoly (záložka Detail): řez asteroidem, život Aldry, galaxie.
import type { State } from "../core/state";
import { tx } from "../i18n";
import { layerIdx, T1 } from "../chapters/ch1";
import { coverage } from "../chapters/ch2";
import { colCount, starsOn, capture, zoneR, lyOf, isOn } from "../chapters/ch3";
import { galaxyNodes } from "../core/galaxy";
import { count, pct } from "../core/format";
import { MONO, SANS } from "../mech/fx";
import { img } from "./img";
import { soft } from "./views";
import { LOOK, PIC } from "../mech/ch2";
import { stagesOf } from "../core/defs";

const COLS = ["#6d655c", "#5c4a3e", "#8a7a55", "#9aa3ad", "#8a6fd0"];

export function drawDetail(cv: HTMLCanvasElement, s: State, T: number) {
  const dpr = Math.min(2, devicePixelRatio || 1), w = cv.clientWidth, hh = cv.clientHeight;
  if (!w || !hh) return;
  if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(hh * dpr); }
  const c = cv.getContext("2d")!; c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, hh);
  const X = tx(s.ch) as any;
  c.font = `13px ${MONO}`; c.textAlign = "left"; c.fillStyle = "#9aa6bd";
  if (s.ch === 1) cutaway(c, s, T, w, hh, X);
  else if (s.ch === 2) starCut(c, s, T, w, hh, X);
  else galaxyCut(c, s, T, w, hh, X);
}

// ---------- Kap. 3: Mléčná dráha z boku (jen aktuální stadium) ----------
function galaxyCut(c: CanvasRenderingContext2D, s: State, T: number, w: number, hh: number, X: any) {
  const st = Math.min(s.stage, X.phase.length - 1), P = X.phase[st], S = X.card;
  const iw = Math.min(w * 0.62, (hh - 40) * 1.79), ih = iw / 1.79, x0 = 10, y0 = (hh - ih) / 2;
  const cx = x0 + iw * 0.49, cy = y0 + ih * 0.49, half = iw * 0.44;
  const im = soft("galaxySide");   // měkké okraje – jinak je vidět obdélník obrázku
  if (im) { c.save(); c.globalCompositeOperation = "screen"; c.drawImage(im, x0, y0, iw, ih); c.restore(); }
  else {
    const g = c.createRadialGradient(cx, cy, 0, cx, cy, half); g.addColorStop(0, "rgba(255,225,170,.8)"); g.addColorStop(0.15, "rgba(200,210,255,.35)"); g.addColorStop(1, "rgba(120,140,220,0)");
    c.save(); c.translate(cx, cy); c.scale(1, 0.06); c.fillStyle = g; c.beginPath(); c.arc(0, 0, half, 0, 7); c.fill(); c.restore();
  }
  const N = galaxyNodes(), h = N[0], px = (x: number) => cx + x * half;
  // kam plachty zatím doletí (pás kolem domova)
  const zr = zoneR(s), a = px(Math.max(-1, h.x - zr)), b = px(Math.min(1, h.x + zr));
  const band = c.createLinearGradient(0, cy - ih * 0.09, 0, cy + ih * 0.09);
  band.addColorStop(0, "rgba(142,240,200,0)"); band.addColorStop(0.5, "rgba(142,240,200,.10)"); band.addColorStop(1, "rgba(142,240,200,0)");
  c.fillStyle = band; c.fillRect(a, cy - ih * 0.09, b - a, ih * 0.18);
  c.strokeStyle = "rgba(142,240,200,.45)"; c.setLineDash([3, 5]); c.lineWidth = 1;
  for (const xx of [a, b]) { c.beginPath(); c.moveTo(xx, cy - ih * 0.1); c.lineTo(xx, cy + ih * 0.1); c.stroke(); }
  c.setLineDash([]);
  // kolonie (průmět do roviny disku)
  c.save(); c.globalCompositeOperation = "lighter";
  for (const n of N) {
    if (n.home || !isOn(s, n.i)) continue;
    const x = px(n.x), y = cy + (n.core ? n.y * 0.5 : n.y * 0.06) * ih * 0.5, r = 1.6 + 0.35 * Math.log10(n.stars / 1e4 + 1);
    const g = c.createRadialGradient(x, y, 0, x, y, r * 4); g.addColorStop(0, "rgba(255,205,135,.55)"); g.addColorStop(1, "rgba(255,170,90,0)");
    c.fillStyle = g; c.beginPath(); c.arc(x, y, r * 4, 0, 7); c.fill();
    c.fillStyle = "rgba(255,232,190,.95)"; c.beginPath(); c.arc(x, y, r * 0.7, 0, 7); c.fill();
  }
  c.restore();
  // domov a střed
  const hx = px(h.x), hy = cy + h.y * 0.06 * ih * 0.5;
  c.strokeStyle = "rgba(255,210,122,.9)"; c.lineWidth = 1.2; c.beginPath(); c.arc(hx, hy, 6 + Math.sin(T * 2) * 1.2, 0, 7); c.stroke();
  c.textBaseline = "middle"; c.font = `13px ${MONO}`; c.textAlign = "center";
  c.fillStyle = "#ffd27a"; c.fillText(S.home, hx, hy - ih * 0.16);
  c.strokeStyle = "rgba(255,210,122,.4)"; c.beginPath(); c.moveTo(hx, hy - 9); c.lineTo(hx, hy - ih * 0.16 + 9); c.stroke();
  const awake = !!s.r.sgra, sy = cy - ih * 0.2;
  c.fillStyle = awake ? "#cfe0ff" : "#9aa6bd"; c.fillText(S.core, cx, sy);
  c.strokeStyle = "rgba(200,215,255,.35)"; c.beginPath(); c.moveTo(cx, sy + 9); c.lineTo(cx, cy - 8); c.stroke();
  c.fillStyle = "rgba(142,240,200,.85)"; c.fillText(S.reach + " " + lyOf(zr), (a + b) / 2, cy + ih * 0.15);
  c.textAlign = "left"; c.font = `600 11px ${SANS}`; c.fillStyle = "rgba(176,181,212,.9)";
  c.fillText(S.cut.toUpperCase(), 20, 24);
  // karta stadia vpravo
  const ix = x0 + iw + 28, cw = Math.min(380, w - ix - 20);
  if (cw < 200) { c.textBaseline = "alphabetic"; return; }
  stageCard(c, s, X, st, P.n, [[S.where, P.where], [S.col, count(colCount(s))], [S.stars, count(starsOn(s).v)], [S.cap, pct(capture(s))], [S.reach, lyOf(zr)], [S.real, P.real]], P.t, ix, Math.max(40, hh / 2 - 170), cw, S.stage);
  c.textBaseline = "alphabetic";
}
/** Karta aktuálního stadia (sdílí Kap. 2 a 3). */
function stageCard(c: CanvasRenderingContext2D, s: State, X: any, st: number, sub: string, rows: [string, string][], txt: string, ix: number, y: number, iw: number, stLab: string) {
  c.textAlign = "left"; c.textBaseline = "middle";
  c.font = `12px ${MONO}`; c.fillStyle = "#e3a970"; c.fillText(stLab.replace("{n}", String(Math.min(st + 1, stagesOf(s)))).replace("{of}", String(stagesOf(s))).toUpperCase(), ix, y); y += 30;
  c.font = `600 22px ${SANS}`; c.fillStyle = "#ffd27a"; c.fillText(X.stages[st], ix, y); y += 26;
  c.font = `15px ${SANS}`; c.fillStyle = "#cfd6e6"; c.fillText(sub, ix, y); y += 30;
  for (const [a, b] of rows) {
    c.font = `13px ${SANS}`; c.fillStyle = "#8f9ab0"; c.fillText(a, ix, y);
    c.font = `13px ${MONO}`; c.fillStyle = "#e8eaf8"; c.textAlign = "right"; c.fillText(b, ix + iw, y); c.textAlign = "left";
    c.strokeStyle = "rgba(255,255,255,.06)"; c.beginPath(); c.moveTo(ix, y + 11); c.lineTo(ix + iw, y + 11); c.stroke();
    y += 26;
  }
  y += 10; c.font = `14px ${SANS}`; c.fillStyle = "#b9c2d6"; wrap(c, txt, ix, y, iw, 20);
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

// ---------- Kap. 2: řez Aldrou (jen aktuální stadium) ----------
// slupky od povrchu k jádru: [popisek, poloměr jako zlomek R, barva]
const SHELLS: [string, number, string][][] = [
  [["H", 1, "#2b3a78"], ["H → He", 0.34, "#5b3f92"]],
  [["H", 1, "#2b3a78"], ["H → He", 0.32, "#5b3f92"]],
  [["H", 1, "#2b3a78"], ["H → He", 0.34, "#5b3f92"], ["He", 0.2, "#6a4a9c"]],
  [["H", 1, "#33407e"], ["H → He", 0.36, "#5b3f92"], ["He → C · O", 0.2, "#93406f"]],
  [["H", 1, "#6e2a3e"], ["He", 0.5, "#5b3f92"], ["He → C · O", 0.28, "#93406f"]],
  [["He", 1, "#5b3f92"], ["C · O", 0.62, "#93406f"], ["C → Ne · Mg", 0.32, "#bb5a40"]],
  [["He", 1, "#5b3f92"], ["C · O", 0.8, "#93406f"], ["Ne · O", 0.62, "#bb5a40"], ["Si · S", 0.44, "#d8903c"], ["Si → Fe", 0.24, "#a9b2c6"]],
];
const hexC = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixC = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgbC = (c: number[], a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
function wrap(c: CanvasRenderingContext2D, txt: string, x: number, y: number, maxW: number, lh: number) {
  let line = "";
  for (const wd of txt.split(" ")) {
    const t = line ? line + " " + wd : wd;
    if (c.measureText(t).width > maxW && line) { c.fillText(line, x, y); y += lh; line = wd; } else line = t;
  }
  if (line) c.fillText(line, x, y);
  return y + lh;
}

/** Obrázek hvězdy zmenšený na poloměr R s měkkým okrajem (kotouč + kousek koróny), cache podle stadia a velikosti. */
let spKey = "", spCv: HTMLCanvasElement | null = null;
function starSprite(st: number, R: number, T: number) {
  const [k, f] = PIC(st), im = img(k); if (!im) return null;
  const sz = Math.ceil(R * 4), key = k + sz;
  if (key !== spKey) {
    const cv = document.createElement("canvas"); cv.width = cv.height = sz;
    const g = cv.getContext("2d")!, hw = R / f; g.imageSmoothingQuality = "high";
    g.drawImage(im, sz / 2 - hw, sz / 2 - hw, hw * 2, hw * 2);
    const m = g.createRadialGradient(sz / 2, sz / 2, R * 1.02, sz / 2, sz / 2, R * (f < 0.5 ? 1.7 : 1.35));
    m.addColorStop(0, "rgba(0,0,0,1)"); m.addColorStop(1, "rgba(0,0,0,0)");
    g.globalCompositeOperation = "destination-in"; g.fillStyle = m; g.fillRect(0, 0, sz, sz);
    spKey = key; spCv = cv;
  }
  return spCv;
}

function starCut(c: CanvasRenderingContext2D, s: State, T: number, w: number, hh: number, X: any) {
  const st = Math.min(s.stage, SHELLS.length - 1), Ls = SHELLS[st], Lk = LOOK[st], P = X.phase[st], S = X.star;
  const R = Math.min(w * 0.19, hh * 0.36), cx = Math.min(w * 0.3, R * 1.45 + 60), cy = hh * 0.52;
  const A0 = -Math.PI / 2, A1 = 0, gl = Lk.glow.join(","), hot = [255, 238, 205];
  const fin = st === 6 ? 1 + 0.03 * Math.sin(T * 9) : 1;                       // poslední dny: jádro se chvěje
  // záře
  const halo = c.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 2.1);
  halo.addColorStop(0, `rgba(${gl},.42)`); halo.addColorStop(0.35, `rgba(${gl},.1)`); halo.addColorStop(1, `rgba(${gl},0)`);
  c.fillStyle = halo; c.beginPath(); c.arc(cx, cy, R * 2.1, 0, 7); c.fill();
  // povrch (obrázek stadia s měkkou maskou, jinak kresba) mimo výřez
  c.save(); c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, R * 2, A1, A0 + Math.PI * 2); c.closePath(); c.clip();
  const sp = starSprite(st, R, T);
  if (sp) { c.globalCompositeOperation = "screen"; c.drawImage(sp, cx - sp.width / 2, cy - sp.height / 2); c.globalCompositeOperation = "source-over"; }
  else {
    const g = c.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.1, cx, cy, R);
    g.addColorStop(0, Lk.core); g.addColorStop(0.6, Lk.mid); g.addColorStop(1, Lk.edge);
    c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.fill();
  }
  c.restore();
  // slupky ve výřezu
  Ls.forEach(([, fr, col], i) => {
    const inner = i + 1 < Ls.length ? Ls[i + 1][1] : 0, base = hexC(col);
    const g = c.createRadialGradient(cx, cy, R * inner, cx, cy, R * fr);
    g.addColorStop(0, rgbC(mixC(base, hot, 0.35 + i * 0.07))); g.addColorStop(1, rgbC(mixC(base, [8, 8, 20], 0.25)));
    c.fillStyle = g; c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, R * fr, A0, A1); c.closePath(); c.fill();
  });
  c.save(); c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, R, A0, A1); c.closePath(); c.clip();
  // proudění v obálce
  const env0 = Ls.length > 1 ? Ls[1][1] : 0;
  for (let j = 0; j < 9; j++) {
    const rr = R * (env0 + (1 - env0) * ((j + 0.5) / 9)), sh = Math.sin(T * 0.3 + j * 1.7) * 0.08;
    c.strokeStyle = "rgba(255,255,255,.06)"; c.lineWidth = 1; c.beginPath(); c.arc(cx, cy, rr, A0 + 0.12 + sh, A1 - 0.12 + sh); c.stroke();
  }
  for (const [, fr] of Ls) { c.strokeStyle = "rgba(255,240,220,.28)"; c.lineWidth = 1; c.beginPath(); c.arc(cx, cy, R * fr, A0, A1); c.stroke(); }
  // hořící jádro
  const cr = R * Ls[Ls.length - 1][1] * (1 + 0.04 * Math.sin(T * 0.9)) * fin;
  const cg = c.createRadialGradient(cx, cy, 0, cx, cy, cr * 1.6);
  cg.addColorStop(0, "rgba(255,255,245,.85)"); cg.addColorStop(0.35, "rgba(255,230,190,.35)"); cg.addColorStop(1, "rgba(255,220,180,0)");
  c.fillStyle = cg; c.beginPath(); c.arc(cx, cy, cr * 1.6, 0, 7); c.fill();
  c.restore();
  // hrany výřezu
  c.strokeStyle = "rgba(255,240,215,.55)"; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(cx, cy - R); c.lineTo(cx, cy); c.lineTo(cx + R, cy); c.stroke();
  // popisky slupek s vodicí čarou
  c.textBaseline = "middle";
  const lx = Math.max(cx + R * 1.3, w * 0.42), gap = Math.min(34, (hh - 90) / Ls.length), top = cy - R * 0.45 - ((Ls.length - 1) * gap) / 2;
  Ls.forEach(([name, fr, col], i) => {
    const inner = i + 1 < Ls.length ? Ls[i + 1][1] : 0, mid = (R * (fr + inner)) / 2, a = -Math.PI / 4 + (i - (Ls.length - 1) / 2) * 0.12;
    const sx0 = cx + Math.cos(a) * mid, sy0 = cy + Math.sin(a) * mid, ly = top + i * gap, last = i === Ls.length - 1;
    c.strokeStyle = last ? "rgba(255,210,122,.7)" : "rgba(225,228,244,.4)"; c.lineWidth = 1;
    c.beginPath(); c.moveTo(sx0, sy0); c.lineTo(lx - 24, ly); c.lineTo(lx - 10, ly); c.stroke();
    c.fillStyle = "#fff"; c.beginPath(); c.arc(sx0, sy0, 2, 0, 7); c.fill();
    c.fillStyle = rgbC(mixC(hexC(col), hot, 0.3)); c.beginPath(); c.arc(lx, ly, 5.5, 0, 7); c.fill();
    c.font = `${last ? 600 : 400} 14px ${MONO}`; c.textAlign = "left"; c.fillStyle = last ? "#ffd27a" : "#e8eaf8";
    c.fillText(name, lx + 14, ly);
  });
  c.font = `600 11px ${SANS}`; c.fillStyle = "rgba(176,181,212,.9)"; c.textAlign = "left";
  c.fillText(S.cut.toUpperCase(), 20, 24);
  // karta stadia vpravo
  const ix = Math.max(lx + 190, w * 0.62), iw = Math.min(380, w - ix - 20);
  if (iw < 200) { c.textBaseline = "alphabetic"; return; }
  stageCard(c, s, X, st, P.n, [[S.burn, P.burn], [S.T, P.T], [S.R, S.rsun.replace("{v}", P.R)], [S.L, S.lsun.replace("{v}", P.L)], [S.real, P.real], [S.cov, pct(coverage(s))]], P.t, ix, Math.max(40, cy - 150), iw, S.stage);
  c.textBaseline = "alphabetic";
}
