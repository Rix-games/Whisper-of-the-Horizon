// Rozhraní hry 1.0: scéna přes celou obrazovku, horní lišta, levý panel s deníkem, dock se záložkami, žebřík měřítka.
import { State, newState, migrate, encodeSave, decodeSave, SAVE_KEY } from "../core/state";
import * as E from "../core/engine";
import { BMAP, RMAP, MMAP, KTYPES, chOf, stageGoal, stagesOf } from "../core/defs";
import { n as cnt, mile } from "../core/bus";
import { si, mass, count, pct, times, duration, fixed } from "../core/format";
import { kamen } from "../mech/ch1";
import { hvezda } from "../mech/ch2";
import { galaxie } from "../mech/ch3";
import { VW, VH, Input, fxUpdate, fxDraw, fxClear, setFx } from "../mech/fx";
import { genW, layerIdx, oreMult, GEN1 } from "../chapters/ch1";
import { coverage, prodRate, plasmaMult, colCost, salvo, L_ALDRA, colArea } from "../chapters/ch2";
import { starsOn, capture, colCount } from "../chapters/ch3";
import { setLabelScale, background, drawSystem, drawNear, drawRemnant, drawMissions, missionAt } from "./views";
import { drawDetail } from "./detail";
import { tx, find, UI } from "../i18n";
import * as Audio from "./audio";
import { img, imgSrc, preload, ImgKey } from "./img";

export const VERSION = "1.0.0-dev";
const $ = (id: string) => document.getElementById(id)!;
const h = (tag: string, cls = "", html = "") => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };

let s: State;
const MECH: any = { 1: kamen, 2: hvezda, 3: galaxie };
const VIEWS = ["body", "star", "system", "near", "galaxy", "group", "laniakea"];
let view = "body", tab = "build", buyN = 1, dockOpen = true, T = 0;
const inp: Input = { x: -999, y: -999, px: -999, py: -999, down: false, inside: false };
let geo = { sx: 1, ox: 0, oy: 0 }, W = 0, H = 0, DPR = 1, hoverMis: string | null = null;
let trans = 0; // přechod mezi kapitolami (s)

// ---------- formát podle suroviny ----------
export function fmtCur(cur: string, v: number) {
  if (cur === "ore" || cur === "plasma") return mass(v);
  if (cur === "energy") return si(v, "J");
  if (cur === "data") return si(v, "B");
  return count(v);
}
const curName = (cur: string) => UI.res[cur];

// ---------- uložení ----------
function save() { s.last = Date.now(); try { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); } catch {} }
function load(): State {
  try { const raw = localStorage.getItem(SAVE_KEY); if (raw) return migrate(JSON.parse(raw)); } catch {}
  return newState();
}

// ---------- start ----------
export function start() {
  s = load();
  preload();
  (window as any).sepot = { get s() { return s; }, E, MECH, inp };   // ladicí přístup z konzole
  setFx(s.opt.fx !== 0);
  view = chOf(s).view;
  buildShell();
  E.on(onEvent);
  const away = (Date.now() - s.last) / 1000;
  const off = s.t > 5 ? E.offline(s, away) : null;
  MECH[s.ch].reset();
  if (!s.story["intro" + s.ch]) setTimeout(showIntro, img("intro1") ? 0 : 600);
  else if (off) showOffline(off);
  resize(); addEventListener("resize", resize);
  setInterval(save, 10000); addEventListener("beforeunload", save);
  document.addEventListener("visibilitychange", () => { if (document.hidden) save(); });
  // když je karta skrytá, jádro běží pomalu po sekundách (mechanika stojí)
  setInterval(() => { if (document.hidden) E.tick(s, 1); }, 1000);
  let last = performance.now(), uiT = 0;
  const loop = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; T += dt;
    if (!document.hidden) {
      const interactive = view === chOf(s).view && trans <= 0;
      MECH[s.ch].update(s, dt, interactive ? inp : { ...inp, down: false });
      E.tick(s, dt);
      fxUpdate(dt);
      if (trans > 0) { trans -= dt; if (trans <= 0) afterTransition(); }
      render();
      uiT -= dt;
      if (uiT <= 0) { uiT = 0.25; updateUI(); }
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

// ---------- kostra DOM ----------
function buildShell() {
  const cv = $("scene") as HTMLCanvasElement;
  const toV = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left - geo.ox) / geo.sx, (e.clientY - r.top - geo.oy) / geo.sx]; };
  cv.addEventListener("pointermove", (e) => { const [x, y] = toV(e); inp.x = x; inp.y = y; inp.inside = true; });
  cv.addEventListener("pointerleave", () => { inp.inside = false; });
  cv.addEventListener("pointerdown", (e) => {
    const [x, y] = toV(e); inp.x = inp.px = x; inp.y = inp.py = y; inp.down = true;
    cv.setPointerCapture(e.pointerId);
    if (view !== chOf(s).view) { const m = missionAt(s, view, x, y); if (m) { setTab("map"); flash("mis_" + m); } return; }
    MECH[s.ch].down?.(s, inp);
    Audio.ping("chime", 520, 0.006, 0.5);
  });
  const up = () => { if (!inp.down) return; inp.down = false; MECH[s.ch].up?.(s, inp); };
  cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
  // dock
  $("dockTog").onclick = () => { dockOpen = !dockOpen; document.body.classList.toggle("dockclosed", !dockOpen); resize(); };
  for (const t of ["build", "research", "map", "detail"]) {
    const b = h("button", "tab", `<span>${UI.tabs[t]}</span><i class="dot"></i>`); b.dataset.t = t;
    b.onclick = () => setTab(t); $("tabs").appendChild(b);
  }
  // žebřík
  VIEWS.forEach((v, i) => { const b = h("button", "", UI.ladder[i]); b.dataset.v = v; b.onclick = () => setView(v); $("ladder").appendChild(b); });
  $("kblock").onclick = showK;
  $("setBtn").onclick = showSettings;
  $("sndBtn").onclick = () => { s.opt.sound = !s.opt.sound; Audio.setSound(s.opt.sound, s.ch >= 1); $("sndBtn").classList.toggle("on", s.opt.sound); };
  $("modalOk").onclick = () => closeModal(true);
  $("modalCancel").onclick = () => closeModal(false);
  $("detClose").onclick = () => setTab("build");
  setTab("build");
}

function resize() {
  const cv = $("scene") as HTMLCanvasElement;
  DPR = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight;
  cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
  const left = W > 900 ? 330 : 0, right = W > 900 ? (dockOpen ? 400 : 44) : 0, top = 64, bottom = 58;
  const aw = W - left - right, ah = H - top - bottom;
  const sx = Math.min(aw / VW, ah / VH) * 1.08;
  geo = { sx, ox: left + (aw - VW * sx) / 2, oy: top + (ah - VH * sx) / 2 };
}

// ---------- vykreslení scény ----------
function render() {
  const cv = $("scene") as HTMLCanvasElement, c = cv.getContext("2d")!;
  c.setTransform(DPR, 0, 0, DPR, 0, 0);
  background(c, W, H, DPR, s.ch);
  let k = 1, alpha = 1;
  if (trans > 0) { const f = 1 - trans / 3.2; k = 1 - 0.75 * f * f; alpha = Math.max(0, 1 - f * 1.2); }
  c.setTransform(DPR * geo.sx * k, 0, 0, DPR * geo.sx * k, DPR * (geo.ox + (VW * geo.sx * (1 - k)) / 2), DPR * (geo.oy + (VH * geo.sx * (1 - k)) / 2));
  c.globalAlpha = alpha;
  setLabelScale(geo.sx * k);
  const passive = view !== chOf(s).view, V = { T, sx: geo.sx * k, passive, fx: s.opt.fx };
  if (view === "body") kamen.draw(c, s, { ...V, passive: s.ch !== 1 || passive }, inp);
  else if (view === "star") { if (s.ch >= 3) drawRemnant(c, T); else hvezda.draw(c, s, { ...V, passive: s.ch !== 2 || passive }, inp); }
  else if (view === "system") drawSystem(c, s, T);
  else if (view === "near") drawNear(c, s, T);
  else if (view === "galaxy") galaxie.draw(c, s, { ...V, passive: s.ch !== 3 || passive }, inp);
  if (["system", "near", "galaxy"].includes(view)) {
    hoverMis = missionAt(s, view, inp.x, inp.y);
    drawMissions(c, s, view, T, geo.sx, hoverMis);
  }
  if (!passive) fxDraw(c, geo.sx);
  c.globalAlpha = 1;
  const cur = passive ? (hoverMis ? "pointer" : "default") : MECH[s.ch].cursor?.(s, inp) || "crosshair";
  if (cv.style.cursor !== cur) cv.style.cursor = cur;
  if (tab === "detail") drawDetail($("detc") as HTMLCanvasElement, s, T);
}

// ---------- pohledy ----------
function viewOpen(v: string) {
  if (v === "body" || v === "system") return true;
  if (v === "star") return s.ch >= 2;
  if (v === "near") return s.ch >= 3 || (s.ch === 2 && s.stage >= 2);
  if (v === "galaxy") return s.ch >= 3;
  return false;
}
function setView(v: string) {
  if (!viewOpen(v)) return;
  view = v;
  if (v !== chOf(s).map && v !== "near" && tab === "map") setTab("build", true);
}
function setTab(t: string, keepView = false) {
  tab = t;
  document.querySelectorAll("#tabs .tab").forEach((b: any) => b.classList.toggle("on", b.dataset.t === t));
  $("detail").hidden = t !== "detail";
  s.seen["tab_" + t] = s.t;
  if (!keepView) {
    if (t === "map") { const ids = chOf(s).missions.filter((m) => E.mVisible(s, m.id) && !s.mis[m.id]).map((m) => MMAP[m.id].view); view = ids[0] || chOf(s).map; }
    else if (t === "build") view = chOf(s).view;
  }
  listKey = "";
  updateUI();
}

// ---------- obnova DOM (4× za s, karty se staví jen při změně seznamu) ----------
let listKey = "";
function updateUI() {
  const C = chOf(s), X = tx(s.ch), P = E.power(s);
  // horní lišta
  $("kval").textContent = `K ${fixed(E.K(P), 2)}`;
  $("kpow").textContent = si(P, "W");
  const resList: [string, number, number][] = [[C.cur, s.res[C.cur], E.RT.rate[C.cur]], ["energy", s.res.energy, P], ["data", s.res.data, E.dataRate(s)]];
  $("res").innerHTML = resList.map(([k, v, r]) => `<div class="chip"><span class="l">${curName(k)}</span><span class="v mono">${fmtCur(k, v)}</span><span class="r mono">+${fmtCur(k, r)}/s</span></div>`).join("");
  // levý panel
  const st = Math.min(s.stage, stagesOf(s)), names = X.stages;
  $("chTitle").textContent = X.title;
  $("stName").textContent = `${UI.stage} ${Math.min(st + 1, stagesOf(s))}/${stagesOf(s)} · ${names[st]}`;
  if (!E.finalReady(s)) {
    const goal = stageGoal(s), prev = s.stage > 0 ? stageGoal(s, s.stage - 1) : s.ch === 1 ? 500 : s.base;
    const f = Math.max(0, Math.min(1, Math.log(P / prev) / Math.log(goal / prev)));
    $("goalBar").style.width = `${f * 100}%`;
    $("goalTxt").textContent = `${UI.goal}: ${si(goal, "W")}`;
    $("goalNeed").textContent = UI.needMore(times(goal / P));
  } else {
    const fin = C.research.find((r) => r.final)!;
    $("goalBar").style.width = "100%";
    $("goalTxt").textContent = UI.stageDone;
    $("goalNeed").textContent = UI.finalHint(find("r", fin.id).n);
  }
  $("indic").innerHTML = indicator();
  $("stats").innerHTML = statRows().map(([l, v]) => `<dt>${l}</dt><dd class="mono">${v}</dd>`).join("");
  $("hint").textContent = view === C.view ? X.hint[s.stage >= C.lvl2 ? 1 : 0] : "";
  $("hint").hidden = view !== C.view || s.chT > 900 && s.stage >= C.lvl2 + 1;
  journal();
  // žebřík
  document.querySelectorAll("#ladder button").forEach((b: any) => { const o = viewOpen(b.dataset.v); b.disabled = !o; b.classList.toggle("on", b.dataset.v === view); b.title = o ? "" : UI.locked; });
  // tečky na záložkách
  const newer = (pre: string) => Object.entries(s.unl).some(([k, t]) => k.startsWith(pre) && t > (s.seen["tab_" + ({ b_: "build", r_: "research", m_: "map" } as any)[pre]] ?? -1));
  const dots: Record<string, boolean> = { build: newer("b_"), research: newer("r_") || C.research.some((r) => E.rVisible(s, r.id) && !s.r[r.id] && s.res.data >= r.cost), map: newer("m_") };
  document.querySelectorAll("#tabs .tab").forEach((b: any) => b.classList.toggle("new", !!dots[b.dataset.t] && b.dataset.t !== tab));
  // obsah docku
  if (tab === "build") buildList(); else if (tab === "research") researchList(); else if (tab === "map") missionList(); else detailText();
}

function indicator() {
  const X = tx(s.ch);
  if (s.ch === 1) {
    const li = layerIdx(s);
    return `<div class="ind"><span>Hloubka řezu</span><b>${(X as any).layer[li]}</b><small>Ruda za řez ×${count(oreMult(s))}</small></div>`;
  }
  if (s.ch === 2) {
    const cv = coverage(s);
    return `<div class="ind"><span>${X.indicator}</span><b class="mono">${pct(cv)}</b><div class="bar"><b style="width:${Math.max(0.5, ((Math.log10(Math.max(cv, 1e-14)) + 14) / 14) * 100)}%"></b></div><small>Kolektory: ${count(s.n)}</small></div>`;
  }
  const so = starsOn(s).v;
  return `<div class="ind"><span>${X.indicator}</span><b class="mono">${count(so)} z 100 G</b><div class="bar"><b style="width:${Math.max(0.5, ((Math.log10(Math.max(so, 1)) - 4) / 7) * 100)}%"></b></div><small>Kolonie: ${colCount(s)} · zachycení světla ${pct(capture(s))}</small></div>`;
}
function statRows(): [string, string][] {
  const C = chOf(s), rows: [string, string][] = [[UI.power, si(E.power(s), "W")]];
  rows.push([`${curName(C.cur)}${UI.perSec}`, fmtCur(C.cur, E.RT.rate[C.cur])]);
  rows.push([`${UI.res.data}${UI.perSec}`, si(E.dataRate(s), "B")]);
  if (s.run) rows.push(["Vesper", `${find("m", s.run.id).n} · ${duration(s.run.left)}`]);
  return rows;
}

// ---------- deník ----------
let logLen: any = -1;
function journal() {
  const k = s.log.length + ":" + (s.log[s.log.length - 1]?.t ?? 0);
  if (logLen === k) return;
  logLen = k;
  const box = $("log"); box.innerHTML = "";
  let first = true;
  for (const e of s.log.slice(-40).reverse()) {
    const t = find("jour", e.k); if (!t) continue;
    const d = h("div", "entry " + e.kind + (first && s.t - e.t < 3 ? " new" : "")); first = false;
    if (e.kind === "report") d.innerHTML = `<b>${UI.report}</b>${t}`; else d.textContent = t;
    box.appendChild(d);
  }
}

// ---------- karty staveb ----------
const rows: Record<string, any> = {};
function effect(id: string): string {
  const d = BMAP[id];
  if (d.kind === "gen" && s.ch === 1) return `+${si(genW(s, id), "W")} každý`;
  if (d.kind === "gen") return `+${mass(prodRate(s, id) * plasmaMult(s))}/s každý`;
  if (d.kind === "data") return `+${si(d.d! * mile(cnt(s, id)) * chOf(s).dataMult(s), "B")}/s každý`;
  if (d.kind === "swarm") return `+${si(L_ALDRA * colArea(s) * salvo(s), "W")} za salvu ${count(salvo(s))}`;
  if (d.kind === "unit") return `${count(cnt(s, id))} pracuje`;
  return find("b", id)?.d || "";
}
function buildList() {
  const C = chOf(s);
  const ids = C.build.filter((b) => E.unlocked(s, b.id)).sort((a, b) => (s.unl["b_" + b.id] ?? 0) - (s.unl["b_" + a.id] ?? 0) || C.build.indexOf(b) - C.build.indexOf(a)).map((b) => b.id);
  const autos: [string, string][] = [];
  if (s.ch === 1 && cnt(s, "dock")) autos.push(["dock", UI.autoDock]);
  if (s.ch === 1 && s.r.assembly) autos.push(["assembly", UI.autoAsm]);
  if (s.ch === 2 && cnt(s, "fact")) autos.push(["fact", UI.autoFact]);
  const key = "b" + s.ch + ids.join(",") + "|" + autos.map((a) => a[0]).join(",") + buyN;
  const box = $("dockBody");
  if (key !== listKey) {
    listKey = key; box.innerHTML = "";
    const bar = h("div", "buybar");
    for (const k of [1, 10, 0]) { const b = h("button", buyN === k ? "on" : "", k ? `×${k}` : UI.max); b.onclick = () => { buyN = k; listKey = ""; updateUI(); }; bar.appendChild(b); }
    box.appendChild(bar);
    for (const [id, label] of autos) {
      const r = h("div", "auto"); const b = h("button", "tog"); b.onclick = () => { s.auto[id] = s.auto[id] === false; };
      r.append(h("span", "", label), b); rows["auto_" + id] = b; box.appendChild(r);
    }
    for (const id of ids) {
      const d = BMAP[id], t = find("b", id);
      const r = h("div", "row" + (d.tier === 2 ? " t2" : "") + (d.kind === "up" ? " up" : ""));
      r.innerHTML = `<div class="nm"><b>${t.n}</b><small class="eff"></small></div><span class="cnt mono"></span>`;
      const b = h("button", "buy"); b.onclick = () => {
        const k = d.kind === "swarm" ? Math.max(1, buyN || E.maxAfford(s, id)) : buyN || E.maxAfford(s, id);
        if (E.buy(s, id, Math.max(1, k))) Audio.ping("chime", 660, 0.012, 1);
        updateUI();
      };
      b.title = t.d; r.appendChild(b); rows[id] = { r, b, eff: r.querySelector(".eff"), cnt: r.querySelector(".cnt") };
      box.appendChild(r);
    }
  }
  for (const [id] of autos) { const b = rows["auto_" + id]; const on = s.auto[id] !== false; b.textContent = on ? UI.autoOn : UI.autoOff; b.classList.toggle("on", on); }
  for (const id of ids) {
    const d = BMAP[id], R = rows[id]; if (!R) continue;
    const mx = E.maxed(s, id), lvl = cnt(s, id);
    R.cnt.textContent = d.kind === "swarm" ? count(s.n) : d.max != null ? `${lvl}/${d.max}` : count(lvl);
    R.eff.textContent = effect(id);
    if (mx) { R.b.textContent = UI.maxed; R.b.disabled = true; continue; }
    const k = Math.max(1, buyN || E.maxAfford(s, id)), c = E.costN(s, id, k);
    R.b.innerHTML = `${k > 1 ? `×${k} ` : ""}<span class="mono">${fmtCur(d.cur, c)}</span>`;
    R.b.disabled = s.res[d.cur] < c;
  }
}
function researchList() {
  const C = chOf(s), vis = C.research.filter((r) => E.rVisible(s, r.id));
  const open = vis.filter((r) => !s.r[r.id]).sort((a, b) => (s.unl["r_" + b.id] ?? 0) - (s.unl["r_" + a.id] ?? 0));
  const done = vis.filter((r) => s.r[r.id]);
  const key = "r" + open.map((r) => r.id).join(",") + "|" + done.length;
  const box = $("dockBody");
  if (key !== listKey) {
    listKey = key; box.innerHTML = "";
    for (const r of open) {
      const t = find("r", r.id), card = h("div", "card" + (r.final ? " final" : "") + (r.lvl2 ? " lvl2" : ""));
      card.innerHTML = `<b>${t.n}</b><p>${t.d}</p>`;
      const b = h("button", "buy"); b.onclick = () => { if (E.doResearch(s, r.id)) Audio.chime(); updateUI(); };
      card.appendChild(b); rows["r_" + r.id] = b; box.appendChild(card);
    }
    if (done.length) {
      const d = h("details", "done"); d.innerHTML = `<summary>${UI.researchDone} (${done.length})</summary>` + done.map((r) => `<div><b>${find("r", r.id).n}</b> – ${find("r", r.id).d}</div>`).join("");
      box.appendChild(d);
    }
  }
  for (const r of open) { const b = rows["r_" + r.id]; b.innerHTML = `<span class="mono">${si(r.cost, "B")}</span>`; b.disabled = s.res.data < r.cost; }
}
function missionList() {
  const C = chOf(s), vis = C.missions.filter((m) => E.mVisible(s, m.id));
  const open = vis.filter((m) => !s.mis[m.id]).sort((a, b) => (s.unl["m_" + b.id] ?? 0) - (s.unl["m_" + a.id] ?? 0));
  const done = vis.filter((m) => s.mis[m.id]);
  const key = "m" + open.map((m) => m.id).join(",") + "|" + done.length + (s.run?.id || "");
  const box = $("dockBody");
  if (key !== listKey) {
    listKey = key; box.innerHTML = "";
    for (const m of open) {
      const t = find("m", m.id), card = h("div", "card mis"); card.id = "mis_" + m.id;
      card.innerHTML = `<b>${t.n}</b><small>${t.p}</small><p>Odměna: ${t.r}</p><div class="pbar"><b></b></div>`;
      const b = h("button", "buy"); b.onclick = () => { if (E.startMission(s, m.id)) { Audio.ping("chime", 440, 0.02, 2); view = m.view; } updateUI(); };
      card.onmouseenter = () => { view = m.view; };
      card.appendChild(b); rows["m_" + m.id] = { b, bar: card.querySelector(".pbar b"), card }; box.appendChild(card);
    }
    if (done.length) {
      const d = h("details", "done"); d.innerHTML = `<summary>${UI.missionsDone} (${done.length})</summary>` + done.map((m) => `<div><b>${find("m", m.id).n}</b> – ${find("m", m.id).r}</div>`).join("");
      box.appendChild(d);
    }
  }
  for (const m of open) {
    const R = rows["m_" + m.id], run = s.run?.id === m.id;
    R.bar.parentElement.hidden = !run;
    if (run) { R.bar.style.width = `${(1 - s.run!.left / s.run!.dur) * 100}%`; R.b.textContent = `${UI.running} · ${duration(s.run!.left)}`; R.b.disabled = true; continue; }
    R.b.innerHTML = s.run ? UI.busy : `${UI.send} · <span class="mono">${si(m.cost, "J")}</span> · ${duration(m.dur)}`;
    R.b.disabled = !!s.run || s.res.energy < m.cost;
  }
}
function detailText() {
  const key = "d" + s.ch + s.stage;
  const box = $("dockBody");
  if (key === listKey) return;
  listKey = key; box.innerHTML = "";
  const X = tx(s.ch);
  const list = h("div", "card");
  list.innerHTML = `<b>${UI.detail[s.ch]}</b><p>${X.stages.map((n, i) => (i === s.stage ? `<b>▶ ${n}</b>` : i < s.stage ? `<span class="dim">✓ ${n}</span>` : `<span class="dim">· ${n}</span>`)).join("<br>")}</p>`;
  box.appendChild(list);
}
function flash(id: string) { setTimeout(() => { const e = document.getElementById(id); if (e) { e.scrollIntoView({ block: "nearest" }); e.classList.add("flash"); setTimeout(() => e.classList.remove("flash"), 1200); } }, 50); }

// ---------- události ----------
function onEvent(e: { type: string; id?: string; v?: any }) {
  if (e.type === "stage") { toast(`${tx(s.ch).stages[s.stage] ?? ""}`); Audio.chime(); }
  if (e.type === "mdone") { toast(`${find("m", e.id!).n}: ${find("m", e.id!).r}`); Audio.chime(); }
  if (e.type === "journal") { logLen = -1; Audio.ping("chime", 990, 0.008, 2); }
  if (e.type === "final") startTransition();
  if (e.type === "theend") modal(UI.theEnd, `<p>${UI.theEndBody}</p>`, false);
}
function startTransition() {
  if (s.ch >= 3) { s.done = 3; modal(tx(3).stages[5], `<p>${UI.theEndBody}</p>`, false); return; }
  trans = 3.2; Audio.boom();
}
function afterTransition() {
  E.archiveData(s); E.nextChapter(s);
  fxClear(); MECH[s.ch].reset(); view = chOf(s).view; listKey = ""; logLen = -1;
  document.body.dataset.ch = String(s.ch);
  setTab("build"); save(); showIntro();
}

// ---------- okna ----------
let modalCb: ((ok: boolean) => void) | null = null;
function modal(title: string, html: string, cancel: boolean, cb?: (ok: boolean) => void, okText = UI.ok) {
  $("modalTitle").textContent = title; $("modalBody").innerHTML = html;
  $("modalOk").textContent = okText; $("modalCancel").hidden = !cancel; $("modalCancel").textContent = UI.cancel;
  $("modal").hidden = false; modalCb = cb || null;
}
function closeModal(ok: boolean) { $("modal").hidden = true; const cb = modalCb; modalCb = null; cb?.(ok); }
function showIntro() {
  const X = tx(s.ch);
  const pic = img(("intro" + s.ch) as ImgKey);
  modal(X.intro.h, (pic ? `<img class="intro" src="${imgSrc(("intro" + s.ch) as ImgKey)}" alt="">` : "") + `<p class="chap">${X.title}</p>` + X.intro.p.map((p) => `<p>${p}</p>`).join(""), false, () => { s.story["intro" + s.ch] = 1; save(); });
}
function showOffline(o: { sec: number; out: [string, number][] }) {
  modal(UI.offline, `<p>${duration(o.sec)} · ${UI.offlineNote}</p><table>${o.out.map(([k, v]) => `<tr><td>${curName(k)}</td><td class="mono">+${fmtCur(k, v)}</td></tr>`).join("")}</table>`, false);
}
function showK() {
  const P = E.power(s);
  const items = KTYPES.filter((t) => t.ch <= s.ch).map((t) => `<li${P >= t.w ? ' class="ok"' : ""}>${UI.types[t.k]}</li>`).join("");
  modal(UI.ktitle, `<p>${UI.kbody}</p><p class="mono big">K ${fixed(E.K(P), 2)} · ${si(P, "W")}</p><ul class="kt">${items}</ul><p class="dim">${UI.kmore}</p>`, false);
}
function showSettings() {
  modal(UI.settings, `
    <div class="set"><label><input type="checkbox" id="optFx" ${s.opt.fx !== 0 ? "checked" : ""}> ${UI.effects}</label></div>
    <div class="set"><label>${UI.volume} <input type="range" id="optVol" min="0" max="1" step="0.05" value="${s.opt.vol}"></label></div>
    <div class="set row"><button class="btn" id="expBtn">${UI.export}</button><button class="btn" id="impBtn">${UI.import}</button><button class="btn danger" id="resBtn">${UI.reset}</button></div>
    <textarea id="saveTxt" rows="3" placeholder="…"></textarea>
    <p class="dim mono">${VERSION}</p>`, false, undefined, UI.close);
  ($("optFx") as HTMLInputElement).onchange = (e: any) => { s.opt.fx = e.target.checked ? 1 : 0; setFx(!!s.opt.fx); };
  ($("optVol") as HTMLInputElement).oninput = (e: any) => { s.opt.vol = +e.target.value; Audio.setVolumes({ master: s.opt.vol }); };
  $("expBtn").onclick = () => { const t = encodeSave(s); ($("saveTxt") as HTMLTextAreaElement).value = t; navigator.clipboard?.writeText(t).then(() => toast(UI.copied)).catch(() => {}); };
  $("impBtn").onclick = () => { const st = decodeSave(($("saveTxt") as HTMLTextAreaElement).value); if (!st) { toast(UI.bad); return; } s = st; save(); location.reload(); };
  $("resBtn").onclick = (e: any) => {   // potvrzení druhým kliknutím (okno confirm v sandboxu nejde)
    if (e.target.dataset.sure) { localStorage.removeItem(SAVE_KEY); s = newState(); location.reload(); return; }
    e.target.dataset.sure = "1"; e.target.textContent = UI.resetConfirm;
  };
}
let toastT = 0;
function toast(t: string) {
  const el = $("toast"); el.textContent = t; el.hidden = false;
  clearTimeout(toastT); toastT = window.setTimeout(() => (el.hidden = true), 3200);
}
void GEN1; void colCost; void capture; void RMAP;
