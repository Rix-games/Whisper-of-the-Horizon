// Rozhraní hry: přístrojová deska. Čte stav z jádra a volá jeho akce.
import {
  B, BUILDING_IDS, EVENTS, L, LOCATION_IDS, R, RESEARCH_IDS, RESOURCES,
  type Amounts, type BuildingId, type LocationId, type Res, type ResearchId,
} from '../core/defs.js';
import * as E from '../core/engine.js';
import { newState, migrate, encodeSave, decodeSave, type State } from '../core/state.js';
import { mass, energy, power, bytes, duration, num, kValue } from '../core/format.js';
import { t } from '../i18n/index.js';
import { drawMap, drawRock, drawStars, hitRock, sizeStars } from './scene.js';
import { setSound, setVolumes, chime, type Volumes } from './audio.js';

// Tři posuvníky v nastavení; každý řídí jednu nebo dvě větve zvuku.
const VOL_KEYS = ['noise', 'melody', 'game'] as const;
type VolKey = typeof VOL_KEYS[number];
const VOL_DEFAULT: Record<VolKey, number> = { noise: 0.7, melody: 1, game: 1 };
const volOf = (k: VolKey) => S.settings.vol?.[k] ?? VOL_DEFAULT[k];
const audioVols = (): Partial<Volumes> => ({ noise: volOf('noise'), drone: volOf('noise'), melody: volOf('melody'), pulse: volOf('game'), chime: volOf('game') });

export const VERSION = '0.1.1';
const KEY = 'sepot-horizontu';
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
// escapuje HTML a mocniny (10¹²) obalí do .exp, aby šly zvětšit
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!))
  .replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => `<span class="exp">${m}</span>`)
  .replace(/(?<=\d)[ \u00A0\u202F](?=\d{3}(?!\d))/g, '<span class="ts"> </span>'); // úzká mezera mezi tisíci (6 139)

let S: State;
let tab: 'build' | 'research' | 'map' = 'build';
let buyMax = false;
let viewKey = '';
let lastActive = Date.now();

const COLOR: Record<Res, string> = { ore: 'var(--ore)', metal: 'var(--metal)', energy: 'var(--energy)', data: 'var(--data)' };
const UNIT: Record<Res, string> = { ore: 'kg', metal: 'kg', energy: 'J', data: 'B' };

function amount(r: Res, v: number) { return r === 'energy' ? energy(v) : r === 'data' ? bytes(v) : mass(v); }
function rate(r: Res, v: number) { return r === 'energy' ? power(v) : (r === 'data' ? bytes(v) : mass(v)) + '/s'; }
function costHTML(c: Amounts) {
  return `<span class="lbl">${esc(t('ui.price'))}</span>` + (Object.keys(c) as Res[]).map((r) => `<span class="${S.res[r] >= c[r]! ? '' : 'no'}"><span style="color:${COLOR[r]}">${t('res.' + r)}</span> ${esc(amount(r, c[r]!))}</span>`).join('');
}

// ---------- ukládání ----------
function save(silent = true) {
  S.last = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(S)); if (!silent) toast(t('ui.settings.saved', { t: new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }) })); return true; }
  catch { if (!silent) toast(t('ui.settings.saveFail')); return false; }
}
function load(): State | null {
  try { const raw = localStorage.getItem(KEY); return raw ? migrate(JSON.parse(raw)) : null; } catch { return null; }
}
function applyOffline(sec: number) {
  if (sec < 30) return;
  const got = E.offlineGain(S, sec);
  const list = (Object.keys(got) as Res[]).filter((r) => got[r]! >= 1).map((r) => `${t('res.' + r)} +${amount(r, got[r]!)}`).join(', ');
  if (list) S.log.unshift({ key: 'ui.offline', kind: 'sys', day: Math.floor(S.time) + 1, vars: { t: duration(sec), list } });
}

// ---------- drobnosti ----------
let toastTimer: number | undefined;
function toast(msg: string, ms = 2600) {
  const el = $('toast'); el.innerHTML = esc(msg); el.hidden = false;
  clearTimeout(toastTimer); toastTimer = window.setTimeout(() => { el.hidden = true; }, ms);
}
/** Rozsvítí surovinu v horní liště a nad ní vyletí přírůstek. */
function flashGain(r: Res, v: number) {
  const chip = document.querySelector<HTMLElement>(`.chip[data-res="${r}"]`);
  if (!chip) return;
  chip.classList.remove('gain'); void chip.offsetWidth; chip.classList.add('gain');
  const f = document.createElement('span'); f.className = 'float gainfloat'; f.innerHTML = esc('+' + amount(r, v));
  f.style.color = COLOR[r]; chip.appendChild(f); setTimeout(() => f.remove(), 1600);
}
function showTip(target: HTMLElement) {
  const u = target.dataset.unit!; const tip = $('tip');
  tip.innerHTML = `<b>${esc(t(`unit.${u}.name`))}</b>${esc(t(`unit.${u}.text`))}` + (target.dataset.res ? breakdownHTML(target.dataset.res as Res) : '');
  tip.hidden = false;
  const r = target.getBoundingClientRect(), w = tip.offsetWidth;
  tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left)) + 'px';
  tip.style.top = (r.bottom + 8) + 'px';
}
function hideTip() { $('tip').hidden = true; }
/** Rozpis výroby a spotřeby zdroje do vysvětlivky (např. drony +10 kg/s, tavírny −6 kg/s). */
function breakdownHTML(r: Res): string {
  const { prod, cons } = E.rateParts(S, r);
  if (!prod.length && !cons.length) return '';
  const name = (k: string) => (k === 'reactor' || k === 'auto' ? t('ui.breakdown.' + k) : t(`b.${k}.name`));
  const line = (k: string, v: number, sign: string) => `<span class="bd"><span>${esc(name(k))}</span><span class="mono">${sign}${esc(rate(r, v))}</span></span>`;
  const p = prod.reduce((a, [, v]) => a + v, 0), c = cons.reduce((a, [, v]) => a + v, 0), net = p - c;
  let h = `<span class="bdh">${esc(t('ui.breakdown.prod'))}</span>` + prod.map(([k, v]) => line(k, v, '+')).join('');
  if (cons.length) h += `<span class="bdh">${esc(t('ui.breakdown.cons'))}</span>` + cons.map(([k, v]) => line(k, v, '−')).join('');
  h += `<span class="bd total"><span>${esc(t('ui.breakdown.net'))}</span><span class="mono">${net >= 0 ? '+' : '−'}${esc(rate(r, Math.abs(net)))}</span></span>`;
  return `<span class="bdbox">${h}</span>`;
}

// ---------- horní lišta ----------
let chipKey = '';
function renderTop() {
  const k = E.kardashev(S), P = E.powerW(S);
  $('kval').textContent = k < 0 ? t('ui.kBelow') : 'K ' + kValue(k); // pod 1 MW vychází záporně, ukazujeme jen „K < 0“
  $('kpow').innerHTML = esc(power(P));
  const done = k >= 1;
  $('kprogLabel').textContent = done ? t('ui.toTypeIdone') : t('ui.toTypeI', { n: ((1 - k) * 10).toFixed(1).replace('.', ',') });
  $('kbar').style.width = Math.max(0, Math.min(100, ((k + 0.35) / 1.35) * 100)).toFixed(1) + '%';
  const shown = RESOURCES.filter((r) => r === 'ore' || S.total[r] > 0);
  const key = shown.join();
  const bar = $('resbar');
  if (key !== chipKey) {
    chipKey = key;
    bar.innerHTML = shown.map((r) => `<button class="chip" data-unit="${UNIT[r]}" data-res="${r}" aria-describedby="tip"><span class="k"><i style="background:${COLOR[r]}"></i>${t('res.' + r)}</span><span class="v" data-v="${r}"></span><span class="r" data-r="${r}"></span></button>`).join('');
  }
  const { p, c } = E.rates(S);
  for (const r of shown) {
    bar.querySelector(`[data-v="${r}"]`)!.innerHTML = esc(amount(r, S.res[r]));
    const net = p[r] - c[r], el = bar.querySelector(`[data-r="${r}"]`)!;
    el.innerHTML = esc((net >= 0 ? '+' : '−') + rate(r, Math.abs(net)).replace(/\/s$/, '') + (r === 'energy' ? '' : t('ui.perSec')));
    el.classList.toggle('neg', net < 0);
  }
  $('clockDay').innerHTML = esc(t('ui.day', { n: (Math.floor(S.time) + 1).toLocaleString('cs-CZ') }));
  $('clockScale').textContent = t('ui.clockScale');
}

// ---------- těžba ----------
function renderRig() {
  $('rigTitle').textContent = t('ui.asteroid');
  $('clickTag').innerHTML = esc(t('ui.perClick', { v: mass(E.clickPower(S)) }));
  const hint = $('hint'); hint.hidden = S.b.drone >= 3; hint.textContent = t('ui.hint');
  const conv = E.CONVERTERS.filter((id) => S.b[id] >= 1);
  const rows: [string, string][] = [[t('ui.stats.clicks'), num(S.clicks)], [t('ui.stats.drones'), num(Math.floor(S.b.drone))]];
  for (const id of conv) rows.push([t(`b.${id}.name`), S.off[id] ? t('ui.stopped') : t('ui.running', { n: Math.round((S.eff[id] ?? 1) * 100) })]);
  $('stats').innerHTML = rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('');
  const v = $('voyage');
  if (S.travel) {
    v.hidden = false;
    v.innerHTML = `<div>${esc(t('ui.voyage.flying', { to: t(`loc.${S.travel.to}.name`) }))}</div><div class="bar"><b style="width:${(S.travel.t / S.travel.total * 100).toFixed(1)}%"></b></div><div class="mono dim" style="font-size:13px">${esc(t('ui.voyage.remaining', { t: duration(S.travel.total - S.travel.t) }))}</div>`;
  } else if (S.r.scan) { v.hidden = false; v.innerHTML = `<div>${esc(t('ui.voyage.docked', { at: t(`loc.${S.loc}.name`) }))}</div>`; }
  else v.hidden = true;
  const ev = $('event');
  if (S.event) {
    const id = S.event.id;
    if (ev.dataset.id !== id) {
      ev.dataset.id = id;
      ev.innerHTML = `<span class="name">${esc(t(`ui.events.${id}.name`))}</span><div class="bar"><b></b></div><button class="btn" data-claim="1">${esc(t(`ui.events.${id}.claim`))}</button>`;
    }
    ev.hidden = false;
    (ev.querySelector('.bar > b') as HTMLElement).style.width = (S.event.ttl / 20 * 100).toFixed(1) + '%';
  } else { ev.hidden = true; ev.dataset.id = ''; }
}

// ---------- záložky ----------
function tabsAvail() {
  const list: [typeof tab, string][] = [['build', t('ui.tabs.build')]];
  if (S.b.lab > 0 || Object.keys(S.r).length) list.push(['research', t('ui.tabs.research')]);
  if (S.r.scan) list.push(['map', t('ui.tabs.map')]);
  return list;
}
function renderTabs() {
  const list = tabsAvail();
  if (!list.find(([id]) => id === tab)) tab = 'build';
  const dot = RESEARCH_IDS.some((id) => E.researchAvailable(S, id) && E.affordable(S, R[id].cost));
  const html = list.map(([id, n]) => `<button class="tab" role="tab" aria-selected="${id === tab}" data-tab="${id}">${esc(n)}${id === 'research' && dot && tab !== 'research' ? '<span class="dot"></span>' : ''}</button>`).join('');
  const el = $('tabs'); if (el.innerHTML !== html) el.innerHTML = html;
}

function computeKey() {
  if (tab === 'build') return 'b' + BUILDING_IDS.filter((id) => E.isUnlocked(S, id)).join() + buyMax;
  if (tab === 'research') return 'r' + RESEARCH_IDS.map((id) => (S.r[id] ? 2 : E.researchAvailable(S, id) ? 1 : 0)).join('');
  if (tab === 'map') return 'm' + LOCATION_IDS.map((id) => (S.visited[id] ? 1 : 0)).join('');
  return 's';
}

function buildView() {
  let h = '';
  if (tab === 'build') {
    h += `<div class="toolbar">${esc(t('ui.buyMode'))} <span class="seg"><button data-max="0" aria-pressed="${!buyMax}">×1</button><button data-max="1" aria-pressed="${buyMax}">Max</button></span></div><div class="list">`;
    for (const id of BUILDING_IDS) {
      if (!E.isUnlocked(S, id)) continue;
      const conv = !!B[id].cons;
      h += `<div class="item" data-b="${id}"><h3>${esc(t(`b.${id}.name`))} <span class="n" data-f="n"></span></h3><p>${esc(t(`b.${id}.desc`))}</p><div class="eff" data-f="eff"></div><div class="cost" data-f="cost"></div>
        <div class="act"><button class="btn" data-buy="${id}">${esc(t('ui.buy'))}</button>${conv ? `<button class="btn ghost" data-toggle="${id}"></button>` : ''}</div></div>`;
    }
    h += '</div>';
  } else if (tab === 'research') {
    const open = RESEARCH_IDS.filter((id) => E.researchAvailable(S, id));
    const locked = RESEARCH_IDS.filter((id) => !S.r[id] && !E.researchAvailable(S, id) && R[id].reqKey);
    const done = RESEARCH_IDS.filter((id) => S.r[id]);
    h += '<div class="list">' + (open.length ? open.map((id) => `<div class="item" data-r="${id}"><h3>${esc(t(`r.${id}.name`))}</h3><p>${esc(t(`r.${id}.desc`))}</p><div class="cost" data-f="cost"></div><div class="act"><button class="btn" data-res="${id}">${esc(t('ui.research'))}</button></div></div>`).join('') : `<p class="empty">${esc(t('ui.researchNone'))}</p>`) + '</div>';
    const lockedShown = locked.filter((id, i, a) => a.findIndex((x) => R[x].reqKey === R[id].reqKey) === i);
    if (lockedShown.length) h += `<div class="section-label">${esc(t('ui.researchLocked'))}</div><div class="list">` + lockedShown.map((id) => `<div class="item done"><h3>?</h3><p>${esc(t('ui.needs', { x: t('req.' + R[id].reqKey) }))}</p></div>`).join('') + '</div>';
    if (done.length) h += `<div class="section-label">${esc(t('ui.researchDone'))}</div><div class="list">` + done.slice().reverse().map((id) => `<div class="item done"><h3>${esc(t(`r.${id}.name`))}</h3><p>${esc(t(`r.${id}.desc`))}</p></div>`).join('') + '</div>';
  } else if (tab === 'map') {
    h += '<div class="mapbox"><canvas id="map"></canvas></div><div class="list">';
    for (const id of LOCATION_IDS) {
      if (id === 'belt') continue;
      h += `<div class="item" data-l="${id}"><h3>${esc(t(`loc.${id}.name`))} ${S.visited[id] ? `<span class="tag on">${esc(t('ui.map.visited'))}</span>` : ''}</h3><p>${esc(t(`loc.${id}.desc`))}</p><div class="cost" data-f="cost"></div><div class="act"><button class="btn" data-go="${id}"></button></div></div>`;
    }
    h += `<div class="item" data-l="belt"><h3>${esc(t('loc.belt.name'))}</h3><p>${esc(t('ui.map.homeDesc'))}</p><div class="act"><button class="btn ghost" data-go="belt"></button></div></div></div>`;
  }
  $('view').innerHTML = h;
}

// ---------- nastavení (boční panel) ----------
function settingsHTML() {
  return `<div class="settings">
      <section><h3>${esc(t('ui.settings.sound'))}</h3><div class="row"><button class="btn ghost" data-act="sound"></button></div>
        <div class="vols">${VOL_KEYS.map((k) => `<label class="vol" for="vol-${k}"><span>${esc(t('ui.settings.vol.' + k))}</span><input type="range" id="vol-${k}" data-vol="${k}" min="0" max="100" step="5" value="${Math.round(volOf(k) * 100)}"><output class="mono" for="vol-${k}">${Math.round(volOf(k) * 100)} %</output></label>`).join('')}</div></section>
      <section><h3>${esc(t('ui.settings.save'))}</h3><div class="row"><button class="btn ghost" data-act="save">${esc(t('ui.settings.saveNow'))}</button></div>
        <p style="margin-top:8px">${esc(t('ui.settings.offlineRule'))}</p></section>
      <section><h3>${esc(t('ui.settings.export'))}</h3><p>${esc(t('ui.settings.exportHint'))}</p><textarea id="exportText" readonly></textarea><div class="row"><button class="btn ghost" data-act="export">${esc(t('ui.settings.export'))}</button><button class="btn ghost" data-act="copy">${esc(t('ui.settings.copy'))}</button></div></section>
      <section><h3>${esc(t('ui.settings.import'))}</h3><p>${esc(t('ui.settings.importHint'))}</p><textarea id="importText"></textarea><div class="row"><button class="btn ghost" data-act="import">${esc(t('ui.settings.import'))}</button></div></section>
      <section><h3>${esc(t('ui.settings.about'))}</h3><p>${esc(t('ui.settings.aboutText'))}</p><p class="mono">${esc(t('ui.settings.version', { v: VERSION }))}</p><div class="row"><button class="btn ghost" data-act="reset">${esc(t('ui.settings.reset'))}</button></div></section>
    </div>`;
}
function openSettings() {
  $('drawerTitle').textContent = t('ui.tabs.settings');
  $('drawerClose').setAttribute('aria-label', t('ui.close'));
  $('drawerBody').innerHTML = settingsHTML();
  syncSettings(); fillExport();
  $('drawer').hidden = false; $('settingsBtn').setAttribute('aria-expanded', 'true');
  $('drawerClose').focus();
}
function closeSettings() {
  if ($('drawer').hidden) return;
  $('drawer').hidden = true; $('settingsBtn').setAttribute('aria-expanded', 'false'); $('settingsBtn').focus();
}
function syncSettings() {
  const sb = document.querySelector<HTMLButtonElement>('#drawerBody [data-act=sound]');
  if (sb) sb.textContent = S.settings.sound ? t('ui.settings.soundOn') : t('ui.settings.soundOff');
}

function updateView() {
  const view = $('view');
  if (tab === 'build') {
    view.querySelectorAll<HTMLElement>('[data-b]').forEach((el) => {
      const id = el.dataset.b as BuildingId, d = B[id], m = E.mult(S, id);
      const count = Math.floor(S.b[id]);
      el.querySelector('[data-f=n]')!.innerHTML = esc(t('ui.pieces', { n: num(count) }));
      // řádek „1 kus“ a „všechny dohromady“: co bere → co dává, se jmény surovin
      const flow = (k: number) => {
        if (d.makes) return esc(t('ui.makes', { n: num(d.makes.rate * m * k) }));
        const part = (r: Res, v: number, sign: string) => `<span><span style="color:${COLOR[r]}">${esc(t('res.' + r))}</span> ${sign}${esc(rate(r, v))}</span>`;
        const ins = (Object.keys(d.cons ?? {}) as Res[]).map((r) => part(r, d.cons![r]! * E.consScale(S, id) * k, '−'));
        const outs = (Object.keys(d.prod ?? {}) as Res[]).map((r) => part(r, d.prod![r]! * m * k, '+'));
        return ins.length ? `${ins.join(' ')} <span class="arrow">→</span> ${outs.join(' ')}` : outs.join(' ');
      };
      let eff = `<span class="effrow"><span class="lbl">${esc(t('ui.one'))}</span>${flow(1)}</span>`;
      if (count >= 2 || (count >= 1 && d.cons)) {
        const e = d.cons ? (S.off[id] ? 0 : (S.eff[id] ?? 1)) : 1;
        const note = d.cons && e < 0.995 ? ` <span class="dim">(${esc(S.off[id] ? t('ui.stopped') : t('ui.running', { n: Math.round(e * 100) }))})</span>` : '';
        // stojí-li převodník (vypnutý nebo bez vstupu), místo nul jen důvod
        const body = e < 0.005 ? `<span class="dim">${esc(S.off[id] ? t('ui.stopped') : t('ui.starved'))}</span>` : flow(count * e) + note;
        eff += `<span class="effrow"><span class="lbl">${esc(t('ui.all', { n: num(count) }))}</span>${body}</span>`;
      }
      el.querySelector('[data-f=eff]')!.innerHTML = eff;
      let c = E.cost(S, id), n = 1;
      if (buyMax) { const pv = E.previewMax(S, id); if (pv.count > 0) { c = pv.total; n = pv.count; } }
      el.querySelector('[data-f=cost]')!.innerHTML = costHTML(c);
      const btn = el.querySelector<HTMLButtonElement>('[data-buy]')!;
      btn.disabled = !E.affordable(S, E.cost(S, id));
      btn.textContent = n > 1 ? t('ui.buyN', { n }) : t('ui.buy');
      const tg = el.querySelector<HTMLButtonElement>('[data-toggle]');
      if (tg) tg.textContent = S.off[id] ? t('ui.turnOn') : t('ui.turnOff');
    });
  } else if (tab === 'research') {
    view.querySelectorAll<HTMLElement>('[data-r]').forEach((el) => {
      const id = el.dataset.r as ResearchId;
      el.querySelector('[data-f=cost]')!.innerHTML = costHTML(R[id].cost);
      el.querySelector<HTMLButtonElement>('[data-res]')!.disabled = !E.affordable(S, R[id].cost);
    });
  } else if (tab === 'map') {
    view.querySelectorAll<HTMLButtonElement>('[data-go]').forEach((b) => {
      const id = b.dataset.go as LocationId, item = b.closest<HTMLElement>('[data-l]')!;
      const cf = item.querySelector('[data-f=cost]');
      if (cf) cf.innerHTML = `${costHTML({ energy: L[id].cost })}<span class="dim">${esc(t('ui.map.flight', { t: duration(E.travelTime(S, id)) }))}</span>`;
      const here = S.loc === id && !S.travel;
      b.disabled = !!S.travel || here || (id !== 'belt' && S.res.energy < L[id].cost);
      b.textContent = S.travel?.to === id ? t('ui.map.onWay') : here ? t('ui.map.here') : id === 'belt' ? t('ui.map.home') : t('ui.map.fly');
    });
  }
}

function renderView(force = false) {
  const k = computeKey();
  if (force || k !== viewKey) { viewKey = k; buildView(); }
  updateView();
}

// ---------- deník a kapitoly ----------
let logLen = -1;
function renderLog(fresh = false) {
  if (S.log.length === logLen && !fresh) return;
  logLen = S.log.length;
  $('logTitle').textContent = t('ui.journal');
  $('logCount').textContent = String(S.log.length);
  $('log').innerHTML = S.log.map((e, i) => {
    const label = e.kind === 'fact' ? `${t('ui.fact')} · ${t('ui.day', { n: e.day.toLocaleString('cs-CZ') })}` : t('ui.day', { n: e.day.toLocaleString('cs-CZ') });
    return `<div class="entry ${e.kind}${fresh && i === 0 ? ' new' : ''}"><span class="t">${esc(label.toUpperCase())}</span>${esc(t(e.key, e.vars))}</div>`;
  }).join('');
}
function renderChapters() {
  const names = ['c1', 'c2', 'c3', 'c4', 'c5'];
  const cur = S.chapterDone; // 0 = hraje se kapitola 1
  const html = `<ol>${names.map((n, i) => {
    const cls = i < cur ? 'done' : i === cur ? 'cur' : '';
    const label = i <= cur ? t('ui.chapters.' + n) : t('ui.chapters.locked');
    return `<li class="${cls}"><span class="num">${i + 1}</span>${esc(label)}</li>`;
  }).join('')}</ol>`;
  const el = $('chapters'); if (el.innerHTML !== html) el.innerHTML = html;
  el.setAttribute('aria-label', t('ui.chapters.label'));
}
function renderSoundBtn() {
  const b = $('soundBtn');
  b.setAttribute('aria-pressed', String(S.settings.sound));
  b.innerHTML = S.settings.sound
    ? '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6" stroke="currentColor" stroke-width="1.6"/></svg>';
}
function checkChapterModal() {
  if (S.chapterDone >= 1 && !S.story.modal1) {
    S.story.modal1 = true;
    $('modalTitle').textContent = t('ui.chapterDone.title');
    $('modalBody').innerHTML = esc(t('ui.chapterDone.body'));
    $('modalOk').textContent = t('ui.chapterDone.ok');
    $('modal').hidden = false; $('modalOk').focus();
  }
}

// ---------- vstupy ----------
function onJournal(newKeys: string[]) {
  if (!newKeys.length) return;
  renderLog(true);
  if (S.settings.sound) chime();
}
function bind() {
  // posuvníky hlasitosti: mění se hned, uloží se po puštění
  document.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement; const k = el.dataset?.vol as VolKey | undefined;
    if (!k) return;
    S.settings.vol = { ...S.settings.vol, [k]: Number(el.value) / 100 }; setVolumes(audioVols());
    const out = el.parentElement?.querySelector('output'); if (out) out.textContent = `${el.value} %`;
  });
  document.addEventListener('change', (e) => { if ((e.target as HTMLElement).dataset?.vol) save(); });
  document.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('button');
    if (!b) return;
    const d = b.dataset;
    if (d.tab) { tab = d.tab as typeof tab; renderTabs(); renderView(true); $('view').scrollTop = 0; return; }
    if (d.max) { buyMax = d.max === '1'; renderView(true); return; }
    if (d.buy) { E.buy(S, d.buy as BuildingId, buyMax); onJournal(E.checkJournal(S)); renderAll(); return; }
    if (d.toggle) { const id = d.toggle as BuildingId; S.off[id] = !S.off[id]; renderView(); return; }
    if (d.res) { if (E.doResearch(S, d.res as ResearchId)) { onJournal(E.checkJournal(S)); renderTabs(); renderView(true); } return; }
    if (d.go) {
      const id = d.go as LocationId;
      if (id === 'belt' && !S.travel && S.loc !== 'belt') S.travel = { from: S.loc, to: 'belt', t: 0, total: 8 };
      else E.depart(S, id);
      onJournal(E.checkJournal(S)); renderView(true); renderRig(); return;
    }
    if (d.claim) {
      const got = E.claimEvent(S);
      if (got) {
        const r = EVENTS[got.id].res, v = amount(r, got.amount);
        toast(t(`ui.events.${got.id}.got`, { v }), 4500);
        renderTop(); flashGain(r, got.amount);
        if (S.settings.sound) chime();
      }
      renderRig(); return;
    }
    if (d.act) return settingsAction(d.act, b);
  });
  const rock = $('rock');
  rock.addEventListener('click', (e) => {
    const p = E.mine(S);
    { const cv = $<HTMLCanvasElement>('rockc'), cr = cv.getBoundingClientRect();
      if (e.clientX) hitRock((e.clientX - cr.left) * (cv.width / cr.width), (e.clientY - cr.top) * (cv.height / cr.height), cv.width); else hitRock(undefined, undefined, cv.width); }
    const w = $('rockwrap'), r = w.getBoundingClientRect();
    const f = document.createElement('span'); f.className = 'float'; f.innerHTML = esc('+' + mass(p));
    const x = (e.clientX || r.left + r.width / 2) - r.left, y = (e.clientY || r.top + r.height / 2) - r.top;
    f.style.left = (x - 12) + 'px'; f.style.top = (y - 16) + 'px';
    w.appendChild(f); setTimeout(() => f.remove(), 1000);
    onJournal(E.checkJournal(S)); renderTop();
  });
  $('soundBtn').addEventListener('click', toggleSound);
  $('settingsBtn').addEventListener('click', () => ($('drawer').hidden ? openSettings() : closeSettings()));
  $('drawerClose').addEventListener('click', closeSettings);
  $('drawer').addEventListener('click', (e) => { if (e.target === $('drawer')) closeSettings(); });
  $('modalOk').addEventListener('click', () => { $('modal').hidden = true; save(); });
  // vysvětlivky jednotek: najetí, fokus i klepnutí (dotyk)
  document.addEventListener('pointerover', (e) => { const el = (e.target as HTMLElement).closest<HTMLElement>('[data-unit]'); if (el && e.pointerType === 'mouse') showTip(el); });
  document.addEventListener('pointerout', (e) => { if ((e.target as HTMLElement).closest('[data-unit]')) hideTip(); });
  document.addEventListener('focusin', (e) => { const el = (e.target as HTMLElement).closest<HTMLElement>('[data-unit]'); if (el) showTip(el); });
  document.addEventListener('focusout', hideTip);
  document.addEventListener('pointerdown', (e) => { const el = (e.target as HTMLElement).closest<HTMLElement>('[data-unit]'); if (el && e.pointerType !== 'mouse') { showTip(el); setTimeout(hideTip, 3500); } });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') { hideTip(); closeSettings(); if (!$('modal').hidden) { $('modal').hidden = true; } } });
}
function toggleSound() {
  S.settings.sound = !S.settings.sound;
  setSound(S.settings.sound, !!S.r.scan);
  renderSoundBtn(); syncSettings(); save();
}
function fillExport() { const ta = document.getElementById('exportText') as HTMLTextAreaElement | null; if (ta) ta.value = encodeSave(S); }
let resetArmed = 0;
function settingsAction(act: string, b: HTMLElement) {
  if (act === 'save') { save(false); return; }
  if (act === 'export') { fillExport(); (document.getElementById('exportText') as HTMLTextAreaElement).select(); return; }
  if (act === 'copy') {
    fillExport(); const ta = document.getElementById('exportText') as HTMLTextAreaElement;
    navigator.clipboard?.writeText(ta.value).then(() => toast(t('ui.settings.copied')), () => { ta.select(); });
    return;
  }
  if (act === 'import') {
    const ta = document.getElementById('importText') as HTMLTextAreaElement;
    const st = decodeSave(ta.value);
    if (!st) { toast(t('ui.settings.importBad')); return; }
    S = st; S.last = Date.now(); setVolumes(audioVols()); save(); toast(t('ui.settings.importOk')); renderAll(true); return;
  }
  if (act === 'sound') { toggleSound(); return; }
  if (act === 'reset') {
    if (Date.now() - resetArmed < 4000) {
      const keepSound = S.settings.sound, keepVol = S.settings.vol;
      S = newState(); S.settings.sound = keepSound; S.settings.vol = keepVol;
      E.checkJournal(S); save(); toast(t('ui.settings.resetDone')); renderAll(true); resetArmed = 0; return;
    }
    resetArmed = Date.now(); b.textContent = t('ui.settings.resetConfirm');
    setTimeout(() => { if (b.isConnected) b.textContent = t('ui.settings.reset'); }, 4000);
  }
}

function renderAll(fresh = false) {
  renderTop(); renderRig(); renderTabs(); renderView(fresh); renderLog(fresh); renderChapters(); renderSoundBtn();
}

// ---------- smyčka ----------
export function start() {
  S = load() ?? newState();
  setVolumes(audioVols());
  applyOffline((Date.now() - S.last) / 1000);
  E.checkJournal(S);
  bind();
  const stars = $<HTMLCanvasElement>('stars');
  sizeStars(stars); addEventListener('resize', () => sizeStars(stars));
  renderAll(true);
  if (S.settings.sound) {
    // prohlížeč pustí zvuk až po první interakci
    const resume = () => { setSound(true, !!S.r.scan); removeEventListener('pointerdown', resume); };
    addEventListener('pointerdown', resume);
  }
  let prev = performance.now(), uiAcc = 0, saveAcc = 0, starAcc = 1;
  const frame = (now: number) => {
    const dt = Math.min(1, (now - prev) / 1000); prev = now; lastActive = Date.now();
    onJournal(E.tick(S, dt));
    uiAcc += dt; if (uiAcc > 0.2) { uiAcc = 0; renderTop(); renderRig(); renderTabs(); renderView(); renderChapters(); checkChapterModal(); }
    saveAcc += dt; if (saveAcc > 15) { saveAcc = 0; save(); }
    drawRock($<HTMLCanvasElement>('rockc'), dt, S.b.drone);
    starAcc += dt; if (starAcc > 0.05) { starAcc = 0; drawStars(stars, now / 1000); }
    if (tab === 'map') { const m = document.getElementById('map') as HTMLCanvasElement | null; if (m) drawMap(m, S, now / 1000); }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  // skrytá karta = hráč není přítomen: po návratu jen offline zásoby
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { save(); return; }
    const away = (Date.now() - lastActive) / 1000;
    prev = performance.now();
    if (away > 5) { applyOffline(away); renderLog(true); }
    lastActive = Date.now();
  });
  addEventListener('pagehide', () => save());
}
