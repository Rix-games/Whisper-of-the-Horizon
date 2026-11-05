// Formátování čísel se skutečnými jednotkami a předponami SI.
const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const PREFIX = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'R', 'Q'];

let decimalSep = ',';
export function setDecimalSeparator(sep: string) { decimalSep = sep; }

function fixed(n: number, d: number) { return n.toFixed(d).replace('.', decimalSep); }

/** 3,42 · 10²⁷ */
export function sci(n: number, digits = 2): string {
  if (n === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(n)));
  const m = n / Math.pow(10, e);
  return `${fixed(m, digits)}·10${String(e).split('').map((c) => SUP[c] ?? c).join('')}`;
}

/** Krátké číslo bez jednotky: 12, 3,4, 1 250, 12,5 tis. */
export function num(n: number): string {
  const a = Math.abs(n);
  if (a === 0) return '0';
  if (a < 1) return fixed(n, 2);
  if (a < 10) return fixed(n, a % 1 ? 1 : 0);
  if (a < 1e4) return Math.floor(n).toLocaleString('cs-CZ').replace(/\s/g, ' ');
  if (a < 1e15) {
    const u = ['', 'tis.', 'mil.', 'mld.', 'bil.'];
    const e = Math.min(4, Math.floor(Math.log10(a) / 3));
    return `${fixed(n / Math.pow(1000, e), 2)} ${u[e]}`;
  }
  return sci(n);
}

/** Hodnota s jednotkou a předponou SI: 1,23 MW, 4,5 GJ, 12 kB. */
export function si(n: number, unit: string): string {
  const a = Math.abs(n);
  if (a < 1) return `${fixed(n, a === 0 ? 0 : 2)} ${unit}`;
  const e = Math.floor(Math.log10(a) / 3);
  if (e >= PREFIX.length) return `${sci(n)} ${unit}`;
  const v = n / Math.pow(1000, e);
  const d = v >= 100 ? 0 : v >= 10 ? 1 : 2;
  return `${fixed(v, e === 0 && v % 1 === 0 ? 0 : d)} ${PREFIX[e]}${unit}`;
}

/** Hmotnost: kg, pak tuny bez předpon (kt, Mt působí cize), nad milion tun mocnina v kg. */
export function mass(kg: number): string {
  const a = Math.abs(kg);
  if (a < 1000) return `${fixed(kg, a < 10 && a % 1 ? 1 : 0)} kg`;
  if (a < 1e9) {
    const t = kg / 1000, at = Math.abs(t);
    if (at < 100) return `${fixed(t, at < 10 ? 2 : 1)} t`;
    return `${Math.floor(t).toLocaleString('cs-CZ').replace(/\s/g, '\u00A0')} t`;
  }
  return `${sci(kg)} kg`;
}

export function bytes(b: number): string { return si(b, 'B'); }
export function energy(j: number): string { return si(j, 'J'); }
export function power(w: number): string { return si(w, 'W'); }

export function duration(sec: number): string {
  sec = Math.max(0, Math.ceil(sec));
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  if (h) return `${h} h ${String(m).padStart(2, '0')} min`;
  if (m) return `${m} min ${String(s).padStart(2, '0')} s`;
  return `${s} s`;
}

export function kValue(k: number): string { return fixed(k, 2); }
