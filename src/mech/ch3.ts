// Kapitola 3 – Díra: magnetické pasti a ventil. Pasti kolem disku sbírají plyn z mlhoviny, hráč je pouští do disku.
// Horká skvrna v disku oběhne jednou za puls (7,3 s). Pustit past, když je skvrna pod ní = souzvuk ×2 a článek řetězu.
// Plná řada řetězu = výbuch disku (energie a data). Automatika: injektory (stálý přítok) a automatické ventily.
import { Mech, Input, View, ftxt, sparks, MONO } from "./fx";
import { rnd } from "../core/rng";
import { power, dataRate } from "../core/engine";
import { T3, PERIOD, trapRate, trapCap, traps, win, comboMax, comboMult, feed, spinA, eddMax } from "../chapters/ch3";
import { img } from "../ui/img";
import { mass, pct, fixed } from "../core/format";
import type { State } from "../core/state";

export const CX = 800, CY = 500;
const GM = 9.7e6;           // px³/s² – jen pro rychlost pruhů disku
const RH = 50;              // stín díry (px) – sedí na obrázek kap3-disk (stín 20,8 % šířky)
const RD = 210;             // vnější okraj disku (px)
const RT = 330;             // poloměr, na kterém stojí pasti
const TR = 30;              // poloměr pasti (px)
/** Vnitřní prstenec (ISCO) se s rotací díry zmenšuje: r_isco/M od 6 (a = 0) k ~1,24 (a = 0,998). */
export function iscoM(a: number) {
  const z1 = 1 + Math.cbrt(1 - a * a) * (Math.cbrt(1 + a) + Math.cbrt(1 - a)), z2 = Math.sqrt(3 * a * a + z1 * z1);
  return 3 + z2 - Math.sqrt((3 - z1) * (3 + z1 + 2 * z2));
}
export const iscoPx = (s: State) => RH + 34 * (iscoM(spinA(s)) - 1) / 5;
const lv = (s: State, id: string) => s.b[id] || 0;
/** Úhel horké skvrny (oběhne jednou za puls, po směru hodinových ručiček, start nahoře). */
export const spotA = (s: State) => -Math.PI / 2 + ((s.t % PERIOD) / PERIOD) * Math.PI * 2;
const trapA = (i: number, k: number) => -Math.PI / 2 + (i / k) * Math.PI * 2 + (k > 1 ? Math.PI / k : 0.6);
/** Úhlová vzdálenost (−π…π). */
const dA = (a: number, b: number) => { let d = (a - b) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };

type Spiral = { r: number; a: number; t: number; dur: number; col: string; w: number; r1?: number };

export const diera: Mech & any = {
  fill: [] as number[], last: [] as number[], spirals: [] as Spiral[], lastRes: -99, flash: 0, boom: 0, flareT: -99, injT: 0, streamT: 0,
  reset() { this.fill = []; this.last = []; this.spirals = []; this.flash = 0; this.boom = 0; },
  pos(s: State, i: number) { const a = trapA(i, traps(s)); return { a, x: CX + Math.cos(a) * RT, y: CY + Math.sin(a) * RT }; },
  at(s: State, x: number, y: number) {
    for (let i = 0; i < traps(s); i++) { const p = this.pos(s, i); if (Math.hypot(p.x - x, p.y - y) < TR + 14) return i; }
    return -1;
  },
  inWin(s: State, i: number, k = 1) { return Math.abs(dA(spotA(s), this.pos(s, i).a)) < win(s) * k; },
  /** Vypustí past i do disku. */
  release(s: State, i: number, auto = false) {
    const m = this.fill[i] || 0, cap = trapCap(s);
    if (m < cap * 0.05) { if (!auto) ftxt(this.pos(s, i).x, this.pos(s, i).y - 40, "Past je prázdná", "#9aa6bd"); return; }
    const p = this.pos(s, i), res = this.inWin(s, i), full = m >= cap * 0.95;
    let q = full ? T3.full : 1, txt = "";
    if (res) {
      s.hole.combo = Math.min(comboMax(s), s.hole.combo + 1); s.hole.perfect++; this.lastRes = s.t;
      q *= T3.res * comboMult(s.hole.combo);
      txt = `Souzvuk ×${fixed(T3.res * comboMult(s.hole.combo) * (full ? T3.full : 1), 2)}`;
    } else {
      if (s.hole.combo > 0 && !auto) ftxt(CX, CY + RD + 40, "Řetěz přerušen", "#e98a8a");
      s.hole.combo = 0; txt = full ? "Přetlak ×1,25" : "Mimo souzvuk";
    }
    s.hole.hits++; this.fill[i] = 0; this.last[i] = s.t;
    if (feed(s, m * q)) this.flareUp(s);
    if (!auto || res) ftxt(p.x, p.y - 42, txt, res ? "#8ef0c8" : "#f2c48a");
    for (let k = 0; k < 9; k++) this.spirals.push({ r: RT - 6, r1: RD * 0.55, a: p.a - k * 0.05, t: -k * 0.06, dur: 1.6, col: res ? "220,255,240" : "255,200,150", w: 3.2 - k * 0.15 });
    sparks(p.x, p.y, 8, res ? "#8ef0c8" : "#ffd9a8", 60);
    if (res && s.hole.combo >= comboMax(s)) this.explode(s);
  },
  explode(s: State) {
    const P = power(s), E = P * T3.boomS, D = dataRate(s) * T3.boomS;
    s.res.energy += E; s.res.data += D; s.hole.booms = (s.hole.booms || 0) + 1; s.hole.combo = 0;
    this.boom = 1;
    ftxt(CX, CY - RD - 40, `Výbuch disku! Energie a data za ${T3.boomS} s výroby`, "#fff1d6"); void E; void D; void mass;
  },
  flareUp(s: State) {
    if (s.t - this.flareT > 3) { ftxt(CX, CY - RD - 70, "Eddingtonova mez – záření odfouklo přebytek", "#cfe0ff"); s.hole.flares++; }
    this.flareT = s.t; this.flash = 1;
  },
  down(s: State, M: Input) { const i = this.at(s, M.x, M.y); if (i >= 0) this.release(s, i); },
  update(s: State, dt: number, M: Input) {
    if (s.ch !== 3) return;
    const k = traps(s), cap = trapCap(s), r = trapRate(s), auto = lv(s, "auto3");
    for (let i = 0; i < k; i++) {
      this.fill[i] = Math.min(cap, (this.fill[i] || 0) + r * dt);
      // automatický ventil pustí past, když je skvrna přímo pod ní
      if (i < auto && this.inWin(s, i, 0.35) && s.t - (this.last[i] ?? -99) > 2) this.release(s, i, true);
    }
    if (s.hole.combo > 0 && s.t - this.lastRes > PERIOD * 1.15) { s.hole.combo = 0; ftxt(CX, CY + RD + 40, "Řetěz vyprchal", "#9aa6bd"); }
    for (let i = this.spirals.length - 1; i >= 0; i--) {
      const p: Spiral = this.spirals[i]; p.t += dt;
      if (p.t < 0) continue;
      const I = iscoPx(s), f = Math.min(1, p.t / p.dur);
      if (p.r1 != null) { p.r = p.r + (p.r1 - p.r) * Math.min(1, dt * 3.2); if (Math.abs(p.r - p.r1) < 4) { delete p.r1; } }
      else p.r = Math.max(RH, p.r - dt * (p.r - I * 0.8) * 1.5);
      p.a += dt * Math.sqrt(GM / Math.pow(Math.max(p.r, RH), 3)) * 0.35;
      if (f >= 1) this.spirals.splice(i, 1);
    }
    // injektory a proudy – jen obraz, hmotu přidává kapitola (autos)
    const inj = lv(s, "tug");
    if (inj) { this.injT -= dt; if (this.injT <= 0) { this.injT = Math.max(0.12, 1.2 / inj); const a = rnd() * 6.283; this.spirals.push({ r: 400, r1: RD * 0.8, a, t: 0, dur: 2.2, col: s.r.guide ? "220,255,240" : "255,200,150", w: 2.2 }); } }
    if (s.mis.tauris3 || s.mis.star3) { this.streamT -= dt; if (this.streamT <= 0) { this.streamT = s.mis.star3 ? 0.08 : 0.3; this.spirals.push({ r: 430, r1: RD, a: s.mis.star3 ? 2.6 : -0.7, t: 0, dur: 3, col: s.mis.star3 ? "210,230,255" : "200,215,255", w: 2 }); } }
    if (this.spirals.length > 320) this.spirals.splice(0, this.spirals.length - 320);
    this.flash = Math.max(0, this.flash - dt * 1.5); this.boom = Math.max(0, this.boom - dt * 0.6);
  },
  bot(s: State, dt: number, M: Input) {
    const k = traps(s), cap = trapCap(s), auto = lv(s, "auto3");
    for (let i = auto; i < k; i++) {
      if (!this.inWin(s, i, 0.6) || s.t - (this.last[i] ?? -99) < 2) continue;
      if ((this.fill[i] || 0) < cap * 0.4) continue;
      if (rnd() < 0.12) { this.last[i] = s.t; continue; }   // hráč občas nestihne
      this.release(s, i);
    }
  },
  cursor(s: State, M: Input) { return this.at(s, M.x, M.y) >= 0 ? "pointer" : "default"; },

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
    const DI = img("disk3");
    if (DI) {   // disk z obrázku: pomalu se otáčí, jas podle výkonu
      const W = (2 * RH) / 0.208;
      c.save(); c.globalAlpha = 0.3 + 0.7 * lit; c.translate(CX, CY); c.rotate(-T * 0.04); c.drawImage(DI, -W / 2, -W / 2, W, W); c.restore();
    }
    const g = c.createRadialGradient(CX, CY, rIn, CX, CY, RD);
    g.addColorStop(0, `rgba(255,250,235,${0.95 * lit})`); g.addColorStop(0.12, `rgba(255,222,160,${0.8 * lit})`);
    g.addColorStop(0.4, `rgba(255,150,70,${0.5 * lit})`); g.addColorStop(0.75, `rgba(210,80,50,${0.22 * lit})`); g.addColorStop(1, "rgba(150,40,40,0)");
    if (!DI) { c.fillStyle = g; c.beginPath(); c.arc(CX, CY, RD, 0, 7); c.moveTo(CX + rIn, CY); c.arc(CX, CY, rIn, 0, 7, true); c.fill(); }
    for (let i = 0; i < (DI ? 24 : 70); i++) {   // pruhy disku: vnitřní obíhají rychleji (Kepler)
      const f = ((i * 61) % 100) / 100, rr = rIn + Math.pow(f, 1.4) * (RD - rIn) * 0.97, w = Math.sqrt(GM / (rr * rr * rr)) * 0.35, a = T * w + i * 2.4;
      const dop = 0.55 + 0.45 * Math.cos(a + 0.6 - Math.PI), q = 1 - (rr - rIn) / (RD - rIn);
      c.strokeStyle = `rgba(255,${170 + 80 * q},${110 + 120 * q},${(0.1 + 0.35 * lit) * (0.25 + 0.75 * q) * dop})`; c.lineWidth = 0.8 + 2.2 * q;
      c.beginPath(); c.arc(CX, CY, rr, a, a + 0.5 + (i % 4) * 0.35); c.stroke();
    }
    const dg = c.createLinearGradient(CX - RD, CY, CX + RD, CY);   // Dopplerovo zjasnění levé strany
    dg.addColorStop(0, `rgba(255,235,200,${0.16 * lit})`); dg.addColorStop(0.5, "rgba(255,235,200,0)");
    if (!DI) c.fillStyle = dg; else c.fillStyle = "rgba(0,0,0,0)";
    c.beginPath(); c.arc(CX, CY, RD * 0.9, 0, 7); c.moveTo(CX + rIn, CY); c.arc(CX, CY, rIn, 0, 7, true); c.fill();
    // hmota stéká do disku
    for (const p of this.spirals as Spiral[]) {
      if (p.t < 0) continue;
      const al = Math.min(1, p.t * 4) * Math.min(1, (p.dur - p.t) * 2);
      c.fillStyle = `rgba(${p.col},${0.8 * al})`;
      for (let k = 0; k < 3; k++) { const aa = p.a - k * 0.05; c.beginPath(); c.arc(CX + Math.cos(aa) * p.r, CY + Math.sin(aa) * p.r, Math.max(0.6, p.w * (1 - k * 0.25)), 0, 7); c.fill(); }
    }
    // horká skvrna obíhá disk jednou za puls; ručička ukazuje, ke které pasti míří
    const sa = spotA(s), sr = (Ip + RD) * 0.5, sx = CX + Math.cos(sa) * sr, sy = CY + Math.sin(sa) * sr;
    for (let k = 0; k < 14; k++) { const aa = sa - k * 0.06; c.fillStyle = `rgba(255,240,210,${0.5 * (1 - k / 14)})`; c.beginPath(); c.arc(CX + Math.cos(aa) * sr, CY + Math.sin(aa) * sr, 7 - k * 0.35, 0, 7); c.fill(); }
    const sg = c.createRadialGradient(sx, sy, 0, sx, sy, 22); sg.addColorStop(0, "rgba(255,255,245,.95)"); sg.addColorStop(1, "rgba(255,220,160,0)");
    c.fillStyle = sg; c.beginPath(); c.arc(sx, sy, 22, 0, 7); c.fill();
    const hand = c.createLinearGradient(sx, sy, CX + Math.cos(sa) * (RT + 40), CY + Math.sin(sa) * (RT + 40));
    hand.addColorStop(0, "rgba(255,235,190,.35)"); hand.addColorStop(1, "rgba(255,235,190,0)");
    c.strokeStyle = hand; c.lineWidth = 3; c.beginPath(); c.moveTo(sx, sy); c.lineTo(CX + Math.cos(sa) * (RT + 40), CY + Math.sin(sa) * (RT + 40)); c.stroke();
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
    // magnetické pasti: klec, plyn uvnitř roste s náplní, oblouk náplně; zeleně = teď je souzvuk
    const k = traps(s), cap = trapCap(s), CI = img("clump3"), auto = lv(s, "auto3");
    for (let i = 0; i < k; i++) {
      const p = this.pos(s, i), f = Math.min(1, (this.fill[i] || 0) / cap), inw = this.inWin(s, i), full = f >= 0.95;
      if (inw) { const gg = c.createRadialGradient(p.x, p.y, TR * 0.6, p.x, p.y, TR * 2.2); gg.addColorStop(0, "rgba(142,240,200,.35)"); gg.addColorStop(1, "rgba(142,240,200,0)"); c.fillStyle = gg; c.beginPath(); c.arc(p.x, p.y, TR * 2.2, 0, 7); c.fill(); }
      const W = TR * 2.4 * (0.25 + 0.75 * Math.sqrt(f));
      c.save(); c.globalCompositeOperation = "lighter"; c.globalAlpha = 0.35 + 0.65 * f;
      if (CI) { c.translate(p.x, p.y); c.rotate(T * 0.3 + i); c.drawImage(CI, -W / 2, -W / 2, W, W); }
      else { c.fillStyle = "rgba(255,170,205,.8)"; c.beginPath(); c.arc(p.x, p.y, W * 0.3, 0, 7); c.fill(); }
      c.restore();
      c.strokeStyle = "rgba(180,190,210,.55)"; c.lineWidth = 2; c.beginPath(); c.arc(p.x, p.y, TR, 0, 7); c.stroke();
      for (let j = 0; j < 6; j++) { const a = T * 0.4 * (i % 2 ? 1 : -1) + (j / 6) * 6.283; c.beginPath(); c.moveTo(p.x + Math.cos(a) * (TR - 5), p.y + Math.sin(a) * (TR - 5)); c.lineTo(p.x + Math.cos(a) * (TR + 4), p.y + Math.sin(a) * (TR + 4)); c.stroke(); }
      c.strokeStyle = inw ? "#8ef0c8" : full ? `rgba(255,240,215,${0.6 + 0.4 * Math.sin(T * 6)})` : "#f2a65a"; c.lineWidth = 3.5;
      c.beginPath(); c.arc(p.x, p.y, TR + 8, -Math.PI / 2, -Math.PI / 2 + f * Math.PI * 2); c.stroke();
      if (i < auto) { c.fillStyle = "#8ef0c8"; c.beginPath(); c.arc(p.x + TR * 0.75, p.y - TR * 0.75, 5, 0, 7); c.fill(); }
    }
    // injektory na okraji: stálý přítok
    const inj = Math.min(lv(s, "tug"), 12), TG = img("tug3");
    for (let i = 0; i < inj; i++) {
      const a = (i / Math.max(inj, 1)) * 6.283 + 0.3, x = CX + Math.cos(a) * 410, y = CY + Math.sin(a) * 410;
      c.save(); c.translate(x, y); c.rotate(a - Math.PI / 2);
      if (TG) c.drawImage(TG, -14, -14, 28, 28); else { c.fillStyle = "#ffe2b0"; c.beginPath(); c.moveTo(0, 6); c.lineTo(-4, -5); c.lineTo(4, -5); c.closePath(); c.fill(); }
      c.restore();
    }
    if (this.boom > 0) { c.save(); c.globalCompositeOperation = "lighter"; const b = this.boom; c.strokeStyle = `rgba(255,245,220,${b})`; c.lineWidth = 14 * b; c.beginPath(); c.arc(CX, CY, RD + (1 - b) * 420, 0, 7); c.stroke(); c.fillStyle = `rgba(255,235,200,${0.35 * b})`; c.beginPath(); c.arc(CX, CY, RD * 1.3, 0, 7); c.fill(); c.restore(); }
    // popisky: díra, mez, řetěz
    const fs = 13 / Math.max(v.sx, 0.3), lines: [string, string][] = [[`Díra po Aldře · 8 M☉`, "#d9dfec"], [`Eddingtonova mez ${pct(P / eddMax(s))}`, P / eddMax(s) > 0.8 ? "#cfe0ff" : "#9aa6bd"]];
    if (s.hole.combo > 0) lines.push([`Řetěz ${s.hole.combo}/${comboMax(s)} · ×${fixed(comboMult(s.hole.combo), 1)}`, "#8ef0c8"]);
    c.font = `600 ${fs}px ${MONO}`; c.textAlign = "center"; c.lineJoin = "round";
    lines.forEach(([tx, col], j) => { const y = CY + RT + TR + 24 + (1.4 * j) * fs; c.lineWidth = fs * 0.32; c.strokeStyle = "rgba(4,6,14,.88)"; c.strokeText(tx, CX, y); c.fillStyle = col; c.fillText(tx, CX, y); });
    void act; void M;
  },
};
