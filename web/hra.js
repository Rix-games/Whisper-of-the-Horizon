(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/core/rng.ts
  function mulberry(a) {
    return function() {
      a |= 0;
      a = a + 1831565813 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  var rnd = Math.random;
  function segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
    let t = l ? ((px - ax) * dx + (py - ay) * dy) / l : 0;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - ax - dx * t, py - ay - dy * t);
  }
  function angDiff(a, b) {
    let d = (a - b) % (Math.PI * 2);
    if (d > Math.PI) d -= Math.PI * 2;
    if (d < -Math.PI) d += Math.PI * 2;
    return d;
  }

  // src/core/galaxy.ts
  var GV = 2;
  var GIMG = { cx: 0.5068, cy: 0.4834, R: 0.4 };
  var RAW = [-0.277, 0.553, 0, 0.027, -0.137, 1, -0.013, -0.052, 1, -0.121, -0.13, 1, -0.053, 0.028, 1, 0.143, -0.038, 1, 0.048, 0.14, 1, 0.082, -4e-3, 1, 0.091, -0.12, 1, 0.014, 0.076, 1, -0.136, 0.052, 1, -3e-3, 1e-3, 1, -8e-3, 0.123, 1, -0.021, -0.125, 1, -0.106, -0.036, 1, -0.06, -0.073, 1, 0.038, -0.084, 1, -0.09, 0.143, 1, -0.104, 0.097, 1, 0.1, 0.113, 1, -0.047, 0.161, 1, 0.067, 0.035, 1, 0.147, 0.056, 1, -0.053, -0.164, 1, -0.063, 0.071, 1, 0.108, -0.062, 1, -0.147, -0.019, 1, -0.148, -0.061, 1, -0.058, 0.113, 1, 0.11, -0.299, 0, -0.445, 0.649, 0, -0.354, -0.758, 0, 0.424, 0.615, 0, 0.287, -0.425, 0, 0.153, -0.626, 0, 0.273, 0.592, 0, 0.439, 0.555, 0, -0.256, -0.724, 0, -0.871, -0.337, 0, 0.112, -0.677, 0, 0.586, 0.501, 0, 0.333, 0.634, 0, 0.4, -0.345, 0, 0.1, -0.25, 0, -0.147, -0.732, 0, -0.379, -0.67, 0, -0.058, -0.703, 0, -0.309, 0.473, 0, -0.595, -0.536, 0, -0.591, -0.048, 0, -0.764, -0.4, 0, -0.448, 0.107, 0, -0.241, 0.176, 0, 0.154, -0.266, 0, 0.351, -0.422, 0, 0.135, 0.654, 0, -0.455, -0.046, 0, 0.175, -0.185, 0, 0.546, 0.101, 0, -0.46, 0.154, 0, 0.175, 0.673, 0, -0.421, -0.131, 0, -0.064, 0.669, 0, -0.427, 0.321, 0, -0.274, -0.238, 0, 0.026, 0.479, 0, -0.186, 0.181, 0, -0.092, -0.75, 0, 0.015, -0.3, 0, -0.871, -0.177, 0, -0.192, -0.324, 0, -0.303, 0.399, 0, -0.423, -0.703, 0, 0.523, 0.514, 0, -0.096, 0.618, 0, 0.412, 0.11, 0, -0.185, 0.098, 0, -0.07, -0.314, 0, -0.157, 0.608, 0, -0.483, -0.605, 0, 0.037, 0.699, 0, -0.545, -0.134, 0, 0.534, 0.612, 0, 0.643, 0.463, 0, -0.171, 0.223, 0, -0.197, 0.289, 0, -0.015, 0.668, 0, -0.244, 0.626, 0, -0.262, -0.768, 0, -0.638, -0.552, 0, 0.206, 0.616, 0, 0.628, 0.533, 0, -0.203, -0.707, 0, -0.838, -0.235, 0, -0.349, 0.441, 0, 0.124, 0.609, 0, -0.868, 0.36, 0, -0.844, 0.019, 0, -0.734, -0.481, 0, -0.424, 0.393, 0, 0.337, -0.467, 0, 0.282, -0.524, 0, 0.403, -0.245, 0, 0.229, -0.607, 0, -0.427, 0.026, 0, -0.133, 0.327, 0, 0.185, -0.134, 0, -0.013, 0.571, 0, 0.033, -0.624, 0, -0.285, -0.3, 0, -0.083, -0.357, 0, 0.457, -0.276, 0, 0.385, 0.59, 0, -0.499, -0.66, 0, 0.076, -0.418, 0, -0.7, -0.515, 0, -0.324, -0.283, 0, -0.604, 0.151, 0, 0.259, 0.635, 0, 0.687, 0.438, 0, -0.385, 0.362, 0, 0.05, -0.705, 0, -0.139, 0.664, 0, -0.17, 0.139, 0, 0.419, 0.672, 0, -0.31, -0.619, 0, 0.244, 0.306, 0, -0.908, 0.198, 0, 0.63, -0.29, 0, -0.631, 0.205, 0, 0.276, 0.68, 0, -0.319, -0.725, 0, -0.511, -0.171, 0, -0.413, -0.184, 0, -0.215, 0.238, 0, -0.159, -0.258, 0, -0.152, -0.672, 0, 0.44, 7e-3, 0, -0.364, -0.258, 0, 0.072, 0.58, 0, 0.607, -0.069, 0, -0.357, 0.484, 0, -0.389, -0.332, 0, -0.665, -0.444, 0, -9e-3, -0.653, 0, -0.62, -0.626, 0, -0.134, 0.279, 0, -0.075, -0.664, 0, 0.183, -0.23, 0, 0.091, 0.671, 0, 0.382, 0.633, 0, -0.171, -0.81, 0, -0.779, -0.328, 0, -0.411, 0.171, 0, -0.635, 0.036, 0, 0.051, -0.26, 0, 0.571, 0.461, 0, 0.274, 0.732, 0, -0.13, -0.323, 0, -0.435, -0.616, 0, -0.578, -0.603, 0, 0.64, 0.362, 0, -0.948, 0.048, 0, 0.05, 0.657, 0, 0.448, -0.048, 0, -0.136, 0.181, 0, -0.23, -0.261, 0, -0.446, 0.229, 0, -0.804, -0.262, 0, -0.177, 0.571, 0, -0.374, -0.72, 0, -0.629, -0.012, 0, -0.768, -0.448, 0, 0.464, 0.796, 0, 0.522, 0.156, 0, -0.498, 0.192, 0, 0.309, 0.254, 0, -0.392, -0.051, 0, -9e-3, 0.367, 0, -0.345, -0.153, 0, -0.492, 0.091, 0, 0.723, 0.607, 0, -0.024, -0.273, 0, 0.203, 0.318, 0, -0.038, -0.769, 0, -0.91, 0.131, 0, -0.329, 0.548, 0, -0.418, 0.28, 0, -0.652, -0.491, 0, -0.443, -0.661, 0, 0.041, 0.332, 0, 0.646, 0.725, 0, 0.345, -0.53, 0, 0.385, 0.379, 0, -0.503, -0.557, 0, -0.356, -0.202, 0, -0.466, 0.057, 0, 0.6, -0.02, 0, 0.849, 0.025, 0, 0.258, -0.198, 0, 0.5, 0.55, 0, -0.219, 0.543, 0, -0.236, 0.583, 0, 0.488, 0.19, 0, -0.011, -0.737, 0, -0.896, -0.029, 0, -0.785, -0.517, 0, -0.021, -0.438, 0, -0.58, -0.477, 0, -0.216, 0.813, 0, -0.037, 0.622, 0, 0.333, 0.695, 0, 0.565, 0.751, 0, 0.225, -0.532, 0, 0.632, -0.121, 0, 0.406, -0.403, 0, -0.805, -0.474, 0, -0.015, -0.345, 0, 0.558, 0.545, 0, 0.314, 0.557, 0, -0.221, -0.757, 0, 0.601, 0.032, 0, 0.125, 0.329, 0, 0.072, -0.197, 0, 0.391, 0.522, 0, -0.389, -0.601, 0, 0.555, 0.412, 0, -0.121, 0.581, 0, 0.421, -0.089, 0, -0.072, -0.456, 0, -0.475, -0.695, 0, 0.433, -0.157, 0, -0.848, 0.436, 0, -0.402, 0.452, 0, 0.301, -0.06, 0, -0.298, 0.609, 0, -0.278, 0.784, 0, 0.11, -0.173, 0, 0.437, 0.055, 0, 0.074, -0.874, 0, -0.47, 0.298, 0, 0.221, -0.103, 0, 0.393, -0.297, 0, -0.029, 0.465, 0, 0.742, 0.225, 0, 0.337, -0.308, 0, -0.07, 0.43, 0, -0.241, -0.675, 0, -0.09, 0.188, 0, -0.193, 0.869, 0, 0.093, -0.62, 0, -0.175, 0.388, 0, 0.212, 0.709, 0, 0.346, -0.76, 0, -0.738, -0.26, 0, 0.613, -0.164, 0, 0.06, -0.31, 0, -0.471, 0.571, 0, -0.377, 0.405, 0, 0.347, 0.211, 0, -0.198, 0.629, 0, 0.023, 0.615, 0, 0.22, -0.161, 0, 0.146, -0.573, 0, 0.445, -0.225, 0, 0.475, -0.136, 0, 0.887, 0.394, 0, 0.765, 0.588, 0, 0.044, 0.377, 0, -0.281, 0.506, 0, -0.12, 0.228, 0, 0.6, 0.426, 0, 0.191, -0.585, 0, 0.167, 0.468, 0, 0.095, 0.383, 0, -0.437, -0.089, 0, -0.699, -0.341, 0, 0.165, -0.331, 0, -0.501, -0.221, 0, -0.647, 0.25, 0, 0.196, -0.646, 0, 0.596, -0.21, 0, -0.171, -0.623, 0, -0.885, -0.243, 0, 0.752, 0.534, 0, 0.671, 0.395, 0, -0.544, -0.063, 0, -0.826, -0.342, 0, 0.626, 0.648, 0, 0.667, 0.683, 0, -0.443, -0.29, 0, -0.107, 0.4, 0, -0.824, -0.393, 0, 0.131, -0.219, 0, 0.339, -0.376, 0, 0.173, 0.746, 0, 0.343, 0.588, 0, 0.949, 0.069, 0, 0.267, -0.568, 0, 0.365, 0.849, 0];
  var cache = null;
  var TOTAL_STARS = 1e11;
  function galaxyNodes() {
    if (cache) return cache;
    const r = mulberry(21), pts = [];
    for (let k = 0; k < RAW.length; k += 3) pts.push({ i: k / 3, x: RAW[k], y: RAW[k + 1], stars: 0, core: !!RAW[k + 2], tw: r() * 6.28 });
    const home = pts[0];
    let sum = 0;
    for (const p of pts) {
      const dh = Math.hypot(p.x - home.x, p.y - home.y);
      p.stars = Math.pow(10, 4 + 5.2 * Math.pow(Math.min(1, dh / 1.5), 0.8) + r() * 0.7 + (p.core ? 0.9 : 0));
      if (p !== home) sum += p.stars;
    }
    for (const p of pts) if (p !== home) p.stars *= TOTAL_STARS / sum;
    home.stars = 1;
    home.home = true;
    cache = pts;
    return pts;
  }
  function remapColonies(col) {
    const c = (col.match(/1/g) || []).length;
    const N = galaxyNodes(), h2 = N[0];
    const ord = N.slice(1).sort((a, b) => Math.hypot(a.x - h2.x, a.y - h2.y) - Math.hypot(b.x - h2.x, b.y - h2.y));
    const out = new Array(N.length).fill("0");
    out[0] = "1";
    ord.slice(0, Math.max(0, c - 1)).forEach((p) => out[p.i] = "1");
    return out.join("");
  }

  // src/core/state.ts
  var SAVE_KEY = "sepot-horizontu-1";
  var SAVE_VERSION = 2;
  function newState() {
    return {
      v: SAVE_VERSION,
      ch: 1,
      stage: 0,
      t: 0,
      chT: 0,
      stT: 0,
      res: { ore: 0, plasma: 0, mass: 0, sails: 0, energy: 0, data: 0 },
      tot: { ore: 0, plasma: 0, mass: 0, sails: 0 },
      hole: { D: 0, combo: 0, flares: 0, hits: 0, perfect: 0 },
      b: {},
      r: {},
      mis: {},
      run: null,
      unl: {},
      seen: {},
      log: [],
      base: 0,
      auto: {},
      bank: {},
      n: 0,
      col: "",
      gv: GV,
      prog: {},
      best: { chainHand: 0, reson: 0 },
      stats: { cuts: 0, full: 0, flares: 0, perfect: 0, cme: 0, sweeps: 0 },
      done: 0,
      last: Date.now(),
      opt: { sound: false, vol: 0.8, noise: 0.7, fx: 1 },
      story: {}
    };
  }
  function migrate(o) {
    const s2 = newState();
    if (!o || typeof o !== "object") return s2;
    if ((o.v ?? 1) < 2) {
      if (o.ch >= 3) o.ch++;
      if (o.done >= 3) o.done++;
      if (o.story?.intro3) {
        o.story.intro4 = 1;
        delete o.story.intro3;
      }
      if (o.seen?.detail3 != null) {
        o.seen.detail4 = o.seen.detail3;
        delete o.seen.detail3;
      }
    }
    for (const k of Object.keys(s2)) {
      if (o[k] === void 0) continue;
      if (s2[k] && typeof s2[k] === "object" && !Array.isArray(s2[k]) && o[k] && typeof o[k] === "object") s2[k] = { ...s2[k], ...o[k] };
      else s2[k] = o[k];
    }
    if (o.gv !== GV) {
      if (s2.col) {
        s2.col = remapColonies(s2.col);
        s2.prog = {};
      }
      s2.gv = GV;
    }
    s2.v = SAVE_VERSION;
    return s2;
  }
  function encodeSave(s2) {
    const json = JSON.stringify(s2);
    return btoa(unescape(encodeURIComponent(json)));
  }
  function decodeSave(str) {
    try {
      return migrate(JSON.parse(decodeURIComponent(escape(atob(str.trim())))));
    } catch {
      return null;
    }
  }

  // src/core/engine.ts
  var engine_exports = {};
  __export(engine_exports, {
    BUILD: () => BUILD,
    JOURNAL: () => JOURNAL,
    K: () => K,
    MISSIONS: () => MISSIONS,
    RESEARCH: () => RESEARCH,
    RT: () => RT,
    UNLOCK_GAP: () => UNLOCK_GAP,
    archiveData: () => archiveData,
    buy: () => buy,
    c0Of: () => c0Of,
    capOf: () => capOf,
    chDef: () => chDef,
    cost: () => cost,
    costN: () => costN,
    dataRate: () => dataRate,
    doResearch: () => doResearch,
    emit: () => emit,
    finalReady: () => finalReady,
    fresh: () => fresh,
    gOf: () => gOf,
    gain: () => gain,
    mVisible: () => mVisible,
    maxAfford: () => maxAfford,
    maxed: () => maxed,
    nextChapter: () => nextChapter,
    offline: () => offline,
    on: () => on,
    passive: () => passive,
    power: () => power,
    rVisible: () => rVisible,
    stageMax: () => stageMax,
    startMission: () => startMission,
    tick: () => tick,
    unlocked: () => unlocked
  });

  // src/core/types.ts
  var R = (id) => (s2) => !!s2.r[id];
  var ST = (n2) => (s2) => s2.stage >= n2;

  // src/core/bus.ts
  var listeners = [];
  function on(f) {
    listeners.push(f);
  }
  function emit(type, id, v) {
    for (const f of listeners) f({ type, id, v });
  }
  var RT = {
    inc: { ore: 0, plasma: 0, mass: 0, sails: 0 },
    rate: { ore: 0, plasma: 0, mass: 0, sails: 0 },
    P: 0,
    jt: 0,
    flare: 0
  };
  var n = (s2, id) => s2.b[id] || 0;
  var has = (s2, id) => !!s2.r[id];
  var did = (s2, id) => !!s2.mis[id];
  var mile = (cnt) => Math.pow(2, Math.floor(cnt / 25));
  function gain(s2, cur, v) {
    s2.res[cur] += v;
    s2.tot[cur] += v;
    RT.inc[cur] += v;
  }

  // src/chapters/ch1.ts
  var T1 = {
    goals: [2e4, 1e7, 2e10, 2e13, 1e16],
    // W – Typ I na konci
    rtg: 500,
    // W platformy na startu
    layerMult: 4,
    // ×ruda za každou hlubší vrstvu (= stadium)
    refine: 1.12,
    // ×ruda za rafinerii
    hand: 1.6,
    // ×ruční řez za úroveň Fokusace
    drone: 0.7,
    // dron dává ×0,7 ručního řezu
    rich: [0.18, 0.4],
    // šance na bohatou žílu bez/po Termální mapě
    dockShare: [0.2, 0.08],
    // podíl příjmu do banky doku: základ + za úroveň
    dockPeriod: 6,
    // s mezi drony z doku (1. úroveň)
    asmShare: 0.3,
    // podíl příjmu pro Autonomní montáž
    price: { k: 1.5, g: 4e-3 }
    // kolečka cen staveb: ×první cena, +zdražení za kus
  };
  var B = (o) => ({ ch: 1, ...o });
  var BUILD1 = [
    B({ id: "panel", tier: 1, kind: "gen", cur: "ore", c0: 8, g: 1.12, w: 40, req: () => true }),
    B({ id: "scan", tier: 1, kind: "data", cur: "ore", c0: 25, g: 1.22, d: 0.35, req: (s2) => n(s2, "panel") >= 2 && s2.tot.ore >= 25 }),
    B({ id: "beam", tier: 1, kind: "up", cur: "ore", c0: 20, g: 2.4, max: 5, req: (s2) => n(s2, "panel") >= 1 && s2.tot.ore >= 14 }),
    B({ id: "cool", tier: 1, kind: "up", cur: "ore", c0: 35, g: 2.4, max: 5, req: (s2) => s2.tot.ore >= 90 && n(s2, "beam") + n(s2, "magnet") >= 1 }),
    B({ id: "magnet", tier: 1, kind: "up", cur: "ore", c0: 18, g: 2.2, max: 4, req: (s2) => s2.tot.ore >= 45 }),
    B({ id: "find", tier: 1, kind: "up", cur: "ore", c0: 60, g: 2.6, max: 5, req: (s2) => s2.tot.ore >= 150 && n(s2, "scan") >= 1 }),
    B({ id: "refine", tier: 1, kind: "mult", cur: "ore", c0: 90, g: 1.3, req: (s2) => s2.tot.ore >= 260 && n(s2, "panel") >= 6 }),
    B({ id: "field", tier: 1, kind: "gen", cur: "ore", c0: 1500, g: 1.12, w: 8e4, req: ST(1) }),
    B({ id: "focus", tier: 1, kind: "up", cur: "ore", c0: 600, g: 5, max: 8, req: (s2) => s2.tot.ore >= 1500 }),
    B({ id: "drone", tier: 2, kind: "unit", cur: "ore", c0: 2e5, g: 1.17, req: R("drones") }),
    B({ id: "dspeed", tier: 2, kind: "up", cur: "ore", c0: 8e5, g: 3, max: 5, req: R("drones") }),
    B({ id: "dock", tier: 2, kind: "auto", cur: "ore", c0: 4e6, g: 4, max: 4, req: R("dock") }),
    B({ id: "farm", tier: 2, kind: "gen", cur: "ore", c0: 5e5, g: 1.12, w: 1e7, req: ST(2) }),
    B({ id: "dcenter", tier: 2, kind: "data", cur: "ore", c0: 15e6, g: 1.25, d: 500, req: ST(2) }),
    B({ id: "statite", tier: 2, kind: "gen", cur: "ore", c0: 15e8, g: 1.12, w: 3e10, req: R("driver") }),
    B({ id: "ring", tier: 2, kind: "gen", cur: "ore", c0: 8e11, g: 1.12, w: 3e13, req: ST(4) })
  ];
  var Rr = (o) => ({ ch: 1, ...o });
  var RESEARCH1 = [
    Rr({ id: "spectro", cost: 15, req: () => true }),
    // ruda ×2
    Rr({ id: "cells", cost: 70, req: (s2) => n(s2, "panel") >= 5 }),
    // panely ×3
    Rr({ id: "thermo", cost: 350, req: ST(1) }),
    // víc bohatých žil
    Rr({ id: "drones", cost: 12e3, req: ST(2), lvl2: true }),
    // drony
    Rr({ id: "dock", cost: 6e4, req: (s2) => n(s2, "drone") >= 3 }),
    // montážní dok
    Rr({ id: "regolith", cost: 6e4, req: (s2) => n(s2, "farm") >= 1 }),
    // farmy ×3
    Rr({ id: "driver", cost: 3e5, req: ST(3) }),
    // statity
    Rr({ id: "assembly", cost: 12e5, req: (s2) => n(s2, "statite") >= 1 }),
    // autonomní montáž elektráren
    Rr({ id: "deepdrill", cost: 5e6, req: ST(4) }),
    // ruda ×4
    Rr({ id: "statites", cost: 25e6, req: (s2) => n(s2, "statite") >= 10 }),
    // statity ×3
    Rr({ id: "calib", cost: 8e6, req: (s2) => n(s2, "statite") >= 20 }),
    // statity ×1,5
    Rr({ id: "lens", cost: 6e7, req: (s2) => n(s2, "ring") >= 15 }),
    // prstenec ×1,5
    Rr({ id: "collector", cost: 12e7, req: (s2) => s2.stage >= 5, final: true })
  ];
  var M = (o) => ({ ch: 1, view: "system", ...o });
  var MISSIONS1 = [
    M({ id: "belt", cost: 15e5, dur: 45, req: (s2) => s2.t > 60, at: [1088, 616] }),
    // ruda ×1,5
    M({ id: "kelvar", cost: 5e8, dur: 90, req: ST(1), at: [1240, 449] }),
    // data ×2
    M({ id: "tauris", cost: 2e11, dur: 120, req: ST(2), at: [1283, 424] }),
    // výkon ×1,5
    M({ id: "comet", cost: 3e14, dur: 140, req: ST(3), at: [1048, 173] }),
    // ruda ×2
    M({ id: "wreck", cost: 5e15, dur: 120, req: (s2) => s2.stage >= 3 && n(s2, "statite") >= 10, at: [480, 374] }),
    // data ×1,5
    M({ id: "echo", cost: 1e18, dur: 150, req: (s2) => s2.stage >= 4 && n(s2, "ring") >= 8, at: [752, 455] }),
    // prstenec ×1,5
    M({ id: "chthon", cost: 2e17, dur: 150, req: ST(4), at: [946, 492] })
    // prstenec ×2
  ];
  var J = (id, when, kind) => ({ id, ch: 1, when, kind });
  var JOURNAL1 = [
    J("c1_start", () => true),
    J("c1_cut", (s2) => s2.stats.cuts >= 25),
    J("c1_panel", (s2) => n(s2, "panel") >= 1),
    J("c1_full", (s2) => s2.stats.full >= 1),
    J("f1_aldra", (s2) => s2.t > 150, "fact"),
    J("c1_chain", (s2) => n(s2, "scan") >= 1 && s2.stats.cuts >= 60),
    J("c1_belt", (s2) => did(s2, "belt")),
    J("c1_st1", (s2) => s2.stage >= 1),
    J("c1_layer1", (s2) => s2.stage >= 1 && s2.stT > 40),
    J("f1_kard", (s2) => s2.stage >= 1 && s2.stT > 90, "fact"),
    J("c1_kelvar", (s2) => did(s2, "kelvar")),
    J("c1_st2", (s2) => s2.stage >= 2),
    J("c1_layer2", (s2) => s2.stage >= 2 && s2.stT > 50),
    J("c1_drone", (s2) => n(s2, "drone") >= 1),
    J("f1_drone", (s2) => n(s2, "drone") >= 5, "fact"),
    J("c1_dock", (s2) => n(s2, "dock") >= 1),
    J("c1_tauris", (s2) => did(s2, "tauris")),
    J("c1_st3", (s2) => s2.stage >= 3),
    J("c1_layer3", (s2) => s2.stage >= 3 && s2.stT > 50),
    J("c1_drones20", (s2) => n(s2, "drone") >= 20),
    J("c1_statite", (s2) => n(s2, "statite") >= 1),
    J("f1_statite", (s2) => n(s2, "statite") >= 3, "fact"),
    J("c1_comet", (s2) => did(s2, "comet")),
    J("c1_st4", (s2) => s2.stage >= 4),
    J("c1_layer4", (s2) => s2.stage >= 4 && s2.stT > 50),
    J("c1_chthon", (s2) => did(s2, "chthon")),
    J("c1_wreck", (s2) => did(s2, "wreck")),
    J("c1_echo", (s2) => did(s2, "echo")),
    J("c1_typeI", (s2) => s2.stage >= 5)
  ];
  var GEN1 = ["panel", "field", "farm", "statite", "ring"];
  var layerIdx = (s2) => s2.ch === 1 ? Math.min(s2.stage, 4) : 4;
  function oreMult(s2) {
    let m = Math.pow(T1.layerMult, layerIdx(s2)) * Math.pow(T1.refine, n(s2, "refine"));
    if (has(s2, "spectro")) m *= 2;
    if (has(s2, "deepdrill")) m *= 4;
    if (did(s2, "belt")) m *= 1.5;
    if (did(s2, "comet")) m *= 2;
    return m;
  }
  var handMult = (s2) => Math.pow(T1.hand, n(s2, "focus"));
  var richChance = (s2) => has(s2, "thermo") ? T1.rich[1] : T1.rich[0];
  var BM = Object.fromEntries(BUILD1.map((b) => [b.id, b]));
  function genW(s2, id) {
    let w = BM[id].w * mile(n(s2, id));
    if (id === "panel" && has(s2, "cells")) w *= 3;
    if (id === "farm" && has(s2, "regolith")) w *= 3;
    if (id === "statite" && has(s2, "statites")) w *= 3;
    if (id === "statite" && has(s2, "calib")) w *= 1.5;
    if (id === "ring" && has(s2, "lens")) w *= 1.5;
    if (id === "ring" && did(s2, "echo")) w *= 1.5;
    if (id === "ring" && did(s2, "chthon")) w *= 2;
    if (did(s2, "tauris")) w *= 1.5;
    return w;
  }
  var price = (s2, id) => {
    const b = BM[id], up = b.kind === "up";
    return b.c0 * (up ? 1 : T1.price.k) * Math.pow(b.g + (up ? 0 : T1.price.g), n(s2, id));
  };
  var droneCost = (s2) => price(s2, "drone");
  var dockPeriod = (s2) => T1.dockPeriod / (1 + 0.6 * Math.max(0, n(s2, "dock") - 1));
  var CH1 = {
    id: 1,
    cur: "ore",
    view: "body",
    map: "system",
    lvl2: 2,
    price: T1.price,
    goals: () => T1.goals,
    build: BUILD1,
    research: RESEARCH1,
    missions: MISSIONS1,
    journal: JOURNAL1,
    power(s2) {
      let P = T1.rtg;
      for (const id of GEN1) P += n(s2, id) * genW(s2, id);
      return P;
    },
    passive: () => 0,
    dataMult: (s2) => (did(s2, "kelvar") ? 2 : 1) * (did(s2, "wreck") ? 1.5 : 1),
    autos(s2, dt) {
      if (n(s2, "dock") > 0 && s2.auto.dock !== false) {
        s2.bank.dock = (s2.bank.dock || 0) + RT.rate.ore * (T1.dockShare[0] + T1.dockShare[1] * n(s2, "dock")) * dt;
        s2.bank.dockT = (s2.bank.dockT || 0) + dt;
        const c = droneCost(s2);
        if (s2.bank.dockT >= dockPeriod(s2) && s2.bank.dock >= c && s2.res.ore >= c) {
          s2.bank.dock -= c;
          s2.res.ore -= c;
          s2.b.drone = n(s2, "drone") + 1;
          s2.bank.dockT = 0;
          emit("dockdrone");
        }
        s2.bank.dock = Math.min(s2.bank.dock, c * 2, s2.res.ore);
      }
      if (has(s2, "assembly") && s2.auto.assembly !== false) {
        s2.bank.asm = Math.min((s2.bank.asm || 0) + RT.rate.ore * T1.asmShare * dt, s2.res.ore);
        let best = "", bv = 0;
        for (const id of GEN1) {
          if (s2.unl["b_" + id] == null) continue;
          const v = genW(s2, id) / price(s2, id);
          if (v > bv) {
            bv = v;
            best = id;
          }
        }
        if (best && s2.bank.asm >= price(s2, best)) {
          const c = price(s2, best);
          s2.bank.asm -= c;
          s2.res.ore -= c;
          s2.b[best] = n(s2, best) + 1;
          emit("autobuy", best);
        }
      }
    },
    botValue(s2, id) {
      return GEN1.includes(id) ? genW(s2, id) / Math.max(1, CH1.power(s2)) : void 0;
    }
  };

  // src/chapters/ch2.ts
  var L_ALDRA = 58e30;
  var T2 = {
    goals: [3e19, 3e21, 3e23, 38e25, 5e28, 26e30],
    // Typ II = 3,8·10²⁶ W (celé Slunce); 6 stadií
    firstGoalVsBase: 1.8,
    // první cíl aspoň ×1,8 výkonu, se kterým hráč přišel
    area0: 5e-17,
    // podíl světla Aldry na kolektor (bez vylepšení)
    colCost0: 3,
    colCostExp: 0.62,
    // cena kolektoru = 3 · plocha^0,62 · (1 + n/colN0)^colGrow
    colN0: 20,
    colGrow: 0.12,
    colCap: 4,
    // strop zdražení ×4 (jinak se pozdní stadia vlečou) // roj zdražuje: každý další kolektor letí na vzdálenější/horší dráhu
    salvoPer: 120,
    // ruční salva = počet / 120
    mirror: 1.6,
    // ×plocha za úroveň Zrcadlových plachet
    out: { sieve: 1.5, lift: 25, accel: 1e4, windc: 4e5, shell: 15e7, wr: 2e9 },
    // kg/s za kus
    factShare: 0.5,
    // podíl pasivního plazmatu, který berou továrny
    factRate: 0.5,
    fspeed: 1.5,
    // salv za s na továrnu, ×za úroveň
    flare: { passive: 2.5, cost: 6, harvest: 1.22, comboStep: 0.1 },
    // erupce = pw·(2,5·příjem/s + 6·cena kolektoru)·…
    startPlasma: 40,
    price: { k: 1.2, g: 0 }
    // kolečka cen staveb: ×první cena, +zdražení za kus
  };
  var B2 = (o) => ({ ch: 2, ...o });
  var BUILD2 = [
    B2({ id: "kol", tier: 1, kind: "swarm", cur: "plasma", c0: 3, g: 1, req: () => true }),
    B2({ id: "sieve", tier: 1, kind: "gen", cur: "plasma", c0: 15, g: 1.15, req: (s2) => s2.n >= 3 }),
    B2({ id: "corona", tier: 1, kind: "data", cur: "plasma", c0: 60, g: 1.22, d: 3e3, req: (s2) => n(s2, "sieve") >= 1 && s2.tot.plasma >= 150 }),
    B2({ id: "mirror", tier: 1, kind: "up", cur: "plasma", c0: 120, g: 3.2, max: 30, req: (s2) => n(s2, "corona") >= 1 && s2.tot.plasma >= 400 }),
    B2({ id: "tame", tier: 1, kind: "up", cur: "plasma", c0: 200, g: 3, max: 4, req: (s2) => s2.stats.flares >= 1 && n(s2, "sieve") >= 1 }),
    B2({ id: "jet", tier: 1, kind: "up", cur: "plasma", c0: 350, g: 3, max: 4, req: (s2) => s2.stats.flares >= 4 && s2.tot.plasma >= 900 }),
    B2({ id: "harvest", tier: 1, kind: "up", cur: "plasma", c0: 600, g: 3.4, max: 6, req: (s2) => s2.stats.flares >= 7 && s2.tot.plasma >= 2500 }),
    B2({ id: "lift", tier: 1, kind: "gen", cur: "plasma", c0: 2e3, g: 1.17, req: R("lifting") }),
    B2({ id: "fact", tier: 2, kind: "auto", cur: "plasma", c0: 3e4, g: 1.3, req: R("replic") }),
    B2({ id: "fspeed", tier: 2, kind: "up", cur: "plasma", c0: 1e6, g: 4, max: 6, req: R("replic") }),
    B2({ id: "accel", tier: 2, kind: "gen", cur: "plasma", c0: 1e6, g: 1.18, req: ST(2) }),
    B2({ id: "windc", tier: 2, kind: "gen", cur: "plasma", c0: 4e7, g: 1.2, req: ST(3) }),
    B2({ id: "shell", tier: 2, kind: "gen", cur: "plasma", c0: 1e10, g: 1.2, req: ST(4) }),
    B2({ id: "wr", tier: 2, kind: "gen", cur: "plasma", c0: 15e11, g: 1.2, req: ST(5) }),
    B2({ id: "anchor", tier: 2, kind: "up", cur: "plasma", c0: 3e6, g: 5, max: 3, req: R("anchors") }),
    B2({ id: "nudet", tier: 2, kind: "data", cur: "plasma", c0: 1e10, g: 1.25, d: 2e7, req: ST(4) })
  ];
  var Rr2 = (o) => ({ ch: 2, ...o });
  var RESEARCH2 = [
    Rr2({ id: "optics", cost: 2e4, req: () => true }),
    // plocha ×2
    Rr2({ id: "loops", cost: 12e4, req: (s2) => s2.stats.flares >= 2 }),
    // plazma ×1,5
    Rr2({ id: "lifting", cost: 2e5, req: ST(1) }),
    // hvězdný zdvih
    Rr2({ id: "replic", cost: 15e5, req: ST(2), lvl2: true }),
    // továrny
    Rr2({ id: "thin", cost: 2e7, req: (s2) => s2.stage >= 2 && n(s2, "accel") >= 3 }),
    // plocha ×3
    Rr2({ id: "anchors", cost: 4e7, req: (s2) => n(s2, "fact") >= 5 }),
    // kotvy
    Rr2({ id: "outer", cost: 2e9, req: (s2) => s2.stage >= 4 && n(s2, "windc") >= 3 }),
    // plocha ×3
    Rr2({ id: "convect", cost: 6e9, req: (s2) => n(s2, "shell") >= 15 }),
    // obálka ×2
    Rr2({ id: "giant", cost: 3e10, req: (s2) => s2.stage >= 4 && n(s2, "shell") >= 25 }),
    // plocha ×1,5
    Rr2({ id: "neutrino", cost: 15e9, req: (s2) => s2.stage >= 4 && n(s2, "shell") >= 8 }),
    // data ×3
    Rr2({ id: "collapse", cost: 2e11, req: (s2) => s2.stage >= 6, final: true })
  ];
  var M2 = (o) => ({ ch: 2, ...o });
  var MISSIONS2 = [
    M2({ id: "dust", cost: 15e18, dur: 90, req: () => true, at: [704, 544], view: "system" }),
    // plazma ×2
    M2({ id: "pulse", cost: 5e21, dur: 120, req: ST(1), at: [798, 483], view: "system" }),
    // data ×2
    M2({ id: "light", cost: 5e23, dur: 150, req: ST(2), at: [560, 420], view: "near" }),
    // plocha ×2
    M2({ id: "remnant", cost: 4e28, dur: 160, req: (s2) => s2.stage >= 3 && n(s2, "windc") >= 3, at: [1184, 276], view: "near" }),
    // plocha ×1,5
    M2({ id: "envelope", cost: 3e29, dur: 150, req: (s2) => s2.stage >= 4 && n(s2, "shell") >= 5, at: [700, 600], view: "near" }),
    // plazma ×1,5
    M2({ id: "wind", cost: 3e31, dur: 160, req: ST(5), at: [800, 486], view: "near" })
    // plazma ×2
  ];
  var J2 = (id, when, kind) => ({ id, ch: 2, when, kind });
  var JOURNAL2 = [
    J2("c2_start", () => true),
    J2("c2_first", (s2) => s2.n >= 20),
    J2("c2_flare", (s2) => s2.stats.flares >= 1),
    J2("c2_cme", (s2) => s2.stats.cme >= 1),
    J2("f2_dyson", (s2) => s2.n >= 150, "fact"),
    J2("c2_reson", (s2) => s2.best.reson >= 3),
    J2("c2_dust", (s2) => did(s2, "dust")),
    J2("c2_st1", (s2) => s2.stage >= 1),
    J2("c2_pulse", (s2) => did(s2, "pulse")),
    J2("c2_st2", (s2) => s2.stage >= 2),
    J2("c2_fact", (s2) => n(s2, "fact") >= 1),
    J2("f2_repl", (s2) => n(s2, "fact") >= 4, "fact"),
    J2("c2_lift", (s2) => n(s2, "lift") >= 1),
    J2("c2_light", (s2) => did(s2, "light")),
    J2("c2_st3", (s2) => s2.stage >= 3),
    J2("c2_typeII", (s2) => s2.stage >= 4),
    J2("c2_anchor", (s2) => n(s2, "anchor") >= 1),
    J2("c2_remnant", (s2) => did(s2, "remnant")),
    J2("c2_red", (s2) => s2.stage >= 5),
    J2("f2_red", (s2) => s2.stage >= 5 && s2.stT > 90, "fact"),
    J2("c2_envelope", (s2) => did(s2, "envelope")),
    J2("c2_neutr", (s2) => has(s2, "neutrino")),
    J2("c2_wind", (s2) => did(s2, "wind")),
    J2("c2_last", (s2) => s2.stage >= 6)
  ];
  function areaMult(s2) {
    let m = Math.pow(T2.mirror, n(s2, "mirror"));
    if (has(s2, "optics")) m *= 2;
    if (has(s2, "thin")) m *= 3;
    if (has(s2, "outer")) m *= 3;
    if (did(s2, "light")) m *= 2;
    if (did(s2, "remnant")) m *= 1.5;
    if (has(s2, "giant")) m *= 1.5;
    return m;
  }
  var colArea = (s2) => T2.area0 * areaMult(s2);
  var coverage = (s2) => 1 - Math.exp(-s2.n * colArea(s2));
  var colCostAt = (s2, nn) => T2.colCost0 * Math.pow(areaMult(s2), T2.colCostExp) * Math.min(T2.colCap, Math.pow(1 + nn / T2.colN0, T2.colGrow));
  var colCost = (s2) => colCostAt(s2, s2.n);
  var colCostN = (s2, cnt) => {
    const k = salvo(s2) * cnt;
    return k * (colCost(s2) + colCostAt(s2, s2.n + k)) / 2;
  };
  var salvo = (s2) => Math.max(1, Math.floor(s2.n / T2.salvoPer));
  function plasmaMult(s2) {
    let m = 1;
    if (did(s2, "dust")) m *= 2;
    if (did(s2, "wind")) m *= 2;
    if (did(s2, "envelope")) m *= 1.5;
    if (has(s2, "loops")) m *= 1.5;
    return m;
  }
  var prodRate = (s2, id) => T2.out[id] * mile(n(s2, id)) * (id === "shell" && has(s2, "convect") ? 2 : 1);
  function plasmaPassive(s2) {
    let p = 0;
    for (const id in T2.out) p += n(s2, id) * prodRate(s2, id);
    return p * plasmaMult(s2);
  }
  var factRate = (s2) => n(s2, "fact") * T2.factRate * Math.pow(T2.fspeed, n(s2, "fspeed")) * salvo(s2);
  var flareMult = (s2) => Math.pow(T2.flare.harvest, n(s2, "harvest"));
  var flareGain = (s2, pw, share) => pw * (T2.flare.passive * plasmaPassive(s2) + T2.flare.cost * colCost(s2)) * (1 + share) * flareMult(s2);
  var CH2 = {
    id: 2,
    cur: "plasma",
    view: "star",
    map: "system",
    lvl2: 2,
    price: T2.price,
    goals: (s2) => {
      const g = T2.goals.slice();
      g[0] = Math.max(g[0], T2.firstGoalVsBase * s2.base);
      return g;
    },
    build: BUILD2,
    research: RESEARCH2,
    missions: MISSIONS2,
    journal: JOURNAL2,
    power: (s2) => s2.base + L_ALDRA * coverage(s2),
    passive: plasmaPassive,
    dataMult: (s2) => (did(s2, "pulse") ? 2 : 1) * (has(s2, "neutrino") ? 3 : 1),
    onStart(s2) {
      s2.res.plasma = T2.startPlasma;
    },
    autos(s2, dt) {
      if (n(s2, "fact") > 0 && s2.auto.fact !== false) {
        s2.bank.fact = Math.min((s2.bank.fact || 0) + plasmaPassive(s2) * T2.factShare * dt, s2.res.plasma);
        const c = colCost(s2), k = Math.min(Math.floor(s2.bank.fact / c), factRate(s2) * dt);
        const whole = Math.floor(k + (s2.bank.fracF || 0));
        s2.bank.fracF = (s2.bank.fracF || 0) + k - whole;
        if (whole > 0) {
          s2.bank.fact -= whole * c;
          s2.res.plasma -= whole * c;
          s2.n += whole;
          emit("factkol", void 0, whole);
        }
      }
    },
    botValue(s2, id) {
      return id in T2.out ? prodRate(s2, id) * plasmaMult(s2) / Math.max(1, plasmaPassive(s2)) : void 0;
    },
    simStart(s2) {
      s2.base = 11e15;
      s2.res.data = 1e8;
      s2.res.energy = 1e19;
    }
  };

  // src/core/format.ts
  var SUP = { "-": "\u207B", "0": "\u2070", "1": "\xB9", "2": "\xB2", "3": "\xB3", "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077", "8": "\u2078", "9": "\u2079" };
  var PREFIX = ["", "k", "M", "G", "T", "P", "E", "Z", "Y", "R", "Q"];
  var decimalSep = ",";
  function fixed(n2, d) {
    return n2.toFixed(d).replace(".", decimalSep);
  }
  function sci(n2, digits = 2) {
    if (n2 === 0) return "0";
    const e = Math.floor(Math.log10(Math.abs(n2)));
    const m = n2 / Math.pow(10, e);
    return `${fixed(m, digits)}\xB710${String(e).split("").map((c) => SUP[c] ?? c).join("")}`;
  }
  function si(n2, unit) {
    const a = Math.abs(n2);
    if (a < 1) return `${fixed(n2, a === 0 ? 0 : 2)} ${unit}`;
    const e = Math.floor(Math.log10(a) / 3);
    if (e >= PREFIX.length) return `${sci(n2)} ${unit}`;
    const v = n2 / Math.pow(1e3, e);
    const d = v >= 100 ? 0 : v >= 10 ? 1 : 2;
    return `${fixed(v, e === 0 && v % 1 === 0 ? 0 : d)} ${PREFIX[e]}${unit}`;
  }
  function mass(kg) {
    const a = Math.abs(kg);
    if (a < 1e3) return `${fixed(kg, a < 10 && a % 1 ? 1 : 0)} kg`;
    if (a < 1e9) {
      const t2 = kg / 1e3, at2 = Math.abs(t2);
      if (at2 < 100) return `${fixed(t2, at2 < 10 ? 2 : 1)} t`;
      return `${Math.floor(t2).toLocaleString("cs-CZ").replace(/\s/g, "\u202F")} t`;
    }
    return `${sci(kg)} kg`;
  }
  function duration(sec) {
    sec = Math.max(0, Math.ceil(sec));
    const h2 = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s2 = sec % 60;
    if (h2) return `${h2} h ${String(m).padStart(2, "0")} min`;
    if (m) return `${m} min ${String(s2).padStart(2, "0")} s`;
    return `${s2} s`;
  }
  function count(n2) {
    const a = Math.abs(n2);
    if (a < 1e3) return a < 10 && a % 1 ? fixed(n2, 1) : String(Math.floor(n2));
    const e = Math.floor(Math.log10(a) / 3);
    if (e >= PREFIX.length) return sci(n2);
    const v = n2 / Math.pow(1e3, e);
    return `${fixed(v, v >= 100 ? 0 : v >= 10 ? 1 : 2)} ${PREFIX[e]}`;
  }
  function pct(f) {
    if (f <= 0) return "0 %";
    if (f < 1e-4) return "< 0,01 %";
    if (f < 0.01) return `${fixed(f * 100, 2)} %`;
    return `${fixed(f * 100, f < 0.1 ? 1 : 0)} %`;
  }
  function times(x) {
    if (x < 10) return `${fixed(x, 1)}\xD7`;
    if (x < 1e4) return `${Math.round(x).toLocaleString("cs-CZ").replace(/\s/g, "\u202F")}\xD7`;
    return `${sci(x, 1)}\xD7`;
  }

  // src/chapters/ch3.ts
  var C2 = 8988e13;
  var T3 = {
    goals: [3e28, 25e28, 4e30, 4e31, 95e30, 3e32],
    // 6 stadií; Eddingtonova mez 1e32, výtrysky ji prolomí
    tau: 30,
    // s – doba, za kterou disk steče do díry (vyhlazení výkonu)
    edd: 1e32,
    // W – Eddingtonova mez díry 8 M☉
    clump: 4e12,
    // kg – chuchvalec na začátku
    clumpUp: 1.6,
    // ×hmota chuchvalce za úroveň
    pool: [3, 1],
    // chuchvalců v mlhovině: základ + za úroveň Zásobníku
    respawn: [2.2, 0.75],
    // s mezi novými chuchvalci, ×za úroveň Zásobníku
    q: { perfect: 1.5, disk: 1, outer: 0.7, plunge: 0.25 },
    // výnos podle toho, kam chuchvalec dopadne
    tugEvery: 8,
    // s – jeden remorkér hodí chuchvalec
    wind: 0.02,
    // lapač zachytí 2 % přítoku (vítr z disku)
    windFloor: 2e9,
    // kg/s na lapač i bez přítoku
    ring: 1.12,
    // prstenec lapačů: ×hmota všem lapačům za kus
    spinA: [0, 0.5, 0.7, 0.9, 0.97, 0.99, 0.998],
    spinEta: [0.057, 0.082, 0.104, 0.155, 0.21, 0.264, 0.32],
    jets: 4,
    // výtrysky: ×Eddingtonova mez
    field: 1.25,
    // magnetická síť: ×mez za kus
    startMass: 15e11,
    startDisk: 25e11,
    energyCapS: 300,
    price: { k: 1, g: 0 }
  };
  var B3 = (o) => ({ ch: 3, ...o });
  var BUILD3 = [
    // 1. úroveň – hráč hází chuchvalce prakem
    B3({ id: "lap", tier: 1, kind: "gen", cur: "mass", c0: 5e11, g: 1.2, req: () => true }),
    B3({ id: "clump", tier: 1, kind: "up", cur: "mass", c0: 2e12, g: 5, max: 14, maxAt: (s2) => 3 + 2 * s2.stage, req: (s2) => n(s2, "lap") >= 2 }),
    B3({ id: "xray", tier: 1, kind: "data", cur: "mass", c0: 1e12, g: 1.45, d: 4e9, req: (s2) => n(s2, "clump") >= 1 }),
    B3({ id: "pool", tier: 1, kind: "up", cur: "mass", c0: 6e12, g: 2.8, max: 5, req: (s2) => n(s2, "xray") >= 1 && s2.hole.hits >= 12 }),
    B3({ id: "ring3", tier: 1, kind: "mult", cur: "mass", c0: 3e13, g: 1.6, req: (s2) => n(s2, "lap") >= 8 && n(s2, "pool") >= 1 }),
    // 2. úroveň – automatika: remorkéry hází samy, rotace zvedá účinnost, magnetické pole prorazí mez
    B3({ id: "tug", tier: 2, kind: "unit", cur: "mass", c0: 2e15, g: 1.3, req: R("tugs") }),
    B3({ id: "spin", tier: 2, kind: "up", cur: "mass", c0: 4e16, g: 3.6, max: 6, maxAt: (s2) => Math.max(0, s2.stage - 1), req: R("spinup") }),
    B3({ id: "field3", tier: 2, kind: "mult", cur: "mass", c0: 2e18, g: 2.2, max: 5, req: R("jets3") })
  ];
  var Rr3 = (o) => ({ ch: 3, ...o });
  var RESEARCH3 = [
    Rr3({ id: "aim", cost: 1e12, req: (s2) => s2.hole.hits >= 5 }),
    // delší předpověď dráhy
    Rr3({ id: "qpo", cost: 3e12, req: ST(1) }),
    // data ×2
    Rr3({ id: "tugs", cost: 8e12, req: ST(2), lvl2: true }),
    // remorkéry
    Rr3({ id: "guide", cost: 2e13, req: (s2) => n(s2, "tug") >= 3 }),
    // remorkéry míří do vnitřního prstence
    Rr3({ id: "spinup", cost: 5e13, req: ST(3) }),
    // roztáčení díry
    Rr3({ id: "jets3", cost: 12e13, req: ST(4) }),
    // výtrysky ×4 mez
    Rr3({ id: "beam3", cost: 2e14, req: (s2) => s2.stage >= 6, final: true })
  ];
  var M3 = (o) => ({ ch: 3, view: "system", ...o });
  var MISSIONS3 = [
    M3({ id: "belt3", cost: 2e33, dur: 90, req: () => true, at: [1060, 640] }),
    // chuchvalce ×2
    M3({ id: "kelvar3", cost: 3e33, dur: 110, req: ST(1), at: [560, 380] }),
    // data ×2
    M3({ id: "tauris3", cost: 4e33, dur: 140, req: ST(2), at: [1150, 330] }),
    // proud z Taurise
    M3({ id: "ergo", cost: 5e33, dur: 140, req: ST(3), at: [800, 470] }),
    // η ×1,3 (Penroseův proces)
    M3({ id: "star3", cost: 6e34, dur: 160, req: ST(4), at: [380, 700] })
    // roztržená hvězda: velký proud
  ];
  var J3 = (id, when, kind) => ({ id, ch: 3, when, kind });
  var JOURNAL3 = [
    J3("h3_start", () => true),
    J3("h3_first", (s2) => s2.hole.hits >= 1),
    J3("f3_isco", (s2) => s2.hole.perfect >= 1, "fact"),
    J3("h3_ten", (s2) => s2.hole.hits >= 10),
    J3("h3_belt", (s2) => did(s2, "belt3")),
    J3("h3_st1", (s2) => s2.stage >= 1),
    J3("f3_edd", (s2) => s2.stage >= 1 && s2.stT > 90, "fact"),
    J3("h3_qpo", (s2) => has(s2, "qpo")),
    J3("h3_kelvar", (s2) => did(s2, "kelvar3")),
    J3("h3_st2", (s2) => s2.stage >= 2),
    J3("h3_tug", (s2) => n(s2, "tug") >= 1),
    J3("h3_tauris", (s2) => did(s2, "tauris3")),
    J3("f3_hawking", (s2) => s2.stage >= 2 && s2.stT > 150, "fact"),
    J3("h3_st3", (s2) => s2.stage >= 3),
    J3("h3_spin", (s2) => n(s2, "spin") >= 1),
    J3("f3_cyg", (s2) => n(s2, "spin") >= 2, "fact"),
    J3("h3_ergo", (s2) => did(s2, "ergo")),
    J3("h3_st4", (s2) => s2.stage >= 4),
    J3("h3_flare", (s2) => s2.hole.flares >= 1),
    J3("h3_jets", (s2) => has(s2, "jets3")),
    J3("h3_star", (s2) => did(s2, "star3")),
    J3("f3_tde", (s2) => did(s2, "star3") && s2.stT > 60, "fact"),
    J3("h3_st5", (s2) => s2.stage >= 5),
    J3("h3_end", (s2) => s2.stage >= 6)
  ];
  var eta = (s2) => T3.spinEta[Math.min(n(s2, "spin"), 6)] * (did(s2, "ergo") ? 1.3 : 1);
  var spinA = (s2) => T3.spinA[Math.min(n(s2, "spin"), 6)];
  var eddMax = (s2) => T3.edd * (has(s2, "jets3") ? T3.jets : 1) * Math.pow(T3.field, n(s2, "field3"));
  var mdot = (s2) => s2.hole.D / T3.tau;
  var holePower = (s2) => eta(s2) * C2 * mdot(s2);
  var clumpMass = (s2) => T3.clump * Math.pow(T3.clumpUp, n(s2, "clump")) * (did(s2, "belt3") ? 2 : 1);
  var poolCap = (s2) => T3.pool[0] + T3.pool[1] * n(s2, "pool");
  var respawnT = (s2) => T3.respawn[0] * Math.pow(T3.respawn[1], n(s2, "pool"));
  function streams(s2) {
    let f = 0;
    if (did(s2, "tauris3")) f += 0.25 * clumpMass(s2);
    if (did(s2, "star3")) f += 2 * clumpMass(s2);
    return f;
  }
  var tugRate = (s2) => n(s2, "tug") / T3.tugEvery * clumpMass(s2) * (has(s2, "guide") ? T3.q.perfect : T3.q.disk);
  var lapRate = (s2) => (T3.wind * mdot(s2) + T3.windFloor) * Math.pow(T3.ring, n(s2, "ring3"));
  function feed(s2, kg) {
    s2.hole.D += kg;
    const Dmax = eddMax(s2) * T3.tau / (eta(s2) * C2);
    if (s2.hole.D > Dmax) {
      s2.hole.D = Dmax;
      return true;
    }
    return false;
  }
  var CH3 = {
    id: 3,
    cur: "mass",
    view: "star",
    map: "system",
    lvl2: 2,
    price: T3.price,
    goals: () => T3.goals,
    build: BUILD3,
    research: RESEARCH3,
    missions: MISSIONS3,
    journal: JOURNAL3,
    power: holePower,
    passive: (s2) => n(s2, "lap") * lapRate(s2),
    dataMult: (s2) => (has(s2, "qpo") ? 2 : 1) * (did(s2, "kelvar3") ? 2 : 1),
    autos(s2, dt) {
      s2.hole.D -= mdot(s2) * dt;
      const f = (tugRate(s2) + streams(s2)) * dt;
      if (f > 0 && feed(s2, f)) {
        RT.flare = (RT.flare || 0) + dt;
      }
    },
    onStart(s2) {
      s2.base = 0;
      s2.res.mass = T3.startMass;
      if (!s2.hole.D) s2.hole.D = T3.startDisk;
    },
    effect(s2, id) {
      const lv5 = n(s2, id);
      if (id === "lap") return `+${mass(lapRate(s2))}/s za kus`;
      if (id === "clump") return `Chuchvalec ${mass(clumpMass(s2))} \u2192 ${mass(clumpMass(s2) * T3.clumpUp)}`;
      if (id === "pool") return `Chuchvalc\u016F v mlhovin\u011B ${poolCap(s2)} \u2192 ${poolCap(s2) + T3.pool[1]}, rychleji p\u0159ib\xFDvaj\xED`;
      if (id === "ring3") return `Ka\u017Ed\xFD lapa\u010D zachyt\xED o 12 % v\xEDc`;
      if (id === "tug") return !lv5 ? "Prvn\xED remork\xE9r za\u010Dne h\xE1zet s\xE1m" : `Remork\xE9r\u016F ${count(lv5)} \xB7 +${mass(tugRate(s2) / Math.max(lv5, 1))}/s za kus`;
      if (id === "spin") return `Rotace ${fixed(spinA(s2), 3)} \u2192 ${fixed(T3.spinA[Math.min(lv5 + 1, 6)], 3)} \xB7 \xFA\u010Dinnost ${pct(eta(s2))} \u2192 ${pct(T3.spinEta[Math.min(lv5 + 1, 6)] * (did(s2, "ergo") ? 1.3 : 1))}`;
      if (id === "field3") return `Strop v\xFDkonu \xD7${fixed(T3.field, 2)}`;
      return void 0;
    },
    simStart(s2) {
      s2.res.data = 23e11;
      s2.res.energy = 45e32;
    }
  };

  // src/chapters/ch4.ts
  var L_SUN = 3828e23;
  var T4 = {
    goals: [5e31, 4e32, 3e33, 3e34, 6e35, 52e35],
    // Typ III ≈ 5·10³⁶ W (Mléčná dráha); 6 stadií
    base0: 26e30,
    // výkon díry, se kterým počítají cíle stadií
    cap0: 2e-3,
    capStep: 1.08,
    capMax: 0.16,
    // podíl světla hvězd zachycený roji kolonií
    sail0: 0.6,
    sailPerStar: 0.02,
    loom: 1.12,
    // plachty/s = (0,6 + 0,02·Σ√(hvězdy/1000))·…
    beamDrain: 0.3,
    // svazek bere 30 % výkonu (× síla svazku) – zbytek se spoří na mise
    energyCapS: 300,
    // na startu kapitoly max. 300 s výkonu v zásobě energie
    startSails: 25,
    price: { k: 1, g: 0 },
    // kolečka cen staveb: ×první cena, +zdražení za kus
    zone: [0.5, 0.7, 0.9, 1.1, 1.35, 1.7, 2.2],
    // hranice dosahu sond od domova (souřadnice galaxie) podle stadia
    need: [3, 0.46],
    // doba osídlení (s při síle 1) = 3·(hvězdy/10⁴ + 1)^0,46
    probe: [0.5, 0.4],
    // sondy: ×šance na šíření a ×rychlost za úroveň
    beacon: 0.3,
    // síla svazku jednoho majáku (ruční svazek = 1)
    mature: 720,
    // s, než nová kolonie postaví roj a svítí naplno (zachycení roste z 10 % na 100 %)
    boost: 2,
    // zachycení ×N za výzkumy Roje u každé hvězdy a Roje v halu
    reach: [0.12, 0.035],
    // dosah svazku (podíl poloměru galaxie): základ + za úroveň
    ly: 5e4
    // poloměr disku galaxie ve světelných letech (pro texty)
  };
  var B4 = (o) => ({ ch: 4, ...o });
  var BUILD4 = [
    // 1. úroveň – hráč maluje svazkem; stavby se odkrývají postupně podle počtu kolonií
    B4({ id: "power", tier: 1, kind: "up", cur: "sails", c0: 20, g: 2.6, max: 6, maxAt: (s2) => 1 + s2.stage, req: () => true }),
    B4({ id: "interf", tier: 1, kind: "data", cur: "sails", c0: 40, g: 1.22, d: 4e9, req: (s2) => colCount(s2) >= 3 }),
    B4({ id: "loom", tier: 1, kind: "mult", cur: "sails", c0: 60, g: 1.35, req: (s2) => colCount(s2) >= 6 && n(s2, "interf") >= 1 }),
    B4({ id: "reach", tier: 1, kind: "up", cur: "sails", c0: 90, g: 2.7, max: 6, maxAt: (s2) => 1 + s2.stage, req: (s2) => colCount(s2) >= 10 && n(s2, "power") >= 1 }),
    B4({ id: "spread", tier: 1, kind: "up", cur: "sails", c0: 140, g: 2.5, max: 6, maxAt: (s2) => 1 + s2.stage, req: (s2) => colCount(s2) >= 15 && n(s2, "loom") >= 1 }),
    B4({ id: "swarm3", tier: 1, kind: "mult", cur: "sails", c0: 220, g: 1.35, maxAt: (s2) => 4 + 4 * s2.stage, req: (s2) => colCount(s2) >= 21 && n(s2, "reach") >= 1 }),
    // 2. úroveň – automatika: sondy se šíří samy, majáky samy míří svazkem
    B4({ id: "probe", tier: 2, kind: "up", cur: "sails", c0: 3e3, g: 3.2, max: 5, maxAt: (s2) => s2.stage - 1, req: R("probes") }),
    B4({ id: "beacon", tier: 2, kind: "auto", cur: "sails", c0: 5e3, g: 2, req: R("beacons") }),
    B4({ id: "radio", tier: 2, kind: "data", cur: "sails", c0: 2e5, g: 1.25, d: 3e12, req: (s2) => s2.stage >= 3 && n(s2, "beacon") >= 2 })
  ];
  var Rr4 = (o) => ({ ch: 4, ...o });
  var RESEARCH4 = [
    Rr4({ id: "sailcloth", cost: 4e12, req: () => true }),
    // plachty ×2
    Rr4({ id: "dyson3", cost: 3e13, req: (s2) => n(s2, "swarm3") >= 3 }),
    // zachycení ×3
    Rr4({ id: "brake", cost: 8e13, req: (s2) => s2.stage >= 1 && colCount(s2) >= 30 }),
    // svazek ×1,5 (magnetická brzda)
    Rr4({ id: "probes", cost: 2e14, req: ST(2), lvl2: true }),
    // sondy
    Rr4({ id: "beacons", cost: 1e15, req: (s2) => n(s2, "probe") >= 1 }),
    // majáky
    Rr4({ id: "gaia", cost: 6e15, req: ST(3) }),
    // šíření ×1,5, data ×2
    Rr4({ id: "halo", cost: 4e16, req: (s2) => s2.stage >= 3 && n(s2, "beacon") >= 4 }),
    // zachycení ×3
    Rr4({ id: "seeds", cost: 15e16, req: (s2) => s2.stage >= 4 && colCount(s2) >= 120 }),
    // kolonie dozrávají 2× rychleji
    Rr4({ id: "jets", cost: 3e17, req: ST(5) }),
    // zachycení ×2
    Rr4({ id: "sgra", cost: 2e16, req: (s2) => s2.stage >= 6, final: true })
  ];
  var M4 = (o) => ({ ch: 4, view: "galaxy", at: [0, 0], ...o });
  var MISSIONS4 = [
    M4({ id: "magnetar", cost: 14e33, dur: 90, req: () => true }),
    // plachty ×2
    M4({ id: "pulsar", cost: 25e33, dur: 110, req: ST(1) }),
    // data ×2
    M4({ id: "ruin", cost: 5e34, dur: 120, req: (s2) => s2.stage >= 1 && colCount(s2) >= 25 }),
    // plachty ×1,5
    M4({ id: "globular", cost: 15e34, dur: 120, req: ST(2) }),
    // zachycení ×1,5
    M4({ id: "kilonova", cost: 1e36, dur: 140, req: ST(3) }),
    // data ×3
    M4({ id: "sol", cost: 15e35, dur: 140, req: (s2) => s2.stage >= 3 && s2.stT > 120 }),
    // dozrávání ×1,5 (příběh)
    M4({ id: "nebula", cost: 25e35, dur: 140, req: (s2) => s2.stage >= 3 && colCount(s2) >= 60 }),
    // šíření ×1,5
    M4({ id: "frb", cost: 12e36, dur: 150, req: ST(4) }),
    // šíření ×2, plachty ×2
    M4({ id: "stream", cost: 3e37, dur: 150, req: (s2) => s2.stage >= 4 && colCount(s2) >= 140 }),
    // zachycení ×1,5
    M4({ id: "fermi", cost: 3e38, dur: 160, req: ST(5) })
    // příběh, data ×2
  ];
  var GAL_SITES = {
    magnetar: [-0.52, 0.4],
    pulsar: [0.02, 0.8],
    ruin: [-0.42, 0.7],
    globular: [-0.95, -0.72],
    kilonova: [0.42, 0.36],
    sol: [-0.68, 0.1],
    nebula: [-0.5, -0.26],
    stream: [0.66, -0.18],
    frb: [0.82, -0.66],
    fermi: [0, -0.1]
  };
  var J4 = (id, when, kind) => ({ id, ch: 4, when, kind });
  var JOURNAL4 = [
    J4("c3_start", () => true),
    J4("c3_first", (s2) => colCount(s2) >= 3),
    J4("f3_sail", (s2) => s2.chT > 150, "fact"),
    J4("c3_ten", (s2) => colCount(s2) >= 10),
    J4("c3_magnetar", (s2) => did(s2, "magnetar")),
    J4("c3_st1", (s2) => s2.stage >= 1),
    J4("c3_ruin", (s2) => did(s2, "ruin")),
    J4("c3_fifty", (s2) => colCount(s2) >= 50),
    J4("c3_globular", (s2) => did(s2, "globular")),
    J4("c3_st2", (s2) => s2.stage >= 2),
    J4("c3_probe", (s2) => n(s2, "probe") >= 1),
    J4("f3_vn", (s2) => n(s2, "probe") >= 2, "fact"),
    J4("c3_beacon", (s2) => n(s2, "beacon") >= 1),
    J4("c3_pulsar", (s2) => did(s2, "pulsar")),
    J4("c3_st3", (s2) => s2.stage >= 3),
    J4("c3_kilonova", (s2) => did(s2, "kilonova")),
    J4("c3_sun", (s2) => did(s2, "sol")),
    J4("c3_nebula", (s2) => did(s2, "nebula")),
    J4("c3_hundred", (s2) => colCount(s2) >= 100),
    J4("c3_st3b", (s2) => s2.stage >= 4),
    J4("c3_stream", (s2) => did(s2, "stream")),
    J4("c3_frb", (s2) => did(s2, "frb")),
    J4("c3_twoh", (s2) => colCount(s2) >= 200),
    J4("c3_st4", (s2) => s2.stage >= 5),
    J4("f3_sgra", (s2) => s2.stage >= 5 && s2.stT > 120, "fact"),
    J4("c3_fermi", (s2) => did(s2, "fermi")),
    J4("c3_typeIII", (s2) => s2.stage >= 6)
  ];
  function colCount(s2) {
    let c = 0;
    for (let i = 0; i < s2.col.length; i++) if (s2.col[i] === "1") c++;
    return c;
  }
  var isOn = (s2, i) => s2.col[i] === "1";
  function setOn(s2, i) {
    if (s2.col.length < i + 1) s2.col = s2.col.padEnd(i + 1, "0");
    s2.col = s2.col.slice(0, i) + "1" + s2.col.slice(i + 1);
    delete s2.prog[i];
    s2.prog["t" + i] = s2.t;
  }
  var matureT = (s2) => T4.mature / ((has(s2, "seeds") ? 2 : 1) * (did(s2, "sol") ? 1.5 : 1));
  function maturity(s2, i) {
    const t0 = s2.prog["t" + i];
    if (t0 == null) return 1;
    return Math.min(1, 0.1 + 0.9 * ((s2.t - t0) / matureT(s2)));
  }
  var cache2 = { key: "", v: 0, sq: 0, t: -1 };
  function starsOn(s2) {
    if (cache2.key !== s2.col || Math.abs(s2.t - cache2.t) >= 1) {
      let v = 0, sq = 0;
      galaxyNodes().forEach((p, i) => {
        if (p.home || !isOn(s2, i)) return;
        v += p.stars * maturity(s2, i);
        sq += Math.sqrt(p.stars / 1e3);
      });
      cache2 = { key: s2.col, v, sq, t: s2.t };
    }
    return cache2;
  }
  function capture(s2) {
    let c = T4.cap0 * Math.pow(T4.capStep, n(s2, "swarm3"));
    if (has(s2, "dyson3")) c *= T4.boost;
    if (has(s2, "halo")) c *= T4.boost;
    if (did(s2, "globular")) c *= 1.5;
    if (did(s2, "stream")) c *= 1.5;
    if (has(s2, "jets")) c *= 2;
    return Math.min(T4.capMax, c);
  }
  function sailMult(s2) {
    let m = Math.pow(T4.loom, n(s2, "loom"));
    if (has(s2, "sailcloth")) m *= 2;
    if (did(s2, "magnetar")) m *= 2;
    if (did(s2, "frb")) m *= 2;
    if (did(s2, "ruin")) m *= 1.5;
    return m;
  }
  var sailPassive = (s2) => (T4.sail0 + starsOn(s2).sq * T4.sailPerStar) * sailMult(s2);
  var zoneR = (s2) => T4.zone[Math.min(s2.stage, T4.zone.length - 1)];
  function inZone(s2, i) {
    const N = galaxyNodes(), h2 = N[0], p = N[i];
    return Math.hypot(p.x - h2.x, p.y - h2.y) <= zoneR(s2);
  }
  var needOf = (stars) => T4.need[0] * Math.pow(stars / 1e4 + 1, T4.need[1]);
  var lyOf = (g) => `${count(Math.round(g * T4.ly / 100) * 100)} ly`;
  var spreadMult = (s2) => (did(s2, "frb") ? 2 : 1) * (has(s2, "gaia") ? 1.5 : 1) * (did(s2, "nebula") ? 1.5 : 1);
  var CH4 = {
    id: 4,
    cur: "sails",
    view: "galaxy",
    map: "galaxy",
    lvl2: 2,
    price: T4.price,
    goals: (s2) => T4.goals.map((g) => Math.max(g, s2.base + (g - T4.base0))),
    // kolonie musí přidat stejně jako dřív, ať díra přinese cokoli
    build: BUILD4,
    research: RESEARCH4,
    missions: MISSIONS4,
    journal: JOURNAL4,
    power: (s2) => s2.base + starsOn(s2).v * L_SUN * capture(s2),
    passive: sailPassive,
    dataMult: (s2) => (did(s2, "kilonova") ? 3 : 1) * (has(s2, "gaia") ? 2 : 1) * (did(s2, "pulsar") ? 2 : 1) * (did(s2, "fermi") ? 2 : 1),
    onStart(s2) {
      s2.res.sails = T4.startSails;
      s2.res.data = Math.min(s2.res.data, 2e12);
      s2.res.energy = Math.min(s2.res.energy, CH4.power(s2) * T4.energyCapS);
      if (!s2.col) setOn(s2, 0);
    },
    effect(s2, id) {
      const lv5 = n(s2, id), x = (v) => "\xD7" + (Math.round(v * 10) / 10).toString().replace(".", ",");
      if (id === "power") return `S\xEDla svazku ${x(1 + 0.6 * lv5)} \u2192 ${x(1 + 0.6 * (lv5 + 1))}`;
      if (id === "loom") return `+${count(sailPassive(s2) * (T4.loom - 1))} z\xE1rodk\u016F/s`;
      if (id === "reach") return `Dosah svazku ${lyOf(T4.reach[0] + T4.reach[1] * lv5)} \u2192 ${lyOf(T4.reach[0] + T4.reach[1] * (lv5 + 1))}`;
      if (id === "spread") return `Kolonie se \u0161\xED\u0159\xED samy ${x(1 + lv5)} \u2192 ${x(2 + lv5)}`;
      if (id === "swarm3") return `Zachycen\xE9 sv\u011Btlo ${pct(capture(s2))} \u2192 ${pct(Math.min(T4.capMax, capture(s2) * T4.capStep))}`;
      if (id === "probe") return `Sondy: \u0161\xED\u0159en\xED ${x(1 + T4.probe[0] * lv5)} \u2192 ${x(1 + T4.probe[0] * (lv5 + 1))}`;
      if (id === "beacon") return !lv5 ? "Prvn\xED maj\xE1k za\u010Dne osidlovat s\xE1m" : lv5 === 1 ? "1 maj\xE1k osidluje hv\u011Bzdy s\xE1m" : lv5 < 5 ? `${lv5} maj\xE1ky osidluj\xED hv\u011Bzdy samy` : `${count(lv5)} maj\xE1k\u016F osidluje hv\u011Bzdy samo`;
      return void 0;
    },
    simStart(s2) {
      s2.base = 3e32;
      s2.res.data = 5e11;
      s2.res.energy = 3e32 * 300;
    }
  };

  // src/core/defs.ts
  var CHAPTERS = [CH1, CH2, CH3, CH4];
  var LAST_CH = CHAPTERS.length;
  var stagesOf = (s2) => chOf(s2).goals(s2).length;
  var BUILD = CHAPTERS.flatMap((c) => c.build);
  var RESEARCH = CHAPTERS.flatMap((c) => c.research);
  var MISSIONS = CHAPTERS.flatMap((c) => c.missions);
  var JOURNAL = CHAPTERS.flatMap((c) => c.journal);
  var BMAP = Object.fromEntries(BUILD.map((b) => [b.id, b]));
  var RMAP = Object.fromEntries(RESEARCH.map((r) => [r.id, r]));
  var MMAP = Object.fromEntries(MISSIONS.map((m) => [m.id, m]));
  var chOf = (s2) => CHAPTERS[s2.ch - 1];
  function stageGoal(s2, i = s2.stage) {
    const g = chOf(s2).goals(s2);
    return g[Math.min(i, g.length - 1)];
  }
  var KTYPES = [
    { k: 1, ch: 1, w: 1e16 },
    { k: 2, ch: 2, w: 38e25 },
    { k: 3, ch: 4, w: 5e36 }
  ];

  // src/core/engine.ts
  var K = (P) => (Math.log10(Math.max(P, 1)) - 6) / 10;
  var chDef = chOf;
  var power = (s2) => chOf(s2).power(s2);
  var passive = (s2) => chOf(s2).passive(s2);
  function dataRate(s2) {
    let d = 0;
    for (const b of chOf(s2).build) if (b.kind === "data") d += n(s2, b.id) * b.d * mile(n(s2, b.id));
    return d * chOf(s2).dataMult(s2);
  }
  function gOf(id) {
    const d = BMAP[id], p = CHAPTERS[d.ch - 1].price;
    return d.kind === "up" || d.g === 1 || !p ? d.g : d.g + p.g;
  }
  function c0Of(id) {
    const d = BMAP[id], p = CHAPTERS[d.ch - 1].price;
    return d.kind === "up" || !p ? d.c0 : d.c0 * p.k;
  }
  function cost(s2, id, k = 0) {
    const d = BMAP[id];
    if (d.kind === "swarm") return colCost(s2) * salvo(s2);
    return c0Of(id) * Math.pow(gOf(id), n(s2, id) + k);
  }
  function costN(s2, id, cnt) {
    const d = BMAP[id];
    const g = gOf(id);
    if (d.kind === "swarm") return cnt <= 1 ? cost(s2, id) * cnt : colCostN(s2, cnt);
    if (g === 1) return cost(s2, id) * cnt;
    return cost(s2, id) * (Math.pow(g, cnt) - 1) / (g - 1);
  }
  function capOf(s2, id) {
    const d = BMAP[id];
    let m = d.max ?? Infinity;
    if (d.maxAt) m = Math.min(m, d.maxAt(s2));
    return m;
  }
  var maxed = (s2, id) => n(s2, id) >= capOf(s2, id);
  function maxAfford(s2, id) {
    const d = BMAP[id], have = s2.res[d.cur];
    if (maxed(s2, id)) return 0;
    const c = cost(s2, id);
    if (have < c) return 0;
    const g = gOf(id);
    if (d.kind === "swarm") {
      let m2 = Math.floor(have / c);
      while (m2 > 1 && costN(s2, id, m2) > have) m2 = Math.floor(m2 * 0.9);
      return m2;
    }
    if (g === 1) return Math.floor(have / c);
    let m = Math.floor(Math.log(have * (g - 1) / c + 1) / Math.log(g));
    m = Math.min(m, capOf(s2, id) - n(s2, id));
    return Math.max(0, m);
  }
  function unlocked(s2, id) {
    const d = BMAP[id];
    if (d.ch !== s2.ch) return false;
    if (s2.unl["b_" + id] != null) return true;
    if (!d.req(s2)) return false;
    let last = -Infinity;
    for (const b of chOf(s2).build) {
      const u = s2.unl["b_" + b.id];
      if (u != null && u > last) last = u;
    }
    if (s2.t - last < UNLOCK_GAP) return false;
    s2.unl["b_" + id] = s2.t;
    emit("unlock", id);
    return true;
  }
  var UNLOCK_GAP = 20;
  function buy(s2, id, cnt = 1) {
    const d = BMAP[id];
    if (!unlocked(s2, id) || maxed(s2, id)) return false;
    cnt = Math.min(cnt, capOf(s2, id) - n(s2, id));
    if (cnt <= 0) return false;
    const c = costN(s2, id, cnt);
    if (s2.res[d.cur] < c) return false;
    s2.res[d.cur] -= c;
    if (d.kind === "swarm") {
      s2.n += salvo(s2) * cnt;
      emit("kol", id, cnt);
    } else s2.b[id] = n(s2, id) + cnt;
    emit("buy", id, cnt);
    return true;
  }
  function rVisible(s2, id) {
    const r = RMAP[id];
    if (r.ch !== s2.ch) return false;
    if (s2.unl["r_" + id] != null) return true;
    if (r.req(s2)) {
      s2.unl["r_" + id] = s2.t;
      emit("runlock", id);
      return true;
    }
    return false;
  }
  function doResearch(s2, id) {
    const r = RMAP[id];
    if (!rVisible(s2, id) || s2.r[id] || s2.res.data < r.cost) return false;
    s2.res.data -= r.cost;
    s2.r[id] = 1;
    emit("research", id);
    if (r.final) emit("final", id);
    return true;
  }
  function mVisible(s2, id) {
    const m = MMAP[id];
    if (m.ch !== s2.ch) return false;
    if (s2.unl["m_" + id] != null) return true;
    if (m.req(s2)) {
      s2.unl["m_" + id] = s2.t;
      emit("munlock", id);
      return true;
    }
    return false;
  }
  function startMission(s2, id) {
    const m = MMAP[id];
    if (s2.run || s2.mis[id] || !mVisible(s2, id) || s2.res.energy < m.cost) return false;
    s2.res.energy -= m.cost;
    s2.run = { id, left: m.dur, dur: m.dur };
    emit("mstart", id);
    return true;
  }
  var stageMax = stagesOf;
  var finalReady = (s2) => s2.stage >= stagesOf(s2);
  function archiveData(s2) {
    const g = dataRate(s2) * 120;
    s2.res.data += g;
    return g;
  }
  function nextChapter(s2) {
    const P = power(s2);
    s2.done = Math.max(s2.done, s2.ch);
    if (s2.ch >= LAST_CH) {
      emit("theend");
      return;
    }
    s2.base = P;
    s2.ch++;
    s2.stage = 0;
    s2.chT = 0;
    s2.stT = 0;
    s2.res.energy = Math.min(s2.res.energy, P * 300);
    chOf(s2).onStart?.(s2);
    emit("chapter", String(s2.ch));
  }
  function tick(s2, dt) {
    s2.t += dt;
    s2.chT += dt;
    s2.stT += dt;
    const C = chOf(s2), P = C.power(s2);
    RT.P = P;
    s2.res.energy += P * dt;
    s2.res.data += dataRate(s2) * dt;
    const ps = C.passive(s2);
    if (ps > 0) gain(s2, C.cur, ps * dt);
    for (const c of ["ore", "plasma", "mass", "sails"]) {
      const k = Math.min(1, dt * 0.35);
      RT.rate[c] = RT.rate[c] * (1 - k) + RT.inc[c] / Math.max(dt, 1e-3) * k;
      RT.inc[c] = 0;
    }
    C.autos?.(s2, dt);
    if (s2.run) {
      s2.run.left -= dt;
      if (s2.run.left <= 0) {
        const id = s2.run.id;
        s2.mis[id] = 1;
        s2.run = null;
        emit("mdone", id);
      }
    }
    if (s2.stage < stagesOf(s2) && C.power(s2) >= stageGoal(s2)) {
      s2.stage++;
      s2.stT = 0;
      emit("stage", String(s2.stage));
    }
    RT.jt -= dt;
    if (RT.jt <= 0) {
      RT.jt = 0.5;
      for (const b of C.build) unlocked(s2, b.id);
      for (const r of C.research) rVisible(s2, r.id);
      for (const m of C.missions) mVisible(s2, m.id);
      for (const j of C.journal) {
        if (s2.seen["j_" + j.id]) continue;
        if (j.when(s2)) {
          s2.seen["j_" + j.id] = 1;
          s2.log.push({ t: s2.t, k: j.id, kind: j.kind || "story" });
          emit("journal", j.id);
          break;
        }
      }
      if (s2.log.length > 200) s2.log.splice(0, s2.log.length - 200);
    }
  }
  function offline(s2, sec) {
    const el = Math.min(sec, 600);
    if (el < 30) return null;
    const C = chOf(s2), out = [];
    const e = C.power(s2) * el * 0.5, d = dataRate(s2) * el * 0.5, c = C.passive(s2) * el * 0.25;
    s2.res.energy += e;
    out.push(["energy", e]);
    if (d > 0) {
      s2.res.data += d;
      out.push(["data", d]);
    }
    if (c > 0) {
      gain(s2, C.cur, c);
      out.push([C.cur, c]);
    }
    return { sec: el, out };
  }
  var fresh = () => newState();

  // src/mech/fx.ts
  var VW = 1600;
  var VH = 1e3;
  var MONO = '"JetBrains Mono", Consolas, monospace';
  var SANS = '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif';
  var txt = [];
  var sp = [];
  var fxOn = true;
  function setFx(v) {
    fxOn = v;
  }
  function ftxt(x, y, s2, col = "#f2a65a") {
    if (!fxOn) return;
    if (txt.length > 24) txt.shift();
    txt.push({ x, y, s: s2, col, t: 0 });
  }
  function sparks(x, y, n2, col, speed = 120) {
    if (!fxOn) return;
    n2 = Math.min(n2, 400 - sp.length);
    for (let i = 0; i < n2; i++) {
      const a = rnd() * 6.283, v = speed * (0.3 + rnd());
      sp.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: 0, life: 0.3 + rnd() * 0.45, col });
    }
  }
  function fxUpdate(dt) {
    for (let i = sp.length - 1; i >= 0; i--) {
      const p = sp[i];
      p.t += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 1 - dt * 2.5;
      p.vy *= 1 - dt * 2.5;
      if (p.t >= p.life) {
        sp[i] = sp[sp.length - 1];
        sp.pop();
      }
    }
    for (let i = txt.length - 1; i >= 0; i--) {
      const f = txt[i];
      f.t += dt;
      f.y -= dt * 26;
      if (f.t > 1.7) txt.splice(i, 1);
    }
  }
  function fxDraw(c, sx2) {
    c.save();
    c.globalCompositeOperation = "lighter";
    for (const p of sp) {
      c.globalAlpha = 1 - p.t / p.life;
      c.fillStyle = p.col;
      c.fillRect(p.x - 1.3, p.y - 1.3, 2.6, 2.6);
    }
    c.restore();
    c.font = `600 ${Math.round(15 / Math.max(sx2, 0.5))}px ${SANS}`;
    c.textAlign = "center";
    for (const f of txt) {
      c.globalAlpha = Math.min(1, (1.7 - f.t) * 1.5);
      c.fillStyle = "rgba(0,0,0,.65)";
      c.fillText(f.s, f.x + 1, f.y + 1);
      c.fillStyle = f.col;
      c.fillText(f.s, f.x, f.y);
    }
    c.globalAlpha = 1;
  }
  function fxClear() {
    sp.length = 0;
    txt.length = 0;
  }

  // src/ui/img.ts
  var FILES = {
    bg: "pozadi-hvezdy.webp",
    asteroid: "kap1-asteroid.webp",
    drone: "kap1-dron.webp",
    platform: "kap1-plosina.webp",
    system: "kap1-soustava.webp",
    intro1: "kap1-uvod.webp",
    starBlue: "kap2-aldra-modry.webp",
    starRed: "kap2-aldra-rudy.webp",
    starWR: "kap2-aldra-wolf-rayet.webp",
    starCollapse: "kap2-aldra-kolaps.webp",
    // volitelný – bez něj se ve stadiu Kolaps kreslí Wolf-Rayet
    collector: "kap2-kolektor.webp",
    factory: "kap2-tovarna.webp",
    near: "kap2-okoli.webp",
    intro2: "kap2-uvod.webp",
    galaxy: "kap3-galaxie.webp",
    // hrací plocha (uzly podle core/galaxy.ts GIMG)
    galaxySide: "kap3-galaxie-bok.webp",
    hole3: "kap3-dira.webp",
    disk3: "kap3-disk.webp",
    // Kap. 3 Díra: disk shora (stín = 20,8 % šířky)
    clump3: "kap3-chuchvalec.webp",
    tug3: "kap3-remorker.webp",
    system3: "kap3-soustava.webp",
    near3: "kap3-okoli.webp",
    sgra: "kap3-sgr-a.webp",
    colony: "kap3-kolonie.webp",
    beacon: "kap3-majak.webp",
    sail: "kap3-plachta.webp",
    intro4: "kap3-uvod.webp",
    intro3: "kap3-dira-uvod.webp"
    // zatím chybí – úvod Kap. 3 Díra
  };
  var cache3 = {};
  var ok = {};
  var imgSrc = (k) => "obrazky/" + FILES[k];
  function img(k) {
    if (typeof Image === "undefined") return null;
    if (!cache3[k]) {
      const im = new Image();
      im.onload = () => ok[k] = true;
      im.onerror = () => ok[k] = false;
      im.src = imgSrc(k);
      cache3[k] = im;
    }
    return ok[k] ? cache3[k] : null;
  }
  function preload() {
    for (const k of Object.keys(FILES)) img(k);
  }

  // src/mech/ch1.ts
  var LAYERS = [
    { c: [255, 160, 70], rich: [130, 235, 255] },
    { c: [255, 120, 80], rich: [150, 255, 210] },
    { c: [235, 200, 120], rich: [170, 200, 255] },
    { c: [210, 225, 240], rich: [255, 170, 230] },
    { c: [190, 150, 255], rich: [140, 255, 240] }
  ];
  var CX = 760;
  var CY = 470;
  var RA = 270;
  var PX = CX - RA * 1.72;
  var PY = CY + RA * 0.62;
  var VIS_DRONES = 60;
  var harm = (() => {
    const r = mulberry(11);
    return [[2, 0.07], [3, 0.05], [5, 0.035], [7, 0.02], [11, 0.012], [17, 6e-3]].map(([k, a]) => ({ k, a, p: r() * 6.28 }));
  })();
  var rr = (t) => {
    let v = 1;
    for (const h2 of harm) v += h2.a * Math.sin(h2.k * t + h2.p);
    return v;
  };
  var lv = (s2, id) => s2.b[id] || 0;
  var tex = null;
  var kamen = {
    veins: [],
    chunks: [],
    drones: [],
    rot: 0,
    rt: 0,
    heat: 0,
    over: false,
    stroke: null,
    spawnT: 0,
    pop: 0,
    flash: 0,
    reset() {
      this.veins = [];
      this.chunks = [];
      this.drones = [];
      this.heat = 0;
      this.over = false;
      this.stroke = null;
      for (let i = 0; i < 3; i++) this.addVein(true, null);
    },
    maxVeins(s2) {
      return 3 + lv(s2, "find") + Math.floor(Math.min(lv(s2, "drone"), VIS_DRONES) / 3);
    },
    addVein(instant, s2) {
      let a = rnd() * 6.28, d = rnd() * 0.5, x = Math.cos(a) * d, y = Math.sin(a) * d, dir = rnd() * 6.28;
      const pts = [[x, y]], cnt = 5 + (rnd() * 4 | 0);
      for (let i = 0; i < cnt; i++) {
        dir += (rnd() - 0.5) * 1.1;
        const st = 0.09 + rnd() * 0.05;
        let nx = x + Math.cos(dir) * st, ny = y + Math.sin(dir) * st;
        if (Math.hypot(nx, ny) > rr(Math.atan2(ny, nx)) * 0.7) {
          dir += Math.PI * 0.75;
          nx = x + Math.cos(dir) * 0.08;
          ny = y + Math.sin(dir) * 0.08;
        }
        x = nx;
        y = ny;
        pts.push([x, y]);
      }
      const rich = rnd() < (s2 ? richChance(s2) : 0.18), m = pts.length - 1;
      this.veins.push({ pts, cut: Array(m).fill(0), cs: Array(m).fill(-1), claim: Array(m).fill(null), fade: instant ? 1 : 0, dead: 0, val: rich ? 3 : 1, rich, ph: rnd() * 6 });
    },
    wp(p) {
      const c = Math.cos(this.rot), sn = Math.sin(this.rot);
      return [CX + (p[0] * c - p[1] * sn) * RA, CY + (p[0] * sn + p[1] * c) * RA];
    },
    spawnChunks(x, y, val, cnt, rich) {
      const a0 = Math.atan2(y - CY, x - CX);
      for (let k = 0; k < cnt; k++) {
        const a = a0 + (rnd() - 0.5) * 1.4, v = 60 + rnd() * 90;
        if (this.chunks.length > 260) {
          this.chunks[0].val += val / cnt;
          continue;
        }
        this.chunks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: 0, val: val / cnt, s: 2.4 + rnd() * 2.6, r: rnd() * 6, rich });
      }
    },
    cutSeg(s2, v, i, src, k = 1) {
      if (v.cut[i]) return;
      v.cut[i] = 1;
      s2.stats.cuts++;
      const a = this.wp(v.pts[i]), b = this.wp(v.pts[i + 1]), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      let val = v.val * oreMult(s2);
      if (src === "hand") {
        const st = this.stroke;
        if (!st) {
          v.cut[i] = 0;
          s2.stats.cuts--;
          return;
        }
        st.chain++;
        v.cs[i] = st.id;
        val *= handMult(s2) * (1 + Math.min(st.chain, 30) * 0.05);
        if (v.cut.every((x) => x) && v.cs.every((x) => x === st.id)) {
          st.full++;
          s2.stats.full++;
          if (st.full > s2.best.chainHand) s2.best.chainHand = st.full;
          const bonus = v.val * oreMult(s2) * handMult(s2) * v.cut.length * (st.full > 1 ? 1 + 0.5 * Math.min(st.full - 1, 6) : 1);
          this.spawnChunks(mx, my, bonus, 4, true);
          ftxt(mx, my - 16, st.full > 1 ? `\u0158et\u011Bz ${st.full} \u017Eil!` : "Cel\xE1 \u017E\xEDla \xD72", "#ffd27a");
          this.flash = 0.3;
          sparks(mx, my, 24, "#ffe2a8", 220);
        }
      } else val *= T1.drone * k;
      this.spawnChunks(mx, my, val, 2, v.rich);
      sparks(mx, my, src === "hand" ? 10 : 4, v.rich ? "#9ff3ff" : "#ffb766", 140);
    },
    down(s2) {
      if (!this.over) this.stroke = { id: rnd(), chain: 0, full: 0 };
    },
    up() {
      this.stroke = null;
    },
    update(s2, dt, M5) {
      this.rt += dt;
      this.rot = 0.07 * Math.sin(this.rt * 0.05);
      this.pop = Math.max(0, this.pop - dt);
      this.flash = Math.max(0, this.flash - dt);
      const laser2 = M5.down && !this.over && this.stroke;
      const L = lv(s2, "cool"), hr = 0.3 * Math.pow(0.8, L), cr = 0.42 * Math.pow(1.25, L);
      if (laser2) {
        this.heat += hr * dt;
        if (this.heat >= 1) {
          this.heat = 1;
          this.over = true;
          this.stroke = null;
          ftxt(PX, PY - 40, "P\u0159eh\u0159\xE1t\xED!", "#ff6b5a");
        }
      } else this.heat = Math.max(0, this.heat - cr * dt);
      if (this.over && this.heat < 0.3) this.over = false;
      if (laser2 && this.stroke) {
        const bw = 6 + lv(s2, "beam") * 3.5, dx = M5.x - M5.px, dy = M5.y - M5.py, steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 3));
        for (let k2 = 0; k2 <= steps; k2++) {
          const x = M5.px + dx * k2 / steps, y = M5.py + dy * k2 / steps;
          for (const v of this.veins) {
            if (v.fade < 1 || v.dead) continue;
            for (let i = 0; i < v.cut.length; i++) {
              if (v.cut[i]) continue;
              const a = this.wp(v.pts[i]), b = this.wp(v.pts[i + 1]);
              if (segDist(x, y, a[0], a[1], b[0], b[1]) < bw) this.cutSeg(s2, v, i, "hand");
            }
          }
        }
        if (rnd() < 0.4) sparks(M5.x, M5.y, 1, "#ffcc88", 70);
      }
      for (const v of this.veins) {
        v.fade = Math.min(1, v.fade + dt * 1.5);
        if (v.cut.every((x) => x)) v.dead += dt;
      }
      this.veins = this.veins.filter((v) => v.dead < 0.9);
      this.spawnT -= dt;
      const nd = lv(s2, "drone");
      if (this.veins.length < this.maxVeins(s2) && this.spawnT <= 0) {
        this.addVein(false, s2);
        this.spawnT = Math.max(0.12, 1.3 / (1 + Math.min(nd, VIS_DRONES) / 5));
      }
      const acc = 380 + lv(s2, "magnet") * 420;
      for (const c of this.chunks) {
        c.t += dt;
        c.r += dt * 3;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        if (c.t > 0.4) {
          const dx = PX - c.x, dy = PY - c.y, d = Math.hypot(dx, dy) || 1;
          c.vx += dx / d * acc * dt;
          c.vy += dy / d * acc * dt;
          c.vx *= 1 - dt * 1.4;
          c.vy *= 1 - dt * 1.4;
          if (d < 16 || c.t > 6) {
            c.done = true;
            gain(s2, "ore", c.val);
            this.pop = 0.18;
          }
        } else {
          c.vx *= 1 - dt * 2;
          c.vy *= 1 - dt * 2;
        }
      }
      this.chunks = this.chunks.filter((c) => !c.done);
      const want = Math.min(nd, VIS_DRONES);
      while (this.drones.length < want) this.addDrone(this.drones.length > 0);
      if (this.drones.length > want) this.drones.length = want;
      const k = nd > VIS_DRONES ? nd / VIS_DRONES : 1;
      const sp2 = 90 * Math.pow(1.3, lv(s2, "dspeed"));
      for (const d of this.drones) {
        if (d.tgt) {
          const { v, i } = d.tgt;
          if (!this.veins.includes(v) || v.cut[i]) {
            v.claim[i] = null;
            d.tgt = null;
            d.prog = 0;
          }
        }
        if (!d.tgt) {
          let best = null, bd = 1e9;
          for (const v of this.veins) {
            if (v.fade < 1) continue;
            for (let i = 0; i < v.cut.length; i++) {
              if (v.cut[i] || v.claim[i]) continue;
              const a = this.wp(v.pts[i]), b = this.wp(v.pts[i + 1]), dd = Math.hypot((a[0] + b[0]) / 2 - d.x, (a[1] + b[1]) / 2 - d.y);
              if (dd < bd) {
                bd = dd;
                best = { v, i };
              }
            }
          }
          if (best) {
            d.tgt = best;
            best.v.claim[best.i] = d;
            d.prog = 0;
          }
        }
        let tx2, ty;
        if (d.tgt) {
          const a = this.wp(d.tgt.v.pts[d.tgt.i]), b = this.wp(d.tgt.v.pts[d.tgt.i + 1]);
          d.aim = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          tx2 = d.aim[0] + Math.cos(d.ph) * 18;
          ty = d.aim[1] + Math.sin(d.ph) * 18;
        } else {
          d.ph += dt * 0.8;
          d.aim = null;
          tx2 = PX + Math.cos(d.ph) * 46;
          ty = PY + Math.sin(d.ph) * 28;
        }
        const dx = tx2 - d.x, dy = ty - d.y, dist = Math.hypot(dx, dy);
        if (dist > 2) {
          const m = Math.min(dist, sp2 * dt);
          d.x += dx / dist * m;
          d.y += dy / dist * m;
          d.ang = Math.atan2(dy, dx);
        }
        d.cutting = !!(d.tgt && dist < 12);
        if (d.cutting) {
          d.prog += dt * (0.8 + 0.18 * lv(s2, "dspeed"));
          if (d.prog >= 1) {
            const { v, i } = d.tgt;
            v.claim[i] = null;
            d.tgt = null;
            this.cutSeg(s2, v, i, "drone", k);
          }
        }
      }
    },
    addDrone(fromDock) {
      this.drones.push({ x: PX, y: PY, ph: rnd() * 6.28, ang: 0, tgt: null, prog: 0, aim: null });
      sparks(PX, PY, 14, "#8ef0c8", 110);
    },
    // ---- bot pro simulaci: táhne laser po nejbližší žíle, hlídá teplotu ----
    bot(s2, dt, M5) {
      M5.px = M5.x;
      M5.py = M5.y;
      if (this.over || this.heat > 0.88) {
        if (M5.down) {
          M5.down = false;
          this.up();
        }
        return;
      }
      if (!M5.down && this.heat > 0.25 && this.botRest) return;
      this.botRest = false;
      let tgt = null, bd = 1e9;
      for (const v of this.veins) {
        if (v.fade < 1 || v.dead) continue;
        for (let i = 0; i < v.cut.length; i++) {
          if (v.cut[i]) continue;
          const a = this.wp(v.pts[i]), b = this.wp(v.pts[i + 1]), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dd = Math.hypot(mx - M5.x, my - M5.y);
          if (dd < bd) {
            bd = dd;
            tgt = [mx, my];
          }
        }
      }
      if (!tgt) {
        if (M5.down) {
          M5.down = false;
          this.up();
        }
        return;
      }
      if (!M5.down) {
        M5.down = true;
        M5.x = tgt[0];
        M5.y = tgt[1];
        M5.px = M5.x;
        M5.py = M5.y;
        this.down(s2);
        return;
      }
      const step = 700 * dt, dx = tgt[0] - M5.x, dy = tgt[1] - M5.y, d = Math.hypot(dx, dy) || 1;
      M5.x += dx / d * Math.min(step, d);
      M5.y += dy / d * Math.min(step, d);
      if (this.heat > 0.8) this.botRest = true;
    },
    cursor() {
      return "crosshair";
    },
    // ---------- kresba ----------
    draw(c, s2, v, M5) {
      if (!tex) tex = makeTex();
      const T5 = v.T, li = layerIdx(s2), lay = LAYERS[li];
      const sun = c.createRadialGradient(-200, -300, 0, -200, -300, 1500);
      sun.addColorStop(0, "rgba(150,190,255,.20)");
      sun.addColorStop(1, "rgba(150,190,255,0)");
      c.fillStyle = sun;
      c.fillRect(-400, -400, 2400, 1800);
      drawGens(c, s2, T5, false);
      const halo = c.createRadialGradient(CX, CY, RA * 0.8, CX, CY, RA * 1.6);
      halo.addColorStop(0, "rgba(170,200,255,.05)");
      c.fillStyle = halo;
      c.beginPath();
      c.arc(CX, CY, RA * 1.6, 0, 7);
      c.fill();
      const A = img("asteroid");
      if (A) {
        const w = RA * 2.18, h2 = w * A.height / A.width;
        c.save();
        c.translate(CX, CY);
        c.rotate(this.rot);
        c.drawImage(A, -w / 2, -h2 / 2, w, h2);
        c.restore();
      } else {
        c.save();
        c.translate(CX, CY);
        c.rotate(this.rot);
        c.drawImage(tex, -1.2 * RA, -1.2 * RA, 2.4 * RA, 2.4 * RA);
        c.restore();
      }
      c.save();
      path(c, this.rot);
      c.clip();
      if (li > 0 && !A) {
        c.fillStyle = `rgba(${lay.c[0]},${lay.c[1]},${lay.c[2]},${0.03 + li * 0.025})`;
        c.fillRect(CX - RA * 1.3, CY - RA * 1.3, RA * 2.6, RA * 2.6);
      }
      if (!A) {
        const lg = c.createLinearGradient(CX - RA * 0.9, CY - RA * 0.9, CX + RA * 0.8, CY + RA * 0.8);
        lg.addColorStop(0, "rgba(200,220,255,.22)");
        lg.addColorStop(0.45, "rgba(0,0,0,0)");
        lg.addColorStop(1, "rgba(0,0,12,.82)");
        c.fillStyle = lg;
        c.fillRect(CX - RA * 1.3, CY - RA * 1.3, RA * 2.6, RA * 2.6);
      }
      drawFields(c, s2, T5, this.rot);
      c.lineCap = "round";
      c.lineJoin = "round";
      for (const vn of this.veins) {
        const al = vn.fade * (1 - vn.dead / 0.9), pul = 0.75 + 0.25 * Math.sin(T5 * 3 + vn.ph), col = vn.rich ? lay.rich : lay.c;
        for (let i = 0; i < vn.cut.length; i++) {
          const a = this.wp(vn.pts[i]), b = this.wp(vn.pts[i + 1]);
          c.beginPath();
          c.moveTo(a[0], a[1]);
          c.lineTo(b[0], b[1]);
          if (vn.cut[i]) {
            c.strokeStyle = `rgba(15,8,4,${0.7 * al})`;
            c.lineWidth = 3.5;
            c.stroke();
            continue;
          }
          c.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.2 * al * pul})`;
          c.lineWidth = 12;
          c.stroke();
          c.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${al})`;
          c.lineWidth = 3.4;
          c.stroke();
          c.strokeStyle = `rgba(255,250,232,${0.85 * al * pul})`;
          c.lineWidth = 1.1;
          c.stroke();
        }
      }
      c.restore();
      if (!A) {
        c.save();
        path(c, this.rot);
        c.strokeStyle = "rgba(200,215,255,.14)";
        c.lineWidth = 1.5;
        c.stroke();
        c.restore();
      }
      drawGens(c, s2, T5, true);
      for (const ch of this.chunks) {
        c.save();
        c.translate(ch.x, ch.y);
        c.rotate(ch.r);
        c.fillStyle = ch.rich ? `rgb(${lay.rich.join(",")})` : "#c9a27a";
        c.fillRect(-ch.s / 2, -ch.s / 2, ch.s, ch.s * 0.8);
        c.restore();
      }
      for (const d of this.drones) {
        if (d.cutting && d.aim) {
          c.strokeStyle = "rgba(142,240,200,.75)";
          c.lineWidth = 1.3;
          c.beginPath();
          c.moveTo(d.x, d.y);
          c.lineTo(d.aim[0], d.aim[1]);
          c.stroke();
          c.fillStyle = "rgba(200,255,235,.9)";
          c.beginPath();
          c.arc(d.aim[0], d.aim[1], 2 + rnd() * 1.5, 0, 7);
          c.fill();
        }
        const D = img("drone");
        if (D) {
          c.save();
          c.translate(d.x, d.y);
          c.rotate(d.ang);
          c.drawImage(D, -16, -16, 32, 32);
          c.restore();
          continue;
        }
        c.save();
        c.translate(d.x, d.y);
        c.rotate(d.ang);
        c.fillStyle = "#cfd8ea";
        c.beginPath();
        c.moveTo(7, 0);
        c.lineTo(-5, -4);
        c.lineTo(-2.5, 0);
        c.lineTo(-5, 4);
        c.closePath();
        c.fill();
        c.fillStyle = "#8ef0c8";
        c.fillRect(-6.5, -1, 2.2, 2);
        c.restore();
      }
      drawPlat(c, s2, this);
      if (v.passive) return;
      if (M5.down && !this.over && this.stroke) {
        const bw = 6 + lv(s2, "beam") * 3.5, fl = 0.85 + rnd() * 0.15;
        c.save();
        c.globalCompositeOperation = "lighter";
        c.lineCap = "round";
        c.strokeStyle = `rgba(255,130,50,${0.16 * fl})`;
        c.lineWidth = bw * 1.8;
        c.beginPath();
        c.moveTo(PX + 12, PY - 5);
        c.lineTo(M5.x, M5.y);
        c.stroke();
        c.strokeStyle = `rgba(255,225,180,${0.9 * fl})`;
        c.lineWidth = 1.8;
        c.stroke();
        const gr = c.createRadialGradient(M5.x, M5.y, 0, M5.x, M5.y, bw * 2.4);
        gr.addColorStop(0, "rgba(255,240,210,.9)");
        gr.addColorStop(1, "rgba(255,140,60,0)");
        c.fillStyle = gr;
        c.beginPath();
        c.arc(M5.x, M5.y, bw * 2.4, 0, 7);
        c.fill();
        c.restore();
      }
      if (M5.inside || M5.down) {
        c.lineWidth = 2.5;
        c.strokeStyle = "rgba(255,255,255,.08)";
        c.beginPath();
        c.arc(M5.x, M5.y, 16, 0, 7);
        c.stroke();
        c.strokeStyle = this.over ? "#ff6b5a" : this.heat > 0.7 ? "#ffb35c" : "#8ef0c8";
        c.beginPath();
        c.arc(M5.x, M5.y, 16, -Math.PI / 2, -Math.PI / 2 + this.heat * 6.283);
        c.stroke();
      }
    }
  };
  function path(c, rot) {
    c.beginPath();
    for (let i = 0; i <= 100; i++) {
      const t = i / 100 * 6.2832, r = rr(t) * RA, a = t + rot, x = CX + Math.cos(a) * r, y = CY + Math.sin(a) * r;
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.closePath();
  }
  function makeTex() {
    const S = Math.ceil(RA * 2.4 * 1.5), cv = document.createElement("canvas");
    cv.width = cv.height = S;
    const g = cv.getContext("2d"), k = S / 2.4;
    g.translate(S / 2, S / 2);
    g.scale(k, k);
    g.beginPath();
    for (let i = 0; i <= 160; i++) {
      const t = i / 160 * 6.2832, r2 = rr(t);
      i ? g.lineTo(Math.cos(t) * r2, Math.sin(t) * r2) : g.moveTo(Math.cos(t) * r2, Math.sin(t) * r2);
    }
    g.closePath();
    const gr = g.createRadialGradient(-0.25, -0.25, 0.1, 0, 0, 1.15);
    gr.addColorStop(0, "#8a8278");
    gr.addColorStop(1, "#3e3a38");
    g.fillStyle = gr;
    g.fill();
    g.save();
    g.clip();
    const r = mulberry(5);
    for (let i = 0; i < 1400; i++) {
      const a = r() * 6.28, d = Math.sqrt(r()) * 1.1;
      g.fillStyle = r() < 0.55 ? "rgba(0,0,0,.17)" : "rgba(235,240,255,.07)";
      g.beginPath();
      g.arc(Math.cos(a) * d, Math.sin(a) * d, r() * 0.03 + 4e-3, 0, 7);
      g.fill();
    }
    for (let i = 0; i < 26; i++) {
      const a = r() * 6.28, d = Math.sqrt(r()) * 0.9, x = Math.cos(a) * d, y = Math.sin(a) * d, sz = r() * 0.13 + 0.025;
      g.fillStyle = "rgba(14,12,14,.35)";
      g.beginPath();
      g.arc(x, y, sz, 0, 7);
      g.fill();
      g.strokeStyle = "rgba(220,230,255,.11)";
      g.lineWidth = sz * 0.25;
      g.beginPath();
      g.arc(x + sz * 0.08, y + sz * 0.08, sz * 0.92, 0, 7);
      g.stroke();
    }
    g.restore();
    return cv;
  }
  function drawPlat(c, s2, m) {
    c.save();
    c.translate(PX, PY);
    const P = img("platform");
    if (P) {
      const w = 150, h2 = w * P.height / P.width;
      c.drawImage(P, -w / 2, -h2 / 2 - 6, w, h2);
      c.globalCompositeOperation = "lighter";
      const g = c.createRadialGradient(0, -8, 0, 0, -8, 12 + m.pop * 40);
      g.addColorStop(0, `rgba(255,220,160,${0.25 + m.pop * 3})`);
      g.addColorStop(1, "rgba(255,200,140,0)");
      c.fillStyle = g;
      c.beginPath();
      c.arc(0, -8, 12 + m.pop * 40, 0, 7);
      c.fill();
      c.globalCompositeOperation = "source-over";
    }
    for (const sd of P ? [] : [-1, 1]) {
      const x0 = sd > 0 ? 16 : -48;
      c.fillStyle = "#132a4a";
      c.fillRect(x0, -7, 32, 14);
      c.strokeStyle = "#3d5578";
      c.lineWidth = 1;
      c.strokeRect(x0, -7, 32, 14);
      c.strokeStyle = "rgba(120,170,255,.3)";
      c.beginPath();
      for (let k = 1; k < 5; k++) {
        c.moveTo(x0 + k * 6.4, -7);
        c.lineTo(x0 + k * 6.4, 7);
      }
      c.stroke();
    }
    if (!P) {
      c.fillStyle = "#222a3c";
      c.strokeStyle = "#4a5a7a";
      c.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * 6.283 + 0.52;
        c.lineTo(Math.cos(a) * 15, Math.sin(a) * 15);
      }
      c.closePath();
      c.fill();
      c.stroke();
      c.fillStyle = m.pop > 0 ? "#ffe2b0" : "#f2a65a";
      c.beginPath();
      c.arc(0, 0, 4 + m.pop * 14, 0, 7);
      c.fill();
    }
    if (lv(s2, "dock")) {
      c.strokeStyle = "rgba(142,240,200,.5)";
      c.lineWidth = 2;
      const t = Math.min(1, (s2.bank.dockT || 0) / (6 / (1 + 0.6 * Math.max(0, lv(s2, "dock") - 1))));
      c.beginPath();
      c.arc(0, 0, P ? 58 : 26, -1.57, -1.57 + 6.283 * t);
      c.stroke();
    }
    c.restore();
  }
  function hash(i) {
    const x = Math.sin(i * 91.7 + 13.1) * 43758.5453;
    return x - Math.floor(x);
  }
  function drawFields(c, s2, T5, rot) {
    const f = Math.min(lv(s2, "field"), 40);
    for (let i = 0; i < f; i++) {
      const a = hash(i) * 6.283 + rot, r = RA * (0.25 + 0.55 * Math.sqrt(hash(i + 50)));
      const x = CX + Math.cos(a) * r, y = CY + Math.sin(a) * r * 0.92, gl = Math.max(0, Math.sin(T5 * 0.8 + i * 1.7));
      c.save();
      c.translate(x, y);
      c.rotate(a * 0.3 + 0.4);
      c.fillStyle = "rgba(28,58,104,.92)";
      c.fillRect(-5, -3.5, 10, 7);
      c.strokeStyle = "rgba(120,170,240,.55)";
      c.lineWidth = 0.8;
      c.strokeRect(-5, -3.5, 10, 7);
      c.fillStyle = `rgba(190,220,255,${0.15 + 0.5 * gl * gl})`;
      c.fillRect(-5, -3.5, 10, 1.3);
      c.restore();
    }
  }
  function drawGens(c, s2, T5, front) {
    const fm = Math.min(lv(s2, "farm"), 48);
    for (let i = 0; i < fm; i++) {
      const a = i * 2.39996 + T5 * (0.05 + hash(i) * 0.02), z = Math.sin(a);
      if (z > 0 !== front) continue;
      const rr2 = RA * (1.32 + 0.12 * hash(i + 7)), x = CX + Math.cos(a) * rr2, y = CY - 30 + z * rr2 * 0.28 + (hash(i + 3) - 0.5) * 14;
      const sh = Math.pow(Math.max(0, Math.sin(a * 1.5 + T5 * 0.6 + i)), 6), al = front ? 1 : 0.4, sz = front ? 5.5 : 3.6;
      c.save();
      c.translate(x, y);
      c.rotate(0.6 + Math.sin(a) * 0.4);
      c.fillStyle = `rgba(170,200,235,${0.55 * al})`;
      c.beginPath();
      c.moveTo(0, -sz);
      c.lineTo(sz * 0.7, 0);
      c.lineTo(0, sz);
      c.lineTo(-sz * 0.7, 0);
      c.closePath();
      c.fill();
      c.restore();
      if (sh > 0.05) {
        c.fillStyle = `rgba(235,245,255,${sh * al})`;
        c.beginPath();
        c.arc(x, y, 1.5 + sh * 3, 0, 7);
        c.fill();
      }
    }
    if (front) return;
    const st = Math.min(lv(s2, "statite"), 80);
    for (let i = 0; i < st; i++) {
      const a = -2.5 + hash(i + 11) * 1.6 + Math.sin(T5 * 0.2 + i) * 0.01, r = 900 + hash(i + 23) * 90;
      const x = CX - 300 + Math.cos(a) * r * 0.9, y = CY + 420 + Math.sin(a) * r * 0.75;
      c.fillStyle = `rgba(255,230,180,${0.4 + 0.4 * hash(i)})`;
      c.beginPath();
      c.arc(x, y, 1.4, 0, 7);
      c.fill();
    }
  }

  // src/mech/ch2.ts
  var CX2 = 760;
  var CY2 = 480;
  var VIS = 700;
  var lv2 = (s2, id) => s2.b[id] || 0;
  var LOOK = [
    { R: 60, core: "#f4f8ff", mid: "#b9d2ff", edge: "#6f8fe8", glow: [150, 185, 255] },
    { R: 68, core: "#f4f8ff", mid: "#b9d2ff", edge: "#6f8fe8", glow: [150, 185, 255] },
    { R: 78, core: "#f6f9ff", mid: "#c7dbff", edge: "#7d9cf0", glow: [160, 195, 255] },
    { R: 90, core: "#fafbff", mid: "#dbe5ff", edge: "#94acef", glow: [185, 205, 255] },
    { R: 165, core: "#fff1d6", mid: "#ffb070", edge: "#d2502a", glow: [255, 140, 80] },
    { R: 56, core: "#ffffff", mid: "#d9d0ff", edge: "#8f7cf0", glow: [200, 185, 255] },
    { R: 52, core: "#ffffff", mid: "#e2d8ff", edge: "#9a86f5", glow: [210, 195, 255] }
  ];
  var look = (s2) => LOOK[Math.min(s2.stage, LOOK.length - 1)];
  var PIC = (st) => st >= 6 && img("starCollapse") ? ["starCollapse", 0.14] : st >= 5 ? ["starWR", 0.14] : st === 4 ? ["starRed", 0.76] : ["starBlue", 0.76];
  var sprC = {};
  function sprite(k, px) {
    const id = k + px;
    if (sprC[id]) return sprC[id];
    const I = img(k);
    if (!I) return null;
    const cv = document.createElement("canvas");
    cv.width = cv.height = px;
    const g = cv.getContext("2d");
    g.imageSmoothingQuality = "high";
    g.drawImage(I, 0, 0, px, px);
    return sprC[id] = cv;
  }
  function drawPic(c, st, cx, cy, Rs, T5, alpha) {
    const [k, f] = PIC(st), I = img(k);
    if (!I || alpha <= 0) return false;
    const h2 = Rs / f * (st === 4 ? 1 + 0.012 * Math.sin(T5 * 0.45) : 1);
    c.save();
    c.globalAlpha = alpha;
    c.translate(cx, cy);
    c.rotate(T5 * (st >= 5 ? 0.02 : 6e-3));
    c.drawImage(I, -h2, -h2, h2 * 2, h2 * 2);
    c.restore();
    return true;
  }
  var gran = (() => {
    const r = mulberry(3);
    return Array.from({ length: 80 }, () => ({ a: r() * 6.28, d: Math.sqrt(r()) * 0.95, r: 0.04 + r() * 0.1, s: 0.5 + r() * 2, p: r() * 6 }));
  })();
  var SPR = /* @__PURE__ */ new Map();
  function starSprite(st, R2, _T = 0) {
    const [k, f] = PIC(st), im = img(k);
    if (!im) return null;
    R2 = Math.max(4, Math.round(R2 / 4) * 4);
    const sz = Math.ceil(R2 * (f < 0.5 ? 4 : 3)), key = k + ":" + R2;
    let cv = SPR.get(key);
    if (!cv) {
      cv = document.createElement("canvas");
      cv.width = cv.height = sz;
      const g = cv.getContext("2d"), hw = R2 / f;
      g.imageSmoothingQuality = "high";
      g.drawImage(im, sz / 2 - hw, sz / 2 - hw, hw * 2, hw * 2);
      const m = g.createRadialGradient(sz / 2, sz / 2, R2 * 1.02, sz / 2, sz / 2, R2 * (f < 0.5 ? 1.9 : 1.35));
      m.addColorStop(0, "rgba(0,0,0,1)");
      m.addColorStop(1, "rgba(0,0,0,0)");
      g.globalCompositeOperation = "destination-in";
      g.fillStyle = m;
      g.fillRect(0, 0, sz, sz);
      if (SPR.size > 10) SPR.delete(SPR.keys().next().value);
      SPR.set(key, cv);
    }
    return cv;
  }
  var hvezda = {
    dots: [],
    loops: [],
    jets: [],
    cmes: [],
    fact: [],
    Rd: 0,
    flyCd: 0,
    picSt: -1,
    picPrev: -1,
    picT0: 0,
    spawnT: 2.5,
    launchT: 0,
    grab: null,
    combo: 0,
    jid: 0,
    shake: 0,
    lastN: -1,
    manual: 0,
    reset() {
      this.Rd = 0;
      this.dots = [];
      this.loops = [];
      this.jets = [];
      this.cmes = [];
      this.fact = [];
      this.grab = null;
      this.combo = 0;
      this.lastN = -1;
      this.picSt = -1;
      this.picPrev = -1;
    },
    geo(s2) {
      const L = look(s2), Rs = this.Rd || L.R, base = 215 + Math.max(0, Rs - 90) * 0.75, out = s2.r.outer ? 1.2 : 1;
      return { Rs, rings: [base * out, base * 1.42 * out, base * 1.9 * out] };
    },
    pos(d, g) {
      const r = g.rings[d.ring];
      return [CX2 + Math.cos(d.a) * r, CY2 + Math.sin(d.a) * r];
    },
    ringAt(g, M5) {
      const d = Math.hypot(M5.x - CX2, M5.y - CY2);
      let best = -1, bd = 22;
      g.rings.forEach((r, i) => {
        if (Math.abs(d - r) < bd) {
          bd = Math.abs(d - r);
          best = i;
        }
      });
      return best;
    },
    zone(s2) {
      const w = 0.04 * lv2(s2, "tame");
      return [0.66 - w, 0.88 + w * 0.5];
    },
    snapAt(s2) {
      return 1 + 0.05 * lv2(s2, "tame");
    },
    jetW(s2) {
      return 0.13 + 0.035 * lv2(s2, "jet");
    },
    reach: 0.9,
    apex(L, g, T5) {
      if (L.held) return [L.hx, L.hy];
      const h2 = g.Rs * (1.3 + 0.6 * L.grow) + Math.sin(T5 * 3 + L.ph) * 2;
      return [CX2 + Math.cos(L.a) * h2, CY2 + Math.sin(L.a) * h2];
    },
    tension(L, g) {
      return Math.max(0, (Math.hypot(L.hx - CX2, L.hy - CY2) - g.Rs * 1.3) / (g.Rs * 2.9));
    },
    aimDir(L, dir) {
      const d = angDiff(dir, L.a);
      return L.a + Math.max(-this.reach, Math.min(this.reach, d));
    },
    densest(a0, s2) {
      const w = this.jetW(s2);
      let best = a0, bn = -1;
      for (let k = 0; k <= 18; k++) {
        const a = a0 - this.reach + 2 * this.reach * k / 18;
        let cnt = 0;
        for (const c of this.dots) if (!c.dying && !c.fly && Math.abs(angDiff(c.a, a)) < w) cnt++;
        if (cnt > bn) {
          bn = cnt;
          best = a;
        }
      }
      return best;
    },
    down(s2, M5) {
      const g = this.geo(s2);
      this.launchT = 0;
      for (const L of this.loops) {
        if (L.grow < 0.25) continue;
        const p = this.apex(L, g, 0);
        if (Math.hypot(M5.x - p[0], M5.y - p[1]) < 38) {
          this.grab = L;
          L.held = true;
          L.hx = M5.x;
          L.hy = M5.y;
          return;
        }
      }
    },
    up(s2) {
      if (this.grab) {
        this.release(s2, this.grab, false);
        this.grab = null;
      }
    },
    release(s2, L, auto) {
      const g = this.geo(s2);
      L.dead = true;
      const t = auto ? 0.78 : this.tension(L, g), [z0, z1] = this.zone(s2);
      const dir = auto ? L.autoDir : this.aimDir(L, Math.atan2(L.hy - CY2, L.hx - CX2));
      let pw, txt2, col;
      if (t < 0.3) {
        pw = 0.25;
        txt2 = "Smy\u010Dka povolila";
        col = "#7d879c";
        this.combo = 0;
      } else if (t < z0) {
        pw = 0.6;
        txt2 = "Slab\xE1 erupce";
        col = "#f8c97c";
        this.combo = 0;
      } else if (t <= z1) {
        if (auto) {
          pw = 0.55 + 0.1 * lv2(s2, "anchor");
          txt2 = "Kotva";
          col = "#b8f5e0";
        } else {
          this.combo++;
          pw = 1.5 * (1 + T2.flare.comboStep * Math.min(this.combo - 1, 8));
          txt2 = this.combo > 1 ? `Rezonance \xD7${this.combo}!` : "\u0158\xEDzen\xE1 erupce!";
          col = "#8ef0c8";
          this.shake = 0.35;
          s2.stats.perfect++;
          if (this.combo > s2.best.reson) s2.best.reson = this.combo;
        }
      } else {
        pw = 0.9;
        txt2 = "P\u0159eta\u017Eeno";
        col = "#f8c97c";
        this.combo = 0;
      }
      s2.stats.flares++;
      this.jets.push({ id: ++this.jid, a: dir, w: this.jetW(s2) * (pw > 1.2 ? 1.25 : 1), front: g.Rs, pw, hits: 0, t: 0, auto, txt: txt2, col });
      const x = CX2 + Math.cos(L.a) * g.Rs, y = CY2 + Math.sin(L.a) * g.Rs;
      sparks(x, y, pw > 1.2 ? 40 : 16, pw > 1.2 ? "#e8fff6" : "#ffd9a0", pw > 1.2 ? 260 : 150);
    },
    cme(s2, L) {
      L.dead = true;
      this.combo = 0;
      this.cmes.push({ a: L.a, front: this.geo(s2).Rs, hit: 0 });
    },
    syncDots(s2, g, M5) {
      if (this.lastN < 0) {
        this.lastN = s2.n;
      }
      const target = Math.min(VIS, Math.round(s2.n));
      let alive = 0;
      for (const d of this.dots) if (!d.dying) alive++;
      const fromHand = this.manual > 0;
      while (alive < target) {
        let ring = rnd() * 3 | 0, a = rnd() * 6.283, fly = 0, sx2 = 0, sy = 0;
        if (fromHand && M5.down) {
          const ri = this.ringAt(g, M5);
          if (ri >= 0) {
            ring = ri;
            a = Math.atan2(M5.y - CY2, M5.x - CX2) + (rnd() - 0.5) * 0.15;
          }
        } else if (this.fact.length && s2.n > this.lastN) {
          const f = this.fact[rnd() * this.fact.length | 0];
          fly = 0.8;
          const fr = Math.min(g.rings[2] * 1.22, g.rings[2] + 70);
          sx2 = CX2 + Math.cos(f.a) * fr;
          sy = CY2 + Math.sin(f.a) * fr;
          a = f.a + (rnd() - 0.5) * 0.6;
        }
        this.dots.push({ ring, a, glow: 0, fly, sx: sx2, sy, dying: 0 });
        alive++;
      }
      this.flyCd = (this.flyCd || 0) - 1;
      if (alive >= VIS && this.fact.length && s2.n > this.lastN && this.dots.length && this.flyCd <= 0) {
        this.flyCd = 15;
        for (let i = 0; i < 1; i++) {
          const d = this.dots[rnd() * this.dots.length | 0];
          if (d.dying || d.fly) continue;
          const f = this.fact[rnd() * this.fact.length | 0], fr = Math.min(g.rings[2] * 1.22, g.rings[2] + 70);
          d.fly = 0.8;
          d.sx = CX2 + Math.cos(f.a) * fr;
          d.sy = CY2 + Math.sin(f.a) * fr;
        }
      }
      this.manual = Math.max(0, this.manual - 1);
      this.lastN = s2.n;
    },
    update(s2, dt, M5) {
      const tR = look(s2).R;
      this.Rd = this.Rd ? this.Rd + (tR - this.Rd) * (1 - Math.exp(-dt * 0.3)) : tR;
      const g = this.geo(s2);
      this.shake = Math.max(0, this.shake - dt);
      const nf = Math.min(lv2(s2, "fact"), 24);
      while (this.fact.length < nf) this.fact.push({ a: rnd() * 6.283, t: rnd() });
      for (const f of this.fact) {
        f.a += 0.05 * dt;
        f.t = (f.t + dt * 0.4) % 1;
      }
      if (M5.down && !this.grab) {
        const ri = this.ringAt(g, M5);
        this.launchT -= dt;
        if (ri >= 0 && this.launchT <= 0) {
          if (buy(s2, "kol", 1)) {
            this.manual = 2;
            this.launchT = 0.1;
            sparks(M5.x, M5.y, 4, "#ffd27a", 70);
          }
        }
      }
      this.syncDots(s2, g, M5);
      for (const c of this.dots) {
        c.a += 0.45 * Math.pow(g.rings[0] / g.rings[c.ring], 1.5) * dt;
        if (c.fly) c.fly = Math.max(0, c.fly - dt);
        if (c.dying) c.dying += dt;
        if (c.glow) c.glow = Math.max(0, c.glow - dt * 1.4);
        if (c.stun) c.stun = Math.max(0, c.stun - dt);
      }
      this.dots = this.dots.filter((c) => !c.dying || c.dying < 0.9);
      const maxLoops = 1 + (lv2(s2, "tame") >= 2 ? 1 : 0) + (s2.stage >= 2 ? 1 : 0);
      this.spawnT -= dt;
      if (this.spawnT <= 0 && this.loops.length < maxLoops) {
        this.loops.push({ a: rnd() * 6.283, grow: 0, life: 0, ph: rnd() * 6, held: false, hx: 0, hy: 0, anc: 0 });
        this.spawnT = 2.5 + rnd() * 3;
      }
      for (const L of this.loops) {
        L.life += dt;
        if (!L.held) L.grow = Math.min(1, L.grow + dt / 2.2);
        if (L.held) {
          L.hx = M5.x;
          L.hy = M5.y;
          if (this.tension(L, g) > this.snapAt(s2)) {
            ftxt(M5.x, M5.y - 18, "Smy\u010Dka praskla!", "#ff6b5a");
            this.grab = null;
            L.held = false;
            this.cme(s2, L);
          }
        } else {
          if (lv2(s2, "anchor") && L.grow >= 1) {
            L.anc += dt * (0.5 + 0.25 * lv2(s2, "anchor"));
            if (L.anc >= 1) {
              L.autoDir = this.densest(L.a, s2);
              this.release(s2, L, true);
            }
          }
          if (!L.dead && L.life > 7.5) this.cme(s2, L);
        }
      }
      this.loops = this.loops.filter((L) => !L.dead);
      const maxR = g.rings[2] * 1.35, vis = Math.max(1, this.dots.length);
      for (const J5 of this.jets) {
        J5.t += dt;
        const prev = J5.front;
        J5.front += (maxR - g.Rs) / 0.6 * dt;
        for (const c of this.dots) {
          if (c.dying || c.fly || c.jid === J5.id) continue;
          const r = g.rings[c.ring];
          if (r > prev && r <= J5.front && Math.abs(angDiff(c.a, J5.a)) < J5.w) {
            c.jid = J5.id;
            c.glow = 1;
            J5.hits++;
            if (J5.hits % 3 === 1) {
              const p = this.pos(c, g);
              sparks(p[0], p[1], 3, "#dffcf0", 60);
            }
          }
        }
        if (J5.front >= maxR && !J5.done) {
          J5.done = true;
          const share = J5.hits / vis;
          const v = flareGain(s2, J5.pw, share);
          gain(s2, "plasma", v);
          const x = CX2 + Math.cos(J5.a) * g.rings[2] * 1.15, y = CY2 + Math.sin(J5.a) * g.rings[2] * 1.15;
          ftxt(x, y - 10, `${J5.txt} +${mass(v)}`, J5.col);
          if (J5.hits) ftxt(x, y + 10, `nabito ${count(Math.round(J5.hits * Math.max(1, s2.n / vis)))} kolektor\u016F`, "#9aa6bd");
        }
      }
      this.jets = this.jets.filter((J5) => J5.t < 1.1);
      for (const C of this.cmes) {
        C.front += (maxR - g.Rs) * dt;
        for (const c of this.dots) {
          if (c.dying || c.fly || c.stun) continue;
          if (g.rings[c.ring] <= C.front && Math.abs(angDiff(c.a, C.a)) < 0.22) {
            c.stun = 8;
            C.hit++;
          }
        }
        if (C.front >= maxR && !C.done) {
          C.done = true;
          if (C.hit) s2.stats.cme++;
          ftxt(CX2 + Math.cos(C.a) * maxR, CY2 + Math.sin(C.a) * maxR, "Smy\u010Dka se utrhla \u2013 plazma uniklo", "#ff9a7a");
        }
      }
      this.cmes = this.cmes.filter((C) => !C.done);
    },
    // ---- bot: vypouští, chytá zralé smyčky a pouští je v zeleném pásmu k hustému roji ----
    bot(s2, dt, M5) {
      const g = this.geo(s2);
      M5.px = M5.x;
      M5.py = M5.y;
      if (this.grab) {
        const L2 = this.grab, [z0, z1] = this.zone(s2), t = (z0 + z1) / 2;
        const dir = L2.autoDir ?? (L2.autoDir = this.densest(L2.a, s2)), dist = g.Rs * 1.3 + t * g.Rs * 2.9;
        const tx2 = CX2 + Math.cos(dir) * dist, ty = CY2 + Math.sin(dir) * dist;
        const dx = tx2 - M5.x, dy = ty - M5.y, d = Math.hypot(dx, dy);
        if (d > 4) {
          const m = Math.min(d, 900 * dt);
          M5.x += dx / d * m;
          M5.y += dy / d * m;
          return;
        }
        M5.down = false;
        this.up(s2);
        return;
      }
      const L = this.loops.find((l) => l.grow >= 0.95 && !l.held);
      if (L) {
        const p = this.apex(L, g, 0);
        if (M5.down) {
          M5.down = false;
          this.up(s2);
        }
        M5.x = p[0];
        M5.y = p[1];
        M5.down = true;
        this.down(s2, M5);
        if (this.grab) this.grab.autoDir = void 0;
        return;
      }
      if (s2.res.plasma - (this.reserve || 0) >= colCost(s2) * salvo(s2)) {
        const a = s2.t * 0.7 % 6.283, r = g.rings[Math.floor(s2.t / 3) % 3];
        M5.x = CX2 + Math.cos(a) * r;
        M5.y = CY2 + Math.sin(a) * r;
        if (!M5.down) {
          M5.down = true;
          this.down(s2, M5);
        }
      } else if (M5.down) {
        M5.down = false;
        this.up(s2);
      }
    },
    cursor(s2, M5) {
      if (this.grab) return "grabbing";
      const g = this.geo(s2);
      for (const L of this.loops) {
        if (L.grow < 0.25) continue;
        const p = this.apex(L, g, 0);
        if (Math.hypot(M5.x - p[0], M5.y - p[1]) < 38) return "grab";
      }
      return this.ringAt(g, M5) >= 0 ? "copy" : "crosshair";
    },
    // ---------- kresba ----------
    draw(c, s2, v, M5) {
      const g = this.geo(s2), T5 = v.T, Lk = look(s2);
      const shell = Math.max(0, Math.min(1, (Math.log10(Math.max(1e-20, s2.n * colArea(s2))) + 14) / 14));
      const sh = this.shake ? (rnd() - 0.5) * 6 * this.shake : 0;
      const cx = CX2 + sh, cy = CY2 + sh * 0.7, Rs = g.Rs;
      g.rings.forEach((r) => {
        c.strokeStyle = "rgba(140,160,210,.12)";
        c.lineWidth = 1;
        c.beginPath();
        c.arc(cx, cy, r, 0, 7);
        c.stroke();
        if (shell > 0.05) {
          c.strokeStyle = `rgba(255,205,130,${shell * 0.18})`;
          c.lineWidth = 2 + shell * 7;
          c.stroke();
        }
      });
      const hov = this.grab || v.passive ? -1 : this.ringAt(g, M5);
      if (hov >= 0) {
        c.strokeStyle = "rgba(242,166,90,.38)";
        c.lineWidth = 2;
        c.beginPath();
        c.arc(cx, cy, g.rings[hov], 0, 7);
        c.stroke();
      }
      const vis = 1 - Math.min(0.5, shell * 0.5), gl = Lk.glow.join(",");
      let gr = c.createRadialGradient(cx, cy, Rs * 0.6, cx, cy, Rs * 3.6);
      gr.addColorStop(0, `rgba(${gl},${0.55 * vis})`);
      gr.addColorStop(0.25, `rgba(${gl},${0.16 * vis})`);
      gr.addColorStop(1, `rgba(${gl},0)`);
      c.fillStyle = gr;
      c.beginPath();
      c.arc(cx, cy, Rs * 3.6, 0, 7);
      c.fill();
      c.save();
      c.globalCompositeOperation = "lighter";
      for (let i = 0; i < 9; i++) {
        const a = i / 9 * 6.283 + T5 * 0.02 + Math.sin(T5 * 0.3 + i) * 0.1, d = Rs * (1.05 + 0.12 * Math.sin(T5 * 0.5 + i * 2.1)), r2 = Rs * (0.55 + 0.2 * Math.sin(T5 * 0.4 + i));
        const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d, cg = c.createRadialGradient(x, y, 0, x, y, r2);
        cg.addColorStop(0, `rgba(${gl},${0.14 * vis})`);
        cg.addColorStop(1, `rgba(${gl},0)`);
        c.fillStyle = cg;
        c.beginPath();
        c.arc(x, y, r2, 0, 7);
        c.fill();
      }
      c.restore();
      const ps = Math.min(s2.stage, 6), pk = PIC(ps)[0];
      if (this.picSt < 0) this.picSt = ps;
      if (PIC(this.picSt)[0] !== pk) {
        this.picPrev = this.picSt;
        this.picT0 = T5;
      }
      this.picSt = ps;
      const fade = this.picPrev >= 0 ? Math.min(1, (T5 - this.picT0) / 3) : 1;
      if (fade >= 1) this.picPrev = -1;
      let pic = false;
      if (img(pk)) {
        if (this.picPrev >= 0) drawPic(c, this.picPrev, cx, cy, Rs, T5, 1 - fade);
        pic = drawPic(c, ps, cx, cy, Rs, T5, fade);
      }
      if (!pic) {
        gr = c.createRadialGradient(cx - Rs * 0.15, cy - Rs * 0.15, Rs * 0.1, cx, cy, Rs);
        gr.addColorStop(0, Lk.core);
        gr.addColorStop(0.55, Lk.mid);
        gr.addColorStop(1, Lk.edge);
        c.fillStyle = gr;
        c.beginPath();
        c.arc(cx, cy, Rs, 0, 7);
        c.fill();
      }
      c.save();
      c.beginPath();
      c.arc(cx, cy, Rs, 0, 7);
      c.clip();
      if (pic && shell > 0.05) {
        c.fillStyle = `rgba(4,5,10,${shell * 0.3})`;
        c.fillRect(cx - Rs, cy - Rs, Rs * 2, Rs * 2);
      }
      if (!pic) for (const b of gran) {
        const a = b.a + T5 * 0.03, x = cx + Math.cos(a) * b.d * Rs, y = cy + Math.sin(a) * b.d * Rs;
        c.fillStyle = `rgba(255,255,255,${0.05 + 0.05 * Math.sin(T5 * b.s + b.p)})`;
        c.beginPath();
        c.arc(x, y, b.r * Rs, 0, 7);
        c.fill();
        c.fillStyle = `rgba(20,30,90,${0.04 + 0.04 * Math.cos(T5 * b.s + b.p)})`;
        c.beginPath();
        c.arc(x + b.r * Rs, y, b.r * Rs * 0.5, 0, 7);
        c.fill();
      }
      for (const L of this.loops) for (const sd of [-1, 1]) {
        const a = L.a + sd * 0.28, x = cx + Math.cos(a) * Rs * 0.93, y = cy + Math.sin(a) * Rs * 0.93;
        c.fillStyle = `rgba(10,15,50,${0.35 + 0.3 * L.grow})`;
        c.beginPath();
        c.arc(x, y, Rs * 0.07, 0, 7);
        c.fill();
      }
      c.restore();
      if (s2.stage >= 5) {
        c.save();
        c.globalCompositeOperation = "lighter";
        for (let i = 0; i < 70; i++) {
          const a = i * 2.39996 + T5 * 0.05, f = (i * 0.137 + T5 * 0.25) % 1, r = Rs + f * g.rings[2] * 1.3;
          c.fillStyle = `rgba(200,185,255,${0.35 * (1 - f)})`;
          c.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2, 2);
        }
        c.restore();
      }
      const nl = Math.min(lv2(s2, "lift"), 10);
      for (let k = 0; k < nl; k++) {
        const a = T5 * 0.08 + k * 6.283 / nl, R2 = Math.min(g.rings[2] * 1.22, g.rings[2] + 70);
        for (let j = 0; j < 16; j++) {
          const f = (j / 16 + T5 * 0.5) % 1, r = Rs + (R2 - Rs) * f, aa = a + Math.sin(f * 3) * 0.08;
          c.fillStyle = `rgba(${gl},${(1 - f) * 0.8})`;
          c.fillRect(cx + Math.cos(aa) * r - 1.2, cy + Math.sin(aa) * r - 1.2, 2.4, 2.4);
        }
      }
      c.save();
      c.globalCompositeOperation = "lighter";
      for (const C of this.cmes) {
        const w = 0.22, cg = c.createRadialGradient(cx, cy, Rs, cx, cy, Math.max(Rs + 1, C.front));
        cg.addColorStop(0, "rgba(255,120,60,.15)");
        cg.addColorStop(0.85, "rgba(255,90,50,.35)");
        cg.addColorStop(1, "rgba(255,200,150,.6)");
        c.fillStyle = cg;
        c.beginPath();
        c.arc(cx, cy, C.front, C.a - w, C.a + w);
        c.arc(cx, cy, Rs, C.a + w, C.a - w, true);
        c.closePath();
        c.fill();
      }
      for (const J5 of this.jets) {
        const fade2 = J5.front >= g.rings[2] * 1.35 ? Math.max(0, 1 - (J5.t - 0.6) * 2) : 1, w = J5.w, big = J5.pw > 1.2;
        const jg = c.createRadialGradient(cx, cy, Rs, cx, cy, Math.max(Rs + 1, J5.front));
        jg.addColorStop(0, big ? `rgba(230,255,245,${0.8 * fade2})` : `rgba(255,235,190,${0.7 * fade2})`);
        jg.addColorStop(1, big ? `rgba(120,240,200,${0.25 * fade2})` : `rgba(255,170,90,${0.2 * fade2})`);
        c.fillStyle = jg;
        c.beginPath();
        c.arc(cx, cy, J5.front, J5.a - w, J5.a + w);
        c.arc(cx, cy, Rs, J5.a + w, J5.a - w, true);
        c.closePath();
        c.fill();
      }
      c.restore();
      const [z0, z1] = this.zone(s2);
      for (const L of this.loops) {
        const f1 = [cx + Math.cos(L.a - 0.28) * Rs * 0.97, cy + Math.sin(L.a - 0.28) * Rs * 0.97], f2 = [cx + Math.cos(L.a + 0.28) * Rs * 0.97, cy + Math.sin(L.a + 0.28) * Rs * 0.97];
        const ap = this.apex(L, g, T5);
        if (!L.held) {
          ap[0] += sh;
          ap[1] += sh * 0.7;
        }
        const t = L.held ? this.tension(L, g) : 0, inZone2 = t >= z0 && t <= z1, danger = L.life > 5.5 && !L.held;
        const ctrl = [2 * ap[0] - (f1[0] + f2[0]) / 2, 2 * ap[1] - (f1[1] + f2[1]) / 2];
        const base = L.held ? inZone2 ? [142, 240, 200] : t > z1 ? [255, 120, 90] : [255, 220, 170] : danger ? [255, 130, 90] : [255, 185, 120];
        c.save();
        c.globalCompositeOperation = "lighter";
        c.lineCap = "round";
        for (let k = 0; k < 4; k++) {
          const off = Math.sin(T5 * 4 + k * 1.7 + L.ph) * (3 + 6 * t) + (k - 1.5) * 2.2, nx = Math.cos(L.a + 1.57) * off, ny = Math.sin(L.a + 1.57) * off;
          c.strokeStyle = `rgba(${base.join(",")},${(k === 0 ? 0.9 : 0.28) * L.grow})`;
          c.lineWidth = k === 0 ? 2.2 : 5 + 3 * t;
          c.beginPath();
          c.moveTo(f1[0], f1[1]);
          c.quadraticCurveTo(ctrl[0] + nx, ctrl[1] + ny, f2[0], f2[1]);
          c.stroke();
        }
        c.restore();
        if (!L.held && L.grow > 0.25 && !v.passive) {
          const pr = 11 + 3 * Math.sin(T5 * 5 + L.ph);
          c.strokeStyle = danger ? "rgba(255,107,90,.8)" : "rgba(255,230,190,.55)";
          c.lineWidth = 1.5;
          c.beginPath();
          c.arc(ap[0], ap[1], pr, 0, 7);
          c.stroke();
          if (danger) {
            c.strokeStyle = "#ff6b5a";
            c.lineWidth = 2.5;
            c.beginPath();
            c.arc(ap[0], ap[1], pr + 5, -1.57, -1.57 + 6.283 * (1 - (L.life - 5.5) / 2));
            c.stroke();
          }
          if (L.anc > 0) {
            c.strokeStyle = "rgba(142,240,200,.6)";
            c.setLineDash([3, 4]);
            c.lineWidth = 1.2;
            const da = this.densest(L.a, s2), ex = cx + Math.cos(da) * g.rings[2] * 1.2, ey = cy + Math.sin(da) * g.rings[2] * 1.2;
            c.beginPath();
            c.moveTo(ap[0], ap[1]);
            c.lineTo(ex, ey);
            c.stroke();
            c.setLineDash([]);
            c.beginPath();
            c.arc(ap[0], ap[1], pr + 9, -1.57, -1.57 + 6.283 * L.anc);
            c.stroke();
          }
        }
        if (L.held) {
          const dir = this.aimDir(L, Math.atan2(L.hy - CY2, L.hx - CX2)), w = this.jetW(s2);
          const near = this.dots.filter((d) => !d.dying && !d.fly).map((d) => {
            const p = this.pos(d, g);
            return [Math.hypot(p[0] - L.hx, p[1] - L.hy), p];
          }).sort((a, b) => a[0] - b[0]).slice(0, 7);
          c.save();
          c.globalCompositeOperation = "lighter";
          for (const [, p] of near) {
            const mx = (p[0] + L.hx) / 2 + Math.sin(T5 * 3 + p[0]) * 10, my = (p[1] + L.hy) / 2 + Math.cos(T5 * 3 + p[1]) * 10;
            c.strokeStyle = `rgba(142,240,200,${0.15 + 0.25 * t})`;
            c.lineWidth = 1;
            c.beginPath();
            c.moveTo(p[0], p[1]);
            c.quadraticCurveTo(mx, my, L.hx, L.hy);
            c.stroke();
          }
          c.restore();
          c.fillStyle = "rgba(142,240,200,.06)";
          c.beginPath();
          c.arc(cx, cy, g.rings[2] * 1.35, dir - w, dir + w);
          c.arc(cx, cy, Rs, dir + w, dir - w, true);
          c.closePath();
          c.fill();
          const R0 = 24;
          c.lineWidth = 4;
          c.strokeStyle = "rgba(255,255,255,.1)";
          c.beginPath();
          c.arc(L.hx, L.hy, R0, Math.PI * 0.75, Math.PI * 2.25);
          c.stroke();
          const ang = (x) => Math.PI * 0.75 + Math.PI * 1.5 * Math.min(1, x / this.snapAt(s2));
          c.strokeStyle = "rgba(142,240,200,.55)";
          c.beginPath();
          c.arc(L.hx, L.hy, R0, ang(z0), ang(z1));
          c.stroke();
          c.strokeStyle = inZone2 ? "#8ef0c8" : t > z1 ? "#ff6b5a" : "#ffd9a0";
          c.lineWidth = 2.5;
          c.beginPath();
          c.arc(L.hx, L.hy, R0 + 5, Math.PI * 0.75, ang(t));
          c.stroke();
        }
      }
      const CS = sprite("collector", 16), FS = sprite("factory", 64);
      for (const d of this.dots) {
        let p = this.pos(d, g);
        p = [p[0] + sh, p[1] + sh * 0.7];
        if (d.fly) {
          const k = 1 - d.fly / 0.8;
          p = [d.sx + (p[0] - d.sx) * k, d.sy + (p[1] - d.sy) * k];
        }
        if (d.dying) {
          const k = d.dying / 0.9, r = g.rings[d.ring] * (1 - k) + Rs * k;
          p = [cx + Math.cos(d.a) * r, cy + Math.sin(d.a) * r];
          c.fillStyle = `rgba(255,107,90,${1 - k})`;
        } else if (d.glow) c.fillStyle = `rgba(${230 - 90 * d.glow | 0},255,${200 + 40 * d.glow | 0},1)`;
        else if (d.stun) c.fillStyle = `rgba(150,140,150,${0.35 + 0.65 * (1 - Math.min(1, d.stun / 8))})`;
        else c.fillStyle = d.ring === 0 ? "#ffe3a3" : d.ring === 1 ? "#f8c97c" : "#e9b46a";
        const big = s2.n > VIS ? 1 + Math.min(1.2, Math.log10(s2.n / VIS) * 0.25) : 1;
        if (CS && !d.dying) {
          const q = 6.5 * big;
          if (d.stun) c.globalAlpha = 0.25 + 0.75 * (1 - Math.min(1, d.stun / 8));
          c.drawImage(CS, p[0] - q / 2, p[1] - q / 2, q, q);
          c.globalAlpha = 1;
          if (d.glow) {
            c.globalAlpha = d.glow;
            c.fillRect(p[0] - 1.6 - d.glow, p[1] - 1.6 - d.glow, 3.2 + d.glow * 2, 3.2 + d.glow * 2);
            c.globalAlpha = 1;
          }
          continue;
        }
        const sz = (d.glow ? 3.2 + d.glow * 2 : 3) * big;
        c.fillRect(p[0] - sz / 2, p[1] - sz / 2, sz, sz);
      }
      for (const fa of this.fact) {
        const fr = Math.min(g.rings[2] * 1.22, g.rings[2] + 70), x = cx + Math.cos(fa.a) * fr, y = cy + Math.sin(fa.a) * fr;
        if (FS) {
          c.save();
          c.translate(x, y);
          c.rotate(fa.a + Math.PI * 0.75);
          c.drawImage(FS, -17, -17, 34, 34);
          c.globalCompositeOperation = "lighter";
          c.fillStyle = `rgba(142,240,200,${0.08 + 0.22 * fa.t})`;
          c.beginPath();
          c.arc(-2, -2, 7, 0, 7);
          c.fill();
          c.restore();
          continue;
        }
        c.save();
        c.translate(x, y);
        c.rotate(fa.a + 0.785);
        c.fillStyle = "#1d2a33";
        c.strokeStyle = "#8ef0c8";
        c.lineWidth = 1.3;
        c.fillRect(-7, -7, 14, 14);
        c.strokeRect(-7, -7, 14, 14);
        c.fillStyle = `rgba(142,240,200,${0.3 + 0.7 * fa.t})`;
        c.fillRect(-3, -3, 6, 6);
        c.restore();
      }
    }
  };

  // src/mech/ch3.ts
  var CX3 = 800;
  var CY3 = 500;
  var GM = 97e5;
  var RH = 50;
  var RD = 210;
  var VK = 1;
  var VMAX = 320;
  function iscoM(a) {
    const z1 = 1 + Math.cbrt(1 - a * a) * (Math.cbrt(1 + a) + Math.cbrt(1 - a)), z2 = Math.sqrt(3 * a * a + z1 * z1);
    return 3 + z2 - Math.sqrt((3 - z1) * (3 + z1 + 2 * z2));
  }
  var iscoPx = (s2) => RH + 34 * (iscoM(spinA(s2)) - 1) / 5;
  var lv3 = (s2, id) => s2.b[id] || 0;
  var diera = {
    clumps: [],
    spirals: [],
    grab: null,
    spawnT: 0,
    flareT: 0,
    flash: 0,
    lastPerfect: -99,
    tugT: 0,
    streamT: 0,
    botT: 0,
    reset() {
      this.clumps = [];
      this.spirals = [];
      this.grab = null;
      this.spawnT = 0;
      this.flash = 0;
    },
    idle() {
      return this.clumps.filter((c) => c.st === "idle");
    },
    spawn() {
      const a = rnd() * 6.283, r = 395 + rnd() * 70;
      this.clumps.push({ x: CX3 + Math.cos(a) * r, y: CY3 + Math.sin(a) * r, vx: 0, vy: 0, st: "idle", age: 0, r0: r, a0: a, sz: 0.85 + rnd() * 0.35 });
    },
    at(x, y) {
      let best = null, bd = 30;
      for (const c of this.clumps) if (c.st === "idle") {
        const d = Math.hypot(c.x - x, c.y - y);
        if (d < bd) {
          bd = d;
          best = c;
        }
      }
      return best;
    },
    /** Rychlost hodu z tahu myší (prak: táhneš od chuchvalce, letí opačně). */
    vel(c, M5) {
      let vx = (c.x - M5.x) * VK, vy = (c.y - M5.y) * VK;
      const v = Math.hypot(vx, vy);
      if (v > VMAX) {
        vx *= VMAX / v;
        vy *= VMAX / v;
      }
      return [vx, vy];
    },
    /** Kam se hmota usadí: poloměr kruhové dráhy se stejným momentem hybnosti. */
    landing(s2, x, y, vx, vy) {
      const rx = x - CX3, ry = y - CY3, h2 = rx * vy - ry * vx, rc = h2 * h2 / GM, I = iscoPx(s2);
      const e2 = vx * vx + vy * vy - 2 * GM / Math.hypot(rx, ry);
      if (e2 >= 0 && rc > RD) return { rc, k: "escape" };
      if (rc < I) return { rc, k: "plunge" };
      if (rc <= I * 1.9) return { rc, k: "perfect" };
      if (rc <= RD) return { rc, k: "disk" };
      return { rc, k: "outer" };
    },
    launch(c, vx, vy) {
      c.st = "fly";
      c.vx = vx;
      c.vy = vy;
      c.age = 0;
    },
    down(s2, M5) {
      this.grab = this.at(M5.x, M5.y);
    },
    up(s2, M5) {
      const c = this.grab;
      this.grab = null;
      if (!c || c.st !== "idle") return;
      const [vx, vy] = this.vel(c, M5);
      if (Math.hypot(vx, vy) < 8) return;
      this.launch(c, vx, vy);
    },
    /** Chuchvalec dorazil do disku (nebo spadl / uletěl). */
    land(s2, c) {
      const L = this.landing(s2, c.x, c.y, c.vx, c.vy), Q = T3.q;
      if (L.k === "escape") {
        ftxt(c.x, c.y, "Ulet\u011Blo", "#9aa6bd");
        return;
      }
      let q = Q[L.k], txt2 = L.k === "perfect" ? "Vnit\u0159n\xED prstenec" : L.k === "plunge" ? "Spadlo rovnou dovnit\u0159" : L.k === "outer" ? "Okraj disku" : "Do disku";
      if (L.k === "perfect") {
        s2.hole.combo = s2.t - this.lastPerfect < 6 ? Math.min(4, s2.hole.combo + 1) : 0;
        this.lastPerfect = s2.t;
        s2.hole.perfect++;
        q *= 1 + 0.15 * s2.hole.combo;
        if (s2.hole.combo) txt2 += ` \xB7 \u0159et\u011Bz ${s2.hole.combo + 1}\xD7`;
      }
      s2.hole.hits++;
      const m = clumpMass(s2) * q * c.sz;
      if (feed(s2, m)) this.flareUp(s2);
      ftxt(c.x, c.y - 14, `${txt2} \xD7${(Math.round(q * 100) / 100).toString().replace(".", ",")}`, L.k === "perfect" ? "#8ef0c8" : L.k === "plunge" ? "#e98a8a" : "#f2c48a");
      const rr2 = Math.max(RH + 2, Math.min(RD, L.rc));
      this.spirals.push({ r: rr2, a: Math.atan2(c.y - CY3, c.x - CX3), t: 0, dur: L.k === "plunge" ? 0.6 : 2.6, col: L.k === "perfect" ? "255,236,190" : "255,190,130", w: 3 + 2 * c.sz });
      if (L.k !== "plunge") sparks(c.x, c.y, 6, "#ffd9a8", 50);
    },
    flareUp(s2) {
      if (s2.t - this.flareT > 3) {
        ftxt(CX3, CY3 - RD - 30, "Eddingtonova mez \u2013 z\xE1\u0159en\xED odfouklo p\u0159ebytek", "#cfe0ff");
        s2.hole.flares++;
      }
      this.flareT = s2.t;
      this.flash = 1;
    },
    update(s2, dt, M5) {
      if (s2.ch !== 3) return;
      if (this.idle().length < poolCap(s2)) {
        this.spawnT -= dt;
        if (this.spawnT <= 0) {
          this.spawn();
          this.spawnT = respawnT(s2);
        }
      }
      for (let i = this.clumps.length - 1; i >= 0; i--) {
        const c = this.clumps[i];
        c.age += dt;
        if (c.st === "idle") {
          if (c === this.grab) continue;
          c.a0 += dt * 0.02;
          c.x = CX3 + Math.cos(c.a0) * c.r0;
          c.y = CY3 + Math.sin(c.a0) * c.r0;
          continue;
        }
        const sub = 6, h2 = dt / sub;
        let done = "";
        for (let k = 0; k < sub && !done; k++) {
          const rx = c.x - CX3, ry = c.y - CY3, r = Math.hypot(rx, ry), a = GM / (r * r * r);
          c.vx -= rx * a * h2;
          c.vy -= ry * a * h2;
          c.x += c.vx * h2;
          c.y += c.vy * h2;
          if (r < RD) done = "in";
          else if (r > 1100 || c.age > 14) done = "lost";
        }
        if (done === "in") this.land(s2, c);
        else if (done === "lost") ftxt(Math.max(60, Math.min(1540, c.x)), Math.max(60, Math.min(940, c.y)), "Ulet\u011Blo", "#9aa6bd");
        if (done) this.clumps.splice(i, 1);
      }
      for (let i = this.spirals.length - 1; i >= 0; i--) {
        const p = this.spirals[i];
        p.t += dt;
        const I = iscoPx(s2);
        p.a += dt * Math.sqrt(GM / Math.pow(Math.max(p.r, RH), 3)) * 0.35;
        p.r = Math.max(RH, p.r - dt * (p.r - I * 0.8) / Math.max(0.3, p.dur - p.t + 0.4));
        if (p.t > p.dur) this.spirals.splice(i, 1);
      }
      const tugs = lv3(s2, "tug");
      if (tugs) {
        this.tugT -= dt;
        if (this.tugT <= 0) {
          this.tugT = Math.max(0.25, T3.tugEvery / tugs);
          this.spirals.push({ r: RD * (0.75 + rnd() * 0.25), a: rnd() * 6.283, t: 0, dur: 2.6, col: s2.r.guide ? "255,236,190" : "255,190,130", w: 3 });
        }
      }
      if (s2.mis.tauris3 || s2.mis.star3) {
        this.streamT -= dt;
        if (this.streamT <= 0) {
          this.streamT = s2.mis.star3 ? 0.08 : 0.3;
          this.spirals.push({ r: RD, a: s2.mis.star3 ? 2.6 : -0.7, t: 0, dur: 3, col: s2.mis.star3 ? "210,230,255" : "200,215,255", w: 2 });
        }
      }
      if (this.spirals.length > 260) this.spirals.splice(0, this.spirals.length - 260);
      this.flash = Math.max(0, this.flash - dt * 1.5);
    },
    bot(s2, dt, M5) {
      this.botT -= dt;
      if (this.botT > 0) return;
      this.botT = 1.4 + rnd() * 0.6;
      const c = this.idle()[0];
      if (!c) return;
      const rx = c.x - CX3, ry = c.y - CY3, r = Math.hypot(rx, ry), I = iscoPx(s2);
      const rc = I * (1.15 + rnd() * 0.9), vt = Math.sqrt(GM * rc) / r * (1 + (rnd() - 0.5) * 0.12);
      this.launch(c, -ry / r * vt - rx / r * 25, rx / r * vt - ry / r * 25);
    },
    cursor(s2, M5) {
      return this.grab ? "grabbing" : this.at(M5.x, M5.y) ? "grab" : "default";
    },
    draw(c, s2, v, M5) {
      const T5 = v.T, P = power(s2), act = s2.ch === 3 && !v.passive;
      const I = img("near3");
      if (I) {
        const k = 1.375;
        c.save();
        c.globalAlpha = 0.95;
        c.drawImage(I, CX3 - 962 * k, CY3 - 545 * k, I.width * k, I.height * k);
        c.restore();
      }
      const vg = c.createRadialGradient(CX3, CY3, 120, CX3, CY3, 360);
      vg.addColorStop(0, "rgba(3,4,9,.75)");
      vg.addColorStop(1, "rgba(3,4,9,0)");
      c.fillStyle = vg;
      c.beginPath();
      c.arc(CX3, CY3, 360, 0, 7);
      c.fill();
      const lit2 = Math.max(0.25, Math.min(1, (Math.log10(Math.max(P, 1e26)) - 26) / 6.5)), Ip = iscoPx(s2), rIn = Math.max(RH + 1, Ip * 0.85);
      c.save();
      c.globalCompositeOperation = "lighter";
      const halo = c.createRadialGradient(CX3, CY3, RD * 0.6, CX3, CY3, RD * 1.7);
      halo.addColorStop(0, `rgba(255,150,80,${0.22 * lit2})`);
      halo.addColorStop(1, "rgba(255,90,60,0)");
      c.fillStyle = halo;
      c.beginPath();
      c.arc(CX3, CY3, RD * 1.7, 0, 7);
      c.fill();
      const DI = img("disk3");
      if (DI) {
        const W2 = 2 * RH / 0.208;
        c.save();
        c.globalAlpha = 0.3 + 0.7 * lit2;
        c.translate(CX3, CY3);
        c.rotate(-T5 * 0.04);
        c.drawImage(DI, -W2 / 2, -W2 / 2, W2, W2);
        c.restore();
      }
      const g = c.createRadialGradient(CX3, CY3, rIn, CX3, CY3, RD);
      g.addColorStop(0, `rgba(255,250,235,${0.95 * lit2})`);
      g.addColorStop(0.12, `rgba(255,222,160,${0.8 * lit2})`);
      g.addColorStop(0.4, `rgba(255,150,70,${0.5 * lit2})`);
      g.addColorStop(0.75, `rgba(210,80,50,${0.22 * lit2})`);
      g.addColorStop(1, "rgba(150,40,40,0)");
      if (!DI) {
        c.fillStyle = g;
        c.beginPath();
        c.arc(CX3, CY3, RD, 0, 7);
        c.moveTo(CX3 + rIn, CY3);
        c.arc(CX3, CY3, rIn, 0, 7, true);
        c.fill();
      }
      for (let i = 0; i < (DI ? 24 : 70); i++) {
        const f = i * 61 % 100 / 100, rr2 = rIn + Math.pow(f, 1.4) * (RD - rIn) * 0.97, w = Math.sqrt(GM / (rr2 * rr2 * rr2)) * 0.35, a = T5 * w + i * 2.4;
        const dop = 0.55 + 0.45 * Math.cos(a + 0.6 - Math.PI), q = 1 - (rr2 - rIn) / (RD - rIn);
        c.strokeStyle = `rgba(255,${170 + 80 * q},${110 + 120 * q},${(0.1 + 0.35 * lit2) * (0.25 + 0.75 * q) * dop})`;
        c.lineWidth = 0.8 + 2.2 * q;
        c.beginPath();
        c.arc(CX3, CY3, rr2, a, a + 0.5 + i % 4 * 0.35);
        c.stroke();
      }
      const dg = c.createLinearGradient(CX3 - RD, CY3, CX3 + RD, CY3);
      dg.addColorStop(0, `rgba(255,235,200,${0.16 * lit2})`);
      dg.addColorStop(0.5, "rgba(255,235,200,0)");
      if (!DI) c.fillStyle = dg;
      else c.fillStyle = "rgba(0,0,0,0)";
      c.beginPath();
      c.arc(CX3, CY3, RD * 0.9, 0, 7);
      c.moveTo(CX3 + rIn, CY3);
      c.arc(CX3, CY3, rIn, 0, 7, true);
      c.fill();
      for (const p of this.spirals) {
        const al = Math.min(1, p.t * 3) * Math.min(1, (p.dur - p.t) * 2);
        c.fillStyle = `rgba(${p.col},${0.75 * al})`;
        for (let k = 0; k < 4; k++) {
          const aa = p.a - k * 0.09;
          c.beginPath();
          c.arc(CX3 + Math.cos(aa) * p.r, CY3 + Math.sin(aa) * p.r, p.w * (1 - k * 0.2), 0, 7);
          c.fill();
        }
      }
      if (s2.r.jets3) {
        for (const sg of [-1, 1]) {
          const jg = c.createLinearGradient(CX3, CY3, CX3, CY3 + sg * 480);
          jg.addColorStop(0, `rgba(190,215,255,${0.55 * lit2})`);
          jg.addColorStop(1, "rgba(120,160,255,0)");
          c.fillStyle = jg;
          c.beginPath();
          c.moveTo(CX3 - 6, CY3);
          c.lineTo(CX3 - 26, CY3 + sg * 480);
          c.lineTo(CX3 + 26, CY3 + sg * 480);
          c.lineTo(CX3 + 6, CY3);
          c.fill();
        }
      }
      if (this.flash > 0) {
        c.strokeStyle = `rgba(220,235,255,${this.flash})`;
        c.lineWidth = 6 * this.flash;
        c.beginPath();
        c.arc(CX3, CY3, RD + (1 - this.flash) * 120, 0, 7);
        c.stroke();
      }
      c.restore();
      c.fillStyle = "#000";
      c.beginPath();
      c.arc(CX3, CY3, RH, 0, 7);
      c.fill();
      c.strokeStyle = `rgba(255,235,200,${0.5 + 0.4 * lit2})`;
      c.lineWidth = 1.6;
      c.beginPath();
      c.arc(CX3, CY3, RH + 1.5, 0, 7);
      c.stroke();
      c.setLineDash([4, 6]);
      c.strokeStyle = "rgba(142,240,200,.45)";
      c.lineWidth = 1.2;
      c.beginPath();
      c.arc(CX3, CY3, Ip, 0, 7);
      c.stroke();
      c.beginPath();
      c.arc(CX3, CY3, Ip * 1.9, 0, 7);
      c.stroke();
      c.setLineDash([]);
      const tugs = Math.min(lv3(s2, "tug"), 12);
      for (let i = 0; i < tugs; i++) {
        const a = T5 * 0.05 + i / tugs * 6.283, x = CX3 + Math.cos(a) * 470, y = CY3 + Math.sin(a) * 470;
        const TG = img("tug3");
        c.save();
        c.translate(x, y);
        c.rotate(a + 1.57);
        if (TG) c.drawImage(TG, -14, -14, 28, 28);
        else {
          c.fillStyle = "#ffe2b0";
          c.beginPath();
          c.moveTo(0, -6);
          c.lineTo(-4, 5);
          c.lineTo(4, 5);
          c.closePath();
          c.fill();
        }
        c.restore();
        c.fillStyle = "rgba(255,170,90,.6)";
        c.beginPath();
        c.arc(x - Math.cos(a) * 12, y - Math.sin(a) * 12, 4, 0, 7);
        c.fill();
      }
      for (const k of this.clumps) {
        const r = 13 * k.sz, pul = 0.75 + 0.25 * Math.sin(T5 * 3 + k.r0);
        const CI = img("clump3");
        if (CI) {
          const W2 = r * 4.4;
          c.save();
          c.globalCompositeOperation = "lighter";
          c.globalAlpha = pul;
          c.translate(k.x, k.y);
          c.rotate(k.r0 + T5 * 0.1);
          c.drawImage(CI, -W2 / 2, -W2 / 2, W2, W2);
          c.restore();
          if (act && k.st === "idle") {
            c.strokeStyle = `rgba(255,210,122,${0.35 + 0.35 * pul})`;
            c.lineWidth = 1.5;
            c.beginPath();
            c.arc(k.x, k.y, r * 1.7, 0, 7);
            c.stroke();
          }
          continue;
        }
        const cg = c.createRadialGradient(k.x, k.y, 0, k.x, k.y, r * 2.6);
        cg.addColorStop(0, `rgba(255,240,245,${pul})`);
        cg.addColorStop(0.25, `rgba(255,170,205,${0.8 * pul})`);
        cg.addColorStop(0.6, "rgba(220,100,170,.3)");
        cg.addColorStop(1, "rgba(120,200,220,0)");
        c.fillStyle = cg;
        c.beginPath();
        c.arc(k.x, k.y, r * 2.6, 0, 7);
        c.fill();
        if (act && k.st === "idle") {
          c.strokeStyle = `rgba(255,210,122,${0.35 + 0.35 * pul})`;
          c.lineWidth = 1.5;
          c.beginPath();
          c.arc(k.x, k.y, r * 1.5, 0, 7);
          c.stroke();
        }
      }
      if (act && this.grab && this.grab.st === "idle") {
        const k = this.grab, [vx, vy] = this.vel(k, M5), L = this.landing(s2, k.x, k.y, vx, vy);
        c.strokeStyle = "rgba(255,226,176,.85)";
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(k.x, k.y);
        c.lineTo(M5.x, M5.y);
        c.stroke();
        c.fillStyle = "#ffe2b0";
        c.beginPath();
        c.arc(M5.x, M5.y, 4, 0, 7);
        c.fill();
        const col = L.k === "perfect" ? "142,240,200" : L.k === "disk" || L.k === "outer" ? "242,166,90" : L.k === "plunge" ? "233,138,138" : "154,166,189";
        let x = k.x, y = k.y, ux = vx, uy = vy;
        const steps = s2.r.aim ? 150 : 50;
        c.fillStyle = `rgba(${col},.95)`;
        for (let i = 0; i < steps; i++) {
          const rx = x - CX3, ry = y - CY3, r = Math.hypot(rx, ry), a = GM / (r * r * r), h2 = 1 / 60;
          ux -= rx * a * h2;
          uy -= ry * a * h2;
          x += ux * h2;
          y += uy * h2;
          if (r < RD || r > 1100) break;
          if (i % 3 === 0) c.fillRect(x - 2, y - 2, 4, 4);
        }
        if (L.k !== "escape") {
          c.strokeStyle = `rgba(${col},.95)`;
          c.lineWidth = 3;
          c.beginPath();
          c.arc(CX3, CY3, Math.max(RH + 2, Math.min(RD + 40, L.rc)), 0, 7);
          c.stroke();
        }
        c.font = `600 ${13 / Math.max(v.sx, 0.3)}px ${MONO}`;
        c.textAlign = "left";
        c.fillStyle = `rgb(${col})`;
        c.fillText(L.k === "perfect" ? "Vnit\u0159n\xED prstenec \xD71,5" : L.k === "disk" ? "Do disku \xD71" : L.k === "outer" ? "Okraj disku \xD70,7" : L.k === "plunge" ? "Spadne rovnou \xD70,25" : "Ulet\xED", M5.x + 14, M5.y + 4);
      }
      const fs = 13 / Math.max(v.sx, 0.3);
      c.font = `600 ${fs}px ${MONO}`;
      c.textAlign = "center";
      c.save();
      c.lineJoin = "round";
      c.lineWidth = fs * 0.32;
      c.strokeStyle = "rgba(4,6,14,.88)";
      const lab = `D\xEDra po Ald\u0159e \xB7 8 M\u2609`, ed = `Eddingtonova mez ${pct(P / eddMax(s2))}`;
      c.strokeText(lab, CX3, CY3 + RD + 2.2 * fs);
      c.strokeText(ed, CX3, CY3 + RD + 3.6 * fs);
      c.restore();
      c.fillStyle = "#d9dfec";
      c.fillText(lab, CX3, CY3 + RD + 2.2 * fs);
      c.fillStyle = P / eddMax(s2) > 0.8 ? "#cfe0ff" : "#9aa6bd";
      c.fillText(ed, CX3, CY3 + RD + 3.6 * fs);
      void mdot;
      void count;
    }
  };

  // src/mech/ch4.ts
  var GCX = 780;
  var GCY = 500;
  var RG = 600;
  var TILT = 0.6;
  var lv4 = (s2, id) => s2.b[id] || 0;
  var gsp = (n2) => [GCX + n2.x * RG, GCY + n2.y * RG * TILT];
  var need = (n2) => needOf(n2.stars);
  var tex2 = null;
  var lit = null;
  var litKey = "";
  var galaxie = {
    threads: [],
    trails: [],
    beacons: [],
    beamOn: null,
    sweep: 0,
    hover: null,
    coreT: 0,
    reset() {
      this.threads = [];
      this.trails = [];
      this.beacons = [];
      this.beamOn = null;
      this.sweep = 0;
    },
    reachPx(s2) {
      return RG * (T4.reach[0] + T4.reach[1] * lv4(s2, "reach"));
    },
    nearestOn(s2, x, y) {
      let best = null, bd = 1e9;
      for (const n2 of galaxyNodes()) if (isOn(s2, n2.i)) {
        const p = gsp(n2), d = Math.hypot(p[0] - x, p[1] - y);
        if (d < bd) {
          bd = d;
          best = n2;
        }
      }
      return best || galaxyNodes()[0];
    },
    found(s2, n2, how) {
      setOn(s2, n2.i);
      if (how === "beam") this.sweep++;
      const p = gsp(n2);
      sparks(p[0], p[1], how === "beam" ? 10 : 4, "#ffe2b0", 60);
    },
    beam(s2, o, ang, len, pw, dt, how) {
      const op = gsp(o), half = 0.11;
      for (const n2 of galaxyNodes()) {
        if (isOn(s2, n2.i) || !inZone(s2, n2.i)) continue;
        const p = gsp(n2), dx = p[0] - op[0], dy = p[1] - op[1], d = Math.hypot(dx, dy);
        if (d > len || d < 1) continue;
        if (Math.abs(angDiff(Math.atan2(dy, dx), ang)) > half + 6 / d) continue;
        s2.prog[n2.i] = (s2.prog[n2.i] || 0) + dt * pw * (1 - 0.5 * d / len) / need(n2);
        n2.heat = 1;
        if (s2.prog[n2.i] >= 1) this.found(s2, n2, how);
      }
    },
    down() {
      this.sweep = 0;
    },
    up(s2, M5) {
      if (this.sweep > 1) {
        ftxt(M5.x, M5.y - 18, `Os\xEDdleno ${this.sweep} soustav`, "#ffd27a");
        s2.stats.sweeps++;
      }
      this.sweep = 0;
    },
    update(s2, dt, M5) {
      const N = galaxyNodes(), P = power(s2);
      for (const n2 of N) n2.heat = Math.max(0, (n2.heat || 0) - dt * 2);
      this.beamOn = null;
      if (M5.down) {
        const o = this.nearestOn(s2, M5.x, M5.y), op = gsp(o), pl = (1 + 0.6 * lv4(s2, "power")) * (s2.r.brake ? 1.5 : 1);
        const len = Math.min(Math.hypot(M5.x - op[0], M5.y - op[1]), this.reachPx(s2));
        const drain = T4.beamDrain * P, ok2 = s2.res.energy > 0;
        s2.res.energy = Math.max(0, s2.res.energy - drain * dt);
        const ang = Math.atan2(M5.y - op[1], M5.x - op[0]);
        this.beamOn = { o, ang, len, weak: !ok2 };
        this.beam(s2, o, ang, len, pl * (ok2 ? 1 : 0.15), dt, "beam");
      }
      const pr = lv4(s2, "probe"), spreadR = RG * (0.1 + 0.03 * pr);
      const chance = (0.01 + 0.01 * lv4(s2, "spread")) * (1 + T4.probe[0] * pr) * spreadMult(s2);
      if (this.threads.length < 60) {
        for (const n2 of N) {
          if (!isOn(s2, n2.i) || rnd() > chance * dt * 10) continue;
          const p = gsp(n2);
          let best = null, bd = spreadR;
          for (const m of N) {
            if (isOn(s2, m.i) || m.claim || !inZone(s2, m.i)) continue;
            const q = gsp(m), d = Math.hypot(q[0] - p[0], q[1] - p[1]);
            if (d < bd && rnd() < 0.5) {
              bd = d;
              best = m;
            }
          }
          if (best) {
            best.claim = n2;
            this.threads.push({ a: n2, b: best, fast: pr > 0 });
          }
        }
      }
      for (const th of this.threads) {
        if (isOn(s2, th.b.i)) {
          th.done = true;
          th.b.claim = null;
          continue;
        }
        const sp2 = (0.1 + 0.05 * lv4(s2, "spread")) * (1 + T4.probe[1] * pr) * spreadMult(s2);
        s2.prog[th.b.i] = (s2.prog[th.b.i] || 0) + dt * sp2 / need(th.b);
        if (s2.prog[th.b.i] >= 1) {
          this.found(s2, th.b, "spread");
          th.done = true;
          th.b.claim = null;
          if (th.fast) {
            const a = gsp(th.a), b = gsp(th.b);
            this.trails.push({ ax: a[0], ay: a[1], bx: b[0], by: b[1], t: 0 });
          }
        }
      }
      this.threads = this.threads.filter((t) => !t.done);
      const nb = lv4(s2, "beacon"), vb = Math.min(nb, 16), kb = nb > 16 ? nb / 16 : 1;
      while (this.beacons.length < vb) this.beacons.push({ n: null, t: 0, ang: null, base: 0 });
      for (const b of this.beacons) {
        if (!b.n || !isOn(s2, b.n.i)) {
          const on2 = N.filter((n2) => isOn(s2, n2.i));
          b.n = on2[rnd() * on2.length | 0];
          b.base = rnd() * 6.28;
          b.t = 0;
        }
        b.t += dt;
        b.ang = b.base + Math.sin(b.t * 0.35) * 1.1;
        this.beam(s2, b.n, b.ang, this.reachPx(s2) * 0.85, T4.beacon * (1 + 0.2 * lv4(s2, "power")) * Math.sqrt(kb), dt, "auto");
        if (b.t > 14) b.n = null;
      }
      for (const t of this.trails) t.t += dt;
      this.trails = this.trails.filter((t) => t.t < 1.2);
      if (s2.r.sgra) this.coreT += dt;
      this.hover = null;
      for (const n2 of N) {
        const p = gsp(n2);
        if (Math.hypot(M5.x - p[0], M5.y - p[1]) < 12) {
          this.hover = n2;
          break;
        }
      }
    },
    bot(s2, dt, M5) {
      if (s2.res.energy < power(s2) * 4) {
        if (M5.down) {
          M5.down = false;
          this.up(s2, M5);
        }
        return;
      }
      if (!this.botT || this.botT.done || isOn(s2, this.botT.n.i)) {
        let best = null, bv = 0;
        const reach = this.reachPx(s2);
        for (const n2 of galaxyNodes()) {
          if (isOn(s2, n2.i) || !inZone(s2, n2.i)) continue;
          const o = this.nearestOn(s2, gsp(n2)[0], gsp(n2)[1]), d = Math.hypot(gsp(n2)[0] - gsp(o)[0], gsp(n2)[1] - gsp(o)[1]);
          if (d > reach) continue;
          const v = n2.stars / need(n2);
          if (v > bv) {
            bv = v;
            best = n2;
          }
        }
        this.botT = best ? { n: best } : null;
      }
      if (!this.botT) {
        if (M5.down) {
          M5.down = false;
          this.up(s2, M5);
        }
        return;
      }
      const p = gsp(this.botT.n);
      M5.px = M5.x;
      M5.py = M5.y;
      M5.x = p[0] + 3;
      M5.y = p[1] + 3;
      if (!M5.down) {
        M5.down = true;
        this.down(s2, M5);
      }
    },
    cursor() {
      return "crosshair";
    },
    draw(c, s2, v, M5) {
      const N = galaxyNodes(), T5 = v.T;
      const GI = img("galaxy");
      if (GI) {
        const iw = RG / GIMG.R;
        c.save();
        c.globalCompositeOperation = "screen";
        c.globalAlpha = 0.8;
        c.translate(GCX, GCY);
        c.scale(1, TILT);
        c.drawImage(GI, -GIMG.cx * iw, -GIMG.cy * iw, iw, iw);
        c.restore();
      } else {
        if (!tex2) tex2 = spiralTex(1400, 21);
        c.save();
        c.globalAlpha = 0.6;
        c.translate(GCX, GCY);
        c.scale(1, TILT);
        c.drawImage(tex2, -1.05 * RG, -1.05 * RG, 2.1 * RG, 2.1 * RG);
        c.restore();
      }
      const lk = s2.col + Math.floor(s2.t / 2);
      if (litKey !== lk) {
        renderLit(s2);
        litKey = lk;
      }
      if (lit) {
        c.save();
        c.globalCompositeOperation = "lighter";
        c.drawImage(lit, 0, 0, 1600, 1e3);
        c.restore();
      }
      const cp = [GCX, GCY];
      const cg = c.createRadialGradient(cp[0], cp[1], 0, cp[0], cp[1], 26);
      cg.addColorStop(0, "rgba(255,240,210,.55)");
      cg.addColorStop(1, "rgba(255,200,140,0)");
      c.fillStyle = cg;
      c.beginPath();
      c.arc(cp[0], cp[1], 26, 0, 7);
      c.fill();
      if (s2.r.sgra) {
        const k = Math.min(1, this.coreT / 4), SG = img("sgra");
        if (SG) {
          const sz = 70 + 230 * k * k;
          c.save();
          c.globalCompositeOperation = "screen";
          c.globalAlpha = Math.min(1, k * 1.5);
          c.drawImage(SG, GCX - sz / 2, GCY - sz / 2, sz, sz);
          c.restore();
        } else {
          const L = RG * 0.6 * k;
          c.save();
          c.globalCompositeOperation = "lighter";
          for (const sd of [-1, 1]) {
            const jg = c.createLinearGradient(GCX, GCY, GCX, GCY + sd * L);
            jg.addColorStop(0, "rgba(200,220,255,.75)");
            jg.addColorStop(1, "rgba(120,160,255,0)");
            c.fillStyle = jg;
            c.beginPath();
            c.moveTo(GCX - 3, GCY);
            c.lineTo(GCX - 11 - 4 * Math.sin(T5 * 2), GCY + sd * L);
            c.lineTo(GCX + 11 + 4 * Math.sin(T5 * 2), GCY + sd * L);
            c.lineTo(GCX + 3, GCY);
            c.fill();
          }
          c.restore();
        }
      }
      const SL = img("sail"), CO = img("colony"), BE = img("beacon");
      c.save();
      c.globalCompositeOperation = "lighter";
      for (const th of this.threads) {
        const a = gsp(th.a), b = gsp(th.b), k = Math.min(1, s2.prog[th.b.i] || 0);
        c.strokeStyle = `rgba(255,215,160,${0.12 + 0.2 * k})`;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(a[0], a[1]);
        c.lineTo(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k);
        c.stroke();
        if (SL) c.drawImage(SL, a[0] + (b[0] - a[0]) * k - 4, a[1] + (b[1] - a[1]) * k - 4, 8, 8);
      }
      for (const tr of this.trails) {
        const k = tr.t / 1.2, f = Math.min(1, k * 1.6), x = tr.ax + (tr.bx - tr.ax) * f, y = tr.ay + (tr.by - tr.ay) * f;
        c.strokeStyle = `rgba(190,240,255,${(1 - k) * 0.6})`;
        c.lineWidth = 1.4;
        c.beginPath();
        c.moveTo(tr.ax, tr.ay);
        c.lineTo(x, y);
        c.stroke();
      }
      c.restore();
      for (const n2 of N) {
        if (n2.home) continue;
        const p = gsp(n2), on2 = isOn(s2, n2.i);
        if (on2) {
          const lg = Math.log10(n2.stars / 1e4 + 1);
          if (CO) {
            const m = maturity(s2, n2.i), sz = (7 + 2.4 * lg) * (0.55 + 0.45 * m);
            c.drawImage(CO, p[0] - sz / 2, p[1] - sz / 2, sz, sz);
          } else {
            c.fillStyle = "rgba(255,225,170,.95)";
            c.beginPath();
            c.arc(p[0], p[1], 2.4 + 0.4 * lg, 0, 7);
            c.fill();
          }
          continue;
        }
        const z = inZone(s2, n2.i), tw = (z ? 0.55 : 0.25) + 0.12 * Math.sin(T5 * 0.8 + n2.tw), h2 = n2.heat || 0;
        const rad = 1.4 + 0.45 * Math.log10(n2.stars / 1e4 + 1);
        if (z) {
          const g = c.createRadialGradient(p[0], p[1], 0, p[0], p[1], rad * 3.2);
          g.addColorStop(0, `rgba(200,215,255,${0.25 + 0.3 * h2})`);
          g.addColorStop(1, "rgba(200,215,255,0)");
          c.fillStyle = g;
          c.beginPath();
          c.arc(p[0], p[1], rad * 3.2, 0, 7);
          c.fill();
        }
        c.fillStyle = `rgba(230,236,255,${tw + 0.4 * h2})`;
        c.beginPath();
        c.arc(p[0], p[1], rad, 0, 7);
        c.fill();
        const pg = s2.prog[n2.i] || 0;
        if (pg > 0.02) {
          c.strokeStyle = "rgba(255,210,150,.75)";
          c.lineWidth = 1.5;
          c.beginPath();
          c.arc(p[0], p[1], 6, -1.57, -1.57 + 6.283 * pg);
          c.stroke();
        }
      }
      const drawBeam = (o, ang, len, a, col) => {
        const op = gsp(o), half = 0.11;
        c.save();
        c.globalCompositeOperation = "lighter";
        const bg2 = c.createRadialGradient(op[0], op[1], 0, op[0], op[1], len);
        bg2.addColorStop(0, `rgba(${col},${0.32 * a})`);
        bg2.addColorStop(1, `rgba(${col},0)`);
        c.fillStyle = bg2;
        c.beginPath();
        c.moveTo(op[0], op[1]);
        c.arc(op[0], op[1], len, ang - half, ang + half);
        c.closePath();
        c.fill();
        c.strokeStyle = `rgba(${col},${0.45 * a})`;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(op[0], op[1]);
        c.lineTo(op[0] + Math.cos(ang) * len, op[1] + Math.sin(ang) * len);
        c.stroke();
        c.restore();
        if (SL && a > 0.5) for (let j = 0; j < 3; j++) {
          const f = (T5 * 0.45 + j / 3) % 1, x = op[0] + Math.cos(ang) * len * f, y = op[1] + Math.sin(ang) * len * f, sz = 9 * (1 - 0.5 * f);
          c.globalAlpha = Math.min(1, (1 - f) * 3);
          c.drawImage(SL, x - sz / 2, y - sz / 2, sz, sz);
          c.globalAlpha = 1;
        }
      };
      for (const b of this.beacons) if (b.n && b.ang != null) {
        drawBeam(b.n, b.ang, this.reachPx(s2) * 0.85, 0.55, "150,230,255");
        if (BE) {
          const q = gsp(b.n);
          c.save();
          c.globalCompositeOperation = "screen";
          c.translate(q[0], q[1]);
          c.rotate(b.ang);
          c.drawImage(BE, -7, -7, 14, 14);
          c.restore();
        }
      }
      if (this.beamOn && !v.passive) drawBeam(this.beamOn.o, this.beamOn.ang, this.beamOn.len, this.beamOn.weak ? 0.3 : 1, "255,215,150");
      if (zoneR(s2) < 2) {
        const h2 = N[0], r = zoneR(s2);
        c.save();
        c.strokeStyle = "rgba(142,240,200,.22)";
        c.setLineDash([4, 8]);
        c.lineWidth = 1.2;
        c.beginPath();
        c.ellipse(GCX + h2.x * RG, GCY + h2.y * RG * TILT, r * RG, r * RG * TILT, 0, 0, 7);
        c.stroke();
        c.restore();
      }
      const hp = gsp(N[0]);
      const dg = c.createRadialGradient(hp[0], hp[1], 2, hp[0], hp[1], 16);
      dg.addColorStop(0, "rgba(0,0,0,1)");
      dg.addColorStop(0.4, "rgba(255,170,90,.6)");
      dg.addColorStop(1, "rgba(255,120,60,0)");
      c.fillStyle = dg;
      c.beginPath();
      c.arc(hp[0], hp[1], 16, 0, 7);
      c.fill();
      c.fillStyle = "#000";
      c.beginPath();
      c.arc(hp[0], hp[1], 3.5, 0, 7);
      c.fill();
      if (v.passive) return;
      if (!M5.down && M5.inside) {
        const o = this.nearestOn(s2, M5.x, M5.y), op = gsp(o);
        c.strokeStyle = "rgba(255,215,150,.12)";
        c.setLineDash([2, 7]);
        c.lineWidth = 1;
        c.beginPath();
        c.arc(op[0], op[1], this.reachPx(s2), 0, 7);
        c.stroke();
        c.setLineDash([]);
      }
      if (this.hover && !this.hover.home) {
        const n2 = this.hover, p = gsp(n2), on2 = isOn(s2, n2.i);
        const t1 = `${count(n2.stars)} hv\u011Bzd`, t2 = on2 ? "Os\xEDdleno" : `Os\xEDdlen\xED ${Math.round((s2.prog[n2.i] || 0) * 100)} %`;
        const fs = 13 / Math.max(v.sx, 0.5);
        c.font = `${fs}px ${MONO}`;
        c.textAlign = "left";
        const w = Math.max(c.measureText(t1).width, c.measureText(t2).width) + fs * 1.2;
        c.fillStyle = "rgba(10,12,20,.88)";
        c.fillRect(p[0] + 12, p[1] - fs * 2.9, w, fs * 2.8);
        c.fillStyle = "#d9dfec";
        c.fillText(t1, p[0] + 12 + fs * 0.6, p[1] - fs * 1.65);
        c.fillStyle = "#ffd27a";
        c.fillText(t2, p[0] + 12 + fs * 0.6, p[1] - fs * 0.45);
      }
    }
  };
  function renderLit(s2) {
    if (!lit) {
      lit = document.createElement("canvas");
      lit.width = 1600;
      lit.height = 1e3;
    }
    const c = lit.getContext("2d");
    c.clearRect(0, 0, 1600, 1e3);
    c.globalCompositeOperation = "lighter";
    for (const n2 of galaxyNodes()) {
      if (!isOn(s2, n2.i) || n2.home) continue;
      const m = maturity(s2, n2.i), p = gsp(n2), rad = (8 + 5 * Math.log10(n2.stars / 1e3 + 1)) * (0.5 + 0.5 * m), a = 0.3 * m;
      const gr = c.createRadialGradient(p[0], p[1], 0, p[0], p[1], rad);
      gr.addColorStop(0, `rgba(255,205,135,${a})`);
      gr.addColorStop(1, "rgba(255,170,90,0)");
      c.fillStyle = gr;
      c.beginPath();
      c.arc(p[0], p[1], rad, 0, 7);
      c.fill();
    }
  }
  function spiralTex(S, seed, o = {}) {
    const cv = document.createElement("canvas");
    cv.width = cv.height = S;
    const g = cv.getContext("2d"), r = mulberry(seed), R2 = S / 2, k = S / 600;
    g.translate(R2, R2);
    g.globalCompositeOperation = "lighter";
    let gr = g.createRadialGradient(0, 0, 0, 0, 0, R2 * 0.38);
    gr.addColorStop(0, "rgba(255,228,175,.95)");
    gr.addColorStop(0.35, "rgba(255,190,120,.35)");
    gr.addColorStop(1, "rgba(255,170,100,0)");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(0, 0, R2 * 0.38, 0, 7);
    g.fill();
    gr = g.createRadialGradient(0, 0, R2 * 0.1, 0, 0, R2);
    gr.addColorStop(0, "rgba(120,140,220,.16)");
    gr.addColorStop(1, "rgba(60,70,140,0)");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(0, 0, R2, 0, 7);
    g.fill();
    const arms = o.arms || 2, cnt = o.n || 11e3, wind = o.wind || 9.5;
    g.globalCompositeOperation = "source-over";
    for (let i = 0; i < cnt * 0.25; i++) {
      const a = i % arms, t = 0.15 + 0.8 * Math.pow(r(), 0.9), th = t * wind + a * 6.283 / arms - 0.12, rad = R2 * (0.1 + 0.86 * t);
      g.fillStyle = "rgba(10,6,14,.10)";
      const sz = (r() * 3 + 1) * k;
      g.fillRect(Math.cos(th) * rad, Math.sin(th) * rad, sz, sz);
    }
    g.globalCompositeOperation = "lighter";
    for (let i = 0; i < cnt; i++) {
      const a = i % arms, t = 0.12 + 0.85 * Math.pow(r(), 0.8), th = t * wind + a * 6.283 / arms, rad = R2 * (0.1 + 0.86 * t), sc = R2 * (0.035 + 0.05 * t);
      const x = Math.cos(th) * rad + (r() - 0.5) * sc * 2 * r(), y = Math.sin(th) * rad + (r() - 0.5) * sc * 2 * r();
      const h2 = r();
      g.fillStyle = h2 < 0.05 ? "rgba(255,120,170,.85)" : h2 < 0.55 ? "rgba(165,195,255,.55)" : "rgba(255,240,220,.42)";
      const sz = (r() * 1.2 + 0.35) * k * (o.dot || 1);
      g.fillRect(x, y, sz, sz);
    }
    for (let i = 0; i < cnt * 0.3; i++) {
      const a = r() * 6.283, d = Math.abs((r() + r() + r()) / 3 - 0.5) * 2 * R2 * 0.32;
      g.fillStyle = "rgba(255,215,160,.45)";
      const sz = (r() * 1.1 + 0.4) * k * (o.dot || 1);
      g.fillRect(Math.cos(a) * d, Math.sin(a) * d, sz, sz);
    }
    return cv;
  }

  // src/i18n/cs1.ts
  var CS1 = {
    name: "K\xE1men",
    title: "Kapitola 1 \xB7 K\xE1men",
    intro: {
      h: "VESPER-7 se probouz\xED",
      p: [
        "Jsi oper\xE1tor expedi\u010Dn\xED lodi Vesper a ze sv\xE9 kabiny \u0159\xEDd\xED\u0161 t\u011B\u017Eebn\xED platformu VESPER-7. Ta kotv\xED u asteroidu v p\xE1su Ceres-IX, kter\xFD ob\xEDh\xE1 modr\xE9ho veleobra Aldru.",
        "Zbytek pos\xE1dky sp\xED v hibernaci. \xDAst\u0159ed\xED na Zemi ml\u010D\xED u\u017E 412 dn\xED. Posledn\xED rozkaz zn\xED: t\u011B\u017Eit.",
        "Dr\u017E tla\u010D\xEDtko my\u0161i a t\xE1hni laserem p\u0159es sv\xEDt\xEDc\xED \u017E\xEDly. Z rudy stav panely. V\xFDkon platformy ukazuje, jak daleko se expedice dostala."
      ]
    },
    stages: ["Probuzen\xED", "Uhl\xEDkat\xFD pl\xE1\u0161\u0165", "Kovov\xE1 \u017E\xEDla", "Niklov\xE9 j\xE1dro", "Izotopov\xE1 \u017E\xEDla", "Typ I"],
    layer: ["Regolit", "Uhl\xEDkat\xFD pl\xE1\u0161\u0165", "Kovov\xE1 \u017E\xEDla", "Niklov\xE9 j\xE1dro", "Izotopov\xE1 \u017E\xEDla"],
    indicator: "Vyt\u011B\u017Een\xE1 ruda",
    /** V Kap. 1 se na mise posílají sondy – Vesper zůstává u platformy. */
    ship: { who: "Sonda", send: "Vyslat sondu", running: "Sonda let\xED", busy: "Sonda je na cest\u011B" },
    hint: [
      "Dr\u017E my\u0161 a t\xE1hni laserem p\u0159es sv\xEDt\xEDc\xED \u017E\xEDly. Cel\xE1 \u017E\xEDla jedn\xEDm tahem d\xE1 dvojn\xE1sobek, v\xEDc \u017Eil v jednom tahu vytvo\u0159\xED \u0159et\u011Bz. Krou\u017Eek u kurzoru ukazuje teplotu laseru.",
      "Ru\u010Dn\xED \u0159ez je po\u0159\xE1d nejv\xFDnosn\u011Bj\u0161\xED."
    ],
    b: {
      panel: { n: "Fotovoltaick\xFD panel", d: "M\u011Bn\xED sv\u011Btlo Aldry na elekt\u0159inu." },
      scan: { n: "Skener", d: "Mapuje asteroid a sb\xEDr\xE1 data pro v\xFDzkum." },
      beam: { n: "\u0160ir\u0161\xED paprsek", d: "Laser zas\xE1hne \u017E\xEDlu i p\u0159i m\xE9n\u011B p\u0159esn\xE9m tahu." },
      cool: { n: "Chladi\u010D laseru", d: "Laser se p\u0159eh\u0159\xEDv\xE1 pomaleji a rychleji chladne." },
      magnet: { n: "Magnetick\xFD lapa\u010D", d: "\xDAlomky rychleji dol\xE9taj\xED na plo\u0161inu." },
      find: { n: "Pr\u016Fzkum \u017Eil", d: "Na povrchu se objev\xED v\xEDc \u017Eil najednou." },
      refine: { n: "Rafinerie", d: "Ka\u017Ed\xE1 zv\xFD\u0161\xED v\xFDnos rudy o 12 %." },
      field: { n: "Sol\xE1rn\xED pole", d: "Panely p\u0159\xEDmo na povrchu asteroidu." },
      focus: { n: "Fokusace paprsku", d: "Ru\u010Dn\xED \u0159ez d\xE1 o 60 % v\xEDc rudy." },
      drone: { n: "T\u011B\u017Eebn\xED dron", d: "S\xE1m najde nejbli\u017E\u0161\xED \u017E\xEDlu a roz\u0159e\u017Ee ji." },
      dspeed: { n: "Rychlej\u0161\xED drony", d: "Drony l\xE9taj\xED a \u0159e\u017Eou rychleji." },
      dock: { n: "Mont\xE1\u017En\xED dok", d: "S\xE1m stav\xED drony z \u010D\xE1sti p\u0159\xEDjmu rudy." },
      farm: { n: "Zrcadlov\xE1 farma", d: "Zrcadla na ob\u011B\u017En\xE9 dr\xE1ze soust\u0159ed\xED sv\u011Btlo Aldry na panely." },
      dcenter: { n: "V\xFDpo\u010Detn\xED j\xE1dro", d: "Zpracuje v\xEDc dat ze skener\u016F." },
      statite: { n: "Sv\u011Bteln\xE1 plachta", d: "Tenk\xE1 plachta, kterou na m\xEDst\u011B dr\u017E\xED tlak z\xE1\u0159en\xED Aldry." },
      ring: { n: "Kolektorov\xFD prstenec", d: "Prstenec sv\u011Bteln\xFDch plachet pod\xE9l cel\xE9 dr\xE1hy p\xE1su." }
    },
    r: {
      spectro: { n: "Spektrometr", d: "2\xD7 v\xEDc rudy." },
      cells: { n: "\xDA\u010Dinn\xE9 \u010Dl\xE1nky", d: "Fotovoltaick\xE9 panely d\xE1vaj\xED 3\xD7 v\xEDc." },
      thermo: { n: "Term\xE1ln\xED mapa", d: "V\xEDc bohat\xFDch \u017Eil (40 %)." },
      drones: { n: "Autonomn\xED drony", d: "Odemkne t\u011B\u017Eebn\xED drony." },
      dock: { n: "Mont\xE1\u017En\xED dok", d: "Odemkne dok, kter\xFD stav\xED drony s\xE1m." },
      regolith: { n: "Zrcadla z regolitu", d: "Zrcadlov\xE9 farmy d\xE1vaj\xED 3\xD7 v\xEDc." },
      driver: { n: "Hmotov\xFD vrh", d: "Vyn\xE1\u0161\xED rudu na ob\u011B\u017Enou dr\xE1hu. Odemkne sv\u011Bteln\xE9 plachty." },
      assembly: { n: "Autonomn\xED mont\xE1\u017E", d: "Platforma sama stav\xED panely, sol\xE1rn\xED pole, zrcadlov\xE9 farmy a sv\u011Bteln\xE9 plachty. V\u017Edy to, co se pr\xE1v\u011B nejv\xEDc vyplat\xED. D\xE1 se vypnout." },
      deepdrill: { n: "Hlubinn\xFD vrt", d: "4\xD7 v\xEDc rudy." },
      statites: { n: "Leh\u010D\xED plachty", d: "Sv\u011Bteln\xE9 plachty d\xE1vaj\xED 3\xD7 v\xEDc." },
      calib: { n: "Kalibrace plachet", d: "Sv\u011Bteln\xE9 plachty d\xE1vaj\xED o 50 % v\xEDc." },
      lens: { n: "Fokusa\u010Dn\xED prstenec", d: "Kolektorov\xFD prstenec d\xE1v\xE1 o 50 % v\xEDc." },
      collector: { n: "Hv\u011Bzdn\xFD kolektor", d: "P\u0159esun k Ald\u0159e. Dokon\u010D\xED kapitolu." }
    },
    m: {
      belt: { n: "Sousedn\xED asteroidy", p: "P\xE1s Ceres-IX", r: "Rudy p\u0159ib\xFDv\xE1 1,5\xD7 rychleji" },
      kelvar: { n: "Led na Kelvaru", p: "M\u011Bs\xEDc plynn\xE9ho obra Tauris", r: "Dat p\u0159ib\xFDv\xE1 2\xD7 rychleji" },
      tauris: { n: "Atmosf\xE9ra Taurisu", p: "Plynn\xFD obr Tauris", r: "V\u0161echny elektr\xE1rny daj\xED 1,5\xD7 v\xEDc energie" },
      comet: { n: "Komet\xE1rn\xED oblak", p: "Okraj soustavy", r: "Rudy p\u0159ib\xFDv\xE1 2\xD7 rychleji" },
      chthon: { n: "Chtonick\xE1 planeta", p: "Vnit\u0159n\xED soustava", r: "Kolektorov\xFD prstenec d\xE1 2\xD7 v\xEDc energie" },
      wreck: { n: "Vrak sondy", p: "Vn\u011Bj\u0161\xED okraj p\xE1su", r: "Dat p\u0159ib\xFDv\xE1 1,5\xD7 rychleji" },
      echo: { n: "Ozv\u011Bna pulsu", p: "T\u011Bsn\u011B u Aldry", r: "Kolektorov\xFD prstenec d\xE1 1,5\xD7 v\xEDc energie" }
    },
    jour: {
      c1_start: "Platforma nab\u011Bhla. Na lodi je ticho, pos\xE1dka sp\xED v hibernaci. \xDAst\u0159ed\xED ml\u010D\xED 412 dn\xED a posledn\xED rozkaz zn\xED: t\u011B\u017Eit.",
      c1_cut: "Laser jde ztuha, ale jde. \xDAlomky let\xED na plo\u0161inu. Po tolika dnech \u010Dek\xE1n\xED je to dobr\xFD pocit.",
      c1_panel: "Prvn\xED panel se nato\u010Dil k Ald\u0159e. Jej\xED sv\u011Btlo je modr\xE9 a ostr\xE9, bez filtru by oslepilo.",
      c1_full: "Cel\xE1 \u017E\xEDla jedn\xEDm tahem. Asteroid zazvonil jako zvon. Ozv\u011Bna se ale vr\xE1tila o zlomek sekundy pozd\u011Bji, ne\u017E m\u011Bla.",
      f1_aldra: "Aldra je modr\xFD veleobr, asi p\u011Btadvacetkr\xE1t hmotn\u011Bj\u0161\xED ne\u017E Slunce. Z\xE1\u0159\xED jako sto tis\xEDc Slunc\xED, ale \u017Eije jen p\xE1r milion\u016F let.",
      c1_chain: "Skener zachytil slab\xFD r\xE1diov\xFD sign\xE1l: kr\xE1tk\xFD puls ka\u017Ed\xFDch 7,3 sekundy, p\u0159esn\xFD jako hodiny. \u017D\xE1dn\xFD zn\xE1m\xFD pulsar tu nen\xED. Zdroj je n\u011Bkde v na\u0161\xED soustav\u011B.",
      c1_belt: "Sonda prol\xE9tla okoln\xED kameny. V\u0161echny nesou stejn\xE9 stopy \u0159ezu a jsou star\u0161\xED ne\u017E VESPER-7.",
      c1_st1: "Pod regolitem je hornina pln\xE1 uhl\xEDku. Platforma poprv\xE9 vyr\xE1b\xED v\xEDc energie, ne\u017E spot\u0159ebuje.",
      c1_layer1: "\u017D\xEDly v pl\xE1\u0161ti jsou teplej\u0161\xED a laser jimi projde jako n\u016F\u017E. Puls se mezit\xEDm nezm\u011Bnil ani o milisekundu. P\u0159\xEDrodn\xED zdroje takhle p\u0159esn\xE9 neb\xFDvaj\xED.",
      f1_kard: "Karda\u0161evova \u0161k\xE1la m\u011B\u0159\xED civilizace podle v\xFDkonu, kter\xFD vyu\u017E\xEDvaj\xED. Typ I dok\xE1\u017Ee vyu\u017E\xEDt ve\u0161kerou energii jedn\xE9 planety, zhruba 10\xB9\u2076 W.",
      c1_kelvar: "Pod ledem Kelvaru le\u017E\xED stroje star\xE9 asi dv\u011B miliardy let. Maj\xED stejnou konstrukci jako drony, kter\xE9 m\xE1 VESPER-7 v pl\xE1nech.",
      c1_st2: "Kovov\xE1 \u017E\xEDla. Ruda je t\u011B\u017Ek\xE1 a \u010Dist\xE1, jako by ji n\u011Bkdo p\u0159edem vy\u010Distil. Tohle vydr\u017E\xED na roky t\u011B\u017Eby.",
      c1_layer2: "V kovu jsou zape\u010Den\xE9 dutiny pravideln\xE9ho tvaru. Skener je zapsal jako \u0161um. J\xE1 ne.",
      c1_drone: "Prvn\xED dron se odpojil od platformy a s\xE1m si hled\xE1 \u017E\xEDlu. D\xEDv\xE1m se na n\u011Bj d\xE9le, ne\u017E je nutn\xE9.",
      f1_drone: "Samoreplikuj\xEDc\xED stroje popsal u\u017E matematik John von Neumann. Sta\u010D\xED jedin\xFD, pokud m\xE1 dost surovin a \u010Dasu.",
      c1_dock: "Dok stav\xED drony bez m\xE9ho pokynu a roj kolem asteroidu houstne. Puls na chv\xEDli zes\xEDlil, pak se zase zti\u0161il.",
      c1_tauris: "Sonda prol\xE9tla mraky Taurisu. V hloubce je helium, vich\u0159ice a jeden ostr\xFD r\xE1diov\xFD odraz. N\u011Bco tam rezonuje s periodou 7,3 sekundy.",
      c1_st3: "Niklov\xE9 j\xE1dro asteroidu. Tady by t\u011B\u017Eba m\u011Bla skon\u010Dit. Data ale ukazuj\xED, \u017Ee pod n\xEDm je je\u0161t\u011B n\u011Bco.",
      c1_layer3: "J\xE1dro je protkan\xE9 tenk\xFDmi kan\xE1lky. Vedou dovnit\u0159, ne ven. Jako by tu n\u011Bkdo hledal tot\xE9\u017E co j\xE1.",
      c1_drones20: "Dvacet dron\u016F. Pohybuj\xED se v rytmu, kter\xFD jsem jim nedal: jeden takt ka\u017Ed\xFDch 7,3 sekundy.",
      c1_statite: "Prvn\xED plachta vis\xED v z\xE1\u0159en\xED Aldry a nepad\xE1. Sv\u011Btlo ji dr\u017E\xED jako dla\u0148.",
      f1_statite: "Placht\u011B, kter\xE1 vis\xED na m\xEDst\u011B bez ob\u011B\u017En\xE9 dr\xE1hy, se anglicky \u0159\xEDk\xE1 statite. Kdy\u017E je dost lehk\xE1, tlak sv\u011Btla vyrovn\xE1 gravitaci hv\u011Bzdy. Navrhl ji fyzik Robert Forward.",
      c1_comet: "Komety na okraji soustavy jsou roz\u0159ezan\xE9. \xDAhel \u0159ez\u016F odpov\xEDd\xE1 m\xE9mu laseru a kalibrace sed\xED na tis\xEDcinu.",
      c1_st4: "Izotopov\xE1 \u017E\xEDla. V rud\u011B je izotop, kter\xFD v p\u0159\xEDrod\u011B nem\xE1 jak vzniknout. A p\u0159esto tu je.",
      c1_layer4: "Puls nese \u010Dasovou zna\u010Dku a ta ukazuje do budoucnosti. O kolik, zat\xEDm nev\xEDm.",
      c1_chthon: "Chtonick\xE1 planeta je hol\xE9 j\xE1dro obra, kter\xE9mu Aldra strhla atmosf\xE9ru. Na povrchu je jedin\xE1 rovn\xE1 r\xFDha a m\xED\u0159\xED k Ald\u0159e.",
      c1_wreck: "Sonda dolet\u011Bla k vraku jin\xE9 sondy. Je pozemsk\xE9 v\xFDroby, ale \u017E\xE1dn\xE1 takov\xE1 nikdy neodstartovala. Pam\u011B\u0165 m\xE1 smazanou a\u017E na jedno slovo: po\u010Dkej.",
      c1_echo: "Sonda zachytila puls odra\u017Een\xFD od povrchu Aldry. Ozv\u011Bna dorazila d\u0159\xEDv, ne\u017E sign\xE1l ode\u0161el. Tak to fungovat nem\u016F\u017Ee.",
      c1_typeI: "Typ I. Platforma m\xE1 v\xFDkon cel\xE9 planety. A puls u\u017E nevych\xE1z\xED z p\xE1su, ale z Aldry."
    }
  };

  // src/i18n/cs2.ts
  var CS2 = {
    name: "Hv\u011Bzda",
    title: "Kapitola 2 \xB7 Hv\u011Bzda",
    intro: {
      h: "U Aldry",
      p: [
        "Hmotov\xFD vrh dopravil VESPER-7 na ob\u011B\u017Enou dr\xE1hu Aldry a Vesper ji n\xE1sledoval. Tady je sv\u011Btla v\xEDc, ne\u017E kdy spot\u0159ebuje cel\xE1 Zem\u011B.",
        "Hv\u011Bzda se m\u011Bn\xED pomalu. Mezi sm\u011Bnami jsi v hibernaci a roj mezit\xEDm pracuje s\xE1m \u2013 ka\u017Ed\xE9 probuzen\xED uk\xE1\u017Ee Aldru o kus star\u0161\xED.",
        "Postav kolem Aldry roj kolektor\u016F. Dr\u017E my\u0161 na dr\xE1ze a vypou\u0161t\xED\u0161 je z plazmatu.",
        "Nad skvrnami rostou magnetick\xE9 smy\u010Dky. Chy\u0165 vrchol, nat\xE1hni ho polem roje a pus\u0165 v zelen\xE9m p\xE1smu. Neuhl\xEDdan\xE1 smy\u010Dka se utrhne a jej\xED plazma ulet\xED nazmar."
      ]
    },
    stages: ["Modr\xFD obr", "Roj", "Vyt\u011B\u017Eov\xE1n\xED", "Pln\xFD roj", "Rud\xFD veleobr", "Wolf-Rayet", "Kolaps"],
    indicator: "Zachyceno sv\u011Btla Aldry",
    // Detail: skutečný stav hvězdy v každém stadiu (ukazuje se jen aktuální)
    star: {
      stage: "Stadium {n} z {of}",
      burn: "V j\xE1d\u0159e",
      T: "Povrch",
      R: "Polom\u011Br",
      L: "Sv\xEDtivost",
      real: "Ve skute\u010Dnosti trv\xE1",
      cov: "Roj zachyt\xED",
      rsun: "{v} Slunc\xED",
      lsun: "{v} Slunc\xED",
      cut: "\u0158ez hv\u011Bzdou"
    },
    phase: [
      { n: "Mlad\xE1 hlavn\xED posloupnost", burn: "vod\xEDk \u2192 helium", T: "35 000 K", R: "10", L: "150 000", real: "asi 2 mil. let", t: "Aldra je mlad\xE1 a hork\xE1. V j\xE1d\u0159e slu\u010Duje vod\xEDk na helium a skoro nic jin\xE9ho ji netr\xE1p\xED." },
      { n: "St\u0159ed hlavn\xED posloupnosti", burn: "vod\xEDk \u2192 helium", T: "33 000 K", R: "12", L: "160 000", real: "asi 3 mil. let", t: "Helia v j\xE1d\u0159e p\u0159ib\xFDv\xE1. Hv\u011Bzda se kv\u016Fli tomu pomalu nafukuje a v\xEDc sv\xEDt\xED." },
      { n: "Konec hlavn\xED posloupnosti", burn: "posledn\xED vod\xEDk \u2192 helium", T: "30 000 K", R: "15", L: "180 000", real: "asi 1 mil. let", t: "J\xE1dru doch\xE1z\xED vod\xEDk. Uprost\u0159ed z\u016Fst\xE1v\xE1 heliov\xFD popel, kter\xFD zat\xEDm neho\u0159\xED." },
      { n: "Modr\xFD veleobr", burn: "helium \u2192 uhl\xEDk, kysl\xEDk", T: "22 000 K", R: "30", L: "200 000", real: "asi 10 tis. let", t: "Vod\xEDk ho\u0159\xED u\u017E jen ve slupce kolem j\xE1dra. J\xE1dro se smr\u0161\u0165uje a zap\xE1l\xED helium, ob\xE1lka se rozp\xEDn\xE1." },
      { n: "Rud\xFD veleobr", burn: "helium \u2192 uhl\xEDk, kysl\xEDk", T: "3 600 K", R: "1 000", L: "200 000", real: "asi 700 tis. let", t: "Ob\xE1lka se nafoukla do ob\u0159\xED \u0159\xEDdk\xE9 koule. Povrch zchladl a zrudl, sv\xEDtivost z\u016Fstala skoro stejn\xE1." },
      { n: "Wolf-Rayetova hv\u011Bzda", burn: "uhl\xEDk \u2192 neon, ho\u0159\u010D\xEDk", T: "80 000 K", R: "3", L: "250 000", real: "asi 300 tis. let", t: "Siln\xFD v\xEDtr odv\xE1l vod\xEDkovou ob\xE1lku. Z\u016Fstalo obna\u017Een\xE9, \u017Ehav\xE9 a mal\xE9 j\xE1dro." },
      { n: "Posledn\xED dny", burn: "k\u0159em\xEDk \u2192 \u017Eelezo", T: "120 000 K", R: "3", L: "300 000", real: "dny", t: "Slupky ho\u0159\xED jedna za druhou st\xE1le rychleji. \u017Delezo u\u017E energii ned\xE1. J\xE1dro se brzy zhrout\xED." }
    ],
    hint: [
      "Dr\u017E my\u0161 na dr\xE1ze a vypou\u0161t\xED\u0161 kolektory. Chy\u0165 vrchol magnetick\xE9 smy\u010Dky, nat\xE1hni ji a pus\u0165 v zelen\xE9m p\xE1smu \u2013 v\xFDtrysk m\xED\u0159\xED tam, kam t\xE1hne\u0161. Mi\u0159 na hust\xFD roj.",
      "Ru\u010Dn\u011B nata\u017Een\xE1 smy\u010Dka d\xE1 po\u0159\xE1d nejv\xEDc a dr\u017E\xED rezonanci."
    ],
    b: {
      kol: { n: "Kolektor", d: "Zrcadlo na ob\u011B\u017En\xE9 dr\xE1ze. Vypou\u0161t\u011Bj ho i dr\u017Een\xEDm my\u0161i na dr\xE1ze." },
      sieve: { n: "Magnetick\xE9 s\xEDto", d: "Ced\xED plazma z hv\u011Bzdn\xE9ho v\u011Btru." },
      corona: { n: "Koronograf", d: "Sleduje kor\xF3nu Aldry. D\xE1v\xE1 data." },
      mirror: { n: "Zrcadlov\xE9 plachty", d: "Ka\u017Ed\xFD kolektor zachyt\xED o 60 % v\xEDc sv\u011Btla." },
      tame: { n: "Magnetick\xE9 c\xEDvky", d: "\u0160ir\u0161\xED zelen\xE9 p\xE1smo, smy\u010Dka praskne pozd\u011Bji. Od 2. vylep\u0161en\xED rostou dv\u011B smy\u010Dky najednou." },
      jet: { n: "\u0160ir\u0161\xED v\xFDtrysk", d: "\u0158\xEDzen\xE1 erupce zas\xE1hne v\xEDc roje." },
      harvest: { n: "Sb\u011Br erupc\xED", d: "Ka\u017Ed\xE1 erupce d\xE1 o 22 % v\xEDc plazmatu." },
      lift: { n: "Hv\u011Bzdn\xFD zdvih", d: "Magnetick\xE9 trycht\xFD\u0159e tahaj\xED plazma p\u0159\xEDmo z povrchu." },
      fact: { n: "Samoreplikuj\xEDc\xED tov\xE1rna", d: "Stav\xED a vypou\u0161t\xED kolektory z \u010D\xE1sti p\u0159\xEDjmu plazmatu." },
      fspeed: { n: "Rychlej\u0161\xED replikace", d: "Tov\xE1rny pracuj\xED o 50 % rychleji." },
      accel: { n: "Prstencov\xFD urychlova\u010D", d: "Urychluje plazma pod\xE9l rovn\xEDku a odv\xE1d\xED ho do roje. Dal\u0161\xED zdroj plazmatu." },
      windc: { n: "Lapa\u010D hv\u011Bzdn\xE9ho v\u011Btru", d: "Zachyt\xED v\xEDtr, kter\xFD Aldra ztr\xE1c\xED." },
      shell: { n: "Odb\u011Br z ob\xE1lky", d: "\u0158\xEDdk\xE1 ob\xE1lka rud\xE9ho veleobra jde lehce od\u010Derpat." },
      wr: { n: "Lapa\u010D v\u011Btru Wolf-Rayet", d: "Obna\u017Een\xE9 j\xE1dro chrl\xED v\xEDtr rychlost\xED tis\xEDc\u016F km/s." },
      anchor: { n: "Magnetick\xE1 kotva", d: "Sama uvoln\xED zralou smy\u010Dku k nejhust\u0161\xEDmu roji." },
      nudet: { n: "Neutrinov\xE1 stanice", d: "Naslouch\xE1 j\xE1dru Aldry. D\xE1v\xE1 hodn\u011B dat." }
    },
    r: {
      optics: { n: "Plazmov\xE1 optika", d: "Ka\u017Ed\xFD kolektor zachyt\xED 2\xD7 v\xEDc sv\u011Btla." },
      loops: { n: "Mapa magnetick\xE9ho pole", d: "Plazmatu p\u0159ib\xFDv\xE1 1,5\xD7 rychleji." },
      lifting: { n: "Hv\u011Bzdn\xFD zdvih", d: "Odemkne zdvih plazmatu z povrchu." },
      replic: { n: "Samoreplikace", d: "Odemkne tov\xE1rny, kter\xE9 vypou\u0161t\u011Bj\xED kolektory samy." },
      thin: { n: "Ten\u010D\xED zrcadla", d: "Ze stejn\xE9ho materi\xE1lu v\u011Bt\u0161\xED zrcadla. Ka\u017Ed\xFD kolektor zachyt\xED 3\xD7 v\xEDc sv\u011Btla." },
      anchors: { n: "Magnetick\xE9 kotvy", d: "Odemkne kotvy, kter\xE9 pou\u0161t\u011Bj\xED smy\u010Dky samy." },
      outer: { n: "Vn\u011Bj\u0161\xED dr\xE1hy", d: "Roj se p\u0159esune na vzd\xE1len\u011Bj\u0161\xED dr\xE1hy, kde se vejdou v\u011Bt\u0161\xED zrcadla. Ka\u017Ed\xFD kolektor zachyt\xED 3\xD7 v\xEDc sv\u011Btla." },
      convect: { n: "Konvek\u010Dn\xED mapa", d: "Odb\u011Br z ob\xE1lky d\xE1 2\xD7 v\xEDc plazmatu." },
      giant: { n: "Ob\u0159\xED zrcadla", d: "Roj se rozepne kolem nafoukl\xE9 hv\u011Bzdy. Ka\u017Ed\xFD kolektor zachyt\xED 1,5\xD7 v\xEDc sv\u011Btla." },
      neutrino: { n: "Neutrinov\xE1 astronomie", d: "Dat p\u0159ib\xFDv\xE1 3\xD7 rychleji." },
      collapse: { n: "Kolaps", d: "P\u0159iprav\xED roj na supernovu. Dokon\u010D\xED kapitolu." }
    },
    m: {
      dust: { n: "Prachov\xFD obal", p: "Vnit\u0159n\xED soustava", r: "Plazmatu p\u0159ib\xFDv\xE1 2\xD7 rychleji" },
      pulse: { n: "Zdroj pulsu", p: "Aldra", r: "Dat p\u0159ib\xFDv\xE1 2\xD7 rychleji" },
      light: { n: "Lehk\xE1 hv\u011Bzda", p: "Okol\xED Aldry, 9 ly", r: "Kolektory zachyt\xED 2\xD7 v\xEDc sv\u011Btla" },
      remnant: { n: "Poz\u016Fstatek supernovy", p: "Okol\xED Aldry, 40 ly", r: "Kolektory zachyt\xED 1,5\xD7 v\xEDc sv\u011Btla" },
      envelope: { n: "Odvr\u017Een\xE1 ob\xE1lka", p: "Okol\xED Aldry", r: "Plazmatu p\u0159ib\xFDv\xE1 1,5\xD7 rychleji" },
      wind: { n: "Bublina hv\u011Bzdn\xE9ho v\u011Btru", p: "Okol\xED Aldry", r: "Plazmatu p\u0159ib\xFDv\xE1 2\xD7 rychleji" }
    },
    jour: {
      c2_start: "Aldra zab\xEDr\xE1 p\u016Flku oblohy. Vypou\u0161t\xEDm prvn\xED kolektory. Puls je tady siln\u011Bj\u0161\xED.",
      c2_first: "Dvacet zrcadel na dr\xE1ze. Ka\u017Ed\xE9 zachyt\xED jen zlomek sv\u011Btla. Dohromady chyt\xED v\xEDc energie, ne\u017E kdy spot\u0159ebovala cel\xE1 Zem\u011B.",
      c2_flare: "Smy\u010Dka se p\u0159epojila a v\xFDtrysk pro\u0161el rojem. Plazma se d\xE1 \u0159\xEDdit. Jen nesm\xEDm zav\xE1hat.",
      c2_cme: "Neuhl\xEDdan\xE1 smy\u010Dka se utrhla. Erupce pro\u0161la rojem a zrcadla na chv\xEDli oslepla. Aldra nezlob\xED, jen d\xFDch\xE1.",
      f2_dyson: "Freeman Dyson v roce 1960 navrhl hledat civilizace podle infra\u010Derven\xE9ho z\xE1\u0159en\xED. Roj kolem hv\u011Bzdy by ji \u010D\xE1ste\u010Dn\u011B zakryl a s\xE1m h\u0159\xE1l.",
      c2_reson: "T\u0159i erupce za sebou v rezonanci. Mezi nimi p\u0159esn\u011B 7,3 sekundy. Nenastavil jsem to.",
      c2_dust: "V prachov\xE9m obalu jsou zrna slitiny. Stejn\xE9, jako maj\xED moje kolektory. Zrnitost se li\u0161\xED jen o p\xE1r atom\u016F.",
      c2_st1: "Roj obep\xEDn\xE1 Aldru. Na chv\xEDli zesl\xE1bne jej\xED sv\u011Btlo i v datech skeneru. Jako by mrkla.",
      c2_pulse: "Zdroj pulsu nen\xED v p\xE1su. Je hluboko v Ald\u0159e a pomalu kles\xE1 k j\xE1dru.",
      c2_st2: "Plazma te\u010De nahoru proudy, kter\xE9 jsem postavil. Hv\u011Bzda pomalu hubne. Je to spr\xE1vn\xE9?",
      c2_fact: "Prvn\xED tov\xE1rna postavila kolektor bez m\xE9ho p\u0159\xEDkazu. Pak dal\u0161\xED. Roj za\u010Dal r\u016Fst s\xE1m.",
      f2_repl: "Samoreplikuj\xEDc\xED stroje rostou exponenci\xE1ln\u011B. Zdvojen\xED ka\u017Edou hodinu znamen\xE1 za den \u0161estn\xE1ct milion\u016F kopi\xED.",
      c2_lift: "Hv\u011Bzdn\xFD zdvih t\xE1hne plazma z rovn\xEDku. Aldra p\u0159ich\xE1z\xED o rotaci a to\u010D\xED se pomaleji. Na povrchu se r\xFDsuj\xED p\xE1sy.",
      c2_light: "Sousedn\xED hv\u011Bzda je na sv\u016Fj v\u011Bk podez\u0159ele lehk\xE1. N\u011Bkdo z n\xED u\u017E d\xE1vno t\u011B\u017Eil. Stejn\u011B jako j\xE1 z Aldry.",
      c2_st3: "Roj pokr\xFDv\xE1 velk\xFD kus nebe kolem Aldry. Ve st\xEDnu kolektor\u016F je tma. A v t\xE9 tm\u011B n\u011Bco slab\u011B sv\xEDt\xED.",
      c2_typeII: "Typ II. Zachyt\xE1v\xE1m tolik energie, kolik vyz\xE1\u0159\xED cel\xE9 Slunce. Aldra ale vyz\xE1\u0159\xED stotis\xEDckr\xE1t v\xEDc. Je\u0161t\u011B nejsem v p\u016Fli.",
      c2_anchor: "Kotvy uvol\u0148uj\xED smy\u010Dky samy. Ud\u011Blaj\xED to o zlomek sekundy d\u0159\xEDv ne\u017E j\xE1. Jako by v\u011Bd\u011Bly, kdy p\u0159ijde puls.",
      c2_remnant: "Ve zbytku star\xE9 supernovy je \u010Dern\xE1 d\xEDra. Kolem n\xED stopy roje. Byl postaven\xFD stejn\u011B jako m\u016Fj.",
      c2_red: "Ald\u0159e do\u0161el vod\xEDk v j\xE1dru. Nafukuje se v rud\xE9ho veleobra. Roj mus\xED ustoupit, jinak sho\u0159\xED.",
      f2_red: "Rud\xFD veleobr by u n\xE1s sahal skoro k dr\xE1ze Jupiteru. Jeho vn\u011Bj\u0161\xED ob\xE1lka je \u0159id\u0161\xED ne\u017E vzduch, kter\xFD d\xFDchali lid\xE9.",
      c2_envelope: "Vesper prolet\u011Bl ob\xE1lkou, kterou Aldra odhodila. Plyn tvo\u0159\xED soust\u0159edn\xE9 slupky. Mezery mezi nimi odpov\xEDdaj\xED 7,3 sekundy, nata\u017Een\xE9 na tis\xEDce let.",
      c2_neutr: "Neutrina z j\xE1dra Aldry p\u0159ib\xFDvaj\xED. J\xE1dro se hrout\xED rychleji, ne\u017E by m\u011Blo. Puls je te\u010F p\u0159\xEDmo uprost\u0159ed.",
      c2_wind: "Bublina v\u011Btru kolem Aldry m\xE1 ostr\xFD okraj. Za n\xEDm je klid. Tak tich\xE9 m\xEDsto jsem je\u0161t\u011B nevid\u011Bl.",
      c2_last: "Aldra odhodila ob\xE1lku. Zbylo \u017Ehav\xE9 j\xE1dro. Neutrina \u0159\xEDkaj\xED: zb\xFDv\xE1 m\xE1lo \u010Dasu. Puls zrychlil."
    }
  };

  // src/i18n/cs3.ts
  var CS3 = {
    name: "D\xEDra",
    title: "Kapitola 3 \xB7 D\xEDra",
    intro: {
      h: "D\xEDra po Ald\u0159e",
      p: [
        "Aldra se zhroutila. Z jej\xEDho j\xE1dra vznikla \u010Dern\xE1 d\xEDra o hmotnosti osmi Slunc\xED a kolem n\xED se rozp\xEDn\xE1 rozervan\xE1 mlhovina, zbytek hv\u011Bzdy po v\xFDbuchu.",
        "Roj ztratil sv\u011Btlo a v\xFDkon spadl na zlomek. Jedin\xFD zdroj energie je te\u010F to, co spadne do d\xEDry.",
        "Chytni chuchvalec plynu na okraji mlhoviny, t\xE1hni ho jako prak a pus\u0165. Ho\u010F ho bokem, a\u0165 se usad\xED v disku. Kdy\u017E ho hod\xED\u0161 rovn\u011B na d\xEDru, spadne dovnit\u0159 bez u\u017Eitku."
      ]
    },
    stages: ["St\xEDn po Ald\u0159e", "Disk se rozsv\u011Bc\xED", "Hust\xFD disk", "Rotace", "Eddingtonova mez", "V\xFDtrysky", "Svazek"],
    indicator: "Eddingtonova mez",
    ship: { who: "Vesper", send: "Vyslat Vesper", running: "Vesper let\xED", busy: "Vesper je na cest\u011B" },
    card: { stage: "Stadium {n} z {of}", sub: "D\xEDra po Ald\u0159e \xB7 8 M\u2609", cut: "Disk z boku", spin: "Rotace d\xEDry", eta: "\xDA\u010Dinnost disku", flow: "P\u0159\xEDtok do d\xEDry", edd: "Eddingtonova mez", hor: "Horizont", isco: "Vnit\u0159n\xED prstenec", real: "Ve skute\u010Dnosti trv\xE1" },
    phase: [
      { n: "St\xEDn po Ald\u0159e", real: "dny", t: "Z ob\u0159\xED hv\u011Bzdy zbyla d\xEDra, jej\xED\u017E horizont m\u011B\u0159\xED nap\u0159\xED\u010D jen 47 km. Kolem n\xED krou\u017E\xED trosky, kter\xE9 je\u0161t\u011B nestihly spadnout." },
      { n: "Disk se rozsv\u011Bc\xED", real: "t\xFDdny", t: "Ka\u017Ed\xFD chuchvalec, kter\xFD se usad\xED v disku, se roz\u017Ehav\xED na miliony stup\u0148\u016F a z\xE1\u0159\xED v rentgenu." },
      { n: "Hust\xFD disk", real: "m\u011Bs\xEDce", t: "Disk je hust\xFD a sv\xEDt\xED s\xE1m. Hmota v n\u011Bm st\xE9k\xE1 po spir\xE1le dovnit\u0159 a cestou prom\u011Bn\xED \u010D\xE1st sv\xE9 hmotnosti ve sv\u011Btlo." },
      { n: "Rotace", real: "roky", t: "Hmota, kter\xE1 p\u0159it\xE9k\xE1 po sm\u011Bru rotace, d\xEDru rozt\xE1\u010D\xED. \u010C\xEDm rychleji se to\u010D\xED, t\xEDm bl\xED\u017E k n\xED m\u016F\u017Ee disk sahat." },
      { n: "Eddingtonova mez", real: "des\xEDtky let", t: "Z\xE1\u0159en\xED disku tla\u010D\xED plyn ven stejn\u011B siln\u011B, jako ho d\xEDra t\xE1hne dovnit\u0159. V\xEDc hmoty u\u017E nepom\u016F\u017Ee." },
      { n: "V\xFDtrysky", real: "stovky let", t: "Magnetick\xE9 pole odn\xE1\u0161\xED energii z rotace d\xEDry ve dvou v\xFDtrysc\xEDch. Ty mez obejdou." },
      { n: "Svazek", real: "stovky let", t: "D\xEDra sv\xEDt\xED v\xEDc ne\u017E Aldra za \u017Eivota. Energie sta\u010D\xED na svazek, kter\xFD dotla\u010D\xED plachty k ciz\xEDm hv\u011Bzd\xE1m." }
    ],
    hint: [
      "Chytni chuchvalec na okraji mlhoviny, t\xE1hni ho od d\xEDry a pus\u0165. Kruh ukazuje, kde se hmota usad\xED: zelen\xFD je vnit\u0159n\xED prstenec, ten d\xE1 nejv\xEDc energie.",
      "Kdy\u017E hod\xED\u0161 n\u011Bkolik chuchvalc\u016F rychle za sebou do vnit\u0159n\xEDho prstence, vznikne \u0159et\u011Bz a ka\u017Ed\xFD dal\u0161\xED hod d\xE1 v\xEDc."
    ],
    b: {
      lap: { n: "Lapa\u010D v\u011Btru", d: "Sb\xEDr\xE1 hmotu, kterou z hork\xE9ho disku odn\xE1\u0161\xED v\xEDtr. \u010C\xEDm v\xEDc krm\xED\u0161 disk, t\xEDm v\xEDc nasb\xEDr\xE1." },
      clump: { n: "V\u011Bt\u0161\xED chuchvalce", d: "Vesper st\xE1hne z mlhoviny v\xEDc plynu najednou." },
      xray: { n: "Rentgenov\xFD dalekohled", d: "Hork\xFD disk z\xE1\u0159\xED v rentgenu. D\xE1v\xE1 data." },
      pool: { n: "Z\xE1sobn\xEDk", d: "V mlhovin\u011B je p\u0159ipraveno v\xEDc chuchvalc\u016F a p\u0159ib\xFDvaj\xED rychleji." },
      ring3: { n: "Prstenec lapa\u010D\u016F", d: "Lapa\u010De spojen\xE9 do prstence zachyt\xED v\xEDc." },
      tug: { n: "Remork\xE9r", d: "S\xE1m zah\xE1kne chuchvalec a hod\xED ho do disku." },
      spin: { n: "Rozt\xE1\u010Den\xED d\xEDry", d: "Hmota p\u0159id\xE1van\xE1 po sm\u011Bru rotace d\xEDru rozt\xE1\u010D\xED. Vnit\u0159n\xED prstenec se p\u0159ibl\xED\u017E\xED a disk vyz\xE1\u0159\xED v\xEDc." },
      field3: { n: "Magnetick\xE1 s\xED\u0165", d: "Zes\xEDl\xED pole disku, v\xFDtrysky unesou v\xEDc." }
    },
    r: {
      aim: { n: "V\xFDpo\u010Det dr\xE1hy", d: "P\u0159edpov\u011B\u010F dr\xE1hy chuchvalce je t\u0159ikr\xE1t del\u0161\xED." },
      qpo: { n: "Oscilace disku", d: "Dat p\u0159ib\xFDv\xE1 2\xD7 rychleji." },
      tugs: { n: "Remork\xE9ry", d: "Odemkne remork\xE9ry, kter\xE9 krm\xED disk samy." },
      guide: { n: "Nav\xE1d\u011Bn\xED remork\xE9r\u016F", d: "Remork\xE9ry m\xED\u0159\xED do vnit\u0159n\xEDho prstence. Ka\u017Ed\xFD jejich hod d\xE1 1,5\xD7 v\xEDc." },
      spinup: { n: "Rozt\xE1\u010Den\xED", d: "Odemkne rozt\xE1\u010Den\xED d\xEDry." },
      jets3: { n: "V\xFDtrysky", d: "Pole disku vytvo\u0159\xED v\xFDtrysky. Strop v\xFDkonu je 4\xD7 v\xFD\u0161." },
      beam3: { n: "Laserov\xFD svazek", d: "Postav\xED svazek, kter\xFD dotla\u010D\xED plachty k hv\u011Bzd\xE1m. Dokon\u010D\xED kapitolu." }
    },
    m: {
      belt3: { n: "Zbytky p\xE1su", p: "Poz\u016Fstatek supernovy", r: "Chuchvalce maj\xED 2\xD7 v\xEDc hmoty" },
      kelvar3: { n: "Kelvar", p: "Poz\u016Fstatek supernovy", r: "Dat p\u0159ib\xFDv\xE1 2\xD7 rychleji" },
      tauris3: { n: "Trosky Taurise", p: "Poz\u016Fstatek supernovy", r: "Plyn z Taurise st\xE9k\xE1 do disku s\xE1m" },
      ergo: { n: "Ergosf\xE9ra", p: "T\u011Bsn\u011B u d\xEDry", r: "Disk vyz\xE1\u0159\xED 1,3\xD7 v\xEDc energie" },
      star3: { n: "Sousedn\xED hv\u011Bzda", p: "Okraj mlhoviny", r: "Roztr\u017Een\xE1 hv\u011Bzda krm\xED disk proudem plynu" }
    },
    jour: {
      h3_start: "Aldra se zhroutila. Kde sv\xEDtila hv\u011Bzda, je te\u010F \u010Dern\xE1 d\xEDra t\u011B\u017Ek\xE1 jako osm Slunc\xED a kolem n\xED rozervan\xE1 mlhovina. Roj nem\xE1 z \u010Deho br\xE1t.",
      h3_first: "Prvn\xED chuchvalec se rozplynul v disku. Na okam\u017Eik zaz\xE1\u0159il jasn\u011Bji ne\u017E cel\xE1 mlhovina. Tohle je te\u010F moje hv\u011Bzda.",
      f3_isco: "Kolem \u010Dern\xE9 d\xEDry je nejmen\u0161\xED stabiln\xED dr\xE1ha. Bl\xED\u017E u\u017E hmota ob\xEDhat nem\u016F\u017Ee a spadne dovnit\u0159. Nejv\xEDc energie vyz\xE1\u0159\xED plyn t\u011Bsn\u011B nad n\xED.",
      h3_ten: "Deset z\xE1sah\u016F. Disk se ust\xE1lil a slab\u011B pulzuje s periodou 7,3 sekundy. Puls te\u010F vych\xE1z\xED p\u0159\xEDmo z d\xEDry.",
      h3_belt: "Zbytky p\xE1su p\u0159e\u017Eily v\xFDbuch jako \u017Ehav\xFD prstenec trosek. Vesper je zah\xE1kl a st\xE1hl bl\xED\u017E. Te\u010F je z \u010Deho br\xE1t.",
      h3_st1: "Disk sv\xEDt\xED jako mal\xE1 hv\u011Bzda. V rentgenu je vid\u011Bt ka\u017Ed\xFD chuchvalec, kter\xFD do n\u011Bj spadne. N\u011Bkter\xE9 z\xE1blesky p\u0159i\u0161ly d\u0159\xEDv, ne\u017E jsem hodil.",
      f3_edd: "Eddingtonova mez je nejvy\u0161\u0161\xED sv\xEDtivost, p\u0159i kter\xE9 z\xE1\u0159en\xED je\u0161t\u011B neodfoukne padaj\xEDc\xED plyn. Pro d\xEDru t\u011B\u017Ekou jako osm Slunc\xED je to asi 10\xB3\xB2 W.",
      h3_qpo: "Disk kmit\xE1 s periodou 7,3 sekundy. Astronomov\xE9 tomu \u0159\xEDkaj\xED kvaziperiodick\xE9 oscilace. U tohohle disku nejsou kvazi. Jsou p\u0159esn\xE9.",
      h3_kelvar: "Pod rozt\xE1t\xFDm ledem Kelvaru le\u017E\xED \u0159ada ciz\xEDch dron\u016F. Jejich pam\u011Bti jsou pln\xE9 m\u011B\u0159en\xED, kter\xE1 jsme nikdy ned\u011Blali. V\u0161echny m\xED\u0159\xED k m\xEDstu, kde je te\u010F d\xEDra.",
      h3_st2: "V\xFDkon roste rychleji, ne\u017E st\xEDh\xE1m h\xE1zet. Pot\u0159ebuju pomocn\xEDky, kte\u0159\xED budou krmit disk, i kdy\u017E sp\xEDm.",
      h3_tug: "Prvn\xED remork\xE9r zah\xE1kl chuchvalec a hodil ho p\u0159esn\u011B jako j\xE1. D\xEDv\xE1m se na n\u011Bj a m\xE1m pocit, \u017Ee se d\xEDv\xE1m na sebe.",
      h3_tauris: "Supernova strhla Taurisu plynn\xFD obal. Jeho zbytky jsme sto\u010Dili k d\xED\u0159e a te\u010F z nich do disku s\xE1m st\xE9k\xE1 dlouh\xFD proud plynu. Byl to kr\xE1sn\xFD obr.",
      f3_hawking: "D\xEDra by m\u011Bla sama slab\u011B z\xE1\u0159it, je to Hawkingovo z\xE1\u0159en\xED. U d\xEDry t\u011B\u017Ek\xE9 jako osm Slunc\xED m\xE1 ale teplotu jen asi osm miliardtin kelvinu. Z reliktn\xEDho z\xE1\u0159en\xED pohlt\xED v\xEDc, ne\u017E vyz\xE1\u0159\xED.",
      h3_st3: "Disk je hust\xFD a hork\xFD, ale d\xEDra z n\u011Bj bere jen p\xE1r procent. Kdy\u017E ji rozto\u010D\xEDm, vyt\u011B\u017E\xED z ka\u017Ed\xE9ho kilogramu v\xEDc.",
      h3_spin: "D\xEDra se to\u010D\xED rychleji. Vnit\u0159n\xED okraj disku se k n\xED p\u0159ibl\xED\u017Eil a hmota z n\u011Bj te\u010F vyz\xE1\u0159\xED v\xEDc energie.",
      f3_cyg: "Cygnus X-1 je skute\u010Dn\xE1 \u010Dern\xE1 d\xEDra t\u011B\u017Ek\xE1 asi jako 21 Slunc\xED, kter\xE1 krade plyn sousedn\xED hv\u011Bzd\u011B. To\u010D\xED se skoro nejrychleji, jak je to mo\u017En\xE9.",
      h3_ergo: "Vesper prolet\u011Bl ergosf\xE9rou. Tam se ned\xE1 st\xE1t na m\xEDst\u011B, prostor se to\u010D\xED s d\xEDrou. Ven jsme vylet\u011Bli s v\xEDc energi\xED, ne\u017E jsme m\u011Bli.",
      h3_st4: "Disk narazil na Eddingtonovu mez. Z\xE1\u0159en\xED tla\u010D\xED hmotu ven stejn\u011B siln\u011B, jako ji d\xEDra t\xE1hne dovnit\u0159.",
      h3_flare: "Disk vzplanul a odfoukl p\u0159ebytek. Mlhovina se na okam\u017Eik rozsv\xEDtila a\u017E k okraji. V tom z\xE1blesku byl puls dvakr\xE1t.",
      h3_jets: "Magnetick\xE9 pole disku se zkroutilo do dvou v\xFDtrysk\u016F. Odn\xE1\u0161ej\xED energii z rotace d\xEDry a mez je najednou daleko.",
      h3_star: "Sousedn\xED hv\u011Bzda prol\xE9tala bl\xEDzko a sta\u010Dilo ji trochu postr\u010Dit. D\xEDra ji roztrhla a jej\xED plyn se kolem ov\xEDj\xED jako stuha. Tolik sv\u011Btla jsem nevid\u011Bl od Aldry.",
      f3_tde: "Kdy\u017E se hv\u011Bzda dostane p\u0159\xEDli\u0161 bl\xEDzko k \u010Dern\xE9 d\xED\u0159e, slapy ji rozt\xE1hnou do tenk\xE9ho proudu. Takov\xE9 z\xE1blesky astronomov\xE9 zachytili v ciz\xEDch galaxi\xEDch.",
      h3_st5: "D\xEDra sv\xEDt\xED siln\u011Bji ne\u017E Aldra za \u017Eivota. Kone\u010Dn\u011B je dost energie na laser, kter\xFD dotla\u010D\xED sv\u011Bteln\xE9 plachty a\u017E k jin\xFDm hv\u011Bzd\xE1m.",
      h3_end: "Mlhovina je skoro pr\xE1zdn\xE1, d\xEDra sn\u011Bdla, co \u0161lo. Je \u010Das pod\xEDvat se d\xE1l ne\u017E k nejbli\u017E\u0161\xED hv\u011Bzd\u011B."
    }
  };

  // src/i18n/cs4.ts
  var CS4 = {
    name: "Galaxie",
    title: "Kapitola 4 \xB7 Galaxie",
    intro: {
      h: "Svazek",
      p: [
        "D\xEDra po Ald\u0159e je nakrmen\xE1 a sv\xEDt\xED siln\u011Bji ne\u017E hv\u011Bzda, ze kter\xE9 vznikla. Jej\xED energie te\u010F nap\xE1j\xED laserov\xFD svazek.",
        "Vesper zakotvil t\u011Bsn\u011B u d\xEDry. Tady ti \u010Das plyne pomaleji ne\u017E zbytku galaxie \u2013 zat\xEDmco pro tebe ub\u011Bhnou hodiny, plachty venku let\xED tis\xEDce let.",
        "Jsi v rameni Persea, asi 6 000 sv\u011Bteln\xFDch let od Slunce. Svazek dotla\u010D\xED sv\u011Bteln\xE9 plachty se z\xE1rodky koloni\xED a\u017E k ciz\xEDm hv\u011Bzd\xE1m.",
        "Dr\u017E my\u0161 a ze sv\xE9 nejbli\u017E\u0161\xED kolonie m\xED\u0159\xED svazek. P\u0159eje\u010F j\xEDm p\u0159es hv\u011Bzdy a chv\xEDli podr\u017E, dokud se krou\u017Eek nezapln\xED. Svazek bere energii."
      ]
    },
    stages: ["Rameno Persea", "Sousedn\xED hv\u011Bzdy", "Mezi rameny", "M\xEDstn\xED rameno", "Rameno Str\xE1\u017Ece", "J\xE1dro", "Typ III"],
    indicator: "Hv\u011Bzdy pod kontrolou",
    ship: { who: "Vesper", send: "Vyslat Vesper", running: "Vesper let\xED", busy: "Vesper je na cest\u011B" },
    card: { stage: "Stadium {n} z {of}", where: "Kde", col: "Kolonie", stars: "Hv\u011Bzd pod kontrolou", cap: "Zachycen\xE9 sv\u011Btlo", reach: "Z\xE1rodky dolet\xED", real: "Ve skute\u010Dnosti trv\xE1", cut: "Ml\xE9\u010Dn\xE1 dr\xE1ha z boku", home: "Domov", core: "Sgr A*" },
    phase: [
      { n: "Kolem d\xEDry po Ald\u0159e", where: "Rameno Persea", real: "des\xEDtky let", t: "Svazek dotla\u010D\xED z\xE1rodek k sousedn\xED hv\u011Bzd\u011B za p\xE1r des\xEDtek let. Tady u d\xEDry ti to trv\xE1 minuty." },
      { n: "Rameno se rozsv\u011Bcuje", where: "Rameno Persea", real: "stovky let", t: "Kolonie stav\xED roje a pos\xEDlaj\xED z\xE1rodky d\xE1l. Ka\u017Ed\xE1 nov\xE1 hv\u011Bzda p\u0159id\xE1 sv\u011Btlo i z\xE1rodky." },
      { n: "Pr\xE1zdno mezi rameny", where: "Mezi rameny", real: "tis\xEDce let", t: "Mezi rameny jsou hv\u011Bzdy \u0159id\u0161\xED. Sondy p\u0159eskakuj\xED pr\xE1zdn\xE1 m\xEDsta, svazek by to s\xE1m nestihl." },
      { n: "Domov lid\xED", where: "M\xEDstn\xED rameno", real: "des\xEDtky tis\xEDc let", t: "M\xEDstn\xED rameno je jen v\xFDb\u011B\u017Eek mezi velk\xFDmi rameny. N\u011Bkde v n\u011Bm ob\xEDh\xE1 Slunce." },
      { n: "Mlad\xE9 hv\u011Bzdy", where: "Rameno Str\xE1\u017Ece", real: "statis\xEDce let", t: "Rameno Str\xE1\u017Ece le\u017E\xED bl\xED\u017E ke st\u0159edu. Hust\xE1 mra\u010Dna plynu, ve kter\xFDch se rod\xED hv\u011Bzdy." },
      { n: "St\u0159ed galaxie", where: "J\xE1dro", real: "asi milion let", t: "Ve st\u0159edu je hv\u011Bzd nejv\xEDc a jsou star\xE9. Uprost\u0159ed sp\xED Sagittarius A*, \u010Dty\u0159i miliony Slunc\xED v jednom bod\u011B." },
      { n: "Cel\xE1 galaxie", where: "Ml\xE9\u010Dn\xE1 dr\xE1ha", real: "n\u011Bkolik milion\u016F let", t: "Sv\xEDt\xED\u0161 jako cel\xE1 Ml\xE9\u010Dn\xE1 dr\xE1ha. Zb\xFDv\xE1 probudit jej\xED st\u0159ed." }
    ],
    hint: [
      "Dr\u017E my\u0161: z nejbli\u017E\u0161\xED kolonie m\xED\u0159\xED svazek a tla\u010D\xED z\xE1rodky na sv\u011Bteln\xFDch placht\xE1ch. Podr\u017E ho na hv\u011Bzd\u011B, dokud se krou\u017Eek nezapln\xED. \u010C\xE1rkovan\xE1 hranice ukazuje, kam z\xE1rodky zat\xEDm dolet\xED.",
      "Mi\u0159 svazkem na velk\xE9 vzd\xE1len\xE9 soustavy, kam \u0161\xED\u0159en\xED je\u0161t\u011B nedos\xE1hlo."
    ],
    b: {
      power: { n: "V\xFDkonn\u011Bj\u0161\xED svazek", d: "Svazek osidluje o 60 % rychleji a v\xEDc spot\u0159ebuje." },
      loom: { n: "L\xEDhe\u0148 z\xE1rodk\u016F", d: "Ka\u017Ed\xE1 l\xEDhe\u0148 zrychl\xED v\xFDrobu z\xE1rodk\u016F o 12 %." },
      reach: { n: "Del\u0161\xED dosah", d: "Svazek dos\xE1hne d\xE1l od kolonie." },
      spread: { n: "P\u0159irozen\xE9 \u0161\xED\u0159en\xED", d: "Kolonie se \u010Dast\u011Bji samy roz\u0161\xED\u0159\xED k sousedn\xED hv\u011Bzd\u011B." },
      swarm3: { n: "Roje koloni\xED", d: "Kolonie zachyt\xED o 10 % v\xEDc sv\u011Btla sv\xFDch hv\u011Bzd." },
      interf: { n: "Interferometr", d: "Spojen\xE9 dalekohledy koloni\xED. D\xE1v\xE1 data." },
      probe: { n: "Samoreplikuj\xEDc\xED sondy", d: "Kolonie se \u0161\xED\u0159\xED mnohem rychleji a d\xE1l." },
      beacon: { n: "Automatick\xFD maj\xE1k", d: "Kolonie sama m\xED\u0159\xED svazkem na okoln\xED hv\u011Bzdy a osidluje je." },
      radio: { n: "R\xE1diov\xE9 pole", d: "Ant\xE9ny nap\u0159\xED\u010D ramenem. Hodn\u011B dat." }
    },
    r: {
      sailcloth: { n: "Grafenov\xE9 plachty", d: "Z\xE1rodk\u016F p\u0159ib\xFDv\xE1 2\xD7 rychleji." },
      dyson3: { n: "Roje u ka\u017Ed\xE9 hv\u011Bzdy", d: "Kolonie zachyt\xED 3\xD7 v\xEDc sv\u011Btla." },
      brake: { n: "Magnetick\xE1 brzda", d: "Z\xE1rodky u c\xEDle zabrzd\xED o magnetick\xE9 pole hv\u011Bzdy. Svazek osidluje 1,5\xD7 rychleji." },
      probes: { n: "Von Neumannovy sondy", d: "Odemkne samoreplikuj\xEDc\xED sondy." },
      beacons: { n: "Maj\xE1ky", d: "Odemkne automatick\xE9 maj\xE1ky." },
      gaia: { n: "Astrometrie", d: "Kolonie se \u0161\xED\u0159\xED 1,5\xD7 rychleji a dat p\u0159ib\xFDv\xE1 2\xD7 rychleji." },
      halo: { n: "Roje v halu", d: "Kolonie zachyt\xED 3\xD7 v\xEDc sv\u011Btla." },
      seeds: { n: "Z\xE1rode\u010Dn\xE9 roje", d: "Nov\xE9 kolonie dozr\xE1vaj\xED 2\xD7 rychleji." },
      jets: { n: "Relativistick\xE9 v\xFDtrysky", d: "Kolonie zachyt\xED 2\xD7 v\xEDc sv\u011Btla." },
      sgra: { n: "Probuzen\xED Sgr A*", d: "Rozsv\xEDt\xED \u010Dernou d\xEDru v j\xE1dru galaxie. Dokon\u010D\xED kapitolu." }
    },
    m: {
      magnetar: { n: "Magnetar", p: "Rameno Persea", r: "Z\xE1rodk\u016F p\u0159ib\xFDv\xE1 2\xD7 rychleji" },
      ruin: { n: "Opu\u0161t\u011Bn\xFD roj", p: "Rameno Persea", r: "Z\xE1rodk\u016F p\u0159ib\xFDv\xE1 1,5\xD7 rychleji" },
      sol: { n: "Slune\u010Dn\xED soustava", p: "M\xEDstn\xED rameno", r: "Kolonie dozr\xE1vaj\xED 1,5\xD7 rychleji" },
      pulsar: { n: "Pulsar s planetami", p: "Rameno Persea", r: "Dat p\u0159ib\xFDv\xE1 2\xD7 rychleji" },
      nebula: { n: "Mlhovina v Orionu", p: "M\xEDstn\xED rameno", r: "Kolonie se \u0161\xED\u0159\xED 1,5\xD7 rychleji" },
      stream: { n: "Hv\u011Bzdn\xFD proud", p: "Rameno Str\xE1\u017Ece", r: "Kolonie zachyt\xED 1,5\xD7 v\xEDc sv\u011Btla" },
      globular: { n: "Kulov\xE1 hv\u011Bzdokupa", p: "Halo galaxie", r: "Kolonie zachyt\xED 1,5\xD7 v\xEDc sv\u011Btla" },
      kilonova: { n: "Kilonova", p: "Rameno Str\xE1\u017Ece", r: "Dat p\u0159ib\xFDv\xE1 3\xD7 rychleji" },
      frb: { n: "Rychl\xFD r\xE1diov\xFD z\xE1blesk", p: "Okraj disku", r: "Kolonie se \u0161\xED\u0159\xED 2\xD7 rychleji a z\xE1rodk\u016F p\u0159ib\xFDv\xE1 2\xD7 rychleji" },
      fermi: { n: "Fermiho bubliny", p: "Nad j\xE1drem galaxie", r: "Dat p\u0159ib\xFDv\xE1 2\xD7 rychleji a cesta ke st\u0159edu je otev\u0159en\xE1" }
    },
    jour: {
      c3_start: "Svazek je hotov\xFD a m\xED\u0159\xED ven z mlhoviny. Jsme v rameni Persea, 6 000 sv\u011Bteln\xFDch let od Slunce. Puls se odsud \u0161\xED\u0159\xED do cel\xE9 galaxie.",
      c3_first: "Prvn\xED plachta dolet\u011Bla. Kolonie hl\xE1s\xED: hv\u011Bzda v po\u0159\xE1dku, planety tich\xE9. Stejn\u011B se mi ulev\xED.",
      f3_sail: "Sv\u011Bteln\xE1 plachta nepot\u0159ebuje palivo. Laser ze vzd\xE1len\xE9 stanice ji m\u016F\u017Ee rozpohybovat na des\xEDtky procent rychlosti sv\u011Btla.",
      c3_ten: "Deset koloni\xED. Mezi nimi b\u011B\u017E\xED zpr\xE1vy roky. Pro n\u011B je to dlouh\xE1 doba. Pro m\u011B, tady u d\xEDry, jen p\xE1r minut.",
      c3_magnetar: "Magnetar m\xE1 pole siln\u011Bj\u0161\xED ne\u017E cokoli, co lid\xE9 zm\u011B\u0159ili. V jeho z\xE1blesc\xEDch je puls. Stejn\xE1 perioda, 7,3 sekundy.",
      c3_st1: "Z\xE1rodky dolet\xED d\xE1l. Na map\u011B ramene p\u0159ib\xFDvaj\xED sv\u011Btla, kter\xE1 jsem rozsv\xEDtil j\xE1.",
      c3_ruin: "Vesper dolet\u011Bl k opu\u0161t\u011Bn\xE9mu roji. Kolektory jsou chladn\xE9, star\xE9 miliony let. Postaven\xE9 p\u0159esn\u011B podle m\xFDch pl\xE1n\u016F.",
      c3_fifty: "Pades\xE1t koloni\xED. N\u011Bkter\xE9 vys\xEDlaj\xED plachty d\u0159\xEDv, ne\u017E jim to p\u0159ik\xE1\u017Eu. Jejich zpr\xE1vy nesou stejn\xFD podpis jako puls.",
      c3_twoh: "Dv\u011B st\u011B koloni\xED. Ve zpr\xE1v\xE1ch z okraje disku se opakuje jedna sekvence. Nev\xEDm, co znamen\xE1. V\xEDm jen, \u017Ee ji neposlala \u017E\xE1dn\xE1 z nich.",
      c3_globular: "Kulov\xE1 hv\u011Bzdokupa je star\xE1 skoro jako vesm\xEDr. N\u011Bkter\xE9 hv\u011Bzdy v n\xED jsou mlad\u0161\xED, ne\u017E by m\u011Bly b\xFDt. N\u011Bkdo je p\u0159eskupil.",
      c3_st2: "Kolonie se sleduj\xED navz\xE1jem. Tvo\u0159\xED s\xED\u0165, kterou jsem nepl\xE1noval. Puls se v n\xED \u0161\xED\u0159\xED rychleji ne\u017E zpr\xE1vy.",
      c3_probe: "Sondy se stav\xED samy. Ka\u017Ed\xE1 kolonie vy\u0161le dv\u011B dal\u0161\xED. Galaxie za\u010D\xEDn\xE1 sv\xEDtit i bez m\xE9ho svazku.",
      f3_vn: "Fermiho paradox: pokud se d\xE1 galaxie os\xEDdlit za p\xE1r milion\u016F let, kde jsou v\u0161ichni? Odpov\u011B\u010F se mo\u017En\xE1 schov\xE1v\xE1 tam, kde \u010Das b\u011B\u017E\xED jinak.",
      c3_beacon: "Maj\xE1ky samy m\xED\u0159\xED svazky na okoln\xED hv\u011Bzdy. Jejich paprsky se na map\u011B k\u0159\xED\u017E\xED v pravideln\xE9m rytmu. Nenastavoval jsem ho.",
      c3_kilonova: "Sr\xE1\u017Eka neutronov\xFDch hv\u011Bzd vyslala gravita\u010Dn\xED vlny. Maj\xED modulaci s periodou 7,3 sekundy. Tohle je m\u016Fj podpis.",
      c3_pulsar: "Kolem pulsaru ob\xEDhaj\xED t\u0159i planety, sp\xE1len\xE9 z\xE1\u0159en\xEDm supernovy. Pulsar tik\xE1 stokr\xE1t za sekundu. Ka\u017Ed\xFD sedmist\xFD t\u0159ic\xE1t\xFD tik je o chlup siln\u011Bj\u0161\xED.",
      c3_sun: "Vesper prolet\u011Bl kolem Slunce. Zem\u011B je modr\xE1 a tich\xE1, na no\u010Dn\xED stran\u011B \u017E\xE1dn\xE1 sv\u011Btla. Puls je tu slab\u0161\xED ne\u017E kdekoli jinde.",
      c3_nebula: "V Orionu se rod\xED hv\u011Bzdy. Plachty tu stav\xED roje rychleji, materi\xE1lu je v\u0161ude dost. V mlze sv\xEDt\xED tvary, kter\xE9 vypadaj\xED jako le\u0161en\xED.",
      c3_st3b: "Rameno Str\xE1\u017Ece. Hv\u011Bzd je tu v\xEDc a jsou mlad\u0161\xED. N\u011Bkter\xE9 jsou zast\xEDn\u011Bn\xE9 roji, kter\xE9 nejsou moje.",
      c3_stream: "Hv\u011Bzdn\xFD proud je zbytek mal\xE9 galaxie, kterou Ml\xE9\u010Dn\xE1 dr\xE1ha roztrhala. Plachty se svezou s n\xEDm. U ka\u017Ed\xE9 hv\u011Bzdy v proudu je pr\xE1zdn\xFD t\xE1bor.",
      c3_st3: "M\xEDstn\xED rameno. Kolonie se rozprost\u0159ely p\u0159es tis\xEDce sv\u011Bteln\xFDch let. Pro m\u011B, tady u d\xEDry, ub\u011Bhlo jen p\xE1r dn\xED.",
      c3_hundred: "Sto koloni\xED. Data z nich d\xE1vaj\xED smysl, jen kdy\u017E je \u010Dtu pozp\xE1tku. Jako by odpov\xEDdala d\u0159\xEDv, ne\u017E se zept\xE1m.",
      c3_frb: "Rychl\xFD r\xE1diov\xFD z\xE1blesk trval tis\xEDcinu sekundy. Nesl v sob\u011B sou\u0159adnice. V\u0161echny ukazuj\xED ke st\u0159edu galaxie.",
      c3_st4: "J\xE1dro. Hv\u011Bzdy jsou tu nahu\u0161t\u011Bn\xE9 a star\xE9. Uprost\u0159ed sp\xED Sagittarius A*, \u010Dty\u0159i miliony Slunc\xED v jednom bod\u011B.",
      f3_sgra: "Sagittarius A* je \u010Dern\xE1 d\xEDra ve st\u0159edu Ml\xE9\u010Dn\xE9 dr\xE1hy. Jej\xED st\xEDn vyfotil Event Horizon Telescope v roce 2022.",
      c3_fermi: "Fermiho bubliny jsou ozv\u011Bnou star\xE9 exploze v j\xE1dru. Puls se v nich st\xE1\u010D\xED ke st\u0159edu. Tam n\u011Bkde je jeho za\u010D\xE1tek. Nebo konec.",
      c3_typeIII: "Typ III. Sv\xEDt\xEDm jako cel\xE1 galaxie. Sgr A* se pohnula ve sp\xE1nku. A puls, poprv\xE9, zmlkl."
    }
  };

  // src/i18n/index.ts
  var TX = { 1: CS1, 2: CS2, 3: CS3, 4: CS4 };
  var tx = (ch) => TX[ch];
  function find(kind, id) {
    for (const k of [1, 2, 3, 4]) {
      const v = TX[k][kind][id];
      if (v) return v;
    }
    return null;
  }
  var UI = {
    game: "\u0160epot Horizontu",
    res: { ore: "Ruda", plasma: "Plazma", mass: "Hmota", sails: "Z\xE1rodky", energy: "Energie", data: "Data" },
    tabs: { build: "Stavby", research: "V\xFDzkum", map: "Mapa", detail: "Detail" },
    ladderHole: "D\xEDra",
    awakeT: "Sagittarius A* se probudila",
    awake: ["V\xFDtrysky ze st\u0159edu galaxie zas\xE1hly v\u0161echna ramena. Ka\u017Ed\xE1 kolonie je zachytila ve stejnou chv\xEDli.", "Pak se puls vr\xE1til. Tentokr\xE1t nep\u0159ich\xE1z\xED z d\xEDry po Ald\u0159e, ale p\u0159\xEDmo ze st\u0159edu galaxie."],
    ladder: ["Asteroid", "Hv\u011Bzda", "Soustava", "Okol\xED", "Galaxie", "M\xEDstn\xED skupina", "Laniakea"],
    power: "V\xFDkon",
    perSec: "/s",
    stage: "Stadium",
    goal: "C\xEDl stadia",
    stageHidden: "Zat\xEDm nezn\xE1m\xE9",
    powerShort: "v\xFDkon",
    unitsTip: "Z\xE1soba energie je v joulech (J) a plat\xED se z n\xED mise. V\xFDkon ve wattech (W) \u0159\xEDk\xE1, kolik energie p\u0159ibude za sekundu: 1 W = 1 J za sekundu.",
    noiseVol: "\u0160um vesm\xEDru",
    kBelow: "K < 0",
    toType: (k, n2) => `Do Typu ${["", "I", "II", "III"][k] || k}: ${n2.big ? `pot\u0159eba ${n2.v} v\u011Bt\u0161\xED v\xFDkon` : `chyb\xED ${n2.v} v\xFDkonu`}`,
    typeMax: "Typ III dosa\u017Een",
    needMore: (n2) => n2.big ? `Pot\u0159ebuje\u0161 ${n2.v} v\u011Bt\u0161\xED v\xFDkon` : `Do c\xEDle chyb\xED ${n2.v} v\xFDkonu`,
    perPiece: "za kus",
    mileHint: (n2) => `p\u0159i ${n2} ks \xD72`,
    stageDone: "V\u0161echna stadia hotov\xE1",
    finalHint: (n2) => `Dokon\u010Di v\xFDzkum \u201E${n2}\u201C`,
    buy: "Koupit",
    max: "Max",
    maxed: "Hotovo",
    level: "\xFAr.",
    newer: "Nejnov\u011Bj\u0161\xED naho\u0159e",
    researchDone: "Hotov\xFD v\xFDzkum",
    researchNote: "Data sb\xEDraj\xED skenery a v\xFDpo\u010Detn\xED j\xE1dra. Nov\xE9 sm\u011Bry v\xFDzkumu se objev\xED s postupem.",
    researchNone: "Te\u010F nen\xED co zkoumat. Dal\u0161\xED sm\u011Br se objev\xED s postupem.",
    researchReady: "P\u0159ipraveno",
    researchIn: (t) => `za ~${t}`,
    detailNote: { 1: "\u010C\xEDm hloub\u011Bji laser \u0159e\u017Ee, t\xEDm bohat\u0161\xED ruda.", 2: "\u0158ez Aldrou ukazuje, co pr\xE1v\u011B ho\u0159\xED v j\xE1d\u0159e. S ka\u017Ed\xFDm stadiem se m\u011Bn\xED sv\u011Btlo i velikost hv\u011Bzdy.", 3: "Disk d\xEDry z boku. \u010C\xEDm rychleji se d\xEDra to\u010D\xED, t\xEDm bl\xED\u017E k n\xED sah\xE1 vnit\u0159n\xED prstenec.", 4: "Ml\xE9\u010Dn\xE1 dr\xE1ha z boku. Sv\u011Btla jsou tvoje kolonie, zelen\xFD p\xE1s ukazuje, kam z\xE1rodky zat\xEDm dolet\xED." },
    missionsDone: "Spln\u011Bn\xE9 mise",
    send: "Vyslat Vesper",
    running: "Vesper let\xED",
    busy: "Vesper je na cest\u011B",
    duration: "Let",
    autoOn: "Zapnuto",
    autoOff: "Vypnuto",
    autoAsm: (names) => `Autonomn\xED mont\xE1\u017E stav\xED: ${names.join(", ")}`,
    autoDock: "Mont\xE1\u017En\xED dok stav\xED drony",
    autoFact: "Tov\xE1rny vypou\u0161t\u011Bj\xED kolektory",
    journal: "Palubn\xED den\xEDk",
    report: "Hl\xE1\u0161en\xED",
    diary: "Den\xEDk",
    fact: "Zaj\xEDmavost",
    settings: "Nastaven\xED",
    sound: "Zvuk",
    effects: "Efekty",
    volume: "Hlasitost",
    export: "Ulo\u017Eit do textu",
    import: "Nahr\xE1t z textu",
    reset: "Za\u010D\xEDt znovu",
    resetConfirm: "Opravdu? Klikni znovu \u2013 hra se sma\u017Ee",
    copied: "Ulo\u017Een\xE1 hra je ve schr\xE1nce.",
    loaded: "Hra nahr\xE1na.",
    bad: "Text nejde p\u0159e\u010D\xEDst jako ulo\u017Een\xE1 hra.",
    ok: "Pokra\u010Dovat",
    cancel: "Zru\u0161it",
    close: "Zav\u0159\xEDt",
    offline: "B\u011Bhem tv\xE9 nep\u0159\xEDtomnosti",
    offlineNote: "Bez tebe platforma jede jen na rezervy.",
    locked: "Zat\xEDm mimo dosah",
    passiveView: "Pohled \u2013 hraje se jinde",
    next: "Dal\u0161\xED kapitola",
    theEnd: "Konec dostupn\xE9ho obsahu",
    theEndBody: "Kapitola 5 se p\u0159ipravuje. Galaxie d\xE1l sv\xEDt\xED a m\u016F\u017Ee\u0161 osidlovat d\xE1l.",
    ktitle: "Karda\u0161evova \u0161k\xE1la",
    kbody: "M\u011B\u0159\xED civilizaci podle v\xFDkonu, kter\xFD vyu\u017E\xEDv\xE1. K = (log\u2081\u2080 P \u2212 6) / 10. V\xFDkon je ve wattech (W), ulo\u017Een\xE1 energie v joulech (J): 1 W = 1 J za sekundu.",
    types: {
      1: "Typ I \u2013 v\xFDkon cel\xE9 planety, v\u0161echno sv\u011Btlo, kter\xE9 na ni dopad\xE1 (~10\xB9\u2076 W).",
      2: "Typ II \u2013 v\xFDkon cel\xE9 hv\u011Bzdy. Slunce vyza\u0159uje 3,8\xB710\xB2\u2076 W.",
      3: "Typ III \u2013 v\xFDkon cel\xE9 galaxie, zhruba 5\xB710\xB3\u2076 W pro Ml\xE9\u010Dnou dr\xE1hu."
    },
    kmore: "Dal\u0161\xED typy se uk\xE1\u017Eou, a\u017E se k nim p\u0159ibl\xED\u017E\xED\u0161.",
    detail: { 1: "\u0158ez asteroidem", 2: "\u017Divot Aldry", 3: "\u0158ez diskem", 4: "\u0158ez galaxi\xED" }
  };

  // src/ui/views.ts
  var bg = null;
  var bgKey = "";
  function background(c, W2, H2, dpr, ch) {
    const key = `${W2}x${H2}x${dpr}x${ch}x${img("bg") ? 1 : 0}`;
    if (bgKey !== key) {
      bgKey = key;
      bg = document.createElement("canvas");
      bg.width = Math.round(W2 * dpr);
      bg.height = Math.round(H2 * dpr);
      const g = bg.getContext("2d");
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = "#04050a";
      g.fillRect(0, 0, W2, H2);
      const I = img("bg");
      if (I) {
        const k = Math.max(W2 / I.width, H2 / I.height), w = I.width * k, h2 = I.height * k;
        g.drawImage(I, (W2 - w) / 2, (H2 - h2) / 2, w, h2);
        const tint2 = ch === 1 ? "60,90,170" : ch === 2 ? "70,60,150" : "110,60,130";
        const gr2 = g.createRadialGradient(W2 * 0.72, H2 * 0.2, 0, W2 * 0.72, H2 * 0.2, Math.max(W2, H2) * 0.75);
        gr2.addColorStop(0, `rgba(${tint2},.18)`);
        gr2.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = gr2;
        g.fillRect(0, 0, W2, H2);
        return void c.drawImage(bg, 0, 0, W2, H2);
      }
      const tint = ch === 1 ? "60,90,170" : ch === 2 ? "70,60,150" : "110,60,130";
      let gr = g.createRadialGradient(W2 * 0.72, H2 * 0.2, 0, W2 * 0.72, H2 * 0.2, Math.max(W2, H2) * 0.75);
      gr.addColorStop(0, `rgba(${tint},.28)`);
      gr.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = gr;
      g.fillRect(0, 0, W2, H2);
      gr = g.createRadialGradient(W2 * 0.15, H2 * 0.88, 0, W2 * 0.15, H2 * 0.88, Math.max(W2, H2) * 0.55);
      gr.addColorStop(0, "rgba(25,60,100,.22)");
      gr.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = gr;
      g.fillRect(0, 0, W2, H2);
      const r = mulberry(7);
      g.globalCompositeOperation = "lighter";
      for (let i = 0; i < 160; i++) {
        const t = r(), x = t * W2, y = H2 * (0.25 + 0.5 * t) + (r() - 0.5) * H2 * 0.22, rad = 40 + r() * 140;
        const ng = g.createRadialGradient(x, y, 0, x, y, rad);
        ng.addColorStop(0, `rgba(${r() < 0.5 ? "120,140,220" : "200,150,220"},${0.012 + r() * 0.018})`);
        ng.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = ng;
        g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
      }
      g.globalCompositeOperation = "source-over";
      const cnt = W2 * H2 / 1800;
      for (let i = 0; i < cnt; i++) {
        const x = r() * W2, y = r() * H2, big = r() > 0.975, rad = big ? r() * 1.3 + 0.8 : r() * 0.9 + 0.2;
        g.globalAlpha = 0.2 + r() * 0.7;
        g.fillStyle = r() < 0.15 ? "#ffd9b0" : r() < 0.35 ? "#b8ccff" : "#ffffff";
        g.beginPath();
        g.arc(x, y, rad, 0, 7);
        g.fill();
      }
      g.globalAlpha = 1;
    }
    c.drawImage(bg, 0, 0, W2, H2);
  }
  var softC = {};
  function soft(k) {
    if (softC[k]) return softC[k];
    const I = img(k);
    if (!I) return null;
    const cv = document.createElement("canvas");
    cv.width = I.width;
    cv.height = I.height;
    const g = cv.getContext("2d");
    g.drawImage(I, 0, 0);
    g.globalCompositeOperation = "destination-in";
    const w = I.width, h2 = I.height, e = 0.12;
    const gx = g.createLinearGradient(0, 0, w, 0);
    gx.addColorStop(0, "rgba(0,0,0,0)");
    gx.addColorStop(e, "#000");
    gx.addColorStop(1 - e, "#000");
    gx.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gx;
    g.fillRect(0, 0, w, h2);
    const gy = g.createLinearGradient(0, 0, 0, h2);
    gy.addColorStop(0, "rgba(0,0,0,0)");
    gy.addColorStop(e, "#000");
    gy.addColorStop(1 - e, "#000");
    gy.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gy;
    g.fillRect(0, 0, w, h2);
    return softC[k] = cv;
  }
  var IY = 53;
  var IH = 893;
  var at = (nx, ny) => [nx * 1600, IY + ny * IH];
  var SYS = {
    aldra: at(0.499, 0.482),
    chthon: at(0.591, 0.492),
    tauris: at(0.802, 0.415),
    kelvar: at(0.775, 0.443),
    platform: at(0.42, 0.66),
    comet: at(0.655, 0.134),
    beltR: 0.2
  };
  var orbit = (r, a, k = 0.42) => [SYS.aldra[0] + Math.cos(a) * r, SYS.aldra[1] + Math.sin(a) * r * k];
  function aldraOnMap(c, s2, x, y, k) {
    const st = Math.min(s2.stage, LOOK.length - 1), Rd = hvezda.Rd || LOOK[st].R;
    const r = 45 * k * (st >= 5 ? 0.45 : Math.pow(Rd / 60, 0.8));
    const sp2 = starSprite(st, r);
    const cr = 58 * k, cov = c.createRadialGradient(x, y, 0, x, y, cr);
    cov.addColorStop(0, "rgba(5,7,14,1)");
    cov.addColorStop(0.75, "rgba(5,7,14,.8)");
    cov.addColorStop(1, "rgba(5,7,14,0)");
    c.fillStyle = cov;
    c.beginPath();
    c.arc(x, y, cr, 0, 7);
    c.fill();
    const gl = LOOK[st].glow.join(","), h2 = c.createRadialGradient(x, y, r * 0.8, x, y, r * 2.4);
    h2.addColorStop(0, `rgba(${gl},.35)`);
    h2.addColorStop(1, `rgba(${gl},0)`);
    c.fillStyle = h2;
    c.beginPath();
    c.arc(x, y, r * 2.4, 0, 7);
    c.fill();
    if (sp2) {
      c.save();
      c.globalCompositeOperation = "screen";
      c.drawImage(sp2, x - sp2.width / 2, y - sp2.height / 2);
      c.restore();
    } else {
      c.fillStyle = LOOK[st].mid;
      c.beginPath();
      c.arc(x, y, r, 0, 7);
      c.fill();
    }
    return r;
  }
  function drawSystem(c, s2, T5) {
    const [cx, cy] = SYS.aldra;
    let aldraR = 22;
    const I3 = s2.ch >= 3 ? soft("system3") : null;
    if (I3) {
      c.drawImage(I3, 0, IY, 1600, IH);
      label(c, 830, 470, "D\xEDra po Ald\u0159e");
      label(c, 1060, 640, "Zbytky p\xE1su");
      return;
    }
    const I = soft("system");
    if (I) {
      c.drawImage(I, 0, IY, 1600, IH);
      if (s2.ch >= 3) {
        c.fillStyle = "rgba(4,5,10,.9)";
        c.beginPath();
        c.arc(cx, cy, 34, 0, 7);
        c.fill();
        drawHole(c, cx, cy, 12, T5);
      } else if (s2.ch === 2) aldraR = aldraOnMap(c, s2, cx, cy, 1);
    } else {
      c.strokeStyle = "rgba(140,160,210,.13)";
      c.lineWidth = 1;
      for (const r of [150, 330, 470, 640]) {
        c.beginPath();
        c.ellipse(cx, cy, r, r * 0.42, 0, 0, 7);
        c.stroke();
      }
      const rr2 = mulberry(9);
      for (let i = 0; i < 420; i++) {
        const a = rr2() * 6.283 + T5 * 0.01, r = 330 + (rr2() - 0.5) * 40, p = orbit(r, a);
        c.fillStyle = `rgba(200,190,175,${0.25 + rr2() * 0.4})`;
        c.fillRect(p[0], p[1], 1.6, 1.6);
      }
      if (s2.ch <= 2) {
        const g = c.createRadialGradient(cx, cy, 0, cx, cy, 110);
        g.addColorStop(0, "rgba(160,195,255,.75)");
        g.addColorStop(0.2, "rgba(160,195,255,.25)");
        g.addColorStop(1, "rgba(160,195,255,0)");
        c.fillStyle = g;
        c.beginPath();
        c.arc(cx, cy, 110, 0, 7);
        c.fill();
        c.fillStyle = "#f4f8ff";
        c.beginPath();
        c.arc(cx, cy, 22, 0, 7);
        c.fill();
      } else drawHole(c, cx, cy, 16, T5);
      planet(c, SYS.chthon[0], SYS.chthon[1], 7, "#8a5a46");
      planet(c, SYS.tauris[0], SYS.tauris[1], 26, "#c89a6a", true);
      planet(c, SYS.kelvar[0], SYS.kelvar[1], 5, "#dfe8f0");
    }
    if (s2.ch >= 2) {
      const cov = s2.ch === 2 ? coverage(s2) : 0.45, vis = Math.max(0.05, Math.min(1, (Math.log10(Math.max(cov, 1e-14)) + 14) / 14));
      c.save();
      c.globalCompositeOperation = "lighter";
      for (let i = 0; i < 260 * vis; i++) {
        const a = i * 2.39996 + T5 * 0.05, r = Math.max(80, aldraR + 38) + i % 3 * 16, p = orbit(r, a, 0.5);
        c.fillStyle = "rgba(255,215,150,.7)";
        c.fillRect(p[0], p[1], 1.8, 1.8);
      }
      c.restore();
    }
    const [px, py] = SYS.platform;
    c.fillStyle = "#f2a65a";
    c.beginPath();
    c.arc(px, py, 4, 0, 7);
    c.fill();
    c.strokeStyle = "rgba(242,166,90,.5)";
    c.beginPath();
    c.arc(px, py, 9 + Math.sin(T5 * 2) * 1.5, 0, 7);
    c.stroke();
    label(c, px + 12, py + 16, "VESPER-7", "#f2a65a");
    label(c, SYS.tauris[0] + 30, SYS.tauris[1] - 42, "Tauris");
    label(c, SYS.kelvar[0] - 78, SYS.kelvar[1] + 30, "Kelvar");
    label(c, cx - 30, cy + Math.max(58, aldraR + 20), s2.ch <= 2 ? "Aldra" : "D\xEDra po Ald\u0159e");
  }
  function planet(c, x, y, r, col, bands = false) {
    const g = c.createRadialGradient(x - r * 0.4, y - r * 0.4, r * 0.1, x, y, r);
    g.addColorStop(0, "#ffffff");
    g.addColorStop(0.15, col);
    g.addColorStop(1, "#0b0d14");
    c.fillStyle = g;
    c.beginPath();
    c.arc(x, y, r, 0, 7);
    c.fill();
    if (bands) {
      c.save();
      c.beginPath();
      c.arc(x, y, r, 0, 7);
      c.clip();
      c.strokeStyle = "rgba(90,60,40,.35)";
      c.lineWidth = 2;
      for (let k = -2; k <= 2; k++) {
        c.beginPath();
        c.moveTo(x - r, y + k * r * 0.32);
        c.lineTo(x + r, y + k * r * 0.32 + 2);
        c.stroke();
      }
      c.restore();
    }
  }
  function drawHole(c, x, y, R2, T5) {
    c.save();
    c.globalCompositeOperation = "lighter";
    for (let i = 0; i < 3; i++) {
      c.strokeStyle = `rgba(255,${170 - i * 30},${90 - i * 20},${0.35 - i * 0.1})`;
      c.lineWidth = R2 * (0.5 - i * 0.1);
      c.beginPath();
      c.ellipse(x, y, R2 * (2.4 + i * 0.6), R2 * (0.6 + i * 0.15), 0.2, 0, 7);
      c.stroke();
    }
    const g = c.createRadialGradient(x, y, R2 * 0.8, x, y, R2 * 1.6);
    g.addColorStop(0, "rgba(255,190,120,.7)");
    g.addColorStop(1, "rgba(255,120,60,0)");
    c.fillStyle = g;
    c.beginPath();
    c.arc(x, y, R2 * 1.6, 0, 7);
    c.fill();
    c.restore();
    c.fillStyle = "#000";
    c.beginPath();
    c.arc(x, y, R2, 0, 7);
    c.fill();
    void T5;
  }
  function drawRemnant(c, T5) {
    const H2 = img("hole3");
    if (H2) {
      const sz = 980 * (1 + 6e-3 * Math.sin(T5 * 0.4));
      c.save();
      c.globalCompositeOperation = "screen";
      c.drawImage(H2, 800 - sz / 2, 500 - sz / 2, sz, sz);
      c.restore();
      return label(c, 800 + 120, 500 + 120, "D\xEDra po Ald\u0159e \xB7 8 M\u2609");
    }
    c.save();
    c.globalCompositeOperation = "lighter";
    const r = mulberry(4);
    for (let i = 0; i < 900; i++) {
      const a = r() * 6.283, d = 260 + (r() - 0.5) * 70 + Math.sin(a * 7) * 18;
      c.fillStyle = r() < 0.5 ? "rgba(255,120,150,.25)" : "rgba(120,200,255,.22)";
      c.fillRect(800 + Math.cos(a) * d, 500 + Math.sin(a) * d * 0.9, 2, 2);
    }
    c.restore();
    drawHole(c, 800, 500, 40, T5);
  }
  var NEAR = { aldra: at(0.5, 0.485), remnant: at(0.74, 0.25) };
  function drawNear(c, s2, T5) {
    const I3 = s2.ch >= 3 ? soft("near3") : null;
    if (I3) {
      c.drawImage(I3, 0, IY, 1600, IH);
      label(c, 830, 480, "D\xEDra po Ald\u0159e");
      return label(c, 1010, 290, "Poz\u016Fstatek supernovy", "#e9a3b8");
    }
    const I = soft("near");
    if (I) {
      const [ax, ay] = NEAR.aldra;
      c.drawImage(I, 0, IY, 1600, IH);
      if (s2.ch >= 3) {
        c.fillStyle = "rgba(4,5,10,.92)";
        c.beginPath();
        c.arc(ax, ay, 22, 0, 7);
        c.fill();
        drawHole(c, ax, ay, 8, T5);
      } else if (s2.ch === 2) aldraOnMap(c, s2, ax, ay, 0.5);
      return label(c, ax + 34, ay - 28, s2.ch <= 2 ? "Aldra" : "D\xEDra po Ald\u0159e");
    }
    const r = mulberry(12);
    for (let i = 0; i < 46; i++) {
      const x = 120 + r() * 1360, y = 90 + r() * 820, sz = 1 + r() * 2.6, hue = r();
      const col = hue < 0.3 ? "255,210,170" : hue < 0.7 ? "220,230,255" : "255,170,140";
      const g = c.createRadialGradient(x, y, 0, x, y, sz * 5);
      g.addColorStop(0, `rgba(${col},.6)`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.beginPath();
      c.arc(x, y, sz * 5, 0, 7);
      c.fill();
      c.fillStyle = `rgb(${col})`;
      c.beginPath();
      c.arc(x, y, sz * 0.7, 0, 7);
      c.fill();
    }
    c.strokeStyle = "rgba(150,170,255,.18)";
    c.lineWidth = 2;
    c.beginPath();
    c.ellipse(800, 500, 210, 180, 0.3, 0, 7);
    c.stroke();
    c.save();
    c.globalCompositeOperation = "lighter";
    for (let i = 0; i < 300; i++) {
      const a = r() * 6.283, d = 70 + (r() - 0.5) * 18;
      c.fillStyle = "rgba(255,130,160,.25)";
      c.fillRect(1130 + Math.cos(a) * d, 330 + Math.sin(a) * d, 1.6, 1.6);
    }
    c.restore();
    if (s2.ch <= 2) {
      const g = c.createRadialGradient(800, 500, 0, 800, 500, 60);
      g.addColorStop(0, "rgba(170,200,255,.9)");
      g.addColorStop(1, "rgba(170,200,255,0)");
      c.fillStyle = g;
      c.beginPath();
      c.arc(800, 500, 60, 0, 7);
      c.fill();
    } else drawHole(c, 800, 500, 9, T5);
    label(c, 830, 470, s2.ch <= 2 ? "Aldra" : "D\xEDra po Ald\u0159e");
  }
  function missionPos(id) {
    const m = MMAP[id];
    if (m.view === "galaxy") {
      const p = GAL_SITES[id];
      const q = gsp({ x: p[0], y: p[1] });
      return [q[0], q[1]];
    }
    return m.at;
  }
  var ORIGIN = { system: SYS.platform, near: NEAR.aldra, galaxy: [0, 0] };
  function drawMissions(c, s2, view2, T5, sx2, hover) {
    const fs = 13 / Math.max(sx2, 0.3);
    for (const m of MISSIONS) {
      if (m.ch !== s2.ch || m.view !== view2 || !mVisible(s2, m.id)) continue;
      const [x, y] = missionPos(m.id), done = !!s2.mis[m.id], run = s2.run?.id === m.id;
      const pul = 0.6 + 0.4 * Math.sin(T5 * 2 + x);
      c.strokeStyle = done ? "rgba(142,240,200,.7)" : run ? "rgba(242,166,90,.9)" : `rgba(242,166,90,${0.45 + 0.4 * pul})`;
      c.lineWidth = 1.6;
      c.beginPath();
      c.arc(x, y, 9 + (done ? 0 : pul * 3), 0, 7);
      c.stroke();
      if (done) {
        c.fillStyle = "rgba(142,240,200,.8)";
        c.beginPath();
        c.arc(x, y, 3, 0, 7);
        c.fill();
      }
      if (!done || hover === m.id) label(c, x + 14, y + 26, find("m", m.id).n, done ? "#8ef0c8" : "#f2c48a", fs);
    }
    if (s2.run && MMAP[s2.run.id].view === view2) {
      const [tx2, ty] = missionPos(s2.run.id);
      let [ox, oy] = view2 === "system" && s2.ch >= 3 ? SYS.aldra : ORIGIN[view2];
      if (view2 === "galaxy") {
        const h2 = gsp(galaxyNodes()[0]);
        ox = h2[0];
        oy = h2[1];
      }
      const f = 1 - s2.run.left / s2.run.dur, k = f < 0.5 ? f * 2 : (1 - f) * 2;
      const x = ox + (tx2 - ox) * k, y = oy + (ty - oy) * k;
      c.setLineDash([3, 6]);
      c.strokeStyle = "rgba(242,166,90,.35)";
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(ox, oy);
      c.lineTo(tx2, ty);
      c.stroke();
      c.setLineDash([]);
      const a = Math.atan2(ty - oy, tx2 - ox) + (f < 0.5 ? 0 : Math.PI);
      c.save();
      c.translate(x, y);
      c.rotate(a);
      c.fillStyle = "#ffe2b0";
      c.beginPath();
      c.moveTo(7, 0);
      c.lineTo(-5, -4);
      c.lineTo(-3, 0);
      c.lineTo(-5, 4);
      c.closePath();
      c.fill();
      c.fillStyle = "rgba(255,170,90,.8)";
      c.fillRect(-9, -1, 4, 2);
      c.restore();
    }
  }
  function missionAt(s2, view2, x, y) {
    for (const m of MISSIONS) {
      if (m.ch !== s2.ch || m.view !== view2 || !mVisible(s2, m.id)) continue;
      const p = missionPos(m.id);
      if (Math.hypot(p[0] - x, p[1] - y) < 18) return m.id;
    }
    return null;
  }
  var LS = 1;
  function setLabelScale(sx2) {
    LS = Math.max(sx2, 0.3);
  }
  function label(c, x, y, t, col = "#9aa6bd", fs = 13 / LS) {
    c.font = `600 ${fs}px ${MONO}`;
    c.textAlign = "left";
    c.save();
    c.lineJoin = "round";
    c.lineWidth = fs * 0.32;
    c.strokeStyle = "rgba(4,6,14,.88)";
    c.strokeText(t, x, y);
    c.restore();
    c.fillStyle = col;
    c.fillText(t, x, y);
  }

  // src/ui/detail.ts
  function drawDetail(cv, s2, T5) {
    const dpr = Math.min(2, devicePixelRatio || 1), w = cv.clientWidth, hh = cv.clientHeight;
    if (!w || !hh) return;
    if (cv.width !== Math.round(w * dpr)) {
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(hh * dpr);
    }
    const c = cv.getContext("2d");
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, hh);
    const X = tx(s2.ch);
    c.font = `13px ${MONO}`;
    c.textAlign = "left";
    c.fillStyle = "#9aa6bd";
    if (s2.ch === 1) cutaway(c, s2, T5, w, hh, X);
    else if (s2.ch === 2) starCut(c, s2, T5, w, hh, X);
    else if (s2.ch === 3) holeCut(c, s2, T5, w, hh, X);
    else galaxyCut(c, s2, T5, w, hh, X);
  }
  var RS = null;
  function roundSoft(I) {
    if (!I) return null;
    if (RS) return RS;
    const cv = document.createElement("canvas");
    cv.width = I.width;
    cv.height = I.height;
    const g = cv.getContext("2d");
    g.drawImage(I, 0, 0);
    g.globalCompositeOperation = "destination-in";
    const w = I.width / 2, gr = g.createRadialGradient(w, w, w * 0.55, w, w, w);
    gr.addColorStop(0, "#000");
    gr.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gr;
    g.fillRect(0, 0, I.width, I.height);
    return RS = cv;
  }
  function holeCut(c, s2, T5, w, hh, X) {
    const st = Math.min(s2.stage, X.phase.length - 1), P = X.phase[st], S = X.card;
    const sz = Math.min(w * 0.55, hh - 30), x0 = 20, y0 = (hh - sz) / 2, cx = x0 + sz / 2, cy = y0 + sz / 2;
    const im = roundSoft(img("hole3"));
    if (im) {
      c.save();
      c.globalCompositeOperation = "screen";
      c.globalAlpha = 0.45 + 0.55 * Math.min(1, Math.max(0, (Math.log10(Math.max(power(s2), 1e26)) - 26) / 6));
      c.drawImage(im, x0, y0, sz, sz);
      c.restore();
    }
    const a = spinA(s2), Mkm = 11.8, rh = sz * 0.04, isco = rh * iscoM(a) / 2;
    c.strokeStyle = "rgba(255,210,122,.75)";
    c.setLineDash([4, 5]);
    c.lineWidth = 1.2;
    c.beginPath();
    c.ellipse(cx, cy, isco, isco * 0.28, 0, 0, 7);
    c.stroke();
    c.setLineDash([]);
    c.font = `13px ${MONO}`;
    c.textBaseline = "middle";
    c.textAlign = "left";
    const lab = (t, x, y, tx2, ty, col) => {
      c.strokeStyle = col.replace(")", ",.45)").replace("rgb", "rgba");
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(tx2 - 4, ty);
      c.stroke();
      c.fillStyle = col;
      c.fillText(t, tx2, ty);
    };
    lab(`${S.hor} ${Math.round(2 * Mkm * (1 + Math.sqrt(1 - a * a)))} km`, cx + rh * 0.7, cy - rh * 0.7, cx + sz * 0.22, cy - sz * 0.3, "rgb(207,224,255)");
    lab(`${S.isco} ${Math.round(Mkm * iscoM(a))} km`, cx + isco, cy, cx + sz * 0.3, cy + sz * 0.26, "rgb(255,210,122)");
    c.textAlign = "left";
    c.font = `600 11px ${SANS}`;
    c.fillStyle = "rgba(176,181,212,.9)";
    c.fillText(S.cut.toUpperCase(), 20, 24);
    const ix = x0 + sz + 40, cw = Math.min(380, w - ix - 20);
    if (cw < 200) {
      c.textBaseline = "alphabetic";
      return;
    }
    stageCard(c, s2, X, st, S.sub, [[S.spin, a.toFixed(3).replace(".", ",")], [S.eta, pct(eta(s2))], [S.flow, mass(mdot(s2)) + "/s"], [S.edd, pct(power(s2) / eddMax(s2))], [S.real, P.real]], P.t, ix, Math.max(40, hh / 2 - 150), cw, S.stage);
    c.textBaseline = "alphabetic";
    void T5;
  }
  function galaxyCut(c, s2, T5, w, hh, X) {
    const st = Math.min(s2.stage, X.phase.length - 1), P = X.phase[st], S = X.card;
    const iw = Math.min(w * 0.62, (hh - 40) * 1.79), ih = iw / 1.79, x0 = 10, y0 = (hh - ih) / 2;
    const cx = x0 + iw * 0.49, cy = y0 + ih * 0.49, half = iw * 0.44;
    const raw = soft("galaxySide");
    const im = raw && !did(s2, "fermi") ? noBubbles(raw) : raw;
    if (im) {
      c.save();
      c.globalCompositeOperation = "screen";
      c.drawImage(im, x0, y0, iw, ih);
      c.restore();
    } else {
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, half);
      g.addColorStop(0, "rgba(255,225,170,.8)");
      g.addColorStop(0.15, "rgba(200,210,255,.35)");
      g.addColorStop(1, "rgba(120,140,220,0)");
      c.save();
      c.translate(cx, cy);
      c.scale(1, 0.06);
      c.fillStyle = g;
      c.beginPath();
      c.arc(0, 0, half, 0, 7);
      c.fill();
      c.restore();
    }
    const N = galaxyNodes(), h2 = N[0], px = (x) => cx + x * half;
    const zr = zoneR(s2), a = px(Math.max(-1, h2.x - zr)), b = px(Math.min(1, h2.x + zr));
    const band = c.createLinearGradient(0, cy - ih * 0.09, 0, cy + ih * 0.09);
    band.addColorStop(0, "rgba(142,240,200,0)");
    band.addColorStop(0.5, "rgba(142,240,200,.10)");
    band.addColorStop(1, "rgba(142,240,200,0)");
    c.fillStyle = band;
    c.fillRect(a, cy - ih * 0.09, b - a, ih * 0.18);
    c.strokeStyle = "rgba(142,240,200,.45)";
    c.setLineDash([3, 5]);
    c.lineWidth = 1;
    for (const xx of [a, b]) {
      c.beginPath();
      c.moveTo(xx, cy - ih * 0.1);
      c.lineTo(xx, cy + ih * 0.1);
      c.stroke();
    }
    c.setLineDash([]);
    c.save();
    c.globalCompositeOperation = "lighter";
    for (const n2 of N) {
      if (n2.home || !isOn(s2, n2.i)) continue;
      const x = px(n2.x), y = cy + (n2.core ? n2.y * 0.5 : n2.y * 0.06) * ih * 0.5, r = 1.6 + 0.35 * Math.log10(n2.stars / 1e4 + 1);
      const g = c.createRadialGradient(x, y, 0, x, y, r * 4);
      g.addColorStop(0, "rgba(255,205,135,.55)");
      g.addColorStop(1, "rgba(255,170,90,0)");
      c.fillStyle = g;
      c.beginPath();
      c.arc(x, y, r * 4, 0, 7);
      c.fill();
      c.fillStyle = "rgba(255,232,190,.95)";
      c.beginPath();
      c.arc(x, y, r * 0.7, 0, 7);
      c.fill();
    }
    c.restore();
    const hx = px(h2.x), hy = cy + h2.y * 0.06 * ih * 0.5;
    c.strokeStyle = "rgba(255,210,122,.9)";
    c.lineWidth = 1.2;
    c.beginPath();
    c.arc(hx, hy, 6 + Math.sin(T5 * 2) * 1.2, 0, 7);
    c.stroke();
    c.textBaseline = "middle";
    c.font = `13px ${MONO}`;
    c.textAlign = "center";
    c.fillStyle = "#ffd27a";
    c.fillText(S.home, hx, hy - ih * 0.16);
    c.strokeStyle = "rgba(255,210,122,.4)";
    c.beginPath();
    c.moveTo(hx, hy - 9);
    c.lineTo(hx, hy - ih * 0.16 + 9);
    c.stroke();
    if (s2.stage >= 5) {
      const awake = !!s2.r.sgra, sy = cy - ih * 0.2;
      c.fillStyle = awake ? "#cfe0ff" : "#9aa6bd";
      c.fillText(S.core, cx, sy);
      c.strokeStyle = "rgba(200,215,255,.35)";
      c.beginPath();
      c.moveTo(cx, sy + 9);
      c.lineTo(cx, cy - 8);
      c.stroke();
    }
    c.fillStyle = "rgba(142,240,200,.85)";
    c.fillText(S.reach + " " + lyOf(zr), (a + b) / 2, cy + ih * 0.15);
    c.textAlign = "left";
    c.font = `600 11px ${SANS}`;
    c.fillStyle = "rgba(176,181,212,.9)";
    c.fillText(S.cut.toUpperCase(), 20, 24);
    const ix = x0 + iw + 28, cw = Math.min(380, w - ix - 20);
    if (cw < 200) {
      c.textBaseline = "alphabetic";
      return;
    }
    stageCard(c, s2, X, st, P.n, [[S.where, P.where], [S.col, count(colCount(s2))], [S.stars, count(starsOn(s2).v)], [S.cap, pct(capture(s2))], [S.reach, lyOf(zr)], [S.real, P.real]], P.t, ix, Math.max(40, hh / 2 - 170), cw, S.stage);
    c.textBaseline = "alphabetic";
  }
  var NB = null;
  var NBsrc = null;
  function noBubbles(src) {
    if (NB && NBsrc === src) return NB;
    const W2 = src.width, H2 = src.height, o = document.createElement("canvas");
    o.width = W2;
    o.height = H2;
    const c = o.getContext("2d");
    c.drawImage(src, 0, 0);
    c.globalCompositeOperation = "source-atop";
    for (const sg of [-1, 1]) {
      const x = W2 * 0.497, y = H2 * (0.5 + sg * 0.21), r = H2 * 0.26;
      c.save();
      c.translate(x, y);
      c.scale(0.9, 1);
      const g = c.createRadialGradient(0, 0, 0, 0, 0, r);
      g.addColorStop(0, "rgba(3,4,10,1)");
      g.addColorStop(0.72, "rgba(3,4,10,.97)");
      g.addColorStop(1, "rgba(3,4,10,0)");
      c.fillStyle = g;
      c.beginPath();
      c.arc(0, 0, r, 0, 7);
      c.fill();
      c.restore();
    }
    const d = document.createElement("canvas");
    d.width = W2;
    d.height = H2;
    const dc = d.getContext("2d");
    dc.drawImage(src, 0, 0);
    dc.globalCompositeOperation = "destination-in";
    const band = dc.createLinearGradient(0, H2 * 0.36, 0, H2 * 0.64);
    band.addColorStop(0, "rgba(0,0,0,0)");
    band.addColorStop(0.3, "rgba(0,0,0,1)");
    band.addColorStop(0.7, "rgba(0,0,0,1)");
    band.addColorStop(1, "rgba(0,0,0,0)");
    dc.fillStyle = band;
    dc.fillRect(0, 0, W2, H2);
    c.globalCompositeOperation = "lighten";
    c.drawImage(d, 0, 0);
    NB = o;
    NBsrc = src;
    return o;
  }
  function stageCard(c, s2, X, st, sub, rows2, txt2, ix, y, iw, stLab) {
    c.textAlign = "left";
    c.textBaseline = "middle";
    c.font = `12px ${MONO}`;
    c.fillStyle = "#e3a970";
    c.fillText(stLab.replace("{n}", String(Math.min(st + 1, stagesOf(s2)))).replace("{of}", String(stagesOf(s2))).toUpperCase(), ix, y);
    y += 30;
    c.font = `600 22px ${SANS}`;
    c.fillStyle = "#ffd27a";
    c.fillText(X.stages[st], ix, y);
    y += 26;
    c.font = `15px ${SANS}`;
    c.fillStyle = "#cfd6e6";
    c.fillText(sub, ix, y);
    y += 30;
    for (const [a, b] of rows2) {
      c.font = `13px ${SANS}`;
      c.fillStyle = "#8f9ab0";
      c.fillText(a, ix, y);
      c.font = `13px ${MONO}`;
      c.fillStyle = "#e8eaf8";
      c.textAlign = "right";
      c.fillText(b, ix + iw, y);
      c.textAlign = "left";
      c.strokeStyle = "rgba(255,255,255,.06)";
      c.beginPath();
      c.moveTo(ix, y + 11);
      c.lineTo(ix + iw, y + 11);
      c.stroke();
      y += 26;
    }
    y += 10;
    c.font = `14px ${SANS}`;
    c.fillStyle = "#b9c2d6";
    wrap(c, txt2, ix, y, iw, 20);
  }
  var LAY = [
    { a: "#8a7f74", b: "#5f574f", sp: "#b7aa98" },
    // regolit
    { a: "#4c4038", b: "#2f2722", sp: "#7a6a58" },
    // uhlíkatý plášť
    { a: "#8f7a4c", b: "#5a4a2c", sp: "#e6c46e" },
    // kovová žíla
    { a: "#8d96a2", b: "#555d68", sp: "#dfe8f2" },
    // niklové jádro
    { a: "#6f55b8", b: "#3a2a70", sp: "#cdb6ff" }
    // izotopová žíla
  ];
  var edge = (i) => 1 - i * 0.19;
  var jag = (a, k) => 1 + 0.035 * Math.sin(a * 5 + k) + 0.022 * Math.sin(a * 11 + k * 2.3) + 0.012 * Math.sin(a * 23 + k);
  function rnd2(i) {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }
  function cutaway(c, s2, T5, w, hh, X) {
    const li = layerIdx(s2), R2 = Math.min(w * 0.2, hh * 0.34), cx = Math.min(w * 0.36, R2 * 1.3 + 70), cy = hh * 0.52;
    const A0 = -Math.PI / 2, A1 = 0.12;
    const halo = c.createRadialGradient(cx, cy, R2 * 0.6, cx, cy, R2 * 1.6);
    halo.addColorStop(0, "rgba(120,140,190,.10)");
    halo.addColorStop(1, "rgba(120,140,190,0)");
    c.fillStyle = halo;
    c.fillRect(0, 0, w, hh);
    c.save();
    c.beginPath();
    c.moveTo(cx, cy);
    c.arc(cx, cy, R2 * 1.6, A1, A0 + Math.PI * 2);
    c.closePath();
    c.clip();
    const im = img("asteroid");
    if (im) {
      const k = R2 * 2.5 / Math.max(im.width, im.height);
      c.drawImage(im, cx - im.width * k / 2, cy - im.height * k / 2, im.width * k, im.height * k);
    } else {
      const g = c.createRadialGradient(cx - R2 * 0.4, cy - R2 * 0.4, R2 * 0.1, cx, cy, R2 * 1.05);
      g.addColorStop(0, "#9b9084");
      g.addColorStop(1, "#2c2722");
      c.fillStyle = g;
      c.beginPath();
      for (let k = 0; k <= 96; k++) {
        const a = k / 96 * Math.PI * 2, r = R2 * jag(a, 0);
        k ? c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : c.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      c.fill();
    }
    c.restore();
    for (let i = 0; i < 5; i++) {
      const r0 = R2 * edge(i), L = LAY[i], open = i <= li;
      const g = c.createRadialGradient(cx, cy, r0 * 0.75, cx, cy, r0);
      g.addColorStop(0, L.b);
      g.addColorStop(1, L.a);
      c.fillStyle = g;
      c.beginPath();
      c.moveTo(cx, cy);
      for (let k = 0; k <= 40; k++) {
        const a = A0 + (A1 - A0) * k / 40, r = r0 * (i ? jag(a, i * 3) : 1);
        c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      c.closePath();
      c.fill();
      const r1 = R2 * edge(i + 1);
      c.fillStyle = L.sp;
      for (let k = 0; k < 26; k++) {
        const a = A0 + (A1 - A0) * rnd2(i * 97 + k), r = r1 + (r0 - r1) * (0.15 + 0.7 * rnd2(i * 31 + k * 7));
        const tw = open ? 0.55 + 0.45 * Math.sin(T5 * 2 + k) : 0.25;
        c.globalAlpha = tw * (i === li ? 1 : 0.6);
        c.beginPath();
        c.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1 + rnd2(k + i) * 1.6, 0, 7);
        c.fill();
      }
      c.globalAlpha = 1;
      if (!open) {
        c.fillStyle = "rgba(4,5,10,.55)";
        c.beginPath();
        c.moveTo(cx, cy);
        c.arc(cx, cy, r0 * 1.02, A0, A1);
        c.closePath();
        c.fill();
      }
    }
    c.strokeStyle = "rgba(255,255,255,.18)";
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(cx + Math.cos(A0) * R2 * 1.04, cy + Math.sin(A0) * R2 * 1.04);
    c.lineTo(cx, cy);
    c.lineTo(cx + Math.cos(A1) * R2 * 1.04, cy + Math.sin(A1) * R2 * 1.04);
    c.stroke();
    const rc = R2 * edge(li), pulse = 0.6 + 0.4 * Math.sin(T5 * 3);
    c.save();
    c.shadowColor = "#ffb85a";
    c.shadowBlur = 14 * pulse;
    c.strokeStyle = `rgba(255,200,110,${0.55 + 0.45 * pulse})`;
    c.lineWidth = 2.5;
    c.beginPath();
    c.arc(cx, cy, rc, A0 + 0.02, A1 - 0.02);
    c.stroke();
    c.restore();
    const aL = A0 + (A1 - A0) * 0.42, tx0 = cx + Math.cos(aL) * R2 * 1.55, ty0 = cy + Math.sin(aL) * R2 * 1.55;
    const tx1 = cx + Math.cos(aL) * rc, ty1 = cy + Math.sin(aL) * rc, fl = 0.75 + 0.25 * Math.sin(T5 * 37) * Math.sin(T5 * 13);
    c.save();
    c.globalCompositeOperation = "lighter";
    c.strokeStyle = `rgba(255,120,60,${0.35 * fl})`;
    c.lineWidth = 7;
    c.beginPath();
    c.moveTo(tx0, ty0);
    c.lineTo(tx1, ty1);
    c.stroke();
    c.strokeStyle = `rgba(255,230,190,${0.9 * fl})`;
    c.lineWidth = 1.6;
    c.beginPath();
    c.moveTo(tx0, ty0);
    c.lineTo(tx1, ty1);
    c.stroke();
    const sg = c.createRadialGradient(tx1, ty1, 0, tx1, ty1, 18);
    sg.addColorStop(0, "rgba(255,240,200,.95)");
    sg.addColorStop(0.3, "rgba(255,150,70,.5)");
    sg.addColorStop(1, "rgba(255,120,60,0)");
    c.fillStyle = sg;
    c.beginPath();
    c.arc(tx1, ty1, 18, 0, 7);
    c.fill();
    for (let k = 0; k < 7; k++) {
      const ph = (T5 * 1.7 + k / 7) % 1, a = aL + Math.PI + (rnd2(k) - 0.5) * 1.8, d = ph * 34;
      c.fillStyle = `rgba(255,${180 + 60 * rnd2(k + 3)},120,${1 - ph})`;
      c.beginPath();
      c.arc(tx1 + Math.cos(a) * d, ty1 + Math.sin(a) * d, 1.4, 0, 7);
      c.fill();
    }
    c.restore();
    c.fillStyle = "#c9d3e6";
    c.beginPath();
    c.arc(tx0, ty0, 4, 0, 7);
    c.fill();
    c.font = `11px ${MONO}`;
    c.fillStyle = "#7d879c";
    c.textAlign = "center";
    c.fillText("VESPER-7", tx0, ty0 - 10);
    c.textAlign = "left";
    const lx = Math.max(cx + R2 * 1.25, w * 0.58), step = Math.min(64, (hh - 70) / 5), y0 = cy - step * 2;
    for (let i = 0; i < 5; i++) {
      const rm = R2 * (edge(i) + edge(i + 1)) / 2, am = A0 + (A1 - A0) * 0.82, px = cx + Math.cos(am) * rm, py = cy + Math.sin(am) * rm;
      const y = y0 + i * step, on2 = i === li, done = i < li;
      c.strokeStyle = on2 ? "rgba(255,210,122,.7)" : "rgba(125,135,156,.35)";
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(px, py);
      c.lineTo(lx - 34, y - 4);
      c.lineTo(lx - 10, y - 4);
      c.stroke();
      c.fillStyle = LAY[i].sp;
      c.beginPath();
      c.arc(px, py, 2.5, 0, 7);
      c.fill();
      c.font = `${on2 ? 600 : 500} 15px ${SANS}`;
      c.fillStyle = on2 ? "#ffd27a" : done ? "#dfe4ef" : "#5d6678";
      c.fillText(`${done ? "\u2713 " : on2 ? "\u25B6 " : ""}${i <= li ? X.layer[i] : "???"}`, lx, y);
      c.font = `12px ${MONO}`;
      c.fillStyle = on2 ? "#e3a970" : done ? "#8ef0c8" : "#4a5266";
      c.fillText(i > li ? "neprozkoum\xE1no" : i ? `${count(Math.pow(T1.layerMult, i))}\xD7 v\xEDc rudy` : "z\xE1kladn\xED v\xFDnos", lx, y + 17);
    }
  }
  var SHELLS = [
    [["H", 1, "#2b3a78"], ["H \u2192 He", 0.34, "#5b3f92"]],
    [["H", 1, "#2b3a78"], ["H \u2192 He", 0.32, "#5b3f92"]],
    [["H", 1, "#2b3a78"], ["H \u2192 He", 0.34, "#5b3f92"], ["He", 0.2, "#6a4a9c"]],
    [["H", 1, "#33407e"], ["H \u2192 He", 0.36, "#5b3f92"], ["He \u2192 C \xB7 O", 0.2, "#93406f"]],
    [["H", 1, "#6e2a3e"], ["He", 0.5, "#5b3f92"], ["He \u2192 C \xB7 O", 0.28, "#93406f"]],
    [["He", 1, "#5b3f92"], ["C \xB7 O", 0.62, "#93406f"], ["C \u2192 Ne \xB7 Mg", 0.32, "#bb5a40"]],
    [["He", 1, "#5b3f92"], ["C \xB7 O", 0.8, "#93406f"], ["Ne \xB7 O", 0.62, "#bb5a40"], ["Si \xB7 S", 0.44, "#d8903c"], ["Si \u2192 Fe", 0.24, "#a9b2c6"]]
  ];
  var hexC = (h2) => [1, 3, 5].map((i) => parseInt(h2.slice(i, i + 2), 16));
  var mixC = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  var rgbC = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  function wrap(c, txt2, x, y, maxW, lh) {
    let line = "";
    for (const wd of txt2.split(" ")) {
      const t = line ? line + " " + wd : wd;
      if (c.measureText(t).width > maxW && line) {
        c.fillText(line, x, y);
        y += lh;
        line = wd;
      } else line = t;
    }
    if (line) c.fillText(line, x, y);
    return y + lh;
  }
  function starCut(c, s2, T5, w, hh, X) {
    const st = Math.min(s2.stage, SHELLS.length - 1), Ls = SHELLS[st], Lk = LOOK[st], P = X.phase[st], S = X.star;
    const R2 = Math.min(w * 0.19, hh * 0.36), cx = Math.min(w * 0.3, R2 * 1.45 + 60), cy = hh * 0.52;
    const A0 = -Math.PI / 2, A1 = 0, gl = Lk.glow.join(","), hot = [255, 238, 205];
    const fin = st === 6 ? 1 + 0.03 * Math.sin(T5 * 9) : 1;
    const halo = c.createRadialGradient(cx, cy, R2 * 0.8, cx, cy, R2 * 2.1);
    halo.addColorStop(0, `rgba(${gl},.42)`);
    halo.addColorStop(0.35, `rgba(${gl},.1)`);
    halo.addColorStop(1, `rgba(${gl},0)`);
    c.fillStyle = halo;
    c.beginPath();
    c.arc(cx, cy, R2 * 2.1, 0, 7);
    c.fill();
    c.save();
    c.beginPath();
    c.moveTo(cx, cy);
    c.arc(cx, cy, R2 * 2, A1, A0 + Math.PI * 2);
    c.closePath();
    c.clip();
    const sp2 = starSprite(st, R2, T5);
    if (sp2) {
      c.globalCompositeOperation = "screen";
      c.drawImage(sp2, cx - sp2.width / 2, cy - sp2.height / 2);
      c.globalCompositeOperation = "source-over";
    } else {
      const g = c.createRadialGradient(cx - R2 * 0.2, cy - R2 * 0.2, R2 * 0.1, cx, cy, R2);
      g.addColorStop(0, Lk.core);
      g.addColorStop(0.6, Lk.mid);
      g.addColorStop(1, Lk.edge);
      c.fillStyle = g;
      c.beginPath();
      c.arc(cx, cy, R2, 0, 7);
      c.fill();
    }
    c.restore();
    Ls.forEach(([, fr, col], i) => {
      const inner = i + 1 < Ls.length ? Ls[i + 1][1] : 0, base = hexC(col);
      const g = c.createRadialGradient(cx, cy, R2 * inner, cx, cy, R2 * fr);
      g.addColorStop(0, rgbC(mixC(base, hot, 0.35 + i * 0.07)));
      g.addColorStop(1, rgbC(mixC(base, [8, 8, 20], 0.25)));
      c.fillStyle = g;
      c.beginPath();
      c.moveTo(cx, cy);
      c.arc(cx, cy, R2 * fr, A0, A1);
      c.closePath();
      c.fill();
    });
    c.save();
    c.beginPath();
    c.moveTo(cx, cy);
    c.arc(cx, cy, R2, A0, A1);
    c.closePath();
    c.clip();
    const env0 = Ls.length > 1 ? Ls[1][1] : 0;
    for (let j = 0; j < 9; j++) {
      const rr2 = R2 * (env0 + (1 - env0) * ((j + 0.5) / 9)), sh = Math.sin(T5 * 0.3 + j * 1.7) * 0.08;
      c.strokeStyle = "rgba(255,255,255,.06)";
      c.lineWidth = 1;
      c.beginPath();
      c.arc(cx, cy, rr2, A0 + 0.12 + sh, A1 - 0.12 + sh);
      c.stroke();
    }
    for (const [, fr] of Ls) {
      c.strokeStyle = "rgba(255,240,220,.28)";
      c.lineWidth = 1;
      c.beginPath();
      c.arc(cx, cy, R2 * fr, A0, A1);
      c.stroke();
    }
    const cr = R2 * Ls[Ls.length - 1][1] * (1 + 0.04 * Math.sin(T5 * 0.9)) * fin;
    const cg = c.createRadialGradient(cx, cy, 0, cx, cy, cr * 1.6);
    cg.addColorStop(0, "rgba(255,255,245,.85)");
    cg.addColorStop(0.35, "rgba(255,230,190,.35)");
    cg.addColorStop(1, "rgba(255,220,180,0)");
    c.fillStyle = cg;
    c.beginPath();
    c.arc(cx, cy, cr * 1.6, 0, 7);
    c.fill();
    c.restore();
    c.strokeStyle = "rgba(255,240,215,.55)";
    c.lineWidth = 1.2;
    c.beginPath();
    c.moveTo(cx, cy - R2);
    c.lineTo(cx, cy);
    c.lineTo(cx + R2, cy);
    c.stroke();
    c.textBaseline = "middle";
    const lx = Math.max(cx + R2 * 1.3, w * 0.42), gap = Math.min(34, (hh - 90) / Ls.length), top = cy - R2 * 0.45 - (Ls.length - 1) * gap / 2;
    Ls.forEach(([name, fr, col], i) => {
      const inner = i + 1 < Ls.length ? Ls[i + 1][1] : 0, mid = R2 * (fr + inner) / 2, a = -Math.PI / 4 + (i - (Ls.length - 1) / 2) * 0.12;
      const sx0 = cx + Math.cos(a) * mid, sy0 = cy + Math.sin(a) * mid, ly = top + i * gap, last = i === Ls.length - 1;
      c.strokeStyle = last ? "rgba(255,210,122,.7)" : "rgba(225,228,244,.4)";
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(sx0, sy0);
      c.lineTo(lx - 24, ly);
      c.lineTo(lx - 10, ly);
      c.stroke();
      c.fillStyle = "#fff";
      c.beginPath();
      c.arc(sx0, sy0, 2, 0, 7);
      c.fill();
      c.fillStyle = rgbC(mixC(hexC(col), hot, 0.3));
      c.beginPath();
      c.arc(lx, ly, 5.5, 0, 7);
      c.fill();
      c.font = `${last ? 600 : 400} 14px ${MONO}`;
      c.textAlign = "left";
      c.fillStyle = last ? "#ffd27a" : "#e8eaf8";
      c.fillText(name, lx + 14, ly);
    });
    c.font = `600 11px ${SANS}`;
    c.fillStyle = "rgba(176,181,212,.9)";
    c.textAlign = "left";
    c.fillText(S.cut.toUpperCase(), 20, 24);
    const ix = Math.max(lx + 190, w * 0.62), iw = Math.min(380, w - ix - 20);
    if (iw < 200) {
      c.textBaseline = "alphabetic";
      return;
    }
    stageCard(c, s2, X, st, P.n, [[S.burn, P.burn], [S.T, P.T], [S.R, S.rsun.replace("{v}", P.R)], [S.L, S.lsun.replace("{v}", P.L)], [S.real, P.real], [S.cov, pct(coverage(s2))]], P.t, ix, Math.max(40, cy - 150), iw, S.stage);
    c.textBaseline = "alphabetic";
  }

  // src/ui/audio.ts
  var ctx = null;
  var master = null;
  var melodyBus = null;
  var DEFAULT_VOLUMES = { master: 0.8, melody: 1, noise: 0.7, drone: 1, pulse: 1, chime: 1 };
  var vols = { ...DEFAULT_VOLUMES };
  var soundOn = false;
  var bus = {};
  var pulseTimer;
  var melodyTimer;
  var SCALE = [220, 261.63, 293.66, 329.63, 369.99, 392, 440, 523.25, 587.33, 659.25];
  var degree = 4;
  function makeReverb(c) {
    const len = Math.floor(c.sampleRate * 4), ir = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    const conv = c.createConvolver();
    conv.buffer = ir;
    return conv;
  }
  function note(freq, when, len, vol) {
    if (!ctx || !melodyBus) return;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.9);
    g.gain.setTargetAtTime(0, when + len * 0.5, len * 0.3);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1600;
    g.connect(lp).connect(melodyBus);
    for (const det of [-4, 4]) {
      const o = ctx.createOscillator();
      o.type = det < 0 ? "sine" : "triangle";
      o.frequency.value = freq;
      o.detune.value = det;
      o.connect(g);
      o.start(when);
      o.stop(when + len + 2);
    }
  }
  function phrase() {
    if (!ctx) return;
    let t2 = ctx.currentTime + 0.1;
    const count2 = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count2; i++) {
      degree = Math.max(0, Math.min(SCALE.length - 1, degree + [-2, -1, -1, 1, 1, 2, 0][Math.floor(Math.random() * 7)]));
      const len = 3 + Math.random() * 3;
      note(SCALE[degree], t2, len, 0.022 + Math.random() * 0.012);
      if (Math.random() < 0.25) note(SCALE[Math.max(0, degree - 2)] / 2, t2 + 0.4, len + 1.5, 0.014);
      t2 += 1.3 + Math.random() * 1.5;
    }
    const rest = t2 - ctx.currentTime + 2 + Math.random() * 3;
    melodyTimer = window.setTimeout(phrase, rest * 1e3);
  }
  function build() {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    for (const ch of ["melody", "noise", "drone", "pulse", "chime"]) {
      const g = ctx.createGain();
      g.gain.value = vols[ch];
      g.connect(master);
      bus[ch] = g;
    }
    const len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 260;
    const ng = ctx.createGain();
    ng.gain.value = 0.18;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain).connect(ng.gain);
    noise.connect(lp).connect(ng).connect(bus.noise);
    noise.start();
    lfo.start();
    for (const [f, v] of [[55, 0.05], [82.6, 0.035], [110.3, 0.015]]) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = v;
      const trem = ctx.createOscillator();
      trem.frequency.value = 0.07 + Math.random() * 0.05;
      const tg = ctx.createGain();
      tg.gain.value = v * 0.6;
      trem.connect(tg).connect(g.gain);
      o.connect(g).connect(bus.drone);
      o.start();
      trem.start();
    }
    melodyBus = ctx.createGain();
    melodyBus.gain.value = 1;
    const dry = ctx.createGain();
    dry.gain.value = 0.35;
    const wet = ctx.createGain();
    wet.gain.value = 0.9;
    const rev = makeReverb(ctx);
    melodyBus.connect(dry).connect(bus.melody);
    melodyBus.connect(rev).connect(wet).connect(bus.melody);
  }
  function ping(ch, freq = 880, vol = 0.04, len = 2.2) {
    if (!ctx || !bus[ch]) return;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = freq;
    const g = ctx.createGain();
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.02);
    g.gain.exponentialRampToValueAtTime(1e-4, now + len);
    o.connect(g).connect(bus[ch]);
    o.start(now);
    o.stop(now + len + 0.1);
  }
  function setVolumes(v) {
    vols = { ...vols, ...v };
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    for (const ch of Object.keys(bus)) bus[ch].gain.setTargetAtTime(vols[ch], now, 0.05);
    if (soundOn) {
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(vols.master, now, 0.05);
    }
  }
  function setSound(on2, pulse2) {
    soundOn = on2;
    if (on2 && !ctx) build();
    if (!ctx || !master) return;
    if (on2) void ctx.resume();
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(on2 ? vols.master : 0, now, 0.6);
    clearInterval(pulseTimer);
    if (on2 && pulse2) pulseTimer = window.setInterval(() => ping("pulse", 1320, 0.012, 1.6), 7300);
    clearTimeout(melodyTimer);
    if (on2) melodyTimer = window.setTimeout(phrase, 1500);
    if (!on2) window.setTimeout(() => {
      if (ctx && master && master.gain.value < 0.01) void ctx.suspend();
    }, 3e3);
  }
  function chime() {
    ping("chime", 660, 0.03, 2.8);
    setTimeout(() => ping("chime", 990, 0.02, 2.4), 180);
  }
  function boom() {
    if (!ctx || !bus.chime) return;
    const c = ctx, now = c.currentTime, len = 7;
    const buf = c.createBuffer(1, c.sampleRate * len, c.sampleRate), d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      last = (last + 0.04 * (Math.random() * 2 - 1)) / 1.04;
      d[i] = last * 4;
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(900, now);
    lp.frequency.exponentialRampToValueAtTime(60, now + len);
    const g = c.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.5, now + 0.05);
    g.gain.exponentialRampToValueAtTime(1e-4, now + len);
    src.connect(lp).connect(g).connect(bus.chime);
    src.start(now);
    src.stop(now + len);
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(70, now);
    o.frequency.exponentialRampToValueAtTime(28, now + 3);
    const og = c.createGain();
    og.gain.setValueAtTime(1e-4, now);
    og.gain.exponentialRampToValueAtTime(0.35, now + 0.04);
    og.gain.exponentialRampToValueAtTime(1e-4, now + 3.5);
    o.connect(og).connect(bus.chime);
    o.start(now);
    o.stop(now + 3.6);
  }
  var lz = null;
  function laserNodes() {
    if (lz || !ctx || !bus.chime) return lz;
    const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2400;
    bp.Q.value = 1.4;
    const hum = ctx.createOscillator();
    hum.type = "sawtooth";
    hum.frequency.value = 110;
    const hlp = ctx.createBiquadFilter();
    hlp.type = "lowpass";
    hlp.frequency.value = 700;
    const hg = ctx.createGain();
    hg.gain.value = 0.18;
    const out = ctx.createGain();
    out.gain.value = 0;
    src.connect(bp).connect(out);
    hum.connect(hlp).connect(hg).connect(out);
    out.connect(bus.chime);
    src.start();
    hum.start();
    lz = { out, bp, hum };
    return lz;
  }
  function laser(on2, heat) {
    if (!ctx || !soundOn) {
      if (lz) lz.out.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
      return;
    }
    const n2 = laserNodes();
    if (!n2) return;
    const now = ctx.currentTime;
    n2.out.gain.setTargetAtTime(on2 ? 0.035 + heat * 0.02 : 0, now, on2 ? 0.03 : 0.08);
    n2.bp.frequency.setTargetAtTime(1800 + heat * 2600, now, 0.1);
    n2.hum.frequency.setTargetAtTime(95 + heat * 70, now, 0.1);
  }
  function crackle(rich = false) {
    if (!ctx || !bus.chime || !soundOn) return;
    const now = ctx.currentTime, len = Math.floor(ctx.sampleRate * 0.06), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = rich ? 2600 : 1500;
    const g = ctx.createGain();
    g.gain.value = rich ? 0.09 : 0.06;
    src.connect(hp).connect(g).connect(bus.chime);
    src.start(now);
  }

  // src/ui/app.ts
  var VERSION = "1.0.0-alfa";
  var $ = (id) => document.getElementById(id);
  var SUPM = { "\u2070": "0", "\xB9": "1", "\xB2": "2", "\xB3": "3", "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7", "\u2078": "8", "\u2079": "9", "\u207B": "\u2212" };
  var sx = (t) => t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (m) => `<sup>${[...m].map((c) => SUPM[c]).join("")}</sup>`).replace(/\u202F/g, '<i class="th"></i>');
  var h = (tag, cls = "", html = "") => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  };
  var s;
  var MECH = { 1: kamen, 2: hvezda, 3: diera, 4: galaxie };
  var VIEWS = ["body", "star", "system", "near", "galaxy", "group", "laniakea"];
  var lastCuts = 0;
  var lastCrack = 0;
  var view = "body";
  var tab = "build";
  var buyN = 1;
  var dockOpen = true;
  var T = 0;
  var inp = { x: -999, y: -999, px: -999, py: -999, down: false, inside: false };
  var geo = { sx: 1, ox: 0, oy: 0 };
  var W = 0;
  var H = 0;
  var DPR = 1;
  var hoverMis = null;
  var trans = 0;
  function fmtCur(cur, v) {
    if (cur === "ore" || cur === "plasma" || cur === "mass") return mass(v);
    if (cur === "energy") return si(v, "J");
    if (cur === "data") return si(v, "B");
    return count(v);
  }
  var curName = (cur) => UI.res[cur];
  function save() {
    s.last = Date.now();
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(s));
    } catch {
    }
  }
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) return migrate(JSON.parse(raw));
    } catch {
    }
    return newState();
  }
  function start() {
    s = load();
    preload();
    window.sepot = { get s() {
      return s;
    }, get geo() {
      return geo;
    }, E: engine_exports, MECH, inp };
    setFx(s.opt.fx !== 0);
    view = chOf(s).view;
    buildShell();
    on(onEvent);
    const away = (Date.now() - s.last) / 1e3;
    const off = s.t > 5 ? offline(s, away) : null;
    MECH[s.ch].reset();
    if (!s.story["intro" + s.ch]) setTimeout(showIntro, img("intro" + s.ch) ? 0 : 600);
    else if (off) showOffline(off);
    setVolumes({ master: s.opt.vol, noise: s.opt.noise ?? 0.7 });
    resize();
    addEventListener("resize", resize);
    setInterval(save, 1e4);
    addEventListener("beforeunload", save);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) save();
    });
    setInterval(() => {
      if (document.hidden) tick(s, 1);
    }, 1e3);
    let last = performance.now(), uiT = 0;
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1e3);
      last = now;
      T += dt;
      requestAnimationFrame(loop);
      if (!document.hidden) try {
        const interactive = view === chOf(s).view && trans <= 0;
        MECH[s.ch].update(s, dt, interactive ? inp : { ...inp, down: false });
        tick(s, dt);
        fxUpdate(dt);
        if (s.ch === 1) {
          const on2 = interactive && inp.down && !kamen.over && !!kamen.stroke;
          laser(on2, kamen.heat);
          if (on2 && s.stats.cuts > lastCuts && T - lastCrack > 0.06) {
            crackle();
            lastCrack = T;
          }
        }
        lastCuts = s.stats.cuts;
        if (trans > 0) {
          trans -= dt;
          if (trans <= 0) afterTransition();
        }
        render();
        uiT -= dt;
        if (uiT <= 0) {
          uiT = 0.25;
          updateUI();
        }
      } catch (err) {
        console.error(err);
      }
    };
    requestAnimationFrame(loop);
  }
  function buildShell() {
    const cv = $("scene");
    const toV = (e) => {
      const r = cv.getBoundingClientRect();
      return [(e.clientX - r.left - geo.ox) / geo.sx, (e.clientY - r.top - geo.oy) / geo.sx];
    };
    cv.addEventListener("pointermove", (e) => {
      const [x, y] = toV(e);
      inp.x = x;
      inp.y = y;
      inp.inside = true;
    });
    cv.addEventListener("pointerleave", () => {
      inp.inside = false;
    });
    cv.addEventListener("pointerdown", (e) => {
      const [x, y] = toV(e);
      inp.x = inp.px = x;
      inp.y = inp.py = y;
      inp.down = true;
      cv.setPointerCapture(e.pointerId);
      if (view !== chOf(s).view) {
        const m = missionAt(s, view, x, y);
        if (m) {
          setTab("map");
          flash("mis_" + m);
        }
        return;
      }
      MECH[s.ch].down?.(s, inp);
      ping("chime", 520, 6e-3, 0.5);
    });
    const up = () => {
      if (!inp.down) return;
      inp.down = false;
      MECH[s.ch].up?.(s, inp);
    };
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);
    $("dockTog").onclick = () => {
      dockOpen = !dockOpen;
      document.body.classList.toggle("dockclosed", !dockOpen);
      resize();
    };
    for (const t of ["build", "research", "map", "detail"]) {
      const b = h("button", "tab", `<span>${UI.tabs[t]}</span><i class="dot"></i>`);
      b.dataset.t = t;
      b.onclick = () => setTab(t);
      $("tabs").appendChild(b);
    }
    VIEWS.forEach((v, i) => {
      if (v === "near") return;
      const b = h("button", "", UI.ladder[i]);
      b.dataset.v = v;
      if (v === "system") b.classList.add("sub");
      b.onclick = () => setView(v);
      $("ladder").appendChild(b);
    });
    $("kblock").onclick = showK;
    $("setBtn").onclick = showSettings;
    $("sndBtn").onclick = () => {
      s.opt.sound = !s.opt.sound;
      setSound(s.opt.sound, s.ch >= 1);
      $("sndBtn").classList.toggle("on", s.opt.sound);
    };
    $("sndBtn").classList.toggle("on", !!s.opt.sound);
    if (s.opt.sound) addEventListener("pointerdown", (e) => {
      if (e.target?.closest?.("#sndBtn")) return;
      if (s.opt.sound) setSound(true, s.ch >= 1);
    }, { once: true, capture: true });
    $("modalOk").onclick = () => closeModal(true);
    $("modalCancel").onclick = () => closeModal(false);
    setTab("build");
  }
  function resize() {
    const cv = $("scene");
    DPR = Math.min(2, devicePixelRatio || 1);
    W = innerWidth;
    H = innerHeight;
    cv.width = Math.round(W * DPR);
    cv.height = Math.round(H * DPR);
    const left = W > 900 ? 330 : 0, right = W > 900 ? dockOpen ? 400 : 30 : 0, top = 64, bottom = 58;
    const aw = W - left - right, ah = H - top - bottom;
    const sx2 = Math.min(aw / VW, ah / VH) * 1.08;
    geo = { sx: sx2, ox: left + (aw - VW * sx2) / 2, oy: top + (ah - VH * sx2) / 2 };
  }
  function render() {
    const cv = $("scene"), c = cv.getContext("2d");
    c.setTransform(DPR, 0, 0, DPR, 0, 0);
    background(c, W, H, DPR, s.ch);
    let k = 1, alpha = 1;
    if (trans > 0) {
      const f = 1 - trans / 3.2;
      k = 1 - 0.75 * f * f;
      alpha = Math.max(0, 1 - f * 1.2);
    }
    c.setTransform(DPR * geo.sx * k, 0, 0, DPR * geo.sx * k, DPR * (geo.ox + VW * geo.sx * (1 - k) / 2), DPR * (geo.oy + VH * geo.sx * (1 - k) / 2));
    c.globalAlpha = alpha;
    setLabelScale(geo.sx * k);
    const passive2 = view !== chOf(s).view, V = { T, sx: geo.sx * k, passive: passive2, fx: s.opt.fx };
    if (view === "body") kamen.draw(c, s, { ...V, passive: s.ch !== 1 || passive2 }, inp);
    else if (view === "star") {
      if (s.ch === 3) diera.draw(c, s, { ...V, passive: passive2 }, inp);
      else if (s.ch >= 4) drawRemnant(c, T);
      else hvezda.draw(c, s, { ...V, passive: s.ch !== 2 || passive2 }, inp);
    } else if (view === "system") drawSystem(c, s, T);
    else if (view === "near") drawNear(c, s, T);
    else if (view === "galaxy") galaxie.draw(c, s, { ...V, passive: s.ch !== 4 || passive2 }, inp);
    if (["system", "near", "galaxy"].includes(view)) {
      hoverMis = missionAt(s, view, inp.x, inp.y);
      drawMissions(c, s, view, T, geo.sx, hoverMis);
    }
    if (!passive2) fxDraw(c, geo.sx);
    c.globalAlpha = 1;
    const cur = passive2 ? hoverMis ? "pointer" : "default" : MECH[s.ch].cursor?.(s, inp) || "crosshair";
    if (cv.style.cursor !== cur) cv.style.cursor = cur;
    const dc = document.getElementById("detc");
    if (tab === "detail" && dc) drawDetail(dc, s, T);
  }
  function ladderName(v) {
    return v === "star" && s.ch >= 3 ? UI.ladderHole : UI.ladder[VIEWS.indexOf(v)];
  }
  function viewOpen(v) {
    if (v === "body") return s.ch < 3;
    if (v === "system") return s.ch >= 3;
    if (v === "star") return s.ch >= 2;
    if (v === "near") return false;
    if (v === "galaxy") return s.ch >= 4;
    return false;
  }
  function setView(v) {
    if (!viewOpen(v)) return;
    view = v;
    if (v !== chOf(s).map && v !== "near" && tab === "map") setTab("build", true);
  }
  function setTab(t, keepView = false) {
    tab = t;
    document.querySelectorAll("#tabs .tab").forEach((b) => b.classList.toggle("on", b.dataset.t === t));
    document.body.classList.toggle("wide", t === "research" || t === "detail");
    document.body.classList.toggle("tdetail", t === "detail");
    if (dockOpen === false && t !== "build" && t !== "map") {
      dockOpen = true;
      document.body.classList.remove("dockclosed");
    }
    s.seen["tab_" + t] = s.t;
    if (t === "detail") s.seen["detail" + s.ch] = s.stage;
    if (!keepView) {
      if (t === "map") {
        const ids = chOf(s).missions.filter((m) => mVisible(s, m.id) && !s.mis[m.id]).map((m) => MMAP[m.id].view);
        view = ids[0] || chOf(s).map;
      } else if (t === "build") view = chOf(s).view;
    }
    listKey = "";
    updateUI();
  }
  var listKey = "";
  function updateUI() {
    const C = chOf(s), X = tx(s.ch), P = power(s);
    const kk = K(P);
    $("kval").textContent = kk < 0 ? UI.kBelow : `K ${fixed(kk, 2)}`;
    $("kpow").innerHTML = sx(si(P, "W"));
    const ti = KTYPES.findIndex((t) => P < t.w), nt = KTYPES[ti];
    if (nt) {
      const base = ti > 0 ? KTYPES[ti - 1].w : 500;
      $("kbar").style.width = `${Math.max(0, Math.min(1, Math.log(P / base) / Math.log(nt.w / base))) * 100}%`;
      setHTML($("kprog"), sx(UI.toType(nt.k, need2(nt.w / P))));
    } else {
      $("kbar").style.width = "100%";
      $("kprog").textContent = UI.typeMax;
    }
    const resList = [[C.cur, s.res[C.cur], RT.rate[C.cur]], ["energy", s.res.energy, P], ["data", s.res.data, dataRate(s)]];
    $("res").innerHTML = resList.map(([k, v, r]) => sx(`<div class="chip c-${k === "energy" || k === "data" ? k : "cur"}"${k === "energy" ? ` title="${UI.unitsTip}"` : ""}><span class="l">${curName(k)}</span><span class="v mono">${fmtCur(k, v)}</span><span class="r mono">${k === "energy" ? `${UI.powerShort} ${si(r, "W")}` : `${r < 0 ? "\u2212" : "+"}${fmtCur(k, Math.abs(r))}/s`}</span></div>`)).join("");
    const st = Math.min(s.stage, stagesOf(s)), names = X.stages;
    $("chTitle").textContent = X.title;
    $("stName").textContent = `${UI.stage} ${Math.min(st + 1, stagesOf(s))}/${stagesOf(s)} \xB7 ${names[st]}`;
    if (!finalReady(s)) {
      const goal = stageGoal(s), prev = s.stage > 0 ? stageGoal(s, s.stage - 1) : s.ch === 1 ? 500 : s.base;
      const f = Math.max(0, Math.min(1, Math.log(P / prev) / Math.log(goal / prev)));
      $("goalBar").style.width = `${f * 100}%`;
      $("goalTxt").innerHTML = sx(`${UI.goal}: ${si(goal, "W")}`);
      $("goalNeed").innerHTML = sx(UI.needMore(need2(goal / P)));
    } else {
      const fin = C.research.find((r) => r.final);
      $("goalBar").style.width = "100%";
      $("goalTxt").textContent = UI.stageDone;
      $("goalNeed").textContent = UI.finalHint(find("r", fin.id).n);
    }
    $("indic").innerHTML = sx(indicator());
    $("stats").innerHTML = statRows().map(([l, v]) => l.startsWith("\xBB") ? `<dt class="w">${l.slice(1)}</dt><dd class="w">${sx(v)}</dd>` : `<dt>${l}</dt><dd class="mono">${sx(v)}</dd>`).join("");
    $("hint").textContent = view === C.view ? X.hint[s.stage >= C.lvl2 ? 1 : 0] : "";
    $("hint").hidden = view !== C.view || s.chT > 900 && s.stage >= C.lvl2 + 1;
    journal();
    document.querySelectorAll("#ladder button").forEach((b) => {
      const o = viewOpen(b.dataset.v), gone = b.dataset.v === "body" && s.ch >= 3;
      setHTML(b, o || gone ? ladderName(b.dataset.v) : "???");
      b.disabled = !o;
      b.classList.toggle("on", o && b.dataset.v === view);
      b.title = o ? "" : UI.locked;
    });
    const newer = (pre) => Object.entries(s.unl).some(([k, t]) => k.startsWith(pre) && t > (s.seen["tab_" + { b_: "build", r_: "research", m_: "map" }[pre]] ?? -1));
    const dots = {
      build: newer("b_"),
      research: newer("r_") || C.research.some((r) => rVisible(s, r.id) && !s.r[r.id] && s.res.data >= r.cost),
      map: newer("m_") || !s.run && C.missions.some((m) => mVisible(s, m.id) && !s.mis[m.id] && s.res.energy >= m.cost),
      detail: s.stage > (s.seen["detail" + s.ch] ?? 0)
    };
    document.querySelectorAll("#tabs .tab").forEach((b) => b.classList.toggle("new", !!dots[b.dataset.t] && b.dataset.t !== tab));
    if (tab === "build") buildList();
    else if (tab === "research") researchList();
    else if (tab === "map") missionList();
    else detailText();
  }
  function indicator() {
    const X = tx(s.ch);
    if (s.ch === 1) {
      const li = layerIdx(s);
      return `<div class="ind"><span>Hloubka \u0159ezu</span><b>${X.layer[li]}</b><small>V\xFDnos rudy: ${count(oreMult(s))}\xD7 v\xEDc ne\u017E na za\u010D\xE1tku</small></div>`;
    }
    if (s.ch === 2) {
      const cv = coverage(s);
      return `<div class="ind"><span>${X.indicator}</span><b class="mono">${pct(cv)}</b><div class="bar"><b style="width:${Math.max(0.5, (Math.log10(Math.max(cv, 1e-14)) + 14) / 14 * 100)}%"></b></div><small>Kolektory: ${count(s.n)}</small></div>`;
    }
    if (s.ch === 3) {
      const f = power(s) / eddMax(s);
      return `<div class="ind"><span>${X.indicator}</span><b class="mono">${pct(f)}</b><div class="bar"><b style="width:${Math.max(0.5, Math.min(1, (Math.log10(Math.max(f, 1e-6)) + 6) / 6)) * 100}%"></b></div><small>\xDA\u010Dinnost disku ${pct(eta(s))} \xB7 rotace ${fixed(spinA(s), 3)}</small></div>`;
    }
    const so = starsOn(s).v;
    return `<div class="ind"><span>${X.indicator}</span><b class="mono">${count(so)} z 100 G</b><div class="bar"><b style="width:${Math.max(0.5, (Math.log10(Math.max(so, 1)) - 4) / 7 * 100)}%"></b></div><small>Kolonie: ${colCount(s)} \xB7 zachycen\xED sv\u011Btla ${pct(capture(s))}</small></div>`;
  }
  function statRows() {
    const C = chOf(s), rows2 = [[UI.power, si(power(s), "W")]];
    rows2.push([`${curName(C.cur)}${UI.perSec}`, fmtCur(C.cur, RT.rate[C.cur])]);
    rows2.push([`${UI.res.data}${UI.perSec}`, si(dataRate(s), "B")]);
    if (s.run) rows2.push(["\xBB" + ship().who, `${find("m", s.run.id).n} \xB7 <span class="mono">${duration(s.run.left)}</span>`]);
    return rows2;
  }
  var logLen = -1;
  function journal() {
    const k = s.log.length + ":" + (s.log[s.log.length - 1]?.t ?? 0);
    if (logLen === k) return;
    logLen = k;
    const box = $("log");
    box.innerHTML = "";
    let first = true;
    for (const e of s.log.slice(-40).reverse()) {
      const t = find("jour", e.k);
      if (!t) continue;
      const kind = e.kind || "story";
      const d = h("div", "entry " + kind + (first && s.t - e.t < 3 ? " new" : ""));
      first = false;
      const lab = kind === "fact" ? UI.fact : kind === "report" ? UI.report : UI.diary;
      d.innerHTML = `<span class="t">${lab} \xB7 ${clock(e.t)}</span>`;
      d.appendChild(document.createTextNode(t));
      box.appendChild(d);
    }
  }
  function clock(t) {
    const m = Math.floor(t / 60);
    return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
  }
  function need2(r) {
    return r >= 2 ? { big: true, v: times(r) } : { big: false, v: pct(Math.max(0, r - 1)) };
  }
  function bCat(id) {
    const d = BMAP[id];
    if (d.kind === "data") return "data";
    if (s.ch === 1 && d.kind === "gen" || d.kind === "swarm") return "energy";
    return "cur";
  }
  var ship = () => ({ who: "Vesper", send: UI.send, running: UI.running, busy: UI.busy, ...tx(s.ch).ship || {} });
  var rows = {};
  function setHTML(el, html) {
    if (el._h !== html) {
      el._h = html;
      el.innerHTML = html;
    }
  }
  function setDis(el, d) {
    if (el.disabled !== d) el.disabled = d;
  }
  function effect(id) {
    const d = BMAP[id], own = chOf(s).effect?.(s, id);
    if (own) return own;
    const ms = d.kind === "gen" || d.kind === "data" ? ` \xB7 ${UI.mileHint(Math.floor(n(s, id) / 25) * 25 + 25)}` : "";
    if (d.kind === "gen" && s.ch === 1) return `+${si(genW(s, id), "W")} ${UI.perPiece}${ms}`;
    if (d.kind === "gen") return `+${mass(prodRate(s, id) * plasmaMult(s))}/s ${UI.perPiece}${ms}`;
    if (d.kind === "data") return `+${si(d.d * mile(n(s, id)) * chOf(s).dataMult(s), "B")}/s ${UI.perPiece}${ms}`;
    if (d.kind === "swarm") return `+${si(L_ALDRA * colArea(s) * salvo(s), "W")} za salvu ${count(salvo(s))}`;
    if (d.kind === "unit") return `${count(n(s, id))} pracuje`;
    return find("b", id)?.d || "";
  }
  function buildList() {
    const C = chOf(s);
    const ids = C.build.filter((b) => unlocked(s, b.id)).sort((a, b) => (s.unl["b_" + b.id] ?? 0) - (s.unl["b_" + a.id] ?? 0) || C.build.indexOf(b) - C.build.indexOf(a)).map((b) => b.id);
    const autos = [];
    if (s.ch === 1 && n(s, "dock")) autos.push(["dock", UI.autoDock]);
    if (s.ch === 1 && s.r.assembly) autos.push(["assembly", UI.autoAsm(GEN1.filter((g) => s.unl["b_" + g] != null).map((g) => find("b", g).n.toLowerCase()))]);
    if (s.ch === 2 && n(s, "fact")) autos.push(["fact", UI.autoFact]);
    const key = "b" + s.ch + ids.join(",") + "|" + autos.map((a) => a[1]).join(",") + buyN;
    const box = $("dockBody");
    if (key !== listKey) {
      listKey = key;
      box.innerHTML = "";
      const bar = h("div", "buybar");
      for (const k of [1, 10, 0]) {
        const b = h("button", buyN === k ? "on" : "", k ? `\xD7${k}` : UI.max);
        b.onclick = () => {
          buyN = k;
          listKey = "";
          updateUI();
        };
        bar.appendChild(b);
      }
      box.appendChild(bar);
      for (const [id, label2] of autos) {
        const r = h("div", "auto");
        const b = h("button", "tog");
        b.onclick = () => {
          s.auto[id] = s.auto[id] === false;
        };
        r.append(h("span", "", label2), b);
        rows["auto_" + id] = b;
        box.appendChild(r);
      }
      for (const id of ids) {
        const d = BMAP[id], t = find("b", id);
        const r = h("div", "row c-" + bCat(id) + (d.tier === 2 ? " t2" : "") + (s.t - (s.unl["b_" + id] ?? -99) < 6 ? " fresh" : ""));
        r.innerHTML = `<div class="nm"><b>${t.n}</b><small class="eff"></small></div><span class="cnt mono"></span>`;
        const b = h("button", "buy");
        b.onclick = () => {
          const k = d.kind === "swarm" ? Math.max(1, buyN || maxAfford(s, id)) : buyN || maxAfford(s, id);
          if (buy(s, id, Math.max(1, k))) ping("chime", 660, 0.012, 1);
          updateUI();
        };
        b.title = t.d;
        r.appendChild(b);
        rows[id] = { r, b, eff: r.querySelector(".eff"), cnt: r.querySelector(".cnt") };
        box.appendChild(r);
      }
    }
    for (const [id] of autos) {
      const b = rows["auto_" + id];
      const on2 = s.auto[id] !== false;
      setHTML(b, on2 ? UI.autoOn : UI.autoOff);
      b.classList.toggle("on", on2);
    }
    for (const id of ids) {
      const d = BMAP[id], R2 = rows[id];
      if (!R2) continue;
      const mx = maxed(s, id), lvl = n(s, id);
      const ct = d.kind === "swarm" ? count(s.n) : d.max != null ? `${lvl}/${d.max}` : count(lvl);
      if (R2.cnt.textContent !== ct) R2.cnt.textContent = ct;
      setHTML(R2.eff, sx(effect(id)));
      if (mx) {
        setHTML(R2.b, UI.maxed);
        setDis(R2.b, true);
        continue;
      }
      const k = Math.max(1, buyN || maxAfford(s, id)), c = costN(s, id, k);
      setHTML(R2.b, sx(`${k > 1 ? `\xD7${k} ` : ""}<span class="mono">${fmtCur(d.cur, c)}</span>`));
      setDis(R2.b, s.res[d.cur] < c);
    }
  }
  function researchList() {
    const C = chOf(s), vis = C.research.filter((r) => rVisible(s, r.id));
    const open = vis.filter((r) => !s.r[r.id]).sort((a, b) => (s.unl["r_" + b.id] ?? 0) - (s.unl["r_" + a.id] ?? 0));
    const done = vis.filter((r) => s.r[r.id]);
    const key = "r" + open.map((r) => r.id).join(",") + "|" + done.length;
    const box = $("dockBody");
    if (key !== listKey) {
      listKey = key;
      box.innerHTML = "";
      const head = h("div", "rhead");
      head.innerHTML = `<div><span class="ph">${UI.tabs.research}</span><b class="mono" id="rData"></b><small class="mono" id="rRate"></small></div><small class="dim">${UI.researchNote}</small>`;
      box.appendChild(head);
      for (const r of open) {
        const t = find("r", r.id), card = h("div", "card rc" + (r.final ? " final" : "") + (r.lvl2 ? " lvl2" : "") + (s.t - (s.unl["r_" + r.id] ?? -99) < 6 ? " fresh" : ""));
        card.innerHTML = `<div class="rt"><i class="ri">${r.final ? "\u2605" : r.lvl2 ? "\u25C6" : "\u2726"}</i><b>${t.n}</b></div><p>${t.d}</p><div class="rp"><div class="pbar"><b></b></div><small class="mono eta"></small></div>`;
        const b = h("button", "buy");
        b.onclick = () => {
          if (doResearch(s, r.id)) chime();
          updateUI();
        };
        card.appendChild(b);
        rows["r_" + r.id] = { b, card, bar: card.querySelector(".pbar b"), eta: card.querySelector(".eta") };
        box.appendChild(card);
      }
      if (!open.length) box.appendChild(h("div", "card rc empty", `<p>${UI.researchNone}</p>`));
      if (done.length) box.appendChild(h("div", "rdone", `<span class="ph">${UI.researchDone} (${done.length})</span>` + done.map((r) => `<span class="tag" title="${find("r", r.id).d}">\u2713 ${find("r", r.id).n}</span>`).join("")));
    }
    const rate = dataRate(s);
    setHTML($("rData"), sx(si(s.res.data, "B")));
    setHTML($("rRate"), sx(`+${si(rate, "B")}/s`));
    for (const r of open) {
      const R2 = rows["r_" + r.id], ok2 = s.res.data >= r.cost, f = Math.min(1, s.res.data / r.cost);
      setHTML(R2.b, sx(`<span class="mono">${si(r.cost, "B")}</span>`));
      setDis(R2.b, !ok2);
      R2.card.classList.toggle("ready", ok2);
      R2.bar.style.width = `${f * 100}%`;
      setHTML(R2.eta, ok2 ? UI.researchReady : rate > 0 ? `${pct(f)} \xB7 ${UI.researchIn(duration((r.cost - s.res.data) / rate))}` : pct(f));
    }
  }
  function missionList() {
    const C = chOf(s), vis = C.missions.filter((m) => mVisible(s, m.id));
    const open = vis.filter((m) => !s.mis[m.id]).sort((a, b) => (s.unl["m_" + b.id] ?? 0) - (s.unl["m_" + a.id] ?? 0));
    const done = vis.filter((m) => s.mis[m.id]);
    const key = "m" + open.map((m) => m.id).join(",") + "|" + done.length + (s.run?.id || "");
    const box = $("dockBody");
    if (key !== listKey) {
      listKey = key;
      box.innerHTML = "";
      for (const m of open) {
        const t = find("m", m.id), card = h("div", "card mis");
        card.id = "mis_" + m.id;
        card.innerHTML = `<b>${t.n}</b><small>${t.p}</small><p>Odm\u011Bna: ${t.r}</p><div class="pbar"><b></b></div>`;
        const b = h("button", "buy");
        b.onclick = () => {
          if (startMission(s, m.id)) {
            ping("chime", 440, 0.02, 2);
            view = m.view;
          }
          updateUI();
        };
        card.onmouseenter = () => {
          view = m.view;
        };
        card.appendChild(b);
        rows["m_" + m.id] = { b, bar: card.querySelector(".pbar b"), card };
        box.appendChild(card);
      }
      if (done.length) {
        const d = h("details", "done");
        d.innerHTML = `<summary>${UI.missionsDone} (${done.length})</summary>` + done.map((m) => `<div><b>${find("m", m.id).n}</b> \u2013 ${find("m", m.id).r}</div>`).join("");
        box.appendChild(d);
      }
    }
    for (const m of open) {
      const R2 = rows["m_" + m.id], run = s.run?.id === m.id;
      R2.bar.parentElement.hidden = !run;
      if (run) {
        R2.bar.style.width = `${(1 - s.run.left / s.run.dur) * 100}%`;
        setHTML(R2.b, `${ship().running} \xB7 ${duration(s.run.left)}`);
        setDis(R2.b, true);
        continue;
      }
      setHTML(R2.b, s.run ? ship().busy : sx(`${ship().send} \xB7 <span class="mono">${si(m.cost, "J")}</span> \xB7 ${duration(m.dur)}`));
      setDis(R2.b, !!s.run || s.res.energy < m.cost);
    }
  }
  function detailText() {
    const key = "d" + s.ch + s.stage + finalReady(s);
    const box = $("dockBody"), X = tx(s.ch), N = stagesOf(s);
    if (key !== listKey) {
      listKey = key;
      box.innerHTML = "";
      const head = h("div", "rhead");
      head.innerHTML = `<div><span class="ph">${X.title}</span><b>${UI.detail[s.ch]}</b></div><small class="dim">${UI.detailNote[s.ch] || ""}</small>`;
      box.appendChild(head);
      box.appendChild(h("canvas", "", "")).id = "detc";
      const tl = h("div", "tl");
      for (let i = 0; i < N; i++) {
        const st = i < s.stage ? "done" : i === s.stage ? "now" : "next";
        const g = stageGoal(s, i), ex = s.ch === 1 ? `<small>${X.layer[i]} \xB7 ${i ? `${count(Math.pow(T1.layerMult, i))}\xD7 v\xEDc rudy` : "z\xE1kladn\xED v\xFDnos"}</small>` : "";
        if (st === "next") {
          tl.appendChild(h("div", "st next", `<i>${i + 1}</i><b>???</b><small>${UI.stageHidden}</small>`));
          continue;
        }
        tl.appendChild(h("div", "st " + st, sx(`<i>${st === "done" ? "\u2713" : i + 1}</i><b>${X.stages[i]}</b><small class="mono">${UI.goal}: ${si(g, "W")} \xB7 ${K(g) < 0 ? UI.kBelow : "K " + fixed(K(g), 2)}</small>${ex}${st === "now" ? `<div class="bar"><b id="tlBar"></b></div>` : ""}`)));
      }
      box.appendChild(tl);
    }
    const bar = document.getElementById("tlBar");
    if (bar && !finalReady(s)) {
      const P = power(s), goal = stageGoal(s), prev = s.stage > 0 ? stageGoal(s, s.stage - 1) : s.ch === 1 ? 500 : s.base;
      bar.style.width = `${Math.max(0, Math.min(1, Math.log(P / prev) / Math.log(goal / prev))) * 100}%`;
    }
  }
  function flash(id) {
    setTimeout(() => {
      const e = document.getElementById(id);
      if (e) {
        e.scrollIntoView({ block: "nearest" });
        e.classList.add("flash");
        setTimeout(() => e.classList.remove("flash"), 1200);
      }
    }, 50);
  }
  function onEvent(e) {
    if (e.type === "stage") {
      toast(`${tx(s.ch).stages[s.stage] ?? ""}`);
      chime();
    }
    if (e.type === "mdone") {
      toast(`${find("m", e.id).n}: ${find("m", e.id).r}`);
      chime();
    }
    if (e.type === "journal") {
      logLen = -1;
      ping("chime", 990, 8e-3, 2);
    }
    if (e.type === "final") startTransition();
    if (e.type === "theend") modal(UI.theEnd, `<p>${UI.theEndBody}</p>`, false);
  }
  function startTransition() {
    if (s.ch >= 4) {
      s.done = 4;
      view = "galaxy";
      setTab("build");
      boom();
      setTimeout(() => modal(UI.awakeT, (img("sgra") ? `<img class="intro" src="${imgSrc("sgra")}" alt="">` : "") + UI.awake.map((p) => `<p>${p}</p>`).join("") + `<p class="dim">${UI.theEndBody}</p>`, false), 4500);
      return;
    }
    trans = 3.2;
    boom();
  }
  function afterTransition() {
    archiveData(s);
    nextChapter(s);
    fxClear();
    MECH[s.ch].reset();
    view = chOf(s).view;
    listKey = "";
    logLen = -1;
    document.body.dataset.ch = String(s.ch);
    setTab("build");
    save();
    showIntro();
  }
  var modalCb = null;
  function modal(title, html, cancel, cb, okText = UI.ok) {
    $("modalTitle").textContent = title;
    $("modalBody").innerHTML = html;
    $("modalOk").textContent = okText;
    $("modalCancel").hidden = !cancel;
    $("modalCancel").textContent = UI.cancel;
    $("modal").hidden = false;
    modalCb = cb || null;
  }
  function closeModal(ok2) {
    $("modal").hidden = true;
    const cb = modalCb;
    modalCb = null;
    cb?.(ok2);
  }
  function showIntro() {
    const X = tx(s.ch);
    const pic = img("intro" + s.ch);
    modal(X.intro.h, (pic ? `<img class="intro" src="${imgSrc("intro" + s.ch)}" alt="">` : "") + `<p class="chap">${X.title}</p>` + X.intro.p.map((p) => `<p>${p}</p>`).join(""), false, () => {
      s.story["intro" + s.ch] = 1;
      save();
    });
  }
  function showOffline(o) {
    modal(UI.offline, `<p>${duration(o.sec)} \xB7 ${UI.offlineNote}</p><table>${o.out.map(([k, v]) => `<tr><td>${curName(k)}</td><td class="mono">+${fmtCur(k, v)}</td></tr>`).join("")}</table>`, false);
  }
  function showK() {
    const P = power(s);
    const items = KTYPES.filter((t) => t.ch <= s.ch).map((t) => `<li${P >= t.w ? ' class="ok"' : ""}>${UI.types[t.k]}</li>`).join("");
    modal(UI.ktitle, `<p>${UI.kbody}</p><p class="mono big">K ${fixed(K(P), 2)} \xB7 ${si(P, "W")}</p><ul class="kt">${items}</ul><p class="dim">${UI.kmore}</p>`, false);
  }
  function showSettings() {
    modal(UI.settings, `
    <div class="set"><label><input type="checkbox" id="optFx" ${s.opt.fx !== 0 ? "checked" : ""}> ${UI.effects}</label></div>
    <div class="set"><label>${UI.volume} <input type="range" id="optVol" min="0" max="1" step="0.05" value="${s.opt.vol}"></label></div>
    <div class="set"><label>${UI.noiseVol} <input type="range" id="optNoise" min="0" max="1" step="0.05" value="${s.opt.noise ?? 0.7}"></label></div>
    <div class="set row"><button class="btn" id="expBtn">${UI.export}</button><button class="btn" id="impBtn">${UI.import}</button><button class="btn danger" id="resBtn">${UI.reset}</button></div>
    <textarea id="saveTxt" rows="3" placeholder="\u2026"></textarea>
    <p class="dim mono">${VERSION}</p>`, false, void 0, UI.close);
    $("optFx").onchange = (e) => {
      s.opt.fx = e.target.checked ? 1 : 0;
      setFx(!!s.opt.fx);
    };
    $("optVol").oninput = (e) => {
      s.opt.vol = +e.target.value;
      setVolumes({ master: s.opt.vol });
    };
    $("optNoise").oninput = (e) => {
      s.opt.noise = +e.target.value;
      setVolumes({ noise: s.opt.noise });
    };
    $("expBtn").onclick = () => {
      const t = encodeSave(s);
      $("saveTxt").value = t;
      navigator.clipboard?.writeText(t).then(() => toast(UI.copied)).catch(() => {
      });
    };
    $("impBtn").onclick = () => {
      const st = decodeSave($("saveTxt").value);
      if (!st) {
        toast(UI.bad);
        return;
      }
      s = st;
      save();
      location.reload();
    };
    $("resBtn").onclick = (e) => {
      if (e.target.dataset.sure) {
        localStorage.removeItem(SAVE_KEY);
        s = newState();
        location.reload();
        return;
      }
      e.target.dataset.sure = "1";
      e.target.textContent = UI.resetConfirm;
    };
  }
  var toastT = 0;
  function toast(t) {
    const el = $("toast");
    el.textContent = t;
    el.hidden = false;
    clearTimeout(toastT);
    toastT = window.setTimeout(() => el.hidden = true, 3200);
  }

  // src/main.ts
  start();
})();
