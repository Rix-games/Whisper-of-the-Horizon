// Uzly galaxie pro Kap. 3 (deterministicky ze semínka) – sdílí jádro i mechanika.
import { mulberry } from "./rng";

export interface GNode { i: number; x: number; y: number; stars: number; core: boolean; arm: number; home?: boolean; tw: number; }
let cache: GNode[] | null = null;
export const TOTAL_STARS = 1e11;

export function galaxyNodes(): GNode[] {
  if (cache) return cache;
  const r = mulberry(21), pts: GNode[] = [];
  for (let i = 0; i < 12000 && pts.length < 300; i++) {
    let x: number, y: number, arm = -1;
    if (r() < 0.1) { const a = r() * 6.283, d = Math.sqrt(r()) * 0.17; x = Math.cos(a) * d; y = Math.sin(a) * d; }
    else {
      arm = r() < 0.5 ? 0 : 1;
      const t = 0.12 + 0.85 * Math.pow(r(), 0.8), th = t * 9.5 + arm * Math.PI, rad = 0.1 + 0.86 * t, sc = 0.03 + 0.04 * t;
      x = Math.cos(th) * rad + (r() - 0.5) * sc * 2; y = Math.sin(th) * rad + (r() - 0.5) * sc * 2;
    }
    if (pts.some((p) => Math.hypot(p.x - x, p.y - y) < 0.042)) continue;
    pts.push({ i: pts.length, x, y, stars: 0, core: Math.hypot(x, y) < 0.2, arm, tw: r() * 6.28 });
  }
  // domov: rameno Persea, vnější část, vlevo
  let home = pts[0], bd = 9;
  for (const p of pts) { const d = Math.abs(Math.hypot(p.x, p.y) - 0.7) + Math.abs(p.x + 0.5) * 0.3; if (d < bd && p.x < 0) { bd = d; home = p; } }
  let sum = 0;
  for (const p of pts) {
    const dh = Math.hypot(p.x - home.x, p.y - home.y);
    p.stars = Math.pow(10, 4 + 5.2 * Math.pow(Math.min(1, dh / 1.5), 0.8) + r() * 0.7 + (p.core ? 0.9 : 0));
    if (p !== home) sum += p.stars;
  }
  for (const p of pts) if (p !== home) p.stars *= TOTAL_STARS / sum;
  home.stars = 1; home.home = true;
  // domov dej na index 0 kvůli ukládání
  pts.splice(pts.indexOf(home), 1); pts.unshift(home);
  pts.forEach((p, i) => (p.i = i));
  cache = pts;
  return pts;
}
