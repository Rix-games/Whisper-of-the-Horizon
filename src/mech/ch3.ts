// Kapitola 3 – Díra: prak. Chuchvalce plynu z pozůstatku supernovy se házejí do díry.
// Hod bokem = hmota se usadí v disku a vyzáří energii (nejvíc u vnitřního prstence ISCO). Hod rovně = spadne bez užitku.
import { Mech, Input, View, ftxt, sparks, MONO } from "./fx";
import { rnd } from "../core/rng";
import { power } from "../core/engine";
import { T3, clumpMass, poolCap, respawnT, feed, spinA, eddMax, mdot } from "../chapters/ch3";
import { img } from "../ui/img";
import { count, pct } from "../core/format";
import type { State } from "../core/state";

export const CX = 800, CY = 500;
const GM = 9.7e6;           // px³/s² – kruhová rychlost na okraji mlhoviny ~150 px/s
const RH = 38;              // stín díry (px)
const RD = 230;             // vnější okraj disku (px)
const VK = 1.0;             // rychlost hodu = délka tahu × VK
const VMAX = 320;
/** Vnitřní prstenec (ISCO) se s rotací díry zmenšuje: r_isco/M od 6 (a = 0) k ~1,24 (a = 0,998). */
export function iscoM(a: number) {
  const z1 = 1 + Math.cbrt(1 - a * a) * (Math.cbrt(1 + a) + Math.cbrt(1 - a)), z2 = Math.sqrt(3 * a * a + z1 * z1);
  return 3 + z2 - Math.sqrt((3 - z1) * (3 + z1 + 2 * z2));
}
export const iscoPx = (s: State) => RH + 34 * (iscoM(spinA(s)) - 1) / 5;
const lv = (s: State, id: string) => s.b[id] || 0;

type Clump = { x: number; y: number; vx: number; vy: number; st: "idle" | "fly"; age: number; r0: number; a0: number; sz: number };
type Spiral = { r: number; a: number; t: number; dur: number; col: string; w: number };

export const diera: Mech & any = {
  clumps: [] as Clump[], spirals: [] as Spiral[], grab: null as Clump | null, spawnT: 0, flareT: 0, flash: 0, lastPerfect: -99, tugT: 0, streamT: 0, botT: 0,
  reset() { this.clumps = []; this.spirals = []; this.grab = null; this.spawnT = 0; this.flash = 0; },
  idle() { return this.clumps.filter((c: Clump) => c.st === "idle"); },
  spawn() {
    const a = rnd() * 6.283, r = 395 + rnd() * 70;
    this.clumps.push({ x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r, vx: 0, vy: 0, st: "idle", age: 0, r0: r, a0: a, sz: 0.85 + rnd() * 0.35 });
  },
  at(x: number, y: number) {
    let best: Clump | null = null, bd = 30;
    for (const c of this.clumps) if (c.st === "idle") { const d = Math.hypot(c.x - x, c.y - y); if (d < bd) { bd = d; best = c; } }
    return best;
  },
  /** Rychlost hodu z tahu myší (prak: táhneš od chuchvalce, letí opačně). */
  vel(c: Clump, M: Input) {
    let vx = (c.x - M.x) * VK, vy = (c.y - M.y) * VK;
    const v = Math.hypot(vx, vy); if (v > VMAX) { vx *= VMAX / v; vy *= VMAX / v; }
    return [vx, vy];
  },
  /** Kam se hmota usadí: poloměr kruhové dráhy se stejným momentem hybnosti. */
  landing(s: State, x: number, y: number, vx: number, vy: number) {
    const rx = x - CX, ry = y - CY, h = rx * vy - ry * vx, rc = (h * h) / GM, I = iscoPx(s);
    const e2 = vx * vx + vy * vy - (2 * GM) / Math.hypot(rx, ry);   // > 0 = uletí
    if (e2 >= 0 && rc > RD) return { rc, k: "escape" };
    if (rc < I) return { rc, k: "plunge" };
    if (rc <= I * 1.9) return { rc, k: "perfect" };
    if (rc <= RD) return { rc, k: "disk" };
    return { rc, k: "outer" };
  },
  launch(c: Clump, vx: number, vy: number) { c.st = "fly"; c.vx = vx; c.vy = vy; c.age = 0; },
  down(s: State, M: Input) { this.grab = this.at(M.x, M.y); },
  up(s: State, M: Input) {
    const c = this.grab; this.grab = null;
    if (!c || c.st !== "idle") return;
    const [vx, vy] = this.vel(c, M);
    if (Math.hypot(vx, vy) < 8) return;   // jen klik – nic
    this.launch(c, vx, vy);
  },
  /** Chuchvalec dorazil do disku (nebo spadl / uletěl). */
  land(s: State, c: Clump) {
    const L = this.landing(s, c.x, c.y, c.vx, c.vy), Q = T3.q as any;
    if (L.k === "escape") { ftxt(c.x, c.y, "Uletělo", "#9aa6bd"); return; }
    let q = Q[L.k], txt = L.k === "perfect" ? "Vnitřní prstenec" : L.k === "plunge" ? "Spadlo rovnou dovnitř" : L.k === "outer" ? "Okraj disku" : "Do disku";
    if (L.k === "perfect") {
      s.hole.combo = s.t - this.lastPerfect < 6 ? Math.min(4, s.hole.combo + 1) : 0;
      this.lastPerfect = s.t; s.hole.perfect++;
      q *= 1 + 0.15 * s.hole.combo;
      if (s.hole.combo) txt += ` · řetěz ${s.hole.combo + 1}×`;
    }
    s.hole.hits++;
    const m = clumpMass(s) * q * c.sz;
    if (feed(s, m)) this.flareUp(s);
    ftxt(c.x, c.y - 14, `${txt} ×${(Math.round(q * 100) / 100).toString().replace(".", ",")}`, L.k === "perfect" ? "#8ef0c8" : L.k === "plunge" ? "#e98a8a" : "#f2c48a");
    const rr = Math.max(RH + 2, Math.min(RD, L.rc));
    this.spirals.push({ r: rr, a: Math.atan2(c.y - CY, c.x - CX), t: 0, dur: L.k === "plunge" ? 0.6 : 2.6, col: L.k === "perfect" ? "255,236,190" : "255,190,130", w: 3 + 2 * c.sz });
    if (L.k !== "plunge") sparks(c.x, c.y, 6, "#ffd9a8", 50);
  },
  flareUp(s: State) {
    if (s.t - this.flareT > 3) { ftxt(CX, CY - RD - 30, "Eddingtonova mez – záření odfouklo přebytek", "#cfe0ff"); s.hole.flares++; }
    this.flareT = s.t; this.flash = 1;
  },
  update(s: State, dt: number, M: Input) {
    if (s.ch !== 3) return;
    // nové chuchvalce v mlhovině
    if (this.idle().length < poolCap(s)) { this.spawnT -= dt; if (this.spawnT <= 0) { this.spawn(); this.spawnT = respawnT(s); } }
    // pomalé unášení na okraji, let k díře
    for (let i = this.clumps.length - 1; i >= 0; i--) {
      const c: Clump = this.clumps[i];
      c.age += dt;
      if (c.st === "idle") {
        if (c === this.grab) continue;
        c.a0 += dt * 0.02; c.x = CX + Math.cos(c.a0) * c.r0; c.y = CY + Math.sin(c.a0) * c.r0;
        continue;
      }
      const sub = 6, h = dt / sub;
      let done = "";
      for (let k = 0; k < sub && !done; k++) {
        const rx = c.x - CX, ry = c.y - CY, r = Math.hypot(rx, ry), a = GM / (r * r * r);
        c.vx -= rx * a * h; c.vy -= ry * a * h; c.x += c.vx * h; c.y += c.vy * h;
        if (r < RD) done = "in"; else if (r > 1100 || c.age > 14) done = "lost";
      }
      if (done === "in") this.land(s, c);
      else if (done === "lost") ftxt(Math.max(60, Math.min(1540, c.x)), Math.max(60, Math.min(940, c.y)), "Uletělo", "#9aa6bd");
      if (done) this.clumps.splice(i, 1);
    }
    // stékání disku (jen obraz)
    for (let i = this.spirals.length - 1; i >= 0; i--) {
      const p: Spiral = this.spirals[i]; p.t += dt;
      const I = iscoPx(s); p.a += dt * Math.sqrt(GM / Math.pow(Math.max(p.r, RH), 3)) * 0.35;
      p.r = Math.max(RH, p.r - dt * (p.r - I * 0.8) / Math.max(0.3, p.dur - p.t + 0.4));
      if (p.t > p.dur) this.spirals.splice(i, 1);
    }
    // remorkéry a proudy – jen obraz, hmotu přidává kapitola (autos)
    const tugs = lv(s, "tug");
    if (tugs) { this.tugT -= dt; if (this.tugT <= 0) { this.tugT = Math.max(0.25, T3.tugEvery / tugs); this.spirals.push({ r: RD * (0.75 + rnd() * 0.25), a: rnd() * 6.283, t: 0, dur: 2.6, col: s.r.guide ? "255,236,190" : "255,190,130", w: 3 }); } }
    if (s.mis.tauris3 || s.mis.star3) { this.streamT -= dt; if (this.streamT <= 0) { this.streamT = s.mis.star3 ? 0.08 : 0.3; this.spirals.push({ r: RD, a: s.mis.star3 ? 2.6 : -0.7, t: 0, dur: 3, col: s.mis.star3 ? "210,230,255" : "200,215,255", w: 2 }); } }
    if (this.spirals.length > 260) this.spirals.splice(0, this.spirals.length - 260);
    this.flash = Math.max(0, this.flash - dt * 1.5);
  },
  bot(s: State, dt: number, M: Input) {
    this.botT -= dt;
    if (this.botT > 0) return;
    this.botT = 1.4 + rnd() * 0.6;
    const c: Clump | undefined = this.idle()[0];
    if (!c) return;
    const rx = c.x - CX, ry = c.y - CY, r = Math.hypot(rx, ry), I = iscoPx(s);
    const rc = I * (1.15 + rnd() * 0.9), vt = Math.sqrt(GM * rc) / r * (1 + (rnd() - 0.5) * 0.12);
    this.launch(c, (-ry / r) * vt - (rx / r) * 25, (rx / r) * vt - (ry / r) * 25);
  },
  cursor(s: State, M: Input) { return this.grab ? "grabbing" : this.at(M.x, M.y) ? "grab" : "default"; },

  draw(c: CanvasRenderingContext2D, s: State, v: View, M: Input) {
    const T = v.T, P = power(s), act = s.ch === 3 && !v.passive;
    // pozůstatek supernovy (obrázek okolí, prstenec mlhoviny = místo, odkud se berou chuchvalce)
    const I = img("near3");
    if (I) { const k = 1.375; c.save(); c.globalAlpha = 0.95; c.drawImage(I, CX - 962 * k, CY - 545 * k, I.width * k, I.height * k); c.restore(); }
    const vg = c.createRadialGradient(CX, CY, 120, CX, CY, 360);   // ztlumit střed obrázku pod diskem (měkce, bez hrany)
    vg.addColorStop(0, "rgba(3,4,9,.75)"); vg.addColorStop(1, "rgba(3,4,9,0)");
    c.fillStyle = vg; c.beginPath(); c.arc(CX, CY, 360, 0, 7); c.fill();
    // disk – jas podle výkonu, rotující pruhy, světlejší strana letí k nám (Dopplerův jev)
    const lit = Math.max(0.25, Math.min(1, (Math.log10(Math.max(P, 1e26)) - 26) / 6.5)), Ip = iscoPx(s), rIn = Math.max(RH + 1, Ip * 0.85);
    c.save(); c.globalCompositeOperation = "lighter";
    const halo = c.createRadialGradient(CX, CY, RD * 0.6, CX, CY, RD * 1.7);
    halo.addColorStop(0, `rgba(255,150,80,${0.22 * lit})`); halo.addColorStop(1, "rgba(255,90,60,0)");
    c.fillStyle = halo; c.beginPath(); c.arc(CX, CY, RD * 1.7, 0, 7); c.fill();
    const g = c.createRadialGradient(CX, CY, rIn, CX, CY, RD);
    g.addColorStop(0, `rgba(255,250,235,${0.95 * lit})`); g.addColorStop(0.12, `rgba(255,222,160,${0.8 * lit})`);
    g.addColorStop(0.4, `rgba(255,150,70,${0.5 * lit})`); g.addColorStop(0.75, `rgba(210,80,50,${0.22 * lit})`); g.addColorStop(1, "rgba(150,40,40,0)");
    c.fillStyle = g; c.beginPath(); c.arc(CX, CY, RD, 0, 7); c.moveTo(CX + rIn, CY); c.arc(CX, CY, rIn, 0, 7, true); c.fill();
    for (let i = 0; i < 70; i++) {   // pruhy disku: vnitřní obíhají rychleji (Kepler)
      const f = ((i * 61) % 100) / 100, rr = rIn + Math.pow(f, 1.4) * (RD - rIn) * 0.97, w = Math.sqrt(GM / (rr * rr * rr)) * 0.35, a = T * w + i * 2.4;
      const dop = 0.55 + 0.45 * Math.cos(a + 0.6 - Math.PI), q = 1 - (rr - rIn) / (RD - rIn);
      c.strokeStyle = `rgba(255,${170 + 80 * q},${110 + 120 * q},${(0.1 + 0.35 * lit) * (0.25 + 0.75 * q) * dop})`; c.lineWidth = 0.8 + 2.2 * q;
      c.beginPath(); c.arc(CX, CY, rr, a, a + 0.5 + (i % 4) * 0.35); c.stroke();
    }
    const dg = c.createLinearGradient(CX - RD, CY, CX + RD, CY);   // Dopplerovo zjasnění levé strany
    dg.addColorStop(0, `rgba(255,235,200,${0.16 * lit})`); dg.addColorStop(0.5, "rgba(255,235,200,0)");
    c.fillStyle = dg; c.beginPath(); c.arc(CX, CY, RD * 0.9, 0, 7); c.moveTo(CX + rIn, CY); c.arc(CX, CY, rIn, 0, 7, true); c.fill();
    // hmota stéká po spirále
    for (const p of this.spirals as Spiral[]) {
      const al = Math.min(1, p.t * 3) * Math.min(1, (p.dur - p.t) * 2);
      c.fillStyle = `rgba(${p.col},${0.75 * al})`;
      for (let k = 0; k < 4; k++) { const aa = p.a - k * 0.09; c.beginPath(); c.arc(CX + Math.cos(aa) * p.r, CY + Math.sin(aa) * p.r, p.w * (1 - k * 0.2), 0, 7); c.fill(); }
    }
    // výtrysky (po výzkumu) – svislé, jas podle výkonu
    if (s.r.jets3) {
      for (const sg of [-1, 1]) {
        const jg = c.createLinearGradient(CX, CY, CX, CY + sg * 480); jg.addColorStop(0, `rgba(190,215,255,${0.55 * lit})`); jg.addColorStop(1, "rgba(120,160,255,0)");
        c.fillStyle = jg; c.beginPath(); c.moveTo(CX - 6, CY); c.lineTo(CX - 26, CY + sg * 480); c.lineTo(CX + 26, CY + sg * 480); c.lineTo(CX + 6, CY); c.fill();
      }
    }
    if (this.flash > 0) { c.strokeStyle = `rgba(220,235,255,${this.flash})`; c.lineWidth = 6 * this.flash; c.beginPath(); c.arc(CX, CY, RD + (1 - this.flash) * 120, 0, 7); c.stroke(); }
    c.restore();
    // stín a fotonový prstenec
    c.fillStyle = "#000"; c.beginPath(); c.arc(CX, CY, RH, 0, 7); c.fill();
    c.strokeStyle = `rgba(255,235,200,${0.5 + 0.4 * lit})`; c.lineWidth = 1.6; c.beginPath(); c.arc(CX, CY, RH + 1.5, 0, 7); c.stroke();
    // vnitřní prstenec ISCO (čárkovaně) – cíl hodu
    c.setLineDash([4, 6]); c.strokeStyle = "rgba(142,240,200,.45)"; c.lineWidth = 1.2;
    c.beginPath(); c.arc(CX, CY, Ip, 0, 7); c.stroke(); c.beginPath(); c.arc(CX, CY, Ip * 1.9, 0, 7); c.stroke(); c.setLineDash([]);
    // remorkéry na okraji
    const tugs = Math.min(lv(s, "tug"), 12);
    for (let i = 0; i < tugs; i++) {
      const a = T * 0.05 + (i / tugs) * 6.283, x = CX + Math.cos(a) * 470, y = CY + Math.sin(a) * 470;
      c.save(); c.translate(x, y); c.rotate(a + 1.57); c.fillStyle = "#ffe2b0"; c.beginPath(); c.moveTo(0, -6); c.lineTo(-4, 5); c.lineTo(4, 5); c.closePath(); c.fill(); c.restore();
      c.fillStyle = "rgba(255,170,90,.6)"; c.beginPath(); c.arc(x - Math.cos(a) * 12, y - Math.sin(a) * 12, 4, 0, 7); c.fill();
    }
    // chuchvalce
    for (const k of this.clumps as Clump[]) {
      const r = 13 * k.sz, pul = 0.75 + 0.25 * Math.sin(T * 3 + k.r0);
      const cg = c.createRadialGradient(k.x, k.y, 0, k.x, k.y, r * 2.6);
      cg.addColorStop(0, `rgba(255,240,245,${pul})`); cg.addColorStop(0.25, `rgba(255,170,205,${0.8 * pul})`); cg.addColorStop(0.6, "rgba(220,100,170,.3)"); cg.addColorStop(1, "rgba(120,200,220,0)");
      c.fillStyle = cg; c.beginPath(); c.arc(k.x, k.y, r * 2.6, 0, 7); c.fill();
      if (act && k.st === "idle") { c.strokeStyle = `rgba(255,210,122,${0.35 + 0.35 * pul})`; c.lineWidth = 1.5; c.beginPath(); c.arc(k.x, k.y, r * 1.5, 0, 7); c.stroke(); }
    }
    // míření: tah praku, předpověď dráhy a kam se hmota usadí
    if (act && this.grab && this.grab.st === "idle") {
      const k: Clump = this.grab, [vx, vy] = this.vel(k, M), L = this.landing(s, k.x, k.y, vx, vy);
      c.strokeStyle = "rgba(255,226,176,.85)"; c.lineWidth = 2; c.beginPath(); c.moveTo(k.x, k.y); c.lineTo(M.x, M.y); c.stroke(); c.fillStyle = "#ffe2b0"; c.beginPath(); c.arc(M.x, M.y, 4, 0, 7); c.fill();
      const col = L.k === "perfect" ? "142,240,200" : L.k === "disk" || L.k === "outer" ? "242,166,90" : L.k === "plunge" ? "233,138,138" : "154,166,189";
      let x = k.x, y = k.y, ux = vx, uy = vy;
      const steps = s.r.aim ? 150 : 50;
      c.fillStyle = `rgba(${col},.95)`;
      for (let i = 0; i < steps; i++) {
        const rx = x - CX, ry = y - CY, r = Math.hypot(rx, ry), a = GM / (r * r * r), h = 1 / 60;
        ux -= rx * a * h; uy -= ry * a * h; x += ux * h; y += uy * h;
        if (r < RD || r > 1100) break;
        if (i % 3 === 0) c.fillRect(x - 2, y - 2, 4, 4);
      }
      if (L.k !== "escape") { c.strokeStyle = `rgba(${col},.95)`; c.lineWidth = 3; c.beginPath(); c.arc(CX, CY, Math.max(RH + 2, Math.min(RD + 40, L.rc)), 0, 7); c.stroke(); }
      c.font = `600 ${13 / Math.max(v.sx, 0.3)}px ${MONO}`; c.textAlign = "left"; c.fillStyle = `rgb(${col})`;
      c.fillText(L.k === "perfect" ? "Vnitřní prstenec ×1,5" : L.k === "disk" ? "Do disku ×1" : L.k === "outer" ? "Okraj disku ×0,7" : L.k === "plunge" ? "Spadne rovnou ×0,25" : "Uletí", M.x + 14, M.y + 4);
    }
    // popisky
    const fs = 13 / Math.max(v.sx, 0.3);
    c.font = `600 ${fs}px ${MONO}`; c.textAlign = "center";
    c.save(); c.lineJoin = "round"; c.lineWidth = fs * 0.32; c.strokeStyle = "rgba(4,6,14,.88)";
    const lab = `Díra po Aldře · 8 M☉`, ed = `Eddingtonova mez ${pct(P / eddMax(s))}`;
    c.strokeText(lab, CX, CY + RD + 2.2 * fs); c.strokeText(ed, CX, CY + RD + 3.6 * fs); c.restore();
    c.fillStyle = "#d9dfec"; c.fillText(lab, CX, CY + RD + 2.2 * fs); c.fillStyle = P / eddMax(s) > 0.8 ? "#cfe0ff" : "#9aa6bd"; c.fillText(ed, CX, CY + RD + 3.6 * fs);
    void mdot; void count;
  },
};
