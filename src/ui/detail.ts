// Okno detailu mechaniky kapitoly (záložka Detail): řez asteroidem, život Aldry, galaxie.
import type { State } from "../core/state";
import { tx } from "../i18n";
import { layerIdx, T1 } from "../chapters/ch1";
import { coverage } from "../chapters/ch2";
import { colCount, starsOn, capture, zoneR } from "../chapters/ch3";
import { galaxie } from "../mech/ch3";
import { count, pct } from "../core/format";
import { MONO, SANS } from "../mech/fx";

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
  if (s.ch === 1) {
    // řez asteroidem: soustředné vrstvy, aktuální hloubka svítí
    const cx = w * 0.35, cy = hh / 2, R = Math.min(w * 0.3, hh * 0.42), li = layerIdx(s);
    for (let i = 0; i < 5; i++) {
      const r = R * (1 - i * 0.18);
      c.fillStyle = COLS[i]; c.beginPath(); c.arc(cx, cy, r, Math.PI * 0.5, Math.PI * 1.5); c.fill();
      if (i === li) { c.strokeStyle = "#ffd27a"; c.lineWidth = 2.5; c.beginPath(); c.arc(cx, cy, r, Math.PI * 0.5, Math.PI * 1.5); c.stroke(); }
    }
    c.fillStyle = "#3a332d"; c.fillRect(cx, cy - R, 3, R * 2);
    for (let i = 0; i < 5; i++) {
      const y = cy - R + 30 + i * ((R * 2 - 60) / 4);
      c.fillStyle = i === li ? "#ffd27a" : i < li ? "#8ef0c8" : "#5d6678";
      c.font = `${i === li ? 600 : 400} 14px ${SANS}`;
      c.fillText(`${i < li ? "✓" : i === li ? "▶" : "·"} ${X.layer[i]}`, cx + 30, y);
      c.font = `12px ${MONO}`; c.fillStyle = "#7d879c"; c.fillText(`ruda ×${count(Math.pow(T1.layerMult, i))}`, cx + 30, y + 17);
    }
  } else if (s.ch === 2) {
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
