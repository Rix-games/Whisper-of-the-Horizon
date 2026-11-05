# Šepot Horizontu

*Whisper of the Horizon*

**▶ Hrát: [rix-games.github.io/Whisper-of-the-Horizon](https://rix-games.github.io/Whisper-of-the-Horizon/)**

Šepot Horizontu je inkrementální hra o vesmíru, kterou si zahraješ v prohlížeči. Na začátku máš jednu těžební platformu na kusu skály u cizí hvězdy. Na konci bereš energii z celých galaxií.

Se Zemí už dlouho není spojení. Platforma má pořád jeden rozkaz, těžit. A někde ve tmě se každých pár sekund ozve puls, který tam nemá co dělat.

- Ovládání je jednoduché, většinou jen klikáš a rozhoduješ, co postavit dál.
- Na dohrání počítej zhruba se sto hodinami. Příběh se odvíjí v krátkých zápisech z palubního deníku.
- Hodně jsem si dal záležet na skutečné fyzice. Kde už věda nic neví, pomáhám si teoriemi a teprve potom fantazií.

## Co tě čeká

Začínáš na jednom asteroidu a postupně se dostaneš až k nadkupě galaxií. Každá kapitola přinese něco nového k hraní a ukáže větší kus vesmíru.

1. **Platforma.** Těžíš rudu, stavíš drony a tavírny, létáš po soustavě a pátráš, odkud se bere ten puls.
2. **Hvězda.** Kolem hvězdy postavíš Dysonův roj a začneš těžit přímo z ní. Hvězda stárne, mění barvu i velikost a nakonec se zhroutí.
3. **Horizont.** Z hvězdy zbyla černá díra a i z té se dá brát energie. Akreční disk, rotace díry, dilatace času, Hawkingovo záření.
4. **Most.** Červí díry podle teorií, které fyzici opravdu vymysleli. Nové soustavy, srážky neutronových hvězd, temná hmota.
5. **Šepot.** Cesta za hranici galaxie. Tady se konečně dozvíš, co je ten puls zač.

Konců je víc a k dalšímu se dostaneš tím, že budeš hrát dál. Nemusíš začínat znovu. Po dohrání se otevře nekonečný mód, kde můžeš růst i za hranici pozorovatelného vesmíru.

## Na čem hra stojí

**Skutečná čísla.** Jak daleko jsi, ukazuje Kardaševova škála. Je to opravdová stupnice, podle které astronomové dělí civilizace podle toho, kolik energie dokážou využít. Až dosáhneš Typu II, máš k dispozici výkon celé hvězdy, ve skutečných wattech.

**Skutečná fyzika.** Hvězdy stárnou tak, jak to popisuje astrofyzika. Černé díry dávají tolik energie, kolik by dávaly doopravdy. Červí díry vychází z teorií od Einsteina až po dnešek. Občas k novému objevu přibude krátká zajímavost z vědy.

**Tempo.** Postupuješ po malých krocích k čím dál větším věcem. Pořád je co dělat, ale nečekej ohňostroj odměn každých deset vteřin. Kdo má rád pomalé budování a trochu grindu, bude tu spokojený. Když nehraješ, hra za tebe nic důležitého neudělá. Offline nasbíráš jen malé zásoby, dopředu se posouváš hraním.

**Styl.** Spíš tajemno a úžas než akce. Začínáš u přístrojové desky platformy a s postupem uvidíš svou hvězdu, celou soustavu, galaxii a ještě dál.

## Stav vývoje

Hru vydávám po kapitolách. Každá verze se dá hrát a uložená hra se přenese do další.

| Verze | Obsah | Stav |
| --- | --- | --- |
| 0.1 | Kapitola 1: Platforma | vydáno |
| 0.2 | Kapitola 2: Hvězda | v plánu |
| 0.3 | Kapitola 3: Horizont | v plánu |
| 0.4 | Kapitola 4: Most | v plánu |
| 1.0 | Kapitola 5: Šepot, konce, anglická verze | v plánu |
| později | nekonečný mód, verze pro mobil | v plánu |

Co je nového v jednotlivých verzích, najdeš v [CHANGELOG.md](CHANGELOG.md).

## Jak hrát

Hraje se v prohlížeči na počítači. Nic neinstaluješ a nepotřebuješ žádný účet, stačí otevřít odkaz nahoře.

- **Uložení:** postup se ukládá v prohlížeči. V nastavení hry si ho můžeš vyexportovat a nahrát jinde, třeba na jiném počítači.
- **Jazyk:** čeština, angličtina přijde později.

## Pro vývojáře

Hra je napsaná v TypeScriptu bez herního enginu. Herní logika (`src/core`) nezávisí na prohlížeči, takže ji jde spustit i v simulaci nebo později na mobilu.

```bash
npm install
npm run build     # přeloží src/ do web/js
npm run serve     # spustí hru na http://localhost:3000
npm run sim       # vyvažovací simulace kapitoly
```

Po každém vydání do větve `main` se hra sama zveřejní přes GitHub Pages.

## Autor

**Rix** · [Rix Games](https://github.com/Rix-games)

Budu rád za každý nápad nebo připomínku. Stačí založit [issue](https://github.com/Rix-games/Whisper-of-the-Horizon/issues).
