// Kapitola 1 – Kámen: řezání žil laserem, drony, montážní dok.
import { Mech, Input, View, ftxt, sparks, MONO } from "./fx";
import { rnd, mulberry, segDist } from "../core/rng";
import { gain } from "../core/bus";
import { oreMult, handMult, richChance, layerIdx } from "../chapters/ch1";
import { T1 } from "../chapters/ch1";

// barvy žil podle vrstvy (hloubky)
const LAYERS = [
  { c: [255, 160, 70], rich: [130, 235, 255] },
  { c: [255, 120, 80], rich: [150, 255, 210] },
  { c: [235, 200, 120], rich: [170, 200, 255] },
  { c: [210, 225, 240], rich: [255, 170, 230] },
  { c: [190, 150, 255], rich: [140, 255, 240] },
];
import { fmtOre } from "./util";
import { img } from "../ui/img";
import type { State } from "../core/state";

const CX = 760, CY = 470, RA = 270;
const PX = CX - RA * 1.72, PY = CY + RA * 0.62;
const VIS_DRONES = 60;

interface Vein { pts: number[][]; cut: number[]; cs: number[]; claim: any[]; fade: number; dead: number; val: number; rich: boolean; ph: number; }
interface Chunk { x: number; y: number; vx: number; vy: number; t: number; val: number; s: number; r: number; rich: boolean; done?: boolean; }
interface Drone { x: number; y: number; ph: number; ang: number; tgt: { v: Vein; i: number } | null; prog: number; aim: number[] | null; cutting?: boolean; }

const harm = (() => { const r = mulberry(11); return [[2, 0.07], [3, 0.05], [5, 0.035], [7, 0.02], [11, 0.012], [17, 0.006]].map(([k, a]) => ({ k, a, p: r() * 6.28 })); })();
const rr = (t: number) => { let v = 1; for (const h of harm) v += h.a * Math.sin(h.k * t + h.p); return v; };
const lv = (s: State, id: string) => s.b[id] || 0;

let tex: HTMLCanvasElement | null = null;

export const kamen: Mech & any = {
  veins: [] as Vein[], chunks: [] as Chunk[], drones: [] as Drone[],
  rot: 0, rt: 0, heat: 0, over: false, stroke: null as any, spawnT: 0, pop: 0, flash: 0,
  reset() {
    this.veins = []; this.chunks = []; this.drones = []; this.heat = 0; this.over = false; this.stroke = null;
    for (let i = 0; i < 3; i++) this.addVein(true, null);
  },
  maxVeins(s: State) { return 3 + lv(s, "find") + Math.floor(Math.min(lv(s, "drone"), VIS_DRONES) / 3); },
  addVein(instant: boolean, s: State | null) {
    let a = rnd() * 6.28, d = rnd() * 0.5, x = Math.cos(a) * d, y = Math.sin(a) * d, dir = rnd() * 6.28;
    const pts = [[x, y]], cnt = 5 + ((rnd() * 4) | 0);
    for (let i = 0; i < cnt; i++) {
      dir += (rnd() - 0.5) * 1.1; const st = 0.09 + rnd() * 0.05;
      let nx = x + Math.cos(dir) * st, ny = y + Math.sin(dir) * st;
      if (Math.hypot(nx, ny) > rr(Math.atan2(ny, nx)) * 0.7) { dir += Math.PI * 0.75; nx = x + Math.cos(dir) * 0.08; ny = y + Math.sin(dir) * 0.08; }
      x = nx; y = ny; pts.push([x, y]);
    }
    const rich = rnd() < (s ? richChance(s) : 0.18), m = pts.length - 1;
    this.veins.push({ pts, cut: Array(m).fill(0), cs: Array(m).fill(-1), claim: Array(m).fill(null), fade: instant ? 1 : 0, dead: 0, val: rich ? 3 : 1, rich, ph: rnd() * 6 });
  },
  wp(p: number[]) { const c = Math.cos(this.rot), sn = Math.sin(this.rot); return [CX + (p[0] * c - p[1] * sn) * RA, CY + (p[0] * sn + p[1] * c) * RA]; },
  spawnChunks(x: number, y: number, val: number, cnt: number, rich: boolean) {
    const a0 = Math.atan2(y - CY, x - CX);
    for (let k = 0; k < cnt; k++) {
      const a = a0 + (rnd() - 0.5) * 1.4, v = 60 + rnd() * 90;
      if (this.chunks.length > 260) { this.chunks[0].val += val / cnt; continue; }
      this.chunks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: 0, val: val / cnt, s: 2.4 + rnd() * 2.6, r: rnd() * 6, rich });
    }
  },
  cutSeg(s: State, v: Vein, i: number, src: "hand" | "drone", k = 1) {
    if (v.cut[i]) return; v.cut[i] = 1;
    s.stats.cuts++;
    const a = this.wp(v.pts[i]), b = this.wp(v.pts[i + 1]), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    let val = v.val * oreMult(s);
    if (src === "hand") {
      const st = this.stroke; st.chain++; v.cs[i] = st.id; val *= handMult(s) * (1 + Math.min(st.chain, 30) * 0.05);
      if (v.cut.every((x) => x) && v.cs.every((x) => x === st.id)) {
        st.full++; s.stats.full++;
        if (st.full > s.best.chainHand) s.best.chainHand = st.full;
        const bonus = v.val * oreMult(s) * handMult(s) * v.cut.length * (st.full > 1 ? 1 + 0.5 * Math.min(st.full - 1, 6) : 1);
        this.spawnChunks(mx, my, bonus, 4, true);
        ftxt(mx, my - 16, st.full > 1 ? `Řetěz ${st.full} žil!` : "Celá žíla ×2", "#ffd27a");
        this.flash = 0.3; sparks(mx, my, 24, "#ffe2a8", 220);
      }
    } else val *= T1.drone * k;
    this.spawnChunks(mx, my, val, 2, v.rich);
    sparks(mx, my, src === "hand" ? 10 : 4, v.rich ? "#9ff3ff" : "#ffb766", 140);
  },
  down(s: State) { if (!this.over) this.stroke = { id: rnd(), chain: 0, full: 0 }; },
  up() { this.stroke = null; },
  update(s: State, dt: number, M: Input) {
    this.rt += dt; this.rot = 0.07 * Math.sin(this.rt * 0.05);   // jen jemné kolébání – stín na obrázku zůstává na odvrácené straně this.pop = Math.max(0, this.pop - dt); this.flash = Math.max(0, this.flash - dt);
    const laser = M.down && !this.over && this.stroke;
    const L = lv(s, "cool"), hr = 0.3 * Math.pow(0.8, L), cr = 0.42 * Math.pow(1.25, L);
    if (laser) {
      this.heat += hr * dt;
      if (this.heat >= 1) { this.heat = 1; this.over = true; this.stroke = null; ftxt(PX, PY - 40, "Přehřátí!", "#ff6b5a"); }
    } else this.heat = Math.max(0, this.heat - cr * dt);
    if (this.over && this.heat < 0.3) this.over = false;
    if (laser) {
      const bw = 6 + lv(s, "beam") * 3.5, dx = M.x - M.px, dy = M.y - M.py, steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 3));
      for (let k = 0; k <= steps; k++) {
        const x = M.px + (dx * k) / steps, y = M.py + (dy * k) / steps;
        for (const v of this.veins) {
          if (v.fade < 1 || v.dead) continue;
          for (let i = 0; i < v.cut.length; i++) {
            if (v.cut[i]) continue;
            const a = this.wp(v.pts[i]), b = this.wp(v.pts[i + 1]);
            if (segDist(x, y, a[0], a[1], b[0], b[1]) < bw) this.cutSeg(s, v, i, "hand");
          }
        }
      }
      if (rnd() < 0.4) sparks(M.x, M.y, 1, "#ffcc88", 70);
    }
    for (const v of this.veins) { v.fade = Math.min(1, v.fade + dt * 1.5); if (v.cut.every((x) => x)) v.dead += dt; }
    this.veins = this.veins.filter((v) => v.dead < 0.9);
    this.spawnT -= dt;
    const nd = lv(s, "drone");
    if (this.veins.length < this.maxVeins(s) && this.spawnT <= 0) { this.addVein(false, s); this.spawnT = Math.max(0.12, 1.3 / (1 + Math.min(nd, VIS_DRONES) / 5)); }
    // úlomky letí na plošinu
    const acc = 380 + lv(s, "magnet") * 420;
    for (const c of this.chunks) {
      c.t += dt; c.r += dt * 3; c.x += c.vx * dt; c.y += c.vy * dt;
      if (c.t > 0.4) {
        const dx = PX - c.x, dy = PY - c.y, d = Math.hypot(dx, dy) || 1;
        c.vx += (dx / d) * acc * dt; c.vy += (dy / d) * acc * dt; c.vx *= 1 - dt * 1.4; c.vy *= 1 - dt * 1.4;
        if (d < 16 || c.t > 6) { c.done = true; gain(s, "ore", c.val); this.pop = 0.18; }
      } else { c.vx *= 1 - dt * 2; c.vy *= 1 - dt * 2; }
    }
    this.chunks = this.chunks.filter((c) => !c.done);
    // drony (vidět max. 60, každý pak zastupuje víc dronů)
    const want = Math.min(nd, VIS_DRONES);
    while (this.drones.length < want) this.addDrone(this.drones.length > 0);
    if (this.drones.length > want) this.drones.length = want;
    const k = nd > VIS_DRONES ? nd / VIS_DRONES : 1;
    const sp = 90 * Math.pow(1.3, lv(s, "dspeed"));
    for (const d of this.drones) {
      if (d.tgt) { const { v, i } = d.tgt; if (!this.veins.includes(v) || v.cut[i]) { v.claim[i] = null; d.tgt = null; d.prog = 0; } }
      if (!d.tgt) {
        let best = null, bd = 1e9;
        for (const v of this.veins) {
          if (v.fade < 1) continue;
          for (let i = 0; i < v.cut.length; i++) {
            if (v.cut[i] || v.claim[i]) continue;
            const a = this.wp(v.pts[i]), b = this.wp(v.pts[i + 1]), dd = Math.hypot((a[0] + b[0]) / 2 - d.x, (a[1] + b[1]) / 2 - d.y);
            if (dd < bd) { bd = dd; best = { v, i }; }
          }
        }
        if (best) { d.tgt = best; best.v.claim[best.i] = d; d.prog = 0; }
      }
      let tx: number, ty: number;
      if (d.tgt) {
        const a = this.wp(d.tgt.v.pts[d.tgt.i]), b = this.wp(d.tgt.v.pts[d.tgt.i + 1]);
        d.aim = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; tx = d.aim[0] + Math.cos(d.ph) * 18; ty = d.aim[1] + Math.sin(d.ph) * 18;
      } else { d.ph += dt * 0.8; d.aim = null; tx = PX + Math.cos(d.ph) * 46; ty = PY + Math.sin(d.ph) * 28; }
      const dx = tx - d.x, dy = ty - d.y, dist = Math.hypot(dx, dy);
      if (dist > 2) { const m = Math.min(dist, sp * dt); d.x += (dx / dist) * m; d.y += (dy / dist) * m; d.ang = Math.atan2(dy, dx); }
      d.cutting = !!(d.tgt && dist < 12);
      if (d.cutting) {
        d.prog += dt * (0.8 + 0.18 * lv(s, "dspeed"));
        if (d.prog >= 1) { const { v, i } = d.tgt!; v.claim[i] = null; d.tgt = null; this.cutSeg(s, v, i, "drone", k); }
      }
    }
  },
  addDrone(fromDock: boolean) {
    this.drones.push({ x: PX, y: PY, ph: rnd() * 6.28, ang: 0, tgt: null, prog: 0, aim: null });
    sparks(PX, PY, 14, "#8ef0c8", 110);
  },
  // ---- bot pro simulaci: táhne laser po nejbližší žíle, hlídá teplotu ----
  bot(s: State, dt: number, M: Input) {
    M.px = M.x; M.py = M.y;
    if (this.over || this.heat > 0.88) { if (M.down) { M.down = false; this.up(); } return; }
    if (!M.down && this.heat > 0.25 && this.botRest) return;
    this.botRest = false;
    let tgt = null, bd = 1e9;
    for (const v of this.veins) {
      if (v.fade < 1 || v.dead) continue;
      for (let i = 0; i < v.cut.length; i++) {
        if (v.cut[i]) continue;
        const a = this.wp(v.pts[i]), b = this.wp(v.pts[i + 1]), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dd = Math.hypot(mx - M.x, my - M.y);
        if (dd < bd) { bd = dd; tgt = [mx, my]; }
      }
    }
    if (!tgt) { if (M.down) { M.down = false; this.up(); } return; }
    if (!M.down) { M.down = true; M.x = tgt[0]; M.y = tgt[1]; M.px = M.x; M.py = M.y; this.down(s); return; }
    const step = 700 * dt, dx = tgt[0] - M.x, dy = tgt[1] - M.y, d = Math.hypot(dx, dy) || 1;
    M.x += (dx / d) * Math.min(step, d); M.y += (dy / d) * Math.min(step, d);
    if (this.heat > 0.8) this.botRest = true;
  },
  cursor() { return "crosshair"; },

  // ---------- kresba ----------
  draw(c: CanvasRenderingContext2D, s: State, v: View, M: Input) {
    if (!tex) tex = makeTex();
    const T = v.T, li = layerIdx(s), lay = LAYERS[li];
    // světlo Aldry zleva shora (modrobílé)
    const sun = c.createRadialGradient(-200, -300, 0, -200, -300, 1500);
    sun.addColorStop(0, "rgba(150,190,255,.20)"); sun.addColorStop(1, "rgba(150,190,255,0)");
    c.fillStyle = sun; c.fillRect(-400, -400, 2400, 1800);
    drawGens(c, s, T, false);
    const halo = c.createRadialGradient(CX, CY, RA * 0.8, CX, CY, RA * 1.6);
    halo.addColorStop(0, `rgba(170,200,255,${0.05 + this.flash * 0.3})`); halo.addColorStop(1, "rgba(170,200,255,0)");
    c.fillStyle = halo; c.beginPath(); c.arc(CX, CY, RA * 1.6, 0, 7); c.fill();
    const A = img("asteroid");
    if (A) {   // obrázek z Gemini: velikost podle šířky, mírně větší než herní obrys
      const w = RA * 2.18, h = (w * A.height) / A.width;
      c.save(); c.translate(CX, CY); c.rotate(this.rot); c.drawImage(A, -w / 2, -h / 2, w, h); c.restore();
    } else { c.save(); c.translate(CX, CY); c.rotate(this.rot); c.drawImage(tex, -1.2 * RA, -1.2 * RA, 2.4 * RA, 2.4 * RA); c.restore(); }
    c.save(); path(c, this.rot); c.clip();
    // hlubší vrstvy – teplejší odstín horniny
    if (li > 0 && !A) { c.fillStyle = `rgba(${lay.c[0]},${lay.c[1]},${lay.c[2]},${0.03 + li * 0.025})`; c.fillRect(CX - RA * 1.3, CY - RA * 1.3, RA * 2.6, RA * 2.6); }
    if (!A) {
      const lg = c.createLinearGradient(CX - RA * 0.9, CY - RA * 0.9, CX + RA * 0.8, CY + RA * 0.8);
      lg.addColorStop(0, "rgba(200,220,255,.22)"); lg.addColorStop(0.45, "rgba(0,0,0,0)"); lg.addColorStop(1, "rgba(0,0,12,.82)");
      c.fillStyle = lg; c.fillRect(CX - RA * 1.3, CY - RA * 1.3, RA * 2.6, RA * 2.6);
    }
    drawFields(c, s, T, this.rot);
    c.lineCap = "round"; c.lineJoin = "round";
    for (const vn of this.veins) {
      const al = vn.fade * (1 - vn.dead / 0.9), pul = 0.75 + 0.25 * Math.sin(T * 3 + vn.ph), col = vn.rich ? lay.rich : lay.c;
      for (let i = 0; i < vn.cut.length; i++) {
        const a = this.wp(vn.pts[i]), b = this.wp(vn.pts[i + 1]);
        c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]);
        if (vn.cut[i]) { c.strokeStyle = `rgba(15,8,4,${0.7 * al})`; c.lineWidth = 3.5; c.stroke(); continue; }
        c.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.2 * al * pul})`; c.lineWidth = 12; c.stroke();
        c.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${al})`; c.lineWidth = 3.4; c.stroke();
        c.strokeStyle = `rgba(255,250,232,${0.85 * al * pul})`; c.lineWidth = 1.1; c.stroke();
      }
    }
    c.restore();
    if (!A) { c.save(); path(c, this.rot); c.strokeStyle = "rgba(200,215,255,.14)"; c.lineWidth = 1.5; c.stroke(); c.restore(); }
    drawGens(c, s, T, true);
    for (const ch of this.chunks) {
      c.save(); c.translate(ch.x, ch.y); c.rotate(ch.r);
      c.fillStyle = ch.rich ? `rgb(${lay.rich.join(",")})` : "#c9a27a"; c.fillRect(-ch.s / 2, -ch.s / 2, ch.s, ch.s * 0.8); c.restore();
    }
    for (const d of this.drones) {
      if (d.cutting && d.aim) {
        c.strokeStyle = "rgba(142,240,200,.75)"; c.lineWidth = 1.3; c.beginPath(); c.moveTo(d.x, d.y); c.lineTo(d.aim[0], d.aim[1]); c.stroke();
        c.fillStyle = "rgba(200,255,235,.9)"; c.beginPath(); c.arc(d.aim[0], d.aim[1], 2 + rnd() * 1.5, 0, 7); c.fill();
      }
      const D = img("drone");
      if (D) { c.save(); c.translate(d.x, d.y); c.rotate(d.ang); c.drawImage(D, -16, -16, 32, 32); c.restore(); continue; }
      c.save(); c.translate(d.x, d.y); c.rotate(d.ang);
      c.fillStyle = "#cfd8ea"; c.beginPath(); c.moveTo(7, 0); c.lineTo(-5, -4); c.lineTo(-2.5, 0); c.lineTo(-5, 4); c.closePath(); c.fill();
      c.fillStyle = "#8ef0c8"; c.fillRect(-6.5, -1, 2.2, 2); c.restore();
    }
    drawPlat(c, s, this);
    if (v.passive) return;
    if (M.down && !this.over && this.stroke) {
      const bw = 6 + lv(s, "beam") * 3.5, fl = 0.93 + 0.07 * Math.sin(v.T * 47);
      c.save(); c.globalCompositeOperation = "lighter"; c.lineCap = "round";
      c.strokeStyle = `rgba(255,130,50,${0.16 * fl})`; c.lineWidth = bw * 1.8; c.beginPath(); c.moveTo(PX + 12, PY - 5); c.lineTo(M.x, M.y); c.stroke();
      c.strokeStyle = `rgba(255,225,180,${0.9 * fl})`; c.lineWidth = 1.8; c.stroke();
      const gr = c.createRadialGradient(M.x, M.y, 0, M.x, M.y, bw * 2.4); gr.addColorStop(0, "rgba(255,240,210,.9)"); gr.addColorStop(1, "rgba(255,140,60,0)");
      c.fillStyle = gr; c.beginPath(); c.arc(M.x, M.y, bw * 2.4, 0, 7); c.fill(); c.restore();
    }
    if (M.inside || M.down) {
      c.lineWidth = 2.5; c.strokeStyle = "rgba(255,255,255,.08)"; c.beginPath(); c.arc(M.x, M.y, 16, 0, 7); c.stroke();
      c.strokeStyle = this.over ? "#ff6b5a" : this.heat > 0.7 ? "#ffb35c" : "#8ef0c8";
      c.beginPath(); c.arc(M.x, M.y, 16, -Math.PI / 2, -Math.PI / 2 + this.heat * 6.283); c.stroke();
    }
  },
};

function path(c: CanvasRenderingContext2D, rot: number) {
  c.beginPath();
  for (let i = 0; i <= 100; i++) {
    const t = (i / 100) * 6.2832, r = rr(t) * RA, a = t + rot, x = CX + Math.cos(a) * r, y = CY + Math.sin(a) * r;
    i ? c.lineTo(x, y) : c.moveTo(x, y);
  }
  c.closePath();
}
function makeTex() {
  const S = Math.ceil(RA * 2.4 * 1.5), cv = document.createElement("canvas"); cv.width = cv.height = S;
  const g = cv.getContext("2d")!, k = S / 2.4; g.translate(S / 2, S / 2); g.scale(k, k);
  g.beginPath();
  for (let i = 0; i <= 160; i++) { const t = (i / 160) * 6.2832, r = rr(t); i ? g.lineTo(Math.cos(t) * r, Math.sin(t) * r) : g.moveTo(Math.cos(t) * r, Math.sin(t) * r); }
  g.closePath();
  const gr = g.createRadialGradient(-0.25, -0.25, 0.1, 0, 0, 1.15); gr.addColorStop(0, "#8a8278"); gr.addColorStop(1, "#3e3a38");
  g.fillStyle = gr; g.fill(); g.save(); g.clip();
  const r = mulberry(5);
  for (let i = 0; i < 1400; i++) {
    const a = r() * 6.28, d = Math.sqrt(r()) * 1.1;
    g.fillStyle = r() < 0.55 ? "rgba(0,0,0,.17)" : "rgba(235,240,255,.07)";
    g.beginPath(); g.arc(Math.cos(a) * d, Math.sin(a) * d, r() * 0.03 + 0.004, 0, 7); g.fill();
  }
  for (let i = 0; i < 26; i++) {
    const a = r() * 6.28, d = Math.sqrt(r()) * 0.9, x = Math.cos(a) * d, y = Math.sin(a) * d, sz = r() * 0.13 + 0.025;
    g.fillStyle = "rgba(14,12,14,.35)"; g.beginPath(); g.arc(x, y, sz, 0, 7); g.fill();
    g.strokeStyle = "rgba(220,230,255,.11)"; g.lineWidth = sz * 0.25; g.beginPath(); g.arc(x + sz * 0.08, y + sz * 0.08, sz * 0.92, 0, 7); g.stroke();
  }
  g.restore();
  return cv;
}
function drawPlat(c: CanvasRenderingContext2D, s: State, m: any) {
  c.save(); c.translate(PX, PY);
  const P = img("platform");
  if (P) {
    const w = 150, h = (w * P.height) / P.width;
    c.drawImage(P, -w / 2, -h / 2 - 6, w, h);
    c.globalCompositeOperation = "lighter";
    const g = c.createRadialGradient(0, -8, 0, 0, -8, 12 + m.pop * 40);
    g.addColorStop(0, `rgba(255,220,160,${0.25 + m.pop * 3})`); g.addColorStop(1, "rgba(255,200,140,0)");
    c.fillStyle = g; c.beginPath(); c.arc(0, -8, 12 + m.pop * 40, 0, 7); c.fill();
    c.globalCompositeOperation = "source-over";
  }
  for (const sd of P ? [] : [-1, 1]) {
    const x0 = sd > 0 ? 16 : -48;
    c.fillStyle = "#132a4a"; c.fillRect(x0, -7, 32, 14); c.strokeStyle = "#3d5578"; c.lineWidth = 1; c.strokeRect(x0, -7, 32, 14);
    c.strokeStyle = "rgba(120,170,255,.3)"; c.beginPath(); for (let k = 1; k < 5; k++) { c.moveTo(x0 + k * 6.4, -7); c.lineTo(x0 + k * 6.4, 7); } c.stroke();
  }
  if (!P) {
    c.fillStyle = "#222a3c"; c.strokeStyle = "#4a5a7a"; c.beginPath();
    for (let k = 0; k < 6; k++) { const a = (k / 6) * 6.283 + 0.52; c.lineTo(Math.cos(a) * 15, Math.sin(a) * 15); }
    c.closePath(); c.fill(); c.stroke();
    c.fillStyle = m.pop > 0 ? "#ffe2b0" : "#f2a65a"; c.beginPath(); c.arc(0, 0, 4 + m.pop * 14, 0, 7); c.fill();
  }
  if (lv(s, "dock")) {
    c.strokeStyle = "rgba(142,240,200,.5)"; c.lineWidth = 2;
    const t = Math.min(1, (s.bank.dockT || 0) / (6 / (1 + 0.6 * Math.max(0, lv(s, "dock") - 1))));
    c.beginPath(); c.arc(0, 0, P ? 58 : 26, -1.57, -1.57 + 6.283 * t); c.stroke();
  }
  c.restore();
}
// Viditelný růst elektráren: pole panelů na povrchu, zrcadla na šikmé dráze (za i před kamenem), statity v dálce.
function hash(i: number) { const x = Math.sin(i * 91.7 + 13.1) * 43758.5453; return x - Math.floor(x); }
function drawFields(c: CanvasRenderingContext2D, s: State, T: number, rot: number) {
  const f = Math.min(lv(s, "field"), 40);
  for (let i = 0; i < f; i++) {   // destičky panelů rozeseté po povrchu, otáčejí se s kamenem
    const a = hash(i) * 6.283 + rot, r = RA * (0.25 + 0.55 * Math.sqrt(hash(i + 50)));
    const x = CX + Math.cos(a) * r, y = CY + Math.sin(a) * r * 0.92, gl = Math.max(0, Math.sin(T * 0.8 + i * 1.7));
    c.save(); c.translate(x, y); c.rotate(a * 0.3 + 0.4);
    c.fillStyle = "rgba(28,58,104,.92)"; c.fillRect(-5, -3.5, 10, 7);
    c.strokeStyle = "rgba(120,170,240,.55)"; c.lineWidth = 0.8; c.strokeRect(-5, -3.5, 10, 7);
    c.fillStyle = `rgba(190,220,255,${0.15 + 0.5 * gl * gl})`; c.fillRect(-5, -3.5, 10, 1.3);
    c.restore();
  }
}
function drawGens(c: CanvasRenderingContext2D, s: State, T: number, front: boolean) {
  const fm = Math.min(lv(s, "farm"), 48);
  for (let i = 0; i < fm; i++) {
    // zlatý úhel + drobné odchylky: žádný pravidelný „čárkovaný kruh“
    const a = i * 2.39996 + T * (0.05 + hash(i) * 0.02), z = Math.sin(a);
    if ((z > 0) !== front) continue;
    const rr = RA * (1.32 + 0.12 * hash(i + 7)), x = CX + Math.cos(a) * rr, y = CY - 30 + z * rr * 0.28 + (hash(i + 3) - 0.5) * 14;
    const sh = Math.pow(Math.max(0, Math.sin(a * 1.5 + T * 0.6 + i)), 6), al = front ? 1 : 0.4, sz = front ? 5.5 : 3.6;
    c.save(); c.translate(x, y); c.rotate(0.6 + Math.sin(a) * 0.4);
    c.fillStyle = `rgba(170,200,235,${0.55 * al})`; c.beginPath(); c.moveTo(0, -sz); c.lineTo(sz * 0.7, 0); c.lineTo(0, sz); c.lineTo(-sz * 0.7, 0); c.closePath(); c.fill();
    c.restore();
    if (sh > 0.05) { c.fillStyle = `rgba(235,245,255,${sh * al})`; c.beginPath(); c.arc(x, y, 1.5 + sh * 3, 0, 7); c.fill(); }
  }
  if (front) return;
  const st = Math.min(lv(s, "statite"), 80);
  for (let i = 0; i < st; i++) {
    const a = -2.5 + hash(i + 11) * 1.6 + Math.sin(T * 0.2 + i) * 0.01, r = 900 + hash(i + 23) * 90;
    const x = CX - 300 + Math.cos(a) * r * 0.9, y = CY + 420 + Math.sin(a) * r * 0.75;
    c.fillStyle = `rgba(255,230,180,${0.4 + 0.4 * hash(i)})`; c.beginPath(); c.arc(x, y, 1.4, 0, 7); c.fill();
  }
}
export function hudOre(s: State) { return fmtOre(s.res.ore); }
export const C1 = { CX, CY, RA, PX, PY };
void MONO;
