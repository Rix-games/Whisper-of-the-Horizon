
export const SUP = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
export const PREFIX = ["", "k", "M", "G", "T", "P", "E", "Z", "Y", "R", "Q"];
export const decimalSep = ",";
export function fixed(n, d) {
  return n.toFixed(d).replace(".", decimalSep);
}
export function sci(n, digits = 2) {
  if (n === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(n)));
  const m = n / Math.pow(10, e);
  return `${fixed(m, digits)}·10${String(e).split("").map((c) => SUP[c] ?? c).join("")}`;
}
export function num(n) {
  const a = Math.abs(n);
  if (a === 0) return "0";
  if (a < 1) return fixed(n, 2);
  if (a < 10) return fixed(n, a % 1 ? 1 : 0);
  if (a < 1e4) return Math.floor(n).toLocaleString("cs-CZ").replace(/\s/g, " ");
  if (a < 1e15) {
    const u = ["", "tis.", "mil.", "mld.", "bil."];
    const e = Math.min(4, Math.floor(Math.log10(a) / 3));
    return `${fixed(n / Math.pow(1e3, e), 2)} ${u[e]}`;
  }
  return sci(n);
}
export function si(n, unit) {
  const a = Math.abs(n);
  if (a < 1) return `${fixed(n, a === 0 ? 0 : 2)} ${unit}`;
  const e = Math.floor(Math.log10(a) / 3);
  if (e >= PREFIX.length) return `${sci(n)} ${unit}`;
  const v = n / Math.pow(1e3, e);
  const d = v >= 100 ? 0 : v >= 10 ? 1 : 2;
  return `${fixed(v, e === 0 && v % 1 === 0 ? 0 : d)} ${PREFIX[e]}${unit}`;
}
export function mass(kg) {
  const a = Math.abs(kg);
  if (a < 1e3) return `${fixed(kg, a < 10 && a % 1 ? 1 : 0)} kg`;
  if (a < 1e9) {
    const t2 = kg / 1e3, at = Math.abs(t2);
    if (at < 100) return `${fixed(t2, at < 10 ? 2 : 1)} t`;
    return `${Math.floor(t2).toLocaleString("cs-CZ").replace(/\s/g, " ")} t`;
  }
  return `${sci(kg)} kg`;
}
export function bytes(b) {
  return si(b, "B");
}
export function energy(j) {
  return si(j, "J");
}
export function power(w) {
  return si(w, "W");
}
export function duration(sec) {
  sec = Math.max(0, Math.ceil(sec));
  const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  if (h) return `${h} h ${String(m).padStart(2, "0")} min`;
  if (m) return `${m} min ${String(s).padStart(2, "0")} s`;
  return `${s} s`;
}
export function kValue(k) {
  return fixed(k, 2);
}

/** Počet kusů / bezrozměrné číslo: SI předpony, pak vědecký zápis. */
export function count(n) {
  const a = Math.abs(n);
  if (a < 1e3) return a < 10 && a % 1 ? fixed(n, 1) : String(Math.floor(n));
  const e = Math.floor(Math.log10(a) / 3);
  if (e >= PREFIX.length) return sci(n);
  const v = n / Math.pow(1e3, e);
  return `${fixed(v, v >= 100 ? 0 : v >= 10 ? 1 : 2)} ${PREFIX[e]}`;
}
export function pct(f) {
  if (f <= 0) return "0 %";
  if (f < 1e-4) return "< 0,01 %";
  if (f < 0.01) return `${fixed(f * 100, 2)} %`;
  return `${fixed(f * 100, f < 0.1 ? 1 : 0)} %`;
}
/** Násobek pro "potřebuješ N× víc". */
export function times(x) {
  if (x < 10) return `${fixed(x, 1)}×`;
  if (x < 1e4) return `${Math.round(x).toLocaleString("cs-CZ").replace(/\s/g, " ")}×`;
  return `${sci(x, 1)}×`;
}
export function mult(x) {
  return `×${x < 10 ? fixed(x, x % 1 ? 2 : 0).replace(/,?0+$/, (m) => (m.startsWith(",") ? "" : m)) : count(x)}`;
}
