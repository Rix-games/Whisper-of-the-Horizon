// Kapitola 5 – Místní skupina: slapová sklizeň v pericentru, gravitační prak, relé, navaděče, Hvězdné proudy.
import { Mech, Input, View, ftxt, sparks, MONO } from "./fx";
import { rnd } from "../core/rng";
import { on } from "../core/bus";
import { SATS, SMAP, SatDef, sat, live, orbit, qOf, inPeri, tid, rip, setE, eMax, T5, RT5, joined, cap5, absorbedM } from "../chapters/ch5";
import { GIMG } from "../core/galaxy";
import { img } from "../ui/img";
import { count, num } from "../core/format";
import { find } from "../i18n";
import type { State } from "../core/state";

/** Střed Mléčné dráhy, její poloměr (px) a zploštění drah (sklon roviny). */
export const GX = 640, GY = 505, RM = 100, SQ = 0.78;
/** Kulisy Andromedy a Trojúhelníku leží v apocentru jejich budoucí dráhy (navážou plynule). */
const apo = (id: string): [number, number] => { const d = SMAP[id], p = orbit(d, d.e, d.M0); return [GX + p.x * RM, GY + p.y * RM * SQ]; };
export const M31_AT = apo("m31"), M33_AT = apo("m33");
export function spos(s: State, d: SatDef): [number, number, number] { const o = sat(s, d), p = orbit(d, o.e, o.M); return [GX + p.x * RM, GY + p.y * RM * SQ, p.r]; }
const lv = (s: State, id: string) => s.b[id] || 0;
const nm = (d: SatDef) => find("sat", d.id) || d.id;
const sizeOf = (s: State, d: SatDef) => d.sz * (0.5 + 0.5 * Math.max(0, sat(s, d).st));

type Part = { sx: number; sy: number; kx: number; ky: number; t: number; d: number; col: string };
let lastS: State | null = null;
on((e) => {   // pohlcení a splynutí – efekt na místě galaxie
  if (!lastS || (e.type !== "merge5" && e.type !== "absorb5")) return;
  const d = SMAP[e.id!]; if (!d) return;
  const t = find("sat", d.id) || d.id;
  if (e.type === "merge5") {
    ftxt(GX, GY - RM * 1.5, `Splynutí: ${t}`, "#ffd27a");
    if (e.v > 0) ftxt(GX, GY - RM * 1.5 + 20, `+${num(e.v)} M☉`, "#ffd27a");
    sparks(GX, GY, 60, "#ffe2b0", 300);
    skupina.shake = 0.7;
  } else {
    const p = spos(lastS, d);
    ftxt(p[0], p[1] - 18, `Pohlcena: ${t}`, "#ffd27a"); sparks(p[0], p[1], 30, "#ffe2b0", 160);
  }
});

export const skupina: Mech & any = {
  grab: null as SatDef | null, gmode: "", parts: [] as Part[], shake: 0, hover: null as SatDef | null, finT: 0, tailT: 0,
  reset() { this.grab = null; this.gmode = ""; this.parts = []; this.shake = 0; this.finT = 0; },
  satAt(s: State, x: number, y: number) {
    let best: SatDef | null = null, bd = 1e9;
    for (const d of SATS) {
      if (!live(s, d)) continue;
      const p = spos(s, d), r = Math.max(16, sizeOf(s, d) * 0.45), dd = Math.hypot(x - p[0], y - p[1]);
      if (dd < r && dd < bd) { bd = dd; best = d; }
    }
    return best;
  },
  slingE(s: State, d: SatDef, M: Input) {
    const p = spos(s, d), toward = Math.hypot(M.x - GX, (M.y - GY) / SQ) - Math.hypot(p[0] - GX, (p[1] - GY) / SQ);
    return Math.max(0.03, Math.min(eMax(d), sat(s, d).e - (toward / (d.a * RM)) * 0.9));
  },
  down(s: State, M: Input) {
    const d = this.satAt(s, M.x, M.y); if (!d) return;
    this.grab = d; this.gmode = inPeri(s, d) ? "harvest" : "sling";
  },
  up(s: State, M: Input) {
    const d = this.grab;
    if (d && this.gmode === "sling" && live(s, d)) {
      const ne = this.slingE(s, d, M), old = sat(s, d).e;
      if (Math.abs(ne - old) > 0.01) {
        setE(s, d, ne); s.prog.sl5 = (s.prog.sl5 || 0) + 1;
        const p = spos(s, d), q = qOf(d, ne);
        ftxt(p[0], p[1] - 22, q < T5.mergeR ? "Kurz na splynutí" : `Pericentrum ${count(Math.round(q * 50))} tis. ly`, q < T5.mergeR ? "#ff9a6a" : "#b8f5e0");
      }
    }
    this.grab = null; this.gmode = "";
  },
  stream(s: State, d: SatDef, k: number, col: string) {
    if (this.parts.length > 700) return;
    const p = spos(s, d);
    for (let i = 0; i < k; i++) {
      const side = rnd() < 0.5 ? 1 : -1, dx = GX - p[0], dy = GY - p[1];
      this.parts.push({ sx: p[0] + (rnd() - 0.5) * 10, sy: p[1] + (rnd() - 0.5) * 10, kx: (p[0] + GX) / 2 - dy * 0.35 * side, ky: (p[1] + GY) / 2 + dx * 0.35 * side, t: 0, d: 1 + rnd() * 0.8, col });
    }
  },
  update(s: State, dt: number, M: Input) {
    lastS = s;
    this.shake = Math.max(0, this.shake - dt);
    const d = this.grab;
    if (d && !live(s, d)) { this.grab = null; this.gmode = ""; }
    else if (d && this.gmode === "harvest") {
      if (inPeri(s, d)) {
        const o = sat(s, d), q = qOf(d, o.e);
        rip(s, d, T5.H * tid(q) * dt);
        RT5.harvest[d.id] = 0.3;
        if (rnd() < 0.8) this.stream(s, d, 2, "#ffe2b0");
        const r = orbit(d, o.e, o.M).r, pr = RT5.prevR[d.id] ?? r, dr = r - pr;
        if ((RT5.prevDr[d.id] ?? 0) < 0 && dr >= 0 && live(s, d)) {   // průlet nejbližším bodem s rukou na galaxii
          const g = rip(s, d, T5.peri * tid(q)), p = spos(s, d);
          if (g > 0) { ftxt(p[0], p[1] - 24, `Pericentrum +${num(g)} M☉`, "#8ef0c8"); sparks(p[0], p[1], 22, "#e8fff6", 180); }
        }
      } else if (M.down && !inPeri(s, d)) this.gmode = "wait";
    } else if (d && this.gmode === "wait" && inPeri(s, d)) this.gmode = "harvest";
    for (const x of SATS) { if (!live(s, x)) continue; const o = sat(s, x), r = orbit(x, o.e, o.M).r; RT5.prevDr[x.id] = r - (RT5.prevR[x.id] ?? r); RT5.prevR[x.id] = r; }
    // relé: tyrkysové proudy
    for (const id of RT5.relays) { const x = SMAP[id]; if (live(s, x) && inPeri(s, x) && !(RT5.harvest[id] > 0) && rnd() < 0.5) this.stream(s, x, 1, "#bff8e6"); }
    for (const p of this.parts) p.t += dt / p.d;
    this.parts = this.parts.filter((p: Part) => p.t < 1);
    if (s.r.mw31) this.finT += dt;
    this.tailT += dt;
    this.hover = M.inside ? this.satAt(s, M.x, M.y) : null;
  },
  bot(s: State, dt: number, M: Input) {
    // ruční sklizeň: drží galaxii s největším výnosem, která je právě v pericentru
    let best: SatDef | null = null, bv = 0;
    for (const d of SATS) {
      if (!live(s, d) || !inPeri(s, d)) continue;
      const o = sat(s, d), v = d.m * o.st * tid(qOf(d, o.e));
      if (v > bv) { bv = v; best = d; }
    }
    if (best && (!this.grab || this.grab !== best || this.gmode !== "harvest")) { if (M.down) { M.down = false; this.up(s, M); } }
    if (best) { const p = spos(s, best); M.x = p[0]; M.y = p[1]; if (!M.down) { M.down = true; this.down(s, M); } return; }
    if (M.down) { M.down = false; this.up(s, M); }
    // prak: občas srovná vzdálenou dráhu blíž (jako rozumný hráč)
    this.botT = (this.botT || 0) - dt;
    if (this.botT <= 0) {
      this.botT = 12;
      for (const d of SATS) {
        if (!live(s, d) || inPeri(s, d)) continue;
        const o = sat(s, d), et = 1 - 1.25 / d.a;
        if (qOf(d, o.e) > 1.6 && et > o.e) { setE(s, d, et); s.prog.sl5 = (s.prog.sl5 || 0) + 1; break; }
      }
    }
  },
  cursor(s: State, M: Input) { return this.grab ? "grabbing" : this.hover ? "grab" : "default"; },

  draw(c: CanvasRenderingContext2D, s: State, v: View, M: Input) {
    const T = v.T, sh = this.shake ? (Math.sin(T * 90) * 6 * this.shake) : 0, cx = GX + sh, cy = GY + sh * 0.6;
    const BG = img("bg5");
    if (BG) { c.save(); c.globalCompositeOperation = "screen"; c.drawImage(BG, -300, -115, 2200, 1229); c.restore(); }
    // Andromeda a Trojúhelník – kulisy, dokud nejsou na dráze
    const fin = s.r.mw31 ? Math.min(1, this.finT / 6) : 0;
    const A = img("m31"), TR = img("m33");
    if (A && !satOn5(s, "m31")) { c.save(); c.globalCompositeOperation = "screen"; c.globalAlpha = 0.7; c.drawImage(A, M31_AT[0] - 120, M31_AT[1] - 90, 240, 180); c.restore(); }
    if (TR && !satOn5(s, "m33")) { c.save(); c.globalCompositeOperation = "screen"; c.globalAlpha = 0.65; c.translate(M33_AT[0], M33_AT[1]); c.rotate(SMAP.m33.w + T * 0.02); c.scale(1, 0.75); c.drawImage(TR, -37, -37, 74, 74); c.restore(); }
    // dráhy
    const L = SATS.filter((d) => live(s, d));
    c.save(); c.lineWidth = 1;
    for (const d of L) {
      const o = sat(s, d), sling = this.grab === d && this.gmode === "sling" && !v.passive;
      c.strokeStyle = sling ? "rgba(125,135,156,.16)" : d.kind === "m31" ? "rgba(255,210,150,.16)" : "rgba(140,160,210,.13)";
      path(c, d, o.e); c.stroke();
      const q = qOf(d, o.e), qx = GX + Math.cos(d.w) * q * RM, qy = GY + Math.sin(d.w) * q * RM * SQ;
      c.fillStyle = "rgba(142,240,200,.45)"; c.beginPath(); c.arc(qx, qy, 2.3, 0, 7); c.fill();
      if (sling) {
        const ne = this.slingE(s, d, M), mg = qOf(d, ne) < T5.mergeR;
        c.save(); c.setLineDash([5, 5]); c.strokeStyle = mg ? "rgba(255,154,106,.85)" : "rgba(142,240,200,.8)"; c.lineWidth = 1.5; path(c, d, ne); c.stroke(); c.restore();
      }
      if (RT5.pilotFx > 0 && RT5.pilot === d.id) {
        c.save(); c.setLineDash([3, 6]); c.strokeStyle = `rgba(142,240,200,${0.6 * Math.min(1, RT5.pilotFx)})`; c.lineWidth = 1.4; path(c, d, o.e); c.stroke(); c.restore();
      }
    }
    c.restore();
    // Mléčná dráha
    const GI = img("galaxy"), mr = RM * 1.08;
    const halo = c.createRadialGradient(cx, cy, 0, cx, cy, mr * 1.9);
    const cp = cap5(s), glow = 0.12 + 0.35 * Math.min(1, cp / 0.6);
    halo.addColorStop(0, `rgba(255,205,140,${glow})`); halo.addColorStop(0.5, `rgba(255,190,120,${glow * 0.35})`); halo.addColorStop(1, "rgba(255,190,120,0)");
    c.fillStyle = halo; c.beginPath(); c.arc(cx, cy, mr * 1.9, 0, 7); c.fill();
    if (s.sat.m31?.g === 2) {   // Mlékomeda: obě galaxie v jedné velké eliptické záři
      const eg = c.createRadialGradient(cx, cy, 0, cx, cy, mr * 2.4);
      eg.addColorStop(0, "rgba(255,226,180,.55)"); eg.addColorStop(0.4, "rgba(255,206,150,.2)"); eg.addColorStop(1, "rgba(255,190,130,0)");
      c.save(); c.globalCompositeOperation = "lighter"; c.translate(cx, cy); c.rotate(-0.5); c.scale(1, 0.72); c.fillStyle = eg; c.beginPath(); c.arc(0, 0, mr * 2.4, 0, 7); c.fill(); c.restore();
    }
    if (GI) {
      const iw = mr / GIMG.R;
      c.save(); c.globalCompositeOperation = "screen"; c.translate(cx, cy); c.scale(1, 0.86); c.rotate(-T * 0.01);
      c.drawImage(GI, -GIMG.cx * iw, -GIMG.cy * iw, iw, iw); c.restore();
    } else {
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, mr); g.addColorStop(0, "rgba(255,228,180,.9)"); g.addColorStop(0.3, "rgba(170,190,255,.35)"); g.addColorStop(1, "rgba(120,140,220,0)");
      c.fillStyle = g; c.beginPath(); c.ellipse(cx, cy, mr, mr * 0.86, 0, 0, 7); c.fill();
    }
    // Hvězdné proudy kolem Mléčné dráhy (pohlcené galaxie) – víc smyček s každou galaxií
    const nj = joined(s);
    if (nj) {
      c.save(); c.globalCompositeOperation = "lighter";
      const loops = Math.min(14, nj), tl = lv(s, "tails5");
      for (let k = 0; k < loops; k++) {
        const r0 = mr * (1.25 + 0.09 * k), tilt = 0.5 + 0.35 * Math.sin(k * 1.7), rot = k * 0.9, cnt = 36 + 10 * Math.min(4, tl);
        for (let i = 0; i < cnt; i++) {
          const a = (i / cnt) * 6.283 + T * (0.05 + 0.012 * k) * (k % 2 ? 1 : -1), r = r0 * (1 + 0.06 * Math.sin(a * 3 + k));
          const x = Math.cos(a) * r, y = Math.sin(a) * r * tilt, X = cx + x * Math.cos(rot) - y * Math.sin(rot), Y = cy + (x * Math.sin(rot) + y * Math.cos(rot)) * SQ;
          c.fillStyle = tl ? `rgba(255,214,160,${0.18 + 0.05 * Math.min(4, tl)})` : "rgba(255,214,160,.12)"; c.fillRect(X - 0.8, Y - 0.8, 1.6, 1.6);
        }
      }
      c.restore();
    }
    // proudy hvězd ze satelitů do Mléčné dráhy
    c.save(); c.globalCompositeOperation = "lighter";
    for (const p of this.parts) {
      const t = p.t, u = 1 - t, x = u * u * p.sx + 2 * u * t * p.kx + t * t * cx, y = u * u * p.sy + 2 * u * t * p.ky + t * t * cy;
      c.globalAlpha = Math.min(1, (1 - t) * 2); c.fillStyle = p.col; c.fillRect(x - 1, y - 1, 2, 2);
    }
    c.restore(); c.globalAlpha = 1;
    // satelity
    const DW = img("dwarf"), CL = img("cloud");
    for (const d of L) {
      let [x, y] = spos(s, d);
      if (d.kind === "m31" && fin > 0) { const k = fin * fin; x += (cx - x) * k; y += (cy - y) * k; }
      const o = sat(s, d), peri = inPeri(s, d), S = sizeOf(s, d);
      const im = d.kind === "d" ? DW : d.kind === "c" ? CL : d.kind === "m33" ? TR : A;
      c.save(); c.translate(x + sh, y + sh * 0.6); c.globalCompositeOperation = "screen";
      if (d.kind === "d") {   // trpasličí galaxie: měkká zlatavá záře, ať je vidět i malá
        const gw = c.createRadialGradient(0, 0, 0, 0, 0, S * 0.75); gw.addColorStop(0, "rgba(255,214,150,.55)"); gw.addColorStop(0.35, "rgba(255,200,140,.18)"); gw.addColorStop(1, "rgba(255,190,130,0)");
        c.fillStyle = gw; c.beginPath(); c.arc(0, 0, S * 0.75, 0, 7); c.fill();
        c.globalCompositeOperation = "lighter";
      }
      if (im) {
        if (d.kind === "m31") c.drawImage(im, -S / 2, -S * 0.375, S, S * 0.75);
        else { c.rotate(d.w + (d.kind === "d" ? 0 : T * 0.02)); if (d.kind === "m33") c.scale(1, 0.75); c.drawImage(im, -S / 2, -S / 2, S, S); }
      } else {
        const g = c.createRadialGradient(0, 0, 0, 0, 0, S / 2); g.addColorStop(0, "rgba(255,226,176,.85)"); g.addColorStop(1, "rgba(255,200,140,0)");
        c.fillStyle = g; c.beginPath(); c.arc(0, 0, S / 2, 0, 7); c.fill();
      }
      c.restore();
      const R0 = Math.max(11, S * (d.kind === "m31" ? 0.3 : 0.4));
      if (peri) { c.strokeStyle = `rgba(142,240,200,${0.45 + 0.35 * Math.sin(T * 7)})`; c.lineWidth = 1.8; c.beginPath(); c.arc(x, y, R0 + 4, 0, 7); c.stroke(); }
      if (RT5.relays.includes(d.id)) {
        c.save(); c.fillStyle = "#8ef0c8"; c.translate(x + R0 + 5, y - R0 + 2); c.rotate(0.785); c.fillRect(-3, -3, 6, 6); c.restore();
      }
      if (this.grab === d && !v.passive) { c.strokeStyle = this.gmode === "harvest" ? "#ffd27a" : "rgba(255,210,122,.5)"; c.lineWidth = 2.2; c.beginPath(); c.arc(x, y, R0 + 9, 0, 7); c.stroke(); }
      if (d.kind !== "d" && !v.passive) labelSmall(c, x, y + R0 + 16, nm(d), v.sx);
      void o;
    }
    // finále: Andromeda splývá s Mléčnou dráhou
    if (fin > 0) {
      const k = Math.max(0, (fin - 0.6) / 0.4), g = c.createRadialGradient(cx, cy, 0, cx, cy, mr * (1.5 + 2.5 * k));
      g.addColorStop(0, `rgba(255,236,200,${0.25 + 0.6 * k})`); g.addColorStop(1, "rgba(255,200,140,0)");
      c.save(); c.globalCompositeOperation = "lighter"; c.fillStyle = g; c.beginPath(); c.arc(cx, cy, mr * (1.5 + 2.5 * k), 0, 7); c.fill(); c.restore();
    }
  },
  /** Popisek galaxie pod kurzorem – kreslí se až po značkách misí, ať ho nepřekryjí. */
  tip(c: CanvasRenderingContext2D, s: State, v: View) {
    if (v.passive) return;
    const hv = this.grab || this.hover;
    if (hv && live(s, hv)) {
      const [x, y] = spos(s, hv), o = sat(s, hv), peri = inPeri(s, hv), R0 = Math.max(11, sizeOf(s, hv) * (hv.kind === "m31" ? 0.3 : 0.4));
      const fs = 13 / Math.max(v.sx, 0.5);
      const t1 = nm(hv), t2 = peri ? "V pericentru: drž a sklízej" : "Táhni: změnit dráhu (prak)", t3 = `Zbývá ${Math.max(0, Math.round(o.st * 100))} % hvězd · ${lyTxt(hv.d)}`;
      c.font = `${fs}px ${MONO}`; c.textAlign = "left";
      const w = Math.max(c.measureText(t1).width, c.measureText(t2).width, c.measureText(t3).width) + fs * 1.2;
      let bx = x + R0 + 12; if (bx + w > 1590) bx = x - R0 - 12 - w;
      c.fillStyle = "rgba(10,12,20,.88)"; c.fillRect(bx, y - fs * 1.9, w, fs * 4.1);
      c.fillStyle = "#d9dfec"; c.fillText(t1, bx + fs * 0.6, y - fs * 0.6);
      c.fillStyle = peri ? "#8ef0c8" : "#f8c97c"; c.fillText(t2, bx + fs * 0.6, y + fs * 0.65);
      c.fillStyle = "#8f9ab0"; c.fillText(t3, bx + fs * 0.6, y + fs * 1.85);
    }
    void absorbedM;
  },
};

export const lyTxt = (k: number) => (k >= 1000 ? `${String(Math.round(k / 100) / 10).replace(".", ",")} mil. ly` : `${count(k)} tis. ly`);
function satOn5(s: State, id: string) { const d = SMAP[id]; return s.stage >= d.st && (!d.mis || !!s.mis[d.mis]); }
function path(c: CanvasRenderingContext2D, d: SatDef, e: number) {
  c.beginPath();
  for (let i = 0; i <= 96; i++) { const o = orbit(d, e, (i / 96) * 6.2832), x = GX + o.x * RM, y = GY + o.y * RM * SQ; i ? c.lineTo(x, y) : c.moveTo(x, y); }
}
function labelSmall(c: CanvasRenderingContext2D, x: number, y: number, t: string, sx: number) {
  const fs = 12 / Math.max(sx, 0.5);
  c.font = `600 ${fs}px ${MONO}`; c.textAlign = "center";
  c.save(); c.lineJoin = "round"; c.lineWidth = fs * 0.32; c.strokeStyle = "rgba(4,6,14,.88)"; c.strokeText(t, x, y); c.restore();
  c.fillStyle = "rgba(200,208,228,.8)"; c.fillText(t, x, y); c.textAlign = "left";
}
