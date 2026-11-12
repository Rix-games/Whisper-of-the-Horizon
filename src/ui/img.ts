// Obrázky z Gemini (web/obrazky). Když obrázek chybí nebo se nenačte, hra kreslí náhradu kódem.
const FILES = {
  bg: "pozadi-hvezdy.webp",
  asteroid: "kap1-asteroid.webp",
  drone: "kap1-dron.webp",
  platform: "kap1-plosina.webp",
  system: "kap1-soustava.webp",
  intro1: "kap1-uvod.webp",
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
