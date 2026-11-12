import { mass, count } from "../core/format";
export const fmtOre = (v: number) => mass(v);
export const fmtN = (v: number) => count(v);
