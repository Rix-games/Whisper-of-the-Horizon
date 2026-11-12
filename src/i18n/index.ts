// Texty hry. Kapitoly: cs1.ts, cs2.ts, cs3.ts. Obecné rozhraní: UI níže.
import { CS1 } from "./cs1";
import { CS2 } from "./cs2";
import { CS3 } from "./cs3";

export const TX: Record<number, typeof CS1 & { layer?: string[] }> = { 1: CS1, 2: CS2 as any, 3: CS3 as any };
export const tx = (ch: number) => TX[ch];
/** Najde text stavby/výzkumu/mise/útržku v libovolné kapitole. */
export function find(kind: "b" | "r" | "m" | "jour", id: string): any {
  for (const k of [1, 2, 3]) { const v = (TX[k] as any)[kind][id]; if (v) return v; }
  return null;
}

export const UI = {
  game: "Šepot Horizontu",
  res: { ore: "Ruda", plasma: "Plazma", sails: "Plachty", energy: "Energie", data: "Data" } as Record<string, string>,
  tabs: { build: "Stavby", research: "Výzkum", map: "Mapa", detail: "Detail" } as Record<string, string>,
  ladder: ["Těleso", "Hvězda", "Soustava", "Okolí", "Galaxie", "Místní skupina", "Laniakea"],
  power: "Výkon",
  perSec: "/s",
  stage: "Stadium",
  goal: "Cíl stadia",
  stageHidden: "Zatím neznámé",
  unitsTip: "Energie se ukládá v joulech (J) a platí se jí mise. Přírůstek je výkon ve wattech (W): 1 W = 1 J každou sekundu.",
  noiseVol: "Šum vesmíru",
  kBelow: "K < 0",
  toType: (k: number, x: string) => `Do Typu ${["", "I", "II", "III"][k] || k}: ${x} víc výkonu`,
  typeMax: "Typ III dosažen",
  needMore: (x: string) => `Potřebuješ ${x} víc výkonu`,
  stageDone: "Všechna stadia hotová",
  finalHint: (n: string) => `Dokonči výzkum „${n}“`,
  buy: "Koupit", max: "Max", maxed: "Hotovo", level: "úr.",
  newer: "Nejnovější nahoře",
  researchDone: "Hotový výzkum",
  researchNote: "Data sbírají skenery a výpočetní jádra. Nové směry výzkumu se objeví s postupem.",
  researchNone: "Teď není co zkoumat. Další směr se objeví s postupem.",
  researchReady: "Připraveno",
  researchIn: (t: string) => `za ~${t}`,
  detailNote: { 1: "Čím hlouběji laser řeže, tím bohatší ruda.", 2: "Aldra prochází životem hvězdy. Každá fáze dává jiné světlo.", 3: "Kolonie se šíří galaxií. Hranice ukazuje dosah svazku." } as Record<number, string>,
  missionsDone: "Splněné mise",
  send: "Vyslat Vesper", running: "Vesper letí", busy: "Vesper je na cestě",
  duration: "Let",
  autoOn: "Zapnuto", autoOff: "Vypnuto",
  autoAsm: (names: string[]) => `Autonomní montáž staví: ${names.join(", ")}`,
  autoDock: "Montážní dok staví drony",
  autoFact: "Továrny vypouštějí kolektory",
  journal: "Palubní deník",
  report: "Hlášení",
  diary: "Deník",
  fact: "Zajímavost",
  settings: "Nastavení",
  sound: "Zvuk", effects: "Efekty", volume: "Hlasitost",
  export: "Uložit do textu", import: "Nahrát z textu", reset: "Začít znovu",
  resetConfirm: "Opravdu? Klikni znovu – hra se smaže",
  copied: "Uložená hra je ve schránce.",
  loaded: "Hra nahrána.",
  bad: "Text nejde přečíst jako uložená hra.",
  ok: "Pokračovat", cancel: "Zrušit", close: "Zavřít",
  offline: "Během tvé nepřítomnosti",
  offlineNote: "Bez tebe platforma jede jen na rezervy.",
  locked: "Zatím mimo dosah",
  passiveView: "Pohled – hraje se jinde",
  next: "Další kapitola",
  theEnd: "Konec dostupného obsahu",
  theEndBody: "Kapitola 4 se připravuje. Galaxie dál svítí a můžeš osidlovat dál.",
  ktitle: "Kardaševova škála",
  kbody: "Měří civilizaci podle výkonu, který využívá. K = (log₁₀ P − 6) / 10. Výkon je ve wattech (W), uložená energie v joulech (J): 1 W = 1 J za sekundu.",
  types: {
    1: "Typ I – výkon celé planety, všechno světlo, které na ni dopadá (~10¹⁶ W).",
    2: "Typ II – výkon celé hvězdy. Slunce vyzařuje 3,8·10²⁶ W.",
    3: "Typ III – výkon celé galaxie, zhruba 5·10³⁶ W pro Mléčnou dráhu.",
  } as Record<number, string>,
  kmore: "Další typy se ukážou, až se k nim přiblížíš.",
  detail: { 1: "Řez asteroidem", 2: "Život Aldry", 3: "Galaxie" } as Record<number, string>,
};
