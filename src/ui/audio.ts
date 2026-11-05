// Tichý vesmírný ambient syntetizovaný ve Web Audio – žádné zvukové soubory.
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let melodyBus: GainNode | null = null;
/** Samostatné větve zvuku, každá s vlastní hlasitostí. */
export type Channel = 'melody' | 'noise' | 'drone' | 'pulse' | 'chime';
export type Volumes = { master: number } & Record<Channel, number>;
export const DEFAULT_VOLUMES: Volumes = { master: 0.8, melody: 1, noise: 0.7, drone: 1, pulse: 1, chime: 1 };
let vols: Volumes = { ...DEFAULT_VOLUMES };
let soundOn = false;
const bus: Partial<Record<Channel, GainNode>> = {};
let pulseTimer: number | undefined;
let melodyTimer: number | undefined;

// Stupnice pro melodii: A dórská (A, C, D, E, F#, G) přes dvě oktávy, ladí s hlubokým tónem 55 Hz (A1).
const SCALE = [220, 261.63, 293.66, 329.63, 369.99, 392, 440, 523.25, 587.33, 659.25];
let degree = 4;

/** Dozvuk z uměle vyrobené odezvy: šum, který během ~4 s doznívá. */
function makeReverb(c: AudioContext): ConvolverNode {
  const len = Math.floor(c.sampleRate * 4), ir = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = ir.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
  }
  const conv = c.createConvolver(); conv.buffer = ir; return conv;
}

/** Jeden měkký tón melodie: dva lehce rozladěné sinusy, pomalý náběh a dlouhé doznění. */
function note(freq: number, when: number, len: number, vol: number) {
  if (!ctx || !melodyBus) return;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(vol, when + 0.9);
  g.gain.setTargetAtTime(0, when + len * 0.5, len * 0.3);
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1600;
  g.connect(lp).connect(melodyBus);
  for (const det of [-4, 4]) {
    const o = ctx.createOscillator(); o.type = det < 0 ? 'sine' : 'triangle'; o.frequency.value = freq; o.detune.value = det;
    o.connect(g); o.start(when); o.stop(when + len + 2);
  }
}

/** Fráze o 4–7 tónech, které se volně potulují po stupnici, pak krátká pauza. */
function phrase() {
  if (!ctx) return;
  let t = ctx.currentTime + 0.1;
  const count = 4 + Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    degree = Math.max(0, Math.min(SCALE.length - 1, degree + [-2, -1, -1, 1, 1, 2, 0][Math.floor(Math.random() * 7)]));
    const len = 3 + Math.random() * 3;
    note(SCALE[degree], t, len, 0.022 + Math.random() * 0.012);
    if (Math.random() < 0.25) note(SCALE[Math.max(0, degree - 2)] / 2, t + 0.4, len + 1.5, 0.014); // občas tichý spodní tón
    t += 1.3 + Math.random() * 1.5;
  }
  const rest = (t - ctx.currentTime) + 2 + Math.random() * 3;
  melodyTimer = window.setTimeout(phrase, rest * 1000);
}

function build() {
  ctx = new AudioContext();
  master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
  for (const ch of ['melody', 'noise', 'drone', 'pulse', 'chime'] as Channel[]) {
    const g = ctx.createGain(); g.gain.value = vols[ch]; g.connect(master); bus[ch] = g;
  }

  // hluboký šum (hnědý) přes dolní propust, pomalu se vlní
  const len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
  const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 260;
  const ng = ctx.createGain(); ng.gain.value = 0.18;
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05;
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.08;
  lfo.connect(lfoGain).connect(ng.gain);
  noise.connect(lp).connect(ng).connect(bus.noise!);
  noise.start(); lfo.start();

  // dva tiché tóny, mírně rozladěné (kvinta)
  for (const [f, v] of [[55, 0.05], [82.6, 0.035], [110.3, 0.015]] as [number, number][]) {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
    const g = ctx.createGain(); g.gain.value = v;
    const trem = ctx.createOscillator(); trem.frequency.value = 0.07 + Math.random() * 0.05;
    const tg = ctx.createGain(); tg.gain.value = v * 0.6;
    trem.connect(tg).connect(g.gain);
    o.connect(g).connect(bus.drone!); o.start(); trem.start();
  }

  // melodie: suchý signál potichu, většina jde přes dozvuk
  melodyBus = ctx.createGain(); melodyBus.gain.value = 1;
  const dry = ctx.createGain(); dry.gain.value = 0.35;
  const wet = ctx.createGain(); wet.gain.value = 0.9;
  const rev = makeReverb(ctx);
  melodyBus.connect(dry).connect(bus.melody!);
  melodyBus.connect(rev).connect(wet).connect(bus.melody!);
}

/** Jemný puls každých 7,3 s – stejný jako signál v příběhu. */
function ping(ch: Channel, freq = 880, vol = 0.04, len = 2.2) {
  if (!ctx || !bus[ch]) return;
  const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = freq;
  const g = ctx.createGain(); const now = ctx.currentTime;
  g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(vol, now + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, now + len);
  o.connect(g).connect(bus[ch]!); o.start(now); o.stop(now + len + 0.1);
}

/** Nastaví hlasitosti (0–1). Platí hned, i když zvuk ještě neběží. */
export function setVolumes(v: Partial<Volumes>) {
  vols = { ...vols, ...v };
  if (!ctx || !master) return;
  const now = ctx.currentTime;
  for (const ch of Object.keys(bus) as Channel[]) bus[ch]!.gain.setTargetAtTime(vols[ch], now, 0.05);
  if (soundOn) { master.gain.cancelScheduledValues(now); master.gain.setTargetAtTime(vols.master, now, 0.05); }
}

export function setSound(on: boolean, pulse: boolean) {
  soundOn = on;
  if (on && !ctx) build();
  if (!ctx || !master) return;
  if (on) void ctx.resume();
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setTargetAtTime(on ? vols.master : 0, now, 0.6);
  clearInterval(pulseTimer);
  if (on && pulse) pulseTimer = window.setInterval(() => ping('pulse', 1320, 0.012, 1.6), 7300);
  clearTimeout(melodyTimer);
  if (on) melodyTimer = window.setTimeout(phrase, 1500);
  if (!on) window.setTimeout(() => { if (ctx && master && master.gain.value < 0.01) void ctx.suspend(); }, 3000);
}

/** Zvuk milníku (záznam v deníku). */
export function chime() { ping('chime', 660, 0.03, 2.8); setTimeout(() => ping('chime', 990, 0.02, 2.4), 180); }
