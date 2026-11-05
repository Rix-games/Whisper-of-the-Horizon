import { cs, type Dict } from './cs.js';

const dicts: Record<string, Dict> = { cs };
let current: Dict = cs;

export function setLang(lang: string) { current = dicts[lang] ?? cs; }

/** Přeloží klíč "ui.tabs.build" a dosadí {proměnné}. */
export function t(key: string, vars?: Record<string, string | number>): string {
  let v: unknown = current;
  for (const part of key.split('.')) v = (v as Record<string, unknown> | undefined)?.[part];
  if (typeof v !== 'string') {
    let fb: unknown = cs;
    for (const part of key.split('.')) fb = (fb as Record<string, unknown> | undefined)?.[part];
    v = typeof fb === 'string' ? fb : key;
  }
  return vars ? (v as string).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? '')) : (v as string);
}
