// Tichý vesmírný ambient syntetizovaný ve Web Audio – žádné zvukové soubory.
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let pulseTimer: number | undefined;

function build() {
  ctx = new AudioContext();
  master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);

  // hluboký šum (hnědý) přes dolní propust, pomalu se vlní
  const len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
  const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 260;
  const ng = ctx.createGain(); ng.gain.value = 0.35;
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05;
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.15;
  lfo.connect(lfoGain).connect(ng.gain);
  noise.connect(lp).connect(ng).connect(master);
  noise.start(); lfo.start();

  // dva tiché tóny, mírně rozladěné (kvinta)
  for (const [f, v] of [[55, 0.05], [82.6, 0.035], [110.3, 0.015]] as [number, number][]) {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
    const g = ctx.createGain(); g.gain.value = v;
    const trem = ctx.createOscillator(); trem.frequency.value = 0.07 + Math.random() * 0.05;
    const tg = ctx.createGain(); tg.gain.value = v * 0.6;
    trem.connect(tg).connect(g.gain);
    o.connect(g).connect(master); o.start(); trem.start();
  }
}

/** Jemný puls každých 7,3 s – stejný jako signál v příběhu. */
function ping(freq = 880, vol = 0.04, len = 2.2) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = freq;
  const g = ctx.createGain(); const now = ctx.currentTime;
  g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(vol, now + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, now + len);
  o.connect(g).connect(master); o.start(now); o.stop(now + len + 0.1);
}

export function setSound(on: boolean, pulse: boolean) {
  if (on && !ctx) build();
  if (!ctx || !master) return;
  if (on) void ctx.resume();
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setTargetAtTime(on ? 0.8 : 0, now, 0.6);
  clearInterval(pulseTimer);
  if (on && pulse) pulseTimer = window.setInterval(() => ping(1320, 0.012, 1.6), 7300);
  if (!on) window.setTimeout(() => { if (ctx && master && master.gain.value < 0.01) void ctx.suspend(); }, 3000);
}

/** Zvuk milníku (záznam v deníku). */
export function chime() { ping(660, 0.03, 2.8); setTimeout(() => ping(990, 0.02, 2.4), 180); }
