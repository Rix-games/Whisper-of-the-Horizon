// Události, běhové hodnoty a drobné pomocníky sdílené jádrem i kapitolami.
import type { State, Cur } from "./state";

type Ev = { type: string; id?: string; v?: any };
const listeners: ((e: Ev) => void)[] = [];
export function on(f: (e: Ev) => void) { listeners.push(f); }
export function emit(type: string, id?: string, v?: any) { for (const f of listeners) f({ type, id, v }); }

/** Běhové (neukládané) hodnoty. */
export const RT = {
  inc: { ore: 0, plasma: 0, sails: 0 } as Record<Cur, number>,
  rate: { ore: 0, plasma: 0, sails: 0 } as Record<Cur, number>,
  P: 0, jt: 0,
};
export const n = (s: State, id: string) => s.b[id] || 0;
export const has = (s: State, id: string) => !!s.r[id];
export const did = (s: State, id: string) => !!s.mis[id];
/** Po 25 kusech dvojnásobek (milník). */
export const mile = (cnt: number) => Math.pow(2, Math.floor(cnt / 25));
export function gain(s: State, cur: Cur, v: number) { s.res[cur] += v; s.tot[cur] += v; RT.inc[cur] += v; }
