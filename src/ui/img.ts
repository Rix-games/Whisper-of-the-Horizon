// Obrázky z Gemini (web/obrazky). Když obrázek chybí nebo se nenačte, hra kreslí náhradu kódem.
const FILES = {
  bg: "pozadi-hvezdy.webp",
  asteroid: "kap1-asteroid.webp",
  drone: "kap1-dron.webp",
  platform: "kap1-plosina.webp",
  system: "kap1-soustava.webp",
  intro1: "kap1-uvod.webp",
  starBlue: "kap2-aldra-modry.webp",
  starRed: "kap2-aldra-rudy.webp",
  starWR: "kap2-aldra-wolf-rayet.webp",
  starCollapse: "kap2-aldra-kolaps.webp",   // volitelný – bez něj se ve stadiu Kolaps kreslí Wolf-Rayet
  collector: "kap2-kolektor.webp",
  factory: "kap2-tovarna.webp",
  near: "kap2-okoli.webp",
  intro2: "kap2-uvod.webp",
  galaxy: "kap3-galaxie.webp",       // hrací plocha (uzly podle core/galaxy.ts GIMG)
  galaxySide: "kap3-galaxie-bok.webp",
  hole3: "kap3-dira.webp",
  disk3: "kap3-disk.webp",          // Kap. 3 Díra: disk shora (stín = 20,8 % šířky)
  clump3: "kap3-chuchvalec.webp",
  tug3: "kap3-remorker.webp",
  system3: "kap3-soustava.webp",
  near3: "kap3-okoli.webp",
  sgra: "kap3-sgr-a.webp",
  colony: "kap3-kolonie.webp",
  beacon: "kap3-majak.webp",
  sail: "kap3-plachta.webp",
  intro4: "kap3-uvod.webp",
  intro3: "kap3-dira-uvod.webp",   // zatím chybí – úvod Kap. 3 Díra
};
export type ImgKey = keyof typeof FILES;
const cache: Partial<Record<ImgKey, HTMLImageElement>> = {};
const ok: Partial<Record<ImgKey, boolean>> = {};
export const imgSrc = (k: ImgKey) => "obrazky/" + FILES[k];
/** Vrátí načtený obrázek, nebo null (pak se kreslí kódem). */
export function img(k: ImgKey): HTMLImageElement | null {
  if (typeof Image === "undefined") return null;
  if (!cache[k]) {
    const im = new Image();
    im.onload = () => (ok[k] = true);
    im.onerror = () => (ok[k] = false);
    im.src = imgSrc(k);
    cache[k] = im;
  }
  return ok[k] ? cache[k]! : null;
}
export function preload() { for (const k of Object.keys(FILES) as ImgKey[]) img(k); }
