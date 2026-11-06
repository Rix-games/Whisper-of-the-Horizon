import { cs } from '../i18n/cs.js';
import { t } from '../i18n/index.js';
import { type BuildingId, type LocationId, type Res, type ResearchId, HOLE, PHASES, B, BUILDING_IDS, EVENTS, L, LOCATION_IDS, PRESTIGE, R, RESEARCH_IDS, RESOURCES, STAGES, STAR, stage } from '../core/defs.js';
import { injEmitters, VENT, VENT_IDS, VENT_UPS, type VentUp, blobPos, flares, pulsePhase, ventBurst, ventTank, ventTankKg, ventFill, ventFlow, ventShare, ventCanBurst, ventCap, ventChainMax, ventChainMult, ventFlight, ventHeatMult, ventKg, ventLv, ventOpen, ventOverMult, ventR, ventRelease, ventStep, ventUpCost, ventUpgrade, diskEta, feedRate, gamma, holeL, iscoR, jetCov, jetP, phaseDef, phaseReady, advancePhase, ringCov, spinEq, stationR, CONVERTERS, LAST_STAGE, advanceStage, affordable, buy, canRebuild, canTravel, checkJournal, claimEvent, clickPower, clockYears, consOf, cost, coverage, depart, doResearch, isUnlocked, kardashev, liftJ, locationOpen, luminosity, makesOf, mine, offlineGain, powerW, prestigeGain, prestigeMult, previewMax, prodOf, rateParts, rates, rebuild, redLoss, researchAvailable, sell, stageByMetal, stageDef, stageNeed, stageReady, tick, travelTime } from '../core/engine.js';
import { decodeSave, encodeSave, migrate, newState } from '../core/state.js';
import { bytes, duration, energy, kValue, mass, num, power, sci } from '../core/format.js';
import { drawHole, drawHoleMap, drawProfile, drawScene, holeMapHit, sceneGeom, type HoleView, type SceneView } from './hole.js';
import { drawMap, drawRock, drawSection, drawStar, drawStars, hitRock, label, sizeStars } from './scene.js';
import { boom, chime, setSound, setVolumes, vols } from './audio.js';

export const PRESTIGE_UNIT = PRESTIGE.metalUnit;
export const PRESTIGE_PER_ORDER = PRESTIGE.perOrder;
export const VOL_KEYS = ["noise", "melody", "game"];
export const VOL_DEFAULT = { noise: 0.7, melody: 1, game: 1 };
export const volOf = (k) => S.settings.vol?.[k] ?? VOL_DEFAULT[k];
export const audioVols = () => ({ noise: volOf("noise"), drone: volOf("noise"), melody: volOf("melody"), pulse: volOf("game"), chime: volOf("game") });
export const VERSION = "0.3.1";
export const KEY = "sepot-horizontu";
type El = HTMLElement & Record<string, any>;
export const $ = (id: string): El => document.getElementById(id) as El;
export const SUP2 = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "−" };
export const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (m) => `<sup>${[...m].map((ch) => SUP2[ch]).join("")}</sup>`).replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => `<span class="exp">${m}</span>`).replace(/(?<=\d)[   ](?=\d{3}(?!\d))/g, '<span class="ts"> </span>');
export let S;
export let tab: string = "build";
export let buyMax: number | true = 1;
export let viewKey = "";
export let lastActive = Date.now();
export const COLOR = { ore: "var(--ore)", metal: "var(--metal)", energy: "var(--energy)", data: "var(--data)", plasma: "var(--plasma)" };
export const UNIT = { ore: "kg", metal: "kg", energy: "J", data: "B", plasma: "kg" };
export function amount(r, v) {
  return r === "energy" ? energy(v) : r === "data" ? bytes(v) : mass(v);
}
export function rate(r, v) {
  return r === "energy" ? power(v) : (r === "data" ? bytes(v) : mass(v)) + "/s";
}
export function costHTML(c) {
  return `<span class="lbl">${esc(t("ui.price"))}</span>` + Object.keys(c).map((r) => `<span class="${S.res[r] >= c[r] ? "" : "no"}"><span style="color:${COLOR[r]}">${t("res." + r)}</span> ${esc(amount(r, c[r]))}</span>`).join("");
}
export function times(f) {
  const v = Math.max(1, f);
  return v < 10 ? dec(v, 1) : v < 1e6 ? Math.round(v).toLocaleString("cs-CZ") : sci(v, 1);
}
export const plural = (n, one, few, many) => n === 1 ? one : n >= 2 && n <= 4 && Number.isInteger(n) ? few : many;
export const dec = (v, d) => v.toFixed(d).replace(".", ",");
export function years(y) {
  if (y >= 1e6) return `${dec(y / 1e6, y >= 1e7 ? 1 : 2)} mil. let`;
  if (y >= 1) {
    const n = y >= 1e3 ? Number(y.toPrecision(3)) : y >= 10 ? Math.round(y) : Math.round(y * 10) / 10;
    return `${n.toLocaleString("cs-CZ")} ${Number.isInteger(n) ? plural(n, "rok", "roky", "let") : "roku"}`;
  }
  const d = y * 365.25;
  if (d >= 45) {
    const n = Math.round(d / 30.44);
    return `${n} ${plural(n, "měsíc", "měsíce", "měsíců")}`;
  }
  if (d >= 1) {
    const n = Math.round(d);
    return `${n} ${plural(n, "den", "dny", "dní")}`;
  }
  const sec = d * 86400;
  if (sec >= 3600) return `${dec(sec / 3600, sec >= 36e3 ? 0 : 1)} h`;
  if (sec >= 60) return `${Math.round(sec / 60)} min`;
  return `${Math.max(1, Math.round(sec))} s`;
}
export function starLeft() {
  const st = S.star.stage, d = STAGES[st];
  let y = d.years * (1 - Math.min(1, S.star.t / d.sec));
  for (let i = st + 1; i < STAGES.length; i++) y += STAGES[i].years;
  return y;
}
export const stageName = (i) => t(`ui.stages.${STAGES[i]?.id ?? "nova"}.name`);
export function save(silent = true) {
  S.last = Date.now();
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
    if (!silent) toast(t("ui.settings.saved", { t: (/* @__PURE__ */ new Date()).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }) }));
    return true;
  } catch {
    if (!silent) toast(t("ui.settings.saveFail"));
    return false;
  }
}
export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? migrate(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}
export function applyOffline(sec) {
  if (sec < 30) return;
  const got = offlineGain(S, sec);
  const list = Object.keys(got).filter((r) => got[r] >= 1).map((r) => `${t("res." + r)} +${amount(r, got[r])}`).join("\n");
  if (list) S.log.unshift({ key: "ui.offline", kind: "sys", day: Math.floor(S.time) + 1, vars: { t: duration(sec), list } });
}
export let toastTimer;
export function toast(msg, ms = 2600) {
  const el = $("toast");
  el.innerHTML = esc(msg);
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    el.hidden = true;
  }, ms);
}
export function flashGain(r, v) {
  const chip = document.querySelector<El>(`.chip[data-res="${r}"]`);
  if (!chip) return;
  chip.classList.remove("gain");
  void chip.offsetWidth;
  chip.classList.add("gain");
  const f = document.createElement("span");
  f.className = "float gainfloat";
  f.innerHTML = esc("+" + amount(r, v));
  f.style.color = COLOR[r];
  chip.appendChild(f);
  setTimeout(() => f.remove(), 1600);
}
export function showTip(target) {
  const u = target.dataset.unit;
  const tip = $("tip");
  tip.innerHTML = `<b>${esc(t(`unit.${u}.name`))}</b>${esc(t(`unit.${u}.text`))}` + (target.dataset.res ? breakdownHTML(target.dataset.res) : "");
  tip.hidden = false;
  const r = target.getBoundingClientRect(), w = tip.offsetWidth;
  tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left)) + "px";
  tip.style.top = r.bottom + 8 + "px";
}
export function hideTip() {
  $("tip").hidden = true;
}
export function breakdownHTML(r) {
  const { prod, cons } = rateParts(S, r);
  if (!prod.length && !cons.length) return "";
  const name = (k) => k === "reactor" || k === "auto" ? t("ui.breakdown." + k) : t(`b.${k}.name`);
  const line = (k, v, sign) => `<span class="bd"><span>${esc(name(k))}</span><span class="mono">${sign}${esc(rate(r, v))}</span></span>`;
  const p = prod.reduce((a, [, v]) => a + v, 0), c = cons.reduce((a, [, v]) => a + v, 0), net = p - c;
  let h = `<span class="bdh">${esc(t("ui.breakdown.prod"))}</span>` + prod.map(([k, v]) => line(k, v, "+")).join("");
  if (cons.length) h += `<span class="bdh">${esc(t("ui.breakdown.cons"))}</span>` + cons.map(([k, v]) => line(k, v, "−")).join("");
  h += `<span class="bd total"><span>${esc(t("ui.breakdown.net"))}</span><span class="mono">${net >= 0 ? "+" : "−"}${esc(rate(r, Math.abs(net)))}</span></span>`;
  return `<span class="bdbox">${h}</span>`;
}
export let chipKey = "";
export function renderTop() {
  const k = kardashev(S), P = powerW(S);
  $("kval").textContent = k < 0 ? t("ui.kBelow") : "K " + kValue(k);
  $("kpow").innerHTML = esc(power(P));
  if (!S.chapterDone) {
    $("kprogLabel").innerHTML = esc(k >= 1 ? t("ui.toTypeIdone") : t("ui.toTypeI", { n: times(1e16 / powerW(S)) }));
    $("kbar").style.width = Math.max(0, Math.min(100, (k + 0.35) / 1.35 * 100)).toFixed(1) + "%";
  } else if (!S.star.done) {
    const two = k >= 2, Lw = luminosity(S), kL = (Math.log10(Lw) - 6) / 10;
    $("kprogLabel").innerHTML = esc(two ? t("ui.toFullStar", { n: times(Lw / powerW(S)) }) : t("ui.toTypeII", { n: times(1e26 / powerW(S)) }));
    $("kbar").style.width = (two ? Math.max(0, Math.min(100, (k - 2) / (kL - 2) * 100)) : Math.max(0, Math.min(100, (k - 1) * 100))).toFixed(1) + "%";
  } else if (!S.hole.done) {
    const d = phaseDef(S), kT = (Math.log10(d.needW) - 6) / 10, k0 = S.hole.phase ? (Math.log10(PHASES[S.hole.phase - 1].needW) - 6) / 10 : 0.3;
    $("kprogLabel").innerHTML = esc(P >= d.needW ? t("ui.toPhaseDone") : t("ui.toPhase", { k: kValue(kT), n: times(d.needW / P) }));
    $("kbar").style.width = Math.max(0, Math.min(100, (k - k0) / (kT - k0) * 100)).toFixed(1) + "%";
  } else {
    $("kprogLabel").textContent = t("ui.toNext");
    $("kbar").style.width = "100%";
  }
  const shown = RESOURCES.filter((r) => !(r === "ore" && S.chapterDone >= 1) && !(r === "metal" && S.star.done) && (r === "ore" || S.total[r] > 0));
  const key = shown.join();
  const bar = $("resbar");
  if (key !== chipKey) {
    chipKey = key;
    bar.innerHTML = shown.map((r) => `<button class="chip" data-unit="${UNIT[r]}" data-res="${r}" aria-describedby="tip"><span class="k"><i style="background:${COLOR[r]}"></i>${t("res." + r)}</span><span class="v" data-v="${r}"></span><span class="r" data-r="${r}"></span></button>`).join("");
  }
  const { p, c } = rates(S);
  for (const r of shown) {
    bar.querySelector<El>(`[data-v="${r}"]`).innerHTML = esc(amount(r, S.res[r]));
    const net = p[r] - c[r], el = bar.querySelector<El>(`[data-r="${r}"]`);
    el.innerHTML = esc((net >= 0 ? "+" : "−") + rate(r, Math.abs(net)).replace(/\/s$/, "") + (r === "energy" ? "" : t("ui.perSec")));
    el.classList.toggle("neg", net < 0);
  }
  if (S.chapterDone >= 1 && !S.star.done) {
    $("clockDay").innerHTML = esc(S.star.collapse >= 0 ? t("ui.star.countdown", { t: duration(S.star.collapse) }) : t("ui.starAge", { t: years(starLeft()) }));
    $("clockScale").textContent = t("ui.clockYears", { t: years(clockYears(S)) });
  } else {
    $("clockDay").innerHTML = esc(t("ui.day", { n: (Math.floor(S.time) + 1).toLocaleString("cs-CZ") }));
    $("clockScale").textContent = S.star.done ? t("ui.outside", { t: years(S.yrs ?? 0) }) : t("ui.clockScale");
    $("clockDay").title = S.star.done ? t("ui.outsideTip") : "";
  }
}
const HOLE_CONV: BuildingId[] = ["injector", "station", "hawking"];
const CH3_LOCS: LocationId[] = ["cas", "oort", "lens", "pulsar", "tde", "cloud", "pole", "dwarf", "ergo", "stream"];
export const STAR_BUILDINGS2 = ["sieve", "corono", "lifter", "separator", "seismo", "swarmfab"];
export const starView = () => ({ stage: stageDef(S).id, dyson: S.b.dyson, lifters: S.b.lifter, coverage: coverage(S), collapse: S.star.collapse, done: S.star.done, snAge: snAge() });
export function renderRig() {
  const ch2 = S.chapterDone >= 1;
  const ch3 = S.star.done;
  $("rigTitle").textContent = ch3 ? t("ui.hole.title") : ch2 ? t("ui.star.title") : t("ui.asteroid");
  document.body.classList.toggle("ch2", ch2);
  document.body.classList.toggle("ch3", ch3);
  document.body.classList.add("cv");
  const rock = $("rock");
  rock.disabled = ch2;
  rock.setAttribute("aria-label", ch2 ? t("ui.star.title") : t("ui.mineAria"));
  $("clickTag").hidden = ch2;
  $("clickTag").innerHTML = esc(t("ui.perClick", { v: mass(clickPower(S)) }));
  const hint = $("hint");
  hint.hidden = S.b.drone >= 3;
  hint.textContent = t("ui.hint");
  const rows = ch2 ? [] : [[t("ui.stats.clicks"), num(S.clicks)]];
  if (!ch2) {
    rows.push([t("ui.stats.drones"), num(Math.floor(S.b.drone))]);
    for (const id of CONVERTERS.filter((id2) => S.b[id2] >= 1)) rows.push([t(`b.${id}.name`), S.off[id] ? t("ui.stopped") : t("ui.running", { n: Math.round((S.eff[id] ?? 1) * 100) })]);
  } else if (ch3) {
    rows.push([t("ui.stats.phase"), `${S.hole.phase + 1} / ${PHASES.length}`], [t("ui.stats.spin"), spinTxt(S.hole.a)]);
    if (S.b.injector >= 1) rows.push([t("ui.stats.feed"), mass(feedRate(S)) + "/s"], [t("ui.stats.diskCov"), pct(ringCov(S))]);
    if (ventOpen(S)) {
      const v = S.vent;
      rows.push([t("ui.vent.flow"), v.over > 0 ? t("ui.vent.overShort", { s: Math.ceil(v.over) }) : mass(ventFlow(S)) + "/s"]);
      rows.push([t("ui.vent.share"), `${mass(ventFill(S))}/s · ${Math.round(ventShare(S) * 100)} %`]);
      rows.push([t("ui.vent.disk"), `${mass(v.disk ?? 0)} · ${power(holeL(S))}`]);
      rows.push([t("ui.vent.tank"), `${mass(ventTankKg(S))} · ${Math.round(ventTank(S) * 100)} %`]);
      rows.push([t("ui.vent.chain"), v.chain ? `${v.chain} · ×${dec(ventChainMult(S), 2)}` : t("ui.vent.best", { n: v.best })]);
    }
    const { p, c } = rates(S), P = powerW(S), part = (id: BuildingId) => S.b[id] ? prodOf(S, id, "energy") * S.b[id] / Math.max(1, P) : 0;
    rows.push(["§" + t("ui.prod.title"), ""]);
    rows.push([t("ui.prod.power"), power(P)]);
    for (const id of ["ring", "jet", "hawking"] as BuildingId[]) if (part(id) > 0.001) rows.push([t(`ui.prod.from.${id}`), pct(part(id))]);
    const fv = S.vent.man ?? 0, fi = feedRate(S);
    if (fv + fi > 0) {
      rows.push([t("ui.prod.fromVent"), pct(fv / (fv + fi))]);
      if (fi > 0) rows.push([t("ui.prod.fromInj"), pct(fi / (fv + fi))]);
    }
    rows.push([t("res.plasma"), `${p.plasma - c.plasma >= 0 ? "+" : "−"}${mass(Math.abs(p.plasma - c.plasma))}/s`]);
    rows.push([t("res.data"), `+${bytes(p.data - c.data)}/s`]);
    if (S.b.station >= 1) rows.push([t("ui.prod.dil"), `×${dec(gamma(S), gamma(S) >= 10 ? 0 : 1)}`]);
    rows.unshift(["§" + t("ui.prod.hole"), ""]);
    for (const id of HOLE_CONV.filter((id2) => S.b[id2] >= 1)) rows.push([t(`b.${id}.name`), S.off[id] ? t("ui.stopped") : t("ui.running", { n: Math.round((S.eff[id] ?? 1) * 100) })]);
  } else if (!S.star.done) {
    rows.push([t("ui.stats.stage"), `${S.star.stage + 1} / ${STAGES.length}`], [t("ui.stats.cov"), pct(coverage(S))]);
    for (const id of STAR_BUILDINGS2.filter((id2) => S.b[id2] >= 1)) {
      if (id === "swarmfab" && !S.off[id]) { rows.push([t(`b.${id}.name`), t("ui.fabRate", { n: num(S.fab?.made ?? 0) })]); continue; }
      rows.push([t(`b.${id}.name`), S.off[id] ? t("ui.stopped") : t("ui.running", { n: Math.round((S.eff[id] ?? 1) * 100) })]);
    }
  }
  $("stats").innerHTML = rows.map(([a, b]) => a.startsWith("§") ? `<dt class="sec">${esc(a.slice(1))}</dt>` : `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("");
  const v = $("voyage");
  if (S.travel) {
    v.hidden = false;
    v.innerHTML = `<div>${esc(t("ui.voyage.flying", { to: t(`loc.${S.travel.to}.name`) }))}</div><div class="bar"><b style="width:${(S.travel.t / S.travel.total * 100).toFixed(1)}%"></b></div><div class="mono dim" style="font-size:13px">${esc(t("ui.voyage.remaining", { t: duration(S.travel.total - S.travel.t) }))}</div>`;
  } else if (S.r.scan) {
    v.hidden = false;
    v.innerHTML = `<div>${esc(t("ui.voyage.docked", { at: t(`loc.${S.loc}.name`) }))}</div>`;
  } else v.hidden = true;
  const ev = $("event");
  if (S.event) {
    const id = S.event.id;
    if (ev.dataset.id !== id) {
      ev.dataset.id = id;
      ev.innerHTML = `<span class="name">${esc(t(`ui.events.${id}.name`))}</span><div class="bar"><b></b></div><button class="btn" data-claim="1">${esc(t(`ui.events.${id}.claim`))}</button>`;
    }
    ev.hidden = false;
    ev.querySelector<El>(".bar > b").style.width = (S.event.ttl / 20 * 100).toFixed(1) + "%";
  } else {
    ev.hidden = true;
    ev.dataset.id = "";
  }
}
export function tabsAvail() {
  const list = [["build", t("ui.tabs.build")]];
  if (S.b.lab > 0 || Object.keys(S.r).length) list.push(["research", t("ui.tabs.research")]);
  if (S.r.scan) list.push(["map", t("ui.tabs.map")]);
  if (S.star.done) list.push(["hole", t("ui.tabs.hole")]);
  else if (S.chapterDone >= 1) list.push(["star", t("ui.tabs.star")]);
  return list;
}
export function renderTabs() {
  const list = tabsAvail();
  if (!list.find(([id]) => id === tab)) tab = "build";
  const dot = RESEARCH_IDS.some((id) => researchAvailable(S, id) && affordable(S, R[id].cost));
  const hdot = phaseReady(S).ok || unseen("hole");
  const mdot = unseen("map") || LOCATION_IDS.some((id) => !S.visited[id] && locationOpen(S, id) && canTravel(S, id) && (!S.star.done || CH3_LOCS.includes(id)));

  const sdot = stageReady(S).ok || canRebuild(S) && prestigeGain(S) >= Math.max(4, S.p.pts * 0.5) || unseen("star");
  markSeen();
  const html = list.map(([id, n]) => `<button class="tab" role="tab" aria-selected="${id === tab}" data-tab="${id}">${esc(n)}${(id === "research" && dot || id === "star" && sdot || id === "hole" && hdot || id === "map" && mdot) && tab !== id ? '<span class="dot"></span>' : ""}</button>`).join("");
  const el = $("tabs");
  if (el.innerHTML !== html) el.innerHTML = html;
}
export function computeKey(which = tab) {
  if (which === "build") return "b" + BUILDING_IDS.filter((id) => isUnlocked(S, id)).join() + buyMax + ventOpen(S);
  if (which === "research") return "r" + RESEARCH_IDS.map((id) => S.r[id] ? 2 : researchAvailable(S, id) ? 1 : 0).join("");
  if (which === "map") return "m" + LOCATION_IDS.map((id) => S.visited[id] ? 1 : locationOpen(S, id) ? 0 : "-").join("") + (S.travel ? S.travel.to : "");
  if (which === "star") return `s${S.star.stage}${S.star.done}${S.star.collapse >= 0}${!!S.r.redesign}`;
  if (which === "hole") return `h${S.hole.phase}${S.hole.dive >= 0}${S.hole.done}`;
  return "s";
}
export function buildView(which = tab, el = $("view")) {
  let h = "";
  if (which === "build") {
    h += `<div class="toolbar">${esc(t("ui.buyMode"))} <span class="seg"><button data-max="1" aria-pressed="${buyMax === 1}">×1</button><button data-max="10" aria-pressed="${buyMax === 10}">×10</button><button data-max="max" aria-pressed="${buyMax === true}">Max</button></span></div><div class="list">`;
    // nejnovější nahoře: pořadí podle toho, kdy se stavba odemkla (starší hry podle pořadí v definici)
    S.unl ??= {};
    const fresh = !Object.keys(S.unl).length, items: { key: string; t: number }[] = [];
    const order0 = (k: string) => UNLOCK_ORDER.indexOf(k) * 1e-3 - 1;
    for (const id of BUILDING_IDS) {
      if (!isUnlocked(S, id)) continue;
      S.unl[id] ??= fresh ? order0(id) : S.time;
      items.push({ key: id, t: S.unl[id] });
    }
    if (ventOpen(S)) {
      S.unl.vent ??= fresh ? order0("vent") : S.time;
      items.push({ key: "vent", t: S.unl.vent });
    }
    items.sort((a, b) => b.t - a.t);
    for (const { key: id } of items) {
      if (id === "vent") { h += ventCards(); continue; }
      const conv = !!B[id].cons || id === "swarmfab" || id === "jet";
      h += `<div class="item" data-b="${id}"><h3>${esc(t(`b.${id}.name`))} <span class="n" data-f="n"></span></h3><p>${esc(t(`b.${id}.desc`))}</p><div class="eff" data-f="eff"></div><div class="cost" data-f="cost"></div>
      <div class="act"><button class="btn" data-buy="${id}">${esc(t("ui.buy"))}</button>${conv ? `<button class="btn ghost" data-toggle="${id}"></button>` : ""}${id === "swarmfab" ? `<button class="btn ghost" data-sell="${id}"></button>` : ""}</div></div>`;
    }
    h += "</div>";
  } else if (which === "research") {
    const open = RESEARCH_IDS.filter((id) => researchAvailable(S, id));
    const locked = RESEARCH_IDS.filter((id) => !S.r[id] && !researchAvailable(S, id) && R[id].reqKey);
    const done = RESEARCH_IDS.filter((id) => S.r[id]);
    h += '<div class="list">' + (open.length ? open.map((id) => `<div class="item" data-r="${id}"><h3>${esc(t(`r.${id}.name`))}</h3><p>${esc(t(`r.${id}.desc`))}</p><div class="cost" data-f="cost"></div><div class="act"><button class="btn" data-res="${id}">${esc(t("ui.research"))}</button></div></div>`).join("") : `<p class="empty">${esc(t("ui.researchNone"))}</p>`) + "</div>";
    const lockedShown = locked.filter((id, i, a) => a.findIndex((x) => R[x].reqKey === R[id].reqKey) === i);
    if (lockedShown.length) h += `<div class="section-label">${esc(t("ui.researchLocked"))}</div><div class="list">` + lockedShown.map((id) => `<div class="item done"><h3>?</h3><p>${esc(t("ui.needs", { x: t("req." + R[id].reqKey) }))}</p></div>`).join("") + "</div>";
    if (done.length) h += `<div class="section-label">${esc(t("ui.researchDone"))}</div><div class="list">` + done.slice().reverse().map((id) => `<div class="item done"><h3>${esc(t(`r.${id}.name`))}</h3><p>${esc(t(`r.${id}.desc`))}</p></div>`).join("") + "</div>";
  } else if (which === "map") {
    h += '<div class="mapbox"><canvas id="map"></canvas></div><div class="list">';
    for (const id of LOCATION_IDS.slice().reverse()) {
      if (!locationOpen(S, id)) continue;
      if (S.star.done && !CH3_LOCS.includes(id)) continue;
      const done = !!S.visited[id];
      h += `<div class="item${done ? " visited" : ""}" data-l="${id}"><h3>${esc(t(`loc.${id}.name`))}</h3><p>${esc(t(`loc.${id}.${done ? "done" : "desc"}`))}</p>${done ? "" : '<div class="cost" data-f="cost"></div>'}<div class="act">${done ? `<span class="dim">${esc(t("ui.map.active"))}</span>` : `<button class="btn" data-go="${id}"></button>`}</div></div>`;
    }
    h += "</div>";
  } else if (which === "star") h += starHTML();
  else if (which === "hole") h += holeHTML();
  el.innerHTML = h;
}
export const round2 = (v) => {
  const e = Math.pow(10, Math.max(0, Math.floor(Math.log10(Math.abs(v) || 1)) - 1));
  return (Math.round(v / e) * e).toLocaleString("cs-CZ");
};
export const spinTxt = (a: number) => dec(a, a >= 0.99 ? 3 : 2);
export const pct = (f) => {
  const v = f * 100;
  return v === 0 ? "0 %" : v < 0.01 ? "< 0,01 %" : `${v.toLocaleString("cs-CZ", { maximumSignificantDigits: 2 })} %`;
};
export function starHTML() {
  const ladder = STAGES.map((st, i) => `<li data-st="${i}"><span class="num">${i + 1}</span>${esc(t(`ui.stages.${st.id}.name`))}</li>`).join("") + `<li data-st="${STAGES.length}"><span class="num">✦</span>${esc(t("ui.stages.nova.name"))}</li>`;
  let h = `${S.star.done ? "" : '<div class="starbox"><canvas id="starc"></canvas></div>'}<ol class="ladder">${ladder}</ol>`;
  if (S.star.done) return h + `<div class="stagecard"><p>${esc(t("ui.star.remnant"))}</p></div>`;
  h += `<div class="stagecard">
  <div class="sc-head"><h3 data-f="name"></h3><span class="tag mono" data-f="of"></span></div>
  <p class="burn"><span class="dim">${esc(t("ui.star.burn"))}</span> <span data-f="burn"></span></p>
  <dl class="sgrid" data-f="grid"></dl>
  <div class="sprog"><div class="sp-head"><span class="dim">${esc(t("ui.star.progress"))}</span><span class="mono" data-f="ptext"></span></div><div class="bar"><b data-f="prog"></b></div></div>
  <div class="ready"><span class="dim">${esc(t("ui.star.ready"))}</span><ul class="checks" data-f="checks"></ul></div>
  <div class="row"><button class="btn" data-adv="1"></button><span class="dim" data-f="wait"></span></div>
</div>`;
  if (S.r.redesign) h += `<div class="stagecard rebuild">
  <div class="sc-head"><h3>${esc(t("ui.rebuild.title"))}</h3><span class="tag mono" data-f="pts"></span></div>
  <p data-f="rb"></p><p class="dim" data-f="rbnext"></p>
  <div class="row"><button class="btn ghost" data-rebuild="1">${esc(t("ui.rebuild.btn"))}</button></div>
</div>`;
  return h;
}
export function updateStar() {
  const view = $("view");
  view.querySelectorAll<El>(".ladder li").forEach((li) => {
    const i = Number(li.dataset.st), cur = S.star.done ? STAGES.length : S.star.stage;
    li.className = i < cur ? "done" : i === cur ? "cur" : "";
  });
  if (S.star.done) return;
  const d = stageDef(S), st = S.star.stage, set = (f2, html) => {
    const el = view.querySelector<El>(`[data-f=${f2}]`);
    if (el && el.innerHTML !== html) el.innerHTML = html;
  };
  set("name", esc(stageName(st)));
  set("of", esc(t("ui.star.stage", { n: st + 1, of: STAGES.length })));
  set("burn", esc(t(`ui.stages.${d.id}.burn`)));
  const Lw = luminosity(S), rows = [
    [t("ui.star.realLen", { t: "" }).trim(), years(d.years)],
    [t("ui.star.L"), t("ui.star.lsun", { v: round2(Lw / 3828e23) })],
    [t("ui.star.T"), `${round2(d.T)} K`],
    [t("ui.star.R"), t("ui.star.rsun", { v: round2(d.R) })],
    [t("ui.star.cov"), pct(coverage(S))]
  ];
  if (S.b.lifter > 0 || S.r.lift) rows.push([t("ui.star.lift"), energy(liftJ(S))]);
  set("grid", rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join(""));
  const f = Math.min(1, S.star.t / d.sec);
  view.querySelector<El>("[data-f=prog]")?.style.setProperty("width", (f * 100).toFixed(1) + "%");
  set("ptext", esc(t("ui.star.progressOf", { a: years(d.years * f), b: years(d.years) })));
  const rd = stageReady(S), chk = (ok, txt) => `<li class="${ok ? "ok" : ""}">${ok ? "✓" : "·"} ${esc(txt)}</li>`;
  let c = chk(rd.time, t("ui.star.needTime")) + chk(rd.power, stageByMetal(S) ? t("ui.star.needMetal", { m: mass(stageNeed(S)) }) : t("ui.star.needPower", { w: power(d.needW) }));
  if (st === LAST_STAGE) c += chk(rd.research, t("ui.star.needResearch"));
  set("checks", c);
  const btn = view.querySelector<El>("[data-adv]");
  if (btn) {
    const coll = S.star.collapse >= 0;
    btn.disabled = !rd.ok;
    btn.textContent = coll ? t("ui.star.countdown", { t: duration(S.star.collapse) }) : st === LAST_STAGE ? t("ui.star.collapse") : t("ui.star.next", { n: stageName(st + 1) });
    btn.classList.toggle("warn", coll);
    set("wait", esc(coll ? t("ui.star.lastLift") : rd.time && !rd.ok ? "" : t("ui.star.waiting")));
  }
  if (S.r.redesign) {
    const g = prestigeGain(S), m = prestigeMult(S);
    set("pts", esc(`${t("ui.rebuild.pts")} ${num(S.p.pts)}`));
    set("rb", esc(t("ui.rebuild.bonus", { m: num(m) }) + ". " + (g >= 1 ? t("ui.rebuild.gain", { n: ptsText(g) }) : t("ui.rebuild.none"))));
    const nextAt = PRESTIGE_UNIT * Math.pow(10, (S.p.pts + g + 1) / PRESTIGE_PER_ORDER);
    set("rbnext", esc(t("ui.rebuild.next", { v: mass(nextAt) })));
    const rb = view.querySelector<El>("[data-rebuild]");
    if (rb) rb.disabled = !canRebuild(S);
  }
}
export function onAdvance() {
  if (!stageReady(S).ok) return;
  const st = S.star.stage;
  const go = () => {
    if (advanceStage(S)) {
      onJournal(checkJournal(S));
      renderAll();
      save();
    }
  };
  if (st === 0) {
    const loss = redLoss(S);
    const body = t("ui.redWarn.body") + "\n\n" + (loss.dyson || loss.lifter ? t("ui.redWarn.loss", { d: num(loss.dyson), l: num(loss.lifter) }) : t("ui.redWarn.safe"));
    confirmModal(t("ui.redWarn.title"), body, t("ui.redWarn.ok"), t("ui.redWarn.cancel"), go, !!(loss.dyson || loss.lifter));
  } else if (st === LAST_STAGE) {
    confirmModal(t("ui.collapseWarn.title"), t("ui.collapseWarn.body", { t: duration(STAR.collapseSec) }), t("ui.collapseWarn.ok"), t("ui.collapseWarn.cancel"), go, true);
  } else go();
}
export const ptsText = (n) => `${n} ${plural(n, "poznatek", "poznatky", "poznatků")}`;
export function onRebuild() {
  if (!canRebuild(S)) return;
  const g = prestigeGain(S), m = 1 + 0.25 * (S.p.pts + g);
  confirmModal(t("ui.rebuild.confirmTitle"), t("ui.rebuild.confirmBody", { n: ptsText(g), m: num(m) }), t("ui.rebuild.ok"), t("ui.cancel"), () => {
    const got = rebuild(S);
    if (!got) return;
    toast(t("ui.rebuild.done", { n: ptsText(got) }), 4e3);
    onJournal(checkJournal(S));
    renderAll(true);
    save();
  }, true);
}
// ---------- tečky u záložek: co nového se na záložce objevilo ----------
const seenKey: Record<string, () => string> = {
  map: () => LOCATION_IDS.filter((id) => locationOpen(S, id) && !S.visited[id]).join(","),
  hole: () => `${S.hole.phase}${S.hole.dive >= 0}${S.hole.done}`,
  star: () => `${S.star.stage}${S.star.collapse >= 0}`
};
function unseen(id: string) {
  const k = seenKey[id]();
  return !!k && (S.seen?.[id] ?? "") !== k;
}
function markSeen() {
  if (!seenKey[tab]) return;
  S.seen ??= {};
  S.seen[tab] = seenKey[tab]();
}
// ---------- Kapitola 3: scéna uprostřed a záložka Ventil ----------
let sceneZoom = 0, sceneHover: number | null = null, sceneHold = false, sceneHoldAcc = 0;
function sceneAngle(e: PointerEvent) {
  const c = $("scenec"), r = c.getBoundingClientRect(), g = sceneGeom(r.width, r.height);
  const dx = (e.clientX - r.left - g.cx) / g.R, dy = (e.clientY - r.top - g.cy) / (g.R * g.tilt);
  return Math.atan2(dy, dx);
}
function sceneView(): SceneView {
  const v = S.vent, open = ventOpen(S);
  const blobs = v.fly.map((b) => {
    const dt0 = S.time - b.t0, p0 = blobPos(b, dt0), trail: [number, number][] = [];
    for (let k = 9; k >= 1; k--) {
      const q = blobPos(b, Math.max(0, dt0 - k * 0.05));
      trail.push([q.r, q.th]);
    }
    trail.push([p0.r, p0.th]);
    return { r: p0.r, th: p0.th, gold: b.gold, mult: b.mult, trail, auto: !!b.inj };
  });
  const inj = injEmitters(S);
  const fl = flares.splice(0).map((f) => {
    const q = blobPos(f.b, ventFlight(f.b.r0));
    return { r: q.r, th: q.th, gold: f.b.gold, mult: f.b.mult, text: f.b.inj ? "" : `+${bytes(f.data)}${f.b.mult > 1.01 ? ` ×${dec(f.b.mult, 2)}` : ""}` };
  });
  return {
    blobs, flares: fl, inj, relR: ventR(ventLv(S, "radius")), hover: sceneHover,
    hoverText: t("ui.vent.hover", { kg: mass(ventKg(S)), s: dec(ventFlight(ventR(ventLv(S, "radius"))), 1) }),
    tank: ventTank(S), tankText: open ? t("ui.vent.tankLine", { kg: mass(ventTankKg(S)), p: Math.round(ventTank(S) * 100) }) : "",
    chainText: v.chain > 1 ? t("ui.vent.chainBig", { n: v.chain, m: dec(ventChainMult(S), 2) }) : "",
    pulse: pulsePhase(S), pulseSec: VENT.pulse, overText: v.over > 0 ? t("ui.vent.over", { s: Math.ceil(v.over) }) : "",
    locked: open ? "" : t("ui.vent.locked")
  };
}
function renderScene() {
  if (!S.star.done) return;
  const open = ventOpen(S), full = ventCanBurst(S), btn = $("burstBtn");
  btn.hidden = !open || !!sceneZoom;
  btn.disabled = !full;
  btn.classList.toggle("ready", full);
  btn.classList.toggle("ghost", !full);
  btn.textContent = full ? t("ui.vent.burst") : t("ui.vent.burstWait", { p: Math.round(ventTank(S) * 100) });
  const hint = $("sceneHint");
  hint.hidden = !open || !!sceneZoom || S.b.injector >= 1;
  hint.innerHTML = t("ui.vent.flowHelp").split("|").map((x, i) => `<b>${i + 1}</b> ${esc(x)}`).join("<br>");
  document.querySelectorAll<El>("[data-zoom]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.zoom) === sceneZoom)));
}
const ventNow: Record<VentUp, (l: number) => string> = {
  inlet: (l) => t("ui.vent.v.inlet", { p: Math.round(ventShare(S, l) * 100), f: mass(ventFill(S, l)) }),
  valve: (l) => t("ui.vent.v.valve", { kg: mass(Math.min(ventCap(S), ventKg(S, l))), s: dec(VENT.valveSec * Math.pow(1.5, l), 0) }),
  trap: (l) => t("ui.vent.v.trap", { kg: mass(ventCap(S, l)), f: mass(ventFill(S, l)) }),
  radius: (l) => t("ui.vent.v.radius", { r: dec(ventR(l), 2), s: dec(ventFlight(ventR(l)), 1) }),
  coil: (l) => t("ui.vent.v.coil", { n: ventChainMax(l), p: Math.round(ventStep(l) * 100) })
};
function ventCards() {
  let h = "";
  for (const id of VENT_IDS) {
    h += `<div class="item vcard" data-vu="${id}"><h3>${esc(t(`ui.vent.u.${id}.name`))} <span class="n" data-f="n"></span></h3><p>${esc(t(`ui.vent.u.${id}.desc`))}</p>
    <div class="eff2 mono"><span class="k">${esc(t("ui.vent.now"))}</span><span data-f="now"></span><span class="k">${esc(t("ui.vent.next"))}</span><span class="up" data-f="next"></span></div>
    <div class="cost" data-f="cost"></div><div class="act"><button class="btn" data-vup="${id}">${esc(t("ui.vent.upgrade"))}</button></div></div>`;
  }
  return h;
}
function updateVent(root: El = $("view")) {
  root.querySelectorAll<El>("[data-vu]").forEach((el) => {
    const id = el.dataset.vu as VentUp, l = ventLv(S, id), max = l >= VENT_UPS[id].max, c = ventUpCost(S, id);
    const set = (f: string, html: string) => { const e2 = el.querySelector<El>(`[data-f=${f}]`); if (e2.innerHTML !== html) e2.innerHTML = html; };
    set("n", esc(t("ui.vent.level", { n: l })));
    set("now", esc(ventNow[id](l)));
    set("next", esc(max ? t("ui.vent.max") : ventNow[id](l + 1)));
    set("cost", max ? "" : costHTML({ plasma: c }));
    el.querySelector<El>("[data-vup]").disabled = max || S.res.plasma < c;
  });
}
// ---------- Kapitola 3: záložka Horizont ----------
const phaseName = (i: number) => i < PHASES.length ? t(`ui.phases.${PHASES[i].id}.name`) : t("ui.hole.diveName");
const lumOf = (w: number) => Math.max(0, Math.min(1, (Math.log10(Math.max(1, w)) - 20) / 13));
export function holeView(): HoleView {
  const jp = jetP(S);
  return {
    phase: PHASES[Math.min(S.hole.phase, PHASES.length - 1)].disk, a: S.hole.a, lum: lumOf(holeL(S)), cov: ringCov(S), rings: Math.floor(S.b.ring),
    jets: jp > 0 ? Math.max(0.25, Math.min(1, (Math.log10(jp) - 28) / 7)) : 0, jetCov: jetCov(S), stations: Math.floor(S.b.station), gamma: gamma(S),
    feed: Math.min(8, Math.ceil(Math.floor(S.b.injector) / 6)), dive: S.hole.dive, done: S.hole.done
  };
}
function holeHTML() {
  const ladder = PHASES.map((ph, i) => `<li data-ph="${i}"><span class="num">${i + 1}</span>${esc(t(`ui.phases.${ph.id}.name`))}</li>`).join("") + `<li data-ph="${PHASES.length}"><span class="num">✦</span>${esc(t("ui.hole.diveName"))}</li>`;
  let h = `<div class="starbox"><canvas id="holec"></canvas></div><ol class="ladder">${ladder}</ol>`;
  if (S.hole.done) return h + `<div class="stagecard"><p>${esc(t("ui.hole.done"))}</p><dl class="sgrid" data-f="grid"></dl></div>`;
  h += `<div class="stagecard">
  <div class="sc-head"><h3 data-f="name"></h3><span class="tag mono" data-f="of"></span></div>
  <p class="burn" data-f="text"></p>
  <dl class="sgrid" data-f="grid"></dl>
  <div class="sprog"><div class="sp-head"><span class="dim">${esc(t("ui.power"))}</span><span class="mono" data-f="ptext"></span></div><div class="bar"><b data-f="prog"></b></div></div>
  <div class="ready"><span class="dim">${esc(t("ui.hole.ready"))}</span><ul class="checks" data-f="checks"></ul></div>
  <div class="row"><button class="btn" data-phase="1"></button><span class="dim" data-f="wait"></span></div>
</div>`;
  return h;
}
function holeGrid() {
  const L0 = holeL(S), rows: [string, string][] = [
    [t("ui.hole.mass"), t("ui.hole.msun", { v: HOLE.massSun })],
    [t("ui.hole.rs"), `${dec(HOLE.rsKm, 1)} km`],
    [t("ui.hole.spin"), `${spinTxt(S.hole.a)} · ${t("ui.hole.spinEq", { v: spinTxt(spinEq(S)) })}`],
    [t("ui.hole.isco"), t("ui.hole.rsUnit", { v: dec(iscoR(S.hole.a) / 2, 2) })],
    [t("ui.hole.eta"), pct(diskEta(S.hole.a))],
    [t("ui.hole.L"), power(L0)],
    [t("ui.hole.edd"), power(HOLE.eddW)],
    [t("ui.hole.cov"), pct(ringCov(S))]
  ];
  if (S.r.mad) rows.push([t("ui.hole.jets"), power(jetP(S))], [t("ui.hole.jetCov"), pct(jetCov(S))]);
  if (S.b.station >= 1) rows.push([t("ui.hole.gamma"), t("ui.hole.stationR", { r: dec(stationR(S), 2), g: dec(gamma(S), gamma(S) >= 10 ? 0 : 1) })]);
  return rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("") + (L0 >= HOLE.eddW * 0.999 && !S.r.slim ? `<dt>&nbsp;</dt><dd class="warnc">${esc(t("ui.hole.eddCap"))}</dd>` : "");
}
function updateHole() {
  const view = $("view");
  view.querySelectorAll<El>(".ladder li").forEach((li) => {
    const i = Number(li.dataset.ph), cur = S.hole.done ? PHASES.length + 1 : S.hole.dive >= 0 ? PHASES.length : S.hole.phase;
    li.className = i < cur ? "done" : i === cur ? "cur" : "";
  });
  const set = (f: string, html: string) => {
    const el = view.querySelector<El>(`[data-f=${f}]`);
    if (el && el.innerHTML !== html) el.innerHTML = html;
  };
  set("grid", holeGrid());
  if (S.hole.done) return;
  const d = phaseDef(S), ph = S.hole.phase, P = powerW(S);
  set("name", esc(phaseName(ph)));
  set("of", esc(t("ui.hole.phase", { n: ph + 1, of: PHASES.length })));
  set("text", esc(t(`ui.phases.${d.id}.text`)));
  const w0 = ph ? PHASES[ph - 1].needW : 1e15, f = Math.max(0, Math.min(1, Math.log10(P / w0) / Math.log10(d.needW / w0)));
  view.querySelector<El>("[data-f=prog]")?.style.setProperty("width", (f * 100).toFixed(1) + "%");
  set("ptext", esc(`${power(P)} / ${power(d.needW)}`));
  const rd = phaseReady(S), chk = (ok: boolean, txt: string) => `<li class="${ok ? "ok" : ""}">${ok ? "✓" : "·"} ${esc(txt)}</li>`;
  let c = chk(rd.power, t("ui.hole.needPower", { w: power(d.needW) }));
  if (ph === PHASES.length - 1) c += chk(rd.research, t("ui.hole.needResearch"));
  set("checks", c);
  const btn = view.querySelector<El>("[data-phase]");
  if (btn) {
    const diving = S.hole.dive >= 0;
    btn.disabled = !rd.ok;
    btn.textContent = diving ? t("ui.hole.diving", { t: duration(S.hole.dive) }) : ph === PHASES.length - 1 ? t("ui.hole.dive") : t("ui.hole.next", { n: phaseName(ph + 1) });
    btn.classList.toggle("warn", diving);
    set("wait", esc(diving ? t("ui.hole.diveNote") : rd.ok ? "" : t("ui.hole.waiting")));
  }
}
function onPhase() {
  if (!phaseReady(S).ok) return;
  const go = () => {
    if (advancePhase(S)) {
      onJournal(checkJournal(S));
      renderAll();
      save();
    }
  };
  if (S.hole.phase === PHASES.length - 1) confirmModal(t("ui.hole.diveWarn.title"), t("ui.hole.diveWarn.body", { t: duration(HOLE.diveSec) }), t("ui.hole.diveWarn.ok"), t("ui.hole.diveWarn.cancel"), go);
  else go();
}
export function settingsHTML() {
  return `<div class="settings">
    <section><h3>${esc(t("ui.settings.sound"))}</h3><div class="row"><button class="btn ghost" data-act="sound"></button></div>
      <div class="vols">${VOL_KEYS.map((k) => `<label class="vol" for="vol-${k}"><span>${esc(t("ui.settings.vol." + k))}</span><input type="range" id="vol-${k}" data-vol="${k}" min="0" max="100" step="5" value="${Math.round(volOf(k) * 100)}"><output class="mono" for="vol-${k}">${Math.round(volOf(k) * 100)} %</output></label>`).join("")}</div></section>
    <section><h3>${esc(t("ui.settings.save"))}</h3><div class="row"><button class="btn ghost" data-act="save">${esc(t("ui.settings.saveNow"))}</button></div>
      <p style="margin-top:8px">${esc(t("ui.settings.offlineRule"))}</p></section>
    <section><h3>${esc(t("ui.settings.export"))}</h3><p>${esc(t("ui.settings.exportHint"))}</p><textarea id="exportText" readonly></textarea><div class="row"><button class="btn ghost" data-act="export">${esc(t("ui.settings.export"))}</button><button class="btn ghost" data-act="copy">${esc(t("ui.settings.copy"))}</button></div></section>
    <section><h3>${esc(t("ui.settings.import"))}</h3><p>${esc(t("ui.settings.importHint"))}</p><textarea id="importText"></textarea><div class="row"><button class="btn ghost" data-act="import">${esc(t("ui.settings.import"))}</button></div></section>
    <section><h3>${esc(t("ui.settings.about"))}</h3><p>${esc(t("ui.settings.aboutText"))}</p><p class="mono">${esc(t("ui.settings.version", { v: VERSION }))}</p><div class="row"><button class="btn ghost" data-act="reset">${esc(t("ui.settings.reset"))}</button></div></section>
  </div>`;
}
export function openSettings() {
  $("drawerTitle").textContent = t("ui.tabs.settings");
  $("drawerClose").setAttribute("aria-label", t("ui.close"));
  $("drawerBody").innerHTML = settingsHTML();
  syncSettings();
  fillExport();
  $("drawer").hidden = false;
  $("settingsBtn").setAttribute("aria-expanded", "true");
  $("drawerClose").focus();
}
export function closeSettings() {
  if ($("drawer").hidden) return;
  $("drawer").hidden = true;
  $("settingsBtn").setAttribute("aria-expanded", "false");
  $("settingsBtn").focus();
}
export function syncSettings() {
  const sb = document.querySelector<El>("#drawerBody [data-act=sound]");
  if (sb) sb.textContent = S.settings.sound ? t("ui.settings.soundOn") : t("ui.settings.soundOff");
}
export function updateView(which = tab, view = $("view")) {
  if (which === "build") {
    if (ventOpen(S)) updateVent(view);
    view.querySelectorAll<El>("[data-b]").forEach((el) => {
      const id = el.dataset.b as BuildingId, d = B[id];
      const count = Math.floor(S.b[id]);
      el.querySelector<El>("[data-f=n]").innerHTML = esc(t("ui.pieces", { n: num(count) }));
      const flow = (k) => {
        const part = (r, v, sign) => `<span><span style="color:${COLOR[r]}">${esc(t("res." + r))}</span> ${sign}${esc(rate(r, v))}</span>`;
        const ins = id === "injector"
          ? [`<span><span style="color:${COLOR.plasma}">${esc(t("ui.vent.fromTrap"))}</span> −${esc(rate("plasma", consOf(S, id, "plasma") * k))}</span>`]
          : (Object.keys(d.cons ?? {}) as Res[]).map((r) => part(r, consOf(S, id, r) * k, "−"));
        const outs = (Object.keys(d.prod ?? {}) as Res[]).map((r) => part(r, prodOf(S, id, r) * k, "+"));
        if (id === "injector") {
          const perKg = feedRate(S) > 0 ? holeL(S) / feedRate(S) : diskEta(S.hole.a) * HOLE.c2;
          outs.push(`<span><span style="color:${COLOR.energy}">${esc(t("ui.diskGlow"))}</span> +${esc(power(consOf(S, id, "plasma") * k * perKg))}</span>`);
        }
        if (d.makes) outs.push(`<span>${esc(t(d.makes.building === "dyson" ? "ui.makesDyson" : "ui.makes", { n: num(makesOf(S, id) * k) }))}</span>`);
        return ins.length ? `${ins.join(" ")} <span class="arrow">→</span> ${outs.join(" ")}` : outs.join(" ");
      };
      let eff = `<span class="effrow"><span class="lbl">${esc(t("ui.one"))}</span>${flow(1)}</span>`;
      if (count >= 2 || count >= 1 && d.cons) {
        const e = d.cons ? S.off[id] ? 0 : S.eff[id] ?? 1 : 1;
        let note2 = d.cons && e < 0.995 ? ` <span class="dim">(${esc(S.off[id] ? t("ui.stopped") : t("ui.running", { n: Math.round(e * 100) }))})</span>` : "";
        if (id === "swarmfab" && !S.off[id] && S.fab?.lim) note2 = ` <span class="dim">(${esc(t("ui.fabLim." + S.fab.lim) + (S.fab.target ? " · " + t("ui.fabChain." + S.fab.target) : ""))})</span>`;
        const body = e < 5e-3 ? `<span class="dim">${esc(S.off[id] ? t("ui.stopped") : t("ui.starved"))}</span>` : flow(count * e) + note2;
        eff += `<span class="effrow"><span class="lbl">${esc(t("ui.all", { n: num(count) }))}</span>${body}</span>`;
      }
      if (id === "scoop" && ventOpen(S)) eff += `<span class="effrow"><span class="lbl">${esc(t("ui.vent.toTrap"))}</span>${esc(t("ui.vent.toTrapTxt", { p: Math.round(ventShare(S) * 100), f: mass(ventFill(S)) }))}</span>`;
      if (id === "injector" && count >= 1) eff += `<span class="effrow"><span class="lbl">${esc(t("ui.captured"))}</span>${esc(t("ui.capturedTxt", { p: pct(ringCov(S)), w: power(holeL(S) * ringCov(S)) }))}</span>`;
      if (id === "swarmfab" && S.fab?.built && S.fab.built.lifter + S.fab.built.separator > 0) {
        eff += `<span class="effrow"><span class="lbl">${esc(t("ui.fabBuilt"))}</span>${esc(t("ui.fabBuiltList", { l: num(S.fab.built.lifter), s: num(S.fab.built.separator) }))}</span>`;
      }
      el.querySelector<El>("[data-f=eff]").innerHTML = eff;
      let c = cost(S, id), n = 1, can = affordable(S, c);
      if (buyMax === true) {
        const pv = previewMax(S, id);
        if (pv.count > 0) {
          c = pv.total;
          n = pv.count;
        }
      } else if (buyMax === 10) {
        c = previewMax(S, id, 10, true).total;
        n = 10;
        can = affordable(S, c);
      }
      el.querySelector<El>("[data-f=cost]").innerHTML = costHTML(c);
      const btn = el.querySelector<El>("[data-buy]");
      btn.disabled = !can;
      btn.textContent = n > 1 ? t("ui.buyN", { n }) : t("ui.buy");
      const sb = el.querySelector<El>("[data-sell]");
      if (sb) {
        const k = Math.min(Math.floor(S.b[id]), buyMax === true ? Infinity : buyMax);
        sb.disabled = k < 1;
        sb.textContent = k > 1 ? t("ui.sellN", { n: num(k) }) : t("ui.sell");
      }
      const tg = el.querySelector<El>("[data-toggle]");
      if (tg) tg.textContent = S.off[id] ? t("ui.turnOn") : t("ui.turnOff");
    });
  } else if (which === "research") {
    view.querySelectorAll<El>("[data-r]").forEach((el) => {
      const id = el.dataset.r as ResearchId;
      el.querySelector<El>("[data-f=cost]").innerHTML = costHTML(R[id].cost);
      el.querySelector<El>("[data-res]").disabled = !affordable(S, R[id].cost);
    });
  } else if (which === "star") updateStar();
  else if (which === "hole") updateHole();
  else if (which === "map") {
    view.querySelectorAll<El>("[data-go]").forEach((b) => {
      const id = b.dataset.go as LocationId, item = b.closest("[data-l]");
      const cf = item.querySelector<El>("[data-f=cost]");
      if (cf) cf.innerHTML = `${costHTML({ energy: L[id].cost })}<span class="dim">${esc(t("ui.map.flight", { t: duration(travelTime(S, id)) }))}</span>`;
      b.disabled = !canTravel(S, id);
      b.textContent = S.travel?.to === id ? t("ui.map.onWay") : t("ui.map.fly");
    });
  }
}
export let bviewKey = "";
/** Pořadí, v jakém se stavby obvykle odemykají (pro starší uložené hry bez záznamu). */
const UNLOCK_ORDER = ["drone", "smelter", "solar", "lab", "drill", "mirror", "replicator", "forge", "catcher", "qcomp", "fusion", "dyson", "windnet", "sieve", "corono", "lifter", "separator", "seismo", "swarmfab", "scoop", "ring", "vent", "station", "injector", "jet", "hawking"];
/** Kap. 1 a 2: asteroid / hvězda je uprostřed na záložce Stavby, jinak vlevo jako náhled. */
function placeRock() {
  const rw = $("rockwrap"), center = !S.star.done && tab === "build";
  const target = center ? $("scene").querySelector<El>(".scene-wrap") : $("hint").parentElement;
  if (rw.parentElement === target) return;
  if (center) target.prepend(rw); else target.insertBefore(rw, $("hint"));
}
export function renderView(force = false) {
  // Kapitola 3: stavby jsou pořád dole přes celou šířku, ostatní záložky nahrazují díru uprostřed
  const split = true;
  document.body.classList.toggle("tabbuild", tab === "build");
  placeRock();
  if (split) {
    const bk = computeKey("build"), bv = $("bview");
    if (force || bk !== bviewKey) { bviewKey = bk; buildView("build", bv); }
    updateView("build", bv);
    if (tab === "build") return;
  } else bviewKey = "";
  const k = computeKey();
  if (force || k !== viewKey) {
    viewKey = k;
    buildView();
  }
  updateView();
}
export let logLen = -1;
export function renderLog(fresh = false) {
  if (S.log.length === logLen && !fresh) return;
  logLen = S.log.length;
  $("logTitle").textContent = t("ui.journal");
  $("logCount").textContent = String(S.log.length);
  $("log").innerHTML = S.log.map((e, i) => {
    const day = t("ui.day", { n: e.day.toLocaleString("cs-CZ") }), label2 = e.kind === "story" ? `${t("ui.report")} · ${day}` : day;
    const body = e.key === "ui.offline" && e.vars?.list ? `${esc(t("ui.offlineHead", { t: String(e.vars.t) }))}<dl class="gains">${String(e.vars.list).split(/\n|, /).map((row) => {
      const [r, v] = row.split(" +");
      return `<dt>${esc(r)}</dt><dd>+${esc(v ?? "")}</dd>`;
    }).join("")}</dl>` : esc(t(e.key, e.vars));
    return `<div class="entry ${e.kind}${fresh && i === 0 ? " new" : ""}"><span class="t">${esc(label2.toUpperCase())}</span>${body}</div>`;
  }).join("");
}
export function renderChapters() {
  const names = ["c1", "c2", "c3", "c4", "c5"];
  const cur = S.chapterDone;
  const html = `<ol>${names.map((n, i) => {
    const cls = i < cur ? "done" : i === cur ? "cur" : "";
    const label2 = i <= cur ? t("ui.chapters." + n) : t("ui.chapters.locked");
    return `<li class="${cls}"><span class="num">${i + 1}</span>${esc(label2)}</li>`;
  }).join("")}</ol>`;
  const el = $("chapters");
  if (el.innerHTML !== html) el.innerHTML = html;
  el.setAttribute("aria-label", t("ui.chapters.label"));
}
export function renderSoundBtn() {
  const b = $("soundBtn");
  b.setAttribute("aria-pressed", String(S.settings.sound));
  b.innerHTML = S.settings.sound ? '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>' : '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6" stroke="currentColor" stroke-width="1.6"/></svg>';
}
export let modalAction = null;
export function showModal(title: string, body: string, ok: string, cancel?: string, action?: () => void, danger = false) {
  $("modalTitle").textContent = title;
  $("modalBody").innerHTML = body.split("\n\n").map((p) => `<span class="para">${esc(p)}</span>`).join("");
  $("modalOk").textContent = ok;
  $("modalOk").classList.toggle("danger", danger);
  const c = $("modalCancel");
  c.hidden = !cancel;
  c.textContent = cancel ?? "";
  modalAction = action ?? null;
  $("modal").hidden = false;
  (cancel ? c : $("modalOk")).focus();
}
export function confirmModal(title, body, ok, cancel, action, danger = false) {
  showModal(title, body, ok, cancel, action, danger);
}
export function closeModal(run) {
  $("modal").hidden = true;
  const a = modalAction;
  modalAction = null;
  if (run && a) a();
  save();
}
export function checkChapterModal() {
  if (!$("modal").hidden) return;
  if (S.chapterDone >= 1 && !S.story.ch2intro) {
    S.story.modal1 = true;
    S.story.ch2intro = true;
    showModal(t("ui.chapterDone.title"), t("ui.chapterDone.body"), t("ui.chapterDone.ok"));
  } else if (S.chapterDone >= 2 && !S.story.modal2 && snAge() > 7) {
    S.story.modal2 = true;
    showModal(t("ui.chapterDone2.title"), t("ui.chapterDone2.body"), t("ui.chapterDone2.ok"));
  } else if (S.chapterDone >= 3 && !S.story.modal3) {
    S.story.modal3 = true;
    showModal(t("ui.chapterDone3.title"), t("ui.chapterDone3.body"), t("ui.chapterDone3.ok"));
  }
}
export let snAt = -1;
export const snAge = () => snAt < 0 ? 99 : (performance.now() - snAt) / 1e3;
export function onJournal(newKeys) {
  if (!newKeys.length) return;
  renderLog(true);
  if (S.settings.sound) chime();
}
export const CLICK_CAP = 12;
export const clickTimes = [];
export let robotUntil = 0;
export let robotWarned = false;
export function humanClick(e) {
  if (!e.isTrusted) return false;
  const now = performance.now();
  while (clickTimes.length && now - clickTimes[0] > 1e3) clickTimes.shift();
  if (clickTimes.length >= CLICK_CAP) return false;
  clickTimes.push(now);
  if (now < robotUntil) return false;
  if (clickTimes.length >= 8) {
    const iv = clickTimes.slice(1).map((t2, i) => t2 - clickTimes[i]);
    const mean = iv.reduce((a, b) => a + b, 0) / iv.length;
    const sd = Math.sqrt(iv.reduce((a, b) => a + (b - mean) ** 2, 0) / iv.length);
    if (mean < 200 && sd / mean < 0.04) {
      robotUntil = now + 3e3;
      if (!robotWarned) {
        robotWarned = true;
        toast(t("ui.robotClicks"), 4500);
      }
      return false;
    }
  }
  return true;
}
export function bind() {
  document.addEventListener("input", (e) => {
    const el = (e.target as any);
    const k = el.dataset?.vol;
    if (!k) return;
    S.settings.vol = { ...S.settings.vol, [k]: Number(el.value) / 100 };
    setVolumes(audioVols());
    const out = el.parentElement?.querySelector("output");
    if (out) out.textContent = `${el.value} %`;
  });
  document.addEventListener("change", (e) => {
    if ((e.target as any).dataset?.vol) save();
  });
  document.addEventListener("click", (e) => {
    const b = (e.target as any).closest("button");
    if (!b) return;
    const d = b.dataset;
    if (d.tab) {
      tab = d.tab;
      renderTabs();
      renderView(true);
      $("view").scrollTop = 0;
      return;
    }
    if (d.max) {
      buyMax = d.max === "max" ? true : Number(d.max);
      renderView(true);
      return;
    }
    if (d.buy) {
      buy(S, d.buy, buyMax);
      onJournal(checkJournal(S));
      renderAll();
      return;
    }
    if (d.sell) {
      sell(S, d.sell, buyMax === true ? 1e9 : buyMax);
      renderAll();
      return;
    }
    if (d.toggle) {
      const id = d.toggle;
      S.off[id] = !S.off[id];
      renderView();
      return;
    }
    if (d.res) {
      if (doResearch(S, d.res)) {
        onJournal(checkJournal(S));
        renderTabs();
        renderView(true);
      }
      return;
    }
    if (d.go) {
      const id = d.go;
      depart(S, id);
      onJournal(checkJournal(S));
      renderView(true);
      renderRig();
      return;
    }
    if (d.claim) {
      const got = claimEvent(S);
      if (got) {
        const r = EVENTS[got.id].res, v = amount(r, got.amount);
        toast(t(`ui.events.${got.id}.got`, { v }), 4500);
        renderTop();
        flashGain(r, got.amount);
        if (S.settings.sound) chime();
      }
      renderRig();
      return;
    }
    if (d.adv) {
      onAdvance();
      return;
    }
    if (d.rebuild) {
      onRebuild();
      return;
    }
    if (d.phase) {
      onPhase();
      return;
    }
    if (d.vup) {
      if (ventUpgrade(S, d.vup)) { if (S.settings.sound) chime(); renderView(); renderRig(); }
      return;
    }
    if (d.burst) {
      if (ventBurst(S) && S.settings.sound) boom();
      renderScene();
      return;
    }
    if (d.zoom !== undefined) {
      sceneZoom = Number(d.zoom);
      renderScene();
      return;
    }
    if (d.act) return settingsAction(d.act, b);
  });
  const sc = $("scenec");
  sc.addEventListener("pointermove", (e) => { sceneHover = sceneAngle(e); });
  sc.addEventListener("pointerleave", () => { sceneHover = null; sceneHold = false; });
  sc.addEventListener("pointerdown", (e) => {
    if (sceneZoom) {
      const r = sc.getBoundingClientRect(), id = holeMapHit(r.width, r.height, S, e.clientX - r.left, e.clientY - r.top, performance.now() / 1e3);
      if (id) { if (canTravel(S, id)) { depart(S, id); renderAll(); save(); } return; }
      sceneZoom = 0; renderScene(); return;
    }
    sceneHover = sceneAngle(e);
    sceneHold = true;
    sceneHoldAcc = 0;
    sc.setPointerCapture(e.pointerId);
    ventRelease(S, sceneHover);
  });
  sc.addEventListener("pointerup", () => { sceneHold = false; });
  sc.addEventListener("pointercancel", () => { sceneHold = false; });
  const rock = $("rock");
  rock.addEventListener("keydown", (e) => {
    if (e.repeat && (e.key === "Enter" || e.key === " ")) e.preventDefault();
  });
  rock.addEventListener("click", (e) => {
    if (S.chapterDone >= 1) return;
    if (!humanClick(e)) return;
    const p = mine(S);
    if (S.chapterDone < 1) {
      const cv = $("rockc"), cr = cv.getBoundingClientRect();
      if (e.clientX) hitRock((e.clientX - cr.left) * (cv.width / cr.width), (e.clientY - cr.top) * (cv.height / cr.height), cv.width);
      else hitRock(void 0, void 0, cv.width);
    }
    const w = $("rockwrap"), r = w.getBoundingClientRect();
    const f = document.createElement("span");
    f.className = "float";
    f.innerHTML = esc("+" + mass(p));
    const x = (e.clientX || r.left + r.width / 2) - r.left, y = (e.clientY || r.top + r.height / 2) - r.top;
    f.style.left = x - 12 + "px";
    f.style.top = y - 16 + "px";
    w.appendChild(f);
    setTimeout(() => f.remove(), 1e3);
    onJournal(checkJournal(S));
    renderTop();
  });
  $("soundBtn").addEventListener("click", toggleSound);
  $("settingsBtn").addEventListener("click", () => $("drawer").hidden ? openSettings() : closeSettings());
  $("drawerClose").addEventListener("click", closeSettings);
  $("drawer").addEventListener("click", (e) => {
    if ((e.target as any) === $("drawer")) closeSettings();
  });
  $("modalOk").addEventListener("click", () => closeModal(true));
  $("modalCancel").addEventListener("click", () => closeModal(false));
  document.addEventListener("pointerover", (e) => {
    const el = (e.target as any).closest("[data-unit]");
    if (el && e.pointerType === "mouse") showTip(el);
  });
  document.addEventListener("pointerout", (e) => {
    if ((e.target as any).closest("[data-unit]")) hideTip();
  });
  document.addEventListener("focusin", (e) => {
    const el = (e.target as any).closest("[data-unit]");
    if (el) showTip(el);
  });
  document.addEventListener("focusout", hideTip);
  document.addEventListener("pointerdown", (e) => {
    const el = (e.target as any).closest("[data-unit]");
    if (el && e.pointerType !== "mouse") {
      showTip(el);
      setTimeout(hideTip, 3500);
    }
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideTip();
      closeSettings();
      if (!$("modal").hidden) closeModal(false);
    }
  });
}
export function toggleSound() {
  S.settings.sound = !S.settings.sound;
  setSound(S.settings.sound, !!S.r.scan);
  renderSoundBtn();
  syncSettings();
  save();
}
export function fillExport() {
  const ta = (document.getElementById("exportText") as any);
  if (ta) ta.value = encodeSave(S);
}
export let resetStep = 0;
export let resetAt = 0;
export function settingsAction(act, b) {
  if (act === "save") {
    save(false);
    return;
  }
  if (act === "export") {
    fillExport();
    (document.getElementById("exportText") as any).select();
    return;
  }
  if (act === "copy") {
    fillExport();
    const ta = (document.getElementById("exportText") as any);
    navigator.clipboard?.writeText(ta.value).then(() => toast(t("ui.settings.copied")), () => {
      ta.select();
    });
    return;
  }
  if (act === "import") {
    const ta = (document.getElementById("importText") as any);
    const st = decodeSave(ta.value);
    if (!st) {
      toast(t("ui.settings.importBad"));
      return;
    }
    S = st;
    S.last = Date.now();
    setVolumes(audioVols());
    save();
    toast(t("ui.settings.importOk"));
    renderAll(true);
    return;
  }
  if (act === "sound") {
    toggleSound();
    return;
  }
  if (act === "reset") {
    if (Date.now() - resetAt > 5e3) resetStep = 0;
    resetStep++;
    resetAt = Date.now();
    if (resetStep >= 3) {
      const keepSound = S.settings.sound, keepVol = S.settings.vol;
      S = newState();
      S.settings.sound = keepSound;
      S.settings.vol = keepVol;
      checkJournal(S);
      save();
      toast(t("ui.settings.resetDone"));
      renderAll(true);
      resetStep = 0;
      return;
    }
    b.textContent = t(resetStep === 1 ? "ui.settings.resetConfirm" : "ui.settings.resetFinal");
    b.classList.toggle("danger", resetStep === 2);
    const step = resetStep;
    setTimeout(() => {
      if (b.isConnected && resetStep === step) {
        resetStep = 0;
        b.textContent = t("ui.settings.reset");
        b.classList.remove("danger");
      }
    }, 5e3);
  }
}
export function renderAll(fresh = false) {
  renderTop();
  renderRig();
  renderTabs();
  renderView(fresh);
  renderLog(fresh);
  renderChapters();
  renderSoundBtn();
}
export function start() {
  S = load() ?? newState();
  setVolumes(audioVols());
  applyOffline((Date.now() - S.last) / 1e3);
  checkJournal(S);
  bind();
  const stars2 = $("stars");
  sizeStars(stars2);
  addEventListener("resize", () => sizeStars(stars2));
  renderAll(true);
  if (S.settings.sound) {
    const resume = () => {
      setSound(true, !!S.r.scan);
      removeEventListener("pointerdown", resume);
    };
    addEventListener("pointerdown", resume);
  }
  let prev = performance.now(), uiAcc = 0, saveAcc = 0, starAcc = 1;
  const frame = (now) => {
    const dt = Math.min(1, (now - prev) / 1e3);
    prev = now;
    lastActive = Date.now();
    const wasDone = S.star.done;
    onJournal(tick(S, dt));
    if (!wasDone && S.star.done) {
      snAt = performance.now();
      if (S.settings.sound) boom();
      document.body.classList.add("sn");
      setTimeout(() => document.body.classList.remove("sn"), 2500);
      renderAll(true);
    }
    uiAcc += dt;
    if (uiAcc > 0.2) {
      uiAcc = 0;
      renderTop();
      renderRig();
      renderTabs();
      renderView();
      renderChapters();
      renderScene();
      checkChapterModal();
    }
    saveAcc += dt;
    if (saveAcc > 15) {
      saveAcc = 0;
      save();
    }
    if (S.star.done && snAge() > 8) {
      const sc = $("scenec") as unknown as HTMLCanvasElement;
      if (tab !== "build") drawHole($("rockc") as unknown as HTMLCanvasElement, holeView(), now / 1e3, t("ui.hole.remnantSub", { r: dec(HOLE.rsKm, 1) }) + ` · a ${spinTxt(S.hole.a)}`);
      else if (sceneZoom) drawHoleMap(sc, S, holeView(), now / 1e3);
      else drawScene(sc, holeView(), sceneView(), now / 1e3);
      if (sceneHold && sceneHover !== null && !sceneZoom) {
        sceneHoldAcc += dt;
        if (sceneHoldAcc >= 0.32) { sceneHoldAcc = 0; ventRelease(S, sceneHover); }
      }
    } else if (S.chapterDone >= 1) {
      const n = Math.floor(S.b.dyson);
      drawStar($("rockc"), starView(), now / 1e3, { title: "", sub: S.star.done ? "" : `${n.toLocaleString("cs-CZ")} ${plural(n, "kolektor", "kolektory", "kolektorů")}`, layers: "" }, false);
    } else drawRock($("rockc"), dt, S.b.drone);
    starAcc += dt;
    if (starAcc > 0.05) {
      starAcc = 0;
      drawStars(stars2, now / 1e3);
    }
    if (tab === "map") {
      const m = (document.getElementById("map") as any);
      if (m) S.star.done ? drawHoleMap(m, S, holeView(), now / 1e3) : drawMap(m, S, now / 1e3);
    }
    if (tab === "hole") {
      const c = document.getElementById("holec") as HTMLCanvasElement;
      if (c) drawProfile(c, { ...holeView(), stationR: stationR(S) }, now / 1e3, t("ui.hole.profile"));
    }
    if (tab === "star") {
      const c = (document.getElementById("starc") as any);
      if (c) {
        const d = stageDef(S);
        drawSection(c, d.id, now / 1e3, S.star.collapse, { title: t("ui.star.layers"), sub: `${stageName(S.star.stage)} · ${round2(d.T)} K · ${t("ui.star.rsun", { v: round2(d.R) })}` });
      }
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      save();
      return;
    }
    const away = (Date.now() - lastActive) / 1e3;
    prev = performance.now();
    if (away > 5) {
      applyOffline(away);
      renderLog(true);
    }
    lastActive = Date.now();
  });
  addEventListener("pagehide", () => save());
}
