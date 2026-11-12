// Sdílené efekty a typy mechanik (virtuální souřadnice 1600×1000).
import { rnd } from "../core/rng";

export const VW = 1600, VH = 1000;
export interface Input { x: number; y: number; px: number; py: number; down: boolean; inside: boolean; }
export interface View { T: number; sx: number; passive: boolean; fx: number; }
export const MONO = '"JetBrains Mono", Consolas, monospace';
export const SANS = '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif';

const txt: { x: number; y: number; s: string; col: string; t: number }[] = [];
const sp: { x: number; y: number; vx: number; vy: number; t: number; life: number; col: string }[] = [];
export let fxOn = true;
export function setFx(v: boolean) { fxOn = v; }

export function ftxt(x: number, y: number, s: string, col = "#f2a65a") {
  if (!fxOn) return;
  if (txt.length > 24) txt.shift();
  txt.push({ x, y, s, col, t: 0 });
}
export function sparks(x: number, y: number, n: number, col: string, speed = 120) {
  if (!fxOn) return;
  n = Math.min(n, 400 - sp.length);
  for (let i = 0; i < n; i++) {
    const a = rnd() * 6.283, v = speed * (0.3 + rnd());
    sp.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: 0, life: 0.3 + rnd() * 0.45, col });
  }
}
export function fxUpdate(dt: number) {
  for (let i = sp.length - 1; i >= 0; i--) {
    const p = sp[i]; p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 1 - dt * 2.5; p.vy *= 1 - dt * 2.5;
    if (p.t >= p.life) { sp[i] = sp[sp.length - 1]; sp.pop(); }
  }
  for (let i = txt.length - 1; i >= 0; i--) { const f = txt[i]; f.t += dt; f.y -= dt * 26; if (f.t > 1.7) txt.splice(i, 1); }
}
export function fxDraw(c: CanvasRenderingContext2D, sx: number) {
  c.save(); c.globalCompositeOperation = "lighter";
  for (const p of sp) { c.globalAlpha = 1 - p.t / p.life; c.fillStyle = p.col; c.fillRect(p.x - 1.3, p.y - 1.3, 2.6, 2.6); }
  c.restore();
  c.font = `600 ${Math.round(15 / Math.max(sx, 0.5))}px ${SANS}`; c.textAlign = "center";
  for (const f of txt) {
    c.globalAlpha = Math.min(1, (1.7 - f.t) * 1.5);
    c.fillStyle = "rgba(0,0,0,.65)"; c.fillText(f.s, f.x + 1, f.y + 1);
    c.fillStyle = f.col; c.fillText(f.s, f.x, f.y);
  }
  c.globalAlpha = 1;
}
export function fxClear() { sp.length = 0; txt.length = 0; }

export interface Mech {
  reset(): void;
  update(s: any, dt: number, inp: Input): void;
  draw(c: CanvasRenderingContext2D, s: any, v: View, inp: Input): void;
  down?(s: any, inp: Input): void;
  up?(s: any, inp: Input): void;
  bot?(s: any, dt: number, inp: Input): void;
  cursor?(s: any, inp: Input): string;
}
