export let ctx = null;
export let master = null;
export let melodyBus = null;
export const DEFAULT_VOLUMES = { master: 0.8, melody: 1, noise: 0.7, drone: 1, pulse: 1, chime: 1 };
export let vols = { ...DEFAULT_VOLUMES };
export let soundOn = false;
export const bus: Record<string, any> = {};
export let pulseTimer;
export let melodyTimer;
export const SCALE = [220, 261.63, 293.66, 329.63, 369.99, 392, 440, 523.25, 587.33, 659.25];
export let degree = 4;
export function makeReverb(c) {
  const len = Math.floor(c.sampleRate * 4), ir = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = ir.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
  }
  const conv = c.createConvolver();
  conv.buffer = ir;
  return conv;
}
export function note(freq, when, len, vol) {
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
export function phrase() {
  if (!ctx) return;
  let t2 = ctx.currentTime + 0.1;
  const count = 4 + Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    degree = Math.max(0, Math.min(SCALE.length - 1, degree + [-2, -1, -1, 1, 1, 2, 0][Math.floor(Math.random() * 7)]));
    const len = 3 + Math.random() * 3;
    note(SCALE[degree], t2, len, 0.022 + Math.random() * 0.012);
    if (Math.random() < 0.25) note(SCALE[Math.max(0, degree - 2)] / 2, t2 + 0.4, len + 1.5, 0.014);
    t2 += 1.3 + Math.random() * 1.5;
  }
  const rest = t2 - ctx.currentTime + 2 + Math.random() * 3;
  melodyTimer = window.setTimeout(phrase, rest * 1e3);
}
export function build() {
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
export function ping(ch, freq = 880, vol = 0.04, len = 2.2) {
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
export function setVolumes(v) {
  vols = { ...vols, ...v };
  if (!ctx || !master) return;
  const now = ctx.currentTime;
  for (const ch of Object.keys(bus)) bus[ch].gain.setTargetAtTime(vols[ch], now, 0.05);
  if (soundOn) {
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(vols.master, now, 0.05);
  }
}
export function setSound(on, pulse2) {
  soundOn = on;
  if (on && !ctx) build();
  if (!ctx || !master) return;
  if (on) void ctx.resume();
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setTargetAtTime(on ? vols.master : 0, now, 0.6);
  clearInterval(pulseTimer);
  if (on && pulse2) pulseTimer = window.setInterval(() => ping("pulse", 1320, 0.012, 1.6), 7300);
  clearTimeout(melodyTimer);
  if (on) melodyTimer = window.setTimeout(phrase, 1500);
  if (!on) window.setTimeout(() => {
    if (ctx && master && master.gain.value < 0.01) void ctx.suspend();
  }, 3e3);
}
export function chime() {
  ping("chime", 660, 0.03, 2.8);
  setTimeout(() => ping("chime", 990, 0.02, 2.4), 180);
}
export function boom() {
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
