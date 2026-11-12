// Kapitola 2 – Hvězda: vypouštění roje, magnetické smyčky a řízené erupce, továrny, kotvy.
import { Mech, Input, View, ftxt, sparks } from "./fx";
import { rnd, mulberry, angDiff } from "../core/rng";
import { gain } from "../core/bus";
import { buy } from "../core/engine";
import { colCost, salvo, flareGain, colArea, T2 } from "../chapters/ch2";
import { mass, count } from "../core/format";
import type { State } from "../core/state";

const CX = 760, CY = 480, VIS = 700;
const lv = (s: State, id: string) => s.b[id] || 0;

// vzhled Aldry podle stadia
const LOOK = [
  { R: 64, core: "#f4f8ff", mid: "#b9d2ff", edge: "#6f8fe8", glow: [150, 185, 255] },
  { R: 66, core: "#f4f8ff", mid: "#b9d2ff", edge: "#6f8fe8", glow: [150, 185, 255] },
  { R: 72, core: "#f6f9ff", mid: "#c7dbff", edge: "#7d9cf0", glow: [160, 195, 255] },
  { R: 76, core: "#f8faff", mid: "#d2e0ff", edge: "#8aa6f0", glow: [175, 200, 255] },
  { R: 118, core: "#fff1d6", mid: "#ffb070", edge: "#d2502a", glow: [255, 140, 80] },
  { R: 56, core: "#ffffff", mid: "#d9d0ff", edge: "#8f7cf0", glow: [200, 185, 255] },
  { R: 52, core: "#ffffff", mid: "#e2d8ff", edge: "#9a86f5", glow: [210, 195, 255] },
];
const look = (s: State) => LOOK[Math.min(s.stage, LOOK.length - 1)];

interface Dot { ring: number; a: number; glow: number; fly: number; sx: number; sy: number; dying: number; jid?: number; }
interface Loop { a: number; grow: number; life: number; ph: number; held: boolean; hx: number; hy: number; anc: number; dead?: boolean; autoDir?: number; }

const gran = (() => { const r = mulberry(3); return Array.from({ length: 80 }, () => ({ a: r() * 6.28, d: Math.sqrt(r()) * 0.95, r: 0.04 + r() * 0.1, s: 0.5 + r() * 2, p: r() * 6 })); })();

export const hvezda: Mech & any = {
  dots: [] as Dot[], loops: [] as Loop[], jets: [] as any[], cmes: [] as any[], fact: [] as any[],
  spawnT: 2.5, launchT: 0, grab: null as Loop | null, combo: 0, jid: 0, shake: 0, lastN: -1, manual: 0,
  reset() { this.dots = []; this.loops = []; this.jets = []; this.cmes = []; this.fact = []; this.grab = null; this.combo = 0; this.lastN = -1; },
  geo(s: State) {
    const L = look(s), Rs = L.R, out = s.r.outer ? 1.25 : 1, base = Math.max(Rs * 2.1, 150);
    return { Rs, rings: [base * out, base * 1.42 * out, base * 1.9 * out] };
  },
  pos(d: Dot, g: any) { const r = g.rings[d.ring]; return [CX + Math.cos(d.a) * r, CY + Math.sin(d.a) * r]; },
  ringAt(g: any, M: Input) { const d = Math.hypot(M.x - CX, M.y - CY); let best = -1, bd = 22; g.rings.forEach((r: number, i: number) => { if (Math.abs(d - r) < bd) { bd = Math.abs(d - r); best = i; } }); return best; },
  zone(s: State) { const w = 0.04 * lv(s, "tame"); return [0.66 - w, 0.88 + w * 0.5]; },
  snapAt(s: State) { return 1 + 0.05 * lv(s, "tame"); },
  jetW(s: State) { return 0.13 + 0.035 * lv(s, "jet"); },
  reach: 0.9,
  apex(L: Loop, g: any, T: number) {
    if (L.held) return [L.hx, L.hy];
    const h = g.Rs * (1.3 + 0.6 * L.grow) + Math.sin(T * 3 + L.ph) * 2;
    return [CX + Math.cos(L.a) * h, CY + Math.sin(L.a) * h];
  },
  tension(L: Loop, g: any) { return Math.max(0, (Math.hypot(L.hx - CX, L.hy - CY) - g.Rs * 1.3) / (g.Rs * 2.9)); },
  aimDir(L: Loop, dir: number) { const d = angDiff(dir, L.a); return L.a + Math.max(-this.reach, Math.min(this.reach, d)); },
  densest(a0: number, s: State) {
    const w = this.jetW(s); let best = a0, bn = -1;
    for (let k = 0; k <= 18; k++) {
      const a = a0 - this.reach + (2 * this.reach * k) / 18; let cnt = 0;
      for (const c of this.dots) if (!c.dying && !c.fly && Math.abs(angDiff(c.a, a)) < w) cnt++;
      if (cnt > bn) { bn = cnt; best = a; }
    }
    return best;
  },
  down(s: State, M: Input) {
    const g = this.geo(s); this.launchT = 0;
    for (const L of this.loops) {
      if (L.grow < 0.25) continue;
      const p = this.apex(L, g, 0);
      if (Math.hypot(M.x - p[0], M.y - p[1]) < 38) { this.grab = L; L.held = true; L.hx = M.x; L.hy = M.y; return; }
    }
  },
  up(s: State) { if (this.grab) { this.release(s, this.grab, false); this.grab = null; } },
  release(s: State, L: Loop, auto: boolean) {
    const g = this.geo(s); L.dead = true;
    const t = auto ? 0.78 : this.tension(L, g), [z0, z1] = this.zone(s);
    const dir = auto ? L.autoDir! : this.aimDir(L, Math.atan2(L.hy - CY, L.hx - CX));
    let pw: number, txt: string, col: string;
    if (t < 0.3) { pw = 0.25; txt = "Smyčka povolila"; col = "#7d879c"; this.combo = 0; }
    else if (t < z0) { pw = 0.6; txt = "Slabá erupce"; col = "#f8c97c"; this.combo = 0; }
    else if (t <= z1) {
      if (auto) { pw = 0.55 + 0.1 * lv(s, "anchor"); txt = "Kotva"; col = "#b8f5e0"; }
      else {
        this.combo++; pw = 1.5 * (1 + T2.flare.comboStep * Math.min(this.combo - 1, 8));
        txt = this.combo > 1 ? `Rezonance ×${this.combo}!` : "Řízená erupce!"; col = "#8ef0c8"; this.shake = 0.35;
        s.stats.perfect++; if (this.combo > s.best.reson) s.best.reson = this.combo;
      }
    } else { pw = 0.9; txt = "Přetaženo"; col = "#f8c97c"; this.combo = 0; }
    s.stats.flares++;
    this.jets.push({ id: ++this.jid, a: dir, w: this.jetW(s) * (pw > 1.2 ? 1.25 : 1), front: g.Rs, pw, hits: 0, t: 0, auto, txt, col });
    const x = CX + Math.cos(L.a) * g.Rs, y = CY + Math.sin(L.a) * g.Rs;
    sparks(x, y, pw > 1.2 ? 40 : 16, pw > 1.2 ? "#e8fff6" : "#ffd9a0", pw > 1.2 ? 260 : 150);
  },
  cme(s: State, L: Loop) { L.dead = true; this.combo = 0; this.cmes.push({ a: L.a, front: this.geo(s).Rs, hit: 0 }); },
  syncDots(s: State, g: any, M: Input) {
    if (this.lastN < 0) { this.lastN = s.n; }
    const target = Math.min(VIS, Math.round(s.n));
    let alive = 0; for (const d of this.dots) if (!d.dying) alive++;
    const fromHand = this.manual > 0;
    while (alive < target) {
      let ring = (rnd() * 3) | 0, a = rnd() * 6.283, fly = 0, sx = 0, sy = 0;
      if (fromHand && M.down) { const ri = this.ringAt(g, M); if (ri >= 0) { ring = ri; a = Math.atan2(M.y - CY, M.x - CX) + (rnd() - 0.5) * 0.15; } }
      else if (this.fact.length && s.n > this.lastN) { const f = this.fact[(rnd() * this.fact.length) | 0]; fly = 0.8; const fr = g.rings[2] * 1.22; sx = CX + Math.cos(f.a) * fr; sy = CY + Math.sin(f.a) * fr; a = f.a + (rnd() - 0.5) * 0.6; }
      this.dots.push({ ring, a, glow: 0, fly, sx, sy, dying: 0 }); alive++;
    }
    // nad viditelným stropem: továrny dál viditelně posílají kolektory na dráhy
    if (alive >= VIS && this.fact.length && s.n > this.lastN && this.dots.length) {
      const reps = Math.min(4, 1 + Math.floor(this.fact.length / 6));
      for (let i = 0; i < reps; i++) {
        const d = this.dots[(rnd() * this.dots.length) | 0];
        if (d.dying || d.fly) continue;
        const f = this.fact[(rnd() * this.fact.length) | 0], fr = g.rings[2] * 1.22;
        d.fly = 0.8; d.sx = CX + Math.cos(f.a) * fr; d.sy = CY + Math.sin(f.a) * fr;
      }
    }
    this.manual = Math.max(0, this.manual - 1);
    this.lastN = s.n;
  },
  update(s: State, dt: number, M: Input) {
    const g = this.geo(s); this.shake = Math.max(0, this.shake - dt);
    // továrny (viditelné až 24)
    const nf = Math.min(lv(s, "fact"), 24);
    while (this.fact.length < nf) this.fact.push({ a: rnd() * 6.283, t: rnd() });
    for (const f of this.fact) { f.a += 0.05 * dt; f.t = (f.t + dt * 0.4) % 1; }
    // ruční vypouštění (jen když nedržíš smyčku)
    if (M.down && !this.grab) {
      const ri = this.ringAt(g, M); this.launchT -= dt;
      if (ri >= 0 && this.launchT <= 0) {
        if (buy(s, "kol", 1)) { this.manual = 2; this.launchT = 0.1; sparks(M.x, M.y, 4, "#ffd27a", 70); }
      }
    }
    this.syncDots(s, g, M);
    for (const c of this.dots) {
      c.a += 0.45 * Math.pow(g.rings[0] / g.rings[c.ring], 1.5) * dt;
      if (c.fly) c.fly = Math.max(0, c.fly - dt);
      if (c.dying) c.dying += dt;
      if (c.glow) c.glow = Math.max(0, c.glow - dt * 1.4);
    }
    this.dots = this.dots.filter((c) => !c.dying || c.dying < 0.9);
    // smyčky
    const maxLoops = 1 + (lv(s, "tame") >= 2 ? 1 : 0) + (s.stage >= 2 ? 1 : 0);
    this.spawnT -= dt;
    if (this.spawnT <= 0 && this.loops.length < maxLoops) {
      this.loops.push({ a: rnd() * 6.283, grow: 0, life: 0, ph: rnd() * 6, held: false, hx: 0, hy: 0, anc: 0 });
      this.spawnT = 2.5 + rnd() * 3;
    }
    for (const L of this.loops) {
      L.life += dt; if (!L.held) L.grow = Math.min(1, L.grow + dt / 2.2);
      if (L.held) {
        L.hx = M.x; L.hy = M.y;
        if (this.tension(L, g) > this.snapAt(s)) { ftxt(M.x, M.y - 18, "Smyčka praskla!", "#ff6b5a"); this.grab = null; L.held = false; this.cme(s, L); }
      } else {
        if (lv(s, "anchor") && L.grow >= 1) {
          L.anc += dt * (0.5 + 0.25 * lv(s, "anchor"));
          if (L.anc >= 1) { L.autoDir = this.densest(L.a, s); this.release(s, L, true); }
        }
        if (!L.dead && L.life > 7.5) this.cme(s, L);
      }
    }
    this.loops = this.loops.filter((L) => !L.dead);
    // řízené výtrysky
    const maxR = g.rings[2] * 1.35, vis = Math.max(1, this.dots.length);
    for (const J of this.jets) {
      J.t += dt; const prev = J.front; J.front += ((maxR - g.Rs) / 0.6) * dt;
      for (const c of this.dots) {
        if (c.dying || c.fly || c.jid === J.id) continue;
        const r = g.rings[c.ring];
        if (r > prev && r <= J.front && Math.abs(angDiff(c.a, J.a)) < J.w) {
          c.jid = J.id; c.glow = 1; J.hits++;
          if (J.hits % 3 === 1) { const p = this.pos(c, g); sparks(p[0], p[1], 3, "#dffcf0", 60); }
        }
      }
      if (J.front >= maxR && !J.done) {
        J.done = true;
        const share = J.hits / vis;   // podíl roje zasažený výtryskem
        const v = flareGain(s, J.pw, share);
        gain(s, "plasma", v);
        const x = CX + Math.cos(J.a) * g.rings[2] * 1.15, y = CY + Math.sin(J.a) * g.rings[2] * 1.15;
        ftxt(x, y - 10, `${J.txt} +${mass(v)}`, J.col);
        if (J.hits) ftxt(x, y + 10, `nabito ${count(Math.round(J.hits * Math.max(1, s.n / vis)))} kolektorů`, "#9aa6bd");
      }
    }
    this.jets = this.jets.filter((J) => J.t < 1.1);
    // neřízené erupce poškodí roj
    for (const C of this.cmes) {
      C.front += (maxR - g.Rs) * dt;
      for (const c of this.dots) {
        if (c.dying || c.fly) continue;
        if (g.rings[c.ring] <= C.front && Math.abs(angDiff(c.a, C.a)) < 0.22) { c.dying = 0.001; C.hit++; }
      }
      if (C.front >= maxR && !C.done) {
        C.done = true;
        const lost = Math.min(s.n * 0.06, C.hit * Math.max(1, s.n / vis));
        if (lost > 0) { s.n = Math.max(0, s.n - lost); this.lastN = s.n; s.stats.cme++; }
        ftxt(CX + Math.cos(C.a) * maxR, CY + Math.sin(C.a) * maxR, lost ? `Erupce zasáhla roj −${count(Math.round(lost))}` : "Erupce bez škod", lost ? "#ff6b5a" : "#7d879c");
      }
    }
    this.cmes = this.cmes.filter((C) => !C.done);
  },
  // ---- bot: vypouští, chytá zralé smyčky a pouští je v zeleném pásmu k hustému roji ----
  bot(s: State, dt: number, M: Input) {
    const g = this.geo(s);
    M.px = M.x; M.py = M.y;
    if (this.grab) {
      const L = this.grab, [z0, z1] = this.zone(s), t = (z0 + z1) / 2;
      const dir = L.autoDir ?? (L.autoDir = this.densest(L.a, s)), dist = g.Rs * 1.3 + t * g.Rs * 2.9;
      const tx = CX + Math.cos(dir) * dist, ty = CY + Math.sin(dir) * dist;
      const dx = tx - M.x, dy = ty - M.y, d = Math.hypot(dx, dy);
      if (d > 4) { const m = Math.min(d, 900 * dt); M.x += (dx / d) * m; M.y += (dy / d) * m; return; }
      M.down = false; this.up(s); return;
    }
    const L = this.loops.find((l: Loop) => l.grow >= 0.95 && !l.held);
    if (L) {
      const p = this.apex(L, g, 0);
      if (M.down) { M.down = false; this.up(s); }
      M.x = p[0]; M.y = p[1]; M.down = true; this.down(s, M); if (this.grab) this.grab.autoDir = undefined; return;
    }
    // vypouštění na nejméně obsazený prstenec
    if (s.res.plasma - (this.reserve || 0) >= colCost(s) * salvo(s)) {
      const a = (s.t * 0.7) % 6.283, r = g.rings[(Math.floor(s.t / 3)) % 3];
      M.x = CX + Math.cos(a) * r; M.y = CY + Math.sin(a) * r; if (!M.down) { M.down = true; this.down(s, M); }
    } else if (M.down) { M.down = false; this.up(s); }
  },
  cursor(s: State, M: Input) {
    if (this.grab) return "grabbing";
    const g = this.geo(s);
    for (const L of this.loops) { if (L.grow < 0.25) continue; const p = this.apex(L, g, 0); if (Math.hypot(M.x - p[0], M.y - p[1]) < 38) return "grab"; }
    return this.ringAt(g, M) >= 0 ? "copy" : "crosshair";
  },

  // ---------- kresba ----------
  draw(c: CanvasRenderingContext2D, s: State, v: View, M: Input) {
    const g = this.geo(s), T = v.T, Lk = look(s);
    const shell = Math.max(0, Math.min(1, (Math.log10(Math.max(1e-20, s.n * colArea(s))) + 14) / 14));
    const sh = this.shake ? (rnd() - 0.5) * 6 * this.shake : 0;
    const cx = CX + sh, cy = CY + sh * 0.7, Rs = g.Rs;
    g.rings.forEach((r: number) => {
      c.strokeStyle = "rgba(140,160,210,.12)"; c.lineWidth = 1; c.beginPath(); c.arc(cx, cy, r, 0, 7); c.stroke();
      if (shell > 0.05) { c.strokeStyle = `rgba(255,205,130,${shell * 0.18})`; c.lineWidth = 2 + shell * 7; c.stroke(); }
    });
    const hov = this.grab || v.passive ? -1 : this.ringAt(g, M);
    if (hov >= 0) { c.strokeStyle = "rgba(242,166,90,.38)"; c.lineWidth = 2; c.beginPath(); c.arc(cx, cy, g.rings[hov], 0, 7); c.stroke(); }
    // hvězda
    const vis = 1 - Math.min(0.5, shell * 0.5), gl = Lk.glow.join(",");
    let gr = c.createRadialGradient(cx, cy, Rs * 0.6, cx, cy, Rs * 3.6);
    gr.addColorStop(0, `rgba(${gl},${0.55 * vis})`); gr.addColorStop(0.25, `rgba(${gl},${0.16 * vis})`); gr.addColorStop(1, `rgba(${gl},0)`);
    c.fillStyle = gr; c.beginPath(); c.arc(cx, cy, Rs * 3.6, 0, 7); c.fill();
    c.save(); c.globalCompositeOperation = "lighter";
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * 6.283 + T * 0.02 + Math.sin(T * 0.3 + i) * 0.1, d = Rs * (1.05 + 0.12 * Math.sin(T * 0.5 + i * 2.1)), r2 = Rs * (0.55 + 0.2 * Math.sin(T * 0.4 + i));
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d, cg = c.createRadialGradient(x, y, 0, x, y, r2);
      cg.addColorStop(0, `rgba(${gl},${0.14 * vis})`); cg.addColorStop(1, `rgba(${gl},0)`);
      c.fillStyle = cg; c.beginPath(); c.arc(x, y, r2, 0, 7); c.fill();
    }
    c.restore();
    gr = c.createRadialGradient(cx - Rs * 0.15, cy - Rs * 0.15, Rs * 0.1, cx, cy, Rs);
    gr.addColorStop(0, Lk.core); gr.addColorStop(0.55, Lk.mid); gr.addColorStop(1, Lk.edge);
    c.fillStyle = gr; c.beginPath(); c.arc(cx, cy, Rs, 0, 7); c.fill();
    c.save(); c.beginPath(); c.arc(cx, cy, Rs, 0, 7); c.clip();
    for (const b of gran) {
      const a = b.a + T * 0.03, x = cx + Math.cos(a) * b.d * Rs, y = cy + Math.sin(a) * b.d * Rs;
      c.fillStyle = `rgba(255,255,255,${0.05 + 0.05 * Math.sin(T * b.s + b.p)})`; c.beginPath(); c.arc(x, y, b.r * Rs, 0, 7); c.fill();
      c.fillStyle = `rgba(20,30,90,${0.04 + 0.04 * Math.cos(T * b.s + b.p)})`; c.beginPath(); c.arc(x + b.r * Rs, y, b.r * Rs * 0.5, 0, 7); c.fill();
    }
    for (const L of this.loops) for (const sd of [-1, 1]) {
      const a = L.a + sd * 0.28, x = cx + Math.cos(a) * Rs * 0.93, y = cy + Math.sin(a) * Rs * 0.93;
      c.fillStyle = `rgba(10,15,50,${0.35 + 0.3 * L.grow})`; c.beginPath(); c.arc(x, y, Rs * 0.07, 0, 7); c.fill();
    }
    c.restore();
    // vítr Wolf-Rayet ve stadiu 5
    if (s.stage >= 5) {  // Wolf-Rayet: silný hvězdný vítr
      c.save(); c.globalCompositeOperation = "lighter";
      for (let i = 0; i < 70; i++) { const a = i * 2.39996 + T * 0.05, f = (i * 0.137 + T * 0.25) % 1, r = Rs + f * g.rings[2] * 1.3; c.fillStyle = `rgba(200,185,255,${0.35 * (1 - f)})`; c.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2, 2); }
      c.restore();
    }
    // vytěžování hvězdy (zdvih)
    const nl = Math.min(lv(s, "lift"), 10);
    for (let k = 0; k < nl; k++) {
      const a = T * 0.08 + (k * 6.283) / nl, R2 = g.rings[2] * 1.22;
      for (let j = 0; j < 16; j++) {
        const f = (j / 16 + T * 0.5) % 1, r = Rs + (R2 - Rs) * f, aa = a + Math.sin(f * 3) * 0.08;
        c.fillStyle = `rgba(${gl},${(1 - f) * 0.8})`; c.fillRect(cx + Math.cos(aa) * r - 1.2, cy + Math.sin(aa) * r - 1.2, 2.4, 2.4);
      }
    }
    c.save(); c.globalCompositeOperation = "lighter";
    for (const C of this.cmes) {
      const w = 0.22, cg = c.createRadialGradient(cx, cy, Rs, cx, cy, Math.max(Rs + 1, C.front));
      cg.addColorStop(0, "rgba(255,120,60,.15)"); cg.addColorStop(0.85, "rgba(255,90,50,.35)"); cg.addColorStop(1, "rgba(255,200,150,.6)");
      c.fillStyle = cg; c.beginPath(); c.arc(cx, cy, C.front, C.a - w, C.a + w); c.arc(cx, cy, Rs, C.a + w, C.a - w, true); c.closePath(); c.fill();
    }
    for (const J of this.jets) {
      const fade = J.front >= g.rings[2] * 1.35 ? Math.max(0, 1 - (J.t - 0.6) * 2) : 1, w = J.w, big = J.pw > 1.2;
      const jg = c.createRadialGradient(cx, cy, Rs, cx, cy, Math.max(Rs + 1, J.front));
      jg.addColorStop(0, big ? `rgba(230,255,245,${0.8 * fade})` : `rgba(255,235,190,${0.7 * fade})`);
      jg.addColorStop(1, big ? `rgba(120,240,200,${0.25 * fade})` : `rgba(255,170,90,${0.2 * fade})`);
      c.fillStyle = jg; c.beginPath(); c.arc(cx, cy, J.front, J.a - w, J.a + w); c.arc(cx, cy, Rs, J.a + w, J.a - w, true); c.closePath(); c.fill();
    }
    c.restore();
    const [z0, z1] = this.zone(s);
    for (const L of this.loops) {
      const f1 = [cx + Math.cos(L.a - 0.28) * Rs * 0.97, cy + Math.sin(L.a - 0.28) * Rs * 0.97], f2 = [cx + Math.cos(L.a + 0.28) * Rs * 0.97, cy + Math.sin(L.a + 0.28) * Rs * 0.97];
      const ap = this.apex(L, g, T); if (!L.held) { ap[0] += sh; ap[1] += sh * 0.7; }
      const t = L.held ? this.tension(L, g) : 0, inZone = t >= z0 && t <= z1, danger = L.life > 5.5 && !L.held;
      const ctrl = [2 * ap[0] - (f1[0] + f2[0]) / 2, 2 * ap[1] - (f1[1] + f2[1]) / 2];
      const base = L.held ? (inZone ? [142, 240, 200] : t > z1 ? [255, 120, 90] : [255, 220, 170]) : danger ? [255, 130, 90] : [255, 185, 120];
      c.save(); c.globalCompositeOperation = "lighter"; c.lineCap = "round";
      for (let k = 0; k < 4; k++) {
        const off = Math.sin(T * 4 + k * 1.7 + L.ph) * (3 + 6 * t) + (k - 1.5) * 2.2, nx = Math.cos(L.a + 1.57) * off, ny = Math.sin(L.a + 1.57) * off;
        c.strokeStyle = `rgba(${base.join(",")},${(k === 0 ? 0.9 : 0.28) * L.grow})`; c.lineWidth = k === 0 ? 2.2 : 5 + 3 * t;
        c.beginPath(); c.moveTo(f1[0], f1[1]); c.quadraticCurveTo(ctrl[0] + nx, ctrl[1] + ny, f2[0], f2[1]); c.stroke();
      }
      c.restore();
      if (!L.held && L.grow > 0.25 && !v.passive) {
        const pr = 11 + 3 * Math.sin(T * 5 + L.ph);
        c.strokeStyle = danger ? "rgba(255,107,90,.8)" : "rgba(255,230,190,.55)"; c.lineWidth = 1.5;
        c.beginPath(); c.arc(ap[0], ap[1], pr, 0, 7); c.stroke();
        if (danger) { c.strokeStyle = "#ff6b5a"; c.lineWidth = 2.5; c.beginPath(); c.arc(ap[0], ap[1], pr + 5, -1.57, -1.57 + 6.283 * (1 - (L.life - 5.5) / 2)); c.stroke(); }
        if (L.anc > 0) {
          c.strokeStyle = "rgba(142,240,200,.6)"; c.setLineDash([3, 4]); c.lineWidth = 1.2;
          const da = this.densest(L.a, s), ex = cx + Math.cos(da) * g.rings[2] * 1.2, ey = cy + Math.sin(da) * g.rings[2] * 1.2;
          c.beginPath(); c.moveTo(ap[0], ap[1]); c.lineTo(ex, ey); c.stroke(); c.setLineDash([]);
          c.beginPath(); c.arc(ap[0], ap[1], pr + 9, -1.57, -1.57 + 6.283 * L.anc); c.stroke();
        }
      }
      if (L.held) {
        const dir = this.aimDir(L, Math.atan2(L.hy - CY, L.hx - CX)), w = this.jetW(s);
        const near = this.dots.filter((d: Dot) => !d.dying && !d.fly).map((d: Dot) => { const p = this.pos(d, g); return [Math.hypot(p[0] - L.hx, p[1] - L.hy), p] as [number, number[]]; })
          .sort((a, b) => a[0] - b[0]).slice(0, 7);
        c.save(); c.globalCompositeOperation = "lighter";
        for (const [, p] of near) {
          const mx = (p[0] + L.hx) / 2 + Math.sin(T * 3 + p[0]) * 10, my = (p[1] + L.hy) / 2 + Math.cos(T * 3 + p[1]) * 10;
          c.strokeStyle = `rgba(142,240,200,${0.15 + 0.25 * t})`; c.lineWidth = 1;
          c.beginPath(); c.moveTo(p[0], p[1]); c.quadraticCurveTo(mx, my, L.hx, L.hy); c.stroke();
        }
        c.restore();
        c.fillStyle = "rgba(142,240,200,.06)"; c.beginPath(); c.arc(cx, cy, g.rings[2] * 1.35, dir - w, dir + w); c.arc(cx, cy, Rs, dir + w, dir - w, true); c.closePath(); c.fill();
        const R0 = 24; c.lineWidth = 4;
        c.strokeStyle = "rgba(255,255,255,.1)"; c.beginPath(); c.arc(L.hx, L.hy, R0, Math.PI * 0.75, Math.PI * 2.25); c.stroke();
        const ang = (x: number) => Math.PI * 0.75 + Math.PI * 1.5 * Math.min(1, x / this.snapAt(s));
        c.strokeStyle = "rgba(142,240,200,.55)"; c.beginPath(); c.arc(L.hx, L.hy, R0, ang(z0), ang(z1)); c.stroke();
        c.strokeStyle = inZone ? "#8ef0c8" : t > z1 ? "#ff6b5a" : "#ffd9a0"; c.lineWidth = 2.5;
        c.beginPath(); c.arc(L.hx, L.hy, R0 + 5, Math.PI * 0.75, ang(t)); c.stroke();
      }
    }
    // roj
    for (const d of this.dots) {
      let p = this.pos(d, g); p = [p[0] + sh, p[1] + sh * 0.7];
      if (d.fly) {
        const k = 1 - d.fly / 0.8; p = [d.sx + (p[0] - d.sx) * k, d.sy + (p[1] - d.sy) * k];
        c.strokeStyle = "rgba(142,240,200,.3)"; c.lineWidth = 1; c.beginPath(); c.moveTo(d.sx, d.sy); c.lineTo(p[0], p[1]); c.stroke();
      }
      if (d.dying) {
        const k = d.dying / 0.9, r = g.rings[d.ring] * (1 - k) + Rs * k;
        p = [cx + Math.cos(d.a) * r, cy + Math.sin(d.a) * r]; c.fillStyle = `rgba(255,107,90,${1 - k})`;
      } else if (d.glow) c.fillStyle = `rgba(${(230 - 90 * d.glow) | 0},255,${(200 + 40 * d.glow) | 0},1)`;
      else c.fillStyle = d.ring === 0 ? "#ffe3a3" : d.ring === 1 ? "#f8c97c" : "#e9b46a";
      const sz = (d.glow ? 3.2 + d.glow * 2 : 3) * (s.n > VIS ? 1 + Math.min(1.2, Math.log10(s.n / VIS) * 0.25) : 1);
      c.fillRect(p[0] - sz / 2, p[1] - sz / 2, sz, sz);
    }
    for (const fa of this.fact) {
      const fr = g.rings[2] * 1.22, x = cx + Math.cos(fa.a) * fr, y = cy + Math.sin(fa.a) * fr;
      c.save(); c.translate(x, y); c.rotate(fa.a + 0.785);
      c.fillStyle = "#1d2a33"; c.strokeStyle = "#8ef0c8"; c.lineWidth = 1.3; c.fillRect(-7, -7, 14, 14); c.strokeRect(-7, -7, 14, 14);
      c.fillStyle = `rgba(142,240,200,${0.3 + 0.7 * fa.t})`; c.fillRect(-3, -3, 6, 6); c.restore();
    }
  },
};
