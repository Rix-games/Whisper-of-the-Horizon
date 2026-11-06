"use strict";
(() => {
  // src/i18n/cs.ts
  var cs = {
    title: "\u0160epot Horizontu",
    res: {
      ore: "Ruda",
      metal: "Kov",
      energy: "Energie",
      data: "Data",
      plasma: "Plazma"
    },
    resOf: { ore: "rudy", metal: "kovu", energy: "energie", data: "dat", plasma: "plazmatu" },
    unit: {
      kg: { name: "kg \xB7 kilogram", text: "Hmotnost. 1 t = 1 000 kg. Mal\xFD asteroid o pr\u016Fm\u011Bru 1 km v\xE1\u017E\xED zhruba 10\xB9\xB2 kg." },
      J: { name: "J \xB7 joule", text: "Energie. Jeden joule dod\xE1 v\xFDkon 1 W za 1 sekundu. Slunce vyz\xE1\u0159\xED ka\u017Edou sekundu 3,8\xB710\xB2\u2076 J." },
      W: { name: "W \xB7 watt", text: "V\xFDkon, tedy energie za sekundu. LED \u017E\xE1rovka m\xE1 kolem 10 W, cel\xE9 lidstvo dnes asi 2\xB710\xB9\xB3 W." },
      B: { name: "B \xB7 bajt", text: "Mno\u017Estv\xED dat. 1 kB = 1 000 B, 1 MB = milion B. V\u0161echna data na sv\u011Bt\u011B maj\xED dohromady odhadem 10\xB2\xB3 B." },
      K: { name: "Karda\u0161evovo \u010D\xEDslo", text: "Ukazuje, kolik energie civilizace dok\xE1\u017Ee vyu\u017E\xEDt. Ka\u017Ed\xFD cel\xFD stupe\u0148 znamen\xE1 zhruba deset miliardkr\xE1t v\u011Bt\u0161\xED v\xFDkon. Nula odpov\xEDd\xE1 1 MW, v\xFDkonu velk\xE9 v\u011Btrn\xE9 turb\xEDny, pod n\xED vych\xE1z\xED \u010D\xEDslo z\xE1porn\xE9. Lidstvo je dnes na 0,73. Typ I je v\xFDkon cel\xE9 planety, Typ II cel\xE9 hv\u011Bzdy." }
    },
    ui: {
      perSec: "/s",
      kardashevLabel: "\xDArove\u0148 civilizace",
      kBelow: "K < 0",
      toTypeI: "Do Typu I pot\u0159ebuje\u0161 {n}\xD7 v\xEDc v\xFDkonu",
      toTypeIdone: "Typ I dosa\u017Een",
      toTypeII: "Do Typu II (v\xFDkon Slunce) pot\u0159ebuje\u0161 {n}\xD7 v\xEDc",
      toTypeIIdone: "Typ II dosa\u017Een",
      toFullStar: "Typ II (v\xFDkon Slunce) spln\u011Bn. Cel\xE1 Aldra: je\u0161t\u011B {n}\xD7 v\xEDc",
      toNext: "Kapitola 3 se p\u0159ipravuje",
      starAge: "Ald\u0159e zb\xFDv\xE1 {t}",
      clockYears: "1 s \u2248 {t}",
      day: "Den {n}",
      clockScale: "1 s \u2248 1 den",
      power: "V\xFDkon",
      tabs: { build: "Stavby", research: "V\xFDzkum", map: "Mapa", star: "Hv\u011Bzda", settings: "Nastaven\xED" },
      buy: "Postavit",
      buyN: "Postavit \xD7{n}",
      sell: "Rozebrat",
      sellN: "Rozebrat \xD7{n}",
      buyMode: "N\xE1kup",
      research: "Zkoumat",
      turnOff: "Vypnout",
      turnOn: "Zapnout",
      running: "b\u011B\u017E\xED na {n} %",
      stopped: "vypnuto",
      starved: "stoj\xED, chyb\xED vstup",
      each: "ka\u017Ed\xFD",
      makes: "postav\xED {n} dron\u016F/s",
      pieces: "{n} ks",
      price: "Cena",
      one: "1 kus",
      all: "V\u0161echny",
      consumes: "spot\u0159eba {v}",
      researchDone: "Hotovo",
      researchLocked: "\u010Cek\xE1 na objev",
      researchNone: "Te\u010F nen\xED co zkoumat. Dal\u0161\xED sm\u011Bry otev\u0159e postup a expedice.",
      needs: "Odemkne se, a\u017E {x}.",
      asteroid: "Asteroid Ceres-IX",
      perClick: "+{v} / klik",
      mineAria: "T\u011B\u017Eit rudu",
      robotClicks: "Ru\u010Dn\xED t\u011B\u017Eba reaguje jen na ru\u010Dn\xED klik\xE1n\xED. Pro automatickou t\u011B\u017Ebu je tu v\xFDzkum Asistent t\u011B\u017Eby.",
      hint: "Klikej na asteroid a t\u011B\u017E rudu. Za 10 kg rudy postav prvn\xEDho drona.",
      close: "Zav\u0159\xEDt",
      breakdown: { prod: "V\xFDroba", cons: "Spot\u0159eba", net: "Celkem", reactor: "Palubn\xED reaktor", auto: "Asistent t\u011B\u017Eby" },
      makesDyson: "postav\xED {n} kolektor\u016F/s",
      fabRate: "{n} kolektor\u016F/s",
      fabLim: { metal: "brzd\xED kov", energy: "brzd\xED energie" },
      fabChain: { lifter: "dostavuje trycht\xFD\u0159e", separator: "dostavuje separ\xE1tory" },
      fabBuilt: "Samo postaveno",
      fabBuiltList: "{l} trycht\xFD\u0159\u016F, {s} separ\xE1tor\u016F",
      stats: { clicks: "Kliknut\xED", drones: "Drony", converters: "P\u0159evodn\xEDky", stage: "Stadium", cov: "Roj zachyt\xED", fab: "Lod\u011Bnice" },
      journal: "Palubn\xED den\xEDk",
      fact: "V\u011Bd\u011Bl jsi?",
      report: "Hl\xE1\u0161en\xED",
      voyage: { flying: "Expedice Vesperu \xB7 {to}", remaining: "p\u0159\xEDlet za {t}", docked: "Vesper \u010Dek\xE1 u platformy" },
      map: { fly: "Vyslat", onWay: "Na cest\u011B", flight: "doba letu {t}", visited: "prozkoum\xE1no", active: "Prozkoum\xE1no" },
      events: {
        comet: { name: "Kometa na dosah", claim: "Zachytit kometu", got: "Kometa zachycena: +{v} rudy" },
        flare: { name: "Slune\u010Dn\xED erupce", claim: "Zachytit erupci", got: "Erupce zachycena: +{v} energie" },
        echo: { name: "Ozv\u011Bna pulsu", claim: "Zaznamenat ozv\u011Bnu", got: "Ozv\u011Bna zaznamen\xE1na: +{v} dat" },
        mtype: { name: "Asteroid typu M", claim: "Rozebrat asteroid", got: "Kovov\xFD asteroid zpracov\xE1n: +{v} kovu" },
        prominence: { name: "Protuberance", claim: "Zachytit protuberanci", got: "Protuberance zachycena: +{v} plazmatu" }
      },
      chapters: { label: "Kapitoly", c1: "Platforma", c2: "Hv\u011Bzda", c3: "Horizont", c4: "Most", c5: "\u0160epot", locked: "?" },
      chapterDone: {
        title: "Kapitola 1 dokon\u010Dena",
        body: "Civilizace dos\xE1hla Karda\u0161evova Typu I. Kolem Aldry ob\xEDh\xE1 prvn\xED roj kolektor\u016F a puls je siln\u011Bj\u0161\xED ne\u017E kdy d\u0159\xEDv. Za\u010D\xEDn\xE1 Kapitola 2: Hv\u011Bzda. Aldra m\xE1 p\u0159ed sebou posledn\xED miliony let \u017Eivota a v z\xE1lo\u017Ece Hv\u011Bzda je uvid\xED\u0161 zbl\xEDzka.",
        ok: "Pokra\u010Dovat"
      },
      chapterDone2: {
        title: "Kapitola 2 dokon\u010Dena",
        body: "Aldra vybuchla jako supernova a na okam\u017Eik z\xE1\u0159ila jasn\u011Bji ne\u017E cel\xE1 galaxie. Roj zachytil \u010D\xE1st energie v\xFDbuchu a pak zanikl. Na m\xEDst\u011B hv\u011Bzdy z\u016Fstala \u010Dern\xE1 d\xEDra a kolem n\xED se rozp\xEDn\xE1 mlhovina. Kapitola 3: Horizont p\u0159ijde v dal\u0161\xED verzi a ulo\u017Een\xE1 hra se do n\xED p\u0159enese.",
        ok: "Pokra\u010Dovat"
      },
      star: {
        title: "Aldra",
        stage: "Stadium {n} z {of}",
        burn: "V j\xE1d\u0159e",
        realLen: "Ve skute\u010Dnosti trv\xE1 {t}",
        progress: "Pr\u016Fb\u011Bh stadia",
        L: "Sv\xEDtivost",
        T: "Povrch",
        R: "Polom\u011Br",
        cov: "Roj zachyt\xED",
        lift: "Energie na 1 kg plazmatu",
        lsun: "{v} Slunc\xED",
        rsun: "{v} Slunc\xED",
        ready: "P\u0159echod do dal\u0161\xEDho stadia",
        needTime: "stadium dob\u011Bhne",
        needPower: "v\xFDkon civilizace aspo\u0148 {w}",
        needMetal: "separ\xE1tory z\xEDskaj\xED v t\xE9to kapitole {m} kovu",
        needResearch: "v\xFDzkum Neutrinov\xE9 observato\u0159e",
        next: "Dal\u0161\xED stadium: {n}",
        collapse: "Spustit kolaps j\xE1dra",
        countdown: "Kolaps za {t}",
        lastLift: "Posledn\xED t\u011B\u017Eba: trycht\xFD\u0159e b\u011B\u017E\xED desetkr\xE1t rychleji.",
        waiting: "Stadium se zm\u011Bn\xED, a\u017E ho spust\xED\u0161.",
        layers: "\u0158ez hv\u011Bzdou",
        progressOf: "{a} z {b}",
        remnant: "Na m\xEDst\u011B Aldry je \u010Dern\xE1 d\xEDra o hmotnosti asi 8 Slunc\xED. Kolem se rozp\xEDn\xE1 mlhovina z vyvr\u017Een\xFDch prvk\u016F.",
        years: "{n} let",
        yearsM: "{n} mil. let",
        day: "{n} dne",
        days: "{n} dn\xED",
        hours: "{n} h",
        minutes: "{n} min",
        seconds: "{n} s",
        months: "{n} m\u011Bs."
      },
      stages: {
        ms: { name: "Hlavn\xED posloupnost", burn: "vod\xEDk \u2192 helium" },
        he: { name: "Rud\xFD veleobr", burn: "helium \u2192 uhl\xEDk, kysl\xEDk" },
        c: { name: "Spalov\xE1n\xED uhl\xEDku", burn: "uhl\xEDk \u2192 neon, sod\xEDk, ho\u0159\u010D\xEDk" },
        neo: { name: "Spalov\xE1n\xED neonu a kysl\xEDku", burn: "neon, kysl\xEDk \u2192 k\u0159em\xEDk, s\xEDra" },
        si: { name: "Spalov\xE1n\xED k\u0159em\xEDku", burn: "k\u0159em\xEDk \u2192 \u017Eelezo, nikl" },
        nova: { name: "Supernova" }
      },
      rebuild: {
        title: "P\u0159estavba roje",
        pts: "Poznatky",
        bonus: "Roj, trycht\xFD\u0159e a separ\xE1tory \xD7{m}",
        gain: "P\u0159estavba te\u010F p\u0159id\xE1 {n}.",
        none: "Te\u010F by nic nep\u0159idala. Poznatky p\u0159ib\xFDvaj\xED s kovem, kter\xFD separ\xE1tory z\xEDskaj\xED od posledn\xED p\u0159estavby: ka\u017Ed\xFDch 10\xD7 v\xEDc kovu d\xE1 2 poznatky.",
        next: "Dal\u0161\xED poznatek, a\u017E separ\xE1tory od posledn\xED p\u0159estavby z\xEDskaj\xED {v} kovu.",
        btn: "P\u0159estav\u011Bt roj",
        confirmTitle: "P\u0159estav\u011Bt roj?",
        confirmBody: "Kolektory postaven\xE9 v Kapitole 2, trycht\xFD\u0159e, separ\xE1tory, seismick\xE9 stanice a lod\u011Bnice se rozeberou a sklady kovu, energie a plazmatu se vypr\xE1zdn\xED. Z\u016Fstane v\xFDzkum, stadium hv\u011Bzdy, poznatky a jeden trycht\xFD\u0159 se separ\xE1torem. P\u0159ibude {n} a roj, trycht\xFD\u0159e a separ\xE1tory pak pob\u011B\u017E\xED \xD7{m}.",
        ok: "P\u0159estav\u011Bt",
        done: "Roj p\u0159estav\u011Bn: +{n}"
      },
      redWarn: {
        title: "Aldra se nafoukne",
        body: "Hv\u011Bzda opust\xED hlavn\xED posloupnost a nafoukne se do rud\xE9ho veleobra, stokr\xE1t v\u011Bt\u0161\xEDho ne\u017E dnes. Vnit\u0159n\xED ob\u011B\u017En\xE9 dr\xE1hy skon\u010D\xED uvnit\u0159 hv\u011Bzdy, stanice u kor\xF3ny tak\xE9.",
        safe: "D\xEDky v\xFDzkumu Vysok\xE9 dr\xE1hy je roj i v\u0161echny trycht\xFD\u0159e mimo dosah. Nic se neztrat\xED.",
        loss: "Bez v\xFDzkumu Vysok\xE9 dr\xE1hy sho\u0159\xED {d} kolektor\u016F a {l} trycht\xFD\u0159\u016F.",
        ok: "Pokra\u010Dovat",
        cancel: "Je\u0161t\u011B po\u010Dkat"
      },
      collapseWarn: {
        title: "Kolaps j\xE1dra",
        body: "\u017Delezn\xE9 j\xE1dro u\u017E nic neudr\u017E\xED. A\u017E se zhrout\xED, Aldra vybuchne jako supernova a roj, trycht\xFD\u0159e i stanice u hv\u011Bzdy zaniknou. P\u0159ed v\xFDbuchem zbude {t} na posledn\xED t\u011B\u017Ebu.",
        ok: "Spustit kolaps",
        cancel: "Je\u0161t\u011B ne"
      },
      cancel: "Zru\u0161it",
      offline: "Byl jsi pry\u010D {t}. Do sklad\u016F mezit\xEDm p\u0159ibylo: {list}.",
      offlineHead: "Byl jsi pry\u010D {t}. Do sklad\u016F mezit\xEDm p\u0159ibylo:",
      settings: {
        save: "Ulo\u017Een\xE1 hra",
        saveNow: "Ulo\u017Eit te\u010F",
        saved: "Ulo\u017Eeno {t}",
        saveFail: "Ukl\xE1d\xE1n\xED v tomto prohl\xED\u017Ee\u010Di nefunguje. Pou\u017Eij export.",
        export: "Exportovat",
        exportHint: "Zkop\xEDruj si tenhle text a ulo\u017E ho. Poslou\u017E\xED jako z\xE1loha nebo k p\u0159enesen\xED hry na jin\xFD po\u010D\xEDta\u010D.",
        import: "Importovat",
        importHint: "Vlo\u017E sem text z exportu a klikni na Importovat.",
        importOk: "Hra na\u010Dtena.",
        importBad: "Text se nepoda\u0159ilo p\u0159e\u010D\xEDst. Zkontroluj, \u017Ee je cel\xFD.",
        copy: "Kop\xEDrovat",
        copied: "Zkop\xEDrov\xE1no",
        sound: "Zvuk",
        soundOn: "Zvuk zapnut\xFD",
        soundOff: "Zvuk vypnut\xFD",
        vol: { noise: "\u0160um vesm\xEDru", melody: "Melodie", game: "Zvuky hry" },
        reset: "Smazat postup",
        resetConfirm: "Opravdu? Klikni znovu",
        resetFinal: "Naposledy: smazat nav\u017Edy",
        resetDone: "Postup smaz\xE1n.",
        about: "O h\u0159e",
        version: "Verze {v}",
        aboutText: "Klidn\xE1 inkrement\xE1ln\xED hra postaven\xE1 na skute\u010Dn\xE9 fyzice. Autor: Rix \xB7 Rix Games.",
        offlineRule: "Kdy\u017E nehraje\u0161, hra za tebe nepostupuje. Do sklad\u016F p\u0159ibude jen 10 % b\u011B\u017En\xE9 produkce (nejv\xFD\u0161 za 8 hodin) a stavby, v\xFDzkum ani lety se mezit\xEDm nedokon\u010D\xED."
      }
    },
    b: {
      drone: { name: "T\u011B\u017Eebn\xED dron", desc: "Mal\xFD samostatn\xFD stroj, kter\xFD od\u0161tipuje rudu z povrchu asteroidu." },
      smelter: { name: "Tav\xEDrna", desc: "Ze 2 kg rudy vytav\xED 1 kg kovu. Zbytek odch\xE1z\xED jako struska." },
      solar: { name: "Sol\xE1rn\xED panel", desc: "Tenk\xE9 fotovoltaick\xE9 \u010Dl\xE1nky o plo\u0161e 1 000 m\xB2, napnut\xE9 mezi skalami." },
      lab: { name: "Laborato\u0159", desc: "Rozeb\xEDr\xE1 vzorky a sign\xE1ly. Z dat, kter\xE1 vzniknou, se plat\xED v\xFDzkum. Bez energie stoj\xED." },
      drill: { name: "Hloubkov\xFD vrt", desc: "Sah\xE1 do j\xE1dra asteroidu, kam drony nedos\xE1hnou." },
      mirror: { name: "Orbit\xE1ln\xED zrcadlo", desc: "Zrcadlo \u0161irok\xE9 kilometr soust\u0159ed\xED sv\u011Btlo Aldry na sb\u011Bra\u010De." },
      replicator: { name: "Replik\xE1tor", desc: "Mal\xE1 tov\xE1rna, kter\xE1 sama stav\xED nov\xE9 t\u011B\u017Eebn\xED drony. Bez energie stoj\xED." },
      forge: { name: "Orbit\xE1ln\xED sl\xE9v\xE1rna", desc: "Tav\xEDrna na ob\u011B\u017En\xE9 dr\xE1ze. Pracuje stejn\u011B jako b\u011B\u017En\xE1 tav\xEDrna, jen stokr\xE1t rychleji." },
      catcher: { name: "Lapa\u010D asteroid\u016F", desc: "Nav\xE1d\xED cel\xE9 asteroidy k platform\u011B a drt\xED je." },
      qcomp: { name: "Kvantov\xFD po\u010D\xEDta\u010D", desc: "Chlazen\xFD ledem z Kelvaru. Obrovsk\xFD v\xFDkon, obrovsk\xE1 spot\u0159eba." },
      fusion: { name: "F\xFAzn\xED reaktor", desc: "Slu\u010Duje deuterium s heliem-3 z atmosf\xE9ry Taurisu." },
      dyson: { name: "Dyson\u016Fv kolektor", desc: "Kolektor v roji kolem Aldry. Ka\u017Ed\xFD dal\u0161\xED zv\xFD\u0161\xED v\xFDrobu ve\u0161ker\xE9 energie o 10 %. V\xEDc sv\u011Btla, ne\u017E hv\u011Bzda vyz\xE1\u0159\xED, ale roj nikdy nezachyt\xED." },
      lifter: { name: "Hv\u011Bzdn\xFD trycht\xFD\u0159", desc: "Magnetick\xE9 pole otev\u0159e v kor\xF3n\u011B trycht\xFD\u0159 a vede j\xEDm proud plazmatu ven z hv\u011Bzdy. V\u011Bt\u0161inu pr\xE1ce odvede hv\u011Bzdn\xFD v\xEDtr. S\xEDl\xED s ka\u017Ed\xFDm Dysonov\xFDm kolektorem." },
      separator: { name: "Separ\xE1tor prvk\u016F", desc: "T\u0159\xEDd\xED plazma podle hmotnosti. Vod\xEDk a helium vrac\xED do hv\u011Bzdy, t\u011B\u017E\u0161\xED prvky jdou do skladu jako kov. S\xEDl\xED s ka\u017Ed\xFDm Dysonov\xFDm kolektorem." },
      seismo: { name: "Seismick\xE1 stanice", desc: "Naslouch\xE1 chv\u011Bn\xED hv\u011Bzdy a z tis\xEDc\u016F t\xF3n\u016F skl\xE1d\xE1 obraz jej\xEDho nitra. S\xEDl\xED s ka\u017Ed\xFDm Dysonov\xFDm kolektorem." },
      swarmfab: { name: "Rojov\xE1 lod\u011Bnice", desc: "Sama stav\xED kolektory za polovinu ceny. Bere nejv\xFD\u0161 polovinu p\u0159\xEDr\u016Fstku kovu a energie. Kdy\u017E ji brzd\xED kov, dostavuje z \u010D\xE1sti zbyl\xE9ho p\u0159\xEDr\u016Fstku i trycht\xFD\u0159e a separ\xE1tory, podle toho, co v \u0159et\u011Bzci chyb\xED. Rozebr\xE1n\xEDm vr\xE1t\xED\u0161 polovinu ceny." }
    },
    r: {
      vib: { name: "Vibra\u010Dn\xED hroty", desc: "Ru\u010Dn\xED t\u011B\u017Eba \xD73." },
      swarm: { name: "Rojov\xE1 koordinace", desc: "Drony \xD72." },
      deep: { name: "Hloubkov\xE9 vrty", desc: "Odemkne hloubkov\xFD vrt." },
      arc: { name: "Obloukov\xE9 taven\xED", desc: "Tav\xEDrny zpracuj\xED dvakr\xE1t v\xEDc rudy." },
      scan: { name: "D\xE1lkov\xFD skener", desc: "Odemkne mapu soustavy a expedi\u010Dn\xED lo\u010F Vesper." },
      thinfilm: { name: "Tenkovrstv\xE9 \u010Dl\xE1nky", desc: "Sol\xE1rn\xED panely \xD72." },
      auto: { name: "Asistent t\u011B\u017Eby", desc: "T\u011B\u017E\xED za tebe: 3 kliky za sekundu." },
      lab2: { name: "Kvantov\xE9 s\xEDt\u011B", desc: "Laborato\u0159e \xD72." },
      mirror: { name: "Orbit\xE1ln\xED optika", desc: "Odemkne orbit\xE1ln\xED zrcadla." },
      repl: { name: "Samoreplikace", desc: "Odemkne replik\xE1tory, kter\xE9 stav\xED drony." },
      resonance: { name: "Rezonan\u010Dn\xED vrt\xE1n\xED", desc: "Ka\u017Ed\xFD klik nav\xEDc vyt\u011B\u017E\xED 5 % toho, co drony a vrty vyt\u011B\u017E\xED za sekundu." },
      forge: { name: "Tavba v bezt\xED\u017Ei", desc: "Odemkne orbit\xE1ln\xED sl\xE9v\xE1rnu." },
      cryo: { name: "Kryogenn\xED v\xFDpo\u010Dty", desc: "Laborato\u0159e \xD73 d\xEDky ledu z Kelvaru." },
      signal: { name: "Dek\xF3dov\xE1n\xED sign\xE1lu", desc: "Co to vlastn\u011B poslouch\xE1me?" },
      optics: { name: "Adaptivn\xED optika", desc: "Orbit\xE1ln\xED zrcadla \xD73." },
      catcher: { name: "Gravita\u010Dn\xED ta\u017Een\xED", desc: "Odemkne lapa\u010D asteroid\u016F." },
      swarm2: { name: "Neuronov\xFD roj", desc: "Drony a vrty \xD73." },
      fusion: { name: "F\xFAze helia-3", desc: "Odemkne f\xFAzn\xED reaktor." },
      supercond: { name: "Supravodiv\xE9 rozvody", desc: "V\xFDroba ve\u0161ker\xE9 energie \xD72, laborato\u0159e \xD72." },
      plasma: { name: "Plazmov\xE1 tavba", desc: "Orbit\xE1ln\xED sl\xE9v\xE1rny \xD73." },
      quantum: { name: "Kvantov\xE9 v\xFDpo\u010Dty", desc: "Laborato\u0159e \xD74 a odemkne kvantov\xFD po\u010D\xEDta\u010D." },
      vib2: { name: "Gravita\u010Dn\xED kladiva", desc: "Ru\u010Dn\xED t\u011B\u017Eba \xD75." },
      dyson: { name: "Teorie Dysonova roje", desc: "Odemkne Dysonovy kolektory." },
      nano: { name: "Nanomont\xE1\u017E", desc: "Drony, vrty, lapa\u010De a sl\xE9v\xE1rny \xD74, replik\xE1tory \xD73." },
      statite: { name: "Statity", desc: "Kolektory se vzn\xE1\u0161ej\xED na tlaku z\xE1\u0159en\xED. Kolektory \xD72." },
      induct: { name: "Induk\u010Dn\xED taven\xED", desc: "Tav\xEDrny a sl\xE9v\xE1rny \xD74." },
      beam: { name: "Laserov\xFD p\u0159enos", desc: "Energie z roje let\xED k platform\u011B paprskem. Kolektory \xD72." },
      lagrange: { name: "Lagrangeovy body", desc: "Stabiln\xED dr\xE1hy pro hust\u0161\xED roj. Kolektory \xD72." },
      lift: { name: "Zved\xE1n\xED hv\u011Bzdn\xE9 hmoty", desc: "Odemkne hv\u011Bzdn\xE9 trycht\xFD\u0159e." },
      sep: { name: "Hmotnostn\xED separace", desc: "Odemkne separ\xE1tory prvk\u016F." },
      seismo: { name: "Asteroseismologie", desc: "Odemkne seismick\xE9 stanice." },
      coil: { name: "Supravodiv\xE9 c\xEDvky", desc: "Siln\u011Bj\u0161\xED magnetick\xE9 pole v trycht\xFD\u0159\xEDch. Trycht\xFD\u0159e \xD73." },
      fab: { name: "Automatick\xE1 v\xFDroba kolektor\u016F", desc: "Odemkne rojov\xE9 lod\u011Bnice." },
      sail: { name: "Tenk\xE9 plachty", desc: "Leh\u010D\xED kolektory pokryj\xED v\u011Bt\u0161\xED plochu. Kolektory \xD74." },
      redesign: { name: "Lep\u0161\xED n\xE1vrh roje", desc: "Odemkne p\u0159estavbu roje: rozebrat ho a postavit znovu, tentokr\xE1t l\xE9pe." },
      highorbit: { name: "Vysok\xE9 dr\xE1hy", desc: "Roj a trycht\xFD\u0159e se p\u0159esunou d\xE1l od hv\u011Bzdy. Kolektory \xD72." },
      census: { name: "S\u010D\xEDt\xE1n\xED sousedn\xEDch hv\u011Bzd", desc: "Kolik v\xE1\u017E\xED hv\u011Bzdy kolem n\xE1s? Seismick\xE9 stanice \xD72." },
      rotlift: { name: "Rota\u010Dn\xED ods\xE1v\xE1n\xED", desc: "Rozto\u010Den\xE1 hv\u011Bzda pou\u0161t\xED hmotu z rovn\xEDku sn\xE1z. Trycht\xFD\u0159e \xD73 za stejnou energii." },
      carbon: { name: "Uhl\xEDkov\xE1 vl\xE1kna", desc: "Uhl\xEDk vznikl\xFD v Ald\u0159e zpevn\xED kolektory. Kolektory \xD75." },
      seis2: { name: "Hlubok\xE1 seismologie", desc: "Seismick\xE9 stanice \xD710." },
      mg: { name: "Ho\u0159\u010D\xEDkov\xE9 slitiny", desc: "Lehk\xE9 slitiny z ho\u0159\u010D\xEDku vznikl\xE9ho v Ald\u0159e. Separ\xE1tory \xD75, lod\u011Bnice stav\xED za \u010Dtvrtinu ceny." },
      neon: { name: "Neonov\xE9 lasery", desc: "Rychlej\u0161\xED p\u0159enos energie z roje. Kolektory \xD73." },
      pulse2: { name: "Zdroj pulsu", desc: "Odkud p\u0159esn\u011B ten puls p\u0159ich\xE1z\xED? Seismick\xE9 stanice \xD73." },
      silicon: { name: "K\u0159em\xEDkov\xE1 fotonika", desc: "Seismick\xE9 stanice, laborato\u0159e a kvantov\xE9 po\u010D\xEDta\u010De \xD710." },
      magsail: { name: "Magnetick\xE9 plachty", desc: "Plazma pom\xE1h\xE1 vyn\xE1\u0161et i magnetick\xE9 pole hv\u011Bzdy. Trycht\xFD\u0159e \xD72 za stejnou energii." },
      iron: { name: "T\u011B\u017Eba \u017Eeleza", desc: "Separ\xE1tory um\xED z plazmatu vyt\xE1hnout i \u017Eelezo a nikl. Separ\xE1tory \xD75." },
      neutrino: { name: "Neutrinov\xE1 observato\u0159", desc: "Zachyt\xED neutrina z nitra hv\u011Bzdy a ohl\xE1s\xED bl\xED\u017E\xEDc\xED se kolaps." }
    },
    loc: {
      belt: { name: "P\xE1s Ceres-IX", short: "Ceres-IX", desc: "Domovsk\xE1 platforma VESPER-7." },
      moon: { name: "Ledov\xFD m\u011Bs\xEDc Kelvar", short: "Kelvar", desc: "Sta\u010D\xED jedna expedice. Trval\xFD bonus: laborato\u0159e \xD71,5, otev\u0159e nov\xFD v\xFDzkum.", done: "Trval\xFD bonus: laborato\u0159e \xD71,5 a nov\xFD v\xFDzkum." },
      giant: { name: "Plynn\xFD obr Tauris", short: "Tauris", desc: "Sta\u010D\xED jedna expedice. Trval\xFD bonus: v\xFDroba energie \xD72, otev\u0159e v\xFDzkum f\xFAze.", done: "Trval\xFD bonus: v\xFDroba energie \xD72 a v\xFDzkum f\xFAze." },
      sun: { name: "Kor\xF3na Aldry", short: "Kor\xF3na", desc: "Sta\u010D\xED jedna expedice a\u017E t\u011Bsn\u011B k hv\u011Bzd\u011B. Otev\u0159e v\xFDzkum Dysonova roje.", done: "Otev\u0159en v\xFDzkum Dysonova roje." },
      ione: { name: "Rozebrat planetu Ione", short: "Ione", desc: "\u017Dhav\xE1 kamenn\xE1 planeta bl\xEDzko Aldry. Vesper ji rozebere na stavebn\xED materi\xE1l pro roj. Trval\xFD bonus: separ\xE1tory \xD73.", done: "Ione rozebr\xE1na. Separ\xE1tory \xD73." },
      kuiper: { name: "P\xE1s komet", short: "P\xE1s komet", desc: "Ledov\xE1 t\u011Blesa na okraji soustavy. Led poslou\u017E\xED jako chladivo pro supravodiv\xE9 c\xEDvky trycht\xFD\u0159\u016F. Trval\xFD bonus: trycht\xFD\u0159e \xD73 za stejnou energii.", done: "Led z p\xE1su chlad\xED trycht\xFD\u0159e. Trycht\xFD\u0159e \xD73 za stejnou energii." },
      core: { name: "Obna\u017Een\xE9 j\xE1dro Taurisu", short: "J\xE1dro Taurisu", desc: "V\xEDtr rud\xE9ho veleobra strhal Taurisu plynn\xFD obal. Zbylo kamenn\xE9 a \u017Eelezn\xE9 j\xE1dro. Trval\xFD bonus: separ\xE1tory \xD74.", done: "J\xE1dro Taurisu se t\u011B\u017E\xED. Separ\xE1tory \xD74." },
      dust: { name: "Prachov\xE1 ob\xE1lka", short: "Prachov\xE1 ob\xE1lka", desc: "Aldra ztr\xE1c\xED hmotu a v chladn\xE9m v\u011Btru kondenzuj\xED uhl\xEDkov\xE1 zrna. Lehk\xE9 a pevn\xE9, ide\xE1ln\xED na kolektory. Trval\xFD bonus: kolektory \xD73.", done: "Kolektory z hv\u011Bzdn\xE9ho prachu. Kolektory \xD73." }
    },
    story: {
      start: "VESPER-7 hl\xE1s\xED provoz. Spojen\xED s \xDAst\u0159ed\xEDm chyb\xED u\u017E 412 dn\xED. Posledn\xED rozkaz po\u0159\xE1d plat\xED: t\u011B\u017Eit.",
      drone: "Prvn\xED dron se odpojil od doku. Bzu\u010D\xED ti\u0161e, skoro spokojen\u011B.",
      iso: "Spektrometr na\u0161el v rud\u011B izotop, kter\xFD v t\xE9to soustav\u011B nem\xE1 co d\u011Blat. Zapisuji a pokra\u010Duji.",
      smelt: "Tav\xEDrna b\u011B\u017E\xED. Kov z Ceres-IX je podivn\u011B \u010Dist\xFD. Jako by ho u\u017E jednou n\u011Bkdo rafinoval.",
      lab: "Laborato\u0159 spu\u0161t\u011Bna. Data p\u0159ich\xE1zej\xED pomalu, ale p\u0159ich\xE1zej\xED.",
      scan: "Skener zachytil sign\xE1l. Pravideln\xFD puls ka\u017Ed\xFDch 7,3 sekundy. Chv\xEDlemi to vypad\xE1, \u017Ee nep\u0159ich\xE1z\xED zven\u010D\xED, ale odn\u011Bkud ze soustavy.",
      depart: "Vesper odstartoval. Platforma te\u010F mluv\xED jen sama se sebou.",
      moon: "Pod ledem Kelvaru le\u017E\xED stroje. Star\xE9 asi dv\u011B miliardy let. Maj\xED p\u0159esn\u011B tvar na\u0161ich dron\u016F.",
      repl: "Replik\xE1tor dokon\u010Dil prvn\xEDho drona bez m\xE9 pomoci. Nev\xEDm, jestli m\xE1m m\xEDt radost.",
      signal: "Sign\xE1l nen\xED zpr\xE1va. Je to sou\u0159adnice a \u010Dasov\xE1 zna\u010Dka. Zna\u010Dka ukazuje do budoucnosti.",
      giant: "Prstenec Taurisu rotuje proti sm\u011Bru planety. V atmosf\xE9\u0159e je helia-3 na tis\xEDc let.",
      fusion: "F\xFAzn\xED reaktor zap\xE1len. Na okam\u017Eik zhasly v\u0161echny ostatn\xED syst\xE9my. Ve tm\u011B byl sly\u0161et puls. 7,3 sekundy.",
      sun: "Aldra je modr\xFD veleobr, 25\xD7 hmotn\u011Bj\u0161\xED ne\u017E Slunce. Zbl\xEDzka to nen\xED z\xE1\u0159\xEDc\xED koule, ale rozbou\u0159en\xFD oce\xE1n plazmatu, kter\xFD nem\xE1 konec.",
      dyson1: "Prvn\xED kolektor na ob\u011B\u017En\xE9 dr\xE1ze. Hv\u011Bzda je obrovsk\xE1 a my jsme mal\xED. Ale m\xE1me \u010Das.",
      dyson10: "Deset kolektor\u016F. Puls zes\xEDlil. Jako by si n\xE1s n\u011Bco v\u0161imlo.",
      typeI: "Typ I. V\xFDkon cel\xE9 planety, a p\u0159itom teprve za\u010D\xE1tek. Aldra pod rojem jemn\u011B m\u011Bn\xED barvu.",
      lifter: "Prvn\xED trycht\xFD\u0159 otev\u0159en. Z kor\xF3ny Aldry stoup\xE1 proud plazmatu, tenk\xFD jako vlas a dlouh\xFD jako ob\u011B\u017En\xE1 dr\xE1ha.",
      sep: "Separ\xE1tor hl\xE1s\xED prvn\xED kilogramy kovu. Stejn\u011B \u010Dist\xFD jako ruda z Ceres-IX.",
      seismo: "Aldra zn\xED. Cel\xE1 hv\u011Bzda se chv\u011Bje v tis\xEDc\xEDch t\xF3n\u016F. Jeden z nich se opakuje ka\u017Ed\xFDch 7,3 sekundy.",
      census: "Sousedn\xED hv\u011Bzdy v\xE1\u017E\xED m\xE9n\u011B, ne\u017E by na sv\u016Fj v\u011Bk m\u011Bly. Jako by z nich u\u017E n\u011Bkdo t\u011B\u017Eil.",
      rebuild: "Roj rozebr\xE1n a postaven znovu, tentokr\xE1t l\xE9pe. Ten postup mi p\u0159ipad\xE1 pov\u011Bdom\xFD.",
      red: "Aldra se nafoukla do rud\xE9ho veleobra. Kde byla kor\xF3na, je te\u010F nitro hv\u011Bzdy. Puls zes\xEDlil.",
      typeII: "Typ II. V\xFDkon jako cel\xE9 Slunce, a Aldra d\xE1v\xE1 mnohem v\xEDc. Puls je te\u010F tak siln\xFD, \u017Ee se chv\u011Bj\xED i drony v doku.",
      carbon: "V j\xE1d\u0159e ho\u0159\xED uhl\xEDk. Ald\u0159e zb\xFDvaj\xED stovky let. Zdroj pulsu se posouv\xE1 dovnit\u0159 hv\u011Bzdy.",
      pulse2: "Puls nep\u0159ich\xE1z\xED z povrchu ani z kor\xF3ny. P\u0159ich\xE1z\xED z j\xE1dra. Z m\xEDsta, kde se hv\u011Bzda jednou zhrout\xED.",
      neo: "Neon a kysl\xEDk. Aldra m\xE1 p\u0159ed sebou mo\u017En\xE1 rok. Puls zn\xED z j\xE1dra, pravideln\u011B jako dech.",
      si: "K\u0159em\xEDk. Zb\xFDv\xE1 jedin\xFD den. V j\xE1d\u0159e roste \u017Eelezo a puls na n\u011Bco \u010Dek\xE1.",
      collapse: "J\xE1dro se hrout\xED. V\u0161echny trycht\xFD\u0159e naplno.",
      nova: "J\xE1dro se zhroutilo za \u010Dtvrt sekundy. Aldra zaz\xE1\u0159ila jasn\u011Bji ne\u017E cel\xE1 galaxie. Kdy\u017E sv\u011Btlo opadlo, puls zn\u011Bl d\xE1l. 7,3 sekundy."
    },
    fact: {
      megawatt: "Platforma p\u0159ekro\u010Dila v\xFDkon 1 MW, nulu na Karda\u0161evov\u011B \u0161k\xE1le. Zhruba tolik d\xE1v\xE1 jedna velk\xE1 v\u011Btrn\xE1 turb\xEDna.",
      kardashev: "Karda\u0161evovu \u0161k\xE1lu navrhl sov\u011Btsk\xFD astronom Nikolaj Karda\u0161ev v roce 1964. M\u011B\u0159\xED civilizace podle toho, kolik energie dok\xE1\u017Eou vyu\u017E\xEDt.",
      solar: "U Zem\u011B dopad\xE1 na ka\u017Ed\xFD metr \u010Dtvere\u010Dn\xED asi 1 361 W slune\u010Dn\xEDho z\xE1\u0159en\xED. Aldra je mnohem jasn\u011Bj\u0161\xED, tak\u017Ee stejn\xFD panel tu d\xE1 v\xEDc energie.",
      bytes: "DNA je zapsan\xE1 jen \u010Dty\u0159mi chemick\xFDmi zna\u010Dkami: A, C, G a T. Lidsk\xFD genom jich m\xE1 asi 3 miliardy za sebou a jako data by zabral zhruba 750 MB.",
      europa: "Kelvar p\u0159ipom\xEDn\xE1 Jupiter\u016Fv m\u011Bs\xEDc Europu, pod jej\xEDm\u017E ledem je nejsp\xED\u0161 slan\xFD oce\xE1n s v\xEDc vody ne\u017E na Zemi.",
      vonneumann: "Samoreplikuj\xEDc\xED stroje popsal matematik John von Neumann ve 40. letech. Sondy, kter\xE9 se samy mno\u017E\xED, by teoreticky obsadily galaxii za zlomek jej\xEDho v\u011Bku.",
      he3: "Helium-3 je na Zemi vz\xE1cn\xE9, v atmosf\xE9r\xE1ch plynn\xFDch obr\u016F ho ale je hodn\u011B. P\u0159i jeho f\xFAzi s deuteriem vznik\xE1 jen m\xE1lo neutron\u016F, a tedy i m\xE1lo radioaktivity.",
      corona: "Kor\xF3na hv\u011Bzdy je \u0159\xEDd\u0161\xED, ale mnohem teplej\u0161\xED ne\u017E jej\xED povrch: miliony kelvin\u016F. Pro\u010D, nen\xED dodnes \xFApln\u011B jasn\xE9.",
      dyson: "My\u0161lenku obklopit hv\u011Bzdu sb\u011Bra\u010Di energie popsal fyzik Freeman Dyson v roce 1960. Nemyslel pevnou kouli, ale roj samostatn\xFDch kolektor\u016F.",
      statite: "Statit je dru\u017Eice, kter\xE1 neob\xEDh\xE1, ale vzn\xE1\u0161\xED se na m\xEDst\u011B d\xEDky tlaku slune\u010Dn\xEDho sv\u011Btla. Navrhl ho Robert Forward.",
      criswell: "T\u011B\u017Ebu hmoty p\u0159\xEDmo z hv\u011Bzdy popsal David Criswell v roce 1985. Hv\u011Bzdy jsou zdaleka nejv\u011Bt\u0161\xED z\xE1sob\xE1rnou hmoty ve sv\xFDch soustav\xE1ch.",
      mercury: "N\xE1vrhy Dysonova roje po\u010D\xEDtaj\xED s rozebr\xE1n\xEDm Merkuru. Je bl\xEDzko Slunce, m\xE1 slabou gravitaci a hodn\u011B \u017Eeleza.",
      chthon: "Planet\xE1m, kter\xFDm hv\u011Bzda strhala plynn\xFD obal a\u017E na j\xE1dro, se \u0159\xEDk\xE1 chtonick\xE9. P\xE1r kandid\xE1t\u016F u\u017E astronomov\xE9 na\u0161li.",
      dustgrain: "Chladn\xED veleob\u0159i pat\u0159\xED k hlavn\xEDm tov\xE1rn\xE1m na kosmick\xFD prach. Z takov\xE9ho prachu jednou vznikaj\xED nov\xE9 planety.",
      metals: "Astronomov\xE9 \u0159\xEDkaj\xED kovy v\u0161em prvk\u016Fm t\u011B\u017E\u0161\xEDm ne\u017E helium, tedy i uhl\xEDku nebo kysl\xEDku. Slunce jich m\xE1 jen asi 1,4 %.",
      seismo: "Slunce se chv\u011Bje v milionech t\xF3n\u016F. Z jejich v\xFD\u0161ky astronomov\xE9 zjist\xED, co se d\u011Bje hluboko pod povrchem, kam \u017E\xE1dn\xFD dalekohled nedohl\xE9dne.",
      betelgeuse: "Rud\xFD veleobr Betelgeuze v Orionu je tak velk\xFD, \u017Ee by na m\xEDst\u011B Slunce sahal a\u017E za dr\xE1hu Marsu.",
      typeII: "Typ II znamen\xE1 v\xFDkon srovnateln\xFD s cel\xFDm Sluncem. To ka\u017Edou sekundu vyz\xE1\u0159\xED 3,8\xB710\xB2\u2076 J.",
      carbon: "Uhl\xEDk v tv\xE9m t\u011Ble vznikl v nitru hv\u011Bzdy, kter\xE1 vybuchla d\u0159\xEDv, ne\u017E vzniklo Slunce.",
      iron: "F\xFAz\xED \u017Eeleza u\u017E energie nevznik\xE1, naopak se spot\u0159ebuje. Proto \u017Eelezem \u017Eivot hmotn\xE9 hv\u011Bzdy kon\u010D\xED.",
      sn1987a: "P\u0159i supernov\u011B 1987A zachytily detektory na Zemi 25 neutrin, o n\u011Bkolik hodin d\u0159\xEDv, ne\u017E dorazilo sv\u011Btlo.",
      nova: "Supernova vyz\xE1\u0159\xED za p\xE1r t\xFDdn\u016F tolik sv\u011Btla jako Slunce za cel\xFD \u017Eivot. V\u011Bt\u0161inu energie ale odnesou neutrina."
    },
    req: { moon: "Vesper prozkoum\xE1 Kelvar", giant: "Vesper prozkoum\xE1 Tauris", sun: "Vesper prozkoum\xE1 kor\xF3nu Aldry", typeI: "civilizace dos\xE1hne Typu I", stage1: "se Aldra nafoukne do rud\xE9ho veleobra", stage2: "za\u010Dne Aldra spalovat uhl\xEDk", stage3: "za\u010Dne Aldra spalovat neon a kysl\xEDk", stage4: "za\u010Dne Aldra spalovat k\u0159em\xEDk" }
  };

  // src/i18n/index.ts
  var dicts = { cs };
  var current = cs;
  function setLang(lang) {
    current = dicts[lang] ?? cs;
  }
  function t(key, vars) {
    let v = current;
    for (const part of key.split(".")) v = v?.[part];
    if (typeof v !== "string") {
      let fb = cs;
      for (const part of key.split(".")) fb = fb?.[part];
      v = typeof fb === "string" ? fb : key;
    }
    return vars ? v.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? "")) : v;
  }

  // src/core/defs.ts
  var RESOURCES = ["ore", "metal", "energy", "data", "plasma"];
  var BUILDINGS = {
    drone: { base: { ore: 10 }, growth: 1.25, prod: { ore: 0.5 }, unlock: () => true },
    smelter: { base: { ore: 500 }, growth: 1.17, prod: { metal: 1 }, cons: { ore: 2 }, unlock: (s) => s.total.ore >= 800 || s.b.smelter > 0 },
    solar: { base: { metal: 120 }, growth: 1.18, prod: { energy: 2e3 }, unlock: (s) => s.total.metal >= 200 || s.b.solar > 0 },
    lab: { base: { metal: 600, energy: 3e6 }, growth: 1.2, prod: { data: 1e3 }, cons: { energy: 3e3 }, unlock: (s) => s.b.solar >= 3 || s.b.lab > 0 },
    drill: { base: { metal: 400, data: 2e4 }, growth: 1.18, prod: { ore: 12 }, unlock: (s) => !!s.r.deep },
    mirror: { base: { metal: 3e3, data: 1e5 }, growth: 1.17, prod: { energy: 4e5 }, unlock: (s) => !!s.r.mirror },
    replicator: { base: { metal: 4e3, data: 3e5 }, growth: 1.3, makes: { building: "drone", rate: 0.05 }, cons: { energy: 25e4 }, unlock: (s) => !!s.r.repl },
    forge: { base: { ore: 2e5, metal: 8e3, data: 1e5 }, growth: 1.18, prod: { metal: 100 }, cons: { ore: 200 }, unlock: (s) => !!s.r.forge },
    catcher: { base: { ore: 8e5, metal: 5e4, data: 5e5 }, growth: 1.18, prod: { ore: 5e3 }, unlock: (s) => !!s.r.catcher },
    qcomp: { base: { metal: 1e6, energy: 1e11 }, growth: 1.2, prod: { data: 2e8 }, cons: { energy: 2e8 }, unlock: (s) => !!s.r.quantum },
    fusion: { base: { ore: 1e6, metal: 1e5, data: 1e6 }, growth: 1.2, prod: { energy: 5e7 }, unlock: (s) => !!s.r.fusion },
    dyson: { base: { metal: 2e6, energy: 2e11 }, growth: 1.12, prod: { energy: 2e12 }, unlock: (s) => !!s.r.dyson && !s.star.done },
    // Kapitola 2. Trychtýř: prod = kg plazmatu za sekundu, spotřeba energie = stejné kg × G·M/R hvězdy (engine).
    lifter: { base: { metal: 5e6, energy: 2e17 }, growth: 1.16, prod: { plasma: 1e6 }, cons: { energy: 1e6 }, unlock: (s) => !!s.r.lift && !s.star.done },
    separator: { base: { metal: 5e6, plasma: 2e7 }, growth: 1.16, prod: { metal: 5e6 }, cons: { plasma: 5e6 }, unlock: (s) => !!s.r.sep && !s.star.done },
    seismo: { base: { metal: 1e8, energy: 5e17 }, growth: 1.2, prod: { data: 5e10 }, cons: { energy: 2e13 }, unlock: (s) => !!s.r.seismo && !s.star.done },
    // Loděnice staví kolektory sama z podílu přírůstku kovu a energie (engine: fabTick); zásoby nevyčerpá.
    swarmfab: { base: { metal: 2e10, plasma: 5e9 }, growth: 1.3, makes: { building: "dyson", rate: 0.02 }, cons: { metal: 1, energy: 1 }, unlock: (s) => !!s.r.fab && !s.star.done }
  };
  var BUILDING_IDS = Object.keys(BUILDINGS);
  var B = BUILDINGS;
  var stage = (n) => (s) => s.chapterDone >= 1 && s.star.stage >= n && !s.star.done;
  var has = (...ids) => (s) => ids.every((id) => s.r[id] || s.visited[id]);
  var RESEARCH = {
    vib: { cost: { data: 2e4 } },
    swarm: { cost: { data: 5e4 } },
    deep: { cost: { data: 8e4 } },
    arc: { cost: { data: 12e4 } },
    scan: { cost: { data: 18e4 } },
    thinfilm: { cost: { data: 25e4 } },
    auto: { cost: { data: 3e5 }, req: has("scan") },
    lab2: { cost: { data: 35e4 }, req: has("arc") },
    mirror: { cost: { data: 4e5 }, req: has("thinfilm") },
    repl: { cost: { data: 5e5 }, req: has("auto") },
    resonance: { cost: { data: 6e5 }, req: has("vib", "deep") },
    forge: { cost: { data: 8e5 }, req: has("mirror") },
    cryo: { cost: { data: 1e6 }, req: has("moon"), reqKey: "moon" },
    signal: { cost: { data: 2e6 }, req: has("moon"), reqKey: "moon" },
    optics: { cost: { data: 3e6 }, req: has("mirror", "forge") },
    catcher: { cost: { data: 4e6 }, req: has("moon"), reqKey: "moon" },
    swarm2: { cost: { data: 6e6 }, req: has("repl") },
    fusion: { cost: { data: 1e7 }, req: has("giant"), reqKey: "giant" },
    supercond: { cost: { data: 2e7, metal: 1e6 }, req: has("giant"), reqKey: "giant" },
    plasma: { cost: { data: 15e7 }, req: has("forge", "fusion") },
    quantum: { cost: { data: 2e8 }, req: has("cryo", "fusion") },
    vib2: { cost: { data: 6e8 }, req: has("resonance", "giant") },
    dyson: { cost: { data: 1e9 }, req: has("sun"), reqKey: "sun" },
    nano: { cost: { data: 4e9 }, req: has("dyson") },
    statite: { cost: { data: 12e9 }, req: has("dyson") },
    induct: { cost: { data: 4e10 }, req: has("nano") },
    beam: { cost: { data: 2e11 }, req: has("statite") },
    lagrange: { cost: { data: 1e12 }, req: has("beam") },
    // Kapitola 2: Hvězda
    lift: { cost: { data: 5e10 }, req: (s) => s.chapterDone >= 1, reqKey: "typeI" },
    sep: { cost: { data: 1e11 }, req: has("lift") },
    seismo: { cost: { data: 15e10 }, req: has("lift") },
    coil: { cost: { data: 2e13 }, req: has("lift") },
    fab: { cost: { data: 5e14 }, req: has("sep") },
    sail: { cost: { data: 1e14 }, req: has("sep") },
    redesign: { cost: { data: 2e15 }, req: has("sep") },
    highorbit: { cost: { data: 1e16 }, req: has("sail") },
    census: { cost: { data: 5e16 }, req: has("seismo") },
    rotlift: { cost: { data: 3e22 }, req: stage(1), reqKey: "stage1" },
    carbon: { cost: { data: 2e23 }, req: stage(1), reqKey: "stage1" },
    seis2: { cost: { data: 1e24 }, req: stage(1), reqKey: "stage1" },
    mg: { cost: { data: 5e26 }, req: stage(2), reqKey: "stage2" },
    neon: { cost: { data: 3e27 }, req: stage(2), reqKey: "stage2" },
    pulse2: { cost: { data: 1e28 }, req: stage(2), reqKey: "stage2" },
    silicon: { cost: { data: 1e29 }, req: stage(3), reqKey: "stage3" },
    magsail: { cost: { data: 5e29 }, req: stage(3), reqKey: "stage3" },
    iron: { cost: { data: 5e30 }, req: stage(4), reqKey: "stage4" },
    neutrino: { cost: { data: 3e31 }, req: stage(4), reqKey: "stage4" }
  };
  var RESEARCH_IDS = Object.keys(RESEARCH);
  var R = RESEARCH;
  var LOCATIONS = {
    belt: { cost: 0, time: 0, orbit: 0.36, angle: 0.3, speed: 0.02 },
    moon: { cost: 2e7, time: 45, orbit: 0.52, angle: 2.2, speed: 0.014 },
    giant: { cost: 3e9, time: 80, orbit: 0.72, angle: 4.1, speed: 9e-3 },
    sun: { cost: 2e11, time: 120, orbit: 0.15, angle: 1.2, speed: 0.05, req: (s) => !(s.chapterDone >= 1 && s.star.stage >= 1) },
    // Kapitola 2: mise za energii, každá dá trvalý násobič
    ione: { cost: 5e20, time: 90, orbit: 0.25, angle: 5.3, speed: 0.03, req: (s) => s.chapterDone >= 1 && !s.star.done },
    kuiper: { cost: 3e24, time: 150, orbit: 0.93, angle: 0.9, speed: 4e-3, req: (s) => s.chapterDone >= 1 && s.star.stage >= 1 && !s.star.done },
    core: { cost: 1e28, time: 120, orbit: 0.72, angle: 4.1, speed: 9e-3, req: (s) => s.chapterDone >= 1 && s.star.stage >= 2 && !s.star.done },
    dust: { cost: 3e29, time: 100, orbit: 0.42, angle: 2.9, speed: 0.012, req: (s) => s.chapterDone >= 1 && s.star.stage >= 3 && !s.star.done }
  };
  var LOCATION_IDS = Object.keys(LOCATIONS);
  var L = LOCATIONS;
  var STAGES = [
    { id: "ms", age0: 46e5, years: 24e5, sec: 2400, L: 31e30, T: 3e4, R: 10, z: 0.02, needW: 1e21 },
    { id: "he", age0: 7e6, years: 7e5, sec: 2400, L: 75e30, T: 3600, R: 1e3, z: 0.05, needW: 1e26 },
    { id: "c", age0: 77e5, years: 600, sec: 1800, L: 8e31, T: 3500, R: 1100, z: 0.15, needW: 3e28 },
    { id: "neo", age0: 7700600, years: 1, sec: 1800, L: 85e30, T: 3450, R: 1150, z: 0.3, needW: 1e30 },
    { id: "si", age0: 7700610, years: 1 / 365.25, sec: 1800, L: 9e31, T: 3400, R: 1200, z: 0.5, needW: 25e30 }
  ];
  var STAR = {
    massKg: 25 * 1989e27,
    G: 6674e-14,
    rSun: 6957e5,
    collapseSec: 30,
    // když hráč předběhne hvězdu, stárne rychleji (náskok 50 % = 11× rychleji)
    catchUp: 20,
    // odpočet „poslední těžby“ před kolapsem
    collapseLift: 10,
    // trychtýře během odpočtu ×10
    snEnergyJ: 1e44,
    // kinetická energie výbuchu (skutečný řád)
    redLoss: 0.5,
    // bez vysokých drah shoří polovina roje
    liftShare: 1e-4
    // podíl energie G·M/R, který platí civilizace; zbytek dodá hvězda sama (Criswell)
  };
  var PRESTIGE = { per: 0.25, metalUnit: 1e12, perOrder: 2 };
  var EVENTS = {
    // v Kapitole 2 ruda ani zásoba energie nepomůžou: místo komet a erupcí kovový asteroid a protuberance
    comet: { res: "ore", seconds: 90, min: 50, unlock: (s) => s.b.drone >= 2 && !s.chapterDone },
    flare: { res: "energy", seconds: 60, min: 5e4, unlock: (s) => s.b.solar >= 1 && !s.chapterDone },
    mtype: { res: "metal", seconds: 90, min: 1e9, unlock: (s) => s.chapterDone >= 1 && !s.star.done },
    echo: { res: "data", seconds: 60, min: 2e3, unlock: (s) => !!s.r.scan },
    prominence: { res: "plasma", seconds: 90, min: 1e6, unlock: (s) => s.b.lifter >= 1 && !s.star.done }
  };
  var EVENT_IDS = Object.keys(EVENTS);
  var STORY = [
    { id: "start", when: () => true },
    { id: "drone", when: (s) => s.b.drone >= 1 },
    { id: "iso", when: (s) => s.total.ore >= 150 },
    { id: "smelt", when: (s) => s.b.smelter >= 1 },
    { id: "lab", when: (s) => s.b.lab >= 1 },
    { id: "scan", when: (s) => !!s.r.scan },
    { id: "depart", when: (s) => !!s.travel || !!s.visited.moon },
    { id: "moon", when: (s) => !!s.visited.moon },
    { id: "repl", when: (s) => s.b.replicator >= 1 },
    { id: "signal", when: (s) => !!s.r.signal },
    { id: "giant", when: (s) => !!s.visited.giant },
    { id: "fusion", when: (s) => s.b.fusion >= 1 },
    { id: "sun", when: (s) => !!s.visited.sun },
    { id: "dyson1", when: (s) => s.b.dyson >= 1 },
    { id: "dyson10", when: (s) => s.b.dyson >= 10 },
    { id: "typeI", when: (s) => s.chapterDone >= 1 },
    // Kapitola 2
    { id: "lifter", when: (s) => s.b.lifter >= 1 },
    { id: "sep", when: (s) => s.b.separator >= 1 },
    { id: "seismo", when: (s) => s.b.seismo >= 1 },
    { id: "census", when: (s) => !!s.r.census },
    { id: "rebuild", when: (s) => s.p.count >= 1 },
    { id: "red", when: (s) => s.star.stage >= 1 },
    { id: "typeII", when: (s) => s.chapterDone >= 1 && !s.star.done && s.peakK >= 2 },
    { id: "carbon", when: (s) => s.star.stage >= 2 },
    { id: "pulse2", when: (s) => !!s.r.pulse2 },
    { id: "neo", when: (s) => s.star.stage >= 3 },
    { id: "si", when: (s) => s.star.stage >= 4 },
    { id: "collapse", when: (s) => s.star.collapse >= 0 },
    { id: "nova", when: (s) => s.star.done }
  ];
  var FACTS = [
    { id: "kardashev", when: (s) => s.time > 20 },
    { id: "megawatt", when: (_s, c) => c.powerW >= 1e6 },
    { id: "solar", when: (s) => s.b.solar >= 1 },
    { id: "bytes", when: (s) => s.b.lab >= 1 },
    { id: "europa", when: (s) => !!s.visited.moon },
    { id: "vonneumann", when: (s) => s.b.replicator >= 1 },
    { id: "he3", when: (s) => !!s.visited.giant },
    { id: "corona", when: (s) => !!s.visited.sun },
    { id: "dyson", when: (s) => s.b.dyson >= 1 },
    { id: "statite", when: (s) => !!s.r.statite },
    { id: "criswell", when: (s) => !!s.r.lift },
    { id: "mercury", when: (s) => !!s.visited.ione },
    { id: "chthon", when: (s) => !!s.visited.core },
    { id: "dustgrain", when: (s) => !!s.visited.dust },
    { id: "metals", when: (s) => s.b.separator >= 1 },
    { id: "seismo", when: (s) => s.b.seismo >= 1 },
    { id: "betelgeuse", when: (s) => s.star.stage >= 1 },
    { id: "typeII", when: (s) => s.peakK >= 2 },
    { id: "carbon", when: (s) => s.star.stage >= 2 },
    { id: "iron", when: (s) => s.star.stage >= 4 },
    { id: "sn1987a", when: (s) => !!s.r.neutrino },
    { id: "nova", when: (s) => s.star.done }
  ];
  var RULES = {
    baseReactorW: 500,
    // palubní reaktor platformy
    offlineShare: 0.1,
    // offline přinese 10 % produkce
    offlineCapSec: 8 * 3600,
    // nejvýš za 8 hodin
    autoClicksPerSec: 3,
    eventEverySec: [180, 360],
    eventTtlSec: 20,
    chapter1K: 1
    // konec Kapitoly 1 = Kardašev Typ I
    // konec Kapitoly 2 = supernova
  };

  // src/core/engine.ts
  var DYSON_BOOST = 1.1;
  var DYSON_CROWD = 1.03;
  var DYSON_CH1_CHEAP = 20;
  var DYSON_CH1_DISCOUNT = 0.4;
  var CONVERTERS = ["smelter", "forge", "lab", "qcomp", "replicator", "lifter", "separator", "seismo"];
  var CONVERTER_SCALES = { smelter: true, forge: true, lifter: true, separator: true, seismo: true };
  var zeroRates = () => ({ ore: 0, metal: 0, energy: 0, data: 0, plasma: 0 });
  function stageDef(s) {
    return STAGES[Math.min(s.star.stage, STAGES.length - 1)];
  }
  function luminosity(s) {
    return s.star.done ? 0 : stageDef(s).L;
  }
  function liftEff(s) {
    return (s.r.rotlift ? 3 : 1) * (s.r.magsail ? 2 : 1) * (s.visited.kuiper ? 3 : 1);
  }
  function liftJ(s) {
    return STAR.G * STAR.massKg / (stageDef(s).R * STAR.rSun) * STAR.liftShare / liftEff(s);
  }
  function metallicity(s) {
    return stageDef(s).z;
  }
  function dysonRaw(s) {
    return s.b.dyson * B.dyson.prod.energy * mult(s, "dyson");
  }
  function coverage(s) {
    const Lw = luminosity(s);
    return Lw ? 1 - Math.exp(-dysonRaw(s) / Lw) : 0;
  }
  function dysonSat(s) {
    const raw = dysonRaw(s);
    return raw > 0 ? luminosity(s) * coverage(s) / raw : 1;
  }
  function prestigeMult(s) {
    return 1 + PRESTIGE.per * s.p.pts;
  }
  function prestigeTarget(s) {
    return s.p.run > PRESTIGE.metalUnit ? Math.floor(PRESTIGE.perOrder * Math.log10(s.p.run / PRESTIGE.metalUnit)) : 0;
  }
  function prestigeGain(s) {
    return Math.max(0, prestigeTarget(s) - s.p.pts);
  }
  function mult(s, id) {
    const r = s.r, v = s.visited;
    let m = 1;
    switch (id) {
      case "drone":
        if (r.swarm) m *= 2;
        if (r.swarm2) m *= 3;
        if (r.nano) m *= 4;
        break;
      case "drill":
        if (r.swarm2) m *= 3;
        if (r.nano) m *= 4;
        break;
      case "catcher":
        if (r.nano) m *= 4;
        break;
      case "smelter":
        if (r.arc) m *= 2;
        if (r.induct) m *= 4;
        break;
      case "forge":
        if (r.plasma) m *= 3;
        if (r.nano) m *= 4;
        if (r.induct) m *= 4;
        break;
      case "lab":
        if (r.lab2) m *= 2;
        if (v.moon) m *= 1.5;
        if (r.cryo) m *= 3;
        if (r.supercond) m *= 2;
        if (r.quantum) m *= 4;
        break;
      case "replicator":
        if (r.nano) m *= 3;
        break;
      case "seismo":
        if (r.census) m *= 2;
        if (r.seis2) m *= 10;
        if (r.pulse2) m *= 3;
        if (r.silicon) m *= 10;
        break;
      case "lifter":
        if (r.coil) m *= 3;
        if (r.rotlift) m *= 3;
        if (r.magsail) m *= 2;
        if (v.kuiper) m *= 3;
        break;
      case "separator":
        if (r.mg) m *= 5;
        if (r.iron) m *= 5;
        if (v.ione) m *= 3;
        if (v.core) m *= 4;
        break;
    }
    if (id === "lab" || id === "qcomp") {
      if (r.silicon) m *= 10;
    }
    if (id === "lifter" || id === "separator" || id === "seismo") {
      m *= Math.pow(DYSON_BOOST, s.b.dyson) * prestigeMult(s);
      if (id === "lifter" && s.star.collapse >= 0) m *= STAR.collapseLift;
    }
    if (B[id].prod?.energy) {
      if (id === "solar" && r.thinfilm) m *= 2;
      if (id === "mirror" && r.optics) m *= 3;
      if (id === "dyson" && r.statite) m *= 2;
      if (id === "dyson" && r.beam) m *= 2;
      if (id === "dyson" && r.lagrange) m *= 2;
      if (id === "dyson" && r.sail) m *= 4;
      if (id === "dyson" && r.highorbit) m *= 2;
      if (id === "dyson" && r.carbon) m *= 5;
      if (id === "dyson" && r.neon) m *= 3;
      if (id === "dyson" && v.dust) m *= 3;
      if (id === "dyson") m *= prestigeMult(s);
      if (v.giant) m *= 2;
      if (r.supercond) m *= 2;
      m *= Math.pow(DYSON_BOOST, s.b.dyson);
    }
    return m;
  }
  function baseOreRate(s) {
    return ["drone", "drill", "catcher"].reduce((a, id) => a + s.b[id] * B[id].prod.ore * mult(s, id), 0);
  }
  function clickPower(s) {
    let p = 1;
    if (s.r.vib) p *= 3;
    if (s.r.vib2) p *= 5;
    if (s.r.resonance) p += baseOreRate(s) * 0.05;
    return p;
  }
  function reactorW(s) {
    return RULES.baseReactorW * (s.r.supercond ? 2 : 1);
  }
  function prodOf(s, id, r) {
    const base = B[id].prod?.[r];
    if (!base) return 0;
    let v = base * mult(s, id);
    if (id === "separator") v *= metallicity(s);
    if (id === "dyson") v *= dysonSat(s);
    return v;
  }
  function consOf(s, id, r) {
    if (id === "swarmfab") return r === "metal" || r === "energy" ? makesOf(s, id) * fabPriceFrac(s) * (cost(s, "dyson")[r] ?? 0) : 0;
    const base = B[id].cons?.[r];
    if (!base) return 0;
    let v = base * (CONVERTER_SCALES[id] ? mult(s, id) : 1);
    if (id === "lifter" && r === "energy") v *= liftJ(s);
    return v;
  }
  function makesOf(s, id) {
    const mk = B[id].makes;
    return mk ? mk.rate * mult(s, id) : 0;
  }
  var FAB_MAX = 0.5;
  var fabPriceFrac = (s) => s.r.mg ? 0.25 : 0.5;
  function fabTick(s, dt) {
    const n = Math.floor(s.b.swarmfab);
    if (!n || s.off.swarmfab) {
      s.eff.swarmfab = n ? 0 : 1;
      s.fab = { ...s.fab ?? {}, m: 0, e: 0, made: 0, lim: null, target: null };
      return;
    }
    const { p, c } = rates(s);
    const own = (r) => consOf(s, "swarmfab", r) * n * (s.eff.swarmfab ?? 1);
    const netM = Math.max(0, p.metal - (c.metal - own("metal"))), netE = Math.max(0, p.energy - (c.energy - own("energy")));
    const needM = consOf(s, "swarmfab", "metal") * n, needE = consOf(s, "swarmfab", "energy") * n;
    const e = Math.max(0, Math.min(1, needM ? FAB_MAX * netM / needM : 1, needE ? FAB_MAX * netE / needE : 1));
    const made = makesOf(s, "swarmfab") * n * e * dt, m = needM * e * dt, en = needE * e * dt;
    s.res.metal = Math.max(0, s.res.metal - m);
    s.res.energy = Math.max(0, s.res.energy - en);
    s.b.dyson += made;
    s.bought.dyson = (s.bought.dyson ?? 0) + made;
    s.eff.swarmfab = e;
    const rm = needM ? FAB_MAX * netM / needM : 1, re = needE ? FAB_MAX * netE / needE : 1;
    const lim = e >= 0.995 ? null : rm <= re ? "metal" : "energy";
    const prev = s.fab ?? {};
    s.fab = { m: m / dt, e: en / dt, made: made / dt, lim, target: null, bank: prev.bank ?? { metal: 0, energy: 0, plasma: 0 }, built: prev.built ?? { lifter: 0, separator: 0 } };
    chainTick(s, dt, lim);
  }
  // Loděnice dostavuje i těžební řetězec, když ji brzdí kov: chybí-li plazma, trychtýř, jinak separátor.
  // Bere jen podíl čistého přírůstku, který zbyde po kolektorech, takže zásoby nevyčerpá.
  var CHAIN_SHARE = 0.3;
  function chainTarget(s) {
    if (!s.b.lifter || !s.b.separator || !isUnlocked(s, "lifter") || !isUnlocked(s, "separator")) return null;
    if (s.off.lifter || s.off.separator) return null;
    // separátor jen když plazma přibývá (aspoň 10 % výroby trychtýřů), jinak trychtýř
    const { p, c } = rates(s);
    if (p.plasma - c.plasma > 0.1 * p.plasma) return "separator";
    return (s.eff.lifter ?? 1) < 0.97 ? null : "lifter";
  }
  function chainTick(s, dt, lim) {
    const f = s.fab, target = lim === "metal" ? chainTarget(s) : null;
    f.target = target;
    if (!target) return;
    const { p, c } = rates(s);
    for (const r of ["metal", "energy", "plasma"]) {
      const v = Math.max(0, p[r] - c[r]) * CHAIN_SHARE * dt;
      const take = Math.min(v, s.res[r]);
      s.res[r] -= take;
      f.bank[r] += take;
    }
    for (let k = 0; k < 2; k++) {
      const cst = cost(s, target);
      if (!Object.keys(cst).every((r) => f.bank[r] >= cst[r])) break;
      for (const r of Object.keys(cst)) f.bank[r] -= cst[r];
      s.b[target] += 1;
      s.bought[target] = (s.bought[target] ?? 0) + 1;
      f.built[target] += 1;
    }
    // co se do řetězce nepoužije (jiné suroviny než cíl), se vrací do skladu
    const need = cost(s, target);
    for (const r of ["metal", "energy", "plasma"]) if (!(r in need) && f.bank[r] > 0) {
      s.res[r] += f.bank[r];
      f.bank[r] = 0;
    }
  }
  function powerW(s) {
    let w = reactorW(s);
    for (const id of BUILDING_IDS) if (s.b[id] && B[id].prod?.energy) w += prodOf(s, id, "energy") * s.b[id];
    return w;
  }
  function kardashev(s) {
    return (Math.log10(Math.max(1, powerW(s))) - 6) / 10;
  }
  var effOf = (s, id) => B[id].cons ? s.off[id] ? 0 : s.eff[id] ?? 1 : 1;
  function rates(s) {
    const p = zeroRates(), c = zeroRates();
    p.energy += reactorW(s);
    for (const id of BUILDING_IDS) {
      const n = s.b[id];
      if (!n) continue;
      const e = effOf(s, id);
      for (const r of Object.keys(B[id].prod ?? {})) p[r] += prodOf(s, id, r) * n * e;
      for (const r of Object.keys(B[id].cons ?? {})) c[r] += consOf(s, id, r) * n * e;
    }
    if (s.r.auto) p.ore += clickPower(s) * RULES.autoClicksPerSec;
    return { p, c };
  }
  function rateParts(s, r) {
    const prod = [], cons = [];
    if (r === "energy") prod.push(["reactor", reactorW(s)]);
    for (const id of BUILDING_IDS) {
      const n = s.b[id];
      if (!n) continue;
      const e = effOf(s, id);
      const pv = prodOf(s, id, r), cv = consOf(s, id, r);
      if (pv) prod.push([id, pv * n * e]);
      if (cv) cons.push([id, cv * n * e]);
    }
    if (r === "ore" && s.r.auto) prod.push(["auto", clickPower(s) * RULES.autoClicksPerSec]);
    return { prod, cons };
  }
  function add(s, r, v) {
    s.res[r] += v;
    s.total[r] += v;
  }
  function cost(s, id, n = s.bought[id] ?? Math.floor(s.b[id])) {
    const d = B[id], o = {};
    const extra = id === "dyson" && s.p.base >= 0 ? Math.pow(DYSON_CROWD, Math.max(0, n - s.p.base)) : 1;
    const ch1 = id === "dyson" && !s.chapterDone && n < DYSON_CH1_CHEAP ? DYSON_CH1_DISCOUNT : 1;
    for (const r of Object.keys(d.base)) o[r] = d.base[r] * Math.pow(d.growth, n) * extra * (r === "metal" ? ch1 : 1);
    return o;
  }
  function affordable(s, c) {
    return Object.keys(c).every((r) => s.res[r] >= c[r]);
  }
  function pay(s, c) {
    for (const r of Object.keys(c)) s.res[r] -= c[r];
  }
  function isUnlocked(s, id) {
    return B[id].unlock(s);
  }
  function buy(s, id, max = false) {
    if (!isUnlocked(s, id)) return 0;
    const limit = max === true ? 1e4 : typeof max === "number" ? max : 1;
    if (limit > 1 && limit < 1e4 && previewMax(s, id, limit).count < limit) return 0;
    let k = 0;
    while (k < limit) {
      const c = cost(s, id);
      if (!affordable(s, c)) break;
      pay(s, c);
      s.b[id] += 1;
      s.bought[id] = (s.bought[id] ?? 0) + 1;
      k++;
    }
    return k;
  }
  var SELL_REFUND = 0.5;
  function sell(s, id, n = 1) {
    let k = 0;
    while (k < n && Math.floor(s.b[id]) >= 1) {
      s.b[id] -= 1;
      s.bought[id] = Math.max(0, (s.bought[id] ?? 1) - 1);
      const c = cost(s, id);
      for (const r of Object.keys(c)) s.res[r] += c[r] * SELL_REFUND;
      k++;
    }
    return k;
  }
  function previewMax(s, id, limit = 1e4, all = false) {
    const res = { ...s.res };
    let n = s.bought[id] ?? Math.floor(s.b[id]);
    let count = 0;
    const total = {};
    while (count < limit) {
      const c = cost(s, id, n);
      if (!all && !Object.keys(c).every((r) => res[r] >= c[r])) break;
      for (const r of Object.keys(c)) {
        res[r] -= c[r];
        total[r] = (total[r] ?? 0) + c[r];
      }
      n++;
      count++;
    }
    return { count, total };
  }
  function researchAvailable(s, id) {
    return !s.r[id] && (!R[id].req || R[id].req(s));
  }
  function doResearch(s, id) {
    if (!researchAvailable(s, id) || !affordable(s, R[id].cost)) return false;
    pay(s, R[id].cost);
    s.r[id] = true;
    return true;
  }
  function travelTime(_s, id) {
    return L[id].time;
  }
  function locationOpen(s, id) {
    return id !== "belt" && (!L[id].req || L[id].req(s) || !!s.visited[id]);
  }
  function canTravel(s, id) {
    return !!s.r.scan && !s.travel && locationOpen(s, id) && !s.visited[id] && s.res.energy >= L[id].cost;
  }
  function depart(s, id) {
    if (!canTravel(s, id)) return false;
    s.res.energy -= L[id].cost;
    s.travel = { from: s.loc, to: id, t: 0, total: id === "belt" ? 8 : travelTime(s, id) };
    return true;
  }
  function eventReward(s, id) {
    const ev = EVENTS[id];
    const { p } = rates(s);
    return Math.max(ev.min, p[ev.res] * ev.seconds);
  }
  function claimEvent(s) {
    if (!s.event) return null;
    const id = s.event.id, amount2 = eventReward(s, id);
    add(s, EVENTS[id].res, amount2);
    s.event = null;
    s.nextEvent = RULES.eventEverySec[0] + Math.random() * (RULES.eventEverySec[1] - RULES.eventEverySec[0]);
    return { id, amount: amount2 };
  }
  function mine(s) {
    const p = clickPower(s);
    add(s, "ore", p);
    s.clicks++;
    return p;
  }
  function tick(s, dt, rng = Math.random) {
    add(s, "energy", reactorW(s) * dt);
    for (const id of BUILDING_IDS) {
      const d = B[id], n = s.b[id];
      if (!n || d.cons) continue;
      for (const r of Object.keys(d.prod ?? {})) add(s, r, prodOf(s, id, r) * n * dt);
      if (d.makes && !d.cons) s.b[d.makes.building] += makesOf(s, id) * Math.floor(n) * dt;
    }
    if (s.r.auto) add(s, "ore", clickPower(s) * RULES.autoClicksPerSec * dt);
    for (const id of CONVERTERS) {
      const d = B[id], n = s.b[id];
      if (!n || s.off[id]) {
        s.eff[id] = n ? 0 : 1;
        continue;
      }
      const need = Object.keys(d.cons).map((r) => [r, consOf(s, id, r) * n * dt]);
      let e = 1;
      for (const [r, v] of need) if (v > 0) e = Math.min(e, s.res[r] / v);
      e = Math.max(0, Math.min(1, e));
      const out = Object.keys(d.prod ?? {}).map((r) => [r, prodOf(s, id, r) * n * dt * e]);
      const made = d.makes ? makesOf(s, id) * Math.floor(n) * dt * e : 0;
      for (const [r, v] of need) s.res[r] -= v * e;
      for (const [r, v] of out) add(s, r, v);
      if (id === "separator") {
        const got = out.reduce((a, [, v]) => a + v, 0);
        s.p.run += got;
        s.p.total = (s.p.total ?? s.p.run - got) + got;
      }
      if (d.makes) s.b[d.makes.building] += made;
      s.eff[id] = e;
    }
    fabTick(s, dt);
    if (s.travel) {
      s.travel.t += dt;
      if (s.travel.t >= s.travel.total) {
        s.visited[s.travel.to] = true;
        s.loc = "belt";
        s.travel = null;
      }
    }
    if (s.event) {
      s.event.ttl -= dt;
      if (s.event.ttl <= 0) {
        s.event = null;
        s.nextEvent = RULES.eventEverySec[0];
      }
    } else {
      s.nextEvent -= dt;
      if (s.nextEvent <= 0) {
        const ok = EVENT_IDS.filter((id) => EVENTS[id].unlock(s));
        if (ok.length) s.event = { id: ok[Math.floor(rng() * ok.length)], ttl: RULES.eventTtlSec };
        else s.nextEvent = 90;
      }
    }
    if (s.chapterDone >= 1 && !s.star.done) {
      const d = stageDef(s), lp = Math.log10(Math.max(1, stageValue(s))), ln = Math.log10(stageNeed(s));
      if (s.star.p0 === void 0) s.star.p0 = Math.min(lp, ln - 1);
      const pf = ln > s.star.p0 ? Math.max(0, Math.min(1, (lp - s.star.p0) / (ln - s.star.p0))) : 1;
      const f0 = s.star.t / d.sec, speed = 1 + STAR.catchUp * Math.max(0, pf - f0);
      s.star.t = Math.min(d.sec * Math.max(pf, f0), s.star.t + dt * speed, d.sec);
      if (s.star.collapse >= 0) {
        s.star.collapse -= dt;
        if (s.star.collapse <= 0) supernova(s);
      }
    }
    s.time += dt;
    const k = kardashev(s);
    if (k > s.peakK) s.peakK = k;
    if (!s.chapterDone && k >= RULES.chapter1K) s.chapterDone = 1;
    if (s.chapterDone >= 1 && s.p.base < 0) s.p.base = Math.floor(s.b.dyson);
    return checkJournal(s);
  }
  function clockYears(s) {
    const d = stageDef(s);
    return d.years / d.sec;
  }
  var LAST_STAGE = STAGES.length - 1;
  var stageByMetal = (s) => !!stageDef(s).needM;
  var stageNeed = (s) => stageDef(s).needM ?? stageDef(s).needW;
  var stageValue = (s) => stageByMetal(s) ? s.p.total ?? s.p.run : powerW(s);
  function stageReady(s) {
    const d = stageDef(s);
    const time = s.star.t >= d.sec, power2 = stageValue(s) >= stageNeed(s);
    const research = s.star.stage < LAST_STAGE || !!s.r.neutrino;
    return { time, power: power2, research, ok: s.chapterDone >= 1 && !s.star.done && s.star.collapse < 0 && time && power2 && research };
  }
  function redLoss(s) {
    if (s.star.stage !== 0 || s.r.highorbit) return { dyson: 0, lifter: 0 };
    return { dyson: Math.floor(s.b.dyson * STAR.redLoss), lifter: Math.floor(s.b.lifter) };
  }
  function advanceStage(s) {
    if (!stageReady(s).ok) return false;
    if (s.star.stage >= LAST_STAGE) {
      s.star.collapse = STAR.collapseSec;
      return true;
    }
    const loss = redLoss(s);
    if (loss.dyson || loss.lifter) {
      s.b.dyson -= loss.dyson;
      s.bought.dyson = Math.max(0, (s.bought.dyson ?? 0) - loss.dyson);
      s.b.lifter -= loss.lifter;
      s.bought.lifter = Math.max(0, (s.bought.lifter ?? 0) - loss.lifter);
    }
    s.star.stage++;
    s.star.t = 0;
    s.star.p0 = void 0;
    return true;
  }
  var STAR_BUILDINGS = ["dyson", "lifter", "separator", "seismo", "swarmfab"];
  function supernova(s) {
    const cov = coverage(s);
    add(s, "energy", STAR.snEnergyJ * cov);
    add(s, "metal", 2 * 1989e27 * cov);
    for (const id of STAR_BUILDINGS) {
      s.b[id] = 0;
      s.bought[id] = 0;
      s.off[id] = false;
    }
    s.res.plasma = 0;
    s.star.collapse = -1;
    s.star.done = true;
    if (s.event?.id === "prominence" || s.event?.id === "flare") s.event = null;
    if (s.chapterDone < 2) s.chapterDone = 2;
  }
  function canRebuild(s) {
    return !!s.r.redesign && !s.star.done && s.star.collapse < 0 && prestigeGain(s) >= 1;
  }
  function rebuild(s) {
    if (!canRebuild(s)) return 0;
    const g = prestigeGain(s);
    s.p.pts += g;
    s.p.run = 0;
    s.p.count++;
    const keep = Math.max(0, s.p.base);
    const left = { dyson: keep, lifter: 1, separator: 1 };
    for (const id of STAR_BUILDINGS) {
      s.b[id] = left[id] ?? 0;
      s.bought[id] = left[id] ?? 0;
    }
    s.res.metal = 0;
    s.res.energy = 0;
    s.res.plasma = 0;
    return g;
  }
  function checkJournal(s) {
    const out = [];
    const day = Math.floor(s.time) + 1;
    for (const st of STORY) if (!s.story[st.id] && st.when(s)) {
      s.story[st.id] = true;
      s.log.unshift({ key: "story." + st.id, kind: "story", day });
      out.push(st.id);
    }
    const ctx2 = { powerW: powerW(s) };
    for (const f of FACTS) if (!s.facts[f.id] && f.when(s, ctx2)) {
      s.facts[f.id] = true;
      s.log.unshift({ key: "fact." + f.id, kind: "fact", day });
      out.push(f.id);
    }
    if (s.log.length > 120) s.log.length = 120;
    return out;
  }
  function offlineGain(s, seconds) {
    const sec = Math.min(Math.max(0, seconds), RULES.offlineCapSec);
    const { p, c } = rates(s);
    const got = {};
    for (const r of RESOURCES) {
      const net = p[r] - c[r];
      if (net > 0) {
        const v = net * sec * RULES.offlineShare;
        add(s, r, v);
        got[r] = v;
      }
    }
    return got;
  }

  // src/core/state.ts
  var SAVE_VERSION = 1;
  var zero = (keys) => Object.fromEntries(keys.map((k) => [k, 0]));
  function newState(now = Date.now()) {
    return {
      v: SAVE_VERSION,
      res: zero(RESOURCES),
      total: zero(RESOURCES),
      b: zero(BUILDING_IDS),
      bought: zero(BUILDING_IDS),
      r: {},
      off: {},
      eff: {},
      visited: { belt: true },
      loc: "belt",
      travel: null,
      event: null,
      nextEvent: 180,
      time: 0,
      clicks: 0,
      story: {},
      facts: {},
      log: [],
      chapterDone: 0,
      peakK: -1,
      star: { stage: 0, t: 0, collapse: -1, done: false },
      p: { pts: 0, run: 0, count: 0, base: -1 },
      settings: { sound: false, lang: "cs", vol: {} },
      last: now
    };
  }
  function migrate(raw) {
    const base = newState();
    if (!raw || typeof raw !== "object") return base;
    const o = raw;
    const out = { ...base };
    for (const k of Object.keys(base)) {
      const bv = base[k];
      const ov = o[k];
      if (ov === void 0) continue;
      if (bv && typeof bv === "object" && !Array.isArray(bv) && ov && typeof ov === "object") out[k] = { ...bv, ...ov };
      else out[k] = ov;
    }
    if (Array.isArray(out.log)) out.log = out.log.filter((e) => e.kind !== "event");
    out.v = SAVE_VERSION;
    return out;
  }
  function encodeSave(s) {
    const json = JSON.stringify(s);
    const bytes2 = new TextEncoder().encode(json);
    let bin = "";
    bytes2.forEach((b) => {
      bin += String.fromCharCode(b);
    });
    return "SH1." + btoa(bin);
  }
  function decodeSave(text) {
    try {
      const body = text.trim().replace(/^SH1\./, "");
      const bin = atob(body);
      const bytes2 = Uint8Array.from(bin, (c) => c.charCodeAt(0));
      return migrate(JSON.parse(new TextDecoder().decode(bytes2)));
    } catch {
      return null;
    }
  }

  // src/core/format.ts
  var SUP = { "-": "\u207B", "0": "\u2070", "1": "\xB9", "2": "\xB2", "3": "\xB3", "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077", "8": "\u2078", "9": "\u2079" };
  var PREFIX = ["", "k", "M", "G", "T", "P", "E", "Z", "Y", "R", "Q"];
  var decimalSep = ",";
  function fixed(n, d) {
    return n.toFixed(d).replace(".", decimalSep);
  }
  function sci(n, digits = 2) {
    if (n === 0) return "0";
    const e = Math.floor(Math.log10(Math.abs(n)));
    const m = n / Math.pow(10, e);
    return `${fixed(m, digits)}\xB710${String(e).split("").map((c) => SUP[c] ?? c).join("")}`;
  }
  function num(n) {
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
  function si(n, unit) {
    const a = Math.abs(n);
    if (a < 1) return `${fixed(n, a === 0 ? 0 : 2)} ${unit}`;
    const e = Math.floor(Math.log10(a) / 3);
    if (e >= PREFIX.length) return `${sci(n)} ${unit}`;
    const v = n / Math.pow(1e3, e);
    const d = v >= 100 ? 0 : v >= 10 ? 1 : 2;
    return `${fixed(v, e === 0 && v % 1 === 0 ? 0 : d)} ${PREFIX[e]}${unit}`;
  }
  function mass(kg) {
    const a = Math.abs(kg);
    if (a < 1e3) return `${fixed(kg, a < 10 && a % 1 ? 1 : 0)} kg`;
    if (a < 1e9) {
      const t2 = kg / 1e3, at = Math.abs(t2);
      if (at < 100) return `${fixed(t2, at < 10 ? 2 : 1)} t`;
      return `${Math.floor(t2).toLocaleString("cs-CZ").replace(/\s/g, "\xA0")} t`;
    }
    return `${sci(kg)} kg`;
  }
  function bytes(b) {
    return si(b, "B");
  }
  function energy(j) {
    return si(j, "J");
  }
  function power(w) {
    return si(w, "W");
  }
  function duration(sec) {
    sec = Math.max(0, Math.ceil(sec));
    const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
    if (h) return `${h} h ${String(m).padStart(2, "0")} min`;
    if (m) return `${m} min ${String(s).padStart(2, "0")} s`;
    return `${s} s`;
  }
  function kValue(k) {
    return fixed(k, 2);
  }

  // src/ui/scene.ts
  var reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stars = [];
  function sizeStars(c) {
    const d = Math.min(2, devicePixelRatio || 1);
    c.width = innerWidth * d;
    c.height = innerHeight * d;
    const n = Math.round(innerWidth * innerHeight / 4500);
    stars = Array.from({ length: n }, () => {
      const tint = Math.random() < 0.12 ? "#ffd9b0" : Math.random() < 0.2 ? "#bcd0ff" : "#e6e9ff";
      return [Math.random() * c.width, Math.random() * c.height, (Math.random() * 1.2 + 0.3) * d, Math.random() * 6, tint];
    });
  }
  function drawStars(c, time) {
    const x = c.getContext("2d");
    x.clearRect(0, 0, c.width, c.height);
    for (const [sx, sy, r, p, tint] of stars) {
      x.globalAlpha = reduce ? 0.5 : 0.3 + 0.3 * Math.sin(time * 0.6 + p);
      x.fillStyle = tint;
      x.fillRect(sx, sy, r, r);
    }
    x.globalAlpha = 1;
  }
  var seed = 7;
  var rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  var LATTICE = 64;
  var lat = [];
  var lerp = (a, b, t2) => a + (b - a) * t2;
  var fade = (t2) => t2 * t2 * (3 - 2 * t2);
  function vnoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = fade(x - xi), yf = fade(y - yi);
    const g = (i, j) => lat[(i & LATTICE - 1) * LATTICE + (j & LATTICE - 1)];
    return lerp(lerp(g(xi, yi), g(xi + 1, yi), xf), lerp(g(xi, yi + 1), g(xi + 1, yi + 1), xf), yf);
  }
  function fbm(x, y, oct = 5) {
    let v = 0, a = 0.5, f = 1;
    for (let i = 0; i < oct; i++) {
      v += a * vnoise(x * f, y * f);
      a *= 0.5;
      f *= 2.03;
    }
    return v;
  }
  var tex = null;
  var texFor = 0;
  var shapeR = () => 1;
  var SS = 2;
  var LIGHT = (() => {
    const v = [-0.78, -0.42, 0.46];
    const l = Math.hypot(...v);
    return v.map((a) => a / l);
  })();
  var LCOL = [0.86, 0.93, 1.1];
  function bakeRock(W) {
    seed = 11;
    lat.length = 0;
    for (let i = 0; i < LATTICE * LATTICE; i++) lat.push(rnd());
    const harm = Array.from({ length: 9 }, (_, k) => ({ k: k + 2, amp: 0.085 / (k + 1) ** 0.85 * (0.5 + rnd()), ph: rnd() * Math.PI * 2 }));
    shapeR = (a) => 0.83 + harm.reduce((s, h) => s + h.amp * Math.sin(h.k * a + h.ph), 0) + (vnoise(Math.cos(a) * 6 + 30, Math.sin(a) * 6 + 30) - 0.5) * 0.035;
    const craters = [];
    for (let i = 0; i < 34; i++) {
      const tier = i < 3 ? 0 : i < 11 ? 1 : 2;
      const r = tier === 0 ? 0.16 + rnd() * 0.1 : tier === 1 ? 0.06 + rnd() * 0.05 : 0.018 + rnd() * 0.03;
      const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * 0.8;
      craters.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, r, fresh: tier === 2 ? rnd() < 0.35 : rnd() < 0.15 });
    }
    const S2 = W * SS, R0 = S2 * 0.42, c = S2 / 2;
    const bump = (u, v, lim) => {
      let h = (fbm(u * 2.4 + 5, v * 2.4 + 9) - 0.5) * 0.22 + (fbm(u * 9 + 50, v * 9 + 50, 4) - 0.5) * 0.05 + (fbm(u * 28, v * 28, 2) - 0.5) * 0.012;
      let ej = 0, floor = 0;
      for (const k of craters) {
        const cr = Math.hypot(k.x, k.y) / lim, z0 = Math.sqrt(Math.max(0.06, 1 - cr * cr));
        const er = cr > 1e-4 ? [k.x / Math.hypot(k.x, k.y), k.y / Math.hypot(k.x, k.y)] : [1, 0];
        const dx = u - k.x, dy = v - k.y, dr = (dx * er[0] + dy * er[1]) / z0, dt = -dx * er[1] + dy * er[0];
        const d = Math.hypot(dr, dt) / k.r;
        if (d < 1) {
          h -= (1 - d * d) * k.r * 0.75;
          floor = Math.max(floor, 1 - d);
        } else if (d < 1.5) h += Math.sin((d - 1) / 0.5 * Math.PI) * k.r * 0.28;
        if (k.fresh && d < 2.6) ej = Math.max(ej, (1 - Math.max(0, d - 1) / 1.6) * 0.6);
      }
      return { h, ej, floor };
    };
    const cv = document.createElement("canvas");
    cv.width = cv.height = S2;
    const x = cv.getContext("2d"), img = x.createImageData(S2, S2), px = img.data;
    const e = 1.2 / R0;
    for (let j = 0; j < S2; j++) for (let i = 0; i < S2; i++) {
      const u = (i - c) / R0, v = (j - c) / R0, rr = Math.hypot(u, v), lim = shapeR(Math.atan2(v, u));
      if (rr >= lim) continue;
      const q = rr / lim, z = Math.sqrt(Math.max(0, 1 - q * q));
      const b0 = bump(u, v, lim), bx = bump(u + e, v, lim).h - b0.h, by = bump(u, v + e, lim).h - b0.h;
      let nx = u / lim * 0.95 - bx / e * 0.55, ny = v / lim * 0.95 - by / e * 0.55, nz = z * 0.95 + 0.05;
      const nl = Math.hypot(nx, ny, nz);
      nx /= nl;
      ny /= nl;
      nz /= nl;
      const nd = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2];
      const diff = Math.max(0, nd), wrap = Math.max(0, (nd + 0.25) / 1.25) ** 2;
      const n = fbm(u * 3.2 + 3, v * 3.2 + 7);
      let r = lerp(70, 132, n), g = lerp(66, 124, n), b = lerp(64, 118, n);
      const rust = fbm(u * 1.8 + 40, v * 1.8 + 40, 4);
      if (rust > 0.56) {
        const k2 = Math.min(1, (rust - 0.56) / 0.12) * 0.55;
        r = lerp(r, 150, k2);
        g = lerp(g, 98, k2);
        b = lerp(b, 70, k2);
      }
      r *= 1 - b0.floor * 0.25;
      g *= 1 - b0.floor * 0.25;
      b *= 1 - b0.floor * 0.22;
      r = lerp(r, 175, b0.ej * 0.5);
      g = lerp(g, 170, b0.ej * 0.5);
      b = lerp(b, 165, b0.ej * 0.5);
      const metal = fbm(u * 40 + 7, v * 40 + 3, 2) > 0.74 ? 1 : 0;
      const hz = nz + LIGHT[2], hl = Math.hypot(LIGHT[0], LIGHT[1], hz), spec = metal * Math.max(0, (nx * LIGHT[0] + ny * LIGHT[1] + nz * hz) / hl) ** 30 * 1.6;
      const bounce = (1 - wrap) * 0.07 * Math.max(0, -nx * 0.6 + ny * 0.6 + 0.3);
      const rim = q > 0.9 && nd > 0 ? ((q - 0.9) / 0.1) ** 2 * 0.45 : 0;
      const k = wrap * 1.15 + diff * 0.15 + 0.035;
      const o = (j * S2 + i) * 4;
      px[o] = Math.min(255, r * (k * LCOL[0] + bounce * 1.2) + (spec + rim) * 220);
      px[o + 1] = Math.min(255, g * (k * LCOL[1] + bounce * 0.95) + (spec + rim) * 235);
      px[o + 2] = Math.min(255, b * (k * LCOL[2] + bounce * 0.75) + (spec + rim) * 255);
      px[o + 3] = Math.min(255, (lim - rr) * R0 * 255);
    }
    x.putImageData(img, 0, 0);
    tex = cv;
    texFor = W;
  }
  function drawPlatform(x, cx, R0, t2) {
    const px = cx - R0 * 0.24, py = cx - R0 * 0.36, s = R0 / 210;
    x.save();
    x.translate(px, py);
    x.rotate(-0.45);
    x.scale(s, s);
    x.fillStyle = "rgba(10,12,24,0.55)";
    x.fillRect(-15, 3, 34, 6);
    x.fillStyle = "#9aa6c8";
    x.fillRect(-14, -4, 12, 8);
    x.fillRect(2, -6, 14, 10);
    x.fillStyle = "#5d6ea8";
    x.fillRect(-30, -2, 14, 4);
    x.fillRect(18, -2, 14, 4);
    x.fillStyle = "#d6dcf0";
    x.fillRect(7, -12, 2, 6);
    const on = reduce || t2 % 1.6 < 0.25;
    x.fillStyle = on ? "#ffb35c" : "rgba(255,179,92,0.25)";
    x.beginPath();
    x.arc(8, -13, on ? 2.6 : 1.6, 0, 7);
    x.fill();
    if (on) {
      x.fillStyle = "rgba(255,179,92,0.25)";
      x.beginPath();
      x.arc(8, -13, 7, 0, 7);
      x.fill();
    }
    x.fillStyle = "rgba(127,211,234,0.9)";
    x.fillRect(-10, -1, 2, 2);
    x.fillRect(6, -2, 2, 2);
    x.fillRect(11, -2, 2, 2);
    x.restore();
  }
  var bits = [];
  var pulse = 0;
  var clock = 0;
  function hitRock(px, py, W = 520) {
    pulse = 1;
    const c = W / 2, R0 = W * 0.42;
    if (px === void 0 || py === void 0) {
      const a = Math.random() * 7;
      px = c + Math.cos(a) * R0 * 0.6;
      py = c + Math.sin(a) * R0 * 0.6;
    }
    if (reduce) return;
    const base = Math.atan2(py - c, px - c);
    for (let i = 0; i < 12; i++) {
      const dust = i >= 8, a = base + (Math.random() - 0.5) * 1.6, sp = (dust ? 30 : 80) + Math.random() * (dust ? 50 : 160);
      bits.push({ x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: dust ? 1.1 : 0.55 + Math.random() * 0.4, size: dust ? 10 + Math.random() * 14 : 2 + Math.random() * 3, dust });
    }
    if (bits.length > 160) bits.splice(0, bits.length - 160);
  }
  function drawRock(c, dt, drones = 0) {
    const x = c.getContext("2d"), W = c.width, cx = W / 2, R0 = W * 0.42;
    if (!tex || texFor !== W) bakeRock(W);
    pulse = Math.max(0, pulse - dt * 6);
    clock += dt;
    x.clearRect(0, 0, W, W);
    const glow = x.createRadialGradient(cx, cx, R0 * 0.7, cx, cx, R0 * 1.3);
    glow.addColorStop(0, "rgba(242,165,65,0.08)");
    glow.addColorStop(1, "rgba(242,165,65,0)");
    x.fillStyle = glow;
    x.fillRect(0, 0, W, W);
    const n = Math.min(Math.floor(drones), 24), pos = [];
    for (let i = 0; i < n; i++) {
      const rad = R0 * (1.04 + i % 5 * 0.05), sp = 0.25 + i % 7 * 0.04, a = i * 2.39996 + (reduce ? 0 : clock * sp) * (i % 2 ? 1 : -1);
      const tilt = 0.32 + i % 3 * 0.08, ox = Math.cos(a) * rad, oy = Math.sin(a) * rad * tilt;
      const rot = i % 4 * 0.5 - 0.6, rx = ox * Math.cos(rot) - oy * Math.sin(rot), ry = ox * Math.sin(rot) + oy * Math.cos(rot);
      pos.push([cx + rx, cx + ry, Math.sin(a) < 0, i]);
    }
    const drawDrone = ([dx, dy, behind, i]) => {
      const fire = !reduce && Math.sin(clock * (1.3 + i % 5 * 0.21) + i * 1.7) > 0.93;
      if (fire && !behind) {
        const tx = cx + (dx - cx) * 0.55, ty = cx + (dy - cx) * 0.55;
        x.strokeStyle = "rgba(242,165,65,0.55)";
        x.lineWidth = 1.5;
        x.beginPath();
        x.moveTo(dx, dy);
        x.lineTo(tx, ty);
        x.stroke();
      }
      x.globalAlpha = behind ? 0.35 : 1;
      x.fillStyle = "rgba(127,211,234,0.25)";
      x.beginPath();
      x.arc(dx, dy, 6, 0, 7);
      x.fill();
      x.fillStyle = fire ? "#f2c27a" : "#cfeef7";
      x.beginPath();
      x.arc(dx, dy, 2.4, 0, 7);
      x.fill();
      x.globalAlpha = 1;
    };
    pos.filter((p) => p[2]).forEach(drawDrone);
    const sc = 1 - pulse * 0.035;
    x.save();
    x.translate(cx, cx);
    x.scale(sc, sc);
    x.drawImage(tex, -cx, -cx, W, W);
    x.translate(-cx, -cx);
    drawPlatform(x, cx, R0, clock);
    x.restore();
    pos.filter((p) => !p[2]).forEach(drawDrone);
    for (let i = bits.length - 1; i >= 0; i--) {
      const b = bits[i];
      b.life += dt;
      if (b.life >= b.max) {
        bits.splice(i, 1);
        continue;
      }
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.vx *= 0.96;
      b.vy *= 0.96;
      const k = 1 - b.life / b.max;
      if (b.dust) {
        x.fillStyle = `rgba(170,140,115,${0.18 * k})`;
        x.beginPath();
        x.arc(b.x, b.y, b.size * (1.4 - k * 0.6), 0, 7);
        x.fill();
      } else {
        x.fillStyle = `rgba(208,141,92,${k})`;
        x.fillRect(b.x, b.y, b.size, b.size);
      }
    }
  }
  var TILT = 0.42;
  var belt = [];
  var mapBg = null;
  var mapBgKey = "";
  var trail = [];
  function bodyPos(id, time) {
    const l = L[id];
    const a = l.angle + (reduce ? 0 : time * l.speed);
    return [Math.cos(a) * l.orbit, Math.sin(a) * l.orbit * TILT];
  }
  function front(id, time) {
    const l = L[id];
    return Math.sin(l.angle + (reduce ? 0 : time * l.speed)) >= 0;
  }
  function bakeMapBg(W, H, dpr) {
    const cv = document.createElement("canvas");
    cv.width = W * dpr;
    cv.height = H * dpr;
    const x = cv.getContext("2d");
    x.scale(dpr, dpr);
    let sd = 3;
    const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
    const g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
    g.addColorStop(0, "#141a3a");
    g.addColorStop(0.55, "#0c0f22");
    g.addColorStop(1, "#070812");
    x.fillStyle = g;
    x.fillRect(0, 0, W, H);
    for (const [cx, cy, rad, col] of [[0.18, 0.25, 0.45, "90,60,140"], [0.85, 0.75, 0.5, "40,90,150"], [0.7, 0.15, 0.3, "150,70,90"]]) {
      const n = x.createRadialGradient(cx * W, cy * H, 0, cx * W, cy * H, rad * W);
      n.addColorStop(0, `rgba(${col},0.10)`);
      n.addColorStop(1, `rgba(${col},0)`);
      x.fillStyle = n;
      x.fillRect(0, 0, W, H);
    }
    for (let i = 0; i < W * H / 900; i++) {
      const a = r() ** 2.2 * 0.8 + 0.1;
      x.fillStyle = r() < 0.15 ? `rgba(255,214,170,${a})` : `rgba(210,222,255,${a})`;
      const s = r() < 0.05 ? 1.6 : 0.8;
      x.fillRect(r() * W, r() * H, s, s);
    }
    return cv;
  }
  function litSphere(x, px, py, rad, cx, cy, base) {
    const dx = cx - px, dy = cy - py, d = Math.hypot(dx, dy) || 1, ox = dx / d * rad * 0.45, oy = dy / d * rad * 0.45;
    const g = x.createRadialGradient(px + ox, py + oy, rad * 0.1, px, py, rad * 1.05);
    g.addColorStop(0, base[0]);
    g.addColorStop(0.55, base[1]);
    g.addColorStop(1, base[2]);
    x.fillStyle = g;
    x.beginPath();
    x.arc(px, py, rad, 0, 7);
    x.fill();
  }
  function drawMap(c, s, time) {
    const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
    if (!W || !H) return;
    if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    }
    const x = c.getContext("2d");
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const key = `${W}x${H}@${dpr}`;
    if (!mapBg || mapBgKey !== key) {
      mapBg = bakeMapBg(W, H, dpr);
      mapBgKey = key;
    }
    x.drawImage(mapBg, 0, 0, W, H);
    if (!belt.length) {
      let sd = 9;
      const r = () => (sd = sd * 16807 % 2147483647) / 2147483647;
      belt = Array.from({ length: 320 }, () => ({ a: r() * Math.PI * 2, r: L.belt.orbit + (r() + r() + r() - 1.5) * 0.03, s: 0.5 + r() ** 3 * 1.6, b: 0.25 + r() * 0.6 }));
    }
    const cx = W / 2, cy = H / 2, sc = Math.min(W / 2 * 0.9, H / 2 / TILT * 0.82);
    const P = ([a, b]) => [cx + a * sc, cy + b * sc];
    const tt = reduce ? 0 : time;
    const orbit = (id, half) => {
      const rx = L[id].orbit * sc, ry = rx * TILT;
      x.beginPath();
      x.ellipse(cx, cy, rx, ry, 0, half === "back" ? Math.PI : 0, half === "back" ? Math.PI * 2 : Math.PI);
      x.strokeStyle = half === "back" ? "rgba(150,160,210,0.12)" : "rgba(170,180,230,0.28)";
      x.lineWidth = 1;
      x.stroke();
      for (let k = 0; k < 24; k++) {
        const a = k / 24 * Math.PI * 2, isFront = Math.sin(a) >= 0;
        if (half === "front" !== isFront) continue;
        x.fillStyle = isFront ? "rgba(170,180,230,0.35)" : "rgba(150,160,210,0.15)";
        x.fillRect(cx + Math.cos(a) * rx - 0.5, cy + Math.sin(a) * ry - 0.5, 1, 1);
      }
    };
    const beltPass = (half) => {
      for (const p of belt) {
        const a = p.a + tt * 0.012, sn = Math.sin(a);
        if (half === "front" !== sn >= 0) continue;
        const bx = cx + Math.cos(a) * p.r * sc, by = cy + sn * p.r * sc * TILT;
        x.fillStyle = `rgba(214,170,132,${p.b * (sn >= 0 ? 1 : 0.45)})`;
        x.fillRect(bx - p.s / 2, by - p.s / 2, p.s, p.s);
      }
    };
    for (const id of ["giant", "moon"]) orbit(id, "back");
    beltPass("back");
    const nd = s.star.done ? 0 : Math.min(Math.floor(s.b.dyson), 90);
    const swR = s.chapterDone >= 1 && s.star.stage >= 1 ? 0.13 : 0.07;
    const swarm = (half) => {
      for (let i = 0; i < nd; i++) {
        const ring = i % 3, a = i / nd * Math.PI * 2 * 3 + tt * (0.12 + ring * 0.03), rr = sc * (swR + ring * 0.012);
        const sn = Math.sin(a);
        if (half === "front" !== sn >= 0) continue;
        const tilt = [0.35, 0.6, 0.2][ring], rot = [0.3, -0.5, 1.1][ring];
        const ox = Math.cos(a) * rr, oy = sn * rr * tilt;
        const px = cx + ox * Math.cos(rot) - oy * Math.sin(rot), py = cy + ox * Math.sin(rot) + oy * Math.cos(rot);
        const glint = 0.45 + 0.55 * Math.max(0, Math.cos(a * 2 + tt));
        x.fillStyle = `rgba(242,178,90,${(sn >= 0 ? 1 : 0.35) * glint})`;
        x.fillRect(px - 1.2, py - 0.8, 2.4, 1.6);
      }
    };
    swarm("back");
    const st = s.chapterDone >= 1 ? s.star.stage : 0, red = st >= 1 && !s.star.done;
    const R2 = sc * (red ? 0.1 : 0.05), far = sc * 0.75, gl = red ? "255,140,80" : "140,165,255";
    if (s.star.done) {
      const neb = x.createRadialGradient(cx, cy, sc * 0.05, cx, cy, sc * 0.3);
      neb.addColorStop(0, "rgba(80,200,190,0.10)");
      neb.addColorStop(0.6, "rgba(255,90,110,0.14)");
      neb.addColorStop(1, "rgba(255,90,110,0)");
      x.fillStyle = neb;
      x.beginPath();
      x.arc(cx, cy, sc * 0.3, 0, 7);
      x.fill();
      x.fillStyle = "#020205";
      x.beginPath();
      x.arc(cx, cy, 3.2, 0, 7);
      x.fill();
      x.strokeStyle = "rgba(255,225,190,0.8)";
      x.lineWidth = 1;
      x.beginPath();
      x.arc(cx, cy, 3.6, 0, 7);
      x.stroke();
    } else {
      const halo = x.createRadialGradient(cx, cy, R2, cx, cy, far);
      halo.addColorStop(0, `rgba(${gl},0.16)`);
      halo.addColorStop(0.15, `rgba(${gl},0.09)`);
      halo.addColorStop(0.4, `rgba(${gl},0.04)`);
      halo.addColorStop(0.7, `rgba(${gl},0.012)`);
      halo.addColorStop(1, `rgba(${gl},0)`);
      x.fillStyle = halo;
      x.beginPath();
      x.arc(cx, cy, far, 0, 7);
      x.fill();
      const core = x.createRadialGradient(cx - R2 * 0.2, cy - R2 * 0.2, 0, cx, cy, R2);
      if (red) {
        core.addColorStop(0, "#ffe2c0");
        core.addColorStop(0.5, "#ffa15e");
        core.addColorStop(0.9, "#d0532c");
        core.addColorStop(1, "#a8391f");
      } else {
        core.addColorStop(0, "#f4f7ff");
        core.addColorStop(0.55, "#cbd8ff");
        core.addColorStop(0.9, "#8ea6f0");
        core.addColorStop(1, "#6f86d6");
      }
      x.fillStyle = core;
      x.beginPath();
      x.arc(cx, cy, R2, 0, 7);
      x.fill();
    }
    swarm("front");
    beltPass("front");
    for (const id of ["moon", "giant"]) orbit(id, "front");
    x.font = '11px "JetBrains Mono", ui-monospace, monospace';
    const label2 = (id, px, py, rad) => {
      const lx = px + rad + 10, ly = py - rad - 8;
      x.strokeStyle = "rgba(170,180,230,0.35)";
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(px + rad * 0.7, py - rad * 0.7);
      x.lineTo(lx - 2, ly + 3);
      x.lineTo(lx + 2, ly + 3);
      x.stroke();
      x.fillStyle = s.visited[id] ? "#e1e4f4" : "#8a90b8";
      x.fillText(t_(id) + (s.visited[id] ? "" : " ?"), lx + 4, ly + 6);
    };
    const order = ["belt", "moon", "giant"].sort((a, b) => bodyPos(a, time)[1] - bodyPos(b, time)[1]);
    for (const id of order) {
      const [px, py] = P(bodyPos(id, time)), isFront = front(id, time);
      x.globalAlpha = isFront ? 1 : 0.85;
      if (id === "giant" && s.chapterDone >= 1 && s.star.stage >= 2) {
        const rad = 4.5;
        litSphere(x, px, py, rad, cx, cy, ["#e8b49a", "#7a4636", "#1f1210"]);
        x.strokeStyle = "rgba(255,140,80,0.55)";
        x.lineWidth = 0.7;
        x.beginPath();
        x.moveTo(px - rad * 0.6, py);
        x.lineTo(px, py + rad * 0.3);
        x.lineTo(px + rad * 0.5, py - rad * 0.3);
        x.stroke();
        label2("core", px, py, rad);
      } else if (id === "giant") {
        const rad = 10;
        const ring = (h) => {
          x.beginPath();
          x.ellipse(px, py, rad * 2.1, rad * 0.55, -0.35, h === "back" ? Math.PI : 0, h === "back" ? Math.PI * 2 : Math.PI);
          x.strokeStyle = "rgba(226,196,150,0.55)";
          x.lineWidth = 2;
          x.stroke();
          x.strokeStyle = "rgba(226,196,150,0.25)";
          x.lineWidth = 4;
          x.stroke();
        };
        ring("back");
        x.save();
        x.beginPath();
        x.arc(px, py, rad, 0, 7);
        x.clip();
        x.fillStyle = "#c9a072";
        x.fillRect(px - rad, py - rad, rad * 2, rad * 2);
        const bands = ["#e3c08c", "#b07e52", "#d9b07a", "#9c6c48", "#e6c796", "#b9875a"];
        x.save();
        x.translate(px, py);
        x.rotate(-0.35);
        bands.forEach((col, k) => {
          x.fillStyle = col;
          x.fillRect(-rad * 1.5, -rad + k * (rad * 2 / bands.length) + Math.sin(tt * 0.3 + k) * 0.4, rad * 3, rad * 2 / bands.length * 0.7);
        });
        x.restore();
        const sh = x.createRadialGradient(px + (cx - px) / Math.hypot(cx - px, cy - py) * rad * 0.5, py + (cy - py) / Math.hypot(cx - px, cy - py) * rad * 0.5, rad * 0.2, px, py, rad * 1.1);
        sh.addColorStop(0, "rgba(255,255,255,0.12)");
        sh.addColorStop(0.6, "rgba(10,8,20,0.15)");
        sh.addColorStop(1, "rgba(5,4,12,0.8)");
        x.fillStyle = sh;
        x.fillRect(px - rad, py - rad, rad * 2, rad * 2);
        x.restore();
        ring("front");
        for (const [mr, msp, mc] of [[rad * 2.6, 0.9, "#c9cbd6"], [rad * 3.4, 0.55, "#b9a58f"]]) {
          const ma = tt * msp + mr, mx = px + Math.cos(ma) * mr, my = py + Math.sin(ma) * mr * 0.4;
          x.globalAlpha = Math.sin(ma) < 0 ? 0.55 : 1;
          litSphere(x, mx, my, 1.8, cx, cy, ["#ffffff", mc, "#1c1a24"]);
          x.globalAlpha = 1;
        }
        label2(id, px, py, rad);
      } else if (id === "moon") {
        const rad = 5.5;
        litSphere(x, px, py, rad, cx, cy, ["#f4fbff", "#a9d6e6", "#20323f"]);
        x.strokeStyle = "rgba(120,170,190,0.5)";
        x.lineWidth = 0.6;
        x.beginPath();
        x.moveTo(px - rad * 0.5, py - rad * 0.2);
        x.lineTo(px + rad * 0.2, py + rad * 0.3);
        x.lineTo(px + rad * 0.6, py - rad * 0.1);
        x.stroke();
        label2(id, px, py, rad);
      } else {
        const rad = 4;
        litSphere(x, px, py, rad, cx, cy, ["#d9b394", "#8a6a55", "#2a1f1d"]);
        const on = reduce || time % 1.6 < 0.25;
        x.fillStyle = on ? "rgba(255,179,92,1)" : "rgba(255,179,92,0.35)";
        x.beginPath();
        x.arc(px + 1.5, py - 1.5, on ? 1.4 : 0.9, 0, 7);
        x.fill();
        label2(id, px, py, rad);
      }
      x.globalAlpha = 1;
      if (s.loc === id && !s.travel) {
        x.strokeStyle = "rgba(242,165,65,0.8)";
        x.lineWidth = 1;
        x.setLineDash([2, 3]);
        x.beginPath();
        x.arc(px, py, (id === "giant" ? 10 : id === "moon" ? 5.5 : 4) + 6 + Math.sin(time * 2) * 1, 0, 7);
        x.stroke();
        x.setLineDash([]);
      }
    }
    if (locOpen(s, "ione")) {
      const [px, py] = P(bodyPos("ione", time));
      if (s.visited.ione) {
        for (let i = 0; i < 26; i++) {
          const a = i * 0.24 - 3;
          const [qx, qy] = P([Math.cos(L.ione.angle + time * L.ione.speed + a * 0.05) * L.ione.orbit, Math.sin(L.ione.angle + time * L.ione.speed + a * 0.05) * L.ione.orbit * TILT]);
          x.fillStyle = `rgba(214,150,110,${0.25 + i % 3 * 0.15})`;
          x.fillRect(qx + Math.sin(i * 7.1) * 3, qy + Math.cos(i * 3.3) * 2, 1.4, 1.4);
        }
      } else litSphere(x, px, py, 3.2, cx, cy, ["#ffd9b8", "#b5603c", "#2a1410"]);
      label2("ione", px, py, 3.2);
    }
    if (locOpen(s, "kuiper")) {
      for (let i = 0; i < 120; i++) {
        const a = i * 0.0524 + time * L.kuiper.speed + Math.sin(i * 12.9) * 0.03, rr = L.kuiper.orbit * (1 + Math.sin(i * 4.7) * 0.04);
        const [qx, qy] = P([Math.cos(a) * rr, Math.sin(a) * rr * TILT]);
        x.fillStyle = `rgba(190,225,240,${0.18 + i * 37 % 10 / 30})`;
        x.fillRect(qx, qy, 1.1, 1.1);
      }
      const [px, py] = P(bodyPos("kuiper", time));
      litSphere(x, px, py, 2.4, cx, cy, ["#ffffff", "#bfe3f0", "#1d2d36"]);
      label2("kuiper", px, py, 2.4);
    }
    if (locOpen(s, "dust")) {
      const rr = L.dust.orbit * sc;
      x.save();
      x.translate(cx, cy);
      x.scale(1, TILT);
      const g = x.createRadialGradient(0, 0, rr * 0.75, 0, 0, rr * 1.2);
      g.addColorStop(0, "rgba(170,110,70,0)");
      g.addColorStop(0.5, `rgba(170,110,70,${s.visited.dust ? 0.08 : 0.16})`);
      g.addColorStop(1, "rgba(170,110,70,0)");
      x.fillStyle = g;
      x.beginPath();
      x.arc(0, 0, rr * 1.2, 0, 7);
      x.fill();
      x.restore();
      const [px, py] = P(bodyPos("dust", time));
      x.fillStyle = "rgba(220,170,120,0.9)";
      x.beginPath();
      x.arc(px, py, 1.6, 0, 7);
      x.fill();
      label2("dust", px, py, 2);
    }
    if (!(s.chapterDone >= 1 && (s.star.stage >= 1 || s.star.done))) {
      const [px, py] = P(bodyPos("sun", time));
      x.save();
      x.translate(px, py);
      x.rotate(Math.PI / 4);
      x.fillStyle = s.visited.sun ? "#f2a541" : "rgba(242,165,65,0.45)";
      x.fillRect(-2.5, -2.5, 5, 5);
      x.restore();
      if (s.loc === "sun" && !s.travel) {
        x.strokeStyle = "rgba(242,165,65,0.8)";
        x.setLineDash([2, 3]);
        x.beginPath();
        x.arc(px, py, 9, 0, 7);
        x.stroke();
        x.setLineDash([]);
      }
      x.fillStyle = s.visited.sun ? "#e1e4f4" : "#8a90b8";
      x.fillText(t("loc.sun.short") + (s.visited.sun ? "" : " ?"), px + (px >= cx ? 10 : -10 - x.measureText(t("loc.sun.short") + " ?").width), py + (py >= cy ? 16 : -10));
    }
    let sp, ang = -Math.PI / 2;
    if (s.travel) {
      const a = P(bodyPos(s.travel.from, time)), b = P(bodyPos(s.travel.to, time)), k = s.travel.t / s.travel.total;
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, nx = -(b[1] - a[1]), ny = b[0] - a[0], nl = Math.hypot(nx, ny) || 1, bend = 0.25;
      const ctrl = [mx + nx / nl * Math.hypot(nx, ny) * bend, my + ny / nl * Math.hypot(nx, ny) * bend];
      const q = (u) => [(1 - u) ** 2 * a[0] + 2 * (1 - u) * u * ctrl[0] + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * ctrl[1] + u * u * b[1]];
      x.setLineDash([2, 5]);
      x.strokeStyle = "rgba(242,165,65,0.35)";
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(...a);
      x.quadraticCurveTo(ctrl[0], ctrl[1], b[0], b[1]);
      x.stroke();
      x.setLineDash([]);
      sp = q(k);
      const ahead = q(Math.min(1, k + 0.01));
      ang = Math.atan2(ahead[1] - sp[1], ahead[0] - sp[0]);
      trail.push(sp);
      if (trail.length > 40) trail.shift();
    } else {
      trail.length = 0;
      const p = P(bodyPos(s.loc, time));
      sp = [p[0], p[1] - 14];
    }
    for (let i = 1; i < trail.length; i++) {
      x.strokeStyle = `rgba(242,165,65,${i / trail.length * 0.5})`;
      x.lineWidth = 1.5;
      x.beginPath();
      x.moveTo(...trail[i - 1]);
      x.lineTo(...trail[i]);
      x.stroke();
    }
    x.save();
    x.translate(sp[0], sp[1]);
    x.rotate(ang);
    if (s.travel) {
      const fl = x.createLinearGradient(-4, 0, -14, 0);
      fl.addColorStop(0, "rgba(160,210,255,0.9)");
      fl.addColorStop(1, "rgba(160,210,255,0)");
      x.fillStyle = fl;
      x.beginPath();
      x.moveTo(-4, -1.6);
      x.lineTo(-14 - Math.sin(time * 20) * 1.5, 0);
      x.lineTo(-4, 1.6);
      x.fill();
    }
    x.fillStyle = "#f2a541";
    x.beginPath();
    x.moveTo(6, 0);
    x.lineTo(-4, -3.2);
    x.lineTo(-2.5, 0);
    x.lineTo(-4, 3.2);
    x.closePath();
    x.fill();
    x.fillStyle = "#fff2dc";
    x.fillRect(1, -0.6, 2, 1.2);
    x.restore();
    {
      {
        const ga = L.giant.angle + tt * L.giant.speed;
        for (const off of [Math.PI / 3, -Math.PI / 3]) for (let k = 0; k < 26; k++) {
          const a = ga + off + Math.sin(k * 12.9898) * 0.16, rr2 = L.giant.orbit + Math.sin(k * 78.233) * 0.02;
          const bx = cx + Math.cos(a) * rr2 * sc, by = cy + Math.sin(a) * rr2 * sc * TILT;
          x.fillStyle = `rgba(200,180,160,${0.35 + 0.3 * Math.abs(Math.sin(k * 3.1))})`;
          x.fillRect(bx - 0.6, by - 0.6, 1.2, 1.2);
        }
        for (const id of ["belt", "moon", "giant"]) {
          const a = Math.PI * 0.5 + 0.25, rx = L[id].orbit * sc, ry = rx * TILT;
          const px2 = cx + Math.cos(a) * rx, py2 = cy + Math.sin(a) * ry, ang2 = Math.atan2(Math.cos(a) * ry, -Math.sin(a) * rx);
          x.save();
          x.translate(px2, py2);
          x.rotate(ang2);
          x.strokeStyle = "rgba(170,180,230,0.45)";
          x.lineWidth = 1;
          x.beginPath();
          x.moveTo(-3, -2.5);
          x.lineTo(1, 0);
          x.lineTo(-3, 2.5);
          x.stroke();
          x.restore();
        }
      }
      const ea = 0.64, ee = 0.78, w0 = 2.5, th = tt * 0.05 % (Math.PI * 2);
      const rr = ea * (1 - ee * ee) / (1 + ee * Math.cos(th)), ca = th + w0;
      const kx = cx + Math.cos(ca) * rr * sc, ky = cy + Math.sin(ca) * rr * sc * TILT;
      const ux = (kx - cx) / (Math.hypot(kx - cx, ky - cy) || 1), uy = (ky - cy) / (Math.hypot(kx - cx, ky - cy) || 1), tl = Math.min(45, 12 / Math.max(rr, 0.12));
      const px3 = -uy, py3 = ux, wd = 1.5 + tl * 0.09;
      const tg = x.createLinearGradient(kx, ky, kx + ux * tl, ky + uy * tl);
      tg.addColorStop(0, "rgba(205,225,255,0.22)");
      tg.addColorStop(0.4, "rgba(180,205,255,0.07)");
      tg.addColorStop(1, "rgba(160,190,255,0)");
      x.fillStyle = tg;
      x.beginPath();
      x.moveTo(kx + px3 * 1.2, ky + py3 * 1.2);
      x.quadraticCurveTo(kx + ux * tl * 0.5 + px3 * wd * 0.7, ky + uy * tl * 0.5 + py3 * wd * 0.7, kx + ux * tl + px3 * wd, ky + uy * tl + py3 * wd);
      x.lineTo(kx + ux * tl - px3 * wd, ky + uy * tl - py3 * wd);
      x.quadraticCurveTo(kx + ux * tl * 0.5 - px3 * wd * 0.7, ky + uy * tl * 0.5 - py3 * wd * 0.7, kx - px3 * 1.2, ky - py3 * 1.2);
      x.closePath();
      x.fill();
      const coma = x.createRadialGradient(kx, ky, 0, kx, ky, 4);
      coma.addColorStop(0, "rgba(235,245,255,0.6)");
      coma.addColorStop(0.3, "rgba(200,225,255,0.2)");
      coma.addColorStop(1, "rgba(180,210,255,0)");
      x.fillStyle = coma;
      x.beginPath();
      x.arc(kx, ky, 4, 0, 7);
      x.fill();
    }
    const v = x.createRadialGradient(cx, cy, Math.min(W, H) * 0.35, cx, cy, Math.max(W, H) * 0.75);
    v.addColorStop(0, "rgba(5,6,15,0)");
    v.addColorStop(1, "rgba(5,6,15,0.55)");
    x.fillStyle = v;
    x.fillRect(0, 0, W, H);
  }
  var t_ = (id) => t(`loc.${id}.short`);
  var locOpen = (s, id) => !!s.visited[id] || !L[id].req || L[id].req(s);
  var PAL = {
    ms: { core: [248, 251, 255], mid: [186, 205, 255], edge: [86, 112, 222], glow: "140,170,255", plasma: "190,220,255", contrast: 0.34, freq: 15 },
    he: { core: [255, 226, 182], mid: [255, 150, 82], edge: [168, 48, 30], glow: "255,140,80", plasma: "255,190,140", contrast: 0.7, freq: 3.2 },
    c: { core: [255, 222, 175], mid: [255, 143, 76], edge: [160, 44, 28], glow: "255,130,75", plasma: "255,180,130", contrast: 0.75, freq: 3.4 },
    neo: { core: [255, 218, 168], mid: [252, 136, 72], edge: [152, 40, 27], glow: "255,122,70", plasma: "255,175,125", contrast: 0.8, freq: 3.6 },
    si: { core: [255, 214, 160], mid: [248, 128, 66], edge: [145, 36, 26], glow: "255,115,66", plasma: "255,170,120", contrast: 0.85, freq: 3.8 }
  };
  var LAYERS = {
    ms: [["H", 1, "#2b3a78"], ["H \u2192 He", 0.4, "#5b3f92"]],
    he: [["H", 1, "#6e2a3e"], ["He", 0.58, "#5b3f92"], ["He \u2192 C \xB7 O", 0.32, "#93406f"]],
    c: [["H", 1, "#6e2a3e"], ["He", 0.72, "#5b3f92"], ["C \xB7 O", 0.5, "#93406f"], ["C \u2192 Ne \xB7 Mg", 0.28, "#bb5a40"]],
    neo: [["H", 1, "#6e2a3e"], ["He", 0.78, "#5b3f92"], ["C \xB7 O", 0.6, "#93406f"], ["Ne \xB7 O", 0.43, "#bb5a40"], ["Ne \xB7 O \u2192 Si \xB7 S", 0.26, "#d8903c"]],
    si: [["H", 1, "#6e2a3e"], ["He", 0.8, "#5b3f92"], ["C \xB7 O", 0.66, "#93406f"], ["Ne \xB7 O", 0.52, "#bb5a40"], ["Si \xB7 S", 0.37, "#d8903c"], ["Si \u2192 Fe", 0.2, "#a9b2c6"]]
  };
  var STAR_LAT = 64;
  var slat = [];
  (() => {
    let sd = 23;
    for (let i = 0; i < STAR_LAT * STAR_LAT; i++) slat.push((sd = sd * 16807 % 2147483647) / 2147483647);
  })();
  function snoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = fade(x - xi), yf = fade(y - yi);
    const g = (i, j) => slat[(i & STAR_LAT - 1) * STAR_LAT + (j & STAR_LAT - 1)];
    return lerp(lerp(g(xi, yi), g(xi + 1, yi), xf), lerp(g(xi, yi + 1), g(xi + 1, yi + 1), xf), yf);
  }
  function sfbm(x, y, oct = 4) {
    let v = 0, a = 0.5, f = 1;
    for (let i = 0; i < oct; i++) {
      v += a * snoise(x * f, y * f);
      a *= 0.5;
      f *= 2.07;
    }
    return v;
  }
  var starTex = null;
  var starTexKey = "";
  function bakeStar(px, stage2) {
    const p = PAL[stage2], out = [];
    for (const off of [0, 37.7]) {
      const cv = document.createElement("canvas");
      cv.width = cv.height = px;
      const x = cv.getContext("2d"), img = x.createImageData(px, px), d = img.data, c = px / 2;
      for (let j = 0; j < px; j++) for (let i = 0; i < px; i++) {
        const u = (i - c) / c, v = (j - c) / c, r2 = u * u + v * v;
        if (r2 >= 1) continue;
        const mu = Math.sqrt(1 - r2);
        const k = 1 / (0.35 + mu), su = u * k * p.freq + off, sv = v * k * p.freq + off * 0.6;
        const cell = 1 - Math.abs(2 * sfbm(su, sv) - 1);
        const big = sfbm(u * 1.6 + off + 9, v * 1.6 + 4, 3);
        const limb = stage2 === "ms" ? 0.4 + 0.55 * Math.pow(mu, 0.5) : 0.22 + 0.74 * Math.pow(mu, 0.8);
        let b = limb * (1 + p.contrast * (cell * 0.75 + big * 0.5 - 0.62));
        b = Math.max(0, Math.min(1.15, b));
        const t1 = Math.min(1, b), col = t1 < 0.55 ? p.edge.map((e, q) => lerp(e, p.mid[q], t1 / 0.55)) : p.mid.map((m, q) => lerp(m, p.core[q], (t1 - 0.55) / 0.45));
        const o = (j * px + i) * 4, lift = Math.max(0, b - 1) * 255;
        d[o] = Math.min(255, col[0] + lift);
        d[o + 1] = Math.min(255, col[1] + lift);
        d[o + 2] = Math.min(255, col[2] + lift);
        d[o + 3] = Math.min(255, (1 - Math.sqrt(r2)) * c * 2 * 255);
      }
      x.putImageData(img, 0, 0);
      out.push(cv);
    }
    return [out[0], out[1]];
  }
  var nebTex = null;
  var nebKey = "";
  function bakeNebula(px) {
    const cv = document.createElement("canvas");
    cv.width = cv.height = px;
    const x = cv.getContext("2d"), img = x.createImageData(px, px), d = img.data, c = px / 2;
    for (let j = 0; j < px; j++) for (let i = 0; i < px; i++) {
      const u = (i - c) / c, v = (j - c) / c, r = Math.hypot(u, v);
      if (r > 1) continue;
      const a = Math.atan2(v, u), shell = Math.exp(-(((r - 0.72) / 0.16) ** 2));
      const fil = Math.pow(1 - Math.abs(2 * sfbm(Math.cos(a) * 3 + r * 6, Math.sin(a) * 3 + r * 6, 5) - 1), 3);
      const ox = sfbm(u * 4 + 20, v * 4 + 20, 4), inner = Math.exp(-(((r - 0.45) / 0.22) ** 2));
      const hR = shell * fil * 1.4, oT = inner * ox * 0.9 + shell * (1 - fil) * 0.15;
      const o = (j * px + i) * 4;
      d[o] = Math.min(255, 255 * hR + 70 * oT);
      d[o + 1] = Math.min(255, 70 * hR + 210 * oT);
      d[o + 2] = Math.min(255, 95 * hR + 200 * oT);
      d[o + 3] = Math.min(255, 255 * Math.min(1, hR * 0.9 + oT * 0.8) * (1 - Math.max(0, r - 0.9) * 10));
    }
    x.putImageData(img, 0, 0);
    return cv;
  }
  var starBg = null;
  var starBgKey = "";
  function drawStar(c, v, time, labels, full = true) {
    const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
    if (!W || !H) return;
    if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    }
    const x = c.getContext("2d");
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const key = `${W}x${H}@${dpr}`;
    if (full) {
      if (!starBg || starBgKey !== key) {
        starBg = bakeMapBg(W, H, dpr);
        starBgKey = key;
      }
      x.drawImage(starBg, 0, 0, W, H);
    } else x.clearRect(0, 0, W, H);
    const tt = reduce ? 0 : time, m = Math.min(W, H);
    const giant = v.stage !== "ms";
    const cx = W * (full ? 0.44 : 0.5), cy = H * 0.5, R2 = m * (giant ? full ? 0.34 : 0.27 : full ? 0.19 : 0.17);
    const p = PAL[v.stage] ?? PAL.si;
    if (v.done) {
      drawRemnant(x, W, H, cx, cy, m * (full ? 1 : 0.9), tt, v.snAge, dpr);
      if (full) label(x, labels.title, labels.sub);
      return;
    }
    const k = v.collapse >= 0 ? 1 - v.collapse / 30 : 0;
    const sx = k ? Math.sin(tt * 47) * k * 3 : 0, sy = k ? Math.cos(tt * 39) * k * 3 : 0;
    const scx = cx + sx, scy = cy + sy;
    const halo = x.createRadialGradient(scx, scy, R2 * 0.9, scx, scy, R2 * (giant ? 2.1 : 3.4));
    halo.addColorStop(0, `rgba(${p.glow},${0.42 + k * 0.3})`);
    halo.addColorStop(0.25, `rgba(${p.glow},0.14)`);
    halo.addColorStop(1, `rgba(${p.glow},0)`);
    x.fillStyle = halo;
    x.fillRect(0, 0, W, H);
    if (!giant) {
      x.save();
      x.translate(scx, scy);
      x.rotate(tt * 0.01);
      for (let i = 0; i < 14; i++) {
        const a = i / 14 * Math.PI * 2 + Math.sin(i * 3.7) * 0.2, len = R2 * (1.6 + 0.6 * Math.sin(i * 1.9 + tt * 0.2));
        const g = x.createLinearGradient(0, 0, Math.cos(a) * len, Math.sin(a) * len);
        g.addColorStop(0.45, `rgba(${p.glow},0.10)`);
        g.addColorStop(1, `rgba(${p.glow},0)`);
        x.strokeStyle = g;
        x.lineWidth = R2 * 0.08;
        x.beginPath();
        x.moveTo(Math.cos(a) * R2 * 0.9, Math.sin(a) * R2 * 0.9);
        x.lineTo(Math.cos(a) * len, Math.sin(a) * len);
        x.stroke();
      }
      x.restore();
    }
    const n = Math.min(420, Math.floor(v.dyson));
    const orbitR = (ring) => R2 * (giant ? 1.22 + ring * 0.07 : 1.55 + ring * 0.16);
    const TILTS = [0.28, 0.42, 0.18, 0.55, 0.34], ROTS = [-0.25, 0.4, 0.1, -0.6, 0.75];
    const pos = (i) => {
      const ring = i % 5, a = i * 2.39996 + tt * (0.05 + ring * 0.012) * (ring % 2 ? 1 : -1);
      const rr = orbitR(ring), ox = Math.cos(a) * rr, oy = Math.sin(a) * rr * TILTS[ring];
      return [scx + ox * Math.cos(ROTS[ring]) - oy * Math.sin(ROTS[ring]), scy + ox * Math.sin(ROTS[ring]) + oy * Math.cos(ROTS[ring]), Math.sin(a)];
    };
    const swarm = (front2) => {
      if (!n) return;
      for (let ring = 0; ring < Math.min(5, n); ring++) {
        const rr = orbitR(ring);
        x.save();
        x.translate(scx, scy);
        x.rotate(ROTS[ring]);
        x.beginPath();
        x.ellipse(0, 0, rr, rr * TILTS[ring], 0, front2 ? 0 : Math.PI, front2 ? Math.PI : Math.PI * 2);
        x.strokeStyle = `rgba(242,178,90,${front2 ? 0.16 : 0.07})`;
        x.lineWidth = 1;
        x.stroke();
        x.restore();
      }
      for (let i = 0; i < n; i++) {
        const [px2, py, sn] = pos(i);
        if (sn >= 0 !== front2) continue;
        const glint = 0.5 + 0.5 * Math.max(0, Math.cos(i * 1.7 + tt * 0.8));
        x.fillStyle = front2 ? `rgba(255,${190 + glint * 50},${120 + glint * 80},${0.55 + glint * 0.45})` : "rgba(200,150,100,0.35)";
        x.fillRect(px2 - 1.3, py - 0.8, 2.6, 1.6);
      }
    };
    swarm(false);
    const px = Math.min(720, Math.round(R2 * 2 * dpr)), skey = `${v.stage}:${px}`;
    if (!starTex || starTexKey !== skey) {
      starTex = bakeStar(px, v.stage);
      starTexKey = skey;
    }
    const mix2 = 0.5 + 0.5 * Math.sin(tt * 0.12);
    x.save();
    x.translate(scx, scy);
    x.rotate(tt * 4e-3);
    x.globalAlpha = 1;
    x.drawImage(starTex[0], -R2, -R2, R2 * 2, R2 * 2);
    x.globalAlpha = mix2;
    x.drawImage(starTex[1], -R2, -R2, R2 * 2, R2 * 2);
    x.globalAlpha = 1;
    x.restore();
    if (k) {
      x.fillStyle = `rgba(255,250,240,${k * 0.35 * (0.5 + 0.5 * Math.sin(tt * 9))})`;
      x.beginPath();
      x.arc(scx, scy, R2, 0, 7);
      x.fill();
    }
    if (v.coverage > 2e-3) {
      const cv = Math.min(1, v.coverage);
      x.fillStyle = `rgba(18,10,14,${cv * 0.72})`;
      x.beginPath();
      x.arc(scx, scy, R2, 0, 7);
      x.fill();
      const ir = x.createRadialGradient(scx, scy, R2, scx, scy, orbitR(4) * 1.08);
      ir.addColorStop(0, `rgba(255,120,60,${cv * 0.05})`);
      ir.addColorStop(0.8, `rgba(255,110,50,${cv * 0.2})`);
      ir.addColorStop(1, "rgba(255,110,50,0)");
      x.fillStyle = ir;
      x.beginPath();
      x.arc(scx, scy, orbitR(4) * 1.08, 0, 7);
      x.fill();
    }
    const nl = Math.min(9, Math.floor(v.lifters));
    for (let j = 0; j < nl; j++) {
      const a = -Math.PI * 0.85 + j * (Math.PI * 1.15 / Math.max(1, nl - 1 || 1)) + (nl === 1 ? 0.6 : 0);
      const bx = scx + Math.cos(a) * R2, by = scy + Math.sin(a) * R2, nx = Math.cos(a), ny = Math.sin(a), tx = -ny, ty = nx;
      const reach = R2 * (giant ? 0.42 : 0.75);
      x.strokeStyle = `rgba(${p.plasma},0.28)`;
      x.lineWidth = 1;
      for (const sgn of [-1, 1]) {
        x.beginPath();
        x.moveTo(bx + tx * sgn * R2 * 0.05, by + ty * sgn * R2 * 0.05);
        x.quadraticCurveTo(bx + nx * reach * 0.5 + tx * sgn * R2 * 0.03, by + ny * reach * 0.5 + ty * sgn * R2 * 0.03, bx + nx * reach + tx * sgn * R2 * 0.1, by + ny * reach + ty * sgn * R2 * 0.1);
        x.stroke();
      }
      const dots = k ? 14 : 7, speed = k ? 0.9 : 0.28;
      for (let q = 0; q < dots; q++) {
        const f = ((tt * speed + q / dots + j * 0.13) % 1 + 1) % 1, w = Math.sin(f * Math.PI * 3 + j) * R2 * 0.02;
        const qx = bx + nx * reach * f + tx * w, qy = by + ny * reach * f + ty * w;
        x.fillStyle = `rgba(${p.plasma},${(1 - f) * 0.9})`;
        x.beginPath();
        x.arc(qx, qy, 1.2 + (1 - f) * 1.2, 0, 7);
        x.fill();
      }
      x.fillStyle = "rgba(242,165,65,0.9)";
      x.fillRect(bx + nx * reach - 1.5, by + ny * reach - 1.5, 3, 3);
    }
    swarm(true);
    if (!full) {
      if (labels.sub) {
        x.font = '600 12px "JetBrains Mono", ui-monospace, monospace';
        x.textAlign = "center";
        x.fillStyle = "rgba(242,178,90,0.95)";
        x.fillText(labels.sub, cx, H - 10);
        x.textAlign = "left";
      }
      return;
    }
    drawOnion(x, W, H, m, v.stage, labels.layers, tt);
    label(x, labels.title, labels.sub);
    const vg = x.createRadialGradient(W / 2, H / 2, m * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
    vg.addColorStop(0, "rgba(5,6,15,0)");
    vg.addColorStop(1, "rgba(5,6,15,0.5)");
    x.fillStyle = vg;
    x.fillRect(0, 0, W, H);
  }
  function label(x, title, sub) {
    x.font = '600 12px "JetBrains Mono", ui-monospace, monospace';
    x.fillStyle = "rgba(225,228,244,0.9)";
    x.fillText(title.toUpperCase(), 14, 22);
    x.font = '11px "JetBrains Mono", ui-monospace, monospace';
    x.fillStyle = "rgba(176,181,212,0.85)";
    x.fillText(sub, 14, 38);
  }
  function drawOnion(x, W, H, m, stage2, title, tt) {
    const L2 = LAYERS[stage2];
    if (!L2) return;
    const r = Math.min(m * 0.17, 74), ox = W - r - 18, oy = H - r - 22;
    x.save();
    x.fillStyle = "rgba(10,12,24,0.55)";
    x.beginPath();
    x.arc(ox, oy, r + 8, 0, 7);
    x.fill();
    for (const [, f, col] of L2) {
      x.fillStyle = col;
      x.beginPath();
      x.arc(ox, oy, r * f, 0, 7);
      x.fill();
      x.strokeStyle = "rgba(10,12,24,0.6)";
      x.lineWidth = 1;
      x.stroke();
    }
    const core = L2[L2.length - 1], cr = r * core[1] * (1 + 0.03 * Math.sin(tt * 0.86));
    const g = x.createRadialGradient(ox, oy, 0, ox, oy, cr);
    g.addColorStop(0, "rgba(255,255,255,0.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g;
    x.beginPath();
    x.arc(ox, oy, cr, 0, 7);
    x.fill();
    x.font = '10px "JetBrains Mono", ui-monospace, monospace';
    x.textBaseline = "middle";
    const lx = ox - r - 16, top = oy - (L2.length - 1) * 8;
    L2.forEach(([name, , col], i) => {
      const ly = top + i * 16, w = x.measureText(name).width;
      x.fillStyle = col;
      x.fillRect(lx - 9, ly - 4, 8, 8);
      x.strokeStyle = "rgba(255,255,255,0.3)";
      x.lineWidth = 0.5;
      x.strokeRect(lx - 9, ly - 4, 8, 8);
      x.fillStyle = "rgba(225,228,244,0.92)";
      x.fillText(name, lx - 14 - w, ly);
    });
    x.textBaseline = "alphabetic";
    x.font = '600 10px "Chakra Petch", ui-sans-serif, sans-serif';
    x.fillStyle = "rgba(176,181,212,0.9)";
    const tw = x.measureText(title.toUpperCase()).width;
    x.fillText(title.toUpperCase(), ox - tw / 2, oy - r - 12);
    x.restore();
  }
  function drawRemnant(x, W, H, cx, cy, m, tt, age, dpr) {
    const Rn = m * 0.44, px = Math.min(720, Math.round(Rn * 2 * dpr));
    if (!nebTex || nebKey !== String(px)) {
      nebTex = bakeNebula(px);
      nebKey = String(px);
    }
    const grow = Math.min(1, 0.15 + age / 8);
    x.globalAlpha = Math.min(1, age / 3);
    x.save();
    x.translate(cx, cy);
    x.rotate(tt * 3e-3);
    x.drawImage(nebTex, -Rn * grow, -Rn * grow, Rn * 2 * grow, Rn * 2 * grow);
    x.restore();
    x.globalAlpha = 1;
    const r0 = m * 0.045;
    const lens = x.createRadialGradient(cx, cy, r0, cx, cy, r0 * 3.2);
    lens.addColorStop(0, "rgba(255,214,170,0.55)");
    lens.addColorStop(0.18, "rgba(255,170,110,0.22)");
    lens.addColorStop(1, "rgba(255,150,90,0)");
    x.fillStyle = lens;
    x.beginPath();
    x.arc(cx, cy, r0 * 3.2, 0, 7);
    x.fill();
    x.fillStyle = "#020205";
    x.beginPath();
    x.arc(cx, cy, r0, 0, 7);
    x.fill();
    x.strokeStyle = "rgba(255,232,200,0.85)";
    x.lineWidth = 1.4;
    x.beginPath();
    x.arc(cx, cy, r0 * 1.06, 0, 7);
    x.stroke();
    if (age < 6) {
      const f = age / 6;
      x.fillStyle = `rgba(255,255,255,${Math.max(0, 1 - f * 1.6)})`;
      x.fillRect(0, 0, W, H);
      x.strokeStyle = `rgba(200,230,255,${(1 - f) * 0.8})`;
      x.lineWidth = 3 + 10 * (1 - f);
      x.beginPath();
      x.arc(cx, cy, m * (0.05 + f * 0.9), 0, 7);
      x.stroke();
    }
  }
  var hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  var mix = (a, b, t2) => a.map((v, i) => Math.round(v + (b[i] - v) * t2));
  var rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  var secTex = null;
  var secKey = "";
  function drawSection(c, stage2, time, collapse, labels) {
    const dpr = Math.min(2, devicePixelRatio || 1), W = c.clientWidth, H = c.clientHeight;
    if (!W || !H) return;
    if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    }
    const x = c.getContext("2d");
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const key = `${W}x${H}@${dpr}`;
    if (!starBg || starBgKey !== key) {
      starBg = bakeMapBg(W, H, dpr);
      starBgKey = key;
    }
    x.drawImage(starBg, 0, 0, W, H);
    const Ls = LAYERS[stage2];
    if (!Ls) return;
    const tt = reduce ? 0 : time, p = PAL[stage2] ?? PAL.si;
    const k = collapse >= 0 ? 1 - collapse / 30 : 0;
    const r = Math.min(H * 0.36, W * 0.24);
    const ox = Math.max(r + 40, W * 0.36) + (k ? Math.sin(tt * 47) * k * 2 : 0), oy = H * 0.56;
    const a0 = -Math.PI / 2, a1 = 0;
    const glow = x.createRadialGradient(ox, oy, r * 0.9, ox, oy, r * 1.9);
    glow.addColorStop(0, `rgba(${p.glow},0.45)`);
    glow.addColorStop(0.35, `rgba(${p.glow},0.12)`);
    glow.addColorStop(1, `rgba(${p.glow},0)`);
    x.fillStyle = glow;
    x.beginPath();
    x.arc(ox, oy, r * 1.9, 0, 7);
    x.fill();
    const px = Math.min(720, Math.round(r * 2 * dpr)), sk = `${stage2}:${px}`;
    if (!secTex || secKey !== sk) {
      secTex = bakeStar(px, stage2);
      secKey = sk;
    }
    x.save();
    x.beginPath();
    x.moveTo(ox, oy);
    x.arc(ox, oy, r, a1, a0 + Math.PI * 2);
    x.closePath();
    x.clip();
    x.drawImage(secTex[0], ox - r, oy - r, r * 2, r * 2);
    x.globalAlpha = 0.5 + 0.5 * Math.sin(tt * 0.12);
    x.drawImage(secTex[1], ox - r, oy - r, r * 2, r * 2);
    x.globalAlpha = 1;
    x.restore();
    const hot = [255, 236, 200];
    Ls.forEach(([, f, col], i) => {
      const inner = i + 1 < Ls.length ? Ls[i + 1][1] : 0, base = hexRgb(col);
      const g = x.createRadialGradient(ox, oy, r * inner, ox, oy, r * f);
      g.addColorStop(0, rgb(mix(base, hot, 0.35 + i * 0.06)));
      g.addColorStop(1, rgb(mix(base, [8, 8, 20], 0.25)));
      x.fillStyle = g;
      x.beginPath();
      x.moveTo(ox, oy);
      x.arc(ox, oy, r * f, a0, a1);
      x.closePath();
      x.fill();
    });
    x.save();
    x.beginPath();
    x.moveTo(ox, oy);
    x.arc(ox, oy, r, a0, a1);
    x.closePath();
    x.clip();
    const env0 = Ls.length > 1 ? Ls[1][1] : 0;
    for (let j = 0; j < 9; j++) {
      const rr = r * (env0 + (1 - env0) * ((j + 0.5) / 9)), sh = Math.sin(tt * 0.3 + j * 1.7) * 0.08;
      x.strokeStyle = "rgba(255,255,255,0.06)";
      x.lineWidth = 1;
      x.beginPath();
      x.arc(ox, oy, rr, a0 + 0.12 + sh, a1 - 0.12 + sh);
      x.stroke();
    }
    Ls.forEach(([, f]) => {
      x.strokeStyle = "rgba(255,240,220,0.28)";
      x.lineWidth = 1;
      x.beginPath();
      x.arc(ox, oy, r * f, a0, a1);
      x.stroke();
    });
    x.restore();
    const core = Ls[Ls.length - 1], cr = r * core[1] * (1 + 0.04 * Math.sin(tt * 0.86) + k * 0.15 * Math.sin(tt * 9));
    const cg = x.createRadialGradient(ox, oy, 0, ox, oy, cr * 1.6);
    cg.addColorStop(0, "rgba(255,255,245,0.85)");
    cg.addColorStop(0.35, "rgba(255,230,190,0.35)");
    cg.addColorStop(1, "rgba(255,220,180,0)");
    x.save();
    x.beginPath();
    x.moveTo(ox, oy);
    x.arc(ox, oy, r, a0, a1);
    x.closePath();
    x.clip();
    x.fillStyle = cg;
    x.beginPath();
    x.arc(ox, oy, cr * 1.6, 0, 7);
    x.fill();
    x.restore();
    for (const a of [a0, a1]) {
      const ex = ox + Math.cos(a) * r, ey = oy + Math.sin(a) * r;
      x.strokeStyle = "rgba(255,240,215,0.55)";
      x.lineWidth = 1.2;
      x.beginPath();
      x.moveTo(ox, oy);
      x.lineTo(ex, ey);
      x.stroke();
    }
    x.strokeStyle = "rgba(5,6,15,0.35)";
    x.lineWidth = 4;
    x.beginPath();
    x.arc(ox, oy, r - 2, a1 + 0.02, a0 + Math.PI * 2 - 0.02);
    x.stroke();
    x.font = '13px "JetBrains Mono", ui-monospace, monospace';
    x.textBaseline = "middle";
    const lx = Math.min(W - 120, ox + r + 56), gap = Math.min(32, (H - 90) / Ls.length), top = oy - r * 0.55 - (Ls.length - 1) * gap / 2 + r * 0.25;
    Ls.forEach(([name, f, col], i) => {
      const inner = i + 1 < Ls.length ? Ls[i + 1][1] : 0, mid = r * (f + inner) / 2, a = -Math.PI / 4 + (i - (Ls.length - 1) / 2) * 0.12;
      const sx = ox + Math.cos(a) * mid, sy = oy + Math.sin(a) * mid, ly = top + i * gap;
      x.strokeStyle = "rgba(225,228,244,0.4)";
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(sx, sy);
      x.lineTo(lx - 24, ly);
      x.lineTo(lx - 10, ly);
      x.stroke();
      x.fillStyle = "rgba(255,255,255,0.95)";
      x.beginPath();
      x.arc(sx, sy, 2, 0, 7);
      x.fill();
      const base = hexRgb(col);
      x.fillStyle = rgb(mix(base, hot, 0.3));
      x.beginPath();
      x.arc(lx, ly, 5.5, 0, 7);
      x.fill();
      x.strokeStyle = "rgba(255,255,255,0.4)";
      x.stroke();
      x.fillStyle = "rgba(232,234,248,0.96)";
      x.fillText(name, lx + 14, ly);
    });
    x.textBaseline = "alphabetic";
    label(x, labels.title, labels.sub);
  }

  // src/ui/audio.ts
  var ctx = null;
  var master = null;
  var melodyBus = null;
  var DEFAULT_VOLUMES = { master: 0.8, melody: 1, noise: 0.7, drone: 1, pulse: 1, chime: 1 };
  var vols = { ...DEFAULT_VOLUMES };
  var soundOn = false;
  var bus = {};
  var pulseTimer;
  var melodyTimer;
  var SCALE = [220, 261.63, 293.66, 329.63, 369.99, 392, 440, 523.25, 587.33, 659.25];
  var degree = 4;
  function makeReverb(c) {
    const len = Math.floor(c.sampleRate * 4), ir = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    const conv = c.createConvolver();
    conv.buffer = ir;
    return conv;
  }
  function note(freq, when, len, vol) {
    if (!ctx || !melodyBus) return;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.9);
    g.gain.setTargetAtTime(0, when + len * 0.5, len * 0.3);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1600;
    g.connect(lp).connect(melodyBus);
    for (const det of [-4, 4]) {
      const o = ctx.createOscillator();
      o.type = det < 0 ? "sine" : "triangle";
      o.frequency.value = freq;
      o.detune.value = det;
      o.connect(g);
      o.start(when);
      o.stop(when + len + 2);
    }
  }
  function phrase() {
    if (!ctx) return;
    let t2 = ctx.currentTime + 0.1;
    const count = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      degree = Math.max(0, Math.min(SCALE.length - 1, degree + [-2, -1, -1, 1, 1, 2, 0][Math.floor(Math.random() * 7)]));
      const len = 3 + Math.random() * 3;
      note(SCALE[degree], t2, len, 0.022 + Math.random() * 0.012);
      if (Math.random() < 0.25) note(SCALE[Math.max(0, degree - 2)] / 2, t2 + 0.4, len + 1.5, 0.014);
      t2 += 1.3 + Math.random() * 1.5;
    }
    const rest = t2 - ctx.currentTime + 2 + Math.random() * 3;
    melodyTimer = window.setTimeout(phrase, rest * 1e3);
  }
  function build() {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    for (const ch of ["melody", "noise", "drone", "pulse", "chime"]) {
      const g = ctx.createGain();
      g.gain.value = vols[ch];
      g.connect(master);
      bus[ch] = g;
    }
    const len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 260;
    const ng = ctx.createGain();
    ng.gain.value = 0.18;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.08;
    lfo.connect(lfoGain).connect(ng.gain);
    noise.connect(lp).connect(ng).connect(bus.noise);
    noise.start();
    lfo.start();
    for (const [f, v] of [[55, 0.05], [82.6, 0.035], [110.3, 0.015]]) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = v;
      const trem = ctx.createOscillator();
      trem.frequency.value = 0.07 + Math.random() * 0.05;
      const tg = ctx.createGain();
      tg.gain.value = v * 0.6;
      trem.connect(tg).connect(g.gain);
      o.connect(g).connect(bus.drone);
      o.start();
      trem.start();
    }
    melodyBus = ctx.createGain();
    melodyBus.gain.value = 1;
    const dry = ctx.createGain();
    dry.gain.value = 0.35;
    const wet = ctx.createGain();
    wet.gain.value = 0.9;
    const rev = makeReverb(ctx);
    melodyBus.connect(dry).connect(bus.melody);
    melodyBus.connect(rev).connect(wet).connect(bus.melody);
  }
  function ping(ch, freq = 880, vol = 0.04, len = 2.2) {
    if (!ctx || !bus[ch]) return;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = freq;
    const g = ctx.createGain();
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.02);
    g.gain.exponentialRampToValueAtTime(1e-4, now + len);
    o.connect(g).connect(bus[ch]);
    o.start(now);
    o.stop(now + len + 0.1);
  }
  function setVolumes(v) {
    vols = { ...vols, ...v };
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    for (const ch of Object.keys(bus)) bus[ch].gain.setTargetAtTime(vols[ch], now, 0.05);
    if (soundOn) {
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(vols.master, now, 0.05);
    }
  }
  function setSound(on, pulse2) {
    soundOn = on;
    if (on && !ctx) build();
    if (!ctx || !master) return;
    if (on) void ctx.resume();
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(on ? vols.master : 0, now, 0.6);
    clearInterval(pulseTimer);
    if (on && pulse2) pulseTimer = window.setInterval(() => ping("pulse", 1320, 0.012, 1.6), 7300);
    clearTimeout(melodyTimer);
    if (on) melodyTimer = window.setTimeout(phrase, 1500);
    if (!on) window.setTimeout(() => {
      if (ctx && master && master.gain.value < 0.01) void ctx.suspend();
    }, 3e3);
  }
  function chime() {
    ping("chime", 660, 0.03, 2.8);
    setTimeout(() => ping("chime", 990, 0.02, 2.4), 180);
  }
  function boom() {
    if (!ctx || !bus.chime) return;
    const c = ctx, now = c.currentTime, len = 7;
    const buf = c.createBuffer(1, c.sampleRate * len, c.sampleRate), d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      last = (last + 0.04 * (Math.random() * 2 - 1)) / 1.04;
      d[i] = last * 4;
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(900, now);
    lp.frequency.exponentialRampToValueAtTime(60, now + len);
    const g = c.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.5, now + 0.05);
    g.gain.exponentialRampToValueAtTime(1e-4, now + len);
    src.connect(lp).connect(g).connect(bus.chime);
    src.start(now);
    src.stop(now + len);
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(70, now);
    o.frequency.exponentialRampToValueAtTime(28, now + 3);
    const og = c.createGain();
    og.gain.setValueAtTime(1e-4, now);
    og.gain.exponentialRampToValueAtTime(0.35, now + 0.04);
    og.gain.exponentialRampToValueAtTime(1e-4, now + 3.5);
    o.connect(og).connect(bus.chime);
    o.start(now);
    o.stop(now + 3.6);
  }

  // src/ui/app.ts
  var PRESTIGE_UNIT = PRESTIGE.metalUnit;
  var PRESTIGE_PER_ORDER = PRESTIGE.perOrder;
  var VOL_KEYS = ["noise", "melody", "game"];
  var VOL_DEFAULT = { noise: 0.7, melody: 1, game: 1 };
  var volOf = (k) => S.settings.vol?.[k] ?? VOL_DEFAULT[k];
  var audioVols = () => ({ noise: volOf("noise"), drone: volOf("noise"), melody: volOf("melody"), pulse: volOf("game"), chime: volOf("game") });
  var VERSION = "0.2.1";
  var KEY = "sepot-horizontu";
  var $ = (id) => document.getElementById(id);
  var SUP2 = { "\u2070": "0", "\xB9": "1", "\xB2": "2", "\xB3": "3", "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7", "\u2078": "8", "\u2079": "9", "\u207B": "\u2212" };
  var esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (m) => `<sup>${[...m].map((ch) => SUP2[ch]).join("")}</sup>`).replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => `<span class="exp">${m}</span>`).replace(/(?<=\d)[ \u00A0\u202F](?=\d{3}(?!\d))/g, '<span class="ts"> </span>');
  var S;
  var tab = "build";
  var buyMax = 1;
  var viewKey = "";
  var lastActive = Date.now();
  var COLOR = { ore: "var(--ore)", metal: "var(--metal)", energy: "var(--energy)", data: "var(--data)", plasma: "var(--plasma)" };
  var UNIT = { ore: "kg", metal: "kg", energy: "J", data: "B", plasma: "kg" };
  function amount(r, v) {
    return r === "energy" ? energy(v) : r === "data" ? bytes(v) : mass(v);
  }
  function rate(r, v) {
    return r === "energy" ? power(v) : (r === "data" ? bytes(v) : mass(v)) + "/s";
  }
  function costHTML(c) {
    return `<span class="lbl">${esc(t("ui.price"))}</span>` + Object.keys(c).map((r) => `<span class="${S.res[r] >= c[r] ? "" : "no"}"><span style="color:${COLOR[r]}">${t("res." + r)}</span> ${esc(amount(r, c[r]))}</span>`).join("");
  }
  function times(f) {
    const v = Math.max(1, f);
    return v < 10 ? dec(v, 1) : v < 1e6 ? Math.round(v).toLocaleString("cs-CZ") : sci(v, 1);
  }
  var plural = (n, one, few, many) => n === 1 ? one : n >= 2 && n <= 4 && Number.isInteger(n) ? few : many;
  var dec = (v, d) => v.toFixed(d).replace(".", ",");
  function years(y) {
    if (y >= 1e6) return `${dec(y / 1e6, y >= 1e7 ? 1 : 2)} mil. let`;
    if (y >= 1) {
      const n = y >= 1e3 ? Number(y.toPrecision(3)) : y >= 10 ? Math.round(y) : Math.round(y * 10) / 10;
      return `${n.toLocaleString("cs-CZ")} ${Number.isInteger(n) ? plural(n, "rok", "roky", "let") : "roku"}`;
    }
    const d = y * 365.25;
    if (d >= 45) {
      const n = Math.round(d / 30.44);
      return `${n} ${plural(n, "m\u011Bs\xEDc", "m\u011Bs\xEDce", "m\u011Bs\xEDc\u016F")}`;
    }
    if (d >= 1) {
      const n = Math.round(d);
      return `${n} ${plural(n, "den", "dny", "dn\xED")}`;
    }
    const sec = d * 86400;
    if (sec >= 3600) return `${dec(sec / 3600, sec >= 36e3 ? 0 : 1)} h`;
    if (sec >= 60) return `${Math.round(sec / 60)} min`;
    return `${Math.max(1, Math.round(sec))} s`;
  }
  function starLeft() {
    const st = S.star.stage, d = STAGES[st];
    let y = d.years * (1 - Math.min(1, S.star.t / d.sec));
    for (let i = st + 1; i < STAGES.length; i++) y += STAGES[i].years;
    return y;
  }
  var stageName = (i) => t(`ui.stages.${STAGES[i]?.id ?? "nova"}.name`);
  function save(silent = true) {
    S.last = Date.now();
    try {
      localStorage.setItem(KEY, JSON.stringify(S));
      if (!silent) toast(t("ui.settings.saved", { t: (/* @__PURE__ */ new Date()).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }) }));
      return true;
    } catch {
      if (!silent) toast(t("ui.settings.saveFail"));
      return false;
    }
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? migrate(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }
  function applyOffline(sec) {
    if (sec < 30) return;
    const got = offlineGain(S, sec);
    const list = Object.keys(got).filter((r) => got[r] >= 1).map((r) => `${t("res." + r)} +${amount(r, got[r])}`).join("\n");
    if (list) S.log.unshift({ key: "ui.offline", kind: "sys", day: Math.floor(S.time) + 1, vars: { t: duration(sec), list } });
  }
  var toastTimer;
  function toast(msg, ms = 2600) {
    const el = $("toast");
    el.innerHTML = esc(msg);
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      el.hidden = true;
    }, ms);
  }
  function flashGain(r, v) {
    const chip = document.querySelector(`.chip[data-res="${r}"]`);
    if (!chip) return;
    chip.classList.remove("gain");
    void chip.offsetWidth;
    chip.classList.add("gain");
    const f = document.createElement("span");
    f.className = "float gainfloat";
    f.innerHTML = esc("+" + amount(r, v));
    f.style.color = COLOR[r];
    chip.appendChild(f);
    setTimeout(() => f.remove(), 1600);
  }
  function showTip(target) {
    const u = target.dataset.unit;
    const tip = $("tip");
    tip.innerHTML = `<b>${esc(t(`unit.${u}.name`))}</b>${esc(t(`unit.${u}.text`))}` + (target.dataset.res ? breakdownHTML(target.dataset.res) : "");
    tip.hidden = false;
    const r = target.getBoundingClientRect(), w = tip.offsetWidth;
    tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left)) + "px";
    tip.style.top = r.bottom + 8 + "px";
  }
  function hideTip() {
    $("tip").hidden = true;
  }
  function breakdownHTML(r) {
    const { prod, cons } = rateParts(S, r);
    if (!prod.length && !cons.length) return "";
    const name = (k) => k === "reactor" || k === "auto" ? t("ui.breakdown." + k) : t(`b.${k}.name`);
    const line = (k, v, sign) => `<span class="bd"><span>${esc(name(k))}</span><span class="mono">${sign}${esc(rate(r, v))}</span></span>`;
    const p = prod.reduce((a, [, v]) => a + v, 0), c = cons.reduce((a, [, v]) => a + v, 0), net = p - c;
    let h = `<span class="bdh">${esc(t("ui.breakdown.prod"))}</span>` + prod.map(([k, v]) => line(k, v, "+")).join("");
    if (cons.length) h += `<span class="bdh">${esc(t("ui.breakdown.cons"))}</span>` + cons.map(([k, v]) => line(k, v, "\u2212")).join("");
    h += `<span class="bd total"><span>${esc(t("ui.breakdown.net"))}</span><span class="mono">${net >= 0 ? "+" : "\u2212"}${esc(rate(r, Math.abs(net)))}</span></span>`;
    return `<span class="bdbox">${h}</span>`;
  }
  var chipKey = "";
  function renderTop() {
    const k = kardashev(S), P = powerW(S);
    $("kval").textContent = k < 0 ? t("ui.kBelow") : "K " + kValue(k);
    $("kpow").innerHTML = esc(power(P));
    if (!S.chapterDone) {
      $("kprogLabel").innerHTML = esc(k >= 1 ? t("ui.toTypeIdone") : t("ui.toTypeI", { n: times(1e16 / powerW(S)) }));
      $("kbar").style.width = Math.max(0, Math.min(100, (k + 0.35) / 1.35 * 100)).toFixed(1) + "%";
    } else if (!S.star.done) {
      const two = k >= 2, Lw = luminosity(S), kL = (Math.log10(Lw) - 6) / 10;
      $("kprogLabel").innerHTML = esc(two ? t("ui.toFullStar", { n: times(Lw / powerW(S)) }) : t("ui.toTypeII", { n: times(1e26 / powerW(S)) }));
      $("kbar").style.width = (two ? Math.max(0, Math.min(100, (k - 2) / (kL - 2) * 100)) : Math.max(0, Math.min(100, (k - 1) * 100))).toFixed(1) + "%";
    } else {
      $("kprogLabel").textContent = t("ui.toNext");
      $("kbar").style.width = "100%";
    }
    const shown = RESOURCES.filter((r) => r === "ore" || S.total[r] > 0);
    const key = shown.join();
    const bar = $("resbar");
    if (key !== chipKey) {
      chipKey = key;
      bar.innerHTML = shown.map((r) => `<button class="chip" data-unit="${UNIT[r]}" data-res="${r}" aria-describedby="tip"><span class="k"><i style="background:${COLOR[r]}"></i>${t("res." + r)}</span><span class="v" data-v="${r}"></span><span class="r" data-r="${r}"></span></button>`).join("");
    }
    const { p, c } = rates(S);
    for (const r of shown) {
      bar.querySelector(`[data-v="${r}"]`).innerHTML = esc(amount(r, S.res[r]));
      const net = p[r] - c[r], el = bar.querySelector(`[data-r="${r}"]`);
      el.innerHTML = esc((net >= 0 ? "+" : "\u2212") + rate(r, Math.abs(net)).replace(/\/s$/, "") + (r === "energy" ? "" : t("ui.perSec")));
      el.classList.toggle("neg", net < 0);
    }
    if (S.chapterDone >= 1 && !S.star.done) {
      $("clockDay").innerHTML = esc(S.star.collapse >= 0 ? t("ui.star.countdown", { t: duration(S.star.collapse) }) : t("ui.starAge", { t: years(starLeft()) }));
      $("clockScale").textContent = t("ui.clockYears", { t: years(clockYears(S)) });
    } else {
      $("clockDay").innerHTML = esc(t("ui.day", { n: (Math.floor(S.time) + 1).toLocaleString("cs-CZ") }));
      $("clockScale").textContent = t("ui.clockScale");
    }
  }
  var STAR_BUILDINGS2 = ["lifter", "separator", "seismo", "swarmfab"];
  var starView = () => ({ stage: stageDef(S).id, dyson: S.b.dyson, lifters: S.b.lifter, coverage: coverage(S), collapse: S.star.collapse, done: S.star.done, snAge: snAge() });
  function renderRig() {
    const ch2 = S.chapterDone >= 1;
    $("rigTitle").textContent = ch2 ? t("ui.star.title") : t("ui.asteroid");
    document.body.classList.toggle("ch2", ch2);
    const rock = $("rock");
    rock.disabled = ch2;
    rock.setAttribute("aria-label", ch2 ? t("ui.star.title") : t("ui.mineAria"));
    $("clickTag").hidden = ch2;
    $("clickTag").innerHTML = esc(t("ui.perClick", { v: mass(clickPower(S)) }));
    const hint = $("hint");
    hint.hidden = S.b.drone >= 3;
    hint.textContent = t("ui.hint");
    const rows = [[t("ui.stats.clicks"), num(S.clicks)]];
    if (!ch2) {
      rows.push([t("ui.stats.drones"), num(Math.floor(S.b.drone))]);
      for (const id of CONVERTERS.filter((id2) => S.b[id2] >= 1)) rows.push([t(`b.${id}.name`), S.off[id] ? t("ui.stopped") : t("ui.running", { n: Math.round((S.eff[id] ?? 1) * 100) })]);
    } else if (!S.star.done) {
      rows.push([t("ui.stats.stage"), `${S.star.stage + 1} / ${STAGES.length}`], [t("ui.stats.cov"), pct(coverage(S))]);
      for (const id of STAR_BUILDINGS2.filter((id2) => S.b[id2] >= 1)) {
        if (id === "swarmfab" && !S.off[id]) { rows.push([t(`b.${id}.name`), t("ui.fabRate", { n: num(S.fab?.made ?? 0) })]); continue; }
        rows.push([t(`b.${id}.name`), S.off[id] ? t("ui.stopped") : t("ui.running", { n: Math.round((S.eff[id] ?? 1) * 100) })]);
      }
    }
    $("stats").innerHTML = rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("");
    const v = $("voyage");
    if (S.travel) {
      v.hidden = false;
      v.innerHTML = `<div>${esc(t("ui.voyage.flying", { to: t(`loc.${S.travel.to}.name`) }))}</div><div class="bar"><b style="width:${(S.travel.t / S.travel.total * 100).toFixed(1)}%"></b></div><div class="mono dim" style="font-size:13px">${esc(t("ui.voyage.remaining", { t: duration(S.travel.total - S.travel.t) }))}</div>`;
    } else if (S.r.scan) {
      v.hidden = false;
      v.innerHTML = `<div>${esc(t("ui.voyage.docked", { at: t(`loc.${S.loc}.name`) }))}</div>`;
    } else v.hidden = true;
    const ev = $("event");
    if (S.event) {
      const id = S.event.id;
      if (ev.dataset.id !== id) {
        ev.dataset.id = id;
        ev.innerHTML = `<span class="name">${esc(t(`ui.events.${id}.name`))}</span><div class="bar"><b></b></div><button class="btn" data-claim="1">${esc(t(`ui.events.${id}.claim`))}</button>`;
      }
      ev.hidden = false;
      ev.querySelector(".bar > b").style.width = (S.event.ttl / 20 * 100).toFixed(1) + "%";
    } else {
      ev.hidden = true;
      ev.dataset.id = "";
    }
  }
  function tabsAvail() {
    const list = [["build", t("ui.tabs.build")]];
    if (S.b.lab > 0 || Object.keys(S.r).length) list.push(["research", t("ui.tabs.research")]);
    if (S.r.scan) list.push(["map", t("ui.tabs.map")]);
    if (S.chapterDone >= 1) list.push(["star", t("ui.tabs.star")]);
    return list;
  }
  function renderTabs() {
    const list = tabsAvail();
    if (!list.find(([id]) => id === tab)) tab = "build";
    const dot = RESEARCH_IDS.some((id) => researchAvailable(S, id) && affordable(S, R[id].cost));
    const sdot = stageReady(S).ok || canRebuild(S) && prestigeGain(S) >= Math.max(4, S.p.pts * 0.5);
    const html = list.map(([id, n]) => `<button class="tab" role="tab" aria-selected="${id === tab}" data-tab="${id}">${esc(n)}${(id === "research" && dot || id === "star" && sdot) && tab !== id ? '<span class="dot"></span>' : ""}</button>`).join("");
    const el = $("tabs");
    if (el.innerHTML !== html) el.innerHTML = html;
  }
  function computeKey() {
    if (tab === "build") return "b" + BUILDING_IDS.filter((id) => isUnlocked(S, id)).join() + buyMax;
    if (tab === "research") return "r" + RESEARCH_IDS.map((id) => S.r[id] ? 2 : researchAvailable(S, id) ? 1 : 0).join("");
    if (tab === "map") return "m" + LOCATION_IDS.map((id) => S.visited[id] ? 1 : locationOpen(S, id) ? 0 : "-").join("") + (S.travel ? S.travel.to : "");
    if (tab === "star") return `s${S.star.stage}${S.star.done}${S.star.collapse >= 0}${!!S.r.redesign}`;
    return "s";
  }
  function buildView() {
    let h = "";
    if (tab === "build") {
      h += `<div class="toolbar">${esc(t("ui.buyMode"))} <span class="seg"><button data-max="1" aria-pressed="${buyMax === 1}">\xD71</button><button data-max="10" aria-pressed="${buyMax === 10}">\xD710</button><button data-max="max" aria-pressed="${buyMax === true}">Max</button></span></div><div class="list">`;
      const order = BUILDING_IDS.slice().reverse();
      for (const id of order) {
        if (!isUnlocked(S, id)) continue;
        const conv = !!B[id].cons || id === "swarmfab";
        h += `<div class="item" data-b="${id}"><h3>${esc(t(`b.${id}.name`))} <span class="n" data-f="n"></span></h3><p>${esc(t(`b.${id}.desc`))}</p><div class="eff" data-f="eff"></div><div class="cost" data-f="cost"></div>
        <div class="act"><button class="btn" data-buy="${id}">${esc(t("ui.buy"))}</button>${conv ? `<button class="btn ghost" data-toggle="${id}"></button>` : ""}${id === "swarmfab" ? `<button class="btn ghost" data-sell="${id}"></button>` : ""}</div></div>`;
      }
      h += "</div>";
    } else if (tab === "research") {
      const open = RESEARCH_IDS.filter((id) => researchAvailable(S, id));
      const locked = RESEARCH_IDS.filter((id) => !S.r[id] && !researchAvailable(S, id) && R[id].reqKey);
      const done = RESEARCH_IDS.filter((id) => S.r[id]);
      h += '<div class="list">' + (open.length ? open.map((id) => `<div class="item" data-r="${id}"><h3>${esc(t(`r.${id}.name`))}</h3><p>${esc(t(`r.${id}.desc`))}</p><div class="cost" data-f="cost"></div><div class="act"><button class="btn" data-res="${id}">${esc(t("ui.research"))}</button></div></div>`).join("") : `<p class="empty">${esc(t("ui.researchNone"))}</p>`) + "</div>";
      const lockedShown = locked.filter((id, i, a) => a.findIndex((x) => R[x].reqKey === R[id].reqKey) === i);
      if (lockedShown.length) h += `<div class="section-label">${esc(t("ui.researchLocked"))}</div><div class="list">` + lockedShown.map((id) => `<div class="item done"><h3>?</h3><p>${esc(t("ui.needs", { x: t("req." + R[id].reqKey) }))}</p></div>`).join("") + "</div>";
      if (done.length) h += `<div class="section-label">${esc(t("ui.researchDone"))}</div><div class="list">` + done.slice().reverse().map((id) => `<div class="item done"><h3>${esc(t(`r.${id}.name`))}</h3><p>${esc(t(`r.${id}.desc`))}</p></div>`).join("") + "</div>";
    } else if (tab === "map") {
      h += '<div class="mapbox"><canvas id="map"></canvas></div><div class="list">';
      for (const id of LOCATION_IDS.slice().reverse()) {
        if (!locationOpen(S, id)) continue;
        const done = !!S.visited[id];
        h += `<div class="item${done ? " visited" : ""}" data-l="${id}"><h3>${esc(t(`loc.${id}.name`))}</h3><p>${esc(t(`loc.${id}.${done ? "done" : "desc"}`))}</p>${done ? "" : '<div class="cost" data-f="cost"></div>'}<div class="act">${done ? `<span class="dim">${esc(t("ui.map.active"))}</span>` : `<button class="btn" data-go="${id}"></button>`}</div></div>`;
      }
      h += "</div>";
    } else if (tab === "star") h += starHTML();
    $("view").innerHTML = h;
  }
  var round2 = (v) => {
    const e = Math.pow(10, Math.max(0, Math.floor(Math.log10(Math.abs(v) || 1)) - 1));
    return (Math.round(v / e) * e).toLocaleString("cs-CZ");
  };
  var pct = (f) => {
    const v = f * 100;
    return v === 0 ? "0 %" : v < 0.01 ? "< 0,01 %" : `${v.toLocaleString("cs-CZ", { maximumSignificantDigits: 2 })} %`;
  };
  function starHTML() {
    const ladder = STAGES.map((st, i) => `<li data-st="${i}"><span class="num">${i + 1}</span>${esc(t(`ui.stages.${st.id}.name`))}</li>`).join("") + `<li data-st="${STAGES.length}"><span class="num">\u2726</span>${esc(t("ui.stages.nova.name"))}</li>`;
    let h = `${S.star.done ? "" : '<div class="starbox"><canvas id="starc"></canvas></div>'}<ol class="ladder">${ladder}</ol>`;
    if (S.star.done) return h + `<div class="stagecard"><p>${esc(t("ui.star.remnant"))}</p></div>`;
    h += `<div class="stagecard">
    <div class="sc-head"><h3 data-f="name"></h3><span class="tag mono" data-f="of"></span></div>
    <p class="burn"><span class="dim">${esc(t("ui.star.burn"))}</span> <span data-f="burn"></span></p>
    <dl class="sgrid" data-f="grid"></dl>
    <div class="sprog"><div class="sp-head"><span class="dim">${esc(t("ui.star.progress"))}</span><span class="mono" data-f="ptext"></span></div><div class="bar"><b data-f="prog"></b></div></div>
    <div class="ready"><span class="dim">${esc(t("ui.star.ready"))}</span><ul class="checks" data-f="checks"></ul></div>
    <div class="row"><button class="btn" data-adv="1"></button><span class="dim" data-f="wait"></span></div>
  </div>`;
    if (S.r.redesign) h += `<div class="stagecard rebuild">
    <div class="sc-head"><h3>${esc(t("ui.rebuild.title"))}</h3><span class="tag mono" data-f="pts"></span></div>
    <p data-f="rb"></p><p class="dim" data-f="rbnext"></p>
    <div class="row"><button class="btn ghost" data-rebuild="1">${esc(t("ui.rebuild.btn"))}</button></div>
  </div>`;
    return h;
  }
  function updateStar() {
    const view = $("view");
    view.querySelectorAll(".ladder li").forEach((li) => {
      const i = Number(li.dataset.st), cur = S.star.done ? STAGES.length : S.star.stage;
      li.className = i < cur ? "done" : i === cur ? "cur" : "";
    });
    if (S.star.done) return;
    const d = stageDef(S), st = S.star.stage, set = (f2, html) => {
      const el = view.querySelector(`[data-f=${f2}]`);
      if (el && el.innerHTML !== html) el.innerHTML = html;
    };
    set("name", esc(stageName(st)));
    set("of", esc(t("ui.star.stage", { n: st + 1, of: STAGES.length })));
    set("burn", esc(t(`ui.stages.${d.id}.burn`)));
    const Lw = luminosity(S), rows = [
      [t("ui.star.realLen", { t: "" }).trim(), years(d.years)],
      [t("ui.star.L"), t("ui.star.lsun", { v: round2(Lw / 3828e23) })],
      [t("ui.star.T"), `${round2(d.T)} K`],
      [t("ui.star.R"), t("ui.star.rsun", { v: round2(d.R) })],
      [t("ui.star.cov"), pct(coverage(S))]
    ];
    if (S.b.lifter > 0 || S.r.lift) rows.push([t("ui.star.lift"), energy(liftJ(S))]);
    set("grid", rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join(""));
    const f = Math.min(1, S.star.t / d.sec);
    view.querySelector("[data-f=prog]")?.style.setProperty("width", (f * 100).toFixed(1) + "%");
    set("ptext", esc(t("ui.star.progressOf", { a: years(d.years * f), b: years(d.years) })));
    const rd = stageReady(S), chk = (ok, txt) => `<li class="${ok ? "ok" : ""}">${ok ? "\u2713" : "\xB7"} ${esc(txt)}</li>`;
    let c = chk(rd.time, t("ui.star.needTime")) + chk(rd.power, stageByMetal(S) ? t("ui.star.needMetal", { m: mass(stageNeed(S)) }) : t("ui.star.needPower", { w: power(d.needW) }));
    if (st === LAST_STAGE) c += chk(rd.research, t("ui.star.needResearch"));
    set("checks", c);
    const btn = view.querySelector("[data-adv]");
    if (btn) {
      const coll = S.star.collapse >= 0;
      btn.disabled = !rd.ok;
      btn.textContent = coll ? t("ui.star.countdown", { t: duration(S.star.collapse) }) : st === LAST_STAGE ? t("ui.star.collapse") : t("ui.star.next", { n: stageName(st + 1) });
      btn.classList.toggle("warn", coll);
      set("wait", esc(coll ? t("ui.star.lastLift") : rd.time && !rd.ok ? "" : t("ui.star.waiting")));
    }
    if (S.r.redesign) {
      const g = prestigeGain(S), m = prestigeMult(S);
      set("pts", esc(`${t("ui.rebuild.pts")} ${num(S.p.pts)}`));
      set("rb", esc(t("ui.rebuild.bonus", { m: num(m) }) + ". " + (g >= 1 ? t("ui.rebuild.gain", { n: ptsText(g) }) : t("ui.rebuild.none"))));
      const nextAt = PRESTIGE_UNIT * Math.pow(10, (S.p.pts + g + 1) / PRESTIGE_PER_ORDER);
      set("rbnext", esc(t("ui.rebuild.next", { v: mass(nextAt) })));
      const rb = view.querySelector("[data-rebuild]");
      if (rb) rb.disabled = !canRebuild(S);
    }
  }
  function onAdvance() {
    if (!stageReady(S).ok) return;
    const st = S.star.stage;
    const go = () => {
      if (advanceStage(S)) {
        onJournal(checkJournal(S));
        renderAll();
        save();
      }
    };
    if (st === 0) {
      const loss = redLoss(S);
      const body = t("ui.redWarn.body") + "\n\n" + (loss.dyson || loss.lifter ? t("ui.redWarn.loss", { d: num(loss.dyson), l: num(loss.lifter) }) : t("ui.redWarn.safe"));
      confirmModal(t("ui.redWarn.title"), body, t("ui.redWarn.ok"), t("ui.redWarn.cancel"), go, !!(loss.dyson || loss.lifter));
    } else if (st === LAST_STAGE) {
      confirmModal(t("ui.collapseWarn.title"), t("ui.collapseWarn.body", { t: duration(STAR.collapseSec) }), t("ui.collapseWarn.ok"), t("ui.collapseWarn.cancel"), go, true);
    } else go();
  }
  var ptsText = (n) => `${n} ${plural(n, "poznatek", "poznatky", "poznatk\u016F")}`;
  function onRebuild() {
    if (!canRebuild(S)) return;
    const g = prestigeGain(S), m = 1 + 0.25 * (S.p.pts + g);
    confirmModal(t("ui.rebuild.confirmTitle"), t("ui.rebuild.confirmBody", { n: ptsText(g), m: num(m) }), t("ui.rebuild.ok"), t("ui.cancel"), () => {
      const got = rebuild(S);
      if (!got) return;
      toast(t("ui.rebuild.done", { n: ptsText(got) }), 4e3);
      onJournal(checkJournal(S));
      renderAll(true);
      save();
    }, true);
  }
  function settingsHTML() {
    return `<div class="settings">
      <section><h3>${esc(t("ui.settings.sound"))}</h3><div class="row"><button class="btn ghost" data-act="sound"></button></div>
        <div class="vols">${VOL_KEYS.map((k) => `<label class="vol" for="vol-${k}"><span>${esc(t("ui.settings.vol." + k))}</span><input type="range" id="vol-${k}" data-vol="${k}" min="0" max="100" step="5" value="${Math.round(volOf(k) * 100)}"><output class="mono" for="vol-${k}">${Math.round(volOf(k) * 100)} %</output></label>`).join("")}</div></section>
      <section><h3>${esc(t("ui.settings.save"))}</h3><div class="row"><button class="btn ghost" data-act="save">${esc(t("ui.settings.saveNow"))}</button></div>
        <p style="margin-top:8px">${esc(t("ui.settings.offlineRule"))}</p></section>
      <section><h3>${esc(t("ui.settings.export"))}</h3><p>${esc(t("ui.settings.exportHint"))}</p><textarea id="exportText" readonly></textarea><div class="row"><button class="btn ghost" data-act="export">${esc(t("ui.settings.export"))}</button><button class="btn ghost" data-act="copy">${esc(t("ui.settings.copy"))}</button></div></section>
      <section><h3>${esc(t("ui.settings.import"))}</h3><p>${esc(t("ui.settings.importHint"))}</p><textarea id="importText"></textarea><div class="row"><button class="btn ghost" data-act="import">${esc(t("ui.settings.import"))}</button></div></section>
      <section><h3>${esc(t("ui.settings.about"))}</h3><p>${esc(t("ui.settings.aboutText"))}</p><p class="mono">${esc(t("ui.settings.version", { v: VERSION }))}</p><div class="row"><button class="btn ghost" data-act="reset">${esc(t("ui.settings.reset"))}</button></div></section>
    </div>`;
  }
  function openSettings() {
    $("drawerTitle").textContent = t("ui.tabs.settings");
    $("drawerClose").setAttribute("aria-label", t("ui.close"));
    $("drawerBody").innerHTML = settingsHTML();
    syncSettings();
    fillExport();
    $("drawer").hidden = false;
    $("settingsBtn").setAttribute("aria-expanded", "true");
    $("drawerClose").focus();
  }
  function closeSettings() {
    if ($("drawer").hidden) return;
    $("drawer").hidden = true;
    $("settingsBtn").setAttribute("aria-expanded", "false");
    $("settingsBtn").focus();
  }
  function syncSettings() {
    const sb = document.querySelector("#drawerBody [data-act=sound]");
    if (sb) sb.textContent = S.settings.sound ? t("ui.settings.soundOn") : t("ui.settings.soundOff");
  }
  function updateView() {
    const view = $("view");
    if (tab === "build") {
      view.querySelectorAll("[data-b]").forEach((el) => {
        const id = el.dataset.b, d = B[id];
        const count = Math.floor(S.b[id]);
        el.querySelector("[data-f=n]").innerHTML = esc(t("ui.pieces", { n: num(count) }));
        const flow = (k) => {
          const part = (r, v, sign) => `<span><span style="color:${COLOR[r]}">${esc(t("res." + r))}</span> ${sign}${esc(rate(r, v))}</span>`;
          const ins = Object.keys(d.cons ?? {}).map((r) => part(r, consOf(S, id, r) * k, "\u2212"));
          const outs = Object.keys(d.prod ?? {}).map((r) => part(r, prodOf(S, id, r) * k, "+"));
          if (d.makes) outs.push(`<span>${esc(t(d.makes.building === "dyson" ? "ui.makesDyson" : "ui.makes", { n: num(makesOf(S, id) * k) }))}</span>`);
          return ins.length ? `${ins.join(" ")} <span class="arrow">\u2192</span> ${outs.join(" ")}` : outs.join(" ");
        };
        let eff = `<span class="effrow"><span class="lbl">${esc(t("ui.one"))}</span>${flow(1)}</span>`;
        if (count >= 2 || count >= 1 && d.cons) {
          const e = d.cons ? S.off[id] ? 0 : S.eff[id] ?? 1 : 1;
          let note2 = d.cons && e < 0.995 ? ` <span class="dim">(${esc(S.off[id] ? t("ui.stopped") : t("ui.running", { n: Math.round(e * 100) }))})</span>` : "";
          if (id === "swarmfab" && !S.off[id] && S.fab?.lim) note2 = ` <span class="dim">(${esc(t("ui.fabLim." + S.fab.lim) + (S.fab.target ? " \xB7 " + t("ui.fabChain." + S.fab.target) : ""))})</span>`;
          const body = e < 5e-3 ? `<span class="dim">${esc(S.off[id] ? t("ui.stopped") : t("ui.starved"))}</span>` : flow(count * e) + note2;
          eff += `<span class="effrow"><span class="lbl">${esc(t("ui.all", { n: num(count) }))}</span>${body}</span>`;
        }
        if (id === "swarmfab" && S.fab?.built && S.fab.built.lifter + S.fab.built.separator > 0) {
          eff += `<span class="effrow"><span class="lbl">${esc(t("ui.fabBuilt"))}</span>${esc(t("ui.fabBuiltList", { l: num(S.fab.built.lifter), s: num(S.fab.built.separator) }))}</span>`;
        }
        el.querySelector("[data-f=eff]").innerHTML = eff;
        let c = cost(S, id), n = 1, can = affordable(S, c);
        if (buyMax === true) {
          const pv = previewMax(S, id);
          if (pv.count > 0) {
            c = pv.total;
            n = pv.count;
          }
        } else if (buyMax === 10) {
          c = previewMax(S, id, 10, true).total;
          n = 10;
          can = affordable(S, c);
        }
        el.querySelector("[data-f=cost]").innerHTML = costHTML(c);
        const btn = el.querySelector("[data-buy]");
        btn.disabled = !can;
        btn.textContent = n > 1 ? t("ui.buyN", { n }) : t("ui.buy");
        const sb = el.querySelector("[data-sell]");
        if (sb) {
          const k = Math.min(Math.floor(S.b[id]), buyMax === true ? Infinity : buyMax);
          sb.disabled = k < 1;
          sb.textContent = k > 1 ? t("ui.sellN", { n: num(k) }) : t("ui.sell");
        }
        const tg = el.querySelector("[data-toggle]");
        if (tg) tg.textContent = S.off[id] ? t("ui.turnOn") : t("ui.turnOff");
      });
    } else if (tab === "research") {
      view.querySelectorAll("[data-r]").forEach((el) => {
        const id = el.dataset.r;
        el.querySelector("[data-f=cost]").innerHTML = costHTML(R[id].cost);
        el.querySelector("[data-res]").disabled = !affordable(S, R[id].cost);
      });
    } else if (tab === "star") updateStar();
    else if (tab === "map") {
      view.querySelectorAll("[data-go]").forEach((b) => {
        const id = b.dataset.go, item = b.closest("[data-l]");
        const cf = item.querySelector("[data-f=cost]");
        if (cf) cf.innerHTML = `${costHTML({ energy: L[id].cost })}<span class="dim">${esc(t("ui.map.flight", { t: duration(travelTime(S, id)) }))}</span>`;
        b.disabled = !canTravel(S, id);
        b.textContent = S.travel?.to === id ? t("ui.map.onWay") : t("ui.map.fly");
      });
    }
  }
  function renderView(force = false) {
    const k = computeKey();
    if (force || k !== viewKey) {
      viewKey = k;
      buildView();
    }
    updateView();
  }
  var logLen = -1;
  function renderLog(fresh = false) {
    if (S.log.length === logLen && !fresh) return;
    logLen = S.log.length;
    $("logTitle").textContent = t("ui.journal");
    $("logCount").textContent = String(S.log.length);
    $("log").innerHTML = S.log.map((e, i) => {
      const day = t("ui.day", { n: e.day.toLocaleString("cs-CZ") }), label2 = e.kind === "story" ? `${t("ui.report")} \xB7 ${day}` : day;
      const body = e.key === "ui.offline" && e.vars?.list ? `${esc(t("ui.offlineHead", { t: String(e.vars.t) }))}<dl class="gains">${String(e.vars.list).split(/\n|, /).map((row) => {
        const [r, v] = row.split(" +");
        return `<dt>${esc(r)}</dt><dd>+${esc(v ?? "")}</dd>`;
      }).join("")}</dl>` : esc(t(e.key, e.vars));
      return `<div class="entry ${e.kind}${fresh && i === 0 ? " new" : ""}"><span class="t">${esc(label2.toUpperCase())}</span>${body}</div>`;
    }).join("");
  }
  function renderChapters() {
    const names = ["c1", "c2", "c3", "c4", "c5"];
    const cur = S.chapterDone;
    const html = `<ol>${names.map((n, i) => {
      const cls = i < cur ? "done" : i === cur ? "cur" : "";
      const label2 = i <= cur ? t("ui.chapters." + n) : t("ui.chapters.locked");
      return `<li class="${cls}"><span class="num">${i + 1}</span>${esc(label2)}</li>`;
    }).join("")}</ol>`;
    const el = $("chapters");
    if (el.innerHTML !== html) el.innerHTML = html;
    el.setAttribute("aria-label", t("ui.chapters.label"));
  }
  function renderSoundBtn() {
    const b = $("soundBtn");
    b.setAttribute("aria-pressed", String(S.settings.sound));
    b.innerHTML = S.settings.sound ? '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>' : '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6" stroke="currentColor" stroke-width="1.6"/></svg>';
  }
  var modalAction = null;
  function showModal(title, body, ok, cancel, action, danger = false) {
    $("modalTitle").textContent = title;
    $("modalBody").innerHTML = body.split("\n\n").map((p) => `<span class="para">${esc(p)}</span>`).join("");
    $("modalOk").textContent = ok;
    $("modalOk").classList.toggle("danger", danger);
    const c = $("modalCancel");
    c.hidden = !cancel;
    c.textContent = cancel ?? "";
    modalAction = action ?? null;
    $("modal").hidden = false;
    (cancel ? c : $("modalOk")).focus();
  }
  function confirmModal(title, body, ok, cancel, action, danger = false) {
    showModal(title, body, ok, cancel, action, danger);
  }
  function closeModal(run) {
    $("modal").hidden = true;
    const a = modalAction;
    modalAction = null;
    if (run && a) a();
    save();
  }
  function checkChapterModal() {
    if (!$("modal").hidden) return;
    if (S.chapterDone >= 1 && !S.story.ch2intro) {
      S.story.modal1 = true;
      S.story.ch2intro = true;
      showModal(t("ui.chapterDone.title"), t("ui.chapterDone.body"), t("ui.chapterDone.ok"));
    } else if (S.chapterDone >= 2 && !S.story.modal2 && snAge() > 7) {
      S.story.modal2 = true;
      showModal(t("ui.chapterDone2.title"), t("ui.chapterDone2.body"), t("ui.chapterDone2.ok"));
    }
  }
  var snAt = -1;
  var snAge = () => snAt < 0 ? 99 : (performance.now() - snAt) / 1e3;
  function onJournal(newKeys) {
    if (!newKeys.length) return;
    renderLog(true);
    if (S.settings.sound) chime();
  }
  var CLICK_CAP = 12;
  var clickTimes = [];
  var robotUntil = 0;
  var robotWarned = false;
  function humanClick(e) {
    if (!e.isTrusted) return false;
    const now = performance.now();
    while (clickTimes.length && now - clickTimes[0] > 1e3) clickTimes.shift();
    if (clickTimes.length >= CLICK_CAP) return false;
    clickTimes.push(now);
    if (now < robotUntil) return false;
    if (clickTimes.length >= 8) {
      const iv = clickTimes.slice(1).map((t2, i) => t2 - clickTimes[i]);
      const mean = iv.reduce((a, b) => a + b, 0) / iv.length;
      const sd = Math.sqrt(iv.reduce((a, b) => a + (b - mean) ** 2, 0) / iv.length);
      if (mean < 200 && sd / mean < 0.04) {
        robotUntil = now + 3e3;
        if (!robotWarned) {
          robotWarned = true;
          toast(t("ui.robotClicks"), 4500);
        }
        return false;
      }
    }
    return true;
  }
  function bind() {
    document.addEventListener("input", (e) => {
      const el = e.target;
      const k = el.dataset?.vol;
      if (!k) return;
      S.settings.vol = { ...S.settings.vol, [k]: Number(el.value) / 100 };
      setVolumes(audioVols());
      const out = el.parentElement?.querySelector("output");
      if (out) out.textContent = `${el.value} %`;
    });
    document.addEventListener("change", (e) => {
      if (e.target.dataset?.vol) save();
    });
    document.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      const d = b.dataset;
      if (d.tab) {
        tab = d.tab;
        renderTabs();
        renderView(true);
        $("view").scrollTop = 0;
        return;
      }
      if (d.max) {
        buyMax = d.max === "max" ? true : Number(d.max);
        renderView(true);
        return;
      }
      if (d.buy) {
        buy(S, d.buy, buyMax);
        onJournal(checkJournal(S));
        renderAll();
        return;
      }
      if (d.sell) {
        sell(S, d.sell, buyMax === true ? 1e9 : buyMax);
        renderAll();
        return;
      }
      if (d.toggle) {
        const id = d.toggle;
        S.off[id] = !S.off[id];
        renderView();
        return;
      }
      if (d.res) {
        if (doResearch(S, d.res)) {
          onJournal(checkJournal(S));
          renderTabs();
          renderView(true);
        }
        return;
      }
      if (d.go) {
        const id = d.go;
        depart(S, id);
        onJournal(checkJournal(S));
        renderView(true);
        renderRig();
        return;
      }
      if (d.claim) {
        const got = claimEvent(S);
        if (got) {
          const r = EVENTS[got.id].res, v = amount(r, got.amount);
          toast(t(`ui.events.${got.id}.got`, { v }), 4500);
          renderTop();
          flashGain(r, got.amount);
          if (S.settings.sound) chime();
        }
        renderRig();
        return;
      }
      if (d.adv) {
        onAdvance();
        return;
      }
      if (d.rebuild) {
        onRebuild();
        return;
      }
      if (d.act) return settingsAction(d.act, b);
    });
    const rock = $("rock");
    rock.addEventListener("keydown", (e) => {
      if (e.repeat && (e.key === "Enter" || e.key === " ")) e.preventDefault();
    });
    rock.addEventListener("click", (e) => {
      if (S.chapterDone >= 1) return;
      if (!humanClick(e)) return;
      const p = mine(S);
      if (S.chapterDone < 1) {
        const cv = $("rockc"), cr = cv.getBoundingClientRect();
        if (e.clientX) hitRock((e.clientX - cr.left) * (cv.width / cr.width), (e.clientY - cr.top) * (cv.height / cr.height), cv.width);
        else hitRock(void 0, void 0, cv.width);
      }
      const w = $("rockwrap"), r = w.getBoundingClientRect();
      const f = document.createElement("span");
      f.className = "float";
      f.innerHTML = esc("+" + mass(p));
      const x = (e.clientX || r.left + r.width / 2) - r.left, y = (e.clientY || r.top + r.height / 2) - r.top;
      f.style.left = x - 12 + "px";
      f.style.top = y - 16 + "px";
      w.appendChild(f);
      setTimeout(() => f.remove(), 1e3);
      onJournal(checkJournal(S));
      renderTop();
    });
    $("soundBtn").addEventListener("click", toggleSound);
    $("settingsBtn").addEventListener("click", () => $("drawer").hidden ? openSettings() : closeSettings());
    $("drawerClose").addEventListener("click", closeSettings);
    $("drawer").addEventListener("click", (e) => {
      if (e.target === $("drawer")) closeSettings();
    });
    $("modalOk").addEventListener("click", () => closeModal(true));
    $("modalCancel").addEventListener("click", () => closeModal(false));
    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest("[data-unit]");
      if (el && e.pointerType === "mouse") showTip(el);
    });
    document.addEventListener("pointerout", (e) => {
      if (e.target.closest("[data-unit]")) hideTip();
    });
    document.addEventListener("focusin", (e) => {
      const el = e.target.closest("[data-unit]");
      if (el) showTip(el);
    });
    document.addEventListener("focusout", hideTip);
    document.addEventListener("pointerdown", (e) => {
      const el = e.target.closest("[data-unit]");
      if (el && e.pointerType !== "mouse") {
        showTip(el);
        setTimeout(hideTip, 3500);
      }
    });
    addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideTip();
        closeSettings();
        if (!$("modal").hidden) closeModal(false);
      }
    });
  }
  function toggleSound() {
    S.settings.sound = !S.settings.sound;
    setSound(S.settings.sound, !!S.r.scan);
    renderSoundBtn();
    syncSettings();
    save();
  }
  function fillExport() {
    const ta = document.getElementById("exportText");
    if (ta) ta.value = encodeSave(S);
  }
  var resetStep = 0;
  var resetAt = 0;
  function settingsAction(act, b) {
    if (act === "save") {
      save(false);
      return;
    }
    if (act === "export") {
      fillExport();
      document.getElementById("exportText").select();
      return;
    }
    if (act === "copy") {
      fillExport();
      const ta = document.getElementById("exportText");
      navigator.clipboard?.writeText(ta.value).then(() => toast(t("ui.settings.copied")), () => {
        ta.select();
      });
      return;
    }
    if (act === "import") {
      const ta = document.getElementById("importText");
      const st = decodeSave(ta.value);
      if (!st) {
        toast(t("ui.settings.importBad"));
        return;
      }
      S = st;
      S.last = Date.now();
      setVolumes(audioVols());
      save();
      toast(t("ui.settings.importOk"));
      renderAll(true);
      return;
    }
    if (act === "sound") {
      toggleSound();
      return;
    }
    if (act === "reset") {
      if (Date.now() - resetAt > 5e3) resetStep = 0;
      resetStep++;
      resetAt = Date.now();
      if (resetStep >= 3) {
        const keepSound = S.settings.sound, keepVol = S.settings.vol;
        S = newState();
        S.settings.sound = keepSound;
        S.settings.vol = keepVol;
        checkJournal(S);
        save();
        toast(t("ui.settings.resetDone"));
        renderAll(true);
        resetStep = 0;
        return;
      }
      b.textContent = t(resetStep === 1 ? "ui.settings.resetConfirm" : "ui.settings.resetFinal");
      b.classList.toggle("danger", resetStep === 2);
      const step = resetStep;
      setTimeout(() => {
        if (b.isConnected && resetStep === step) {
          resetStep = 0;
          b.textContent = t("ui.settings.reset");
          b.classList.remove("danger");
        }
      }, 5e3);
    }
  }
  function renderAll(fresh = false) {
    renderTop();
    renderRig();
    renderTabs();
    renderView(fresh);
    renderLog(fresh);
    renderChapters();
    renderSoundBtn();
  }
  function start() {
    S = load() ?? newState();
    setVolumes(audioVols());
    applyOffline((Date.now() - S.last) / 1e3);
    checkJournal(S);
    bind();
    const stars2 = $("stars");
    sizeStars(stars2);
    addEventListener("resize", () => sizeStars(stars2));
    renderAll(true);
    if (S.settings.sound) {
      const resume = () => {
        setSound(true, !!S.r.scan);
        removeEventListener("pointerdown", resume);
      };
      addEventListener("pointerdown", resume);
    }
    let prev = performance.now(), uiAcc = 0, saveAcc = 0, starAcc = 1;
    const frame = (now) => {
      const dt = Math.min(1, (now - prev) / 1e3);
      prev = now;
      lastActive = Date.now();
      const wasDone = S.star.done;
      onJournal(tick(S, dt));
      if (!wasDone && S.star.done) {
        snAt = performance.now();
        if (S.settings.sound) boom();
        document.body.classList.add("sn");
        setTimeout(() => document.body.classList.remove("sn"), 2500);
        renderAll(true);
      }
      uiAcc += dt;
      if (uiAcc > 0.2) {
        uiAcc = 0;
        renderTop();
        renderRig();
        renderTabs();
        renderView();
        renderChapters();
        checkChapterModal();
      }
      saveAcc += dt;
      if (saveAcc > 15) {
        saveAcc = 0;
        save();
      }
      if (S.chapterDone >= 1) {
        const n = Math.floor(S.b.dyson);
        drawStar($("rockc"), starView(), now / 1e3, { title: "", sub: S.star.done ? "" : `${n.toLocaleString("cs-CZ")} ${plural(n, "kolektor", "kolektory", "kolektor\u016F")}`, layers: "" }, false);
      } else drawRock($("rockc"), dt, S.b.drone);
      starAcc += dt;
      if (starAcc > 0.05) {
        starAcc = 0;
        drawStars(stars2, now / 1e3);
      }
      if (tab === "map") {
        const m = document.getElementById("map");
        if (m) drawMap(m, S, now / 1e3);
      }
      if (tab === "star") {
        const c = document.getElementById("starc");
        if (c) {
          const d = stageDef(S);
          drawSection(c, d.id, now / 1e3, S.star.collapse, { title: t("ui.star.layers"), sub: `${stageName(S.star.stage)} \xB7 ${round2(d.T)} K \xB7 ${t("ui.star.rsun", { v: round2(d.R) })}` });
        }
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        save();
        return;
      }
      const away = (Date.now() - lastActive) / 1e3;
      prev = performance.now();
      if (away > 5) {
        applyOffline(away);
        renderLog(true);
      }
      lastActive = Date.now();
    });
    addEventListener("pagehide", () => save());
  }

  // src/main.ts
  setLang("cs");
  start();
})();
