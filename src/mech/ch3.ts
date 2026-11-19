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

// ---------- textura disku (generuje se jednou) ----------
function hash(i: number, j: number) { let h = (i * 374761393 + j * 668265263) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967295; }
function vnoise(x: number, y: number, P: number) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const w = (a: number) => ((a % P) + P) % P, a = hash(w(xi), yi), b = hash(w(xi + 1), yi), c = hash(w(xi), yi + 1), d = hash(w(xi + 1), yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const ss = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
let DL: (HTMLCanvasElement[] & { k: number }) | null = null;
/** Tři prstence disku (vnitřní, střední, vnější) – vlákna stočená do spirály, barva podle teploty (vnitřek bílý, okraj rudý). */
function diskLayers() {
  if (DL) return DL;
  const k = 1.5, R = RD * 1.08, N = Math.ceil(2 * R * k), I0 = 84;
  const pal = [[255, 251, 242], [255, 226, 168], [255, 176, 96], [236, 112, 62], [170, 56, 48]];
  const out = [0, 1, 2].map(() => { const cv = document.createElement("canvas"); cv.width = cv.height = N; return cv; });
  const imgs = out.map((cv) => cv.getContext("2d")!.createImageData(N, N));
  for (let py = 0; py < N; py++) for (let px = 0; px < N; px++) {
    const dx = (px + 0.5) / k - R, dy = (py + 0.5) / k - R, r = Math.hypot(dx, dy);
    if (r > R || r < RH * 0.9) continue;
    const th = Math.atan2(dy, dx) / (Math.PI * 2) + 0.5, lr = Math.log(r / RD);
    // vlákna: pomalu podél oběhu, rychle napříč – stočená do spirály
    let n = 0, amp = 0.55, fr = 1;
    for (let o = 0; o < 4; o++) { n += amp * vnoise((th * 10 + lr * 2.2) * fr, r * 0.11 * fr, 10 * fr); amp *= 0.5; fr *= 2; }
    const fil = 0.12 + 2.1 * Math.pow(Math.max(0, n), 2.2);
    const prof = ss(RH, I0 * 1.05, r) * Math.pow(I0 / Math.max(r, I0), 0.95) * (1 - ss(RD * 0.72, R, r));
    const x = Math.max(0, Math.min(0.999, (r - I0) / (RD - I0))) * (pal.length - 1), i0 = Math.floor(x), f = x - i0, c0 = pal[i0], c1 = pal[Math.min(i0 + 1, pal.length - 1)];
    const wIn = 1 - ss(108, 140, r), wOut = ss(150, 182, r), wMid = Math.max(0, 1 - wIn - wOut), W = [wIn, wMid, wOut];
    for (let L = 0; L < 3; L++) {
      if (W[L] <= 0) continue;
      const q = prof * fil * W[L] * 1.5, o4 = (py * N + px) * 4, d = imgs[L].data;
      d[o4] = Math.min(255, (c0[0] + (c1[0] - c0[0]) * f) * q); d[o4 + 1] = Math.min(255, (c0[1] + (c1[1] - c0[1]) * f) * q); d[o4 + 2] = Math.min(255, (c0[2] + (c1[2] - c0[2]) * f) * q); d[o4 + 3] = 255;
    }
  }
  out.forEach((cv, L) => cv.getContext("2d")!.putImageData(imgs[L], 0, 0));
  DL = Object.assign(out, { k }); return DL;
}

let HZ: HTMLCanvasElement | null = null;
/** Jemný opar mlhoviny (růžovofialový, místy tyrkysový), u díry prázdno. Generuje se jednou. */
function hazeTex() {
  if (HZ) return HZ;
  const N = 450, cv = document.createElement("canvas"); cv.width = cv.height = N;
  const g = cv.getContext("2d")!, im = g.createImageData(N, N), d = im.data;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const dx = (x / N) * 2 - 1, dy = (y / N) * 2 - 1, r = Math.hypot(dx, dy) * 900;
    let n = 0, a = 0.6, f = 1;
    for (let o = 0; o < 5; o++) { n += a * vnoise((x / N) * 6 * f + 7, (y / N) * 6 * f + 3, 1e6); a *= 0.5; f *= 2; }
    const m = vnoise((x / N) * 3 + 11, (y / N) * 3 + 5, 1e6);
    const v = Math.pow(Math.max(0, n - 0.35), 1.8) * ss(240, 520, r) * (1 - ss(820, 900, r)) * 2.8;
    const o4 = (y * N + x) * 4;
    d[o4] = Math.min(255, v * (150 - 70 * m)); d[o4 + 1] = Math.min(255, v * (55 + 120 * m * m)); d[o4 + 2] = Math.min(255, v * (120 + 40 * m)); d[o4 + 3] = 255;
  }
  g.putImageData(im, 0, 0); return (HZ = cv);
}

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
    void inj;
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
    // řídká mlhovina z trosek Aldry – jen jemný opar kolem, střed čistý
    { const H = hazeTex(); c.save(); c.globalCompositeOperation = "lighter"; c.globalAlpha = 0.9; c.translate(CX, CY); c.rotate(T * 0.004); c.drawImage(H, -900, -900, 1800, 1800); c.restore(); }
    const vg = c.createRadialGradient(CX, CY, 120, CX, CY, 360);   // ztlumit střed obrázku pod diskem (měkce, bez hrany)
    vg.addColorStop(0, "rgba(3,4,9,.75)"); vg.addColorStop(1, "rgba(3,4,9,0)");
    c.fillStyle = vg; c.beginPath(); c.arc(CX, CY, 360, 0, 7); c.fill();
    // disk – jas podle výkonu, rotující pruhy, světlejší strana letí k nám (Dopplerův jev)
    const lit = Math.max(0.25, Math.min(1, (Math.log10(Math.max(P, 1e26)) - 26) / 6.5)), Ip = iscoPx(s), rIn = Math.max(RH + 1, Ip * 0.85);
    c.save(); c.globalCompositeOperation = "lighter";
    const halo = c.createRadialGradient(CX, CY, RD * 0.6, CX, CY, RD * 1.7);
    halo.addColorStop(0, `rgba(255,150,80,${0.22 * lit})`); halo.addColorStop(1, "rgba(255,90,60,0)");
    c.fillStyle = halo; c.beginPath(); c.arc(CX, CY, RD * 1.7, 0, 7); c.fill();
    // disk – textura z kódu (spirální vlákna plynu), tři prstence se otáčí různě rychle (vnitřní nejrychleji)
    const DI = img("disk3");
    if (DI) {   // disk z obrázku (Gemini): pomalu se otáčí, jas podle výkonu
      const W = (2 * RH) / 0.208;
      c.save(); c.globalAlpha = 0.3 + 0.7 * lit; c.translate(CX, CY); c.rotate(-T * 0.04); c.drawImage(DI, -W / 2, -W / 2, W, W); c.restore();
    } else {
      const L = diskLayers();
      c.save(); c.globalAlpha = 0.35 + 0.65 * lit;
      L.forEach((cv, j) => { const w = cv.width / L.k; c.save(); c.translate(CX, CY); c.rotate(T * [0.22, 0.12, 0.075][j]); c.drawImage(cv, -w / 2, -w / 2, w, w); c.restore(); });
      c.restore();
    }
    const ig = c.createRadialGradient(CX, CY, Ip * 0.8, CX, CY, Ip * 1.35);   // žhavý vnitřní okraj (s rotací se přibližuje)
    ig.addColorStop(0, "rgba(255,250,240,0)"); ig.addColorStop(0.4, `rgba(255,248,232,${0.35 * lit})`); ig.addColorStop(1, "rgba(255,220,170,0)");
    if (!DI) { c.fillStyle = ig; c.beginPath(); c.arc(CX, CY, Ip * 1.35, 0, 7); c.fill(); }
    const dg = c.createLinearGradient(CX - RD, CY, CX + RD, CY);   // Dopplerovo zjasnění: strana, která letí k nám
    dg.addColorStop(0, `rgba(255,236,205,${0.14 * lit})`); dg.addColorStop(0.55, "rgba(255,236,205,0)");
    if (!DI) { c.fillStyle = dg; c.beginPath(); c.arc(CX, CY, RD * 0.95, 0, 7); c.moveTo(CX + RH, CY); c.arc(CX, CY, RH, 0, 7, true); c.fill(); }
    // hmota stéká do disku
    for (const p of this.spirals as Spiral[]) {
      if (p.t < 0) continue;
      const al = Math.min(1, p.t * 4) * Math.min(1, (p.dur - p.t) * 2);
      c.fillStyle = `rgba(${p.col},${0.8 * al})`;
      for (let k = 0; k < 3; k++) { const aa = p.a - k * 0.05; c.beginPath(); c.arc(CX + Math.cos(aa) * p.r, CY + Math.sin(aa) * p.r, Math.max(0.6, p.w * (1 - k * 0.25)), 0, 7); c.fill(); }
    }
    // horká skvrna: světlejší výseč disku obíhá jednou za puls (kvaziperiodická oscilace)
    const sa = spotA(s), cg = (c as any).createConicGradient(sa - Math.PI, CX, CY);
    const pk = 0.4 + 0.25 * lit;
    [[0, 0], [0.38, 0], [0.44, 0.12], [0.475, 0.45], [0.495, 0.9], [0.5, 1], [0.507, 0.45], [0.52, 0], [1, 0]].forEach(([p, a]) => cg.addColorStop(p, `rgba(255,246,228,${a * pk})`));
    c.fillStyle = cg;
    [[Ip * 0.9, Ip * 1.6, 1], [Ip * 1.6, (Ip + RD) * 0.6, 0.65], [(Ip + RD) * 0.6, RD * 0.95, 0.3]].forEach(([r0, r1, al]) => {
      c.globalAlpha = al; c.beginPath(); c.arc(CX, CY, r1, 0, 7); c.moveTo(CX + r0, CY); c.arc(CX, CY, r0, 0, 7, true); c.fill(); });
    c.globalAlpha = 1;
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
    // injektory: žádná technika na obraze, jen proudy plynu, které se z mlhoviny stáčí po spirále do disku
    const inj = Math.min(lv(s, "tug"), 12);
    if (inj) {
      c.save(); c.globalCompositeOperation = "lighter"; c.lineCap = "round";
      for (let i = 0; i < inj; i++) {
        const a0 = (i / inj) * 6.283 + 0.3, path: [number, number][] = [];
        for (let k = 0; k <= 32; k++) { const f = k / 32, r = 470 - f * (470 - RD * 0.92), a = a0 + Math.pow(f, 1.6) * 1.5; path.push([CX + Math.cos(a) * r, CY + Math.sin(a) * r]); }
        const c0 = "235,120,170", c1 = s.r.guide ? "200,245,230" : "255,205,150";   // z růžové mlhoviny do zlatého disku
        for (const [w, al, dash] of [[10, 0.045, 0], [3, 0.1, 0], [2.6, 0.22, 1]] as [number, number, number][]) {
          c.lineWidth = w; c.setLineDash(dash ? [2, 11] : []); c.lineDashOffset = -T * 32 - i * 7;
          const gr = c.createLinearGradient(path[0][0], path[0][1], path[32][0], path[32][1]);
          gr.addColorStop(0, `rgba(${c0},0)`); gr.addColorStop(0.4, `rgba(${c0},${al})`); gr.addColorStop(1, `rgba(${c1},${al * 1.5})`);
          c.strokeStyle = gr; c.beginPath(); path.forEach(([x, y], k) => (k ? c.lineTo(x, y) : c.moveTo(x, y))); c.stroke();
        }
      }
      c.setLineDash([]); c.restore();
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
