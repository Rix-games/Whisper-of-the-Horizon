// Kapitola 3 – Galaxie: svazek tlačí světelné plachty, kolonie se šíří, sondy a majáky.
import { Mech, Input, View, ftxt, sparks, MONO } from "./fx";
import { rnd, mulberry, angDiff } from "../core/rng";
import { power } from "../core/engine";
import { isOn, setOn, spreadMult, needOf, inZone, zoneR, T3 } from "../chapters/ch3";
import { galaxyNodes, GNode } from "../core/galaxy";
import { count } from "../core/format";
import type { State } from "../core/state";

export const GCX = 780, GCY = 500, RG = 600, TILT = 0.6;
const lv = (s: State, id: string) => s.b[id] || 0;
export const gsp = (n: { x: number; y: number }) => [GCX + n.x * RG, GCY + n.y * RG * TILT];
const need = (n: GNode) => needOf(n.stars);

let tex: HTMLCanvasElement | null = null, lit: HTMLCanvasElement | null = null, litKey = "";

export const galaxie: Mech & any = {
  threads: [] as any[], trails: [] as any[], beacons: [] as any[], beamOn: null as any, sweep: 0, hover: null as GNode | null, coreT: 0,
  reset() { this.threads = []; this.trails = []; this.beacons = []; this.beamOn = null; this.sweep = 0; },
  reachPx(s: State) { return RG * (T3.reach[0] + T3.reach[1] * lv(s, "reach")); },
  nearestOn(s: State, x: number, y: number) {
    let best: GNode | null = null, bd = 1e9;
    for (const n of galaxyNodes()) if (isOn(s, n.i)) { const p = gsp(n), d = Math.hypot(p[0] - x, p[1] - y); if (d < bd) { bd = d; best = n; } }
    return best || galaxyNodes()[0];
  },
  found(s: State, n: GNode, how: string) {
    setOn(s, n.i);
    if (how === "beam") this.sweep++;
    const p = gsp(n); sparks(p[0], p[1], how === "beam" ? 10 : 4, "#ffe2b0", 60);
  },
  beam(s: State, o: GNode, ang: number, len: number, pw: number, dt: number, how: string) {
    const op = gsp(o), half = 0.11;
    for (const n of galaxyNodes()) {
      if (isOn(s, n.i) || !inZone(s, n.i)) continue;
      const p = gsp(n), dx = p[0] - op[0], dy = p[1] - op[1], d = Math.hypot(dx, dy);
      if (d > len || d < 1) continue;
      if (Math.abs(angDiff(Math.atan2(dy, dx), ang)) > half + 6 / d) continue;
      s.prog[n.i] = (s.prog[n.i] || 0) + (dt * pw * (1 - (0.5 * d) / len)) / need(n);
      (n as any).heat = 1;
      if (s.prog[n.i] >= 1) this.found(s, n, how);
    }
  },
  down() { this.sweep = 0; },
  up(s: State, M: Input) {
    if (this.sweep > 1) { ftxt(M.x, M.y - 18, `Osídleno ${this.sweep} soustav`, "#ffd27a"); s.stats.sweeps++; }
    this.sweep = 0;
  },
  update(s: State, dt: number, M: Input) {
    const N = galaxyNodes(), P = power(s);
    for (const n of N) (n as any).heat = Math.max(0, ((n as any).heat || 0) - dt * 2);
    this.beamOn = null;
    if (M.down) {
      const o = this.nearestOn(s, M.x, M.y), op = gsp(o), pl = 1 + 0.6 * lv(s, "power");
      const len = Math.min(Math.hypot(M.x - op[0], M.y - op[1]), this.reachPx(s));
      const drain = T3.beamDrain * P * pl, ok = s.res.energy > 0;
      s.res.energy = Math.max(0, s.res.energy - drain * dt);
      const ang = Math.atan2(M.y - op[1], M.x - op[0]);
      this.beamOn = { o, ang, len, weak: !ok };
      this.beam(s, o, ang, len, pl * (ok ? 1 : 0.15), dt, "beam");
    }
    // přirozené šíření a sondy
    const pr = lv(s, "probe"), spreadR = RG * (0.1 + 0.03 * pr);
    const chance = (0.01 + 0.01 * lv(s, "spread")) * (1 + 1.5 * pr) * spreadMult(s);
    if (this.threads.length < 60) {
      for (const n of N) {
        if (!isOn(s, n.i) || rnd() > chance * dt * 10) continue;
        const p = gsp(n); let best: GNode | null = null, bd = spreadR;
        for (const m of N) {
          if (isOn(s, m.i) || (m as any).claim || !inZone(s, m.i)) continue;
          const q = gsp(m), d = Math.hypot(q[0] - p[0], q[1] - p[1]);
          if (d < bd && rnd() < 0.5) { bd = d; best = m; }
        }
        if (best) { (best as any).claim = n; this.threads.push({ a: n, b: best, fast: pr > 0 }); }
      }
    }
    for (const th of this.threads) {
      if (isOn(s, th.b.i)) { th.done = true; th.b.claim = null; continue; }
      const sp = (0.1 + 0.05 * lv(s, "spread")) * (1 + pr) * spreadMult(s);
      s.prog[th.b.i] = (s.prog[th.b.i] || 0) + (dt * sp) / need(th.b);
      if (s.prog[th.b.i] >= 1) {
        this.found(s, th.b, "spread"); th.done = true; th.b.claim = null;
        if (th.fast) { const a = gsp(th.a), b = gsp(th.b); this.trails.push({ ax: a[0], ay: a[1], bx: b[0], by: b[1], t: 0 }); }
      }
    }
    this.threads = this.threads.filter((t: any) => !t.done);
    // automatické majáky (vidět až 16, každý zastupuje víc)
    const nb = lv(s, "beacon"), vb = Math.min(nb, 16), kb = nb > 16 ? nb / 16 : 1;
    while (this.beacons.length < vb) this.beacons.push({ n: null, t: 0, ang: null, base: 0 });
    for (const b of this.beacons) {
      if (!b.n || !isOn(s, b.n.i)) { const on = N.filter((n) => isOn(s, n.i)); b.n = on[(rnd() * on.length) | 0]; b.base = rnd() * 6.28; b.t = 0; }
      b.t += dt; b.ang = b.base + Math.sin(b.t * 0.35) * 1.1;
      this.beam(s, b.n, b.ang, this.reachPx(s) * 0.85, (0.5 + 0.1 * lv(s, "power")) * Math.sqrt(kb), dt, "auto");
      if (b.t > 14) b.n = null;
    }
    for (const t of this.trails) t.t += dt;
    this.trails = this.trails.filter((t: any) => t.t < 1.2);
    if (s.r.sgra) this.coreT += dt;
    this.hover = null;
    for (const n of N) { const p = gsp(n); if (Math.hypot(M.x - p[0], M.y - p[1]) < 12) { this.hover = n; break; } }
  },
  bot(s: State, dt: number, M: Input) {
    if (s.res.energy < power(s) * 4) { if (M.down) { M.down = false; this.up(s, M); } return; }
    if (!this.botT || this.botT.done || isOn(s, this.botT.n.i)) {
      // nejlepší dostupná soustava: hvězdy / náročnost
      let best = null, bv = 0;
      const reach = this.reachPx(s);
      for (const n of galaxyNodes()) {
        if (isOn(s, n.i) || !inZone(s, n.i)) continue;
        const o = this.nearestOn(s, gsp(n)[0], gsp(n)[1]), d = Math.hypot(gsp(n)[0] - gsp(o)[0], gsp(n)[1] - gsp(o)[1]);
        if (d > reach) continue;
        const v = n.stars / need(n);
        if (v > bv) { bv = v; best = n; }
      }
      this.botT = best ? { n: best } : null;
    }
    if (!this.botT) { if (M.down) { M.down = false; this.up(s, M); } return; }
    const p = gsp(this.botT.n); M.px = M.x; M.py = M.y; M.x = p[0] + 3; M.y = p[1] + 3;
    if (!M.down) { M.down = true; this.down(s, M); }
  },
  cursor() { return "crosshair"; },

  draw(c: CanvasRenderingContext2D, s: State, v: View, M: Input) {
    const N = galaxyNodes(), T = v.T;
    if (!tex) tex = spiralTex(1400, 21);
    c.save(); c.globalAlpha = 0.78; c.translate(GCX, GCY); c.scale(1, TILT);
    c.drawImage(tex, -1.05 * RG, -1.05 * RG, 2.1 * RG, 2.1 * RG); c.restore();
    if (litKey !== s.col) { renderLit(s); litKey = s.col; }
    if (lit) { c.save(); c.globalCompositeOperation = "lighter"; c.drawImage(lit, 0, 0, 1600, 1000); c.restore(); }
    // Sgr A*
    const cp = [GCX, GCY];
    const cg = c.createRadialGradient(cp[0], cp[1], 0, cp[0], cp[1], 26);
    cg.addColorStop(0, "rgba(255,240,210,.55)"); cg.addColorStop(1, "rgba(255,200,140,0)");
    c.fillStyle = cg; c.beginPath(); c.arc(cp[0], cp[1], 26, 0, 7); c.fill();
    if (s.r.sgra) {
      const k = Math.min(1, this.coreT / 3), L = RG * 0.6 * k;
      c.save(); c.globalCompositeOperation = "lighter";
      for (const sd of [-1, 1]) {
        const jg = c.createLinearGradient(GCX, GCY, GCX, GCY + sd * L);
        jg.addColorStop(0, "rgba(200,220,255,.75)"); jg.addColorStop(1, "rgba(120,160,255,0)");
        c.fillStyle = jg; c.beginPath(); c.moveTo(GCX - 3, GCY); c.lineTo(GCX - 11 - 4 * Math.sin(T * 2), GCY + sd * L); c.lineTo(GCX + 11 + 4 * Math.sin(T * 2), GCY + sd * L); c.lineTo(GCX + 3, GCY); c.fill();
      }
      c.restore();
    }
    c.save(); c.globalCompositeOperation = "lighter";
    for (const th of this.threads) {
      const a = gsp(th.a), b = gsp(th.b), k = Math.min(1, s.prog[th.b.i] || 0);
      c.strokeStyle = `rgba(255,215,160,${0.12 + 0.2 * k})`; c.lineWidth = 1;
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); c.stroke();
    }
    for (const tr of this.trails) {
      const k = tr.t / 1.2, f = Math.min(1, k * 1.6), x = tr.ax + (tr.bx - tr.ax) * f, y = tr.ay + (tr.by - tr.ay) * f;
      c.strokeStyle = `rgba(190,240,255,${(1 - k) * 0.6})`; c.lineWidth = 1.4;
      c.beginPath(); c.moveTo(tr.ax, tr.ay); c.lineTo(x, y); c.stroke();
    }
    c.restore();
    for (const n of N) {
      if (n.home) continue;
      const p = gsp(n), on = isOn(s, n.i);
      if (on) { c.fillStyle = "rgba(255,225,170,.95)"; c.beginPath(); c.arc(p[0], p[1], 2.2, 0, 7); c.fill(); continue; }
      const tw = (inZone(s, n.i) ? 0.45 : 0.22) + 0.12 * Math.sin(T * 0.8 + n.tw), h = (n as any).heat || 0;
      c.fillStyle = `rgba(225,232,255,${tw + 0.4 * h})`; c.beginPath(); c.arc(p[0], p[1], 1.6, 0, 7); c.fill();
      const pg = s.prog[n.i] || 0;
      if (pg > 0.02) { c.strokeStyle = "rgba(255,210,150,.75)"; c.lineWidth = 1.5; c.beginPath(); c.arc(p[0], p[1], 6, -1.57, -1.57 + 6.283 * pg); c.stroke(); }
    }
    const drawBeam = (o: GNode, ang: number, len: number, a: number, col: string) => {
      const op = gsp(o), half = 0.11;
      c.save(); c.globalCompositeOperation = "lighter";
      const bg = c.createRadialGradient(op[0], op[1], 0, op[0], op[1], len);
      bg.addColorStop(0, `rgba(${col},${0.32 * a})`); bg.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = bg; c.beginPath(); c.moveTo(op[0], op[1]); c.arc(op[0], op[1], len, ang - half, ang + half); c.closePath(); c.fill();
      c.strokeStyle = `rgba(${col},${0.45 * a})`; c.lineWidth = 1;
      c.beginPath(); c.moveTo(op[0], op[1]); c.lineTo(op[0] + Math.cos(ang) * len, op[1] + Math.sin(ang) * len); c.stroke();
      c.restore();
    };
    for (const b of this.beacons) if (b.n && b.ang != null) drawBeam(b.n, b.ang, this.reachPx(s) * 0.85, 0.55, "150,230,255");
    if (this.beamOn && !v.passive) drawBeam(this.beamOn.o, this.beamOn.ang, this.beamOn.len, this.beamOn.weak ? 0.3 : 1, "255,215,150");
    // hranice dosahu sond (roste se stadiem)
    if (zoneR(s) < 2) {
      const h = N[0], r = zoneR(s);
      c.save(); c.strokeStyle = "rgba(142,240,200,.22)"; c.setLineDash([4, 8]); c.lineWidth = 1.2;
      c.beginPath(); c.ellipse(GCX + h.x * RG, GCY + h.y * RG * TILT, r * RG, r * RG * TILT, 0, 0, 7); c.stroke(); c.restore();
    }
    // domov: díra po Aldře
    const hp = gsp(N[0]);
    const dg = c.createRadialGradient(hp[0], hp[1], 2, hp[0], hp[1], 16);
    dg.addColorStop(0, "rgba(0,0,0,1)"); dg.addColorStop(0.4, "rgba(255,170,90,.6)"); dg.addColorStop(1, "rgba(255,120,60,0)");
    c.fillStyle = dg; c.beginPath(); c.arc(hp[0], hp[1], 16, 0, 7); c.fill();
    c.fillStyle = "#000"; c.beginPath(); c.arc(hp[0], hp[1], 3.5, 0, 7); c.fill();
    if (v.passive) return;
    if (!M.down && M.inside) {
      const o = this.nearestOn(s, M.x, M.y), op = gsp(o);
      c.strokeStyle = "rgba(255,215,150,.12)"; c.setLineDash([2, 7]); c.lineWidth = 1;
      c.beginPath(); c.arc(op[0], op[1], this.reachPx(s), 0, 7); c.stroke(); c.setLineDash([]);
    }
    if (this.hover && !this.hover.home) {
      const n = this.hover, p = gsp(n), on = isOn(s, n.i);
      const t1 = `${count(n.stars)} hvězd`, t2 = on ? "Osídleno" : `Osídlení ${Math.round((s.prog[n.i] || 0) * 100)} %`;
      const fs = 13 / Math.max(v.sx, 0.5);
      c.font = `${fs}px ${MONO}`; c.textAlign = "left";
      const w = Math.max(c.measureText(t1).width, c.measureText(t2).width) + fs * 1.2;
      c.fillStyle = "rgba(10,12,20,.88)"; c.fillRect(p[0] + 12, p[1] - fs * 2.9, w, fs * 2.8);
      c.fillStyle = "#d9dfec"; c.fillText(t1, p[0] + 12 + fs * 0.6, p[1] - fs * 1.65); c.fillStyle = "#ffd27a"; c.fillText(t2, p[0] + 12 + fs * 0.6, p[1] - fs * 0.45);
    }
  },
};

function renderLit(s: State) {
  if (!lit) { lit = document.createElement("canvas"); lit.width = 1600; lit.height = 1000; }
  const c = lit.getContext("2d")!; c.clearRect(0, 0, 1600, 1000); c.globalCompositeOperation = "lighter";
  for (const n of galaxyNodes()) {
    if (!isOn(s, n.i) || n.home) continue;
    const p = gsp(n), rad = 8 + 5 * Math.log10(n.stars / 1e3 + 1), a = 0.3;
    const gr = c.createRadialGradient(p[0], p[1], 0, p[0], p[1], rad);
    gr.addColorStop(0, `rgba(255,205,135,${a})`); gr.addColorStop(1, "rgba(255,170,90,0)");
    c.fillStyle = gr; c.beginPath(); c.arc(p[0], p[1], rad, 0, 7); c.fill();
  }
}

/** Textura spirální galaxie (sdílí i pohledy). */
export function spiralTex(S: number, seed: number, o: any = {}) {
  const cv = document.createElement("canvas"); cv.width = cv.height = S;
  const g = cv.getContext("2d")!, r = mulberry(seed), R = S / 2, k = S / 600;
  g.translate(R, R); g.globalCompositeOperation = "lighter";
  let gr = g.createRadialGradient(0, 0, 0, 0, 0, R * 0.38);
  gr.addColorStop(0, "rgba(255,228,175,.95)"); gr.addColorStop(0.35, "rgba(255,190,120,.35)"); gr.addColorStop(1, "rgba(255,170,100,0)");
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, R * 0.38, 0, 7); g.fill();
  gr = g.createRadialGradient(0, 0, R * 0.1, 0, 0, R);
  gr.addColorStop(0, "rgba(120,140,220,.16)"); gr.addColorStop(1, "rgba(60,70,140,0)");
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, R, 0, 7); g.fill();
  const arms = o.arms || 2, cnt = o.n || 11000, wind = o.wind || 9.5;
  // prachové pásy (tmavé) pod hvězdami
  g.globalCompositeOperation = "source-over";
  for (let i = 0; i < cnt * 0.25; i++) {
    const a = i % arms, t = 0.15 + 0.8 * Math.pow(r(), 0.9), th = t * wind + (a * 6.283) / arms - 0.12, rad = R * (0.1 + 0.86 * t);
    g.fillStyle = "rgba(10,6,14,.10)"; const sz = (r() * 3 + 1) * k; g.fillRect(Math.cos(th) * rad, Math.sin(th) * rad, sz, sz);
  }
  g.globalCompositeOperation = "lighter";
  for (let i = 0; i < cnt; i++) {
    const a = i % arms, t = 0.12 + 0.85 * Math.pow(r(), 0.8), th = t * wind + (a * 6.283) / arms, rad = R * (0.1 + 0.86 * t), sc = R * (0.035 + 0.05 * t);
    const x = Math.cos(th) * rad + (r() - 0.5) * sc * 2 * r(), y = Math.sin(th) * rad + (r() - 0.5) * sc * 2 * r();
    const h = r(); g.fillStyle = h < 0.05 ? "rgba(255,120,170,.85)" : h < 0.55 ? "rgba(165,195,255,.55)" : "rgba(255,240,220,.42)";
    const sz = (r() * 1.2 + 0.35) * k * (o.dot || 1); g.fillRect(x, y, sz, sz);
  }
  for (let i = 0; i < cnt * 0.3; i++) {
    const a = r() * 6.283, d = Math.abs((r() + r() + r()) / 3 - 0.5) * 2 * R * 0.32;
    g.fillStyle = "rgba(255,215,160,.45)"; const sz = (r() * 1.1 + 0.4) * k * (o.dot || 1); g.fillRect(Math.cos(a) * d, Math.sin(a) * d, sz, sz);
  }
  return cv;
}
