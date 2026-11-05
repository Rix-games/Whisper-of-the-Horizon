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
const verts: number[] = [], craters: [number, number, number][] = [];
(() => {
  let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 24; i++) verts.push(0.78 + rnd() * 0.17);
  for (let i = 0; i < 9; i++) craters.push([rnd() * 1.3 - 0.65, rnd() * 1.3 - 0.65, 0.05 + rnd() * 0.12]);
})();
let rot = 0, pulse = 0;
export function hitRock() { pulse = 1; }
export function drawRock(c: HTMLCanvasElement, dt: number) {
  if (!reduce) rot += dt * 0.05;
  pulse = Math.max(0, pulse - dt * 6);
  const x = c.getContext('2d')!, W = c.width, cx = W / 2, R0 = W * 0.42;
  x.clearRect(0, 0, W, W);
  const glow = x.createRadialGradient(cx, cx, R0 * 0.6, cx, cx, R0 * 1.25);
  glow.addColorStop(0, 'rgba(242,165,65,0.10)'); glow.addColorStop(1, 'rgba(242,165,65,0)');
  x.fillStyle = glow; x.fillRect(0, 0, W, W);
  x.save(); x.translate(cx, cx); const sc = 1 - pulse * 0.04; x.scale(sc, sc); x.rotate(rot);
  x.beginPath();
  verts.forEach((v, i) => { const a = (i / verts.length) * Math.PI * 2; const px = Math.cos(a) * v * R0, py = Math.sin(a) * v * R0; i ? x.lineTo(px, py) : x.moveTo(px, py); });
  x.closePath();
  const g = x.createRadialGradient(-R0 * 0.3, -R0 * 0.35, R0 * 0.1, 0, 0, R0);
  g.addColorStop(0, '#8a7464'); g.addColorStop(0.6, '#4c3e3a'); g.addColorStop(1, '#231d22');
  x.fillStyle = g; x.fill(); x.strokeStyle = 'rgba(208,141,92,0.5)'; x.lineWidth = 2; x.stroke(); x.clip();
  for (const [cx2, cy2, r] of craters) {
    x.beginPath(); x.arc(cx2 * R0, cy2 * R0, r * R0, 0, 7); x.fillStyle = 'rgba(20,14,18,0.45)'; x.fill();
    x.beginPath(); x.arc(cx2 * R0 - r * R0 * 0.15, cy2 * R0 - r * R0 * 0.15, r * R0 * 0.9, 0, 7); x.strokeStyle = 'rgba(255,220,180,0.10)'; x.lineWidth = 3; x.stroke();
  }
  for (let i = 0; i < 6; i++) { const a = i * 1.1 + 0.4, d = R0 * (0.25 + ((i * 37) % 50) / 100); x.fillStyle = i % 2 ? 'rgba(242,165,65,0.8)' : 'rgba(127,211,234,0.6)'; x.fillRect(Math.cos(a) * d, Math.sin(a) * d, 5, 5); }
  x.restore();
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
    x.fillStyle = s.visited[id] ? '#e1e4f4' : '#8b91b6';
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
